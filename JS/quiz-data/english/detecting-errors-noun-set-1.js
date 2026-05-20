(function () {
    "use strict";

    window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];

    const quizId = "detecting-errors-noun-set-1";

    const questions = [
            {
                    "id": "detecting-errors-noun-set-1-q01",
                    "topic": "Noun - Uncountable",
                    "difficulty": "hard",
                    "question": "He gave me many useful advices in Practice Case 1",
                    "options": [
                            "He gave me",
                            "many useful advices",
                            "in Practice Case 1",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Advice’ is uncountable; do not use plural ‘advices’. Correct: ‘useful advice’ or ‘pieces of advice’."
            },
            {
                    "id": "detecting-errors-noun-set-1-q02",
                    "topic": "Noun - Scenery",
                    "difficulty": "hard",
                    "question": "The sceneries of Mumbai are beautiful in winter",
                    "options": [
                            "The sceneries of Mumbai",
                            "are beautiful",
                            "in winter",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "‘Scenery’ is normally uncountable. Correct: ‘The scenery of Mumbai is beautiful’."
            },
            {
                    "id": "detecting-errors-noun-set-1-q03",
                    "topic": "Noun - No Error",
                    "difficulty": "hard",
                    "question": "The committee has taken its final decision in Practice Case 3",
                    "options": [
                            "The committee",
                            "has taken",
                            "its final decision in Practice Case 3",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct when the committee is viewed as one unit."
            },
            {
                    "id": "detecting-errors-noun-set-1-q04",
                    "topic": "Noun - Furniture",
                    "difficulty": "hard",
                    "question": "All his furnitures were damaged in Practice Case 4",
                    "options": [
                            "All his furnitures",
                            "were damaged",
                            "in Practice Case 4",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "‘Furniture’ is uncountable. Correct: ‘All his furniture was damaged’."
            },
            {
                    "id": "detecting-errors-noun-set-1-q05",
                    "topic": "Noun - Collective",
                    "difficulty": "hard",
                    "question": "The team are divided over the captain's decision in Practice Case 5",
                    "options": [
                            "The team",
                            "are divided",
                            "over the captain's decision in Practice Case 5",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "This is correct when the collective noun is viewed as individual members."
            },
            {
                    "id": "detecting-errors-noun-set-1-q06",
                    "topic": "Noun - Numeral",
                    "difficulty": "hard",
                    "question": "He bought two dozens bananas in Lucknow",
                    "options": [
                            "He bought",
                            "two dozens bananas",
                            "in Lucknow",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "After a definite numeral, ‘dozen’ remains singular. Correct: ‘two dozen bananas’."
            },
            {
                    "id": "detecting-errors-noun-set-1-q07",
                    "topic": "Noun - No Error",
                    "difficulty": "hard",
                    "question": "She lost her spectacles in the examination hall in Practice Case 7",
                    "options": [
                            "She lost",
                            "her spectacles",
                            "in the examination hall in Practice Case 7",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Spectacles’ is commonly plural."
            },
            {
                    "id": "detecting-errors-noun-set-1-q08",
                    "topic": "Noun - Information",
                    "difficulty": "hard",
                    "question": "The informations on the website were outdated in Practice Case 8",
                    "options": [
                            "The informations",
                            "on the website",
                            "were outdated in Practice Case 8",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "‘Information’ is uncountable and singular. Correct: ‘The information...was outdated’."
            },
            {
                    "id": "detecting-errors-noun-set-1-q09",
                    "topic": "Noun - Uncountable",
                    "difficulty": "hard",
                    "question": "He gave me many useful advices in Practice Case 9",
                    "options": [
                            "He gave me",
                            "many useful advices",
                            "in Practice Case 9",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Advice’ is uncountable; do not use plural ‘advices’. Correct: ‘useful advice’ or ‘pieces of advice’."
            },
            {
                    "id": "detecting-errors-noun-set-1-q10",
                    "topic": "Noun - Scenery",
                    "difficulty": "hard",
                    "question": "The sceneries of Kolkata are beautiful in winter",
                    "options": [
                            "The sceneries of Kolkata",
                            "are beautiful",
                            "in winter",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "‘Scenery’ is normally uncountable. Correct: ‘The scenery of Kolkata is beautiful’."
            },
            {
                    "id": "detecting-errors-noun-set-1-q11",
                    "topic": "Noun - No Error",
                    "difficulty": "hard",
                    "question": "The committee has taken its final decision in Practice Case 11",
                    "options": [
                            "The committee",
                            "has taken",
                            "its final decision in Practice Case 11",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct when the committee is viewed as one unit."
            },
            {
                    "id": "detecting-errors-noun-set-1-q12",
                    "topic": "Noun - Furniture",
                    "difficulty": "hard",
                    "question": "All his furnitures were damaged in Practice Case 12",
                    "options": [
                            "All his furnitures",
                            "were damaged",
                            "in Practice Case 12",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "‘Furniture’ is uncountable. Correct: ‘All his furniture was damaged’."
            },
            {
                    "id": "detecting-errors-noun-set-1-q13",
                    "topic": "Noun - Collective",
                    "difficulty": "hard",
                    "question": "The team are divided over the captain's decision in Practice Case 13",
                    "options": [
                            "The team",
                            "are divided",
                            "over the captain's decision in Practice Case 13",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "This is correct when the collective noun is viewed as individual members."
            },
            {
                    "id": "detecting-errors-noun-set-1-q14",
                    "topic": "Noun - Numeral",
                    "difficulty": "hard",
                    "question": "He bought two dozens bananas in Meerut",
                    "options": [
                            "He bought",
                            "two dozens bananas",
                            "in Meerut",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "After a definite numeral, ‘dozen’ remains singular. Correct: ‘two dozen bananas’."
            },
            {
                    "id": "detecting-errors-noun-set-1-q15",
                    "topic": "Noun - No Error",
                    "difficulty": "hard",
                    "question": "She lost her spectacles in the examination hall in Practice Case 15",
                    "options": [
                            "She lost",
                            "her spectacles",
                            "in the examination hall in Practice Case 15",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Spectacles’ is commonly plural."
            },
            {
                    "id": "detecting-errors-noun-set-1-q16",
                    "topic": "Noun - Information",
                    "difficulty": "hard",
                    "question": "The informations on the website were outdated in Practice Case 16",
                    "options": [
                            "The informations",
                            "on the website",
                            "were outdated in Practice Case 16",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "‘Information’ is uncountable and singular. Correct: ‘The information...was outdated’."
            },
            {
                    "id": "detecting-errors-noun-set-1-q17",
                    "topic": "Noun - Uncountable",
                    "difficulty": "hard",
                    "question": "He gave me many useful advices in Practice Case 17",
                    "options": [
                            "He gave me",
                            "many useful advices",
                            "in Practice Case 17",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Advice’ is uncountable; do not use plural ‘advices’. Correct: ‘useful advice’ or ‘pieces of advice’."
            },
            {
                    "id": "detecting-errors-noun-set-1-q18",
                    "topic": "Noun - Scenery",
                    "difficulty": "hard",
                    "question": "The sceneries of Prayagraj are beautiful in winter",
                    "options": [
                            "The sceneries of Prayagraj",
                            "are beautiful",
                            "in winter",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "‘Scenery’ is normally uncountable. Correct: ‘The scenery of Prayagraj is beautiful’."
            },
            {
                    "id": "detecting-errors-noun-set-1-q19",
                    "topic": "Noun - No Error",
                    "difficulty": "hard",
                    "question": "The committee has taken its final decision in Practice Case 19",
                    "options": [
                            "The committee",
                            "has taken",
                            "its final decision in Practice Case 19",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct when the committee is viewed as one unit."
            },
            {
                    "id": "detecting-errors-noun-set-1-q20",
                    "topic": "Noun - Furniture",
                    "difficulty": "hard",
                    "question": "All his furnitures were damaged in Practice Case 20",
                    "options": [
                            "All his furnitures",
                            "were damaged",
                            "in Practice Case 20",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "‘Furniture’ is uncountable. Correct: ‘All his furniture was damaged’."
            },
            {
                    "id": "detecting-errors-noun-set-1-q21",
                    "topic": "Noun - Collective",
                    "difficulty": "hard",
                    "question": "The team are divided over the captain's decision in Practice Case 21",
                    "options": [
                            "The team",
                            "are divided",
                            "over the captain's decision in Practice Case 21",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "This is correct when the collective noun is viewed as individual members."
            },
            {
                    "id": "detecting-errors-noun-set-1-q22",
                    "topic": "Noun - Numeral",
                    "difficulty": "hard",
                    "question": "He bought two dozens bananas in Agra",
                    "options": [
                            "He bought",
                            "two dozens bananas",
                            "in Agra",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "After a definite numeral, ‘dozen’ remains singular. Correct: ‘two dozen bananas’."
            },
            {
                    "id": "detecting-errors-noun-set-1-q23",
                    "topic": "Noun - No Error",
                    "difficulty": "hard",
                    "question": "She lost her spectacles in the examination hall in Practice Case 23",
                    "options": [
                            "She lost",
                            "her spectacles",
                            "in the examination hall in Practice Case 23",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Spectacles’ is commonly plural."
            },
            {
                    "id": "detecting-errors-noun-set-1-q24",
                    "topic": "Noun - Information",
                    "difficulty": "hard",
                    "question": "The informations on the website were outdated in Practice Case 24",
                    "options": [
                            "The informations",
                            "on the website",
                            "were outdated in Practice Case 24",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "‘Information’ is uncountable and singular. Correct: ‘The information...was outdated’."
            },
            {
                    "id": "detecting-errors-noun-set-1-q25",
                    "topic": "Noun - Uncountable",
                    "difficulty": "hard",
                    "question": "He gave me many useful advices in Practice Case 25",
                    "options": [
                            "He gave me",
                            "many useful advices",
                            "in Practice Case 25",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Advice’ is uncountable; do not use plural ‘advices’. Correct: ‘useful advice’ or ‘pieces of advice’."
            },
            {
                    "id": "detecting-errors-noun-set-1-q26",
                    "topic": "Noun - Scenery",
                    "difficulty": "hard",
                    "question": "The sceneries of Bhopal are beautiful in winter",
                    "options": [
                            "The sceneries of Bhopal",
                            "are beautiful",
                            "in winter",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "‘Scenery’ is normally uncountable. Correct: ‘The scenery of Bhopal is beautiful’."
            },
            {
                    "id": "detecting-errors-noun-set-1-q27",
                    "topic": "Noun - No Error",
                    "difficulty": "hard",
                    "question": "The committee has taken its final decision in Practice Case 27",
                    "options": [
                            "The committee",
                            "has taken",
                            "its final decision in Practice Case 27",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct when the committee is viewed as one unit."
            },
            {
                    "id": "detecting-errors-noun-set-1-q28",
                    "topic": "Noun - Furniture",
                    "difficulty": "hard",
                    "question": "All his furnitures were damaged in Practice Case 28",
                    "options": [
                            "All his furnitures",
                            "were damaged",
                            "in Practice Case 28",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "‘Furniture’ is uncountable. Correct: ‘All his furniture was damaged’."
            },
            {
                    "id": "detecting-errors-noun-set-1-q29",
                    "topic": "Noun - Collective",
                    "difficulty": "hard",
                    "question": "The team are divided over the captain's decision in Practice Case 29",
                    "options": [
                            "The team",
                            "are divided",
                            "over the captain's decision in Practice Case 29",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "This is correct when the collective noun is viewed as individual members."
            },
            {
                    "id": "detecting-errors-noun-set-1-q30",
                    "topic": "Noun - Numeral",
                    "difficulty": "hard",
                    "question": "He bought two dozens bananas in Pune",
                    "options": [
                            "He bought",
                            "two dozens bananas",
                            "in Pune",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "After a definite numeral, ‘dozen’ remains singular. Correct: ‘two dozen bananas’."
            },
            {
                    "id": "detecting-errors-noun-set-1-q31",
                    "topic": "Noun - No Error",
                    "difficulty": "hard",
                    "question": "She lost her spectacles in the examination hall in Practice Case 31",
                    "options": [
                            "She lost",
                            "her spectacles",
                            "in the examination hall in Practice Case 31",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Spectacles’ is commonly plural."
            },
            {
                    "id": "detecting-errors-noun-set-1-q32",
                    "topic": "Noun - Information",
                    "difficulty": "hard",
                    "question": "The informations on the website were outdated in Practice Case 32",
                    "options": [
                            "The informations",
                            "on the website",
                            "were outdated in Practice Case 32",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "‘Information’ is uncountable and singular. Correct: ‘The information...was outdated’."
            },
            {
                    "id": "detecting-errors-noun-set-1-q33",
                    "topic": "Noun - Uncountable",
                    "difficulty": "hard",
                    "question": "He gave me many useful advices in Practice Case 33",
                    "options": [
                            "He gave me",
                            "many useful advices",
                            "in Practice Case 33",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Advice’ is uncountable; do not use plural ‘advices’. Correct: ‘useful advice’ or ‘pieces of advice’."
            },
            {
                    "id": "detecting-errors-noun-set-1-q34",
                    "topic": "Noun - Scenery",
                    "difficulty": "hard",
                    "question": "The sceneries of Noida are beautiful in winter",
                    "options": [
                            "The sceneries of Noida",
                            "are beautiful",
                            "in winter",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "‘Scenery’ is normally uncountable. Correct: ‘The scenery of Noida is beautiful’."
            },
            {
                    "id": "detecting-errors-noun-set-1-q35",
                    "topic": "Noun - No Error",
                    "difficulty": "hard",
                    "question": "The committee has taken its final decision in Practice Case 35",
                    "options": [
                            "The committee",
                            "has taken",
                            "its final decision in Practice Case 35",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct when the committee is viewed as one unit."
            },
            {
                    "id": "detecting-errors-noun-set-1-q36",
                    "topic": "Noun - Furniture",
                    "difficulty": "hard",
                    "question": "All his furnitures were damaged in Practice Case 36",
                    "options": [
                            "All his furnitures",
                            "were damaged",
                            "in Practice Case 36",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "‘Furniture’ is uncountable. Correct: ‘All his furniture was damaged’."
            },
            {
                    "id": "detecting-errors-noun-set-1-q37",
                    "topic": "Noun - Collective",
                    "difficulty": "hard",
                    "question": "The team are divided over the captain's decision in Practice Case 37",
                    "options": [
                            "The team",
                            "are divided",
                            "over the captain's decision in Practice Case 37",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "This is correct when the collective noun is viewed as individual members."
            },
            {
                    "id": "detecting-errors-noun-set-1-q38",
                    "topic": "Noun - Numeral",
                    "difficulty": "hard",
                    "question": "He bought two dozens bananas in Mumbai",
                    "options": [
                            "He bought",
                            "two dozens bananas",
                            "in Mumbai",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "After a definite numeral, ‘dozen’ remains singular. Correct: ‘two dozen bananas’."
            },
            {
                    "id": "detecting-errors-noun-set-1-q39",
                    "topic": "Noun - No Error",
                    "difficulty": "hard",
                    "question": "She lost her spectacles in the examination hall in Practice Case 39",
                    "options": [
                            "She lost",
                            "her spectacles",
                            "in the examination hall in Practice Case 39",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Spectacles’ is commonly plural."
            },
            {
                    "id": "detecting-errors-noun-set-1-q40",
                    "topic": "Noun - Information",
                    "difficulty": "hard",
                    "question": "The informations on the website were outdated in Practice Case 40",
                    "options": [
                            "The informations",
                            "on the website",
                            "were outdated in Practice Case 40",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "‘Information’ is uncountable and singular. Correct: ‘The information...was outdated’."
            },
            {
                    "id": "detecting-errors-noun-set-1-q41",
                    "topic": "Noun - Uncountable",
                    "difficulty": "hard",
                    "question": "He gave me many useful advices in Practice Case 41",
                    "options": [
                            "He gave me",
                            "many useful advices",
                            "in Practice Case 41",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Advice’ is uncountable; do not use plural ‘advices’. Correct: ‘useful advice’ or ‘pieces of advice’."
            },
            {
                    "id": "detecting-errors-noun-set-1-q42",
                    "topic": "Noun - Scenery",
                    "difficulty": "hard",
                    "question": "The sceneries of Lucknow are beautiful in winter",
                    "options": [
                            "The sceneries of Lucknow",
                            "are beautiful",
                            "in winter",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "‘Scenery’ is normally uncountable. Correct: ‘The scenery of Lucknow is beautiful’."
            },
            {
                    "id": "detecting-errors-noun-set-1-q43",
                    "topic": "Noun - No Error",
                    "difficulty": "hard",
                    "question": "The committee has taken its final decision in Practice Case 43",
                    "options": [
                            "The committee",
                            "has taken",
                            "its final decision in Practice Case 43",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct when the committee is viewed as one unit."
            },
            {
                    "id": "detecting-errors-noun-set-1-q44",
                    "topic": "Noun - Furniture",
                    "difficulty": "hard",
                    "question": "All his furnitures were damaged in Practice Case 44",
                    "options": [
                            "All his furnitures",
                            "were damaged",
                            "in Practice Case 44",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "‘Furniture’ is uncountable. Correct: ‘All his furniture was damaged’."
            },
            {
                    "id": "detecting-errors-noun-set-1-q45",
                    "topic": "Noun - Collective",
                    "difficulty": "hard",
                    "question": "The team are divided over the captain's decision in Practice Case 45",
                    "options": [
                            "The team",
                            "are divided",
                            "over the captain's decision in Practice Case 45",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "This is correct when the collective noun is viewed as individual members."
            },
            {
                    "id": "detecting-errors-noun-set-1-q46",
                    "topic": "Noun - Numeral",
                    "difficulty": "hard",
                    "question": "He bought two dozens bananas in Kolkata",
                    "options": [
                            "He bought",
                            "two dozens bananas",
                            "in Kolkata",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "After a definite numeral, ‘dozen’ remains singular. Correct: ‘two dozen bananas’."
            },
            {
                    "id": "detecting-errors-noun-set-1-q47",
                    "topic": "Noun - No Error",
                    "difficulty": "hard",
                    "question": "She lost her spectacles in the examination hall in Practice Case 47",
                    "options": [
                            "She lost",
                            "her spectacles",
                            "in the examination hall in Practice Case 47",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Spectacles’ is commonly plural."
            },
            {
                    "id": "detecting-errors-noun-set-1-q48",
                    "topic": "Noun - Information",
                    "difficulty": "hard",
                    "question": "The informations on the website were outdated in Practice Case 48",
                    "options": [
                            "The informations",
                            "on the website",
                            "were outdated in Practice Case 48",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "‘Information’ is uncountable and singular. Correct: ‘The information...was outdated’."
            },
            {
                    "id": "detecting-errors-noun-set-1-q49",
                    "topic": "Noun - Uncountable",
                    "difficulty": "hard",
                    "question": "He gave me many useful advices in Practice Case 49",
                    "options": [
                            "He gave me",
                            "many useful advices",
                            "in Practice Case 49",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Advice’ is uncountable; do not use plural ‘advices’. Correct: ‘useful advice’ or ‘pieces of advice’."
            },
            {
                    "id": "detecting-errors-noun-set-1-q50",
                    "topic": "Noun - Scenery",
                    "difficulty": "hard",
                    "question": "The sceneries of Meerut are beautiful in winter",
                    "options": [
                            "The sceneries of Meerut",
                            "are beautiful",
                            "in winter",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "‘Scenery’ is normally uncountable. Correct: ‘The scenery of Meerut is beautiful’."
            }
    ];

    window.GJU_QUIZ_BANK.push({
        id: quizId,
        subject: "English",
        title: "Detecting Errors - Noun Set 1",
        description: "50 noun-focused detecting error questions on countable, uncountable and collective nouns.",
        durationMinutes: 30,
        totalQuestions: questions.length,
        marksPerQuestion: 1,
        negativeMarks: 0.25,
        difficulty: "Hard",
        tags: ["SSC", "Railway", "Police", "English", "Detecting Errors"],
        questions
    });
}());
