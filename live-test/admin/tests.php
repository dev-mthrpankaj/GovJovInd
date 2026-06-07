<?php
declare(strict_types=1);

require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/_layout.php';

$admin = require_admin();
$stmt = db()->query('SELECT id, title, slug, test_date, start_time, end_time, duration_minutes, registration_limit, status, is_free, result_visible FROM tests ORDER BY test_date DESC, start_time DESC');
$tests = $stmt->fetchAll();

admin_header('Tests', $admin);
?>
<section class="panel">
    <div class="panel-header">
        <div>
            <h2>All Tests</h2>
            <p>Create, edit, and manage section timing for Sunday live tests.</p>
        </div>
        <a class="btn btn-primary" href="test-create.php">Create Test</a>
    </div>
    <div class="table-wrap">
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Status</th>
                    <th>Seats</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <?php if (!$tests): ?>
                    <tr><td colspan="6" class="empty-cell">No tests created yet.</td></tr>
                <?php endif; ?>
                <?php foreach ($tests as $test): ?>
                    <tr>
                        <td>
                            <strong><?= e($test['title']) ?></strong>
                            <span class="muted block"><?= e($test['slug']) ?></span>
                        </td>
                        <td><?= e($test['test_date']) ?></td>
                        <td><?= e(substr($test['start_time'], 0, 5)) ?> - <?= e(substr($test['end_time'], 0, 5)) ?></td>
                        <td><span class="status-pill"><?= e(format_status($test['status'])) ?></span></td>
                        <td><?= (int) $test['registration_limit'] ?></td>
                        <td class="actions">
                            <a href="test-edit.php?id=<?= (int) $test['id'] ?>">Edit</a>
                            <a href="sections.php?test_id=<?= (int) $test['id'] ?>">Sections</a>
                            <a href="questions.php?test_id=<?= (int) $test['id'] ?>">Questions</a>
                            <a href="registrations.php?test_id=<?= (int) $test['id'] ?>">Registrations</a>
                            <a href="payments.php?test_id=<?= (int) $test['id'] ?>">Payments</a>
                            <a href="attempts.php?test_id=<?= (int) $test['id'] ?>">Attempts</a>
                            <a href="violations.php?test_id=<?= (int) $test['id'] ?>">Violations</a>
                            <a href="results.php?test_id=<?= (int) $test['id'] ?>">Results</a>
                            <a href="archive.php?test_id=<?= (int) $test['id'] ?>">Archive</a>
                        </td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>
</section>
<?php admin_footer(); ?>
