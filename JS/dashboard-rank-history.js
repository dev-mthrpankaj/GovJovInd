import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { getDatabase, ref, get, update, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";

(function () {
  "use strict";

  const config = window.GJU_FIREBASE_CONFIG;
  const rankConfig = window.RANK_PREDICTOR_CONFIG || {};
  const apiUrl = String(rankConfig.apiUrl || "").trim();
  if (!config || !config.apiKey || !apiUrl) return;

  const app = getApps().length ? getApps()[0] : initializeApp(config);
  const auth = getAuth(app);
  const db = getDatabase(app);
  let currentUser = null;
  let currentProfile = null;

  const $ = (selector) => document.querySelector(selector);
  const setText = (selector, value) => {
    const node = $(selector);
    if (node) node.textContent = value;
  };

  function cleanMobile(value) {
    return String(value || "").replace(/[^0-9]/g, "").slice(-10);
  }

  function number(value, fallback = 0) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  }

  function percent(value) {
    return Math.max(0, Math.min(100, Math.round(number(value))));
  }

  function formatValue(value, fallback = "--") {
    if (value === undefined || value === null || value === "") return fallback;
    return String(value);
  }

  function formatRank(value) {
    const parsed = Number(value);
    return Number.isFinite(parsed) && parsed > 0 ? String(parsed) : "--";
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
    if (Number.isNaN(date.getTime())) return formatValue(value, "Recent");
    return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
  }

  async function getProfile(user) {
    let profile = { name: user.displayName || "", email: user.email || "", mobile: "" };
    try {
      const snap = await get(ref(db, `users/${user.uid}`));
      if (snap.exists()) {
        const saved = snap.val() || {};
        profile = {
          ...profile,
          name: saved.name || profile.name,
          email: saved.email || profile.email,
          mobile: cleanMobile(saved.mobile)
        };
      }
    } catch (error) {
      console.warn("[GovJobUpdates] Could not read profile mobile:", error.message);
    }
    return profile;
  }

  async function fetchRankHistory(user, profile) {
    const payload = {
      action: "getFirebaseRankDashboard",
      firebaseUid: user.uid,
      userId: user.uid,
      name: profile.name,
      email: profile.email,
      mobile: profile.mobile
    };

    const response = await fetch(apiUrl, {
      method: "POST",
      redirect: "follow",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload)
    });
    const text = await response.text();
    return JSON.parse(text);
  }

  function renderMobileForm(message) {
    const box = $("#mobileUpdateBox");
    if (!box) return;
    box.innerHTML = `
      <form id="mobileUpdateForm" class="mobile-update-form">
        <label for="dashboardMobileInput">Add mobile number to match Rank Predictor records</label>
        <div class="mobile-update-row">
          <input id="dashboardMobileInput" type="tel" inputmode="numeric" maxlength="10" pattern="[0-9]{10}" placeholder="10 digit mobile number" value="${currentProfile?.mobile || ""}" required>
          <button class="auth-btn auth-btn-primary" type="submit">Save Mobile</button>
        </div>
        <small>${message || "Use the same mobile number that you entered in Rank Predictor."}</small>
      </form>
    `;
    $("#mobileUpdateForm")?.addEventListener("submit", saveMobileFromForm);
  }

  async function saveMobileFromForm(event) {
    event.preventDefault();
    if (!currentUser) return;
    const mobile = cleanMobile($("#dashboardMobileInput")?.value);
    if (mobile.length !== 10) {
      setText("#rankHistoryStatus", "Please enter a valid 10 digit mobile number.");
      return;
    }
    const button = event.currentTarget.querySelector("button");
    if (button) button.disabled = true;
    try {
      await update(ref(db, `users/${currentUser.uid}`), {
        mobile,
        email: currentUser.email || currentProfile?.email || "",
        name: currentUser.displayName || currentProfile?.name || "",
        updatedAt: serverTimestamp()
      });
      setText("#profileMobile", mobile);
      currentProfile = { ...(currentProfile || {}), mobile };
      const box = $("#mobileUpdateBox");
      if (box) box.innerHTML = `<div class="user-mini-card"><strong>Mobile saved</strong><span>${mobile} is now used for Rank Predictor matching.</span></div>`;
      await load(currentUser);
    } catch (error) {
      console.warn("[GovJobUpdates] Mobile save failed:", error.message);
      setText("#rankHistoryStatus", "Mobile save failed. Check Firebase users rules.");
    } finally {
      if (button) button.disabled = false;
    }
  }

  function renderEmpty(message) {
    setText("#rankPredictionCount", "0");
    setText("#bestEstimatedRank", "--");
    setText("#rankHistoryStatus", message || "No rank predictor record found for your login mobile/email.");
    const list = $("#rankHistoryList");
    if (list) list.innerHTML = `<div class="user-mini-card"><strong>No rank history yet</strong><span>${message || "Use Rank Predictor with the same mobile number used in signup."}</span></div>`;
    renderRankGraphs([]);
  }

  function buildExamStats(attempts) {
    const buckets = {};
    attempts.forEach((attempt) => {
      const exam = attempt.examName || "Exam";
      if (!buckets[exam]) buckets[exam] = { name: exam, count: 0, totalPercentile: 0, bestRank: Infinity, bestMarks: 0 };
      buckets[exam].count += 1;
      buckets[exam].totalPercentile += number(attempt.percentile);
      const rank = number(attempt.overallRank, Infinity);
      if (rank > 0) buckets[exam].bestRank = Math.min(buckets[exam].bestRank, rank);
      buckets[exam].bestMarks = Math.max(buckets[exam].bestMarks, number(attempt.rawMarks));
    });
    return Object.values(buckets).map((item) => ({
      ...item,
      averagePercentile: item.count ? item.totalPercentile / item.count : 0,
      bestRank: Number.isFinite(item.bestRank) ? item.bestRank : 0
    })).sort((a, b) => b.averagePercentile - a.averagePercentile).slice(0, 6);
  }

  function renderRankGraphs(attempts) {
    const percentileChart = $("#rankPercentileChart");
    const rankChart = $("#rankTrendChart");
    const examChart = $("#rankExamChart");
    const insightBox = $("#rankAnalysisBox");

    if (!attempts.length) {
      const empty = `<div class="user-mini-card"><strong>No rank predictor graph yet</strong><span>Save mobile number and use Rank Predictor to show analysis here.</span></div>`;
      if (percentileChart) percentileChart.innerHTML = empty;
      if (rankChart) rankChart.innerHTML = empty;
      if (examChart) examChart.innerHTML = empty;
      if (insightBox) insightBox.innerHTML = empty;
      return;
    }

    const recent = attempts.slice(0, 8).reverse();
    if (percentileChart) {
      percentileChart.innerHTML = `
        <div class="dash-bar-chart" aria-label="Rank predictor percentile chart">
          ${recent.map((attempt, index) => {
            const value = percent(attempt.percentile);
            return `
              <div class="dash-bar-item">
                <div class="dash-bar-track"><i style="height:${value}%"></i></div>
                <strong>${value}%</strong>
                <span title="${escapeHtml(attempt.examName || "Exam")}">${index + 1}</span>
              </div>
            `;
          }).join("")}
        </div>
      `;
    }

    if (rankChart) {
      const ranks = recent.map((attempt) => number(attempt.overallRank)).filter((rank) => rank > 0);
      const worstRank = Math.max(...ranks, 1);
      rankChart.innerHTML = `
        <div class="dash-horizontal-bars">
          ${recent.map((attempt) => {
            const rank = number(attempt.overallRank);
            const better = rank > 0 ? Math.max(8, 100 - ((rank - 1) / Math.max(worstRank, 1)) * 92) : 0;
            return `
              <div class="dash-hbar-row">
                <label><span>${escapeHtml(attempt.examName || "Exam")}</span><strong>Rank ${formatRank(rank)}</strong></label>
                <div class="dash-hbar-track"><i style="width:${better}%"></i></div>
              </div>
            `;
          }).join("")}
        </div>
      `;
    }

    if (examChart) {
      const stats = buildExamStats(attempts);
      examChart.innerHTML = `
        <div class="dash-horizontal-bars">
          ${stats.map((item) => {
            const value = percent(item.averagePercentile);
            return `
              <div class="dash-hbar-row">
                <label><span>${escapeHtml(item.name)}</span><strong>${value}% avg</strong></label>
                <div class="dash-hbar-track"><i style="width:${value}%"></i></div>
              </div>
            `;
          }).join("")}
        </div>
      `;
    }

    if (insightBox) {
      const bestRankAttempt = attempts.filter((attempt) => number(attempt.overallRank) > 0).sort((a, b) => number(a.overallRank) - number(b.overallRank))[0];
      const bestPercentileAttempt = attempts.slice().sort((a, b) => number(b.percentile) - number(a.percentile))[0];
      const avgPercentile = attempts.reduce((sum, attempt) => sum + number(attempt.percentile), 0) / attempts.length;
      insightBox.innerHTML = `
        <div class="dash-insight-grid">
          <div class="user-mini-card"><strong>${Math.round(avgPercentile)}%</strong><span>Average percentile</span></div>
          <div class="user-mini-card"><strong>${formatRank(bestRankAttempt?.overallRank)}</strong><span>Best rank${bestRankAttempt?.examName ? ` in ${escapeHtml(bestRankAttempt.examName)}` : ""}</span></div>
          <div class="user-mini-card"><strong>${formatValue(bestPercentileAttempt?.rawMarks)}</strong><span>Best marks${bestPercentileAttempt?.examName ? ` in ${escapeHtml(bestPercentileAttempt.examName)}` : ""}</span></div>
        </div>
      `;
    }
  }

  function renderDashboard(data) {
    if (!data || data.success === false) {
      renderEmpty(data?.message || "Rank history could not be loaded.");
      return;
    }
    const attempts = Array.isArray(data.rankAttempts || data.attempts) ? (data.rankAttempts || data.attempts) : [];
    const summary = data.summary || {};
    setText("#rankPredictionCount", String(summary.totalRankPredictorAttempts ?? attempts.length ?? 0));
    setText("#bestEstimatedRank", formatRank(summary.bestRank));
    setText("#bestRankExam", summary.bestRankExam ? `Best in ${summary.bestRankExam}` : "Will show after prediction");
    setText("#rankHistoryStatus", attempts.length ? "Latest rank predictor records loaded from Google Sheet." : "No rank predictor records found yet.");

    renderRankGraphs(attempts);

    const list = $("#rankHistoryList");
    if (!list) return;
    if (!attempts.length) {
      renderEmpty("Use Rank Predictor with the same mobile number used in signup.");
      return;
    }

    list.innerHTML = attempts.slice(0, 5).map((attempt) => `
      <article class="rank-history-item">
        <div>
          <strong>${formatValue(attempt.examName, "Exam")}</strong>
          <span>Marks: ${formatValue(attempt.rawMarks)} | Percentile: ${formatValue(attempt.percentile)} | Rank: ${formatRank(attempt.overallRank)}</span>
        </div>
        <small>${formatDate(attempt.examDate || attempt.completedAt || attempt.timestamp)}</small>
      </article>
    `).join("");
  }

  async function load(user) {
    setText("#rankHistoryStatus", "Loading rank predictor history from Google Sheet...");
    currentUser = user;
    const profile = await getProfile(user);
    currentProfile = profile;
    setText("#profileMobile", profile.mobile || "Not available");
    if (!profile.mobile) {
      renderMobileForm("Mobile is missing in your Firebase profile, so rank history cannot be matched yet.");
      renderEmpty("Save the same mobile number used in Rank Predictor to load records.");
      return;
    }
    const box = $("#mobileUpdateBox");
    if (box) box.innerHTML = `<div class="user-mini-card"><strong>Mobile matching active</strong><span>${profile.mobile} is used for Rank Predictor history.</span></div>`;
    try {
      const data = await fetchRankHistory(user, profile);
      renderDashboard(data);
    } catch (error) {
      console.warn("[GovJobUpdates] Rank dashboard fetch failed:", error.message);
      renderEmpty("Rank history API is not deployed yet. Deploy the Apps Script bridge patch.");
    }
  }

  onAuthStateChanged(auth, (user) => {
    if (!user) return;
    load(user);
  });
}());
