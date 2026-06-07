<?php
declare(strict_types=1);

function e(?string $value): string
{
    return htmlspecialchars((string) $value, ENT_QUOTES, 'UTF-8');
}

function redirect(string $path): never
{
    header('Location: ' . $path);
    exit;
}

function flash_set(string $type, string $message): void
{
    $_SESSION['flash'][$type] = $message;
}

function flash_get(): array
{
    $flash = $_SESSION['flash'] ?? [];
    unset($_SESSION['flash']);
    return $flash;
}

function is_post(): bool
{
    return ($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'POST';
}

function input_string(string $key, int $maxLength = 255): string
{
    $value = trim((string) ($_POST[$key] ?? ''));
    return substr($value, 0, $maxLength);
}

function input_int(string $key, int $default = 0): int
{
    return filter_var($_POST[$key] ?? $default, FILTER_VALIDATE_INT) !== false
        ? (int) $_POST[$key]
        : $default;
}

function slugify(string $value): string
{
    $value = strtolower(trim($value));
    $value = preg_replace('/[^a-z0-9]+/i', '-', $value) ?? '';
    $value = trim($value, '-');
    return $value !== '' ? $value : 'test-' . date('YmdHis');
}

function valid_test_statuses(): array
{
    return ['upcoming', 'registration_open', 'live', 'closed', 'result_published', 'archived'];
}

function format_status(string $status): string
{
    return ucwords(str_replace('_', ' ', $status));
}

function default_sections(): array
{
    return [
        ['section_name' => 'Hindi', 'section_slug' => 'hindi', 'section_order' => 1, 'question_count' => 20, 'duration_minutes' => 8],
        ['section_name' => 'English', 'section_slug' => 'english', 'section_order' => 2, 'question_count' => 20, 'duration_minutes' => 10],
        ['section_name' => 'GS/GK', 'section_slug' => 'gs-gk', 'section_order' => 3, 'question_count' => 20, 'duration_minutes' => 8],
        ['section_name' => 'Maths', 'section_slug' => 'maths', 'section_order' => 4, 'question_count' => 20, 'duration_minutes' => 17],
        ['section_name' => 'Reasoning', 'section_slug' => 'reasoning', 'section_order' => 5, 'question_count' => 20, 'duration_minutes' => 17],
    ];
}

function valid_difficulties(): array
{
    return ['easy', 'medium', 'hard'];
}

function correct_options(): array
{
    return ['A', 'B', 'C', 'D'];
}

function section_language_rule(string $sectionSlug): string
{
    return match ($sectionSlug) {
        'hindi' => 'hindi',
        'english' => 'english',
        default => 'bilingual',
    };
}

function validate_question_language_fields(array $data, string $sectionSlug, array $optionImages = []): array
{
    $rule = section_language_rule($sectionSlug);
    $errors = [];

    $requiredHindi = [
        'question_hi' => 'Hindi question',
    ];
    $requiredEnglish = [
        'question_en' => 'English question',
    ];

    if ($rule === 'hindi' || $rule === 'bilingual') {
        foreach ($requiredHindi as $field => $label) {
            if (trim((string) ($data[$field] ?? '')) === '') {
                $errors[] = $label . ' is required for this section.';
            }
        }
    }

    if ($rule === 'english' || $rule === 'bilingual') {
        foreach ($requiredEnglish as $field => $label) {
            if (trim((string) ($data[$field] ?? '')) === '') {
                $errors[] = $label . ' is required for this section.';
            }
        }
    }

    foreach (['a' => 'A', 'b' => 'B', 'c' => 'C', 'd' => 'D'] as $key => $label) {
        $hasImage = !empty($optionImages[$key]);
        $hasHindi = trim((string) ($data['option_' . $key . '_hi'] ?? '')) !== '';
        $hasEnglish = trim((string) ($data['option_' . $key . '_en'] ?? '')) !== '';

        if ($hasImage) {
            continue;
        }

        if ($rule === 'hindi' && !$hasHindi) {
            $errors[] = 'Hindi option ' . $label . ' or option image is required for this section.';
        }
        if ($rule === 'english' && !$hasEnglish) {
            $errors[] = 'English option ' . $label . ' or option image is required for this section.';
        }
        if ($rule === 'bilingual' && (!$hasHindi || !$hasEnglish)) {
            $errors[] = 'Hindi and English option ' . $label . ' are required unless an option image is uploaded.';
        }
    }

    return $errors;
}

function upload_image_file(string $field, string $folder, string $prefix, array &$errors): ?string
{
    if (empty($_FILES[$field]) || ($_FILES[$field]['error'] ?? UPLOAD_ERR_NO_FILE) === UPLOAD_ERR_NO_FILE) {
        return null;
    }

    $file = $_FILES[$field];
    if (($file['error'] ?? UPLOAD_ERR_OK) !== UPLOAD_ERR_OK) {
        $errors[] = 'Upload failed for ' . $field . '.';
        return null;
    }

    if ((int) $file['size'] > 2 * 1024 * 1024) {
        $errors[] = 'Image ' . $field . ' must be 2 MB or smaller.';
        return null;
    }

    $extension = strtolower(pathinfo((string) $file['name'], PATHINFO_EXTENSION));
    $allowedExtensions = ['jpg', 'jpeg', 'png', 'webp'];
    if (!in_array($extension, $allowedExtensions, true)) {
        $errors[] = 'Image ' . $field . ' must be jpg, jpeg, png, or webp.';
        return null;
    }

    $finfo = new finfo(FILEINFO_MIME_TYPE);
    $mime = $finfo->file((string) $file['tmp_name']);
    $allowedMime = [
        'jpg' => ['image/jpeg'],
        'jpeg' => ['image/jpeg'],
        'png' => ['image/png'],
        'webp' => ['image/webp'],
    ];
    if (!in_array($mime, $allowedMime[$extension] ?? [], true)) {
        $errors[] = 'Image ' . $field . ' has an invalid file type.';
        return null;
    }

    $folder = trim($folder, '/');
    $targetDir = LIVE_TEST_BASE_PATH . '/' . $folder;
    if (!is_dir($targetDir) && !mkdir($targetDir, 0755, true)) {
        $errors[] = 'Upload folder is not available.';
        return null;
    }

    $filename = $prefix . '_' . bin2hex(random_bytes(12)) . '.' . $extension;
    $targetPath = $targetDir . '/' . $filename;
    if (!move_uploaded_file((string) $file['tmp_name'], $targetPath)) {
        $errors[] = 'Could not save uploaded image ' . $field . '.';
        return null;
    }

    return $folder . '/' . $filename;
}

function delete_upload_file(?string $relativePath): void
{
    if (!$relativePath) {
        return;
    }

    $normalized = str_replace('\\', '/', $relativePath);
    if (!str_starts_with($normalized, 'uploads/')) {
        return;
    }

    $fullPath = realpath(LIVE_TEST_BASE_PATH . '/' . $normalized);
    $uploadsRoot = realpath(LIVE_TEST_BASE_PATH . '/uploads');
    if (!$fullPath || !$uploadsRoot || !str_starts_with($fullPath, $uploadsRoot)) {
        return;
    }

    if (is_file($fullPath)) {
        unlink($fullPath);
    }
}

function active_registration_count(int $testId): int
{
    $stmt = db()->prepare("SELECT COUNT(*) FROM test_registrations WHERE test_id = ? AND status = 'registered'");
    $stmt->execute([$testId]);
    return (int) $stmt->fetchColumn();
}

function seats_remaining(array $test): int
{
    return max(0, (int) $test['registration_limit'] - active_registration_count((int) $test['id']));
}

function test_start_datetime(array $test): DateTimeImmutable
{
    return new DateTimeImmutable($test['test_date'] . ' ' . $test['start_time']);
}

function test_end_datetime(array $test): DateTimeImmutable
{
    return new DateTimeImmutable($test['test_date'] . ' ' . $test['end_time']);
}

function pre_test_login_status(array $test, int $windowMinutes = 10): array
{
    $now = new DateTimeImmutable('now');
    $start = test_start_datetime($test);
    $end = test_end_datetime($test);
    $loginStart = $start->modify('-' . max(0, $windowMinutes) . ' minutes');

    if ($now > $end) {
        return [
            'allowed' => false,
            'reason' => 'ended',
            'seconds_until_login' => 0,
            'seconds_until_start' => 0,
            'message' => 'Test time is over. You can check result after admin publishes it.',
        ];
    }

    if ($now < $loginStart) {
        return [
            'allowed' => false,
            'reason' => 'too_early',
            'seconds_until_login' => max(0, $loginStart->getTimestamp() - $now->getTimestamp()),
            'seconds_until_start' => max(0, $start->getTimestamp() - $now->getTimestamp()),
            'message' => 'Login opens 10 minutes before the test starts.',
        ];
    }

    return [
        'allowed' => true,
        'reason' => $now < $start ? 'pre_start' : 'started',
        'seconds_until_login' => 0,
        'seconds_until_start' => max(0, $start->getTimestamp() - $now->getTimestamp()),
        'message' => $now < $start
            ? 'You can verify and read instructions before the test starts.'
            : 'The test is live now.',
    ];
}

function default_registration_window(string $testDate): array
{
    $date = new DateTimeImmutable($testDate);
    $monday = $date->modify('monday this week')->setTime(0, 0, 0);
    $saturday = $date->modify('saturday this week')->setTime(23, 59, 59);

    return [
        'start' => $monday->format('Y-m-d H:i:s'),
        'end' => $saturday->format('Y-m-d H:i:s'),
    ];
}

function datetime_local_value(?string $dateTime): string
{
    if (!$dateTime) {
        return '';
    }

    return (new DateTimeImmutable($dateTime))->format('Y-m-d\TH:i');
}

function normalize_datetime_local(string $value): ?string
{
    $value = trim($value);
    if ($value === '') {
        return null;
    }

    $date = DateTimeImmutable::createFromFormat('Y-m-d\TH:i', $value);
    if (!$date) {
        return null;
    }

    return $date->format('Y-m-d H:i:s');
}

function registration_window_status(array $test): array
{
    $now = new DateTimeImmutable('now');
    $defaultWindow = default_registration_window((string) $test['test_date']);
    $start = new DateTimeImmutable(!empty($test['registration_start_at']) ? $test['registration_start_at'] : $defaultWindow['start']);
    $end = new DateTimeImmutable(!empty($test['registration_end_at']) ? $test['registration_end_at'] : $defaultWindow['end']);
    $filled = active_registration_count((int) $test['id']);
    $limit = (int) $test['registration_limit'];

    if ($filled >= $limit) {
        return ['allowed' => false, 'reason' => 'full', 'message' => 'Registration closed. All seats are filled.'];
    }
    $weeklyStatus = weekly_registration_window_status($now);
    if (!$weeklyStatus['allowed']) {
        return $weeklyStatus;
    }
    if ($now < $start) {
        return ['allowed' => false, 'reason' => 'not_started', 'message' => 'Registration will open on ' . $start->format('d M Y, h:i A') . '.'];
    }
    if ($now > $end) {
        return ['allowed' => false, 'reason' => 'ended', 'message' => 'Registration closed. Test starts on ' . test_start_datetime($test)->format('d M Y, h:i A') . '.'];
    }

    return ['allowed' => true, 'reason' => 'open', 'message' => 'Registration is open.'];
}

function weekly_registration_window_status(?DateTimeImmutable $now = null): array
{
    $now = $now ?: new DateTimeImmutable('now');
    $dayOfWeek = (int) $now->format('N');

    if (defined('LIVE_TEST_LOCAL_REGISTRATION_OVERRIDE') && LIVE_TEST_LOCAL_REGISTRATION_OVERRIDE === true) {
    return [
        'allowed' => true,
        'reason' => 'local_testing_open',
        'message' => 'Registration is open for local testing.',
    ];
}

    if ($dayOfWeek === 7) {
        return [
            'allowed' => false,
            'reason' => 'weekly_sunday_closed',
            'message' => 'Registration is closed today. Please check Live Test instructions.',
        ];
    }

    $openAt = $now->setTime(12, 0, 0);
    $closeAt = $now->setTime(16, 0, 0);

    if ($dayOfWeek < 4 || $dayOfWeek > 6 || $now < $openAt || $now > $closeAt) {
        return [
            'allowed' => false,
            'reason' => 'weekly_time_closed',
            'message' => 'Registration is currently closed. Registration opens Thursday to Saturday from 12:00 PM to 4:00 PM.',
        ];
    }

    return [
        'allowed' => true,
        'reason' => 'weekly_open',
        'message' => 'Registration is open Thursday to Saturday from 12:00 PM to 4:00 PM.',
    ];
}

function weekly_registration_window_note(): string
{
    return 'PHP registration follows weekly window: Thursday-Saturday, 12 PM-4 PM.';
}

function registration_window_range(array $test): array
{
    $defaultWindow = default_registration_window((string) $test['test_date']);
    return [
        'start' => new DateTimeImmutable(!empty($test['registration_start_at']) ? $test['registration_start_at'] : $defaultWindow['start']),
        'end' => new DateTimeImmutable(!empty($test['registration_end_at']) ? $test['registration_end_at'] : $defaultWindow['end']),
    ];
}

function generate_registration_id(): string
{
    return 'GJU' . date('ymd') . strtoupper(bin2hex(random_bytes(4)));
}

function public_test_status_label(string $status): string
{
    return match ($status) {
        'registration_open' => 'Registration Open',
        'live' => 'Live Now',
        'closed' => 'Closed',
        'result_published' => 'Result Published',
        'archived' => 'Archived',
        default => 'Upcoming',
    };
}

function find_registration_by_code(string $registrationId): ?array
{
    $stmt = db()->prepare(
        'SELECT r.*, u.name, u.mobile, u.email, u.category, u.city, u.state,
                t.title, t.slug, t.test_date, t.start_time, t.end_time, t.duration_minutes,
                t.registration_limit, t.status, t.is_free, t.result_visible
         FROM test_registrations r
         INNER JOIN users u ON u.id = r.user_id
         INNER JOIN tests t ON t.id = r.test_id
         WHERE r.registration_id = ? AND r.status = "registered"
         LIMIT 1'
    );
    $stmt->execute([$registrationId]);
    $row = $stmt->fetch();
    return $row ?: null;
}

function find_registration_for_test_identifier(int $testId, string $identifier): ?array
{
    $identifier = trim($identifier);
    if ($identifier === '') {
        return null;
    }

    $mobile = preg_replace('/\D+/', '', $identifier);
    $stmt = db()->prepare(
        'SELECT r.*, u.name, u.mobile, u.email, u.category, u.city, u.state,
                t.title, t.slug, t.test_date, t.start_time, t.end_time, t.duration_minutes,
                t.registration_limit, t.status, t.is_free, t.result_visible
         FROM test_registrations r
         INNER JOIN users u ON u.id = r.user_id
         INNER JOIN tests t ON t.id = r.test_id
         WHERE r.test_id = ?
           AND r.status = "registered"
           AND (r.registration_id = ? OR u.mobile = ?)
         LIMIT 1'
    );
    $stmt->execute([$testId, $identifier, $mobile]);
    $row = $stmt->fetch();
    return $row ?: null;
}

function test_sections_with_offsets(int $testId): array
{
    $stmt = db()->prepare('SELECT * FROM test_sections WHERE test_id = ? ORDER BY section_order ASC');
    $stmt->execute([$testId]);
    $sections = $stmt->fetchAll();
    $offset = 0;

    foreach ($sections as $index => $section) {
        $sections[$index]['offset_start'] = $offset;
        $offset += ((int) $section['duration_minutes']) * 60;
        $sections[$index]['offset_end'] = $offset;
    }

    return $sections;
}

function timing_context(array $test, array $sections): array
{
    $now = new DateTimeImmutable('now');
    $start = test_start_datetime($test);
    $elapsed = $now->getTimestamp() - $start->getTimestamp();
    $totalSeconds = array_sum(array_map(fn (array $section): int => (int) $section['duration_minutes'] * 60, $sections));
    $activeSection = null;

    foreach ($sections as $section) {
        if ($elapsed >= (int) $section['offset_start'] && $elapsed < (int) $section['offset_end']) {
            $activeSection = $section;
            break;
        }
    }

    return [
        'server_epoch' => $now->getTimestamp(),
        'test_start_epoch' => $start->getTimestamp(),
        'elapsed_seconds' => max(0, $elapsed),
        'total_seconds' => $totalSeconds,
        'total_remaining_seconds' => max(0, $totalSeconds - max(0, $elapsed)),
        'active_section' => $activeSection,
        'section_remaining_seconds' => $activeSection ? max(0, (int) $activeSection['offset_end'] - max(0, $elapsed)) : 0,
        'has_started' => $elapsed >= 0,
        'has_ended' => $elapsed >= $totalSeconds,
    ];
}

function get_or_create_attempt(array $registration): array
{
    $pdo = db();
    $stmt = $pdo->prepare('SELECT * FROM test_attempts WHERE registration_id = ? LIMIT 1');
    $stmt->execute([(int) $registration['id']]);
    $attempt = $stmt->fetch();

    if ($attempt) {
        return $attempt;
    }

    $insert = $pdo->prepare('INSERT INTO test_attempts (test_id, user_id, registration_id, started_at, status) VALUES (?, ?, ?, NOW(), "in_progress")');
    $insert->execute([(int) $registration['test_id'], (int) $registration['user_id'], (int) $registration['id']]);

    $stmt->execute([(int) $registration['id']]);
    return $stmt->fetch();
}

function attempt_token(int $attemptId): string
{
    if (empty($_SESSION['attempt_tokens'][$attemptId])) {
        $_SESSION['attempt_tokens'][$attemptId] = bin2hex(random_bytes(32));
    }

    return $_SESSION['attempt_tokens'][$attemptId];
}

function verify_attempt_token(int $attemptId, string $token): bool
{
    $stored = (string) ($_SESSION['attempt_tokens'][$attemptId] ?? '');
    return $stored !== '' && hash_equals($stored, $token);
}

function json_response(array $payload, int $status = 200): never
{
    http_response_code($status);
    header('Content-Type: application/json');
    echo json_encode($payload);
    exit;
}

function current_registration_from_request(): ?array
{
    $rid = (string) ($_POST['rid'] ?? $_GET['rid'] ?? $_SESSION['live_test_registration_id'] ?? '');
    if ($rid === '') {
        return null;
    }

    return find_registration_by_code($rid);
}
