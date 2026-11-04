/* job-page-v2.js
 * GovJobUpdates /jobs/ format v2.
 * INTERACTIONS ONLY. This file never builds page content, meta tags or schema:
 * everything crawlers/AI need is already static HTML.
 * Optional hooks (all progressive enhancement):
 *   [data-deadline="ISO date"]  -> live countdown in #stageCountdown
 *   [data-open-until="ISO date"]-> hidden after that time + "window closed" note
 */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  function toast(msg) {
    var t = $('.gjd-toast');
    if (!t) { t = document.createElement('div'); t.className = 'gjd-toast'; document.body.appendChild(t); }
    t.textContent = msg; t.classList.add('is-show');
    setTimeout(function () { t.classList.remove('is-show'); }, 2200);
  }

  function initShare() {
    var btn = $('#shareBtn'); if (!btn) return;
    btn.addEventListener('click', function () {
      var data = { title: document.title, url: ($('link[rel="canonical"]') || {}).href || location.href };
      if (navigator.share) { navigator.share(data).catch(function () {}); return; }
      if (navigator.clipboard) navigator.clipboard.writeText(data.url).then(function () { toast('Link copied'); });
    });
    var p = $('#printBtn'); if (p) p.addEventListener('click', function () { window.print(); });
  }

  function initToc() {
    var links = $$('#toc a'); if (!links.length || !('IntersectionObserver' in window)) return;
    var map = {};
    links.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        links.forEach(function (a) { a.classList.remove('is-active'); a.removeAttribute('aria-current'); });
        var a = map[e.target.id]; if (a) { a.classList.add('is-active'); a.setAttribute('aria-current', 'true'); }
      });
    }, { rootMargin: '-25% 0px -65% 0px' });
    Object.keys(map).forEach(function (id) { var s = document.getElementById(id); if (s) io.observe(s); });
  }

  function initStickyOffset() {
    var header = $('body > header'); if (!header) return;
    function set() {
      var fixed = ['fixed', 'sticky'].indexOf(getComputedStyle(header).position) > -1;
      var h = Math.ceil(header.getBoundingClientRect().height);
      document.documentElement.style.setProperty('--gjd-sticky-top', (fixed ? h + 12 : 12) + 'px');
    }
    set(); window.addEventListener('resize', set, { passive: true });
  }

  function initMobileBar() {
    var bar = $('#mobileActionBar'); if (!bar) return;
    var about = $('#about'), footer = $('body > footer'), a = !about, f = false;
    function render() {
      var top = !!$('.go-top-btn.is-visible'), on = a && !f && !top;
      bar.classList.toggle('is-visible', on);
      bar.classList.toggle('is-footer-visible', !on);
      bar.setAttribute('aria-hidden', on ? 'false' : 'true');
    }
    if ('IntersectionObserver' in window) {
      if (about) new IntersectionObserver(function (e) { a = e.some(function (x) { return x.isIntersecting; }); render(); }, { threshold: .05 }).observe(about);
      if (footer) new IntersectionObserver(function (e) { f = e.some(function (x) { return x.isIntersecting; }); render(); }).observe(footer);
    } else { a = true; }
    window.addEventListener('scroll', render, { passive: true });
    render();
  }

  function initCountdown() {
    var box = $('#stageCountdown'); if (!box) return;
    var end = Date.parse(box.getAttribute('data-deadline') || '');
    if (isNaN(end) || end <= Date.now()) { box.hidden = true; return; }
    var d = $('#countDays'), h = $('#countHours'), m = $('#countMinutes');
    function tick() {
      var diff = Math.max(0, end - Date.now());
      d.textContent = Math.floor(diff / 864e5);
      h.textContent = Math.floor(diff % 864e5 / 36e5);
      m.textContent = Math.floor(diff % 36e5 / 6e4);
      if (!diff) { box.hidden = true; clearInterval(timer); }
    }
    box.hidden = false; tick();
    var timer = setInterval(tick, 30000);
  }

  function initOpenUntil() {
    var closed = false;
    $$('[data-open-until]').forEach(function (el) {
      var t = Date.parse(el.getAttribute('data-open-until'));
      if (!isNaN(t) && t < Date.now()) { el.hidden = true; closed = true; }
    });
    if (closed && !$('.gjv2-closed-note')) {
      var host = $('.gjd-update-strip') || $('main');
      var n = document.createElement('p'); n.className = 'gjv2-closed-note';
      n.textContent = 'The application window has closed as per the official schedule. Check Important Links for the latest stage.';
      if (host && host.parentNode) host.parentNode.insertBefore(n, host);
    }
  }

  function init() {
    initShare(); initToc(); initStickyOffset(); initMobileBar(); initCountdown(); initOpenUntil();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
