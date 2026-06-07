<?php
declare(strict_types=1);

require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../includes/anti-cheat.php';
require_once __DIR__ . '/_layout.php';

$admin = require_admin();
$tests = db()->query('SELECT id, title, slug FROM tests ORDER BY test_date DESC, start_time DESC')->fetchAll();
$selectedTestId = filter_var($_GET['test_id'] ?? 0, FILTER_VALIDATE_INT) ?: 0;

$params = [];
$where = '';
if ($selectedTestId > 0) {
    $where = 'WHERE v.test_id = ?';
    $params[] = $selectedTestId;
}

$stmt = db()->prepare(
    'SELECT v.*, a.status AS attempt_status, a.violation_count, a.eligibility_status, a.disqualification_reason,
            r.registration_id AS public_registration_id, u.name, u.mobile, t.title AS test_title
     FROM violation_logs v
     INNER JOIN test_attempts a ON a.id = v.attempt_id
     INNER JOIN test_registrations r ON r.id = a.registration_id
     INNER JOIN users u ON u.id = a.user_id
     INNER JOIN tests t ON t.id = a.test_id
     ' . $where . '
     ORDER BY v.event_time DESC
     LIMIT 300'
);
$stmt->execute($params);
$violations = $stmt->fetchAll();

admin_header('Violation Logs', $admin);
?>
<section class="panel">
    <div class="panel-header">
        <div>
            <h2>Violation Logs</h2>
            <p>Tab switch, app switch, fullscreen exit, back, copy, right-click and reload events logged during attempts. Reload rows are audit logs and are not counted toward disqualification.</p>
        </div>
        <?php if ($selectedTestId > 0): ?><a class="btn btn-light" href="backup.php?test_id=<?= (int) $selectedTestId ?>&type=violations">Export CSV</a><?php endif; ?>
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
                    <th>Time</th>
                    <th>Candidate</th>
                    <th>Registration</th>
                    <th>Violation</th>
                    <th>Source</th>
                    <th>Attempt</th>
                    <th>Eligibility</th>
                    <th>Reason</th>
                </tr>
            </thead>
            <tbody>
                <?php if (!$violations): ?>
                    <tr><td colspan="8" class="empty-cell">No violations found.</td></tr>
                <?php endif; ?>
                <?php foreach ($violations as $row): ?>
                    <tr>
                        <td><?= e($row['event_time']) ?></td>
                        <td><strong><?= e($row['name']) ?></strong><span class="muted block"><?= e($row['mobile']) ?></span></td>
                        <td><?= e($row['public_registration_id']) ?></td>
                        <td><?= e(format_status($row['violation_type'])) ?></td>
                        <td><?= e($row['event_source'] ?: '-') ?></td>
                        <td><?= e(format_status($row['attempt_status'])) ?><span class="muted block">Count: <?= (int) $row['violation_count'] ?></span></td>
                        <td><span class="status-pill"><?= e(format_status($row['eligibility_status'])) ?></span></td>
                        <td><?= e($row['disqualification_reason'] ?: '-') ?></td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>
</section>
<?php admin_footer(); ?>
