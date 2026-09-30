(() => {
  'use strict';

  // Adsterra — redesigned Student Hub articles only
  // Gate: main.blog-article-page + .blog-article-hero
  const CONFIG = {
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
    bannerGapMs: 400
  };

  window.ADSTERRA_STUDENT_HUB_CONFIG = CONFIG;

  // ====================== HILLTOPADS — 1 unit, article middle ======================
  const HILLTOP = {
    enabled: true,
    zones: {
      midArticle: {
        id: '7468169',
        src: '//quarrelsomebitter.com/bSX.V/s/dcGilS0/YsWJcV/Heump9xuJZAU/lnk1PbTqcN0eNPjRgoxTNojIkhtgN/zLQm2FO/DgEG3lMHwY'
      }
    }
  };

  const path = String(window.location.pathname || '').replace(/\\/g, '/');
  if (!CONFIG.enabled) return;
  if (!/\/student-hub\//i.test(path) && !/\/HTML\/student-hub\//i.test(path)) return;
  if (!document.querySelector('main.blog-article-page .blog-article-hero')) return;
  if (window.matchMedia('(print)').matches) return;

  const units = CONFIG.units || {};
  const isDesktop = () => window.matchMedia('(min-width: 1024px)').matches;
  const isMobile = () => !isDesktop();

  const makeSlot = (slotKey, sizeLabel) => {
    const wrap = document.createElement('aside');
    wrap.className = `gju-blog-ad gju-blog-ad--${slotKey}`;
    wrap.dataset.adSlot = slotKey;
    wrap.setAttribute('aria-label', 'Advertisement');
    wrap.innerHTML = `
      <div class="gju-blog-ad-label">
        <span class="gju-blog-ad-label-tag">Ad</span>
        <span class="gju-blog-ad-label-note">GovJobUpdates does not endorse this.</span>
      </div>
      <div class="gju-blog-ad-frame" data-ad-frame="${slotKey}" data-ad-size="${sizeLabel}"></div>
    `.trim();
    return wrap;
  };

  const loadHilltop = (frame, zone) => {
    if (!frame || !zone?.src) return;
    const script = document.createElement('script');
    script.async = true;
    script.referrerPolicy = 'no-referrer-when-downgrade';
    script.src = zone.src.startsWith('//') ? 'https:' + zone.src : zone.src;
    frame.appendChild(script);
  };

  const makeHilltopSlot = (slotKey) => {
    const slot = makeSlot(slotKey, 'hilltop');
    slot.classList.add('gju-blog-ad--hilltop');
    slot.dataset.adNetwork = 'hilltop';
    return slot;
  };

  const injectHilltopAds = () => {
    if (!HILLTOP.enabled) return;
    if (document.querySelector('[data-hilltop-hub-ad]')) return;

    const content = document.querySelector('main.blog-article-page .blog-article-content');
    if (!content) return;

    // Sirf main content sections (FAQ / sources / tags skip)
    const sections = Array.from(content.querySelectorAll(':scope > section')).filter((sec) => {
      if (sec.id === 'faq') return false;
      if (sec.classList.contains('blog-source-box')) return false;
      if (sec.getAttribute('aria-label') === 'Tags') return false;
      return true;
    });

    if (sections.length < 2) return;

    // Middle section ke baad
    const midIndex = Math.floor(sections.length / 2) - 1;
    const anchor = sections[Math.max(0, midIndex)];
    if (!anchor) return;

    const zone = HILLTOP.zones.midArticle;
    if (!zone) return;

    const slot = makeHilltopSlot('hilltop-mid-article');
    slot.dataset.hilltopHubAd = '1';
    anchor.insertAdjacentElement('afterend', slot);
    loadHilltop(slot.querySelector('.gju-blog-ad-frame'), zone);
  };

  const injectSlots = () => {
    const hero = document.querySelector('main.blog-article-page .blog-article-hero');
    const faq = document.querySelector('main.blog-article-page #faq');
    const sidebar = document.querySelector('main.blog-article-page .article-sidebar');
    const layout = document.querySelector('main.blog-article-page .article-layout');

    // 1) Hero ke just neeche
    if (hero && hero.parentNode) {
      if (units.leaderboard?.key) {
        const slot = makeSlot('leaderboard', '728x90');
        slot.classList.add('gju-blog-ad--desktop-only');
        hero.insertAdjacentElement('afterend', slot);
      }
      if (units.rectangle?.key) {
        const slot = makeSlot('mobile-top', '300x250');
        slot.classList.add('gju-blog-ad--mobile-only', 'gju-blog-ad--rectangle');
        hero.insertAdjacentElement('afterend', slot);
      } else if (units.mobileStrip?.key) {
        const slot = makeSlot('mobile-strip', '320x50');
        slot.classList.add('gju-blog-ad--mobile-only');
        hero.insertAdjacentElement('afterend', slot);
      }
    }

    // 2) FAQ se pehle
    if (faq && faq.parentNode && units.rectangle?.key) {
      const slot = makeSlot('rectangle', '300x250');
      faq.insertAdjacentElement('beforebegin', slot);
    }

    // 3) Desktop rail: TOC + 160×600
    if (layout && units.skyscraper?.key && isDesktop()) {
      const slot = makeSlot('skyscraper', '160x600');
      slot.classList.add('gju-blog-ad--desktop-only', 'gju-blog-ad--rail');
      layout.classList.add('has-ad-rail');

      if (sidebar && layout.contains(sidebar)) {
        let rail = layout.querySelector(':scope > .article-aside-rail')
          || sidebar.closest('.article-aside-rail');
        if (!rail) {
          rail = document.createElement('div');
          rail.className = 'article-aside-rail';
          sidebar.replaceWith(rail);
          rail.appendChild(sidebar);
        }
        if (!rail.contains(slot)) rail.appendChild(slot);
      } else {
        layout.appendChild(slot);
      }
    }
  };

  const invokeUrl = (key) => {
    const host = String(CONFIG.invokeHost || 'www.highperformanceformat.com').replace(/^https?:\/\//, '');
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

  const fireBanners = async () => {
    const queue = [
      ['leaderboard', units.leaderboard, () => isDesktop()],
      ['mobile-top', units.rectangle, () => isMobile()],
      ['mobile-strip', units.mobileStrip, () => isMobile() && !units.rectangle?.key],
      ['rectangle', units.rectangle, () => true],
      ['skyscraper', units.skyscraper, () => isDesktop()]
    ];

    for (const [slotKey, unit, shouldShow] of queue) {
      if (!unit?.key || !shouldShow()) continue;
      const frame = document.querySelector(`[data-ad-frame="${slotKey}"]`);
      if (!frame) continue;
      await loadBannerInto(frame, unit);
      await sleep(CONFIG.bannerGapMs || 400);
    }
  };

  const expectedMinFill = (slot) => {
    const key = slot.dataset.adSlot || '';
    if (key === 'skyscraper') return 280;
    if (key === 'leaderboard') return 50;
    if (key === 'mobile-strip') return 40;
    return 100;
  };

  const creativeFillPx = (frame) => {
    if (!frame) return 0;
    let maxH = 0;
    frame.querySelectorAll('iframe, img, object, embed, video, a, ins, div').forEach((node) => {
      maxH = Math.max(maxH, node.offsetHeight || 0, node.clientHeight || 0);
    });
    if (!maxH) maxH = Math.max(frame.scrollHeight || 0, frame.offsetHeight || 0);
    return maxH;
  };

  const slotLooksFilled = (slot) => {
    const frame = slot.querySelector('.gju-blog-ad-frame');
    if (!frame) return false;
    const fill = creativeFillPx(frame);
    if (fill < expectedMinFill(slot)) return false;
    const hasMedia = Boolean(frame.querySelector('iframe, img, object, embed, video'));
    const hasLinks = frame.querySelectorAll('a').length > 0;
    const htmlLen = frame.innerHTML.replace(/<script[\s\S]*?<\/script>/gi, '').trim().length;
    return hasMedia || (hasLinks && fill >= expectedMinFill(slot)) || htmlLen > 80;
  };

  const syncBlogAdRail = () => {
    const layout = document.querySelector('main.blog-article-page .article-layout');
    const rail = document.querySelector('main.blog-article-page .article-aside-rail');
    const sky = document.querySelector('main.blog-article-page .gju-blog-ad--skyscraper');
    const skyLive = Boolean(
      sky
      && !sky.hidden
      && !sky.classList.contains('is-empty')
      && sky.classList.contains('is-filled')
      && window.getComputedStyle(sky).display !== 'none'
    );
    if (layout) {
      layout.classList.toggle('has-ad-rail', Boolean(rail));
      layout.classList.toggle('ad-rail-empty', Boolean(rail) && !skyLive);
    }
    if (rail) rail.classList.toggle('ad-rail-empty', !skyLive);
  };

  const hideEmptySlots = () => {
    document.querySelectorAll('.gju-blog-ad[data-ad-slot]').forEach((slot) => {
      if (slot.dataset.adNetwork === 'hilltop') {
        slot.hidden = false;
        slot.classList.remove('is-empty');
        slot.classList.add('is-filled');
        return;
      }
      if (slotLooksFilled(slot)) {
        slot.classList.remove('is-empty');
        slot.hidden = false;
        slot.classList.add('is-filled');
        return;
      }
      slot.classList.add('is-empty');
      slot.classList.remove('is-filled');
      slot.hidden = true;
    });
    syncBlogAdRail();
  };

  const ensureHilltopCss = () => {
    if (document.querySelector('style[data-hub-hilltop-css]')) return;
    const style = document.createElement('style');
    style.dataset.hubHilltopCss = '1';
    style.textContent = `
      .gju-blog-ad--hilltop {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 6px;
        width: min(100%, 360px);
        margin: 28px auto;
        padding: 12px 14px 16px;
        border: 1px dashed #d5e2f0;
        border-radius: 14px;
        background: #f8fbfe;
        overflow: hidden;
        box-sizing: border-box;
      }
      .gju-blog-ad--hilltop .gju-blog-ad-label {
        width: 100%;
        justify-content: center;
        text-align: center;
        border: 0;
        background: transparent;
        padding: 0 0 4px;
        margin: 0;
      }
      .gju-blog-ad--hilltop .gju-blog-ad-frame {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 300px;
        max-width: 100%;
        min-height: 250px;
        margin: 0 auto;
        overflow: hidden;
        border-radius: 8px;
        background: #fff;
      }
      .gju-blog-ad--hilltop .gju-blog-ad-frame iframe,
      .gju-blog-ad--hilltop .gju-blog-ad-frame img,
      .gju-blog-ad--hilltop .gju-blog-ad-frame > div,
      .gju-blog-ad--hilltop .gju-blog-ad-frame > a {
        display: block;
        max-width: 300px;
        max-height: 250px;
        margin: 0 auto;
      }
      @media (max-width: 480px) {
        .gju-blog-ad--hilltop {
          width: 100%;
          margin: 20px auto;
        }
      }
    `;
    document.head.appendChild(style);
  };

  const boot = async () => {
    ensureHilltopCss();
    injectHilltopAds();
    injectSlots();
    await fireBanners();
    window.setTimeout(hideEmptySlots, CONFIG.emptyHideMs);
    (CONFIG.emptyRecheckMs || []).forEach((ms) => {
      window.setTimeout(hideEmptySlots, ms);
    });
    window.dispatchEvent(new Event('resize'));
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
})();