(function () {
    "use strict";

    window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];

    const quizId = "math-set-2";
    const seeds = [
        { topic: "Number System", difficulty: "easy", question: "In {label}, what is the HCF of 36 and 60?", options: ["6", "9", "12", "18"], correctAnswer: 2, explanation: "The greatest common factor of 36 and 60 is 12." },
        { topic: "Percentage", difficulty: "medium", question: "In {label}, a value increases from 500 to 650. What is the percentage increase?", options: ["20%", "25%", "30%", "35%"], correctAnswer: 2, explanation: "Increase is 150. Percentage increase = 150/500 x 100 = 30%." },
        { topic: "Average", difficulty: "easy", question: "In {label}, average of first five even natural numbers is", options: ["4", "5", "6", "8"], correctAnswer: 2, explanation: "2+4+6+8+10 = 30, and 30/5 = 6." },
        { topic: "Time and Distance", difficulty: "medium", question: "In {label}, a train covers 180 km in 3 hours. Its speed is", options: ["45 km/h", "50 km/h", "60 km/h", "75 km/h"], correctAnswer: 2, explanation: "Speed = distance/time = 180/3 = 60 km/h." },
        { topic: "Simplification", difficulty: "easy", question: "In {label}, simplify 18 + 6 x 4 - 8.", options: ["26", "34", "40", "88"], correctAnswer: 1, explanation: "Using BODMAS, 6 x 4 = 24, so 18 + 24 - 8 = 34." },
        { topic: "Ratio", difficulty: "medium", question: "In {label}, if A:B = 3:5 and total is 64, find A.", options: ["20", "24", "30", "40"], correctAnswer: 1, explanation: "A share = 3/(3+5) x 64 = 24." },
        { topic: "Mensuration", difficulty: "medium", question: "In {label}, perimeter of a square of side 9 cm is", options: ["18 cm", "27 cm", "36 cm", "81 cm"], correctAnswer: 2, explanation: "Perimeter of square = 4 x side = 36 cm." },
        { topic: "Simple Interest", difficulty: "medium", question: "In {label}, principal 4000 earns interest 600 in 3 years. Rate is", options: ["4%", "5%", "6%", "8%"], correctAnswer: 1, explanation: "Rate = SI x 100 / (P x T) = 60000/12000 = 5%." },
        { topic: "Algebra", difficulty: "easy", question: "In {label}, if x + 7 = 19, x is", options: ["10", "11", "12", "13"], correctAnswer: 2, explanation: "Subtract 7 from both sides: x = 12." },
        { topic: "Profit and Loss", difficulty: "medium", question: "In {label}, selling price is 720 and loss is 10%. Cost price is", options: ["780", "800", "820", "900"], correctAnswer: 1, explanation: "SP = 90% of CP, so CP = 720/0.9 = 800." }
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
        title: "Mathematics Practice Set 2",
        description: "50 calculation speed, number system, work, average and applied maths questions.",
        durationMinutes: 30,
        totalQuestions: 50,
        marksPerQuestion: 1,
        negativeMarks: 0.25,
        difficulty: "Moderate",
        tags: ["SSC", "Railway", "Banking"],
        questions: buildQuestions()
    });
}());


