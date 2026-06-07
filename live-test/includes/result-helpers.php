<?php
declare(strict_types=1);

require_once __DIR__ . '/db.php';
require_once __DIR__ . '/functions.php';
require_once __DIR__ . '/anti-cheat.php';

function result_attempts_for_test(int $testId): array
{
    $stmt = db()->prepare(
        'SELECT a.*, u.name, u.mobile, r.registration_id AS public_registration_id
         FROM test_attempts a
         INNER JOIN users u ON u.id = a.user_id
         INNER JOIN test_registrations r ON r.id = a.registration_id
         WHERE a.test_id = ? AND a.status IN ("submitted", "auto_submitted")
         ORDER BY a.submitted_at ASC'
    );
    $stmt->execute([$testId]);
    return $stmt->fetchAll();
}

function calculate_attempt_result(int $attemptId): ?array
{
    $attemptStmt = db()->prepare('SELECT * FROM test_attempts WHERE id = ? LIMIT 1');
    $attemptStmt->execute([$attemptId]);
    $attempt = $attemptStmt->fetch();
    if (!$attempt) {
        return null;
    }

    recompute_attempt_eligibility($attemptId);
    $attemptStmt->execute([$attemptId]);
    $attempt = $attemptStmt->fetch();

    $questionStmt = db()->prepare(
        'SELECT q.id, q.correct_option, s.id AS section_id, s.section_name, s.section_slug, s.section_order
         FROM questions q
         INNER JOIN test_sections s ON s.id = q.section_id
         WHERE q.test_id = ? AND q.is_active = 1
         ORDER BY s.section_order ASC, q.question_number ASC'
    );
    $questionStmt->execute([(int) $attempt['test_id']]);
    $questions = $questionStmt->fetchAll();

    $answerStmt = db()->prepare('SELECT question_id, selected_option FROM user_answers WHERE attempt_id = ?');
    $answerStmt->execute([$attemptId]);
    $answers = [];
    foreach ($answerStmt->fetchAll() as $answer) {
        $answers[(int) $answer['question_id']] = $answer['selected_option'];
    }

    $summary = [];
    $total = [
        'total_questions' => 0,
        'attempted' => 0,
        'correct' => 0,
        'wrong' => 0,
        'not_attempted' => 0,
        'marks' => 0.0,
    ];

    foreach ($questions as $question) {
        $sectionId = (int) $question['section_id'];
        if (!isset($summary[$sectionId])) {
            $summary[$sectionId] = [
                'section_id' => $sectionId,
                'section_name' => $question['section_name'],
                'section_slug' => $question['section_slug'],
                'total_questions' => 0,
                'attempted' => 0,
                'correct' => 0,
                'wrong' => 0,
                'not_attempted' => 0,
                'marks' => 0.0,
                'accuracy' => 0.0,
            ];
        }

        $selected = $answers[(int) $question['id']] ?? null;
        $summary[$sectionId]['total_questions']++;
        $total['total_questions']++;

        if (!$selected) {
            $summary[$sectionId]['not_attempted']++;
            $total['not_attempted']++;
            continue;
        }

        $summary[$sectionId]['attempted']++;
        $total['attempted']++;
        if ($selected === $question['correct_option']) {
            $summary[$sectionId]['correct']++;
            $summary[$sectionId]['marks'] += 1;
            $total['correct']++;
            $total['marks'] += 1;
        } else {
            $summary[$sectionId]['wrong']++;
            $summary[$sectionId]['marks'] -= 0.25;
            $total['wrong']++;
            $total['marks'] -= 0.25;
        }
    }

    foreach ($summary as &$section) {
        $section['accuracy'] = $section['attempted'] > 0 ? round(($section['correct'] / $section['attempted']) * 100, 2) : 0.0;
        $section['marks'] = round($section['marks'], 2);
    }
    unset($section);

    $accuracy = $total['attempted'] > 0 ? round(($total['correct'] / $total['attempted']) * 100, 2) : 0.0;
    $marks = round($total['marks'], 2);

    return [
        'attempt' => $attempt,
        'total' => $total,
        'marks' => $marks,
        'accuracy' => $accuracy,
        'section_summary' => array_values($summary),
        'leaderboard_eligible' => (int) $attempt['leaderboard_eligible'],
    ];
}

function upsert_attempt_result(int $attemptId): ?array
{
    $result = calculate_attempt_result($attemptId);
    if (!$result) {
        return null;
    }

    $attempt = $result['attempt'];
    $total = $result['total'];
    $json = json_encode($result['section_summary'], JSON_UNESCAPED_UNICODE | JSON_INVALID_UTF8_SUBSTITUTE);

    $stmt = db()->prepare(
        'INSERT INTO test_results
            (test_id, attempt_id, user_id, marks, correct_count, wrong_count, attempted_count, not_attempted_count, accuracy, section_summary, leaderboard_eligible)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE
            marks = VALUES(marks),
            correct_count = VALUES(correct_count),
            wrong_count = VALUES(wrong_count),
            attempted_count = VALUES(attempted_count),
            not_attempted_count = VALUES(not_attempted_count),
            accuracy = VALUES(accuracy),
            section_summary = VALUES(section_summary),
            leaderboard_eligible = VALUES(leaderboard_eligible),
            updated_at = CURRENT_TIMESTAMP'
    );
    $stmt->execute([
        (int) $attempt['test_id'],
        (int) $attempt['id'],
        (int) $attempt['user_id'],
        $result['marks'],
        (int) $total['correct'],
        (int) $total['wrong'],
        (int) $total['attempted'],
        (int) $total['not_attempted'],
        $result['accuracy'],
        $json,
        (int) $result['leaderboard_eligible'],
    ]);

    return $result;
}

function generate_results_for_test(int $testId): array
{
    $attempts = result_attempts_for_test($testId);
    $generated = 0;

    foreach ($attempts as $attempt) {
        if (upsert_attempt_result((int) $attempt['id'])) {
            $generated++;
        }
    }

    assign_ranks_for_test($testId);

    return ['attempts' => count($attempts), 'generated' => $generated];
}

function assign_ranks_for_test(int $testId): void
{
    $stmt = db()->prepare(
        'SELECT tr.id
         FROM test_results tr
         INNER JOIN test_attempts a ON a.id = tr.attempt_id
         WHERE tr.test_id = ? AND tr.leaderboard_eligible = 1 AND a.leaderboard_eligible = 1
         ORDER BY tr.marks DESC, tr.correct_count DESC, tr.accuracy DESC, a.submitted_at ASC'
    );
    $stmt->execute([$testId]);
    $rank = 1;
    $update = db()->prepare('UPDATE test_results SET overall_rank = ? WHERE id = ?');
    foreach ($stmt->fetchAll() as $row) {
        $update->execute([$rank, (int) $row['id']]);
        $rank++;
    }

    $clear = db()->prepare(
        'UPDATE test_results tr
         INNER JOIN test_attempts a ON a.id = tr.attempt_id
         SET tr.overall_rank = NULL
         WHERE tr.test_id = ? AND (tr.leaderboard_eligible = 0 OR a.leaderboard_eligible = 0)'
    );
    $clear->execute([$testId]);
}

function result_by_registration(string $registrationId, ?string $mobile = null): ?array
{
    $sql =
        'SELECT tr.*, a.status AS attempt_status, a.submitted_at, a.eligibility_status, a.disqualification_reason,
                a.leaderboard_eligible AS attempt_leaderboard_eligible,
                u.name, u.mobile, u.email,
                r.registration_id AS public_registration_id,
                t.title, t.test_date, t.start_time, t.result_visible, t.status AS test_status
         FROM test_results tr
         INNER JOIN test_attempts a ON a.id = tr.attempt_id
         INNER JOIN users u ON u.id = tr.user_id
         INNER JOIN test_registrations r ON r.id = a.registration_id
         INNER JOIN tests t ON t.id = tr.test_id
         WHERE r.registration_id = ?';
    $params = [$registrationId];
    if ($mobile !== null && $mobile !== '') {
        $sql .= ' AND u.mobile = ?';
        $params[] = $mobile;
    }
    $sql .= ' LIMIT 1';

    $stmt = db()->prepare($sql);
    $stmt->execute($params);
    $row = $stmt->fetch();
    return $row ?: null;
}

function leaderboard_for_test(int $testId, int $limit = 100): array
{
    $stmt = db()->prepare(
        'SELECT tr.*, a.submitted_at, u.name
         FROM test_results tr
         INNER JOIN test_attempts a ON a.id = tr.attempt_id
         INNER JOIN users u ON u.id = tr.user_id
         WHERE tr.test_id = ? AND tr.leaderboard_eligible = 1 AND a.leaderboard_eligible = 1
         ORDER BY tr.overall_rank ASC
         LIMIT ' . (int) $limit
    );
    $stmt->execute([$testId]);
    return $stmt->fetchAll();
}
