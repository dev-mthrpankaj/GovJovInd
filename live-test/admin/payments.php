<?php
declare(strict_types=1);

require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../includes/csrf.php';
require_once __DIR__ . '/../includes/payment.php';
require_once __DIR__ . '/_layout.php';

$admin = require_admin();
$pdo = db();

$tests = $pdo->query('SELECT id, title FROM tests ORDER BY test_date DESC, start_time DESC')->fetchAll();
$selectedTestId = filter_var($_GET['test_id'] ?? $_POST['test_id'] ?? ($tests[0]['id'] ?? 0), FILTER_VALIDATE_INT) ?: 0;

$allowedStatuses = ['all', 'paid', 'pending', 'created', 'failed', 'cancelled'];
$statusFilter = strtolower(trim((string) ($_GET['status'] ?? 'all')));
if (!in_array($statusFilter, $allowedStatuses, true)) {
    $statusFilter = 'all';
}

$search = trim((string) ($_GET['q'] ?? ''));

function admin_money_from_paise(?int $paise): string
{
    return format_paise_as_rupees((int) ($paise ?? 0));
}

function admin_payment_badge_label(?string $status): string
{
    $status = (string) ($status ?: 'unknown');
    return match ($status) {
        'paid' => 'Paid',
        'pending' => 'Pending',
        'created' => 'Created',
        'failed' => 'Failed',
        'cancelled' => 'Cancelled',
        default => format_status($status),
    };
}

if (is_post() && ($_POST['action'] ?? '') === 'cancel_old_pending') {
    verify_csrf();

    $cleanupTestId = filter_var($_POST['test_id'] ?? 0, FILTER_VALIDATE_INT) ?: 0;
    if ($cleanupTestId <= 0) {
        flash_set('danger', 'Select a test before running pending payment cleanup.');
        redirect('payments.php');
    }

    $cleanup = $pdo->prepare(
        "UPDATE payments p
         INNER JOIN test_registrations r ON r.payment_id = p.id
         SET p.status = 'cancelled',
             p.updated_at = NOW(),
             r.status = 'payment_cancelled',
             r.payment_status = 'cancelled'
         WHERE p.test_id = ?
           AND p.status IN ('created', 'pending')
           AND p.verified_at IS NULL
           AND p.created_at < (NOW() - INTERVAL 20 MINUTE)
           AND r.status <> 'registered'"
    );
    $cleanup->execute([$cleanupTestId]);

    flash_set('success', 'Old pending payment cleanup completed. Affected rows: ' . (int) $cleanup->rowCount());
    redirect('payments.php?test_id=' . $cleanupTestId);
}

$where = [];
$params = [];

if ($selectedTestId > 0) {
    $where[] = 'p.test_id = ?';
    $params[] = $selectedTestId;
}

if ($statusFilter !== 'all') {
    $where[] = 'p.status = ?';
    $params[] = $statusFilter;
}

if ($search !== '') {
    $where[] = '(p.registration_id LIKE ? OR p.razorpay_order_id LIKE ? OR p.razorpay_payment_id LIKE ? OR u.mobile LIKE ? OR u.name LIKE ? OR u.email LIKE ?)';
    $like = '%' . $search . '%';
    array_push($params, $like, $like, $like, $like, $like, $like);
}

$whereSql = $where ? ('WHERE ' . implode(' AND ', $where)) : '';

$listStmt = $pdo->prepare(
    'SELECT
            p.id AS payment_row_id,
            p.registration_id,
            p.razorpay_order_id,
            p.razorpay_payment_id,
            p.amount_paise,
            p.discount_paise,
            p.payable_paise,
            p.currency,
            p.status AS payment_status,
            p.created_at,
            p.paid_at,
            p.verified_at,
            t.title AS test_title,
            u.name,
            u.mobile,
            u.email,
            r.status AS registration_status,
            r.payment_status AS registration_payment_status,
            r.payment_verified_at,
            r.source,
            pc.code AS promo_code
     FROM payments p
     INNER JOIN tests t ON t.id = p.test_id
     LEFT JOIN users u ON u.id = p.user_id
     LEFT JOIN test_registrations r ON r.payment_id = p.id
     LEFT JOIN promo_codes pc ON pc.id = p.promo_code_id
     ' . $whereSql . '
     ORDER BY p.id DESC
     LIMIT 300'
);
$listStmt->execute($params);
$payments = $listStmt->fetchAll();

$summaryParams = [];
$summaryWhere = '';
if ($selectedTestId > 0) {
    $summaryWhere = 'WHERE test_id = ?';
    $summaryParams[] = $selectedTestId;
}
$summaryStmt = $pdo->prepare(
    'SELECT
        COUNT(*) AS total,
        SUM(CASE WHEN status = "paid" THEN 1 ELSE 0 END) AS paid,
        SUM(CASE WHEN status IN ("created", "pending") THEN 1 ELSE 0 END) AS pending,
        SUM(CASE WHEN status = "failed" THEN 1 ELSE 0 END) AS failed,
        SUM(CASE WHEN status = "cancelled" THEN 1 ELSE 0 END) AS cancelled,
        COALESCE(SUM(CASE WHEN status = "paid" THEN payable_paise ELSE 0 END), 0) AS paid_amount
     FROM payments ' . $summaryWhere
);
$summaryStmt->execute($summaryParams);
$summary = $summaryStmt->fetch() ?: ['total' => 0, 'paid' => 0, 'pending' => 0, 'failed' => 0, 'cancelled' => 0, 'paid_amount' => 0];

admin_header('Payments', $admin);
?>
<section class="stat-grid">
    <article class="stat-card"><span>Total Payments</span><strong><?= (int) $summary['total'] ?></strong></article>
    <article class="stat-card"><span>Paid</span><strong><?= (int) $summary['paid'] ?></strong></article>
    <article class="stat-card"><span>Pending</span><strong><?= (int) $summary['pending'] ?></strong></article>
    <article class="stat-card"><span>Failed</span><strong><?= (int) $summary['failed'] ?></strong></article>
    <article class="stat-card"><span>Cancelled</span><strong><?= (int) $summary['cancelled'] ?></strong></article>
    <article class="stat-card"><span>Paid Amount</span><strong><?= e(admin_money_from_paise((int) $summary['paid_amount'])) ?></strong></article>
</section>

<section class="panel">
    <div class="panel-header">
        <div>
            <h2>Payment Management</h2>
            <p>Track Razorpay orders, verified payments, failed payments, and old pending registrations.</p>
        </div>
        <?php if ($selectedTestId > 0): ?>
            <a class="btn btn-light" href="backup.php?test_id=<?= (int) $selectedTestId ?>&type=payments">Payments CSV</a>
        <?php endif; ?>
    </div>

    <form method="get" class="filter-grid">
        <label>Test
            <select name="test_id" onchange="this.form.submit()">
                <?php foreach ($tests as $test): ?>
                    <option value="<?= (int) $test['id'] ?>" <?= (int) $test['id'] === $selectedTestId ? 'selected' : '' ?>><?= e($test['title']) ?></option>
                <?php endforeach; ?>
            </select>
        </label>
        <label>Status
            <select name="status" onchange="this.form.submit()">
                <?php foreach ($allowedStatuses as $status): ?>
                    <option value="<?= e($status) ?>" <?= $status === $statusFilter ? 'selected' : '' ?>><?= e(format_status($status)) ?></option>
                <?php endforeach; ?>
            </select>
        </label>
        <label>Search
            <input type="search" name="q" value="<?= e($search) ?>" placeholder="Mobile, name, registration, order, payment ID">
        </label>
        <div class="form-actions">
            <button class="btn btn-primary" type="submit">Apply Filters</button>
            <a class="btn btn-light" href="payments.php?test_id=<?= (int) $selectedTestId ?>">Reset</a>
        </div>
    </form>
</section>

<section class="panel">
    <div class="panel-header">
        <div>
            <h2>Cleanup</h2>
            <p>Cancel pending Razorpay registrations older than 20 minutes. Paid/registered rows are never touched.</p>
        </div>
        <form method="post" onsubmit="return confirm('Cancel old pending payments for this selected test?');">
            <?= csrf_field() ?>
            <input type="hidden" name="test_id" value="<?= (int) $selectedTestId ?>">
            <input type="hidden" name="action" value="cancel_old_pending">
            <button class="btn btn-light" type="submit">Cancel Old Pending Payments</button>
        </form>
    </div>
</section>

<section class="panel">
    <div class="table-wrap">
        <table>
            <thead>
                <tr>
                    <th>Payment</th>
                    <th>Candidate</th>
                    <th>Registration</th>
                    <th>Status</th>
                    <th>Amount</th>
                    <th>Razorpay</th>
                    <th>Times</th>
                    <th>Source</th>
                </tr>
            </thead>
            <tbody>
                <?php if (!$payments): ?>
                    <tr><td colspan="8" class="empty-cell">No payments found.</td></tr>
                <?php endif; ?>
                <?php foreach ($payments as $row): ?>
                    <tr>
                        <td>
                            <strong>#<?= (int) $row['payment_row_id'] ?></strong>
                            <span class="muted block"><?= e($row['test_title'] ?? '-') ?></span>
                        </td>
                        <td>
                            <strong><?= e($row['name'] ?: '-') ?></strong>
                            <span class="muted block"><?= e($row['mobile'] ?: '-') ?></span>
                            <span class="muted block"><?= e($row['email'] ?: '-') ?></span>
                        </td>
                        <td>
                            <?= e($row['registration_id'] ?: '-') ?>
                            <span class="muted block">Reg: <?= e(format_status((string) ($row['registration_status'] ?: '-'))) ?></span>
                            <span class="muted block">Reg Pay: <?= e(format_status((string) ($row['registration_payment_status'] ?: '-'))) ?></span>
                        </td>
                        <td><span class="status-pill"><?= e(admin_payment_badge_label($row['payment_status'] ?? '')) ?></span></td>
                        <td>
                            <div>Fee: <?= e(admin_money_from_paise((int) $row['amount_paise'])) ?></div>
                            <div class="muted">Discount: <?= e(admin_money_from_paise((int) $row['discount_paise'])) ?></div>
                            <strong>Payable: <?= e(admin_money_from_paise((int) $row['payable_paise'])) ?></strong>
                            <?php if (!empty($row['promo_code'])): ?><span class="muted block">Promo: <?= e($row['promo_code']) ?></span><?php endif; ?>
                        </td>
                        <td>
                            <span class="muted block">Order: <?= e($row['razorpay_order_id'] ?: '-') ?></span>
                            <span class="muted block">Payment: <?= e($row['razorpay_payment_id'] ?: '-') ?></span>
                        </td>
                        <td>
                            <span class="muted block">Created: <?= e($row['created_at'] ?: '-') ?></span>
                            <span class="muted block">Paid: <?= e($row['paid_at'] ?: '-') ?></span>
                            <span class="muted block">Verified: <?= e($row['verified_at'] ?: '-') ?></span>
                        </td>
                        <td><?= e($row['source'] ?: '-') ?></td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>
</section>
<?php admin_footer(); ?>
