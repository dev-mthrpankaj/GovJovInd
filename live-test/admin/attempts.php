<?php
declare(strict_types=1);

require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/_layout.php';

$admin = require_admin();
$tests = db()->query('SELECT id, title FROM tests ORDER BY test_date DESC, start_time DESC')->fetchAll();
$selectedTestId = filter_var($_GET['test_id'] ?? ($tests[0]['id'] ?? 0), FILTER_VALIDATE_INT) ?: 0;
$stmt = db()->prepare('SELECT a.*, r.registration_id AS public_registration_id, u.name, u.mobile FROM test_attempts a INNER JOIN test_registrations r ON r.id = a.registration_id INNER JOIN users u ON u.id = a.user_id WHERE a.test_id = ? ORDER BY a.id DESC');
$stmt->execute([$selectedTestId]);
$attempts = $stmt->fetchAll();

admin_header('Attempts', $admin);
?>
<section class="panel">
    <div class="panel-header">
        <div><h2>Attempts</h2><p>Review submitted and in-progress attempts.</p></div>
        <a class="btn btn-light" href="backup.php?test_id=<?= (int) $selectedTestId ?>&type=attempts">Export CSV</a>
    </div>
    <form method="get" class="filter-grid">
        <label>Test<select name="test_id" onchange="this.form.submit()"><?php foreach ($tests as $test): ?><option value="<?= (int) $test['id'] ?>" <?= (int) $test['id'] === $selectedTestId ? 'selected' : '' ?>><?= e($test['title']) ?></option><?php endforeach; ?></select></label>
    </form>
</section>
<section class="panel"><div class="table-wrap"><table><thead><tr><th>Registration</th><th>Name</th><th>Mobile</th><th>Status</th><th>Started</th><th>Submitted</th><th>Eligibility</th><th>Violations</th></tr></thead><tbody>
<?php if (!$attempts): ?><tr><td colspan="8" class="empty-cell">No attempts found.</td></tr><?php endif; ?>
<?php foreach ($attempts as $row): ?><tr><td><?= e($row['public_registration_id']) ?></td><td><?= e($row['name']) ?></td><td><?= e($row['mobile']) ?></td><td><?= e(format_status($row['status'])) ?></td><td><?= e($row['started_at'] ?: '-') ?></td><td><?= e($row['submitted_at'] ?: '-') ?></td><td><span class="status-pill"><?= e(format_status($row['eligibility_status'])) ?></span></td><td><?= (int) $row['violation_count'] ?></td></tr><?php endforeach; ?>
</tbody></table></div></section>
<?php admin_footer(); ?>
