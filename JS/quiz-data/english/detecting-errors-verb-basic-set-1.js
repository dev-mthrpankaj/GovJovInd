(function () {
    "use strict";

    window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];

    const quizId = "detecting-errors-verb-basic-set-1";

    const questions = [
            {
                    "id": "detecting-errors-verb-basic-set-1-q01",
                    "topic": "Verb - Modal",
                    "difficulty": "hard",
                    "question": "He can solves difficult questions in Practice Case 1",
                    "options": [
                            "He can",
                            "solves difficult",
                            "questions in Practice Case 1",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "A modal auxiliary is followed by base verb. Correct: ‘can solve’."
            },
            {
                    "id": "detecting-errors-verb-basic-set-1-q02",
                    "topic": "Verb - Causative",
                    "difficulty": "hard",
                    "question": "Ritika made me to wait outside the office in Practice Case 2",
                    "options": [
                            "Ritika made",
                            "me to wait",
                            "outside the office in Practice Case 2",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Causative ‘make’ takes object + bare infinitive. Correct: ‘made me wait’."
            },
            {
                    "id": "detecting-errors-verb-basic-set-1-q03",
                    "topic": "Verb - No Error",
                    "difficulty": "hard",
                    "question": "The teacher let the students go after the test in Practice Case 3",
                    "options": [
                            "The teacher let",
                            "the students go",
                            "after the test in Practice Case 3",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Let’ takes object + base verb."
            },
            {
                    "id": "detecting-errors-verb-basic-set-1-q04",
                    "topic": "Verb - Gerund",
                    "difficulty": "hard",
                    "question": "I look forward to meet you after UP Police",
                    "options": [
                            "I look forward",
                            "to meet you",
                            "after UP Police",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "In ‘look forward to’, ‘to’ is a preposition and takes gerund. Correct: ‘to meeting you’."
            },
            {
                    "id": "detecting-errors-verb-basic-set-1-q05",
                    "topic": "Verb - Suggest",
                    "difficulty": "hard",
                    "question": "He suggested me to apply for the post in Practice Case 5",
                    "options": [
                            "He suggested me",
                            "to apply",
                            "for the post in Practice Case 5",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "‘Suggest’ is not used as ‘suggested me to’. Correct: ‘suggested that I should apply’."
            },
            {
                    "id": "detecting-errors-verb-basic-set-1-q06",
                    "topic": "Verb - Gerund",
                    "difficulty": "hard",
                    "question": "She avoided to answer the question in Practice Case 6",
                    "options": [
                            "She avoided",
                            "to answer",
                            "the question in Practice Case 6",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Avoid’ is followed by gerund. Correct: ‘avoided answering’."
            },
            {
                    "id": "detecting-errors-verb-basic-set-1-q07",
                    "topic": "Verb - No Error",
                    "difficulty": "hard",
                    "question": "They decided to postpone the meeting in Practice Case 7",
                    "options": [
                            "They decided",
                            "to postpone",
                            "the meeting in Practice Case 7",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Decide’ takes ‘to + V1’."
            },
            {
                    "id": "detecting-errors-verb-basic-set-1-q08",
                    "topic": "Verb - Deny",
                    "difficulty": "hard",
                    "question": "He denied to have taken the file in Practice Case 8",
                    "options": [
                            "He denied",
                            "to have taken",
                            "the file in Practice Case 8",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Deny’ takes a gerund or noun clause. Correct: ‘denied having taken’."
            },
            {
                    "id": "detecting-errors-verb-basic-set-1-q09",
                    "topic": "Verb - Modal",
                    "difficulty": "hard",
                    "question": "He can solves difficult questions in Practice Case 9",
                    "options": [
                            "He can",
                            "solves difficult",
                            "questions in Practice Case 9",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "A modal auxiliary is followed by base verb. Correct: ‘can solve’."
            },
            {
                    "id": "detecting-errors-verb-basic-set-1-q10",
                    "topic": "Verb - Causative",
                    "difficulty": "hard",
                    "question": "Anjali made me to wait outside the office in Practice Case 10",
                    "options": [
                            "Anjali made",
                            "me to wait",
                            "outside the office in Practice Case 10",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Causative ‘make’ takes object + bare infinitive. Correct: ‘made me wait’."
            },
            {
                    "id": "detecting-errors-verb-basic-set-1-q11",
                    "topic": "Verb - No Error",
                    "difficulty": "hard",
                    "question": "The teacher let the students go after the test in Practice Case 11",
                    "options": [
                            "The teacher let",
                            "the students go",
                            "after the test in Practice Case 11",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Let’ takes object + base verb."
            },
            {
                    "id": "detecting-errors-verb-basic-set-1-q12",
                    "topic": "Verb - Gerund",
                    "difficulty": "hard",
                    "question": "I look forward to meet you after SSC CPO",
                    "options": [
                            "I look forward",
                            "to meet you",
                            "after SSC CPO",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "In ‘look forward to’, ‘to’ is a preposition and takes gerund. Correct: ‘to meeting you’."
            },
            {
                    "id": "detecting-errors-verb-basic-set-1-q13",
                    "topic": "Verb - Suggest",
                    "difficulty": "hard",
                    "question": "He suggested me to apply for the post in Practice Case 13",
                    "options": [
                            "He suggested me",
                            "to apply",
                            "for the post in Practice Case 13",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "‘Suggest’ is not used as ‘suggested me to’. Correct: ‘suggested that I should apply’."
            },
            {
                    "id": "detecting-errors-verb-basic-set-1-q14",
                    "topic": "Verb - Gerund",
                    "difficulty": "hard",
                    "question": "She avoided to answer the question in Practice Case 14",
                    "options": [
                            "She avoided",
                            "to answer",
                            "the question in Practice Case 14",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Avoid’ is followed by gerund. Correct: ‘avoided answering’."
            },
            {
                    "id": "detecting-errors-verb-basic-set-1-q15",
                    "topic": "Verb - No Error",
                    "difficulty": "hard",
                    "question": "They decided to postpone the meeting in Practice Case 15",
                    "options": [
                            "They decided",
                            "to postpone",
                            "the meeting in Practice Case 15",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Decide’ takes ‘to + V1’."
            },
            {
                    "id": "detecting-errors-verb-basic-set-1-q16",
                    "topic": "Verb - Deny",
                    "difficulty": "hard",
                    "question": "He denied to have taken the file in Practice Case 16",
                    "options": [
                            "He denied",
                            "to have taken",
                            "the file in Practice Case 16",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Deny’ takes a gerund or noun clause. Correct: ‘denied having taken’."
            },
            {
                    "id": "detecting-errors-verb-basic-set-1-q17",
                    "topic": "Verb - Modal",
                    "difficulty": "hard",
                    "question": "He can solves difficult questions in Practice Case 17",
                    "options": [
                            "He can",
                            "solves difficult",
                            "questions in Practice Case 17",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "A modal auxiliary is followed by base verb. Correct: ‘can solve’."
            },
            {
                    "id": "detecting-errors-verb-basic-set-1-q18",
                    "topic": "Verb - Causative",
                    "difficulty": "hard",
                    "question": "Sunita made me to wait outside the office in Practice Case 18",
                    "options": [
                            "Sunita made",
                            "me to wait",
                            "outside the office in Practice Case 18",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Causative ‘make’ takes object + bare infinitive. Correct: ‘made me wait’."
            },
            {
                    "id": "detecting-errors-verb-basic-set-1-q19",
                    "topic": "Verb - No Error",
                    "difficulty": "hard",
                    "question": "The teacher let the students go after the test in Practice Case 19",
                    "options": [
                            "The teacher let",
                            "the students go",
                            "after the test in Practice Case 19",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Let’ takes object + base verb."
            },
            {
                    "id": "detecting-errors-verb-basic-set-1-q20",
                    "topic": "Verb - Gerund",
                    "difficulty": "hard",
                    "question": "I look forward to meet you after CDS",
                    "options": [
                            "I look forward",
                            "to meet you",
                            "after CDS",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "In ‘look forward to’, ‘to’ is a preposition and takes gerund. Correct: ‘to meeting you’."
            },
            {
                    "id": "detecting-errors-verb-basic-set-1-q21",
                    "topic": "Verb - Suggest",
                    "difficulty": "hard",
                    "question": "He suggested me to apply for the post in Practice Case 21",
                    "options": [
                            "He suggested me",
                            "to apply",
                            "for the post in Practice Case 21",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "‘Suggest’ is not used as ‘suggested me to’. Correct: ‘suggested that I should apply’."
            },
            {
                    "id": "detecting-errors-verb-basic-set-1-q22",
                    "topic": "Verb - Gerund",
                    "difficulty": "hard",
                    "question": "She avoided to answer the question in Practice Case 22",
                    "options": [
                            "She avoided",
                            "to answer",
                            "the question in Practice Case 22",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Avoid’ is followed by gerund. Correct: ‘avoided answering’."
            },
            {
                    "id": "detecting-errors-verb-basic-set-1-q23",
                    "topic": "Verb - No Error",
                    "difficulty": "hard",
                    "question": "They decided to postpone the meeting in Practice Case 23",
                    "options": [
                            "They decided",
                            "to postpone",
                            "the meeting in Practice Case 23",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Decide’ takes ‘to + V1’."
            },
            {
                    "id": "detecting-errors-verb-basic-set-1-q24",
                    "topic": "Verb - Deny",
                    "difficulty": "hard",
                    "question": "He denied to have taken the file in Practice Case 24",
                    "options": [
                            "He denied",
                            "to have taken",
                            "the file in Practice Case 24",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Deny’ takes a gerund or noun clause. Correct: ‘denied having taken’."
            },
            {
                    "id": "detecting-errors-verb-basic-set-1-q25",
                    "topic": "Verb - Modal",
                    "difficulty": "hard",
                    "question": "He can solves difficult questions in Practice Case 25",
                    "options": [
                            "He can",
                            "solves difficult",
                            "questions in Practice Case 25",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "A modal auxiliary is followed by base verb. Correct: ‘can solve’."
            },
            {
                    "id": "detecting-errors-verb-basic-set-1-q26",
                    "topic": "Verb - Causative",
                    "difficulty": "hard",
                    "question": "Nisha made me to wait outside the office in Practice Case 26",
                    "options": [
                            "Nisha made",
                            "me to wait",
                            "outside the office in Practice Case 26",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Causative ‘make’ takes object + bare infinitive. Correct: ‘made me wait’."
            },
            {
                    "id": "detecting-errors-verb-basic-set-1-q27",
                    "topic": "Verb - No Error",
                    "difficulty": "hard",
                    "question": "The teacher let the students go after the test in Practice Case 27",
                    "options": [
                            "The teacher let",
                            "the students go",
                            "after the test in Practice Case 27",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Let’ takes object + base verb."
            },
            {
                    "id": "detecting-errors-verb-basic-set-1-q28",
                    "topic": "Verb - Gerund",
                    "difficulty": "hard",
                    "question": "I look forward to meet you after UP Lekhpal",
                    "options": [
                            "I look forward",
                            "to meet you",
                            "after UP Lekhpal",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "In ‘look forward to’, ‘to’ is a preposition and takes gerund. Correct: ‘to meeting you’."
            },
            {
                    "id": "detecting-errors-verb-basic-set-1-q29",
                    "topic": "Verb - Suggest",
                    "difficulty": "hard",
                    "question": "He suggested me to apply for the post in Practice Case 29",
                    "options": [
                            "He suggested me",
                            "to apply",
                            "for the post in Practice Case 29",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "‘Suggest’ is not used as ‘suggested me to’. Correct: ‘suggested that I should apply’."
            },
            {
                    "id": "detecting-errors-verb-basic-set-1-q30",
                    "topic": "Verb - Gerund",
                    "difficulty": "hard",
                    "question": "She avoided to answer the question in Practice Case 30",
                    "options": [
                            "She avoided",
                            "to answer",
                            "the question in Practice Case 30",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Avoid’ is followed by gerund. Correct: ‘avoided answering’."
            },
            {
                    "id": "detecting-errors-verb-basic-set-1-q31",
                    "topic": "Verb - No Error",
                    "difficulty": "hard",
                    "question": "They decided to postpone the meeting in Practice Case 31",
                    "options": [
                            "They decided",
                            "to postpone",
                            "the meeting in Practice Case 31",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Decide’ takes ‘to + V1’."
            },
            {
                    "id": "detecting-errors-verb-basic-set-1-q32",
                    "topic": "Verb - Deny",
                    "difficulty": "hard",
                    "question": "He denied to have taken the file in Practice Case 32",
                    "options": [
                            "He denied",
                            "to have taken",
                            "the file in Practice Case 32",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Deny’ takes a gerund or noun clause. Correct: ‘denied having taken’."
            },
            {
                    "id": "detecting-errors-verb-basic-set-1-q33",
                    "topic": "Verb - Modal",
                    "difficulty": "hard",
                    "question": "He can solves difficult questions in Practice Case 33",
                    "options": [
                            "He can",
                            "solves difficult",
                            "questions in Practice Case 33",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "A modal auxiliary is followed by base verb. Correct: ‘can solve’."
            },
            {
                    "id": "detecting-errors-verb-basic-set-1-q34",
                    "topic": "Verb - Causative",
                    "difficulty": "hard",
                    "question": "Sanya made me to wait outside the office in Practice Case 34",
                    "options": [
                            "Sanya made",
                            "me to wait",
                            "outside the office in Practice Case 34",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Causative ‘make’ takes object + bare infinitive. Correct: ‘made me wait’."
            },
            {
                    "id": "detecting-errors-verb-basic-set-1-q35",
                    "topic": "Verb - No Error",
                    "difficulty": "hard",
                    "question": "The teacher let the students go after the test in Practice Case 35",
                    "options": [
                            "The teacher let",
                            "the students go",
                            "after the test in Practice Case 35",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Let’ takes object + base verb."
            },
            {
                    "id": "detecting-errors-verb-basic-set-1-q36",
                    "topic": "Verb - Gerund",
                    "difficulty": "hard",
                    "question": "I look forward to meet you after Bank Clerk",
                    "options": [
                            "I look forward",
                            "to meet you",
                            "after Bank Clerk",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "In ‘look forward to’, ‘to’ is a preposition and takes gerund. Correct: ‘to meeting you’."
            },
            {
                    "id": "detecting-errors-verb-basic-set-1-q37",
                    "topic": "Verb - Suggest",
                    "difficulty": "hard",
                    "question": "He suggested me to apply for the post in Practice Case 37",
                    "options": [
                            "He suggested me",
                            "to apply",
                            "for the post in Practice Case 37",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "‘Suggest’ is not used as ‘suggested me to’. Correct: ‘suggested that I should apply’."
            },
            {
                    "id": "detecting-errors-verb-basic-set-1-q38",
                    "topic": "Verb - Gerund",
                    "difficulty": "hard",
                    "question": "She avoided to answer the question in Practice Case 38",
                    "options": [
                            "She avoided",
                            "to answer",
                            "the question in Practice Case 38",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Avoid’ is followed by gerund. Correct: ‘avoided answering’."
            },
            {
                    "id": "detecting-errors-verb-basic-set-1-q39",
                    "topic": "Verb - No Error",
                    "difficulty": "hard",
                    "question": "They decided to postpone the meeting in Practice Case 39",
                    "options": [
                            "They decided",
                            "to postpone",
                            "the meeting in Practice Case 39",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Decide’ takes ‘to + V1’."
            },
            {
                    "id": "detecting-errors-verb-basic-set-1-q40",
                    "topic": "Verb - Deny",
                    "difficulty": "hard",
                    "question": "He denied to have taken the file in Practice Case 40",
                    "options": [
                            "He denied",
                            "to have taken",
                            "the file in Practice Case 40",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Deny’ takes a gerund or noun clause. Correct: ‘denied having taken’."
            },
            {
                    "id": "detecting-errors-verb-basic-set-1-q41",
                    "topic": "Verb - Modal",
                    "difficulty": "hard",
                    "question": "He can solves difficult questions in Practice Case 41",
                    "options": [
                            "He can",
                            "solves difficult",
                            "questions in Practice Case 41",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "A modal auxiliary is followed by base verb. Correct: ‘can solve’."
            },
            {
                    "id": "detecting-errors-verb-basic-set-1-q42",
                    "topic": "Verb - Causative",
                    "difficulty": "hard",
                    "question": "Priya made me to wait outside the office in Practice Case 42",
                    "options": [
                            "Priya made",
                            "me to wait",
                            "outside the office in Practice Case 42",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Causative ‘make’ takes object + bare infinitive. Correct: ‘made me wait’."
            },
            {
                    "id": "detecting-errors-verb-basic-set-1-q43",
                    "topic": "Verb - No Error",
                    "difficulty": "hard",
                    "question": "The teacher let the students go after the test in Practice Case 43",
                    "options": [
                            "The teacher let",
                            "the students go",
                            "after the test in Practice Case 43",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Let’ takes object + base verb."
            },
            {
                    "id": "detecting-errors-verb-basic-set-1-q44",
                    "topic": "Verb - Suggest",
                    "difficulty": "hard",
                    "question": "He suggested me to apply for the post in Practice Case 45",
                    "options": [
                            "He suggested me",
                            "to apply",
                            "for the post in Practice Case 45",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "‘Suggest’ is not used as ‘suggested me to’. Correct: ‘suggested that I should apply’."
            },
            {
                    "id": "detecting-errors-verb-basic-set-1-q45",
                    "topic": "Verb - Gerund",
                    "difficulty": "hard",
                    "question": "She avoided to answer the question in Practice Case 46",
                    "options": [
                            "She avoided",
                            "to answer",
                            "the question in Practice Case 46",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Avoid’ is followed by gerund. Correct: ‘avoided answering’."
            },
            {
                    "id": "detecting-errors-verb-basic-set-1-q46",
                    "topic": "Verb - No Error",
                    "difficulty": "hard",
                    "question": "They decided to postpone the meeting in Practice Case 47",
                    "options": [
                            "They decided",
                            "to postpone",
                            "the meeting in Practice Case 47",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Decide’ takes ‘to + V1’."
            },
            {
                    "id": "detecting-errors-verb-basic-set-1-q47",
                    "topic": "Verb - Deny",
                    "difficulty": "hard",
                    "question": "He denied to have taken the file in Practice Case 48",
                    "options": [
                            "He denied",
                            "to have taken",
                            "the file in Practice Case 48",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Deny’ takes a gerund or noun clause. Correct: ‘denied having taken’."
            },
            {
                    "id": "detecting-errors-verb-basic-set-1-q48",
                    "topic": "Verb - Modal",
                    "difficulty": "hard",
                    "question": "He can solves difficult questions in Practice Case 49",
                    "options": [
                            "He can",
                            "solves difficult",
                            "questions in Practice Case 49",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "A modal auxiliary is followed by base verb. Correct: ‘can solve’."
            },
            {
                    "id": "detecting-errors-verb-basic-set-1-q49",
                    "topic": "Verb - Causative",
                    "difficulty": "hard",
                    "question": "Isha made me to wait outside the office in Practice Case 50",
                    "options": [
                            "Isha made",
                            "me to wait",
                            "outside the office in Practice Case 50",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Causative ‘make’ takes object + bare infinitive. Correct: ‘made me wait’."
            },
            {
                    "id": "detecting-errors-verb-basic-set-1-q50",
                    "topic": "Verb - No Error",
                    "difficulty": "hard",
                    "question": "The teacher let the students go after the test in Practice Case 51",
                    "options": [
                            "The teacher let",
                            "the students go",
                            "after the test in Practice Case 51",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Let’ takes object + base verb."
            }
    ];

    window.GJU_QUIZ_BANK.push({
        id: quizId,
        subject: "English",
        title: "Detecting Errors - Verb Basic Set 1",
        description: "50 basic verb error questions covering modals, gerunds, infinitives and causatives.",
        durationMinutes: 30,
        totalQuestions: questions.length,
        marksPerQuestion: 1,
        negativeMarks: 0.25,
        difficulty: "Hard",
        tags: ["SSC", "Railway", "Police", "English", "Detecting Errors"],
        questions
    });
}());
