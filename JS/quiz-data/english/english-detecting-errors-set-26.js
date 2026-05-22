(function () {
    "use strict";

    window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];

    const quizId = "english-detecting-errors-set-26";

    const questions = [
        {
            id: `${quizId}-q01`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "It is painful to saw that some youngsters are killing time without doing anything useful.",
            options: [
                "some youngsters are",
                "killing time without doing anything useful",
                "No error",
                "It is painful to saw that"
            ],
            correctAnswer: 3,
            explanation: "Replace ‘to saw’ with ‘to see’. After ‘to’, V1 is used."
        },
        {
            id: `${quizId}-q02`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "I knew the town well",
                "/ so I was able",
                "/ to advice him where to go",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace ‘to advice’ with ‘to advise’. After ‘to’ V1 is used. Here advice is noun whereas advise is verb."
        },
        {
            id: `${quizId}-q03`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Due to me being new",
                "/ to the city, I had",
                "/ difficulty in finding a job",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Here 'being' is a Gerund and possessive adjective comes before a Gerund. Change ‘me’ into ‘my’."
        },
        {
            id: `${quizId}-q04`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "There is no question",
                "/ of me failing",
                "/ in the examination",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Possessive case of pronouns is used before gerunds. Hence replace 'me' with 'my'. 'Me' is objective case of pronoun 'I'."
        },
        {
            id: `${quizId}-q05`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Being occupied with",
                "/ work, father had no",
                "/ time to see us",
                "No error"
            ],
            correctAnswer: 3,
            explanation: "No error"
        },
        {
            id: `${quizId}-q06`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Visitors to the zoo",
                "/ are amused by the monkeys",
                "/ play in the cages",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "'Play' will change into – 'Playing'."
        },
        {
            id: `${quizId}-q07`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Another change that (1) / I notice in her is that she (2) / avoids to speak to me (3) / No error",
            options: [
                "Part (1)",
                "Part (2)",
                "Part (3)",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "These are certain verbs which is commonly followed by gerund. e.g. admit, advise, avoid, consider, delay .... etc. Change ‘to speak’ into ‘speaking’."
        },
        {
            id: `${quizId}-q08`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Being a sunny day",
                "/ I decided to stay at home",
                "/ and take a nap",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "If 'It' is not mentioned before 'being', 'I' will automatically become the subject of 'sunny day' and will give a wrong meaning to the sentence. Hence add 'It' before 'being'."
        },
        {
            id: `${quizId}-q09`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Being in awe of them,",
                "/ the young man followed",
                "/ their direction to a tee",
                "No error"
            ],
            correctAnswer: 3,
            explanation: "‘To a tee’ means perfectly."
        },
        {
            id: `${quizId}-q10`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "I am sorry worrying you",
                "/ of my troubles",
                "/ but I could not help",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Structure: sorry + for / about + V ing sorry + to have + V3 for past actions sorry + to + V1 } for present action In Part A Replace 'sorry worrying you' with 'sorry for worrying you'. In Part B Replace 'of my trouble' with 'with my trouble'."
        },
        {
            id: `${quizId}-q11`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "In spite of",
                "/ her irritation, she",
                "/ couldn't help smile",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "If after 'can't help' any verb comes, it takes present participle form. So replace 'smile' with 'smiling'."
        },
        {
            id: `${quizId}-q12`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "I always enjoy",
                "/ to read",
                "/ books",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "After 'enjoy' Gerund is used. Hence replace 'to read' with 'reading'."
        },
        {
            id: `${quizId}-q13`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "They are looking forward",
                "/ to meet",
                "/ their parents",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "After preposition Gerund is used. Hence replace 'meet' with 'meeting'."
        },
        {
            id: `${quizId}-q14`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "I'd like a bike in commuting to work.",
            options: [
                "I'd like",
                "a bike",
                "in commuting to work",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace 'in commuting' with 'to commute'."
        },
        {
            id: `${quizId}-q15`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "It was very unfortunate of him to have lost the battle.",
            options: [
                "It was",
                "very unfortunate",
                "him to have",
                "No error"
            ],
            correctAnswer: 3,
            explanation: ""
        },
        {
            id: `${quizId}-q16`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Intrigued by this",
                "/ problem, I began search",
                "/ for a solution",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Change 'Search' into 'to search' or 'Searching' because both 'Gerund' and 'Infinitive' can be used after begin."
        },
        {
            id: `${quizId}-q17`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "We hope devotees will",
                "/ participate in the event and",
                "/ get spiritually benefit",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Change 'benefit' inot 'benefitted' because 'get' is followed by V3."
        },
        {
            id: `${quizId}-q18`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Once you graduate",
                "/ get a job",
                "/ would be easier",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace 'get' with 'getting'. Here we need a Gerund."
        },
        {
            id: `${quizId}-q19`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "I decided",
                "/ to climbed to the",
                "/ top of the hill",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace 'Climbed' with 'Climb'. We use bare form of verb after 'to'."
        },
        {
            id: `${quizId}-q20`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Scientists intended",
                "/ to reintroduce and conserve grey wolves",
                "/ in their original habitats",
                "No error"
            ],
            correctAnswer: 3,
            explanation: ""
        },
        {
            id: `${quizId}-q21`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Jayan woke up have a sore throat and by evening his voice had disappeared.",
            options: [
                "woke up",
                "by",
                "had disappeared",
                "have"
            ],
            correctAnswer: 3,
            explanation: "Replace 'have (V1)' with 'having (participle)'."
        },
        {
            id: `${quizId}-q22`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "A few years back, I used to have complaints regarding the night shifts but now I am used to work in nights",
            options: [
                "I used to have",
                "work in nights",
                "A few years back",
                "regarding"
            ],
            correctAnswer: 1,
            explanation: "Replace 'work' with 'working'. is / are / am + used to (habituated) V1 + ing."
        },
        {
            id: `${quizId}-q23`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "You need not to worry about money.",
            options: [
                "need",
                "you",
                "about money",
                "not to worry"
            ],
            correctAnswer: 3,
            explanation: "Remove 'to'. need not takes base form of verb."
        },
        {
            id: `${quizId}-q24`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "She doesn't have any dressing sense.",
            options: [
                "doesn't",
                "have any",
                "She",
                "dressing sense"
            ],
            correctAnswer: 3,
            explanation: "Change 'dressing sense' into 'dress sense'."
        },
        {
            id: `${quizId}-q25`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Yesterday, the farmer in Hathras rounded up about 25 abandoning cows and bulls and took them to a dairy in a truck.",
            options: [
                "rounded up",
                "about 25 abandoning cows",
                "the farmers",
                "took them to a dairy"
            ],
            correctAnswer: 2,
            explanation: "Replace 'abandoning' with 'abandoned' (ftls R;kx fn;k x;k gks) . We need past participle (V3) here."
        },
        {
            id: `${quizId}-q26`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Dwarf galaxies have to hold clues that could help us to understand better the nature of dark matter.",
            options: [
                "dark matter",
                "to understand better",
                "have to hold",
                "could help us"
            ],
            correctAnswer: 2,
            explanation: "Here 'have to' is unnecessary."
        },
        {
            id: `${quizId}-q27`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "The landlady made me changing the design of the kitchen three times.",
            options: [
                "the design",
                "made me",
                "changing",
                "of the kitchen"
            ],
            correctAnswer: 2,
            explanation: "Replace 'changing' with 'change'. Make + V1. Make when used as a causative verb is followed by Bare Infinitive (base form of verb)"
        },
        {
            id: `${quizId}-q28`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "He was surprised at me refusing his offer.",
            options: [
                "He was",
                "at me refusing his offer",
                "his offer",
                "surprised"
            ],
            correctAnswer: 1,
            explanation: "Replace 'me' with 'my'. Gerund (here- refusing) is preceded by possessive Adjective."
        },
        {
            id: `${quizId}-q29`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "No sooner he had left the house than there was a phone call for him.",
            options: [
                "No sooner",
                "he had left",
                "for him",
                "than there was"
            ],
            correctAnswer: 1,
            explanation: "Replace 'he had' with 'had he'. No sooner + auxiliary verb + subject. (See 'Negative Introductory Sentence' in Inversion)"
        },
        {
            id: `${quizId}-q30`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Scarcely she had heard the news when she fainted.",
            options: [
                "she fainted",
                "when",
                "heard the news",
                "Scarcely she had"
            ],
            correctAnswer: 3,
            explanation: "Replace 'she had' with 'had she'. Scarcely is followed by Inversion if the sentence starts with scarcely."
        },
        {
            id: `${quizId}-q31`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Hardly he had stepped out of the house when a tree fell on the roof.",
            options: [
                "out of",
                "Hardly he had",
                "when a tree",
                "fell on the roof"
            ],
            correctAnswer: 1,
            explanation: "Replace 'he had' with 'had he'. Hardly is followed by Inversion."
        },
        {
            id: `${quizId}-q32`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "She forgot lock",
                "/ the door when she",
                "/ went out in a hurry",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Forgot to lock the door is the correct formation."
        },
        {
            id: `${quizId}-q33`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Having just",
                "/ taking a heavy lunch,",
                "/ she was not ready to have any fruit",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Having is followed by V3. Change 'taking' into 'taken'."
        },
        {
            id: `${quizId}-q34`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "You may",
                "/ the class",
                "/ when completed the test",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Use 'leave' in place of 'left'. Modal takes base form of verb."
        },
        {
            id: `${quizId}-q35`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "I’m going to the airport to receives my friend.",
            options: [
                "my friend",
                "to the airport",
                "to receives",
                "I’m going"
            ],
            correctAnswer: 2,
            explanation: "Replace 'to receives' with 'to receive'. 'To' is followed by base form of verb."
        },
        {
            id: `${quizId}-q36`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "I use to going for a morning walk when I was living in Dehradun.",
            options: [
                "living in Dehradun",
                "for a morning walk",
                "when I was",
                "use to going"
            ],
            correctAnswer: 3,
            explanation: "Replace 'use to going' with 'used to go'. For 'Past Routine', S+used to + base form of verb is used."
        },
        {
            id: `${quizId}-q37`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "He switched on the TV to listening to the speech of the PM on the Independence Day.",
            options: [
                "He switched on the TV",
                "of the PM",
                "to listening to the speech",
                "on the Independence Day"
            ],
            correctAnswer: 2,
            explanation: "Replace 'listening' with 'listen'. To takes base form of verb."
        },
        {
            id: `${quizId}-q38`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Two American cities, witnessed shooting and resulting in mass fatalities over the weekend.",
            options: [
                "over the weekend",
                "Two American cities",
                "witnessed shooting",
                "and resulting in mass fatalities"
            ],
            correctAnswer: 3,
            explanation: "Replace 'and resulting in' with 'that resulted'. ssc Prepared by Neetu Singh (1997–2016) 1000 1000 Revised Updated 1"
        },
        {
            id: `${quizId}-q39`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "My sister",
                "/ has read",
                "/ pages after pages of the Bible",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace ‘pages after pages’ with ‘page after page’. If the same noun comes on the either side of a preposition, the noun will be in singular form."
        },
        {
            id: `${quizId}-q40`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The Prime Minister was asked",
                "/ to write a forward",
                "/ to the book",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘forward’ with ‘foreword’. ‘Foreword’ means ‘preface’."
        },
        {
            id: `${quizId}-q41`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The long-distance train",
                "/ which met with an accident",
                "/ was carrying some army personal. /",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace ‘personal’ with ‘personnel’. Here instead of an adjective (personal), plural Noun (Personnel) which means ‘staff’ should be used."
        },
        {
            id: `${quizId}-q42`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The young men from Japan",
                "/ found the assent of the mountain",
                "/ hard going",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘assent’ with ascent’. ‘Ascent’ means ‘a climb to the summit of a montain’ (p<+kbZ] <ky)"
        },
        {
            id: `${quizId}-q43`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The items I liked most",
                "/ were the rosewood carvings",
                "/ and the teak- wood furnitures of Dutch design",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace ‘furnitures’ with ‘furniture’. ‘Furniture’ is an uncountable noun so it must be in singular form."
        },
        {
            id: `${quizId}-q44`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "When the football team walked onto the field",
                "/ the crowd burst into applause,",
                "/ but some cheers were heard too",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace 'cheers' with 'abuses'. Here contrast is evident."
        },
        {
            id: `${quizId}-q45`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "The lawyer asked the complainant",
            options: [
                "/ to put his sign",
                "/ on the paper",
                "No error",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘sign’ with ‘signature’. ‘Sign’ is a verb. ‘Signature (Noun)’ must come after possessive adjective ‘his’."
        },
        {
            id: `${quizId}-q46`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The beautiful",
                "/ surrounding of the place",
                "/ enchanted me",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘surrounding’ with ‘surroundings’. ‘Surroundings’ when used as a noun is used in plural form."
        },
        {
            id: `${quizId}-q47`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "No porter being available",
                "/ he carried",
                "/ all his luggages himself",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace ‘luggages’ with ‘luggage’. ‘Luggage’ is an uncountable noun so it must be in singular form."
        },
        {
            id: `${quizId}-q48`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The table’s legs",
                "/ have been",
                "/ elaborately carved",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Replace ‘table’s legs’ with ‘The legs of table’. Apostrophe is not used with non-living things (There are certain exceptions to this rule)."
        },
        {
            id: `${quizId}-q49`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The sceneries",
                "/ of Kashmir",
                "/ is very charming",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Replace ‘sceneries’ with ‘scenery’. ‘Scenery’ is an uncountable noun so it must be in singular form."
        },
        {
            id: `${quizId}-q50`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "A few tiles on skylab",
                "/ were the only equipments",
                "/ that failed to perform well in outer space",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘equipments’ with ‘equipment’. ‘Equipment’ is an uncountable noun. An uncountable noun always exists in singular form."
        }
    ];

    window.GJU_QUIZ_BANK.push({
        id: quizId,
        title: "English Detecting Errors Practice Set 26",
        subject: "English",
        difficulty: "Hard",
        questions
    });
})();