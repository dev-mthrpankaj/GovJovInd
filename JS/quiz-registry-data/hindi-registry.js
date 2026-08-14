(function () {
    "use strict";

    const helpers = window.GJU_QUIZ_REGISTRY_HELPERS;
    if (!helpers) return;

    const { quizMeta, registerSubjectQuizzes } = helpers;

    registerSubjectQuizzes([
        quizMeta(
            "hindi-bhasha-bodh-vyakaran-hard-set-1",
            "Hindi",
            "Hindi Bhasha Bodh Evam Vyakaran Hard Set 1",
            "UP Police Constable, UPSI and TET ke liye hard Hindi language comprehension and grammar quiz with rich text and LaTeX-safe formatting.",
            "Hard",
            "quiz-data/hindi/hindi-bhasha-bodh-vyakaran-hard-set-1.js"
        )
    ]);
}());
