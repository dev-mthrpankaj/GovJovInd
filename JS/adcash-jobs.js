(() => {
  'use strict';

  // Adcash ads — /jobs/ pages only.
  // Fixed: reserve rail column + 600px height BEFORE creative loads (no bottom→side jump).
  const CONFIG = {
    enabled: true,
    zones: {
      desktop728x90: '12187254',
      desktop120x600: '12187246',
      mobile300x250: '12187270',
      mobile300x100: '12187262'
    },
    autotagZoneId: '',
    aclibSrc: 'https://acscdn.com/script/aclib.js',
    emptyHideMs: 3500,
    emptyRecheckMs: [5500, 9000],
    // Final rail collapse only once (avoid mid-load grid jumps)
    railFinalCheckMs: 10000
  };

  window.ADCASH_JOBS_CONFIG = CONFIG;

  const path = String(window.location.pathname || '').replace(/\\/g, '/');
  if (!CONFIG.enabled || !/\/jobs\//i.test(path)) return;
  if (window.matchMedia('(print)').matches) return;

  const zones = CONFIG.zones || {};
  const filledZones = Object.fromEntries(
    Object.entries(zones).filter(([, id]) => Boolean(String(id || '').trim()))
  );
  const hasDisplay = Object.keys(filledZones).length > 0;

  const isDesktopLeader = () => window.matchMedia('(min-width: 861px)').matches;
  const isDesktopRail = () => window.matchMedia('(min-width: 1101px)').matches;
  const isMobile = () => !isDesktopLeader();

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
    wrap.className = `gjd-ad gjd-ad--${slotKey}`;
    wrap.dataset.adcashSlot = slotKey;
    wrap.setAttribute('aria-label', 'Advertisement');
    wrap.innerHTML = `
      <div class="gjd-ad-label">
        <span class="gjd-ad-label-tag">Ad</span>
        <span class="gjd-ad-label-note">GovJobUpdates does not endorse this.</span>
      </div>
      <div class="gjd-ad-frame" data-adcash-frame="${slotKey}" data-ad-size="${sizeLabel}"></div>
    `.trim();
    return wrap;
  };

  const runBannerIn = (frame, zoneId) => {
    if (!frame || !zoneId || !window.aclib || typeof window.aclib.runBanner !== 'function') return;
    const runner = document.createElement('script');
    runner.textContent = `aclib.runBanner({ zoneId: ${JSON.stringify(String(zoneId))} });`;
    frame.appendChild(runner);
  };

  const injectDisplaySlots = () => {
    const updateStrip = document.querySelector('.gjd-page .gjd-update-strip');
    const links = document.querySelector('.gjd-page #important-links');
    const sidebar = document.querySelector('.gjd-page .gjd-sidebar');
    const layout = document.querySelector('.gjd-page .gjd-layout');

    if (updateStrip && updateStrip.parentNode) {
      if (filledZones.desktop728x90) {
        const slot = makeSlot('leaderboard', '728x90');
        slot.classList.add('gjd-ad--desktop-only');
        updateStrip.insertAdjacentElement('afterend', slot);
      }

      if (filledZones.mobile300x250) {
        const slot = makeSlot('mobile-top', '300x250');
        slot.classList.add('gjd-ad--mobile-only', 'gjd-ad--rectangle');
        updateStrip.insertAdjacentElement('afterend', slot);
      } else if (filledZones.mobile300x100) {
        const slot = makeSlot('mobile-strip', '300x100');
        slot.classList.add('gjd-ad--mobile-only');
        updateStrip.insertAdjacentElement('afterend', slot);
      }
    }

    if (links && links.parentNode && filledZones.mobile300x250) {
      const slot = makeSlot('rectangle', '300x250');
      links.insertAdjacentElement('beforebegin', slot);
    }

    // Skyscraper: reserve column FIRST, then inject — no bottom→side jump
    if (layout && filledZones.desktop120x600 && isDesktopRail()) {
      layout.classList.add('has-ad-rail');

      const slot = makeSlot('skyscraper', '120x600');
      slot.classList.add('gjd-ad--desktop-only', 'gjd-ad--rail');

      if (sidebar && sidebar.parentNode === layout) {
        sidebar.insertAdjacentElement('afterend', slot);
      } else {
        layout.appendChild(slot);
      }
    }
  };

  const fireDisplayBanners = () => {
    const map = [
      ['leaderboard', filledZones.desktop728x90, () => isDesktopLeader()],
      ['mobile-top', filledZones.mobile300x250, () => isMobile()],
      ['mobile-strip', filledZones.mobile300x100, () => isMobile() && !filledZones.mobile300x250],
      ['rectangle', filledZones.mobile300x250, () => true],
      ['skyscraper', filledZones.desktop120x600, () => isDesktopRail()]
    ];

    map.forEach(([slotKey, zoneId, shouldShow]) => {
      if (!zoneId || !shouldShow()) return;
      const frame = document.querySelector(`[data-adcash-frame="${slotKey}"]`);
      runBannerIn(frame, zoneId);
    });
  };

  const expectedMinFill = (slot) => {
    const key = slot.dataset.adcashSlot || '';
    if (key === 'skyscraper') return 280;
    if (key === 'leaderboard') return 50;
    if (key === 'mobile-strip') return 60;
    return 120;
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
    const minFill = expectedMinFill(slot);
    if (fill < minFill) return false;
    const hasMedia = Boolean(frame.querySelector('iframe, img, object, embed, video'));
    const hasLinks = frame.querySelectorAll('a').length > 0;
    const htmlLen = frame.innerHTML.replace(/<script[\s\S]*?<\/script>/gi, '').trim().length;
    return hasMedia || (hasLinks && fill >= minFill) || htmlLen > 80;
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

    // Keep column open during load; collapse only on final check
    if (skyLive) {
      layout.classList.add('has-ad-rail');
      layout.classList.remove('ad-rail-empty');
      sky.hidden = false;
    } else if (allowCollapse) {
      layout.classList.remove('has-ad-rail');
      layout.classList.add('ad-rail-empty');
      sky.hidden = true;
    } else {
      // Still loading — keep rail reserved, dim empty state only
      layout.classList.add('has-ad-rail');
      layout.classList.remove('ad-rail-empty');
    }
  };

  const hideEmptySlots = (allowRailCollapse) => {
    document.querySelectorAll('.gjd-ad[data-adcash-slot]').forEach((slot) => {
      const isSky = slot.dataset.adcashSlot === 'skyscraper';

      if (window.getComputedStyle(slot).display === 'none' && !isSky) return;

      if (slotLooksFilled(slot)) {
        slot.classList.remove('is-empty');
        slot.classList.add('is-filled');
        slot.hidden = false;
        return;
      }

      slot.classList.add('is-empty');
      slot.classList.remove('is-filled');

      // Skyscraper: don't collapse column until final check
      if (isSky) {
        if (allowRailCollapse) slot.hidden = true;
        // else keep in DOM with reserved height (CSS handles dim)
        return;
      }

      slot.hidden = true;
    });

    syncAdRailLayout(Boolean(allowRailCollapse));
  };

  const runAutotagFallback = () => {
    const zoneId = String(CONFIG.autotagZoneId || '').trim();
    if (!zoneId || typeof window.aclib.runAutoTag !== 'function') return;
    window.aclib.runAutoTag({ zoneId });
  };

  const boot = async () => {
    try {
      await loadAclib();
    } catch {
      return;
    }

    if (hasDisplay) {
      injectDisplaySlots();
      fireDisplayBanners();

      // Soft checks — keep rail open
      window.setTimeout(() => hideEmptySlots(false), CONFIG.emptyHideMs);
      (CONFIG.emptyRecheckMs || []).forEach((ms) => {
        window.setTimeout(() => hideEmptySlots(false), ms);
      });

      // One final collapse if still empty
      window.setTimeout(() => hideEmptySlots(true), CONFIG.railFinalCheckMs);
      return;
    }

    runAutotagFallback();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
})();