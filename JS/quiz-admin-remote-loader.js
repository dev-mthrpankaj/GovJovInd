(function () {
    "use strict";

    const DEFAULT_BASE_URL = "https://test.govjobupdates.com/live-test/";
    const DEFAULT_INDEX_GLOBALS = ["GJU_QUIZ_INDEX", "GJU_ADMIN_QUIZ_INDEX", "GJU_PUBLISHED_QUIZ_INDEX"];
    const OPTION_KEYS = ["A", "B", "C", "D"];
    const remoteQuizCache = new Map();
    const remoteMetaById = new Map();
    const loadedScripts = new Map();

    const config = Object.assign({
        baseUrl: DEFAULT_BASE_URL,
        preferredLanguage: "hi",
        indexGlobals: DEFAULT_INDEX_GLOBALS,
        idPrefix: "admin",
        cacheBust: true
    }, window.GJU_ADMIN_REMOTE_QUIZ_CONFIG || {});

    const registry = window.GJU_QUIZZES;
    if (!registry || !Array.isArray(registry.quizzes)) {
        console.warn("[GJU Admin Quiz Loader] Quiz registry not found. Load this script after quiz-registry.js.");
        return;
    }

    const sourceIndex = findIndexPayload();
    const indexItems = normalizeIndexPayload(sourceIndex);

    if (!indexItems.length) {
        window.GJU_ADMIN_REMOTE_QUIZZES = {
            ready: true,
            count: 0,
            metas: [],
            message: "No remote admin quizzes found."
        };
        return;
    }

    const addedMetas = indexItems
        .map(createRemoteMeta)
        .filter(Boolean)
        .filter(registerRemoteMeta);

    patchRegistryLoadQuiz();

    window.GJU_ADMIN_REMOTE_QUIZZES = {
        ready: true,
        count: addedMetas.length,
        metas: addedMetas.slice(),
        baseUrl: normalizeBaseUrl(config.baseUrl)
    };

    document.dispatchEvent(new CustomEvent("gju:admin-quiz-index-ready", {
        detail: window.GJU_ADMIN_REMOTE_QUIZZES
    }));

    function findIndexPayload() {
        for (const key of config.indexGlobals || DEFAULT_INDEX_GLOBALS) {
            if (window[key]) return window[key];
        }
        return null;
    }

    function normalizeIndexPayload(payload) {
        if (Array.isArray(payload)) return payload;
        if (payload && Array.isArray(payload.quizzes)) return payload.quizzes;
        if (payload && Array.isArray(payload.items)) return payload.items;
        if (payload && Array.isArray(payload.data)) return payload.data;
        return [];
    }

    function createRemoteMeta(item) {
        if (!item || typeof item !== "object") return null;
        const status = String(item.status || item.publishStatus || "published").toLowerCase();
        if (status && status !== "published") return null;

        const subjectSlug = slugify(item.subjectSlug || item.subject_slug || item.subject?.slug || item.subject || "practice");
        const quizSlug = slugify(item.quizSlug || item.quiz_slug || item.slug || item.id || item.title || "quiz");
        const remoteId = `${config.idPrefix}-${subjectSlug}-${quizSlug}`.replace(/-+/g, "-");
        const subject = mapSubject(item.subjectName || item.subject_name || item.subject?.name || item.subject || subjectSlug);
        const filePath = item.fileUrl || item.file_url || item.publicFileUrl || item.public_file_url || item.file || item.path || item.publicFilePath || item.public_file_path;
        const remoteFileUrl = resolveRemoteUrl(filePath);

        if (!remoteFileUrl) return null;

        const version = String(item.generatedAt || item.generated_at || item.publishedAt || item.published_at || item.updatedAt || item.updated_at || "").trim();
        const totalQuestions = toPositiveInt(item.totalQuestions || item.total_questions || item.activeQuestions || item.active_questions, 50);
        const durationMinutes = toPositiveInt(item.durationMinutes || item.duration_minutes, 30);

        return {
            id: remoteId,
            subject,
            title: String(item.title || item.quizTitle || item.quiz_title || titleFromSlug(quizSlug)).trim(),
            description: String(item.description || item.summary || `Practice quiz generated from GovJobUpdates Quiz Manager.`).trim(),
            durationMinutes,
            totalQuestions,
            marksPerQuestion: Number(item.marksPerQuestion || item.marks_per_question) || 1,
            negativeMarks: Number(item.negativeMarks || item.negative_marks) || 0.25,
            difficulty: item.difficulty || "Mixed",
            tags: Array.isArray(item.tags) ? item.tags : ["GovJobUpdates", "Practice", "Admin Published"],
            path: appendCacheBust(remoteFileUrl, version),
            adminRemote: true,
            remoteFileUrl: appendCacheBust(remoteFileUrl, version),
            remoteOriginalId: item.id || item.slug || quizSlug,
            remoteGeneratedAt: version,
            source: "admin-quiz-manager"
        };
    }

    function registerRemoteMeta(meta) {
        if (!meta || !meta.id || remoteMetaById.has(meta.id)) return false;
        const existingIndex = registry.quizzes.findIndex((quiz) => quiz && quiz.id === meta.id);
        if (existingIndex >= 0) {
            registry.quizzes[existingIndex] = Object.assign({}, registry.quizzes[existingIndex], meta);
        } else {
            registry.quizzes.push(meta);
        }
        remoteMetaById.set(meta.id, meta);
        ensureSubject(meta.subject);
        return true;
    }

    function ensureSubject(subject) {
        if (!subject) return;
        if (!Array.isArray(registry.subjects)) registry.subjects = [];
        if (!registry.subjects.includes(subject)) registry.subjects.push(subject);
    }

    function patchRegistryLoadQuiz() {
        if (registry.__gjuAdminRemotePatched) return;
        const originalLoadQuizById = typeof registry.loadQuizById === "function"
            ? registry.loadQuizById.bind(registry)
            : async function () { return null; };

        registry.loadQuizById = async function loadQuizByIdWithAdminRemote(id) {
            if (remoteMetaById.has(id)) {
                return loadRemoteQuiz(id);
            }
            return originalLoadQuizById(id);
        };

        registry.__gjuAdminRemotePatched = true;
    }

    async function loadRemoteQuiz(id) {
        if (remoteQuizCache.has(id)) return remoteQuizCache.get(id);
        const meta = remoteMetaById.get(id);
        if (!meta) return null;

        const previousData = window.GJU_QUIZ_DATA;
        window.GJU_QUIZ_DATA = null;
        await loadScript(meta.remoteFileUrl);
        const adminData = window.GJU_QUIZ_DATA;
        if (!adminData || typeof adminData !== "object") {
            window.GJU_QUIZ_DATA = previousData || window.GJU_QUIZ_DATA;
            throw new Error(`Admin quiz data was not registered: ${id}`);
        }

        const converted = convertAdminQuiz(adminData, meta);
        window.GJU_QUIZ_BANK = Array.isArray(window.GJU_QUIZ_BANK) ? window.GJU_QUIZ_BANK : [];
        const bankIndex = window.GJU_QUIZ_BANK.findIndex((quiz) => quiz && quiz.id === converted.id);
        if (bankIndex >= 0) window.GJU_QUIZ_BANK[bankIndex] = converted;
        else window.GJU_QUIZ_BANK.push(converted);

        remoteQuizCache.set(id, converted);
        return converted;
    }

    function loadScript(src) {
        const absoluteSrc = appendCacheBust(src, "runtime");
        if (loadedScripts.has(absoluteSrc)) return loadedScripts.get(absoluteSrc);

        const promise = new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.src = absoluteSrc;
            script.async = true;
            script.onload = resolve;
            script.onerror = () => reject(new Error(`Unable to load admin quiz script: ${absoluteSrc}`));
            document.head.appendChild(script);
        });

        loadedScripts.set(absoluteSrc, promise);
        return promise;
    }

    function convertAdminQuiz(adminData, meta) {
        const subject = mapSubject(adminData.subject?.name || adminData.subject || meta.subject);
        const questions = Array.isArray(adminData.questions) ? adminData.questions : [];
        const preferredLanguage = getPreferredLanguage(subject);

        return {
            id: meta.id,
            subject,
            title: String(adminData.title || meta.title || "Practice Quiz"),
            description: String(adminData.description || meta.description || "Practice quiz generated from GovJobUpdates Quiz Manager."),
            durationMinutes: toPositiveInt(adminData.durationMinutes || adminData.duration_minutes || meta.durationMinutes, 30),
            totalQuestions: questions.length || meta.totalQuestions,
            marksPerQuestion: Number(adminData.marksPerQuestion || adminData.marks_per_question || meta.marksPerQuestion) || 1,
            negativeMarks: Number(adminData.negativeMarks || adminData.negative_marks || meta.negativeMarks) || 0.25,
            difficulty: adminData.difficulty || meta.difficulty || "Mixed",
            tags: Array.isArray(adminData.tags) ? adminData.tags : meta.tags,
            source: "admin-quiz-manager",
            questions: questions.map((question, index) => convertQuestion(question, meta, subject, preferredLanguage, index))
        };
    }

    function convertQuestion(question, meta, subject, preferredLanguage, index) {
        const number = toPositiveInt(question.number || question.questionNumber || question.question_number, index + 1);
        const optionTexts = OPTION_KEYS.map((key) => pickText(question.options?.[key] || question[`option_${key.toLowerCase()}`], preferredLanguage));
        const optionImages = OPTION_KEYS.map((key) => normalizeMedia(question.options?.[key]?.image || question[`option_${key.toLowerCase()}_image`], `Option ${key} image`));
        const correctAnswer = optionLetterToIndex(question.correctOption || question.correct_option || question.answer || question.correctAnswer);

        return {
            id: `${meta.id}-q${String(number).padStart(2, "0")}`,
            subject,
            topic: String(question.topic || subject || "General"),
            difficulty: normalizeDifficulty(question.difficulty || question.difficultyLevel || question.difficulty_level || meta.difficulty),
            question: pickText(question.question || question.text || question.questionText, preferredLanguage),
            image: normalizeMedia(question.question?.image || question.image || question.questionImage || question.question_image, `Question ${number} image`),
            imageAlt: question.question?.alt || question.imageAlt || question.questionImageAlt || `Question ${number} image`,
            options: optionTexts,
            optionImages,
            correctAnswer,
            explanation: pickText(question.explanation || question.solution, preferredLanguage) || "Explanation is not available.",
            explanationImage: normalizeMedia(question.explanation?.image || question.explanationImage || question.explanation_image || question.solutionImage, `Question ${number} explanation image`),
            explanationImageAlt: question.explanation?.alt || question.explanationImageAlt || `Question ${number} explanation image`,
            marks: Number(question.marks || meta.marksPerQuestion) || 1,
            negativeMarks: Number(question.negativeMarks || question.negative_marks || meta.negativeMarks) || 0.25
        };
    }

    function pickText(value, preferredLanguage) {
        if (value == null) return "";
        if (typeof value === "string" || typeof value === "number") return String(value).trim();
        const preferred = String(value[preferredLanguage] || "").trim();
        if (preferred) return preferred;
        const hi = String(value.hi || value.hindi || "").trim();
        const en = String(value.en || value.english || "").trim();
        return preferredLanguage === "en" ? (en || hi) : (hi || en);
    }

    function normalizeMedia(value, alt) {
        if (!value) return null;
        if (typeof value === "string") {
            const src = resolveRemoteUrl(value);
            return src ? { src, alt } : null;
        }
        const src = resolveRemoteUrl(value.src || value.url || value.path || value.image);
        if (!src) return null;
        return { src, alt: value.alt || value.title || alt };
    }

    function optionLetterToIndex(value) {
        if (Number.isInteger(value)) return Math.max(0, Math.min(3, value));
        const normalized = String(value || "A").trim().toUpperCase();
        const index = OPTION_KEYS.indexOf(normalized);
        return index >= 0 ? index : 0;
    }

    function normalizeDifficulty(value) {
        const text = String(value || "Mixed").trim();
        if (!text) return "Mixed";
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    }

    function getPreferredLanguage(subject) {
        return subject === "English" ? "en" : (config.preferredLanguage || "hi");
    }

    function mapSubject(value) {
        const raw = String(value || "").trim();
        const slug = slugify(raw);
        const map = {
            hindi: "Hindi",
            english: "English",
            maths: "Mathematics",
            math: "Mathematics",
            mathematics: "Mathematics",
            reasoning: "Reasoning",
            "gs-gk": "General Awareness",
            "gk-gs": "General Awareness",
            gkgs: "General Awareness",
            "general-awareness": "General Awareness",
            "general-knowledge": "General Awareness",
            computer: "Computer"
        };
        return map[slug] || raw || "General Awareness";
    }

    function resolveRemoteUrl(path) {
        const value = String(path || "").trim();
        if (!value) return "";
        if (/^(?:https?:)?\/\//i.test(value) || /^data:/i.test(value)) return value;
        const baseUrl = normalizeBaseUrl(config.baseUrl || DEFAULT_BASE_URL);
        return new URL(value.replace(/^\/+/, ""), baseUrl).href;
    }

    function normalizeBaseUrl(url) {
        const value = String(url || DEFAULT_BASE_URL).trim();
        return value.endsWith("/") ? value : `${value}/`;
    }

    function appendCacheBust(url, version) {
        if (!config.cacheBust) return url;
        const normalizedVersion = String(version || "").replace(/[^a-z0-9_-]+/gi, "");
        if (!normalizedVersion) return url;
        const separator = url.includes("?") ? "&" : "?";
        return `${url}${separator}v=${encodeURIComponent(normalizedVersion)}`;
    }

    function toPositiveInt(value, fallback) {
        const number = parseInt(value, 10);
        return Number.isFinite(number) && number > 0 ? number : fallback;
    }

    function slugify(value) {
        return String(value || "")
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "");
    }

    function titleFromSlug(slug) {
        return String(slug || "Practice Quiz")
            .split("-")
            .filter(Boolean)
            .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
            .join(" ");
    }
}());
