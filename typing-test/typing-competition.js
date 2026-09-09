(function () {
  "use strict";

  const API_BASE = "https://test.govjobupdates.com/live-test/typing-api/";
  const app = document.getElementById("typingTestApp");
  const input = document.getElementById("typingInput");
  const resultPanel = document.getElementById("resultPanel");
  const config = window.GJU_TYPING_CONFIG || null;
  if (!app || !input || !config) return;

  let auth = null;
  let authUser = null;
  let authReady = false;
  let rankSession = null;
  let startingSession = null;
  let currentStats = null;
  let lastSubmittedResultId = "";
  let rankedAttemptUserId = null;

  function injectStyles() {
    if (document.getElementById("gjuTypingCompetitionStyles")) return;
    const style = document.createElement("style");
    style.id = "gjuTypingCompetitionStyles";
    style.textContent = `
      .gju-typing-competition-gate{margin:10px 0 0;padding:0;border:0;background:transparent;display:flex;flex-direction:column;align-items:stretch;gap:12px}.gju-typing-competition-gate .gju-typing-button,.gju-typing-competition-result .gju-typing-button{min-height:44px;padding:10px 12px;font-size:13px;white-space:normal;text-align:center;box-sizing:border-box}
      .gju-typing-competition-gate[hidden]{display:none!important}.gju-typing-competition-gate strong{display:block;color:#172440;font-size:15px}.gju-typing-competition-gate p{margin:4px 0 0;color:#60708e;font-size:13px;line-height:1.45}.gju-typing-competition-gate a{flex:0 0 auto;text-decoration:none}
      .gju-typing-competition-card{margin:12px 0 0;padding:14px;border:1px solid #d8e0ee;border-radius:14px;background:#fff}.gju-typing-competition-card h3{margin:0 0 10px;font-size:15px;color:#172440}.gju-typing-competition-status{margin:0;color:#60708e;font-size:12px;line-height:1.45}.gju-typing-competition-status.is-good{color:#177245}.gju-typing-competition-status.is-warn{color:#9a5b00}
      .gju-typing-competition-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin-top:10px}.gju-typing-competition-metric{padding:10px 8px;border:1px solid #e3e8f1;border-radius:10px;text-align:center;background:#f8faff}.gju-typing-competition-metric span{display:block;color:#6d7890;font-size:11px}.gju-typing-competition-metric strong{display:block;margin-top:3px;color:#172440;font-size:17px;font-variant-numeric:tabular-nums}
      .gju-typing-competition-result{margin:16px 0;padding:16px;border:1px solid #d7e0ee;border-radius:16px;background:#f8faff}.gju-typing-competition-result h3{margin:0 0 5px;color:#172440}.gju-typing-competition-result .gju-typing-competition-grid{grid-template-columns:repeat(5,minmax(0,1fr))}.gju-typing-competition-result-note{margin:10px 0 0;color:#60708e;font-size:13px;line-height:1.5}
      .gju-typing-login-locked{opacity:.72}.gju-typing-login-locked::placeholder{color:#8c97aa}
      @media(max-width:760px){.gju-typing-competition-gate{align-items:flex-start;flex-direction:column}.gju-typing-competition-gate a{width:100%;text-align:center}.gju-typing-competition-grid,.gju-typing-competition-result .gju-typing-competition-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
    `;
    document.head.appendChild(style);
  }

  function injectUi() {
    injectStyles();
    if (!document.getElementById("typingCompetitionGate")) {
      const gate = document.createElement("section");
      gate.id = "typingCompetitionGate";
      gate.className = "gju-typing-competition-gate";
      gate.innerHTML = `<div><strong id="typingCompetitionGateTitle">Checking your account…</strong><p id="typingCompetitionGateText">Ranked typing attempts use your GovJobUpdates account.</p></div><a id="typingCompetitionLogin" class="gju-typing-button gju-typing-button-primary" href="../HTML/login.html?redirect=typing-return.html">Sign in for ranked attempt</a><button id="typingContinueGuest" type="button" class="gju-typing-button">Continue without login</button>`;
      const side = app.querySelector(".gju-typing-attempt-sidebar");
      side?.appendChild(gate);
      gate.querySelector("#typingContinueGuest")?.addEventListener("click",()=>{gate.hidden=true;input.focus();});
      gate.querySelector("#typingCompetitionLogin")?.addEventListener("click", () => {
        try { sessionStorage.setItem("gju:typing-return", window.location.pathname + window.location.search + window.location.hash); } catch (error) {}
      });
    }
    if (!document.getElementById("typingCompetitionCard")) {
      const side = app.querySelector(".gju-typing-attempt-sidebar");
      const card = document.createElement("section");
      card.id = "typingCompetitionCard";
      card.className = "gju-typing-competition-card";
      card.innerHTML = `<h3>Competitive ranking</h3><p class="gju-typing-competition-status" id="typingCompetitionStatus">Login required for ranked attempts.</p><div class="gju-typing-competition-grid" id="typingCompetitionMiniGrid" hidden></div>`;
      if (side) side.insertBefore(card, side.firstElementChild || null);
    }
    const gate = document.getElementById("typingCompetitionGate");
    if(gate)document.getElementById("typingCompetitionCard")?.appendChild(gate);
    if (resultPanel && !document.getElementById("typingCompetitionResult")) {
      const card = document.createElement("section");
      card.id = "typingCompetitionResult";
      card.className = "gju-typing-competition-result";
      card.hidden = true;
      card.innerHTML = `<h3 id="typingCompetitionResultTitle">Your competitive standing</h3><p class="gju-typing-competition-status" id="typingCompetitionResultStatus">Saving ranked result…</p><div class="gju-typing-competition-grid" id="typingCompetitionResultGrid"></div><p class="gju-typing-competition-result-note" id="typingCompetitionResultNote"></p><a id="typingResultLogin" class="gju-typing-button gju-typing-button-primary" href="../HTML/login.html?redirect=typing-return.html" hidden>Sign in for your next ranked attempt</a>`;
      const grid = document.getElementById("resultGrid");
      resultPanel.insertBefore(card, grid || null);
      card.querySelector("#typingResultLogin")?.addEventListener("click",()=>{try{sessionStorage.setItem("gju:typing-return",window.location.pathname+window.location.search);}catch(error){}});
    }
  }

  function setGate(state, message) {
    const gate = document.getElementById("typingCompetitionGate");
    const title = document.getElementById("typingCompetitionGateTitle");
    const text = document.getElementById("typingCompetitionGateText");
    // Account checks must never block ordinary typing practice.
    input.readOnly = false;
    input.classList.remove("gju-typing-login-locked");
    input.removeAttribute("aria-disabled");
    if (!gate) return;
    if (state === "ready") {
      gate.hidden = true;
      input.readOnly = false;
      input.classList.remove("gju-typing-login-locked");
      input.removeAttribute("aria-disabled");
      return;
    }
    gate.hidden = false;

    if (state === "checking") {
      if (title) title.textContent = "Checking your account…";
      if (text) text.textContent = "You can practise now. Login is needed only for ranked attempts.";
    } else if (state === "error") {
      if (title) title.textContent = "Ranked typing is temporarily unavailable";
      if (text) text.textContent = "You can continue practising without ranking. " + (message || "Try signing in again for ranked attempts.");
    } else {
      if (title) title.textContent = "Want to see your rank?";
      if (text) text.textContent = "Practise without login. Sign in before starting to save a ranked attempt and see your rank.";
    }
  }

  function routeState() {
    const params = new URLSearchParams(window.location.search);
    const presetId = params.get("preset") || app.dataset.presetId || config.defaultPresetId || "general-english";
    const preset = config.getPreset ? config.getPreset(presetId) : (config.presets || []).find(item => item.id === presetId);
    const language = params.get("language") && preset?.languages?.includes(params.get("language"))
      ? params.get("language") : (preset?.defaultLanguage || preset?.languages?.[0] || "english");
    const difficulty = config.difficulties?.includes(params.get("difficulty")) ? params.get("difficulty") : (preset?.difficulty || "medium");
    const durationMinutes = Number(preset?.duration) || 10;
    const passage = params.get("passage");
    return {
      presetKey: String(preset?.id || presetId),
      language,
      difficulty,
      durationSeconds: Math.round(durationMinutes * 60),
      passageId: passage !== null && /^\d+$/.test(passage) ? `${presetId}:${language}:${difficulty}:${passage}` : null
    };
  }

  function cohortQuery() {
    const state = routeState();
    const q = new URLSearchParams({
      preset_key: state.presetKey,
      language: state.language,
      difficulty: state.difficulty,
      duration_seconds: String(state.durationSeconds)
    });
    return q.toString();
  }

  async function getToken(forceRefresh) {
    if (!authUser) return "";
    try { return await authUser.getIdToken(Boolean(forceRefresh)); } catch (error) { return ""; }
  }

  async function apiRequest(path, method, body) {
    let token = await getToken(false);
    if (!token) throw new Error("Please login to start a ranked typing attempt.");
    const options = { method: method || "GET", mode: "cors", cache: "no-store", headers: { "Accept": "application/json", "Authorization": `Bearer ${token}` } };
    if (body) {
      options.headers["Content-Type"] = "application/json";
      options.body = JSON.stringify(body);
    }
    let response = await fetch(API_BASE + path, options);
    if (response.status === 401) {
      token = await getToken(true);
      if (token) {
        options.headers.Authorization = `Bearer ${token}`;
        response = await fetch(API_BASE + path, options);
      }
    }
    const data = await response.json().catch(() => null);
    if (!response.ok || !data || data.success !== true) throw new Error(data?.message || `Typing ranking request failed (${response.status}).`);
    return data;
  }

  function numberText(value, suffix) {
    return value == null || Number.isNaN(Number(value)) ? "—" : `${Number(value).toFixed(1)}${suffix || ""}`;
  }

  function renderMiniStats(stats, statusText) {
    const status = document.getElementById("typingCompetitionStatus");
    const grid = document.getElementById("typingCompetitionMiniGrid");
    if (status) {
      status.textContent = statusText || (stats?.best ? "Ranked attempt ready. Improve your best speed to climb the leaderboard." : "Ranked attempt ready. Complete the full test to enter the leaderboard.");
      status.className = "gju-typing-competition-status is-good";
    }
    if (!grid) return;
    grid.hidden = false;
    grid.innerHTML = `
      <div class="gju-typing-competition-metric"><span>Your Best</span><strong>${numberText(stats?.best?.netWpm, " WPM")}</strong></div>
      <div class="gju-typing-competition-metric"><span>Rank</span><strong>${stats?.rank ? `#${stats.rank}` : "—"}</strong></div>
      <div class="gju-typing-competition-metric"><span>Average</span><strong>${numberText(stats?.communityAverage, " WPM")}</strong></div>`;
  }

  async function loadStats() {
    if (!authUser) return null;
    try {
      const data = await apiRequest("stats.php?" + cohortQuery(), "GET");
      currentStats = data.stats || null;
      renderMiniStats(currentStats);
      return currentStats;
    } catch (error) {
      const status = document.getElementById("typingCompetitionStatus");
      if (status) { status.textContent = error.message; status.className = "gju-typing-competition-status is-warn"; }
      return null;
    }
  }

  async function startRankSession(force) {
    if (!authUser || app.dataset.state === "finished") return null;
    if (rankSession && !force) return rankSession;
    if (startingSession && !force) return startingSession;
    const state = routeState();
    startingSession = apiRequest("start.php", "POST", state).then(data => {
      rankSession = data.rankSession || null;
      renderMiniStats(currentStats, "Ranked session active. Full-duration completion counts toward your rank.");
      return rankSession;
    }).catch(error => {
      rankSession = null;
      const status = document.getElementById("typingCompetitionStatus");
      if (status) { status.textContent = error.message; status.className = "gju-typing-competition-status is-warn"; }
      return null;
    }).finally(() => { startingSession = null; });
    return startingSession;
  }

  function ineligibleMessage(reason) {
    if (reason === "full_duration_not_completed") return "This attempt was saved but not ranked because the full test duration was not completed.";
    if (reason === "speed_requires_review") return "This attempt was saved but held out of the leaderboard for speed review.";
    if (reason === "no_typing_recorded") return "No typing was recorded for ranking.";
    if (reason === "attempt_time_out_of_range") return "This attempt could not be ranked because its timing was outside the valid session window.";
    return "This attempt was saved but is not eligible for the leaderboard.";
  }

  function renderResultCompetition(result, payload, previousBest) {
    const card = document.getElementById("typingCompetitionResult");
    const status = document.getElementById("typingCompetitionResultStatus");
    const grid = document.getElementById("typingCompetitionResultGrid");
    const note = document.getElementById("typingCompetitionResultNote");
    if (!card || !grid) return;
    card.hidden = false;
    const attempt = payload?.attempt || null;
    const stats = payload?.stats || null;
    if (!attempt) {
      if (status) { status.textContent = "Result could not be synced to the ranked leaderboard."; status.className = "gju-typing-competition-status is-warn"; }
      grid.innerHTML = `<div class="gju-typing-competition-metric"><span>Your Speed</span><strong>${numberText(result.netWPM, " WPM")}</strong></div>`;
      if (note) note.textContent = "Your local typing result is still available. Retry when the ranking service is available.";
      return;
    }
    const newBest = attempt.rankEligible && stats?.best && Number(stats.best.netWpm) >= Number(result.netWPM) - 0.01 && (previousBest == null || Number(result.netWPM) > Number(previousBest) + 0.001);
    if (status) {
      status.textContent = attempt.rankEligible ? (newBest ? "New personal best — your leaderboard position has been recalculated." : "Ranked result saved successfully.") : "Attempt saved, but not added to the leaderboard.";
      status.className = `gju-typing-competition-status ${attempt.rankEligible ? "is-good" : "is-warn"}`;
    }
    grid.innerHTML = `
      <div class="gju-typing-competition-metric"><span>Your Speed</span><strong>${numberText(result.netWPM, " WPM")}</strong></div>
      <div class="gju-typing-competition-metric"><span>Personal Best</span><strong>${numberText(stats?.best?.netWpm, " WPM")}</strong></div>
      <div class="gju-typing-competition-metric"><span>Average</span><strong>${numberText(stats?.communityAverage, " WPM")}</strong></div>
      <div class="gju-typing-competition-metric"><span>Top Speed</span><strong>${numberText(stats?.topSpeed, " WPM")}</strong></div>
      <div class="gju-typing-competition-metric"><span>Your Rank</span><strong>${stats?.rank ? `#${stats.rank}/${stats.rankedUsers}` : "—"}</strong></div>`;
    if (note) {
      note.textContent = attempt.rankEligible
        ? `${stats?.percentile != null ? `Leaderboard percentile: ${Number(stats.percentile).toFixed(1)}%. ` : ""}Only your best eligible performance is used for rank, so a slower later attempt will not reduce your personal best.`
        : ineligibleMessage(attempt.ineligibleReason);
    }
    currentStats = stats;
    renderMiniStats(stats);
  }

  function renderGuestResult() {
    const card=document.getElementById("typingCompetitionResult");
    if(!card)return;
    card.hidden=false;
    const title=document.getElementById("typingCompetitionResultTitle");
    const status=document.getElementById("typingCompetitionResultStatus");
    const grid=document.getElementById("typingCompetitionResultGrid");
    const note=document.getElementById("typingCompetitionResultNote");
    const link=document.getElementById("typingResultLogin");
    if(title)title.textContent="Ready to see your rank?";
    if(status)status.textContent="Your practice result is ready. This attempt was not ranked.";
    if(grid)grid.innerHTML="";
    if(note)note.textContent=authUser?"Start a new attempt while signed in and complete the full timer to get ranked.":"Sign in before your next attempt to compare your eligible result with other students.";
    if(link)link.hidden=Boolean(authUser);
  }

  async function submitRankedResult(result) {
    if(result && (!authUser || rankedAttemptUserId !== authUser.uid)){renderGuestResult();return;}
    const title=document.getElementById("typingCompetitionResultTitle");
    if(title)title.textContent="Your competitive standing";
    const login=document.getElementById("typingResultLogin");
    if(login)login.hidden=true;
    if (!result || !authUser || rankedAttemptUserId !== authUser.uid || lastSubmittedResultId === String(result.id || "")) return;
    lastSubmittedResultId = String(result.id || Date.now());
    const card = document.getElementById("typingCompetitionResult");
    if (card) card.hidden = false;
    const status = document.getElementById("typingCompetitionResultStatus");
    if (status) { status.textContent = "Saving ranked result…"; status.className = "gju-typing-competition-status"; }
    const previousBest = currentStats?.best?.netWpm ?? null;
    let session = rankSession;
    if (!session && startingSession) session = await startingSession;
    if (!authUser || rankedAttemptUserId !== authUser.uid) return;
    if (!session?.token) {
      renderResultCompetition(result, null, previousBest);
      return;
    }
    const durationSeconds = Math.round(Number(result.durationMinutes || 0) * 60);
    const elapsed = Math.max(0, Math.round(Number(result.timeTakenSeconds || 0)));
    try {
      const data = await apiRequest("submit.php", "POST", {
        sessionToken: session.token,
        grossWpm: Number(result.grossWPM) || 0,
        netWpm: Number(result.netWPM) || 0,
        accuracy: Number(result.accuracy) || 0,
        typedChars: Number(result.totalTypedCharacters) || 0,
        correctChars: Number(result.correctCharacters) || 0,
        errors: Number(result.errors) || 0,
        elapsedSeconds: elapsed,
        completionReason: elapsed >= Math.max(1, durationSeconds - 3) ? "time" : "manual"
      });
      rankSession = null;
      renderResultCompetition(result, data, previousBest);
    } catch (error) {
      rankSession = null;
      renderResultCompetition(result, null, previousBest);
      const note = document.getElementById("typingCompetitionResultNote");
      if (note) note.textContent = error.message;
    }
  }

  function hookStorage() {
    const storage = window.GJUTypingStorage;
    if (!storage || storage.__competitionHooked) return;
    const original = storage.saveResult.bind(storage);
    storage.saveResult = function (result) {
      const stats = original(result);
      Promise.resolve().then(() => submitRankedResult(result));
      return stats;
    };
    storage.__competitionHooked = true;
  }

  async function initAuth() {
    setGate("checking");
    const firebaseConfig = window.GJU_FIREBASE_CONFIG;
    if (!firebaseConfig?.apiKey) {
      authReady = true;
      setGate("error", "Login configuration is unavailable. Please refresh the page.");
      return;
    }
    try {
      const [appMod, authMod] = await Promise.all([
        import("https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js"),
        import("https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js")
      ]);
      const firebaseApp = appMod.getApps().length ? appMod.getApps()[0] : appMod.initializeApp(firebaseConfig);
      auth = authMod.getAuth(firebaseApp);
      authMod.onAuthStateChanged(auth, async user => {
        authReady = true;
        authUser = user && user.emailVerified ? user : null;
        rankSession = null;
        currentStats = null;
        if (!authUser) {
          rankedAttemptUserId = null;
          const mini = document.getElementById("typingCompetitionMiniGrid");
          const result = document.getElementById("typingCompetitionResult");
          if (mini) mini.hidden = true;
          if (result) result.hidden = true;
          setGate("login");
          const status = document.getElementById("typingCompetitionStatus");
          if (status) { status.textContent = "Login required for ranked attempts."; status.className = "gju-typing-competition-status"; }
          return;
        }
        setGate("ready");
        await loadStats();
        renderMiniStats(currentStats, "Ready. Start typing to begin your ranked session.");
      });
    } catch (error) {
      authReady = true;
      setGate("error", "Unable to verify your login right now. Please refresh and try again.");
    }
  }

  function watchAttemptState() {
    let previousState = app.dataset.state || "";
    const observer = new MutationObserver(() => {
      const nextState = app.dataset.state || "";
      if (nextState === previousState) return;
      const oldState = previousState;
      previousState = nextState;
      if (nextState === "running") {
        rankedAttemptUserId = authUser?.uid || null;
        rankSession = null;
        if (authUser) startRankSession(true);
      } else if (authUser && nextState === "ready" && oldState === "finished") {
        rankSession = null;
        renderMiniStats(currentStats, "Ready. Start typing to begin your ranked session.");
      }
    });
    observer.observe(app, { attributes: true, attributeFilter: ["data-state"] });
  }

  injectUi();

  hookStorage();
  watchAttemptState();
  initAuth();
})();