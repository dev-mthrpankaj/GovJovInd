(function () {
    "use strict";

    const quizId = "english-grammar-comprehension-latex-set-1";
    const subject = "English";
    const topic = "English Grammar and Comprehension";

    function option(text) {
        return { text };
    }

    function q(number, question, options, correctAnswer, explanation) {
        return {
            id: `${quizId}-q${String(number).padStart(2, "0")}`,
            subject,
            topic,
            difficulty: "Hard",
            question,
            options: options.map(option),
            correctAnswer,
            explanation,
            marks: 1,
            negativeMarks: 0.25
        };
    }

    const passage = "[b]Passage:[/b]\nA good reader does not merely collect facts from a text; he connects ideas, examines the writer's purpose, and judges the evidence presented. Reading, therefore, is an active process. It requires attention, patience, and the willingness to question what appears obvious at first sight.";

    const questions = [
        q(1, "[b]Fill in the blank with the correct verb:[/b]\nThe manager, along with his assistants, \\(\\underline{\\hspace{2cm}}\\) attending the meeting.", [
            "are",
            "were",
            "is",
            "have been"
        ], 2, "The true subject is \"manager\", which is singular. The phrase \"along with his assistants\" does not change the number of the subject; therefore, \"is\" is correct."),
        q(2, "[b]Choose the grammatically correct sentence.[/b]", [
            "Neither of the two answers are correct.",
            "Neither of the two answers is correct.",
            "Neither of the two answers were correct.",
            "Neither of the two answers have been correct."
        ], 1, "\"Neither\" is singular when it refers to each one of two items separately, so it takes the singular verb \"is\"."),
        q(3, "[b]Identify the part containing an error:[/b]\nNo sooner [b](A)[/b] he reached the station [b](B)[/b] than the train left [b](C)[/b] No error [b](D)[/b]", [
            "A",
            "B",
            "C",
            "D"
        ], 1, "After \"No sooner\", auxiliary inversion is required. The correct form is: \"No sooner did he reach the station than the train left.\""),
        q(4, "[b]Choose the correctly spelt word.[/b]", [
            "Accomodation",
            "Acommodation",
            "Accommodation",
            "Acomodation"
        ], 2, "The correct spelling is \"Accommodation\" with double \"c\" and double \"m\"."),
        q(5, "[b]Choose the word nearest in meaning to:[/b]\n[b]Abstruse[/b]", [
            "Simple",
            "Difficult to understand",
            "Friendly",
            "Temporary"
        ], 1, "\"Abstruse\" means difficult to understand or obscure."),
        q(6, "[b]Choose the word opposite in meaning to:[/b]\n[b]Gregarious[/b]", [
            "Sociable",
            "Talkative",
            "Unsociable",
            "Generous"
        ], 2, "\"Gregarious\" means sociable or fond of company. Its opposite is \"unsociable\"."),
        q(7, "[b]Choose the correct passive voice:[/b]\nThey are repairing the bridge.", [
            "The bridge is repaired by them.",
            "The bridge was being repaired by them.",
            "The bridge is being repaired by them.",
            "The bridge has been repaired by them."
        ], 2, "Present continuous active voice changes to present continuous passive voice: \"is/am/are + being + past participle\"."),
        q(8, "[b]Choose the correct indirect speech:[/b]\nHe said, \"I am tired.\"", [
            "He said that he is tired.",
            "He said that he was tired.",
            "He told that he was tired.",
            "He said that I was tired."
        ], 1, "In reported speech, the present tense \"am\" changes to the past tense \"was\" when the reporting verb is in the past."),
        q(9, "[b]Choose the correct meaning of the idiom:[/b]\n[b]To beat around the bush[/b]", [
            "To search carefully",
            "To avoid the main point",
            "To speak angrily",
            "To solve a problem quickly"
        ], 1, "\"To beat around the bush\" means to avoid speaking directly about the main issue."),
        q(10, "[b]Fill in the blank with the correct preposition:[/b]\nYou must comply \\(\\underline{\\hspace{2cm}}\\) the rules.", [
            "to",
            "with",
            "for",
            "by"
        ], 1, "The correct fixed expression is \"comply with\"."),
        q(11, "[b]Choose the correct article:[/b]\nHe is \\(\\underline{\\hspace{2cm}}\\) honest officer.", [
            "a",
            "an",
            "the",
            "no article"
        ], 1, "\"Honest\" begins with a vowel sound because the initial \"h\" is silent, so \"an\" is correct."),
        q(12, "[b]Choose the correct conditional sentence.[/b]", [
            "If I had known, I would help you.",
            "If I knew, I would have helped you.",
            "If I had known, I would have helped you.",
            "If I have known, I would have helped you."
        ], 2, "For an unreal condition in the past, the correct structure is: \"If + past perfect, would have + past participle\"."),
        q(13, "[b]Choose the correctly written sentence.[/b]", [
            "Walking down the road, the wallet was found by me.",
            "Walking down the road, I found a wallet.",
            "The wallet walking down the road was found by me.",
            "I found a wallet walking down the road by me."
        ], 1, "The introductory participial phrase must logically refer to the subject that follows. \"I\" was walking down the road, so option 2 is correct."),
        q(14, "[b]Choose the correct meaning of the phrasal verb:[/b]\n[b]Call off[/b]", [
            "Continue",
            "Cancel",
            "Invite",
            "Remember"
        ], 1, "\"Call off\" means to cancel an event or plan."),
        q(15, "[b]Identify the part of speech of the highlighted word:[/b]\nShe speaks [b]clearly[/b].", [
            "Adjective",
            "Adverb",
            "Noun",
            "Preposition"
        ], 1, "\"Clearly\" modifies the verb \"speaks\", so it is an adverb."),
        q(16, "[b]Choose the best sentence improvement:[/b]\nHardly had he entered the room \\(\\underline{\\hspace{2cm}}\\) the lights went out.", [
            "when",
            "than",
            "then",
            "that"
        ], 0, "\"Hardly\" is followed by \"when\". The correct structure is: \"Hardly had... when...\""),
        q(17, "[b]Choose the correct question tag:[/b]\nHe seldom goes there, \\(\\underline{\\hspace{2cm}}\\)", [
            "does he?",
            "doesn't he?",
            "is he?",
            "has he?"
        ], 0, "\"Seldom\" gives the sentence a negative sense, so the question tag must be positive: \"does he?\""),
        q(18, "[b]Choose the correct determiner:[/b]\nThere are \\(\\underline{\\hspace{2cm}}\\) people in the hall today than yesterday.", [
            "less",
            "few",
            "fewer",
            "least"
        ], 2, "\"People\" is countable, so the comparative determiner \"fewer\" is correct."),
        q(19, "[b]Choose the correct tense:[/b]\nBy next month, she \\(\\underline{\\hspace{2cm}}\\) the course.", [
            "will complete",
            "will have completed",
            "completed",
            "has completed"
        ], 1, "\"By next month\" points to completion before a future time, so the future perfect tense is required."),
        q(20, "[b]Choose the correct relative adverb:[/b]\nThis is the village \\(\\underline{\\hspace{2cm}}\\) I was born.", [
            "which",
            "where",
            "that",
            "whom"
        ], 1, "For a place used as an adverbial reference, \"where\" is the correct choice."),
        q(21, "[b]Choose the correct replacement for the highlighted part:[/b]\nI prefer tea [b]than[/b] coffee.", [
            "to",
            "from",
            "over than",
            "No improvement"
        ], 0, "The verb \"prefer\" takes the preposition \"to\", not \"than\"."),
        q(22, "[b]Choose the correct passive form of the command:[/b]\nOpen the door.", [
            "The door is opened.",
            "Let the door be opened.",
            "The door has been opened.",
            "The door was opened."
        ], 1, "An imperative sentence in passive voice is commonly formed with \"Let + object + be + past participle\"."),
        q(23, "[b]Choose the correct indirect speech:[/b]\nThe teacher said to the students, \"Do not make noise.\"", [
            "The teacher told the students not to make noise.",
            "The teacher said the students do not make noise.",
            "The teacher told the students that do not make noise.",
            "The teacher ordered that students did not make noise."
        ], 0, "A negative imperative is changed into \"told/ordered + object + not to + verb\"."),
        q(24, `${passage}\n\n[b]Question:[/b] According to the passage, reading is an active process because a reader must:`, [
            "memorise every word without thinking",
            "connect ideas and examine the writer's purpose",
            "avoid judging the evidence",
            "collect facts only"
        ], 1, "The passage states that a good reader connects ideas, examines purpose, and judges evidence; therefore, reading is active."),
        q(25, `${passage}\n\n[b]Question:[/b] Which quality is [b]not[/b] mentioned as required for reading?`, [
            "Attention",
            "Patience",
            "Willingness to question",
            "Physical strength"
        ], 3, "The passage mentions attention, patience, and willingness to question. It does not mention physical strength.")
    ];

    window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];
    window.GJU_QUIZ_BANK.push({
        id: quizId,
        subject,
        title: "English Grammar and Comprehension LaTeX Set 1",
        description: "A 25-question English-only quiz for competitive exams with grammar, vocabulary, voice, narration, idioms, and passage-based comprehension.",
        durationMinutes: 25,
        totalQuestions: questions.length,
        marksPerQuestion: 1,
        negativeMarks: 0.25,
        difficulty: "Hard",
        tags: ["English", "Grammar", "Comprehension", "Police", "TET"],
        questions
    });
}());
