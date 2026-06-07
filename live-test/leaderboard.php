<?php
declare(strict_types=1);

require_once __DIR__ . '/includes/public-layout.php';
require_once __DIR__ . '/includes/result-helpers.php';

$testId = filter_var($_GET['test_id'] ?? 0, FILTER_VALIDATE_INT) ?: 0;
$test = null;
$tests = db()->query('SELECT id, title, result_visible FROM tests WHERE result_visible = 1 ORDER BY test_date DESC, start_time DESC')->fetchAll();

if ($testId <= 0 && $tests) {
    $testId = (int) $tests[0]['id'];
}
if ($testId > 0) {
    $stmt = db()->prepare('SELECT * FROM tests WHERE id = ? LIMIT 1');
    $stmt->execute([$testId]);
    $test = $stmt->fetch();
}

public_header('Leaderboard');
?>
<section class="panel">
    <p class="eyebrow">Leaderboard</p>
    <h1>Sunday Live Test Leaderboard</h1>
    <?php if (!$test || empty($test['result_visible'])): ?>
        <div class="alert alert-warning">Leaderboard is not published yet.</div>
    <?php else: ?>
        <p class="muted"><?= e($test['title']) ?></p>
    <?php endif; ?>
    <form method="get" class="form-grid">
        <label>Published Test
            <select name="test_id" onchange="this.form.submit()">
                <?php foreach ($tests as $row): ?>
                    <option value="<?= (int) $row['id'] ?>" <?= (int) $row['id'] === (int) $testId ? 'selected' : '' ?>><?= e($row['title']) ?></option>
                <?php endforeach; ?>
            </select>
        </label>
    </form>
</section>

<?php if ($test && !empty($test['result_visible'])): ?>
    <?php $rows = leaderboard_for_test((int) $test['id'], 300); ?>
    <section class="panel">
        <?php if ($rows): ?>
            <div class="top-rank-grid">
                <?php foreach (array_slice($rows, 0, 3) as $topper): ?>
                    <article class="top-rank-card">
                        <span>Rank <?= (int) $topper['overall_rank'] ?></span>
                        <strong><?= e($topper['name']) ?></strong>
                        <em><?= e((string) $topper['marks']) ?> marks | <?= e((string) $topper['accuracy']) ?>% accuracy</em>
                    </article>
                <?php endforeach; ?>
            </div>
        <?php endif; ?>
        <div class="table-wrap public-table-wrap">
            <table class="public-table">
                <thead><tr><th>Rank</th><th>Name</th><th>Marks</th><th>Correct</th><th>Wrong</th><th>Accuracy</th><th>Submit Time</th></tr></thead>
                <tbody>
                    <?php if (!$rows): ?><tr><td class="leaderboard-empty" colspan="7">No eligible users ranked yet.</td></tr><?php endif; ?>
                    <?php foreach ($rows as $row): ?>
                        <tr>
                            <td data-label="Rank"><?= (int) $row['overall_rank'] ?></td>
                            <td data-label="Name"><?= e($row['name']) ?></td>
                            <td data-label="Marks"><?= e((string) $row['marks']) ?></td>
                            <td data-label="Correct"><?= (int) $row['correct_count'] ?></td>
                            <td data-label="Wrong"><?= (int) $row['wrong_count'] ?></td>
                            <td data-label="Accuracy"><?= e((string) $row['accuracy']) ?>%</td>
                            <td data-label="Submit Time"><?= e($row['submitted_at']) ?></td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
    </section>
<?php endif; ?>
<?php public_footer(); ?>
