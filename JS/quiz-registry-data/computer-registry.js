(function () {
    "use strict";

    const helpers = window.GJU_QUIZ_REGISTRY_HELPERS;
    if (!helpers) return;

    const { quizMeta, registerSubjectQuizzes } = helpers;

    registerSubjectQuizzes([
        quizMeta(
            "computer-bilingual-latex-set-1",
            "Computer",
            "Computer Bilingual LaTeX Set 1",
            "Hindi-English bilingual Computer fundamentals quiz with rich-text and MathJax-safe formatting.",
            "Moderate",
            "quiz-data/computer/computer-bilingual-latex-set-1.js",
            10
        )
    ]);
}());
