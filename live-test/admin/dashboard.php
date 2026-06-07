<?php
declare(strict_types=1);

require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/_layout.php';

$admin = require_admin();
$stats = [
    'total' => 0,
    'upcoming' => 0,
    'registration_open' => 0,
    'live' => 0,
    'closed' => 0,
    'archived' => 0,
];

$rows = db()->query('SELECT status, COUNT(*) AS total FROM tests GROUP BY status')->fetchAll();
foreach ($rows as $row) {
    $stats[$row['status']] = (int) $row['total'];
    $stats['total'] += (int) $row['total'];
}

admin_header('Dashboard', $admin);
?>
<section class="stat-grid">
    <?php foreach ($stats as $label => $value): ?>
        <article class="stat-card">
            <span><?= e(format_status($label)) ?></span>
            <strong><?= (int) $value ?></strong>
        </article>
    <?php endforeach; ?>
</section>
<section class="panel">
    <div class="panel-header">
        <div>
            <h2>Phase 1 Admin</h2>
            <p>Use this dashboard to create tests and configure section timing.</p>
        </div>
        <a class="btn btn-primary" href="test-create.php">Create Test</a>
    </div>
</section>
<?php admin_footer(); ?>
