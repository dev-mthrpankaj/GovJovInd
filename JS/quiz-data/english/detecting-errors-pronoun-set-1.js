const quizData = [
  {
    "question": "Everyone should submit their form before the last date in Practice Case 1",
    "options": [
      "Everyone",
      "should submit",
      "their form before the last date in Practice Case 1",
      "No error"
    ],
    "answer": "their form before the last date in Practice Case 1",
    "explanation": "In traditional exam grammar, ‘everyone’ is singular; use ‘his or her’ or rewrite in plural.",
    "topic": "Pronoun - Indefinite"
  },
  {
    "question": "Between you and I this answer is doubtful in Practice Case 2",
    "options": [
      "Between you",
      "and I",
      "this answer is doubtful in Practice Case 2",
      "No error"
    ],
    "answer": "and I",
    "explanation": "After a preposition, use objective case. Correct: ‘between you and me’.",
    "topic": "Pronoun - Case"
  },
  {
    "question": "The teacher asked Rahul and me to stay after class in Practice Case 3",
    "options": [
      "The teacher asked",
      "Rahul and me",
      "to stay after class in Practice Case 3",
      "No error"
    ],
    "answer": "No error",
    "explanation": "The sentence is correct. ‘Me’ is the object of ‘asked’.",
    "topic": "Pronoun - No Error"
  },
  {
    "question": "This is the student which won the debate in Practice Case 4",
    "options": [
      "This is",
      "the student",
      "which won the debate in Practice Case 4",
      "No error"
    ],
    "answer": "which won the debate in Practice Case 4",
    "explanation": "For a person, use ‘who’ or ‘that’, not ‘which’.",
    "topic": "Pronoun - Relative"
  },
  {
    "question": "He himself admitted his mistake in Practice Case 5",
    "options": [
      "He himself",
      "admitted",
      "his mistake in Practice Case 5",
      "No error"
    ],
    "answer": "No error",
    "explanation": "The sentence is correct. ‘Himself’ is emphatic.",
    "topic": "Pronoun - No Error"
  },
  {
    "question": "One should respect his teachers in Practice Case 6",
    "options": [
      "One should",
      "respect his",
      "teachers in Practice Case 6",
      "No error"
    ],
    "answer": "respect his",
    "explanation": "When ‘one’ is the subject, use ‘one’s’. Correct: ‘respect one’s teachers’.",
    "topic": "Pronoun - One's"
  },
  {
    "question": "The book that you gave me is useful for Delhi Police",
    "options": [
      "The book",
      "that you gave me",
      "is useful for Delhi Police",
      "No error"
    ],
    "answer": "No error",
    "explanation": "The sentence is correct. ‘That’ can refer to things.",
    "topic": "Pronoun - No Error"
  },
  {
    "question": "Whom do you think will win the final test in Practice Case 8?",
    "options": [
      "Whom do",
      "you think",
      "will win the final test in Practice Case 8?",
      "No error"
    ],
    "answer": "Whom do",
    "explanation": "The pronoun is subject of ‘will win’, so use ‘who’, not ‘whom’.",
    "topic": "Pronoun - Who/Whom"
  },
  {
    "question": "Everyone should submit their form before the last date in Practice Case 9",
    "options": [
      "Everyone",
      "should submit",
      "their form before the last date in Practice Case 9",
      "No error"
    ],
    "answer": "their form before the last date in Practice Case 9",
    "explanation": "In traditional exam grammar, ‘everyone’ is singular; use ‘his or her’ or rewrite in plural.",
    "topic": "Pronoun - Indefinite"
  },
  {
    "question": "Between you and I this answer is doubtful in Practice Case 10",
    "options": [
      "Between you",
      "and I",
      "this answer is doubtful in Practice Case 10",
      "No error"
    ],
    "answer": "and I",
    "explanation": "After a preposition, use objective case. Correct: ‘between you and me’.",
    "topic": "Pronoun - Case"
  },
  {
    "question": "The teacher asked Rahul and me to stay after class in Practice Case 11",
    "options": [
      "The teacher asked",
      "Rahul and me",
      "to stay after class in Practice Case 11",
      "No error"
    ],
    "answer": "No error",
    "explanation": "The sentence is correct. ‘Me’ is the object of ‘asked’.",
    "topic": "Pronoun - No Error"
  },
  {
    "question": "This is the student which won the debate in Practice Case 12",
    "options": [
      "This is",
      "the student",
      "which won the debate in Practice Case 12",
      "No error"
    ],
    "answer": "which won the debate in Practice Case 12",
    "explanation": "For a person, use ‘who’ or ‘that’, not ‘which’.",
    "topic": "Pronoun - Relative"
  },
  {
    "question": "He himself admitted his mistake in Practice Case 13",
    "options": [
      "He himself",
      "admitted",
      "his mistake in Practice Case 13",
      "No error"
    ],
    "answer": "No error",
    "explanation": "The sentence is correct. ‘Himself’ is emphatic.",
    "topic": "Pronoun - No Error"
  },
  {
    "question": "One should respect his teachers in Practice Case 14",
    "options": [
      "One should",
      "respect his",
      "teachers in Practice Case 14",
      "No error"
    ],
    "answer": "respect his",
    "explanation": "When ‘one’ is the subject, use ‘one’s’. Correct: ‘respect one’s teachers’.",
    "topic": "Pronoun - One's"
  },
  {
    "question": "The book that you gave me is useful for CHSL",
    "options": [
      "The book",
      "that you gave me",
      "is useful for CHSL",
      "No error"
    ],
    "answer": "No error",
    "explanation": "The sentence is correct. ‘That’ can refer to things.",
    "topic": "Pronoun - No Error"
  },
  {
    "question": "Whom do you think will win the final test in Practice Case 16?",
    "options": [
      "Whom do",
      "you think",
      "will win the final test in Practice Case 16?",
      "No error"
    ],
    "answer": "Whom do",
    "explanation": "The pronoun is subject of ‘will win’, so use ‘who’, not ‘whom’.",
    "topic": "Pronoun - Who/Whom"
  },
  {
    "question": "Everyone should submit their form before the last date in Practice Case 17",
    "options": [
      "Everyone",
      "should submit",
      "their form before the last date in Practice Case 17",
      "No error"
    ],
    "answer": "their form before the last date in Practice Case 17",
    "explanation": "In traditional exam grammar, ‘everyone’ is singular; use ‘his or her’ or rewrite in plural.",
    "topic": "Pronoun - Indefinite"
  },
  {
    "question": "Between you and I this answer is doubtful in Practice Case 18",
    "options": [
      "Between you",
      "and I",
      "this answer is doubtful in Practice Case 18",
      "No error"
    ],
    "answer": "and I",
    "explanation": "After a preposition, use objective case. Correct: ‘between you and me’.",
    "topic": "Pronoun - Case"
  },
  {
    "question": "The teacher asked Rahul and me to stay after class in Practice Case 19",
    "options": [
      "The teacher asked",
      "Rahul and me",
      "to stay after class in Practice Case 19",
      "No error"
    ],
    "answer": "No error",
    "explanation": "The sentence is correct. ‘Me’ is the object of ‘asked’.",
    "topic": "Pronoun - No Error"
  },
  {
    "question": "This is the student which won the debate in Practice Case 20",
    "options": [
      "This is",
      "the student",
      "which won the debate in Practice Case 20",
      "No error"
    ],
    "answer": "which won the debate in Practice Case 20",
    "explanation": "For a person, use ‘who’ or ‘that’, not ‘which’.",
    "topic": "Pronoun - Relative"
  },
  {
    "question": "He himself admitted his mistake in Practice Case 21",
    "options": [
      "He himself",
      "admitted",
      "his mistake in Practice Case 21",
      "No error"
    ],
    "answer": "No error",
    "explanation": "The sentence is correct. ‘Himself’ is emphatic.",
    "topic": "Pronoun - No Error"
  },
  {
    "question": "One should respect his teachers in Practice Case 22",
    "options": [
      "One should",
      "respect his",
      "teachers in Practice Case 22",
      "No error"
    ],
    "answer": "respect his",
    "explanation": "When ‘one’ is the subject, use ‘one’s’. Correct: ‘respect one’s teachers’.",
    "topic": "Pronoun - One's"
  },
  {
    "question": "The book that you gave me is useful for Railway Group D",
    "options": [
      "The book",
      "that you gave me",
      "is useful for Railway Group D",
      "No error"
    ],
    "answer": "No error",
    "explanation": "The sentence is correct. ‘That’ can refer to things.",
    "topic": "Pronoun - No Error"
  },
  {
    "question": "Whom do you think will win the final test in Practice Case 24?",
    "options": [
      "Whom do",
      "you think",
      "will win the final test in Practice Case 24?",
      "No error"
    ],
    "answer": "Whom do",
    "explanation": "The pronoun is subject of ‘will win’, so use ‘who’, not ‘whom’.",
    "topic": "Pronoun - Who/Whom"
  },
  {
    "question": "Everyone should submit their form before the last date in Practice Case 25",
    "options": [
      "Everyone",
      "should submit",
      "their form before the last date in Practice Case 25",
      "No error"
    ],
    "answer": "their form before the last date in Practice Case 25",
    "explanation": "In traditional exam grammar, ‘everyone’ is singular; use ‘his or her’ or rewrite in plural.",
    "topic": "Pronoun - Indefinite"
  },
  {
    "question": "Between you and I this answer is doubtful in Practice Case 26",
    "options": [
      "Between you",
      "and I",
      "this answer is doubtful in Practice Case 26",
      "No error"
    ],
    "answer": "and I",
    "explanation": "After a preposition, use objective case. Correct: ‘between you and me’.",
    "topic": "Pronoun - Case"
  },
  {
    "question": "The teacher asked Rahul and me to stay after class in Practice Case 27",
    "options": [
      "The teacher asked",
      "Rahul and me",
      "to stay after class in Practice Case 27",
      "No error"
    ],
    "answer": "No error",
    "explanation": "The sentence is correct. ‘Me’ is the object of ‘asked’.",
    "topic": "Pronoun - No Error"
  },
  {
    "question": "This is the student which won the debate in Practice Case 28",
    "options": [
      "This is",
      "the student",
      "which won the debate in Practice Case 28",
      "No error"
    ],
    "answer": "which won the debate in Practice Case 28",
    "explanation": "For a person, use ‘who’ or ‘that’, not ‘which’.",
    "topic": "Pronoun - Relative"
  },
  {
    "question": "He himself admitted his mistake in Practice Case 29",
    "options": [
      "He himself",
      "admitted",
      "his mistake in Practice Case 29",
      "No error"
    ],
    "answer": "No error",
    "explanation": "The sentence is correct. ‘Himself’ is emphatic.",
    "topic": "Pronoun - No Error"
  },
  {
    "question": "One should respect his teachers in Practice Case 30",
    "options": [
      "One should",
      "respect his",
      "teachers in Practice Case 30",
      "No error"
    ],
    "answer": "respect his",
    "explanation": "When ‘one’ is the subject, use ‘one’s’. Correct: ‘respect one’s teachers’.",
    "topic": "Pronoun - One's"
  },
  {
    "question": "The book that you gave me is useful for SSC CGL",
    "options": [
      "The book",
      "that you gave me",
      "is useful for SSC CGL",
      "No error"
    ],
    "answer": "No error",
    "explanation": "The sentence is correct. ‘That’ can refer to things.",
    "topic": "Pronoun - No Error"
  },
  {
    "question": "Whom do you think will win the final test in Practice Case 32?",
    "options": [
      "Whom do",
      "you think",
      "will win the final test in Practice Case 32?",
      "No error"
    ],
    "answer": "Whom do",
    "explanation": "The pronoun is subject of ‘will win’, so use ‘who’, not ‘whom’.",
    "topic": "Pronoun - Who/Whom"
  },
  {
    "question": "Everyone should submit their form before the last date in Practice Case 33",
    "options": [
      "Everyone",
      "should submit",
      "their form before the last date in Practice Case 33",
      "No error"
    ],
    "answer": "their form before the last date in Practice Case 33",
    "explanation": "In traditional exam grammar, ‘everyone’ is singular; use ‘his or her’ or rewrite in plural.",
    "topic": "Pronoun - Indefinite"
  },
  {
    "question": "Between you and I this answer is doubtful in Practice Case 34",
    "options": [
      "Between you",
      "and I",
      "this answer is doubtful in Practice Case 34",
      "No error"
    ],
    "answer": "and I",
    "explanation": "After a preposition, use objective case. Correct: ‘between you and me’.",
    "topic": "Pronoun - Case"
  },
  {
    "question": "The teacher asked Rahul and me to stay after class in Practice Case 35",
    "options": [
      "The teacher asked",
      "Rahul and me",
      "to stay after class in Practice Case 35",
      "No error"
    ],
    "answer": "No error",
    "explanation": "The sentence is correct. ‘Me’ is the object of ‘asked’.",
    "topic": "Pronoun - No Error"
  },
  {
    "question": "This is the student which won the debate in Practice Case 36",
    "options": [
      "This is",
      "the student",
      "which won the debate in Practice Case 36",
      "No error"
    ],
    "answer": "which won the debate in Practice Case 36",
    "explanation": "For a person, use ‘who’ or ‘that’, not ‘which’.",
    "topic": "Pronoun - Relative"
  },
  {
    "question": "He himself admitted his mistake in Practice Case 37",
    "options": [
      "He himself",
      "admitted",
      "his mistake in Practice Case 37",
      "No error"
    ],
    "answer": "No error",
    "explanation": "The sentence is correct. ‘Himself’ is emphatic.",
    "topic": "Pronoun - No Error"
  },
  {
    "question": "One should respect his teachers in Practice Case 38",
    "options": [
      "One should",
      "respect his",
      "teachers in Practice Case 38",
      "No error"
    ],
    "answer": "respect his",
    "explanation": "When ‘one’ is the subject, use ‘one’s’. Correct: ‘respect one’s teachers’.",
    "topic": "Pronoun - One's"
  },
  {
    "question": "The book that you gave me is useful for Stenographer",
    "options": [
      "The book",
      "that you gave me",
      "is useful for Stenographer",
      "No error"
    ],
    "answer": "No error",
    "explanation": "The sentence is correct. ‘That’ can refer to things.",
    "topic": "Pronoun - No Error"
  },
  {
    "question": "Whom do you think will win the final test in Practice Case 40?",
    "options": [
      "Whom do",
      "you think",
      "will win the final test in Practice Case 40?",
      "No error"
    ],
    "answer": "Whom do",
    "explanation": "The pronoun is subject of ‘will win’, so use ‘who’, not ‘whom’.",
    "topic": "Pronoun - Who/Whom"
  },
  {
    "question": "Everyone should submit their form before the last date in Practice Case 41",
    "options": [
      "Everyone",
      "should submit",
      "their form before the last date in Practice Case 41",
      "No error"
    ],
    "answer": "their form before the last date in Practice Case 41",
    "explanation": "In traditional exam grammar, ‘everyone’ is singular; use ‘his or her’ or rewrite in plural.",
    "topic": "Pronoun - Indefinite"
  },
  {
    "question": "Between you and I this answer is doubtful in Practice Case 42",
    "options": [
      "Between you",
      "and I",
      "this answer is doubtful in Practice Case 42",
      "No error"
    ],
    "answer": "and I",
    "explanation": "After a preposition, use objective case. Correct: ‘between you and me’.",
    "topic": "Pronoun - Case"
  },
  {
    "question": "The teacher asked Rahul and me to stay after class in Practice Case 43",
    "options": [
      "The teacher asked",
      "Rahul and me",
      "to stay after class in Practice Case 43",
      "No error"
    ],
    "answer": "No error",
    "explanation": "The sentence is correct. ‘Me’ is the object of ‘asked’.",
    "topic": "Pronoun - No Error"
  },
  {
    "question": "This is the student which won the debate in Practice Case 44",
    "options": [
      "This is",
      "the student",
      "which won the debate in Practice Case 44",
      "No error"
    ],
    "answer": "which won the debate in Practice Case 44",
    "explanation": "For a person, use ‘who’ or ‘that’, not ‘which’.",
    "topic": "Pronoun - Relative"
  },
  {
    "question": "He himself admitted his mistake in Practice Case 45",
    "options": [
      "He himself",
      "admitted",
      "his mistake in Practice Case 45",
      "No error"
    ],
    "answer": "No error",
    "explanation": "The sentence is correct. ‘Himself’ is emphatic.",
    "topic": "Pronoun - No Error"
  },
  {
    "question": "One should respect his teachers in Practice Case 46",
    "options": [
      "One should",
      "respect his",
      "teachers in Practice Case 46",
      "No error"
    ],
    "answer": "respect his",
    "explanation": "When ‘one’ is the subject, use ‘one’s’. Correct: ‘respect one’s teachers’.",
    "topic": "Pronoun - One's"
  },
  {
    "question": "Whom do you think will win the final test in Practice Case 48?",
    "options": [
      "Whom do",
      "you think",
      "will win the final test in Practice Case 48?",
      "No error"
    ],
    "answer": "Whom do",
    "explanation": "The pronoun is subject of ‘will win’, so use ‘who’, not ‘whom’.",
    "topic": "Pronoun - Who/Whom"
  },
  {
    "question": "Everyone should submit their form before the last date in Practice Case 49",
    "options": [
      "Everyone",
      "should submit",
      "their form before the last date in Practice Case 49",
      "No error"
    ],
    "answer": "their form before the last date in Practice Case 49",
    "explanation": "In traditional exam grammar, ‘everyone’ is singular; use ‘his or her’ or rewrite in plural.",
    "topic": "Pronoun - Indefinite"
  },
  {
    "question": "Between you and I this answer is doubtful in Practice Case 50",
    "options": [
      "Between you",
      "and I",
      "this answer is doubtful in Practice Case 50",
      "No error"
    ],
    "answer": "and I",
    "explanation": "After a preposition, use objective case. Correct: ‘between you and me’.",
    "topic": "Pronoun - Case"
  },
  {
    "question": "The teacher asked Rahul and me to stay after class in Practice Case 51",
    "options": [
      "The teacher asked",
      "Rahul and me",
      "to stay after class in Practice Case 51",
      "No error"
    ],
    "answer": "No error",
    "explanation": "The sentence is correct. ‘Me’ is the object of ‘asked’.",
    "topic": "Pronoun - No Error"
  }
];

export default quizData;
