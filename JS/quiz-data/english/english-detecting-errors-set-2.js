(function () {
    "use strict";

    window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];

    const quizId = "english-detecting-errors-set-2";

    const questions = [
        {
            id: `${quizId}-q01`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "A chill wind blew",
                "/ and icy fingers of death",
                "/ crept up my spine",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Replace ‘chill’ (Noun) with ‘chilled’ (adjective). An adjective is used to qualify a noun. Here ‘chill’ is a Noun and ‘chilled’ is an Adjective."
        },
        {
            id: `${quizId}-q02`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "IIM Calcutta’s MBA programme",
                "/ is regarded",
                "/ as the finest in the country",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Change IIM Calcutta’s MBA programme into the MBA programme of IIM Calcutta."
        },
        {
            id: `${quizId}-q03`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "He feels his troubles",
                "/ as much or",
                "/ even more than they",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "‘As much as’ is the correct structure. If both positive and comparative degrees are used in a sentence, the following structure must be used- As + Positive degree + as ... comparative degree + than"
        },
        {
            id: `${quizId}-q04`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "He was",
                "/ a learnt man among lords,",
                "/ and a lord among learned men",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘learnt’ (V3) with ‘learned’ (Adjective)."
        },
        {
            id: `${quizId}-q05`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "In India,",
                "/ there are",
                "/ many poors",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "‘Poor’ is an adjective. We make plural form of nouns, not adjectives. Change ‘poors’ into ‘poor’ and add ‘people’ after ‘poor’."
        },
        {
            id: `${quizId}-q06`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "I told the teacher",
                "/ that the homework set for the day",
                "/ was much too heavy for us to complete",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "‘Much too’ is followed by an adjective. ‘Too much’ is followed by a Noun. Hence ‘much too + heavy’ is correct."
        },
        {
            id: `${quizId}-q07`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Mobile phones are so importance these days that they are no longer luxury items but have become a necessity.",
            options: [
                "a necessity",
                "so importance these days",
                "no longer",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Here we need an adjective (important) to qualify the Noun (mobile phones)."
        },
        {
            id: `${quizId}-q08`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Henry is a capable boy of doing anything.",
            options: [
                "a capable boy",
                "of doing anything",
                "Henry is",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Here ‘boy’ must come before ‘capable’ to make the sentence meaningful. It should read ‘a boy capable of’."
        },
        {
            id: `${quizId}-q09`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "This is not",
                "/ a worth reading book",
                "/ so don’t read it",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "‘Worth’ is a post positive adjective. It is always used after the Noun it qualifies. Hence replace ‘a worth reading book’ with ‘a book worth reading’."
        },
        {
            id: `${quizId}-q10`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "She has married",
                "/ a young tall",
                "/ Australian accountant",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘a young tall’ with ‘a tall young’."
        },
        {
            id: `${quizId}-q11`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "I now realise that public speaking",
                "/ requires as much courage",
                "/ and confidence as to dance",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Comparison takes place between two similar things. Here Gerund (speaking) should be compared with (dancing). Hence replace ‘to dance’ with ‘dencing’."
        },
        {
            id: `${quizId}-q12`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Give your answers",
                "/ in your own words",
                "/ as far as practical",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Here ‘as far as practicable’ should be used. We can use ‘possible’ too in place of practical."
        },
        {
            id: `${quizId}-q13`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The suggestion given by him",
                "/ is as bad, if not worst",
                "/ than the one suggested by you",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "The correct structure is: as + positive degree adjective + as + if not + comparative degree + than. Hence it should be ‘as bad as if not worse’ than ..."
        },
        {
            id: `${quizId}-q14`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "I do not know who you consider to be the best dancer.",
            options: [
                "I do not know",
                "who you consider",
                "to be the best dancer",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Change ‘who’ into ‘whom’ as you is the subject and we need ‘whom’ in place of object."
        },
        {
            id: `${quizId}-q15`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "We, in India can look forward to a comfortable and settleD life in the twenty-first century.",
            options: [
                "to a comfortable and settle",
                "life in the twenty-first century",
                "No error",
                "We, in India can look forward"
            ],
            correctAnswer: 0,
            explanation: "Replace verb (settle) with adjective (settled)"
        },
        {
            id: `${quizId}-q16`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "He runs",
                "/ more faster",
                "/ than I",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "We do not use double comparative in a single sentence. Hence remove ‘more’ ."
        },
        {
            id: `${quizId}-q17`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The fight for liberation",
                "/ brings out the best and",
                "/ a noblest quality in mankind",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Remove ‘a’. We need only one article for one subject."
        },
        {
            id: `${quizId}-q18`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Not much",
                "/ people realize",
                "/ his sincerity",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "For countable noun ‘many’ is used. Hence replace ‘not much’ with ‘not many’."
        },
        {
            id: `${quizId}-q19`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "It was obviously for everyone",
                "/ that grandfather was",
                "/ hiding something from all of us",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Adjective (obvious) will come in the place of adverb 'obviously'."
        },
        {
            id: `${quizId}-q20`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "With little creativity and hard work",
            options: [
                "/ the project could have been",
                "/ successfully completed",
                "No error",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "As per the meaning of sentence, add 'a' before ‘little’ because we mean to say a small but not negligible amount of creativity."
        },
        {
            id: `${quizId}-q21`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "My younger sister",
                "/ is much smarter",
                "/ then me",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace 'then' with 'than'. A comparative degree is followed by 'than'."
        },
        {
            id: `${quizId}-q22`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Gita had been",
                "/ dancing at the party little",
                "/ more than usual",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Little means 'not much (hardly any)'. Thus the adjective 'little' means 'equivalent to nothing'. A Little means some though not much. 'A little' means not equivalent to nothing.Hence replace ‘little’ with ‘a little’."
        },
        {
            id: `${quizId}-q23`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "I am better",
                "/ adapted to the",
                "/ climate than you",
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
                "Being a well know scientist,",
                "/ he was invited to deliver",
                "/ a lecture on artificial intelligence",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Correct adjective is 'well known'. So replace 'know' with 'known'."
        },
        {
            id: `${quizId}-q25`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Ajay glanced up",
                "/ at her laughing",
                "/ and watched her intently",
                "No error"
            ],
            correctAnswer: 3,
            explanation: "No error"
        },
        {
            id: `${quizId}-q26`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "No students is",
                "/ as intelligent",
                "/ as Priya",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Change 'students' into student as 'no' is singular"
        },
        {
            id: `${quizId}-q27`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The population of Mumbai",
                "/ is greater than",
                "/ in any city in USA",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "The comparison should be always between the same things. Here we are comparing 'population' of Mumbai with the population of USA, thus add 'that of' before ‘any city of the USA’. Omit 'in'"
        },
        {
            id: `${quizId}-q28`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The Statesman has",
                "/ the largest circulation of any",
                "/ English dailies",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Change 'of any' into 'among all'. Hence one is chosen out of all."
        },
        {
            id: `${quizId}-q29`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Each child",
                "/ was given a",
                "/ red beautiful balloon",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "If adjective of size, colour, age, etc. come together in a sentence, they should be used in the following order: OSASCOMP (Read the rule in Volume 1). We have one more rule which is. Opinion Size Age ShapeColour 5 1 4 2 3               OriginMaterial Purpose Noun  7 6 8              Hence adjective of opinion (beautiful) should come before the adjective of colour (red). Thus replace 'a red beautiful balloon' with 'a beautiful red balloon'."
        },
        {
            id: `${quizId}-q30`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "It is best",
                "/ to be silent",
                "/ than to speak in anger",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "'Than' is preceded by a comparative degree. Thus replace the superlative degree (best) with comparative degree (better)."
        },
        {
            id: `${quizId}-q31`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The trek is difficult",
                "/ but it is far worth",
                "/ the endeavour",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "According to the meaning of the sentence we need a positive expression here. Hence replace 'far worth' with 'well worth'. ‘Well worth’ means ‘certainly worth’."
        },
        {
            id: `${quizId}-q32`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The Statesman has the",
                "/ larger circulation",
                "/ of all English dailies",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "'The' is use before superlative degree adjective. Hence replace 'large' with 'largest'."
        },
        {
            id: `${quizId}-q33`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "All works of",
                "/ creative writing",
                "/ have aesthetics appeal",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Here we are using, 'aesthetic' as an 'adjective' to describe 'appeal' (noun). Thus replace 'aesthetics' with 'aesthetic'."
        },
        {
            id: `${quizId}-q34`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The author said during the press conference",
                "/ that there were",
                "/ two farther volumes to be published",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace 'farther' with 'further'. 'Farther' means 'more far' (vkSjnwj) , 'further' means 'in addition to' (vkSj)"
        },
        {
            id: `${quizId}-q35`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "He was not able to concentrate",
                "/ because of the continual music",
                "/ being played next door",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "According to the meaning of the sentence it should be 'continuous'. 'Continual' is used for an action that 'happens frequently, with intervals between'. 'Continuous' means at length without break'. Replace 'Continual' with 'Continuous'."
        },
        {
            id: `${quizId}-q36`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The job is",
                "/ under the direct",
                "/ of Mrs Jones",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace 'direct' with 'direction' or ‘direct control’."
        },
        {
            id: `${quizId}-q37`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "There is",
                "/ few time",
                "/ for preparation",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "'Time' being an uncountable noun takes 'little' before it."
        },
        {
            id: `${quizId}-q38`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The man is",
                "/ the most tallest",
                "/ of the group",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Superlative degree of 'tall' is 'tallest'. Hence remove 'most'. Two superlative degrees cannot come together."
        },
        {
            id: `${quizId}-q39`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The doctor says that",
                "/ the patient will recover",
                "/ in few days",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace 'few' with 'a few'. 'A few' means 'at least some'."
        },
        {
            id: `${quizId}-q40`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "This is an urgent",
                "/ matter which may admit",
                "/ of few delays",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "'Few' has negative meaning whereas 'a few' has positive meaning. Thus replace 'few' with 'little'. 'Delays' be changed into 'delay' as delay is an uncountable noun."
        },
        {
            id: `${quizId}-q41`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Computers give us",
                "/ the easier access",
                "/ to information",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Comparative degree of adjective is used when there is comparison between two objects. In the sentence there is no comparison. Hence replace comparative (easier) with a positive degree (easy) of adjective."
        },
        {
            id: `${quizId}-q42`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Wise men follow nobel",
                "/ ideas whereas fools",
                "/ disregard them",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Replace 'Nobel' with 'Noble' Nobel - founder of Nobel prizes Noble - showing fine personal qualities."
        },
        {
            id: `${quizId}-q43`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The navel officers",
                "/ successful fought the pirates",
                "/ who had looted and plundered for many years",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "'Naval' should be used in place of 'Navel'. Naval – ukfHk lacaf / r Navel – usoh lacaf / r"
        },
        {
            id: `${quizId}-q44`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Will you please",
                "/ give me little milk",
                "/ for my cat",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Use 'a little' in place of 'little'"
        },
        {
            id: `${quizId}-q45`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "As I prefer coffee than tea my friends always take the trouble to get me a cup of coffee.",
            options: [
                "As I prefer",
                "coffee than tea",
                "my friends always take the trouble",
                "to get me a cup of coffee"
            ],
            correctAnswer: 1,
            explanation: "Replace 'than' with 'to'. : Prefer takes 'to'."
        },
        {
            id: `${quizId}-q46`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "An effective secondary research requires data to be collected from discreet sources like journals, magazines and other published material.",
            options: [
                "required data to be",
                "discreet sources",
                "effective secondary research",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace 'discreet' with 'discrete'. Discreet –not noticeable Discrete –Separate and different from each other."
        },
        {
            id: `${quizId}-q47`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "I prefer apples more than oranges.",
            options: [
                "I prefer",
                "apples more than",
                "oranges",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace 'more than' with 'to'. Prefer takes 'to'."
        },
        {
            id: `${quizId}-q48`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "No method of making other",
                "/ people agree to",
                "/ your view point is as effective as this method",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Use 'other' after 'no'."
        },
        {
            id: `${quizId}-q49`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The conference was",
                "/ attended",
                "/ by more than one hundred delegates",
                "No error"
            ],
            correctAnswer: 3,
            explanation: ""
        },
        {
            id: `${quizId}-q50`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Travel blogging is hardly work",
                "/ and will earn you nothing",
                "/ in the first few years",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Change 'is hardly work' into 'a hard work'. Hardly - eqf'dy ls Hard - dfBu"
        }
    ];

    window.GJU_QUIZ_BANK.push({
        id: quizId,
        title: "English Detecting Errors Practice Set 2",
        subject: "English",
        difficulty: "Hard",
        questions
    });
})();