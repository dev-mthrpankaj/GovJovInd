(function () {
    "use strict";

    const helpers = window.GJU_QUIZ_REGISTRY_HELPERS;
    if (!helpers) return;

    const { quizMeta, createQuizSeries, registerSubjectQuizzes } = helpers;

    registerSubjectQuizzes([
        quizMeta("english-active-passive-set-1", "English", "English Active Passive Practice Set 1", "SSC CGL, CHSL and CPO active-passive voice questions.", "Hard", "quiz-data/english/english-active-passive-set-1.js"),
        quizMeta("english-grammar-set-1", "English", "English Grammar Practice Set 1", "Grammar questions for SSC, Railway and Police exams.", "Mixed", "quiz-data/english/english-grammar-set-1.js"),
        quizMeta("english-vocabulary-set-1", "English", "English Vocabulary Practice Set 1", "Vocabulary, antonym, synonym, spelling and usage questions.", "Moderate", "quiz-data/english/english-vocabulary-set-1.js"),
        quizMeta("english-mixed-set-1", "English", "English Mixed Practice Set 1", "Mixed English grammar and vocabulary questions.", "Mixed", "quiz-data/english/english-mixed-set-1.js"),
        quizMeta("english-narration-set-1", "English", "English Narration Practice Set 1", "SSC CGL, CHSL and CPO direct-indirect speech narration questions.", "Previous Year", "quiz-data/english/english-narration-set-1.js"),
        ...createQuizSeries("english-one-word-substitution-set", 24, "English", (n) => `English One Word Substitution Practice Set ${n}`, () => "Tough-level One Word Substitution MCQs for SSC CGL, SSC CPO, UPSI, UPPCS and other competitive exams with professional explanations.", "Hard", (n, id) => `quiz-data/english/${id}.js`),
        ...createQuizSeries("english-detecting-errors-set", 31, "English", (n) => `English Detecting Errors Practice Set ${n}`, () => "Previous-year detecting error questions from the uploaded PDF for SSC, Railway, Police and other government exams.", "Hard", (n, id) => `quiz-data/english/${id}.js`)
    ]);
}());
