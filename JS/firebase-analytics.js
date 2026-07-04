import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-analytics.js";

(function(){
  "use strict";
  const config = window.GJU_FIREBASE_CONFIG;
  if(!config || !config.measurementId){ 
    console.warn("[GovJobUpdates] Analytics configuration or Measurement ID missing."); 
    return; 
  }

  let analyticsStarted = false;

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
    getAnalytics(app);

    console.log("[GovJobUpdates] Google Analytics activated successfully.");
  }

  if (document.readyState === "complete") {
    scheduleWhenIdle(startAnalytics);
  } else {
    window.addEventListener("load", () => scheduleWhenIdle(startAnalytics), { once: true });
  }
}());
