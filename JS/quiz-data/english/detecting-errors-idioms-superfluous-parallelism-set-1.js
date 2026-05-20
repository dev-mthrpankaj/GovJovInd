(function () {
    "use strict";

    window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];

    const quizId = "detecting-errors-idioms-superfluous-parallelism-set-1";

    const questions = [
            {
                    "id": "detecting-errors-idioms-superfluous-parallelism-set-1-q01",
                    "topic": "Superfluous Expression",
                    "difficulty": "hard",
                    "question": "Aarav returned back the report after checking it in Practice Case 1",
                    "options": [
                            "Aarav returned back",
                            "the report",
                            "after checking it in Practice Case 1",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "‘Return’ already means give/go/come back; ‘back’ is superfluous. Correct: ‘returned the report’."
            },
            {
                    "id": "detecting-errors-idioms-superfluous-parallelism-set-1-q02",
                    "topic": "Superfluous Expression",
                    "difficulty": "hard",
                    "question": "The reason is because he ignored the instructions in Practice Case 2",
                    "options": [
                            "The reason is",
                            "because he ignored",
                            "the instructions in Practice Case 2",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Use ‘the reason is that’, not ‘the reason is because’."
            },
            {
                    "id": "detecting-errors-idioms-superfluous-parallelism-set-1-q03",
                    "topic": "Parallelism",
                    "difficulty": "hard",
                    "question": "She is good at reading, writing and to speak English in Practice Case 3",
                    "options": [
                            "She is good at",
                            "reading, writing",
                            "and to speak English in Practice Case 3",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "Maintain parallelism. Use gerunds throughout: ‘reading, writing and speaking’."
            },
            {
                    "id": "detecting-errors-idioms-superfluous-parallelism-set-1-q04",
                    "topic": "Idioms - No Error",
                    "difficulty": "hard",
                    "question": "Sanya made up his mind to attempt UP Police",
                    "options": [
                            "Sanya made up",
                            "his mind",
                            "to attempt UP Police",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Make up one’s mind’ means decide."
            },
            {
                    "id": "detecting-errors-idioms-superfluous-parallelism-set-1-q05",
                    "topic": "Idioms",
                    "difficulty": "hard",
                    "question": "The news spread like a fire in the coaching centre in Practice Case 5",
                    "options": [
                            "The news spread",
                            "like a fire",
                            "in the coaching centre in Practice Case 5",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "The idiom is ‘spread like wildfire’, meaning spread very quickly."
            },
            {
                    "id": "detecting-errors-idioms-superfluous-parallelism-set-1-q06",
                    "topic": "Parallelism",
                    "difficulty": "hard",
                    "question": "The plan was discussed, approved and implementation in Practice Case 6",
                    "options": [
                            "The plan was",
                            "discussed, approved",
                            "and implementation in Practice Case 6",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "Parallel verbs are required: ‘discussed, approved and implemented’."
            },
            {
                    "id": "detecting-errors-idioms-superfluous-parallelism-set-1-q07",
                    "topic": "Superfluous Expression",
                    "difficulty": "hard",
                    "question": "He repeated the same mistake again in Practice Case 7",
                    "options": [
                            "He repeated",
                            "the same mistake",
                            "again in Practice Case 7",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "‘Repeated’ already contains the idea of ‘again’; ‘again’ is superfluous in formal grammar."
            },
            {
                    "id": "detecting-errors-idioms-superfluous-parallelism-set-1-q08",
                    "topic": "Idioms - No Error",
                    "difficulty": "hard",
                    "question": "Pooja kept his promise despite several problems in Practice Case 8",
                    "options": [
                            "Pooja kept",
                            "his promise",
                            "despite several problems in Practice Case 8",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Keep one’s promise’ is a standard phrase."
            },
            {
                    "id": "detecting-errors-idioms-superfluous-parallelism-set-1-q09",
                    "topic": "Superfluous Expression",
                    "difficulty": "hard",
                    "question": "Rohan returned back the speech after checking it in Practice Case 9",
                    "options": [
                            "Rohan returned back",
                            "the speech",
                            "after checking it in Practice Case 9",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "‘Return’ already means give/go/come back; ‘back’ is superfluous. Correct: ‘returned the report’."
            },
            {
                    "id": "detecting-errors-idioms-superfluous-parallelism-set-1-q10",
                    "topic": "Superfluous Expression",
                    "difficulty": "hard",
                    "question": "The reason is because he ignored the instructions in Practice Case 10",
                    "options": [
                            "The reason is",
                            "because he ignored",
                            "the instructions in Practice Case 10",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Use ‘the reason is that’, not ‘the reason is because’."
            },
            {
                    "id": "detecting-errors-idioms-superfluous-parallelism-set-1-q11",
                    "topic": "Parallelism",
                    "difficulty": "hard",
                    "question": "She is good at reading, writing and to speak English in Practice Case 11",
                    "options": [
                            "She is good at",
                            "reading, writing",
                            "and to speak English in Practice Case 11",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "Maintain parallelism. Use gerunds throughout: ‘reading, writing and speaking’."
            },
            {
                    "id": "detecting-errors-idioms-superfluous-parallelism-set-1-q12",
                    "topic": "Idioms - No Error",
                    "difficulty": "hard",
                    "question": "Priya made up his mind to attempt SSC CPO",
                    "options": [
                            "Priya made up",
                            "his mind",
                            "to attempt SSC CPO",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Make up one’s mind’ means decide."
            },
            {
                    "id": "detecting-errors-idioms-superfluous-parallelism-set-1-q13",
                    "topic": "Idioms",
                    "difficulty": "hard",
                    "question": "The news spread like a fire in the coaching centre in Practice Case 13",
                    "options": [
                            "The news spread",
                            "like a fire",
                            "in the coaching centre in Practice Case 13",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "The idiom is ‘spread like wildfire’, meaning spread very quickly."
            },
            {
                    "id": "detecting-errors-idioms-superfluous-parallelism-set-1-q14",
                    "topic": "Parallelism",
                    "difficulty": "hard",
                    "question": "The plan was discussed, approved and implementation in Practice Case 14",
                    "options": [
                            "The plan was",
                            "discussed, approved",
                            "and implementation in Practice Case 14",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "Parallel verbs are required: ‘discussed, approved and implemented’."
            },
            {
                    "id": "detecting-errors-idioms-superfluous-parallelism-set-1-q15",
                    "topic": "Superfluous Expression",
                    "difficulty": "hard",
                    "question": "He repeated the same mistake again in Practice Case 15",
                    "options": [
                            "He repeated",
                            "the same mistake",
                            "again in Practice Case 15",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "‘Repeated’ already contains the idea of ‘again’; ‘again’ is superfluous in formal grammar."
            },
            {
                    "id": "detecting-errors-idioms-superfluous-parallelism-set-1-q16",
                    "topic": "Idioms - No Error",
                    "difficulty": "hard",
                    "question": "Meera kept his promise despite several problems in Practice Case 16",
                    "options": [
                            "Meera kept",
                            "his promise",
                            "despite several problems in Practice Case 16",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Keep one’s promise’ is a standard phrase."
            },
            {
                    "id": "detecting-errors-idioms-superfluous-parallelism-set-1-q17",
                    "topic": "Superfluous Expression",
                    "difficulty": "hard",
                    "question": "Rahul returned back the application after checking it in Practice Case 17",
                    "options": [
                            "Rahul returned back",
                            "the application",
                            "after checking it in Practice Case 17",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "‘Return’ already means give/go/come back; ‘back’ is superfluous. Correct: ‘returned the report’."
            },
            {
                    "id": "detecting-errors-idioms-superfluous-parallelism-set-1-q18",
                    "topic": "Superfluous Expression",
                    "difficulty": "hard",
                    "question": "The reason is because he ignored the instructions in Practice Case 18",
                    "options": [
                            "The reason is",
                            "because he ignored",
                            "the instructions in Practice Case 18",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Use ‘the reason is that’, not ‘the reason is because’."
            },
            {
                    "id": "detecting-errors-idioms-superfluous-parallelism-set-1-q19",
                    "topic": "Parallelism",
                    "difficulty": "hard",
                    "question": "She is good at reading, writing and to speak English in Practice Case 19",
                    "options": [
                            "She is good at",
                            "reading, writing",
                            "and to speak English in Practice Case 19",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "Maintain parallelism. Use gerunds throughout: ‘reading, writing and speaking’."
            },
            {
                    "id": "detecting-errors-idioms-superfluous-parallelism-set-1-q20",
                    "topic": "Idioms - No Error",
                    "difficulty": "hard",
                    "question": "Isha made up his mind to attempt CDS",
                    "options": [
                            "Isha made up",
                            "his mind",
                            "to attempt CDS",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Make up one’s mind’ means decide."
            },
            {
                    "id": "detecting-errors-idioms-superfluous-parallelism-set-1-q21",
                    "topic": "Idioms",
                    "difficulty": "hard",
                    "question": "The news spread like a fire in the coaching centre in Practice Case 21",
                    "options": [
                            "The news spread",
                            "like a fire",
                            "in the coaching centre in Practice Case 21",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "The idiom is ‘spread like wildfire’, meaning spread very quickly."
            },
            {
                    "id": "detecting-errors-idioms-superfluous-parallelism-set-1-q22",
                    "topic": "Parallelism",
                    "difficulty": "hard",
                    "question": "The plan was discussed, approved and implementation in Practice Case 22",
                    "options": [
                            "The plan was",
                            "discussed, approved",
                            "and implementation in Practice Case 22",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "Parallel verbs are required: ‘discussed, approved and implemented’."
            },
            {
                    "id": "detecting-errors-idioms-superfluous-parallelism-set-1-q23",
                    "topic": "Superfluous Expression",
                    "difficulty": "hard",
                    "question": "He repeated the same mistake again in Practice Case 23",
                    "options": [
                            "He repeated",
                            "the same mistake",
                            "again in Practice Case 23",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "‘Repeated’ already contains the idea of ‘again’; ‘again’ is superfluous in formal grammar."
            },
            {
                    "id": "detecting-errors-idioms-superfluous-parallelism-set-1-q24",
                    "topic": "Idioms - No Error",
                    "difficulty": "hard",
                    "question": "Pallavi kept his promise despite several problems in Practice Case 24",
                    "options": [
                            "Pallavi kept",
                            "his promise",
                            "despite several problems in Practice Case 24",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Keep one’s promise’ is a standard phrase."
            },
            {
                    "id": "detecting-errors-idioms-superfluous-parallelism-set-1-q25",
                    "topic": "Superfluous Expression",
                    "difficulty": "hard",
                    "question": "Akash returned back the assignment after checking it in Practice Case 25",
                    "options": [
                            "Akash returned back",
                            "the assignment",
                            "after checking it in Practice Case 25",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "‘Return’ already means give/go/come back; ‘back’ is superfluous. Correct: ‘returned the report’."
            },
            {
                    "id": "detecting-errors-idioms-superfluous-parallelism-set-1-q26",
                    "topic": "Superfluous Expression",
                    "difficulty": "hard",
                    "question": "The reason is because he ignored the instructions in Practice Case 26",
                    "options": [
                            "The reason is",
                            "because he ignored",
                            "the instructions in Practice Case 26",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Use ‘the reason is that’, not ‘the reason is because’."
            },
            {
                    "id": "detecting-errors-idioms-superfluous-parallelism-set-1-q27",
                    "topic": "Parallelism",
                    "difficulty": "hard",
                    "question": "She is good at reading, writing and to speak English in Practice Case 27",
                    "options": [
                            "She is good at",
                            "reading, writing",
                            "and to speak English in Practice Case 27",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "Maintain parallelism. Use gerunds throughout: ‘reading, writing and speaking’."
            },
            {
                    "id": "detecting-errors-idioms-superfluous-parallelism-set-1-q28",
                    "topic": "Idioms - No Error",
                    "difficulty": "hard",
                    "question": "Shreya made up his mind to attempt UP Lekhpal",
                    "options": [
                            "Shreya made up",
                            "his mind",
                            "to attempt UP Lekhpal",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Make up one’s mind’ means decide."
            },
            {
                    "id": "detecting-errors-idioms-superfluous-parallelism-set-1-q29",
                    "topic": "Idioms",
                    "difficulty": "hard",
                    "question": "The news spread like a fire in the coaching centre in Practice Case 29",
                    "options": [
                            "The news spread",
                            "like a fire",
                            "in the coaching centre in Practice Case 29",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "The idiom is ‘spread like wildfire’, meaning spread very quickly."
            },
            {
                    "id": "detecting-errors-idioms-superfluous-parallelism-set-1-q30",
                    "topic": "Parallelism",
                    "difficulty": "hard",
                    "question": "The plan was discussed, approved and implementation in Practice Case 30",
                    "options": [
                            "The plan was",
                            "discussed, approved",
                            "and implementation in Practice Case 30",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "Parallel verbs are required: ‘discussed, approved and implemented’."
            },
            {
                    "id": "detecting-errors-idioms-superfluous-parallelism-set-1-q31",
                    "topic": "Superfluous Expression",
                    "difficulty": "hard",
                    "question": "He repeated the same mistake again in Practice Case 31",
                    "options": [
                            "He repeated",
                            "the same mistake",
                            "again in Practice Case 31",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "‘Repeated’ already contains the idea of ‘again’; ‘again’ is superfluous in formal grammar."
            },
            {
                    "id": "detecting-errors-idioms-superfluous-parallelism-set-1-q32",
                    "topic": "Idioms - No Error",
                    "difficulty": "hard",
                    "question": "Ritika kept his promise despite several problems in Practice Case 32",
                    "options": [
                            "Ritika kept",
                            "his promise",
                            "despite several problems in Practice Case 32",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Keep one’s promise’ is a standard phrase."
            },
            {
                    "id": "detecting-errors-idioms-superfluous-parallelism-set-1-q33",
                    "topic": "Superfluous Expression",
                    "difficulty": "hard",
                    "question": "Mohit returned back the project after checking it in Practice Case 33",
                    "options": [
                            "Mohit returned back",
                            "the project",
                            "after checking it in Practice Case 33",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "‘Return’ already means give/go/come back; ‘back’ is superfluous. Correct: ‘returned the report’."
            },
            {
                    "id": "detecting-errors-idioms-superfluous-parallelism-set-1-q34",
                    "topic": "Superfluous Expression",
                    "difficulty": "hard",
                    "question": "The reason is because he ignored the instructions in Practice Case 34",
                    "options": [
                            "The reason is",
                            "because he ignored",
                            "the instructions in Practice Case 34",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Use ‘the reason is that’, not ‘the reason is because’."
            },
            {
                    "id": "detecting-errors-idioms-superfluous-parallelism-set-1-q35",
                    "topic": "Parallelism",
                    "difficulty": "hard",
                    "question": "She is good at reading, writing and to speak English in Practice Case 35",
                    "options": [
                            "She is good at",
                            "reading, writing",
                            "and to speak English in Practice Case 35",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "Maintain parallelism. Use gerunds throughout: ‘reading, writing and speaking’."
            },
            {
                    "id": "detecting-errors-idioms-superfluous-parallelism-set-1-q36",
                    "topic": "Idioms - No Error",
                    "difficulty": "hard",
                    "question": "Neha made up his mind to attempt Bank Clerk",
                    "options": [
                            "Neha made up",
                            "his mind",
                            "to attempt Bank Clerk",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Make up one’s mind’ means decide."
            },
            {
                    "id": "detecting-errors-idioms-superfluous-parallelism-set-1-q37",
                    "topic": "Idioms",
                    "difficulty": "hard",
                    "question": "The news spread like a fire in the coaching centre in Practice Case 37",
                    "options": [
                            "The news spread",
                            "like a fire",
                            "in the coaching centre in Practice Case 37",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "The idiom is ‘spread like wildfire’, meaning spread very quickly."
            },
            {
                    "id": "detecting-errors-idioms-superfluous-parallelism-set-1-q38",
                    "topic": "Parallelism",
                    "difficulty": "hard",
                    "question": "The plan was discussed, approved and implementation in Practice Case 38",
                    "options": [
                            "The plan was",
                            "discussed, approved",
                            "and implementation in Practice Case 38",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "Parallel verbs are required: ‘discussed, approved and implemented’."
            },
            {
                    "id": "detecting-errors-idioms-superfluous-parallelism-set-1-q39",
                    "topic": "Superfluous Expression",
                    "difficulty": "hard",
                    "question": "He repeated the same mistake again in Practice Case 39",
                    "options": [
                            "He repeated",
                            "the same mistake",
                            "again in Practice Case 39",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "‘Repeated’ already contains the idea of ‘again’; ‘again’ is superfluous in formal grammar."
            },
            {
                    "id": "detecting-errors-idioms-superfluous-parallelism-set-1-q40",
                    "topic": "Idioms - No Error",
                    "difficulty": "hard",
                    "question": "Anjali kept his promise despite several problems in Practice Case 40",
                    "options": [
                            "Anjali kept",
                            "his promise",
                            "despite several problems in Practice Case 40",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Keep one’s promise’ is a standard phrase."
            },
            {
                    "id": "detecting-errors-idioms-superfluous-parallelism-set-1-q41",
                    "topic": "Superfluous Expression",
                    "difficulty": "hard",
                    "question": "Nikhil returned back the file after checking it in Practice Case 41",
                    "options": [
                            "Nikhil returned back",
                            "the file",
                            "after checking it in Practice Case 41",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "‘Return’ already means give/go/come back; ‘back’ is superfluous. Correct: ‘returned the report’."
            },
            {
                    "id": "detecting-errors-idioms-superfluous-parallelism-set-1-q42",
                    "topic": "Superfluous Expression",
                    "difficulty": "hard",
                    "question": "The reason is because he ignored the instructions in Practice Case 42",
                    "options": [
                            "The reason is",
                            "because he ignored",
                            "the instructions in Practice Case 42",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Use ‘the reason is that’, not ‘the reason is because’."
            },
            {
                    "id": "detecting-errors-idioms-superfluous-parallelism-set-1-q43",
                    "topic": "Parallelism",
                    "difficulty": "hard",
                    "question": "She is good at reading, writing and to speak English in Practice Case 43",
                    "options": [
                            "She is good at",
                            "reading, writing",
                            "and to speak English in Practice Case 43",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "Maintain parallelism. Use gerunds throughout: ‘reading, writing and speaking’."
            },
            {
                    "id": "detecting-errors-idioms-superfluous-parallelism-set-1-q44",
                    "topic": "Idioms - No Error",
                    "difficulty": "hard",
                    "question": "Kavita made up his mind to attempt UP Police",
                    "options": [
                            "Kavita made up",
                            "his mind",
                            "to attempt UP Police",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Make up one’s mind’ means decide."
            },
            {
                    "id": "detecting-errors-idioms-superfluous-parallelism-set-1-q45",
                    "topic": "Idioms",
                    "difficulty": "hard",
                    "question": "The news spread like a fire in the coaching centre in Practice Case 45",
                    "options": [
                            "The news spread",
                            "like a fire",
                            "in the coaching centre in Practice Case 45",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "The idiom is ‘spread like wildfire’, meaning spread very quickly."
            },
            {
                    "id": "detecting-errors-idioms-superfluous-parallelism-set-1-q46",
                    "topic": "Parallelism",
                    "difficulty": "hard",
                    "question": "The plan was discussed, approved and implementation in Practice Case 46",
                    "options": [
                            "The plan was",
                            "discussed, approved",
                            "and implementation in Practice Case 46",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "Parallel verbs are required: ‘discussed, approved and implemented’."
            },
            {
                    "id": "detecting-errors-idioms-superfluous-parallelism-set-1-q47",
                    "topic": "Superfluous Expression",
                    "difficulty": "hard",
                    "question": "He repeated the same mistake again in Practice Case 47",
                    "options": [
                            "He repeated",
                            "the same mistake",
                            "again in Practice Case 47",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "‘Repeated’ already contains the idea of ‘again’; ‘again’ is superfluous in formal grammar."
            },
            {
                    "id": "detecting-errors-idioms-superfluous-parallelism-set-1-q48",
                    "topic": "Idioms - No Error",
                    "difficulty": "hard",
                    "question": "Sunita kept his promise despite several problems in Practice Case 48",
                    "options": [
                            "Sunita kept",
                            "his promise",
                            "despite several problems in Practice Case 48",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Keep one’s promise’ is a standard phrase."
            },
            {
                    "id": "detecting-errors-idioms-superfluous-parallelism-set-1-q49",
                    "topic": "Superfluous Expression",
                    "difficulty": "hard",
                    "question": "Gaurav returned back the letter after checking it in Practice Case 49",
                    "options": [
                            "Gaurav returned back",
                            "the letter",
                            "after checking it in Practice Case 49",
                            "No error"
                    ],
                    "correctAnswer": 0,
                    "explanation": "‘Return’ already means give/go/come back; ‘back’ is superfluous. Correct: ‘returned the report’."
            },
            {
                    "id": "detecting-errors-idioms-superfluous-parallelism-set-1-q50",
                    "topic": "Superfluous Expression",
                    "difficulty": "hard",
                    "question": "The reason is because he ignored the instructions in Practice Case 50",
                    "options": [
                            "The reason is",
                            "because he ignored",
                            "the instructions in Practice Case 50",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Use ‘the reason is that’, not ‘the reason is because’."
            }
    ];

    window.GJU_QUIZ_BANK.push({
        id: quizId,
        subject: "English",
        title: "Detecting Errors - Idioms, Superfluous Expression & Parallelism Set 1",
        description: "50 detecting error questions on idioms, redundancy and parallel structure.",
        durationMinutes: 30,
        totalQuestions: questions.length,
        marksPerQuestion: 1,
        negativeMarks: 0.25,
        difficulty: "Hard",
        tags: ["SSC", "Railway", "Police", "English", "Detecting Errors"],
        questions
    });
}());
