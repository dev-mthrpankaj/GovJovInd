<?php
declare(strict_types=1);

require_once __DIR__ . '/includes/db.php';
require_once __DIR__ . '/includes/functions.php';
require_once __DIR__ . '/includes/anti-cheat.php';

if (!is_post()) {
    json_response(['ok' => false, 'message' => 'Invalid request.'], 405);
}

$registration = current_registration_from_request();
if (!$registration || $registration['status'] !== 'live') {
    json_response(['ok' => false, 'message' => 'Invalid registration.'], 403);
}

$attemptId = input_int('attempt_id', 0);
$questionId = input_int('question_id', 0);
$token = input_string('attempt_token', 80);
$selectedOption = input_string('selected_option', 1);
$action = input_string('answer_action', 40);
$timeSpent = max(0, min(600, input_int('time_spent_seconds', 0)));

if (!$attemptId || !verify_attempt_token($attemptId, $token)) {
    json_response(['ok' => false, 'message' => 'Invalid attempt token.'], 403);
}

$attemptStmt = db()->prepare('SELECT * FROM test_attempts WHERE id = ? AND registration_id = ? LIMIT 1');
$attemptStmt->execute([$attemptId, (int) $registration['id']]);
$attempt = $attemptStmt->fetch();

if (!$attempt || in_array($attempt['status'], ['submitted', 'auto_submitted'], true)) {
    json_response(['ok' => false, 'message' => 'Attempt is not active.'], 403);
}

$sections = test_sections_with_offsets((int) $registration['test_id']);
$timing = timing_context($registration, $sections);
if ($timing['has_ended'] || !$timing['active_section']) {
    json_response(['ok' => false, 'message' => 'Section time is over.', 'ended' => true], 403);
}

$questionStmt = db()->prepare('SELECT id, section_id FROM questions WHERE id = ? AND test_id = ? AND is_active = 1 LIMIT 1');
$questionStmt->execute([$questionId, (int) $registration['test_id']]);
$question = $questionStmt->fetch();

if (!$question || (int) $question['section_id'] !== (int) $timing['active_section']['id']) {
    json_response(['ok' => false, 'message' => 'This section is locked.'], 403);
}

if ($selectedOption !== '' && !in_array($selectedOption, correct_options(), true)) {
    json_response(['ok' => false, 'message' => 'Invalid option.'], 422);
}

$existingStmt = db()->prepare('SELECT * FROM user_answers WHERE attempt_id = ? AND question_id = ? LIMIT 1');
$existingStmt->execute([$attemptId, $questionId]);
$existing = $existingStmt->fetch();

$finalOption = $existing['selected_option'] ?? null;
$status = 'not_answered';

if ($action === 'clear') {
    $finalOption = null;
    $status = 'not_answered';
} elseif ($action === 'mark_review') {
    $finalOption = $selectedOption !== '' ? $selectedOption : $finalOption;
    $status = $finalOption ? 'answered_marked_review' : 'marked_review';
} elseif ($action === 'visit') {
    $finalOption = $existing['selected_option'] ?? null;
    $status = $existing['answer_status'] ?? 'not_answered';
    if ($status === 'not_visited') {
        $status = 'not_answered';
    }
} else {
    $finalOption = $selectedOption !== '' ? $selectedOption : $finalOption;
    $status = $finalOption ? 'answered' : 'not_answered';
}

$changed = $existing && $selectedOption !== '' && $existing['selected_option'] !== $selectedOption ? 1 : 0;

if ($existing) {
    $update = db()->prepare('UPDATE user_answers SET selected_option = ?, answer_status = ?, time_spent_seconds = time_spent_seconds + ?, change_count = change_count + ? WHERE id = ?');
    $update->execute([$finalOption, $status, $timeSpent, $changed, (int) $existing['id']]);
} else {
    $insert = db()->prepare('INSERT INTO user_answers (attempt_id, question_id, selected_option, answer_status, time_spent_seconds, change_count) VALUES (?, ?, ?, ?, ?, ?)');
    $insert->execute([$attemptId, $questionId, $finalOption, $status, $timeSpent, 0]);
}

$eligibility = recompute_attempt_eligibility($attemptId);

json_response([
    'ok' => true,
    'question_id' => $questionId,
    'selected_option' => $finalOption,
    'answer_status' => $status,
    'eligibility_status' => $eligibility['status'],
    'section_remaining_seconds' => $timing['section_remaining_seconds'],
    'total_remaining_seconds' => $timing['total_remaining_seconds'],
]);
