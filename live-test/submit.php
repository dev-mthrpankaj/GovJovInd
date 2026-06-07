<?php
declare(strict_types=1);

require_once __DIR__ . '/includes/public-layout.php';
require_once __DIR__ . '/includes/anti-cheat.php';
require_once __DIR__ . '/includes/csrf.php';

if (isset($_GET['submitted'])) {
    $registration = current_registration_from_request();
    $summary = [
        'total' => 0,
        'answered' => 0,
        'left' => 0,
        'marked' => 0,
        'answered_marked' => 0,
        'status' => !empty($_GET['auto']) ? 'Auto Submitted' : 'Submitted',
    ];

    if ($registration) {
        $attemptStmt = db()->prepare('SELECT * FROM test_attempts WHERE registration_id = ? LIMIT 1');
        $attemptStmt->execute([(int) $registration['id']]);
        $attempt = $attemptStmt->fetch();

        $totalStmt = db()->prepare('SELECT COUNT(*) FROM questions WHERE test_id = ? AND is_active = 1');
        $totalStmt->execute([(int) $registration['test_id']]);
        $summary['total'] = (int) $totalStmt->fetchColumn();

        if ($attempt) {
            $statusStmt = db()->prepare(
                'SELECT
                    SUM(CASE WHEN ua.answer_status IN ("answered", "answered_marked_review") THEN 1 ELSE 0 END) AS answered,
                    SUM(CASE WHEN ua.answer_status = "marked_review" THEN 1 ELSE 0 END) AS marked,
                    SUM(CASE WHEN ua.answer_status = "answered_marked_review" THEN 1 ELSE 0 END) AS answered_marked
                 FROM user_answers ua
                 INNER JOIN questions q ON q.id = ua.question_id
                 WHERE ua.attempt_id = ? AND q.test_id = ? AND q.is_active = 1'
            );
            $statusStmt->execute([(int) $attempt['id'], (int) $registration['test_id']]);
            $counts = $statusStmt->fetch() ?: [];
            $summary['answered'] = (int) ($counts['answered'] ?? 0);
            $summary['marked'] = (int) ($counts['marked'] ?? 0);
            $summary['answered_marked'] = (int) ($counts['answered_marked'] ?? 0);
            $summary['status'] = format_status((string) $attempt['status']);
        }

        $summary['left'] = max(0, $summary['total'] - $summary['answered']);
    }

    public_header('Test Submitted');
    ?>
    <section class="panel submission-summary-panel">
        <div class="alert alert-success">Congratulations! Your test has been submitted successfully.</div>
        <p class="eyebrow">Submission Summary</p>
        <h1>Submission Received</h1>
        <?php if ($registration): ?>
            <div class="detail-list submission-candidate">
                <div><strong>Candidate</strong><span><?= e($registration['name']) ?></span></div>
                <div><strong>Registration ID</strong><span><?= e($registration['registration_id']) ?></span></div>
                <div><strong>Status</strong><span><?= e($summary['status']) ?></span></div>
            </div>
        <?php endif; ?>
        <div class="stat-grid submission-stats">
            <article class="stat-card"><span>Total Questions</span><strong><?= (int) $summary['total'] ?></strong></article>
            <article class="stat-card"><span>Answered</span><strong><?= (int) $summary['answered'] ?></strong></article>
            <article class="stat-card"><span>Not Answered / Left</span><strong><?= (int) $summary['left'] ?></strong></article>
            <article class="stat-card"><span>Marked for Review</span><strong><?= (int) $summary['marked'] ?></strong></article>
            <article class="stat-card"><span>Answered + Marked</span><strong><?= (int) $summary['answered_marked'] ?></strong></article>
        </div>
        <p class="muted">Result will be available after the test is over and admin publishes it. Please check again after a few minutes.</p>
        <div class="form-actions">
            <a class="btn btn-primary" href="index.php">Go to Live Test Home</a>
            <?php if ($registration): ?>
                <a class="btn btn-light" href="result.php?registration_id=<?= e(urlencode($registration['registration_id'])) ?>">Check Result</a>
                <a class="btn btn-light" href="leaderboard.php?test_id=<?= (int) $registration['test_id'] ?>">View Leaderboard</a>
            <?php endif; ?>
        </div>
    </section>
    <?php
    public_footer();
    exit;
}

if (!is_post()) {
    redirect('index.php');
}

$registration = current_registration_from_request();
if (!$registration) {
    json_response(['ok' => false, 'message' => 'Invalid registration.'], 403);
}

$attemptId = input_int('attempt_id', 0);
$token = input_string('attempt_token', 80);
$mode = input_string('submit_mode', 20);

if (!$attemptId || !verify_attempt_token($attemptId, $token)) {
    json_response(['ok' => false, 'message' => 'Invalid attempt token.'], 403);
}

$attemptStmt = db()->prepare('SELECT * FROM test_attempts WHERE id = ? AND registration_id = ? LIMIT 1');
$attemptStmt->execute([$attemptId, (int) $registration['id']]);
$attempt = $attemptStmt->fetch();

if (!$attempt) {
    json_response(['ok' => false, 'message' => 'Attempt not found.'], 404);
}

if (!in_array($attempt['status'], ['submitted', 'auto_submitted'], true)) {
    $status = $mode === 'auto' ? 'auto_submitted' : 'submitted';
    $update = db()->prepare('UPDATE test_attempts SET status = ?, submitted_at = NOW() WHERE id = ?');
    $update->execute([$status, $attemptId]);
}

recompute_attempt_eligibility($attemptId);

json_response(['ok' => true, 'redirect' => 'submit.php?submitted=1' . ($mode === 'auto' ? '&auto=1' : '')]);
