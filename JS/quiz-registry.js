(function () {
    "use strict";

    const REQUIRED_QUESTION_COUNT = 50;
    const SCRIPT_TIMEOUT_MS = 15000;
    const subjectOrder = ["Mathematics", "English", "Hindi", "General Awareness", "Reasoning", "Computer"];
    const scriptBaseUrl = new URL(".", document.currentScript?.src || window.location.href);
    const loadedScripts = new Map();
    const validatedQuizzes = new Map();

    const manifest = [

        //Mathematics_Registry
        quizMeta("math-percentage-abhinay-set-1", "Mathematics", "Percentage Practice Set 1", "50 hard percentage questions.", "Hard", "quiz-data/mathematics/math-percentage-abhinay-set-1.js"),
quizMeta("math-percentage-abhinay-set-2", "Mathematics", "Percentage Practice Set 2", "50 hard percentage questions.", "Hard", "quiz-data/mathematics/math-percentage-abhinay-set-2.js"),
        quizMeta("math-set-1", "Mathematics", "Mathematics Practice Set 1", "50 arithmetic and quantitative aptitude questions for SSC, Railway and Police exams.", "Mixed", "quiz-data/mathematics/math-set-1.js"),
        quizMeta("math-set-2", "Mathematics", "Mathematics Practice Set 2", "50 calculation speed, number system, work, average and applied maths questions.", "Moderate", "quiz-data/mathematics/math-set-2.js"),
        quizMeta("math-pyq-set-1", "Mathematics", "Mathematics PYQ Practice Set 1", "50 previous-year style quantitative aptitude questions.", "Previous Year", "quiz-data/mathematics/math-pyq-set-1.js"),
        quizMeta("di-tough-mixed-set-1", "Reasoning", "DI Tough Mixed Set 1", "Data Interpretation", diToughMixedSet1),

        quizMeta("trigonometry-tough-set-1", "Maths", "Trigonometry Tough Set 1", "Trigonometry", trigonometryToughSet1),
        quizMeta("trigonometry-tough-set-1", "Maths", "Trigonometry Tough Set 1", "Trigonometry", trigonometryToughSet1),
        quizMeta("trigonometry-tough-set-2", "Maths", "Trigonometry Tough Set 2", "Trigonometry", trigonometryToughSet2),
        quizMeta("trigonometry-tough-set-3", "Maths", "Trigonometry Tough Set 3", "Trigonometry", trigonometryToughSet3),






        //English_Registry
        quizMeta("english-active-passive-set-1", "English", "English Active Passive Practice Set 1", "50 SSC CGL, CHSL and CPO active-passive voice questions.", "Hard", "quiz-data/english/english-active-passive-set-1.js"),
        quizMeta("english-grammar-set-1", "English", "English Grammar Practice Set 1", "50 grammar questions for SSC, Railway and Police exams.", "Mixed", "quiz-data/english/english-grammar-set-1.js"),
        quizMeta("english-vocabulary-set-1", "English", "English Vocabulary Practice Set 1", "50 vocabulary, antonym, synonym, spelling and usage questions.", "Moderate", "quiz-data/english/english-vocabulary-set-1.js"),
        quizMeta("english-mixed-set-1", "English", "English Mixed Practice Set 1", "50 mixed English grammar and vocabulary questions.", "Mixed", "quiz-data/english/english-mixed-set-1.js"),
        quizMeta("english-narration-set-1", "English", "English Narration Practice Set 1", "50 SSC CGL, CHSL and CPO direct-indirect speech narration questions.", "Previous Year", "quiz-data/english/english-narration-set-1.js"),
        quizMeta("english-one-word-substitution-set-1", "English", "English One Word Substitution Practice Set 1", "50 tough-level One Word Substitution MCQs for SSC CGL, SSC CPO, UPSI, UPPCS and other competitive exams with professional explanations.", "Hard", "quiz-data/english/english-one-word-substitution-set-1.js"),
quizMeta("english-one-word-substitution-set-2", "English", "English One Word Substitution Practice Set 2", "50 tough-level One Word Substitution MCQs for SSC CGL, SSC CPO, UPSI, UPPCS and other competitive exams with professional explanations.", "Hard", "quiz-data/english/english-one-word-substitution-set-2.js"),
quizMeta("english-one-word-substitution-set-3", "English", "English One Word Substitution Practice Set 3", "50 tough-level One Word Substitution MCQs for SSC CGL, SSC CPO, UPSI, UPPCS and other competitive exams with professional explanations.", "Hard", "quiz-data/english/english-one-word-substitution-set-3.js"),
quizMeta("english-one-word-substitution-set-4", "English", "English One Word Substitution Practice Set 4", "50 tough-level One Word Substitution MCQs for SSC CGL, SSC CPO, UPSI, UPPCS and other competitive exams with professional explanations.", "Hard", "quiz-data/english/english-one-word-substitution-set-4.js"),
quizMeta("english-one-word-substitution-set-5", "English", "English One Word Substitution Practice Set 5", "50 tough-level One Word Substitution MCQs for SSC CGL, SSC CPO, UPSI, UPPCS and other competitive exams with professional explanations.", "Hard", "quiz-data/english/english-one-word-substitution-set-5.js"),
quizMeta("english-one-word-substitution-set-6", "English", "English One Word Substitution Practice Set 6", "50 tough-level One Word Substitution MCQs for SSC CGL, SSC CPO, UPSI, UPPCS and other competitive exams with professional explanations.", "Hard", "quiz-data/english/english-one-word-substitution-set-6.js"),
quizMeta("english-one-word-substitution-set-7", "English", "English One Word Substitution Practice Set 7", "50 tough-level One Word Substitution MCQs for SSC CGL, SSC CPO, UPSI, UPPCS and other competitive exams with professional explanations.", "Hard", "quiz-data/english/english-one-word-substitution-set-7.js"),
quizMeta("english-one-word-substitution-set-8", "English", "English One Word Substitution Practice Set 8", "50 tough-level One Word Substitution MCQs for SSC CGL, SSC CPO, UPSI, UPPCS and other competitive exams with professional explanations.", "Hard", "quiz-data/english/english-one-word-substitution-set-8.js"),
quizMeta("english-one-word-substitution-set-9", "English", "English One Word Substitution Practice Set 9", "50 tough-level One Word Substitution MCQs for SSC CGL, SSC CPO, UPSI, UPPCS and other competitive exams with professional explanations.", "Hard", "quiz-data/english/english-one-word-substitution-set-9.js"),
quizMeta("english-one-word-substitution-set-10", "English", "English One Word Substitution Practice Set 10", "50 tough-level One Word Substitution MCQs for SSC CGL, SSC CPO, UPSI, UPPCS and other competitive exams with professional explanations.", "Hard", "quiz-data/english/english-one-word-substitution-set-10.js"),
quizMeta("english-one-word-substitution-set-11", "English", "English One Word Substitution Practice Set 11", "50 tough-level One Word Substitution MCQs for SSC CGL, SSC CPO, UPSI, UPPCS and other competitive exams with professional explanations.", "Hard", "quiz-data/english/english-one-word-substitution-set-11.js"),
quizMeta("english-one-word-substitution-set-12", "English", "English One Word Substitution Practice Set 12", "50 tough-level One Word Substitution MCQs for SSC CGL, SSC CPO, UPSI, UPPCS and other competitive exams with professional explanations.", "Hard", "quiz-data/english/english-one-word-substitution-set-12.js"),
quizMeta("english-one-word-substitution-set-13", "English", "English One Word Substitution Practice Set 13", "50 tough-level One Word Substitution MCQs for SSC CGL, SSC CPO, UPSI, UPPCS and other competitive exams with professional explanations.", "Hard", "quiz-data/english/english-one-word-substitution-set-13.js"),
quizMeta("english-one-word-substitution-set-14", "English", "English One Word Substitution Practice Set 14", "50 tough-level One Word Substitution MCQs for SSC CGL, SSC CPO, UPSI, UPPCS and other competitive exams with professional explanations.", "Hard", "quiz-data/english/english-one-word-substitution-set-14.js"),
quizMeta("english-one-word-substitution-set-15", "English", "English One Word Substitution Practice Set 15", "50 tough-level One Word Substitution MCQs for SSC CGL, SSC CPO, UPSI, UPPCS and other competitive exams with professional explanations.", "Hard", "quiz-data/english/english-one-word-substitution-set-15.js"),
quizMeta("english-one-word-substitution-set-16", "English", "English One Word Substitution Practice Set 16", "50 tough-level One Word Substitution MCQs for SSC CGL, SSC CPO, UPSI, UPPCS and other competitive exams with professional explanations.", "Hard", "quiz-data/english/english-one-word-substitution-set-16.js"),
quizMeta("english-one-word-substitution-set-17", "English", "English One Word Substitution Practice Set 17", "50 tough-level One Word Substitution MCQs for SSC CGL, SSC CPO, UPSI, UPPCS and other competitive exams with professional explanations.", "Hard", "quiz-data/english/english-one-word-substitution-set-17.js"),
quizMeta("english-one-word-substitution-set-18", "English", "English One Word Substitution Practice Set 18", "50 tough-level One Word Substitution MCQs for SSC CGL, SSC CPO, UPSI, UPPCS and other competitive exams with professional explanations.", "Hard", "quiz-data/english/english-one-word-substitution-set-18.js"),
quizMeta("english-one-word-substitution-set-19", "English", "English One Word Substitution Practice Set 19", "50 tough-level One Word Substitution MCQs for SSC CGL, SSC CPO, UPSI, UPPCS and other competitive exams with professional explanations.", "Hard", "quiz-data/english/english-one-word-substitution-set-19.js"),
quizMeta("english-one-word-substitution-set-20", "English", "English One Word Substitution Practice Set 20", "50 tough-level One Word Substitution MCQs for SSC CGL, SSC CPO, UPSI, UPPCS and other competitive exams with professional explanations.", "Hard", "quiz-data/english/english-one-word-substitution-set-20.js"),
quizMeta("english-one-word-substitution-set-21", "English", "English One Word Substitution Practice Set 21", "50 tough-level One Word Substitution MCQs for SSC CGL, SSC CPO, UPSI, UPPCS and other competitive exams with professional explanations.", "Hard", "quiz-data/english/english-one-word-substitution-set-21.js"),
quizMeta("english-one-word-substitution-set-22", "English", "English One Word Substitution Practice Set 22", "50 tough-level One Word Substitution MCQs for SSC CGL, SSC CPO, UPSI, UPPCS and other competitive exams with professional explanations.", "Hard", "quiz-data/english/english-one-word-substitution-set-22.js"),
quizMeta("english-one-word-substitution-set-23", "English", "English One Word Substitution Practice Set 23", "50 tough-level One Word Substitution MCQs for SSC CGL, SSC CPO, UPSI, UPPCS and other competitive exams with professional explanations.", "Hard", "quiz-data/english/english-one-word-substitution-set-23.js"),
quizMeta("english-one-word-substitution-set-24", "English", "English One Word Substitution Practice Set 24", "50 tough-level One Word Substitution MCQs for SSC CGL, SSC CPO, UPSI, UPPCS and other competitive exams with professional explanations.", "Hard", "quiz-data/english/english-one-word-substitution-set-24.js"),






        //Hindi_Registry

        quizMeta("hindi-mixed-grammar-gk-set-1", "Hindi", "Hindi Mixed Grammar GK Practice Set 1", "50 tough-level mixed Hindi Grammar GK MCQs for SSC, UPSI, UPPCS, Police and other competitive exams with professional explanations.", "Hard", "quiz-data/hindi/hindi-mixed-grammar-gk-set-1.js"),
quizMeta("hindi-mixed-grammar-gk-set-2", "Hindi", "Hindi Mixed Grammar GK Practice Set 2", "50 tough-level mixed Hindi Grammar GK MCQs for SSC, UPSI, UPPCS, Police and other competitive exams with professional explanations.", "Hard", "quiz-data/hindi/hindi-mixed-grammar-gk-set-2.js"),
quizMeta("hindi-mixed-grammar-gk-set-3", "Hindi", "Hindi Mixed Grammar GK Practice Set 3", "50 tough-level mixed Hindi Grammar GK MCQs for SSC, UPSI, UPPCS, Police and other competitive exams with professional explanations.", "Hard", "quiz-data/hindi/hindi-mixed-grammar-gk-set-3.js"),
quizMeta("hindi-mixed-grammar-gk-set-4", "Hindi", "Hindi Mixed Grammar GK Practice Set 4", "50 tough-level mixed Hindi Grammar GK MCQs for SSC, UPSI, UPPCS, Police and other competitive exams with professional explanations.", "Hard", "quiz-data/hindi/hindi-mixed-grammar-gk-set-4.js"),

        quizMeta(
    "hindi-varnmala-practice-set-1",
    "Hindi",
    "Hindi Varnmala Practice Set 1",
    "50 tough-level Hindi Varnmala questions for UPSI, UPPCS, PCS and other competitive exams.",
    "Hard",
    "quiz-data/hindi/hindi-varnmala-practice-set-1.js"
),

quizMeta(
    "hindi-varnmala-practice-set-2",
    "Hindi",
    "Hindi Varnmala Practice Set 2",
    "50 tough-level Hindi Varnmala questions for UPSI, UPPCS, PCS and other competitive exams.",
    "Hard",
    "quiz-data/hindi/hindi-varnmala-practice-set-2.js"
),

quizMeta(
    "hindi-varnmala-practice-set-3",
    "Hindi",
    "Hindi Varnmala Practice Set 3",
    "50 tough-level Hindi Varnmala questions for UPSI, UPPCS, PCS and other competitive exams.",
    "Hard",
    "quiz-data/hindi/hindi-varnmala-practice-set-3.js"
),
        quizMeta("hindi-muhavare-upsi-pcs-set-1", "Hindi", "Hindi Muhavare UPSI PCS Practice Set 1", "50 tough-level Hindi Muhavare questions for UPSI, UPPCS and PCS exams.", "Hard", "quiz-data/hindi/hindi-muhavare-upsi-pcs-set-1.js"),
        quizMeta("hindi-alankar-upsi-set-1", "Hindi", "Hindi Alankar UPSI Practice Set 1", "50 most important Hindi Alankar questions for UPSI and other police exams.", "Hard", "quiz-data/hindi/hindi-alankar-upsi-set-1.js"),
        quizMeta("hindi-vyakaran-set-1", "Hindi", "Hindi Vyakaran Practice Set 1", "50 Hindi grammar questions for government exams.", "Mixed", "quiz-data/hindi/hindi-vyakaran-set-1.js"),
        quizMeta("hindi-mixed-set-1", "Hindi", "Hindi Mixed Practice Set 1", "50 mixed Hindi language questions.", "Mixed", "quiz-data/hindi/hindi-mixed-set-1.js"),




        //Reasoning_Registry
        quizMeta("reasoning-mirror-image-very-hard-set-1", "Reasoning", "Reasoning Mirror Image Very Hard Practice Set 1", "50 very hard Mirror Image reasoning MCQs for SSC, Police, UPSI, Railway and other competitive exams with close options and professional explanations.", "Very Hard", "quiz-data/reasoning/reasoning-mirror-image-very-hard-set-1.js"),
        quizMeta("reasoning-mirror-image-very-hard-set-2", "Reasoning", "Reasoning Mirror Image Very Hard Practice Set 2", "50 very hard Mirror Image reasoning MCQs for SSC, Police, UPSI, Railway and other competitive exams with close options and professional explanations.", "Very Hard", "quiz-data/reasoning/reasoning-mirror-image-very-hard-set-2.js"),
        quizMeta("reasoning-water-image-very-hard-set-1", "Reasoning", "Reasoning Water Image Very Hard Practice Set 1", "50 very hard Water Image reasoning MCQs for SSC, Police, UPSI, Railway and other competitive exams with close options and professional explanations.", "Very Hard", "quiz-data/reasoning/reasoning-water-image-very-hard-set-1.js"),
        quizMeta("reasoning-water-image-very-hard-set-2", "Reasoning", "Reasoning Water Image Very Hard Practice Set 2", "50 very hard Water Image reasoning MCQs for SSC, Police, UPSI, Railway and other competitive exams with close options and professional explanations.", "Very Hard", "quiz-data/reasoning/reasoning-water-image-very-hard-set-2.js"),
        quizMeta("reasoning-clock-very-hard-set-1", "Reasoning", "Reasoning Clock Very Hard Practice Set 1", "50 very hard Clock reasoning MCQs for SSC, Police, UPSI, Railway and other competitive exams with close options and professional explanations.", "Very Hard", "quiz-data/reasoning/reasoning-clock-very-hard-set-1.js"),
        quizMeta("reasoning-clock-very-hard-set-2", "Reasoning", "Reasoning Clock Very Hard Practice Set 2", "50 very hard Clock reasoning MCQs for SSC, Police, UPSI, Railway and other competitive exams with close options and professional explanations.", "Very Hard", "quiz-data/reasoning/reasoning-clock-very-hard-set-2.js"),
        quizMeta("reasoning-calendar-very-hard-set-1", "Reasoning", "Reasoning Calendar Very Hard Practice Set 1", "50 very hard Calendar reasoning MCQs for SSC, Police, UPSI, Railway and other competitive exams with close options and professional explanations.", "Very Hard", "quiz-data/reasoning/reasoning-calendar-very-hard-set-1.js"),
        quizMeta("reasoning-calendar-very-hard-set-2", "Reasoning", "Reasoning Calendar Very Hard Practice Set 2", "50 very hard Calendar reasoning MCQs for SSC, Police, UPSI, Railway and other competitive exams with close options and professional explanations.", "Very Hard", "quiz-data/reasoning/reasoning-calendar-very-hard-set-2.js"),









        //General_Awareness_Registry
        quizMeta("ga-set-1", "General Awareness", "General Awareness Static GK Set 1", "50 polity, history, geography, economy and science questions.", "Mixed", "quiz-data/general-awareness/ga-set-1.js"),
        quizMeta("ga-current-affairs-set-1", "General Awareness", "General Awareness Current Affairs Set 1", "50 current and static awareness questions for competitive exams.", "Moderate", "quiz-data/general-awareness/ga-current-affairs-set-1.js"),




        //Computer_Registry
        quizMeta("computer-set-1", "Computer", "Computer Basics Practice Set 1", "50 computer basics, hardware, software and internet questions.", "Mixed", "quiz-data/computer/computer-set-1.js"),
        quizMeta("computer-set-2", "Computer", "Computer Awareness Practice Set 2", "50 networking, security, office tools and memory questions.", "Moderate", "quiz-data/computer/computer-set-2.js")
    ];

    function quizMeta(id, subject, title, description, difficulty, path) {
        return {
            id,
            subject,
            title,
            description,
            durationMinutes: 30,
            totalQuestions: REQUIRED_QUESTION_COUNT,
            marksPerQuestion: 1,
            negativeMarks: 0.25,
            difficulty,
            tags: ["SSC", "Railway", "Police"],
            path,
            questions: null,
            validation: {
                isComplete: true,
                errors: [],
                duplicateQuestionIds: [],
                duplicateQuestionTexts: [],
                duplicateSubjectQuestionTexts: []
            }
        };
    }

    function sanitizeQuestionText(value) {
        let text = String(value || "");

        text = text
            .replace(/\{label\}/gi, " ")
            .replace(/\bIn\s+[a-z0-9]+(?:-[a-z0-9]+)*\s+Q\s*\d+\s+Round\s+\d+\s*,?\s*/gi, " ")
            .replace(/\b[a-z0-9]+(?:-[a-z0-9]+)*\s+Q\s*\d+\s+Round\s+\d+\s*,?\s*/gi, " ")
            .replace(/^\s*(?:In\s+)?[a-z0-9]+(?:-[a-z0-9]+)*\s+Q\s*\d+\s*[,;:.-]?\s*/i, "")
            .replace(/\bRound\s+\d+\b\s*[,;:.-]?\s*/gi, " ")
            .replace(/^\s*Q\s*\d+\s*[,;:.-]?\s*/i, "")
            .replace(/\s+/g, " ")
            .replace(/\s+([?.!,;:])/g, "$1")
            .trim()
            .replace(/^[,;:.-]\s*/, "");

        if (!text) return "";

        text = text.charAt(0).toUpperCase() + text.slice(1);

        if (!/[?.!:'")\]]$/.test(text)) {
            text += ".";
        }

        return text;
    }

    function normalizeText(value) {
        return String(value || "").trim().replace(/\s+/g, " ").toLowerCase();
    }

    function hasQuestionShape(question) {
        return Boolean(
            question &&
            question.id &&
            question.topic &&
            question.difficulty &&
            question.question &&
            Array.isArray(question.options) &&
            question.options.length === 4 &&
            question.options.every((option) => option !== undefined && option !== null && String(option).trim()) &&
            Number.isInteger(question.correctAnswer) &&
            question.correctAnswer >= 0 &&
            question.correctAnswer <= 3 &&
            question.explanation
        );
    }

    function validateQuiz(rawQuiz) {
        const quiz = {
            id: rawQuiz.id,
            subject: rawQuiz.subject,
            title: rawQuiz.title,
            description: rawQuiz.description || "",
            durationMinutes: Number(rawQuiz.durationMinutes) || 30,
            totalQuestions: Number(rawQuiz.totalQuestions) || REQUIRED_QUESTION_COUNT,
            marksPerQuestion: Number(rawQuiz.marksPerQuestion) || 1,
            negativeMarks: Number(rawQuiz.negativeMarks) || 0,
            difficulty: rawQuiz.difficulty || "Mixed",
            tags: Array.isArray(rawQuiz.tags) ? rawQuiz.tags : [],
            questions: Array.isArray(rawQuiz.questions) ? rawQuiz.questions : [],
            validation: {
                isComplete: true,
                errors: [],
                duplicateQuestionIds: [],
                duplicateQuestionTexts: [],
                duplicateSubjectQuestionTexts: []
            }
        };

        if (!quiz.id) quiz.validation.errors.push("Quiz id is missing.");
        if (!quiz.subject || !quiz.title) quiz.validation.errors.push("Quiz subject and title are required.");

        quiz.questions = quiz.questions.map((question) => ({
            ...question,
            question: sanitizeQuestionText(question.question),
            subject: question.subject || quiz.subject,
            marks: Number(question.marks) || quiz.marksPerQuestion,
            negativeMarks: Number(question.negativeMarks) || quiz.negativeMarks
        }));

        if (quiz.questions.length !== REQUIRED_QUESTION_COUNT) {
            quiz.validation.errors.push(`Quiz must contain exactly ${REQUIRED_QUESTION_COUNT} questions.`);
        }

        const ids = new Set();
        const localTexts = new Set();

        quiz.questions.forEach((question, index) => {
            if (!hasQuestionShape(question)) {
                quiz.validation.errors.push(`Question ${index + 1} is missing required fields.`);
                return;
            }

            if (ids.has(question.id)) quiz.validation.duplicateQuestionIds.push(question.id);
            ids.add(question.id);

            const normalized = normalizeText(question.question);
            if (localTexts.has(normalized)) quiz.validation.duplicateQuestionTexts.push(question.id);
            localTexts.add(normalized);
        });

        if (quiz.validation.duplicateQuestionIds.length) quiz.validation.errors.push("Quiz contains duplicate question ids.");
        quiz.validation.isComplete = quiz.validation.errors.length === 0;

        if (!quiz.validation.isComplete) {
            console.warn("[GJU Quiz Registry] Incomplete quiz:", quiz.id, quiz.validation);
        } else if (quiz.validation.duplicateQuestionTexts.length) {
            console.warn("[GJU Quiz Registry] Repeated question text inside quiz:", quiz.id, quiz.validation.duplicateQuestionTexts);
        }

        validatedQuizzes.set(quiz.id, quiz);
        return quiz;
    }

    function getManifestQuiz(id) {
        return manifest.find((quiz) => quiz.id === id) || null;
    }

    function getLoadedRawQuiz(id) {
        const bank = Array.isArray(window.GJU_QUIZ_BANK) ? window.GJU_QUIZ_BANK : [];
        return bank.find((quiz) => quiz.id === id) || null;
    }

    function loadScript(path) {
        const src = new URL(path, scriptBaseUrl).href;
        if (loadedScripts.has(src)) return loadedScripts.get(src);

        const promise = new Promise((resolve, reject) => {
            const script = document.createElement("script");
            let timeoutId = 0;
            let settled = false;

            function finish(callback) {
                if (settled) return;
                settled = true;
                window.clearTimeout(timeoutId);
                callback();
            }

            script.src = src;
            script.async = true;
            script.onload = () => finish(resolve);
            script.onerror = () => finish(() => {
                loadedScripts.delete(src);
                reject(new Error(`Unable to load quiz data: ${path}`));
            });
            timeoutId = window.setTimeout(() => finish(() => {
                script.remove();
                loadedScripts.delete(src);
                reject(new Error(`Timed out loading quiz data: ${path}`));
            }), SCRIPT_TIMEOUT_MS);
            document.head.appendChild(script);
        });

        loadedScripts.set(src, promise);
        return promise;
    }

    async function loadQuizById(id) {
        const validated = validatedQuizzes.get(id);
        if (validated) return validated;

        const meta = getManifestQuiz(id);
        if (!meta) return null;

        window.GJU_QUIZ_BANK = Array.isArray(window.GJU_QUIZ_BANK) ? window.GJU_QUIZ_BANK : [];
        await loadScript(meta.path);
        const rawQuiz = getLoadedRawQuiz(id);
        if (!rawQuiz) throw new Error(`Quiz data was not registered: ${id}`);
        return validateQuiz(rawQuiz);
    }

    const subjects = subjectOrder.filter((subject) => manifest.some((quiz) => quiz.subject === subject));

    window.GJU_SANITIZE_QUESTION_TEXT = sanitizeQuestionText;

    window.GJU_QUIZZES = {
        subjects,
        quizzes: manifest,
        getQuizzesBySubject(subject) {
            return manifest.filter((quiz) => quiz.subject === subject);
        },
        getQuizById(id) {
            return validatedQuizzes.get(id) || getManifestQuiz(id);
        },
        loadQuizById
    };
}());
