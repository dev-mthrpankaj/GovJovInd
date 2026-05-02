(function () {
    "use strict";

    window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];

    const quizId = "reasoning-set-1";
    const seeds = [
        { topic: "Analogy", difficulty: "easy", question: "Book is to reading as food is to ____.", options: ["cooking", "eating", "buying", "serving"], correctAnswer: 1, explanation: "Food is eaten just as a book is read." },
        { topic: "Series", difficulty: "medium", question: "Find the next number in the series: 3, 6, 12, 24, ____.", options: ["30", "36", "48", "60"], correctAnswer: 2, explanation: "Each term is doubled." },
        { topic: "Coding-Decoding", difficulty: "hard", question: "If CAT is coded as 3120, how is BAT coded?", options: ["2120", "220", "221", "1202"], correctAnswer: 0, explanation: "B=2, A=1, T=20." },
        { topic: "Direction", difficulty: "medium", question: "A man faces north, turns right, then turns right again. Which direction does he face?", options: ["north", "south", "east", "west"], correctAnswer: 1, explanation: "Two right turns from north lead to south." },
        { topic: "Blood Relation", difficulty: "easy", question: "My mother's brother is my ____.", options: ["father", "uncle", "cousin", "nephew"], correctAnswer: 1, explanation: "Mother\u0027s brother is uncle." },
        { topic: "Odd One Out", difficulty: "easy", question: "Find the odd one out.", options: ["Circle", "Square", "Triangle", "Bus"], correctAnswer: 3, explanation: "Bus is not a geometric figure." },
        { topic: "Syllogism", difficulty: "hard", question: "all pens are tools. Some tools are blue. Conclusion: Some pens are blue.", options: ["definitely true", "definitely false", "cannot be determined", "none"], correctAnswer: 2, explanation: "The statements do not prove any pen is blue." },
        { topic: "Ranking", difficulty: "medium", question: "In a row of 25 students, A is 9th from the left. What is A's position from the right?", options: ["15th", "16th", "17th", "18th"], correctAnswer: 2, explanation: "Right position = 25 - 9 + 1 = 17." },
        { topic: "Calendar", difficulty: "easy", question: "How many days does a leap year have?", options: ["364", "365", "366", "367"], correctAnswer: 2, explanation: "A leap year has 366 days." },
        { topic: "Clock", difficulty: "medium", question: "What is the angle between the hands of a clock at 3:00?", options: ["30 degrees", "60 degrees", "90 degrees", "120 degrees"], correctAnswer: 2, explanation: "At 3:00 the hands are perpendicular." }
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
        subject: "Reasoning",
        title: "Reasoning Practice Set 1",
        description: "50 analogy, series, coding, direction and ranking questions.",
        durationMinutes: 30,
        totalQuestions: 50,
        marksPerQuestion: 1,
        negativeMarks: 0.25,
        difficulty: "Mixed",
        tags: ["SSC", "Railway", "Police"],
        questions: buildQuestions()
    });
}());


