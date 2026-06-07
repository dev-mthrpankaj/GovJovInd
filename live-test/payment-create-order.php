<?php
declare(strict_types=1);

require_once __DIR__ . '/includes/public-layout.php';
require_once __DIR__ . '/includes/csrf.php';
require_once __DIR__ . '/includes/payment.php';

if (!is_post()) {
    payment_json(['success' => false, 'message' => 'Invalid request method.'], 405);
}

try {
    verify_csrf();

    $candidate = payment_candidate_from_post();
    $validationErrors = payment_validate_candidate($candidate);
    if ($validationErrors) {
        payment_json(['success' => false, 'message' => implode(' ', $validationErrors)], 400);
    }

    $pdo = db();
    $pdo->beginTransaction();

    $lock = $pdo->prepare('SELECT * FROM tests WHERE id = ? FOR UPDATE');
    $lock->execute([(int) $candidate['test_id']]);
    $lockedTest = $lock->fetch();

    if (!$lockedTest) {
        throw new RuntimeException('Selected test was not found.');
    }

    $lockedWindow = registration_window_status($lockedTest);
    if ($lockedTest['status'] !== 'registration_open' || !$lockedWindow['allowed']) {
        throw new RuntimeException($lockedWindow['message'] ?? 'Registration is closed.');
    }

    $duplicate = payment_duplicate_registered($pdo, (int) $lockedTest['id'], (string) $candidate['mobile'], $candidate['email']);
    if ($duplicate) {
        throw new RuntimeException('You are already registered for this test. Registration ID: ' . $duplicate['registration_id']);
    }

    if (payment_reserved_registration_count($pdo, (int) $lockedTest['id']) >= (int) $lockedTest['registration_limit']) {
        throw new RuntimeException('Registration closed. All seats are filled.');
    }

    $fee = payment_calculate_fee($pdo, $lockedTest, (string) $candidate['promo_code']);

    if ((int) $fee['payable_paise'] === 0) {
        $registrationId = payment_create_confirmed_registration($pdo, $lockedTest, $candidate, $fee);
        $pdo->commit();

        $_SESSION['live_test_registration_id'] = $registrationId;
        payment_json([
            'success' => true,
            'requires_payment' => false,
            'registration_id' => $registrationId,
            'redirect_url' => 'registration-success.php?rid=' . urlencode($registrationId),
        ]);
    }

    if ((int) $fee['payable_paise'] < 100) {
        throw new RuntimeException('Payment amount is below Razorpay minimum amount.');
    }

    $userId = payment_upsert_user($pdo, $candidate);

    $existingRegistrationStmt = $pdo->prepare(
        'SELECT * FROM test_registrations
         WHERE test_id = ? AND user_id = ?
         LIMIT 1
         FOR UPDATE'
    );
    $existingRegistrationStmt->execute([(int) $lockedTest['id'], $userId]);
    $existingRegistration = $existingRegistrationStmt->fetch();

    if ($existingRegistration && (string) ($existingRegistration['status'] ?? '') === 'registered') {
        throw new RuntimeException('You are already registered for this test. Registration ID: ' . $existingRegistration['registration_id']);
    }

    if ($existingRegistration && !empty($existingRegistration['payment_id'])) {
        $cancelOldPayment = $pdo->prepare(
            'UPDATE payments
             SET status = CASE WHEN status = "paid" THEN status ELSE "cancelled" END,
                 updated_at = NOW()
             WHERE id = ?'
        );
        $cancelOldPayment->execute([(int) $existingRegistration['payment_id']]);
    }

    $registrationId = $existingRegistration && !empty($existingRegistration['registration_id'])
        ? (string) $existingRegistration['registration_id']
        : payment_generate_unique_registration_id($pdo);

    $insertPayment = $pdo->prepare(
        'INSERT INTO payments
            (test_id, user_id, registration_id, amount_paise, discount_paise, payable_paise, currency, status, promo_code_id)
         VALUES (?, ?, ?, ?, ?, ?, "INR", "created", ?)'
    );
    $insertPayment->execute([
        (int) $lockedTest['id'],
        $userId,
        $registrationId,
        (int) $fee['amount_paise'],
        (int) $fee['discount_paise'],
        (int) $fee['payable_paise'],
        $fee['promo_code_id'],
    ]);
    $paymentRowId = (int) $pdo->lastInsertId();

    if ($existingRegistration) {
        $updateRegistration = $pdo->prepare(
            'UPDATE test_registrations
             SET registration_id = ?,
                 status = "pending",
                 payment_status = "pending",
                 amount_paise = ?,
                 discount_paise = ?,
                 payable_paise = ?,
                 promo_code_id = ?,
                 payment_id = ?,
                 payment_verified_at = NULL,
                 source = "website_payment"
             WHERE id = ?'
        );
        $updateRegistration->execute([
            $registrationId,
            (int) $fee['amount_paise'],
            (int) $fee['discount_paise'],
            (int) $fee['payable_paise'],
            $fee['promo_code_id'],
            $paymentRowId,
            (int) $existingRegistration['id'],
        ]);
        $registrationRowId = (int) $existingRegistration['id'];
    } else {
        $registrationRowId = payment_insert_registration($pdo, (int) $lockedTest['id'], $userId, $registrationId, 'pending', $fee);
        $updateRegistrationPayment = $pdo->prepare('UPDATE test_registrations SET payment_id = ? WHERE id = ?');
        $updateRegistrationPayment->execute([$paymentRowId, $registrationRowId]);
    }

    $order = razorpay_create_order_api((int) $fee['payable_paise'], 'INR', $registrationId);

    $updatePayment = $pdo->prepare(
        'UPDATE payments
         SET razorpay_order_id = ?, status = "pending", raw_response = ?
         WHERE id = ?'
    );
    $updatePayment->execute([
        (string) $order['id'],
        json_encode($order, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE),
        $paymentRowId,
    ]);

    $pdo->commit();

    $config = razorpay_load_config();

    payment_json([
        'success' => true,
        'requires_payment' => true,
        'key_id' => $config['key_id'],
        'order_id' => (string) $order['id'],
        'amount' => (int) $fee['payable_paise'],
        'currency' => 'INR',
        'registration_id' => $registrationId,
        'payment_row_id' => $paymentRowId,
        'candidate_name' => (string) $candidate['name'],
        'candidate_mobile' => (string) $candidate['mobile'],
        'description' => (string) $lockedTest['title'],
    ]);
} catch (Throwable $exception) {
    if (isset($pdo) && $pdo instanceof PDO && $pdo->inTransaction()) {
        $pdo->rollBack();
    }

    $status = $exception instanceof RuntimeException ? 400 : 500;
    payment_json([
        'success' => false,
        'message' => $exception instanceof RuntimeException ? $exception->getMessage() : 'Could not create payment order.',
    ], $status);
}
