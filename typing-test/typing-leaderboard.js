(function () {
  "use strict";

  const API_BASE = "https://test.govjobupdates.com/live-test/typing-api/";
  const FIREBASE_APP = "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
  const FIREBASE_AUTH = "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
  let authUser = null;
  let authResolved = false;
  let activeCohort = null;
  let lastFocused = null;

  function durationFromPreset(presetKey) {
    const fixed = {"ssc-cgl-dest":15,"delhi-police-hc-ministerial":10,"upsssc-junior-assistant":5,"up-police-computer-operator":15,"up-clerical":5,"ssc-stenographer":40};
    const preset = window.GJU_TYPING_CONFIG?.getPreset ? window.GJU_TYPING_CONFIG.getPreset(presetKey) : null;
    return Math.round((Number(preset?.duration) || fixed[presetKey] || 10) * 60);
  }

  function cohortFromUrl(rawUrl) {
    let url;
    try { url = new URL(rawUrl, window.location.href); } catch (error) { return null; }
    const presetKey = url.searchParams.get("preset") || document.getElementById("typingTestApp")?.dataset.presetId || "";
    const language = url.searchParams.get("language") || "english";
    const difficulty = url.searchParams.get("difficulty") || "medium";
    const passage = url.searchParams.get("passage");
    if (!presetKey || passage === null || !/^\d+$/.test(passage)) return null;
    return {
      presetKey,
      language,
      difficulty,
      durationSeconds: durationFromPreset(presetKey),
      passageId: `${presetKey}:${language}:${difficulty}:${passage}`,
      passageNumber: Number(passage) + 1
    };
  }

  function queryFor(cohort, limit) {
    return new URLSearchParams({
      preset_key: cohort.presetKey,
      language: cohort.language,
      difficulty: cohort.difficulty,
      duration_seconds: String(cohort.durationSeconds),
      passage_id: cohort.passageId,
      ...(limit ? { limit: String(limit) } : {})
    }).toString();
  }

  function injectStyles() {
    if (document.getElementById("gjuTypingLeaderboardStyles")) return;
    const style = document.createElement("style");
    style.id = "gjuTypingLeaderboardStyles";
    style.textContent = `
      .gju-typing-leaderboard-open{display:inline-flex;align-items:center;justify-content:center;gap:6px;border:1px solid #d9e1ee;border-radius:9px;background:#fff;color:#33415d;font:inherit;font-size:11px;font-weight:700;line-height:1;padding:8px 10px;cursor:pointer;text-decoration:none;white-space:nowrap}
      .gju-typing-leaderboard-open:hover{background:#f6f8fc;border-color:#c8d3e4}.gju-typing-leaderboard-open:focus-visible{outline:3px solid rgba(40,92,180,.2);outline-offset:2px}
      .gju-typing-card-foot .gju-typing-leaderboard-open{margin-left:7px}
      .gju-typing-competition-card .gju-typing-leaderboard-open{width:100%;margin-top:10px}
      .gju-typing-leaderboard-backdrop{position:fixed;inset:0;z-index:100000;display:flex;align-items:center;justify-content:center;padding:18px;background:rgba(15,23,42,.58);backdrop-filter:blur(3px)}
      .gju-typing-leaderboard-backdrop[hidden]{display:none!important}
      .gju-typing-leaderboard-modal{width:min(760px,100%);max-height:min(820px,92vh);overflow:hidden;border:1px solid #d8e0ec;border-radius:20px;background:#fff;box-shadow:0 28px 80px rgba(15,23,42,.28);display:flex;flex-direction:column}
      .gju-typing-leaderboard-head{display:flex;align-items:flex-start;justify-content:space-between;gap:16px;padding:18px 20px;border-bottom:1px solid #e7ebf2}
      .gju-typing-leaderboard-kicker{margin:0 0 4px;color:#6e7b91;font-size:10px;font-weight:800;letter-spacing:.08em;text-transform:uppercase}.gju-typing-leaderboard-head h2{margin:0;color:#172440;font-size:20px;line-height:1.25}.gju-typing-leaderboard-sub{margin:5px 0 0;color:#68758d;font-size:12px}
      .gju-typing-leaderboard-close{width:36px;height:36px;border:1px solid #dce3ee;border-radius:10px;background:#fff;color:#41506b;font-size:20px;line-height:1;cursor:pointer}
      .gju-typing-leaderboard-body{overflow:auto;padding:16px 20px 20px}
      .gju-typing-leaderboard-own{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;margin-bottom:14px}.gju-typing-leaderboard-own>div{padding:10px;border:1px solid #e1e7f0;border-radius:11px;background:#f8faff}.gju-typing-leaderboard-own span{display:block;color:#748096;font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.04em}.gju-typing-leaderboard-own strong{display:block;margin-top:3px;color:#172440;font-size:15px;font-variant-numeric:tabular-nums}
      .gju-typing-leaderboard-note{margin:0 0 12px;padding:9px 11px;border-radius:10px;background:#f6f8fc;color:#68758d;font-size:11px;line-height:1.4}
      .gju-typing-leaderboard-table-wrap{overflow-x:auto;border:1px solid #e3e8f1;border-radius:13px}.gju-typing-leaderboard-table{width:100%;border-collapse:collapse;min-width:520px}.gju-typing-leaderboard-table th{padding:9px 12px;background:#f7f9fc;color:#6d7890;font-size:9px;text-transform:uppercase;letter-spacing:.05em;text-align:left}.gju-typing-leaderboard-table td{padding:11px 12px;border-top:1px solid #edf0f5;color:#33415d;font-size:12px}.gju-typing-leaderboard-table td:nth-child(1),.gju-typing-leaderboard-table td:nth-child(3),.gju-typing-leaderboard-table td:nth-child(4){font-variant-numeric:tabular-nums}.gju-typing-leaderboard-table .is-you td{background:#eef6ff}.gju-typing-leaderboard-rank{font-weight:800;color:#172440}.gju-typing-leaderboard-name{font-weight:700;color:#25324b}.gju-typing-leaderboard-empty{padding:28px 16px;text-align:center;color:#748096;font-size:13px}.gju-typing-leaderboard-medal{margin-right:5px}
      @media(max-width:620px){.gju-typing-leaderboard-backdrop{padding:8px}.gju-typing-leaderboard-modal{max-height:96vh;border-radius:16px}.gju-typing-leaderboard-head{padding:14px}.gju-typing-leaderboard-body{padding:12px 14px 16px}.gju-typing-leaderboard-own{grid-template-columns:repeat(2,minmax(0,1fr))}.gju-typing-card-foot{flex-wrap:wrap}.gju-typing-card-foot .gju-typing-leaderboard-open{margin-left:0;flex:1 1 100%}}
    `;
    document.head.appendChild(style);
  }

  function ensureModal() {
    injectStyles();
    let backdrop = document.getElementById("gjuTypingLeaderboardBackdrop");
    if (backdrop) return backdrop;
    backdrop = document.createElement("div");
    backdrop.id = "gjuTypingLeaderboardBackdrop";
    backdrop.className = "gju-typing-leaderboard-backdrop";
    backdrop.hidden = true;
    backdrop.innerHTML = `<section class="gju-typing-leaderboard-modal" role="dialog" aria-modal="true" aria-labelledby="gjuTypingLeaderboardTitle"><header class="gju-typing-leaderboard-head"><div><p class="gju-typing-leaderboard-kicker">Passage leaderboard</p><h2 id="gjuTypingLeaderboardTitle">Top candidates</h2><p class="gju-typing-leaderboard-sub" id="gjuTypingLeaderboardSub"></p></div><button class="gju-typing-leaderboard-close" type="button" aria-label="Close leaderboard">×</button></header><div class="gju-typing-leaderboard-body" id="gjuTypingLeaderboardBody"><div class="gju-typing-leaderboard-empty">Loading leaderboard…</div></div></section>`;
    document.body.appendChild(backdrop);
    const close = () => closeModal();
    backdrop.querySelector(".gju-typing-leaderboard-close")?.addEventListener("click", close);
    backdrop.addEventListener("click", event => { if (event.target === backdrop) close(); });
    document.addEventListener("keydown", event => { if (event.key === "Escape" && !backdrop.hidden) close(); });
    return backdrop;
  }

  function closeModal() {
    const backdrop = document.getElementById("gjuTypingLeaderboardBackdrop");
    if (!backdrop) return;
    backdrop.hidden = true;
    document.body.style.removeProperty("overflow");
    if (lastFocused?.focus) lastFocused.focus();
  }

  function safeName(name) {
    const parts = String(name || "Candidate").trim().split(/\s+/).filter(Boolean);
    if (!parts.length) return "Candidate";
    const first = parts[0].slice(0, 24);
    if (parts.length === 1) return first;
    return `${first} ${parts[parts.length - 1].charAt(0).toUpperCase()}.`;
  }

  function fmt(value, digits) {
    const n = Number(value);
    return Number.isFinite(n) ? n.toLocaleString("en-IN", { minimumFractionDigits: digits, maximumFractionDigits: digits }) : "—";
  }

  function medal(rank) {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return "";
  }

  async function getToken(forceRefresh) {
    if (!authUser) return "";
    try { return await authUser.getIdToken(Boolean(forceRefresh)); } catch (error) { return ""; }
  }

  async function fetchOwnStats(cohort) {
    if (!authUser) return null;
    let token = await getToken(false);
    if (!token) return null;
    const request = async bearer => fetch(API_BASE + "stats.php?" + queryFor(cohort), { cache:"no-store", mode:"cors", headers:{"Accept":"application/json","Authorization":`Bearer ${bearer}`} });
    let response = await request(token);
    if (response.status === 401) { token = await getToken(true); if (token) response = await request(token); }
    const data = await response.json().catch(() => null);
    return response.ok && data?.success === true ? (data.stats || null) : null;
  }

  async function fetchLeaderboard(cohort) {
    const response = await fetch(API_BASE + "leaderboard.php?" + queryFor(cohort, 20), { cache:"no-store", mode:"cors", headers:{"Accept":"application/json"} });
    const data = await response.json().catch(() => null);
    if (!response.ok || data?.success !== true) throw new Error(data?.message || "Unable to load leaderboard.");
    return data;
  }

  function ownHtml(stats, cohortSummary) {
    const rankedUsers = Number(stats?.rankedUsers ?? cohortSummary?.rankedUsers) || 0;
    return `<div class="gju-typing-leaderboard-own"><div><span>Your Best</span><strong>${stats?.best?.netWpm != null ? `${fmt(stats.best.netWpm,1)} WPM` : "—"}</strong></div><div><span>Your Rank</span><strong>${stats?.rank ? `#${Number(stats.rank).toLocaleString("en-IN")}` : "—"}</strong></div><div><span>Ranked Candidates</span><strong>${rankedUsers.toLocaleString("en-IN")}</strong></div><div><span>Community Avg</span><strong>${cohortSummary?.communityAverage != null ? `${fmt(cohortSummary.communityAverage,1)} WPM` : "—"}</strong></div></div>`;
  }

  function tableHtml(rows, ownRank) {
    if (!rows?.length) return `<div class="gju-typing-leaderboard-empty">No ranked attempts yet. Complete the full-duration passage to become the first ranked candidate.</div>`;
    return `<div class="gju-typing-leaderboard-table-wrap"><table class="gju-typing-leaderboard-table"><thead><tr><th>Rank</th><th>Candidate</th><th>Best Speed</th><th>Accuracy</th></tr></thead><tbody>${rows.map(row => { const rank=Number(row.rank)||0; return `<tr${ownRank && rank===ownRank ? ' class="is-you"' : ""}><td class="gju-typing-leaderboard-rank">${medal(rank) ? `<span class="gju-typing-leaderboard-medal">${medal(rank)}</span>` : ""}#${rank.toLocaleString("en-IN")}</td><td class="gju-typing-leaderboard-name">${escapeHtml(safeName(row.name))}${ownRank && rank===ownRank ? " · You" : ""}</td><td>${fmt(row.netWpm,1)} WPM</td><td>${fmt(row.accuracy,1)}%</td></tr>`; }).join("")}</tbody></table></div>`;
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[char]));
  }

  async function openLeaderboard(cohort, sourceButton) {
    if (!cohort) return;
    activeCohort = cohort;
    lastFocused = sourceButton || document.activeElement;
    const backdrop = ensureModal();
    const title = document.getElementById("gjuTypingLeaderboardTitle");
    const sub = document.getElementById("gjuTypingLeaderboardSub");
    const body = document.getElementById("gjuTypingLeaderboardBody");
    if (title) title.textContent = `Passage ${cohort.passageNumber} leaderboard`;
    if (sub) sub.textContent = `${cohort.language === "hindi" ? "Hindi" : "English"} · ${cohort.difficulty.charAt(0).toUpperCase()+cohort.difficulty.slice(1)} · ${Math.round(cohort.durationSeconds/60)} min · Best eligible attempt only`;
    if (body) body.innerHTML = `<div class="gju-typing-leaderboard-empty">Loading leaderboard…</div>`;
    backdrop.hidden = false;
    document.body.style.overflow = "hidden";
    backdrop.querySelector(".gju-typing-leaderboard-close")?.focus();
    try {
      const [leaderboardData, ownStats] = await Promise.all([fetchLeaderboard(cohort), authResolved ? fetchOwnStats(cohort) : Promise.resolve(null)]);
      if (activeCohort?.passageId !== cohort.passageId) return;
      const summary = leaderboardData.cohort || {};
      const note = ownStats?.rank
        ? `Your position is always shown above, even when your rank is outside the Top 20. Rankings use each candidate’s best eligible full-duration attempt.`
        : authUser ? `Complete the full-duration passage to receive a rank. Rankings use each candidate’s best eligible attempt.` : `Top 20 for this exact passage. Login and complete the full-duration passage to receive your own rank.`;
      if (body) body.innerHTML = `${ownHtml(ownStats,summary)}<p class="gju-typing-leaderboard-note">${note}</p>${tableHtml(leaderboardData.leaderboard || [], Number(ownStats?.rank)||0)}`;
    } catch (error) {
      if (body) body.innerHTML = `<div class="gju-typing-leaderboard-empty">Leaderboard is temporarily unavailable. Please try again.</div>`;
    }
  }

  function bindPassageCards() {
    document.querySelectorAll(".gju-typing-passage-card").forEach(card => {
      if (card.querySelector(".gju-typing-leaderboard-open")) return;
      const link = card.querySelector('a[href*="app.html?preset="]');
      const cohort = link ? cohortFromUrl(link.getAttribute("href")) : null;
      if (!cohort) return;
      const foot = card.querySelector(".gju-typing-card-foot") || card;
      const button = document.createElement("button");
      button.type = "button";
      button.className = "gju-typing-leaderboard-open";
      button.innerHTML = `<span aria-hidden="true">🏆</span> Leaderboard`;
      button.addEventListener("click", () => openLeaderboard(cohort, button));
      foot.appendChild(button);
    });
  }

  function bindAttemptPage() {
    const competitionCard = document.getElementById("typingCompetitionCard");
    if (!competitionCard || competitionCard.querySelector(".gju-typing-leaderboard-open")) return;
    const cohort = cohortFromUrl(window.location.href);
    if (!cohort) return;
    const button = document.createElement("button");
    button.type = "button";
    button.className = "gju-typing-leaderboard-open";
    button.innerHTML = `<span aria-hidden="true">🏆</span> View passage leaderboard`;
    button.addEventListener("click", () => openLeaderboard(cohort, button));
    competitionCard.appendChild(button);
  }

  async function initAuth() {
    const config = window.GJU_FIREBASE_CONFIG;
    if (!config?.apiKey) { authResolved = true; return; }
    try {
      const [appMod,authMod] = await Promise.all([import(FIREBASE_APP),import(FIREBASE_AUTH)]);
      const firebaseApp = appMod.getApps().length ? appMod.getApps()[0] : appMod.initializeApp(config);
      const auth = authMod.getAuth(firebaseApp);
      authMod.onAuthStateChanged(auth,user=>{authUser=user&&user.emailVerified?user:null;authResolved=true;},()=>{authUser=null;authResolved=true;});
    } catch (error) { authResolved = true; authUser = null; }
  }

  function bindUi() { bindPassageCards(); bindAttemptPage(); }
  const observer = new MutationObserver(() => bindUi());
  function init() { injectStyles(); bindUi(); observer.observe(document.body,{childList:true,subtree:true}); initAuth(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded",init,{once:true}); else init();
})();