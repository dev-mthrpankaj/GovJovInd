<?php
declare(strict_types=1);

require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../includes/anti-cheat.php';
require_once __DIR__ . '/_layout.php';

$admin = require_admin();
$tests = db()->query('SELECT id, title, slug FROM tests ORDER BY test_date DESC, start_time DESC')->fetchAll();
$selectedTestId = filter_var($_GET['test_id'] ?? 0, FILTER_VALIDATE_INT) ?: 0;

$where = '';
$params = [];
if ($selectedTestId > 0) {
    $where = 'WHERE a.test_id = ?';
    $params[] = $selectedTestId;
}

$stmt = db()->prepare(
    'SELECT a.*, r.registration_id AS public_registration_id, u.name, u.mobile, t.title AS test_title
     FROM test_attempts a
     INNER JOIN test_registrations r ON r.id = a.registration_id
     INNER JOIN users u ON u.id = a.user_id
     INNER JOIN tests t ON t.id = a.test_id
     ' . $where . '
     ORDER BY a.updated_at DESC
     LIMIT 300'
);
$stmt->execute($params);
$attempts = $stmt->fetchAll();

$rows = [];
foreach ($attempts as $attempt) {
    $eligibility = recompute_attempt_eligibility((int) $attempt['id']);
    if ($eligibility['status'] !== 'clean' || $eligibility['fast_maths_count'] > 0 || $eligibility['fast_reasoning_count'] > 0) {
        $attempt['fast_maths_count'] = $eligibility['fast_maths_count'];
        $attempt['fast_reasoning_count'] = $eligibility['fast_reasoning_count'];
        $attempt['computed_status'] = $eligibility['status'];
        $attempt['computed_reason'] = $eligibility['reason'];
        $rows[] = $attempt;
    }
}

admin_header('Suspicious Users', $admin);
?>
<section class="panel">
    <div class="panel-header">
        <div>
            <h2>Suspicious Users</h2>
            <p>Review violation counts, eligibility status, and fast-answer signals for Maths and Reasoning.</p>
        </div>
    </div>
    <form method="get" class="filter-grid">
        <label>Test
            <select name="test_id" onchange="this.form.submit()">
                <option value="0">All tests</option>
                <?php foreach ($tests as $test): ?>
                    <option value="<?= (int) $test['id'] ?>" <?= (int) $test['id'] === $selectedTestId ? 'selected' : '' ?>><?= e($test['title']) ?></option>
                <?php endforeach; ?>
            </select>
        </label>
    </form>
</section>

<section class="panel">
    <div class="table-wrap">
        <table>
            <thead>
                <tr>
                    <th>Candidate</th>
                    <th>Registration</th>
                    <th>Attempt Status</th>
                    <th>Violations</th>
                    <th>Fast Maths</th>
                    <th>Fast Reasoning</th>
                    <th>Eligibility</th>
                    <th>Reason</th>
                </tr>
            </thead>
            <tbody>
                <?php if (!$rows): ?>
                    <tr><td colspan="8" class="empty-cell">No suspicious users found.</td></tr>
                <?php endif; ?>
                <?php foreach ($rows as $row): ?>
                    <tr>
                        <td><strong><?= e($row['name']) ?></strong><span class="muted block"><?= e($row['mobile']) ?></span></td>
                        <td><?= e($row['public_registration_id']) ?></td>
                        <td><?= e(format_status($row['status'])) ?></td>
                        <td><?= (int) $row['violation_count'] ?></td>
                        <td><?= (int) $row['fast_maths_count'] ?></td>
                        <td><?= (int) $row['fast_reasoning_count'] ?></td>
                        <td><span class="status-pill"><?= e(format_status($row['computed_status'])) ?></span></td>
                        <td><?= e($row['computed_reason'] ?: $row['disqualification_reason'] ?: '-') ?></td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>
</section>
<?php admin_footer(); ?>
