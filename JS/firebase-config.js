window.GJU_FIREBASE_CONFIG = {
  apiKey: "AIzaSyDpVgW620QlBTbNb7OA5xcynUvOmUKLJaM",
  authDomain: "govjobupdates-99a58.firebaseapp.com",
  databaseURL: "https://govjobupdates-99a58-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "govjobupdates-99a58",
  storageBucket: "govjobupdates-99a58.firebasestorage.app",
  messagingSenderId: "559770269410",
  appId: "1:559770269410:web:529323925e9f17816d50bb",
  measurementId: "G-XGXW3B2BN8"
};

(function installQuizAttemptAuthGate() {
  "use strict";

  if (!/(^|\/)quiz-attempt\.html$/i.test(window.location.pathname)) return;

  const SESSION_KEY = "gju:candidate-session";
  const AUTH_TIMEOUT_MS = 3000;
  const FAMILY_PAGES = {
    banking: "banking-quizzes.html",
    ssc: "ssc-quizzes.html",
    police: "police-quizzes.html",
    rrb: "rrb-quizzes.html"
  };

  let modal = null;
  let lastFocused = null;
  let authCheckPromise = null;
  let gateBusy = false;

  function hasCandidateSession() {
    try {
      const raw = localStorage.getItem(SESSION_KEY) || sessionStorage.getItem(SESSION_KEY) || "null";
      const saved = JSON.parse(raw);
      return Boolean(saved && saved.userId);
    } catch (_error) {
      return false;
    }
  }

  function withTimeout(promise, timeoutMs) {
    return Promise.race([
      promise,
      new Promise((resolve) => window.setTimeout(function () { resolve(null); }, timeoutMs))
    ]);
  }

  async function getAuthenticatedUser() {
    if (hasCandidateSession()) return { source: "candidate-session" };
    if (authCheckPromise) return authCheckPromise;

    authCheckPromise = (async function () {
      try {
        const [{ initializeApp, getApps }, { getAuth, onAuthStateChanged }] = await Promise.all([
          import("https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js"),
          import("https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js")
        ]);
        const app = getApps().length ? getApps()[0] : initializeApp(window.GJU_FIREBASE_CONFIG);
        const auth = getAuth(app);
        if (auth.currentUser) return auth.currentUser;

        return await withTimeout(new Promise((resolve) => {
          let finished = false;
          let unsubscribe = function () {};
          const finish = function (user) {
            if (finished) return;
            finished = true;
            unsubscribe();
            resolve(user || null);
          };
          unsubscribe = onAuthStateChanged(auth, finish, function () { finish(null); });
        }), AUTH_TIMEOUT_MS);
      } catch (error) {
        console.warn("[GJU Quiz Auth Gate] Auth check failed:", error);
        return null;
      } finally {
        authCheckPromise = null;
      }
    })();

    return authCheckPromise;
  }

  function getCurrentAttemptRedirect() {
    const file = window.location.pathname.split("/").filter(Boolean).pop() || "quiz-attempt.html";
    return file + window.location.search + window.location.hash;
  }

  function getBackUrl() {
    const family = String(new URLSearchParams(window.location.search).get("family") || "").trim().toLowerCase();
    return FAMILY_PAGES[family] || "quiz.html";
  }

  function getLoginUrl() {
    return "login.html?redirect=" + encodeURIComponent(getCurrentAttemptRedirect());
  }

  function injectStyles() {
    if (document.getElementById("gjuQuizAuthGateStyles")) return;
    const style = document.createElement("style");
    style.id = "gjuQuizAuthGateStyles";
    style.textContent = `
      .gju-auth-gate{position:fixed;inset:0;z-index:300000;display:flex;align-items:center;justify-content:center;padding:20px;background:rgba(11,26,48,.76);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px)}
      .gju-auth-gate[hidden]{display:none!important}
      .gju-auth-gate-card{width:min(100%,460px);max-height:calc(100dvh - 32px);overflow:auto;background:#fff;border:1px solid #dbe5f3;border-radius:22px;box-shadow:0 28px 80px rgba(2,12,27,.3);padding:28px;color:#14213a;text-align:left}
      .gju-auth-gate-icon{width:54px;height:54px;border-radius:16px;display:grid;place-items:center;background:#eaf2ff;color:#1557d6;font-size:24px;margin-bottom:18px}
      .gju-auth-gate-kicker{display:inline-flex;align-items:center;gap:7px;margin:0 0 8px;color:#166534;font-size:12px;font-weight:800;letter-spacing:.05em;text-transform:uppercase}
      .gju-auth-gate-kicker:before{content:"";width:7px;height:7px;border-radius:50%;background:#22c55e}
      .gju-auth-gate-card h2{margin:0 0 9px;font-size:25px;line-height:1.22;color:#14213a}
      .gju-auth-gate-card>p{margin:0;color:#5d6b82;line-height:1.55;font-size:15px}
      .gju-auth-gate-benefits{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin:20px 0 16px}
      .gju-auth-gate-benefit{min-width:0;padding:12px 8px;border:1px solid #e1e8f2;border-radius:13px;background:#f8fafc;text-align:center;color:#334155;font-size:12px;font-weight:700}
      .gju-auth-gate-benefit i{display:block;color:#1557d6;font-size:17px;margin-bottom:6px}
      .gju-auth-gate-trust{display:flex;align-items:center;justify-content:center;gap:6px;flex-wrap:wrap;margin:0 0 19px;padding:10px 12px;border-radius:12px;background:#f0fdf4;color:#166534;font-size:12px;font-weight:800;text-align:center}
      .gju-auth-gate-actions{display:grid;gap:9px}
      .gju-auth-gate-btn{min-height:48px;border-radius:12px;border:1px solid transparent;padding:11px 16px;font:inherit;font-weight:800;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:9px;text-decoration:none}
      .gju-auth-gate-primary{background:#1557d6;color:#fff;box-shadow:0 8px 22px rgba(21,87,214,.23)}
      .gju-auth-gate-primary:hover,.gju-auth-gate-primary:focus-visible{background:#0f49bc;color:#fff}
      .gju-auth-gate-secondary{background:#fff;border-color:#d6dfec;color:#42526b}
      .gju-auth-gate-secondary:hover,.gju-auth-gate-secondary:focus-visible{background:#f8fafc;color:#24364f}
      .gju-auth-gate-note{margin-top:13px!important;text-align:center;color:#7a8799!important;font-size:12px!important}
      body.gju-auth-gate-open{overflow:hidden!important}
      @media(max-width:520px){.gju-auth-gate{padding:14px}.gju-auth-gate-card{padding:23px 18px;border-radius:18px}.gju-auth-gate-card h2{font-size:22px}.gju-auth-gate-benefits{grid-template-columns:1fr;margin-top:17px}.gju-auth-gate-benefit{display:flex;align-items:center;gap:9px;text-align:left;padding:10px 12px}.gju-auth-gate-benefit i{display:inline-block;margin:0}.gju-auth-gate-btn{width:100%}}
    `;
    document.head.appendChild(style);
  }

  function ensureModal() {
    if (modal && document.body.contains(modal)) return modal;
    injectStyles();
    modal = document.createElement("div");
    modal.className = "gju-auth-gate";
    modal.id = "gjuQuizAuthGate";
    modal.hidden = true;
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-labelledby", "gjuQuizAuthGateTitle");
    modal.innerHTML = `
      <article class="gju-auth-gate-card">
        <div class="gju-auth-gate-icon" aria-hidden="true"><i class="fas fa-lock-open"></i></div>
        <span class="gju-auth-gate-kicker">Free Practice</span>
        <h2 id="gjuQuizAuthGateTitle">Sign in to start your free quiz</h2>
        <p>Login helps us securely save your score, rank and quiz progress so your performance stays available across attempts.</p>
        <div class="gju-auth-gate-benefits" aria-label="Benefits of signing in">
          <div class="gju-auth-gate-benefit"><i class="fas fa-ranking-star" aria-hidden="true"></i><span>Score &amp; Rank</span></div>
          <div class="gju-auth-gate-benefit"><i class="fas fa-trophy" aria-hidden="true"></i><span>Best Score</span></div>
          <div class="gju-auth-gate-benefit"><i class="fas fa-chart-line" aria-hidden="true"></i><span>Quiz Progress</span></div>
        </div>
        <div class="gju-auth-gate-trust"><i class="fas fa-circle-check" aria-hidden="true"></i><span>100% Free • No Subscription • No Payment</span></div>
        <div class="gju-auth-gate-actions">
          <a class="gju-auth-gate-btn gju-auth-gate-primary" data-gju-auth-login href="${getLoginUrl()}"><i class="fas fa-right-to-bracket" aria-hidden="true"></i> Continue to Login</a>
          <button class="gju-auth-gate-btn gju-auth-gate-secondary" type="button" data-gju-auth-back><i class="fas fa-arrow-left" aria-hidden="true"></i> Back to Quizzes</button>
        </div>
        <p class="gju-auth-gate-note">New here? You can create your free account on the next screen.</p>
      </article>
    `;
    document.body.appendChild(modal);
    modal.querySelector("[data-gju-auth-back]").addEventListener("click", function () {
      window.location.href = getBackUrl();
    });
    return modal;
  }

  function showModal() {
    const node = ensureModal();
    lastFocused = document.activeElement;
    const login = node.querySelector("[data-gju-auth-login]");
    if (login) login.href = getLoginUrl();
    node.hidden = false;
    document.body.classList.add("gju-auth-gate-open");
    window.requestAnimationFrame(function () { login && login.focus(); });
  }

  function hideModal() {
    if (!modal) return;
    modal.hidden = true;
    document.body.classList.remove("gju-auth-gate-open");
    if (lastFocused && typeof lastFocused.focus === "function") lastFocused.focus();
  }

  document.addEventListener("keydown", function (event) {
    if (event.key !== "Escape" || !modal || modal.hidden) return;
    event.preventDefault();
    window.location.href = getBackUrl();
  }, true);

  document.addEventListener("click", async function (event) {
    const startButton = event.target && event.target.closest ? event.target.closest("[data-start-quiz]") : null;
    if (!startButton) return;

    if (startButton.dataset.gjuAuthGateBypass === "1") {
      delete startButton.dataset.gjuAuthGateBypass;
      return;
    }

    if (hasCandidateSession()) return;

    event.preventDefault();
    event.stopImmediatePropagation();
    if (gateBusy) return;
    gateBusy = true;
    startButton.setAttribute("aria-busy", "true");

    try {
      const user = await getAuthenticatedUser();
      if (user) {
        hideModal();
        startButton.dataset.gjuAuthGateBypass = "1";
        startButton.click();
        return;
      }
      showModal();
    } finally {
      gateBusy = false;
      startButton.removeAttribute("aria-busy");
    }
  }, true);
})();