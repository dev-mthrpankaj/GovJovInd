(function () {
    "use strict";

    window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];

    const quizId = "detecting-errors-conjunction-set-1";

    const questions = [
            {
                    "id": "detecting-errors-conjunction-set-1-q01",
                    "topic": "Conjunction - No sooner/Than",
                    "difficulty": "hard",
                    "question": "No sooner did Aarav open the report when the bell rang in Practice Case 1",
                    "options": [
                            "No sooner did",
                            "Aarav open the report",
                            "when the bell rang in Practice Case 1",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "The correct pair is ‘no sooner ... than’. Replace ‘when’ with ‘than’."
            },
            {
                    "id": "detecting-errors-conjunction-set-1-q02",
                    "topic": "Conjunction - Hardly/When",
                    "difficulty": "hard",
                    "question": "Hardly had the class started than the power went off in Practice Case 2",
                    "options": [
                            "Hardly had",
                            "the class started",
                            "than the power went off in Practice Case 2",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "The correct pair is ‘hardly/scarcely ... when/before’; ‘than’ is used with ‘no sooner’."
            },
            {
                    "id": "detecting-errors-conjunction-set-1-q03",
                    "topic": "Conjunction - Although/But",
                    "difficulty": "hard",
                    "question": "Although Mohit was ill but he attended the test in Practice Case 3",
                    "options": [
                            "Although Mohit was ill",
                            "but he attended",
                            "the test in Practice Case 3",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Do not use ‘although/though’ and ‘but’ together for the same contrast. Remove ‘but’."
            },
            {
                    "id": "detecting-errors-conjunction-set-1-q04",
                    "topic": "Conjunction - Unless",
                    "difficulty": "hard",
                    "question": "Unless you do not revise the letter you will forget it in Practice Case 4",
                    "options": [
                            "Unless you do not",
                            "revise the letter",
                            "you will forget it in Practice Case 4",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "‘Unless’ means ‘if not’; ‘not’ after unless is redundant. Correct: ‘Unless you revise...’."
            },
            {
                    "id": "detecting-errors-conjunction-set-1-q05",
                    "topic": "Conjunction - No Error",
                    "difficulty": "hard",
                    "question": "Either Karan will submit the form or pay the late fee in Practice Case 5",
                    "options": [
                            "Either Karan",
                            "will submit the form",
                            "or pay the late fee in Practice Case 5",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Either...or’ joins parallel verb phrases: ‘submit’ and ‘pay’."
            },
            {
                    "id": "detecting-errors-conjunction-set-1-q06",
                    "topic": "Conjunction - Reason/That",
                    "difficulty": "hard",
                    "question": "The reason why he failed was because he ignored revision in Practice Case 6",
                    "options": [
                            "The reason why",
                            "he failed",
                            "was because he ignored revision in Practice Case 6",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "Use ‘the reason why...was that’, not ‘was because’."
            },
            {
                    "id": "detecting-errors-conjunction-set-1-q07",
                    "topic": "Conjunction - Neither/Nor",
                    "difficulty": "hard",
                    "question": "Neither the officer nor the clerks was informed about Practice Case 7",
                    "options": [
                            "Neither the officer",
                            "nor the clerks",
                            "was informed about Practice Case 7",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "With ‘neither...nor’, the verb agrees with the nearer subject. ‘Clerks’ is plural, so use ‘were’."
            },
            {
                    "id": "detecting-errors-conjunction-set-1-q08",
                    "topic": "Conjunction - No Error",
                    "difficulty": "hard",
                    "question": "Pooja not only prepared notes but also solved tests for Practice Case 8",
                    "options": [
                            "Pooja not only",
                            "prepared notes",
                            "but also solved tests for Practice Case 8",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Not only...but also’ connects parallel past-tense verb phrases."
            },
            {
                    "id": "detecting-errors-conjunction-set-1-q09",
                    "topic": "Conjunction - No sooner/Than",
                    "difficulty": "hard",
                    "question": "No sooner did Rohan open the speech when the bell rang in Practice Case 9",
                    "options": [
                            "No sooner did",
                            "Rohan open the speech",
                            "when the bell rang in Practice Case 9",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "The correct pair is ‘no sooner ... than’. Replace ‘when’ with ‘than’."
            },
            {
                    "id": "detecting-errors-conjunction-set-1-q10",
                    "topic": "Conjunction - Hardly/When",
                    "difficulty": "hard",
                    "question": "Hardly had the class started than the power went off in Practice Case 10",
                    "options": [
                            "Hardly had",
                            "the class started",
                            "than the power went off in Practice Case 10",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "The correct pair is ‘hardly/scarcely ... when/before’; ‘than’ is used with ‘no sooner’."
            },
            {
                    "id": "detecting-errors-conjunction-set-1-q11",
                    "topic": "Conjunction - Although/But",
                    "difficulty": "hard",
                    "question": "Although Nikhil was ill but he attended the test in Practice Case 11",
                    "options": [
                            "Although Nikhil was ill",
                            "but he attended",
                            "the test in Practice Case 11",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Do not use ‘although/though’ and ‘but’ together for the same contrast. Remove ‘but’."
            },
            {
                    "id": "detecting-errors-conjunction-set-1-q12",
                    "topic": "Conjunction - Unless",
                    "difficulty": "hard",
                    "question": "Unless you do not revise the document you will forget it in Practice Case 12",
                    "options": [
                            "Unless you do not",
                            "revise the document",
                            "you will forget it in Practice Case 12",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "‘Unless’ means ‘if not’; ‘not’ after unless is redundant. Correct: ‘Unless you revise...’."
            },
            {
                    "id": "detecting-errors-conjunction-set-1-q13",
                    "topic": "Conjunction - No Error",
                    "difficulty": "hard",
                    "question": "Either Amit will submit the form or pay the late fee in Practice Case 13",
                    "options": [
                            "Either Amit",
                            "will submit the form",
                            "or pay the late fee in Practice Case 13",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Either...or’ joins parallel verb phrases: ‘submit’ and ‘pay’."
            },
            {
                    "id": "detecting-errors-conjunction-set-1-q14",
                    "topic": "Conjunction - Reason/That",
                    "difficulty": "hard",
                    "question": "The reason why he failed was because he ignored revision in Practice Case 14",
                    "options": [
                            "The reason why",
                            "he failed",
                            "was because he ignored revision in Practice Case 14",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "Use ‘the reason why...was that’, not ‘was because’."
            },
            {
                    "id": "detecting-errors-conjunction-set-1-q15",
                    "topic": "Conjunction - Neither/Nor",
                    "difficulty": "hard",
                    "question": "Neither the officer nor the clerks was informed about Practice Case 15",
                    "options": [
                            "Neither the officer",
                            "nor the clerks",
                            "was informed about Practice Case 15",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "With ‘neither...nor’, the verb agrees with the nearer subject. ‘Clerks’ is plural, so use ‘were’."
            },
            {
                    "id": "detecting-errors-conjunction-set-1-q16",
                    "topic": "Conjunction - No Error",
                    "difficulty": "hard",
                    "question": "Meera not only prepared notes but also solved tests for Practice Case 16",
                    "options": [
                            "Meera not only",
                            "prepared notes",
                            "but also solved tests for Practice Case 16",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Not only...but also’ connects parallel past-tense verb phrases."
            },
            {
                    "id": "detecting-errors-conjunction-set-1-q17",
                    "topic": "Conjunction - No sooner/Than",
                    "difficulty": "hard",
                    "question": "No sooner did Rahul open the application when the bell rang in Practice Case 17",
                    "options": [
                            "No sooner did",
                            "Rahul open the application",
                            "when the bell rang in Practice Case 17",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "The correct pair is ‘no sooner ... than’. Replace ‘when’ with ‘than’."
            },
            {
                    "id": "detecting-errors-conjunction-set-1-q18",
                    "topic": "Conjunction - Hardly/When",
                    "difficulty": "hard",
                    "question": "Hardly had the class started than the power went off in Practice Case 18",
                    "options": [
                            "Hardly had",
                            "the class started",
                            "than the power went off in Practice Case 18",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "The correct pair is ‘hardly/scarcely ... when/before’; ‘than’ is used with ‘no sooner’."
            },
            {
                    "id": "detecting-errors-conjunction-set-1-q19",
                    "topic": "Conjunction - Although/But",
                    "difficulty": "hard",
                    "question": "Although Gaurav was ill but he attended the test in Practice Case 19",
                    "options": [
                            "Although Gaurav was ill",
                            "but he attended",
                            "the test in Practice Case 19",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Do not use ‘although/though’ and ‘but’ together for the same contrast. Remove ‘but’."
            },
            {
                    "id": "detecting-errors-conjunction-set-1-q20",
                    "topic": "Conjunction - Unless",
                    "difficulty": "hard",
                    "question": "Unless you do not revise the proposal you will forget it in Practice Case 20",
                    "options": [
                            "Unless you do not",
                            "revise the proposal",
                            "you will forget it in Practice Case 20",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "‘Unless’ means ‘if not’; ‘not’ after unless is redundant. Correct: ‘Unless you revise...’."
            },
            {
                    "id": "detecting-errors-conjunction-set-1-q21",
                    "topic": "Conjunction - No Error",
                    "difficulty": "hard",
                    "question": "Either Varun will submit the form or pay the late fee in Practice Case 21",
                    "options": [
                            "Either Varun",
                            "will submit the form",
                            "or pay the late fee in Practice Case 21",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Either...or’ joins parallel verb phrases: ‘submit’ and ‘pay’."
            },
            {
                    "id": "detecting-errors-conjunction-set-1-q22",
                    "topic": "Conjunction - Reason/That",
                    "difficulty": "hard",
                    "question": "The reason why he failed was because he ignored revision in Practice Case 22",
                    "options": [
                            "The reason why",
                            "he failed",
                            "was because he ignored revision in Practice Case 22",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "Use ‘the reason why...was that’, not ‘was because’."
            },
            {
                    "id": "detecting-errors-conjunction-set-1-q23",
                    "topic": "Conjunction - Neither/Nor",
                    "difficulty": "hard",
                    "question": "Neither the officer nor the clerks was informed about Practice Case 23",
                    "options": [
                            "Neither the officer",
                            "nor the clerks",
                            "was informed about Practice Case 23",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "With ‘neither...nor’, the verb agrees with the nearer subject. ‘Clerks’ is plural, so use ‘were’."
            },
            {
                    "id": "detecting-errors-conjunction-set-1-q24",
                    "topic": "Conjunction - No Error",
                    "difficulty": "hard",
                    "question": "Pallavi not only prepared notes but also solved tests for Practice Case 24",
                    "options": [
                            "Pallavi not only",
                            "prepared notes",
                            "but also solved tests for Practice Case 24",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Not only...but also’ connects parallel past-tense verb phrases."
            },
            {
                    "id": "detecting-errors-conjunction-set-1-q25",
                    "topic": "Conjunction - No sooner/Than",
                    "difficulty": "hard",
                    "question": "No sooner did Akash open the assignment when the bell rang in Practice Case 25",
                    "options": [
                            "No sooner did",
                            "Akash open the assignment",
                            "when the bell rang in Practice Case 25",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "The correct pair is ‘no sooner ... than’. Replace ‘when’ with ‘than’."
            },
            {
                    "id": "detecting-errors-conjunction-set-1-q26",
                    "topic": "Conjunction - Hardly/When",
                    "difficulty": "hard",
                    "question": "Hardly had the class started than the power went off in Practice Case 26",
                    "options": [
                            "Hardly had",
                            "the class started",
                            "than the power went off in Practice Case 26",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "The correct pair is ‘hardly/scarcely ... when/before’; ‘than’ is used with ‘no sooner’."
            },
            {
                    "id": "detecting-errors-conjunction-set-1-q27",
                    "topic": "Conjunction - Although/But",
                    "difficulty": "hard",
                    "question": "Although Manoj was ill but he attended the test in Practice Case 27",
                    "options": [
                            "Although Manoj was ill",
                            "but he attended",
                            "the test in Practice Case 27",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Do not use ‘although/though’ and ‘but’ together for the same contrast. Remove ‘but’."
            },
            {
                    "id": "detecting-errors-conjunction-set-1-q28",
                    "topic": "Conjunction - Unless",
                    "difficulty": "hard",
                    "question": "Unless you do not revise the essay you will forget it in Practice Case 28",
                    "options": [
                            "Unless you do not",
                            "revise the essay",
                            "you will forget it in Practice Case 28",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "‘Unless’ means ‘if not’; ‘not’ after unless is redundant. Correct: ‘Unless you revise...’."
            },
            {
                    "id": "detecting-errors-conjunction-set-1-q29",
                    "topic": "Conjunction - No Error",
                    "difficulty": "hard",
                    "question": "Either Harish will submit the form or pay the late fee in Practice Case 29",
                    "options": [
                            "Either Harish",
                            "will submit the form",
                            "or pay the late fee in Practice Case 29",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Either...or’ joins parallel verb phrases: ‘submit’ and ‘pay’."
            },
            {
                    "id": "detecting-errors-conjunction-set-1-q30",
                    "topic": "Conjunction - Reason/That",
                    "difficulty": "hard",
                    "question": "The reason why he failed was because he ignored revision in Practice Case 30",
                    "options": [
                            "The reason why",
                            "he failed",
                            "was because he ignored revision in Practice Case 30",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "Use ‘the reason why...was that’, not ‘was because’."
            },
            {
                    "id": "detecting-errors-conjunction-set-1-q31",
                    "topic": "Conjunction - Neither/Nor",
                    "difficulty": "hard",
                    "question": "Neither the officer nor the clerks was informed about Practice Case 31",
                    "options": [
                            "Neither the officer",
                            "nor the clerks",
                            "was informed about Practice Case 31",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "With ‘neither...nor’, the verb agrees with the nearer subject. ‘Clerks’ is plural, so use ‘were’."
            },
            {
                    "id": "detecting-errors-conjunction-set-1-q32",
                    "topic": "Conjunction - No Error",
                    "difficulty": "hard",
                    "question": "Ritika not only prepared notes but also solved tests for Practice Case 32",
                    "options": [
                            "Ritika not only",
                            "prepared notes",
                            "but also solved tests for Practice Case 32",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Not only...but also’ connects parallel past-tense verb phrases."
            },
            {
                    "id": "detecting-errors-conjunction-set-1-q33",
                    "topic": "Conjunction - No sooner/Than",
                    "difficulty": "hard",
                    "question": "No sooner did Mohit open the project when the bell rang in Practice Case 33",
                    "options": [
                            "No sooner did",
                            "Mohit open the project",
                            "when the bell rang in Practice Case 33",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "The correct pair is ‘no sooner ... than’. Replace ‘when’ with ‘than’."
            },
            {
                    "id": "detecting-errors-conjunction-set-1-q34",
                    "topic": "Conjunction - Hardly/When",
                    "difficulty": "hard",
                    "question": "Hardly had the class started than the power went off in Practice Case 34",
                    "options": [
                            "Hardly had",
                            "the class started",
                            "than the power went off in Practice Case 34",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "The correct pair is ‘hardly/scarcely ... when/before’; ‘than’ is used with ‘no sooner’."
            },
            {
                    "id": "detecting-errors-conjunction-set-1-q35",
                    "topic": "Conjunction - Although/But",
                    "difficulty": "hard",
                    "question": "Although Karan was ill but he attended the test in Practice Case 35",
                    "options": [
                            "Although Karan was ill",
                            "but he attended",
                            "the test in Practice Case 35",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Do not use ‘although/though’ and ‘but’ together for the same contrast. Remove ‘but’."
            },
            {
                    "id": "detecting-errors-conjunction-set-1-q36",
                    "topic": "Conjunction - Unless",
                    "difficulty": "hard",
                    "question": "Unless you do not revise the article you will forget it in Practice Case 36",
                    "options": [
                            "Unless you do not",
                            "revise the article",
                            "you will forget it in Practice Case 36",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "‘Unless’ means ‘if not’; ‘not’ after unless is redundant. Correct: ‘Unless you revise...’."
            },
            {
                    "id": "detecting-errors-conjunction-set-1-q37",
                    "topic": "Conjunction - No Error",
                    "difficulty": "hard",
                    "question": "Either Vivek will submit the form or pay the late fee in Practice Case 37",
                    "options": [
                            "Either Vivek",
                            "will submit the form",
                            "or pay the late fee in Practice Case 37",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Either...or’ joins parallel verb phrases: ‘submit’ and ‘pay’."
            },
            {
                    "id": "detecting-errors-conjunction-set-1-q38",
                    "topic": "Conjunction - Reason/That",
                    "difficulty": "hard",
                    "question": "The reason why he failed was because he ignored revision in Practice Case 38",
                    "options": [
                            "The reason why",
                            "he failed",
                            "was because he ignored revision in Practice Case 38",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "Use ‘the reason why...was that’, not ‘was because’."
            },
            {
                    "id": "detecting-errors-conjunction-set-1-q39",
                    "topic": "Conjunction - Neither/Nor",
                    "difficulty": "hard",
                    "question": "Neither the officer nor the clerks was informed about Practice Case 39",
                    "options": [
                            "Neither the officer",
                            "nor the clerks",
                            "was informed about Practice Case 39",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "With ‘neither...nor’, the verb agrees with the nearer subject. ‘Clerks’ is plural, so use ‘were’."
            },
            {
                    "id": "detecting-errors-conjunction-set-1-q40",
                    "topic": "Conjunction - No Error",
                    "difficulty": "hard",
                    "question": "Anjali not only prepared notes but also solved tests for Practice Case 40",
                    "options": [
                            "Anjali not only",
                            "prepared notes",
                            "but also solved tests for Practice Case 40",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Not only...but also’ connects parallel past-tense verb phrases."
            },
            {
                    "id": "detecting-errors-conjunction-set-1-q41",
                    "topic": "Conjunction - No sooner/Than",
                    "difficulty": "hard",
                    "question": "No sooner did Nikhil open the file when the bell rang in Practice Case 41",
                    "options": [
                            "No sooner did",
                            "Nikhil open the file",
                            "when the bell rang in Practice Case 41",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "The correct pair is ‘no sooner ... than’. Replace ‘when’ with ‘than’."
            },
            {
                    "id": "detecting-errors-conjunction-set-1-q42",
                    "topic": "Conjunction - Hardly/When",
                    "difficulty": "hard",
                    "question": "Hardly had the class started than the power went off in Practice Case 42",
                    "options": [
                            "Hardly had",
                            "the class started",
                            "than the power went off in Practice Case 42",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "The correct pair is ‘hardly/scarcely ... when/before’; ‘than’ is used with ‘no sooner’."
            },
            {
                    "id": "detecting-errors-conjunction-set-1-q43",
                    "topic": "Conjunction - Although/But",
                    "difficulty": "hard",
                    "question": "Although Amit was ill but he attended the test in Practice Case 43",
                    "options": [
                            "Although Amit was ill",
                            "but he attended",
                            "the test in Practice Case 43",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Do not use ‘although/though’ and ‘but’ together for the same contrast. Remove ‘but’."
            },
            {
                    "id": "detecting-errors-conjunction-set-1-q44",
                    "topic": "Conjunction - Unless",
                    "difficulty": "hard",
                    "question": "Unless you do not revise the answer sheet you will forget it in Practice Case 44",
                    "options": [
                            "Unless you do not",
                            "revise the answer sheet",
                            "you will forget it in Practice Case 44",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "‘Unless’ means ‘if not’; ‘not’ after unless is redundant. Correct: ‘Unless you revise...’."
            },
            {
                    "id": "detecting-errors-conjunction-set-1-q45",
                    "topic": "Conjunction - No Error",
                    "difficulty": "hard",
                    "question": "Either Deepak will submit the form or pay the late fee in Practice Case 45",
                    "options": [
                            "Either Deepak",
                            "will submit the form",
                            "or pay the late fee in Practice Case 45",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Either...or’ joins parallel verb phrases: ‘submit’ and ‘pay’."
            },
            {
                    "id": "detecting-errors-conjunction-set-1-q46",
                    "topic": "Conjunction - Reason/That",
                    "difficulty": "hard",
                    "question": "The reason why he failed was because he ignored revision in Practice Case 46",
                    "options": [
                            "The reason why",
                            "he failed",
                            "was because he ignored revision in Practice Case 46",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "Use ‘the reason why...was that’, not ‘was because’."
            },
            {
                    "id": "detecting-errors-conjunction-set-1-q47",
                    "topic": "Conjunction - Neither/Nor",
                    "difficulty": "hard",
                    "question": "Neither the officer nor the clerks was informed about Practice Case 47",
                    "options": [
                            "Neither the officer",
                            "nor the clerks",
                            "was informed about Practice Case 47",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "With ‘neither...nor’, the verb agrees with the nearer subject. ‘Clerks’ is plural, so use ‘were’."
            },
            {
                    "id": "detecting-errors-conjunction-set-1-q48",
                    "topic": "Conjunction - No Error",
                    "difficulty": "hard",
                    "question": "Sunita not only prepared notes but also solved tests for Practice Case 48",
                    "options": [
                            "Sunita not only",
                            "prepared notes",
                            "but also solved tests for Practice Case 48",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Not only...but also’ connects parallel past-tense verb phrases."
            },
            {
                    "id": "detecting-errors-conjunction-set-1-q49",
                    "topic": "Conjunction - No sooner/Than",
                    "difficulty": "hard",
                    "question": "No sooner did Gaurav open the letter when the bell rang in Practice Case 49",
                    "options": [
                            "No sooner did",
                            "Gaurav open the letter",
                            "when the bell rang in Practice Case 49",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "The correct pair is ‘no sooner ... than’. Replace ‘when’ with ‘than’."
            },
            {
                    "id": "detecting-errors-conjunction-set-1-q50",
                    "topic": "Conjunction - Hardly/When",
                    "difficulty": "hard",
                    "question": "Hardly had the class started than the power went off in Practice Case 50",
                    "options": [
                            "Hardly had",
                            "the class started",
                            "than the power went off in Practice Case 50",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "The correct pair is ‘hardly/scarcely ... when/before’; ‘than’ is used with ‘no sooner’."
            }
    ];

    window.GJU_QUIZ_BANK.push({
        id: quizId,
        subject: "English",
        title: "Detecting Errors - Conjunction Set 1",
        description: "50 conjunction-focused detecting error questions covering correlative conjunctions, unless, although, and clause linking.",
        durationMinutes: 30,
        totalQuestions: questions.length,
        marksPerQuestion: 1,
        negativeMarks: 0.25,
        difficulty: "Hard",
        tags: ["SSC", "Railway", "Police", "English", "Detecting Errors"],
        questions
    });
}());
