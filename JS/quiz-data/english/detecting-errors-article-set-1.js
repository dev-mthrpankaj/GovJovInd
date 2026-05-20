(function () {
    "use strict";

    window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];

    const quizId = "detecting-errors-article-set-1";

    const questions = [
            {
                    "id": "detecting-errors-article-set-1-q01",
                    "topic": "Article - A/An",
                    "difficulty": "hard",
                    "question": "Aarav is an university student preparing for SSC CGL",
                    "options": [
                            "Aarav is",
                            "an university student",
                            "preparing for SSC CGL",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Article depends on sound. ‘University’ begins with /juː/, so use ‘a university’."
            },
            {
                    "id": "detecting-errors-article-set-1-q02",
                    "topic": "Article - Silent H",
                    "difficulty": "hard",
                    "question": "He is a honest officer posted in Mumbai",
                    "options": [
                            "He is",
                            "a honest officer",
                            "posted in Mumbai",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Honest’ begins with a vowel sound because ‘h’ is silent. Correct: ‘an honest officer’."
            },
            {
                    "id": "detecting-errors-article-set-1-q03",
                    "topic": "Article - Institution",
                    "difficulty": "hard",
                    "question": "Mohit joined army after graduation in Practice Case 3",
                    "options": [
                            "Mohit joined",
                            "army",
                            "after graduation in Practice Case 3",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Organized services such as army/police usually take ‘the’. Correct: ‘joined the army’."
            },
            {
                    "id": "detecting-errors-article-set-1-q04",
                    "topic": "Article - No Error",
                    "difficulty": "hard",
                    "question": "The letter was published on the official website in Practice Case 4",
                    "options": [
                            "The letter",
                            "was published",
                            "on the official website in Practice Case 4",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct because ‘the’ refers to a specific item already known in context."
            },
            {
                    "id": "detecting-errors-article-set-1-q05",
                    "topic": "Article - Superlative",
                    "difficulty": "hard",
                    "question": "Karan is best candidate in the batch for Practice Case 5",
                    "options": [
                            "Karan is",
                            "best candidate",
                            "in the batch for Practice Case 5",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Superlative adjectives generally take ‘the’. Correct: ‘the best candidate’."
            },
            {
                    "id": "detecting-errors-article-set-1-q06",
                    "topic": "Article - Abbreviation Sound",
                    "difficulty": "hard",
                    "question": "She filed a FIR after the incident in Lucknow",
                    "options": [
                            "She filed",
                            "a FIR",
                            "after the incident in Lucknow",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘FIR’ starts with the vowel sound ‘eff’, so use ‘an FIR’."
            },
            {
                    "id": "detecting-errors-article-set-1-q07",
                    "topic": "Article - The + Adjective",
                    "difficulty": "hard",
                    "question": "The poor need support during difficult times in Practice Case 7",
                    "options": [
                            "The poor",
                            "need support",
                            "during difficult times in Practice Case 7",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘The + adjective’ can denote a class and takes plural meaning."
            },
            {
                    "id": "detecting-errors-article-set-1-q08",
                    "topic": "Article - No Error",
                    "difficulty": "hard",
                    "question": "He read the Ramayana during vacation in Practice Case 8",
                    "options": [
                            "He read",
                            "the Ramayana",
                            "during vacation in Practice Case 8",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. Names of holy books/epics commonly take ‘the’."
            },
            {
                    "id": "detecting-errors-article-set-1-q09",
                    "topic": "Article - A/An",
                    "difficulty": "hard",
                    "question": "Rohan is an university student preparing for Stenographer",
                    "options": [
                            "Rohan is",
                            "an university student",
                            "preparing for Stenographer",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Article depends on sound. ‘University’ begins with /juː/, so use ‘a university’."
            },
            {
                    "id": "detecting-errors-article-set-1-q10",
                    "topic": "Article - Silent H",
                    "difficulty": "hard",
                    "question": "He is a honest officer posted in Kolkata",
                    "options": [
                            "He is",
                            "a honest officer",
                            "posted in Kolkata",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Honest’ begins with a vowel sound because ‘h’ is silent. Correct: ‘an honest officer’."
            },
            {
                    "id": "detecting-errors-article-set-1-q11",
                    "topic": "Article - Institution",
                    "difficulty": "hard",
                    "question": "Nikhil joined army after graduation in Practice Case 11",
                    "options": [
                            "Nikhil joined",
                            "army",
                            "after graduation in Practice Case 11",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Organized services such as army/police usually take ‘the’. Correct: ‘joined the army’."
            },
            {
                    "id": "detecting-errors-article-set-1-q12",
                    "topic": "Article - No Error",
                    "difficulty": "hard",
                    "question": "The document was published on the official website in Practice Case 12",
                    "options": [
                            "The document",
                            "was published",
                            "on the official website in Practice Case 12",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct because ‘the’ refers to a specific item already known in context."
            },
            {
                    "id": "detecting-errors-article-set-1-q13",
                    "topic": "Article - Superlative",
                    "difficulty": "hard",
                    "question": "Amit is best candidate in the batch for Practice Case 13",
                    "options": [
                            "Amit is",
                            "best candidate",
                            "in the batch for Practice Case 13",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Superlative adjectives generally take ‘the’. Correct: ‘the best candidate’."
            },
            {
                    "id": "detecting-errors-article-set-1-q14",
                    "topic": "Article - Abbreviation Sound",
                    "difficulty": "hard",
                    "question": "She filed a FIR after the incident in Meerut",
                    "options": [
                            "She filed",
                            "a FIR",
                            "after the incident in Meerut",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘FIR’ starts with the vowel sound ‘eff’, so use ‘an FIR’."
            },
            {
                    "id": "detecting-errors-article-set-1-q15",
                    "topic": "Article - The + Adjective",
                    "difficulty": "hard",
                    "question": "The poor need support during difficult times in Practice Case 15",
                    "options": [
                            "The poor",
                            "need support",
                            "during difficult times in Practice Case 15",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘The + adjective’ can denote a class and takes plural meaning."
            },
            {
                    "id": "detecting-errors-article-set-1-q16",
                    "topic": "Article - No Error",
                    "difficulty": "hard",
                    "question": "He read the Ramayana during vacation in Practice Case 16",
                    "options": [
                            "He read",
                            "the Ramayana",
                            "during vacation in Practice Case 16",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. Names of holy books/epics commonly take ‘the’."
            },
            {
                    "id": "detecting-errors-article-set-1-q17",
                    "topic": "Article - A/An",
                    "difficulty": "hard",
                    "question": "Rahul is an university student preparing for Delhi Police",
                    "options": [
                            "Rahul is",
                            "an university student",
                            "preparing for Delhi Police",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Article depends on sound. ‘University’ begins with /juː/, so use ‘a university’."
            },
            {
                    "id": "detecting-errors-article-set-1-q18",
                    "topic": "Article - Silent H",
                    "difficulty": "hard",
                    "question": "He is a honest officer posted in Prayagraj",
                    "options": [
                            "He is",
                            "a honest officer",
                            "posted in Prayagraj",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Honest’ begins with a vowel sound because ‘h’ is silent. Correct: ‘an honest officer’."
            },
            {
                    "id": "detecting-errors-article-set-1-q19",
                    "topic": "Article - Institution",
                    "difficulty": "hard",
                    "question": "Gaurav joined army after graduation in Practice Case 19",
                    "options": [
                            "Gaurav joined",
                            "army",
                            "after graduation in Practice Case 19",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Organized services such as army/police usually take ‘the’. Correct: ‘joined the army’."
            },
            {
                    "id": "detecting-errors-article-set-1-q20",
                    "topic": "Article - No Error",
                    "difficulty": "hard",
                    "question": "The proposal was published on the official website in Practice Case 20",
                    "options": [
                            "The proposal",
                            "was published",
                            "on the official website in Practice Case 20",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct because ‘the’ refers to a specific item already known in context."
            },
            {
                    "id": "detecting-errors-article-set-1-q21",
                    "topic": "Article - Superlative",
                    "difficulty": "hard",
                    "question": "Varun is best candidate in the batch for Practice Case 21",
                    "options": [
                            "Varun is",
                            "best candidate",
                            "in the batch for Practice Case 21",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Superlative adjectives generally take ‘the’. Correct: ‘the best candidate’."
            },
            {
                    "id": "detecting-errors-article-set-1-q22",
                    "topic": "Article - Abbreviation Sound",
                    "difficulty": "hard",
                    "question": "She filed a FIR after the incident in Agra",
                    "options": [
                            "She filed",
                            "a FIR",
                            "after the incident in Agra",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘FIR’ starts with the vowel sound ‘eff’, so use ‘an FIR’."
            },
            {
                    "id": "detecting-errors-article-set-1-q23",
                    "topic": "Article - The + Adjective",
                    "difficulty": "hard",
                    "question": "The poor need support during difficult times in Practice Case 23",
                    "options": [
                            "The poor",
                            "need support",
                            "during difficult times in Practice Case 23",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘The + adjective’ can denote a class and takes plural meaning."
            },
            {
                    "id": "detecting-errors-article-set-1-q24",
                    "topic": "Article - No Error",
                    "difficulty": "hard",
                    "question": "He read the Ramayana during vacation in Practice Case 24",
                    "options": [
                            "He read",
                            "the Ramayana",
                            "during vacation in Practice Case 24",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. Names of holy books/epics commonly take ‘the’."
            },
            {
                    "id": "detecting-errors-article-set-1-q25",
                    "topic": "Article - A/An",
                    "difficulty": "hard",
                    "question": "Akash is an university student preparing for CHSL",
                    "options": [
                            "Akash is",
                            "an university student",
                            "preparing for CHSL",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Article depends on sound. ‘University’ begins with /juː/, so use ‘a university’."
            },
            {
                    "id": "detecting-errors-article-set-1-q26",
                    "topic": "Article - Silent H",
                    "difficulty": "hard",
                    "question": "He is a honest officer posted in Bhopal",
                    "options": [
                            "He is",
                            "a honest officer",
                            "posted in Bhopal",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Honest’ begins with a vowel sound because ‘h’ is silent. Correct: ‘an honest officer’."
            },
            {
                    "id": "detecting-errors-article-set-1-q27",
                    "topic": "Article - Institution",
                    "difficulty": "hard",
                    "question": "Manoj joined army after graduation in Practice Case 27",
                    "options": [
                            "Manoj joined",
                            "army",
                            "after graduation in Practice Case 27",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Organized services such as army/police usually take ‘the’. Correct: ‘joined the army’."
            },
            {
                    "id": "detecting-errors-article-set-1-q28",
                    "topic": "Article - No Error",
                    "difficulty": "hard",
                    "question": "The essay was published on the official website in Practice Case 28",
                    "options": [
                            "The essay",
                            "was published",
                            "on the official website in Practice Case 28",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct because ‘the’ refers to a specific item already known in context."
            },
            {
                    "id": "detecting-errors-article-set-1-q29",
                    "topic": "Article - Superlative",
                    "difficulty": "hard",
                    "question": "Harish is best candidate in the batch for Practice Case 29",
                    "options": [
                            "Harish is",
                            "best candidate",
                            "in the batch for Practice Case 29",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Superlative adjectives generally take ‘the’. Correct: ‘the best candidate’."
            },
            {
                    "id": "detecting-errors-article-set-1-q30",
                    "topic": "Article - Abbreviation Sound",
                    "difficulty": "hard",
                    "question": "She filed a FIR after the incident in Pune",
                    "options": [
                            "She filed",
                            "a FIR",
                            "after the incident in Pune",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘FIR’ starts with the vowel sound ‘eff’, so use ‘an FIR’."
            },
            {
                    "id": "detecting-errors-article-set-1-q31",
                    "topic": "Article - The + Adjective",
                    "difficulty": "hard",
                    "question": "The poor need support during difficult times in Practice Case 31",
                    "options": [
                            "The poor",
                            "need support",
                            "during difficult times in Practice Case 31",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘The + adjective’ can denote a class and takes plural meaning."
            },
            {
                    "id": "detecting-errors-article-set-1-q32",
                    "topic": "Article - No Error",
                    "difficulty": "hard",
                    "question": "He read the Ramayana during vacation in Practice Case 32",
                    "options": [
                            "He read",
                            "the Ramayana",
                            "during vacation in Practice Case 32",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. Names of holy books/epics commonly take ‘the’."
            },
            {
                    "id": "detecting-errors-article-set-1-q33",
                    "topic": "Article - A/An",
                    "difficulty": "hard",
                    "question": "Mohit is an university student preparing for Railway Group D",
                    "options": [
                            "Mohit is",
                            "an university student",
                            "preparing for Railway Group D",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Article depends on sound. ‘University’ begins with /juː/, so use ‘a university’."
            },
            {
                    "id": "detecting-errors-article-set-1-q34",
                    "topic": "Article - Silent H",
                    "difficulty": "hard",
                    "question": "He is a honest officer posted in Noida",
                    "options": [
                            "He is",
                            "a honest officer",
                            "posted in Noida",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Honest’ begins with a vowel sound because ‘h’ is silent. Correct: ‘an honest officer’."
            },
            {
                    "id": "detecting-errors-article-set-1-q35",
                    "topic": "Article - Institution",
                    "difficulty": "hard",
                    "question": "Karan joined army after graduation in Practice Case 35",
                    "options": [
                            "Karan joined",
                            "army",
                            "after graduation in Practice Case 35",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Organized services such as army/police usually take ‘the’. Correct: ‘joined the army’."
            },
            {
                    "id": "detecting-errors-article-set-1-q36",
                    "topic": "Article - No Error",
                    "difficulty": "hard",
                    "question": "The article was published on the official website in Practice Case 36",
                    "options": [
                            "The article",
                            "was published",
                            "on the official website in Practice Case 36",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct because ‘the’ refers to a specific item already known in context."
            },
            {
                    "id": "detecting-errors-article-set-1-q37",
                    "topic": "Article - Superlative",
                    "difficulty": "hard",
                    "question": "Vivek is best candidate in the batch for Practice Case 37",
                    "options": [
                            "Vivek is",
                            "best candidate",
                            "in the batch for Practice Case 37",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Superlative adjectives generally take ‘the’. Correct: ‘the best candidate’."
            },
            {
                    "id": "detecting-errors-article-set-1-q38",
                    "topic": "Article - Abbreviation Sound",
                    "difficulty": "hard",
                    "question": "She filed a FIR after the incident in Mumbai",
                    "options": [
                            "She filed",
                            "a FIR",
                            "after the incident in Mumbai",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘FIR’ starts with the vowel sound ‘eff’, so use ‘an FIR’."
            },
            {
                    "id": "detecting-errors-article-set-1-q39",
                    "topic": "Article - The + Adjective",
                    "difficulty": "hard",
                    "question": "The poor need support during difficult times in Practice Case 39",
                    "options": [
                            "The poor",
                            "need support",
                            "during difficult times in Practice Case 39",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘The + adjective’ can denote a class and takes plural meaning."
            },
            {
                    "id": "detecting-errors-article-set-1-q40",
                    "topic": "Article - No Error",
                    "difficulty": "hard",
                    "question": "He read the Ramayana during vacation in Practice Case 40",
                    "options": [
                            "He read",
                            "the Ramayana",
                            "during vacation in Practice Case 40",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. Names of holy books/epics commonly take ‘the’."
            },
            {
                    "id": "detecting-errors-article-set-1-q41",
                    "topic": "Article - A/An",
                    "difficulty": "hard",
                    "question": "Nikhil is an university student preparing for SSC CGL",
                    "options": [
                            "Nikhil is",
                            "an university student",
                            "preparing for SSC CGL",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Article depends on sound. ‘University’ begins with /juː/, so use ‘a university’."
            },
            {
                    "id": "detecting-errors-article-set-1-q42",
                    "topic": "Article - Silent H",
                    "difficulty": "hard",
                    "question": "He is a honest officer posted in Lucknow",
                    "options": [
                            "He is",
                            "a honest officer",
                            "posted in Lucknow",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Honest’ begins with a vowel sound because ‘h’ is silent. Correct: ‘an honest officer’."
            },
            {
                    "id": "detecting-errors-article-set-1-q43",
                    "topic": "Article - Institution",
                    "difficulty": "hard",
                    "question": "Amit joined army after graduation in Practice Case 43",
                    "options": [
                            "Amit joined",
                            "army",
                            "after graduation in Practice Case 43",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Organized services such as army/police usually take ‘the’. Correct: ‘joined the army’."
            },
            {
                    "id": "detecting-errors-article-set-1-q44",
                    "topic": "Article - No Error",
                    "difficulty": "hard",
                    "question": "The answer sheet was published on the official website in Practice Case 44",
                    "options": [
                            "The answer sheet",
                            "was published",
                            "on the official website in Practice Case 44",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct because ‘the’ refers to a specific item already known in context."
            },
            {
                    "id": "detecting-errors-article-set-1-q45",
                    "topic": "Article - Superlative",
                    "difficulty": "hard",
                    "question": "Deepak is best candidate in the batch for Practice Case 45",
                    "options": [
                            "Deepak is",
                            "best candidate",
                            "in the batch for Practice Case 45",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Superlative adjectives generally take ‘the’. Correct: ‘the best candidate’."
            },
            {
                    "id": "detecting-errors-article-set-1-q46",
                    "topic": "Article - Abbreviation Sound",
                    "difficulty": "hard",
                    "question": "She filed a FIR after the incident in Kolkata",
                    "options": [
                            "She filed",
                            "a FIR",
                            "after the incident in Kolkata",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘FIR’ starts with the vowel sound ‘eff’, so use ‘an FIR’."
            },
            {
                    "id": "detecting-errors-article-set-1-q47",
                    "topic": "Article - The + Adjective",
                    "difficulty": "hard",
                    "question": "The poor need support during difficult times in Practice Case 47",
                    "options": [
                            "The poor",
                            "need support",
                            "during difficult times in Practice Case 47",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘The + adjective’ can denote a class and takes plural meaning."
            },
            {
                    "id": "detecting-errors-article-set-1-q48",
                    "topic": "Article - No Error",
                    "difficulty": "hard",
                    "question": "He read the Ramayana during vacation in Practice Case 48",
                    "options": [
                            "He read",
                            "the Ramayana",
                            "during vacation in Practice Case 48",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. Names of holy books/epics commonly take ‘the’."
            },
            {
                    "id": "detecting-errors-article-set-1-q49",
                    "topic": "Article - A/An",
                    "difficulty": "hard",
                    "question": "Gaurav is an university student preparing for Stenographer",
                    "options": [
                            "Gaurav is",
                            "an university student",
                            "preparing for Stenographer",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Article depends on sound. ‘University’ begins with /juː/, so use ‘a university’."
            },
            {
                    "id": "detecting-errors-article-set-1-q50",
                    "topic": "Article - Silent H",
                    "difficulty": "hard",
                    "question": "He is a honest officer posted in Meerut",
                    "options": [
                            "He is",
                            "a honest officer",
                            "posted in Meerut",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Honest’ begins with a vowel sound because ‘h’ is silent. Correct: ‘an honest officer’."
            }
    ];

    window.GJU_QUIZ_BANK.push({
        id: quizId,
        subject: "English",
        title: "Detecting Errors - Article Set 1",
        description: "50 article-focused detecting error questions on a, an, the and zero article.",
        durationMinutes: 30,
        totalQuestions: questions.length,
        marksPerQuestion: 1,
        negativeMarks: 0.25,
        difficulty: "Hard",
        tags: ["SSC", "Railway", "Police", "English", "Detecting Errors"],
        questions
    });
}());
