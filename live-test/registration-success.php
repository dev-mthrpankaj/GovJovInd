<?php
declare(strict_types=1);

require_once __DIR__ . '/includes/public-layout.php';
require_once __DIR__ . '/includes/promo.php';

$rid = input_string('rid', 60);
if ($rid === '') {
    $rid = (string) ($_GET['rid'] ?? $_SESSION['live_test_registration_id'] ?? '');
}
$registration = find_registration_by_code($rid);

if (!$registration) {
    redirect('index.php');
}

$_SESSION['live_test_registration_id'] = $registration['registration_id'];

$promoCode = '-';
if (!empty($registration['promo_code_id'])) {
    $promoStmt = db()->prepare('SELECT code FROM promo_codes WHERE id = ? LIMIT 1');
    $promoStmt->execute([(int) $registration['promo_code_id']]);
    $promoCode = (string) ($promoStmt->fetchColumn() ?: '-');
}

$payment = null;
if (!empty($registration['payment_id'])) {
    $paymentStmt = db()->prepare('SELECT razorpay_payment_id, razorpay_order_id, status, verified_at FROM payments WHERE id = ? LIMIT 1');
    $paymentStmt->execute([(int) $registration['payment_id']]);
    $payment = $paymentStmt->fetch() ?: null;
}

$paymentStatus = (string) ($registration['payment_status'] ?? 'not_required');
$paymentLabel = match ($paymentStatus) {
    'free_promo' => 'Free Promo',
    'paid' => 'Paid',
    'waived' => 'Waived / Admin Import',
    'pending' => 'Pending Payment',
    'failed' => 'Payment Failed',
    default => ((int) ($registration['is_free'] ?? 0) === 1 ? 'Free Test' : format_status($paymentStatus)),
};

$amountPaise = (int) ($registration['amount_paise'] ?? 0);
$discountPaise = (int) ($registration['discount_paise'] ?? 0);
$payablePaise = (int) ($registration['payable_paise'] ?? 0);

public_header('Registration Successful');
?>
<section class="panel success-panel">
    <div class="alert alert-success">Registration completed successfully.</div>
    <p class="eyebrow">Registration Confirmed</p>
    <h1><?= e($registration['title']) ?></h1>
    <p class="muted">Please save your Registration ID safely. You will need this Registration ID or your registered mobile number to login for the test.</p>

    <div class="registration-id-card">
        <span>Your Registration ID</span>
        <strong id="registrationIdText"><?= e($registration['registration_id']) ?></strong>
        <button class="btn btn-light" type="button" id="copyRegistrationId">Copy Registration ID</button>
    </div>

    <div class="detail-list">
        <div><strong>Candidate</strong><span><?= e($registration['name']) ?></span></div>
        <div><strong>Registration ID</strong><span><?= e($registration['registration_id']) ?></span></div>
        <div><strong>Mobile</strong><span><?= e($registration['mobile']) ?></span></div>
        <div><strong>Test Date</strong><span><?= e($registration['test_date']) ?></span></div>
        <div><strong>Start Time</strong><span><?= e(substr($registration['start_time'], 0, 5)) ?></span></div>
        <div><strong>Payment Status</strong><span><?= e($paymentLabel) ?></span></div>
        <div><strong>Entry Fee</strong><span><?= e(format_paise_as_rupees($amountPaise)) ?></span></div>
        <div><strong>Discount</strong><span><?= e(format_paise_as_rupees($discountPaise)) ?></span></div>
        <div><strong>Amount Paid / Payable</strong><span><?= e(format_paise_as_rupees($payablePaise)) ?></span></div>
        <div><strong>Promo Code</strong><span><?= e($promoCode) ?></span></div>
        <?php if ($payment && !empty($payment['razorpay_payment_id'])): ?>
            <div><strong>Razorpay Payment ID</strong><span><?= e($payment['razorpay_payment_id']) ?></span></div>
        <?php endif; ?>
    </div>

    <div class="alert alert-info">
        Login opens 10 minutes before the exam. Do not share your Registration ID publicly.
    </div>

    <div class="form-actions">
        <a class="btn btn-primary" href="instructions.php?rid=<?= e(urlencode($registration['registration_id'])) ?>">Read Instructions</a>
        <a class="btn btn-light" href="index.php">Back to Live Test Home</a>
    </div>
</section>
<script>
(() => {
    const button = document.getElementById('copyRegistrationId');
    const text = document.getElementById('registrationIdText');
    if (!button || !text) return;

    button.addEventListener('click', async () => {
        const value = text.textContent.trim();
        try {
            await navigator.clipboard.writeText(value);
            button.textContent = 'Copied!';
            setTimeout(() => button.textContent = 'Copy Registration ID', 1600);
        } catch (error) {
            window.prompt('Copy your Registration ID:', value);
        }
    });
})();
</script>
<?php public_footer(); ?>
