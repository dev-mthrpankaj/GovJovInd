(function () {
    "use strict";

    window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];

    const quizId = "hindi-varnmala-practice-set-3";

    const questions = [
        {
            id: `${quizId}-q01`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "“घ” किस प्रकार का वर्ण है?",
            options: ["घोष महाप्राण", "अघोष अल्पप्राण", "अघोष महाप्राण", "अंतस्थ"],
            correctAnswer: 0,
            explanation: "घ क-वर्ग का चौथा वर्ण है; यह घोष महाप्राण है।"
        },
        {
            id: `${quizId}-q02`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "“च” किस प्रकार का वर्ण है?",
            options: ["अघोष अल्पप्राण", "अघोष महाप्राण", "घोष अल्पप्राण", "घोष महाप्राण"],
            correctAnswer: 0,
            explanation: "च च-वर्ग का पहला वर्ण है; यह अघोष अल्पप्राण है।"
        },
        {
            id: `${quizId}-q03`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "“झ” किस प्रकार का वर्ण है?",
            options: ["घोष महाप्राण", "घोष अल्पप्राण", "अघोष अल्पप्राण", "अघोष महाप्राण"],
            correctAnswer: 0,
            explanation: "झ च-वर्ग का चौथा वर्ण है; यह घोष महाप्राण है।"
        },
        {
            id: `${quizId}-q04`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "“ट” किस प्रकार का वर्ण है?",
            options: ["अघोष अल्पप्राण", "घोष अल्पप्राण", "अघोष महाप्राण", "नासिक्य"],
            correctAnswer: 0,
            explanation: "ट ट-वर्ग का पहला वर्ण है; यह अघोष अल्पप्राण है।"
        },
        {
            id: `${quizId}-q05`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "“ढ” किस प्रकार का वर्ण है?",
            options: ["घोष महाप्राण", "अघोष महाप्राण", "घोष अल्पप्राण", "ऊष्म"],
            correctAnswer: 0,
            explanation: "ढ ट-वर्ग का चौथा वर्ण है; यह घोष महाप्राण है।"
        },
        {
            id: `${quizId}-q06`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "“थ” किस प्रकार का वर्ण है?",
            options: ["अघोष महाप्राण", "घोष महाप्राण", "घोष अल्पप्राण", "नासिक्य"],
            correctAnswer: 0,
            explanation: "थ त-वर्ग का दूसरा वर्ण है; यह अघोष महाप्राण है।"
        },
        {
            id: `${quizId}-q07`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "“द” किस प्रकार का वर्ण है?",
            options: ["घोष अल्पप्राण", "अघोष अल्पप्राण", "अघोष महाप्राण", "घोष महाप्राण"],
            correctAnswer: 0,
            explanation: "द त-वर्ग का तीसरा वर्ण है; यह घोष अल्पप्राण है।"
        },
        {
            id: `${quizId}-q08`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "“भ” किस प्रकार का वर्ण है?",
            options: ["घोष महाप्राण", "अघोष महाप्राण", "घोष अल्पप्राण", "अघोष अल्पप्राण"],
            correctAnswer: 0,
            explanation: "भ प-वर्ग का चौथा वर्ण है; यह घोष महाप्राण है।"
        },
        {
            id: `${quizId}-q09`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "अनुस्वार का चिह्न कौन-सा है?",
            options: ["ं", "ँ", "ः", "्"],
            correctAnswer: 0,
            explanation: "अनुस्वार का चिह्न बिंदु “ं” है।"
        },
        {
            id: `${quizId}-q10`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "चंद्रबिंदु/अनुनासिक का चिह्न कौन-सा है?",
            options: ["ँ", "ं", "ः", "़"],
            correctAnswer: 0,
            explanation: "अनुनासिकता दिखाने के लिए चंद्रबिंदु “ँ” का प्रयोग होता है।"
        },
        {
            id: `${quizId}-q11`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "विसर्ग का चिह्न कौन-सा है?",
            options: ["ः", "ं", "ँ", "्"],
            correctAnswer: 0,
            explanation: "विसर्ग का चिह्न “ः” है।"
        },
        {
            id: `${quizId}-q12`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "“अंश” शब्द में प्रयुक्त बिंदु क्या कहलाता है?",
            options: ["अनुस्वार", "विसर्ग", "हलंत", "मात्रा"],
            correctAnswer: 0,
            explanation: "अंश में “ं” अनुस्वार का चिह्न है।"
        },
        {
            id: `${quizId}-q13`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "“हँसना” शब्द में प्रयुक्त चंद्रबिंदु क्या दर्शाता है?",
            options: ["अनुनासिक ध्वनि", "विसर्ग", "हलंत", "संयुक्ताक्षर"],
            correctAnswer: 0,
            explanation: "हँसना में “ँ” स्वर की अनुनासिकता बताता है।"
        },
        {
            id: `${quizId}-q14`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "“दुःख” शब्द में “ः” कौन-सा चिह्न है?",
            options: ["विसर्ग", "अनुस्वार", "चंद्रबिंदु", "हलंत"],
            correctAnswer: 0,
            explanation: "दुःख में “ः” विसर्ग का चिह्न है।"
        },
        {
            id: `${quizId}-q15`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "अनुस्वार का उच्चारण प्रायः किस प्रकार होता है?",
            options: ["नासिक्य ध्वनि की तरह", "विसर्ग की तरह", "दीर्घ स्वर की तरह", "हलंत की तरह"],
            correctAnswer: 0,
            explanation: "अनुस्वार का संबंध नासिक्य ध्वनि से होता है।"
        },
        {
            id: `${quizId}-q16`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "अनुनासिकता के लिए सही उदाहरण कौन-सा है?",
            options: ["माँ", "मन", "माल", "मात्रा"],
            correctAnswer: 0,
            explanation: "माँ में चंद्रबिंदु स्वर को अनुनासिक बनाता है।"
        },
        {
            id: `${quizId}-q17`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "अनुस्वार के लिए सही उदाहरण कौन-सा है?",
            options: ["संत", "सती", "सुरा", "सखा"],
            correctAnswer: 0,
            explanation: "संत में “ं” अनुस्वार का प्रयोग है।"
        },
        {
            id: `${quizId}-q18`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "विसर्ग के लिए सही उदाहरण कौन-सा है?",
            options: ["दुःख", "दाग", "दया", "दिन"],
            correctAnswer: 0,
            explanation: "दुःख में विसर्ग चिह्न “ः” प्रयुक्त हुआ है।"
        },
        {
            id: `${quizId}-q19`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "वर्णमाला के परंपरागत क्रम में “अ” का स्थान कौन-सा है?",
            options: ["1", "2", "4", "43"],
            correctAnswer: 0,
            explanation: "मानक क्रम में “अ” का स्थान 1 है।"
        },
        {
            id: `${quizId}-q20`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "वर्णमाला के परंपरागत क्रम में “ऋ” का स्थान कौन-सा है?",
            options: ["7", "8", "5", "10"],
            correctAnswer: 0,
            explanation: "मानक क्रम में “ऋ” का स्थान 7 है।"
        },
        {
            id: `${quizId}-q21`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "वर्णमाला के परंपरागत क्रम में “औ” का स्थान कौन-सा है?",
            options: ["11", "12", "9", "14"],
            correctAnswer: 0,
            explanation: "मानक क्रम में “औ” का स्थान 11 है।"
        },
        {
            id: `${quizId}-q22`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "वर्णमाला के परंपरागत क्रम में “क” का स्थान कौन-सा है?",
            options: ["12", "13", "10", "15"],
            correctAnswer: 0,
            explanation: "मानक क्रम में “क” का स्थान 12 है।"
        },
        {
            id: `${quizId}-q23`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "वर्णमाला के परंपरागत क्रम में “ङ” का स्थान कौन-सा है?",
            options: ["16", "17", "14", "19"],
            correctAnswer: 0,
            explanation: "मानक क्रम में “ङ” का स्थान 16 है।"
        },
        {
            id: `${quizId}-q24`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "वर्णमाला के परंपरागत क्रम में “च” का स्थान कौन-सा है?",
            options: ["17", "18", "15", "20"],
            correctAnswer: 0,
            explanation: "मानक क्रम में “च” का स्थान 17 है।"
        },
        {
            id: `${quizId}-q25`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "वर्णमाला के परंपरागत क्रम में “ञ” का स्थान कौन-सा है?",
            options: ["21", "22", "19", "24"],
            correctAnswer: 0,
            explanation: "मानक क्रम में “ञ” का स्थान 21 है।"
        },
        {
            id: `${quizId}-q26`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "वर्णमाला के परंपरागत क्रम में “ट” का स्थान कौन-सा है?",
            options: ["22", "23", "20", "25"],
            correctAnswer: 0,
            explanation: "मानक क्रम में “ट” का स्थान 22 है।"
        },
        {
            id: `${quizId}-q27`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "वर्णमाला के परंपरागत क्रम में “ण” का स्थान कौन-सा है?",
            options: ["26", "27", "24", "29"],
            correctAnswer: 0,
            explanation: "मानक क्रम में “ण” का स्थान 26 है।"
        },
        {
            id: `${quizId}-q28`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "वर्णमाला के परंपरागत क्रम में “त” का स्थान कौन-सा है?",
            options: ["27", "28", "25", "30"],
            correctAnswer: 0,
            explanation: "मानक क्रम में “त” का स्थान 27 है।"
        },
        {
            id: `${quizId}-q29`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "वर्णमाला के परंपरागत क्रम में “न” का स्थान कौन-सा है?",
            options: ["31", "32", "29", "34"],
            correctAnswer: 0,
            explanation: "मानक क्रम में “न” का स्थान 31 है।"
        },
        {
            id: `${quizId}-q30`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "वर्णमाला के परंपरागत क्रम में “प” का स्थान कौन-सा है?",
            options: ["32", "33", "30", "35"],
            correctAnswer: 0,
            explanation: "मानक क्रम में “प” का स्थान 32 है।"
        },
        {
            id: `${quizId}-q31`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "वर्णमाला के परंपरागत क्रम में “म” का स्थान कौन-सा है?",
            options: ["36", "37", "34", "39"],
            correctAnswer: 0,
            explanation: "मानक क्रम में “म” का स्थान 36 है।"
        },
        {
            id: `${quizId}-q32`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "वर्णमाला के परंपरागत क्रम में “य” का स्थान कौन-सा है?",
            options: ["37", "38", "35", "40"],
            correctAnswer: 0,
            explanation: "मानक क्रम में “य” का स्थान 37 है।"
        },
        {
            id: `${quizId}-q33`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "वर्णमाला के परंपरागत क्रम में “व” का स्थान कौन-सा है?",
            options: ["40", "41", "38", "43"],
            correctAnswer: 0,
            explanation: "मानक क्रम में “व” का स्थान 40 है।"
        },
        {
            id: `${quizId}-q34`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "वर्णमाला के परंपरागत क्रम में “श” का स्थान कौन-सा है?",
            options: ["41", "42", "39", "44"],
            correctAnswer: 0,
            explanation: "मानक क्रम में “श” का स्थान 41 है।"
        },
        {
            id: `${quizId}-q35`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "वर्णमाला के परंपरागत क्रम में “ह” का स्थान कौन-सा है?",
            options: ["44", "43", "42", "43"],
            correctAnswer: 0,
            explanation: "मानक क्रम में “ह” का स्थान 44 है।"
        },
        {
            id: `${quizId}-q36`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "वर्णमाला क्रम में “ख” के ठीक बाद कौन-सा वर्ण आता है?",
            options: ["ग", "क", "ख", "ह"],
            correctAnswer: 0,
            explanation: "वर्णमाला क्रम में क के बाद ख और उसके बाद ग आता है।"
        },
        {
            id: `${quizId}-q37`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "वर्णमाला क्रम में “घ” के ठीक बाद कौन-सा वर्ण आता है?",
            options: ["ङ", "ग", "घ", "ह"],
            correctAnswer: 0,
            explanation: "वर्णमाला क्रम में ग के बाद घ और उसके बाद ङ आता है।"
        },
        {
            id: `${quizId}-q38`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "वर्णमाला क्रम में “छ” के ठीक बाद कौन-सा वर्ण आता है?",
            options: ["ज", "च", "छ", "ह"],
            correctAnswer: 0,
            explanation: "वर्णमाला क्रम में च के बाद छ और उसके बाद ज आता है।"
        },
        {
            id: `${quizId}-q39`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "वर्णमाला क्रम में “झ” के ठीक बाद कौन-सा वर्ण आता है?",
            options: ["ञ", "ज", "झ", "ह"],
            correctAnswer: 0,
            explanation: "वर्णमाला क्रम में ज के बाद झ और उसके बाद ञ आता है।"
        },
        {
            id: `${quizId}-q40`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "वर्णमाला क्रम में “ठ” के ठीक बाद कौन-सा वर्ण आता है?",
            options: ["ड", "ट", "ठ", "ह"],
            correctAnswer: 0,
            explanation: "वर्णमाला क्रम में ट के बाद ठ और उसके बाद ड आता है।"
        },
        {
            id: `${quizId}-q41`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "वर्णमाला क्रम में “ढ” के ठीक बाद कौन-सा वर्ण आता है?",
            options: ["ण", "ड", "ढ", "ह"],
            correctAnswer: 0,
            explanation: "वर्णमाला क्रम में ड के बाद ढ और उसके बाद ण आता है।"
        },
        {
            id: `${quizId}-q42`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "वर्णमाला क्रम में “थ” के ठीक बाद कौन-सा वर्ण आता है?",
            options: ["द", "त", "थ", "ह"],
            correctAnswer: 0,
            explanation: "वर्णमाला क्रम में त के बाद थ और उसके बाद द आता है।"
        },
        {
            id: `${quizId}-q43`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "वर्णमाला क्रम में “ध” के ठीक बाद कौन-सा वर्ण आता है?",
            options: ["न", "द", "ध", "ह"],
            correctAnswer: 0,
            explanation: "वर्णमाला क्रम में द के बाद ध और उसके बाद न आता है।"
        },
        {
            id: `${quizId}-q44`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "वर्णमाला क्रम में “फ” के ठीक बाद कौन-सा वर्ण आता है?",
            options: ["ब", "प", "फ", "ह"],
            correctAnswer: 0,
            explanation: "वर्णमाला क्रम में प के बाद फ और उसके बाद ब आता है।"
        },
        {
            id: `${quizId}-q45`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "वर्णमाला क्रम में “भ” के ठीक बाद कौन-सा वर्ण आता है?",
            options: ["म", "ब", "भ", "ह"],
            correctAnswer: 0,
            explanation: "वर्णमाला क्रम में ब के बाद भ और उसके बाद म आता है।"
        },
        {
            id: `${quizId}-q46`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "वर्णमाला क्रम में “र” के ठीक बाद कौन-सा वर्ण आता है?",
            options: ["ल", "य", "र", "ह"],
            correctAnswer: 0,
            explanation: "वर्णमाला क्रम में य के बाद र और उसके बाद ल आता है।"
        },
        {
            id: `${quizId}-q47`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "वर्णमाला क्रम में “ष” के ठीक बाद कौन-सा वर्ण आता है?",
            options: ["स", "श", "ष", "ह"],
            correctAnswer: 0,
            explanation: "वर्णमाला क्रम में श के बाद ष और उसके बाद स आता है।"
        },
        {
            id: `${quizId}-q48`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "वर्णमाला क्रम में “ख” के ठीक पहले कौन-सा वर्ण आता है?",
            options: ["क", "ग", "ख", "अ"],
            correctAnswer: 0,
            explanation: "वर्णमाला क्रम में “ख” से ठीक पहले “क” आता है।"
        },
        {
            id: `${quizId}-q49`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "वर्णमाला क्रम में “घ” के ठीक पहले कौन-सा वर्ण आता है?",
            options: ["ग", "ङ", "घ", "अ"],
            correctAnswer: 0,
            explanation: "वर्णमाला क्रम में “घ” से ठीक पहले “ग” आता है।"
        },
        {
            id: `${quizId}-q50`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "वर्णमाला क्रम में “छ” के ठीक पहले कौन-सा वर्ण आता है?",
            options: ["च", "ज", "छ", "अ"],
            correctAnswer: 0,
            explanation: "वर्णमाला क्रम में “छ” से ठीक पहले “च” आता है।"
        }
    ];

    window.GJU_QUIZ_BANK.push({
        id: quizId,
        subject: "Hindi",
        title: "Hindi Varnamala Practice Set 3",
        description: "Hindi Varnamala topic ke 50 unique questions with professional explanations for competitive exam practice.",
        durationMinutes: 35,
        totalQuestions: questions.length,
        marksPerQuestion: 1,
        negativeMarks: 0.25,
        difficulty: "Hard",
        tags: ["Hindi", "Varnamala", "Vyakaran", "UPSI", "PCS", "SSC", "Practice Set"],
        questions: questions
    });}());
