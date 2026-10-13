(() => {
  'use strict';

  // Quiz category pages only (family + subject). Not quiz.html / attempt pages.
  const CONFIG = {
    enabled: true,
    cssHref: '../CSS/adcash-quiz-category.css?v=20261013-exoclick',
    emptyHideMs: 4000,
    emptyRecheckMs: [7000, 11000],
    desktopMinPx: 1100
  };

  const EXOCLICK = {
    enabled: true,
    zones: {
      // was Hilltop 300x250 (after pagination)
      afterPagination: '6048598',
      // was Adsterra skyscraper 160x600
      skyscraper: '6054152',
      // mobile mid 300x250 (was Adsterra rectangle)
      mobileMid: '6048602'
    }
  };

  window.EXOCLICK_QUIZ_CATEGORY_CONFIG = { CONFIG, EXOCLICK };

  const familyPage = document.querySelector('main.family-quiz-page');
  const subjectPage = document.querySelector('main.subject-quiz-page, main[data-subject-quiz-page]');
  if (!CONFIG.enabled || (!familyPage && !subjectPage)) return;
  if (window.matchMedia('(print)').matches) return;

  const isDesktop = () => window.matchMedia(`(min-width: ${CONFIG.desktopMinPx}px)`).matches;
  const isMobile = () => !isDesktop();

  const ensureCss = () => {
    if (document.querySelector('link[data-adcash-quiz-css]')) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = CONFIG.cssHref;
    link.dataset.adcashQuizCss = '1';
    document.head.appendChild(link);
  };

  const makeSlot = (slotKey, sizeLabel, network = 'exoclick') => {
    const wrap = document.createElement('aside');
    wrap.className = `gju-quiz-ad gju-quiz-ad--${slotKey} gju-quiz-ad--${network}`;
    wrap.dataset.adSlot = slotKey;
    wrap.dataset.adNetwork = network;
    wrap.setAttribute('aria-label', 'Advertisement');
    wrap.innerHTML = `
      <div class="gju-quiz-ad-label">
        <span class="gju-quiz-ad-label-tag">Ad</span>
        <span class="gju-quiz-ad-label-note">GovJobUpdates does not endorse this.</span>
      </div>
      <div class="gju-quiz-ad-frame" data-ad-frame="${slotKey}" data-ad-size="${sizeLabel}"></div>
    `.trim();
    return wrap;
  };

  const loadExoClick = (frame, zoneId) => {
    if (!frame || !zoneId) return;
    const ins = document.createElement('ins');
    ins.className = 'eas6a97888e2';
    ins.dataset.zoneid = zoneId;
    frame.appendChild(ins);

    window.AdProvider = window.AdProvider || [];

    if (!document.querySelector('script[src*="ad-provider.js"]')) {
      const script = document.createElement('script');
      script.async = true;
      script.type = 'application/javascript';
      script.src = 'https://a.magsrv.com/ad-provider.js';
      document.head.appendChild(script);
    }

    const pushScript = document.createElement('script');
    pushScript.textContent = `(AdProvider = window.AdProvider || []).push({"serve": {}});`;
    frame.appendChild(pushScript);
  };

  const wrapRailHost = (host) => {
    if (!host || host.querySelector(':scope > .gju-quiz-ad-rail-main')) {
      return host.querySelector(':scope > .gju-quiz-ad-rail-main') || host;
    }
    const mainCol = document.createElement('div');
    mainCol.className = 'gju-quiz-ad-rail-main';
    while (host.firstChild) mainCol.appendChild(host.firstChild);
    host.classList.add('gju-quiz-ad-host-ready', 'has-quiz-ad-rail');
    host.classList.remove('ad-rail-empty');
    host.appendChild(mainCol);
    return mainCol;
  };

  const injectExoClickAfterPagination = () => {
    if (!EXOCLICK.enabled || !EXOCLICK.zones.afterPagination) return;
    if (document.querySelector('[data-exoclick-quiz-ad]')) return;

    const host = familyPage || subjectPage;
    if (!host) return;

    const pagination = familyPage
      ? familyPage.querySelector('.family-pagination')
      : subjectPage
        ? subjectPage.querySelector('[data-subject-pagination]')
        : null;

    if (!pagination || !pagination.parentNode) return;

    const slot = makeSlot('exoclick-after-pagination', '300x250', 'exoclick');
    slot.dataset.exoclickQuizAd = EXOCLICK.zones.afterPagination;
    slot.classList.add('gju-quiz-ad--exoclick-mid');
    pagination.insertAdjacentElement('afterend', slot);
    loadExoClick(slot.querySelector('.gju-quiz-ad-frame'), EXOCLICK.zones.afterPagination);
  };

  const injectSlots = () => {
    if (!EXOCLICK.enabled) return;

    if (familyPage) {
      const discovery = familyPage.querySelector('.family-discovery');
      const grid = familyPage.querySelector('#familyQuizList, .family-quiz-grid');
      const listHead = familyPage.querySelector('.family-list-head');

      if (EXOCLICK.zones.mobileMid && grid && grid.parentNode && isMobile()) {
        const slot = makeSlot('mobile-mid', '300x250', 'exoclick');
        slot.classList.add('gju-quiz-ad--mobile-only');
        if (listHead && listHead.parentNode === grid.parentNode) {
          listHead.insertAdjacentElement('afterend', slot);
        } else {
          grid.insertAdjacentElement('beforebegin', slot);
        }
        loadExoClick(slot.querySelector('.gju-quiz-ad-frame'), EXOCLICK.zones.mobileMid);
      }

      if (EXOCLICK.zones.skyscraper && discovery && isDesktop()) {
        wrapRailHost(discovery);
        const slot = makeSlot('skyscraper', '160x600', 'exoclick');
        slot.classList.add('gju-quiz-ad--desktop-only', 'gju-quiz-ad--rail');
        discovery.appendChild(slot);
        loadExoClick(slot.querySelector('.gju-quiz-ad-frame'), EXOCLICK.zones.skyscraper);
      }
      return;
    }

    if (subjectPage) {
      const sets = subjectPage.querySelector('#subject-sets, .subject-sets-section');
      const grid = subjectPage.querySelector('[data-subject-quiz-list], .subject-quiz-grid');
      const heading = sets && sets.querySelector('.subject-quiz-heading');

      if (EXOCLICK.zones.mobileMid && grid && grid.parentNode && isMobile()) {
        const slot = makeSlot('mobile-mid', '300x250', 'exoclick');
        slot.classList.add('gju-quiz-ad--mobile-only');
        const countLine = sets && sets.querySelector('.subject-quiz-count-line');
        if (countLine) countLine.insertAdjacentElement('afterend', slot);
        else if (heading) heading.insertAdjacentElement('afterend', slot);
        else grid.insertAdjacentElement('beforebegin', slot);
        loadExoClick(slot.querySelector('.gju-quiz-ad-frame'), EXOCLICK.zones.mobileMid);
      }

      if (EXOCLICK.zones.skyscraper && sets && isDesktop()) {
        wrapRailHost(sets);
        const slot = makeSlot('skyscraper', '160x600', 'exoclick');
        slot.classList.add('gju-quiz-ad--desktop-only', 'gju-quiz-ad--rail');
        sets.appendChild(slot);
        loadExoClick(slot.querySelector('.gju-quiz-ad-frame'), EXOCLICK.zones.skyscraper);
      }
    }
  };

  const syncQuizAdRail = () => {
    document.querySelectorAll('.gju-quiz-ad-host-ready, .family-discovery, .subject-sets-section').forEach((host) => {
      const skyEl = host.querySelector('.gju-quiz-ad--skyscraper');
      if (!skyEl && !host.classList.contains('gju-quiz-ad-host-ready')) return;
      const skyLive = Boolean(
        skyEl
        && !skyEl.hidden
        && !skyEl.classList.contains('is-empty')
        && skyEl.classList.contains('is-filled')
        && window.getComputedStyle(skyEl).display !== 'none'
      );
      host.classList.toggle('has-quiz-ad-rail', skyLive);
      host.classList.toggle('ad-rail-empty', Boolean(skyEl) && !skyLive);
    });
  };

  const hideEmptySlots = () => {
    document.querySelectorAll('.gju-quiz-ad[data-ad-slot]').forEach((slot) => {
      if (slot.dataset.adNetwork === 'exoclick') {
        slot.hidden = false;
        slot.classList.remove('is-empty');
        slot.classList.add('is-filled');
        return;
      }
      slot.classList.add('is-empty');
      slot.classList.remove('is-filled');
      slot.hidden = true;
    });
    syncQuizAdRail();
  };

  const boot = () => {
    ensureCss();
    injectExoClickAfterPagination();
    injectSlots();
    window.setTimeout(hideEmptySlots, CONFIG.emptyHideMs);
    (CONFIG.emptyRecheckMs || []).forEach((ms) => {
      window.setTimeout(hideEmptySlots, ms);
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
})();