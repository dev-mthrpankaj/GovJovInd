<?php
declare(strict_types=1);

require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../includes/csrf.php';
require_once __DIR__ . '/_layout.php';

$admin = require_admin();
$testId = filter_var($_GET['id'] ?? 0, FILTER_VALIDATE_INT) ?: 0;
$stmt = db()->prepare('SELECT * FROM tests WHERE id = ? LIMIT 1');
$stmt->execute([$testId]);
$test = $stmt->fetch();

if (!$test) {
    http_response_code(404);
    exit('Test not found.');
}

$errors = [];

if (is_post()) {
    verify_csrf();
    $title = input_string('title', 220);
    $slug = slugify(input_string('slug', 220) ?: $title);
    $testDate = input_string('test_date', 10);
    $startTime = input_string('start_time', 5);
    $endTime = input_string('end_time', 5);
    $duration = max(1, input_int('duration_minutes', 60));
    $defaultWindow = preg_match('/^\d{4}-\d{2}-\d{2}$/', $testDate) ? default_registration_window($testDate) : ['start' => null, 'end' => null];
    $registrationStartAt = normalize_datetime_local(input_string('registration_start_at', 20)) ?: $defaultWindow['start'];
    $registrationEndAt = normalize_datetime_local(input_string('registration_end_at', 20)) ?: $defaultWindow['end'];
    $limit = max(1, input_int('registration_limit', 300));
    $status = input_string('status', 40);
    $isFree = isset($_POST['is_free']) ? 1 : 0;
    $resultVisible = isset($_POST['result_visible']) ? 1 : 0;

    if ($title === '') {
        $errors[] = 'Title is required.';
    }
    if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $testDate)) {
        $errors[] = 'Valid test date is required.';
    }
    if (!preg_match('/^\d{2}:\d{2}$/', $startTime) || !preg_match('/^\d{2}:\d{2}$/', $endTime)) {
        $errors[] = 'Valid start and end time are required.';
    }
    if (!$registrationStartAt || !$registrationEndAt) {
        $errors[] = 'Valid registration start and end date/time are required.';
    } elseif (new DateTimeImmutable($registrationStartAt) >= new DateTimeImmutable($registrationEndAt)) {
        $errors[] = 'Registration start must be before registration end.';
    }
    if (!in_array($status, valid_test_statuses(), true)) {
        $errors[] = 'Invalid test status.';
    }
    if (!$errors) {
        $duplicateSlug = db()->prepare('SELECT id FROM tests WHERE slug = ? AND id != ? LIMIT 1');
        $duplicateSlug->execute([$slug, $testId]);
        if ($duplicateSlug->fetch()) {
            $errors[] = 'Another test already uses this slug.';
        }
    }

    if (!$errors) {
        try {
            $update = db()->prepare('UPDATE tests SET title = ?, slug = ?, test_date = ?, start_time = ?, end_time = ?, duration_minutes = ?, registration_start_at = ?, registration_end_at = ?, registration_limit = ?, status = ?, is_free = ?, result_visible = ? WHERE id = ?');
            $update->execute([$title, $slug, $testDate, $startTime, $endTime, $duration, $registrationStartAt, $registrationEndAt, $limit, $status, $isFree, $resultVisible, $testId]);
            flash_set('success', 'Test updated.');
            redirect(LIVE_TEST_ADMIN_URL . '/tests.php');
        } catch (Throwable $exception) {
            $errors[] = 'Could not update test. Check that the slug is unique.';
        }
    }
}

admin_header('Edit Test', $admin);
?>
<section class="panel narrow-panel">
    <h2><?= e($test['title']) ?></h2>
    <?php foreach ($errors as $error): ?>
        <div class="alert alert-danger"><?= e($error) ?></div>
    <?php endforeach; ?>
    <form method="post" class="form-grid">
        <?= csrf_field() ?>
        <?php require __DIR__ . '/_test-form-fields.php'; ?>
        <div class="form-actions">
            <button class="btn btn-primary" type="submit">Save Changes</button>
            <a class="btn btn-light" href="sections.php?test_id=<?= (int) $testId ?>">Manage Sections</a>
            <a class="btn btn-light" href="tests.php">Cancel</a>
        </div>
    </form>
</section>
<?php admin_footer(); ?>
