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

    $paymentId = trim((string) ($_POST['razorpay_payment_id'] ?? ''));
    $orderId = trim((string) ($_POST['razorpay_order_id'] ?? ''));
    $signature = trim((string) ($_POST['razorpay_signature'] ?? ''));
    $registrationId = trim((string) ($_POST['registration_id'] ?? ''));
    $paymentRowId = filter_var($_POST['payment_row_id'] ?? 0, FILTER_VALIDATE_INT) ?: 0;

    if ($paymentId === '' || $orderId === '' || $signature === '' || $registrationId === '' || $paymentRowId <= 0) {
        payment_json(['success' => false, 'message' => 'Missing Razorpay verification fields.'], 400);
    }

    $pdo = db();
    $pdo->beginTransaction();

    $paymentStmt = $pdo->prepare(
        'SELECT * FROM payments
         WHERE id = ? AND registration_id = ?
         LIMIT 1
         FOR UPDATE'
    );
    $paymentStmt->execute([$paymentRowId, $registrationId]);
    $payment = $paymentStmt->fetch();

    if (!$payment) {
        throw new RuntimeException('Payment record was not found.');
    }

    $registrationStmt = $pdo->prepare(
        'SELECT * FROM test_registrations
         WHERE registration_id = ? AND payment_id = ?
         LIMIT 1
         FOR UPDATE'
    );
    $registrationStmt->execute([$registrationId, $paymentRowId]);
    $registration = $registrationStmt->fetch();

    if (!$registration) {
        throw new RuntimeException('Registration record was not found for this payment.');
    }

    if (($payment['status'] ?? '') === 'paid' && ($registration['payment_status'] ?? '') === 'paid') {
        $pdo->commit();
        $_SESSION['live_test_registration_id'] = $registrationId;
        payment_json([
            'success' => true,
            'redirect_url' => 'registration-success.php?rid=' . urlencode($registrationId),
            'message' => 'Payment already verified.',
        ]);
    }

    $storedOrderId = (string) ($payment['razorpay_order_id'] ?? '');
    if ($storedOrderId === '' || $storedOrderId !== $orderId) {
        throw new RuntimeException('Payment order mismatch.');
    }

    $reusedStmt = $pdo->prepare('SELECT id FROM payments WHERE razorpay_payment_id = ? AND id != ? LIMIT 1');
    $reusedStmt->execute([$paymentId, $paymentRowId]);
    if ($reusedStmt->fetch()) {
        throw new RuntimeException('This Razorpay payment ID is already linked with another registration.');
    }

    if (!razorpay_verify_payment_signature($storedOrderId, $paymentId, $signature)) {
        $failPayment = $pdo->prepare(
            'UPDATE payments
             SET razorpay_payment_id = ?,
                 razorpay_signature = ?,
                 status = "failed",
                 updated_at = NOW()
             WHERE id = ?'
        );
        $failPayment->execute([$paymentId, $signature, $paymentRowId]);

        $failRegistration = $pdo->prepare(
            'UPDATE test_registrations
             SET payment_status = "failed"
             WHERE registration_id = ? AND payment_id = ? AND payment_verified_at IS NULL'
        );
        $failRegistration->execute([$registrationId, $paymentRowId]);

        $pdo->commit();
        payment_json(['success' => false, 'message' => 'Payment signature verification failed.'], 400);
    }

    $updatePayment = $pdo->prepare(
        'UPDATE payments
         SET razorpay_payment_id = ?,
             razorpay_signature = ?,
             status = "paid",
             paid_at = COALESCE(paid_at, NOW()),
             verified_at = COALESCE(verified_at, NOW()),
             updated_at = NOW()
         WHERE id = ?'
    );
    $updatePayment->execute([$paymentId, $signature, $paymentRowId]);

    $updateRegistration = $pdo->prepare(
        'UPDATE test_registrations
         SET status = "registered",
             payment_status = "paid",
             payment_id = ?,
             payment_verified_at = COALESCE(payment_verified_at, NOW())
         WHERE registration_id = ?
           AND payment_id = ?
           AND payment_verified_at IS NULL'
    );
    $updateRegistration->execute([$paymentRowId, $registrationId, $paymentRowId]);

    if ($updateRegistration->rowCount() < 1) {
        $checkRegistration = $pdo->prepare(
            'SELECT status, payment_status, payment_verified_at
             FROM test_registrations
             WHERE registration_id = ? AND payment_id = ?
             LIMIT 1'
        );
        $checkRegistration->execute([$registrationId, $paymentRowId]);
        $afterRegistration = $checkRegistration->fetch();

        if (!$afterRegistration || (string) ($afterRegistration['payment_status'] ?? '') !== 'paid') {
            throw new RuntimeException('Payment was verified, but registration could not be confirmed.');
        }
    }

    $pdo->commit();

    $_SESSION['live_test_registration_id'] = $registrationId;

    payment_json([
        'success' => true,
        'redirect_url' => 'registration-success.php?rid=' . urlencode($registrationId),
        'message' => 'Payment verified successfully.',
    ]);
} catch (Throwable $exception) {
    if (isset($pdo) && $pdo instanceof PDO && $pdo->inTransaction()) {
        $pdo->rollBack();
    }

    $status = $exception instanceof RuntimeException ? 400 : 500;
    payment_json([
        'success' => false,
        'message' => $exception instanceof RuntimeException ? $exception->getMessage() : 'Could not verify payment.',
    ], $status);
}
