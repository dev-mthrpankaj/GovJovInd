(function () {
    "use strict";

    window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];

    const quizId = "detecting-errors-adjective-set-3";

    const questions = [
            {
                    "id": "detecting-errors-adjective-set-3-q01",
                    "topic": "Adjective - Quantifier",
                    "difficulty": "hard",
                    "question": "He gave me many scenery during Practice Case 58",
                    "options": [
                            "He gave me",
                            "many scenery",
                            "during Practice Case 58",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘scenery’ is uncountable here, so ‘many’ is wrong. Use ‘much’ or ‘a lot of’."
            },
            {
                    "id": "detecting-errors-adjective-set-3-q02",
                    "topic": "Adjective - Latin Comparative",
                    "difficulty": "hard",
                    "question": "Harish is senior than me in Practice Case 59",
                    "options": [
                            "Harish is",
                            "senior than me",
                            "in Practice Case 59",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Senior’ takes ‘to’, not ‘than’. Correct phrase: ‘senior to me’."
            },
            {
                    "id": "detecting-errors-adjective-set-3-q03",
                    "topic": "Adjective - Double Comparative",
                    "difficulty": "hard",
                    "question": "Aarav is more wiser than his classmates in Practice Case 61",
                    "options": [
                            "Aarav is",
                            "more wiser than",
                            "his classmates in Practice Case 61",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Wiser’ is already comparative; ‘more wiser’ is a double comparative. Correct phrase: ‘wiser than’."
            },
            {
                    "id": "detecting-errors-adjective-set-3-q04",
                    "topic": "Adjective - Logical Comparison",
                    "difficulty": "hard",
                    "question": "The climate of Bhopal is cooler than Varanasi in Practice Case 62",
                    "options": [
                            "The climate of Bhopal",
                            "is cooler",
                            "than Varanasi in Practice Case 62",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "Compare climate with climate, not with a place. Correct phrase: ‘than that of Varanasi’."
            },
            {
                    "id": "detecting-errors-adjective-set-3-q05",
                    "topic": "Adjective - Order of Adjectives",
                    "difficulty": "hard",
                    "question": "He bought a black small bag for Practice Case 63",
                    "options": [
                            "He bought",
                            "a black small bag",
                            "for Practice Case 63",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Adjective order normally places size before colour. Correct phrase: ‘a small black bag’."
            },
            {
                    "id": "detecting-errors-adjective-set-3-q06",
                    "topic": "Adjective - Few/Little",
                    "difficulty": "hard",
                    "question": "Only little questions were ready for Practice Case 64",
                    "options": [
                            "Only little questions",
                            "were ready",
                            "for Practice Case 64",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "‘questions’ is plural countable; use ‘few/a few’, not ‘little’. Correct phrase: ‘Only a few questions’."
            },
            {
                    "id": "detecting-errors-adjective-set-3-q07",
                    "topic": "Adjective - Absolute Adjective",
                    "difficulty": "hard",
                    "question": "This is the most unique method in Practice Case 65",
                    "options": [
                            "This is",
                            "the most unique method",
                            "in Practice Case 65",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Unique’ is absolute in meaning; avoid ‘most unique’. Correct phrase: ‘a unique method’."
            },
            {
                    "id": "detecting-errors-adjective-set-3-q08",
                    "topic": "Adjective - Distributive",
                    "difficulty": "hard",
                    "question": "Every mistakes must carry the admit card in Practice Case 67",
                    "options": [
                            "Every mistakes",
                            "must carry",
                            "the admit card in Practice Case 67",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "‘Every’ is followed by a singular countable noun. Correct: ‘Every student/candidate’."
            },
            {
                    "id": "detecting-errors-adjective-set-3-q09",
                    "topic": "Adjective - Quantifier",
                    "difficulty": "hard",
                    "question": "He gave me many evidence during Practice Case 68",
                    "options": [
                            "He gave me",
                            "many evidence",
                            "during Practice Case 68",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘evidence’ is uncountable here, so ‘many’ is wrong. Use ‘much’ or ‘a lot of’."
            },
            {
                    "id": "detecting-errors-adjective-set-3-q10",
                    "topic": "Adjective - Latin Comparative",
                    "difficulty": "hard",
                    "question": "Rohan is senior than me in Practice Case 69",
                    "options": [
                            "Rohan is",
                            "senior than me",
                            "in Practice Case 69",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Senior’ takes ‘to’, not ‘than’. Correct phrase: ‘senior to me’."
            },
            {
                    "id": "detecting-errors-adjective-set-3-q11",
                    "topic": "Adjective - Double Comparative",
                    "difficulty": "hard",
                    "question": "Nikhil is more wiser than his classmates in Practice Case 71",
                    "options": [
                            "Nikhil is",
                            "more wiser than",
                            "his classmates in Practice Case 71",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Wiser’ is already comparative; ‘more wiser’ is a double comparative. Correct phrase: ‘wiser than’."
            },
            {
                    "id": "detecting-errors-adjective-set-3-q12",
                    "topic": "Adjective - Logical Comparison",
                    "difficulty": "hard",
                    "question": "The climate of Prayagraj is cooler than Kanpur in Practice Case 72",
                    "options": [
                            "The climate of Prayagraj",
                            "is cooler",
                            "than Kanpur in Practice Case 72",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "Compare climate with climate, not with a place. Correct phrase: ‘than that of Kanpur’."
            },
            {
                    "id": "detecting-errors-adjective-set-3-q13",
                    "topic": "Adjective - Order of Adjectives",
                    "difficulty": "hard",
                    "question": "He bought a black small bag for Practice Case 73",
                    "options": [
                            "He bought",
                            "a black small bag",
                            "for Practice Case 73",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Adjective order normally places size before colour. Correct phrase: ‘a small black bag’."
            },
            {
                    "id": "detecting-errors-adjective-set-3-q14",
                    "topic": "Adjective - Few/Little",
                    "difficulty": "hard",
                    "question": "Only little candidates were ready for Practice Case 74",
                    "options": [
                            "Only little candidates",
                            "were ready",
                            "for Practice Case 74",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "‘candidates’ is plural countable; use ‘few/a few’, not ‘little’. Correct phrase: ‘Only a few candidates’."
            },
            {
                    "id": "detecting-errors-adjective-set-3-q15",
                    "topic": "Adjective - Absolute Adjective",
                    "difficulty": "hard",
                    "question": "This is the most unique method in Practice Case 75",
                    "options": [
                            "This is",
                            "the most unique method",
                            "in Practice Case 75",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Unique’ is absolute in meaning; avoid ‘most unique’. Correct phrase: ‘a unique method’."
            },
            {
                    "id": "detecting-errors-adjective-set-3-q16",
                    "topic": "Adjective - Distributive",
                    "difficulty": "hard",
                    "question": "Every officers must carry the admit card in Practice Case 77",
                    "options": [
                            "Every officers",
                            "must carry",
                            "the admit card in Practice Case 77",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "‘Every’ is followed by a singular countable noun. Correct: ‘Every student/candidate’."
            },
            {
                    "id": "detecting-errors-adjective-set-3-q17",
                    "topic": "Adjective - Quantifier",
                    "difficulty": "hard",
                    "question": "He gave me many homework during Practice Case 78",
                    "options": [
                            "He gave me",
                            "many homework",
                            "during Practice Case 78",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘homework’ is uncountable here, so ‘many’ is wrong. Use ‘much’ or ‘a lot of’."
            },
            {
                    "id": "detecting-errors-adjective-set-3-q18",
                    "topic": "Adjective - Latin Comparative",
                    "difficulty": "hard",
                    "question": "Gaurav is senior than me in Practice Case 79",
                    "options": [
                            "Gaurav is",
                            "senior than me",
                            "in Practice Case 79",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Senior’ takes ‘to’, not ‘than’. Correct phrase: ‘senior to me’."
            },
            {
                    "id": "detecting-errors-adjective-set-3-q19",
                    "topic": "Adjective - Double Comparative",
                    "difficulty": "hard",
                    "question": "Varun is more wiser than his classmates in Practice Case 81",
                    "options": [
                            "Varun is",
                            "more wiser than",
                            "his classmates in Practice Case 81",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Wiser’ is already comparative; ‘more wiser’ is a double comparative. Correct phrase: ‘wiser than’."
            },
            {
                    "id": "detecting-errors-adjective-set-3-q20",
                    "topic": "Adjective - Logical Comparison",
                    "difficulty": "hard",
                    "question": "The climate of Kolkata is cooler than Gurugram in Practice Case 82",
                    "options": [
                            "The climate of Kolkata",
                            "is cooler",
                            "than Gurugram in Practice Case 82",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "Compare climate with climate, not with a place. Correct phrase: ‘than that of Gurugram’."
            },
            {
                    "id": "detecting-errors-adjective-set-3-q21",
                    "topic": "Adjective - Order of Adjectives",
                    "difficulty": "hard",
                    "question": "He bought a black small bag for Practice Case 83",
                    "options": [
                            "He bought",
                            "a black small bag",
                            "for Practice Case 83",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Adjective order normally places size before colour. Correct phrase: ‘a small black bag’."
            },
            {
                    "id": "detecting-errors-adjective-set-3-q22",
                    "topic": "Adjective - Few/Little",
                    "difficulty": "hard",
                    "question": "Only little teachers were ready for Practice Case 84",
                    "options": [
                            "Only little teachers",
                            "were ready",
                            "for Practice Case 84",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "‘teachers’ is plural countable; use ‘few/a few’, not ‘little’. Correct phrase: ‘Only a few teachers’."
            },
            {
                    "id": "detecting-errors-adjective-set-3-q23",
                    "topic": "Adjective - Absolute Adjective",
                    "difficulty": "hard",
                    "question": "This is the most unique method in Practice Case 85",
                    "options": [
                            "This is",
                            "the most unique method",
                            "in Practice Case 85",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Unique’ is absolute in meaning; avoid ‘most unique’. Correct phrase: ‘a unique method’."
            },
            {
                    "id": "detecting-errors-adjective-set-3-q24",
                    "topic": "Adjective - Distributive",
                    "difficulty": "hard",
                    "question": "Every books must carry the admit card in Practice Case 87",
                    "options": [
                            "Every books",
                            "must carry",
                            "the admit card in Practice Case 87",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "‘Every’ is followed by a singular countable noun. Correct: ‘Every student/candidate’."
            },
            {
                    "id": "detecting-errors-adjective-set-3-q25",
                    "topic": "Adjective - Quantifier",
                    "difficulty": "hard",
                    "question": "He gave me many equipment during Practice Case 88",
                    "options": [
                            "He gave me",
                            "many equipment",
                            "during Practice Case 88",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘equipment’ is uncountable here, so ‘many’ is wrong. Use ‘much’ or ‘a lot of’."
            },
            {
                    "id": "detecting-errors-adjective-set-3-q26",
                    "topic": "Adjective - Latin Comparative",
                    "difficulty": "hard",
                    "question": "Harish is senior than me in Practice Case 89",
                    "options": [
                            "Harish is",
                            "senior than me",
                            "in Practice Case 89",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Senior’ takes ‘to’, not ‘than’. Correct phrase: ‘senior to me’."
            },
            {
                    "id": "detecting-errors-adjective-set-3-q27",
                    "topic": "Adjective - Double Comparative",
                    "difficulty": "hard",
                    "question": "Aarav is more wiser than his classmates in Practice Case 91",
                    "options": [
                            "Aarav is",
                            "more wiser than",
                            "his classmates in Practice Case 91",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Wiser’ is already comparative; ‘more wiser’ is a double comparative. Correct phrase: ‘wiser than’."
            },
            {
                    "id": "detecting-errors-adjective-set-3-q28",
                    "topic": "Adjective - Logical Comparison",
                    "difficulty": "hard",
                    "question": "The climate of Mumbai is cooler than Indore in Practice Case 92",
                    "options": [
                            "The climate of Mumbai",
                            "is cooler",
                            "than Indore in Practice Case 92",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "Compare climate with climate, not with a place. Correct phrase: ‘than that of Indore’."
            },
            {
                    "id": "detecting-errors-adjective-set-3-q29",
                    "topic": "Adjective - Order of Adjectives",
                    "difficulty": "hard",
                    "question": "He bought a black small bag for Practice Case 93",
                    "options": [
                            "He bought",
                            "a black small bag",
                            "for Practice Case 93",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Adjective order normally places size before colour. Correct phrase: ‘a small black bag’."
            },
            {
                    "id": "detecting-errors-adjective-set-3-q30",
                    "topic": "Adjective - Few/Little",
                    "difficulty": "hard",
                    "question": "Only little workers were ready for Practice Case 94",
                    "options": [
                            "Only little workers",
                            "were ready",
                            "for Practice Case 94",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "‘workers’ is plural countable; use ‘few/a few’, not ‘little’. Correct phrase: ‘Only a few workers’."
            },
            {
                    "id": "detecting-errors-adjective-set-3-q31",
                    "topic": "Adjective - Absolute Adjective",
                    "difficulty": "hard",
                    "question": "This is the most unique method in Practice Case 95",
                    "options": [
                            "This is",
                            "the most unique method",
                            "in Practice Case 95",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Unique’ is absolute in meaning; avoid ‘most unique’. Correct phrase: ‘a unique method’."
            },
            {
                    "id": "detecting-errors-adjective-set-3-q32",
                    "topic": "Adjective - Distributive",
                    "difficulty": "hard",
                    "question": "Every students must carry the admit card in Practice Case 97",
                    "options": [
                            "Every students",
                            "must carry",
                            "the admit card in Practice Case 97",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "‘Every’ is followed by a singular countable noun. Correct: ‘Every student/candidate’."
            },
            {
                    "id": "detecting-errors-adjective-set-3-q33",
                    "topic": "Adjective - Quantifier",
                    "difficulty": "hard",
                    "question": "He gave me many advice during Practice Case 98",
                    "options": [
                            "He gave me",
                            "many advice",
                            "during Practice Case 98",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘advice’ is uncountable here, so ‘many’ is wrong. Use ‘much’ or ‘a lot of’."
            },
            {
                    "id": "detecting-errors-adjective-set-3-q34",
                    "topic": "Adjective - Latin Comparative",
                    "difficulty": "hard",
                    "question": "Rohan is senior than me in Practice Case 99",
                    "options": [
                            "Rohan is",
                            "senior than me",
                            "in Practice Case 99",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Senior’ takes ‘to’, not ‘than’. Correct phrase: ‘senior to me’."
            },
            {
                    "id": "detecting-errors-adjective-set-3-q35",
                    "topic": "Adjective - Double Comparative",
                    "difficulty": "hard",
                    "question": "Nikhil is more wiser than his classmates in Practice Case 101",
                    "options": [
                            "Nikhil is",
                            "more wiser than",
                            "his classmates in Practice Case 101",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Wiser’ is already comparative; ‘more wiser’ is a double comparative. Correct phrase: ‘wiser than’."
            },
            {
                    "id": "detecting-errors-adjective-set-3-q36",
                    "topic": "Adjective - Logical Comparison",
                    "difficulty": "hard",
                    "question": "The climate of Pune is cooler than Delhi in Practice Case 102",
                    "options": [
                            "The climate of Pune",
                            "is cooler",
                            "than Delhi in Practice Case 102",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "Compare climate with climate, not with a place. Correct phrase: ‘than that of Delhi’."
            },
            {
                    "id": "detecting-errors-adjective-set-3-q37",
                    "topic": "Adjective - Order of Adjectives",
                    "difficulty": "hard",
                    "question": "He bought a black small bag for Practice Case 103",
                    "options": [
                            "He bought",
                            "a black small bag",
                            "for Practice Case 103",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Adjective order normally places size before colour. Correct phrase: ‘a small black bag’."
            },
            {
                    "id": "detecting-errors-adjective-set-3-q38",
                    "topic": "Adjective - Few/Little",
                    "difficulty": "hard",
                    "question": "Only little answers were ready for Practice Case 104",
                    "options": [
                            "Only little answers",
                            "were ready",
                            "for Practice Case 104",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "‘answers’ is plural countable; use ‘few/a few’, not ‘little’. Correct phrase: ‘Only a few answers’."
            },
            {
                    "id": "detecting-errors-adjective-set-3-q39",
                    "topic": "Adjective - Absolute Adjective",
                    "difficulty": "hard",
                    "question": "This is the most unique method in Practice Case 105",
                    "options": [
                            "This is",
                            "the most unique method",
                            "in Practice Case 105",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Unique’ is absolute in meaning; avoid ‘most unique’. Correct phrase: ‘a unique method’."
            },
            {
                    "id": "detecting-errors-adjective-set-3-q40",
                    "topic": "Adjective - Distributive",
                    "difficulty": "hard",
                    "question": "Every players must carry the admit card in Practice Case 107",
                    "options": [
                            "Every players",
                            "must carry",
                            "the admit card in Practice Case 107",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "‘Every’ is followed by a singular countable noun. Correct: ‘Every student/candidate’."
            },
            {
                    "id": "detecting-errors-adjective-set-3-q41",
                    "topic": "Adjective - Quantifier",
                    "difficulty": "hard",
                    "question": "He gave me many work during Practice Case 108",
                    "options": [
                            "He gave me",
                            "many work",
                            "during Practice Case 108",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘work’ is uncountable here, so ‘many’ is wrong. Use ‘much’ or ‘a lot of’."
            },
            {
                    "id": "detecting-errors-adjective-set-3-q42",
                    "topic": "Adjective - Latin Comparative",
                    "difficulty": "hard",
                    "question": "Gaurav is senior than me in Practice Case 109",
                    "options": [
                            "Gaurav is",
                            "senior than me",
                            "in Practice Case 109",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Senior’ takes ‘to’, not ‘than’. Correct phrase: ‘senior to me’."
            },
            {
                    "id": "detecting-errors-adjective-set-3-q43",
                    "topic": "Adjective - Double Comparative",
                    "difficulty": "hard",
                    "question": "Varun is more wiser than his classmates in Practice Case 111",
                    "options": [
                            "Varun is",
                            "more wiser than",
                            "his classmates in Practice Case 111",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Wiser’ is already comparative; ‘more wiser’ is a double comparative. Correct phrase: ‘wiser than’."
            },
            {
                    "id": "detecting-errors-adjective-set-3-q44",
                    "topic": "Adjective - Logical Comparison",
                    "difficulty": "hard",
                    "question": "The climate of Agra is cooler than Chennai in Practice Case 112",
                    "options": [
                            "The climate of Agra",
                            "is cooler",
                            "than Chennai in Practice Case 112",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "Compare climate with climate, not with a place. Correct phrase: ‘than that of Chennai’."
            },
            {
                    "id": "detecting-errors-adjective-set-3-q45",
                    "topic": "Adjective - Order of Adjectives",
                    "difficulty": "hard",
                    "question": "He bought a black small bag for Practice Case 113",
                    "options": [
                            "He bought",
                            "a black small bag",
                            "for Practice Case 113",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Adjective order normally places size before colour. Correct phrase: ‘a small black bag’."
            },
            {
                    "id": "detecting-errors-adjective-set-3-q46",
                    "topic": "Adjective - Few/Little",
                    "difficulty": "hard",
                    "question": "Only little applications were ready for Practice Case 114",
                    "options": [
                            "Only little applications",
                            "were ready",
                            "for Practice Case 114",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "‘applications’ is plural countable; use ‘few/a few’, not ‘little’. Correct phrase: ‘Only a few applications’."
            },
            {
                    "id": "detecting-errors-adjective-set-3-q47",
                    "topic": "Adjective - Absolute Adjective",
                    "difficulty": "hard",
                    "question": "This is the most unique method in Practice Case 115",
                    "options": [
                            "This is",
                            "the most unique method",
                            "in Practice Case 115",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Unique’ is absolute in meaning; avoid ‘most unique’. Correct phrase: ‘a unique method’."
            },
            {
                    "id": "detecting-errors-adjective-set-3-q48",
                    "topic": "Adjective - Distributive",
                    "difficulty": "hard",
                    "question": "Every documents must carry the admit card in Practice Case 117",
                    "options": [
                            "Every documents",
                            "must carry",
                            "the admit card in Practice Case 117",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "‘Every’ is followed by a singular countable noun. Correct: ‘Every student/candidate’."
            },
            {
                    "id": "detecting-errors-adjective-set-3-q49",
                    "topic": "Adjective - Quantifier",
                    "difficulty": "hard",
                    "question": "He gave me many scenery during Practice Case 118",
                    "options": [
                            "He gave me",
                            "many scenery",
                            "during Practice Case 118",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘scenery’ is uncountable here, so ‘many’ is wrong. Use ‘much’ or ‘a lot of’."
            },
            {
                    "id": "detecting-errors-adjective-set-3-q50",
                    "topic": "Adjective - Latin Comparative",
                    "difficulty": "hard",
                    "question": "Harish is senior than me in Practice Case 119",
                    "options": [
                            "Harish is",
                            "senior than me",
                            "in Practice Case 119",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Senior’ takes ‘to’, not ‘than’. Correct phrase: ‘senior to me’."
            }
    ];

    window.GJU_QUIZ_BANK.push({
        id: quizId,
        subject: "English",
        title: "Detecting Errors - Adjective Set 3",
        description: "50 advanced adjective-focused detecting error questions for SSC, Railway, Police and other government exams.",
        durationMinutes: 30,
        totalQuestions: questions.length,
        marksPerQuestion: 1,
        negativeMarks: 0.25,
        difficulty: "Hard",
        tags: ["SSC", "Railway", "Police", "English", "Detecting Errors"],
        questions
    });
}());
