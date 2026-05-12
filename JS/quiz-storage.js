(function () {
    function initQuizMobileHeaderFix() {
        if (document.getElementById('gjuQuizMobileHeaderFix')) return;
        const style = document.createElement('style');
        style.id = 'gjuQuizMobileHeaderFix';
        style.textContent = `
            @media (max-width: 767px) {
                body.page-loaded { transform: none !important; }
                body:not(.gju-quiz-exam-mode) { padding-top: 68px !important; }
                body.gju-quiz-exam-mode { padding-top: 0 !important; overflow-x: hidden !important; }
                body:not(.gju-quiz-exam-mode) > header { position: fixed !important; top: 0 !important; left: 0 !important; right: 0 !important; width: 100% !important; z-index: 100000 !important; background: rgba(255,255,255,.98) !important; transform: translateZ(0) !important; }
                body.gju-quiz-exam-mode > header { display: none !important; }
                body:not(.gju-quiz-exam-mode) > header .header-container { background: rgba(255,255,255,.98) !important; }
                body:not(.gju-quiz-exam-mode) > header nav { position: fixed !important; top: 68px !important; left: 0 !important; right: 0 !important; z-index: 99999 !important; max-height: calc(100dvh - 68px) !important; overflow-y: auto !important; overscroll-behavior: contain !important; -webkit-overflow-scrolling: touch !important; }
                body.gju-quiz-exam-mode .quiz-page { padding: 0 !important; margin: 0 !important; min-height: 100dvh !important; }
                body.gju-quiz-exam-mode .quiz-home-view, body.gju-quiz-exam-mode footer { display: none !important; }
                body.gju-quiz-exam-mode .quiz-exam-view { display: block !important; min-height: 100dvh !important; }
                body.gju-quiz-exam-mode .exam-shell { min-height: 100dvh !important; padding: 0 !important; }
                body.gju-quiz-exam-mode .exam-main { min-height: 100dvh !important; padding-bottom: 86px !important; }
                body.gju-quiz-exam-mode .exam-actions { position: fixed !important; left: 0 !important; right: 0 !important; bottom: 0 !important; z-index: 1000 !important; background: #202225 !important; padding: 10px 10px max(10px, env(safe-area-inset-bottom)) !important; border-top: 1px solid rgba(255,255,255,.08) !important; display: grid !important; grid-template-columns: 1fr 1fr 1fr !important; gap: 8px !important; }
                body.gju-quiz-exam-mode .exam-actions .quiz-btn { min-width: 0 !important; width: 100% !important; min-height: 44px !important; padding: 8px 6px !important; font-size: 12px !important; white-space: normal !important; }
            }
        `;
        document.head.appendChild(style);
    }

    function syncQuizExamMode() {
        const examView = document.getElementById('examView');
        const isExamVisible = Boolean(examView && !examView.classList.contains('hidden'));
        document.body.classList.toggle('gju-quiz-exam-mode', isExamVisible);
    }

    function initQuizExamModeWatcher() {
        syncQuizExamMode();
        const examView = document.getElementById('examView');
        const homeView = document.getElementById('homeView');
        const target = document.getElementById('quizApp') || document.body;
        const observer = new MutationObserver(syncQuizExamMode);
        if (examView) observer.observe(examView, { attributes: true, attributeFilter: ['class', 'hidden'] });
        if (homeView) observer.observe(homeView, { attributes: true, attributeFilter: ['class', 'hidden'] });
        observer.observe(target, { attributes: true, attributeFilter: ['class'] });
        window.addEventListener('pageshow', syncQuizExamMode, { passive: true });
        window.addEventListener('resize', syncQuizExamMode, { passive: true });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initQuizMobileHeaderFix();
            initQuizExamModeWatcher();
        });
    } else {
        initQuizMobileHeaderFix();
        initQuizExamModeWatcher();
    }

    const memory = {};
    const prefix = 'GovJobUpdatesQuiz.';
    let firebaseImportPromise = null;
    let lastSyncedAttemptKey = '';

    function available() {
        try {
            const key = `${prefix}test`;
            localStorage.setItem(key, '1');
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            return false;
        }
    }

    const canUseLocalStorage = available();

    function read(key, fallback) {
        try {
            const raw = canUseLocalStorage ? localStorage.getItem(prefix + key) : memory[key];
            return raw ? JSON.parse(raw) : fallback;
        } catch (error) {
            return fallback;
        }
    }

    function scheduleIdle(task) {
        if ('requestIdleCallback' in window) {
            window.requestIdleCallback(task, { timeout: 2500 });
            return;
        }
        window.setTimeout(task, 900);
    }

    function getAttemptDocId(attempt) {
        const raw = [
            attempt?.id,
            attempt?.quizId,
            attempt?.completedAt,
            attempt?.timestamp,
            attempt?.score,
            attempt?.percentage
        ].filter(Boolean).join('-') || String(Date.now());
        return raw.replace(/[^a-zA-Z0-9_-]/g, '-').slice(0, 120);
    }

    function toSafeAttempt(attempt) {
        const score = Number(attempt?.score) || 0;
        const maxScore = Number(attempt?.maxScore) || 0;
        const percentage = Number(attempt?.percentage) || 0;
        return {
            id: getAttemptDocId(attempt),
            quizId: String(attempt?.quizId || ''),
            quizTitle: String(attempt?.quizTitle || attempt?.title || 'Quiz Attempt'),
            subject: String(attempt?.subject || attempt?.quizSubject || attempt?.category || 'Quiz'),
            score,
            maxScore,
            percentage,
            correct: Number(attempt?.correct) || 0,
            wrong: Number(attempt?.wrong) || 0,
            unanswered: Number(attempt?.unanswered) || Number(attempt?.skipped) || 0,
            totalQuestions: Number(attempt?.totalQuestions) || Number(attempt?.questionCount) || 0,
            durationMinutes: Number(attempt?.durationMinutes) || 0,
            timeTakenSeconds: Number(attempt?.timeTakenSeconds) || 0,
            completedAt: String(attempt?.completedAt || attempt?.timestamp || new Date().toISOString()),
            syncedFrom: 'web-localStorage'
        };
    }

    async function getFirebaseModules() {
        if (firebaseImportPromise) return firebaseImportPromise;
        firebaseImportPromise = Promise.all([
            import('https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js'),
            import('https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js'),
            import('https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js')
        ]).then(([appMod, authMod, firestoreMod]) => ({ appMod, authMod, firestoreMod }));
        return firebaseImportPromise;
    }

    async function syncAttemptToFirestore(attempt) {
        const config = window.GJU_FIREBASE_CONFIG;
        if (!config || !config.apiKey || !attempt) return;
        try {
            const { appMod, authMod, firestoreMod } = await getFirebaseModules();
            const app = appMod.getApps().length ? appMod.getApps()[0] : appMod.initializeApp(config);
            const auth = authMod.getAuth(app);
            const user = auth.currentUser;
            if (!user) return;
            const db = firestoreMod.getFirestore(app);
            const safeAttempt = toSafeAttempt(attempt);
            const docRef = firestoreMod.doc(db, 'users', user.uid, 'quizAttempts', safeAttempt.id);
            await firestoreMod.setDoc(docRef, {
                ...safeAttempt,
                userId: user.uid,
                userEmail: user.email || '',
                updatedAt: firestoreMod.serverTimestamp()
            }, { merge: true });
            window.dispatchEvent(new CustomEvent('gju:quiz-attempt-synced', { detail: { attemptId: safeAttempt.id } }));
        } catch (error) {
            console.warn('[GovJobUpdates] Quiz Firebase sync skipped:', error.message);
        }
    }

    function maybeSyncAttempts(key, value) {
        if (key !== 'attempts' || !Array.isArray(value) || !value.length) return;
        const latest = value[0];
        const syncKey = getAttemptDocId(latest);
        if (!syncKey || syncKey === lastSyncedAttemptKey) return;
        lastSyncedAttemptKey = syncKey;
        scheduleIdle(() => syncAttemptToFirestore(latest));
    }

    function write(key, value) {
        let saved = false;
        try {
            const raw = JSON.stringify(value);
            if (canUseLocalStorage) {
                localStorage.setItem(prefix + key, raw);
            } else {
                memory[key] = raw;
            }
            saved = true;
        } catch (error) {
            memory[key] = JSON.stringify(value);
            saved = false;
        }
        maybeSyncAttempts(key, value);
        return saved;
    }

    function remove(key) {
        try {
            if (canUseLocalStorage) {
                localStorage.removeItem(prefix + key);
            }
            delete memory[key];
        } catch (error) {
            delete memory[key];
        }
    }

    function clearHistory() {
        write('attempts', []);
        write('performance', {});
    }

    window.QuizStorage = {
        read,
        write,
        remove,
        clearHistory,
        isPersistent: canUseLocalStorage
    };
})();
