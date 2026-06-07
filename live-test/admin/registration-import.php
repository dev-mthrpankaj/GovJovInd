<?php
declare(strict_types=1);

require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../includes/csrf.php';
require_once __DIR__ . '/_layout.php';

$admin = require_admin();
$pdo = db();
$tests = $pdo->query('SELECT id, title, slug, test_date, start_time, registration_limit, status FROM tests ORDER BY test_date DESC, start_time DESC')->fetchAll();
$selectedTestId = filter_var($_GET['test_id'] ?? $_POST['test_id'] ?? ($tests[0]['id'] ?? 0), FILTER_VALIDATE_INT) ?: 0;
$summary = null;
$errors = [];
$recentImports = [];

$expectedHeaders = ['name', 'mobile', 'email', 'category', 'city', 'state', 'registration_id'];

function registration_import_test(int $testId): ?array
{
    $stmt = db()->prepare('SELECT * FROM tests WHERE id = ? LIMIT 1');
    $stmt->execute([$testId]);
    $test = $stmt->fetch();
    return $test ?: null;
}

function registration_id_exists(PDO $pdo, string $registrationId): bool
{
    $stmt = $pdo->prepare('SELECT id FROM test_registrations WHERE registration_id = ? LIMIT 1');
    $stmt->execute([$registrationId]);
    return (bool) $stmt->fetch();
}

function unique_registration_id(PDO $pdo, ?string $requestedId = null): string
{
    $requestedId = strtoupper(trim((string) $requestedId));
    if ($requestedId !== '' && !registration_id_exists($pdo, $requestedId)) {
        return $requestedId;
    }

    do {
        $registrationId = generate_registration_id();
    } while (registration_id_exists($pdo, $registrationId));

    return $registrationId;
}

if (is_post()) {
    verify_csrf();
    $test = registration_import_test($selectedTestId);
    $summary = [
        'total_rows' => 0,
        'imported' => 0,
        'skipped_duplicates' => 0,
        'skipped_seat_limit' => 0,
        'errors' => [],
    ];

    if (!$test) {
        $errors[] = 'Select a valid test.';
    }
    if (empty($_FILES['csv_file']['tmp_name']) || !is_uploaded_file($_FILES['csv_file']['tmp_name'])) {
        $errors[] = 'Upload a CSV file.';
    }

    if (!$errors) {
        $availableSeats = seats_remaining($test);
        $handle = fopen($_FILES['csv_file']['tmp_name'], 'r');
        if (!$handle) {
            $errors[] = 'Could not read uploaded CSV.';
        } else {
            $headers = fgetcsv($handle);
            if (!$headers || array_map('trim', $headers) !== $expectedHeaders) {
                $errors[] = 'CSV headers do not match: ' . implode(',', $expectedHeaders);
            } else {
                $lineNumber = 1;
                while (($data = fgetcsv($handle)) !== false) {
                    $lineNumber++;
                    if (count($data) === 1 && trim((string) $data[0]) === '') {
                        continue;
                    }

                    $summary['total_rows']++;

                    if (count($data) !== count($expectedHeaders)) {
                        $summary['errors'][] = 'Row ' . $lineNumber . ': column count does not match headers.';
                        continue;
                    }

                    if ($availableSeats <= 0) {
                        $summary['skipped_seat_limit']++;
                        continue;
                    }

                    $row = array_combine($expectedHeaders, array_map('trim', $data));
                    $name = substr((string) $row['name'], 0, 150);
                    $mobile = preg_replace('/\D+/', '', (string) $row['mobile']);
                    $emailRaw = substr((string) $row['email'], 0, 190);
                    $email = $emailRaw !== '' ? filter_var($emailRaw, FILTER_VALIDATE_EMAIL) : null;
                    $category = substr((string) $row['category'], 0, 60) ?: null;
                    $city = substr((string) $row['city'], 0, 120) ?: null;
                    $state = substr((string) $row['state'], 0, 120) ?: null;
                    $requestedRegistrationId = substr((string) $row['registration_id'], 0, 40);

                    if ($name === '' || strlen($name) < 2) {
                        $summary['errors'][] = 'Row ' . $lineNumber . ': name is required.';
                        continue;
                    }
                    if (!preg_match('/^[0-9]{10,15}$/', $mobile)) {
                        $summary['errors'][] = 'Row ' . $lineNumber . ': valid mobile is required.';
                        continue;
                    }
                    if ($emailRaw !== '' && !$email) {
                        $summary['errors'][] = 'Row ' . $lineNumber . ': email is invalid.';
                        continue;
                    }

                    $duplicateSql = 'SELECT r.registration_id FROM test_registrations r INNER JOIN users u ON u.id = r.user_id WHERE r.test_id = ? AND r.status = "registered" AND (u.mobile = ?';
                    $duplicateParams = [$selectedTestId, $mobile];
                    if ($email) {
                        $duplicateSql .= ' OR u.email = ?';
                        $duplicateParams[] = $email;
                    }
                    $duplicateSql .= ') LIMIT 1';
                    $duplicate = $pdo->prepare($duplicateSql);
                    $duplicate->execute($duplicateParams);
                    if ($duplicate->fetch()) {
                        $summary['skipped_duplicates']++;
                        continue;
                    }

                    $pdo->beginTransaction();
                    try {
                        $lock = $pdo->prepare('SELECT * FROM tests WHERE id = ? FOR UPDATE');
                        $lock->execute([$selectedTestId]);
                        $lockedTest = $lock->fetch();
                        $availableSeats = $lockedTest ? seats_remaining($lockedTest) : 0;
                        if ($availableSeats <= 0) {
                            $pdo->rollBack();
                            $summary['skipped_seat_limit']++;
                            continue;
                        }

                        $userStmt = $pdo->prepare('SELECT * FROM users WHERE mobile = ? LIMIT 1');
                        $userStmt->execute([$mobile]);
                        $user = $userStmt->fetch();

                        if (!$user && $email) {
                            $emailUserStmt = $pdo->prepare('SELECT * FROM users WHERE email = ? LIMIT 1');
                            $emailUserStmt->execute([$email]);
                            if ($emailUserStmt->fetch()) {
                                throw new RuntimeException('email is already linked with another mobile number.');
                            }
                        }

                        if ($user && $email && !empty($user['email']) && $user['email'] !== $email) {
                            throw new RuntimeException('mobile is already linked with another email address.');
                        }

                        if ($user) {
                            $userId = (int) $user['id'];
                            $updateUser = $pdo->prepare('UPDATE users SET name = ?, email = COALESCE(?, email), category = ?, city = ?, state = ? WHERE id = ?');
                            $updateUser->execute([$name, $email, $category, $city, $state, $userId]);
                        } else {
                            $insertUser = $pdo->prepare('INSERT INTO users (name, mobile, email, category, city, state) VALUES (?, ?, ?, ?, ?, ?)');
                            $insertUser->execute([$name, $mobile, $email, $category, $city, $state]);
                            $userId = (int) $pdo->lastInsertId();
                        }

                        $registrationId = unique_registration_id($pdo, $requestedRegistrationId);
                        $insertRegistration = $pdo->prepare(
                            'INSERT INTO test_registrations
                                (test_id, user_id, registration_id, status, payment_status, amount_paise, discount_paise, payable_paise, source)
                             VALUES
                                (?, ?, ?, "registered", "waived", 0, 0, 0, "admin_import")'
                        );
                        $insertRegistration->execute([$selectedTestId, $userId, $registrationId]);

                        $pdo->commit();
                        $summary['imported']++;
                        $availableSeats--;
                    } catch (Throwable $exception) {
                        if ($pdo->inTransaction()) {
                            $pdo->rollBack();
                        }
                        $summary['errors'][] = 'Row ' . $lineNumber . ': ' . ($exception instanceof RuntimeException ? $exception->getMessage() : 'could not import row.');
                    }
                }
            }
            fclose($handle);
        }
    }
}

$selectedTest = registration_import_test($selectedTestId);
$availableSeats = $selectedTest ? seats_remaining($selectedTest) : 0;

if ($selectedTest) {
    $recentStmt = $pdo->prepare(
        'SELECT r.registration_id, r.registered_at, r.payment_status, r.source, u.name, u.mobile, u.email
         FROM test_registrations r
         INNER JOIN users u ON u.id = r.user_id
         WHERE r.test_id = ? AND r.status = "registered"
         ORDER BY r.id DESC
         LIMIT 20'
    );
    $recentStmt->execute([$selectedTestId]);
    $recentImports = $recentStmt->fetchAll();
}

admin_header('Import Registrations', $admin);
?>
<section class="panel narrow-panel">
    <div class="panel-header">
        <div>
            <h2>Registration CSV Import</h2>
            <p>Upload Google Form or Google Sheet registrations before the Sunday live test.</p>
        </div>
        <a class="btn btn-light" href="../database/sample-registrations.csv">Sample CSV</a>
    </div>
    <?php foreach ($errors as $error): ?>
        <div class="alert alert-danger"><?= e($error) ?></div>
    <?php endforeach; ?>
    <?php if ($summary): ?>
        <div class="stat-grid">
            <article class="stat-card"><span>Total Rows</span><strong><?= (int) $summary['total_rows'] ?></strong></article>
            <article class="stat-card"><span>Imported</span><strong><?= (int) $summary['imported'] ?></strong></article>
            <article class="stat-card"><span>Duplicates</span><strong><?= (int) $summary['skipped_duplicates'] ?></strong></article>
            <article class="stat-card"><span>Seat Limit</span><strong><?= (int) $summary['skipped_seat_limit'] ?></strong></article>
        </div>
        <?php foreach ($summary['errors'] as $error): ?>
            <div class="alert alert-danger"><?= e($error) ?></div>
        <?php endforeach; ?>
    <?php endif; ?>
    <form method="post" enctype="multipart/form-data" class="form-stack">
        <?= csrf_field() ?>
        <label>Test
            <select name="test_id" onchange="window.location='registration-import.php?test_id=' + this.value" required>
                <?php foreach ($tests as $test): ?>
                    <option value="<?= (int) $test['id'] ?>" <?= (int) $test['id'] === (int) $selectedTestId ? 'selected' : '' ?>><?= e($test['title']) ?> (<?= e($test['slug']) ?>)</option>
                <?php endforeach; ?>
            </select>
        </label>
        <?php if ($selectedTest): ?>
            <div class="alert alert-info">
                Available seats: <?= (int) $availableSeats ?>/<?= (int) $selectedTest['registration_limit'] ?>.
            </div>
        <?php endif; ?>
        <label>Registration CSV
            <input type="file" name="csv_file" accept=".csv,text/csv" required>
        </label>
        <div class="panel sample-panel">
            <h3>Required CSV headers</h3>
            <p class="muted">name,mobile,email,category,city,state,registration_id</p>
            <p class="muted">Registration ID can be blank; the system will generate one.</p>
        </div>
        <div class="form-actions">
            <button class="btn btn-primary" type="submit">Import Registrations</button>
            <a class="btn btn-light" href="tests.php">Back to Tests</a>
        </div>
    </form>
</section>

<section class="panel">
    <h2>Latest Registered Students</h2>
    <div class="table-wrap">
        <table>
            <thead>
                <tr>
                    <th>Registration ID</th>
                    <th>Name</th>
                    <th>Mobile</th>
                    <th>Email</th>
                    <th>Payment</th>
                    <th>Source</th>
                    <th>Registered At</th>
                </tr>
            </thead>
            <tbody>
                <?php if (!$recentImports): ?>
                    <tr><td colspan="7" class="empty-cell">No registrations found for this test.</td></tr>
                <?php endif; ?>
                <?php foreach ($recentImports as $row): ?>
                    <tr>
                        <td><?= e($row['registration_id']) ?></td>
                        <td><?= e($row['name']) ?></td>
                        <td><?= e($row['mobile']) ?></td>
                        <td><?= e($row['email'] ?: '-') ?></td>
                        <td><?= e(format_status((string) ($row['payment_status'] ?? 'waived'))) ?></td>
                        <td><?= e($row['source'] ?: 'admin_import') ?></td>
                        <td><?= e($row['registered_at']) ?></td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>
</section>
<?php admin_footer(); ?>
