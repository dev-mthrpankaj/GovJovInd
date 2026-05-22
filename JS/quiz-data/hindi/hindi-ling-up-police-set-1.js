(function () {
    "use strict";

    window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];

    const quizId = "hindi-ling-up-police-set-1";

    const questions = [
        {
            id: `${quizId}-q01`,
            topic: "लिंग",
            difficulty: "hard",
            question: "‘अध्यापक’ का स्त्रीलिंग रूप चुनिए।",
            options: [
                "अध्यापिका",
                "गायिका",
                "पंडिताइन",
                "स्वामिनी"
            ],
            correctAnswer: 0,
            explanation: "‘अध्यापक’ का स्त्रीलिंग ‘अध्यापिका’ है।"
        },
        {
            id: `${quizId}-q02`,
            topic: "लिंग",
            difficulty: "hard",
            question: "‘पुत्र’ का स्त्रीलिंग रूप चुनिए।",
            options: [
                "रानी",
                "पुत्री",
                "नायिका",
                "देवी"
            ],
            correctAnswer: 1,
            explanation: "‘पुत्र’ का स्त्रीलिंग ‘पुत्री’ है।"
        },
        {
            id: `${quizId}-q03`,
            topic: "लिंग",
            difficulty: "hard",
            question: "‘धोबी’ का स्त्रीलिंग रूप चुनिए।",
            options: [
                "वधू",
                "घोड़ी",
                "धोबिन",
                "मालिन"
            ],
            correctAnswer: 2,
            explanation: "‘धोबी’ का स्त्रीलिंग ‘धोबिन’ है।"
        },
        {
            id: `${quizId}-q04`,
            topic: "लिंग",
            difficulty: "hard",
            question: "‘कवि’ का स्त्रीलिंग रूप चुनिए।",
            options: [
                "नायिका",
                "पुत्री",
                "पंडिताइन",
                "कवयित्री"
            ],
            correctAnswer: 3,
            explanation: "‘कवि’ का स्त्रीलिंग ‘कवयित्री’ है।"
        },
        {
            id: `${quizId}-q05`,
            topic: "लिंग",
            difficulty: "hard",
            question: "‘गायक’ का स्त्रीलिंग रूप चुनिए।",
            options: [
                "गायिका",
                "नायिका",
                "धोबिन",
                "अध्यापिका"
            ],
            correctAnswer: 0,
            explanation: "‘गायक’ का स्त्रीलिंग ‘गायिका’ है।"
        },
        {
            id: `${quizId}-q06`,
            topic: "लिंग",
            difficulty: "hard",
            question: "‘शेर’ का स्त्रीलिंग रूप चुनिए।",
            options: [
                "लेखिका",
                "शेरनी",
                "पंडिताइन",
                "गायिका"
            ],
            correctAnswer: 1,
            explanation: "‘शेर’ का स्त्रीलिंग ‘शेरनी’ है।"
        },
        {
            id: `${quizId}-q07`,
            topic: "लिंग",
            difficulty: "hard",
            question: "‘बूढ़ा’ का स्त्रीलिंग रूप चुनिए।",
            options: [
                "बालिका",
                "पंडिताइन",
                "बूढ़ी",
                "कवयित्री"
            ],
            correctAnswer: 2,
            explanation: "‘बूढ़ा’ का स्त्रीलिंग ‘बूढ़ी’ है।"
        },
        {
            id: `${quizId}-q08`,
            topic: "लिंग",
            difficulty: "hard",
            question: "‘नायक’ का स्त्रीलिंग रूप चुनिए।",
            options: [
                "धोबिन",
                "वधू",
                "मालिन",
                "नायिका"
            ],
            correctAnswer: 3,
            explanation: "‘नायक’ का स्त्रीलिंग ‘नायिका’ है।"
        },
        {
            id: `${quizId}-q09`,
            topic: "लिंग",
            difficulty: "hard",
            question: "‘बालक’ का स्त्रीलिंग रूप चुनिए।",
            options: [
                "बालिका",
                "घोड़ी",
                "रानी",
                "पुत्री"
            ],
            correctAnswer: 0,
            explanation: "‘बालक’ का स्त्रीलिंग ‘बालिका’ है।"
        },
        {
            id: `${quizId}-q10`,
            topic: "लिंग",
            difficulty: "hard",
            question: "‘माली’ का स्त्रीलिंग रूप चुनिए।",
            options: [
                "अध्यापिका",
                "मालिन",
                "सेविका",
                "शेरनी"
            ],
            correctAnswer: 1,
            explanation: "‘माली’ का स्त्रीलिंग ‘मालिन’ है।"
        },
        {
            id: `${quizId}-q11`,
            topic: "लिंग",
            difficulty: "hard",
            question: "‘स्वामी’ का स्त्रीलिंग रूप चुनिए।",
            options: [
                "रानी",
                "अध्यापिका",
                "स्वामिनी",
                "लेखिका"
            ],
            correctAnswer: 2,
            explanation: "‘स्वामी’ का स्त्रीलिंग ‘स्वामिनी’ है।"
        },
        {
            id: `${quizId}-q12`,
            topic: "लिंग",
            difficulty: "hard",
            question: "‘सेवक’ का स्त्रीलिंग रूप चुनिए।",
            options: [
                "लेखिका",
                "वधू",
                "नायिका",
                "सेविका"
            ],
            correctAnswer: 3,
            explanation: "‘सेवक’ का स्त्रीलिंग ‘सेविका’ है।"
        },
        {
            id: `${quizId}-q13`,
            topic: "लिंग",
            difficulty: "hard",
            question: "‘वर’ का स्त्रीलिंग रूप चुनिए।",
            options: [
                "वधू",
                "शेरनी",
                "गायिका",
                "लेखिका"
            ],
            correctAnswer: 0,
            explanation: "‘वर’ का स्त्रीलिंग ‘वधू’ है।"
        },
        {
            id: `${quizId}-q14`,
            topic: "लिंग",
            difficulty: "hard",
            question: "‘पंडित’ का स्त्रीलिंग रूप चुनिए।",
            options: [
                "धोबिन",
                "पंडिताइन",
                "रानी",
                "पुत्री"
            ],
            correctAnswer: 1,
            explanation: "‘पंडित’ का स्त्रीलिंग ‘पंडिताइन’ है।"
        },
        {
            id: `${quizId}-q15`,
            topic: "लिंग",
            difficulty: "hard",
            question: "‘लेखक’ का स्त्रीलिंग रूप चुनिए।",
            options: [
                "घोड़ी",
                "वधू",
                "लेखिका",
                "कवयित्री"
            ],
            correctAnswer: 2,
            explanation: "‘लेखक’ का स्त्रीलिंग ‘लेखिका’ है।"
        },
        {
            id: `${quizId}-q16`,
            topic: "लिंग",
            difficulty: "hard",
            question: "‘राजा’ का स्त्रीलिंग रूप चुनिए।",
            options: [
                "नायिका",
                "स्वामिनी",
                "कवयित्री",
                "रानी"
            ],
            correctAnswer: 3,
            explanation: "‘राजा’ का स्त्रीलिंग ‘रानी’ है।"
        },
        {
            id: `${quizId}-q17`,
            topic: "लिंग",
            difficulty: "hard",
            question: "‘घोड़ा’ का स्त्रीलिंग रूप चुनिए।",
            options: [
                "घोड़ी",
                "देवी",
                "बालिका",
                "नायिका"
            ],
            correctAnswer: 0,
            explanation: "‘घोड़ा’ का स्त्रीलिंग ‘घोड़ी’ है।"
        },
        {
            id: `${quizId}-q18`,
            topic: "लिंग",
            difficulty: "hard",
            question: "‘देव’ का स्त्रीलिंग रूप चुनिए।",
            options: [
                "पंडिताइन",
                "देवी",
                "कवयित्री",
                "बालिका"
            ],
            correctAnswer: 1,
            explanation: "‘देव’ का स्त्रीलिंग ‘देवी’ है।"
        },
        {
            id: `${quizId}-q19`,
            topic: "लिंग",
            difficulty: "hard",
            question: "‘अध्यापक’ का स्त्रीलिंग रूप चुनिए। (प्रश्न प्रकार 2)",
            options: [
                "धोबिन",
                "स्वामिनी",
                "अध्यापिका",
                "बालिका"
            ],
            correctAnswer: 2,
            explanation: "‘अध्यापक’ का स्त्रीलिंग ‘अध्यापिका’ है।"
        },
        {
            id: `${quizId}-q20`,
            topic: "लिंग",
            difficulty: "hard",
            question: "‘पुत्र’ का स्त्रीलिंग रूप चुनिए। (प्रश्न प्रकार 2)",
            options: [
                "बूढ़ी",
                "देवी",
                "धोबिन",
                "पुत्री"
            ],
            correctAnswer: 3,
            explanation: "‘पुत्र’ का स्त्रीलिंग ‘पुत्री’ है।"
        },
        {
            id: `${quizId}-q21`,
            topic: "लिंग",
            difficulty: "hard",
            question: "‘धोबी’ का स्त्रीलिंग रूप चुनिए। (प्रश्न प्रकार 2)",
            options: [
                "धोबिन",
                "अध्यापिका",
                "मालिन",
                "स्वामिनी"
            ],
            correctAnswer: 0,
            explanation: "‘धोबी’ का स्त्रीलिंग ‘धोबिन’ है।"
        },
        {
            id: `${quizId}-q22`,
            topic: "लिंग",
            difficulty: "hard",
            question: "‘कवि’ का स्त्रीलिंग रूप चुनिए। (प्रश्न प्रकार 2)",
            options: [
                "मालिन",
                "कवयित्री",
                "गायिका",
                "शेरनी"
            ],
            correctAnswer: 1,
            explanation: "‘कवि’ का स्त्रीलिंग ‘कवयित्री’ है।"
        },
        {
            id: `${quizId}-q23`,
            topic: "लिंग",
            difficulty: "hard",
            question: "‘गायक’ का स्त्रीलिंग रूप चुनिए। (प्रश्न प्रकार 2)",
            options: [
                "वधू",
                "पुत्री",
                "गायिका",
                "बालिका"
            ],
            correctAnswer: 2,
            explanation: "‘गायक’ का स्त्रीलिंग ‘गायिका’ है।"
        },
        {
            id: `${quizId}-q24`,
            topic: "लिंग",
            difficulty: "hard",
            question: "‘शेर’ का स्त्रीलिंग रूप चुनिए। (प्रश्न प्रकार 2)",
            options: [
                "बूढ़ी",
                "स्वामिनी",
                "कवयित्री",
                "शेरनी"
            ],
            correctAnswer: 3,
            explanation: "‘शेर’ का स्त्रीलिंग ‘शेरनी’ है।"
        },
        {
            id: `${quizId}-q25`,
            topic: "लिंग",
            difficulty: "hard",
            question: "‘बूढ़ा’ का स्त्रीलिंग रूप चुनिए। (प्रश्न प्रकार 2)",
            options: [
                "बूढ़ी",
                "स्वामिनी",
                "नायिका",
                "घोड़ी"
            ],
            correctAnswer: 0,
            explanation: "‘बूढ़ा’ का स्त्रीलिंग ‘बूढ़ी’ है।"
        },
        {
            id: `${quizId}-q26`,
            topic: "लिंग",
            difficulty: "hard",
            question: "‘नायक’ का स्त्रीलिंग रूप चुनिए। (प्रश्न प्रकार 2)",
            options: [
                "सेविका",
                "नायिका",
                "वधू",
                "स्वामिनी"
            ],
            correctAnswer: 1,
            explanation: "‘नायक’ का स्त्रीलिंग ‘नायिका’ है।"
        },
        {
            id: `${quizId}-q27`,
            topic: "लिंग",
            difficulty: "hard",
            question: "‘बालक’ का स्त्रीलिंग रूप चुनिए। (प्रश्न प्रकार 2)",
            options: [
                "कवयित्री",
                "सेविका",
                "बालिका",
                "लेखिका"
            ],
            correctAnswer: 2,
            explanation: "‘बालक’ का स्त्रीलिंग ‘बालिका’ है।"
        },
        {
            id: `${quizId}-q28`,
            topic: "लिंग",
            difficulty: "hard",
            question: "‘माली’ का स्त्रीलिंग रूप चुनिए। (प्रश्न प्रकार 2)",
            options: [
                "सेविका",
                "बूढ़ी",
                "कवयित्री",
                "मालिन"
            ],
            correctAnswer: 3,
            explanation: "‘माली’ का स्त्रीलिंग ‘मालिन’ है।"
        },
        {
            id: `${quizId}-q29`,
            topic: "लिंग",
            difficulty: "hard",
            question: "‘स्वामी’ का स्त्रीलिंग रूप चुनिए। (प्रश्न प्रकार 2)",
            options: [
                "स्वामिनी",
                "देवी",
                "नायिका",
                "रानी"
            ],
            correctAnswer: 0,
            explanation: "‘स्वामी’ का स्त्रीलिंग ‘स्वामिनी’ है।"
        },
        {
            id: `${quizId}-q30`,
            topic: "लिंग",
            difficulty: "hard",
            question: "‘सेवक’ का स्त्रीलिंग रूप चुनिए। (प्रश्न प्रकार 2)",
            options: [
                "नायिका",
                "सेविका",
                "कवयित्री",
                "शेरनी"
            ],
            correctAnswer: 1,
            explanation: "‘सेवक’ का स्त्रीलिंग ‘सेविका’ है।"
        },
        {
            id: `${quizId}-q31`,
            topic: "लिंग",
            difficulty: "hard",
            question: "‘वर’ का स्त्रीलिंग रूप चुनिए। (प्रश्न प्रकार 2)",
            options: [
                "पुत्री",
                "मालिन",
                "वधू",
                "घोड़ी"
            ],
            correctAnswer: 2,
            explanation: "‘वर’ का स्त्रीलिंग ‘वधू’ है।"
        },
        {
            id: `${quizId}-q32`,
            topic: "लिंग",
            difficulty: "hard",
            question: "‘पंडित’ का स्त्रीलिंग रूप चुनिए। (प्रश्न प्रकार 2)",
            options: [
                "लेखिका",
                "घोड़ी",
                "शेरनी",
                "पंडिताइन"
            ],
            correctAnswer: 3,
            explanation: "‘पंडित’ का स्त्रीलिंग ‘पंडिताइन’ है।"
        },
        {
            id: `${quizId}-q33`,
            topic: "लिंग",
            difficulty: "hard",
            question: "‘लेखक’ का स्त्रीलिंग रूप चुनिए। (प्रश्न प्रकार 2)",
            options: [
                "लेखिका",
                "देवी",
                "रानी",
                "पुत्री"
            ],
            correctAnswer: 0,
            explanation: "‘लेखक’ का स्त्रीलिंग ‘लेखिका’ है।"
        },
        {
            id: `${quizId}-q34`,
            topic: "लिंग",
            difficulty: "hard",
            question: "‘राजा’ का स्त्रीलिंग रूप चुनिए। (प्रश्न प्रकार 2)",
            options: [
                "बालिका",
                "रानी",
                "पुत्री",
                "पंडिताइन"
            ],
            correctAnswer: 1,
            explanation: "‘राजा’ का स्त्रीलिंग ‘रानी’ है।"
        },
        {
            id: `${quizId}-q35`,
            topic: "लिंग",
            difficulty: "hard",
            question: "‘घोड़ा’ का स्त्रीलिंग रूप चुनिए। (प्रश्न प्रकार 2)",
            options: [
                "लेखिका",
                "स्वामिनी",
                "घोड़ी",
                "पंडिताइन"
            ],
            correctAnswer: 2,
            explanation: "‘घोड़ा’ का स्त्रीलिंग ‘घोड़ी’ है।"
        },
        {
            id: `${quizId}-q36`,
            topic: "लिंग",
            difficulty: "hard",
            question: "‘देव’ का स्त्रीलिंग रूप चुनिए। (प्रश्न प्रकार 2)",
            options: [
                "पंडिताइन",
                "वधू",
                "मालिन",
                "देवी"
            ],
            correctAnswer: 3,
            explanation: "‘देव’ का स्त्रीलिंग ‘देवी’ है।"
        },
        {
            id: `${quizId}-q37`,
            topic: "लिंग",
            difficulty: "hard",
            question: "‘अध्यापक’ का स्त्रीलिंग रूप चुनिए। (प्रश्न प्रकार 3)",
            options: [
                "अध्यापिका",
                "देवी",
                "गायिका",
                "रानी"
            ],
            correctAnswer: 0,
            explanation: "‘अध्यापक’ का स्त्रीलिंग ‘अध्यापिका’ है।"
        },
        {
            id: `${quizId}-q38`,
            topic: "लिंग",
            difficulty: "hard",
            question: "‘पुत्र’ का स्त्रीलिंग रूप चुनिए। (प्रश्न प्रकार 3)",
            options: [
                "स्वामिनी",
                "पुत्री",
                "बालिका",
                "गायिका"
            ],
            correctAnswer: 1,
            explanation: "‘पुत्र’ का स्त्रीलिंग ‘पुत्री’ है।"
        },
        {
            id: `${quizId}-q39`,
            topic: "लिंग",
            difficulty: "hard",
            question: "‘धोबी’ का स्त्रीलिंग रूप चुनिए। (प्रश्न प्रकार 3)",
            options: [
                "पुत्री",
                "सेविका",
                "धोबिन",
                "बूढ़ी"
            ],
            correctAnswer: 2,
            explanation: "‘धोबी’ का स्त्रीलिंग ‘धोबिन’ है।"
        },
        {
            id: `${quizId}-q40`,
            topic: "लिंग",
            difficulty: "hard",
            question: "‘कवि’ का स्त्रीलिंग रूप चुनिए। (प्रश्न प्रकार 3)",
            options: [
                "सेविका",
                "लेखिका",
                "शेरनी",
                "कवयित्री"
            ],
            correctAnswer: 3,
            explanation: "‘कवि’ का स्त्रीलिंग ‘कवयित्री’ है।"
        },
        {
            id: `${quizId}-q41`,
            topic: "लिंग",
            difficulty: "hard",
            question: "‘गायक’ का स्त्रीलिंग रूप चुनिए। (प्रश्न प्रकार 3)",
            options: [
                "गायिका",
                "मालिन",
                "पंडिताइन",
                "स्वामिनी"
            ],
            correctAnswer: 0,
            explanation: "‘गायक’ का स्त्रीलिंग ‘गायिका’ है।"
        },
        {
            id: `${quizId}-q42`,
            topic: "लिंग",
            difficulty: "hard",
            question: "‘शेर’ का स्त्रीलिंग रूप चुनिए। (प्रश्न प्रकार 3)",
            options: [
                "देवी",
                "शेरनी",
                "स्वामिनी",
                "वधू"
            ],
            correctAnswer: 1,
            explanation: "‘शेर’ का स्त्रीलिंग ‘शेरनी’ है।"
        },
        {
            id: `${quizId}-q43`,
            topic: "लिंग",
            difficulty: "hard",
            question: "‘बूढ़ा’ का स्त्रीलिंग रूप चुनिए। (प्रश्न प्रकार 3)",
            options: [
                "पुत्री",
                "रानी",
                "बूढ़ी",
                "लेखिका"
            ],
            correctAnswer: 2,
            explanation: "‘बूढ़ा’ का स्त्रीलिंग ‘बूढ़ी’ है।"
        },
        {
            id: `${quizId}-q44`,
            topic: "लिंग",
            difficulty: "hard",
            question: "‘नायक’ का स्त्रीलिंग रूप चुनिए। (प्रश्न प्रकार 3)",
            options: [
                "बूढ़ी",
                "कवयित्री",
                "वधू",
                "नायिका"
            ],
            correctAnswer: 3,
            explanation: "‘नायक’ का स्त्रीलिंग ‘नायिका’ है।"
        },
        {
            id: `${quizId}-q45`,
            topic: "लिंग",
            difficulty: "hard",
            question: "‘बालक’ का स्त्रीलिंग रूप चुनिए। (प्रश्न प्रकार 3)",
            options: [
                "बालिका",
                "रानी",
                "गायिका",
                "मालिन"
            ],
            correctAnswer: 0,
            explanation: "‘बालक’ का स्त्रीलिंग ‘बालिका’ है।"
        },
        {
            id: `${quizId}-q46`,
            topic: "लिंग",
            difficulty: "hard",
            question: "‘माली’ का स्त्रीलिंग रूप चुनिए। (प्रश्न प्रकार 3)",
            options: [
                "रानी",
                "मालिन",
                "देवी",
                "घोड़ी"
            ],
            correctAnswer: 1,
            explanation: "‘माली’ का स्त्रीलिंग ‘मालिन’ है।"
        },
        {
            id: `${quizId}-q47`,
            topic: "लिंग",
            difficulty: "hard",
            question: "‘स्वामी’ का स्त्रीलिंग रूप चुनिए। (प्रश्न प्रकार 3)",
            options: [
                "पुत्री",
                "सेविका",
                "स्वामिनी",
                "बालिका"
            ],
            correctAnswer: 2,
            explanation: "‘स्वामी’ का स्त्रीलिंग ‘स्वामिनी’ है।"
        },
        {
            id: `${quizId}-q48`,
            topic: "लिंग",
            difficulty: "hard",
            question: "‘सेवक’ का स्त्रीलिंग रूप चुनिए। (प्रश्न प्रकार 3)",
            options: [
                "स्वामिनी",
                "नायिका",
                "पंडिताइन",
                "सेविका"
            ],
            correctAnswer: 3,
            explanation: "‘सेवक’ का स्त्रीलिंग ‘सेविका’ है।"
        },
        {
            id: `${quizId}-q49`,
            topic: "लिंग",
            difficulty: "hard",
            question: "‘वर’ का स्त्रीलिंग रूप चुनिए। (प्रश्न प्रकार 3)",
            options: [
                "वधू",
                "घोड़ी",
                "अध्यापिका",
                "शेरनी"
            ],
            correctAnswer: 0,
            explanation: "‘वर’ का स्त्रीलिंग ‘वधू’ है।"
        },
        {
            id: `${quizId}-q50`,
            topic: "लिंग",
            difficulty: "hard",
            question: "‘पंडित’ का स्त्रीलिंग रूप चुनिए। (प्रश्न प्रकार 3)",
            options: [
                "मालिन",
                "पंडिताइन",
                "धोबिन",
                "शेरनी"
            ],
            correctAnswer: 1,
            explanation: "‘पंडित’ का स्त्रीलिंग ‘पंडिताइन’ है।"
        }
    ];

    window.GJU_QUIZ_BANK.push({
        id: quizId,
        subject: "Hindi",
        title: "Hindi UP Police Practice Set",
        questions
    });
})();
