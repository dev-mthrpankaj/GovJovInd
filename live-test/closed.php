<?php
declare(strict_types=1);

require_once __DIR__ . '/includes/public-layout.php';

$testId = filter_var($_GET['test_id'] ?? 0, FILTER_VALIDATE_INT) ?: 0;
$test = null;
if ($testId > 0) {
    $stmt = db()->prepare('SELECT * FROM tests WHERE id = ? LIMIT 1');
    $stmt->execute([$testId]);
    $test = $stmt->fetch();
}

public_header('Test Status');
?>
<section class="panel status-panel">
    <?php if ($test): ?>
        <span class="status-badge <?= in_array($test['status'], ['closed', 'result_published', 'archived'], true) ? 'status-closed' : '' ?>"><?= e(public_test_status_label($test['status'])) ?></span>
        <h1><?= e($test['title']) ?></h1>
        <?php if ($test['status'] === 'upcoming'): ?>
            <p class="muted">This test is upcoming. Registration is not open yet.</p>
        <?php elseif ($test['status'] === 'registration_open'): ?>
            <?php $window = registration_window_status($test); ?>
            <p class="muted"><?= e($window['message']) ?></p>
        <?php elseif ($test['status'] === 'result_published'): ?>
            <p class="muted">Result is published. You can check your result or view the leaderboard.</p>
            <div class="form-actions">
                <a class="btn btn-primary" href="result.php">Check Result</a>
                <a class="btn btn-light" href="leaderboard.php?test_id=<?= (int) $test['id'] ?>">View Leaderboard</a>
            </div>
        <?php elseif ($test['status'] === 'archived'): ?>
            <p class="muted">This test is archived. New registration and attempts are closed.</p>
        <?php elseif ($test['status'] === 'closed'): ?>
            <p class="muted">This test is closed. Results will appear here after publication.</p>
        <?php else: ?>
            <p class="muted">Please open the test list for the current action.</p>
        <?php endif; ?>
    <?php else: ?>
        <h1>Test unavailable</h1>
        <p class="muted">Please select a valid test.</p>
    <?php endif; ?>
    <div class="form-actions">
        <a class="btn btn-primary" href="index.php">Back to Tests</a>
    </div>
</section>
<?php public_footer(); ?>
