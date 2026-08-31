(function () {
    "use strict";

    const root = document.getElementById("familyQuizPage");
    if (!root) return;

    const familySlug = String(root.dataset.examFamily || "").trim().toLowerCase();
    const familyName = String(root.dataset.examFamilyName || familySlug.toUpperCase()).trim();
    const list = document.getElementById("familyQuizList");
    const subjectSelect = document.getElementById("familySubjectSelect");
    const searchInput = document.getElementById("familyQuizSearch");
    const meta = document.getElementById("familyQuizMeta");
    const count = document.getElementById("familyQuizCount");
    const empty = document.getElementById("familyQuizEmpty");
    let quizzes = [];

    function slugify(value) {
        return String(value || "")
            .trim().toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "") || "quiz";
    }

    function escapeHtml(value) {
        return String(value == null ? "" : value)
            .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
            .replace(/\"/g, "&quot;").replace(/'/g, "&#039;");
    }

    function getIndexItems() {
        const candidates = [window.GJU_QUIZ_INDEX, window.GJU_ADMIN_QUIZ_INDEX, window.GJU_PUBLISHED_QUIZ_INDEX];
        for (const payload of candidates) {
            if (Array.isArray(payload)) return payload;
            if (payload && Array.isArray(payload.quizzes)) return payload.quizzes;
            if (payload && Array.isArray(payload.items)) return payload.items;
            if (payload && Array.isArray(payload.data)) return payload.data;
        }
        return [];
    }

    function getFamilySlug(item) {
        return String(
            item.examFamilySlug || item.exam_family_slug ||
            (item.examFamily && item.examFamily.slug) ||
            (item.exam_family && item.exam_family.slug) || ""
        ).trim().toLowerCase();
    }

    function normalizeItem(item) {
        const subjectSlug = slugify(item.subjectSlug || item.subject_slug || (item.subject && item.subject.slug) || item.subject || "practice");
        const subjectName = String(item.subjectName || item.subject_name || (item.subject && item.subject.name) || item.subject || subjectSlug).trim();
        const quizSlug = slugify(item.quizSlug || item.quiz_slug || item.slug || item.id || item.title || "quiz");
        return {
            id: `admin-${subjectSlug}-${quizSlug}`.replace(/-+/g, "-"),
            title: String(item.title || item.quizTitle || item.quiz_title || quizSlug).trim(),
            description: String(item.description || item.summary || `${familyName} practice quiz on GovJobUpdates.`).trim(),
            subject: subjectName,
            duration: Number(item.durationMinutes || item.duration_minutes) || 30,
            questions: Number(item.totalQuestions || item.total_questions || item.activeQuestions || item.active_questions) || 0,
            marks: Number(item.marksPerQuestion || item.marks_per_question) || 1,
            negative: Number(item.negativeMarks || item.negative_marks) || 0.25
        };
    }

    function loadFamilyQuizzes() {
        quizzes = getIndexItems()
            .filter(function (item) { return item && getFamilySlug(item) === familySlug; })
            .map(normalizeItem);
        buildSubjects();
        render();
    }

    function buildSubjects() {
        if (!subjectSelect) return;
        const subjects = Array.from(new Set(quizzes.map(function (quiz) { return quiz.subject; }))).sort();
        const current = subjectSelect.value;
        subjectSelect.innerHTML = '<option value="">All Subjects</option>' + subjects.map(function (subject) {
            return `<option value="${escapeHtml(subject)}">${escapeHtml(subject)}</option>`;
        }).join("");
        if (subjects.includes(current)) subjectSelect.value = current;
    }

    function render() {
        if (!list) return;
        const query = String(searchInput && searchInput.value || "").trim().toLowerCase();
        const subject = String(subjectSelect && subjectSelect.value || "").trim();
        const filtered = quizzes.filter(function (quiz) {
            if (subject && quiz.subject !== subject) return false;
            if (!query) return true;
            return `${quiz.title} ${quiz.description} ${quiz.subject}`.toLowerCase().includes(query);
        });

        if (count) count.textContent = String(quizzes.length);
        if (meta) meta.textContent = filtered.length === quizzes.length
            ? `${quizzes.length} published ${familyName} quiz${quizzes.length === 1 ? "" : "zes"}`
            : `${filtered.length} of ${quizzes.length} quizzes`;

        if (!filtered.length) {
            list.innerHTML = "";
            if (empty) empty.hidden = false;
            return;
        }
        if (empty) empty.hidden = true;
        list.innerHTML = filtered.map(function (quiz) {
            const questionLabel = quiz.questions ? `${quiz.questions} Questions` : "Questions";
            return `<article class="family-quiz-card">
                <div class="family-quiz-card-main">
                    <span class="family-subject-badge">${escapeHtml(quiz.subject)}</span>
                    <h2>${escapeHtml(quiz.title)}</h2>
                    <p>${escapeHtml(quiz.description)}</p>
                    <div class="family-quiz-meta">
                        <span><i class="far fa-circle-question" aria-hidden="true"></i>${questionLabel}</span>
                        <span><i class="far fa-clock" aria-hidden="true"></i>${quiz.duration} Minutes</span>
                        <span><i class="fas fa-plus" aria-hidden="true"></i>${quiz.marks}</span>
                        <span><i class="fas fa-minus" aria-hidden="true"></i>${quiz.negative}</span>
                    </div>
                </div>
                <a class="family-start-btn" href="quiz.html?quiz=${encodeURIComponent(quiz.id)}">Start Quiz <i class="fas fa-arrow-right" aria-hidden="true"></i></a>
            </article>`;
        }).join("");
    }

    if (subjectSelect) subjectSelect.addEventListener("change", render);
    if (searchInput) searchInput.addEventListener("input", render);
    document.addEventListener("gju:admin-quiz-index-ready", loadFamilyQuizzes);

    loadFamilyQuizzes();
}());