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
        reviewFilter: "all"
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
        elements.questionPalette = document.getElementById("questionPalette");
        elements.submitModal = document.getElementById("submitModal");
        elements.submitSummary = document.getElementById("submitSummary");
    }

    function bindEvents() {
        document.body.addEventListener("click", handleClick);
        document.addEventListener("keydown", handleKeyboard);
        window.addEventListener("beforeunload", persistUnfinished);
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
        window.scrollTo({ top: 0, behavior: "smooth" });
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

    function startQuiz(quizId) {
        const set = registry.getQuizById(quizId);
        if (!set) return;

        if (!set.validation || !set.validation.isComplete) {
            showListMessage("This quiz needs 50 complete questions before it can start.", "error");
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
        renderExam();
        startTimer();
        persistUnfinished();
        showView("exam");
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
        renderExam();
        startTimer();
        showView("exam");
    }

    function getQuestionsForSet(set) {
        return Array.isArray(set.questions)
            ? set.questions.slice(0, 50).map((question) => ({
                ...question,
                question: sanitizeQuestionText(question.question)
            }))
            : [];
    }

    function renderExam() {
        const question = app.questions[app.current];
        if (!question) return;

        elements.examSubject.textContent = app.quizSet.subject;
        elements.examTitle.textContent = app.quizSet.title;
        elements.currentQuestionNo.textContent = app.current + 1;
        elements.totalQuestionNo.textContent = app.questions.length;
        elements.quizProgress.style.width = `${((app.current + 1) / app.questions.length) * 100}%`;

        elements.questionCard.innerHTML = `
            <div class="question-meta">
                <span class="meta-pill">${escapeHtml(question.subject)}</span>
                <span class="meta-pill">${escapeHtml(question.topic)}</span>
                <span class="meta-pill">${escapeHtml(question.difficulty)}</span>
                <span class="meta-pill">+${question.marks}, -${question.negativeMarks}</span>
            </div>
            <h2 class="question-title">${escapeHtml(sanitizeQuestionText(question.question))}</h2>
            <div class="option-list" role="radiogroup" aria-label="Answer options">
                ${question.options.map((option, index) => `
                    <button class="answer-option ${app.answers[app.current] === index ? "selected" : ""}" type="button" data-option-index="${index}" aria-pressed="${app.answers[app.current] === index}">
                        <span class="option-key">${String.fromCharCode(65 + index)}</span>
                        <span>${escapeHtml(option)}</span>
                    </button>
                `).join("")}
            </div>
        `;

        renderPalette();
        updateTimerDisplay();
    }

    function renderPalette() {
        elements.questionPalette.innerHTML = app.questions.map((_question, index) => {
            const status = app.statuses[index] || "not-visited";
            return `<button class="palette-btn ${status} ${index === app.current ? "current" : ""}" type="button" data-question-index="${index}" aria-label="Question ${index + 1}, ${status.replace("-", " ")}">${index + 1}</button>`;
        }).join("");
    }

    function selectOption(index) {
        app.answers[app.current] = index;
        app.statuses[app.current] = app.statuses[app.current] === "marked" || app.statuses[app.current] === "answered-marked" ? "answered-marked" : "answered";
        persistUnfinished();
        renderExam();
    }

    function clearResponse() {
        app.answers[app.current] = null;
        app.statuses[app.current] = app.statuses[app.current] === "answered-marked" || app.statuses[app.current] === "marked" ? "marked" : "not-answered";
        persistUnfinished();
        renderExam();
    }

    function markForReview() {
        app.statuses[app.current] = app.answers[app.current] === null ? "marked" : "answered-marked";
        persistUnfinished();
        renderExam();
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
        if (app.statuses[app.current] === "not-visited") app.statuses[app.current] = "not-answered";
        app.current = index;
        if (app.statuses[app.current] === "not-visited") app.statuses[app.current] = "not-answered";
        persistUnfinished();
        renderExam();
    }

    function startTimer() {
        stopTimer();
        updateTimerDisplay();
        app.timerId = window.setInterval(function () {
            app.remainingSeconds = Math.max(0, Math.ceil((app.endsAt - Date.now()) / 1000));
            updateTimerDisplay();
            persistUnfinished();
            if (app.remainingSeconds <= 0) submitQuiz("time");
        }, 1000);
    }

    function stopTimer() {
        window.clearInterval(app.timerId);
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
        storage.remove("unfinished");
        saveAttempt(result);
        renderResult();
        showView("result");
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
        const percentage = Math.max(0, Math.round((score / total) * 100));
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
            percentage,
            accuracy,
            timeTaken,
            questions: app.questions,
            answers: app.answers,
            statuses: app.statuses,
            message: getPerformanceMessage(percentage)
        };
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
            percentage: result.percentage,
            accuracy: result.accuracy,
            timeTaken: result.timeTaken
        };
    }

    function renderResult() {
        const result = app.result;
        views.result.innerHTML = `
            <article class="result-panel score-panel">
                <h2 id="resultTitle">${escapeHtml(result.quizTitle)}</h2>
                <span class="score-number">${result.percentage}%</span>
                <strong>${escapeHtml(result.message)}</strong>
                <p class="result-subtext">${result.score}/50 marks ${result.reason === "time" ? "- auto-submitted when time ended" : "- submitted successfully"}</p>
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
                <button class="btn btn-primary" type="button" data-action="back-to-quizzes">Back to Quizzes</button>
            </div>
        `;
    }

    function renderResultTile(label, value) {
        return `<div class="result-tile"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`;
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

    function persistUnfinished() {
        if (!app.quizSet || views.exam.classList.contains("hidden") || !app.questions.length) return;
        storage.write("unfinished", {
            quizId: app.quizSet.id,
            answers: app.answers,
            statuses: app.statuses,
            current: app.current,
            startedAt: app.startedAt,
            endsAt: app.endsAt
        });
    }

    function openPalette() {
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

    function titleCase(value) {
        return String(value).replace("-", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
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
