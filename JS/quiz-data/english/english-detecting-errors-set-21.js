(function () {
    "use strict";

    window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];

    const quizId = "english-detecting-errors-set-21";

    const questions = [
        {
            id: `${quizId}-q01`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "It is I",
                "/ who is to blame",
                "/ for this bad situation",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘is’ with ‘am’. The verb that follows a relative pronoun (here ‘who’) agrees to the antecedent to the relative pronoun (here ‘I’)"
        },
        {
            id: `${quizId}-q02`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Patience as well as perseverance",
                "/ are necessary",
                "/ for success",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘are’ with ‘is’. If the subject is joined by ‘as well as’, ‘with’, ‘along with’, ‘together with’ ... etc, the verb will agree with the first subject. Here first subject is uncountable noun so it will take singular verb."
        },
        {
            id: `${quizId}-q03`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "In Singapore",
                "/ my brother-in-law with his wife",
                "/ were present at the function",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace ‘were’ with ‘was’. If the two subject are joined by ‘as well as’ ‘with’, ‘together with’ ‘along with’ etc, the verb will agree with first subject. Here the first subject is singular (brother-in-law)."
        },
        {
            id: `${quizId}-q04`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "He is one of those writers",
                "/ who has won acclaim",
                "/ the world over",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘has’ with ‘have’. The verb that comes after relative Pronoun depends upon its antecedent. Here antecedent of Relative Pronoun (who) is Plural Noun (writers) hence it will agree with Plural verb (have)."
        },
        {
            id: `${quizId}-q05`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The ebb and flow of the tides",
                "/ are",
                "/ now understood",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘are’ with ‘is’. If ‘two’ or more than two Nouns or Adjectives are joined by ‘and’ but only Person or thing or idea is discussed, singular verb is used. Here ‘ebb and flow’ is considered as singular subject."
        },
        {
            id: `${quizId}-q06`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Knowledge of",
                "/ at least two languages",
                "/ are required to pass the examination",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace ‘are’ with ‘is’ because here the main subject is knowledge which is an uncountable noun so it will take singular verb."
        },
        {
            id: `${quizId}-q07`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The Secretary and the Principal of the college",
                "/ are attending",
                "/ the District Development Council Meeting at the Collectorate",
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
                "A hot and",
                "/ a cold spring",
                "/ was found near each other",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace ‘was’ with ‘were’. If two different subjects are joined by ‘and’, Plural verb is used. Here Article has come before both the subject. This indicates that there are two subjects."
        },
        {
            id: `${quizId}-q09`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Either of the roads",
                "/ lead",
                "/ to the park",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘lead’ with ‘leads’. The structure we follow for this type of sentence is Either+ of + plural noun + singular verb."
        },
        {
            id: `${quizId}-q10`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "One of my desires",
                "/ are to become",
                "/ a doctor",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘are’ with ‘is’. If ‘of’ is used after ‘each’, ‘every’ ‘one’ etc, the Noun or Pronoun that comes immediately after ‘of’ will be plural in form. However the verb that comes in latter part of the sentence will be singular."
        },
        {
            id: `${quizId}-q11`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The strain of all",
                "/ the difficulties and vexations and anxieties",
                "/ are more than he could bear",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace ‘are’ with ‘is’. Here the main subject is ‘strain’ which is singular, so the verb should also be singular."
        },
        {
            id: `${quizId}-q12`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Kambli is one of the players",
                "/ who has been selected",
                "/ for the test match",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘has’ with ‘have’. The verb used after the relative Pronoun depends upon its antecedent. Here ‘antecedent’ of ‘who’ is plural. So plural verb will be used."
        },
        {
            id: `${quizId}-q13`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The introduction of tea and coffee",
                "/ and such other beverages",
                "/ have not been without some effect",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace ‘have’ with ‘has’. Here the main subject is ‘introduction’ which is singular. Hence it will agree with singular verb."
        },
        {
            id: `${quizId}-q14`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The newer type of automatic machines",
                "/ washes",
                "/ the clothes faster",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Change ‘wash’ (P.V.) into washes (S.V). ‘Washes’ agrees with singular subject (newer type)."
        },
        {
            id: `${quizId}-q15`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Each of the students in the computer class",
                "/ has to type",
                "/ their own research paper this semester",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace ‘their’ with ‘his’. The structure we follow is Each of the + Plural Noun + Singular verb / Pronoun / Adjective. If ‘of’ is used after ‘each’, the Noun or Pronoun that comes after ‘of’ will be plural in form. However, the verb, Pronoun, Adjective that comes in the latter part of the sentence will be singular."
        },
        {
            id: `${quizId}-q16`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "A variety of pleasant items in the shop",
                "/ attract",
                "/ everybody",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘attract’ with ‘attracts’ because here the subject is singular so it will take singular verb."
        },
        {
            id: `${quizId}-q17`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Neither of the two children",
                "/ said their prayer",
                "/ before going to bed",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘their’ with ‘his’. Neither + of + the + plural noun + singular verb / adjective / Pronoun."
        },
        {
            id: `${quizId}-q18`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Nine-tenths",
                "/ of the pillar",
                "/ have rotted away",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace ‘have’ with ‘has’. Nine-tenths of S.C.N + S.V P.C.N + P.V U.C.N + S.V Rule:"
        },
        {
            id: `${quizId}-q19`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "He walks",
                "/ as if the earth",
                "/ belongs to him",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace ‘belongs’ with ‘belonged’. Here the action given is completely unrealistic hence it will take ‘V2’."
        },
        {
            id: `${quizId}-q20`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "A great many student",
                "/ have been declared",
                "/ successful",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Replace ‘student’ with ‘students’. After ‘many’, ‘a great many’ and ‘a good many’ plural countable noun is used."
        },
        {
            id: `${quizId}-q21`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Do you know that it was I",
                "/ who has done",
                "/ this piece of beautiful work?",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘has done’ with ‘have done’. The verb to be used after Relative Pronoun depends on its antecedent. Here antecedent of ‘who’ is ‘I’, hence it will agree with plural verb (have) but the sentence is in past. So change ‘have’ into ‘had’."
        },
        {
            id: `${quizId}-q22`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "“The Arabian Nights”",
                "/ are indeed",
                "/ an interesting book",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘are’ with ‘is’. Here ‘the Arabian Nights’ is the name of one book and it is singular so singular verb will be used."
        },
        {
            id: `${quizId}-q23`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The Prime Minister along with his Cabinet colleagues",
                "/ have been welcomed by the Chief Minister",
                "/ at a formal ceremony",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘have’ with ‘has’ when two or more subject are joined by ‘along with’ the verb agrees with the first subject. Here the first subject is singular so it will agree with singular verb."
        },
        {
            id: `${quizId}-q24`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "He is",
                "/ one of the tallest boy",
                "/ in the class",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘boy’ with ‘boys’. Structure: One of + the + plural noun + singular verb"
        },
        {
            id: `${quizId}-q25`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The Principal and staff",
                "/ are waiting for",
                "/ the chief guest",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Add article ‘the’ before the word ‘staff’."
        },
        {
            id: `${quizId}-q26`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Our success or our failure (1) / largely depend (2) / upon our actions. (3) / No error. (5)",
            options: [
                "Part (1)",
                "Part (2)",
                "Part (3)",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘depend’ with ‘depends’. Here two subjects are joined by ‘or’, so verb agrees with the nearest subject."
        },
        {
            id: `${quizId}-q27`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Neither the mouse",
                "/ nor the lion",
                "/ were caught",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace ‘were’ with ‘was’. When two subjects are joined by neither ... nor, the verb agrees with the nearest subject."
        },
        {
            id: `${quizId}-q28`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Time and tide",
                "/ wait",
                "/ for no man",
                "No error"
            ],
            correctAnswer: 3,
            explanation: "No error. Here two subjects ‘time’ and ‘tide’ are joined by ‘and’ hence plural verb follows."
        },
        {
            id: `${quizId}-q29`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "He as well as",
                "/ you like",
                "/ to go",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘like’ with ‘likes’. When two nouns or pronouns are joined by ‘as well as’, the verb agrees with 1st subject."
        },
        {
            id: `${quizId}-q30`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Neither of these two documents",
                "/ support your claim",
                "/ on the property",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘support’ with ‘supports’. The structure should be Neither of + plural noun + singular verb"
        },
        {
            id: `${quizId}-q31`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The captain along with his team",
                "/ are practising very hard",
                "/ for the forthcoming match",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘are’ with ‘is’. When two nouns or pronouns are joined by ‘along with’ the verb will agree with the first noun."
        },
        {
            id: `${quizId}-q32`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Each of these boys",
                "/ play games",
                "/ in the playground",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘play’ with ‘plays’ Structure: Each of + plural noun + singular verb."
        },
        {
            id: `${quizId}-q33`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Not one of his lectures",
                "/ have ever been",
                "/ printed",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘have’ with ‘has’. Structure: One of + Plural Noun + Singular Verb."
        },
        {
            id: `${quizId}-q34`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Either Sohan or his friends",
                "/ is to be blamed",
                "/ for this mischief",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘is’ with ‘are’. When two nouns or pronouns are connected with ‘Either ... or’, the verb agrees with the nearest subject. Here nearest subject is plural, hence plural verb should be used."
        },
        {
            id: `${quizId}-q35`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "The increasing mechanisation of life",
            options: [
                "/ have led us farther away from daily contact with nature and",
                "/ the crafts of the farm",
                "No error",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘have’ with ‘has’. Here the main subject is singular. So it will agree with singular verb."
        },
        {
            id: `${quizId}-q36`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Drinking and driving",
                "/ are",
                "/ a major cause of accidents",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘are’ with ‘is’. If two or more than two nouns are joined by ‘and’ but only one thing or idea is discussed, it takes singular verb. Here the action is singular as a whole which means driving while drunk."
        },
        {
            id: `${quizId}-q37`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The company is using",
                "/ influence to persuade people",
                "/ to buy its refrigerators",
                "No error"
            ],
            correctAnswer: 3,
            explanation: "No error."
        },
        {
            id: `${quizId}-q38`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Everyone are expected",
                "/ to come",
                "/ to school tomorrow",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Replace ‘are’ with ‘is’ because everyone and everybody takes singular verb with it."
        },
        {
            id: `${quizId}-q39`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The artist and writer",
                "/ has",
                "/ died",
                "No error"
            ],
            correctAnswer: 3,
            explanation: "No error"
        },
        {
            id: `${quizId}-q40`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Either an officer",
                "/ or an assistant",
                "/ are required",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace ‘are’ with ‘is’ because when two Nouns or Pronouns are connected with Either ... or, the verb agrees with its nearest subject."
        },
        {
            id: `${quizId}-q41`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "‘Gulliver’s Travels’",
                "/ are indeed",
                "/ an interesting book",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘are’ with ‘is’. ‘Gulliver’s Travels’ is a name of single book, hence it will take singular verb."
        },
        {
            id: `${quizId}-q42`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Either Parmeet",
                "/ or Jyoti",
                "/ have done the crime",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace ‘have’ with ‘has’."
        },
        {
            id: `${quizId}-q43`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "I read",
                "/ a great deal of",
                "/ books",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘a great deal of’ with ‘a great number of’. ‘A great number’ is used for plural countable noun whereas ‘a great deal of’ is used in two senses ‘to a very great degree or extent’ or ‘or in great quantity’. This means ‘a great deal’ is used with uncountable Nouns."
        },
        {
            id: `${quizId}-q44`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Every child in the class",
                "/ are wearing",
                "/ sandals today",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘are’ with ‘is’. When words like each, every, either, neither are used as subjects, they take singular verb."
        },
        {
            id: `${quizId}-q45`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "One of my friend",
                "/ is returning",
                "/ to India from the U.S.A",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Replace ‘friend’ with ‘friends’. ‘One of’ is followed by Plural Noun and singular verb."
        },
        {
            id: `${quizId}-q46`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Flowers",
                "/ that are just picked",
                "/ begins to rot in 15 seconds",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace ‘begins’ with ‘begin’. A Plural subject always agrees with Plural verb."
        },
        {
            id: `${quizId}-q47`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "According to some estimates,",
                "/ there are",
                "/ seven thousand type of plants",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace ‘type’ with ‘types’."
        },
        {
            id: `${quizId}-q48`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Every one",
                "/ must sign their full names",
                "/ before entering the hall",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘their’ with ‘his’. Everyone is singular Pronoun so it takes singular adjective."
        },
        {
            id: `${quizId}-q49`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The Great Wall of China",
                "/ is the one structure build by man",
                "/ visible from the moon",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘one structure build’ with ‘one of the structures built’."
        },
        {
            id: `${quizId}-q50`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Most countries in the world",
                "/ is for",
                "/ peace",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘is’ with ‘are’ Since ‘countries’ is a plural subject."
        }
    ];

    window.GJU_QUIZ_BANK.push({
        id: quizId,
        title: "English Detecting Errors Practice Set 21",
        subject: "English",
        difficulty: "Hard",
        questions
    });
})();