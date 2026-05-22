(function () {
    "use strict";

    window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];

    const quizId = "english-detecting-errors-set-11";

    const questions = [
        {
            id: `${quizId}-q01`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Our school is making",
                "/ every possible effort",
                "/ to provide best facilities and personal attention for each child",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace 'for' with 'to'. (i) Provide something to someone Eg:-Provide milk to the dog. (ii) Provide someone with something Eg:-Provide the dog with milk."
        },
        {
            id: `${quizId}-q02`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "You have received more than you bargained at.",
            options: [
                "You have",
                "more than",
                "you bargained at",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace 'at' with 'for'. 'Bargain' takes preposition 'for'. Bargain for' means 'to expect (mEehn djuk)"
        },
        {
            id: `${quizId}-q03`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "I am taking a book with me so that I'll have something to read on the train.",
            options: [
                "I am taking a book",
                "I'll have something",
                "on the train",
                "No error"
            ],
            correctAnswer: 3,
            explanation: ""
        },
        {
            id: `${quizId}-q04`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "We are committed in providing",
                "/ you a safe and",
                "/ comfortable travel experience",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Change 'in' into 'to' because committed takes 'to' which means dedicated or pledged or bound to a certain course of policy."
        },
        {
            id: `${quizId}-q05`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Most of us have a",
                "/ desire to create wealth in the",
                "/ shortest period in time",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Change 'in' into 'of' because 'period of time' is the correct structure."
        },
        {
            id: `${quizId}-q06`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Unless Geeta apologies",
                "/ she should not be",
                "/ allowed to go to picnic",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Change 'go to picnic' into 'go on a picnic'. 'Go on a picnic' means to 'have a picnic'. Here we mean the purpose not the place venue or event."
        },
        {
            id: `${quizId}-q07`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "I met the gentleman",
                "/ today evening on my",
                "/ way back to home",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Remove 'to'. 'On my, way back home is needed here."
        },
        {
            id: `${quizId}-q08`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Ram is superior than",
                "/ Shyam in his",
                "/ vision of corruption free India",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Change 'than' into 'to' because 'superior' takes preposition 'to'."
        },
        {
            id: `${quizId}-q09`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "At the one hand,",
                "/ she was elated that she'd finally",
                "/ discovered her passion",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Change ‘at’ into ‘on’ because ‘on the one hand is used to present first of the two contrasting points."
        },
        {
            id: `${quizId}-q10`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Although it is far less common in the",
            options: [
                "/ atmosphere than carbon dioxide,",
                "/ it has 20 times the ability heat- trapping",
                "No error",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Add ‘of’ after ability."
        },
        {
            id: `${quizId}-q11`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Imagine the kind of influence it",
                "/ will steadily and perpetually infuse",
                "/ on the viewer’s mindset",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Change ‘on ’ into ‘into’ because 'infuse' takes preposition 'into'. It means to instill a specific quality etc.'"
        },
        {
            id: `${quizId}-q12`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Our cricket team",
                "/ comprises of",
                "/ eleven skilled players",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Remove 'of'. 'Comprises' does not take 'of' in active voice."
        },
        {
            id: `${quizId}-q13`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Ashutosh leapt on",
                "/ the opportunity",
                "that came his way",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Change 'leapt on' into 'leapt at' because 'leap at' something means to accept a chance or an opportunity quickly."
        },
        {
            id: `${quizId}-q14`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "You don’t have to invest",
                "/ on an fancy camera if you’re",
                "/ not a photography buff",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Change ‘on’ into ‘in’ because ‘invest’ takes preposition ‘in’ with it."
        },
        {
            id: `${quizId}-q15`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "I also used to write scripts for hosting school",
                "/ functions. Though, on that time I",
                "/ hadn’t identified this interest",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Change ‘on’ into ‘at’ where ‘at that time’ means ‘a moment of time’."
        },
        {
            id: `${quizId}-q16`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Despite of minimal use of technology",
            options: [
                "/ they are able to manage",
                "/ everything in a simple manner",
                "No error",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Remove 'of'. We do not use 'of' with despite. Despite - In spite of (ds ckotwn)"
        },
        {
            id: `${quizId}-q17`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Sri Lanka is an island country",
                "/ into the Indian Ocean",
                "/ , south of India",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace 'into' with 'in'."
        },
        {
            id: `${quizId}-q18`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Reading",
                "/ provides nutrition",
                "/ with the mind",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Provide + direct object + to indirect object. Here we need 'to'."
        },
        {
            id: `${quizId}-q19`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "It brings to you a basket of opportunities",
                "/ that takes you to the positions of high",
                "/ responsibilities at top corporates",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Change 'at' into 'it'."
        },
        {
            id: `${quizId}-q20`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "There were",
                "/ curtains over",
                "/ the cracked glass",
                "No error"
            ],
            correctAnswer: 3,
            explanation: "No Error."
        },
        {
            id: `${quizId}-q21`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Ancient jewellery or decoration",
                "/ has a new meaning",
                "/ with the discovery bone ornaments",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Use 'of' after 'discovery'."
        },
        {
            id: `${quizId}-q22`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The Kepler Space Telescope,",
                "/ launched on 2009, was designed",
                "/ to find planets around other stars",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace 'on' with 'in'."
        },
        {
            id: `${quizId}-q23`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "The children play on the park every evening.",
            options: [
                "on the park",
                "The children",
                "every evening",
                "play"
            ],
            correctAnswer: 0,
            explanation: "Use 'in' in place of 'on'."
        },
        {
            id: `${quizId}-q24`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "This beautiful ring is made from gold.",
            options: [
                "from gold",
                "This",
                "beautiful ring",
                "is made"
            ],
            correctAnswer: 0,
            explanation: "Use 'of' in place of 'from'. 'Made from' comes when 'form' changes."
        },
        {
            id: `${quizId}-q25`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "The children in the colony fed the dogs by throwing pieces of meat on them.",
            options: [
                "on",
                "in",
                "by throwing",
                "fed"
            ],
            correctAnswer: 0,
            explanation: "Replace 'on' with 'over' or 'across'."
        },
        {
            id: `${quizId}-q26`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "They are going to build a new bridge in the river, if they can find the money in the next budget.",
            options: [
                "are going",
                "find the money",
                "bridge in the river",
                "next budget"
            ],
            correctAnswer: 2,
            explanation: "Replace 'in' with 'over' or 'across'."
        },
        {
            id: `${quizId}-q27`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Every day I go to school in a bus today I went by foot because the bus operators are on strike.",
            options: [
                "to school in a bus",
                "I went by foot",
                "Every day",
                "bus operators are on strike"
            ],
            correctAnswer: 3,
            explanation: "Explanation not clearly extracted from the PDF text layer; please verify once with the source PDF."
        },
        {
            id: `${quizId}-q28`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "In my dream, I saw vivid images of ghostly human figures, who were quite unusual as they imbued the quality of eeriness and they did not have any resemblance with living people.",
            options: [
                "as they imbued",
                "who were quite unusual",
                "did not have",
                "I saw vivid images"
            ],
            correctAnswer: 1,
            explanation: "Change 'who' with 'which'. For images 'which' will come."
        },
        {
            id: `${quizId}-q29`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Ramesh is very much sorry about the financial loss that he inflicted upon his close friends while working together on the same project.",
            options: [
                "that he inflicted upon",
                "while working together",
                "on the same project",
                "Ramesh is very much sorry about"
            ],
            correctAnswer: 3,
            explanation: "Change 'about' into 'for'."
        },
        {
            id: `${quizId}-q30`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "The common advice that the doctor offers to patient is to make preventive measures such as proper intake of water hygienic food habit, and regular exercise.",
            options: [
                "that the doctor",
                "and regular exercise",
                "such as proper intake of",
                "to patient is to"
            ],
            correctAnswer: 3,
            explanation: "Remove 'to'. offer does not take any preposition."
        },
        {
            id: `${quizId}-q31`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "I cannot cope out with the work pressure.",
            options: [
                "work pressure",
                "I cannot",
                "with the",
                "cope out"
            ],
            correctAnswer: 3,
            explanation: "Remove 'out'. Cope with means to tolerate"
        },
        {
            id: `${quizId}-q32`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "A lot many people do not agree with me.",
            options: [
                "A lot many",
                "people",
                "do not agree",
                "with me"
            ],
            correctAnswer: 0,
            explanation: "Use A lot of people or many people."
        },
        {
            id: `${quizId}-q33`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Can you please dispose the old clothers?",
            options: [
                "dispose",
                "the old clothes",
                "Can",
                "you please"
            ],
            correctAnswer: 0,
            explanation: "Add 'of' after 'dispose'. Dispose takes preposition 'of'."
        },
        {
            id: `${quizId}-q34`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "They went for a Bhil village for a day visit.",
            options: [
                "a day visit",
                "for",
                "for a Bhil village",
                "They went"
            ],
            correctAnswer: 1,
            explanation: "Change 'went for' into 'went to'."
        },
        {
            id: `${quizId}-q35`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "To my point of view he should not have behaved in such a manner.",
            options: [
                "should not have",
                "behaved",
                "To my point of view",
                "in such a manner"
            ],
            correctAnswer: 2,
            explanation: "Replace 'to' with 'from'.'From my point of view' means 'In my opinion'."
        },
        {
            id: `${quizId}-q36`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "This test comprises of grammar, vocabulary and reading comprehension.",
            options: [
                "grammar, vocabulary",
                "This test",
                "and reading comprehension",
                "comprises of"
            ],
            correctAnswer: 3,
            explanation: "Remove 'of'. Comprise does not take 'of' in Active voice. Comprise = Consist of"
        },
        {
            id: `${quizId}-q37`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Where have you been from such a long time?",
            options: [
                "Where",
                "from",
                "such a long time?",
                "have you been"
            ],
            correctAnswer: 1,
            explanation: "Replace 'from' with 'for'. Duration takes 'for'."
        },
        {
            id: `${quizId}-q38`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "For the long-term strength of the economy the limit of corporate stock buybacks is a potential solution.",
            options: [
                "is a potential solution",
                "strength of the economy",
                "limit of corporate stock buybacks",
                "For the long term"
            ],
            correctAnswer: 2,
            explanation: "Replace 'of' with 'on'."
        },
        {
            id: `${quizId}-q39`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "There is something special about life: the closer one looks to these performances, the more impressive the show becomes.",
            options: [
                "something special about",
                "the more impressive",
                "these performances",
                "the closer one looks to"
            ],
            correctAnswer: 3,
            explanation: "Replace 'to' with 'at'. 'Look at' – ns[kuk"
        },
        {
            id: `${quizId}-q40`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "In 2016, after some unseemly back and forth to the Commons and Lords, it was decided that Acts of Parliament should no longer be printed on calfskin.",
            options: [
                "to the Commons and Lords",
                "should no longer be printed on calfskin",
                "after some unseemly back and forth",
                "it was decided"
            ],
            correctAnswer: 0,
            explanation: "Replace 'to' with 'of'"
        },
        {
            id: `${quizId}-q41`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Haemophilia, a blood clotting disorder, can be passed about the maternal line within families; men are more likely to develop it, while women are usually carriers.",
            options: [
                "the maternal line",
                "a blood clotting disorder",
                "can be passed about",
                "likely to develop it"
            ],
            correctAnswer: 2,
            explanation: "Replace 'about' with 'through'. 'Pass through' means to be the medium of."
        },
        {
            id: `${quizId}-q42`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Rahul was ready for accept any job, even a part-time one.",
            options: [
                "Rahul was ready",
                "even a part-time one",
                "any job",
                "for accept"
            ],
            correctAnswer: 3,
            explanation: "Replace 'for' with 'to'."
        },
        {
            id: `${quizId}-q43`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Each student will have to carry his own lunch on the picnic.",
            options: [
                "Each student",
                "his own lunc",
                "on the picnic",
                "will have to carry"
            ],
            correctAnswer: 2,
            explanation: "Replace 'on' with 'to'."
        },
        {
            id: `${quizId}-q44`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "The actor smiled to me when I entered the room as if she knew me.",
            options: [
                "The actor smiled to me",
                "knew me",
                "as if she",
                "when I entered the room"
            ],
            correctAnswer: 0,
            explanation: "Replace 'to' with 'at'. Smile at a person. (ns[k dj eqLdqjkuk)"
        },
        {
            id: `${quizId}-q45`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "We reserved tickets for a journey on train for the next morning for my sisters and me.",
            options: [
                "for a journey on train",
                "for my sisters and me",
                "for the next morning",
                "We reserved tickets"
            ],
            correctAnswer: 0,
            explanation: "Replace 'on' with 'by'. 'Journey by train'."
        },
        {
            id: `${quizId}-q46`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "The Principal was extremely angry on the boys who threw the pieces of chalk at the teacher.",
            options: [
                "at the teacher",
                "extremely angry on the boys",
                "who threw the pieces of chalk",
                "The Principal was"
            ],
            correctAnswer: 1,
            explanation: "Replace 'on' with 'with'. Angry with a person."
        },
        {
            id: `${quizId}-q47`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The Japanese artist Yoh Nagao",
                "/ was busy splashing",
                "/ the wall from colours",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Use 'with'. You use 'by' with does (in Passive Voice) and 'with' with instrument / weapon etc."
        },
        {
            id: `${quizId}-q48`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "My father dissuaded me",
                "/ to try for a job as he wanted me",
                "/ to pursue higher studies",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Use from 'trying' in place of 'to try'. Dissuade takes preposition 'from'."
        },
        {
            id: `${quizId}-q49`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Not complying by",
                "/ any of the laws can land",
                "/ you into serious trouble",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Comply takes with after it."
        },
        {
            id: `${quizId}-q50`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Although there are",
                "/ more than a hundred known elements",
                "/ they rarely occur at a pure state",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Use 'in' in place of 'at'."
        }
    ];

    window.GJU_QUIZ_BANK.push({
        id: quizId,
        title: "English Detecting Errors Practice Set 11",
        subject: "English",
        difficulty: "Hard",
        questions
    });
})();