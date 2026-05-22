(function () {
    "use strict";

    window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];

    const quizId = "english-detecting-errors-set-27";

    const questions = [
        {
            id: `${quizId}-q01`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The clerk was",
                "/ not intimidated by",
                "/ his boss’s bullying",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace ‘boss’s’ with ‘boss’. If a plural noun ends in ‘s / es’, ‘s’ is not added while using apostrophe with the plural form and those ending with hissing sound. Boys’ college. Girls’ school. Boss’ bullying."
        },
        {
            id: `${quizId}-q02`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "This misogynist hates",
                "/ all mother- in-laws,",
                "/ woman-doctors and house maids",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘mother-in-laws’ with ‘mothers-in-law’."
        },
        {
            id: `${quizId}-q03`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "I",
                "/ have",
                "/ many works to do",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace ‘many works’ with ‘much work’ or ‘many pieces of work’. Here ‘work’ is an uncountable noun."
        },
        {
            id: `${quizId}-q04`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The company has ordered",
                "/ some",
                "/ new equipments",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace ‘equipments’ with ‘equipment’. ‘Equipment’ is an uncountable noun so it must be in singular form."
        },
        {
            id: `${quizId}-q05`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "I like",
                "/ the poetries",
                "/ of Byron and Shelley",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘Poetries’ with ‘Poetry’. ‘Poetry’ is an uncountable noun."
        },
        {
            id: `${quizId}-q06`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The Manager put forward",
                "/ a number of critereons /",
                "for the post",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘criterions’ with ‘criteria’. Criteria (Noun) is plural of criterion."
        },
        {
            id: `${quizId}-q07`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The furnitures",
                "/ had become",
                "/ old and rusty",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Replace ‘furnitures’ with ‘furniture’."
        },
        {
            id: `${quizId}-q08`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Most people",
                "/ are afraid of",
                "/ swine flu these days",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Replace ‘most people’ with ‘most of the people’."
        },
        {
            id: `${quizId}-q09`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "There are",
                "/ no poetries",
                "/ in my book",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘Poetries’ with ‘Poetry’."
        },
        {
            id: `${quizId}-q10`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "That house",
                "/ is built of",
                "/ stones",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace ‘stones’ with ‘stone’ . ‘Stone’ is an Uncountable Noun."
        },
        {
            id: `${quizId}-q11`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Santosh lives",
                "/ by the principals",
                "/ he professes",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace 'Principals' with 'Principle'. 'Principle' means 'a basic idea or belief about'."
        },
        {
            id: `${quizId}-q12`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "There is",
                "/ no place of you",
                "/ in this compartment",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace 'place' with 'room'."
        },
        {
            id: `${quizId}-q13`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Last week’s sharp hike in the wholesale price of beef",
                "/ is a strong indication for",
                "/ higher meat costs to come",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace ‘costs’ with ‘cost’."
        },
        {
            id: `${quizId}-q14`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "They are standing",
                "/ at the gate of the auditorium",
                "/ as there is no place inside",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace 'place' with 'room'."
        },
        {
            id: `${quizId}-q15`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "We get",
                "/ excellent furnitures",
                "/ in this shop",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘furnitures’ with ‘furniture’."
        },
        {
            id: `${quizId}-q16`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "We should arrange",
                "/ for a porter as",
                "/ the luggages are heavy",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace ‘luggages’ with ‘luggage’."
        },
        {
            id: `${quizId}-q17`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Hari lost",
                "/ a hundred rupees note",
                "/ yesterday",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘a hundred rupees note’ with ‘a hundred rupee note’. Here hundred rupee is used as an adjective to qualify noun ‘note’."
        },
        {
            id: `${quizId}-q18`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Speakers after speakers",
                "/ came on the stage",
                "/ to perform",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Replace ‘speakers after speakers’ with ‘speaker after speaker’. If a preposition comes after a noun and then the same noun is repeated, the noun should be in singular form."
        },
        {
            id: `${quizId}-q19`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "On receiving the mark-sheet from the University",
                "/ I realised",
                "/ that I had got only passing marks in English",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace ‘passing marks’ with ‘pass marks’. ‘Passing marks’ is wrong English."
        },
        {
            id: `${quizId}-q20`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Some of his",
                "/ luggages was lost",
                "/ in the train",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘luggages’ with ‘luggage’."
        },
        {
            id: `${quizId}-q21`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "An emminent surgeon",
                "/ is visiting the hospital",
                "/ to attend a surgeons’ conference",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Replace 'emminent' with 'eminent'. Eminent means '(of a person) famous and respected'. (mRÑ\"V)"
        },
        {
            id: `${quizId}-q22`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Books fair",
                "/ encourage",
                "/ reading habit",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Change ‘Books fair’ into ‘Book fairs’."
        },
        {
            id: `${quizId}-q23`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "I bought",
                "/ two",
                "/ slippers",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘two’ with ‘two pairs of’."
        },
        {
            id: `${quizId}-q24`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "The paintings of natural sceneries",
            options: [
                "/ are selling",
                "/ like hot cakes",
                "No error",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Replace ‘sceneries’ with ‘scenery’. ‘Scenery’ is an Uncountable Noun."
        },
        {
            id: `${quizId}-q25`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "You shall get",
                "/ all the informations",
                "/ if you read this book carefully",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘informations’ with ‘information’. ‘Information’ is an uncountable Noun so it must be in singular form."
        },
        {
            id: `${quizId}-q26`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "My father gave me",
                "/ a pair of binocular",
                "/ on my birthday",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘binocular’ with ‘binoculars’. ‘Binoculars’ always exist in plural form."
        },
        {
            id: `${quizId}-q27`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Eighty–five thousand rupees",
                "/ is a large sum of money",
                "/ to earn in a month",
                "No error"
            ],
            correctAnswer: 3,
            explanation: "No error."
        },
        {
            id: `${quizId}-q28`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The cattles",
                "/ are grazing",
                "/ in the fields",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Replace ‘Cattles’ with ‘cattle’. ‘Cattle’ always exist in singular form but it has Plural meaning."
        },
        {
            id: `${quizId}-q29`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "When I was passing through the forest",
                "/ I happened to see",
                "/ a number of deers",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace ‘deers’ with ‘deer’. Deer is a plural noun but it always exists in singular form."
        },
        {
            id: `${quizId}-q30`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Many persons must have read",
                "/ The Arabian Nights',",
                "/ which is very interesting",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Change ‘persons’ into ‘people. For large number we use ‘people’."
        },
        {
            id: `${quizId}-q31`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The new device",
                "/ aims at eliminating",
                "/ the risk of short - circuiting",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace ‘short-circuiting’ with ‘short-circuit’."
        },
        {
            id: `${quizId}-q32`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Shakespeare has written",
                "/ many plays",
                "/ as well as some poetries",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace ‘Poetries’ with ‘Poems’. ‘Poetry’ is an Uncountable Noun."
        },
        {
            id: `${quizId}-q33`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "In India, hill stations",
                "/ usually have",
                "/ beautiful sceneries",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace ‘sceneries’ with ‘scenery’."
        },
        {
            id: `${quizId}-q34`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "In these days of inflation",
                "/ a ten rupees note will not buy you /",
                "even an ordinary meal",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘a ten rupees’ note with ‘a ten rupee’. Here ‘ten rupee’ is an adjective qualifying a noun ‘note’."
        },
        {
            id: `${quizId}-q35`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The first inning",
                "/ of the match",
                "/ was very sensational",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "‘Innings’ always exist in plural form but singular in meaning."
        },
        {
            id: `${quizId}-q36`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "The International Day against Drug Abuse and Illicit Traffickings is observed on June 26th.",
            options: [
                "Drug Abuse and Illicit Traffickings",
                "No error",
                "is observed on June 26th",
                "The International Day against"
            ],
            correctAnswer: 2,
            explanation: "Change ‘June 26th ’ into ‘June 26’."
        },
        {
            id: `${quizId}-q37`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Reading is no longer popular among the youthful of today. As the influence of the internet has taken over a very important and active hobby.",
            options: [
                "among the youthful of today",
                "very important and active hobby",
                "influence of the internet",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Replace ‘youthful’ with ‘youth’. Here we are talking about young people."
        },
        {
            id: `${quizId}-q38`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "I saw",
                "/ two deers",
                "/ in the woods",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘deers’ with ‘deer’. The plural of ‘deer’ is ... ‘deer’."
        },
        {
            id: `${quizId}-q39`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "A five–men",
                "/ enquiry committee was appointed",
                "/ to look into the matter",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Replace ‘Five-men’ with ‘Five- man’. Hyphenated (-) noun does not have plural form."
        },
        {
            id: `${quizId}-q40`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Second hand",
                "/ furnitures were",
                "/ put to auction",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘furnitures were’ with ‘furniture was’. ‘Furniture’ is an uncountable noun so it always exists in singular form so it takes singular verb."
        },
        {
            id: `${quizId}-q41`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "His father",
                "/ bought these furnitures",
                "/ the day before yesterday",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘furnitures’ with ‘furniture’."
        },
        {
            id: `${quizId}-q42`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Bobby learnt the alphabets at the age of two.",
            options: [
                "No error",
                "age of two",
                "Bobby learnt the",
                "alphabets at the"
            ],
            correctAnswer: 3,
            explanation: "Replace ‘alphabets’ with ‘alphabet’. ‘Alphabet’ is used in singular form. ‘Letters’ of a language are collectively called ‘alphabet’."
        },
        {
            id: `${quizId}-q43`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "I watched how the pianoist used her left hand.",
            options: [
                "I watched how",
                "the pianoist",
                "No error",
                "used her left hand"
            ],
            correctAnswer: 1,
            explanation: "Correct spelling is ‘Painist’."
        },
        {
            id: `${quizId}-q44`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "It is not advisable to take heavy luggages while on a journey.",
            options: [
                "to take heavy luggages",
                "while on a journey",
                "No error",
                "It is not advisable"
            ],
            correctAnswer: 0,
            explanation: "Replace ‘luggages’ with ‘luggage’. ‘Luggage’ is an uncountable noun. It always exist in singular form."
        },
        {
            id: `${quizId}-q45`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "The childrens were happy when the film started.",
            options: [
                "The childrens",
                "when the film started",
                "No error",
                "were happy"
            ],
            correctAnswer: 0,
            explanation: "Replace ‘childrens’ with ‘children’. ‘Children’ exists in singular form but plural in meaning."
        },
        {
            id: `${quizId}-q46`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "This is Johns book on the table.",
            options: [
                "No error",
                "Johns book",
                "on the table",
                "This is"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘Johns’ with ‘John’s’."
        },
        {
            id: `${quizId}-q47`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "It is not advisable to take heavy luggages while on travelling these days.",
            options: [
                "No error",
                "to take heavy luggages",
                "It is not advisable",
                "while on travelling these days"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘luggages’ with ‘luggage’. ‘Luggage’ is uncountable noun. It must be in singular form."
        },
        {
            id: `${quizId}-q48`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Did you hear many news about the political situation while you were in that country ?",
            options: [
                "about the political situation while you were in that country ?",
                "many news",
                "Did you hear",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘many’ with ‘any’."
        },
        {
            id: `${quizId}-q49`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "The people gathered at the funeral to pay respect.",
            options: [
                "No error",
                "The people gathered",
                "at the funeral",
                "to pay respect"
            ],
            correctAnswer: 3,
            explanation: "Change ‘respect’ into ‘tribute’ or ‘homage’."
        },
        {
            id: `${quizId}-q50`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "She always fed",
                "/ her childrens",
                "/ before she fed her dog",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘childrens’ with ‘children’."
        }
    ];

    window.GJU_QUIZ_BANK.push({
        id: quizId,
        title: "English Detecting Errors Practice Set 27",
        subject: "English",
        difficulty: "Hard",
        questions
    });
})();