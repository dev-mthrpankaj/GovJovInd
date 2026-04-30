const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');
if (menuToggle && nav) {
  menuToggle.setAttribute('aria-label', 'Toggle navigation menu');
    menuToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });
  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    nav.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
  }));
}

const stats = document.querySelectorAll('.stat-number');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
 