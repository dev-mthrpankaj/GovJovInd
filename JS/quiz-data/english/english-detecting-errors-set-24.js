(function () {
    "use strict";

    window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];

    const quizId = "english-detecting-errors-set-24";

    const questions = [
        {
            id: `${quizId}-q01`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "My friend Sahib",
                "/ is one of the best football player",
                "/ in the country",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Change 'player' into 'players' because 'one of' is followed by a plural noun / pronoun."
        },
        {
            id: `${quizId}-q02`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "This short-term mentality,",
                "/ most of the times, leads to undesired",
                "/ loss and disappointment",
                "No error"
            ],
            correctAnswer: 3,
            explanation: ""
        },
        {
            id: `${quizId}-q03`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The Roman Church of Catholics",
                "/ is one of the",
                "/ precious institutions",
                "No error"
            ],
            correctAnswer: 3,
            explanation: "No error."
        },
        {
            id: `${quizId}-q04`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Mr. Gupta with his wife",
                "/ and younger brother",
                "/ were present at the station",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Use 'was' instead of 'were'. If the subject is joined by 'as well as', 'with', 'but', 'except', 'like' etc. the verb agrees to the first subject."
        },
        {
            id: `${quizId}-q05`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Tickle is",
                "/ one of the broadest and deepest",
                "/ subject in science",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace 'subject' with 'subjects'. 'One of' is followed by plural noun."
        },
        {
            id: `${quizId}-q06`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The behaviour of resident spiders",
                "/ towards pirate spiders and their own prey",
                "/ are quite different",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace 'are' with 'is'. Behaviour is singular and hence will take singular verb."
        },
        {
            id: `${quizId}-q07`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "If you describe someone as a maverick,",
                "/ you mean that he is unconventional and independent",
                "/ and do not think or behave in the same way as other people",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace 'do' with 'does'."
        },
        {
            id: `${quizId}-q08`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "King penguins",
                "/ are active throughout",
                "/ the long summer days",
                "No error"
            ],
            correctAnswer: 3,
            explanation: ""
        },
        {
            id: `${quizId}-q09`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Earth's deserts",
                "/ is a land of extremes,",
                "/ constantly pushing life to the limit",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace 'is' with 'are'."
        },
        {
            id: `${quizId}-q10`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Men who has risen",
                "/ by their own exertions",
                "/ are always respected",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Replace 'has' with 'have'. Men (Plural subject) take plural verb."
        },
        {
            id: `${quizId}-q11`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Neither Nita nor her sisters has applied for this job",
            options: [
                "nor her",
                "has applied",
                "Neither Nita",
                "for this job"
            ],
            correctAnswer: 1,
            explanation: "Replace 'has' by 'have'. Verb follows the nearest subject when joined by neither ... nor."
        },
        {
            id: `${quizId}-q12`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "The manager along with his colleagues are preparing for the annual report to be submitted at the end of the financial year.",
            options: [
                "at the end",
                "of the financial year",
                "are preparing",
                "along with his colleagues"
            ],
            correctAnswer: 2,
            explanation: "Replace 'are' with 'is'. Subject (manager) is singular. When two subjects are joined by alongwith, the verb agrees to the 1st subject."
        },
        {
            id: `${quizId}-q13`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "The staff of the dairy was firm that there was no space inside for more cattle as there was already 2500 stray animals inside.",
            options: [
                "there was already",
                "for more cattle",
                "was firm",
                "there was no space"
            ],
            correctAnswer: 2,
            explanation: "Replace 'was' with 'were'. Subject (animals) is plural."
        },
        {
            id: `${quizId}-q14`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "His chances of winning both the races seems slight to me.",
            options: [
                "of winning",
                "His chances",
                "seems slight",
                "both the races"
            ],
            correctAnswer: 1,
            explanation: "Replace 'seems (singular)' with 'seem (plural)'. Subject (chances) is plural."
        },
        {
            id: `${quizId}-q15`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "A number of points of resemblance between the Australian and Dravidian languages is discovered, despite the fact that the homes of the two races are so far apart.",
            options: [
                "despite the fact",
                "point of resemblance",
                "so far apart",
                "is discovered"
            ],
            correctAnswer: 3,
            explanation: "Replace 'is' with 'are'. A number of takes plural noun and plural verb."
        },
        {
            id: `${quizId}-q16`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Many a girl were influenced by the inspirational lecture given by the Nobel laureate.",
            options: [
                "Nobel laureate",
                "were influenced",
                "inspirational lecture",
                "Many a girl"
            ],
            correctAnswer: 1,
            explanation: "Replace 'were' with 'was'. Many a takes singular Subject and Singular Verb"
        },
        {
            id: `${quizId}-q17`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Lupin is one of the least important person in the opposition and can never hope to become a minister.",
            options: [
                "become",
                "in the opposition",
                "can never",
                "least important person"
            ],
            correctAnswer: 3,
            explanation: "Replace 'person' with 'persons'. One of takes plural noun."
        },
        {
            id: `${quizId}-q18`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Neither Mohit nor Rohit were there at the shop when I sent there.",
            options: [
                "when",
                "Neither Mohit nor Rohit",
                "were there",
                "at the shop"
            ],
            correctAnswer: 2,
            explanation: "Replace 'were' with 'was'. The verb agrees to the nearest subject if connected by 'neither ... nor'."
        },
        {
            id: `${quizId}-q19`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Either Avika or Nikunj are going to win the prize in the handwriting competition.",
            options: [
                "Either Avika",
                "or Nikunj",
                "in the",
                "are going to"
            ],
            correctAnswer: 3,
            explanation: "Replace 'are' with 'is'. The verb agrees to the nearest subject (here- Nikunj) if joined by 'neither ... or'."
        },
        {
            id: `${quizId}-q20`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Neither I nor my sisters was interested in learning music.",
            options: [
                "nor my sisters",
                "in learning music",
                "was interested",
                "Neither I"
            ],
            correctAnswer: 2,
            explanation: "Replace 'was' with 'were'. 'Sisters' will take plural verb."
        },
        {
            id: `${quizId}-q21`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "The village, with all its houses, were flooded by the river.",
            options: [
                "by the river",
                "were flooded",
                "it houses",
                "with all"
            ],
            correctAnswer: 1,
            explanation: "Replace 'were' with 'was'. If two subjects are joined by with, the verb agrees to the 1st subject."
        },
        {
            id: `${quizId}-q22`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Silver, as well as gold, are considered as precious metals.",
            options: [
                "as precious metals",
                "as well as",
                "Silver",
                "are considered"
            ],
            correctAnswer: 3,
            explanation: "Replace 'are' with 'is'. If two subjects are joined by 'as well as', the verb agrees to the 1st subject."
        },
        {
            id: `${quizId}-q23`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "From my hotel I could see that a flock of birds were flying over the lake.",
            options: [
                "over the lake",
                "were flying",
                "From my hotel",
                "I could see"
            ],
            correctAnswer: 1,
            explanation: "Replace 'were' with 'was'. Flock will take singular verb."
        },
        {
            id: `${quizId}-q24`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "A new research study has shown that long before they took up a strict vegetarian diet, the much loved pandas was a meat-eater.",
            options: [
                "has shown",
                "that long before",
                "was a meat-eater",
                "took up"
            ],
            correctAnswer: 2,
            explanation: "Replace 'was' with 'were'. Pandas -plural noun."
        },
        {
            id: `${quizId}-q25`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "During hair transplantation, hair follicles is transplanted from one part of the head to another where the hair is thinning.",
            options: [
                "hair follicles is transplanted",
                "During hair transplantation",
                "from one part of the head to another",
                "where the hair is thinning"
            ],
            correctAnswer: 0,
            explanation: "Replace 'is' with 'are'. Follicles will take plural verb."
        },
        {
            id: `${quizId}-q26`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "The Natural History of Selborne records the importance of the earthworm to soil and describe an England unspoiled by the industrial revolution.",
            options: [
                "describe an England",
                "of the earthworm to soil",
                "records the importance",
                "unspoiled by the industrial revolution"
            ],
            correctAnswer: 0,
            explanation: "Replace 'describe' with 'describes'."
        },
        {
            id: `${quizId}-q27`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "More than 25% people admits they have not sent or received a hand- written letter in the past decade.",
            options: [
                "a hand-written letter",
                "More than 25% people admits",
                "they have not sent or received",
                "in the past decade"
            ],
            correctAnswer: 1,
            explanation: "Replace 'admits' with 'admit'. x% of plural noun takes plural verb."
        },
        {
            id: `${quizId}-q28`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Economic growth is sustainable only if all countries has food security.",
            options: [
                "has food security",
                "all countries",
                "Economic growth is",
                "sustainable only if"
            ],
            correctAnswer: 0,
            explanation: "Replace 'has' with 'have'. All countries will take plural verb."
        },
        {
            id: `${quizId}-q29`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "The problem of world hunger arises because of the economic inequality that distort food distributions.",
            options: [
                "The problem of",
                "because of the economic inequality",
                "that distort food distribution",
                "world hunger arises"
            ],
            correctAnswer: 2,
            explanation: "Replace 'distort (v1)' with 'distorts. Economic inequality will take singular verb."
        },
        {
            id: `${quizId}-q30`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Prema is the girl in my class who write beautiful poems.",
            options: [
                "Prema is the girl",
                "who write",
                "beautiful poems",
                "in my class"
            ],
            correctAnswer: 1,
            explanation: "Replace 'write (v1)' with 'writes'. Prema will take singular verb."
        },
        {
            id: `${quizId}-q31`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "The box of paper clips are kept in the drawer.",
            options: [
                "are kept",
                "The box",
                "of paper clips",
                "in the drawer"
            ],
            correctAnswer: 0,
            explanation: "Replace 'are' with 'is'. 'Box' takes singular verb."
        },
        {
            id: `${quizId}-q32`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Sunita is senior to me in this office and know all the rules.",
            options: [
                "Sunita is senior to me",
                "all the rules",
                "and know",
                "in this office"
            ],
            correctAnswer: 2,
            explanation: "Replace 'know' with 'knows'. Sunita will take singular verb."
        },
        {
            id: `${quizId}-q33`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "The list of candidates to be called for the interview were put up on the board.",
            options: [
                "for the interview",
                "The list of candidates",
                "were put up on the board",
                "to be called"
            ],
            correctAnswer: 2,
            explanation: "Replace 'were' with 'was'. List will take singular verb."
        },
        {
            id: `${quizId}-q34`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Neither Amit nor Raju are staying with his parents in Mumbai.",
            options: [
                "are staying",
                "in Mumbai",
                "with his parents",
                "Neither Amit nor Raju"
            ],
            correctAnswer: 0,
            explanation: "Replace 'are' with 'is'. If two subjects are joined by 'neither ... nor', the verb follows the nearest subject."
        },
        {
            id: `${quizId}-q35`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Economics is one of the subject which I have found very difficult since school.",
            options: [
                "Economics is",
                "which I have found",
                "very difficult since school",
                "one of the subject"
            ],
            correctAnswer: 3,
            explanation: "Replace 'subject' with 'subjects'. One of + plural noun. 'One of' is followed by plural noun."
        },
        {
            id: `${quizId}-q36`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Cyclone Idai is regarded as one of",
                "/ the worst tropical cyclone on record",
                "/ to affect Africa and Southern hemisphere",
                "/ as the whole"
            ],
            correctAnswer: 1,
            explanation: "If 'of' is used after each, every one etc, the noun or pronoun that comes immediately after 'of' will be plural in form. Change 'Cyclone' into 'cyclones'."
        },
        {
            id: `${quizId}-q37`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Every employee of the company",
                "/ were given a two bedroom",
                "/ flat as Diwali bonus",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Use 'was' instead of 'were'. Because every is singular."
        },
        {
            id: `${quizId}-q38`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The river Yamuna has many",
                "/ non- native species like goldfish",
                "/ that is affecting its eco-system",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace 'is' with are If a subject and the verb are joined by relative pronoun, the verb will agree to the antecedent to the relative pronoun."
        },
        {
            id: `${quizId}-q39`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Lodi colony in Delhi is very different",
                "/ from other places in the city",
                "/ that is crowded and noisy",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace 'is' with 'are'. 'Places' a plural noun will take plural verb."
        },
        {
            id: `${quizId}-q40`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The Doon Valley with all its lights",
                "/ look beautiful at night",
                "/ from the top of the mountain",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Verb will be singular because the subject 'valley' is singular. Change 'look' into 'looks'."
        },
        {
            id: `${quizId}-q41`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Each of the girls",
                "/ have given",
                "/ an impression dance performance",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Each of + Definite article + plural noun takes singular verb."
        },
        {
            id: `${quizId}-q42`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The match is about to",
                "/ begin since the captain",
                "/ as well as the team are on the field",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace 'are' with 'is'. Verb agrees to the first subject if conjunction is 'as well as'."
        },
        {
            id: `${quizId}-q43`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Supriya asked Kiran",
                "/ where had her mother gone",
                "/ when the results of the contest were being declared",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Place 'Had' after 'her mother'. The senten is not interrogative."
        },
        {
            id: `${quizId}-q44`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Ten kilometres are",
                "/ to cover on foot",
                "/ a long distance for a child",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "A plural number taken as a singular unit takes singular verb."
        },
        {
            id: `${quizId}-q45`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The length of a male swallow's tail",
                "/ reveal his attractiveness",
                "/ for a female swallow",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Use 'reveals' in place of 'reveal'. Length a singular noun takes singular verb."
        },
        {
            id: `${quizId}-q46`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The child along with his parents were",
                "/ waiting for",
                "/ the programme to begin",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Use 'was' in place of 'were'. The verb agrees with first subject. If conjunction is 'alongwith'."
        },
        {
            id: `${quizId}-q47`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Raja Ravi Varma was",
                "/ one of the first artist who tried",
                "/ to create a style that was both modern and traditional",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "One of takes plural noun. Change 'artist' into 'artists'."
        },
        {
            id: `${quizId}-q48`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "There is many modes",
                "/ of travel to go to Agra",
                "/ but I prefer road",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Subject 'many modes' is plural so, 'are' will be used in place of 'is'."
        },
        {
            id: `${quizId}-q49`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The cost of fruits and vegetables",
                "/ have risen",
                "/ abnormally this month",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "The main subject 'cost' is singular. Hence 'has' will come in place of 'have'."
        },
        {
            id: `${quizId}-q50`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Cows are amongst",
                "/ the gentlest of animals; none shows more",
                "/ passionate tenderness towards their young",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Add 'ones' after 'young'."
        }
    ];

    window.GJU_QUIZ_BANK.push({
        id: quizId,
        title: "English Detecting Errors Practice Set 24",
        subject: "English",
        difficulty: "Hard",
        questions
    });
})();