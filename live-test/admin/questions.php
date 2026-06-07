<?php
declare(strict_types=1);

require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../includes/csrf.php';
require_once __DIR__ . '/_layout.php';

$admin = require_admin();
$pdo = db();

if (is_post()) {
    verify_csrf();
    $action = input_string('action', 30);
    $questionId = input_int('question_id', 0);
    $returnTestId = input_int('test_id', 0);
    $returnSectionId = input_int('section_id', 0);

    if ($action === 'deactivate' && $questionId > 0) {
        $stmt = $pdo->prepare('UPDATE questions SET is_active = 0 WHERE id = ?');
        $stmt->execute([$questionId]);
        flash_set('success', 'Question deactivated.');
    }

    redirect(LIVE_TEST_ADMIN_URL . '/questions.php?test_id=' . $returnTestId . '&section_id=' . $returnSectionId);
}

$tests = $pdo->query('SELECT id, title, slug FROM tests ORDER BY test_date DESC, start_time DESC')->fetchAll();
$selectedTestId = filter_var($_GET['test_id'] ?? ($tests[0]['id'] ?? 0), FILTER_VALIDATE_INT) ?: 0;

$sections = [];
$test = null;
if ($selectedTestId > 0) {
    $stmt = $pdo->prepare('SELECT id, title, slug FROM tests WHERE id = ? LIMIT 1');
    $stmt->execute([$selectedTestId]);
    $test = $stmt->fetch();

    $sectionStmt = $pdo->prepare('SELECT * FROM test_sections WHERE test_id = ? ORDER BY section_order ASC');
    $sectionStmt->execute([$selectedTestId]);
    $sections = $sectionStmt->fetchAll();
}

$selectedSectionId = filter_var($_GET['section_id'] ?? ($sections[0]['id'] ?? 0), FILTER_VALIDATE_INT) ?: 0;

$counts = [];
if ($selectedTestId > 0) {
    $countStmt = $pdo->prepare('SELECT section_id, COUNT(*) AS total FROM questions WHERE test_id = ? AND is_active = 1 GROUP BY section_id');
    $countStmt->execute([$selectedTestId]);
    foreach ($countStmt->fetchAll() as $row) {
        $counts[(int) $row['section_id']] = (int) $row['total'];
    }
}

$questions = [];
if ($selectedTestId > 0 && $selectedSectionId > 0) {
    $questionStmt = $pdo->prepare('SELECT q.*, s.section_name FROM questions q INNER JOIN test_sections s ON s.id = q.section_id WHERE q.test_id = ? AND q.section_id = ? ORDER BY q.question_number ASC');
    $questionStmt->execute([$selectedTestId, $selectedSectionId]);
    $questions = $questionStmt->fetchAll();
}

$totalActive = array_sum($counts);

admin_header('Questions', $admin);
?>
<section class="panel">
    <div class="panel-header">
        <div>
            <h2>Question Bank</h2>
            <p>Manage questions section-wise. Readiness is complete at 100/100 active questions.</p>
        </div>
        <div class="form-actions">
            <a class="btn btn-primary" href="question-add.php?test_id=<?= (int) $selectedTestId ?>&section_id=<?= (int) $selectedSectionId ?>">Add Question</a>
            <a class="btn btn-light" href="question-import.php?test_id=<?= (int) $selectedTestId ?>">Import CSV</a>
            <a class="btn btn-light" href="tests.php">Back to Tests</a>
        </div>
    </div>
    <form method="get" class="filter-grid">
        <label>Test
            <select name="test_id" onchange="this.form.submit()">
                <?php foreach ($tests as $row): ?>
                    <option value="<?= (int) $row['id'] ?>" <?= (int) $row['id'] === (int) $selectedTestId ? 'selected' : '' ?>><?= e($row['title']) ?></option>
                <?php endforeach; ?>
            </select>
        </label>
        <label>Section
            <select name="section_id" onchange="this.form.submit()">
                <?php foreach ($sections as $section): ?>
                    <option value="<?= (int) $section['id'] ?>" <?= (int) $section['id'] === (int) $selectedSectionId ? 'selected' : '' ?>><?= e($section['section_name']) ?></option>
                <?php endforeach; ?>
            </select>
        </label>
    </form>
</section>

<?php if ($test): ?>
<section class="progress-grid" aria-label="Section progress">
    <?php foreach ($sections as $section): ?>
        <?php
        $activeCount = $counts[(int) $section['id']] ?? 0;
        $target = (int) $section['question_count'];
        $state = $activeCount === $target ? 'complete' : 'warning';
        ?>
        <a class="progress-card progress-<?= e($state) ?>" href="questions.php?test_id=<?= (int) $selectedTestId ?>&section_id=<?= (int) $section['id'] ?>">
            <span><?= e($section['section_name']) ?></span>
            <strong><?= (int) $activeCount ?>/<?= (int) $target ?></strong>
            <em><?= $activeCount === $target ? 'Complete' : 'Needs questions' ?></em>
        </a>
    <?php endforeach; ?>
    <article class="progress-card progress-total">
        <span>Overall</span>
        <strong><?= (int) $totalActive ?>/100</strong>
        <em><?= $totalActive === 100 ? 'Ready' : 'Not ready' ?></em>
    </article>
</section>
<?php endif; ?>

<section class="panel">
    <div class="table-wrap">
        <table>
            <thead>
                <tr>
                    <th>No.</th>
                    <th>Question</th>
                    <th>Correct</th>
                    <th>Difficulty</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <?php if (!$questions): ?>
                    <tr><td colspan="6" class="empty-cell">No questions found for this section.</td></tr>
                <?php endif; ?>
                <?php foreach ($questions as $question): ?>
                    <tr>
                        <td><?= (int) $question['question_number'] ?></td>
                        <td>
                            <strong><?= e($question['question_en'] ?: $question['question_hi'] ?: 'Untitled question') ?></strong>
                            <?php if ($question['question_hi']): ?><span class="muted block"><?= e($question['question_hi']) ?></span><?php endif; ?>
                            <?php if (!empty($question['question_image_path'])): ?>
                                <span class="question-image-chip">
                                    <img src="../<?= e($question['question_image_path']) ?>" alt="<?= e($question['question_image_alt'] ?: 'Question figure') ?>">
                                    Figure
                                </span>
                            <?php endif; ?>
                            <?php if (!empty($question['option_a_image_path']) || !empty($question['option_b_image_path']) || !empty($question['option_c_image_path']) || !empty($question['option_d_image_path'])): ?>
                                <span class="status-pill">Option images</span>
                            <?php endif; ?>
                        </td>
                        <td><?= e($question['correct_option']) ?></td>
                        <td><?= e($question['difficulty_level'] ? format_status($question['difficulty_level']) : 'Not set') ?></td>
                        <td><span class="status-pill"><?= !empty($question['is_active']) ? 'Active' : 'Inactive' ?></span></td>
                        <td class="actions">
                            <a href="question-edit.php?id=<?= (int) $question['id'] ?>">Edit</a>
                            <?php if (!empty($question['is_active'])): ?>
                                <form method="post" class="inline-form" onsubmit="return confirm('Deactivate this question?');">
                                    <?= csrf_field() ?>
                                    <input type="hidden" name="action" value="deactivate">
                                    <input type="hidden" name="question_id" value="<?= (int) $question['id'] ?>">
                                    <input type="hidden" name="test_id" value="<?= (int) $selectedTestId ?>">
                                    <input type="hidden" name="section_id" value="<?= (int) $selectedSectionId ?>">
                                    <button type="submit" class="link-button">Deactivate</button>
                                </form>
                            <?php endif; ?>
                        </td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>
</section>
<?php admin_footer(); ?>
