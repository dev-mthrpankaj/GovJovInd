(function () {
    "use strict";

    window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];

    const quizId = "reasoning-set-1";
    const seeds = [
        { topic: "Analogy", difficulty: "easy", question: "In {label}, Book is to reading as food is to", options: ["cooking", "eating", "buying", "serving"], correctAnswer: 1, explanation: "Food is eaten just as a book is read." },
        { topic: "Series", difficulty: "medium", question: "In {label}, find the next number: 3, 6, 12, 24, ?", options: ["30", "36", "48", "60"], correctAnswer: 2, explanation: "Each term is doubled." },
        { topic: "Coding-Decoding", difficulty: "hard", question: "In {label}, if CAT is coded as 3120, then BAT is coded as", options: ["2120", "220", "221", "1202"], correctAnswer: 0, explanation: "B=2, A=1, T=20." },
        { topic: "Direction", difficulty: "medium", question: "In {label}, a man faces north, turns right, then turns right again. He faces", options: ["north", "south", "east", "west"], correctAnswer: 1, explanation: "Two right turns from north lead to south." },
        { topic: "Blood Relation", difficulty: "easy", question: "In {label}, my mother\u0027s brother is my", options: ["father", "uncle", "cousin", "nephew"], correctAnswer: 1, explanation: "Mother\u0027s brother is uncle." },
        { topic: "Odd One Out", difficulty: "easy", question: "In {label}, find the odd one.", options: ["Circle", "Square", "Triangle", "Bus"], correctAnswer: 3, explanation: "Bus is not a geometric figure." },
        { topic: "Syllogism", difficulty: "hard", question: "In {label}, all pens are tools. Some tools are blue. Conclusion: Some pens are blue.", options: ["definitely true", "definitely false", "cannot be determined", "none"], correctAnswer: 2, explanation: "The statements do not prove any pen is blue." },
        { topic: "Ranking", difficulty: "medium", question: "In {label}, in a row of 25 students, A is 9th from left. Position from right is", options: ["15th", "16th", "17th", "18th"], correctAnswer: 2, explanation: "Right position = 25 - 9 + 1 = 17." },
        { topic: "Calendar", difficulty: "easy", question: "In {label}, a leap year has how many days?", options: ["364", "365", "366", "367"], correctAnswer: 2, explanation: "A leap year has 366 days." },
        { topic: "Clock", difficulty: "medium", question: "In {label}, angle between hands at 3:00 is", options: ["30 degrees", "60 degrees", "90 degrees", "120 degrees"], correctAnswer: 2, explanation: "At 3:00 the hands are perpendicular." }
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


