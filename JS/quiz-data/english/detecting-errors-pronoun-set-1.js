(function () {
    "use strict";

    window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];

    const quizId = "detecting-errors-pronoun-set-1";

    const questions = [
            {
                    "id": "detecting-errors-pronoun-set-1-q01",
                    "topic": "Pronoun - Indefinite",
                    "difficulty": "hard",
                    "question": "Everyone should submit their form before the last date in Practice Case 1",
                    "options": [
                            "Everyone",
                            "should submit",
                            "their form before the last date in Practice Case 1",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "In traditional exam grammar, ‘everyone’ is singular; use ‘his or her’ or rewrite in plural."
            },
            {
                    "id": "detecting-errors-pronoun-set-1-q02",
                    "topic": "Pronoun - Case",
                    "difficulty": "hard",
                    "question": "Between you and I this answer is doubtful in Practice Case 2",
                    "options": [
                            "Between you",
                            "and I",
                            "this answer is doubtful in Practice Case 2",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "After a preposition, use objective case. Correct: ‘between you and me’."
            },
            {
                    "id": "detecting-errors-pronoun-set-1-q03",
                    "topic": "Pronoun - No Error",
                    "difficulty": "hard",
                    "question": "The teacher asked Rahul and me to stay after class in Practice Case 3",
                    "options": [
                            "The teacher asked",
                            "Rahul and me",
                            "to stay after class in Practice Case 3",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Me’ is the object of ‘asked’."
            },
            {
                    "id": "detecting-errors-pronoun-set-1-q04",
                    "topic": "Pronoun - Relative",
                    "difficulty": "hard",
                    "question": "This is the student which won the debate in Practice Case 4",
                    "options": [
                            "This is",
                            "the student",
                            "which won the debate in Practice Case 4",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "For a person, use ‘who’ or ‘that’, not ‘which’."
            },
            {
                    "id": "detecting-errors-pronoun-set-1-q05",
                    "topic": "Pronoun - No Error",
                    "difficulty": "hard",
                    "question": "He himself admitted his mistake in Practice Case 5",
                    "options": [
                            "He himself",
                            "admitted",
                            "his mistake in Practice Case 5",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Himself’ is emphatic."
            },
            {
                    "id": "detecting-errors-pronoun-set-1-q06",
                    "topic": "Pronoun - One's",
                    "difficulty": "hard",
                    "question": "One should respect his teachers in Practice Case 6",
                    "options": [
                            "One should",
                            "respect his",
                            "teachers in Practice Case 6",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "When ‘one’ is the subject, use ‘one’s’. Correct: ‘respect one’s teachers’."
            },
            {
                    "id": "detecting-errors-pronoun-set-1-q07",
                    "topic": "Pronoun - No Error",
                    "difficulty": "hard",
                    "question": "The book that you gave me is useful for Delhi Police",
                    "options": [
                            "The book",
                            "that you gave me",
                            "is useful for Delhi Police",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘That’ can refer to things."
            },
            {
                    "id": "detecting-errors-pronoun-set-1-q08",
                    "topic": "Pronoun - Who/Whom",
                    "difficulty": "hard",
                    "question": "Whom do you think will win the final test in Practice Case 8?",
                    "options": [
                            "Whom do",
                            "you think",
                            "will win the final test in Practice Case 8?",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "The pronoun is subject of ‘will win’, so use ‘who’, not ‘whom’."
            },
            {
                    "id": "detecting-errors-pronoun-set-1-q09",
                    "topic": "Pronoun - Indefinite",
                    "difficulty": "hard",
                    "question": "Everyone should submit their form before the last date in Practice Case 9",
                    "options": [
                            "Everyone",
                            "should submit",
                            "their form before the last date in Practice Case 9",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "In traditional exam grammar, ‘everyone’ is singular; use ‘his or her’ or rewrite in plural."
            },
            {
                    "id": "detecting-errors-pronoun-set-1-q10",
                    "topic": "Pronoun - Case",
                    "difficulty": "hard",
                    "question": "Between you and I this answer is doubtful in Practice Case 10",
                    "options": [
                            "Between you",
                            "and I",
                            "this answer is doubtful in Practice Case 10",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "After a preposition, use objective case. Correct: ‘between you and me’."
            },
            {
                    "id": "detecting-errors-pronoun-set-1-q11",
                    "topic": "Pronoun - No Error",
                    "difficulty": "hard",
                    "question": "The teacher asked Rahul and me to stay after class in Practice Case 11",
                    "options": [
                            "The teacher asked",
                            "Rahul and me",
                            "to stay after class in Practice Case 11",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Me’ is the object of ‘asked’."
            },
            {
                    "id": "detecting-errors-pronoun-set-1-q12",
                    "topic": "Pronoun - Relative",
                    "difficulty": "hard",
                    "question": "This is the student which won the debate in Practice Case 12",
                    "options": [
                            "This is",
                            "the student",
                            "which won the debate in Practice Case 12",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "For a person, use ‘who’ or ‘that’, not ‘which’."
            },
            {
                    "id": "detecting-errors-pronoun-set-1-q13",
                    "topic": "Pronoun - No Error",
                    "difficulty": "hard",
                    "question": "He himself admitted his mistake in Practice Case 13",
                    "options": [
                            "He himself",
                            "admitted",
                            "his mistake in Practice Case 13",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Himself’ is emphatic."
            },
            {
                    "id": "detecting-errors-pronoun-set-1-q14",
                    "topic": "Pronoun - One's",
                    "difficulty": "hard",
                    "question": "One should respect his teachers in Practice Case 14",
                    "options": [
                            "One should",
                            "respect his",
                            "teachers in Practice Case 14",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "When ‘one’ is the subject, use ‘one’s’. Correct: ‘respect one’s teachers’."
            },
            {
                    "id": "detecting-errors-pronoun-set-1-q15",
                    "topic": "Pronoun - No Error",
                    "difficulty": "hard",
                    "question": "The book that you gave me is useful for CHSL",
                    "options": [
                            "The book",
                            "that you gave me",
                            "is useful for CHSL",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘That’ can refer to things."
            },
            {
                    "id": "detecting-errors-pronoun-set-1-q16",
                    "topic": "Pronoun - Who/Whom",
                    "difficulty": "hard",
                    "question": "Whom do you think will win the final test in Practice Case 16?",
                    "options": [
                            "Whom do",
                            "you think",
                            "will win the final test in Practice Case 16?",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "The pronoun is subject of ‘will win’, so use ‘who’, not ‘whom’."
            },
            {
                    "id": "detecting-errors-pronoun-set-1-q17",
                    "topic": "Pronoun - Indefinite",
                    "difficulty": "hard",
                    "question": "Everyone should submit their form before the last date in Practice Case 17",
                    "options": [
                            "Everyone",
                            "should submit",
                            "their form before the last date in Practice Case 17",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "In traditional exam grammar, ‘everyone’ is singular; use ‘his or her’ or rewrite in plural."
            },
            {
                    "id": "detecting-errors-pronoun-set-1-q18",
                    "topic": "Pronoun - Case",
                    "difficulty": "hard",
                    "question": "Between you and I this answer is doubtful in Practice Case 18",
                    "options": [
                            "Between you",
                            "and I",
                            "this answer is doubtful in Practice Case 18",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "After a preposition, use objective case. Correct: ‘between you and me’."
            },
            {
                    "id": "detecting-errors-pronoun-set-1-q19",
                    "topic": "Pronoun - No Error",
                    "difficulty": "hard",
                    "question": "The teacher asked Rahul and me to stay after class in Practice Case 19",
                    "options": [
                            "The teacher asked",
                            "Rahul and me",
                            "to stay after class in Practice Case 19",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Me’ is the object of ‘asked’."
            },
            {
                    "id": "detecting-errors-pronoun-set-1-q20",
                    "topic": "Pronoun - Relative",
                    "difficulty": "hard",
                    "question": "This is the student which won the debate in Practice Case 20",
                    "options": [
                            "This is",
                            "the student",
                            "which won the debate in Practice Case 20",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "For a person, use ‘who’ or ‘that’, not ‘which’."
            },
            {
                    "id": "detecting-errors-pronoun-set-1-q21",
                    "topic": "Pronoun - No Error",
                    "difficulty": "hard",
                    "question": "He himself admitted his mistake in Practice Case 21",
                    "options": [
                            "He himself",
                            "admitted",
                            "his mistake in Practice Case 21",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Himself’ is emphatic."
            },
            {
                    "id": "detecting-errors-pronoun-set-1-q22",
                    "topic": "Pronoun - One's",
                    "difficulty": "hard",
                    "question": "One should respect his teachers in Practice Case 22",
                    "options": [
                            "One should",
                            "respect his",
                            "teachers in Practice Case 22",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "When ‘one’ is the subject, use ‘one’s’. Correct: ‘respect one’s teachers’."
            },
            {
                    "id": "detecting-errors-pronoun-set-1-q23",
                    "topic": "Pronoun - No Error",
                    "difficulty": "hard",
                    "question": "The book that you gave me is useful for Railway Group D",
                    "options": [
                            "The book",
                            "that you gave me",
                            "is useful for Railway Group D",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘That’ can refer to things."
            },
            {
                    "id": "detecting-errors-pronoun-set-1-q24",
                    "topic": "Pronoun - Who/Whom",
                    "difficulty": "hard",
                    "question": "Whom do you think will win the final test in Practice Case 24?",
                    "options": [
                            "Whom do",
                            "you think",
                            "will win the final test in Practice Case 24?",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "The pronoun is subject of ‘will win’, so use ‘who’, not ‘whom’."
            },
            {
                    "id": "detecting-errors-pronoun-set-1-q25",
                    "topic": "Pronoun - Indefinite",
                    "difficulty": "hard",
                    "question": "Everyone should submit their form before the last date in Practice Case 25",
                    "options": [
                            "Everyone",
                            "should submit",
                            "their form before the last date in Practice Case 25",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "In traditional exam grammar, ‘everyone’ is singular; use ‘his or her’ or rewrite in plural."
            },
            {
                    "id": "detecting-errors-pronoun-set-1-q26",
                    "topic": "Pronoun - Case",
                    "difficulty": "hard",
                    "question": "Between you and I this answer is doubtful in Practice Case 26",
                    "options": [
                            "Between you",
                            "and I",
                            "this answer is doubtful in Practice Case 26",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "After a preposition, use objective case. Correct: ‘between you and me’."
            },
            {
                    "id": "detecting-errors-pronoun-set-1-q27",
                    "topic": "Pronoun - No Error",
                    "difficulty": "hard",
                    "question": "The teacher asked Rahul and me to stay after class in Practice Case 27",
                    "options": [
                            "The teacher asked",
                            "Rahul and me",
                            "to stay after class in Practice Case 27",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Me’ is the object of ‘asked’."
            },
            {
                    "id": "detecting-errors-pronoun-set-1-q28",
                    "topic": "Pronoun - Relative",
                    "difficulty": "hard",
                    "question": "This is the student which won the debate in Practice Case 28",
                    "options": [
                            "This is",
                            "the student",
                            "which won the debate in Practice Case 28",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "For a person, use ‘who’ or ‘that’, not ‘which’."
            },
            {
                    "id": "detecting-errors-pronoun-set-1-q29",
                    "topic": "Pronoun - No Error",
                    "difficulty": "hard",
                    "question": "He himself admitted his mistake in Practice Case 29",
                    "options": [
                            "He himself",
                            "admitted",
                            "his mistake in Practice Case 29",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Himself’ is emphatic."
            },
            {
                    "id": "detecting-errors-pronoun-set-1-q30",
                    "topic": "Pronoun - One's",
                    "difficulty": "hard",
                    "question": "One should respect his teachers in Practice Case 30",
                    "options": [
                            "One should",
                            "respect his",
                            "teachers in Practice Case 30",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "When ‘one’ is the subject, use ‘one’s’. Correct: ‘respect one’s teachers’."
            },
            {
                    "id": "detecting-errors-pronoun-set-1-q31",
                    "topic": "Pronoun - No Error",
                    "difficulty": "hard",
                    "question": "The book that you gave me is useful for SSC CGL",
                    "options": [
                            "The book",
                            "that you gave me",
                            "is useful for SSC CGL",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘That’ can refer to things."
            },
            {
                    "id": "detecting-errors-pronoun-set-1-q32",
                    "topic": "Pronoun - Who/Whom",
                    "difficulty": "hard",
                    "question": "Whom do you think will win the final test in Practice Case 32?",
                    "options": [
                            "Whom do",
                            "you think",
                            "will win the final test in Practice Case 32?",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "The pronoun is subject of ‘will win’, so use ‘who’, not ‘whom’."
            },
            {
                    "id": "detecting-errors-pronoun-set-1-q33",
                    "topic": "Pronoun - Indefinite",
                    "difficulty": "hard",
                    "question": "Everyone should submit their form before the last date in Practice Case 33",
                    "options": [
                            "Everyone",
                            "should submit",
                            "their form before the last date in Practice Case 33",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "In traditional exam grammar, ‘everyone’ is singular; use ‘his or her’ or rewrite in plural."
            },
            {
                    "id": "detecting-errors-pronoun-set-1-q34",
                    "topic": "Pronoun - Case",
                    "difficulty": "hard",
                    "question": "Between you and I this answer is doubtful in Practice Case 34",
                    "options": [
                            "Between you",
                            "and I",
                            "this answer is doubtful in Practice Case 34",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "After a preposition, use objective case. Correct: ‘between you and me’."
            },
            {
                    "id": "detecting-errors-pronoun-set-1-q35",
                    "topic": "Pronoun - No Error",
                    "difficulty": "hard",
                    "question": "The teacher asked Rahul and me to stay after class in Practice Case 35",
                    "options": [
                            "The teacher asked",
                            "Rahul and me",
                            "to stay after class in Practice Case 35",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Me’ is the object of ‘asked’."
            },
            {
                    "id": "detecting-errors-pronoun-set-1-q36",
                    "topic": "Pronoun - Relative",
                    "difficulty": "hard",
                    "question": "This is the student which won the debate in Practice Case 36",
                    "options": [
                            "This is",
                            "the student",
                            "which won the debate in Practice Case 36",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "For a person, use ‘who’ or ‘that’, not ‘which’."
            },
            {
                    "id": "detecting-errors-pronoun-set-1-q37",
                    "topic": "Pronoun - No Error",
                    "difficulty": "hard",
                    "question": "He himself admitted his mistake in Practice Case 37",
                    "options": [
                            "He himself",
                            "admitted",
                            "his mistake in Practice Case 37",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Himself’ is emphatic."
            },
            {
                    "id": "detecting-errors-pronoun-set-1-q38",
                    "topic": "Pronoun - One's",
                    "difficulty": "hard",
                    "question": "One should respect his teachers in Practice Case 38",
                    "options": [
                            "One should",
                            "respect his",
                            "teachers in Practice Case 38",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "When ‘one’ is the subject, use ‘one’s’. Correct: ‘respect one’s teachers’."
            },
            {
                    "id": "detecting-errors-pronoun-set-1-q39",
                    "topic": "Pronoun - No Error",
                    "difficulty": "hard",
                    "question": "The book that you gave me is useful for Stenographer",
                    "options": [
                            "The book",
                            "that you gave me",
                            "is useful for Stenographer",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘That’ can refer to things."
            },
            {
                    "id": "detecting-errors-pronoun-set-1-q40",
                    "topic": "Pronoun - Who/Whom",
                    "difficulty": "hard",
                    "question": "Whom do you think will win the final test in Practice Case 40?",
                    "options": [
                            "Whom do",
                            "you think",
                            "will win the final test in Practice Case 40?",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "The pronoun is subject of ‘will win’, so use ‘who’, not ‘whom’."
            },
            {
                    "id": "detecting-errors-pronoun-set-1-q41",
                    "topic": "Pronoun - Indefinite",
                    "difficulty": "hard",
                    "question": "Everyone should submit their form before the last date in Practice Case 41",
                    "options": [
                            "Everyone",
                            "should submit",
                            "their form before the last date in Practice Case 41",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "In traditional exam grammar, ‘everyone’ is singular; use ‘his or her’ or rewrite in plural."
            },
            {
                    "id": "detecting-errors-pronoun-set-1-q42",
                    "topic": "Pronoun - Case",
                    "difficulty": "hard",
                    "question": "Between you and I this answer is doubtful in Practice Case 42",
                    "options": [
                            "Between you",
                            "and I",
                            "this answer is doubtful in Practice Case 42",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "After a preposition, use objective case. Correct: ‘between you and me’."
            },
            {
                    "id": "detecting-errors-pronoun-set-1-q43",
                    "topic": "Pronoun - No Error",
                    "difficulty": "hard",
                    "question": "The teacher asked Rahul and me to stay after class in Practice Case 43",
                    "options": [
                            "The teacher asked",
                            "Rahul and me",
                            "to stay after class in Practice Case 43",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Me’ is the object of ‘asked’."
            },
            {
                    "id": "detecting-errors-pronoun-set-1-q44",
                    "topic": "Pronoun - Relative",
                    "difficulty": "hard",
                    "question": "This is the student which won the debate in Practice Case 44",
                    "options": [
                            "This is",
                            "the student",
                            "which won the debate in Practice Case 44",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "For a person, use ‘who’ or ‘that’, not ‘which’."
            },
            {
                    "id": "detecting-errors-pronoun-set-1-q45",
                    "topic": "Pronoun - No Error",
                    "difficulty": "hard",
                    "question": "He himself admitted his mistake in Practice Case 45",
                    "options": [
                            "He himself",
                            "admitted",
                            "his mistake in Practice Case 45",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Himself’ is emphatic."
            },
            {
                    "id": "detecting-errors-pronoun-set-1-q46",
                    "topic": "Pronoun - One's",
                    "difficulty": "hard",
                    "question": "One should respect his teachers in Practice Case 46",
                    "options": [
                            "One should",
                            "respect his",
                            "teachers in Practice Case 46",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "When ‘one’ is the subject, use ‘one’s’. Correct: ‘respect one’s teachers’."
            },
            {
                    "id": "detecting-errors-pronoun-set-1-q47",
                    "topic": "Pronoun - Who/Whom",
                    "difficulty": "hard",
                    "question": "Whom do you think will win the final test in Practice Case 48?",
                    "options": [
                            "Whom do",
                            "you think",
                            "will win the final test in Practice Case 48?",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "The pronoun is subject of ‘will win’, so use ‘who’, not ‘whom’."
            },
            {
                    "id": "detecting-errors-pronoun-set-1-q48",
                    "topic": "Pronoun - Indefinite",
                    "difficulty": "hard",
                    "question": "Everyone should submit their form before the last date in Practice Case 49",
                    "options": [
                            "Everyone",
                            "should submit",
                            "their form before the last date in Practice Case 49",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "In traditional exam grammar, ‘everyone’ is singular; use ‘his or her’ or rewrite in plural."
            },
            {
                    "id": "detecting-errors-pronoun-set-1-q49",
                    "topic": "Pronoun - Case",
                    "difficulty": "hard",
                    "question": "Between you and I this answer is doubtful in Practice Case 50",
                    "options": [
                            "Between you",
                            "and I",
                            "this answer is doubtful in Practice Case 50",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "After a preposition, use objective case. Correct: ‘between you and me’."
            },
            {
                    "id": "detecting-errors-pronoun-set-1-q50",
                    "topic": "Pronoun - No Error",
                    "difficulty": "hard",
                    "question": "The teacher asked Rahul and me to stay after class in Practice Case 51",
                    "options": [
                            "The teacher asked",
                            "Rahul and me",
                            "to stay after class in Practice Case 51",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Me’ is the object of ‘asked’."
            }
    ];

    window.GJU_QUIZ_BANK.push({
        id: quizId,
        subject: "English",
        title: "Detecting Errors - Pronoun Set 1",
        description: "50 pronoun-focused detecting error questions on case, relative pronouns and agreement.",
        durationMinutes: 30,
        totalQuestions: questions.length,
        marksPerQuestion: 1,
        negativeMarks: 0.25,
        difficulty: "Hard",
        tags: ["SSC", "Railway", "Police", "English", "Detecting Errors"],
        questions
    });
}());
