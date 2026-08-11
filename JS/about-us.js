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

function initTeamCarousel() {
    const carousel = document.querySelector('[data-team-carousel]');
    const track = document.getElementById('teamTrack');
    const dots = document.getElementById('teamDots');
    const status = document.getElementById('teamCarouselStatus');
    const prev = carousel?.querySelector('[data-carousel-prev]');
    const next = carousel?.querySelector('[data-carousel-next]');

    if (!carousel || !track || !dots) return;

    const cards = Array.from(track.querySelectorAll('.team-card'));
    if (!cards.length) return;

    dots.innerHTML = cards.map((_card, index) => (
        `<button class="team-dot${index === 0 ? ' is-active' : ''}" type="button" data-team-dot="${index}" aria-label="Show team member ${index + 1}"></button>`
    )).join('');

    function getActiveIndex() {
        const left = track.scrollLeft;
        return cards.reduce((bestIndex, card, index) => {
            const bestDistance = Math.abs(cards[bestIndex].offsetLeft - left);
            const distance = Math.abs(card.offsetLeft - left);
            return distance < bestDistance ? index : bestIndex;
        }, 0);
    }

    function updateState() {
        const active = getActiveIndex();
        dots.querySelectorAll('.team-dot').forEach((dot, index) => {
            dot.classList.toggle('is-active', index === active);
            dot.setAttribute('aria-current', index === active ? 'true' : 'false');
        });
        if (status) status.textContent = `${active + 1} / ${cards.length}`;
    }

    function scrollToCard(index) {
        const safeIndex = Math.min(Math.max(index, 0), cards.length - 1);
        track.scrollTo({ left: cards[safeIndex].offsetLeft, behavior: 'smooth' });
    }

    prev?.addEventListener('click', () => scrollToCard(getActiveIndex() - 1));
    next?.addEventListener('click', () => scrollToCard(getActiveIndex() + 1));
    dots.addEventListener('click', (event) => {
        const dot = event.target.closest('[data-team-dot]');
        if (!dot) return;
        scrollToCard(Number(dot.dataset.teamDot));
    });
    track.addEventListener('scroll', () => window.requestAnimationFrame(updateState), { passive: true });
    track.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft') scrollToCard(getActiveIndex() - 1);
        if (event.key === 'ArrowRight') scrollToCard(getActiveIndex() + 1);
    });
    window.addEventListener('resize', updateState, { passive: true });
    updateState();
}

function initAboutPage() {
    initTeamCarousel();

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
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAboutPage, { once: true });
} else {
    initAboutPage();
}
