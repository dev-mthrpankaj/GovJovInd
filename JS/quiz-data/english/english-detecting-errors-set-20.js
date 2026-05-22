(function () {
    "use strict";

    window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];

    const quizId = "english-detecting-errors-set-20";

    const questions = [
        {
            id: `${quizId}-q01`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Very few countries in the world is as big as India.",
            options: [
                "is",
                "Very few countries",
                "as big as",
                "in the world"
            ],
            correctAnswer: 0,
            explanation: "Use 'are' in place of 'is'. Countries will take plural verb."
        },
        {
            id: `${quizId}-q02`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "I have been living in Delhi since many years.",
            options: [
                "since",
                "have been living",
                "in Delhi",
                "many years"
            ],
            correctAnswer: 0,
            explanation: "Use 'for' in place of 'since'. for + period of time since + point of time"
        },
        {
            id: `${quizId}-q03`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Can anyone tell me what did we learn in Mathematics yesterday?",
            options: [
                "anyone",
                "Can",
                "did we learn",
                "in"
            ],
            correctAnswer: 2,
            explanation: "Replace 'did we learn' with 'we learnt'. After using interrogative form once we cannot use it again."
        },
        {
            id: `${quizId}-q04`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "My nephew has been in hospital since four weeks because of mumps.",
            options: [
                "because of",
                "in",
                "since",
                "has been"
            ],
            correctAnswer: 2,
            explanation: "Replace 'since' with 'for'."
        },
        {
            id: `${quizId}-q05`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "The Himalayas, the highest mountain range in the world, protects India from the cold winds blowing from central Asia.",
            options: [
                "the cold",
                "blowing from central Asia",
                "protects India",
                "highest mountain range"
            ],
            correctAnswer: 2,
            explanation: "Replace 'protects (singular)' with 'protect (plural)'. Subject (Himalayas) is plural."
        },
        {
            id: `${quizId}-q06`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "He didn't knew the answer to the question.",
            options: [
                "didn't knew",
                "to the question",
                "He",
                "the answer"
            ],
            correctAnswer: 0,
            explanation: "Replace 'knew' with 'know'. didn't takes V1."
        },
        {
            id: `${quizId}-q07`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "We often went for boating when we live in Nainital.",
            options: [
                "for boating",
                "we often",
                "when we",
                "live in Nainital"
            ],
            correctAnswer: 3,
            explanation: "Replace 'live' with 'lived or were'. Sentence is in past."
        },
        {
            id: `${quizId}-q08`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Our neighbour switch on his TV early in the morning at full volume",
            options: [
                "his TV",
                "early in the morning",
                "switch on",
                "at full volume"
            ],
            correctAnswer: 2,
            explanation: "Replae 'switch (V1 plural)' with 'switches (V5 singular)'. Subject (neighbour) is singular. V2 (switched) may also be correct."
        },
        {
            id: `${quizId}-q09`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Ever since Mary won the election, she has been behaving as if she was a queen.",
            options: [
                "since",
                "the election",
                "has been behaving",
                "was"
            ],
            correctAnswer: 3,
            explanation: "Replace 'was' with 'were'. The sentence is of Present imagination."
        },
        {
            id: `${quizId}-q10`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Why she was angry with her son?",
            options: [
                "she was",
                "angry with",
                "her son",
                "Why"
            ],
            correctAnswer: 0,
            explanation: "Replace 'she was' with 'was she'. Structure of Interrogative Sentence Interrogative word + auxiliary verb + subject... ?"
        },
        {
            id: `${quizId}-q11`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "I was not able to solve the questions as I was not knowing the answers.",
            options: [
                "the answers",
                "I was not",
                "able to solve",
                "was not knowing"
            ],
            correctAnswer: 3,
            explanation: "Replace 'was not knowing' with 'didn't know'. 'Know' does not come in 'ing' form'"
        },
        {
            id: `${quizId}-q12`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "This camping site is a naturally sculpted amphitheatre that serving as the perfect spot to lie back and count the stars.",
            options: [
                "that serving as the perfect spot",
                "to lay back and count the stars",
                "a naturally sculpted amphitheatre",
                "This camping site is"
            ],
            correctAnswer: 0,
            explanation: "Replace 'serving' with 'serves'."
        },
        {
            id: `${quizId}-q13`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Though paper has been the dominant medium for print, the British parliament had managed valiantly to hold back the paper tide for over half a millennium.",
            options: [
                "the dominant medium for print",
                "Though paper had been",
                "to hold back the paper tide",
                "Parliament had managed"
            ],
            correctAnswer: 3,
            explanation: "Replace 'had' with 'has'. The sentence started with Present Perfect."
        },
        {
            id: `${quizId}-q14`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Security firms would get prosecuted for a breach of their duty if they do not introduced adequate procedures to protect children from harm.",
            options: [
                "would get prosecuted",
                "for a breach of their duty",
                "to protect children",
                "do not introduced"
            ],
            correctAnswer: 3,
            explanation: "Replace 'introduced' with 'introduce'. Do not takes V1."
        },
        {
            id: `${quizId}-q15`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "That his body did not decompose confirmed what the Greeks thought about him and what Alexander use to believe about himself-that he was not an ordinary man, but a god.",
            options: [
                "thought about him",
                "use to believe about himself",
                "he was not an ordinary man",
                "his body did not decompose"
            ],
            correctAnswer: 1,
            explanation: "Replace 'use' with 'used'. Used to + base form of verb is used to denote Past Routine."
        },
        {
            id: `${quizId}-q16`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "My father did never have an opportunity to go to a University.",
            options: [
                "an opportunity",
                "a University",
                "to go to",
                "did never have"
            ],
            correctAnswer: 3,
            explanation: "Replace 'did never have' with 'never had'."
        },
        {
            id: `${quizId}-q17`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "The files you were look for are placed on the table.",
            options: [
                "are placed",
                "you were look for",
                "The files",
                "on the table"
            ],
            correctAnswer: 1,
            explanation: "Replace 'look' with 'looking'. 'Look for' means 'search'."
        },
        {
            id: `${quizId}-q18`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "News of the calamity is reached the family members the next day.",
            options: [
                "the family members",
                "News of the calamity",
                "is reached",
                "the next day"
            ],
            correctAnswer: 2,
            explanation: "Remove 'is'. The action is of past hence Simple Past tense will come."
        },
        {
            id: `${quizId}-q19`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Torrential rains and winds of upto 170 km per hour swept away roads,",
                "/ homes and bridges and knocking down",
                "/ power and communication lines",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace 'knocking' with knocked Knocked down – fxjkuk"
        },
        {
            id: `${quizId}-q20`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The street artist Satish Munjal has been",
                "/ painting this wall since",
                "/ the past one week",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Change 'since' into 'for'. 'One week' is a duration and will take 'for'."
        },
        {
            id: `${quizId}-q21`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Most disputes",
                "/ can be solved amicably,",
                "/ unless one are not rigid",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Change 'are' into 'is'. 'One' is singular and takes singular verb."
        },
        {
            id: `${quizId}-q22`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Entering",
                "/ the hall,",
                "/ the show had started",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Replace 'entering' with 'before I entered'."
        },
        {
            id: `${quizId}-q23`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "\"I done",
                "/ a lot of",
                "/ work today,\" she said",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Sentence is in past tense. Replace 'done' with 'did'."
        },
        {
            id: `${quizId}-q24`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "The Cannes Film Festival attract some of the world's most famous people.",
            options: [
                "the world's",
                "The Cannes Film Festival",
                "attract some of",
                "most famous people CHSL-2018 2 July, 2019, Evening"
            ],
            correctAnswer: 2,
            explanation: "Use ‘attracts’ inspite of ‘attract’."
        },
        {
            id: `${quizId}-q25`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "The ambulance have arrived on time, the accident victim was taken to the hospital.",
            options: [
                "the accident victim",
                "have arrived on time",
                "The ambulance",
                "was taken to the hospital CHSL-2018 4 July, 2019, Evening"
            ],
            correctAnswer: 1,
            explanation: "use ‘has’ in place of ‘have’."
        },
        {
            id: `${quizId}-q26`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "With this heat wave, on we are having a terrible weather.",
            options: [
                "heat wave on",
                "a terrible weather",
                "with this",
                "we are having CHSL-2018 9 July, 2019, Morning"
            ],
            correctAnswer: 1,
            explanation: "Remove ‘on’."
        },
        {
            id: `${quizId}-q27`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "The two states frequently has differences over the use of the river water especially during the summer months.",
            options: [
                "over the use of the river water",
                "The two states frequently",
                "has difference",
                "especially during the summer months CHSL-2018 9 July, 2019, Evening"
            ],
            correctAnswer: 2,
            explanation: "use ‘have’ in place of ‘has’."
        },
        {
            id: `${quizId}-q28`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "My grandmother has been lives in Shimla since her childhood days.",
            options: [
                "has been lives",
                "her childhood days",
                "My grandmother",
                "in Shimla since CHSL-2018 10 July, 2019, Evening"
            ],
            correctAnswer: 0,
            explanation: "use ‘living’ in place of ‘lives’. Has been is followed by V1 + ing."
        },
        {
            id: `${quizId}-q29`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "The Public works Department has propose to construct an elevated corridor which will run parallel to the National highway.",
            options: [
                "to the National highway",
                "The Public works Department has propose",
                "which will run parallel",
                "to construct an elevated corridor CHSL-2018 2 July, 2019, Morning"
            ],
            correctAnswer: 1,
            explanation: "‘Has’ is always followed by ‘third form of verb’. Use ‘proposed’ in place of ‘propose’."
        },
        {
            id: `${quizId}-q30`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "The promoters of Med Hospitals has agreed to sell their business to Pal Hospitals.",
            options: [
                "The promoters of",
                "to sell their business",
                "Med Hospitals has agreed",
                "to Pal Hospitals CHSL-2018 3 July, 2019, Morning"
            ],
            correctAnswer: 2,
            explanation: "Use ‘have’ in place of ‘has’. Promoters will take plural verb."
        },
        {
            id: `${quizId}-q31`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "The number of visitors at the fair were much larger than expected.",
            options: [
                "The number of",
                "than expected",
                "visitors at the fair",
                "were much larger CHSL-2018 4 July, 2019, Afternoon"
            ],
            correctAnswer: 3,
            explanation: "Use 'was' in place of 'were'. The number takes singular verb."
        },
        {
            id: `${quizId}-q32`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Why should always we have to wait for her to join us?",
            options: [
                "Why should",
                "have to wait for her",
                "always me",
                "to join us?"
            ],
            correctAnswer: 2,
            explanation: "In interrogative sentences only helping verb precedes the subject. Adverb remains at its place."
        },
        {
            id: `${quizId}-q33`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "She is a great cook, has her own blog on YouTube and was followed by one lakh viewers.",
            options: [
                "She is",
                "a great cook",
                "has her own blog",
                "was followed"
            ],
            correctAnswer: 2,
            explanation: "Replace 'was' with 'is'. The sentence is of Present."
        },
        {
            id: `${quizId}-q34`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "The Prime Minister holding is the important meeting to review the security and safety of doctors working in government hospitals.",
            options: [
                "of doctors",
                "working in",
                "to review",
                "holding is the"
            ],
            correctAnswer: 3,
            explanation: "Replace 'holding is' with 'is holding'."
        },
        {
            id: `${quizId}-q35`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Last evening my friend tells me the funny joke that I have ever heard.",
            options: [
                "that I have",
                "ever heard",
                "tells me the funny joke",
                "Last evening my friend"
            ],
            correctAnswer: 2,
            explanation: "Replace 'tells' with 'told'. Last evening (past time) takes Simple Past Tense."
        },
        {
            id: `${quizId}-q36`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "I am really bored of this movie! When was it end?",
            options: [
                "it end?",
                "I am really bored",
                "of this movie",
                "When was"
            ],
            correctAnswer: 3,
            explanation: "Replace 'was' with 'will'. In the sentence the movie is yet to end so the sentence will be in future tense."
        },
        {
            id: `${quizId}-q37`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "No one inform me that you would be absent.",
            options: [
                "No one inform me",
                "would be absent",
                "No error",
                "that you"
            ],
            correctAnswer: 0,
            explanation: "Replace 'inform' with 'informed'. The action is in past tense."
        },
        {
            id: `${quizId}-q38`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Prasad recalled that meeting people have been a part of his life as a student activist.",
            options: [
                "meeting people have been",
                "Prasad recalled that",
                "a part of his life",
                "as a student activist"
            ],
            correctAnswer: 0,
            explanation: "Replace 'have' with 'had'. The action is of Past."
        },
        {
            id: `${quizId}-q39`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Everything has became very expensive these days.",
            options: [
                "No error",
                "Everything has became",
                "very expensive",
                "these days"
            ],
            correctAnswer: 1,
            explanation: "Replace 'became' with 'become'. Has takes V3."
        },
        {
            id: `${quizId}-q40`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Rohit did not came to the office because he got held up due to the heavy rains.",
            options: [
                "to the office",
                "due to the heavy rains",
                "Rohit did not came",
                "because he got held up"
            ],
            correctAnswer: 2,
            explanation: "Replace 'came' with 'come'. Did not takes V1."
        },
        {
            id: `${quizId}-q41`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Everybody is waiting to see whether the new leadership has effect some changes soon in the party.",
            options: [
                "Everybody is waiting to see",
                "soon in the party",
                "has effect some changes",
                "whether the new leadership"
            ],
            correctAnswer: 2,
            explanation: "Replace 'has' with 'will'. 'Soon' depicts future. So 'will + Vb.f' will come."
        },
        {
            id: `${quizId}-q42`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "A recent government report highlight that the shortage of teachers in higher educational institutions is greater than that in countries like China, Brazil, Sweden and Russia.",
            options: [
                "A recent government report highlight",
                "in higher educational institutions",
                "that the shortage of teachers",
                "is greater than"
            ],
            correctAnswer: 0,
            explanation: "Replace 'highlight' with 'has highlighted'. The sentence is of present."
        },
        {
            id: `${quizId}-q43`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Is she go to visit her parents in the evening?",
            options: [
                "her parents",
                "to visit",
                "in the evening",
                "Is she go"
            ],
            correctAnswer: 3,
            explanation: "Replace 'is' with 'will'. 'In the evening' means 'the time is of future'."
        },
        {
            id: `${quizId}-q44`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Rescue officials was unable to find any survivors in the Californaia boat tragedy.",
            options: [
                "was unable",
                "in the",
                "to find",
                "Rescue officials"
            ],
            correctAnswer: 0,
            explanation: "Replace 'was' with 'were'. 'Officials' a plural noun will take plural verb."
        },
        {
            id: `${quizId}-q45`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Aanya’s class teacher and her friends congratulates her warmly when she won the inter school debate and brought the trophy to the school.",
            options: [
                "and brought the trophy",
                "congratulates her",
                "when she won",
                "and her friends"
            ],
            correctAnswer: 1,
            explanation: "Replace 'congratulates' with 'congratulated' because sentence is in past tense."
        },
        {
            id: `${quizId}-q46`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Some of us are plan to go for a movie tonight.",
            options: [
                "for a movie",
                "to go",
                "Some of us",
                "are plan to go"
            ],
            correctAnswer: 3,
            explanation: "Replace 'plan' with 'planning'. ssc Prepared by Neetu Singh (1997–2016) 1000 1000 Revised Updated 1"
        },
        {
            id: `${quizId}-q47`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The various consequences of",
                "/ the decision taken by the",
                "/ finance ministry was not foreseen by the bureaucrats",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace ‘was’ with ‘were’ because here the main subject (The various consequences) is plural."
        },
        {
            id: `${quizId}-q48`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "One of the terrorists",
                "/ of the Kashmir valley",
                "/ are shot dead",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace ‘are’ with ‘is’. If ‘of’ is used after ‘each’, every, one etc, the Noun or Pronoun that comes immediately after ‘of’ will be Plural in form. However the verb, Pronoun, Adjective etc. that comes in the latter part of the sentence will be singular in form. Structure: One + of + Plural Noun + Singular Verb"
        },
        {
            id: `${quizId}-q49`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Ten kilometres",
                "/ is",
                "/ a long distance to walk",
                "No error"
            ],
            correctAnswer: 3,
            explanation: "If Plural Noun is used after cardinal adjectives (one, two, three etc.) and if plural noun denotes certain amount, weight, height or period singular verb will be used."
        },
        {
            id: `${quizId}-q50`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The introduction of job-oriented courses",
                "/ in the self-financing colleges",
                "/ attract many students",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace ‘attract’ with ‘attracts’. Here the main subject is singular (introduction) hence it will take singular verb."
        }
    ];

    window.GJU_QUIZ_BANK.push({
        id: quizId,
        title: "English Detecting Errors Practice Set 20",
        subject: "English",
        difficulty: "Hard",
        questions
    });
})();