(function () {
    "use strict";

    const helpers = window.GJU_QUIZ_REGISTRY_HELPERS;
    if (!helpers) return;

    const { createQuizSeries, registerSubjectQuizzes } = helpers;

    registerSubjectQuizzes([
        ...createQuizSeries("reasoning-mirror-image-very-hard-set", 2, "Reasoning", (n) => `Reasoning Mirror Image Very Hard Practice Set ${n}`, () => "Very hard Mirror Image reasoning MCQs for SSC, Police, UPSI, Railway and other competitive exams with close options and professional explanations.", "Very Hard", (n, id) => `quiz-data/reasoning/${id}.js`),
        ...createQuizSeries("reasoning-water-image-very-hard-set", 2, "Reasoning", (n) => `Reasoning Water Image Very Hard Practice Set ${n}`, () => "Very hard Water Image reasoning MCQs for SSC, Police, UPSI, Railway and other competitive exams with close options and professional explanations.", "Very Hard", (n, id) => `quiz-data/reasoning/${id}.js`),
        ...createQuizSeries("reasoning-clock-very-hard-set", 2, "Reasoning", (n) => `Reasoning Clock Very Hard Practice Set ${n}`, () => "Very hard Clock reasoning MCQs for SSC, Police, UPSI, Railway and other competitive exams with close options and professional explanations.", "Very Hard", (n, id) => `quiz-data/reasoning/${id}.js`),
        ...createQuizSeries("reasoning-calendar-very-hard-set", 2, "Reasoning", (n) => `Reasoning Calendar Very Hard Practice Set ${n}`, () => "Very hard Calendar reasoning MCQs for SSC, Police, UPSI, Railway and other competitive exams with close options and professional explanations.", "Very Hard", (n, id) => `quiz-data/reasoning/${id}.js`)
    ]);
}());
