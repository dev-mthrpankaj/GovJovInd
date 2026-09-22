(() => {
  'use strict';

  const CONFIG = {
    enabled: true,
    // Baad mein real URLs yahan
    links: {
      skyscraper: '#',
      leaderboard: '#',
      rectangle: '#',
      strip: '#'
    },
    // Pages jahan ads chalenge
    allowPaths: [
      /^\/?index\.html$/i,
      /^\/?$/,
      /\/HTML\/latest-jobs\.html$/i,
      /\/HTML\/admitcard\.html$/i,
      /\/HTML\/answer-key\.html$/i,
      /\/HTML\/results\.html$/i,
      /\/latest-jobs\.html$/i,
      /\/admitcard\.html$/i,
      /\/answer-key\.html$/i,
      /\/results\.html$/i
    ],
    note: 'Sponsored · may earn a commission'
  };

  if (!CONFIG.enabled) return;
  if (window.matchMedia('(print)').matches) return;

  const path = String(window.location.pathname || '').replace(/\\/g, '/');
  const allowed = CONFIG.allowPaths.some((re) => re.test(path));
  if (!allowed) return;

  // Home vs /HTML/ — asset base
  const inHtmlFolder = /\/HTML\//i.test(path) || /\/(latest-jobs|admitcard|answer-key|results)\.html$/i.test(path);
  const assetBase = inHtmlFolder ? '../Assets/affiliation_ads/' : 'Assets/affiliation_ads/';

  const IMAGES = {
    skyscraper: assetBase + '160_600_Banner.webp',
    leaderboard: assetBase + '728_90_Banner.webp',
    rectangle: assetBase + '300_250_Banner.webp',
    strip: assetBase + '320_50_Banner.webp'
  };

  const makeAd = ({ slot, href, src, width, height, extraClass = '' }) => {
    const aside = document.createElement('aside');
    aside.className = `gju-self-ad ${extraClass}`.trim();
    aside.dataset.selfAd = slot;
    aside.setAttribute('aria-label', 'Sponsored');
    aside.innerHTML = `
      <a class="gju-self-ad__link" href="${href}" rel="sponsored noopener">
        <img src="${src}" alt="Sponsored offer" width="${width}" height="${height}" loading="lazy" decoding="async">
      </a>
      <p class="gju-self-ad__note">${CONFIG.note}</p>
    `.trim();
    return aside;
  };

  const makeRail = () => {
    const aside = document.createElement('aside');
    aside.className = 'gju-self-ad-rail';
    aside.dataset.selfAd = 'skyscraper';
    aside.setAttribute('aria-label', 'Sponsored');
    aside.innerHTML = `
      <a class="gju-self-ad__link" href="${CONFIG.links.skyscraper}" rel="sponsored noopener">
        <img src="${IMAGES.skyscraper}" alt="Sponsored offer" width="160" height="600" loading="lazy" decoding="async">
      </a>
      <p class="gju-self-ad__note">Sponsored</p>
    `.trim();
    return aside;
  };

  const inject = () => {
    if (document.querySelector('[data-self-ad]')) return;

    // --- Right gutter skyscraper (CSS shows only ≥1400px) ---
    document.body.appendChild(makeRail());

    // --- Horizontal slots ---
    const leaderboard = makeAd({
      slot: 'leaderboard',
      href: CONFIG.links.leaderboard,
      src: IMAGES.leaderboard,
      width: 728,
      height: 90,
      extraClass: 'gju-self-ad--leaderboard gju-self-ad--desktop-only'
    });

    const rectangle = makeAd({
      slot: 'rectangle',
      href: CONFIG.links.rectangle,
      src: IMAGES.rectangle,
      width: 300,
      height: 250,
      extraClass: 'gju-self-ad--rectangle gju-self-ad--mobile-only'
    });

    // Homepage: typing CTA ke baad
    const typingCta = document.querySelector('.live-test-cta');
    if (typingCta && typingCta.parentNode) {
      typingCta.insertAdjacentElement('afterend', leaderboard);
      typingCta.insertAdjacentElement('afterend', rectangle);
      return;
    }

    // Listing pages: hero ke baad
    const hero =
      document.querySelector('.jobs-hero') ||
      document.querySelector('.admit-hero') ||
      document.querySelector('.answer-key-hero') ||
      document.querySelector('.results-hero') ||
      document.querySelector('main section:first-of-type') ||
      document.querySelector('main > section');

    if (hero && hero.parentNode) {
      hero.insertAdjacentElement('afterend', leaderboard);
      hero.insertAdjacentElement('afterend', rectangle);
      return;
    }

    // Fallback: main ke top
    const main = document.querySelector('main');
    if (main) {
      main.insertBefore(rectangle, main.firstChild);
      main.insertBefore(leaderboard, main.firstChild);
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject, { once: true });
  } else {
    inject();
  }
})();