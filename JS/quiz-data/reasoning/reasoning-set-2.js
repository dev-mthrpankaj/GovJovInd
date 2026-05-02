(function () {
    "use strict";

    window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];

    const quizId = "reasoning-set-2";
    const seeds = [
        { topic: "Series", difficulty: "medium", question: "Find the next number in the series: 5, 10, 20, 40, ____.", options: ["60", "70", "80", "90"], correctAnswer: 2, explanation: "Each term is multiplied by 2." },
        { topic: "Analogy", difficulty: "easy", question: "Doctor is to hospital as teacher is to ____.", options: ["court", "school", "bank", "market"], correctAnswer: 1, explanation: "A teacher works in a school." },
        { topic: "Coding-Decoding", difficulty: "medium", question: "If DOG = 4157 using alphabet positions, what is COW?", options: ["31523", "31423", "31624", "21423"], correctAnswer: 0, explanation: "C=3, O=15, W=23." },
        { topic: "Direction", difficulty: "medium", question: "A person facing east turns left and then right. What is the final direction?", options: ["north", "south", "east", "west"], correctAnswer: 2, explanation: "Left from east is north, then right from north is east." },
        { topic: "Blood Relation", difficulty: "easy", question: "Father's father is called ____.", options: ["uncle", "grandfather", "brother", "cousin"], correctAnswer: 1, explanation: "Father\u0027s father is grandfather." },
        { topic: "Odd One Out", difficulty: "easy", question: "Find the odd one out.", options: ["Apple", "Mango", "Potato", "Banana"], correctAnswer: 2, explanation: "Potato is a vegetable; the others are fruits." },
        { topic: "Ranking", difficulty: "medium", question: "B is 12th from the left and 14th from the right. What is the total number of persons?", options: ["24", "25", "26", "27"], correctAnswer: 1, explanation: "Total = 12 + 14 - 1 = 25." },
        { topic: "Venn Diagram", difficulty: "medium", question: "which group best represents dogs, animals and cats?", options: ["separate circles", "animals containing dogs and cats", "dogs containing animals", "cats containing dogs"], correctAnswer: 1, explanation: "Dogs and cats are subsets of animals." },
        { topic: "Calendar", difficulty: "medium", question: "How many months have 31 days?", options: ["5", "6", "7", "8"], correctAnswer: 2, explanation: "Seven months have 31 days." },
        { topic: "Clock", difficulty: "medium", question: "What is the angle between the clock hands at 6:00?", options: ["90 degrees", "120 degrees", "180 degrees", "360 degrees"], correctAnswer: 2, explanation: "At 6:00 the hands are opposite." }
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
        title: "Reasoning Practice Set 2",
        description: "50 verbal and non-verbal reasoning practice questions.",
        durationMinutes: 30,
        totalQuestions: 50,
        marksPerQuestion: 1,
        negativeMarks: 0.25,
        difficulty: "Moderate",
        tags: ["SSC", "Railway", "Banking"],
        questions: buildQuestions()
    });
}());


