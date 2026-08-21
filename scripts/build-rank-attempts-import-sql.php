<?php
declare(strict_types=1);

if ($argc < 3) {
    fwrite(STDERR, "Usage: php scripts/build-rank-attempts-import-sql.php output.sql input1.csv [input2.csv ...]\n");
    exit(1);
}

$outputPath = $argv[1];
$inputPaths = array_slice($argv, 2);

function csv_value(array $row, string $key): string
{
    return trim((string)($row[$key] ?? ''));
}

function sql_string(?string $value): string
{
    if ($value === null || $value === '') {
        return 'NULL';
    }
    return "'" . str_replace(["\\", "'"], ["\\\\", "''"], $value) . "'";
}

function sql_number($value, string $fallback = '0', int $scale = 3): string
{
    $text = trim((string)$value);
    if ($text === '') {
        return $fallback;
    }
    $number = (float)$text;
    return is_finite($number) ? rtrim(rtrim(sprintf('%.' . $scale . 'F', $number), '0'), '.') : $fallback;
}

function sql_int($value, string $fallback = '0'): string
{
    $text = trim((string)$value);
    if ($text === '') {
        return $fallback;
    }
    return (string)max(0, (int)round((float)$text));
}

function sql_optional_int($value): string
{
    $text = trim((string)$value);
    if ($text === '') {
        return 'NULL';
    }
    return (string)max(0, (int)round((float)$text));
}

function parse_date_value(string $value): ?string
{
    $value = trim($value);
    if ($value === '') {
        return null;
    }
    if (preg_match('/^\d{4}-\d{2}-\d{2}$/', $value)) {
        return $value;
    }
    $formats = ['n/j/Y', 'm/d/Y', 'j/n/Y', 'd/m/Y'];
    foreach ($formats as $format) {
        $date = DateTime::createFromFormat('!' . $format, $value);
        if ($date instanceof DateTime) {
            return $date->format('Y-m-d');
        }
    }
    $timestamp = strtotime($value);
    return $timestamp ? date('Y-m-d', $timestamp) : null;
}

function parse_datetime_value(string $value): ?string
{
    $date = parse_date_value($value);
    return $date ? $date . ' 00:00:00' : null;
}

function normalize_mobile(string $value): string
{
    $digits = preg_replace('/\D+/', '', $value) ?? '';
    if (strlen($digits) === 12 && str_starts_with($digits, '91')) {
        return substr($digits, 2);
    }
    return substr($digits, 0, 10);
}

function normalize_subject_json(string $value): string
{
    if ($value === '') {
        return '[]';
    }
    $decoded = json_decode($value, true);
    if (!is_array($decoded)) {
        return '[]';
    }
    return json_encode($decoded, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
}

$columns = [
    'rank_exam_id', 'firebase_uid', 'exam_id', 'exam_name', 'mode', 'roll_number', 'mobile_number', 'dob',
    'candidate_name', 'gender', 'category', 'horizontal_category', 'state_name', 'exam_date', 'shift',
    'total_questions', 'total_attempted', 'right_answers', 'wrong_answers', 'unattempted',
    'marks_per_correct', 'negative_marking', 'raw_marks', 'normalized_marks', 'percentile',
    'subject_data_json', 'gender_rank', 'gender_category_rank', 'gender_state_rank', 'gender_shift_rank',
    'average_marks', 'average_shift_marks', 'category_average_marks', 'answer_key_link', 'user_agent',
    'created_at'
];

$rows = [];
$sourceCounts = [];

foreach ($inputPaths as $path) {
    $handle = fopen($path, 'rb');
    if (!$handle) {
        fwrite(STDERR, "Cannot open CSV: {$path}\n");
        exit(1);
    }

    $headers = fgetcsv($handle);
    if (!$headers) {
        fclose($handle);
        continue;
    }
    $headers = array_map(static fn($header) => trim((string)$header), $headers);
    $count = 0;

    while (($values = fgetcsv($handle)) !== false) {
        if (count(array_filter($values, static fn($value) => trim((string)$value) !== '')) === 0) {
            continue;
        }
        $row = array_combine($headers, array_pad($values, count($headers), ''));
        if (!is_array($row)) {
            continue;
        }

        $examId = csv_value($row, 'Exam ID');
        $dob = parse_date_value(csv_value($row, 'DOB'));
        if ($examId === '' || !$dob || csv_value($row, 'Roll Number') === '') {
            continue;
        }

        $subjectJson = normalize_subject_json(csv_value($row, 'Subject Data (JSON)'));
        $timestamp = parse_datetime_value(csv_value($row, 'Timestamp'));
        $examDate = parse_date_value(csv_value($row, 'Exam Date'));

        $rows[] = [
            "(SELECT id FROM rank_exams WHERE exam_id = " . sql_string($examId) . " LIMIT 1)",
            sql_string(csv_value($row, 'User ID')),
            sql_string($examId),
            sql_string(csv_value($row, 'Exam Name')),
            sql_string(strtolower(csv_value($row, 'Mode')) ?: 'offline'),
            sql_string(csv_value($row, 'Roll Number')),
            sql_string(normalize_mobile(csv_value($row, 'Mobile Number'))),
            sql_string($dob),
            sql_string(csv_value($row, 'Candidate Name') ?: 'Private'),
            sql_string(csv_value($row, 'Gender')),
            sql_string(csv_value($row, 'Category')),
            sql_string(csv_value($row, 'Horizontal Category')),
            sql_string(csv_value($row, 'State')),
            sql_string($examDate),
            sql_string(csv_value($row, 'Shift')),
            sql_int(csv_value($row, 'Total Questions')),
            sql_int(csv_value($row, 'Total Attempted')),
            sql_int(csv_value($row, 'Right Answers')),
            sql_int(csv_value($row, 'Wrong Answers')),
            sql_int(csv_value($row, 'Unattempted')),
            sql_number(csv_value($row, 'Marks Per Correct'), '0'),
            sql_number(csv_value($row, 'Negative Marking'), '0'),
            sql_number(csv_value($row, 'Raw Marks'), '0'),
            sql_string(csv_value($row, 'Normalized Marks') === '' ? null : sql_number(csv_value($row, 'Normalized Marks'))),
            sql_string(csv_value($row, 'Percentile') === '' ? null : sql_number(csv_value($row, 'Percentile'))),
            sql_string($subjectJson),
            sql_optional_int(csv_value($row, 'Gender Rank')),
            sql_optional_int(csv_value($row, 'Gender Category Rank')),
            sql_optional_int(csv_value($row, 'Gender State Rank')),
            sql_optional_int(csv_value($row, 'Gender Shift Rank')),
            sql_string(csv_value($row, 'Average Marks') === '' ? null : sql_number(csv_value($row, 'Average Marks'))),
            sql_string(csv_value($row, 'Average Shift Marks') === '' ? null : sql_number(csv_value($row, 'Average Shift Marks'))),
            sql_string(csv_value($row, 'Category Average Marks') === '' ? null : sql_number(csv_value($row, 'Category Average Marks'))),
            sql_string(csv_value($row, 'Answer Key Link')),
            sql_string(substr(csv_value($row, 'User Agent'), 0, 500)),
            sql_string($timestamp),
        ];
        $count++;
    }
    fclose($handle);
    $sourceCounts[basename($path)] = $count;
}

$sql = "-- Generated from selected Google Sheet rank predictor attempt CSV files.\n";
$sql .= "-- Safe import: existing attempts with the same exam, roll, mobile and DOB are left unchanged.\n";
$sql .= "-- Import rank-predictor-schema.sql and exam configs before running this file.\n\n";
$sql .= "INSERT INTO rank_attempts (`" . implode('`, `', $columns) . "`) VALUES\n";
$sql .= implode(",\n", array_map(static fn($row) => '  (' . implode(', ', $row) . ')', $rows));
$sql .= "\nON DUPLICATE KEY UPDATE updated_at = updated_at;\n";

file_put_contents($outputPath, $sql);

echo "Wrote {$outputPath}\n";
echo "Rows: " . count($rows) . "\n";
foreach ($sourceCounts as $name => $count) {
    echo "{$name}: {$count}\n";
}
