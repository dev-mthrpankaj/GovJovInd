(function () {
    "use strict";

    const helpers = window.GJU_QUIZ_REGISTRY_HELPERS;
    if (!helpers) return;

    const { quizMeta, registerSubjectQuizzes } = helpers;

    registerSubjectQuizzes([
        quizMeta("ibps-po-pre-2025-reasoning-set-1", "Reasoning", "IBPS PO Pre 2025 Reasoning Memory Based Set 1", "Hindi-English bilingual Reasoning quiz based on IBPS PO Pre 2025 memory based questions 1 to 35.", "Hard", "quiz-data/reasoning/ibps-po-pre-2025-reasoning-set-1.js")
    ]);
}());
