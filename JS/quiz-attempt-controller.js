(function () {
    "use strict";

    const params = new URLSearchParams(window.location.search);
    const quizId = String(params.get("quiz") || "").trim();
    const family = String(params.get("family") || "").trim().toLowerCase();
    const autoResume = params.get("autoresume") === "1";
    const familyPages = {
        banking: "banking-quizzes.html",
        ssc: "ssc-quizzes.html",
        police: "police-quizzes.html",
        rrb: "rrb-quizzes.html"
    };

    let pausedSeconds = 0;
    let startAttempted = false;
    let timeoutId = 0;

    function sourcePage() {
        return familyPages[family] || "quiz.html";
    }

    function exitToSource() {
        window.location.href = sourcePage();
    }

    function parseTimer(value) {
        const parts = String(value || "").trim().split(":").map(Number);
        if (parts.length !== 2 || parts.some(Number.isNaN)) return 0;
        return Math.max(0, parts[0] * 60 + parts[1]);
    }

    function setLoading(title, message, isError) {
        const view = document.getElementById("loadingView");
        if (!view) return;
        view.classList.remove("hidden");
        view.classList.toggle("is-error", Boolean(isError));
        const titleNode = view.querySelector("[data-loading-title]");
        const textNode = view.querySelector("[data-loading-message]");
        if (titleNode) titleNode.textContent = title;
        if (textNode) textNode.textContent = message;
        const retry = view.querySelector("[data-attempt-retry]");
        const back = view.querySelector("[data-attempt-exit]");
        if (retry) retry.hidden = !isError;
        if (back) back.hidden = !isError;
    }

    function hideLoading() {
        document.getElementById("loadingView")?.classList.add("hidden");
        window.clearTimeout(timeoutId);
    }

    function forceCompatHomeHidden() {
        const home = document.getElementById("homeView");
        if (home) {
            home.classList.add("hidden");
            home.setAttribute("aria-hidden", "true");
        }
    }

    function showPausedOverlay() {
        forceCompatHomeHidden();
        const exam = document.getElementById("examView");
        if (exam) exam.classList.remove("hidden");
        document.getElementById("resultView")?.classList.add("hidden");
        document.getElementById("reviewView")?.classList.add("hidden");
        document.body.classList.add("quiz-exam-active", "gju-quiz-exam-mode", "quiz-attempt-paused");

        let overlay = document.getElementById("attemptPausedOverlay");
        if (!overlay) {
            overlay = document.createElement("div");
            overlay.id = "attemptPausedOverlay";
            overlay.className = "attempt-paused-overlay";
            overlay.innerHTML = `
                <article class="attempt-paused-card" role="dialog" aria-modal="true" aria-labelledby="attemptPausedTitle">
                    <i class="fas fa-pause-circle" aria-hidden="true"></i>
                    <h2 id="attemptPausedTitle">Quiz Paused</h2>
                    <p>Your answers are saved. Resume whenever you are ready.</p>
                    <div class="attempt-paused-actions">
                        <button type="button" class="quiz-btn quiz-btn-primary" data-attempt-resume><i class="fas fa-play" aria-hidden="true"></i> Resume Quiz</button>
                        <button type="button" class="quiz-btn quiz-btn-outline" data-attempt-exit><i class="fas fa-arrow-left" aria-hidden="true"></i> Exit Quiz</button>
                    </div>
                </article>`;
            document.body.appendChild(overlay);
        }
        overlay.classList.remove("hidden");
    }

    function resumePausedAttempt() {
        const storage = window.QuizStorage;
        if (storage && typeof storage.read === "function" && typeof storage.write === "function") {
            const saved = storage.read("unfinished", null);
            if (saved && saved.quizId === quizId && pausedSeconds > 0) {
                saved.endsAt = Date.now() + pausedSeconds * 1000;
                saved.remainingSeconds = pausedSeconds;
                storage.write("unfinished", saved);
            }
        }
        const next = new URL(window.location.href);
        next.searchParams.set("autoresume", "1");
        window.location.replace(next.toString());
    }

    function maybeAutoResume() {
        if (!autoResume) return;
        const modal = document.getElementById("resumeModal");
        if (!modal || modal.classList.contains("hidden")) return;
        const button = modal.querySelector("[data-action='resume-saved']");
        if (!button) return;
        params.delete("autoresume");
        button.click();
        const clean = new URL(window.location.href);
        clean.searchParams.delete("autoresume");
        window.history.replaceState({}, "", clean.toString());
    }

    function tryStartRemoteQuiz() {
        if (startAttempted || !quizId) return;
        const registry = window.GJU_QUIZZES;
        if (!registry || typeof registry.getQuizById !== "function") return;
        const quiz = registry.getQuizById(quizId);
        if (!quiz) return;

        const subjectSelect = document.getElementById("subjectSelect");
        if (subjectSelect && quiz.subject && subjectSelect.value !== quiz.subject) {
            subjectSelect.value = quiz.subject;
            subjectSelect.dispatchEvent(new Event("change", { bubbles: true }));
        }

        window.setTimeout(function () {
            if (startAttempted) return;
            const safeId = window.CSS && typeof window.CSS.escape === "function"
                ? window.CSS.escape(quizId)
                : quizId.replace(/(["\\])/g, "\\$1");
            const button = document.querySelector('[data-start-quiz="' + safeId + '"]');
            if (!button || button.disabled) return;
            startAttempted = true;
            button.click();
        }, 0);
    }

    function watchViews() {
        const targets = ["examView", "resultView", "reviewView", "resumeModal"].map((id) => document.getElementById(id)).filter(Boolean);
        const observer = new MutationObserver(function () {
            forceCompatHomeHidden();
            const examVisible = !document.getElementById("examView")?.classList.contains("hidden");
            const resultVisible = !document.getElementById("resultView")?.classList.contains("hidden");
            const reviewVisible = !document.getElementById("reviewView")?.classList.contains("hidden");
            const resumeVisible = !document.getElementById("resumeModal")?.classList.contains("hidden");
            if (examVisible || resultVisible || reviewVisible || resumeVisible) hideLoading();
            if (resumeVisible) maybeAutoResume();
        });
        targets.forEach((target) => observer.observe(target, { attributes: true, attributeFilter: ["class"] }));
    }

    function init() {
        document.body.classList.add("quiz-attempt-route");
        forceCompatHomeHidden();

        if (!quizId) {
            window.location.replace("quiz.html");
            return;
        }

        setLoading("Starting your quiz…", "Loading questions and preparing the test.", false);
        watchViews();

        document.addEventListener("gju:admin-quiz-index-ready", function () {
            window.setTimeout(tryStartRemoteQuiz, 0);
        });
        window.setTimeout(tryStartRemoteQuiz, 0);

        timeoutId = window.setTimeout(function () {
            const examVisible = !document.getElementById("examView")?.classList.contains("hidden");
            const resultVisible = !document.getElementById("resultView")?.classList.contains("hidden");
            const reviewVisible = !document.getElementById("reviewView")?.classList.contains("hidden");
            const resumeVisible = !document.getElementById("resumeModal")?.classList.contains("hidden");
            if (!examVisible && !resultVisible && !reviewVisible && !resumeVisible) {
                setLoading("Quiz could not start", "The quiz data could not be loaded. Please retry or return to the quiz list.", true);
            }
        }, 12000);
    }

    document.addEventListener("click", function (event) {
        const target = event.target.closest && event.target.closest("[data-action], [data-attempt-resume], [data-attempt-exit], [data-attempt-retry]");
        if (!target) return;

        if (target.matches("[data-action='pause-test']")) {
            pausedSeconds = parseTimer(document.getElementById("timerText")?.textContent);
            return;
        }

        if (target.matches("[data-action='back-home'], [data-action='cancel-resume']")) {
            event.preventDefault();
            event.stopPropagation();
            exitToSource();
            return;
        }

        if (target.hasAttribute("data-attempt-resume")) {
            event.preventDefault();
            resumePausedAttempt();
            return;
        }
        if (target.hasAttribute("data-attempt-exit")) {
            event.preventDefault();
            exitToSource();
            return;
        }
        if (target.hasAttribute("data-attempt-retry")) {
            event.preventDefault();
            window.location.reload();
        }
    }, true);

    document.addEventListener("click", function (event) {
        const target = event.target.closest && event.target.closest("[data-action='pause-test']");
        if (!target) return;
        window.setTimeout(showPausedOverlay, 0);
    }, false);

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init, { once: true });
    } else {
        init();
    }
}());
