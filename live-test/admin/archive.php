<?php
declare(strict_types=1);

require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../includes/csrf.php';
require_once __DIR__ . '/_layout.php';

$admin = require_admin();
$tests = db()->query('SELECT * FROM tests ORDER BY test_date DESC, start_time DESC')->fetchAll();
$selectedTestId = filter_var($_GET['test_id'] ?? $_POST['test_id'] ?? ($tests[0]['id'] ?? 0), FILTER_VALIDATE_INT) ?: 0;
$errors = [];

if (is_post()) {
    verify_csrf();
    $notes = input_string('notes', 2000);
    $confirm = isset($_POST['confirm_archive']);
    $stmt = db()->prepare('SELECT * FROM tests WHERE id = ? LIMIT 1');
    $stmt->execute([$selectedTestId]);
    $test = $stmt->fetch();

    if (!$test) {
        $errors[] = 'Test not found.';
    } elseif (!in_array($test['status'], ['closed', 'result_published'], true) && !$confirm) {
        $errors[] = 'This test is not closed/result_published. Tick confirmation to archive anyway.';
    } else {
        $pdo = db();
        $pdo->beginTransaction();
        try {
            $update = $pdo->prepare('UPDATE tests SET status = "archived" WHERE id = ?');
            $update->execute([$selectedTestId]);
            $insert = $pdo->prepare('INSERT INTO test_archives (test_id, archived_by, notes) VALUES (?, ?, ?)');
            $insert->execute([$selectedTestId, (int) $admin['id'], $notes ?: null]);
            $pdo->commit();
            flash_set('success', 'Test archived. Data was kept intact.');
            redirect(LIVE_TEST_ADMIN_URL . '/archive.php?test_id=' . $selectedTestId);
        } catch (Throwable $exception) {
            $pdo->rollBack();
            $errors[] = 'Could not archive test.';
        }
    }
}

$archiveStmt = db()->query('SELECT ta.*, t.title, t.slug, a.name AS admin_name FROM test_archives ta INNER JOIN tests t ON t.id = ta.test_id LEFT JOIN admins a ON a.id = ta.archived_by ORDER BY ta.created_at DESC');
$archives = $archiveStmt->fetchAll();

admin_header('Archive Tests', $admin);
?>
<section class="panel narrow-panel">
    <div class="panel-header"><div><h2>Archive Test</h2><p>Archiving keeps all data but closes registration and new attempts.</p></div></div>
    <?php foreach ($errors as $error): ?><div class="alert alert-danger"><?= e($error) ?></div><?php endforeach; ?>
    <form method="post" class="form-stack">
        <?= csrf_field() ?>
        <label>Test
            <select name="test_id" onchange="window.location='archive.php?test_id=' + this.value">
                <?php foreach ($tests as $test): ?><option value="<?= (int) $test['id'] ?>" <?= (int) $test['id'] === $selectedTestId ? 'selected' : '' ?>><?= e($test['title']) ?> (<?= e(format_status($test['status'])) ?>)</option><?php endforeach; ?>
            </select>
        </label>
        <label>Archive Notes
            <textarea name="notes" rows="4" placeholder="Optional notes for this archive"></textarea>
        </label>
        <label class="check-row">
            <input type="checkbox" name="confirm_archive" value="1">
            Confirm archive even if this test is not closed/result_published.
        </label>
        <div class="form-actions">
            <button class="btn btn-primary" type="submit">Archive Test</button>
            <a class="btn btn-light" href="backup.php?test_id=<?= (int) $selectedTestId ?>">Download Backups First</a>
        </div>
    </form>
</section>

<section class="panel">
    <h2>Archived Tests</h2>
    <div class="table-wrap"><table><thead><tr><th>Test</th><th>Archived At</th><th>Admin</th><th>Notes</th><th>Exports</th></tr></thead><tbody>
    <?php if (!$archives): ?><tr><td colspan="5" class="empty-cell">No archived tests yet.</td></tr><?php endif; ?>
    <?php foreach ($archives as $row): ?><tr><td><strong><?= e($row['title']) ?></strong><span class="muted block"><?= e($row['slug']) ?></span></td><td><?= e($row['created_at']) ?></td><td><?= e($row['admin_name'] ?: '-') ?></td><td><?= e($row['notes'] ?: '-') ?></td><td><a href="backup.php?test_id=<?= (int) $row['test_id'] ?>">Backups</a></td></tr><?php endforeach; ?>
    </tbody></table></div>
</section>
<?php admin_footer(); ?>
