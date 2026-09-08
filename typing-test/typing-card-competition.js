(function () {
  "use strict";

  const API_BASE = "https://test.govjobupdates.com/live-test/typing-api/";
  const FIREBASE_APP = "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
  const FIREBASE_AUTH = "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
  const cache = new Map();
  let authUser = null;
  let authResolved = false;
  let renderQueued = false;

  function injectStyles() {
    if (document.getElementById("gjuTypingCardCompetitionStyles")) return;
    const style = document.createElement("style");
    style.id = "gjuTypingCardCompetitionStyles";
    style.textContent = `
      .gju-typing-card-standing{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:6px;margin:12px 0 0;padding-top:11px;border-top:1px solid #e5eaf2}
      .gju-typing-card-standing>span{min-width:0;padding:7px 5px;border:1px solid #e2e8f2;border-radius:9px;background:#f8faff;text-align:center}
      .gju-typing-card-standing small{display:block;color:#748096;font-size:9px;line-height:1.2;text-transform:uppercase;letter-spacing:.03em;white-space:nowrap}
      .gju-typing-card-standing strong{display:block;margin-top:3px;color:#172440;font-size:12px;line-height:1.2;font-variant-numeric:tabular-nums;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
      .gju-typing-card-standing.is-loading strong{color:#8994a7}
      .gju-typing-card-standing-note{grid-column:1/-1!important;padding:0!important;border:0!important;background:transparent!important;text-align:left!important;color:#748096;font-size:10px;line-height:1.35}
      @media(max-width:480px){.gju-typing-card-standing{grid-template-columns:repeat(2,minmax(0,1fr))}.gju-typing-card-standing small{font-size:9px}.gju-typing-card-standing strong{font-size:12px}}
    `;
    document.head.appendChild(style);
  }

  function metric(label, value) {
    return `<span><small>${label}</small><strong>${value}</strong></span>`;
  }

  function numberText(value) {
    return value == null || Number.isNaN(Number(value)) ? "—" : `${Number(value).toFixed(1)} WPM`;
  }

  function standingHtml(stats, state) {
    if (state === "loading") {
      return `${metric("Your Best", "…")}${metric("Rank", "…")}${metric("Average", "…")}${metric("Top Speed", "…")}`;
    }
    if (state === "login") {
      return `${metric("Your Best", "—")}${metric("Rank", "—")}${metric("Average", "—")}${metric("Top Speed", "—")}<span class="gju-typing-card-standing-note">Login to see your competitive standing.</span>`;
    }
    if (state === "error") {
      return `${metric("Your Best", "—")}${metric("Rank", "—")}${metric("Average", "—")}${metric("Top Speed", "—")}<span class="gju-typing-card-standing-note">Ranking is temporarily unavailable.</span>`;
    }
    return `${metric("Your Best", numberText(stats?.best?.netWpm))}${metric("Rank", stats?.rank ? `#${stats.rank}${stats.rankedUsers ? `/${stats.rankedUsers}` : ""}` : "—")}${metric("Average", numberText(stats?.communityAverage))}${metric("Top Speed", numberText(stats?.topSpeed))}`;
  }

  function parseCard(card) {
    const link = card.querySelector('a[href*="app.html?preset="]');
    if (!link) return null;
    let url;
    try { url = new URL(link.getAttribute("href"), window.location.href); } catch (error) { return null; }
    const presetKey = url.searchParams.get("preset") || "";
    const language = url.searchParams.get("language") || "english";
    const difficulty = url.searchParams.get("difficulty") || "medium";
    if (!presetKey) return null;
    const preset = window.GJU_TYPING_CONFIG?.getPreset ? window.GJU_TYPING_CONFIG.getPreset(presetKey) : null;
    const durationSeconds = Math.round((Number(preset?.duration) || durationFromPage(presetKey)) * 60);
    const key = [presetKey, language, difficulty, durationSeconds].join("|");
    return { presetKey, language, difficulty, durationSeconds, key };
  }

  function durationFromPage(presetKey) {
    const fixed = {
      "ssc-cgl-dest": 15,
      "delhi-police-hc-ministerial": 10,
      "upsssc-junior-assistant": 5,
      "up-police-computer-operator": 15,
      "up-clerical": 5,
      "ssc-stenographer": 40
    };
    return fixed[presetKey] || 10;
  }

  function ensureStanding(card) {
    let node = card.querySelector(".gju-typing-card-standing");
    if (node) return node;
    node = document.createElement("div");
    node.className = "gju-typing-card-standing is-loading";
    node.setAttribute("aria-label", "Competitive typing statistics");
    node.innerHTML = standingHtml(null, "loading");
    const head = card.querySelector(".gju-typing-passage-card-head") || card;
    head.appendChild(node);
    return node;
  }

  async function getToken(forceRefresh) {
    if (!authUser) return "";
    try { return await authUser.getIdToken(Boolean(forceRefresh)); } catch (error) { return ""; }
  }

  async function fetchStats(cohort) {
    if (cache.has(cohort.key)) return cache.get(cohort.key);
    const promise = (async () => {
      let token = await getToken(false);
      if (!token) return { state: "login", stats: null };
      const query = new URLSearchParams({
        preset_key: cohort.presetKey,
        language: cohort.language,
        difficulty: cohort.difficulty,
        duration_seconds: String(cohort.durationSeconds)
      });
      const request = async (bearer) => fetch(API_BASE + "stats.php?" + query.toString(), {
        method: "GET", mode: "cors", cache: "no-store",
        headers: { "Accept": "application/json", "Authorization": `Bearer ${bearer}` }
      });
      let response = await request(token);
      if (response.status === 401) {
        token = await getToken(true);
        if (token) response = await request(token);
      }
      const data = await response.json().catch(() => null);
      if (!response.ok || !data || data.success !== true) throw new Error(data?.message || "Ranking unavailable");
      return { state: "ready", stats: data.stats || null };
    })().catch(() => ({ state: "error", stats: null }));
    cache.set(cohort.key, promise);
    return promise;
  }

  async function renderCards() {
    renderQueued = false;
    const cards = Array.from(document.querySelectorAll(".gju-typing-passage-card"));
    if (!cards.length) return;
    injectStyles();
    const groups = new Map();
    cards.forEach((card) => {
      const cohort = parseCard(card);
      if (!cohort) return;
      const standing = ensureStanding(card);
      if (!groups.has(cohort.key)) groups.set(cohort.key, { cohort, nodes: [] });
      groups.get(cohort.key).nodes.push(standing);
    });

    if (!authResolved) return;
    for (const { cohort, nodes } of groups.values()) {
      if (!authUser) {
        nodes.forEach((node) => { node.classList.remove("is-loading"); node.innerHTML = standingHtml(null, "login"); });
        continue;
      }
      const result = await fetchStats(cohort);
      nodes.forEach((node) => {
        node.classList.remove("is-loading");
        node.innerHTML = standingHtml(result.stats, result.state);
      });
    }
  }

  function queueRender() {
    if (renderQueued) return;
    renderQueued = true;
    window.requestAnimationFrame(renderCards);
  }

  async function initAuth() {
    const config = window.GJU_FIREBASE_CONFIG;
    if (!config?.apiKey) {
      authResolved = true;
      queueRender();
      return;
    }
    try {
      const [appMod, authMod] = await Promise.all([import(FIREBASE_APP), import(FIREBASE_AUTH)]);
      const firebaseApp = appMod.getApps().length ? appMod.getApps()[0] : appMod.initializeApp(config);
      const auth = authMod.getAuth(firebaseApp);
      authMod.onAuthStateChanged(auth, (user) => {
        authResolved = true;
        authUser = user && user.emailVerified ? user : null;
        cache.clear();
        queueRender();
      }, () => {
        authResolved = true;
        authUser = null;
        queueRender();
      });
    } catch (error) {
      authResolved = true;
      authUser = null;
      queueRender();
    }
  }

  const observer = new MutationObserver((mutations) => {
    if (mutations.some((mutation) => Array.from(mutation.addedNodes || []).some((node) => node.nodeType === 1 && (node.matches?.(".gju-typing-passage-card") || node.querySelector?.(".gju-typing-passage-card"))))) queueRender();
  });

  function init() {
    observer.observe(document.body, { childList: true, subtree: true });
    queueRender();
    initAuth();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
})();