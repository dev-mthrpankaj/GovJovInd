(function () {
    "use strict";

    window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];

    const quizId = "detecting-errors-adverb-conditional-set-1";

    const questions = [
            {
                    "id": "detecting-errors-adverb-conditional-set-1-q01",
                    "topic": "Adverb - Adjective/Adverb",
                    "difficulty": "hard",
                    "question": "Aarav speaks English fluent during interviews in Practice Case 1",
                    "options": [
                            "Aarav speaks",
                            "English fluent",
                            "during interviews in Practice Case 1",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "A verb is modified by an adverb. Correct phrase: ‘speaks English fluently’."
            },
            {
                    "id": "detecting-errors-adverb-conditional-set-1-q02",
                    "topic": "Adverb - Hard/Hardly",
                    "difficulty": "hard",
                    "question": "He worked hardly to finish the syllabus for SSC CPO",
                    "options": [
                            "He worked",
                            "hardly to finish",
                            "the syllabus for SSC CPO",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Hard’ means with effort; ‘hardly’ means almost not. Correct: ‘worked hard’."
            },
            {
                    "id": "detecting-errors-adverb-conditional-set-1-q03",
                    "topic": "Conditional - First Conditional",
                    "difficulty": "hard",
                    "question": "If I will get time I shall revise the project in Practice Case 3",
                    "options": [
                            "If I will get time",
                            "I shall revise the project",
                            "in Practice Case 3",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "In a first conditional if-clause, use simple present, not ‘will’. Correct: ‘If I get time’."
            },
            {
                    "id": "detecting-errors-adverb-conditional-set-1-q04",
                    "topic": "Conditional - No Error",
                    "difficulty": "hard",
                    "question": "If he had revised properly he would have cleared UP Police",
                    "options": [
                            "If he had revised",
                            "properly",
                            "he would have cleared UP Police",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. It follows third conditional: if + past perfect, would have + V3."
            },
            {
                    "id": "detecting-errors-adverb-conditional-set-1-q05",
                    "topic": "Adverb - Too/So",
                    "difficulty": "hard",
                    "question": "She is too tired that she cannot attend the class in Practice Case 5",
                    "options": [
                            "She is",
                            "too tired that",
                            "she cannot attend the class in Practice Case 5",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Use either ‘so...that’ or ‘too...to’. Correct: ‘so tired that’ or ‘too tired to attend’."
            },
            {
                    "id": "detecting-errors-adverb-conditional-set-1-q06",
                    "topic": "Conditional - Third Conditional",
                    "difficulty": "hard",
                    "question": "Had he informed me earlier I would help him in Practice Case 6",
                    "options": [
                            "Had he informed",
                            "me earlier",
                            "I would help him in Practice Case 6",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "With ‘Had + subject + V3’, use ‘would have + V3’. Correct: ‘I would have helped’."
            },
            {
                    "id": "detecting-errors-adverb-conditional-set-1-q07",
                    "topic": "Adverb - Modifier",
                    "difficulty": "hard",
                    "question": "Vivek is very senior to me in Practice Case 7",
                    "options": [
                            "Vivek is",
                            "very senior",
                            "to me in Practice Case 7",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Senior’ is comparative in meaning and is normally modified by ‘much’, not ‘very’."
            },
            {
                    "id": "detecting-errors-adverb-conditional-set-1-q08",
                    "topic": "Adverb - No Error",
                    "difficulty": "hard",
                    "question": "She solved almost all the questions in the mock test in Practice Case 8",
                    "options": [
                            "She solved",
                            "almost all the questions",
                            "in the mock test in Practice Case 8",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Almost’ is placed before ‘all’, making the intended meaning clear."
            },
            {
                    "id": "detecting-errors-adverb-conditional-set-1-q09",
                    "topic": "Adverb - Adjective/Adverb",
                    "difficulty": "hard",
                    "question": "Rohan speaks English fluent during interviews in Practice Case 9",
                    "options": [
                            "Rohan speaks",
                            "English fluent",
                            "during interviews in Practice Case 9",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "A verb is modified by an adverb. Correct phrase: ‘speaks English fluently’."
            },
            {
                    "id": "detecting-errors-adverb-conditional-set-1-q10",
                    "topic": "Adverb - Hard/Hardly",
                    "difficulty": "hard",
                    "question": "He worked hardly to finish the syllabus for CDS",
                    "options": [
                            "He worked",
                            "hardly to finish",
                            "the syllabus for CDS",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Hard’ means with effort; ‘hardly’ means almost not. Correct: ‘worked hard’."
            },
            {
                    "id": "detecting-errors-adverb-conditional-set-1-q11",
                    "topic": "Conditional - First Conditional",
                    "difficulty": "hard",
                    "question": "If I will get time I shall revise the file in Practice Case 11",
                    "options": [
                            "If I will get time",
                            "I shall revise the file",
                            "in Practice Case 11",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "In a first conditional if-clause, use simple present, not ‘will’. Correct: ‘If I get time’."
            },
            {
                    "id": "detecting-errors-adverb-conditional-set-1-q12",
                    "topic": "Conditional - No Error",
                    "difficulty": "hard",
                    "question": "If he had revised properly he would have cleared SSC CPO",
                    "options": [
                            "If he had revised",
                            "properly",
                            "he would have cleared SSC CPO",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. It follows third conditional: if + past perfect, would have + V3."
            },
            {
                    "id": "detecting-errors-adverb-conditional-set-1-q13",
                    "topic": "Adverb - Too/So",
                    "difficulty": "hard",
                    "question": "She is too tired that she cannot attend the class in Practice Case 13",
                    "options": [
                            "She is",
                            "too tired that",
                            "she cannot attend the class in Practice Case 13",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Use either ‘so...that’ or ‘too...to’. Correct: ‘so tired that’ or ‘too tired to attend’."
            },
            {
                    "id": "detecting-errors-adverb-conditional-set-1-q14",
                    "topic": "Conditional - Third Conditional",
                    "difficulty": "hard",
                    "question": "Had he informed me earlier I would help him in Practice Case 14",
                    "options": [
                            "Had he informed",
                            "me earlier",
                            "I would help him in Practice Case 14",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "With ‘Had + subject + V3’, use ‘would have + V3’. Correct: ‘I would have helped’."
            },
            {
                    "id": "detecting-errors-adverb-conditional-set-1-q15",
                    "topic": "Adverb - Modifier",
                    "difficulty": "hard",
                    "question": "Deepak is very senior to me in Practice Case 15",
                    "options": [
                            "Deepak is",
                            "very senior",
                            "to me in Practice Case 15",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Senior’ is comparative in meaning and is normally modified by ‘much’, not ‘very’."
            },
            {
                    "id": "detecting-errors-adverb-conditional-set-1-q16",
                    "topic": "Adverb - No Error",
                    "difficulty": "hard",
                    "question": "She solved almost all the questions in the mock test in Practice Case 16",
                    "options": [
                            "She solved",
                            "almost all the questions",
                            "in the mock test in Practice Case 16",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Almost’ is placed before ‘all’, making the intended meaning clear."
            },
            {
                    "id": "detecting-errors-adverb-conditional-set-1-q17",
                    "topic": "Adverb - Adjective/Adverb",
                    "difficulty": "hard",
                    "question": "Rahul speaks English fluent during interviews in Practice Case 17",
                    "options": [
                            "Rahul speaks",
                            "English fluent",
                            "during interviews in Practice Case 17",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "A verb is modified by an adverb. Correct phrase: ‘speaks English fluently’."
            },
            {
                    "id": "detecting-errors-adverb-conditional-set-1-q18",
                    "topic": "Adverb - Hard/Hardly",
                    "difficulty": "hard",
                    "question": "He worked hardly to finish the syllabus for UP Lekhpal",
                    "options": [
                            "He worked",
                            "hardly to finish",
                            "the syllabus for UP Lekhpal",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Hard’ means with effort; ‘hardly’ means almost not. Correct: ‘worked hard’."
            },
            {
                    "id": "detecting-errors-adverb-conditional-set-1-q19",
                    "topic": "Conditional - First Conditional",
                    "difficulty": "hard",
                    "question": "If I will get time I shall revise the letter in Practice Case 19",
                    "options": [
                            "If I will get time",
                            "I shall revise the letter",
                            "in Practice Case 19",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "In a first conditional if-clause, use simple present, not ‘will’. Correct: ‘If I get time’."
            },
            {
                    "id": "detecting-errors-adverb-conditional-set-1-q20",
                    "topic": "Conditional - No Error",
                    "difficulty": "hard",
                    "question": "If he had revised properly he would have cleared CDS",
                    "options": [
                            "If he had revised",
                            "properly",
                            "he would have cleared CDS",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. It follows third conditional: if + past perfect, would have + V3."
            },
            {
                    "id": "detecting-errors-adverb-conditional-set-1-q21",
                    "topic": "Adverb - Too/So",
                    "difficulty": "hard",
                    "question": "She is too tired that she cannot attend the class in Practice Case 21",
                    "options": [
                            "She is",
                            "too tired that",
                            "she cannot attend the class in Practice Case 21",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Use either ‘so...that’ or ‘too...to’. Correct: ‘so tired that’ or ‘too tired to attend’."
            },
            {
                    "id": "detecting-errors-adverb-conditional-set-1-q22",
                    "topic": "Conditional - Third Conditional",
                    "difficulty": "hard",
                    "question": "Had he informed me earlier I would help him in Practice Case 22",
                    "options": [
                            "Had he informed",
                            "me earlier",
                            "I would help him in Practice Case 22",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "With ‘Had + subject + V3’, use ‘would have + V3’. Correct: ‘I would have helped’."
            },
            {
                    "id": "detecting-errors-adverb-conditional-set-1-q23",
                    "topic": "Adverb - Modifier",
                    "difficulty": "hard",
                    "question": "Suresh is very senior to me in Practice Case 23",
                    "options": [
                            "Suresh is",
                            "very senior",
                            "to me in Practice Case 23",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Senior’ is comparative in meaning and is normally modified by ‘much’, not ‘very’."
            },
            {
                    "id": "detecting-errors-adverb-conditional-set-1-q24",
                    "topic": "Adverb - No Error",
                    "difficulty": "hard",
                    "question": "She solved almost all the questions in the mock test in Practice Case 24",
                    "options": [
                            "She solved",
                            "almost all the questions",
                            "in the mock test in Practice Case 24",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Almost’ is placed before ‘all’, making the intended meaning clear."
            },
            {
                    "id": "detecting-errors-adverb-conditional-set-1-q25",
                    "topic": "Adverb - Adjective/Adverb",
                    "difficulty": "hard",
                    "question": "Akash speaks English fluent during interviews in Practice Case 25",
                    "options": [
                            "Akash speaks",
                            "English fluent",
                            "during interviews in Practice Case 25",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "A verb is modified by an adverb. Correct phrase: ‘speaks English fluently’."
            },
            {
                    "id": "detecting-errors-adverb-conditional-set-1-q26",
                    "topic": "Adverb - Hard/Hardly",
                    "difficulty": "hard",
                    "question": "He worked hardly to finish the syllabus for Bank Clerk",
                    "options": [
                            "He worked",
                            "hardly to finish",
                            "the syllabus for Bank Clerk",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Hard’ means with effort; ‘hardly’ means almost not. Correct: ‘worked hard’."
            },
            {
                    "id": "detecting-errors-adverb-conditional-set-1-q27",
                    "topic": "Conditional - First Conditional",
                    "difficulty": "hard",
                    "question": "If I will get time I shall revise the document in Practice Case 27",
                    "options": [
                            "If I will get time",
                            "I shall revise the document",
                            "in Practice Case 27",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "In a first conditional if-clause, use simple present, not ‘will’. Correct: ‘If I get time’."
            },
            {
                    "id": "detecting-errors-adverb-conditional-set-1-q28",
                    "topic": "Conditional - No Error",
                    "difficulty": "hard",
                    "question": "If he had revised properly he would have cleared UP Lekhpal",
                    "options": [
                            "If he had revised",
                            "properly",
                            "he would have cleared UP Lekhpal",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. It follows third conditional: if + past perfect, would have + V3."
            },
            {
                    "id": "detecting-errors-adverb-conditional-set-1-q29",
                    "topic": "Adverb - Too/So",
                    "difficulty": "hard",
                    "question": "She is too tired that she cannot attend the class in Practice Case 29",
                    "options": [
                            "She is",
                            "too tired that",
                            "she cannot attend the class in Practice Case 29",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Use either ‘so...that’ or ‘too...to’. Correct: ‘so tired that’ or ‘too tired to attend’."
            },
            {
                    "id": "detecting-errors-adverb-conditional-set-1-q30",
                    "topic": "Conditional - Third Conditional",
                    "difficulty": "hard",
                    "question": "Had he informed me earlier I would help him in Practice Case 30",
                    "options": [
                            "Had he informed",
                            "me earlier",
                            "I would help him in Practice Case 30",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "With ‘Had + subject + V3’, use ‘would have + V3’. Correct: ‘I would have helped’."
            },
            {
                    "id": "detecting-errors-adverb-conditional-set-1-q31",
                    "topic": "Adverb - Modifier",
                    "difficulty": "hard",
                    "question": "Aarav is very senior to me in Practice Case 31",
                    "options": [
                            "Aarav is",
                            "very senior",
                            "to me in Practice Case 31",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Senior’ is comparative in meaning and is normally modified by ‘much’, not ‘very’."
            },
            {
                    "id": "detecting-errors-adverb-conditional-set-1-q32",
                    "topic": "Adverb - No Error",
                    "difficulty": "hard",
                    "question": "She solved almost all the questions in the mock test in Practice Case 32",
                    "options": [
                            "She solved",
                            "almost all the questions",
                            "in the mock test in Practice Case 32",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Almost’ is placed before ‘all’, making the intended meaning clear."
            },
            {
                    "id": "detecting-errors-adverb-conditional-set-1-q33",
                    "topic": "Adverb - Adjective/Adverb",
                    "difficulty": "hard",
                    "question": "Mohit speaks English fluent during interviews in Practice Case 33",
                    "options": [
                            "Mohit speaks",
                            "English fluent",
                            "during interviews in Practice Case 33",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "A verb is modified by an adverb. Correct phrase: ‘speaks English fluently’."
            },
            {
                    "id": "detecting-errors-adverb-conditional-set-1-q34",
                    "topic": "Adverb - Hard/Hardly",
                    "difficulty": "hard",
                    "question": "He worked hardly to finish the syllabus for UP Police",
                    "options": [
                            "He worked",
                            "hardly to finish",
                            "the syllabus for UP Police",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Hard’ means with effort; ‘hardly’ means almost not. Correct: ‘worked hard’."
            },
            {
                    "id": "detecting-errors-adverb-conditional-set-1-q35",
                    "topic": "Conditional - First Conditional",
                    "difficulty": "hard",
                    "question": "If I will get time I shall revise the proposal in Practice Case 35",
                    "options": [
                            "If I will get time",
                            "I shall revise the proposal",
                            "in Practice Case 35",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "In a first conditional if-clause, use simple present, not ‘will’. Correct: ‘If I get time’."
            },
            {
                    "id": "detecting-errors-adverb-conditional-set-1-q36",
                    "topic": "Conditional - No Error",
                    "difficulty": "hard",
                    "question": "If he had revised properly he would have cleared Bank Clerk",
                    "options": [
                            "If he had revised",
                            "properly",
                            "he would have cleared Bank Clerk",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. It follows third conditional: if + past perfect, would have + V3."
            },
            {
                    "id": "detecting-errors-adverb-conditional-set-1-q37",
                    "topic": "Adverb - Too/So",
                    "difficulty": "hard",
                    "question": "She is too tired that she cannot attend the class in Practice Case 37",
                    "options": [
                            "She is",
                            "too tired that",
                            "she cannot attend the class in Practice Case 37",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Use either ‘so...that’ or ‘too...to’. Correct: ‘so tired that’ or ‘too tired to attend’."
            },
            {
                    "id": "detecting-errors-adverb-conditional-set-1-q38",
                    "topic": "Conditional - Third Conditional",
                    "difficulty": "hard",
                    "question": "Had he informed me earlier I would help him in Practice Case 38",
                    "options": [
                            "Had he informed",
                            "me earlier",
                            "I would help him in Practice Case 38",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "With ‘Had + subject + V3’, use ‘would have + V3’. Correct: ‘I would have helped’."
            },
            {
                    "id": "detecting-errors-adverb-conditional-set-1-q39",
                    "topic": "Adverb - Modifier",
                    "difficulty": "hard",
                    "question": "Rohan is very senior to me in Practice Case 39",
                    "options": [
                            "Rohan is",
                            "very senior",
                            "to me in Practice Case 39",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Senior’ is comparative in meaning and is normally modified by ‘much’, not ‘very’."
            },
            {
                    "id": "detecting-errors-adverb-conditional-set-1-q40",
                    "topic": "Adverb - No Error",
                    "difficulty": "hard",
                    "question": "She solved almost all the questions in the mock test in Practice Case 40",
                    "options": [
                            "She solved",
                            "almost all the questions",
                            "in the mock test in Practice Case 40",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Almost’ is placed before ‘all’, making the intended meaning clear."
            },
            {
                    "id": "detecting-errors-adverb-conditional-set-1-q41",
                    "topic": "Adverb - Adjective/Adverb",
                    "difficulty": "hard",
                    "question": "Nikhil speaks English fluent during interviews in Practice Case 41",
                    "options": [
                            "Nikhil speaks",
                            "English fluent",
                            "during interviews in Practice Case 41",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "A verb is modified by an adverb. Correct phrase: ‘speaks English fluently’."
            },
            {
                    "id": "detecting-errors-adverb-conditional-set-1-q42",
                    "topic": "Conditional - First Conditional",
                    "difficulty": "hard",
                    "question": "If I will get time I shall revise the essay in Practice Case 43",
                    "options": [
                            "If I will get time",
                            "I shall revise the essay",
                            "in Practice Case 43",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "In a first conditional if-clause, use simple present, not ‘will’. Correct: ‘If I get time’."
            },
            {
                    "id": "detecting-errors-adverb-conditional-set-1-q43",
                    "topic": "Adverb - Too/So",
                    "difficulty": "hard",
                    "question": "She is too tired that she cannot attend the class in Practice Case 45",
                    "options": [
                            "She is",
                            "too tired that",
                            "she cannot attend the class in Practice Case 45",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Use either ‘so...that’ or ‘too...to’. Correct: ‘so tired that’ or ‘too tired to attend’."
            },
            {
                    "id": "detecting-errors-adverb-conditional-set-1-q44",
                    "topic": "Conditional - Third Conditional",
                    "difficulty": "hard",
                    "question": "Had he informed me earlier I would help him in Practice Case 46",
                    "options": [
                            "Had he informed",
                            "me earlier",
                            "I would help him in Practice Case 46",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "With ‘Had + subject + V3’, use ‘would have + V3’. Correct: ‘I would have helped’."
            },
            {
                    "id": "detecting-errors-adverb-conditional-set-1-q45",
                    "topic": "Adverb - Modifier",
                    "difficulty": "hard",
                    "question": "Rahul is very senior to me in Practice Case 47",
                    "options": [
                            "Rahul is",
                            "very senior",
                            "to me in Practice Case 47",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Senior’ is comparative in meaning and is normally modified by ‘much’, not ‘very’."
            },
            {
                    "id": "detecting-errors-adverb-conditional-set-1-q46",
                    "topic": "Adverb - No Error",
                    "difficulty": "hard",
                    "question": "She solved almost all the questions in the mock test in Practice Case 48",
                    "options": [
                            "She solved",
                            "almost all the questions",
                            "in the mock test in Practice Case 48",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Almost’ is placed before ‘all’, making the intended meaning clear."
            },
            {
                    "id": "detecting-errors-adverb-conditional-set-1-q47",
                    "topic": "Adverb - Adjective/Adverb",
                    "difficulty": "hard",
                    "question": "Gaurav speaks English fluent during interviews in Practice Case 49",
                    "options": [
                            "Gaurav speaks",
                            "English fluent",
                            "during interviews in Practice Case 49",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "A verb is modified by an adverb. Correct phrase: ‘speaks English fluently’."
            },
            {
                    "id": "detecting-errors-adverb-conditional-set-1-q48",
                    "topic": "Conditional - First Conditional",
                    "difficulty": "hard",
                    "question": "If I will get time I shall revise the article in Practice Case 51",
                    "options": [
                            "If I will get time",
                            "I shall revise the article",
                            "in Practice Case 51",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "In a first conditional if-clause, use simple present, not ‘will’. Correct: ‘If I get time’."
            },
            {
                    "id": "detecting-errors-adverb-conditional-set-1-q49",
                    "topic": "Adverb - Too/So",
                    "difficulty": "hard",
                    "question": "She is too tired that she cannot attend the class in Practice Case 53",
                    "options": [
                            "She is",
                            "too tired that",
                            "she cannot attend the class in Practice Case 53",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Use either ‘so...that’ or ‘too...to’. Correct: ‘so tired that’ or ‘too tired to attend’."
            },
            {
                    "id": "detecting-errors-adverb-conditional-set-1-q50",
                    "topic": "Conditional - Third Conditional",
                    "difficulty": "hard",
                    "question": "Had he informed me earlier I would help him in Practice Case 54",
                    "options": [
                            "Had he informed",
                            "me earlier",
                            "I would help him in Practice Case 54",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "With ‘Had + subject + V3’, use ‘would have + V3’. Correct: ‘I would have helped’."
            }
    ];

    window.GJU_QUIZ_BANK.push({
        id: quizId,
        subject: "English",
        title: "Detecting Errors - Adverb & Conditional Set 1",
        description: "50 detecting error questions on adverbs and conditional sentences.",
        durationMinutes: 30,
        totalQuestions: questions.length,
        marksPerQuestion: 1,
        negativeMarks: 0.25,
        difficulty: "Hard",
        tags: ["SSC", "Railway", "Police", "English", "Detecting Errors"],
        questions
    });
}());
