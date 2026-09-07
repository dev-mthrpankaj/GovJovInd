(function () {
    "use strict";

    const params = new URLSearchParams(window.location.search);
    const quizId = String(params.get("quiz") || "").trim();
    const family = String(params.get("family") || "").trim().toLowerCase();
    const subject = String(params.get("subject") || "").trim().toLowerCase();
    const familyPages = { banking: "banking-quizzes.html", ssc: "ssc-quizzes.html", police: "police-quizzes.html", rrb: "rrb-quizzes.html" };
    const subjectPages = { maths: "maths-quizzes.html", reasoning: "reasoning-quizzes.html", english: "english-quizzes.html", hindi: "hindi-quizzes.html", "gk-gs": "general-awareness-quizzes.html", "general-awareness": "general-awareness-quizzes.html", "general-science": "general-science-quizzes.html", computer: "computer-quizzes.html", "current-affairs": "current-affairs-quizzes.html" };
    const THEME_KEY = "gju:quiz-attempt-theme";
    let pausedSeconds = 0;
    let startAttempted = false;
    let pausedResumePending = false;
    let timeoutId = 0;
    let legacyHomeObserver = null;
    let questionObserver = null;

    function sourcePage() { return family === "topic-wise" ? (subjectPages[subject] || "quiz.html") : (familyPages[family] || "quiz.html"); }
    function exitToSource() { window.location.href = sourcePage(); }
    function parseTimer(value) {
        const parts = String(value || "").trim().split(":").map(Number);
        return parts.length === 2 && !parts.some(Number.isNaN) ? Math.max(0, parts[0] * 60 + parts[1]) : 0;
    }
    function installPremiumStyles() {
        if (document.querySelector('link[data-quiz-attempt-premium]')) return;
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "../CSS/quiz-attempt-premium.css?v=20260901-css-cleanup-v7";
        link.dataset.quizAttemptPremium = "1";
        document.head.appendChild(link);
    }
    function getInitialTheme() {
        try {
            const saved = localStorage.getItem(THEME_KEY);
            if (saved === "light" || saved === "dark") return saved;
        } catch (_error) {}
        return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    function applyTheme(theme, persist) {
        const next = theme === "dark" ? "dark" : "light";
        document.body.dataset.quizTheme = next;
        document.documentElement.style.colorScheme = next;
        if (persist) {
            try { localStorage.setItem(THEME_KEY, next); } catch (_error) {}
        }
        const button = document.querySelector("[data-quiz-theme-toggle]");
        if (button) {
            const dark = next === "dark";
            button.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
            button.setAttribute("title", dark ? "Light mode" : "Dark mode");
            button.innerHTML = `<i class="fas ${dark ? "fa-sun" : "fa-moon"}" aria-hidden="true"></i><span class="quiz-theme-label">${dark ? "Light mode" : "Dark mode"}</span>`;
        }
    }
    function installThemeToggle() {
        const appbar = document.querySelector(".exam-appbar");
        if (!appbar || appbar.querySelector("[data-quiz-theme-toggle]")) return;
        const menu = appbar.querySelector(".exam-menu-btn");
        let actions = appbar.querySelector(".exam-appbar-actions");
        if (!actions) {
            actions = document.createElement("div");
            actions.className = "exam-appbar-actions";
            appbar.appendChild(actions);
        }
        const button = document.createElement("button");
        button.type = "button";
        button.className = "quiz-theme-toggle";
        button.dataset.quizThemeToggle = "1";
        actions.appendChild(button);
        if (menu) actions.appendChild(menu);
        applyTheme(document.body.dataset.quizTheme || getInitialTheme(), false);
    }
    function syncSaveIndicator(status, persistent) {
        const indicator = document.querySelector("[data-quiz-save-indicator]");
        if (!indicator) return;
        const state = status === "saving" || status === "error" || status === "saved" ? status : "ready";
        const sessionOnly = state === "saved" && persistent === false;
        const label = state === "saving" ? "Saving" : state === "error" ? "Not saved" : sessionOnly ? "Session saved" : state === "saved" ? "Saved" : "Auto-save";
        const icon = state === "saving" ? "fa-clock" : state === "error" ? "fa-triangle-exclamation" : state === "saved" ? "fa-circle-check" : "fa-cloud-arrow-up";
        indicator.className = `attempt-save-indicator is-${state}${sessionOnly ? " is-session" : ""}`;
        indicator.setAttribute("aria-label", label);
        indicator.setAttribute("title", label);
        indicator.innerHTML = `<i class="fas ${icon}" aria-hidden="true"></i><span>${label}</span>`;
    }
    function installSaveIndicator() {
        const actions = document.querySelector(".exam-appbar-actions");
        if (!actions || actions.querySelector("[data-quiz-save-indicator]")) return;
        const indicator = document.createElement("span");
        indicator.dataset.quizSaveIndicator = "1";
        actions.insertBefore(indicator, actions.firstChild);
        syncSaveIndicator("ready", window.QuizStorage?.isPersistent);
    }
    function moveDurationChipToPalette() {
        const chip = document.getElementById("examDurationLabel");
        const links = document.querySelector(".palette-links");
        if (!chip || !links || chip.dataset.paletteHome === "1") return;
        chip.classList.add("palette-duration-chip");
        chip.dataset.paletteHome = "1";
        links.appendChild(chip);
    }
    function syncFullscreenToggle() {
        const button = document.querySelector("[data-quiz-fullscreen-toggle]");
        if (!button) return;
        const active = Boolean(document.fullscreenElement);
        button.setAttribute("aria-label", active ? "Exit full screen" : "Enter full screen");
        button.setAttribute("title", active ? "Exit full screen" : "Full screen");
        button.innerHTML = `<i class="fas ${active ? "fa-compress" : "fa-expand"}" aria-hidden="true"></i>`;
    }
    function installFullscreenToggle() {
        const actions = document.querySelector(".exam-appbar-actions");
        if (!actions || actions.querySelector("[data-quiz-fullscreen-toggle]")) return;
        const button = document.createElement("button");
        button.type = "button";
        button.className = "quiz-fullscreen-toggle";
        button.dataset.quizFullscreenToggle = "1";
        actions.appendChild(button);
        syncFullscreenToggle();
    }
    function installAttemptChrome() {
        installPremiumStyles(); installThemeToggle(); installSaveIndicator(); moveDurationChipToPalette(); installFullscreenToggle();
    }
    document.addEventListener("click", function (event) {
        const themeButton = event.target.closest("[data-quiz-theme-toggle]");
        if (themeButton) { applyTheme(document.body.dataset.quizTheme === "dark" ? "light" : "dark", true); return; }
        const fullscreenButton = event.target.closest("[data-quiz-fullscreen-toggle]");
        if (fullscreenButton) { if (document.fullscreenElement) document.exitFullscreen?.(); else document.documentElement.requestFullscreen?.(); }
    });
    document.addEventListener("fullscreenchange", syncFullscreenToggle);
    window.addEventListener("quiz-storage-status", function (event) { syncSaveIndicator(event.detail?.status, event.detail?.persistent); });
    document.addEventListener("DOMContentLoaded", installAttemptChrome);
    if (document.readyState !== "loading") installAttemptChrome();

    /* Existing attempt controller logic continues below in the production file. */
}());