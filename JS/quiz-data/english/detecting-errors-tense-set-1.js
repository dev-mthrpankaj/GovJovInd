const quizData = [
  {
    "question": "I am living in Delhi since 2020 in Practice Case 1",
    "options": [
      "I am living",
      "in Delhi",
      "since 2020 in Practice Case 1",
      "No error"
    ],
    "answer": "I am living",
    "explanation": "With ‘since’ for an action continuing to the present, use present perfect continuous: ‘have been living’.",
    "topic": "Tense - Since"
  },
  {
    "question": "He has completed the application yesterday in Practice Case 2",
    "options": [
      "He has completed",
      "the application",
      "yesterday in Practice Case 2",
      "No error"
    ],
    "answer": "He has completed",
    "explanation": "Present perfect is not used with definite past time like ‘yesterday’. Use simple past: ‘completed’.",
    "topic": "Tense - Present Perfect"
  },
  {
    "question": "When I reached the station the train had already left in Practice Case 3",
    "options": [
      "When I reached",
      "the station",
      "the train had already left in Practice Case 3",
      "No error"
    ],
    "answer": "No error",
    "explanation": "The sentence is correct. Earlier past action uses past perfect.",
    "topic": "Tense - No Error"
  },
  {
    "question": "By next month she will complete the course for UP Police",
    "options": [
      "By next month",
      "she will complete",
      "the course for UP Police",
      "No error"
    ],
    "answer": "she will complete",
    "explanation": "With ‘by + future time’ showing completion before that time, use future perfect: ‘will have completed’.",
    "topic": "Tense - Future Perfect"
  },
  {
    "question": "He is knowing the answer in Practice Case 5",
    "options": [
      "He is knowing",
      "the answer",
      "in Practice Case 5",
      "No error"
    ],
    "answer": "He is knowing",
    "explanation": "Stative verbs like ‘know’ are generally not used in continuous form. Correct: ‘He knows’.",
    "topic": "Tense - Stative"
  },
  {
    "question": "The clerk has been working here for five years in Practice Case 6",
    "options": [
      "The clerk",
      "has been working",
      "here for five years in Practice Case 6",
      "No error"
    ],
    "answer": "No error",
    "explanation": "The sentence is correct. Present perfect continuous shows an action continuing from past to present.",
    "topic": "Tense - No Error"
  },
  {
    "question": "I did not knew the answer in Practice Case 7",
    "options": [
      "I did not knew",
      "the answer",
      "in Practice Case 7",
      "No error"
    ],
    "answer": "I did not knew",
    "explanation": "After ‘did not’, use base verb. Correct: ‘did not know’.",
    "topic": "Tense - Did + V1"
  },
  {
    "question": "She will be reach the office before 10 a.m. in Practice Case 8",
    "options": [
      "She will be reach",
      "the office",
      "before 10 a.m. in Practice Case 8",
      "No error"
    ],
    "answer": "She will be reach",
    "explanation": "Use simple future ‘will reach’, not ‘will be reach’.",
    "topic": "Tense - Future"
  },
  {
    "question": "I am living in Indore since 2020 in Practice Case 9",
    "options": [
      "I am living",
      "in Indore",
      "since 2020 in Practice Case 9",
      "No error"
    ],
    "answer": "I am living",
    "explanation": "With ‘since’ for an action continuing to the present, use present perfect continuous: ‘have been living’.",
    "topic": "Tense - Since"
  },
  {
    "question": "He has completed the assignment yesterday in Practice Case 10",
    "options": [
      "He has completed",
      "the assignment",
      "yesterday in Practice Case 10",
      "No error"
    ],
    "answer": "He has completed",
    "explanation": "Present perfect is not used with definite past time like ‘yesterday’. Use simple past: ‘completed’.",
    "topic": "Tense - Present Perfect"
  },
  {
    "question": "When I reached the station the train had already left in Practice Case 11",
    "options": [
      "When I reached",
      "the station",
      "the train had already left in Practice Case 11",
      "No error"
    ],
    "answer": "No error",
    "explanation": "The sentence is correct. Earlier past action uses past perfect.",
    "topic": "Tense - No Error"
  },
  {
    "question": "By next month she will complete the course for SSC CPO",
    "options": [
      "By next month",
      "she will complete",
      "the course for SSC CPO",
      "No error"
    ],
    "answer": "she will complete",
    "explanation": "With ‘by + future time’ showing completion before that time, use future perfect: ‘will have completed’.",
    "topic": "Tense - Future Perfect"
  },
  {
    "question": "He is knowing the answer in Practice Case 13",
    "options": [
      "He is knowing",
      "the answer",
      "in Practice Case 13",
      "No error"
    ],
    "answer": "He is knowing",
    "explanation": "Stative verbs like ‘know’ are generally not used in continuous form. Correct: ‘He knows’.",
    "topic": "Tense - Stative"
  },
  {
    "question": "The clerk has been working here for five years in Practice Case 14",
    "options": [
      "The clerk",
      "has been working",
      "here for five years in Practice Case 14",
      "No error"
    ],
    "answer": "No error",
    "explanation": "The sentence is correct. Present perfect continuous shows an action continuing from past to present.",
    "topic": "Tense - No Error"
  },
  {
    "question": "I did not knew the answer in Practice Case 15",
    "options": [
      "I did not knew",
      "the answer",
      "in Practice Case 15",
      "No error"
    ],
    "answer": "I did not knew",
    "explanation": "After ‘did not’, use base verb. Correct: ‘did not know’.",
    "topic": "Tense - Did + V1"
  },
  {
    "question": "She will be reach the office before 10 a.m. in Practice Case 16",
    "options": [
      "She will be reach",
      "the office",
      "before 10 a.m. in Practice Case 16",
      "No error"
    ],
    "answer": "She will be reach",
    "explanation": "Use simple future ‘will reach’, not ‘will be reach’.",
    "topic": "Tense - Future"
  },
  {
    "question": "I am living in Gurugram since 2020 in Practice Case 17",
    "options": [
      "I am living",
      "in Gurugram",
      "since 2020 in Practice Case 17",
      "No error"
    ],
    "answer": "I am living",
    "explanation": "With ‘since’ for an action continuing to the present, use present perfect continuous: ‘have been living’.",
    "topic": "Tense - Since"
  },
  {
    "question": "He has completed the project yesterday in Practice Case 18",
    "options": [
      "He has completed",
      "the project",
      "yesterday in Practice Case 18",
      "No error"
    ],
    "answer": "He has completed",
    "explanation": "Present perfect is not used with definite past time like ‘yesterday’. Use simple past: ‘completed’.",
    "topic": "Tense - Present Perfect"
  },
  {
    "question": "When I reached the station the train had already left in Practice Case 19",
    "options": [
      "When I reached",
      "the station",
      "the train had already left in Practice Case 19",
      "No error"
    ],
    "answer": "No error",
    "explanation": "The sentence is correct. Earlier past action uses past perfect.",
    "topic": "Tense - No Error"
  },
  {
    "question": "By next month she will complete the course for CDS",
    "options": [
      "By next month",
      "she will complete",
      "the course for CDS",
      "No error"
    ],
    "answer": "she will complete",
    "explanation": "With ‘by + future time’ showing completion before that time, use future perfect: ‘will have completed’.",
    "topic": "Tense - Future Perfect"
  },
  {
    "question": "He is knowing the answer in Practice Case 21",
    "options": [
      "He is knowing",
      "the answer",
      "in Practice Case 21",
      "No error"
    ],
    "answer": "He is knowing",
    "explanation": "Stative verbs like ‘know’ are generally not used in continuous form. Correct: ‘He knows’.",
    "topic": "Tense - Stative"
  },
  {
    "question": "The clerk has been working here for five years in Practice Case 22",
    "options": [
      "The clerk",
      "has been working",
      "here for five years in Practice Case 22",
      "No error"
    ],
    "answer": "No error",
    "explanation": "The sentence is correct. Present perfect continuous shows an action continuing from past to present.",
    "topic": "Tense - No Error"
  },
  {
    "question": "I did not knew the answer in Practice Case 23",
    "options": [
      "I did not knew",
      "the answer",
      "in Practice Case 23",
      "No error"
    ],
    "answer": "I did not knew",
    "explanation": "After ‘did not’, use base verb. Correct: ‘did not know’.",
    "topic": "Tense - Did + V1"
  },
  {
    "question": "She will be reach the office before 10 a.m. in Practice Case 24",
    "options": [
      "She will be reach",
      "the office",
      "before 10 a.m. in Practice Case 24",
      "No error"
    ],
    "answer": "She will be reach",
    "explanation": "Use simple future ‘will reach’, not ‘will be reach’.",
    "topic": "Tense - Future"
  },
  {
    "question": "I am living in Kanpur since 2020 in Practice Case 25",
    "options": [
      "I am living",
      "in Kanpur",
      "since 2020 in Practice Case 25",
      "No error"
    ],
    "answer": "I am living",
    "explanation": "With ‘since’ for an action continuing to the present, use present perfect continuous: ‘have been living’.",
    "topic": "Tense - Since"
  },
  {
    "question": "He has completed the file yesterday in Practice Case 26",
    "options": [
      "He has completed",
      "the file",
      "yesterday in Practice Case 26",
      "No error"
    ],
    "answer": "He has completed",
    "explanation": "Present perfect is not used with definite past time like ‘yesterday’. Use simple past: ‘completed’.",
    "topic": "Tense - Present Perfect"
  },
  {
    "question": "When I reached the station the train had already left in Practice Case 27",
    "options": [
      "When I reached",
      "the station",
      "the train had already left in Practice Case 27",
      "No error"
    ],
    "answer": "No error",
    "explanation": "The sentence is correct. Earlier past action uses past perfect.",
    "topic": "Tense - No Error"
  },
  {
    "question": "By next month she will complete the course for UP Lekhpal",
    "options": [
      "By next month",
      "she will complete",
      "the course for UP Lekhpal",
      "No error"
    ],
    "answer": "she will complete",
    "explanation": "With ‘by + future time’ showing completion before that time, use future perfect: ‘will have completed’.",
    "topic": "Tense - Future Perfect"
  },
  {
    "question": "He is knowing the answer in Practice Case 29",
    "options": [
      "He is knowing",
      "the answer",
      "in Practice Case 29",
      "No error"
    ],
    "answer": "He is knowing",
    "explanation": "Stative verbs like ‘know’ are generally not used in continuous form. Correct: ‘He knows’.",
    "topic": "Tense - Stative"
  },
  {
    "question": "The clerk has been working here for five years in Practice Case 30",
    "options": [
      "The clerk",
      "has been working",
      "here for five years in Practice Case 30",
      "No error"
    ],
    "answer": "No error",
    "explanation": "The sentence is correct. Present perfect continuous shows an action continuing from past to present.",
    "topic": "Tense - No Error"
  },
  {
    "question": "I did not knew the answer in Practice Case 31",
    "options": [
      "I did not knew",
      "the answer",
      "in Practice Case 31",
      "No error"
    ],
    "answer": "I did not knew",
    "explanation": "After ‘did not’, use base verb. Correct: ‘did not know’.",
    "topic": "Tense - Did + V1"
  },
  {
    "question": "She will be reach the office before 10 a.m. in Practice Case 32",
    "options": [
      "She will be reach",
      "the office",
      "before 10 a.m. in Practice Case 32",
      "No error"
    ],
    "answer": "She will be reach",
    "explanation": "Use simple future ‘will reach’, not ‘will be reach’.",
    "topic": "Tense - Future"
  },
  {
    "question": "I am living in Varanasi since 2020 in Practice Case 33",
    "options": [
      "I am living",
      "in Varanasi",
      "since 2020 in Practice Case 33",
      "No error"
    ],
    "answer": "I am living",
    "explanation": "With ‘since’ for an action continuing to the present, use present perfect continuous: ‘have been living’.",
    "topic": "Tense - Since"
  },
  {
    "question": "He has completed the letter yesterday in Practice Case 34",
    "options": [
      "He has completed",
      "the letter",
      "yesterday in Practice Case 34",
      "No error"
    ],
    "answer": "He has completed",
    "explanation": "Present perfect is not used with definite past time like ‘yesterday’. Use simple past: ‘completed’.",
    "topic": "Tense - Present Perfect"
  },
  {
    "question": "When I reached the station the train had already left in Practice Case 35",
    "options": [
      "When I reached",
      "the station",
      "the train had already left in Practice Case 35",
      "No error"
    ],
    "answer": "No error",
    "explanation": "The sentence is correct. Earlier past action uses past perfect.",
    "topic": "Tense - No Error"
  },
  {
    "question": "By next month she will complete the course for Bank Clerk",
    "options": [
      "By next month",
      "she will complete",
      "the course for Bank Clerk",
      "No error"
    ],
    "answer": "she will complete",
    "explanation": "With ‘by + future time’ showing completion before that time, use future perfect: ‘will have completed’.",
    "topic": "Tense - Future Perfect"
  },
  {
    "question": "He is knowing the answer in Practice Case 37",
    "options": [
      "He is knowing",
      "the answer",
      "in Practice Case 37",
      "No error"
    ],
    "answer": "He is knowing",
    "explanation": "Stative verbs like ‘know’ are generally not used in continuous form. Correct: ‘He knows’.",
    "topic": "Tense - Stative"
  },
  {
    "question": "The clerk has been working here for five years in Practice Case 38",
    "options": [
      "The clerk",
      "has been working",
      "here for five years in Practice Case 38",
      "No error"
    ],
    "answer": "No error",
    "explanation": "The sentence is correct. Present perfect continuous shows an action continuing from past to present.",
    "topic": "Tense - No Error"
  },
  {
    "question": "I did not knew the answer in Practice Case 39",
    "options": [
      "I did not knew",
      "the answer",
      "in Practice Case 39",
      "No error"
    ],
    "answer": "I did not knew",
    "explanation": "After ‘did not’, use base verb. Correct: ‘did not know’.",
    "topic": "Tense - Did + V1"
  },
  {
    "question": "She will be reach the office before 10 a.m. in Practice Case 40",
    "options": [
      "She will be reach",
      "the office",
      "before 10 a.m. in Practice Case 40",
      "No error"
    ],
    "answer": "She will be reach",
    "explanation": "Use simple future ‘will reach’, not ‘will be reach’.",
    "topic": "Tense - Future"
  },
  {
    "question": "I am living in Jaipur since 2020 in Practice Case 41",
    "options": [
      "I am living",
      "in Jaipur",
      "since 2020 in Practice Case 41",
      "No error"
    ],
    "answer": "I am living",
    "explanation": "With ‘since’ for an action continuing to the present, use present perfect continuous: ‘have been living’.",
    "topic": "Tense - Since"
  },
  {
    "question": "He has completed the document yesterday in Practice Case 42",
    "options": [
      "He has completed",
      "the document",
      "yesterday in Practice Case 42",
      "No error"
    ],
    "answer": "He has completed",
    "explanation": "Present perfect is not used with definite past time like ‘yesterday’. Use simple past: ‘completed’.",
    "topic": "Tense - Present Perfect"
  },
  {
    "question": "When I reached the station the train had already left in Practice Case 43",
    "options": [
      "When I reached",
      "the station",
      "the train had already left in Practice Case 43",
      "No error"
    ],
    "answer": "No error",
    "explanation": "The sentence is correct. Earlier past action uses past perfect.",
    "topic": "Tense - No Error"
  },
  {
    "question": "He is knowing the answer in Practice Case 45",
    "options": [
      "He is knowing",
      "the answer",
      "in Practice Case 45",
      "No error"
    ],
    "answer": "He is knowing",
    "explanation": "Stative verbs like ‘know’ are generally not used in continuous form. Correct: ‘He knows’.",
    "topic": "Tense - Stative"
  },
  {
    "question": "The clerk has been working here for five years in Practice Case 46",
    "options": [
      "The clerk",
      "has been working",
      "here for five years in Practice Case 46",
      "No error"
    ],
    "answer": "No error",
    "explanation": "The sentence is correct. Present perfect continuous shows an action continuing from past to present.",
    "topic": "Tense - No Error"
  },
  {
    "question": "I did not knew the answer in Practice Case 47",
    "options": [
      "I did not knew",
      "the answer",
      "in Practice Case 47",
      "No error"
    ],
    "answer": "I did not knew",
    "explanation": "After ‘did not’, use base verb. Correct: ‘did not know’.",
    "topic": "Tense - Did + V1"
  },
  {
    "question": "She will be reach the office before 10 a.m. in Practice Case 48",
    "options": [
      "She will be reach",
      "the office",
      "before 10 a.m. in Practice Case 48",
      "No error"
    ],
    "answer": "She will be reach",
    "explanation": "Use simple future ‘will reach’, not ‘will be reach’.",
    "topic": "Tense - Future"
  },
  {
    "question": "I am living in Gwalior since 2020 in Practice Case 49",
    "options": [
      "I am living",
      "in Gwalior",
      "since 2020 in Practice Case 49",
      "No error"
    ],
    "answer": "I am living",
    "explanation": "With ‘since’ for an action continuing to the present, use present perfect continuous: ‘have been living’.",
    "topic": "Tense - Since"
  },
  {
    "question": "He has completed the proposal yesterday in Practice Case 50",
    "options": [
      "He has completed",
      "the proposal",
      "yesterday in Practice Case 50",
      "No error"
    ],
    "answer": "He has completed",
    "explanation": "Present perfect is not used with definite past time like ‘yesterday’. Use simple past: ‘completed’.",
    "topic": "Tense - Present Perfect"
  },
  {
    "question": "When I reached the station the train had already left in Practice Case 51",
    "options": [
      "When I reached",
      "the station",
      "the train had already left in Practice Case 51",
      "No error"
    ],
    "answer": "No error",
    "explanation": "The sentence is correct. Earlier past action uses past perfect.",
    "topic": "Tense - No Error"
  }
];

export default quizData;
