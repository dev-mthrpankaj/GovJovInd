(() => {
  'use strict';

  // Adsterra banners — /jobs/ pages only
  // Replaces AdCash; same slot layout (728x90, 160x600 rail, 300x250, 320x50)
  const CONFIG = {
    enabled: true,
    // If ads blank: open Adsterra COPY CODE and paste exact invoke host here
    invokeHost: 'www.highperformanceformat.com',
    units: {
      leaderboard: {
        key: '83b45963c9b5e297e2716b97e5e7f1cd',
        width: 728,
        height: 90
      },
      skyscraper: {
        key: 'b4cefd61066cf540b9a4543442f3bcb8',
        width: 160,
        height: 600
      },
      rectangle: {
        key: '87119e54e06ec212fda2497c6e91b073',
        width: 300,
        height: 250
      },
      mobileStrip: {
        key: 'cdd822299805deaaddd42d620ded189a',
        width: 320,
        height: 50
      }
    },
    emptyHideMs: 4000,
    emptyRecheckMs: [7000, 11000],
    railFinalCheckMs: 12000,
    // Sequential load avoids global atOptions race (Adsterra limit)
    bannerGapMs: 400
  };

  window.ADSTERRA_JOBS_CONFIG = CONFIG;

  const path = String(window.location.pathname || '').replace(/\\/g, '/');
  if (!CONFIG.enabled || !/\/jobs\//i.test(path)) return;
  if (window.matchMedia('(print)').matches) return;

  const units = CONFIG.units || {};
  const isDesktopLeader = () => window.matchMedia('(min-width: 861px)').matches;
  const isDesktopRail = () => window.matchMedia('(min-width: 1101px)').matches;
  const isMobile = () => !isDesktopLeader();

  const makeSlot = (slotKey, sizeLabel) => {
    const wrap = document.createElement('aside');
    wrap.className = `gjd-ad gjd-ad--${slotKey}`;
    wrap.dataset.adSlot = slotKey;
    wrap.setAttribute('aria-label', 'Advertisement');
    wrap.innerHTML = `
      <div class="gjd-ad-label">
        <span class="gjd-ad-label-tag">Ad</span>
        <span class="gjd-ad-label-note">GovJobUpdates does not endorse this.</span>
      </div>
      <div class="gjd-ad-frame" data-ad-frame="${slotKey}" data-ad-size="${sizeLabel}"></div>
    `.trim();
    return wrap;
  };

  const injectDisplaySlots = () => {
    const updateStrip = document.querySelector('.gjd-page .gjd-update-strip');
    const links = document.querySelector('.gjd-page #important-links');
    const sidebar = document.querySelector('.gjd-page .gjd-sidebar');
    const layout = document.querySelector('.gjd-page .gjd-layout');

    if (updateStrip && updateStrip.parentNode) {
      if (units.leaderboard?.key) {
        const slot = makeSlot('leaderboard', '728x90');
        slot.classList.add('gjd-ad--desktop-only');
        updateStrip.insertAdjacentElement('afterend', slot);
      }

      if (units.rectangle?.key) {
        const slot = makeSlot('mobile-top', '300x250');
        slot.classList.add('gjd-ad--mobile-only', 'gjd-ad--rectangle');
        updateStrip.insertAdjacentElement('afterend', slot);
      } else if (units.mobileStrip?.key) {
        const slot = makeSlot('mobile-strip', '320x50');
        slot.classList.add('gjd-ad--mobile-only');
        updateStrip.insertAdjacentElement('afterend', slot);
      }
    }

    if (links && links.parentNode && units.rectangle?.key) {
      const slot = makeSlot('rectangle', '300x250');
      links.insertAdjacentElement('beforebegin', slot);
    }

    // Skyscraper 160x600 — reserve rail first (no CLS jump)
    if (layout && units.skyscraper?.key && isDesktopRail()) {
      layout.classList.add('has-ad-rail');
      const slot = makeSlot('skyscraper', '160x600');
      slot.classList.add('gjd-ad--desktop-only', 'gjd-ad--rail');
      if (sidebar && sidebar.parentNode === layout) {
        sidebar.insertAdjacentElement('afterend', slot);
      } else {
        layout.appendChild(slot);
      }
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

    // Clear previous
    frame.innerHTML = '';

    const opts = {
      key: unit.key,
      format: 'iframe',
      height: unit.height,
      width: unit.width,
      params: {}
    };

    // Set global just before this unit's invoke (Adsterra reads window.atOptions)
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

  const fireDisplayBanners = async () => {
    const queue = [
      ['leaderboard', units.leaderboard, () => isDesktopLeader()],
      ['mobile-top', units.rectangle, () => isMobile()],
      ['mobile-strip', units.mobileStrip, () => isMobile() && !units.rectangle?.key],
      ['rectangle', units.rectangle, () => true],
      ['skyscraper', units.skyscraper, () => isDesktopRail()]
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
    if (key === 'leaderboard') return 50;
    if (key === 'mobile-strip') return 40;
    return 100;
  };

  const creativeFillPx = (frame) => {
    if (!frame) return 0;
    const nodes = frame.querySelectorAll('iframe, img, object, embed, video, a, ins, div');
    let maxH = 0;
    nodes.forEach((node) => {
      const h = Math.max(node.offsetHeight || 0, node.clientHeight || 0);
      if (h > maxH) maxH = h;
    });
    if (!maxH) maxH = Math.max(frame.scrollHeight || 0, frame.offsetHeight || 0);
    return maxH;
  };

  const slotLooksFilled = (slot) => {
    const frame = slot.querySelector('.gjd-ad-frame');
    if (!frame) return false;
    const fill = creativeFillPx(frame);
    if (fill < expectedMinFill(slot)) return false;
    const hasMedia = Boolean(frame.querySelector('iframe, img, object, embed, video'));
    const hasLinks = frame.querySelectorAll('a').length > 0;
    const htmlLen = frame.innerHTML.replace(/<script[\s\S]*?<\/script>/gi, '').trim().length;
    return hasMedia || (hasLinks && fill >= expectedMinFill(slot)) || htmlLen > 80;
  };

  const syncAdRailLayout = (allowCollapse) => {
    const layout = document.querySelector('.gjd-page .gjd-layout');
    if (!layout) return;

    const sky = layout.querySelector('.gjd-ad--skyscraper.gjd-ad--rail');
    if (!sky) {
      layout.classList.remove('has-ad-rail', 'ad-rail-empty');
      return;
    }

    const skyLive = Boolean(
      sky
      && !sky.classList.contains('is-empty')
      && sky.classList.contains('is-filled')
      && window.getComputedStyle(sky).display !== 'none'
    );

    if (skyLive) {
      layout.classList.add('has-ad-rail');
      layout.classList.remove('ad-rail-empty');
      sky.hidden = false;
    } else if (allowCollapse) {
      layout.classList.remove('has-ad-rail');
      layout.classList.add('ad-rail-empty');
      sky.hidden = true;
    } else {
      layout.classList.add('has-ad-rail');
      layout.classList.remove('ad-rail-empty');
    }
  };

  const hideEmptySlots = (allowRailCollapse) => {
    document.querySelectorAll('.gjd-ad[data-ad-slot]').forEach((slot) => {
      const isSky = slot.dataset.adSlot === 'skyscraper';

      if (window.getComputedStyle(slot).display === 'none' && !isSky) return;

      if (slotLooksFilled(slot)) {
        slot.classList.remove('is-empty');
        slot.classList.add('is-filled');
        slot.hidden = false;
        return;
      }

      slot.classList.add('is-empty');
      slot.classList.remove('is-filled');

      if (isSky) {
        if (allowRailCollapse) slot.hidden = true;
        return;
      }

      slot.hidden = true;
    });

    syncAdRailLayout(Boolean(allowRailCollapse));
  };

  const boot = async () => {
    injectDisplaySlots();
    await fireDisplayBanners();

    window.setTimeout(() => hideEmptySlots(false), CONFIG.emptyHideMs);
    (CONFIG.emptyRecheckMs || []).forEach((ms) => {
      window.setTimeout(() => hideEmptySlots(false), ms);
    });
    window.setTimeout(() => hideEmptySlots(true), CONFIG.railFinalCheckMs);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
})();