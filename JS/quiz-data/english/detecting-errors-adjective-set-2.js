(function () {
    "use strict";

    window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];

    const quizId = "detecting-errors-adjective-set-2";

    const questions = [
            {
                    "id": "detecting-errors-adjective-set-2-q01",
                    "topic": "Adjective - Double Comparative",
                    "difficulty": "hard",
                    "question": "Aarav is more wiser than his classmates in Practice Case 1",
                    "options": [
                            "Aarav is",
                            "more wiser than",
                            "his classmates in Practice Case 1",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Wiser’ is already comparative; ‘more wiser’ is a double comparative. Correct phrase: ‘wiser than’."
            },
            {
                    "id": "detecting-errors-adjective-set-2-q02",
                    "topic": "Adjective - Logical Comparison",
                    "difficulty": "hard",
                    "question": "The climate of Mumbai is cooler than Indore in Practice Case 2",
                    "options": [
                            "The climate of Mumbai",
                            "is cooler",
                            "than Indore in Practice Case 2",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "Compare climate with climate, not with a place. Correct phrase: ‘than that of Indore’."
            },
            {
                    "id": "detecting-errors-adjective-set-2-q03",
                    "topic": "Adjective - Order of Adjectives",
                    "difficulty": "hard",
                    "question": "He bought a black small bag for Practice Case 3",
                    "options": [
                            "He bought",
                            "a black small bag",
                            "for Practice Case 3",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Adjective order normally places size before colour. Correct phrase: ‘a small black bag’."
            },
            {
                    "id": "detecting-errors-adjective-set-2-q04",
                    "topic": "Adjective - Few/Little",
                    "difficulty": "hard",
                    "question": "Only little questions were ready for Practice Case 4",
                    "options": [
                            "Only little questions",
                            "were ready",
                            "for Practice Case 4",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "‘questions’ is plural countable; use ‘few/a few’, not ‘little’. Correct phrase: ‘Only a few questions’."
            },
            {
                    "id": "detecting-errors-adjective-set-2-q05",
                    "topic": "Adjective - Absolute Adjective",
                    "difficulty": "hard",
                    "question": "This is the most unique method in Practice Case 5",
                    "options": [
                            "This is",
                            "the most unique method",
                            "in Practice Case 5",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Unique’ is absolute in meaning; avoid ‘most unique’. Correct phrase: ‘a unique method’."
            },
            {
                    "id": "detecting-errors-adjective-set-2-q06",
                    "topic": "Adjective - Enough Position",
                    "difficulty": "hard",
                    "question": "Neha is enough confident to attempt Bank Clerk",
                    "options": [
                            "Neha is",
                            "enough confident",
                            "to attempt Bank Clerk",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Enough’ comes after adjectives. Correct phrase: ‘confident enough’."
            },
            {
                    "id": "detecting-errors-adjective-set-2-q07",
                    "topic": "Adjective - Distributive",
                    "difficulty": "hard",
                    "question": "Every mistakes must carry the admit card in Practice Case 7",
                    "options": [
                            "Every mistakes",
                            "must carry",
                            "the admit card in Practice Case 7",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "‘Every’ is followed by a singular countable noun. Correct: ‘Every student/candidate’."
            },
            {
                    "id": "detecting-errors-adjective-set-2-q08",
                    "topic": "Adjective - Quantifier",
                    "difficulty": "hard",
                    "question": "He gave me many evidence during Practice Case 8",
                    "options": [
                            "He gave me",
                            "many evidence",
                            "during Practice Case 8",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘evidence’ is uncountable here, so ‘many’ is wrong. Use ‘much’ or ‘a lot of’."
            },
            {
                    "id": "detecting-errors-adjective-set-2-q09",
                    "topic": "Adjective - Latin Comparative",
                    "difficulty": "hard",
                    "question": "Rohan is senior than me in Practice Case 9",
                    "options": [
                            "Rohan is",
                            "senior than me",
                            "in Practice Case 9",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Senior’ takes ‘to’, not ‘than’. Correct phrase: ‘senior to me’."
            },
            {
                    "id": "detecting-errors-adjective-set-2-q10",
                    "topic": "Adjective - No Error",
                    "difficulty": "hard",
                    "question": "The first three chapters are important for CDS",
                    "options": [
                            "The first three chapters",
                            "are important",
                            "for CDS",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. Ordinal + cardinal order is right in ‘first three’."
            },
            {
                    "id": "detecting-errors-adjective-set-2-q11",
                    "topic": "Adjective - Double Comparative",
                    "difficulty": "hard",
                    "question": "Nikhil is more wiser than his classmates in Practice Case 11",
                    "options": [
                            "Nikhil is",
                            "more wiser than",
                            "his classmates in Practice Case 11",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Wiser’ is already comparative; ‘more wiser’ is a double comparative. Correct phrase: ‘wiser than’."
            },
            {
                    "id": "detecting-errors-adjective-set-2-q12",
                    "topic": "Adjective - Logical Comparison",
                    "difficulty": "hard",
                    "question": "The climate of Pune is cooler than Delhi in Practice Case 12",
                    "options": [
                            "The climate of Pune",
                            "is cooler",
                            "than Delhi in Practice Case 12",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "Compare climate with climate, not with a place. Correct phrase: ‘than that of Delhi’."
            },
            {
                    "id": "detecting-errors-adjective-set-2-q13",
                    "topic": "Adjective - Order of Adjectives",
                    "difficulty": "hard",
                    "question": "He bought a black small bag for Practice Case 13",
                    "options": [
                            "He bought",
                            "a black small bag",
                            "for Practice Case 13",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Adjective order normally places size before colour. Correct phrase: ‘a small black bag’."
            },
            {
                    "id": "detecting-errors-adjective-set-2-q14",
                    "topic": "Adjective - Few/Little",
                    "difficulty": "hard",
                    "question": "Only little candidates were ready for Practice Case 14",
                    "options": [
                            "Only little candidates",
                            "were ready",
                            "for Practice Case 14",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "‘candidates’ is plural countable; use ‘few/a few’, not ‘little’. Correct phrase: ‘Only a few candidates’."
            },
            {
                    "id": "detecting-errors-adjective-set-2-q15",
                    "topic": "Adjective - Absolute Adjective",
                    "difficulty": "hard",
                    "question": "This is the most unique method in Practice Case 15",
                    "options": [
                            "This is",
                            "the most unique method",
                            "in Practice Case 15",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Unique’ is absolute in meaning; avoid ‘most unique’. Correct phrase: ‘a unique method’."
            },
            {
                    "id": "detecting-errors-adjective-set-2-q16",
                    "topic": "Adjective - Enough Position",
                    "difficulty": "hard",
                    "question": "Meera is enough confident to attempt Bank Clerk",
                    "options": [
                            "Meera is",
                            "enough confident",
                            "to attempt Bank Clerk",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Enough’ comes after adjectives. Correct phrase: ‘confident enough’."
            },
            {
                    "id": "detecting-errors-adjective-set-2-q17",
                    "topic": "Adjective - Distributive",
                    "difficulty": "hard",
                    "question": "Every officers must carry the admit card in Practice Case 17",
                    "options": [
                            "Every officers",
                            "must carry",
                            "the admit card in Practice Case 17",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "‘Every’ is followed by a singular countable noun. Correct: ‘Every student/candidate’."
            },
            {
                    "id": "detecting-errors-adjective-set-2-q18",
                    "topic": "Adjective - Quantifier",
                    "difficulty": "hard",
                    "question": "He gave me many homework during Practice Case 18",
                    "options": [
                            "He gave me",
                            "many homework",
                            "during Practice Case 18",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘homework’ is uncountable here, so ‘many’ is wrong. Use ‘much’ or ‘a lot of’."
            },
            {
                    "id": "detecting-errors-adjective-set-2-q19",
                    "topic": "Adjective - Latin Comparative",
                    "difficulty": "hard",
                    "question": "Gaurav is senior than me in Practice Case 19",
                    "options": [
                            "Gaurav is",
                            "senior than me",
                            "in Practice Case 19",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Senior’ takes ‘to’, not ‘than’. Correct phrase: ‘senior to me’."
            },
            {
                    "id": "detecting-errors-adjective-set-2-q20",
                    "topic": "Adjective - Double Comparative",
                    "difficulty": "hard",
                    "question": "Varun is more wiser than his classmates in Practice Case 21",
                    "options": [
                            "Varun is",
                            "more wiser than",
                            "his classmates in Practice Case 21",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Wiser’ is already comparative; ‘more wiser’ is a double comparative. Correct phrase: ‘wiser than’."
            },
            {
                    "id": "detecting-errors-adjective-set-2-q21",
                    "topic": "Adjective - Logical Comparison",
                    "difficulty": "hard",
                    "question": "The climate of Agra is cooler than Chennai in Practice Case 22",
                    "options": [
                            "The climate of Agra",
                            "is cooler",
                            "than Chennai in Practice Case 22",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "Compare climate with climate, not with a place. Correct phrase: ‘than that of Chennai’."
            },
            {
                    "id": "detecting-errors-adjective-set-2-q22",
                    "topic": "Adjective - Order of Adjectives",
                    "difficulty": "hard",
                    "question": "He bought a black small bag for Practice Case 23",
                    "options": [
                            "He bought",
                            "a black small bag",
                            "for Practice Case 23",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Adjective order normally places size before colour. Correct phrase: ‘a small black bag’."
            },
            {
                    "id": "detecting-errors-adjective-set-2-q23",
                    "topic": "Adjective - Few/Little",
                    "difficulty": "hard",
                    "question": "Only little teachers were ready for Practice Case 24",
                    "options": [
                            "Only little teachers",
                            "were ready",
                            "for Practice Case 24",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "‘teachers’ is plural countable; use ‘few/a few’, not ‘little’. Correct phrase: ‘Only a few teachers’."
            },
            {
                    "id": "detecting-errors-adjective-set-2-q24",
                    "topic": "Adjective - Absolute Adjective",
                    "difficulty": "hard",
                    "question": "This is the most unique method in Practice Case 25",
                    "options": [
                            "This is",
                            "the most unique method",
                            "in Practice Case 25",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Unique’ is absolute in meaning; avoid ‘most unique’. Correct phrase: ‘a unique method’."
            },
            {
                    "id": "detecting-errors-adjective-set-2-q25",
                    "topic": "Adjective - Enough Position",
                    "difficulty": "hard",
                    "question": "Nisha is enough confident to attempt Bank Clerk",
                    "options": [
                            "Nisha is",
                            "enough confident",
                            "to attempt Bank Clerk",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Enough’ comes after adjectives. Correct phrase: ‘confident enough’."
            },
            {
                    "id": "detecting-errors-adjective-set-2-q26",
                    "topic": "Adjective - Distributive",
                    "difficulty": "hard",
                    "question": "Every books must carry the admit card in Practice Case 27",
                    "options": [
                            "Every books",
                            "must carry",
                            "the admit card in Practice Case 27",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "‘Every’ is followed by a singular countable noun. Correct: ‘Every student/candidate’."
            },
            {
                    "id": "detecting-errors-adjective-set-2-q27",
                    "topic": "Adjective - Quantifier",
                    "difficulty": "hard",
                    "question": "He gave me many equipment during Practice Case 28",
                    "options": [
                            "He gave me",
                            "many equipment",
                            "during Practice Case 28",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘equipment’ is uncountable here, so ‘many’ is wrong. Use ‘much’ or ‘a lot of’."
            },
            {
                    "id": "detecting-errors-adjective-set-2-q28",
                    "topic": "Adjective - Latin Comparative",
                    "difficulty": "hard",
                    "question": "Harish is senior than me in Practice Case 29",
                    "options": [
                            "Harish is",
                            "senior than me",
                            "in Practice Case 29",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Senior’ takes ‘to’, not ‘than’. Correct phrase: ‘senior to me’."
            },
            {
                    "id": "detecting-errors-adjective-set-2-q29",
                    "topic": "Adjective - Double Comparative",
                    "difficulty": "hard",
                    "question": "Aarav is more wiser than his classmates in Practice Case 31",
                    "options": [
                            "Aarav is",
                            "more wiser than",
                            "his classmates in Practice Case 31",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Wiser’ is already comparative; ‘more wiser’ is a double comparative. Correct phrase: ‘wiser than’."
            },
            {
                    "id": "detecting-errors-adjective-set-2-q30",
                    "topic": "Adjective - Logical Comparison",
                    "difficulty": "hard",
                    "question": "The climate of Meerut is cooler than Patna in Practice Case 32",
                    "options": [
                            "The climate of Meerut",
                            "is cooler",
                            "than Patna in Practice Case 32",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "Compare climate with climate, not with a place. Correct phrase: ‘than that of Patna’."
            },
            {
                    "id": "detecting-errors-adjective-set-2-q31",
                    "topic": "Adjective - Order of Adjectives",
                    "difficulty": "hard",
                    "question": "He bought a black small bag for Practice Case 33",
                    "options": [
                            "He bought",
                            "a black small bag",
                            "for Practice Case 33",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Adjective order normally places size before colour. Correct phrase: ‘a small black bag’."
            },
            {
                    "id": "detecting-errors-adjective-set-2-q32",
                    "topic": "Adjective - Few/Little",
                    "difficulty": "hard",
                    "question": "Only little workers were ready for Practice Case 34",
                    "options": [
                            "Only little workers",
                            "were ready",
                            "for Practice Case 34",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "‘workers’ is plural countable; use ‘few/a few’, not ‘little’. Correct phrase: ‘Only a few workers’."
            },
            {
                    "id": "detecting-errors-adjective-set-2-q33",
                    "topic": "Adjective - Absolute Adjective",
                    "difficulty": "hard",
                    "question": "This is the most unique method in Practice Case 35",
                    "options": [
                            "This is",
                            "the most unique method",
                            "in Practice Case 35",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Unique’ is absolute in meaning; avoid ‘most unique’. Correct phrase: ‘a unique method’."
            },
            {
                    "id": "detecting-errors-adjective-set-2-q34",
                    "topic": "Adjective - Distributive",
                    "difficulty": "hard",
                    "question": "Every students must carry the admit card in Practice Case 37",
                    "options": [
                            "Every students",
                            "must carry",
                            "the admit card in Practice Case 37",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "‘Every’ is followed by a singular countable noun. Correct: ‘Every student/candidate’."
            },
            {
                    "id": "detecting-errors-adjective-set-2-q35",
                    "topic": "Adjective - Quantifier",
                    "difficulty": "hard",
                    "question": "He gave me many advice during Practice Case 38",
                    "options": [
                            "He gave me",
                            "many advice",
                            "during Practice Case 38",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘advice’ is uncountable here, so ‘many’ is wrong. Use ‘much’ or ‘a lot of’."
            },
            {
                    "id": "detecting-errors-adjective-set-2-q36",
                    "topic": "Adjective - Latin Comparative",
                    "difficulty": "hard",
                    "question": "Rohan is senior than me in Practice Case 39",
                    "options": [
                            "Rohan is",
                            "senior than me",
                            "in Practice Case 39",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Senior’ takes ‘to’, not ‘than’. Correct phrase: ‘senior to me’."
            },
            {
                    "id": "detecting-errors-adjective-set-2-q37",
                    "topic": "Adjective - Double Comparative",
                    "difficulty": "hard",
                    "question": "Nikhil is more wiser than his classmates in Practice Case 41",
                    "options": [
                            "Nikhil is",
                            "more wiser than",
                            "his classmates in Practice Case 41",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Wiser’ is already comparative; ‘more wiser’ is a double comparative. Correct phrase: ‘wiser than’."
            },
            {
                    "id": "detecting-errors-adjective-set-2-q38",
                    "topic": "Adjective - Logical Comparison",
                    "difficulty": "hard",
                    "question": "The climate of Lucknow is cooler than Gwalior in Practice Case 42",
                    "options": [
                            "The climate of Lucknow",
                            "is cooler",
                            "than Gwalior in Practice Case 42",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "Compare climate with climate, not with a place. Correct phrase: ‘than that of Gwalior’."
            },
            {
                    "id": "detecting-errors-adjective-set-2-q39",
                    "topic": "Adjective - Order of Adjectives",
                    "difficulty": "hard",
                    "question": "He bought a black small bag for Practice Case 43",
                    "options": [
                            "He bought",
                            "a black small bag",
                            "for Practice Case 43",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Adjective order normally places size before colour. Correct phrase: ‘a small black bag’."
            },
            {
                    "id": "detecting-errors-adjective-set-2-q40",
                    "topic": "Adjective - Few/Little",
                    "difficulty": "hard",
                    "question": "Only little answers were ready for Practice Case 44",
                    "options": [
                            "Only little answers",
                            "were ready",
                            "for Practice Case 44",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "‘answers’ is plural countable; use ‘few/a few’, not ‘little’. Correct phrase: ‘Only a few answers’."
            },
            {
                    "id": "detecting-errors-adjective-set-2-q41",
                    "topic": "Adjective - Absolute Adjective",
                    "difficulty": "hard",
                    "question": "This is the most unique method in Practice Case 45",
                    "options": [
                            "This is",
                            "the most unique method",
                            "in Practice Case 45",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Unique’ is absolute in meaning; avoid ‘most unique’. Correct phrase: ‘a unique method’."
            },
            {
                    "id": "detecting-errors-adjective-set-2-q42",
                    "topic": "Adjective - Distributive",
                    "difficulty": "hard",
                    "question": "Every players must carry the admit card in Practice Case 47",
                    "options": [
                            "Every players",
                            "must carry",
                            "the admit card in Practice Case 47",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "‘Every’ is followed by a singular countable noun. Correct: ‘Every student/candidate’."
            },
            {
                    "id": "detecting-errors-adjective-set-2-q43",
                    "topic": "Adjective - Quantifier",
                    "difficulty": "hard",
                    "question": "He gave me many work during Practice Case 48",
                    "options": [
                            "He gave me",
                            "many work",
                            "during Practice Case 48",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘work’ is uncountable here, so ‘many’ is wrong. Use ‘much’ or ‘a lot of’."
            },
            {
                    "id": "detecting-errors-adjective-set-2-q44",
                    "topic": "Adjective - Latin Comparative",
                    "difficulty": "hard",
                    "question": "Gaurav is senior than me in Practice Case 49",
                    "options": [
                            "Gaurav is",
                            "senior than me",
                            "in Practice Case 49",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Senior’ takes ‘to’, not ‘than’. Correct phrase: ‘senior to me’."
            },
            {
                    "id": "detecting-errors-adjective-set-2-q45",
                    "topic": "Adjective - Double Comparative",
                    "difficulty": "hard",
                    "question": "Varun is more wiser than his classmates in Practice Case 51",
                    "options": [
                            "Varun is",
                            "more wiser than",
                            "his classmates in Practice Case 51",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Wiser’ is already comparative; ‘more wiser’ is a double comparative. Correct phrase: ‘wiser than’."
            },
            {
                    "id": "detecting-errors-adjective-set-2-q46",
                    "topic": "Adjective - Logical Comparison",
                    "difficulty": "hard",
                    "question": "The climate of Noida is cooler than Jaipur in Practice Case 52",
                    "options": [
                            "The climate of Noida",
                            "is cooler",
                            "than Jaipur in Practice Case 52",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "Compare climate with climate, not with a place. Correct phrase: ‘than that of Jaipur’."
            },
            {
                    "id": "detecting-errors-adjective-set-2-q47",
                    "topic": "Adjective - Order of Adjectives",
                    "difficulty": "hard",
                    "question": "He bought a black small bag for Practice Case 53",
                    "options": [
                            "He bought",
                            "a black small bag",
                            "for Practice Case 53",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Adjective order normally places size before colour. Correct phrase: ‘a small black bag’."
            },
            {
                    "id": "detecting-errors-adjective-set-2-q48",
                    "topic": "Adjective - Few/Little",
                    "difficulty": "hard",
                    "question": "Only little applications were ready for Practice Case 54",
                    "options": [
                            "Only little applications",
                            "were ready",
                            "for Practice Case 54",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "‘applications’ is plural countable; use ‘few/a few’, not ‘little’. Correct phrase: ‘Only a few applications’."
            },
            {
                    "id": "detecting-errors-adjective-set-2-q49",
                    "topic": "Adjective - Absolute Adjective",
                    "difficulty": "hard",
                    "question": "This is the most unique method in Practice Case 55",
                    "options": [
                            "This is",
                            "the most unique method",
                            "in Practice Case 55",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Unique’ is absolute in meaning; avoid ‘most unique’. Correct phrase: ‘a unique method’."
            },
            {
                    "id": "detecting-errors-adjective-set-2-q50",
                    "topic": "Adjective - Distributive",
                    "difficulty": "hard",
                    "question": "Every documents must carry the admit card in Practice Case 57",
                    "options": [
                            "Every documents",
                            "must carry",
                            "the admit card in Practice Case 57",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "‘Every’ is followed by a singular countable noun. Correct: ‘Every student/candidate’."
            }
    ];

    window.GJU_QUIZ_BANK.push({
        id: quizId,
        subject: "English",
        title: "Detecting Errors - Adjective Set 2",
        description: "50 adjective-focused detecting error questions for SSC, Railway, Police and other government exams.",
        durationMinutes: 30,
        totalQuestions: questions.length,
        marksPerQuestion: 1,
        negativeMarks: 0.25,
        difficulty: "Hard",
        tags: ["SSC", "Railway", "Police", "English", "Detecting Errors"],
        questions
    });
}());
