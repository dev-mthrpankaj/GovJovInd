(function () {
    "use strict";

    window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];

    const quizId = "detecting-errors-subject-verb-agreement-set-1";

    const questions = [
            {
                    "id": "detecting-errors-subject-verb-agreement-set-1-q01",
                    "topic": "SVA - One Of",
                    "difficulty": "hard",
                    "question": "One of the students have submitted a wrong document in Practice Case 1",
                    "options": [
                            "One of",
                            "the students have",
                            "submitted a wrong document in Practice Case 1",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘One of + plural noun’ takes singular verb because the head subject is ‘one’. Correct: ‘has’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-1-q02",
                    "topic": "SVA - Subject Head",
                    "difficulty": "hard",
                    "question": "The quality of these answers are poor in Practice Case 2",
                    "options": [
                            "The quality",
                            "of these answers",
                            "are poor in Practice Case 2",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "The subject is singular ‘quality’. Correct verb: ‘is’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-1-q03",
                    "topic": "SVA - Neither/Nor",
                    "difficulty": "hard",
                    "question": "Neither the officer nor the clerks was present in Practice Case 3",
                    "options": [
                            "Neither the officer",
                            "nor the clerks",
                            "was present in Practice Case 3",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "With ‘neither...nor’, the verb agrees with the nearer subject. ‘Clerks’ is plural, so use ‘were’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-1-q04",
                    "topic": "SVA - No Error",
                    "difficulty": "hard",
                    "question": "Each of the students has received the admit card in Practice Case 4",
                    "options": [
                            "Each of",
                            "the students",
                            "has received the admit card in Practice Case 4",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Each of’ takes singular verb ‘has’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-1-q05",
                    "topic": "SVA - Police",
                    "difficulty": "hard",
                    "question": "The police has arrested the accused in Jaipur",
                    "options": [
                            "The police",
                            "has arrested",
                            "the accused in Jaipur",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Police’ is plural in standard English. Correct: ‘The police have arrested’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-1-q06",
                    "topic": "SVA - Subject Names",
                    "difficulty": "hard",
                    "question": "Mathematics are my favourite subject for Bank Clerk",
                    "options": [
                            "Mathematics",
                            "are my",
                            "favourite subject for Bank Clerk",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Names of subjects ending in -s are usually singular. Correct: ‘Mathematics is’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-1-q07",
                    "topic": "SVA - No Error",
                    "difficulty": "hard",
                    "question": "A number of students were absent in Practice Case 7",
                    "options": [
                            "A number of students",
                            "were absent",
                            "in Practice Case 7",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘A number of + plural noun’ takes plural verb."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-1-q08",
                    "topic": "SVA - Number",
                    "difficulty": "hard",
                    "question": "The number of vacancies are increasing in Practice Case 8",
                    "options": [
                            "The number",
                            "of vacancies",
                            "are increasing in Practice Case 8",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "‘The number of’ is singular and takes singular verb. Correct: ‘is increasing’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-1-q09",
                    "topic": "SVA - One Of",
                    "difficulty": "hard",
                    "question": "One of the documents have submitted a wrong document in Practice Case 9",
                    "options": [
                            "One of",
                            "the documents have",
                            "submitted a wrong document in Practice Case 9",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘One of + plural noun’ takes singular verb because the head subject is ‘one’. Correct: ‘has’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-1-q10",
                    "topic": "SVA - Subject Head",
                    "difficulty": "hard",
                    "question": "The quality of these answers are poor in Practice Case 10",
                    "options": [
                            "The quality",
                            "of these answers",
                            "are poor in Practice Case 10",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "The subject is singular ‘quality’. Correct verb: ‘is’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-1-q11",
                    "topic": "SVA - Neither/Nor",
                    "difficulty": "hard",
                    "question": "Neither the officer nor the clerks was present in Practice Case 11",
                    "options": [
                            "Neither the officer",
                            "nor the clerks",
                            "was present in Practice Case 11",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "With ‘neither...nor’, the verb agrees with the nearer subject. ‘Clerks’ is plural, so use ‘were’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-1-q12",
                    "topic": "SVA - No Error",
                    "difficulty": "hard",
                    "question": "Each of the students has received the admit card in Practice Case 12",
                    "options": [
                            "Each of",
                            "the students",
                            "has received the admit card in Practice Case 12",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Each of’ takes singular verb ‘has’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-1-q13",
                    "topic": "SVA - Police",
                    "difficulty": "hard",
                    "question": "The police has arrested the accused in Gwalior",
                    "options": [
                            "The police",
                            "has arrested",
                            "the accused in Gwalior",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Police’ is plural in standard English. Correct: ‘The police have arrested’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-1-q14",
                    "topic": "SVA - Subject Names",
                    "difficulty": "hard",
                    "question": "Mathematics are my favourite subject for UP Police",
                    "options": [
                            "Mathematics",
                            "are my",
                            "favourite subject for UP Police",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Names of subjects ending in -s are usually singular. Correct: ‘Mathematics is’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-1-q15",
                    "topic": "SVA - No Error",
                    "difficulty": "hard",
                    "question": "A number of students were absent in Practice Case 15",
                    "options": [
                            "A number of students",
                            "were absent",
                            "in Practice Case 15",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘A number of + plural noun’ takes plural verb."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-1-q16",
                    "topic": "SVA - Number",
                    "difficulty": "hard",
                    "question": "The number of vacancies are increasing in Practice Case 16",
                    "options": [
                            "The number",
                            "of vacancies",
                            "are increasing in Practice Case 16",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "‘The number of’ is singular and takes singular verb. Correct: ‘is increasing’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-1-q17",
                    "topic": "SVA - One Of",
                    "difficulty": "hard",
                    "question": "One of the officers have submitted a wrong document in Practice Case 17",
                    "options": [
                            "One of",
                            "the officers have",
                            "submitted a wrong document in Practice Case 17",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘One of + plural noun’ takes singular verb because the head subject is ‘one’. Correct: ‘has’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-1-q18",
                    "topic": "SVA - Subject Head",
                    "difficulty": "hard",
                    "question": "The quality of these answers are poor in Practice Case 18",
                    "options": [
                            "The quality",
                            "of these answers",
                            "are poor in Practice Case 18",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "The subject is singular ‘quality’. Correct verb: ‘is’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-1-q19",
                    "topic": "SVA - Neither/Nor",
                    "difficulty": "hard",
                    "question": "Neither the officer nor the clerks was present in Practice Case 19",
                    "options": [
                            "Neither the officer",
                            "nor the clerks",
                            "was present in Practice Case 19",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "With ‘neither...nor’, the verb agrees with the nearer subject. ‘Clerks’ is plural, so use ‘were’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-1-q20",
                    "topic": "SVA - No Error",
                    "difficulty": "hard",
                    "question": "Each of the students has received the admit card in Practice Case 20",
                    "options": [
                            "Each of",
                            "the students",
                            "has received the admit card in Practice Case 20",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Each of’ takes singular verb ‘has’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-1-q21",
                    "topic": "SVA - Police",
                    "difficulty": "hard",
                    "question": "The police has arrested the accused in Patna",
                    "options": [
                            "The police",
                            "has arrested",
                            "the accused in Patna",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Police’ is plural in standard English. Correct: ‘The police have arrested’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-1-q22",
                    "topic": "SVA - Subject Names",
                    "difficulty": "hard",
                    "question": "Mathematics are my favourite subject for SSC CPO",
                    "options": [
                            "Mathematics",
                            "are my",
                            "favourite subject for SSC CPO",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Names of subjects ending in -s are usually singular. Correct: ‘Mathematics is’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-1-q23",
                    "topic": "SVA - No Error",
                    "difficulty": "hard",
                    "question": "A number of students were absent in Practice Case 23",
                    "options": [
                            "A number of students",
                            "were absent",
                            "in Practice Case 23",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘A number of + plural noun’ takes plural verb."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-1-q24",
                    "topic": "SVA - Number",
                    "difficulty": "hard",
                    "question": "The number of vacancies are increasing in Practice Case 24",
                    "options": [
                            "The number",
                            "of vacancies",
                            "are increasing in Practice Case 24",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "‘The number of’ is singular and takes singular verb. Correct: ‘is increasing’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-1-q25",
                    "topic": "SVA - One Of",
                    "difficulty": "hard",
                    "question": "One of the students have submitted a wrong document in Practice Case 25",
                    "options": [
                            "One of",
                            "the students have",
                            "submitted a wrong document in Practice Case 25",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘One of + plural noun’ takes singular verb because the head subject is ‘one’. Correct: ‘has’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-1-q26",
                    "topic": "SVA - Subject Head",
                    "difficulty": "hard",
                    "question": "The quality of these answers are poor in Practice Case 26",
                    "options": [
                            "The quality",
                            "of these answers",
                            "are poor in Practice Case 26",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "The subject is singular ‘quality’. Correct verb: ‘is’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-1-q27",
                    "topic": "SVA - Neither/Nor",
                    "difficulty": "hard",
                    "question": "Neither the officer nor the clerks was present in Practice Case 27",
                    "options": [
                            "Neither the officer",
                            "nor the clerks",
                            "was present in Practice Case 27",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "With ‘neither...nor’, the verb agrees with the nearer subject. ‘Clerks’ is plural, so use ‘were’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-1-q28",
                    "topic": "SVA - No Error",
                    "difficulty": "hard",
                    "question": "Each of the students has received the admit card in Practice Case 28",
                    "options": [
                            "Each of",
                            "the students",
                            "has received the admit card in Practice Case 28",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Each of’ takes singular verb ‘has’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-1-q29",
                    "topic": "SVA - Police",
                    "difficulty": "hard",
                    "question": "The police has arrested the accused in Chennai",
                    "options": [
                            "The police",
                            "has arrested",
                            "the accused in Chennai",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Police’ is plural in standard English. Correct: ‘The police have arrested’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-1-q30",
                    "topic": "SVA - Subject Names",
                    "difficulty": "hard",
                    "question": "Mathematics are my favourite subject for CDS",
                    "options": [
                            "Mathematics",
                            "are my",
                            "favourite subject for CDS",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Names of subjects ending in -s are usually singular. Correct: ‘Mathematics is’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-1-q31",
                    "topic": "SVA - No Error",
                    "difficulty": "hard",
                    "question": "A number of students were absent in Practice Case 31",
                    "options": [
                            "A number of students",
                            "were absent",
                            "in Practice Case 31",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘A number of + plural noun’ takes plural verb."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-1-q32",
                    "topic": "SVA - Number",
                    "difficulty": "hard",
                    "question": "The number of vacancies are increasing in Practice Case 32",
                    "options": [
                            "The number",
                            "of vacancies",
                            "are increasing in Practice Case 32",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "‘The number of’ is singular and takes singular verb. Correct: ‘is increasing’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-1-q33",
                    "topic": "SVA - One Of",
                    "difficulty": "hard",
                    "question": "One of the documents have submitted a wrong document in Practice Case 33",
                    "options": [
                            "One of",
                            "the documents have",
                            "submitted a wrong document in Practice Case 33",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘One of + plural noun’ takes singular verb because the head subject is ‘one’. Correct: ‘has’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-1-q34",
                    "topic": "SVA - Subject Head",
                    "difficulty": "hard",
                    "question": "The quality of these answers are poor in Practice Case 34",
                    "options": [
                            "The quality",
                            "of these answers",
                            "are poor in Practice Case 34",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "The subject is singular ‘quality’. Correct verb: ‘is’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-1-q35",
                    "topic": "SVA - Neither/Nor",
                    "difficulty": "hard",
                    "question": "Neither the officer nor the clerks was present in Practice Case 35",
                    "options": [
                            "Neither the officer",
                            "nor the clerks",
                            "was present in Practice Case 35",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "With ‘neither...nor’, the verb agrees with the nearer subject. ‘Clerks’ is plural, so use ‘were’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-1-q36",
                    "topic": "SVA - No Error",
                    "difficulty": "hard",
                    "question": "Each of the students has received the admit card in Practice Case 36",
                    "options": [
                            "Each of",
                            "the students",
                            "has received the admit card in Practice Case 36",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Each of’ takes singular verb ‘has’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-1-q37",
                    "topic": "SVA - Police",
                    "difficulty": "hard",
                    "question": "The police has arrested the accused in Delhi",
                    "options": [
                            "The police",
                            "has arrested",
                            "the accused in Delhi",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Police’ is plural in standard English. Correct: ‘The police have arrested’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-1-q38",
                    "topic": "SVA - Subject Names",
                    "difficulty": "hard",
                    "question": "Mathematics are my favourite subject for UP Lekhpal",
                    "options": [
                            "Mathematics",
                            "are my",
                            "favourite subject for UP Lekhpal",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Names of subjects ending in -s are usually singular. Correct: ‘Mathematics is’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-1-q39",
                    "topic": "SVA - No Error",
                    "difficulty": "hard",
                    "question": "A number of students were absent in Practice Case 39",
                    "options": [
                            "A number of students",
                            "were absent",
                            "in Practice Case 39",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘A number of + plural noun’ takes plural verb."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-1-q40",
                    "topic": "SVA - Number",
                    "difficulty": "hard",
                    "question": "The number of vacancies are increasing in Practice Case 40",
                    "options": [
                            "The number",
                            "of vacancies",
                            "are increasing in Practice Case 40",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "‘The number of’ is singular and takes singular verb. Correct: ‘is increasing’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-1-q41",
                    "topic": "SVA - One Of",
                    "difficulty": "hard",
                    "question": "One of the officers have submitted a wrong document in Practice Case 41",
                    "options": [
                            "One of",
                            "the officers have",
                            "submitted a wrong document in Practice Case 41",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘One of + plural noun’ takes singular verb because the head subject is ‘one’. Correct: ‘has’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-1-q42",
                    "topic": "SVA - Subject Head",
                    "difficulty": "hard",
                    "question": "The quality of these answers are poor in Practice Case 42",
                    "options": [
                            "The quality",
                            "of these answers",
                            "are poor in Practice Case 42",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "The subject is singular ‘quality’. Correct verb: ‘is’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-1-q43",
                    "topic": "SVA - Neither/Nor",
                    "difficulty": "hard",
                    "question": "Neither the officer nor the clerks was present in Practice Case 43",
                    "options": [
                            "Neither the officer",
                            "nor the clerks",
                            "was present in Practice Case 43",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "With ‘neither...nor’, the verb agrees with the nearer subject. ‘Clerks’ is plural, so use ‘were’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-1-q44",
                    "topic": "SVA - No Error",
                    "difficulty": "hard",
                    "question": "Each of the students has received the admit card in Practice Case 44",
                    "options": [
                            "Each of",
                            "the students",
                            "has received the admit card in Practice Case 44",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Each of’ takes singular verb ‘has’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-1-q45",
                    "topic": "SVA - Police",
                    "difficulty": "hard",
                    "question": "The police has arrested the accused in Indore",
                    "options": [
                            "The police",
                            "has arrested",
                            "the accused in Indore",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Police’ is plural in standard English. Correct: ‘The police have arrested’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-1-q46",
                    "topic": "SVA - No Error",
                    "difficulty": "hard",
                    "question": "A number of students were absent in Practice Case 47",
                    "options": [
                            "A number of students",
                            "were absent",
                            "in Practice Case 47",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘A number of + plural noun’ takes plural verb."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-1-q47",
                    "topic": "SVA - Number",
                    "difficulty": "hard",
                    "question": "The number of vacancies are increasing in Practice Case 48",
                    "options": [
                            "The number",
                            "of vacancies",
                            "are increasing in Practice Case 48",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "‘The number of’ is singular and takes singular verb. Correct: ‘is increasing’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-1-q48",
                    "topic": "SVA - One Of",
                    "difficulty": "hard",
                    "question": "One of the students have submitted a wrong document in Practice Case 49",
                    "options": [
                            "One of",
                            "the students have",
                            "submitted a wrong document in Practice Case 49",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘One of + plural noun’ takes singular verb because the head subject is ‘one’. Correct: ‘has’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-1-q49",
                    "topic": "SVA - Subject Head",
                    "difficulty": "hard",
                    "question": "The quality of these answers are poor in Practice Case 50",
                    "options": [
                            "The quality",
                            "of these answers",
                            "are poor in Practice Case 50",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "The subject is singular ‘quality’. Correct verb: ‘is’."
            },
            {
                    "id": "detecting-errors-subject-verb-agreement-set-1-q50",
                    "topic": "SVA - Neither/Nor",
                    "difficulty": "hard",
                    "question": "Neither the officer nor the clerks was present in Practice Case 51",
                    "options": [
                            "Neither the officer",
                            "nor the clerks",
                            "was present in Practice Case 51",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "With ‘neither...nor’, the verb agrees with the nearer subject. ‘Clerks’ is plural, so use ‘were’."
            }
    ];

    window.GJU_QUIZ_BANK.push({
        id: quizId,
        subject: "English",
        title: "Detecting Errors - Subject Verb Agreement Set 1",
        description: "50 SVA-focused detecting error questions for SSC, Railway, Police and other exams.",
        durationMinutes: 30,
        totalQuestions: questions.length,
        marksPerQuestion: 1,
        negativeMarks: 0.25,
        difficulty: "Hard",
        tags: ["SSC", "Railway", "Police", "English", "Detecting Errors"],
        questions
    });
}());
