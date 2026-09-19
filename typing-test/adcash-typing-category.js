(() => {
  'use strict';

  // Adcash Display — typing category pages
  // Covers: typing index (exam directory) + exam detail pages
  // Skips: app.html / live attempt workspace
  const CONFIG = {
    enabled: true,
    zones: {
      desktop120x600: '12187246',
      mobile300x250: '12187270'
    },
    aclibSrc: 'https://acscdn.com/script/aclib.js',
    cssHref: '../CSS/adcash-quiz-category.css?v=20260919-typingads',
    emptyHideMs: 4000,
    desktopMinPx: 1100
  };

  window.ADCASH_TYPING_CATEGORY_CONFIG = CONFIG;

  const indexPage = document.querySelector('main.gju-typing-index-page');
  const examPage = document.querySelector('main.gju-typing-exam-detail-page');
  if (!CONFIG.enabled || (!indexPage && !examPage)) return;
  if (document.querySelector('main.typing-attempt-page, #typingApp, .typing-exam-view')) return;
  if (window.matchMedia('(print)').matches) return;

  const zones = Object.fromEntries(
    Object.entries(CONFIG.zones || {}).filter(([, id]) => Boolean(String(id || '').trim()))
  );
  if (!Object.keys(zones).length) return;

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

  const loadAclib = () => new Promise((resolve, reject) => {
    if (window.aclib && typeof window.aclib.runBanner === 'function') {
      resolve(window.aclib);
      return;
    }
    const existing = document.querySelector('script[data-adcash-aclib]');
    if (existing) {
      existing.addEventListener('load', () => resolve(window.aclib), { once: true });
      existing.addEventListener('error', () => reject(new Error('aclib load failed')), { once: true });
      return;
    }
    const script = document.createElement('script');
    script.src = CONFIG.aclibSrc;
    script.async = true;
    script.dataset.adcashAclib = '1';
    script.onload = () => resolve(window.aclib);
    script.onerror = () => reject(new Error('aclib load failed'));
    document.head.appendChild(script);
  });

  const makeSlot = (slotKey, sizeLabel) => {
    const wrap = document.createElement('aside');
    wrap.className = `gju-quiz-ad gju-quiz-ad--${slotKey}`;
    wrap.dataset.adcashSlot = slotKey;
    wrap.setAttribute('aria-label', 'Advertisement');
    wrap.innerHTML = `
      <div class="gju-quiz-ad-label">
        <span class="gju-quiz-ad-label-tag">Ad</span>
        <span class="gju-quiz-ad-label-note">GovJobUpdates does not endorse this.</span>
      </div>
      <div class="gju-quiz-ad-frame" data-adcash-frame="${slotKey}" data-ad-size="${sizeLabel}"></div>
    `.trim();
    return wrap;
  };

  const runBannerIn = (frame, zoneId) => {
    if (!frame || !zoneId || !window.aclib || typeof window.aclib.runBanner !== 'function') return;
    const runner = document.createElement('script');
    runner.textContent = `aclib.runBanner({ zoneId: ${JSON.stringify(String(zoneId))} });`;
    frame.appendChild(runner);
  };

  const wrapRailHost = (host) => {
    if (!host || host.classList.contains('has-quiz-ad-rail')) {
      return host.querySelector(':scope > .gju-quiz-ad-rail-main') || host;
    }
    const mainCol = document.createElement('div');
    mainCol.className = 'gju-quiz-ad-rail-main';
    while (host.firstChild) mainCol.appendChild(host.firstChild);
    host.classList.add('has-quiz-ad-rail', 'gju-typing-ad-host');
    host.appendChild(mainCol);
    return mainCol;
  };

  const injectIndex = (page) => {
    const grid = page.querySelector('#typingExamGrid, .gju-typing-exam-grid');
    const count = page.querySelector('#typingExamCount, .typing-selection-summary');
    const directoryTitle = page.querySelector('#typingDirectory, .typing-directory-title');
    const search = page.querySelector('.gju-typing-exam-search');
    const filters = page.querySelector('.gju-typing-filter-row');

    if (zones.mobile300x250 && grid) {
      const slot = makeSlot('mobile-mid', '300x250');
      slot.classList.add('gju-quiz-ad--mobile-only');
      if (count && count.parentNode) count.insertAdjacentElement('afterend', slot);
      else grid.insertAdjacentElement('beforebegin', slot);
    }

    if (zones.desktop120x600 && grid) {
      // Wrap directory block (title → grid) in one rail host
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
      const slot = makeSlot('skyscraper', '120x600');
      slot.classList.add('gju-quiz-ad--desktop-only', 'gju-quiz-ad--rail');
      host.appendChild(slot);
    }
  };

  const injectExam = (page) => {
    const passagePanel = page.querySelector('.gju-typing-passage-panel');
    const languagePanel = page.querySelector('.gju-typing-language-panel');

    if (zones.mobile300x250) {
      const slot = makeSlot('mobile-mid', '300x250');
      slot.classList.add('gju-quiz-ad--mobile-only');
      if (languagePanel) languagePanel.insertAdjacentElement('afterend', slot);
      else if (passagePanel) passagePanel.insertAdjacentElement('beforebegin', slot);
      else page.appendChild(slot);
    }

    if (zones.desktop120x600 && passagePanel) {
      let host = page.querySelector('.gju-typing-ad-host');
      if (!host) {
        host = document.createElement('div');
        host.className = 'gju-typing-ad-host';
        passagePanel.parentNode.insertBefore(host, passagePanel);
        const mobileAd = page.querySelector('.gju-quiz-ad--mobile-mid');
        if (mobileAd && mobileAd.nextElementSibling === passagePanel) {
          host.appendChild(mobileAd);
        }
        host.appendChild(passagePanel);
      }
      wrapRailHost(host);
      const slot = makeSlot('skyscraper', '120x600');
      slot.classList.add('gju-quiz-ad--desktop-only', 'gju-quiz-ad--rail');
      host.appendChild(slot);
    }
  };

  const injectSlots = () => {
    if (indexPage) injectIndex(indexPage);
    else if (examPage) injectExam(examPage);
  };

  const fireBanners = () => {
    [
      ['mobile-mid', zones.mobile300x250, () => isMobile()],
      ['skyscraper', zones.desktop120x600, () => isDesktop()]
    ].forEach(([slotKey, zoneId, shouldShow]) => {
      if (!zoneId || !shouldShow()) return;
      runBannerIn(document.querySelector(`[data-adcash-frame="${slotKey}"]`), zoneId);
    });
  };

  const hideEmptySlots = () => {
    document.querySelectorAll('.gju-quiz-ad[data-adcash-slot]').forEach((slot) => {
      if (window.getComputedStyle(slot).display === 'none') return;
      const frame = slot.querySelector('.gju-quiz-ad-frame');
      if (!frame) return;
      const hasCreative = Boolean(
        frame.querySelector('iframe, img, a, object, embed')
        || frame.children.length > 1
        || (frame.offsetHeight > 40 && frame.innerHTML.replace(/<script[\s\S]*?<\/script>/gi, '').trim().length > 20)
      );
      if (!hasCreative) {
        slot.classList.add('is-empty');
        slot.hidden = true;
      }
    });
  };

  const boot = async () => {
    ensureCss();
    try {
      await loadAclib();
    } catch {
      return;
    }
    injectSlots();
    fireBanners();
    window.setTimeout(hideEmptySlots, CONFIG.emptyHideMs);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
})();
