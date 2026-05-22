(function () {
    "use strict";

    window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];

    const quizId = "hindi-ling-up-police-set-2";

    const questions = [
        {
            id: `${quizId}-q01`,
            topic: "लिंग",
            difficulty: "hard",
            question: "‘राजा’ का स्त्रीलिंग रूप चुनिए। (प्रश्न प्रकार 3)",
            options: [
                "रानी",
                "कवयित्री",
                "वधू",
                "सेविका"
            ],
            correctAnswer: 0,
            explanation: "‘राजा’ का स्त्रीलिंग ‘रानी’ है।"
        },
        {
            id: `${quizId}-q02`,
            topic: "लिंग",
            difficulty: "hard",
            question: "‘घोड़ा’ का स्त्रीलिंग रूप चुनिए। (प्रश्न प्रकार 3)",
            options: [
                "बूढ़ी",
                "घोड़ी",
                "स्वामिनी",
                "गायिका"
            ],
            correctAnswer: 1,
            explanation: "‘घोड़ा’ का स्त्रीलिंग ‘घोड़ी’ है।"
        },
        {
            id: `${quizId}-q03`,
            topic: "लिंग",
            difficulty: "hard",
            question: "‘देव’ का स्त्रीलिंग रूप चुनिए। (प्रश्न प्रकार 3)",
            options: [
                "वधू",
                "पुत्री",
                "देवी",
                "शेरनी"
            ],
            correctAnswer: 2,
            explanation: "‘देव’ का स्त्रीलिंग ‘देवी’ है।"
        },
        {
            id: `${quizId}-q04`,
            topic: "लिंग",
            difficulty: "hard",
            question: "‘अध्यापक’ का स्त्रीलिंग रूप चुनिए। (प्रश्न प्रकार 4)",
            options: [
                "नायिका",
                "शेरनी",
                "वधू",
                "अध्यापिका"
            ],
            correctAnswer: 3,
            explanation: "‘अध्यापक’ का स्त्रीलिंग ‘अध्यापिका’ है।"
        },
        {
            id: `${quizId}-q05`,
            topic: "लिंग",
            difficulty: "hard",
            question: "‘पुत्र’ का स्त्रीलिंग रूप चुनिए। (प्रश्न प्रकार 4)",
            options: [
                "पुत्री",
                "अध्यापिका",
                "धोबिन",
                "बूढ़ी"
            ],
            correctAnswer: 0,
            explanation: "‘पुत्र’ का स्त्रीलिंग ‘पुत्री’ है।"
        },
        {
            id: `${quizId}-q06`,
            topic: "लिंग",
            difficulty: "hard",
            question: "‘धोबी’ का स्त्रीलिंग रूप चुनिए। (प्रश्न प्रकार 4)",
            options: [
                "सेविका",
                "धोबिन",
                "कवयित्री",
                "वधू"
            ],
            correctAnswer: 1,
            explanation: "‘धोबी’ का स्त्रीलिंग ‘धोबिन’ है।"
        },
        {
            id: `${quizId}-q07`,
            topic: "लिंग",
            difficulty: "hard",
            question: "‘कवि’ का स्त्रीलिंग रूप चुनिए। (प्रश्न प्रकार 4)",
            options: [
                "सेविका",
                "गायिका",
                "कवयित्री",
                "स्वामिनी"
            ],
            correctAnswer: 2,
            explanation: "‘कवि’ का स्त्रीलिंग ‘कवयित्री’ है।"
        },
        {
            id: `${quizId}-q08`,
            topic: "लिंग",
            difficulty: "hard",
            question: "‘गायक’ का स्त्रीलिंग रूप चुनिए। (प्रश्न प्रकार 4)",
            options: [
                "धोबिन",
                "सेविका",
                "घोड़ी",
                "गायिका"
            ],
            correctAnswer: 3,
            explanation: "‘गायक’ का स्त्रीलिंग ‘गायिका’ है।"
        },
        {
            id: `${quizId}-q09`,
            topic: "लिंग",
            difficulty: "hard",
            question: "‘शेर’ का स्त्रीलिंग रूप चुनिए। (प्रश्न प्रकार 4)",
            options: [
                "शेरनी",
                "देवी",
                "पुत्री",
                "पंडिताइन"
            ],
            correctAnswer: 0,
            explanation: "‘शेर’ का स्त्रीलिंग ‘शेरनी’ है।"
        },
        {
            id: `${quizId}-q10`,
            topic: "लिंग",
            difficulty: "hard",
            question: "‘बूढ़ा’ का स्त्रीलिंग रूप चुनिए। (प्रश्न प्रकार 4)",
            options: [
                "वधू",
                "बूढ़ी",
                "मालिन",
                "सेविका"
            ],
            correctAnswer: 1,
            explanation: "‘बूढ़ा’ का स्त्रीलिंग ‘बूढ़ी’ है।"
        },
        {
            id: `${quizId}-q11`,
            topic: "लिंग",
            difficulty: "hard",
            question: "‘नायक’ का स्त्रीलिंग रूप चुनिए। (प्रश्न प्रकार 4)",
            options: [
                "देवी",
                "शेरनी",
                "नायिका",
                "सेविका"
            ],
            correctAnswer: 2,
            explanation: "‘नायक’ का स्त्रीलिंग ‘नायिका’ है।"
        },
        {
            id: `${quizId}-q12`,
            topic: "लिंग",
            difficulty: "hard",
            question: "‘बालक’ का स्त्रीलिंग रूप चुनिए। (प्रश्न प्रकार 4)",
            options: [
                "नायिका",
                "पुत्री",
                "पंडिताइन",
                "बालिका"
            ],
            correctAnswer: 3,
            explanation: "‘बालक’ का स्त्रीलिंग ‘बालिका’ है।"
        },
        {
            id: `${quizId}-q13`,
            topic: "लिंग",
            difficulty: "hard",
            question: "‘माली’ का स्त्रीलिंग रूप चुनिए। (प्रश्न प्रकार 4)",
            options: [
                "मालिन",
                "शेरनी",
                "पंडिताइन",
                "बालिका"
            ],
            correctAnswer: 0,
            explanation: "‘माली’ का स्त्रीलिंग ‘मालिन’ है।"
        },
        {
            id: `${quizId}-q14`,
            topic: "लिंग",
            difficulty: "hard",
            question: "‘स्वामी’ का स्त्रीलिंग रूप चुनिए। (प्रश्न प्रकार 4)",
            options: [
                "कवयित्री",
                "स्वामिनी",
                "बूढ़ी",
                "धोबिन"
            ],
            correctAnswer: 1,
            explanation: "‘स्वामी’ का स्त्रीलिंग ‘स्वामिनी’ है।"
        },
        {
            id: `${quizId}-q15`,
            topic: "लिंग",
            difficulty: "hard",
            question: "‘सेवक’ का स्त्रीलिंग रूप चुनिए। (प्रश्न प्रकार 4)",
            options: [
                "बालिका",
                "देवी",
                "सेविका",
                "वधू"
            ],
            correctAnswer: 2,
            explanation: "‘सेवक’ का स्त्रीलिंग ‘सेविका’ है।"
        },
        {
            id: `${quizId}-q16`,
            topic: "लिंग",
            difficulty: "hard",
            question: "‘वर’ का स्त्रीलिंग रूप चुनिए। (प्रश्न प्रकार 4)",
            options: [
                "गायिका",
                "बालिका",
                "मालिन",
                "वधू"
            ],
            correctAnswer: 3,
            explanation: "‘वर’ का स्त्रीलिंग ‘वधू’ है।"
        },
        {
            id: `${quizId}-q17`,
            topic: "लिंग",
            difficulty: "hard",
            question: "‘पंडित’ का स्त्रीलिंग रूप चुनिए। (प्रश्न प्रकार 4)",
            options: [
                "पंडिताइन",
                "अध्यापिका",
                "शेरनी",
                "सेविका"
            ],
            correctAnswer: 0,
            explanation: "‘पंडित’ का स्त्रीलिंग ‘पंडिताइन’ है।"
        },
        {
            id: `${quizId}-q18`,
            topic: "लिंग",
            difficulty: "hard",
            question: "‘लेखक’ का स्त्रीलिंग रूप चुनिए। (प्रश्न प्रकार 3)",
            options: [
                "बूढ़ी",
                "लेखिका",
                "पंडिताइन",
                "रानी"
            ],
            correctAnswer: 1,
            explanation: "‘लेखक’ का स्त्रीलिंग ‘लेखिका’ है।"
        },
        {
            id: `${quizId}-q19`,
            topic: "लिंग",
            difficulty: "hard",
            question: "‘राजा’ का स्त्रीलिंग रूप चुनिए। (प्रश्न प्रकार 4)",
            options: [
                "नायिका",
                "बालिका",
                "रानी",
                "घोड़ी"
            ],
            correctAnswer: 2,
            explanation: "‘राजा’ का स्त्रीलिंग ‘रानी’ है।"
        },
        {
            id: `${quizId}-q20`,
            topic: "लिंग",
            difficulty: "hard",
            question: "‘घोड़ा’ का स्त्रीलिंग रूप चुनिए। (प्रश्न प्रकार 4)",
            options: [
                "देवी",
                "कवयित्री",
                "धोबिन",
                "घोड़ी"
            ],
            correctAnswer: 3,
            explanation: "‘घोड़ा’ का स्त्रीलिंग ‘घोड़ी’ है।"
        },
        {
            id: `${quizId}-q21`,
            topic: "लिंग",
            difficulty: "hard",
            question: "‘देव’ का स्त्रीलिंग रूप चुनिए। (प्रश्न प्रकार 4)",
            options: [
                "देवी",
                "धोबिन",
                "कवयित्री",
                "लेखिका"
            ],
            correctAnswer: 0,
            explanation: "‘देव’ का स्त्रीलिंग ‘देवी’ है।"
        },
        {
            id: `${quizId}-q22`,
            topic: "लिंग",
            difficulty: "hard",
            question: "‘अध्यापक’ का स्त्रीलिंग रूप चुनिए। (प्रश्न प्रकार 5)",
            options: [
                "गायिका",
                "अध्यापिका",
                "बालिका",
                "घोड़ी"
            ],
            correctAnswer: 1,
            explanation: "‘अध्यापक’ का स्त्रीलिंग ‘अध्यापिका’ है।"
        },
        {
            id: `${quizId}-q23`,
            topic: "लिंग",
            difficulty: "hard",
            question: "‘पुत्र’ का स्त्रीलिंग रूप चुनिए। (प्रश्न प्रकार 5)",
            options: [
                "बूढ़ी",
                "अध्यापिका",
                "पुत्री",
                "स्वामिनी"
            ],
            correctAnswer: 2,
            explanation: "‘पुत्र’ का स्त्रीलिंग ‘पुत्री’ है।"
        },
        {
            id: `${quizId}-q24`,
            topic: "लिंग",
            difficulty: "hard",
            question: "‘धोबी’ का स्त्रीलिंग रूप चुनिए। (प्रश्न प्रकार 5)",
            options: [
                "बालिका",
                "नायिका",
                "मालिन",
                "धोबिन"
            ],
            correctAnswer: 3,
            explanation: "‘धोबी’ का स्त्रीलिंग ‘धोबिन’ है।"
        },
        {
            id: `${quizId}-q25`,
            topic: "लिंग",
            difficulty: "hard",
            question: "‘कवि’ का स्त्रीलिंग रूप चुनिए। (प्रश्न प्रकार 5)",
            options: [
                "कवयित्री",
                "अध्यापिका",
                "गायिका",
                "रानी"
            ],
            correctAnswer: 0,
            explanation: "‘कवि’ का स्त्रीलिंग ‘कवयित्री’ है।"
        },
        {
            id: `${quizId}-q26`,
            topic: "लिंग",
            difficulty: "hard",
            question: "‘गायक’ का स्त्रीलिंग रूप चुनिए। (प्रश्न प्रकार 5)",
            options: [
                "मालिन",
                "गायिका",
                "देवी",
                "धोबिन"
            ],
            correctAnswer: 1,
            explanation: "‘गायक’ का स्त्रीलिंग ‘गायिका’ है।"
        },
        {
            id: `${quizId}-q27`,
            topic: "लिंग",
            difficulty: "hard",
            question: "‘शेर’ का स्त्रीलिंग रूप चुनिए। (प्रश्न प्रकार 5)",
            options: [
                "देवी",
                "बालिका",
                "शेरनी",
                "सेविका"
            ],
            correctAnswer: 2,
            explanation: "‘शेर’ का स्त्रीलिंग ‘शेरनी’ है।"
        },
        {
            id: `${quizId}-q28`,
            topic: "लिंग",
            difficulty: "hard",
            question: "‘बूढ़ा’ का स्त्रीलिंग रूप चुनिए। (प्रश्न प्रकार 5)",
            options: [
                "देवी",
                "सेविका",
                "कवयित्री",
                "बूढ़ी"
            ],
            correctAnswer: 3,
            explanation: "‘बूढ़ा’ का स्त्रीलिंग ‘बूढ़ी’ है।"
        },
        {
            id: `${quizId}-q29`,
            topic: "लिंग",
            difficulty: "hard",
            question: "‘नायक’ का स्त्रीलिंग रूप चुनिए। (प्रश्न प्रकार 5)",
            options: [
                "नायिका",
                "गायिका",
                "देवी",
                "रानी"
            ],
            correctAnswer: 0,
            explanation: "‘नायक’ का स्त्रीलिंग ‘नायिका’ है।"
        },
        {
            id: `${quizId}-q30`,
            topic: "लिंग",
            difficulty: "hard",
            question: "‘बालक’ का स्त्रीलिंग रूप चुनिए। (प्रश्न प्रकार 5)",
            options: [
                "पंडिताइन",
                "बालिका",
                "शेरनी",
                "नायिका"
            ],
            correctAnswer: 1,
            explanation: "‘बालक’ का स्त्रीलिंग ‘बालिका’ है।"
        },
        {
            id: `${quizId}-q31`,
            topic: "लिंग",
            difficulty: "hard",
            question: "‘माली’ का स्त्रीलिंग रूप चुनिए। (प्रश्न प्रकार 5)",
            options: [
                "पुत्री",
                "कवयित्री",
                "मालिन",
                "रानी"
            ],
            correctAnswer: 2,
            explanation: "‘माली’ का स्त्रीलिंग ‘मालिन’ है।"
        },
        {
            id: `${quizId}-q32`,
            topic: "लिंग",
            difficulty: "hard",
            question: "‘स्वामी’ का स्त्रीलिंग रूप चुनिए। (प्रश्न प्रकार 5)",
            options: [
                "सेविका",
                "धोबिन",
                "नायिका",
                "स्वामिनी"
            ],
            correctAnswer: 3,
            explanation: "‘स्वामी’ का स्त्रीलिंग ‘स्वामिनी’ है।"
        },
        {
            id: `${quizId}-q33`,
            topic: "लिंग",
            difficulty: "hard",
            question: "‘सेवक’ का स्त्रीलिंग रूप चुनिए। (प्रश्न प्रकार 5)",
            options: [
                "सेविका",
                "धोबिन",
                "बूढ़ी",
                "पुत्री"
            ],
            correctAnswer: 0,
            explanation: "‘सेवक’ का स्त्रीलिंग ‘सेविका’ है।"
        },
        {
            id: `${quizId}-q34`,
            topic: "लिंग",
            difficulty: "hard",
            question: "‘वर’ का स्त्रीलिंग रूप चुनिए। (प्रश्न प्रकार 5)",
            options: [
                "सेविका",
                "वधू",
                "रानी",
                "पंडिताइन"
            ],
            correctAnswer: 1,
            explanation: "‘वर’ का स्त्रीलिंग ‘वधू’ है।"
        },
        {
            id: `${quizId}-q35`,
            topic: "लिंग",
            difficulty: "hard",
            question: "‘पंडित’ का स्त्रीलिंग रूप चुनिए। (प्रश्न प्रकार 5)",
            options: [
                "स्वामिनी",
                "नायिका",
                "पंडिताइन",
                "लेखिका"
            ],
            correctAnswer: 2,
            explanation: "‘पंडित’ का स्त्रीलिंग ‘पंडिताइन’ है।"
        },
        {
            id: `${quizId}-q36`,
            topic: "लिंग",
            difficulty: "hard",
            question: "‘लेखक’ का स्त्रीलिंग रूप चुनिए। (प्रश्न प्रकार 4)",
            options: [
                "देवी",
                "बूढ़ी",
                "सेविका",
                "लेखिका"
            ],
            correctAnswer: 3,
            explanation: "‘लेखक’ का स्त्रीलिंग ‘लेखिका’ है।"
        },
        {
            id: `${quizId}-q37`,
            topic: "लिंग",
            difficulty: "hard",
            question: "‘राजा’ का स्त्रीलिंग रूप चुनिए। (प्रश्न प्रकार 5)",
            options: [
                "रानी",
                "लेखिका",
                "पंडिताइन",
                "शेरनी"
            ],
            correctAnswer: 0,
            explanation: "‘राजा’ का स्त्रीलिंग ‘रानी’ है।"
        },
        {
            id: `${quizId}-q38`,
            topic: "लिंग",
            difficulty: "hard",
            question: "‘घोड़ा’ का स्त्रीलिंग रूप चुनिए। (प्रश्न प्रकार 5)",
            options: [
                "देवी",
                "घोड़ी",
                "धोबिन",
                "गायिका"
            ],
            correctAnswer: 1,
            explanation: "‘घोड़ा’ का स्त्रीलिंग ‘घोड़ी’ है।"
        },
        {
            id: `${quizId}-q39`,
            topic: "लिंग",
            difficulty: "hard",
            question: "‘देव’ का स्त्रीलिंग रूप चुनिए। (प्रश्न प्रकार 5)",
            options: [
                "धोबिन",
                "सेविका",
                "देवी",
                "अध्यापिका"
            ],
            correctAnswer: 2,
            explanation: "‘देव’ का स्त्रीलिंग ‘देवी’ है।"
        },
        {
            id: `${quizId}-q40`,
            topic: "लिंग",
            difficulty: "hard",
            question: "‘अध्यापक’ का स्त्रीलिंग रूप चुनिए। (प्रश्न प्रकार 6)",
            options: [
                "शेरनी",
                "नायिका",
                "स्वामिनी",
                "अध्यापिका"
            ],
            correctAnswer: 3,
            explanation: "‘अध्यापक’ का स्त्रीलिंग ‘अध्यापिका’ है।"
        },
        {
            id: `${quizId}-q41`,
            topic: "लिंग",
            difficulty: "hard",
            question: "‘पुत्र’ का स्त्रीलिंग रूप चुनिए। (प्रश्न प्रकार 6)",
            options: [
                "पुत्री",
                "स्वामिनी",
                "नायिका",
                "मालिन"
            ],
            correctAnswer: 0,
            explanation: "‘पुत्र’ का स्त्रीलिंग ‘पुत्री’ है।"
        },
        {
            id: `${quizId}-q42`,
            topic: "लिंग",
            difficulty: "hard",
            question: "‘धोबी’ का स्त्रीलिंग रूप चुनिए। (प्रश्न प्रकार 6)",
            options: [
                "शेरनी",
                "धोबिन",
                "नायिका",
                "सेविका"
            ],
            correctAnswer: 1,
            explanation: "‘धोबी’ का स्त्रीलिंग ‘धोबिन’ है।"
        },
        {
            id: `${quizId}-q43`,
            topic: "लिंग",
            difficulty: "hard",
            question: "‘कवि’ का स्त्रीलिंग रूप चुनिए। (प्रश्न प्रकार 6)",
            options: [
                "पुत्री",
                "बालिका",
                "कवयित्री",
                "मालिन"
            ],
            correctAnswer: 2,
            explanation: "‘कवि’ का स्त्रीलिंग ‘कवयित्री’ है।"
        },
        {
            id: `${quizId}-q44`,
            topic: "लिंग",
            difficulty: "hard",
            question: "‘गायक’ का स्त्रीलिंग रूप चुनिए। (प्रश्न प्रकार 6)",
            options: [
                "कवयित्री",
                "बूढ़ी",
                "पुत्री",
                "गायिका"
            ],
            correctAnswer: 3,
            explanation: "‘गायक’ का स्त्रीलिंग ‘गायिका’ है।"
        },
        {
            id: `${quizId}-q45`,
            topic: "लिंग",
            difficulty: "hard",
            question: "‘शेर’ का स्त्रीलिंग रूप चुनिए। (प्रश्न प्रकार 6)",
            options: [
                "शेरनी",
                "घोड़ी",
                "अध्यापिका",
                "नायिका"
            ],
            correctAnswer: 0,
            explanation: "‘शेर’ का स्त्रीलिंग ‘शेरनी’ है।"
        },
        {
            id: `${quizId}-q46`,
            topic: "लिंग",
            difficulty: "hard",
            question: "‘बूढ़ा’ का स्त्रीलिंग रूप चुनिए। (प्रश्न प्रकार 6)",
            options: [
                "बालिका",
                "बूढ़ी",
                "देवी",
                "घोड़ी"
            ],
            correctAnswer: 1,
            explanation: "‘बूढ़ा’ का स्त्रीलिंग ‘बूढ़ी’ है।"
        },
        {
            id: `${quizId}-q47`,
            topic: "लिंग",
            difficulty: "hard",
            question: "‘नायक’ का स्त्रीलिंग रूप चुनिए। (प्रश्न प्रकार 6)",
            options: [
                "अध्यापिका",
                "लेखिका",
                "नायिका",
                "पुत्री"
            ],
            correctAnswer: 2,
            explanation: "‘नायक’ का स्त्रीलिंग ‘नायिका’ है।"
        },
        {
            id: `${quizId}-q48`,
            topic: "लिंग",
            difficulty: "hard",
            question: "‘बालक’ का स्त्रीलिंग रूप चुनिए। (प्रश्न प्रकार 6)",
            options: [
                "वधू",
                "पंडिताइन",
                "स्वामिनी",
                "बालिका"
            ],
            correctAnswer: 3,
            explanation: "‘बालक’ का स्त्रीलिंग ‘बालिका’ है।"
        },
        {
            id: `${quizId}-q49`,
            topic: "लिंग",
            difficulty: "hard",
            question: "‘माली’ का स्त्रीलिंग रूप चुनिए। (प्रश्न प्रकार 6)",
            options: [
                "मालिन",
                "देवी",
                "घोड़ी",
                "स्वामिनी"
            ],
            correctAnswer: 0,
            explanation: "‘माली’ का स्त्रीलिंग ‘मालिन’ है।"
        },
        {
            id: `${quizId}-q50`,
            topic: "लिंग",
            difficulty: "hard",
            question: "‘स्वामी’ का स्त्रीलिंग रूप चुनिए। (प्रश्न प्रकार 6)",
            options: [
                "मालिन",
                "स्वामिनी",
                "रानी",
                "धोबिन"
            ],
            correctAnswer: 1,
            explanation: "‘स्वामी’ का स्त्रीलिंग ‘स्वामिनी’ है।"
        }
    ];

    window.GJU_QUIZ_BANK.push({
        id: quizId,
        subject: "Hindi",
        title: "Hindi UP Police Practice Set",
        questions
    });
})();
