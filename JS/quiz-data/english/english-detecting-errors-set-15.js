(function () {
    "use strict";

    window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];

    const quizId = "english-detecting-errors-set-15";

    const questions = [
        {
            id: `${quizId}-q01`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "A newly released study has found that more people were injuring riding electric scooters than by riding bicycles.",
            options: [
                "that more people",
                "A newly released study has found",
                "injuring riding electric scooters",
                "than by riding bicycles"
            ],
            correctAnswer: 2,
            explanation: "Replace 'injuring' with 'injured'. Injure – ?kk;y djukA Were Infured – ?kk;y gksus ds vFkZ esaA"
        },
        {
            id: `${quizId}-q02`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "It seems that authors' creativity is not restrict to their work and happily overflows into their names too.",
            options: [
                "happily overflows",
                "authors' creativity",
                "into their names too",
                "restrict to their work"
            ],
            correctAnswer: 3,
            explanation: "Replace 'restrict' with 'restricted'."
        },
        {
            id: `${quizId}-q03`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Due to the Cyclone Ldai",
                "/ vast areas of land have been flooded,",
                "/ roads destroyed and communications",
                "/ disrupting in Zimbabwe and Mosam- bique"
            ],
            correctAnswer: 3,
            explanation: "Replace 'disruping' with 'disrupted'."
        },
        {
            id: `${quizId}-q04`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The reduction in the cost of education",
                "/ due to an increase in subsidies",
                "/ offer by the government is also seen as a reason to get more educated",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "The sentence is in Passive Voice Replace 'offer' by 'offered'."
        },
        {
            id: `${quizId}-q05`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Three more elevated roads have been propose in the new plan to unclog the traffic in Delhi.",
            options: [
                "in the new plan",
                "Three more elevated roads",
                "to unclog the traffic in Delhi",
                "have been propose CHSL-2018 1 July, 2019, Evening"
            ],
            correctAnswer: 3,
            explanation: "use ‘proposed’ in place of ‘propose’. The sentence is in Passive voice."
        },
        {
            id: `${quizId}-q06`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Wealth creators are essential for money to distributed in the economy.",
            options: [
                "for money to distributed",
                "are essential",
                "in the economy",
                "Wealth creators"
            ],
            correctAnswer: 0,
            explanation: "Replace 'to distributed' with 'to be distributed (Passive Infinitive)'. ssc Prepared by Neetu Singh (1997–2016) 1000 1000 Revised Updated 1"
        },
        {
            id: `${quizId}-q07`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "She pretends as if she has",
                "/ never in her life,",
                "/ told a lie. Isn’t it ?",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace ‘isn’t it’ with ‘doesn’t she’. because the sentence and Question Tag must be in the same tense."
        },
        {
            id: `${quizId}-q08`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The earth moves",
                "/ round the Sun",
                "/ Isn’t it ?",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace ‘isn’t it’ with ‘doesn’t it’."
        },
        {
            id: `${quizId}-q09`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "He is not the fastest bowler",
                "/ in the Indian team,",
                "/ isn’t he ?",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace ‘isn’t he’ with ‘is he’. If a sentence is positive, the Question Tag must be negative."
        },
        {
            id: `${quizId}-q10`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Everybody in the office",
                "/ has left early,",
                "/ haven’t they ?",
                "No error"
            ],
            correctAnswer: 3,
            explanation: "No error. Every one is singular but in question tag it takes plural pronoun and plural verb."
        },
        {
            id: `${quizId}-q11`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "You will come",
                "/ to my sister’s wedding tomorrow,",
                "/ isn’t it?",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace ‘isn’t it’ with won’t you’. ‘Question Tag’ must agree with the Tense of a sentence."
        },
        {
            id: `${quizId}-q12`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "I don’t suppose",
                "/ anyone will volunteer,",
                "/ will they ?",
                "No error"
            ],
            correctAnswer: 3,
            explanation: "No error. The sentence has the main part ‘anyone will volunteer’ and not ‘I don’t suppose’."
        },
        {
            id: `${quizId}-q13`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "He is",
                "/ your brother",
                "/ isn’t it ?",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace ‘isn’t it’ with ‘isn’t he’. Hecause here the subject is ‘he’."
        },
        {
            id: `${quizId}-q14`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "You haven’t responded",
                "/ to my invitation",
                "/ didn’t you ?",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace ‘didn’t you’ with ‘have you’ because the sentence and Question Tag must be in the same tense. The sentence is -ve, hence the question tag will be +ve."
        },
        {
            id: `${quizId}-q15`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "You will come",
                "/ to my party tomorrow",
                "/ isn’t it",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace ‘isn’t it’ with ‘won’t you’. The sentence and Question Tag must be in the same tense."
        },
        {
            id: `${quizId}-q16`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "We should make green vegetables",
                "/ an essential part of our daily diet,",
                "/ shouldn't we ?",
                "No error"
            ],
            correctAnswer: 3,
            explanation: "No error"
        },
        {
            id: `${quizId}-q17`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "She has not completed",
                "/ her course,",
                "/ Isn’t it ?",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace ‘isn’t it’ with ‘has she’. The sentence and the Question Tag mus be in the same tense."
        },
        {
            id: `${quizId}-q18`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The collector",
                "/ visits the office regularly",
                "/ Isn’t it ?",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace ‘isn’t it’ with ‘doesn’t he / she’?"
        },
        {
            id: `${quizId}-q19`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "You have prepared well",
                "/ for the examination",
                "/ isn't it ?",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Since the sentence is in present perfect tense, Question Tag should also be in Present Perfect Tense. Replace 'isn't it ?' with 'haven't you?'."
        },
        {
            id: `${quizId}-q20`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "You could find our house easily, didn't you?",
            options: [
                "didn't you",
                "easily",
                "our house",
                "You could find"
            ],
            correctAnswer: 0,
            explanation: "Replace 'didn't you' with 'couldn't you'. ssc Prepared by Neetu Singh (1997–2016) 1000 1000 Revised Updated 1"
        },
        {
            id: `${quizId}-q21`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The short story",
                "/ should not exceed",
                "/ more than two hundred words",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Remove ‘more than’ from ‘3rd part of the sentence. ‘Exceed’ and ‘more than’ mean the same."
        },
        {
            id: `${quizId}-q22`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "He asked",
                "/ supposing if he fails",
                "/ what he would do",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "‘Supposing’ and ‘if’ cannot be used together. Both means the same hence either use ‘supposing’ or ‘If’ should be used at a time."
        },
        {
            id: `${quizId}-q23`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The power to",
                "/ distinguish between differences",
                "/ is the basis of science and art",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Here ‘between differences’ is superfluous. ‘distinguish’ means ‘to recognise the difference between things’."
        },
        {
            id: `${quizId}-q24`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "This happened",
                "/ just exactly",
                "/ five years ago",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Here ‘just end exactly’ both means the same thing. Hence either use ‘just’ or ‘exactly’."
        },
        {
            id: `${quizId}-q25`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the correct option.",
            options: [
                "When Darun heard the news that his father had been hospitalised",
                "he cancelled his trip",
                "and returned back to his village",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "‘Back’ is not used with ‘return’. Return itself means ‘to come or go back’. Hence using ‘back’ with ‘return’ makes it superfluous’."
        },
        {
            id: `${quizId}-q26`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Looking forward",
                "/ to meeting you",
                "/ in person",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "‘In person’ means ‘meeting someone rather than talking or phone etc. So ‘meeting and ‘in person’ together become superfluous’"
        },
        {
            id: `${quizId}-q27`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "In the back side",
                "/ of our house",
                "/ we have a rock garden",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Use of ‘side’ is superfluous. ‘Back’ means the ‘rear side’."
        },
        {
            id: `${quizId}-q28`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "I",
                "/ came to school",
                "/ at the same usual time",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "The correct phrase is ‘at the same time’. Remove ‘usual’ from the 3rd part of the sentence. 'Same' with usual makes the sentence superfluous."
        },
        {
            id: `${quizId}-q29`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "My father",
                "/ has returned back",
                "/ to Chennai yesterday",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "‘Back’ will be not ‘used with return’. Hence ‘back’ is superfluous’."
        },
        {
            id: `${quizId}-q30`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "We",
                "/ have to return back",
                "/ immediately",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Remove ‘back’."
        },
        {
            id: `${quizId}-q31`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "I",
                "/ will return back",
                "/ in five minutes",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Remove ‘back’."
        },
        {
            id: `${quizId}-q32`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The newspapers they admit that",
                "/ advertising sometimes",
                "/ influences their editorial policy",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Remove ‘they’ from 1st part of the sentence. Use of ‘they’ is superfluous."
        },
        {
            id: `${quizId}-q33`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The library members were asked",
                "/ to return back the books",
                "/ to the library",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Remove ‘back’ from the second part of the sentence."
        },
        {
            id: `${quizId}-q34`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "The teacher as well as his students,",
            options: [
                "/ all left",
                "/ for the trip",
                "No error",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Here ‘all’ is superfluous."
        },
        {
            id: `${quizId}-q35`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "She regards",
                "/ negotiating prices with customers",
                "/ as her special expertise",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Here use of ‘special’ is superfluous."
        },
        {
            id: `${quizId}-q36`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "They can promise you",
                "/ an experience",
                "/ you won’t never forget",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Here ‘won’t’ and ‘never’ can’t come together. Hence replace ‘won’t never forget’ with ‘will never forget’ or ‘won’t ever forget’."
        },
        {
            id: `${quizId}-q37`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "I enjoy jogging",
                "/ and I enjoy",
                "/ playing the piano",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Here again using ‘I enjoy’ in 2nd part of the sentence is superfluous. Hence remove ‘I enjoy’ from the 2nd part of the sentence."
        },
        {
            id: `${quizId}-q38`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "A study is going underway to determine the exact concentration of lead in the water supply.",
            options: [
                "to determine the exact concentration",
                "No error",
                "of lead in the water supply",
                "A study is going underway"
            ],
            correctAnswer: 3,
            explanation: "Here ‘going’ is superfluous’ with ‘underway’. ‘Underway’ means ‘going on now’. The sentence should read as ‘A study is underway’..."
        },
        {
            id: `${quizId}-q39`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "He was",
                "/ very kind enough",
                "/ to invite me",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Remove 'very' from the second part of the sentence. 'Very' and 'enough' together make the sentence superfluous."
        },
        {
            id: `${quizId}-q40`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "The travellers were pacified when to hear that the plane had landed on the runway much before the official announcement.",
            options: [
                "landed on the runway",
                "much before the",
                "were pacified when",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Remove 'when' or Change 'when to hear' into 'when he heard'."
        },
        {
            id: `${quizId}-q41`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "My mother has",
                "/ returned back to",
                "/ Delhi day before yesterday",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Remove 'back'. Here 'back' is superfluous."
        },
        {
            id: `${quizId}-q42`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "The cheetah can run more faster than any other animal.",
            options: [
                "any other animal",
                "more faster",
                "than",
                "can run"
            ],
            correctAnswer: 1,
            explanation: "Remove 'more'. Two comparative degrees cannot come together."
        },
        {
            id: `${quizId}-q43`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "What shall we do on ourselves this evening?",
            options: [
                "this evening",
                "on ourselves",
                "What shall",
                "we do"
            ],
            correctAnswer: 1,
            explanation: "Remove 'on ourselves'."
        },
        {
            id: `${quizId}-q44`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "In order for he to attend the meeting, he needs to prepare exhaustive notes.",
            options: [
                "to attend the meeting",
                "he needs to prepare",
                "exhaustive notes",
                "In order for he"
            ],
            correctAnswer: 3,
            explanation: "Remove 'for he'. 'In order to' will take base form of verb."
        },
        {
            id: `${quizId}-q45`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "It is be said that in 2019 the Indian Stock Market will fall drastically and we can expect that fall very soon.",
            options: [
                "we can expect",
                "It is be said",
                "that in 2019",
                "the Indian Stock Market will fall"
            ],
            correctAnswer: 1,
            explanation: "Remove 'be'. It is said – ^dgk tkrk gS* ssc Prepared by Neetu Singh (1997–2016) 1000 1000 Revised Updated 1"
        },
        {
            id: `${quizId}-q46`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "It is better",
                "/ to keep one’s head in the face of danger than",
                "/ losing one’s courage",
                "No error"
            ],
            correctAnswer: 3,
            explanation: "Explanation not clearly extracted from the PDF text layer; please verify once with the source PDF."
        },
        {
            id: `${quizId}-q47`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "To die with honour",
                "/ is better than",
                "/ live with dishonour",
                "No error"
            ],
            correctAnswer: 3,
            explanation: "Explanation not clearly extracted from the PDF text layer; please verify once with the source PDF."
        },
        {
            id: `${quizId}-q48`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Modern youth pay more attention",
                "/ to seeing films",
                "/ than to read books",
                "No error"
            ],
            correctAnswer: 3,
            explanation: "Explanation not clearly extracted from the PDF text layer; please verify once with the source PDF."
        },
        {
            id: `${quizId}-q49`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "(3) Replace ‘losing’ with ‘to lose’. Comparison should always be between same grammatical items. Here ‘to + infinitive’ should be compared with ‘to + infinitive’ only.",
            options: [
                "Part (1)",
                "Part (2)",
                "Part (3)",
                "No error"
            ],
            correctAnswer: 3,
            explanation: "Explanation not clearly extracted from the PDF text layer; please verify once with the source PDF."
        },
        {
            id: `${quizId}-q50`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "(4) Replace ‘live’ with ‘to live’. Comparison should always be",
            options: [
                "Part (1)",
                "Part (2)",
                "Part (3)",
                "No error"
            ],
            correctAnswer: 3,
            explanation: "Explanation not clearly extracted from the PDF text layer; please verify once with the source PDF."
        }
    ];

    window.GJU_QUIZ_BANK.push({
        id: quizId,
        title: "English Detecting Errors Practice Set 15",
        subject: "English",
        difficulty: "Hard",
        questions
    });
})();