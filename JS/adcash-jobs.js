(() => {
  'use strict';

  const ADSTERRA = {
    enabled: true,
    invokeHost: 'www.highperformanceformat.com',
    units: {
      leaderboard: { key: '83b45963c9b5e297e2716b97e5e7f1cd', width: 728, height: 90 },
      skyscraper: { key: 'b4cefd61066cf540b9a4543442f3bcb8', width: 160, height: 600 },
      rectangle: { key: '87119e54e06ec212fda2497c6e91b073', width: 300, height: 250 },
      mobileStrip: { key: 'cdd822299805deaaddd42d620ded189a', width: 320, height: 50 }
    },
    bannerGapMs: 400
  };

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

  const makeSlot = (slotKey, network = 'adsterra') => {
    const wrap = document.createElement('aside');
    wrap.className = `gjd-ad gjd-ad--${slotKey} gjd-ad--${network}`;
    wrap.dataset.adSlot = slotKey;
    wrap.setAttribute('aria-label', 'Advertisement');
    wrap.style.minHeight = network === 'mondiad' ? '280px' : '';
    wrap.innerHTML = `
      <div class="gjd-ad-label">
        <span class="gjd-ad-label-tag">Ad</span>
        <span class="gjd-ad-label-note">GovJobUpdates does not endorse this.</span>
      </div>
      <div class="gjd-ad-frame" data-ad-frame="${slotKey}"></div>
    `;
    return wrap;
  };

  // Load banner.js
  const loadBannerScript = () => {
    return new Promise((resolve) => {
      if (document.querySelector('script[src*="ss.mrmnd.com/banner.js"]')) {
        resolve();
        return;
      }
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://ss.mrmnd.com/banner.js';
      script.onload = () => resolve();
      script.onerror = () => resolve();
      document.head.appendChild(script);
    });
  };

  // Load Dynamic
  const loadDynamic = () => {
    if (!MONDIAD.dynamic.enabled) return;
    if (document.querySelector('script[src*="dynamic.js"][data-mnddynid]')) return;

    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://ss.mrmnd.com/dynamic.js';
    script.setAttribute('data-mnddynid', MONDIAD.dynamic.id);
    document.head.appendChild(script);
  };

  const injectMondiad = async () => {
    if (!MONDIAD.enabled) return;

    await loadBannerScript();

    // thoda wait taaki script ready ho jaye
    await new Promise(r => setTimeout(r, 800));

    // 1. Before Vacancy
    const vacancy = document.querySelector('#vacancy-details');
    if (vacancy && MONDIAD.banners.beforeVacancy) {
      const slot = makeSlot('mondiad-before-vacancy', 'mondiad');
      vacancy.insertAdjacentElement('beforebegin', slot);
      slot.querySelector('.gjd-ad-frame').innerHTML = 
        `<div data-mndbanid="${MONDIAD.banners.beforeVacancy}" style="min-height:250px;"></div>`;
    }

    // 2. Between Eligibility & Fee
    const eligibility = document.querySelector('#eligibility');
    if (eligibility && MONDIAD.banners.betweenEligibilityFee) {
      const slot = makeSlot('mondiad-between-elig-fee', 'mondiad');
      eligibility.insertAdjacentElement('afterend', slot);
      slot.querySelector('.gjd-ad-frame').innerHTML = 
        `<div data-mndbanid="${MONDIAD.banners.betweenEligibilityFee}" style="min-height:250px;"></div>`;
    }
  };

  // ========== ADSTERRA (same as before) ==========
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

    if (updateStrip?.parentNode) {
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

    if (links?.parentNode && units.rectangle?.key) {
      const slot = makeSlot('rectangle');
      links.insertAdjacentElement('beforebegin', slot);
    }

    if (layout && units.skyscraper?.key && isDesktopRail()) {
      layout.classList.add('has-ad-rail');
      const slot = makeSlot('skyscraper');
      slot.classList.add('gjd-ad--desktop-only', 'gjd-ad--rail');
      (sidebar?.parentNode === layout ? sidebar : layout).insertAdjacentElement(
        sidebar?.parentNode === layout ? 'afterend' : 'beforeend', slot
      );
    }
  };

  const invokeUrl = (key) => `https://www.highperformanceformat.com/${key}/invoke.js`;

  const loadBannerInto = (frame, unit) => new Promise((resolve) => {
    if (!frame || !unit?.key) return resolve(false);
    frame.innerHTML = '';
    window.atOptions = { key: unit.key, format: 'iframe', height: unit.height, width: unit.width, params: {} };

    const conf = document.createElement('script');
    conf.textContent = `atOptions = ${JSON.stringify(window.atOptions)};`;
    const script = document.createElement('script');
    script.async = true;
    script.src = invokeUrl(unit.key);
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    frame.append(conf, script);
  });

  const fireAdsterraBanners = async () => {
    if (!ADSTERRA.enabled) return;
    const units = ADSTERRA.units;
    const queue = [
      ['leaderboard', units.leaderboard, isDesktopLeader],
      ['mobile-top', units.rectangle, isMobile],
      ['rectangle', units.rectangle, () => true],
      ['skyscraper', units.skyscraper, isDesktopRail]
    ];
    for (const [key, unit, check] of queue) {
      if (!unit?.key || !check()) continue;
      const frame = document.querySelector(`[data-ad-frame="${key}"]`);
      if (frame) {
        await loadBannerInto(frame, unit);
        await new Promise(r => setTimeout(r, 400));
      }
    }
  };

  const boot = async () => {
    await injectMondiad();
    loadDynamic();
    injectAdsterraSlots();
    await fireAdsterraBanners();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
})();