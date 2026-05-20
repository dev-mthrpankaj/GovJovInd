(function () {
    "use strict";

    window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];

    const quizId = "detecting-errors-tense-set-3";

    const questions = [
            {
                    "id": "detecting-errors-tense-set-3-q01",
                    "topic": "Tense - No Error",
                    "difficulty": "hard",
                    "question": "The clerk has been working here for five years in Practice Case 110",
                    "options": [
                            "The clerk",
                            "has been working",
                            "here for five years in Practice Case 110",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. Present perfect continuous shows an action continuing from past to present."
            },
            {
                    "id": "detecting-errors-tense-set-3-q02",
                    "topic": "Tense - Did + V1",
                    "difficulty": "hard",
                    "question": "I did not knew the answer in Practice Case 111",
                    "options": [
                            "I did not knew",
                            "the answer",
                            "in Practice Case 111",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "After ‘did not’, use base verb. Correct: ‘did not know’."
            },
            {
                    "id": "detecting-errors-tense-set-3-q03",
                    "topic": "Tense - Future",
                    "difficulty": "hard",
                    "question": "She will be reach the office before 10 a.m. in Practice Case 112",
                    "options": [
                            "She will be reach",
                            "the office",
                            "before 10 a.m. in Practice Case 112",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "Use simple future ‘will reach’, not ‘will be reach’."
            },
            {
                    "id": "detecting-errors-tense-set-3-q04",
                    "topic": "Tense - Since",
                    "difficulty": "hard",
                    "question": "I am living in Jaipur since 2020 in Practice Case 113",
                    "options": [
                            "I am living",
                            "in Jaipur",
                            "since 2020 in Practice Case 113",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "With ‘since’ for an action continuing to the present, use present perfect continuous: ‘have been living’."
            },
            {
                    "id": "detecting-errors-tense-set-3-q05",
                    "topic": "Tense - Present Perfect",
                    "difficulty": "hard",
                    "question": "He has completed the speech yesterday in Practice Case 114",
                    "options": [
                            "He has completed",
                            "the speech",
                            "yesterday in Practice Case 114",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "Present perfect is not used with definite past time like ‘yesterday’. Use simple past: ‘completed’."
            },
            {
                    "id": "detecting-errors-tense-set-3-q06",
                    "topic": "Tense - No Error",
                    "difficulty": "hard",
                    "question": "When I reached the station the train had already left in Practice Case 115",
                    "options": [
                            "When I reached",
                            "the station",
                            "the train had already left in Practice Case 115",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. Earlier past action uses past perfect."
            },
            {
                    "id": "detecting-errors-tense-set-3-q07",
                    "topic": "Tense - Stative",
                    "difficulty": "hard",
                    "question": "He is knowing the answer in Practice Case 117",
                    "options": [
                            "He is knowing",
                            "the answer",
                            "in Practice Case 117",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "Stative verbs like ‘know’ are generally not used in continuous form. Correct: ‘He knows’."
            },
            {
                    "id": "detecting-errors-tense-set-3-q08",
                    "topic": "Tense - No Error",
                    "difficulty": "hard",
                    "question": "The clerk has been working here for five years in Practice Case 118",
                    "options": [
                            "The clerk",
                            "has been working",
                            "here for five years in Practice Case 118",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. Present perfect continuous shows an action continuing from past to present."
            },
            {
                    "id": "detecting-errors-tense-set-3-q09",
                    "topic": "Tense - Did + V1",
                    "difficulty": "hard",
                    "question": "I did not knew the answer in Practice Case 119",
                    "options": [
                            "I did not knew",
                            "the answer",
                            "in Practice Case 119",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "After ‘did not’, use base verb. Correct: ‘did not know’."
            },
            {
                    "id": "detecting-errors-tense-set-3-q10",
                    "topic": "Tense - Future",
                    "difficulty": "hard",
                    "question": "She will be reach the office before 10 a.m. in Practice Case 120",
                    "options": [
                            "She will be reach",
                            "the office",
                            "before 10 a.m. in Practice Case 120",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "Use simple future ‘will reach’, not ‘will be reach’."
            },
            {
                    "id": "detecting-errors-tense-set-3-q11",
                    "topic": "Tense - Since",
                    "difficulty": "hard",
                    "question": "I am living in Gwalior since 2020 in Practice Case 121",
                    "options": [
                            "I am living",
                            "in Gwalior",
                            "since 2020 in Practice Case 121",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "With ‘since’ for an action continuing to the present, use present perfect continuous: ‘have been living’."
            },
            {
                    "id": "detecting-errors-tense-set-3-q12",
                    "topic": "Tense - Present Perfect",
                    "difficulty": "hard",
                    "question": "He has completed the application yesterday in Practice Case 122",
                    "options": [
                            "He has completed",
                            "the application",
                            "yesterday in Practice Case 122",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "Present perfect is not used with definite past time like ‘yesterday’. Use simple past: ‘completed’."
            },
            {
                    "id": "detecting-errors-tense-set-3-q13",
                    "topic": "Tense - No Error",
                    "difficulty": "hard",
                    "question": "When I reached the station the train had already left in Practice Case 123",
                    "options": [
                            "When I reached",
                            "the station",
                            "the train had already left in Practice Case 123",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. Earlier past action uses past perfect."
            },
            {
                    "id": "detecting-errors-tense-set-3-q14",
                    "topic": "Tense - Stative",
                    "difficulty": "hard",
                    "question": "He is knowing the answer in Practice Case 125",
                    "options": [
                            "He is knowing",
                            "the answer",
                            "in Practice Case 125",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "Stative verbs like ‘know’ are generally not used in continuous form. Correct: ‘He knows’."
            },
            {
                    "id": "detecting-errors-tense-set-3-q15",
                    "topic": "Tense - No Error",
                    "difficulty": "hard",
                    "question": "The clerk has been working here for five years in Practice Case 126",
                    "options": [
                            "The clerk",
                            "has been working",
                            "here for five years in Practice Case 126",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. Present perfect continuous shows an action continuing from past to present."
            },
            {
                    "id": "detecting-errors-tense-set-3-q16",
                    "topic": "Tense - Did + V1",
                    "difficulty": "hard",
                    "question": "I did not knew the answer in Practice Case 127",
                    "options": [
                            "I did not knew",
                            "the answer",
                            "in Practice Case 127",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "After ‘did not’, use base verb. Correct: ‘did not know’."
            },
            {
                    "id": "detecting-errors-tense-set-3-q17",
                    "topic": "Tense - Future",
                    "difficulty": "hard",
                    "question": "She will be reach the office before 10 a.m. in Practice Case 128",
                    "options": [
                            "She will be reach",
                            "the office",
                            "before 10 a.m. in Practice Case 128",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "Use simple future ‘will reach’, not ‘will be reach’."
            },
            {
                    "id": "detecting-errors-tense-set-3-q18",
                    "topic": "Tense - Since",
                    "difficulty": "hard",
                    "question": "I am living in Patna since 2020 in Practice Case 129",
                    "options": [
                            "I am living",
                            "in Patna",
                            "since 2020 in Practice Case 129",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "With ‘since’ for an action continuing to the present, use present perfect continuous: ‘have been living’."
            },
            {
                    "id": "detecting-errors-tense-set-3-q19",
                    "topic": "Tense - Present Perfect",
                    "difficulty": "hard",
                    "question": "He has completed the assignment yesterday in Practice Case 130",
                    "options": [
                            "He has completed",
                            "the assignment",
                            "yesterday in Practice Case 130",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "Present perfect is not used with definite past time like ‘yesterday’. Use simple past: ‘completed’."
            },
            {
                    "id": "detecting-errors-tense-set-3-q20",
                    "topic": "Tense - No Error",
                    "difficulty": "hard",
                    "question": "When I reached the station the train had already left in Practice Case 131",
                    "options": [
                            "When I reached",
                            "the station",
                            "the train had already left in Practice Case 131",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. Earlier past action uses past perfect."
            },
            {
                    "id": "detecting-errors-tense-set-3-q21",
                    "topic": "Tense - Stative",
                    "difficulty": "hard",
                    "question": "He is knowing the answer in Practice Case 133",
                    "options": [
                            "He is knowing",
                            "the answer",
                            "in Practice Case 133",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "Stative verbs like ‘know’ are generally not used in continuous form. Correct: ‘He knows’."
            },
            {
                    "id": "detecting-errors-tense-set-3-q22",
                    "topic": "Tense - No Error",
                    "difficulty": "hard",
                    "question": "The clerk has been working here for five years in Practice Case 134",
                    "options": [
                            "The clerk",
                            "has been working",
                            "here for five years in Practice Case 134",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. Present perfect continuous shows an action continuing from past to present."
            },
            {
                    "id": "detecting-errors-tense-set-3-q23",
                    "topic": "Tense - Did + V1",
                    "difficulty": "hard",
                    "question": "I did not knew the answer in Practice Case 135",
                    "options": [
                            "I did not knew",
                            "the answer",
                            "in Practice Case 135",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "After ‘did not’, use base verb. Correct: ‘did not know’."
            },
            {
                    "id": "detecting-errors-tense-set-3-q24",
                    "topic": "Tense - Future",
                    "difficulty": "hard",
                    "question": "She will be reach the office before 10 a.m. in Practice Case 136",
                    "options": [
                            "She will be reach",
                            "the office",
                            "before 10 a.m. in Practice Case 136",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "Use simple future ‘will reach’, not ‘will be reach’."
            },
            {
                    "id": "detecting-errors-tense-set-3-q25",
                    "topic": "Tense - Since",
                    "difficulty": "hard",
                    "question": "I am living in Chennai since 2020 in Practice Case 137",
                    "options": [
                            "I am living",
                            "in Chennai",
                            "since 2020 in Practice Case 137",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "With ‘since’ for an action continuing to the present, use present perfect continuous: ‘have been living’."
            },
            {
                    "id": "detecting-errors-tense-set-3-q26",
                    "topic": "Tense - Present Perfect",
                    "difficulty": "hard",
                    "question": "He has completed the project yesterday in Practice Case 138",
                    "options": [
                            "He has completed",
                            "the project",
                            "yesterday in Practice Case 138",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "Present perfect is not used with definite past time like ‘yesterday’. Use simple past: ‘completed’."
            },
            {
                    "id": "detecting-errors-tense-set-3-q27",
                    "topic": "Tense - No Error",
                    "difficulty": "hard",
                    "question": "When I reached the station the train had already left in Practice Case 139",
                    "options": [
                            "When I reached",
                            "the station",
                            "the train had already left in Practice Case 139",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. Earlier past action uses past perfect."
            },
            {
                    "id": "detecting-errors-tense-set-3-q28",
                    "topic": "Tense - Stative",
                    "difficulty": "hard",
                    "question": "He is knowing the answer in Practice Case 141",
                    "options": [
                            "He is knowing",
                            "the answer",
                            "in Practice Case 141",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "Stative verbs like ‘know’ are generally not used in continuous form. Correct: ‘He knows’."
            },
            {
                    "id": "detecting-errors-tense-set-3-q29",
                    "topic": "Tense - No Error",
                    "difficulty": "hard",
                    "question": "The clerk has been working here for five years in Practice Case 142",
                    "options": [
                            "The clerk",
                            "has been working",
                            "here for five years in Practice Case 142",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. Present perfect continuous shows an action continuing from past to present."
            },
            {
                    "id": "detecting-errors-tense-set-3-q30",
                    "topic": "Tense - Did + V1",
                    "difficulty": "hard",
                    "question": "I did not knew the answer in Practice Case 143",
                    "options": [
                            "I did not knew",
                            "the answer",
                            "in Practice Case 143",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "After ‘did not’, use base verb. Correct: ‘did not know’."
            },
            {
                    "id": "detecting-errors-tense-set-3-q31",
                    "topic": "Tense - Future",
                    "difficulty": "hard",
                    "question": "She will be reach the office before 10 a.m. in Practice Case 144",
                    "options": [
                            "She will be reach",
                            "the office",
                            "before 10 a.m. in Practice Case 144",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "Use simple future ‘will reach’, not ‘will be reach’."
            },
            {
                    "id": "detecting-errors-tense-set-3-q32",
                    "topic": "Tense - Since",
                    "difficulty": "hard",
                    "question": "I am living in Delhi since 2020 in Practice Case 145",
                    "options": [
                            "I am living",
                            "in Delhi",
                            "since 2020 in Practice Case 145",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "With ‘since’ for an action continuing to the present, use present perfect continuous: ‘have been living’."
            },
            {
                    "id": "detecting-errors-tense-set-3-q33",
                    "topic": "Tense - Present Perfect",
                    "difficulty": "hard",
                    "question": "He has completed the file yesterday in Practice Case 146",
                    "options": [
                            "He has completed",
                            "the file",
                            "yesterday in Practice Case 146",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "Present perfect is not used with definite past time like ‘yesterday’. Use simple past: ‘completed’."
            },
            {
                    "id": "detecting-errors-tense-set-3-q34",
                    "topic": "Tense - No Error",
                    "difficulty": "hard",
                    "question": "When I reached the station the train had already left in Practice Case 147",
                    "options": [
                            "When I reached",
                            "the station",
                            "the train had already left in Practice Case 147",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. Earlier past action uses past perfect."
            },
            {
                    "id": "detecting-errors-tense-set-3-q35",
                    "topic": "Tense - Stative",
                    "difficulty": "hard",
                    "question": "He is knowing the answer in Practice Case 149",
                    "options": [
                            "He is knowing",
                            "the answer",
                            "in Practice Case 149",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "Stative verbs like ‘know’ are generally not used in continuous form. Correct: ‘He knows’."
            },
            {
                    "id": "detecting-errors-tense-set-3-q36",
                    "topic": "Tense - No Error",
                    "difficulty": "hard",
                    "question": "The clerk has been working here for five years in Practice Case 150",
                    "options": [
                            "The clerk",
                            "has been working",
                            "here for five years in Practice Case 150",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. Present perfect continuous shows an action continuing from past to present."
            },
            {
                    "id": "detecting-errors-tense-set-3-q37",
                    "topic": "Tense - Did + V1",
                    "difficulty": "hard",
                    "question": "I did not knew the answer in Practice Case 151",
                    "options": [
                            "I did not knew",
                            "the answer",
                            "in Practice Case 151",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "After ‘did not’, use base verb. Correct: ‘did not know’."
            },
            {
                    "id": "detecting-errors-tense-set-3-q38",
                    "topic": "Tense - Future",
                    "difficulty": "hard",
                    "question": "She will be reach the office before 10 a.m. in Practice Case 152",
                    "options": [
                            "She will be reach",
                            "the office",
                            "before 10 a.m. in Practice Case 152",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "Use simple future ‘will reach’, not ‘will be reach’."
            },
            {
                    "id": "detecting-errors-tense-set-3-q39",
                    "topic": "Tense - Since",
                    "difficulty": "hard",
                    "question": "I am living in Indore since 2020 in Practice Case 153",
                    "options": [
                            "I am living",
                            "in Indore",
                            "since 2020 in Practice Case 153",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "With ‘since’ for an action continuing to the present, use present perfect continuous: ‘have been living’."
            },
            {
                    "id": "detecting-errors-tense-set-3-q40",
                    "topic": "Tense - Present Perfect",
                    "difficulty": "hard",
                    "question": "He has completed the letter yesterday in Practice Case 154",
                    "options": [
                            "He has completed",
                            "the letter",
                            "yesterday in Practice Case 154",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "Present perfect is not used with definite past time like ‘yesterday’. Use simple past: ‘completed’."
            },
            {
                    "id": "detecting-errors-tense-set-3-q41",
                    "topic": "Tense - No Error",
                    "difficulty": "hard",
                    "question": "When I reached the station the train had already left in Practice Case 155",
                    "options": [
                            "When I reached",
                            "the station",
                            "the train had already left in Practice Case 155",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. Earlier past action uses past perfect."
            },
            {
                    "id": "detecting-errors-tense-set-3-q42",
                    "topic": "Tense - Stative",
                    "difficulty": "hard",
                    "question": "He is knowing the answer in Practice Case 157",
                    "options": [
                            "He is knowing",
                            "the answer",
                            "in Practice Case 157",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "Stative verbs like ‘know’ are generally not used in continuous form. Correct: ‘He knows’."
            },
            {
                    "id": "detecting-errors-tense-set-3-q43",
                    "topic": "Tense - No Error",
                    "difficulty": "hard",
                    "question": "The clerk has been working here for five years in Practice Case 158",
                    "options": [
                            "The clerk",
                            "has been working",
                            "here for five years in Practice Case 158",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. Present perfect continuous shows an action continuing from past to present."
            },
            {
                    "id": "detecting-errors-tense-set-3-q44",
                    "topic": "Tense - Did + V1",
                    "difficulty": "hard",
                    "question": "I did not knew the answer in Practice Case 159",
                    "options": [
                            "I did not knew",
                            "the answer",
                            "in Practice Case 159",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "After ‘did not’, use base verb. Correct: ‘did not know’."
            },
            {
                    "id": "detecting-errors-tense-set-3-q45",
                    "topic": "Tense - Future",
                    "difficulty": "hard",
                    "question": "She will be reach the office before 10 a.m. in Practice Case 160",
                    "options": [
                            "She will be reach",
                            "the office",
                            "before 10 a.m. in Practice Case 160",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "Use simple future ‘will reach’, not ‘will be reach’."
            },
            {
                    "id": "detecting-errors-tense-set-3-q46",
                    "topic": "Tense - Since",
                    "difficulty": "hard",
                    "question": "I am living in Gurugram since 2020 in Practice Case 161",
                    "options": [
                            "I am living",
                            "in Gurugram",
                            "since 2020 in Practice Case 161",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "With ‘since’ for an action continuing to the present, use present perfect continuous: ‘have been living’."
            },
            {
                    "id": "detecting-errors-tense-set-3-q47",
                    "topic": "Tense - Present Perfect",
                    "difficulty": "hard",
                    "question": "He has completed the document yesterday in Practice Case 162",
                    "options": [
                            "He has completed",
                            "the document",
                            "yesterday in Practice Case 162",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "Present perfect is not used with definite past time like ‘yesterday’. Use simple past: ‘completed’."
            },
            {
                    "id": "detecting-errors-tense-set-3-q48",
                    "topic": "Tense - No Error",
                    "difficulty": "hard",
                    "question": "When I reached the station the train had already left in Practice Case 163",
                    "options": [
                            "When I reached",
                            "the station",
                            "the train had already left in Practice Case 163",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. Earlier past action uses past perfect."
            },
            {
                    "id": "detecting-errors-tense-set-3-q49",
                    "topic": "Tense - Stative",
                    "difficulty": "hard",
                    "question": "He is knowing the answer in Practice Case 165",
                    "options": [
                            "He is knowing",
                            "the answer",
                            "in Practice Case 165",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "Stative verbs like ‘know’ are generally not used in continuous form. Correct: ‘He knows’."
            },
            {
                    "id": "detecting-errors-tense-set-3-q50",
                    "topic": "Tense - No Error",
                    "difficulty": "hard",
                    "question": "The clerk has been working here for five years in Practice Case 166",
                    "options": [
                            "The clerk",
                            "has been working",
                            "here for five years in Practice Case 166",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. Present perfect continuous shows an action continuing from past to present."
            }
    ];

    window.GJU_QUIZ_BANK.push({
        id: quizId,
        subject: "English",
        title: "Detecting Errors - Tense Set 3",
        description: "50 SSC-style tense error questions with detailed explanations.",
        durationMinutes: 30,
        totalQuestions: questions.length,
        marksPerQuestion: 1,
        negativeMarks: 0.25,
        difficulty: "Hard",
        tags: ["SSC", "Railway", "Police", "English", "Detecting Errors"],
        questions
    });
}());
