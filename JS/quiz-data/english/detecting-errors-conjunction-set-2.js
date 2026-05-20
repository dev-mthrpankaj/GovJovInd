(function () {
    "use strict";

    window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];

    const quizId = "detecting-errors-conjunction-set-2";

    const questions = [
            {
                    "id": "detecting-errors-conjunction-set-2-q01",
                    "topic": "Conjunction - Although/But",
                    "difficulty": "hard",
                    "question": "Although Varun was ill but he attended the test in Practice Case 51",
                    "options": [
                            "Although Varun was ill",
                            "but he attended",
                            "the test in Practice Case 51",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Do not use ‘although/though’ and ‘but’ together for the same contrast. Remove ‘but’."
            },
            {
                    "id": "detecting-errors-conjunction-set-2-q02",
                    "topic": "Conjunction - Unless",
                    "difficulty": "hard",
                    "question": "Unless you do not revise the notice you will forget it in Practice Case 52",
                    "options": [
                            "Unless you do not",
                            "revise the notice",
                            "you will forget it in Practice Case 52",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "‘Unless’ means ‘if not’; ‘not’ after unless is redundant. Correct: ‘Unless you revise...’."
            },
            {
                    "id": "detecting-errors-conjunction-set-2-q03",
                    "topic": "Conjunction - No Error",
                    "difficulty": "hard",
                    "question": "Either Suresh will submit the form or pay the late fee in Practice Case 53",
                    "options": [
                            "Either Suresh",
                            "will submit the form",
                            "or pay the late fee in Practice Case 53",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Either...or’ joins parallel verb phrases: ‘submit’ and ‘pay’."
            },
            {
                    "id": "detecting-errors-conjunction-set-2-q04",
                    "topic": "Conjunction - Reason/That",
                    "difficulty": "hard",
                    "question": "The reason why he failed was because he ignored revision in Practice Case 54",
                    "options": [
                            "The reason why",
                            "he failed",
                            "was because he ignored revision in Practice Case 54",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "Use ‘the reason why...was that’, not ‘was because’."
            },
            {
                    "id": "detecting-errors-conjunction-set-2-q05",
                    "topic": "Conjunction - Neither/Nor",
                    "difficulty": "hard",
                    "question": "Neither the officer nor the clerks was informed about Practice Case 55",
                    "options": [
                            "Neither the officer",
                            "nor the clerks",
                            "was informed about Practice Case 55",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "With ‘neither...nor’, the verb agrees with the nearer subject. ‘Clerks’ is plural, so use ‘were’."
            },
            {
                    "id": "detecting-errors-conjunction-set-2-q06",
                    "topic": "Conjunction - No Error",
                    "difficulty": "hard",
                    "question": "Nisha not only prepared notes but also solved tests for Practice Case 56",
                    "options": [
                            "Nisha not only",
                            "prepared notes",
                            "but also solved tests for Practice Case 56",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Not only...but also’ connects parallel past-tense verb phrases."
            },
            {
                    "id": "detecting-errors-conjunction-set-2-q07",
                    "topic": "Conjunction - No sooner/Than",
                    "difficulty": "hard",
                    "question": "No sooner did Manoj open the document when the bell rang in Practice Case 57",
                    "options": [
                            "No sooner did",
                            "Manoj open the document",
                            "when the bell rang in Practice Case 57",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "The correct pair is ‘no sooner ... than’. Replace ‘when’ with ‘than’."
            },
            {
                    "id": "detecting-errors-conjunction-set-2-q08",
                    "topic": "Conjunction - Hardly/When",
                    "difficulty": "hard",
                    "question": "Hardly had the class started than the power went off in Practice Case 58",
                    "options": [
                            "Hardly had",
                            "the class started",
                            "than the power went off in Practice Case 58",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "The correct pair is ‘hardly/scarcely ... when/before’; ‘than’ is used with ‘no sooner’."
            },
            {
                    "id": "detecting-errors-conjunction-set-2-q09",
                    "topic": "Conjunction - Although/But",
                    "difficulty": "hard",
                    "question": "Although Harish was ill but he attended the test in Practice Case 59",
                    "options": [
                            "Although Harish was ill",
                            "but he attended",
                            "the test in Practice Case 59",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Do not use ‘although/though’ and ‘but’ together for the same contrast. Remove ‘but’."
            },
            {
                    "id": "detecting-errors-conjunction-set-2-q10",
                    "topic": "Conjunction - Unless",
                    "difficulty": "hard",
                    "question": "Unless you do not revise the presentation you will forget it in Practice Case 60",
                    "options": [
                            "Unless you do not",
                            "revise the presentation",
                            "you will forget it in Practice Case 60",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "‘Unless’ means ‘if not’; ‘not’ after unless is redundant. Correct: ‘Unless you revise...’."
            },
            {
                    "id": "detecting-errors-conjunction-set-2-q11",
                    "topic": "Conjunction - No Error",
                    "difficulty": "hard",
                    "question": "Either Aarav will submit the form or pay the late fee in Practice Case 61",
                    "options": [
                            "Either Aarav",
                            "will submit the form",
                            "or pay the late fee in Practice Case 61",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Either...or’ joins parallel verb phrases: ‘submit’ and ‘pay’."
            },
            {
                    "id": "detecting-errors-conjunction-set-2-q12",
                    "topic": "Conjunction - Reason/That",
                    "difficulty": "hard",
                    "question": "The reason why he failed was because he ignored revision in Practice Case 62",
                    "options": [
                            "The reason why",
                            "he failed",
                            "was because he ignored revision in Practice Case 62",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "Use ‘the reason why...was that’, not ‘was because’."
            },
            {
                    "id": "detecting-errors-conjunction-set-2-q13",
                    "topic": "Conjunction - Neither/Nor",
                    "difficulty": "hard",
                    "question": "Neither the officer nor the clerks was informed about Practice Case 63",
                    "options": [
                            "Neither the officer",
                            "nor the clerks",
                            "was informed about Practice Case 63",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "With ‘neither...nor’, the verb agrees with the nearer subject. ‘Clerks’ is plural, so use ‘were’."
            },
            {
                    "id": "detecting-errors-conjunction-set-2-q14",
                    "topic": "Conjunction - No Error",
                    "difficulty": "hard",
                    "question": "Sanya not only prepared notes but also solved tests for Practice Case 64",
                    "options": [
                            "Sanya not only",
                            "prepared notes",
                            "but also solved tests for Practice Case 64",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Not only...but also’ connects parallel past-tense verb phrases."
            },
            {
                    "id": "detecting-errors-conjunction-set-2-q15",
                    "topic": "Conjunction - No sooner/Than",
                    "difficulty": "hard",
                    "question": "No sooner did Karan open the proposal when the bell rang in Practice Case 65",
                    "options": [
                            "No sooner did",
                            "Karan open the proposal",
                            "when the bell rang in Practice Case 65",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "The correct pair is ‘no sooner ... than’. Replace ‘when’ with ‘than’."
            },
            {
                    "id": "detecting-errors-conjunction-set-2-q16",
                    "topic": "Conjunction - Hardly/When",
                    "difficulty": "hard",
                    "question": "Hardly had the class started than the power went off in Practice Case 66",
                    "options": [
                            "Hardly had",
                            "the class started",
                            "than the power went off in Practice Case 66",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "The correct pair is ‘hardly/scarcely ... when/before’; ‘than’ is used with ‘no sooner’."
            },
            {
                    "id": "detecting-errors-conjunction-set-2-q17",
                    "topic": "Conjunction - Although/But",
                    "difficulty": "hard",
                    "question": "Although Vivek was ill but he attended the test in Practice Case 67",
                    "options": [
                            "Although Vivek was ill",
                            "but he attended",
                            "the test in Practice Case 67",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Do not use ‘although/though’ and ‘but’ together for the same contrast. Remove ‘but’."
            },
            {
                    "id": "detecting-errors-conjunction-set-2-q18",
                    "topic": "Conjunction - Unless",
                    "difficulty": "hard",
                    "question": "Unless you do not revise the summary you will forget it in Practice Case 68",
                    "options": [
                            "Unless you do not",
                            "revise the summary",
                            "you will forget it in Practice Case 68",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "‘Unless’ means ‘if not’; ‘not’ after unless is redundant. Correct: ‘Unless you revise...’."
            },
            {
                    "id": "detecting-errors-conjunction-set-2-q19",
                    "topic": "Conjunction - No Error",
                    "difficulty": "hard",
                    "question": "Either Rohan will submit the form or pay the late fee in Practice Case 69",
                    "options": [
                            "Either Rohan",
                            "will submit the form",
                            "or pay the late fee in Practice Case 69",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Either...or’ joins parallel verb phrases: ‘submit’ and ‘pay’."
            },
            {
                    "id": "detecting-errors-conjunction-set-2-q20",
                    "topic": "Conjunction - Reason/That",
                    "difficulty": "hard",
                    "question": "The reason why he failed was because he ignored revision in Practice Case 70",
                    "options": [
                            "The reason why",
                            "he failed",
                            "was because he ignored revision in Practice Case 70",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "Use ‘the reason why...was that’, not ‘was because’."
            },
            {
                    "id": "detecting-errors-conjunction-set-2-q21",
                    "topic": "Conjunction - Neither/Nor",
                    "difficulty": "hard",
                    "question": "Neither the officer nor the clerks was informed about Practice Case 71",
                    "options": [
                            "Neither the officer",
                            "nor the clerks",
                            "was informed about Practice Case 71",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "With ‘neither...nor’, the verb agrees with the nearer subject. ‘Clerks’ is plural, so use ‘were’."
            },
            {
                    "id": "detecting-errors-conjunction-set-2-q22",
                    "topic": "Conjunction - No Error",
                    "difficulty": "hard",
                    "question": "Priya not only prepared notes but also solved tests for Practice Case 72",
                    "options": [
                            "Priya not only",
                            "prepared notes",
                            "but also solved tests for Practice Case 72",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Not only...but also’ connects parallel past-tense verb phrases."
            },
            {
                    "id": "detecting-errors-conjunction-set-2-q23",
                    "topic": "Conjunction - No sooner/Than",
                    "difficulty": "hard",
                    "question": "No sooner did Amit open the essay when the bell rang in Practice Case 73",
                    "options": [
                            "No sooner did",
                            "Amit open the essay",
                            "when the bell rang in Practice Case 73",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "The correct pair is ‘no sooner ... than’. Replace ‘when’ with ‘than’."
            },
            {
                    "id": "detecting-errors-conjunction-set-2-q24",
                    "topic": "Conjunction - Hardly/When",
                    "difficulty": "hard",
                    "question": "Hardly had the class started than the power went off in Practice Case 74",
                    "options": [
                            "Hardly had",
                            "the class started",
                            "than the power went off in Practice Case 74",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "The correct pair is ‘hardly/scarcely ... when/before’; ‘than’ is used with ‘no sooner’."
            },
            {
                    "id": "detecting-errors-conjunction-set-2-q25",
                    "topic": "Conjunction - Although/But",
                    "difficulty": "hard",
                    "question": "Although Deepak was ill but he attended the test in Practice Case 75",
                    "options": [
                            "Although Deepak was ill",
                            "but he attended",
                            "the test in Practice Case 75",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Do not use ‘although/though’ and ‘but’ together for the same contrast. Remove ‘but’."
            },
            {
                    "id": "detecting-errors-conjunction-set-2-q26",
                    "topic": "Conjunction - Unless",
                    "difficulty": "hard",
                    "question": "Unless you do not revise the report you will forget it in Practice Case 76",
                    "options": [
                            "Unless you do not",
                            "revise the report",
                            "you will forget it in Practice Case 76",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "‘Unless’ means ‘if not’; ‘not’ after unless is redundant. Correct: ‘Unless you revise...’."
            },
            {
                    "id": "detecting-errors-conjunction-set-2-q27",
                    "topic": "Conjunction - No Error",
                    "difficulty": "hard",
                    "question": "Either Rahul will submit the form or pay the late fee in Practice Case 77",
                    "options": [
                            "Either Rahul",
                            "will submit the form",
                            "or pay the late fee in Practice Case 77",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Either...or’ joins parallel verb phrases: ‘submit’ and ‘pay’."
            },
            {
                    "id": "detecting-errors-conjunction-set-2-q28",
                    "topic": "Conjunction - Reason/That",
                    "difficulty": "hard",
                    "question": "The reason why he failed was because he ignored revision in Practice Case 78",
                    "options": [
                            "The reason why",
                            "he failed",
                            "was because he ignored revision in Practice Case 78",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "Use ‘the reason why...was that’, not ‘was because’."
            },
            {
                    "id": "detecting-errors-conjunction-set-2-q29",
                    "topic": "Conjunction - Neither/Nor",
                    "difficulty": "hard",
                    "question": "Neither the officer nor the clerks was informed about Practice Case 79",
                    "options": [
                            "Neither the officer",
                            "nor the clerks",
                            "was informed about Practice Case 79",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "With ‘neither...nor’, the verb agrees with the nearer subject. ‘Clerks’ is plural, so use ‘were’."
            },
            {
                    "id": "detecting-errors-conjunction-set-2-q30",
                    "topic": "Conjunction - No Error",
                    "difficulty": "hard",
                    "question": "Isha not only prepared notes but also solved tests for Practice Case 80",
                    "options": [
                            "Isha not only",
                            "prepared notes",
                            "but also solved tests for Practice Case 80",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Not only...but also’ connects parallel past-tense verb phrases."
            },
            {
                    "id": "detecting-errors-conjunction-set-2-q31",
                    "topic": "Conjunction - No sooner/Than",
                    "difficulty": "hard",
                    "question": "No sooner did Varun open the article when the bell rang in Practice Case 81",
                    "options": [
                            "No sooner did",
                            "Varun open the article",
                            "when the bell rang in Practice Case 81",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "The correct pair is ‘no sooner ... than’. Replace ‘when’ with ‘than’."
            },
            {
                    "id": "detecting-errors-conjunction-set-2-q32",
                    "topic": "Conjunction - Hardly/When",
                    "difficulty": "hard",
                    "question": "Hardly had the class started than the power went off in Practice Case 82",
                    "options": [
                            "Hardly had",
                            "the class started",
                            "than the power went off in Practice Case 82",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "The correct pair is ‘hardly/scarcely ... when/before’; ‘than’ is used with ‘no sooner’."
            },
            {
                    "id": "detecting-errors-conjunction-set-2-q33",
                    "topic": "Conjunction - Although/But",
                    "difficulty": "hard",
                    "question": "Although Suresh was ill but he attended the test in Practice Case 83",
                    "options": [
                            "Although Suresh was ill",
                            "but he attended",
                            "the test in Practice Case 83",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Do not use ‘although/though’ and ‘but’ together for the same contrast. Remove ‘but’."
            },
            {
                    "id": "detecting-errors-conjunction-set-2-q34",
                    "topic": "Conjunction - Unless",
                    "difficulty": "hard",
                    "question": "Unless you do not revise the speech you will forget it in Practice Case 84",
                    "options": [
                            "Unless you do not",
                            "revise the speech",
                            "you will forget it in Practice Case 84",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "‘Unless’ means ‘if not’; ‘not’ after unless is redundant. Correct: ‘Unless you revise...’."
            },
            {
                    "id": "detecting-errors-conjunction-set-2-q35",
                    "topic": "Conjunction - No Error",
                    "difficulty": "hard",
                    "question": "Either Akash will submit the form or pay the late fee in Practice Case 85",
                    "options": [
                            "Either Akash",
                            "will submit the form",
                            "or pay the late fee in Practice Case 85",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Either...or’ joins parallel verb phrases: ‘submit’ and ‘pay’."
            },
            {
                    "id": "detecting-errors-conjunction-set-2-q36",
                    "topic": "Conjunction - Reason/That",
                    "difficulty": "hard",
                    "question": "The reason why he failed was because he ignored revision in Practice Case 86",
                    "options": [
                            "The reason why",
                            "he failed",
                            "was because he ignored revision in Practice Case 86",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "Use ‘the reason why...was that’, not ‘was because’."
            },
            {
                    "id": "detecting-errors-conjunction-set-2-q37",
                    "topic": "Conjunction - Neither/Nor",
                    "difficulty": "hard",
                    "question": "Neither the officer nor the clerks was informed about Practice Case 87",
                    "options": [
                            "Neither the officer",
                            "nor the clerks",
                            "was informed about Practice Case 87",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "With ‘neither...nor’, the verb agrees with the nearer subject. ‘Clerks’ is plural, so use ‘were’."
            },
            {
                    "id": "detecting-errors-conjunction-set-2-q38",
                    "topic": "Conjunction - No Error",
                    "difficulty": "hard",
                    "question": "Shreya not only prepared notes but also solved tests for Practice Case 88",
                    "options": [
                            "Shreya not only",
                            "prepared notes",
                            "but also solved tests for Practice Case 88",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Not only...but also’ connects parallel past-tense verb phrases."
            },
            {
                    "id": "detecting-errors-conjunction-set-2-q39",
                    "topic": "Conjunction - No sooner/Than",
                    "difficulty": "hard",
                    "question": "No sooner did Harish open the answer sheet when the bell rang in Practice Case 89",
                    "options": [
                            "No sooner did",
                            "Harish open the answer sheet",
                            "when the bell rang in Practice Case 89",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "The correct pair is ‘no sooner ... than’. Replace ‘when’ with ‘than’."
            },
            {
                    "id": "detecting-errors-conjunction-set-2-q40",
                    "topic": "Conjunction - Hardly/When",
                    "difficulty": "hard",
                    "question": "Hardly had the class started than the power went off in Practice Case 90",
                    "options": [
                            "Hardly had",
                            "the class started",
                            "than the power went off in Practice Case 90",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "The correct pair is ‘hardly/scarcely ... when/before’; ‘than’ is used with ‘no sooner’."
            },
            {
                    "id": "detecting-errors-conjunction-set-2-q41",
                    "topic": "Conjunction - Although/But",
                    "difficulty": "hard",
                    "question": "Although Aarav was ill but he attended the test in Practice Case 91",
                    "options": [
                            "Although Aarav was ill",
                            "but he attended",
                            "the test in Practice Case 91",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Do not use ‘although/though’ and ‘but’ together for the same contrast. Remove ‘but’."
            },
            {
                    "id": "detecting-errors-conjunction-set-2-q42",
                    "topic": "Conjunction - Unless",
                    "difficulty": "hard",
                    "question": "Unless you do not revise the application you will forget it in Practice Case 92",
                    "options": [
                            "Unless you do not",
                            "revise the application",
                            "you will forget it in Practice Case 92",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "‘Unless’ means ‘if not’; ‘not’ after unless is redundant. Correct: ‘Unless you revise...’."
            },
            {
                    "id": "detecting-errors-conjunction-set-2-q43",
                    "topic": "Conjunction - No Error",
                    "difficulty": "hard",
                    "question": "Either Mohit will submit the form or pay the late fee in Practice Case 93",
                    "options": [
                            "Either Mohit",
                            "will submit the form",
                            "or pay the late fee in Practice Case 93",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Either...or’ joins parallel verb phrases: ‘submit’ and ‘pay’."
            },
            {
                    "id": "detecting-errors-conjunction-set-2-q44",
                    "topic": "Conjunction - Reason/That",
                    "difficulty": "hard",
                    "question": "The reason why he failed was because he ignored revision in Practice Case 94",
                    "options": [
                            "The reason why",
                            "he failed",
                            "was because he ignored revision in Practice Case 94",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "Use ‘the reason why...was that’, not ‘was because’."
            },
            {
                    "id": "detecting-errors-conjunction-set-2-q45",
                    "topic": "Conjunction - Neither/Nor",
                    "difficulty": "hard",
                    "question": "Neither the officer nor the clerks was informed about Practice Case 95",
                    "options": [
                            "Neither the officer",
                            "nor the clerks",
                            "was informed about Practice Case 95",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "With ‘neither...nor’, the verb agrees with the nearer subject. ‘Clerks’ is plural, so use ‘were’."
            },
            {
                    "id": "detecting-errors-conjunction-set-2-q46",
                    "topic": "Conjunction - No Error",
                    "difficulty": "hard",
                    "question": "Neha not only prepared notes but also solved tests for Practice Case 96",
                    "options": [
                            "Neha not only",
                            "prepared notes",
                            "but also solved tests for Practice Case 96",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Not only...but also’ connects parallel past-tense verb phrases."
            },
            {
                    "id": "detecting-errors-conjunction-set-2-q47",
                    "topic": "Conjunction - No sooner/Than",
                    "difficulty": "hard",
                    "question": "No sooner did Vivek open the notice when the bell rang in Practice Case 97",
                    "options": [
                            "No sooner did",
                            "Vivek open the notice",
                            "when the bell rang in Practice Case 97",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "The correct pair is ‘no sooner ... than’. Replace ‘when’ with ‘than’."
            },
            {
                    "id": "detecting-errors-conjunction-set-2-q48",
                    "topic": "Conjunction - Hardly/When",
                    "difficulty": "hard",
                    "question": "Hardly had the class started than the power went off in Practice Case 98",
                    "options": [
                            "Hardly had",
                            "the class started",
                            "than the power went off in Practice Case 98",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "The correct pair is ‘hardly/scarcely ... when/before’; ‘than’ is used with ‘no sooner’."
            },
            {
                    "id": "detecting-errors-conjunction-set-2-q49",
                    "topic": "Conjunction - Although/But",
                    "difficulty": "hard",
                    "question": "Although Rohan was ill but he attended the test in Practice Case 99",
                    "options": [
                            "Although Rohan was ill",
                            "but he attended",
                            "the test in Practice Case 99",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Do not use ‘although/though’ and ‘but’ together for the same contrast. Remove ‘but’."
            },
            {
                    "id": "detecting-errors-conjunction-set-2-q50",
                    "topic": "Conjunction - Unless",
                    "difficulty": "hard",
                    "question": "Unless you do not revise the assignment you will forget it in Practice Case 100",
                    "options": [
                            "Unless you do not",
                            "revise the assignment",
                            "you will forget it in Practice Case 100",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "‘Unless’ means ‘if not’; ‘not’ after unless is redundant. Correct: ‘Unless you revise...’."
            }
    ];

    window.GJU_QUIZ_BANK.push({
        id: quizId,
        subject: "English",
        title: "Detecting Errors - Conjunction Set 2",
        description: "50 advanced conjunction-focused detecting error questions for competitive exams.",
        durationMinutes: 30,
        totalQuestions: questions.length,
        marksPerQuestion: 1,
        negativeMarks: 0.25,
        difficulty: "Hard",
        tags: ["SSC", "Railway", "Police", "English", "Detecting Errors"],
        questions
    });
}());
