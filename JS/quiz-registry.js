(function () {
    "use strict";

    const DEFAULT_QUESTION_COUNT = 50;
    const SCRIPT_TIMEOUT_MS = 15000;
    const subjectOrder = ["Mathematics", "English", "Hindi", "General Awareness", "Reasoning", "Computer"];
    const scriptBaseUrl = new URL(".", document.currentScript?.src || window.location.href);
    const loadedScripts = new Map();
    const validatedQuizzes = new Map();

    function createQuizSeries(prefix, count, subject, titleFactory, descriptionFactory, difficulty, pathFactory) {
        return Array.from({ length: count }, (_, index) => {
            const setNo = index + 1;
            const id = `${prefix}-${setNo}`;
            return quizMeta(
                id,
                subject,
                titleFactory(setNo, id),
                descriptionFactory(setNo, id),
                difficulty,
                pathFactory ? pathFactory(setNo, id) : `quiz-data/${subject.toLowerCase().replace(/\s+/g, "-")}/${id}.js`
            );
        });
    }

    function createHindiSeries(prefix, count, topic, difficulty = "Hard") {
        return createQuizSeries(
            prefix,
            count,
            "Hindi",
            (setNo) => `${topic} अभ्यास सेट ${setNo}`,
            () => `UP पुलिस कांस्टेबल, UPSI, UPPCS, SSC, Railway और अन्य प्रतियोगी परीक्षाओं के लिए 50 महत्वपूर्ण ${topic} प्रश्न, मजबूत विकल्पों और विस्तृत व्याख्या के साथ।`,
            difficulty,
            (setNo, id) => `quiz-data/hindi/${id}.js`
        );
    }

    const manifest = [
        //Mathematics_Registry
        ...createQuizSeries("math-percentage-abhinay-set", 2, "Mathematics", (n) => `Percentage Practice Set ${n}`, () => "50 hard percentage questions.", "Hard", (n, id) => `quiz-data/mathematics/${id}.js`),
        quizMeta("math-circle-image-set-1", "Mathematics", "Mathematics Circle Image Based Practice Set 1", "50 unique diagram-based Circle questions covering arcs, sectors, chords, tangents and circular applications.", "Moderate", "quiz-data/mathematics/math-circle-image-set-1.js"),
        quizMeta("math-set-1", "Mathematics", "Mathematics Practice Set 1", "50 arithmetic and quantitative aptitude questions for SSC, Railway and Police exams.", "Mixed", "quiz-data/mathematics/math-set-1.js"),
        quizMeta("math-set-2", "Mathematics", "Mathematics Practice Set 2", "50 calculation speed, number system, work, average and applied maths questions.", "Moderate", "quiz-data/mathematics/math-set-2.js"),
        quizMeta("math-pyq-set-1", "Mathematics", "Mathematics PYQ Practice Set 1", "50 previous-year style quantitative aptitude questions.", "Previous Year", "quiz-data/mathematics/math-pyq-set-1.js"),

        //English_Registry
        quizMeta("english-active-passive-set-1", "English", "English Active Passive Practice Set 1", "50 SSC CGL, CHSL and CPO active-passive voice questions.", "Hard", "quiz-data/english/english-active-passive-set-1.js"),
        quizMeta("english-grammar-set-1", "English", "English Grammar Practice Set 1", "50 grammar questions for SSC, Railway and Police exams.", "Mixed", "quiz-data/english/english-grammar-set-1.js"),
        quizMeta("english-vocabulary-set-1", "English", "English Vocabulary Practice Set 1", "50 vocabulary, antonym, synonym, spelling and usage questions.", "Moderate", "quiz-data/english/english-vocabulary-set-1.js"),
        quizMeta("english-mixed-set-1", "English", "English Mixed Practice Set 1", "50 mixed English grammar and vocabulary questions.", "Mixed", "quiz-data/english/english-mixed-set-1.js"),
        quizMeta("english-narration-set-1", "English", "English Narration Practice Set 1", "50 SSC CGL, CHSL and CPO direct-indirect speech narration questions.", "Previous Year", "quiz-data/english/english-narration-set-1.js"),
        ...createQuizSeries("english-one-word-substitution-set", 24, "English", (n) => `English One Word Substitution Practice Set ${n}`, () => "50 tough-level One Word Substitution MCQs for SSC CGL, SSC CPO, UPSI, UPPCS and other competitive exams with professional explanations.", "Hard", (n, id) => `quiz-data/english/${id}.js`),
        ...createQuizSeries("english-detecting-errors-set", 31, "English", (n) => `English Detecting Errors Practice Set ${n}`, () => "50 previous-year detecting error questions from the uploaded PDF for SSC, Railway, Police and other government exams.", "Hard", (n, id) => `quiz-data/english/${id}.js`),

        //Hindi_Registry
        ...createHindiSeries("hindi-mixed-grammar-gk-set", 4, "मिश्रित हिंदी व्याकरण व सामान्य ज्ञान"),
        ...createHindiSeries("hindi-varnmala-practice-set", 3, "हिंदी वर्णमाला"),
        ...createHindiSeries("hindi-muhavare-upsi-pcs-set", 1, "मुहावरे"),
        ...createHindiSeries("hindi-alankar-upsi-set", 1, "अलंकार"),
        ...createHindiSeries("hindi-vyakaran-set", 1, "हिंदी व्याकरण", "Mixed"),
        ...createHindiSeries("hindi-mixed-set", 1, "मिश्रित हिंदी अभ्यास", "Mixed"),
        ...createHindiSeries("hindi-bharatiya-bhashayen-up-police-set", 2, "हिंदी और अन्य भारतीय भाषाएं"),
        ...createHindiSeries("hindi-varnmala-up-police-set", 3, "हिंदी वर्णमाला"),
        ...createHindiSeries("hindi-tadbhav-up-police-set", 3, "तद्भव शब्द"),
        ...createHindiSeries("hindi-tatsam-up-police-set", 3, "तत्सम शब्द"),
        ...createHindiSeries("hindi-paryayvachi-up-police-set", 4, "पर्यायवाची शब्द"),
        ...createHindiSeries("hindi-vilom-up-police-set", 4, "विलोम शब्द"),
        ...createHindiSeries("hindi-anekarthak-up-police-set", 2, "अनेकार्थक शब्द"),
        ...createHindiSeries("hindi-one-word-up-police-set", 3, "वाक्यांश के लिए एक शब्द"),
        ...createHindiSeries("hindi-samroopi-bhinnarthak-up-police-set", 2, "समरूपी भिन्नार्थक शब्द"),
        ...createHindiSeries("hindi-vakya-shuddhi-up-police-set", 4, "वाक्य शुद्धि"),
        ...createHindiSeries("hindi-ling-up-police-set", 2, "लिंग"),
        ...createHindiSeries("hindi-vachan-up-police-set", 2, "वचन"),
        ...createHindiSeries("hindi-karak-up-police-set", 2, "कारक"),
        ...createHindiSeries("hindi-sarvanam-up-police-set", 2, "सर्वनाम"),
        ...createHindiSeries("hindi-visheshan-up-police-set", 2, "विशेषण"),
        ...createHindiSeries("hindi-kriya-kaal-up-police-set", 3, "क्रिया काल"),
        ...createHindiSeries("hindi-vachya-up-police-set", 2, "वाच्य"),
        ...createHindiSeries("hindi-avyay-up-police-set", 2, "अव्यय"),
        ...createHindiSeries("hindi-upsarg-up-police-set", 3, "उपसर्ग"),
        ...createHindiSeries("hindi-pratyay-up-police-set", 3, "प्रत्यय"),
        ...createHindiSeries("hindi-sandhi-up-police-set", 4, "संधि"),
        ...createHindiSeries("hindi-samas-up-police-set", 4, "समास"),
        ...createHindiSeries("hindi-viram-chinh-up-police-set", 2, "विराम चिह्न"),
        ...createHindiSeries("hindi-muhavare-lokoktiyan-up-police-set", 4, "मुहावरे एवं लोकोक्तियां"),
        ...createHindiSeries("hindi-ras-up-police-set", 2, "रस"),
        ...createHindiSeries("hindi-chhand-up-police-set", 2, "छंद"),
        ...createHindiSeries("hindi-alankar-up-police-set", 3, "अलंकार"),
        ...createHindiSeries("hindi-apathit-bodh-up-police-set", 3, "अपठित बोध"),
        ...createHindiSeries("hindi-prasiddh-kavi-up-police-set", 2, "प्रसिद्ध कवि"),
        ...createHindiSeries("hindi-lekhak-rachnaye-up-police-set", 3, "लेखक एवं प्रमुख रचनाएं"),
        ...createHindiSeries("hindi-bhasha-puraskar-up-police-set", 2, "हिंदी भाषा में पुरस्कार"),
        ...createHindiSeries("hindi-vividh-up-police-set", 2, "विविध हिंदी प्रश्न"),

        //Reasoning_Registry
        ...createQuizSeries("reasoning-mirror-image-very-hard-set", 2, "Reasoning", (n) => `Reasoning Mirror Image Very Hard Practice Set ${n}`, () => "50 very hard Mirror Image reasoning MCQs for SSC, Police, UPSI, Railway and other competitive exams with close options and professional explanations.", "Very Hard", (n, id) => `quiz-data/reasoning/${id}.js`),
        ...createQuizSeries("reasoning-water-image-very-hard-set", 2, "Reasoning", (n) => `Reasoning Water Image Very Hard Practice Set ${n}`, () => "50 very hard Water Image reasoning MCQs for SSC, Police, UPSI, Railway and other competitive exams with close options and professional explanations.", "Very Hard", (n, id) => `quiz-data/reasoning/${id}.js`),
        ...createQuizSeries("reasoning-clock-very-hard-set", 2, "Reasoning", (n) => `Reasoning Clock Very Hard Practice Set ${n}`, () => "50 very hard Clock reasoning MCQs for SSC, Police, UPSI, Railway and other competitive exams with close options and professional explanations.", "Very Hard", (n, id) => `quiz-data/reasoning/${id}.js`),
        ...createQuizSeries("reasoning-calendar-very-hard-set", 2, "Reasoning", (n) => `Reasoning Calendar Very Hard Practice Set ${n}`, () => "50 very hard Calendar reasoning MCQs for SSC, Police, UPSI, Railway and other competitive exams with close options and professional explanations.", "Very Hard", (n, id) => `quiz-data/reasoning/${id}.js`),

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
            totalQuestions: DEFAULT_QUESTION_COUNT,
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

        if (!/[?.!:')\]]$/.test(text)) {
            text += ".";
        }

        return text;
    }

    function normalizeText(value) {
        return String(value || "").trim().replace(/\s+/g, " ").toLowerCase();
    }

    function hasMediaSource(value) {
        if (typeof value === "string") return Boolean(value.trim());
        if (!value || typeof value !== "object") return false;
        return Boolean(String(value.src || value.url || value.path || "").trim());
    }

    function hasOptionContent(option) {
        if (typeof option === "string" || typeof option === "number") {
            return Boolean(String(option).trim());
        }

        if (!option || typeof option !== "object") return false;

        const label = String(option.text ?? option.label ?? option.value ?? "").trim();
        return Boolean(label || hasMediaSource(option.image || option));
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
            question.options.every(hasOptionContent) &&
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
            totalQuestions: Array.isArray(rawQuiz.questions) && rawQuiz.questions.length
                ? rawQuiz.questions.length
                : Number(rawQuiz.totalQuestions) || DEFAULT_QUESTION_COUNT,
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

        if (!quiz.questions.length) {
            quiz.validation.errors.push("Quiz must contain at least 1 question.");
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
