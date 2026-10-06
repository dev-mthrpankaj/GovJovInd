(() => {
  'use strict';

  // ====================== ADSTERRA CONFIG (Existing) ======================
  const ADSTERRA = {
    enabled: true,
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
    bannerGapMs: 400
  };

  // ====================== HILLTOPADS CONFIG (Corrected - Only 2 ads) ======================
  const HILLTOP = {
    enabled: true,
    zones: {
      // 1. Vacancy Details ke just upar
      beforeVacancy: {
        id: '7468169',
        src: '//quarrelsomebitter.com/bSX.V/s/dcGilS0/YsWJcV/Heump9xuJZAU/lnk1PbTqcN0eNPjRgoxTNojIkhtgN/zLQm2FO/DgEG3lMHwY'
      },
      // 2. Eligibility Criteria aur Application Fee ke beech
      betweenEligibilityFee: {
        id: '7468185',
        src: '//quarrelsomebitter.com/b.XMVjsgdsGEld0hYjWVc-/pegmC9duoZXU/ltkgPfTFc/0BNKj/gixVOyDfUXtEN/zNQs2/OhDpEy4-OcQb'
      }
    }
  };

  // ====================== COMMON ======================
  const path = String(window.location.pathname || '').replace(/\\/g, '/');
  if (!/\/jobs\//i.test(path)) return;
  if (window.matchMedia('(print)').matches) return;

  // ---------- Helper: Create Ad Slot ----------
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

  // ====================== HILLTOPADS INJECTION (Corrected) ======================
  const injectHilltopAds = () => {
    if (!HILLTOP.enabled) return;

    // 1. Vacancy Details ke just upar
    const vacancySection = document.querySelector('#vacancy-details');
    if (vacancySection && HILLTOP.zones.beforeVacancy) {
      const slot = makeSlot('hilltop-before-vacancy', 'hilltop');
      vacancySection.insertAdjacentElement('beforebegin', slot);
      loadHilltop(slot.querySelector('.gjd-ad-frame'), HILLTOP.zones.beforeVacancy);
    }

    // 2. Eligibility Criteria aur Application Fee ke beech (Sahi position)
    const eligibilitySection = document.querySelector('#eligibility');
    const feeSection = document.querySelector('#application-fee');

    if (eligibilitySection && feeSection && HILLTOP.zones.betweenEligibilityFee) {
      const slot = makeSlot('hilltop-between-elig-fee', 'hilltop');
      // Eligibility ke baad insert karo
      eligibilitySection.insertAdjacentElement('afterend', slot);
      loadHilltop(slot.querySelector('.gjd-ad-frame'), HILLTOP.zones.betweenEligibilityFee);
    }
  };

  const loadHilltop = (frame, zone) => {
    if (!frame || !zone?.src) return;

    const script = document.createElement('script');
    script.async = true;
    script.referrerPolicy = 'no-referrer-when-downgrade';
    script.src = zone.src.startsWith('//') ? 'https:' + zone.src : zone.src;
    frame.appendChild(script);
  };

  // ====================== ADSTERRA (Existing Logic - unchanged) ======================
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
    injectHilltopAds();
    injectAdsterraSlots();
    await fireAdsterraBanners();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
})();