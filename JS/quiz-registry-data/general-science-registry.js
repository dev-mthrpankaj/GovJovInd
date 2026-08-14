(function () {
    "use strict";

    const helpers = window.GJU_QUIZ_REGISTRY_HELPERS;
    if (!helpers) return;

    const { quizMeta, registerSubjectQuizzes } = helpers;

    registerSubjectQuizzes([
        quizMeta(
            "general-science-bilingual-latex-set-1",
            "General Science",
            "General Science Bilingual LaTeX Set 1",
            "Hindi-English bilingual General Science quiz with Physics, Chemistry and Biology questions in MathJax-safe format.",
            "Moderate",
            "quiz-data/general-science/general-science-bilingual-latex-set-1.js",
            10
        )
    ]);
}());
