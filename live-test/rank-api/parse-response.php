<?php
declare(strict_types=1);

require_once __DIR__ . '/../includes/rank-predictor.php';

rank_predictor_api_prepare();

if (strtoupper((string)($_SERVER['REQUEST_METHOD'] ?? 'GET')) !== 'POST') {
    rank_predictor_json(['success' => false, 'message' => 'Invalid request method.'], 405);
}

try {
    $data = rank_predictor_request_data();
    $url = trim((string)($data['answerSheetLink'] ?? $data['url'] ?? ''));
    if ($url === '') {
        rank_predictor_json(['success' => false, 'message' => 'Response sheet link is required.'], 400);
    }

    $html = rank_predictor_fetch_response_sheet_html($url);
    $parsed = rank_predictor_parse_response_sheet_html($html);

    if (($parsed['totals']['totalQuestions'] ?? 0) <= 0) {
        rank_predictor_json([
            'success' => false,
            'message' => 'No questions were found in this response sheet. Please enter marks manually.',
        ], 422);
    }

    $parsed['source'] = [
        'examId' => rank_predictor_text($data['examId'] ?? '', 100),
        'examName' => rank_predictor_text($data['examName'] ?? '', 160),
        'parser' => 'digialm-tcs-generic',
    ];

    rank_predictor_json([
        'success' => true,
        'message' => 'Response sheet parsed successfully.',
        'data' => $parsed,
    ]);
} catch (InvalidArgumentException $e) {
    rank_predictor_json(['success' => false, 'message' => $e->getMessage()], 400);
} catch (RuntimeException $e) {
    rank_predictor_json(['success' => false, 'message' => $e->getMessage()], 422);
} catch (Throwable $e) {
    rank_predictor_json([
        'success' => false,
        'message' => 'Response sheet parser is temporarily unavailable.',
    ], 500);
}

function rank_predictor_fetch_response_sheet_html(string $url): string
{
    $parts = parse_url($url);
    $scheme = strtolower((string)($parts['scheme'] ?? ''));
    $host = strtolower((string)($parts['host'] ?? ''));
    if (!in_array($scheme, ['http', 'https'], true) || $host === '') {
        throw new InvalidArgumentException('Please paste a valid response sheet URL.');
    }

    if (!rank_predictor_is_public_host($host)) {
        throw new InvalidArgumentException('This response sheet host is not allowed.');
    }

    if (function_exists('curl_init')) {
        return rank_predictor_fetch_with_curl($url);
    }

    $context = stream_context_create([
        'http' => [
            'method' => 'GET',
            'timeout' => 12,
            'follow_location' => 1,
            'max_redirects' => 3,
            'header' => "User-Agent: GovJobUpdatesRankPredictor/1.0\r\nAccept: text/html,*/*;q=0.8\r\n",
        ],
    ]);
    $html = @file_get_contents($url, false, $context);
    if (!is_string($html) || trim($html) === '') {
        throw new RuntimeException('Could not read this response sheet link. Please enter marks manually.');
    }
    if (strlen($html) > 3145728) {
        throw new RuntimeException('Response sheet is too large to parse automatically.');
    }
    return $html;
}

function rank_predictor_fetch_with_curl(string $url): string
{
    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_MAXREDIRS => 3,
        CURLOPT_CONNECTTIMEOUT => 6,
        CURLOPT_TIMEOUT => 14,
        CURLOPT_USERAGENT => 'GovJobUpdatesRankPredictor/1.0',
        CURLOPT_HTTPHEADER => ['Accept: text/html,*/*;q=0.8'],
        CURLOPT_PROTOCOLS => CURLPROTO_HTTP | CURLPROTO_HTTPS,
        CURLOPT_REDIR_PROTOCOLS => CURLPROTO_HTTP | CURLPROTO_HTTPS,
    ]);
    $html = curl_exec($ch);
    $status = (int)curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
    $error = curl_error($ch);
    curl_close($ch);

    if (!is_string($html) || trim($html) === '' || $status >= 400) {
        throw new RuntimeException($error ?: 'Could not read this response sheet link. Please enter marks manually.');
    }
    if (strlen($html) > 3145728) {
        throw new RuntimeException('Response sheet is too large to parse automatically.');
    }
    return $html;
}

function rank_predictor_is_public_host(string $host): bool
{
    if (in_array($host, ['localhost', '127.0.0.1', '0.0.0.0'], true)) {
        return false;
    }

    $ip = gethostbyname($host);
    if ($ip === $host || filter_var($ip, FILTER_VALIDATE_IP) === false) {
        return true;
    }

    return filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE) !== false;
}

function rank_predictor_parse_response_sheet_html(string $html): array
{
    if (!class_exists('DOMDocument')) {
        throw new RuntimeException('HTML parser is not available on this server.');
    }

    $dom = new DOMDocument();
    libxml_use_internal_errors(true);
    $dom->loadHTML($html, LIBXML_NOWARNING | LIBXML_NOERROR | LIBXML_NONET);
    libxml_clear_errors();
    $xpath = new DOMXPath($dom);

    $candidate = rank_predictor_extract_candidate_info($xpath);
    $subjects = rank_predictor_extract_subjects($xpath);
    if (!$subjects) {
        $subjects = rank_predictor_extract_subjects_from_questions($xpath);
    }

    $totals = [
        'totalQuestions' => 0,
        'attempted' => 0,
        'correct' => 0,
        'wrong' => 0,
        'unattempted' => 0,
        'bonus' => 0,
    ];

    foreach ($subjects as $subject) {
        $totals['totalQuestions'] += (int)$subject['totalQuestions'];
        $totals['correct'] += (int)$subject['correct'];
        $totals['wrong'] += (int)$subject['wrong'];
        $totals['unattempted'] += (int)$subject['unattempted'];
        $totals['bonus'] += (int)$subject['bonus'];
    }
    $totals['attempted'] = $totals['correct'] + $totals['wrong'];

    return [
        'candidate' => $candidate,
        'totals' => $totals,
        'subjects' => $subjects,
    ];
}

function rank_predictor_extract_candidate_info(DOMXPath $xpath): array
{
    $info = [
        'name' => '',
        'rollNumber' => '',
        'examDate' => '',
        'examTime' => '',
        'shift' => '',
        'centreName' => '',
        'subject' => '',
    ];

    foreach ($xpath->query('//tr') ?: [] as $row) {
        $cells = $xpath->query('./td|./th', $row);
        if (!$cells || $cells->length < 2) {
            continue;
        }
        $key = strtolower(rank_predictor_clean_parse_text($cells->item(0)?->textContent ?? ''));
        $value = rank_predictor_clean_parse_text($cells->item(1)?->textContent ?? '');
        if ($key === '' || $value === '') {
            continue;
        }

        if ($info['rollNumber'] === '' && preg_match('/roll|participant\s*id|application\s*no|registration/i', $key)) {
            $info['rollNumber'] = $value;
        } elseif ($info['name'] === '' && preg_match('/candidate|applicant|participant\s*name/i', $key)) {
            $info['name'] = $value;
        } elseif ($info['examDate'] === '' && preg_match('/test\s*date|exam\s*date|\bdate\b/i', $key)) {
            $info['examDate'] = $value;
        } elseif ($info['examTime'] === '' && preg_match('/test\s*time|exam\s*time|\btime\b/i', $key)) {
            $info['examTime'] = $value;
            $info['shift'] = rank_predictor_extract_shift($value);
        } elseif ($info['centreName'] === '' && preg_match('/centre|center|venue|vanue/i', $key)) {
            $info['centreName'] = $value;
        } elseif ($info['subject'] === '' && preg_match('/subject|test\s*name|exam\s*name|exam\s*level/i', $key)) {
            $info['subject'] = $value;
        }
    }

    return $info;
}

function rank_predictor_extract_subjects(DOMXPath $xpath): array
{
    $subjects = [];
    foreach ($xpath->query('//*[contains(concat(" ", normalize-space(@class), " "), " section-cntnr ")]') ?: [] as $index => $sectionNode) {
        $titleNode = $xpath->query('.//*[contains(concat(" ", normalize-space(@class), " "), " section-lbl ")]//*[contains(concat(" ", normalize-space(@class), " "), " bold ")]', $sectionNode)->item(0);
        $title = rank_predictor_clean_parse_text($titleNode?->textContent ?? '');
        $questions = $xpath->query('.//*[contains(concat(" ", normalize-space(@class), " "), " question-pnl ")]', $sectionNode);
        $subjects[] = rank_predictor_score_question_nodes($xpath, $questions, $title !== '' ? $title : 'Section ' . ($index + 1));
    }
    return array_values(array_filter($subjects, static fn(array $subject): bool => (int)$subject['totalQuestions'] > 0));
}

function rank_predictor_extract_subjects_from_questions(DOMXPath $xpath): array
{
    $questions = $xpath->query('//*[contains(concat(" ", normalize-space(@class), " "), " question-pnl ")]');
    $subject = rank_predictor_score_question_nodes($xpath, $questions, 'Overall');
    return (int)$subject['totalQuestions'] > 0 ? [$subject] : [];
}

function rank_predictor_score_question_nodes(DOMXPath $xpath, ?DOMNodeList $questions, string $title): array
{
    $subject = [
        'name' => $title,
        'totalQuestions' => 0,
        'correct' => 0,
        'wrong' => 0,
        'unattempted' => 0,
        'bonus' => 0,
    ];

    if (!$questions) {
        return $subject;
    }

    foreach ($questions as $questionNode) {
        $subject['totalQuestions']++;
        $rightAnswer = rank_predictor_first_answer_char(rank_predictor_clean_parse_text(
            $xpath->query('.//*[contains(concat(" ", normalize-space(@class), " "), " rightAns ")]', $questionNode)->item(0)?->textContent ?? ''
        ));
        [$chosenOption, $status] = rank_predictor_extract_question_menu($xpath, $questionNode);

        if ($rightAnswer === '') {
            $subject['bonus']++;
        } elseif ($chosenOption === '' || $chosenOption === '--' || stripos($status, 'not answered') !== false) {
            $subject['unattempted']++;
        } elseif ($rightAnswer === $chosenOption) {
            $subject['correct']++;
        } else {
            $subject['wrong']++;
        }
    }

    return $subject;
}

function rank_predictor_extract_question_menu(DOMXPath $xpath, DOMNode $questionNode): array
{
    $chosen = '';
    $status = '';
    $cells = $xpath->query('.//*[contains(concat(" ", normalize-space(@class), " "), " menu-tbl ")]//td', $questionNode);
    if (!$cells) {
        return [$chosen, $status];
    }

    for ($i = 0; $i < $cells->length; $i++) {
        $label = strtolower(rank_predictor_clean_parse_text($cells->item($i)?->textContent ?? ''));
        $value = rank_predictor_clean_parse_text($cells->item($i + 1)?->textContent ?? '');
        if (strpos($label, 'chosen option') !== false) {
            $chosen = rank_predictor_first_answer_char($value);
        } elseif (strpos($label, 'status') !== false) {
            $status = $value;
        }
    }

    return [$chosen, $status];
}

function rank_predictor_clean_parse_text(string $text): string
{
    $text = html_entity_decode($text, ENT_QUOTES | ENT_HTML5, 'UTF-8');
    $text = preg_replace('/\s+/u', ' ', $text) ?: '';
    return trim($text, " \t\n\r\0\x0B:");
}

function rank_predictor_first_answer_char(string $text): string
{
    $text = trim($text);
    if ($text === '' || $text === '--') {
        return '';
    }
    return strtoupper(substr($text, 0, 1));
}

function rank_predictor_extract_shift(string $text): string
{
    if (preg_match('/shift\s*(\d+)/i', $text, $match)) {
        return $match[1];
    }
    return '';
}
