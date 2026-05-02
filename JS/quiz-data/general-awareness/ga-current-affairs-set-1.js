(function () {
    "use strict";

    window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];

    const quizId = "ga-current-affairs-set-1";
    const seeds = [
        { topic: "Current Affairs", difficulty: "medium", question: "Where was the G20 Summit 2023 hosted by India held?", options: ["Mumbai", "New Delhi", "Goa", "Jaipur"], correctAnswer: 1, explanation: "The main summit was held in New Delhi." },
        { topic: "Sports", difficulty: "easy", question: "Which game is associated with the term \"checkmate\"?", options: ["Chess", "Hockey", "Cricket", "Tennis"], correctAnswer: 0, explanation: "Checkmate is used in chess." },
        { topic: "Science", difficulty: "medium", question: "What is the chemical symbol of gold?", options: ["Ag", "Au", "Gd", "Go"], correctAnswer: 1, explanation: "Gold has the symbol Au." },
        { topic: "Environment", difficulty: "medium", question: "On which date is World Environment Day observed?", options: ["5 June", "5 July", "22 April", "16 September"], correctAnswer: 0, explanation: "World Environment Day is observed on 5 June." },
        { topic: "Books", difficulty: "medium", question: "Wings of Fire is associated with which personality?", options: ["A P J Abdul Kalam", "Mahatma Gandhi", "R K Narayan", "Vikram Seth"], correctAnswer: 0, explanation: "Wings of Fire is an autobiography of A P J Abdul Kalam." },
        { topic: "International", difficulty: "easy", question: "Where is the United Nations headquarters located?", options: ["London", "New York", "Paris", "Geneva"], correctAnswer: 1, explanation: "The UN headquarters is in New York." },
        { topic: "Economy", difficulty: "medium", question: "What does inflation mean?", options: ["fall in prices", "rise in general prices", "increase in exports", "fall in population"], correctAnswer: 1, explanation: "Inflation is a general rise in prices." },
        { topic: "Polity", difficulty: "medium", question: "Who elects the President of India?", options: ["direct public vote", "electoral college", "Rajya Sabha only", "Lok Sabha only"], correctAnswer: 1, explanation: "The President is elected by an electoral college." },
        { topic: "Geography", difficulty: "easy", question: "Which is the largest ocean?", options: ["Atlantic", "Indian", "Pacific", "Arctic"], correctAnswer: 2, explanation: "The Pacific Ocean is the largest." },
        { topic: "Science Tech", difficulty: "medium", question: "Chandrayaan missions are related to ____.", options: ["Moon exploration", "Mars exploration", "Sun study", "Ocean study"], correctAnswer: 0, explanation: "Chandrayaan is India\u0027s lunar exploration programme." }
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


