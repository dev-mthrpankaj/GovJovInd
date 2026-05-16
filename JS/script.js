(() => {
const markPageLoaded = () => {
  document.body.classList.add('page-loaded');
  document.body.classList.remove('page-leaving');
};
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const ADS_CONFIG = {
  enabled: true,
  blockedPages: ['rank-predictor.html', 'documents.html'],
  inlineFrequency: 6
};
const CANDIDATE_SESSION_KEY = 'gju:candidate-session';
const VISITOR_ID_KEY = 'gju:visitor-id';
const VISITOR_API_FALLBACK_URL = 'https://script.google.com/macros/s/AKfycbyM6Xq_fq0axcmTvMTG3Xx0Dwy9h7wSbUDqsO7EvULeGLm0SAVWO0OrkmEEtKh_QBbE/exec';
const VISITOR_CONFIG = {
  enabled: false,
  heartbeatMs: 45000,
  timeoutMs: 6500
};
let transientVisitorId = '';

window.ADS_CONFIG = ADS_CONFIG;

const getCurrentPageName = () => {
  const pageName = window.location.pathname.split('/').pop();
  return decodeURIComponent(pageName || 'index.html').toLowerCase();
};

const getRootRelativeHref = (pathFromRoot) => {
  const path = window.location.pathname.replace(/\\/g, '/');
  if (/\/HTML\/[^/]+\.html$/i.test(path)) return `../${pathFromRoot}`;
  if (/\/(?:Job_Details|AdmitCard_Details|Result_Details|AnswerKey_Details)\/HTML\/[^/]+\.html$/i.test(path)) return `../../${pathFromRoot}`;
  return pathFromRoot;
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

const getHomeHref = () => {
  const homeLink = document.querySelector('header a[href$="index.html"], header a[href="../index.html"], header a[href="../../index.html"]');
  if (homeLink) return homeLink.getAttribute('href');

  const path = window.location.pathname.replace(/\\/g, '/');
  if (/\/HTML\/[^/]+\.html$/i.test(path)) return '../index.html';
  if (/\/(?:Job_Details|AdmitCard_Details|Result_Details|AnswerKey_Details)\/HTML\/[^/]+\.html$/i.test(path)) return '../../index.html';
  return 'index.html';
};

const getSharedPageHref = (pageName) => {
  return pageName === 'index.html' ? getHomeHref() : getCandidatePageHref(pageName);
};

const getActivePageClass = (pageName) => {
  const currentPage = getCurrentPageName();
  return currentPage === pageName || (!currentPage && pageName === 'index.html') ? ' class="active"' : '';
};

const getHrefPageName = (href) => {
  try {
    const url = new URL(href, window.location.href);
    return decodeURIComponent(url.pathname.split('/').pop() || 'index.html').toLowerCase();
  } catch {
    return '';
  }
};

const normalizeHeaderActiveLinks = (navRoot = document.querySelector('header nav')) => {
  if (!navRoot) return;
  const currentPage = getCurrentPageName() || 'index.html';
  const links = Array.from(navRoot.querySelectorAll('a[href]'));
  const activeLink = links.find((link) => getHrefPageName(link.getAttribute('href')) === currentPage);

  links.forEach((link) => {
    link.classList.toggle('active', link === activeLink);
  });
};

const getSharedNavMarkup = () => {
  const items = [
    ['index.html', 'Home'],
    ['latest-jobs.html', 'Job'],
    ['admitcard.html', 'Admit Card'],
    ['answer-key.html', 'Answer Key'],
    ['results.html', 'Result'],
    ['quiz.html', 'Quiz'],
    ['rank-predictor.html', 'Rank Predictor'],
    ['documents.html', 'Document'],
    ['up-certificate-services.html', 'UP Services'],
    ['about-us.html', 'About Us']
  ];
  return items.map(([page, label]) => `<li><a href="${getSharedPageHref(page)}"${getActivePageClass(page)}>${label}</a></li>`).join('');
};

const ensureSharedHeader = () => {
  let header = document.querySelector('header');
  if (!header) {
    header = document.createElement('header');
    document.body.insertBefore(header, document.body.firstChild);
  }

  let container = header.querySelector('.header-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'header-container';
    header.replaceChildren(container);
  }

  let logoContainer = container.querySelector('.logo-container');
  if (!logoContainer) {
    logoContainer = document.createElement('div');
    logoContainer.className = 'logo-container';
    container.prepend(logoContainer);
  }

  const logo96 = getRootRelativeHref('Assets/Home%20Page/favicon-96x96.png');
  const logo32 = getRootRelativeHref('Assets/Home%20Page/favicon-32x32.png');
  logoContainer.innerHTML = `
    <img src="${logo96}" alt="GovJobUpdates Logo" class="logo-img" width="46" height="46" decoding="async" onerror="this.onerror=null;this.src='${logo32}'">
    <a href="${getHomeHref()}" class="logo">GovJob<span>Updates</span></a>
  `;

  let menuToggle = container.querySelector('.menu-toggle');
  if (!menuToggle) {
    menuToggle = document.createElement('button');
    menuToggle.className = 'menu-toggle';
    container.appendChild(menuToggle);
  }
  menuToggle.type = 'button';
  menuToggle.setAttribute('aria-label', 'Open navigation menu');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.innerHTML = '<i class="fas fa-bars" aria-hidden="true"></i>';

  let nav = container.querySelector('nav');
  if (!nav) {
    nav = document.createElement('nav');
    container.appendChild(nav);
  }
  nav.innerHTML = `<ul>${getSharedNavMarkup()}</ul>`;
  normalizeHeaderActiveLinks(nav);

  container.querySelectorAll('.header-auth-actions').forEach((node) => {
    if (!node.querySelector('[data-auth-entry]')) node.remove();
  });
};

const ensureSharedFooter = () => {
  let footer = document.querySelector('footer');
  if (!footer) {
    footer = document.createElement('footer');
    document.body.appendChild(footer);
  }

  let content = footer.querySelector('.footer-content');
  if (!content) {
    content = document.createElement('div');
    content.className = 'footer-content';
    footer.prepend(content);
  }

  content.innerHTML = `
    <div class="footer-section">
      <h3>GovJobUpdates</h3>
      <p>India's trusted government job portal for latest jobs, admit cards, results, answer keys, rank prediction, UP certificate assistance and document tools.</p>
      <div class="social-icons footer-social" aria-label="GovJobUpdates social links">
        <a class="social-instagram" href="https://www.instagram.com/govjobupdates_official/" target="_blank" rel="noopener noreferrer" aria-label="Follow GovJobUpdates on Instagram">
          <i class="fab fa-instagram" aria-hidden="true"></i>
        </a>
        <a class="social-youtube" href="https://www.youtube.com/@GovJobUpdates_official" target="_blank" rel="noopener noreferrer" aria-label="Subscribe to GovJobUpdates on YouTube">
          <i class="fab fa-youtube" aria-hidden="true"></i>
        </a>
      </div>
    </div>
    <div class="footer-section">
      <h3>Quick Links</h3>
      <ul>
        <li><a href="${getSharedPageHref('index.html')}">Home</a></li>
        <li><a href="${getSharedPageHref('latest-jobs.html')}">Job</a></li>
        <li><a href="${getSharedPageHref('admitcard.html')}">Admit Card</a></li>
        <li><a href="${getSharedPageHref('answer-key.html')}">Answer Key</a></li>
        <li><a href="${getSharedPageHref('results.html')}">Result</a></li>
      </ul>
    </div>
    <div class="footer-section">
      <h3>Resources</h3>
      <ul>
        <li><a href="${getSharedPageHref('quiz.html')}">Quiz</a></li>
        <li><a href="${getSharedPageHref('rank-predictor.html')}">Rank Predictor</a></li>
        <li><a href="${getSharedPageHref('documents.html')}">Document</a></li>
        <li><a href="${getSharedPageHref('up-certificate-services.html')}">UP Services</a></li>
        <li><a href="${getSharedPageHref('about-us.html')}">About Us</a></li>
      </ul>
    </div>
    <div class="footer-section">
      <h3>Contact Us</h3>
      <ul>
        <li><i class="fas fa-envelope" aria-hidden="true"></i> dmagstudio2023@outlook.com</li>
        <li><i class="fas fa-phone" aria-hidden="true"></i> +91 7300627752</li>
        <li><i class="fas fa-map-marker-alt" aria-hidden="true"></i> Shikohabad, UP, India</li>
      </ul>
    </div>
  `;

  let copyright = footer.querySelector('.copyright');
  if (!copyright) {
    copyright = document.createElement('div');
    copyright.className = 'copyright';
    footer.appendChild(copyright);
  }
  copyright.innerHTML = `&copy; 2026 GovJobUpdates. All rights reserved. | <a href="${getSharedPageHref('privacy-policy.html')}">Privacy Policy</a> | <a href="${getSharedPageHref('terms.html')}">Terms of Use</a>`;
};

const ensureSharedSiteChrome = () => {
  ensureSharedHeader();
  ensureSharedFooter();
};

let mobileNavScrollY = 0;

const isMobileNavViewport = () => window.matchMedia('(max-width: 1279px)').matches;

const setMobileNavScrollLock = (locked) => {
  const body = document.body;
  const root = document.documentElement;
  if (!body) return;

  if (locked && !body.classList.contains('gju-mobile-nav-open')) {
    mobileNavScrollY = window.scrollY || root.scrollTop || 0;
    body.style.top = `-${mobileNavScrollY}px`;
    root.classList.add('gju-mobile-nav-open');
    body.classList.add('gju-mobile-nav-open');
    return;
  }

  if (!locked && body.classList.contains('gju-mobile-nav-open')) {
    root.classList.remove('gju-mobile-nav-open');
    body.classList.remove('gju-mobile-nav-open');
    body.style.top = '';
    window.scrollTo({ top: mobileNavScrollY, behavior: 'auto' });
  }
};

const syncMobileNavScrollLock = () => {
  const nav = document.querySelector('header nav');
  const toggle = document.querySelector('header .menu-toggle');
  const menuIsOpen = Boolean(nav?.classList.contains('active') || toggle?.getAttribute('aria-expanded') === 'true');
  setMobileNavScrollLock(isMobileNavViewport() && menuIsOpen);
};

const ensureMobileNavScrollLock = () => {
  syncMobileNavScrollLock();

  if (!('MutationObserver' in window)) {
    window.addEventListener('resize', syncMobileNavScrollLock);
    return;
  }

  const observed = new WeakSet();
  const observeHeaderControls = () => {
    [document.querySelector('header nav'), document.querySelector('header .menu-toggle')].forEach((node) => {
      if (!node || observed.has(node)) return;
      observed.add(node);
      new MutationObserver(syncMobileNavScrollLock).observe(node, {
        attributes: true,
        attributeFilter: ['class', 'aria-expanded']
      });
    });
    syncMobileNavScrollLock();
  };

  observeHeaderControls();
  new MutationObserver(observeHeaderControls).observe(document.body, { childList: true, subtree: true });
  window.addEventListener('resize', syncMobileNavScrollLock);
  window.addEventListener('pagehide', () => setMobileNavScrollLock(false));
};

const ensureCandidateBottomNav = () => {
  if (document.querySelector('.candidate-bottom-nav')) return;

  const nav = document.createElement('nav');
  nav.className = 'candidate-bottom-nav';
  nav.setAttribute('aria-label', 'Primary mobile navigation');
  const items = [
    { label: 'Home', icon: 'fa-home', href: getHomeHref(), match: /index\.html$/i },
    { label: 'Rank', icon: 'fa-chart-line', href: getCandidatePageHref('rank-predictor.html'), match: /rank-predictor\.html$/i },
    { label: 'Quiz', icon: 'fa-stopwatch', href: getCandidatePageHref('quiz.html'), match: /quiz\.html$/i },
    { label: 'UP Doc', icon: 'fa-certificate', href: getCandidatePageHref('up-certificate-services.html'), match: /up-certificate-services\.html$/i },
    { label: 'Jobs', icon: 'fa-briefcase', href: getCandidatePageHref('latest-jobs.html'), match: /latest-jobs\.html$/i }
  ];
  const currentPage = getCurrentPageName();
  nav.innerHTML = items.map((item) => {
    const active = item.match.test(currentPage) || (item.label === 'Dashboard' && currentPage === 'dashboard.html');
    return `<a href="${item.href}" class="${active ? 'is-active' : ''}" aria-label="${item.label}"><i class="fas ${item.icon}" aria-hidden="true"></i><span>${item.label}</span></a>`;
  }).join('');
  document.body.appendChild(nav);
  document.body.classList.add('has-candidate-bottom-nav');
};

window.GovJobCandidateNav = {
  sync: ensureCandidateBottomNav
};

const ensureGoTopButton = () => {
  if (document.querySelector('.go-top-btn')) return;

  const button = document.createElement('button');
  button.className = 'go-top-btn';
  button.type = 'button';
  button.setAttribute('aria-label', 'Go to top');
  button.innerHTML = '<i class="fas fa-arrow-up" aria-hidden="true"></i><span>Top</span>';
  document.body.appendChild(button);

  let footerVisible = false;
  const isContactWidgetVisible = () => {
    const widget = document.getElementById('gjuContactWidget');
    return Boolean(widget && !widget.classList.contains('is-hidden') && !widget.classList.contains('is-footer-visible'));
  };
  const updateVisibility = () => {
    const longScroll = document.documentElement.scrollHeight > window.innerHeight + 900;
    const isExam = document.body.classList.contains('quiz-exam-active');
    button.classList.toggle('is-visible', !isExam && longScroll && footerVisible && !isContactWidgetVisible());
  };

  button.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  });

  const footer = document.querySelector('footer');
  if (footer && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      footerVisible = entries.some((entry) => entry.isIntersecting);
      updateVisibility();
    }, { rootMargin: '0px 0px 140px 0px' });
    observer.observe(footer);
  }

  window.addEventListener('scroll', updateVisibility, { passive: true });
  window.addEventListener('resize', updateVisibility);
  if ('MutationObserver' in window) {
    const watchContactWidget = () => {
      const widget = document.getElementById('gjuContactWidget');
      if (!widget || widget.dataset.goTopWatched) return;
      widget.dataset.goTopWatched = 'true';
      new MutationObserver(updateVisibility).observe(widget, { attributes: true, attributeFilter: ['class'] });
      updateVisibility();
    };
    watchContactWidget();
    new MutationObserver(watchContactWidget).observe(document.body, { childList: true, subtree: true });
  }
  updateVisibility();
};

const createVisitorId = () => {
  const prefix = `gju-${Date.now().toString(36)}`;
  try {
    const bytes = new Uint32Array(2);
    window.crypto.getRandomValues(bytes);
    return `${prefix}-${bytes[0].toString(36)}${bytes[1].toString(36)}`;
  } catch {
    return `${prefix}-${Math.random().toString(36).slice(2, 12)}`;
  }
};

const getVisitorId = () => {
  if (transientVisitorId) return transientVisitorId;
  try {
    const saved = localStorage.getItem(VISITOR_ID_KEY);
    if (saved) return saved;
    const nextId = createVisitorId();
    localStorage.setItem(VISITOR_ID_KEY, nextId);
    return nextId;
  } catch {
    transientVisitorId = createVisitorId();
    return transientVisitorId;
  }
};

const getVisitorApiUrl = () => {
  return String(window.RANK_PREDICTOR_CONFIG?.apiUrl || VISITOR_API_FALLBACK_URL || '').trim();
};

const isValidVisitorApiUrl = (apiUrl) => {
  return Boolean(apiUrl && apiUrl.startsWith('https://') && apiUrl.endsWith('/exec') && !apiUrl.includes('/dev'));
};

const ensureFooterVisitorCounter = () => {
  if (!VISITOR_CONFIG.enabled) return null;
  const footer = document.querySelector('footer');
  if (!footer) return null;

  const existing = footer.querySelector('.footer-live-visitors');
  if (existing) return existing;

  const widget = document.createElement('div');
  widget.className = 'footer-live-visitors';
  widget.setAttribute('aria-live', 'polite');
  widget.innerHTML = `
    <div class="footer-live-pill">
      <span class="footer-live-dot" aria-hidden="true"></span>
      <span class="footer-live-label">Live visitors</span>
      <strong data-visitor-count>--</strong>
      <span class="footer-live-caption">online now</span>
    </div>
  `;

  const copyright = footer.querySelector('.copyright');
  if (copyright) footer.insertBefore(widget, copyright);
  else footer.appendChild(widget);
  return widget;
};

let visitorHeartbeatTimer = 0;
let visitorHeartbeatInFlight = false;

const setFooterVisitorState = (count, state = 'ready') => {
  const widget = ensureFooterVisitorCounter();
  if (!widget) return;
  const countNode = widget.querySelector('[data-visitor-count]');
  widget.dataset.visitorState = state;
  if (countNode) countNode.textContent = count;
};

const sendVisitorHeartbeat = async () => {
  if (!VISITOR_CONFIG.enabled || visitorHeartbeatInFlight) return;
  const apiUrl = getVisitorApiUrl();
  if (!isValidVisitorApiUrl(apiUrl)) {
    setFooterVisitorState('--', 'offline');
    return;
  }

  visitorHeartbeatInFlight = true;
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), VISITOR_CONFIG.timeoutMs);

  try {
    const payload = {
      action: 'trackVisitor',
      visitorId: getVisitorId(),
      page: `${window.location.pathname}${window.location.search}`,
      referrer: document.referrer || '',
      userAgent: navigator.userAgent || ''
    };
    const response = await fetch(apiUrl, {
      method: 'POST',
      redirect: 'follow',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      },
      body: JSON.stringify(payload),
      signal: controller.signal
    });
    const text = await response.text();
    const result = JSON.parse(text);
    if (!result.success || !Number.isFinite(Number(result.activeVisitors))) throw new Error(result.message || 'Visitor counter failed.');
    setFooterVisitorState(String(Number(result.activeVisitors)), 'ready');
  } catch {
    setFooterVisitorState('--', 'offline');
  } finally {
    window.clearTimeout(timeout);
    visitorHeartbeatInFlight = false;
  }
};

const startVisitorCounter = () => {
  if (!ensureFooterVisitorCounter() || visitorHeartbeatTimer) return;
  sendVisitorHeartbeat();
  visitorHeartbeatTimer = window.setInterval(sendVisitorHeartbeat, VISITOR_CONFIG.heartbeatMs);
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) sendVisitorHeartbeat();
  });
};

window.GovJobVisitors = {
  refresh: sendVisitorHeartbeat,
  start: startVisitorCounter
};

if (document.readyState === 'loading') {
  if (document.body) ensureSharedSiteChrome();
  else window.addEventListener('DOMContentLoaded', ensureSharedSiteChrome);
  window.addEventListener('DOMContentLoaded', ensureMobileNavScrollLock);
  window.addEventListener('DOMContentLoaded', ensureHeaderAuthEntry);
  window.addEventListener('DOMContentLoaded', ensureCandidateBottomNav);
  window.addEventListener('DOMContentLoaded', ensureGoTopButton);
  window.addEventListener('DOMContentLoaded', markPageLoaded);
  window.addEventListener('DOMContentLoaded', applyAdControls);
  window.addEventListener('DOMContentLoaded', startVisitorCounter);
} else {
  ensureSharedSiteChrome();
  ensureMobileNavScrollLock();
  ensureHeaderAuthEntry();
  ensureCandidateBottomNav();
  ensureGoTopButton();
  markPageLoaded();
  applyAdControls();
  startVisitorCounter();
}
window.addEventListener('pageshow', markPageLoaded);

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
  document.body.classList.add('page-leaving');

  setTimeout(() => {
    window.location.href = href;
  }, prefersReducedMotion ? 0 : 220);
});

const getHomeSearchRoute = (query) => {
  const text = String(query || '').toLowerCase();

  if (/\b(rank|percentile|predictor|scorecard)\b/.test(text)) {
    return 'HTML/rank-predictor.html';
  }

  if (/\b(quiz|test|practice|mock|question)\b/.test(text)) {
    return 'HTML/quiz.html';
  }

  if (/\b(dashboard|performance|attempts?|analytics)\b/.test(text)) {
    return 'HTML/dashboard.html';
  }

  if (/\b(answer\s*keys?|answer-keys?|objections?)\b/.test(text)) {
    return 'HTML/answer-key.html';
  }

  if (/\b(admit\s*cards?|hall\s*tickets?|exam\s*city|exam\s*dates?)\b/.test(text)) {
    return 'HTML/admitcard.html';
  }

  if (/\b(results?|marks?|cut\s*offs?|cutoffs?)\b/.test(text)) {
    return 'HTML/results.html';
  }

  if (/\b(certificates?|caste|jati|niwas|domicile|income|aay|mool)\b/.test(text)) {
    return 'HTML/up-certificate-services.html';
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
    document.body.classList.add('page-leaving');

    setTimeout(() => {
      window.location.href = url.toString();
    }, prefersReducedMotion ? 0 : 220);
  });
}

const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');
const pageOwnsMenu = Boolean(
  menuToggle?.id === 'menuToggle' ||
  document.querySelector('script[src*="about-us.js"], script[src*="documents.js"]')
);
if (menuToggle && nav && !pageOwnsMenu) {
  const setMenuIcon = (isOpen) => {
    const icon = menuToggle.querySelector('i');
    if (!icon) return;
    icon.classList.toggle('fa-bars', !isOpen);
    icon.classList.toggle('fa-times', isOpen);
    icon.classList.toggle('fa-xmark', false);
  };

  const setMenuState = (isOpen) => {
    nav.classList.toggle('active', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    setMenuIcon(isOpen);
  };

  menuToggle.setAttribute('aria-label', 'Open navigation menu');
  setMenuIcon(nav.classList.contains('active'));
  menuToggle.addEventListener('click', () => {
    setMenuState(!nav.classList.contains('active'));
  });
  nav.addEventListener('click', (event) => {
    const link = event.target.closest('a');
    if (!link) return;
    link.blur();
    normalizeHeaderActiveLinks(nav);
    setMenuState(false);
  });
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

const formatCounterValue = (counter, value, target) => {
  const suffix = counter.dataset.suffix || '+';
  if (suffix && suffix !== '+') return `${Math.round(value)}${suffix}`;
  if (target >= 1000000) return `${Math.round(value / 100000) / 10}M+`;
  if (target >= 1000) return `${Math.round(value / 1000)}K+`;
  return `${Math.round(value)}+`;
};

const startCounters = () => {
  stats.forEach((counter) => {
    const target = Number(counter.dataset.target || 0);
    if (!target) return;

    if (prefersReducedMotion) {
      counter.textContent = formatCounterValue(counter, target, target);
      return;
    }

    let start = 0;
    const duration = 1200;
    const startedAt = performance.now();

    const step = (now) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = target * eased;
      counter.textContent = formatCounterValue(counter, start, target);
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  });
};

const observerOptions = { threshold: 0.35 };

if ('IntersectionObserver' in window) {
  const statsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      startCounters();
      observer.disconnect();
    });
  }, observerOptions);

  stats.forEach((stat) => statsObserver.observe(stat));
} else {
  startCounters();
}
})();
