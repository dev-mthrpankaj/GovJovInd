(function () {
    "use strict";

    const prefix = "GovJobUpdatesQuiz.";
    const PROGRESS_API = "https://test.govjobupdates.com/live-test/practice-quiz-api/progress.php";
    const memory = {};
    let firebaseImportPromise = null;
    let lastSyncedAttemptKey = "";
    let lastUnfinished = null;
    let activeQuizKey = "";
    const runtimeAnswers = {};
    const runtimeStatuses = {};

    function initQuizMobileHeaderFix() {
        if (document.getElementById("gjuQuizMobileHeaderFix")) return;
        const style = document.createElement("style");
        style.id = "gjuQuizMobileHeaderFix";
        style.textContent = `
            @media (max-width: 767px) {
                body.page-loaded { transform: none !important; }
                body:not(.gju-quiz-exam-mode) { padding-top: 68px !important; }
                body.gju-quiz-exam-mode { padding-top: 0 !important; overflow-x: hidden !important; }
                body:not(.gju-quiz-exam-mode) > header { position: fixed !important; top: 0 !important; left: 0 !important; right: 0 !important; width: 100% !important; z-index: 100000 !important; background: rgba(255,255,255,.98) !important; transform: translateZ(0) !important; }
                body.gju-quiz-exam-mode > header { display: none !important; }
                body:not(.gju-quiz-exam-mode) > header .header-container { background: rgba(255,255,255,.98) !important; }
                body:not(.gju-quiz-exam-mode) > header nav { position: fixed !important; top: 68px !important; left: 0 !important; right: 0 !important; z-index: 99999 !important; max-height: calc(100dvh - 68px) !important; overflow-y: auto !important; overscroll-behavior: contain !important; -webkit-overflow-scrolling: touch !important; }
                body.gju-quiz-exam-mode:not(.quiz-attempt-route) .quiz-page { padding: 0 !important; margin: 0 !important; min-height: 100dvh !important; }
                body.gju-quiz-exam-mode .quiz-home-view, body.gju-quiz-exam-mode footer { display: none !important; }
                body.gju-quiz-exam-mode:not(.quiz-attempt-route) .quiz-exam-view { display: block !important; min-height: 100dvh !important; }
                body.gju-quiz-exam-mode:not(.quiz-attempt-route) .exam-shell { min-height: 100dvh !important; padding: 0 !important; }
                body.gju-quiz-exam-mode:not(.quiz-attempt-route) .exam-main { min-height: 100dvh !important; padding-bottom: 86px !important; }
                body.gju-quiz-exam-mode:not(.quiz-attempt-route) .exam-actions { position: fixed !important; left: 0 !important; right: 0 !important; bottom: 0 !important; z-index: 1000 !important; background: #202225 !important; padding: 10px 10px max(10px, env(safe-area-inset-bottom)) !important; border-top: 1px solid rgba(255,255,255,.08) !important; display: grid !important; grid-template-columns: 1fr 1fr 1fr !important; gap: 8px !important; }
                body.gju-quiz-exam-mode:not(.quiz-attempt-route) .exam-actions .quiz-btn { min-width: 0 !important; width: 100% !important; min-height: 44px !important; padding: 8px 6px !important; font-size: 12px !important; white-space: normal !important; }
                body.quiz-attempt-route.gju-quiz-exam-mode, body.quiz-attempt-route.gju-quiz-exam-mode .quiz-page, body.quiz-attempt-route.gju-quiz-exam-mode .quiz-exam-view, body.quiz-attempt-route.gju-quiz-exam-mode .exam-shell, body.quiz-attempt-route.gju-quiz-exam-mode .exam-main { height: 100dvh !important; min-height: 100dvh !important; overflow: hidden !important; background: var(--qa-bg, #eef3f8) !important; }
                body.quiz-attempt-route.gju-quiz-exam-mode .exam-shell { display: grid !important; grid-template-columns: 1fr !important; padding: 0 !important; }
                body.quiz-attempt-route.gju-quiz-exam-mode .exam-main { display: grid !important; grid-template-rows: 46px minmax(0, 1fr) 64px !important; gap: 5px !important; padding: 0 !important; }
                body.quiz-attempt-route.gju-quiz-exam-mode .exam-topbar { min-height: 0 !important; padding: 4px 8px !important; border-radius: 0 !important; box-shadow: none !important; }
                body.quiz-attempt-route.gju-quiz-exam-mode .question-card { display: block !important; height: auto !important; min-height: 0 !important; overflow-y: auto !important; padding: 8px 8px 10px !important; }
                body.quiz-attempt-route.gju-quiz-exam-mode .question-line { margin: 0 0 10px !important; padding: 0 0 7px !important; }
                body.quiz-attempt-route.gju-quiz-exam-mode .question-title { margin: 0 0 12px !important; font-size: 14.5px !important; line-height: 1.48 !important; font-weight: 400 !important; }
                body.quiz-attempt-route.gju-quiz-exam-mode .question-title b, body.quiz-attempt-route.gju-quiz-exam-mode .question-title strong, body.quiz-attempt-route.gju-quiz-exam-mode .question-title .text-bold { font-weight: 850 !important; }
                body.quiz-attempt-route.gju-quiz-exam-mode .option-list { display: grid !important; gap: 7px !important; margin: 0 !important; }
                body.quiz-attempt-route.gju-quiz-exam-mode .answer-option { min-height: 44px !important; padding: 7px 8px !important; }
                body.quiz-attempt-route.gju-quiz-exam-mode .exam-actions { position: relative !important; left: auto !important; right: auto !important; bottom: auto !important; z-index: 40 !important; grid-template-columns: minmax(0, .9fr) minmax(0, 1.7fr) !important; gap: 8px !important; padding: 8px 8px max(8px, env(safe-area-inset-bottom)) !important; background: var(--qa-surface, #ffffff) !important; border-top-color: var(--qa-border, #dce5f0) !important; }
                body.quiz-attempt-route.gju-quiz-exam-mode .exam-actions [data-action="prev-question"] { display: none !important; }
                body.quiz-attempt-route.gju-quiz-exam-mode .exam-actions [data-action="mark-next"] { grid-column: 1 !important; grid-row: 1 !important; }
                body.quiz-attempt-route.gju-quiz-exam-mode .exam-actions [data-action="save-next"] { grid-column: 2 !important; grid-row: 1 !important; }
                body.quiz-attempt-route.gju-quiz-exam-mode .exam-actions [data-action="mark-next"] i, body.quiz-attempt-route.gju-quiz-exam-mode .exam-actions [data-action="save-next"] i { display: none !important; }
                body.quiz-attempt-route.gju-quiz-exam-mode .exam-actions .quiz-btn { min-height: 48px !important; padding: 7px 8px !important; font-size: 12px !important; line-height: 1.1 !important; white-space: normal !important; }
            }
        `;
        document.head.appendChild(style);
    }

    function syncQuizExamMode() {
        const examView = document.getElementById("examView");
        const isExamVisible = Boolean(examView && !examView.classList.contains("hidden"));
        document.body.classList.toggle("gju-quiz-exam-mode", isExamVisible);
    }

    function initQuizExamModeWatcher() {
        syncQuizExamMode();
        const examView = document.getElementById("examView");
        const homeView = document.getElementById("homeView");
        const target = document.getElementById("quizApp") || document.body;
        const observer = new MutationObserver(syncQuizExamMode);
        if (examView) observer.observe(examView, { attributes: true, attributeFilter: ["class", "hidden"] });
        if (homeView) observer.observe(homeView, { attributes: true, attributeFilter: ["class", "hidden"] });
        observer.observe(target, { attributes: true, attributeFilter: ["class"] });
        window.addEventListener("pageshow", syncQuizExamMode, { passive: true });
        window.addEventListener("resize", syncQuizExamMode, { passive: true });
    }

    function available() {
        try {
            const key = `${prefix}test`;
            localStorage.setItem(key, "1");
            localStorage.removeItem(key);
            return true;
        } catch {
            return false;
        }
    }

    const canUseLocalStorage = available();

    function read(key, fallback) {
        try {
            const raw = canUseLocalStorage ? localStorage.getItem(prefix + key) : memory[key];
            return raw ? JSON.parse(raw) : fallback;
        } catch {
            return fallback;
        }
    }

    function scheduleIdle(task) {
        if ("requestIdleCallback" in window) {
            window.requestIdleCallback(task, { timeout: 2500 });
            return;
        }
        window.setTimeout(task, 700);
    }

    function write(key, value) {
        try {
            const raw = JSON.stringify(value);
            if (canUseLocalStorage) localStorage.setItem(prefix + key, raw);
            else memory[key] = raw;
        } catch {
            memory[key] = JSON.stringify(value);
        }

        if (key === "unfinished" && value && typeof value === "object") {
            lastUnfinished = JSON.parse(JSON.stringify(value));
            activeQuizKey = String(value.quizId || activeQuizKey || "");
        }

        if (key === "attempts" && Array.isArray(value) && value.length) {
            maybeSyncLatestAttempt(value[0]);
        }
        return true;
    }

    function remove(key) {
        try {
            if (canUseLocalStorage) localStorage.removeItem(prefix + key);
            delete memory[key];
        } catch {
            delete memory[key];
        }
        // Keep the last unfinished snapshot in memory until the just-completed
        // attempt has had a chance to sync its latest answers.
    }

    function clearHistory() {
        write("attempts", []);
        write("recentAttempts", []);
        write("bestScores", {});
    }

    async function waitForFirebaseConfig(timeoutMs = 6000) {
        const started = Date.now();
        while (Date.now() - started < timeoutMs) {
            if (window.GJU_FIREBASE_CONFIG && window.GJU_FIREBASE_CONFIG.apiKey) return window.GJU_FIREBASE_CONFIG;
            await new Promise((resolve) => window.setTimeout(resolve, 120));
        }
        return null;
    }

    async function getFirebaseModules() {
        if (firebaseImportPromise) return firebaseImportPromise;
        firebaseImportPromise = Promise.all([
            import("https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js"),
            import("https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js")
        ]).then(([appMod, authMod]) => ({ appMod, authMod }));
        return firebaseImportPromise;
    }

    async function getIdToken() {
        const config = await waitForFirebaseConfig();
        if (!config) return "";
        try {
            const { appMod, authMod } = await getFirebaseModules();
            const app = appMod.getApps().length ? appMod.getApps()[0] : appMod.initializeApp(config);
            const auth = authMod.getAuth(app);
            let user = auth.currentUser;
            if (!user) {
                user = await new Promise((resolve) => {
                    let done = false;
                    let unsubscribe = function () {};
                    const timer = window.setTimeout(() => {
                        if (done) return;
                        done = true;
                        unsubscribe();
                        resolve(auth.currentUser || null);
                    }, 3500);
                    unsubscribe = authMod.onAuthStateChanged(auth, (nextUser) => {
                        if (done) return;
                        done = true;
                        window.clearTimeout(timer);
                        unsubscribe();
                        resolve(nextUser || null);
                    });
                });
            }
            return user ? await user.getIdToken() : "";
        } catch (error) {
            console.warn("[GovJobUpdates] Quiz account token unavailable:", error.message);
            return "";
        }
    }

    function currentQuestionNumber() {
        const node = document.getElementById("currentQuestionNo");
        const value = Number(node && node.textContent);
        return Number.isInteger(value) && value > 0 ? value : 0;
    }

    function captureCurrentQuestionState() {
        const number = currentQuestionNumber();
        if (!number) return;
        const selected = document.querySelector(".answer-option[aria-pressed='true'][data-option-index]");
        runtimeAnswers[number] = selected ? Number(selected.dataset.optionIndex) : null;
        const statusNode = document.getElementById("questionStatusLabel");
        const statusClass = statusNode ? Array.from(statusNode.classList).find((name) =>
            ["not-visited","not-answered","answered","marked","answered-marked"].includes(name)
        ) : "";
        runtimeStatuses[number] = statusClass || (runtimeAnswers[number] === null ? "not-answered" : "answered");
    }

    function initRuntimeAnswerCapture() {
        document.addEventListener("click", (event) => {
            const start = event.target.closest && event.target.closest("[data-start-quiz]");
            if (start) {
                activeQuizKey = String(start.dataset.startQuiz || "");
                Object.keys(runtimeAnswers).forEach((key) => delete runtimeAnswers[key]);
                Object.keys(runtimeStatuses).forEach((key) => delete runtimeStatuses[key]);
            }

            if (event.target.closest && event.target.closest("[data-option-index], [data-action='clear-response'], [data-action='mark-review'], [data-action='mark-next'], [data-action='save-next'], [data-question-index]")) {
                window.setTimeout(captureCurrentQuestionState, 0);
            }
            if (event.target.closest && event.target.closest("[data-action='submit-now']")) {
                captureCurrentQuestionState();
                window.setTimeout(captureCurrentQuestionState, 0);
            }
        }, true);

        document.addEventListener("keydown", (event) => {
            if (/^[1-9]$/.test(event.key) || ["n","m","p"].includes(String(event.key).toLowerCase())) {
                window.setTimeout(captureCurrentQuestionState, 0);
            }
        }, true);
    }

    function getAttemptId(attempt) {
        return String(attempt && attempt.id || [
            attempt && attempt.quizId,
            attempt && attempt.completedAt,
            attempt && attempt.score
        ].filter(Boolean).join("-") || Date.now()).slice(0, 120);
    }

    function buildAnswerPayload(attempt) {
        const total = Math.max(0, Number(attempt.total || attempt.totalQuestions || lastUnfinished?.answers?.length || 0));
        const savedAnswers = Array.isArray(lastUnfinished?.answers) ? lastUnfinished.answers : [];
        const savedStatuses = Array.isArray(lastUnfinished?.statuses) ? lastUnfinished.statuses : [];
        const answers = [];

        for (let index = 0; index < total; index += 1) {
            const number = index + 1;
            const hasRuntime = Object.prototype.hasOwnProperty.call(runtimeAnswers, number);
            const selected = hasRuntime ? runtimeAnswers[number] : (index < savedAnswers.length ? savedAnswers[index] : null);
            const status = runtimeStatuses[number] || savedStatuses[index] || (selected === null ? "not-answered" : "answered");
            answers.push({
                questionNumber: number,
                selectedOption: Number.isInteger(selected) ? selected : null,
                status
            });
        }
        return answers;
    }

    function toProgressPayload(attempt) {
        const total = Number(attempt.total || attempt.totalQuestions || 0) || 0;
        const timeTaken = Number(attempt.timeTakenSeconds || attempt.timeTaken || 0) || 0;
        return {
            attemptId: getAttemptId(attempt),
            quizKey: String(attempt.quizId || activeQuizKey || ""),
            quizTitle: String(attempt.quizTitle || attempt.title || "Practice Quiz"),
            subject: String(attempt.subject || "Quiz"),
            language: String(lastUnfinished?.language || ""),
            completionReason: String(attempt.reason || "manual"),
            score: Number(attempt.score) || 0,
            maxScore: Number(attempt.maxScore) || 0,
            percentage: Number(attempt.percentage) || 0,
            accuracy: Number(attempt.accuracy) || 0,
            totalQuestions: total,
            attempted: Number(attempt.attempted) || 0,
            correct: Number(attempt.correct) || 0,
            wrong: Number(attempt.wrong) || 0,
            unattempted: Math.max(0, total - (Number(attempt.attempted) || 0)),
            timeTakenSeconds: timeTaken,
            answers: buildAnswerPayload(attempt)
        };
    }

    function normalizeProgressMap(rows) {
        const map = {};
        (Array.isArray(rows) ? rows : []).forEach((row) => {
            if (row && row.quizKey) map[String(row.quizKey)] = row;
        });
        return map;
    }

    async function apiRequest(method, payload) {
        const token = await getIdToken();
        if (!token) return null;
        const options = {
            method,
            mode: "cors",
            cache: "no-store",
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            }
        };
        if (payload) {
            options.headers["Content-Type"] = "application/json";
            options.body = JSON.stringify(payload);
        }
        const response = await fetch(PROGRESS_API, options);
        const data = await response.json().catch(() => null);
        if (!response.ok || !data || data.success !== true) {
            throw new Error(data && data.message || `Quiz progress request failed (${response.status}).`);
        }
        return data;
    }

    async function loadServerProgress() {
        try {
            const data = await apiRequest("GET");
            if (!data) return;
            const map = normalizeProgressMap(data.progress);
            write("serverProgress", map);
            window.dispatchEvent(new CustomEvent("gju:quiz-progress-loaded", { detail: { progress: map } }));
        } catch (error) {
            console.warn("[GovJobUpdates] Quiz progress load skipped:", error.message);
        }
    }

    async function syncAttempt(attempt) {
        try {
            const payload = toProgressPayload(attempt);
            if (!payload.quizKey) return;
            const data = await apiRequest("POST", payload);
            if (!data || !data.progress) return;

            const map = read("serverProgress", {});
            map[data.progress.quizKey] = data.progress;
            write("serverProgress", map);
            lastUnfinished = null;
            Object.keys(runtimeAnswers).forEach((key) => delete runtimeAnswers[key]);
            Object.keys(runtimeStatuses).forEach((key) => delete runtimeStatuses[key]);

            window.dispatchEvent(new CustomEvent("gju:quiz-progress-synced", {
                detail: { progress: data.progress, serverVerified: Boolean(data.serverVerified) }
            }));
        } catch (error) {
            console.warn("[GovJobUpdates] Quiz MySQL sync skipped:", error.message);
        }
    }

    function maybeSyncLatestAttempt(attempt) {
        if (!attempt || !attempt.quizId) return;
        const syncKey = getAttemptId(attempt);
        if (!syncKey || syncKey === lastSyncedAttemptKey) return;
        lastSyncedAttemptKey = syncKey;
        scheduleIdle(() => syncAttempt(attempt));
    }

    function init() {
        initQuizMobileHeaderFix();
        initQuizExamModeWatcher();
        initRuntimeAnswerCapture();
        scheduleIdle(loadServerProgress);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init, { once: true });
    } else {
        init();
    }

    window.QuizStorage = {
        read,
        write,
        remove,
        clearHistory,
        isPersistent: canUseLocalStorage
    };

    window.GJUQuizProgress = {
        endpoint: PROGRESS_API,
        load: loadServerProgress,
        syncAttempt
    };
})();
