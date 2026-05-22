(function () {
    "use strict";

    window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];

    const quizId = "english-detecting-errors-set-25";

    const questions = [
        {
            id: `${quizId}-q01`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "The picture of the king's is exactly like the king himself.",
            options: [
                "the king himself",
                "the picture",
                "is exactly like",
                "of the king's CHSL-2018 8 July, 2019, Afternoon"
            ],
            correctAnswer: 3,
            explanation: "Remove ‘apostrophe and s’."
        },
        {
            id: `${quizId}-q02`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "The soldiers had no choice when to obey the commander.",
            options: [
                "when to obey",
                "had no choice",
                "The soldiers",
                "the commander CHSL-2018 4 July, 2019, Afternoon"
            ],
            correctAnswer: 0,
            explanation: "Change ‘when’ into 'but'."
        },
        {
            id: `${quizId}-q03`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "The birth of a girl bring great joy to Neha’s family.",
            options: [
                "The birth",
                "of a girl",
                "to Neha’s family",
                "bring great joy"
            ],
            correctAnswer: 3,
            explanation: "Replace 'bring' with 'brings'. Birth (S.N) takes S.V."
        },
        {
            id: `${quizId}-q04`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Having been a student activist once, a politician never forget those days.",
            options: [
                "a politician",
                "never forget",
                "Having been",
                "those days"
            ],
            correctAnswer: 1,
            explanation: "Replace 'forget' with 'forgets'. A politician (S.N) takes S.V."
        },
        {
            id: `${quizId}-q05`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Organizing World Cup matches in England imply that rains can be a constant threat.",
            options: [
                "be a constant threat",
                "in England imply",
                "that rains can be",
                "Organizing World Cup matches"
            ],
            correctAnswer: 1,
            explanation: "Replace 'imply (Plural)' with 'implies (Singular Verb)'. Organizing world cup is a singular noun."
        },
        {
            id: `${quizId}-q06`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Over the years, the writer Amish has evolved to what millions of youngsters aspires to be today – an intellectual.",
            options: [
                "Over the years",
                "aspires to be today",
                "Amish has evolved",
                "millions of youngsters"
            ],
            correctAnswer: 1,
            explanation: "Replace 'aspires(Singular verb)' with 'aspire(Plural verb)'. Youngesters will take plural verb."
        },
        {
            id: `${quizId}-q07`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Their house aren’t very big but their garden is.",
            options: [
                "aren’t very big",
                "Their house",
                "garden is",
                "but their"
            ],
            correctAnswer: 0,
            explanation: "Replace 'aren't' with 'isn't'. House is singular noun and will take singular verb."
        },
        {
            id: `${quizId}-q08`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Our most memorable meeting with Spielberg happened while we were at the Berlin Film Festival in 1977, where the film ‘Shatranj ke Khilari ‘were being screened as India’s official entry.",
            options: [
                "Our most memorable meeting",
                "while we were at",
                "where the film",
                "were being screened"
            ],
            correctAnswer: 3,
            explanation: "Replace 'were' with 'was'. 'Shatranj ke Khilari' is a singular noun (name of a film). ssc Prepared by Neetu Singh (1997–2016) 1000 1000 Revised Updated 1"
        },
        {
            id: `${quizId}-q09`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Visitors",
                "/ were not permitted",
                "/ entering the park",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace ‘entering’ with ‘to enter’. To show purpose ‘to + infinitive’ is used’."
        },
        {
            id: `${quizId}-q10`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Having broken down",
                "/ the driver sent the car",
                "/ to the garage",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "From the given structure it seems that ‘the driver was broken down’ which is wrong. Hence the correct structure should be as follows: The car having broken down, the driver sent the car to the garage."
        },
        {
            id: `${quizId}-q11`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "You should avoid",
                "/ to travel",
                "/ in the rush hour",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘to travel’ with ‘travelling’. ‘Avoid’ is followed by a gerund (-ing form)."
        },
        {
            id: `${quizId}-q12`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "He denied",
                "/ to have",
                "/ been there",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘to have’ with ‘having’. After ‘deny’ if any verb comes it is used in gerund form."
        },
        {
            id: `${quizId}-q13`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "I meant nothing",
                "/ less than",
                "/ to compel you to come",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace ‘to compel’ with ‘compelling’. ‘Than’ is followed by ‘V1 + ing’."
        },
        {
            id: `${quizId}-q14`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Being",
                "/ a rainy day",
                "/ I could not go out",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Add ‘it’ before ‘being’ a rainy day or ‘I’ will become the subject of the 1st part of the sentence and then the sentence will have wrong meaning."
        },
        {
            id: `${quizId}-q15`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Standing at",
                "/ the top of the hill,",
                "/ the houses below were hardly visible",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Add ‘As I was’ before ‘standing’ else ‘the houses’ become the subject of the 1st part too which gives a wrong meaning to the sentence."
        },
        {
            id: `${quizId}-q16`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "I suggest that",
                "/ he goes",
                "/ to the doctor as soon as he returns from the examination",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘goes’ with ‘go’. Here ‘go’ is a suggestion not a routine action, hence ‘he go’ is the correct form."
        },
        {
            id: `${quizId}-q17`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "In spite of the roadblock",
                "/ the guards allowed us",
                "/ enter the restricted area to search for our friends",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace ‘enter’ with ‘to enter’."
        },
        {
            id: `${quizId}-q18`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The fact of me",
                "/ being a stranger",
                "/ does not excuse his conduct",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Replace ‘me’ with ‘my’. When a pronoun is followed by a gerund, it comes in possessive form."
        },
        {
            id: `${quizId}-q19`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "A cup of coffee",
                "/ is an excellent complement",
                "/ to smoked salmon",
                "No error"
            ],
            correctAnswer: 3,
            explanation: "No error"
        },
        {
            id: `${quizId}-q20`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "A senior doctor",
                "/ expressed concern",
                "/ about physician’s recommended the vaccine",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace ‘recommended’ with ‘recommending’. After possessive adjective gerund is used."
        },
        {
            id: `${quizId}-q21`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "I hope to go to shopping",
                "/ this weekend",
                "/ if the weather permits",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Replace ‘go to shopping’ with ‘go shopping’."
        },
        {
            id: `${quizId}-q22`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The lawyer asked",
                "/ if it was worth to take",
                "/ the matter to court",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘worth to take’ with ‘worth taking’. After ‘worth’ Ving comes."
        },
        {
            id: `${quizId}-q23`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The girls watched intently",
                "/ as the model applied her make-up",
                "/ with a practiced hand",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace ‘practiced’ with ‘practised’. A verb is used in V3 form as an adjective and not a noun."
        },
        {
            id: `${quizId}-q24`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Due to me being a new comer",
                "/ I was unable",
                "/ to get a good house",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Replace ‘due to me being’ with ‘due to my being’. Generally when a pronoun comes before a gerund, it is used in Possessive form."
        },
        {
            id: `${quizId}-q25`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "I remember",
                "/ meet him /",
                "five years ago",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘meet’ with ‘meeting’. After ‘remember’ gerund is used."
        },
        {
            id: `${quizId}-q26`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Several guests noticed Mr. Sharma",
            options: [
                "/ collapsing in his chair",
                "/ and gasping for breath",
                "No error",
                "No error"
            ],
            correctAnswer: 3,
            explanation: "No error"
        },
        {
            id: `${quizId}-q27`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Get this book",
                "/ be published",
                "/ in time",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Remove ‘be’. After causative verb ‘get’, V3 comes."
        },
        {
            id: `${quizId}-q28`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "I am going",
                "/ to have this certificate",
                "/ attest by the Director",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "‘attested’ will replace ‘attest’. Here ‘have’ is a causative verb that takes V3 after it."
        },
        {
            id: `${quizId}-q29`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Students are prohibited",
                "/ to bring cycles",
                "/ into the college",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘to bring’ with ‘from bringing’."
        },
        {
            id: `${quizId}-q30`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "He has",
                "/ a large family",
                "/ to care",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace ‘to care’ with ‘to care for’. * If a noun is immediately followed by a ‘to + infinitive’ the suitable preposition is used after it."
        },
        {
            id: `${quizId}-q31`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "You should have used the money",
                "/ for paying your debts",
                "/ instead of buy a motor cycle",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace ‘buy’ with ‘buying’. After preposition ‘-ing’ form of verb is used."
        },
        {
            id: `${quizId}-q32`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Being very dark,",
                "/ the visitors found it difficult",
                "/ to locate the switch",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "If we won’t put a subject in first part of the sentence, ‘the vistor’ will become the subject of ‘being very dark’ and give the wrong meaning. Hence we should put ‘it’ before ‘being very dark’. The sentence should read as: ‘It being very dark ..."
        },
        {
            id: `${quizId}-q33`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Being a rainy day",
                "/ we didn't",
                "/ go out",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Replace ‘Being a rainy day’ with ‘It being a rainy day’ * See explanation of 24."
        },
        {
            id: `${quizId}-q34`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Having deprived of their houses",
                "/ in the recent earthquake",
                "/ they had no other option but to take shelter in a school",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "‘Perfect Participle’ is used when the 1st action has already finished before the 2nd starts. Here we need Passive Voice. ‘Having been deprived ..."
        },
        {
            id: `${quizId}-q35`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Her mother does not approve of",
                "/ her to go to the party",
                "/ without dressing formally",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘to go’ with ‘going’. A preposition is always followed by a gerund."
        },
        {
            id: `${quizId}-q36`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Riding across the battle field",
                "/ the famous Bhishm",
                "/ saw a large number of dead warriors",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "‘Bhism’ a proper noun will not take article ‘the’."
        },
        {
            id: `${quizId}-q37`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Being a holiday",
                "/ we went out",
                "/ for a picnic",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Replace ‘Being a holiday’ with ‘It being a holiday’. If we wont’ put a subject in the first part of the sentence ‘we’ will become the subject of ‘being a holiday’ and will give the wrong meaning to the sentence. Hence replace ‘being a holiday’ with ‘it being a holiday’."
        },
        {
            id: `${quizId}-q38`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "His father would",
                "/ rather die than",
                "/ to beg from door to door",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace ‘to beg’ with ‘beg’. After ‘rather than’ bare infinitive will come to balance ‘die’ see rule of Parallelism."
        },
        {
            id: `${quizId}-q39`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Much harassed",
                "/ he left hostel",
                "/ bag and baggage",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "‘Harassed’ is an Adjective so it must qualify a Noun. But, here it isn’t qualifying anything. Hence, ‘having been’ will be placed before ‘much’ to make it a correct statement."
        },
        {
            id: `${quizId}-q40`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Water contamination has become more serious",
                "/ since chemists have begun to use",
                "/ new substances",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘to use’ with ‘using’ because after ‘began’ if any verb comes it is used in Gerund form"
        },
        {
            id: `${quizId}-q41`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "For testing",
                "/ the new microphone,",
                "/ I tried to record my voice",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Replace ‘for testing’ with ‘to test’. To show purpose ‘to + infinitive’ is used."
        },
        {
            id: `${quizId}-q42`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The hurrying crowds",
                "/ of people past",
                "/ each other amazed him",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘of people pass’ with ‘of people passing’. ‘Each other’ change into ‘one another’."
        },
        {
            id: `${quizId}-q43`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "He couldn’t but help",
                "/ shed tears at the plight of the villagers",
                "/ rendered homeless by a devastating cyclone",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Replace ‘couldn’t but help with’ couldn’t help but’. After preposition ‘-ing’ form of verb is used."
        },
        {
            id: `${quizId}-q44`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Hearing these strange noise above, the thought at once occurred to me that thieves had entered the house.",
            options: [
                "No error",
                "the thought at once occurred to me",
                "that thieves had entered the house",
                "Hearing these strange noises above"
            ],
            correctAnswer: 3,
            explanation: "The strange noises were coming from above not heard above. The appropriate starting will be ‘Hearing these strong noise coming from above’."
        },
        {
            id: `${quizId}-q45`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Several guests noticed Mr. Sharma falling back in his chair and gasping for breath.",
            options: [
                "falling back in his chair",
                "Several guests noticed Mr. Sharma",
                "and gasping for breath",
                "No error"
            ],
            correctAnswer: 3,
            explanation: "No error"
        },
        {
            id: `${quizId}-q46`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Being a very cold I could not go out for a morning walk.",
            options: [
                "for a morning walk",
                "No error",
                "Being a very cold",
                "I could not go out"
            ],
            correctAnswer: 2,
            explanation: "Replace ‘being a very cold’ with ‘it being a very cold’. See explanation of 24."
        },
        {
            id: `${quizId}-q47`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "After he was caught cheating he was disqualified to appear at the examination.",
            options: [
                "After he was caught cheating",
                "he was disqualified",
                "to appear at the examination",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace ‘to appear’ with ‘from appearing’."
        },
        {
            id: `${quizId}-q48`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "I forbid you not to go there again.",
            options: [
                "there again",
                "No error",
                "not to go",
                "I forbid you"
            ],
            correctAnswer: 2,
            explanation: "Replace 'not to go' with 'from going there' or 'to go there'. 'Forbid' means 'order someone not to do something'. (euk djuk) . Forbid, deny, prohibit etc do not take 'not'."
        },
        {
            id: `${quizId}-q49`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "My wife, having finish her work",
                "/ rushed to meet me",
                "/ at the event",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Replace ‘having finish’ with ‘having finished’. After ‘having’ V3 is used."
        },
        {
            id: `${quizId}-q50`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "She made the child to study hard.",
            options: [
                "study hard",
                "No error",
                "She made",
                "the child"
            ],
            correctAnswer: 0,
            explanation: "Replace ‘to study’ with ‘study’. After causative verb ‘made’ bare infinitive (V1 ) is used."
        }
    ];

    window.GJU_QUIZ_BANK.push({
        id: quizId,
        title: "English Detecting Errors Practice Set 25",
        subject: "English",
        difficulty: "Hard",
        questions
    });
})();