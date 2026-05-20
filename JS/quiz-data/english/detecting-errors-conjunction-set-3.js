(function () {
    "use strict";

    window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];

    const quizId = "detecting-errors-conjunction-set-3";

    const questions = [
            {
                    "id": "detecting-errors-conjunction-set-3-q01",
                    "topic": "Conjunction - No Error",
                    "difficulty": "hard",
                    "question": "Either Nikhil will submit the form or pay the late fee in Practice Case 101",
                    "options": [
                            "Either Nikhil",
                            "will submit the form",
                            "or pay the late fee in Practice Case 101",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Either...or’ joins parallel verb phrases: ‘submit’ and ‘pay’."
            },
            {
                    "id": "detecting-errors-conjunction-set-3-q02",
                    "topic": "Conjunction - Reason/That",
                    "difficulty": "hard",
                    "question": "The reason why he failed was because he ignored revision in Practice Case 102",
                    "options": [
                            "The reason why",
                            "he failed",
                            "was because he ignored revision in Practice Case 102",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "Use ‘the reason why...was that’, not ‘was because’."
            },
            {
                    "id": "detecting-errors-conjunction-set-3-q03",
                    "topic": "Conjunction - Neither/Nor",
                    "difficulty": "hard",
                    "question": "Neither the officer nor the clerks was informed about Practice Case 103",
                    "options": [
                            "Neither the officer",
                            "nor the clerks",
                            "was informed about Practice Case 103",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "With ‘neither...nor’, the verb agrees with the nearer subject. ‘Clerks’ is plural, so use ‘were’."
            },
            {
                    "id": "detecting-errors-conjunction-set-3-q04",
                    "topic": "Conjunction - No Error",
                    "difficulty": "hard",
                    "question": "Kavita not only prepared notes but also solved tests for Practice Case 104",
                    "options": [
                            "Kavita not only",
                            "prepared notes",
                            "but also solved tests for Practice Case 104",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Not only...but also’ connects parallel past-tense verb phrases."
            },
            {
                    "id": "detecting-errors-conjunction-set-3-q05",
                    "topic": "Conjunction - No sooner/Than",
                    "difficulty": "hard",
                    "question": "No sooner did Deepak open the presentation when the bell rang in Practice Case 105",
                    "options": [
                            "No sooner did",
                            "Deepak open the presentation",
                            "when the bell rang in Practice Case 105",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "The correct pair is ‘no sooner ... than’. Replace ‘when’ with ‘than’."
            },
            {
                    "id": "detecting-errors-conjunction-set-3-q06",
                    "topic": "Conjunction - Hardly/When",
                    "difficulty": "hard",
                    "question": "Hardly had the class started than the power went off in Practice Case 106",
                    "options": [
                            "Hardly had",
                            "the class started",
                            "than the power went off in Practice Case 106",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "The correct pair is ‘hardly/scarcely ... when/before’; ‘than’ is used with ‘no sooner’."
            },
            {
                    "id": "detecting-errors-conjunction-set-3-q07",
                    "topic": "Conjunction - Although/But",
                    "difficulty": "hard",
                    "question": "Although Rahul was ill but he attended the test in Practice Case 107",
                    "options": [
                            "Although Rahul was ill",
                            "but he attended",
                            "the test in Practice Case 107",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Do not use ‘although/though’ and ‘but’ together for the same contrast. Remove ‘but’."
            },
            {
                    "id": "detecting-errors-conjunction-set-3-q08",
                    "topic": "Conjunction - Unless",
                    "difficulty": "hard",
                    "question": "Unless you do not revise the project you will forget it in Practice Case 108",
                    "options": [
                            "Unless you do not",
                            "revise the project",
                            "you will forget it in Practice Case 108",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "‘Unless’ means ‘if not’; ‘not’ after unless is redundant. Correct: ‘Unless you revise...’."
            },
            {
                    "id": "detecting-errors-conjunction-set-3-q09",
                    "topic": "Conjunction - No Error",
                    "difficulty": "hard",
                    "question": "Either Gaurav will submit the form or pay the late fee in Practice Case 109",
                    "options": [
                            "Either Gaurav",
                            "will submit the form",
                            "or pay the late fee in Practice Case 109",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Either...or’ joins parallel verb phrases: ‘submit’ and ‘pay’."
            },
            {
                    "id": "detecting-errors-conjunction-set-3-q10",
                    "topic": "Conjunction - Reason/That",
                    "difficulty": "hard",
                    "question": "The reason why he failed was because he ignored revision in Practice Case 110",
                    "options": [
                            "The reason why",
                            "he failed",
                            "was because he ignored revision in Practice Case 110",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "Use ‘the reason why...was that’, not ‘was because’."
            },
            {
                    "id": "detecting-errors-conjunction-set-3-q11",
                    "topic": "Conjunction - Neither/Nor",
                    "difficulty": "hard",
                    "question": "Neither the officer nor the clerks was informed about Practice Case 111",
                    "options": [
                            "Neither the officer",
                            "nor the clerks",
                            "was informed about Practice Case 111",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "With ‘neither...nor’, the verb agrees with the nearer subject. ‘Clerks’ is plural, so use ‘were’."
            },
            {
                    "id": "detecting-errors-conjunction-set-3-q12",
                    "topic": "Conjunction - No Error",
                    "difficulty": "hard",
                    "question": "Riya not only prepared notes but also solved tests for Practice Case 112",
                    "options": [
                            "Riya not only",
                            "prepared notes",
                            "but also solved tests for Practice Case 112",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Not only...but also’ connects parallel past-tense verb phrases."
            },
            {
                    "id": "detecting-errors-conjunction-set-3-q13",
                    "topic": "Conjunction - No sooner/Than",
                    "difficulty": "hard",
                    "question": "No sooner did Suresh open the summary when the bell rang in Practice Case 113",
                    "options": [
                            "No sooner did",
                            "Suresh open the summary",
                            "when the bell rang in Practice Case 113",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "The correct pair is ‘no sooner ... than’. Replace ‘when’ with ‘than’."
            },
            {
                    "id": "detecting-errors-conjunction-set-3-q14",
                    "topic": "Conjunction - Hardly/When",
                    "difficulty": "hard",
                    "question": "Hardly had the class started than the power went off in Practice Case 114",
                    "options": [
                            "Hardly had",
                            "the class started",
                            "than the power went off in Practice Case 114",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "The correct pair is ‘hardly/scarcely ... when/before’; ‘than’ is used with ‘no sooner’."
            },
            {
                    "id": "detecting-errors-conjunction-set-3-q15",
                    "topic": "Conjunction - Although/But",
                    "difficulty": "hard",
                    "question": "Although Akash was ill but he attended the test in Practice Case 115",
                    "options": [
                            "Although Akash was ill",
                            "but he attended",
                            "the test in Practice Case 115",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Do not use ‘although/though’ and ‘but’ together for the same contrast. Remove ‘but’."
            },
            {
                    "id": "detecting-errors-conjunction-set-3-q16",
                    "topic": "Conjunction - Unless",
                    "difficulty": "hard",
                    "question": "Unless you do not revise the file you will forget it in Practice Case 116",
                    "options": [
                            "Unless you do not",
                            "revise the file",
                            "you will forget it in Practice Case 116",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "‘Unless’ means ‘if not’; ‘not’ after unless is redundant. Correct: ‘Unless you revise...’."
            },
            {
                    "id": "detecting-errors-conjunction-set-3-q17",
                    "topic": "Conjunction - No Error",
                    "difficulty": "hard",
                    "question": "Either Manoj will submit the form or pay the late fee in Practice Case 117",
                    "options": [
                            "Either Manoj",
                            "will submit the form",
                            "or pay the late fee in Practice Case 117",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Either...or’ joins parallel verb phrases: ‘submit’ and ‘pay’."
            },
            {
                    "id": "detecting-errors-conjunction-set-3-q18",
                    "topic": "Conjunction - Reason/That",
                    "difficulty": "hard",
                    "question": "The reason why he failed was because he ignored revision in Practice Case 118",
                    "options": [
                            "The reason why",
                            "he failed",
                            "was because he ignored revision in Practice Case 118",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "Use ‘the reason why...was that’, not ‘was because’."
            },
            {
                    "id": "detecting-errors-conjunction-set-3-q19",
                    "topic": "Conjunction - Neither/Nor",
                    "difficulty": "hard",
                    "question": "Neither the officer nor the clerks was informed about Practice Case 119",
                    "options": [
                            "Neither the officer",
                            "nor the clerks",
                            "was informed about Practice Case 119",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "With ‘neither...nor’, the verb agrees with the nearer subject. ‘Clerks’ is plural, so use ‘were’."
            },
            {
                    "id": "detecting-errors-conjunction-set-3-q20",
                    "topic": "Conjunction - No Error",
                    "difficulty": "hard",
                    "question": "Divya not only prepared notes but also solved tests for Practice Case 120",
                    "options": [
                            "Divya not only",
                            "prepared notes",
                            "but also solved tests for Practice Case 120",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Not only...but also’ connects parallel past-tense verb phrases."
            },
            {
                    "id": "detecting-errors-conjunction-set-3-q21",
                    "topic": "Conjunction - No sooner/Than",
                    "difficulty": "hard",
                    "question": "No sooner did Aarav open the report when the bell rang in Practice Case 121",
                    "options": [
                            "No sooner did",
                            "Aarav open the report",
                            "when the bell rang in Practice Case 121",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "The correct pair is ‘no sooner ... than’. Replace ‘when’ with ‘than’."
            },
            {
                    "id": "detecting-errors-conjunction-set-3-q22",
                    "topic": "Conjunction - Hardly/When",
                    "difficulty": "hard",
                    "question": "Hardly had the class started than the power went off in Practice Case 122",
                    "options": [
                            "Hardly had",
                            "the class started",
                            "than the power went off in Practice Case 122",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "The correct pair is ‘hardly/scarcely ... when/before’; ‘than’ is used with ‘no sooner’."
            },
            {
                    "id": "detecting-errors-conjunction-set-3-q23",
                    "topic": "Conjunction - Although/But",
                    "difficulty": "hard",
                    "question": "Although Mohit was ill but he attended the test in Practice Case 123",
                    "options": [
                            "Although Mohit was ill",
                            "but he attended",
                            "the test in Practice Case 123",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Do not use ‘although/though’ and ‘but’ together for the same contrast. Remove ‘but’."
            },
            {
                    "id": "detecting-errors-conjunction-set-3-q24",
                    "topic": "Conjunction - Unless",
                    "difficulty": "hard",
                    "question": "Unless you do not revise the letter you will forget it in Practice Case 124",
                    "options": [
                            "Unless you do not",
                            "revise the letter",
                            "you will forget it in Practice Case 124",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "‘Unless’ means ‘if not’; ‘not’ after unless is redundant. Correct: ‘Unless you revise...’."
            },
            {
                    "id": "detecting-errors-conjunction-set-3-q25",
                    "topic": "Conjunction - No Error",
                    "difficulty": "hard",
                    "question": "Either Karan will submit the form or pay the late fee in Practice Case 125",
                    "options": [
                            "Either Karan",
                            "will submit the form",
                            "or pay the late fee in Practice Case 125",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Either...or’ joins parallel verb phrases: ‘submit’ and ‘pay’."
            },
            {
                    "id": "detecting-errors-conjunction-set-3-q26",
                    "topic": "Conjunction - Reason/That",
                    "difficulty": "hard",
                    "question": "The reason why he failed was because he ignored revision in Practice Case 126",
                    "options": [
                            "The reason why",
                            "he failed",
                            "was because he ignored revision in Practice Case 126",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "Use ‘the reason why...was that’, not ‘was because’."
            },
            {
                    "id": "detecting-errors-conjunction-set-3-q27",
                    "topic": "Conjunction - Neither/Nor",
                    "difficulty": "hard",
                    "question": "Neither the officer nor the clerks was informed about Practice Case 127",
                    "options": [
                            "Neither the officer",
                            "nor the clerks",
                            "was informed about Practice Case 127",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "With ‘neither...nor’, the verb agrees with the nearer subject. ‘Clerks’ is plural, so use ‘were’."
            },
            {
                    "id": "detecting-errors-conjunction-set-3-q28",
                    "topic": "Conjunction - No Error",
                    "difficulty": "hard",
                    "question": "Pooja not only prepared notes but also solved tests for Practice Case 128",
                    "options": [
                            "Pooja not only",
                            "prepared notes",
                            "but also solved tests for Practice Case 128",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Not only...but also’ connects parallel past-tense verb phrases."
            },
            {
                    "id": "detecting-errors-conjunction-set-3-q29",
                    "topic": "Conjunction - No sooner/Than",
                    "difficulty": "hard",
                    "question": "No sooner did Rohan open the speech when the bell rang in Practice Case 129",
                    "options": [
                            "No sooner did",
                            "Rohan open the speech",
                            "when the bell rang in Practice Case 129",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "The correct pair is ‘no sooner ... than’. Replace ‘when’ with ‘than’."
            },
            {
                    "id": "detecting-errors-conjunction-set-3-q30",
                    "topic": "Conjunction - Hardly/When",
                    "difficulty": "hard",
                    "question": "Hardly had the class started than the power went off in Practice Case 130",
                    "options": [
                            "Hardly had",
                            "the class started",
                            "than the power went off in Practice Case 130",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "The correct pair is ‘hardly/scarcely ... when/before’; ‘than’ is used with ‘no sooner’."
            },
            {
                    "id": "detecting-errors-conjunction-set-3-q31",
                    "topic": "Conjunction - Although/But",
                    "difficulty": "hard",
                    "question": "Although Nikhil was ill but he attended the test in Practice Case 131",
                    "options": [
                            "Although Nikhil was ill",
                            "but he attended",
                            "the test in Practice Case 131",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Do not use ‘although/though’ and ‘but’ together for the same contrast. Remove ‘but’."
            },
            {
                    "id": "detecting-errors-conjunction-set-3-q32",
                    "topic": "Conjunction - Unless",
                    "difficulty": "hard",
                    "question": "Unless you do not revise the document you will forget it in Practice Case 132",
                    "options": [
                            "Unless you do not",
                            "revise the document",
                            "you will forget it in Practice Case 132",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "‘Unless’ means ‘if not’; ‘not’ after unless is redundant. Correct: ‘Unless you revise...’."
            },
            {
                    "id": "detecting-errors-conjunction-set-3-q33",
                    "topic": "Conjunction - No Error",
                    "difficulty": "hard",
                    "question": "Either Amit will submit the form or pay the late fee in Practice Case 133",
                    "options": [
                            "Either Amit",
                            "will submit the form",
                            "or pay the late fee in Practice Case 133",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Either...or’ joins parallel verb phrases: ‘submit’ and ‘pay’."
            },
            {
                    "id": "detecting-errors-conjunction-set-3-q34",
                    "topic": "Conjunction - Reason/That",
                    "difficulty": "hard",
                    "question": "The reason why he failed was because he ignored revision in Practice Case 134",
                    "options": [
                            "The reason why",
                            "he failed",
                            "was because he ignored revision in Practice Case 134",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "Use ‘the reason why...was that’, not ‘was because’."
            },
            {
                    "id": "detecting-errors-conjunction-set-3-q35",
                    "topic": "Conjunction - Neither/Nor",
                    "difficulty": "hard",
                    "question": "Neither the officer nor the clerks was informed about Practice Case 135",
                    "options": [
                            "Neither the officer",
                            "nor the clerks",
                            "was informed about Practice Case 135",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "With ‘neither...nor’, the verb agrees with the nearer subject. ‘Clerks’ is plural, so use ‘were’."
            },
            {
                    "id": "detecting-errors-conjunction-set-3-q36",
                    "topic": "Conjunction - No Error",
                    "difficulty": "hard",
                    "question": "Meera not only prepared notes but also solved tests for Practice Case 136",
                    "options": [
                            "Meera not only",
                            "prepared notes",
                            "but also solved tests for Practice Case 136",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Not only...but also’ connects parallel past-tense verb phrases."
            },
            {
                    "id": "detecting-errors-conjunction-set-3-q37",
                    "topic": "Conjunction - No sooner/Than",
                    "difficulty": "hard",
                    "question": "No sooner did Rahul open the application when the bell rang in Practice Case 137",
                    "options": [
                            "No sooner did",
                            "Rahul open the application",
                            "when the bell rang in Practice Case 137",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "The correct pair is ‘no sooner ... than’. Replace ‘when’ with ‘than’."
            },
            {
                    "id": "detecting-errors-conjunction-set-3-q38",
                    "topic": "Conjunction - Hardly/When",
                    "difficulty": "hard",
                    "question": "Hardly had the class started than the power went off in Practice Case 138",
                    "options": [
                            "Hardly had",
                            "the class started",
                            "than the power went off in Practice Case 138",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "The correct pair is ‘hardly/scarcely ... when/before’; ‘than’ is used with ‘no sooner’."
            },
            {
                    "id": "detecting-errors-conjunction-set-3-q39",
                    "topic": "Conjunction - Although/But",
                    "difficulty": "hard",
                    "question": "Although Gaurav was ill but he attended the test in Practice Case 139",
                    "options": [
                            "Although Gaurav was ill",
                            "but he attended",
                            "the test in Practice Case 139",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Do not use ‘although/though’ and ‘but’ together for the same contrast. Remove ‘but’."
            },
            {
                    "id": "detecting-errors-conjunction-set-3-q40",
                    "topic": "Conjunction - Unless",
                    "difficulty": "hard",
                    "question": "Unless you do not revise the proposal you will forget it in Practice Case 140",
                    "options": [
                            "Unless you do not",
                            "revise the proposal",
                            "you will forget it in Practice Case 140",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "‘Unless’ means ‘if not’; ‘not’ after unless is redundant. Correct: ‘Unless you revise...’."
            },
            {
                    "id": "detecting-errors-conjunction-set-3-q41",
                    "topic": "Conjunction - No Error",
                    "difficulty": "hard",
                    "question": "Either Varun will submit the form or pay the late fee in Practice Case 141",
                    "options": [
                            "Either Varun",
                            "will submit the form",
                            "or pay the late fee in Practice Case 141",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Either...or’ joins parallel verb phrases: ‘submit’ and ‘pay’."
            },
            {
                    "id": "detecting-errors-conjunction-set-3-q42",
                    "topic": "Conjunction - Reason/That",
                    "difficulty": "hard",
                    "question": "The reason why he failed was because he ignored revision in Practice Case 142",
                    "options": [
                            "The reason why",
                            "he failed",
                            "was because he ignored revision in Practice Case 142",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "Use ‘the reason why...was that’, not ‘was because’."
            },
            {
                    "id": "detecting-errors-conjunction-set-3-q43",
                    "topic": "Conjunction - Neither/Nor",
                    "difficulty": "hard",
                    "question": "Neither the officer nor the clerks was informed about Practice Case 143",
                    "options": [
                            "Neither the officer",
                            "nor the clerks",
                            "was informed about Practice Case 143",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "With ‘neither...nor’, the verb agrees with the nearer subject. ‘Clerks’ is plural, so use ‘were’."
            },
            {
                    "id": "detecting-errors-conjunction-set-3-q44",
                    "topic": "Conjunction - No Error",
                    "difficulty": "hard",
                    "question": "Pallavi not only prepared notes but also solved tests for Practice Case 144",
                    "options": [
                            "Pallavi not only",
                            "prepared notes",
                            "but also solved tests for Practice Case 144",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Not only...but also’ connects parallel past-tense verb phrases."
            },
            {
                    "id": "detecting-errors-conjunction-set-3-q45",
                    "topic": "Conjunction - No sooner/Than",
                    "difficulty": "hard",
                    "question": "No sooner did Akash open the assignment when the bell rang in Practice Case 145",
                    "options": [
                            "No sooner did",
                            "Akash open the assignment",
                            "when the bell rang in Practice Case 145",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "The correct pair is ‘no sooner ... than’. Replace ‘when’ with ‘than’."
            },
            {
                    "id": "detecting-errors-conjunction-set-3-q46",
                    "topic": "Conjunction - Hardly/When",
                    "difficulty": "hard",
                    "question": "Hardly had the class started than the power went off in Practice Case 146",
                    "options": [
                            "Hardly had",
                            "the class started",
                            "than the power went off in Practice Case 146",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "The correct pair is ‘hardly/scarcely ... when/before’; ‘than’ is used with ‘no sooner’."
            },
            {
                    "id": "detecting-errors-conjunction-set-3-q47",
                    "topic": "Conjunction - Although/But",
                    "difficulty": "hard",
                    "question": "Although Manoj was ill but he attended the test in Practice Case 147",
                    "options": [
                            "Although Manoj was ill",
                            "but he attended",
                            "the test in Practice Case 147",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Do not use ‘although/though’ and ‘but’ together for the same contrast. Remove ‘but’."
            },
            {
                    "id": "detecting-errors-conjunction-set-3-q48",
                    "topic": "Conjunction - Unless",
                    "difficulty": "hard",
                    "question": "Unless you do not revise the essay you will forget it in Practice Case 148",
                    "options": [
                            "Unless you do not",
                            "revise the essay",
                            "you will forget it in Practice Case 148",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "‘Unless’ means ‘if not’; ‘not’ after unless is redundant. Correct: ‘Unless you revise...’."
            },
            {
                    "id": "detecting-errors-conjunction-set-3-q49",
                    "topic": "Conjunction - No Error",
                    "difficulty": "hard",
                    "question": "Either Harish will submit the form or pay the late fee in Practice Case 149",
                    "options": [
                            "Either Harish",
                            "will submit the form",
                            "or pay the late fee in Practice Case 149",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Either...or’ joins parallel verb phrases: ‘submit’ and ‘pay’."
            },
            {
                    "id": "detecting-errors-conjunction-set-3-q50",
                    "topic": "Conjunction - Reason/That",
                    "difficulty": "hard",
                    "question": "The reason why he failed was because he ignored revision in Practice Case 150",
                    "options": [
                            "The reason why",
                            "he failed",
                            "was because he ignored revision in Practice Case 150",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "Use ‘the reason why...was that’, not ‘was because’."
            }
    ];

    window.GJU_QUIZ_BANK.push({
        id: quizId,
        subject: "English",
        title: "Detecting Errors - Conjunction Set 3",
        description: "50 mixed conjunction detecting error questions based on SSC-style patterns.",
        durationMinutes: 30,
        totalQuestions: questions.length,
        marksPerQuestion: 1,
        negativeMarks: 0.25,
        difficulty: "Hard",
        tags: ["SSC", "Railway", "Police", "English", "Detecting Errors"],
        questions
    });
}());
