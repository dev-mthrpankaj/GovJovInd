(function () {
    "use strict";

    window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];

    const quizId = "hindi-vachan-up-police-set-1";

    const questions = [
        {
            id: `${quizId}-q01`,
            topic: "वचन",
            difficulty: "hard",
            question: "‘रात’ का बहुवचन रूप चुनिए।",
            options: [
                "रातें",
                "गायें",
                "बातें",
                "भाषाएँ"
            ],
            correctAnswer: 0,
            explanation: "‘रात’ का बहुवचन ‘रातें’ है।"
        },
        {
            id: `${quizId}-q02`,
            topic: "वचन",
            difficulty: "hard",
            question: "‘लता’ का बहुवचन रूप चुनिए।",
            options: [
                "बातें",
                "लताएँ",
                "किताबें",
                "लड़के"
            ],
            correctAnswer: 1,
            explanation: "‘लता’ का बहुवचन ‘लताएँ’ है।"
        },
        {
            id: `${quizId}-q03`,
            topic: "वचन",
            difficulty: "hard",
            question: "‘आँख’ का बहुवचन रूप चुनिए।",
            options: [
                "नदियाँ",
                "माताएँ",
                "आँखें",
                "बातें"
            ],
            correctAnswer: 2,
            explanation: "‘आँख’ का बहुवचन ‘आँखें’ है।"
        },
        {
            id: `${quizId}-q04`,
            topic: "वचन",
            difficulty: "hard",
            question: "‘किताब’ का बहुवचन रूप चुनिए।",
            options: [
                "बच्चे",
                "चिड़ियाँ",
                "लताएँ",
                "किताबें"
            ],
            correctAnswer: 3,
            explanation: "‘किताब’ का बहुवचन ‘किताबें’ है।"
        },
        {
            id: `${quizId}-q05`,
            topic: "वचन",
            difficulty: "hard",
            question: "‘वस्तु’ का बहुवचन रूप चुनिए।",
            options: [
                "वस्तुएँ",
                "किताबें",
                "बच्चे",
                "भाषाएँ"
            ],
            correctAnswer: 0,
            explanation: "‘वस्तु’ का बहुवचन ‘वस्तुएँ’ है।"
        },
        {
            id: `${quizId}-q06`,
            topic: "वचन",
            difficulty: "hard",
            question: "‘पुस्तक’ का बहुवचन रूप चुनिए।",
            options: [
                "कथाएँ",
                "पुस्तकें",
                "बातें",
                "नदियाँ"
            ],
            correctAnswer: 1,
            explanation: "‘पुस्तक’ का बहुवचन ‘पुस्तकें’ है।"
        },
        {
            id: `${quizId}-q07`,
            topic: "वचन",
            difficulty: "hard",
            question: "‘बच्चा’ का बहुवचन रूप चुनिए।",
            options: [
                "कथाएँ",
                "बातें",
                "बच्चे",
                "रातें"
            ],
            correctAnswer: 2,
            explanation: "‘बच्चा’ का बहुवचन ‘बच्चे’ है।"
        },
        {
            id: `${quizId}-q08`,
            topic: "वचन",
            difficulty: "hard",
            question: "‘कुर्सी’ का बहुवचन रूप चुनिए।",
            options: [
                "गायें",
                "लताएँ",
                "रातें",
                "कुर्सियाँ"
            ],
            correctAnswer: 3,
            explanation: "‘कुर्सी’ का बहुवचन ‘कुर्सियाँ’ है।"
        },
        {
            id: `${quizId}-q09`,
            topic: "वचन",
            difficulty: "hard",
            question: "‘भाषा’ का बहुवचन रूप चुनिए।",
            options: [
                "भाषाएँ",
                "माताएँ",
                "बच्चे",
                "रातें"
            ],
            correctAnswer: 0,
            explanation: "‘भाषा’ का बहुवचन ‘भाषाएँ’ है।"
        },
        {
            id: `${quizId}-q10`,
            topic: "वचन",
            difficulty: "hard",
            question: "‘लड़का’ का बहुवचन रूप चुनिए।",
            options: [
                "नदियाँ",
                "लड़के",
                "रातें",
                "लताएँ"
            ],
            correctAnswer: 1,
            explanation: "‘लड़का’ का बहुवचन ‘लड़के’ है।"
        },
        {
            id: `${quizId}-q11`,
            topic: "वचन",
            difficulty: "hard",
            question: "‘गाय’ का बहुवचन रूप चुनिए।",
            options: [
                "रातें",
                "पुस्तकें",
                "गायें",
                "बातें"
            ],
            correctAnswer: 2,
            explanation: "‘गाय’ का बहुवचन ‘गायें’ है।"
        },
        {
            id: `${quizId}-q12`,
            topic: "वचन",
            difficulty: "hard",
            question: "‘कथा’ का बहुवचन रूप चुनिए।",
            options: [
                "गायें",
                "वस्तुएँ",
                "बातें",
                "कथाएँ"
            ],
            correctAnswer: 3,
            explanation: "‘कथा’ का बहुवचन ‘कथाएँ’ है।"
        },
        {
            id: `${quizId}-q13`,
            topic: "वचन",
            difficulty: "hard",
            question: "‘चिड़िया’ का बहुवचन रूप चुनिए।",
            options: [
                "चिड़ियाँ",
                "माताएँ",
                "लड़के",
                "कुर्सियाँ"
            ],
            correctAnswer: 0,
            explanation: "‘चिड़िया’ का बहुवचन ‘चिड़ियाँ’ है।"
        },
        {
            id: `${quizId}-q14`,
            topic: "वचन",
            difficulty: "hard",
            question: "‘नदी’ का बहुवचन रूप चुनिए।",
            options: [
                "कुर्सियाँ",
                "नदियाँ",
                "चिड़ियाँ",
                "बच्चे"
            ],
            correctAnswer: 1,
            explanation: "‘नदी’ का बहुवचन ‘नदियाँ’ है।"
        },
        {
            id: `${quizId}-q15`,
            topic: "वचन",
            difficulty: "hard",
            question: "‘माता’ का बहुवचन रूप चुनिए।",
            options: [
                "लताएँ",
                "रातें",
                "माताएँ",
                "गायें"
            ],
            correctAnswer: 2,
            explanation: "‘माता’ का बहुवचन ‘माताएँ’ है।"
        },
        {
            id: `${quizId}-q16`,
            topic: "वचन",
            difficulty: "hard",
            question: "‘बात’ का बहुवचन रूप चुनिए।",
            options: [
                "बच्चे",
                "चिड़ियाँ",
                "लड़के",
                "बातें"
            ],
            correctAnswer: 3,
            explanation: "‘बात’ का बहुवचन ‘बातें’ है।"
        },
        {
            id: `${quizId}-q17`,
            topic: "वचन",
            difficulty: "hard",
            question: "‘रात’ का बहुवचन रूप चुनिए। (प्रश्न प्रकार 2)",
            options: [
                "रातें",
                "कथाएँ",
                "पुस्तकें",
                "कुर्सियाँ"
            ],
            correctAnswer: 0,
            explanation: "‘रात’ का बहुवचन ‘रातें’ है।"
        },
        {
            id: `${quizId}-q18`,
            topic: "वचन",
            difficulty: "hard",
            question: "‘लता’ का बहुवचन रूप चुनिए। (प्रश्न प्रकार 2)",
            options: [
                "पुस्तकें",
                "लताएँ",
                "नदियाँ",
                "कथाएँ"
            ],
            correctAnswer: 1,
            explanation: "‘लता’ का बहुवचन ‘लताएँ’ है।"
        },
        {
            id: `${quizId}-q19`,
            topic: "वचन",
            difficulty: "hard",
            question: "‘आँख’ का बहुवचन रूप चुनिए। (प्रश्न प्रकार 2)",
            options: [
                "भाषाएँ",
                "लड़के",
                "आँखें",
                "गायें"
            ],
            correctAnswer: 2,
            explanation: "‘आँख’ का बहुवचन ‘आँखें’ है।"
        },
        {
            id: `${quizId}-q20`,
            topic: "वचन",
            difficulty: "hard",
            question: "‘किताब’ का बहुवचन रूप चुनिए। (प्रश्न प्रकार 2)",
            options: [
                "कथाएँ",
                "वस्तुएँ",
                "चिड़ियाँ",
                "किताबें"
            ],
            correctAnswer: 3,
            explanation: "‘किताब’ का बहुवचन ‘किताबें’ है।"
        },
        {
            id: `${quizId}-q21`,
            topic: "वचन",
            difficulty: "hard",
            question: "‘वस्तु’ का बहुवचन रूप चुनिए। (प्रश्न प्रकार 2)",
            options: [
                "वस्तुएँ",
                "लताएँ",
                "माताएँ",
                "लड़के"
            ],
            correctAnswer: 0,
            explanation: "‘वस्तु’ का बहुवचन ‘वस्तुएँ’ है।"
        },
        {
            id: `${quizId}-q22`,
            topic: "वचन",
            difficulty: "hard",
            question: "‘पुस्तक’ का बहुवचन रूप चुनिए। (प्रश्न प्रकार 2)",
            options: [
                "कथाएँ",
                "पुस्तकें",
                "नदियाँ",
                "बच्चे"
            ],
            correctAnswer: 1,
            explanation: "‘पुस्तक’ का बहुवचन ‘पुस्तकें’ है।"
        },
        {
            id: `${quizId}-q23`,
            topic: "वचन",
            difficulty: "hard",
            question: "‘बच्चा’ का बहुवचन रूप चुनिए। (प्रश्न प्रकार 2)",
            options: [
                "बातें",
                "आँखें",
                "बच्चे",
                "वस्तुएँ"
            ],
            correctAnswer: 2,
            explanation: "‘बच्चा’ का बहुवचन ‘बच्चे’ है।"
        },
        {
            id: `${quizId}-q24`,
            topic: "वचन",
            difficulty: "hard",
            question: "‘कुर्सी’ का बहुवचन रूप चुनिए। (प्रश्न प्रकार 2)",
            options: [
                "कथाएँ",
                "लताएँ",
                "भाषाएँ",
                "कुर्सियाँ"
            ],
            correctAnswer: 3,
            explanation: "‘कुर्सी’ का बहुवचन ‘कुर्सियाँ’ है।"
        },
        {
            id: `${quizId}-q25`,
            topic: "वचन",
            difficulty: "hard",
            question: "‘भाषा’ का बहुवचन रूप चुनिए। (प्रश्न प्रकार 2)",
            options: [
                "भाषाएँ",
                "नदियाँ",
                "पुस्तकें",
                "कथाएँ"
            ],
            correctAnswer: 0,
            explanation: "‘भाषा’ का बहुवचन ‘भाषाएँ’ है।"
        },
        {
            id: `${quizId}-q26`,
            topic: "वचन",
            difficulty: "hard",
            question: "‘लड़का’ का बहुवचन रूप चुनिए। (प्रश्न प्रकार 2)",
            options: [
                "कुर्सियाँ",
                "लड़के",
                "बातें",
                "रातें"
            ],
            correctAnswer: 1,
            explanation: "‘लड़का’ का बहुवचन ‘लड़के’ है।"
        },
        {
            id: `${quizId}-q27`,
            topic: "वचन",
            difficulty: "hard",
            question: "‘गाय’ का बहुवचन रूप चुनिए। (प्रश्न प्रकार 2)",
            options: [
                "किताबें",
                "भाषाएँ",
                "गायें",
                "लताएँ"
            ],
            correctAnswer: 2,
            explanation: "‘गाय’ का बहुवचन ‘गायें’ है।"
        },
        {
            id: `${quizId}-q28`,
            topic: "वचन",
            difficulty: "hard",
            question: "‘कथा’ का बहुवचन रूप चुनिए। (प्रश्न प्रकार 2)",
            options: [
                "चिड़ियाँ",
                "भाषाएँ",
                "लताएँ",
                "कथाएँ"
            ],
            correctAnswer: 3,
            explanation: "‘कथा’ का बहुवचन ‘कथाएँ’ है।"
        },
        {
            id: `${quizId}-q29`,
            topic: "वचन",
            difficulty: "hard",
            question: "‘चिड़िया’ का बहुवचन रूप चुनिए। (प्रश्न प्रकार 2)",
            options: [
                "चिड़ियाँ",
                "रातें",
                "लताएँ",
                "किताबें"
            ],
            correctAnswer: 0,
            explanation: "‘चिड़िया’ का बहुवचन ‘चिड़ियाँ’ है।"
        },
        {
            id: `${quizId}-q30`,
            topic: "वचन",
            difficulty: "hard",
            question: "‘नदी’ का बहुवचन रूप चुनिए। (प्रश्न प्रकार 2)",
            options: [
                "बातें",
                "नदियाँ",
                "भाषाएँ",
                "वस्तुएँ"
            ],
            correctAnswer: 1,
            explanation: "‘नदी’ का बहुवचन ‘नदियाँ’ है।"
        },
        {
            id: `${quizId}-q31`,
            topic: "वचन",
            difficulty: "hard",
            question: "‘माता’ का बहुवचन रूप चुनिए। (प्रश्न प्रकार 2)",
            options: [
                "नदियाँ",
                "रातें",
                "माताएँ",
                "बातें"
            ],
            correctAnswer: 2,
            explanation: "‘माता’ का बहुवचन ‘माताएँ’ है।"
        },
        {
            id: `${quizId}-q32`,
            topic: "वचन",
            difficulty: "hard",
            question: "‘बात’ का बहुवचन रूप चुनिए। (प्रश्न प्रकार 2)",
            options: [
                "रातें",
                "लड़के",
                "किताबें",
                "बातें"
            ],
            correctAnswer: 3,
            explanation: "‘बात’ का बहुवचन ‘बातें’ है।"
        },
        {
            id: `${quizId}-q33`,
            topic: "वचन",
            difficulty: "hard",
            question: "‘रात’ का बहुवचन रूप चुनिए। (प्रश्न प्रकार 3)",
            options: [
                "रातें",
                "कुर्सियाँ",
                "किताबें",
                "बातें"
            ],
            correctAnswer: 0,
            explanation: "‘रात’ का बहुवचन ‘रातें’ है।"
        },
        {
            id: `${quizId}-q34`,
            topic: "वचन",
            difficulty: "hard",
            question: "‘लता’ का बहुवचन रूप चुनिए। (प्रश्न प्रकार 3)",
            options: [
                "आँखें",
                "लताएँ",
                "कुर्सियाँ",
                "नदियाँ"
            ],
            correctAnswer: 1,
            explanation: "‘लता’ का बहुवचन ‘लताएँ’ है।"
        },
        {
            id: `${quizId}-q35`,
            topic: "वचन",
            difficulty: "hard",
            question: "‘आँख’ का बहुवचन रूप चुनिए। (प्रश्न प्रकार 3)",
            options: [
                "बातें",
                "गायें",
                "आँखें",
                "वस्तुएँ"
            ],
            correctAnswer: 2,
            explanation: "‘आँख’ का बहुवचन ‘आँखें’ है।"
        },
        {
            id: `${quizId}-q36`,
            topic: "वचन",
            difficulty: "hard",
            question: "‘किताब’ का बहुवचन रूप चुनिए। (प्रश्न प्रकार 3)",
            options: [
                "चिड़ियाँ",
                "बातें",
                "रातें",
                "किताबें"
            ],
            correctAnswer: 3,
            explanation: "‘किताब’ का बहुवचन ‘किताबें’ है।"
        },
        {
            id: `${quizId}-q37`,
            topic: "वचन",
            difficulty: "hard",
            question: "‘वस्तु’ का बहुवचन रूप चुनिए। (प्रश्न प्रकार 3)",
            options: [
                "वस्तुएँ",
                "रातें",
                "कुर्सियाँ",
                "माताएँ"
            ],
            correctAnswer: 0,
            explanation: "‘वस्तु’ का बहुवचन ‘वस्तुएँ’ है।"
        },
        {
            id: `${quizId}-q38`,
            topic: "वचन",
            difficulty: "hard",
            question: "‘पुस्तक’ का बहुवचन रूप चुनिए। (प्रश्न प्रकार 3)",
            options: [
                "आँखें",
                "पुस्तकें",
                "नदियाँ",
                "कुर्सियाँ"
            ],
            correctAnswer: 1,
            explanation: "‘पुस्तक’ का बहुवचन ‘पुस्तकें’ है।"
        },
        {
            id: `${quizId}-q39`,
            topic: "वचन",
            difficulty: "hard",
            question: "‘बच्चा’ का बहुवचन रूप चुनिए। (प्रश्न प्रकार 3)",
            options: [
                "कुर्सियाँ",
                "आँखें",
                "बच्चे",
                "पुस्तकें"
            ],
            correctAnswer: 2,
            explanation: "‘बच्चा’ का बहुवचन ‘बच्चे’ है।"
        },
        {
            id: `${quizId}-q40`,
            topic: "वचन",
            difficulty: "hard",
            question: "‘कुर्सी’ का बहुवचन रूप चुनिए। (प्रश्न प्रकार 3)",
            options: [
                "रातें",
                "बातें",
                "नदियाँ",
                "कुर्सियाँ"
            ],
            correctAnswer: 3,
            explanation: "‘कुर्सी’ का बहुवचन ‘कुर्सियाँ’ है।"
        },
        {
            id: `${quizId}-q41`,
            topic: "वचन",
            difficulty: "hard",
            question: "‘भाषा’ का बहुवचन रूप चुनिए। (प्रश्न प्रकार 3)",
            options: [
                "भाषाएँ",
                "लताएँ",
                "गायें",
                "आँखें"
            ],
            correctAnswer: 0,
            explanation: "‘भाषा’ का बहुवचन ‘भाषाएँ’ है।"
        },
        {
            id: `${quizId}-q42`,
            topic: "वचन",
            difficulty: "hard",
            question: "‘लड़का’ का बहुवचन रूप चुनिए। (प्रश्न प्रकार 3)",
            options: [
                "कुर्सियाँ",
                "लड़के",
                "वस्तुएँ",
                "लताएँ"
            ],
            correctAnswer: 1,
            explanation: "‘लड़का’ का बहुवचन ‘लड़के’ है।"
        },
        {
            id: `${quizId}-q43`,
            topic: "वचन",
            difficulty: "hard",
            question: "‘गाय’ का बहुवचन रूप चुनिए। (प्रश्न प्रकार 3)",
            options: [
                "लड़के",
                "पुस्तकें",
                "गायें",
                "माताएँ"
            ],
            correctAnswer: 2,
            explanation: "‘गाय’ का बहुवचन ‘गायें’ है।"
        },
        {
            id: `${quizId}-q44`,
            topic: "वचन",
            difficulty: "hard",
            question: "‘कथा’ का बहुवचन रूप चुनिए। (प्रश्न प्रकार 3)",
            options: [
                "गायें",
                "लड़के",
                "किताबें",
                "कथाएँ"
            ],
            correctAnswer: 3,
            explanation: "‘कथा’ का बहुवचन ‘कथाएँ’ है।"
        },
        {
            id: `${quizId}-q45`,
            topic: "वचन",
            difficulty: "hard",
            question: "‘चिड़िया’ का बहुवचन रूप चुनिए। (प्रश्न प्रकार 3)",
            options: [
                "चिड़ियाँ",
                "नदियाँ",
                "बातें",
                "लताएँ"
            ],
            correctAnswer: 0,
            explanation: "‘चिड़िया’ का बहुवचन ‘चिड़ियाँ’ है।"
        },
        {
            id: `${quizId}-q46`,
            topic: "वचन",
            difficulty: "hard",
            question: "‘नदी’ का बहुवचन रूप चुनिए। (प्रश्न प्रकार 3)",
            options: [
                "माताएँ",
                "नदियाँ",
                "बातें",
                "लड़के"
            ],
            correctAnswer: 1,
            explanation: "‘नदी’ का बहुवचन ‘नदियाँ’ है।"
        },
        {
            id: `${quizId}-q47`,
            topic: "वचन",
            difficulty: "hard",
            question: "‘माता’ का बहुवचन रूप चुनिए। (प्रश्न प्रकार 3)",
            options: [
                "रातें",
                "कथाएँ",
                "माताएँ",
                "किताबें"
            ],
            correctAnswer: 2,
            explanation: "‘माता’ का बहुवचन ‘माताएँ’ है।"
        },
        {
            id: `${quizId}-q48`,
            topic: "वचन",
            difficulty: "hard",
            question: "‘बात’ का बहुवचन रूप चुनिए। (प्रश्न प्रकार 3)",
            options: [
                "रातें",
                "कुर्सियाँ",
                "भाषाएँ",
                "बातें"
            ],
            correctAnswer: 3,
            explanation: "‘बात’ का बहुवचन ‘बातें’ है।"
        },
        {
            id: `${quizId}-q49`,
            topic: "वचन",
            difficulty: "hard",
            question: "‘रात’ का बहुवचन रूप चुनिए। (प्रश्न प्रकार 4)",
            options: [
                "रातें",
                "गायें",
                "बातें",
                "लड़के"
            ],
            correctAnswer: 0,
            explanation: "‘रात’ का बहुवचन ‘रातें’ है।"
        },
        {
            id: `${quizId}-q50`,
            topic: "वचन",
            difficulty: "hard",
            question: "‘लता’ का बहुवचन रूप चुनिए। (प्रश्न प्रकार 4)",
            options: [
                "बातें",
                "लताएँ",
                "गायें",
                "भाषाएँ"
            ],
            correctAnswer: 1,
            explanation: "‘लता’ का बहुवचन ‘लताएँ’ है।"
        }
    ];

    window.GJU_QUIZ_BANK.push({
        id: quizId,
        subject: "Hindi",
        title: "Hindi UP Police Practice Set",
        questions
    });
})();
