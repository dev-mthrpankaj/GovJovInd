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

    const PERSIST_DELAY_MS = 900;
    const SEARCH_DEBOUNCE_MS = 100;
    const AUTH_CHECK_TIMEOUT_MS = 2500;
    const CANDIDATE_SESSION_KEY = "gju:candidate-session";
    const QUIZ_LANGUAGE_KEY = "quizLanguage";
    const subjectIcons = {
        Mathematics: "fa-calculator",
        English: "fa-language",
        Hindi: "fa-book",
        "General Awareness": "fa-globe-asia",
        "General Science": "fa-flask",
        Reasoning: "fa-brain",
        Computer: "fa-laptop-code"
    };

    const views = {};
    const elements = {};
    const state = {
        subject: "",
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
        isLoading: false,
        loadingQuizId: "",
        pendingResume: null,
        language: getStoredQuizLanguage(),
        paletteDirty: true,
        statusCounts: null,
        lastPaletteCurrent: -1,
        questionEnteredAt: 0
    };
    let quizSearchRecords = null;
    let pendingMathRoot = null;
    let mathRetryTimer = 0;
    let mathRetryCount = 0;
    let mathJaxLoader = null;
    let swipeStartX = 0;
    let swipeStartY = 0;
    let swipeStartedAt = 0;

    const debouncedRenderQuizList = debounce(renderQuizList, SEARCH_DEBOUNCE_MS);

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initQuizPage, { once: true });
    } else {
        initQuizPage();
    }

    function initQuizPage() {
        cacheDom();
        bindEvents();
        openInitialRoute();
    }

    function cacheDom() {
        views.home = document.getElementById("homeView");
        views.exam = document.getElementById("examView");
        views.result = document.getElementById("resultView");
        views.review = document.getElementById("reviewView");

        elements.subjectFilters = document.getElementById("subjectFilters");
        elements.subjectSelect = document.getElementById("subjectSelect");
        elements.subjectSelectNote = document.getElementById("subjectSelectNote");
        elements.quizSetList = document.getElementById("quizSetList");
        elements.quizSearch = document.getElementById("quizSearch");
        elements.quizSearchClear = document.querySelector("[data-action='clear-quiz-search']");
        elements.quizSearchMeta = document.getElementById("quizSearchMeta");
        elements.quizMessage = document.getElementById("quizMessage");
        elements.quizLoading = document.getElementById("quizLoading");
        elements.selectedSubjectLabel = document.getElementById("selectedSubjectLabel");
        elements.availableQuizCount = document.getElementById("availableQuizCount");
        elements.savedAttemptCount = document.getElementById("savedAttemptCount");
        elements.bestScoreValue = document.getElementById("bestScoreValue");
        elements.recentAttempts = document.getElementById("recentAttempts");

        elements.examSubject = document.getElementById("examSubject");
        elements.examTitle = document.getElementById("examTitle");
        elements.examAppbar = document.querySelector(".exam-appbar");
        elements.currentQuestionNo = document.getElementById("currentQuestionNo");
        elements.totalQuestionNo = document.getElementById("totalQuestionNo");
        elements.timerPill = document.getElementById("timerPill");
        elements.timerText = document.getElementById("timerText");
        elements.answeredCount = document.getElementById("answeredCount");
        elements.examDurationLabel = document.getElementById("examDurationLabel");
        elements.quizProgress = document.getElementById("quizProgress");
        elements.questionCard = document.getElementById("questionCard");
        elements.questionNumberLabel = document.getElementById("questionNumberLabel");
        elements.questionStatusLabel = document.getElementById("questionStatusLabel");
        elements.questionElapsedText = document.getElementById("questionElapsedText");
        elements.questionText = document.getElementById("questionText");
        elements.questionMedia = document.getElementById("questionMedia");
        elements.optionList = document.getElementById("optionList");
        elements.optionButtons = [];
        elements.optionTexts = [];
        elements.questionMarks = document.getElementById("questionMarks");
        elements.questionNegative = document.getElementById("questionNegative");
        elements.prevQuestionButton = document.querySelector("[data-action='prev-question']");
        elements.saveNextButton = document.querySelector("[data-action='save-next']");
        elements.markNextButton = document.querySelector("[data-action='mark-next']");
        elements.palettePanel = document.getElementById("palettePanel");
        elements.paletteSummary = document.getElementById("paletteSummary");
        elements.questionPalette = document.getElementById("questionPalette");
        elements.submitModal = document.getElementById("submitModal");
        elements.submitSummary = document.getElementById("submitSummary");
        elements.pauseModal = document.getElementById("pauseModal");
        elements.resumeModal = document.getElementById("resumeModal");
        elements.resumeSummary = document.getElementById("resumeSummary");
        ensureExamLanguageToggle();
    }

    function bindEvents() {
        document.body.addEventListener("click", handleClick, { capture: true });
        document.addEventListener("keydown", handleKeyboard);
        elements.quizSearch?.addEventListener("input", function (event) {
            state.search = event.target.value;
            syncSearchUi();
            debouncedRenderQuizList();
        });
        elements.subjectSelect?.addEventListener("change", function (event) {
            setSubject(event.target.value);
        });
        elements.languageSelect?.addEventListener("change", function (event) {
            setQuizLanguage(event.target.value);
        });
        window.addEventListener("beforeunload", function () { persistUnfinished(true); });
        window.addEventListener("pagehide", function () { persistUnfinished(true); });
        document.addEventListener("visibilitychange", function () {
            if (document.hidden) persistUnfinished(true);
        });
        window.addEventListener("resize", syncPaletteState);
        document.addEventListener("gju:admin-quiz-index-ready", function () {
            if (isViewVisible("home")) renderHome();
        });
        elements.questionCard?.addEventListener("touchstart", handleQuestionTouchStart, { passive: true });
        elements.questionCard?.addEventListener("touchend", handleQuestionTouchEnd, { passive: true });
    }

    function handleClick(event) {
        const subjectButton = event.target.closest("[data-subject-filter]");
        const startButton = event.target.closest("[data-start-quiz]");
        const optionButton = event.target.closest("[data-option-index]");
        const paletteButton = event.target.closest("[data-question-index]");
        const reviewButton = event.target.closest("[data-review-filter]");
        const actionButton = event.target.closest("[data-action]");

        if (isPaletteOpen() && !event.target.closest("#palettePanel") && !event.target.closest("[data-action='toggle-palette']")) {
            closePalette();
            return;
        }

        if (subjectButton) {
            setSubject(subjectButton.dataset.subjectFilter);
            return;
        }

        if (startButton) {
            if (startButton.disabled || state.isLoading) return;
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
            "mark-next": markAndNext,
            "clear-response": clearResponse,
            "submit-confirm": openSubmitModal,
            "submit-now": function () { submitQuiz("manual"); },
            "cancel-submit": closeSubmitModal,
            "pause-confirm": openPauseModal,
            "pause-test": pauseTest,
            "cancel-pause": closePauseModal,
            "clear-quiz-search": clearQuizSearch,
            "resume-saved": resumeSavedAttempt,
            "start-fresh": startFreshAttempt,
            "cancel-resume": closeResumeModal,
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
                closePauseModal();
                closeResumeModal();
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
            closePauseModal();
            closeResumeModal();
            closePalette();
            return;
        }
        if (!isViewVisible("exam") || isModalOpen() || isTypingTarget(event.target)) return;

        if (/^[1-9]$/.test(key)) {
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
            markAndNext();
        }
    }

    function handleQuestionTouchStart(event) {
        if (!isViewVisible("exam") || isModalOpen() || isPaletteOpen()) return;
        const interactiveTarget = event.target.closest && event.target.closest("button, a, input, select, textarea, [role='button']");
        if (interactiveTarget && !interactiveTarget.closest(".answer-option")) return;
        const touch = event.changedTouches && event.changedTouches[0];
        if (!touch) return;
        swipeStartX = touch.clientX;
        swipeStartY = touch.clientY;
        swipeStartedAt = Date.now();
    }

    function handleQuestionTouchEnd(event) {
        if (!swipeStartedAt || !isViewVisible("exam") || isModalOpen() || isPaletteOpen()) return;
        const touch = event.changedTouches && event.changedTouches[0];
        if (!touch) return;
        const deltaX = touch.clientX - swipeStartX;
        const deltaY = touch.clientY - swipeStartY;
        const elapsed = Date.now() - swipeStartedAt;
        swipeStartedAt = 0;
        if (elapsed > 650 || Math.abs(deltaX) < 70 || Math.abs(deltaX) < Math.abs(deltaY) * 1.4) return;
        goQuestion(state.current + (deltaX < 0 ? 1 : -1));
    }

    function isTypingTarget(target) {
        return Boolean(target && target.closest && target.closest("input, textarea, select, [contenteditable='true']"));
    }

    function openInitialRoute() {
        const params = new URLSearchParams(window.location.search);
        const subject = params.get("subject");
        const quizId = params.get("quiz");
        const query = params.get("q");
        const directQuiz = quizId ? registry.getQuizById(quizId) : null;

        if (subject && getSubjects().includes(subject)) setSubject(subject, false);
        else if (directQuiz?.subject) setSubject(directQuiz.subject, false);
        if (query) {
            state.search = query.trim();
            if (elements.quizSearch) elements.quizSearch.value = state.search;
            if (!state.subject) setSubject(inferSubjectFromSearch(state.search), false);
        }
        ensureSubjectSelected();

        renderHome();

        if (directQuiz) {
            startQuiz(quizId);
            return;
        }

        showView("home");
    }

    function renderHome() {
        ensureSubjectSelected();
        syncSearchUi();
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
        const availableQuizCount = getCurrentSubjectQuizzes().length;

        setText(elements.availableQuizCount, availableQuizCount ? String(availableQuizCount) : "--");
        setText(elements.savedAttemptCount, String(attempts.length));
        setText(elements.bestScoreValue, `${Math.round(best)}%`);
    }

    function renderSubjectFilters() {
        ensureSubjectSelected();
        const subjects = getSubjects();
        if (elements.subjectSelect) {
            elements.subjectSelect.innerHTML = subjects.map(function (subject) {
                const count = registry.getQuizzesBySubject(subject).length;
                return `<option value="${escapeAttr(subject)}">${escapeHtml(subject)} (${formatNumber(count)})</option>`;
            }).join("");
            elements.subjectSelect.value = state.subject;
        }
        if (elements.subjectFilters) {
            elements.subjectFilters.innerHTML = "";
        }
        updateSubjectSelectNote();
    }

    function renderQuizList() {
        const quizzes = getFilteredQuizzes();
        const subjectTotal = getCurrentSubjectQuizzes().length;
        setText(elements.selectedSubjectLabel, state.subject || "Choose Subject");
        updateSearchMeta(quizzes.length, subjectTotal);

        if (!quizzes.length) {
            elements.quizSetList.innerHTML = `
                <article class="content-fallback">
                    <h3>${hasSearchQuery() ? "No matching quiz sets" : "Practice sets are being prepared"}</h3>
                    <p>${hasSearchQuery() ? "Try another subject or keyword to find available practice sets." : "Use the preparation guide below while new topic-wise quiz sets are made available."}</p>
                    <p class="official-note">Practice quizzes are for preparation only. Always follow the official exam syllabus and notification.</p>
                </article>
            `;
            hideMessage();
            return;
        }

        hideMessage();
        elements.quizSetList.innerHTML = quizzes.map(renderQuizCard).join("");
    }

    function renderQuizCard(quiz) {
        const stats = getQuizStats(quiz.id);
        const resume = getSavedUnfinished();
        const canResume = resume && resume.quizId === quiz.id;
        const isBusy = state.isLoading && state.loadingQuizId === quiz.id;
        const buttonLabel = isBusy ? "Loading..." : canResume ? "Resume / Start" : "Start Test";
        const buttonIcon = isBusy ? "fa-spinner fa-spin" : "fa-play";
        return `
            <article class="quiz-set-card">
                <div class="quiz-card-head">
                    <span class="quiz-card-kicker">${escapeHtml(quiz.subject)}</span>
                    <h3>${escapeHtml(quiz.title)}</h3>
                    <p>${escapeHtml(quiz.description || "Practice set for government exam preparation.")}</p>
                    <div class="quiz-set-meta">
                        <span class="meta-pill">${escapeHtml(quiz.difficulty || "Mixed")}</span>
                        <span class="meta-pill">${getQuizQuestionCountLabel(quiz)}</span>
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
                    <button class="quiz-btn quiz-btn-primary" type="button" data-start-quiz="${escapeAttr(quiz.id)}"${state.isLoading ? " disabled" : ""} aria-busy="${isBusy}">
                        <i class="fas ${buttonIcon}" aria-hidden="true"></i> ${buttonLabel}
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
        state.subject = getValidSubject(subject) || getDefaultSubject();
        if (elements.subjectSelect) elements.subjectSelect.value = state.subject;
        if (rerender) {
            renderSubjectFilters();
            renderStats();
            renderQuizList();
            scrollQuizListIntoView();
        }
    }

    function ensureSubjectSelected() {
        if (getValidSubject(state.subject)) return;
        state.subject = getDefaultSubject();
    }

    function getDefaultSubject() {
        return getSubjects()[0] || "";
    }

    function getValidSubject(subject) {
        return getSubjects().includes(subject) ? subject : "";
    }

    function updateSubjectSelectNote() {
        if (!elements.subjectSelectNote) return;
        const count = getCurrentSubjectQuizzes().length;
        setText(elements.subjectSelectNote, `${formatNumber(count)} quiz set${count === 1 ? "" : "s"} in ${state.subject}.`);
    }

    function clearQuizSearch() {
        state.search = "";
        if (elements.quizSearch) {
            elements.quizSearch.value = "";
            elements.quizSearch.focus();
        }
        syncSearchUi();
        renderQuizList();
    }

    function syncSearchUi() {
        const hasSearch = hasSearchQuery();
        elements.quizSearchClear?.classList.toggle("hidden", !hasSearch);
    }

    function updateSearchMeta(matchCount, subjectTotal) {
        if (!elements.quizSearchMeta) return;
        const subjectLabel = state.subject || "selected subject";
        const totalText = `${formatNumber(subjectTotal)} quiz set${subjectTotal === 1 ? "" : "s"}`;
        const matchText = `${formatNumber(matchCount)} of ${totalText}`;
        const text = hasSearchQuery()
            ? `${matchText} found in ${subjectLabel}`
            : `${totalText} available in ${subjectLabel}`;
        setText(elements.quizSearchMeta, text);
    }

    async function requireFirebaseAuth() {
        if (hasCandidateSession()) return true;
        if (!window.GJU_FIREBASE_CONFIG || typeof window.GJU_FIREBASE_CONFIG !== "object") {
            redirectToLogin();
            return false;
        }

        try {
            const [{ initializeApp, getApps }, { getAuth, onAuthStateChanged }] = await Promise.all([
                import('https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js'),
                import('https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js')
            ]);
            const app = getApps().length ? getApps()[0] : initializeApp(window.GJU_FIREBASE_CONFIG);
            const auth = getAuth(app);
            const user = await withTimeout(new Promise((resolve) => {
                const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
                    unsubscribe();
                    resolve(firebaseUser);
                });
            }), AUTH_CHECK_TIMEOUT_MS);
            if (user) return true;
        } catch (error) {
            console.warn("[GJU Quizzes] Auth check failed:", error);
        }

        redirectToLogin();
        return false;
    }

    function hasCandidateSession() {
        try {
            const saved = JSON.parse(localStorage.getItem(CANDIDATE_SESSION_KEY) || sessionStorage.getItem(CANDIDATE_SESSION_KEY) || "null");
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

    function redirectToLogin() {
        window.alert("Quiz attempt karne ke liye kripya pehle Login karein.");
        window.location.href = "login.html";
    }

    async function startQuiz(quizId, forceNew = false) {
        if (state.isLoading) return;
        if (!(await requireFirebaseAuth())) return;
        const meta = registry.getQuizById(quizId);
        if (!meta) return;

        state.isLoading = true;
        state.loadingQuizId = quizId;
        setStartButtonsLoading(quizId);
        setQuizLoading(true);
        showMessage("Loading quiz...", "info");

        try {
            const quizSet = await loadQuizSet(quizId);
            if (!quizSet || !quizSet.validation || !quizSet.validation.isComplete) {
                showMessage("This quiz is not ready yet.", "error");
                return;
            }

            const saved = getSavedUnfinished();
            if (!forceNew && saved && saved.quizId === quizId && !isSavedAttemptExpired(saved)) {
                hideMessage();
                openResumeModal(quizSet, saved);
            } else {
                if (saved && saved.quizId === quizId) storage.remove("unfinished");
                hideMessage();
                beginNewAttempt(quizSet);
            }
        } catch (error) {
            console.error("[GJU Quizzes] Failed to start quiz:", error);
            showMessage("Quiz could not load. Please try again.", "error");
        } finally {
            state.isLoading = false;
            state.loadingQuizId = "";
            setQuizLoading(false);
            setStartButtonsLoading("");
        }
    }

    async function loadQuizSet(quizId) {
        const loaded = await registry.loadQuizById?.(quizId);
        return loaded || registry.getQuizById(quizId);
    }

    function beginNewAttempt(quizSet) {
        const questions = getQuestionsForSet(quizSet);
        if (!questions.length) {
            showMessage("This quiz has no questions yet.", "error");
            showView("home");
            return;
        }
        state.quizSet = quizSet;
        state.questions = questions;
        state.answers = questions.map(function () { return null; });
        state.statuses = questions.map(function (_question, index) {
            return index === 0 ? "not-answered" : "not-visited";
        });
        state.statusCounts = countStatuses(state.statuses);
        state.current = 0;
        state.questionEnteredAt = Date.now();
        state.lastPaletteCurrent = -1;
        state.paletteDirty = true;
        state.startedAt = Date.now();
        state.remainingSeconds = Math.max(1, Number(quizSet.durationMinutes) || 30) * 60;
        state.endsAt = state.startedAt + state.remainingSeconds * 1000;
        state.result = null;
        renderExam();
        showView("exam");
        startTimer();
        persistUnfinished(true);
    }

    function resumeAttempt(quizSet, saved) {
        state.language = normalizeQuizLanguage(saved.language || state.language);
        const questions = getQuestionsForSet(quizSet);
        if (!questions.length) {
            storage.remove("unfinished");
            showMessage("This saved quiz is no longer available. Please start again.", "error");
            showView("home");
            return;
        }
        state.quizSet = quizSet;
        state.questions = questions;
        state.answers = normalizeArray(saved.answers, questions.length, null);
        state.statuses = normalizeArray(saved.statuses, questions.length, "not-visited");
        state.statusCounts = countStatuses(state.statuses);
        state.current = clamp(Number(saved.current) || 0, 0, questions.length - 1);
        state.questionEnteredAt = Date.now();
        state.lastPaletteCurrent = -1;
        state.paletteDirty = true;
        state.startedAt = Number(saved.startedAt) || Date.now();
        state.endsAt = Number(saved.endsAt) || Date.now() + Math.max(1, Number(quizSet.durationMinutes) || 30) * 60 * 1000;
        state.remainingSeconds = Math.max(0, Math.ceil((state.endsAt - Date.now()) / 1000));
        if (state.remainingSeconds <= 0) {
            storage.remove("unfinished");
            submitQuiz("time");
            return;
        }
        renderExam();
        showView("exam");
        startTimer();
        persistUnfinished(true);
    }

    function getQuestionsForSet(quizSet) {
        const questions = Array.isArray(quizSet.questions) ? quizSet.questions : [];
        return questions.slice(0, Number(quizSet.totalQuestions) || questions.length).map(function (question, index) {
            const normalizedOptions = normalizeOptions(question.options);
            const questionTextMap = normalizeTextMap(question.questionTextMap || question.questionI18n || question.question);
            const explanationTextMap = normalizeTextMap(question.explanationTextMap || question.explanationI18n || question.explanation);
            const optionTextMaps = normalizeOptionTextMaps(question.optionTextMaps, question.options, normalizedOptions);
            return {
                id: question.id || `${quizSet.id}-${index + 1}`,
                subject: question.subject || quizSet.subject,
                topic: question.topic || "General",
                difficulty: question.difficulty || quizSet.difficulty || "Mixed",
                question: getLocalizedText(questionTextMap, state.language, question.question || ""),
                questionTextMap,
                questionImage: normalizeMedia(question.image || question.questionImage, question.imageAlt || question.questionImageAlt || `Question ${index + 1} image`),
                options: normalizedOptions.map(function (option) { return option.text; }),
                optionTextMaps,
                optionImages: normalizeOptionImages(question.optionImages, normalizedOptions),
                correctAnswer: Number(question.correctAnswer),
                explanation: getLocalizedText(explanationTextMap, state.language, question.explanation || "Explanation is not available."),
                explanationTextMap,
                explanationImage: normalizeMedia(question.explanationImage || question.solutionImage, question.explanationImageAlt || question.solutionImageAlt || `Question ${index + 1} explanation image`),
                marks: Number(question.marks) || Number(quizSet.marksPerQuestion) || 1,
                negativeMarks: Number(question.negativeMarks) || Number(quizSet.negativeMarks) || 0
            };
        });
    }

    function ensureExamLanguageToggle() {
        if (!elements.examAppbar || elements.languageSelect) return;
        const wrapper = document.createElement("label");
        wrapper.className = "quiz-language-toggle";
        wrapper.innerHTML = `
            <span>Language</span>
            <select aria-label="Change question language during quiz">
                <option value="hi">Hindi</option>
                <option value="en">English</option>
            </select>
        `;
        const menuButton = elements.examAppbar.querySelector("[data-action='toggle-palette']");
        elements.examAppbar.insertBefore(wrapper, menuButton || null);
        elements.languageToggle = wrapper;
        elements.languageSelect = wrapper.querySelector("select");
        elements.languageSelect.value = state.language;
    }

    function syncLanguageToggle() {
        if (!elements.languageToggle || !elements.languageSelect) return;
        const hasBilingualText = state.questions.some(hasBilingualQuestionText);
        elements.languageToggle.classList.toggle("hidden", !hasBilingualText);
        elements.languageSelect.value = state.language;
    }

    function setQuizLanguage(value) {
        const nextLanguage = normalizeQuizLanguage(value);
        if (state.language === nextLanguage) return;
        state.language = nextLanguage;
        storage.write(QUIZ_LANGUAGE_KEY, nextLanguage);
        if (!state.questions.length) return;
        if (isViewVisible("exam")) {
            renderQuestion();
            renderPalette({ force: true });
            persistUnfinished(true);
        } else if (isViewVisible("review")) {
            renderReview();
        }
    }

    function renderExam() {
        syncLanguageToggle();
        renderQuestion();
        renderPalette({ force: true });
        updateTimerDisplay();
    }

    function renderQuestion() {
        const question = state.questions[state.current];
        if (!question) return;

        setText(elements.examSubject, state.quizSet.subject);
        setText(elements.examTitle, state.quizSet.title);
        setText(elements.currentQuestionNo, String(state.current + 1));
        setText(elements.totalQuestionNo, String(state.questions.length));
        setText(elements.questionNumberLabel, String(state.current + 1));
        setRichText(elements.questionText, getQuestionText(question));
        renderQuestionMedia(question);
        setText(elements.questionMarks, `+${formatMarks(question.marks)} marks`);
        setText(elements.questionNegative, `-${formatMarks(question.negativeMarks)} negative`);
        setText(elements.examDurationLabel, `Last ${formatNumber(state.quizSet.durationMinutes || 30)} Mins`);
        elements.quizProgress.style.width = `${((state.current + 1) / state.questions.length) * 100}%`;
        updateAnsweredCount();
        updateQuestionTimerDisplay();
        if (elements.prevQuestionButton) {
            const isFirst = state.current === 0;
            elements.prevQuestionButton.disabled = isFirst;
            elements.prevQuestionButton.hidden = isFirst;
        }
        if (elements.saveNextButton) elements.saveNextButton.innerHTML = state.current >= state.questions.length - 1
            ? "Review &amp; Submit"
            : "Save &amp; Next";
        if (elements.markNextButton) elements.markNextButton.innerHTML = state.current >= state.questions.length - 1
            ? "Mark For Review"
            : "Mark For Review";

        renderQuestionOptions(question);
        syncQuestionState();
        typesetQuizMath(elements.questionCard);
    }

    function renderQuestionOptions(question) {
        if (!elements.optionList) return;
        const options = Array.isArray(question.options) ? question.options : [];
        elements.optionList.innerHTML = options.map(function (_option, index) {
            return `<button class="answer-option" type="button" data-option-index="${index}" aria-pressed="false"><span class="option-key">${index + 1}.</span><span class="option-text"></span></button>`;
        }).join("");
        elements.optionButtons = Array.from(elements.optionList.querySelectorAll("[data-option-index]"));
        elements.optionTexts = elements.optionButtons.map((button) => button.querySelector(".option-text"));
        elements.optionButtons.forEach(function (button, index) {
            const hasImage = Boolean(question.optionImages?.[index]?.src);
            button.classList.toggle("has-option-image", hasImage);
        });
        elements.optionTexts.forEach(function (node, index) {
            renderOptionContent(node, question, index);
        });
    }

    function renderQuestionMedia(question) {
        if (!elements.questionMedia) return;
        elements.questionMedia.innerHTML = renderMedia(question.questionImage, "question-image", "Question image");
        elements.questionMedia.classList.toggle("hidden", !question.questionImage?.src);
    }

    function renderOptionContent(node, question, index) {
        if (!node) return;
        const optionText = getOptionText(question, index);
        const optionImage = question.optionImages?.[index];
        node.innerHTML = `
            ${optionText ? `<span class="option-label">${formatRichText(optionText)}</span>` : ""}
            ${renderMedia(optionImage, "option-image", `Option ${index + 1} image`)}
        `;
    }

    function renderPalette(options = {}) {
        if (!state.questions.length) return;
        const force = Boolean(options.force);
        const changedIndexes = Array.isArray(options.changedIndexes) ? options.changedIndexes : [];
        const paletteVisible = force || isDesktopPalette() || isPaletteOpen();

        if (!paletteVisible) {
            state.paletteDirty = true;
            return;
        }

        renderPaletteSummary();

        if (force || state.paletteDirty || elements.questionPalette.children.length !== state.questions.length) {
            elements.questionPalette.innerHTML = state.questions.map(function (_question, index) {
                const status = state.statuses[index] || "not-visited";
                const current = index === state.current ? " current" : "";
                return `<button class="palette-btn ${status}${current}" type="button" data-question-index="${index}" aria-label="Question ${index + 1}, ${getStatusLabel(status)}">${index + 1}</button>`;
            }).join("");
            state.paletteDirty = false;
            state.lastPaletteCurrent = state.current;
            return;
        }

        const indexes = uniqueIndexes([state.lastPaletteCurrent, state.current].concat(changedIndexes));
        indexes.forEach(syncPaletteButton);
        state.lastPaletteCurrent = state.current;
    }

    function renderPaletteSummary() {
        const counts = state.statusCounts || getStatusCounts();
        const answered = counts.answered + counts.answeredMarked;
        const summaryHtml = [
            ["answered", "Answered", answered],
            ["not-answered", "Not Answered", counts.notAnswered],
            ["marked", "Marked", counts.marked],
            ["not-visited", "Not Visited", counts.notVisited]
        ].map(function ([status, label, count]) {
            return `<div class="palette-summary-tile ${status}"><i aria-hidden="true"></i><span>${label}</span><strong>${count}</strong></div>`;
        }).join("");

        if (elements.paletteSummary.innerHTML !== summaryHtml) elements.paletteSummary.innerHTML = summaryHtml;
    }

    function syncPaletteButton(index) {
        if (index < 0 || index >= state.questions.length) return;
        const button = elements.questionPalette.children[index];
        if (!button) return;
        const status = state.statuses[index] || "not-visited";
        const current = index === state.current ? " current" : "";
        const nextClassName = `palette-btn ${status}${current}`;
        if (button.className !== nextClassName) button.className = nextClassName;
        const nextLabel = `Question ${index + 1}, ${getStatusLabel(status)}`;
        if (button.getAttribute("aria-label") !== nextLabel) button.setAttribute("aria-label", nextLabel);
    }

    function setQuestionStatus(index, status) {
        if (index < 0 || index >= state.statuses.length) return;
        const previous = state.statuses[index] || "not-visited";
        if (previous === status) return;
        state.statuses[index] = status;
        if (!state.statusCounts) state.statusCounts = countStatuses(state.statuses);
        if (state.statusCounts[previous] !== undefined) state.statusCounts[previous] = Math.max(0, state.statusCounts[previous] - 1);
        if (state.statusCounts[status] !== undefined) state.statusCounts[status] += 1;
        updateAnsweredCount();
    }

    function uniqueIndexes(indexes) {
        return Array.from(new Set(indexes.filter(function (index) {
            return Number.isInteger(index) && index >= 0 && index < state.questions.length;
        })));
    }

    function selectOption(index) {
        const question = state.questions[state.current];
        if (!question || index < 0 || index >= question.options.length) return;
        const currentStatus = state.statuses[state.current];
        if (state.answers[state.current] === index) {
            clearResponse();
            return;
        }
        state.answers[state.current] = index;
        setQuestionStatus(state.current, currentStatus === "marked" || currentStatus === "answered-marked"
            ? "answered-marked"
            : "answered");
        persistUnfinished();
        syncQuestionState();
        renderPalette({ changedIndexes: [state.current] });
    }

    function clearResponse() {
        if (!state.questions[state.current]) return;
        const currentStatus = state.statuses[state.current];
        state.answers[state.current] = null;
        setQuestionStatus(state.current, currentStatus === "answered-marked" || currentStatus === "marked"
            ? "marked"
            : "not-answered");
        persistUnfinished();
        syncQuestionState();
        renderPalette({ changedIndexes: [state.current] });
    }

    function markForReview() {
        if (!state.questions[state.current]) return;
        setQuestionStatus(state.current, state.answers[state.current] === null ? "marked" : "answered-marked");
        persistUnfinished();
        syncQuestionState();
        renderPalette({ changedIndexes: [state.current] });
    }

    function markAndNext() {
        markForReview();
        if (state.current >= state.questions.length - 1) {
            openSubmitModal();
            return;
        }
        goQuestion(state.current + 1);
    }

    function syncQuestionState() {
        const status = state.statuses[state.current] || "not-visited";
        if (elements.questionStatusLabel) {
            const nextClassName = `question-status ${status}`;
            if (elements.questionStatusLabel.className !== nextClassName) elements.questionStatusLabel.className = nextClassName;
            setText(elements.questionStatusLabel, getStatusLabel(status));
        }

        elements.optionButtons.forEach(function (button) {
            const selected = state.answers[state.current] === Number(button.dataset.optionIndex);
            button.classList.toggle("selected", selected);
            button.setAttribute("aria-pressed", String(selected));
        });
    }

    function saveAndNext() {
        if (!state.questions[state.current]) return;
        if (state.statuses[state.current] === "not-visited") setQuestionStatus(state.current, "not-answered");
        if (state.current >= state.questions.length - 1) {
            openSubmitModal();
            return;
        }
        goQuestion(state.current + 1);
    }

    function goQuestion(index) {
        if (index < 0 || index >= state.questions.length) return;
        const previousIndex = state.current;
        if (state.statuses[state.current] === "not-visited") setQuestionStatus(state.current, "not-answered");
        state.current = index;
        state.questionEnteredAt = Date.now();
        if (state.statuses[state.current] === "not-visited") setQuestionStatus(state.current, "not-answered");
        persistUnfinished();
        renderQuestion();
        renderPalette({ changedIndexes: [previousIndex, state.current] });
    }

    function openSubmitModal() {
        const attempted = state.answers.filter(function (answer) { return answer !== null; }).length;
        const counts = state.statusCounts || getStatusCounts();
        const marked = counts.marked + counts.answeredMarked;
        const notAnswered = counts.notAnswered;
        const notVisited = counts.notVisited;
        closePalette();
        elements.submitSummary.innerHTML = `
            <span class="submit-summary-grid">
                <b><small>Answered</small>${attempted}</b>
                <b><small>Not Answered</small>${notAnswered}</b>
                <b><small>Marked</small>${marked}</b>
                <b><small>Not Visited</small>${notVisited}</b>
                <b><small>Time Left</small>${formatTime(state.remainingSeconds)}</b>
            </span>
            <span class="submit-summary-warning">Submit karne ke baad answers change nahi honge.</span>
        `;
        elements.submitModal.classList.remove("hidden");
        syncModalState();
    }

    function closeSubmitModal() {
        elements.submitModal?.classList.add("hidden");
        syncModalState();
    }

    function openPauseModal() {
        elements.pauseModal?.classList.remove("hidden");
        syncModalState();
    }

    function closePauseModal() {
        elements.pauseModal?.classList.add("hidden");
        syncModalState();
    }

    function pauseTest() {
        persistUnfinished(true);
        stopTimer();
        closePauseModal();
        renderHome();
        showView("home");
    }

    function openResumeModal(quizSet, saved) {
        state.pendingResume = { quizSet, saved };
        const questionCount = Array.isArray(quizSet.questions) && quizSet.questions.length
            ? quizSet.questions.length
            : Number(quizSet.totalQuestions) || (Array.isArray(saved.answers) ? saved.answers.length : 1);
        const current = clamp(Number(saved.current) || 0, 0, Math.max(1, questionCount) - 1) + 1;
        const remaining = Math.max(0, Math.ceil((Number(saved.endsAt) - Date.now()) / 1000));
        setText(elements.resumeSummary, `You have an unfinished attempt on Question ${current}. Time left: ${formatTime(remaining)}.`);
        elements.resumeModal?.classList.remove("hidden");
        syncModalState();
    }

    function closeResumeModal() {
        elements.resumeModal?.classList.add("hidden");
        state.pendingResume = null;
        syncModalState();
    }

    function resumeSavedAttempt() {
        const pending = state.pendingResume;
        if (!pending) return;
        closeResumeModal();
        resumeAttempt(pending.quizSet, pending.saved);
    }

    function startFreshAttempt() {
        const pending = state.pendingResume;
        if (!pending) return;
        closeResumeModal();
        storage.remove("unfinished");
        beginNewAttempt(pending.quizSet);
    }

    function togglePalette() {
        elements.palettePanel?.classList.toggle("open");
        if (isPaletteOpen()) renderPalette({ force: state.paletteDirty || elements.questionPalette.children.length !== state.questions.length });
        syncPaletteState();
    }

    function closePalette() {
        elements.palettePanel?.classList.remove("open");
        syncPaletteState();
    }

    function isPaletteOpen() {
        return Boolean(elements.palettePanel && elements.palettePanel.classList.contains("open"));
    }

    function isDesktopPalette() {
        return Boolean(window.matchMedia("(min-width: 1120px)").matches);
    }

    function syncPaletteState() {
        if (isDesktopPalette() && state.paletteDirty) renderPalette({ force: true });
        const shouldLock = isPaletteOpen() && !window.matchMedia("(min-width: 1120px)").matches;
        document.body.classList.toggle("quiz-palette-open", shouldLock);
    }

    function isModalOpen() {
        return Boolean(
            elements.submitModal && !elements.submitModal.classList.contains("hidden")
            || elements.pauseModal && !elements.pauseModal.classList.contains("hidden")
            || elements.resumeModal && !elements.resumeModal.classList.contains("hidden")
        );
    }

    function syncModalState() {
        document.body.classList.toggle("quiz-modal-open", isModalOpen());
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
        elements.timerPill?.classList.toggle("warning", state.remainingSeconds <= 300);
        updateQuestionTimerDisplay();
    }

    function updateQuestionTimerDisplay() {
        if (!elements.questionElapsedText || !state.questionEnteredAt) return;
        const elapsed = Math.max(0, Math.floor((Date.now() - state.questionEnteredAt) / 1000));
        setText(elements.questionElapsedText, formatTime(elapsed));
    }

    function updateAnsweredCount() {
        if (!elements.answeredCount || !state.statuses.length) return;
        const counts = state.statusCounts || getStatusCounts();
        setText(elements.answeredCount, String(counts.answered + counts.answeredMarked));
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
        const insights = buildResultInsights(result);

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
                <h2>Analytics</h2>
                <div class="result-insight-grid">
                    <article class="result-insight-card">
                        <span>Strong Topics</span>
                        <strong>${escapeHtml(insights.strongTopics)}</strong>
                    </article>
                    <article class="result-insight-card">
                        <span>Weak Topics</span>
                        <strong>${escapeHtml(insights.weakTopics)}</strong>
                    </article>
                    <article class="result-insight-card">
                        <span>Time Analysis</span>
                        <strong>${escapeHtml(insights.timeAnalysis)}</strong>
                    </article>
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
                <a class="quiz-btn quiz-btn-outline result-dashboard-link" href="dashboard.html"><i class="fas fa-chart-line" aria-hidden="true"></i> View Dashboard</a>
                <button class="quiz-btn quiz-btn-ghost" type="button" data-action="back-home">Back to Quizzes</button>
            </div>
        `;
    }
function renderResultTile(label, value) {
    return `<div class="result-tile"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`;
}
function buildResultInsights(result) {
    const topics = {};

    result.questions.forEach(function (question, index) {
        const topicName = question.topic || "General";
        const selected = result.answers[index];

        if (!topics[topicName]) {
            topics[topicName] = {
                attempted: 0,
                correct: 0
            };
        }

        // Unattempted questions analytics me count nahi honge.
        if (selected === null) return;

        topics[topicName].attempted += 1;

        if (selected === question.correctAnswer) {
            topics[topicName].correct += 1;
        }
    });

    const attemptedTopics = Object.keys(topics)
        .map(function (name) {
            const topic = topics[name];

            return {
                name: name,
                attempted: topic.attempted,
                accuracy: topic.attempted
                    ? (topic.correct / topic.attempted) * 100
                    : 0
            };
        })
        .filter(function (topic) {
            return topic.attempted > 0;
        });

    // Strong = genuinely good performance: 60%+
    const strongTopics = attemptedTopics
        .filter(function (topic) {
            return topic.accuracy >= 60;
        })
        .sort(function (a, b) {
            if (b.accuracy !== a.accuracy) {
                return b.accuracy - a.accuracy;
            }

            return b.attempted - a.attempted;
        })
        .slice(0, 3);

    // Weak = genuinely weak performance: below 50%
    const weakTopics = attemptedTopics
        .filter(function (topic) {
            return topic.accuracy < 50;
        })
        .sort(function (a, b) {
            if (a.accuracy !== b.accuracy) {
                return a.accuracy - b.accuracy;
            }

            return b.attempted - a.attempted;
        })
        .slice(0, 3);

    const perQuestion = result.total
        ? Math.round(result.timeTaken / result.total)
        : 0;

    const timeAnalysis =
        `${formatTime(result.timeTaken)} total, about ${perQuestion}s/question`;

    return {
        strongTopics: strongTopics.length
            ? strongTopics.map(function (topic) {
                return topic.name;
            }).join(", ")
            : "No strong topic yet",

        weakTopics: weakTopics.length
            ? weakTopics.map(function (topic) {
                return topic.name;
            }).join(", ")
            : "No weak topic identified",

        timeAnalysis: timeAnalysis
    };
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
        typesetQuizMath(views.review);
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
                <h3 class="review-question-title">${formatRichText(getQuestionText(question))}</h3>
                ${renderMedia(question.questionImage, "review-question-image", "Question image")}
                <div class="review-answer ${answerState === "wrong" ? "wrong" : ""}">Your answer: ${selected === null ? "Not attempted" : renderReviewOptionAnswer(question, selected)}</div>
                <div class="review-answer correct">Correct answer: ${renderReviewOptionAnswer(question, question.correctAnswer)}</div>
                <div class="review-explanation">
                    <p><strong>Explanation:</strong> ${formatRichText(getExplanationText(question))}</p>
                    ${renderMedia(question.explanationImage, "explanation-image", "Explanation image")}
                </div>
            </article>
        `;
    }

    function renderReviewOptionAnswer(question, index) {
        if (!Number.isInteger(index) || index < 0 || index >= question.options.length) return "Not available";
        const optionText = getOptionText(question, index);
        const optionImage = question.optionImages?.[index];
        return `
            ${optionText ? `<span>${formatRichText(optionText)}</span>` : ""}
            ${renderMedia(optionImage, "review-option-image", `Option ${index + 1} image`)}
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
            language: state.language,
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
        window.scrollTo({ top: 0, behavior: "auto" });
    }

    function isViewVisible(name) {
        return views[name] && !views[name].classList.contains("hidden");
    }

    function getFilteredQuizzes() {
        const base = getCurrentSubjectQuizzes();
        const tokens = getSearchTokens(state.search);
        if (!tokens.length) return base;

        const allowedIds = new Set(base.map(function (quiz) { return quiz.id; }));
        return getQuizSearchRecords().filter(function (record) {
            return allowedIds.has(record.quiz.id) && tokens.every(function (token) {
                return record.searchText.includes(token);
            });
        }).map(function (record) {
            return record.quiz;
        });
    }

    function getCurrentSubjectQuizzes() {
        return state.subject ? registry.getQuizzesBySubject(state.subject) : [];
    }

    function inferSubjectFromSearch(value) {
        const tokens = getSearchTokens(value);
        if (!tokens.length) return "";
        const exactSubject = getSubjects().find(function (subject) {
            return normalizeSearchText(subject) === tokens.join(" ");
        });
        if (exactSubject) return exactSubject;

        const match = getQuizSearchRecords().find(function (record) {
            return tokens.every(function (token) {
                return record.searchText.includes(token);
            });
        });
        return match?.quiz?.subject || "";
    }

    function getQuizSearchRecords() {
        const quizzes = getAllQuizzes();
        if (quizSearchRecords && quizSearchRecords.length === quizzes.length) return quizSearchRecords;

        quizSearchRecords = quizzes.map(function (quiz) {
            return {
                quiz,
                searchText: buildQuizSearchText(quiz)
            };
        });
        return quizSearchRecords;
    }

    function buildQuizSearchText(quiz) {
        const setNumber = getSetNumber(quiz.title);
        return normalizeSearchText([
            quiz.id,
            quiz.title,
            quiz.subject,
            quiz.description,
            quiz.difficulty,
            getQuizQuestionCount(quiz),
            quiz.durationMinutes,
            getQuizQuestionCount(quiz) ? `${getQuizQuestionCount(quiz)} questions` : "",
            `${quiz.durationMinutes} minutes`,
            "quiz test practice mock question",
            setNumber ? `set ${setNumber}` : "",
            (quiz.tags || []).join(" ")
        ].join(" "));
    }

    function getSetNumber(value) {
        const match = String(value || "").match(/\bset\s*(\d+)\b/i);
        return match ? match[1] : "";
    }

    function hasSearchQuery() {
        return getSearchTokens(state.search).length > 0;
    }

    function getSearchTokens(value) {
        return normalizeSearchText(value).split(" ").filter(Boolean).slice(0, 8);
    }

    function normalizeSearchText(value) {
        return String(value || "")
            .toLowerCase()
            .replace(/[-_]+/g, " ")
            .replace(/[^a-z0-9\s]/g, " ")
            .replace(/\s+/g, " ")
            .trim();
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

    function isSavedAttemptExpired(saved) {
        return !saved || !Number(saved.endsAt) || Number(saved.endsAt) <= Date.now();
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
        return countStatuses(state.statuses);
    }

    function countStatuses(statuses) {
        return statuses.reduce(function (counts, status) {
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

    function setQuizLoading(isLoading) {
        if (!elements.quizLoading) return;
        elements.quizLoading.classList.toggle("hidden", !isLoading);
    }

    function hideMessage() {
        showMessage("");
    }

    function scrollQuizListIntoView() {
        const quizListPanel = elements.quizSetList?.closest(".quiz-list-panel");
        if (!quizListPanel || !window.matchMedia("(max-width: 899px)").matches) return;
        window.setTimeout(function () {
            quizListPanel.scrollIntoView({ block: "start", behavior: "smooth" });
        }, 0);
    }

    function setStartButtonsLoading(activeQuizId) {
        const isLoading = Boolean(activeQuizId);
        document.querySelectorAll("[data-start-quiz]").forEach(function (button) {
            const isActive = button.dataset.startQuiz === activeQuizId;
            button.disabled = isLoading;
            button.setAttribute("aria-busy", String(isActive));
            if (isActive && !button.dataset.originalHtml) {
                button.dataset.originalHtml = button.innerHTML;
                button.innerHTML = '<i class="fas fa-spinner fa-spin" aria-hidden="true"></i> Loading...';
            } else if (!isLoading && button.dataset.originalHtml) {
                button.innerHTML = button.dataset.originalHtml;
                delete button.dataset.originalHtml;
            } else if (!isLoading) {
                const canResume = getSavedUnfinished()?.quizId === button.dataset.startQuiz;
                button.innerHTML = `<i class="fas fa-play" aria-hidden="true"></i> ${canResume ? "Resume / Start" : "Start Test"}`;
            }
        });
    }

    function normalizeArray(value, length, fallback) {
        const source = Array.isArray(value) ? value.slice(0, length) : [];
        while (source.length < length) source.push(fallback);
        return source;
    }

    function normalizeOptions(value) {
        const source = Array.isArray(value) ? value.filter((option) => option !== undefined && option !== null) : [];
        return source.map(function (option, index) {
            if (option && typeof option === "object") {
                const textMap = normalizeTextMap(option.text ?? option.label ?? option.value ?? option);
                return {
                    text: getLocalizedText(textMap, state.language, option.text ?? option.label ?? option.value ?? ""),
                    textMap,
                    image: normalizeMedia(option.image || option.src || option.url, option.imageAlt || option.alt || `Option ${index + 1} image`)
                };
            }

            return {
                text: String(option ?? "").trim(),
                image: null
            };
        });
    }

    function normalizeOptionTextMaps(optionTextMaps, options, normalizedOptions) {
        const mapSource = Array.isArray(optionTextMaps) ? optionTextMaps : [];
        const optionSource = Array.isArray(options) ? options : [];
        const length = Math.max(mapSource.length, optionSource.length, normalizedOptions.length);
        return Array.from({ length }, function (_item, index) {
            return normalizeTextMap(mapSource[index]) ||
                normalizeTextMap(optionSource[index]?.text ?? optionSource[index]?.label ?? optionSource[index]?.value ?? optionSource[index]) ||
                normalizedOptions[index]?.textMap ||
                null;
        });
    }

    function normalizeTextMap(value) {
        if (!value || typeof value !== "object" || Array.isArray(value)) return null;
        const hi = String(value.hi || value.hindi || "").trim();
        const en = String(value.en || value.english || "").trim();
        if (!hi && !en && (value.src || value.url || value.path || value.image)) return null;
        return hi || en ? { hi, en } : null;
    }

    function getLocalizedText(textMap, language, fallback) {
        const safeLanguage = normalizeQuizLanguage(language);
        const map = normalizeTextMap(textMap);
        if (!map) return typeof fallback === "object" ? "" : String(fallback || "").trim();
        const preferred = String(map[safeLanguage] || "").trim();
        if (preferred) return preferred;
        return safeLanguage === "en" ? (map.en || map.hi || "") : (map.hi || map.en || "");
    }

    function hasBilingualQuestionText(question) {
        return hasBothLanguages(question.questionTextMap) ||
            hasBothLanguages(question.explanationTextMap) ||
            (Array.isArray(question.optionTextMaps) && question.optionTextMaps.some(hasBothLanguages));
    }

    function hasBothLanguages(textMap) {
        const map = normalizeTextMap(textMap);
        return Boolean(map && map.hi && map.en);
    }

    function getQuestionText(question) {
        return getLocalizedText(question.questionTextMap, state.language, question.question);
    }

    function getOptionText(question, index) {
        return getLocalizedText(question.optionTextMaps?.[index], state.language, question.options?.[index]);
    }

    function getExplanationText(question) {
        return getLocalizedText(question.explanationTextMap, state.language, question.explanation || "Explanation is not available.");
    }

    function normalizeQuizLanguage(value) {
        return String(value || "").toLowerCase() === "en" ? "en" : "hi";
    }

    function getStoredQuizLanguage() {
        return normalizeQuizLanguage(storage.read(QUIZ_LANGUAGE_KEY, "hi"));
    }

    function normalizeOptionImages(optionImages, normalizedOptions) {
        const source = Array.isArray(optionImages) ? optionImages : [];
        const length = Math.max(source.length, normalizedOptions.length);
        return Array.from({ length }, function (_item, index) {
            return normalizeMedia(source[index], `Option ${index + 1} image`) || normalizedOptions[index]?.image || null;
        });
    }

    function normalizeMedia(value, fallbackAlt) {
        if (!value) return null;

        if (typeof value === "string") {
            const src = value.trim();
            return src ? { src, alt: fallbackAlt || "" } : null;
        }

        if (typeof value !== "object") return null;

        const src = String(value.src || value.url || value.path || "").trim();
        if (!src) return null;

        return {
            src,
            alt: String(value.alt || value.imageAlt || fallbackAlt || "").trim(),
            caption: String(value.caption || "").trim()
        };
    }

    function renderMedia(media, modifierClass, fallbackAlt) {
        if (!media?.src) return "";
        const className = modifierClass ? ` quiz-media-${escapeAttr(modifierClass)}` : "";
        const caption = media.caption ? `<figcaption>${escapeHtml(media.caption)}</figcaption>` : "";

        return `
            <figure class="quiz-media${className}">
                <div class="quiz-media-frame">
                    <img src="${escapeAttr(media.src)}" alt="${escapeAttr(media.alt || fallbackAlt || "")}" loading="lazy" decoding="async">
                </div>
                ${caption}
            </figure>
        `;
    }

    function normalizeRichTextSource(value) {
        return String(value ?? "").replace(/\\\\(?=[A-Za-z()[\]])/g, "\\");
    }

    function formatRichText(value) {
        let html = escapeHtml(normalizeRichTextSource(value));
        const replacements = [
            [/\[b\]([\s\S]*?)\[\/b\]/gi, '<strong class="text-bold">$1</strong>'],
            [/\[u\]([\s\S]*?)\[\/u\]/gi, '<span class="text-underline">$1</span>'],
            [/\[mark\]([\s\S]*?)\[\/mark\]/gi, '<mark class="text-mark">$1</mark>'],
            [/\[red\]([\s\S]*?)\[\/red\]/gi, '<span class="text-red">$1</span>']
        ];

        for (let pass = 0; pass < 3; pass += 1) {
            replacements.forEach(function ([pattern, replacement]) {
                html = html.replace(pattern, replacement);
            });
        }

        return html;
    }

    function setRichText(node, value) {
        if (node) node.innerHTML = formatRichText(value);
    }

    function typesetQuizMath(root) {
        if (!root) return;
        pendingMathRoot = root;
        if (!window.MathJax || !window.MathJax.typesetPromise) {
            ensureMathJax(root);
            scheduleMathRetry();
            return;
        }
        window.clearTimeout(mathRetryTimer);
        mathRetryTimer = 0;
        mathRetryCount = 0;
        if (window.MathJax.typesetClear) {
            window.MathJax.typesetClear([root]);
        }
        window.MathJax.typesetPromise([root]).catch(function () {});
    }

    function ensureMathJax(root) {
        if (mathJaxLoader || !rootHasMath(root)) return;
        mathJaxLoader = new Promise(function (resolve, reject) {
            const script = document.createElement("script");
            script.src = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js";
            script.async = true;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        }).catch(function () {
            mathRetryCount = 20;
        });
    }

    function rootHasMath(root) {
        const html = root.innerHTML || "";
        return /\\\(|\\\[|\\begin\{|\\frac\{|\\sqrt\{|\\times|\\div/.test(html);
    }

    function scheduleMathRetry() {
        if (mathRetryTimer || mathRetryCount >= 20) return;
        mathRetryTimer = window.setTimeout(function () {
            mathRetryTimer = 0;
            mathRetryCount += 1;
            if (pendingMathRoot) typesetQuizMath(pendingMathRoot);
        }, 250);
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

    function getQuizQuestionCount(quiz) {
        if (Array.isArray(quiz?.questions) && quiz.questions.length) return quiz.questions.length;
        const totalQuestions = Number(quiz?.totalQuestions);
        return Number.isFinite(totalQuestions) && totalQuestions > 0 ? Math.round(totalQuestions) : 0;
    }

    function getQuizQuestionCountLabel(quiz) {
        const questionCount = getQuizQuestionCount(quiz);
        return questionCount ? `${formatNumber(questionCount)} Questions` : "Questions";
    }

    function debounce(fn, delay) {
        let timer = 0;
        return function (...args) {
            window.clearTimeout(timer);
            timer = window.setTimeout(function () {
                fn.apply(null, args);
            }, delay);
        };
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
