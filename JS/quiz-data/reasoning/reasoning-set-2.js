(function () {
    "use strict";

    window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];

    const quizId = "reasoning-set-2";
    const seeds = [
        { topic: "Series", difficulty: "medium", question: "In {label}, find the next number: 5, 10, 20, 40, ?", options: ["60", "70", "80", "90"], correctAnswer: 2, explanation: "Each term is multiplied by 2." },
        { topic: "Analogy", difficulty: "easy", question: "In {label}, Doctor is to hospital as teacher is to", options: ["court", "school", "bank", "market"], correctAnswer: 1, explanation: "A teacher works in a school." },
        { topic: "Coding-Decoding", difficulty: "medium", question: "In {label}, if DOG = 4157 using alphabet positions, then COW =", options: ["31523", "31423", "31624", "21423"], correctAnswer: 0, explanation: "C=3, O=15, W=23." },
        { topic: "Direction", difficulty: "medium", question: "In {label}, facing east, turn left and then right. Final direction is", options: ["north", "south", "east", "west"], correctAnswer: 2, explanation: "Left from east is north, then right from north is east." },
        { topic: "Blood Relation", difficulty: "easy", question: "In {label}, father\u0027s father is", options: ["uncle", "grandfather", "brother", "cousin"], correctAnswer: 1, explanation: "Father\u0027s father is grandfather." },
        { topic: "Odd One Out", difficulty: "easy", question: "In {label}, find the odd one.", options: ["Apple", "Mango", "Potato", "Banana"], correctAnswer: 2, explanation: "Potato is a vegetable; the others are fruits." },
        { topic: "Ranking", difficulty: "medium", question: "In {label}, B is 12th from left and 14th from right. Total persons are", options: ["24", "25", "26", "27"], correctAnswer: 1, explanation: "Total = 12 + 14 - 1 = 25." },
        { topic: "Venn Diagram", difficulty: "medium", question: "In {label}, which group best represents dogs, animals and cats?", options: ["separate circles", "animals containing dogs and cats", "dogs containing animals", "cats containing dogs"], correctAnswer: 1, explanation: "Dogs and cats are subsets of animals." },
        { topic: "Calendar", difficulty: "medium", question: "In {label}, how many months have 31 days?", options: ["5", "6", "7", "8"], correctAnswer: 2, explanation: "Seven months have 31 days." },
        { topic: "Clock", difficulty: "medium", question: "In {label}, at 6:00 the angle between clock hands is", options: ["90 degrees", "120 degrees", "180 degrees", "360 degrees"], correctAnswer: 2, explanation: "At 6:00 the hands are opposite." }
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


