(function () {
    "use strict";

    const helpers = window.GJU_QUIZ_REGISTRY_HELPERS;
    if (!helpers) return;

    const { quizMeta, registerSubjectQuizzes } = helpers;

    registerSubjectQuizzes([
        quizMeta("gkgs-current-static-26-50-set-1", "General Awareness", "GK/GS Current Static Practice Set 1 (17-06-2026)", "GK/GS questions covering polity, history, geography, science and current affairs.", "Mixed", "quiz-data/general-awareness/gkgs-current-static-26-50-set-1.js")
    ]);
}());
