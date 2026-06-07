<?php
declare(strict_types=1);

require_once __DIR__ . '/includes/public-layout.php';
require_once __DIR__ . '/includes/csrf.php';

$testId = filter_var($_GET['test_id'] ?? $_POST['test_id'] ?? 0, FILTER_VALIDATE_INT) ?: 0;
$rid = trim((string) ($_GET['rid'] ?? $_SESSION['live_test_registration_id'] ?? ''));
$registration = null;
$test = null;
$errors = [];
$accessStatus = null;

if ($rid !== '') {
    $registration = find_registration_by_code($rid);
    if ($registration && $testId > 0 && (int) $registration['test_id'] !== $testId) {
        $registration = null;
        unset($_SESSION['live_test_registration_id']);
        $errors[] = 'This registration does not belong to the selected test.';
    }
}

if (!$registration && $testId > 0) {
    $stmt = db()->prepare('SELECT * FROM tests WHERE id = ? LIMIT 1');
    $stmt->execute([$testId]);
    $test = $stmt->fetch() ?: null;
    if ($test && $test['status'] === 'live') {
        $accessStatus = pre_test_login_status($test);
    }
}

if (is_post() && !$registration) {
    verify_csrf();
    $identifier = input_string('identifier', 190);
    if ($testId <= 0) {
        $errors[] = 'Please select a valid live test.';
    } elseif ($identifier === '') {
        $errors[] = 'Enter your registration ID or registered mobile number.';
    } elseif (!$test || $test['status'] !== 'live') {
        $errors[] = 'This test is not live right now.';
    } elseif ($accessStatus && !$accessStatus['allowed']) {
        $errors[] = $accessStatus['message'];
    } else {
        $registration = find_registration_for_test_identifier($testId, $identifier);
        if (!$registration) {
            $errors[] = 'No registered user found for this test with the provided details.';
        }
    }
}

if ($registration) {
    $_SESSION['live_test_registration_id'] = $registration['registration_id'];
    $testId = (int) $registration['test_id'];

    if (in_array($registration['status'], ['closed', 'result_published', 'archived'], true)) {
        redirect('closed.php?test_id=' . $testId);
    }

    if ($registration['status'] === 'live') {
        $accessStatus = pre_test_login_status($registration);
        if (!$accessStatus['allowed']) {
            public_header('Live Test Access');
            ?>
            <section class="panel start-panel">
                <p class="eyebrow">Live Test Access</p>
                <h1><?= e($registration['title']) ?></h1>
                <div class="alert alert-warning"><?= e($accessStatus['message']) ?></div>
                <?php if ($accessStatus['reason'] === 'too_early'): ?>
                    <p class="muted">Verification opens 10 minutes before the official server start time: <?= e(test_start_datetime($registration)->format('d M Y, h:i A')) ?>.</p>
                <?php else: ?>
                    <p class="muted">Test time is over. You can check result after admin publishes it.</p>
                <?php endif; ?>
                <div class="form-actions">
                    <a class="btn btn-primary" href="index.php">Back to Live Tests</a>
                </div>
            </section>
            <?php
            public_footer();
            exit;
        }
    }

    $sectionsStmt = db()->prepare('SELECT section_name, question_count, duration_minutes FROM test_sections WHERE test_id = ? ORDER BY section_order ASC');
    $sectionsStmt->execute([$testId]);
    $sections = $sectionsStmt->fetchAll();

    public_header('Instructions');
    ?>
    <section class="panel">
        <p class="eyebrow">Read Carefully</p>
        <h1><?= e($registration['title']) ?> Instructions</h1>
        <div class="stat-grid">
            <article class="stat-card"><span>Total Questions</span><strong>100</strong></article>
            <article class="stat-card"><span>Total Duration</span><strong>60 min</strong></article>
            <article class="stat-card"><span>Marking</span><strong>+1 / -0.25</strong></article>
        </div>
    </section>

    <section class="panel">
        <h2>Sectional Timer</h2>
        <div class="section-grid">
            <?php foreach ($sections as $section): ?>
                <article class="section-card">
                    <h3><?= e($section['section_name']) ?></h3>
                    <span><?= (int) $section['question_count'] ?> questions</span>
                    <strong><?= (int) $section['duration_minutes'] ?> minutes</strong>
                </article>
            <?php endforeach; ?>
        </div>
    </section>

    <section class="panel">
        <h2>Important Rules</h2>
        <div class="rule-grid">
            <article><strong>+1</strong><span>Correct answer</span></article>
            <article><strong>-0.25</strong><span>Wrong answer</span></article>
            <article><strong>0</strong><span>Not attempted</span></article>
            <article><strong>No pause</strong><span>Timer continues until auto-submit.</span></article>
            <article><strong>Auto-submit</strong><span>The test submits when final section time ends.</span></article>
            <article><strong>Anti-cheat</strong><span>Tab/app switch can affect leaderboard eligibility.</span></article>
        </div>
        <ul class="instruction-list">
            <li>Leaderboard eligibility will depend on clean conduct and anti-cheat rules.</li>
            <li>Complete report download will be available only after result publication.</li>
        </ul>
        <div class="bilingual-instructions">
            <article>
                <h3>Important Instructions</h3>
                <ul>
                    <li>You can verify and read instructions up to 10 minutes before the test starts.</li>
                    <li>The test screen will open only when the official server time reaches the test start time.</li>
                    <li>Do not switch tabs, apps, or windows after the test starts.</li>
                    <li>Tab/app switching during the test may affect your leaderboard eligibility.</li>
                    <li>Keep your screen active and disable auto sleep/auto lock before starting the test.</li>
                    <li>Do not refresh the page unnecessarily during the test.</li>
                    <li>The timer will not pause.</li>
                    <li>The test will auto-submit when the final section time ends.</li>
                    <li>Use a stable internet connection.</li>
                </ul>
            </article>
            <article>
                <h3>महत्वपूर्ण निर्देश</h3>
                <ul>
                    <li>आप टेस्ट शुरू होने से 10 मिनट पहले लॉगिन करके निर्देश पढ़ सकते हैं।</li>
                    <li>टेस्ट स्क्रीन केवल आधिकारिक सर्वर समय पर टेस्ट शुरू होने के बाद ही खुलेगी।</li>
                    <li>टेस्ट शुरू होने के बाद टैब, ऐप या विंडो स्विच न करें।</li>
                    <li>टेस्ट के दौरान टैब/ऐप स्विच करने से आपकी leaderboard eligibility प्रभावित हो सकती है।</li>
                    <li>टेस्ट शुरू करने से पहले अपनी स्क्रीन को active रखें और auto sleep/auto lock बंद कर दें।</li>
                    <li>टेस्ट के दौरान अनावश्यक रूप से पेज refresh न करें।</li>
                    <li>Timer pause नहीं होगा।</li>
                    <li>Final section time खत्म होने पर test auto-submit हो जाएगा।</li>
                    <li>Stable internet connection का उपयोग करें।</li>
                </ul>
            </article>
        </div>
        <form method="post" action="start.php" class="form-grid">
            <?= csrf_field() ?>
            <input type="hidden" name="rid" value="<?= e($registration['registration_id']) ?>">
            <label class="check-row full">
                <input type="checkbox" name="accepted" value="1" required>
                I have read and understood all instructions.
            </label>
            <div class="form-actions">
                <?php if ($registration['status'] === 'live'): ?>
                    <button class="btn btn-primary" type="submit">Continue to Start</button>
                <?php else: ?>
                    <button class="btn btn-disabled" type="button">Start opens when test is live</button>
                <?php endif; ?>
                <a class="btn btn-light" href="registration-success.php?rid=<?= e(urlencode($registration['registration_id'])) ?>">Back</a>
            </div>
        </form>
    </section>
    <?php
    public_footer();
    exit;
}

public_header('Verify Registration');
?>
<section class="panel start-panel">
    <p class="eyebrow">Live Test Access</p>
    <?php if ($test): ?>
        <h1><?= e($test['title']) ?></h1>
        <?php if ($test['status'] !== 'live'): ?>
            <div class="alert alert-warning">This test is currently <?= e(public_test_status_label($test['status'])) ?>.</div>
        <?php elseif ($accessStatus && !$accessStatus['allowed']): ?>
            <div class="alert alert-warning"><?= e($accessStatus['message']) ?></div>
        <?php endif; ?>
        <p class="muted">
            <?php if ($accessStatus && $accessStatus['reason'] === 'too_early'): ?>
                Verification opens 10 minutes before the official start time: <?= e(test_start_datetime($test)->format('d M Y, h:i A')) ?>.
            <?php elseif ($accessStatus && $accessStatus['reason'] === 'ended'): ?>
                Test time is over. You can check result after admin publishes it.
            <?php else: ?>
                Enter your registration ID or registered mobile number to view instructions and start the live test.
            <?php endif; ?>
        </p>
    <?php else: ?>
        <h1>Choose a Live Test</h1>
        <p class="muted">Open a live test from the test list, then verify your registration to continue.</p>
    <?php endif; ?>

    <?php foreach ($errors as $error): ?>
        <div class="alert alert-danger"><?= e($error) ?></div>
    <?php endforeach; ?>

    <?php if ($test && $test['status'] === 'live' && (!$accessStatus || $accessStatus['allowed'])): ?>
        <form method="post" class="form-grid">
            <?= csrf_field() ?>
            <input type="hidden" name="test_id" value="<?= (int) $test['id'] ?>">
            <label class="full">Registration ID or Registered Mobile
                <input type="text" name="identifier" value="<?= e($_POST['identifier'] ?? '') ?>" required maxlength="190" autocomplete="off">
            </label>
            <div class="form-actions">
                <button class="btn btn-primary" type="submit">View Instructions</button>
                <a class="btn btn-light" href="index.php">Back to Live Tests</a>
            </div>
        </form>
    <?php else: ?>
        <div class="form-actions">
            <a class="btn btn-primary" href="index.php">Back to Live Tests</a>
            <?php if ($test): ?><a class="btn btn-light" href="closed.php?test_id=<?= (int) $test['id'] ?>">View Status</a><?php endif; ?>
        </div>
    <?php endif; ?>
</section>
<?php public_footer(); ?>
