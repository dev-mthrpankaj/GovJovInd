<?php
declare(strict_types=1);

require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../includes/csrf.php';
require_once __DIR__ . '/_layout.php';

$admin = require_admin();
$pdo = db();
$questionId = filter_var($_GET['id'] ?? 0, FILTER_VALIDATE_INT) ?: 0;
$errors = [];

$stmt = $pdo->prepare('SELECT * FROM questions WHERE id = ? LIMIT 1');
$stmt->execute([$questionId]);
$question = $stmt->fetch();

if (!$question) {
    http_response_code(404);
    exit('Question not found.');
}

$selectedTestId = (int) $question['test_id'];
$selectedSectionId = (int) $question['section_id'];
$tests = $pdo->query('SELECT id, title, slug FROM tests ORDER BY test_date DESC, start_time DESC')->fetchAll();
$sectionStmt = $pdo->prepare('SELECT id, test_id, section_name, section_slug FROM test_sections WHERE test_id = ? ORDER BY section_order ASC');
$sectionStmt->execute([$selectedTestId]);
$sections = $sectionStmt->fetchAll();

if (is_post()) {
    verify_csrf();
    $selectedTestId = input_int('test_id', 0);
    $selectedSectionId = input_int('section_id', 0);
    $questionNumber = input_int('question_number', 0);
    $correctOption = input_string('correct_option', 1);
    $difficulty = input_string('difficulty', 20);
    $isActive = isset($_POST['is_active']) ? 1 : 0;
    $newUploads = [
        'question_image_path' => upload_image_file('question_image', 'uploads/questions', 'q', $errors),
        'option_a_image_path' => upload_image_file('option_a_image', 'uploads/options', 'oa', $errors),
        'option_b_image_path' => upload_image_file('option_b_image', 'uploads/options', 'ob', $errors),
        'option_c_image_path' => upload_image_file('option_c_image', 'uploads/options', 'oc', $errors),
        'option_d_image_path' => upload_image_file('option_d_image', 'uploads/options', 'od', $errors),
        'explanation_image_path' => upload_image_file('explanation_image', 'uploads/explanations', 'exp', $errors),
    ];
    $finalImages = [
        'question_image_path' => $newUploads['question_image_path'] ?: (isset($_POST['remove_question_image']) ? null : $question['question_image_path']),
        'option_a_image_path' => $newUploads['option_a_image_path'] ?: (isset($_POST['remove_option_a_image']) ? null : $question['option_a_image_path']),
        'option_b_image_path' => $newUploads['option_b_image_path'] ?: (isset($_POST['remove_option_b_image']) ? null : $question['option_b_image_path']),
        'option_c_image_path' => $newUploads['option_c_image_path'] ?: (isset($_POST['remove_option_c_image']) ? null : $question['option_c_image_path']),
        'option_d_image_path' => $newUploads['option_d_image_path'] ?: (isset($_POST['remove_option_d_image']) ? null : $question['option_d_image_path']),
        'explanation_image_path' => $newUploads['explanation_image_path'] ?: (isset($_POST['remove_explanation_image']) ? null : $question['explanation_image_path']),
    ];

    $sectionCheck = $pdo->prepare('SELECT id, question_count FROM test_sections WHERE id = ? AND test_id = ? LIMIT 1');
    $sectionCheck->execute([$selectedSectionId, $selectedTestId]);
    $section = $sectionCheck->fetch();

    if (!$section) {
        $errors[] = 'Selected section does not belong to selected test.';
    }
    if ($questionNumber < 1) {
        $errors[] = 'Question number must be numeric and greater than zero.';
    }
    if (!in_array($correctOption, correct_options(), true)) {
        $errors[] = 'Correct option must be A, B, C, or D.';
    }
    if ($difficulty !== '' && !in_array($difficulty, valid_difficulties(), true)) {
        $errors[] = 'Invalid difficulty.';
    }
    if ($section) {
        $sectionSlugStmt = $pdo->prepare('SELECT section_slug FROM test_sections WHERE id = ? AND test_id = ? LIMIT 1');
        $sectionSlugStmt->execute([$selectedSectionId, $selectedTestId]);
        $sectionSlug = (string) $sectionSlugStmt->fetchColumn();
        $optionImages = [
            'a' => $finalImages['option_a_image_path'],
            'b' => $finalImages['option_b_image_path'],
            'c' => $finalImages['option_c_image_path'],
            'd' => $finalImages['option_d_image_path'],
        ];
        $errors = array_merge($errors, validate_question_language_fields($_POST, $sectionSlug, $optionImages));
    }

    if (!$errors) {
        $duplicate = $pdo->prepare('SELECT id FROM questions WHERE test_id = ? AND section_id = ? AND question_number = ? AND id <> ? LIMIT 1');
        $duplicate->execute([$selectedTestId, $selectedSectionId, $questionNumber, $questionId]);
        if ($duplicate->fetch()) {
            $errors[] = 'This question number already exists in the selected section.';
        }
    }

    if (!$errors && $isActive && empty($question['is_active'])) {
        $activeCountStmt = $pdo->prepare('SELECT COUNT(*) FROM questions WHERE test_id = ? AND section_id = ? AND is_active = 1');
        $activeCountStmt->execute([$selectedTestId, $selectedSectionId]);
        if ((int) $activeCountStmt->fetchColumn() >= (int) $section['question_count']) {
            $errors[] = 'This section already has the maximum active questions.';
        }
    }

    if ($errors) {
        foreach ($newUploads as $uploadedPath) {
            delete_upload_file($uploadedPath);
        }
    }

    if (!$errors) {
        $update = $pdo->prepare('UPDATE questions SET test_id = ?, section_id = ?, question_number = ?, question_hi = ?, question_en = ?, question_image_path = ?, question_image_alt = ?, option_a_hi = ?, option_b_hi = ?, option_c_hi = ?, option_d_hi = ?, option_a_en = ?, option_b_en = ?, option_c_en = ?, option_d_en = ?, option_a_image_path = ?, option_b_image_path = ?, option_c_image_path = ?, option_d_image_path = ?, correct_option = ?, explanation_hi = ?, explanation_en = ?, explanation_image_path = ?, difficulty_level = ?, is_active = ? WHERE id = ?');
        $update->execute([
            $selectedTestId,
            $selectedSectionId,
            $questionNumber,
            input_string('question_hi', 10000),
            input_string('question_en', 10000),
            $finalImages['question_image_path'],
            input_string('question_image_alt', 255),
            input_string('option_a_hi', 5000),
            input_string('option_b_hi', 5000),
            input_string('option_c_hi', 5000),
            input_string('option_d_hi', 5000),
            input_string('option_a_en', 5000),
            input_string('option_b_en', 5000),
            input_string('option_c_en', 5000),
            input_string('option_d_en', 5000),
            $finalImages['option_a_image_path'],
            $finalImages['option_b_image_path'],
            $finalImages['option_c_image_path'],
            $finalImages['option_d_image_path'],
            $correctOption,
            input_string('explanation_hi', 10000),
            input_string('explanation_en', 10000),
            $finalImages['explanation_image_path'],
            $difficulty !== '' ? $difficulty : null,
            $isActive,
            $questionId,
        ]);
        foreach ($finalImages as $field => $path) {
            if ($path !== $question[$field]) {
                delete_upload_file($question[$field]);
            }
        }
        flash_set('success', 'Question updated.');
        redirect(LIVE_TEST_ADMIN_URL . '/questions.php?test_id=' . $selectedTestId . '&section_id=' . $selectedSectionId);
    }
}

admin_header('Edit Question', $admin);
?>
<section class="panel">
    <div class="panel-header">
        <div>
            <h2>Edit Question <?= (int) $question['question_number'] ?></h2>
            <p>Correct answers stay visible only inside protected admin pages.</p>
        </div>
        <a class="btn btn-light" href="questions.php?test_id=<?= (int) $selectedTestId ?>&section_id=<?= (int) $selectedSectionId ?>">Back to Questions</a>
    </div>
    <?php foreach ($errors as $error): ?>
        <div class="alert alert-danger"><?= e($error) ?></div>
    <?php endforeach; ?>
    <form method="post" class="form-grid" enctype="multipart/form-data">
        <?= csrf_field() ?>
        <?php require __DIR__ . '/_question-form-fields.php'; ?>
        <div class="form-actions">
            <button class="btn btn-primary" type="submit">Save Changes</button>
            <a class="btn btn-light" href="questions.php?test_id=<?= (int) $selectedTestId ?>&section_id=<?= (int) $selectedSectionId ?>">Cancel</a>
        </div>
    </form>
</section>
<script>
window.MathJax = {
    tex: {
        inlineMath: [['\\(', '\\)']],
        displayMath: [['\\[', '\\]']]
    },
    svg: { fontCache: 'global' }
};
</script>
<script defer src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js"></script>
<script>
(function () {
    function renderPreview(source) {
        var preview = document.querySelector('[data-math-preview="' + source.dataset.mathSource + '"]');
        if (!preview) {
            return;
        }
        preview.textContent = source.value || 'No explanation preview yet.';
        if (window.MathJax && window.MathJax.typesetPromise) {
            window.MathJax.typesetClear([preview]);
            window.MathJax.typesetPromise([preview]);
        }
    }

    document.querySelectorAll('[data-math-source]').forEach(function (source) {
        source.addEventListener('input', function () {
            renderPreview(source);
        });
        renderPreview(source);
    });
}());
</script>
<?php admin_footer(); ?>
