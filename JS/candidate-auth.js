(function () {
    "use strict";

    const SESSION_KEY = "gju:candidate-session";
    const LAST_ID_KEY = "gju:last-candidate-id";
    const PROCESSING_TEXT = "Processing...";

    function getConfig() {
        return window.RANK_PREDICTOR_CONFIG || {};
    }

    function getApiUrl() {
        return String(getConfig().apiUrl || "").trim();
    }

    function isValidApiUrl(apiUrl = getApiUrl()) {
        return Boolean(apiUrl && apiUrl.startsWith("https://") && apiUrl.endsWith("/exec") && !apiUrl.includes("/dev"));
    }

    function getSession() {
        try {
            const saved = JSON.parse(localStorage.getItem(SESSION_KEY) || sessionStorage.getItem(SESSION_KEY) || "null");
            return saved && saved.userId ? saved : null;
        } catch {
            return null;
        }
    }

    function saveSession(user, remember = true) {
        const session = {
            userId: String(user.userId || "").trim(),
            name: String(user.name || "").trim(),
            mobile: String(user.mobile || "").trim(),
            email: String(user.email || "").trim(),
            dob: String(user.dob || "").trim(),
            gender: String(user.gender || "").trim(),
            createdAt: user.createdAt || "",
            savedAt: new Date().toISOString()
        };
        const storage = remember ? localStorage : sessionStorage;
        storage.setItem(SESSION_KEY, JSON.stringify(session));
        localStorage.setItem(LAST_ID_KEY, session.userId);
        if (remember) sessionStorage.removeItem(SESSION_KEY);
        else localStorage.removeItem(SESSION_KEY);
        syncHeaderEntry();
        window.GovJobCandidateNav?.sync?.();
        return session;
    }

    function logout(redirectTo = "login.html") {
        localStorage.removeItem(SESSION_KEY);
        sessionStorage.removeItem(SESSION_KEY);
        window.location.href = redirectTo;
    }

    function requireAuth() {
        const session = getSession();
        if (session) return session;
        const next = encodeURIComponent(`${window.location.pathname}${window.location.search}`);
        window.location.replace(`login.html?next=${next}`);
        return null;
    }

    function getNextUrl(defaultUrl = "dashboard.html") {
        try {
            const params = new URLSearchParams(window.location.search);
            const next = params.get("next");
            if (next && !/^https?:\/\//i.test(next)) return next;
        } catch {
            return defaultUrl;
        }
        return defaultUrl;
    }

    async function callApi(payload) {
        const apiUrl = getApiUrl();
        if (!isValidApiUrl(apiUrl)) throw new Error("Backend URL is not configured correctly.");

        const response = await fetch(apiUrl, {
            method: "POST",
            redirect: "follow",
            headers: {
                "Content-Type": "text/plain;charset=utf-8"
            },
            body: JSON.stringify(payload)
        });

        const text = await response.text();
        try {
            return JSON.parse(text);
        } catch {
            throw new Error("Invalid backend response.");
        }
    }

    function getContactType(contact) {
        const value = String(contact || "").trim();
        return value.includes("@") ? "email" : "mobile";
    }

    function normalizeContact(contact) {
        const value = String(contact || "").trim();
        if (getContactType(value) === "email") return value.toLowerCase();
        const digits = value.replace(/\D/g, "");
        return digits.length === 12 && digits.startsWith("91") ? digits.slice(2) : digits;
    }

    async function registerCandidate({ name, mobile, email, dob, gender, contact, password, remember = true }) {
        const contactType = getContactType(contact);
        const normalizedMobile = normalizeContact(mobile || (contactType === "mobile" ? contact : ""));
        const normalizedEmail = normalizeContact(email || (contactType === "email" ? contact : ""));
        const payload = {
            action: "registerCandidate",
            name: String(name || "").trim(),
            mobile: normalizedMobile,
            email: normalizedEmail,
            dob: String(dob || "").trim(),
            gender: String(gender || "").trim(),
            password: String(password || "")
        };
        const result = await callApi(payload);
        if (!result.success) return result;
        const user = result.user || result.data || {};
        saveSession(user, remember);
        return result;
    }

    async function resetCandidatePassword({ mobile, email, dob, password }) {
        const payload = {
            action: "resetCandidatePassword",
            mobile: normalizeContact(mobile),
            email: normalizeContact(email),
            dob: String(dob || "").trim(),
            password: String(password || "")
        };
        return callApi(payload);
    }

    async function changeCandidatePassword({ userId, currentPassword, newPassword }) {
        return callApi({
            action: "changeCandidatePassword",
            userId: String(userId || "").trim(),
            currentPassword: String(currentPassword || ""),
            newPassword: String(newPassword || "")
        });
    }

    async function loginCandidate({ contact, password, remember = true }) {
        const normalizedContact = normalizeContact(contact);
        const payload = {
            action: "loginCandidate",
            identifier: normalizedContact,
            password: String(password || "")
        };
        const result = await callApi(payload);
        if (!result.success) return result;
        const user = result.user || result.data || {};
        saveSession(user, remember);
        return result;
    }

    function setButtonBusy(button, busy, originalHtml) {
        if (!button) return "";
        const original = originalHtml || button.innerHTML;
        button.disabled = busy;
        button.setAttribute("aria-busy", String(busy));
        if (busy) {
            button.innerHTML = `<span class="loading-spinner" aria-hidden="true"></span><span>${PROCESSING_TEXT}</span>`;
        } else {
            button.removeAttribute("aria-busy");
            button.innerHTML = original;
        }
        return original;
    }

    function showMessage(node, message, type = "info") {
        if (!node) return;
        node.textContent = String(message || "");
        node.className = message ? `auth-message ${type}` : "auth-message hidden";
    }

    function syncHeaderEntry(root = document) {
        const session = getSession();
        root.querySelectorAll("[data-auth-entry]").forEach((link) => {
            const loginHref = link.dataset.loginHref || link.getAttribute("href") || "login.html";
            const dashboardHref = link.dataset.dashboardHref || loginHref.replace(/login\.html(?:[?#].*)?$/i, "dashboard.html") || "dashboard.html";
            const label = link.querySelector("span") || link;
            const icon = link.querySelector("i");
            const isLoggedIn = Boolean(session);

            link.href = isLoggedIn ? dashboardHref : loginHref;
            link.setAttribute("aria-label", isLoggedIn ? "Open candidate dashboard" : "Login to candidate dashboard");
            link.classList.toggle("is-active", isLoggedIn);
            label.textContent = isLoggedIn ? "Dashboard" : "Login";
            if (icon) {
                icon.className = isLoggedIn ? "fas fa-chart-line" : "fas fa-user-circle";
                icon.setAttribute("aria-hidden", "true");
            }
        });
    }

    function bindLogout(root = document) {
        root.querySelectorAll("[data-auth-logout]").forEach((button) => {
            button.addEventListener("click", () => logout(button.dataset.authLogout || "login.html"));
        });
    }

    if (document.readyState === "loading") {
        window.addEventListener("DOMContentLoaded", () => syncHeaderEntry());
    } else {
        syncHeaderEntry();
    }

    window.CandidateAuth = {
        SESSION_KEY,
        getSession,
        saveSession,
        logout,
        requireAuth,
        getNextUrl,
        callApi,
        getContactType,
        normalizeContact,
        registerCandidate,
        loginCandidate,
        resetCandidatePassword,
        changeCandidatePassword,
        setButtonBusy,
        showMessage,
        syncHeaderEntry,
        bindLogout
    };
}());
