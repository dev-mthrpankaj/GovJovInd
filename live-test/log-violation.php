<?php
declare(strict_types=1);

require_once __DIR__ . '/includes/anti-cheat.php';

if (!is_post()) {
    json_response(['ok' => false, 'message' => 'Invalid request.'], 405);
}

$registration = current_registration_from_request();
if (!$registration || $registration['status'] !== 'live') {
    json_response(['ok' => false, 'message' => 'Invalid registration.'], 403);
}

$attemptId = input_int('attempt_id', 0);
$token = input_string('attempt_token', 80);
$type = input_string('violation_type', 80);
$source = input_string('event_source', 80);
$clientTimestamp = input_string('client_timestamp', 80);
$metadataRaw = (string) ($_POST['metadata'] ?? '{}');
$metadata = json_decode($metadataRaw, true);
if (!is_array($metadata)) {
    $metadata = [];
}

if (!$attemptId || !verify_attempt_token($attemptId, $token)) {
    json_response(['ok' => false, 'message' => 'Invalid attempt token.'], 403);
}

$attemptStmt = db()->prepare('SELECT * FROM test_attempts WHERE id = ? AND registration_id = ? LIMIT 1');
$attemptStmt->execute([$attemptId, (int) $registration['id']]);
$attempt = $attemptStmt->fetch();

if (!$attempt || in_array($attempt['status'], ['submitted', 'auto_submitted'], true)) {
    json_response(['ok' => false, 'message' => 'Attempt is not active.'], 403);
}

$eligibility = log_violation_event($attempt, $type, $source, $clientTimestamp ?: null, $metadata);

json_response([
    'ok' => true,
    'warning_count' => $eligibility['violation_count'],
    'eligibility_status' => $eligibility['status'],
    'leaderboard_eligible' => $eligibility['leaderboard_eligible'],
    'message' => $eligibility['status'] === 'disqualified'
        ? 'You are disqualified from leaderboard eligibility because the violation limit was reached.'
        : 'Warning: Repeated tab/app switching or restricted actions can remove leaderboard eligibility.',
]);
