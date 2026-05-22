(function () {
    "use strict";

    window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];

    const quizId = "english-detecting-errors-set-13";

    const questions = [
        {
            id: `${quizId}-q01`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "I am coming directly",
                "/ to my office",
                "/ from the station",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Change ‘directly’ to ‘direct’. Here ‘direct’ means ‘straight’ without stopping any where. Both don't take ‘ly’."
        },
        {
            id: `${quizId}-q02`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Mother does not hardly",
                "/ know what happened",
                "/ in school yesterday",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Hardly, scarcely, rarely etc are negative adverbs. They have negative meaning so we use them without another negative word. The correct sentence will be ‘Mother hardly knows...’. So remove ‘not’ from part ‘A’."
        },
        {
            id: `${quizId}-q03`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "He only plays a subsidiary",
                "/ role in the management",
                "/ of this organization",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Only will come before ‘a subsidiary role’ as it qualifies it."
        },
        {
            id: `${quizId}-q04`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "For several years now",
                "/ my newspaper agent has been spelling",
                "/ my name incorrectly",
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
                "Look at what",
                "/ I am doing",
                "/ and do like I do",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace 'like' with 'as'. 'As' is an adverb that qualifies an action Eg:Nobody loved her as I do. The same idea can be expressed using 'like' but differently. Eg:Nobody loves her like me. [here 'like' is followed by the object pronoun 'me'. 'Like' is an adjective that qualifies a noun or a pronoun]"
        },
        {
            id: `${quizId}-q06`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "What man can die",
                "/ better than",
                "/ serving his country?",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Replace 'what man can die with 'How can man die' to give an appropriate meaning to the sentence."
        },
        {
            id: `${quizId}-q07`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "My friend’s actual job",
                "/ involves a lot",
                "/ of administration",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Change 'actual job' into 'job actually'. Here 'actually' should qualify 'involves'."
        },
        {
            id: `${quizId}-q08`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Sheldon is an intelligent boy, he thinks quick.",
            options: [
                "thinks",
                "quick",
                "is",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace 'quick' with 'quickly'."
        },
        {
            id: `${quizId}-q09`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "This machine looks good but is very badly designed and doesn't work good.",
            options: [
                "and doesn't work good",
                "but is very badly designed",
                "No error",
                "This machine looks good"
            ],
            correctAnswer: 0,
            explanation: "Replace 'good(Adj)' with 'well(Adv)'. work (a normal verb) is followed by an Adverb (well). Look (a verb of sensation) takes Adjective (good)."
        },
        {
            id: `${quizId}-q10`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Her aunt didn't",
                "/ give me",
                "/ a minute of peace",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Add 'even' before a minute of peace."
        },
        {
            id: `${quizId}-q11`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The teacher",
                "/ explained everything",
                "/ very clearly",
                "No error"
            ],
            correctAnswer: 3,
            explanation: "No Error."
        },
        {
            id: `${quizId}-q12`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Vegetables as well as fruits",
                "/ have fallen considerably",
                "/ in prices in recent days",
                "No error"
            ],
            correctAnswer: 3,
            explanation: "No error."
        },
        {
            id: `${quizId}-q13`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Although Rahul ran very",
                "/ fastly he could not",
                "/ catch the moving bus",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Use ‘fast’ in place of ‘fastly’. There is no word like 'fastly'."
        },
        {
            id: `${quizId}-q14`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Bharatanatyam will also",
                "/ feature in the two-week",
                "/ World Music Festival",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Place 'also' after 'Bharatanatyam'."
        },
        {
            id: `${quizId}-q15`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "The captain of the team was very criticized for the quality of his leadership.",
            options: [
                "his",
                "the",
                "for",
                "very"
            ],
            correctAnswer: 3,
            explanation: "Replace 'very' with 'very much or much'."
        },
        {
            id: `${quizId}-q16`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Although the toys are altogether in the cupboard they are not properly arranged.",
            options: [
                "in the cupboard",
                "are altogether",
                "are not properly arranged",
                "Although the toys"
            ],
            correctAnswer: 1,
            explanation: "Relace 'altogether' with 'all together'. Altogether means completely and fully. All together means all in one place or group."
        },
        {
            id: `${quizId}-q17`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "No matter he tries hard he cannot play the guitar.",
            options: [
                "No matter",
                "he tries hard",
                "he cannot",
                "play the guitar"
            ],
            correctAnswer: 1,
            explanation: "Replace 'he tries hard' with 'how hard he tries'."
        },
        {
            id: `${quizId}-q18`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Please go out and check if it is yet raining.",
            options: [
                "and check",
                "if it is",
                "yet raining",
                "Please go out"
            ],
            correctAnswer: 2,
            explanation: "Replace 'yet' with 'still'."
        },
        {
            id: `${quizId}-q19`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Found in many parts of India, the frangipani tree is a small, low – branching tree which is especial used for several medicinal purposes.",
            options: [
                "a small, low –branching tree",
                "Found in many parts",
                "The frangipani tree is",
                "which is especial used"
            ],
            correctAnswer: 3,
            explanation: "Replace 'especial' with 'especially'. Is + Adverb + V3. Verb 'used' is qualified by an Adverb. ssc Prepared by Neetu Singh (1997–2016) 1000 1000 Revised Updated 1"
        },
        {
            id: `${quizId}-q20`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "John would have told",
                "/ you the truth",
                "/ if you had asked him",
                "No error"
            ],
            correctAnswer: 3,
            explanation: "No error The rule applicable here is If + subject + had, subject + would + have + V3 ."
        },
        {
            id: `${quizId}-q21`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "I wish I am",
                "/ the richest person",
                "/ in the whole wide world",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Replace 'I am' with 'I were'."
        },
        {
            id: `${quizId}-q22`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "After you will return",
                "/ from Chennai",
                "/ I will come and see you",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Replace ‘after you will return’ with ‘after you return’. The rule applicable here is If + Simple Present Tense, Simple Future Tense."
        },
        {
            id: `${quizId}-q23`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "If you had told me",
                "/ I would have helped you",
                "/ solve the problem",
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
                "If he is a millionaire",
                "/ he would help",
                "/ the millennium project",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "For imaginary sentence ‘were’ is used with all subjects. Hence Replace ‘is’ with ‘were’."
        },
        {
            id: `${quizId}-q25`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Unless",
                "/ you will study hard",
                "/ you cannot pass",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘will’. The 1st action of conditional sentence is is Simple Present Tense."
        },
        {
            id: `${quizId}-q26`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "After you will return",
                "/ from New Delhi",
                "/ I will meet you",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Remove ‘will’ from the 1st part. Rule: If two actions take place one after the other in future and if the second action depends on the first action, the first action is in Simple Present Tense and 2nd in Simple Future Tense. If + Simple Present, Simple Future."
        },
        {
            id: `${quizId}-q27`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "He walks",
                "/ as if the earth",
                "/ belonged to him",
                "No error"
            ],
            correctAnswer: 3,
            explanation: "No error. If ‘as if’ is followed by total unrealistic action, it is in ‘S + V2’ form."
        },
        {
            id: `${quizId}-q28`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Had you",
                "/ worked hard",
                "/ you will have passed",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Change ‘will have’ into ‘would have’. The sentence fits in the formula given below. If + subject + had, subject + would + have + V3 ."
        },
        {
            id: `${quizId}-q29`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Supposing if",
                "/ it rains",
                "/ what shall we do?",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "‘Supposing’ and ‘if’ do not come together in a sentence so either keep ‘supposing’ or ‘if’."
        },
        {
            id: `${quizId}-q30`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "I would",
                "/ accept the offer",
                "/ if I were you",
                "No error"
            ],
            correctAnswer: 3,
            explanation: "No error."
        },
        {
            id: `${quizId}-q31`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "This letter will reach him",
                "/ before he left",
                "/ for Delhi",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘left’ with ‘leaves’. The formula applicable here is: If + Simple Present, Simple Future."
        },
        {
            id: `${quizId}-q32`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "It is time",
                "/ we should have done /",
                "something useful",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘should have done’ with ‘did’. It’s time is followed by Past Tense."
        },
        {
            id: `${quizId}-q33`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "He will tell you",
                "/ about it when",
                "/ he will come back",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace ‘will come’ with ‘comes’. The given sentence is a conditional sentence and the formula applicable here is If + Simple Present, Simple Future."
        },
        {
            id: `${quizId}-q34`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Ask her to call me",
                "/ when she",
                "/ will come back",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace ‘will come’ with ‘comes’ because ‘will’ is not used in sub- ordinate clause of a conditional sentence. The formula applicable here is sub-ordinateclause Principalclause If+ SimplePresent,SimpleFuture  "
        },
        {
            id: `${quizId}-q35`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "We shall",
                "/ go out",
                "/ if it does not rains",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "After ‘do / does’ first form of verb (V1) comes. Hence replace ‘rains’ with ‘rain’."
        },
        {
            id: `${quizId}-q36`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "If he had walked",
                "/ fast enough",
                "/ he will get the bus",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace ‘will get’ with ‘would have got’. The formula applicable here is: Rule: If + subject + had, Subject + would + have + V3."
        },
        {
            id: `${quizId}-q37`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The train will not start",
                "/ until the guard",
                "/ will blow the whistle",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace ‘will blow’ with ‘blows’. the 1st action of a future conditional sentence is in Simple Present Tense."
        },
        {
            id: `${quizId}-q38`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "We shall wait",
                "/ till you",
                "/ will finish your lunch",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace ‘will finish’ with ‘finish’."
        },
        {
            id: `${quizId}-q39`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Unless aid arrives",
                "/ within the next few weeks /",
                "thousands are starving",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace ‘are starving’ with ‘will starve’. If Subordinate clause is in Simple Present Tense, the main clause will be in Simple Future Tense."
        },
        {
            id: `${quizId}-q40`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "If I was he,",
                "/ I wouldn’t accept",
                "/ this project",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Replace ‘was’ with ‘were’. For imaginary sentence the formula fit here is Rule: If + subject + were, subject + would + V1"
        },
        {
            id: `${quizId}-q41`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Unless he apologizes",
                "/ he should not be",
                "/ allowed to stay with us",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘should’ with ‘shall’. ‘He shall not be allowed’ shows determination. In sentences of determination ‘shall’ comes with 3rd person."
        },
        {
            id: `${quizId}-q42`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Had the plane not been delayed,",
                "/ I will reach here",
                "/ in time for the function",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘will reach’ with ‘would have reached’. Rule:If + Subject + had, Subject + would + have + V3"
        },
        {
            id: `${quizId}-q43`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "If I would have realised",
                "/ what a bad shape our library is in",
                "/ I would have done something",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Replace ‘would have’ with ‘had’."
        },
        {
            id: `${quizId}-q44`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "If she had seen",
                "/ the car coming, she",
                "/ may not crossed the road",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace ‘may not crossed’ with ‘may / would not have crossed’."
        },
        {
            id: `${quizId}-q45`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "My friend will not come to attend this marriage unless he is not invited.",
            options: [
                "No error",
                "My friend will not come",
                "to attend this marriage",
                "unless he is not invited"
            ],
            correctAnswer: 3,
            explanation: "‘not’ does not come with ‘unless’."
        },
        {
            id: `${quizId}-q46`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "It began to rain as soon as we stepped out of the house.",
            options: [
                "out of the house",
                "as soon as we stepped",
                "No error",
                "It began to rain"
            ],
            correctAnswer: 2,
            explanation: "No error."
        },
        {
            id: `${quizId}-q47`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "If I will play my best I can win any day against anybody.",
            options: [
                "against anybody",
                "I can win any day",
                "No error",
                "If I will play my best"
            ],
            correctAnswer: 3,
            explanation: "Replace ‘will’."
        },
        {
            id: `${quizId}-q48`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "You will not",
                "/ succeed unless you",
                "/ don’t work hard",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "‘Unless’ is not followed by any negative word. Remove ‘don’t’ from 3rd part of the sentence."
        },
        {
            id: `${quizId}-q49`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "If I had remembered",
                "/ this it will have",
                "/ prevented some mistakes",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "The correct formula is- If + had + V3, Sub + would + have + V3 Hence replace 'will' with 'would'."
        },
        {
            id: `${quizId}-q50`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "\"If I can see you",
                "/ I am sure you would",
                "/ be looking beautiful,\"Naina said",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "For Present Imagination, the formula is- If + simple past, subject + would + V1. Hence replace ‘present form (can)’ with ‘past form’ (could)."
        }
    ];

    window.GJU_QUIZ_BANK.push({
        id: quizId,
        title: "English Detecting Errors Practice Set 13",
        subject: "English",
        difficulty: "Hard",
        questions
    });
})();