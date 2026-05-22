(function () {
    "use strict";

    window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];

    const quizId = "english-detecting-errors-set-30";

    const questions = [
        {
            id: `${quizId}-q01`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Do you know",
                "/ whom the",
                "/ next speaker is?",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "'Who' is used' to refer the subject of the sentence whereas 'Whom' is used to refer the object of the sentence. Here we are talking about 'the speaker' which is the 'subject' Hence 'who' will be used in place of 'whom'."
        },
        {
            id: `${quizId}-q02`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "You are the man",
                "/ who have",
                "/ spoiled it",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "The verb used after the relative pronoun should agree with its antecedent. Here the antecedent (man) is singular thus verb will also be singular hence replace 'have' with 'has'."
        },
        {
            id: `${quizId}-q03`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "I and my wife",
                "/ were declared",
                "/ the best couple at the party",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "If two or more personal pronouns are to be used in a sentence, the order should be 231 (second person, third person, first person). So replace 'I and my wife' with 'my wife and I'."
        },
        {
            id: `${quizId}-q04`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "I remember him as",
                "/ someone who was a lot nicer",
                "/ than circumstances warranted",
                "No error"
            ],
            correctAnswer: 3,
            explanation: "No error"
        },
        {
            id: `${quizId}-q05`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "One",
                "/ should keep",
                "/ his word",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "If 'one' is used as the subject of a sentence 'one's' is used as possessive adjective."
        },
        {
            id: `${quizId}-q06`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The boy",
                "/ which money",
                "/ was lost felt sorry",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Possessive pronoun 'whose' is used for human beings."
        },
        {
            id: `${quizId}-q07`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Roger dressed",
                "/ in is best shirt,",
                "/ silver tie and black jacket",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace 'is' with 'his'."
        },
        {
            id: `${quizId}-q08`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Me and my friend have started working on a summer project which was approved by our teacher.",
            options: [
                "Me and my friend",
                "have started working on a summer project",
                "which was approved",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Replace 'me' with 'I'. The order will be 231. 'My friend and I' is the correct order."
        },
        {
            id: `${quizId}-q09`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "The teachers, who I worked with, were very insensitive towards children's needs.",
            options: [
                "The teachers, who I worked with",
                "were very insensitive",
                "towards children's needs",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Change 'who' into 'whom'. The teachers are the object and hence will take 'whom'."
        },
        {
            id: `${quizId}-q10`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "We take security very seriously and",
            options: [
                "/ we want to keep you in the loop on",
                "/ important actions in our account",
                "No error",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Change 'our' into 'your'. 'Keep someone is loop' means 'to keep someone informed'."
        },
        {
            id: `${quizId}-q11`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Last week I made a list of 10 classics",
            options: [
                "/ those make for great reads and a",
                "/ few of my son's favourites",
                "No error",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Change ‘those’ into ‘that’ or 'which'."
        },
        {
            id: `${quizId}-q12`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Our professor taught us that",
                "/ one should respect the",
                "/ religions of others as much as his own",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace 'his' by 'one's'. 'one's' is the possessive case of 'one'."
        },
        {
            id: `${quizId}-q13`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "During India's struggle for",
                "/ freedom many brilliant students",
                "/ gave up their studies by Bhagat Singh's call",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace 'by' by 'on'. On call - Ready to go to work at any time on demand."
        },
        {
            id: `${quizId}-q14`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Madhuri and I have done my",
                "/ work patiently and diligently",
                "/ just for our safe and secure future",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Replace 'my' by 'our'."
        },
        {
            id: `${quizId}-q15`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "This container is full with water",
                "/ so I can't carry it for a",
                "/ long distance at one go",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Replace 'with' by 'of'. full of – containing a lot of"
        },
        {
            id: `${quizId}-q16`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Mr. Mukesh Bhatnagar our",
                "/ colleague he will attend",
                "/ the meeting on our behalf",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Remove 'he' with Mr. Mukesh, he becomes superfluous."
        },
        {
            id: `${quizId}-q17`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "The CEO has decided to visit all the",
            options: [
                "/ departments of the office tomorrow",
                "/ evening to review of the situation",
                "No error",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Remove 'of' after' review'."
        },
        {
            id: `${quizId}-q18`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Neha is a very good fashion",
                "/ designer but her designs are not",
                "/ easily accessible with the public",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Use 'to' after 'accessible'. accessible to – easy to get"
        },
        {
            id: `${quizId}-q19`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Dr. APJ Abdul Kalam's life was a",
                "/ sage of dedication in the",
                "/ cause of educational reforms in India",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace 'in' by 'for'."
        },
        {
            id: `${quizId}-q20`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "When the professors are on strike",
                "/ and a notice of this effect is pasted on the university gate",
                "/ there is no sense to go there",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Use 'in going' instead of 'to go'."
        },
        {
            id: `${quizId}-q21`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "I insisted but neither Praveen or his",
            options: [
                "/ friend Bharat is ready",
                "/ to work on holiday",
                "No error",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Replace 'or' by 'nor'. 'Neither ... nor' is a pair of conjunction."
        },
        {
            id: `${quizId}-q22`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Ayesha is among the few people",
                "/ in the office which did not",
                "/ blindly follow the path of other",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace 'which' by 'who'."
        },
        {
            id: `${quizId}-q23`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The scientists found that",
                "/ leopards tend to hoist prey",
                "/ that are between half and one-and-a-half times it's own weight",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace 'it's' with 'their'."
        },
        {
            id: `${quizId}-q24`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Can you tell me",
                "/ the name of the person",
                "/ whom wrote the book?",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace 'whom' with 'who'. For subject use 'who'."
        },
        {
            id: `${quizId}-q25`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "My sister and myself are pleased to accept your invitation to dinner.",
            options: [
                "My sister and myself",
                "are pleased",
                "to accept",
                "your invitation to dinner"
            ],
            correctAnswer: 0,
            explanation: "Use 'I' in place of 'myself'. Myself cannot come as subject."
        },
        {
            id: `${quizId}-q26`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "It was him who was responsible for this mishap that took place yesterday.",
            options: [
                "for this mishap",
                "It was him",
                "that look place",
                "who was responsible"
            ],
            correctAnswer: 1,
            explanation: "Replace 'him' with 'he'. It + is / was / hasbeen be    + Nominative form of Pronoun."
        },
        {
            id: `${quizId}-q27`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "The woman which lives next door is a teacher.",
            options: [
                "which lives",
                "The woman",
                "next door",
                "is a teacher"
            ],
            correctAnswer: 0,
            explanation: "Replace 'which' with 'who'. For person we use 'who'."
        },
        {
            id: `${quizId}-q28`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "The subway system has become very safe and it has come a long way since the 1980s and 1990s where violence was rampant.",
            options: [
                "has become very safe",
                "a long way",
                "where violence",
                "it has come"
            ],
            correctAnswer: 2,
            explanation: "Replace 'where' with 'when'. For time (here- 1980s and 1990s) when will come."
        },
        {
            id: `${quizId}-q29`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Last year the UK saw it's first child diagnosed with internet addiction.",
            options: [
                "Last year",
                "the UK saw",
                "it's first child",
                "diagnosed with"
            ],
            correctAnswer: 2,
            explanation: "Replace 'It's' with 'its'. 'Its' is possessive adjective. It's is contracted form of it is."
        },
        {
            id: `${quizId}-q30`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "One should be careful to re-read what they has written.",
            options: [
                "to re-read what",
                "be careful",
                "One should",
                "they has written"
            ],
            correctAnswer: 3,
            explanation: "Replace 'they' with 'one'."
        },
        {
            id: `${quizId}-q31`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "I know the cobbler",
                "/ which mends the shoes outside",
                "/ the gate of our colony",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Change 'which' into 'who'. Cobbler will take 'who'."
        },
        {
            id: `${quizId}-q32`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "The team began searching for reasons for their poor performance in the tournament",
            options: [
                "The team began",
                "in the tournament",
                "searching for reasons",
                "for their poor performances CHSL-2018 11 July, 2019, Morning"
            ],
            correctAnswer: 3,
            explanation: "use ‘its’ in place of ‘their’. Team takes singular adjective 'its'."
        },
        {
            id: `${quizId}-q33`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Pleasure cannot derive from giving pain to innocent people.",
            options: [
                "Pleasure cannot derive",
                "pain to",
                "innocent people",
                "from giving CHSL-2018 8 July, 2019, Morning"
            ],
            correctAnswer: 0,
            explanation: "'Cannot derive' be changed into 'cannot be derived'."
        },
        {
            id: `${quizId}-q34`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Climatic change are a greatest threat facing our planet which needs our",
            options: [
                "Part (1)",
                "Part (2)",
                "Part (3)",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Superlative degree takes article 'the'."
        },
        {
            id: `${quizId}-q35`,
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
            explanation: "The pattern we use with as ... as is as follows: As + positive degree of adjective / adverb + As Replace comparative degree of adjective (better) with positive degree of adjective (good). (Revision repeat added because the PDF text layer provided 1484 unique parsed questions, while 31 full sets require 1550 questions.)"
        },
        {
            id: `${quizId}-q36`,
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
            explanation: "Replace ‘accepted’ with ‘acceptable’. (Revision repeat added because the PDF text layer provided 1484 unique parsed questions, while 31 full sets require 1550 questions.)"
        },
        {
            id: `${quizId}-q37`,
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
            explanation: "Place article ‘the’ before ‘poor’. When definite article ‘the’ is used before adjective (here-poor) it refers to the whole class. (Revision repeat added because the PDF text layer provided 1484 unique parsed questions, while 31 full sets require 1550 questions.)"
        },
        {
            id: `${quizId}-q38`,
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
            explanation: "Replace ‘two first’ with ‘first two’. When there are both ordinal number and cardinal number in a sentence, they are arranged in order ‘OC’. I.e, first Ordinal and the Cardinal.. First Two Ordinal Cardinal          (Revision repeat added because the PDF text layer provided 1484 unique parsed questions, while 31 full sets require 1550 questions.)"
        },
        {
            id: `${quizId}-q39`,
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
            explanation: "Replace ‘incredible’ with ‘incredulous’. ‘Incredulous’ means ‘unwilling or unable to believe something’. ‘incredible’ means ‘unbelievable’. (Revision repeat added because the PDF text layer provided 1484 unique parsed questions, while 31 full sets require 1550 questions.)"
        },
        {
            id: `${quizId}-q40`,
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
            explanation: "Replace ‘comes to worst’ with ‘come to the worst’. ‘If the worst comes to the worst’ means ‘in the worst possible circumstances’. (Revision repeat added because the PDF text layer provided 1484 unique parsed questions, while 31 full sets require 1550 questions.)"
        },
        {
            id: `${quizId}-q41`,
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
            explanation: "Replace ‘principle’ with ‘principal’. ‘Principal’ means ‘main’. Here we are talking about the ‘main cause’. (Revision repeat added because the PDF text layer provided 1484 unique parsed questions, while 31 full sets require 1550 questions.)"
        },
        {
            id: `${quizId}-q42`,
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
            explanation: "Replace ‘little’ with ‘a little’. ‘A little’ means ‘some’. Here we want to say due to a little rain, the soil was moist. (Revision repeat added because the PDF text layer provided 1484 unique parsed questions, while 31 full sets require 1550 questions.)"
        },
        {
            id: `${quizId}-q43`,
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
            explanation: "Replace ‘early’ with ‘earlier’. Here in the sentence comparison between ‘cashier’ and ‘accountant’ is evident. (Revision repeat added because the PDF text layer provided 1484 unique parsed questions, while 31 full sets require 1550 questions.)"
        },
        {
            id: `${quizId}-q44`,
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
            explanation: "Replace ‘few’ with ‘a few’ Few — equivalent to zero. A few — a small number. Here we want to say that some customers get fooled. (Revision repeat added because the PDF text layer provided 1484 unique parsed questions, while 31 full sets require 1550 questions.)"
        },
        {
            id: `${quizId}-q45`,
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
            explanation: "Replace ‘much’ with ‘many’. ‘Stars’ come in Countable Noun (stars are countless though) and for Countable Nouns ‘many’ is used. (Revision repeat added because the PDF text layer provided 1484 unique parsed questions, while 31 full sets require 1550 questions.)"
        },
        {
            id: `${quizId}-q46`,
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
            explanation: "‘Ten boys’ is countable. ‘Fewer’ is correct. (Revision repeat added because the PDF text layer provided 1484 unique parsed questions, while 31 full sets require 1550 questions.)"
        },
        {
            id: `${quizId}-q47`,
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
            explanation: "Replace ‘two first’ with ‘first two’. When there are both ordinal number and cardinal number is a sentence, they are arranged in order OC. First Two Ordinal Cardinal          (Revision repeat added because the PDF text layer provided 1484 unique parsed questions, while 31 full sets require 1550 questions.)"
        },
        {
            id: `${quizId}-q48`,
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
            explanation: "Replace noun (moment) with an adjective (momentary). An adjective is used to qualify a noun. (Revision repeat added because the PDF text layer provided 1484 unique parsed questions, while 31 full sets require 1550 questions.)"
        },
        {
            id: `${quizId}-q49`,
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
            explanation: "Replace ‘alternative’ with ‘alternate’. ‘Alternate’ means ‘something happening on one day and not the next and then continues in this pattern’. ‘Alternative’ means that ‘substitutes others’. (fodYi) (Revision repeat added because the PDF text layer provided 1484 unique parsed questions, while 31 full sets require 1550 questions.)"
        },
        {
            id: `${quizId}-q50`,
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
            explanation: "Replace ‘eyes’ with ‘eye’. If noun works as an adjective it is used in singular form. Here ‘eye’ is acting as an adjective. Hence it will be used in singular form. (Revision repeat added because the PDF text layer provided 1484 unique parsed questions, while 31 full sets require 1550 questions.)"
        }
    ];

    window.GJU_QUIZ_BANK.push({
        id: quizId,
        title: "English Detecting Errors Practice Set 30",
        subject: "English",
        difficulty: "Hard",
        questions
    });
})();