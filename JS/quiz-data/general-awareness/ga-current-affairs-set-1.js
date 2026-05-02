(function () {
    "use strict";

    window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];

    const quizId = "ga-current-affairs-set-1";
    const seeds = [
        { topic: "Current Affairs", difficulty: "medium", question: "In {label}, the G20 Summit 2023 hosted by India was held in", options: ["Mumbai", "New Delhi", "Goa", "Jaipur"], correctAnswer: 1, explanation: "The main summit was held in New Delhi." },
        { topic: "Sports", difficulty: "easy", question: "In {label}, the term checkmate is associated with", options: ["Chess", "Hockey", "Cricket", "Tennis"], correctAnswer: 0, explanation: "Checkmate is used in chess." },
        { topic: "Science", difficulty: "medium", question: "In {label}, the chemical symbol of gold is", options: ["Ag", "Au", "Gd", "Go"], correctAnswer: 1, explanation: "Gold has the symbol Au." },
        { topic: "Environment", difficulty: "medium", question: "In {label}, World Environment Day is observed on", options: ["5 June", "5 July", "22 April", "16 September"], correctAnswer: 0, explanation: "World Environment Day is observed on 5 June." },
        { topic: "Books", difficulty: "medium", question: "In {label}, Wings of Fire is associated with", options: ["A P J Abdul Kalam", "Mahatma Gandhi", "R K Narayan", "Vikram Seth"], correctAnswer: 0, explanation: "Wings of Fire is an autobiography of A P J Abdul Kalam." },
        { topic: "International", difficulty: "easy", question: "In {label}, United Nations headquarters is in", options: ["London", "New York", "Paris", "Geneva"], correctAnswer: 1, explanation: "The UN headquarters is in New York." },
        { topic: "Economy", difficulty: "medium", question: "In {label}, inflation means", options: ["fall in prices", "rise in general prices", "increase in exports", "fall in population"], correctAnswer: 1, explanation: "Inflation is a general rise in prices." },
        { topic: "Polity", difficulty: "medium", question: "In {label}, the President of India is elected by", options: ["direct public vote", "electoral college", "Rajya Sabha only", "Lok Sabha only"], correctAnswer: 1, explanation: "The President is elected by an electoral college." },
        { topic: "Geography", difficulty: "easy", question: "In {label}, the largest ocean is", options: ["Atlantic", "Indian", "Pacific", "Arctic"], correctAnswer: 2, explanation: "The Pacific Ocean is the largest." },
        { topic: "Science Tech", difficulty: "medium", question: "In {label}, Chandrayaan missions are related to", options: ["Moon exploration", "Mars exploration", "Sun study", "Ocean study"], correctAnswer: 0, explanation: "Chandrayaan is India\u0027s lunar exploration programme." }
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
        subject: "General Awareness",
        title: "General Awareness Current Affairs Set 1",
        description: "50 current and static awareness questions for competitive exams.",
        durationMinutes: 30,
        totalQuestions: 50,
        marksPerQuestion: 1,
        negativeMarks: 0.25,
        difficulty: "Moderate",
        tags: ["SSC", "Railway", "State Exams"],
        questions: buildQuestions()
    });
}());


