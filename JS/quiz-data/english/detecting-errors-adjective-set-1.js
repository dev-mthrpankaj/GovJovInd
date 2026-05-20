const quizData = [
  {
    "question": "The manager was more wiser than the other members of the committee.",
    "options": [
      "The manager was",
      "more wiser than",
      "the other members",
      "of the committee"
    ],
    "answer": "more wiser than",
    "explanation": "‘Wiser’ is already the comparative form of ‘wise’. Using ‘more’ before a comparative adjective creates a double comparative error. The correct phrase is ‘wiser than’. Correct sentence: The manager was wiser than the other members of the committee.",
    "topic": "Adjective - Double Comparative"
  },
  {
    "question": "This is the most perfect solution to the problem we are facing.",
    "options": [
      "This is",
      "the most perfect solution",
      "to the problem",
      "we are facing"
    ],
    "answer": "the most perfect solution",
    "explanation": "‘Perfect’ is an absolute adjective. It already means complete or without fault, so it is normally not used with ‘most’. The correct expression is ‘a perfect solution’ or ‘the perfect solution’, depending on context.",
    "topic": "Adjective - Absolute Adjective"
  },
  {
    "question": "He bought a red beautiful car from the showroom yesterday.",
    "options": [
      "He bought",
      "a red beautiful car",
      "from the showroom",
      "yesterday"
    ],
    "answer": "a red beautiful car",
    "explanation": "When opinion and colour adjectives come together, opinion usually comes before colour. ‘Beautiful’ is an opinion adjective and ‘red’ is a colour adjective. Correct phrase: ‘a beautiful red car’.",
    "topic": "Adjective - Order of Adjectives"
  },
  {
    "question": "There are much students waiting outside the examination hall.",
    "options": [
      "There are",
      "much students",
      "waiting outside",
      "the examination hall"
    ],
    "answer": "much students",
    "explanation": "‘Students’ is a plural countable noun, so ‘many’ should be used instead of ‘much’. ‘Much’ is used with uncountable nouns. Correct phrase: ‘many students’.",
    "topic": "Adjective - Much/Many"
  },
  {
    "question": "Only few candidates understood the hidden meaning of the passage.",
    "options": [
      "Only few candidates",
      "understood",
      "the hidden meaning",
      "of the passage"
    ],
    "answer": "Only few candidates",
    "explanation": "‘Few’ has a negative meaning, suggesting almost none. When the intended meaning is ‘some but not many’, ‘a few’ is required. Correct phrase: ‘Only a few candidates’.",
    "topic": "Adjective - Few/A Few"
  },
  {
    "question": "The two first chapters of this book are very useful for beginners.",
    "options": [
      "The two first chapters",
      "of this book",
      "are very useful",
      "for beginners"
    ],
    "answer": "The two first chapters",
    "explanation": "When an ordinal number and a cardinal number are used together, the ordinal comes first. Correct order: ‘the first two chapters’, not ‘the two first chapters’.",
    "topic": "Adjective - Numeral Order"
  },
  {
    "question": "She gave me an useful suggestion during the interview preparation.",
    "options": [
      "She gave me",
      "an useful suggestion",
      "during the interview",
      "preparation"
    ],
    "answer": "an useful suggestion",
    "explanation": "The article is chosen by sound, not by spelling. ‘Useful’ begins with a consonant sound /juː/, so ‘a’ is used. Correct phrase: ‘a useful suggestion’.",
    "topic": "Article + Adjective Sound"
  },
  {
    "question": "The old man has little friends in the city, so he often feels lonely.",
    "options": [
      "The old man has",
      "little friends",
      "in the city",
      "so he often feels lonely"
    ],
    "answer": "little friends",
    "explanation": "‘Friends’ is a plural countable noun. ‘Little’ is used with uncountable nouns. For countable nouns, use ‘few’ or ‘a few’. Correct phrase: ‘few friends’.",
    "topic": "Adjective - Little/Few"
  },
  {
    "question": "Ramesh is elder than all the boys in his class.",
    "options": [
      "Ramesh is",
      "elder than",
      "all the boys",
      "in his class"
    ],
    "answer": "elder than",
    "explanation": "‘Elder’ is generally used before a noun for family relations, such as ‘elder brother’. In comparisons with ‘than’, ‘older’ is preferred. Correct phrase: ‘older than’.",
    "topic": "Adjective - Elder/Older"
  },
  {
    "question": "This road is more narrow than the one near the railway station.",
    "options": [
      "This road is",
      "more narrow than",
      "the one near",
      "the railway station"
    ],
    "answer": "more narrow than",
    "explanation": "For many short adjectives, the comparative form is made by adding ‘-er’. ‘Narrower’ is preferred in standard exam grammar. Correct phrase: ‘narrower than’.",
    "topic": "Adjective - Comparative Degree"
  },
  {
    "question": "The teacher explained the later chapter before discussing the earlier one.",
    "options": [
      "The teacher explained",
      "the later chapter",
      "before discussing",
      "the earlier one"
    ],
    "answer": "the later chapter",
    "explanation": "When referring to order in a sequence of two items, ‘latter’ means the second of two, while ‘later’ refers to time. Correct phrase: ‘the latter chapter’ if two chapters have already been mentioned.",
    "topic": "Adjective - Later/Latter"
  },
  {
    "question": "The patient needs farther treatment before he can be discharged.",
    "options": [
      "The patient needs",
      "farther treatment",
      "before he can",
      "be discharged"
    ],
    "answer": "farther treatment",
    "explanation": "‘Farther’ refers mainly to physical distance. ‘Further’ means additional or more. Since the sentence means additional treatment, the correct phrase is ‘further treatment’.",
    "topic": "Adjective - Farther/Further"
  },
  {
    "question": "The principal reason of his failure was his careless attitude.",
    "options": [
      "The principal reason",
      "of his failure",
      "was his",
      "careless attitude"
    ],
    "answer": "of his failure",
    "explanation": "The correct preposition after ‘reason’ is usually ‘for’, not ‘of’, when giving the cause. Correct phrase: ‘The principal reason for his failure’.",
    "topic": "Adjective + Preposition"
  },
  {
    "question": "He is junior than me in the office but more experienced.",
    "options": [
      "He is",
      "junior than me",
      "in the office",
      "but more experienced"
    ],
    "answer": "junior than me",
    "explanation": "Adjectives ending in ‘-ior’ such as junior, senior, superior, inferior and prior take ‘to’, not ‘than’. Correct phrase: ‘junior to me’.",
    "topic": "Adjective - Latin Comparatives"
  },
  {
    "question": "The new policy is superior than the previous one in every respect.",
    "options": [
      "The new policy is",
      "superior than",
      "the previous one",
      "in every respect"
    ],
    "answer": "superior than",
    "explanation": "‘Superior’ is followed by ‘to’, not ‘than’. It is already comparative in meaning. Correct phrase: ‘superior to the previous one’.",
    "topic": "Adjective - Superior To"
  },
  {
    "question": "The committee selected the most able of the two applicants.",
    "options": [
      "The committee selected",
      "the most able",
      "of the two",
      "applicants"
    ],
    "answer": "the most able",
    "explanation": "When comparison is between two persons or things, the comparative degree is used, not the superlative degree. Correct phrase: ‘the abler of the two applicants’.",
    "topic": "Adjective - Two vs More Than Two"
  },
  {
    "question": "Of all the players, Mohit is the better batsman in the team.",
    "options": [
      "Of all the players",
      "Mohit is",
      "the better batsman",
      "in the team"
    ],
    "answer": "the better batsman",
    "explanation": "When one person is compared with more than two, the superlative degree is required. Correct phrase: ‘the best batsman’. ‘Better’ is used for comparison between two.",
    "topic": "Adjective - Comparative/Superlative"
  },
  {
    "question": "Every students must carry his admit card to the examination centre.",
    "options": [
      "Every students",
      "must carry",
      "his admit card",
      "to the examination centre"
    ],
    "answer": "Every students",
    "explanation": "‘Every’ is followed by a singular countable noun. Correct phrase: ‘Every student’. The verb/pronoun should also agree with the singular idea.",
    "topic": "Adjective - Distributive Adjective"
  },
  {
    "question": "Each of the boys have submitted their project file.",
    "options": [
      "Each of",
      "the boys have",
      "submitted their",
      "project file"
    ],
    "answer": "the boys have",
    "explanation": "‘Each of’ takes a plural noun after ‘of’, but the verb agrees with ‘each’, which is singular. Correct phrase: ‘Each of the boys has submitted’.",
    "topic": "Adjective/Pronoun - Each"
  },
  {
    "question": "Neither of the two answers are correct according to the official key.",
    "options": [
      "Neither of",
      "the two answers",
      "are correct",
      "according to the official key"
    ],
    "answer": "are correct",
    "explanation": "‘Neither of the two’ is singular in formal grammar, so it takes a singular verb. Correct phrase: ‘Neither of the two answers is correct’.",
    "topic": "Distributive Adjective - Neither"
  },
  {
    "question": "The both candidates were called for document verification.",
    "options": [
      "The both candidates",
      "were called",
      "for document",
      "verification"
    ],
    "answer": "The both candidates",
    "explanation": "‘Both’ itself works as a determiner and should come before ‘the’ only in the structure ‘both the candidates’. Correct phrase: ‘Both the candidates’.",
    "topic": "Adjective - Determiner Order"
  },
  {
    "question": "All the four answers given by him was incorrect.",
    "options": [
      "All the four answers",
      "given by him",
      "was incorrect",
      "No error"
    ],
    "answer": "was incorrect",
    "explanation": "The subject ‘answers’ is plural, so the verb must be plural. Correct phrase: ‘were incorrect’. The determiner phrase ‘All the four answers’ is acceptable in exam grammar.",
    "topic": "Subject-Verb Agreement with Adjective"
  },
  {
    "question": "He has enough money to buy the laptop but he is not enough confident.",
    "options": [
      "He has enough money",
      "to buy the laptop",
      "but he is not",
      "enough confident"
    ],
    "answer": "enough confident",
    "explanation": "With adjectives, ‘enough’ comes after the adjective. Correct phrase: ‘confident enough’. With nouns, ‘enough’ comes before the noun, as in ‘enough money’.",
    "topic": "Adjective - Enough Position"
  },
  {
    "question": "The hall was too spacious to accommodate all the guests comfortably.",
    "options": [
      "The hall was",
      "too spacious",
      "to accommodate",
      "all the guests comfortably"
    ],
    "answer": "too spacious",
    "explanation": "‘Too’ gives a negative sense meaning ‘more than required’. The sentence intends a positive meaning: the hall had sufficient space. Correct phrase: ‘spacious enough to accommodate’.",
    "topic": "Adjective - Too/Enough"
  },
  {
    "question": "The news was much surprising for everyone present in the meeting.",
    "options": [
      "The news was",
      "much surprising",
      "for everyone",
      "present in the meeting"
    ],
    "answer": "much surprising",
    "explanation": "Before many adjectives, ‘very’ is used, not ‘much’. ‘Much’ is generally used before comparative adjectives or past participles. Correct phrase: ‘very surprising’.",
    "topic": "Adjective - Very/Much"
  },
  {
    "question": "This is a worth remembering advice for every serious aspirant.",
    "options": [
      "This is",
      "a worth remembering advice",
      "for every serious",
      "aspirant"
    ],
    "answer": "a worth remembering advice",
    "explanation": "‘Worth’ is a postpositive adjective, so it normally comes after the noun it qualifies. Also, ‘advice’ is uncountable and should not take ‘a’. Correct phrase: ‘advice worth remembering’.",
    "topic": "Adjective - Worth + Noun"
  },
  {
    "question": "His economical condition improved after he changed his job.",
    "options": [
      "His economical condition",
      "improved after",
      "he changed",
      "his job"
    ],
    "answer": "His economical condition",
    "explanation": "‘Economic’ relates to money, economy, or finance. ‘Economical’ means saving money or avoiding waste. Correct phrase: ‘His economic condition’.",
    "topic": "Adjective - Economic/Economical"
  },
  {
    "question": "The child gave a sensible answer to a very sensitive question.",
    "options": [
      "The child gave",
      "a sensible answer",
      "to a very sensitive question",
      "No error"
    ],
    "answer": "No error",
    "explanation": "The sentence is correct. ‘Sensible’ means wise or reasonable, and ‘sensitive’ means delicate or likely to cause strong feelings. Both adjectives are used correctly.",
    "topic": "Adjective - Sensible/Sensitive"
  },
  {
    "question": "He is an industrial man who never wastes even a single minute.",
    "options": [
      "He is",
      "an industrial man",
      "who never wastes",
      "even a single minute"
    ],
    "answer": "an industrial man",
    "explanation": "‘Industrial’ relates to industries or manufacturing. The adjective needed for a hardworking person is ‘industrious’. Correct phrase: ‘an industrious man’.",
    "topic": "Adjective - Industrial/Industrious"
  },
  {
    "question": "The village is famous for its historical monuments and natural beauty.",
    "options": [
      "The village is",
      "famous for",
      "its historical monuments",
      "and natural beauty"
    ],
    "answer": "No error",
    "explanation": "The sentence is correct. ‘Historical’ means related to history or important in history. It correctly qualifies ‘monuments’. No grammatical correction is required.",
    "topic": "Adjective - No Error"
  },
  {
    "question": "The lonely survivor of the accident was taken to the hospital immediately.",
    "options": [
      "The lonely survivor",
      "of the accident",
      "was taken",
      "to the hospital immediately"
    ],
    "answer": "The lonely survivor",
    "explanation": "‘Lonely’ means feeling sad because of being alone. The intended meaning is that only one survivor remained. Correct phrase: ‘The lone survivor’.",
    "topic": "Adjective - Lone/Lonely"
  },
  {
    "question": "This cloth is preferable than the one you bought last week.",
    "options": [
      "This cloth is",
      "preferable than",
      "the one you bought",
      "last week"
    ],
    "answer": "preferable than",
    "explanation": "‘Preferable’ is followed by ‘to’, not ‘than’. Correct phrase: ‘preferable to the one’. Many adjectives ending in ‘-able’ have fixed preposition patterns.",
    "topic": "Adjective - Preferable To"
  },
  {
    "question": "She is the eldest of the two sisters in the family.",
    "options": [
      "She is",
      "the eldest",
      "of the two sisters",
      "in the family"
    ],
    "answer": "the eldest",
    "explanation": "For comparison between two, use the comparative degree. ‘Elder’ is used for two in family relation. Correct phrase: ‘the elder of the two sisters’.",
    "topic": "Adjective - Elder/Eldest"
  },
  {
    "question": "He gave me many information about the upcoming vacancy.",
    "options": [
      "He gave me",
      "many information",
      "about the upcoming",
      "vacancy"
    ],
    "answer": "many information",
    "explanation": "‘Information’ is uncountable, so it cannot be used with ‘many’. Use ‘much information’ or ‘a lot of information’. In most natural contexts, ‘a lot of information’ is best.",
    "topic": "Adjective - Countable/Uncountable"
  },
  {
    "question": "The police found several evidences against the accused person.",
    "options": [
      "The police found",
      "several evidences",
      "against the accused",
      "person"
    ],
    "answer": "several evidences",
    "explanation": "‘Evidence’ is generally uncountable in standard English, so it does not take plural ‘s’ in this sense. Correct phrase: ‘several pieces of evidence’ or ‘much evidence’.",
    "topic": "Noun + Quantifier"
  },
  {
    "question": "My brother is senior to me by three years.",
    "options": [
      "My brother is",
      "senior to me",
      "by three years",
      "No error"
    ],
    "answer": "No error",
    "explanation": "The sentence is correct. ‘Senior’ is followed by ‘to’, not ‘than’. The phrase ‘by three years’ correctly shows the difference in age or seniority.",
    "topic": "Adjective - No Error"
  },
  {
    "question": "There is less books in the library this year than last year.",
    "options": [
      "There is",
      "less books",
      "in the library",
      "this year than last year"
    ],
    "answer": "less books",
    "explanation": "‘Books’ is a plural countable noun. Use ‘fewer’ with plural countable nouns and ‘less’ with uncountable nouns. Correct phrase: ‘fewer books’.",
    "topic": "Adjective - Less/Fewer"
  },
  {
    "question": "The accused gave a false statement to the investigating officer.",
    "options": [
      "The accused gave",
      "a false statement",
      "to the investigating officer",
      "No error"
    ],
    "answer": "No error",
    "explanation": "The sentence is correct. ‘False’ correctly qualifies ‘statement’. ‘Investigating officer’ is also a correct compound expression where ‘investigating’ describes the officer’s role.",
    "topic": "Adjective - No Error"
  },
  {
    "question": "He is capable to solve this difficult question within a minute.",
    "options": [
      "He is",
      "capable to solve",
      "this difficult question",
      "within a minute"
    ],
    "answer": "capable to solve",
    "explanation": "‘Capable’ is followed by ‘of + V-ing’, not by ‘to + V1’. Correct phrase: ‘capable of solving this difficult question’.",
    "topic": "Adjective + Preposition"
  },
  {
    "question": "The house is enough large for a family of six members.",
    "options": [
      "The house is",
      "enough large",
      "for a family",
      "of six members"
    ],
    "answer": "enough large",
    "explanation": "With adjectives, ‘enough’ comes after the adjective. Correct phrase: ‘large enough’. Correct sentence: The house is large enough for a family of six members.",
    "topic": "Adjective - Enough Position"
  },
  {
    "question": "The poor deserves respect and equal opportunity in society.",
    "options": [
      "The poor",
      "deserves respect",
      "and equal opportunity",
      "in society"
    ],
    "answer": "deserves respect",
    "explanation": "‘The + adjective’ can represent a whole class of people and is treated as plural. ‘The poor’ means poor people, so the verb should be plural. Correct phrase: ‘The poor deserve’.",
    "topic": "Adjective Used as Noun"
  },
  {
    "question": "The richer should help the weaker in a civilized society.",
    "options": [
      "The richer",
      "should help",
      "the weaker",
      "in a civilized society"
    ],
    "answer": "The richer",
    "explanation": "When an adjective represents a class, use the positive form with ‘the’, such as ‘the rich’ and ‘the weak’. Correct sentence: The rich should help the weak in a civilized society.",
    "topic": "Adjective Used as Class Noun"
  },
  {
    "question": "The interview board asked him a few personal questions.",
    "options": [
      "The interview board",
      "asked him",
      "a few personal questions",
      "No error"
    ],
    "answer": "No error",
    "explanation": "The sentence is correct. ‘A few’ is correctly used with plural countable noun ‘questions’, and ‘personal’ correctly qualifies ‘questions’.",
    "topic": "Adjective - No Error"
  },
  {
    "question": "I have not seen such a amazing performance in recent years.",
    "options": [
      "I have not seen",
      "such a amazing performance",
      "in recent years",
      "No error"
    ],
    "answer": "such a amazing performance",
    "explanation": "‘Amazing’ begins with a vowel sound, so ‘an’ is required. Correct phrase: ‘such an amazing performance’. The structure is ‘such + a/an + adjective + singular noun’.",
    "topic": "Article + Adjective"
  },
  {
    "question": "He is one of the most honest officer in the department.",
    "options": [
      "He is one of",
      "the most honest officer",
      "in the department",
      "No error"
    ],
    "answer": "the most honest officer",
    "explanation": "The structure ‘one of the + superlative adjective’ is followed by a plural countable noun. Correct phrase: ‘one of the most honest officers’.",
    "topic": "Adjective - Superlative + Plural Noun"
  },
  {
    "question": "She is enough intelligent to understand the seriousness of the matter.",
    "options": [
      "She is",
      "enough intelligent",
      "to understand",
      "the seriousness of the matter"
    ],
    "answer": "enough intelligent",
    "explanation": "‘Enough’ comes after adjectives. Correct phrase: ‘intelligent enough’. Correct sentence: She is intelligent enough to understand the seriousness of the matter.",
    "topic": "Adjective - Enough Position"
  },
  {
    "question": "The climate of Shimla is cooler than Delhi.",
    "options": [
      "The climate of Shimla",
      "is cooler",
      "than Delhi",
      "No error"
    ],
    "answer": "than Delhi",
    "explanation": "Comparison must be between similar things. ‘Climate’ should be compared with ‘climate’, not with a city. Correct phrase: ‘than that of Delhi’.",
    "topic": "Adjective - Logical Comparison"
  },
  {
    "question": "The population of India is larger than any country in Europe.",
    "options": [
      "The population of India",
      "is larger",
      "than any country",
      "in Europe"
    ],
    "answer": "than any country",
    "explanation": "Population should be compared with population, not with a country. Correct phrase: ‘than that of any country in Europe’. Logical comparison is essential in error detection.",
    "topic": "Adjective - Logical Comparison"
  },
  {
    "question": "This is the same book that I borrowed from the library last month.",
    "options": [
      "This is",
      "the same book",
      "that I borrowed",
      "from the library last month"
    ],
    "answer": "No error",
    "explanation": "The sentence is correct. ‘Same’ is properly preceded by ‘the’, and the relative pronoun ‘that’ correctly connects the clause with ‘book’.",
    "topic": "Adjective - No Error"
  },
  {
    "question": "No other poet of India was so great as Kalidas.",
    "options": [
      "No other poet",
      "of India",
      "was so great as",
      "Kalidas"
    ],
    "answer": "No error",
    "explanation": "The sentence is grammatically correct. The structure ‘No other + singular noun + so/as + positive adjective + as’ is a valid positive-degree comparison.",
    "topic": "Adjective - Degree Transformation"
  }
];

export default quizData;
