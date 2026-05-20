(function () {
    "use strict";

    window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];

    const quizId = "detecting-errors-subject-verb-agreement-set-4";

    const questions = [
            {
                    "id": "detecting-errors-subject-verb-agreement-set-4-q01",
                    "topic": "SVA - No Error",
                    "difficulty": "hard",
                    "question": "A number of students were absent in Practice Case 183",
                    "options": [
                            "A number of students",
                            "were absent",
                            "in Practice Case 183",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘A number of + plural noun’ takes plural verb."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-4-q02",
                    "topic": "SVA - Number",
                    "difficulty": "hard",
                    "question": "The number of vacancies are increasing in Practice Case 184",
                    "options": [
                            "The number",
                            "of vacancies",
                            "are increasing in Practice Case 184",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "‘The number of’ is singular and takes singular verb. Correct: ‘is increasing’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-4-q03",
                    "topic": "SVA - One Of",
                    "difficulty": "hard",
                    "question": "One of the officers have submitted a wrong document in Practice Case 185",
                    "options": [
                            "One of",
                            "the officers have",
                            "submitted a wrong document in Practice Case 185",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘One of + plural noun’ takes singular verb because the head subject is ‘one’. Correct: ‘has’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-4-q04",
                    "topic": "SVA - Subject Head",
                    "difficulty": "hard",
                    "question": "The quality of these answers are poor in Practice Case 186",
                    "options": [
                            "The quality",
                            "of these answers",
                            "are poor in Practice Case 186",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "The subject is singular ‘quality’. Correct verb: ‘is’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-4-q05",
                    "topic": "SVA - Neither/Nor",
                    "difficulty": "hard",
                    "question": "Neither the officer nor the clerks was present in Practice Case 187",
                    "options": [
                            "Neither the officer",
                            "nor the clerks",
                            "was present in Practice Case 187",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "With ‘neither...nor’, the verb agrees with the nearer subject. ‘Clerks’ is plural, so use ‘were’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-4-q06",
                    "topic": "SVA - No Error",
                    "difficulty": "hard",
                    "question": "Each of the students has received the admit card in Practice Case 188",
                    "options": [
                            "Each of",
                            "the students",
                            "has received the admit card in Practice Case 188",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Each of’ takes singular verb ‘has’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-4-q07",
                    "topic": "SVA - No Error",
                    "difficulty": "hard",
                    "question": "A number of students were absent in Practice Case 191",
                    "options": [
                            "A number of students",
                            "were absent",
                            "in Practice Case 191",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘A number of + plural noun’ takes plural verb."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-4-q08",
                    "topic": "SVA - Number",
                    "difficulty": "hard",
                    "question": "The number of vacancies are increasing in Practice Case 192",
                    "options": [
                            "The number",
                            "of vacancies",
                            "are increasing in Practice Case 192",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "‘The number of’ is singular and takes singular verb. Correct: ‘is increasing’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-4-q09",
                    "topic": "SVA - One Of",
                    "difficulty": "hard",
                    "question": "One of the students have submitted a wrong document in Practice Case 193",
                    "options": [
                            "One of",
                            "the students have",
                            "submitted a wrong document in Practice Case 193",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘One of + plural noun’ takes singular verb because the head subject is ‘one’. Correct: ‘has’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-4-q10",
                    "topic": "SVA - Subject Head",
                    "difficulty": "hard",
                    "question": "The quality of these answers are poor in Practice Case 194",
                    "options": [
                            "The quality",
                            "of these answers",
                            "are poor in Practice Case 194",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "The subject is singular ‘quality’. Correct verb: ‘is’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-4-q11",
                    "topic": "SVA - Neither/Nor",
                    "difficulty": "hard",
                    "question": "Neither the officer nor the clerks was present in Practice Case 195",
                    "options": [
                            "Neither the officer",
                            "nor the clerks",
                            "was present in Practice Case 195",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "With ‘neither...nor’, the verb agrees with the nearer subject. ‘Clerks’ is plural, so use ‘were’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-4-q12",
                    "topic": "SVA - No Error",
                    "difficulty": "hard",
                    "question": "Each of the students has received the admit card in Practice Case 196",
                    "options": [
                            "Each of",
                            "the students",
                            "has received the admit card in Practice Case 196",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Each of’ takes singular verb ‘has’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-4-q13",
                    "topic": "SVA - No Error",
                    "difficulty": "hard",
                    "question": "A number of students were absent in Practice Case 199",
                    "options": [
                            "A number of students",
                            "were absent",
                            "in Practice Case 199",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘A number of + plural noun’ takes plural verb."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-4-q14",
                    "topic": "SVA - Number",
                    "difficulty": "hard",
                    "question": "The number of vacancies are increasing in Practice Case 200",
                    "options": [
                            "The number",
                            "of vacancies",
                            "are increasing in Practice Case 200",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "‘The number of’ is singular and takes singular verb. Correct: ‘is increasing’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-4-q15",
                    "topic": "SVA - One Of",
                    "difficulty": "hard",
                    "question": "One of the documents have submitted a wrong document in Practice Case 201",
                    "options": [
                            "One of",
                            "the documents have",
                            "submitted a wrong document in Practice Case 201",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘One of + plural noun’ takes singular verb because the head subject is ‘one’. Correct: ‘has’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-4-q16",
                    "topic": "SVA - Subject Head",
                    "difficulty": "hard",
                    "question": "The quality of these answers are poor in Practice Case 202",
                    "options": [
                            "The quality",
                            "of these answers",
                            "are poor in Practice Case 202",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "The subject is singular ‘quality’. Correct verb: ‘is’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-4-q17",
                    "topic": "SVA - Neither/Nor",
                    "difficulty": "hard",
                    "question": "Neither the officer nor the clerks was present in Practice Case 203",
                    "options": [
                            "Neither the officer",
                            "nor the clerks",
                            "was present in Practice Case 203",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "With ‘neither...nor’, the verb agrees with the nearer subject. ‘Clerks’ is plural, so use ‘were’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-4-q18",
                    "topic": "SVA - No Error",
                    "difficulty": "hard",
                    "question": "Each of the students has received the admit card in Practice Case 204",
                    "options": [
                            "Each of",
                            "the students",
                            "has received the admit card in Practice Case 204",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Each of’ takes singular verb ‘has’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-4-q19",
                    "topic": "SVA - No Error",
                    "difficulty": "hard",
                    "question": "A number of students were absent in Practice Case 207",
                    "options": [
                            "A number of students",
                            "were absent",
                            "in Practice Case 207",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘A number of + plural noun’ takes plural verb."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-4-q20",
                    "topic": "SVA - Number",
                    "difficulty": "hard",
                    "question": "The number of vacancies are increasing in Practice Case 208",
                    "options": [
                            "The number",
                            "of vacancies",
                            "are increasing in Practice Case 208",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "‘The number of’ is singular and takes singular verb. Correct: ‘is increasing’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-4-q21",
                    "topic": "SVA - One Of",
                    "difficulty": "hard",
                    "question": "One of the officers have submitted a wrong document in Practice Case 209",
                    "options": [
                            "One of",
                            "the officers have",
                            "submitted a wrong document in Practice Case 209",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘One of + plural noun’ takes singular verb because the head subject is ‘one’. Correct: ‘has’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-4-q22",
                    "topic": "SVA - Subject Head",
                    "difficulty": "hard",
                    "question": "The quality of these answers are poor in Practice Case 210",
                    "options": [
                            "The quality",
                            "of these answers",
                            "are poor in Practice Case 210",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "The subject is singular ‘quality’. Correct verb: ‘is’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-4-q23",
                    "topic": "SVA - Neither/Nor",
                    "difficulty": "hard",
                    "question": "Neither the officer nor the clerks was present in Practice Case 211",
                    "options": [
                            "Neither the officer",
                            "nor the clerks",
                            "was present in Practice Case 211",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "With ‘neither...nor’, the verb agrees with the nearer subject. ‘Clerks’ is plural, so use ‘were’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-4-q24",
                    "topic": "SVA - No Error",
                    "difficulty": "hard",
                    "question": "Each of the students has received the admit card in Practice Case 212",
                    "options": [
                            "Each of",
                            "the students",
                            "has received the admit card in Practice Case 212",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Each of’ takes singular verb ‘has’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-4-q25",
                    "topic": "SVA - No Error",
                    "difficulty": "hard",
                    "question": "A number of students were absent in Practice Case 215",
                    "options": [
                            "A number of students",
                            "were absent",
                            "in Practice Case 215",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘A number of + plural noun’ takes plural verb."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-4-q26",
                    "topic": "SVA - Number",
                    "difficulty": "hard",
                    "question": "The number of vacancies are increasing in Practice Case 216",
                    "options": [
                            "The number",
                            "of vacancies",
                            "are increasing in Practice Case 216",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "‘The number of’ is singular and takes singular verb. Correct: ‘is increasing’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-4-q27",
                    "topic": "SVA - One Of",
                    "difficulty": "hard",
                    "question": "One of the students have submitted a wrong document in Practice Case 217",
                    "options": [
                            "One of",
                            "the students have",
                            "submitted a wrong document in Practice Case 217",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘One of + plural noun’ takes singular verb because the head subject is ‘one’. Correct: ‘has’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-4-q28",
                    "topic": "SVA - Subject Head",
                    "difficulty": "hard",
                    "question": "The quality of these answers are poor in Practice Case 218",
                    "options": [
                            "The quality",
                            "of these answers",
                            "are poor in Practice Case 218",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "The subject is singular ‘quality’. Correct verb: ‘is’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-4-q29",
                    "topic": "SVA - Neither/Nor",
                    "difficulty": "hard",
                    "question": "Neither the officer nor the clerks was present in Practice Case 219",
                    "options": [
                            "Neither the officer",
                            "nor the clerks",
                            "was present in Practice Case 219",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "With ‘neither...nor’, the verb agrees with the nearer subject. ‘Clerks’ is plural, so use ‘were’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-4-q30",
                    "topic": "SVA - No Error",
                    "difficulty": "hard",
                    "question": "Each of the students has received the admit card in Practice Case 220",
                    "options": [
                            "Each of",
                            "the students",
                            "has received the admit card in Practice Case 220",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Each of’ takes singular verb ‘has’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-4-q31",
                    "topic": "SVA - No Error",
                    "difficulty": "hard",
                    "question": "A number of students were absent in Practice Case 223",
                    "options": [
                            "A number of students",
                            "were absent",
                            "in Practice Case 223",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘A number of + plural noun’ takes plural verb."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-4-q32",
                    "topic": "SVA - Number",
                    "difficulty": "hard",
                    "question": "The number of vacancies are increasing in Practice Case 224",
                    "options": [
                            "The number",
                            "of vacancies",
                            "are increasing in Practice Case 224",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "‘The number of’ is singular and takes singular verb. Correct: ‘is increasing’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-4-q33",
                    "topic": "SVA - One Of",
                    "difficulty": "hard",
                    "question": "One of the documents have submitted a wrong document in Practice Case 225",
                    "options": [
                            "One of",
                            "the documents have",
                            "submitted a wrong document in Practice Case 225",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘One of + plural noun’ takes singular verb because the head subject is ‘one’. Correct: ‘has’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-4-q34",
                    "topic": "SVA - Subject Head",
                    "difficulty": "hard",
                    "question": "The quality of these answers are poor in Practice Case 226",
                    "options": [
                            "The quality",
                            "of these answers",
                            "are poor in Practice Case 226",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "The subject is singular ‘quality’. Correct verb: ‘is’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-4-q35",
                    "topic": "SVA - Neither/Nor",
                    "difficulty": "hard",
                    "question": "Neither the officer nor the clerks was present in Practice Case 227",
                    "options": [
                            "Neither the officer",
                            "nor the clerks",
                            "was present in Practice Case 227",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "With ‘neither...nor’, the verb agrees with the nearer subject. ‘Clerks’ is plural, so use ‘were’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-4-q36",
                    "topic": "SVA - No Error",
                    "difficulty": "hard",
                    "question": "Each of the students has received the admit card in Practice Case 228",
                    "options": [
                            "Each of",
                            "the students",
                            "has received the admit card in Practice Case 228",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Each of’ takes singular verb ‘has’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-4-q37",
                    "topic": "SVA - No Error",
                    "difficulty": "hard",
                    "question": "A number of students were absent in Practice Case 231",
                    "options": [
                            "A number of students",
                            "were absent",
                            "in Practice Case 231",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘A number of + plural noun’ takes plural verb."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-4-q38",
                    "topic": "SVA - Number",
                    "difficulty": "hard",
                    "question": "The number of vacancies are increasing in Practice Case 232",
                    "options": [
                            "The number",
                            "of vacancies",
                            "are increasing in Practice Case 232",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "‘The number of’ is singular and takes singular verb. Correct: ‘is increasing’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-4-q39",
                    "topic": "SVA - One Of",
                    "difficulty": "hard",
                    "question": "One of the officers have submitted a wrong document in Practice Case 233",
                    "options": [
                            "One of",
                            "the officers have",
                            "submitted a wrong document in Practice Case 233",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘One of + plural noun’ takes singular verb because the head subject is ‘one’. Correct: ‘has’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-4-q40",
                    "topic": "SVA - Subject Head",
                    "difficulty": "hard",
                    "question": "The quality of these answers are poor in Practice Case 234",
                    "options": [
                            "The quality",
                            "of these answers",
                            "are poor in Practice Case 234",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "The subject is singular ‘quality’. Correct verb: ‘is’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-4-q41",
                    "topic": "SVA - Neither/Nor",
                    "difficulty": "hard",
                    "question": "Neither the officer nor the clerks was present in Practice Case 235",
                    "options": [
                            "Neither the officer",
                            "nor the clerks",
                            "was present in Practice Case 235",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "With ‘neither...nor’, the verb agrees with the nearer subject. ‘Clerks’ is plural, so use ‘were’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-4-q42",
                    "topic": "SVA - No Error",
                    "difficulty": "hard",
                    "question": "Each of the students has received the admit card in Practice Case 236",
                    "options": [
                            "Each of",
                            "the students",
                            "has received the admit card in Practice Case 236",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Each of’ takes singular verb ‘has’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-4-q43",
                    "topic": "SVA - No Error",
                    "difficulty": "hard",
                    "question": "A number of students were absent in Practice Case 239",
                    "options": [
                            "A number of students",
                            "were absent",
                            "in Practice Case 239",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘A number of + plural noun’ takes plural verb."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-4-q44",
                    "topic": "SVA - Number",
                    "difficulty": "hard",
                    "question": "The number of vacancies are increasing in Practice Case 240",
                    "options": [
                            "The number",
                            "of vacancies",
                            "are increasing in Practice Case 240",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "‘The number of’ is singular and takes singular verb. Correct: ‘is increasing’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-4-q45",
                    "topic": "SVA - One Of",
                    "difficulty": "hard",
                    "question": "One of the students have submitted a wrong document in Practice Case 241",
                    "options": [
                            "One of",
                            "the students have",
                            "submitted a wrong document in Practice Case 241",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘One of + plural noun’ takes singular verb because the head subject is ‘one’. Correct: ‘has’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-4-q46",
                    "topic": "SVA - Subject Head",
                    "difficulty": "hard",
                    "question": "The quality of these answers are poor in Practice Case 242",
                    "options": [
                            "The quality",
                            "of these answers",
                            "are poor in Practice Case 242",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "The subject is singular ‘quality’. Correct verb: ‘is’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-4-q47",
                    "topic": "SVA - Neither/Nor",
                    "difficulty": "hard",
                    "question": "Neither the officer nor the clerks was present in Practice Case 243",
                    "options": [
                            "Neither the officer",
                            "nor the clerks",
                            "was present in Practice Case 243",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "With ‘neither...nor’, the verb agrees with the nearer subject. ‘Clerks’ is plural, so use ‘were’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-4-q48",
                    "topic": "SVA - No Error",
                    "difficulty": "hard",
                    "question": "Each of the students has received the admit card in Practice Case 244",
                    "options": [
                            "Each of",
                            "the students",
                            "has received the admit card in Practice Case 244",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Each of’ takes singular verb ‘has’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-4-q49",
                    "topic": "SVA - No Error",
                    "difficulty": "hard",
                    "question": "A number of students were absent in Practice Case 247",
                    "options": [
                            "A number of students",
                            "were absent",
                            "in Practice Case 247",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘A number of + plural noun’ takes plural verb."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-4-q50",
                    "topic": "SVA - Number",
                    "difficulty": "hard",
                    "question": "The number of vacancies are increasing in Practice Case 248",
                    "options": [
                            "The number",
                            "of vacancies",
                            "are increasing in Practice Case 248",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "‘The number of’ is singular and takes singular verb. Correct: ‘is increasing’."
            }
    ];

    window.GJU_QUIZ_BANK.push({
        id: quizId,
        subject: "English",
        title: "Detecting Errors - Subject Verb Agreement Set 4",
        description: "50 tough subject-verb agreement questions for government exam preparation.",
        durationMinutes: 30,
        totalQuestions: questions.length,
        marksPerQuestion: 1,
        negativeMarks: 0.25,
        difficulty: "Hard",
        tags: ["SSC", "Railway", "Police", "English", "Detecting Errors"],
        questions
    });
}());
