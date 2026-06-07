<?php
declare(strict_types=1);

require_once __DIR__ . '/includes/public-layout.php';
require_once __DIR__ . '/includes/report-helper.php';

$registrationId = trim((string) ($_GET['registration_id'] ?? ''));
$mobile = preg_replace('/\D+/', '', (string) ($_GET['mobile'] ?? ''));
$result = $registrationId ? result_by_registration($registrationId, $mobile ?: null) : null;

if (!$result || empty($result['result_visible'])) {
    public_header('Report Unavailable');
    echo '<section class="panel"><h1>Report unavailable</h1><p class="muted">Result is not published or registration ID is invalid.</p><a class="btn btn-primary" href="result.php">Check Result</a></section>';
    public_footer();
    exit;
}

$sections = json_decode($result['section_summary'] ?: '[]', true) ?: [];
$questions = report_questions_for_attempt((int) $result['attempt_id'], (int) $result['test_id']);

public_header('Download Report');
?>
<section class="panel report-hero">
    <p class="eyebrow">Printable Report</p>
    <div class="report-brand">
        <span class="report-brand-main">
            <img src="/Assets/Home%20Page/favicon-96x96.png" alt="GovJobUpdates Logo">
            <strong>GovJob<span>Updates</span></strong>
        </span>
        <span>Sunday Live Test Performance Report</span>
    </div>
    <h1><?= e($result['title']) ?></h1>
    <div class="result-score">
        <div><span>Marks</span><strong><?= e((string) $result['marks']) ?>/100</strong></div>
        <div><span>Rank</span><strong><?= $result['overall_rank'] ? (int) $result['overall_rank'] : '-' ?></strong></div>
        <div><span>Eligibility</span><strong><?= e(format_status($result['eligibility_status'])) ?></strong></div>
    </div>
    <div class="detail-list">
        <div><strong>Candidate</strong><span><?= e($result['name']) ?></span></div>
        <div><strong>Registration ID</strong><span><?= e($result['public_registration_id']) ?></span></div>
        <div><strong>Test Date</strong><span><?= e($result['test_date']) ?></span></div>
        <div><strong>Start Time</strong><span><?= e(substr($result['start_time'], 0, 5)) ?></span></div>
        <div><strong>Submit Time</strong><span><?= e($result['submitted_at']) ?></span></div>
        <div><strong>Marks</strong><span><?= e((string) $result['marks']) ?>/100</span></div>
        <div><strong>Rank</strong><span><?= $result['overall_rank'] ? (int) $result['overall_rank'] : 'Not ranked' ?></span></div>
        <div><strong>Eligibility</strong><span><?= e(format_status($result['eligibility_status'])) ?></span></div>
    </div>
    <button class="btn btn-primary" type="button" onclick="window.print()">Print / Save PDF</button>
</section>

<section class="panel">
    <h2>Subject-wise Performance</h2>
    <div class="table-wrap public-table-wrap">
        <table class="public-table">
            <thead><tr><th>Subject</th><th>Total</th><th>Attempted</th><th>Correct</th><th>Wrong</th><th>Marks</th><th>Accuracy</th></tr></thead>
            <tbody>
                <?php foreach ($sections as $section): ?>
                    <tr>
                        <td data-label="Subject"><?= e($section['section_name']) ?></td>
                        <td data-label="Total"><?= (int) $section['total_questions'] ?></td>
                        <td data-label="Attempted"><?= (int) $section['attempted'] ?></td>
                        <td data-label="Correct"><?= (int) $section['correct'] ?></td>
                        <td data-label="Wrong"><?= (int) $section['wrong'] ?></td>
                        <td data-label="Marks"><?= e((string) $section['marks']) ?></td>
                        <td data-label="Accuracy"><?= e((string) $section['accuracy']) ?>%</td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>
</section>

<section class="panel">
    <h2>Question-wise Review</h2>
    <div class="report-question-list">
        <?php foreach ($questions as $question): ?>
            <?php
            $selected = $question['selected_option'] ?: 'Not attempted';
            $correct = $question['correct_option'];
            ?>
            <article class="report-question">
                <h3><?= e($question['section_name']) ?> - Question <?= (int) $question['question_number'] ?></h3>
                <?php if ($question['question_hi']): ?><p><?= e($question['question_hi']) ?></p><?php endif; ?>
                <?php if ($question['question_en']): ?><p><?= e($question['question_en']) ?></p><?php endif; ?>
                <?php if ($question['question_image_path']): ?><img src="<?= e($question['question_image_path']) ?>" alt="<?= e($question['question_image_alt'] ?: 'Question image') ?>"><?php endif; ?>
                <div class="report-options">
                    <?php foreach (correct_options() as $option): ?>
                        <?php $key = strtolower($option); ?>
                        <div>
                            <strong><?= e($option) ?>.</strong> <?= e(option_text($question, $option)) ?>
                            <?php if (!empty($question['option_' . $key . '_image_path'])): ?><img src="<?= e($question['option_' . $key . '_image_path']) ?>" alt="Option <?= e($option) ?> image"><?php endif; ?>
                        </div>
                    <?php endforeach; ?>
                </div>
                <p><strong>Selected:</strong> <?= e($selected) ?> | <strong>Correct:</strong> <?= e($correct) ?> | <strong>Time:</strong> <?= (int) $question['time_spent_seconds'] ?> sec</p>
                <?php if ($question['explanation_hi'] || $question['explanation_en'] || $question['explanation_image_path']): ?>
                    <div class="report-explanation">
                        <strong>Explanation</strong>
                        <?php if ($question['explanation_hi']): ?><p><?= e($question['explanation_hi']) ?></p><?php endif; ?>
                        <?php if ($question['explanation_en']): ?><p><?= e($question['explanation_en']) ?></p><?php endif; ?>
                        <?php if ($question['explanation_image_path']): ?><img src="<?= e($question['explanation_image_path']) ?>" alt="Explanation image"><?php endif; ?>
                    </div>
                <?php endif; ?>
            </article>
        <?php endforeach; ?>
    </div>
</section>
<script>
window.MathJax = { tex: { inlineMath: [['\\(', '\\)']], displayMath: [['\\[', '\\]']] }, svg: { fontCache: 'global' } };
</script>
<script defer src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js"></script>
<?php public_footer(); ?>
