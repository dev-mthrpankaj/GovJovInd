<?php
declare(strict_types=1);

require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../includes/csrf.php';
require_once __DIR__ . '/../includes/result-helpers.php';

$admin = require_admin();

if (!is_post()) {
    redirect(LIVE_TEST_ADMIN_URL . '/results.php');
}

verify_csrf();
$testId = input_int('test_id', 0);
$action = input_string('action', 30);

$stmt = db()->prepare('SELECT * FROM tests WHERE id = ? LIMIT 1');
$stmt->execute([$testId]);
$test = $stmt->fetch();

if (!$test) {
    flash_set('danger', 'Test not found.');
    redirect(LIVE_TEST_ADMIN_URL . '/results.php');
}

if ($action === 'generate') {
    $summary = generate_results_for_test($testId);
    flash_set('success', 'Results generated for ' . $summary['generated'] . ' submitted attempt(s).');
} elseif ($action === 'publish') {
    $update = db()->prepare('UPDATE tests SET result_visible = 1, status = "result_published" WHERE id = ?');
    $update->execute([$testId]);
    flash_set('success', 'Result published.');
} elseif ($action === 'hide') {
    $update = db()->prepare('UPDATE tests SET result_visible = 0, status = "closed" WHERE id = ?');
    $update->execute([$testId]);
    flash_set('success', 'Result hidden.');
}

redirect(LIVE_TEST_ADMIN_URL . '/results.php?test_id=' . $testId);
