(function () {
    "use strict";

    window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];

    const quizId = "english-detecting-errors-set-28";

    const questions = [
        {
            id: `${quizId}-q01`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The government",
                "/ must provide facilities for the",
                "/ upbringing of women",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace 'upbringing of woman' with 'upbringing of a girl child' or ‘uplifting of women’."
        },
        {
            id: `${quizId}-q02`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The landlord could not",
                "/ tell which of the servant",
                "/ broke the glass",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Rule: Which + of + the + plural noun Also plural noun is used after ‘which of’. Replace ‘servant’ with ‘servants’. Also 'Tell' is followed by an object but here it has not been."
        },
        {
            id: `${quizId}-q03`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "I asked the shopkeeper",
                "/ \"Do you have change",
                "/ for a five hundred rupees note?\"",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Change 'rupees' into 'rupee'. Here a noun ‘rupee’ works as an adjective and an Adjective can't be plural."
        },
        {
            id: `${quizId}-q04`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Their luggage which were",
                "/ kept at the station's",
                "/ lockers, was later retrieved",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Replace 'were' with 'was' because the main subject 'luggage' is an uncountable noun and it takes singular verb."
        },
        {
            id: `${quizId}-q05`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The factory complex houses a shop floor",
                "/ and 10 cubicles for the staff in an area",
                "/ of about thousand squares metres",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Correct usage is ‘thousand square metres’. Replace ‘squares’ with 'square’ as here it is used as an adjective."
        },
        {
            id: `${quizId}-q06`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Recently I visited Kerala",
                "/ and found the sceneries",
                "/ to be breathtaking",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "'Scenery' is an uncountable noun, we cannot change it into a plural form by adding 'ies' to it."
        },
        {
            id: `${quizId}-q07`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "The food basket contained (1) / a dark chocolate, an eclair and a pastry (2) / neatly wrapped in foil paper. (3) / No error",
            options: [
                "Part (1)",
                "Part (2)",
                "Part (3)",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Change 'a dark chocolate' into 'a bar of dark chocolate'."
        },
        {
            id: `${quizId}-q08`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The shifting task is almost done,",
                "/ only the furnitures",
                "/ have to be delivered",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "In Part (2) ‘Furniture’ is an uncountable noun. We cannot make it plural by adding ‘s’ to it but in part (3) ‘have’ is used so change‘furniture’ into ‘pieces of furniture’."
        },
        {
            id: `${quizId}-q09`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "If you are in the wrong gears",
                "/ the car won't be",
                "/ able to climb the hill",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "'Gear' will replace 'Gears' as you put the car in one gear at one time."
        },
        {
            id: `${quizId}-q10`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "I had invited",
                "/ all my sister-in-laws",
                "/ to my son's birthday party",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Compound nouns are made plural by adding 's' to the main word. Replace 'sister-in-laws' with 'sisters-in-law'."
        },
        {
            id: `${quizId}-q11`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "I express my gratitudes",
                "/ to all those who",
                "/ have voted for me",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "We cannot add 's / es' at the end of uncountable noun. 'Gratitude' is an uncountable noun. Thus replace 'gratitudes' with 'gratitude'."
        },
        {
            id: `${quizId}-q12`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Rehana had everything",
                "/ beauties, a good figure,",
                "/ and a sweet personality",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "'Beauty' can be both adjective and noun. But when it means the quality that makes someone beautiful, it is adjective and hence cannot come is plural form."
        },
        {
            id: `${quizId}-q13`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "For a full week",
                "/ she enjoyed the benefits",
                "/ of being a big sister",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Change ‘a big sister’ into ‘the elder sister’."
        },
        {
            id: `${quizId}-q14`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "No beggar who comes",
                "/ to our doors",
                "/ goes back empty handed",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘doors’ with ‘door’."
        },
        {
            id: `${quizId}-q15`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "To the whale, its",
                "/ tail is the sole",
                "/ mean of propulsion",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Change ‘mean’ into ‘means’. It means ‘an instrument by which an act can be acconplished."
        },
        {
            id: `${quizId}-q16`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "All the furnitures",
                "/ has been replaced",
                "/ by the landlord",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "'Furniture' is uncountable noun. Hence replace ‘Furnitures’ with ‘Furniture’."
        },
        {
            id: `${quizId}-q17`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Essay writing is an art",
                "/ that requires many planning",
                "/ on the part of the writer",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace 'many' with 'much'. Planning being uncountable takes ‘much’."
        },
        {
            id: `${quizId}-q18`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "He learnt",
                "/ the alphabets",
                "/ at the age of four",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "'Alphabet' is not used in plural form. Replace 'Alphabets' with 'Alphabet'"
        },
        {
            id: `${quizId}-q19`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Vermin",
                "/ does much harm",
                "/ to crops",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "'Vermin' means 'animals which are believed to be harmful to crops' (E.g. rodents). 'Vermin' is a plural noun so it will agree with plural verb. Thus replace 'does' with 'do'."
        },
        {
            id: `${quizId}-q20`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Every conceivable race and nationality",
                "/ had its shared of suffering",
                "/ in the world wars",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace 'shared' with 'share'. Here we need a noun."
        },
        {
            id: `${quizId}-q21`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The book, being written",
                "/ in simple language, is suitable for children",
                "/ as it contains many good advices",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "'Advice' being an uncountable noun will take 'much' before it. So replace 'many good advices' with 'much good advice' or 'many good pieces of advice'."
        },
        {
            id: `${quizId}-q22`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "All my hope",
                "/ were duped",
                "/ and I was plunged in deep sorrow",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘were’ with ‘was’."
        },
        {
            id: `${quizId}-q23`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "It is not possible for me",
                "/ to give you the accurate date",
                "/ of my departure yet",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘accurate’ with ‘exact’."
        },
        {
            id: `${quizId}-q24`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "The severe cyclonic storm (A) / has left behind (B) / a trial of misery (C) / No Error (D)",
            options: [
                "Part (1)",
                "Part (2)",
                "Part (3)",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "'Cyclone' leaves 'a trail of misery' not 'trial of misery'. Hence replace 'trial' with 'trail'. 'Trail' means 'a series of objects left behind by the passage of someone or something'."
        },
        {
            id: `${quizId}-q25`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "He acted not",
                "/ as per my advice",
                "/ but somebody else",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Change 'else' into 'else's'."
        },
        {
            id: `${quizId}-q26`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "The scissors, which are on the table, belongs to Radha.",
            options: [
                "The scissors, which",
                "are on the table",
                "belongs to Radha",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace 'belongs' with 'belong'. 'Scissors' a plural noun will take plural verb."
        },
        {
            id: `${quizId}-q27`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "If a student needs advices about careers, he or she should consult the careers officer.",
            options: [
                "he or she should consult",
                "No error",
                "If a student needs advices about careers,",
                "the Careers officer"
            ],
            correctAnswer: 2,
            explanation: "Replace 'advices' with 'advice'. 'Advice (lykg)' is an uncountable noun."
        },
        {
            id: `${quizId}-q28`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "The lawyer deduced from the existing evidences that the accused was involved in the heinous crime.",
            options: [
                "in the henious crime",
                "deduced from the existing evidences",
                "accused was involved",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Evidence is an uncountable noun. It cannot take plural form."
        },
        {
            id: `${quizId}-q29`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "I told him",
                "/ the story",
                "/ in details to make his understand it fully",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace 'details' with 'detail'."
        },
        {
            id: `${quizId}-q30`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Mrs. Gupta invited",
                "/ all her daughter-in-laws",
                "/ to the grand party last Sunday",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Change 'daughter-in-laws' into daughters-in-law' because compound nouns are made plural by adding 's' to the main word."
        },
        {
            id: `${quizId}-q31`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Mr Roy's",
                "/ eyes widened",
                "/ in surprise",
                "No error"
            ],
            correctAnswer: 3,
            explanation: "No Error. Verb form of Adjective Wide is 'Widen'. V2 and V3 are widened."
        },
        {
            id: `${quizId}-q32`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "I have",
                "/ checked this",
                "/ month calendar",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace 'month' with 'month's'."
        },
        {
            id: `${quizId}-q33`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Aayushi has come",
                "/ here to do a master",
                "/ degree in Social Work",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Use 'master's' instead of 'master'."
        },
        {
            id: `${quizId}-q34`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "There is no money in",
                "/ the bank in Rajesh's and",
                "/ Reena's joint account",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Rajesh and Reena's joint account is correct. Remove 's from Rajesh's. When the possession of two people is on one thing's comes with the 2nd noun."
        },
        {
            id: `${quizId}-q35`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Can you imagine",
                "/ that she has thirty",
                "/ five pair of shoes",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace 'pair' by 'pairs'."
        },
        {
            id: `${quizId}-q36`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Three summons have been",
                "/ issued by the district court",
                "/ but he has not turned up yet",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Plural of 'summons' is 'summones'."
        },
        {
            id: `${quizId}-q37`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Three lakhs of people",
                "/ attended the workshop",
                "/ held in Ramleela ground",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "The correct structure is 'three lakh people'."
        },
        {
            id: `${quizId}-q38`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Ankit cannot",
                "/ succeed because",
                "/ he labours hard",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Use 'he does not labour hard'."
        },
        {
            id: `${quizId}-q39`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Her son has done and",
                "/ is still doing excellent",
                "/ work for his business",
                "No error"
            ],
            correctAnswer: 3,
            explanation: "No error."
        },
        {
            id: `${quizId}-q40`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "The furnitures in this shop is very costly.",
            options: [
                "in this shop",
                "The furnitures",
                "is",
                "very costly"
            ],
            correctAnswer: 1,
            explanation: "'furnitures' is wrong. Furniture is uncountable noun and cannot take plural form. 'Pieces of furnitures' in plural form."
        },
        {
            id: `${quizId}-q41`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "The function was attended by their three son-in-laws.",
            options: [
                "The function",
                "was attended",
                "three son-in-laws",
                "by their"
            ],
            correctAnswer: 2,
            explanation: "Replace 'son-in-laws' with 'sons- in-law'."
        },
        {
            id: `${quizId}-q42`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Scientists have discovered a new tree frog species, with an extraordinary, enlarged claw-like structure located at the base of the thumb, that live on a remote tabletop mountain in the Andes.",
            options: [
                "located at",
                "have discovered",
                "with an extraordinary",
                "live on a remote tabletop mountain"
            ],
            correctAnswer: 3,
            explanation: "Here species has been used for just one species of a new tree frogs hence 'lives' (S.V) will follow."
        },
        {
            id: `${quizId}-q43`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Baghdad remains a profoundly damaged place, and for all its newness, Dream city echo many of the city's continuing issues.",
            options: [
                "continuing issues",
                "a profoundly damaged",
                "newness",
                "echo"
            ],
            correctAnswer: 3,
            explanation: "Baghdad (S.N) will take singular verb echos."
        },
        {
            id: `${quizId}-q44`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "I thanked him for his advices.",
            options: [
                "him",
                "I thanked",
                "advices",
                "for his"
            ],
            correctAnswer: 2,
            explanation: "Replace 'advices' with 'advice'. Advice is an uncountable noun and cannot take plural form."
        },
        {
            id: `${quizId}-q45`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "These stray cattles are roaming around the town.",
            options: [
                "These",
                "stray cattles",
                "the town",
                "are roaming around"
            ],
            correctAnswer: 1,
            explanation: "Replace 'cattles' with 'cattle'. Cattle is a plural noun and hence no 's' is needed."
        },
        {
            id: `${quizId}-q46`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "The chart papers were distributed among all the childrens.",
            options: [
                "The chart papers",
                "among all",
                "were distributed",
                "the childrens"
            ],
            correctAnswer: 3,
            explanation: "Replace 'childrens' with 'children'. Children is the plural form of Child."
        },
        {
            id: `${quizId}-q47`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "There isn't many rice",
                "/ left in the house so we must",
                "/ replenish our stock soon",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "'Much' will come in place of 'many' 'Much' comes with uncountable nouns. 'Many' comes with countable nouns."
        },
        {
            id: `${quizId}-q48`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "The children's are fond of climbing the mango tree in the garden.",
            options: [
                "climbing the mango tree",
                "are fond of",
                "in the garden",
                "The children's CHSL-2018 9 July, 2019, Evening"
            ],
            correctAnswer: 3,
            explanation: "Remove ‘apostrophe s’."
        },
        {
            id: `${quizId}-q49`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "I had a hard time paying the driver as I had only hundreds rupee note.",
            options: [
                "paying the driver",
                "only hundreds rupee note",
                "I had a hard time",
                "as I had"
            ],
            correctAnswer: 1,
            explanation: "Replace 'hundreds rupee note' with 'a hundred rupee note'."
        },
        {
            id: `${quizId}-q50`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Most of the work of this NGO are of little benefit to the disadvantaged.",
            options: [
                "Most of the work",
                "of this NGO",
                "to the disadvantaged",
                "are of little benefit"
            ],
            correctAnswer: 3,
            explanation: "Replace 'are' with 'is'. Because 'work' is an uncountable noun."
        }
    ];

    window.GJU_QUIZ_BANK.push({
        id: quizId,
        title: "English Detecting Errors Practice Set 28",
        subject: "English",
        difficulty: "Hard",
        questions
    });
})();