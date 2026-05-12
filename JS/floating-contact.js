(() => {
  const pageName = decodeURIComponent(window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
  const allowedPages = new Set(['index.html', 'about-us.html']);
  if (!allowedPages.has(pageName)) return;
  if (document.querySelector('.floating-contact-btn')) return;

  const getContactHref = () => {
    const path = window.location.pathname.replace(/\\/g, '/');
    if (/\/HTML\/[^/]+\.html$/i.test(path)) return 'contact.html';
    if (/\/(?:Job_Details|AdmitCard_Details|Result_Details|AnswerKey_Details)\/HTML\/[^/]+\.html$/i.test(path)) return '../../HTML/contact.html';
    return 'HTML/contact.html';
  };

  const contactBtn = document.createElement('a');
  contactBtn.className = 'floating-contact-btn';
  contactBtn.href = getContactHref();
  contactBtn.setAttribute('aria-label', 'Contact GovJobUpdates support');
  contactBtn.innerHTML = '<i class="fas fa-headset" aria-hidden="true"></i><span>Contact Us</span>';
  document.body.appendChild(contactBtn);

  const footer = document.querySelector('footer');
  if (!footer) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      const touchingFooter = entries.some((entry) => entry.isIntersecting);
      contactBtn.classList.toggle('is-hidden-near-footer', touchingFooter);
    }, { root: null, threshold: 0.01, rootMargin: '0px 0px 80px 0px' });
    observer.observe(footer);
    return;
  }

  const hideNearFooter = () => {
    const footerTop = footer.getBoundingClientRect().top;
    const shouldHide = footerTop < window.innerHeight + 80;
    contactBtn.classList.toggle('is-hidden-near-footer', shouldHide);
  };

  window.addEventListener('scroll', hideNearFooter, { passive: true });
  window.addEventListener('resize', hideNearFooter);
  hideNearFooter();
})();
