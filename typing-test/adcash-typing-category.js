(() => {
 'use strict';

 // Adsterra — typing category pages
 // Covers: typing index + exam detail pages
 // Skips: app.html / live attempt workspace
 const CONFIG = {
 enabled: true,
 invokeHost: 'www.highperformanceformat.com',
 units: {
 skyscraper: {
 key: 'b4cefd61066cf540b9a4543442f3bcb8',
 width: 160,
 height: 600
 },
 rectangle: {
 key: '87119e54e06ec212fda2497c6e91b073',
 width: 300,
 height: 250
 }
 },
 cssHref: '../CSS/adcash-quiz-category.css?v=20260923-adsterra',
 emptyHideMs: 4000,
 emptyRecheckMs: [7000, 11000],
 bannerGapMs: 400,
 desktopMinPx: 1100
 };

 window.ADSTERRA_TYPING_CATEGORY_CONFIG = CONFIG;

 const indexPage = document.querySelector('main.gju-typing-index-page');
 const examPage = document.querySelector('main.gju-typing-exam-detail-page');
 if (!CONFIG.enabled || (!indexPage && !examPage)) return;
 if (document.querySelector('main.typing-attempt-page, #typingApp, .typing-exam-view')) return;
 if (window.matchMedia('(print)').matches) return;

 const units = CONFIG.units || {};
 if (!units.skyscraper?.key && !units.rectangle?.key) return;

 const isDesktop = () => window.matchMedia(`(min-width: ${CONFIG.desktopMinPx}px)`).matches;
 const isMobile = () => !isDesktop();

 const ensureCss = () => {
 if (document.querySelector('link[data-adcash-quiz-css], link[data-adcash-typing-css]')) return;
 const link = document.createElement('link');
 link.rel = 'stylesheet';
 link.href = CONFIG.cssHref;
 link.dataset.adcashTypingCss = '1';
 document.head.appendChild(link);
 };

 const makeSlot = (slotKey, sizeLabel) => {
 const wrap = document.createElement('aside');
 wrap.className = `gju-quiz-ad gju-quiz-ad--${slotKey}`;
 wrap.dataset.adSlot = slotKey;
 wrap.setAttribute('aria-label', 'Advertisement');
 wrap.innerHTML = `
 <div class="gju-quiz-ad-label">
 <span class="gju-quiz-ad-label-tag">Ad</span>
 <span class="gju-quiz-ad-label-note">GovJobUpdates does not endorse this.</span>
 </div>
 <div class="gju-quiz-ad-frame" data-ad-frame="${slotKey}" data-ad-size="${sizeLabel}"></div>
 `.trim();
 return wrap;
 };

 const wrapRailHost = (host) => {
 if (!host || host.querySelector(':scope > .gju-quiz-ad-rail-main')) {
 return host.querySelector(':scope > .gju-quiz-ad-rail-main') || host;
 }
 const mainCol = document.createElement('div');
 mainCol.className = 'gju-quiz-ad-rail-main';
 while (host.firstChild) mainCol.appendChild(host.firstChild);
 host.classList.add('gju-typing-ad-host', 'gju-quiz-ad-host-ready', 'has-quiz-ad-rail');
 host.classList.remove('ad-rail-empty');
 host.appendChild(mainCol);
 return mainCol;
 };

 const injectIndex = (page) => {
 const grid = page.querySelector('#typingExamGrid, .gju-typing-exam-grid');
 const count = page.querySelector('#typingExamCount, .typing-selection-summary');
 const directoryTitle = page.querySelector('#typingDirectory, .typing-directory-title');
 const search = page.querySelector('.gju-typing-exam-search');
 const filters = page.querySelector('.gju-typing-filter-row');

 if (units.rectangle?.key && grid) {
 const slot = makeSlot('mobile-mid', '300x250');
 slot.classList.add('gju-quiz-ad--mobile-only');
 if (count && count.parentNode) count.insertAdjacentElement('afterend', slot);
 else grid.insertAdjacentElement('beforebegin', slot);
 }

 if (units.skyscraper?.key && grid && isDesktop()) {
 let host = page.querySelector('.gju-typing-ad-host');
 if (!host) {
 host = document.createElement('div');
 host.className = 'gju-typing-ad-host';
 const start = directoryTitle || search || filters || count || grid;
 start.parentNode.insertBefore(host, start);
 [directoryTitle, search, filters, count, page.querySelector('.gju-quiz-ad--mobile-mid'), grid, page.querySelector('#typingExamEmpty')]
 .filter(Boolean)
 .forEach((el) => {
 if (host.contains(el)) return;
 host.appendChild(el);
 });
 }
 wrapRailHost(host);
 const slot = makeSlot('skyscraper', '160x600');
 slot.classList.add('gju-quiz-ad--desktop-only', 'gju-quiz-ad--rail');
 host.appendChild(slot);
 }
 };

 const injectExam = (page) => {
 const passagePanel = page.querySelector('.gju-typing-passage-panel');
 const languagePanel = page.querySelector('.gju-typing-language-panel');

 if (units.rectangle?.key) {
 const slot = makeSlot('mobile-mid', '300x250');
 slot.classList.add('gju-quiz-ad--mobile-only');
 if (languagePanel) languagePanel.insertAdjacentElement('afterend', slot);
 else if (passagePanel) passagePanel.insertAdjacentElement('beforebegin', slot);
 else page.appendChild(slot);
 }

 if (units.skyscraper?.key && (languagePanel || passagePanel) && isDesktop()) {
 let host = page.querySelector('.gju-typing-ad-host');
 if (!host) {
 host = document.createElement('div');
 host.className = 'gju-typing-ad-host';
 const first = languagePanel || passagePanel;
 first.parentNode.insertBefore(host, first);
 if (languagePanel) host.appendChild(languagePanel);
 const mobileAd = page.querySelector('.gju-quiz-ad--mobile-mid');
 if (mobileAd) host.appendChild(mobileAd);
 if (passagePanel) host.appendChild(passagePanel);
 }
 wrapRailHost(host);
 const slot = makeSlot('skyscraper', '160x600');
 slot.classList.add('gju-quiz-ad--desktop-only', 'gju-quiz-ad--rail');
 host.appendChild(slot);
 }
 };

 const injectSlots = () => {
 if (indexPage) injectIndex(indexPage);
 else if (examPage) injectExam(examPage);
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
 ['mobile-mid', units.rectangle, () => isMobile()],
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
 const frame = slot.querySelector('.gju-quiz-ad-frame');
 if (!frame) return false;
 const fill = creativeFillPx(frame);
 if (fill < expectedMinFill(slot)) return false;
 const hasMedia = Boolean(frame.querySelector('iframe, img, object, embed, video'));
 const hasLinks = frame.querySelectorAll('a').length > 0;
 const htmlLen = frame.innerHTML.replace(/<script[\s\S]*?<\/script>/gi, '').trim().length;
 return hasMedia || (hasLinks && fill >= expectedMinFill(slot)) || htmlLen > 80;
 };

 const syncTypingAdRail = () => {
 document.querySelectorAll('.gju-typing-ad-host').forEach((host) => {
 const skyEl = host.querySelector('.gju-quiz-ad--skyscraper');
 const skyLive = Boolean(
 skyEl
 && !skyEl.hidden
 && !skyEl.classList.contains('is-empty')
 && skyEl.classList.contains('is-filled')
 && window.getComputedStyle(skyEl).display !== 'none'
 );
 host.classList.toggle('has-quiz-ad-rail', skyLive);
 host.classList.toggle('ad-rail-empty', Boolean(skyEl) && !skyLive);
 });
 };

 const hideEmptySlots = () => {
 document.querySelectorAll('.gju-quiz-ad[data-ad-slot]').forEach((slot) => {
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
 syncTypingAdRail();
 };

 const boot = async () => {
 ensureCss();
 injectSlots();
 await fireBanners();
 window.setTimeout(hideEmptySlots, CONFIG.emptyHideMs);
 (CONFIG.emptyRecheckMs || []).forEach((ms) => {
 window.setTimeout(hideEmptySlots, ms);
 });
 };

 if (document.readyState === 'loading') {
 document.addEventListener('DOMContentLoaded', boot, { once: true });
 } else {
 boot();
 }
})();