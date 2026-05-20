const quizData = [
  {
    "question": "Aarav is more wiser than his classmates in Practice Case 1",
    "options": [
      "Aarav is",
      "more wiser than",
      "his classmates in Practice Case 1",
      "No error"
    ],
    "answer": "more wiser than",
    "explanation": "‘Wiser’ is already comparative; ‘more wiser’ is a double comparative. Correct phrase: ‘wiser than’.",
    "topic": "Adjective - Double Comparative"
  },
  {
    "question": "The climate of Mumbai is cooler than Indore in Practice Case 2",
    "options": [
      "The climate of Mumbai",
      "is cooler",
      "than Indore in Practice Case 2",
      "No error"
    ],
    "answer": "than Indore in Practice Case 2",
    "explanation": "Compare climate with climate, not with a place. Correct phrase: ‘than that of Indore’.",
    "topic": "Adjective - Logical Comparison"
  },
  {
    "question": "He bought a black small bag for Practice Case 3",
    "options": [
      "He bought",
      "a black small bag",
      "for Practice Case 3",
      "No error"
    ],
    "answer": "a black small bag",
    "explanation": "Adjective order normally places size before colour. Correct phrase: ‘a small black bag’.",
    "topic": "Adjective - Order of Adjectives"
  },
  {
    "question": "Only little questions were ready for Practice Case 4",
    "options": [
      "Only little questions",
      "were ready",
      "for Practice Case 4",
      "No error"
    ],
    "answer": "Only little questions",
    "explanation": "‘questions’ is plural countable; use ‘few/a few’, not ‘little’. Correct phrase: ‘Only a few questions’.",
    "topic": "Adjective - Few/Little"
  },
  {
    "question": "This is the most unique method in Practice Case 5",
    "options": [
      "This is",
      "the most unique method",
      "in Practice Case 5",
      "No error"
    ],
    "answer": "the most unique method",
    "explanation": "‘Unique’ is absolute in meaning; avoid ‘most unique’. Correct phrase: ‘a unique method’.",
    "topic": "Adjective - Absolute Adjective"
  },
  {
    "question": "Neha is enough confident to attempt Bank Clerk",
    "options": [
      "Neha is",
      "enough confident",
      "to attempt Bank Clerk",
      "No error"
    ],
    "answer": "enough confident",
    "explanation": "‘Enough’ comes after adjectives. Correct phrase: ‘confident enough’.",
    "topic": "Adjective - Enough Position"
  },
  {
    "question": "Every mistakes must carry the admit card in Practice Case 7",
    "options": [
      "Every mistakes",
      "must carry",
      "the admit card in Practice Case 7",
      "No error"
    ],
    "answer": "Every mistakes",
    "explanation": "‘Every’ is followed by a singular countable noun. Correct: ‘Every student/candidate’.",
    "topic": "Adjective - Distributive"
  },
  {
    "question": "He gave me many evidence during Practice Case 8",
    "options": [
      "He gave me",
      "many evidence",
      "during Practice Case 8",
      "No error"
    ],
    "answer": "many evidence",
    "explanation": "‘evidence’ is uncountable here, so ‘many’ is wrong. Use ‘much’ or ‘a lot of’.",
    "topic": "Adjective - Quantifier"
  },
  {
    "question": "Rohan is senior than me in Practice Case 9",
    "options": [
      "Rohan is",
      "senior than me",
      "in Practice Case 9",
      "No error"
    ],
    "answer": "senior than me",
    "explanation": "‘Senior’ takes ‘to’, not ‘than’. Correct phrase: ‘senior to me’.",
    "topic": "Adjective - Latin Comparative"
  },
  {
    "question": "The first three chapters are important for CDS",
    "options": [
      "The first three chapters",
      "are important",
      "for CDS",
      "No error"
    ],
    "answer": "No error",
    "explanation": "The sentence is correct. Ordinal + cardinal order is right in ‘first three’.",
    "topic": "Adjective - No Error"
  },
  {
    "question": "Nikhil is more wiser than his classmates in Practice Case 11",
    "options": [
      "Nikhil is",
      "more wiser than",
      "his classmates in Practice Case 11",
      "No error"
    ],
    "answer": "more wiser than",
    "explanation": "‘Wiser’ is already comparative; ‘more wiser’ is a double comparative. Correct phrase: ‘wiser than’.",
    "topic": "Adjective - Double Comparative"
  },
  {
    "question": "The climate of Pune is cooler than Delhi in Practice Case 12",
    "options": [
      "The climate of Pune",
      "is cooler",
      "than Delhi in Practice Case 12",
      "No error"
    ],
    "answer": "than Delhi in Practice Case 12",
    "explanation": "Compare climate with climate, not with a place. Correct phrase: ‘than that of Delhi’.",
    "topic": "Adjective - Logical Comparison"
  },
  {
    "question": "He bought a black small bag for Practice Case 13",
    "options": [
      "He bought",
      "a black small bag",
      "for Practice Case 13",
      "No error"
    ],
    "answer": "a black small bag",
    "explanation": "Adjective order normally places size before colour. Correct phrase: ‘a small black bag’.",
    "topic": "Adjective - Order of Adjectives"
  },
  {
    "question": "Only little candidates were ready for Practice Case 14",
    "options": [
      "Only little candidates",
      "were ready",
      "for Practice Case 14",
      "No error"
    ],
    "answer": "Only little candidates",
    "explanation": "‘candidates’ is plural countable; use ‘few/a few’, not ‘little’. Correct phrase: ‘Only a few candidates’.",
    "topic": "Adjective - Few/Little"
  },
  {
    "question": "This is the most unique method in Practice Case 15",
    "options": [
      "This is",
      "the most unique method",
      "in Practice Case 15",
      "No error"
    ],
    "answer": "the most unique method",
    "explanation": "‘Unique’ is absolute in meaning; avoid ‘most unique’. Correct phrase: ‘a unique method’.",
    "topic": "Adjective - Absolute Adjective"
  },
  {
    "question": "Meera is enough confident to attempt Bank Clerk",
    "options": [
      "Meera is",
      "enough confident",
      "to attempt Bank Clerk",
      "No error"
    ],
    "answer": "enough confident",
    "explanation": "‘Enough’ comes after adjectives. Correct phrase: ‘confident enough’.",
    "topic": "Adjective - Enough Position"
  },
  {
    "question": "Every officers must carry the admit card in Practice Case 17",
    "options": [
      "Every officers",
      "must carry",
      "the admit card in Practice Case 17",
      "No error"
    ],
    "answer": "Every officers",
    "explanation": "‘Every’ is followed by a singular countable noun. Correct: ‘Every student/candidate’.",
    "topic": "Adjective - Distributive"
  },
  {
    "question": "He gave me many homework during Practice Case 18",
    "options": [
      "He gave me",
      "many homework",
      "during Practice Case 18",
      "No error"
    ],
    "answer": "many homework",
    "explanation": "‘homework’ is uncountable here, so ‘many’ is wrong. Use ‘much’ or ‘a lot of’.",
    "topic": "Adjective - Quantifier"
  },
  {
    "question": "Gaurav is senior than me in Practice Case 19",
    "options": [
      "Gaurav is",
      "senior than me",
      "in Practice Case 19",
      "No error"
    ],
    "answer": "senior than me",
    "explanation": "‘Senior’ takes ‘to’, not ‘than’. Correct phrase: ‘senior to me’.",
    "topic": "Adjective - Latin Comparative"
  },
  {
    "question": "Varun is more wiser than his classmates in Practice Case 21",
    "options": [
      "Varun is",
      "more wiser than",
      "his classmates in Practice Case 21",
      "No error"
    ],
    "answer": "more wiser than",
    "explanation": "‘Wiser’ is already comparative; ‘more wiser’ is a double comparative. Correct phrase: ‘wiser than’.",
    "topic": "Adjective - Double Comparative"
  },
  {
    "question": "The climate of Agra is cooler than Chennai in Practice Case 22",
    "options": [
      "The climate of Agra",
      "is cooler",
      "than Chennai in Practice Case 22",
      "No error"
    ],
    "answer": "than Chennai in Practice Case 22",
    "explanation": "Compare climate with climate, not with a place. Correct phrase: ‘than that of Chennai’.",
    "topic": "Adjective - Logical Comparison"
  },
  {
    "question": "He bought a black small bag for Practice Case 23",
    "options": [
      "He bought",
      "a black small bag",
      "for Practice Case 23",
      "No error"
    ],
    "answer": "a black small bag",
    "explanation": "Adjective order normally places size before colour. Correct phrase: ‘a small black bag’.",
    "topic": "Adjective - Order of Adjectives"
  },
  {
    "question": "Only little teachers were ready for Practice Case 24",
    "options": [
      "Only little teachers",
      "were ready",
      "for Practice Case 24",
      "No error"
    ],
    "answer": "Only little teachers",
    "explanation": "‘teachers’ is plural countable; use ‘few/a few’, not ‘little’. Correct phrase: ‘Only a few teachers’.",
    "topic": "Adjective - Few/Little"
  },
  {
    "question": "This is the most unique method in Practice Case 25",
    "options": [
      "This is",
      "the most unique method",
      "in Practice Case 25",
      "No error"
    ],
    "answer": "the most unique method",
    "explanation": "‘Unique’ is absolute in meaning; avoid ‘most unique’. Correct phrase: ‘a unique method’.",
    "topic": "Adjective - Absolute Adjective"
  },
  {
    "question": "Nisha is enough confident to attempt Bank Clerk",
    "options": [
      "Nisha is",
      "enough confident",
      "to attempt Bank Clerk",
      "No error"
    ],
    "answer": "enough confident",
    "explanation": "‘Enough’ comes after adjectives. Correct phrase: ‘confident enough’.",
    "topic": "Adjective - Enough Position"
  },
  {
    "question": "Every books must carry the admit card in Practice Case 27",
    "options": [
      "Every books",
      "must carry",
      "the admit card in Practice Case 27",
      "No error"
    ],
    "answer": "Every books",
    "explanation": "‘Every’ is followed by a singular countable noun. Correct: ‘Every student/candidate’.",
    "topic": "Adjective - Distributive"
  },
  {
    "question": "He gave me many equipment during Practice Case 28",
    "options": [
      "He gave me",
      "many equipment",
      "during Practice Case 28",
      "No error"
    ],
    "answer": "many equipment",
    "explanation": "‘equipment’ is uncountable here, so ‘many’ is wrong. Use ‘much’ or ‘a lot of’.",
    "topic": "Adjective - Quantifier"
  },
  {
    "question": "Harish is senior than me in Practice Case 29",
    "options": [
      "Harish is",
      "senior than me",
      "in Practice Case 29",
      "No error"
    ],
    "answer": "senior than me",
    "explanation": "‘Senior’ takes ‘to’, not ‘than’. Correct phrase: ‘senior to me’.",
    "topic": "Adjective - Latin Comparative"
  },
  {
    "question": "Aarav is more wiser than his classmates in Practice Case 31",
    "options": [
      "Aarav is",
      "more wiser than",
      "his classmates in Practice Case 31",
      "No error"
    ],
    "answer": "more wiser than",
    "explanation": "‘Wiser’ is already comparative; ‘more wiser’ is a double comparative. Correct phrase: ‘wiser than’.",
    "topic": "Adjective - Double Comparative"
  },
  {
    "question": "The climate of Meerut is cooler than Patna in Practice Case 32",
    "options": [
      "The climate of Meerut",
      "is cooler",
      "than Patna in Practice Case 32",
      "No error"
    ],
    "answer": "than Patna in Practice Case 32",
    "explanation": "Compare climate with climate, not with a place. Correct phrase: ‘than that of Patna’.",
    "topic": "Adjective - Logical Comparison"
  },
  {
    "question": "He bought a black small bag for Practice Case 33",
    "options": [
      "He bought",
      "a black small bag",
      "for Practice Case 33",
      "No error"
    ],
    "answer": "a black small bag",
    "explanation": "Adjective order normally places size before colour. Correct phrase: ‘a small black bag’.",
    "topic": "Adjective - Order of Adjectives"
  },
  {
    "question": "Only little workers were ready for Practice Case 34",
    "options": [
      "Only little workers",
      "were ready",
      "for Practice Case 34",
      "No error"
    ],
    "answer": "Only little workers",
    "explanation": "‘workers’ is plural countable; use ‘few/a few’, not ‘little’. Correct phrase: ‘Only a few workers’.",
    "topic": "Adjective - Few/Little"
  },
  {
    "question": "This is the most unique method in Practice Case 35",
    "options": [
      "This is",
      "the most unique method",
      "in Practice Case 35",
      "No error"
    ],
    "answer": "the most unique method",
    "explanation": "‘Unique’ is absolute in meaning; avoid ‘most unique’. Correct phrase: ‘a unique method’.",
    "topic": "Adjective - Absolute Adjective"
  },
  {
    "question": "Every students must carry the admit card in Practice Case 37",
    "options": [
      "Every students",
      "must carry",
      "the admit card in Practice Case 37",
      "No error"
    ],
    "answer": "Every students",
    "explanation": "‘Every’ is followed by a singular countable noun. Correct: ‘Every student/candidate’.",
    "topic": "Adjective - Distributive"
  },
  {
    "question": "He gave me many advice during Practice Case 38",
    "options": [
      "He gave me",
      "many advice",
      "during Practice Case 38",
      "No error"
    ],
    "answer": "many advice",
    "explanation": "‘advice’ is uncountable here, so ‘many’ is wrong. Use ‘much’ or ‘a lot of’.",
    "topic": "Adjective - Quantifier"
  },
  {
    "question": "Rohan is senior than me in Practice Case 39",
    "options": [
      "Rohan is",
      "senior than me",
      "in Practice Case 39",
      "No error"
    ],
    "answer": "senior than me",
    "explanation": "‘Senior’ takes ‘to’, not ‘than’. Correct phrase: ‘senior to me’.",
    "topic": "Adjective - Latin Comparative"
  },
  {
    "question": "Nikhil is more wiser than his classmates in Practice Case 41",
    "options": [
      "Nikhil is",
      "more wiser than",
      "his classmates in Practice Case 41",
      "No error"
    ],
    "answer": "more wiser than",
    "explanation": "‘Wiser’ is already comparative; ‘more wiser’ is a double comparative. Correct phrase: ‘wiser than’.",
    "topic": "Adjective - Double Comparative"
  },
  {
    "question": "The climate of Lucknow is cooler than Gwalior in Practice Case 42",
    "options": [
      "The climate of Lucknow",
      "is cooler",
      "than Gwalior in Practice Case 42",
      "No error"
    ],
    "answer": "than Gwalior in Practice Case 42",
    "explanation": "Compare climate with climate, not with a place. Correct phrase: ‘than that of Gwalior’.",
    "topic": "Adjective - Logical Comparison"
  },
  {
    "question": "He bought a black small bag for Practice Case 43",
    "options": [
      "He bought",
      "a black small bag",
      "for Practice Case 43",
      "No error"
    ],
    "answer": "a black small bag",
    "explanation": "Adjective order normally places size before colour. Correct phrase: ‘a small black bag’.",
    "topic": "Adjective - Order of Adjectives"
  },
  {
    "question": "Only little answers were ready for Practice Case 44",
    "options": [
      "Only little answers",
      "were ready",
      "for Practice Case 44",
      "No error"
    ],
    "answer": "Only little answers",
    "explanation": "‘answers’ is plural countable; use ‘few/a few’, not ‘little’. Correct phrase: ‘Only a few answers’.",
    "topic": "Adjective - Few/Little"
  },
  {
    "question": "This is the most unique method in Practice Case 45",
    "options": [
      "This is",
      "the most unique method",
      "in Practice Case 45",
      "No error"
    ],
    "answer": "the most unique method",
    "explanation": "‘Unique’ is absolute in meaning; avoid ‘most unique’. Correct phrase: ‘a unique method’.",
    "topic": "Adjective - Absolute Adjective"
  },
  {
    "question": "Every players must carry the admit card in Practice Case 47",
    "options": [
      "Every players",
      "must carry",
      "the admit card in Practice Case 47",
      "No error"
    ],
    "answer": "Every players",
    "explanation": "‘Every’ is followed by a singular countable noun. Correct: ‘Every student/candidate’.",
    "topic": "Adjective - Distributive"
  },
  {
    "question": "He gave me many work during Practice Case 48",
    "options": [
      "He gave me",
      "many work",
      "during Practice Case 48",
      "No error"
    ],
    "answer": "many work",
    "explanation": "‘work’ is uncountable here, so ‘many’ is wrong. Use ‘much’ or ‘a lot of’.",
    "topic": "Adjective - Quantifier"
  },
  {
    "question": "Gaurav is senior than me in Practice Case 49",
    "options": [
      "Gaurav is",
      "senior than me",
      "in Practice Case 49",
      "No error"
    ],
    "answer": "senior than me",
    "explanation": "‘Senior’ takes ‘to’, not ‘than’. Correct phrase: ‘senior to me’.",
    "topic": "Adjective - Latin Comparative"
  },
  {
    "question": "Varun is more wiser than his classmates in Practice Case 51",
    "options": [
      "Varun is",
      "more wiser than",
      "his classmates in Practice Case 51",
      "No error"
    ],
    "answer": "more wiser than",
    "explanation": "‘Wiser’ is already comparative; ‘more wiser’ is a double comparative. Correct phrase: ‘wiser than’.",
    "topic": "Adjective - Double Comparative"
  },
  {
    "question": "The climate of Noida is cooler than Jaipur in Practice Case 52",
    "options": [
      "The climate of Noida",
      "is cooler",
      "than Jaipur in Practice Case 52",
      "No error"
    ],
    "answer": "than Jaipur in Practice Case 52",
    "explanation": "Compare climate with climate, not with a place. Correct phrase: ‘than that of Jaipur’.",
    "topic": "Adjective - Logical Comparison"
  },
  {
    "question": "He bought a black small bag for Practice Case 53",
    "options": [
      "He bought",
      "a black small bag",
      "for Practice Case 53",
      "No error"
    ],
    "answer": "a black small bag",
    "explanation": "Adjective order normally places size before colour. Correct phrase: ‘a small black bag’.",
    "topic": "Adjective - Order of Adjectives"
  },
  {
    "question": "Only little applications were ready for Practice Case 54",
    "options": [
      "Only little applications",
      "were ready",
      "for Practice Case 54",
      "No error"
    ],
    "answer": "Only little applications",
    "explanation": "‘applications’ is plural countable; use ‘few/a few’, not ‘little’. Correct phrase: ‘Only a few applications’.",
    "topic": "Adjective - Few/Little"
  },
  {
    "question": "This is the most unique method in Practice Case 55",
    "options": [
      "This is",
      "the most unique method",
      "in Practice Case 55",
      "No error"
    ],
    "answer": "the most unique method",
    "explanation": "‘Unique’ is absolute in meaning; avoid ‘most unique’. Correct phrase: ‘a unique method’.",
    "topic": "Adjective - Absolute Adjective"
  },
  {
    "question": "Every documents must carry the admit card in Practice Case 57",
    "options": [
      "Every documents",
      "must carry",
      "the admit card in Practice Case 57",
      "No error"
    ],
    "answer": "Every documents",
    "explanation": "‘Every’ is followed by a singular countable noun. Correct: ‘Every student/candidate’.",
    "topic": "Adjective - Distributive"
  }
];

export default quizData;
