(function () {
    "use strict";

    window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];

    const quizId = "english-detecting-errors-set-23";

    const questions = [
        {
            id: `${quizId}-q01`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Although Niratyay is very intelligent and sincere",
                "/ in his dealings he",
                "/ often tells lies",
                "No error"
            ],
            correctAnswer: 3,
            explanation: "No error"
        },
        {
            id: `${quizId}-q02`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Each of the students participating",
            options: [
                "/ in the drawing competition",
                "/ have to bring his own materials",
                "No error",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace ‘have’ with ‘has’. Each of + Plural Noun + Singular verb."
        },
        {
            id: `${quizId}-q03`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Raj surprised everyone",
                "/ when he created an unbreakable record",
                "/ of one and a half centuries",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Change ‘one and a half centuries’ into ‘one century and a half’."
        },
        {
            id: `${quizId}-q04`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Some of our latest canon",
                "/ that have come out of the production",
                "/ line have a very long range",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Replace ‘canon’ with ‘canons’. ‘Some of’ is followed by Plural Noun / Pronoun if ‘some’ is used with Countable Noun."
        },
        {
            id: `${quizId}-q05`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Most of the members at the meeting felt",
                "/ that the group appointed to investigate the case",
                "/ were not competent to do the job efficiently",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace ‘were’ with ‘was’ because ‘group’ is a Collective Noun and Collective Noun takes singular verb with it."
        },
        {
            id: `${quizId}-q06`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Neither the size",
                "/ nor the colour of the gloves",
                "/ were right",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace ‘were’ with ‘was’ because when two Nouns / Pronouns are joined by neither ... nor, the verb agrees with the nearest subject. Here the nearest subject (colour) is singular so it will take singular verb."
        },
        {
            id: `${quizId}-q07`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Neither of the sisters",
                "/ are sensible enough",
                "/ to carry out the plan",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘are’ with ‘is’ because ‘neither of’ is followed by Plural Noun and Singular Verb"
        },
        {
            id: `${quizId}-q08`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Everyone were happy to hear about his success.",
            options: [
                "to hear",
                "about his sucess",
                "No error",
                "Everyone were happy"
            ],
            correctAnswer: 3,
            explanation: "Replace ‘were’ with ‘was’ because ‘everyone’ is followed by Singular Verb."
        },
        {
            id: `${quizId}-q09`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "The lions kill the animals and eat his meat.",
            options: [
                "The lions",
                "and eat his meat",
                "kill the animals",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘his’ with ‘their’ because here the object (animals) is plural so it will take plural possessive adjective (their)."
        },
        {
            id: `${quizId}-q10`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "The team was now in the field and about to take their place.",
            options: [
                "No error",
                "The team was",
                "about to take their",
                "now in the field and place"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘was’ with ‘were’ because ‘Team’ is considered plural here. We are talking about the players here taking their respective position here."
        },
        {
            id: `${quizId}-q11`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "The media play a vital role in popularising a brand.",
            options: [
                "The media play",
                "in popularising a brand",
                "No error",
                "a vital role"
            ],
            correctAnswer: 0,
            explanation: "Replace ‘play’ with ‘plays’ because here the main subject (the media) is taken as singular though it is plural of noun ‘medium’. 116.(2) No error"
        },
        {
            id: `${quizId}-q12`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "The sum and substance of this poem is as follows.",
            options: [
                "of this poem",
                "No error",
                "The sum and substance",
                "is as follows"
            ],
            correctAnswer: 3,
            explanation: "Explanation not clearly extracted from the PDF text layer; please verify once with the source PDF."
        },
        {
            id: `${quizId}-q13`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Just outside my house are a playground for school boys and girls.",
            options: [
                "Just outside my house",
                "are a playground",
                "No error",
                "for school boys and girls"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘are’ with ‘is’ because here subject (the playground) is singular. A singular subject always takes Singular Verb."
        },
        {
            id: `${quizId}-q14`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Many a man want to be rich quickly.",
            options: [
                "rich quickly",
                "want to be",
                "Many a man",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘want’ with ‘wants’ because here the main subject ‘man’ is singular and will take Singular Verb. 119.(4) Change ‘is’ into ‘are’ “Whereabouts’ is Plural."
        },
        {
            id: `${quizId}-q15`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "The Russian ambassador’s whereabouts is not known to anyone.",
            options: [
                "No error",
                "The Russian ambassador’s",
                "not known to anyone",
                "where abouts is"
            ],
            correctAnswer: 3,
            explanation: "Explanation not clearly extracted from the PDF text layer; please verify once with the source PDF."
        },
        {
            id: `${quizId}-q16`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Thoughts about the slaughtered children is uppermost on my mind.",
            options: [
                "are uppermost on my mind",
                "slaughtered children",
                "Thoughts about the",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Replace ‘is’ with ‘are’ because here the main subject is ‘thoughts’ which is plural. A plural subject takes plural verb."
        },
        {
            id: `${quizId}-q17`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "The luxuries of the riches are maintained by depriving the poor of their dues.",
            options: [
                "The luxuries of the riches",
                "the poor of their dues",
                "are maintained by depriving",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Replace ‘the riches’ with ‘the rich’."
        },
        {
            id: `${quizId}-q18`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Orwell is one of those authors who do his best to irritate the reader.",
            options: [
                "Orwell is one of those",
                "No error",
                "who do his best",
                "to irritate the reader"
            ],
            correctAnswer: 2,
            explanation: "Replace ‘his’ with ‘their’ because ‘Relative Pronoun’ is followed by verb and adjective that agree to the antecedent of the Relative Pronoun."
        },
        {
            id: `${quizId}-q19`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Things in Nature die a temporary deaths only to appear again.",
            options: [
                "only to appear again",
                "die a temporary deaths",
                "Things in Nature",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Here ‘die a temporary death’ should be used. 124.(2) Replace 'give' with 'gives' because here the main subject is singular hence will take singular verb. 125.(4) Replace ‘is foolish’ with ‘is a fool’. Because here Noun is required not an adjective."
        },
        {
            id: `${quizId}-q20`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Riches are uncertain things, and the fame that power give or is won by foul means is as shortlived as the dewdrop.",
            options: [
                "is as shortlived as the dewdrop",
                "that power give or is won by foul means",
                "Riches are uncertain things, and the fame",
                "No error"
            ],
            correctAnswer: 3,
            explanation: "Explanation not clearly extracted from the PDF text layer; please verify once with the source PDF."
        },
        {
            id: `${quizId}-q21`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Whoever assumes his statement true is foolish",
            options: [
                "his statement true",
                "No error",
                "Whoever assumes",
                "is foolish"
            ],
            correctAnswer: 3,
            explanation: "Explanation not clearly extracted from the PDF text layer; please verify once with the source PDF."
        },
        {
            id: `${quizId}-q22`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Electronic mail or E-mail",
                "/ are a method of exchanging",
                "/ digital messages",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘are’ with ‘is’ when two nouns are joined by ‘or’, it takes Singular Verb. 127.(4) Replace 'scientist' with 'scientists'."
        },
        {
            id: `${quizId}-q23`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Scientist now hope that cloning can successfully be conducted in human beings in the near future.",
            options: [
                "No error",
                "can successfully be conducted in",
                "human beings in the near future",
                "Scientist now hope that cloning"
            ],
            correctAnswer: 3,
            explanation: "Explanation not clearly extracted from the PDF text layer; please verify once with the source PDF."
        },
        {
            id: `${quizId}-q24`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "That summer, elections were",
                "/ held at many a place",
                "/ without any untoward incident",
                "No error"
            ],
            correctAnswer: 3,
            explanation: "'Many a' is used with 'singular noun'."
        },
        {
            id: `${quizId}-q25`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "We have to accept",
                "/ that driving vehicles",
                "/ require expertise",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "If the subject is singular, the verb must be singular. Use 'requires' in place of 'require' as the main subject is 'driving'."
        },
        {
            id: `${quizId}-q26`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The average age at which",
                "/ people die of heart diseases",
                "/ are decreasing",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Here the subject is 'average age', and it is singular hence it will take singular verb (is). So replace 'are' with 'is'."
        },
        {
            id: `${quizId}-q27`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "I asked two persons",
                "/ the way to the school",
                "/ but neither of them knew it",
                "No error"
            ],
            correctAnswer: 3,
            explanation: "No error"
        },
        {
            id: `${quizId}-q28`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "One of the state",
                "/ in which there was a severe drought",
                "/ last year is Maharashtra",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "If 'of ' is used after each, every, one, etc, the noun or pronoun that comes immediately after 'of' will be in plural in form. Hence replace ‘state’ with ‘states’."
        },
        {
            id: `${quizId}-q29`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Grandfather along",
                "/ with the children",
                "/ have gone to Chennai",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "If the subject is joined by 'as well as', 'with', 'along with' 'together with', etc, the verb will agree with the first subject. Thus 'have' will be replaced by 'has'."
        },
        {
            id: `${quizId}-q30`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The unique selling proposition of",
                "/ our products are that",
                "/ they are unbreakable",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "In this sentence the subject is 'The unique selling proposition' and it is singular hence it will take singular verb. So replace 'are' with 'is'."
        },
        {
            id: `${quizId}-q31`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Each of the girls",
                "/ have come",
                "/ with her books",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "If 'of' is used after each, every, one, etc., the noun or pronoun that comes immediately after 'of' will be plural in form. However the verb, pronoun, adjective, etc., that comes in the latter part of the sentence will be singular in form. Ex: One of the PluralNoun S.V. boys has        done S.A. his  work. Hence replace ' Plural verb have    ' with ' Singular verb has    '."
        },
        {
            id: `${quizId}-q32`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "My brother",
                "/ along with his friends",
                "/ are going on a tour",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "If the subject is joined with 'along with', the verb will agree with the first subject. Here the first subject (my brother) is singular and so it will take singular verb (is). Replace 'are' with 'is'."
        },
        {
            id: `${quizId}-q33`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Police reports claim that",
                "/ substantial seizure of cocaine have been made",
                "/ in the last two months",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Here the main subject (seizure) is singular hence the verb that follows should also be singular. Replace 'have' with 'has'."
        },
        {
            id: `${quizId}-q34`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Neither of the scout leaders know",
                "/ how to trap wild animals",
                "/ or how to prepare them for mounting",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Replace 'know' with 'knows'. 'Neither of' takes singular verb."
        },
        {
            id: `${quizId}-q35`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Too great a",
                "/ variety of studies",
                "/ distract the mind",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Here the subject (a variety) is singular hence it will agree with singular verb (distracts). Replace 'distract' with 'distracts'."
        },
        {
            id: `${quizId}-q36`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "There were extensive",
                "/ lawn in front",
                "/ of the bungalow",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "'Lawns in front' is the correct use"
        },
        {
            id: `${quizId}-q37`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The chairs in the",
                "room are in a",
                "/ state disarray",
                "No error"
            ],
            correctAnswer: 3,
            explanation: "No error"
        },
        {
            id: `${quizId}-q38`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The light bulbs",
                "/ or the hall",
                "/ need to be changed",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Use 'needs (S.V)' for hall (S.S)."
        },
        {
            id: `${quizId}-q39`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "My husband was work, so I went shopping.",
            options: [
                "My husband",
                "was work",
                "I went shopping",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Change 'work' into 'working'."
        },
        {
            id: `${quizId}-q40`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Volkswagen literally translates to 'people's car', but ironically most of its cars is out of reach of the common people.",
            options: [
                "translates to 'people's car',",
                "most of its cars is",
                "out of reach of",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace 'is' with 'are'. Most of its cars will take plural verb."
        },
        {
            id: `${quizId}-q41`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Bradbury, one of the most versatile writer ever lived, was a school dropout.",
            options: [
                "Bradbury, one of the most",
                "versatile writer ever lived",
                "was a school dropout",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace 'writer' with 'writers'. Use plural noun after 'one of'."
        },
        {
            id: `${quizId}-q42`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "My brother, along with his friends, have gone to watch a movie at the nearest cinema hall.",
            options: [
                "at the nearest cinema hall",
                "My brother, along with his friends,",
                "have gone to watch a movie",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace 'have' with 'has'. Verb agree to the 1st subject if the conjunction is 'along with'."
        },
        {
            id: `${quizId}-q43`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Each of the girls in my class sing well.",
            options: [
                "Each of the girls",
                "sing well",
                "in my class",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace 'sing' with 'sings'. Each takes singular verb."
        },
        {
            id: `${quizId}-q44`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "The moon are full and the stars are out.",
            options: [
                "The moon are full",
                "and the stars",
                "are out",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Replace 'are' with 'is'. Moon (singular noun) takes singular verb."
        },
        {
            id: `${quizId}-q45`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "A fatigued relationship with her husband persuaded her to consult a marriage counsellor in order to save her marriage.",
            options: [
                "fatigued",
                "persuaded",
                "consult",
                "No error"
            ],
            correctAnswer: 3,
            explanation: ""
        },
        {
            id: `${quizId}-q46`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The report is candid in admitting",
                "/ that the investment by the Government",
                "/ in health and family planning have eroded considerably",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace 'have' with 'has'. Investment (singular noun) will take singular verb."
        },
        {
            id: `${quizId}-q47`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The number of guests",
                "/ invited to the party",
                "/ are five hundred",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Change 'are' into 'is' because 'the number of' denotes the number, hence it will take singular verb."
        },
        {
            id: `${quizId}-q48`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Many a man have",
                "/ come to India from Canada",
                "/ to live here permanently",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Change 'have' into 'has' because after 'Many a / an' + singular countable noun in followed by singular verb."
        },
        {
            id: `${quizId}-q49`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Every student have",
                "/ to submit the assignment",
                "/ by this afternoon",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Change 'have' into 'has' because 'every', takes singular verb."
        },
        {
            id: `${quizId}-q50`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "My sister-in-law",
                "/ who lives in Chennai",
                "/ have come to stay with us",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Change 'have' into 'has' because the antecedent of relative pronoun 'who' is my sister-in-law which is singular so the verb should be singular."
        }
    ];

    window.GJU_QUIZ_BANK.push({
        id: quizId,
        title: "English Detecting Errors Practice Set 23",
        subject: "English",
        difficulty: "Hard",
        questions
    });
})();