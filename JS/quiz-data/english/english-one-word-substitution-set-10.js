(function () {
    "use strict";

    window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];

    const quizId = "english-one-word-substitution-set-10";

    const questions = [
        {
            id: `${quizId}-q01`,
            topic: "One Word Substitution",
            difficulty: "hard",
            question: "Choose the correct one-word substitution for: “An act of travelling from one place to another”",
            options: ["Quinquennial", "Journey", "Aquarium", "Ephemeral"],
            correctAnswer: 1,
            explanation: "“Journey” is the correct one-word substitution for “An act of travelling from one place to another”. This expression is commonly asked in SSC/CPO/competitive English vocabulary questions."
        },
        {
            id: `${quizId}-q02`,
            topic: "One Word Substitution",
            difficulty: "hard",
            question: "Choose the correct one-word substitution for: “Misappropriation of money”",
            options: ["Fanatical", "Embezzlement", "Antidote", "To ferret"],
            correctAnswer: 1,
            explanation: "“Embezzlement” is the correct one-word substitution for “Misappropriation of money”. This expression is commonly asked in SSC/CPO/competitive English vocabulary questions."
        },
        {
            id: `${quizId}-q03`,
            topic: "One Word Substitution",
            difficulty: "hard",
            question: "Choose the correct one-word substitution for: “When something moves in a straight line”",
            options: ["Mediocre", "Rectilinear", "Snob", "Reveille"],
            correctAnswer: 1,
            explanation: "“Rectilinear” is the correct one-word substitution for “When something moves in a straight line”. This expression is commonly asked in SSC/CPO/competitive English vocabulary questions."
        },
        {
            id: `${quizId}-q04`,
            topic: "One Word Substitution",
            difficulty: "hard",
            question: "Choose the correct one-word substitution for: “Tending to associate with others of one’s kind”",
            options: ["To smother", "Gregarious", "Autocracy", "Credible"],
            correctAnswer: 1,
            explanation: "“Gregarious” is the correct one-word substitution for “Tending to associate with others of one’s kind”. This expression is commonly asked in SSC/CPO/competitive English vocabulary questions."
        },
        {
            id: `${quizId}-q05`,
            topic: "One Word Substitution",
            difficulty: "hard",
            question: "Choose the correct one-word substitution for: “General pardon for offences against the state”",
            options: ["Virtuoso", "Soporific", "Amnesty", "Lode"],
            correctAnswer: 2,
            explanation: "“Amnesty” is the correct one-word substitution for “General pardon for offences against the state”. This expression is commonly asked in SSC/CPO/competitive English vocabulary questions."
        },
        {
            id: `${quizId}-q06`,
            topic: "One Word Substitution",
            difficulty: "hard",
            question: "Choose the correct one-word substitution for: “A person motivated by irrational enthusiasm”",
            options: ["Euthanasia", "Fanatic", "Auditorium", "Polygon"],
            correctAnswer: 1,
            explanation: "“Fanatic” is the correct one-word substitution for “A person motivated by irrational enthusiasm”. This expression is commonly asked in SSC/CPO/competitive English vocabulary questions."
        },
        {
            id: `${quizId}-q07`,
            topic: "One Word Substitution",
            difficulty: "hard",
            question: "Choose the correct one-word substitution for: “Wide, uninterrupted view”",
            options: ["Tsunami", "Sabotage", "Tremor", "Panorama"],
            correctAnswer: 3,
            explanation: "“Panorama” is the correct one-word substitution for “Wide, uninterrupted view”. This expression is commonly asked in SSC/CPO/competitive English vocabulary questions."
        },
        {
            id: `${quizId}-q08`,
            topic: "One Word Substitution",
            difficulty: "hard",
            question: "Choose the correct one-word substitution for: “An instrument for measuring pressure of gases”",
            options: ["Coffle", "Miser", "Manometer", "Ephemeral"],
            correctAnswer: 2,
            explanation: "“Manometer” is the correct one-word substitution for “An instrument for measuring pressure of gases”. This expression is commonly asked in SSC/CPO/competitive English vocabulary questions."
        },
        {
            id: `${quizId}-q09`,
            topic: "One Word Substitution",
            difficulty: "hard",
            question: "Choose the correct one-word substitution for: “That which cannot be expressed in words”",
            options: ["Pilferages", "Condominium", "Ineffable", "Confiscate"],
            correctAnswer: 2,
            explanation: "“Ineffable” is the correct one-word substitution for “That which cannot be expressed in words”. This expression is commonly asked in SSC/CPO/competitive English vocabulary questions."
        },
        {
            id: `${quizId}-q10`,
            topic: "One Word Substitution",
            difficulty: "hard",
            question: "Choose the correct one-word substitution for: “A mixture of dried, naturally fragrant plant material, used to provide a gentle natural scent inside buildings, especially in residential settings”",
            options: ["Detention", "Disaster", "Potpourri", "Monarchy"],
            correctAnswer: 2,
            explanation: "“Potpourri” is the correct one-word substitution for “A mixture of dried, naturally fragrant plant material, used to provide a gentle natural scent inside buildings, especially in residential settings”. This expression is commonly asked in SSC/CPO/competitive English vocabulary questions."
        },
        {
            id: `${quizId}-q11`,
            topic: "One Word Substitution",
            difficulty: "hard",
            question: "Choose the correct one-word substitution for: “Placing different things in order to create an interesting effect”",
            options: ["Archive", "Immigrant", "Gullible", "Juxtapose"],
            correctAnswer: 3,
            explanation: "“Juxtapose” is the correct one-word substitution for “Placing different things in order to create an interesting effect”. This expression is commonly asked in SSC/CPO/competitive English vocabulary questions."
        },
        {
            id: `${quizId}-q12`,
            topic: "One Word Substitution",
            difficulty: "hard",
            question: "Choose the correct one-word substitution for: “Study of cultures”",
            options: ["Ethnology", "Scandal", "Calligrapher", "Sever"],
            correctAnswer: 0,
            explanation: "“Ethnology” is the correct one-word substitution for “Study of cultures”. This expression is commonly asked in SSC/CPO/competitive English vocabulary questions."
        },
        {
            id: `${quizId}-q13`,
            topic: "One Word Substitution",
            difficulty: "hard",
            question: "Choose the correct one-word substitution for: “A person speaking many languages”",
            options: ["Pantry", "Notorious", "Polyglot", "Volatile"],
            correctAnswer: 2,
            explanation: "“Polyglot” is the correct one-word substitution for “A person speaking many languages”. This expression is commonly asked in SSC/CPO/competitive English vocabulary questions."
        },
        {
            id: `${quizId}-q14`,
            topic: "One Word Substitution",
            difficulty: "hard",
            question: "Choose the correct one-word substitution for: “A lengthy and aggressive speech addressed to a large assembly”",
            options: ["Harangue", "Fungus", "Pathology", "Dyke"],
            correctAnswer: 0,
            explanation: "“Harangue” is the correct one-word substitution for “A lengthy and aggressive speech addressed to a large assembly”. This expression is commonly asked in SSC/CPO/competitive English vocabulary questions."
        },
        {
            id: `${quizId}-q15`,
            topic: "One Word Substitution",
            difficulty: "hard",
            question: "Choose the correct one-word substitution for: “One who is not easily pleased by anything”",
            options: ["Fastidious", "Verbatim", "Posthumouschild", "Jury"],
            correctAnswer: 0,
            explanation: "“Fastidious” is the correct one-word substitution for “One who is not easily pleased by anything”. This expression is commonly asked in SSC/CPO/competitive English vocabulary questions."
        },
        {
            id: `${quizId}-q16`,
            topic: "One Word Substitution",
            difficulty: "hard",
            question: "Choose the correct one-word substitution for: “Head of monks in abbey”",
            options: ["Abbot", "Sedative", "Moor", "Consternation"],
            correctAnswer: 0,
            explanation: "“Abbot” is the correct one-word substitution for “Head of monks in abbey”. This expression is commonly asked in SSC/CPO/competitive English vocabulary questions."
        },
        {
            id: `${quizId}-q17`,
            topic: "One Word Substitution",
            difficulty: "hard",
            question: "Choose the correct one-word substitution for: “The word which is no longer in use”",
            options: ["Acronym", "Martyr", "Obsolete", "Contraband"],
            correctAnswer: 2,
            explanation: "“Obsolete” is the correct one-word substitution for “The word which is no longer in use”. This expression is commonly asked in SSC/CPO/competitive English vocabulary questions."
        },
        {
            id: `${quizId}-q18`,
            topic: "One Word Substitution",
            difficulty: "hard",
            question: "Choose the correct one-word substitution for: “A person unselfishly concerned for or devoted to the welfare of others”",
            options: ["Anecdote", "Windfall", "Genocide", "Altruist"],
            correctAnswer: 3,
            explanation: "“Altruist” is the correct one-word substitution for “A person unselfishly concerned for or devoted to the welfare of others”. This expression is commonly asked in SSC/CPO/competitive English vocabulary questions."
        },
        {
            id: `${quizId}-q19`,
            topic: "One Word Substitution",
            difficulty: "hard",
            question: "Choose the correct one-word substitution for: “Inscription on a gravestone”",
            options: ["Nonagenarian", "Caravan", "Epitaph", "Avant-grade"],
            correctAnswer: 2,
            explanation: "“Epitaph” is the correct one-word substitution for “Inscription on a gravestone”. This expression is commonly asked in SSC/CPO/competitive English vocabulary questions."
        },
        {
            id: `${quizId}-q20`,
            topic: "One Word Substitution",
            difficulty: "hard",
            question: "Choose the correct one-word substitution for: “Violation of that which is holy and sacred”",
            options: ["Palliation", "Sacrilege", "To fabricate", "Elope"],
            correctAnswer: 1,
            explanation: "“Sacrilege” is the correct one-word substitution for “Violation of that which is holy and sacred”. This expression is commonly asked in SSC/CPO/competitive English vocabulary questions."
        },
        {
            id: `${quizId}-q21`,
            topic: "One Word Substitution",
            difficulty: "hard",
            question: "Choose the correct one-word substitution for: “One who believes in many Gods”",
            options: ["Procrastinate", "Polytheist", "To perplex", "Fungus"],
            correctAnswer: 1,
            explanation: "“Polytheist” is the correct one-word substitution for “One who believes in many Gods”. This expression is commonly asked in SSC/CPO/competitive English vocabulary questions."
        },
        {
            id: `${quizId}-q22`,
            topic: "One Word Substitution",
            difficulty: "hard",
            question: "Choose the correct one-word substitution for: “One who lends money on high rates of interest”",
            options: ["Usurer", "Cosmopolitan", "Implication", "Herbivores"],
            correctAnswer: 0,
            explanation: "“Usurer” is the correct one-word substitution for “One who lends money on high rates of interest”. This expression is commonly asked in SSC/CPO/competitive English vocabulary questions."
        },
        {
            id: `${quizId}-q23`,
            topic: "One Word Substitution",
            difficulty: "hard",
            question: "Choose the correct one-word substitution for: “A post with little work but high salary”",
            options: ["Evolved", "Loophole", "Knell", "Sinecure"],
            correctAnswer: 3,
            explanation: "“Sinecure” is the correct one-word substitution for “A post with little work but high salary”. This expression is commonly asked in SSC/CPO/competitive English vocabulary questions."
        },
        {
            id: `${quizId}-q24`,
            topic: "One Word Substitution",
            difficulty: "hard",
            question: "Choose the correct one-word substitution for: “A person, especially a young one, with exceptional abilities”",
            options: ["Distress", "Bovine", "Prodigy", "Sever"],
            correctAnswer: 2,
            explanation: "“Prodigy” is the correct one-word substitution for “A person, especially a young one, with exceptional abilities”. This expression is commonly asked in SSC/CPO/competitive English vocabulary questions."
        },
        {
            id: `${quizId}-q25`,
            topic: "One Word Substitution",
            difficulty: "hard",
            question: "Choose the correct one-word substitution for: “Incapable of feeling tired or exhausted”",
            options: ["Indefatigable", "Conscience", "Cosmopolitan", "Downpour"],
            correctAnswer: 0,
            explanation: "“Indefatigable” is the correct one-word substitution for “Incapable of feeling tired or exhausted”. This expression is commonly asked in SSC/CPO/competitive English vocabulary questions."
        },
        {
            id: `${quizId}-q26`,
            topic: "One Word Substitution",
            difficulty: "hard",
            question: "Choose the correct one-word substitution for: “A new word coined by an author”",
            options: ["Neologism", "Prejudice", "Infernal", "Apiary"],
            correctAnswer: 0,
            explanation: "“Neologism” is the correct one-word substitution for “A new word coined by an author”. This expression is commonly asked in SSC/CPO/competitive English vocabulary questions."
        },
        {
            id: `${quizId}-q27`,
            topic: "One Word Substitution",
            difficulty: "hard",
            question: "Choose the correct one-word substitution for: “The act of killing a whole group of people, especially a whole race”",
            options: ["To elude", "Mores", "To disintegrate", "Genocide"],
            correctAnswer: 3,
            explanation: "“Genocide” is the correct one-word substitution for “The act of killing a whole group of people, especially a whole race”. This expression is commonly asked in SSC/CPO/competitive English vocabulary questions."
        },
        {
            id: `${quizId}-q28`,
            topic: "One Word Substitution",
            difficulty: "hard",
            question: "Choose the correct one-word substitution for: “Animals that can live on land and in water”",
            options: ["Sweeping", "Amphibian", "Dyke", "Vivacious"],
            correctAnswer: 1,
            explanation: "“Amphibian” is the correct one-word substitution for “Animals that can live on land and in water”. This expression is commonly asked in SSC/CPO/competitive English vocabulary questions."
        },
        {
            id: `${quizId}-q29`,
            topic: "One Word Substitution",
            difficulty: "hard",
            question: "Choose the correct one-word substitution for: “A hater of women”",
            options: ["Circumstantial", "Misogynist", "Catastrophic", "Aviary"],
            correctAnswer: 1,
            explanation: "“Misogynist” is the correct one-word substitution for “A hater of women”. This expression is commonly asked in SSC/CPO/competitive English vocabulary questions."
        },
        {
            id: `${quizId}-q30`,
            topic: "One Word Substitution",
            difficulty: "hard",
            question: "Choose the correct one-word substitution for: “A state where there is no effective government”",
            options: ["Wreath", "Feasible", "Anarchy", "Hijack"],
            correctAnswer: 2,
            explanation: "“Anarchy” is the correct one-word substitution for “A state where there is no effective government”. This expression is commonly asked in SSC/CPO/competitive English vocabulary questions."
        },
        {
            id: `${quizId}-q31`,
            topic: "One Word Substitution",
            difficulty: "hard",
            question: "Choose the correct one-word substitution for: “A person who opposes war or use of military force”",
            options: ["Pacifist", "Polygamy", "Premiere", "Taxonomy"],
            correctAnswer: 0,
            explanation: "“Pacifist” is the correct one-word substitution for “A person who opposes war or use of military force”. This expression is commonly asked in SSC/CPO/competitive English vocabulary questions."
        },
        {
            id: `${quizId}-q32`,
            topic: "One Word Substitution",
            difficulty: "hard",
            question: "Choose the correct one-word substitution for: “Substance used in surgery to produce unconsciousness”",
            options: ["Anesthetic", "Monarchy", "Edible", "Scabbard"],
            correctAnswer: 0,
            explanation: "“Anesthetic” is the correct one-word substitution for “Substance used in surgery to produce unconsciousness”. This expression is commonly asked in SSC/CPO/competitive English vocabulary questions."
        },
        {
            id: `${quizId}-q33`,
            topic: "One Word Substitution",
            difficulty: "hard",
            question: "Choose the correct one-word substitution for: “Master of ceremonies”",
            options: ["Assertive", "Compere", "Contingency", "Defection"],
            correctAnswer: 1,
            explanation: "“Compere” is the correct one-word substitution for “Master of ceremonies”. This expression is commonly asked in SSC/CPO/competitive English vocabulary questions."
        },
        {
            id: `${quizId}-q34`,
            topic: "One Word Substitution",
            difficulty: "hard",
            question: "Choose the correct one-word substitution for: “A remedy for all diseases”",
            options: ["Moor", "Panacea", "Zealotry", "Drought"],
            correctAnswer: 1,
            explanation: "“Panacea” is the correct one-word substitution for “A remedy for all diseases”. This expression is commonly asked in SSC/CPO/competitive English vocabulary questions."
        },
        {
            id: `${quizId}-q35`,
            topic: "One Word Substitution",
            difficulty: "hard",
            question: "Choose the correct one-word substitution for: “A place for fish or water plants”",
            options: ["Bibliography", "Orphanage", "Defection", "Aquarium"],
            correctAnswer: 3,
            explanation: "“Aquarium” is the correct one-word substitution for “A place for fish or water plants”. This expression is commonly asked in SSC/CPO/competitive English vocabulary questions."
        },
        {
            id: `${quizId}-q36`,
            topic: "One Word Substitution",
            difficulty: "hard",
            question: "Choose the correct one-word substitution for: “The study of birds is known as”",
            options: ["Amnesty", "Ornithology", "Screech", "Connoisseur"],
            correctAnswer: 1,
            explanation: "“Ornithology” is the correct one-word substitution for “The study of birds is known as”. This expression is commonly asked in SSC/CPO/competitive English vocabulary questions."
        },
        {
            id: `${quizId}-q37`,
            topic: "One Word Substitution",
            difficulty: "hard",
            question: "Choose the correct one-word substitution for: “The belief that everyone is equal and should have the same right and opportunities”",
            options: ["Heckle", "Inevitable", "Egalitarian", "Erudition"],
            correctAnswer: 2,
            explanation: "“Egalitarian” is the correct one-word substitution for “The belief that everyone is equal and should have the same right and opportunities”. This expression is commonly asked in SSC/CPO/competitive English vocabulary questions."
        },
        {
            id: `${quizId}-q38`,
            topic: "One Word Substitution",
            difficulty: "hard",
            question: "Choose the correct one-word substitution for: “Irresistible craving for alcoholic drinks”",
            options: ["Jaunt", "Biodegradable", "Pact", "Dispomania"],
            correctAnswer: 3,
            explanation: "“Dispomania” is the correct one-word substitution for “Irresistible craving for alcoholic drinks”. This expression is commonly asked in SSC/CPO/competitive English vocabulary questions."
        },
        {
            id: `${quizId}-q39`,
            topic: "One Word Substitution",
            difficulty: "hard",
            question: "Choose the correct one-word substitution for: “Feeling annoyed at the sight of unfair treatment”",
            options: ["Sceptic", "Laudable", "Calligraphy", "Indignant"],
            correctAnswer: 3,
            explanation: "“Indignant” is the correct one-word substitution for “Feeling annoyed at the sight of unfair treatment”. This expression is commonly asked in SSC/CPO/competitive English vocabulary questions."
        },
        {
            id: `${quizId}-q40`,
            topic: "One Word Substitution",
            difficulty: "hard",
            question: "Choose the correct one-word substitution for: “Unwelcome aspect of a situation”",
            options: ["Posthumouschild", "Flip side", "Fatal", "Carnivorous"],
            correctAnswer: 1,
            explanation: "“Flip side” is the correct one-word substitution for “Unwelcome aspect of a situation”. This expression is commonly asked in SSC/CPO/competitive English vocabulary questions."
        },
        {
            id: `${quizId}-q41`,
            topic: "One Word Substitution",
            difficulty: "hard",
            question: "Choose the correct one-word substitution for: “Imposed a restriction on”",
            options: ["Hangar", "Constrained", "Recluse", "Fantasy"],
            correctAnswer: 1,
            explanation: "“Constrained” is the correct one-word substitution for “Imposed a restriction on”. This expression is commonly asked in SSC/CPO/competitive English vocabulary questions."
        },
        {
            id: `${quizId}-q42`,
            topic: "One Word Substitution",
            difficulty: "hard",
            question: "Choose the correct one-word substitution for: “One who hates mankind”",
            options: ["Misanthrope", "Red-tapism", "Quarantine", "Post- Mortem"],
            correctAnswer: 0,
            explanation: "“Misanthrope” is the correct one-word substitution for “One who hates mankind”. This expression is commonly asked in SSC/CPO/competitive English vocabulary questions."
        },
        {
            id: `${quizId}-q43`,
            topic: "One Word Substitution",
            difficulty: "hard",
            question: "Choose the correct one-word substitution for: “To free a person by a verdict of ‘not guilty’”",
            options: ["To inflict", "Hutch", "Reveille", "Acquit"],
            correctAnswer: 3,
            explanation: "“Acquit” is the correct one-word substitution for “To free a person by a verdict of ‘not guilty’”. This expression is commonly asked in SSC/CPO/competitive English vocabulary questions."
        },
        {
            id: `${quizId}-q44`,
            topic: "One Word Substitution",
            difficulty: "hard",
            question: "Choose the correct one-word substitution for: “To secure a boat by attaching it to an anchor”",
            options: ["Internment", "Moor", "To deviate", "Bovine"],
            correctAnswer: 1,
            explanation: "“Moor” is the correct one-word substitution for “To secure a boat by attaching it to an anchor”. This expression is commonly asked in SSC/CPO/competitive English vocabulary questions."
        },
        {
            id: `${quizId}-q45`,
            topic: "One Word Substitution",
            difficulty: "hard",
            question: "Choose the correct one-word substitution for: “To try to settle a dispute between two other parties”",
            options: ["Genetics", "Mediate", "Episode", "Horticulture"],
            correctAnswer: 1,
            explanation: "“Mediate” is the correct one-word substitution for “To try to settle a dispute between two other parties”. This expression is commonly asked in SSC/CPO/competitive English vocabulary questions."
        },
        {
            id: `${quizId}-q46`,
            topic: "One Word Substitution",
            difficulty: "hard",
            question: "Choose the correct one-word substitution for: “A vivacious and lively experience is said to be”",
            options: ["Scintillating", "Pantheon", "Sordid", "Expurgate"],
            correctAnswer: 0,
            explanation: "“Scintillating” is the correct one-word substitution for “A vivacious and lively experience is said to be”. This expression is commonly asked in SSC/CPO/competitive English vocabulary questions."
        },
        {
            id: `${quizId}-q47`,
            topic: "One Word Substitution",
            difficulty: "hard",
            question: "Choose the correct one-word substitution for: “Wildly unreasonable, illogical or ridiculous”",
            options: ["Truant", "Matinee", "Absurd", "To juxtapose"],
            correctAnswer: 2,
            explanation: "“Absurd” is the correct one-word substitution for “Wildly unreasonable, illogical or ridiculous”. This expression is commonly asked in SSC/CPO/competitive English vocabulary questions."
        },
        {
            id: `${quizId}-q48`,
            topic: "One Word Substitution",
            difficulty: "hard",
            question: "Choose the correct one-word substitution for: “Constant efforts to achieve something”",
            options: ["Procrastinate", "Fable", "Perseverance", "Trench"],
            correctAnswer: 2,
            explanation: "“Perseverance” is the correct one-word substitution for “Constant efforts to achieve something”. This expression is commonly asked in SSC/CPO/competitive English vocabulary questions."
        },
        {
            id: `${quizId}-q49`,
            topic: "One Word Substitution",
            difficulty: "hard",
            question: "Choose the correct one-word substitution for: “The plant and a vegetation of a region”",
            options: ["Flora", "Scapegoat", "Copy", "Trespassers"],
            correctAnswer: 0,
            explanation: "“Flora” is the correct one-word substitution for “The plant and a vegetation of a region”. This expression is commonly asked in SSC/CPO/competitive English vocabulary questions."
        },
        {
            id: `${quizId}-q50`,
            topic: "One Word Substitution",
            difficulty: "hard",
            question: "Choose the correct one-word substitution for: “A fourteen-line poem”",
            options: ["Hamlet", "Soliloquy", "Occidental", "Sonnet"],
            correctAnswer: 3,
            explanation: "“Sonnet” is the correct one-word substitution for “A fourteen-line poem”. This expression is commonly asked in SSC/CPO/competitive English vocabulary questions."
        }
    ];

    window.GJU_QUIZ_BANK.push({
        id: quizId,
        subject: "English",
        title: "English One Word Substitution Practice Set 10",
        description: "50 tough-level One Word Substitution MCQs for SSC CGL, SSC CPO, UPSI, UPPCS and other competitive exams with professional explanations.",
        durationMinutes: 35,
        totalQuestions: questions.length,
        marksPerQuestion: 1,
        negativeMarks: 0.25,
        difficulty: "Hard",
        tags: ["SSC", "CGL", "CPO", "UPSI", "UPPCS", "English", "One Word Substitution", "Vocabulary"],
        questions
    });
}());
