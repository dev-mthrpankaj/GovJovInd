(() => {
  'use strict';

  // Adcash Display — quiz category pages only (exam family + subject)
  // Not on quiz landing (quiz.html) or quiz attempt pages.
  const CONFIG = {
    enabled: true,
    zones: {
      desktop120x600: '12187246',
      mobile300x250: '12187270'
    },
    aclibSrc: 'https://acscdn.com/script/aclib.js',
    cssHref: '../CSS/adcash-quiz-category.css?v=20260919-railpark',
    emptyHideMs: 4000,
    desktopMinPx: 1100
  };

  window.ADCASH_QUIZ_CATEGORY_CONFIG = CONFIG;

  const familyPage = document.querySelector('main.family-quiz-page');
  const subjectPage = document.querySelector('main.subject-quiz-page, main[data-subject-quiz-page]');
  if (!CONFIG.enabled || (!familyPage && !subjectPage)) return;
  if (window.matchMedia('(print)').matches) return;

  const zones = Object.fromEntries(
    Object.entries(CONFIG.zones || {}).filter(([, id]) => Boolean(String(id || '').trim()))
  );
  if (!Object.keys(zones).length) return;

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
    if (!host || host.querySelector(':scope > .gju-quiz-ad-rail-main')) {
      return host.querySelector(':scope > .gju-quiz-ad-rail-main') || host;
    }
    const mainCol = document.createElement('div');
    mainCol.className = 'gju-quiz-ad-rail-main';
    while (host.firstChild) mainCol.appendChild(host.firstChild);
    // Grid side-rail from inject — prevents skyscraper stacking under content first
    host.classList.add('gju-quiz-ad-host-ready', 'has-quiz-ad-rail');
    host.classList.remove('ad-rail-empty');
    host.appendChild(mainCol);
    return mainCol;
  };

  const injectSlots = () => {
    // --- Exam family pages (SSC / Banking / Police / RRB) ---
    if (familyPage) {
      const discovery = familyPage.querySelector('.family-discovery');
      const grid = familyPage.querySelector('#familyQuizList, .family-quiz-grid');
      const listHead = familyPage.querySelector('.family-list-head');

      if (zones.mobile300x250 && grid && grid.parentNode) {
        const slot = makeSlot('mobile-mid', '300x250');
        slot.classList.add('gju-quiz-ad--mobile-only');
        if (listHead && listHead.parentNode === grid.parentNode) {
          listHead.insertAdjacentElement('afterend', slot);
        } else {
          grid.insertAdjacentElement('beforebegin', slot);
        }
      }

      if (zones.desktop120x600 && discovery) {
        wrapRailHost(discovery);
        const slot = makeSlot('skyscraper', '120x600');
        slot.classList.add('gju-quiz-ad--desktop-only', 'gju-quiz-ad--rail');
        discovery.appendChild(slot);
      }
      return;
    }

    // --- Subject pages (Maths / English / …) ---
    if (subjectPage) {
      const sets = subjectPage.querySelector('#subject-sets, .subject-sets-section');
      const grid = subjectPage.querySelector('[data-subject-quiz-list], .subject-quiz-grid');
      const heading = sets && sets.querySelector('.subject-quiz-heading');

      if (zones.mobile300x250 && grid && grid.parentNode) {
        const slot = makeSlot('mobile-mid', '300x250');
        slot.classList.add('gju-quiz-ad--mobile-only');
        const countLine = sets && sets.querySelector('.subject-quiz-count-line');
        if (countLine) countLine.insertAdjacentElement('afterend', slot);
        else if (heading) heading.insertAdjacentElement('afterend', slot);
        else grid.insertAdjacentElement('beforebegin', slot);
      }

      if (zones.desktop120x600 && sets) {
        wrapRailHost(sets);
        const slot = makeSlot('skyscraper', '120x600');
        slot.classList.add('gju-quiz-ad--desktop-only', 'gju-quiz-ad--rail');
        sets.appendChild(slot);
      }
    }
  };

  const fireBanners = () => {
    const map = [
      ['mobile-mid', zones.mobile300x250, () => isMobile()],
      ['skyscraper', zones.desktop120x600, () => isDesktop()]
    ];
    map.forEach(([slotKey, zoneId, shouldShow]) => {
      if (!zoneId || !shouldShow()) return;
      runBannerIn(document.querySelector(`[data-adcash-frame="${slotKey}"]`), zoneId);
    });
  };

  const expectedMinFill = (slot) => {
    const key = slot.dataset.adcashSlot || '';
    if (key === 'skyscraper') return 280;
    return 120;
  };

  const creativeFillPx = (frame) => {
    if (!frame) return 0;
    let maxH = 0;
    frame.querySelectorAll('iframe, img, object, embed, video, a, ins, div').forEach((node) => {
      maxH = Math.max(maxH, node.offsetHeight || 0, node.clientHeight || 0);
    });
    if (!maxH) maxH = Math.max(frame.scrollHeight || 0, frame.offsetHeight || 0);
    return maxH;
  };

  const slotLooksFilled = (slot) => {
    const frame = slot.querySelector('.gju-quiz-ad-frame');
    if (!frame) return false;
    const fill = creativeFillPx(frame);
    if (fill < expectedMinFill(slot)) return false;
    const hasMedia = Boolean(frame.querySelector('iframe, img, object, embed, video'));
    const hasLinks = frame.querySelectorAll('a').length > 0;
    const htmlLen = frame.innerHTML.replace(/<script[\s\S]*?<\/script>/gi, '').trim().length;
    return hasMedia || (hasLinks && fill >= expectedMinFill(slot)) || htmlLen > 80;
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
    document.querySelectorAll('.gju-quiz-ad[data-adcash-slot]').forEach((slot) => {
      if (slotLooksFilled(slot)) {
        slot.classList.remove('is-empty');
        slot.hidden = false;
        slot.classList.add('is-filled');
        return;
      }
      slot.classList.add('is-empty');
      slot.classList.remove('is-filled');
      slot.hidden = true;
    });
    syncQuizAdRail();
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
    window.setTimeout(hideEmptySlots, 5500);
    window.setTimeout(hideEmptySlots, 9000);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
})();
