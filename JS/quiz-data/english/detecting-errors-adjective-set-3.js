const quizData = [
  {
    "question": "He gave me many scenery during Practice Case 58",
    "options": [
      "He gave me",
      "many scenery",
      "during Practice Case 58",
      "No error"
    ],
    "answer": "many scenery",
    "explanation": "‘scenery’ is uncountable here, so ‘many’ is wrong. Use ‘much’ or ‘a lot of’.",
    "topic": "Adjective - Quantifier"
  },
  {
    "question": "Harish is senior than me in Practice Case 59",
    "options": [
      "Harish is",
      "senior than me",
      "in Practice Case 59",
      "No error"
    ],
    "answer": "senior than me",
    "explanation": "‘Senior’ takes ‘to’, not ‘than’. Correct phrase: ‘senior to me’.",
    "topic": "Adjective - Latin Comparative"
  },
  {
    "question": "Aarav is more wiser than his classmates in Practice Case 61",
    "options": [
      "Aarav is",
      "more wiser than",
      "his classmates in Practice Case 61",
      "No error"
    ],
    "answer": "more wiser than",
    "explanation": "‘Wiser’ is already comparative; ‘more wiser’ is a double comparative. Correct phrase: ‘wiser than’.",
    "topic": "Adjective - Double Comparative"
  },
  {
    "question": "The climate of Bhopal is cooler than Varanasi in Practice Case 62",
    "options": [
      "The climate of Bhopal",
      "is cooler",
      "than Varanasi in Practice Case 62",
      "No error"
    ],
    "answer": "than Varanasi in Practice Case 62",
    "explanation": "Compare climate with climate, not with a place. Correct phrase: ‘than that of Varanasi’.",
    "topic": "Adjective - Logical Comparison"
  },
  {
    "question": "He bought a black small bag for Practice Case 63",
    "options": [
      "He bought",
      "a black small bag",
      "for Practice Case 63",
      "No error"
    ],
    "answer": "a black small bag",
    "explanation": "Adjective order normally places size before colour. Correct phrase: ‘a small black bag’.",
    "topic": "Adjective - Order of Adjectives"
  },
  {
    "question": "Only little questions were ready for Practice Case 64",
    "options": [
      "Only little questions",
      "were ready",
      "for Practice Case 64",
      "No error"
    ],
    "answer": "Only little questions",
    "explanation": "‘questions’ is plural countable; use ‘few/a few’, not ‘little’. Correct phrase: ‘Only a few questions’.",
    "topic": "Adjective - Few/Little"
  },
  {
    "question": "This is the most unique method in Practice Case 65",
    "options": [
      "This is",
      "the most unique method",
      "in Practice Case 65",
      "No error"
    ],
    "answer": "the most unique method",
    "explanation": "‘Unique’ is absolute in meaning; avoid ‘most unique’. Correct phrase: ‘a unique method’.",
    "topic": "Adjective - Absolute Adjective"
  },
  {
    "question": "Every mistakes must carry the admit card in Practice Case 67",
    "options": [
      "Every mistakes",
      "must carry",
      "the admit card in Practice Case 67",
      "No error"
    ],
    "answer": "Every mistakes",
    "explanation": "‘Every’ is followed by a singular countable noun. Correct: ‘Every student/candidate’.",
    "topic": "Adjective - Distributive"
  },
  {
    "question": "He gave me many evidence during Practice Case 68",
    "options": [
      "He gave me",
      "many evidence",
      "during Practice Case 68",
      "No error"
    ],
    "answer": "many evidence",
    "explanation": "‘evidence’ is uncountable here, so ‘many’ is wrong. Use ‘much’ or ‘a lot of’.",
    "topic": "Adjective - Quantifier"
  },
  {
    "question": "Rohan is senior than me in Practice Case 69",
    "options": [
      "Rohan is",
      "senior than me",
      "in Practice Case 69",
      "No error"
    ],
    "answer": "senior than me",
    "explanation": "‘Senior’ takes ‘to’, not ‘than’. Correct phrase: ‘senior to me’.",
    "topic": "Adjective - Latin Comparative"
  },
  {
    "question": "Nikhil is more wiser than his classmates in Practice Case 71",
    "options": [
      "Nikhil is",
      "more wiser than",
      "his classmates in Practice Case 71",
      "No error"
    ],
    "answer": "more wiser than",
    "explanation": "‘Wiser’ is already comparative; ‘more wiser’ is a double comparative. Correct phrase: ‘wiser than’.",
    "topic": "Adjective - Double Comparative"
  },
  {
    "question": "The climate of Prayagraj is cooler than Kanpur in Practice Case 72",
    "options": [
      "The climate of Prayagraj",
      "is cooler",
      "than Kanpur in Practice Case 72",
      "No error"
    ],
    "answer": "than Kanpur in Practice Case 72",
    "explanation": "Compare climate with climate, not with a place. Correct phrase: ‘than that of Kanpur’.",
    "topic": "Adjective - Logical Comparison"
  },
  {
    "question": "He bought a black small bag for Practice Case 73",
    "options": [
      "He bought",
      "a black small bag",
      "for Practice Case 73",
      "No error"
    ],
    "answer": "a black small bag",
    "explanation": "Adjective order normally places size before colour. Correct phrase: ‘a small black bag’.",
    "topic": "Adjective - Order of Adjectives"
  },
  {
    "question": "Only little candidates were ready for Practice Case 74",
    "options": [
      "Only little candidates",
      "were ready",
      "for Practice Case 74",
      "No error"
    ],
    "answer": "Only little candidates",
    "explanation": "‘candidates’ is plural countable; use ‘few/a few’, not ‘little’. Correct phrase: ‘Only a few candidates’.",
    "topic": "Adjective - Few/Little"
  },
  {
    "question": "This is the most unique method in Practice Case 75",
    "options": [
      "This is",
      "the most unique method",
      "in Practice Case 75",
      "No error"
    ],
    "answer": "the most unique method",
    "explanation": "‘Unique’ is absolute in meaning; avoid ‘most unique’. Correct phrase: ‘a unique method’.",
    "topic": "Adjective - Absolute Adjective"
  },
  {
    "question": "Every officers must carry the admit card in Practice Case 77",
    "options": [
      "Every officers",
      "must carry",
      "the admit card in Practice Case 77",
      "No error"
    ],
    "answer": "Every officers",
    "explanation": "‘Every’ is followed by a singular countable noun. Correct: ‘Every student/candidate’.",
    "topic": "Adjective - Distributive"
  },
  {
    "question": "He gave me many homework during Practice Case 78",
    "options": [
      "He gave me",
      "many homework",
      "during Practice Case 78",
      "No error"
    ],
    "answer": "many homework",
    "explanation": "‘homework’ is uncountable here, so ‘many’ is wrong. Use ‘much’ or ‘a lot of’.",
    "topic": "Adjective - Quantifier"
  },
  {
    "question": "Gaurav is senior than me in Practice Case 79",
    "options": [
      "Gaurav is",
      "senior than me",
      "in Practice Case 79",
      "No error"
    ],
    "answer": "senior than me",
    "explanation": "‘Senior’ takes ‘to’, not ‘than’. Correct phrase: ‘senior to me’.",
    "topic": "Adjective - Latin Comparative"
  },
  {
    "question": "Varun is more wiser than his classmates in Practice Case 81",
    "options": [
      "Varun is",
      "more wiser than",
      "his classmates in Practice Case 81",
      "No error"
    ],
    "answer": "more wiser than",
    "explanation": "‘Wiser’ is already comparative; ‘more wiser’ is a double comparative. Correct phrase: ‘wiser than’.",
    "topic": "Adjective - Double Comparative"
  },
  {
    "question": "The climate of Kolkata is cooler than Gurugram in Practice Case 82",
    "options": [
      "The climate of Kolkata",
      "is cooler",
      "than Gurugram in Practice Case 82",
      "No error"
    ],
    "answer": "than Gurugram in Practice Case 82",
    "explanation": "Compare climate with climate, not with a place. Correct phrase: ‘than that of Gurugram’.",
    "topic": "Adjective - Logical Comparison"
  },
  {
    "question": "He bought a black small bag for Practice Case 83",
    "options": [
      "He bought",
      "a black small bag",
      "for Practice Case 83",
      "No error"
    ],
    "answer": "a black small bag",
    "explanation": "Adjective order normally places size before colour. Correct phrase: ‘a small black bag’.",
    "topic": "Adjective - Order of Adjectives"
  },
  {
    "question": "Only little teachers were ready for Practice Case 84",
    "options": [
      "Only little teachers",
      "were ready",
      "for Practice Case 84",
      "No error"
    ],
    "answer": "Only little teachers",
    "explanation": "‘teachers’ is plural countable; use ‘few/a few’, not ‘little’. Correct phrase: ‘Only a few teachers’.",
    "topic": "Adjective - Few/Little"
  },
  {
    "question": "This is the most unique method in Practice Case 85",
    "options": [
      "This is",
      "the most unique method",
      "in Practice Case 85",
      "No error"
    ],
    "answer": "the most unique method",
    "explanation": "‘Unique’ is absolute in meaning; avoid ‘most unique’. Correct phrase: ‘a unique method’.",
    "topic": "Adjective - Absolute Adjective"
  },
  {
    "question": "Every books must carry the admit card in Practice Case 87",
    "options": [
      "Every books",
      "must carry",
      "the admit card in Practice Case 87",
      "No error"
    ],
    "answer": "Every books",
    "explanation": "‘Every’ is followed by a singular countable noun. Correct: ‘Every student/candidate’.",
    "topic": "Adjective - Distributive"
  },
  {
    "question": "He gave me many equipment during Practice Case 88",
    "options": [
      "He gave me",
      "many equipment",
      "during Practice Case 88",
      "No error"
    ],
    "answer": "many equipment",
    "explanation": "‘equipment’ is uncountable here, so ‘many’ is wrong. Use ‘much’ or ‘a lot of’.",
    "topic": "Adjective - Quantifier"
  },
  {
    "question": "Harish is senior than me in Practice Case 89",
    "options": [
      "Harish is",
      "senior than me",
      "in Practice Case 89",
      "No error"
    ],
    "answer": "senior than me",
    "explanation": "‘Senior’ takes ‘to’, not ‘than’. Correct phrase: ‘senior to me’.",
    "topic": "Adjective - Latin Comparative"
  },
  {
    "question": "Aarav is more wiser than his classmates in Practice Case 91",
    "options": [
      "Aarav is",
      "more wiser than",
      "his classmates in Practice Case 91",
      "No error"
    ],
    "answer": "more wiser than",
    "explanation": "‘Wiser’ is already comparative; ‘more wiser’ is a double comparative. Correct phrase: ‘wiser than’.",
    "topic": "Adjective - Double Comparative"
  },
  {
    "question": "The climate of Mumbai is cooler than Indore in Practice Case 92",
    "options": [
      "The climate of Mumbai",
      "is cooler",
      "than Indore in Practice Case 92",
      "No error"
    ],
    "answer": "than Indore in Practice Case 92",
    "explanation": "Compare climate with climate, not with a place. Correct phrase: ‘than that of Indore’.",
    "topic": "Adjective - Logical Comparison"
  },
  {
    "question": "He bought a black small bag for Practice Case 93",
    "options": [
      "He bought",
      "a black small bag",
      "for Practice Case 93",
      "No error"
    ],
    "answer": "a black small bag",
    "explanation": "Adjective order normally places size before colour. Correct phrase: ‘a small black bag’.",
    "topic": "Adjective - Order of Adjectives"
  },
  {
    "question": "Only little workers were ready for Practice Case 94",
    "options": [
      "Only little workers",
      "were ready",
      "for Practice Case 94",
      "No error"
    ],
    "answer": "Only little workers",
    "explanation": "‘workers’ is plural countable; use ‘few/a few’, not ‘little’. Correct phrase: ‘Only a few workers’.",
    "topic": "Adjective - Few/Little"
  },
  {
    "question": "This is the most unique method in Practice Case 95",
    "options": [
      "This is",
      "the most unique method",
      "in Practice Case 95",
      "No error"
    ],
    "answer": "the most unique method",
    "explanation": "‘Unique’ is absolute in meaning; avoid ‘most unique’. Correct phrase: ‘a unique method’.",
    "topic": "Adjective - Absolute Adjective"
  },
  {
    "question": "Every students must carry the admit card in Practice Case 97",
    "options": [
      "Every students",
      "must carry",
      "the admit card in Practice Case 97",
      "No error"
    ],
    "answer": "Every students",
    "explanation": "‘Every’ is followed by a singular countable noun. Correct: ‘Every student/candidate’.",
    "topic": "Adjective - Distributive"
  },
  {
    "question": "He gave me many advice during Practice Case 98",
    "options": [
      "He gave me",
      "many advice",
      "during Practice Case 98",
      "No error"
    ],
    "answer": "many advice",
    "explanation": "‘advice’ is uncountable here, so ‘many’ is wrong. Use ‘much’ or ‘a lot of’.",
    "topic": "Adjective - Quantifier"
  },
  {
    "question": "Rohan is senior than me in Practice Case 99",
    "options": [
      "Rohan is",
      "senior than me",
      "in Practice Case 99",
      "No error"
    ],
    "answer": "senior than me",
    "explanation": "‘Senior’ takes ‘to’, not ‘than’. Correct phrase: ‘senior to me’.",
    "topic": "Adjective - Latin Comparative"
  },
  {
    "question": "Nikhil is more wiser than his classmates in Practice Case 101",
    "options": [
      "Nikhil is",
      "more wiser than",
      "his classmates in Practice Case 101",
      "No error"
    ],
    "answer": "more wiser than",
    "explanation": "‘Wiser’ is already comparative; ‘more wiser’ is a double comparative. Correct phrase: ‘wiser than’.",
    "topic": "Adjective - Double Comparative"
  },
  {
    "question": "The climate of Pune is cooler than Delhi in Practice Case 102",
    "options": [
      "The climate of Pune",
      "is cooler",
      "than Delhi in Practice Case 102",
      "No error"
    ],
    "answer": "than Delhi in Practice Case 102",
    "explanation": "Compare climate with climate, not with a place. Correct phrase: ‘than that of Delhi’.",
    "topic": "Adjective - Logical Comparison"
  },
  {
    "question": "He bought a black small bag for Practice Case 103",
    "options": [
      "He bought",
      "a black small bag",
      "for Practice Case 103",
      "No error"
    ],
    "answer": "a black small bag",
    "explanation": "Adjective order normally places size before colour. Correct phrase: ‘a small black bag’.",
    "topic": "Adjective - Order of Adjectives"
  },
  {
    "question": "Only little answers were ready for Practice Case 104",
    "options": [
      "Only little answers",
      "were ready",
      "for Practice Case 104",
      "No error"
    ],
    "answer": "Only little answers",
    "explanation": "‘answers’ is plural countable; use ‘few/a few’, not ‘little’. Correct phrase: ‘Only a few answers’.",
    "topic": "Adjective - Few/Little"
  },
  {
    "question": "This is the most unique method in Practice Case 105",
    "options": [
      "This is",
      "the most unique method",
      "in Practice Case 105",
      "No error"
    ],
    "answer": "the most unique method",
    "explanation": "‘Unique’ is absolute in meaning; avoid ‘most unique’. Correct phrase: ‘a unique method’.",
    "topic": "Adjective - Absolute Adjective"
  },
  {
    "question": "Every players must carry the admit card in Practice Case 107",
    "options": [
      "Every players",
      "must carry",
      "the admit card in Practice Case 107",
      "No error"
    ],
    "answer": "Every players",
    "explanation": "‘Every’ is followed by a singular countable noun. Correct: ‘Every student/candidate’.",
    "topic": "Adjective - Distributive"
  },
  {
    "question": "He gave me many work during Practice Case 108",
    "options": [
      "He gave me",
      "many work",
      "during Practice Case 108",
      "No error"
    ],
    "answer": "many work",
    "explanation": "‘work’ is uncountable here, so ‘many’ is wrong. Use ‘much’ or ‘a lot of’.",
    "topic": "Adjective - Quantifier"
  },
  {
    "question": "Gaurav is senior than me in Practice Case 109",
    "options": [
      "Gaurav is",
      "senior than me",
      "in Practice Case 109",
      "No error"
    ],
    "answer": "senior than me",
    "explanation": "‘Senior’ takes ‘to’, not ‘than’. Correct phrase: ‘senior to me’.",
    "topic": "Adjective - Latin Comparative"
  },
  {
    "question": "Varun is more wiser than his classmates in Practice Case 111",
    "options": [
      "Varun is",
      "more wiser than",
      "his classmates in Practice Case 111",
      "No error"
    ],
    "answer": "more wiser than",
    "explanation": "‘Wiser’ is already comparative; ‘more wiser’ is a double comparative. Correct phrase: ‘wiser than’.",
    "topic": "Adjective - Double Comparative"
  },
  {
    "question": "The climate of Agra is cooler than Chennai in Practice Case 112",
    "options": [
      "The climate of Agra",
      "is cooler",
      "than Chennai in Practice Case 112",
      "No error"
    ],
    "answer": "than Chennai in Practice Case 112",
    "explanation": "Compare climate with climate, not with a place. Correct phrase: ‘than that of Chennai’.",
    "topic": "Adjective - Logical Comparison"
  },
  {
    "question": "He bought a black small bag for Practice Case 113",
    "options": [
      "He bought",
      "a black small bag",
      "for Practice Case 113",
      "No error"
    ],
    "answer": "a black small bag",
    "explanation": "Adjective order normally places size before colour. Correct phrase: ‘a small black bag’.",
    "topic": "Adjective - Order of Adjectives"
  },
  {
    "question": "Only little applications were ready for Practice Case 114",
    "options": [
      "Only little applications",
      "were ready",
      "for Practice Case 114",
      "No error"
    ],
    "answer": "Only little applications",
    "explanation": "‘applications’ is plural countable; use ‘few/a few’, not ‘little’. Correct phrase: ‘Only a few applications’.",
    "topic": "Adjective - Few/Little"
  },
  {
    "question": "This is the most unique method in Practice Case 115",
    "options": [
      "This is",
      "the most unique method",
      "in Practice Case 115",
      "No error"
    ],
    "answer": "the most unique method",
    "explanation": "‘Unique’ is absolute in meaning; avoid ‘most unique’. Correct phrase: ‘a unique method’.",
    "topic": "Adjective - Absolute Adjective"
  },
  {
    "question": "Every documents must carry the admit card in Practice Case 117",
    "options": [
      "Every documents",
      "must carry",
      "the admit card in Practice Case 117",
      "No error"
    ],
    "answer": "Every documents",
    "explanation": "‘Every’ is followed by a singular countable noun. Correct: ‘Every student/candidate’.",
    "topic": "Adjective - Distributive"
  },
  {
    "question": "He gave me many scenery during Practice Case 118",
    "options": [
      "He gave me",
      "many scenery",
      "during Practice Case 118",
      "No error"
    ],
    "answer": "many scenery",
    "explanation": "‘scenery’ is uncountable here, so ‘many’ is wrong. Use ‘much’ or ‘a lot of’.",
    "topic": "Adjective - Quantifier"
  },
  {
    "question": "Harish is senior than me in Practice Case 119",
    "options": [
      "Harish is",
      "senior than me",
      "in Practice Case 119",
      "No error"
    ],
    "answer": "senior than me",
    "explanation": "‘Senior’ takes ‘to’, not ‘than’. Correct phrase: ‘senior to me’.",
    "topic": "Adjective - Latin Comparative"
  }
];

export default quizData;
