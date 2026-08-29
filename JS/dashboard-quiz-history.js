(function () {
  "use strict";

  const STORAGE_KEY = "GovJobUpdatesQuiz.attempts";
  const PROGRESS_API = "https://test.govjobupdates.com/live-test/practice-quiz-api/progress.php";
  const $ = (selector) => document.querySelector(selector);
  const setText = (selector, value) => {
    const node = $(selector);
    if (node) node.textContent = value;
  };

  let activeAttempts = [];
  let serverRows = [];
  let serverAttemptTotal = 0;
  let firebaseImportPromise = null;

  function readLocalAttempts() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  function number(value, fallback = 0) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
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

  function formatDate(value) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "Recent";
    return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
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
      bestPercentage: number(row.bestPercentage, row.percentage),
      source: "account"
    }));
  }

  function mergeAttempts(serverAttempts, localAttempts) {
    const map = new Map();
    [...serverAttempts, ...localAttempts].forEach((attempt) => {
      const key = attempt.id || [attempt.quizId, attempt.completedAt || attempt.timestamp, attempt.score].join("-");
      if (!map.has(key)) map.set(key, attempt);
    });
    return sortAttempts(Array.from(map.values()));
  }

  function buildSubjectStats(attempts) {
    const buckets = {};
    attempts.forEach((attempt) => {
      const subject = attempt.subject || attempt.quizSubject || attempt.category || "Quiz";
      if (!buckets[subject]) buckets[subject] = { name: subject, count: 0, total: 0, best: 0 };
      const score = number(attempt.percentage);
      buckets[subject].count += 1;
      buckets[subject].total += score;
      buckets[subject].best = Math.max(buckets[subject].best, score);
    });
    return Object.values(buckets)
      .map((item) => ({ ...item, average: item.count ? item.total / item.count : 0 }))
      .sort((a, b) => b.average - a.average)
      .slice(0, compactLimit(5, 4));
  }

  function renderEmpty(message) {
    setText("#quizAttemptCount", "0");
    setText("#bestQuizScore", "--");
    const chart = $("#quizScoreChart");
    if (chart) chart.innerHTML = `<div class="user-mini-card"><strong>No quiz attempts yet</strong><span>${escapeHtml(message || "Complete a quiz set and your score graph will appear here.")}</span></div>`;
    const subjects = $("#quizSubjectChart");
    if (subjects) subjects.innerHTML = `<div class="user-mini-card"><strong>Subject performance</strong><span>No subject data available yet.</span></div>`;
    const list = $("#quizHistoryList");
    if (list) list.innerHTML = `<div class="user-mini-card"><strong>Start your first quiz</strong><span>Your latest quiz progress will be shown here.</span></div>`;
  }

  function renderScoreChart(attempts, sourceLabel) {
    const chart = $("#quizScoreChart");
    if (!chart) return;
    const local = sortAttempts(readLocalAttempts());
    const source = local.length ? local : attempts;
    const recent = source.slice(0, 10).reverse();
    chart.innerHTML = `
      <div class="dash-chart-summary">
        <strong>${local.length ? `Last ${recent.length} attempts on this device` : `Latest result from ${recent.length} quiz set${recent.length === 1 ? "" : "s"}`}</strong>
        <span>${escapeHtml(sourceLabel || "Account progress synced")}</span>
      </div>
      <div class="dash-scroll-hint">← Swipe / scroll to see scores →</div>
      <div class="dash-bar-scroll" aria-label="Quiz score chart">
        <div class="dash-bar-chart scrollable">
          ${recent.map((attempt, index) => {
            const value = percent(attempt.percentage);
            const title = attempt.quizTitle || attempt.title || `Attempt ${index + 1}`;
            return `
              <div class="dash-bar-item wide">
                <div class="dash-bar-track"><i style="height:${value}%"></i></div>
                <strong>${value}%</strong>
                <span title="${escapeHtml(title)}">Q${index + 1}</span>
              </div>
            `;
          }).join("")}
        </div>
      </div>
    `;
  }

  function renderSubjectChart(attempts) {
    const chart = $("#quizSubjectChart");
    if (!chart) return;
    const stats = buildSubjectStats(attempts);
    if (!stats.length) {
      chart.innerHTML = `<div class="user-mini-card"><strong>Subject performance</strong><span>No subject data available yet.</span></div>`;
      return;
    }
    chart.innerHTML = `
      <div class="dash-horizontal-bars compact">
        ${stats.map((item) => {
          const value = percent(item.average);
          return `
            <div class="dash-hbar-row">
              <label><span>${escapeHtml(item.name)}</span><strong>${value}%</strong></label>
              <div class="dash-hbar-track"><i style="width:${value}%"></i></div>
            </div>
          `;
        }).join("")}
      </div>
    `;
  }

  function renderHistory(attempts) {
    const list = $("#quizHistoryList");
    if (!list) return;
    const limit = compactLimit(5, 4);
    const visible = attempts.slice(0, limit);
    list.innerHTML = `
      <div class="dash-compact-list">
        ${visible.map((attempt) => {
          const title = attempt.quizTitle || attempt.title || "Quiz Attempt";
          const score = number(attempt.score);
          const maxScore = number(attempt.maxScore);
          const accuracy = percent(attempt.accuracy ?? attempt.percentage);
          const attemptsText = attempt.attemptCount && attempt.attemptCount > 1 ? ` · ${attempt.attemptCount} total attempts` : "";
          return `
            <article class="rank-history-item compact">
              <div>
                <strong>${escapeHtml(title)}</strong>
                <span>Score: ${score}/${maxScore || "--"} | Accuracy: ${accuracy}%${escapeHtml(attemptsText)}</span>
              </div>
              <small>${formatDate(attempt.completedAt || attempt.timestamp)}</small>
            </article>
          `;
        }).join("")}
      </div>
    `;
  }

  function renderAttempts(attempts, sourceLabel) {
    activeAttempts = sortAttempts(attempts);
    if (!activeAttempts.length) {
      renderEmpty();
      return;
    }

    const localCount = readLocalAttempts().length;
    const displayedTotal = Math.max(localCount, serverAttemptTotal, activeAttempts.length);
    const localBest = activeAttempts.reduce((highest, attempt) => Math.max(highest, number(attempt.percentage)), 0);
    const serverBest = serverRows.reduce((highest, row) => Math.max(highest, number(row.bestPercentage)), 0);

    setText("#quizAttemptCount", String(displayedTotal));
    setText("#bestQuizScore", `${Math.round(Math.max(localBest, serverBest))}%`);
    renderScoreChart(activeAttempts, sourceLabel);
    renderSubjectChart(activeAttempts);
    renderHistory(activeAttempts);
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
      const token = await getIdToken();
      if (!token) {
        renderAttempts(readLocalAttempts(), "This device only — login to sync quiz progress");
        return;
      }

      const response = await fetch(PROGRESS_API, {
        method: "GET",
        mode: "cors",
        cache: "no-store",
        headers: { "Accept": "application/json", "Authorization": `Bearer ${token}` }
      });
      const data = await response.json().catch(() => null);
      if (!response.ok || !data || data.success !== true) throw new Error(data?.message || "Unable to load account quiz progress.");

      serverRows = Array.isArray(data.progress) ? data.progress : [];
      serverAttemptTotal = serverRows.reduce((sum, row) => sum + Math.max(1, number(row.attemptCount, 1)), 0);
      const serverAttempts = normalizeServerRows(serverRows);
      const merged = mergeAttempts(serverAttempts, readLocalAttempts());
      renderAttempts(merged, serverRows.length ? "MySQL account sync complete" : "No account quiz progress saved yet");
    } catch (error) {
      console.warn("[GovJobUpdates] MySQL quiz history load failed:", error.message);
      renderAttempts(readLocalAttempts(), "Account sync unavailable; showing this device");
    }
  }

  function render() {
    const local = sortAttempts(readLocalAttempts());
    if (local.length) renderAttempts(local, "This device; checking account sync...");
    else renderEmpty("Checking your account quiz progress...");
    loadAccountProgress();
  }

  document.addEventListener("DOMContentLoaded", render);
  window.addEventListener("resize", () => window.requestAnimationFrame(() => {
    if (activeAttempts.length) renderAttempts(activeAttempts, serverRows.length ? "MySQL account sync complete" : "This device");
  }));
  window.addEventListener("storage", (event) => {
    if (event.key === STORAGE_KEY) render();
  });
  window.addEventListener("gju:quiz-progress-synced", render);
}());
