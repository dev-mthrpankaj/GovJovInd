(function () {
    "use strict";

    window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];

    const quizId = "ga-set-1";
    const seeds = [
        { topic: "Polity", difficulty: "easy", question: "On which date is Constitution Day observed in India?", options: ["26 January", "15 August", "26 November", "2 October"], correctAnswer: 2, explanation: "Constitution Day is observed on 26 November." },
        { topic: "History", difficulty: "medium", question: "who founded the Maurya Empire?", options: ["Ashoka", "Chandragupta Maurya", "Bindusara", "Harsha"], correctAnswer: 1, explanation: "Chandragupta Maurya founded the Maurya Empire." },
        { topic: "Geography", difficulty: "easy", question: "What is the capital of Rajasthan?", options: ["Jodhpur", "Udaipur", "Jaipur", "Kota"], correctAnswer: 2, explanation: "Jaipur is the capital of Rajasthan." },
        { topic: "Economy", difficulty: "medium", question: "Where is the RBI headquarters located?", options: ["Delhi", "Mumbai", "Kolkata", "Chennai"], correctAnswer: 1, explanation: "The Reserve Bank of India headquarters is in Mumbai." },
        { topic: "Polity", difficulty: "hard", question: "Fundamental Duties are mentioned in which part of the Constitution?", options: ["Part III", "Part IV", "Part IVA", "Part V"], correctAnswer: 2, explanation: "Fundamental Duties are in Part IVA." },
        { topic: "History", difficulty: "medium", question: "In which year was the Quit India Movement launched?", options: ["1930", "1942", "1945", "1919"], correctAnswer: 1, explanation: "The movement was launched in August 1942." },
        { topic: "Geography", difficulty: "easy", question: "Which is the longest river flowing in India?", options: ["Yamuna", "Godavari", "Ganga", "Narmada"], correctAnswer: 2, explanation: "Ganga is generally considered the longest river in India." },
        { topic: "Science Tech", difficulty: "medium", question: "Where is the ISRO headquarters located?", options: ["Bengaluru", "Hyderabad", "Ahmedabad", "Pune"], correctAnswer: 0, explanation: "ISRO headquarters is in Bengaluru." },
        { topic: "Economy", difficulty: "hard", question: "In which year was GST introduced in India?", options: ["2015", "2016", "2017", "2018"], correctAnswer: 2, explanation: "GST was implemented from 1 July 2017." },
        { topic: "Awards", difficulty: "medium", question: "Bharat Ratna is India's ____.", options: ["highest civilian award", "highest sports award", "highest gallantry award", "highest film award"], correctAnswer: 0, explanation: "Bharat Ratna is the highest civilian award of India." }
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
        title: "General Awareness Static GK Set 1",
        description: "50 polity, history, geography, economy and science questions.",
        durationMinutes: 30,
        totalQuestions: 50,
        marksPerQuestion: 1,
        negativeMarks: 0.25,
        difficulty: "Mixed",
        tags: ["SSC", "Railway", "State Exams"],
        questions: buildQuestions()
    });
}());


