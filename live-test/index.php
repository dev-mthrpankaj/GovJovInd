<?php
declare(strict_types=1);

require_once __DIR__ . '/includes/public-layout.php';
require_once __DIR__ . '/includes/promo.php';

$stmt = db()->query(
    "SELECT * FROM tests
     WHERE status IN ('upcoming', 'registration_open', 'live', 'closed', 'result_published', 'archived')
     ORDER BY
        CASE status
            WHEN 'registration_open' THEN 1
            WHEN 'live' THEN 2
            WHEN 'upcoming' THEN 3
            WHEN 'closed' THEN 4
            WHEN 'result_published' THEN 5
            ELSE 6
        END,
        test_date ASC,
        start_time ASC"
);
$tests = $stmt->fetchAll();

public_header('Sunday Live Test');
?>
<section class="hero live-test-hero">
    <div class="hero-panel">
        <p class="eyebrow">Register for Upcoming Test</p>
        <h1>Sunday Live Test | 100 Questions | 60 Minutes</h1>
        <p>Practice in real exam mode with sectional timer, bilingual questions, secure login, result report, and leaderboard.</p>
        <p class="muted"><?= e(weekly_registration_window_note()) ?></p>
        <div class="section-pills" aria-label="Live test sections">
            <span>Hindi 20Q - 8 min</span>
            <span>English 20Q - 10 min</span>
            <span>GS/GK 20Q - 8 min</span>
            <span>Maths 20Q - 17 min</span>
            <span>Reasoning 20Q - 17 min</span>
        </div>
    </div>
    <div class="hero-panel live-test-offer-card">
        <span class="status-badge">GJUFREE Promo Active</span>
        <h2>₹5 Entry Fee</h2>
        <p class="muted">Use promo code <strong>GJUFREE</strong> for 100% discount during the launch offer.</p>
        <div class="detail-list">
            <div><strong>Promo Discount</strong><span>100% OFF</span></div>
            <div><strong>Promo Valid Till</strong><span>20 Jun 2026, 11:59 PM</span></div>
            <div><strong>Registration</strong><span>Thu-Sat, 12 PM-4 PM</span></div>
            <div><strong>Seats</strong><span>Limited per test</span></div>
        </div>
    </div>
</section>

<section class="panel upcoming-registration-panel">
    <div class="panel-header">
        <div>
            <p class="eyebrow">Upcoming registration</p>
            <h2>Register for the next available test</h2>
            <p class="muted">After successful registration, save your Registration ID safely. You can also login with your registered mobile number when the test opens.</p>
        </div>
        <span class="mini-badge">Secure Razorpay + Promo Flow</span>
    </div>
</section>

<section class="test-grid" aria-label="Available live tests">
    <?php if (!$tests): ?>
        <article class="test-card">
            <h2>No live test scheduled yet</h2>
            <p class="muted">Please check again later.</p>
        </article>
    <?php endif; ?>
    <?php foreach ($tests as $test): ?>
        <?php
        $filled = active_registration_count((int) $test['id']);
        $limit = (int) $test['registration_limit'];
        $window = registration_window_status($test);
        $percent = $limit > 0 ? min(100, (int) round(($filled / $limit) * 100)) : 0;
        $feePaise = (int) ($test['fee_amount_paise'] ?? 500);
        $isFreeTest = (int) ($test['is_free'] ?? 0) === 1;
        $statusClass = $test['status'] === 'live' ? 'status-live' : (in_array($test['status'], ['closed', 'result_published', 'archived'], true) ? 'status-closed' : '');
        $feeLabel = $isFreeTest ? 'Free Test' : format_paise_as_rupees($feePaise);
        ?>
        <article class="test-card live-test-card">
            <div class="card-head">
                <span class="status-badge <?= e($statusClass) ?>"><?= e(public_test_status_label($test['status'])) ?></span>
                <span class="mini-badge"><?= $limit > 0 ? (int) max(0, $limit - $filled) : 0 ?> seats left</span>
            </div>
            <h2><?= e($test['title']) ?></h2>
            <p class="muted"><?= e($test['test_date']) ?>, <?= e(substr($test['start_time'], 0, 5)) ?> - <?= e(substr($test['end_time'], 0, 5)) ?></p>

            <div class="test-meta-grid" aria-label="Test registration summary">
                <div><span>Entry Fee</span><strong><?= e($feeLabel) ?></strong></div>
                <div><span>Launch Promo</span><strong><?= $isFreeTest ? 'Not needed' : 'GJUFREE' ?></strong></div>
                <div><span>Registration Window</span><strong>12 PM-4 PM</strong></div>
            </div>

            <?php if (!$isFreeTest): ?>
                <div class="promo-strip">
                    <strong>100% OFF:</strong> Apply <code>GJUFREE</code> before 20 Jun 2026, 11:59 PM.
                </div>
            <?php endif; ?>

            <p class="muted">Registration timing: Thursday-Saturday, 12:00 PM to 4:00 PM.</p>
            <div class="seat-meter">
                <strong><?= (int) $filled ?>/<?= (int) $limit ?> seats filled</strong>
                <div class="seat-meter-bar"><span class="seat-meter-fill" style="width: <?= (int) $percent ?>%"></span></div>
            </div>
            <?php if ($test['status'] === 'registration_open' && !$window['allowed']): ?>
                <p class="muted"><?= e($window['message']) ?></p>
            <?php endif; ?>
            <div class="form-actions">
                <?php if ($test['status'] === 'registration_open' && $window['allowed']): ?>
                    <a class="btn btn-primary" href="register.php?test_id=<?= (int) $test['id'] ?>">Register for Upcoming Test</a>
                <?php elseif ($test['status'] === 'live'): ?>
                    <a class="btn btn-primary" href="instructions.php?test_id=<?= (int) $test['id'] ?>">View Instructions</a>
                    <a class="btn btn-light" href="instructions.php?test_id=<?= (int) $test['id'] ?>">Start Live Test</a>
                <?php elseif ($test['status'] === 'registration_open'): ?>
                    <a class="btn btn-disabled" href="closed.php?test_id=<?= (int) $test['id'] ?>">Registration Closed Today</a>
                <?php elseif ($test['status'] === 'result_published'): ?>
                    <a class="btn btn-primary" href="result.php">Check Result</a>
                    <a class="btn btn-light" href="leaderboard.php?test_id=<?= (int) $test['id'] ?>">View Leaderboard</a>
                <?php elseif ($test['status'] === 'archived' && !empty($test['result_visible'])): ?>
                    <a class="btn btn-primary" href="result.php">Check Result</a>
                    <a class="btn btn-light" href="leaderboard.php?test_id=<?= (int) $test['id'] ?>">View Leaderboard</a>
                <?php elseif (in_array($test['status'], ['closed', 'archived'], true)): ?>
                    <a class="btn btn-light" href="closed.php?test_id=<?= (int) $test['id'] ?>">View Status</a>
                <?php else: ?>
                    <a class="btn btn-disabled" href="closed.php?test_id=<?= (int) $test['id'] ?>">Upcoming</a>
                <?php endif; ?>
            </div>
        </article>
    <?php endforeach; ?>
</section>
<?php public_footer(); ?>
