(function () {
    "use strict";

    window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];

    const quizId = "hindi-varnmala-practice-set-1";

    const questions = [
        {
            id: `${quizId}-q01`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "हिंदी वर्णमाला में परंपरागत रूप से कुल कितने मूल वर्ण माने जाते हैं?",
            options: ["44", "46", "52", "36"],
            correctAnswer: 0,
            explanation: "मानक व्याकरण में 11 स्वर और 33 व्यंजन मिलाकर 44 मूल वर्ण माने जाते हैं।"
        },
        {
            id: `${quizId}-q02`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "हिंदी वर्णमाला में स्वरों की संख्या कितनी मानी जाती है?",
            options: ["10", "11", "13", "14"],
            correctAnswer: 1,
            explanation: "अ, आ, इ, ई, उ, ऊ, ऋ, ए, ऐ, ओ, औ—ये 11 स्वर हैं।"
        },
        {
            id: `${quizId}-q03`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "हिंदी वर्णमाला में व्यंजनों की परंपरागत संख्या कितनी है?",
            options: ["32", "33", "35", "36"],
            correctAnswer: 1,
            explanation: "25 स्पर्श, 4 अंतस्थ और 4 ऊष्म मिलाकर 33 व्यंजन माने जाते हैं।"
        },
        {
            id: `${quizId}-q04`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "स्वतंत्र रूप से उच्चारित होने वाले वर्ण क्या कहलाते हैं?",
            options: ["स्वर", "व्यंजन", "संयुक्ताक्षर", "मात्रा"],
            correctAnswer: 0,
            explanation: "जिन वर्णों के उच्चारण में किसी अन्य वर्ण की सहायता नहीं लगती, उन्हें स्वर कहते हैं।"
        },
        {
            id: `${quizId}-q05`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "जिन वर्णों के उच्चारण में स्वर की सहायता आवश्यक होती है, वे क्या कहलाते हैं?",
            options: ["स्वर", "व्यंजन", "अयोगवाह", "अनुस्वार"],
            correctAnswer: 1,
            explanation: "व्यंजन अपने पूर्ण उच्चारण के लिए किसी स्वर की सहायता लेते हैं।"
        },
        {
            id: `${quizId}-q06`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "निम्नलिखित में से कौन-सा स्वर नहीं है?",
            options: ["अ", "ई", "क", "औ"],
            correctAnswer: 2,
            explanation: "क व्यंजन है; अ, ई और औ स्वर हैं।"
        },
        {
            id: `${quizId}-q07`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "निम्नलिखित में से कौन-सा व्यंजन है?",
            options: ["आ", "ओ", "म", "ऐ"],
            correctAnswer: 2,
            explanation: "म व्यंजन है, जबकि आ, ओ और ऐ स्वर हैं।"
        },
        {
            id: `${quizId}-q08`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "अं और अः को व्याकरण में सामान्यतः क्या कहा जाता है?",
            options: ["अयोगवाह", "मूल स्वर", "स्पर्श व्यंजन", "अंतस्थ व्यंजन"],
            correctAnswer: 0,
            explanation: "अं और अः को अयोगवाह कहा जाता है क्योंकि ये स्वर-व्यंजन दोनों की तरह स्वतंत्र वर्ग में नहीं रखे जाते।"
        },
        {
            id: `${quizId}-q09`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "हिंदी में ह्रस्व स्वर कौन-से हैं?",
            options: ["अ, इ, उ, ऋ", "आ, ई, ऊ, ए", "ए, ऐ, ओ, औ", "अं, अः, ऋ, औ"],
            correctAnswer: 0,
            explanation: "अ, इ, उ और ऋ को ह्रस्व स्वर माना जाता है क्योंकि इनके उच्चारण में अपेक्षाकृत कम समय लगता है।"
        },
        {
            id: `${quizId}-q10`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "दीर्घ स्वर का सही समूह कौन-सा है?",
            options: ["अ, इ, उ", "आ, ई, ऊ", "क, ख, ग", "य, र, ल"],
            correctAnswer: 1,
            explanation: "आ, ई और ऊ दीर्घ स्वर हैं; इनके उच्चारण में ह्रस्व स्वरों से अधिक समय लगता है।"
        },
        {
            id: `${quizId}-q11`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "संयुक्त स्वर का सही समूह कौन-सा है?",
            options: ["ए, ऐ, ओ, औ", "अ, इ, उ, ऋ", "आ, ई, ऊ, ऋ", "क, च, ट, त"],
            correctAnswer: 0,
            explanation: "ए, ऐ, ओ और औ संयुक्त स्वर माने जाते हैं।"
        },
        {
            id: `${quizId}-q12`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "स्वर के लिखित चिह्न को क्या कहते हैं?",
            options: ["मात्रा", "वर्ण", "विराम", "अनुस्वार"],
            correctAnswer: 0,
            explanation: "स्वर जब व्यंजन के साथ चिह्न के रूप में लगता है, तो उसे मात्रा कहते हैं।"
        },
        {
            id: `${quizId}-q13`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "अ स्वर की मात्रा कैसी होती है?",
            options: ["कोई अलग मात्रा-चिह्न नहीं", "ा", "ि", "ु"],
            correctAnswer: 0,
            explanation: "अ की कोई अलग मात्रा नहीं होती; यह व्यंजन में अंतर्निहित रहता है।"
        },
        {
            id: `${quizId}-q14`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "इ की मात्रा कौन-सी है?",
            options: ["ि", "ी", "ु", "े"],
            correctAnswer: 0,
            explanation: "इ की मात्रा “ि” है और यह व्यंजन के पहले लिखी जाती है।"
        },
        {
            id: `${quizId}-q15`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "ई की मात्रा कौन-सी है?",
            options: ["ि", "ी", "ु", "ू"],
            correctAnswer: 1,
            explanation: "ई की मात्रा “ी” है।"
        },
        {
            id: `${quizId}-q16`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "उ की मात्रा कौन-सी है?",
            options: ["ु", "ू", "े", "ो"],
            correctAnswer: 0,
            explanation: "उ की मात्रा “ु” है।"
        },
        {
            id: `${quizId}-q17`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "ऊ की मात्रा कौन-सी है?",
            options: ["ु", "ू", "ौ", "ै"],
            correctAnswer: 1,
            explanation: "ऊ की मात्रा “ू” है।"
        },
        {
            id: `${quizId}-q18`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "ए की मात्रा कौन-सी है?",
            options: ["े", "ै", "ो", "ौ"],
            correctAnswer: 0,
            explanation: "ए की मात्रा “े” है।"
        },
        {
            id: `${quizId}-q19`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "ऐ की मात्रा कौन-सी है?",
            options: ["े", "ै", "ो", "ौ"],
            correctAnswer: 1,
            explanation: "ऐ की मात्रा “ै” है।"
        },
        {
            id: `${quizId}-q20`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "ओ की मात्रा कौन-सी है?",
            options: ["ो", "ौ", "े", "ा"],
            correctAnswer: 0,
            explanation: "ओ की मात्रा “ो” है।"
        },
        {
            id: `${quizId}-q21`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "औ की मात्रा कौन-सी है?",
            options: ["ो", "ौ", "ै", "ू"],
            correctAnswer: 1,
            explanation: "औ की मात्रा “ौ” है।"
        },
        {
            id: `${quizId}-q22`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "ऋ की मात्रा कौन-सी है?",
            options: ["ृ", "ॄ", "ु", "ि"],
            correctAnswer: 0,
            explanation: "ऋ की मात्रा “ृ” है, जैसे—कृपा, गृह।"
        },
        {
            id: `${quizId}-q23`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "“क” से पहले “अ” जोड़ने पर किस ध्वनि का संकेत मिलता है?",
            options: ["क में अ स्वर अंतर्निहित है", "क स्वर बन जाता है", "क अयोगवाह बन जाता है", "क संयुक्ताक्षर बनता है"],
            correctAnswer: 0,
            explanation: "देवनागरी में व्यंजन के साथ अ स्वर अंतर्निहित माना जाता है।"
        },
        {
            id: `${quizId}-q24`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "व्यंजन से अंतर्निहित स्वर हटाने के लिए किस चिह्न का प्रयोग होता है?",
            options: ["हलंत/विराम", "अनुस्वार", "विसर्ग", "चंद्रबिंदु"],
            correctAnswer: 0,
            explanation: "हलंत या विराम चिह्न (्) व्यंजन के अंतर्निहित अ स्वर को हटाता है।"
        },
        {
            id: `${quizId}-q25`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "“क्त” किस प्रकार का रूप है?",
            options: ["संयुक्त व्यंजन", "स्वर", "अयोगवाह", "मात्रा"],
            correctAnswer: 0,
            explanation: "क् + त के योग से “क्त” बनता है, इसलिए यह संयुक्त व्यंजन/संयुक्ताक्षर है।"
        },
        {
            id: `${quizId}-q26`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "“त्र” किन वर्णों के योग से बना है?",
            options: ["त् + र", "ट् + र", "थ् + र", "द् + र"],
            correctAnswer: 0,
            explanation: "त्र = त् + र का संयुक्त रूप है।"
        },
        {
            id: `${quizId}-q27`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "“ज्ञ” का पारंपरिक निर्माण किससे माना जाता है?",
            options: ["ज् + ञ", "ग् + य", "द् + न", "क् + ष"],
            correctAnswer: 0,
            explanation: "परंपरागत व्याकरण में ज्ञ को ज् + ञ का संयुक्ताक्षर माना जाता है।"
        },
        {
            id: `${quizId}-q28`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "“क्ष” किन वर्णों के योग से बना है?",
            options: ["क् + ष", "ख् + श", "क् + श", "ग् + ष"],
            correctAnswer: 0,
            explanation: "क्ष = क् + ष का संयुक्त रूप है।"
        },
        {
            id: `${quizId}-q29`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "“श्र” किसका संयुक्त रूप है?",
            options: ["श् + र", "स + र", "ष् + र", "ह् + र"],
            correctAnswer: 0,
            explanation: "श्र = श् + र का संयुक्ताक्षर है।"
        },
        {
            id: `${quizId}-q30`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "निम्नलिखित में से संयुक्ताक्षर कौन-सा है?",
            options: ["अ", "क", "ज्ञ", "म"],
            correctAnswer: 2,
            explanation: "ज्ञ दो व्यंजनों के योग से बना संयुक्ताक्षर है।"
        },
        {
            id: `${quizId}-q31`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "क-वर्ग का सही क्रम कौन-सा है?",
            options: ["क-ख-ग-घ-ङ", "ङ-घ-ग-ख-क", "क-ख-ग-ङ-घ", "क-ग-ख-घ-ङ"],
            correctAnswer: 0,
            explanation: "क-वर्ग के पाँच वर्णों का मानक क्रम क, ख, ग, घ, ङ है।"
        },
        {
            id: `${quizId}-q32`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "च-वर्ग का सही क्रम कौन-सा है?",
            options: ["च-छ-ज-झ-ञ", "ञ-झ-ज-छ-च", "च-छ-ज-ञ-झ", "च-ज-छ-झ-ञ"],
            correctAnswer: 0,
            explanation: "च-वर्ग के पाँच वर्णों का मानक क्रम च, छ, ज, झ, ञ है।"
        },
        {
            id: `${quizId}-q33`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "ट-वर्ग का सही क्रम कौन-सा है?",
            options: ["ट-ठ-ड-ढ-ण", "ण-ढ-ड-ठ-ट", "ट-ठ-ड-ण-ढ", "ट-ड-ठ-ढ-ण"],
            correctAnswer: 0,
            explanation: "ट-वर्ग के पाँच वर्णों का मानक क्रम ट, ठ, ड, ढ, ण है।"
        },
        {
            id: `${quizId}-q34`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "त-वर्ग का सही क्रम कौन-सा है?",
            options: ["त-थ-द-ध-न", "न-ध-द-थ-त", "त-थ-द-न-ध", "त-द-थ-ध-न"],
            correctAnswer: 0,
            explanation: "त-वर्ग के पाँच वर्णों का मानक क्रम त, थ, द, ध, न है।"
        },
        {
            id: `${quizId}-q35`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "प-वर्ग का सही क्रम कौन-सा है?",
            options: ["प-फ-ब-भ-म", "म-भ-ब-फ-प", "प-फ-ब-म-भ", "प-ब-फ-भ-म"],
            correctAnswer: 0,
            explanation: "प-वर्ग के पाँच वर्णों का मानक क्रम प, फ, ब, भ, म है।"
        },
        {
            id: `${quizId}-q36`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "क-वर्ग के वर्णों का मुख्य उच्चारण-स्थान क्या है?",
            options: ["कंठ्य", "तालव्य", "मूर्धन्य", "दंत्य"],
            correctAnswer: 0,
            explanation: "क-वर्ग के वर्ण कंठ्य उच्चारण-स्थान से उच्चरित होते हैं।"
        },
        {
            id: `${quizId}-q37`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "च-वर्ग के वर्णों का मुख्य उच्चारण-स्थान क्या है?",
            options: ["कंठ्य", "तालव्य", "मूर्धन्य", "दंत्य"],
            correctAnswer: 1,
            explanation: "च-वर्ग के वर्ण तालव्य उच्चारण-स्थान से उच्चरित होते हैं।"
        },
        {
            id: `${quizId}-q38`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "ट-वर्ग के वर्णों का मुख्य उच्चारण-स्थान क्या है?",
            options: ["कंठ्य", "तालव्य", "मूर्धन्य", "दंत्य"],
            correctAnswer: 2,
            explanation: "ट-वर्ग के वर्ण मूर्धन्य उच्चारण-स्थान से उच्चरित होते हैं।"
        },
        {
            id: `${quizId}-q39`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "त-वर्ग के वर्णों का मुख्य उच्चारण-स्थान क्या है?",
            options: ["कंठ्य", "तालव्य", "मूर्धन्य", "दंत्य"],
            correctAnswer: 3,
            explanation: "त-वर्ग के वर्ण दंत्य उच्चारण-स्थान से उच्चरित होते हैं।"
        },
        {
            id: `${quizId}-q40`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "प-वर्ग के वर्णों का मुख्य उच्चारण-स्थान क्या है?",
            options: ["ओष्ठ्य", "दंत्य", "तालव्य", "कंठ्य"],
            correctAnswer: 0,
            explanation: "प-वर्ग के वर्ण ओष्ठ्य उच्चारण-स्थान से उच्चरित होते हैं।"
        },
        {
            id: `${quizId}-q41`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "स्पर्श व्यंजन कितने होते हैं?",
            options: ["20", "25", "28", "33"],
            correctAnswer: 1,
            explanation: "क से म तक पाँच वर्गों में 5-5 वर्ण होते हैं; कुल 25 स्पर्श व्यंजन होते हैं।"
        },
        {
            id: `${quizId}-q42`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "अंतस्थ व्यंजन कौन-से हैं?",
            options: ["य, र, ल, व", "श, ष, स, ह", "क, ख, ग, घ", "च, छ, ज, झ"],
            correctAnswer: 0,
            explanation: "य, र, ल, व को अंतस्थ व्यंजन कहा जाता है।"
        },
        {
            id: `${quizId}-q43`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "ऊष्म व्यंजन कौन-से हैं?",
            options: ["य, र, ल, व", "श, ष, स, ह", "क, ख, ग, घ", "ट, ठ, ड, ढ"],
            correctAnswer: 1,
            explanation: "श, ष, स और ह ऊष्म व्यंजन हैं।"
        },
        {
            id: `${quizId}-q44`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "निम्न में से कौन-सा अंतस्थ व्यंजन है?",
            options: ["ल", "श", "ख", "ध"],
            correctAnswer: 0,
            explanation: "ल अंतस्थ व्यंजन है।"
        },
        {
            id: `${quizId}-q45`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "निम्न में से कौन-सा ऊष्म व्यंजन है?",
            options: ["व", "स", "न", "ज"],
            correctAnswer: 1,
            explanation: "स ऊष्म व्यंजन है।"
        },
        {
            id: `${quizId}-q46`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "निम्न में से कौन-सा स्पर्श व्यंजन है?",
            options: ["य", "र", "क", "श"],
            correctAnswer: 2,
            explanation: "क स्पर्श व्यंजन है क्योंकि इसका उच्चारण मुख-अवयवों के स्पर्श से होता है।"
        },
        {
            id: `${quizId}-q47`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "“य, र, ल, व” को किस वर्ग में रखा जाता है?",
            options: ["अंतस्थ", "ऊष्म", "स्पर्श", "अयोगवाह"],
            correctAnswer: 0,
            explanation: "य, र, ल, व को अंतस्थ व्यंजन कहा जाता है।"
        },
        {
            id: `${quizId}-q48`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "“श, ष, स, ह” को किस वर्ग में रखा जाता है?",
            options: ["अंतस्थ", "ऊष्म", "स्पर्श", "स्वर"],
            correctAnswer: 1,
            explanation: "श, ष, स, ह को ऊष्म व्यंजन कहा जाता है।"
        },
        {
            id: `${quizId}-q49`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "क-वर्ग का पंचम वर्ण कौन-सा है?",
            options: ["कंठ्य", "क", "ख", "ग"],
            correctAnswer: 0,
            explanation: "क-वर्ग में पाँचवाँ वर्ण कंठ्य होता है; पंचम वर्ण नासिक्य ध्वनि देता है।"
        },
        {
            id: `${quizId}-q50`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "च-वर्ग का पंचम वर्ण कौन-सा है?",
            options: ["तालव्य", "च", "छ", "ज"],
            correctAnswer: 0,
            explanation: "च-वर्ग में पाँचवाँ वर्ण तालव्य होता है; पंचम वर्ण नासिक्य ध्वनि देता है।"
        }
    ];

    window.GJU_QUIZ_BANK.push({
        id: quizId,
        subject: "Hindi",
        title: "Hindi Varnamala Practice Set 1",
        description: "Hindi Varnamala topic ke 50 unique questions with professional explanations for competitive exam practice.",
        durationMinutes: 35,
        totalQuestions: questions.length,
        marksPerQuestion: 1,
        negativeMarks: 0.25,
        difficulty: "Hard",
        tags: ["Hindi", "Varnamala", "Vyakaran", "UPSI", "PCS", "SSC", "Practice Set"],
        questions: questions
    });}());
