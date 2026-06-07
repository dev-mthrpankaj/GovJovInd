<?php
declare(strict_types=1);

require_once __DIR__ . '/includes/public-layout.php';
require_once __DIR__ . '/includes/csrf.php';

if (!is_post()) {
    $testId = filter_var($_GET['test_id'] ?? 0, FILTER_VALIDATE_INT) ?: 0;
    $rid = trim((string) ($_GET['rid'] ?? $_SESSION['live_test_registration_id'] ?? ''));

    if ($testId > 0) {
        redirect('instructions.php?test_id=' . $testId);
    }

    if ($rid !== '') {
        redirect('instructions.php?rid=' . urlencode($rid));
    }

    redirect('instructions.php');
}

verify_csrf();
$rid = input_string('rid', 60);
$accepted = isset($_POST['accepted']);
$registration = find_registration_by_code($rid);

if (!$registration) {
    redirect('index.php');
}

if (!$accepted) {
    redirect('instructions.php?rid=' . urlencode($rid));
}

if ($registration['status'] !== 'live') {
    redirect('closed.php?test_id=' . (int) $registration['test_id']);
}

$_SESSION['live_test_registration_id'] = $registration['registration_id'];
$sections = test_sections_with_offsets((int) $registration['test_id']);
$timing = timing_context($registration, $sections);
$testEnd = test_end_datetime($registration);
$now = new DateTimeImmutable('now');
$ridParam = urlencode($registration['registration_id']);

public_header('Start Test');
?>
<section class="panel start-panel">
    <span class="status-badge status-live">Live Access Verified</span>
    <h1><?= e($registration['title']) ?></h1>
    <?php if ($now > $testEnd || $timing['has_ended']): ?>
        <p class="muted">Test time is over. You can check result after admin publishes it.</p>
    <?php elseif (!$timing['has_started']): ?>
        <p class="muted">Please stay on this page. Your test screen will open automatically when the test starts.</p>
    <?php else: ?>
        <p class="muted">Your registration is verified. Start when you are ready; the server timer controls your available time.</p>
    <?php endif; ?>
    <div class="detail-list">
        <div><strong>Candidate</strong><span><?= e($registration['name']) ?></span></div>
        <div><strong>Registration ID</strong><span><?= e($registration['registration_id']) ?></span></div>
        <div><strong>Test Time</strong><span><?= e(substr($registration['start_time'], 0, 5)) ?> - <?= e(substr($registration['end_time'], 0, 5)) ?></span></div>
    </div>
    <?php if ($now > $testEnd || $timing['has_ended']): ?>
        <div class="alert alert-warning">Test time is over. You can check result after admin publishes it.</div>
        <div class="form-actions">
            <a class="btn btn-primary" href="index.php">Back to Live Tests</a>
            <a class="btn btn-light" href="closed.php?test_id=<?= (int) $registration['test_id'] ?>">View Status</a>
        </div>
    <?php elseif (!$timing['has_started']): ?>
        <div class="countdown-card" data-start-countdown="<?= (int) $timing['test_start_epoch'] - (int) $timing['server_epoch'] ?>" data-redirect-url="attempt.php?rid=<?= e($ridParam) ?>">
            <span>Test will start in</span>
            <strong id="startCountdown">--:--</strong>
            <p>Please stay on this page. Your test screen will open automatically when the test starts.</p>
        </div>
        <div class="form-actions">
            <a class="btn btn-light" href="instructions.php?rid=<?= e($ridParam) ?>">Back to Instructions</a>
        </div>
        <script src="assets/js/start-countdown.js"></script>
    <?php else: ?>
        <div class="form-actions">
            <a class="btn btn-primary" href="attempt.php?rid=<?= e($ridParam) ?>">Start / Resume Attempt</a>
            <a class="btn btn-light" href="instructions.php?rid=<?= e($ridParam) ?>">Back to Instructions</a>
        </div>
    <?php endif; ?>
</section>
<?php public_footer(); ?>
