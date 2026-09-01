(function () {
    "use strict";

    const params = new URLSearchParams(window.location.search);
    const quizId = String(params.get("quiz") || "").trim();
    const family = String(params.get("family") || "").trim().toLowerCase();
    const familyPages = { banking: "banking-quizzes.html", ssc: "ssc-quizzes.html", police: "police-quizzes.html", rrb: "rrb-quizzes.html" };
    const THEME_KEY = "gju:quiz-attempt-theme";
    let pausedSeconds = 0;
    let startAttempted = false;
    let pausedResumePending = false;
    let timeoutId = 0;
    let legacyHomeObserver = null;
    let questionObserver = null;

    function sourcePage() { return familyPages[family] || "quiz.html"; }
    function exitToSource() { window.location.href = sourcePage(); }
    function parseTimer(value) {
        const parts = String(value || "").trim().split(":").map(Number);
        return parts.length === 2 && !parts.some(Number.isNaN) ? Math.max(0, parts[0] * 60 + parts[1]) : 0;
    }
    function installPremiumStyles() {
        if (document.querySelector('link[data-quiz-attempt-premium]')) return;
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "../CSS/quiz-attempt-premium.css?v=20260901-mobile-v5";
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
    function moveDurationChipToPalette() {
        const chip = document.getElementById("examDurationLabel");
        const links = document.querySelector(".palette-links");
        if (!chip || !links || chip.dataset.paletteHome === "1") return;
        chip.classList.add("palette-duration-chip");
        chip.dataset.paletteHome = "1";
        links.appendChild(chip);
    }
    function syncPreviousButton() {
        const button = document.querySelector("[data-action='prev-question']");
        if (!button) return;
        const current = Number(document.getElementById("currentQuestionNo")?.textContent || document.getElementById("questionNumberLabel")?.textContent || 1);
        const first = !Number.isFinite(current) || current <= 1;
        button.hidden = first;
        button.disabled = first;
        button.setAttribute("aria-hidden", first ? "true" : "false");
        button.setAttribute("aria-disabled", first ? "true" : "false");
    }
    function installQuestionNavigationRules() {
        if (questionObserver) return;
        const nodes = [document.getElementById("currentQuestionNo"), document.getElementById("questionNumberLabel")].filter(Boolean);
        syncPreviousButton();
        questionObserver = new MutationObserver(function () { window.requestAnimationFrame(syncPreviousButton); });
        nodes.forEach(function (node) { questionObserver.observe(node, { childList: true, characterData: true, subtree: true }); });
    }
    function setLoading(title, message, isError) {
        const view = document.getElementById("loadingView");
        if (!view) return;
        view.classList.remove("hidden");
        view.classList.toggle("is-error", Boolean(isError));
        const h = view.querySelector("[data-loading-title]");
        const p = view.querySelector("[data-loading-message]");
        if (h) h.textContent = title;
        if (p) p.textContent = message;
        const retry = view.querySelector("[data-attempt-retry]");
        const back = view.querySelector("[data-attempt-exit]");
        if (retry) retry.hidden = !isError;
        if (back) back.hidden = !isError;
    }
    function hideLoading() {
        document.getElementById("loadingView")?.classList.add("hidden");
        window.clearTimeout(timeoutId);
    }
    function keepLegacyHomeInert() {
        const home = document.getElementById("homeView");
        if (!home) return;
        home.classList.add("hidden");
        home.setAttribute("aria-hidden", "true");
        home.setAttribute("inert", "");
    }
    function installLegacyHomeFirewall() {
        const home = document.getElementById("homeView");
        if (!home || legacyHomeObserver) return;
        keepLegacyHomeInert();
        legacyHomeObserver = new MutationObserver(function () {
            if (!home.classList.contains("hidden")) home.classList.add("hidden");
            if (home.getAttribute("aria-hidden") !== "true") home.setAttribute("aria-hidden", "true");
            if (!home.hasAttribute("inert")) home.setAttribute("inert", "");
        });
        legacyHomeObserver.observe(home, { attributes: true, attributeFilter: ["class", "aria-hidden", "inert"] });
    }
    function syncAttemptChrome(resumeVisible) {
        document.body.classList.toggle("quiz-resume-choice-active", Boolean(resumeVisible));
        if (resumeVisible) {
            keepLegacyHomeInert();
            document.getElementById("loadingView")?.classList.add("hidden");
        }
    }
    function showPausedOverlay() {
        keepLegacyHomeInert();
        document.getElementById("examView")?.classList.remove("hidden");
        document.getElementById("resultView")?.classList.add("hidden");
        document.getElementById("reviewView")?.classList.add("hidden");
        document.body.classList.remove("quiz-resume-choice-active");
        document.body.classList.add("quiz-exam-active", "gju-quiz-exam-mode", "quiz-attempt-paused");
        let overlay = document.getElementById("attemptPausedOverlay");
        if (!overlay) {
            overlay = document.createElement("div");
            overlay.id = "attemptPausedOverlay";
            overlay.className = "attempt-paused-overlay";
            overlay.innerHTML = '<article class="attempt-paused-card" role="dialog" aria-modal="true" aria-labelledby="attemptPausedTitle"><i class="fas fa-pause-circle" aria-hidden="true"></i><h2 id="attemptPausedTitle">Quiz Paused</h2><p>Your answers are saved. Resume whenever you are ready.</p><div class="attempt-paused-actions"><button type="button" class="quiz-btn quiz-btn-primary" data-attempt-resume><i class="fas fa-play" aria-hidden="true"></i> Resume Quiz</button><button type="button" class="quiz-btn quiz-btn-outline" data-attempt-exit><i class="fas fa-arrow-left" aria-hidden="true"></i> Exit Quiz</button></div></article>';
            document.body.appendChild(overlay);
        }
        overlay.classList.remove("hidden");
    }
    function hidePausedOverlay() {
        document.getElementById("attemptPausedOverlay")?.classList.add("hidden");
        document.body.classList.remove("quiz-attempt-paused");
    }
    function writePausedTimeBackToSavedAttempt() {
        const storage = window.QuizStorage;
        if (!storage || typeof storage.read !== "function" || typeof storage.write !== "function") return;
        const saved = storage.read("unfinished", null);
        if (!saved || saved.quizId !== quizId || pausedSeconds <= 0) return;
        saved.endsAt = Date.now() + pausedSeconds * 1000;
        saved.remainingSeconds = pausedSeconds;
        storage.write("unfinished", saved);
    }
    function fireStartTrigger() {
        const trigger = document.createElement("button");
        trigger.type = "button";
        trigger.hidden = true;
        trigger.tabIndex = -1;
        trigger.dataset.startQuiz = quizId;
        trigger.setAttribute("aria-hidden", "true");
        document.body.appendChild(trigger);
        trigger.click();
        trigger.remove();
    }
    function resumePausedAttempt() {
        writePausedTimeBackToSavedAttempt();
        hidePausedOverlay();
        pausedResumePending = true;
        fireStartTrigger();
    }
    function maybeFinishPausedResume() {
        if (!pausedResumePending) return;
        const modal = document.getElementById("resumeModal");
        if (!modal || modal.classList.contains("hidden")) return;
        const button = modal.querySelector("[data-action='resume-saved']");
        if (!button) return;
        pausedResumePending = false;
        button.click();
        window.setTimeout(function () {
            document.body.classList.remove("quiz-resume-choice-active", "quiz-attempt-paused");
            keepLegacyHomeInert();
        }, 0);
    }
    function dispatchDirectStart() {
        if (startAttempted) return;
        startAttempted = true;
        fireStartTrigger();
    }
    function resolveAndStart() {
        if (startAttempted || !quizId) return;
        const registry = window.GJU_QUIZZES;
        if (!registry || typeof registry.getQuizById !== "function") return;
        if (!registry.getQuizById(quizId)) return;
        setLoading("Starting your quiz…", "Quiz found. Preparing your attempt.", false);
        dispatchDirectStart();
    }
    function watchViews() {
        const targets = ["examView", "resultView", "reviewView", "resumeModal"].map((id) => document.getElementById(id)).filter(Boolean);
        const observer = new MutationObserver(function () {
            keepLegacyHomeInert();
            const examVisible = !document.getElementById("examView")?.classList.contains("hidden");
            const resultVisible = !document.getElementById("resultView")?.classList.contains("hidden");
            const reviewVisible = !document.getElementById("reviewView")?.classList.contains("hidden");
            const resumeVisible = !document.getElementById("resumeModal")?.classList.contains("hidden");
            syncAttemptChrome(resumeVisible && !pausedResumePending);
            if (examVisible || resultVisible || reviewVisible || resumeVisible) hideLoading();
            if (examVisible) {
                installThemeToggle();
                moveDurationChipToPalette();
                installQuestionNavigationRules();
                syncPreviousButton();
            }
            if (resumeVisible) maybeFinishPausedResume();
        });
        targets.forEach((target) => observer.observe(target, { attributes: true, attributeFilter: ["class"] }));
    }
    function init() {
        document.body.classList.add("quiz-attempt-route");
        installPremiumStyles();
        applyTheme(getInitialTheme(), false);
        installLegacyHomeFirewall();
        installThemeToggle();
        moveDurationChipToPalette();
        installQuestionNavigationRules();
        if (!quizId) { window.location.replace("quiz.html"); return; }
        setLoading("Starting your quiz…", "Loading published quiz information.", false);
        watchViews();
        document.addEventListener("gju:admin-quiz-index-ready", function () { window.setTimeout(resolveAndStart, 0); });
        window.setTimeout(resolveAndStart, 0);
        timeoutId = window.setTimeout(function () {
            const visible = ["examView", "resultView", "reviewView", "resumeModal"].some(function (id) {
                const node = document.getElementById(id);
                return node && !node.classList.contains("hidden");
            });
            if (!visible) setLoading("Quiz could not start", "The quiz data could not be loaded. Please retry or return to the quiz list.", true);
        }, 12000);
    }

    document.addEventListener("click", function (event) {
        const target = event.target.closest && event.target.closest("[data-action], [data-attempt-resume], [data-attempt-exit], [data-attempt-retry], [data-quiz-theme-toggle]");
        if (!target) return;
        if (target.hasAttribute("data-quiz-theme-toggle")) {
            event.preventDefault();
            const current = document.body.dataset.quizTheme === "dark" ? "dark" : "light";
            applyTheme(current === "dark" ? "light" : "dark", true);
            return;
        }
        if (target.matches("[data-action='pause-test']")) { pausedSeconds = parseTimer(document.getElementById("timerText")?.textContent); return; }
        if (target.matches("[data-action='back-home'], [data-action='cancel-resume']")) { event.preventDefault(); event.stopPropagation(); exitToSource(); return; }
        if (target.hasAttribute("data-attempt-resume")) { event.preventDefault(); resumePausedAttempt(); return; }
        if (target.hasAttribute("data-attempt-exit")) { event.preventDefault(); exitToSource(); return; }
        if (target.hasAttribute("data-attempt-retry")) { event.preventDefault(); window.location.reload(); }
    }, true);
    document.addEventListener("click", function (event) {
        if (!event.target.closest || !event.target.closest("[data-action='pause-test']")) return;
        window.setTimeout(showPausedOverlay, 0);
    }, false);

    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
    else init();
}());
