<?php
declare(strict_types=1);

require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../includes/csrf.php';
require_once __DIR__ . '/_layout.php';

$admin = require_admin();
$testId = filter_var($_GET['test_id'] ?? $_POST['test_id'] ?? 0, FILTER_VALIDATE_INT) ?: 0;

$stmt = db()->prepare('SELECT * FROM tests WHERE id = ? LIMIT 1');
$stmt->execute([$testId]);
$test = $stmt->fetch();

if (!$test) {
    http_response_code(404);
    exit('Test not found.');
}

$errors = [];

if (is_post()) {
    verify_csrf();
    $names = $_POST['section_name'] ?? [];
    $slugs = $_POST['section_slug'] ?? [];
    $orders = $_POST['section_order'] ?? [];
    $counts = $_POST['question_count'] ?? [];
    $durations = $_POST['duration_minutes'] ?? [];
    $ids = $_POST['section_id'] ?? [];

    for ($i = 0; $i < count($names); $i++) {
        $name = trim((string) ($names[$i] ?? ''));
        $slug = slugify((string) ($slugs[$i] ?? $name));
        $order = max(1, (int) ($orders[$i] ?? 0));
        $count = max(1, (int) ($counts[$i] ?? 20));
        $duration = max(1, (int) ($durations[$i] ?? 1));
        $sectionId = (int) ($ids[$i] ?? 0);

        if ($name === '' || $sectionId <= 0) {
            $errors[] = 'Every section needs a valid name.';
            break;
        }

        $update = db()->prepare('UPDATE test_sections SET section_name = ?, section_slug = ?, section_order = ?, question_count = ?, duration_minutes = ?, is_locked_after_time = 1 WHERE id = ? AND test_id = ?');
        try {
            $update->execute([$name, $slug, $order, $count, $duration, $sectionId, $testId]);
        } catch (Throwable $exception) {
            $errors[] = 'Could not save sections. Check section slugs and order values are unique.';
            break;
        }
    }

    if (!$errors) {
        flash_set('success', 'Sections updated.');
        redirect(LIVE_TEST_ADMIN_URL . '/sections.php?test_id=' . $testId);
    }
}

$sectionStmt = db()->prepare('SELECT * FROM test_sections WHERE test_id = ? ORDER BY section_order ASC');
$sectionStmt->execute([$testId]);
$sections = $sectionStmt->fetchAll();

admin_header('Manage Sections', $admin);
?>
<section class="panel">
    <div class="panel-header">
        <div>
            <h2><?= e($test['title']) ?></h2>
            <p>Configure section order, question count, and duration. Sections lock automatically after time ends.</p>
        </div>
        <a class="btn btn-light" href="tests.php">Back to Tests</a>
    </div>
    <?php foreach ($errors as $error): ?>
        <div class="alert alert-danger"><?= e($error) ?></div>
    <?php endforeach; ?>
    <form method="post">
        <?= csrf_field() ?>
        <input type="hidden" name="test_id" value="<?= (int) $testId ?>">
        <div class="table-wrap">
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Slug</th>
                        <th>Order</th>
                        <th>Questions</th>
                        <th>Minutes</th>
                        <th>Lock</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($sections as $section): ?>
                        <tr>
                            <td>
                                <input type="hidden" name="section_id[]" value="<?= (int) $section['id'] ?>">
                                <input type="text" name="section_name[]" value="<?= e($section['section_name']) ?>" required>
                            </td>
                            <td><input type="text" name="section_slug[]" value="<?= e($section['section_slug']) ?>" required></td>
                            <td><input type="number" name="section_order[]" min="1" value="<?= (int) $section['section_order'] ?>" required></td>
                            <td><input type="number" name="question_count[]" min="1" value="<?= (int) $section['question_count'] ?>" required></td>
                            <td><input type="number" name="duration_minutes[]" min="1" value="<?= (int) $section['duration_minutes'] ?>" required></td>
                            <td><span class="status-pill">Yes</span></td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
        <div class="form-actions">
            <button class="btn btn-primary" type="submit">Save Sections</button>
            <a class="btn btn-light" href="test-edit.php?id=<?= (int) $testId ?>">Edit Test</a>
        </div>
    </form>
</section>
<?php admin_footer(); ?>
