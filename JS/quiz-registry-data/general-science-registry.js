(function () {
    "use strict";

    const helpers = window.GJU_QUIZ_REGISTRY_HELPERS;
    if (!helpers) return;

    const { quizMeta, registerSubjectQuizzes } = helpers;

    registerSubjectQuizzes([
        quizMeta("general-science-set-1", "General Science", "General Science Practice Set 1", "Physics, chemistry, biology, environment and everyday science questions for government exam practice.", "Mixed", "quiz-data/general-science/general-science-set-1.js")
    ]);
}());
