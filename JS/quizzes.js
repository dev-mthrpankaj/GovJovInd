(function () {
    const quizData = window.SARKARI_QUIZ || { subjects: [], categories: [], questions: [] };
    const storage = window.QuizStorage || {
        read: (_key, fallback) => fallback,
        write: () => false,
        remove: () => {},
        clearHistory: () => {}
    };

    const views = {};
    const app = {
        settings: defaultSettings(),
        questions: [],
        answers: [],
        statuses: [],
        current: 0,
        startedAt: 0,
        elapsed: 0,
        fullRemaining: 0,
        questionRemaining: 0,
        timerId: null,
        lastResult: null,
        reviewFilter: 'all',
        reviewSearch: ''
    };

    const icons = {
        Mathematics: 'fa-calculator',
        English: 'fa-language',
        Reasoning: 'fa-brain',
        'General Awareness': 'fa-globe',
        Science: 'fa-flask',
        Hindi: 'fa-book',
        Computer: 'fa-laptop'
    };

    document.addEventListener('DOMContentLoaded', init);

    function init() {
        cacheViews();
        initHeaderMenu();
        renderHome();
        renderSetupOptions();
        bindEvents();
        showView('home');
    }

    function cacheViews() {
        ['home', 'setup', 'exam', 'result', 'review', 'history'].forEach(name => {
            views[name] = document.getElementById(`${name}View`);
        });
    }

    function initHeaderMenu() {
        const toggle = document.querySelector('.menu-toggle');
        const nav = document.querySelector('nav');
        if (!toggle || !nav) return;
        toggle.addEventListener('click', () => {
            const open = nav.classList.toggle('active');
            toggle.setAttribute('aria-expanded', String(open));
            toggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
        });
    }

    function bindEvents() {
        document.body.addEventListener('click', handleClick);
        document.getElementById('quizSetupForm').addEventListener('submit', event => {
            event.preventDefault();
            startQuizFromSetup();
        });
        document.getElementById('quizSetupForm').addEventListener('change', () => {
            document.querySelectorAll('.option-tile').forEach(label => {
                const input = label.querySelector('input');
                if (input) label.classList.toggle('selected', input.checked);
            });
        });
        document.getElementById('subjectOptions').addEventListener('change', syncTopics);
        document.getElementById('categoryOptions').addEventListener('change', syncTopics);
        document.addEventListener('keydown', handleKeyboard);
        window.addEventListener('beforeunload', persistUnfinished);
    }

    function handleClick(event) {
        const actionTarget = event.target.closest('[data-action]');
        const subjectCard = event.target.closest('[data-subject]');
        const option = event.target.closest('[data-option-index]');
        const palette = event.target.closest('[data-question-index]');
        const reviewFilter = event.target.closest('[data-review-filter]');

        if (subjectCard) {
            openSetup({ subject: subjectCard.dataset.subject });
            return;
        }
        if (option) {
            selectOption(Number(option.dataset.optionIndex));
            return;
        }
        if (palette) {
            goQuestion(Number(palette.dataset.questionIndex));
            closePalette();
            return;
        }
        if (reviewFilter) {
            app.reviewFilter = reviewFilter.dataset.reviewFilter;
            renderReview();
            return;
        }
        if (!actionTarget) return;

        const action = actionTarget.dataset.action;
        const handlers = {
            'start-flow': () => openSetup({ category: actionTarget.dataset.category }),
            'continue-quiz': continueQuiz,
            'show-history': showHistory,
            'go-home': () => { stopTimer(); showView('home'); renderHome(); },
            'select-all-topics': () => setAllTopics(true),
            'clear-topics': () => setAllTopics(false),
            'prev-question': () => goQuestion(app.current - 1),
            'next-question': () => goQuestion(app.current + 1),
            'save-next': saveAndNext,
            'clear-response': clearResponse,
            'mark-review': markReview,
            'submit-confirm': openSubmitModal,
            'submit-now': () => finishQuiz('manual'),
            'cancel-submit': closeSubmitModal,
            'open-palette': openPalette,
            'close-palette': closePalette,
            'new-quiz': () => openSetup(),
            'review-answers': () => { showView('review'); renderReview(); },
            'back-results': () => showView('result'),
            'export-json': exportResult,
            'clear-history': clearHistory
        };
        handlers[action]?.();
    }

    function handleKeyboard(event) {
        if (views.exam.classList.contains('hidden') || document.getElementById('submitModal').classList.contains('hidden') === false) return;
        const key = event.key.toLowerCase();
        if (['1', '2', '3', '4'].includes(key)) {
            event.preventDefault();
            selectOption(Number(key) - 1);
        }
        if (key === 'n') { event.preventDefault(); saveAndNext(); }
        if (key === 'p') { event.preventDefault(); goQuestion(app.current - 1); }
        if (key === 'm') { event.preventDefault(); markReview(); }
        if (key === 'c') { event.preventDefault(); clearResponse(); }
        if (key === 's') { event.preventDefault(); openSubmitModal(); }
    }

    function defaultSettings() {
        return {
            subjects: ['Mathematics'],
            category: 'SSC',
            topics: [],
            difficulty: 'mixed',
            count: 10,
            timerType: 'fullTest',
            timerValue: 45,
            negativeMarking: true,
            shuffleQuestions: true,
            shuffleOptions: false,
            mode: 'practice'
        };
    }

    function showView(name) {
        Object.entries(views).forEach(([key, node]) => node.classList.toggle('hidden', key !== name));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function renderHome() {
        renderSubjectCards();
        renderExamChips();
        renderDashboard();
        renderRecentAttempts();
        document.getElementById('continueQuizBtn').classList.toggle('hidden', !storage.read('unfinished', null));
    }

    function renderSubjectCards() {
        document.getElementById('subjectCards').innerHTML = quizData.subjects.map(subject => {
            const count = quizData.questions.filter(q => q.subject === subject).length;
            return `<button class="subject-card" type="button" data-subject="${escapeAttr(subject)}">
                <span class="subject-icon"><i class="fas ${icons[subject] || 'fa-book'}"></i></span>
                <h3>${subject}</h3>
                <p>${count} exam-style questions with explanations.</p>
            </button>`;
        }).join('');
    }

    function renderExamChips() {
        document.getElementById('examChips').innerHTML = quizData.categories.map(category =>
            `<button class="chip" type="button" data-action="start-flow" data-category="${escapeAttr(category)}">${category}</button>`
        ).join('');
    }

    function renderDashboard() {
        const attempts = storage.read('attempts', []);
        const best = attempts.reduce((max, item) => Math.max(max, item.percentage || 0), 0);
        const avg = attempts.length ? Math.round(attempts.reduce((sum, item) => sum + (item.accuracy || 0), 0) / attempts.length) : 0;
        document.getElementById('bestScore').textContent = `${best}%`;
        document.getElementById('totalAttempts').textContent = attempts.length;
        document.getElementById('avgAccuracy').textContent = `${avg}%`;
    }

    function renderRecentAttempts() {
        const attempts = storage.read('attempts', []).slice(0, 5);
        document.getElementById('recentAttempts').innerHTML = attempts.length
            ? attempts.map(item => `<article class="recent-item"><strong>${item.title}</strong><span>${item.percentage}% score · ${item.accuracy}% accuracy · ${new Date(item.completedAt).toLocaleString()}</span></article>`).join('')
            : '<p class="result-subtext">No attempts yet. Start your first practice quiz.</p>';
    }

    function renderSetupOptions() {
        document.getElementById('subjectOptions').innerHTML = quizData.subjects.map((subject, index) =>
            `<label class="option-tile ${index === 0 ? 'selected' : ''}"><input type="checkbox" name="subjects" value="${escapeAttr(subject)}" ${index === 0 ? 'checked' : ''}> <strong>${subject}</strong><span>${topicsForSubject(subject).length} topics</span></label>`
        ).join('');
        document.getElementById('categoryOptions').innerHTML = quizData.categories.map((category, index) =>
            `<label class="option-tile ${index === 0 ? 'selected' : ''}"><input type="radio" name="category" value="${escapeAttr(category)}" ${index === 0 ? 'checked' : ''}> <strong>${category}</strong></label>`
        ).join('');
        syncTopics();
    }

    function openSetup(seed = {}) {
        showMessage('');
        showView('setup');
        if (seed.subject) {
            document.querySelectorAll('input[name="subjects"]').forEach(input => {
                input.checked = input.value === seed.subject;
                input.closest('.option-tile').classList.toggle('selected', input.checked);
            });
            syncTopics();
        }
        if (seed.category) {
            document.querySelectorAll('input[name="category"]').forEach(input => {
                input.checked = input.value === seed.category;
                input.closest('.option-tile').classList.toggle('selected', input.checked);
            });
        }
    }

    function syncTopics() {
        document.querySelectorAll('.option-tile').forEach(label => {
            const input = label.querySelector('input');
            if (input) label.classList.toggle('selected', input.checked);
        });
        const subjects = selectedValues('subjects');
        const topics = [...new Set(quizData.questions.filter(q => subjects.includes(q.subject)).map(q => q.topic))].sort();
        document.getElementById('topicOptions').innerHTML = topics.map(topic =>
            `<label class="option-tile selected"><input type="checkbox" name="topics" value="${escapeAttr(topic)}" checked> <strong>${topic}</strong></label>`
        ).join('');
    }

    function setAllTopics(checked) {
        document.querySelectorAll('input[name="topics"]').forEach(input => {
            input.checked = checked;
            input.closest('.option-tile').classList.toggle('selected', checked);
        });
    }

    function selectedValues(name) {
        return [...document.querySelectorAll(`input[name="${name}"]:checked`)].map(input => input.value);
    }

    function getSettingsFromForm() {
        return {
            subjects: selectedValues('subjects'),
            category: document.querySelector('input[name="category"]:checked')?.value || 'SSC',
            topics: selectedValues('topics'),
            difficulty: document.querySelector('input[name="difficulty"]:checked')?.value || 'mixed',
            count: Number(document.getElementById('questionCount').value),
            timerType: document.getElementById('timerType').value,
            timerValue: Number(document.getElementById('timerValue').value),
            negativeMarking: document.getElementById('negativeMarking').checked,
            shuffleQuestions: document.getElementById('shuffleQuestions').checked,
            shuffleOptions: document.getElementById('shuffleOptions').checked,
            mode: document.getElementById('quizMode').value
        };
    }

    function startQuizFromSetup() {
        const settings = getSettingsFromForm();
        const pool = filterQuestions(settings);
        if (!settings.subjects.length) return showMessage('Please select at least one subject.', 'error');
        if (!settings.topics.length) return showMessage('Please select at least one topic.', 'error');
        if (!pool.length) return showMessage('No questions match these filters. Try Mixed difficulty, more topics, or another exam category.', 'error');

        app.settings = settings;
        const picked = (settings.shuffleQuestions ? shuffle([...pool]) : [...pool]).slice(0, Math.min(settings.count, pool.length));
        app.questions = picked.map(q => prepareQuestion(q, settings.shuffleOptions));
        app.answers = app.questions.map(() => null);
        app.statuses = app.questions.map(() => 'not-visited');
        app.current = 0;
        app.elapsed = 0;
        app.startedAt = Date.now();
        app.fullRemaining = settings.timerType === 'fullTest' ? getFullTestSeconds(settings, app.questions.length) : 0;
        app.questionRemaining = settings.timerType === 'perQuestion' ? settings.timerValue : 0;
        app.statuses[0] = 'not-answered';
        storage.write('settings', settings);
        storage.write('unfinished', serializeAttempt());
        renderExam();
        startTimer();
        showView('exam');
    }

    function filterQuestions(settings) {
        return quizData.questions.filter(q => {
            const subjectOk = settings.subjects.includes(q.subject);
            const topicOk = settings.topics.includes(q.topic);
            const difficultyOk = settings.difficulty === 'mixed' || q.difficulty === settings.difficulty;
            const categoryOk = q.examTags.includes(settings.category);
            return subjectOk && topicOk && difficultyOk && categoryOk;
        });
    }

    function prepareQuestion(question, shuffleOptions) {
        const copy = JSON.parse(JSON.stringify(question));
        if (!shuffleOptions) return copy;
        const options = copy.options.map((text, index) => ({ text, index }));
        shuffle(options);
        copy.options = options.map(item => item.text);
        copy.correctAnswer = options.findIndex(item => item.index === question.correctAnswer);
        return copy;
    }

    function getFullTestSeconds(settings, count) {
        if (settings.timerValue >= 300) return settings.timerValue;
        return settings.timerValue * count;
    }

    function renderExam() {
        const q = app.questions[app.current];
        if (!q) return;
        document.getElementById('examSubject').textContent = app.settings.subjects.join(', ');
        document.getElementById('currentQuestionNo').textContent = app.current + 1;
        document.getElementById('totalQuestionNo').textContent = app.questions.length;
        document.getElementById('quizProgress').style.width = `${((app.current + 1) / app.questions.length) * 100}%`;

        document.getElementById('questionCard').innerHTML = `<div class="question-meta">
            <span class="meta-pill">${q.subject}</span>
            <span class="meta-pill">${q.topic}</span>
            <span class="meta-pill">${q.difficulty}</span>
            <span class="meta-pill">${q.marks} mark${app.settings.negativeMarking ? `, -${q.negativeMarks}` : ''}</span>
        </div>
        <h2 class="question-title">${escapeHtml(q.question)}</h2>
        <div class="option-list" role="radiogroup" aria-label="Answer options">
            ${q.options.map((option, index) => `<button class="answer-option ${app.answers[app.current] === index ? 'selected' : ''}" type="button" data-option-index="${index}" aria-pressed="${app.answers[app.current] === index}">
                <span class="option-key">${index + 1}</span><span>${escapeHtml(option)}</span>
            </button>`).join('')}
        </div>`;
        renderPalette();
        updateTimerText();
    }

    function renderPalette() {
        document.getElementById('questionPalette').innerHTML = app.questions.map((_q, index) => {
            const status = app.statuses[index] || 'not-visited';
            return `<button class="palette-btn ${status} ${index === app.current ? 'current' : ''}" type="button" data-question-index="${index}" aria-label="Question ${index + 1}, ${status.replace('-', ' ')}">${index + 1}</button>`;
        }).join('');
    }

    function selectOption(index) {
        app.answers[app.current] = index;
        app.statuses[app.current] = app.statuses[app.current] === 'marked' || app.statuses[app.current] === 'answered-marked' ? 'answered-marked' : 'answered';
        persistUnfinished();
        renderExam();
    }

    function clearResponse() {
        app.answers[app.current] = null;
        app.statuses[app.current] = app.statuses[app.current] === 'answered-marked' || app.statuses[app.current] === 'marked' ? 'marked' : 'not-answered';
        persistUnfinished();
        renderExam();
    }

    function markReview() {
        app.statuses[app.current] = app.answers[app.current] === null ? 'marked' : 'answered-marked';
        persistUnfinished();
        renderExam();
    }

    function saveAndNext() {
        if (app.statuses[app.current] === 'not-visited') app.statuses[app.current] = 'not-answered';
        if (app.current < app.questions.length - 1) {
            goQuestion(app.current + 1);
        } else {
            openSubmitModal();
        }
    }

    function goQuestion(index) {
        if (index < 0 || index >= app.questions.length) return;
        if (app.statuses[app.current] === 'not-visited') app.statuses[app.current] = 'not-answered';
        app.current = index;
        if (app.statuses[app.current] === 'not-visited') app.statuses[app.current] = 'not-answered';
        if (app.settings.timerType === 'perQuestion') app.questionRemaining = app.settings.timerValue;
        persistUnfinished();
        renderExam();
    }

    function startTimer() {
        stopTimer();
        if (app.settings.timerType === 'none') {
            updateTimerText();
            return;
        }
        app.timerId = setInterval(() => {
            app.elapsed++;
            if (app.settings.timerType === 'fullTest') {
                app.fullRemaining--;
                if (app.fullRemaining <= 0) finishQuiz('time');
            }
            if (app.settings.timerType === 'perQuestion') {
                app.questionRemaining--;
                if (app.questionRemaining <= 0) {
                    if (app.current >= app.questions.length - 1) {
                        finishQuiz('time');
                    } else {
                        saveAndNext();
                    }
                }
            }
            updateTimerText();
            persistUnfinished();
        }, 1000);
    }

    function stopTimer() {
        clearInterval(app.timerId);
        app.timerId = null;
    }

    function updateTimerText() {
        const pill = document.getElementById('timerPill');
        const text = document.getElementById('timerText');
        pill.classList.remove('warning');
        if (app.settings.timerType === 'none') {
            text.textContent = 'No timer';
            return;
        }
        const remaining = app.settings.timerType === 'fullTest' ? app.fullRemaining : app.questionRemaining;
        const total = app.settings.timerType === 'fullTest' ? getFullTestSeconds(app.settings, app.questions.length) : app.settings.timerValue;
        if (remaining / total <= 0.2) pill.classList.add('warning');
        text.textContent = formatTime(Math.max(0, remaining));
    }

    function openSubmitModal() {
        const attempted = app.answers.filter(answer => answer !== null).length;
        document.getElementById('submitSummary').textContent = `Attempted ${attempted} of ${app.questions.length}. Marked for review: ${app.statuses.filter(s => s.includes('marked')).length}.`;
        document.getElementById('submitModal').classList.remove('hidden');
    }

    function closeSubmitModal() {
        document.getElementById('submitModal').classList.add('hidden');
    }

    function finishQuiz(reason) {
        stopTimer();
        closeSubmitModal();
        const result = calculateResult(reason);
        app.lastResult = result;
        storage.remove('unfinished');
        saveCompletedAttempt(result);
        renderResult();
        renderHome();
        showView('result');
    }

    function calculateResult(reason) {
        let correct = 0;
        let incorrect = 0;
        let marksGained = 0;
        let negativeMarks = 0;
        const subjectBreakdown = {};
        const difficultyBreakdown = {};
        const topicBreakdown = {};

        app.questions.forEach((q, index) => {
            const selected = app.answers[index];
            const attempted = selected !== null;
            const isCorrect = selected === q.correctAnswer;
            if (attempted && isCorrect) {
                correct++;
                marksGained += q.marks;
            }
            if (attempted && !isCorrect) {
                incorrect++;
                if (app.settings.negativeMarking) negativeMarks += q.negativeMarks;
            }
            addBreakdown(subjectBreakdown, q.subject, attempted, isCorrect);
            addBreakdown(difficultyBreakdown, q.difficulty, attempted, isCorrect);
            addBreakdown(topicBreakdown, q.topic, attempted, isCorrect);
        });

        const total = app.questions.length;
        const attempted = correct + incorrect;
        const unattempted = total - attempted;
        const score = Number((marksGained - negativeMarks).toFixed(2));
        const maxMarks = app.questions.reduce((sum, q) => sum + q.marks, 0);
        const percentage = maxMarks ? Math.max(0, Math.round((score / maxMarks) * 100)) : 0;
        const accuracy = attempted ? Math.round((correct / attempted) * 100) : 0;
        const timeTaken = app.elapsed || Math.floor((Date.now() - app.startedAt) / 1000);

        return {
            id: `attempt-${Date.now()}`,
            title: `${app.settings.subjects.join(', ')} · ${app.settings.category}`,
            completedAt: new Date().toISOString(),
            reason,
            settings: app.settings,
            questions: app.questions,
            answers: app.answers,
            statuses: app.statuses,
            total,
            attempted,
            unattempted,
            correct,
            incorrect,
            marksGained,
            negativeMarks: Number(negativeMarks.toFixed(2)),
            score,
            maxMarks,
            percentage,
            accuracy,
            timeTaken,
            avgTime: total ? Math.round(timeTaken / total) : 0,
            subjectBreakdown,
            difficultyBreakdown,
            topicBreakdown,
            message: percentage >= 80 ? 'Excellent' : percentage >= 55 ? 'Good' : 'Needs Practice'
        };
    }

    function addBreakdown(map, key, attempted, correct) {
        map[key] ||= { total: 0, attempted: 0, correct: 0 };
        map[key].total++;
        if (attempted) map[key].attempted++;
        if (correct) map[key].correct++;
    }

    function saveCompletedAttempt(result) {
        const attempts = storage.read('attempts', []);
        attempts.unshift(result);
        storage.write('attempts', attempts.slice(0, 30));
        storage.write('performance', buildPerformance(attempts));
    }

    function buildPerformance(attempts) {
        return attempts.reduce((map, attempt) => {
            attempt.settings.subjects.forEach(subject => {
                map[subject] ||= { attempts: 0, accuracyTotal: 0 };
                map[subject].attempts++;
                map[subject].accuracyTotal += attempt.accuracy;
            });
            return map;
        }, {});
    }

    function renderResult() {
        const r = app.lastResult;
        views.result.innerHTML = `<article class="result-card score-hero">
            <h1 class="result-title" id="resultTitle">Result Analytics</h1>
            <span class="score-number">${r.percentage}%</span>
            <strong>${r.message}</strong>
            <p class="result-subtext">${r.score}/${r.maxMarks} marks · ${r.reason === 'time' ? 'Auto-submitted on time over' : 'Submitted successfully'}</p>
        </article>
        <section class="result-card stats-grid">${statTiles(r).join('')}</section>
        <section class="result-card chart-grid">
            <div><h2>Accuracy</h2><div class="bar"><span style="width:${r.accuracy}%"></span></div><p>${r.accuracy}%</p></div>
            <div><h2>Correct vs Incorrect</h2><div class="stack-bar"><span class="correct" style="width:${pct(r.correct, r.total)}%"></span><span class="wrong" style="width:${pct(r.incorrect, r.total)}%"></span></div><p>${r.correct} correct, ${r.incorrect} incorrect</p></div>
        </section>
        <section class="result-card breakdown-grid">
            ${renderBreakdown('Subject-wise Breakdown', r.subjectBreakdown)}
            ${renderBreakdown('Difficulty-wise Breakdown', r.difficultyBreakdown)}
        </section>
        <section class="result-card">${renderBreakdown('Topic-wise Performance', r.topicBreakdown)}</section>
        <div class="hero-actions">
            <button class="btn btn-outline" type="button" data-action="review-answers">Review Answers</button>
            <button class="btn btn-ghost" type="button" data-action="export-json">Export Result JSON</button>
            <button class="btn btn-primary" type="button" data-action="new-quiz">Start New Quiz</button>
        </div>`;
    }

    function statTiles(r) {
        return [
            ['Total Questions', r.total], ['Attempted', r.attempted], ['Unattempted', r.unattempted],
            ['Correct', r.correct], ['Incorrect', r.incorrect], ['Accuracy', `${r.accuracy}%`],
            ['Marks Gained', r.marksGained], ['Negative Marks', r.negativeMarks], ['Time Taken', formatTime(r.timeTaken)],
            ['Avg Time / Question', `${r.avgTime}s`], ['Mode', r.settings.mode], ['Category', r.settings.category]
        ].map(([label, value]) => `<div class="info-tile"><span>${label}</span><strong>${value}</strong></div>`);
    }

    function renderBreakdown(title, data) {
        return `<div><h2>${title}</h2>${Object.entries(data).map(([key, item]) => {
            const accuracy = item.attempted ? Math.round(item.correct / item.attempted * 100) : 0;
            return `<div class="topic-row"><strong>${key}</strong><div class="bar"><span style="width:${accuracy}%"></span></div><span>${item.correct}/${item.total} correct · ${accuracy}% accuracy</span></div>`;
        }).join('')}</div>`;
    }

    function renderReview() {
        const r = app.lastResult;
        if (!r) return;
        const list = r.questions.map((q, index) => reviewItem(q, index, r)).filter(Boolean).join('');
        views.review.innerHTML = `<div class="result-card">
            <h1 class="review-title" id="reviewTitle">Answer Review</h1>
            <div class="review-controls">
                <input class="review-search" type="search" value="${escapeAttr(app.reviewSearch)}" placeholder="Search questions or topics" aria-label="Search answer review">
                <div class="filter-row">
                    ${['all', 'correct', 'wrong', 'unattempted', 'marked'].map(f => `<button class="btn ${app.reviewFilter === f ? 'btn-primary' : 'btn-ghost'}" type="button" data-review-filter="${f}">${titleCase(f)}</button>`).join('')}
                </div>
            </div>
        </div>
        ${list || '<article class="review-card"><p>No review items match this filter.</p></article>'}
        <div class="hero-actions"><button class="btn btn-outline" type="button" data-action="back-results">Back to Results</button><button class="btn btn-primary" type="button" data-action="new-quiz">New Quiz</button></div>`;
        views.review.querySelector('.review-search').addEventListener('input', event => {
            app.reviewSearch = event.target.value.toLowerCase();
            renderReview();
        });
    }

    function reviewItem(q, index, result) {
        const selected = result.answers[index];
        const status = selected === null ? 'unattempted' : selected === q.correctAnswer ? 'correct' : 'wrong';
        const marked = result.statuses[index]?.includes('marked');
        if (app.reviewFilter !== 'all' && app.reviewFilter !== status && !(app.reviewFilter === 'marked' && marked)) return '';
        const haystack = `${q.question} ${q.topic} ${q.explanation}`.toLowerCase();
        if (app.reviewSearch && !haystack.includes(app.reviewSearch)) return '';
        return `<article class="review-card">
            <div class="question-meta"><span class="status-badge">${status}</span>${marked ? '<span class="status-badge">marked</span>' : ''}<span class="status-badge">${q.topic}</span><span class="status-badge">${q.difficulty}</span></div>
            <h2>Q${index + 1}. ${escapeHtml(q.question)}</h2>
            <div class="review-answer ${status === 'wrong' ? 'wrong' : ''}">Your answer: ${selected === null ? 'Not attempted' : escapeHtml(q.options[selected])}</div>
            <div class="review-answer correct">Correct answer: ${escapeHtml(q.options[q.correctAnswer])}</div>
            <p><strong>Explanation:</strong> ${escapeHtml(q.explanation)}</p>
        </article>`;
    }

    function showHistory() {
        const attempts = storage.read('attempts', []);
        views.history.innerHTML = `<section class="result-card">
            <h1 id="historyTitle">Quiz History</h1>
            <p class="result-subtext">Completed attempts saved in this browser.</p>
            <div class="hero-actions"><button class="btn btn-ghost" type="button" data-action="go-home">Back Home</button><button class="btn btn-danger" type="button" data-action="clear-history">Clear History</button></div>
        </section>
        ${attempts.length ? attempts.map(item => `<article class="history-card"><strong>${item.title}</strong><p>${item.percentage}% score · ${item.accuracy}% accuracy · ${formatTime(item.timeTaken)} · ${new Date(item.completedAt).toLocaleString()}</p></article>`).join('') : '<article class="history-card"><p>No completed attempts yet.</p></article>'}`;
        showView('history');
    }

    function clearHistory() {
        storage.clearHistory();
        renderHome();
        showHistory();
    }

    function continueQuiz() {
        const saved = storage.read('unfinished', null);
        if (!saved) return;
        Object.assign(app, saved);
        renderExam();
        startTimer();
        showView('exam');
    }

    function serializeAttempt() {
        return {
            settings: app.settings,
            questions: app.questions,
            answers: app.answers,
            statuses: app.statuses,
            current: app.current,
            startedAt: app.startedAt,
            elapsed: app.elapsed,
            fullRemaining: app.fullRemaining,
            questionRemaining: app.questionRemaining
        };
    }

    function persistUnfinished() {
        if (!views.exam || views.exam.classList.contains('hidden') || !app.questions.length) return;
        storage.write('unfinished', serializeAttempt());
    }

    function exportResult() {
        if (!app.lastResult) return;
        const blob = new Blob([JSON.stringify(app.lastResult, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `sarkariofficer-quiz-result-${Date.now()}.json`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);
    }

    function openPalette() {
        document.getElementById('palettePanel').classList.add('open');
    }

    function closePalette() {
        document.getElementById('palettePanel').classList.remove('open');
    }

    function showMessage(message, type = 'info') {
        const box = document.getElementById('setupMessage');
        box.textContent = message;
        box.className = message ? `message-box ${type}` : 'message-box hidden';
    }

    function topicsForSubject(subject) {
        return [...new Set(quizData.questions.filter(q => q.subject === subject).map(q => q.topic))];
    }

    function shuffle(items) {
        for (let i = items.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [items[i], items[j]] = [items[j], items[i]];
        }
        return items;
    }

    function formatTime(seconds) {
        const safe = Math.max(0, Number(seconds) || 0);
        const m = String(Math.floor(safe / 60)).padStart(2, '0');
        const s = String(safe % 60).padStart(2, '0');
        return `${m}:${s}`;
    }

    function pct(value, total) {
        return total ? Math.round(value / total * 100) : 0;
    }

    function titleCase(text) {
        return text.replace('-', ' ').replace(/\b\w/g, char => char.toUpperCase());
    }

    function escapeHtml(value) {
        return String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[char]));
    }

    function escapeAttr(value) {
        return escapeHtml(value);
    }
})();
