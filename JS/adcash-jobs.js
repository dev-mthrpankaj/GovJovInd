(() => {
  'use strict';

  // ====================== ADSTERRA (skyscraper removed) ======================
  const ADSTERRA = {
    enabled: true,
    invokeHost: 'www.highperformanceformat.com',
    units: {
      leaderboard: {
        key: '83b45963c9b5e297e2716b97e5e7f1cd',
        width: 728,
        height: 90
      },
      // skyscraper: REMOVED — now ExoClick zone 6054152
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
    bannerGapMs: 400
  };

  // ====================== EXOCLICK ======================
  const EXOCLICK = {
    enabled: true,
    zones: {
      // In-content 300x250
      beforeVacancy: '6048598',
      betweenEligibilityFee: '6048602',
      // Desktop skyscraper rail 160x600
      skyscraper: '6054152'
    }
  };

  // ====================== COMMON ======================
  const path = String(window.location.pathname || '').replace(/\\/g, '/');
  if (!/\/jobs\//i.test(path)) return;
  if (window.matchMedia('(print)').matches) return;

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

  // ====================== EXOCLICK INJECTION ======================
  const isDesktopRail = () => window.matchMedia('(min-width: 1101px)').matches;

  const injectExoClickAds = () => {
    if (!EXOCLICK.enabled) return;

    // 1. Vacancy Details ke just upar (300x250)
    const vacancySection = document.querySelector('#vacancy-details');
    if (vacancySection && EXOCLICK.zones.beforeVacancy) {
      const slot = makeSlot('exoclick-before-vacancy', 'exoclick');
      vacancySection.insertAdjacentElement('beforebegin', slot);
      loadExoClick(slot.querySelector('.gjd-ad-frame'), EXOCLICK.zones.beforeVacancy);
    }

    // 2. Eligibility aur Application Fee ke beech (300x250)
    const eligibilitySection = document.querySelector('#eligibility');
    if (eligibilitySection && EXOCLICK.zones.betweenEligibilityFee) {
      const slot = makeSlot('exoclick-between-elig-fee', 'exoclick');
      eligibilitySection.insertAdjacentElement('afterend', slot);
      loadExoClick(slot.querySelector('.gjd-ad-frame'), EXOCLICK.zones.betweenEligibilityFee);
    }

    // 3. Desktop skyscraper rail 160x600 (replaces Adsterra skyscraper)
    if (EXOCLICK.zones.skyscraper && isDesktopRail()) {
      const layout = document.querySelector('.gjd-page .gjd-layout');
      const sidebar = document.querySelector('.gjd-page .gjd-sidebar');
      if (layout) {
        layout.classList.add('has-ad-rail');
        const slot = makeSlot('skyscraper', 'exoclick');
        slot.classList.add('gjd-ad--desktop-only', 'gjd-ad--rail');
        if (sidebar && sidebar.parentNode === layout) {
          sidebar.insertAdjacentElement('afterend', slot);
        } else {
          layout.appendChild(slot);
        }
        loadExoClick(slot.querySelector('.gjd-ad-frame'), EXOCLICK.zones.skyscraper);
      }
    }
  };

  // ====================== ADSTERRA (no skyscraper) ======================
  const isDesktopLeader = () => window.matchMedia('(min-width: 861px)').matches;
  const isMobile = () => !isDesktopLeader();

  const injectAdsterraSlots = () => {
    if (!ADSTERRA.enabled) return;

    const units = ADSTERRA.units || {};
    const updateStrip = document.querySelector('.gjd-page .gjd-update-strip');
    const links = document.querySelector('.gjd-page #important-links');

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
  };

  const invokeUrl = (key) => {
    const host = String(ADSTERRA.invokeHost || 'www.highperformanceformat.com').replace(/^https?:\/\//, '');
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

  const fireAdsterraBanners = async () => {
    if (!ADSTERRA.enabled) return;
    const units = ADSTERRA.units || {};
    const queue = [
      ['leaderboard', units.leaderboard, () => isDesktopLeader()],
      ['mobile-top', units.rectangle, () => isMobile()],
      ['mobile-strip', units.mobileStrip, () => isMobile() && !units.rectangle?.key],
      ['rectangle', units.rectangle, () => true]
      // skyscraper intentionally omitted
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
    injectExoClickAds();
    injectAdsterraSlots();
    await fireAdsterraBanners();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
})();