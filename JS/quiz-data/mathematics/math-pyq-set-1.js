(function () {
    "use strict";

    window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];

    const quizId = "math-pyq-set-1";
    const seeds = [
        { topic: "PYQ Arithmetic", difficulty: "medium", question: "Two numbers are in the ratio 5:7 and their sum is 144. What is the smaller number?", options: ["50", "55", "60", "65"], correctAnswer: 2, explanation: "One part = 144/12 = 12. Smaller number = 5 x 12 = 60." },
        { topic: "PYQ Percentage", difficulty: "medium", question: "What is 35% of 480?", options: ["148", "158", "168", "178"], correctAnswer: 2, explanation: "35% of 480 = 0.35 x 480 = 168." },
        { topic: "PYQ Work", difficulty: "medium", question: "8 workers finish a job in 15 days. In how many days will 12 workers finish it?", options: ["8 days", "10 days", "12 days", "18 days"], correctAnswer: 1, explanation: "Workers and days are inversely proportional: 8 x 15 / 12 = 10 days." },
        { topic: "PYQ Average", difficulty: "easy", question: "The average of 7 numbers is 18. What is their sum?", options: ["108", "116", "126", "136"], correctAnswer: 2, explanation: "Sum = average x count = 18 x 7 = 126." },
        { topic: "PYQ Time Speed", difficulty: "medium", question: "72 km/h is equal to how many m/s?", options: ["18", "20", "22", "24"], correctAnswer: 1, explanation: "72 x 5/18 = 20 m/s." },
        { topic: "PYQ Number System", difficulty: "easy", question: "What is the smallest prime number?", options: ["0", "1", "2", "3"], correctAnswer: 2, explanation: "2 is the smallest and only even prime number." },
        { topic: "PYQ Mensuration", difficulty: "medium", question: "The area of a square is 144 sq cm. What is its side?", options: ["10 cm", "11 cm", "12 cm", "14 cm"], correctAnswer: 2, explanation: "Side = square root of 144 = 12 cm." },
        { topic: "PYQ Discount", difficulty: "medium", question: "The marked price is 1000 and the discount is 15%. What is the selling price?", options: ["750", "800", "850", "900"], correctAnswer: 2, explanation: "Selling price = 1000 - 15% of 1000 = 850." },
        { topic: "PYQ Algebra", difficulty: "easy", question: "If 3x = 45, what is x?", options: ["12", "15", "18", "20"], correctAnswer: 1, explanation: "x = 45/3 = 15." },
        { topic: "PYQ Mixture", difficulty: "medium", question: "The ratio of milk to water is 4:1 in 25 litres. What is the quantity of milk?", options: ["15 L", "18 L", "20 L", "22 L"], correctAnswer: 2, explanation: "Milk = 4/5 x 25 = 20 litres." }
    ];

    function formatQuestionText(question, variantIndex) {
        const text = String(question).trim();
        if (variantIndex === 0) return text;

        const variant = (variantIndex - 1) % 4;
        const instructionPatterns = [
            { pattern: /^Choose\b/i, verbs: ["Select", "Pick", "Mark", "Identify"] },
            { pattern: /^Select\b/i, verbs: ["Choose", "Pick", "Mark", "Identify"] },
            { pattern: /^Identify\b/i, verbs: ["Find", "Select", "Choose", "Mark"] },
            { pattern: /^Find\b/i, verbs: ["Determine", "Select", "Choose", "Mark"] },
            { pattern: /^Fill in the blank\b/i, verbs: ["Complete the sentence", "Choose the option that completes the sentence", "Select the option that fits the blank", "Mark the option that fits the blank"] }
        ];
        const matchedInstruction = instructionPatterns.find((item) => item.pattern.test(text));

        if (matchedInstruction) {
            return text.replace(matchedInstruction.pattern, matchedInstruction.verbs[variant]);
        }

        const prefixes = [
            "Select the correct answer: ",
            "Choose the most appropriate option: ",
            "Mark the correct response: ",
            "Answer the following: "
        ];

        return `${prefixes[variant]}${text}`;
    }
    function buildQuestions() {
        const questions = [];
        for (let index = 0; index < 50; index += 1) {
            const seed = seeds[index % seeds.length];
            const number = index + 1;
            const variantIndex = Math.floor(index / seeds.length);
            questions.push({
                id: `${quizId}-q${String(number).padStart(2, "0")}`,
                topic: seed.topic,
                difficulty: seed.difficulty,
                question: formatQuestionText(seed.question, variantIndex),
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


