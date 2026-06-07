<?php
declare(strict_types=1);

require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../includes/csrf.php';

if (current_admin()) {
    redirect(LIVE_TEST_ADMIN_URL . '/dashboard.php');
}

$error = '';

if (is_post()) {
    verify_csrf();
    $email = filter_var(input_string('email', 190), FILTER_VALIDATE_EMAIL);
    $password = (string) ($_POST['password'] ?? '');

    if (!$email || $password === '') {
        $error = 'Enter a valid email and password.';
    } elseif (admin_login($email, $password)) {
        redirect(LIVE_TEST_ADMIN_URL . '/dashboard.php');
    } else {
        $error = 'Invalid admin credentials.';
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Login | GovJob Live Test</title>
    <link rel="stylesheet" href="../assets/css/admin.css">
</head>
<body class="login-page">
    <main class="login-card">
        <p class="eyebrow">GovJobUpdates</p>
        <h1>Live Test Admin</h1>
        <p class="muted">Sign in to manage Sunday live tests and sections.</p>
        <?php if ($error): ?>
            <div class="alert alert-danger"><?= e($error) ?></div>
        <?php endif; ?>
        <form method="post" class="form-stack">
            <?= csrf_field() ?>
            <label>Email
                <input type="email" name="email" required autocomplete="email">
            </label>
            <label>Password
                <input type="password" name="password" required autocomplete="current-password">
            </label>
            <button class="btn btn-primary" type="submit">Login</button>
        </form>
    </main>
</body>
</html>
