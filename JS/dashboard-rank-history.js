import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { getDatabase, ref, get, update, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";

(function () {
  "use strict";

  const config = window.GJU_FIREBASE_CONFIG;
  const rankConfig = window.RANK_PREDICTOR_CONFIG || {};
  const apiBaseUrl = String(rankConfig.apiBaseUrl || "").replace(/\/+$/, "");
  const legacyApiUrl = String(rankConfig.apiUrl || "").trim();
  const RESULT_STORAGE_KEY = "gju_rank_predictor_latest_result";
  const RESULT_PAGE_URL = "rank-result.html";
  const ONE_YEAR_MS = 365 * 24 * 60 * 60 * 1000;
  if (!config || !config.apiKey || (!apiBaseUrl && !legacyApiUrl)) return;

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

  function formatDateTime(value) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return formatValue(value, "Recent");
    return date.toLocaleString("en-IN", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });
  }

  function getAttemptTime(attempt) {
    const date = new Date(attempt?.completedAt || attempt?.timestamp || attempt?.examDate || "");
    return Number.isNaN(date.getTime()) ? 0 : date.getTime();
  }

  function filterLastYearAttempts(attempts) {
    const cutoff = Date.now() - ONE_YEAR_MS;
    return attempts.filter((attempt) => {
      const time = getAttemptTime(attempt);
      return !time || time >= cutoff;
    });
  }

  function filterProfileAttempts(attempts) {
    const profileMobile = cleanMobile(currentProfile?.mobile);
    if (!profileMobile) return attempts;
    return attempts.filter((attempt) => cleanMobile(attempt?.mobileNumber || attempt?.mobile || "") === profileMobile);
  }

  function getRankSet(attempt, type) {
    if (!attempt) return {};
    if (type === "raw") return attempt.rawRanks || {};
    return attempt.normalizedRanks || attempt.normalisedRanks || {};
  }

  function formatMarks(value) {
    const parsed = Number(value);
    if (!Number.isFinite(parsed)) return "--";
    return parsed.toFixed(2);
  }

  function getAttemptRank(attempt, type, field, fallback) {
    const rankSet = getRankSet(attempt, type);
    return rankSet[field] ?? fallback ?? "";
  }

  function buildExamRecords(attempts) {
    const buckets = {};
    attempts.forEach((attempt) => {
      const key = attempt.examId || attempt.examName || "exam";
      const time = getAttemptTime(attempt);
      const rank = number(attempt.overallRank);
      const rawRank = number(getAttemptRank(attempt, "raw", "overallRank", attempt.overallRank));
      const normalizedRank = number(getAttemptRank(attempt, "normalized", "overallRank", attempt.overallRank));
      if (!buckets[key]) {
        buckets[key] = {
          key,
          latest: attempt,
          latestTime: time,
          count: 0,
          bestRank: Infinity,
          bestRawRank: Infinity,
          bestNormalizedRank: Infinity,
          bestPercentile: 0
        };
      }
      const bucket = buckets[key];
      bucket.count += 1;
      if (time >= bucket.latestTime) {
        bucket.latest = attempt;
        bucket.latestTime = time;
      }
      if (rank > 0) bucket.bestRank = Math.min(bucket.bestRank, rank);
      if (rawRank > 0) bucket.bestRawRank = Math.min(bucket.bestRawRank, rawRank);
      if (normalizedRank > 0) bucket.bestNormalizedRank = Math.min(bucket.bestNormalizedRank, normalizedRank);
      bucket.bestPercentile = Math.max(bucket.bestPercentile, number(attempt.percentile));
    });
    return Object.values(buckets).map((item) => ({
      ...item,
      bestRank: Number.isFinite(item.bestRank) ? item.bestRank : 0,
      bestRawRank: Number.isFinite(item.bestRawRank) ? item.bestRawRank : 0,
      bestNormalizedRank: Number.isFinite(item.bestNormalizedRank) ? item.bestNormalizedRank : 0
    })).sort((a, b) => b.latestTime - a.latestTime);
  }

  function getQualificationLabel(attempt) {
    if (!attempt || typeof attempt.isQualified !== "boolean") return { text: "Merit status not available", className: "neutral" };
    return attempt.isQualified
      ? { text: "Eligible for merit rank", className: "good" }
      : { text: "Not eligible for merit rank", className: "bad" };
  }

  function ensureRankDashboardSections() {
    const graphSection = $("#rankPercentileChart")?.closest(".dashboard-section-grid");
    if (graphSection && !$("#latestRankSnapshot")) {
      graphSection.insertAdjacentHTML("beforebegin", `
        <section class="dashboard-section-grid rank-dashboard-primary-grid">
          <div class="dash-section-card rank-latest-card">
            <div class="dash-section-head">
              <div>
                <h2>Latest Rank Result</h2>
                <p>Your latest rank predictor snapshot from the last 1 year.</p>
              </div>
              <a class="auth-btn auth-btn-primary" href="rank-predictor.html">Check New Rank</a>
            </div>
            <div id="latestRankSnapshot"></div>
          </div>
          <div class="dash-section-card rank-health-card">
            <div class="dash-section-head">
              <div>
                <h2>Rank Health</h2>
                <p>One-year summary matched with your saved mobile number.</p>
              </div>
            </div>
            <div id="rankHealthBox"></div>
          </div>
        </section>
      `);
    }

    const historySection = $("#rankHistoryList")?.closest(".dashboard-section-grid");
    if (historySection && !$("#rankExamRecords")) {
      historySection.insertAdjacentHTML("beforebegin", `
        <section class="dashboard-section-grid rank-records-section">
          <div class="dash-section-card rank-records-card">
            <div class="dash-section-head">
              <div>
                <h2>Exam-wise Rank Records</h2>
                <p>Latest result per exam, so candidates can scan current rank without opening every exam again.</p>
              </div>
            </div>
            <div id="rankExamRecords"></div>
          </div>
        </section>
      `);
    }
  }

  function renderLatestRankSnapshot(attempts) {
    const host = $("#latestRankSnapshot");
    if (!host) return;
    if (!attempts.length) {
      host.innerHTML = `<div class="user-mini-card"><strong>No latest result yet</strong><span>Use Rank Predictor once with your saved mobile number.</span></div>`;
      return;
    }

    const latest = attempts.slice().sort((a, b) => getAttemptTime(b) - getAttemptTime(a))[0];
    const status = getQualificationLabel(latest);
    const normalizedMarks = latest.normalizedMarks ?? latest.normalisedMarks;
    const failedSubjects = Array.isArray(latest.failedSubjects) ? latest.failedSubjects : [];
    host.innerHTML = `
      <div class="rank-latest-snapshot">
        <div class="rank-latest-head">
          <div>
            <span class="rank-mini-label">Latest check</span>
            <h3>${escapeHtml(formatValue(latest.examName, "Rank Predictor Exam"))}</h3>
            <p>Roll ${escapeHtml(formatValue(latest.rollNumber))} · Submitted ${escapeHtml(formatDateTime(latest.completedAt || latest.timestamp || latest.examDate))}</p>
          </div>
          <span class="rank-status-badge ${status.className}">${escapeHtml(status.text)}</span>
        </div>
        ${status.className === "bad" ? `
          <div class="rank-qualification-note">
            <strong>${escapeHtml(latest.qualificationMessage || "Qualifying criteria not cleared.")}</strong>
            ${failedSubjects.length ? `<span>${failedSubjects.map((subject) => escapeHtml(subject.name || subject.subject || "Subject")).join(", ")} needs attention.</span>` : ""}
          </div>
        ` : ""}
        <div class="rank-metric-grid">
          <div class="rank-metric-card highlight"><span>Current Rank</span><strong>#${formatRank(latest.overallRank)}</strong></div>
          <div class="rank-metric-card"><span>Normalised Marks</span><strong>${formatMarks(normalizedMarks)}</strong></div>
          <div class="rank-metric-card"><span>Normalised Rank</span><strong>#${formatRank(getAttemptRank(latest, "normalized", "overallRank", latest.overallRank))}</strong></div>
          <div class="rank-metric-card"><span>Shift Rank</span><strong>#${formatRank(latest.shiftRank)}</strong></div>
          <div class="rank-metric-card"><span>Raw Marks</span><strong>${formatMarks(latest.rawMarks)}</strong></div>
          <div class="rank-metric-card"><span>Raw Rank</span><strong>#${formatRank(getAttemptRank(latest, "raw", "overallRank", latest.overallRank))}</strong></div>
          <div class="rank-metric-card"><span>Category Rank</span><strong>#${formatRank(latest.categoryRank)}</strong></div>
          <div class="rank-metric-card"><span>Percentile</span><strong>${formatMarks(latest.percentile)}%</strong></div>
        </div>
        <button class="auth-btn auth-btn-secondary rank-open-result" type="button" data-rank-result-id="${escapeHtml(String(latest.id || latest.rowNumber || ""))}">Open Full Result</button>
      </div>
    `;
  }

  function renderRankHealth(records, attempts) {
    const host = $("#rankHealthBox");
    if (!host) return;
    if (!attempts.length) {
      host.innerHTML = `<div class="user-mini-card"><strong>No analysis yet</strong><span>Rank health appears after your first matched record.</span></div>`;
      return;
    }
    const qualified = attempts.filter((attempt) => attempt.isQualified === true).length;
    const avgPercentile = attempts.reduce((sum, attempt) => sum + number(attempt.percentile), 0) / attempts.length;
    const best = attempts.filter((attempt) => number(attempt.overallRank) > 0).sort((a, b) => number(a.overallRank) - number(b.overallRank))[0];
    const latestTime = Math.max(...attempts.map(getAttemptTime));
    host.innerHTML = `
      <div class="rank-health-grid">
        <div class="rank-health-item"><span>Exams Checked</span><strong>${records.length}</strong></div>
        <div class="rank-health-item"><span>Records</span><strong>${attempts.length}</strong></div>
        <div class="rank-health-item"><span>Average Percentile</span><strong>${Math.round(avgPercentile)}%</strong></div>
        <div class="rank-health-item"><span>Qualified Records</span><strong>${qualified}</strong></div>
        <div class="rank-health-item wide"><span>Best Rank</span><strong>#${formatRank(best?.overallRank)}</strong><small>${escapeHtml(best?.examName || "Will update after more records")}</small></div>
        <div class="rank-health-item wide"><span>Last Updated</span><strong>${escapeHtml(latestTime ? formatDateTime(latestTime) : "Recent")}</strong></div>
      </div>
    `;
  }

  function renderExamRecords(attempts) {
    const host = $("#rankExamRecords");
    if (!host) return;
    const records = buildExamRecords(attempts);
    if (!records.length) {
      host.innerHTML = `<div class="user-mini-card"><strong>No exam-wise records yet</strong><span>Matched rank records from the last 1 year will appear here.</span></div>`;
      return;
    }
    host.innerHTML = `
      <div class="rank-exam-record-grid">
        ${records.map((record) => {
          const attempt = record.latest || {};
          const status = getQualificationLabel(attempt);
          const normalizedMarks = attempt.normalizedMarks ?? attempt.normalisedMarks;
          return `
            <article class="rank-record-card">
              <div class="rank-record-card-head">
                <div>
                  <span class="rank-mini-label">${escapeHtml(formatValue(attempt.board, "Exam"))}</span>
                  <h3>${escapeHtml(formatValue(attempt.examName, "Rank Predictor Exam"))}</h3>
                  <p>${record.count} record${record.count > 1 ? "s" : ""} · Latest ${escapeHtml(formatDate(attempt.completedAt || attempt.timestamp || attempt.examDate))}</p>
                </div>
                <span class="rank-status-badge ${status.className}">${escapeHtml(status.text)}</span>
              </div>
              <div class="rank-record-meta-grid">
                <div><span>Current Rank</span><strong>#${formatRank(attempt.overallRank)}</strong></div>
                <div><span>Norm Marks</span><strong>${formatMarks(normalizedMarks)}</strong></div>
                <div><span>Norm Rank</span><strong>#${formatRank(getAttemptRank(attempt, "normalized", "overallRank", attempt.overallRank))}</strong></div>
                <div><span>Raw Marks</span><strong>${formatMarks(attempt.rawMarks)}</strong></div>
                <div><span>Raw Rank</span><strong>#${formatRank(getAttemptRank(attempt, "raw", "overallRank", attempt.overallRank))}</strong></div>
                <div><span>Shift Rank</span><strong>#${formatRank(attempt.shiftRank)}</strong></div>
                <div><span>Category Rank</span><strong>#${formatRank(attempt.categoryRank)}</strong></div>
                <div><span>State Rank</span><strong>#${formatRank(attempt.stateRank)}</strong></div>
                <div><span>Percentile</span><strong>${formatMarks(attempt.percentile)}%</strong></div>
              </div>
              <div class="rank-record-actions">
                <button class="auth-btn auth-btn-secondary rank-open-result" type="button" data-rank-result-id="${escapeHtml(String(attempt.id || attempt.rowNumber || ""))}">Open Result</button>
                <a class="auth-btn auth-btn-outline" href="rank-predictor.html">Check Again</a>
              </div>
            </article>
          `;
        }).join("")}
      </div>
    `;
  }

  function buildResultSnapshot(attempt) {
    const normalizedMarks = attempt?.normalizedMarks ?? attempt?.normalisedMarks ?? attempt?.rawMarks;
    return {
      resultData: attempt || {},
      payload: {
        examId: attempt?.examId || "",
        examName: attempt?.examName || "",
        sheetName: attempt?.sheetName || "",
        mode: attempt?.mode || "",
        rollNumber: attempt?.rollNumber || "",
        gender: attempt?.gender || "",
        category: attempt?.category || "",
        horizontalCategory: attempt?.horizontalCategory || "",
        state: attempt?.state || "",
        examDate: attempt?.examDate || "",
        shift: attempt?.shift || "",
        totalQuestions: attempt?.totalQuestions,
        totalAttempted: attempt?.totalAttempted,
        rightAnswers: attempt?.rightAnswers,
        wrongAnswers: attempt?.wrongAnswers,
        unattempted: attempt?.unattempted,
        rawMarks: attempt?.rawMarks,
        normalizedMarks,
        subjectData: attempt?.subjectData || attempt?.subjectAnalysis || []
      },
      examName: attempt?.examName || "",
      exam: {
        examId: attempt?.examId || "",
        examName: attempt?.examName || "",
        board: attempt?.board || "",
        hasShifts: Boolean(attempt?.hasShifts),
        normalization: Boolean(attempt?.normalization)
      },
      derived: { normalizedMarks },
      savedAt: new Date().toISOString()
    };
  }

  function bindOpenResultButtons(attempts) {
    document.querySelectorAll(".rank-open-result").forEach((button) => {
      button.addEventListener("click", () => {
        const id = button.getAttribute("data-rank-result-id") || "";
        const attempt = attempts.find((item) => String(item.id || item.rowNumber || "") === id) || attempts[0];
        try {
          sessionStorage.setItem(RESULT_STORAGE_KEY, JSON.stringify(buildResultSnapshot(attempt)));
          window.location.href = RESULT_PAGE_URL;
        } catch (error) {
          setText("#rankHistoryStatus", "Result could not be opened because browser storage is blocked.");
        }
      });
    });
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
      firebaseUid: user.uid,
      userId: user.uid,
      name: profile.name,
      email: profile.email,
      mobile: profile.mobile
    };

    if (apiBaseUrl) {
      try {
        const response = await fetch(`${apiBaseUrl}/dashboard.php`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        const data = await response.json();
        if (response.ok || data?.success !== false) return data;
        throw new Error(data?.message || `Dashboard API failed (${response.status})`);
      } catch (error) {
        if (!legacyApiUrl) throw error;
        console.warn("[GovJobUpdates] MySQL rank dashboard failed, trying legacy bridge:", error.message);
      }
    }

    const legacyPayload = {
      ...payload,
      action: "getFirebaseRankDashboard"
    };
    const response = await fetch(legacyApiUrl, {
      method: "POST",
      redirect: "follow",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(legacyPayload)
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
    ensureRankDashboardSections();
    setText("#rankPredictionCount", "0");
    setText("#bestEstimatedRank", "--");
    setText("#rankHistoryStatus", message || "No rank predictor record found for your login mobile/email.");
    const list = $("#rankHistoryList");
    if (list) list.innerHTML = `<div class="user-mini-card"><strong>No rank history yet</strong><span>${message || "Use Rank Predictor with the same mobile number used in signup."}</span></div>`;
    renderLatestRankSnapshot([]);
    renderRankHealth([], []);
    renderExamRecords([]);
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

  function buildExamTrendStats(attempts) {
    const buckets = {};
    attempts.forEach((attempt) => {
      const key = attempt.examId || attempt.examName || "exam";
      const exam = attempt.examName || "Exam";
      const rank = number(attempt.overallRank);
      const percentile = number(attempt.percentile);
      const time = getAttemptTime(attempt);
      if (!buckets[key]) {
        buckets[key] = {
          name: exam,
          count: 0,
          latestTime: 0,
          latestRank: 0,
          bestRank: Infinity,
          bestPercentile: 0
        };
      }
      const bucket = buckets[key];
      bucket.count += 1;
      bucket.bestPercentile = Math.max(bucket.bestPercentile, percentile);
      if (rank > 0) bucket.bestRank = Math.min(bucket.bestRank, rank);
      if (time >= bucket.latestTime) {
        bucket.latestTime = time;
        bucket.latestRank = rank;
      }
    });
    return Object.values(buckets).map((item) => ({
      ...item,
      bestRank: Number.isFinite(item.bestRank) ? item.bestRank : 0
    })).sort((a, b) => {
      const rankA = a.bestRank || Infinity;
      const rankB = b.bestRank || Infinity;
      if (rankA !== rankB) return rankA - rankB;
      return b.bestPercentile - a.bestPercentile;
    }).slice(0, 6);
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
      const trendStats = buildExamTrendStats(attempts);
      const ranks = trendStats.map((item) => number(item.bestRank)).filter((rank) => rank > 0);
      const worstRank = Math.max(...ranks, 1);
      rankChart.innerHTML = `
        <div class="dash-horizontal-bars">
          ${trendStats.map((item) => {
            const rank = number(item.bestRank);
            const better = rank > 0 ? Math.max(8, 100 - ((rank - 1) / Math.max(worstRank, 1)) * 92) : 0;
            return `
              <div class="dash-hbar-row">
                <label>
                  <span>${escapeHtml(item.name)}</span>
                  <strong>Best Rank ${formatRank(rank)}${item.count > 1 ? ` (${item.count} attempts)` : ""}</strong>
                </label>
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
    ensureRankDashboardSections();
    const allAttempts = Array.isArray(data.rankAttempts || data.attempts) ? (data.rankAttempts || data.attempts) : [];
    const attempts = filterLastYearAttempts(filterProfileAttempts(allAttempts));
    const records = buildExamRecords(attempts);
    const bestRankAttempt = attempts.filter((attempt) => number(attempt.overallRank) > 0).sort((a, b) => number(a.overallRank) - number(b.overallRank))[0];
    const summary = data.summary || {};
    setText("#rankPredictionCount", String(attempts.length || summary.totalRankPredictorAttempts || 0));
    setText("#bestEstimatedRank", formatRank(bestRankAttempt?.overallRank ?? summary.bestRank));
    setText("#bestRankExam", bestRankAttempt?.examName ? `Best in ${bestRankAttempt.examName}` : "Will show after prediction");
    setText("#rankHistoryStatus", attempts.length ? "Last 1 year rank predictor records loaded." : "No rank predictor records found in the last 1 year.");

    renderLatestRankSnapshot(attempts);
    renderRankHealth(records, attempts);
    renderExamRecords(attempts);
    renderRankGraphs(attempts);

    const list = $("#rankHistoryList");
    if (!list) return;
    if (!attempts.length) {
      renderEmpty("Use Rank Predictor with the same mobile number used in signup.");
      return;
    }

    list.innerHTML = `
      <div class="rank-history-table-wrap">
        <table class="rank-history-table">
          <thead>
            <tr>
              <th>Exam</th>
              <th>Raw</th>
              <th>Normalised</th>
              <th>Ranks</th>
              <th>Category</th>
              <th>Submitted</th>
            </tr>
          </thead>
          <tbody>
            ${attempts.slice(0, 12).map((attempt) => `
              <tr>
                <td><strong>${escapeHtml(formatValue(attempt.examName, "Exam"))}</strong><span>Roll ${escapeHtml(formatValue(attempt.rollNumber))}</span></td>
                <td>${formatMarks(attempt.rawMarks)}</td>
                <td>${formatMarks(attempt.normalizedMarks ?? attempt.normalisedMarks)}</td>
                <td><strong>#${formatRank(attempt.overallRank)}</strong><span>Raw #${formatRank(getAttemptRank(attempt, "raw", "overallRank", attempt.overallRank))} · Shift #${formatRank(attempt.shiftRank)}</span></td>
                <td><strong>#${formatRank(attempt.categoryRank)}</strong><span>${escapeHtml(formatValue(attempt.category))} · ${escapeHtml(formatValue(attempt.state))}</span></td>
                <td>${escapeHtml(formatDateTime(attempt.completedAt || attempt.timestamp || attempt.examDate))}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    `;
    bindOpenResultButtons(attempts);
  }

  async function load(user) {
    setText("#rankHistoryStatus", "Loading rank predictor history...");
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
      renderEmpty("Rank history API is not available right now.");
    }
  }

  onAuthStateChanged(auth, (user) => {
    if (!user) return;
    load(user);
  });
}());
