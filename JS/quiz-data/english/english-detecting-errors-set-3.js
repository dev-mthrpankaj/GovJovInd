(function () {
    "use strict";

    window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];

    const quizId = "english-detecting-errors-set-3";

    const questions = [
        {
            id: `${quizId}-q01`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "If you are a runner and bigger than 18 years,",
                "/ you can test your endurance level",
                "/ by running for the Half Marathon",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Change 'bigger' into 'older' where 'old' implies 'age'."
        },
        {
            id: `${quizId}-q02`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "They wondered",
                "/ how many windows",
                "/ were in there room",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace 'there' with 'their'. Possessive Adjective of 'they' is 'their'."
        },
        {
            id: `${quizId}-q03`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Sunita is feeling little uncomfortable today",
                "/ because she is ill, so she can perform",
                "/ her work after having some rest for a while",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace 'little' by 'a little'. little - hardly any A little - some but not much The little - not much but all that is available."
        },
        {
            id: `${quizId}-q04`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "As I see it, he appears",
                "/ to be unreasonable anxious",
                "/ about pleasing his wife",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "use 'unreasonably' instead of 'unreasonable'. 'Anxious' an Adjective takes adverb 'unreasonably'."
        },
        {
            id: `${quizId}-q05`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Mathematics and Chemistry are",
                "/ more easier than",
                "/ Physics and Biology",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Double comparitive cannot come together. Remove 'more'."
        },
        {
            id: `${quizId}-q06`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Jaipur is",
                "/ further from Patna",
                "/ than Chandigarh",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Use 'farther' instead of 'further'. farther – for phycisal distance further - for figurative distance."
        },
        {
            id: `${quizId}-q07`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Rahul was",
                "/ the richest of",
                "/ the two persons",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Use 'richer' instead of 'richest'. We use 'Comparative degree' when we choose one out of two."
        },
        {
            id: `${quizId}-q08`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Ritika gave her friend",
                "/ no money nor she did help her",
                "/ in any way",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "'no money nor did she help her' is correct. 'Nor' is followed by Inversion."
        },
        {
            id: `${quizId}-q09`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Rohan's mother advised",
                "/ him not to drive the",
                "/ car lately at night",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace 'lately' by 'late'. lately – gky gh esa late – nsj ls"
        },
        {
            id: `${quizId}-q10`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "In order to reach his office on time",
            options: [
                "/ Rohan has jogged two miles a day",
                "/ until he bought his bike",
                "No error",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace 'has jogged' into 'jogged'."
        },
        {
            id: `${quizId}-q11`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Ashutosh is one of the players",
                "/ who has been selected",
                "/ for the T20 match",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Relative pronoun 'who' takes verb form according to its antecedent. Change 'has' into 'have'."
        },
        {
            id: `${quizId}-q12`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Roshni said that she prefers",
                "/ a white shirt than coloured one",
                "/ in formal meetings",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Use 'prefered' in place of 'prefers'. Sentence is in past tense. Prefers takes 'to'. Hence answer given by SSC is wrong."
        },
        {
            id: `${quizId}-q13`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Unless you do not",
                "/ give up bad habits",
                "/ you will suffer",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Remove ‘not’. We do not use ‘not’ after ‘unless’."
        },
        {
            id: `${quizId}-q14`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Hardly had he left",
                "/ the stadium than it began",
                "/ to rain heavily",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘than’ by ‘when’. hardly........when is the correct pair of conjunction."
        },
        {
            id: `${quizId}-q15`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Pride leads to destruction of the growth of an individual and creates a vacuum devoiding of genuine relationship",
            options: [
                "Pride leads to destruction",
                "devoiding of",
                "and creates the vacuum",
                "of an individual"
            ],
            correctAnswer: 1,
            explanation: "Replace 'devoiding' with 'devoid'."
        },
        {
            id: `${quizId}-q16`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "The old man climbed seven floors with hardly no effort at all.",
            options: [
                "climbed",
                "at all",
                "The old man",
                "hardly no effort"
            ],
            correctAnswer: 3,
            explanation: "Replacce 'no' with 'any'. Two words with hidden not cannot come together. Both 'hardly' and 'nor' have hidden 'not' in them."
        },
        {
            id: `${quizId}-q17`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "We are witnessing the worse level of income inequality in decades.",
            options: [
                "in decades",
                "the worse level of",
                "income inequality",
                "are witnessing"
            ],
            correctAnswer: 1,
            explanation: "Replace 'worse' with 'worst'. 'The' takes superlative degree of Adjective."
        },
        {
            id: `${quizId}-q18`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Scientists have found that life was creeping and crawling about the Earth 1.5 billion years early than previously thought.",
            options: [
                "previously thought",
                "1.5 billion years early than",
                "Scientists have found",
                "about the Earth"
            ],
            correctAnswer: 1,
            explanation: "Replace 'early' with 'earlier'. 'Than' takes comparative degree of Adjective."
        },
        {
            id: `${quizId}-q19`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Nikhil is more braver than Sushant who is afraid of the dark.",
            options: [
                "more braver than",
                "Nikhil is",
                "who is afraid",
                "of the dark"
            ],
            correctAnswer: 0,
            explanation: "Remove 'more'. Two comparative degrees cannot come together."
        },
        {
            id: `${quizId}-q20`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "In the northern suburbs of Bengaluru,",
                "/ home to the bulk of the information technology industry",
                "/ the water crisis is even worst",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace 'worst' with 'worse'."
        },
        {
            id: `${quizId}-q21`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "He is more smarter",
                "/ than his brother though",
                "/ he does not earn much money",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Remove 'more'. It is superfluous."
        },
        {
            id: `${quizId}-q22`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "He likes to put all the garbage into a black small bag .",
            options: [
                "into a",
                "all the garbage",
                "He like to put",
                "black small bag"
            ],
            correctAnswer: 3,
            explanation: "Place 'small' before 'black'. 'NOSASECOMP' rule should be followed here. See 'Adjective'."
        },
        {
            id: `${quizId}-q23`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "My friend has started a restaurant in a wooden big building in Manali.",
            options: [
                "in Manali",
                "in a wooden big building",
                "My friend has started",
                "a restaurant"
            ],
            correctAnswer: 1,
            explanation: "Replace 'in a wooden big building\" with 'in a big wooden building'. The order is– Size + Age + Shape + Colour + Origin + Material."
        },
        {
            id: `${quizId}-q24`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "It was a really bad movie- a worse movie I’ve ever seen in my life.",
            options: [
                "in my life",
                "I’ve ever seen",
                "was a really",
                "a worse"
            ],
            correctAnswer: 3,
            explanation: "Replace 'a worse' with 'the worst'. 'I've ever seen in my life' shows that we need superlative degree here."
        },
        {
            id: `${quizId}-q25`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Doctors say that eating red meat is one of a lead cause of heart disease.",
            options: [
                "is one of a lead cause",
                "of heart disease",
                "Doctors say that",
                "eating red meat"
            ],
            correctAnswer: 0,
            explanation: "Replace 'lead cause' with 'leading causes'. One of + plural noun. One of takes plural noun and a noun takes an adjective 'leading' to qualify it."
        },
        {
            id: `${quizId}-q26`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "The novel ‘Embers’ has a captivating plot and begins with a senior army officer preparing to receive a rare visitor, a man who was once his closer friend.",
            options: [
                "his closer friend",
                "has a captivating plot",
                "a man who was once",
                "begins with"
            ],
            correctAnswer: 0,
            explanation: "Replace 'closer' with 'closest' or 'close'."
        },
        {
            id: `${quizId}-q27`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "It is estimated that most of the addict, a whopping 85%, in God’s own country Kerala, are below 25 years of age.",
            options: [
                "It is estimated that",
                "are below 25",
                "most of the addict",
                "a whopping 85%"
            ],
            correctAnswer: 2,
            explanation: "Replace 'addict' with 'addicts'. Most of is followed by uncountable noun or plural countable noun. ssc Prepared by Neetu Singh (1997–2016) 1000 1000 Revised Updated 1"
        },
        {
            id: `${quizId}-q28`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "You must either",
                "/ be regular with your studies",
                "/ and study for longer period before the examination",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace ‘and’ with ‘or’ because correct pair of conjunction is either ... or"
        },
        {
            id: `${quizId}-q29`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "No sooner",
                "/ I had spoken,",
                "than he left",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘I had’ with ‘had I’ because when a sentence begin with ‘No sooner’ it takes inversion form."
        },
        {
            id: `${quizId}-q30`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "You must either tell me",
                "/ the whole story or, at least",
                "/ the first half of it",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "‘Either’ should come after ‘tell me’ because after ‘or’ at least is given. Co-relative conjunction always connects two equal grammatical items."
        },
        {
            id: `${quizId}-q31`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Your success in the IAS examinations depends not only on",
                "/ what papers you have selected",
                "/ but on how you have written them",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "After ‘but’ ‘also’ should come because correct pair of conjunction is ‘not only ... but also’"
        },
        {
            id: `${quizId}-q32`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Scarcely had",
                "/ I arrived than",
                "/ the train left",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘than’ with ‘when’ because correct pair of conjunction is scarcely ...when"
        },
        {
            id: `${quizId}-q33`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The reason why",
                "/ he was rejected",
                "/ was because he was too young",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace ‘because’ with ‘that’ because the correct pair is ‘The reason ... that’"
        },
        {
            id: `${quizId}-q34`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Scarcely did I reach the airport,",
                "/ nervous and tense, than the plane took off,",
                "/ leaving me stranded in an alien place",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘than’ with ‘when’ because the correct pair is scarcely ... when."
        },
        {
            id: `${quizId}-q35`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "No sooner had the hockey match started",
                "/ when it began",
                "/ to rain",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘when’ with ‘than’ because the correct pair is no sooner ... than"
        },
        {
            id: `${quizId}-q36`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "All doubts are cleared",
                "/ between",
                "/ you and I",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace ‘I’ with ‘me’ because with ‘between ... and’ objective pronoun is used."
        },
        {
            id: `${quizId}-q37`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Unless you do not give",
                "/ the keys of the safe",
                "/ you will be shot",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Here ‘not’ is superfluous with unless. So remove ‘not’ from first part of the sentence."
        },
        {
            id: `${quizId}-q38`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The period",
                "/ between 1980 to 1990",
                "/ was very significant in my life",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘to’ with ‘and’ because the correct pair is Between .... and."
        },
        {
            id: `${quizId}-q39`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "If I had lots of money",
                "/ I’d give some to anybody",
                "/ who asked for it",
                "No error"
            ],
            correctAnswer: 3,
            explanation: "No error. The formula applicable here is If + subject + V2 , Subject + would + V1"
        },
        {
            id: `${quizId}-q40`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Until the world lasts,",
                "/ the earth will go",
                "/ round the sun",
                "No error"
            ],
            correctAnswer: 3,
            explanation: "No error"
        },
        {
            id: `${quizId}-q41`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "None of the diplomats at the conference",
                "/ was able either to comprehend",
                "/ or solve the problem",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Remove ‘either’ or put ‘either’ after ‘to’. Either verb verb comprehend or solve      . See explanation of 18."
        },
        {
            id: `${quizId}-q42`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "No sooner did he see",
                "/ the traffic policeman",
                "/ he wore seat belt",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Add ‘than’ before ‘he’ in 3rd part of the sentence because the correct pair is no sooner ... than."
        },
        {
            id: `${quizId}-q43`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The period",
                "/ between 1991 to 1995",
                "/ was very significant in my life",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘to’ with ‘and’ because the correct pair is between ... and."
        },
        {
            id: `${quizId}-q44`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "No sooner",
                "/ they had received the guests",
                "/ than they began entertaining them",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘they had’ with ‘had they’ because when a sentence begins with ‘no sooner’ it takes inversion form."
        },
        {
            id: `${quizId}-q45`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "No sooner did the teacher",
                "/ enter the class room",
                "/ the students got up",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Add ‘than’ before ‘the’ in 3rd part of the sentence because the correct pair is No sooner ... than."
        },
        {
            id: `${quizId}-q46`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "It is",
                "/ nothing else",
                "/ than pride",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace ‘than’ with ‘but’ because the correct pair ‘nothing else ... but’."
        },
        {
            id: `${quizId}-q47`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "My elder brother",
                "/ asked me",
                "/ that what I was doing",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Remove ‘that’. If direct speech is of ‘Wh family’, no conjunction is used when it is converted into Indirect Speech."
        },
        {
            id: `${quizId}-q48`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Our vacation is",
                "/ between 12th May",
                "/ to 12th June",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘to’ with ‘and’ because the correct pair is ‘between ... and’."
        },
        {
            id: `${quizId}-q49`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "He studied",
                "/ so hardly",
                "/ he was sure of passing",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Add ‘that’ before ‘he’ in 3rd part of the sentence. Because the correct pair is ‘so ... that’. Also change ‘hardly’ into ‘hard’."
        },
        {
            id: `${quizId}-q50`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "No sooner did I finish",
                "/ my speech, I was subjected",
                "/ to a barrage of questions",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Add ‘than’ before ‘I’ because the correct pair is ‘No sooner ... than’."
        }
    ];

    window.GJU_QUIZ_BANK.push({
        id: quizId,
        title: "English Detecting Errors Practice Set 3",
        subject: "English",
        difficulty: "Hard",
        questions
    });
})();