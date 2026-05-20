(function () {
    "use strict";

    window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];

    const quizId = "detecting-errors-tense-set-2";

    const questions = [
            {
                    "id": "detecting-errors-tense-set-2-q01",
                    "topic": "Tense - Stative",
                    "difficulty": "hard",
                    "question": "He is knowing the answer in Practice Case 53",
                    "options": [
                            "He is knowing",
                            "the answer",
                            "in Practice Case 53",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "Stative verbs like ‘know’ are generally not used in continuous form. Correct: ‘He knows’."
            },
            {
                    "id": "detecting-errors-tense-set-2-q02",
                    "topic": "Tense - No Error",
                    "difficulty": "hard",
                    "question": "The clerk has been working here for five years in Practice Case 54",
                    "options": [
                            "The clerk",
                            "has been working",
                            "here for five years in Practice Case 54",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. Present perfect continuous shows an action continuing from past to present."
            },
            {
                    "id": "detecting-errors-tense-set-2-q03",
                    "topic": "Tense - Did + V1",
                    "difficulty": "hard",
                    "question": "I did not knew the answer in Practice Case 55",
                    "options": [
                            "I did not knew",
                            "the answer",
                            "in Practice Case 55",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "After ‘did not’, use base verb. Correct: ‘did not know’."
            },
            {
                    "id": "detecting-errors-tense-set-2-q04",
                    "topic": "Tense - Future",
                    "difficulty": "hard",
                    "question": "She will be reach the office before 10 a.m. in Practice Case 56",
                    "options": [
                            "She will be reach",
                            "the office",
                            "before 10 a.m. in Practice Case 56",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "Use simple future ‘will reach’, not ‘will be reach’."
            },
            {
                    "id": "detecting-errors-tense-set-2-q05",
                    "topic": "Tense - Since",
                    "difficulty": "hard",
                    "question": "I am living in Patna since 2020 in Practice Case 57",
                    "options": [
                            "I am living",
                            "in Patna",
                            "since 2020 in Practice Case 57",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "With ‘since’ for an action continuing to the present, use present perfect continuous: ‘have been living’."
            },
            {
                    "id": "detecting-errors-tense-set-2-q06",
                    "topic": "Tense - Present Perfect",
                    "difficulty": "hard",
                    "question": "He has completed the essay yesterday in Practice Case 58",
                    "options": [
                            "He has completed",
                            "the essay",
                            "yesterday in Practice Case 58",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "Present perfect is not used with definite past time like ‘yesterday’. Use simple past: ‘completed’."
            },
            {
                    "id": "detecting-errors-tense-set-2-q07",
                    "topic": "Tense - No Error",
                    "difficulty": "hard",
                    "question": "When I reached the station the train had already left in Practice Case 59",
                    "options": [
                            "When I reached",
                            "the station",
                            "the train had already left in Practice Case 59",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. Earlier past action uses past perfect."
            },
            {
                    "id": "detecting-errors-tense-set-2-q08",
                    "topic": "Tense - Stative",
                    "difficulty": "hard",
                    "question": "He is knowing the answer in Practice Case 61",
                    "options": [
                            "He is knowing",
                            "the answer",
                            "in Practice Case 61",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "Stative verbs like ‘know’ are generally not used in continuous form. Correct: ‘He knows’."
            },
            {
                    "id": "detecting-errors-tense-set-2-q09",
                    "topic": "Tense - No Error",
                    "difficulty": "hard",
                    "question": "The clerk has been working here for five years in Practice Case 62",
                    "options": [
                            "The clerk",
                            "has been working",
                            "here for five years in Practice Case 62",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. Present perfect continuous shows an action continuing from past to present."
            },
            {
                    "id": "detecting-errors-tense-set-2-q10",
                    "topic": "Tense - Did + V1",
                    "difficulty": "hard",
                    "question": "I did not knew the answer in Practice Case 63",
                    "options": [
                            "I did not knew",
                            "the answer",
                            "in Practice Case 63",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "After ‘did not’, use base verb. Correct: ‘did not know’."
            },
            {
                    "id": "detecting-errors-tense-set-2-q11",
                    "topic": "Tense - Future",
                    "difficulty": "hard",
                    "question": "She will be reach the office before 10 a.m. in Practice Case 64",
                    "options": [
                            "She will be reach",
                            "the office",
                            "before 10 a.m. in Practice Case 64",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "Use simple future ‘will reach’, not ‘will be reach’."
            },
            {
                    "id": "detecting-errors-tense-set-2-q12",
                    "topic": "Tense - Since",
                    "difficulty": "hard",
                    "question": "I am living in Chennai since 2020 in Practice Case 65",
                    "options": [
                            "I am living",
                            "in Chennai",
                            "since 2020 in Practice Case 65",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "With ‘since’ for an action continuing to the present, use present perfect continuous: ‘have been living’."
            },
            {
                    "id": "detecting-errors-tense-set-2-q13",
                    "topic": "Tense - Present Perfect",
                    "difficulty": "hard",
                    "question": "He has completed the article yesterday in Practice Case 66",
                    "options": [
                            "He has completed",
                            "the article",
                            "yesterday in Practice Case 66",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "Present perfect is not used with definite past time like ‘yesterday’. Use simple past: ‘completed’."
            },
            {
                    "id": "detecting-errors-tense-set-2-q14",
                    "topic": "Tense - No Error",
                    "difficulty": "hard",
                    "question": "When I reached the station the train had already left in Practice Case 67",
                    "options": [
                            "When I reached",
                            "the station",
                            "the train had already left in Practice Case 67",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. Earlier past action uses past perfect."
            },
            {
                    "id": "detecting-errors-tense-set-2-q15",
                    "topic": "Tense - Stative",
                    "difficulty": "hard",
                    "question": "He is knowing the answer in Practice Case 69",
                    "options": [
                            "He is knowing",
                            "the answer",
                            "in Practice Case 69",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "Stative verbs like ‘know’ are generally not used in continuous form. Correct: ‘He knows’."
            },
            {
                    "id": "detecting-errors-tense-set-2-q16",
                    "topic": "Tense - No Error",
                    "difficulty": "hard",
                    "question": "The clerk has been working here for five years in Practice Case 70",
                    "options": [
                            "The clerk",
                            "has been working",
                            "here for five years in Practice Case 70",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. Present perfect continuous shows an action continuing from past to present."
            },
            {
                    "id": "detecting-errors-tense-set-2-q17",
                    "topic": "Tense - Did + V1",
                    "difficulty": "hard",
                    "question": "I did not knew the answer in Practice Case 71",
                    "options": [
                            "I did not knew",
                            "the answer",
                            "in Practice Case 71",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "After ‘did not’, use base verb. Correct: ‘did not know’."
            },
            {
                    "id": "detecting-errors-tense-set-2-q18",
                    "topic": "Tense - Future",
                    "difficulty": "hard",
                    "question": "She will be reach the office before 10 a.m. in Practice Case 72",
                    "options": [
                            "She will be reach",
                            "the office",
                            "before 10 a.m. in Practice Case 72",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "Use simple future ‘will reach’, not ‘will be reach’."
            },
            {
                    "id": "detecting-errors-tense-set-2-q19",
                    "topic": "Tense - Since",
                    "difficulty": "hard",
                    "question": "I am living in Delhi since 2020 in Practice Case 73",
                    "options": [
                            "I am living",
                            "in Delhi",
                            "since 2020 in Practice Case 73",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "With ‘since’ for an action continuing to the present, use present perfect continuous: ‘have been living’."
            },
            {
                    "id": "detecting-errors-tense-set-2-q20",
                    "topic": "Tense - Present Perfect",
                    "difficulty": "hard",
                    "question": "He has completed the answer sheet yesterday in Practice Case 74",
                    "options": [
                            "He has completed",
                            "the answer sheet",
                            "yesterday in Practice Case 74",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "Present perfect is not used with definite past time like ‘yesterday’. Use simple past: ‘completed’."
            },
            {
                    "id": "detecting-errors-tense-set-2-q21",
                    "topic": "Tense - No Error",
                    "difficulty": "hard",
                    "question": "When I reached the station the train had already left in Practice Case 75",
                    "options": [
                            "When I reached",
                            "the station",
                            "the train had already left in Practice Case 75",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. Earlier past action uses past perfect."
            },
            {
                    "id": "detecting-errors-tense-set-2-q22",
                    "topic": "Tense - Stative",
                    "difficulty": "hard",
                    "question": "He is knowing the answer in Practice Case 77",
                    "options": [
                            "He is knowing",
                            "the answer",
                            "in Practice Case 77",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "Stative verbs like ‘know’ are generally not used in continuous form. Correct: ‘He knows’."
            },
            {
                    "id": "detecting-errors-tense-set-2-q23",
                    "topic": "Tense - No Error",
                    "difficulty": "hard",
                    "question": "The clerk has been working here for five years in Practice Case 78",
                    "options": [
                            "The clerk",
                            "has been working",
                            "here for five years in Practice Case 78",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. Present perfect continuous shows an action continuing from past to present."
            },
            {
                    "id": "detecting-errors-tense-set-2-q24",
                    "topic": "Tense - Did + V1",
                    "difficulty": "hard",
                    "question": "I did not knew the answer in Practice Case 79",
                    "options": [
                            "I did not knew",
                            "the answer",
                            "in Practice Case 79",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "After ‘did not’, use base verb. Correct: ‘did not know’."
            },
            {
                    "id": "detecting-errors-tense-set-2-q25",
                    "topic": "Tense - Future",
                    "difficulty": "hard",
                    "question": "She will be reach the office before 10 a.m. in Practice Case 80",
                    "options": [
                            "She will be reach",
                            "the office",
                            "before 10 a.m. in Practice Case 80",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "Use simple future ‘will reach’, not ‘will be reach’."
            },
            {
                    "id": "detecting-errors-tense-set-2-q26",
                    "topic": "Tense - Since",
                    "difficulty": "hard",
                    "question": "I am living in Indore since 2020 in Practice Case 81",
                    "options": [
                            "I am living",
                            "in Indore",
                            "since 2020 in Practice Case 81",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "With ‘since’ for an action continuing to the present, use present perfect continuous: ‘have been living’."
            },
            {
                    "id": "detecting-errors-tense-set-2-q27",
                    "topic": "Tense - Present Perfect",
                    "difficulty": "hard",
                    "question": "He has completed the notice yesterday in Practice Case 82",
                    "options": [
                            "He has completed",
                            "the notice",
                            "yesterday in Practice Case 82",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "Present perfect is not used with definite past time like ‘yesterday’. Use simple past: ‘completed’."
            },
            {
                    "id": "detecting-errors-tense-set-2-q28",
                    "topic": "Tense - No Error",
                    "difficulty": "hard",
                    "question": "When I reached the station the train had already left in Practice Case 83",
                    "options": [
                            "When I reached",
                            "the station",
                            "the train had already left in Practice Case 83",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. Earlier past action uses past perfect."
            },
            {
                    "id": "detecting-errors-tense-set-2-q29",
                    "topic": "Tense - Stative",
                    "difficulty": "hard",
                    "question": "He is knowing the answer in Practice Case 85",
                    "options": [
                            "He is knowing",
                            "the answer",
                            "in Practice Case 85",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "Stative verbs like ‘know’ are generally not used in continuous form. Correct: ‘He knows’."
            },
            {
                    "id": "detecting-errors-tense-set-2-q30",
                    "topic": "Tense - No Error",
                    "difficulty": "hard",
                    "question": "The clerk has been working here for five years in Practice Case 86",
                    "options": [
                            "The clerk",
                            "has been working",
                            "here for five years in Practice Case 86",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. Present perfect continuous shows an action continuing from past to present."
            },
            {
                    "id": "detecting-errors-tense-set-2-q31",
                    "topic": "Tense - Did + V1",
                    "difficulty": "hard",
                    "question": "I did not knew the answer in Practice Case 87",
                    "options": [
                            "I did not knew",
                            "the answer",
                            "in Practice Case 87",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "After ‘did not’, use base verb. Correct: ‘did not know’."
            },
            {
                    "id": "detecting-errors-tense-set-2-q32",
                    "topic": "Tense - Future",
                    "difficulty": "hard",
                    "question": "She will be reach the office before 10 a.m. in Practice Case 88",
                    "options": [
                            "She will be reach",
                            "the office",
                            "before 10 a.m. in Practice Case 88",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "Use simple future ‘will reach’, not ‘will be reach’."
            },
            {
                    "id": "detecting-errors-tense-set-2-q33",
                    "topic": "Tense - Since",
                    "difficulty": "hard",
                    "question": "I am living in Gurugram since 2020 in Practice Case 89",
                    "options": [
                            "I am living",
                            "in Gurugram",
                            "since 2020 in Practice Case 89",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "With ‘since’ for an action continuing to the present, use present perfect continuous: ‘have been living’."
            },
            {
                    "id": "detecting-errors-tense-set-2-q34",
                    "topic": "Tense - Present Perfect",
                    "difficulty": "hard",
                    "question": "He has completed the presentation yesterday in Practice Case 90",
                    "options": [
                            "He has completed",
                            "the presentation",
                            "yesterday in Practice Case 90",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "Present perfect is not used with definite past time like ‘yesterday’. Use simple past: ‘completed’."
            },
            {
                    "id": "detecting-errors-tense-set-2-q35",
                    "topic": "Tense - No Error",
                    "difficulty": "hard",
                    "question": "When I reached the station the train had already left in Practice Case 91",
                    "options": [
                            "When I reached",
                            "the station",
                            "the train had already left in Practice Case 91",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. Earlier past action uses past perfect."
            },
            {
                    "id": "detecting-errors-tense-set-2-q36",
                    "topic": "Tense - Stative",
                    "difficulty": "hard",
                    "question": "He is knowing the answer in Practice Case 93",
                    "options": [
                            "He is knowing",
                            "the answer",
                            "in Practice Case 93",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "Stative verbs like ‘know’ are generally not used in continuous form. Correct: ‘He knows’."
            },
            {
                    "id": "detecting-errors-tense-set-2-q37",
                    "topic": "Tense - No Error",
                    "difficulty": "hard",
                    "question": "The clerk has been working here for five years in Practice Case 94",
                    "options": [
                            "The clerk",
                            "has been working",
                            "here for five years in Practice Case 94",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. Present perfect continuous shows an action continuing from past to present."
            },
            {
                    "id": "detecting-errors-tense-set-2-q38",
                    "topic": "Tense - Did + V1",
                    "difficulty": "hard",
                    "question": "I did not knew the answer in Practice Case 95",
                    "options": [
                            "I did not knew",
                            "the answer",
                            "in Practice Case 95",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "After ‘did not’, use base verb. Correct: ‘did not know’."
            },
            {
                    "id": "detecting-errors-tense-set-2-q39",
                    "topic": "Tense - Future",
                    "difficulty": "hard",
                    "question": "She will be reach the office before 10 a.m. in Practice Case 96",
                    "options": [
                            "She will be reach",
                            "the office",
                            "before 10 a.m. in Practice Case 96",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "Use simple future ‘will reach’, not ‘will be reach’."
            },
            {
                    "id": "detecting-errors-tense-set-2-q40",
                    "topic": "Tense - Since",
                    "difficulty": "hard",
                    "question": "I am living in Kanpur since 2020 in Practice Case 97",
                    "options": [
                            "I am living",
                            "in Kanpur",
                            "since 2020 in Practice Case 97",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "With ‘since’ for an action continuing to the present, use present perfect continuous: ‘have been living’."
            },
            {
                    "id": "detecting-errors-tense-set-2-q41",
                    "topic": "Tense - Present Perfect",
                    "difficulty": "hard",
                    "question": "He has completed the summary yesterday in Practice Case 98",
                    "options": [
                            "He has completed",
                            "the summary",
                            "yesterday in Practice Case 98",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "Present perfect is not used with definite past time like ‘yesterday’. Use simple past: ‘completed’."
            },
            {
                    "id": "detecting-errors-tense-set-2-q42",
                    "topic": "Tense - No Error",
                    "difficulty": "hard",
                    "question": "When I reached the station the train had already left in Practice Case 99",
                    "options": [
                            "When I reached",
                            "the station",
                            "the train had already left in Practice Case 99",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. Earlier past action uses past perfect."
            },
            {
                    "id": "detecting-errors-tense-set-2-q43",
                    "topic": "Tense - Stative",
                    "difficulty": "hard",
                    "question": "He is knowing the answer in Practice Case 101",
                    "options": [
                            "He is knowing",
                            "the answer",
                            "in Practice Case 101",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "Stative verbs like ‘know’ are generally not used in continuous form. Correct: ‘He knows’."
            },
            {
                    "id": "detecting-errors-tense-set-2-q44",
                    "topic": "Tense - No Error",
                    "difficulty": "hard",
                    "question": "The clerk has been working here for five years in Practice Case 102",
                    "options": [
                            "The clerk",
                            "has been working",
                            "here for five years in Practice Case 102",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. Present perfect continuous shows an action continuing from past to present."
            },
            {
                    "id": "detecting-errors-tense-set-2-q45",
                    "topic": "Tense - Did + V1",
                    "difficulty": "hard",
                    "question": "I did not knew the answer in Practice Case 103",
                    "options": [
                            "I did not knew",
                            "the answer",
                            "in Practice Case 103",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "After ‘did not’, use base verb. Correct: ‘did not know’."
            },
            {
                    "id": "detecting-errors-tense-set-2-q46",
                    "topic": "Tense - Future",
                    "difficulty": "hard",
                    "question": "She will be reach the office before 10 a.m. in Practice Case 104",
                    "options": [
                            "She will be reach",
                            "the office",
                            "before 10 a.m. in Practice Case 104",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "Use simple future ‘will reach’, not ‘will be reach’."
            },
            {
                    "id": "detecting-errors-tense-set-2-q47",
                    "topic": "Tense - Since",
                    "difficulty": "hard",
                    "question": "I am living in Varanasi since 2020 in Practice Case 105",
                    "options": [
                            "I am living",
                            "in Varanasi",
                            "since 2020 in Practice Case 105",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "With ‘since’ for an action continuing to the present, use present perfect continuous: ‘have been living’."
            },
            {
                    "id": "detecting-errors-tense-set-2-q48",
                    "topic": "Tense - Present Perfect",
                    "difficulty": "hard",
                    "question": "He has completed the report yesterday in Practice Case 106",
                    "options": [
                            "He has completed",
                            "the report",
                            "yesterday in Practice Case 106",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "Present perfect is not used with definite past time like ‘yesterday’. Use simple past: ‘completed’."
            },
            {
                    "id": "detecting-errors-tense-set-2-q49",
                    "topic": "Tense - No Error",
                    "difficulty": "hard",
                    "question": "When I reached the station the train had already left in Practice Case 107",
                    "options": [
                            "When I reached",
                            "the station",
                            "the train had already left in Practice Case 107",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. Earlier past action uses past perfect."
            },
            {
                    "id": "detecting-errors-tense-set-2-q50",
                    "topic": "Tense - Stative",
                    "difficulty": "hard",
                    "question": "He is knowing the answer in Practice Case 109",
                    "options": [
                            "He is knowing",
                            "the answer",
                            "in Practice Case 109",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "Stative verbs like ‘know’ are generally not used in continuous form. Correct: ‘He knows’."
            }
    ];

    window.GJU_QUIZ_BANK.push({
        id: quizId,
        subject: "English",
        title: "Detecting Errors - Tense Set 2",
        description: "50 advanced tense detecting error questions for competitive exams.",
        durationMinutes: 30,
        totalQuestions: questions.length,
        marksPerQuestion: 1,
        negativeMarks: 0.25,
        difficulty: "Hard",
        tags: ["SSC", "Railway", "Police", "English", "Detecting Errors"],
        questions
    });
}());
