(() => {
  'use strict';

  // Typing category pages: index + exam detail. Skips live attempt workspace.
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
      // was Hilltop 300x250
      mid: '6048598',
      // was Adsterra skyscraper
      skyscraper: '6054152',
      // mobile mid
      mobileMid: '6048602'
    }
  };

  window.EXOCLICK_TYPING_CATEGORY_CONFIG = { CONFIG, EXOCLICK };

  const indexPage = document.querySelector('main.gju-typing-index-page');
  const examPage = document.querySelector('main.gju-typing-exam-detail-page');
  if (!CONFIG.enabled || (!indexPage && !examPage)) return;
  if (document.querySelector('main.typing-attempt-page, #typingApp, .typing-exam-view')) return;
  if (window.matchMedia('(print)').matches) return;

  const isDesktop = () => window.matchMedia(`(min-width: ${CONFIG.desktopMinPx}px)`).matches;
  const isMobile = () => !isDesktop();

  const ensureCss = () => {
    if (document.querySelector('link[data-adcash-quiz-css], link[data-adcash-typing-css]')) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = CONFIG.cssHref;
    link.dataset.adcashTypingCss = '1';
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
    host.classList.add('gju-typing-ad-host', 'gju-quiz-ad-host-ready', 'has-quiz-ad-rail');
    host.classList.remove('ad-rail-empty');
    host.appendChild(mainCol);
    return mainCol;
  };

  const injectIndex = (page) => {
    const grid = page.querySelector('#typingExamGrid, .gju-typing-exam-grid');
    const count = page.querySelector('#typingExamCount, .typing-selection-summary');
    const directoryTitle = page.querySelector('#typingDirectory, .typing-directory-title');
    const search = page.querySelector('.gju-typing-exam-search');
    const filters = page.querySelector('.gju-typing-filter-row');

    if (EXOCLICK.zones.mobileMid && grid && isMobile()) {
      const slot = makeSlot('mobile-mid', '300x250', 'exoclick');
      slot.classList.add('gju-quiz-ad--mobile-only');
      if (count && count.parentNode) count.insertAdjacentElement('afterend', slot);
      else grid.insertAdjacentElement('beforebegin', slot);
      loadExoClick(slot.querySelector('.gju-quiz-ad-frame'), EXOCLICK.zones.mobileMid);
    }

    if (EXOCLICK.zones.skyscraper && grid && isDesktop()) {
      let host = page.querySelector('.gju-typing-ad-host');
      if (!host) {
        host = document.createElement('div');
        host.className = 'gju-typing-ad-host';
        const start = directoryTitle || search || filters || count || grid;
        start.parentNode.insertBefore(host, start);
        [directoryTitle, search, filters, count, page.querySelector('.gju-quiz-ad--mobile-mid'), grid, page.querySelector('#typingExamEmpty')]
          .filter(Boolean)
          .forEach((el) => {
            if (host.contains(el)) return;
            host.appendChild(el);
          });
      }
      wrapRailHost(host);
      const slot = makeSlot('skyscraper', '160x600', 'exoclick');
      slot.classList.add('gju-quiz-ad--desktop-only', 'gju-quiz-ad--rail');
      host.appendChild(slot);
      loadExoClick(slot.querySelector('.gju-quiz-ad-frame'), EXOCLICK.zones.skyscraper);
    }
  };

  const injectExam = (page) => {
    const passagePanel = page.querySelector('.gju-typing-passage-panel');
    const languagePanel = page.querySelector('.gju-typing-language-panel');

    if (EXOCLICK.zones.mobileMid && isMobile()) {
      const slot = makeSlot('mobile-mid', '300x250', 'exoclick');
      slot.classList.add('gju-quiz-ad--mobile-only');
      if (languagePanel) languagePanel.insertAdjacentElement('afterend', slot);
      else if (passagePanel) passagePanel.insertAdjacentElement('beforebegin', slot);
      else page.appendChild(slot);
      loadExoClick(slot.querySelector('.gju-quiz-ad-frame'), EXOCLICK.zones.mobileMid);
    }

    if (EXOCLICK.zones.skyscraper && (languagePanel || passagePanel) && isDesktop()) {
      let host = page.querySelector('.gju-typing-ad-host');
      if (!host) {
        host = document.createElement('div');
        host.className = 'gju-typing-ad-host';
        const first = languagePanel || passagePanel;
        first.parentNode.insertBefore(host, first);
        if (languagePanel) host.appendChild(languagePanel);
        const mobileAd = page.querySelector('.gju-quiz-ad--mobile-mid');
        if (mobileAd) host.appendChild(mobileAd);
        if (passagePanel) host.appendChild(passagePanel);
      }
      wrapRailHost(host);
      const slot = makeSlot('skyscraper', '160x600', 'exoclick');
      slot.classList.add('gju-quiz-ad--desktop-only', 'gju-quiz-ad--rail');
      host.appendChild(slot);
      loadExoClick(slot.querySelector('.gju-quiz-ad-frame'), EXOCLICK.zones.skyscraper);
    }
  };

  const injectExoClickMid = () => {
    if (!EXOCLICK.enabled || !EXOCLICK.zones.mid) return;
    if (document.querySelector('[data-exoclick-typing-ad]')) return;

    let target = null;
    if (indexPage) {
      const guide = indexPage.querySelector('.gju-typing-faq-section');
      if (guide && guide.parentNode) target = guide;
    } else if (examPage) {
      const evaluate = examPage.querySelector('.gju-typing-evaluate-section');
      if (evaluate && evaluate.parentNode) target = evaluate;
    }
    if (!target) return;

    const slot = makeSlot(
      indexPage ? 'exoclick-after-directory' : 'exoclick-after-passages',
      '300x250',
      'exoclick'
    );
    slot.dataset.exoclickTypingAd = EXOCLICK.zones.mid;
    slot.classList.add('gju-quiz-ad--exoclick-mid');
    target.insertAdjacentElement('beforebegin', slot);
    loadExoClick(slot.querySelector('.gju-quiz-ad-frame'), EXOCLICK.zones.mid);
  };

  const injectSlots = () => {
    if (indexPage) injectIndex(indexPage);
    else if (examPage) injectExam(examPage);
  };

  const syncTypingAdRail = () => {
    document.querySelectorAll('.gju-typing-ad-host').forEach((host) => {
      const skyEl = host.querySelector('.gju-quiz-ad--skyscraper');
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
    syncTypingAdRail();
  };

  const boot = () => {
    ensureCss();
    injectSlots();
    injectExoClickMid();
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