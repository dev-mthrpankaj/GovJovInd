(function () {
  "use strict";

  const STORAGE_KEY = "GovJobUpdatesQuiz.attempts";
  let activeTab = "overview";
  let quizRows = [];
  let quizSource = "device";
  let mutationQueued = false;

  const $ = (selector) => document.querySelector(selector);

  function number(value, fallback = 0) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  }

  function percent(value) {
    return Math.max(0, Math.min(100, Math.round(number(value))));
  }

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, (character) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#039;"
    }[character]));
  }

  function escapeAttr(value) {
    return escapeHtml(value);
  }

  function formatDate(value) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "Recent";
    return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
  }

  function readLocalAttempts() {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  function sortRows(rows) {
    return rows.slice().sort((a, b) =>
      new Date(b.completedAt || b.timestamp || 0) - new Date(a.completedAt || a.timestamp || 0)
    );
  }

  function ensureShell() {
    const hero = $(".dashboard-hero");
    if (!hero || $("#dashboardViewTabs")) return;

    const tabs = document.createElement("nav");
    tabs.id = "dashboardViewTabs";
    tabs.className = "dashboard-view-tabs";
    tabs.setAttribute("aria-label", "Dashboard views");
    tabs.innerHTML = `
      <button type="button" data-dashboard-tab="overview" class="is-active"><i class="fas fa-house" aria-hidden="true"></i><span>Overview</span></button>
      <button type="button" data-dashboard-tab="quiz"><i class="fas fa-chart-column" aria-hidden="true"></i><span>Quiz Performance</span></button>
      <button type="button" data-dashboard-tab="rank"><i class="fas fa-ranking-star" aria-hidden="true"></i><span>Rank Predictor</span></button>
    `;

    const overview = document.createElement("section");
    overview.id = "dashboardOverviewPanel";
    overview.className = "dashboard-overview-panel";
    overview.dataset.dashboardZone = "overview";
    overview.innerHTML = `
      <section class="dashboard-brief-card" id="dashboardPerformanceBrief">
        <div class="dashboard-overview-loading"><i class="fas fa-spinner fa-spin" aria-hidden="true"></i> Preparing your performance brief...</div>
      </section>
      <section class="dashboard-overview-card dashboard-recent-card">
        <div class="dashboard-overview-head"><div><span>RECENT PRACTICE</span><h2>Latest Quiz Results</h2></div><button type="button" data-dashboard-open="quiz">View all</button></div>
        <div id="dashboardRecentQuizList"></div>
      </section>
      <section class="dashboard-overview-card dashboard-rank-brief">
        <div class="dashboard-overview-head"><div><span>RANK SNAPSHOT</span><h2>Your Latest Standing</h2></div><button type="button" data-dashboard-open="rank">Open rank analysis</button></div>
        <div id="dashboardRankBrief"></div>
      </section>
    `;

    hero.insertAdjacentElement("afterend", tabs);
    tabs.insertAdjacentElement("afterend", overview);
    tabs.addEventListener("click", handleTabClick);
    overview.addEventListener("click", handleTabClick);
  }

  function handleTabClick(event) {
    const tab = event.target.closest("[data-dashboard-tab]");
    const open = event.target.closest("[data-dashboard-open]");
    const value = tab?.dataset.dashboardTab || open?.dataset.dashboardOpen;
    if (!value) return;
    setActiveTab(value, true);
  }

  function classifyZones() {
    const practice = $("#quizScoreChart")?.closest(".dashboard-section-grid");
    if (practice) practice.dataset.dashboardZone = "quiz";

    [
      "#latestRankSnapshot", "#rankHealthBox", "#rankPercentileChart", "#rankTrendChart",
      "#rankExamChart", "#rankAnalysisBox", "#rankExamRecords", "#rankHistoryList"
    ].forEach((selector) => {
      const section = $(selector)?.closest(".dashboard-section-grid");
      if (section && section !== practice) section.dataset.dashboardZone = "rank";
    });
  }

  function setActiveTab(value, scroll) {
    activeTab = ["overview", "quiz", "rank"].includes(value) ? value : "overview";
    classifyZones();

    document.querySelectorAll("[data-dashboard-zone]").forEach((section) => {
      section.hidden = section.dataset.dashboardZone !== activeTab;
    });
    document.querySelectorAll("[data-dashboard-tab]").forEach((button) => {
      const selected = button.dataset.dashboardTab === activeTab;
      button.classList.toggle("is-active", selected);
      button.setAttribute("aria-current", selected ? "page" : "false");
    });

    const labels = {
      overview: "Dashboard Overview",
      quiz: "Quiz Performance",
      rank: "Rank Predictor"
    };
    const tabs = $("#dashboardViewTabs");
    if (tabs) tabs.setAttribute("aria-label", `${labels[activeTab]} selected`);
    if (scroll) {
      (tabs || $(".dashboard-hero"))?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function buildSubjectStats(rows) {
    const buckets = {};
    rows.forEach((row) => {
      const subject = String(row.subject || "Quiz");
      if (!buckets[subject]) buckets[subject] = { name: subject, total: 0, sum: 0, attempts: 0 };
      buckets[subject].total += 1;
      buckets[subject].sum += number(row.percentage);
      buckets[subject].attempts += Math.max(1, number(row.attemptCount, 1));
    });
    return Object.values(buckets).map((item) => ({
      ...item,
      average: item.total ? item.sum / item.total : 0
    })).sort((a, b) => a.average - b.average);
  }

  function buildOverviewStats(rows) {
    const valid = rows.filter(Boolean);
    const quizCount = valid.length;
    const totalQuestions = valid.reduce((sum, row) => sum + number(row.total || row.totalQuestions), 0);
    const attempted = valid.reduce((sum, row) => sum + number(row.attempted), 0);
    const correct = valid.reduce((sum, row) => sum + number(row.correct), 0);
    const totalAttempts = valid.reduce((sum, row) => sum + Math.max(1, number(row.attemptCount, 1)), 0);
    const average = quizCount ? valid.reduce((sum, row) => sum + number(row.percentage), 0) / quizCount : 0;
    const accuracy = attempted ? (correct / attempted) * 100 : 0;
    const attemptRate = totalQuestions ? (attempted / totalQuestions) * 100 : 0;
    const subjects = buildSubjectStats(valid);
    const weakest = subjects[0] || null;
    const strongest = subjects[subjects.length - 1] || null;
    const latest = sortRows(valid)[0] || null;
    const local = sortRows(readLocalAttempts());
    const trend = local.length > 1 ? number(local[0].percentage) - number(local[1].percentage) : null;
    return { quizCount, totalAttempts, average, accuracy, attemptRate, weakest, strongest, latest, trend };
  }

  function renderPerformanceBrief(rows) {
    const host = $("#dashboardPerformanceBrief");
    if (!host) return;
    const stats = buildOverviewStats(rows);

    if (!rows.length) {
      host.innerHTML = `
        <div class="dashboard-empty-brief">
          <span class="dashboard-brief-icon"><i class="fas fa-flag-checkered" aria-hidden="true"></i></span>
          <div><span>START YOUR PERFORMANCE STORY</span><h2>Complete your first quiz</h2><p>Your score, accuracy, priority subject and next goal will appear here.</p></div>
          <a href="quiz.html">Start a Quiz <i class="fas fa-arrow-right" aria-hidden="true"></i></a>
        </div>
      `;
      return;
    }

    const score = percent(stats.average);
    const nextTarget = score >= 85 ? 90 : score >= 70 ? 85 : 70;
    const gap = Math.max(0, nextTarget - score);
    const readiness = score >= 85 && stats.accuracy >= 80
      ? "Exam-ready consistency"
      : score >= 70 ? "Strong progress" : score >= 50 ? "Developing steadily" : "Foundation building";
    const focus = stats.weakest?.name || stats.latest?.subject || "your weakest subject";
    const actionCopy = gap
      ? `Raise your current average by ${gap} percentage point${gap === 1 ? "" : "s"} to reach the next ${nextTarget}% milestone.`
      : "Maintain this level across more quiz sets to strengthen consistency.";
    const trendText = stats.trend === null
      ? "More attempts will unlock a recent trend"
      : stats.trend > 0 ? `Up ${percent(Math.abs(stats.trend))} points in your latest device attempt`
      : stats.trend < 0 ? `Down ${percent(Math.abs(stats.trend))} points in your latest device attempt`
      : "Your latest device score is unchanged";
    const trendClass = stats.trend === null || stats.trend === 0 ? "neutral" : stats.trend > 0 ? "up" : "down";

    host.innerHTML = `
      <div class="dashboard-brief-main">
        <div class="dashboard-readiness-ring" style="--dashboard-score:${score}%" aria-label="Current average ${score} percent">
          <div><strong>${score}%</strong><span>Current avg</span></div>
        </div>
        <div class="dashboard-brief-copy">
          <span>YOUR PREPARATION BRIEF</span>
          <h2>${escapeHtml(readiness)}</h2>
          <p>${escapeHtml(actionCopy)}</p>
          <div class="dashboard-brief-trend ${trendClass}"><i class="fas fa-arrow-trend-${trendClass === "down" ? "down" : "up"}" aria-hidden="true"></i> ${escapeHtml(trendText)}</div>
        </div>
        <div class="dashboard-focus-box">
          <span>PRIORITY SUBJECT</span>
          <strong>${escapeHtml(focus)}</strong>
          <small>${stats.weakest ? `${percent(stats.weakest.average)}% current average` : "Complete more subjects for comparison"}</small>
          <a href="quiz.html">Practise Now <i class="fas fa-arrow-right" aria-hidden="true"></i></a>
        </div>
      </div>
      <div class="dashboard-brief-metrics">
        <div><span>Quiz Sets</span><strong>${stats.quizCount}</strong><small>${quizSource === "account" ? "Account synced" : "This device"}</small></div>
        <div><span>Total Attempts</span><strong>${stats.totalAttempts}</strong><small>Practice volume</small></div>
        <div><span>Accuracy</span><strong>${percent(stats.accuracy)}%</strong><small>Correct / attempted</small></div>
        <div><span>Attempt Rate</span><strong>${percent(stats.attemptRate)}%</strong><small>Questions covered</small></div>
      </div>
    `;
  }

  function renderRecent(rows) {
    const host = $("#dashboardRecentQuizList");
    if (!host) return;
    const latest = sortRows(rows).slice(0, 3);
    if (!latest.length) {
      host.innerHTML = `<div class="dashboard-mini-empty">No quiz result yet. Complete a quiz to begin tracking performance.</div>`;
      return;
    }
    host.innerHTML = `
      <div class="dashboard-recent-list">
        ${latest.map((row) => {
          const score = percent(row.percentage);
          const tone = score >= 70 ? "strong" : score >= 50 ? "steady" : "focus";
          return `
            <article>
              <span class="dashboard-recent-score ${tone}">${score}%</span>
              <div><strong>${escapeHtml(row.quizTitle || "Practice Quiz")}</strong><span>${escapeHtml(row.subject || "Quiz")} · ${formatDate(row.completedAt)}</span></div>
              <div class="dashboard-recent-meta"><strong>${percent(row.accuracy)}%</strong><span>accuracy</span></div>
              <a href="quiz.html?subject=${encodeURIComponent(String(row.subject || ""))}&quiz=${encodeURIComponent(String(row.quizId || ""))}" aria-label="Retake ${escapeAttr(row.quizTitle || "quiz")}"><i class="fas fa-arrow-right" aria-hidden="true"></i></a>
            </article>
          `;
        }).join("")}
      </div>
    `;
  }

  function renderRankBrief() {
    const host = $("#dashboardRankBrief");
    if (!host) return;
    const count = String($("#rankPredictionCount")?.textContent || "0").trim();
    const best = String($("#bestEstimatedRank")?.textContent || "--").trim();
    const exam = String($("#bestRankExam")?.textContent || "No rank prediction yet").trim();
    const latestTitle = String($("#latestRankSnapshot h3")?.textContent || "").trim();
    const percentileCard = Array.from(document.querySelectorAll("#latestRankSnapshot .rank-metric-card")).find((card) =>
      /Percentile/i.test(card.textContent || "")
    );
    const percentileValue = String(percentileCard?.querySelector("strong")?.textContent || "--").trim();
    const snapshotKey = [count, best, exam, latestTitle, percentileValue].join("|");
    if (host.dataset.snapshotKey === snapshotKey) return;
    host.dataset.snapshotKey = snapshotKey;

    if ((!count || count === "0") && best === "--") {
      host.innerHTML = `
        <div class="dashboard-rank-empty">
          <i class="fas fa-ranking-star" aria-hidden="true"></i>
          <div><strong>No rank prediction yet</strong><span>Submit an exam score to estimate your standing and keep a one-year rank history.</span></div>
          <a href="rank-predictor.html">Check Rank</a>
        </div>
      `;
      return;
    }

    host.innerHTML = `
      <div class="dashboard-rank-summary">
        <div><span>Best Estimated Rank</span><strong>${escapeHtml(best)}</strong><small>${escapeHtml(exam)}</small></div>
        <div><span>Latest Percentile</span><strong>${escapeHtml(percentileValue)}</strong><small>${escapeHtml(latestTitle || "Latest matched result")}</small></div>
        <div><span>Predictions</span><strong>${escapeHtml(count)}</strong><small>Saved rank records</small></div>
      </div>
    `;
  }

  function updateQuizData(rows, source) {
    quizRows = Array.isArray(rows) ? rows.filter(Boolean) : [];
    quizSource = source || "device";
    renderPerformanceBrief(quizRows);
    renderRecent(quizRows);
  }

  function observeDashboard() {
    const root = $("#dashboardContent") || document.body;
    new MutationObserver(() => {
      if (mutationQueued) return;
      mutationQueued = true;
      requestAnimationFrame(() => {
        mutationQueued = false;
        ensureShell();
        classifyZones();
        setActiveTab(activeTab, false);
        renderRankBrief();
      });
    }).observe(root, { childList: true, subtree: true, characterData: true });
  }

  function init() {
    if (!document.body.matches('[data-auth-page="dashboard"]')) return;
    document.body.classList.add("dashboard-performance-center");
    ensureShell();
    classifyZones();
    setActiveTab("overview", false);
    updateQuizData(readLocalAttempts(), "device");
    renderRankBrief();
    observeDashboard();
  }

  document.addEventListener("gju:dashboard-quiz-data", (event) => {
    updateQuizData(event.detail?.rows || [], event.detail?.source || "device");
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
}());
