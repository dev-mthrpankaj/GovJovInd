(function () {
  "use strict";

  const pageName = decodeURIComponent(window.location.pathname.split("/").pop() || "index.html").toLowerCase();
  if (pageName !== "index.html" && pageName !== "") return;

  const $ = (selector) => document.querySelector(selector);

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function normalizeHomeUrl(value, fallback) {
    const url = String(value || fallback || "#").trim();
    if (!url || url === "#") return "#";
    if (/^(?:https?:)?\/\//i.test(url) || url.startsWith("/") || url.startsWith("#")) return url;
    return url.replace(/^(\.\.\/)+/, "");
  }

  function formatHomeDate(value) {
    if (!value) return "";
    const date = new Date(`${value}T00:00:00`);
    if (Number.isNaN(date.getTime())) return String(value);
    return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  }

  function injectHomePolishStyles() {
    if (document.getElementById("gjuHomePolishStyles")) return;
    const style = document.createElement("style");
    style.id = "gjuHomePolishStyles";
    style.textContent = `
      .home-search-panel{display:block;margin:.85rem 0 .7rem;padding:.45rem;border:1px solid #dbeafe;border-radius:16px;background:rgba(255,255,255,.9);box-shadow:0 10px 26px rgba(37,99,235,.10);backdrop-filter:blur(10px)}
      .home-search-panel .search-box{display:grid;grid-template-columns:auto minmax(0,1fr) auto;align-items:center;flex-wrap:nowrap;margin:0;padding:.38rem .42rem;border:1px solid #dbeafe;border-radius:13px;box-shadow:none}
      .home-search-panel .search-box input{width:auto}
      .home-search-panel .btn-search{width:auto;min-height:40px;padding:.55rem .82rem;border-radius:10px}
      .home-search-panel .search-box:focus-within{border-color:#2563eb;box-shadow:0 0 0 4px rgba(37,99,235,.12)}
      .platform-stats .stat-item{position:relative;overflow:hidden;text-align:left}.platform-stats .stat-item:before{content:"";position:absolute;inset:auto -30px -55px auto;width:110px;height:110px;border-radius:999px;background:rgba(37,99,235,.08)}.platform-stats .stat-number{font-size:1.7rem}.platform-stats .stat-label{font-weight:800;color:#334155}.platform-stats .stat-note{display:block;margin-top:.2rem;color:#64748b;font-size:.78rem}
      .hero-actions .btn{border-radius:14px;box-shadow:0 14px 30px rgba(37,99,235,.16)}.hero-actions .btn-outline{box-shadow:none}
      @media(max-width:640px){.home-search-panel{margin:.75rem 0 .6rem;padding:.35rem;border-radius:14px}.home-search-panel .search-box{padding:.32rem .35rem}.home-search-panel .btn-search{min-height:38px;padding:.48rem .68rem}.platform-stats{grid-template-columns:repeat(2,minmax(0,1fr))!important}.platform-stats .stat-item{padding:.85rem}.platform-stats .stat-number{font-size:1.28rem}}
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

  function setupHeroToolsToggle() {
    const grid = $(".hero-tool-grid");
    if (!grid || grid.dataset.toolsToggleReady === "true") return;

    const cards = Array.from(grid.querySelectorAll(".hero-tool-card"));
    if (cards.length <= 6) return;

    grid.dataset.toolsToggleReady = "true";
    cards.slice(6).forEach((card) => {
      card.classList.add("is-extra-tool");
      card.hidden = true;
    });

    const toggle = document.createElement("button");
    toggle.className = "hero-tools-toggle";
    toggle.type = "button";
    toggle.setAttribute("aria-expanded", "false");
    toggle.innerHTML = '<span>See more</span><i class="fas fa-chevron-down" aria-hidden="true"></i>';

    grid.insertAdjacentElement("afterend", toggle);

    toggle.addEventListener("click", () => {
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      cards.slice(6).forEach((card) => {
        card.hidden = expanded;
      });
      grid.classList.toggle("is-expanded", !expanded);
      toggle.setAttribute("aria-expanded", String(!expanded));
      toggle.innerHTML = expanded
        ? '<span>See more</span><i class="fas fa-chevron-down" aria-hidden="true"></i>'
        : '<span>Show less</span><i class="fas fa-chevron-up" aria-hidden="true"></i>';
    });
  }

  function getHomeUpdateSources() {
    return [
      {
        type: "Latest Job",
        icon: "fa-briefcase",
        color: "blue",
        href: "HTML/latest-jobs.html",
        records: window.GovJobUpdatesJobs || [],
        dateKey: "updatedAt",
        meta(record) {
          return [record.department || record.organization, record.totalPosts ? `${record.totalPosts} posts` : "", record.lastDate ? `Last date ${formatHomeDate(record.lastDate)}` : ""].filter(Boolean).join(" | ");
        }
      },
      {
        type: "Admit Card",
        icon: "fa-id-card",
        color: "saffron",
        href: "HTML/admitcard.html",
        records: window.GovJobUpdatesAdmitCards || [],
        dateKey: "releaseDate",
        meta(record) {
          return [record.department || record.organization, record.examDate ? `Exam ${formatHomeDate(record.examDate)}` : "", record.status].filter(Boolean).join(" | ");
        }
      },
      {
        type: "Result",
        icon: "fa-square-poll-vertical",
        color: "green",
        href: "HTML/results.html",
        records: window.GovJobUpdatesResults || [],
        dateKey: "resultDate",
        meta(record) {
          return [record.department || record.organization, record.resultDate ? `Released ${formatHomeDate(record.resultDate)}` : "", record.status].filter(Boolean).join(" | ");
        }
      },
      {
        type: "Answer Key",
        icon: "fa-key",
        color: "navy",
        href: "HTML/answer-key.html",
        records: window.GovJobUpdatesAnswerKeys || [],
        dateKey: "releaseDate",
        meta(record) {
          return [record.department || record.organization, record.releaseDate ? `Released ${formatHomeDate(record.releaseDate)}` : "", record.status].filter(Boolean).join(" | ");
        }
      }
    ];
  }

  function setupLatestUpdatesDashboard() {
    if (document.querySelector(".home-updates-dashboard")) return;
    const hero = $(".platform-hero");
    if (!hero) return;

    const sources = getHomeUpdateSources();
    const updates = sources.flatMap((source) => source.records.slice(0, 4).map((record) => ({
      source,
      record,
      date: record.updatedAt || record[source.dateKey] || record.releaseDate || record.resultDate || record.lastDate || ""
    }))).sort((a, b) => String(b.date).localeCompare(String(a.date))).slice(0, 7);

    if (!updates.length) return;

    const section = document.createElement("section");
    section.className = "home-updates-dashboard platform-section";
    section.setAttribute("aria-labelledby", "homeUpdatesTitle");
    section.innerHTML = `
      <div class="home-updates-head">
        <div>
          <p class="section-kicker">Fresh updates</p>
          <h2 class="section-title" id="homeUpdatesTitle">Latest Sarkari Updates</h2>
          <p class="section-subtitle">Jobs, admit cards, results and answer keys in one clean feed.</p>
        </div>
        <a class="section-link" href="HTML/latest-jobs.html">View all <i class="fas fa-arrow-right" aria-hidden="true"></i></a>
      </div>
      <div class="home-update-summary" aria-label="Update categories">
        ${sources.map((source) => `
          <a class="home-update-summary-card home-update-summary-card--${source.color}" href="${source.href}">
            <i class="fas ${source.icon}" aria-hidden="true"></i>
            <span>${source.type}</span>
            <strong>${source.records.length || 0}</strong>
          </a>
        `).join("")}
      </div>
      <div class="home-updates-layout">
        <div class="home-updates-list">
          ${updates.map(({ source, record }) => `
            <a class="home-update-item home-update-item--${source.color}" href="${normalizeHomeUrl(record.detailPage, source.href)}">
              <span class="home-update-icon"><i class="fas ${source.icon}" aria-hidden="true"></i></span>
              <span class="home-update-copy">
                <span class="home-update-type">${source.type}</span>
                <strong>${escapeHtml(record.title)}</strong>
                <small>${escapeHtml(source.meta(record))}</small>
              </span>
              <i class="fas fa-chevron-right" aria-hidden="true"></i>
            </a>
          `).join("")}
        </div>
        <aside class="home-quick-panel" aria-label="Quick actions">
          <strong>Quick access</strong>
          <a href="HTML/latest-jobs.html"><i class="fas fa-briefcase" aria-hidden="true"></i> Latest Jobs</a>
          <a href="HTML/admitcard.html"><i class="fas fa-id-card" aria-hidden="true"></i> Admit Card</a>
          <a href="HTML/results.html"><i class="fas fa-square-poll-vertical" aria-hidden="true"></i> Results</a>
          <a href="HTML/quiz.html"><i class="fas fa-circle-question" aria-hidden="true"></i> Quiz Practice</a>
          <a href="HTML/rank-predictor.html"><i class="fas fa-chart-line" aria-hidden="true"></i> Rank Predictor</a>
        </aside>
      </div>
    `;

    hero.insertAdjacentElement("afterend", section);
  }

  function polishHome() {
    injectHomePolishStyles();
    enhanceHeroSearch();
    upgradeStatsCounters();
    setupHeroToolsToggle();
    setupLatestUpdatesDashboard();
    document.body.classList.add("home-polished");
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", polishHome);
  else polishHome();
}());
