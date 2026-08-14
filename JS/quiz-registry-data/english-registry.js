(function () {
    "use strict";

    const helpers = window.GJU_QUIZ_REGISTRY_HELPERS;
    if (!helpers) return;

    const { quizMeta, registerSubjectQuizzes } = helpers;

    registerSubjectQuizzes([
        quizMeta(
            "english-grammar-comprehension-latex-set-1",
            "English",
            "English Grammar and Comprehension LaTeX Set 1",
            "A 25-question English-only quiz for competitive exams with grammar, vocabulary, voice, narration, idioms, and passage-based comprehension.",
            "Hard",
            "quiz-data/english/english-grammar-comprehension-latex-set-1.js",
            25
        )
    ]);
}());
