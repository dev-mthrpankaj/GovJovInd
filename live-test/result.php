<?php
declare(strict_types=1);

require_once __DIR__ . '/includes/public-layout.php';
require_once __DIR__ . '/includes/result-helpers.php';

$registrationId = input_string('registration_id', 60);
$mobile = preg_replace('/\D+/', '', input_string('mobile', 20));
$result = null;
$error = '';

if (is_post()) {
    if ($registrationId === '') {
        $error = 'Enter your registration ID.';
    } else {
        $result = result_by_registration($registrationId, $mobile ?: null);
        if (!$result) {
            $error = 'Result not found. Check registration ID and mobile.';
        } elseif (empty($result['result_visible'])) {
            $error = 'Result is not published yet.';
            $result = null;
        }
    }
}

public_header('Result');
?>
<section class="panel">
    <p class="eyebrow">Live Test Result</p>
    <h1>Check Your Result</h1>
    <p class="muted">Result is visible only after admin publishes it.</p>
    <?php if ($error): ?><div class="alert alert-danger"><?= e($error) ?></div><?php endif; ?>
    <form method="post" class="form-grid">
        <label>Registration ID
            <input type="text" name="registration_id" value="<?= e($registrationId) ?>" required>
        </label>
        <label>Registered Mobile (optional)
            <input type="tel" name="mobile" value="<?= e($mobile) ?>">
        </label>
        <div class="form-actions">
            <button class="btn btn-primary" type="submit">Check Result</button>
            <a class="btn btn-light" href="index.php">Back</a>
        </div>
    </form>
</section>

<?php if ($result): ?>
    <?php $sections = json_decode($result['section_summary'] ?: '[]', true) ?: []; ?>
    <section class="panel">
        <span class="status-badge"><?= e(format_status($result['eligibility_status'])) ?></span>
        <h2><?= e($result['title']) ?></h2>
        <div class="result-score">
            <div>
                <span>Marks</span>
                <strong><?= e((string) $result['marks']) ?>/100</strong>
            </div>
            <div>
                <span>Rank</span>
                <strong><?= $result['overall_rank'] ? (int) $result['overall_rank'] : '-' ?></strong>
            </div>
            <div>
                <span>Accuracy</span>
                <strong><?= e((string) $result['accuracy']) ?>%</strong>
            </div>
        </div>
        <div class="detail-list">
            <div><strong>Candidate</strong><span><?= e($result['name']) ?></span></div>
            <div><strong>Registration ID</strong><span><?= e($result['public_registration_id']) ?></span></div>
            <div><strong>Marks</strong><span><?= e((string) $result['marks']) ?>/100</span></div>
            <div><strong>Rank</strong><span><?= $result['overall_rank'] ? (int) $result['overall_rank'] : 'Not eligible / not ranked' ?></span></div>
            <div><strong>Accuracy</strong><span><?= e((string) $result['accuracy']) ?>%</span></div>
        </div>
        <div class="stat-grid">
            <article class="stat-card"><span>Attempted</span><strong><?= (int) $result['attempted_count'] ?></strong></article>
            <article class="stat-card"><span>Correct</span><strong><?= (int) $result['correct_count'] ?></strong></article>
            <article class="stat-card"><span>Wrong</span><strong><?= (int) $result['wrong_count'] ?></strong></article>
            <article class="stat-card"><span>Not Attempted</span><strong><?= (int) $result['not_attempted_count'] ?></strong></article>
        </div>
        <div class="form-actions">
            <a class="btn btn-primary" href="download-report.php?registration_id=<?= e(urlencode($result['public_registration_id'])) ?>&mobile=<?= e(urlencode($result['mobile'])) ?>">Download Report</a>
            <a class="btn btn-light" href="leaderboard.php?test_id=<?= (int) $result['test_id'] ?>">Leaderboard</a>
        </div>
    </section>

    <section class="panel">
        <h2>Subject-wise Performance</h2>
        <div class="table-wrap public-table-wrap">
            <table class="public-table">
                <thead><tr><th>Subject</th><th>Marks</th><th>Attempted</th><th>Correct</th><th>Wrong</th><th>Accuracy</th></tr></thead>
                <tbody>
                    <?php foreach ($sections as $section): ?>
                        <tr>
                            <td data-label="Subject"><?= e($section['section_name']) ?></td>
                            <td data-label="Marks"><?= e((string) $section['marks']) ?></td>
                            <td data-label="Attempted"><?= (int) $section['attempted'] ?></td>
                            <td data-label="Correct"><?= (int) $section['correct'] ?></td>
                            <td data-label="Wrong"><?= (int) $section['wrong'] ?></td>
                            <td data-label="Accuracy"><?= e((string) $section['accuracy']) ?>%</td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
    </section>
<?php endif; ?>
<?php public_footer(); ?>
