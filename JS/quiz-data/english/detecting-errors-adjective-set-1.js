(function () {
    "use strict";

    window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];

    const quizId = "detecting-errors-adjective-set-1";

    const questions = [
            {
                    "id": "detecting-errors-adjective-set-1-q01",
                    "topic": "Adjective - Double Comparative",
                    "difficulty": "hard",
                    "question": "The manager was more wiser than the other members of the committee.",
                    "options": [
                            "The manager was",
                            "more wiser than",
                            "the other members",
                            "of the committee"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Wiser’ is already the comparative form of ‘wise’. Using ‘more’ before a comparative adjective creates a double comparative error. The correct phrase is ‘wiser than’. Correct sentence: The manager was wiser than the other members of the committee."
            },
            {
                    "id": "detecting-errors-adjective-set-1-q02",
                    "topic": "Adjective - Absolute Adjective",
                    "difficulty": "hard",
                    "question": "This is the most perfect solution to the problem we are facing.",
                    "options": [
                            "This is",
                            "the most perfect solution",
                            "to the problem",
                            "we are facing"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Perfect’ is an absolute adjective. It already means complete or without fault, so it is normally not used with ‘most’. The correct expression is ‘a perfect solution’ or ‘the perfect solution’, depending on context."
            },
            {
                    "id": "detecting-errors-adjective-set-1-q03",
                    "topic": "Adjective - Order of Adjectives",
                    "difficulty": "hard",
                    "question": "He bought a red beautiful car from the showroom yesterday.",
                    "options": [
                            "He bought",
                            "a red beautiful car",
                            "from the showroom",
                            "yesterday"
                    ],
                    "correctAnswer": 1,
                    "explanation": "When opinion and colour adjectives come together, opinion usually comes before colour. ‘Beautiful’ is an opinion adjective and ‘red’ is a colour adjective. Correct phrase: ‘a beautiful red car’."
            },
            {
                    "id": "detecting-errors-adjective-set-1-q04",
                    "topic": "Adjective - Much/Many",
                    "difficulty": "hard",
                    "question": "There are much students waiting outside the examination hall.",
                    "options": [
                            "There are",
                            "much students",
                            "waiting outside",
                            "the examination hall"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Students’ is a plural countable noun, so ‘many’ should be used instead of ‘much’. ‘Much’ is used with uncountable nouns. Correct phrase: ‘many students’."
            },
            {
                    "id": "detecting-errors-adjective-set-1-q05",
                    "topic": "Adjective - Few/A Few",
                    "difficulty": "hard",
                    "question": "Only few candidates understood the hidden meaning of the passage.",
                    "options": [
                            "Only few candidates",
                            "understood",
                            "the hidden meaning",
                            "of the passage"
                    ],
                    "correctAnswer": 0,
                    "explanation": "‘Few’ has a negative meaning, suggesting almost none. When the intended meaning is ‘some but not many’, ‘a few’ is required. Correct phrase: ‘Only a few candidates’."
            },
            {
                    "id": "detecting-errors-adjective-set-1-q06",
                    "topic": "Adjective - Numeral Order",
                    "difficulty": "hard",
                    "question": "The two first chapters of this book are very useful for beginners.",
                    "options": [
                            "The two first chapters",
                            "of this book",
                            "are very useful",
                            "for beginners"
                    ],
                    "correctAnswer": 0,
                    "explanation": "When an ordinal number and a cardinal number are used together, the ordinal comes first. Correct order: ‘the first two chapters’, not ‘the two first chapters’."
            },
            {
                    "id": "detecting-errors-adjective-set-1-q07",
                    "topic": "Article + Adjective Sound",
                    "difficulty": "hard",
                    "question": "She gave me an useful suggestion during the interview preparation.",
                    "options": [
                            "She gave me",
                            "an useful suggestion",
                            "during the interview",
                            "preparation"
                    ],
                    "correctAnswer": 1,
                    "explanation": "The article is chosen by sound, not by spelling. ‘Useful’ begins with a consonant sound /juː/, so ‘a’ is used. Correct phrase: ‘a useful suggestion’."
            },
            {
                    "id": "detecting-errors-adjective-set-1-q08",
                    "topic": "Adjective - Little/Few",
                    "difficulty": "hard",
                    "question": "The old man has little friends in the city, so he often feels lonely.",
                    "options": [
                            "The old man has",
                            "little friends",
                            "in the city",
                            "so he often feels lonely"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Friends’ is a plural countable noun. ‘Little’ is used with uncountable nouns. For countable nouns, use ‘few’ or ‘a few’. Correct phrase: ‘few friends’."
            },
            {
                    "id": "detecting-errors-adjective-set-1-q09",
                    "topic": "Adjective - Elder/Older",
                    "difficulty": "hard",
                    "question": "Ramesh is elder than all the boys in his class.",
                    "options": [
                            "Ramesh is",
                            "elder than",
                            "all the boys",
                            "in his class"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Elder’ is generally used before a noun for family relations, such as ‘elder brother’. In comparisons with ‘than’, ‘older’ is preferred. Correct phrase: ‘older than’."
            },
            {
                    "id": "detecting-errors-adjective-set-1-q10",
                    "topic": "Adjective - Comparative Degree",
                    "difficulty": "hard",
                    "question": "This road is more narrow than the one near the railway station.",
                    "options": [
                            "This road is",
                            "more narrow than",
                            "the one near",
                            "the railway station"
                    ],
                    "correctAnswer": 1,
                    "explanation": "For many short adjectives, the comparative form is made by adding ‘-er’. ‘Narrower’ is preferred in standard exam grammar. Correct phrase: ‘narrower than’."
            },
            {
                    "id": "detecting-errors-adjective-set-1-q11",
                    "topic": "Adjective - Later/Latter",
                    "difficulty": "hard",
                    "question": "The teacher explained the later chapter before discussing the earlier one.",
                    "options": [
                            "The teacher explained",
                            "the later chapter",
                            "before discussing",
                            "the earlier one"
                    ],
                    "correctAnswer": 1,
                    "explanation": "When referring to order in a sequence of two items, ‘latter’ means the second of two, while ‘later’ refers to time. Correct phrase: ‘the latter chapter’ if two chapters have already been mentioned."
            },
            {
                    "id": "detecting-errors-adjective-set-1-q12",
                    "topic": "Adjective - Farther/Further",
                    "difficulty": "hard",
                    "question": "The patient needs farther treatment before he can be discharged.",
                    "options": [
                            "The patient needs",
                            "farther treatment",
                            "before he can",
                            "be discharged"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Farther’ refers mainly to physical distance. ‘Further’ means additional or more. Since the sentence means additional treatment, the correct phrase is ‘further treatment’."
            },
            {
                    "id": "detecting-errors-adjective-set-1-q13",
                    "topic": "Adjective + Preposition",
                    "difficulty": "hard",
                    "question": "The principal reason of his failure was his careless attitude.",
                    "options": [
                            "The principal reason",
                            "of his failure",
                            "was his",
                            "careless attitude"
                    ],
                    "correctAnswer": 1,
                    "explanation": "The correct preposition after ‘reason’ is usually ‘for’, not ‘of’, when giving the cause. Correct phrase: ‘The principal reason for his failure’."
            },
            {
                    "id": "detecting-errors-adjective-set-1-q14",
                    "topic": "Adjective - Latin Comparatives",
                    "difficulty": "hard",
                    "question": "He is junior than me in the office but more experienced.",
                    "options": [
                            "He is",
                            "junior than me",
                            "in the office",
                            "but more experienced"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Adjectives ending in ‘-ior’ such as junior, senior, superior, inferior and prior take ‘to’, not ‘than’. Correct phrase: ‘junior to me’."
            },
            {
                    "id": "detecting-errors-adjective-set-1-q15",
                    "topic": "Adjective - Superior To",
                    "difficulty": "hard",
                    "question": "The new policy is superior than the previous one in every respect.",
                    "options": [
                            "The new policy is",
                            "superior than",
                            "the previous one",
                            "in every respect"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Superior’ is followed by ‘to’, not ‘than’. It is already comparative in meaning. Correct phrase: ‘superior to the previous one’."
            },
            {
                    "id": "detecting-errors-adjective-set-1-q16",
                    "topic": "Adjective - Two vs More Than Two",
                    "difficulty": "hard",
                    "question": "The committee selected the most able of the two applicants.",
                    "options": [
                            "The committee selected",
                            "the most able",
                            "of the two",
                            "applicants"
                    ],
                    "correctAnswer": 1,
                    "explanation": "When comparison is between two persons or things, the comparative degree is used, not the superlative degree. Correct phrase: ‘the abler of the two applicants’."
            },
            {
                    "id": "detecting-errors-adjective-set-1-q17",
                    "topic": "Adjective - Comparative/Superlative",
                    "difficulty": "hard",
                    "question": "Of all the players, Mohit is the better batsman in the team.",
                    "options": [
                            "Of all the players",
                            "Mohit is",
                            "the better batsman",
                            "in the team"
                    ],
                    "correctAnswer": 2,
                    "explanation": "When one person is compared with more than two, the superlative degree is required. Correct phrase: ‘the best batsman’. ‘Better’ is used for comparison between two."
            },
            {
                    "id": "detecting-errors-adjective-set-1-q18",
                    "topic": "Adjective - Distributive Adjective",
                    "difficulty": "hard",
                    "question": "Every students must carry his admit card to the examination centre.",
                    "options": [
                            "Every students",
                            "must carry",
                            "his admit card",
                            "to the examination centre"
                    ],
                    "correctAnswer": 0,
                    "explanation": "‘Every’ is followed by a singular countable noun. Correct phrase: ‘Every student’. The verb/pronoun should also agree with the singular idea."
            },
            {
                    "id": "detecting-errors-adjective-set-1-q19",
                    "topic": "Adjective/Pronoun - Each",
                    "difficulty": "hard",
                    "question": "Each of the boys have submitted their project file.",
                    "options": [
                            "Each of",
                            "the boys have",
                            "submitted their",
                            "project file"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Each of’ takes a plural noun after ‘of’, but the verb agrees with ‘each’, which is singular. Correct phrase: ‘Each of the boys has submitted’."
            },
            {
                    "id": "detecting-errors-adjective-set-1-q20",
                    "topic": "Distributive Adjective - Neither",
                    "difficulty": "hard",
                    "question": "Neither of the two answers are correct according to the official key.",
                    "options": [
                            "Neither of",
                            "the two answers",
                            "are correct",
                            "according to the official key"
                    ],
                    "correctAnswer": 2,
                    "explanation": "‘Neither of the two’ is singular in formal grammar, so it takes a singular verb. Correct phrase: ‘Neither of the two answers is correct’."
            },
            {
                    "id": "detecting-errors-adjective-set-1-q21",
                    "topic": "Adjective - Determiner Order",
                    "difficulty": "hard",
                    "question": "The both candidates were called for document verification.",
                    "options": [
                            "The both candidates",
                            "were called",
                            "for document",
                            "verification"
                    ],
                    "correctAnswer": 0,
                    "explanation": "‘Both’ itself works as a determiner and should come before ‘the’ only in the structure ‘both the candidates’. Correct phrase: ‘Both the candidates’."
            },
            {
                    "id": "detecting-errors-adjective-set-1-q22",
                    "topic": "Subject-Verb Agreement with Adjective",
                    "difficulty": "hard",
                    "question": "All the four answers given by him was incorrect.",
                    "options": [
                            "All the four answers",
                            "given by him",
                            "was incorrect",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "The subject ‘answers’ is plural, so the verb must be plural. Correct phrase: ‘were incorrect’. The determiner phrase ‘All the four answers’ is acceptable in exam grammar."
            },
            {
                    "id": "detecting-errors-adjective-set-1-q23",
                    "topic": "Adjective - Enough Position",
                    "difficulty": "hard",
                    "question": "He has enough money to buy the laptop but he is not enough confident.",
                    "options": [
                            "He has enough money",
                            "to buy the laptop",
                            "but he is not",
                            "enough confident"
                    ],
                    "correctAnswer": 3,
                    "explanation": "With adjectives, ‘enough’ comes after the adjective. Correct phrase: ‘confident enough’. With nouns, ‘enough’ comes before the noun, as in ‘enough money’."
            },
            {
                    "id": "detecting-errors-adjective-set-1-q24",
                    "topic": "Adjective - Too/Enough",
                    "difficulty": "hard",
                    "question": "The hall was too spacious to accommodate all the guests comfortably.",
                    "options": [
                            "The hall was",
                            "too spacious",
                            "to accommodate",
                            "all the guests comfortably"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Too’ gives a negative sense meaning ‘more than required’. The sentence intends a positive meaning: the hall had sufficient space. Correct phrase: ‘spacious enough to accommodate’."
            },
            {
                    "id": "detecting-errors-adjective-set-1-q25",
                    "topic": "Adjective - Very/Much",
                    "difficulty": "hard",
                    "question": "The news was much surprising for everyone present in the meeting.",
                    "options": [
                            "The news was",
                            "much surprising",
                            "for everyone",
                            "present in the meeting"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Before many adjectives, ‘very’ is used, not ‘much’. ‘Much’ is generally used before comparative adjectives or past participles. Correct phrase: ‘very surprising’."
            },
            {
                    "id": "detecting-errors-adjective-set-1-q26",
                    "topic": "Adjective - Worth + Noun",
                    "difficulty": "hard",
                    "question": "This is a worth remembering advice for every serious aspirant.",
                    "options": [
                            "This is",
                            "a worth remembering advice",
                            "for every serious",
                            "aspirant"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Worth’ is a postpositive adjective, so it normally comes after the noun it qualifies. Also, ‘advice’ is uncountable and should not take ‘a’. Correct phrase: ‘advice worth remembering’."
            },
            {
                    "id": "detecting-errors-adjective-set-1-q27",
                    "topic": "Adjective - Economic/Economical",
                    "difficulty": "hard",
                    "question": "His economical condition improved after he changed his job.",
                    "options": [
                            "His economical condition",
                            "improved after",
                            "he changed",
                            "his job"
                    ],
                    "correctAnswer": 0,
                    "explanation": "‘Economic’ relates to money, economy, or finance. ‘Economical’ means saving money or avoiding waste. Correct phrase: ‘His economic condition’."
            },
            {
                    "id": "detecting-errors-adjective-set-1-q28",
                    "topic": "Adjective - Sensible/Sensitive",
                    "difficulty": "hard",
                    "question": "The child gave a sensible answer to a very sensitive question.",
                    "options": [
                            "The child gave",
                            "a sensible answer",
                            "to a very sensitive question",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Sensible’ means wise or reasonable, and ‘sensitive’ means delicate or likely to cause strong feelings. Both adjectives are used correctly."
            },
            {
                    "id": "detecting-errors-adjective-set-1-q29",
                    "topic": "Adjective - Industrial/Industrious",
                    "difficulty": "hard",
                    "question": "He is an industrial man who never wastes even a single minute.",
                    "options": [
                            "He is",
                            "an industrial man",
                            "who never wastes",
                            "even a single minute"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Industrial’ relates to industries or manufacturing. The adjective needed for a hardworking person is ‘industrious’. Correct phrase: ‘an industrious man’."
            },
            {
                    "id": "detecting-errors-adjective-set-1-q30",
                    "topic": "Adjective - No Error",
                    "difficulty": "hard",
                    "question": "The village is famous for its historical monuments and natural beauty.",
                    "options": [
                            "The village is",
                            "famous for",
                            "its historical monuments",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Historical’ means related to history or important in history. It correctly qualifies ‘monuments’. No grammatical correction is required."
            },
            {
                    "id": "detecting-errors-adjective-set-1-q31",
                    "topic": "Adjective - Lone/Lonely",
                    "difficulty": "hard",
                    "question": "The lonely survivor of the accident was taken to the hospital immediately.",
                    "options": [
                            "The lonely survivor",
                            "of the accident",
                            "was taken",
                            "to the hospital immediately"
                    ],
                    "correctAnswer": 0,
                    "explanation": "‘Lonely’ means feeling sad because of being alone. The intended meaning is that only one survivor remained. Correct phrase: ‘The lone survivor’."
            },
            {
                    "id": "detecting-errors-adjective-set-1-q32",
                    "topic": "Adjective - Preferable To",
                    "difficulty": "hard",
                    "question": "This cloth is preferable than the one you bought last week.",
                    "options": [
                            "This cloth is",
                            "preferable than",
                            "the one you bought",
                            "last week"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Preferable’ is followed by ‘to’, not ‘than’. Correct phrase: ‘preferable to the one’. Many adjectives ending in ‘-able’ have fixed preposition patterns."
            },
            {
                    "id": "detecting-errors-adjective-set-1-q33",
                    "topic": "Adjective - Elder/Eldest",
                    "difficulty": "hard",
                    "question": "She is the eldest of the two sisters in the family.",
                    "options": [
                            "She is",
                            "the eldest",
                            "of the two sisters",
                            "in the family"
                    ],
                    "correctAnswer": 1,
                    "explanation": "For comparison between two, use the comparative degree. ‘Elder’ is used for two in family relation. Correct phrase: ‘the elder of the two sisters’."
            },
            {
                    "id": "detecting-errors-adjective-set-1-q34",
                    "topic": "Adjective - Countable/Uncountable",
                    "difficulty": "hard",
                    "question": "He gave me many information about the upcoming vacancy.",
                    "options": [
                            "He gave me",
                            "many information",
                            "about the upcoming",
                            "vacancy"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Information’ is uncountable, so it cannot be used with ‘many’. Use ‘much information’ or ‘a lot of information’. In most natural contexts, ‘a lot of information’ is best."
            },
            {
                    "id": "detecting-errors-adjective-set-1-q35",
                    "topic": "Noun + Quantifier",
                    "difficulty": "hard",
                    "question": "The police found several evidences against the accused person.",
                    "options": [
                            "The police found",
                            "several evidences",
                            "against the accused",
                            "person"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Evidence’ is generally uncountable in standard English, so it does not take plural ‘s’ in this sense. Correct phrase: ‘several pieces of evidence’ or ‘much evidence’."
            },
            {
                    "id": "detecting-errors-adjective-set-1-q36",
                    "topic": "Adjective - No Error",
                    "difficulty": "hard",
                    "question": "My brother is senior to me by three years.",
                    "options": [
                            "My brother is",
                            "senior to me",
                            "by three years",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Senior’ is followed by ‘to’, not ‘than’. The phrase ‘by three years’ correctly shows the difference in age or seniority."
            },
            {
                    "id": "detecting-errors-adjective-set-1-q37",
                    "topic": "Adjective - Less/Fewer",
                    "difficulty": "hard",
                    "question": "There is less books in the library this year than last year.",
                    "options": [
                            "There is",
                            "less books",
                            "in the library",
                            "this year than last year"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Books’ is a plural countable noun. Use ‘fewer’ with plural countable nouns and ‘less’ with uncountable nouns. Correct phrase: ‘fewer books’."
            },
            {
                    "id": "detecting-errors-adjective-set-1-q38",
                    "topic": "Adjective - No Error",
                    "difficulty": "hard",
                    "question": "The accused gave a false statement to the investigating officer.",
                    "options": [
                            "The accused gave",
                            "a false statement",
                            "to the investigating officer",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘False’ correctly qualifies ‘statement’. ‘Investigating officer’ is also a correct compound expression where ‘investigating’ describes the officer’s role."
            },
            {
                    "id": "detecting-errors-adjective-set-1-q39",
                    "topic": "Adjective + Preposition",
                    "difficulty": "hard",
                    "question": "He is capable to solve this difficult question within a minute.",
                    "options": [
                            "He is",
                            "capable to solve",
                            "this difficult question",
                            "within a minute"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Capable’ is followed by ‘of + V-ing’, not by ‘to + V1’. Correct phrase: ‘capable of solving this difficult question’."
            },
            {
                    "id": "detecting-errors-adjective-set-1-q40",
                    "topic": "Adjective - Enough Position",
                    "difficulty": "hard",
                    "question": "The house is enough large for a family of six members.",
                    "options": [
                            "The house is",
                            "enough large",
                            "for a family",
                            "of six members"
                    ],
                    "correctAnswer": 1,
                    "explanation": "With adjectives, ‘enough’ comes after the adjective. Correct phrase: ‘large enough’. Correct sentence: The house is large enough for a family of six members."
            },
            {
                    "id": "detecting-errors-adjective-set-1-q41",
                    "topic": "Adjective Used as Noun",
                    "difficulty": "hard",
                    "question": "The poor deserves respect and equal opportunity in society.",
                    "options": [
                            "The poor",
                            "deserves respect",
                            "and equal opportunity",
                            "in society"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘The + adjective’ can represent a whole class of people and is treated as plural. ‘The poor’ means poor people, so the verb should be plural. Correct phrase: ‘The poor deserve’."
            },
            {
                    "id": "detecting-errors-adjective-set-1-q42",
                    "topic": "Adjective Used as Class Noun",
                    "difficulty": "hard",
                    "question": "The richer should help the weaker in a civilized society.",
                    "options": [
                            "The richer",
                            "should help",
                            "the weaker",
                            "in a civilized society"
                    ],
                    "correctAnswer": 0,
                    "explanation": "When an adjective represents a class, use the positive form with ‘the’, such as ‘the rich’ and ‘the weak’. Correct sentence: The rich should help the weak in a civilized society."
            },
            {
                    "id": "detecting-errors-adjective-set-1-q43",
                    "topic": "Adjective - No Error",
                    "difficulty": "hard",
                    "question": "The interview board asked him a few personal questions.",
                    "options": [
                            "The interview board",
                            "asked him",
                            "a few personal questions",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘A few’ is correctly used with plural countable noun ‘questions’, and ‘personal’ correctly qualifies ‘questions’."
            },
            {
                    "id": "detecting-errors-adjective-set-1-q44",
                    "topic": "Article + Adjective",
                    "difficulty": "hard",
                    "question": "I have not seen such a amazing performance in recent years.",
                    "options": [
                            "I have not seen",
                            "such a amazing performance",
                            "in recent years",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Amazing’ begins with a vowel sound, so ‘an’ is required. Correct phrase: ‘such an amazing performance’. The structure is ‘such + a/an + adjective + singular noun’."
            },
            {
                    "id": "detecting-errors-adjective-set-1-q45",
                    "topic": "Adjective - Superlative + Plural Noun",
                    "difficulty": "hard",
                    "question": "He is one of the most honest officer in the department.",
                    "options": [
                            "He is one of",
                            "the most honest officer",
                            "in the department",
                            "No error"
                    ],
                    "correctAnswer": 1,
                    "explanation": "The structure ‘one of the + superlative adjective’ is followed by a plural countable noun. Correct phrase: ‘one of the most honest officers’."
            },
            {
                    "id": "detecting-errors-adjective-set-1-q46",
                    "topic": "Adjective - Enough Position",
                    "difficulty": "hard",
                    "question": "She is enough intelligent to understand the seriousness of the matter.",
                    "options": [
                            "She is",
                            "enough intelligent",
                            "to understand",
                            "the seriousness of the matter"
                    ],
                    "correctAnswer": 1,
                    "explanation": "‘Enough’ comes after adjectives. Correct phrase: ‘intelligent enough’. Correct sentence: She is intelligent enough to understand the seriousness of the matter."
            },
            {
                    "id": "detecting-errors-adjective-set-1-q47",
                    "topic": "Adjective - Logical Comparison",
                    "difficulty": "hard",
                    "question": "The climate of Shimla is cooler than Delhi.",
                    "options": [
                            "The climate of Shimla",
                            "is cooler",
                            "than Delhi",
                            "No error"
                    ],
                    "correctAnswer": 2,
                    "explanation": "Comparison must be between similar things. ‘Climate’ should be compared with ‘climate’, not with a city. Correct phrase: ‘than that of Delhi’."
            },
            {
                    "id": "detecting-errors-adjective-set-1-q48",
                    "topic": "Adjective - Logical Comparison",
                    "difficulty": "hard",
                    "question": "The population of India is larger than any country in Europe.",
                    "options": [
                            "The population of India",
                            "is larger",
                            "than any country",
                            "in Europe"
                    ],
                    "correctAnswer": 2,
                    "explanation": "Population should be compared with population, not with a country. Correct phrase: ‘than that of any country in Europe’. Logical comparison is essential in error detection."
            },
            {
                    "id": "detecting-errors-adjective-set-1-q49",
                    "topic": "Adjective - No Error",
                    "difficulty": "hard",
                    "question": "This is the same book that I borrowed from the library last month.",
                    "options": [
                            "This is",
                            "the same book",
                            "that I borrowed",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is correct. ‘Same’ is properly preceded by ‘the’, and the relative pronoun ‘that’ correctly connects the clause with ‘book’."
            },
            {
                    "id": "detecting-errors-adjective-set-1-q50",
                    "topic": "Adjective - Degree Transformation",
                    "difficulty": "hard",
                    "question": "No other poet of India was so great as Kalidas.",
                    "options": [
                            "No other poet",
                            "of India",
                            "was so great as",
                            "No error"
                    ],
                    "correctAnswer": 3,
                    "explanation": "The sentence is grammatically correct. The structure ‘No other + singular noun + so/as + positive adjective + as’ is a valid positive-degree comparison."
            }
    ];

    window.GJU_QUIZ_BANK.push({
        id: quizId,
        subject: "English",
        title: "Detecting Errors - Adjective Set 1",
        description: "50 adjective-focused detecting error questions for SSC, Railway, Police and other government exams.",
        durationMinutes: 30,
        totalQuestions: questions.length,
        marksPerQuestion: 1,
        negativeMarks: 0.25,
        difficulty: "Hard",
        tags: ["SSC", "Railway", "Police", "English", "Detecting Errors", "Adjective"],
        questions
    });
}());
