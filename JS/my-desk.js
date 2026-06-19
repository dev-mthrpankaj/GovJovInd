import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

(function () {
  "use strict";

  const isApp = /GovJobUpdatesApp/i.test(navigator.userAgent || "");
  const config = window.GJU_FIREBASE_CONFIG;
  const nodes = {
    loading: document.getElementById("myDeskLoading"),
    appOnly: document.getElementById("myDeskAppOnly"),
    loginRequired: document.getElementById("myDeskLoginRequired"),
    dashboard: document.getElementById("myDeskDashboard"),
    userName: document.getElementById("myDeskUserName"),
    userEmail: document.getElementById("myDeskUserEmail")
  };

  function show(viewName) {
    Object.entries({
      loading: nodes.loading,
      appOnly: nodes.appOnly,
      loginRequired: nodes.loginRequired,
      dashboard: nodes.dashboard
    }).forEach(([name, node]) => {
      if (node) node.hidden = name !== viewName;
    });
  }

  function markReady() {
    document.body.classList.remove("gju-auth-pending");
    document.body.classList.add("gju-auth-ready");
  }

  function userDisplayName(user) {
    return user?.displayName || user?.email?.split("@")[0] || "GovJobUpdates User";
  }

  function renderUser(user) {
    if (nodes.userName) nodes.userName.textContent = userDisplayName(user);
    if (nodes.userEmail) nodes.userEmail.textContent = user?.email || "Account active";
  }

  function initAuthGate() {
    if (!config || !config.apiKey) {
      show("loginRequired");
      markReady();
      return;
    }

    try {
      const app = getApps().length ? getApps()[0] : initializeApp(config);
      const auth = getAuth(app);
      onAuthStateChanged(auth, (user) => {
        markReady();
        if (!user) {
          show("loginRequired");
          return;
        }
        renderUser(user);
        show("dashboard");
      });
    } catch (error) {
      console.warn("[GovJobUpdates] My Desk auth check failed:", error.message);
      show("loginRequired");
      markReady();
    }
  }

  if (!nodes.loading) return;

  if (!isApp) {
    show("appOnly");
    markReady();
    return;
  }

  show("loading");
  initAuthGate();
})();
