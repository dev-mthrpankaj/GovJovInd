(function () {
    "use strict";

    const helpers = window.GJU_QUIZ_REGISTRY_HELPERS;
    if (!helpers) return;

    const { quizMeta, registerSubjectQuizzes } = helpers;

    registerSubjectQuizzes([
        quizMeta(
            "general-awareness-bilingual-latex-set-1",
            "General Awareness",
            "General Awareness Bilingual LaTeX Set 1",
            "Hindi-English bilingual General Awareness quiz with rich-text and MathJax-safe formatting.",
            "Moderate",
            "quiz-data/general-awareness/general-awareness-bilingual-latex-set-1.js",
            10
        )
    ]);
}());
