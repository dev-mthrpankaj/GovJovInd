(function () {
    "use strict";

    window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];

    const quizId = "hindi-mixed-grammar-gk-set-2";

    const questions = [
        {
            id: `${quizId}-q01`,
            topic: "समास",
            difficulty: "hard",
            question: "‘राजपुत्र’ में कौन-सा समास है?",
            options: ["तत्पुरुष", "बहुव्रीहि", "कर्मधारय", "द्वंद्व"],
            correctAnswer: 0,
            explanation: "राजपुत्र का विग्रह राजा का पुत्र है, इसलिए यह संबंध तत्पुरुष समास है।"
        },
        {
            id: `${quizId}-q02`,
            topic: "समास",
            difficulty: "hard",
            question: "‘नीलकमल’ किस समास का उदाहरण है?",
            options: ["अव्ययीभाव", "द्विगु", "कर्मधारय", "तत्पुरुष"],
            correctAnswer: 2,
            explanation: "नीला है जो कमल—विशेषण-विशेष्य संबंध होने से कर्मधारय समास है।"
        },
        {
            id: `${quizId}-q03`,
            topic: "समास",
            difficulty: "hard",
            question: "‘माता-पिता’ में कौन-सा समास है?",
            options: ["द्वंद्व", "तत्पुरुष", "बहुव्रीहि", "कर्मधारय"],
            correctAnswer: 0,
            explanation: "माता और पिता दोनों पद समान महत्त्व रखते हैं, इसलिए द्वंद्व समास है।"
        },
        {
            id: `${quizId}-q04`,
            topic: "समास",
            difficulty: "hard",
            question: "‘यथाशक्ति’ में कौन-सा समास है?",
            options: ["कर्मधारय", "बहुव्रीहि", "द्विगु", "अव्ययीभाव"],
            correctAnswer: 3,
            explanation: "यथा अव्यय से बना समस्त पद अव्ययीभाव समास कहलाता है।"
        },
        {
            id: `${quizId}-q05`,
            topic: "समास",
            difficulty: "hard",
            question: "‘चौराहा’ किस समास का उदाहरण है?",
            options: ["द्विगु", "द्वंद्व", "तत्पुरुष", "कर्मधारय"],
            correctAnswer: 0,
            explanation: "चार राहों का समूह—संख्या प्रधान होने से द्विगु समास है।"
        },
        {
            id: `${quizId}-q06`,
            topic: "समास",
            difficulty: "hard",
            question: "‘लंबोदर’ किस समास का उदाहरण है?",
            options: ["तत्पुरुष", "कर्मधारय", "द्वंद्व", "बहुव्रीहि"],
            correctAnswer: 3,
            explanation: "लंबा उदर जिसका हो—यह किसी अन्य के लिए प्रयुक्त है, इसलिए बहुव्रीहि समास है।"
        },
        {
            id: `${quizId}-q07`,
            topic: "समास",
            difficulty: "hard",
            question: "‘दशानन’ में कौन-सा समास है?",
            options: ["द्वंद्व", "द्विगु", "बहुव्रीहि", "कर्मधारय"],
            correctAnswer: 2,
            explanation: "दस आनन वाला—यह रावण के लिए प्रयुक्त विशेषण है, अतः बहुव्रीहि।"
        },
        {
            id: `${quizId}-q08`,
            topic: "समास",
            difficulty: "hard",
            question: "‘गृहप्रवेश’ का सही विग्रह क्या है?",
            options: ["गृह का प्रवेश", "गृह जैसा प्रवेश", "गृह और प्रवेश", "गृह में प्रवेश"],
            correctAnswer: 3,
            explanation: "गृहप्रवेश का अर्थ घर में प्रवेश है।"
        },
        {
            id: `${quizId}-q09`,
            topic: "समास",
            difficulty: "hard",
            question: "‘जलपान’ का सही विग्रह है—",
            options: ["जल का पान", "जल और पान", "जल में पान", "जल जैसा पान"],
            correctAnswer: 0,
            explanation: "जलपान का अर्थ जल/पेय का पान है।"
        },
        {
            id: `${quizId}-q10`,
            topic: "समास",
            difficulty: "hard",
            question: "‘दिन-रात’ किस समास का उदाहरण है?",
            options: ["द्विगु", "अव्ययीभाव", "बहुव्रीहि", "द्वंद्व"],
            correctAnswer: 3,
            explanation: "दिन और रात दोनों पद समान महत्त्व रखते हैं, इसलिए द्वंद्व समास है।"
        },
        {
            id: `${quizId}-q11`,
            topic: "समास",
            difficulty: "hard",
            question: "‘प्रतिदिन’ में कौन-सा समास है?",
            options: ["कर्मधारय", "तत्पुरुष", "अव्ययीभाव", "द्वंद्व"],
            correctAnswer: 2,
            explanation: "प्रति अव्यय से बना होने के कारण प्रतिदिन अव्ययीभाव समास है।"
        },
        {
            id: `${quizId}-q12`,
            topic: "समास",
            difficulty: "hard",
            question: "‘पंचवटी’ किस समास का उदाहरण है?",
            options: ["बहुव्रीहि", "द्विगु", "द्वंद्व", "तत्पुरुष"],
            correctAnswer: 1,
            explanation: "पाँच वटों का समूह—संख्या प्रधानता के कारण द्विगु समास।"
        },
        {
            id: `${quizId}-q13`,
            topic: "समास",
            difficulty: "hard",
            question: "‘पीतांबर’ में कौन-सा समास है?",
            options: ["अव्ययीभाव", "कर्मधारय", "द्वंद्व", "बहुव्रीहि"],
            correctAnswer: 3,
            explanation: "पीत अंबर जिसका हो—यह किसी अन्य के लिए प्रयुक्त है, अतः बहुव्रीहि।"
        },
        {
            id: `${quizId}-q14`,
            topic: "समास",
            difficulty: "hard",
            question: "‘वनवास’ का सही विग्रह है—",
            options: ["वन में वास", "वन का वास", "वन जैसा वास", "वन और वास"],
            correctAnswer: 0,
            explanation: "वनवास का अर्थ वन में निवास है।"
        },
        {
            id: `${quizId}-q15`,
            topic: "समास",
            difficulty: "hard",
            question: "‘देशभक्ति’ का सही विग्रह है—",
            options: ["देश की भक्ति", "देश के प्रति भक्ति", "देश और भक्ति", "देश जैसी भक्ति"],
            correctAnswer: 1,
            explanation: "देशभक्ति का अर्थ देश के प्रति भक्ति है।"
        },
        {
            id: `${quizId}-q16`,
            topic: "समास",
            difficulty: "hard",
            question: "‘आजीवन’ में कौन-सा समास है?",
            options: ["द्विगु", "द्वंद्व", "कर्मधारय", "अव्ययीभाव"],
            correctAnswer: 3,
            explanation: "आजीवन का अर्थ जीवन भर है; अव्यय प्रधानता के कारण अव्ययीभाव।"
        },
        {
            id: `${quizId}-q17`,
            topic: "समास",
            difficulty: "hard",
            question: "‘त्रिलोचन’ किस समास का उदाहरण है?",
            options: ["बहुव्रीहि", "द्वंद्व", "द्विगु", "तत्पुरुष"],
            correctAnswer: 0,
            explanation: "तीन लोचन जिसके हों—यह शिव के लिए प्रयुक्त है, इसलिए बहुव्रीहि।"
        },
        {
            id: `${quizId}-q18`,
            topic: "समास",
            difficulty: "hard",
            question: "‘सुख-दुख’ किस समास का उदाहरण है?",
            options: ["तत्पुरुष", "कर्मधारय", "अव्ययीभाव", "द्वंद्व"],
            correctAnswer: 3,
            explanation: "सुख और दुख—दोनों पद प्रधान हैं, इसलिए द्वंद्व समास।"
        },
        {
            id: `${quizId}-q19`,
            topic: "समास",
            difficulty: "hard",
            question: "‘पुस्तकालय’ का सही विग्रह है—",
            options: ["पुस्तक जैसा आलय", "पुस्तक में आलय", "पुस्तकों का आलय", "पुस्तक और आलय"],
            correctAnswer: 2,
            explanation: "पुस्तकालय का अर्थ पुस्तकों का स्थान/आलय है।"
        },
        {
            id: `${quizId}-q20`,
            topic: "समास",
            difficulty: "hard",
            question: "समास का सामान्य अर्थ क्या है?",
            options: ["वर्ण-विच्छेद", "विराम", "विस्तार", "संक्षेप"],
            correctAnswer: 3,
            explanation: "दो या अधिक पदों को संक्षेप में मिलाकर नया पद बनाना समास है।"
        },
        {
            id: `${quizId}-q21`,
            topic: "लिंग-वचन-कारक",
            difficulty: "hard",
            question: "‘कवि’ का स्त्रीलिंग रूप क्या है?",
            options: ["कविकाी", "कविनी", "कवयित्री", "कविका"],
            correctAnswer: 2,
            explanation: "कवि का मानक स्त्रीलिंग कवयित्री है।"
        },
        {
            id: `${quizId}-q22`,
            topic: "लिंग-वचन-कारक",
            difficulty: "hard",
            question: "‘लेखक’ का स्त्रीलिंग रूप है—",
            options: ["लेखिका", "लेखका", "लेखकनी", "लेखकी"],
            correctAnswer: 0,
            explanation: "लेखक का स्त्रीलिंग लेखिका होता है।"
        },
        {
            id: `${quizId}-q23`,
            topic: "लिंग-वचन-कारक",
            difficulty: "hard",
            question: "‘नायक’ का स्त्रीलिंग रूप है—",
            options: ["नायिका", "नायकनी", "नायकी", "नायका"],
            correctAnswer: 0,
            explanation: "नायक का मानक स्त्रीलिंग नायिका है।"
        },
        {
            id: `${quizId}-q24`,
            topic: "लिंग-वचन-कारक",
            difficulty: "hard",
            question: "‘राजा’ का स्त्रीलिंग रूप है—",
            options: ["राजिका", "राज्ञी", "राजनी", "रानी"],
            correctAnswer: 3,
            explanation: "सामान्य प्रयोग में राजा का स्त्रीलिंग रानी है।"
        },
        {
            id: `${quizId}-q25`,
            topic: "लिंग-वचन-कारक",
            difficulty: "hard",
            question: "‘गायक’ का स्त्रीलिंग रूप है—",
            options: ["गायकनी", "गायकी", "गायका", "गायिका"],
            correctAnswer: 3,
            explanation: "गायक का स्त्रीलिंग गायिका है।"
        },
        {
            id: `${quizId}-q26`,
            topic: "लिंग-वचन-कारक",
            difficulty: "hard",
            question: "‘देव’ का स्त्रीलिंग रूप है—",
            options: ["देवी", "देविका", "देवनी", "देवा"],
            correctAnswer: 0,
            explanation: "देव का स्त्रीलिंग देवी होता है।"
        },
        {
            id: `${quizId}-q27`,
            topic: "लिंग-वचन-कारक",
            difficulty: "hard",
            question: "‘पुत्र’ का स्त्रीलिंग रूप है—",
            options: ["पुत्रानी", "पुत्री", "पुत्रिका", "पुत्रा"],
            correctAnswer: 1,
            explanation: "पुत्र का मानक स्त्रीलिंग पुत्री है।"
        },
        {
            id: `${quizId}-q28`,
            topic: "लिंग-वचन-कारक",
            difficulty: "hard",
            question: "‘बालक’ का स्त्रीलिंग रूप है—",
            options: ["बालकी", "बालिनी", "बालिका", "बालकनी"],
            correctAnswer: 2,
            explanation: "बालक का स्त्रीलिंग बालिका है।"
        },
        {
            id: `${quizId}-q29`,
            topic: "लिंग-वचन-कारक",
            difficulty: "hard",
            question: "‘घोड़ा’ का स्त्रीलिंग रूप है—",
            options: ["घोड़ी", "घोड़िया", "घोड़िन", "घोड़ाी"],
            correctAnswer: 0,
            explanation: "घोड़ा का स्त्रीलिंग घोड़ी है।"
        },
        {
            id: `${quizId}-q30`,
            topic: "लिंग-वचन-कारक",
            difficulty: "hard",
            question: "‘बैल’ का स्त्रीलिंग रूप है—",
            options: ["बैलनी", "बैली", "गाय", "बैलिका"],
            correctAnswer: 2,
            explanation: "बैल का स्त्रीलिंग गाय माना जाता है।"
        },
        {
            id: `${quizId}-q31`,
            topic: "लिंग-वचन-कारक",
            difficulty: "hard",
            question: "‘लड़का’ का सामान्य बहुवचन रूप है—",
            options: ["लड़कियाँ", "लड़के", "लड़की", "लड़कों"],
            correctAnswer: 1,
            explanation: "लड़का का कर्ता कारक बहुवचन रूप लड़के है।"
        },
        {
            id: `${quizId}-q32`,
            topic: "लिंग-वचन-कारक",
            difficulty: "hard",
            question: "‘लड़की’ का कर्ता कारक बहुवचन है—",
            options: ["लड़कियाँ", "लड़के", "लड़कियों", "लड़कीं"],
            correctAnswer: 0,
            explanation: "लड़की का सामान्य बहुवचन लड़कियाँ है।"
        },
        {
            id: `${quizId}-q33`,
            topic: "लिंग-वचन-कारक",
            difficulty: "hard",
            question: "‘किताब’ का सामान्य बहुवचन है—",
            options: ["किताबें", "किताब", "किताबी", "किताबों"],
            correctAnswer: 0,
            explanation: "किताब का कर्ता कारक बहुवचन किताबें है।"
        },
        {
            id: `${quizId}-q34`,
            topic: "लिंग-वचन-कारक",
            difficulty: "hard",
            question: "‘नदी’ का सामान्य बहुवचन है—",
            options: ["नदियों", "नदीयाँ", "नदीं", "नदियाँ"],
            correctAnswer: 3,
            explanation: "नदी का बहुवचन नदियाँ होता है।"
        },
        {
            id: `${quizId}-q35`,
            topic: "लिंग-वचन-कारक",
            difficulty: "hard",
            question: "‘माला’ का शुद्ध बहुवचन है—",
            options: ["मालियाँ", "मालाएं", "मालों", "मालाएँ"],
            correctAnswer: 3,
            explanation: "माला का मानक बहुवचन मालाएँ है।"
        },
        {
            id: `${quizId}-q36`,
            topic: "लिंग-वचन-कारक",
            difficulty: "hard",
            question: "कर्ता कारक का प्रमुख चिह्न है—",
            options: ["से", "को", "का", "ने"],
            correctAnswer: 3,
            explanation: "भूतकालीन सकर्मक वाक्यों में कर्ता के साथ ‘ने’ आता है।"
        },
        {
            id: `${quizId}-q37`,
            topic: "लिंग-वचन-कारक",
            difficulty: "hard",
            question: "कर्म कारक का चिह्न है—",
            options: ["को", "का", "से", "ने"],
            correctAnswer: 0,
            explanation: "जिस पर क्रिया का प्रभाव पड़ता है, वहाँ सामान्यतः ‘को’ चिह्न आता है।"
        },
        {
            id: `${quizId}-q38`,
            topic: "लिंग-वचन-कारक",
            difficulty: "hard",
            question: "करण कारक का प्रमुख चिह्न है—",
            options: ["को", "पर", "का", "से"],
            correctAnswer: 3,
            explanation: "जिस साधन से कार्य हो, वहाँ ‘से’ करण कारक का चिह्न है।"
        },
        {
            id: `${quizId}-q39`,
            topic: "लिंग-वचन-कारक",
            difficulty: "hard",
            question: "सम्प्रदान कारक का चिह्न है—",
            options: ["में", "से", "का", "के लिए"],
            correctAnswer: 3,
            explanation: "जिसके लिए कार्य किया जाए, वहाँ सम्प्रदान कारक होता है।"
        },
        {
            id: `${quizId}-q40`,
            topic: "लिंग-वचन-कारक",
            difficulty: "hard",
            question: "अपादान कारक का चिह्न है—",
            options: ["का", "ने", "को", "से"],
            correctAnswer: 3,
            explanation: "अलगाव/दूरी का बोध कराने वाला ‘से’ अपादान कारक है।"
        },
        {
            id: `${quizId}-q41`,
            topic: "लिंग-वचन-कारक",
            difficulty: "hard",
            question: "संबंध कारक के चिह्न हैं—",
            options: ["का, के, की", "ने, को, से", "में, पर", "हे, अरे"],
            correctAnswer: 0,
            explanation: "अधिकार/संबंध दिखाने के लिए का, के, की प्रयुक्त होते हैं।"
        },
        {
            id: `${quizId}-q42`,
            topic: "लिंग-वचन-कारक",
            difficulty: "hard",
            question: "अधिकरण कारक के चिह्न हैं—",
            options: ["से, द्वारा", "का, के, की", "ने, को", "में, पर"],
            correctAnswer: 3,
            explanation: "स्थान या आधार का बोध कराने वाले ‘में, पर’ अधिकरण कारक के चिह्न हैं।"
        },
        {
            id: `${quizId}-q43`,
            topic: "लिंग-वचन-कारक",
            difficulty: "hard",
            question: "संबोधन कारक में सामान्यतः किसका प्रयोग होता है?",
            options: ["ने, को, से", "का, के, की", "में, पर", "हे, अरे, ओ"],
            correctAnswer: 3,
            explanation: "किसी को पुकारने के लिए हे, अरे, ओ आदि शब्द आते हैं।"
        },
        {
            id: `${quizId}-q44`,
            topic: "लिंग-वचन-कारक",
            difficulty: "hard",
            question: "‘राम ने पत्र लिखा।’ में ‘राम ने’ कौन-सा कारक है?",
            options: ["कर्म कारक", "कर्ता कारक", "करण कारक", "अधिकरण कारक"],
            correctAnswer: 1,
            explanation: "यहाँ कार्य करने वाला राम है और ‘ने’ कर्ता कारक का चिह्न है।"
        },
        {
            id: `${quizId}-q45`,
            topic: "लिंग-वचन-कारक",
            difficulty: "hard",
            question: "‘सीता ने मोहन को फल दिया।’ में ‘मोहन को’ कौन-सा कारक है?",
            options: ["सम्प्रदान कारक", "अपादान कारक", "करण कारक", "कर्म कारक"],
            correctAnswer: 0,
            explanation: "जिसे कुछ दिया जाए, वह सम्प्रदान कारक होता है।"
        },
        {
            id: `${quizId}-q46`,
            topic: "लिंग-वचन-कारक",
            difficulty: "hard",
            question: "‘चाकू से फल काटा।’ में ‘चाकू से’ कौन-सा कारक है?",
            options: ["कर्म कारक", "करण कारक", "अपादान कारक", "संबंध कारक"],
            correctAnswer: 1,
            explanation: "चाकू कार्य का साधन है, इसलिए करण कारक है।"
        },
        {
            id: `${quizId}-q47`,
            topic: "लिंग-वचन-कारक",
            difficulty: "hard",
            question: "‘पेड़ से पत्ता गिरा।’ में ‘पेड़ से’ कौन-सा कारक है?",
            options: ["अपादान कारक", "करण कारक", "कर्ता कारक", "अधिकरण कारक"],
            correctAnswer: 0,
            explanation: "यहाँ अलगाव का बोध है, इसलिए अपादान कारक है।"
        },
        {
            id: `${quizId}-q48`,
            topic: "लिंग-वचन-कारक",
            difficulty: "hard",
            question: "‘मेज पर किताब है।’ में ‘मेज पर’ कौन-सा कारक है?",
            options: ["करण कारक", "अधिकरण कारक", "सम्बंध कारक", "कर्म कारक"],
            correctAnswer: 1,
            explanation: "स्थान/आधार का बोध होने से यह अधिकरण कारक है।"
        },
        {
            id: `${quizId}-q49`,
            topic: "लिंग-वचन-कारक",
            difficulty: "hard",
            question: "‘राम की पुस्तक’ में ‘राम की’ कौन-सा कारक है?",
            options: ["करण कारक", "संबंध कारक", "कर्ता कारक", "कर्म कारक"],
            correctAnswer: 1,
            explanation: "‘की’ अधिकार/संबंध बताता है, इसलिए संबंध कारक है।"
        },
        {
            id: `${quizId}-q50`,
            topic: "लिंग-वचन-कारक",
            difficulty: "hard",
            question: "‘हे मित्र!’ में कौन-सा कारक है?",
            options: ["संबोधन कारक", "सम्प्रदान कारक", "कर्म कारक", "कर्ता कारक"],
            correctAnswer: 0,
            explanation: "किसी को पुकारने पर संबोधन कारक होता है।"
        }
    ];

    window.GJU_QUIZ_BANK.push({
        id: quizId,
        subject: "Hindi",
        title: "Hindi Mixed Grammar GK Practice Set 2",
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