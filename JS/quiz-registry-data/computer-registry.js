(function () {
    "use strict";

    const helpers = window.GJU_QUIZ_REGISTRY_HELPERS;
    if (!helpers) return;

    const { quizMeta, registerSubjectQuizzes } = helpers;

    registerSubjectQuizzes([
        quizMeta("computer-set-1", "Computer", "Computer Basics Practice Set 1", "Computer basics, hardware, software and internet questions.", "Mixed", "quiz-data/computer/computer-set-1.js"),
        quizMeta("computer-set-2", "Computer", "Computer Awareness Practice Set 2", "Networking, security, office tools and memory questions.", "Moderate", "quiz-data/computer/computer-set-2.js")
    ]);
}());
