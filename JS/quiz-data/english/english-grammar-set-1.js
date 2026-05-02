(function () {
    "use strict";

    window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];

    const quizId = "english-grammar-set-1";
    const seeds = [
        { topic: "Voice", difficulty: "medium", question: "Identify the sentence in passive voice.", options: ["The caterpillar sheds its rigid exoskeleton.", "The metamorphosis of a butterfly epitomizes transformation.", "The caterpillar's structures are enzymatically dismantled.", "The butterfly inflates its wings with hemolymph."], correctAnswer: 2, explanation: "Passive voice uses 'be' verb + past participle." },
        { topic: "Clause", difficulty: "medium", question: "Which sentence contains a relative clause?", options: ["its crumpled wings need to be inflated.", "Eggs are often hidden on the underside of leaves.", "A caterpillar devours foliage to fuel its growth.", "The larva, which undergoes multiple molts, grows rapidly."], correctAnswer: 3, explanation: "The clause starting with 'which' is a relative clause." },
        { topic: "Etymology", difficulty: "hard", question: "Which word is formed with a Greek-origin suffix meaning 'formation' or 'origin'?", options: ["Metamorphosis", "Chrysalis", "Hemolymph", "Histogenesis"], correctAnswer: 3, explanation: "-genesis means origin or formation." },
        { topic: "Biology/Reading", difficulty: "medium", question: "What crucial biological activity occurs within the chrysalis?", options: ["Strengthening of the caterpillar's exoskeleton", "Rebuilding of the caterpillar into a butterfly through histogenesis", "Increase in leaf consumption", "Inflammation of butterfly wings"], correctAnswer: 1, explanation: "The passage describes the reconstruction process inside the chrysalis." },
        { topic: "Vocabulary", difficulty: "medium", question: "Choose the word nearest in meaning to 'ephemeral'.", options: ["Everlasting", "Transient", "Powerful", "Fragile"], correctAnswer: 1, explanation: "Ephemeral means lasting for a very short time." },
        { topic: "Substitution", difficulty: "medium", question: "Rohan could not resist stealing small items. What is he likely to be called?", options: ["philanthropist", "kleptomaniac", "pessimist", "hypochondriac"], correctAnswer: 1, explanation: "A kleptomaniac has an irresistible urge to steal." },
        { topic: "Substitution", difficulty: "medium", question: "The politician was caught in a corruption scandal. Which word best describes this conduct?", options: ["integrity", "hypocrisy", "modesty", "generosity"], correctAnswer: 1, explanation: "Hypocrisy is pretending to have virtues one does not possess." },
        { topic: "Article", difficulty: "medium", question: "Fill in the blank: There was scarcely ___ hope left after multiple failures.", options: ["a", "an", "the", "no article"], correctAnswer: 3, explanation: "Hope is an uncountable noun here used in a general sense after 'scarcely'." },
        { topic: "Article", difficulty: "medium", question: "Fill in the blank: Had he possessed ___ foresight to anticipate such eventualities...", options: ["a", "an", "the", "no article"], correctAnswer: 2, explanation: "Specific foresight requires the definite article 'the'." },
        { topic: "Phrasal Verb", difficulty: "medium", question: "Replace the highlighted phrase: The thieves managed to 'get off' the police.", options: ["get away from", "get along with", "get over", "get through"], correctAnswer: 0, explanation: "To escape is to 'get away from'." },
        { topic: "Para Jumble", difficulty: "hard", question: "Arrange the sentences logically: 1. Ecosystems collapse 2. Concept by Robert Paine 3. Keystone species role 4. Sea otters example 5. Idea revolutionized ecology", options: ["1-3-2-4-5", "3-2-5-4-1", "4-3-2-5-1", "5-2-3-1-4"], correctAnswer: 1, explanation: "Starts with the definition (3), history (2), impact (5), example (4), and warning (1)." },
        { topic: "Synonym", difficulty: "easy", question: "Select the synonym of FRUGAL.", options: ["Lavish", "Thrifty", "Extravagant", "Wasteful"], correctAnswer: 1, explanation: "Thrifty means using money and resources carefully." },
        { topic: "Antonym", difficulty: "easy", question: "Select the antonym of Obstinate.", options: ["Adamant", "Stubborn", "Pliable", "Headstrong"], correctAnswer: 2, explanation: "Pliable means easily influenced or flexible; the opposite of stubborn." },
        { topic: "Antonym", difficulty: "medium", question: "Select the antonym of Superfluous.", options: ["Redundant", "Unnecessary", "Essential", "Extra"], correctAnswer: 2, explanation: "Essential means necessary, whereas superfluous means unnecessary." },
        { topic: "Synonym", difficulty: "hard", question: "Select the synonym of INTRANSIGENCE.", options: ["Obedience", "Stubbornness", "Submission", "Compliance"], correctAnswer: 1, explanation: "Intransigence is the refusal to change one's views." },
        { topic: "Synonym", difficulty: "easy", question: "Select the synonym of MELANCHOLY.", options: ["Excitement", "Joy", "Aloof", "Sadness"], correctAnswer: 3, explanation: "Melancholy is a feeling of pensive sadness." },
        { topic: "Idiom", difficulty: "medium", question: "Choose the meaning of the idiom 'not worth his salt'.", options: ["Lacking in courage", "Unable to learn", "Too proud to work", "Undeserving of the pay/respect"], correctAnswer: 3, explanation: "This idiom refers to someone who is not worth their wages." },
        { topic: "Antonym", difficulty: "hard", question: "Select the antonym of Propitiate.", options: ["Appease", "Mollify", "Placate", "Enrage"], correctAnswer: 3, explanation: "Propitiate means to win favor; enrage is the opposite." },
        { topic: "Spelling", difficulty: "medium", question: "Choose the correct spelling for a rule or principle.", options: ["Axiom", "Axion", "Axom", "Axiome"], correctAnswer: 0, explanation: "Axiom is the correct spelling." },
        { topic: "Spelling", difficulty: "hard", question: "Choose the correct spelling for 'questioning everything'.", options: ["Pyrrhonism", "Pyrhonism", "Pyrhhonism", "Pirronism"], correctAnswer: 0, explanation: "Pyrrhonism is named after Pyrrho." },
        { topic: "Spelling", difficulty: "hard", question: "Choose the correct spelling for 'charitable'.", options: ["Elemosynary", "Eleemosynary", "Eleemosinary", "Elemosynery"], correctAnswer: 1, explanation: "Eleemosynary is the correct Greek-derived spelling." },
        { topic: "Substitution", difficulty: "hard", question: "What is the term for attributing human traits to non-humans?", options: ["Zoomorphism", "Theomorphism", "Anthropomorphism", "Animism"], correctAnswer: 2, explanation: "Anthropos (human) + morph (form)." },
        { topic: "Cloze Test", difficulty: "hard", question: "Choose the best word for Blank 1: subjectivity is increasingly (1) by ambient infrastructures...", options: ["foreclosed", "automated", "colonized", "mediated"], correctAnswer: 2, explanation: "As per the passage, 'colonized' is the provided answer." },
        { topic: "Cloze Test", difficulty: "hard", question: "Choose the best word for Blank 2: finds itself (2) under the weight of distributed cognition...", options: ["undermined", "valorized", "suspended", "superseded"], correctAnswer: 0, explanation: "Undermined fits the context of weakening the ideal." },
        { topic: "Cloze Test", difficulty: "hard", question: "Choose the best word for Blank 3: (3) node in a machinic interpellation...", options: ["recursive", "relational", "datafied", "dormant"], correctAnswer: 2, explanation: "Datafied refers to the conversion into data nodes." },
        { topic: "Cloze Test", difficulty: "hard", question: "Choose the best word for Blank 4: risk being (4) by the very systems...", options: ["co-opted", "invalidated", "misread", "repelled"], correctAnswer: 0, explanation: "Co-opted means taken over for use by the system." },
        { topic: "Cloze Test", difficulty: "hard", question: "Choose the best word for Blank 5: terrain of the political itself becomes (5)...", options: ["antagonistic", "performative", "exhausted", "illegible"], correctAnswer: 1, explanation: "Performative suggests it becomes a simulation or act." },
        { topic: "Grammar", difficulty: "medium", question: "Choose the correct option: No other candidate is ___ qualified for the role as she is.", options: ["So", "Such", "More", "as"], correctAnswer: 0, explanation: "In negative comparisons, 'so...as' is preferred." },
        { topic: "Inversion", difficulty: "hard", question: "Choose the correct phrase: At no point during the trial ___ his composure.", options: ["he lost", "had he lost", "did he lose", "lost he"], correctAnswer: 2, explanation: "Negative adverbials at the start require inversion (did he lose)." },
        { topic: "Error Spotting", difficulty: "medium", question: "Identify the error: ...overlooks the impact (3)/ on a environment (4).", options: ["1", "2", "3", "4"], correctAnswer: 3, explanation: "It should be 'the environment' or 'an environment' (though 'the' is standard)." },
        { topic: "Error Spotting", difficulty: "hard", question: "Identify the error: The report... (2)/ were eventually uploaded (3)...", options: ["1", "2", "3", "4"], correctAnswer: 2, explanation: "Subject 'The report' is singular, so it should be 'was'." },
        { topic: "Error Spotting", difficulty: "hard", question: "Identify the error: If she be found guilty (1)/ ... reserves the right (2)...", options: ["1", "2", "3", "4"], correctAnswer: 0, explanation: "In conditional, 'If she is found' or 'Should she be' is standard." },
        { topic: "Voice", difficulty: "medium", question: "Choose the passive voice form of: They are watching the match live.", options: ["The match is watched live.", "The match is being watched live.", "The match has been watched live.", "The match was being watched live."], correctAnswer: 1, explanation: "Present continuous passive: is/am/are + being + V3." },
        { topic: "Voice", difficulty: "medium", question: "Choose the passive voice form of: The architect is designing a bridge.", options: ["A bridge has been designed.", "A bridge was designed.", "A bridge is being designed.", "A bridge will be designed."], correctAnswer: 2, explanation: "Continuous tense requires 'being'." },
        { topic: "Voice", difficulty: "hard", question: "Choose the passive voice form of: The agency had been monitoring dissent groups.", options: ["Dissent groups had covertly monitored agency.", "Dissent groups had been monitored by agency.", "Covert monitoring occurred.", "Groups were under surveillance."], correctAnswer: 1, explanation: "Past perfect continuous uses 'had been monitored'." },
        { topic: "Homonym", difficulty: "hard", question: "Select the sentence that uses 'chancel' in a different context.", options: ["The chancel was elevated.", "The concert began in chancel.", "The builder reinforced chancel arch.", "The chemist analyzed a synthetic chancel."], correctAnswer: 3, explanation: "Option D uses chancel in a different (scientific) context." },
        { topic: "Homonym", difficulty: "hard", question: "Select the sentence that uses 'siglum' in a different context.", options: ["Editor inserted the siglum.", "The lab technician cleaned the siglum.", "Scholar decoded each siglum.", "Margin displayed a siglum."], correctAnswer: 1, explanation: "Option B uses it in a lab context, distinct from manuscript notation." },
        { topic: "Homonym", difficulty: "hard", question: "Select the sentence that uses 'mensa' in a different context.", options: ["Mason lifted the mensa into place.", "Altar's mensa was covered.", "Bishop prayed before the mensa.", "Relics were sealed beneath mensa."], correctAnswer: 0, explanation: "Option A refers to a structural/masonry context." },
        { topic: "Voice", difficulty: "medium", question: "Choose the active voice form of: The matter is being investigated by the committee.", options: ["The committee investigates.", "The committee had investigated.", "The committee is investigating.", "The committee has been investigating."], correctAnswer: 2, explanation: "Passive 'is being' becomes active 'is investigating'." },
        { topic: "Voice", difficulty: "medium", question: "Choose the active voice form of: The law is supposed to be enforced strictly.", options: ["The law enforces itself.", "Someone strictly enforced the law.", "Authorities are supposed to enforce the law.", "Strict enforcement is supposed."], correctAnswer: 2, explanation: "Adding a logical subject 'Authorities' for active voice." },
        { topic: "Sentence Improvement", difficulty: "medium", question: "Choose the best replacement for the highlighted word: He is blind 'from' one eye.", options: ["blind with one eye", "blind in one eye", "blind on one eye", "blind by one eye"], correctAnswer: 1, explanation: "The correct preposition is 'blind in'." },
        { topic: "Sentence Improvement", difficulty: "medium", question: "Choose the best replacement for the highlighted phrase: It is high time you 'must go' home.", options: ["must went home", "go home", "went home", "going home"], correctAnswer: 2, explanation: "After 'It is high time', use past simple." },
        { topic: "Sentence Improvement", difficulty: "medium", question: "Choose the best replacement for the highlighted word: The news 'are' too good to be true.", options: ["is very good", "is too good to be true", "are so good", "is so good"], correctAnswer: 1, explanation: "'News' is a singular noun." },
        { topic: "Narration", difficulty: "medium", question: "Choose the direct speech form of: She said that she would arrive before noon.", options: ["She said, 'I shall arrive before noon.'", "She said, 'I will have arrived before noon.'", "She said, 'I would arrive before noon.'", "She said, 'I had arrived before noon.'"], correctAnswer: 2, explanation: "Option C matches the structure in the provided key." },
        { topic: "Narration", difficulty: "hard", question: "Choose the direct speech conversion of: The primatologist pointed out that grooming would diminish...", options: ["The primatologist said, 'Grooming behaviour would diminish...'", "The primatologist said, 'Grooming behaviour will be diminished...'", "The primatologist said, 'If it had been...'", "The primatologist said, '...must diminish.'"], correctAnswer: 0, explanation: "Matches the exact structure provided in the PDF." },
        { topic: "Narration", difficulty: "easy", question: "Choose the indirect speech form of: Mother said, 'Don't touch the stove.'", options: ["Mother said not to touch the stove.", "Mother said do not touch the stove.", "Mother told that don't touch.", "Mother told not to touching."], correctAnswer: 0, explanation: "Imperative negative becomes 'not to' + verb." },
        { topic: "Narration", difficulty: "easy", question: "Choose the indirect speech form of: He said, 'I am not feeling well today.'", options: ["He said he is not feeling well today.", "He said he was not feeling well that day.", "He said that I was not feeling well today.", "He told that he not feeling well."], correctAnswer: 1, explanation: "'today' becomes 'that day' and 'am' becomes 'was'." },
        { topic: "Narration", difficulty: "medium", question: "Choose the indirect speech form of: She said, 'If only I hadn't trusted him!'", options: ["She had regret that she had trusted him.", "She said that she wished she hadn't trusted him.", "She said if only she hadn't trusted him.", "She wished she didn't trust him."], correctAnswer: 1, explanation: "Exclamatory/wish sentences use 'wished' or 'regretted'." },
        { topic: "Preposition", difficulty: "medium", question: "Fill in the blank: He is accustomed ___ rising early.", options: ["to", "for", "with", "at"], correctAnswer: 0, explanation: "'Accustomed to' is a fixed phrase followed by a gerund." },
        { topic: "Vocabulary", difficulty: "medium", question: "Select the word that means 'a person who hates mankind'.", options: ["Misanthrope", "Misogynist", "Philanthropist", "Optimist"], correctAnswer: 0, explanation: "'Mis' (hate) + 'anthropos' (man/human)." }
    ];

    function formatQuestionText(question, variantIndex) {
        const text = String(question).trim();
        if (variantIndex === 0) return text;

        const variant = (variantIndex - 1) % 4;
        const instructionPatterns = [
            { pattern: /^Choose\b/i, verbs: ["Select", "Pick", "Mark", "Identify"] },
            { pattern: /^Select\b/i, verbs: ["Choose", "Pick", "Mark", "Identify"] },
            { pattern: /^Identify\b/i, verbs: ["Find", "Select", "Choose", "Mark"] },
            { pattern: /^Find\b/i, verbs: ["Determine", "Select", "Choose", "Mark"] },
            { pattern: /^Fill in the blank\b/i, verbs: ["Complete the sentence", "Choose the option that completes the sentence", "Select the option that fits the blank", "Mark the option that fits the blank"] }
        ];
        const matchedInstruction = instructionPatterns.find((item) => item.pattern.test(text));

        if (matchedInstruction) {
            return text.replace(matchedInstruction.pattern, matchedInstruction.verbs[variant]);
        }

        const prefixes = [
            "Select the correct answer: ",
            "Choose the most appropriate option: ",
            "Mark the correct response: ",
            "Answer the following: "
        ];

        return `${prefixes[variant]}${text}`;
    }
    function buildQuestions() {
        const questions = [];
        for (let index = 0; index < 50; index += 1) {
            const seed = seeds[index % seeds.length];
            const number = index + 1;
            const variantIndex = Math.floor(index / seeds.length);
            questions.push({
                id: `${quizId}-q${String(number).padStart(2, "0")}`,
                topic: seed.topic,
                difficulty: seed.difficulty,
                question: formatQuestionText(seed.question, variantIndex),
                options: seed.options.slice(),
                correctAnswer: seed.correctAnswer,
                explanation: seed.explanation
            });
        }
        return questions;
    }

    window.GJU_QUIZ_BANK.push({
        id: quizId,
        subject: "English",
        title: "English Grammar Practice Set 1",
        description: "50 grammar questions for SSC, Railway and Police exams.",
        durationMinutes: 30,
        totalQuestions: 50,
        marksPerQuestion: 1,
        negativeMarks: 0.25,
        difficulty: "Mixed",
        tags: ["SSC", "Railway", "Police"],
        questions: buildQuestions()
    });
}());
