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
      .home-search-panel{display:block;margin:.85rem 0 .7rem;padding:.45rem;border:1px solid #dbeafe;border-radius:16px;background:rgba(255,255,255,.9);box-shadow:0 10px 26px rgba(37,99,235,.10);backdrop-filter:blur(10px)}
      .home-search-panel .search-box{display:grid;grid-template-columns:auto minmax(0,1fr) auto;align-items:center;flex-wrap:nowrap;margin:0;padding:.38rem .42rem;border:1px solid #dbeafe;border-radius:13px;box-shadow:none}
      .home-search-panel .search-box input{width:auto}
      .home-search-panel .btn-search{width:auto;min-height:40px;padding:.55rem .82rem;border-radius:10px}
      .home-search-panel .search-box:focus-within{border-color:#2563eb;box-shadow:0 0 0 4px rgba(37,99,235,.12)}
      .platform-stats .stat-item{position:relative;overflow:hidden;text-align:left}.platform-stats .stat-item:before{content:"";position:absolute;inset:auto -30px -55px auto;width:110px;height:110px;border-radius:999px;background:rgba(37,99,235,.08)}.platform-stats .stat-number{font-size:1.7rem}.platform-stats .stat-label{font-weight:800;color:#334155}.platform-stats .stat-note{display:block;margin-top:.2rem;color:#64748b;font-size:.78rem}
      .hero-actions .btn{border-radius:14px;box-shadow:0 14px 30px rgba(37,99,235,.16)}.hero-actions .btn-outline{box-shadow:none}
      @media(max-width:640px){.platform-hero{padding:1rem;border-radius:20px}.platform-hero h1{max-width:100%;font-size:clamp(2rem,10vw,3rem)}.home-search-panel{margin:.75rem 0 .6rem;padding:.35rem;border-radius:14px}.home-search-panel .search-box{padding:.32rem .35rem}.home-search-panel .btn-search{min-height:38px;padding:.48rem .68rem}.platform-stats{grid-template-columns:repeat(2,minmax(0,1fr))!important}.platform-stats .stat-item{padding:.85rem}.platform-stats .stat-number{font-size:1.28rem}}
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
