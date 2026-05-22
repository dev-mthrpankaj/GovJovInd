(function () {
    "use strict";

    window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];

    const quizId = "english-detecting-errors-set-1";

    const questions = [
        {
            id: `${quizId}-q01`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "These days, job opportunities are not as better",
                "/ as they used to be",
                "/ in the early 70's",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "The pattern we use with as ... as is as follows: As + positive degree of adjective / adverb + As Replace comparative degree of adjective (better) with positive degree of adjective (good)."
        },
        {
            id: `${quizId}-q02`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Unless it is accepted to both the parties, an",
                "/ arbitrator would be of no",
                "/ use to settle this dispute",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Replace ‘accepted’ with ‘acceptable’."
        },
        {
            id: `${quizId}-q03`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Although the police officer sympathised with poor",
                "/ he refused to",
                "/ take an action against the rich man",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Place article ‘the’ before ‘poor’. When definite article ‘the’ is used before adjective (here-poor) it refers to the whole class."
        },
        {
            id: `${quizId}-q04`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The two first to arrive",
                "/ were the lucky recipients",
                "/ of a surprise gift",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Replace ‘two first’ with ‘first two’. When there are both ordinal number and cardinal number in a sentence, they are arranged in order ‘OC’. I.e, first Ordinal and the Cardinal.. First Two Ordinal Cardinal         "
        },
        {
            id: `${quizId}-q05`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Even today",
                "/ it is incredulous to think",
                "/ that men have walked on the moon. /",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘incredible’ with ‘incredulous’. ‘Incredulous’ means ‘unwilling or unable to believe something’. ‘incredible’ means ‘unbelievable’."
        },
        {
            id: `${quizId}-q06`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "If the worst",
                "/ comes to worst,",
                "/ I will have to bid good-bye to my studies and join my family business",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘comes to worst’ with ‘come to the worst’. ‘If the worst comes to the worst’ means ‘in the worst possible circumstances’."
        },
        {
            id: `${quizId}-q07`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The interim report does not",
                "/ analyse thoroughly the principle causes",
                "/ of the disaster",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘principle’ with ‘principal’. ‘Principal’ means ‘main’. Here we are talking about the ‘main cause’."
        },
        {
            id: `${quizId}-q08`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The soil was moist as",
                "/ there was little rain",
                "/ the day before",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘little’ with ‘a little’. ‘A little’ means ‘some’. Here we want to say due to a little rain, the soil was moist."
        },
        {
            id: `${quizId}-q09`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The manager wanted to know who had arrived",
                "/ early that day",
                "/ the cashier or the accountant",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘early’ with ‘earlier’. Here in the sentence comparison between ‘cashier’ and ‘accountant’ is evident."
        },
        {
            id: `${quizId}-q10`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Though its gloss can",
                "/ fool few unwary customers,",
                "/ it wouldn’t be difficult for the clever ones to judge its real worth",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘few’ with ‘a few’ Few — equivalent to zero. A few — a small number. Here we want to say that some customers get fooled."
        },
        {
            id: `${quizId}-q11`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Of the billions of stars in the galaxy,",
            options: [
                "/ how much are",
                "/ suitable for life",
                "No error",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘much’ with ‘many’. ‘Stars’ come in Countable Noun (stars are countless though) and for Countable Nouns ‘many’ is used."
        },
        {
            id: `${quizId}-q12`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "In that wholesale shop",
                "/ they do not sell",
                "/ fewer than ten bags of rice",
                "No error"
            ],
            correctAnswer: 3,
            explanation: "‘Ten boys’ is countable. ‘Fewer’ is correct."
        },
        {
            id: `${quizId}-q13`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "I found",
                "/ the two first chapters of the book",
                "/ particularly interesting",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘two first’ with ‘first two’. When there are both ordinal number and cardinal number is a sentence, they are arranged in order OC. First Two Ordinal Cardinal         "
        },
        {
            id: `${quizId}-q14`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "A moment delay",
                "/ would have proved costly",
                "/ in the situation",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Replace noun (moment) with an adjective (momentary). An adjective is used to qualify a noun."
        },
        {
            id: `${quizId}-q15`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "When my sister was ill",
                "/ I went to the hospital",
                "/ on alternative days",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace ‘alternative’ with ‘alternate’. ‘Alternate’ means ‘something happening on one day and not the next and then continues in this pattern’. ‘Alternative’ means that ‘substitutes others’. (fodYi)"
        },
        {
            id: `${quizId}-q16`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Lasers are",
                "/ indispensable tools",
                "/ for the delicate eyes surgery",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace ‘eyes’ with ‘eye’. If noun works as an adjective it is used in singular form. Here ‘eye’ is acting as an adjective. Hence it will be used in singular form."
        },
        {
            id: `${quizId}-q17`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "It was a pleasant",
                "/ four hours drive",
                "/ from Pune to Nasik",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘hours’ with ‘hour’. If a definite numeral adjective is added before the noun (hours), it takes singular form."
        },
        {
            id: `${quizId}-q18`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "There are so many filth",
                "/ all around",
                "/ the place",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Replace ‘many’ with ‘much’ because ‘much’ is used for Uncountable Nouns. Here, ‘filth’ (xanxh) is an Uncountable Noun."
        },
        {
            id: `${quizId}-q19`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "We are going to launch",
                "/ this three-crores project",
                "/ within the next few months",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘three-crores’ with three- crore. In hyphenated compound adjectives, the noun is used in singular form."
        },
        {
            id: `${quizId}-q20`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "After a carefully investigation",
                "/ we discovered",
                "/ that the house was infested with termites",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Replace ‘carefully’ with careful. We need an adjective ‘Careful’ before noun ‘investigation’."
        },
        {
            id: `${quizId}-q21`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Of all the models",
                "/ Jessica is",
                "/ the more good-looking one",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace ‘more’ with most. Definite article ‘the’ is used with Superlative Degrees. When one is chosen out of all, we need a ‘Superlative degree’."
        },
        {
            id: `${quizId}-q22`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The circulation of The Statesman",
                "/ is greater than",
                "/ that of any newspaper",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace ‘any newspaper’ with ‘any other newspaper’. If one is compared with all the others of the same variety, ‘any other’ is used to exclude the former."
        },
        {
            id: `${quizId}-q23`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the correct option.",
            options: [
                "They agreed",
                "to repair the damage",
                "freely of charge",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace ‘freely of charge’ with ‘free of charge’. ‘free of charge’ means ‘without payment’."
        },
        {
            id: `${quizId}-q24`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Thanks to medical research",
                "/ our lives have become",
                "/ healthier and long",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace ‘long’ with ‘longer’. Conjunction joins adjectives that are in the same degree."
        },
        {
            id: `${quizId}-q25`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The Railways have made",
                "/ crossing the tracks",
                "/ a punished offence",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace ‘punished’ with ‘punishable’ because an adjective is used to qualify a noun."
        },
        {
            id: `${quizId}-q26`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The children’s dog",
                "/ slept quietly",
                "/ in their uncle’s house",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Here ‘their’ gives an impression that the uncle was of dog too. For clarity use ‘in the house of the children’s uncle’."
        },
        {
            id: `${quizId}-q27`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "I am more lonelier",
                "/ here than",
                "/ I was in the USA",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Replace ‘more lonelier’ with ‘more lonely’ because use of double comparative in a sentence is wrong."
        },
        {
            id: `${quizId}-q28`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "In his old age,",
                "/ a person is likely to get",
                "/ more weak day by day",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace ‘more weak’ with ‘weaker’. The ‘Comparative Degree’ of ‘weak’ is weaker."
        },
        {
            id: `${quizId}-q29`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "This is",
                "/ the most unique",
                "/ idea to solve the problem",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘the most unique’ with ‘a unique’. Adjectives like ‘interior’, ‘exterior’, ulterior, major, minor, unique etc. are not used in comparative or superlative degree."
        },
        {
            id: `${quizId}-q30`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "To the ordinary man, in fact, the pealing of bells",
                "/ is a monotonous jangle and a nuisance",
                "/ tolerably only when mitigated by remote distance and sentimental association",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace ‘tolerably’ with ‘tolerable’ because an Adj. is used to qualify a Noun."
        },
        {
            id: `${quizId}-q31`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "If you have a way with words,",
                "/ a good sense of design and administration ability",
                "/ you may enjoy working in the high pressure world of advertising",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘administration’ with ‘administrative’ because an Adjective is used to qualify a noun."
        },
        {
            id: `${quizId}-q32`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Long car journeys",
                "/ are even less pleasant",
                "/ for it is quite impossible to read even",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace ‘read even’ with ‘even read’."
        },
        {
            id: `${quizId}-q33`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The technician reminded them",
                "/ to have a thoroughly cleaning of the machine",
                "/ after each use",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘a thoroughly cleaning’ with ‘a thorough cleaning’."
        },
        {
            id: `${quizId}-q34`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The Hindu is",
                "/ most popular, than any other",
                "/ newspaper in India",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘most’ with ‘more’. For comparison comparative degree is used. ‘Than’ takes a comparative degree."
        },
        {
            id: `${quizId}-q35`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Bose is",
                "/ more popular than",
                "/ any student in the class",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace ‘any student’ with ‘any other student’."
        },
        {
            id: `${quizId}-q36`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Miss Rama Devi has",
                "/ two elephants, ten horses",
                "/ and as much as fifty cars",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace ‘as much as’ with ‘as many as’. ‘Many’ is used for Countable Nouns whereas ‘much’ is used for uncountable noun."
        },
        {
            id: `${quizId}-q37`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "This errors",
                "/ are made",
                "/ by foreigners",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Replace ‘this’ with ‘these’. ‘Errors bing plural will take plural adjective (these) and not singular adjective (this)"
        },
        {
            id: `${quizId}-q38`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "On entering the crowding room",
                "/ I could not see one person",
                "/ whom I knew",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Replace ‘crowding’ with ‘crowded’. An Adj. is used for qualifying a Noun."
        },
        {
            id: `${quizId}-q39`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Though we both are of the same height",
                "/ you are more heavier",
                "/ than I",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘more heavier’ with ‘heavier’ A Double Comparative should not be used in a sentence."
        },
        {
            id: `${quizId}-q40`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "One should",
                "/ look after",
                "/ their parents",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace ‘their’ with ‘one’s’ because when ‘one’ is used as the subject of a sentence, one’s is used as Possessive Adjective."
        },
        {
            id: `${quizId}-q41`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Across the world",
                "/ discussions on curing cancer are any longer",
                "/ just wishful thinking",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘are any longer’ with ‘are no longer’."
        },
        {
            id: `${quizId}-q42`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The vacancy was filled",
                "/ by a young scholar",
                "/ who had an extensible knowledge of ancient art",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace ‘extensible’ with ‘extensive’. Extensive means ‘wide or considerable extent’. (o`gr)"
        },
        {
            id: `${quizId}-q43`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "You can eat",
                "/ as much as you like",
                "/ at the newly launch bar",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "A adjective is used to qualify a noun. Hence replace ‘launch (verb)’ with ‘launched (adjective)’."
        },
        {
            id: `${quizId}-q44`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "These all",
                "/ mangoes",
                "/ are ripe",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Replace ‘these all’ with ‘all these’. When there are more than one determiner (these, some, all) in a sentence, they follow a following order. a,an all,both,some Quantifier Article          / this,theseetc. Demonstrativecase    "
        },
        {
            id: `${quizId}-q45`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "It is a",
                "/ desert",
                "/ place",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace 'desert' with 'deserted'."
        },
        {
            id: `${quizId}-q46`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "The two last",
            options: [
                "/ chapters of the book",
                "/ are very interesting",
                "No error",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "When there are an ordinal number and cardinal number present in a sentence, an ordinal number always comes before the cardinal number. Hence replace ‘the two last’ with ‘the last two’."
        },
        {
            id: `${quizId}-q47`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Mango, the most unique fruit",
                "/ is available in India",
                "/ in plenty",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Adjectives like ‘interior’, ‘exterior’, ulterior, major, minor, unique etc. are not used in comparative or superlative degree. Hence replace ‘the most unique’ with ‘a unique’."
        },
        {
            id: `${quizId}-q48`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "You are",
                "/ more beautiful",
                "/ than her",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Change ‘her’ into ‘she’. Subject (you) is compared to subject (she)."
        },
        {
            id: `${quizId}-q49`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "In his book",
                "/ Churchill describes",
                "/ that historical first meeting with Roosevelt",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace ‘historical first meeting’ with ‘the first historical meeting’."
        },
        {
            id: `${quizId}-q50`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The dress that the",
                "/ girl wore was",
                "/ more attractive than the other girls",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Comparison always takes place between two similar things. Here ‘Dress’ should be compared with ‘Dress’. Hence ‘than that of the other girls’ should be used here."
        }
    ];

    window.GJU_QUIZ_BANK.push({
        id: quizId,
        title: "English Detecting Errors Practice Set 1",
        subject: "English",
        difficulty: "Hard",
        questions
    });
})();