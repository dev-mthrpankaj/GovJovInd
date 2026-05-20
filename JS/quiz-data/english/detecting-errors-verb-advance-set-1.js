(function () {
    "use strict";

    window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];

    const quizId = "detecting-errors-verb-advance-set-1";

    const questions = [
            {
                    "id": "detecting-errors-verb-advance-set-1-q01",
                    "topic": "Verb Advance - Dangling Participle",
                    "difficulty": "hard",
                    "question": "Having completed the form the fee was paid online in Practice Case 1",
                    "options": [
                            "Having completed",
                            "the form",
                            "the fee was paid online in Practice Case 1",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "A participial phrase must modify the subject. The fee did not complete the form. Correct: ‘Having completed the form, he paid...’."
            },
            {
                    "id": "detecting-errors-verb-advance-set-1-q02",
                    "topic": "Verb Advance - Misrelated Participle",
                    "difficulty": "hard",
                    "question": "Walking on the road a snake was seen by the boys in Practice Case 2",
                    "options": [
                            "Walking on the road",
                            "a snake was seen",
                            "by the boys in Practice Case 2",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "The phrase wrongly modifies ‘snake’. Correct: ‘While the boys were walking on the road...’."
            },
            {
                    "id": "detecting-errors-verb-advance-set-1-q03",
                    "topic": "Verb Advance - No Error",
                    "difficulty": "hard",
                    "question": "He had his application checked by the operator in Practice Case 3",
                    "options": [
                            "He had",
                            "his application checked",
                            "by the operator in Practice Case 3",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Have + object + V3’ expresses causative passive."
            },
            {
                    "id": "detecting-errors-verb-advance-set-1-q04",
                    "topic": "Verb Advance - Causative",
                    "difficulty": "hard",
                    "question": "I got my documents verify before submission in Practice Case 4",
                    "options": [
                            "I got",
                            "my documents verify",
                            "before submission in Practice Case 4",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Causative passive with ‘get’ uses object + V3. Correct: ‘got my documents verified’."
            },
            {
                    "id": "detecting-errors-verb-advance-set-1-q05",
                    "topic": "Verb Advance - Dangling Participle",
                    "difficulty": "hard",
                    "question": "Being a rainy day we cancelled practice in Practice Case 5",
                    "options": [
                            "Being a rainy day",
                            "we cancelled",
                            "practice in Practice Case 5",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "The phrase has no logical subject. Correct: ‘As it was a rainy day...’."
            },
            {
                    "id": "detecting-errors-verb-advance-set-1-q06",
                    "topic": "Verb Advance - Used To",
                    "difficulty": "hard",
                    "question": "The students are used to solve questions under pressure in Practice Case 6",
                    "options": [
                            "The students",
                            "are used to solve",
                            "questions under pressure in Practice Case 6",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Be used to’ means accustomed to and takes gerund. Correct: ‘are used to solving’."
            },
            {
                    "id": "detecting-errors-verb-advance-set-1-q07",
                    "topic": "Verb Advance - No Error",
                    "difficulty": "hard",
                    "question": "He used to wake up early during training in Practice Case 7",
                    "options": [
                            "He used to",
                            "wake up early",
                            "during training in Practice Case 7",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Used to + V1’ expresses past habit."
            },
            {
                    "id": "detecting-errors-verb-advance-set-1-q08",
                    "topic": "Verb Advance - Keep + V-ing",
                    "difficulty": "hard",
                    "question": "The officer kept the applicants waited for two hours in Practice Case 8",
                    "options": [
                            "The officer kept",
                            "the applicants waited",
                            "for two hours in Practice Case 8",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "After ‘keep + object’, use present participle. Correct: ‘kept the applicants waiting’."
            },
            {
                    "id": "detecting-errors-verb-advance-set-1-q09",
                    "topic": "Verb Advance - Dangling Participle",
                    "difficulty": "hard",
                    "question": "Having completed the form the fee was paid online in Practice Case 9",
                    "options": [
                            "Having completed",
                            "the form",
                            "the fee was paid online in Practice Case 9",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "A participial phrase must modify the subject. The fee did not complete the form. Correct: ‘Having completed the form, he paid...’."
            },
            {
                    "id": "detecting-errors-verb-advance-set-1-q10",
                    "topic": "Verb Advance - Misrelated Participle",
                    "difficulty": "hard",
                    "question": "Walking on the road a snake was seen by the boys in Practice Case 10",
                    "options": [
                            "Walking on the road",
                            "a snake was seen",
                            "by the boys in Practice Case 10",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "The phrase wrongly modifies ‘snake’. Correct: ‘While the boys were walking on the road...’."
            },
            {
                    "id": "detecting-errors-verb-advance-set-1-q11",
                    "topic": "Verb Advance - No Error",
                    "difficulty": "hard",
                    "question": "He had his application checked by the operator in Practice Case 11",
                    "options": [
                            "He had",
                            "his application checked",
                            "by the operator in Practice Case 11",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Have + object + V3’ expresses causative passive."
            },
            {
                    "id": "detecting-errors-verb-advance-set-1-q12",
                    "topic": "Verb Advance - Causative",
                    "difficulty": "hard",
                    "question": "I got my documents verify before submission in Practice Case 12",
                    "options": [
                            "I got",
                            "my documents verify",
                            "before submission in Practice Case 12",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Causative passive with ‘get’ uses object + V3. Correct: ‘got my documents verified’."
            },
            {
                    "id": "detecting-errors-verb-advance-set-1-q13",
                    "topic": "Verb Advance - Dangling Participle",
                    "difficulty": "hard",
                    "question": "Being a rainy day we cancelled practice in Practice Case 13",
                    "options": [
                            "Being a rainy day",
                            "we cancelled",
                            "practice in Practice Case 13",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "The phrase has no logical subject. Correct: ‘As it was a rainy day...’."
            },
            {
                    "id": "detecting-errors-verb-advance-set-1-q14",
                    "topic": "Verb Advance - Used To",
                    "difficulty": "hard",
                    "question": "The students are used to solve questions under pressure in Practice Case 14",
                    "options": [
                            "The students",
                            "are used to solve",
                            "questions under pressure in Practice Case 14",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Be used to’ means accustomed to and takes gerund. Correct: ‘are used to solving’."
            },
            {
                    "id": "detecting-errors-verb-advance-set-1-q15",
                    "topic": "Verb Advance - No Error",
                    "difficulty": "hard",
                    "question": "He used to wake up early during training in Practice Case 15",
                    "options": [
                            "He used to",
                            "wake up early",
                            "during training in Practice Case 15",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Used to + V1’ expresses past habit."
            },
            {
                    "id": "detecting-errors-verb-advance-set-1-q16",
                    "topic": "Verb Advance - Keep + V-ing",
                    "difficulty": "hard",
                    "question": "The officer kept the applicants waited for two hours in Practice Case 16",
                    "options": [
                            "The officer kept",
                            "the applicants waited",
                            "for two hours in Practice Case 16",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "After ‘keep + object’, use present participle. Correct: ‘kept the applicants waiting’."
            },
            {
                    "id": "detecting-errors-verb-advance-set-1-q17",
                    "topic": "Verb Advance - Dangling Participle",
                    "difficulty": "hard",
                    "question": "Having completed the form the fee was paid online in Practice Case 17",
                    "options": [
                            "Having completed",
                            "the form",
                            "the fee was paid online in Practice Case 17",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "A participial phrase must modify the subject. The fee did not complete the form. Correct: ‘Having completed the form, he paid...’."
            },
            {
                    "id": "detecting-errors-verb-advance-set-1-q18",
                    "topic": "Verb Advance - Misrelated Participle",
                    "difficulty": "hard",
                    "question": "Walking on the road a snake was seen by the boys in Practice Case 18",
                    "options": [
                            "Walking on the road",
                            "a snake was seen",
                            "by the boys in Practice Case 18",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "The phrase wrongly modifies ‘snake’. Correct: ‘While the boys were walking on the road...’."
            },
            {
                    "id": "detecting-errors-verb-advance-set-1-q19",
                    "topic": "Verb Advance - No Error",
                    "difficulty": "hard",
                    "question": "He had his application checked by the operator in Practice Case 19",
                    "options": [
                            "He had",
                            "his application checked",
                            "by the operator in Practice Case 19",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Have + object + V3’ expresses causative passive."
            },
            {
                    "id": "detecting-errors-verb-advance-set-1-q20",
                    "topic": "Verb Advance - Causative",
                    "difficulty": "hard",
                    "question": "I got my documents verify before submission in Practice Case 20",
                    "options": [
                            "I got",
                            "my documents verify",
                            "before submission in Practice Case 20",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Causative passive with ‘get’ uses object + V3. Correct: ‘got my documents verified’."
            },
            {
                    "id": "detecting-errors-verb-advance-set-1-q21",
                    "topic": "Verb Advance - Dangling Participle",
                    "difficulty": "hard",
                    "question": "Being a rainy day we cancelled practice in Practice Case 21",
                    "options": [
                            "Being a rainy day",
                            "we cancelled",
                            "practice in Practice Case 21",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "The phrase has no logical subject. Correct: ‘As it was a rainy day...’."
            },
            {
                    "id": "detecting-errors-verb-advance-set-1-q22",
                    "topic": "Verb Advance - Used To",
                    "difficulty": "hard",
                    "question": "The students are used to solve questions under pressure in Practice Case 22",
                    "options": [
                            "The students",
                            "are used to solve",
                            "questions under pressure in Practice Case 22",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Be used to’ means accustomed to and takes gerund. Correct: ‘are used to solving’."
            },
            {
                    "id": "detecting-errors-verb-advance-set-1-q23",
                    "topic": "Verb Advance - No Error",
                    "difficulty": "hard",
                    "question": "He used to wake up early during training in Practice Case 23",
                    "options": [
                            "He used to",
                            "wake up early",
                            "during training in Practice Case 23",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Used to + V1’ expresses past habit."
            },
            {
                    "id": "detecting-errors-verb-advance-set-1-q24",
                    "topic": "Verb Advance - Keep + V-ing",
                    "difficulty": "hard",
                    "question": "The officer kept the applicants waited for two hours in Practice Case 24",
                    "options": [
                            "The officer kept",
                            "the applicants waited",
                            "for two hours in Practice Case 24",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "After ‘keep + object’, use present participle. Correct: ‘kept the applicants waiting’."
            },
            {
                    "id": "detecting-errors-verb-advance-set-1-q25",
                    "topic": "Verb Advance - Dangling Participle",
                    "difficulty": "hard",
                    "question": "Having completed the form the fee was paid online in Practice Case 25",
                    "options": [
                            "Having completed",
                            "the form",
                            "the fee was paid online in Practice Case 25",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "A participial phrase must modify the subject. The fee did not complete the form. Correct: ‘Having completed the form, he paid...’."
            },
            {
                    "id": "detecting-errors-verb-advance-set-1-q26",
                    "topic": "Verb Advance - Misrelated Participle",
                    "difficulty": "hard",
                    "question": "Walking on the road a snake was seen by the boys in Practice Case 26",
                    "options": [
                            "Walking on the road",
                            "a snake was seen",
                            "by the boys in Practice Case 26",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "The phrase wrongly modifies ‘snake’. Correct: ‘While the boys were walking on the road...’."
            },
            {
                    "id": "detecting-errors-verb-advance-set-1-q27",
                    "topic": "Verb Advance - No Error",
                    "difficulty": "hard",
                    "question": "He had his application checked by the operator in Practice Case 27",
                    "options": [
                            "He had",
                            "his application checked",
                            "by the operator in Practice Case 27",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Have + object + V3’ expresses causative passive."
            },
            {
                    "id": "detecting-errors-verb-advance-set-1-q28",
                    "topic": "Verb Advance - Causative",
                    "difficulty": "hard",
                    "question": "I got my documents verify before submission in Practice Case 28",
                    "options": [
                            "I got",
                            "my documents verify",
                            "before submission in Practice Case 28",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Causative passive with ‘get’ uses object + V3. Correct: ‘got my documents verified’."
            },
            {
                    "id": "detecting-errors-verb-advance-set-1-q29",
                    "topic": "Verb Advance - Dangling Participle",
                    "difficulty": "hard",
                    "question": "Being a rainy day we cancelled practice in Practice Case 29",
                    "options": [
                            "Being a rainy day",
                            "we cancelled",
                            "practice in Practice Case 29",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "The phrase has no logical subject. Correct: ‘As it was a rainy day...’."
            },
            {
                    "id": "detecting-errors-verb-advance-set-1-q30",
                    "topic": "Verb Advance - Used To",
                    "difficulty": "hard",
                    "question": "The students are used to solve questions under pressure in Practice Case 30",
                    "options": [
                            "The students",
                            "are used to solve",
                            "questions under pressure in Practice Case 30",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Be used to’ means accustomed to and takes gerund. Correct: ‘are used to solving’."
            },
            {
                    "id": "detecting-errors-verb-advance-set-1-q31",
                    "topic": "Verb Advance - No Error",
                    "difficulty": "hard",
                    "question": "He used to wake up early during training in Practice Case 31",
                    "options": [
                            "He used to",
                            "wake up early",
                            "during training in Practice Case 31",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Used to + V1’ expresses past habit."
            },
            {
                    "id": "detecting-errors-verb-advance-set-1-q32",
                    "topic": "Verb Advance - Keep + V-ing",
                    "difficulty": "hard",
                    "question": "The officer kept the applicants waited for two hours in Practice Case 32",
                    "options": [
                            "The officer kept",
                            "the applicants waited",
                            "for two hours in Practice Case 32",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "After ‘keep + object’, use present participle. Correct: ‘kept the applicants waiting’."
            },
            {
                    "id": "detecting-errors-verb-advance-set-1-q33",
                    "topic": "Verb Advance - Dangling Participle",
                    "difficulty": "hard",
                    "question": "Having completed the form the fee was paid online in Practice Case 33",
                    "options": [
                            "Having completed",
                            "the form",
                            "the fee was paid online in Practice Case 33",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "A participial phrase must modify the subject. The fee did not complete the form. Correct: ‘Having completed the form, he paid...’."
            },
            {
                    "id": "detecting-errors-verb-advance-set-1-q34",
                    "topic": "Verb Advance - Misrelated Participle",
                    "difficulty": "hard",
                    "question": "Walking on the road a snake was seen by the boys in Practice Case 34",
                    "options": [
                            "Walking on the road",
                            "a snake was seen",
                            "by the boys in Practice Case 34",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "The phrase wrongly modifies ‘snake’. Correct: ‘While the boys were walking on the road...’."
            },
            {
                    "id": "detecting-errors-verb-advance-set-1-q35",
                    "topic": "Verb Advance - No Error",
                    "difficulty": "hard",
                    "question": "He had his application checked by the operator in Practice Case 35",
                    "options": [
                            "He had",
                            "his application checked",
                            "by the operator in Practice Case 35",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Have + object + V3’ expresses causative passive."
            },
            {
                    "id": "detecting-errors-verb-advance-set-1-q36",
                    "topic": "Verb Advance - Causative",
                    "difficulty": "hard",
                    "question": "I got my documents verify before submission in Practice Case 36",
                    "options": [
                            "I got",
                            "my documents verify",
                            "before submission in Practice Case 36",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Causative passive with ‘get’ uses object + V3. Correct: ‘got my documents verified’."
            },
            {
                    "id": "detecting-errors-verb-advance-set-1-q37",
                    "topic": "Verb Advance - Dangling Participle",
                    "difficulty": "hard",
                    "question": "Being a rainy day we cancelled practice in Practice Case 37",
                    "options": [
                            "Being a rainy day",
                            "we cancelled",
                            "practice in Practice Case 37",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "The phrase has no logical subject. Correct: ‘As it was a rainy day...’."
            },
            {
                    "id": "detecting-errors-verb-advance-set-1-q38",
                    "topic": "Verb Advance - Used To",
                    "difficulty": "hard",
                    "question": "The students are used to solve questions under pressure in Practice Case 38",
                    "options": [
                            "The students",
                            "are used to solve",
                            "questions under pressure in Practice Case 38",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Be used to’ means accustomed to and takes gerund. Correct: ‘are used to solving’."
            },
            {
                    "id": "detecting-errors-verb-advance-set-1-q39",
                    "topic": "Verb Advance - No Error",
                    "difficulty": "hard",
                    "question": "He used to wake up early during training in Practice Case 39",
                    "options": [
                            "He used to",
                            "wake up early",
                            "during training in Practice Case 39",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Used to + V1’ expresses past habit."
            },
            {
                    "id": "detecting-errors-verb-advance-set-1-q40",
                    "topic": "Verb Advance - Keep + V-ing",
                    "difficulty": "hard",
                    "question": "The officer kept the applicants waited for two hours in Practice Case 40",
                    "options": [
                            "The officer kept",
                            "the applicants waited",
                            "for two hours in Practice Case 40",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "After ‘keep + object’, use present participle. Correct: ‘kept the applicants waiting’."
            },
            {
                    "id": "detecting-errors-verb-advance-set-1-q41",
                    "topic": "Verb Advance - Dangling Participle",
                    "difficulty": "hard",
                    "question": "Having completed the form the fee was paid online in Practice Case 41",
                    "options": [
                            "Having completed",
                            "the form",
                            "the fee was paid online in Practice Case 41",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "A participial phrase must modify the subject. The fee did not complete the form. Correct: ‘Having completed the form, he paid...’."
            },
            {
                    "id": "detecting-errors-verb-advance-set-1-q42",
                    "topic": "Verb Advance - Misrelated Participle",
                    "difficulty": "hard",
                    "question": "Walking on the road a snake was seen by the boys in Practice Case 42",
                    "options": [
                            "Walking on the road",
                            "a snake was seen",
                            "by the boys in Practice Case 42",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "The phrase wrongly modifies ‘snake’. Correct: ‘While the boys were walking on the road...’."
            },
            {
                    "id": "detecting-errors-verb-advance-set-1-q43",
                    "topic": "Verb Advance - No Error",
                    "difficulty": "hard",
                    "question": "He had his application checked by the operator in Practice Case 43",
                    "options": [
                            "He had",
                            "his application checked",
                            "by the operator in Practice Case 43",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Have + object + V3’ expresses causative passive."
            },
            {
                    "id": "detecting-errors-verb-advance-set-1-q44",
                    "topic": "Verb Advance - Causative",
                    "difficulty": "hard",
                    "question": "I got my documents verify before submission in Practice Case 44",
                    "options": [
                            "I got",
                            "my documents verify",
                            "before submission in Practice Case 44",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Causative passive with ‘get’ uses object + V3. Correct: ‘got my documents verified’."
            },
            {
                    "id": "detecting-errors-verb-advance-set-1-q45",
                    "topic": "Verb Advance - Dangling Participle",
                    "difficulty": "hard",
                    "question": "Being a rainy day we cancelled practice in Practice Case 45",
                    "options": [
                            "Being a rainy day",
                            "we cancelled",
                            "practice in Practice Case 45",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "The phrase has no logical subject. Correct: ‘As it was a rainy day...’."
            },
            {
                    "id": "detecting-errors-verb-advance-set-1-q46",
                    "topic": "Verb Advance - Used To",
                    "difficulty": "hard",
                    "question": "The students are used to solve questions under pressure in Practice Case 46",
                    "options": [
                            "The students",
                            "are used to solve",
                            "questions under pressure in Practice Case 46",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Be used to’ means accustomed to and takes gerund. Correct: ‘are used to solving’."
            },
            {
                    "id": "detecting-errors-verb-advance-set-1-q47",
                    "topic": "Verb Advance - No Error",
                    "difficulty": "hard",
                    "question": "He used to wake up early during training in Practice Case 47",
                    "options": [
                            "He used to",
                            "wake up early",
                            "during training in Practice Case 47",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Used to + V1’ expresses past habit."
            },
            {
                    "id": "detecting-errors-verb-advance-set-1-q48",
                    "topic": "Verb Advance - Keep + V-ing",
                    "difficulty": "hard",
                    "question": "The officer kept the applicants waited for two hours in Practice Case 48",
                    "options": [
                            "The officer kept",
                            "the applicants waited",
                            "for two hours in Practice Case 48",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "After ‘keep + object’, use present participle. Correct: ‘kept the applicants waiting’."
            },
            {
                    "id": "detecting-errors-verb-advance-set-1-q49",
                    "topic": "Verb Advance - Dangling Participle",
                    "difficulty": "hard",
                    "question": "Having completed the form the fee was paid online in Practice Case 49",
                    "options": [
                            "Having completed",
                            "the form",
                            "the fee was paid online in Practice Case 49",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "A participial phrase must modify the subject. The fee did not complete the form. Correct: ‘Having completed the form, he paid...’."
            },
            {
                    "id": "detecting-errors-verb-advance-set-1-q50",
                    "topic": "Verb Advance - Misrelated Participle",
                    "difficulty": "hard",
                    "question": "Walking on the road a snake was seen by the boys in Practice Case 50",
                    "options": [
                            "Walking on the road",
                            "a snake was seen",
                            "by the boys in Practice Case 50",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "The phrase wrongly modifies ‘snake’. Correct: ‘While the boys were walking on the road...’."
            }
    ];

    window.GJU_QUIZ_BANK.push({
        id: quizId,
        subject: "English",
        title: "Detecting Errors - Verb Advance Set 1",
        description: "50 advanced verb detecting error questions on participles, causatives and verb patterns.",
        durationMinutes: 30,
        totalQuestions: questions.length,
        marksPerQuestion: 1,
        negativeMarks: 0.25,
        difficulty: "Hard",
        tags: ["SSC", "Railway", "Police", "English", "Detecting Errors"],
        questions
    });
}());
