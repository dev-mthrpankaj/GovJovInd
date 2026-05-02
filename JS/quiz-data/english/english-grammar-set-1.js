(function () {
    "use strict";

    window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];

    const quizId = "english-grammar-set-1";
    const seeds = [
        { topic: "Grammar", difficulty: "easy", question: "In {label}, choose the correct sentence.", options: ["He go to school.", "He goes to school.", "He going school.", "He gone school."], correctAnswer: 1, explanation: "Singular subject he takes the verb goes." },
        { topic: "Article", difficulty: "medium", question: "In {label}, fill in the blank: She is ___ honest officer.", options: ["a", "an", "the", "no article"], correctAnswer: 1, explanation: "Honest begins with a vowel sound, so an is used." },
        { topic: "Error Spotting", difficulty: "medium", question: "In {label}, find the error: Each of the players have a kit.", options: ["Each of", "the players", "have a kit", "No error"], correctAnswer: 2, explanation: "Each takes a singular verb: has." },
        { topic: "Tense", difficulty: "medium", question: "In {label}, choose the correct verb: I ___ him yesterday.", options: ["meet", "met", "meeting", "meets"], correctAnswer: 1, explanation: "Yesterday indicates past tense, so met is correct." },
        { topic: "Voice", difficulty: "hard", question: "In {label}, passive voice of \"They completed the work\" is", options: ["The work completed them.", "The work was completed by them.", "They were completed by work.", "The work is completing."], correctAnswer: 1, explanation: "Simple past passive uses was/were + past participle." },
        { topic: "Preposition", difficulty: "easy", question: "In {label}, fill in the blank: He is good ___ mathematics.", options: ["in", "at", "on", "by"], correctAnswer: 1, explanation: "Good at is the correct phrase." },
        { topic: "Subject Verb Agreement", difficulty: "medium", question: "In {label}, choose the correct option: The team ___ ready.", options: ["are", "is", "were", "be"], correctAnswer: 1, explanation: "Team is treated as a singular collective noun here." },
        { topic: "Pronoun", difficulty: "easy", question: "In {label}, choose the correct pronoun: This book is ___.", options: ["me", "mine", "my", "I"], correctAnswer: 1, explanation: "Mine is the possessive pronoun." },
        { topic: "Conjunction", difficulty: "easy", question: "In {label}, choose the correct conjunction: Work hard ___ you will succeed.", options: ["but", "or", "and", "because"], correctAnswer: 2, explanation: "And connects the two related clauses." },
        { topic: "Sentence Correction", difficulty: "medium", question: "In {label}, choose the correct phrase: I am looking forward ___ you.", options: ["to meet", "to meeting", "for meet", "meet"], correctAnswer: 1, explanation: "Looking forward to is followed by a gerund." }
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
        title: "English Grammar Practice Set 1",
        description: "50 grammar questions for SSC, Railway and Police exams.",
        durationMinutes: 30,
        totalQuestions: 50,
        marksPerQuestion: 1,
        negativeMarks: 0.25,
        difficulty: "Mixed",
        tags: ["SSC", "Railway", "Police"],
        questions: buildQuestions()
    });
}());


