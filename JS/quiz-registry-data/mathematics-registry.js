(function () {
    "use strict";

    const helpers = window.GJU_QUIZ_REGISTRY_HELPERS;
    if (!helpers) return;

    const { quizMeta, registerSubjectQuizzes } = helpers;

    registerSubjectQuizzes([
        quizMeta("rrb-groupd-math-set-1", "Mathematics", "RRB Group D Mathematics Practice Set 1 (Bilingual)", "Hindi-English bilingual mathematics questions for RRB Group D from previous year question papers.", "Mixed", "quiz-data/mathematics/rrb-groupd-math-set-1.js"),
        quizMeta("math-bilingual-latex-set-1", "Mathematics", "Maths Bilingual LaTeX Practice Set 1", "Hindi-English bilingual maths questions with LaTeX formatting across percentage, algebra, geometry, mensuration and arithmetic topics.", "Mixed", "quiz-data/mathematics/math-bilingual-latex-set-1.js"),
        quizMeta("ssc-cgl-quant-set-2", "Mathematics", "SSC CGL Tier 1 Quantitative Aptitude Practice Set 2 (Bilingual)", "Hindi-English bilingual quantitative aptitude questions with LaTeX formatting.", "Previous Year", "quiz-data/mathematics/ssc-cgl-quant-set-2.js"),
        quizMeta("ssc-cgl-tier-1-12-sep-2025-shift-2-quant", "Mathematics", "SSC CGL Tier 1 - 12 Sep 2025 Shift 2 Quant (Bilingual)", "Hindi-English bilingual SSC CGL Tier 1 quantitative aptitude questions from 12 Sep 2025 Shift 2.", "Previous Year", "quiz-data/mathematics/ssc-cgl-tier-1-12-sep-2025-shift-2-quant.js"),
        quizmeta("ssc-cgl-quant-pyq-2025-set-3", "Mathematics", "SSC CGL Tier 1 - 12 Sep 2025 Shift 2 Quant (Bilingual)", "Hindi-English bilingual SSC CGL Tier 1 quantitative aptitude questions from 12 Sep 2025 Shift 2.", "Previous Year", "quiz-data/mathematics/ssc-cgl-quant-pyq-2025-set-3.js"),
    ]);
}());
