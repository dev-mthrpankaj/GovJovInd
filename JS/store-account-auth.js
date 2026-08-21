import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

const config = window.GJU_FIREBASE_CONFIG || null;
let auth = null;
let currentUser = null;
let readyResolve;
const readyPromise = new Promise((resolve) => { readyResolve = resolve; });

function headerHref(pageName) {
  const path = window.location.pathname.replace(/\\/g, "/");
  if (/\/HTML\/[^/]+\.html$/i.test(path)) return pageName;
  if (/\/(?:Job_Details|AdmitCard_Details|Result_Details|AnswerKey_Details)\/HTML\/[^/]+\.html$/i.test(path)) return `../../HTML/${pageName}`;
  return `HTML/${pageName}`;
}

function syncHeader(user) {
  const link = document.querySelector("[data-auth-entry], .header-login-btn");
  if (!link) return;
  const label = link.querySelector("span") || link;
  if (user) {
    link.href = link.dataset.dashboardHref || headerHref("dashboard.html");
    link.classList.add("is-active");
    link.setAttribute("aria-label", "Open candidate dashboard");
    label.textContent = "Dashboard";
  } else {
    link.href = link.dataset.loginHref || headerHref("login.html");
    link.classList.remove("is-active");
    link.setAttribute("aria-label", "Login to candidate dashboard");
    label.textContent = "Login";
  }
}

if (!config?.apiKey) {
  console.warn("[GovJobUpdates Store] Firebase configuration is unavailable.");
  readyResolve(null);
} else {
  const app = getApps().length ? getApps()[0] : initializeApp(config);
  auth = getAuth(app);
  onAuthStateChanged(auth, (user) => {
    currentUser = user || null;
    syncHeader(currentUser);
    readyResolve(currentUser);
    window.dispatchEvent(new CustomEvent("gju-store-auth-state", { detail: { user: currentUser } }));
  });
}

export async function whenStoreAuthReady() {
  return readyPromise;
}

export async function getStoreUser() {
  await readyPromise;
  return currentUser;
}

export async function getStoreIdToken(forceRefresh = false) {
  const user = await getStoreUser();
  if (!user) return "";
  try {
    return await user.getIdToken(Boolean(forceRefresh));
  } catch {
    return "";
  }
}

export async function storeAuthHeaders(forceRefresh = false) {
  const token = await getStoreIdToken(forceRefresh);
  return token ? { Authorization: `Bearer ${token}`, "X-Firebase-Id-Token": token } : {};
}
