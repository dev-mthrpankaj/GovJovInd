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
      .home-coming-soon{display:grid;gap:.85rem;padding:clamp(.9rem,2vw,1.15rem);border:1px solid #d9e5f2;border-radius:8px;background:rgba(255,255,255,.94);box-shadow:0 10px 28px rgba(15,23,42,.055)}
      .home-coming-soon__head{display:flex;align-items:end;justify-content:space-between;gap:1rem;padding-bottom:.8rem;border-bottom:1px solid #edf3fb;flex-wrap:wrap}
      .home-coming-soon__grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:.85rem}
      .home-coming-card{position:relative;overflow:hidden;display:grid;grid-template-columns:auto minmax(0,1fr);gap:.9rem;align-items:center;min-height:150px;padding:1rem;border:1px solid #dbeafe;border-radius:10px;background:linear-gradient(135deg,#fff 0%,#f7fbff 100%);box-shadow:0 8px 20px rgba(15,23,42,.05)}
      .home-coming-card::after{content:"";position:absolute;right:-36px;bottom:-50px;width:120px;height:120px;border-radius:999px;background:rgba(37,99,235,.06)}
      .home-coming-card--academy{border-color:#d1fae5;background:linear-gradient(135deg,#fff 0%,#f0fdf4 100%)}
      .home-coming-card--academy::after{background:rgba(15,118,110,.07)}
      .home-coming-icon{position:relative;z-index:1;display:grid;place-items:center;width:54px;height:54px;border-radius:12px;background:linear-gradient(135deg,#0b4ea2,#2563eb);color:#fff;font-size:1.3rem;box-shadow:0 12px 24px rgba(37,99,235,.2)}
      .home-coming-card--academy .home-coming-icon{background:linear-gradient(135deg,#0f766e,#14b8a6);box-shadow:0 12px 24px rgba(15,118,110,.18)}
      .home-coming-copy{position:relative;z-index:1;min-width:0}
      .home-coming-copy h3{margin:0;color:#06213f;font-size:1.15rem;line-height:1.2}
      .home-coming-copy p{margin:.35rem 0 .65rem;color:#526174;font-size:.9rem;line-height:1.5}
      .home-coming-badge{display:inline-flex;align-items:center;gap:.35rem;min-height:30px;padding:.35rem .65rem;border:1px solid #bfdbfe;border-radius:999px;background:#eff6ff;color:#1d4ed8;font-size:.74rem;font-weight:900;text-transform:uppercase}
      .home-coming-card--academy .home-coming-badge{border-color:#bbf7d0;background:#f0fdf4;color:#166534}
      .home-careers{position:relative;overflow:hidden;display:grid;gap:1.15rem;padding:clamp(1rem,2.5vw,1.55rem);border:1px solid rgba(37,99,235,.22);border-radius:18px;background:linear-gradient(135deg,#061b36 0%,#0b3570 46%,#0d4fa8 100%);box-shadow:0 22px 50px rgba(2,32,71,.18);color:#fff;isolation:isolate}
      .home-careers::before{content:"";position:absolute;width:330px;height:330px;right:-100px;top:-180px;border-radius:50%;background:radial-gradient(circle,rgba(255,153,51,.36) 0%,rgba(255,153,51,0) 70%);z-index:-1}
      .home-careers::after{content:"";position:absolute;width:300px;height:300px;left:-145px;bottom:-190px;border-radius:50%;background:radial-gradient(circle,rgba(19,136,8,.32) 0%,rgba(19,136,8,0) 72%);z-index:-1}
      .home-careers__top{display:grid;grid-template-columns:minmax(0,1.5fr) minmax(240px,.5fr);gap:1.2rem;align-items:center}
      .home-careers__eyebrow{display:inline-flex;align-items:center;gap:.45rem;width:max-content;margin:0 0 .55rem;padding:.4rem .72rem;border:1px solid rgba(255,255,255,.24);border-radius:999px;background:rgba(255,255,255,.09);color:#ffe4bd;font-size:.74rem;font-weight:900;letter-spacing:.08em;text-transform:uppercase;backdrop-filter:blur(8px)}
      .home-careers__title{margin:0;color:#fff;font-size:clamp(1.55rem,3vw,2.45rem);line-height:1.08;letter-spacing:-.025em}
      .home-careers__intro{max-width:760px;margin:.65rem 0 0;color:#dbeafe;font-size:.96rem;line-height:1.65}
      .home-careers__meta{display:flex;flex-wrap:wrap;gap:.48rem;margin-top:.85rem}
      .home-careers__meta span{display:inline-flex;align-items:center;gap:.38rem;padding:.42rem .68rem;border:1px solid rgba(255,255,255,.16);border-radius:999px;background:rgba(255,255,255,.08);color:#f8fafc;font-size:.78rem;font-weight:800}
      .home-careers__salary{position:relative;padding:1rem 1.05rem;border:1px solid rgba(255,255,255,.22);border-radius:16px;background:linear-gradient(145deg,rgba(255,255,255,.16),rgba(255,255,255,.07));box-shadow:inset 0 1px 0 rgba(255,255,255,.16);backdrop-filter:blur(10px)}
      .home-careers__salary small{display:block;margin-bottom:.24rem;color:#cbd5e1;font-size:.72rem;font-weight:900;letter-spacing:.08em;text-transform:uppercase}
      .home-careers__salary strong{display:block;color:#fff;font-size:clamp(1.38rem,2.4vw,1.9rem);line-height:1.15}
      .home-careers__salary span{display:block;margin-top:.25rem;color:#bfdbfe;font-size:.8rem;font-weight:700}
      .home-careers__roles{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:.75rem}
      .home-career-card{position:relative;display:flex;flex-direction:column;min-height:190px;padding:1rem;border:1px solid rgba(255,255,255,.18);border-radius:14px;background:rgba(255,255,255,.095);box-shadow:inset 0 1px 0 rgba(255,255,255,.11);backdrop-filter:blur(10px);transition:transform .18s ease,border-color .18s ease,background .18s ease}
      .home-career-card:hover{transform:translateY(-3px);border-color:rgba(255,255,255,.36);background:rgba(255,255,255,.13)}
      .home-career-card__icon{display:grid;place-items:center;width:42px;height:42px;margin-bottom:.75rem;border-radius:11px;background:linear-gradient(135deg,#fff,#dbeafe);color:#0b4ea2;font-size:1rem;box-shadow:0 8px 20px rgba(2,18,43,.2)}
      .home-career-card:nth-child(2) .home-career-card__icon{background:linear-gradient(135deg,#ecfdf5,#bbf7d0);color:#15803d}
      .home-career-card:nth-child(3) .home-career-card__icon{background:linear-gradient(135deg,#fff7ed,#fed7aa);color:#c2410c}
      .home-career-card h3{margin:0;color:#fff;font-size:1rem;line-height:1.35}
      .home-career-card p{margin:.48rem 0 0;color:#cbd5e1;font-size:.82rem;line-height:1.52}
      .home-career-card__vacancy{margin-top:auto;padding-top:.7rem;color:#dbeafe;font-size:.72rem;font-weight:900;text-transform:uppercase;letter-spacing:.04em}
      .home-careers__footer{display:flex;justify-content:space-between;align-items:center;gap:1rem;padding-top:.15rem;flex-wrap:wrap}
      .home-careers__note{display:flex;align-items:center;gap:.5rem;color:#dbeafe;font-size:.82rem;font-weight:700}
      .home-careers__cta{display:inline-flex;align-items:center;justify-content:center;gap:.55rem;min-height:48px;padding:.72rem 1.05rem;border:1px solid #fff;border-radius:12px;background:#fff;color:#0b3d82;font-size:.88rem;font-weight:900;text-decoration:none;box-shadow:0 12px 28px rgba(2,18,43,.22);transition:transform .18s ease,box-shadow .18s ease}
      .home-careers__cta:hover{transform:translateY(-2px);box-shadow:0 16px 32px rgba(2,18,43,.28)}
      @media(max-width:860px){.home-careers__top{grid-template-columns:1fr}.home-careers__salary{max-width:360px}.home-careers__roles{grid-template-columns:1fr}.home-career-card{min-height:0}.home-careers__footer{align-items:stretch}.home-careers__cta{width:100%}}
      @media(max-width:640px){.home-search-panel{margin:.75rem 0 .6rem;padding:.35rem;border-radius:14px}.home-search-panel .search-box{padding:.32rem .35rem}.home-search-panel .btn-search{min-height:38px;padding:.48rem .68rem}.platform-stats{grid-template-columns:repeat(2,minmax(0,1fr))!important}.platform-stats .stat-item{padding:.85rem}.platform-stats .stat-number{font-size:1.28rem}.home-coming-soon__grid{grid-template-columns:1fr}.home-coming-card{min-height:132px;padding:.9rem}.home-coming-icon{width:48px;height:48px;font-size:1.15rem}.home-coming-copy h3{font-size:1.05rem}.home-coming-copy p{font-size:.84rem}.home-careers{border-radius:14px;padding:.95rem}.home-careers__title{font-size:1.55rem}.home-careers__intro{font-size:.88rem}.home-careers__meta span{font-size:.72rem}.home-careers__salary{padding:.85rem}.home-career-card{padding:.9rem}.home-careers__note{font-size:.76rem}}
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

  function setupComingSoonSection() {
    if (document.querySelector(".home-coming-soon")) return;
    const typingCta = $(".live-test-cta");
    if (!typingCta) return;

    const section = document.createElement("section");
    section.className = "home-coming-soon platform-section";
    section.setAttribute("aria-labelledby", "homeComingSoonTitle");
    section.innerHTML = `
      <div class="home-coming-soon__head">
        <div>
          <p class="section-kicker">Coming soon</p>
          <h2 class="section-title" id="homeComingSoonTitle">More for Aspirants</h2>
          <p class="section-subtitle">Two new GovJobUpdates experiences are being prepared for students and physical aspirants.</p>
        </div>
      </div>
      <div class="home-coming-soon__grid">
        <article class="home-coming-card home-coming-card--store">
          <span class="home-coming-icon" aria-hidden="true"><i class="fas fa-bag-shopping"></i></span>
          <div class="home-coming-copy">
            <h3>Aspirant Store</h3>
            <p>Books, running shoes, physical preparation clothing, study essentials and more for aspirants.</p>
            <span class="home-coming-badge"><i class="fas fa-clock" aria-hidden="true"></i> Coming Soon</span>
          </div>
        </article>
        <article class="home-coming-card home-coming-card--academy">
          <span class="home-coming-icon" aria-hidden="true"><i class="fas fa-person-running"></i></span>
          <div class="home-coming-copy">
            <h3>Physical Academy</h3>
            <p>Running guidance, physical test preparation, training resources and aspirant-focused support.</p>
            <span class="home-coming-badge"><i class="fas fa-clock" aria-hidden="true"></i> Coming Soon</span>
          </div>
        </article>
      </div>
    `;

    typingCta.insertAdjacentElement("afterend", section);
  }

  function setupCareersSection() {
    if (document.querySelector(".home-careers")) return;
    const comingSoon = $(".home-coming-soon");
    if (!comingSoon) return;

    const section = document.createElement("section");
    section.className = "home-careers platform-section";
    section.setAttribute("aria-labelledby", "homeCareersTitle");
    section.innerHTML = `
      <div class="home-careers__top">
        <div>
          <p class="home-careers__eyebrow"><i class="fas fa-sparkles" aria-hidden="true"></i> Careers · We're Hiring</p>
          <h2 class="home-careers__title" id="homeCareersTitle">Build GovJobUpdates With Us</h2>
          <p class="home-careers__intro">Join a growing platform focused on reliable government job updates and better exam preparation experiences for aspirants across India.</p>
          <div class="home-careers__meta" aria-label="Job highlights">
            <span><i class="fas fa-briefcase" aria-hidden="true"></i> 3 Open Positions</span>
            <span><i class="fas fa-house-laptop" aria-hidden="true"></i> Remote</span>
            <span><i class="fas fa-clock" aria-hidden="true"></i> Full Time</span>
            <span><i class="fas fa-location-dot" aria-hidden="true"></i> India</span>
          </div>
        </div>
        <div class="home-careers__salary" aria-label="Salary range">
          <small>Salary Range</small>
          <strong>₹30,000 – ₹35,000</strong>
          <span>per month · based on role & selection</span>
        </div>
      </div>

      <div class="home-careers__roles" aria-label="Open career positions">
        <article class="home-career-card">
          <span class="home-career-card__icon" aria-hidden="true"><i class="fas fa-magnifying-glass-chart"></i></span>
          <h3>Government Job Content & Research Executive</h3>
          <p>Research official recruitment updates, verify details and prepare accurate publication-ready content.</p>
          <span class="home-career-card__vacancy">1 Vacancy</span>
        </article>
        <article class="home-career-card">
          <span class="home-career-card__icon" aria-hidden="true"><i class="fas fa-list-check"></i></span>
          <h3>Competitive Exam Question & Quiz Expert</h3>
          <p>Create and verify exam-oriented bilingual MCQs, explanations, quizzes and mock-test content.</p>
          <span class="home-career-card__vacancy">1 Vacancy</span>
        </article>
        <article class="home-career-card">
          <span class="home-career-card__icon" aria-hidden="true"><i class="fas fa-shield-halved"></i></span>
          <h3>Content Quality & Publishing Executive</h3>
          <p>Perform final quality checks for job updates and exam content before accurate publication.</p>
          <span class="home-career-card__vacancy">1 Vacancy</span>
        </article>
      </div>

      <div class="home-careers__footer">
        <span class="home-careers__note"><i class="fas fa-circle-check" aria-hidden="true"></i> Skills and practical performance matter more than years of experience.</span>
        <a class="home-careers__cta" href="HTML/recruitment.html">View Open Positions <i class="fas fa-arrow-right" aria-hidden="true"></i></a>
      </div>
    `;

    comingSoon.insertAdjacentElement("afterend", section);
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
          <a href="typing-test/index.html"><i class="fas fa-keyboard" aria-hidden="true"></i> Typing Test</a>
          <a href="HTML/documents.html"><i class="fas fa-file-lines" aria-hidden="true"></i> Documents</a>
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
    setupComingSoonSection();
    setupCareersSection();
    setupLatestUpdatesDashboard();
    document.body.classList.add("home-polished");
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", polishHome);
  else polishHome();

  window.addEventListener("gju:home-data-ready", setupLatestUpdatesDashboard, { once: true });
}());