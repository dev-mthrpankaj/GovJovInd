<?php
declare(strict_types=1);

require_once __DIR__ . '/includes/public-layout.php';
require_once __DIR__ . '/includes/anti-cheat.php';
require_once __DIR__ . '/includes/csrf.php';

$registration = current_registration_from_request();

if (!$registration) {
    redirect('index.php');
}

$_SESSION['live_test_registration_id'] = $registration['registration_id'];

if ($registration['status'] !== 'live') {
    redirect('closed.php?test_id=' . (int) $registration['test_id']);
}

$sections = test_sections_with_offsets((int) $registration['test_id']);
$timing = timing_context($registration, $sections);
$testEnd = test_end_datetime($registration);
$now = new DateTimeImmutable('now');

if (!$timing['has_started']) {
    public_header('Test Not Started');
    echo '<section class="panel"><h1>Test has not started yet</h1><p class="muted">Please return at the scheduled start time.</p></section>';
    public_footer();
    exit;
}

$attempt = get_or_create_attempt($registration);
if (in_array($attempt['status'], ['submitted', 'auto_submitted'], true)) {
    redirect('submit.php?submitted=1');
}
recompute_attempt_eligibility((int) $attempt['id']);

if ($now > $testEnd || $timing['has_ended'] || !$timing['active_section']) {
    $stmt = db()->prepare('UPDATE test_attempts SET status = "auto_submitted", submitted_at = COALESCE(submitted_at, NOW()) WHERE id = ? AND status = "in_progress"');
    $stmt->execute([(int) $attempt['id']]);
    redirect('submit.php?submitted=1&auto=1');
}

$activeSection = $timing['active_section'];
$questionStmt = db()->prepare(
    'SELECT id, question_number, question_hi, question_en, question_image_path, question_image_alt,
            option_a_hi, option_b_hi, option_c_hi, option_d_hi,
            option_a_en, option_b_en, option_c_en, option_d_en,
            option_a_image_path, option_b_image_path, option_c_image_path, option_d_image_path
     FROM questions
     WHERE test_id = ? AND section_id = ? AND is_active = 1
     ORDER BY question_number ASC'
);
$questionStmt->execute([(int) $registration['test_id'], (int) $activeSection['id']]);
$questions = $questionStmt->fetchAll();

$answerStmt = db()->prepare(
    'SELECT question_id, selected_option, answer_status, time_spent_seconds, change_count
     FROM user_answers
     WHERE attempt_id = ?'
);
$answerStmt->execute([(int) $attempt['id']]);
$answers = [];
foreach ($answerStmt->fetchAll() as $answer) {
    $answers[(int) $answer['question_id']] = $answer;
}
$totalQuestionStmt = db()->prepare('SELECT COUNT(*) FROM questions WHERE test_id = ? AND is_active = 1');
$totalQuestionStmt->execute([(int) $registration['test_id']]);
$overallTotalQuestions = (int) $totalQuestionStmt->fetchColumn();

$overallAnsweredStmt = db()->prepare(
    'SELECT COUNT(*)
     FROM user_answers ua
     INNER JOIN questions q ON q.id = ua.question_id
     WHERE ua.attempt_id = ?
       AND q.test_id = ?
       AND q.is_active = 1
       AND ua.answer_status IN ("answered", "answered_marked_review")'
);
$overallAnsweredStmt->execute([(int) $attempt['id'], (int) $registration['test_id']]);
$overallAnsweredCount = (int) $overallAnsweredStmt->fetchColumn();

$completedInSection = 0;
$notAnsweredInSection = 0;
$markedInSection = 0;
$answeredMarkedInSection = 0;
foreach ($questions as $question) {
    $status = $answers[(int) $question['id']]['answer_status'] ?? 'not_visited';
    if (in_array($status, ['answered', 'answered_marked_review'], true)) {
        $completedInSection++;
    }
    if (in_array($status, ['not_visited', 'not_answered'], true)) {
        $notAnsweredInSection++;
    }
    if ($status === 'marked_review') {
        $markedInSection++;
    }
    if ($status === 'answered_marked_review') {
        $answeredMarkedInSection++;
    }
}

$token = attempt_token((int) $attempt['id']);
$csrf = csrf_token();
$languageRule = section_language_rule((string) $activeSection['section_slug']);
$isBilingualSection = $languageRule === 'bilingual';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= e($registration['title']) ?> | Attempt</title>
    <link rel="stylesheet" href="assets/css/live-test.css">
</head>
<body class="exam-body attempt-body">
    <div class="exam-shell attempt-shell"
         data-attempt-id="<?= (int) $attempt['id'] ?>"
         data-registration-id="<?= e($registration['registration_id']) ?>"
         data-token="<?= e($token) ?>"
         data-csrf="<?= e($csrf) ?>"
         data-section-remaining="<?= (int) $timing['section_remaining_seconds'] ?>"
         data-total-remaining="<?= (int) $timing['total_remaining_seconds'] ?>"
         data-language-rule="<?= e($isBilingualSection ? 'both' : $languageRule) ?>"
         data-section-answered-initial="<?= (int) $completedInSection ?>"
         data-overall-answered-initial="<?= (int) $overallAnsweredCount ?>"
         data-overall-total="<?= (int) $overallTotalQuestions ?>">
        <header class="exam-topbar attempt-topbar">
            <div class="exam-brand attempt-brand">
                <img src="/Assets/Home%20Page/favicon-96x96.png" alt="GovJobUpdates Logo">
                <span>
                    <span class="exam-kicker">GovJobUpdates</span>
                    <strong>Sunday Live Test</strong>
                    <small><?= e($registration['title']) ?></small>
                </span>
            </div>
            <div class="attempt-section-chip">
                <span>Current Section</span>
                <strong><?= e($activeSection['section_name']) ?></strong>
            </div>
            <div class="attempt-answer-strip">
                <div><span>Section Answered</span><strong><b id="answeredSummary"><?= (int) $completedInSection ?></b>/<b><?= count($questions) ?></b></strong></div>
                <div><span>Overall Answered</span><strong><b id="overallAnsweredSummary"><?= (int) $overallAnsweredCount ?></b>/<b><?= (int) $overallTotalQuestions ?></b></strong></div>
            </div>
            <div class="timer-group attempt-timers">
                <div><span>Section Time</span><strong id="sectionTimer">--:--</strong></div>
                <div><span>Total Left</span><strong id="totalTimer">--:--</strong></div>
            </div>
            <button class="btn btn-danger attempt-top-submit" id="topSubmitBtn" type="button">Submit</button>
            <button class="palette-toggle attempt-mobile-palette" type="button" id="paletteToggle" aria-label="Open question palette">
                <span></span><span></span><span></span>
            </button>
        </header>

        <main class="exam-main attempt-main">
            <section class="question-stage attempt-stage">
                <?php if (!$questions): ?>
                    <article class="exam-card">
                        <h1>No questions found for this section.</h1>
                        <p class="muted">Please contact admin.</p>
                    </article>
                <?php endif; ?>
                <?php foreach ($questions as $index => $question): ?>
                    <?php $answer = $answers[(int) $question['id']] ?? null; ?>
                    <article class="exam-card question-card attempt-question-card <?= $index === 0 ? 'is-active' : '' ?>" data-question-id="<?= (int) $question['id'] ?>" data-question-index="<?= (int) $index ?>">
                        <div class="question-meta attempt-question-meta">
                            <div>
                                <span class="attempt-question-count">Question <?= $index + 1 ?> of <?= count($questions) ?></span>
                                <strong class="attempt-question-short">Q<?= (int) $question['question_number'] ?></strong>
                            </div>
                            <?php if ($isBilingualSection): ?>
                                <label class="attempt-language-control">
                                    <span class="attempt-language-label">Language</span>
                                    <select class="language-mode-select" aria-label="Language">
                                        <option value="hi">Hindi</option>
                                        <option value="en">English</option>
                                        <option value="both" selected>Both</option>
                                    </select>
                                </label>
                            <?php endif; ?>
                            <span class="attempt-section-label"><?= e($activeSection['section_name']) ?></span>
                        </div>
                        <div class="question-content attempt-question-content">
                            <?php if ($languageRule !== 'english' && $question['question_hi']): ?>
                                <p class="question-text lang-hi" data-lang="hi"><?= e($question['question_hi']) ?></p>
                            <?php endif; ?>
                            <?php if ($languageRule !== 'hindi' && $question['question_en']): ?>
                                <p class="question-text lang-en" data-lang="en"><?= e($question['question_en']) ?></p>
                            <?php endif; ?>
                            <?php if (!empty($question['question_image_path'])): ?>
                                <button class="image-zoom" type="button" data-image-src="<?= e($question['question_image_path']) ?>" data-image-alt="<?= e($question['question_image_alt'] ?: 'Question image') ?>">
                                    <img src="<?= e($question['question_image_path']) ?>" alt="<?= e($question['question_image_alt'] ?: 'Question image') ?>">
                                </button>
                            <?php endif; ?>
                        </div>
                        <div class="option-list attempt-option-list" role="radiogroup" aria-label="Question options">
                            <?php foreach (['a' => 'A', 'b' => 'B', 'c' => 'C', 'd' => 'D'] as $key => $label): ?>
                                <?php $selected = $answer && $answer['selected_option'] === $label; ?>
                                <button class="option-card attempt-option <?= $selected ? 'is-selected' : '' ?>" type="button" data-option="<?= e($label) ?>">
                                    <span class="option-label"><?= e($label) ?></span>
                                    <span class="option-copy">
                                        <?php if ($languageRule !== 'english' && $question['option_' . $key . '_hi']): ?>
                                            <span data-lang="hi"><?= e($question['option_' . $key . '_hi']) ?></span>
                                        <?php endif; ?>
                                        <?php if ($languageRule !== 'hindi' && $question['option_' . $key . '_en']): ?>
                                            <span data-lang="en"><?= e($question['option_' . $key . '_en']) ?></span>
                                        <?php endif; ?>
                                        <?php if (!empty($question['option_' . $key . '_image_path'])): ?>
                                            <img src="<?= e($question['option_' . $key . '_image_path']) ?>" alt="Option <?= e($label) ?> image">
                                        <?php endif; ?>
                                    </span>
                                </button>
                            <?php endforeach; ?>
                        </div>
                    </article>
                <?php endforeach; ?>
                <div class="exam-actions attempt-actions">
                    <button class="btn btn-light is-hidden" id="prevBtn" type="button" hidden disabled aria-hidden="true">Previous</button>
                    <button class="btn btn-light" id="clearBtn" type="button">Clear Response</button>
                    <button class="btn btn-light" id="reviewBtn" type="button">Mark for Review</button>
                    <button class="btn btn-primary" id="nextBtn" type="button">Save & Next</button>
                    <button class="btn btn-danger" id="submitBtn" type="button">Submit Test</button>
                </div>
            </section>

            <aside class="palette-panel attempt-palette" id="attemptPalette">
                <div class="attempt-palette-links">
                    <span>Symbols</span>
                    <span>Instructions</span>
                </div>
                <div class="palette-header attempt-palette-header">
                    <div>
                        <h2>Question Palette</h2>
                        <span class="attempt-palette-section-mobile"><?= e($activeSection['section_name']) ?></span>
                        <span class="palette-progress" id="sectionProgress"><?= (int) $completedInSection ?>/<?= count($questions) ?> answered</span>
                    </div>
                    <span id="saveStatus">Ready</span>
                    <button class="attempt-palette-close" id="paletteCloseBtn" type="button" aria-label="Close question palette">&times;</button>
                </div>
                <div class="attempt-palette-mobile-counts">
                    <div><span>Section Answered</span><strong><b id="mobileSectionAnsweredSummary"><?= (int) $completedInSection ?></b>/<b><?= count($questions) ?></b></strong></div>
                    <div><span>Overall Answered</span><strong><b id="mobileOverallAnsweredSummary"><?= (int) $overallAnsweredCount ?></b>/<b><?= (int) $overallTotalQuestions ?></b></strong></div>
                </div>
                <div class="attempt-palette-summary">
                    <div><span class="summary-dot answered"></span><strong>Answered Qs</strong><b id="paletteAnsweredCount"><?= (int) $completedInSection ?></b></div>
                    <div><span class="summary-dot not-answered"></span><strong>Unanswered Qs</strong><b id="paletteUnansweredCount"><?= (int) $notAnsweredInSection ?></b></div>
                    <div><span class="summary-dot marked"></span><strong>Marked</strong><b id="paletteMarkedCount"><?= (int) $markedInSection ?></b></div>
                    <div><span class="summary-dot answered-marked"></span><strong>Answered + marked</strong><b id="paletteAnsweredMarkedCount"><?= (int) $answeredMarkedInSection ?></b></div>
                </div>
                <div class="palette-grid">
                    <?php foreach ($questions as $index => $question): ?>
                        <?php
                        $answer = $answers[(int) $question['id']] ?? null;
                        $status = $answer['answer_status'] ?? 'not_visited';
                        ?>
                        <button type="button" class="palette-btn status-<?= e($status) ?> <?= $index === 0 ? 'is-current' : '' ?>" data-palette-index="<?= (int) $index ?>" data-question-id="<?= (int) $question['id'] ?>">
                            <?= (int) $question['question_number'] ?>
                        </button>
                    <?php endforeach; ?>
                </div>
                <div class="palette-legend">
                    <span><i class="legend not-visited"></i> Not visited</span>
                    <span><i class="legend not-answered"></i> Not answered</span>
                    <span><i class="legend answered"></i> Answered</span>
                    <span><i class="legend marked-review"></i> Marked</span>
                    <span><i class="legend answered-marked-review"></i> Answered + marked</span>
                </div>
                <button class="btn btn-danger attempt-palette-submit" id="paletteSubmitBtn" type="button">Submit Test</button>
            </aside>
        </main>

        <div class="anti-cheat-warning" id="antiCheatWarning" hidden>
            <strong id="antiCheatWarningText">Warning: Switching tabs/apps during the live test can remove your leaderboard eligibility.</strong>
            <span id="antiCheatWarningCount">Warning count: 0</span>
        </div>
        <div class="modal" id="submitModal" hidden>
            <div class="modal-card">
                <h2>Submit test?</h2>
                <p class="muted">You cannot attempt this test again after submission.</p>
                <div class="form-actions">
                    <button class="btn btn-danger" id="confirmSubmitBtn" type="button">Submit</button>
                    <button class="btn btn-light" id="cancelSubmitBtn" type="button">Cancel</button>
                </div>
            </div>
        </div>
        <div class="modal" id="imageModal" hidden>
            <div class="modal-card image-modal-card">
                <button class="modal-close" type="button" id="closeImageModal">Close</button>
                <img id="zoomImage" src="" alt="">
            </div>
        </div>
    </div>
    <script src="assets/js/section-timer.js"></script>
    <script src="assets/js/attempt.js"></script>
    <script src="assets/js/anti-cheat.js"></script>
</body>
</html>
