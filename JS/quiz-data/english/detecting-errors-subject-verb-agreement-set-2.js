(function () {
    "use strict";

    window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];

    const quizId = "detecting-errors-subject-verb-agreement-set-2";

    const questions = [
            {
                    "id": "detecting-errors-subject-verb-agreement-set-2-q01",
                    "topic": "SVA - No Error",
                    "difficulty": "hard",
                    "question": "Each of the students has received the admit card in Practice Case 52",
                    "options": [
                            "Each of",
                            "the students",
                            "has received the admit card in Practice Case 52",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Each of’ takes singular verb ‘has’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-2-q02",
                    "topic": "SVA - Police",
                    "difficulty": "hard",
                    "question": "The police has arrested the accused in Gurugram",
                    "options": [
                            "The police",
                            "has arrested",
                            "the accused in Gurugram",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Police’ is plural in standard English. Correct: ‘The police have arrested’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-2-q03",
                    "topic": "SVA - No Error",
                    "difficulty": "hard",
                    "question": "A number of students were absent in Practice Case 55",
                    "options": [
                            "A number of students",
                            "were absent",
                            "in Practice Case 55",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘A number of + plural noun’ takes plural verb."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-2-q04",
                    "topic": "SVA - Number",
                    "difficulty": "hard",
                    "question": "The number of vacancies are increasing in Practice Case 56",
                    "options": [
                            "The number",
                            "of vacancies",
                            "are increasing in Practice Case 56",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "‘The number of’ is singular and takes singular verb. Correct: ‘is increasing’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-2-q05",
                    "topic": "SVA - One Of",
                    "difficulty": "hard",
                    "question": "One of the documents have submitted a wrong document in Practice Case 57",
                    "options": [
                            "One of",
                            "the documents have",
                            "submitted a wrong document in Practice Case 57",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘One of + plural noun’ takes singular verb because the head subject is ‘one’. Correct: ‘has’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-2-q06",
                    "topic": "SVA - Subject Head",
                    "difficulty": "hard",
                    "question": "The quality of these answers are poor in Practice Case 58",
                    "options": [
                            "The quality",
                            "of these answers",
                            "are poor in Practice Case 58",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "The subject is singular ‘quality’. Correct verb: ‘is’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-2-q07",
                    "topic": "SVA - Neither/Nor",
                    "difficulty": "hard",
                    "question": "Neither the officer nor the clerks was present in Practice Case 59",
                    "options": [
                            "Neither the officer",
                            "nor the clerks",
                            "was present in Practice Case 59",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "With ‘neither...nor’, the verb agrees with the nearer subject. ‘Clerks’ is plural, so use ‘were’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-2-q08",
                    "topic": "SVA - No Error",
                    "difficulty": "hard",
                    "question": "Each of the students has received the admit card in Practice Case 60",
                    "options": [
                            "Each of",
                            "the students",
                            "has received the admit card in Practice Case 60",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Each of’ takes singular verb ‘has’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-2-q09",
                    "topic": "SVA - Police",
                    "difficulty": "hard",
                    "question": "The police has arrested the accused in Kanpur",
                    "options": [
                            "The police",
                            "has arrested",
                            "the accused in Kanpur",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Police’ is plural in standard English. Correct: ‘The police have arrested’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-2-q10",
                    "topic": "SVA - No Error",
                    "difficulty": "hard",
                    "question": "A number of students were absent in Practice Case 63",
                    "options": [
                            "A number of students",
                            "were absent",
                            "in Practice Case 63",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘A number of + plural noun’ takes plural verb."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-2-q11",
                    "topic": "SVA - Number",
                    "difficulty": "hard",
                    "question": "The number of vacancies are increasing in Practice Case 64",
                    "options": [
                            "The number",
                            "of vacancies",
                            "are increasing in Practice Case 64",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "‘The number of’ is singular and takes singular verb. Correct: ‘is increasing’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-2-q12",
                    "topic": "SVA - One Of",
                    "difficulty": "hard",
                    "question": "One of the officers have submitted a wrong document in Practice Case 65",
                    "options": [
                            "One of",
                            "the officers have",
                            "submitted a wrong document in Practice Case 65",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘One of + plural noun’ takes singular verb because the head subject is ‘one’. Correct: ‘has’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-2-q13",
                    "topic": "SVA - Subject Head",
                    "difficulty": "hard",
                    "question": "The quality of these answers are poor in Practice Case 66",
                    "options": [
                            "The quality",
                            "of these answers",
                            "are poor in Practice Case 66",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "The subject is singular ‘quality’. Correct verb: ‘is’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-2-q14",
                    "topic": "SVA - Neither/Nor",
                    "difficulty": "hard",
                    "question": "Neither the officer nor the clerks was present in Practice Case 67",
                    "options": [
                            "Neither the officer",
                            "nor the clerks",
                            "was present in Practice Case 67",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "With ‘neither...nor’, the verb agrees with the nearer subject. ‘Clerks’ is plural, so use ‘were’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-2-q15",
                    "topic": "SVA - No Error",
                    "difficulty": "hard",
                    "question": "Each of the students has received the admit card in Practice Case 68",
                    "options": [
                            "Each of",
                            "the students",
                            "has received the admit card in Practice Case 68",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Each of’ takes singular verb ‘has’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-2-q16",
                    "topic": "SVA - Police",
                    "difficulty": "hard",
                    "question": "The police has arrested the accused in Varanasi",
                    "options": [
                            "The police",
                            "has arrested",
                            "the accused in Varanasi",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Police’ is plural in standard English. Correct: ‘The police have arrested’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-2-q17",
                    "topic": "SVA - No Error",
                    "difficulty": "hard",
                    "question": "A number of students were absent in Practice Case 71",
                    "options": [
                            "A number of students",
                            "were absent",
                            "in Practice Case 71",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘A number of + plural noun’ takes plural verb."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-2-q18",
                    "topic": "SVA - Number",
                    "difficulty": "hard",
                    "question": "The number of vacancies are increasing in Practice Case 72",
                    "options": [
                            "The number",
                            "of vacancies",
                            "are increasing in Practice Case 72",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "‘The number of’ is singular and takes singular verb. Correct: ‘is increasing’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-2-q19",
                    "topic": "SVA - One Of",
                    "difficulty": "hard",
                    "question": "One of the students have submitted a wrong document in Practice Case 73",
                    "options": [
                            "One of",
                            "the students have",
                            "submitted a wrong document in Practice Case 73",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘One of + plural noun’ takes singular verb because the head subject is ‘one’. Correct: ‘has’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-2-q20",
                    "topic": "SVA - Subject Head",
                    "difficulty": "hard",
                    "question": "The quality of these answers are poor in Practice Case 74",
                    "options": [
                            "The quality",
                            "of these answers",
                            "are poor in Practice Case 74",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "The subject is singular ‘quality’. Correct verb: ‘is’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-2-q21",
                    "topic": "SVA - Neither/Nor",
                    "difficulty": "hard",
                    "question": "Neither the officer nor the clerks was present in Practice Case 75",
                    "options": [
                            "Neither the officer",
                            "nor the clerks",
                            "was present in Practice Case 75",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "With ‘neither...nor’, the verb agrees with the nearer subject. ‘Clerks’ is plural, so use ‘were’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-2-q22",
                    "topic": "SVA - No Error",
                    "difficulty": "hard",
                    "question": "Each of the students has received the admit card in Practice Case 76",
                    "options": [
                            "Each of",
                            "the students",
                            "has received the admit card in Practice Case 76",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Each of’ takes singular verb ‘has’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-2-q23",
                    "topic": "SVA - No Error",
                    "difficulty": "hard",
                    "question": "A number of students were absent in Practice Case 79",
                    "options": [
                            "A number of students",
                            "were absent",
                            "in Practice Case 79",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘A number of + plural noun’ takes plural verb."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-2-q24",
                    "topic": "SVA - Number",
                    "difficulty": "hard",
                    "question": "The number of vacancies are increasing in Practice Case 80",
                    "options": [
                            "The number",
                            "of vacancies",
                            "are increasing in Practice Case 80",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "‘The number of’ is singular and takes singular verb. Correct: ‘is increasing’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-2-q25",
                    "topic": "SVA - One Of",
                    "difficulty": "hard",
                    "question": "One of the documents have submitted a wrong document in Practice Case 81",
                    "options": [
                            "One of",
                            "the documents have",
                            "submitted a wrong document in Practice Case 81",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘One of + plural noun’ takes singular verb because the head subject is ‘one’. Correct: ‘has’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-2-q26",
                    "topic": "SVA - Subject Head",
                    "difficulty": "hard",
                    "question": "The quality of these answers are poor in Practice Case 82",
                    "options": [
                            "The quality",
                            "of these answers",
                            "are poor in Practice Case 82",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "The subject is singular ‘quality’. Correct verb: ‘is’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-2-q27",
                    "topic": "SVA - Neither/Nor",
                    "difficulty": "hard",
                    "question": "Neither the officer nor the clerks was present in Practice Case 83",
                    "options": [
                            "Neither the officer",
                            "nor the clerks",
                            "was present in Practice Case 83",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "With ‘neither...nor’, the verb agrees with the nearer subject. ‘Clerks’ is plural, so use ‘were’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-2-q28",
                    "topic": "SVA - No Error",
                    "difficulty": "hard",
                    "question": "Each of the students has received the admit card in Practice Case 84",
                    "options": [
                            "Each of",
                            "the students",
                            "has received the admit card in Practice Case 84",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Each of’ takes singular verb ‘has’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-2-q29",
                    "topic": "SVA - No Error",
                    "difficulty": "hard",
                    "question": "A number of students were absent in Practice Case 87",
                    "options": [
                            "A number of students",
                            "were absent",
                            "in Practice Case 87",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘A number of + plural noun’ takes plural verb."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-2-q30",
                    "topic": "SVA - Number",
                    "difficulty": "hard",
                    "question": "The number of vacancies are increasing in Practice Case 88",
                    "options": [
                            "The number",
                            "of vacancies",
                            "are increasing in Practice Case 88",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "‘The number of’ is singular and takes singular verb. Correct: ‘is increasing’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-2-q31",
                    "topic": "SVA - One Of",
                    "difficulty": "hard",
                    "question": "One of the officers have submitted a wrong document in Practice Case 89",
                    "options": [
                            "One of",
                            "the officers have",
                            "submitted a wrong document in Practice Case 89",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘One of + plural noun’ takes singular verb because the head subject is ‘one’. Correct: ‘has’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-2-q32",
                    "topic": "SVA - Subject Head",
                    "difficulty": "hard",
                    "question": "The quality of these answers are poor in Practice Case 90",
                    "options": [
                            "The quality",
                            "of these answers",
                            "are poor in Practice Case 90",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "The subject is singular ‘quality’. Correct verb: ‘is’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-2-q33",
                    "topic": "SVA - Neither/Nor",
                    "difficulty": "hard",
                    "question": "Neither the officer nor the clerks was present in Practice Case 91",
                    "options": [
                            "Neither the officer",
                            "nor the clerks",
                            "was present in Practice Case 91",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "With ‘neither...nor’, the verb agrees with the nearer subject. ‘Clerks’ is plural, so use ‘were’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-2-q34",
                    "topic": "SVA - No Error",
                    "difficulty": "hard",
                    "question": "Each of the students has received the admit card in Practice Case 92",
                    "options": [
                            "Each of",
                            "the students",
                            "has received the admit card in Practice Case 92",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Each of’ takes singular verb ‘has’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-2-q35",
                    "topic": "SVA - No Error",
                    "difficulty": "hard",
                    "question": "A number of students were absent in Practice Case 95",
                    "options": [
                            "A number of students",
                            "were absent",
                            "in Practice Case 95",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘A number of + plural noun’ takes plural verb."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-2-q36",
                    "topic": "SVA - Number",
                    "difficulty": "hard",
                    "question": "The number of vacancies are increasing in Practice Case 96",
                    "options": [
                            "The number",
                            "of vacancies",
                            "are increasing in Practice Case 96",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "‘The number of’ is singular and takes singular verb. Correct: ‘is increasing’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-2-q37",
                    "topic": "SVA - One Of",
                    "difficulty": "hard",
                    "question": "One of the students have submitted a wrong document in Practice Case 97",
                    "options": [
                            "One of",
                            "the students have",
                            "submitted a wrong document in Practice Case 97",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘One of + plural noun’ takes singular verb because the head subject is ‘one’. Correct: ‘has’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-2-q38",
                    "topic": "SVA - Subject Head",
                    "difficulty": "hard",
                    "question": "The quality of these answers are poor in Practice Case 98",
                    "options": [
                            "The quality",
                            "of these answers",
                            "are poor in Practice Case 98",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "The subject is singular ‘quality’. Correct verb: ‘is’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-2-q39",
                    "topic": "SVA - Neither/Nor",
                    "difficulty": "hard",
                    "question": "Neither the officer nor the clerks was present in Practice Case 99",
                    "options": [
                            "Neither the officer",
                            "nor the clerks",
                            "was present in Practice Case 99",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "With ‘neither...nor’, the verb agrees with the nearer subject. ‘Clerks’ is plural, so use ‘were’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-2-q40",
                    "topic": "SVA - No Error",
                    "difficulty": "hard",
                    "question": "Each of the students has received the admit card in Practice Case 100",
                    "options": [
                            "Each of",
                            "the students",
                            "has received the admit card in Practice Case 100",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Each of’ takes singular verb ‘has’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-2-q41",
                    "topic": "SVA - No Error",
                    "difficulty": "hard",
                    "question": "A number of students were absent in Practice Case 103",
                    "options": [
                            "A number of students",
                            "were absent",
                            "in Practice Case 103",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘A number of + plural noun’ takes plural verb."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-2-q42",
                    "topic": "SVA - Number",
                    "difficulty": "hard",
                    "question": "The number of vacancies are increasing in Practice Case 104",
                    "options": [
                            "The number",
                            "of vacancies",
                            "are increasing in Practice Case 104",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "‘The number of’ is singular and takes singular verb. Correct: ‘is increasing’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-2-q43",
                    "topic": "SVA - One Of",
                    "difficulty": "hard",
                    "question": "One of the documents have submitted a wrong document in Practice Case 105",
                    "options": [
                            "One of",
                            "the documents have",
                            "submitted a wrong document in Practice Case 105",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘One of + plural noun’ takes singular verb because the head subject is ‘one’. Correct: ‘has’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-2-q44",
                    "topic": "SVA - Subject Head",
                    "difficulty": "hard",
                    "question": "The quality of these answers are poor in Practice Case 106",
                    "options": [
                            "The quality",
                            "of these answers",
                            "are poor in Practice Case 106",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "The subject is singular ‘quality’. Correct verb: ‘is’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-2-q45",
                    "topic": "SVA - Neither/Nor",
                    "difficulty": "hard",
                    "question": "Neither the officer nor the clerks was present in Practice Case 107",
                    "options": [
                            "Neither the officer",
                            "nor the clerks",
                            "was present in Practice Case 107",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "With ‘neither...nor’, the verb agrees with the nearer subject. ‘Clerks’ is plural, so use ‘were’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-2-q46",
                    "topic": "SVA - No Error",
                    "difficulty": "hard",
                    "question": "Each of the students has received the admit card in Practice Case 108",
                    "options": [
                            "Each of",
                            "the students",
                            "has received the admit card in Practice Case 108",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Each of’ takes singular verb ‘has’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-2-q47",
                    "topic": "SVA - No Error",
                    "difficulty": "hard",
                    "question": "A number of students were absent in Practice Case 111",
                    "options": [
                            "A number of students",
                            "were absent",
                            "in Practice Case 111",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘A number of + plural noun’ takes plural verb."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-2-q48",
                    "topic": "SVA - Number",
                    "difficulty": "hard",
                    "question": "The number of vacancies are increasing in Practice Case 112",
                    "options": [
                            "The number",
                            "of vacancies",
                            "are increasing in Practice Case 112",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "‘The number of’ is singular and takes singular verb. Correct: ‘is increasing’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-2-q49",
                    "topic": "SVA - One Of",
                    "difficulty": "hard",
                    "question": "One of the officers have submitted a wrong document in Practice Case 113",
                    "options": [
                            "One of",
                            "the officers have",
                            "submitted a wrong document in Practice Case 113",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘One of + plural noun’ takes singular verb because the head subject is ‘one’. Correct: ‘has’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-2-q50",
                    "topic": "SVA - Subject Head",
                    "difficulty": "hard",
                    "question": "The quality of these answers are poor in Practice Case 114",
                    "options": [
                            "The quality",
                            "of these answers",
                            "are poor in Practice Case 114",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "The subject is singular ‘quality’. Correct verb: ‘is’."
            }
    ];

    window.GJU_QUIZ_BANK.push({
        id: quizId,
        subject: "English",
        title: "Detecting Errors - Subject Verb Agreement Set 2",
        description: "50 advanced subject-verb agreement detecting error questions.",
        durationMinutes: 30,
        totalQuestions: questions.length,
        marksPerQuestion: 1,
        negativeMarks: 0.25,
        difficulty: "Hard",
        tags: ["SSC", "Railway", "Police", "English", "Detecting Errors"],
        questions
    });
}());
