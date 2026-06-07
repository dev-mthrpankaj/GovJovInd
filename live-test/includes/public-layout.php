<?php
declare(strict_types=1);

require_once __DIR__ . '/db.php';
require_once __DIR__ . '/functions.php';

function public_header(string $title): void
{
    ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= e($title) ?> | GovJobUpdates Live Test</title>
    <link rel="stylesheet" href="assets/css/live-test.css?v=phase8e-public-link-20260608">
</head>
<body>
    <div class="site-shell">
        <header class="public-header">
            <div class="public-header-inner">
                <a class="brand" href="/live-test/" aria-label="GovJobUpdates Sunday Live Test">
                    <span class="brand-logo">
                        <img src="/Assets/Home%20Page/favicon-96x96.png" alt="GovJobUpdates Logo">
                    </span>
                    <span class="brand-copy">
                        <strong>GovJob<span>Updates</span></strong>
                        <small>Sunday Live Test</small>
                    </span>
                </a>
                <button class="public-menu-toggle" type="button" aria-label="Open navigation menu" aria-expanded="false" aria-controls="liveTestNav">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </button>
                <nav id="liveTestNav" class="public-nav" aria-label="Live test navigation">
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/live-test/">Live Test</a></li>
                        <li><a href="/live-test/result.php">Result</a></li>
                        <li><a href="/live-test/leaderboard.php">Leaderboard</a></li>
                    </ul>
                </nav>
            </div>
        </header>
        <main class="public-main">
    <?php
}

function public_footer(): void
{
    ?>
        </main>
        <footer class="public-footer">
            <div class="public-footer-content">
                <section class="public-footer-section">
                    <h3>GovJobUpdates</h3>
                    <p>Sunday Live Test is a timed exam-mode practice module for government exam aspirants. Always verify official recruitment details from the original source.</p>
                </section>
                <section class="public-footer-section">
                    <h3>Live Test</h3>
                    <ul>
                        <li><a href="/live-test/">Test Status</a></li>
                        <li><a href="/live-test/result.php">Check Result</a></li>
                        <li><a href="/live-test/leaderboard.php">Leaderboard</a></li>
                    </ul>
                </section>
                <section class="public-footer-section">
                    <h3>Main Site</h3>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/HTML/latest-jobs.html">Latest Jobs</a></li>
                        <li><a href="/HTML/quiz.html">Quiz Practice</a></li>
                    </ul>
                </section>
            </div>
            <div class="public-copyright">
                &copy; 2026 GovJobUpdates. Sunday Live Test | 100 Questions | 60 Minutes | Sectional Timer
            </div>
        </footer>
    </div>
    <script>
    (() => {
        const toggle = document.querySelector('.public-menu-toggle');
        const nav = document.getElementById('liveTestNav');
        if (!toggle || !nav) return;

        const setOpen = (open) => {
            nav.classList.toggle('is-open', open);
            toggle.classList.toggle('is-open', open);
            toggle.setAttribute('aria-expanded', String(open));
            toggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
            document.documentElement.classList.toggle('live-test-nav-open', open);
            document.body.classList.toggle('live-test-nav-open', open);
        };

        toggle.addEventListener('click', () => setOpen(!nav.classList.contains('is-open')));
        nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setOpen(false)));
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') setOpen(false);
        });
        document.addEventListener('click', (event) => {
            if (!nav.classList.contains('is-open')) return;
            if (nav.contains(event.target) || toggle.contains(event.target)) return;
            setOpen(false);
        });
    })();
    </script>
</body>
</html>
    <?php
}
