(function () {
    "use strict";

    window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];

    const quizId = "math-pyq-set-1";
    const seeds = [
        { topic: "PYQ Arithmetic", difficulty: "medium", question: "In {label}, two numbers are in ratio 5:7 and their sum is 144. Smaller number is", options: ["50", "55", "60", "65"], correctAnswer: 2, explanation: "One part = 144/12 = 12. Smaller number = 5 x 12 = 60." },
        { topic: "PYQ Percentage", difficulty: "medium", question: "In {label}, 35% of 480 equals", options: ["148", "158", "168", "178"], correctAnswer: 2, explanation: "35% of 480 = 0.35 x 480 = 168." },
        { topic: "PYQ Work", difficulty: "medium", question: "In {label}, 8 workers finish a job in 15 days. 12 workers finish it in", options: ["8 days", "10 days", "12 days", "18 days"], correctAnswer: 1, explanation: "Workers and days are inversely proportional: 8 x 15 / 12 = 10 days." },
        { topic: "PYQ Average", difficulty: "easy", question: "In {label}, average of 7 numbers is 18. Their sum is", options: ["108", "116", "126", "136"], correctAnswer: 2, explanation: "Sum = average x count = 18 x 7 = 126." },
        { topic: "PYQ Time Speed", difficulty: "medium", question: "In {label}, speed 72 km/h equals how many m/s?", options: ["18", "20", "22", "24"], correctAnswer: 1, explanation: "72 x 5/18 = 20 m/s." },
        { topic: "PYQ Number System", difficulty: "easy", question: "In {label}, the smallest prime number is", options: ["0", "1", "2", "3"], correctAnswer: 2, explanation: "2 is the smallest and only even prime number." },
        { topic: "PYQ Mensuration", difficulty: "medium", question: "In {label}, area of a square is 144 sq cm. Its side is", options: ["10 cm", "11 cm", "12 cm", "14 cm"], correctAnswer: 2, explanation: "Side = square root of 144 = 12 cm." },
        { topic: "PYQ Discount", difficulty: "medium", question: "In {label}, marked price 1000 and discount 15%. Selling price is", options: ["750", "800", "850", "900"], correctAnswer: 2, explanation: "Selling price = 1000 - 15% of 1000 = 850." },
        { topic: "PYQ Algebra", difficulty: "easy", question: "In {label}, if 3x = 45, x is", options: ["12", "15", "18", "20"], correctAnswer: 1, explanation: "x = 45/3 = 15." },
        { topic: "PYQ Mixture", difficulty: "medium", question: "In {label}, ratio of milk to water is 4:1 in 25 litres. Milk quantity is", options: ["15 L", "18 L", "20 L", "22 L"], correctAnswer: 2, explanation: "Milk = 4/5 x 25 = 20 litres." }
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
        title: "Mathematics PYQ Practice Set 1",
        description: "50 previous-year style quantitative aptitude questions.",
        durationMinutes: 30,
        totalQuestions: 50,
        marksPerQuestion: 1,
        negativeMarks: 0.25,
        difficulty: "Previous Year",
        tags: ["SSC", "Railway", "State Exams"],
        questions: buildQuestions()
    });
}());


