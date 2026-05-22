(function () {
    "use strict";

    window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];

    const quizId = "english-detecting-errors-set-7";

    const questions = [
        {
            id: `${quizId}-q01`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The stadium was full",
                "/ of spectators",
                "/ from one end to other",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "When we talk about a particular person or thing, or one already referred to, definite article 'the' is used. Hence add 'the' before 'other'. We use phrase ‘from one end to the other’."
        },
        {
            id: `${quizId}-q02`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "His mother hoped that",
                "/ Bunty would grow up to be",
                "/ the wise and famous man",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Indefinite article 'a / an' is used before singular countable noun which is not definite. Hence replace article 'the' with 'a'."
        },
        {
            id: `${quizId}-q03`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The task of",
                "/ writing a autobiography",
                "/ is a difficult one",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Article 'an' comes before a word which has vowel sound at the starting. Hence replace 'a' with 'an'."
        },
        {
            id: `${quizId}-q04`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "She was an",
                "/ only child who",
                "/ had been very welcome",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "The only child is more appropriate as it denotes the definite one present."
        },
        {
            id: `${quizId}-q05`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Since they were all dressed up,",
                "/ she assumed they",
                "/ were going to church together",
                "No error"
            ],
            correctAnswer: 3,
            explanation: "No error"
        },
        {
            id: `${quizId}-q06`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "It was like",
                "/ reading a",
                "/ open book",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Article 'an' is used before vowel sounds."
        },
        {
            id: `${quizId}-q07`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "This town has an ancient temple",
                "/ and beautiful waterfall",
                "/ so many tourists come here",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "If two noun refer to different persons or things, the article must be used with each noun. Hence add ‘a’ before ‘beautiful waterfall’."
        },
        {
            id: `${quizId}-q08`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "He had already sent me message",
                "/ that his arrival",
                "/ was scheduled for Thursday",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "'Message' is a countable noun so it will take article 'a' before it because here it is singular in form."
        },
        {
            id: `${quizId}-q09`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "A first European sailor",
                "/ who came to India",
                "/ was Vasco-da-Gama",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Article 'the' is used to indicate a specific noun. Also 'The' is used before ordinal numbers (first, second, third, etc.) • Cardinal numbers such as one, two and three do not take any article before them."
        },
        {
            id: `${quizId}-q10`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Variety",
                "/ is",
                "/ spice of life",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "The correct proverb is 'Variety is the spice of life'."
        },
        {
            id: `${quizId}-q11`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The King Juan Carlos of Spain",
                "/ arrived in London today",
                "/ for a three day visit",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Article is not used before the name of the people. Hence remove 'the' before the name of the king."
        },
        {
            id: `${quizId}-q12`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "I was",
                "/ at loss",
                "/ and did not know what to do",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "The correct phrase is 'at a loss'. It means 'uncertain of what to do or say'."
        },
        {
            id: `${quizId}-q13`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Outside, the rain beats down",
                "/ in floods and the sea gives forth",
                "/ a sound like an alarm bells",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Article 'an' is used before a singular countable noun. Thus replace 'bells' with 'bell'."
        },
        {
            id: `${quizId}-q14`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "I was first",
                "/ to reach the school",
                "/ today",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Article 'the' is used before an ordinal number. Hence, replace 'first' with 'the first'."
        },
        {
            id: `${quizId}-q15`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Sakshi wrote essay",
                "/ so well that",
                "/ her teacher was very pleased with her",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Use 'the' before 'essay'. Definite noun takes 'the'."
        },
        {
            id: `${quizId}-q16`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Mahatma Gandhi did not solve",
                "/ all the future problems",
                "/ but he did solve problems of his own age",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Use 'the' before 'problems'."
        },
        {
            id: `${quizId}-q17`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "I can give you the unique and",
                "/ quality content that will definitely",
                "/ lead value to your readers too",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Remove 'the' before Unique."
        },
        {
            id: `${quizId}-q18`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "It is estimated that cows might be more",
                "/ dangerous to a earth’s atmosphere than trucks",
                "/ and cars combined",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘a’ with ‘the’. 'The' comes with heavenly objects."
        },
        {
            id: `${quizId}-q19`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Be prepared for the fact that the interview",
                "/ panel may not agree with a opinions that",
                "/ you present to them",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘a’ with ‘the’. Change 'with' into to. Note:- Agree with someone, agree to something"
        },
        {
            id: `${quizId}-q20`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Price theorizes that if he is at one extreme",
                "/ end of an spectrum, then perhaps",
                "/ there is somebody at the other end",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘an’ with ‘the’. Also remove 'then'. 'If ... then' is a wrong pair of conjunction. 'If ...,' is correct."
        },
        {
            id: `${quizId}-q21`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Rajni is planning to settle",
                "/ in Mumbai as soon as",
                "/ she retires in August the next year",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Remove 'the'."
        },
        {
            id: `${quizId}-q22`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The English is a very",
                "/ popular language",
                "/ amongst south Indians",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Use 'English' instead of 'The English'. The English depicts nationality."
        },
        {
            id: `${quizId}-q23`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Ashish was listening",
                "/ to a radio when",
                "/ Sunita arrived",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace 'a' by 'the'. Inventions take article 'the'."
        },
        {
            id: `${quizId}-q24`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "We have issued",
                "/ a order seeking immediate",
                "/ printing of revised price tag",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace 'a' with 'an'. Vowel sound takes article 'an'."
        },
        {
            id: `${quizId}-q25`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "A Earth moves round the Sun.",
            options: [
                "moves",
                "the Sun",
                "A Earth",
                "round"
            ],
            correctAnswer: 2,
            explanation: "Change 'A' into 'the'. We use 'the' before heavenly objects."
        },
        {
            id: `${quizId}-q26`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "We had quite interesting talk on trekking at our college yesterday.",
            options: [
                "quite interesting talk",
                "on trekking",
                "We had",
                "at out college"
            ],
            correctAnswer: 0,
            explanation: "Add 'an' before 'interesting'."
        },
        {
            id: `${quizId}-q27`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "The Life-cycle hypothesis holds that individuals seek to smooth consumption over the course of a lifetime-borrowing in times of low- income and saving during period of high income.",
            options: [
                "in times",
                "period of",
                "over the course",
                "to smooth"
            ],
            correctAnswer: 3,
            explanation: "Explanation not clearly extracted from the PDF text layer; please verify once with the source PDF."
        },
        {
            id: `${quizId}-q28`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "He spends good deal of money on eating out.",
            options: [
                "good deal",
                "He spends",
                "on eating out",
                "of money"
            ],
            correctAnswer: 0,
            explanation: "Use 'a' before 'good deal'. 'A good deal' means sufficient in quantity or amount. 'A good deal' can be used only with uncountable nouns."
        },
        {
            id: `${quizId}-q29`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Tesla designed system for sending electricity over the air through a series of enormous towers.",
            options: [
                "for sending electricity",
                "Tesla designed system",
                "Through a series of enormous towers",
                "Over the air"
            ],
            correctAnswer: 1,
            explanation: "Use 'a' before 'system'."
        },
        {
            id: `${quizId}-q30`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "When Alexander the Great died in Babylon in 323 B.C., his body didn't begin to show signs of decomposition for a full six day, according to historical accounts.",
            options: [
                "When Alexander the Great died",
                "according to historical acc®ounts",
                "his body didn't being to show",
                "signs of decomposition for a full six day"
            ],
            correctAnswer: 3,
            explanation: "Remove 'a'. Change 'day' into days as six is a plural number."
        },
        {
            id: `${quizId}-q31`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Deepak said he would pack few things he had and vacate the hostel room the next day.",
            options: [
                "the next day",
                "Deepak said he would pack",
                "pack few things he had",
                "and vacate the hostel room CHSL-2018 10 July, 2019, Afternoon"
            ],
            correctAnswer: 2,
            explanation: "use ‘a few’ inspite of ‘few’. A few means not equivalent to 0."
        },
        {
            id: `${quizId}-q32`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "We will use enamel paint on this wall because it gives a best finish.",
            options: [
                "enamel paint on this wall",
                "We will use",
                "a best finish",
                "because it gives CHSL-2018 11 July, 2019, Afternoon"
            ],
            correctAnswer: 2,
            explanation: "use ‘the’ in place of ‘a’. We use article 'the' with superlative degree."
        },
        {
            id: `${quizId}-q33`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Does an English examination begin at 10 o’clock?",
            options: [
                "10 o’clock?",
                "English examination",
                "begin at",
                "Does an"
            ],
            correctAnswer: 3,
            explanation: "Replace 'an' with 'the'."
        },
        {
            id: `${quizId}-q34`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "To write a poem I need a pen, a diary and also the quiet place.",
            options: [
                "a diary",
                "To write",
                "and also the",
                "I need"
            ],
            correctAnswer: 2,
            explanation: "Replace 'the' with 'a'."
        },
        {
            id: `${quizId}-q35`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Since a meeting drew to a close, I realized that people were not really listening to me.",
            options: [
                "I realized",
                "Since a meeting",
                "drew to a close",
                "were not really"
            ],
            correctAnswer: 1,
            explanation: "Replace 'a' with 'the'. 'The' denotes that we are talking about a definite meeting'. kdpublication.com, amazon.in, flipkart.com ssc Prepared by Neetu Singh (1997–2016) 1000 1000 Revised Updated 1"
        },
        {
            id: `${quizId}-q36`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "When viewed with his point of view, the",
                "/ entire episode assumes",
                "/ a different colour altogether",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Replace ‘with his point of view’ with ‘from his point of view’."
        },
        {
            id: `${quizId}-q37`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Having finished at school",
                "/ Raghu thought / of going to Bombay in",
                "/ search some job",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace ‘in search some job’ with ‘in search of some job’."
        },
        {
            id: `${quizId}-q38`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "When shall we",
                "/ arrive",
                "/ to our destination ?",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace ‘arrive to’ with ‘arrive at’. We generally say: 1) arrive in a country / city. 2) arrive at a place."
        },
        {
            id: `${quizId}-q39`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The officer",
                "/ is angry on the clerk",
                "/ for not attending to the work",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘angry on’ with ‘angry with’.  Angry with someone.  Angry at something he does."
        },
        {
            id: `${quizId}-q40`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The patient",
                "/ was accompanied",
                "/ with his friend",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Change ‘with’ into ‘by’  accompany by someone."
        },
        {
            id: `${quizId}-q41`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "We were looking forward",
                "/ to hear news",
                "/ about the missing fishermen",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘hear’ with ‘hearing’. All Prepositions (including ‘to’) is followed by a Gerund."
        },
        {
            id: `${quizId}-q42`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The actress",
                "/ was shocked",
                "/ by the news of her dog’s death",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace ‘by’ with ‘at’.  Shocked at something."
        },
        {
            id: `${quizId}-q43`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Heavy rain",
                "/ prevented us",
                "/ to go to the cinema",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "‘Prevent’ takes Preposition ‘from’ with it and after ‘from’ (a preposition) Ving is used."
        },
        {
            id: `${quizId}-q44`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "We had a lot of difficulty",
                "/ to find",
                "/ the house",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘to find’ with ‘in finding’."
        },
        {
            id: `${quizId}-q45`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Teachers of various schools",
                "/ met to discuss about",
                "/ how to improve the standard of English",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Verb ‘discuss’ is not followed by any Preposition. Hence remove ‘about’."
        },
        {
            id: `${quizId}-q46`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Beside food,",
                "/ the pilgrims carried",
                "/ some medicines. /",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Replace ‘beside’ with ‘besides’. ‘Beside’ means ‘at the side of’. ‘Besides’ means ‘in addition to’."
        },
        {
            id: `${quizId}-q47`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Adults suffering chicken pox",
                "/ can develop",
                "/ all kinds of complications",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "‘Suffering’ takes Preposition ‘from’ with it."
        },
        {
            id: `${quizId}-q48`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The sweets",
                "/ were shared",
                "/ between the four girls. /",
                "No error"
            ],
            correctAnswer: 3,
            explanation: "Between is used when only two persons are involved whereas ‘among’ is used for more than two persons but here we have the exact number of girls so ‘between’ is correct."
        },
        {
            id: `${quizId}-q49`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "They are a politically important family;",
                "/ one of his sisters is a minister",
                "/ and the other is married with a minister",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Change ‘with’ into ‘to’. ‘Married’ is followed by preposition ‘to’ in Passive Voice."
        },
        {
            id: `${quizId}-q50`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The members of the Opposition Party in the Parliament",
                "/ shout upon the minister",
                "/ if he makes a wrong statement",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘upon’ with ‘at’ because ‘shout’ is followed by Preposition ‘at’."
        }
    ];

    window.GJU_QUIZ_BANK.push({
        id: quizId,
        title: "English Detecting Errors Practice Set 7",
        subject: "English",
        difficulty: "Hard",
        questions
    });
})();