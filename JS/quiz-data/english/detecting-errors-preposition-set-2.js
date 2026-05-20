(function () {
    "use strict";

    window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];

    const quizId = "detecting-errors-preposition-set-2";

    const questions = [
            {
                    "id": "detecting-errors-preposition-set-2-q01",
                    "topic": "Preposition - Discuss",
                    "difficulty": "hard",
                    "question": "The committee discussed about the new rule in Practice Case 53",
                    "options": [
                            "The committee",
                            "discussed about",
                            "the new rule in Practice Case 53",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Discuss’ is transitive and does not take ‘about’ immediately after it. Correct: ‘discussed the rule’."
            },
            {
                    "id": "detecting-errors-preposition-set-2-q02",
                    "topic": "Preposition - Enter",
                    "difficulty": "hard",
                    "question": "The candidates entered into the hall before the bell in Practice Case 54",
                    "options": [
                            "The candidates",
                            "entered into",
                            "the hall before the bell in Practice Case 54",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "For physical entry, use ‘enter’ without ‘into’. Correct: ‘entered the hall’."
            },
            {
                    "id": "detecting-errors-preposition-set-2-q03",
                    "topic": "Preposition - Depends On",
                    "difficulty": "hard",
                    "question": "The result depends of the final answer key in Practice Case 55",
                    "options": [
                            "The result",
                            "depends of",
                            "the final answer key in Practice Case 55",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Depend’ is followed by ‘on/upon’. Correct: ‘depends on’."
            },
            {
                    "id": "detecting-errors-preposition-set-2-q04",
                    "topic": "Preposition - No Error",
                    "difficulty": "hard",
                    "question": "Nisha apologized to the teacher for his mistake in Practice Case 56",
                    "options": [
                            "Nisha apologized",
                            "to the teacher",
                            "for his mistake in Practice Case 56",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. The pattern is ‘apologize to someone for something’."
            },
            {
                    "id": "detecting-errors-preposition-set-2-q05",
                    "topic": "Preposition - Accused Of",
                    "difficulty": "hard",
                    "question": "Manoj was accused for hiding the document in Practice Case 57",
                    "options": [
                            "Manoj was accused",
                            "for hiding",
                            "the document in Practice Case 57",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Accused’ takes ‘of’, not ‘for’. Correct phrase: ‘accused of hiding’."
            },
            {
                    "id": "detecting-errors-preposition-set-2-q06",
                    "topic": "Preposition - Good At",
                    "difficulty": "hard",
                    "question": "Harish is good in solving reasoning questions in Practice Case 59",
                    "options": [
                            "Harish is",
                            "good in solving",
                            "reasoning questions in Practice Case 59",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Use ‘good at + noun/gerund’. Correct phrase: ‘good at solving’."
            },
            {
                    "id": "detecting-errors-preposition-set-2-q07",
                    "topic": "Preposition - Married To",
                    "difficulty": "hard",
                    "question": "She is married with an engineer from Lucknow",
                    "options": [
                            "She is",
                            "married with",
                            "an engineer from Lucknow",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Married’ is followed by ‘to’, not ‘with’. Correct: ‘married to an engineer’."
            },
            {
                    "id": "detecting-errors-preposition-set-2-q08",
                    "topic": "Preposition - Discuss",
                    "difficulty": "hard",
                    "question": "The committee discussed about the new rule in Practice Case 61",
                    "options": [
                            "The committee",
                            "discussed about",
                            "the new rule in Practice Case 61",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Discuss’ is transitive and does not take ‘about’ immediately after it. Correct: ‘discussed the rule’."
            },
            {
                    "id": "detecting-errors-preposition-set-2-q09",
                    "topic": "Preposition - Enter",
                    "difficulty": "hard",
                    "question": "The candidates entered into the hall before the bell in Practice Case 62",
                    "options": [
                            "The candidates",
                            "entered into",
                            "the hall before the bell in Practice Case 62",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "For physical entry, use ‘enter’ without ‘into’. Correct: ‘entered the hall’."
            },
            {
                    "id": "detecting-errors-preposition-set-2-q10",
                    "topic": "Preposition - Depends On",
                    "difficulty": "hard",
                    "question": "The result depends of the final answer key in Practice Case 63",
                    "options": [
                            "The result",
                            "depends of",
                            "the final answer key in Practice Case 63",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Depend’ is followed by ‘on/upon’. Correct: ‘depends on’."
            },
            {
                    "id": "detecting-errors-preposition-set-2-q11",
                    "topic": "Preposition - No Error",
                    "difficulty": "hard",
                    "question": "Sanya apologized to the teacher for his mistake in Practice Case 64",
                    "options": [
                            "Sanya apologized",
                            "to the teacher",
                            "for his mistake in Practice Case 64",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. The pattern is ‘apologize to someone for something’."
            },
            {
                    "id": "detecting-errors-preposition-set-2-q12",
                    "topic": "Preposition - Accused Of",
                    "difficulty": "hard",
                    "question": "Karan was accused for hiding the proposal in Practice Case 65",
                    "options": [
                            "Karan was accused",
                            "for hiding",
                            "the proposal in Practice Case 65",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Accused’ takes ‘of’, not ‘for’. Correct phrase: ‘accused of hiding’."
            },
            {
                    "id": "detecting-errors-preposition-set-2-q13",
                    "topic": "Preposition - Good At",
                    "difficulty": "hard",
                    "question": "Vivek is good in solving reasoning questions in Practice Case 67",
                    "options": [
                            "Vivek is",
                            "good in solving",
                            "reasoning questions in Practice Case 67",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Use ‘good at + noun/gerund’. Correct phrase: ‘good at solving’."
            },
            {
                    "id": "detecting-errors-preposition-set-2-q14",
                    "topic": "Preposition - Married To",
                    "difficulty": "hard",
                    "question": "She is married with an engineer from Meerut",
                    "options": [
                            "She is",
                            "married with",
                            "an engineer from Meerut",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Married’ is followed by ‘to’, not ‘with’. Correct: ‘married to an engineer’."
            },
            {
                    "id": "detecting-errors-preposition-set-2-q15",
                    "topic": "Preposition - Discuss",
                    "difficulty": "hard",
                    "question": "The committee discussed about the new rule in Practice Case 69",
                    "options": [
                            "The committee",
                            "discussed about",
                            "the new rule in Practice Case 69",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Discuss’ is transitive and does not take ‘about’ immediately after it. Correct: ‘discussed the rule’."
            },
            {
                    "id": "detecting-errors-preposition-set-2-q16",
                    "topic": "Preposition - Enter",
                    "difficulty": "hard",
                    "question": "The candidates entered into the hall before the bell in Practice Case 70",
                    "options": [
                            "The candidates",
                            "entered into",
                            "the hall before the bell in Practice Case 70",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "For physical entry, use ‘enter’ without ‘into’. Correct: ‘entered the hall’."
            },
            {
                    "id": "detecting-errors-preposition-set-2-q17",
                    "topic": "Preposition - Depends On",
                    "difficulty": "hard",
                    "question": "The result depends of the final answer key in Practice Case 71",
                    "options": [
                            "The result",
                            "depends of",
                            "the final answer key in Practice Case 71",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Depend’ is followed by ‘on/upon’. Correct: ‘depends on’."
            },
            {
                    "id": "detecting-errors-preposition-set-2-q18",
                    "topic": "Preposition - No Error",
                    "difficulty": "hard",
                    "question": "Priya apologized to the teacher for his mistake in Practice Case 72",
                    "options": [
                            "Priya apologized",
                            "to the teacher",
                            "for his mistake in Practice Case 72",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. The pattern is ‘apologize to someone for something’."
            },
            {
                    "id": "detecting-errors-preposition-set-2-q19",
                    "topic": "Preposition - Accused Of",
                    "difficulty": "hard",
                    "question": "Amit was accused for hiding the essay in Practice Case 73",
                    "options": [
                            "Amit was accused",
                            "for hiding",
                            "the essay in Practice Case 73",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Accused’ takes ‘of’, not ‘for’. Correct phrase: ‘accused of hiding’."
            },
            {
                    "id": "detecting-errors-preposition-set-2-q20",
                    "topic": "Preposition - Good At",
                    "difficulty": "hard",
                    "question": "Deepak is good in solving reasoning questions in Practice Case 75",
                    "options": [
                            "Deepak is",
                            "good in solving",
                            "reasoning questions in Practice Case 75",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Use ‘good at + noun/gerund’. Correct phrase: ‘good at solving’."
            },
            {
                    "id": "detecting-errors-preposition-set-2-q21",
                    "topic": "Preposition - Discuss",
                    "difficulty": "hard",
                    "question": "The committee discussed about the new rule in Practice Case 77",
                    "options": [
                            "The committee",
                            "discussed about",
                            "the new rule in Practice Case 77",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Discuss’ is transitive and does not take ‘about’ immediately after it. Correct: ‘discussed the rule’."
            },
            {
                    "id": "detecting-errors-preposition-set-2-q22",
                    "topic": "Preposition - Enter",
                    "difficulty": "hard",
                    "question": "The candidates entered into the hall before the bell in Practice Case 78",
                    "options": [
                            "The candidates",
                            "entered into",
                            "the hall before the bell in Practice Case 78",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "For physical entry, use ‘enter’ without ‘into’. Correct: ‘entered the hall’."
            },
            {
                    "id": "detecting-errors-preposition-set-2-q23",
                    "topic": "Preposition - Depends On",
                    "difficulty": "hard",
                    "question": "The result depends of the final answer key in Practice Case 79",
                    "options": [
                            "The result",
                            "depends of",
                            "the final answer key in Practice Case 79",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Depend’ is followed by ‘on/upon’. Correct: ‘depends on’."
            },
            {
                    "id": "detecting-errors-preposition-set-2-q24",
                    "topic": "Preposition - No Error",
                    "difficulty": "hard",
                    "question": "Isha apologized to the teacher for his mistake in Practice Case 80",
                    "options": [
                            "Isha apologized",
                            "to the teacher",
                            "for his mistake in Practice Case 80",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. The pattern is ‘apologize to someone for something’."
            },
            {
                    "id": "detecting-errors-preposition-set-2-q25",
                    "topic": "Preposition - Accused Of",
                    "difficulty": "hard",
                    "question": "Varun was accused for hiding the article in Practice Case 81",
                    "options": [
                            "Varun was accused",
                            "for hiding",
                            "the article in Practice Case 81",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Accused’ takes ‘of’, not ‘for’. Correct phrase: ‘accused of hiding’."
            },
            {
                    "id": "detecting-errors-preposition-set-2-q26",
                    "topic": "Preposition - Good At",
                    "difficulty": "hard",
                    "question": "Suresh is good in solving reasoning questions in Practice Case 83",
                    "options": [
                            "Suresh is",
                            "good in solving",
                            "reasoning questions in Practice Case 83",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Use ‘good at + noun/gerund’. Correct phrase: ‘good at solving’."
            },
            {
                    "id": "detecting-errors-preposition-set-2-q27",
                    "topic": "Preposition - Discuss",
                    "difficulty": "hard",
                    "question": "The committee discussed about the new rule in Practice Case 85",
                    "options": [
                            "The committee",
                            "discussed about",
                            "the new rule in Practice Case 85",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Discuss’ is transitive and does not take ‘about’ immediately after it. Correct: ‘discussed the rule’."
            },
            {
                    "id": "detecting-errors-preposition-set-2-q28",
                    "topic": "Preposition - Enter",
                    "difficulty": "hard",
                    "question": "The candidates entered into the hall before the bell in Practice Case 86",
                    "options": [
                            "The candidates",
                            "entered into",
                            "the hall before the bell in Practice Case 86",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "For physical entry, use ‘enter’ without ‘into’. Correct: ‘entered the hall’."
            },
            {
                    "id": "detecting-errors-preposition-set-2-q29",
                    "topic": "Preposition - Depends On",
                    "difficulty": "hard",
                    "question": "The result depends of the final answer key in Practice Case 87",
                    "options": [
                            "The result",
                            "depends of",
                            "the final answer key in Practice Case 87",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Depend’ is followed by ‘on/upon’. Correct: ‘depends on’."
            },
            {
                    "id": "detecting-errors-preposition-set-2-q30",
                    "topic": "Preposition - No Error",
                    "difficulty": "hard",
                    "question": "Shreya apologized to the teacher for his mistake in Practice Case 88",
                    "options": [
                            "Shreya apologized",
                            "to the teacher",
                            "for his mistake in Practice Case 88",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. The pattern is ‘apologize to someone for something’."
            },
            {
                    "id": "detecting-errors-preposition-set-2-q31",
                    "topic": "Preposition - Accused Of",
                    "difficulty": "hard",
                    "question": "Harish was accused for hiding the answer sheet in Practice Case 89",
                    "options": [
                            "Harish was accused",
                            "for hiding",
                            "the answer sheet in Practice Case 89",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Accused’ takes ‘of’, not ‘for’. Correct phrase: ‘accused of hiding’."
            },
            {
                    "id": "detecting-errors-preposition-set-2-q32",
                    "topic": "Preposition - Good At",
                    "difficulty": "hard",
                    "question": "Aarav is good in solving reasoning questions in Practice Case 91",
                    "options": [
                            "Aarav is",
                            "good in solving",
                            "reasoning questions in Practice Case 91",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Use ‘good at + noun/gerund’. Correct phrase: ‘good at solving’."
            },
            {
                    "id": "detecting-errors-preposition-set-2-q33",
                    "topic": "Preposition - Discuss",
                    "difficulty": "hard",
                    "question": "The committee discussed about the new rule in Practice Case 93",
                    "options": [
                            "The committee",
                            "discussed about",
                            "the new rule in Practice Case 93",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Discuss’ is transitive and does not take ‘about’ immediately after it. Correct: ‘discussed the rule’."
            },
            {
                    "id": "detecting-errors-preposition-set-2-q34",
                    "topic": "Preposition - Enter",
                    "difficulty": "hard",
                    "question": "The candidates entered into the hall before the bell in Practice Case 94",
                    "options": [
                            "The candidates",
                            "entered into",
                            "the hall before the bell in Practice Case 94",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "For physical entry, use ‘enter’ without ‘into’. Correct: ‘entered the hall’."
            },
            {
                    "id": "detecting-errors-preposition-set-2-q35",
                    "topic": "Preposition - Depends On",
                    "difficulty": "hard",
                    "question": "The result depends of the final answer key in Practice Case 95",
                    "options": [
                            "The result",
                            "depends of",
                            "the final answer key in Practice Case 95",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Depend’ is followed by ‘on/upon’. Correct: ‘depends on’."
            },
            {
                    "id": "detecting-errors-preposition-set-2-q36",
                    "topic": "Preposition - No Error",
                    "difficulty": "hard",
                    "question": "Neha apologized to the teacher for his mistake in Practice Case 96",
                    "options": [
                            "Neha apologized",
                            "to the teacher",
                            "for his mistake in Practice Case 96",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. The pattern is ‘apologize to someone for something’."
            },
            {
                    "id": "detecting-errors-preposition-set-2-q37",
                    "topic": "Preposition - Accused Of",
                    "difficulty": "hard",
                    "question": "Vivek was accused for hiding the notice in Practice Case 97",
                    "options": [
                            "Vivek was accused",
                            "for hiding",
                            "the notice in Practice Case 97",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Accused’ takes ‘of’, not ‘for’. Correct phrase: ‘accused of hiding’."
            },
            {
                    "id": "detecting-errors-preposition-set-2-q38",
                    "topic": "Preposition - Good At",
                    "difficulty": "hard",
                    "question": "Rohan is good in solving reasoning questions in Practice Case 99",
                    "options": [
                            "Rohan is",
                            "good in solving",
                            "reasoning questions in Practice Case 99",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Use ‘good at + noun/gerund’. Correct phrase: ‘good at solving’."
            },
            {
                    "id": "detecting-errors-preposition-set-2-q39",
                    "topic": "Preposition - Discuss",
                    "difficulty": "hard",
                    "question": "The committee discussed about the new rule in Practice Case 101",
                    "options": [
                            "The committee",
                            "discussed about",
                            "the new rule in Practice Case 101",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Discuss’ is transitive and does not take ‘about’ immediately after it. Correct: ‘discussed the rule’."
            },
            {
                    "id": "detecting-errors-preposition-set-2-q40",
                    "topic": "Preposition - Enter",
                    "difficulty": "hard",
                    "question": "The candidates entered into the hall before the bell in Practice Case 102",
                    "options": [
                            "The candidates",
                            "entered into",
                            "the hall before the bell in Practice Case 102",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "For physical entry, use ‘enter’ without ‘into’. Correct: ‘entered the hall’."
            },
            {
                    "id": "detecting-errors-preposition-set-2-q41",
                    "topic": "Preposition - Depends On",
                    "difficulty": "hard",
                    "question": "The result depends of the final answer key in Practice Case 103",
                    "options": [
                            "The result",
                            "depends of",
                            "the final answer key in Practice Case 103",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Depend’ is followed by ‘on/upon’. Correct: ‘depends on’."
            },
            {
                    "id": "detecting-errors-preposition-set-2-q42",
                    "topic": "Preposition - No Error",
                    "difficulty": "hard",
                    "question": "Kavita apologized to the teacher for his mistake in Practice Case 104",
                    "options": [
                            "Kavita apologized",
                            "to the teacher",
                            "for his mistake in Practice Case 104",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. The pattern is ‘apologize to someone for something’."
            },
            {
                    "id": "detecting-errors-preposition-set-2-q43",
                    "topic": "Preposition - Accused Of",
                    "difficulty": "hard",
                    "question": "Deepak was accused for hiding the presentation in Practice Case 105",
                    "options": [
                            "Deepak was accused",
                            "for hiding",
                            "the presentation in Practice Case 105",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Accused’ takes ‘of’, not ‘for’. Correct phrase: ‘accused of hiding’."
            },
            {
                    "id": "detecting-errors-preposition-set-2-q44",
                    "topic": "Preposition - Good At",
                    "difficulty": "hard",
                    "question": "Rahul is good in solving reasoning questions in Practice Case 107",
                    "options": [
                            "Rahul is",
                            "good in solving",
                            "reasoning questions in Practice Case 107",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Use ‘good at + noun/gerund’. Correct phrase: ‘good at solving’."
            },
            {
                    "id": "detecting-errors-preposition-set-2-q45",
                    "topic": "Preposition - Discuss",
                    "difficulty": "hard",
                    "question": "The committee discussed about the new rule in Practice Case 109",
                    "options": [
                            "The committee",
                            "discussed about",
                            "the new rule in Practice Case 109",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Discuss’ is transitive and does not take ‘about’ immediately after it. Correct: ‘discussed the rule’."
            },
            {
                    "id": "detecting-errors-preposition-set-2-q46",
                    "topic": "Preposition - Enter",
                    "difficulty": "hard",
                    "question": "The candidates entered into the hall before the bell in Practice Case 110",
                    "options": [
                            "The candidates",
                            "entered into",
                            "the hall before the bell in Practice Case 110",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "For physical entry, use ‘enter’ without ‘into’. Correct: ‘entered the hall’."
            },
            {
                    "id": "detecting-errors-preposition-set-2-q47",
                    "topic": "Preposition - Depends On",
                    "difficulty": "hard",
                    "question": "The result depends of the final answer key in Practice Case 111",
                    "options": [
                            "The result",
                            "depends of",
                            "the final answer key in Practice Case 111",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Depend’ is followed by ‘on/upon’. Correct: ‘depends on’."
            },
            {
                    "id": "detecting-errors-preposition-set-2-q48",
                    "topic": "Preposition - No Error",
                    "difficulty": "hard",
                    "question": "Riya apologized to the teacher for his mistake in Practice Case 112",
                    "options": [
                            "Riya apologized",
                            "to the teacher",
                            "for his mistake in Practice Case 112",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. The pattern is ‘apologize to someone for something’."
            },
            {
                    "id": "detecting-errors-preposition-set-2-q49",
                    "topic": "Preposition - Accused Of",
                    "difficulty": "hard",
                    "question": "Suresh was accused for hiding the summary in Practice Case 113",
                    "options": [
                            "Suresh was accused",
                            "for hiding",
                            "the summary in Practice Case 113",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Accused’ takes ‘of’, not ‘for’. Correct phrase: ‘accused of hiding’."
            },
            {
                    "id": "detecting-errors-preposition-set-2-q50",
                    "topic": "Preposition - Good At",
                    "difficulty": "hard",
                    "question": "Akash is good in solving reasoning questions in Practice Case 115",
                    "options": [
                            "Akash is",
                            "good in solving",
                            "reasoning questions in Practice Case 115",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Use ‘good at + noun/gerund’. Correct phrase: ‘good at solving’."
            }
    ];

    window.GJU_QUIZ_BANK.push({
        id: quizId,
        subject: "English",
        title: "Detecting Errors - Preposition Set 2",
        description: "50 advanced preposition detecting error questions for government exam English.",
        durationMinutes: 30,
        totalQuestions: questions.length,
        marksPerQuestion: 1,
        negativeMarks: 0.25,
        difficulty: "Hard",
        tags: ["SSC", "Railway", "Police", "English", "Detecting Errors"],
        questions
    });
}());
