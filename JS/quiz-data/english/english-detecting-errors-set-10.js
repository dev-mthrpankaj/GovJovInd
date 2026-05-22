(function () {
    "use strict";

    window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];

    const quizId = "english-detecting-errors-set-10";

    const questions = [
        {
            id: `${quizId}-q01`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Someone, they don’t know",
                "/ who, knocked at",
                "/ their door in midnight",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Change ‘in’ into ‘at’."
        },
        {
            id: `${quizId}-q02`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Mohan leapt",
                "/ on the opportunity",
                "/ that came his way",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘on’ with ‘at’ ‘leapt at an opportunity’."
        },
        {
            id: `${quizId}-q03`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Just as",
                "/ I was entering the room,",
                "/ the family was going for a party",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace ‘going for a party’ with ‘going to a party’."
        },
        {
            id: `${quizId}-q04`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The beautiful, young girl",
                "/ jumped in the river",
                "/ in a state of depression",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘in’ with ‘into’."
        },
        {
            id: `${quizId}-q05`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "There is only one cure",
                "/ to the evils which newly",
                "/ acquired freedom produces and that cure is freedom",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "‘Cure for the evils’ is correct usage."
        },
        {
            id: `${quizId}-q06`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The crime rate increases inspite",
                "/ formal moral education",
                "/ given in schools",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "‘in spite’ is followed by preposition ‘of’."
        },
        {
            id: `${quizId}-q07`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Do not write him of",
                "/ as I feel he still has the fire",
                "/ smouldering in him",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Replace ‘write him of’ with ‘write him off’. ‘Write something off’ means ‘to decide that somebody or thing will not be useful or important’."
        },
        {
            id: `${quizId}-q08`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "You are required to give an explanation for your conduct within two days of the receipt of this letter.",
            options: [
                "No error",
                "for your conduct",
                "within two days of the receipt of this letter",
                "You are required to give an explanation"
            ],
            correctAnswer: 2,
            explanation: "Replace ‘of the receipt of this letter’ with ‘from the receipt of this letter’."
        },
        {
            id: `${quizId}-q09`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Despite the speed in which he was driving he couldn’t reach on time.",
            options: [
                "Despite the speed",
                "No error",
                "in which he was driving",
                "he couldn’t reach on time"
            ],
            correctAnswer: 2,
            explanation: "Replace ‘the speed in which’ with ‘the speed at which’."
        },
        {
            id: `${quizId}-q10`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Everybody wants to enjoy habitual peace in mind.",
            options: [
                "peace in mind",
                "No error",
                "Everybody wants to",
                "enjoy habitual"
            ],
            correctAnswer: 0,
            explanation: "Replace ‘peace in mind’ with ‘peace of mind’. 126.(3) Change ‘be’ into ‘was’. 127.(3) Remove ‘of’. ‘Assure’ is followed by ‘of’ not ‘ensure’. 128.(1) Replace ‘vie to’ with ‘vie with’. ‘Vie’ means ‘compete eagerly with someone in order to do or achieve something’. (gksM+ djuk) Vie with somebody Vie for something. 129.(4) Replace ‘look upon’ with ‘look at’. 130.(4) ‘Marries’ is not followed by any preposition in Active Voice. Hence remove ‘with’. 131.(4) Replace ‘than’ with ‘from’."
        },
        {
            id: `${quizId}-q11`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "There be a long queue for entry into the exhibition ground.",
            options: [
                "for entry into",
                "No error",
                "There be a long queue",
                "the exhibition ground"
            ],
            correctAnswer: 3,
            explanation: "Explanation not clearly extracted from the PDF text layer; please verify once with the source PDF."
        },
        {
            id: `${quizId}-q12`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Until you are in the habit of putting off things you cannot ensure yourself of a good future.",
            options: [
                "No error",
                "the habit of putting off things",
                "you cannot ensure yourself of a good future",
                "Until you are in"
            ],
            correctAnswer: 3,
            explanation: "Explanation not clearly extracted from the PDF text layer; please verify once with the source PDF."
        },
        {
            id: `${quizId}-q13`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Let us vie to one another in doing good.",
            options: [
                "to one another",
                "Let us vie",
                "in doing good",
                "No error"
            ],
            correctAnswer: 3,
            explanation: "Explanation not clearly extracted from the PDF text layer; please verify once with the source PDF."
        },
        {
            id: `${quizId}-q14`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "He looked upon me eye to eye for a few moments before he spoke.",
            options: [
                "before he spoke",
                "No error",
                "eye to eye for a few moments",
                "He looked upon me"
            ],
            correctAnswer: 3,
            explanation: "Explanation not clearly extracted from the PDF text layer; please verify once with the source PDF."
        },
        {
            id: `${quizId}-q15`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "As per the invitation card Rahim marries with Sayra on 13th December, Monday.",
            options: [
                "As per the invitation card",
                "No error",
                "on 13th December, Monday",
                "Rahim marries with Sayra"
            ],
            correctAnswer: 3,
            explanation: "Explanation not clearly extracted from the PDF text layer; please verify once with the source PDF."
        },
        {
            id: `${quizId}-q16`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "This book is different than that.",
            options: [
                "is different",
                "This book",
                "No error",
                "than that"
            ],
            correctAnswer: 3,
            explanation: "Explanation not clearly extracted from the PDF text layer; please verify once with the source PDF."
        },
        {
            id: `${quizId}-q17`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "You must abide on",
                "/ the terms of",
                "/ this government",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Replace ‘on’ with ‘by’. Abide by something means ‘act according to rule’. 133.(2) ‘Put off’ means ‘to postpone something’. Hence replace ‘of’ with ‘off’."
        },
        {
            id: `${quizId}-q18`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "They had to put of the garden party because of the heavy rain.",
            options: [
                "They had to",
                "put of the garden party",
                "No error",
                "because ofthe heavy rain"
            ],
            correctAnswer: 3,
            explanation: "Explanation not clearly extracted from the PDF text layer; please verify once with the source PDF."
        },
        {
            id: `${quizId}-q19`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "He stated that",
                "/ he prefers",
                "/ tea than coffee",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace ‘than’ with ‘to’. ‘Prefers’ is mostly followed by preposition ‘to’."
        },
        {
            id: `${quizId}-q20`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The baby was",
                "/ clinging with her",
                "/ mother in fear",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Replace ‘clinging with her’ with ‘clinging to her’. ‘Clinging ’ takes Preposition ‘to’ with ‘it’."
        },
        {
            id: `${quizId}-q21`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "I was taken by surprise",
                "/ when I came",
                "/ face to face with my school friend",
                "No error"
            ],
            correctAnswer: 3,
            explanation: "No error"
        },
        {
            id: `${quizId}-q22`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "India is in no way",
                "/ inferior than China in",
                "/ any aspect whatsoever",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "'Superior', 'inferior' and all adjectives that end in 'ior' are followed by 'to'."
        },
        {
            id: `${quizId}-q23`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Those who are averse with (A) / hard work, will (B) / seldom succeed in life. (C) / No error. (D)",
            options: [
                "Part (1)",
                "Part (2)",
                "Part (3)",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "'Averse' is followed by 'to'."
        },
        {
            id: `${quizId}-q24`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "He says that",
                "/ he has done engineering",
                "/ besides an MBA",
                "No error"
            ],
            correctAnswer: 3,
            explanation: "Here 'Besides' means – 'in addition to'."
        },
        {
            id: `${quizId}-q25`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Please put on a note",
                "/ declaring that",
                "/ Monday will be a holiday",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Change 'on' into 'in'. 'Put on' means 'to cover something' or 'to wear'. 'Put in' means 'to make an official request'."
        },
        {
            id: `${quizId}-q26`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "We are pleased that",
                "/ our daughter is married with",
                "/ such a nice man",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "In passive voice ‘married’ is followed by preposition ‘to’."
        },
        {
            id: `${quizId}-q27`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Entrance exams for the",
                "/ posts of associate professors",
                "/ will begin from Tuesday",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Change ‘from’ into ‘on’. Days take ‘on’ with them."
        },
        {
            id: `${quizId}-q28`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "I told to the coach",
                "/ that I won't be able",
                "/ to come for the practice",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "‘To’ should not be used with told as said to = told. So 'to' after told is superfluous."
        },
        {
            id: `${quizId}-q29`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Although of good",
                "/ rains the production",
                "/ of food grains fell",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "'In spite of', 'despite' and 'although' all are used to show a contrast but there are difference in the structures used with them. After 'in spite of' and 'despite' we use 'a noun' or 'a pronoun' and after 'although' we use 'a subject' and 'a verb'. Here 'rains' is a noun hence In spite of / despite will come."
        },
        {
            id: `${quizId}-q30`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "In summer, the ponds",
                "/ just dry down",
                "/ in the scorching heat",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "'Dry up' means '(of something perceived as a continuous flow or source) decrease and stop'. 'Dry down' means '(in perfumery) to most persistent or lingering element of a fragrance, remaining after the perfume has dried on the skin'. Thus replace 'dry down' with 'dry up'."
        },
        {
            id: `${quizId}-q31`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The stock was",
                "/ divided among",
                "/ the two brothers",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "'Between' is used in reference to two. 'Among' is used for more than two. Hence replace ‘among’ with ‘between’."
        },
        {
            id: `${quizId}-q32`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The kitten sat up",
                "/ the glass roof, and yawned",
                "/ and blinked its round eyes",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Phrasal verb 'sit up' means 'to sit with a straight back'. Here the correct phrase would be 'sat down upon'."
        },
        {
            id: `${quizId}-q33`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Maya was not promoted to",
                "/ the post of a manager",
                "/ till for a few months of her resignation",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Change 'till for' into 'even before' to give a proper meaning to the sentence."
        },
        {
            id: `${quizId}-q34`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "He woke on, rising",
                "/ to a sitting position",
                "/ and rubbed his eyes briskly",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Change 'on' into 'up'. 'Wake up' means 'to arise' (tkxtkuk)"
        },
        {
            id: `${quizId}-q35`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "There was already a sizable",
                "/ gap between her car and",
                "/ the one front of her",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "The correct preposition is 'in front of'."
        },
        {
            id: `${quizId}-q36`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "For kindergarten children, /",
            options: [
                "drawing by crayons is always",
                "/ even more preferable than sketch pens",
                "No error",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "'Preferable' already means 'more desirable'. It is redundant to write more and most preferable. Preferable is followed by preposition 'to'. Hence replace 'More preferable than' with 'preferable to'"
        },
        {
            id: `${quizId}-q37`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The two children were",
                "/ identical except for",
                "/ the colour for their eyes",
                "No error"
            ],
            correctAnswer: 3,
            explanation: "No error"
        },
        {
            id: `${quizId}-q38`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "You should never look",
                "/ down to a man merely",
                "/ because he is poor",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Correct phrase is 'look down upon'. It means ‘to consider someone or something inferior’."
        },
        {
            id: `${quizId}-q39`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The traveller took rest",
                "/ below the shade",
                "/ of a large Peepal tree",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "We take rest 'in the shade of tree' not 'below the shade of tree'."
        },
        {
            id: `${quizId}-q40`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The Directors are",
                "/ now inquiring",
                "/ in the cause of the fire",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "'Inquire about' is a phrasal verb which means 'to seek information'. Hence replace 'in' with 'about'."
        },
        {
            id: `${quizId}-q41`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The substitution of cream",
                "/ instead of milk in the recipe",
                "/ makes for a rich dessert",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "‘Substitution of cream for milk’ is the correct formation."
        },
        {
            id: `${quizId}-q42`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "She decided to drink",
                "/ water instead of soft drinks",
                "/ in order to lose weight",
                "No error"
            ],
            correctAnswer: 3,
            explanation: "No error."
        },
        {
            id: `${quizId}-q43`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "You want to stay",
                "/ with him, in spite",
                "/ off what he did?",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Correct phrase is 'in spite of'."
        },
        {
            id: `${quizId}-q44`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "The airplane took",
                "/ of as soon as I",
                "/ arrived at the airport",
                "No error"
            ],
            correctAnswer: 1,
            explanation: "Phrasal verb 'take off' means 'to leave the surface'. Replace preposition 'of ' with 'off '."
        },
        {
            id: `${quizId}-q45`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "This is in between",
                "/ you and me, not",
                "/ the entire neighbourhood",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Remove 'in'."
        },
        {
            id: `${quizId}-q46`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "Her heart was",
                "/ pounding as he",
                "/ stopped front of her",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Correct phrase is ‘in front of’."
        },
        {
            id: `${quizId}-q47`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "I want to exchange",
                "/ my Maruri",
                "/ from a Santro",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace 'from' with 'with' or 'for'"
        },
        {
            id: `${quizId}-q48`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "I was pretty sure that",
                "/ he would support me",
                "/ for changing the age- old and static structure of our organization",
                "No error"
            ],
            correctAnswer: 2,
            explanation: "Replace 'for' with 'in'. 164 (3) Replace 'from' with 'to'. Succumbed (fail to resist – gkjtkuk) takes preposition 'to'."
        },
        {
            id: `${quizId}-q49`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "According to one survey",
                "/ only those forests which were",
                "/ not under village management succumbed from fires recently",
                "No error"
            ],
            correctAnswer: 3,
            explanation: "Explanation not clearly extracted from the PDF text layer; please verify once with the source PDF."
        },
        {
            id: `${quizId}-q50`,
            topic: "Detecting Errors",
            difficulty: "hard",
            question: "Select the part which contains an error in the sentence.",
            options: [
                "We now look forward for",
                "/ some great achievements",
                "/ which to some extent can restore the country's prestige once again",
                "No error"
            ],
            correctAnswer: 0,
            explanation: "Replace 'for' with 'to'. 'Look forward to' means to feel happy and excited about something that is going to happen."
        }
    ];

    window.GJU_QUIZ_BANK.push({
        id: quizId,
        title: "English Detecting Errors Practice Set 10",
        subject: "English",
        difficulty: "Hard",
        questions
    });
})();