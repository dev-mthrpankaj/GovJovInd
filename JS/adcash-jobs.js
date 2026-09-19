(() => {
  'use strict';

  // Adcash ads — /jobs/ pages only. Paste Display zone IDs below when ready.
  const CONFIG = {
    enabled: true,
    zones: {
      // Desktop — Latest Update ke baad
      desktop728x90: '12187254',
      // Desktop — sidebar
      desktop120x600: '12187246',
      // Mobile priority (+ desktop mid before Important Links)
      mobile300x250: '12187270',
      // Mobile — thin strip under Latest Update
      mobile300x100: '12187262'
    },
    // Display zones active — Autotag off
    autotagZoneId: '',
    aclibSrc: 'https://acscdn.com/script/aclib.js'
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
    const content = document.querySelector('.gjd-page .gjd-content');
    const updateStrip = document.querySelector('.gjd-page .gjd-update-strip');
    const links = document.querySelector('.gjd-page #important-links');
    const sidebar = document.querySelector('.gjd-page .gjd-sidebar');

    if (updateStrip && updateStrip.parentNode) {
      if (filledZones.desktop728x90) {
        const slot = makeSlot('leaderboard', '728x90');
        slot.classList.add('gjd-ad--desktop-only');
        updateStrip.insertAdjacentElement('afterend', slot);
      }
      if (filledZones.mobile300x100) {
        const slot = makeSlot('mobile-strip', '300x100');
        slot.classList.add('gjd-ad--mobile-only');
        updateStrip.insertAdjacentElement('afterend', slot);
      }
    }

    if (links && links.parentNode && filledZones.mobile300x250) {
      const slot = makeSlot('rectangle', '300x250');
      links.insertAdjacentElement('beforebegin', slot);
    }

    if (sidebar && filledZones.desktop120x600) {
      const slot = makeSlot('skyscraper', '120x600');
      slot.classList.add('gjd-ad--desktop-only', 'gjd-ad--sidebar');
      sidebar.appendChild(slot);
    }

    // Fallback mid placement if update strip missing but content exists
    if (content && !document.querySelector('[data-adcash-slot="rectangle"]') && filledZones.mobile300x250 && links) {
      /* already handled above */
    }
  };

  const fireDisplayBanners = () => {
    const map = [
      ['leaderboard', filledZones.desktop728x90, () => isDesktop()],
      ['mobile-strip', filledZones.mobile300x100, () => isMobile()],
      ['rectangle', filledZones.mobile300x250, () => true],
      ['skyscraper', filledZones.desktop120x600, () => isDesktop()]
    ];

    map.forEach(([slotKey, zoneId, shouldShow]) => {
      if (!zoneId || !shouldShow()) return;
      const frame = document.querySelector(`[data-adcash-frame="${slotKey}"]`);
      runBannerIn(frame, zoneId);
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
      return;
    }

    // No Display zones yet — Autotag only on /jobs/ so ads can start today
    runAutotagFallback();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
})();
