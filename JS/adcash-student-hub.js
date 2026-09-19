(() => {
  'use strict';

  // Adcash — only redesigned Student Hub articles
  // Gate: main.blog-article-page + .blog-article-hero (same styling as SSC CPO pattern page)
  const CONFIG = {
    enabled: true,
    zones: {
      desktop728x90: '12187254',
      desktop120x600: '12187246',
      mobile300x250: '12187270',
      mobile300x100: '' // unused — weak fill
    },
    // Floating video — off (too intrusive on exam/study pages)
    videoSliderZoneId: '',
    aclibSrc: 'https://acscdn.com/script/aclib.js',
    emptyHideMs: 4000
  };

  window.ADCASH_STUDENT_HUB_CONFIG = CONFIG;

  const path = String(window.location.pathname || '').replace(/\\/g, '/');
  if (!CONFIG.enabled) return;
  if (!/\/student-hub\//i.test(path) && !/\/HTML\/student-hub\//i.test(path)) return;
  if (!document.querySelector('main.blog-article-page .blog-article-hero')) return;
  if (window.matchMedia('(print)').matches) return;

  const zones = Object.fromEntries(
    Object.entries(CONFIG.zones || {}).filter(([, id]) => Boolean(String(id || '').trim()))
  );
  if (!Object.keys(zones).length) return;

  const isDesktop = () => window.matchMedia('(min-width: 1024px)').matches;
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
    wrap.className = `gju-blog-ad gju-blog-ad--${slotKey}`;
    wrap.dataset.adcashSlot = slotKey;
    wrap.setAttribute('aria-label', 'Advertisement');
    wrap.innerHTML = `
      <div class="gju-blog-ad-label">
        <span class="gju-blog-ad-label-tag">Ad</span>
        <span class="gju-blog-ad-label-note">GovJobUpdates does not endorse this.</span>
      </div>
      <div class="gju-blog-ad-frame" data-adcash-frame="${slotKey}" data-ad-size="${sizeLabel}"></div>
    `.trim();
    return wrap;
  };

  const runBannerIn = (frame, zoneId) => {
    if (!frame || !zoneId || !window.aclib || typeof window.aclib.runBanner !== 'function') return;
    const runner = document.createElement('script');
    runner.textContent = `aclib.runBanner({ zoneId: ${JSON.stringify(String(zoneId))} });`;
    frame.appendChild(runner);
  };

  const injectSlots = () => {
    const hero = document.querySelector('main.blog-article-page .blog-article-hero');
    const faq = document.querySelector('main.blog-article-page #faq');
    const sidebar = document.querySelector('main.blog-article-page .article-sidebar');
    const layout = document.querySelector('main.blog-article-page .article-layout');

    // 1) Hero ke just neeche (after trust strip + stats)
    if (hero && hero.parentNode) {
      if (zones.desktop728x90) {
        const slot = makeSlot('leaderboard', '728x90');
        slot.classList.add('gju-blog-ad--desktop-only');
        hero.insertAdjacentElement('afterend', slot);
      }
      if (zones.mobile300x250) {
        const slot = makeSlot('mobile-top', '300x250');
        slot.classList.add('gju-blog-ad--mobile-only', 'gju-blog-ad--rectangle');
        hero.insertAdjacentElement('afterend', slot);
      }
    }

    // 2) FAQ se pehle — high-intent mid slot
    if (faq && faq.parentNode && zones.mobile300x250) {
      const slot = makeSlot('rectangle', '300x250');
      faq.insertAdjacentElement('beforebegin', slot);
    }

    // 3) Desktop: TOC + 120×600 side-by-side in one sticky rail
    //    (never stack ad under TOC inside .article-sidebar)
    if (layout && zones.desktop120x600) {
      const slot = makeSlot('skyscraper', '120x600');
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

  const fireBanners = () => {
    const map = [
      ['leaderboard', zones.desktop728x90, () => isDesktop()],
      ['mobile-top', zones.mobile300x250, () => isMobile()],
      ['rectangle', zones.mobile300x250, () => true],
      ['skyscraper', zones.desktop120x600, () => isDesktop()]
    ];
    map.forEach(([slotKey, zoneId, shouldShow]) => {
      if (!zoneId || !shouldShow()) return;
      runBannerIn(document.querySelector(`[data-adcash-frame="${slotKey}"]`), zoneId);
    });
  };

  const expectedMinFill = (slot) => {
    const key = slot.dataset.adcashSlot || '';
    if (key === 'skyscraper') return 280;
    if (key === 'leaderboard') return 50;
    return 120;
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
      && window.getComputedStyle(sky).display !== 'none'
    );
    if (layout) {
      // Keep rail wrapper column even when skyscraper is empty (TOC still needs it)
      layout.classList.toggle('has-ad-rail', Boolean(rail));
      layout.classList.toggle('ad-rail-empty', Boolean(rail) && !skyLive);
    }
    if (rail) rail.classList.toggle('ad-rail-empty', !skyLive);
  };

  const hideEmptySlots = () => {
    document.querySelectorAll('.gju-blog-ad[data-adcash-slot]').forEach((slot) => {
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

  const fireVideoSlider = () => {
    const zoneId = String(CONFIG.videoSliderZoneId || '').trim();
    if (!zoneId || !window.aclib || typeof window.aclib.runVideoSlider !== 'function') return;
    window.aclib.runVideoSlider({ zoneId });
  };

  const boot = async () => {
    try {
      await loadAclib();
    } catch {
      return;
    }
    injectSlots();
    fireBanners();
    fireVideoSlider();
    window.setTimeout(hideEmptySlots, CONFIG.emptyHideMs);
    window.setTimeout(hideEmptySlots, 5500);
    window.setTimeout(hideEmptySlots, 9000);
    window.dispatchEvent(new Event('resize'));
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
})();
