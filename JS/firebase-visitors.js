import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  update,
  onValue,
  onDisconnect,
  serverTimestamp,
  increment
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";

(function () {
  "use strict";

  const config = window.GJU_FIREBASE_CONFIG;

  if (!config || !config.apiKey || !config.databaseURL) {
    console.warn("[GovJobUpdates] Firebase visitor config is missing.");
    return;
  }

  const VISITOR_ID_KEY = "gju:firebase-visitor-id";
  const UNIQUE_COUNTED_KEY = "gju:firebase-unique-counted-v1";
  const SESSION_ID_KEY = "gju:firebase-session-id";
  const DAILY_COUNTED_PREFIX = "gju:firebase-daily-counted:";
  const INDIA_TIME_ZONE = "Asia/Kolkata";

  const app = initializeApp(config);
  const db = getDatabase(app);

  const visitorId = getOrCreateVisitorId();
  const sessionId = getOrCreateSessionId();
  const todayKey = getIndiaDateKey();

  const paths = {
    siteStats: "siteStats",
    dailyStats: `dailyStats/${todayKey}`,
    visitorIndex: `visitorIndex/${visitorId}`,
    presence: `presence/${visitorId}/${sessionId}`
  };

  const statsState = {
    liveVisitors: "--",
    totalUniqueVisitors: "--",
    totalPageViews: "--",
    todayUniqueVisitors: "--",
    todayPageViews: "--",
    state: "loading"
  };

  startVisitorSystem();

  function startVisitorSystem() {
    ensureVisitorWidget();
    trackPageView();
    trackUniqueVisitor();
    trackDailyUniqueVisitor();
    startPresence();
    listenForStats();
    listenForLiveVisitors();
  }

  function getOrCreateVisitorId() {
    try {
      const saved = localStorage.getItem(VISITOR_ID_KEY);
      if (saved) return saved;

      const nextId = createSafeId("v");
      localStorage.setItem(VISITOR_ID_KEY, nextId);
      return nextId;
    } catch {
      return createSafeId("v");
    }
  }

  function getOrCreateSessionId() {
    try {
      const saved = sessionStorage.getItem(SESSION_ID_KEY);
      if (saved) return saved;

      const nextId = createSafeId("s");
      sessionStorage.setItem(SESSION_ID_KEY, nextId);
      return nextId;
    } catch {
      return createSafeId("s");
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

  function getIndiaDateKey() {
    try {
      const formatter = new Intl.DateTimeFormat("en-CA", {
        timeZone: INDIA_TIME_ZONE,
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
      });

      return formatter.format(new Date());
    } catch {
      return new Date().toISOString().slice(0, 10);
    }
  }

  function getCurrentPagePath() {
    return `${window.location.pathname || "/"}${window.location.search || ""}`.slice(0, 240);
  }

  function getSafeReferrer() {
    return String(document.referrer || "").slice(0, 240);
  }

  function getSafeUserAgent() {
    return String(navigator.userAgent || "").slice(0, 360);
  }

  function trackPageView() {
    const updates = {};

    updates[`${paths.siteStats}/totalPageViews`] = increment(1);
    updates[`${paths.siteStats}/lastUpdated`] = serverTimestamp();

    updates[`${paths.dailyStats}/totalPageViews`] = increment(1);
    updates[`${paths.dailyStats}/lastUpdated`] = serverTimestamp();

    update(ref(db), updates).catch((error) => {
      console.warn("[GovJobUpdates] Page view update failed:", error.message);
    });
  }

  function trackUniqueVisitor() {
    let alreadyCounted = false;

    try {
      alreadyCounted = localStorage.getItem(UNIQUE_COUNTED_KEY) === "1";
    } catch {
      alreadyCounted = false;
    }

    if (alreadyCounted) {
      updateExistingVisitorLastSeen();
      return;
    }

    const visitorData = {
      firstSeen: serverTimestamp(),
      lastSeen: serverTimestamp(),
      firstPage: getCurrentPagePath(),
      referrer: getSafeReferrer(),
      userAgent: getSafeUserAgent()
    };

    set(ref(db, paths.visitorIndex), visitorData)
      .then(() => {
        const updates = {};

        updates[`${paths.siteStats}/totalUniqueVisitors`] = increment(1);
        updates[`${paths.siteStats}/lastUpdated`] = serverTimestamp();

        try {
          localStorage.setItem(UNIQUE_COUNTED_KEY, "1");
        } catch {
          // Ignore localStorage issues.
        }

        return update(ref(db), updates);
      })
      .catch((error) => {
        console.warn("[GovJobUpdates] Unique visitor already counted or blocked:", error.message);
        updateExistingVisitorLastSeen();
      });
  }

  function updateExistingVisitorLastSeen() {
    const updates = {};

    updates[`${paths.visitorIndex}/lastSeen`] = serverTimestamp();
    updates[`${paths.visitorIndex}/lastPage`] = getCurrentPagePath();

    update(ref(db), updates).catch(() => {
      // Ignore visitor index update failure.
    });
  }

  function trackDailyUniqueVisitor() {
    const dailyKey = `${DAILY_COUNTED_PREFIX}${todayKey}`;

    let alreadyCountedToday = false;

    try {
      alreadyCountedToday = localStorage.getItem(dailyKey) === "1";
    } catch {
      alreadyCountedToday = false;
    }

    if (alreadyCountedToday) return;

    const updates = {};

    updates[`${paths.dailyStats}/uniqueVisitors`] = increment(1);
    updates[`${paths.dailyStats}/lastUpdated`] = serverTimestamp();

    update(ref(db), updates)
      .then(() => {
        try {
          localStorage.setItem(dailyKey, "1");
        } catch {
          // Ignore localStorage issues.
        }
      })
      .catch((error) => {
        console.warn("[GovJobUpdates] Daily unique visitor update failed:", error.message);
      });
  }

  function startPresence() {
    const connectedRef = ref(db, ".info/connected");

    onValue(connectedRef, (snapshot) => {
      if (snapshot.val() !== true) return;

      const myPresenceRef = ref(db, paths.presence);

      onDisconnect(myPresenceRef).remove();

      set(myPresenceRef, {
        online: true,
        connectedAt: serverTimestamp(),
        page: getCurrentPagePath()
      }).catch((error) => {
        console.warn("[GovJobUpdates] Presence write failed:", error.message);
      });
    });
  }

  function listenForStats() {
    onValue(
      ref(db, paths.siteStats),
      (snapshot) => {
        const stats = snapshot.val() || {};

        updateStatsUi({
          totalUniqueVisitors: Number(stats.totalUniqueVisitors || 0),
          totalPageViews: Number(stats.totalPageViews || 0),
          state: "ready"
        });
      },
      (error) => {
        console.warn("[GovJobUpdates] Site stats listener failed:", error.message);
      }
    );

    onValue(
      ref(db, paths.dailyStats),
      (snapshot) => {
        const stats = snapshot.val() || {};

        updateStatsUi({
          todayUniqueVisitors: Number(stats.uniqueVisitors || 0),
          todayPageViews: Number(stats.totalPageViews || 0),
          state: "ready"
        });
      },
      (error) => {
        console.warn("[GovJobUpdates] Daily stats listener failed:", error.message);
      }
    );
  }

  function listenForLiveVisitors() {
    onValue(
      ref(db, "presence"),
      (snapshot) => {
        const presence = snapshot.val() || {};

        const liveVisitorCount = Object.keys(presence).filter((visitorKey) => {
          const sessions = presence[visitorKey];
          return sessions && typeof sessions === "object" && Object.keys(sessions).length > 0;
        }).length;

        updateStatsUi({
          liveVisitors: liveVisitorCount,
          state: "ready"
        });
      },
      (error) => {
        console.warn("[GovJobUpdates] Live visitor listener failed:", error.message);

        updateStatsUi({
          liveVisitors: "--",
          state: "offline"
        });
      }
    );
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
        </div>
      `;

      const copyright = footer.querySelector(".copyright");

      if (copyright) {
        footer.insertBefore(widget, copyright);
      } else {
        footer.appendChild(widget);
      }
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

    if (value === "--") {
      node.textContent = "--";
      return;
    }

    node.textContent = formatNumber(value);
  }

  function formatNumber(value) {
    const number = Number(value || 0);

    try {
      return new Intl.NumberFormat("en-IN").format(number);
    } catch {
      return String(number);
    }
  }
}());
