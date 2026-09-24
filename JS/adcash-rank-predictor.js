(() => {
  'use strict';

  // Adsterra — Rank Predictor landing + form pages
  // Units: same as quiz/jobs (160×600 + 300×250)
  const CONFIG = {
    enabled: true,
    invokeHost: 'www.highperformanceformat.com',
    units: {
      skyscraper: {
        key: 'b4cefd61066cf540b9a4543442f3bcb8',
        width: 160,
        height: 600
      },
      rectangle: {
        key: '87119e54e06ec212fda2497c6e91b073',
        width: 300,
        height: 250
      }
    },
    cssHref: '/CSS/adcash-quiz-category.css?v=20260925-rank',
    emptyHideMs: 4000,
    emptyRecheckMs: [7000, 11000],
    bannerGapMs: 400,
    desktopMinPx: 1100
  };

  window.ADSTERRA_RANK_PREDICTOR_CONFIG = CONFIG;

  const landing = document.querySelector('main.rank-cards-page, #rankCardsApp');
  const formPage = document.querySelector('main.rank-predictor-page, #rankPredictorApp');
  if (!CONFIG.enabled || (!landing && !formPage)) return;
  if (window.matchMedia('(print)').matches) return;

  const units = CONFIG.units || {};
  if (!units.skyscraper?.key && !units.rectangle?.key) return;

  const isDesktop = () => window.matchMedia(`(min-width: ${CONFIG.desktopMinPx}px)`).matches;
  const isMobile = () => !isDesktop();

  const ensureCss = () => {
    if (document.querySelector('link[data-adcash-quiz-css], link[data-adcash-rank-css]')) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = CONFIG.cssHref;
    link.dataset.adcashRankCss = '1';
    document.head.appendChild(link);
  };

  const makeSlot = (slotKey, sizeLabel) => {
    const wrap = document.createElement('aside');
    wrap.className = `gju-quiz-ad gju-quiz-ad--${slotKey}`;
    wrap.dataset.adSlot = slotKey;
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

  const wrapRailHost = (host) => {
    if (!host || host.querySelector(':scope > .gju-quiz-ad-rail-main')) {
      return host.querySelector(':scope > .gju-quiz-ad-rail-main') || host;
    }
    const mainCol = document.createElement('div');
    mainCol.className = 'gju-quiz-ad-rail-main';
    while (host.firstChild) mainCol.appendChild(host.firstChild);
    host.classList.add('gju-rank-ad-host', 'gju-quiz-ad-host-ready', 'has-quiz-ad-rail');
    host.classList.remove('ad-rail-empty');
    host.appendChild(mainCol);
    return mainCol;
  };

  const injectLanding = (page) => {
    const search = page.querySelector('.rank-search-panel');
    const grid = page.querySelector('#rankCardGrid, .rank-card-grid');
    const note = page.querySelector('.rank-cards-note');

    if (units.rectangle?.key && (search || grid)) {
      const slot = makeSlot('mobile-mid', '300x250');
      slot.classList.add('gju-quiz-ad--mobile-only');
      if (search) search.insertAdjacentElement('afterend', slot);
      else grid.insertAdjacentElement('beforebegin', slot);
    }

    if (units.skyscraper?.key && grid && isDesktop()) {
      let host = page.querySelector('.gju-rank-ad-host');
      if (!host) {
        host = document.createElement('div');
        host.className = 'gju-rank-ad-host';
        const start = search || grid;
        start.parentNode.insertBefore(host, start);
        [search, page.querySelector('.gju-quiz-ad--mobile-mid'), grid, note]
          .filter(Boolean)
          .forEach((el) => {
            if (host.contains(el)) return;
            host.appendChild(el);
          });
      }
      wrapRailHost(host);
      const slot = makeSlot('skyscraper', '160x600');
      slot.classList.add('gju-quiz-ad--desktop-only', 'gju-quiz-ad--rail');
      host.appendChild(slot);
    }
  };

  const injectForm = (page) => {
    const hero = page.querySelector('.predictor-hero');
    const tabs = page.querySelector('.tab-card');
    const workspace = page.querySelector('.predictor-workspace');
    const formsCol = page.querySelector('.forms-column');

    // 300×250 — after hero / before tabs (never inside form fields)
    if (units.rectangle?.key) {
      const slot = makeSlot('mobile-mid', '300x250');
      slot.classList.add('gju-quiz-ad--mobile-only');
      if (tabs) tabs.insertAdjacentElement('beforebegin', slot);
      else if (hero) hero.insertAdjacentElement('afterend', slot);
      else page.insertBefore(slot, page.firstChild);
    }

    // 160×600 — desktop rail beside workspace
    if (units.skyscraper?.key && isDesktop() && (workspace || formsCol)) {
      let host = page.querySelector('.gju-rank-ad-host');
      if (!host) {
        host = document.createElement('div');
        host.className = 'gju-rank-ad-host';
        const anchor = workspace || formsCol;
        anchor.parentNode.insertBefore(host, anchor);
        host.appendChild(anchor);
        const mid = page.querySelector('.gju-quiz-ad--mobile-mid');
        if (mid && mid.parentNode === page) host.insertBefore(mid, host.firstChild);
      }
      wrapRailHost(host);
      const slot = makeSlot('skyscraper', '160x600');
      slot.classList.add('gju-quiz-ad--desktop-only', 'gju-quiz-ad--rail');
      host.appendChild(slot);
    }
  };

  const invokeUrl = (key) => {
    const host = String(CONFIG.invokeHost || 'www.highperformanceformat.com').replace(/^https?:\/\//, '');
    return `https://${host}/${key}/invoke.js`;
  };

  const loadBannerInto = (frame, unit) => new Promise((resolve) => {
    if (!frame || !unit?.key) {
      resolve(false);
      return;
    }
    frame.innerHTML = '';
    const opts = {
      key: unit.key,
      format: 'iframe',
      height: unit.height,
      width: unit.width,
      params: {}
    };
    window.atOptions = opts;
    const conf = document.createElement('script');
    conf.type = 'text/javascript';
    conf.textContent = `atOptions = ${JSON.stringify(opts)};`;
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = invokeUrl(unit.key);
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    frame.appendChild(conf);
    frame.appendChild(script);
  });

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  const fireBanners = async () => {
    const queue = [
      ['mobile-mid', units.rectangle, () => isMobile()],
      ['skyscraper', units.skyscraper, () => isDesktop()]
    ];
    for (const [slotKey, unit, shouldShow] of queue) {
      if (!unit?.key || !shouldShow()) continue;
      const frame = document.querySelector(`[data-ad-frame="${slotKey}"]`);
      if (!frame) continue;
      await loadBannerInto(frame, unit);
      await sleep(CONFIG.bannerGapMs || 400);
    }
  };

  const expectedMinFill = (slot) => {
    const key = slot.dataset.adSlot || '';
    if (key === 'skyscraper') return 280;
    return 100;
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

  const syncRail = () => {
    document.querySelectorAll('.gju-rank-ad-host').forEach((host) => {
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
    syncRail();
  };

  const boot = async () => {
    ensureCss();
    if (landing) injectLanding(landing);
    else if (formPage) injectForm(formPage);
    await fireBanners();
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