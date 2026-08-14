import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAnalytics, logEvent } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-analytics.js";

(function(){
  "use strict";
  const config = window.GJU_FIREBASE_CONFIG;
  const queuedEvents = [];
  let analyticsStarted = false;
  let analyticsInstance = null;
  let engagementStartedAt = Date.now();
  let lastEngagementSentAt = 0;

  function normalizeEventName(name) {
    return String(name || "site_event")
      .toLowerCase()
      .replace(/[^a-z0-9_]+/g, "_")
      .replace(/^_+|_+$/g, "")
      .slice(0, 40) || "site_event";
  }

  function normalizeEventParams(params) {
    const output = {};
    Object.entries(params || {}).forEach(([key, value]) => {
      const safeKey = String(key || "")
        .replace(/[^A-Za-z0-9_]+/g, "_")
        .replace(/^_+|_+$/g, "")
        .slice(0, 40);
      if (!safeKey || value === undefined || value === null) return;
      if (typeof value === "number") {
        output[safeKey] = value;
        return;
      }
      if (typeof value === "boolean") {
        output[safeKey] = value ? 1 : 0;
        return;
      }
      output[safeKey] = String(value).slice(0, 100);
    });
    return output;
  }

  function track(name, params = {}) {
    const eventName = normalizeEventName(name);
    const eventParams = normalizeEventParams({
      page_path: window.location.pathname,
      page_title: document.title,
      ...params
    });

    if (!analyticsInstance) {
      queuedEvents.push([eventName, eventParams]);
      return;
    }

    try {
      logEvent(analyticsInstance, eventName, eventParams);
    } catch (error) {
      console.warn("[GovJobUpdates] Analytics event failed.", error);
    }
  }

  window.GJU_ANALYTICS = {
    track
  };

  if(!config || !config.measurementId){ 
    console.warn("[GovJobUpdates] Analytics configuration or Measurement ID missing."); 
    return; 
  }

  function scheduleWhenIdle(callback) {
    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(callback, { timeout: 5000 });
      return;
    }

    window.setTimeout(callback, 2000);
  }

  function startAnalytics() {
    if (analyticsStarted) return;
    analyticsStarted = true;

    // Pehle se chal rahe firebase instance ko check karega, nahi toh naya banayega
    const app = getApps().length ? getApps()[0] : initializeApp(config);

    // YEH LINE GOOGLE ANALYTICS KO START KAREGI
    analyticsInstance = getAnalytics(app);
    track("page_monitor_ready", {
      referrer_host: document.referrer ? new URL(document.referrer).hostname : "",
      screen_width: window.screen?.width || 0,
      screen_height: window.screen?.height || 0
    });

    while (queuedEvents.length) {
      const [eventName, eventParams] = queuedEvents.shift();
      try {
        logEvent(analyticsInstance, eventName, eventParams);
      } catch (error) {
        console.warn("[GovJobUpdates] Queued analytics event failed.", error);
      }
    }

    console.log("[GovJobUpdates] Google Analytics activated successfully.");
  }

  function sendEngagement(reason) {
    const now = Date.now();
    const seconds = Math.round((now - engagementStartedAt) / 1000);
    if (seconds < 10 || now - lastEngagementSentAt < 10000) return;
    lastEngagementSentAt = now;
    track("page_engagement_seconds", {
      engagement_seconds: seconds,
      reason
    });
  }

  window.addEventListener("pagehide", () => sendEngagement("pagehide"));
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") sendEngagement("hidden");
    if (document.visibilityState === "visible") engagementStartedAt = Date.now();
  });
  window.setInterval(() => sendEngagement("heartbeat"), 30000);

  document.addEventListener("click", (event) => {
    const actionTarget = event.target.closest("a[href], button");
    if (!actionTarget) return;

    if (actionTarget.matches("a[href]")) {
      const href = actionTarget.getAttribute("href") || "";
      const text = (actionTarget.textContent || actionTarget.getAttribute("aria-label") || "").trim().slice(0, 80);
      if (/official|notification|apply|download|result|admit|answer|login|telegram|whatsapp|youtube|instagram|linkedin|x\.com/i.test(`${href} ${text}`)) {
        track("important_link_click", {
          link_text: text,
          link_url: href.slice(0, 100),
          outbound: /^https?:\/\//i.test(href) && !/govjobupdates\.com/i.test(href)
        });
      }
      return;
    }

    const id = actionTarget.id || "";
    const text = (actionTarget.textContent || actionTarget.getAttribute("aria-label") || "").trim().slice(0, 80);
    if (/submit|download|resize|compress|merge|extract|start|login|comment|like|dislike/i.test(`${id} ${text}`)) {
      track("important_button_click", {
        button_id: id,
        button_text: text
      });
    }
  }, { capture: true });

  if (document.readyState === "complete") {
    scheduleWhenIdle(startAnalytics);
  } else {
    window.addEventListener("load", () => scheduleWhenIdle(startAnalytics), { once: true });
  }
}());
