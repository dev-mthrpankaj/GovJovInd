(function () {
    "use strict";

    window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];

    const quizId = "english-detecting-errors-set-9";

    const questions = [
        {
            id: `${quizId}-q01`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "How is Surinder",
                "/ going with",
                "/ his work ?",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘going with’ with ‘going on with’. ‘Go on’ means ‘to continue or persevere’."
        },
        {
            id: `${quizId}-q02`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "When she knocked the door,",
                "/ I said to her,",
                "/ “come in.”",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Replace ‘knocked the door’ with ‘knocked at the door."
        },
        {
            id: `${quizId}-q03`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The month of January",
                "/ takes its name",
                "/ of the Roman god Janus",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace ‘of’ with ‘from’."
        },
        {
            id: `${quizId}-q04`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "He",
                "/ is addicted",
                "/ with smoking",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "‘addicted’ takes preposition ‘to’ with ‘it’."
        },
        {
            id: `${quizId}-q05`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Entering the hotel",
                "/ he ordered for",
                "/ a drink and a sumptuous dinner",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Remove ‘for’. ‘Order’ does not take any preposition with it."
        },
        {
            id: `${quizId}-q06`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "It was he who",
                "/ came running in the house",
                "/ with the news about the earthquake",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘in’ with ‘into’."
        },
        {
            id: `${quizId}-q07`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "He is very angry on me",
                "/ because I failed",
                "/ to return his book",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Replace ‘angry on’ with ‘angry with’. • ‘angry with someone’ ‘angry at something he does.’"
        },
        {
            id: `${quizId}-q08`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Sundar",
                "/ is getting married",
                "/ with Sita",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Change ‘with’ into ‘to’. In Passive Voice ‘married’ is followed by Preposition ‘to’."
        },
        {
            id: `${quizId}-q09`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "She placed",
                "/ the offering",
                "/ to God in the altar",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace ‘in the altar’ with ‘on the altar’."
        },
        {
            id: `${quizId}-q10`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "I saw him",
                "/ coming out of the hotel",
                "/ on 10 o’clock",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace ‘on 10 O' clock’ with ‘at 10 O' clock’."
        },
        {
            id: `${quizId}-q11`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "In the fourth semester",
                "/ of the course, the",
                "/ attendance fell down",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace ‘fell down’ with ‘fell short’."
        },
        {
            id: `${quizId}-q12`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "A well-balanced diet",
                "/ is essential for",
                "/ good health",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "‘Essential’ takes preposition ‘to’."
        },
        {
            id: `${quizId}-q13`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "I went to",
                "/ see the Taj Mahal",
                "/ in a moonlit night",
                "No error"
            ],
            correctAnswer: 3,
            explanation: "Change ‘in’ into ‘on’."
        },
        {
            id: `${quizId}-q14`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Having found a piece of cheese,",
                "/ two cats went to a dog",
                "/ to divide it among them",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace ‘among’ with ‘between’. ‘Between’ is used for two whereas ‘among’ is used for more than two."
        },
        {
            id: `${quizId}-q15`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "People living in low-lying areas",
                "/ find it difficult",
                "/ to cope up with the floods",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace ‘cope up with’ with ‘cope with’."
        },
        {
            id: `${quizId}-q16`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The teacher advised to",
                "/ the student to borrow",
                "/ a book from the library within three days",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Remove ‘to’. ‘Advise’ is directly followed by an object."
        },
        {
            id: `${quizId}-q17`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "I insisted",
                "/ on his going",
                "/ there immediately",
                "No error"
            ],
            correctAnswer: 3,
            explanation: "No error. ‘Insist’ takes preposition ‘on’."
        },
        {
            id: `${quizId}-q18`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "I went there",
                "/ with a view to survey",
                "/ the entire procedure",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "‘with a view to’ is followed by ‘– ing’ form. Replace ‘survey’ with ‘surveying’. If after preposition any verb comes it is used in Gerund form."
        },
        {
            id: `${quizId}-q19`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "He laughed",
                "/ on her",
                "/ as she fell off the tree",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘on’ with ‘at’. • Laugh at someone."
        },
        {
            id: `${quizId}-q20`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The students were",
                "/ awaiting for",
                "/ the arrival of the chief guest",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace 'awaiting' with 'waiting'. ‘Await’ doesn’t take ‘for’"
        },
        {
            id: `${quizId}-q21`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "People who live on",
                "/ glass houses",
                "/ should not throw stone at others",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Replace ‘live on’ with ‘live in’."
        },
        {
            id: `${quizId}-q22`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "My friend",
                "/ has invited me",
                "/ for tea this Sunday",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace ‘for’ with ‘to’. ‘Invite’ is followed by preposition ‘to’."
        },
        {
            id: `${quizId}-q23`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "He discussed",
                "/ the murder case",
                "/ with his juniors",
                "No error"
            ],
            correctAnswer: 3,
            explanation: "No error"
        },
        {
            id: `${quizId}-q24`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "I",
                "/ go to school",
                "/ by walk",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace ‘by walk’ with ‘on foot’."
        },
        {
            id: `${quizId}-q25`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Krishnakali, an early riser and a nature-lover",
                "/ goes to morning walk at Rabindra",
                "/ Sarovar lake before dawn",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘goes to morning walk’ with ‘goes for morning walk’."
        },
        {
            id: `${quizId}-q26`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "As a boy Dhritiman is very obedient",
            options: [
                "/ polite and hard-working",
                "/ but as a student he is / always inattentive in study",
                "No error",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace ‘in’ with ‘to’. ‘inattentive’ is followed by Preposition ‘to’. Also change ‘study’ into studies’."
        },
        {
            id: `${quizId}-q27`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "The redevelopment project is aimed",
            options: [
                "/ not just providing good houses to shanty dwellers,",
                "/ but also developing infrastructure around the major Mumbai localities",
                "No error",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Replace ‘aimed’ with aimed at’. ‘aimed’ is followed by preposition ‘at’."
        },
        {
            id: `${quizId}-q28`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The old man was",
                "/ overwhelmed for joy at",
                "/ the success of his only son",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘for’ with ‘with’. ‘Overwhelmed’ is followed by preposition ‘with’."
        },
        {
            id: `${quizId}-q29`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "His composition",
                "/ is inferior",
                "/ than mine",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace ‘than’ with ‘to’. ‘Inferior’ is followed by preposition ‘to’. Any adjective ending with ‘-ior’ is followed by preposition ‘to’."
        },
        {
            id: `${quizId}-q30`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Our geography teacher told",
                "/ to study the map of India",
                "/ for a test",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Replace ‘told’ with ‘told us’. ‘Told’ is followed by an ‘object’."
        },
        {
            id: `${quizId}-q31`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Have trust on",
                "/ God and everything",
                "/ will be right",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Replace ‘trust on’ with ‘trust in’."
        },
        {
            id: `${quizId}-q32`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Smoking is undoubtedly",
                "/ very injurious",
                "/ for health",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace ‘for’ with ‘to’. ‘Injurious’ is followed by preposition ‘to’."
        },
        {
            id: `${quizId}-q33`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "You can",
                "/ open the box",
                "/ by a screwdriver",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace ‘by’ with ‘with’. For an instrument preposition ‘with’ is used."
        },
        {
            id: `${quizId}-q34`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "He is guilty",
                "/ for killing",
                "/ an innocent bird",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘for’ with ‘of’. ‘Guilty’ is followed by preposition ‘of’."
        },
        {
            id: `${quizId}-q35`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "I have just come",
                "/ to know that Mr. Ray, one of my favourite",
                "/ teachers, died with cancer recently",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace ‘died with’ with ‘died of’. ‘Die of disease’"
        },
        {
            id: `${quizId}-q36`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "He has promised",
                "/ to pay me the whole amount",
                "/ in cheque with the stipulated time",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace ‘with’ with ‘within’. Also change ‘in cheque’ into ‘by cheque’."
        },
        {
            id: `${quizId}-q37`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "After tasting both /",
                "John prefers /",
                "tea than coffee. /",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "‘Prefer’ is followed by preposition ‘to’."
        },
        {
            id: `${quizId}-q38`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "I could not put up at a hotel",
                "/ because the board and lodging charges",
                "/ were too expensive",
                "No error"
            ],
            correctAnswer: 3,
            explanation: "No error"
        },
        {
            id: `${quizId}-q39`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The lovers walked",
                "/ besides each other",
                "/ in silence",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘besides’ with ‘beside’. ‘Besides’ means ‘in addition to’. ‘Beside’ means ‘at the side of’."
        },
        {
            id: `${quizId}-q40`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "On Senegal",
                "/ it is considered impolite",
                "/ if you do not share your food",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Replace ‘on’ with ‘in’. ‘Senegal' is the name of country."
        },
        {
            id: `${quizId}-q41`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "We discussed about the problem thoroughly",
                "/ on the eve of the examination",
                "/ that I found it very easy to work it out",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "‘discuss’ is not followed by any preposition. Hence remove ‘about’."
        },
        {
            id: `${quizId}-q42`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The old lady swooned",
                "/ but was soon",
                "/ restored at senses",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "‘Restored’ is followed by preposition ‘to’."
        },
        {
            id: `${quizId}-q43`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "I shall have to",
                "/ withdraw from my savings",
                "/ to buy a new car",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Remove 'from'."
        },
        {
            id: `${quizId}-q44`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "I wish to heartily",
                "/ congratulate you for",
                "/ your astounding success",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "‘Congratulation’ is followed by preposition ‘on’."
        },
        {
            id: `${quizId}-q45`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The visitor took the vacant seat",
                "/ next from mine",
                "/ one of the many huge sofas in the room",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘next from mine’ with ‘next to mine’."
        },
        {
            id: `${quizId}-q46`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Excuse",
                "/ me",
                "/ interrupting you",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Here ‘excuse me for interrupting you’ should be used."
        },
        {
            id: `${quizId}-q47`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The serene mountains",
                "/ are conducive",
                "/ for health",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace ‘for’. with ‘to’."
        },
        {
            id: `${quizId}-q48`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The children",
                "/ laughed at",
                "/ the clown",
                "No error"
            ],
            correctAnswer: 3,
            explanation: "No error"
        },
        {
            id: `${quizId}-q49`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Our football team",
                "/ comprises of",
                "/ eleven skilled players",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "‘Comprise’ is not followed by preposition ‘of’. ‘Comprise’ means ‘consist of’."
        },
        {
            id: `${quizId}-q50`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "On a holiday",
                "/ I prefer reading story books",
                "/ than visiting my friends",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace ‘than’ with ‘to’. ‘Prefer’ is followed by Preposition ‘to’ in most cases. When prefer is followed by ‘to + infinitive’ ‘rather than’ is used. Ex: I prefer to leave rather than stay."
        }
    ];

    window.GJU_QUIZ_BANK.push({
        id: quizId,
        title: "English Detecting Errors Practice Set 9",
        subject: "English",
        difficulty: "Hard",
        questions
    });
})();