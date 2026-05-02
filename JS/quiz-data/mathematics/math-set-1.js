(function () {
    "use strict";

    window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];

    const quizId = "math-set-1";
    const seeds = [
        { topic: "Arithmetic", difficulty: "easy", question: "In {label}, what is 25% of 240?", options: ["40", "50", "60", "80"], correctAnswer: 2, explanation: "25% is one-fourth. One-fourth of 240 is 60." },
        { topic: "Profit and Loss", difficulty: "medium", question: "In {label}, an item bought for 800 is sold for 920. What is the profit percent?", options: ["12%", "15%", "18%", "20%"], correctAnswer: 1, explanation: "Profit is 120. Profit percent = 120/800 x 100 = 15%." },
        { topic: "Number System", difficulty: "easy", question: "In {label}, find the LCM of 18 and 24.", options: ["48", "54", "72", "96"], correctAnswer: 2, explanation: "18 = 2 x 3 x 3 and 24 = 2 x 2 x 2 x 3. LCM is 72." },
        { topic: "Time and Work", difficulty: "medium", question: "In {label}, A completes work in 12 days and B in 18 days. Together they finish it in", options: ["6.2 days", "7.2 days", "8 days", "9 days"], correctAnswer: 1, explanation: "Combined work per day = 1/12 + 1/18 = 5/36, so time = 36/5 = 7.2 days." },
        { topic: "Percentage", difficulty: "easy", question: "In {label}, if 40% of a number is 160, find the number.", options: ["320", "360", "400", "420"], correctAnswer: 2, explanation: "Number = 160 x 100 / 40 = 400." },
        { topic: "Simple Interest", difficulty: "medium", question: "In {label}, simple interest on 5000 at 8% per annum for 2 years is", options: ["600", "700", "800", "900"], correctAnswer: 2, explanation: "SI = PRT/100 = 5000 x 8 x 2 / 100 = 800." },
        { topic: "Ratio", difficulty: "easy", question: "In {label}, reduce the ratio 24:36 to simplest form.", options: ["2:3", "3:4", "4:5", "5:6"], correctAnswer: 0, explanation: "Divide both terms by 12 to get 2:3." },
        { topic: "Average", difficulty: "medium", question: "In {label}, average of 12, 18, 20, 30 and 40 is", options: ["22", "24", "26", "28"], correctAnswer: 1, explanation: "Sum is 120 and count is 5. Average is 24." },
        { topic: "Geometry", difficulty: "easy", question: "In {label}, the sum of interior angles of a triangle is", options: ["90 degrees", "180 degrees", "270 degrees", "360 degrees"], correctAnswer: 1, explanation: "Every triangle has angle sum of 180 degrees." },
        { topic: "Mensuration", difficulty: "medium", question: "In {label}, area of a rectangle with length 15 cm and breadth 8 cm is", options: ["96 sq cm", "110 sq cm", "120 sq cm", "128 sq cm"], correctAnswer: 2, explanation: "Area = length x breadth = 15 x 8 = 120 sq cm." }
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
        subject: "Mathematics",
        title: "Mathematics Practice Set 1",
        description: "50 arithmetic and quantitative aptitude questions for SSC, Railway and Police exams.",
        durationMinutes: 30,
        totalQuestions: 50,
        marksPerQuestion: 1,
        negativeMarks: 0.25,
        difficulty: "Mixed",
        tags: ["SSC", "Railway", "Police"],
        questions: buildQuestions()
    });
}());


