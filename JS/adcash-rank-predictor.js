(() => {
  'use strict';

  // Rank Predictor exam pages only: /rank-predictor/exam-slug/
  const path = String(window.location.pathname || '').replace(/\\/g, '/');
  if (!/\/rank-predictor\//i.test(path)) return;
  if (window.matchMedia('(print)').matches) return;
  if (document.documentElement.dataset.rankAdsBooted === '1') return;
  document.documentElement.dataset.rankAdsBooted = '1';

  // Same zones as jobs (adcash-jobs.js) — change if needed
  const EXOCLICK = {
    enabled: true,
    zones: {
      skyscraper: '6054152', // 160x600 desktop rail
      afterForm: '6048598'   // 300x250 after form
    }
  };

  const isDesktopRail = () => window.matchMedia('(min-width: 1101px)').matches;

  const makeSlot = (slotKey) => {
    const wrap = document.createElement('aside');
    wrap.className = `gjd-ad gjd-ad--${slotKey} gjd-ad--exoclick`;
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

  const ensureAdProvider = () =>
    new Promise((resolve) => {
      if (window.AdProvider && document.querySelector('script[src*="ad-provider.js"]')) {
        resolve();
        return;
      }
      window.AdProvider = window.AdProvider || [];
      const existing = document.querySelector('script[src*="ad-provider.js"]');
      if (existing) {
        existing.addEventListener('load', () => resolve(), { once: true });
        if (existing.dataset.loaded === '1') resolve();
        setTimeout(resolve, 800);
        return;
      }
      const script = document.createElement('script');
      script.async = true;
      script.type = 'application/javascript';
      script.src = 'https://a.magsrv.com/ad-provider.js';
      script.onload = () => {
        script.dataset.loaded = '1';
        resolve();
      };
      script.onerror = () => resolve();
      document.head.appendChild(script);
    });

  const loadExoClick = async (frame, zoneId) => {
    if (!frame || !zoneId) return;
    frame.innerHTML = '';

    const ins = document.createElement('ins');
    ins.className = 'eas6a97888e2';
    ins.dataset.zoneid = zoneId;
    frame.appendChild(ins);

    await ensureAdProvider();
    window.AdProvider = window.AdProvider || [];
    window.AdProvider.push({ serve: {} });
  };

  const hideIfEmpty = (slot) => {
    const check = () => {
      if (!slot || !slot.isConnected) return;
      const frame = slot.querySelector('.gjd-ad-frame');
      if (!frame) return;
      const hasCreative = frame.querySelector(
        'iframe, img, video, a[href], ins iframe, ins img'
      );
      if (!hasCreative) slot.classList.add('is-empty');
    };
    setTimeout(check, 3500);
    setTimeout(check, 7000);
  };

  /** Form khatam = poora #rankSubmitForm ke baad / Rank Guide se pehle */
  const injectAfterForm = async () => {
    if (!EXOCLICK.enabled || !EXOCLICK.zones.afterForm) return;

    // Pehle galat jagah ke slots hatao
    document.querySelectorAll('[data-ad-slot="rank-after-form"]').forEach((el) => el.remove());

    const submitForm = document.querySelector('#rankSubmitForm');
    const guide = document.querySelector('#rankPredictorSeoSupport');

    if (!submitForm && !guide) return;

    const slot = makeSlot('rank-after-form');
    slot.classList.add('gjd-ad--rectangle');

    // ONLY: poori form ke baad — consent/label ke andar kabhi nahi
    if (submitForm && submitForm.parentNode) {
      submitForm.insertAdjacentElement('afterend', slot);
    } else if (guide && guide.parentNode) {
      guide.insertAdjacentElement('beforebegin', slot);
    } else {
      return;
    }

    await loadExoClick(slot.querySelector('.gjd-ad-frame'), EXOCLICK.zones.afterForm);
    hideIfEmpty(slot);
  };

  const injectSkyscraper = async () => {
    if (!EXOCLICK.enabled || !EXOCLICK.zones.skyscraper) return;
    if (!isDesktopRail()) return;

    document.querySelectorAll('[data-ad-slot="rank-skyscraper"]').forEach((el) => el.remove());

    const slot = makeSlot('rank-skyscraper');
    slot.classList.add('gjd-ad--desktop-only', 'gjd-ad--rail');
    document.body.appendChild(slot);

    await loadExoClick(slot.querySelector('.gjd-ad-frame'), EXOCLICK.zones.skyscraper);
    hideIfEmpty(slot);
  };

  const ensureCss = () => {
    if (document.getElementById('rank-predictor-ads-css')) return;
    const style = document.createElement('style');
    style.id = 'rank-predictor-ads-css';
    style.textContent = `
      .gjd-ad {
        margin: 24px auto;
        text-align: center;
        max-width: 100%;
      }
      .gjd-ad-label {
        font-size: 11px;
        color: #6b7c93;
        margin-bottom: 6px;
        display: flex;
        gap: 8px;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
      }
      .gjd-ad-label-tag {
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: .04em;
      }
      .gjd-ad-frame {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 0;
      }
      .gjd-ad--rank-after-form {
        max-width: 336px;
        margin: 28px auto 8px;
        clear: both;
      }
      .gjd-ad--rank-skyscraper.gjd-ad--rail {
        position: fixed;
        top: 120px;
        right: 12px;
        z-index: 40;
        width: 160px;
        margin: 0;
      }
      .gjd-ad.is-empty {
        display: none !important;
      }
      @media (max-width: 1100px) {
        .gjd-ad--desktop-only { display: none !important; }
      }
    `;
    document.head.appendChild(style);
  };

  const boot = async () => {
    ensureCss();
    await injectAfterForm();
    await injectSkyscraper();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => { boot(); }, { once: true });
  } else {
    boot();
  }
})();