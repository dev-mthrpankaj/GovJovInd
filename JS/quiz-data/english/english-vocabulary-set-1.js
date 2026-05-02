(function () {
    "use strict";

    window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];

    const quizId = "english-vocabulary-set-1";
    const seeds = [
        { topic: "Synonym", difficulty: "easy", question: "Choose the synonym of \"rapid\".", options: ["slow", "quick", "late", "weak"], correctAnswer: 1, explanation: "Rapid means quick or fast." },
        { topic: "Antonym", difficulty: "easy", question: "Choose the antonym of \"expand\".", options: ["increase", "stretch", "contract", "spread"], correctAnswer: 2, explanation: "Contract is the opposite of expand." },
        { topic: "Spelling", difficulty: "easy", question: "Choose the correctly spelt word.", options: ["Accomodate", "Acommodate", "Accommodate", "Acomodate"], correctAnswer: 2, explanation: "Accommodate has double c and double m." },
        { topic: "Idiom", difficulty: "medium", question: "What does the idiom \"at the eleventh hour\" mean?", options: ["very early", "at the last moment", "at 11 AM", "after lunch"], correctAnswer: 1, explanation: "The idiom means at the last possible moment." },
        { topic: "One Word", difficulty: "medium", question: "A person who writes poems is called a ____.", options: ["novelist", "poet", "editor", "critic"], correctAnswer: 1, explanation: "A poet writes poems." },
        { topic: "Vocabulary", difficulty: "easy", question: "Choose the word nearest in meaning to \"brave\".", options: ["timid", "courageous", "lazy", "silent"], correctAnswer: 1, explanation: "Brave means courageous." },
        { topic: "Antonym", difficulty: "medium", question: "Choose the antonym of \"ancient\".", options: ["old", "modern", "historic", "early"], correctAnswer: 1, explanation: "Modern is opposite to ancient." },
        { topic: "Usage", difficulty: "medium", question: "Choose the correct word: Please ___ your ticket.", options: ["show", "sow", "sew", "saw"], correctAnswer: 0, explanation: "Show means display or present." },
        { topic: "Phrase", difficulty: "medium", question: "What does the phrase \"break the ice\" mean?", options: ["start a conversation", "break glass", "feel cold", "stop work"], correctAnswer: 0, explanation: "The phrase means to start friendly interaction." },
        { topic: "Spelling", difficulty: "easy", question: "Choose the correct spelling.", options: ["Necessary", "Necesary", "Neccessary", "Necessery"], correctAnswer: 0, explanation: "Necessary is the correct spelling." }
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
        title: "English Vocabulary Practice Set 1",
        description: "50 vocabulary, antonym, synonym, spelling and usage questions.",
        durationMinutes: 30,
        totalQuestions: 50,
        marksPerQuestion: 1,
        negativeMarks: 0.25,
        difficulty: "Moderate",
        tags: ["SSC", "Railway", "Banking"],
        questions: buildQuestions()
    });
}());


