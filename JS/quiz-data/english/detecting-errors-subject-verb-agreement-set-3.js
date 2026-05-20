(function () {
    "use strict";

    window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];

    const quizId = "detecting-errors-subject-verb-agreement-set-3";

    const questions = [
            {
                    "id": "detecting-errors-subject-verb-agreement-set-3-q01",
                    "topic": "SVA - Neither/Nor",
                    "difficulty": "hard",
                    "question": "Neither the officer nor the clerks was present in Practice Case 115",
                    "options": [
                            "Neither the officer",
                            "nor the clerks",
                            "was present in Practice Case 115",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "With ‘neither...nor’, the verb agrees with the nearer subject. ‘Clerks’ is plural, so use ‘were’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-3-q02",
                    "topic": "SVA - No Error",
                    "difficulty": "hard",
                    "question": "Each of the students has received the admit card in Practice Case 116",
                    "options": [
                            "Each of",
                            "the students",
                            "has received the admit card in Practice Case 116",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Each of’ takes singular verb ‘has’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-3-q03",
                    "topic": "SVA - No Error",
                    "difficulty": "hard",
                    "question": "A number of students were absent in Practice Case 119",
                    "options": [
                            "A number of students",
                            "were absent",
                            "in Practice Case 119",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘A number of + plural noun’ takes plural verb."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-3-q04",
                    "topic": "SVA - Number",
                    "difficulty": "hard",
                    "question": "The number of vacancies are increasing in Practice Case 120",
                    "options": [
                            "The number",
                            "of vacancies",
                            "are increasing in Practice Case 120",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "‘The number of’ is singular and takes singular verb. Correct: ‘is increasing’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-3-q05",
                    "topic": "SVA - One Of",
                    "difficulty": "hard",
                    "question": "One of the students have submitted a wrong document in Practice Case 121",
                    "options": [
                            "One of",
                            "the students have",
                            "submitted a wrong document in Practice Case 121",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘One of + plural noun’ takes singular verb because the head subject is ‘one’. Correct: ‘has’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-3-q06",
                    "topic": "SVA - Subject Head",
                    "difficulty": "hard",
                    "question": "The quality of these answers are poor in Practice Case 122",
                    "options": [
                            "The quality",
                            "of these answers",
                            "are poor in Practice Case 122",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "The subject is singular ‘quality’. Correct verb: ‘is’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-3-q07",
                    "topic": "SVA - Neither/Nor",
                    "difficulty": "hard",
                    "question": "Neither the officer nor the clerks was present in Practice Case 123",
                    "options": [
                            "Neither the officer",
                            "nor the clerks",
                            "was present in Practice Case 123",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "With ‘neither...nor’, the verb agrees with the nearer subject. ‘Clerks’ is plural, so use ‘were’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-3-q08",
                    "topic": "SVA - No Error",
                    "difficulty": "hard",
                    "question": "Each of the students has received the admit card in Practice Case 124",
                    "options": [
                            "Each of",
                            "the students",
                            "has received the admit card in Practice Case 124",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Each of’ takes singular verb ‘has’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-3-q09",
                    "topic": "SVA - No Error",
                    "difficulty": "hard",
                    "question": "A number of students were absent in Practice Case 127",
                    "options": [
                            "A number of students",
                            "were absent",
                            "in Practice Case 127",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘A number of + plural noun’ takes plural verb."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-3-q10",
                    "topic": "SVA - Number",
                    "difficulty": "hard",
                    "question": "The number of vacancies are increasing in Practice Case 128",
                    "options": [
                            "The number",
                            "of vacancies",
                            "are increasing in Practice Case 128",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "‘The number of’ is singular and takes singular verb. Correct: ‘is increasing’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-3-q11",
                    "topic": "SVA - One Of",
                    "difficulty": "hard",
                    "question": "One of the documents have submitted a wrong document in Practice Case 129",
                    "options": [
                            "One of",
                            "the documents have",
                            "submitted a wrong document in Practice Case 129",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘One of + plural noun’ takes singular verb because the head subject is ‘one’. Correct: ‘has’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-3-q12",
                    "topic": "SVA - Subject Head",
                    "difficulty": "hard",
                    "question": "The quality of these answers are poor in Practice Case 130",
                    "options": [
                            "The quality",
                            "of these answers",
                            "are poor in Practice Case 130",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "The subject is singular ‘quality’. Correct verb: ‘is’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-3-q13",
                    "topic": "SVA - Neither/Nor",
                    "difficulty": "hard",
                    "question": "Neither the officer nor the clerks was present in Practice Case 131",
                    "options": [
                            "Neither the officer",
                            "nor the clerks",
                            "was present in Practice Case 131",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "With ‘neither...nor’, the verb agrees with the nearer subject. ‘Clerks’ is plural, so use ‘were’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-3-q14",
                    "topic": "SVA - No Error",
                    "difficulty": "hard",
                    "question": "Each of the students has received the admit card in Practice Case 132",
                    "options": [
                            "Each of",
                            "the students",
                            "has received the admit card in Practice Case 132",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Each of’ takes singular verb ‘has’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-3-q15",
                    "topic": "SVA - No Error",
                    "difficulty": "hard",
                    "question": "A number of students were absent in Practice Case 135",
                    "options": [
                            "A number of students",
                            "were absent",
                            "in Practice Case 135",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘A number of + plural noun’ takes plural verb."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-3-q16",
                    "topic": "SVA - Number",
                    "difficulty": "hard",
                    "question": "The number of vacancies are increasing in Practice Case 136",
                    "options": [
                            "The number",
                            "of vacancies",
                            "are increasing in Practice Case 136",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "‘The number of’ is singular and takes singular verb. Correct: ‘is increasing’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-3-q17",
                    "topic": "SVA - One Of",
                    "difficulty": "hard",
                    "question": "One of the officers have submitted a wrong document in Practice Case 137",
                    "options": [
                            "One of",
                            "the officers have",
                            "submitted a wrong document in Practice Case 137",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘One of + plural noun’ takes singular verb because the head subject is ‘one’. Correct: ‘has’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-3-q18",
                    "topic": "SVA - Subject Head",
                    "difficulty": "hard",
                    "question": "The quality of these answers are poor in Practice Case 138",
                    "options": [
                            "The quality",
                            "of these answers",
                            "are poor in Practice Case 138",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "The subject is singular ‘quality’. Correct verb: ‘is’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-3-q19",
                    "topic": "SVA - Neither/Nor",
                    "difficulty": "hard",
                    "question": "Neither the officer nor the clerks was present in Practice Case 139",
                    "options": [
                            "Neither the officer",
                            "nor the clerks",
                            "was present in Practice Case 139",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "With ‘neither...nor’, the verb agrees with the nearer subject. ‘Clerks’ is plural, so use ‘were’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-3-q20",
                    "topic": "SVA - No Error",
                    "difficulty": "hard",
                    "question": "Each of the students has received the admit card in Practice Case 140",
                    "options": [
                            "Each of",
                            "the students",
                            "has received the admit card in Practice Case 140",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Each of’ takes singular verb ‘has’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-3-q21",
                    "topic": "SVA - No Error",
                    "difficulty": "hard",
                    "question": "A number of students were absent in Practice Case 143",
                    "options": [
                            "A number of students",
                            "were absent",
                            "in Practice Case 143",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘A number of + plural noun’ takes plural verb."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-3-q22",
                    "topic": "SVA - Number",
                    "difficulty": "hard",
                    "question": "The number of vacancies are increasing in Practice Case 144",
                    "options": [
                            "The number",
                            "of vacancies",
                            "are increasing in Practice Case 144",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "‘The number of’ is singular and takes singular verb. Correct: ‘is increasing’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-3-q23",
                    "topic": "SVA - One Of",
                    "difficulty": "hard",
                    "question": "One of the students have submitted a wrong document in Practice Case 145",
                    "options": [
                            "One of",
                            "the students have",
                            "submitted a wrong document in Practice Case 145",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘One of + plural noun’ takes singular verb because the head subject is ‘one’. Correct: ‘has’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-3-q24",
                    "topic": "SVA - Subject Head",
                    "difficulty": "hard",
                    "question": "The quality of these answers are poor in Practice Case 146",
                    "options": [
                            "The quality",
                            "of these answers",
                            "are poor in Practice Case 146",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "The subject is singular ‘quality’. Correct verb: ‘is’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-3-q25",
                    "topic": "SVA - Neither/Nor",
                    "difficulty": "hard",
                    "question": "Neither the officer nor the clerks was present in Practice Case 147",
                    "options": [
                            "Neither the officer",
                            "nor the clerks",
                            "was present in Practice Case 147",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "With ‘neither...nor’, the verb agrees with the nearer subject. ‘Clerks’ is plural, so use ‘were’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-3-q26",
                    "topic": "SVA - No Error",
                    "difficulty": "hard",
                    "question": "Each of the students has received the admit card in Practice Case 148",
                    "options": [
                            "Each of",
                            "the students",
                            "has received the admit card in Practice Case 148",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Each of’ takes singular verb ‘has’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-3-q27",
                    "topic": "SVA - No Error",
                    "difficulty": "hard",
                    "question": "A number of students were absent in Practice Case 151",
                    "options": [
                            "A number of students",
                            "were absent",
                            "in Practice Case 151",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘A number of + plural noun’ takes plural verb."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-3-q28",
                    "topic": "SVA - Number",
                    "difficulty": "hard",
                    "question": "The number of vacancies are increasing in Practice Case 152",
                    "options": [
                            "The number",
                            "of vacancies",
                            "are increasing in Practice Case 152",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "‘The number of’ is singular and takes singular verb. Correct: ‘is increasing’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-3-q29",
                    "topic": "SVA - One Of",
                    "difficulty": "hard",
                    "question": "One of the documents have submitted a wrong document in Practice Case 153",
                    "options": [
                            "One of",
                            "the documents have",
                            "submitted a wrong document in Practice Case 153",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘One of + plural noun’ takes singular verb because the head subject is ‘one’. Correct: ‘has’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-3-q30",
                    "topic": "SVA - Subject Head",
                    "difficulty": "hard",
                    "question": "The quality of these answers are poor in Practice Case 154",
                    "options": [
                            "The quality",
                            "of these answers",
                            "are poor in Practice Case 154",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "The subject is singular ‘quality’. Correct verb: ‘is’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-3-q31",
                    "topic": "SVA - Neither/Nor",
                    "difficulty": "hard",
                    "question": "Neither the officer nor the clerks was present in Practice Case 155",
                    "options": [
                            "Neither the officer",
                            "nor the clerks",
                            "was present in Practice Case 155",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "With ‘neither...nor’, the verb agrees with the nearer subject. ‘Clerks’ is plural, so use ‘were’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-3-q32",
                    "topic": "SVA - No Error",
                    "difficulty": "hard",
                    "question": "Each of the students has received the admit card in Practice Case 156",
                    "options": [
                            "Each of",
                            "the students",
                            "has received the admit card in Practice Case 156",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Each of’ takes singular verb ‘has’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-3-q33",
                    "topic": "SVA - No Error",
                    "difficulty": "hard",
                    "question": "A number of students were absent in Practice Case 159",
                    "options": [
                            "A number of students",
                            "were absent",
                            "in Practice Case 159",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘A number of + plural noun’ takes plural verb."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-3-q34",
                    "topic": "SVA - Number",
                    "difficulty": "hard",
                    "question": "The number of vacancies are increasing in Practice Case 160",
                    "options": [
                            "The number",
                            "of vacancies",
                            "are increasing in Practice Case 160",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "‘The number of’ is singular and takes singular verb. Correct: ‘is increasing’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-3-q35",
                    "topic": "SVA - One Of",
                    "difficulty": "hard",
                    "question": "One of the officers have submitted a wrong document in Practice Case 161",
                    "options": [
                            "One of",
                            "the officers have",
                            "submitted a wrong document in Practice Case 161",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘One of + plural noun’ takes singular verb because the head subject is ‘one’. Correct: ‘has’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-3-q36",
                    "topic": "SVA - Subject Head",
                    "difficulty": "hard",
                    "question": "The quality of these answers are poor in Practice Case 162",
                    "options": [
                            "The quality",
                            "of these answers",
                            "are poor in Practice Case 162",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "The subject is singular ‘quality’. Correct verb: ‘is’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-3-q37",
                    "topic": "SVA - Neither/Nor",
                    "difficulty": "hard",
                    "question": "Neither the officer nor the clerks was present in Practice Case 163",
                    "options": [
                            "Neither the officer",
                            "nor the clerks",
                            "was present in Practice Case 163",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "With ‘neither...nor’, the verb agrees with the nearer subject. ‘Clerks’ is plural, so use ‘were’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-3-q38",
                    "topic": "SVA - No Error",
                    "difficulty": "hard",
                    "question": "Each of the students has received the admit card in Practice Case 164",
                    "options": [
                            "Each of",
                            "the students",
                            "has received the admit card in Practice Case 164",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Each of’ takes singular verb ‘has’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-3-q39",
                    "topic": "SVA - No Error",
                    "difficulty": "hard",
                    "question": "A number of students were absent in Practice Case 167",
                    "options": [
                            "A number of students",
                            "were absent",
                            "in Practice Case 167",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘A number of + plural noun’ takes plural verb."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-3-q40",
                    "topic": "SVA - Number",
                    "difficulty": "hard",
                    "question": "The number of vacancies are increasing in Practice Case 168",
                    "options": [
                            "The number",
                            "of vacancies",
                            "are increasing in Practice Case 168",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "‘The number of’ is singular and takes singular verb. Correct: ‘is increasing’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-3-q41",
                    "topic": "SVA - One Of",
                    "difficulty": "hard",
                    "question": "One of the students have submitted a wrong document in Practice Case 169",
                    "options": [
                            "One of",
                            "the students have",
                            "submitted a wrong document in Practice Case 169",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘One of + plural noun’ takes singular verb because the head subject is ‘one’. Correct: ‘has’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-3-q42",
                    "topic": "SVA - Subject Head",
                    "difficulty": "hard",
                    "question": "The quality of these answers are poor in Practice Case 170",
                    "options": [
                            "The quality",
                            "of these answers",
                            "are poor in Practice Case 170",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "The subject is singular ‘quality’. Correct verb: ‘is’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-3-q43",
                    "topic": "SVA - Neither/Nor",
                    "difficulty": "hard",
                    "question": "Neither the officer nor the clerks was present in Practice Case 171",
                    "options": [
                            "Neither the officer",
                            "nor the clerks",
                            "was present in Practice Case 171",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "With ‘neither...nor’, the verb agrees with the nearer subject. ‘Clerks’ is plural, so use ‘were’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-3-q44",
                    "topic": "SVA - No Error",
                    "difficulty": "hard",
                    "question": "Each of the students has received the admit card in Practice Case 172",
                    "options": [
                            "Each of",
                            "the students",
                            "has received the admit card in Practice Case 172",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Each of’ takes singular verb ‘has’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-3-q45",
                    "topic": "SVA - No Error",
                    "difficulty": "hard",
                    "question": "A number of students were absent in Practice Case 175",
                    "options": [
                            "A number of students",
                            "were absent",
                            "in Practice Case 175",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘A number of + plural noun’ takes plural verb."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-3-q46",
                    "topic": "SVA - Number",
                    "difficulty": "hard",
                    "question": "The number of vacancies are increasing in Practice Case 176",
                    "options": [
                            "The number",
                            "of vacancies",
                            "are increasing in Practice Case 176",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "‘The number of’ is singular and takes singular verb. Correct: ‘is increasing’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-3-q47",
                    "topic": "SVA - One Of",
                    "difficulty": "hard",
                    "question": "One of the documents have submitted a wrong document in Practice Case 177",
                    "options": [
                            "One of",
                            "the documents have",
                            "submitted a wrong document in Practice Case 177",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘One of + plural noun’ takes singular verb because the head subject is ‘one’. Correct: ‘has’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-3-q48",
                    "topic": "SVA - Subject Head",
                    "difficulty": "hard",
                    "question": "The quality of these answers are poor in Practice Case 178",
                    "options": [
                            "The quality",
                            "of these answers",
                            "are poor in Practice Case 178",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "The subject is singular ‘quality’. Correct verb: ‘is’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-3-q49",
                    "topic": "SVA - Neither/Nor",
                    "difficulty": "hard",
                    "question": "Neither the officer nor the clerks was present in Practice Case 179",
                    "options": [
                            "Neither the officer",
                            "nor the clerks",
                            "was present in Practice Case 179",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "With ‘neither...nor’, the verb agrees with the nearer subject. ‘Clerks’ is plural, so use ‘were’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-3-q50",
                    "topic": "SVA - No Error",
                    "difficulty": "hard",
                    "question": "Each of the students has received the admit card in Practice Case 180",
                    "options": [
                            "Each of",
                            "the students",
                            "has received the admit card in Practice Case 180",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Each of’ takes singular verb ‘has’."
            }
    ];

    window.GJU_QUIZ_BANK.push({
        id: quizId,
        subject: "English",
        title: "Detecting Errors - Subject Verb Agreement Set 3",
        description: "50 SSC-style SVA detecting error questions with explanations.",
        durationMinutes: 30,
        totalQuestions: questions.length,
        marksPerQuestion: 1,
        negativeMarks: 0.25,
        difficulty: "Hard",
        tags: ["SSC", "Railway", "Police", "English", "Detecting Errors"],
        questions
    });
}());
