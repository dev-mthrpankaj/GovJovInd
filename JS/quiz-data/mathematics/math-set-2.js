(function () {
    "use strict";

    window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];

    const quizId = "math-set-2";
    const seeds = [
        { topic: "Number System", difficulty: "easy", question: "What is the HCF of 36 and 60?", options: ["6", "9", "12", "18"], correctAnswer: 2, explanation: "The greatest common factor of 36 and 60 is 12." },
        { topic: "Percentage", difficulty: "medium", question: "A value increases from 500 to 650. What is the percentage increase?", options: ["20%", "25%", "30%", "35%"], correctAnswer: 2, explanation: "Increase is 150. Percentage increase = 150/500 x 100 = 30%." },
        { topic: "Average", difficulty: "easy", question: "What is the average of the first five even natural numbers?", options: ["4", "5", "6", "8"], correctAnswer: 2, explanation: "2+4+6+8+10 = 30, and 30/5 = 6." },
        { topic: "Time and Distance", difficulty: "medium", question: "A train covers 180 km in 3 hours. What is its speed?", options: ["45 km/h", "50 km/h", "60 km/h", "75 km/h"], correctAnswer: 2, explanation: "Speed = distance/time = 180/3 = 60 km/h." },
        { topic: "Simplification", difficulty: "easy", question: "Simplify 18 + 6 x 4 - 8.", options: ["26", "34", "40", "88"], correctAnswer: 1, explanation: "Using BODMAS, 6 x 4 = 24, so 18 + 24 - 8 = 34." },
        { topic: "Ratio", difficulty: "medium", question: "If A:B = 3:5 and the total is 64, find A.", options: ["20", "24", "30", "40"], correctAnswer: 1, explanation: "A share = 3/(3+5) x 64 = 24." },
        { topic: "Mensuration", difficulty: "medium", question: "What is the perimeter of a square of side 9 cm?", options: ["18 cm", "27 cm", "36 cm", "81 cm"], correctAnswer: 2, explanation: "Perimeter of square = 4 x side = 36 cm." },
        { topic: "Simple Interest", difficulty: "medium", question: "A principal of 4000 earns interest of 600 in 3 years. What is the rate?", options: ["4%", "5%", "6%", "8%"], correctAnswer: 1, explanation: "Rate = SI x 100 / (P x T) = 60000/12000 = 5%." },
        { topic: "Algebra", difficulty: "easy", question: "If x + 7 = 19, what is x?", options: ["10", "11", "12", "13"], correctAnswer: 2, explanation: "Subtract 7 from both sides: x = 12." },
        { topic: "Profit and Loss", difficulty: "medium", question: "The selling price is 720 and the loss is 10%. What is the cost price?", options: ["780", "800", "820", "900"], correctAnswer: 1, explanation: "SP = 90% of CP, so CP = 720/0.9 = 800." }
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


