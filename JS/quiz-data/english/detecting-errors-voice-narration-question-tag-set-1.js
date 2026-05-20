const quizData = [
  {
    "question": "The report has been submit by Aarav in Practice Case 1",
    "options": [
      "The report",
      "has been submit",
      "by Aarav in Practice Case 1",
      "No error"
    ],
    "answer": "has been submit",
    "explanation": "In passive voice after ‘has been’, use V3. Correct phrase: ‘has been submitted’.",
    "topic": "Voice - Passive"
  },
  {
    "question": "The work was completed by the clerk in Practice Case 2",
    "options": [
      "The work",
      "was completed",
      "by the clerk in Practice Case 2",
      "No error"
    ],
    "answer": "No error",
    "explanation": "The sentence is correct passive voice: object + was + V3 + by + doer.",
    "topic": "Voice - No Error"
  },
  {
    "question": "He said that he is preparing for Railway Group D",
    "options": [
      "He said",
      "that he is",
      "preparing for Railway Group D",
      "No error"
    ],
    "answer": "that he is",
    "explanation": "With past reporting verb ‘said’, present continuous usually changes to past continuous: ‘he was preparing’.",
    "topic": "Narration - Backshift"
  },
  {
    "question": "The officer asked me where did I live in Agra",
    "options": [
      "The officer asked",
      "me where",
      "did I live in Agra",
      "No error"
    ],
    "answer": "did I live in Agra",
    "explanation": "Indirect questions use statement order, not question order. Correct: ‘where I lived’.",
    "topic": "Narration - Indirect Question"
  },
  {
    "question": "You are ready for the test are you?",
    "options": [
      "You are ready",
      "for the test",
      "are you?",
      "No error"
    ],
    "answer": "are you?",
    "explanation": "A positive statement takes a negative tag. Correct tag: ‘aren’t you?’",
    "topic": "Question Tag"
  },
  {
    "question": "Let us begin the revision shall we?",
    "options": [
      "Let us begin",
      "the revision",
      "shall we?",
      "No error"
    ],
    "answer": "No error",
    "explanation": "The sentence is correct. With suggestion ‘Let us’, the tag is ‘shall we?’",
    "topic": "Question Tag - No Error"
  },
  {
    "question": "The mistake was made by carelessness in Practice Case 7",
    "options": [
      "The mistake",
      "was made",
      "by carelessness in Practice Case 7",
      "No error"
    ],
    "answer": "by carelessness in Practice Case 7",
    "explanation": "‘By’ introduces an agent. For cause, use ‘because of carelessness’ or ‘through carelessness’.",
    "topic": "Voice - Agent"
  },
  {
    "question": "Pooja said I have completed the assignment",
    "options": [
      "Pooja said",
      "I have completed",
      "the assignment",
      "No error"
    ],
    "answer": "No error",
    "explanation": "As direct speech, the sentence is correct. Tense change is needed only when converting into indirect speech.",
    "topic": "Narration - No Error"
  },
  {
    "question": "The speech has been submit by Rohan in Practice Case 9",
    "options": [
      "The speech",
      "has been submit",
      "by Rohan in Practice Case 9",
      "No error"
    ],
    "answer": "has been submit",
    "explanation": "In passive voice after ‘has been’, use V3. Correct phrase: ‘has been submitted’.",
    "topic": "Voice - Passive"
  },
  {
    "question": "The work was completed by the clerk in Practice Case 10",
    "options": [
      "The work",
      "was completed",
      "by the clerk in Practice Case 10",
      "No error"
    ],
    "answer": "No error",
    "explanation": "The sentence is correct passive voice: object + was + V3 + by + doer.",
    "topic": "Voice - No Error"
  },
  {
    "question": "He said that he is preparing for SSC CGL",
    "options": [
      "He said",
      "that he is",
      "preparing for SSC CGL",
      "No error"
    ],
    "answer": "that he is",
    "explanation": "With past reporting verb ‘said’, present continuous usually changes to past continuous: ‘he was preparing’.",
    "topic": "Narration - Backshift"
  },
  {
    "question": "The officer asked me where did I live in Pune",
    "options": [
      "The officer asked",
      "me where",
      "did I live in Pune",
      "No error"
    ],
    "answer": "did I live in Pune",
    "explanation": "Indirect questions use statement order, not question order. Correct: ‘where I lived’.",
    "topic": "Narration - Indirect Question"
  },
  {
    "question": "The mistake was made by carelessness in Practice Case 15",
    "options": [
      "The mistake",
      "was made",
      "by carelessness in Practice Case 15",
      "No error"
    ],
    "answer": "by carelessness in Practice Case 15",
    "explanation": "‘By’ introduces an agent. For cause, use ‘because of carelessness’ or ‘through carelessness’.",
    "topic": "Voice - Agent"
  },
  {
    "question": "Meera said I have completed the assignment",
    "options": [
      "Meera said",
      "I have completed",
      "the assignment",
      "No error"
    ],
    "answer": "No error",
    "explanation": "As direct speech, the sentence is correct. Tense change is needed only when converting into indirect speech.",
    "topic": "Narration - No Error"
  },
  {
    "question": "The application has been submit by Rahul in Practice Case 17",
    "options": [
      "The application",
      "has been submit",
      "by Rahul in Practice Case 17",
      "No error"
    ],
    "answer": "has been submit",
    "explanation": "In passive voice after ‘has been’, use V3. Correct phrase: ‘has been submitted’.",
    "topic": "Voice - Passive"
  },
  {
    "question": "The work was completed by the clerk in Practice Case 18",
    "options": [
      "The work",
      "was completed",
      "by the clerk in Practice Case 18",
      "No error"
    ],
    "answer": "No error",
    "explanation": "The sentence is correct passive voice: object + was + V3 + by + doer.",
    "topic": "Voice - No Error"
  },
  {
    "question": "He said that he is preparing for Stenographer",
    "options": [
      "He said",
      "that he is",
      "preparing for Stenographer",
      "No error"
    ],
    "answer": "that he is",
    "explanation": "With past reporting verb ‘said’, present continuous usually changes to past continuous: ‘he was preparing’.",
    "topic": "Narration - Backshift"
  },
  {
    "question": "The officer asked me where did I live in Mumbai",
    "options": [
      "The officer asked",
      "me where",
      "did I live in Mumbai",
      "No error"
    ],
    "answer": "did I live in Mumbai",
    "explanation": "Indirect questions use statement order, not question order. Correct: ‘where I lived’.",
    "topic": "Narration - Indirect Question"
  },
  {
    "question": "The mistake was made by carelessness in Practice Case 23",
    "options": [
      "The mistake",
      "was made",
      "by carelessness in Practice Case 23",
      "No error"
    ],
    "answer": "by carelessness in Practice Case 23",
    "explanation": "‘By’ introduces an agent. For cause, use ‘because of carelessness’ or ‘through carelessness’.",
    "topic": "Voice - Agent"
  },
  {
    "question": "Pallavi said I have completed the assignment",
    "options": [
      "Pallavi said",
      "I have completed",
      "the assignment",
      "No error"
    ],
    "answer": "No error",
    "explanation": "As direct speech, the sentence is correct. Tense change is needed only when converting into indirect speech.",
    "topic": "Narration - No Error"
  },
  {
    "question": "The assignment has been submit by Akash in Practice Case 25",
    "options": [
      "The assignment",
      "has been submit",
      "by Akash in Practice Case 25",
      "No error"
    ],
    "answer": "has been submit",
    "explanation": "In passive voice after ‘has been’, use V3. Correct phrase: ‘has been submitted’.",
    "topic": "Voice - Passive"
  },
  {
    "question": "The work was completed by the clerk in Practice Case 26",
    "options": [
      "The work",
      "was completed",
      "by the clerk in Practice Case 26",
      "No error"
    ],
    "answer": "No error",
    "explanation": "The sentence is correct passive voice: object + was + V3 + by + doer.",
    "topic": "Voice - No Error"
  },
  {
    "question": "He said that he is preparing for Delhi Police",
    "options": [
      "He said",
      "that he is",
      "preparing for Delhi Police",
      "No error"
    ],
    "answer": "that he is",
    "explanation": "With past reporting verb ‘said’, present continuous usually changes to past continuous: ‘he was preparing’.",
    "topic": "Narration - Backshift"
  },
  {
    "question": "The officer asked me where did I live in Kolkata",
    "options": [
      "The officer asked",
      "me where",
      "did I live in Kolkata",
      "No error"
    ],
    "answer": "did I live in Kolkata",
    "explanation": "Indirect questions use statement order, not question order. Correct: ‘where I lived’.",
    "topic": "Narration - Indirect Question"
  },
  {
    "question": "The mistake was made by carelessness in Practice Case 31",
    "options": [
      "The mistake",
      "was made",
      "by carelessness in Practice Case 31",
      "No error"
    ],
    "answer": "by carelessness in Practice Case 31",
    "explanation": "‘By’ introduces an agent. For cause, use ‘because of carelessness’ or ‘through carelessness’.",
    "topic": "Voice - Agent"
  },
  {
    "question": "Ritika said I have completed the assignment",
    "options": [
      "Ritika said",
      "I have completed",
      "the assignment",
      "No error"
    ],
    "answer": "No error",
    "explanation": "As direct speech, the sentence is correct. Tense change is needed only when converting into indirect speech.",
    "topic": "Narration - No Error"
  },
  {
    "question": "The project has been submit by Mohit in Practice Case 33",
    "options": [
      "The project",
      "has been submit",
      "by Mohit in Practice Case 33",
      "No error"
    ],
    "answer": "has been submit",
    "explanation": "In passive voice after ‘has been’, use V3. Correct phrase: ‘has been submitted’.",
    "topic": "Voice - Passive"
  },
  {
    "question": "The work was completed by the clerk in Practice Case 34",
    "options": [
      "The work",
      "was completed",
      "by the clerk in Practice Case 34",
      "No error"
    ],
    "answer": "No error",
    "explanation": "The sentence is correct passive voice: object + was + V3 + by + doer.",
    "topic": "Voice - No Error"
  },
  {
    "question": "He said that he is preparing for CHSL",
    "options": [
      "He said",
      "that he is",
      "preparing for CHSL",
      "No error"
    ],
    "answer": "that he is",
    "explanation": "With past reporting verb ‘said’, present continuous usually changes to past continuous: ‘he was preparing’.",
    "topic": "Narration - Backshift"
  },
  {
    "question": "The officer asked me where did I live in Prayagraj",
    "options": [
      "The officer asked",
      "me where",
      "did I live in Prayagraj",
      "No error"
    ],
    "answer": "did I live in Prayagraj",
    "explanation": "Indirect questions use statement order, not question order. Correct: ‘where I lived’.",
    "topic": "Narration - Indirect Question"
  },
  {
    "question": "The mistake was made by carelessness in Practice Case 39",
    "options": [
      "The mistake",
      "was made",
      "by carelessness in Practice Case 39",
      "No error"
    ],
    "answer": "by carelessness in Practice Case 39",
    "explanation": "‘By’ introduces an agent. For cause, use ‘because of carelessness’ or ‘through carelessness’.",
    "topic": "Voice - Agent"
  },
  {
    "question": "Anjali said I have completed the assignment",
    "options": [
      "Anjali said",
      "I have completed",
      "the assignment",
      "No error"
    ],
    "answer": "No error",
    "explanation": "As direct speech, the sentence is correct. Tense change is needed only when converting into indirect speech.",
    "topic": "Narration - No Error"
  },
  {
    "question": "The file has been submit by Nikhil in Practice Case 41",
    "options": [
      "The file",
      "has been submit",
      "by Nikhil in Practice Case 41",
      "No error"
    ],
    "answer": "has been submit",
    "explanation": "In passive voice after ‘has been’, use V3. Correct phrase: ‘has been submitted’.",
    "topic": "Voice - Passive"
  },
  {
    "question": "The work was completed by the clerk in Practice Case 42",
    "options": [
      "The work",
      "was completed",
      "by the clerk in Practice Case 42",
      "No error"
    ],
    "answer": "No error",
    "explanation": "The sentence is correct passive voice: object + was + V3 + by + doer.",
    "topic": "Voice - No Error"
  },
  {
    "question": "The officer asked me where did I live in Bhopal",
    "options": [
      "The officer asked",
      "me where",
      "did I live in Bhopal",
      "No error"
    ],
    "answer": "did I live in Bhopal",
    "explanation": "Indirect questions use statement order, not question order. Correct: ‘where I lived’.",
    "topic": "Narration - Indirect Question"
  },
  {
    "question": "The mistake was made by carelessness in Practice Case 47",
    "options": [
      "The mistake",
      "was made",
      "by carelessness in Practice Case 47",
      "No error"
    ],
    "answer": "by carelessness in Practice Case 47",
    "explanation": "‘By’ introduces an agent. For cause, use ‘because of carelessness’ or ‘through carelessness’.",
    "topic": "Voice - Agent"
  },
  {
    "question": "Sunita said I have completed the assignment",
    "options": [
      "Sunita said",
      "I have completed",
      "the assignment",
      "No error"
    ],
    "answer": "No error",
    "explanation": "As direct speech, the sentence is correct. Tense change is needed only when converting into indirect speech.",
    "topic": "Narration - No Error"
  },
  {
    "question": "The letter has been submit by Gaurav in Practice Case 49",
    "options": [
      "The letter",
      "has been submit",
      "by Gaurav in Practice Case 49",
      "No error"
    ],
    "answer": "has been submit",
    "explanation": "In passive voice after ‘has been’, use V3. Correct phrase: ‘has been submitted’.",
    "topic": "Voice - Passive"
  },
  {
    "question": "The work was completed by the clerk in Practice Case 50",
    "options": [
      "The work",
      "was completed",
      "by the clerk in Practice Case 50",
      "No error"
    ],
    "answer": "No error",
    "explanation": "The sentence is correct passive voice: object + was + V3 + by + doer.",
    "topic": "Voice - No Error"
  },
  {
    "question": "The officer asked me where did I live in Noida",
    "options": [
      "The officer asked",
      "me where",
      "did I live in Noida",
      "No error"
    ],
    "answer": "did I live in Noida",
    "explanation": "Indirect questions use statement order, not question order. Correct: ‘where I lived’.",
    "topic": "Narration - Indirect Question"
  },
  {
    "question": "The mistake was made by carelessness in Practice Case 55",
    "options": [
      "The mistake",
      "was made",
      "by carelessness in Practice Case 55",
      "No error"
    ],
    "answer": "by carelessness in Practice Case 55",
    "explanation": "‘By’ introduces an agent. For cause, use ‘because of carelessness’ or ‘through carelessness’.",
    "topic": "Voice - Agent"
  },
  {
    "question": "Nisha said I have completed the assignment",
    "options": [
      "Nisha said",
      "I have completed",
      "the assignment",
      "No error"
    ],
    "answer": "No error",
    "explanation": "As direct speech, the sentence is correct. Tense change is needed only when converting into indirect speech.",
    "topic": "Narration - No Error"
  },
  {
    "question": "The document has been submit by Manoj in Practice Case 57",
    "options": [
      "The document",
      "has been submit",
      "by Manoj in Practice Case 57",
      "No error"
    ],
    "answer": "has been submit",
    "explanation": "In passive voice after ‘has been’, use V3. Correct phrase: ‘has been submitted’.",
    "topic": "Voice - Passive"
  },
  {
    "question": "The work was completed by the clerk in Practice Case 58",
    "options": [
      "The work",
      "was completed",
      "by the clerk in Practice Case 58",
      "No error"
    ],
    "answer": "No error",
    "explanation": "The sentence is correct passive voice: object + was + V3 + by + doer.",
    "topic": "Voice - No Error"
  },
  {
    "question": "The officer asked me where did I live in Lucknow",
    "options": [
      "The officer asked",
      "me where",
      "did I live in Lucknow",
      "No error"
    ],
    "answer": "did I live in Lucknow",
    "explanation": "Indirect questions use statement order, not question order. Correct: ‘where I lived’.",
    "topic": "Narration - Indirect Question"
  },
  {
    "question": "The mistake was made by carelessness in Practice Case 63",
    "options": [
      "The mistake",
      "was made",
      "by carelessness in Practice Case 63",
      "No error"
    ],
    "answer": "by carelessness in Practice Case 63",
    "explanation": "‘By’ introduces an agent. For cause, use ‘because of carelessness’ or ‘through carelessness’.",
    "topic": "Voice - Agent"
  },
  {
    "question": "Sanya said I have completed the assignment",
    "options": [
      "Sanya said",
      "I have completed",
      "the assignment",
      "No error"
    ],
    "answer": "No error",
    "explanation": "As direct speech, the sentence is correct. Tense change is needed only when converting into indirect speech.",
    "topic": "Narration - No Error"
  },
  {
    "question": "The proposal has been submit by Karan in Practice Case 65",
    "options": [
      "The proposal",
      "has been submit",
      "by Karan in Practice Case 65",
      "No error"
    ],
    "answer": "has been submit",
    "explanation": "In passive voice after ‘has been’, use V3. Correct phrase: ‘has been submitted’.",
    "topic": "Voice - Passive"
  },
  {
    "question": "The work was completed by the clerk in Practice Case 66",
    "options": [
      "The work",
      "was completed",
      "by the clerk in Practice Case 66",
      "No error"
    ],
    "answer": "No error",
    "explanation": "The sentence is correct passive voice: object + was + V3 + by + doer.",
    "topic": "Voice - No Error"
  },
  {
    "question": "The officer asked me where did I live in Meerut",
    "options": [
      "The officer asked",
      "me where",
      "did I live in Meerut",
      "No error"
    ],
    "answer": "did I live in Meerut",
    "explanation": "Indirect questions use statement order, not question order. Correct: ‘where I lived’.",
    "topic": "Narration - Indirect Question"
  }
];

export default quizData;
