<?php
declare(strict_types=1);

require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/_layout.php';

$admin = require_admin();
$tests = db()->query('SELECT id, title, slug FROM tests ORDER BY test_date DESC, start_time DESC')->fetchAll();
$selectedTestId = filter_var($_GET['test_id'] ?? ($tests[0]['id'] ?? 0), FILTER_VALIDATE_INT) ?: 0;
$type = substr(trim((string) ($_GET['type'] ?? '')), 0, 40);

function csv_download(string $filename, array $headers, array $rows): never
{
    header('Content-Type: text/csv; charset=utf-8');
    header('Content-Disposition: attachment; filename="' . $filename . '"');
    $out = fopen('php://output', 'w');
    fputcsv($out, $headers);
    foreach ($rows as $row) {
        fputcsv($out, $row);
    }
    fclose($out);
    exit;
}

if ($selectedTestId > 0 && $type !== '') {
    if ($type === 'registrations') {
        $stmt = db()->prepare(
            'SELECT r.registration_id, r.registered_at, r.status,
                    r.payment_status, r.amount_paise, r.discount_paise, r.payable_paise,
                    r.payment_verified_at, r.source,
                    pc.code AS promo_code,
                    p.razorpay_order_id, p.razorpay_payment_id,
                    u.name, u.mobile, u.email, u.category, u.city, u.state
             FROM test_registrations r
             INNER JOIN users u ON u.id = r.user_id
             LEFT JOIN promo_codes pc ON pc.id = r.promo_code_id
             LEFT JOIN payments p ON p.id = r.payment_id
             WHERE r.test_id = ?
             ORDER BY r.id ASC'
        );
        $stmt->execute([$selectedTestId]);
        $rows = array_map(
            fn($r) => [
                $r['registration_id'],
                $r['registered_at'],
                $r['status'],
                $r['name'],
                $r['mobile'],
                $r['email'],
                $r['category'],
                $r['city'],
                $r['state'],
                $r['payment_status'],
                $r['amount_paise'],
                $r['discount_paise'],
                $r['payable_paise'],
                $r['promo_code'],
                $r['source'],
                $r['razorpay_order_id'],
                $r['razorpay_payment_id'],
                $r['payment_verified_at'],
            ],
            $stmt->fetchAll()
        );
        csv_download(
            'registrations-' . $selectedTestId . '.csv',
            [
                'registration_id',
                'registered_at',
                'status',
                'name',
                'mobile',
                'email',
                'category',
                'city',
                'state',
                'payment_status',
                'amount_paise',
                'discount_paise',
                'payable_paise',
                'promo_code',
                'source',
                'razorpay_order_id',
                'razorpay_payment_id',
                'payment_verified_at',
            ],
            $rows
        );
    }
    if ($type === 'payments') {
        $stmt = db()->prepare(
            'SELECT
                    p.id AS payment_row_id,
                    t.title AS test_title,
                    p.registration_id,
                    u.name,
                    u.mobile,
                    u.email,
                    r.status AS registration_status,
                    r.payment_status AS registration_payment_status,
                    p.status AS payment_status,
                    p.amount_paise,
                    p.discount_paise,
                    p.payable_paise,
                    p.currency,
                    pc.code AS promo_code,
                    p.razorpay_order_id,
                    p.razorpay_payment_id,
                    p.created_at,
                    p.paid_at,
                    p.verified_at,
                    r.payment_verified_at,
                    r.source
             FROM payments p
             INNER JOIN tests t ON t.id = p.test_id
             LEFT JOIN users u ON u.id = p.user_id
             LEFT JOIN test_registrations r ON r.payment_id = p.id
             LEFT JOIN promo_codes pc ON pc.id = p.promo_code_id
             WHERE p.test_id = ?
             ORDER BY p.id ASC'
        );
        $stmt->execute([$selectedTestId]);
        $rows = array_map(
            fn($r) => [
                $r['payment_row_id'],
                $r['test_title'],
                $r['registration_id'],
                $r['name'],
                $r['mobile'],
                $r['email'],
                $r['registration_status'],
                $r['registration_payment_status'],
                $r['payment_status'],
                $r['amount_paise'],
                $r['discount_paise'],
                $r['payable_paise'],
                $r['currency'],
                $r['promo_code'],
                $r['razorpay_order_id'],
                $r['razorpay_payment_id'],
                $r['created_at'],
                $r['paid_at'],
                $r['verified_at'],
                $r['payment_verified_at'],
                $r['source'],
            ],
            $stmt->fetchAll()
        );
        csv_download(
            'payments-' . $selectedTestId . '.csv',
            [
                'payment_row_id',
                'test_title',
                'registration_id',
                'name',
                'mobile',
                'email',
                'registration_status',
                'registration_payment_status',
                'payment_status',
                'amount_paise',
                'discount_paise',
                'payable_paise',
                'currency',
                'promo_code',
                'razorpay_order_id',
                'razorpay_payment_id',
                'payment_created_at',
                'paid_at',
                'verified_at',
                'registration_payment_verified_at',
                'source',
            ],
            $rows
        );
    }

    if ($type === 'attempts') {
        $stmt = db()->prepare('SELECT a.id, r.registration_id, u.name, u.mobile, a.started_at, a.submitted_at, a.status, a.violation_count, a.eligibility_status, a.leaderboard_eligible, a.disqualification_reason FROM test_attempts a INNER JOIN test_registrations r ON r.id = a.registration_id INNER JOIN users u ON u.id = a.user_id WHERE a.test_id = ? ORDER BY a.id ASC');
        $stmt->execute([$selectedTestId]);
        $rows = array_map(fn($r) => [$r['id'], $r['registration_id'], $r['name'], $r['mobile'], $r['started_at'], $r['submitted_at'], $r['status'], $r['violation_count'], $r['eligibility_status'], $r['leaderboard_eligible'], $r['disqualification_reason']], $stmt->fetchAll());
        csv_download('attempts-' . $selectedTestId . '.csv', ['attempt_id', 'registration_id', 'name', 'mobile', 'started_at', 'submitted_at', 'status', 'violation_count', 'eligibility_status', 'leaderboard_eligible', 'reason'], $rows);
    }
    if ($type === 'answers') {
        $stmt = db()->prepare('SELECT r.registration_id, q.question_number, s.section_name, ua.selected_option, ua.answer_status, ua.time_spent_seconds, ua.change_count FROM user_answers ua INNER JOIN test_attempts a ON a.id = ua.attempt_id INNER JOIN test_registrations r ON r.id = a.registration_id INNER JOIN questions q ON q.id = ua.question_id INNER JOIN test_sections s ON s.id = q.section_id WHERE a.test_id = ? ORDER BY r.id, s.section_order, q.question_number');
        $stmt->execute([$selectedTestId]);
        $rows = array_map(fn($r) => [$r['registration_id'], $r['section_name'], $r['question_number'], $r['selected_option'], $r['answer_status'], $r['time_spent_seconds'], $r['change_count']], $stmt->fetchAll());
        csv_download('answers-' . $selectedTestId . '.csv', ['registration_id', 'section', 'question_number', 'selected_option', 'answer_status', 'time_spent_seconds', 'change_count'], $rows);
    }
    if ($type === 'violations') {
        $stmt = db()->prepare('SELECT r.registration_id, u.name, u.mobile, v.violation_type, v.event_source, v.event_time, v.client_timestamp, v.metadata FROM violation_logs v INNER JOIN test_attempts a ON a.id = v.attempt_id INNER JOIN test_registrations r ON r.id = a.registration_id INNER JOIN users u ON u.id = a.user_id WHERE a.test_id = ? ORDER BY v.event_time DESC');
        $stmt->execute([$selectedTestId]);
        $rows = array_map(fn($r) => [$r['registration_id'], $r['name'], $r['mobile'], $r['violation_type'], $r['event_source'], $r['event_time'], $r['client_timestamp'], $r['metadata']], $stmt->fetchAll());
        csv_download('violations-' . $selectedTestId . '.csv', ['registration_id', 'name', 'mobile', 'violation_type', 'event_source', 'event_time', 'client_timestamp', 'metadata'], $rows);
    }
    if ($type === 'results' || $type === 'summary') {
        $stmt = db()->prepare('SELECT tr.overall_rank, r.registration_id, u.name, u.mobile, tr.marks, tr.correct_count, tr.wrong_count, tr.attempted_count, tr.not_attempted_count, tr.accuracy, a.submitted_at, a.eligibility_status, a.leaderboard_eligible FROM test_results tr INNER JOIN test_attempts a ON a.id = tr.attempt_id INNER JOIN test_registrations r ON r.id = a.registration_id INNER JOIN users u ON u.id = tr.user_id WHERE tr.test_id = ? ORDER BY tr.overall_rank IS NULL, tr.overall_rank ASC, tr.marks DESC');
        $stmt->execute([$selectedTestId]);
        $rows = array_map(fn($r) => [$r['overall_rank'], $r['registration_id'], $r['name'], $r['mobile'], $r['marks'], $r['correct_count'], $r['wrong_count'], $r['attempted_count'], $r['not_attempted_count'], $r['accuracy'], $r['submitted_at'], $r['eligibility_status'], $r['leaderboard_eligible']], $stmt->fetchAll());
        csv_download(($type === 'summary' ? 'summary-' : 'results-') . $selectedTestId . '.csv', ['rank', 'registration_id', 'name', 'mobile', 'marks', 'correct', 'wrong', 'attempted', 'not_attempted', 'accuracy', 'submitted_at', 'eligibility_status', 'leaderboard_eligible'], $rows);
    }
}

admin_header('Backups & Exports', $admin);
?>
<section class="panel narrow-panel">
    <div class="panel-header">
        <div>
            <h2>Test-wise Backups</h2>
            <p>Download protected admin CSV exports. These links require admin login.</p>
        </div>
    </div>
    <form method="get" class="form-grid">
        <label class="full">Test
            <select name="test_id" onchange="this.form.submit()">
                <?php foreach ($tests as $test): ?>
                    <option value="<?= (int) $test['id'] ?>" <?= (int) $test['id'] === $selectedTestId ? 'selected' : '' ?>><?= e($test['title']) ?></option>
                <?php endforeach; ?>
            </select>
        </label>
    </form>
    <div class="form-actions">
        <?php foreach (['registrations', 'payments', 'attempts', 'answers', 'violations', 'results', 'summary'] as $exportType): ?>
            <a class="btn btn-light" href="backup.php?test_id=<?= (int) $selectedTestId ?>&type=<?= e($exportType) ?>"><?= e(format_status($exportType)) ?> CSV</a>
        <?php endforeach; ?>
    </div>
</section>
<?php admin_footer(); ?>
