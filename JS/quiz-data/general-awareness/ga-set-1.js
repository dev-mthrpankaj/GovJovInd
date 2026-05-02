(function () {
    "use strict";

    window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];

    const quizId = "ga-set-1";
    const seeds = [
        { topic: "Polity", difficulty: "easy", question: "In {label}, Constitution Day in India is observed on", options: ["26 January", "15 August", "26 November", "2 October"], correctAnswer: 2, explanation: "Constitution Day is observed on 26 November." },
        { topic: "History", difficulty: "medium", question: "In {label}, who founded the Maurya Empire?", options: ["Ashoka", "Chandragupta Maurya", "Bindusara", "Harsha"], correctAnswer: 1, explanation: "Chandragupta Maurya founded the Maurya Empire." },
        { topic: "Geography", difficulty: "easy", question: "In {label}, the capital of Rajasthan is", options: ["Jodhpur", "Udaipur", "Jaipur", "Kota"], correctAnswer: 2, explanation: "Jaipur is the capital of Rajasthan." },
        { topic: "Economy", difficulty: "medium", question: "In {label}, RBI headquarters is located in", options: ["Delhi", "Mumbai", "Kolkata", "Chennai"], correctAnswer: 1, explanation: "The Reserve Bank of India headquarters is in Mumbai." },
        { topic: "Polity", difficulty: "hard", question: "In {label}, Fundamental Duties are mentioned in which part of the Constitution?", options: ["Part III", "Part IV", "Part IVA", "Part V"], correctAnswer: 2, explanation: "Fundamental Duties are in Part IVA." },
        { topic: "History", difficulty: "medium", question: "In {label}, Quit India Movement was launched in", options: ["1930", "1942", "1945", "1919"], correctAnswer: 1, explanation: "The movement was launched in August 1942." },
        { topic: "Geography", difficulty: "easy", question: "In {label}, the longest river flowing in India is", options: ["Yamuna", "Godavari", "Ganga", "Narmada"], correctAnswer: 2, explanation: "Ganga is generally considered the longest river in India." },
        { topic: "Science Tech", difficulty: "medium", question: "In {label}, ISRO headquarters is in", options: ["Bengaluru", "Hyderabad", "Ahmedabad", "Pune"], correctAnswer: 0, explanation: "ISRO headquarters is in Bengaluru." },
        { topic: "Economy", difficulty: "hard", question: "In {label}, GST was introduced in India in", options: ["2015", "2016", "2017", "2018"], correctAnswer: 2, explanation: "GST was implemented from 1 July 2017." },
        { topic: "Awards", difficulty: "medium", question: "In {label}, Bharat Ratna is India\u0027s", options: ["highest civilian award", "highest sports award", "highest gallantry award", "highest film award"], correctAnswer: 0, explanation: "Bharat Ratna is the highest civilian award of India." }
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
        title: "General Awareness Static GK Set 1",
        description: "50 polity, history, geography, economy and science questions.",
        durationMinutes: 30,
        totalQuestions: 50,
        marksPerQuestion: 1,
        negativeMarks: 0.25,
        difficulty: "Mixed",
        tags: ["SSC", "Railway", "State Exams"],
        questions: buildQuestions()
    });
}());


