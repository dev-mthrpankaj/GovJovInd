(function () {
    "use strict";

    window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];

    const quizId = "hindi-karak-up-police-set-1";

    const questions = [
        {
            id: `${quizId}-q01`,
            topic: "कारक",
            difficulty: "hard",
            question: "‘संप्रदान कारक’ का सामान्य चिह्न/अर्थ क्या है?",
            options: [
                "के लिए",
                "को",
                "का/की/के",
                "हे/अरे"
            ],
            correctAnswer: 0,
            explanation: "संप्रदान कारक का संकेत ‘के लिए’ से होता है।"
        },
        {
            id: `${quizId}-q02`,
            topic: "कारक",
            difficulty: "hard",
            question: "‘कर्ता कारक’ का सामान्य चिह्न/अर्थ क्या है?",
            options: [
                "हे/अरे",
                "ने",
                "का/की/के",
                "से/द्वारा"
            ],
            correctAnswer: 1,
            explanation: "कर्ता कारक का संकेत ‘ने’ से होता है।"
        },
        {
            id: `${quizId}-q03`,
            topic: "कारक",
            difficulty: "hard",
            question: "‘संबंध कारक’ का सामान्य चिह्न/अर्थ क्या है?",
            options: [
                "ने",
                "से अलग होना",
                "का/की/के",
                "के लिए"
            ],
            correctAnswer: 2,
            explanation: "संबंध कारक का संकेत ‘का/की/के’ से होता है।"
        },
        {
            id: `${quizId}-q04`,
            topic: "कारक",
            difficulty: "hard",
            question: "‘करण कारक’ का सामान्य चिह्न/अर्थ क्या है?",
            options: [
                "से अलग होना",
                "में/पर",
                "का/की/के",
                "से/द्वारा"
            ],
            correctAnswer: 3,
            explanation: "करण कारक का संकेत ‘से/द्वारा’ से होता है।"
        },
        {
            id: `${quizId}-q05`,
            topic: "कारक",
            difficulty: "hard",
            question: "‘संबोधन कारक’ का सामान्य चिह्न/अर्थ क्या है?",
            options: [
                "हे/अरे",
                "ने",
                "में/पर",
                "से/द्वारा"
            ],
            correctAnswer: 0,
            explanation: "संबोधन कारक का संकेत ‘हे/अरे’ से होता है।"
        },
        {
            id: `${quizId}-q06`,
            topic: "कारक",
            difficulty: "hard",
            question: "‘अपादान कारक’ का सामान्य चिह्न/अर्थ क्या है?",
            options: [
                "ने",
                "से अलग होना",
                "से/द्वारा",
                "हे/अरे"
            ],
            correctAnswer: 1,
            explanation: "अपादान कारक का संकेत ‘से अलग होना’ से होता है।"
        },
        {
            id: `${quizId}-q07`,
            topic: "कारक",
            difficulty: "hard",
            question: "‘कर्म कारक’ का सामान्य चिह्न/अर्थ क्या है?",
            options: [
                "का/की/के",
                "ने",
                "को",
                "में/पर"
            ],
            correctAnswer: 2,
            explanation: "कर्म कारक का संकेत ‘को’ से होता है।"
        },
        {
            id: `${quizId}-q08`,
            topic: "कारक",
            difficulty: "hard",
            question: "‘अधिकरण कारक’ का सामान्य चिह्न/अर्थ क्या है?",
            options: [
                "से अलग होना",
                "हे/अरे",
                "से/द्वारा",
                "में/पर"
            ],
            correctAnswer: 3,
            explanation: "अधिकरण कारक का संकेत ‘में/पर’ से होता है।"
        },
        {
            id: `${quizId}-q09`,
            topic: "कारक",
            difficulty: "hard",
            question: "‘संप्रदान कारक’ का सामान्य चिह्न/अर्थ क्या है? (प्रश्न प्रकार 2)",
            options: [
                "के लिए",
                "से अलग होना",
                "में/पर",
                "को"
            ],
            correctAnswer: 0,
            explanation: "संप्रदान कारक का संकेत ‘के लिए’ से होता है।"
        },
        {
            id: `${quizId}-q10`,
            topic: "कारक",
            difficulty: "hard",
            question: "‘कर्ता कारक’ का सामान्य चिह्न/अर्थ क्या है? (प्रश्न प्रकार 2)",
            options: [
                "में/पर",
                "ने",
                "से अलग होना",
                "का/की/के"
            ],
            correctAnswer: 1,
            explanation: "कर्ता कारक का संकेत ‘ने’ से होता है।"
        },
        {
            id: `${quizId}-q11`,
            topic: "कारक",
            difficulty: "hard",
            question: "‘संबंध कारक’ का सामान्य चिह्न/अर्थ क्या है? (प्रश्न प्रकार 2)",
            options: [
                "से/द्वारा",
                "से अलग होना",
                "का/की/के",
                "हे/अरे"
            ],
            correctAnswer: 2,
            explanation: "संबंध कारक का संकेत ‘का/की/के’ से होता है।"
        },
        {
            id: `${quizId}-q12`,
            topic: "कारक",
            difficulty: "hard",
            question: "‘करण कारक’ का सामान्य चिह्न/अर्थ क्या है? (प्रश्न प्रकार 2)",
            options: [
                "हे/अरे",
                "से अलग होना",
                "में/पर",
                "से/द्वारा"
            ],
            correctAnswer: 3,
            explanation: "करण कारक का संकेत ‘से/द्वारा’ से होता है।"
        },
        {
            id: `${quizId}-q13`,
            topic: "कारक",
            difficulty: "hard",
            question: "‘संबोधन कारक’ का सामान्य चिह्न/अर्थ क्या है? (प्रश्न प्रकार 2)",
            options: [
                "हे/अरे",
                "से/द्वारा",
                "को",
                "से अलग होना"
            ],
            correctAnswer: 0,
            explanation: "संबोधन कारक का संकेत ‘हे/अरे’ से होता है।"
        },
        {
            id: `${quizId}-q14`,
            topic: "कारक",
            difficulty: "hard",
            question: "‘अपादान कारक’ का सामान्य चिह्न/अर्थ क्या है? (प्रश्न प्रकार 2)",
            options: [
                "से/द्वारा",
                "से अलग होना",
                "ने",
                "में/पर"
            ],
            correctAnswer: 1,
            explanation: "अपादान कारक का संकेत ‘से अलग होना’ से होता है।"
        },
        {
            id: `${quizId}-q15`,
            topic: "कारक",
            difficulty: "hard",
            question: "‘कर्म कारक’ का सामान्य चिह्न/अर्थ क्या है? (प्रश्न प्रकार 2)",
            options: [
                "का/की/के",
                "से अलग होना",
                "को",
                "से/द्वारा"
            ],
            correctAnswer: 2,
            explanation: "कर्म कारक का संकेत ‘को’ से होता है।"
        },
        {
            id: `${quizId}-q16`,
            topic: "कारक",
            difficulty: "hard",
            question: "‘अधिकरण कारक’ का सामान्य चिह्न/अर्थ क्या है? (प्रश्न प्रकार 2)",
            options: [
                "के लिए",
                "से अलग होना",
                "का/की/के",
                "में/पर"
            ],
            correctAnswer: 3,
            explanation: "अधिकरण कारक का संकेत ‘में/पर’ से होता है।"
        },
        {
            id: `${quizId}-q17`,
            topic: "कारक",
            difficulty: "hard",
            question: "‘संप्रदान कारक’ का सामान्य चिह्न/अर्थ क्या है? (प्रश्न प्रकार 3)",
            options: [
                "के लिए",
                "हे/अरे",
                "ने",
                "से अलग होना"
            ],
            correctAnswer: 0,
            explanation: "संप्रदान कारक का संकेत ‘के लिए’ से होता है।"
        },
        {
            id: `${quizId}-q18`,
            topic: "कारक",
            difficulty: "hard",
            question: "‘कर्ता कारक’ का सामान्य चिह्न/अर्थ क्या है? (प्रश्न प्रकार 3)",
            options: [
                "के लिए",
                "ने",
                "हे/अरे",
                "का/की/के"
            ],
            correctAnswer: 1,
            explanation: "कर्ता कारक का संकेत ‘ने’ से होता है।"
        },
        {
            id: `${quizId}-q19`,
            topic: "कारक",
            difficulty: "hard",
            question: "‘संबंध कारक’ का सामान्य चिह्न/अर्थ क्या है? (प्रश्न प्रकार 3)",
            options: [
                "हे/अरे",
                "से/द्वारा",
                "का/की/के",
                "के लिए"
            ],
            correctAnswer: 2,
            explanation: "संबंध कारक का संकेत ‘का/की/के’ से होता है।"
        },
        {
            id: `${quizId}-q20`,
            topic: "कारक",
            difficulty: "hard",
            question: "‘करण कारक’ का सामान्य चिह्न/अर्थ क्या है? (प्रश्न प्रकार 3)",
            options: [
                "से अलग होना",
                "हे/अरे",
                "ने",
                "से/द्वारा"
            ],
            correctAnswer: 3,
            explanation: "करण कारक का संकेत ‘से/द्वारा’ से होता है।"
        },
        {
            id: `${quizId}-q21`,
            topic: "कारक",
            difficulty: "hard",
            question: "‘संबोधन कारक’ का सामान्य चिह्न/अर्थ क्या है? (प्रश्न प्रकार 3)",
            options: [
                "हे/अरे",
                "में/पर",
                "से/द्वारा",
                "ने"
            ],
            correctAnswer: 0,
            explanation: "संबोधन कारक का संकेत ‘हे/अरे’ से होता है।"
        },
        {
            id: `${quizId}-q22`,
            topic: "कारक",
            difficulty: "hard",
            question: "‘अपादान कारक’ का सामान्य चिह्न/अर्थ क्या है? (प्रश्न प्रकार 3)",
            options: [
                "को",
                "से अलग होना",
                "हे/अरे",
                "से/द्वारा"
            ],
            correctAnswer: 1,
            explanation: "अपादान कारक का संकेत ‘से अलग होना’ से होता है।"
        },
        {
            id: `${quizId}-q23`,
            topic: "कारक",
            difficulty: "hard",
            question: "‘कर्म कारक’ का सामान्य चिह्न/अर्थ क्या है? (प्रश्न प्रकार 3)",
            options: [
                "का/की/के",
                "में/पर",
                "को",
                "से/द्वारा"
            ],
            correctAnswer: 2,
            explanation: "कर्म कारक का संकेत ‘को’ से होता है।"
        },
        {
            id: `${quizId}-q24`,
            topic: "कारक",
            difficulty: "hard",
            question: "‘अधिकरण कारक’ का सामान्य चिह्न/अर्थ क्या है? (प्रश्न प्रकार 3)",
            options: [
                "ने",
                "से अलग होना",
                "को",
                "में/पर"
            ],
            correctAnswer: 3,
            explanation: "अधिकरण कारक का संकेत ‘में/पर’ से होता है।"
        },
        {
            id: `${quizId}-q25`,
            topic: "कारक",
            difficulty: "hard",
            question: "‘संप्रदान कारक’ का सामान्य चिह्न/अर्थ क्या है? (प्रश्न प्रकार 4)",
            options: [
                "के लिए",
                "हे/अरे",
                "को",
                "से/द्वारा"
            ],
            correctAnswer: 0,
            explanation: "संप्रदान कारक का संकेत ‘के लिए’ से होता है।"
        },
        {
            id: `${quizId}-q26`,
            topic: "कारक",
            difficulty: "hard",
            question: "‘कर्ता कारक’ का सामान्य चिह्न/अर्थ क्या है? (प्रश्न प्रकार 4)",
            options: [
                "से/द्वारा",
                "ने",
                "हे/अरे",
                "को"
            ],
            correctAnswer: 1,
            explanation: "कर्ता कारक का संकेत ‘ने’ से होता है।"
        },
        {
            id: `${quizId}-q27`,
            topic: "कारक",
            difficulty: "hard",
            question: "‘संबंध कारक’ का सामान्य चिह्न/अर्थ क्या है? (प्रश्न प्रकार 4)",
            options: [
                "ने",
                "से/द्वारा",
                "का/की/के",
                "से अलग होना"
            ],
            correctAnswer: 2,
            explanation: "संबंध कारक का संकेत ‘का/की/के’ से होता है।"
        },
        {
            id: `${quizId}-q28`,
            topic: "कारक",
            difficulty: "hard",
            question: "‘करण कारक’ का सामान्य चिह्न/अर्थ क्या है? (प्रश्न प्रकार 4)",
            options: [
                "हे/अरे",
                "में/पर",
                "ने",
                "से/द्वारा"
            ],
            correctAnswer: 3,
            explanation: "करण कारक का संकेत ‘से/द्वारा’ से होता है।"
        },
        {
            id: `${quizId}-q29`,
            topic: "कारक",
            difficulty: "hard",
            question: "‘संबोधन कारक’ का सामान्य चिह्न/अर्थ क्या है? (प्रश्न प्रकार 4)",
            options: [
                "हे/अरे",
                "से अलग होना",
                "से/द्वारा",
                "में/पर"
            ],
            correctAnswer: 0,
            explanation: "संबोधन कारक का संकेत ‘हे/अरे’ से होता है।"
        },
        {
            id: `${quizId}-q30`,
            topic: "कारक",
            difficulty: "hard",
            question: "‘अपादान कारक’ का सामान्य चिह्न/अर्थ क्या है? (प्रश्न प्रकार 4)",
            options: [
                "के लिए",
                "से अलग होना",
                "से/द्वारा",
                "ने"
            ],
            correctAnswer: 1,
            explanation: "अपादान कारक का संकेत ‘से अलग होना’ से होता है।"
        },
        {
            id: `${quizId}-q31`,
            topic: "कारक",
            difficulty: "hard",
            question: "‘कर्म कारक’ का सामान्य चिह्न/अर्थ क्या है? (प्रश्न प्रकार 4)",
            options: [
                "से अलग होना",
                "से/द्वारा",
                "को",
                "का/की/के"
            ],
            correctAnswer: 2,
            explanation: "कर्म कारक का संकेत ‘को’ से होता है।"
        },
        {
            id: `${quizId}-q32`,
            topic: "कारक",
            difficulty: "hard",
            question: "‘अधिकरण कारक’ का सामान्य चिह्न/अर्थ क्या है? (प्रश्न प्रकार 4)",
            options: [
                "हे/अरे",
                "से अलग होना",
                "से/द्वारा",
                "में/पर"
            ],
            correctAnswer: 3,
            explanation: "अधिकरण कारक का संकेत ‘में/पर’ से होता है।"
        },
        {
            id: `${quizId}-q33`,
            topic: "कारक",
            difficulty: "hard",
            question: "‘संप्रदान कारक’ का सामान्य चिह्न/अर्थ क्या है? (प्रश्न प्रकार 5)",
            options: [
                "के लिए",
                "को",
                "का/की/के",
                "से अलग होना"
            ],
            correctAnswer: 0,
            explanation: "संप्रदान कारक का संकेत ‘के लिए’ से होता है।"
        },
        {
            id: `${quizId}-q34`,
            topic: "कारक",
            difficulty: "hard",
            question: "‘कर्ता कारक’ का सामान्य चिह्न/अर्थ क्या है? (प्रश्न प्रकार 5)",
            options: [
                "से अलग होना",
                "ने",
                "में/पर",
                "का/की/के"
            ],
            correctAnswer: 1,
            explanation: "कर्ता कारक का संकेत ‘ने’ से होता है।"
        },
        {
            id: `${quizId}-q35`,
            topic: "कारक",
            difficulty: "hard",
            question: "‘संबंध कारक’ का सामान्य चिह्न/अर्थ क्या है? (प्रश्न प्रकार 5)",
            options: [
                "से/द्वारा",
                "को",
                "का/की/के",
                "से अलग होना"
            ],
            correctAnswer: 2,
            explanation: "संबंध कारक का संकेत ‘का/की/के’ से होता है।"
        },
        {
            id: `${quizId}-q36`,
            topic: "कारक",
            difficulty: "hard",
            question: "‘करण कारक’ का सामान्य चिह्न/अर्थ क्या है? (प्रश्न प्रकार 5)",
            options: [
                "ने",
                "को",
                "से अलग होना",
                "से/द्वारा"
            ],
            correctAnswer: 3,
            explanation: "करण कारक का संकेत ‘से/द्वारा’ से होता है।"
        },
        {
            id: `${quizId}-q37`,
            topic: "कारक",
            difficulty: "hard",
            question: "‘संबोधन कारक’ का सामान्य चिह्न/अर्थ क्या है? (प्रश्न प्रकार 5)",
            options: [
                "हे/अरे",
                "के लिए",
                "में/पर",
                "का/की/के"
            ],
            correctAnswer: 0,
            explanation: "संबोधन कारक का संकेत ‘हे/अरे’ से होता है।"
        },
        {
            id: `${quizId}-q38`,
            topic: "कारक",
            difficulty: "hard",
            question: "‘अपादान कारक’ का सामान्य चिह्न/अर्थ क्या है? (प्रश्न प्रकार 5)",
            options: [
                "ने",
                "से अलग होना",
                "में/पर",
                "हे/अरे"
            ],
            correctAnswer: 1,
            explanation: "अपादान कारक का संकेत ‘से अलग होना’ से होता है।"
        },
        {
            id: `${quizId}-q39`,
            topic: "कारक",
            difficulty: "hard",
            question: "‘कर्म कारक’ का सामान्य चिह्न/अर्थ क्या है? (प्रश्न प्रकार 5)",
            options: [
                "के लिए",
                "हे/अरे",
                "को",
                "से अलग होना"
            ],
            correctAnswer: 2,
            explanation: "कर्म कारक का संकेत ‘को’ से होता है।"
        },
        {
            id: `${quizId}-q40`,
            topic: "कारक",
            difficulty: "hard",
            question: "‘अधिकरण कारक’ का सामान्य चिह्न/अर्थ क्या है? (प्रश्न प्रकार 5)",
            options: [
                "का/की/के",
                "ने",
                "से/द्वारा",
                "में/पर"
            ],
            correctAnswer: 3,
            explanation: "अधिकरण कारक का संकेत ‘में/पर’ से होता है।"
        },
        {
            id: `${quizId}-q41`,
            topic: "कारक",
            difficulty: "hard",
            question: "‘संप्रदान कारक’ का सामान्य चिह्न/अर्थ क्या है? (प्रश्न प्रकार 6)",
            options: [
                "के लिए",
                "से/द्वारा",
                "में/पर",
                "का/की/के"
            ],
            correctAnswer: 0,
            explanation: "संप्रदान कारक का संकेत ‘के लिए’ से होता है।"
        },
        {
            id: `${quizId}-q42`,
            topic: "कारक",
            difficulty: "hard",
            question: "‘कर्ता कारक’ का सामान्य चिह्न/अर्थ क्या है? (प्रश्न प्रकार 6)",
            options: [
                "का/की/के",
                "ने",
                "से अलग होना",
                "हे/अरे"
            ],
            correctAnswer: 1,
            explanation: "कर्ता कारक का संकेत ‘ने’ से होता है।"
        },
        {
            id: `${quizId}-q43`,
            topic: "कारक",
            difficulty: "hard",
            question: "‘संबंध कारक’ का सामान्य चिह्न/अर्थ क्या है? (प्रश्न प्रकार 6)",
            options: [
                "को",
                "से अलग होना",
                "का/की/के",
                "के लिए"
            ],
            correctAnswer: 2,
            explanation: "संबंध कारक का संकेत ‘का/की/के’ से होता है।"
        },
        {
            id: `${quizId}-q44`,
            topic: "कारक",
            difficulty: "hard",
            question: "‘करण कारक’ का सामान्य चिह्न/अर्थ क्या है? (प्रश्न प्रकार 6)",
            options: [
                "में/पर",
                "से अलग होना",
                "के लिए",
                "से/द्वारा"
            ],
            correctAnswer: 3,
            explanation: "करण कारक का संकेत ‘से/द्वारा’ से होता है।"
        },
        {
            id: `${quizId}-q45`,
            topic: "कारक",
            difficulty: "hard",
            question: "‘संबोधन कारक’ का सामान्य चिह्न/अर्थ क्या है? (प्रश्न प्रकार 6)",
            options: [
                "हे/अरे",
                "में/पर",
                "से अलग होना",
                "के लिए"
            ],
            correctAnswer: 0,
            explanation: "संबोधन कारक का संकेत ‘हे/अरे’ से होता है।"
        },
        {
            id: `${quizId}-q46`,
            topic: "कारक",
            difficulty: "hard",
            question: "‘अपादान कारक’ का सामान्य चिह्न/अर्थ क्या है? (प्रश्न प्रकार 6)",
            options: [
                "का/की/के",
                "से अलग होना",
                "ने",
                "हे/अरे"
            ],
            correctAnswer: 1,
            explanation: "अपादान कारक का संकेत ‘से अलग होना’ से होता है।"
        },
        {
            id: `${quizId}-q47`,
            topic: "कारक",
            difficulty: "hard",
            question: "‘कर्म कारक’ का सामान्य चिह्न/अर्थ क्या है? (प्रश्न प्रकार 6)",
            options: [
                "का/की/के",
                "से अलग होना",
                "को",
                "में/पर"
            ],
            correctAnswer: 2,
            explanation: "कर्म कारक का संकेत ‘को’ से होता है।"
        },
        {
            id: `${quizId}-q48`,
            topic: "कारक",
            difficulty: "hard",
            question: "‘अधिकरण कारक’ का सामान्य चिह्न/अर्थ क्या है? (प्रश्न प्रकार 6)",
            options: [
                "से अलग होना",
                "ने",
                "हे/अरे",
                "में/पर"
            ],
            correctAnswer: 3,
            explanation: "अधिकरण कारक का संकेत ‘में/पर’ से होता है।"
        },
        {
            id: `${quizId}-q49`,
            topic: "कारक",
            difficulty: "hard",
            question: "‘संप्रदान कारक’ का सामान्य चिह्न/अर्थ क्या है? (प्रश्न प्रकार 7)",
            options: [
                "के लिए",
                "से अलग होना",
                "से/द्वारा",
                "को"
            ],
            correctAnswer: 0,
            explanation: "संप्रदान कारक का संकेत ‘के लिए’ से होता है।"
        },
        {
            id: `${quizId}-q50`,
            topic: "कारक",
            difficulty: "hard",
            question: "‘कर्ता कारक’ का सामान्य चिह्न/अर्थ क्या है? (प्रश्न प्रकार 7)",
            options: [
                "से/द्वारा",
                "ने",
                "से अलग होना",
                "का/की/के"
            ],
            correctAnswer: 1,
            explanation: "कर्ता कारक का संकेत ‘ने’ से होता है।"
        }
    ];

    window.GJU_QUIZ_BANK.push({
        id: quizId,
        subject: "Hindi",
        title: "Hindi UP Police Practice Set",
        questions
    });
})();
