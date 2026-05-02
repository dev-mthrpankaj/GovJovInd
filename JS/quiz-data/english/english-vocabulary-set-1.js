(function () {
    "use strict";

    window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];

    const quizId = "english-vocabulary-set-1";
    const seeds = [
        { topic: "Synonym", difficulty: "easy", question: "In {label}, synonym of rapid is", options: ["slow", "quick", "late", "weak"], correctAnswer: 1, explanation: "Rapid means quick or fast." },
        { topic: "Antonym", difficulty: "easy", question: "In {label}, antonym of expand is", options: ["increase", "stretch", "contract", "spread"], correctAnswer: 2, explanation: "Contract is the opposite of expand." },
        { topic: "Spelling", difficulty: "easy", question: "In {label}, choose the correctly spelt word.", options: ["Accomodate", "Acommodate", "Accommodate", "Acomodate"], correctAnswer: 2, explanation: "Accommodate has double c and double m." },
        { topic: "Idiom", difficulty: "medium", question: "In {label}, \"at the eleventh hour\" means", options: ["very early", "at the last moment", "at 11 AM", "after lunch"], correctAnswer: 1, explanation: "The idiom means at the last possible moment." },
        { topic: "One Word", difficulty: "medium", question: "In {label}, a person who writes poems is a", options: ["novelist", "poet", "editor", "critic"], correctAnswer: 1, explanation: "A poet writes poems." },
        { topic: "Vocabulary", difficulty: "easy", question: "In {label}, choose the word nearest to brave.", options: ["timid", "courageous", "lazy", "silent"], correctAnswer: 1, explanation: "Brave means courageous." },
        { topic: "Antonym", difficulty: "medium", question: "In {label}, antonym of ancient is", options: ["old", "modern", "historic", "early"], correctAnswer: 1, explanation: "Modern is opposite to ancient." },
        { topic: "Usage", difficulty: "medium", question: "In {label}, choose the correct word: Please ___ your ticket.", options: ["show", "sow", "sew", "saw"], correctAnswer: 0, explanation: "Show means display or present." },
        { topic: "Phrase", difficulty: "medium", question: "In {label}, \"break the ice\" means", options: ["start a conversation", "break glass", "feel cold", "stop work"], correctAnswer: 0, explanation: "The phrase means to start friendly interaction." },
        { topic: "Spelling", difficulty: "easy", question: "In {label}, choose the correct spelling.", options: ["Necessary", "Necesary", "Neccessary", "Necessery"], correctAnswer: 0, explanation: "Necessary is the correct spelling." }
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


