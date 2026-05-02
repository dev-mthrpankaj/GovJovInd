(function () {
    "use strict";

    const quizData = window.SARKARI_QUIZ || { subjects: [], questions: [] };

    const setTitles = {
        Mathematics: [
            ["mathematics-practice-set-1", "Mathematics Practice Set 1", "Arithmetic, percentage, ratio, SI, mensuration and exam-style basics.", "Mixed"],
            ["mathematics-practice-set-2", "Mathematics Practice Set 2", "Calculation speed, number system, work, average and applied maths.", "Moderate"],
            ["mathematics-previous-year-set-1", "Mathematics Previous Year Set 1", "Previous-year style quantitative aptitude questions.", "Previous Year"],
            ["mathematics-mixed-set-1", "Mathematics Mixed Set 1", "Mixed government exam maths practice.", "Mixed"]
        ],
        English: [
            ["english-grammar-set-1", "English Grammar Set 1", "Grammar, tense, article, voice and sentence correction.", "Mixed"],
            ["english-vocabulary-set-1", "English Vocabulary Set 1", "Vocabulary, antonyms, synonyms, spelling and usage.", "Moderate"],
            ["english-previous-year-set-1", "English Previous Year Set 1", "Previous-year style English language questions.", "Previous Year"],
            ["english-mixed-set-1", "English Mixed Set 1", "Grammar, vocabulary and previous-year style questions.", "Mixed"]
        ],
        Hindi: [
            ["hindi-vyakaran-set-1", "Hindi Vyakaran Set 1", "Hindi grammar, sandhi, samas, karak and vartani.", "Mixed"],
            ["hindi-shabdavali-set-1", "Hindi Shabdavali Set 1", "Paryayvachi, vilom, lokokti and muhavare.", "Moderate"],
            ["hindi-previous-year-set-1", "Hindi Previous Year Set 1", "Previous-year style Hindi language questions.", "Previous Year"],
            ["hindi-mixed-set-1", "Hindi Mixed Set 1", "Mixed Hindi practice for government exams.", "Mixed"]
        ],
        "General Awareness": [
            ["general-awareness-static-gk-set-1", "General Awareness Static GK Set 1", "Polity, history, geography, economy and science tech.", "Mixed"],
            ["general-awareness-current-set-1", "General Awareness Current Set 1", "Current and static awareness for competitive exams.", "Moderate"],
            ["general-awareness-previous-year-set-1", "General Awareness Previous Year Set 1", "Previous-year style general awareness questions.", "Previous Year"],
            ["general-awareness-mixed-set-1", "General Awareness Mixed Set 1", "Mixed GK and awareness practice.", "Mixed"]
        ],
        Reasoning: [
            ["reasoning-practice-set-1", "Reasoning Practice Set 1", "Analogy, series, coding, directions and ranking.", "Mixed"],
            ["reasoning-ability-set-1", "Reasoning Ability Set 1", "Verbal and non-verbal reasoning practice.", "Moderate"],
            ["reasoning-previous-year-set-1", "Reasoning Previous Year Set 1", "Previous-year style reasoning questions.", "Previous Year"],
            ["reasoning-mixed-set-1", "Reasoning Mixed Set 1", "Mixed reasoning practice for government exams.", "Mixed"]
        ],
        Computer: [
            ["computer-basics-set-1", "Computer Basics Set 1", "Computer basics, hardware, software and internet.", "Mixed"],
            ["computer-awareness-set-1", "Computer Awareness Set 1", "Networking, security, office tools and memory basics.", "Moderate"],
            ["computer-previous-year-set-1", "Computer Previous Year Set 1", "Previous-year style computer awareness questions.", "Previous Year"],
            ["computer-mixed-set-1", "Computer Mixed Set 1", "Mixed computer knowledge practice.", "Mixed"]
        ]
    };

    function questionIdsForSubject(subject) {
        return quizData.questions
            .filter((question) => question.subject === subject)
            .slice(0, 50)
            .map((question) => question.id);
    }

    window.QUIZ_SETS = Object.entries(setTitles).flatMap(([subject, rows]) => {
        const questionIds = questionIdsForSubject(subject);
        return rows.map(([id, title, description, difficulty]) => ({
            id,
            subject,
            title,
            description,
            totalQuestions: 50,
            durationMinutes: 30,
            difficulty,
            marksPerQuestion: 1,
            negativeMarks: 0.25,
            negativeMarkingEnabled: true,
            questionIds
        }));
    });
}());
