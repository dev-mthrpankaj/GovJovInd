(function () {
    "use strict";

    window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];

    const quizId = "hindi-vachan-up-police-set-2";

    const questions = [
        {
            id: `${quizId}-q01`,
            topic: "वचन",
            difficulty: "hard",
            question: "‘कुर्सी’ का बहुवचन रूप चुनिए। (प्रश्न प्रकार 4)",
            options: [
                "कुर्सियाँ",
                "वस्तुएँ",
                "बातें",
                "लड़के"
            ],
            correctAnswer: 0,
            explanation: "‘कुर्सी’ का बहुवचन ‘कुर्सियाँ’ है।"
        },
        {
            id: `${quizId}-q02`,
            topic: "वचन",
            difficulty: "hard",
            question: "‘भाषा’ का बहुवचन रूप चुनिए। (प्रश्न प्रकार 4)",
            options: [
                "चिड़ियाँ",
                "भाषाएँ",
                "माताएँ",
                "वस्तुएँ"
            ],
            correctAnswer: 1,
            explanation: "‘भाषा’ का बहुवचन ‘भाषाएँ’ है।"
        },
        {
            id: `${quizId}-q03`,
            topic: "वचन",
            difficulty: "hard",
            question: "‘लड़का’ का बहुवचन रूप चुनिए। (प्रश्न प्रकार 4)",
            options: [
                "भाषाएँ",
                "आँखें",
                "लड़के",
                "बच्चे"
            ],
            correctAnswer: 2,
            explanation: "‘लड़का’ का बहुवचन ‘लड़के’ है।"
        },
        {
            id: `${quizId}-q04`,
            topic: "वचन",
            difficulty: "hard",
            question: "‘गाय’ का बहुवचन रूप चुनिए। (प्रश्न प्रकार 4)",
            options: [
                "आँखें",
                "बातें",
                "किताबें",
                "गायें"
            ],
            correctAnswer: 3,
            explanation: "‘गाय’ का बहुवचन ‘गायें’ है।"
        },
        {
            id: `${quizId}-q05`,
            topic: "वचन",
            difficulty: "hard",
            question: "‘कथा’ का बहुवचन रूप चुनिए। (प्रश्न प्रकार 4)",
            options: [
                "कथाएँ",
                "लताएँ",
                "बातें",
                "भाषाएँ"
            ],
            correctAnswer: 0,
            explanation: "‘कथा’ का बहुवचन ‘कथाएँ’ है।"
        },
        {
            id: `${quizId}-q06`,
            topic: "वचन",
            difficulty: "hard",
            question: "‘चिड़िया’ का बहुवचन रूप चुनिए। (प्रश्न प्रकार 4)",
            options: [
                "नदियाँ",
                "चिड़ियाँ",
                "कथाएँ",
                "लताएँ"
            ],
            correctAnswer: 1,
            explanation: "‘चिड़िया’ का बहुवचन ‘चिड़ियाँ’ है।"
        },
        {
            id: `${quizId}-q07`,
            topic: "वचन",
            difficulty: "hard",
            question: "‘नदी’ का बहुवचन रूप चुनिए। (प्रश्न प्रकार 4)",
            options: [
                "कथाएँ",
                "लताएँ",
                "नदियाँ",
                "लड़के"
            ],
            correctAnswer: 2,
            explanation: "‘नदी’ का बहुवचन ‘नदियाँ’ है।"
        },
        {
            id: `${quizId}-q08`,
            topic: "वचन",
            difficulty: "hard",
            question: "‘माता’ का बहुवचन रूप चुनिए। (प्रश्न प्रकार 4)",
            options: [
                "चिड़ियाँ",
                "किताबें",
                "वस्तुएँ",
                "माताएँ"
            ],
            correctAnswer: 3,
            explanation: "‘माता’ का बहुवचन ‘माताएँ’ है।"
        },
        {
            id: `${quizId}-q09`,
            topic: "वचन",
            difficulty: "hard",
            question: "‘बात’ का बहुवचन रूप चुनिए। (प्रश्न प्रकार 4)",
            options: [
                "बातें",
                "चिड़ियाँ",
                "माताएँ",
                "बच्चे"
            ],
            correctAnswer: 0,
            explanation: "‘बात’ का बहुवचन ‘बातें’ है।"
        },
        {
            id: `${quizId}-q10`,
            topic: "वचन",
            difficulty: "hard",
            question: "‘रात’ का बहुवचन रूप चुनिए। (प्रश्न प्रकार 5)",
            options: [
                "कुर्सियाँ",
                "रातें",
                "किताबें",
                "आँखें"
            ],
            correctAnswer: 1,
            explanation: "‘रात’ का बहुवचन ‘रातें’ है।"
        },
        {
            id: `${quizId}-q11`,
            topic: "वचन",
            difficulty: "hard",
            question: "‘लता’ का बहुवचन रूप चुनिए। (प्रश्न प्रकार 5)",
            options: [
                "वस्तुएँ",
                "बातें",
                "लताएँ",
                "माताएँ"
            ],
            correctAnswer: 2,
            explanation: "‘लता’ का बहुवचन ‘लताएँ’ है।"
        },
        {
            id: `${quizId}-q12`,
            topic: "वचन",
            difficulty: "hard",
            question: "‘आँख’ का बहुवचन रूप चुनिए। (प्रश्न प्रकार 4)",
            options: [
                "वस्तुएँ",
                "गायें",
                "माताएँ",
                "आँखें"
            ],
            correctAnswer: 3,
            explanation: "‘आँख’ का बहुवचन ‘आँखें’ है।"
        },
        {
            id: `${quizId}-q13`,
            topic: "वचन",
            difficulty: "hard",
            question: "‘किताब’ का बहुवचन रूप चुनिए। (प्रश्न प्रकार 4)",
            options: [
                "किताबें",
                "वस्तुएँ",
                "बच्चे",
                "भाषाएँ"
            ],
            correctAnswer: 0,
            explanation: "‘किताब’ का बहुवचन ‘किताबें’ है।"
        },
        {
            id: `${quizId}-q14`,
            topic: "वचन",
            difficulty: "hard",
            question: "‘वस्तु’ का बहुवचन रूप चुनिए। (प्रश्न प्रकार 4)",
            options: [
                "चिड़ियाँ",
                "वस्तुएँ",
                "बातें",
                "लड़के"
            ],
            correctAnswer: 1,
            explanation: "‘वस्तु’ का बहुवचन ‘वस्तुएँ’ है।"
        },
        {
            id: `${quizId}-q15`,
            topic: "वचन",
            difficulty: "hard",
            question: "‘पुस्तक’ का बहुवचन रूप चुनिए। (प्रश्न प्रकार 4)",
            options: [
                "चिड़ियाँ",
                "वस्तुएँ",
                "पुस्तकें",
                "कुर्सियाँ"
            ],
            correctAnswer: 2,
            explanation: "‘पुस्तक’ का बहुवचन ‘पुस्तकें’ है।"
        },
        {
            id: `${quizId}-q16`,
            topic: "वचन",
            difficulty: "hard",
            question: "‘बच्चा’ का बहुवचन रूप चुनिए। (प्रश्न प्रकार 4)",
            options: [
                "गायें",
                "कथाएँ",
                "माताएँ",
                "बच्चे"
            ],
            correctAnswer: 3,
            explanation: "‘बच्चा’ का बहुवचन ‘बच्चे’ है।"
        },
        {
            id: `${quizId}-q17`,
            topic: "वचन",
            difficulty: "hard",
            question: "‘कुर्सी’ का बहुवचन रूप चुनिए। (प्रश्न प्रकार 5)",
            options: [
                "कुर्सियाँ",
                "बातें",
                "नदियाँ",
                "किताबें"
            ],
            correctAnswer: 0,
            explanation: "‘कुर्सी’ का बहुवचन ‘कुर्सियाँ’ है।"
        },
        {
            id: `${quizId}-q18`,
            topic: "वचन",
            difficulty: "hard",
            question: "‘भाषा’ का बहुवचन रूप चुनिए। (प्रश्न प्रकार 5)",
            options: [
                "गायें",
                "भाषाएँ",
                "कथाएँ",
                "चिड़ियाँ"
            ],
            correctAnswer: 1,
            explanation: "‘भाषा’ का बहुवचन ‘भाषाएँ’ है।"
        },
        {
            id: `${quizId}-q19`,
            topic: "वचन",
            difficulty: "hard",
            question: "‘लड़का’ का बहुवचन रूप चुनिए। (प्रश्न प्रकार 5)",
            options: [
                "लताएँ",
                "नदियाँ",
                "लड़के",
                "भाषाएँ"
            ],
            correctAnswer: 2,
            explanation: "‘लड़का’ का बहुवचन ‘लड़के’ है।"
        },
        {
            id: `${quizId}-q20`,
            topic: "वचन",
            difficulty: "hard",
            question: "‘गाय’ का बहुवचन रूप चुनिए। (प्रश्न प्रकार 5)",
            options: [
                "वस्तुएँ",
                "बच्चे",
                "किताबें",
                "गायें"
            ],
            correctAnswer: 3,
            explanation: "‘गाय’ का बहुवचन ‘गायें’ है।"
        },
        {
            id: `${quizId}-q21`,
            topic: "वचन",
            difficulty: "hard",
            question: "‘कथा’ का बहुवचन रूप चुनिए। (प्रश्न प्रकार 5)",
            options: [
                "कथाएँ",
                "बच्चे",
                "लड़के",
                "रातें"
            ],
            correctAnswer: 0,
            explanation: "‘कथा’ का बहुवचन ‘कथाएँ’ है।"
        },
        {
            id: `${quizId}-q22`,
            topic: "वचन",
            difficulty: "hard",
            question: "‘चिड़िया’ का बहुवचन रूप चुनिए। (प्रश्न प्रकार 5)",
            options: [
                "कुर्सियाँ",
                "चिड़ियाँ",
                "बातें",
                "लताएँ"
            ],
            correctAnswer: 1,
            explanation: "‘चिड़िया’ का बहुवचन ‘चिड़ियाँ’ है।"
        },
        {
            id: `${quizId}-q23`,
            topic: "वचन",
            difficulty: "hard",
            question: "‘नदी’ का बहुवचन रूप चुनिए। (प्रश्न प्रकार 5)",
            options: [
                "गायें",
                "रातें",
                "नदियाँ",
                "लड़के"
            ],
            correctAnswer: 2,
            explanation: "‘नदी’ का बहुवचन ‘नदियाँ’ है।"
        },
        {
            id: `${quizId}-q24`,
            topic: "वचन",
            difficulty: "hard",
            question: "‘माता’ का बहुवचन रूप चुनिए। (प्रश्न प्रकार 5)",
            options: [
                "नदियाँ",
                "रातें",
                "बच्चे",
                "माताएँ"
            ],
            correctAnswer: 3,
            explanation: "‘माता’ का बहुवचन ‘माताएँ’ है।"
        },
        {
            id: `${quizId}-q25`,
            topic: "वचन",
            difficulty: "hard",
            question: "‘बात’ का बहुवचन रूप चुनिए। (प्रश्न प्रकार 5)",
            options: [
                "बातें",
                "चिड़ियाँ",
                "रातें",
                "आँखें"
            ],
            correctAnswer: 0,
            explanation: "‘बात’ का बहुवचन ‘बातें’ है।"
        },
        {
            id: `${quizId}-q26`,
            topic: "वचन",
            difficulty: "hard",
            question: "‘रात’ का बहुवचन रूप चुनिए। (प्रश्न प्रकार 6)",
            options: [
                "भाषाएँ",
                "रातें",
                "किताबें",
                "चिड़ियाँ"
            ],
            correctAnswer: 1,
            explanation: "‘रात’ का बहुवचन ‘रातें’ है।"
        },
        {
            id: `${quizId}-q27`,
            topic: "वचन",
            difficulty: "hard",
            question: "‘लता’ का बहुवचन रूप चुनिए। (प्रश्न प्रकार 6)",
            options: [
                "बच्चे",
                "रातें",
                "लताएँ",
                "गायें"
            ],
            correctAnswer: 2,
            explanation: "‘लता’ का बहुवचन ‘लताएँ’ है।"
        },
        {
            id: `${quizId}-q28`,
            topic: "वचन",
            difficulty: "hard",
            question: "‘आँख’ का बहुवचन रूप चुनिए। (प्रश्न प्रकार 5)",
            options: [
                "नदियाँ",
                "बातें",
                "वस्तुएँ",
                "आँखें"
            ],
            correctAnswer: 3,
            explanation: "‘आँख’ का बहुवचन ‘आँखें’ है।"
        },
        {
            id: `${quizId}-q29`,
            topic: "वचन",
            difficulty: "hard",
            question: "‘किताब’ का बहुवचन रूप चुनिए। (प्रश्न प्रकार 5)",
            options: [
                "किताबें",
                "आँखें",
                "बच्चे",
                "गायें"
            ],
            correctAnswer: 0,
            explanation: "‘किताब’ का बहुवचन ‘किताबें’ है।"
        },
        {
            id: `${quizId}-q30`,
            topic: "वचन",
            difficulty: "hard",
            question: "‘वस्तु’ का बहुवचन रूप चुनिए। (प्रश्न प्रकार 5)",
            options: [
                "नदियाँ",
                "वस्तुएँ",
                "चिड़ियाँ",
                "कथाएँ"
            ],
            correctAnswer: 1,
            explanation: "‘वस्तु’ का बहुवचन ‘वस्तुएँ’ है।"
        },
        {
            id: `${quizId}-q31`,
            topic: "वचन",
            difficulty: "hard",
            question: "‘पुस्तक’ का बहुवचन रूप चुनिए। (प्रश्न प्रकार 5)",
            options: [
                "आँखें",
                "लताएँ",
                "पुस्तकें",
                "नदियाँ"
            ],
            correctAnswer: 2,
            explanation: "‘पुस्तक’ का बहुवचन ‘पुस्तकें’ है।"
        },
        {
            id: `${quizId}-q32`,
            topic: "वचन",
            difficulty: "hard",
            question: "‘बच्चा’ का बहुवचन रूप चुनिए। (प्रश्न प्रकार 5)",
            options: [
                "बातें",
                "रातें",
                "कथाएँ",
                "बच्चे"
            ],
            correctAnswer: 3,
            explanation: "‘बच्चा’ का बहुवचन ‘बच्चे’ है।"
        },
        {
            id: `${quizId}-q33`,
            topic: "वचन",
            difficulty: "hard",
            question: "‘कुर्सी’ का बहुवचन रूप चुनिए। (प्रश्न प्रकार 6)",
            options: [
                "कुर्सियाँ",
                "माताएँ",
                "बच्चे",
                "नदियाँ"
            ],
            correctAnswer: 0,
            explanation: "‘कुर्सी’ का बहुवचन ‘कुर्सियाँ’ है।"
        },
        {
            id: `${quizId}-q34`,
            topic: "वचन",
            difficulty: "hard",
            question: "‘भाषा’ का बहुवचन रूप चुनिए। (प्रश्न प्रकार 6)",
            options: [
                "रातें",
                "भाषाएँ",
                "चिड़ियाँ",
                "लताएँ"
            ],
            correctAnswer: 1,
            explanation: "‘भाषा’ का बहुवचन ‘भाषाएँ’ है।"
        },
        {
            id: `${quizId}-q35`,
            topic: "वचन",
            difficulty: "hard",
            question: "‘लड़का’ का बहुवचन रूप चुनिए। (प्रश्न प्रकार 6)",
            options: [
                "कुर्सियाँ",
                "चिड़ियाँ",
                "लड़के",
                "गायें"
            ],
            correctAnswer: 2,
            explanation: "‘लड़का’ का बहुवचन ‘लड़के’ है।"
        },
        {
            id: `${quizId}-q36`,
            topic: "वचन",
            difficulty: "hard",
            question: "‘गाय’ का बहुवचन रूप चुनिए। (प्रश्न प्रकार 6)",
            options: [
                "पुस्तकें",
                "किताबें",
                "आँखें",
                "गायें"
            ],
            correctAnswer: 3,
            explanation: "‘गाय’ का बहुवचन ‘गायें’ है।"
        },
        {
            id: `${quizId}-q37`,
            topic: "वचन",
            difficulty: "hard",
            question: "‘कथा’ का बहुवचन रूप चुनिए। (प्रश्न प्रकार 6)",
            options: [
                "कथाएँ",
                "नदियाँ",
                "बच्चे",
                "कुर्सियाँ"
            ],
            correctAnswer: 0,
            explanation: "‘कथा’ का बहुवचन ‘कथाएँ’ है।"
        },
        {
            id: `${quizId}-q38`,
            topic: "वचन",
            difficulty: "hard",
            question: "‘चिड़िया’ का बहुवचन रूप चुनिए। (प्रश्न प्रकार 6)",
            options: [
                "नदियाँ",
                "चिड़ियाँ",
                "रातें",
                "बातें"
            ],
            correctAnswer: 1,
            explanation: "‘चिड़िया’ का बहुवचन ‘चिड़ियाँ’ है।"
        },
        {
            id: `${quizId}-q39`,
            topic: "वचन",
            difficulty: "hard",
            question: "‘नदी’ का बहुवचन रूप चुनिए। (प्रश्न प्रकार 6)",
            options: [
                "माताएँ",
                "भाषाएँ",
                "नदियाँ",
                "बच्चे"
            ],
            correctAnswer: 2,
            explanation: "‘नदी’ का बहुवचन ‘नदियाँ’ है।"
        },
        {
            id: `${quizId}-q40`,
            topic: "वचन",
            difficulty: "hard",
            question: "‘माता’ का बहुवचन रूप चुनिए। (प्रश्न प्रकार 6)",
            options: [
                "बातें",
                "वस्तुएँ",
                "आँखें",
                "माताएँ"
            ],
            correctAnswer: 3,
            explanation: "‘माता’ का बहुवचन ‘माताएँ’ है।"
        },
        {
            id: `${quizId}-q41`,
            topic: "वचन",
            difficulty: "hard",
            question: "‘बात’ का बहुवचन रूप चुनिए। (प्रश्न प्रकार 6)",
            options: [
                "बातें",
                "पुस्तकें",
                "भाषाएँ",
                "कुर्सियाँ"
            ],
            correctAnswer: 0,
            explanation: "‘बात’ का बहुवचन ‘बातें’ है।"
        },
        {
            id: `${quizId}-q42`,
            topic: "वचन",
            difficulty: "hard",
            question: "‘रात’ का बहुवचन रूप चुनिए। (प्रश्न प्रकार 7)",
            options: [
                "कुर्सियाँ",
                "रातें",
                "कथाएँ",
                "बातें"
            ],
            correctAnswer: 1,
            explanation: "‘रात’ का बहुवचन ‘रातें’ है।"
        },
        {
            id: `${quizId}-q43`,
            topic: "वचन",
            difficulty: "hard",
            question: "‘लता’ का बहुवचन रूप चुनिए। (प्रश्न प्रकार 7)",
            options: [
                "लड़के",
                "माताएँ",
                "लताएँ",
                "गायें"
            ],
            correctAnswer: 2,
            explanation: "‘लता’ का बहुवचन ‘लताएँ’ है।"
        },
        {
            id: `${quizId}-q44`,
            topic: "वचन",
            difficulty: "hard",
            question: "‘आँख’ का बहुवचन रूप चुनिए। (प्रश्न प्रकार 6)",
            options: [
                "भाषाएँ",
                "नदियाँ",
                "कुर्सियाँ",
                "आँखें"
            ],
            correctAnswer: 3,
            explanation: "‘आँख’ का बहुवचन ‘आँखें’ है।"
        },
        {
            id: `${quizId}-q45`,
            topic: "वचन",
            difficulty: "hard",
            question: "‘किताब’ का बहुवचन रूप चुनिए। (प्रश्न प्रकार 6)",
            options: [
                "किताबें",
                "बच्चे",
                "चिड़ियाँ",
                "माताएँ"
            ],
            correctAnswer: 0,
            explanation: "‘किताब’ का बहुवचन ‘किताबें’ है।"
        },
        {
            id: `${quizId}-q46`,
            topic: "वचन",
            difficulty: "hard",
            question: "‘वस्तु’ का बहुवचन रूप चुनिए। (प्रश्न प्रकार 6)",
            options: [
                "भाषाएँ",
                "वस्तुएँ",
                "कथाएँ",
                "गायें"
            ],
            correctAnswer: 1,
            explanation: "‘वस्तु’ का बहुवचन ‘वस्तुएँ’ है।"
        },
        {
            id: `${quizId}-q47`,
            topic: "वचन",
            difficulty: "hard",
            question: "‘पुस्तक’ का बहुवचन रूप चुनिए। (प्रश्न प्रकार 6)",
            options: [
                "वस्तुएँ",
                "रातें",
                "पुस्तकें",
                "लड़के"
            ],
            correctAnswer: 2,
            explanation: "‘पुस्तक’ का बहुवचन ‘पुस्तकें’ है।"
        },
        {
            id: `${quizId}-q48`,
            topic: "वचन",
            difficulty: "hard",
            question: "‘बच्चा’ का बहुवचन रूप चुनिए। (प्रश्न प्रकार 6)",
            options: [
                "गायें",
                "भाषाएँ",
                "कुर्सियाँ",
                "बच्चे"
            ],
            correctAnswer: 3,
            explanation: "‘बच्चा’ का बहुवचन ‘बच्चे’ है।"
        },
        {
            id: `${quizId}-q49`,
            topic: "वचन",
            difficulty: "hard",
            question: "‘कुर्सी’ का बहुवचन रूप चुनिए। (प्रश्न प्रकार 7)",
            options: [
                "कुर्सियाँ",
                "बच्चे",
                "भाषाएँ",
                "आँखें"
            ],
            correctAnswer: 0,
            explanation: "‘कुर्सी’ का बहुवचन ‘कुर्सियाँ’ है।"
        },
        {
            id: `${quizId}-q50`,
            topic: "वचन",
            difficulty: "hard",
            question: "‘भाषा’ का बहुवचन रूप चुनिए। (प्रश्न प्रकार 7)",
            options: [
                "चिड़ियाँ",
                "भाषाएँ",
                "कुर्सियाँ",
                "रातें"
            ],
            correctAnswer: 1,
            explanation: "‘भाषा’ का बहुवचन ‘भाषाएँ’ है।"
        }
    ];

    window.GJU_QUIZ_BANK.push({
        id: quizId,
        subject: "Hindi",
        title: "Hindi UP Police Practice Set",
        questions
    });
})();
