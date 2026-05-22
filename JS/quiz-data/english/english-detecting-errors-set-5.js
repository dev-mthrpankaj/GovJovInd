(function () {
    "use strict";

    window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];

    const quizId = "english-detecting-errors-set-5";

    const questions = [
        {
            id: `${quizId}-q01`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "We might supply so",
                "/ much evidence in try to explain",
                "/ it in so many ways",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace 'in try' with 'and try'."
        },
        {
            id: `${quizId}-q02`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "We know it is an extra early start to",
            options: [
                "/ your day, but we are certain",
                "/ you too would like to contribute towards this",
                "No error",
                "No error"
            ],
            correctAnswer: 3,
            explanation: "No Error."
        },
        {
            id: `${quizId}-q03`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Either Ankit",
                "/ or Jyoti",
                "/ have done this",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Change 'have' into 'has' because if two subjects are joined by 'either.....or' , the verb agrees to the nearest subject."
        },
        {
            id: `${quizId}-q04`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "You have too save the day by",
                "/ cracking the code and",
                "/ determining the code word",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Change ‘too’ into ‘to’ because ‘to +vb.f’ is the correct structure."
        },
        {
            id: `${quizId}-q05`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "No sooner had she arrive that her",
                "/ friends arranged a reception in her",
                "/ honour in the best resort in the town",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "'Had' takes V3. Change 'arrive' into 'arrived'."
        },
        {
            id: `${quizId}-q06`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "I don't think, Neha is a wiser as",
                "/ Sonali, so she is not",
                "/ competent for this job",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Use 'as wise as'. As ... as takes positive degree."
        },
        {
            id: `${quizId}-q07`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "In the Mathematics class, I sit next to",
                "/ Raj, who is the captain of the basket ball",
                "/ team and undoubtedly the best basket ball player in Delhi",
                "No error"
            ],
            correctAnswer: 3,
            explanation: "No error."
        },
        {
            id: `${quizId}-q08`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Not only we saw",
                "/ the President but also",
                "/ the Chief Minister of Delhi",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Either use 'not only' after saw or use structure 'not only did we see'. Conjunction should be followed by same part of speech."
        },
        {
            id: `${quizId}-q09`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Not only her husband",
                "/ but even her father",
                "/ also find her selfish",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "'not only' always followed by 'but also'. 'But also her father' is the correct structure."
        },
        {
            id: `${quizId}-q10`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Hardly had he come out of the",
                "/ cinema hall then the bomb exploded",
                "/ and shattered the hall completely",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "'Hardly ... when' is the correct pair."
        },
        {
            id: `${quizId}-q11`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Low interest rates are tempting",
                "/ many customers to take",
                "/ on too much debt",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Remove 'on'. 'Take on' means 'to confront'."
        },
        {
            id: `${quizId}-q12`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Prabhat is impressed by his",
                "/ younger brother because he is cleverer",
                "/ and amusing than he is",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Use 'more amusing' in place of 'amusing'. Conjunction Adjective joins same degrees."
        },
        {
            id: `${quizId}-q13`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Our company not only manufactures",
            options: [
                "/ plastic containers but",
                "/ also steel containers",
                "No error",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Either use 'not only' after saw or use structure 'not only did we see'. Conjunction should be followed by same part of speech. Not only will come after manufactures."
        },
        {
            id: `${quizId}-q14`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Suresh have never",
                "/ encouraged nor",
                "/ condoned violence",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Change 'have never' into 'has neither'. Neither ... nor is a pair of conjunction and Suresh (Singular Noun) will take singular verb."
        },
        {
            id: `${quizId}-q15`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The place were",
                "/ Buddha was cremated",
                "/ has recently been discovered",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Replace 'were' with 'where'."
        },
        {
            id: `${quizId}-q16`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The consequence of",
                "/ his carelessness was",
                "/ that the game was lost",
                "No error"
            ],
            correctAnswer: 3,
            explanation: ""
        },
        {
            id: `${quizId}-q17`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Wherever you live,",
                "/ there is surely some countryside or coastline",
                "/ not too far away that you are proud of",
                "No error"
            ],
            correctAnswer: 3,
            explanation: ""
        },
        {
            id: `${quizId}-q18`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Despite of working hard he failed the test.",
            options: [
                "the test",
                "he failed",
                "Despite of",
                "working hard"
            ],
            correctAnswer: 2,
            explanation: "Remove 'of' or use 'inspite' in place of 'Despite'. In spite of or Despite will suffice."
        },
        {
            id: `${quizId}-q19`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Whenever I went to the cinema I bought myself popcorn and coke for a special treat.",
            options: [
                "Whenever",
                "bought",
                "went",
                "for"
            ],
            correctAnswer: 3,
            explanation: "Replace 'for' with 'as'."
        },
        {
            id: `${quizId}-q20`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Both my father or my mother can cook.",
            options: [
                "Both",
                "can cook",
                "or my mother",
                "my father"
            ],
            correctAnswer: 2,
            explanation: "Replace 'or' with 'and'. Correct pair of conjunction is 'both..... and'."
        },
        {
            id: `${quizId}-q21`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "He gave jobs to several unemployed men in a remote village who is battling poverty.",
            options: [
                "He gave job",
                "in a remote village",
                "to several unemployed",
                "who is battling poverty"
            ],
            correctAnswer: 3,
            explanation: "Replace 'is' with 'are'. Men take plural verb."
        },
        {
            id: `${quizId}-q22`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "The teacher had hardly left the room than the pupils started enjoying.",
            options: [
                "than",
                "started enjoying",
                "The teacher",
                "had hardly left"
            ],
            correctAnswer: 0,
            explanation: "Replace 'than' with 'when'. Correct pair of conjunction is 'hardly..... when'."
        },
        {
            id: `${quizId}-q23`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "In this novel I came across some words which meaning I do not know.",
            options: [
                "came across",
                "which meaning",
                "In this novel",
                "do not know"
            ],
            correctAnswer: 1,
            explanation: "Replace 'which' with 'the meaning of which'."
        },
        {
            id: `${quizId}-q24`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Unless you do not run fast, you cannot match the bus.",
            options: [
                "you do not",
                "catch the bus",
                "You cannot",
                "Run fast"
            ],
            correctAnswer: 0,
            explanation: "Remove 'do not'. Unless is not followed by a negative word."
        },
        {
            id: `${quizId}-q25`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "He is the same man which I saw yesterday at the gate.",
            options: [
                "He is",
                "the same man",
                "at the gate",
                "which I saw"
            ],
            correctAnswer: 3,
            explanation: "Replace 'which' with 'that'. The same is followed by that."
        },
        {
            id: `${quizId}-q26`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "He is not such a clever boy that you are.",
            options: [
                "cleaver boy",
                "such a",
                "that you are",
                "He is not"
            ],
            correctAnswer: 2,
            explanation: "Replace 'that' with 'as'. 'Such ...as' is used to categorize."
        },
        {
            id: `${quizId}-q27`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "This is the boy which took away the books.",
            options: [
                "This is",
                "which took away",
                "the boy",
                "the books"
            ],
            correctAnswer: 1,
            explanation: "Replace 'which' with 'who'. For person we use 'who'."
        },
        {
            id: `${quizId}-q28`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Until I do not get the loan, I cannot set up my business.",
            options: [
                "I cannot",
                "get the loan",
                "do not",
                "set up"
            ],
            correctAnswer: 2,
            explanation: "Remove 'do not'. Until has a 'hidden not' in it."
        },
        {
            id: `${quizId}-q29`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Smartphone cameras can now take pictures of near-professional quality, so they also have limitations.",
            options: [
                "pictures of",
                "so they also have limitations",
                "can now take",
                "near-professional quality"
            ],
            correctAnswer: 1,
            explanation: "Replace 'so' with 'but'. 'Limitations' introduce something, contradictory hence use 'but'."
        },
        {
            id: `${quizId}-q30`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "We had to decline several orders",
                "/ in case that the production was",
                "/ held up due to labour strike",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace 'in case that' with 'because' to give proper meaning to the sentence."
        },
        {
            id: `${quizId}-q31`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Cyclone ldai killed at least",
                "/ 17 people in Zimbabwe and Mozambique although",
                "/ it tore across Southern Africa",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace 'although' with 'when'."
        },
        {
            id: `${quizId}-q32`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "She got",
                "/ two quick promotions",
                "/ in order that",
                "/ she has good communication skills"
            ],
            correctAnswer: 1,
            explanation: "Replace 'in order' with 'because'."
        },
        {
            id: `${quizId}-q33`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "She lost a big order",
                "/ from a known showroom",
                "/ in case of her own carelessness",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace 'in case of' with 'because of or due to'."
        },
        {
            id: `${quizId}-q34`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "No sooner did he see",
                "/ the tiger when he ran",
                "/ as fast as he could",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "'No sooner' is followed by than."
        },
        {
            id: `${quizId}-q35`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "“Unless you did not",
                "/ do your homework you",
                "/ will be punished,” said the teacher",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Remove 'did not'. Unless is not followed by 'not'."
        },
        {
            id: `${quizId}-q36`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Different-coloured natural foods not only put a smile on children's faces and also benefit their overall growth.",
            options: [
                "benefit their overall growth",
                "and also benefit",
                "Different-coloured natural foods",
                "put a smile on children's faces CHSL-2018 2 July, 2019, Evening"
            ],
            correctAnswer: 1,
            explanation: "Not only is followed by but also put ‘but’ in place of ‘and’."
        },
        {
            id: `${quizId}-q37`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "As you know that I always like to have ice-cream after my dinner",
            options: [
                "As you know that",
                "to have ice-cream",
                "after my dinner",
                "I always like CHSL-2018 9 July, 2019, Morning"
            ],
            correctAnswer: 0,
            explanation: "Remove ‘as’."
        },
        {
            id: `${quizId}-q38`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "The lady listened carefully to my complaint but I doubt she will do anything about it.",
            options: [
                "but I doubt she",
                "will do anything about it",
                "to my complaint",
                "The lady listened carefully CHSL-2018 10 July, 2019, Morning"
            ],
            correctAnswer: 0,
            explanation: "Add 'if' after 'doubt'."
        },
        {
            id: `${quizId}-q39`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Even Sharat tried his best, he could not clear all the examination paper in one attempt.",
            options: [
                "he could not clear",
                "Even Sharat tried his best",
                "all the examination papers",
                "in one attempt CHSL-2018 10 July, 2019, Afternoon"
            ],
            correctAnswer: 1,
            explanation: "use ‘though’ in place of ‘even’."
        },
        {
            id: `${quizId}-q40`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Our nation can make significant growth but if we all work collectively.",
            options: [
                "but if we all",
                "make significant growth",
                "Our nation can",
                "work collectively CHSL-2018 11 July, 2019, Evening"
            ],
            correctAnswer: 0,
            explanation: "Remove but or add 'only' after 'but'."
        },
        {
            id: `${quizId}-q41`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "I don’t like movies who has an unhappy ending.",
            options: [
                "who has",
                "I don’t",
                "like movies",
                "an unhappy ending"
            ],
            correctAnswer: 0,
            explanation: "Replace 'who has' with 'that have'. Who is used with human beings. Movies will take p.v. 'have'."
        },
        {
            id: `${quizId}-q42`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "I was surprised to see as Avika could write such good poems in Hindi.",
            options: [
                "to see as Avika",
                "I was surprised",
                "such good poems in Hindi",
                "could write"
            ],
            correctAnswer: 0,
            explanation: "Replace 'as' with 'that'."
        },
        {
            id: `${quizId}-q43`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Despite incessant rains, she is the only one who plan to attend the meeting at the ministry.",
            options: [
                "Despite incessant rains",
                "who plan to attend",
                "the meeting at the ministry",
                "she is the only one"
            ],
            correctAnswer: 1,
            explanation: "Replace 'plan' with 'plans'. 'She' will take 'plans' (S.V)."
        },
        {
            id: `${quizId}-q44`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "They made her as the Chairperson of their bank.",
            options: [
                "No error",
                "as the Chairperson",
                "of their bank",
                "They made her"
            ],
            correctAnswer: 1,
            explanation: "Remove 'as'. Name, elect, think, consider, call, appoint, make, choose, nominate and crown do not take 'as'."
        },
        {
            id: `${quizId}-q45`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "They can’t hardly believe that Article 370 is no longer valid in Jammu and Kashmir.",
            options: [
                "is no longer valid",
                "in Jammu and Kashmir",
                "that Article 370",
                "They can’t hardly believe"
            ],
            correctAnswer: 3,
            explanation: "Remove 'hardly' or change can't into can. Double negative cannot come together. ssc Prepared by Neetu Singh (1997–2016) 1000 1000 Revised Updated 1"
        },
        {
            id: `${quizId}-q46`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Tea",
                "/ which I am drinking",
                "/ is hot",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Here we are talking about a particular tea that I am drinking. Hence definite article ‘the’ should be used before ‘tea’."
        },
        {
            id: `${quizId}-q47`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "I know",
                "/ a doctor",
                "/ you are referring to",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘a’ with ‘the’. For particular person article ‘the’ is used. Here the doctor is known to me."
        },
        {
            id: `${quizId}-q48`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "An experimental vaccine",
                "/ has brought",
                "/ glimmer of hope for the malarial researcher",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "‘A’ will come before ‘glimmer’ because whenever we talk about something first time, we use a / an."
        },
        {
            id: `${quizId}-q49`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "A milk",
                "/ can provide protein",
                "/ for a nutritionally balanced diet",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "We do not use article ‘a / an’ before any Uncountable Noun. Hence remove ‘a’."
        },
        {
            id: `${quizId}-q50`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "After knowing truth,",
                "/ they took the right decision",
                "/ in the matter",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Replace ‘after knowing truth’ with ‘after knowing the truth’ because here ‘truth’ is known to them so it is definite and hence will take article ‘the’."
        }
    ];

    window.GJU_QUIZ_BANK.push({
        id: quizId,
        title: "English Detecting Errors Practice Set 5",
        subject: "English",
        difficulty: "Hard",
        questions
    });
})();