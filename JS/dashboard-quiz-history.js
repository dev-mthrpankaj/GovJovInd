(function () {
  "use strict";

  const STORAGE_KEY = "GovJobUpdatesQuiz.attempts";
  const UNFINISHED_KEY = "GovJobUpdatesQuiz.unfinished";
  const PROGRESS_API = "https://test.govjobupdates.com/live-test/practice-quiz-api/progress.php";
  const PROGRESS_CSS = "../CSS/dashboard-quiz-progress.css?v=20260829-phase2g";
  const $ = (selector) => document.querySelector(selector);
  const setText = (selector, value) => {
    const node = $(selector);
    if (node) node.textContent = value;
  };

  let activeAttempts = [];
  let serverRows = [];
  let serverAttemptTotal = 0;
  let firebaseImportPromise = null;
  let resizeTimer = 0;

  function ensureProgressStyles() {
    if (document.querySelector('link[data-gju-quiz-progress-css]')) return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = PROGRESS_CSS;
    link.dataset.gjuQuizProgressCss = "1";
    document.head.appendChild(link);
  }

  function readJson(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  }

  function readLocalAttempts() {
    const parsed = readJson(STORAGE_KEY, []);
    return Array.isArray(parsed) ? parsed : [];
  }

  function readUnfinished() {
    const value = readJson(UNFINISHED_KEY, null);
    return value && typeof value === "object" && value.quizId ? value : null;
  }

  function number(value, fallback = 0) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  }

  function rounded(value, digits = 0) {
    const factor = 10 ** digits;
    return Math.round(number(value) * factor) / factor;
  }

  function percent(value) {
    return Math.max(0, Math.min(100, Math.round(number(value))));
  }

  function compactLimit(desktopCount, mobileCount) {
    return window.matchMedia("(max-width: 640px)").matches ? mobileCount : desktopCount;
  }

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, (character) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#039;"
    }[character]));
  }

  function escapeAttr(value) {
    return escapeHtml(value);
  }

  function formatDate(value, long = false) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "Recent";
    return date.toLocaleDateString("en-IN", long
      ? { day: "2-digit", month: "short", year: "numeric" }
      : { day: "2-digit", month: "short" }
    );
  }

  function formatTime(seconds) {
    const total = Math.max(0, Math.round(number(seconds)));
    const minutes = Math.floor(total / 60);
    const secs = total % 60;
    return minutes ? `${minutes}m ${String(secs).padStart(2, "0")}s` : `${secs}s`;
  }

  function sortAttempts(attempts) {
    return attempts.slice().sort((a, b) =>
      new Date(b.completedAt || b.timestamp || 0) - new Date(a.completedAt || a.timestamp || 0)
    );
  }

  function normalizeServerRows(rows) {
    return (Array.isArray(rows) ? rows : []).map((row) => ({
      id: row.latestAttemptId || `server-${row.quizKey}`,
      quizId: row.quizKey,
      quizTitle: row.quizTitle || "Quiz Attempt",
      subject: row.subject || "Quiz",
      score: number(row.score),
      maxScore: number(row.maxScore),
      percentage: number(row.percentage),
      accuracy: number(row.accuracy),
      total: number(row.totalQuestions),
      totalQuestions: number(row.totalQuestions),
      attempted: number(row.attempted),
      correct: number(row.correct),
      wrong: number(row.wrong),
      unattempted: number(row.unattempted),
      timeTaken: number(row.timeTakenSeconds),
      completedAt: row.completedAt,
      attemptCount: Math.max(1, number(row.attemptCount, 1)),
      bestScore: number(row.bestScore, row.score),
      bestPercentage: number(row.bestPercentage, row.percentage),
      source: "account"
    }));
  }

  function buildSubjectStats(rows) {
    const buckets = {};
    (Array.isArray(rows) ? rows : []).forEach((row) => {
      const subject = row.subject || row.subject_name || "Quiz";
      if (!buckets[subject]) {
        buckets[subject] = {
          name: subject,
          quizCount: 0,
          attemptCount: 0,
          latestTotal: 0,
          best: 0
        };
      }
      const bucket = buckets[subject];
      bucket.quizCount += 1;
      bucket.attemptCount += Math.max(1, number(row.attemptCount, 1));
      bucket.latestTotal += number(row.percentage);
      bucket.best = Math.max(bucket.best, number(row.bestPercentage, row.percentage));
    });

    return Object.values(buckets)
      .map((item) => ({
        ...item,
        average: item.quizCount ? item.latestTotal / item.quizCount : 0
      }))
      .sort((a, b) => b.average - a.average || b.attemptCount - a.attemptCount)
      .slice(0, compactLimit(6, 5));
  }

  function quizUrl(row) {
    const subject = encodeURIComponent(String(row.subject || "Quiz"));
    const quizId = encodeURIComponent(String(row.quizId || row.quizKey || ""));
    return `quiz.html?subject=${subject}&quiz=${quizId}`;
  }

  function ensureQuizProgressShell() {
    const scoreChart = $("#quizScoreChart");
    if (!scoreChart) return null;
    const card = scoreChart.closest(".dash-section-card");
    if (!card) return null;

    card.classList.add("quiz-account-card");
    const head = card.querySelector(".dash-section-head");
    if (head) {
      const title = head.querySelector("h2");
      const copy = head.querySelector("p");
      if (title) title.textContent = "My Quiz Progress";
      if (copy) copy.textContent = "Account-synced latest results, best scores and total attempts across devices.";
      if (!head.querySelector("[data-quiz-sync-state]")) {
        const state = document.createElement("span");
        state.className = "quiz-sync-badge is-loading";
        state.dataset.quizSyncState = "1";
        state.innerHTML = '<i class="fas fa-rotate fa-spin" aria-hidden="true"></i><span>Syncing</span>';
        head.appendChild(state);
      }
    }

    let overview = card.querySelector("#quizAccountOverview");
    if (!overview) {
      overview = document.createElement("div");
      overview.id = "quizAccountOverview";
      overview.className = "quiz-account-overview";
      scoreChart.before(overview);
    }

    let unfinished = card.querySelector("#quizUnfinishedBanner");
    if (!unfinished) {
      unfinished = document.createElement("div");
      unfinished.id = "quizUnfinishedBanner";
      unfinished.className = "quiz-unfinished-banner";
      overview.after(unfinished);
    }

    let progressList = card.querySelector("#quizAccountProgressList");
    if (!progressList) {
      progressList = document.createElement("div");
      progressList.id = "quizAccountProgressList";
      progressList.className = "quiz-account-progress-list";
      const history = $("#quizHistoryList");
      if (history) history.before(progressList);
      else card.appendChild(progressList);
    }

    scoreChart.classList.add("quiz-device-history");
    return card;
  }

  function setSyncState(type, text) {
    const node = $("[data-quiz-sync-state]");
    if (!node) return;
    node.className = `quiz-sync-badge ${type}`;
    const icons = {
      "is-synced": "fa-cloud-arrow-up",
      "is-device": "fa-mobile-screen-button",
      "is-error": "fa-triangle-exclamation",
      "is-loading": "fa-rotate fa-spin"
    };
    node.innerHTML = `<i class="fas ${icons[type] || icons["is-loading"]}" aria-hidden="true"></i><span>${escapeHtml(text)}</span>`;
  }

  function renderOverview(rows) {
    const overview = $("#quizAccountOverview");
    if (!overview) return;

    const quizCount = rows.length;
    const attempts = rows.reduce((sum, row) => sum + Math.max(1, number(row.attemptCount, 1)), 0);
    const best = rows.reduce((value, row) => Math.max(value, number(row.bestPercentage, row.percentage)), 0);
    const latest = rows.length ? number(rows[0].percentage) : 0;

    overview.innerHTML = `
      <div class="quiz-overview-stat">
        <span>Quizzes Practised</span>
        <strong>${quizCount}</strong>
        <small>Unique quiz sets</small>
      </div>
      <div class="quiz-overview-stat">
        <span>Total Attempts</span>
        <strong>${attempts}</strong>
        <small>Across synced quizzes</small>
      </div>
      <div class="quiz-overview-stat">
        <span>Latest Score</span>
        <strong>${quizCount ? `${percent(latest)}%` : "--"}</strong>
        <small>${quizCount ? "Most recent completion" : "Complete a quiz first"}</small>
      </div>
      <div class="quiz-overview-stat is-best">
        <span>Best Score</span>
        <strong>${quizCount ? `${percent(best)}%` : "--"}</strong>
        <small>Best recorded result</small>
      </div>
    `;
  }

  function renderUnfinished() {
    const node = $("#quizUnfinishedBanner");
    if (!node) return;
    const unfinished = readUnfinished();

    if (!unfinished) {
      node.hidden = true;
      node.innerHTML = "";
      return;
    }

    const answered = Array.isArray(unfinished.answers)
      ? unfinished.answers.filter((answer) => answer !== null && answer !== undefined).length
      : 0;
    const total = Array.isArray(unfinished.answers) ? unfinished.answers.length : 0;

    node.hidden = false;
    node.innerHTML = `
      <div class="quiz-unfinished-icon"><i class="fas fa-clock-rotate-left" aria-hidden="true"></i></div>
      <div>
        <span>UNFINISHED ON THIS DEVICE</span>
        <strong>Resume your saved practice quiz</strong>
        <small>${answered}${total ? ` of ${total}` : ""} answered · local resume is kept on this device</small>
      </div>
      <a class="quiz-progress-action" href="quiz.html?quiz=${encodeURIComponent(String(unfinished.quizId))}">
        Continue <i class="fas fa-arrow-right" aria-hidden="true"></i>
      </a>
    `;
  }

  function renderAccountQuizCards(rows) {
    const node = $("#quizAccountProgressList");
    if (!node) return;

    if (!rows.length) {
      node.innerHTML = `
        <div class="quiz-progress-empty">
          <i class="fas fa-chart-line" aria-hidden="true"></i>
          <div><strong>No synced quiz progress yet</strong><span>Complete a practice quiz while logged in and it will appear here on every device.</span></div>
          <a href="quiz.html">Start Quiz</a>
        </div>
      `;
      return;
    }

    const visible = rows.slice(0, compactLimit(6, 4));
    node.innerHTML = `
      <div class="quiz-progress-list-head">
        <div>
          <span>ACCOUNT PROGRESS</span>
          <strong>Latest result per quiz</strong>
        </div>
        <small>${rows.length} synced quiz${rows.length === 1 ? "" : "zes"}</small>
      </div>
      <div class="quiz-progress-grid">
        ${visible.map((row) => {
          const latest = percent(row.percentage);
          const best = percent(row.bestPercentage);
          const accuracy = percent(row.accuracy);
          const attempts = Math.max(1, number(row.attemptCount, 1));
          const score = rounded(row.score, 2);
          const maxScore = rounded(row.maxScore, 2);
          return `
            <article class="quiz-progress-card">
              <div class="quiz-progress-card-head">
                <div>
                  <span>${escapeHtml(row.subject || "Quiz")}</span>
                  <h3>${escapeHtml(row.quizTitle || "Practice Quiz")}</h3>
                </div>
                <span class="quiz-attempt-pill">${attempts} attempt${attempts === 1 ? "" : "s"}</span>
              </div>
              <div class="quiz-progress-score-row">
                <div class="quiz-progress-score">
                  <span>Latest</span>
                  <strong>${latest}%</strong>
                  <small>${score}/${maxScore || "--"} marks</small>
                </div>
                <div class="quiz-progress-score is-best">
                  <span>Best</span>
                  <strong>${best}%</strong>
                  <small>Personal best</small>
                </div>
                <div class="quiz-progress-score">
                  <span>Accuracy</span>
                  <strong>${accuracy}%</strong>
                  <small>${number(row.correct)} correct</small>
                </div>
              </div>
              <div class="quiz-latest-bar" aria-label="Latest score ${latest}%"><i style="width:${latest}%"></i></div>
              <div class="quiz-progress-card-foot">
                <span><i class="far fa-calendar" aria-hidden="true"></i> ${formatDate(row.completedAt, true)}</span>
                <span><i class="far fa-clock" aria-hidden="true"></i> ${formatTime(row.timeTaken)}</span>
                <a href="${escapeAttr(quizUrl(row))}">Retake <i class="fas fa-arrow-right" aria-hidden="true"></i></a>
              </div>
            </article>
          `;
        }).join("")}
      </div>
    `;
  }

  function renderDeviceTrend(localAttempts) {
    const chart = $("#quizScoreChart");
    if (!chart) return;

    const recent = sortAttempts(localAttempts).slice(0, 10).reverse();
    if (!recent.length) {
      chart.innerHTML = `
        <div class="quiz-device-note">
          <i class="fas fa-mobile-screen-button" aria-hidden="true"></i>
          <div><strong>Device attempt trend</strong><span>No local attempt history on this device yet. Account progress above is still available after login.</span></div>
        </div>
      `;
      return;
    }

    chart.innerHTML = `
      <div class="dash-chart-summary quiz-device-summary">
        <div>
          <strong>Device attempt trend</strong>
          <span>Last ${recent.length} completion${recent.length === 1 ? "" : "s"} stored in this browser</span>
        </div>
        <span class="quiz-local-only">Local history</span>
      </div>
      <div class="dash-scroll-hint">← Swipe / scroll to see recent device attempts →</div>
      <div class="dash-bar-scroll" aria-label="Recent local quiz score chart">
        <div class="dash-bar-chart scrollable">
          ${recent.map((attempt, index) => {
            const value = percent(attempt.percentage);
            const title = attempt.quizTitle || attempt.title || `Attempt ${index + 1}`;
            return `
              <div class="dash-bar-item wide" title="${escapeAttr(title)}">
                <div class="dash-bar-track"><i style="height:${value}%"></i></div>
                <strong>${value}%</strong>
                <span>${index + 1}</span>
              </div>
            `;
          }).join("")}
        </div>
      </div>
    `;
  }

  function renderSubjectChart(rows) {
    const chart = $("#quizSubjectChart");
    if (!chart) return;
    const stats = buildSubjectStats(rows);

    const card = chart.closest(".dash-section-card");
    const head = card && card.querySelector(".dash-section-head");
    if (head) {
      const title = head.querySelector("h2");
      const copy = head.querySelector("p");
      if (title) title.textContent = "Subject Performance";
      if (copy) copy.textContent = "Average latest score from your synced quiz sets, with best score and attempt volume.";
    }

    if (!stats.length) {
      chart.innerHTML = `<div class="user-mini-card"><strong>Subject performance</strong><span>No synced subject data available yet.</span></div>`;
      return;
    }

    chart.innerHTML = `
      <div class="quiz-subject-performance">
        ${stats.map((item) => {
          const value = percent(item.average);
          return `
            <article class="quiz-subject-row">
              <div class="quiz-subject-row-head">
                <div><strong>${escapeHtml(item.name)}</strong><span>${item.quizCount} quiz${item.quizCount === 1 ? "" : "zes"} · ${item.attemptCount} attempt${item.attemptCount === 1 ? "" : "s"}</span></div>
                <div><b>${value}%</b><small>Latest avg</small></div>
              </div>
              <div class="quiz-subject-bars">
                <div><span>Latest</span><i><b style="width:${value}%"></b></i><em>${value}%</em></div>
                <div><span>Best</span><i class="is-best"><b style="width:${percent(item.best)}%"></b></i><em>${percent(item.best)}%</em></div>
              </div>
            </article>
          `;
        }).join("")}
      </div>
    `;
  }

  function renderCompactHistory(rows) {
    const list = $("#quizHistoryList");
    if (!list) return;

    if (!rows.length) {
      list.innerHTML = "";
      return;
    }

    list.innerHTML = `
      <div class="quiz-history-note">
        <i class="fas fa-circle-info" aria-hidden="true"></i>
        <span>Server keeps the <strong>latest completed attempt per quiz</strong>, plus lifetime attempt count and personal best. Full attempt-by-attempt history stays local to the browser.</span>
      </div>
    `;
  }

  function renderHeroStats(rows) {
    const local = readLocalAttempts();
    if (rows.length) {
      const attempts = rows.reduce((sum, row) => sum + Math.max(1, number(row.attemptCount, 1)), 0);
      const best = rows.reduce((highest, row) => Math.max(highest, number(row.bestPercentage, row.percentage)), 0);
      setText("#quizAttemptCount", String(attempts));
      setText("#bestQuizScore", `${percent(best)}%`);

      const attemptsCard = $("#quizAttemptCount")?.closest(".dash-stat");
      const bestCard = $("#bestQuizScore")?.closest(".dash-stat");
      const attemptsSmall = attemptsCard?.querySelector("small");
      const bestSmall = bestCard?.querySelector("small");
      if (attemptsSmall) attemptsSmall.textContent = `${rows.length} synced quiz set${rows.length === 1 ? "" : "s"}`;
      if (bestSmall) bestSmall.textContent = "Personal best from synced quizzes";
      return;
    }

    const localBest = local.reduce((highest, attempt) => Math.max(highest, number(attempt.percentage)), 0);
    setText("#quizAttemptCount", String(local.length));
    setText("#bestQuizScore", local.length ? `${percent(localBest)}%` : "--");
  }

  function renderServerProgress(rows) {
    const normalized = normalizeServerRows(rows);
    const sorted = sortAttempts(normalized);
    serverRows = sorted;
    serverAttemptTotal = sorted.reduce((sum, row) => sum + Math.max(1, number(row.attemptCount, 1)), 0);
    activeAttempts = sorted;

    renderOverview(sorted);
    renderAccountQuizCards(sorted);
    renderSubjectChart(sorted);
    renderCompactHistory(sorted);
    renderDeviceTrend(readLocalAttempts());
    renderHeroStats(sorted);
    renderUnfinished();
  }

  function renderDeviceOnly(message) {
    const local = sortAttempts(readLocalAttempts());
    const overview = $("#quizAccountOverview");
    if (overview) {
      overview.innerHTML = `
        <div class="quiz-account-device-state">
          <i class="fas fa-mobile-screen-button" aria-hidden="true"></i>
          <div><strong>Showing this device only</strong><span>${escapeHtml(message || "Login to load your synced quiz progress from MySQL.")}</span></div>
          <a href="login.html?next=dashboard.html">Login</a>
        </div>
      `;
    }
    renderAccountQuizCards([]);
    renderDeviceTrend(local);
    renderSubjectChart([]);
    renderCompactHistory([]);
    renderHeroStats([]);
    renderUnfinished();
  }

  async function waitForFirebaseConfig(timeoutMs = 6000) {
    const started = Date.now();
    while (Date.now() - started < timeoutMs) {
      if (window.GJU_FIREBASE_CONFIG && window.GJU_FIREBASE_CONFIG.apiKey) return window.GJU_FIREBASE_CONFIG;
      await new Promise((resolve) => window.setTimeout(resolve, 120));
    }
    return null;
  }

  async function getFirebaseModules() {
    if (firebaseImportPromise) return firebaseImportPromise;
    firebaseImportPromise = Promise.all([
      import("https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js"),
      import("https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js")
    ]).then(([appMod, authMod]) => ({ appMod, authMod }));
    return firebaseImportPromise;
  }

  async function getIdToken() {
    const config = await waitForFirebaseConfig();
    if (!config) return "";
    const { appMod, authMod } = await getFirebaseModules();
    const app = appMod.getApps().length ? appMod.getApps()[0] : appMod.initializeApp(config);
    const auth = authMod.getAuth(app);
    let user = auth.currentUser;

    if (!user) {
      user = await new Promise((resolve) => {
        let done = false;
        let unsubscribe = function () {};
        const timer = window.setTimeout(() => {
          if (done) return;
          done = true;
          unsubscribe();
          resolve(auth.currentUser || null);
        }, 4000);

        unsubscribe = authMod.onAuthStateChanged(auth, (nextUser) => {
          if (done) return;
          done = true;
          window.clearTimeout(timer);
          unsubscribe();
          resolve(nextUser || null);
        });
      });
    }

    return user ? user.getIdToken() : "";
  }

  async function loadAccountProgress() {
    try {
      setSyncState("is-loading", "Syncing");
      const token = await getIdToken();

      if (!token) {
        setSyncState("is-device", "Device only");
        renderDeviceOnly("Login to see the same latest quiz progress on every device.");
        return;
      }

      const response = await fetch(PROGRESS_API, {
        method: "GET",
        mode: "cors",
        cache: "no-store",
        headers: {
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });
      const data = await response.json().catch(() => null);

      if (!response.ok || !data || data.success !== true) {
        throw new Error(data?.message || "Unable to load account quiz progress.");
      }

      const rows = Array.isArray(data.progress) ? data.progress : [];
      renderServerProgress(rows);
      setSyncState("is-synced", "Account synced");
    } catch (error) {
      console.warn("[GovJobUpdates] MySQL quiz progress load failed:", error.message);
      setSyncState("is-error", "Sync unavailable");
      renderDeviceOnly("Account sync is temporarily unavailable; local device history is still visible.");
    }
  }

  function updatePerformanceNoteCopy() {
    const cards = Array.from(document.querySelectorAll(".dash-section-card"));
    const card = cards.find((item) => item.querySelector(".dash-timeline") && /Performance Note/i.test(item.textContent || ""));
    if (!card) return;

    const head = card.querySelector(".dash-section-head");
    if (head) {
      const title = head.querySelector("h2");
      const copy = head.querySelector("p");
      if (title) title.textContent = "How Quiz Progress Works";
      if (copy) copy.textContent = "A lightweight model keeps your useful progress without storing unlimited attempt history.";
    }

    const items = card.querySelectorAll(".dash-timeline-item");
    if (items[0]) {
      const strong = items[0].querySelector("strong");
      const span = items[0].querySelector("span");
      if (strong) strong.textContent = "Account sync";
      if (span) span.textContent = "Latest result, best score and attempt count are synced to your account.";
    }
    if (items[1]) {
      const strong = items[1].querySelector("strong");
      const span = items[1].querySelector("span");
      if (strong) strong.textContent = "Device history";
      if (span) span.textContent = "Detailed recent attempt trend and unfinished resume state stay on this browser/device.";
    }
  }

  function render() {
    ensureProgressStyles();
    ensureQuizProgressShell();
    updatePerformanceNoteCopy();
    renderUnfinished();

    const local = readLocalAttempts();
    if (local.length) {
      renderDeviceTrend(local);
      renderHeroStats([]);
    }

    loadAccountProgress();
  }

  document.addEventListener("DOMContentLoaded", render, { once: true });

  window.addEventListener("resize", () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      if (serverRows.length) {
        renderAccountQuizCards(serverRows);
        renderSubjectChart(serverRows);
      }
    }, 160);
  });

  window.addEventListener("storage", (event) => {
    if (event.key === STORAGE_KEY || event.key === UNFINISHED_KEY) {
      renderUnfinished();
      renderDeviceTrend(readLocalAttempts());
    }
  });

  window.addEventListener("gju:quiz-progress-synced", () => loadAccountProgress());
}());


/* Phase 2G.1 — Professional Candidate Dashboard composition.
   DOM-only presentation layer. Existing IDs, auth, rank and quiz data contracts remain intact. */
(function () {
  "use strict";

  const STYLE_ID = "gjuProfessionalDashboardCss";
  const STYLE_HREF = "../CSS/dashboard-professional.css?v=20260829-phase2g1";

  function loadProfessionalCss() {
    if (document.getElementById(STYLE_ID)) return;
    const link = document.createElement("link");
    link.id = STYLE_ID;
    link.rel = "stylesheet";
    link.href = STYLE_HREF;
    document.head.appendChild(link);
  }

  function textOf(node) {
    return String(node && node.textContent || "").trim();
  }

  function findCardByHeading(pattern) {
    return Array.from(document.querySelectorAll(".dash-section-card")).find((card) => {
      const heading = card.querySelector(".dash-section-head h2");
      return heading && pattern.test(textOf(heading));
    }) || null;
  }

  function ensureSectionMarker(section, eyebrow, title, copy, className) {
    if (!section || section.querySelector(":scope > .dashboard-zone-head")) return;
    section.classList.add(className);
    const head = document.createElement("div");
    head.className = "dashboard-zone-head";
    head.innerHTML = `
      <div>
        <span>${eyebrow}</span>
        <h2>${title}</h2>
        <p>${copy}</p>
      </div>
    `;
    section.prepend(head);
  }

  function buildHeroActions(hero) {
    if (!hero || hero.querySelector(".dashboard-pro-actions")) return;
    const main = hero.querySelector(".dashboard-hero-main");
    const logout = hero.querySelector("#logoutBtn");
    if (!main || !logout) return;

    const actions = document.createElement("div");
    actions.className = "dashboard-pro-actions";
    actions.innerHTML = `
      <a class="dashboard-primary-action" href="quiz.html">
        <i class="fas fa-play-circle" aria-hidden="true"></i>
        <span><small>Continue preparation</small><strong>Practice Quiz</strong></span>
        <i class="fas fa-arrow-right" aria-hidden="true"></i>
      </a>
    `;
    actions.appendChild(logout);
    main.appendChild(actions);
  }

  function upgradeHero() {
    const hero = document.querySelector(".dashboard-hero");
    if (!hero) return;
    hero.classList.add("dashboard-pro-hero");

    const kicker = hero.querySelector(".auth-kicker");
    if (kicker) kicker.textContent = "Candidate Command Center";

    const statusRow = hero.querySelector(".dash-status-row");
    if (statusRow) {
      const chips = statusRow.querySelectorAll(".dash-chip");
      if (chips[0]) chips[0].innerHTML = '<i class="fas fa-circle-check"></i> Account Ready';
      if (chips[1]) chips[1].innerHTML = '<i class="fas fa-cloud"></i> Quiz Sync';
      if (chips[2]) chips[2].innerHTML = '<i class="fas fa-chart-line"></i> Rank Tracking';
    }

    const name = hero.querySelector("#userName");
    if (name) name.dataset.dashboardGreeting = "1";

    buildHeroActions(hero);
  }

  function upgradeQuickActions() {
    const tools = findCardByHeading(/^Dashboard Tools$/i);
    if (tools) {
      tools.classList.add("dashboard-quick-actions-card");
      const h2 = tools.querySelector(".dash-section-head h2");
      const p = tools.querySelector(".dash-section-head p");
      if (h2) h2.textContent = "Quick Actions";
      if (p) p.textContent = "Jump straight into the two tools that drive your preparation dashboard.";

      const links = tools.querySelectorAll(".dash-tool");
      if (links[0]) links[0].classList.add("is-primary-tool");
    }

    const profile = findCardByHeading(/^Profile Summary$/i);
    if (profile) {
      profile.classList.add("dashboard-profile-card");
      const h2 = profile.querySelector(".dash-section-head h2");
      const p = profile.querySelector(".dash-section-head p");
      if (h2) h2.textContent = "Account";
      if (p) p.textContent = "Your identity used for synced quiz and rank records.";
    }

    const section = tools && tools.closest(".dashboard-section-grid");
    if (section) section.classList.add("dashboard-command-grid");
  }

  function upgradePracticeZone() {
    const quizCard = document.querySelector("#quizScoreChart")?.closest(".dash-section-card");
    const subjectCard = document.querySelector("#quizSubjectChart")?.closest(".dash-section-card");
    if (!quizCard || !subjectCard) return;

    const section = quizCard.closest(".dashboard-section-grid");
    ensureSectionMarker(
      section,
      "PRACTICE PERFORMANCE",
      "Your quiz progress",
      "Latest synced results, personal bests and subject-level performance in one place.",
      "dashboard-practice-zone"
    );

    quizCard.classList.add("dashboard-feature-card");
    subjectCard.classList.add("dashboard-secondary-card");
  }

  function tagRankSections() {
    const selectors = [
      "#latestRankSnapshot",
      "#rankHealthBox",
      "#rankPercentileChart",
      "#rankTrendChart",
      "#rankExamChart",
      "#rankAnalysisBox",
      "#rankExamRecords",
      "#rankHistoryList"
    ];

    const sections = [];
    selectors.forEach((selector) => {
      const node = document.querySelector(selector);
      const section = node && node.closest(".dashboard-section-grid");
      if (section && !sections.includes(section)) sections.push(section);
    });

    sections.forEach((section, index) => {
      section.classList.add("dashboard-rank-zone");
      if (index === 0) {
        ensureSectionMarker(
          section,
          "RANK PREDICTOR",
          "Your rank intelligence",
          "Review your latest estimate, percentile trend and exam-wise rank records without visual clutter.",
          "dashboard-rank-zone-first"
        );
      }
    });

    const performance = findCardByHeading(/^Performance Note$/i);
    if (performance) {
      performance.hidden = true;
      performance.classList.add("dashboard-retired-card");
    }

    const rankHistoryCard = document.querySelector("#rankHistoryList")?.closest(".dash-section-card");
    if (rankHistoryCard) rankHistoryCard.classList.add("dashboard-rank-history-card");
  }

  function addOverviewRail() {
    const hero = document.querySelector(".dashboard-hero");
    if (!hero || document.querySelector(".dashboard-section-rail")) return;

    const rail = document.createElement("nav");
    rail.className = "dashboard-section-rail";
    rail.setAttribute("aria-label", "Dashboard sections");
    rail.innerHTML = `
      <a href="#dashboardPracticeZone"><i class="fas fa-bolt" aria-hidden="true"></i><span>Practice</span></a>
      <a href="#dashboardRankZone"><i class="fas fa-chart-line" aria-hidden="true"></i><span>Rank Predictor</span></a>
      <a href="quiz.html"><i class="fas fa-play" aria-hidden="true"></i><span>Start Quiz</span></a>
      <a href="rank-predictor.html"><i class="fas fa-ranking-star" aria-hidden="true"></i><span>Check Rank</span></a>
    `;
    hero.after(rail);
  }

  function assignAnchors() {
    const practice = document.querySelector(".dashboard-practice-zone");
    if (practice) practice.id = "dashboardPracticeZone";
    const rank = document.querySelector(".dashboard-rank-zone-first");
    if (rank) rank.id = "dashboardRankZone";
  }

  function syncGreeting() {
    const name = document.querySelector("#userName[data-dashboard-greeting]");
    if (!name || name.dataset.greetingApplied === "1") return;
    const current = textOf(name);
    if (!current || /loading/i.test(current)) return;

    const hour = new Date().getHours();
    const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
    name.textContent = `${greeting}, ${current}`;
    name.dataset.greetingApplied = "1";
  }

  function applyProfessionalLayout() {
    if (!document.body.matches('[data-auth-page="dashboard"]')) return;
    loadProfessionalCss();
    document.body.classList.add("dashboard-professional");
    upgradeHero();
    upgradeQuickActions();
    upgradePracticeZone();
    tagRankSections();
    assignAnchors();
    addOverviewRail();
    syncGreeting();
  }

  function observeDynamicDashboard() {
    const root = document.querySelector("#dashboardContent") || document.body;
    let scheduled = false;
    const observer = new MutationObserver(() => {
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(() => {
        scheduled = false;
        applyProfessionalLayout();
      });
    });
    observer.observe(root, { childList: true, subtree: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      applyProfessionalLayout();
      observeDynamicDashboard();
      window.setTimeout(applyProfessionalLayout, 1200);
    }, { once: true });
  } else {
    applyProfessionalLayout();
    observeDynamicDashboard();
    window.setTimeout(applyProfessionalLayout, 1200);
  }
}());


/* Phase 2G.2 — Final information-architecture cleanup from live dashboard audit. */
(function () {
  "use strict";

  function text(node) {
    return String(node && node.textContent || "").trim();
  }

  function cardByHeading(pattern) {
    return Array.from(document.querySelectorAll(".dash-section-card")).find((card) => {
      const h = card.querySelector(".dash-section-head h2");
      return h && pattern.test(text(h));
    }) || null;
  }

  function removeUpperUtilityRow() {
    const tools = cardByHeading(/^(Dashboard Tools|Quick Actions)$/i);
    const account = cardByHeading(/^(Profile Summary|Account)$/i);
    const section = (tools || account)?.closest(".dashboard-section-grid");
    if (section && !section.classList.contains("dashboard-practice-zone") && !section.classList.contains("dashboard-rank-zone")) {
      section.hidden = true;
      section.classList.add("dashboard-utility-row-retired");
    }
  }

  function renameHeroMetrics() {
    const attempt = document.querySelector("#quizAttemptCount")?.closest(".dash-stat");
    const best = document.querySelector("#bestQuizScore")?.closest(".dash-stat");
    if (attempt) {
      const label = attempt.querySelector("span");
      if (label) label.textContent = "Total Quiz Attempts";
    }
    if (best) {
      const label = best.querySelector("span");
      if (label) label.textContent = "Best Quiz Score";
      best.classList.add("dash-stat-secondary");
    }
  }

  function compactLocalHistory() {
    const chart = document.querySelector("#quizScoreChart");
    if (!chart || chart.closest("details.quiz-device-history-details")) return;
    const parent = chart.parentNode;
    if (!parent) return;

    const details = document.createElement("details");
    details.className = "quiz-device-history-details";
    details.innerHTML = `
      <summary>
        <span><i class="fas fa-mobile-screen-button" aria-hidden="true"></i><b>Device History</b></span>
        <small>Local browser attempts</small>
        <i class="fas fa-chevron-down quiz-device-chevron" aria-hidden="true"></i>
      </summary>
    `;
    parent.insertBefore(details, chart);
    details.appendChild(chart);
  }

  function makeSubjectPerformanceFullWidth() {
    const subject = document.querySelector("#quizSubjectChart")?.closest(".dash-section-card");
    if (subject) subject.classList.add("dashboard-subject-full");
  }

  function emphasizeLatestQuiz() {
    const list = document.querySelector("#quizAccountProgressList");
    if (!list) return;
    list.classList.add("dashboard-latest-quiz-focus");
  }

  function simplifyPracticeOverview() {
    const overview = document.querySelector("#quizAccountOverview");
    if (!overview) return;
    overview.classList.add("dashboard-practice-overview-compact");
  }

  function cleanRankZone() {
    const percentile = document.querySelector("#rankPercentileChart")?.closest(".dash-section-card");
    const trend = document.querySelector("#rankTrendChart")?.closest(".dash-section-card");
    const exam = document.querySelector("#rankExamChart")?.closest(".dash-section-card");
    const insights = document.querySelector("#rankAnalysisBox")?.closest(".dash-section-card");

    [percentile, trend, exam, insights].forEach((card) => {
      if (card) card.classList.add("dashboard-rank-compact-card");
    });

    const history = document.querySelector("#rankHistoryList")?.closest(".dash-section-card");
    if (history) {
      const head = history.querySelector(".dash-section-head");
      if (head) {
        const h2 = head.querySelector("h2");
        const p = head.querySelector("p");
        if (h2) h2.textContent = "Recent Rank Predictions";
        if (p) p.textContent = "Your latest submitted predictions and estimated rank outcomes.";
      }
    }
  }

  function applyFinalCleanup() {
    if (!document.body.matches('[data-auth-page="dashboard"]')) return;
    document.body.classList.add("dashboard-final-cleanup");
    removeUpperUtilityRow();
    renameHeroMetrics();
    compactLocalHistory();
    makeSubjectPerformanceFullWidth();
    emphasizeLatestQuiz();
    simplifyPracticeOverview();
    cleanRankZone();
  }

  function start() {
    applyFinalCleanup();
    let queued = false;
    const root = document.querySelector("#dashboardContent") || document.body;
    new MutationObserver(() => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        applyFinalCleanup();
      });
    }).observe(root, {childList:true, subtree:true});
    window.setTimeout(applyFinalCleanup, 1400);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, {once:true});
  } else {
    start();
  }
}());

(function(){
  "use strict";
  function load(){
    if(document.getElementById("gjuDashboardFinalCleanupCss")) return;
    const l=document.createElement("link");
    l.id="gjuDashboardFinalCleanupCss";
    l.rel="stylesheet";
    l.href="../CSS/dashboard-final-cleanup.css?v=20260829-phase2g2";
    document.head.appendChild(l);
  }
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",load,{once:true}); else load();
}());
