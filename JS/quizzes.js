(function () {
    "use strict";

    const registry = window.GJU_QUIZZES || {
        subjects: [],
        quizzes: [],
        getQuizzesBySubject: function () { return []; },
        getQuizById: function () { return null; }
    };
    const storage = window.QuizStorage || {
        read: function (_key, fallback) { return fallback; },
        write: function () { return false; },
        remove: function () {}
    };
    const sanitizeQuestionText = window.GJU_SANITIZE_QUESTION_TEXT || function (value) {
        return String(value || "").trim().replace(/\s+/g, " ");
    };

    const subjectIcons = {
        Mathematics: "fa-calculator",
        English: "fa-language",
        Hindi: "fa-book",
        "General Awareness": "fa-globe-asia",
        Reasoning: "fa-brain",
        Computer: "fa-laptop-code"
    };
    const PERSIST_IDLE_TIMEOUT_MS = 60000;
    const TIMER_STANDARD_INTERVAL_MS = 5000;
    const TIMER_WARNING_INTERVAL_MS = 1000;

    const views = {};
    const elements = {};
    const app = {
        subject: "",
        quizSet: null,
        questions: [],
        answers: [],
        statuses: [],
        current: 0,
        startedAt: 0,
        endsAt: 0,
        remainingSeconds: 1800,
        timerId: null,
        result: null,
        reviewFilter: "all",
        persistTimerId: null,
        lastPersistSignature: ""
    };

    document.addEventListener("DOMContentLoaded", init);

    function init() {
        cacheDom();
        bindMobileNavigation();
        bindEvents();
        renderSubjects();
        openInitialRoute();
    }

    function bindMobileNavigation() {
        const menuToggle = document.querySelector(".menu-toggle");
        const mainNav = document.querySelector("header nav");

        if (!menuToggle || !mainNav || menuToggle.dataset.quizMenuBound) return;
        menuToggle.dataset.quizMenuBound = "true";

        const icon = menuToggle.querySelector("i");

        function setMenu(open) {
            mainNav.classList.toggle("active", open);
            menuToggle.setAttribute("aria-expanded", String(open));
            menuToggle.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");

            if (icon) {
                icon.classList.toggle("fa-bars", !open);
                icon.classList.toggle("fa-times", open);
            }
        }

        menuToggle.addEventListener("click", () => {
            setMenu(!mainNav.classList.contains("active"));
        });

        mainNav.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => setMenu(false));
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") setMenu(false);
        });
    }

    function openInitialRoute() {
        const params = new URLSearchParams(window.location.search);
        const quizId = params.get("quiz");
        const subject = params.get("subject");

        if (quizId && registry.getQuizById(quizId)) {
            startQuiz(quizId);
            return;
        }

        if (subject && registry.subjects.includes(subject)) {
            openSubject(subject);
            return;
        }

        showView("subject");
    }

    function cacheDom() {
        views.subject = document.getElementById("subjectView");
        views.quizList = document.getElementById("quizListView");
        views.exam = document.getElementById("examView");
        views.result = document.getElementById("resultView");
        views.review = document.getElementById("reviewView");

        elements.subjectCards = document.getElementById("subjectCards");
        elements.subjectQuizHeading = document.getElementById("subjectQuizHeading");
        elements.quizSetList = document.getElementById("quizSetList");
        elements.quizListMessage = document.getElementById("quizListMessage");
        elements.examSubject = document.getElementById("examSubject");
        elements.examTitle = document.getElementById("examTitle");
        elements.currentQuestionNo = document.getElementById("currentQuestionNo");
        elements.totalQuestionNo = document.getElementById("totalQuestionNo");
        elements.timerPill = document.getElementById("timerPill");
        elements.timerText = document.getElementById("timerText");
        elements.quizProgress = document.getElementById("quizProgress");
        elements.questionCard = document.getElementById("questionCard");
        elements.palettePanel = document.getElementById("palettePanel");
        elements.paletteSummary = document.getElementById("paletteSummary");
        elements.questionPalette = document.getElementById("questionPalette");
        elements.submitModal = document.getElementById("submitModal");
        elements.submitSummary = document.getElementById("submitSummary");
        elements.paletteRendered = false;
    }

    function bindEvents() {
        document.body.addEventListener("click", handleClick);
        document.addEventListener("keydown", handleKeyboard);
        window.addEventListener("beforeunload", () => persistUnfinished(true));
        window.addEventListener("pagehide", () => persistUnfinished(true));
        document.addEventListener("visibilitychange", () => {
            if (document.hidden) persistUnfinished(true);
        });
    }

    function handleClick(event) {
        const subjectTarget = event.target.closest("[data-subject]");
        const quizTarget = event.target.closest("[data-quiz-id]");
        const optionTarget = event.target.closest("[data-option-index]");
        const paletteTarget = event.target.closest("[data-question-index]");
        const actionTarget = event.target.closest("[data-action]");
        const reviewFilterTarget = event.target.closest("[data-review-filter]");

        if (subjectTarget) {
            openSubject(subjectTarget.dataset.subject);
            return;
        }

        if (quizTarget) {
            startQuiz(quizTarget.dataset.quizId);
            return;
        }

        if (optionTarget) {
            selectOption(Number(optionTarget.dataset.optionIndex));
            return;
        }

        if (paletteTarget) {
            goQuestion(Number(paletteTarget.dataset.questionIndex));
            closePalette();
            return;
        }

        if (reviewFilterTarget) {
            app.reviewFilter = reviewFilterTarget.dataset.reviewFilter;
            renderReview();
            return;
        }

        if (!actionTarget) return;

        const actions = {
            "show-subjects": function () {
                stopTimer();
                renderSubjects();
                showView("subject");
            },
            "prev-question": function () { goQuestion(app.current - 1); },
            "save-next": saveAndNext,
            "mark-review": markForReview,
            "clear-response": clearResponse,
            "submit-confirm": openSubmitModal,
            "submit-now": function () { submitQuiz("manual"); },
            "cancel-submit": closeSubmitModal,
            "open-palette": openPalette,
            "close-palette": closePalette,
            "review-answers": function () {
                app.reviewFilter = "all";
                renderReview();
                showView("review");
            },
            "back-to-result": function () { showView("result"); },
            "back-to-quizzes": function () { openSubject(app.subject); }
        };

        if (actions[actionTarget.dataset.action]) actions[actionTarget.dataset.action]();
    }

    function handleKeyboard(event) {
        if (views.exam.classList.contains("hidden") || !elements.submitModal.classList.contains("hidden")) return;
        const key = event.key.toLowerCase();
        if (["1", "2", "3", "4"].includes(key)) {
            event.preventDefault();
            selectOption(Number(key) - 1);
        }
        if (key === "p") {
            event.preventDefault();
            goQuestion(app.current - 1);
        }
        if (key === "n") {
            event.preventDefault();
            saveAndNext();
        }
        if (key === "m") {
            event.preventDefault();
            markForReview();
        }
    }

    function showView(name) {
        Object.entries(views).forEach(([key, view]) => {
            view.classList.toggle("hidden", key !== name);
        });
        document.body.classList.toggle("quiz-exam-active", name === "exam");
        if (name !== "exam") closePalette();
        window.scrollTo({ top: 0, behavior: name === "exam" ? "auto" : "smooth" });
    }

    function renderSubjects() {
        elements.subjectCards.innerHTML = registry.subjects.map((subject) => {
            const count = registry.getQuizzesBySubject(subject).length;
            return `
                <article class="subject-card" data-subject="${escapeAttr(subject)}">
                    <span class="subject-icon"><i class="fas ${subjectIcons[subject] || "fa-book"}" aria-hidden="true"></i></span>
                    <div>
                        <h2>${escapeHtml(subject)}</h2>
                        <span class="subject-meta">${count} quizzes available</span>
                    </div>
                    <button class="btn btn-primary" type="button">View Quizzes</button>
                </article>
            `;
        }).join("");
    }

    function openSubject(subject) {
        app.subject = subject;
        elements.subjectQuizHeading.textContent = `${subject} Quizzes`;
        hideListMessage();

        const sets = registry.getQuizzesBySubject(subject);
        elements.quizSetList.innerHTML = sets.length
            ? sets.map(renderQuizSetCard).join("")
            : `<article class="quiz-set-card"><p class="result-subtext">No quiz sets found for ${escapeHtml(subject)}.</p></article>`;

        showView("quizList");
    }

    function renderQuizSetCard(set) {
        const stats = getQuizStats(set.id);
        const isComplete = Boolean(set.validation && set.validation.isComplete);
        return `
            <article class="quiz-set-card">
                <div class="quiz-card-head">
                    <h3>${escapeHtml(set.title)}</h3>
                    <p class="quiz-meta">${escapeHtml(set.description || "")}</p>
                    <div class="quiz-meta">
                        <span class="meta-pill">${escapeHtml(set.subject)}</span>
                        <span class="meta-pill">${escapeHtml(set.difficulty)}</span>
                        <span class="meta-pill">${escapeHtml(set.totalQuestions)} Questions</span>
                        <span class="meta-pill">${escapeHtml(set.durationMinutes)} Minutes</span>
                        <span class="meta-pill">+${set.marksPerQuestion} marks</span>
                        <span class="meta-pill">-${set.negativeMarks} negative</span>
                    </div>
                    ${isComplete ? "" : `<div class="message-box error">This quiz needs 50 complete questions before it can start.</div>`}
                </div>
                <div>
                    <div class="quiz-performance">
                        <div class="perf-tile"><span>Best</span><strong>${stats.bestScore}%</strong></div>
                        <div class="perf-tile"><span>Attempts</span><strong>${stats.attemptCount}</strong></div>
                        <div class="perf-tile"><span>Last</span><strong>${stats.lastAttempt}</strong></div>
                    </div>
                    <button class="btn btn-primary" type="button" data-quiz-id="${escapeAttr(set.id)}" ${isComplete ? "" : "disabled"}>Start Quiz</button>
                </div>
            </article>
        `;
    }

    function getQuizStats(quizId) {
        const attempts = storage.read("attempts", []).filter((attempt) => attempt.quizId === quizId);
        const bestScores = storage.read("bestScores", {});
        return {
            bestScore: bestScores[quizId] || 0,
            attemptCount: attempts.length,
            lastAttempt: attempts[0] ? formatDate(attempts[0].completedAt) : "Not attempted"
        };
    }

    async function startQuiz(quizId) {
        if (!canAttemptQuiz(quizId)) return;

        let set = registry.getQuizById(quizId);
        if (!set) return;
        if (!Array.isArray(set.questions)) {
            setQuizLoading(true);
            try {
                set = await registry.loadQuizById?.(quizId);
            } catch {
                set = null;
            } finally {
                setQuizLoading(false);
            }
        }

        if (!set) {
            showListMessage("Quiz could not load. Please try again.", "error");
            showView("quizList");
            return;
        }

        if (!set.validation || !set.validation.isComplete) {
            showListMessage("This quiz needs 50 complete questions before it can start.", "error");
            showView("quizList");
            return;
        }

        const saved = storage.read("unfinished", null);
        if (saved && saved.quizId === quizId && window.confirm("Resume your unfinished attempt?")) {
            resumeAttempt(saved);
            return;
        }

        app.quizSet = set;
        app.subject = set.subject;
        app.questions = getQuestionsForSet(set);
        app.answers = app.questions.map(() => null);
        app.statuses = app.questions.map(() => "not-visited");
        app.statuses[0] = "not-answered";
        app.current = 0;
        app.startedAt = Date.now();
        app.endsAt = app.startedAt + set.durationMinutes * 60 * 1000;
        app.remainingSeconds = set.durationMinutes * 60;
        app.result = null;
        resetPalette();
        renderExam();
        startTimer();
        persistUnfinished();
        showView("exam");
    }

    function setQuizLoading(loading) {
        document.body.classList.toggle("quiz-loading", loading);
        if (loading) showListMessage("Loading quiz...", "info");
        else hideListMessage();
    }

    function canAttemptQuiz(quizId) {
        const session = window.CandidateAuth?.getSession?.();
        if (session) return true;

        const next = `quiz.html?quiz=${encodeURIComponent(String(quizId || ""))}`;
        window.location.href = `login.html?next=${encodeURIComponent(next)}`;
        return false;
    }

    function resumeAttempt(saved) {
        const set = registry.getQuizById(saved.quizId);
        if (!set || !set.validation || !set.validation.isComplete) return;
        app.quizSet = set;
        app.subject = set.subject;
        app.questions = getQuestionsForSet(set);
        app.answers = Array.isArray(saved.answers) ? saved.answers : app.questions.map(() => null);
        app.statuses = Array.isArray(saved.statuses) ? saved.statuses : app.questions.map(() => "not-visited");
        app.current = Number(saved.current) || 0;
        app.startedAt = Number(saved.startedAt) || Date.now();
        app.endsAt = Number(saved.endsAt) || Date.now() + set.durationMinutes * 60 * 1000;
        app.remainingSeconds = Math.max(0, Math.ceil((app.endsAt - Date.now()) / 1000));
        resetPalette();
        renderExam();
        startTimer();
        showView("exam");
    }

    function getQuestionsForSet(set) {
        return Array.isArray(set.questions)
            ? set.questions.slice(0, 50).map((question) => ({
                ...question,
                question: question.question || sanitizeQuestionText(question.question)
            }))
            : [];
    }

    function renderExam() {
        renderQuestionShell();
        renderQuestion();
        if (shouldRenderPaletteImmediately()) renderPalette();
        updateTimerDisplay();
    }

    function shouldRenderPaletteImmediately() {
        return Boolean(window.matchMedia?.("(min-width: 1024px)")?.matches || window.innerWidth >= 1024);
    }

    function resetPalette() {
        elements.paletteRendered = false;
        elements.paletteButtons = [];
        elements.paletteSummaryValues = null;
        if (elements.paletteSummary) elements.paletteSummary.innerHTML = "";
        if (elements.questionPalette) elements.questionPalette.innerHTML = "";
    }

    function renderQuestionShell() {
        if (elements.questionTitle && document.documentElement.contains(elements.questionTitle)) return;

        elements.questionCard.innerHTML = `
            <div class="question-card-head">
                <div class="question-number-block">
                    <span class="question-number-pill" data-question-number-pill></span>
                    <div class="question-meta">
                        <span class="meta-pill" data-question-subject></span>
                        <span class="meta-pill" data-question-topic></span>
                        <span class="meta-pill" data-question-difficulty></span>
                    </div>
                </div>
                <span class="question-status-badge" data-question-status></span>
            </div>
            <div class="question-content">
                <h2 class="question-title" data-question-title></h2>
                <div class="option-list" role="radiogroup" aria-label="Answer options">
                    ${[0, 1, 2, 3].map((index) => `
                        <button class="answer-option" type="button" data-option-index="${index}" aria-pressed="false">
                            <span class="option-key">${String.fromCharCode(65 + index)}</span>
                            <span data-option-text></span>
                        </button>
                    `).join("")}
                </div>
            </div>
            <div class="question-footnote">
                <span><i class="fas fa-check" aria-hidden="true"></i> <span data-correct-marks></span></span>
                <span><i class="fas fa-minus-circle" aria-hidden="true"></i> <span data-negative-marks></span></span>
            </div>
        `;

        elements.questionNumberPill = elements.questionCard.querySelector("[data-question-number-pill]");
        elements.questionSubject = elements.questionCard.querySelector("[data-question-subject]");
        elements.questionTopic = elements.questionCard.querySelector("[data-question-topic]");
        elements.questionDifficulty = elements.questionCard.querySelector("[data-question-difficulty]");
        elements.questionStatusBadge = elements.questionCard.querySelector("[data-question-status]");
        elements.questionTitle = elements.questionCard.querySelector("[data-question-title]");
        elements.optionButtons = Array.from(elements.questionCard.querySelectorAll("[data-option-index]"));
        elements.optionTexts = elements.optionButtons.map((button) => button.querySelector("[data-option-text]"));
        elements.correctMarks = elements.questionCard.querySelector("[data-correct-marks]");
        elements.negativeMarks = elements.questionCard.querySelector("[data-negative-marks]");
    }

    function renderQuestion() {
        const question = app.questions[app.current];
        if (!question) return;
        const currentStatus = app.statuses[app.current] || "not-visited";

        elements.examSubject.textContent = app.quizSet.subject;
        elements.examTitle.textContent = app.quizSet.title;
        elements.currentQuestionNo.textContent = app.current + 1;
        elements.totalQuestionNo.textContent = app.questions.length;
        elements.quizProgress.style.width = `${((app.current + 1) / app.questions.length) * 100}%`;

        elements.questionNumberPill.textContent = `Question ${app.current + 1}`;
        elements.questionSubject.textContent = question.subject || app.quizSet.subject || "Subject";
        elements.questionTopic.textContent = question.topic || "Topic";
        elements.questionDifficulty.textContent = question.difficulty || app.quizSet.difficulty || "Mixed";
        elements.questionTitle.textContent = question.question || "";
        elements.correctMarks.textContent = `+${question.marks} marks`;
        elements.negativeMarks.textContent = `-${question.negativeMarks} negative`;
        elements.optionButtons.forEach((button, index) => {
            const selected = app.answers[app.current] === index;
            button.classList.toggle("selected", selected);
            button.setAttribute("aria-pressed", String(selected));
            elements.optionTexts[index].textContent = question.options[index] || "";
        });
        updateQuestionStatusBadge(currentStatus);
    }

    function renderPalette() {
        renderPaletteSummaryShell();
        elements.questionPalette.innerHTML = app.questions.map((_question, index) => {
            const status = app.statuses[index] || "not-visited";
            return `<button class="palette-btn ${status} ${index === app.current ? "current" : ""}" type="button" data-question-index="${index}" aria-label="Question ${index + 1}, ${getStatusLabel(status)}">${index + 1}</button>`;
        }).join("");
        elements.paletteButtons = Array.from(elements.questionPalette.querySelectorAll("[data-question-index]"));
        elements.paletteRendered = true;
        updatePaletteSummary();
    }

    function selectOption(index) {
        app.answers[app.current] = index;
        app.statuses[app.current] = app.statuses[app.current] === "marked" || app.statuses[app.current] === "answered-marked" ? "answered-marked" : "answered";
        persistUnfinished();
        updateCurrentQuestionState();
    }

    function clearResponse() {
        app.answers[app.current] = null;
        app.statuses[app.current] = app.statuses[app.current] === "answered-marked" || app.statuses[app.current] === "marked" ? "marked" : "not-answered";
        persistUnfinished();
        updateCurrentQuestionState();
    }

    function markForReview() {
        app.statuses[app.current] = app.answers[app.current] === null ? "marked" : "answered-marked";
        persistUnfinished();
        updateCurrentQuestionState();
    }

    function saveAndNext() {
        if (app.statuses[app.current] === "not-visited") app.statuses[app.current] = "not-answered";
        if (app.current >= app.questions.length - 1) {
            openSubmitModal();
            return;
        }
        goQuestion(app.current + 1);
    }

    function goQuestion(index) {
        if (index < 0 || index >= app.questions.length) return;
        const previousIndex = app.current;
        if (app.statuses[app.current] === "not-visited") app.statuses[app.current] = "not-answered";
        app.current = index;
        if (app.statuses[app.current] === "not-visited") app.statuses[app.current] = "not-answered";
        persistUnfinished();
        renderQuestion();
        updatePaletteButton(previousIndex);
        updatePaletteButton(app.current);
        updatePaletteSummary();
    }

    function updateCurrentQuestionState() {
        updateAnswerOptions();
        updateQuestionStatusBadge();
        updatePaletteButton(app.current);
        updatePaletteSummary();
    }

    function updateAnswerOptions() {
        const selected = app.answers[app.current];
        elements.optionButtons.forEach((button) => {
            const isSelected = Number(button.dataset.optionIndex) === selected;
            button.classList.toggle("selected", isSelected);
            button.setAttribute("aria-pressed", String(isSelected));
        });
    }

    function updateQuestionStatusBadge(status = app.statuses[app.current] || "not-visited") {
        const badge = elements.questionStatusBadge;
        if (!badge) return;
        badge.className = `question-status-badge ${status}`;
        badge.textContent = getStatusLabel(status);
    }

    function updatePaletteButton(index) {
        if (!elements.paletteRendered) return;
        const button = elements.paletteButtons?.[index];
        if (!button) return;
        const status = app.statuses[index] || "not-visited";
        button.className = `palette-btn ${status}${index === app.current ? " current" : ""}`;
        button.setAttribute("aria-label", `Question ${index + 1}, ${getStatusLabel(status)}`);
    }

    function renderPaletteSummaryShell() {
        if (!elements.paletteSummary || elements.paletteSummaryValues) return;
        const items = [
            ["answered", "Answered"],
            ["notAnswered", "Not Answered", "not-answered"],
            ["marked", "Marked"],
            ["answeredMarked", "Answered + Marked", "answered-marked"],
            ["notVisited", "Not Visited", "not-visited"]
        ];
        elements.paletteSummary.innerHTML = items.map(([key, label, status = key]) => `
            <span class="palette-summary-tile ${status}">
                <strong data-summary-count="${key}">0</strong>
                <em>${label}</em>
            </span>
        `).join("");
        elements.paletteSummaryValues = items.reduce((map, [key]) => {
            map[key] = elements.paletteSummary.querySelector(`[data-summary-count="${key}"]`);
            return map;
        }, {});
    }

    function updatePaletteSummary() {
        if (!elements.paletteSummary || !elements.paletteRendered) return;
        renderPaletteSummaryShell();
        const counts = getStatusCounts();
        Object.entries(counts).forEach(([key, value]) => {
            if (elements.paletteSummaryValues?.[key]) elements.paletteSummaryValues[key].textContent = value;
        });
    }

    function startTimer() {
        stopTimer();
        updateTimerDisplay();
        scheduleTimerTick();
    }

    function scheduleTimerTick() {
        const interval = app.remainingSeconds <= 300 ? TIMER_WARNING_INTERVAL_MS : TIMER_STANDARD_INTERVAL_MS;
        app.timerId = window.setTimeout(handleTimerTick, interval);
    }

    function handleTimerTick() {
        app.remainingSeconds = Math.max(0, Math.ceil((app.endsAt - Date.now()) / 1000));
        updateTimerDisplay();
        if (app.remainingSeconds <= 0) {
            submitQuiz("time");
            return;
        }
        scheduleTimerTick();
    }

    function stopTimer() {
        window.clearTimeout(app.timerId);
        app.timerId = null;
    }

    function updateTimerDisplay() {
        elements.timerText.textContent = formatTime(app.remainingSeconds);
        elements.timerPill.classList.toggle("warning", app.remainingSeconds <= 300);
    }

    function openSubmitModal() {
        const attempted = app.answers.filter((answer) => answer !== null).length;
        const marked = app.statuses.filter((status) => status.includes("marked")).length;
        elements.submitSummary.textContent = `Attempted ${attempted} of 50. Marked for review: ${marked}.`;
        elements.submitModal.classList.remove("hidden");
    }

    function closeSubmitModal() {
        elements.submitModal.classList.add("hidden");
    }

    function submitQuiz(reason) {
        stopTimer();
        closeSubmitModal();
        const result = calculateResult(reason);
        app.result = result;
        clearPendingPersist();
        storage.remove("unfinished");
        saveAttempt(result);
        renderResult();
        showView("result");
        syncQuizAttempt(result);
    }

    function calculateResult(reason) {
        let correct = 0;
        let wrong = 0;

        app.questions.forEach((question, index) => {
            const answer = app.answers[index];
            if (answer === null) return;
            if (answer === question.correctAnswer) correct += 1;
            else wrong += 1;
        });

        const total = app.questions.length;
        const attempted = correct + wrong;
        const unattempted = total - attempted;
        const score = Number((correct * app.quizSet.marksPerQuestion - wrong * app.quizSet.negativeMarks).toFixed(2));
        const maxScore = total * app.quizSet.marksPerQuestion;
        const percentage = maxScore ? Math.max(0, Math.round((score / maxScore) * 100)) : 0;
        const accuracy = attempted ? Math.round((correct / attempted) * 100) : 0;
        const timeTaken = Math.max(0, app.quizSet.durationMinutes * 60 - app.remainingSeconds);

        return {
            id: `attempt-${Date.now()}`,
            quizId: app.quizSet.id,
            quizTitle: app.quizSet.title,
            subject: app.quizSet.subject,
            completedAt: new Date().toISOString(),
            reason,
            total,
            attempted,
            unattempted,
            correct,
            wrong,
            score,
            maxScore,
            percentage,
            accuracy,
            timeTaken,
            difficulty: app.quizSet.difficulty || "Mixed",
            durationMinutes: app.quizSet.durationMinutes,
            subjectData: buildQuizSubjectData(),
            questions: app.questions,
            answers: app.answers,
            statuses: app.statuses,
            dashboardSynced: false,
            dashboardSyncMessage: "",
            message: getPerformanceMessage(percentage)
        };
    }

    function buildQuizSubjectData() {
        const buckets = {};
        app.questions.forEach((question, index) => {
            const name = question.subject || app.quizSet.subject || "General";
            const answer = app.answers[index];
            const attempted = answer !== null;
            const isCorrect = attempted && answer === question.correctAnswer;
            const isWrong = attempted && !isCorrect;
            const marks = isCorrect ? Number(question.marks) || 0 : isWrong ? -(Number(question.negativeMarks) || 0) : 0;

            if (!buckets[name]) {
                buckets[name] = {
                    name,
                    totalQuestions: 0,
                    attempted: 0,
                    correct: 0,
                    wrong: 0,
                    marks: 0,
                    maxMarks: 0
                };
            }

            buckets[name].totalQuestions += 1;
            buckets[name].maxMarks += Number(question.marks) || Number(app.quizSet.marksPerQuestion) || 1;
            if (attempted) buckets[name].attempted += 1;
            if (isCorrect) buckets[name].correct += 1;
            if (isWrong) buckets[name].wrong += 1;
            buckets[name].marks += marks;
        });

        return Object.keys(buckets).map((name) => {
            const subject = buckets[name];
            return {
                ...subject,
                marks: round2(subject.marks),
                maxMarks: round2(subject.maxMarks),
                accuracy: subject.attempted ? round2((subject.correct / subject.attempted) * 100) : 0,
                scorePercent: subject.maxMarks ? round2((subject.marks / subject.maxMarks) * 100) : 0
            };
        });
    }

    function saveAttempt(result) {
        const attempts = storage.read("attempts", []);
        attempts.unshift(summarizeAttempt(result));
        storage.write("attempts", attempts.slice(0, 80));
        storage.write("recentAttempts", attempts.slice(0, 10));

        const bestScores = storage.read("bestScores", {});
        bestScores[result.quizId] = Math.max(bestScores[result.quizId] || 0, result.percentage);
        storage.write("bestScores", bestScores);
    }

    function summarizeAttempt(result) {
        return {
            id: result.id,
            quizId: result.quizId,
            quizTitle: result.quizTitle,
            subject: result.subject,
            completedAt: result.completedAt,
            total: result.total,
            attempted: result.attempted,
            correct: result.correct,
            wrong: result.wrong,
            score: result.score,
            maxScore: result.maxScore,
            percentage: result.percentage,
            accuracy: result.accuracy,
            timeTaken: result.timeTaken,
            dashboardSynced: result.dashboardSynced,
            dashboardSyncMessage: result.dashboardSyncMessage
        };
    }

    function renderResult() {
        const result = app.result;
        const session = window.CandidateAuth?.getSession?.();
        views.result.innerHTML = `
            <article class="result-panel score-panel">
                <h2 id="resultTitle">${escapeHtml(result.quizTitle)}</h2>
                <span class="score-number">${result.percentage}%</span>
                <strong>${escapeHtml(result.message)}</strong>
                <p class="result-subtext">${formatMarks(result.score)}/${formatMarks(result.maxScore)} marks ${result.reason === "time" ? "- auto-submitted when time ended" : "- submitted successfully"}</p>
                <p class="result-subtext" id="dashboardSyncText">${escapeHtml(getDashboardSyncText(result, session))}</p>
            </article>
            <section class="result-panel result-grid">
                ${renderResultTile("Total questions", result.total)}
                ${renderResultTile("Attempted", result.attempted)}
                ${renderResultTile("Unattempted", result.unattempted)}
                ${renderResultTile("Correct", result.correct)}
                ${renderResultTile("Wrong", result.wrong)}
                ${renderResultTile("Accuracy", `${result.accuracy}%`)}
                ${renderResultTile("Time taken", formatTime(result.timeTaken))}
                ${renderResultTile("Score", result.score)}
            </section>
            <div class="result-actions">
                <button class="btn btn-outline" type="button" data-action="review-answers">Review Answers</button>
                <a class="btn btn-outline" href="${session ? "dashboard.html#attempts" : "login.html?next=quiz.html"}">${session ? "View Dashboard" : "Login to Save"}</a>
                <button class="btn btn-primary" type="button" data-action="back-to-quizzes">Back to Quizzes</button>
            </div>
        `;
    }

    function renderResultTile(label, value) {
        return `<div class="result-tile"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`;
    }

    async function syncQuizAttempt(result) {
        const auth = window.CandidateAuth;
        const session = auth?.getSession?.();
        if (!auth || !session || !auth.callApi) return;

        result.dashboardSyncMessage = "Saving quiz attempt to dashboard...";
        updateDashboardSyncText(result, session);

        try {
            const response = await auth.callApi(buildQuizAttemptPayload(result, session));
            result.dashboardSynced = Boolean(response.success);
            result.dashboardSyncMessage = response.message || (response.success ? "Quiz attempt saved to dashboard." : "Quiz attempt could not be saved.");
        } catch {
            result.dashboardSynced = false;
            result.dashboardSyncMessage = "Quiz saved on this device, but dashboard sync failed. Please check your connection.";
        }

        if (app.result && app.result.id === result.id) updateDashboardSyncText(result, session);
    }

    function updateDashboardSyncText(result, session) {
        const node = document.getElementById("dashboardSyncText");
        if (node) node.textContent = getDashboardSyncText(result, session);
    }

    function buildQuizAttemptPayload(result, session) {
        return {
            action: "submitQuizAttempt",
            userId: session.userId,
            mobile: session.mobile,
            email: session.email,
            quizAttemptId: result.id,
            quizId: result.quizId,
            quizTitle: result.quizTitle,
            subject: result.subject,
            difficulty: result.difficulty,
            completedAt: result.completedAt,
            submitReason: result.reason,
            totalQuestions: result.total,
            attempted: result.attempted,
            correct: result.correct,
            wrong: result.wrong,
            unattempted: result.unattempted,
            score: result.score,
            maxScore: result.maxScore,
            percentage: result.percentage,
            accuracy: result.accuracy,
            timeTaken: result.timeTaken,
            durationMinutes: result.durationMinutes,
            subjectData: result.subjectData,
            answers: result.answers,
            statuses: result.statuses,
            userAgent: navigator.userAgent || ""
        };
    }

    function getDashboardSyncText(result, session) {
        if (!session) return "Login before taking quizzes to save attempts in your dashboard.";
        if (result.dashboardSyncMessage) return result.dashboardSyncMessage;
        return result.dashboardSynced ? "Quiz attempt saved to dashboard." : "Saving quiz attempt to dashboard...";
    }

    function renderReview() {
        const result = app.result;
        if (!result) return;

        const items = result.questions.map((question, index) => renderReviewCard(question, index, result)).filter(Boolean).join("");
        views.review.innerHTML = `
            <section class="result-panel">
                <h2 id="reviewTitle">Review Answers</h2>
                <div class="review-filter-row">
                    ${["all", "correct", "wrong", "unattempted", "marked"].map((filter) => `
                        <button class="btn ${app.reviewFilter === filter ? "btn-primary" : "btn-ghost"}" type="button" data-review-filter="${filter}">${titleCase(filter)}</button>
                    `).join("")}
                </div>
            </section>
            ${items || `<article class="review-card"><p>No answers match this filter.</p></article>`}
            <div class="review-actions">
                <button class="btn btn-outline" type="button" data-action="back-to-result">Back to Result</button>
                <button class="btn btn-primary" type="button" data-action="back-to-quizzes">Back to Quizzes</button>
            </div>
        `;
    }

    function renderReviewCard(question, index, result) {
        const selected = result.answers[index];
        const marked = (result.statuses[index] || "").includes("marked");
        const state = selected === null ? "unattempted" : selected === question.correctAnswer ? "correct" : "wrong";

        if (app.reviewFilter !== "all" && app.reviewFilter !== state && !(app.reviewFilter === "marked" && marked)) {
            return "";
        }

        return `
            <article class="review-card">
                <div class="question-meta">
                    <span class="status-badge">${titleCase(state)}</span>
                    ${marked ? `<span class="status-badge">Marked</span>` : ""}
                    <span class="status-badge">Q${index + 1}</span>
                </div>
                <h3>${escapeHtml(sanitizeQuestionText(question.question))}</h3>
                <div class="review-answer ${state === "wrong" ? "wrong" : ""}">User answer: ${selected === null ? "Not attempted" : escapeHtml(question.options[selected])}</div>
                <div class="review-answer correct">Correct answer: ${escapeHtml(question.options[question.correctAnswer])}</div>
                <p><strong>Explanation:</strong> ${escapeHtml(question.explanation)}</p>
            </article>
        `;
    }

    function persistUnfinished(immediate = false) {
        if (immediate) {
            clearPendingPersist();
            writeUnfinishedAttempt();
            return;
        }
        if (app.persistTimerId) return;
        app.persistTimerId = window.setTimeout(writeUnfinishedAttempt, PERSIST_IDLE_TIMEOUT_MS);
    }

    function clearPendingPersist() {
        if (!app.persistTimerId) return;
        window.clearTimeout(app.persistTimerId);
        app.persistTimerId = null;
    }

    function writeUnfinishedAttempt() {
        app.persistTimerId = null;
        if (!app.quizSet || views.exam.classList.contains("hidden") || !app.questions.length) return;
        const attempt = {
            quizId: app.quizSet.id,
            answers: app.answers,
            statuses: app.statuses,
            current: app.current,
            startedAt: app.startedAt,
            endsAt: app.endsAt
        };
        const signature = JSON.stringify(attempt);
        if (signature === app.lastPersistSignature) return;
        app.lastPersistSignature = signature;
        storage.write("unfinished", attempt);
    }

    function openPalette() {
        if (!elements.paletteRendered) renderPalette();
        elements.palettePanel.classList.add("open");
    }

    function closePalette() {
        elements.palettePanel.classList.remove("open");
    }

    function showListMessage(message, type) {
        elements.quizListMessage.textContent = message;
        elements.quizListMessage.className = `message-box ${type || ""}`.trim();
    }

    function hideListMessage() {
        elements.quizListMessage.textContent = "";
        elements.quizListMessage.className = "message-box hidden";
    }

    function getPerformanceMessage(percentage) {
        if (percentage >= 85) return "Rank booster performance";
        if (percentage >= 70) return "Strong exam readiness";
        if (percentage >= 50) return "Good base, improve accuracy";
        return "Needs focused revision";
    }

    function formatTime(seconds) {
        const safe = Math.max(0, Number(seconds) || 0);
        const minutes = String(Math.floor(safe / 60)).padStart(2, "0");
        const secs = String(safe % 60).padStart(2, "0");
        return `${minutes}:${secs}`;
    }

    function formatDate(value) {
        const date = new Date(value);
        if (Number.isNaN(date.getTime())) return "Not attempted";
        return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
    }

    function formatMarks(value) {
        const number = Number(value);
        return Number.isFinite(number) ? number.toFixed(2) : "0.00";
    }

    function round2(value) {
        const number = Number(value);
        return Number.isFinite(number) ? Math.round((number + Number.EPSILON) * 100) / 100 : 0;
    }

    function titleCase(value) {
        return String(value).replace("-", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
    }

    function getStatusCounts() {
        return app.statuses.reduce((counts, status) => {
            if (status === "answered") counts.answered += 1;
            else if (status === "not-answered") counts.notAnswered += 1;
            else if (status === "marked") counts.marked += 1;
            else if (status === "answered-marked") counts.answeredMarked += 1;
            else counts.notVisited += 1;
            return counts;
        }, {
            answered: 0,
            notAnswered: 0,
            marked: 0,
            answeredMarked: 0,
            notVisited: 0
        });
    }

    function getStatusLabel(status) {
        return {
            "answered": "Answered",
            "not-answered": "Not Answered",
            "marked": "Marked for Review",
            "answered-marked": "Answered + Marked",
            "not-visited": "Not Visited"
        }[status] || "Not Visited";
    }

    function escapeHtml(value) {
        return String(value ?? "").replace(/[&<>"']/g, (character) => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            "\"": "&quot;",
            "'": "&#039;"
        }[character]));
    }

    function escapeAttr(value) {
        return escapeHtml(value);
    }
}());
