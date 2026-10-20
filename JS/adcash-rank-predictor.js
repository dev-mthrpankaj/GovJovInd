(() => {
  'use strict';

  // Rank Predictor ads — JS only, no HTML edits
  const path = String(window.location.pathname || '').replace(/\\/g, '/');
  if (!/\/rank-predictor\//i.test(path)) return;
  if (window.matchMedia('(print)').matches) return;
  if (document.documentElement.dataset.rankAdsBooted === '1') return;
  document.documentElement.dataset.rankAdsBooted = '1';

  // ===== EXOCLICK zones (apne zone IDs yahan) =====
  const EXOCLICK = {
    enabled: true,
    zones: {
      // Desktop skyscraper 160x600
      skyscraper: '6054152',
      // Form ke baad 300x250 (in-content)
      afterForm: '6048598'
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

  const injectAfterForm = () => {
    if (!EXOCLICK.enabled || !EXOCLICK.zones.afterForm) return;
    if (document.querySelector('[data-ad-slot="rank-after-form"]')) return;

    // Form end anchors (stable, no HTML change needed)
    const anchors = [
      document.querySelector('#dataConsent'),
      document.querySelector('#consentTitle')?.closest('.form-section-card, .form-accordion, details, section'),
      document.querySelector('.review-submit-grid')?.closest('.form-section-card, .form-accordion, details, section'),
      document.querySelector('#rankPredictorApp form'),
      document.querySelector('#rankPredictorApp [data-panel="submit"]'),
      document.querySelector('#rankPredictorSeoSupport'),
      document.querySelector('.page-guide')
    ].filter(Boolean);

    const slot = makeSlot('rank-after-form');
    slot.classList.add('gjd-ad--rectangle');

    // Prefer: form block ke baad; warna guide se pehle
    const consentBlock = anchors[0] || anchors[1] || anchors[2];
    const guide = document.querySelector('#rankPredictorSeoSupport, .page-guide');

    if (consentBlock && consentBlock.parentNode) {
      consentBlock.insertAdjacentElement('afterend', slot);
    } else if (guide && guide.parentNode) {
      guide.insertAdjacentElement('beforebegin', slot);
    } else {
      const app = document.querySelector('#rankPredictorApp');
      if (app) app.appendChild(slot);
      else return;
    }

    loadExoClick(slot.querySelector('.gjd-ad-frame'), EXOCLICK.zones.afterForm);
  };

  const injectSkyscraper = () => {
    if (!EXOCLICK.enabled || !EXOCLICK.zones.skyscraper) return;
    if (!isDesktopRail()) return;
    if (document.querySelector('[data-ad-slot="rank-skyscraper"]')) return;

    const slot = makeSlot('rank-skyscraper');
    slot.classList.add('gjd-ad--desktop-only', 'gjd-ad--rail');
    // Fixed rail — CSS below
    document.body.appendChild(slot);
    loadExoClick(slot.querySelector('.gjd-ad-frame'), EXOCLICK.zones.skyscraper);
  };

  const ensureCss = () => {
    if (document.getElementById('rank-predictor-ads-css')) return;
    const style = document.createElement('style');
    style.id = 'rank-predictor-ads-css';
    style.textContent = `
      .gjd-ad { margin: 16px 0; text-align: center; }
      .gjd-ad-label { font-size: 11px; color: #6b7c93; margin-bottom: 6px; display: flex; gap: 8px; justify-content: center; align-items: center; }
      .gjd-ad-label-tag { font-weight: 700; text-transform: uppercase; letter-spacing: .04em; }
      .gjd-ad-frame { display: flex; justify-content: center; min-height: 50px; }
      .gjd-ad--rank-after-form { max-width: 320px; margin-left: auto; margin-right: auto; }
      .gjd-ad--rank-skyscraper.gjd-ad--rail {
        position: fixed; top: 120px; right: 12px; z-index: 40;
        width: 160px; margin: 0;
      }
      @media (max-width: 1100px) {
        .gjd-ad--desktop-only { display: none !important; }
      }
    `;
    document.head.appendChild(style);
  };

  const boot = () => {
    ensureCss();
    injectAfterForm();
    injectSkyscraper();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
})();