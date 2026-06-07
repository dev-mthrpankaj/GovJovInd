<?php
declare(strict_types=1);

require_once __DIR__ . '/db.php';
require_once __DIR__ . '/functions.php';

function violation_threshold(array $test): int
{
    return 5;
}

function tab_switch_violation_types(): array
{
    return ['tab_switch', 'app_switch', 'fullscreen_exit', 'browser_back'];
}

function countable_violation_types(): array
{
    return ['tab_switch', 'app_switch', 'fullscreen_exit', 'browser_back', 'copy_attempt', 'right_click'];
}

function fast_answer_counts(int $attemptId): array
{
    $stmt = db()->prepare(
        'SELECT s.section_slug, COUNT(*) AS total
         FROM user_answers ua
         INNER JOIN questions q ON q.id = ua.question_id
         INNER JOIN test_sections s ON s.id = q.section_id
         WHERE ua.attempt_id = ?
           AND ua.selected_option IS NOT NULL
           AND ua.time_spent_seconds > 0
           AND ua.time_spent_seconds < 10
           AND s.section_slug IN ("maths", "reasoning")
         GROUP BY s.section_slug'
    );
    $stmt->execute([$attemptId]);
    $counts = ['maths' => 0, 'reasoning' => 0];
    foreach ($stmt->fetchAll() as $row) {
        $counts[(string) $row['section_slug']] = (int) $row['total'];
    }

    return $counts;
}

function has_switch_violation(int $attemptId): bool
{
    $types = tab_switch_violation_types();
    $placeholders = implode(',', array_fill(0, count($types), '?'));
    $stmt = db()->prepare('SELECT COUNT(*) FROM violation_logs WHERE attempt_id = ? AND violation_type IN (' . $placeholders . ')');
    $stmt->execute(array_merge([$attemptId], $types));
    return (int) $stmt->fetchColumn() > 0;
}

function violation_count_for_attempt(int $attemptId): int
{
    $types = countable_violation_types();
    $placeholders = implode(',', array_fill(0, count($types), '?'));
    $stmt = db()->prepare('SELECT COUNT(*) FROM violation_logs WHERE attempt_id = ? AND violation_type IN (' . $placeholders . ')');
    $stmt->execute(array_merge([$attemptId], $types));
    return (int) $stmt->fetchColumn();
}

function recompute_attempt_eligibility(int $attemptId): array
{
    $stmt = db()->prepare(
        'SELECT a.*, t.is_free
         FROM test_attempts a
         INNER JOIN tests t ON t.id = a.test_id
         WHERE a.id = ?
         LIMIT 1'
    );
    $stmt->execute([$attemptId]);
    $attempt = $stmt->fetch();

    if (!$attempt) {
        return ['status' => 'clean', 'reason' => 'Attempt not found.'];
    }

    $violationCount = violation_count_for_attempt($attemptId);
    $threshold = violation_threshold($attempt);
    $fastCounts = fast_answer_counts($attemptId);
    $hasSuspiciousSpeed = $fastCounts['maths'] > 10 || $fastCounts['reasoning'] > 10;
    $hasSwitchViolation = has_switch_violation($attemptId);

    $status = 'clean';
    $leaderboardEligible = 1;
    $prizeEligible = 1;
    $reason = '';

    if ($violationCount > 0) {
        $status = 'warning';
        $reason = 'Violation warning count: ' . $violationCount . '/' . $threshold . '.';
    }

    if ($violationCount >= 3 && $violationCount < $threshold) {
        $status = 'suspicious';
        $reason = 'Multiple violation warnings: ' . $violationCount . '/' . $threshold . '.';
    }

    if ($hasSuspiciousSpeed) {
        $status = 'suspicious';
        $reason = 'Suspicious fast answering: Maths ' . $fastCounts['maths'] . ', Reasoning ' . $fastCounts['reasoning'] . '.';
    }

    if ($violationCount >= $threshold) {
        $status = 'disqualified';
        $leaderboardEligible = 0;
        $prizeEligible = 0;
        $reason = 'Violation threshold reached: ' . $violationCount . '/' . $threshold . '.';
    }

    if ($hasSuspiciousSpeed && $hasSwitchViolation && $violationCount >= 3) {
        $status = 'disqualified';
        $leaderboardEligible = 0;
        $prizeEligible = 0;
        $reason = 'Suspicious fast answering combined with tab/app switch violation.';
    }

    $update = db()->prepare(
        'UPDATE test_attempts
         SET violation_count = ?, eligibility_status = ?, leaderboard_eligible = ?, prize_eligible = ?, disqualification_reason = ?
         WHERE id = ?'
    );
    $update->execute([$violationCount, $status, $leaderboardEligible, $prizeEligible, $reason ?: null, $attemptId]);

    return [
        'status' => $status,
        'violation_count' => $violationCount,
        'leaderboard_eligible' => (bool) $leaderboardEligible,
        'prize_eligible' => (bool) $prizeEligible,
        'reason' => $reason,
        'fast_maths_count' => $fastCounts['maths'],
        'fast_reasoning_count' => $fastCounts['reasoning'],
    ];
}

function log_violation_event(array $attempt, string $type, string $source, ?string $clientTimestamp, array $metadata = []): array
{
    $allowedTypes = ['tab_switch', 'app_switch', 'reload', 'copy_attempt', 'right_click', 'fast_answer', 'fullscreen_exit', 'browser_back'];
    if (!in_array($type, $allowedTypes, true)) {
        return recompute_attempt_eligibility((int) $attempt['id']);
    }

    $cooldownTypes = ['tab_switch', 'app_switch', 'fullscreen_exit', 'browser_back', 'copy_attempt', 'right_click'];
    if (in_array($type, $cooldownTypes, true)) {
        $recent = db()->prepare(
            'SELECT id FROM violation_logs
             WHERE attempt_id = ? AND violation_type = ? AND event_time >= DATE_SUB(NOW(), INTERVAL 5 SECOND)
             LIMIT 1'
        );
        $recent->execute([(int) $attempt['id'], $type]);
        if ($recent->fetchColumn()) {
            return recompute_attempt_eligibility((int) $attempt['id']);
        }
    }

    $metadataJson = json_encode($metadata, JSON_UNESCAPED_UNICODE | JSON_INVALID_UTF8_SUBSTITUTE);
    if ($metadataJson === false) {
        $metadataJson = '{}';
    }

    $insert = db()->prepare(
        'INSERT INTO violation_logs
            (attempt_id, user_id, test_id, registration_id, violation_type, event_source, event_label, client_timestamp, metadata, event_time)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())'
    );
    $insert->execute([
        (int) $attempt['id'],
        (int) $attempt['user_id'],
        (int) $attempt['test_id'],
        (int) $attempt['registration_id'],
        $type,
        substr($source, 0, 80),
        substr(str_replace('_', ' ', $type), 0, 160),
        $clientTimestamp ? substr($clientTimestamp, 0, 80) : null,
        $metadataJson,
    ]);

    return recompute_attempt_eligibility((int) $attempt['id']);
}
