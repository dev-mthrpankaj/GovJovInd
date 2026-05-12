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

  function formatValue(value, fallback = "--") {
    if (value === undefined || value === null || value === "") return fallback;
    return String(value);
  }

  function formatRank(value) {
    const number = Number(value);
    return Number.isFinite(number) && number > 0 ? String(number) : "--";
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
    const form = $("#mobileUpdateForm");
    form?.addEventListener("submit", saveMobileFromForm);
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
        <small>${formatValue(attempt.examDate || attempt.completedAt || attempt.timestamp, "Recent")}</small>
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
