(function () {
    "use strict";

    const registry = window.GJU_QUIZZES || {
        subjects: [],
        quizzes: [],
        getQuizzesBySubject: function () { return []; },
        getQuizById: function () { return null; },
        loadQuizById: function () { return null; }
    };
    const storage = window.QuizStorage || {
        read: function (_key, fallback) { return fallback; },
        write: function () { return false; },
        remove: function () {}
    };
    const sanitizeQuestionText = window.GJU_SANITIZE_QUESTION_TEXT || function (value) {
        return String(value || "").trim().replace(/\s+/g, " ");
    };

    const ALL_SUBJECTS = "All";
    const PERSIST_DELAY_MS = 900;
    const subjectIcons = {
        Mathematics: "fa-calculator",
        English: "fa-language",
        Hindi: "fa-book",
        "General Awareness": "fa-globe-asia",
        Reasoning: "fa-brain",
        Computer: "fa-laptop-code",
        All: "fa-layer-group"
    };

    const views = {};
    const elements = {};
    const state = {
        subject: ALL_SUBJECTS,
        search: "",
        quizSet: null,
        questions: [],
        answers: [],
        statuses: [],
        current: 0,
        startedAt: 0,
        endsAt: 0,
        remainingSeconds: 0,
        timerId: 0,
        persistTimerId: 0,
        result: null,
        reviewFilter: "all",
        isLoading: false
    };

    document.addEventListener("DOMContentLoaded", initQuizPage);

    function initQuizPage() {
        cacheDom();
        bindEvents();
        renderHome();
        openInitialRoute();
    }

    function cacheDom() {
        views.home = document.getElementById("homeView");
        views.exam = document.getElementById("examView");
        views.result = document.getElementById("resultView");
        views.review = document.getElementById("reviewView");

        elements.subjectFilters = document.getElementById("subjectFilters");
        elements.quizSetList = document.getElementById("quizSetList");
        elements.quizSearch = document.getElementById("quizSearch");
        elements.quizMessage = document.getElementById("quizMessage");
        elements.selectedSubjectLabel = document.getElementById("selectedSubjectLabel");
        elements.availableQuizCount = document.getElementById("availableQuizCount");
        elements.savedAttemptCount = document.getElementById("savedAttemptCount");
        elements.bestScoreValue = document.getElementById("bestScoreValue");
        elements.recentAttempts = document.getElementById("recentAttempts");

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
    }

    function bindEvents() {
        document.body.addEventListener("click", handleClick);
        document.addEventListener("keydown", handleKeyboard);
        elements.quizSearch?.addEventListener("input", function (event) {
            state.search = event.target.value.trim().toLowerCase();
            renderQuizList();
        });
        window.addEventListener("beforeunload", function () { persistUnfinished(true); });
        window.addEventListener("pagehide", function () { persistUnfinished(true); });
        document.addEventListener("visibilitychange", function () {
            if (document.hidden) persistUnfinished(true);
        });
    }

    function handleClick(event) {
        const subjectButton = event.target.closest("[data-subject-filter]");
        const startButton = event.target.closest("[data-start-quiz]");
        const optionButton = event.target.closest("[data-option-index]");
        const paletteButton = event.target.closest("[data-question-index]");
        const reviewButton = event.target.closest("[data-review-filter]");
        const actionButton = event.target.closest("[data-action]");

        if (subjectButton) {
            setSubject(subjectButton.dataset.subjectFilter || ALL_SUBJECTS);
            return;
        }

        if (startButton) {
            startQuiz(startButton.dataset.startQuiz);
            return;
        }

        if (optionButton) {
            selectOption(Number(optionButton.dataset.optionIndex));
            return;
        }

        if (paletteButton) {
            goQuestion(Number(paletteButton.dataset.questionIndex));
            closePalette();
            return;
        }

        if (reviewButton) {
            state.reviewFilter = reviewButton.dataset.reviewFilter || "all";
            renderReview();
            return;
        }

        if (!actionButton) return;

        const actions = {
            "prev-question": function () { goQuestion(state.current - 1); },
            "save-next": saveAndNext,
            "mark-review": markForReview,
            "clear-response": clearResponse,
            "submit-confirm": openSubmitModal,
            "submit-now": function () { submitQuiz("manual"); },
            "cancel-submit": closeSubmitModal,
            "toggle-palette": togglePalette,
            "close-palette": closePalette,
            "review-answers": function () {
                state.reviewFilter = "all";
                renderReview();
                showView("review");
            },
            "back-result": function () { showView("result"); },
            "back-home": function () {
                stopTimer();
                closeSubmitModal();
                renderHome();
                showView("home");
            }
        };

        const action = actions[actionButton.dataset.action];
        if (action) action();
    }

    function handleKeyboard(event) {
        const key = event.key.toLowerCase();
        if (key === "escape") {
            closeSubmitModal();
            closePalette();
            return;
        }
        if (!isViewVisible("exam") || isModalOpen() || isTypingTarget(event.target)) return;

        if (["1", "2", "3", "4"].includes(key)) {
            event.preventDefault();
            selectOption(Number(key) - 1);
        } else if (key === "n") {
            event.preventDefault();
            saveAndNext();
        } else if (key === "p") {
            event.preventDefault();
            goQuestion(state.current - 1);
        } else if (key === "m") {
            event.preventDefault();
            markForReview();
        }
    }

    function isTypingTarget(target) {
        return Boolean(target && target.closest && target.closest("input, textarea, select, [contenteditable='true']"));
    }

    function openInitialRoute() {
        const params = new URLSearchParams(window.location.search);
        const subject = params.get("subject");
        const quizId = params.get("quiz");

        if (subject && getSubjects().includes(subject)) setSubject(subject, false);
        if (quizId && registry.getQuizById(quizId)) {
            startQuiz(quizId);
            return;
        }

        showView("home");
    }

    function renderHome() {
        renderStats();
        renderSubjectFilters();
        renderQuizList();
        renderRecentAttempts();
    }

    function renderStats() {
        const attempts = getAttempts();
        const best = attempts.reduce(function (highest, attempt) {
            return Math.max(highest, Number(attempt.percentage) || 0);
        }, 0);

        setText(elements.availableQuizCount, String(getAllQuizzes().length));
        setText(elements.savedAttemptCount, String(attempts.length));
        setText(elements.bestScoreValue, `${Math.round(best)}%`);
    }

    function renderSubjectFilters() {
        const subjects = [ALL_SUBJECTS].concat(getSubjects());
        elements.subjectFilters.innerHTML = subjects.map(function (subject) {
            const count = subject === ALL_SUBJECTS ? getAllQuizzes().length : registry.getQuizzesBySubject(subject).length;
            const active = subject === state.subject;
            return `
                <button class="subject-chip${active ? " is-active" : ""}" type="button" data-subject-filter="${escapeAttr(subject)}" role="tab" aria-selected="${active}">
                    <i class="fas ${subjectIcons[subject] || "fa-book"}" aria-hidden="true"></i>
                    <strong>${escapeHtml(subject === ALL_SUBJECTS ? "All Subjects" : subject)}</strong>
                    <span>${count}</span>
                </button>
            `;
        }).join("");
    }

    function renderQuizList() {
        const quizzes = getFilteredQuizzes();
        setText(elements.selectedSubjectLabel, state.subject === ALL_SUBJECTS ? "All Subjects" : state.subject);

        if (!quizzes.length) {
            elements.quizSetList.innerHTML = "";
            showMessage("No quiz set matches your search.", "error");
            return;
        }

        hideMessage();
        elements.quizSetList.innerHTML = quizzes.map(renderQuizCard).join("");
    }

    function renderQuizCard(quiz) {
        const stats = getQuizStats(quiz.id);
        const resume = getSavedUnfinished();
        const canResume = resume && resume.quizId === quiz.id;
        return `
            <article class="quiz-set-card">
                <div class="quiz-card-head">
                    <span class="quiz-card-kicker">${escapeHtml(quiz.subject)}</span>
                    <h3>${escapeHtml(quiz.title)}</h3>
                    <p>${escapeHtml(quiz.description || "Practice set for government exam preparation.")}</p>
                    <div class="quiz-set-meta">
                        <span class="meta-pill">${escapeHtml(quiz.difficulty || "Mixed")}</span>
                        <span class="meta-pill">${formatNumber(quiz.totalQuestions)} Questions</span>
                        <span class="meta-pill">${formatNumber(quiz.durationMinutes)} Minutes</span>
                        <span class="meta-pill">+${formatMarks(quiz.marksPerQuestion)}</span>
                        <span class="meta-pill">-${formatMarks(quiz.negativeMarks)}</span>
                        ${canResume ? '<span class="meta-pill">Resume available</span>' : ""}
                    </div>
                </div>
                <div class="quiz-card-foot">
                    <div class="quiz-performance">
                        <div class="perf-tile"><span>Best</span><strong>${formatNumber(stats.bestScore)}%</strong></div>
                        <div class="perf-tile"><span>Attempts</span><strong>${formatNumber(stats.attemptCount)}</strong></div>
                        <div class="perf-tile"><span>Last</span><strong>${escapeHtml(stats.lastAttempt)}</strong></div>
                    </div>
                    <button class="quiz-btn quiz-btn-primary" type="button" data-start-quiz="${escapeAttr(quiz.id)}">
                        <i class="fas fa-play" aria-hidden="true"></i> ${canResume ? "Resume / Start" : "Start Test"}
                    </button>
                </div>
            </article>
        `;
    }

    function renderRecentAttempts() {
        const attempts = getAttempts().slice(0, 5);
        if (!attempts.length) {
            elements.recentAttempts.innerHTML = '<div class="history-empty">Completed quiz attempts will appear here on this device.</div>';
            return;
        }

        elements.recentAttempts.innerHTML = attempts.map(function (attempt) {
            return `
                <div class="history-item">
                    <span>${escapeHtml(formatDate(attempt.completedAt))}</span>
                    <strong>${escapeHtml(attempt.quizTitle || "Quiz Attempt")}</strong>
                    <small>${formatNumber(attempt.percentage)}% | ${formatMarks(attempt.score)}/${formatMarks(attempt.maxScore)} marks</small>
                </div>
            `;
        }).join("");
    }

    function setSubject(subject, rerender = true) {
        state.subject = subject && (subject === ALL_SUBJECTS || getSubjects().includes(subject)) ? subject : ALL_SUBJECTS;
        if (rerender) {
            renderSubjectFilters();
            renderQuizList();
        }
    }

    async function startQuiz(quizId, forceNew = false) {
        if (state.isLoading) return;
        const meta = registry.getQuizById(quizId);
        if (!meta) return;

        state.isLoading = true;
        showMessage("Loading quiz...", "info");

        try {
            const quizSet = await loadQuizSet(quizId);
            if (!quizSet || !quizSet.validation || !quizSet.validation.isComplete) {
                showMessage("This quiz is not ready yet.", "error");
                return;
            }

            const saved = getSavedUnfinished();
            if (!forceNew && saved && saved.quizId === quizId && window.confirm("Resume your unfinished attempt?")) {
                resumeAttempt(quizSet, saved);
            } else {
                beginNewAttempt(quizSet);
            }
        } catch (error) {
            showMessage("Quiz could not load. Please try again.", "error");
        } finally {
            state.isLoading = false;
        }
    }

    async function loadQuizSet(quizId) {
        const loaded = await registry.loadQuizById?.(quizId);
        return loaded || registry.getQuizById(quizId);
    }

    function beginNewAttempt(quizSet) {
        const questions = getQuestionsForSet(quizSet);
        state.quizSet = quizSet;
        state.questions = questions;
        state.answers = questions.map(function () { return null; });
        state.statuses = questions.map(function (_question, index) {
            return index === 0 ? "not-answered" : "not-visited";
        });
        state.current = 0;
        state.startedAt = Date.now();
        state.remainingSeconds = Math.max(1, Number(quizSet.durationMinutes) || 30) * 60;
        state.endsAt = state.startedAt + state.remainingSeconds * 1000;
        state.result = null;
        renderExam();
        startTimer();
        persistUnfinished(true);
        showView("exam");
    }

    function resumeAttempt(quizSet, saved) {
        const questions = getQuestionsForSet(quizSet);
        state.quizSet = quizSet;
        state.questions = questions;
        state.answers = normalizeArray(saved.answers, questions.length, null);
        state.statuses = normalizeArray(saved.statuses, questions.length, "not-visited");
        state.current = clamp(Number(saved.current) || 0, 0, questions.length - 1);
        state.startedAt = Number(saved.startedAt) || Date.now();
        state.endsAt = Number(saved.endsAt) || Date.now() + Math.max(1, Number(quizSet.durationMinutes) || 30) * 60 * 1000;
        state.remainingSeconds = Math.max(0, Math.ceil((state.endsAt - Date.now()) / 1000));
        if (state.remainingSeconds <= 0) {
            submitQuiz("time");
            return;
        }
        renderExam();
        startTimer();
        showView("exam");
    }

    function getQuestionsForSet(quizSet) {
        const questions = Array.isArray(quizSet.questions) ? quizSet.questions : [];
        return questions.slice(0, Number(quizSet.totalQuestions) || 50).map(function (question, index) {
            return {
                id: question.id || `${quizSet.id}-${index + 1}`,
                subject: question.subject || quizSet.subject,
                topic: question.topic || "General",
                difficulty: question.difficulty || quizSet.difficulty || "Mixed",
                question: sanitizeQuestionText(question.question),
                options: Array.isArray(question.options) ? question.options.slice(0, 4) : [],
                correctAnswer: Number(question.correctAnswer),
                explanation: question.explanation || "Explanation is not available.",
                marks: Number(question.marks) || Number(quizSet.marksPerQuestion) || 1,
                negativeMarks: Number(question.negativeMarks) || Number(quizSet.negativeMarks) || 0
            };
        });
    }

    function renderExam() {
        renderQuestion();
        renderPalette();
        updateTimerDisplay();
    }

    function renderQuestion() {
        const question = state.questions[state.current];
        if (!question) return;
        const status = state.statuses[state.current] || "not-visited";

        setText(elements.examSubject, state.quizSet.subject);
        setText(elements.examTitle, state.quizSet.title);
        setText(elements.currentQuestionNo, String(state.current + 1));
        setText(elements.totalQuestionNo, String(state.questions.length));
        elements.quizProgress.style.width = `${((state.current + 1) / state.questions.length) * 100}%`;

        elements.questionCard.innerHTML = `
            <div class="question-card-head">
                <div class="question-number">Question ${state.current + 1}</div>
                <div class="question-meta">
                    <span class="meta-pill">${escapeHtml(question.subject || state.quizSet.subject)}</span>
                    <span class="meta-pill">${escapeHtml(question.topic || "Topic")}</span>
                    <span class="meta-pill">${escapeHtml(question.difficulty || "Mixed")}</span>
                </div>
                <span class="question-status ${status}">${escapeHtml(getStatusLabel(status))}</span>
            </div>
            <h2 class="question-title">${escapeHtml(question.question)}</h2>
            <div class="option-list" role="radiogroup" aria-label="Answer options">
                ${question.options.map(function (option, index) {
                    const selected = state.answers[state.current] === index;
                    return `
                        <button class="answer-option${selected ? " selected" : ""}" type="button" data-option-index="${index}" aria-pressed="${selected}">
                            <span class="option-key">${String.fromCharCode(65 + index)}</span>
                            <span>${escapeHtml(option)}</span>
                        </button>
                    `;
                }).join("")}
            </div>
            <div class="question-footnote">
                <span><i class="fas fa-check" aria-hidden="true"></i> +${formatMarks(question.marks)} marks</span>
                <span><i class="fas fa-minus-circle" aria-hidden="true"></i> -${formatMarks(question.negativeMarks)} negative</span>
            </div>
        `;
    }

    function renderPalette() {
        if (!state.questions.length) return;
        const counts = getStatusCounts();
        elements.paletteSummary.innerHTML = [
            ["answered", "Answered", counts.answered],
            ["not-answered", "Not Answered", counts.notAnswered],
            ["marked", "Marked", counts.marked],
            ["answered-marked", "Answered + Marked", counts.answeredMarked],
            ["not-visited", "Not Visited", counts.notVisited]
        ].map(function ([status, label, count]) {
            return `<div class="palette-summary-tile ${status}"><strong>${count}</strong><span>${label}</span></div>`;
        }).join("");

        elements.questionPalette.innerHTML = state.questions.map(function (_question, index) {
            const status = state.statuses[index] || "not-visited";
            const current = index === state.current ? " current" : "";
            return `<button class="palette-btn ${status}${current}" type="button" data-question-index="${index}" aria-label="Question ${index + 1}, ${getStatusLabel(status)}">${index + 1}</button>`;
        }).join("");
    }

    function selectOption(index) {
        if (!state.questions[state.current] || index < 0 || index > 3) return;
        const currentStatus = state.statuses[state.current];
        state.answers[state.current] = index;
        state.statuses[state.current] = currentStatus === "marked" || currentStatus === "answered-marked"
            ? "answered-marked"
            : "answered";
        persistUnfinished();
        renderQuestion();
        renderPalette();
    }

    function clearResponse() {
        if (!state.questions[state.current]) return;
        const currentStatus = state.statuses[state.current];
        state.answers[state.current] = null;
        state.statuses[state.current] = currentStatus === "answered-marked" || currentStatus === "marked"
            ? "marked"
            : "not-answered";
        persistUnfinished();
        renderQuestion();
        renderPalette();
    }

    function markForReview() {
        if (!state.questions[state.current]) return;
        state.statuses[state.current] = state.answers[state.current] === null ? "marked" : "answered-marked";
        persistUnfinished();
        renderQuestion();
        renderPalette();
    }

    function saveAndNext() {
        if (!state.questions[state.current]) return;
        if (state.statuses[state.current] === "not-visited") state.statuses[state.current] = "not-answered";
        if (state.current >= state.questions.length - 1) {
            openSubmitModal();
            return;
        }
        goQuestion(state.current + 1);
    }

    function goQuestion(index) {
        if (index < 0 || index >= state.questions.length) return;
        if (state.statuses[state.current] === "not-visited") state.statuses[state.current] = "not-answered";
        state.current = index;
        if (state.statuses[state.current] === "not-visited") state.statuses[state.current] = "not-answered";
        persistUnfinished();
        renderQuestion();
        renderPalette();
    }

    function openSubmitModal() {
        const attempted = state.answers.filter(function (answer) { return answer !== null; }).length;
        const marked = state.statuses.filter(function (status) { return String(status).includes("marked"); }).length;
        elements.submitSummary.textContent = `Attempted ${attempted} of ${state.questions.length}. Marked for review: ${marked}.`;
        elements.submitModal.classList.remove("hidden");
    }

    function closeSubmitModal() {
        elements.submitModal.classList.add("hidden");
    }

    function togglePalette() {
        elements.palettePanel.classList.toggle("open");
    }

    function closePalette() {
        elements.palettePanel.classList.remove("open");
    }

    function isModalOpen() {
        return !elements.submitModal.classList.contains("hidden");
    }

    function startTimer() {
        stopTimer();
        tickTimer();
        state.timerId = window.setInterval(tickTimer, 1000);
    }

    function stopTimer() {
        window.clearInterval(state.timerId);
        state.timerId = 0;
    }

    function tickTimer() {
        state.remainingSeconds = Math.max(0, Math.ceil((state.endsAt - Date.now()) / 1000));
        updateTimerDisplay();
        if (state.remainingSeconds <= 0 && state.quizSet) submitQuiz("time");
    }

    function updateTimerDisplay() {
        setText(elements.timerText, formatTime(state.remainingSeconds));
        elements.timerPill.classList.toggle("warning", state.remainingSeconds <= 300);
    }

    function submitQuiz(reason) {
        if (!state.quizSet || !state.questions.length) return;
        stopTimer();
        closeSubmitModal();
        const result = calculateResult(reason);
        state.result = result;
        clearPendingPersist();
        storage.remove("unfinished");
        saveAttempt(result);
        renderResult();
        showView("result");
    }

    function calculateResult(reason) {
        let correct = 0;
        let wrong = 0;

        state.questions.forEach(function (question, index) {
            const answer = state.answers[index];
            if (answer === null) return;
            if (answer === question.correctAnswer) correct += 1;
            else wrong += 1;
        });

        const total = state.questions.length;
        const attempted = correct + wrong;
        const unattempted = total - attempted;
        const score = round2(correct * (Number(state.quizSet.marksPerQuestion) || 1) - wrong * (Number(state.quizSet.negativeMarks) || 0));
        const maxScore = round2(total * (Number(state.quizSet.marksPerQuestion) || 1));
        const percentage = maxScore ? Math.max(0, round2((score / maxScore) * 100)) : 0;
        const accuracy = attempted ? round2((correct / attempted) * 100) : 0;
        const timeTaken = Math.max(0, Math.round(((Number(state.quizSet.durationMinutes) || 30) * 60) - state.remainingSeconds));

        return {
            id: `attempt-${Date.now()}`,
            quizId: state.quizSet.id,
            quizTitle: state.quizSet.title,
            subject: state.quizSet.subject,
            difficulty: state.quizSet.difficulty || "Mixed",
            completedAt: new Date().toISOString(),
            reason: reason || "manual",
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
            durationMinutes: Number(state.quizSet.durationMinutes) || 30,
            subjectData: buildSubjectData(),
            questions: state.questions,
            answers: state.answers.slice(),
            statuses: state.statuses.slice(),
            message: getPerformanceMessage(percentage)
        };
    }

    function buildSubjectData() {
        const buckets = {};
        state.questions.forEach(function (question, index) {
            const name = question.subject || state.quizSet.subject || "General";
            const selected = state.answers[index];
            const attempted = selected !== null;
            const correct = attempted && selected === question.correctAnswer;
            const wrong = attempted && !correct;
            const marks = correct ? Number(question.marks) || 0 : wrong ? -(Number(question.negativeMarks) || 0) : 0;

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
            buckets[name].maxMarks += Number(question.marks) || 1;
            if (attempted) buckets[name].attempted += 1;
            if (correct) buckets[name].correct += 1;
            if (wrong) buckets[name].wrong += 1;
            buckets[name].marks += marks;
        });

        return Object.keys(buckets).map(function (name) {
            const subject = buckets[name];
            return {
                ...subject,
                marks: round2(subject.marks),
                maxMarks: round2(subject.maxMarks),
                accuracy: subject.attempted ? round2((subject.correct / subject.attempted) * 100) : 0
            };
        });
    }

    function saveAttempt(result) {
        const attempts = getAttempts();
        attempts.unshift(summarizeAttempt(result));
        storage.write("attempts", attempts.slice(0, 80));
        storage.write("recentAttempts", attempts.slice(0, 10));

        const bestScores = storage.read("bestScores", {});
        bestScores[result.quizId] = Math.max(Number(bestScores[result.quizId]) || 0, Number(result.percentage) || 0);
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
            timeTaken: result.timeTaken
        };
    }

    function renderResult() {
        const result = state.result;
        if (!result) return;

        views.result.innerHTML = `
            <article class="result-panel score-panel">
                <span class="result-eyebrow">${escapeHtml(result.subject)}</span>
                <h2 id="resultTitle">${escapeHtml(result.quizTitle)}</h2>
                <span class="score-number">${formatNumber(result.percentage)}%</span>
                <strong>${escapeHtml(result.message)}</strong>
                <p class="result-subtext">${formatMarks(result.score)}/${formatMarks(result.maxScore)} marks ${result.reason === "time" ? "- auto-submitted when time ended" : "- submitted successfully"}</p>
            </article>
            <section class="result-panel">
                <div class="result-grid">
                    ${renderResultTile("Total", result.total)}
                    ${renderResultTile("Attempted", result.attempted)}
                    ${renderResultTile("Unattempted", result.unattempted)}
                    ${renderResultTile("Correct", result.correct)}
                    ${renderResultTile("Wrong", result.wrong)}
                    ${renderResultTile("Accuracy", `${formatNumber(result.accuracy)}%`)}
                    ${renderResultTile("Time", formatTime(result.timeTaken))}
                    ${renderResultTile("Score", formatMarks(result.score))}
                </div>
            </section>
            <section class="result-panel">
                <h2>Subject Scorecard</h2>
                <div class="result-grid">
                    ${result.subjectData.map(function (subject) {
                        return renderResultTile(subject.name, `${formatMarks(subject.marks)}/${formatMarks(subject.maxMarks)} | ${formatNumber(subject.accuracy)}%`);
                    }).join("")}
                </div>
            </section>
            <div class="result-actions">
                <button class="quiz-btn quiz-btn-outline" type="button" data-action="review-answers">Review Answers</button>
                <button class="quiz-btn quiz-btn-primary" type="button" data-start-quiz="${escapeAttr(result.quizId)}">Retake Test</button>
                <button class="quiz-btn quiz-btn-ghost" type="button" data-action="back-home">Back to Quizzes</button>
            </div>
        `;
    }

    function renderResultTile(label, value) {
        return `<div class="result-tile"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`;
    }

    function renderReview() {
        const result = state.result;
        if (!result) return;

        const cards = result.questions.map(function (question, index) {
            return renderReviewCard(question, index, result);
        }).filter(Boolean).join("");

        views.review.innerHTML = `
            <section class="result-panel">
                <h2 id="reviewTitle">Review Answers</h2>
                <div class="review-filter-row">
                    ${["all", "correct", "wrong", "unattempted", "marked"].map(function (filter) {
                        return `<button class="${state.reviewFilter === filter ? "is-active" : ""}" type="button" data-review-filter="${filter}">${escapeHtml(titleCase(filter))}</button>`;
                    }).join("")}
                </div>
            </section>
            ${cards || '<article class="review-card"><p>No answers match this filter.</p></article>'}
            <div class="review-actions">
                <button class="quiz-btn quiz-btn-outline" type="button" data-action="back-result">Back to Result</button>
                <button class="quiz-btn quiz-btn-primary" type="button" data-action="back-home">Back to Quizzes</button>
            </div>
        `;
    }

    function renderReviewCard(question, index, result) {
        const selected = result.answers[index];
        const marked = String(result.statuses[index] || "").includes("marked");
        const answerState = selected === null ? "unattempted" : selected === question.correctAnswer ? "correct" : "wrong";

        if (state.reviewFilter !== "all" && state.reviewFilter !== answerState && !(state.reviewFilter === "marked" && marked)) {
            return "";
        }

        return `
            <article class="review-card">
                <div class="question-meta">
                    <span class="meta-pill">Q${index + 1}</span>
                    <span class="meta-pill">${escapeHtml(titleCase(answerState))}</span>
                    ${marked ? '<span class="meta-pill">Marked</span>' : ""}
                </div>
                <h3>${escapeHtml(question.question)}</h3>
                <div class="review-answer ${answerState === "wrong" ? "wrong" : ""}">Your answer: ${selected === null ? "Not attempted" : escapeHtml(question.options[selected])}</div>
                <div class="review-answer correct">Correct answer: ${escapeHtml(question.options[question.correctAnswer])}</div>
                <p><strong>Explanation:</strong> ${escapeHtml(question.explanation)}</p>
            </article>
        `;
    }

    function persistUnfinished(immediate = false) {
        if (!state.quizSet || !isViewVisible("exam") || !state.questions.length) return;
        if (immediate) {
            clearPendingPersist();
            writeUnfinished();
            return;
        }
        if (state.persistTimerId) return;
        state.persistTimerId = window.setTimeout(writeUnfinished, PERSIST_DELAY_MS);
    }

    function clearPendingPersist() {
        window.clearTimeout(state.persistTimerId);
        state.persistTimerId = 0;
    }

    function writeUnfinished() {
        state.persistTimerId = 0;
        if (!state.quizSet || !isViewVisible("exam")) return;
        storage.write("unfinished", {
            quizId: state.quizSet.id,
            answers: state.answers,
            statuses: state.statuses,
            current: state.current,
            startedAt: state.startedAt,
            endsAt: state.endsAt
        });
    }

    function showView(name) {
        Object.keys(views).forEach(function (key) {
            views[key].classList.toggle("hidden", key !== name);
        });
        document.body.classList.toggle("quiz-exam-active", name === "exam");
        if (name !== "exam") closePalette();
        window.scrollTo({ top: 0, behavior: name === "exam" ? "auto" : "smooth" });
    }

    function isViewVisible(name) {
        return views[name] && !views[name].classList.contains("hidden");
    }

    function getFilteredQuizzes() {
        const base = state.subject === ALL_SUBJECTS ? getAllQuizzes() : registry.getQuizzesBySubject(state.subject);
        if (!state.search) return base;
        return base.filter(function (quiz) {
            const haystack = [quiz.title, quiz.subject, quiz.description, quiz.difficulty, (quiz.tags || []).join(" ")].join(" ").toLowerCase();
            return haystack.includes(state.search);
        });
    }

    function getSubjects() {
        return Array.isArray(registry.subjects) ? registry.subjects.slice() : [];
    }

    function getAllQuizzes() {
        return Array.isArray(registry.quizzes) ? registry.quizzes.slice() : [];
    }

    function getAttempts() {
        const attempts = storage.read("attempts", []);
        return Array.isArray(attempts) ? attempts : [];
    }

    function getSavedUnfinished() {
        const saved = storage.read("unfinished", null);
        return saved && saved.quizId ? saved : null;
    }

    function getQuizStats(quizId) {
        const attempts = getAttempts().filter(function (attempt) {
            return attempt.quizId === quizId;
        });
        const bestScores = storage.read("bestScores", {});
        return {
            bestScore: Number(bestScores[quizId]) || 0,
            attemptCount: attempts.length,
            lastAttempt: attempts[0] ? formatDate(attempts[0].completedAt) : "Not attempted"
        };
    }

    function getStatusCounts() {
        return state.statuses.reduce(function (counts, status) {
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
            answered: "Answered",
            "not-answered": "Not Answered",
            marked: "Marked for Review",
            "answered-marked": "Answered + Marked",
            "not-visited": "Not Visited"
        }[status] || "Not Visited";
    }

    function getPerformanceMessage(percentage) {
        if (percentage >= 85) return "Excellent exam readiness";
        if (percentage >= 70) return "Strong performance";
        if (percentage >= 50) return "Good base, improve accuracy";
        return "Needs focused revision";
    }

    function showMessage(message, type = "info") {
        elements.quizMessage.textContent = String(message || "");
        elements.quizMessage.className = message ? `quiz-message ${type}` : "quiz-message hidden";
    }

    function hideMessage() {
        showMessage("");
    }

    function normalizeArray(value, length, fallback) {
        const source = Array.isArray(value) ? value.slice(0, length) : [];
        while (source.length < length) source.push(fallback);
        return source;
    }

    function setText(node, value) {
        if (node) node.textContent = String(value);
    }

    function clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }

    function round2(value) {
        const number = Number(value);
        return Number.isFinite(number) ? Math.round((number + Number.EPSILON) * 100) / 100 : 0;
    }

    function formatTime(seconds) {
        const safeSeconds = Math.max(0, Number(seconds) || 0);
        const minutes = String(Math.floor(safeSeconds / 60)).padStart(2, "0");
        const secs = String(safeSeconds % 60).padStart(2, "0");
        return `${minutes}:${secs}`;
    }

    function formatDate(value) {
        const date = new Date(value);
        if (Number.isNaN(date.getTime())) return "Not attempted";
        return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
    }

    function formatMarks(value) {
        const number = Number(value);
        return Number.isFinite(number) ? number.toFixed(number % 1 === 0 ? 0 : 2) : "0";
    }

    function formatNumber(value) {
        const number = Number(value);
        return Number.isFinite(number) ? String(Math.round(number)) : "0";
    }

    function titleCase(value) {
        return String(value || "").replace(/-/g, " ").replace(/\b\w/g, function (letter) {
            return letter.toUpperCase();
        });
    }

    function escapeHtml(value) {
        return String(value ?? "").replace(/[&<>"']/g, function (character) {
            return {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                "\"": "&quot;",
                "'": "&#039;"
            }[character];
        });
    }

    function escapeAttr(value) {
        return escapeHtml(value);
    }
}());
