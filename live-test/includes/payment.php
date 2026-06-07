<?php
declare(strict_types=1);

require_once __DIR__ . '/db.php';
require_once __DIR__ . '/promo.php';

function payment_json(array $payload, int $statusCode = 200): never
{
    http_response_code($statusCode);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($payload, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    exit;
}

function razorpay_secret_file(): string
{
    return __DIR__ . '/payment-secrets.php';
}

function razorpay_load_config(): array
{
    $secretFile = razorpay_secret_file();
    if (!is_file($secretFile)) {
        throw new RuntimeException('Razorpay secret config is missing. Create live-test/includes/payment-secrets.php from payment-secrets.example.php.');
    }

    require_once $secretFile;

    $keyId = defined('RAZORPAY_KEY_ID') ? (string) RAZORPAY_KEY_ID : '';
    $keySecret = defined('RAZORPAY_KEY_SECRET') ? (string) RAZORPAY_KEY_SECRET : '';

    if ($keyId === '' || $keySecret === '') {
        throw new RuntimeException('Razorpay key id or key secret is not configured.');
    }

    return [
        'key_id' => $keyId,
        'key_secret' => $keySecret,
    ];
}

function razorpay_create_order_api(int $amountPaise, string $currency, string $receipt): array
{
    if ($amountPaise < 100) {
        throw new RuntimeException('Razorpay amount must be at least 100 paise.');
    }

    $config = razorpay_load_config();
    $payload = [
        'amount' => $amountPaise,
        'currency' => $currency,
        'receipt' => substr($receipt, 0, 40),
        'payment_capture' => 1,
    ];

    if (!function_exists('curl_init')) {
        throw new RuntimeException('PHP cURL extension is required for Razorpay API calls.');
    }

    $ch = curl_init('https://api.razorpay.com/v1/orders');
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_USERPWD => $config['key_id'] . ':' . $config['key_secret'],
        CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
        CURLOPT_POSTFIELDS => json_encode($payload),
        CURLOPT_TIMEOUT => 30,
    ]);

    $responseBody = curl_exec($ch);
    $curlError = curl_error($ch);
    $statusCode = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($responseBody === false || $curlError !== '') {
        throw new RuntimeException('Could not connect to Razorpay. ' . $curlError);
    }

    $response = json_decode((string) $responseBody, true);
    if (!is_array($response)) {
        throw new RuntimeException('Invalid Razorpay API response.');
    }

    if ($statusCode < 200 || $statusCode >= 300) {
        $message = $response['error']['description'] ?? $response['error']['reason'] ?? 'Razorpay order creation failed.';
        throw new RuntimeException((string) $message);
    }

    if (empty($response['id'])) {
        throw new RuntimeException('Razorpay order id was not returned.');
    }

    return $response;
}

function razorpay_verify_payment_signature(string $orderId, string $paymentId, string $signature): bool
{
    $config = razorpay_load_config();
    $expected = hash_hmac('sha256', $orderId . '|' . $paymentId, $config['key_secret']);
    return hash_equals($expected, $signature);
}

function payment_candidate_from_post(): array
{
    $emailRaw = input_string('email', 190);
    return [
        'test_id' => filter_var($_POST['test_id'] ?? 0, FILTER_VALIDATE_INT) ?: 0,
        'name' => input_string('name', 150),
        'mobile' => preg_replace('/\D+/', '', input_string('mobile', 20)),
        'email_raw' => $emailRaw,
        'email' => $emailRaw !== '' ? filter_var($emailRaw, FILTER_VALIDATE_EMAIL) : null,
        'category' => input_string('category', 60) ?: null,
        'city' => input_string('city', 120) ?: null,
        'state' => input_string('state', 120) ?: null,
        'promo_code' => normalize_promo_code(input_string('promo_code', 50)),
    ];
}

function payment_validate_candidate(array $candidate): array
{
    $errors = [];

    if ((int) ($candidate['test_id'] ?? 0) <= 0) {
        $errors[] = 'Invalid test selected.';
    }
    if (($candidate['name'] ?? '') === '' || strlen((string) $candidate['name']) < 2) {
        $errors[] = 'Enter a valid name.';
    }
    if (!preg_match('/^[0-9]{10,15}$/', (string) ($candidate['mobile'] ?? ''))) {
        $errors[] = 'Enter a valid mobile number.';
    }
    if (($candidate['email_raw'] ?? '') !== '' && empty($candidate['email'])) {
        $errors[] = 'Enter a valid email address.';
    }

    return $errors;
}

function payment_duplicate_registered(PDO $pdo, int $testId, string $mobile, ?string $email): ?array
{
    $sql = 'SELECT r.registration_id, r.status, r.payment_status
            FROM test_registrations r
            INNER JOIN users u ON u.id = r.user_id
            WHERE r.test_id = ?
              AND r.status = "registered"
              AND (u.mobile = ?';
    $params = [$testId, $mobile];

    if ($email) {
        $sql .= ' OR u.email = ?';
        $params[] = $email;
    }

    $sql .= ') LIMIT 1';
    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    $row = $stmt->fetch();

    return $row ?: null;
}

function payment_reserved_registration_count(PDO $pdo, int $testId): int
{
    $stmt = $pdo->prepare(
        "SELECT COUNT(*)
         FROM test_registrations
         WHERE test_id = ?
           AND (
                status = 'registered'
                OR (
                    payment_status = 'pending'
                    AND payment_verified_at IS NULL
                    AND registered_at >= (NOW() - INTERVAL 20 MINUTE)
                )
           )"
    );
    $stmt->execute([$testId]);
    return (int) $stmt->fetchColumn();
}

function payment_calculate_fee(PDO $pdo, array $test, string $promoCode): array
{
    $amountPaise = max(0, (int) ($test['fee_amount_paise'] ?? 500));
    $discountPaise = 0;
    $payablePaise = $amountPaise;
    $promoCodeId = null;
    $promoCodeValue = null;
    $paymentStatus = 'pending';
    $source = 'website_payment';

    if ((int) ($test['is_free'] ?? 0) === 1) {
        return [
            'amount_paise' => 0,
            'discount_paise' => 0,
            'payable_paise' => 0,
            'promo_code_id' => null,
            'promo_code' => null,
            'payment_status' => 'not_required',
            'source' => 'website_free',
        ];
    }

    if ($promoCode !== '') {
        $promoResult = get_active_promo_code($pdo, $promoCode, new DateTimeImmutable('now'));
        if (!$promoResult['valid']) {
            throw new RuntimeException($promoResult['message']);
        }

        $promo = $promoResult['promo'];
        $discountPaise = calculate_discount_paise($amountPaise, $promo);
        $payablePaise = calculate_payable_paise($amountPaise, $discountPaise);
        $promoCodeId = (int) $promo['id'];
        $promoCodeValue = (string) $promo['code'];

        if ($payablePaise === 0) {
            $paymentStatus = 'free_promo';
            $source = 'website_promo';
        }
    }

    return [
        'amount_paise' => $amountPaise,
        'discount_paise' => $discountPaise,
        'payable_paise' => $payablePaise,
        'promo_code_id' => $promoCodeId,
        'promo_code' => $promoCodeValue,
        'payment_status' => $paymentStatus,
        'source' => $source,
    ];
}

function payment_upsert_user(PDO $pdo, array $candidate): int
{
    $userStmt = $pdo->prepare('SELECT * FROM users WHERE mobile = ? LIMIT 1');
    $userStmt->execute([$candidate['mobile']]);
    $user = $userStmt->fetch();

    if (!$user && $candidate['email']) {
        $emailUserStmt = $pdo->prepare('SELECT * FROM users WHERE email = ? LIMIT 1');
        $emailUserStmt->execute([$candidate['email']]);
        $emailUser = $emailUserStmt->fetch();
        if ($emailUser) {
            throw new RuntimeException('This email is already linked with another mobile number.');
        }
    }

    if ($user && $candidate['email'] && !empty($user['email']) && $user['email'] !== $candidate['email']) {
        throw new RuntimeException('This mobile number is already linked with another email address.');
    }

    if ($user) {
        $userId = (int) $user['id'];
        $updateUser = $pdo->prepare('UPDATE users SET name = ?, email = COALESCE(?, email), category = ?, city = ?, state = ? WHERE id = ?');
        $updateUser->execute([
            $candidate['name'],
            $candidate['email'],
            $candidate['category'],
            $candidate['city'],
            $candidate['state'],
            $userId,
        ]);
        return $userId;
    }

    $insertUser = $pdo->prepare('INSERT INTO users (name, mobile, email, category, city, state) VALUES (?, ?, ?, ?, ?, ?)');
    $insertUser->execute([
        $candidate['name'],
        $candidate['mobile'],
        $candidate['email'],
        $candidate['category'],
        $candidate['city'],
        $candidate['state'],
    ]);

    return (int) $pdo->lastInsertId();
}

function payment_generate_unique_registration_id(PDO $pdo): string
{
    do {
        $registrationId = generate_registration_id();
        $check = $pdo->prepare('SELECT id FROM test_registrations WHERE registration_id = ? LIMIT 1');
        $check->execute([$registrationId]);
    } while ($check->fetch());

    return $registrationId;
}

function payment_insert_registration(PDO $pdo, int $testId, int $userId, string $registrationId, string $status, array $fee): int
{
    $insertRegistration = $pdo->prepare(
        'INSERT INTO test_registrations
            (test_id, user_id, registration_id, status, payment_status, amount_paise, discount_paise, payable_paise, promo_code_id, source)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
    );
    $insertRegistration->execute([
        $testId,
        $userId,
        $registrationId,
        $status,
        $fee['payment_status'],
        $fee['amount_paise'],
        $fee['discount_paise'],
        $fee['payable_paise'],
        $fee['promo_code_id'],
        $fee['source'],
    ]);

    return (int) $pdo->lastInsertId();
}

function payment_create_confirmed_registration(PDO $pdo, array $lockedTest, array $candidate, array $fee): string
{
    $duplicate = payment_duplicate_registered($pdo, (int) $lockedTest['id'], (string) $candidate['mobile'], $candidate['email']);
    if ($duplicate) {
        throw new RuntimeException('You are already registered for this test. Registration ID: ' . $duplicate['registration_id']);
    }

    if (payment_reserved_registration_count($pdo, (int) $lockedTest['id']) >= (int) $lockedTest['registration_limit']) {
        throw new RuntimeException('Registration closed. All seats are filled.');
    }

    $userId = payment_upsert_user($pdo, $candidate);

    $existingStmt = $pdo->prepare(
        'SELECT * FROM test_registrations
         WHERE test_id = ? AND user_id = ?
         LIMIT 1
         FOR UPDATE'
    );
    $existingStmt->execute([(int) $lockedTest['id'], $userId]);
    $existing = $existingStmt->fetch();

    if ($existing && (string) ($existing['status'] ?? '') === 'registered') {
        throw new RuntimeException('You are already registered for this test. Registration ID: ' . $existing['registration_id']);
    }

    $registrationId = $existing && !empty($existing['registration_id'])
        ? (string) $existing['registration_id']
        : payment_generate_unique_registration_id($pdo);

    if ($existing) {
        if (!empty($existing['payment_id'])) {
            $cancelPayment = $pdo->prepare(
                'UPDATE payments
                 SET status = CASE WHEN status = "paid" THEN status ELSE "cancelled" END,
                     updated_at = NOW()
                 WHERE id = ?'
            );
            $cancelPayment->execute([(int) $existing['payment_id']]);
        }

        $updateRegistration = $pdo->prepare(
            'UPDATE test_registrations
             SET registration_id = ?,
                 status = "registered",
                 payment_status = ?,
                 amount_paise = ?,
                 discount_paise = ?,
                 payable_paise = ?,
                 promo_code_id = ?,
                 payment_id = NULL,
                 payment_verified_at = NULL,
                 source = ?
             WHERE id = ?'
        );
        $updateRegistration->execute([
            $registrationId,
            $fee['payment_status'],
            $fee['amount_paise'],
            $fee['discount_paise'],
            $fee['payable_paise'],
            $fee['promo_code_id'],
            $fee['source'],
            (int) $existing['id'],
        ]);
    } else {
        payment_insert_registration($pdo, (int) $lockedTest['id'], $userId, $registrationId, 'registered', $fee);
    }

    if (!empty($fee['promo_code_id']) && (int) $fee['payable_paise'] === 0) {
        $incrementPromo = $pdo->prepare('UPDATE promo_codes SET used_count = used_count + 1 WHERE id = ?');
        $incrementPromo->execute([(int) $fee['promo_code_id']]);
    }

    return $registrationId;
}
