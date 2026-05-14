(function () {
    "use strict";

    window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];

    const quizId = "hindi-varnmala-practice-set-2";

    const questions = [
        {
            id: `${quizId}-q01`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "ट-वर्ग का पंचम वर्ण कौन-सा है?",
            options: ["मूर्धन्य", "ट", "ठ", "ड"],
            correctAnswer: 0,
            explanation: "ट-वर्ग में पाँचवाँ वर्ण मूर्धन्य होता है; पंचम वर्ण नासिक्य ध्वनि देता है।"
        },
        {
            id: `${quizId}-q02`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "त-वर्ग का पंचम वर्ण कौन-सा है?",
            options: ["दंत्य", "त", "थ", "द"],
            correctAnswer: 0,
            explanation: "त-वर्ग में पाँचवाँ वर्ण दंत्य होता है; पंचम वर्ण नासिक्य ध्वनि देता है।"
        },
        {
            id: `${quizId}-q03`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "प-वर्ग का पंचम वर्ण कौन-सा है?",
            options: ["ओष्ठ्य", "प", "फ", "ब"],
            correctAnswer: 0,
            explanation: "प-वर्ग में पाँचवाँ वर्ण ओष्ठ्य होता है; पंचम वर्ण नासिक्य ध्वनि देता है।"
        },
        {
            id: `${quizId}-q04`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "पंचमाक्षर किस प्रकार की ध्वनि से संबंधित होते हैं?",
            options: ["नासिक्य ध्वनि", "ऊष्म ध्वनि", "अंतस्थ ध्वनि", "दीर्घ स्वर"],
            correctAnswer: 0,
            explanation: "हर वर्ग का पाँचवाँ वर्ण नासिक्य ध्वनि से संबंधित होता है।"
        },
        {
            id: `${quizId}-q05`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "ङ किस वर्ग का पंचम वर्ण है?",
            options: ["क-वर्ग", "च-वर्ग", "ट-वर्ग", "त-वर्ग"],
            correctAnswer: 0,
            explanation: "ङ क-वर्ग का पाँचवाँ वर्ण है।"
        },
        {
            id: `${quizId}-q06`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "ञ किस वर्ग का पंचम वर्ण है?",
            options: ["क-वर्ग", "च-वर्ग", "ट-वर्ग", "प-वर्ग"],
            correctAnswer: 1,
            explanation: "ञ च-वर्ग का पंचम वर्ण है।"
        },
        {
            id: `${quizId}-q07`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "ण किस वर्ग का पंचम वर्ण है?",
            options: ["ट-वर्ग", "त-वर्ग", "प-वर्ग", "क-वर्ग"],
            correctAnswer: 0,
            explanation: "ण ट-वर्ग का पंचम वर्ण है।"
        },
        {
            id: `${quizId}-q08`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "न किस वर्ग का पंचम वर्ण है?",
            options: ["त-वर्ग", "ट-वर्ग", "प-वर्ग", "च-वर्ग"],
            correctAnswer: 0,
            explanation: "न त-वर्ग का पंचम वर्ण है।"
        },
        {
            id: `${quizId}-q09`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "म किस वर्ग का पंचम वर्ण है?",
            options: ["प-वर्ग", "त-वर्ग", "क-वर्ग", "च-वर्ग"],
            correctAnswer: 0,
            explanation: "म प-वर्ग का पंचम वर्ण है।"
        },
        {
            id: `${quizId}-q10`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "“अ” का प्रमुख उच्चारण-स्थान क्या है?",
            options: ["कंठ्य", "तालव्य", "मूर्धन्य", "दंत्य"],
            correctAnswer: 0,
            explanation: "“अ” का प्रमुख उच्चारण-स्थान कंठ्य माना जाता है।"
        },
        {
            id: `${quizId}-q11`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "“आ” का प्रमुख उच्चारण-स्थान क्या है?",
            options: ["कंठ्य", "तालव्य", "मूर्धन्य", "दंत्य"],
            correctAnswer: 0,
            explanation: "“आ” का प्रमुख उच्चारण-स्थान कंठ्य माना जाता है।"
        },
        {
            id: `${quizId}-q12`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "“इ” का प्रमुख उच्चारण-स्थान क्या है?",
            options: ["तालव्य", "कंठ्य", "मूर्धन्य", "दंत्य"],
            correctAnswer: 0,
            explanation: "“इ” का प्रमुख उच्चारण-स्थान तालव्य माना जाता है।"
        },
        {
            id: `${quizId}-q13`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "“ई” का प्रमुख उच्चारण-स्थान क्या है?",
            options: ["तालव्य", "कंठ्य", "मूर्धन्य", "दंत्य"],
            correctAnswer: 0,
            explanation: "“ई” का प्रमुख उच्चारण-स्थान तालव्य माना जाता है।"
        },
        {
            id: `${quizId}-q14`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "“उ” का प्रमुख उच्चारण-स्थान क्या है?",
            options: ["ओष्ठ्य", "कंठ्य", "तालव्य", "मूर्धन्य"],
            correctAnswer: 0,
            explanation: "“उ” का प्रमुख उच्चारण-स्थान ओष्ठ्य माना जाता है।"
        },
        {
            id: `${quizId}-q15`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "“ऊ” का प्रमुख उच्चारण-स्थान क्या है?",
            options: ["ओष्ठ्य", "कंठ्य", "तालव्य", "मूर्धन्य"],
            correctAnswer: 0,
            explanation: "“ऊ” का प्रमुख उच्चारण-स्थान ओष्ठ्य माना जाता है।"
        },
        {
            id: `${quizId}-q16`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "“ऋ” का प्रमुख उच्चारण-स्थान क्या है?",
            options: ["मूर्धन्य", "कंठ्य", "तालव्य", "दंत्य"],
            correctAnswer: 0,
            explanation: "“ऋ” का प्रमुख उच्चारण-स्थान मूर्धन्य माना जाता है।"
        },
        {
            id: `${quizId}-q17`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "“ए” का प्रमुख उच्चारण-स्थान क्या है?",
            options: ["कंठ-तालव्य", "कंठ्य", "तालव्य", "मूर्धन्य"],
            correctAnswer: 0,
            explanation: "“ए” का प्रमुख उच्चारण-स्थान कंठ-तालव्य माना जाता है।"
        },
        {
            id: `${quizId}-q18`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "“ऐ” का प्रमुख उच्चारण-स्थान क्या है?",
            options: ["कंठ-तालव्य", "कंठ्य", "तालव्य", "मूर्धन्य"],
            correctAnswer: 0,
            explanation: "“ऐ” का प्रमुख उच्चारण-स्थान कंठ-तालव्य माना जाता है।"
        },
        {
            id: `${quizId}-q19`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "“ओ” का प्रमुख उच्चारण-स्थान क्या है?",
            options: ["कंठ-ओष्ठ्य", "कंठ्य", "तालव्य", "मूर्धन्य"],
            correctAnswer: 0,
            explanation: "“ओ” का प्रमुख उच्चारण-स्थान कंठ-ओष्ठ्य माना जाता है।"
        },
        {
            id: `${quizId}-q20`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "“औ” का प्रमुख उच्चारण-स्थान क्या है?",
            options: ["कंठ-ओष्ठ्य", "कंठ्य", "तालव्य", "मूर्धन्य"],
            correctAnswer: 0,
            explanation: "“औ” का प्रमुख उच्चारण-स्थान कंठ-ओष्ठ्य माना जाता है।"
        },
        {
            id: `${quizId}-q21`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "“य” का प्रमुख उच्चारण-स्थान क्या है?",
            options: ["तालव्य", "कंठ्य", "मूर्धन्य", "दंत्य"],
            correctAnswer: 0,
            explanation: "“य” का प्रमुख उच्चारण-स्थान तालव्य माना जाता है।"
        },
        {
            id: `${quizId}-q22`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "“र” का प्रमुख उच्चारण-स्थान क्या है?",
            options: ["मूर्धन्य", "कंठ्य", "तालव्य", "दंत्य"],
            correctAnswer: 0,
            explanation: "“र” का प्रमुख उच्चारण-स्थान मूर्धन्य माना जाता है।"
        },
        {
            id: `${quizId}-q23`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "“ल” का प्रमुख उच्चारण-स्थान क्या है?",
            options: ["दंत्य", "कंठ्य", "तालव्य", "मूर्धन्य"],
            correctAnswer: 0,
            explanation: "“ल” का प्रमुख उच्चारण-स्थान दंत्य माना जाता है।"
        },
        {
            id: `${quizId}-q24`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "“व” का प्रमुख उच्चारण-स्थान क्या है?",
            options: ["दंत-ओष्ठ्य", "कंठ्य", "तालव्य", "मूर्धन्य"],
            correctAnswer: 0,
            explanation: "“व” का प्रमुख उच्चारण-स्थान दंत-ओष्ठ्य माना जाता है।"
        },
        {
            id: `${quizId}-q25`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "“श” का प्रमुख उच्चारण-स्थान क्या है?",
            options: ["तालव्य", "कंठ्य", "मूर्धन्य", "दंत्य"],
            correctAnswer: 0,
            explanation: "“श” का प्रमुख उच्चारण-स्थान तालव्य माना जाता है।"
        },
        {
            id: `${quizId}-q26`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "“ष” का प्रमुख उच्चारण-स्थान क्या है?",
            options: ["मूर्धन्य", "कंठ्य", "तालव्य", "दंत्य"],
            correctAnswer: 0,
            explanation: "“ष” का प्रमुख उच्चारण-स्थान मूर्धन्य माना जाता है।"
        },
        {
            id: `${quizId}-q27`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "“स” का प्रमुख उच्चारण-स्थान क्या है?",
            options: ["दंत्य", "कंठ्य", "तालव्य", "मूर्धन्य"],
            correctAnswer: 0,
            explanation: "“स” का प्रमुख उच्चारण-स्थान दंत्य माना जाता है।"
        },
        {
            id: `${quizId}-q28`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "“ह” का प्रमुख उच्चारण-स्थान क्या है?",
            options: ["कंठ्य", "तालव्य", "मूर्धन्य", "दंत्य"],
            correctAnswer: 0,
            explanation: "“ह” का प्रमुख उच्चारण-स्थान कंठ्य माना जाता है।"
        },
        {
            id: `${quizId}-q29`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "क-वर्ग में महाप्राण वर्ण कौन-से हैं?",
            options: ["ख, घ", "क, ग", "ग, ङ", "क, ङ"],
            correctAnswer: 0,
            explanation: "क-वर्ग में दूसरा और चौथा वर्ण महाप्राण होते हैं: ख और घ।"
        },
        {
            id: `${quizId}-q30`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "च-वर्ग में महाप्राण वर्ण कौन-से हैं?",
            options: ["छ, झ", "च, ज", "ज, ञ", "च, ञ"],
            correctAnswer: 0,
            explanation: "च-वर्ग में दूसरा और चौथा वर्ण महाप्राण होते हैं: छ और झ।"
        },
        {
            id: `${quizId}-q31`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "ट-वर्ग में महाप्राण वर्ण कौन-से हैं?",
            options: ["ठ, ढ", "ट, ड", "ड, ण", "ट, ण"],
            correctAnswer: 0,
            explanation: "ट-वर्ग में दूसरा और चौथा वर्ण महाप्राण होते हैं: ठ और ढ।"
        },
        {
            id: `${quizId}-q32`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "त-वर्ग में महाप्राण वर्ण कौन-से हैं?",
            options: ["थ, ध", "त, द", "द, न", "त, न"],
            correctAnswer: 0,
            explanation: "त-वर्ग में दूसरा और चौथा वर्ण महाप्राण होते हैं: थ और ध।"
        },
        {
            id: `${quizId}-q33`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "प-वर्ग में महाप्राण वर्ण कौन-से हैं?",
            options: ["फ, भ", "प, ब", "ब, म", "प, म"],
            correctAnswer: 0,
            explanation: "प-वर्ग में दूसरा और चौथा वर्ण महाप्राण होते हैं: फ और भ।"
        },
        {
            id: `${quizId}-q34`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "क-वर्ग में अल्पप्राण वर्ण कौन-से हैं?",
            options: ["क, ग, ङ", "ख, घ", "क, ख", "घ, ङ"],
            correctAnswer: 0,
            explanation: "क-वर्ग में पहला, तीसरा और पाँचवाँ वर्ण अल्पप्राण होते हैं: क, ग, ङ।"
        },
        {
            id: `${quizId}-q35`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "च-वर्ग में अल्पप्राण वर्ण कौन-से हैं?",
            options: ["च, ज, ञ", "छ, झ", "च, छ", "झ, ञ"],
            correctAnswer: 0,
            explanation: "च-वर्ग में पहला, तीसरा और पाँचवाँ वर्ण अल्पप्राण होते हैं: च, ज, ञ।"
        },
        {
            id: `${quizId}-q36`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "ट-वर्ग में अल्पप्राण वर्ण कौन-से हैं?",
            options: ["ट, ड, ण", "ठ, ढ", "ट, ठ", "ढ, ण"],
            correctAnswer: 0,
            explanation: "ट-वर्ग में पहला, तीसरा और पाँचवाँ वर्ण अल्पप्राण होते हैं: ट, ड, ण।"
        },
        {
            id: `${quizId}-q37`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "त-वर्ग में अल्पप्राण वर्ण कौन-से हैं?",
            options: ["त, द, न", "थ, ध", "त, थ", "ध, न"],
            correctAnswer: 0,
            explanation: "त-वर्ग में पहला, तीसरा और पाँचवाँ वर्ण अल्पप्राण होते हैं: त, द, न।"
        },
        {
            id: `${quizId}-q38`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "प-वर्ग में अल्पप्राण वर्ण कौन-से हैं?",
            options: ["प, ब, म", "फ, भ", "प, फ", "भ, म"],
            correctAnswer: 0,
            explanation: "प-वर्ग में पहला, तीसरा और पाँचवाँ वर्ण अल्पप्राण होते हैं: प, ब, म।"
        },
        {
            id: `${quizId}-q39`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "क-वर्ग में अघोष वर्ण कौन-से हैं?",
            options: ["क, ख", "ग, घ", "घ, ङ", "ख, ङ"],
            correctAnswer: 0,
            explanation: "क-वर्ग में पहले दो वर्ण अघोष होते हैं: क और ख।"
        },
        {
            id: `${quizId}-q40`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "च-वर्ग में अघोष वर्ण कौन-से हैं?",
            options: ["च, छ", "ज, झ", "झ, ञ", "छ, ञ"],
            correctAnswer: 0,
            explanation: "च-वर्ग में पहले दो वर्ण अघोष होते हैं: च और छ।"
        },
        {
            id: `${quizId}-q41`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "ट-वर्ग में अघोष वर्ण कौन-से हैं?",
            options: ["ट, ठ", "ड, ढ", "ढ, ण", "ठ, ण"],
            correctAnswer: 0,
            explanation: "ट-वर्ग में पहले दो वर्ण अघोष होते हैं: ट और ठ।"
        },
        {
            id: `${quizId}-q42`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "त-वर्ग में अघोष वर्ण कौन-से हैं?",
            options: ["त, थ", "द, ध", "ध, न", "थ, न"],
            correctAnswer: 0,
            explanation: "त-वर्ग में पहले दो वर्ण अघोष होते हैं: त और थ।"
        },
        {
            id: `${quizId}-q43`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "प-वर्ग में अघोष वर्ण कौन-से हैं?",
            options: ["प, फ", "ब, भ", "भ, म", "फ, म"],
            correctAnswer: 0,
            explanation: "प-वर्ग में पहले दो वर्ण अघोष होते हैं: प और फ।"
        },
        {
            id: `${quizId}-q44`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "क-वर्ग में घोष वर्ण कौन-से हैं?",
            options: ["ग, घ, ङ", "क, ख", "ख, ग", "क, ङ"],
            correctAnswer: 0,
            explanation: "क-वर्ग में तीसरे, चौथे और पाँचवें वर्ण घोष होते हैं: ग, घ, ङ।"
        },
        {
            id: `${quizId}-q45`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "च-वर्ग में घोष वर्ण कौन-से हैं?",
            options: ["ज, झ, ञ", "च, छ", "छ, ज", "च, ञ"],
            correctAnswer: 0,
            explanation: "च-वर्ग में तीसरे, चौथे और पाँचवें वर्ण घोष होते हैं: ज, झ, ञ।"
        },
        {
            id: `${quizId}-q46`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "ट-वर्ग में घोष वर्ण कौन-से हैं?",
            options: ["ड, ढ, ण", "ट, ठ", "ठ, ड", "ट, ण"],
            correctAnswer: 0,
            explanation: "ट-वर्ग में तीसरे, चौथे और पाँचवें वर्ण घोष होते हैं: ड, ढ, ण।"
        },
        {
            id: `${quizId}-q47`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "त-वर्ग में घोष वर्ण कौन-से हैं?",
            options: ["द, ध, न", "त, थ", "थ, द", "त, न"],
            correctAnswer: 0,
            explanation: "त-वर्ग में तीसरे, चौथे और पाँचवें वर्ण घोष होते हैं: द, ध, न।"
        },
        {
            id: `${quizId}-q48`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "प-वर्ग में घोष वर्ण कौन-से हैं?",
            options: ["ब, भ, म", "प, फ", "फ, ब", "प, म"],
            correctAnswer: 0,
            explanation: "प-वर्ग में तीसरे, चौथे और पाँचवें वर्ण घोष होते हैं: ब, भ, म।"
        },
        {
            id: `${quizId}-q49`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "“ख” किस प्रकार का वर्ण है?",
            options: ["अघोष महाप्राण", "घोष अल्पप्राण", "घोष महाप्राण", "नासिक्य"],
            correctAnswer: 0,
            explanation: "ख क-वर्ग का दूसरा वर्ण है; यह अघोष महाप्राण है।"
        },
        {
            id: `${quizId}-q50`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "“ग” किस प्रकार का वर्ण है?",
            options: ["घोष अल्पप्राण", "अघोष महाप्राण", "अघोष अल्पप्राण", "नासिक्य"],
            correctAnswer: 0,
            explanation: "ग क-वर्ग का तीसरा वर्ण है; यह घोष अल्पप्राण है।"
        }
    ];

    window.GJU_QUIZ_BANK.push({
        id: quizId,
        subject: "Hindi",
        title: "Hindi Varnamala Practice Set 2",
        description: "Hindi Varnamala topic ke 50 unique questions with professional explanations for competitive exam practice.",
        durationMinutes: 35,
        totalQuestions: questions.length,
        marksPerQuestion: 1,
        negativeMarks: 0.25,
        difficulty: "Hard",
        tags: ["Hindi", "Varnamala", "Vyakaran", "UPSI", "PCS", "SSC", "Practice Set"],
        questions: questions
    });}());
