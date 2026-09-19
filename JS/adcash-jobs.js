(() => {
  'use strict';

  // Adcash ads — /jobs/ pages only.
  const CONFIG = {
    enabled: true,
    zones: {
      // Desktop — Latest Update ke baad
      desktop728x90: '12187254',
      // Desktop — sidebar rail
      desktop120x600: '12187246',
      // 300×250 — mobile top + mid (fill rate strong)
      mobile300x250: '12187270',
      // Optional thin strip — only used if 300×250 missing
      mobile300x100: '12187262'
    },
    autotagZoneId: '',
    aclibSrc: 'https://acscdn.com/script/aclib.js',
    emptyHideMs: 4000
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
  const isDesktop = () => window.matchMedia('(min-width: 861px)').matches;
  const isMobile = () => !isDesktop();

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
    wrap.innerHTML = `<div class="gjd-ad-label">Ad</div><div class="gjd-ad-frame" data-adcash-frame="${slotKey}" data-ad-size="${sizeLabel}"></div>`;
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
      // Desktop leaderboard under Latest Update
      if (filledZones.desktop728x90) {
        const slot = makeSlot('leaderboard', '728x90');
        slot.classList.add('gjd-ad--desktop-only');
        updateStrip.insertAdjacentElement('afterend', slot);
      }

      // Mobile: put strong 300×250 just under Latest Update (hero/update area)
      // 300×100 often has no fill — leave empty "AD" box, so prefer 300×250 here.
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

    // Mid content — before Important Links (desktop + mobile)
    if (links && links.parentNode && filledZones.mobile300x250) {
      const slot = makeSlot('rectangle', '300x250');
      links.insertAdjacentElement('beforebegin', slot);
    }

    // Desktop skyscraper rail beside Quick Nav
    if (layout && filledZones.desktop120x600) {
      const slot = makeSlot('skyscraper', '120x600');
      slot.classList.add('gjd-ad--desktop-only', 'gjd-ad--rail');
      layout.classList.add('has-ad-rail');
      if (sidebar && sidebar.parentNode === layout) {
        sidebar.insertAdjacentElement('afterend', slot);
      } else {
        layout.appendChild(slot);
      }
    }
  };

  const fireDisplayBanners = () => {
    const map = [
      ['leaderboard', filledZones.desktop728x90, () => isDesktop()],
      ['mobile-top', filledZones.mobile300x250, () => isMobile()],
      ['mobile-strip', filledZones.mobile300x100, () => isMobile() && !filledZones.mobile300x250],
      ['rectangle', filledZones.mobile300x250, () => true],
      ['skyscraper', filledZones.desktop120x600, () => isDesktop()]
    ];

    map.forEach(([slotKey, zoneId, shouldShow]) => {
      if (!zoneId || !shouldShow()) return;
      const frame = document.querySelector(`[data-adcash-frame="${slotKey}"]`);
      runBannerIn(frame, zoneId);
    });
  };

  const hideEmptySlots = () => {
    document.querySelectorAll('.gjd-ad[data-adcash-slot]').forEach((slot) => {
      if (window.getComputedStyle(slot).display === 'none') return;
      const frame = slot.querySelector('.gjd-ad-frame');
      if (!frame) return;
      const hasCreative = Boolean(
        frame.querySelector('iframe, img, a, object, embed')
        || (frame.children.length > 1)
        || (frame.offsetHeight > 40 && frame.innerHTML.replace(/<script[\s\S]*?<\/script>/gi, '').trim().length > 20)
      );
      if (!hasCreative) {
        slot.classList.add('is-empty');
        slot.hidden = true;
      }
    });
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
      window.setTimeout(hideEmptySlots, CONFIG.emptyHideMs);
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
