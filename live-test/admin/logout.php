<?php
declare(strict_types=1);

require_once __DIR__ . '/../includes/auth.php';

admin_logout();
redirect(LIVE_TEST_ADMIN_URL . '/login.php');
