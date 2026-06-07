<?php
declare(strict_types=1);

define('LIVE_TEST_APP_NAME', 'GovJobUpdates Sunday Live Test');
define('LIVE_TEST_BASE_PATH', dirname(__DIR__));
define('LIVE_TEST_BASE_URL', '/live-test');
define('LIVE_TEST_ADMIN_URL', LIVE_TEST_BASE_URL . '/admin');

define('DB_HOST', 'localhost');
define('DB_NAME', 'govjobupdates_live_test');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_CHARSET', 'utf8mb4');

define('SESSION_NAME', 'govjob_live_test_admin');

date_default_timezone_set('Asia/Kolkata');
define('LIVE_TEST_LOCAL_REGISTRATION_OVERRIDE', False);

if (session_status() === PHP_SESSION_NONE) {
    session_name(SESSION_NAME);
    session_set_cookie_params([
        'lifetime' => 0,
        'path' => LIVE_TEST_BASE_URL,
        'secure' => !empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off',
        'httponly' => true,
        'samesite' => 'Lax',
    ]);
    session_start();
}
