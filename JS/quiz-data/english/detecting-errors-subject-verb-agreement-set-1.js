const quizData = [
  {
    "question": "One of the students have submitted a wrong document in Practice Case 1",
    "options": [
      "One of",
      "the students have",
      "submitted a wrong document in Practice Case 1",
      "No error"
    ],
    "answer": "the students have",
    "explanation": "‘One of + plural noun’ takes singular verb because the head subject is ‘one’. Correct: ‘has’.",
    "topic": "SVA - One Of"
  },
  {
    "question": "The quality of these answers are poor in Practice Case 2",
    "options": [
      "The quality",
      "of these answers",
      "are poor in Practice Case 2",
      "No error"
    ],
    "answer": "are poor in Practice Case 2",
    "explanation": "The subject is singular ‘quality’. Correct verb: ‘is’.",
    "topic": "SVA - Subject Head"
  },
  {
    "question": "Neither the officer nor the clerks was present in Practice Case 3",
    "options": [
      "Neither the officer",
      "nor the clerks",
      "was present in Practice Case 3",
      "No error"
    ],
    "answer": "was present in Practice Case 3",
    "explanation": "With ‘neither...nor’, the verb agrees with the nearer subject. ‘Clerks’ is plural, so use ‘were’.",
    "topic": "SVA - Neither/Nor"
  },
  {
    "question": "Each of the students has received the admit card in Practice Case 4",
    "options": [
      "Each of",
      "the students",
      "has received the admit card in Practice Case 4",
      "No error"
    ],
    "answer": "No error",
    "explanation": "The sentence is correct. ‘Each of’ takes singular verb ‘has’.",
    "topic": "SVA - No Error"
  },
  {
    "question": "The police has arrested the accused in Jaipur",
    "options": [
      "The police",
      "has arrested",
      "the accused in Jaipur",
      "No error"
    ],
    "answer": "has arrested",
    "explanation": "‘Police’ is plural in standard English. Correct: ‘The police have arrested’.",
    "topic": "SVA - Police"
  },
  {
    "question": "Mathematics are my favourite subject for Bank Clerk",
    "options": [
      "Mathematics",
      "are my",
      "favourite subject for Bank Clerk",
      "No error"
    ],
    "answer": "are my",
    "explanation": "Names of subjects ending in -s are usually singular. Correct: ‘Mathematics is’.",
    "topic": "SVA - Subject Names"
  },
  {
    "question": "A number of students were absent in Practice Case 7",
    "options": [
      "A number of students",
      "were absent",
      "in Practice Case 7",
      "No error"
    ],
    "answer": "No error",
    "explanation": "The sentence is correct. ‘A number of + plural noun’ takes plural verb.",
    "topic": "SVA - No Error"
  },
  {
    "question": "The number of vacancies are increasing in Practice Case 8",
    "options": [
      "The number",
      "of vacancies",
      "are increasing in Practice Case 8",
      "No error"
    ],
    "answer": "are increasing in Practice Case 8",
    "explanation": "‘The number of’ is singular and takes singular verb. Correct: ‘is increasing’.",
    "topic": "SVA - Number"
  },
  {
    "question": "One of the documents have submitted a wrong document in Practice Case 9",
    "options": [
      "One of",
      "the documents have",
      "submitted a wrong document in Practice Case 9",
      "No error"
    ],
    "answer": "the documents have",
    "explanation": "‘One of + plural noun’ takes singular verb because the head subject is ‘one’. Correct: ‘has’.",
    "topic": "SVA - One Of"
  },
  {
    "question": "The quality of these answers are poor in Practice Case 10",
    "options": [
      "The quality",
      "of these answers",
      "are poor in Practice Case 10",
      "No error"
    ],
    "answer": "are poor in Practice Case 10",
    "explanation": "The subject is singular ‘quality’. Correct verb: ‘is’.",
    "topic": "SVA - Subject Head"
  },
  {
    "question": "Neither the officer nor the clerks was present in Practice Case 11",
    "options": [
      "Neither the officer",
      "nor the clerks",
      "was present in Practice Case 11",
      "No error"
    ],
    "answer": "was present in Practice Case 11",
    "explanation": "With ‘neither...nor’, the verb agrees with the nearer subject. ‘Clerks’ is plural, so use ‘were’.",
    "topic": "SVA - Neither/Nor"
  },
  {
    "question": "Each of the students has received the admit card in Practice Case 12",
    "options": [
      "Each of",
      "the students",
      "has received the admit card in Practice Case 12",
      "No error"
    ],
    "answer": "No error",
    "explanation": "The sentence is correct. ‘Each of’ takes singular verb ‘has’.",
    "topic": "SVA - No Error"
  },
  {
    "question": "The police has arrested the accused in Gwalior",
    "options": [
      "The police",
      "has arrested",
      "the accused in Gwalior",
      "No error"
    ],
    "answer": "has arrested",
    "explanation": "‘Police’ is plural in standard English. Correct: ‘The police have arrested’.",
    "topic": "SVA - Police"
  },
  {
    "question": "Mathematics are my favourite subject for UP Police",
    "options": [
      "Mathematics",
      "are my",
      "favourite subject for UP Police",
      "No error"
    ],
    "answer": "are my",
    "explanation": "Names of subjects ending in -s are usually singular. Correct: ‘Mathematics is’.",
    "topic": "SVA - Subject Names"
  },
  {
    "question": "A number of students were absent in Practice Case 15",
    "options": [
      "A number of students",
      "were absent",
      "in Practice Case 15",
      "No error"
    ],
    "answer": "No error",
    "explanation": "The sentence is correct. ‘A number of + plural noun’ takes plural verb.",
    "topic": "SVA - No Error"
  },
  {
    "question": "The number of vacancies are increasing in Practice Case 16",
    "options": [
      "The number",
      "of vacancies",
      "are increasing in Practice Case 16",
      "No error"
    ],
    "answer": "are increasing in Practice Case 16",
    "explanation": "‘The number of’ is singular and takes singular verb. Correct: ‘is increasing’.",
    "topic": "SVA - Number"
  },
  {
    "question": "One of the officers have submitted a wrong document in Practice Case 17",
    "options": [
      "One of",
      "the officers have",
      "submitted a wrong document in Practice Case 17",
      "No error"
    ],
    "answer": "the officers have",
    "explanation": "‘One of + plural noun’ takes singular verb because the head subject is ‘one’. Correct: ‘has’.",
    "topic": "SVA - One Of"
  },
  {
    "question": "The quality of these answers are poor in Practice Case 18",
    "options": [
      "The quality",
      "of these answers",
      "are poor in Practice Case 18",
      "No error"
    ],
    "answer": "are poor in Practice Case 18",
    "explanation": "The subject is singular ‘quality’. Correct verb: ‘is’.",
    "topic": "SVA - Subject Head"
  },
  {
    "question": "Neither the officer nor the clerks was present in Practice Case 19",
    "options": [
      "Neither the officer",
      "nor the clerks",
      "was present in Practice Case 19",
      "No error"
    ],
    "answer": "was present in Practice Case 19",
    "explanation": "With ‘neither...nor’, the verb agrees with the nearer subject. ‘Clerks’ is plural, so use ‘were’.",
    "topic": "SVA - Neither/Nor"
  },
  {
    "question": "Each of the students has received the admit card in Practice Case 20",
    "options": [
      "Each of",
      "the students",
      "has received the admit card in Practice Case 20",
      "No error"
    ],
    "answer": "No error",
    "explanation": "The sentence is correct. ‘Each of’ takes singular verb ‘has’.",
    "topic": "SVA - No Error"
  },
  {
    "question": "The police has arrested the accused in Patna",
    "options": [
      "The police",
      "has arrested",
      "the accused in Patna",
      "No error"
    ],
    "answer": "has arrested",
    "explanation": "‘Police’ is plural in standard English. Correct: ‘The police have arrested’.",
    "topic": "SVA - Police"
  },
  {
    "question": "Mathematics are my favourite subject for SSC CPO",
    "options": [
      "Mathematics",
      "are my",
      "favourite subject for SSC CPO",
      "No error"
    ],
    "answer": "are my",
    "explanation": "Names of subjects ending in -s are usually singular. Correct: ‘Mathematics is’.",
    "topic": "SVA - Subject Names"
  },
  {
    "question": "A number of students were absent in Practice Case 23",
    "options": [
      "A number of students",
      "were absent",
      "in Practice Case 23",
      "No error"
    ],
    "answer": "No error",
    "explanation": "The sentence is correct. ‘A number of + plural noun’ takes plural verb.",
    "topic": "SVA - No Error"
  },
  {
    "question": "The number of vacancies are increasing in Practice Case 24",
    "options": [
      "The number",
      "of vacancies",
      "are increasing in Practice Case 24",
      "No error"
    ],
    "answer": "are increasing in Practice Case 24",
    "explanation": "‘The number of’ is singular and takes singular verb. Correct: ‘is increasing’.",
    "topic": "SVA - Number"
  },
  {
    "question": "One of the students have submitted a wrong document in Practice Case 25",
    "options": [
      "One of",
      "the students have",
      "submitted a wrong document in Practice Case 25",
      "No error"
    ],
    "answer": "the students have",
    "explanation": "‘One of + plural noun’ takes singular verb because the head subject is ‘one’. Correct: ‘has’.",
    "topic": "SVA - One Of"
  },
  {
    "question": "The quality of these answers are poor in Practice Case 26",
    "options": [
      "The quality",
      "of these answers",
      "are poor in Practice Case 26",
      "No error"
    ],
    "answer": "are poor in Practice Case 26",
    "explanation": "The subject is singular ‘quality’. Correct verb: ‘is’.",
    "topic": "SVA - Subject Head"
  },
  {
    "question": "Neither the officer nor the clerks was present in Practice Case 27",
    "options": [
      "Neither the officer",
      "nor the clerks",
      "was present in Practice Case 27",
      "No error"
    ],
    "answer": "was present in Practice Case 27",
    "explanation": "With ‘neither...nor’, the verb agrees with the nearer subject. ‘Clerks’ is plural, so use ‘were’.",
    "topic": "SVA - Neither/Nor"
  },
  {
    "question": "Each of the students has received the admit card in Practice Case 28",
    "options": [
      "Each of",
      "the students",
      "has received the admit card in Practice Case 28",
      "No error"
    ],
    "answer": "No error",
    "explanation": "The sentence is correct. ‘Each of’ takes singular verb ‘has’.",
    "topic": "SVA - No Error"
  },
  {
    "question": "The police has arrested the accused in Chennai",
    "options": [
      "The police",
      "has arrested",
      "the accused in Chennai",
      "No error"
    ],
    "answer": "has arrested",
    "explanation": "‘Police’ is plural in standard English. Correct: ‘The police have arrested’.",
    "topic": "SVA - Police"
  },
  {
    "question": "Mathematics are my favourite subject for CDS",
    "options": [
      "Mathematics",
      "are my",
      "favourite subject for CDS",
      "No error"
    ],
    "answer": "are my",
    "explanation": "Names of subjects ending in -s are usually singular. Correct: ‘Mathematics is’.",
    "topic": "SVA - Subject Names"
  },
  {
    "question": "A number of students were absent in Practice Case 31",
    "options": [
      "A number of students",
      "were absent",
      "in Practice Case 31",
      "No error"
    ],
    "answer": "No error",
    "explanation": "The sentence is correct. ‘A number of + plural noun’ takes plural verb.",
    "topic": "SVA - No Error"
  },
  {
    "question": "The number of vacancies are increasing in Practice Case 32",
    "options": [
      "The number",
      "of vacancies",
      "are increasing in Practice Case 32",
      "No error"
    ],
    "answer": "are increasing in Practice Case 32",
    "explanation": "‘The number of’ is singular and takes singular verb. Correct: ‘is increasing’.",
    "topic": "SVA - Number"
  },
  {
    "question": "One of the documents have submitted a wrong document in Practice Case 33",
    "options": [
      "One of",
      "the documents have",
      "submitted a wrong document in Practice Case 33",
      "No error"
    ],
    "answer": "the documents have",
    "explanation": "‘One of + plural noun’ takes singular verb because the head subject is ‘one’. Correct: ‘has’.",
    "topic": "SVA - One Of"
  },
  {
    "question": "The quality of these answers are poor in Practice Case 34",
    "options": [
      "The quality",
      "of these answers",
      "are poor in Practice Case 34",
      "No error"
    ],
    "answer": "are poor in Practice Case 34",
    "explanation": "The subject is singular ‘quality’. Correct verb: ‘is’.",
    "topic": "SVA - Subject Head"
  },
  {
    "question": "Neither the officer nor the clerks was present in Practice Case 35",
    "options": [
      "Neither the officer",
      "nor the clerks",
      "was present in Practice Case 35",
      "No error"
    ],
    "answer": "was present in Practice Case 35",
    "explanation": "With ‘neither...nor’, the verb agrees with the nearer subject. ‘Clerks’ is plural, so use ‘were’.",
    "topic": "SVA - Neither/Nor"
  },
  {
    "question": "Each of the students has received the admit card in Practice Case 36",
    "options": [
      "Each of",
      "the students",
      "has received the admit card in Practice Case 36",
      "No error"
    ],
    "answer": "No error",
    "explanation": "The sentence is correct. ‘Each of’ takes singular verb ‘has’.",
    "topic": "SVA - No Error"
  },
  {
    "question": "The police has arrested the accused in Delhi",
    "options": [
      "The police",
      "has arrested",
      "the accused in Delhi",
      "No error"
    ],
    "answer": "has arrested",
    "explanation": "‘Police’ is plural in standard English. Correct: ‘The police have arrested’.",
    "topic": "SVA - Police"
  },
  {
    "question": "Mathematics are my favourite subject for UP Lekhpal",
    "options": [
      "Mathematics",
      "are my",
      "favourite subject for UP Lekhpal",
      "No error"
    ],
    "answer": "are my",
    "explanation": "Names of subjects ending in -s are usually singular. Correct: ‘Mathematics is’.",
    "topic": "SVA - Subject Names"
  },
  {
    "question": "A number of students were absent in Practice Case 39",
    "options": [
      "A number of students",
      "were absent",
      "in Practice Case 39",
      "No error"
    ],
    "answer": "No error",
    "explanation": "The sentence is correct. ‘A number of + plural noun’ takes plural verb.",
    "topic": "SVA - No Error"
  },
  {
    "question": "The number of vacancies are increasing in Practice Case 40",
    "options": [
      "The number",
      "of vacancies",
      "are increasing in Practice Case 40",
      "No error"
    ],
    "answer": "are increasing in Practice Case 40",
    "explanation": "‘The number of’ is singular and takes singular verb. Correct: ‘is increasing’.",
    "topic": "SVA - Number"
  },
  {
    "question": "One of the officers have submitted a wrong document in Practice Case 41",
    "options": [
      "One of",
      "the officers have",
      "submitted a wrong document in Practice Case 41",
      "No error"
    ],
    "answer": "the officers have",
    "explanation": "‘One of + plural noun’ takes singular verb because the head subject is ‘one’. Correct: ‘has’.",
    "topic": "SVA - One Of"
  },
  {
    "question": "The quality of these answers are poor in Practice Case 42",
    "options": [
      "The quality",
      "of these answers",
      "are poor in Practice Case 42",
      "No error"
    ],
    "answer": "are poor in Practice Case 42",
    "explanation": "The subject is singular ‘quality’. Correct verb: ‘is’.",
    "topic": "SVA - Subject Head"
  },
  {
    "question": "Neither the officer nor the clerks was present in Practice Case 43",
    "options": [
      "Neither the officer",
      "nor the clerks",
      "was present in Practice Case 43",
      "No error"
    ],
    "answer": "was present in Practice Case 43",
    "explanation": "With ‘neither...nor’, the verb agrees with the nearer subject. ‘Clerks’ is plural, so use ‘were’.",
    "topic": "SVA - Neither/Nor"
  },
  {
    "question": "Each of the students has received the admit card in Practice Case 44",
    "options": [
      "Each of",
      "the students",
      "has received the admit card in Practice Case 44",
      "No error"
    ],
    "answer": "No error",
    "explanation": "The sentence is correct. ‘Each of’ takes singular verb ‘has’.",
    "topic": "SVA - No Error"
  },
  {
    "question": "The police has arrested the accused in Indore",
    "options": [
      "The police",
      "has arrested",
      "the accused in Indore",
      "No error"
    ],
    "answer": "has arrested",
    "explanation": "‘Police’ is plural in standard English. Correct: ‘The police have arrested’.",
    "topic": "SVA - Police"
  },
  {
    "question": "A number of students were absent in Practice Case 47",
    "options": [
      "A number of students",
      "were absent",
      "in Practice Case 47",
      "No error"
    ],
    "answer": "No error",
    "explanation": "The sentence is correct. ‘A number of + plural noun’ takes plural verb.",
    "topic": "SVA - No Error"
  },
  {
    "question": "The number of vacancies are increasing in Practice Case 48",
    "options": [
      "The number",
      "of vacancies",
      "are increasing in Practice Case 48",
      "No error"
    ],
    "answer": "are increasing in Practice Case 48",
    "explanation": "‘The number of’ is singular and takes singular verb. Correct: ‘is increasing’.",
    "topic": "SVA - Number"
  },
  {
    "question": "One of the students have submitted a wrong document in Practice Case 49",
    "options": [
      "One of",
      "the students have",
      "submitted a wrong document in Practice Case 49",
      "No error"
    ],
    "answer": "the students have",
    "explanation": "‘One of + plural noun’ takes singular verb because the head subject is ‘one’. Correct: ‘has’.",
    "topic": "SVA - One Of"
  },
  {
    "question": "The quality of these answers are poor in Practice Case 50",
    "options": [
      "The quality",
      "of these answers",
      "are poor in Practice Case 50",
      "No error"
    ],
    "answer": "are poor in Practice Case 50",
    "explanation": "The subject is singular ‘quality’. Correct verb: ‘is’.",
    "topic": "SVA - Subject Head"
  },
  {
    "question": "Neither the officer nor the clerks was present in Practice Case 51",
    "options": [
      "Neither the officer",
      "nor the clerks",
      "was present in Practice Case 51",
      "No error"
    ],
    "answer": "was present in Practice Case 51",
    "explanation": "With ‘neither...nor’, the verb agrees with the nearer subject. ‘Clerks’ is plural, so use ‘were’.",
    "topic": "SVA - Neither/Nor"
  }
];

export default quizData;
