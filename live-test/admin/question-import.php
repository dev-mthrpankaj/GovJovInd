<?php
declare(strict_types=1);

require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../includes/csrf.php';
require_once __DIR__ . '/_layout.php';

$admin = require_admin();
$pdo = db();
$errors = [];
$summary = '';
$tests = $pdo->query('SELECT id, title, slug FROM tests ORDER BY test_date DESC, start_time DESC')->fetchAll();
$selectedTestId = filter_var($_GET['test_id'] ?? $_POST['test_id'] ?? ($tests[0]['id'] ?? 0), FILTER_VALIDATE_INT) ?: 0;

$expectedHeaders = ['test_slug', 'section_slug', 'question_number', 'question_hi', 'question_en', 'option_a_hi', 'option_b_hi', 'option_c_hi', 'option_d_hi', 'option_a_en', 'option_b_en', 'option_c_en', 'option_d_en', 'correct_option', 'explanation_hi', 'explanation_en', 'difficulty'];

if (is_post()) {
    verify_csrf();
    $selectedTestId = input_int('test_id', 0);

    $testStmt = $pdo->prepare('SELECT id, slug FROM tests WHERE id = ? LIMIT 1');
    $testStmt->execute([$selectedTestId]);
    $selectedTest = $testStmt->fetch();

    if (!$selectedTest) {
        $errors[] = 'Select a valid test.';
    }
    if (empty($_FILES['csv_file']['tmp_name']) || !is_uploaded_file($_FILES['csv_file']['tmp_name'])) {
        $errors[] = 'Upload a CSV file.';
    }

    $rowsToInsert = [];
    if (!$errors) {
        $handle = fopen($_FILES['csv_file']['tmp_name'], 'r');
        if (!$handle) {
            $errors[] = 'Could not read uploaded CSV.';
        } else {
            $headers = fgetcsv($handle);
            if (!$headers || array_map('trim', $headers) !== $expectedHeaders) {
                $errors[] = 'CSV headers do not match the required format.';
            } else {
                $sectionStmt = $pdo->prepare('SELECT * FROM test_sections WHERE test_id = ?');
                $sectionStmt->execute([$selectedTestId]);
                $sectionsBySlug = [];
                foreach ($sectionStmt->fetchAll() as $section) {
                    $sectionsBySlug[$section['section_slug']] = $section;
                }

                $existingStmt = $pdo->prepare('SELECT section_id, question_number FROM questions WHERE test_id = ?');
                $existingStmt->execute([$selectedTestId]);
                $existingNumbers = [];
                foreach ($existingStmt->fetchAll() as $row) {
                    $existingNumbers[(int) $row['section_id'] . ':' . (int) $row['question_number']] = true;
                }

                $activeCountStmt = $pdo->prepare('SELECT section_id, COUNT(*) AS total FROM questions WHERE test_id = ? AND is_active = 1 GROUP BY section_id');
                $activeCountStmt->execute([$selectedTestId]);
                $activeCounts = [];
                foreach ($activeCountStmt->fetchAll() as $row) {
                    $activeCounts[(int) $row['section_id']] = (int) $row['total'];
                }

                $seenInCsv = [];
                $lineNumber = 1;
                while (($data = fgetcsv($handle)) !== false) {
                    $lineNumber++;
                    if (count($data) === 1 && trim((string) $data[0]) === '') {
                        continue;
                    }
                    if (count($data) !== count($expectedHeaders)) {
                        $errors[] = 'Row ' . $lineNumber . ': column count does not match headers.';
                        continue;
                    }

                    $row = array_combine($expectedHeaders, array_map('trim', $data));
                    $questionNumber = filter_var($row['question_number'], FILTER_VALIDATE_INT);
                    $correctOption = strtoupper($row['correct_option']);
                    $difficulty = strtolower($row['difficulty']);

                    if ($row['test_slug'] !== $selectedTest['slug']) {
                        $errors[] = 'Row ' . $lineNumber . ': test_slug does not match selected test.';
                        continue;
                    }
                    if (!isset($sectionsBySlug[$row['section_slug']])) {
                        $errors[] = 'Row ' . $lineNumber . ': section_slug not found for selected test.';
                        continue;
                    }
                    if ($questionNumber === false || $questionNumber < 1) {
                        $errors[] = 'Row ' . $lineNumber . ': question_number must be numeric.';
                        continue;
                    }
                    if (!in_array($correctOption, correct_options(), true)) {
                        $errors[] = 'Row ' . $lineNumber . ': correct_option must be A, B, C, or D.';
                        continue;
                    }
                    if ($difficulty !== '' && !in_array($difficulty, valid_difficulties(), true)) {
                        $errors[] = 'Row ' . $lineNumber . ': difficulty must be easy, medium, hard, or blank.';
                        continue;
                    }
                    $section = $sectionsBySlug[$row['section_slug']];
                    $languageErrors = validate_question_language_fields($row, (string) $section['section_slug']);
                    if ($languageErrors) {
                        foreach ($languageErrors as $languageError) {
                            $errors[] = 'Row ' . $lineNumber . ': ' . $languageError;
                        }
                        continue;
                    }

                    $key = (int) $section['id'] . ':' . (int) $questionNumber;
                    if (isset($existingNumbers[$key])) {
                        $errors[] = 'Row ' . $lineNumber . ': duplicate question_number in this test section.';
                        continue;
                    }
                    if (isset($seenInCsv[$key])) {
                        $errors[] = 'Row ' . $lineNumber . ': duplicate question_number already appears in this CSV.';
                        continue;
                    }
                    $seenInCsv[$key] = true;

                    $currentActive = $activeCounts[(int) $section['id']] ?? 0;
                    if ($currentActive + 1 > (int) $section['question_count']) {
                        $errors[] = 'Row ' . $lineNumber . ': section would exceed maximum active questions.';
                        continue;
                    }
                    $activeCounts[(int) $section['id']] = $currentActive + 1;

                    $rowsToInsert[] = [$selectedTestId, (int) $section['id'], (int) $questionNumber, $row, $correctOption, $difficulty !== '' ? $difficulty : null];
                }
            }
            fclose($handle);
        }
    }

    if (!$errors && $rowsToInsert) {
        $pdo->beginTransaction();
        try {
            $insert = $pdo->prepare('INSERT INTO questions (test_id, section_id, question_number, question_hi, question_en, option_a_hi, option_b_hi, option_c_hi, option_d_hi, option_a_en, option_b_en, option_c_en, option_d_en, correct_option, explanation_hi, explanation_en, difficulty_level, is_active) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)');
            foreach ($rowsToInsert as [$testId, $sectionId, $questionNumber, $row, $correctOption, $difficulty]) {
                $insert->execute([$testId, $sectionId, $questionNumber, $row['question_hi'], $row['question_en'], $row['option_a_hi'], $row['option_b_hi'], $row['option_c_hi'], $row['option_d_hi'], $row['option_a_en'], $row['option_b_en'], $row['option_c_en'], $row['option_d_en'], $correctOption, $row['explanation_hi'], $row['explanation_en'], $difficulty]);
            }
            $pdo->commit();
            $summary = count($rowsToInsert) . ' question(s) imported successfully.';
        } catch (Throwable $exception) {
            $pdo->rollBack();
            $errors[] = 'Import failed during database insert. No rows were imported.';
        }
    } elseif (!$errors) {
        $errors[] = 'CSV had no valid rows to import.';
    }
}

admin_header('Import Questions', $admin);
?>
<section class="panel narrow-panel">
    <div class="panel-header">
        <div>
            <h2>CSV Import</h2>
            <p>Import active questions by matching test_slug and section_slug.</p>
        </div>
        <a class="btn btn-light" href="questions.php?test_id=<?= (int) $selectedTestId ?>">Back to Questions</a>
    </div>
    <?php if ($summary): ?><div class="alert alert-success"><?= e($summary) ?></div><?php endif; ?>
    <?php foreach ($errors as $error): ?>
        <div class="alert alert-danger"><?= e($error) ?></div>
    <?php endforeach; ?>
    <form method="post" enctype="multipart/form-data" class="form-stack">
        <?= csrf_field() ?>
        <label>Test
            <select name="test_id" required>
                <?php foreach ($tests as $test): ?>
                    <option value="<?= (int) $test['id'] ?>" <?= (int) $test['id'] === (int) $selectedTestId ? 'selected' : '' ?>><?= e($test['title']) ?> (<?= e($test['slug']) ?>)</option>
                <?php endforeach; ?>
            </select>
        </label>
        <label>CSV File
            <input type="file" name="csv_file" accept=".csv,text/csv" required>
        </label>
        <div class="form-actions">
            <button class="btn btn-primary" type="submit">Import CSV</button>
            <a class="btn btn-light" href="../database/sample-questions.csv">Download Sample CSV</a>
        </div>
    </form>
</section>
<?php admin_footer(); ?>
