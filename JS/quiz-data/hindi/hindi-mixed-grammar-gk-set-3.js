(function () {
    "use strict";

    window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];

    const quizId = "hindi-mixed-grammar-gk-set-3";

    const questions = [
        {
            id: `${quizId}-q01`,
            topic: "शब्द-भेद",
            difficulty: "hard",
            question: "नाम बताने वाले शब्द क्या कहलाते हैं?",
            options: ["सर्वनाम", "संज्ञा", "क्रिया", "विशेषण"],
            correctAnswer: 1,
            explanation: "व्यक्ति, वस्तु, स्थान, जाति या भाव का नाम बताने वाले शब्द संज्ञा कहलाते हैं।"
        },
        {
            id: `${quizId}-q02`,
            topic: "शब्द-भेद",
            difficulty: "hard",
            question: "संज्ञा के स्थान पर प्रयुक्त शब्द कहलाते हैं—",
            options: ["अव्यय", "सर्वनाम", "विशेषण", "क्रिया"],
            correctAnswer: 1,
            explanation: "जो शब्द संज्ञा के स्थान पर आते हैं, उन्हें सर्वनाम कहते हैं।"
        },
        {
            id: `${quizId}-q03`,
            topic: "शब्द-भेद",
            difficulty: "hard",
            question: "संज्ञा या सर्वनाम की विशेषता बताने वाला शब्द है—",
            options: ["समुच्चयबोधक", "क्रिया", "विशेषण", "सर्वनाम"],
            correctAnswer: 2,
            explanation: "विशेषण संज्ञा/सर्वनाम की विशेषता बताता है।"
        },
        {
            id: `${quizId}-q04`,
            topic: "शब्द-भेद",
            difficulty: "hard",
            question: "कार्य होने या करने का बोध कराने वाला शब्द है—",
            options: ["विशेषण", "सर्वनाम", "अव्यय", "क्रिया"],
            correctAnswer: 3,
            explanation: "क्रिया से कार्य, अवस्था या घटना का बोध होता है।"
        },
        {
            id: `${quizId}-q05`,
            topic: "शब्द-भेद",
            difficulty: "hard",
            question: "‘गंगा’ किस प्रकार की संज्ञा है?",
            options: ["व्यक्तिवाचक संज्ञा", "द्रव्यवाचक संज्ञा", "भाववाचक संज्ञा", "जातिवाचक संज्ञा"],
            correctAnswer: 0,
            explanation: "गंगा किसी विशेष नदी का नाम है, इसलिए व्यक्तिवाचक संज्ञा है।"
        },
        {
            id: `${quizId}-q06`,
            topic: "शब्द-भेद",
            difficulty: "hard",
            question: "‘लड़का’ किस प्रकार की संज्ञा है?",
            options: ["व्यक्तिवाचक संज्ञा", "जातिवाचक संज्ञा", "समूहवाचक संज्ञा", "भाववाचक संज्ञा"],
            correctAnswer: 1,
            explanation: "लड़का एक जाति/वर्ग का बोध कराता है, इसलिए जातिवाचक संज्ञा है।"
        },
        {
            id: `${quizId}-q07`,
            topic: "शब्द-भेद",
            difficulty: "hard",
            question: "‘सुंदरता’ किस प्रकार की संज्ञा है?",
            options: ["जातिवाचक संज्ञा", "द्रव्यवाचक संज्ञा", "व्यक्तिवाचक संज्ञा", "भाववाचक संज्ञा"],
            correctAnswer: 3,
            explanation: "गुण/भाव का नाम होने से सुंदरता भाववाचक संज्ञा है।"
        },
        {
            id: `${quizId}-q08`,
            topic: "शब्द-भेद",
            difficulty: "hard",
            question: "‘वह विद्यालय गया।’ में ‘वह’ क्या है?",
            options: ["संज्ञा", "सर्वनाम", "विशेषण", "क्रिया"],
            correctAnswer: 1,
            explanation: "‘वह’ संज्ञा के स्थान पर आया है, इसलिए सर्वनाम है।"
        },
        {
            id: `${quizId}-q09`,
            topic: "शब्द-भेद",
            difficulty: "hard",
            question: "‘लाल फूल’ में ‘लाल’ क्या है?",
            options: ["विशेषण", "संज्ञा", "सर्वनाम", "क्रिया"],
            correctAnswer: 0,
            explanation: "‘लाल’ फूल की विशेषता बता रहा है।"
        },
        {
            id: `${quizId}-q10`,
            topic: "शब्द-भेद",
            difficulty: "hard",
            question: "‘मोहन पढ़ता है।’ में क्रिया कौन-सी है?",
            options: ["मोहन पढ़ता", "मोहन", "है", "पढ़ता है"],
            correctAnswer: 3,
            explanation: "वाक्य में कार्य ‘पढ़ता है’ से व्यक्त है।"
        },
        {
            id: `${quizId}-q11`,
            topic: "शब्द-भेद",
            difficulty: "hard",
            question: "जो शब्द लिंग, वचन, पुरुष आदि से अपना रूप नहीं बदलते, वे कहलाते हैं—",
            options: ["अव्यय", "विशेषण", "क्रिया", "संज्ञा"],
            correctAnswer: 0,
            explanation: "अव्यय शब्दों का रूप सामान्यतः अपरिवर्तित रहता है।"
        },
        {
            id: `${quizId}-q12`,
            topic: "शब्द-भेद",
            difficulty: "hard",
            question: "‘और’ किस प्रकार का अव्यय है?",
            options: ["क्रिया-विशेषण", "विस्मयादिबोधक", "संबंधबोधक", "समुच्चयबोधक"],
            correctAnswer: 3,
            explanation: "‘और’ दो पदों/वाक्यों को जोड़ता है, इसलिए समुच्चयबोधक है।"
        },
        {
            id: `${quizId}-q13`,
            topic: "शब्द-भेद",
            difficulty: "hard",
            question: "‘वाह!’ किस प्रकार का शब्द है?",
            options: ["क्रिया-विशेषण", "विस्मयादिबोधक", "संबंधबोधक", "समुच्चयबोधक"],
            correctAnswer: 1,
            explanation: "‘वाह!’ हर्ष/प्रशंसा का भाव व्यक्त करता है।"
        },
        {
            id: `${quizId}-q14`,
            topic: "शब्द-भेद",
            difficulty: "hard",
            question: "‘धीरे-धीरे’ किसका उदाहरण है?",
            options: ["विशेषण", "सर्वनाम", "क्रिया-विशेषण", "संज्ञा"],
            correctAnswer: 2,
            explanation: "‘धीरे-धीरे’ क्रिया की रीति बताता है, इसलिए क्रिया-विशेषण है।"
        },
        {
            id: `${quizId}-q15`,
            topic: "शब्द-भेद",
            difficulty: "hard",
            question: "जिस क्रिया को कर्म की आवश्यकता हो, वह कहलाती है—",
            options: ["नामधातु क्रिया", "सकर्मक क्रिया", "सहायक क्रिया", "अकर्मक क्रिया"],
            correctAnswer: 1,
            explanation: "सकर्मक क्रिया का प्रभाव किसी कर्म पर पड़ता है।"
        },
        {
            id: `${quizId}-q16`,
            topic: "शब्द-भेद",
            difficulty: "hard",
            question: "जिस क्रिया को कर्म की आवश्यकता न हो, वह कहलाती है—",
            options: ["संयुक्त क्रिया", "प्रेरणार्थक क्रिया", "अकर्मक क्रिया", "सकर्मक क्रिया"],
            correctAnswer: 2,
            explanation: "अकर्मक क्रिया बिना कर्म के अर्थ पूर्ण कर देती है।"
        },
        {
            id: `${quizId}-q17`,
            topic: "शब्द-भेद",
            difficulty: "hard",
            question: "‘राम ने आम खाया।’ में क्रिया कैसी है?",
            options: ["सकर्मक", "अव्ययी", "सहायक", "अकर्मक"],
            correctAnswer: 0,
            explanation: "यहाँ ‘आम’ कर्म है, इसलिए ‘खाया’ सकर्मक क्रिया है।"
        },
        {
            id: `${quizId}-q18`,
            topic: "शब्द-भेद",
            difficulty: "hard",
            question: "‘बालक सोता है।’ में क्रिया कैसी है?",
            options: ["संयुक्त", "सकर्मक", "अकर्मक", "प्रेरणार्थक"],
            correctAnswer: 2,
            explanation: "‘सोता है’ को कर्म की आवश्यकता नहीं है।"
        },
        {
            id: `${quizId}-q19`,
            topic: "शब्द-भेद",
            difficulty: "hard",
            question: "भूतकाल का उदाहरण कौन-सा है?",
            options: ["वह जाता है", "वह गया", "वह जाए", "वह जाएगा"],
            correctAnswer: 1,
            explanation: "‘गया’ से बीते हुए समय की क्रिया का बोध होता है।"
        },
        {
            id: `${quizId}-q20`,
            topic: "शब्द-भेद",
            difficulty: "hard",
            question: "भविष्यत् काल का उदाहरण कौन-सा है?",
            options: ["वह आ रहा था", "वह आया", "वह आएगा", "वह आता है"],
            correctAnswer: 2,
            explanation: "‘आएगा’ आने वाले समय की क्रिया बताता है।"
        },
        {
            id: `${quizId}-q21`,
            topic: "उपसर्ग-प्रत्यय",
            difficulty: "hard",
            question: "‘अज्ञान’ शब्द में उपसर्ग कौन-सा है?",
            options: ["अनु", "प्र", "नि", "अ"],
            correctAnswer: 3,
            explanation: "अज्ञान में ‘अ’ उपसर्ग लगकर नकारात्मक अर्थ देता है।"
        },
        {
            id: `${quizId}-q22`,
            topic: "उपसर्ग-प्रत्यय",
            difficulty: "hard",
            question: "‘अनुकरण’ शब्द में उपसर्ग कौन-सा है?",
            options: ["प्रति", "अनु", "सम्", "अ"],
            correctAnswer: 1,
            explanation: "अनुकरण में ‘अनु’ उपसर्ग है।"
        },
        {
            id: `${quizId}-q23`,
            topic: "उपसर्ग-प्रत्यय",
            difficulty: "hard",
            question: "‘प्रस्थान’ शब्द में उपसर्ग है—",
            options: ["प्र", "परा", "सम्", "अप"],
            correctAnswer: 0,
            explanation: "प्रस्थान में ‘प्र’ उपसर्ग है।"
        },
        {
            id: `${quizId}-q24`,
            topic: "उपसर्ग-प्रत्यय",
            difficulty: "hard",
            question: "‘निराशा’ शब्द में उपसर्ग है—",
            options: ["निर्", "नि", "अ", "आ"],
            correctAnswer: 0,
            explanation: "निराशा में निर् उपसर्ग अभाव का बोध कराता है।"
        },
        {
            id: `${quizId}-q25`,
            topic: "उपसर्ग-प्रत्यय",
            difficulty: "hard",
            question: "‘दयालु’ शब्द में प्रत्यय कौन-सा है?",
            options: ["आलु", "ता", "पन", "त्व"],
            correctAnswer: 0,
            explanation: "दया + आलु से दयालु शब्द बनता है।"
        },
        {
            id: `${quizId}-q26`,
            topic: "उपसर्ग-प्रत्यय",
            difficulty: "hard",
            question: "‘बालकपन’ में प्रत्यय है—",
            options: ["आलु", "ई", "पन", "आवट"],
            correctAnswer: 2,
            explanation: "पन प्रत्यय भाव/स्थिति का बोध कराता है।"
        },
        {
            id: `${quizId}-q27`,
            topic: "उपसर्ग-प्रत्यय",
            difficulty: "hard",
            question: "‘मिठास’ में प्रत्यय है—",
            options: ["ई", "पन", "आस", "ता"],
            correctAnswer: 2,
            explanation: "मिठास में ‘आस’ प्रत्यय गुण/भाव का बोध कराता है।"
        },
        {
            id: `${quizId}-q28`,
            topic: "उपसर्ग-प्रत्यय",
            difficulty: "hard",
            question: "‘लिखावट’ में प्रत्यय है—",
            options: ["त्व", "ई", "पन", "आवट"],
            correctAnswer: 3,
            explanation: "लिखावट में ‘आवट’ प्रत्यय है।"
        },
        {
            id: `${quizId}-q29`,
            topic: "उपसर्ग-प्रत्यय",
            difficulty: "hard",
            question: "‘पठन’ में प्रत्यय कौन-सा है?",
            options: ["त्व", "ता", "पन", "अन"],
            correctAnswer: 3,
            explanation: "पठ + अन = पठन।"
        },
        {
            id: `${quizId}-q30`,
            topic: "उपसर्ग-प्रत्यय",
            difficulty: "hard",
            question: "‘राष्ट्रीय’ में प्रत्यय कौन-सा है?",
            options: ["पन", "आलु", "ता", "ईय"],
            correctAnswer: 3,
            explanation: "राष्ट्र + ईय से राष्ट्रीय शब्द बनता है।"
        },
        {
            id: `${quizId}-q31`,
            topic: "पर्याय-विलोम",
            difficulty: "hard",
            question: "‘जल’ का पर्यायवाची शब्द है—",
            options: ["नीर", "धरा", "अनल", "पवन"],
            correctAnswer: 0,
            explanation: "नीर, पानी, वारि आदि जल के पर्याय हैं।"
        },
        {
            id: `${quizId}-q32`,
            topic: "पर्याय-विलोम",
            difficulty: "hard",
            question: "‘अग्नि’ का पर्यायवाची है—",
            options: ["नीर", "गगन", "धरा", "अनल"],
            correctAnswer: 3,
            explanation: "अनल अग्नि का पर्यायवाची है।"
        },
        {
            id: `${quizId}-q33`,
            topic: "पर्याय-विलोम",
            difficulty: "hard",
            question: "‘पृथ्वी’ का पर्यायवाची है—",
            options: ["सलिल", "गगन", "अनल", "धरा"],
            correctAnswer: 3,
            explanation: "धरा, वसुंधरा, धरती—ये पृथ्वी के पर्याय हैं।"
        },
        {
            id: `${quizId}-q34`,
            topic: "पर्याय-विलोम",
            difficulty: "hard",
            question: "‘आकाश’ का पर्यायवाची है—",
            options: ["नीर", "धरा", "गगन", "अनल"],
            correctAnswer: 2,
            explanation: "गगन, नभ आदि आकाश के पर्याय हैं।"
        },
        {
            id: `${quizId}-q35`,
            topic: "पर्याय-विलोम",
            difficulty: "hard",
            question: "‘सूर्य’ का पर्यायवाची है—",
            options: ["शशि", "सलिल", "रवि", "निशा"],
            correctAnswer: 2,
            explanation: "रवि, भानु, आदित्य आदि सूर्य के पर्याय हैं।"
        },
        {
            id: `${quizId}-q36`,
            topic: "पर्याय-विलोम",
            difficulty: "hard",
            question: "‘चंद्रमा’ का पर्यायवाची है—",
            options: ["रवि", "दिनकर", "शशि", "अनल"],
            correctAnswer: 2,
            explanation: "शशि, इंदु, चंद्र—ये चंद्रमा के पर्याय हैं।"
        },
        {
            id: `${quizId}-q37`,
            topic: "पर्याय-विलोम",
            difficulty: "hard",
            question: "‘दिन’ का विलोम है—",
            options: ["सवेरा", "रात", "प्रभात", "दोपहर"],
            correctAnswer: 1,
            explanation: "दिन का विपरीत अर्थ रात है।"
        },
        {
            id: `${quizId}-q38`,
            topic: "पर्याय-विलोम",
            difficulty: "hard",
            question: "‘सुख’ का विलोम है—",
            options: ["दुख", "लाभ", "आनंद", "हर्ष"],
            correctAnswer: 0,
            explanation: "सुख का विलोम दुख है।"
        },
        {
            id: `${quizId}-q39`,
            topic: "पर्याय-विलोम",
            difficulty: "hard",
            question: "‘उदय’ का विलोम है—",
            options: ["प्रकाश", "उत्थान", "अस्त", "आरंभ"],
            correctAnswer: 2,
            explanation: "उदय का विपरीत अर्थ अस्त है।"
        },
        {
            id: `${quizId}-q40`,
            topic: "पर्याय-विलोम",
            difficulty: "hard",
            question: "‘आगमन’ का विलोम है—",
            options: ["आना", "प्रवेश", "उपस्थिति", "प्रस्थान"],
            correctAnswer: 3,
            explanation: "आगमन का अर्थ आना है; विलोम प्रस्थान है।"
        },
        {
            id: `${quizId}-q41`,
            topic: "पर्याय-विलोम",
            difficulty: "hard",
            question: "‘निर्मल’ का विलोम है—",
            options: ["शुद्ध", "मलिन", "स्वच्छ", "पवित्र"],
            correctAnswer: 1,
            explanation: "निर्मल का अर्थ स्वच्छ है; विलोम मलिन है।"
        },
        {
            id: `${quizId}-q42`,
            topic: "पर्याय-विलोम",
            difficulty: "hard",
            question: "‘लाभ’ का विलोम है—",
            options: ["हानि", "प्राप्ति", "धन", "सफलता"],
            correctAnswer: 0,
            explanation: "लाभ का विलोम हानि है।"
        },
        {
            id: `${quizId}-q43`,
            topic: "पर्याय-विलोम",
            difficulty: "hard",
            question: "‘मित्र’ का विलोम है—",
            options: ["बंधु", "शत्रु", "सखा", "सहचर"],
            correctAnswer: 1,
            explanation: "मित्र का विपरीत शब्द शत्रु है।"
        },
        {
            id: `${quizId}-q44`,
            topic: "पर्याय-विलोम",
            difficulty: "hard",
            question: "‘नवीन’ का विलोम है—",
            options: ["ताजा", "नूतन", "प्राचीन", "आधुनिक"],
            correctAnswer: 2,
            explanation: "नवीन का अर्थ नया है; विलोम प्राचीन है।"
        },
        {
            id: `${quizId}-q45`,
            topic: "पर्याय-विलोम",
            difficulty: "hard",
            question: "‘उत्थान’ का विलोम है—",
            options: ["विकास", "उन्नति", "पतन", "प्रगति"],
            correctAnswer: 2,
            explanation: "उत्थान का विपरीत अर्थ पतन है।"
        },
        {
            id: `${quizId}-q46`,
            topic: "पर्याय-विलोम",
            difficulty: "hard",
            question: "‘गुरु’ का विलोम है—",
            options: ["श्रेष्ठ", "भारी", "लघु", "महान"],
            correctAnswer: 2,
            explanation: "गुरु का एक अर्थ भारी/बड़ा है; इसका विलोम लघु है।"
        },
        {
            id: `${quizId}-q47`,
            topic: "पर्याय-विलोम",
            difficulty: "hard",
            question: "‘शीत’ का विलोम है—",
            options: ["ठंडा", "उष्ण", "कोमल", "मंद"],
            correctAnswer: 1,
            explanation: "शीत का विपरीत अर्थ उष्ण है।"
        },
        {
            id: `${quizId}-q48`,
            topic: "पर्याय-विलोम",
            difficulty: "hard",
            question: "‘अंधकार’ का विलोम है—",
            options: ["प्रकाश", "तम", "छाया", "रात्रि"],
            correctAnswer: 0,
            explanation: "अंधकार का विपरीत शब्द प्रकाश है।"
        },
        {
            id: `${quizId}-q49`,
            topic: "पर्याय-विलोम",
            difficulty: "hard",
            question: "‘स्वतंत्र’ का विलोम है—",
            options: ["मुक्त", "स्वाधीन", "परतंत्र", "निर्बंध"],
            correctAnswer: 2,
            explanation: "स्वतंत्र का विपरीत अर्थ परतंत्र है।"
        },
        {
            id: `${quizId}-q50`,
            topic: "पर्याय-विलोम",
            difficulty: "hard",
            question: "‘सत्य’ का विलोम है—",
            options: ["यथार्थ", "असत्य", "तथ्य", "प्रमाण"],
            correctAnswer: 1,
            explanation: "सत्य का विपरीत असत्य है।"
        }
    ];

    window.GJU_QUIZ_BANK.push({
        id: quizId,
        subject: "Hindi",
        title: "Hindi Mixed Grammar GK Practice Set 3",
        description: "50 well-balanced mixed Hindi Grammar GK MCQs for SSC, UPSI, UPPCS, Police and other competitive exams with close options and professional explanations.",
        durationMinutes: 35,
        totalQuestions: questions.length,
        marksPerQuestion: 1,
        negativeMarks: 0.25,
        difficulty: "Hard",
        tags: ["SSC", "UPSI", "UPPCS", "Police", "Hindi", "Grammar", "GK"],
        questions
    });
}());