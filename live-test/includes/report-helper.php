<?php
declare(strict_types=1);

require_once __DIR__ . '/result-helpers.php';

function report_questions_for_attempt(int $attemptId, int $testId): array
{
    $stmt = db()->prepare(
        'SELECT q.*, s.section_name, s.section_slug, ua.selected_option, ua.time_spent_seconds
         FROM questions q
         INNER JOIN test_sections s ON s.id = q.section_id
         LEFT JOIN user_answers ua ON ua.question_id = q.id AND ua.attempt_id = ?
         WHERE q.test_id = ? AND q.is_active = 1
         ORDER BY s.section_order ASC, q.question_number ASC'
    );
    $stmt->execute([$attemptId, $testId]);
    return $stmt->fetchAll();
}

function option_text(array $question, string $option): string
{
    $key = strtolower($option);
    $parts = [];
    if (!empty($question['option_' . $key . '_hi'])) {
        $parts[] = $question['option_' . $key . '_hi'];
    }
    if (!empty($question['option_' . $key . '_en'])) {
        $parts[] = $question['option_' . $key . '_en'];
    }
    return implode(' / ', $parts);
}
