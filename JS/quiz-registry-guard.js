(function () {
    "use strict";

    const registry = window.GJU_QUIZZES;
    if (!registry || !Array.isArray(registry.quizzes)) {
        console.error("[GJU Quiz Registry Guard] quiz-registry.js did not expose window.GJU_QUIZZES.");
        return;
    }

    const SUBJECT_ORDER = ["Mathematics", "English", "Hindi", "General Awareness", "Reasoning", "Computer"];
    const DEFAULT_DURATION_MINUTES = 30;
    const DEFAULT_QUESTION_COUNT = 50;
    const DEFAULT_MARKS = 1;
    const DEFAULT_NEGATIVE_MARKS = 0.25;

    function text(value, fallback) {
        const output = String(value ?? "").trim();
        return output || fallback || "";
    }

    function number(value, fallback) {
        const output = Number(value);
        return Number.isFinite(output) && output > 0 ? output : fallback;
    }

    function normalizeQuizMeta(quiz) {
        const id = text(quiz.id);
        const subject = text(quiz.subject, "Other");
        const title = text(quiz.title, id || "Quiz Set");
        const description = text(quiz.description, "Practice set for government exam preparation.");
        const difficulty = text(quiz.difficulty, "Mixed");
        const path = text(quiz.path);
        const tags = Array.isArray(quiz.tags) ? quiz.tags.filter(Boolean) : ["SSC", "Railway", "Police"];

        return {
            ...quiz,
            id,
            subject,
            title,
            description,
            durationMinutes: number(quiz.durationMinutes, DEFAULT_DURATION_MINUTES),
            totalQuestions: number(quiz.totalQuestions, DEFAULT_QUESTION_COUNT),
            marksPerQuestion: number(quiz.marksPerQuestion, DEFAULT_MARKS),
            negativeMarks: Number.isFinite(Number(quiz.negativeMarks)) ? Number(quiz.negativeMarks) : DEFAULT_NEGATIVE_MARKS,
            difficulty,
            tags,
            path,
            questions: Array.isArray(quiz.questions) ? quiz.questions : null,
            validation: quiz.validation || {
                isComplete: true,
                errors: [],
                duplicateQuestionIds: [],
                duplicateQuestionTexts: [],
                duplicateSubjectQuestionTexts: []
            }
        };
    }

    function normalizeRegistry() {
        const seen = new Set();
        const duplicates = [];
        const invalid = [];
        const cleaned = [];

        registry.quizzes.forEach((rawQuiz) => {
            const quiz = normalizeQuizMeta(rawQuiz || {});
            if (!quiz.id || !quiz.subject || !quiz.title || !quiz.path) {
                invalid.push(quiz.id || quiz.title || "unknown");
                return;
            }
            if (seen.has(quiz.id)) {
                duplicates.push(quiz.id);
                return;
            }
            seen.add(quiz.id);
            cleaned.push(quiz);
        });

        registry.quizzes.length = 0;
        registry.quizzes.push(...cleaned);

        const subjects = SUBJECT_ORDER.filter((subject) => cleaned.some((quiz) => quiz.subject === subject));
        cleaned.forEach((quiz) => {
            if (!subjects.includes(quiz.subject)) subjects.push(quiz.subject);
        });

        registry.subjects.length = 0;
        registry.subjects.push(...subjects);

        if (duplicates.length) console.warn("[GJU Quiz Registry Guard] Duplicate quiz ids removed:", duplicates);
        if (invalid.length) console.warn("[GJU Quiz Registry Guard] Invalid quiz meta removed:", invalid);
    }

    function dedupeBank() {
        if (!Array.isArray(window.GJU_QUIZ_BANK)) return;
        const byId = new Map();
        window.GJU_QUIZ_BANK.forEach((quiz) => {
            if (quiz && quiz.id) byId.set(quiz.id, quiz);
        });
        window.GJU_QUIZ_BANK.length = 0;
        window.GJU_QUIZ_BANK.push(...byId.values());
    }

    normalizeRegistry();

    const originalLoadQuizById = typeof registry.loadQuizById === "function" ? registry.loadQuizById.bind(registry) : null;
    const originalGetQuizById = typeof registry.getQuizById === "function" ? registry.getQuizById.bind(registry) : null;
    const originalGetQuizzesBySubject = typeof registry.getQuizzesBySubject === "function" ? registry.getQuizzesBySubject.bind(registry) : null;

    registry.getQuizById = function getQuizById(id) {
        const quizId = text(id);
        return (originalGetQuizById && originalGetQuizById(quizId)) || registry.quizzes.find((quiz) => quiz.id === quizId) || null;
    };

    registry.getQuizzesBySubject = function getQuizzesBySubject(subject) {
        const targetSubject = text(subject);
        const fromOriginal = originalGetQuizzesBySubject ? originalGetQuizzesBySubject(targetSubject) : [];
        if (Array.isArray(fromOriginal) && fromOriginal.length) return fromOriginal;
        return registry.quizzes.filter((quiz) => quiz.subject === targetSubject);
    };

    registry.loadQuizById = async function loadQuizById(id) {
        const quizId = text(id);
        if (!quizId) return null;

        try {
            const loaded = originalLoadQuizById ? await originalLoadQuizById(quizId) : registry.getQuizById(quizId);
            dedupeBank();
            return loaded;
        } catch (error) {
            const meta = registry.getQuizById(quizId);
            console.error("[GJU Quiz Registry Guard] Failed to load quiz:", {
                quizId,
                path: meta?.path || "missing path",
                message: error?.message || error
            });
            throw error;
        }
    };

    window.GJU_REGISTER_QUIZ_META = function registerQuizMeta(meta) {
        const quiz = normalizeQuizMeta(meta || {});
        if (!quiz.id || !quiz.subject || !quiz.title || !quiz.path) {
            console.warn("[GJU Quiz Registry Guard] Ignored invalid quiz meta:", meta);
            return false;
        }

        const existingIndex = registry.quizzes.findIndex((item) => item.id === quiz.id);
        if (existingIndex >= 0) registry.quizzes[existingIndex] = quiz;
        else registry.quizzes.push(quiz);
        normalizeRegistry();
        return true;
    };

    window.GJU_QUIZ_REGISTRY_REPORT = function quizRegistryReport() {
        const bySubject = registry.subjects.reduce((acc, subject) => {
            acc[subject] = registry.getQuizzesBySubject(subject).length;
            return acc;
        }, {});
        return {
            totalQuizzes: registry.quizzes.length,
            subjects: [...registry.subjects],
            bySubject,
            quizzes: registry.quizzes.map((quiz) => ({ id: quiz.id, subject: quiz.subject, path: quiz.path }))
        };
    };

    console.info("[GJU Quiz Registry Guard] Registry ready:", window.GJU_QUIZ_REGISTRY_REPORT());
}());
