const quizData = [
  {
    "question": "Each of the students has received the admit card in Practice Case 52",
    "options": [
      "Each of",
      "the students",
      "has received the admit card in Practice Case 52",
      "No error"
    ],
    "answer": "No error",
    "explanation": "The sentence is correct. ‘Each of’ takes singular verb ‘has’.",
    "topic": "SVA - No Error"
  },
  {
    "question": "The police has arrested the accused in Gurugram",
    "options": [
      "The police",
      "has arrested",
      "the accused in Gurugram",
      "No error"
    ],
    "answer": "has arrested",
    "explanation": "‘Police’ is plural in standard English. Correct: ‘The police have arrested’.",
    "topic": "SVA - Police"
  },
  {
    "question": "A number of students were absent in Practice Case 55",
    "options": [
      "A number of students",
      "were absent",
      "in Practice Case 55",
      "No error"
    ],
    "answer": "No error",
    "explanation": "The sentence is correct. ‘A number of + plural noun’ takes plural verb.",
    "topic": "SVA - No Error"
  },
  {
    "question": "The number of vacancies are increasing in Practice Case 56",
    "options": [
      "The number",
      "of vacancies",
      "are increasing in Practice Case 56",
      "No error"
    ],
    "answer": "are increasing in Practice Case 56",
    "explanation": "‘The number of’ is singular and takes singular verb. Correct: ‘is increasing’.",
    "topic": "SVA - Number"
  },
  {
    "question": "One of the documents have submitted a wrong document in Practice Case 57",
    "options": [
      "One of",
      "the documents have",
      "submitted a wrong document in Practice Case 57",
      "No error"
    ],
    "answer": "the documents have",
    "explanation": "‘One of + plural noun’ takes singular verb because the head subject is ‘one’. Correct: ‘has’.",
    "topic": "SVA - One Of"
  },
  {
    "question": "The quality of these answers are poor in Practice Case 58",
    "options": [
      "The quality",
      "of these answers",
      "are poor in Practice Case 58",
      "No error"
    ],
    "answer": "are poor in Practice Case 58",
    "explanation": "The subject is singular ‘quality’. Correct verb: ‘is’.",
    "topic": "SVA - Subject Head"
  },
  {
    "question": "Neither the officer nor the clerks was present in Practice Case 59",
    "options": [
      "Neither the officer",
      "nor the clerks",
      "was present in Practice Case 59",
      "No error"
    ],
    "answer": "was present in Practice Case 59",
    "explanation": "With ‘neither...nor’, the verb agrees with the nearer subject. ‘Clerks’ is plural, so use ‘were’.",
    "topic": "SVA - Neither/Nor"
  },
  {
    "question": "Each of the students has received the admit card in Practice Case 60",
    "options": [
      "Each of",
      "the students",
      "has received the admit card in Practice Case 60",
      "No error"
    ],
    "answer": "No error",
    "explanation": "The sentence is correct. ‘Each of’ takes singular verb ‘has’.",
    "topic": "SVA - No Error"
  },
  {
    "question": "The police has arrested the accused in Kanpur",
    "options": [
      "The police",
      "has arrested",
      "the accused in Kanpur",
      "No error"
    ],
    "answer": "has arrested",
    "explanation": "‘Police’ is plural in standard English. Correct: ‘The police have arrested’.",
    "topic": "SVA - Police"
  },
  {
    "question": "A number of students were absent in Practice Case 63",
    "options": [
      "A number of students",
      "were absent",
      "in Practice Case 63",
      "No error"
    ],
    "answer": "No error",
    "explanation": "The sentence is correct. ‘A number of + plural noun’ takes plural verb.",
    "topic": "SVA - No Error"
  },
  {
    "question": "The number of vacancies are increasing in Practice Case 64",
    "options": [
      "The number",
      "of vacancies",
      "are increasing in Practice Case 64",
      "No error"
    ],
    "answer": "are increasing in Practice Case 64",
    "explanation": "‘The number of’ is singular and takes singular verb. Correct: ‘is increasing’.",
    "topic": "SVA - Number"
  },
  {
    "question": "One of the officers have submitted a wrong document in Practice Case 65",
    "options": [
      "One of",
      "the officers have",
      "submitted a wrong document in Practice Case 65",
      "No error"
    ],
    "answer": "the officers have",
    "explanation": "‘One of + plural noun’ takes singular verb because the head subject is ‘one’. Correct: ‘has’.",
    "topic": "SVA - One Of"
  },
  {
    "question": "The quality of these answers are poor in Practice Case 66",
    "options": [
      "The quality",
      "of these answers",
      "are poor in Practice Case 66",
      "No error"
    ],
    "answer": "are poor in Practice Case 66",
    "explanation": "The subject is singular ‘quality’. Correct verb: ‘is’.",
    "topic": "SVA - Subject Head"
  },
  {
    "question": "Neither the officer nor the clerks was present in Practice Case 67",
    "options": [
      "Neither the officer",
      "nor the clerks",
      "was present in Practice Case 67",
      "No error"
    ],
    "answer": "was present in Practice Case 67",
    "explanation": "With ‘neither...nor’, the verb agrees with the nearer subject. ‘Clerks’ is plural, so use ‘were’.",
    "topic": "SVA - Neither/Nor"
  },
  {
    "question": "Each of the students has received the admit card in Practice Case 68",
    "options": [
      "Each of",
      "the students",
      "has received the admit card in Practice Case 68",
      "No error"
    ],
    "answer": "No error",
    "explanation": "The sentence is correct. ‘Each of’ takes singular verb ‘has’.",
    "topic": "SVA - No Error"
  },
  {
    "question": "The police has arrested the accused in Varanasi",
    "options": [
      "The police",
      "has arrested",
      "the accused in Varanasi",
      "No error"
    ],
    "answer": "has arrested",
    "explanation": "‘Police’ is plural in standard English. Correct: ‘The police have arrested’.",
    "topic": "SVA - Police"
  },
  {
    "question": "A number of students were absent in Practice Case 71",
    "options": [
      "A number of students",
      "were absent",
      "in Practice Case 71",
      "No error"
    ],
    "answer": "No error",
    "explanation": "The sentence is correct. ‘A number of + plural noun’ takes plural verb.",
    "topic": "SVA - No Error"
  },
  {
    "question": "The number of vacancies are increasing in Practice Case 72",
    "options": [
      "The number",
      "of vacancies",
      "are increasing in Practice Case 72",
      "No error"
    ],
    "answer": "are increasing in Practice Case 72",
    "explanation": "‘The number of’ is singular and takes singular verb. Correct: ‘is increasing’.",
    "topic": "SVA - Number"
  },
  {
    "question": "One of the students have submitted a wrong document in Practice Case 73",
    "options": [
      "One of",
      "the students have",
      "submitted a wrong document in Practice Case 73",
      "No error"
    ],
    "answer": "the students have",
    "explanation": "‘One of + plural noun’ takes singular verb because the head subject is ‘one’. Correct: ‘has’.",
    "topic": "SVA - One Of"
  },
  {
    "question": "The quality of these answers are poor in Practice Case 74",
    "options": [
      "The quality",
      "of these answers",
      "are poor in Practice Case 74",
      "No error"
    ],
    "answer": "are poor in Practice Case 74",
    "explanation": "The subject is singular ‘quality’. Correct verb: ‘is’.",
    "topic": "SVA - Subject Head"
  },
  {
    "question": "Neither the officer nor the clerks was present in Practice Case 75",
    "options": [
      "Neither the officer",
      "nor the clerks",
      "was present in Practice Case 75",
      "No error"
    ],
    "answer": "was present in Practice Case 75",
    "explanation": "With ‘neither...nor’, the verb agrees with the nearer subject. ‘Clerks’ is plural, so use ‘were’.",
    "topic": "SVA - Neither/Nor"
  },
  {
    "question": "Each of the students has received the admit card in Practice Case 76",
    "options": [
      "Each of",
      "the students",
      "has received the admit card in Practice Case 76",
      "No error"
    ],
    "answer": "No error",
    "explanation": "The sentence is correct. ‘Each of’ takes singular verb ‘has’.",
    "topic": "SVA - No Error"
  },
  {
    "question": "A number of students were absent in Practice Case 79",
    "options": [
      "A number of students",
      "were absent",
      "in Practice Case 79",
      "No error"
    ],
    "answer": "No error",
    "explanation": "The sentence is correct. ‘A number of + plural noun’ takes plural verb.",
    "topic": "SVA - No Error"
  },
  {
    "question": "The number of vacancies are increasing in Practice Case 80",
    "options": [
      "The number",
      "of vacancies",
      "are increasing in Practice Case 80",
      "No error"
    ],
    "answer": "are increasing in Practice Case 80",
    "explanation": "‘The number of’ is singular and takes singular verb. Correct: ‘is increasing’.",
    "topic": "SVA - Number"
  },
  {
    "question": "One of the documents have submitted a wrong document in Practice Case 81",
    "options": [
      "One of",
      "the documents have",
      "submitted a wrong document in Practice Case 81",
      "No error"
    ],
    "answer": "the documents have",
    "explanation": "‘One of + plural noun’ takes singular verb because the head subject is ‘one’. Correct: ‘has’.",
    "topic": "SVA - One Of"
  },
  {
    "question": "The quality of these answers are poor in Practice Case 82",
    "options": [
      "The quality",
      "of these answers",
      "are poor in Practice Case 82",
      "No error"
    ],
    "answer": "are poor in Practice Case 82",
    "explanation": "The subject is singular ‘quality’. Correct verb: ‘is’.",
    "topic": "SVA - Subject Head"
  },
  {
    "question": "Neither the officer nor the clerks was present in Practice Case 83",
    "options": [
      "Neither the officer",
      "nor the clerks",
      "was present in Practice Case 83",
      "No error"
    ],
    "answer": "was present in Practice Case 83",
    "explanation": "With ‘neither...nor’, the verb agrees with the nearer subject. ‘Clerks’ is plural, so use ‘were’.",
    "topic": "SVA - Neither/Nor"
  },
  {
    "question": "Each of the students has received the admit card in Practice Case 84",
    "options": [
      "Each of",
      "the students",
      "has received the admit card in Practice Case 84",
      "No error"
    ],
    "answer": "No error",
    "explanation": "The sentence is correct. ‘Each of’ takes singular verb ‘has’.",
    "topic": "SVA - No Error"
  },
  {
    "question": "A number of students were absent in Practice Case 87",
    "options": [
      "A number of students",
      "were absent",
      "in Practice Case 87",
      "No error"
    ],
    "answer": "No error",
    "explanation": "The sentence is correct. ‘A number of + plural noun’ takes plural verb.",
    "topic": "SVA - No Error"
  },
  {
    "question": "The number of vacancies are increasing in Practice Case 88",
    "options": [
      "The number",
      "of vacancies",
      "are increasing in Practice Case 88",
      "No error"
    ],
    "answer": "are increasing in Practice Case 88",
    "explanation": "‘The number of’ is singular and takes singular verb. Correct: ‘is increasing’.",
    "topic": "SVA - Number"
  },
  {
    "question": "One of the officers have submitted a wrong document in Practice Case 89",
    "options": [
      "One of",
      "the officers have",
      "submitted a wrong document in Practice Case 89",
      "No error"
    ],
    "answer": "the officers have",
    "explanation": "‘One of + plural noun’ takes singular verb because the head subject is ‘one’. Correct: ‘has’.",
    "topic": "SVA - One Of"
  },
  {
    "question": "The quality of these answers are poor in Practice Case 90",
    "options": [
      "The quality",
      "of these answers",
      "are poor in Practice Case 90",
      "No error"
    ],
    "answer": "are poor in Practice Case 90",
    "explanation": "The subject is singular ‘quality’. Correct verb: ‘is’.",
    "topic": "SVA - Subject Head"
  },
  {
    "question": "Neither the officer nor the clerks was present in Practice Case 91",
    "options": [
      "Neither the officer",
      "nor the clerks",
      "was present in Practice Case 91",
      "No error"
    ],
    "answer": "was present in Practice Case 91",
    "explanation": "With ‘neither...nor’, the verb agrees with the nearer subject. ‘Clerks’ is plural, so use ‘were’.",
    "topic": "SVA - Neither/Nor"
  },
  {
    "question": "Each of the students has received the admit card in Practice Case 92",
    "options": [
      "Each of",
      "the students",
      "has received the admit card in Practice Case 92",
      "No error"
    ],
    "answer": "No error",
    "explanation": "The sentence is correct. ‘Each of’ takes singular verb ‘has’.",
    "topic": "SVA - No Error"
  },
  {
    "question": "A number of students were absent in Practice Case 95",
    "options": [
      "A number of students",
      "were absent",
      "in Practice Case 95",
      "No error"
    ],
    "answer": "No error",
    "explanation": "The sentence is correct. ‘A number of + plural noun’ takes plural verb.",
    "topic": "SVA - No Error"
  },
  {
    "question": "The number of vacancies are increasing in Practice Case 96",
    "options": [
      "The number",
      "of vacancies",
      "are increasing in Practice Case 96",
      "No error"
    ],
    "answer": "are increasing in Practice Case 96",
    "explanation": "‘The number of’ is singular and takes singular verb. Correct: ‘is increasing’.",
    "topic": "SVA - Number"
  },
  {
    "question": "One of the students have submitted a wrong document in Practice Case 97",
    "options": [
      "One of",
      "the students have",
      "submitted a wrong document in Practice Case 97",
      "No error"
    ],
    "answer": "the students have",
    "explanation": "‘One of + plural noun’ takes singular verb because the head subject is ‘one’. Correct: ‘has’.",
    "topic": "SVA - One Of"
  },
  {
    "question": "The quality of these answers are poor in Practice Case 98",
    "options": [
      "The quality",
      "of these answers",
      "are poor in Practice Case 98",
      "No error"
    ],
    "answer": "are poor in Practice Case 98",
    "explanation": "The subject is singular ‘quality’. Correct verb: ‘is’.",
    "topic": "SVA - Subject Head"
  },
  {
    "question": "Neither the officer nor the clerks was present in Practice Case 99",
    "options": [
      "Neither the officer",
      "nor the clerks",
      "was present in Practice Case 99",
      "No error"
    ],
    "answer": "was present in Practice Case 99",
    "explanation": "With ‘neither...nor’, the verb agrees with the nearer subject. ‘Clerks’ is plural, so use ‘were’.",
    "topic": "SVA - Neither/Nor"
  },
  {
    "question": "Each of the students has received the admit card in Practice Case 100",
    "options": [
      "Each of",
      "the students",
      "has received the admit card in Practice Case 100",
      "No error"
    ],
    "answer": "No error",
    "explanation": "The sentence is correct. ‘Each of’ takes singular verb ‘has’.",
    "topic": "SVA - No Error"
  },
  {
    "question": "A number of students were absent in Practice Case 103",
    "options": [
      "A number of students",
      "were absent",
      "in Practice Case 103",
      "No error"
    ],
    "answer": "No error",
    "explanation": "The sentence is correct. ‘A number of + plural noun’ takes plural verb.",
    "topic": "SVA - No Error"
  },
  {
    "question": "The number of vacancies are increasing in Practice Case 104",
    "options": [
      "The number",
      "of vacancies",
      "are increasing in Practice Case 104",
      "No error"
    ],
    "answer": "are increasing in Practice Case 104",
    "explanation": "‘The number of’ is singular and takes singular verb. Correct: ‘is increasing’.",
    "topic": "SVA - Number"
  },
  {
    "question": "One of the documents have submitted a wrong document in Practice Case 105",
    "options": [
      "One of",
      "the documents have",
      "submitted a wrong document in Practice Case 105",
      "No error"
    ],
    "answer": "the documents have",
    "explanation": "‘One of + plural noun’ takes singular verb because the head subject is ‘one’. Correct: ‘has’.",
    "topic": "SVA - One Of"
  },
  {
    "question": "The quality of these answers are poor in Practice Case 106",
    "options": [
      "The quality",
      "of these answers",
      "are poor in Practice Case 106",
      "No error"
    ],
    "answer": "are poor in Practice Case 106",
    "explanation": "The subject is singular ‘quality’. Correct verb: ‘is’.",
    "topic": "SVA - Subject Head"
  },
  {
    "question": "Neither the officer nor the clerks was present in Practice Case 107",
    "options": [
      "Neither the officer",
      "nor the clerks",
      "was present in Practice Case 107",
      "No error"
    ],
    "answer": "was present in Practice Case 107",
    "explanation": "With ‘neither...nor’, the verb agrees with the nearer subject. ‘Clerks’ is plural, so use ‘were’.",
    "topic": "SVA - Neither/Nor"
  },
  {
    "question": "Each of the students has received the admit card in Practice Case 108",
    "options": [
      "Each of",
      "the students",
      "has received the admit card in Practice Case 108",
      "No error"
    ],
    "answer": "No error",
    "explanation": "The sentence is correct. ‘Each of’ takes singular verb ‘has’.",
    "topic": "SVA - No Error"
  },
  {
    "question": "A number of students were absent in Practice Case 111",
    "options": [
      "A number of students",
      "were absent",
      "in Practice Case 111",
      "No error"
    ],
    "answer": "No error",
    "explanation": "The sentence is correct. ‘A number of + plural noun’ takes plural verb.",
    "topic": "SVA - No Error"
  },
  {
    "question": "The number of vacancies are increasing in Practice Case 112",
    "options": [
      "The number",
      "of vacancies",
      "are increasing in Practice Case 112",
      "No error"
    ],
    "answer": "are increasing in Practice Case 112",
    "explanation": "‘The number of’ is singular and takes singular verb. Correct: ‘is increasing’.",
    "topic": "SVA - Number"
  },
  {
    "question": "One of the officers have submitted a wrong document in Practice Case 113",
    "options": [
      "One of",
      "the officers have",
      "submitted a wrong document in Practice Case 113",
      "No error"
    ],
    "answer": "the officers have",
    "explanation": "‘One of + plural noun’ takes singular verb because the head subject is ‘one’. Correct: ‘has’.",
    "topic": "SVA - One Of"
  },
  {
    "question": "The quality of these answers are poor in Practice Case 114",
    "options": [
      "The quality",
      "of these answers",
      "are poor in Practice Case 114",
      "No error"
    ],
    "answer": "are poor in Practice Case 114",
    "explanation": "The subject is singular ‘quality’. Correct verb: ‘is’.",
    "topic": "SVA - Subject Head"
  }
];

export default quizData;
