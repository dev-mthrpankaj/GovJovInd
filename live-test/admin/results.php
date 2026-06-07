<?php
declare(strict_types=1);

require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../includes/csrf.php';
require_once __DIR__ . '/../includes/result-helpers.php';
require_once __DIR__ . '/_layout.php';

$admin = require_admin();
$tests = db()->query('SELECT * FROM tests ORDER BY test_date DESC, start_time DESC')->fetchAll();
$selectedTestId = filter_var($_GET['test_id'] ?? ($tests[0]['id'] ?? 0), FILTER_VALIDATE_INT) ?: 0;

if (isset($_GET['export']) && $_GET['export'] === 'csv' && $selectedTestId > 0) {
    $rows = leaderboard_for_test($selectedTestId, 10000);
    header('Content-Type: text/csv');
    header('Content-Disposition: attachment; filename="live-test-results-' . $selectedTestId . '.csv"');
    $out = fopen('php://output', 'w');
    fputcsv($out, ['rank', 'name', 'marks', 'correct', 'wrong', 'attempted', 'accuracy', 'submit_time']);
    foreach ($rows as $row) {
        fputcsv($out, [$row['overall_rank'], $row['name'], $row['marks'], $row['correct_count'], $row['wrong_count'], $row['attempted_count'], $row['accuracy'], $row['submitted_at']]);
    }
    fclose($out);
    exit;
}

$selectedTest = null;
foreach ($tests as $test) {
    if ((int) $test['id'] === (int) $selectedTestId) {
        $selectedTest = $test;
        break;
    }
}

$summary = ['results' => 0, 'eligible' => 0, 'disqualified' => 0, 'suspicious' => 0];
$topRanks = [];
$flagged = [];

if ($selectedTest) {
    $summaryStmt = db()->prepare(
        'SELECT
            COUNT(*) AS results,
            SUM(CASE WHEN tr.leaderboard_eligible = 1 AND a.leaderboard_eligible = 1 THEN 1 ELSE 0 END) AS eligible,
            SUM(CASE WHEN a.eligibility_status = "disqualified" THEN 1 ELSE 0 END) AS disqualified,
            SUM(CASE WHEN a.eligibility_status = "suspicious" THEN 1 ELSE 0 END) AS suspicious
         FROM test_results tr
         INNER JOIN test_attempts a ON a.id = tr.attempt_id
         WHERE tr.test_id = ?'
    );
    $summaryStmt->execute([$selectedTestId]);
    $summary = array_map('intval', $summaryStmt->fetch() ?: $summary);
    $topRanks = leaderboard_for_test($selectedTestId, 20);

    $flagStmt = db()->prepare(
        'SELECT tr.marks, tr.accuracy, a.eligibility_status, a.disqualification_reason, u.name, u.mobile, r.registration_id
         FROM test_results tr
         INNER JOIN test_attempts a ON a.id = tr.attempt_id
         INNER JOIN users u ON u.id = tr.user_id
         INNER JOIN test_registrations r ON r.id = a.registration_id
         WHERE tr.test_id = ? AND a.eligibility_status IN ("suspicious", "disqualified")
         ORDER BY a.eligibility_status ASC, tr.marks DESC'
    );
    $flagStmt->execute([$selectedTestId]);
    $flagged = $flagStmt->fetchAll();
}

admin_header('Results', $admin);
?>
<section class="panel">
    <div class="panel-header">
        <div>
            <h2>Result Management</h2>
            <p>Generate, regenerate, publish, hide, and export live test results.</p>
        </div>
    </div>
    <form method="get" class="filter-grid">
        <label>Test
            <select name="test_id" onchange="this.form.submit()">
                <?php foreach ($tests as $test): ?>
                    <option value="<?= (int) $test['id'] ?>" <?= (int) $test['id'] === (int) $selectedTestId ? 'selected' : '' ?>><?= e($test['title']) ?></option>
                <?php endforeach; ?>
            </select>
        </label>
    </form>
</section>

<?php if ($selectedTest): ?>
<section class="stat-grid">
    <article class="stat-card"><span>Total Results</span><strong><?= (int) $summary['results'] ?></strong></article>
    <article class="stat-card"><span>Eligible</span><strong><?= (int) $summary['eligible'] ?></strong></article>
    <article class="stat-card"><span>Suspicious</span><strong><?= (int) $summary['suspicious'] ?></strong></article>
    <article class="stat-card"><span>Disqualified</span><strong><?= (int) $summary['disqualified'] ?></strong></article>
</section>

<section class="panel">
    <div class="panel-header">
        <div>
            <h2><?= e($selectedTest['title']) ?></h2>
            <p>Result visible: <?= !empty($selectedTest['result_visible']) ? 'Yes' : 'No' ?></p>
        </div>
        <div class="form-actions">
            <form method="post" action="result-generate.php" class="inline-form">
                <?= csrf_field() ?>
                <input type="hidden" name="test_id" value="<?= (int) $selectedTestId ?>">
                <input type="hidden" name="action" value="generate">
                <button class="btn btn-primary" type="submit">Generate / Regenerate</button>
            </form>
            <form method="post" action="result-generate.php" class="inline-form">
                <?= csrf_field() ?>
                <input type="hidden" name="test_id" value="<?= (int) $selectedTestId ?>">
                <input type="hidden" name="action" value="<?= !empty($selectedTest['result_visible']) ? 'hide' : 'publish' ?>">
                <button class="btn btn-light" type="submit"><?= !empty($selectedTest['result_visible']) ? 'Hide Result' : 'Publish Result' ?></button>
            </form>
            <a class="btn btn-light" href="results.php?test_id=<?= (int) $selectedTestId ?>&export=csv">Export CSV</a>
            <a class="btn btn-light" href="backup.php?test_id=<?= (int) $selectedTestId ?>&type=summary">Summary CSV</a>
        </div>
    </div>
</section>

<section class="panel">
    <h2>Top Ranks</h2>
    <div class="table-wrap">
        <table>
            <thead><tr><th>Rank</th><th>Name</th><th>Marks</th><th>Correct</th><th>Wrong</th><th>Accuracy</th><th>Submit Time</th></tr></thead>
            <tbody>
                <?php if (!$topRanks): ?><tr><td colspan="7" class="empty-cell">No eligible ranks generated yet.</td></tr><?php endif; ?>
                <?php foreach ($topRanks as $row): ?>
                    <tr>
                        <td><?= (int) $row['overall_rank'] ?></td>
                        <td><?= e($row['name']) ?></td>
                        <td><?= e((string) $row['marks']) ?></td>
                        <td><?= (int) $row['correct_count'] ?></td>
                        <td><?= (int) $row['wrong_count'] ?></td>
                        <td><?= e((string) $row['accuracy']) ?>%</td>
                        <td><?= e($row['submitted_at']) ?></td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>
</section>

<section class="panel">
    <h2>Suspicious / Disqualified</h2>
    <div class="table-wrap">
        <table>
            <thead><tr><th>Name</th><th>Mobile</th><th>Registration</th><th>Status</th><th>Marks</th><th>Reason</th></tr></thead>
            <tbody>
                <?php if (!$flagged): ?><tr><td colspan="6" class="empty-cell">No flagged users.</td></tr><?php endif; ?>
                <?php foreach ($flagged as $row): ?>
                    <tr>
                        <td><?= e($row['name']) ?></td>
                        <td><?= e($row['mobile']) ?></td>
                        <td><?= e($row['registration_id']) ?></td>
                        <td><span class="status-pill"><?= e(format_status($row['eligibility_status'])) ?></span></td>
                        <td><?= e((string) $row['marks']) ?></td>
                        <td><?= e($row['disqualification_reason'] ?: '-') ?></td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>
</section>
<?php endif; ?>
<?php admin_footer(); ?>
