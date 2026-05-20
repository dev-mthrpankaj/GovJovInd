(function () {
    "use strict";

    window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];

    const quizId = "detecting-errors-voice-narration-question-tag-set-1";

    const questions = [
            {
                    "id": "detecting-errors-voice-narration-question-tag-set-1-q01",
                    "topic": "Voice - Passive",
                    "difficulty": "hard",
                    "question": "The report has been submit by Aarav in Practice Case 1",
                    "options": [
                            "The report",
                            "has been submit",
                            "by Aarav in Practice Case 1",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "In passive voice after ‘has been’, use V3. Correct phrase: ‘has been submitted’."
            },
            {
                    "id": "detecting-errors-voice-narration-question-tag-set-1-q02",
                    "topic": "Voice - No Error",
                    "difficulty": "hard",
                    "question": "The work was completed by the clerk in Practice Case 2",
                    "options": [
                            "The work",
                            "was completed",
                            "by the clerk in Practice Case 2",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct passive voice: object + was + V3 + by + doer."
            },
            {
                    "id": "detecting-errors-voice-narration-question-tag-set-1-q03",
                    "topic": "Narration - Backshift",
                    "difficulty": "hard",
                    "question": "He said that he is preparing for Railway Group D",
                    "options": [
                            "He said",
                            "that he is",
                            "preparing for Railway Group D",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "With past reporting verb ‘said’, present continuous usually changes to past continuous: ‘he was preparing’."
            },
            {
                    "id": "detecting-errors-voice-narration-question-tag-set-1-q04",
                    "topic": "Narration - Indirect Question",
                    "difficulty": "hard",
                    "question": "The officer asked me where did I live in Agra",
                    "options": [
                            "The officer asked",
                            "me where",
                            "did I live in Agra",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "Indirect questions use statement order, not question order. Correct: ‘where I lived’."
            },
            {
                    "id": "detecting-errors-voice-narration-question-tag-set-1-q05",
                    "topic": "Question Tag",
                    "difficulty": "hard",
                    "question": "You are ready for the test are you?",
                    "options": [
                            "You are ready",
                            "for the test",
                            "are you?",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "A positive statement takes a negative tag. Correct tag: ‘aren’t you?’"
            },
            {
                    "id": "detecting-errors-voice-narration-question-tag-set-1-q06",
                    "topic": "Question Tag - No Error",
                    "difficulty": "hard",
                    "question": "Let us begin the revision shall we?",
                    "options": [
                            "Let us begin",
                            "the revision",
                            "shall we?",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. With suggestion ‘Let us’, the tag is ‘shall we?’"
            },
            {
                    "id": "detecting-errors-voice-narration-question-tag-set-1-q07",
                    "topic": "Voice - Agent",
                    "difficulty": "hard",
                    "question": "The mistake was made by carelessness in Practice Case 7",
                    "options": [
                            "The mistake",
                            "was made",
                            "by carelessness in Practice Case 7",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "‘By’ introduces an agent. For cause, use ‘because of carelessness’ or ‘through carelessness’."
            },
            {
                    "id": "detecting-errors-voice-narration-question-tag-set-1-q08",
                    "topic": "Narration - No Error",
                    "difficulty": "hard",
                    "question": "Pooja said I have completed the assignment",
                    "options": [
                            "Pooja said",
                            "I have completed",
                            "the assignment",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "As direct speech, the sentence is correct. Tense change is needed only when converting into indirect speech."
            },
            {
                    "id": "detecting-errors-voice-narration-question-tag-set-1-q09",
                    "topic": "Voice - Passive",
                    "difficulty": "hard",
                    "question": "The speech has been submit by Rohan in Practice Case 9",
                    "options": [
                            "The speech",
                            "has been submit",
                            "by Rohan in Practice Case 9",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "In passive voice after ‘has been’, use V3. Correct phrase: ‘has been submitted’."
            },
            {
                    "id": "detecting-errors-voice-narration-question-tag-set-1-q10",
                    "topic": "Voice - No Error",
                    "difficulty": "hard",
                    "question": "The work was completed by the clerk in Practice Case 10",
                    "options": [
                            "The work",
                            "was completed",
                            "by the clerk in Practice Case 10",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct passive voice: object + was + V3 + by + doer."
            },
            {
                    "id": "detecting-errors-voice-narration-question-tag-set-1-q11",
                    "topic": "Narration - Backshift",
                    "difficulty": "hard",
                    "question": "He said that he is preparing for SSC CGL",
                    "options": [
                            "He said",
                            "that he is",
                            "preparing for SSC CGL",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "With past reporting verb ‘said’, present continuous usually changes to past continuous: ‘he was preparing’."
            },
            {
                    "id": "detecting-errors-voice-narration-question-tag-set-1-q12",
                    "topic": "Narration - Indirect Question",
                    "difficulty": "hard",
                    "question": "The officer asked me where did I live in Pune",
                    "options": [
                            "The officer asked",
                            "me where",
                            "did I live in Pune",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "Indirect questions use statement order, not question order. Correct: ‘where I lived’."
            },
            {
                    "id": "detecting-errors-voice-narration-question-tag-set-1-q13",
                    "topic": "Voice - Agent",
                    "difficulty": "hard",
                    "question": "The mistake was made by carelessness in Practice Case 15",
                    "options": [
                            "The mistake",
                            "was made",
                            "by carelessness in Practice Case 15",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "‘By’ introduces an agent. For cause, use ‘because of carelessness’ or ‘through carelessness’."
            },
            {
                    "id": "detecting-errors-voice-narration-question-tag-set-1-q14",
                    "topic": "Narration - No Error",
                    "difficulty": "hard",
                    "question": "Meera said I have completed the assignment",
                    "options": [
                            "Meera said",
                            "I have completed",
                            "the assignment",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "As direct speech, the sentence is correct. Tense change is needed only when converting into indirect speech."
            },
            {
                    "id": "detecting-errors-voice-narration-question-tag-set-1-q15",
                    "topic": "Voice - Passive",
                    "difficulty": "hard",
                    "question": "The application has been submit by Rahul in Practice Case 17",
                    "options": [
                            "The application",
                            "has been submit",
                            "by Rahul in Practice Case 17",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "In passive voice after ‘has been’, use V3. Correct phrase: ‘has been submitted’."
            },
            {
                    "id": "detecting-errors-voice-narration-question-tag-set-1-q16",
                    "topic": "Voice - No Error",
                    "difficulty": "hard",
                    "question": "The work was completed by the clerk in Practice Case 18",
                    "options": [
                            "The work",
                            "was completed",
                            "by the clerk in Practice Case 18",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct passive voice: object + was + V3 + by + doer."
            },
            {
                    "id": "detecting-errors-voice-narration-question-tag-set-1-q17",
                    "topic": "Narration - Backshift",
                    "difficulty": "hard",
                    "question": "He said that he is preparing for Stenographer",
                    "options": [
                            "He said",
                            "that he is",
                            "preparing for Stenographer",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "With past reporting verb ‘said’, present continuous usually changes to past continuous: ‘he was preparing’."
            },
            {
                    "id": "detecting-errors-voice-narration-question-tag-set-1-q18",
                    "topic": "Narration - Indirect Question",
                    "difficulty": "hard",
                    "question": "The officer asked me where did I live in Mumbai",
                    "options": [
                            "The officer asked",
                            "me where",
                            "did I live in Mumbai",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "Indirect questions use statement order, not question order. Correct: ‘where I lived’."
            },
            {
                    "id": "detecting-errors-voice-narration-question-tag-set-1-q19",
                    "topic": "Voice - Agent",
                    "difficulty": "hard",
                    "question": "The mistake was made by carelessness in Practice Case 23",
                    "options": [
                            "The mistake",
                            "was made",
                            "by carelessness in Practice Case 23",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "‘By’ introduces an agent. For cause, use ‘because of carelessness’ or ‘through carelessness’."
            },
            {
                    "id": "detecting-errors-voice-narration-question-tag-set-1-q20",
                    "topic": "Narration - No Error",
                    "difficulty": "hard",
                    "question": "Pallavi said I have completed the assignment",
                    "options": [
                            "Pallavi said",
                            "I have completed",
                            "the assignment",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "As direct speech, the sentence is correct. Tense change is needed only when converting into indirect speech."
            },
            {
                    "id": "detecting-errors-voice-narration-question-tag-set-1-q21",
                    "topic": "Voice - Passive",
                    "difficulty": "hard",
                    "question": "The assignment has been submit by Akash in Practice Case 25",
                    "options": [
                            "The assignment",
                            "has been submit",
                            "by Akash in Practice Case 25",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "In passive voice after ‘has been’, use V3. Correct phrase: ‘has been submitted’."
            },
            {
                    "id": "detecting-errors-voice-narration-question-tag-set-1-q22",
                    "topic": "Voice - No Error",
                    "difficulty": "hard",
                    "question": "The work was completed by the clerk in Practice Case 26",
                    "options": [
                            "The work",
                            "was completed",
                            "by the clerk in Practice Case 26",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct passive voice: object + was + V3 + by + doer."
            },
            {
                    "id": "detecting-errors-voice-narration-question-tag-set-1-q23",
                    "topic": "Narration - Backshift",
                    "difficulty": "hard",
                    "question": "He said that he is preparing for Delhi Police",
                    "options": [
                            "He said",
                            "that he is",
                            "preparing for Delhi Police",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "With past reporting verb ‘said’, present continuous usually changes to past continuous: ‘he was preparing’."
            },
            {
                    "id": "detecting-errors-voice-narration-question-tag-set-1-q24",
                    "topic": "Narration - Indirect Question",
                    "difficulty": "hard",
                    "question": "The officer asked me where did I live in Kolkata",
                    "options": [
                            "The officer asked",
                            "me where",
                            "did I live in Kolkata",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "Indirect questions use statement order, not question order. Correct: ‘where I lived’."
            },
            {
                    "id": "detecting-errors-voice-narration-question-tag-set-1-q25",
                    "topic": "Voice - Agent",
                    "difficulty": "hard",
                    "question": "The mistake was made by carelessness in Practice Case 31",
                    "options": [
                            "The mistake",
                            "was made",
                            "by carelessness in Practice Case 31",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "‘By’ introduces an agent. For cause, use ‘because of carelessness’ or ‘through carelessness’."
            },
            {
                    "id": "detecting-errors-voice-narration-question-tag-set-1-q26",
                    "topic": "Narration - No Error",
                    "difficulty": "hard",
                    "question": "Ritika said I have completed the assignment",
                    "options": [
                            "Ritika said",
                            "I have completed",
                            "the assignment",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "As direct speech, the sentence is correct. Tense change is needed only when converting into indirect speech."
            },
            {
                    "id": "detecting-errors-voice-narration-question-tag-set-1-q27",
                    "topic": "Voice - Passive",
                    "difficulty": "hard",
                    "question": "The project has been submit by Mohit in Practice Case 33",
                    "options": [
                            "The project",
                            "has been submit",
                            "by Mohit in Practice Case 33",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "In passive voice after ‘has been’, use V3. Correct phrase: ‘has been submitted’."
            },
            {
                    "id": "detecting-errors-voice-narration-question-tag-set-1-q28",
                    "topic": "Voice - No Error",
                    "difficulty": "hard",
                    "question": "The work was completed by the clerk in Practice Case 34",
                    "options": [
                            "The work",
                            "was completed",
                            "by the clerk in Practice Case 34",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct passive voice: object + was + V3 + by + doer."
            },
            {
                    "id": "detecting-errors-voice-narration-question-tag-set-1-q29",
                    "topic": "Narration - Backshift",
                    "difficulty": "hard",
                    "question": "He said that he is preparing for CHSL",
                    "options": [
                            "He said",
                            "that he is",
                            "preparing for CHSL",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "With past reporting verb ‘said’, present continuous usually changes to past continuous: ‘he was preparing’."
            },
            {
                    "id": "detecting-errors-voice-narration-question-tag-set-1-q30",
                    "topic": "Narration - Indirect Question",
                    "difficulty": "hard",
                    "question": "The officer asked me where did I live in Prayagraj",
                    "options": [
                            "The officer asked",
                            "me where",
                            "did I live in Prayagraj",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "Indirect questions use statement order, not question order. Correct: ‘where I lived’."
            },
            {
                    "id": "detecting-errors-voice-narration-question-tag-set-1-q31",
                    "topic": "Voice - Agent",
                    "difficulty": "hard",
                    "question": "The mistake was made by carelessness in Practice Case 39",
                    "options": [
                            "The mistake",
                            "was made",
                            "by carelessness in Practice Case 39",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "‘By’ introduces an agent. For cause, use ‘because of carelessness’ or ‘through carelessness’."
            },
            {
                    "id": "detecting-errors-voice-narration-question-tag-set-1-q32",
                    "topic": "Narration - No Error",
                    "difficulty": "hard",
                    "question": "Anjali said I have completed the assignment",
                    "options": [
                            "Anjali said",
                            "I have completed",
                            "the assignment",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "As direct speech, the sentence is correct. Tense change is needed only when converting into indirect speech."
            },
            {
                    "id": "detecting-errors-voice-narration-question-tag-set-1-q33",
                    "topic": "Voice - Passive",
                    "difficulty": "hard",
                    "question": "The file has been submit by Nikhil in Practice Case 41",
                    "options": [
                            "The file",
                            "has been submit",
                            "by Nikhil in Practice Case 41",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "In passive voice after ‘has been’, use V3. Correct phrase: ‘has been submitted’."
            },
            {
                    "id": "detecting-errors-voice-narration-question-tag-set-1-q34",
                    "topic": "Voice - No Error",
                    "difficulty": "hard",
                    "question": "The work was completed by the clerk in Practice Case 42",
                    "options": [
                            "The work",
                            "was completed",
                            "by the clerk in Practice Case 42",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct passive voice: object + was + V3 + by + doer."
            },
            {
                    "id": "detecting-errors-voice-narration-question-tag-set-1-q35",
                    "topic": "Narration - Indirect Question",
                    "difficulty": "hard",
                    "question": "The officer asked me where did I live in Bhopal",
                    "options": [
                            "The officer asked",
                            "me where",
                            "did I live in Bhopal",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "Indirect questions use statement order, not question order. Correct: ‘where I lived’."
            },
            {
                    "id": "detecting-errors-voice-narration-question-tag-set-1-q36",
                    "topic": "Voice - Agent",
                    "difficulty": "hard",
                    "question": "The mistake was made by carelessness in Practice Case 47",
                    "options": [
                            "The mistake",
                            "was made",
                            "by carelessness in Practice Case 47",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "‘By’ introduces an agent. For cause, use ‘because of carelessness’ or ‘through carelessness’."
            },
            {
                    "id": "detecting-errors-voice-narration-question-tag-set-1-q37",
                    "topic": "Narration - No Error",
                    "difficulty": "hard",
                    "question": "Sunita said I have completed the assignment",
                    "options": [
                            "Sunita said",
                            "I have completed",
                            "the assignment",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "As direct speech, the sentence is correct. Tense change is needed only when converting into indirect speech."
            },
            {
                    "id": "detecting-errors-voice-narration-question-tag-set-1-q38",
                    "topic": "Voice - Passive",
                    "difficulty": "hard",
                    "question": "The letter has been submit by Gaurav in Practice Case 49",
                    "options": [
                            "The letter",
                            "has been submit",
                            "by Gaurav in Practice Case 49",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "In passive voice after ‘has been’, use V3. Correct phrase: ‘has been submitted’."
            },
            {
                    "id": "detecting-errors-voice-narration-question-tag-set-1-q39",
                    "topic": "Voice - No Error",
                    "difficulty": "hard",
                    "question": "The work was completed by the clerk in Practice Case 50",
                    "options": [
                            "The work",
                            "was completed",
                            "by the clerk in Practice Case 50",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct passive voice: object + was + V3 + by + doer."
            },
            {
                    "id": "detecting-errors-voice-narration-question-tag-set-1-q40",
                    "topic": "Narration - Indirect Question",
                    "difficulty": "hard",
                    "question": "The officer asked me where did I live in Noida",
                    "options": [
                            "The officer asked",
                            "me where",
                            "did I live in Noida",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "Indirect questions use statement order, not question order. Correct: ‘where I lived’."
            },
            {
                    "id": "detecting-errors-voice-narration-question-tag-set-1-q41",
                    "topic": "Voice - Agent",
                    "difficulty": "hard",
                    "question": "The mistake was made by carelessness in Practice Case 55",
                    "options": [
                            "The mistake",
                            "was made",
                            "by carelessness in Practice Case 55",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "‘By’ introduces an agent. For cause, use ‘because of carelessness’ or ‘through carelessness’."
            },
            {
                    "id": "detecting-errors-voice-narration-question-tag-set-1-q42",
                    "topic": "Narration - No Error",
                    "difficulty": "hard",
                    "question": "Nisha said I have completed the assignment",
                    "options": [
                            "Nisha said",
                            "I have completed",
                            "the assignment",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "As direct speech, the sentence is correct. Tense change is needed only when converting into indirect speech."
            },
            {
                    "id": "detecting-errors-voice-narration-question-tag-set-1-q43",
                    "topic": "Voice - Passive",
                    "difficulty": "hard",
                    "question": "The document has been submit by Manoj in Practice Case 57",
                    "options": [
                            "The document",
                            "has been submit",
                            "by Manoj in Practice Case 57",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "In passive voice after ‘has been’, use V3. Correct phrase: ‘has been submitted’."
            },
            {
                    "id": "detecting-errors-voice-narration-question-tag-set-1-q44",
                    "topic": "Voice - No Error",
                    "difficulty": "hard",
                    "question": "The work was completed by the clerk in Practice Case 58",
                    "options": [
                            "The work",
                            "was completed",
                            "by the clerk in Practice Case 58",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct passive voice: object + was + V3 + by + doer."
            },
            {
                    "id": "detecting-errors-voice-narration-question-tag-set-1-q45",
                    "topic": "Narration - Indirect Question",
                    "difficulty": "hard",
                    "question": "The officer asked me where did I live in Lucknow",
                    "options": [
                            "The officer asked",
                            "me where",
                            "did I live in Lucknow",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "Indirect questions use statement order, not question order. Correct: ‘where I lived’."
            },
            {
                    "id": "detecting-errors-voice-narration-question-tag-set-1-q46",
                    "topic": "Voice - Agent",
                    "difficulty": "hard",
                    "question": "The mistake was made by carelessness in Practice Case 63",
                    "options": [
                            "The mistake",
                            "was made",
                            "by carelessness in Practice Case 63",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "‘By’ introduces an agent. For cause, use ‘because of carelessness’ or ‘through carelessness’."
            },
            {
                    "id": "detecting-errors-voice-narration-question-tag-set-1-q47",
                    "topic": "Narration - No Error",
                    "difficulty": "hard",
                    "question": "Sanya said I have completed the assignment",
                    "options": [
                            "Sanya said",
                            "I have completed",
                            "the assignment",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "As direct speech, the sentence is correct. Tense change is needed only when converting into indirect speech."
            },
            {
                    "id": "detecting-errors-voice-narration-question-tag-set-1-q48",
                    "topic": "Voice - Passive",
                    "difficulty": "hard",
                    "question": "The proposal has been submit by Karan in Practice Case 65",
                    "options": [
                            "The proposal",
                            "has been submit",
                            "by Karan in Practice Case 65",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "In passive voice after ‘has been’, use V3. Correct phrase: ‘has been submitted’."
            },
            {
                    "id": "detecting-errors-voice-narration-question-tag-set-1-q49",
                    "topic": "Voice - No Error",
                    "difficulty": "hard",
                    "question": "The work was completed by the clerk in Practice Case 66",
                    "options": [
                            "The work",
                            "was completed",
                            "by the clerk in Practice Case 66",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct passive voice: object + was + V3 + by + doer."
            },
            {
                    "id": "detecting-errors-voice-narration-question-tag-set-1-q50",
                    "topic": "Narration - Indirect Question",
                    "difficulty": "hard",
                    "question": "The officer asked me where did I live in Meerut",
                    "options": [
                            "The officer asked",
                            "me where",
                            "did I live in Meerut",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "Indirect questions use statement order, not question order. Correct: ‘where I lived’."
            }
    ];

    window.GJU_QUIZ_BANK.push({
        id: quizId,
        subject: "English",
        title: "Detecting Errors - Voice, Narration & Question Tag Set 1",
        description: "50 detecting error questions on voice, narration and question tags.",
        durationMinutes: 30,
        totalQuestions: questions.length,
        marksPerQuestion: 1,
        negativeMarks: 0.25,
        difficulty: "Hard",
        tags: ["SSC", "Railway", "Police", "English", "Detecting Errors"],
        questions
    });
}());
