(function () {
    "use strict";

    window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];

    const quizId = "detecting-errors-tense-set-1";

    const questions = [
            {
                    "id": "detecting-errors-tense-set-1-q01",
                    "topic": "Tense - Since",
                    "difficulty": "hard",
                    "question": "I am living in Delhi since 2020 in Practice Case 1",
                    "options": [
                            "I am living",
                            "in Delhi",
                            "since 2020 in Practice Case 1",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "With ‘since’ for an action continuing to the present, use present perfect continuous: ‘have been living’."
            },
            {
                    "id": "detecting-errors-tense-set-1-q02",
                    "topic": "Tense - Present Perfect",
                    "difficulty": "hard",
                    "question": "He has completed the application yesterday in Practice Case 2",
                    "options": [
                            "He has completed",
                            "the application",
                            "yesterday in Practice Case 2",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "Present perfect is not used with definite past time like ‘yesterday’. Use simple past: ‘completed’."
            },
            {
                    "id": "detecting-errors-tense-set-1-q03",
                    "topic": "Tense - No Error",
                    "difficulty": "hard",
                    "question": "When I reached the station the train had already left in Practice Case 3",
                    "options": [
                            "When I reached",
                            "the station",
                            "the train had already left in Practice Case 3",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. Earlier past action uses past perfect."
            },
            {
                    "id": "detecting-errors-tense-set-1-q04",
                    "topic": "Tense - Future Perfect",
                    "difficulty": "hard",
                    "question": "By next month she will complete the course for UP Police",
                    "options": [
                            "By next month",
                            "she will complete",
                            "the course for UP Police",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "With ‘by + future time’ showing completion before that time, use future perfect: ‘will have completed’."
            },
            {
                    "id": "detecting-errors-tense-set-1-q05",
                    "topic": "Tense - Stative",
                    "difficulty": "hard",
                    "question": "He is knowing the answer in Practice Case 5",
                    "options": [
                            "He is knowing",
                            "the answer",
                            "in Practice Case 5",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "Stative verbs like ‘know’ are generally not used in continuous form. Correct: ‘He knows’."
            },
            {
                    "id": "detecting-errors-tense-set-1-q06",
                    "topic": "Tense - No Error",
                    "difficulty": "hard",
                    "question": "The clerk has been working here for five years in Practice Case 6",
                    "options": [
                            "The clerk",
                            "has been working",
                            "here for five years in Practice Case 6",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. Present perfect continuous shows an action continuing from past to present."
            },
            {
                    "id": "detecting-errors-tense-set-1-q07",
                    "topic": "Tense - Did + V1",
                    "difficulty": "hard",
                    "question": "I did not knew the answer in Practice Case 7",
                    "options": [
                            "I did not knew",
                            "the answer",
                            "in Practice Case 7",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "After ‘did not’, use base verb. Correct: ‘did not know’."
            },
            {
                    "id": "detecting-errors-tense-set-1-q08",
                    "topic": "Tense - Future",
                    "difficulty": "hard",
                    "question": "She will be reach the office before 10 a.m. in Practice Case 8",
                    "options": [
                            "She will be reach",
                            "the office",
                            "before 10 a.m. in Practice Case 8",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "Use simple future ‘will reach’, not ‘will be reach’."
            },
            {
                    "id": "detecting-errors-tense-set-1-q09",
                    "topic": "Tense - Since",
                    "difficulty": "hard",
                    "question": "I am living in Indore since 2020 in Practice Case 9",
                    "options": [
                            "I am living",
                            "in Indore",
                            "since 2020 in Practice Case 9",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "With ‘since’ for an action continuing to the present, use present perfect continuous: ‘have been living’."
            },
            {
                    "id": "detecting-errors-tense-set-1-q10",
                    "topic": "Tense - Present Perfect",
                    "difficulty": "hard",
                    "question": "He has completed the assignment yesterday in Practice Case 10",
                    "options": [
                            "He has completed",
                            "the assignment",
                            "yesterday in Practice Case 10",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "Present perfect is not used with definite past time like ‘yesterday’. Use simple past: ‘completed’."
            },
            {
                    "id": "detecting-errors-tense-set-1-q11",
                    "topic": "Tense - No Error",
                    "difficulty": "hard",
                    "question": "When I reached the station the train had already left in Practice Case 11",
                    "options": [
                            "When I reached",
                            "the station",
                            "the train had already left in Practice Case 11",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. Earlier past action uses past perfect."
            },
            {
                    "id": "detecting-errors-tense-set-1-q12",
                    "topic": "Tense - Future Perfect",
                    "difficulty": "hard",
                    "question": "By next month she will complete the course for SSC CPO",
                    "options": [
                            "By next month",
                            "she will complete",
                            "the course for SSC CPO",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "With ‘by + future time’ showing completion before that time, use future perfect: ‘will have completed’."
            },
            {
                    "id": "detecting-errors-tense-set-1-q13",
                    "topic": "Tense - Stative",
                    "difficulty": "hard",
                    "question": "He is knowing the answer in Practice Case 13",
                    "options": [
                            "He is knowing",
                            "the answer",
                            "in Practice Case 13",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "Stative verbs like ‘know’ are generally not used in continuous form. Correct: ‘He knows’."
            },
            {
                    "id": "detecting-errors-tense-set-1-q14",
                    "topic": "Tense - No Error",
                    "difficulty": "hard",
                    "question": "The clerk has been working here for five years in Practice Case 14",
                    "options": [
                            "The clerk",
                            "has been working",
                            "here for five years in Practice Case 14",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. Present perfect continuous shows an action continuing from past to present."
            },
            {
                    "id": "detecting-errors-tense-set-1-q15",
                    "topic": "Tense - Did + V1",
                    "difficulty": "hard",
                    "question": "I did not knew the answer in Practice Case 15",
                    "options": [
                            "I did not knew",
                            "the answer",
                            "in Practice Case 15",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "After ‘did not’, use base verb. Correct: ‘did not know’."
            },
            {
                    "id": "detecting-errors-tense-set-1-q16",
                    "topic": "Tense - Future",
                    "difficulty": "hard",
                    "question": "She will be reach the office before 10 a.m. in Practice Case 16",
                    "options": [
                            "She will be reach",
                            "the office",
                            "before 10 a.m. in Practice Case 16",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "Use simple future ‘will reach’, not ‘will be reach’."
            },
            {
                    "id": "detecting-errors-tense-set-1-q17",
                    "topic": "Tense - Since",
                    "difficulty": "hard",
                    "question": "I am living in Gurugram since 2020 in Practice Case 17",
                    "options": [
                            "I am living",
                            "in Gurugram",
                            "since 2020 in Practice Case 17",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "With ‘since’ for an action continuing to the present, use present perfect continuous: ‘have been living’."
            },
            {
                    "id": "detecting-errors-tense-set-1-q18",
                    "topic": "Tense - Present Perfect",
                    "difficulty": "hard",
                    "question": "He has completed the project yesterday in Practice Case 18",
                    "options": [
                            "He has completed",
                            "the project",
                            "yesterday in Practice Case 18",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "Present perfect is not used with definite past time like ‘yesterday’. Use simple past: ‘completed’."
            },
            {
                    "id": "detecting-errors-tense-set-1-q19",
                    "topic": "Tense - No Error",
                    "difficulty": "hard",
                    "question": "When I reached the station the train had already left in Practice Case 19",
                    "options": [
                            "When I reached",
                            "the station",
                            "the train had already left in Practice Case 19",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. Earlier past action uses past perfect."
            },
            {
                    "id": "detecting-errors-tense-set-1-q20",
                    "topic": "Tense - Future Perfect",
                    "difficulty": "hard",
                    "question": "By next month she will complete the course for CDS",
                    "options": [
                            "By next month",
                            "she will complete",
                            "the course for CDS",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "With ‘by + future time’ showing completion before that time, use future perfect: ‘will have completed’."
            },
            {
                    "id": "detecting-errors-tense-set-1-q21",
                    "topic": "Tense - Stative",
                    "difficulty": "hard",
                    "question": "He is knowing the answer in Practice Case 21",
                    "options": [
                            "He is knowing",
                            "the answer",
                            "in Practice Case 21",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "Stative verbs like ‘know’ are generally not used in continuous form. Correct: ‘He knows’."
            },
            {
                    "id": "detecting-errors-tense-set-1-q22",
                    "topic": "Tense - No Error",
                    "difficulty": "hard",
                    "question": "The clerk has been working here for five years in Practice Case 22",
                    "options": [
                            "The clerk",
                            "has been working",
                            "here for five years in Practice Case 22",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. Present perfect continuous shows an action continuing from past to present."
            },
            {
                    "id": "detecting-errors-tense-set-1-q23",
                    "topic": "Tense - Did + V1",
                    "difficulty": "hard",
                    "question": "I did not knew the answer in Practice Case 23",
                    "options": [
                            "I did not knew",
                            "the answer",
                            "in Practice Case 23",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "After ‘did not’, use base verb. Correct: ‘did not know’."
            },
            {
                    "id": "detecting-errors-tense-set-1-q24",
                    "topic": "Tense - Future",
                    "difficulty": "hard",
                    "question": "She will be reach the office before 10 a.m. in Practice Case 24",
                    "options": [
                            "She will be reach",
                            "the office",
                            "before 10 a.m. in Practice Case 24",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "Use simple future ‘will reach’, not ‘will be reach’."
            },
            {
                    "id": "detecting-errors-tense-set-1-q25",
                    "topic": "Tense - Since",
                    "difficulty": "hard",
                    "question": "I am living in Kanpur since 2020 in Practice Case 25",
                    "options": [
                            "I am living",
                            "in Kanpur",
                            "since 2020 in Practice Case 25",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "With ‘since’ for an action continuing to the present, use present perfect continuous: ‘have been living’."
            },
            {
                    "id": "detecting-errors-tense-set-1-q26",
                    "topic": "Tense - Present Perfect",
                    "difficulty": "hard",
                    "question": "He has completed the file yesterday in Practice Case 26",
                    "options": [
                            "He has completed",
                            "the file",
                            "yesterday in Practice Case 26",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "Present perfect is not used with definite past time like ‘yesterday’. Use simple past: ‘completed’."
            },
            {
                    "id": "detecting-errors-tense-set-1-q27",
                    "topic": "Tense - No Error",
                    "difficulty": "hard",
                    "question": "When I reached the station the train had already left in Practice Case 27",
                    "options": [
                            "When I reached",
                            "the station",
                            "the train had already left in Practice Case 27",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. Earlier past action uses past perfect."
            },
            {
                    "id": "detecting-errors-tense-set-1-q28",
                    "topic": "Tense - Future Perfect",
                    "difficulty": "hard",
                    "question": "By next month she will complete the course for UP Lekhpal",
                    "options": [
                            "By next month",
                            "she will complete",
                            "the course for UP Lekhpal",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "With ‘by + future time’ showing completion before that time, use future perfect: ‘will have completed’."
            },
            {
                    "id": "detecting-errors-tense-set-1-q29",
                    "topic": "Tense - Stative",
                    "difficulty": "hard",
                    "question": "He is knowing the answer in Practice Case 29",
                    "options": [
                            "He is knowing",
                            "the answer",
                            "in Practice Case 29",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "Stative verbs like ‘know’ are generally not used in continuous form. Correct: ‘He knows’."
            },
            {
                    "id": "detecting-errors-tense-set-1-q30",
                    "topic": "Tense - No Error",
                    "difficulty": "hard",
                    "question": "The clerk has been working here for five years in Practice Case 30",
                    "options": [
                            "The clerk",
                            "has been working",
                            "here for five years in Practice Case 30",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. Present perfect continuous shows an action continuing from past to present."
            },
            {
                    "id": "detecting-errors-tense-set-1-q31",
                    "topic": "Tense - Did + V1",
                    "difficulty": "hard",
                    "question": "I did not knew the answer in Practice Case 31",
                    "options": [
                            "I did not knew",
                            "the answer",
                            "in Practice Case 31",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "After ‘did not’, use base verb. Correct: ‘did not know’."
            },
            {
                    "id": "detecting-errors-tense-set-1-q32",
                    "topic": "Tense - Future",
                    "difficulty": "hard",
                    "question": "She will be reach the office before 10 a.m. in Practice Case 32",
                    "options": [
                            "She will be reach",
                            "the office",
                            "before 10 a.m. in Practice Case 32",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "Use simple future ‘will reach’, not ‘will be reach’."
            },
            {
                    "id": "detecting-errors-tense-set-1-q33",
                    "topic": "Tense - Since",
                    "difficulty": "hard",
                    "question": "I am living in Varanasi since 2020 in Practice Case 33",
                    "options": [
                            "I am living",
                            "in Varanasi",
                            "since 2020 in Practice Case 33",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "With ‘since’ for an action continuing to the present, use present perfect continuous: ‘have been living’."
            },
            {
                    "id": "detecting-errors-tense-set-1-q34",
                    "topic": "Tense - Present Perfect",
                    "difficulty": "hard",
                    "question": "He has completed the letter yesterday in Practice Case 34",
                    "options": [
                            "He has completed",
                            "the letter",
                            "yesterday in Practice Case 34",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "Present perfect is not used with definite past time like ‘yesterday’. Use simple past: ‘completed’."
            },
            {
                    "id": "detecting-errors-tense-set-1-q35",
                    "topic": "Tense - No Error",
                    "difficulty": "hard",
                    "question": "When I reached the station the train had already left in Practice Case 35",
                    "options": [
                            "When I reached",
                            "the station",
                            "the train had already left in Practice Case 35",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. Earlier past action uses past perfect."
            },
            {
                    "id": "detecting-errors-tense-set-1-q36",
                    "topic": "Tense - Future Perfect",
                    "difficulty": "hard",
                    "question": "By next month she will complete the course for Bank Clerk",
                    "options": [
                            "By next month",
                            "she will complete",
                            "the course for Bank Clerk",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "With ‘by + future time’ showing completion before that time, use future perfect: ‘will have completed’."
            },
            {
                    "id": "detecting-errors-tense-set-1-q37",
                    "topic": "Tense - Stative",
                    "difficulty": "hard",
                    "question": "He is knowing the answer in Practice Case 37",
                    "options": [
                            "He is knowing",
                            "the answer",
                            "in Practice Case 37",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "Stative verbs like ‘know’ are generally not used in continuous form. Correct: ‘He knows’."
            },
            {
                    "id": "detecting-errors-tense-set-1-q38",
                    "topic": "Tense - No Error",
                    "difficulty": "hard",
                    "question": "The clerk has been working here for five years in Practice Case 38",
                    "options": [
                            "The clerk",
                            "has been working",
                            "here for five years in Practice Case 38",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. Present perfect continuous shows an action continuing from past to present."
            },
            {
                    "id": "detecting-errors-tense-set-1-q39",
                    "topic": "Tense - Did + V1",
                    "difficulty": "hard",
                    "question": "I did not knew the answer in Practice Case 39",
                    "options": [
                            "I did not knew",
                            "the answer",
                            "in Practice Case 39",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "After ‘did not’, use base verb. Correct: ‘did not know’."
            },
            {
                    "id": "detecting-errors-tense-set-1-q40",
                    "topic": "Tense - Future",
                    "difficulty": "hard",
                    "question": "She will be reach the office before 10 a.m. in Practice Case 40",
                    "options": [
                            "She will be reach",
                            "the office",
                            "before 10 a.m. in Practice Case 40",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "Use simple future ‘will reach’, not ‘will be reach’."
            },
            {
                    "id": "detecting-errors-tense-set-1-q41",
                    "topic": "Tense - Since",
                    "difficulty": "hard",
                    "question": "I am living in Jaipur since 2020 in Practice Case 41",
                    "options": [
                            "I am living",
                            "in Jaipur",
                            "since 2020 in Practice Case 41",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "With ‘since’ for an action continuing to the present, use present perfect continuous: ‘have been living’."
            },
            {
                    "id": "detecting-errors-tense-set-1-q42",
                    "topic": "Tense - Present Perfect",
                    "difficulty": "hard",
                    "question": "He has completed the document yesterday in Practice Case 42",
                    "options": [
                            "He has completed",
                            "the document",
                            "yesterday in Practice Case 42",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "Present perfect is not used with definite past time like ‘yesterday’. Use simple past: ‘completed’."
            },
            {
                    "id": "detecting-errors-tense-set-1-q43",
                    "topic": "Tense - No Error",
                    "difficulty": "hard",
                    "question": "When I reached the station the train had already left in Practice Case 43",
                    "options": [
                            "When I reached",
                            "the station",
                            "the train had already left in Practice Case 43",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. Earlier past action uses past perfect."
            },
            {
                    "id": "detecting-errors-tense-set-1-q44",
                    "topic": "Tense - Stative",
                    "difficulty": "hard",
                    "question": "He is knowing the answer in Practice Case 45",
                    "options": [
                            "He is knowing",
                            "the answer",
                            "in Practice Case 45",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "Stative verbs like ‘know’ are generally not used in continuous form. Correct: ‘He knows’."
            },
            {
                    "id": "detecting-errors-tense-set-1-q45",
                    "topic": "Tense - No Error",
                    "difficulty": "hard",
                    "question": "The clerk has been working here for five years in Practice Case 46",
                    "options": [
                            "The clerk",
                            "has been working",
                            "here for five years in Practice Case 46",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. Present perfect continuous shows an action continuing from past to present."
            },
            {
                    "id": "detecting-errors-tense-set-1-q46",
                    "topic": "Tense - Did + V1",
                    "difficulty": "hard",
                    "question": "I did not knew the answer in Practice Case 47",
                    "options": [
                            "I did not knew",
                            "the answer",
                            "in Practice Case 47",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "After ‘did not’, use base verb. Correct: ‘did not know’."
            },
            {
                    "id": "detecting-errors-tense-set-1-q47",
                    "topic": "Tense - Future",
                    "difficulty": "hard",
                    "question": "She will be reach the office before 10 a.m. in Practice Case 48",
                    "options": [
                            "She will be reach",
                            "the office",
                            "before 10 a.m. in Practice Case 48",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "Use simple future ‘will reach’, not ‘will be reach’."
            },
            {
                    "id": "detecting-errors-tense-set-1-q48",
                    "topic": "Tense - Since",
                    "difficulty": "hard",
                    "question": "I am living in Gwalior since 2020 in Practice Case 49",
                    "options": [
                            "I am living",
                            "in Gwalior",
                            "since 2020 in Practice Case 49",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "With ‘since’ for an action continuing to the present, use present perfect continuous: ‘have been living’."
            },
            {
                    "id": "detecting-errors-tense-set-1-q49",
                    "topic": "Tense - Present Perfect",
                    "difficulty": "hard",
                    "question": "He has completed the proposal yesterday in Practice Case 50",
                    "options": [
                            "He has completed",
                            "the proposal",
                            "yesterday in Practice Case 50",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "Present perfect is not used with definite past time like ‘yesterday’. Use simple past: ‘completed’."
            },
            {
                    "id": "detecting-errors-tense-set-1-q50",
                    "topic": "Tense - No Error",
                    "difficulty": "hard",
                    "question": "When I reached the station the train had already left in Practice Case 51",
                    "options": [
                            "When I reached",
                            "the station",
                            "the train had already left in Practice Case 51",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. Earlier past action uses past perfect."
            }
    ];

    window.GJU_QUIZ_BANK.push({
        id: quizId,
        subject: "English",
        title: "Detecting Errors - Tense Set 1",
        description: "50 tense-focused detecting error questions on present, past and future tense usage.",
        durationMinutes: 30,
        totalQuestions: questions.length,
        marksPerQuestion: 1,
        negativeMarks: 0.25,
        difficulty: "Hard",
        tags: ["SSC", "Railway", "Police", "English", "Detecting Errors"],
        questions
    });
}());
