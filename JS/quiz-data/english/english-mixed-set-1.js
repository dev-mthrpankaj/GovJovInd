(function () {
    "use strict";

    window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];

    const quizId = "english-mixed-set-1";
    const seeds = [
        { topic: "Grammar", difficulty: "easy", question: "Choose the correct form: She ___ daily.", options: ["study", "studies", "studying", "studied"], correctAnswer: 1, explanation: "Singular subject she takes studies." },
        { topic: "Vocabulary", difficulty: "easy", question: "Choose the synonym of \"honest\".", options: ["truthful", "clever", "rich", "angry"], correctAnswer: 0, explanation: "Honest means truthful." },
        { topic: "Article", difficulty: "medium", question: "Fill in the blank: He saw ___ eagle.", options: ["a", "an", "the", "no article"], correctAnswer: 1, explanation: "Eagle begins with a vowel sound." },
        { topic: "Antonym", difficulty: "easy", question: "Choose the antonym of \"accept\".", options: ["receive", "reject", "allow", "agree"], correctAnswer: 1, explanation: "Reject is opposite to accept." },
        { topic: "Tense", difficulty: "medium", question: "Choose the correct form: They ___ here since morning.", options: ["wait", "waited", "have been waiting", "waiting"], correctAnswer: 2, explanation: "Since morning needs present perfect continuous." },
        { topic: "Preposition", difficulty: "easy", question: "Fill in the blank: The keys are ___ the table.", options: ["on", "by", "to", "from"], correctAnswer: 0, explanation: "On is used for a surface." },
        { topic: "Error Spotting", difficulty: "medium", question: "Identify the error in the sentence: He do not like tea.", options: ["He", "do not", "like tea", "No error"], correctAnswer: 1, explanation: "With he, the correct form is does not." },
        { topic: "Idiom", difficulty: "medium", question: "What does the idiom \"once in a blue moon\" mean?", options: ["very rarely", "every day", "very quickly", "very loudly"], correctAnswer: 0, explanation: "The idiom means very rarely." },
        { topic: "Spelling", difficulty: "easy", question: "Choose the correctly spelt word.", options: ["Definately", "Definitely", "Definetly", "Definatly"], correctAnswer: 1, explanation: "Definitely is the correct spelling." },
        { topic: "Voice", difficulty: "hard", question: "Choose the active voice form of \"The letter was written by Ram.\"", options: ["Ram wrote the letter.", "Ram writes the letter.", "Ram has written letter.", "The letter wrote Ram."], correctAnswer: 0, explanation: "Simple past passive changes to simple past active." }
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
        subject: "English",
        title: "English Mixed Practice Set 1",
        description: "50 mixed English grammar and vocabulary questions.",
        durationMinutes: 30,
        totalQuestions: 50,
        marksPerQuestion: 1,
        negativeMarks: 0.25,
        difficulty: "Mixed",
        tags: ["SSC", "Railway", "Police"],
        questions: buildQuestions()
    });
}());


