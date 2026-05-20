(function () {
    "use strict";

    window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];

    const quizId = "detecting-errors-preposition-set-1";

    const questions = [
            {
                    "id": "detecting-errors-preposition-set-1-q01",
                    "topic": "Preposition - Accused Of",
                    "difficulty": "hard",
                    "question": "Aarav was accused for hiding the report in Practice Case 1",
                    "options": [
                            "Aarav was accused",
                            "for hiding",
                            "the report in Practice Case 1",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Accused’ takes ‘of’, not ‘for’. Correct phrase: ‘accused of hiding’."
            },
            {
                    "id": "detecting-errors-preposition-set-1-q02",
                    "topic": "Preposition - Prefer To",
                    "difficulty": "hard",
                    "question": "I prefer English than Maths for SSC CPO",
                    "options": [
                            "I prefer",
                            "English than",
                            "Maths for SSC CPO",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Prefer’ is followed by ‘to’, not ‘than’. Correct: ‘prefer English to Maths’."
            },
            {
                    "id": "detecting-errors-preposition-set-1-q03",
                    "topic": "Preposition - Good At",
                    "difficulty": "hard",
                    "question": "Mohit is good in solving reasoning questions in Practice Case 3",
                    "options": [
                            "Mohit is",
                            "good in solving",
                            "reasoning questions in Practice Case 3",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Use ‘good at + noun/gerund’. Correct phrase: ‘good at solving’."
            },
            {
                    "id": "detecting-errors-preposition-set-1-q04",
                    "topic": "Preposition - Married To",
                    "difficulty": "hard",
                    "question": "She is married with an engineer from Agra",
                    "options": [
                            "She is",
                            "married with",
                            "an engineer from Agra",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Married’ is followed by ‘to’, not ‘with’. Correct: ‘married to an engineer’."
            },
            {
                    "id": "detecting-errors-preposition-set-1-q05",
                    "topic": "Preposition - Discuss",
                    "difficulty": "hard",
                    "question": "The committee discussed about the new rule in Practice Case 5",
                    "options": [
                            "The committee",
                            "discussed about",
                            "the new rule in Practice Case 5",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Discuss’ is transitive and does not take ‘about’ immediately after it. Correct: ‘discussed the rule’."
            },
            {
                    "id": "detecting-errors-preposition-set-1-q06",
                    "topic": "Preposition - Enter",
                    "difficulty": "hard",
                    "question": "The candidates entered into the hall before the bell in Practice Case 6",
                    "options": [
                            "The candidates",
                            "entered into",
                            "the hall before the bell in Practice Case 6",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "For physical entry, use ‘enter’ without ‘into’. Correct: ‘entered the hall’."
            },
            {
                    "id": "detecting-errors-preposition-set-1-q07",
                    "topic": "Preposition - Depends On",
                    "difficulty": "hard",
                    "question": "The result depends of the final answer key in Practice Case 7",
                    "options": [
                            "The result",
                            "depends of",
                            "the final answer key in Practice Case 7",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Depend’ is followed by ‘on/upon’. Correct: ‘depends on’."
            },
            {
                    "id": "detecting-errors-preposition-set-1-q08",
                    "topic": "Preposition - No Error",
                    "difficulty": "hard",
                    "question": "Pooja apologized to the teacher for his mistake in Practice Case 8",
                    "options": [
                            "Pooja apologized",
                            "to the teacher",
                            "for his mistake in Practice Case 8",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. The pattern is ‘apologize to someone for something’."
            },
            {
                    "id": "detecting-errors-preposition-set-1-q09",
                    "topic": "Preposition - Accused Of",
                    "difficulty": "hard",
                    "question": "Rohan was accused for hiding the speech in Practice Case 9",
                    "options": [
                            "Rohan was accused",
                            "for hiding",
                            "the speech in Practice Case 9",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Accused’ takes ‘of’, not ‘for’. Correct phrase: ‘accused of hiding’."
            },
            {
                    "id": "detecting-errors-preposition-set-1-q10",
                    "topic": "Preposition - Prefer To",
                    "difficulty": "hard",
                    "question": "I prefer English than Maths for CDS",
                    "options": [
                            "I prefer",
                            "English than",
                            "Maths for CDS",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Prefer’ is followed by ‘to’, not ‘than’. Correct: ‘prefer English to Maths’."
            },
            {
                    "id": "detecting-errors-preposition-set-1-q11",
                    "topic": "Preposition - Good At",
                    "difficulty": "hard",
                    "question": "Nikhil is good in solving reasoning questions in Practice Case 11",
                    "options": [
                            "Nikhil is",
                            "good in solving",
                            "reasoning questions in Practice Case 11",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Use ‘good at + noun/gerund’. Correct phrase: ‘good at solving’."
            },
            {
                    "id": "detecting-errors-preposition-set-1-q12",
                    "topic": "Preposition - Married To",
                    "difficulty": "hard",
                    "question": "She is married with an engineer from Pune",
                    "options": [
                            "She is",
                            "married with",
                            "an engineer from Pune",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Married’ is followed by ‘to’, not ‘with’. Correct: ‘married to an engineer’."
            },
            {
                    "id": "detecting-errors-preposition-set-1-q13",
                    "topic": "Preposition - Discuss",
                    "difficulty": "hard",
                    "question": "The committee discussed about the new rule in Practice Case 13",
                    "options": [
                            "The committee",
                            "discussed about",
                            "the new rule in Practice Case 13",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Discuss’ is transitive and does not take ‘about’ immediately after it. Correct: ‘discussed the rule’."
            },
            {
                    "id": "detecting-errors-preposition-set-1-q14",
                    "topic": "Preposition - Enter",
                    "difficulty": "hard",
                    "question": "The candidates entered into the hall before the bell in Practice Case 14",
                    "options": [
                            "The candidates",
                            "entered into",
                            "the hall before the bell in Practice Case 14",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "For physical entry, use ‘enter’ without ‘into’. Correct: ‘entered the hall’."
            },
            {
                    "id": "detecting-errors-preposition-set-1-q15",
                    "topic": "Preposition - Depends On",
                    "difficulty": "hard",
                    "question": "The result depends of the final answer key in Practice Case 15",
                    "options": [
                            "The result",
                            "depends of",
                            "the final answer key in Practice Case 15",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Depend’ is followed by ‘on/upon’. Correct: ‘depends on’."
            },
            {
                    "id": "detecting-errors-preposition-set-1-q16",
                    "topic": "Preposition - No Error",
                    "difficulty": "hard",
                    "question": "Meera apologized to the teacher for his mistake in Practice Case 16",
                    "options": [
                            "Meera apologized",
                            "to the teacher",
                            "for his mistake in Practice Case 16",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. The pattern is ‘apologize to someone for something’."
            },
            {
                    "id": "detecting-errors-preposition-set-1-q17",
                    "topic": "Preposition - Accused Of",
                    "difficulty": "hard",
                    "question": "Rahul was accused for hiding the application in Practice Case 17",
                    "options": [
                            "Rahul was accused",
                            "for hiding",
                            "the application in Practice Case 17",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Accused’ takes ‘of’, not ‘for’. Correct phrase: ‘accused of hiding’."
            },
            {
                    "id": "detecting-errors-preposition-set-1-q18",
                    "topic": "Preposition - Prefer To",
                    "difficulty": "hard",
                    "question": "I prefer English than Maths for UP Lekhpal",
                    "options": [
                            "I prefer",
                            "English than",
                            "Maths for UP Lekhpal",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Prefer’ is followed by ‘to’, not ‘than’. Correct: ‘prefer English to Maths’."
            },
            {
                    "id": "detecting-errors-preposition-set-1-q19",
                    "topic": "Preposition - Good At",
                    "difficulty": "hard",
                    "question": "Gaurav is good in solving reasoning questions in Practice Case 19",
                    "options": [
                            "Gaurav is",
                            "good in solving",
                            "reasoning questions in Practice Case 19",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Use ‘good at + noun/gerund’. Correct phrase: ‘good at solving’."
            },
            {
                    "id": "detecting-errors-preposition-set-1-q20",
                    "topic": "Preposition - Married To",
                    "difficulty": "hard",
                    "question": "She is married with an engineer from Mumbai",
                    "options": [
                            "She is",
                            "married with",
                            "an engineer from Mumbai",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Married’ is followed by ‘to’, not ‘with’. Correct: ‘married to an engineer’."
            },
            {
                    "id": "detecting-errors-preposition-set-1-q21",
                    "topic": "Preposition - Discuss",
                    "difficulty": "hard",
                    "question": "The committee discussed about the new rule in Practice Case 21",
                    "options": [
                            "The committee",
                            "discussed about",
                            "the new rule in Practice Case 21",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Discuss’ is transitive and does not take ‘about’ immediately after it. Correct: ‘discussed the rule’."
            },
            {
                    "id": "detecting-errors-preposition-set-1-q22",
                    "topic": "Preposition - Enter",
                    "difficulty": "hard",
                    "question": "The candidates entered into the hall before the bell in Practice Case 22",
                    "options": [
                            "The candidates",
                            "entered into",
                            "the hall before the bell in Practice Case 22",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "For physical entry, use ‘enter’ without ‘into’. Correct: ‘entered the hall’."
            },
            {
                    "id": "detecting-errors-preposition-set-1-q23",
                    "topic": "Preposition - Depends On",
                    "difficulty": "hard",
                    "question": "The result depends of the final answer key in Practice Case 23",
                    "options": [
                            "The result",
                            "depends of",
                            "the final answer key in Practice Case 23",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Depend’ is followed by ‘on/upon’. Correct: ‘depends on’."
            },
            {
                    "id": "detecting-errors-preposition-set-1-q24",
                    "topic": "Preposition - No Error",
                    "difficulty": "hard",
                    "question": "Pallavi apologized to the teacher for his mistake in Practice Case 24",
                    "options": [
                            "Pallavi apologized",
                            "to the teacher",
                            "for his mistake in Practice Case 24",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. The pattern is ‘apologize to someone for something’."
            },
            {
                    "id": "detecting-errors-preposition-set-1-q25",
                    "topic": "Preposition - Accused Of",
                    "difficulty": "hard",
                    "question": "Akash was accused for hiding the assignment in Practice Case 25",
                    "options": [
                            "Akash was accused",
                            "for hiding",
                            "the assignment in Practice Case 25",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Accused’ takes ‘of’, not ‘for’. Correct phrase: ‘accused of hiding’."
            },
            {
                    "id": "detecting-errors-preposition-set-1-q26",
                    "topic": "Preposition - Prefer To",
                    "difficulty": "hard",
                    "question": "I prefer English than Maths for Bank Clerk",
                    "options": [
                            "I prefer",
                            "English than",
                            "Maths for Bank Clerk",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Prefer’ is followed by ‘to’, not ‘than’. Correct: ‘prefer English to Maths’."
            },
            {
                    "id": "detecting-errors-preposition-set-1-q27",
                    "topic": "Preposition - Good At",
                    "difficulty": "hard",
                    "question": "Manoj is good in solving reasoning questions in Practice Case 27",
                    "options": [
                            "Manoj is",
                            "good in solving",
                            "reasoning questions in Practice Case 27",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Use ‘good at + noun/gerund’. Correct phrase: ‘good at solving’."
            },
            {
                    "id": "detecting-errors-preposition-set-1-q28",
                    "topic": "Preposition - Married To",
                    "difficulty": "hard",
                    "question": "She is married with an engineer from Kolkata",
                    "options": [
                            "She is",
                            "married with",
                            "an engineer from Kolkata",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Married’ is followed by ‘to’, not ‘with’. Correct: ‘married to an engineer’."
            },
            {
                    "id": "detecting-errors-preposition-set-1-q29",
                    "topic": "Preposition - Discuss",
                    "difficulty": "hard",
                    "question": "The committee discussed about the new rule in Practice Case 29",
                    "options": [
                            "The committee",
                            "discussed about",
                            "the new rule in Practice Case 29",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Discuss’ is transitive and does not take ‘about’ immediately after it. Correct: ‘discussed the rule’."
            },
            {
                    "id": "detecting-errors-preposition-set-1-q30",
                    "topic": "Preposition - Enter",
                    "difficulty": "hard",
                    "question": "The candidates entered into the hall before the bell in Practice Case 30",
                    "options": [
                            "The candidates",
                            "entered into",
                            "the hall before the bell in Practice Case 30",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "For physical entry, use ‘enter’ without ‘into’. Correct: ‘entered the hall’."
            },
            {
                    "id": "detecting-errors-preposition-set-1-q31",
                    "topic": "Preposition - Depends On",
                    "difficulty": "hard",
                    "question": "The result depends of the final answer key in Practice Case 31",
                    "options": [
                            "The result",
                            "depends of",
                            "the final answer key in Practice Case 31",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Depend’ is followed by ‘on/upon’. Correct: ‘depends on’."
            },
            {
                    "id": "detecting-errors-preposition-set-1-q32",
                    "topic": "Preposition - No Error",
                    "difficulty": "hard",
                    "question": "Ritika apologized to the teacher for his mistake in Practice Case 32",
                    "options": [
                            "Ritika apologized",
                            "to the teacher",
                            "for his mistake in Practice Case 32",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. The pattern is ‘apologize to someone for something’."
            },
            {
                    "id": "detecting-errors-preposition-set-1-q33",
                    "topic": "Preposition - Accused Of",
                    "difficulty": "hard",
                    "question": "Mohit was accused for hiding the project in Practice Case 33",
                    "options": [
                            "Mohit was accused",
                            "for hiding",
                            "the project in Practice Case 33",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Accused’ takes ‘of’, not ‘for’. Correct phrase: ‘accused of hiding’."
            },
            {
                    "id": "detecting-errors-preposition-set-1-q34",
                    "topic": "Preposition - Prefer To",
                    "difficulty": "hard",
                    "question": "I prefer English than Maths for UP Police",
                    "options": [
                            "I prefer",
                            "English than",
                            "Maths for UP Police",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Prefer’ is followed by ‘to’, not ‘than’. Correct: ‘prefer English to Maths’."
            },
            {
                    "id": "detecting-errors-preposition-set-1-q35",
                    "topic": "Preposition - Good At",
                    "difficulty": "hard",
                    "question": "Karan is good in solving reasoning questions in Practice Case 35",
                    "options": [
                            "Karan is",
                            "good in solving",
                            "reasoning questions in Practice Case 35",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Use ‘good at + noun/gerund’. Correct phrase: ‘good at solving’."
            },
            {
                    "id": "detecting-errors-preposition-set-1-q36",
                    "topic": "Preposition - Married To",
                    "difficulty": "hard",
                    "question": "She is married with an engineer from Prayagraj",
                    "options": [
                            "She is",
                            "married with",
                            "an engineer from Prayagraj",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Married’ is followed by ‘to’, not ‘with’. Correct: ‘married to an engineer’."
            },
            {
                    "id": "detecting-errors-preposition-set-1-q37",
                    "topic": "Preposition - Discuss",
                    "difficulty": "hard",
                    "question": "The committee discussed about the new rule in Practice Case 37",
                    "options": [
                            "The committee",
                            "discussed about",
                            "the new rule in Practice Case 37",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Discuss’ is transitive and does not take ‘about’ immediately after it. Correct: ‘discussed the rule’."
            },
            {
                    "id": "detecting-errors-preposition-set-1-q38",
                    "topic": "Preposition - Enter",
                    "difficulty": "hard",
                    "question": "The candidates entered into the hall before the bell in Practice Case 38",
                    "options": [
                            "The candidates",
                            "entered into",
                            "the hall before the bell in Practice Case 38",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "For physical entry, use ‘enter’ without ‘into’. Correct: ‘entered the hall’."
            },
            {
                    "id": "detecting-errors-preposition-set-1-q39",
                    "topic": "Preposition - Depends On",
                    "difficulty": "hard",
                    "question": "The result depends of the final answer key in Practice Case 39",
                    "options": [
                            "The result",
                            "depends of",
                            "the final answer key in Practice Case 39",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Depend’ is followed by ‘on/upon’. Correct: ‘depends on’."
            },
            {
                    "id": "detecting-errors-preposition-set-1-q40",
                    "topic": "Preposition - No Error",
                    "difficulty": "hard",
                    "question": "Anjali apologized to the teacher for his mistake in Practice Case 40",
                    "options": [
                            "Anjali apologized",
                            "to the teacher",
                            "for his mistake in Practice Case 40",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. The pattern is ‘apologize to someone for something’."
            },
            {
                    "id": "detecting-errors-preposition-set-1-q41",
                    "topic": "Preposition - Accused Of",
                    "difficulty": "hard",
                    "question": "Nikhil was accused for hiding the file in Practice Case 41",
                    "options": [
                            "Nikhil was accused",
                            "for hiding",
                            "the file in Practice Case 41",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Accused’ takes ‘of’, not ‘for’. Correct phrase: ‘accused of hiding’."
            },
            {
                    "id": "detecting-errors-preposition-set-1-q42",
                    "topic": "Preposition - Good At",
                    "difficulty": "hard",
                    "question": "Amit is good in solving reasoning questions in Practice Case 43",
                    "options": [
                            "Amit is",
                            "good in solving",
                            "reasoning questions in Practice Case 43",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Use ‘good at + noun/gerund’. Correct phrase: ‘good at solving’."
            },
            {
                    "id": "detecting-errors-preposition-set-1-q43",
                    "topic": "Preposition - Married To",
                    "difficulty": "hard",
                    "question": "She is married with an engineer from Bhopal",
                    "options": [
                            "She is",
                            "married with",
                            "an engineer from Bhopal",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Married’ is followed by ‘to’, not ‘with’. Correct: ‘married to an engineer’."
            },
            {
                    "id": "detecting-errors-preposition-set-1-q44",
                    "topic": "Preposition - Discuss",
                    "difficulty": "hard",
                    "question": "The committee discussed about the new rule in Practice Case 45",
                    "options": [
                            "The committee",
                            "discussed about",
                            "the new rule in Practice Case 45",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Discuss’ is transitive and does not take ‘about’ immediately after it. Correct: ‘discussed the rule’."
            },
            {
                    "id": "detecting-errors-preposition-set-1-q45",
                    "topic": "Preposition - Enter",
                    "difficulty": "hard",
                    "question": "The candidates entered into the hall before the bell in Practice Case 46",
                    "options": [
                            "The candidates",
                            "entered into",
                            "the hall before the bell in Practice Case 46",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "For physical entry, use ‘enter’ without ‘into’. Correct: ‘entered the hall’."
            },
            {
                    "id": "detecting-errors-preposition-set-1-q46",
                    "topic": "Preposition - Depends On",
                    "difficulty": "hard",
                    "question": "The result depends of the final answer key in Practice Case 47",
                    "options": [
                            "The result",
                            "depends of",
                            "the final answer key in Practice Case 47",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Depend’ is followed by ‘on/upon’. Correct: ‘depends on’."
            },
            {
                    "id": "detecting-errors-preposition-set-1-q47",
                    "topic": "Preposition - No Error",
                    "difficulty": "hard",
                    "question": "Sunita apologized to the teacher for his mistake in Practice Case 48",
                    "options": [
                            "Sunita apologized",
                            "to the teacher",
                            "for his mistake in Practice Case 48",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. The pattern is ‘apologize to someone for something’."
            },
            {
                    "id": "detecting-errors-preposition-set-1-q48",
                    "topic": "Preposition - Accused Of",
                    "difficulty": "hard",
                    "question": "Gaurav was accused for hiding the letter in Practice Case 49",
                    "options": [
                            "Gaurav was accused",
                            "for hiding",
                            "the letter in Practice Case 49",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Accused’ takes ‘of’, not ‘for’. Correct phrase: ‘accused of hiding’."
            },
            {
                    "id": "detecting-errors-preposition-set-1-q49",
                    "topic": "Preposition - Good At",
                    "difficulty": "hard",
                    "question": "Varun is good in solving reasoning questions in Practice Case 51",
                    "options": [
                            "Varun is",
                            "good in solving",
                            "reasoning questions in Practice Case 51",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Use ‘good at + noun/gerund’. Correct phrase: ‘good at solving’."
            },
            {
                    "id": "detecting-errors-preposition-set-1-q50",
                    "topic": "Preposition - Married To",
                    "difficulty": "hard",
                    "question": "She is married with an engineer from Noida",
                    "options": [
                            "She is",
                            "married with",
                            "an engineer from Noida",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Married’ is followed by ‘to’, not ‘with’. Correct: ‘married to an engineer’."
            }
    ];

    window.GJU_QUIZ_BANK.push({
        id: quizId,
        subject: "English",
        title: "Detecting Errors - Preposition Set 1",
        description: "50 preposition-focused detecting error questions on fixed preposition usage.",
        durationMinutes: 30,
        totalQuestions: questions.length,
        marksPerQuestion: 1,
        negativeMarks: 0.25,
        difficulty: "Hard",
        tags: ["SSC", "Railway", "Police", "English", "Detecting Errors"],
        questions
    });
}());
