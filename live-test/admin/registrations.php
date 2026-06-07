<?php
declare(strict_types=1);

require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/_layout.php';

$admin = require_admin();
$tests = db()->query('SELECT id, title FROM tests ORDER BY test_date DESC, start_time DESC')->fetchAll();
$selectedTestId = filter_var($_GET['test_id'] ?? ($tests[0]['id'] ?? 0), FILTER_VALIDATE_INT) ?: 0;

$stmt = db()->prepare(
    'SELECT r.registration_id, r.registered_at, r.status,
            r.payment_status, r.amount_paise, r.discount_paise, r.payable_paise,
            r.payment_verified_at, r.source,
            pc.code AS promo_code,
            p.razorpay_payment_id,
            u.name, u.mobile, u.email, u.category, u.city, u.state
     FROM test_registrations r
     INNER JOIN users u ON u.id = r.user_id
     LEFT JOIN promo_codes pc ON pc.id = r.promo_code_id
     LEFT JOIN payments p ON p.id = r.payment_id
     WHERE r.test_id = ?
     ORDER BY r.id DESC'
);
$stmt->execute([$selectedTestId]);
$registrations = $stmt->fetchAll();

function admin_payment_status_label(?string $status): string
{
    $status = (string) ($status ?: 'not_required');
    return match ($status) {
        'paid' => 'Paid',
        'free_promo' => 'Free Promo',
        'waived' => 'Waived',
        'pending', 'pending_payment' => 'Pending',
        'failed' => 'Failed',
        'cancelled' => 'Cancelled',
        'not_required' => 'Not Required',
        default => format_status($status),
    };
}

admin_header('Registrations', $admin);
?>
<section class="panel">
    <div class="panel-header">
        <div>
            <h2>Registered Students</h2>
            <p>View payment-ready registrations for a selected test.</p>
        </div>
        <div class="form-actions">
            <a class="btn btn-light" href="payments.php?test_id=<?= (int) $selectedTestId ?>">View Payments</a>
            <a class="btn btn-light" href="backup.php?test_id=<?= (int) $selectedTestId ?>&type=registrations">Export CSV</a>
        </div>
    </div>
    <form method="get" class="filter-grid">
        <label>Test
            <select name="test_id" onchange="this.form.submit()">
                <?php foreach ($tests as $test): ?>
                    <option value="<?= (int) $test['id'] ?>" <?= (int) $test['id'] === $selectedTestId ? 'selected' : '' ?>><?= e($test['title']) ?></option>
                <?php endforeach; ?>
            </select>
        </label>
    </form>
</section>

<section class="panel">
    <div class="table-wrap">
        <table>
            <thead>
                <tr>
                    <th>Registration</th>
                    <th>Name</th>
                    <th>Mobile</th>
                    <th>Email</th>
                    <th>Payment</th>
                    <th>Amount</th>
                    <th>Promo</th>
                    <th>Source</th>
                    <th>City/State</th>
                    <th>Time</th>
                </tr>
            </thead>
            <tbody>
                <?php if (!$registrations): ?>
                    <tr><td colspan="10" class="empty-cell">No registrations found.</td></tr>
                <?php endif; ?>
                <?php foreach ($registrations as $row): ?>
                    <tr>
                        <td><?= e($row['registration_id']) ?></td>
                        <td><?= e($row['name']) ?></td>
                        <td><?= e($row['mobile']) ?></td>
                        <td><?= e($row['email'] ?: '-') ?></td>
                        <td>
                            <span class="status-pill"><?= e(admin_payment_status_label($row['payment_status'] ?? 'not_required')) ?></span>
                            <?php if (!empty($row['razorpay_payment_id'])): ?>
                                <div class="muted"><?= e($row['razorpay_payment_id']) ?></div>
                            <?php endif; ?>
                        </td>
                        <td>
                            <div>Fee: ₹<?= number_format(((int) ($row['amount_paise'] ?? 0)) / 100, 2) ?></div>
                            <div class="muted">Discount: ₹<?= number_format(((int) ($row['discount_paise'] ?? 0)) / 100, 2) ?></div>
                            <strong>Payable: ₹<?= number_format(((int) ($row['payable_paise'] ?? 0)) / 100, 2) ?></strong>
                        </td>
                        <td><?= e($row['promo_code'] ?: '-') ?></td>
                        <td><?= e($row['source'] ?: '-') ?></td>
                        <td><?= e(trim(($row['city'] ?: '') . ' ' . ($row['state'] ?: '')) ?: '-') ?></td>
                        <td><?= e($row['registered_at']) ?></td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>
</section>
<?php admin_footer(); ?>
