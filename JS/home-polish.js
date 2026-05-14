(function () {
  "use strict";

  const pageName = decodeURIComponent(window.location.pathname.split("/").pop() || "index.html").toLowerCase();
  if (pageName !== "index.html" && pageName !== "") return;

  const $ = (selector) => document.querySelector(selector);

  function injectHomePolishStyles() {
    if (document.getElementById("gjuHomePolishStyles")) return;
    const style = document.createElement("style");
    style.id = "gjuHomePolishStyles";
    style.textContent = `
      .platform-hero{position:relative;overflow:hidden;border:1px solid rgba(37,99,235,.10);border-radius:28px;padding:1.4rem;background:radial-gradient(circle at 12% 12%,rgba(37,99,235,.12),transparent 32%),linear-gradient(135deg,#ffffff,#eef6ff)}
      .platform-hero:after{content:"";position:absolute;right:-80px;top:-80px;width:220px;height:220px;border-radius:999px;background:rgba(37,99,235,.08);pointer-events:none}.platform-hero>*{position:relative;z-index:1}
      .home-search-panel{display:grid;gap:.7rem;margin:1rem 0;padding:.75rem;border:1px solid #dbeafe;border-radius:18px;background:rgba(255,255,255,.88);box-shadow:0 18px 50px rgba(15,23,42,.08);backdrop-filter:blur(10px)}
      .home-search-panel .search-box{margin:0;border:2px solid #dbeafe;border-radius:16px;box-shadow:0 10px 28px rgba(37,99,235,.08)}
      .home-search-panel .search-box:focus-within{border-color:#2563eb;box-shadow:0 0 0 4px rgba(37,99,235,.12),0 18px 34px rgba(37,99,235,.14)}
      .home-intel-strip{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:.65rem;margin-top:.2rem}.home-intel-card{display:grid;gap:.12rem;padding:.72rem;border:1px solid #e2e8f0;border-radius:14px;background:#fff}.home-intel-card strong{font-size:1.15rem;color:#0f172a;line-height:1.1}.home-intel-card span{font-size:.78rem;color:#64748b;font-weight:800}.home-intel-card i{color:#2563eb;margin-right:.3rem}
      .home-trust-row{display:flex;flex-wrap:wrap;gap:.45rem;margin-top:.65rem}.home-trust-pill{display:inline-flex;align-items:center;gap:.35rem;padding:.36rem .58rem;border-radius:999px;background:#fff;border:1px solid #dbeafe;color:#1d4ed8;font-size:.78rem;font-weight:900}.home-trust-pill i{font-size:.82rem}
      .platform-stats .stat-item{position:relative;overflow:hidden;text-align:left}.platform-stats .stat-item:before{content:"";position:absolute;inset:auto -30px -55px auto;width:110px;height:110px;border-radius:999px;background:rgba(37,99,235,.08)}.platform-stats .stat-number{font-size:1.7rem}.platform-stats .stat-label{font-weight:800;color:#334155}.platform-stats .stat-note{display:block;margin-top:.2rem;color:#64748b;font-size:.78rem}
      .hero-actions .btn{border-radius:14px;box-shadow:0 14px 30px rgba(37,99,235,.16)}.hero-actions .btn-outline{box-shadow:none}
      @media(max-width:640px){.platform-hero{padding:1rem;border-radius:20px}.platform-hero h1{max-width:100%;font-size:clamp(2rem,10vw,3rem)}.home-search-panel{padding:.62rem;border-radius:16px}.home-intel-strip{grid-template-columns:1fr 1fr}.home-intel-card:last-child{grid-column:1/-1}.home-intel-card{padding:.65rem}.home-intel-card strong{font-size:1rem}.home-trust-row{gap:.35rem}.home-trust-pill{font-size:.72rem}.platform-stats{grid-template-columns:repeat(2,minmax(0,1fr))!important}.platform-stats .stat-item{padding:.85rem}.platform-stats .stat-number{font-size:1.28rem}}
    `;
    document.head.appendChild(style);
  }

  function formatCounter(value) {
    if (value >= 1000) return `${Math.round(value / 100) / 10}K+`;
    return `${Math.round(value)}+`;
  }

  function animateCounter(node, target, suffix) {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      node.textContent = suffix ? `${target}${suffix}` : formatCounter(target);
      return;
    }
    let current = 0;
    const steps = 42;
    const step = Math.max(1, target / steps);
    const timer = window.setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        window.clearInterval(timer);
      }
      node.textContent = suffix ? `${Math.round(current)}${suffix}` : formatCounter(current);
    }, 24);
  }

  function enhanceHeroSearch() {
    const searchBox = $("#homeSearchForm");
    if (!searchBox || searchBox.closest(".home-search-panel")) return;
    const panel = document.createElement("div");
    panel.className = "home-search-panel";
    searchBox.parentNode.insertBefore(panel, searchBox);
    panel.appendChild(searchBox);

    const intel = document.createElement("div");
    intel.className = "home-intel-strip";
    intel.innerHTML = `
      <div class="home-intel-card"><strong data-home-counter="jobs">0</strong><span><i class="fas fa-briefcase"></i>Exam update categories</span></div>
      <div class="home-intel-card"><strong data-home-counter="tools">0</strong><span><i class="fas fa-bolt"></i>Student tools and services</span></div>
      <div class="home-intel-card"><strong data-home-counter="speed">0%</strong><span><i class="fas fa-mobile-screen"></i>Mobile-first experience</span></div>
    `;
    panel.appendChild(intel);

    const trust = document.createElement("div");
    trust.className = "home-trust-row";
    trust.innerHTML = `
      <span class="home-trust-pill"><i class="fas fa-shield-halved"></i>Official-source verification advised</span>
      <span class="home-trust-pill"><i class="fas fa-chart-line"></i>Rank + quiz dashboard</span>
      <span class="home-trust-pill"><i class="fas fa-certificate"></i>UP certificate assistance</span>
    `;
    panel.appendChild(trust);

    animateCounter(panel.querySelector('[data-home-counter="jobs"]'), 6, "");
    animateCounter(panel.querySelector('[data-home-counter="tools"]'), 6, "");
    animateCounter(panel.querySelector('[data-home-counter="speed"]'), 100, "%");
  }

  function upgradeStatsCounters() {
    const stats = $(".platform-stats");
    if (!stats || stats.dataset.homePolished === "true") return;
    stats.dataset.homePolished = "true";
    const items = [
      ["6+", "Exam Streams", "SSC, Railway, Banking, Police, Teaching, State"],
      ["6+", "Useful Tools", "Quiz, Rank Predictor, Dashboard, Documents, UP Services, Search"],
      ["10+", "Quiz History", "Last attempts with analytics and graphs"],
      ["100%", "Mobile Focus", "Designed for mobile aspirants first"]
    ];
    stats.innerHTML = items.map(([num, label, note], index) => `
      <div class="stat-item">
        <span class="stat-number" data-final="${num}" data-stat-index="${index}">0</span>
        <span class="stat-label">${label}</span>
        <small class="stat-note">${note}</small>
      </div>
    `).join("");
    const targets = [6, 6, 10, 100];
    stats.querySelectorAll(".stat-number").forEach((node, index) => {
      animateCounter(node, targets[index], index === 3 ? "%" : "+");
    });
  }

  function polishHome() {
    injectHomePolishStyles();
    enhanceHeroSearch();
    upgradeStatsCounters();
    document.body.classList.add("home-polished");
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", polishHome);
  else polishHome();
}());
