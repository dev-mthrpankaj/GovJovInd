const quizData = [
  {
    "question": "Aarav is an university student preparing for SSC CGL",
    "options": [
      "Aarav is",
      "an university student",
      "preparing for SSC CGL",
      "No error"
    ],
    "answer": "an university student",
    "explanation": "Article depends on sound. ‘University’ begins with /juː/, so use ‘a university’.",
    "topic": "Article - A/An"
  },
  {
    "question": "He is a honest officer posted in Mumbai",
    "options": [
      "He is",
      "a honest officer",
      "posted in Mumbai",
      "No error"
    ],
    "answer": "a honest officer",
    "explanation": "‘Honest’ begins with a vowel sound because ‘h’ is silent. Correct: ‘an honest officer’.",
    "topic": "Article - Silent H"
  },
  {
    "question": "Mohit joined army after graduation in Practice Case 3",
    "options": [
      "Mohit joined",
      "army",
      "after graduation in Practice Case 3",
      "No error"
    ],
    "answer": "army",
    "explanation": "Organized services such as army/police usually take ‘the’. Correct: ‘joined the army’.",
    "topic": "Article - Institution"
  },
  {
    "question": "The letter was published on the official website in Practice Case 4",
    "options": [
      "The letter",
      "was published",
      "on the official website in Practice Case 4",
      "No error"
    ],
    "answer": "No error",
    "explanation": "The sentence is correct because ‘the’ refers to a specific item already known in context.",
    "topic": "Article - No Error"
  },
  {
    "question": "Karan is best candidate in the batch for Practice Case 5",
    "options": [
      "Karan is",
      "best candidate",
      "in the batch for Practice Case 5",
      "No error"
    ],
    "answer": "best candidate",
    "explanation": "Superlative adjectives generally take ‘the’. Correct: ‘the best candidate’.",
    "topic": "Article - Superlative"
  },
  {
    "question": "She filed a FIR after the incident in Lucknow",
    "options": [
      "She filed",
      "a FIR",
      "after the incident in Lucknow",
      "No error"
    ],
    "answer": "a FIR",
    "explanation": "‘FIR’ starts with the vowel sound ‘eff’, so use ‘an FIR’.",
    "topic": "Article - Abbreviation Sound"
  },
  {
    "question": "The poor need support during difficult times in Practice Case 7",
    "options": [
      "The poor",
      "need support",
      "during difficult times in Practice Case 7",
      "No error"
    ],
    "answer": "No error",
    "explanation": "The sentence is correct. ‘The + adjective’ can denote a class and takes plural meaning.",
    "topic": "Article - The + Adjective"
  },
  {
    "question": "He read the Ramayana during vacation in Practice Case 8",
    "options": [
      "He read",
      "the Ramayana",
      "during vacation in Practice Case 8",
      "No error"
    ],
    "answer": "No error",
    "explanation": "The sentence is correct. Names of holy books/epics commonly take ‘the’.",
    "topic": "Article - No Error"
  },
  {
    "question": "Rohan is an university student preparing for Stenographer",
    "options": [
      "Rohan is",
      "an university student",
      "preparing for Stenographer",
      "No error"
    ],
    "answer": "an university student",
    "explanation": "Article depends on sound. ‘University’ begins with /juː/, so use ‘a university’.",
    "topic": "Article - A/An"
  },
  {
    "question": "He is a honest officer posted in Kolkata",
    "options": [
      "He is",
      "a honest officer",
      "posted in Kolkata",
      "No error"
    ],
    "answer": "a honest officer",
    "explanation": "‘Honest’ begins with a vowel sound because ‘h’ is silent. Correct: ‘an honest officer’.",
    "topic": "Article - Silent H"
  },
  {
    "question": "Nikhil joined army after graduation in Practice Case 11",
    "options": [
      "Nikhil joined",
      "army",
      "after graduation in Practice Case 11",
      "No error"
    ],
    "answer": "army",
    "explanation": "Organized services such as army/police usually take ‘the’. Correct: ‘joined the army’.",
    "topic": "Article - Institution"
  },
  {
    "question": "The document was published on the official website in Practice Case 12",
    "options": [
      "The document",
      "was published",
      "on the official website in Practice Case 12",
      "No error"
    ],
    "answer": "No error",
    "explanation": "The sentence is correct because ‘the’ refers to a specific item already known in context.",
    "topic": "Article - No Error"
  },
  {
    "question": "Amit is best candidate in the batch for Practice Case 13",
    "options": [
      "Amit is",
      "best candidate",
      "in the batch for Practice Case 13",
      "No error"
    ],
    "answer": "best candidate",
    "explanation": "Superlative adjectives generally take ‘the’. Correct: ‘the best candidate’.",
    "topic": "Article - Superlative"
  },
  {
    "question": "She filed a FIR after the incident in Meerut",
    "options": [
      "She filed",
      "a FIR",
      "after the incident in Meerut",
      "No error"
    ],
    "answer": "a FIR",
    "explanation": "‘FIR’ starts with the vowel sound ‘eff’, so use ‘an FIR’.",
    "topic": "Article - Abbreviation Sound"
  },
  {
    "question": "The poor need support during difficult times in Practice Case 15",
    "options": [
      "The poor",
      "need support",
      "during difficult times in Practice Case 15",
      "No error"
    ],
    "answer": "No error",
    "explanation": "The sentence is correct. ‘The + adjective’ can denote a class and takes plural meaning.",
    "topic": "Article - The + Adjective"
  },
  {
    "question": "He read the Ramayana during vacation in Practice Case 16",
    "options": [
      "He read",
      "the Ramayana",
      "during vacation in Practice Case 16",
      "No error"
    ],
    "answer": "No error",
    "explanation": "The sentence is correct. Names of holy books/epics commonly take ‘the’.",
    "topic": "Article - No Error"
  },
  {
    "question": "Rahul is an university student preparing for Delhi Police",
    "options": [
      "Rahul is",
      "an university student",
      "preparing for Delhi Police",
      "No error"
    ],
    "answer": "an university student",
    "explanation": "Article depends on sound. ‘University’ begins with /juː/, so use ‘a university’.",
    "topic": "Article - A/An"
  },
  {
    "question": "He is a honest officer posted in Prayagraj",
    "options": [
      "He is",
      "a honest officer",
      "posted in Prayagraj",
      "No error"
    ],
    "answer": "a honest officer",
    "explanation": "‘Honest’ begins with a vowel sound because ‘h’ is silent. Correct: ‘an honest officer’.",
    "topic": "Article - Silent H"
  },
  {
    "question": "Gaurav joined army after graduation in Practice Case 19",
    "options": [
      "Gaurav joined",
      "army",
      "after graduation in Practice Case 19",
      "No error"
    ],
    "answer": "army",
    "explanation": "Organized services such as army/police usually take ‘the’. Correct: ‘joined the army’.",
    "topic": "Article - Institution"
  },
  {
    "question": "The proposal was published on the official website in Practice Case 20",
    "options": [
      "The proposal",
      "was published",
      "on the official website in Practice Case 20",
      "No error"
    ],
    "answer": "No error",
    "explanation": "The sentence is correct because ‘the’ refers to a specific item already known in context.",
    "topic": "Article - No Error"
  },
  {
    "question": "Varun is best candidate in the batch for Practice Case 21",
    "options": [
      "Varun is",
      "best candidate",
      "in the batch for Practice Case 21",
      "No error"
    ],
    "answer": "best candidate",
    "explanation": "Superlative adjectives generally take ‘the’. Correct: ‘the best candidate’.",
    "topic": "Article - Superlative"
  },
  {
    "question": "She filed a FIR after the incident in Agra",
    "options": [
      "She filed",
      "a FIR",
      "after the incident in Agra",
      "No error"
    ],
    "answer": "a FIR",
    "explanation": "‘FIR’ starts with the vowel sound ‘eff’, so use ‘an FIR’.",
    "topic": "Article - Abbreviation Sound"
  },
  {
    "question": "The poor need support during difficult times in Practice Case 23",
    "options": [
      "The poor",
      "need support",
      "during difficult times in Practice Case 23",
      "No error"
    ],
    "answer": "No error",
    "explanation": "The sentence is correct. ‘The + adjective’ can denote a class and takes plural meaning.",
    "topic": "Article - The + Adjective"
  },
  {
    "question": "He read the Ramayana during vacation in Practice Case 24",
    "options": [
      "He read",
      "the Ramayana",
      "during vacation in Practice Case 24",
      "No error"
    ],
    "answer": "No error",
    "explanation": "The sentence is correct. Names of holy books/epics commonly take ‘the’.",
    "topic": "Article - No Error"
  },
  {
    "question": "Akash is an university student preparing for CHSL",
    "options": [
      "Akash is",
      "an university student",
      "preparing for CHSL",
      "No error"
    ],
    "answer": "an university student",
    "explanation": "Article depends on sound. ‘University’ begins with /juː/, so use ‘a university’.",
    "topic": "Article - A/An"
  },
  {
    "question": "He is a honest officer posted in Bhopal",
    "options": [
      "He is",
      "a honest officer",
      "posted in Bhopal",
      "No error"
    ],
    "answer": "a honest officer",
    "explanation": "‘Honest’ begins with a vowel sound because ‘h’ is silent. Correct: ‘an honest officer’.",
    "topic": "Article - Silent H"
  },
  {
    "question": "Manoj joined army after graduation in Practice Case 27",
    "options": [
      "Manoj joined",
      "army",
      "after graduation in Practice Case 27",
      "No error"
    ],
    "answer": "army",
    "explanation": "Organized services such as army/police usually take ‘the’. Correct: ‘joined the army’.",
    "topic": "Article - Institution"
  },
  {
    "question": "The essay was published on the official website in Practice Case 28",
    "options": [
      "The essay",
      "was published",
      "on the official website in Practice Case 28",
      "No error"
    ],
    "answer": "No error",
    "explanation": "The sentence is correct because ‘the’ refers to a specific item already known in context.",
    "topic": "Article - No Error"
  },
  {
    "question": "Harish is best candidate in the batch for Practice Case 29",
    "options": [
      "Harish is",
      "best candidate",
      "in the batch for Practice Case 29",
      "No error"
    ],
    "answer": "best candidate",
    "explanation": "Superlative adjectives generally take ‘the’. Correct: ‘the best candidate’.",
    "topic": "Article - Superlative"
  },
  {
    "question": "She filed a FIR after the incident in Pune",
    "options": [
      "She filed",
      "a FIR",
      "after the incident in Pune",
      "No error"
    ],
    "answer": "a FIR",
    "explanation": "‘FIR’ starts with the vowel sound ‘eff’, so use ‘an FIR’.",
    "topic": "Article - Abbreviation Sound"
  },
  {
    "question": "The poor need support during difficult times in Practice Case 31",
    "options": [
      "The poor",
      "need support",
      "during difficult times in Practice Case 31",
      "No error"
    ],
    "answer": "No error",
    "explanation": "The sentence is correct. ‘The + adjective’ can denote a class and takes plural meaning.",
    "topic": "Article - The + Adjective"
  },
  {
    "question": "He read the Ramayana during vacation in Practice Case 32",
    "options": [
      "He read",
      "the Ramayana",
      "during vacation in Practice Case 32",
      "No error"
    ],
    "answer": "No error",
    "explanation": "The sentence is correct. Names of holy books/epics commonly take ‘the’.",
    "topic": "Article - No Error"
  },
  {
    "question": "Mohit is an university student preparing for Railway Group D",
    "options": [
      "Mohit is",
      "an university student",
      "preparing for Railway Group D",
      "No error"
    ],
    "answer": "an university student",
    "explanation": "Article depends on sound. ‘University’ begins with /juː/, so use ‘a university’.",
    "topic": "Article - A/An"
  },
  {
    "question": "He is a honest officer posted in Noida",
    "options": [
      "He is",
      "a honest officer",
      "posted in Noida",
      "No error"
    ],
    "answer": "a honest officer",
    "explanation": "‘Honest’ begins with a vowel sound because ‘h’ is silent. Correct: ‘an honest officer’.",
    "topic": "Article - Silent H"
  },
  {
    "question": "Karan joined army after graduation in Practice Case 35",
    "options": [
      "Karan joined",
      "army",
      "after graduation in Practice Case 35",
      "No error"
    ],
    "answer": "army",
    "explanation": "Organized services such as army/police usually take ‘the’. Correct: ‘joined the army’.",
    "topic": "Article - Institution"
  },
  {
    "question": "The article was published on the official website in Practice Case 36",
    "options": [
      "The article",
      "was published",
      "on the official website in Practice Case 36",
      "No error"
    ],
    "answer": "No error",
    "explanation": "The sentence is correct because ‘the’ refers to a specific item already known in context.",
    "topic": "Article - No Error"
  },
  {
    "question": "Vivek is best candidate in the batch for Practice Case 37",
    "options": [
      "Vivek is",
      "best candidate",
      "in the batch for Practice Case 37",
      "No error"
    ],
    "answer": "best candidate",
    "explanation": "Superlative adjectives generally take ‘the’. Correct: ‘the best candidate’.",
    "topic": "Article - Superlative"
  },
  {
    "question": "She filed a FIR after the incident in Mumbai",
    "options": [
      "She filed",
      "a FIR",
      "after the incident in Mumbai",
      "No error"
    ],
    "answer": "a FIR",
    "explanation": "‘FIR’ starts with the vowel sound ‘eff’, so use ‘an FIR’.",
    "topic": "Article - Abbreviation Sound"
  },
  {
    "question": "The poor need support during difficult times in Practice Case 39",
    "options": [
      "The poor",
      "need support",
      "during difficult times in Practice Case 39",
      "No error"
    ],
    "answer": "No error",
    "explanation": "The sentence is correct. ‘The + adjective’ can denote a class and takes plural meaning.",
    "topic": "Article - The + Adjective"
  },
  {
    "question": "He read the Ramayana during vacation in Practice Case 40",
    "options": [
      "He read",
      "the Ramayana",
      "during vacation in Practice Case 40",
      "No error"
    ],
    "answer": "No error",
    "explanation": "The sentence is correct. Names of holy books/epics commonly take ‘the’.",
    "topic": "Article - No Error"
  },
  {
    "question": "Nikhil is an university student preparing for SSC CGL",
    "options": [
      "Nikhil is",
      "an university student",
      "preparing for SSC CGL",
      "No error"
    ],
    "answer": "an university student",
    "explanation": "Article depends on sound. ‘University’ begins with /juː/, so use ‘a university’.",
    "topic": "Article - A/An"
  },
  {
    "question": "He is a honest officer posted in Lucknow",
    "options": [
      "He is",
      "a honest officer",
      "posted in Lucknow",
      "No error"
    ],
    "answer": "a honest officer",
    "explanation": "‘Honest’ begins with a vowel sound because ‘h’ is silent. Correct: ‘an honest officer’.",
    "topic": "Article - Silent H"
  },
  {
    "question": "Amit joined army after graduation in Practice Case 43",
    "options": [
      "Amit joined",
      "army",
      "after graduation in Practice Case 43",
      "No error"
    ],
    "answer": "army",
    "explanation": "Organized services such as army/police usually take ‘the’. Correct: ‘joined the army’.",
    "topic": "Article - Institution"
  },
  {
    "question": "The answer sheet was published on the official website in Practice Case 44",
    "options": [
      "The answer sheet",
      "was published",
      "on the official website in Practice Case 44",
      "No error"
    ],
    "answer": "No error",
    "explanation": "The sentence is correct because ‘the’ refers to a specific item already known in context.",
    "topic": "Article - No Error"
  },
  {
    "question": "Deepak is best candidate in the batch for Practice Case 45",
    "options": [
      "Deepak is",
      "best candidate",
      "in the batch for Practice Case 45",
      "No error"
    ],
    "answer": "best candidate",
    "explanation": "Superlative adjectives generally take ‘the’. Correct: ‘the best candidate’.",
    "topic": "Article - Superlative"
  },
  {
    "question": "She filed a FIR after the incident in Kolkata",
    "options": [
      "She filed",
      "a FIR",
      "after the incident in Kolkata",
      "No error"
    ],
    "answer": "a FIR",
    "explanation": "‘FIR’ starts with the vowel sound ‘eff’, so use ‘an FIR’.",
    "topic": "Article - Abbreviation Sound"
  },
  {
    "question": "The poor need support during difficult times in Practice Case 47",
    "options": [
      "The poor",
      "need support",
      "during difficult times in Practice Case 47",
      "No error"
    ],
    "answer": "No error",
    "explanation": "The sentence is correct. ‘The + adjective’ can denote a class and takes plural meaning.",
    "topic": "Article - The + Adjective"
  },
  {
    "question": "He read the Ramayana during vacation in Practice Case 48",
    "options": [
      "He read",
      "the Ramayana",
      "during vacation in Practice Case 48",
      "No error"
    ],
    "answer": "No error",
    "explanation": "The sentence is correct. Names of holy books/epics commonly take ‘the’.",
    "topic": "Article - No Error"
  },
  {
    "question": "Gaurav is an university student preparing for Stenographer",
    "options": [
      "Gaurav is",
      "an university student",
      "preparing for Stenographer",
      "No error"
    ],
    "answer": "an university student",
    "explanation": "Article depends on sound. ‘University’ begins with /juː/, so use ‘a university’.",
    "topic": "Article - A/An"
  },
  {
    "question": "He is a honest officer posted in Meerut",
    "options": [
      "He is",
      "a honest officer",
      "posted in Meerut",
      "No error"
    ],
    "answer": "a honest officer",
    "explanation": "‘Honest’ begins with a vowel sound because ‘h’ is silent. Correct: ‘an honest officer’.",
    "topic": "Article - Silent H"
  }
];

export default quizData;
