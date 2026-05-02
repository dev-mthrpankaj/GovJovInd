(function () {
    "use strict";

    window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];

    const quizId = "hindi-mixed-set-1";
    const seeds = [
        { topic: "Paryayvachi", difficulty: "medium", question: "In {label}, \"Jal\" ka paryayvachi shabd hai", options: ["Agni", "Vayu", "Neer", "Dhara"], correctAnswer: 2, explanation: "Jal ka paryayvachi neer hota hai." },
        { topic: "Vilom", difficulty: "easy", question: "In {label}, \"Din\" ka vilom hai", options: ["Raat", "Suraj", "Samay", "Dopahar"], correctAnswer: 0, explanation: "Din ka vipreet raat hai." },
        { topic: "Muhavare", difficulty: "hard", question: "In {label}, \"Naak katna\" ka arth hai", options: ["Ghayal hona", "Apmaan hona", "Bimar hona", "Gir jana"], correctAnswer: 1, explanation: "Naak katna ka arth apmaan hona hai." },
        { topic: "Lokokti", difficulty: "hard", question: "In {label}, \"Oont ke muh mein jeera\" ka arth hai", options: ["Bahut adhik", "Bahut kam", "Bahut teekha", "Bahut meetha"], correctAnswer: 1, explanation: "Iska arth avashyakta ki tulna mein bahut kam hai." },
        { topic: "Vartani", difficulty: "medium", question: "In {label}, sahi vartani chuniye", options: ["Aavashyak", "Avashyak", "Aavasyak", "Awashyak"], correctAnswer: 1, explanation: "Avashyak prachalit sahi roop hai." },
        { topic: "Paryayvachi", difficulty: "easy", question: "In {label}, \"Surya\" ka paryayvachi hai", options: ["Chandra", "Ravi", "Pawan", "Neer"], correctAnswer: 1, explanation: "Ravi Surya ka paryayvachi hai." },
        { topic: "Vilom", difficulty: "easy", question: "In {label}, \"Sukh\" ka vilom hai", options: ["Dukh", "Anand", "Harsh", "Prem"], correctAnswer: 0, explanation: "Sukh ka vipreet dukh hai." },
        { topic: "Muhavare", difficulty: "medium", question: "In {label}, \"Aankh ka tara\" ka arth hai", options: ["Priya vyakti", "Dushman", "Anjaan", "Bahadur"], correctAnswer: 0, explanation: "Aankh ka tara ka arth bahut priya vyakti hai." },
        { topic: "Shabd Shakti", difficulty: "medium", question: "In {label}, bhavvachak sangya chuniye", options: ["Ladakpan", "Ram", "Ganga", "Kitab"], correctAnswer: 0, explanation: "Ladakpan ek bhav ko batata hai." },
        { topic: "Vakya", difficulty: "medium", question: "In {label}, shuddh vakya chuniye", options: ["Main gaya tha.", "Main gaya thi.", "Main gaye tha.", "Main jana tha."], correctAnswer: 0, explanation: "Puling ekvachan ke liye gaya tha sahi hai." }
    ];

    function buildQuestions() {
        const questions = [];
        for (let index = 0; index < 50; index += 1) {
            const seed = seeds[index % seeds.length];
            const round = Math.floor(index / seeds.length) + 1;
            const number = index + 1;
            const label = `${quizId} Q${number} Round ${round}`;
            questions.push({
                id: `${quizId}-q${String(number).padStart(2, "0")}`,
                topic: seed.topic,
                difficulty: seed.difficulty,
                question: seed.question.replace("{label}", label),
                options: seed.options.slice(),
                correctAnswer: seed.correctAnswer,
                explanation: seed.explanation
            });
        }
        return questions;
    }

    window.GJU_QUIZ_BANK.push({
        id: quizId,
        subject: "Hindi",
        title: "Hindi Mixed Practice Set 1",
        description: "50 mixed Hindi language questions.",
        durationMinutes: 30,
        totalQuestions: 50,
        marksPerQuestion: 1,
        negativeMarks: 0.25,
        difficulty: "Mixed",
        tags: ["SSC", "Railway", "State Exams"],
        questions: buildQuestions()
    });
}());


