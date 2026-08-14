(function () {
    "use strict";

    const SCRIPT_TIMEOUT_MS = 15000;
    const QUIZ_ASSET_VERSION = "20260814-all-subjects-latex-1";
    const subjectOrder = ["Mathematics", "English", "Hindi", "General Awareness", "General Science", "Reasoning", "Computer"];
    const scriptBaseUrl = new URL(".", document.currentScript?.src || window.location.href);
    const loadedScripts = new Map();
    const validatedQuizzes = new Map();
    const manifest = [];
    const subjects = [];

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
            () => `UP पुलिस कांस्टेबल, UPSI, UPPCS, SSC, Railway और अन्य प्रतियोगी परीक्षाओं के लिए महत्वपूर्ण ${topic} प्रश्न, मजबूत विकल्पों और विस्तृत व्याख्या के साथ।`,
            difficulty,
            (setNo, id) => `quiz-data/hindi/${id}.js`
        );
    }

    function quizMeta(id, subject, title, description, difficulty, path, totalQuestions) {
        return {
            id,
            subject,
            title,
            description,
            durationMinutes: 30,
            totalQuestions: Number(totalQuestions) || null,
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

    function refreshSubjects() {
        const nextSubjects = subjectOrder.filter((subject) => manifest.some((quiz) => quiz.subject === subject));
        manifest.forEach((quiz) => {
            if (quiz.subject && !nextSubjects.includes(quiz.subject)) nextSubjects.push(quiz.subject);
        });
        subjects.length = 0;
        subjects.push(...nextSubjects);
    }

    function registerQuizMeta(meta) {
        if (!meta || !meta.id || !meta.subject || !meta.title || !meta.path) {
            console.warn("[GJU Quiz Registry] Ignored invalid quiz meta:", meta);
            return false;
        }

        const existingIndex = manifest.findIndex((quiz) => quiz.id === meta.id);
        if (existingIndex >= 0) manifest[existingIndex] = meta;
        else manifest.push(meta);
        validatedQuizzes.delete(meta.id);
        refreshSubjects();
        return true;
    }

    function registerSubjectQuizzes(quizzes) {
        if (!Array.isArray(quizzes)) return false;
        quizzes.forEach(registerQuizMeta);
        refreshSubjects();
        return true;
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
            question.options.length >= 2 &&
            question.options.every(hasOptionContent) &&
            Number.isInteger(question.correctAnswer) &&
            question.correctAnswer >= 0 &&
            question.correctAnswer < question.options.length &&
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
                : Number(rawQuiz.totalQuestions) || 0,
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
        const url = new URL(path, scriptBaseUrl);
        url.searchParams.set("v", QUIZ_ASSET_VERSION);
        const src = url.href;
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

    window.GJU_QUIZ_REGISTRY_HELPERS = {
        quizMeta,
        createQuizSeries,
        createHindiSeries,
        registerQuizMeta,
        registerSubjectQuizzes
    };

    window.GJU_REGISTER_STATIC_QUIZ_META = registerQuizMeta;
}());
