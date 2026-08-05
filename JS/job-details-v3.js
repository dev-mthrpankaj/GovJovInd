/* job-details-v3.js
   Progressive-enhancement script for the job-detail-v3 template.
   Safe to include alongside the site's existing script.js / job-details.js —
   it only touches .jd3-* hooks that are unique to this template. */
(function () {
  "use strict";

  var root = document.querySelector(".jd3");
  if (!root) return;

  /* ---------- Countdown to last date ---------- */
  var countdownEls = root.querySelectorAll("[data-countdown-to]");
  countdownEls.forEach(function (el) {
    var target = new Date(el.getAttribute("data-countdown-to"));
    if (isNaN(target.getTime())) return;
    var diffDays = Math.ceil((target - new Date()) / 86400000);
    if (diffDays > 0) {
      el.textContent = diffDays + " day" + (diffDays === 1 ? "" : "s") + " left to apply";
    } else if (diffDays === 0) {
      el.textContent = "Last day to apply";
    } else {
      el.textContent = "Application window closed";
    }
  });

  /* ---------- Sticky TOC + rail: active-section highlight ---------- */
  var sections = Array.prototype.slice.call(root.querySelectorAll("[data-jd3-section]"));
  var tocLinks = Array.prototype.slice.call(root.querySelectorAll("[data-jd3-toc-link]"));
  if (sections.length && tocLinks.length && "IntersectionObserver" in window) {
    var byId = {};
    tocLinks.forEach(function (a) {
      byId[a.getAttribute("href").replace("#", "")] = a;
    });
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var link = byId[entry.target.id];
          if (!link) return;
          if (entry.isIntersecting) {
            tocLinks.forEach(function (a) { a.classList.remove("active"); });
            link.classList.add("active");
          }
        });
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );
    sections.forEach(function (s) { observer.observe(s); });
  }

  /* ---------- Copy link ---------- */
  root.querySelectorAll("[data-jd3-copy-link]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var url = window.location.href;
      var done = function () {
        var original = btn.textContent;
        btn.textContent = "Link Copied";
        setTimeout(function () { btn.textContent = original; }, 1800);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(done).catch(function () { window.prompt("Copy this link:", url); });
      } else {
        window.prompt("Copy this link:", url);
      }
    });
  });

  /* ---------- Print ---------- */
  root.querySelectorAll("[data-jd3-print]").forEach(function (btn) {
    btn.addEventListener("click", function () { window.print(); });
  });

  /* ---------- Share (Web Share API with graceful fallback) ---------- */
  root.querySelectorAll("[data-jd3-share]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var shareData = {
        title: document.title,
        text: root.getAttribute("data-jd3-share-text") || document.title,
        url: window.location.href
      };
      if (navigator.share) {
        navigator.share(shareData).catch(function () {});
      } else {
        var network = btn.getAttribute("data-jd3-share");
        var url = encodeURIComponent(shareData.url);
        var text = encodeURIComponent(shareData.text);
        var links = {
          whatsapp: "https://wa.me/?text=" + text + "%20" + url,
          telegram: "https://t.me/share/url?url=" + url + "&text=" + text,
          twitter: "https://twitter.com/intent/tweet?url=" + url + "&text=" + text,
          facebook: "https://www.facebook.com/sharer/sharer.php?u=" + url
        };
        if (links[network]) window.open(links[network], "_blank", "noopener");
      }
    });
  });
})();
