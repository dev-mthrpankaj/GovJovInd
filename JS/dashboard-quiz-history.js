(function () {
  "use strict";

  const STORAGE_KEY = "GovJobUpdatesQuiz.attempts";
  const $ = (selector) => document.querySelector(selector);
  const setText = (selector, value) => {
    const node = $(selector);
    if (node) node.textContent = value;
  };

  function readAttempts() {
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
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "\"": "&quot;",
      "'": "&#039;"
    }[character]));
  }

  function formatDate(value) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "Recent";
    return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
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

  function renderEmpty() {
    setText("#quizAttemptCount", "0");
    setText("#bestQuizScore", "--");
    const chart = $("#quizScoreChart");
    if (chart) chart.innerHTML = `<div class="user-mini-card"><strong>No quiz attempts yet</strong><span>Complete a quiz set and your score graph will appear here.</span></div>`;
    const subjects = $("#quizSubjectChart");
    if (subjects) subjects.innerHTML = `<div class="user-mini-card"><strong>Subject performance</strong><span>No subject data available yet.</span></div>`;
    const list = $("#quizHistoryList");
    if (list) list.innerHTML = `<div class="user-mini-card"><strong>Start your first quiz</strong><span>Your recent quiz attempts will be shown in this dashboard.</span></div>`;
  }

  function renderScoreChart(attempts) {
    const chart = $("#quizScoreChart");
    if (!chart) return;
    const limit = compactLimit(6, 4);
    const recent = attempts.slice(0, limit).reverse();
    const hiddenCount = Math.max(0, attempts.length - recent.length);
    chart.innerHTML = `
      <div class="dash-chart-summary">
        <strong>Latest ${recent.length} attempts</strong>
        <span>${hiddenCount ? `${hiddenCount} older attempts kept in history` : "All attempts shown"}</span>
      </div>
      <div class="dash-bar-chart compact" aria-label="Recent quiz score chart">
        ${recent.map((attempt, index) => {
          const value = percent(attempt.percentage);
          const title = attempt.quizTitle || attempt.title || `Attempt ${index + 1}`;
          return `
            <div class="dash-bar-item">
              <div class="dash-bar-track"><i style="height:${value}%"></i></div>
              <strong>${value}%</strong>
              <span title="${escapeHtml(title)}">${index + 1}</span>
            </div>
          `;
        }).join("")}
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
    const limit = compactLimit(4, 3);
    const visible = attempts.slice(0, limit);
    const hiddenCount = Math.max(0, attempts.length - visible.length);
    list.innerHTML = `
      <div class="dash-compact-list">
        ${visible.map((attempt) => {
          const title = attempt.quizTitle || attempt.title || "Quiz Attempt";
          const score = number(attempt.score);
          const maxScore = number(attempt.maxScore);
          const percentage = percent(attempt.percentage);
          return `
            <article class="rank-history-item compact">
              <div>
                <strong>${escapeHtml(title)}</strong>
                <span>Score: ${score}/${maxScore || "--"} | Accuracy: ${percentage}%</span>
              </div>
              <small>${formatDate(attempt.completedAt || attempt.timestamp)}</small>
            </article>
          `;
        }).join("")}
        ${hiddenCount ? `<div class="user-mini-card"><strong>${hiddenCount}+ older attempts</strong><span>Showing latest attempts only to keep dashboard clean.</span></div>` : ""}
      </div>
    `;
  }

  function render() {
    const attempts = readAttempts().sort((a, b) => new Date(b.completedAt || b.timestamp || 0) - new Date(a.completedAt || a.timestamp || 0));
    if (!attempts.length) {
      renderEmpty();
      return;
    }
    const best = attempts.reduce((highest, attempt) => Math.max(highest, number(attempt.percentage)), 0);
    setText("#quizAttemptCount", String(attempts.length));
    setText("#bestQuizScore", `${Math.round(best)}%`);
    renderScoreChart(attempts);
    renderSubjectChart(attempts);
    renderHistory(attempts);
  }

  document.addEventListener("DOMContentLoaded", render);
  window.addEventListener("resize", () => window.requestAnimationFrame(render));
  window.addEventListener("storage", (event) => {
    if (event.key === STORAGE_KEY) render();
  });
}());
