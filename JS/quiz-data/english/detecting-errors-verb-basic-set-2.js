(function () {
    "use strict";

    window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];

    const quizId = "detecting-errors-verb-basic-set-2";

    const questions = [
            {
                    "id": "detecting-errors-verb-basic-set-2-q01",
                    "topic": "Verb - Suggest",
                    "difficulty": "hard",
                    "question": "He suggested me to apply for the post in Practice Case 53",
                    "options": [
                            "He suggested me",
                            "to apply",
                            "for the post in Practice Case 53",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "‘Suggest’ is not used as ‘suggested me to’. Correct: ‘suggested that I should apply’."
            },
            {
                    "id": "detecting-errors-verb-basic-set-2-q02",
                    "topic": "Verb - Gerund",
                    "difficulty": "hard",
                    "question": "She avoided to answer the question in Practice Case 54",
                    "options": [
                            "She avoided",
                            "to answer",
                            "the question in Practice Case 54",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Avoid’ is followed by gerund. Correct: ‘avoided answering’."
            },
            {
                    "id": "detecting-errors-verb-basic-set-2-q03",
                    "topic": "Verb - No Error",
                    "difficulty": "hard",
                    "question": "They decided to postpone the meeting in Practice Case 55",
                    "options": [
                            "They decided",
                            "to postpone",
                            "the meeting in Practice Case 55",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Decide’ takes ‘to + V1’."
            },
            {
                    "id": "detecting-errors-verb-basic-set-2-q04",
                    "topic": "Verb - Deny",
                    "difficulty": "hard",
                    "question": "He denied to have taken the file in Practice Case 56",
                    "options": [
                            "He denied",
                            "to have taken",
                            "the file in Practice Case 56",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Deny’ takes a gerund or noun clause. Correct: ‘denied having taken’."
            },
            {
                    "id": "detecting-errors-verb-basic-set-2-q05",
                    "topic": "Verb - Modal",
                    "difficulty": "hard",
                    "question": "He can solves difficult questions in Practice Case 57",
                    "options": [
                            "He can",
                            "solves difficult",
                            "questions in Practice Case 57",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "A modal auxiliary is followed by base verb. Correct: ‘can solve’."
            },
            {
                    "id": "detecting-errors-verb-basic-set-2-q06",
                    "topic": "Verb - Causative",
                    "difficulty": "hard",
                    "question": "Shreya made me to wait outside the office in Practice Case 58",
                    "options": [
                            "Shreya made",
                            "me to wait",
                            "outside the office in Practice Case 58",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Causative ‘make’ takes object + bare infinitive. Correct: ‘made me wait’."
            },
            {
                    "id": "detecting-errors-verb-basic-set-2-q07",
                    "topic": "Verb - No Error",
                    "difficulty": "hard",
                    "question": "The teacher let the students go after the test in Practice Case 59",
                    "options": [
                            "The teacher let",
                            "the students go",
                            "after the test in Practice Case 59",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Let’ takes object + base verb."
            },
            {
                    "id": "detecting-errors-verb-basic-set-2-q08",
                    "topic": "Verb - Suggest",
                    "difficulty": "hard",
                    "question": "He suggested me to apply for the post in Practice Case 61",
                    "options": [
                            "He suggested me",
                            "to apply",
                            "for the post in Practice Case 61",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "‘Suggest’ is not used as ‘suggested me to’. Correct: ‘suggested that I should apply’."
            },
            {
                    "id": "detecting-errors-verb-basic-set-2-q09",
                    "topic": "Verb - Gerund",
                    "difficulty": "hard",
                    "question": "She avoided to answer the question in Practice Case 62",
                    "options": [
                            "She avoided",
                            "to answer",
                            "the question in Practice Case 62",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Avoid’ is followed by gerund. Correct: ‘avoided answering’."
            },
            {
                    "id": "detecting-errors-verb-basic-set-2-q10",
                    "topic": "Verb - No Error",
                    "difficulty": "hard",
                    "question": "They decided to postpone the meeting in Practice Case 63",
                    "options": [
                            "They decided",
                            "to postpone",
                            "the meeting in Practice Case 63",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Decide’ takes ‘to + V1’."
            },
            {
                    "id": "detecting-errors-verb-basic-set-2-q11",
                    "topic": "Verb - Deny",
                    "difficulty": "hard",
                    "question": "He denied to have taken the file in Practice Case 64",
                    "options": [
                            "He denied",
                            "to have taken",
                            "the file in Practice Case 64",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Deny’ takes a gerund or noun clause. Correct: ‘denied having taken’."
            },
            {
                    "id": "detecting-errors-verb-basic-set-2-q12",
                    "topic": "Verb - Modal",
                    "difficulty": "hard",
                    "question": "He can solves difficult questions in Practice Case 65",
                    "options": [
                            "He can",
                            "solves difficult",
                            "questions in Practice Case 65",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "A modal auxiliary is followed by base verb. Correct: ‘can solve’."
            },
            {
                    "id": "detecting-errors-verb-basic-set-2-q13",
                    "topic": "Verb - Causative",
                    "difficulty": "hard",
                    "question": "Neha made me to wait outside the office in Practice Case 66",
                    "options": [
                            "Neha made",
                            "me to wait",
                            "outside the office in Practice Case 66",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Causative ‘make’ takes object + bare infinitive. Correct: ‘made me wait’."
            },
            {
                    "id": "detecting-errors-verb-basic-set-2-q14",
                    "topic": "Verb - No Error",
                    "difficulty": "hard",
                    "question": "The teacher let the students go after the test in Practice Case 67",
                    "options": [
                            "The teacher let",
                            "the students go",
                            "after the test in Practice Case 67",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Let’ takes object + base verb."
            },
            {
                    "id": "detecting-errors-verb-basic-set-2-q15",
                    "topic": "Verb - Suggest",
                    "difficulty": "hard",
                    "question": "He suggested me to apply for the post in Practice Case 69",
                    "options": [
                            "He suggested me",
                            "to apply",
                            "for the post in Practice Case 69",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "‘Suggest’ is not used as ‘suggested me to’. Correct: ‘suggested that I should apply’."
            },
            {
                    "id": "detecting-errors-verb-basic-set-2-q16",
                    "topic": "Verb - Gerund",
                    "difficulty": "hard",
                    "question": "She avoided to answer the question in Practice Case 70",
                    "options": [
                            "She avoided",
                            "to answer",
                            "the question in Practice Case 70",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Avoid’ is followed by gerund. Correct: ‘avoided answering’."
            },
            {
                    "id": "detecting-errors-verb-basic-set-2-q17",
                    "topic": "Verb - No Error",
                    "difficulty": "hard",
                    "question": "They decided to postpone the meeting in Practice Case 71",
                    "options": [
                            "They decided",
                            "to postpone",
                            "the meeting in Practice Case 71",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Decide’ takes ‘to + V1’."
            },
            {
                    "id": "detecting-errors-verb-basic-set-2-q18",
                    "topic": "Verb - Deny",
                    "difficulty": "hard",
                    "question": "He denied to have taken the file in Practice Case 72",
                    "options": [
                            "He denied",
                            "to have taken",
                            "the file in Practice Case 72",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Deny’ takes a gerund or noun clause. Correct: ‘denied having taken’."
            },
            {
                    "id": "detecting-errors-verb-basic-set-2-q19",
                    "topic": "Verb - Modal",
                    "difficulty": "hard",
                    "question": "He can solves difficult questions in Practice Case 73",
                    "options": [
                            "He can",
                            "solves difficult",
                            "questions in Practice Case 73",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "A modal auxiliary is followed by base verb. Correct: ‘can solve’."
            },
            {
                    "id": "detecting-errors-verb-basic-set-2-q20",
                    "topic": "Verb - Causative",
                    "difficulty": "hard",
                    "question": "Kavita made me to wait outside the office in Practice Case 74",
                    "options": [
                            "Kavita made",
                            "me to wait",
                            "outside the office in Practice Case 74",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Causative ‘make’ takes object + bare infinitive. Correct: ‘made me wait’."
            },
            {
                    "id": "detecting-errors-verb-basic-set-2-q21",
                    "topic": "Verb - No Error",
                    "difficulty": "hard",
                    "question": "The teacher let the students go after the test in Practice Case 75",
                    "options": [
                            "The teacher let",
                            "the students go",
                            "after the test in Practice Case 75",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Let’ takes object + base verb."
            },
            {
                    "id": "detecting-errors-verb-basic-set-2-q22",
                    "topic": "Verb - Suggest",
                    "difficulty": "hard",
                    "question": "He suggested me to apply for the post in Practice Case 77",
                    "options": [
                            "He suggested me",
                            "to apply",
                            "for the post in Practice Case 77",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "‘Suggest’ is not used as ‘suggested me to’. Correct: ‘suggested that I should apply’."
            },
            {
                    "id": "detecting-errors-verb-basic-set-2-q23",
                    "topic": "Verb - Gerund",
                    "difficulty": "hard",
                    "question": "She avoided to answer the question in Practice Case 78",
                    "options": [
                            "She avoided",
                            "to answer",
                            "the question in Practice Case 78",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Avoid’ is followed by gerund. Correct: ‘avoided answering’."
            },
            {
                    "id": "detecting-errors-verb-basic-set-2-q24",
                    "topic": "Verb - No Error",
                    "difficulty": "hard",
                    "question": "They decided to postpone the meeting in Practice Case 79",
                    "options": [
                            "They decided",
                            "to postpone",
                            "the meeting in Practice Case 79",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Decide’ takes ‘to + V1’."
            },
            {
                    "id": "detecting-errors-verb-basic-set-2-q25",
                    "topic": "Verb - Deny",
                    "difficulty": "hard",
                    "question": "He denied to have taken the file in Practice Case 80",
                    "options": [
                            "He denied",
                            "to have taken",
                            "the file in Practice Case 80",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Deny’ takes a gerund or noun clause. Correct: ‘denied having taken’."
            },
            {
                    "id": "detecting-errors-verb-basic-set-2-q26",
                    "topic": "Verb - Modal",
                    "difficulty": "hard",
                    "question": "He can solves difficult questions in Practice Case 81",
                    "options": [
                            "He can",
                            "solves difficult",
                            "questions in Practice Case 81",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "A modal auxiliary is followed by base verb. Correct: ‘can solve’."
            },
            {
                    "id": "detecting-errors-verb-basic-set-2-q27",
                    "topic": "Verb - Causative",
                    "difficulty": "hard",
                    "question": "Riya made me to wait outside the office in Practice Case 82",
                    "options": [
                            "Riya made",
                            "me to wait",
                            "outside the office in Practice Case 82",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Causative ‘make’ takes object + bare infinitive. Correct: ‘made me wait’."
            },
            {
                    "id": "detecting-errors-verb-basic-set-2-q28",
                    "topic": "Verb - No Error",
                    "difficulty": "hard",
                    "question": "The teacher let the students go after the test in Practice Case 83",
                    "options": [
                            "The teacher let",
                            "the students go",
                            "after the test in Practice Case 83",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Let’ takes object + base verb."
            },
            {
                    "id": "detecting-errors-verb-basic-set-2-q29",
                    "topic": "Verb - Suggest",
                    "difficulty": "hard",
                    "question": "He suggested me to apply for the post in Practice Case 85",
                    "options": [
                            "He suggested me",
                            "to apply",
                            "for the post in Practice Case 85",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "‘Suggest’ is not used as ‘suggested me to’. Correct: ‘suggested that I should apply’."
            },
            {
                    "id": "detecting-errors-verb-basic-set-2-q30",
                    "topic": "Verb - Gerund",
                    "difficulty": "hard",
                    "question": "She avoided to answer the question in Practice Case 86",
                    "options": [
                            "She avoided",
                            "to answer",
                            "the question in Practice Case 86",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Avoid’ is followed by gerund. Correct: ‘avoided answering’."
            },
            {
                    "id": "detecting-errors-verb-basic-set-2-q31",
                    "topic": "Verb - No Error",
                    "difficulty": "hard",
                    "question": "They decided to postpone the meeting in Practice Case 87",
                    "options": [
                            "They decided",
                            "to postpone",
                            "the meeting in Practice Case 87",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Decide’ takes ‘to + V1’."
            },
            {
                    "id": "detecting-errors-verb-basic-set-2-q32",
                    "topic": "Verb - Deny",
                    "difficulty": "hard",
                    "question": "He denied to have taken the file in Practice Case 88",
                    "options": [
                            "He denied",
                            "to have taken",
                            "the file in Practice Case 88",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Deny’ takes a gerund or noun clause. Correct: ‘denied having taken’."
            },
            {
                    "id": "detecting-errors-verb-basic-set-2-q33",
                    "topic": "Verb - Modal",
                    "difficulty": "hard",
                    "question": "He can solves difficult questions in Practice Case 89",
                    "options": [
                            "He can",
                            "solves difficult",
                            "questions in Practice Case 89",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "A modal auxiliary is followed by base verb. Correct: ‘can solve’."
            },
            {
                    "id": "detecting-errors-verb-basic-set-2-q34",
                    "topic": "Verb - Causative",
                    "difficulty": "hard",
                    "question": "Divya made me to wait outside the office in Practice Case 90",
                    "options": [
                            "Divya made",
                            "me to wait",
                            "outside the office in Practice Case 90",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Causative ‘make’ takes object + bare infinitive. Correct: ‘made me wait’."
            },
            {
                    "id": "detecting-errors-verb-basic-set-2-q35",
                    "topic": "Verb - No Error",
                    "difficulty": "hard",
                    "question": "The teacher let the students go after the test in Practice Case 91",
                    "options": [
                            "The teacher let",
                            "the students go",
                            "after the test in Practice Case 91",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Let’ takes object + base verb."
            },
            {
                    "id": "detecting-errors-verb-basic-set-2-q36",
                    "topic": "Verb - Suggest",
                    "difficulty": "hard",
                    "question": "He suggested me to apply for the post in Practice Case 93",
                    "options": [
                            "He suggested me",
                            "to apply",
                            "for the post in Practice Case 93",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "‘Suggest’ is not used as ‘suggested me to’. Correct: ‘suggested that I should apply’."
            },
            {
                    "id": "detecting-errors-verb-basic-set-2-q37",
                    "topic": "Verb - Gerund",
                    "difficulty": "hard",
                    "question": "She avoided to answer the question in Practice Case 94",
                    "options": [
                            "She avoided",
                            "to answer",
                            "the question in Practice Case 94",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Avoid’ is followed by gerund. Correct: ‘avoided answering’."
            },
            {
                    "id": "detecting-errors-verb-basic-set-2-q38",
                    "topic": "Verb - No Error",
                    "difficulty": "hard",
                    "question": "They decided to postpone the meeting in Practice Case 95",
                    "options": [
                            "They decided",
                            "to postpone",
                            "the meeting in Practice Case 95",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Decide’ takes ‘to + V1’."
            },
            {
                    "id": "detecting-errors-verb-basic-set-2-q39",
                    "topic": "Verb - Deny",
                    "difficulty": "hard",
                    "question": "He denied to have taken the file in Practice Case 96",
                    "options": [
                            "He denied",
                            "to have taken",
                            "the file in Practice Case 96",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Deny’ takes a gerund or noun clause. Correct: ‘denied having taken’."
            },
            {
                    "id": "detecting-errors-verb-basic-set-2-q40",
                    "topic": "Verb - Modal",
                    "difficulty": "hard",
                    "question": "He can solves difficult questions in Practice Case 97",
                    "options": [
                            "He can",
                            "solves difficult",
                            "questions in Practice Case 97",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "A modal auxiliary is followed by base verb. Correct: ‘can solve’."
            },
            {
                    "id": "detecting-errors-verb-basic-set-2-q41",
                    "topic": "Verb - Causative",
                    "difficulty": "hard",
                    "question": "Pooja made me to wait outside the office in Practice Case 98",
                    "options": [
                            "Pooja made",
                            "me to wait",
                            "outside the office in Practice Case 98",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Causative ‘make’ takes object + bare infinitive. Correct: ‘made me wait’."
            },
            {
                    "id": "detecting-errors-verb-basic-set-2-q42",
                    "topic": "Verb - No Error",
                    "difficulty": "hard",
                    "question": "The teacher let the students go after the test in Practice Case 99",
                    "options": [
                            "The teacher let",
                            "the students go",
                            "after the test in Practice Case 99",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Let’ takes object + base verb."
            },
            {
                    "id": "detecting-errors-verb-basic-set-2-q43",
                    "topic": "Verb - Suggest",
                    "difficulty": "hard",
                    "question": "He suggested me to apply for the post in Practice Case 101",
                    "options": [
                            "He suggested me",
                            "to apply",
                            "for the post in Practice Case 101",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "‘Suggest’ is not used as ‘suggested me to’. Correct: ‘suggested that I should apply’."
            },
            {
                    "id": "detecting-errors-verb-basic-set-2-q44",
                    "topic": "Verb - Gerund",
                    "difficulty": "hard",
                    "question": "She avoided to answer the question in Practice Case 102",
                    "options": [
                            "She avoided",
                            "to answer",
                            "the question in Practice Case 102",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Avoid’ is followed by gerund. Correct: ‘avoided answering’."
            },
            {
                    "id": "detecting-errors-verb-basic-set-2-q45",
                    "topic": "Verb - No Error",
                    "difficulty": "hard",
                    "question": "They decided to postpone the meeting in Practice Case 103",
                    "options": [
                            "They decided",
                            "to postpone",
                            "the meeting in Practice Case 103",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Decide’ takes ‘to + V1’."
            },
            {
                    "id": "detecting-errors-verb-basic-set-2-q46",
                    "topic": "Verb - Deny",
                    "difficulty": "hard",
                    "question": "He denied to have taken the file in Practice Case 104",
                    "options": [
                            "He denied",
                            "to have taken",
                            "the file in Practice Case 104",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Deny’ takes a gerund or noun clause. Correct: ‘denied having taken’."
            },
            {
                    "id": "detecting-errors-verb-basic-set-2-q47",
                    "topic": "Verb - Modal",
                    "difficulty": "hard",
                    "question": "He can solves difficult questions in Practice Case 105",
                    "options": [
                            "He can",
                            "solves difficult",
                            "questions in Practice Case 105",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "A modal auxiliary is followed by base verb. Correct: ‘can solve’."
            },
            {
                    "id": "detecting-errors-verb-basic-set-2-q48",
                    "topic": "Verb - Causative",
                    "difficulty": "hard",
                    "question": "Meera made me to wait outside the office in Practice Case 106",
                    "options": [
                            "Meera made",
                            "me to wait",
                            "outside the office in Practice Case 106",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Causative ‘make’ takes object + bare infinitive. Correct: ‘made me wait’."
            },
            {
                    "id": "detecting-errors-verb-basic-set-2-q49",
                    "topic": "Verb - No Error",
                    "difficulty": "hard",
                    "question": "The teacher let the students go after the test in Practice Case 107",
                    "options": [
                            "The teacher let",
                            "the students go",
                            "after the test in Practice Case 107",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Let’ takes object + base verb."
            },
            {
                    "id": "detecting-errors-verb-basic-set-2-q50",
                    "topic": "Verb - Suggest",
                    "difficulty": "hard",
                    "question": "He suggested me to apply for the post in Practice Case 109",
                    "options": [
                            "He suggested me",
                            "to apply",
                            "for the post in Practice Case 109",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "‘Suggest’ is not used as ‘suggested me to’. Correct: ‘suggested that I should apply’."
            }
    ];

    window.GJU_QUIZ_BANK.push({
        id: quizId,
        subject: "English",
        title: "Detecting Errors - Verb Basic Set 2",
        description: "50 advanced basic verb detecting error questions for SSC-level practice.",
        durationMinutes: 30,
        totalQuestions: questions.length,
        marksPerQuestion: 1,
        negativeMarks: 0.25,
        difficulty: "Hard",
        tags: ["SSC", "Railway", "Police", "English", "Detecting Errors"],
        questions
    });
}());
