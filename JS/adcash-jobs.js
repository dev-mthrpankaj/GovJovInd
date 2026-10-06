(() => {
  'use strict';

  // ====================== ADSTERRA ======================
  const ADSTERRA = {
    enabled: true,
    invokeHost: 'www.highperformanceformat.com',
    units: {
      leaderboard: { key: '83b45963c9b5e297e2716b97e5e7f1cd', width: 728, height: 90 },
      skyscraper:  { key: 'b4cefd61066cf540b9a4543442f3bcb8', width: 160, height: 600 },
      rectangle:   { key: '87119e54e06ec212fda2497c6e91b073', width: 300, height: 250 },
      mobileStrip: { key: 'cdd822299805deaaddd42d620ded189a', width: 320, height: 50 }
    },
    bannerGapMs: 400
  };

  // ====================== EXOCLICK ======================
  const EXOCLICK = {
    enabled: true,
    providerScript: 'https://a.magsrv.com/ad-provider.js',
    zones: {
      beforeVacancy: '6048598',          // Jobs-300x250-1
      betweenEligibilityFee: '6048602'   // Jobs-300x250-2
    }
  };

  // Only on /jobs/ pages
  const path = String(window.location.pathname || '').replace(/\\/g, '/');
  if (!/\/jobs\//i.test(path)) return;
  if (window.matchMedia('(print)').matches) return;

  // ---------- Helper ----------
  const makeSlot = (slotKey, network = 'adsterra') => {
    const wrap = document.createElement('aside');
    wrap.className = `gjd-ad gjd-ad--${slotKey} gjd-ad--${network}`;
    wrap.dataset.adSlot = slotKey;
    wrap.setAttribute('aria-label', 'Advertisement');
    if (network === 'exoclick') {
      wrap.style.minHeight = '280px';
    }
    wrap.innerHTML = `
      <div class="gjd-ad-label">
        <span class="gjd-ad-label-tag">Ad</span>
        <span class="gjd-ad-label-note">GovJobUpdates does not endorse this.</span>
      </div>
      <div class="gjd-ad-frame" data-ad-frame="${slotKey}"></div>
    `;
    return wrap;
  };

  // ---------- Force Load ExoClick Provider ----------
  const loadExoProvider = () => {
    return new Promise((resolve) => {
      if (document.querySelector('script[src*="a.magsrv.com/ad-provider.js"]')) {
        resolve(true);
        return;
      }

      const script = document.createElement('script');
      script.async = true;
      script.type = 'application/javascript';
      script.src = EXOCLICK.providerScript;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.head.appendChild(script);
    });
  };

  // ---------- Inject ExoClick 300x250 ----------
  const injectExoClick = async () => {
    if (!EXOCLICK.enabled) return;

    // Force load provider
    await loadExoProvider();

    // Wait for provider to be ready
    await new Promise(r => setTimeout(r, 1200));

    // 1. Before Vacancy Details
    const vacancy = document.querySelector('#vacancy-details');
    if (vacancy && EXOCLICK.zones.beforeVacancy) {
      const slot = makeSlot('exo-before-vacancy', 'exoclick');
      vacancy.insertAdjacentElement('beforebegin', slot);

      const frame = slot.querySelector('.gjd-ad-frame');
      if (frame) {
        frame.innerHTML = '';
        const ins = document.createElement('ins');
        ins.className = 'eas6a97888e2';
        ins.setAttribute('data-zoneid', EXOCLICK.zones.beforeVacancy);
        frame.appendChild(ins);
      }
    }

    // 2. Between Eligibility & Fee
    const eligibility = document.querySelector('#eligibility');
    if (eligibility && EXOCLICK.zones.betweenEligibilityFee) {
      const slot = makeSlot('exo-between-elig-fee', 'exoclick');
      eligibility.insertAdjacentElement('afterend', slot);

      const frame = slot.querySelector('.gjd-ad-frame');
      if (frame) {
        frame.innerHTML = '';
        const ins = document.createElement('ins');
        ins.className = 'eas6a97888e2';
        ins.setAttribute('data-zoneid', EXOCLICK.zones.betweenEligibilityFee);
        frame.appendChild(ins);
      }
    }

    // Serve all ExoClick ads
    try {
      (window.AdProvider = window.AdProvider || []).push({"serve": {}});
    } catch (e) {}
  };

  // ====================== ADSTERRA ======================
  const isDesktopLeader = () => window.matchMedia('(min-width: 861px)').matches;
  const isDesktopRail   = () => window.matchMedia('(min-width: 1101px)').matches;
  const isMobile        = () => !isDesktopLeader();

  const injectAdsterraSlots = () => {
    if (!ADSTERRA.enabled) return;

    const units = ADSTERRA.units || {};
    const updateStrip = document.querySelector('.gjd-page .gjd-update-strip');
    const links = document.querySelector('.gjd-page #important-links');
    const sidebar = document.querySelector('.gjd-page .gjd-sidebar');
    const layout = document.querySelector('.gjd-page .gjd-layout');

    if (updateStrip && updateStrip.parentNode) {
      if (units.leaderboard?.key) {
        const slot = makeSlot('leaderboard');
        slot.classList.add('gjd-ad--desktop-only');
        updateStrip.insertAdjacentElement('afterend', slot);
      }
      if (units.rectangle?.key) {
        const slot = makeSlot('mobile-top');
        slot.classList.add('gjd-ad--mobile-only', 'gjd-ad--rectangle');
        updateStrip.insertAdjacentElement('afterend', slot);
      }
    }

    if (links && links.parentNode && units.rectangle?.key) {
      const slot = makeSlot('rectangle');
      links.insertAdjacentElement('beforebegin', slot);
    }

    if (layout && units.skyscraper?.key && isDesktopRail()) {
      layout.classList.add('has-ad-rail');
      const slot = makeSlot('skyscraper');
      slot.classList.add('gjd-ad--desktop-only', 'gjd-ad--rail');
      if (sidebar && sidebar.parentNode === layout) {
        sidebar.insertAdjacentElement('afterend', slot);
      } else {
        layout.appendChild(slot);
      }
    }
  };

  const invokeUrl = (key) => `https://www.highperformanceformat.com/${key}/invoke.js`;

  const loadBannerInto = (frame, unit) => new Promise((resolve) => {
    if (!frame || !unit?.key) {
      resolve(false);
      return;
    }
    frame.innerHTML = '';
    window.atOptions = {
      key: unit.key,
      format: 'iframe',
      height: unit.height,
      width: unit.width,
      params: {}
    };

    const conf = document.createElement('script');
    conf.textContent = `atOptions = ${JSON.stringify(window.atOptions)};`;

    const script = document.createElement('script');
    script.async = true;
    script.src = invokeUrl(unit.key);
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);

    frame.appendChild(conf);
    frame.appendChild(script);
  });

  const fireAdsterraBanners = async () => {
    if (!ADSTERRA.enabled) return;
    const units = ADSTERRA.units || {};
    const queue = [
      ['leaderboard', units.leaderboard, isDesktopLeader],
      ['mobile-top', units.rectangle, isMobile],
      ['rectangle', units.rectangle, () => true],
      ['skyscraper', units.skyscraper, isDesktopRail]
    ];

    for (const [slotKey, unit, shouldShow] of queue) {
      if (!unit?.key || !shouldShow()) continue;
      const frame = document.querySelector(`[data-ad-frame="${slotKey}"]`);
      if (frame) {
        await loadBannerInto(frame, unit);
        await new Promise(r => setTimeout(r, ADSTERRA.bannerGapMs || 400));
      }
    }
  };

  // ====================== BOOT ======================
  const boot = async () => {
    try {
      await injectExoClick();
      injectAdsterraSlots();
      await fireAdsterraBanners();
    } catch (err) {
      console.warn('[Ads] Boot error:', err);
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
})();