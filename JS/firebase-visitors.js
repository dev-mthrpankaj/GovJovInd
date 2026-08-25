(function () {
  "use strict";

  const API_BASE = "https://test.govjobupdates.com/live-test/visitor-api";
  // Keep the legacy key so existing browsers retain the same anonymous visitor ID.
  const VISITOR_ID_KEY = "gju:firebase-visitor-id";
  const HEARTBEAT_MS = 60000;
  const STATS_REFRESH_MS = 60000;

  let visitorId = "";
  let heartbeatTimer = null;
  let statsTimer = null;
  let started = false;

  const statsState = {
    liveVisitors: "--",
    totalUniqueVisitors: "--",
    totalPageViews: "--",
    todayUniqueVisitors: "--",
    todayPageViews: "--",
    state: "loading"
  };

  scheduleWhenIdle(start);

  function scheduleWhenIdle(callback) {
    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(callback, { timeout: 4000 });
    } else {
      window.setTimeout(callback, 1500);
    }
  }

  function start() {
    if (started) return;
    started = true;
    visitorId = getOrCreateVisitorId();
    ensureVisitorWidget();
    trackPageView();
    refreshStats();
    startHeartbeat();
    startStatsRefresh();

    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") {
        sendHeartbeat();
        refreshStats();
      }
    });
  }

  function getOrCreateVisitorId() {
    try {
      const saved = localStorage.getItem(VISITOR_ID_KEY);
      if (saved && /^[A-Za-z0-9_-]{16,80}$/.test(saved)) return saved;
      const next = createSafeId("v");
      localStorage.setItem(VISITOR_ID_KEY, next);
      return next;
    } catch {
      return createSafeId("v");
    }
  }

  function createSafeId(prefix) {
    const timePart = Date.now().toString(36);
    let randomPart = "";
    try {
      const bytes = new Uint32Array(2);
      crypto.getRandomValues(bytes);
      randomPart = `${bytes[0].toString(36)}${bytes[1].toString(36)}`;
    } catch {
      randomPart = Math.random().toString(36).slice(2, 14);
    }
    return `${prefix}_${timePart}_${randomPart}`.replace(/[^a-zA-Z0-9_-]/g, "");
  }

  function currentPage() {
    return `${window.location.pathname || "/"}${window.location.search || ""}`.slice(0, 500);
  }

  async function api(path, options = {}) {
    const response = await fetch(`${API_BASE}/${path}`, {
      mode: "cors",
      credentials: "omit",
      cache: "no-store",
      ...options,
      headers: {
        Accept: "application/json",
        ...(options.body ? { "Content-Type": "application/json" } : {}),
        ...(options.headers || {})
      }
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
  }

  async function trackPageView() {
    try {
      await api("track.php", {
        method: "POST",
        body: JSON.stringify({
          visitorId,
          page: currentPage(),
          title: String(document.title || "").slice(0, 255),
          referrer: String(document.referrer || "").slice(0, 500)
        })
      });
      refreshStats();
    } catch (error) {
      console.warn("[GovJobUpdates] Visitor tracking unavailable:", error.message);
    }
  }

  function startHeartbeat() {
    sendHeartbeat();
    heartbeatTimer = window.setInterval(() => {
      if (document.visibilityState === "visible") sendHeartbeat();
    }, HEARTBEAT_MS);
  }

  async function sendHeartbeat() {
    if (!visitorId || document.visibilityState !== "visible") return;
    try {
      await api("heartbeat.php", {
        method: "POST",
        body: JSON.stringify({ visitorId, page: currentPage() })
      });
    } catch {
      // Presence is best-effort and must never interfere with page use.
    }
  }

  function startStatsRefresh() {
    statsTimer = window.setInterval(() => {
      if (document.visibilityState === "visible") refreshStats();
    }, STATS_REFRESH_MS);
  }

  async function refreshStats() {
    try {
      const data = await api("stats.php");
      if (!data || data.success !== true) throw new Error("Invalid stats response");
      updateStatsUi({
        liveVisitors: Number(data.liveVisitors || 0),
        totalUniqueVisitors: Number(data.totalVisitors || 0),
        totalPageViews: Number(data.totalPageViews || 0),
        todayUniqueVisitors: Number(data.todayVisitors || 0),
        todayPageViews: Number(data.todayPageViews || 0),
        state: "ready"
      });
    } catch (error) {
      console.warn("[GovJobUpdates] Visitor stats unavailable:", error.message);
      updateStatsUi({ state: "offline" });
    }
  }

  function ensureVisitorWidget() {
    const footer = document.querySelector("footer");
    if (!footer) return null;
    let widget = footer.querySelector(".footer-live-visitors");
    if (!widget) {
      widget = document.createElement("div");
      widget.className = "footer-live-visitors";
      widget.setAttribute("aria-live", "polite");
      widget.innerHTML = `
        <div class="footer-live-pill footer-live-pill-expanded">
          <div class="footer-visitor-metric footer-visitor-live">
            <span class="footer-live-dot" aria-hidden="true"></span>
            <span class="footer-live-label">Live</span>
            <strong data-firebase-live-visitors>--</strong>
            <span class="footer-live-caption">online now</span>
          </div>
          <div class="footer-visitor-metric">
            <span class="footer-live-label">Visitors</span>
            <strong data-firebase-total-visitors>--</strong>
          </div>
          <div class="footer-visitor-metric">
            <span class="footer-live-label">Visits</span>
            <strong data-firebase-total-visits>--</strong>
          </div>
          <div class="footer-visitor-metric footer-visitor-today">
            <span class="footer-live-label">Today</span>
            <strong data-firebase-today-visitors>--</strong>
          </div>
        </div>`;
      const copyright = footer.querySelector(".copyright");
      if (copyright) footer.insertBefore(widget, copyright);
      else footer.appendChild(widget);
    }
    return widget;
  }

  function updateStatsUi(nextStats) {
    Object.assign(statsState, nextStats || {});
    const widget = ensureVisitorWidget();
    if (!widget) return;
    widget.dataset.visitorState = statsState.state || "ready";
    setMetric("[data-firebase-live-visitors]", statsState.liveVisitors);
    setMetric("[data-firebase-total-visitors]", statsState.totalUniqueVisitors);
    setMetric("[data-firebase-total-visits]", statsState.totalPageViews);
    setMetric("[data-firebase-today-visitors]", statsState.todayUniqueVisitors);
  }

  function setMetric(selector, value) {
    if (value === undefined || value === null) return;
    const node = document.querySelector(selector);
    if (!node) return;
    node.textContent = value === "--" ? "--" : formatNumber(value);
  }

  function formatNumber(value) {
    const number = Number(value || 0);
    try { return new Intl.NumberFormat("en-IN").format(number); }
    catch { return String(number); }
  }

  window.addEventListener("pagehide", () => {
    if (heartbeatTimer) window.clearInterval(heartbeatTimer);
    if (statsTimer) window.clearInterval(statsTimer);
  });
}());
