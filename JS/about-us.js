function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('nav ul li a');

    if (!menuToggle || !nav) return;

    function setMenu(open) {
        nav.classList.toggle('active', open);
        menuToggle.setAttribute('aria-expanded', String(open));
        menuToggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
        const icon = menuToggle.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-bars', !open);
            icon.classList.toggle('fa-times', open);
        }
    }

    menuToggle.addEventListener('click', () => {
        setMenu(!nav.classList.contains('active'));
    });

    menuToggle.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            setMenu(false);
        }
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => setMenu(false));
    });
}

function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');

    statNumbers.forEach(stat => {
        const originalText = stat.textContent;
        const hasPlus = originalText.includes('+');
        const target = parseInt(originalText.replace(/[^0-9]/g, ''), 10);

        if (!Number.isFinite(target)) return;

        let current = 0;
        const duration = 1200;
        const step = target / (duration / 16);

        function update() {
            current += step;
            if (current < target) {
                stat.textContent = `${Math.floor(current)}${hasPlus ? '+' : ''}`;
                requestAnimationFrame(update);
                return;
            }
            stat.textContent = `${target}${hasPlus ? '+' : ''}`;
        }

        update();
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();

    const stats = document.querySelector('.trust-stats');
    if (!stats || !('IntersectionObserver' in window)) {
        animateStats();
        return;
    }

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.35 });

    observer.observe(stats);
});
