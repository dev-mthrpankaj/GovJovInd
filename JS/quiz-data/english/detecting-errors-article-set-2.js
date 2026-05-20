(function () {
    "use strict";

    window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];

    const quizId = "detecting-errors-article-set-2";

    const questions = [
            {
                    "id": "detecting-errors-article-set-2-q01",
                    "topic": "Article - Institution",
                    "difficulty": "hard",
                    "question": "Varun joined army after graduation in Practice Case 51",
                    "options": [
                            "Varun joined",
                            "army",
                            "after graduation in Practice Case 51",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Organized services such as army/police usually take ‘the’. Correct: ‘joined the army’."
            },
            {
                    "id": "detecting-errors-article-set-2-q02",
                    "topic": "Article - No Error",
                    "difficulty": "hard",
                    "question": "The notice was published on the official website in Practice Case 52",
                    "options": [
                            "The notice",
                            "was published",
                            "on the official website in Practice Case 52",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct because ‘the’ refers to a specific item already known in context."
            },
            {
                    "id": "detecting-errors-article-set-2-q03",
                    "topic": "Article - Superlative",
                    "difficulty": "hard",
                    "question": "Suresh is best candidate in the batch for Practice Case 53",
                    "options": [
                            "Suresh is",
                            "best candidate",
                            "in the batch for Practice Case 53",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Superlative adjectives generally take ‘the’. Correct: ‘the best candidate’."
            },
            {
                    "id": "detecting-errors-article-set-2-q04",
                    "topic": "Article - Abbreviation Sound",
                    "difficulty": "hard",
                    "question": "She filed a FIR after the incident in Prayagraj",
                    "options": [
                            "She filed",
                            "a FIR",
                            "after the incident in Prayagraj",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘FIR’ starts with the vowel sound ‘eff’, so use ‘an FIR’."
            },
            {
                    "id": "detecting-errors-article-set-2-q05",
                    "topic": "Article - The + Adjective",
                    "difficulty": "hard",
                    "question": "The poor need support during difficult times in Practice Case 55",
                    "options": [
                            "The poor",
                            "need support",
                            "during difficult times in Practice Case 55",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘The + adjective’ can denote a class and takes plural meaning."
            },
            {
                    "id": "detecting-errors-article-set-2-q06",
                    "topic": "Article - No Error",
                    "difficulty": "hard",
                    "question": "He read the Ramayana during vacation in Practice Case 56",
                    "options": [
                            "He read",
                            "the Ramayana",
                            "during vacation in Practice Case 56",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. Names of holy books/epics commonly take ‘the’."
            },
            {
                    "id": "detecting-errors-article-set-2-q07",
                    "topic": "Article - A/An",
                    "difficulty": "hard",
                    "question": "Manoj is an university student preparing for Delhi Police",
                    "options": [
                            "Manoj is",
                            "an university student",
                            "preparing for Delhi Police",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Article depends on sound. ‘University’ begins with /juː/, so use ‘a university’."
            },
            {
                    "id": "detecting-errors-article-set-2-q08",
                    "topic": "Article - Silent H",
                    "difficulty": "hard",
                    "question": "He is a honest officer posted in Agra",
                    "options": [
                            "He is",
                            "a honest officer",
                            "posted in Agra",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Honest’ begins with a vowel sound because ‘h’ is silent. Correct: ‘an honest officer’."
            },
            {
                    "id": "detecting-errors-article-set-2-q09",
                    "topic": "Article - Institution",
                    "difficulty": "hard",
                    "question": "Harish joined army after graduation in Practice Case 59",
                    "options": [
                            "Harish joined",
                            "army",
                            "after graduation in Practice Case 59",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Organized services such as army/police usually take ‘the’. Correct: ‘joined the army’."
            },
            {
                    "id": "detecting-errors-article-set-2-q10",
                    "topic": "Article - No Error",
                    "difficulty": "hard",
                    "question": "The presentation was published on the official website in Practice Case 60",
                    "options": [
                            "The presentation",
                            "was published",
                            "on the official website in Practice Case 60",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct because ‘the’ refers to a specific item already known in context."
            },
            {
                    "id": "detecting-errors-article-set-2-q11",
                    "topic": "Article - Superlative",
                    "difficulty": "hard",
                    "question": "Aarav is best candidate in the batch for Practice Case 61",
                    "options": [
                            "Aarav is",
                            "best candidate",
                            "in the batch for Practice Case 61",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Superlative adjectives generally take ‘the’. Correct: ‘the best candidate’."
            },
            {
                    "id": "detecting-errors-article-set-2-q12",
                    "topic": "Article - Abbreviation Sound",
                    "difficulty": "hard",
                    "question": "She filed a FIR after the incident in Bhopal",
                    "options": [
                            "She filed",
                            "a FIR",
                            "after the incident in Bhopal",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘FIR’ starts with the vowel sound ‘eff’, so use ‘an FIR’."
            },
            {
                    "id": "detecting-errors-article-set-2-q13",
                    "topic": "Article - The + Adjective",
                    "difficulty": "hard",
                    "question": "The poor need support during difficult times in Practice Case 63",
                    "options": [
                            "The poor",
                            "need support",
                            "during difficult times in Practice Case 63",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘The + adjective’ can denote a class and takes plural meaning."
            },
            {
                    "id": "detecting-errors-article-set-2-q14",
                    "topic": "Article - No Error",
                    "difficulty": "hard",
                    "question": "He read the Ramayana during vacation in Practice Case 64",
                    "options": [
                            "He read",
                            "the Ramayana",
                            "during vacation in Practice Case 64",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. Names of holy books/epics commonly take ‘the’."
            },
            {
                    "id": "detecting-errors-article-set-2-q15",
                    "topic": "Article - A/An",
                    "difficulty": "hard",
                    "question": "Karan is an university student preparing for CHSL",
                    "options": [
                            "Karan is",
                            "an university student",
                            "preparing for CHSL",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Article depends on sound. ‘University’ begins with /juː/, so use ‘a university’."
            },
            {
                    "id": "detecting-errors-article-set-2-q16",
                    "topic": "Article - Silent H",
                    "difficulty": "hard",
                    "question": "He is a honest officer posted in Pune",
                    "options": [
                            "He is",
                            "a honest officer",
                            "posted in Pune",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Honest’ begins with a vowel sound because ‘h’ is silent. Correct: ‘an honest officer’."
            },
            {
                    "id": "detecting-errors-article-set-2-q17",
                    "topic": "Article - Institution",
                    "difficulty": "hard",
                    "question": "Vivek joined army after graduation in Practice Case 67",
                    "options": [
                            "Vivek joined",
                            "army",
                            "after graduation in Practice Case 67",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Organized services such as army/police usually take ‘the’. Correct: ‘joined the army’."
            },
            {
                    "id": "detecting-errors-article-set-2-q18",
                    "topic": "Article - No Error",
                    "difficulty": "hard",
                    "question": "The summary was published on the official website in Practice Case 68",
                    "options": [
                            "The summary",
                            "was published",
                            "on the official website in Practice Case 68",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct because ‘the’ refers to a specific item already known in context."
            },
            {
                    "id": "detecting-errors-article-set-2-q19",
                    "topic": "Article - Superlative",
                    "difficulty": "hard",
                    "question": "Rohan is best candidate in the batch for Practice Case 69",
                    "options": [
                            "Rohan is",
                            "best candidate",
                            "in the batch for Practice Case 69",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Superlative adjectives generally take ‘the’. Correct: ‘the best candidate’."
            },
            {
                    "id": "detecting-errors-article-set-2-q20",
                    "topic": "Article - Abbreviation Sound",
                    "difficulty": "hard",
                    "question": "She filed a FIR after the incident in Noida",
                    "options": [
                            "She filed",
                            "a FIR",
                            "after the incident in Noida",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘FIR’ starts with the vowel sound ‘eff’, so use ‘an FIR’."
            },
            {
                    "id": "detecting-errors-article-set-2-q21",
                    "topic": "Article - The + Adjective",
                    "difficulty": "hard",
                    "question": "The poor need support during difficult times in Practice Case 71",
                    "options": [
                            "The poor",
                            "need support",
                            "during difficult times in Practice Case 71",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘The + adjective’ can denote a class and takes plural meaning."
            },
            {
                    "id": "detecting-errors-article-set-2-q22",
                    "topic": "Article - No Error",
                    "difficulty": "hard",
                    "question": "He read the Ramayana during vacation in Practice Case 72",
                    "options": [
                            "He read",
                            "the Ramayana",
                            "during vacation in Practice Case 72",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. Names of holy books/epics commonly take ‘the’."
            },
            {
                    "id": "detecting-errors-article-set-2-q23",
                    "topic": "Article - A/An",
                    "difficulty": "hard",
                    "question": "Amit is an university student preparing for Railway Group D",
                    "options": [
                            "Amit is",
                            "an university student",
                            "preparing for Railway Group D",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Article depends on sound. ‘University’ begins with /juː/, so use ‘a university’."
            },
            {
                    "id": "detecting-errors-article-set-2-q24",
                    "topic": "Article - Institution",
                    "difficulty": "hard",
                    "question": "Deepak joined army after graduation in Practice Case 75",
                    "options": [
                            "Deepak joined",
                            "army",
                            "after graduation in Practice Case 75",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Organized services such as army/police usually take ‘the’. Correct: ‘joined the army’."
            },
            {
                    "id": "detecting-errors-article-set-2-q25",
                    "topic": "Article - No Error",
                    "difficulty": "hard",
                    "question": "The report was published on the official website in Practice Case 76",
                    "options": [
                            "The report",
                            "was published",
                            "on the official website in Practice Case 76",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct because ‘the’ refers to a specific item already known in context."
            },
            {
                    "id": "detecting-errors-article-set-2-q26",
                    "topic": "Article - Superlative",
                    "difficulty": "hard",
                    "question": "Rahul is best candidate in the batch for Practice Case 77",
                    "options": [
                            "Rahul is",
                            "best candidate",
                            "in the batch for Practice Case 77",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Superlative adjectives generally take ‘the’. Correct: ‘the best candidate’."
            },
            {
                    "id": "detecting-errors-article-set-2-q27",
                    "topic": "Article - The + Adjective",
                    "difficulty": "hard",
                    "question": "The poor need support during difficult times in Practice Case 79",
                    "options": [
                            "The poor",
                            "need support",
                            "during difficult times in Practice Case 79",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘The + adjective’ can denote a class and takes plural meaning."
            },
            {
                    "id": "detecting-errors-article-set-2-q28",
                    "topic": "Article - No Error",
                    "difficulty": "hard",
                    "question": "He read the Ramayana during vacation in Practice Case 80",
                    "options": [
                            "He read",
                            "the Ramayana",
                            "during vacation in Practice Case 80",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. Names of holy books/epics commonly take ‘the’."
            },
            {
                    "id": "detecting-errors-article-set-2-q29",
                    "topic": "Article - A/An",
                    "difficulty": "hard",
                    "question": "Varun is an university student preparing for SSC CGL",
                    "options": [
                            "Varun is",
                            "an university student",
                            "preparing for SSC CGL",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Article depends on sound. ‘University’ begins with /juː/, so use ‘a university’."
            },
            {
                    "id": "detecting-errors-article-set-2-q30",
                    "topic": "Article - Institution",
                    "difficulty": "hard",
                    "question": "Suresh joined army after graduation in Practice Case 83",
                    "options": [
                            "Suresh joined",
                            "army",
                            "after graduation in Practice Case 83",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Organized services such as army/police usually take ‘the’. Correct: ‘joined the army’."
            },
            {
                    "id": "detecting-errors-article-set-2-q31",
                    "topic": "Article - No Error",
                    "difficulty": "hard",
                    "question": "The speech was published on the official website in Practice Case 84",
                    "options": [
                            "The speech",
                            "was published",
                            "on the official website in Practice Case 84",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct because ‘the’ refers to a specific item already known in context."
            },
            {
                    "id": "detecting-errors-article-set-2-q32",
                    "topic": "Article - Superlative",
                    "difficulty": "hard",
                    "question": "Akash is best candidate in the batch for Practice Case 85",
                    "options": [
                            "Akash is",
                            "best candidate",
                            "in the batch for Practice Case 85",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Superlative adjectives generally take ‘the’. Correct: ‘the best candidate’."
            },
            {
                    "id": "detecting-errors-article-set-2-q33",
                    "topic": "Article - The + Adjective",
                    "difficulty": "hard",
                    "question": "The poor need support during difficult times in Practice Case 87",
                    "options": [
                            "The poor",
                            "need support",
                            "during difficult times in Practice Case 87",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘The + adjective’ can denote a class and takes plural meaning."
            },
            {
                    "id": "detecting-errors-article-set-2-q34",
                    "topic": "Article - No Error",
                    "difficulty": "hard",
                    "question": "He read the Ramayana during vacation in Practice Case 88",
                    "options": [
                            "He read",
                            "the Ramayana",
                            "during vacation in Practice Case 88",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. Names of holy books/epics commonly take ‘the’."
            },
            {
                    "id": "detecting-errors-article-set-2-q35",
                    "topic": "Article - A/An",
                    "difficulty": "hard",
                    "question": "Harish is an university student preparing for Stenographer",
                    "options": [
                            "Harish is",
                            "an university student",
                            "preparing for Stenographer",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Article depends on sound. ‘University’ begins with /juː/, so use ‘a university’."
            },
            {
                    "id": "detecting-errors-article-set-2-q36",
                    "topic": "Article - Institution",
                    "difficulty": "hard",
                    "question": "Aarav joined army after graduation in Practice Case 91",
                    "options": [
                            "Aarav joined",
                            "army",
                            "after graduation in Practice Case 91",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Organized services such as army/police usually take ‘the’. Correct: ‘joined the army’."
            },
            {
                    "id": "detecting-errors-article-set-2-q37",
                    "topic": "Article - No Error",
                    "difficulty": "hard",
                    "question": "The application was published on the official website in Practice Case 92",
                    "options": [
                            "The application",
                            "was published",
                            "on the official website in Practice Case 92",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct because ‘the’ refers to a specific item already known in context."
            },
            {
                    "id": "detecting-errors-article-set-2-q38",
                    "topic": "Article - Superlative",
                    "difficulty": "hard",
                    "question": "Mohit is best candidate in the batch for Practice Case 93",
                    "options": [
                            "Mohit is",
                            "best candidate",
                            "in the batch for Practice Case 93",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Superlative adjectives generally take ‘the’. Correct: ‘the best candidate’."
            },
            {
                    "id": "detecting-errors-article-set-2-q39",
                    "topic": "Article - The + Adjective",
                    "difficulty": "hard",
                    "question": "The poor need support during difficult times in Practice Case 95",
                    "options": [
                            "The poor",
                            "need support",
                            "during difficult times in Practice Case 95",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘The + adjective’ can denote a class and takes plural meaning."
            },
            {
                    "id": "detecting-errors-article-set-2-q40",
                    "topic": "Article - No Error",
                    "difficulty": "hard",
                    "question": "He read the Ramayana during vacation in Practice Case 96",
                    "options": [
                            "He read",
                            "the Ramayana",
                            "during vacation in Practice Case 96",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. Names of holy books/epics commonly take ‘the’."
            },
            {
                    "id": "detecting-errors-article-set-2-q41",
                    "topic": "Article - A/An",
                    "difficulty": "hard",
                    "question": "Vivek is an university student preparing for Delhi Police",
                    "options": [
                            "Vivek is",
                            "an university student",
                            "preparing for Delhi Police",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Article depends on sound. ‘University’ begins with /juː/, so use ‘a university’."
            },
            {
                    "id": "detecting-errors-article-set-2-q42",
                    "topic": "Article - Institution",
                    "difficulty": "hard",
                    "question": "Rohan joined army after graduation in Practice Case 99",
                    "options": [
                            "Rohan joined",
                            "army",
                            "after graduation in Practice Case 99",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Organized services such as army/police usually take ‘the’. Correct: ‘joined the army’."
            },
            {
                    "id": "detecting-errors-article-set-2-q43",
                    "topic": "Article - No Error",
                    "difficulty": "hard",
                    "question": "The assignment was published on the official website in Practice Case 100",
                    "options": [
                            "The assignment",
                            "was published",
                            "on the official website in Practice Case 100",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct because ‘the’ refers to a specific item already known in context."
            },
            {
                    "id": "detecting-errors-article-set-2-q44",
                    "topic": "Article - Superlative",
                    "difficulty": "hard",
                    "question": "Nikhil is best candidate in the batch for Practice Case 101",
                    "options": [
                            "Nikhil is",
                            "best candidate",
                            "in the batch for Practice Case 101",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Superlative adjectives generally take ‘the’. Correct: ‘the best candidate’."
            },
            {
                    "id": "detecting-errors-article-set-2-q45",
                    "topic": "Article - The + Adjective",
                    "difficulty": "hard",
                    "question": "The poor need support during difficult times in Practice Case 103",
                    "options": [
                            "The poor",
                            "need support",
                            "during difficult times in Practice Case 103",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘The + adjective’ can denote a class and takes plural meaning."
            },
            {
                    "id": "detecting-errors-article-set-2-q46",
                    "topic": "Article - No Error",
                    "difficulty": "hard",
                    "question": "He read the Ramayana during vacation in Practice Case 104",
                    "options": [
                            "He read",
                            "the Ramayana",
                            "during vacation in Practice Case 104",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. Names of holy books/epics commonly take ‘the’."
            },
            {
                    "id": "detecting-errors-article-set-2-q47",
                    "topic": "Article - A/An",
                    "difficulty": "hard",
                    "question": "Deepak is an university student preparing for CHSL",
                    "options": [
                            "Deepak is",
                            "an university student",
                            "preparing for CHSL",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Article depends on sound. ‘University’ begins with /juː/, so use ‘a university’."
            },
            {
                    "id": "detecting-errors-article-set-2-q48",
                    "topic": "Article - Institution",
                    "difficulty": "hard",
                    "question": "Rahul joined army after graduation in Practice Case 107",
                    "options": [
                            "Rahul joined",
                            "army",
                            "after graduation in Practice Case 107",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Organized services such as army/police usually take ‘the’. Correct: ‘joined the army’."
            },
            {
                    "id": "detecting-errors-article-set-2-q49",
                    "topic": "Article - No Error",
                    "difficulty": "hard",
                    "question": "The project was published on the official website in Practice Case 108",
                    "options": [
                            "The project",
                            "was published",
                            "on the official website in Practice Case 108",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct because ‘the’ refers to a specific item already known in context."
            },
            {
                    "id": "detecting-errors-article-set-2-q50",
                    "topic": "Article - Superlative",
                    "difficulty": "hard",
                    "question": "Gaurav is best candidate in the batch for Practice Case 109",
                    "options": [
                            "Gaurav is",
                            "best candidate",
                            "in the batch for Practice Case 109",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Superlative adjectives generally take ‘the’. Correct: ‘the best candidate’."
            }
    ];

    window.GJU_QUIZ_BANK.push({
        id: quizId,
        subject: "English",
        title: "Detecting Errors - Article Set 2",
        description: "50 advanced article detecting error questions for SSC, Railway, Police and other exams.",
        durationMinutes: 30,
        totalQuestions: questions.length,
        marksPerQuestion: 1,
        negativeMarks: 0.25,
        difficulty: "Hard",
        tags: ["SSC", "Railway", "Police", "English", "Detecting Errors"],
        questions
    });
}());
