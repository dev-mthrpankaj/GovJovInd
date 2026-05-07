(() => {
const markPageLoaded = () => document.body.classList.add('page-loaded');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const ADS_CONFIG = {
  enabled: true,
  blockedPages: ['quiz.html', 'rank-predictor.html', 'documents.html'],
  inlineFrequency: 6
};
const CANDIDATE_SESSION_KEY = 'gju:candidate-session';

window.ADS_CONFIG = ADS_CONFIG;

const getCurrentPageName = () => {
  const pageName = window.location.pathname.split('/').pop();
  return decodeURIComponent(pageName || 'index.html').toLowerCase();
};

const isAdsBlockedPage = () => {
  return !ADS_CONFIG.enabled || ADS_CONFIG.blockedPages.includes(getCurrentPageName());
};

const createAdSlot = (variant, autoLocation) => {
  const slot = document.createElement('div');
  const isInline = variant === 'inline';
  slot.className = `ad-slot ${isInline ? 'ad-slot-inline' : 'ad-slot-top'}`;
  slot.dataset.adLocation = isInline ? 'inline' : 'top';
  slot.dataset.adPlaceholder = 'true';
  if (autoLocation) slot.dataset.adAuto = autoLocation;

  const label = document.createElement('span');
  label.className = 'ad-label';
  label.textContent = 'Advertisement';
  slot.appendChild(label);
  slot.appendChild(document.createComment(' Replace with Google AdSense ad unit after approval '));

  return slot;
};

const ensureDetailPageAds = () => {
  if (isAdsBlockedPage()) return;

  const path = window.location.pathname.replace(/\\/g, '/').toLowerCase();
  const pageName = getCurrentPageName();
  const isDetailPage = pageName === 'job-details.html'
    || path.includes('/job_details/html/')
    || path.includes('/admitcard_details/html/')
    || path.includes('/result_details/html/')
    || path.includes('/answerkey_details/html/');

  if (!isDetailPage) return;

  const main = document.querySelector('main');
  if (!main) return;

  const summaryCard = document.querySelector('.job-details-container .job-header, .job-detail-page > .job-header, .detail-grid > .highlight-card');
  if (summaryCard && !document.querySelector('.ad-slot[data-ad-auto="detail-summary"]')) {
    summaryCard.insertAdjacentElement('afterend', createAdSlot('top', 'detail-summary'));
  }

  const bottomHost = document.querySelector('.job-details-page') || main;
  if (bottomHost && !document.querySelector('.ad-slot[data-ad-auto="detail-bottom"]')) {
    bottomHost.appendChild(createAdSlot('inline', 'detail-bottom'));
  }
};

const applyAdControls = () => {
  if (isAdsBlockedPage()) {
    document.querySelectorAll('.ad-slot').forEach((slot) => slot.remove());
    document.body.classList.add('ads-blocked');
    return;
  }

  document.body.classList.add('ads-enabled');
  ensureDetailPageAds();
};

window.GovJobAds = {
  config: ADS_CONFIG,
  apply: applyAdControls,
  createSlot: createAdSlot,
  isBlockedPage: isAdsBlockedPage
};

const getCandidateHeaderSession = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(CANDIDATE_SESSION_KEY) || sessionStorage.getItem(CANDIDATE_SESSION_KEY) || 'null');
    return saved && saved.userId ? saved : null;
  } catch {
    return null;
  }
};

const getCandidatePageHref = (pageName) => {
  const rankPredictorLink = document.querySelector('header a[href*="rank-predictor.html"]');
  const rankPredictorHref = rankPredictorLink?.getAttribute('href') || '';
  if (rankPredictorHref) return rankPredictorHref.replace(/rank-predictor\.html(?:[?#].*)?$/i, pageName);

  const path = window.location.pathname.replace(/\\/g, '/');
  if (/\/HTML\/[^/]+\.html$/i.test(path)) return pageName;
  if (/\/(?:Job_Details|AdmitCard_Details|Result_Details|AnswerKey_Details)\/HTML\/[^/]+\.html$/i.test(path)) return `../../HTML/${pageName}`;
  return `HTML/${pageName}`;
};

const ensureHeaderAuthEntry = () => {
  const header = document.querySelector('header .header-container');
  if (!header || header.querySelector('.header-auth-actions')) return;

  const loginHref = getCandidatePageHref('login.html');
  const dashboardHref = getCandidatePageHref('dashboard.html');
  const session = getCandidateHeaderSession();
  const authActions = document.createElement('div');
  const authLink = document.createElement('a');
  const authIcon = document.createElement('i');
  const authLabel = document.createElement('span');

  authActions.className = 'header-auth-actions';
  authLink.className = `header-login-btn${session ? ' is-active' : ''}`;
  authLink.href = session ? dashboardHref : loginHref;
  authLink.setAttribute('aria-label', session ? 'Open candidate dashboard' : 'Login to candidate dashboard');
  authLink.dataset.authEntry = '';
  authLink.dataset.loginHref = loginHref;
  authLink.dataset.dashboardHref = dashboardHref;
  authIcon.className = 'fas fa-user-circle';
  authIcon.setAttribute('aria-hidden', 'true');
  authLabel.textContent = session ? 'Dashboard' : 'Login';

  authLink.append(authIcon, authLabel);
  authActions.appendChild(authLink);

  const nav = header.querySelector('nav');
  if (nav) nav.insertAdjacentElement('afterend', authActions);
  else header.appendChild(authActions);

  window.CandidateAuth?.syncHeaderEntry?.(header);
};

if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', ensureHeaderAuthEntry);
  window.addEventListener('DOMContentLoaded', markPageLoaded);
  window.addEventListener('DOMContentLoaded', applyAdControls);
} else {
  ensureHeaderAuthEntry();
  markPageLoaded();
  applyAdControls();
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

const getHomeSearchRoute = (query) => {
  const text = String(query || '').toLowerCase();

  if (/\b(answer\s*keys?|answer-keys?|objections?)\b/.test(text)) {
    return 'HTML/answer-key.html';
  }

  if (/\b(admit\s*cards?|hall\s*tickets?|exam\s*city|exam\s*dates?)\b/.test(text)) {
    return 'HTML/admitcard.html';
  }

  if (/\b(results?|marks?|cut\s*offs?|cutoffs?|certificates?)\b/.test(text)) {
    return 'HTML/results.html';
  }

  return 'HTML/latest-jobs.html';
};

const homeSearchForm = document.getElementById('homeSearchForm');
const homeSearchInput = document.getElementById('homeSearchInput');

if (homeSearchForm && homeSearchInput) {
  homeSearchForm.addEventListener('submit', (event) => {
    const query = homeSearchInput.value.trim().replace(/\s+/g, ' ');

    if (!query) {
      event.preventDefault();
      homeSearchInput.focus();
      return;
    }

    event.preventDefault();
    const url = new URL(getHomeSearchRoute(query), window.location.href);
    url.searchParams.set('q', query);
    document.body.classList.remove('page-loaded');

    setTimeout(() => {
      window.location.href = url.toString();
    }, prefersReducedMotion ? 0 : 220);
  });
}

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
