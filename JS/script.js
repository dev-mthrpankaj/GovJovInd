(() => {
const markPageLoaded = () => document.body.classList.add('page-loaded');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', markPageLoaded);
} else {
  markPageLoaded();
}

document.addEventListener('click', (event) => {
  const link = event.target.closest('a[href]');
  if (!link) return;

  const href = link.getAttribute('href');
  const isModifiedClick = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;

  if (
    !href ||
    isModifiedClick ||
    href.startsWith('#') ||
    href.startsWith('http') ||
    href.startsWith('mailto:') ||
    href.startsWith('tel:') ||
    link.target === '_blank' ||
    link.hasAttribute('download')
  ) {
    return;
  }

  event.preventDefault();
  document.body.classList.remove('page-loaded');

  setTimeout(() => {
    window.location.href = href;
  }, prefersReducedMotion ? 0 : 220);
});

const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');
const pageOwnsMenu = Boolean(
  menuToggle?.id === 'menuToggle' ||
  document.querySelector('script[src$="about-us.js"], script[src$="quizzes.js"], script[src$="documents.js"]')
);
if (menuToggle && nav && !pageOwnsMenu) {
  menuToggle.setAttribute('aria-label', 'Open navigation menu');
  menuToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
  });
  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    nav.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation menu');
  }));
}

document.querySelectorAll('.ticker-wrap').forEach((ticker) => {
  const toggle = ticker.querySelector('.ticker-toggle');
  if (!toggle) return;

  toggle.addEventListener('click', () => {
    const isPaused = ticker.classList.toggle('ticker-paused');
    toggle.setAttribute('aria-pressed', String(isPaused));
    toggle.setAttribute('aria-label', isPaused ? 'Play updates ticker' : 'Pause updates ticker');
    toggle.innerHTML = `<i class="fas fa-${isPaused ? 'play' : 'pause'}" aria-hidden="true"></i>`;
  });
});

const stats = document.querySelectorAll('.stat-number');

const startCounters = () => {
  stats.forEach((counter) => {
    const target = Number(counter.dataset.target || 0);
    if (!target) return;

    if (prefersReducedMotion) {
      counter.textContent = target >= 1000000 ? `${Math.round(target / 100000) / 10}M+` : target >= 1000 ? `${Math.round(target / 1000)}K+` : `${target}+`;
      return;
    }
    let count = 0;
    const step = Math.max(1, Math.floor(target / 120));
    const timer = setInterval(() => {
      count += step;
      if (count >= target) {
        clearInterval(timer);
        count = target;
      }
      counter.textContent = target >= 1000000 ? `${Math.round(count / 100000) / 10}M+` : target >= 1000 ? `${Math.round(count / 1000)}K+` : `${count}+`;
    }, 16);
  });
};

const statsSection = document.querySelector('.stats');
if (statsSection && 'IntersectionObserver' in window) {
  const obs = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      startCounters();
      obs.disconnect();
    }
  }, { threshold: 0.3 });
  obs.observe(statsSection);
}

document.querySelectorAll('img').forEach((img) => {
  if (!img.hasAttribute('loading')) img.setAttribute('loading', 'lazy');
  if (!img.hasAttribute('decoding')) img.setAttribute('decoding', 'async');
});
})();
