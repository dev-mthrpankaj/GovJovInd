(() => {
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('mainNav');
  if (menuToggle && nav) {
    const setOpen = (open) => {
      nav.classList.toggle('active', open);
      menuToggle.setAttribute('aria-expanded', String(open));
      menuToggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
      const icon = menuToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars', !open);
        icon.classList.toggle('fa-times', open);
      }
    };
    menuToggle.addEventListener('click', () => setOpen(!nav.classList.contains('active')));
    nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setOpen(false)));
  }
  document.querySelectorAll('.copy-link').forEach((button) => {
    button.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(window.location.href);
        button.textContent = 'Link Copied';
        setTimeout(() => { button.textContent = 'Copy Page Link'; }, 1600);
      } catch (error) {
        button.textContent = 'Copy Failed';
        setTimeout(() => { button.textContent = 'Copy Page Link'; }, 1600);
      }
    });
  });
  document.querySelectorAll('.print-page').forEach((button) => {
    button.addEventListener('click', () => window.print());
  });
})();