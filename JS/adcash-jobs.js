(() => {
  'use strict';

  // ====================== ADSTERRA CONFIG (No Change) ======================
  const ADSTERRA = {
    enabled: true,
    invokeHost: 'www.highperformanceformat.com',
    units: {
      leaderboard: { key: '83b45963c9b5e297e2716b97e5e7f1cd', width: 728, height: 90 },
      skyscraper: { key: 'b4cefd61066cf540b9a4543442f3bcb8', width: 160, height: 600 },
      rectangle: { key: '87119e54e06ec212fda2497c6e91b073', width: 300, height: 250 },
      mobileStrip: { key: 'cdd822299805deaaddd42d620ded189a', width: 320, height: 50 }
    },
    emptyHideMs: 4000,
    emptyRecheckMs: [7000, 11000],
    railFinalCheckMs: 12000,
    bannerGapMs: 400
  };

  // ====================== MONDIAD CONFIG ======================
  const MONDIAD = {
    enabled: true,
    banners: {
      beforeVacancy: 'ac17bf39-e9f2-44b3-97fe-7db6025f4264',
      betweenEligibilityFee: '256be70b-6a65-405b-9266-889c7d9a4f09'
    },
    dynamic: {
      enabled: true,
      id: 'e044e301-ed91-4417-b5f4-1ca1360fd2db'
    }
  };

  const path = String(window.location.pathname || '').replace(/\\/g, '/');
  if (!/\/jobs\//i.test(path)) return;
  if (window.matchMedia('(print)').matches) return;

  // ---------- Helper ----------
  const makeSlot = (slotKey, network = 'adsterra') => {
    const wrap = document.createElement('aside');
    wrap.className = `gjd-ad gjd-ad--${slotKey} gjd-ad--${network}`;
    wrap.dataset.adSlot = slotKey;
    wrap.setAttribute('aria-label', 'Advertisement');
    wrap.innerHTML = `
      <div class="gjd-ad-label">
        <span class="gjd-ad-label-tag">Ad</span>
        <span class="gjd-ad-label-note">GovJobUpdates does not endorse this.</span>
      </div>
      <div class="gjd-ad-frame" data-ad-frame="${slotKey}"></div>
    `;
    return wrap;
  };

  // Load Mondiad banner.js if not already present
  const ensureMondiadBannerScript = () => {
    if (document.querySelector('script[src*="ss.mrmnd.com/banner.js"]')) return;
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://ss.mrmnd.com/banner.js';
    document.head.appendChild(script);
  };

  // Load Dynamic
  const loadMondiadDynamic = () => {
    if (!MONDIAD.dynamic?.enabled || !MONDIAD.dynamic.id) return;
    if (document.querySelector('script[src*="dynamic.js"][data-mnddynid]')) return;

    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://ss.mrmnd.com/dynamic.js';
    script.setAttribute('data-mnddynid', MONDIAD.dynamic.id);
    document.head.appendChild(script);
  };

  // Inject Mondiad Banners
  const injectMondiadBanners = () => {
    if (!MONDIAD.enabled) return;

    // 1. Before Vacancy Details
    const vacancySection = document.querySelector('#vacancy-details');
    if (vacancySection && MONDIAD.banners.beforeVacancy) {
      const slot = makeSlot('mondiad-before-vacancy', 'mondiad');
      vacancySection.insertAdjacentElement('beforebegin', slot);
      slot.querySelector('.gjd-ad-frame').innerHTML = 
        `<div data-mndbanid="${MONDIAD.banners.beforeVacancy}"></div>`;
    }

    // 2. Between Eligibility & Fee
    const eligibilitySection = document.querySelector('#eligibility');
    if (eligibilitySection && MONDIAD.banners.betweenEligibilityFee) {
      const slot = makeSlot('mondiad-between-elig-fee', 'mondiad');
      eligibilitySection.insertAdjacentElement('afterend', slot);
      slot.querySelector('.gjd-ad-frame').innerHTML = 
        `<div data-mndbanid="${MONDIAD.banners.betweenEligibilityFee}"></div>`;
    }
  };

  // ====================== ADSTERRA (unchanged) ======================
  const isDesktopLeader = () => window.matchMedia('(min-width: 861px)').matches;
  const isDesktopRail = () => window.matchMedia('(min-width: 1101px)').matches;
  const isMobile = () => !isDesktopLeader();

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
      } else if (units.mobileStrip?.key) {
        const slot = makeSlot('mobile-strip');
        slot.classList.add('gjd-ad--mobile-only');
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

  const invokeUrl = (key) => {
    const host = String(ADSTERRA.invokeHost || 'www.highperformanceformat.com').replace(/^https?:\/\//, '');
    return `https://${host}/${key}/invoke.js`;
  };

  const loadBannerInto = (frame, unit) => new Promise((resolve) => {
    if (!frame || !unit?.key) { resolve(false); return; }
    frame.innerHTML = '';
    const opts = { key: unit.key, format: 'iframe', height: unit.height, width: unit.width, params: {} };
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

  const sleep = (ms) => new Promise(r => setTimeout(r, ms));

  const fireAdsterraBanners = async () => {
    if (!ADSTERRA.enabled) return;
    const units = ADSTERRA.units || {};
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
      await sleep(ADSTERRA.bannerGapMs || 400);
    }
  };

  // ====================== BOOT ======================
  const boot = async () => {
    ensureMondiadBannerScript();   // ← yeh important hai
    injectMondiadBanners();
    loadMondiadDynamic();
    injectAdsterraSlots();
    await fireAdsterraBanners();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
})();