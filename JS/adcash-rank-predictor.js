(() => {
  'use strict';

  const path = String(window.location.pathname || '').replace(/\\/g, '/');
  if (!/\/rank-predictor\//i.test(path)) return;
  if (window.matchMedia('(print)').matches) return;
  if (document.documentElement.dataset.rankAdsBooted === '1') return;
  document.documentElement.dataset.rankAdsBooted = '1';

  const EXOCLICK = {
    enabled: true,
    zones: {
      skyscraper: '6054152',
      afterForm: '6048598'
    }
  };

  const isDesktopRail = () => window.matchMedia('(min-width: 1101px)').matches;

  const makeSlot = (slotKey) => {
    const wrap = document.createElement('aside');
    wrap.className = `gjd-ad gjd-ad--${slotKey} gjd-ad--exoclick`;
    wrap.dataset.adSlot = slotKey === 'skyscraper' ? 'rank-skyscraper' : 'rank-after-form';
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

  const hideIfEmpty = (slot, isRail) => {
    const check = () => {
      if (!slot || !slot.isConnected) return;
      const frame = slot.querySelector('.gjd-ad-frame');
      if (!frame) return;
      const hasCreative = frame.querySelector(
        'iframe, img, video, a[href], ins iframe, ins img'
      );
      if (!hasCreative) {
        slot.classList.add('is-empty');
        if (!isRail) slot.hidden = true;
      }
    };
    setTimeout(check, 4000);
    setTimeout(check, 8000);
  };

  const injectAfterForm = () => {
    if (!EXOCLICK.enabled || !EXOCLICK.zones.afterForm) return;
    document.querySelectorAll('[data-ad-slot="rank-after-form"]').forEach((el) => el.remove());

    const submitForm = document.querySelector('#rankSubmitForm');
    const guide = document.querySelector('#rankPredictorSeoSupport');
    if (!submitForm && !guide) return;

    const slot = makeSlot('after-form');
    slot.classList.add('gjd-ad--rectangle');

    if (submitForm && submitForm.parentNode) {
      submitForm.insertAdjacentElement('afterend', slot);
    } else if (guide && guide.parentNode) {
      guide.insertAdjacentElement('beforebegin', slot);
    } else {
      return;
    }

    loadExoClick(slot.querySelector('.gjd-ad-frame'), EXOCLICK.zones.afterForm);
    hideIfEmpty(slot, false);
  };

  /**
   * Layout:
   *  [ hero — full width ]
   *  [ exam-selector-card — full width ]
   *  [ rank-ad-layout:  content (tabs+form+guide)  |  skyscraper ]
   */
  const injectSkyscraper = () => {
    if (!EXOCLICK.enabled || !EXOCLICK.zones.skyscraper) return;
    if (!isDesktopRail()) return;

    document.querySelectorAll('[data-ad-slot="rank-skyscraper"]').forEach((el) => el.remove());
    document.querySelectorAll('.rank-ad-layout').forEach((el) => {
      // unwrap if re-running
      const parent = el.parentNode;
      if (!parent) return;
      const content = el.querySelector('.rank-ad-content-col');
      if (content) {
        while (content.firstChild) parent.insertBefore(content.firstChild, el);
      }
      el.remove();
    });

    const app =
      document.querySelector('#rankPredictorApp') ||
      document.querySelector('main.rank-predictor-page');
    if (!app) return;

    // Start rail AFTER hero + choose exam
    const startEl =
      app.querySelector('.tab-card') ||
      app.querySelector('.predictor-workspace') ||
      app.querySelector('#rankSubmitForm');

    if (!startEl || !startEl.parentNode) return;

    const layout = document.createElement('div');
    layout.className = 'rank-ad-layout';

    const contentCol = document.createElement('div');
    contentCol.className = 'rank-ad-content-col';

    // Move startEl and all following siblings into content column
    let node = startEl;
    const toMove = [];
    while (node) {
      toMove.push(node);
      node = node.nextElementSibling;
    }
    toMove.forEach((n) => contentCol.appendChild(n));

    const slot = makeSlot('skyscraper');
    slot.classList.add('gjd-ad--desktop-only', 'gjd-ad--rail');

    layout.appendChild(contentCol);
    layout.appendChild(slot);
    app.appendChild(layout);

    loadExoClick(slot.querySelector('.gjd-ad-frame'), EXOCLICK.zones.skyscraper);
    hideIfEmpty(slot, true);
  };

  const ensureCss = () => {
    if (document.getElementById('rank-predictor-ads-css')) return;
    const style = document.createElement('style');
    style.id = 'rank-predictor-ads-css';
    style.textContent = `
      .gjd-ad {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 24px auto;
        padding: 12px 10px;
        border: 1px solid #e1eaf4;
        border-radius: 14px;
        background: #f8fbfe;
        overflow: hidden;
        box-sizing: border-box;
      }
      .gjd-ad-label {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        gap: 6px;
        margin-bottom: 8px;
        width: 100%;
      }
      .gjd-ad-label-tag {
        font-size: .58rem;
        font-weight: 900;
        letter-spacing: .08em;
        text-transform: uppercase;
        color: #94a3b8;
      }
      .gjd-ad-label-note {
        font-size: .65rem;
        font-weight: 600;
        color: #94a3b8;
      }
      .gjd-ad-frame {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        overflow: hidden;
      }
      .gjd-ad--after-form .gjd-ad-frame,
      .gjd-ad--rectangle .gjd-ad-frame {
        min-height: 250px;
        max-width: 300px;
      }
      .gjd-ad[data-ad-slot="rank-after-form"] {
        max-width: 336px;
        margin: 28px auto 12px;
      }
      .gjd-ad.is-empty:not(.gjd-ad--rail) {
        display: none !important;
      }

      /* Hero + Choose Exam = full width (no ad beside them) */
      /* From tab-card downward = content | skyscraper */
      @media (min-width: 1101px) {
        .rank-ad-layout {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 176px;
          gap: 18px;
          align-items: start;
          width: 100%;
          box-sizing: border-box;
        }
        .rank-ad-content-col {
          grid-column: 1;
          min-width: 0;
          max-width: 100%;
        }
        .rank-ad-content-col .tab-card,
        .rank-ad-content-col .form-actions,
        .rank-ad-content-col .sticky-actions {
          max-width: 100%;
        }
        .gjd-ad--skyscraper.gjd-ad--rail {
          grid-column: 2;
          margin: 0;
          padding: 10px 6px;
          align-self: start;
          justify-self: end;
          position: sticky;
          top: calc(92px + 8px);
          width: 176px;
          min-height: 620px;
          z-index: 4;
          background: #f8fbfe;
          border: 1px solid #e1eaf4;
          border-radius: 14px;
        }
        .gjd-ad--skyscraper .gjd-ad-frame {
          min-height: 600px;
          width: 160px;
          min-width: 160px;
          max-width: 160px;
        }
        .gjd-ad--skyscraper.gjd-ad--rail .gjd-ad-label {
          flex-direction: column;
          gap: 0.15rem;
        }
        .gjd-ad--skyscraper.gjd-ad--rail .gjd-ad-label-note {
          font-size: .55rem;
          line-height: 1.25;
          text-align: center;
        }
        .gjd-ad--skyscraper.is-empty:not([hidden]) {
          opacity: 0.35;
          pointer-events: none;
        }
      }

      .gjd-ad--desktop-only { display: flex; }

      @media (max-width: 1100px) {
        .gjd-ad--rail,
        .gjd-ad--skyscraper {
          display: none !important;
        }
        .rank-ad-layout {
          display: block;
        }
        .rank-ad-content-col {
          display: contents;
        }
      }

      @media print {
        .gjd-ad { display: none !important; }
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