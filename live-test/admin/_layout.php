<?php
declare(strict_types=1);

function admin_header(string $title, array $admin): void
{
    $flash = flash_get();
    ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= e($title) ?> | Live Test Admin</title>
    <link rel="stylesheet" href="../assets/css/admin.css">
</head>
<body>
    <div class="admin-shell">
        <aside class="admin-sidebar">
            <a class="brand" href="dashboard.php">GovJob Live Test</a>
            <nav class="admin-nav" aria-label="Admin navigation">
                <a href="dashboard.php">Dashboard</a>
                <a href="tests.php">Tests</a>
                <a href="questions.php">Questions</a>
                <a href="question-import.php">CSV Import</a>
                <a href="test-create.php">Create Test</a>
                <a href="registrations.php">Registrations</a>
                <a href="payments.php">Payments</a>
                <a href="attempts.php">Attempts</a>
                <a href="registration-import.php">Import Registrations</a>
                <a href="violations.php">Violations</a>
                <a href="suspicious-users.php">Suspicious Users</a>
                <a href="results.php">Results</a>
                <a href="archive.php">Archive</a>
                <a href="backup.php">Backups</a>
                <a href="logout.php">Logout</a>
            </nav>
        </aside>
        <main class="admin-main">
            <header class="admin-topbar">
                <div>
                    <p class="eyebrow">Sunday Live Test</p>
                    <h1><?= e($title) ?></h1>
                </div>
                <div class="admin-user"><?= e($admin['name']) ?></div>
            </header>
            <?php foreach ($flash as $type => $message): ?>
                <div class="alert alert-<?= e($type) ?>"><?= e($message) ?></div>
            <?php endforeach; ?>
    <?php
}

function admin_footer(): void
{
    ?>
        </main>
    </div>
</body>
</html>
    <?php
}
