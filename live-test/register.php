<?php
declare(strict_types=1);

require_once __DIR__ . '/includes/public-layout.php';
require_once __DIR__ . '/includes/csrf.php';
require_once __DIR__ . '/includes/promo.php';
require_once __DIR__ . '/includes/payment.php';

$testId = filter_var($_GET['test_id'] ?? $_POST['test_id'] ?? 0, FILTER_VALIDATE_INT) ?: 0;
$stmt = db()->prepare('SELECT * FROM tests WHERE id = ? LIMIT 1');
$stmt->execute([$testId]);
$test = $stmt->fetch();
$errors = [];

if (!$test) {
    public_header('Test Not Found');
    echo '<section class="panel"><h1>Test not found</h1><p class="muted">Please open a valid live test.</p><a class="btn btn-primary" href="index.php">Back to Tests</a></section>';
    public_footer();
    exit;
}

$filled = active_registration_count((int) $test['id']);
$limit = (int) $test['registration_limit'];
$window = registration_window_status($test);

if ($test['status'] !== 'registration_open' || !$window['allowed']) {
    redirect('closed.php?test_id=' . (int) $test['id']);
}

$baseFeePaise = (int) ($test['fee_amount_paise'] ?? 500);
$isFreeTest = (int) ($test['is_free'] ?? 0) === 1;
$enteredPromoCode = normalize_promo_code((string) ($_POST['promo_code'] ?? ''));
$previewAmountPaise = $isFreeTest ? 0 : max(0, $baseFeePaise);
$previewDiscountPaise = 0;
$previewPayablePaise = $previewAmountPaise;
$previewPromoMessage = $isFreeTest
    ? 'This test is currently free. No promo code is required.'
    : 'Use promo code GJUFREE for 100% discount while the offer is active.';
$previewPromoValid = false;
$previewPromoCode = null;

if (!$isFreeTest && $enteredPromoCode !== '') {
    $previewPromoResult = get_active_promo_code(db(), $enteredPromoCode, new DateTimeImmutable('now'));
    if ($previewPromoResult['valid']) {
        $previewPromoCode = $previewPromoResult['promo'];
        $previewDiscountPaise = calculate_discount_paise($previewAmountPaise, $previewPromoCode);
        $previewPayablePaise = calculate_payable_paise($previewAmountPaise, $previewDiscountPaise);
        $previewPromoMessage = $previewPromoResult['message'];
        $previewPromoValid = true;
    } else {
        $previewPromoMessage = $previewPromoResult['message'];
    }
}

if (is_post()) {
    verify_csrf();

    $candidate = payment_candidate_from_post();
    $errors = payment_validate_candidate($candidate);

    if (!$errors) {
        $pdo = db();
        $pdo->beginTransaction();
        try {
            $lock = $pdo->prepare('SELECT * FROM tests WHERE id = ? FOR UPDATE');
            $lock->execute([(int) $test['id']]);
            $lockedTest = $lock->fetch();

            $lockedWindow = $lockedTest ? registration_window_status($lockedTest) : ['allowed' => false, 'message' => 'Registration is closed.'];
            if (!$lockedTest || $lockedTest['status'] !== 'registration_open' || !$lockedWindow['allowed']) {
                throw new RuntimeException($lockedWindow['message'] ?? 'Registration is closed.');
            }

            $fee = payment_calculate_fee($pdo, $lockedTest, (string) $candidate['promo_code']);
            if ((int) $fee['payable_paise'] > 0) {
                throw new RuntimeException('Payment is required for this test. Please keep JavaScript enabled and pay securely with Razorpay.');
            }

            $registrationId = payment_create_confirmed_registration($pdo, $lockedTest, $candidate, $fee);

            $pdo->commit();
            $_SESSION['live_test_registration_id'] = $registrationId;
            redirect('registration-success.php?rid=' . urlencode($registrationId));
        } catch (Throwable $exception) {
            if ($pdo->inTransaction()) {
                $pdo->rollBack();
            }
            $errors[] = $exception instanceof RuntimeException ? $exception->getMessage() : 'Could not complete registration.';
        }
    }
}

$percent = $limit > 0 ? min(100, (int) round(($filled / $limit) * 100)) : 0;
$razorpayEnabled = !$isFreeTest;
public_header('Register');
?>
<section class="hero">
    <div class="hero-panel">
        <p class="eyebrow">Register for Live Test</p>
        <h1><?= e($test['title']) ?></h1>
        <p><?= e($test['test_date']) ?>, <?= e(substr($test['start_time'], 0, 5)) ?> - <?= e(substr($test['end_time'], 0, 5)) ?></p>
        <div class="seat-meter">
            <strong><?= (int) $filled ?>/<?= (int) $limit ?> seats filled</strong>
            <div class="seat-meter-bar"><span class="seat-meter-fill" style="width: <?= (int) $percent ?>%"></span></div>
        </div>
    </div>
    <div class="hero-panel">
        <?php $windowRange = registration_window_range($test); ?>
        <span class="status-badge">Registration Open</span>
        <p class="muted">Weekly timing: Thursday-Saturday, 12:00 PM to 4:00 PM.</p>
        <p class="muted">Window: <?= e($windowRange['start']->format('d M Y, h:i A')) ?> to <?= e($windowRange['end']->format('d M Y, h:i A')) ?></p>
        <p class="muted">Duplicate registration is blocked by mobile number and email for this test.</p>
        <p class="muted">Promo validity does not override the registration window.</p>
    </div>
</section>
<section class="panel form-panel">
    <?php foreach ($errors as $error): ?>
        <div class="alert alert-danger"><?= e($error) ?></div>
    <?php endforeach; ?>
    <div id="paymentRuntimeMessage" class="payment-runtime-message" hidden></div>
    <div class="form-intro">
        <div>
            <p class="eyebrow">Candidate Details</p>
            <h2>Complete your registration</h2>
            <p class="muted">Use the same mobile number on test day. Required fields are marked by the browser before submission.</p>
        </div>
        <span class="mini-badge"><?= (int) max(0, $limit - $filled) ?> seats available</span>
    </div>
    <form method="post" class="form-grid" id="registrationForm" data-razorpay-enabled="<?= $razorpayEnabled ? '1' : '0' ?>">
        <?= csrf_field() ?>
        <input type="hidden" name="test_id" value="<?= (int) $test['id'] ?>">
        <label>Name
            <input type="text" name="name" value="<?= e($_POST['name'] ?? '') ?>" required maxlength="150">
        </label>
        <label>Mobile Number
            <input type="tel" name="mobile" value="<?= e($_POST['mobile'] ?? '') ?>" required maxlength="20">
        </label>
        <label>Email (optional)
            <input type="email" name="email" value="<?= e($_POST['email'] ?? '') ?>" maxlength="190">
        </label>
        <label>Category (optional)
            <input type="text" name="category" value="<?= e($_POST['category'] ?? '') ?>" maxlength="60">
        </label>
        <label>City (optional)
            <input type="text" name="city" value="<?= e($_POST['city'] ?? '') ?>" maxlength="120">
        </label>
        <label>State (optional)
            <input type="text" name="state" value="<?= e($_POST['state'] ?? '') ?>" maxlength="120">
        </label>

        <div class="payment-summary full">
            <div class="payment-summary-head">
                <div>
                    <p class="eyebrow">Entry Fee</p>
                    <h3>Payment Summary</h3>
                </div>
                <span class="status-badge <?= $previewPayablePaise === 0 ? 'status-live' : '' ?>"><?= $previewPayablePaise === 0 ? 'No Payment Needed' : 'Payment Required' ?></span>
            </div>
            <div class="payment-summary-grid">
                <div><span>Entry Fee</span><strong><?= e(format_paise_as_rupees($previewAmountPaise)) ?></strong></div>
                <div><span>Discount</span><strong><?= e(format_paise_as_rupees($previewDiscountPaise)) ?></strong></div>
                <div><span>Payable</span><strong><?= e(format_paise_as_rupees($previewPayablePaise)) ?></strong></div>
            </div>
            <p class="muted"><?= e($previewPromoMessage) ?></p>
        </div>

        <?php if (!$isFreeTest): ?>
            <label class="full">Promo Code
                <input type="text" name="promo_code" value="<?= e($enteredPromoCode) ?>" maxlength="50" placeholder="Enter promo code e.g. GJUFREE">
                <span class="field-note">Use <strong>GJUFREE</strong> for 100% discount while the offer is active. Without a valid promo code, ₹5 payment will open through Razorpay.</span>
            </label>
        <?php else: ?>
            <div class="alert alert-info full">This test is currently free. You can register without promo code or payment.</div>
        <?php endif; ?>

        <div class="form-actions">
            <button class="btn btn-primary" type="submit" id="registrationSubmitButton">Complete Registration</button>
            <a class="btn btn-light" href="index.php">Back</a>
        </div>
    </form>
</section>
<?php if ($razorpayEnabled): ?>
<script src="https://checkout.razorpay.com/v1/checkout.js"></script>
<script>
(() => {
    const form = document.getElementById('registrationForm');
    const submitButton = document.getElementById('registrationSubmitButton');
    const message = document.getElementById('paymentRuntimeMessage');

    if (!form || form.dataset.razorpayEnabled !== '1') return;

    const showMessage = (text, type = 'info') => {
        if (!message) return;
        message.hidden = false;
        message.className = 'payment-runtime-message alert ' + (type === 'error' ? 'alert-danger' : type === 'success' ? 'alert-success' : 'alert-info');
        message.textContent = text;
        message.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    const setBusy = (busy) => {
        if (!submitButton) return;
        submitButton.disabled = busy;
        submitButton.textContent = busy ? 'Please wait...' : 'Complete Registration';
        form.classList.toggle('payment-processing', busy);
    };

    const postForm = async (url, data) => {
        const response = await fetch(url, {
            method: 'POST',
            body: data,
            credentials: 'same-origin',
            headers: { 'X-Requested-With': 'XMLHttpRequest' }
        });

        const payload = await response.json().catch(() => null);
        if (!payload) {
            throw new Error('Invalid server response.');
        }
        if (!response.ok || payload.success === false) {
            throw new Error(payload.message || 'Request failed.');
        }
        return payload;
    };

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        if (typeof Razorpay === 'undefined') {
            showMessage('Razorpay Checkout could not load. Please check your internet connection and try again.', 'error');
            return;
        }

        setBusy(true);
        try {
            const orderPayload = await postForm('payment-create-order.php', new FormData(form));

            if (orderPayload.redirect_url && orderPayload.requires_payment === false) {
                showMessage('Registration completed. Redirecting...', 'success');
                window.location.href = orderPayload.redirect_url;
                return;
            }

            if (!orderPayload.requires_payment) {
                throw new Error('Unexpected payment response.');
            }

            const options = {
                key: orderPayload.key_id,
                amount: orderPayload.amount,
                currency: orderPayload.currency,
                name: 'GovJobUpdates',
                description: orderPayload.description || 'Sunday Live Test Registration',
                order_id: orderPayload.order_id,
                prefill: {
                    name: orderPayload.candidate_name || form.elements.name.value,
                    contact: orderPayload.candidate_mobile || form.elements.mobile.value,
                    email: form.elements.email.value || ''
                },
                notes: {
                    registration_id: orderPayload.registration_id
                },
                theme: {
                    color: '#2563eb'
                },
                handler: async (response) => {
                    try {
                        const verifyData = new FormData();
                        const csrf = form.querySelector('input[name="csrf_token"]');
                        if (csrf) verifyData.append('csrf_token', csrf.value);
                        verifyData.append('razorpay_payment_id', response.razorpay_payment_id || '');
                        verifyData.append('razorpay_order_id', response.razorpay_order_id || '');
                        verifyData.append('razorpay_signature', response.razorpay_signature || '');
                        verifyData.append('registration_id', orderPayload.registration_id);
                        verifyData.append('payment_row_id', String(orderPayload.payment_row_id));

                        const verifyPayload = await postForm('payment-verify.php', verifyData);
                        showMessage('Payment verified. Redirecting...', 'success');
                        window.location.href = verifyPayload.redirect_url;
                    } catch (error) {
                        setBusy(false);
                        showMessage(error.message || 'Payment verification failed.', 'error');
                    }
                },
                modal: {
                    ondismiss: () => {
                        setBusy(false);
                        showMessage('Payment cancelled. Your registration is not confirmed. You can try again.', 'error');
                    }
                }
            };

            const razorpay = new Razorpay(options);
            razorpay.on('payment.failed', function (response) {
                setBusy(false);
                const reason = response && response.error && response.error.description
                    ? response.error.description
                    : 'Payment failed. Please try again.';
                showMessage(reason, 'error');
            });
            razorpay.open();
        } catch (error) {
            setBusy(false);
            showMessage(error.message || 'Could not start registration payment.', 'error');
        }
    });
})();
</script>
<?php endif; ?>
<?php public_footer(); ?>
