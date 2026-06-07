<?php
declare(strict_types=1);

require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../includes/csrf.php';
require_once __DIR__ . '/_layout.php';

$admin = require_admin();
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
        $duplicateSlug = db()->prepare('SELECT id FROM tests WHERE slug = ? LIMIT 1');
        $duplicateSlug->execute([$slug]);
        if ($duplicateSlug->fetch()) {
            $errors[] = 'Another test already uses this slug.';
        }
    }

    if (!$errors) {
        $pdo = db();
        $pdo->beginTransaction();
        try {
            $stmt = $pdo->prepare('INSERT INTO tests (title, slug, test_date, start_time, end_time, duration_minutes, registration_start_at, registration_end_at, registration_limit, status, is_free, result_visible) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
            $stmt->execute([$title, $slug, $testDate, $startTime, $endTime, $duration, $registrationStartAt, $registrationEndAt, $limit, $status, $isFree, $resultVisible]);
            $testId = (int) $pdo->lastInsertId();

            $sectionStmt = $pdo->prepare('INSERT INTO test_sections (test_id, section_name, section_slug, section_order, question_count, duration_minutes, is_locked_after_time) VALUES (?, ?, ?, ?, ?, ?, 1)');
            foreach (default_sections() as $section) {
                $sectionStmt->execute([$testId, $section['section_name'], $section['section_slug'], $section['section_order'], $section['question_count'], $section['duration_minutes']]);
            }

            $pdo->commit();
            flash_set('success', 'Test created with default sections.');
            redirect(LIVE_TEST_ADMIN_URL . '/sections.php?test_id=' . $testId);
        } catch (Throwable $exception) {
            if ($pdo->inTransaction()) {
                $pdo->rollBack();
            }
            $errors[] = 'Could not create test because a database error occurred. Local error: ' . $exception->getMessage();
        }
    }
}

admin_header('Create Test', $admin);
?>
<section class="panel narrow-panel">
    <h2>New Test</h2>
    <?php foreach ($errors as $error): ?>
        <div class="alert alert-danger"><?= e($error) ?></div>
    <?php endforeach; ?>
    <form method="post" class="form-grid">
        <?= csrf_field() ?>
        <?php require __DIR__ . '/_test-form-fields.php'; ?>
        <div class="form-actions">
            <button class="btn btn-primary" type="submit">Create Test</button>
            <a class="btn btn-light" href="tests.php">Cancel</a>
        </div>
    </form>
</section>
<?php admin_footer(); ?>
