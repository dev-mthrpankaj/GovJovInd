(function () {
    "use strict";

    window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];

    const quizId = "hindi-mixed-grammar-gk-set-4";

    const questions = [
        {
            id: `${quizId}-q01`,
            topic: "वाक्य-विचार",
            difficulty: "hard",
            question: "जिस वाक्य में एक ही मुख्य क्रिया हो, वह कहलाता है—",
            options: ["आश्रित वाक्य", "मिश्र वाक्य", "सरल वाक्य", "संयुक्त वाक्य"],
            correctAnswer: 2,
            explanation: "एक मुख्य क्रिया/विधेय वाला वाक्य सरल वाक्य है।"
        },
        {
            id: `${quizId}-q02`,
            topic: "वाक्य-विचार",
            difficulty: "hard",
            question: "दो या अधिक स्वतंत्र उपवाक्यों से बना वाक्य कहलाता है—",
            options: ["मिश्र वाक्य", "संयुक्त वाक्य", "सरल वाक्य", "आज्ञार्थक वाक्य"],
            correctAnswer: 1,
            explanation: "स्वतंत्र उपवाक्यों के मेल से संयुक्त वाक्य बनता है।"
        },
        {
            id: `${quizId}-q03`,
            topic: "वाक्य-विचार",
            difficulty: "hard",
            question: "मुख्य और आश्रित उपवाक्य वाला वाक्य कहलाता है—",
            options: ["सरल वाक्य", "विधानवाचक वाक्य", "मिश्र वाक्य", "संयुक्त वाक्य"],
            correctAnswer: 2,
            explanation: "मिश्र वाक्य में एक मुख्य और एक/अधिक आश्रित उपवाक्य होते हैं।"
        },
        {
            id: `${quizId}-q04`,
            topic: "वाक्य-विचार",
            difficulty: "hard",
            question: "‘क्या तुम पढ़ रहे हो?’ किस प्रकार का वाक्य है?",
            options: ["विधानवाचक", "विस्मयादिबोधक", "आज्ञार्थक", "प्रश्नवाचक"],
            correctAnswer: 3,
            explanation: "जिस वाक्य में प्रश्न हो, वह प्रश्नवाचक वाक्य कहलाता है।"
        },
        {
            id: `${quizId}-q05`,
            topic: "वाक्य-विचार",
            difficulty: "hard",
            question: "‘कृपया दरवाजा बंद करो।’ किस प्रकार का वाक्य है?",
            options: ["निषेधवाचक", "आज्ञार्थक", "प्रश्नवाचक", "विस्मयादिबोधक"],
            correctAnswer: 1,
            explanation: "आदेश/अनुरोध व्यक्त करने वाला वाक्य आज्ञार्थक है।"
        },
        {
            id: `${quizId}-q06`,
            topic: "वाक्य-विचार",
            difficulty: "hard",
            question: "‘वाह! कितना सुंदर दृश्य है।’ किस प्रकार का वाक्य है?",
            options: ["आज्ञार्थक", "विस्मयादिबोधक", "निषेधवाचक", "प्रश्नवाचक"],
            correctAnswer: 1,
            explanation: "आश्चर्य/प्रशंसा व्यक्त होने के कारण यह विस्मयादिबोधक वाक्य है।"
        },
        {
            id: `${quizId}-q07`,
            topic: "विराम चिह्न",
            difficulty: "hard",
            question: "पूर्ण विराम का चिह्न कौन-सा है?",
            options: ["।", "!", "?", ","],
            correctAnswer: 0,
            explanation: "हिंदी में पूर्ण विराम ‘।’ वाक्य के अंत में लगाया जाता है।"
        },
        {
            id: `${quizId}-q08`,
            topic: "विराम चिह्न",
            difficulty: "hard",
            question: "प्रश्नवाचक चिह्न कौन-सा है?",
            options: ["।", "!", ",", "?"],
            correctAnswer: 3,
            explanation: "प्रश्न पूछने वाले वाक्य के अंत में ‘?’ लगाया जाता है।"
        },
        {
            id: `${quizId}-q09`,
            topic: "विराम चिह्न",
            difficulty: "hard",
            question: "विस्मयादिबोधक चिह्न कौन-सा है?",
            options: ["?", ",", "!", "।"],
            correctAnswer: 2,
            explanation: "हर्ष, शोक, आश्चर्य आदि भावों के लिए ‘!’ लगाया जाता है।"
        },
        {
            id: `${quizId}-q10`,
            topic: "विराम चिह्न",
            difficulty: "hard",
            question: "अल्पविराम का चिह्न कौन-सा है?",
            options: ["।", ";", "?", ","],
            correctAnswer: 3,
            explanation: "हल्का विराम दिखाने के लिए अल्पविराम ‘,’ का प्रयोग होता है।"
        },
        {
            id: `${quizId}-q11`,
            topic: "वाक्य-विचार",
            difficulty: "hard",
            question: "कर्ता और क्रिया का उचित मेल क्या कहलाता है?",
            options: ["समास", "अन्विति", "संधि", "प्रत्यय"],
            correctAnswer: 1,
            explanation: "कर्ता और क्रिया के लिंग, वचन, पुरुष आदि का मेल अन्विति है।"
        },
        {
            id: `${quizId}-q12`,
            topic: "वाक्य-विचार",
            difficulty: "hard",
            question: "‘सीता गाती है।’ में कर्ता कौन है?",
            options: ["गाती है", "है", "गाती", "सीता"],
            correctAnswer: 3,
            explanation: "कार्य करने वाला पद ‘सीता’ है।"
        },
        {
            id: `${quizId}-q13`,
            topic: "वाक्य-विचार",
            difficulty: "hard",
            question: "‘मोहन ने पत्र लिखा।’ में कर्म कौन है?",
            options: ["मोहन", "ने", "पत्र", "लिखा"],
            correctAnswer: 2,
            explanation: "जिस पर क्रिया का प्रभाव पड़ता है, वह कर्म है; यहाँ पत्र कर्म है।"
        },
        {
            id: `${quizId}-q14`,
            topic: "वाक्य-विचार",
            difficulty: "hard",
            question: "विधेय किसे कहते हैं?",
            options: ["कर्ता के बारे में कही गई बात", "केवल कर्ता", "केवल क्रिया", "केवल संज्ञा"],
            correctAnswer: 0,
            explanation: "वाक्य में कर्ता के संबंध में कही गई बात विधेय कहलाती है।"
        },
        {
            id: `${quizId}-q15`,
            topic: "वाक्य-विचार",
            difficulty: "hard",
            question: "‘सत्य बोलो।’ किस प्रकार का वाक्य है?",
            options: ["मिश्र", "प्रश्नवाचक", "संयुक्त", "आज्ञार्थक"],
            correctAnswer: 3,
            explanation: "यहाँ आदेश/उपदेश दिया गया है, इसलिए आज्ञार्थक वाक्य है।"
        },
        {
            id: `${quizId}-q16`,
            topic: "मुहावरे-लोकोक्ति",
            difficulty: "hard",
            question: "‘दाँतों तले उँगली दबाना’ का अर्थ है—",
            options: ["आश्चर्यचकित होना", "लज्जित होना", "क्रोधित होना", "भयभीत होना"],
            correctAnswer: 0,
            explanation: "यह मुहावरा अत्यधिक आश्चर्य के लिए प्रयुक्त होता है।"
        },
        {
            id: `${quizId}-q17`,
            topic: "मुहावरे-लोकोक्ति",
            difficulty: "hard",
            question: "‘नाक कटना’ का अर्थ है—",
            options: ["क्रोधित होना", "बीमार होना", "प्रसिद्ध होना", "अपमान होना"],
            correctAnswer: 3,
            explanation: "नाक कटना मान-सम्मान नष्ट होने के अर्थ में आता है।"
        },
        {
            id: `${quizId}-q18`,
            topic: "मुहावरे-लोकोक्ति",
            difficulty: "hard",
            question: "‘आँखों में धूल झोंकना’ का अर्थ है—",
            options: ["सहायता करना", "ध्यान देना", "धोखा देना", "प्रशंसा करना"],
            correctAnswer: 2,
            explanation: "किसी को छलना/धोखा देना इस मुहावरे का अर्थ है।"
        },
        {
            id: `${quizId}-q19`,
            topic: "मुहावरे-लोकोक्ति",
            difficulty: "hard",
            question: "‘कान भरना’ का अर्थ है—",
            options: ["रहस्य बताना", "ध्यान से सुनना", "चुगली करके भड़काना", "आदेश देना"],
            correctAnswer: 2,
            explanation: "किसी के विरुद्ध बात कहकर उसे भड़काना कान भरना है।"
        },
        {
            id: `${quizId}-q20`,
            topic: "मुहावरे-लोकोक्ति",
            difficulty: "hard",
            question: "‘हाथ-पाँव फूलना’ का अर्थ है—",
            options: ["परिश्रम करना", "मजबूत होना", "खुश होना", "घबरा जाना"],
            correctAnswer: 3,
            explanation: "भय या चिंता से घबरा जाना हाथ-पाँव फूलना कहलाता है।"
        },
        {
            id: `${quizId}-q21`,
            topic: "मुहावरे-लोकोक्ति",
            difficulty: "hard",
            question: "‘ऊँट के मुँह में जीरा’ का अर्थ है—",
            options: ["बहुत स्वादिष्ट", "आवश्यकता से बहुत कम", "बहुत महँगा", "बहुत अधिक"],
            correctAnswer: 1,
            explanation: "बड़ी आवश्यकता की तुलना में बहुत कम वस्तु के लिए यह लोकोक्ति प्रयोग होती है।"
        },
        {
            id: `${quizId}-q22`,
            topic: "मुहावरे-लोकोक्ति",
            difficulty: "hard",
            question: "‘नाच न जाने आँगन टेढ़ा’ का अर्थ है—",
            options: ["नाच में दक्ष होना", "कला का सम्मान करना", "आँगन बनाना", "अपनी कमी का दोष दूसरों पर लगाना"],
            correctAnswer: 3,
            explanation: "अपनी अयोग्यता छिपाकर दोष बाहर लगाना इसका भावार्थ है।"
        },
        {
            id: `${quizId}-q23`,
            topic: "मुहावरे-लोकोक्ति",
            difficulty: "hard",
            question: "‘अंधों में काना राजा’ का अर्थ है—",
            options: ["अयोग्यों में थोड़ा योग्य व्यक्ति श्रेष्ठ माना जाना", "राजा का अंधा होना", "सबको समान मानना", "काना व्यक्ति राजा होना"],
            correctAnswer: 0,
            explanation: "कम योग्य समूह में थोड़ा योग्य व्यक्ति भी श्रेष्ठ माना जाता है।"
        },
        {
            id: `${quizId}-q24`,
            topic: "मुहावरे-लोकोक्ति",
            difficulty: "hard",
            question: "‘जैसी करनी वैसी भरनी’ का भावार्थ है—",
            options: ["धन ही सबकुछ है", "परिश्रम व्यर्थ है", "कर्म का फल मिलता है", "भाग्य सबसे बड़ा है"],
            correctAnswer: 2,
            explanation: "मनुष्य को अपने कर्मों का फल अवश्य मिलता है।"
        },
        {
            id: `${quizId}-q25`,
            topic: "मुहावरे-लोकोक्ति",
            difficulty: "hard",
            question: "‘जल में रहकर मगर से बैर’ का अर्थ है—",
            options: ["मगर से मित्रता करनी चाहिए", "जिस पर निर्भर हों, उससे विरोध न करना चाहिए", "जल में रहना चाहिए", "शत्रु को कभी न छोड़ना चाहिए"],
            correctAnswer: 1,
            explanation: "जिस व्यवस्था/व्यक्ति पर निर्भर हों, उससे अनावश्यक विरोध उचित नहीं।"
        },
        {
            id: `${quizId}-q26`,
            topic: "रस-अलंकार",
            difficulty: "hard",
            question: "स्थायी भाव ‘रति’ से कौन-सा रस बनता है?",
            options: ["वीर रस", "करुण रस", "भयानक रस", "शृंगार रस"],
            correctAnswer: 3,
            explanation: "रति स्थायी भाव से शृंगार रस की उत्पत्ति होती है।"
        },
        {
            id: `${quizId}-q27`,
            topic: "रस-अलंकार",
            difficulty: "hard",
            question: "स्थायी भाव ‘शोक’ से कौन-सा रस बनता है?",
            options: ["रौद्र रस", "हास्य रस", "करुण रस", "वीर रस"],
            correctAnswer: 2,
            explanation: "शोक स्थायी भाव करुण रस का आधार है।"
        },
        {
            id: `${quizId}-q28`,
            topic: "रस-अलंकार",
            difficulty: "hard",
            question: "स्थायी भाव ‘उत्साह’ से कौन-सा रस बनता है?",
            options: ["शांत रस", "बीभत्स रस", "वीर रस", "भयानक रस"],
            correctAnswer: 2,
            explanation: "उत्साह से वीर रस की निष्पत्ति होती है।"
        },
        {
            id: `${quizId}-q29`,
            topic: "रस-अलंकार",
            difficulty: "hard",
            question: "स्थायी भाव ‘हास’ से कौन-सा रस बनता है?",
            options: ["हास्य रस", "शृंगार रस", "अद्भुत रस", "करुण रस"],
            correctAnswer: 0,
            explanation: "हास स्थायी भाव से हास्य रस बनता है।"
        },
        {
            id: `${quizId}-q30`,
            topic: "रस-अलंकार",
            difficulty: "hard",
            question: "स्थायी भाव ‘क्रोध’ से कौन-सा रस बनता है?",
            options: ["शांत रस", "रौद्र रस", "वीर रस", "करुण रस"],
            correctAnswer: 1,
            explanation: "क्रोध स्थायी भाव रौद्र रस का आधार है।"
        },
        {
            id: `${quizId}-q31`,
            topic: "रस-अलंकार",
            difficulty: "hard",
            question: "जहाँ एक ही वर्ण की बार-बार आवृत्ति हो, वहाँ कौन-सा अलंकार होता है?",
            options: ["यमक", "अनुप्रास", "रूपक", "उपमा"],
            correctAnswer: 1,
            explanation: "वर्णों की आवृत्ति से अनुप्रास अलंकार होता है।"
        },
        {
            id: `${quizId}-q32`,
            topic: "रस-अलंकार",
            difficulty: "hard",
            question: "‘मुख चंद्र के समान है’ में कौन-सा अलंकार है?",
            options: ["अनुप्रास", "यमक", "उपमा", "रूपक"],
            correctAnswer: 2,
            explanation: "‘के समान’ से समानता व्यक्त हुई है, इसलिए उपमा अलंकार है।"
        },
        {
            id: `${quizId}-q33`,
            topic: "रस-अलंकार",
            difficulty: "hard",
            question: "जहाँ उपमेय को उपमान ही मान लिया जाए, वहाँ कौन-सा अलंकार होता है?",
            options: ["रूपक", "उपमा", "श्लेष", "अनुप्रास"],
            correctAnswer: 0,
            explanation: "रूपक में उपमेय पर उपमान का आरोप किया जाता है।"
        },
        {
            id: `${quizId}-q34`,
            topic: "रस-अलंकार",
            difficulty: "hard",
            question: "एक शब्द के अनेक अर्थों से बनने वाला अलंकार है—",
            options: ["श्लेष", "रूपक", "उपमा", "अनुप्रास"],
            correctAnswer: 0,
            explanation: "एक ही शब्द के अनेक अर्थों का चमत्कार श्लेष कहलाता है।"
        },
        {
            id: `${quizId}-q35`,
            topic: "छंद-साहित्य",
            difficulty: "hard",
            question: "दोहा छंद के प्रथम और तृतीय चरण में कितनी मात्राएँ होती हैं?",
            options: ["16", "13", "11", "24"],
            correctAnswer: 1,
            explanation: "दोहा के पहले और तीसरे चरण में 13-13 मात्राएँ होती हैं।"
        },
        {
            id: `${quizId}-q36`,
            topic: "छंद-साहित्य",
            difficulty: "hard",
            question: "दोहा छंद के द्वितीय और चतुर्थ चरण में कितनी मात्राएँ होती हैं?",
            options: ["24", "16", "13", "11"],
            correctAnswer: 3,
            explanation: "दोहा के दूसरे और चौथे चरण में 11-11 मात्राएँ होती हैं।"
        },
        {
            id: `${quizId}-q37`,
            topic: "छंद-साहित्य",
            difficulty: "hard",
            question: "चौपाई छंद के प्रत्येक चरण में कितनी मात्राएँ होती हैं?",
            options: ["16", "13", "11", "24"],
            correctAnswer: 0,
            explanation: "चौपाई में प्रत्येक चरण में 16 मात्राएँ होती हैं।"
        },
        {
            id: `${quizId}-q38`,
            topic: "छंद-साहित्य",
            difficulty: "hard",
            question: "सोरठा छंद का मात्रा क्रम क्या है?",
            options: ["11-13, 11-13", "12-12, 12-12", "13-11, 13-11", "16-16, 16-16"],
            correctAnswer: 0,
            explanation: "सोरठा में दोहे का उल्टा क्रम—11-13, 11-13 होता है।"
        },
        {
            id: `${quizId}-q39`,
            topic: "छंद-साहित्य",
            difficulty: "hard",
            question: "हिंदी दिवस कब मनाया जाता है?",
            options: ["14 सितंबर", "15 अगस्त", "10 जनवरी", "21 फरवरी"],
            correctAnswer: 0,
            explanation: "भारत में हिंदी दिवस 14 सितंबर को मनाया जाता है।"
        },
        {
            id: `${quizId}-q40`,
            topic: "छंद-साहित्य",
            difficulty: "hard",
            question: "विश्व हिंदी दिवस कब मनाया जाता है?",
            options: ["26 जनवरी", "14 सितंबर", "21 फरवरी", "10 जनवरी"],
            correctAnswer: 3,
            explanation: "विश्व हिंदी दिवस 10 जनवरी को मनाया जाता है।"
        },
        {
            id: `${quizId}-q41`,
            topic: "छंद-साहित्य",
            difficulty: "hard",
            question: "हिंदी की लिपि कौन-सी है?",
            options: ["देवनागरी", "गुरुमुखी", "फारसी", "रोमन"],
            correctAnswer: 0,
            explanation: "हिंदी भाषा देवनागरी लिपि में लिखी जाती है।"
        },
        {
            id: `${quizId}-q42`,
            topic: "छंद-साहित्य",
            difficulty: "hard",
            question: "देवनागरी लिपि किस दिशा में लिखी जाती है?",
            options: ["दाएँ से बाएँ", "नीचे से ऊपर", "ऊपर से नीचे", "बाएँ से दाएँ"],
            correctAnswer: 3,
            explanation: "देवनागरी लिपि बाएँ से दाएँ लिखी जाती है।"
        },
        {
            id: `${quizId}-q43`,
            topic: "छंद-साहित्य",
            difficulty: "hard",
            question: "‘कामायनी’ के रचनाकार कौन हैं?",
            options: ["प्रेमचंद", "सूरदास", "महादेवी वर्मा", "जयशंकर प्रसाद"],
            correctAnswer: 3,
            explanation: "कामायनी जयशंकर प्रसाद की प्रसिद्ध काव्यकृति है।"
        },
        {
            id: `${quizId}-q44`,
            topic: "छंद-साहित्य",
            difficulty: "hard",
            question: "‘गोदान’ उपन्यास के लेखक कौन हैं?",
            options: ["रामधारी सिंह दिनकर", "मैथिलीशरण गुप्त", "मुंशी प्रेमचंद", "जयशंकर प्रसाद"],
            correctAnswer: 2,
            explanation: "गोदान मुंशी प्रेमचंद का प्रसिद्ध उपन्यास है।"
        },
        {
            id: `${quizId}-q45`,
            topic: "छंद-साहित्य",
            difficulty: "hard",
            question: "‘साकेत’ के रचनाकार कौन हैं?",
            options: ["सूरदास", "दिनकर", "मैथिलीशरण गुप्त", "तुलसीदास"],
            correctAnswer: 2,
            explanation: "साकेत मैथिलीशरण गुप्त की काव्यकृति है।"
        },
        {
            id: `${quizId}-q46`,
            topic: "छंद-साहित्य",
            difficulty: "hard",
            question: "‘रामचरितमानस’ के रचयिता कौन हैं?",
            options: ["तुलसीदास", "कबीरदास", "सूरदास", "प्रेमचंद"],
            correctAnswer: 0,
            explanation: "रामचरितमानस गोस्वामी तुलसीदास की रचना है।"
        },
        {
            id: `${quizId}-q47`,
            topic: "छंद-साहित्य",
            difficulty: "hard",
            question: "‘सूरसागर’ के रचयिता कौन हैं?",
            options: ["सूरदास", "कबीरदास", "जयशंकर प्रसाद", "तुलसीदास"],
            correctAnswer: 0,
            explanation: "सूरसागर भक्तिकालीन कवि सूरदास की प्रमुख रचना है।"
        },
        {
            id: `${quizId}-q48`,
            topic: "छंद-साहित्य",
            difficulty: "hard",
            question: "‘यशोधरा’ के रचनाकार कौन हैं?",
            options: ["प्रेमचंद", "मैथिलीशरण गुप्त", "दिनकर", "महादेवी वर्मा"],
            correctAnswer: 1,
            explanation: "यशोधरा मैथिलीशरण गुप्त की प्रसिद्ध कृति है।"
        },
        {
            id: `${quizId}-q49`,
            topic: "छंद-साहित्य",
            difficulty: "hard",
            question: "‘कुरुक्षेत्र’ के रचनाकार कौन हैं?",
            options: ["प्रेमचंद", "रामधारी सिंह दिनकर", "जयशंकर प्रसाद", "मैथिलीशरण गुप्त"],
            correctAnswer: 1,
            explanation: "कुरुक्षेत्र रामधारी सिंह दिनकर की कृति है।"
        },
        {
            id: `${quizId}-q50`,
            topic: "छंद-साहित्य",
            difficulty: "hard",
            question: "‘आधुनिक मीरा’ के नाम से कौन प्रसिद्ध हैं?",
            options: ["मन्नू भंडारी", "महादेवी वर्मा", "महाश्वेता देवी", "सुभद्रा कुमारी चौहान"],
            correctAnswer: 1,
            explanation: "महादेवी वर्मा को आधुनिक मीरा कहा जाता है।"
        }
    ];

    window.GJU_QUIZ_BANK.push({
        id: quizId,
        subject: "Hindi",
        title: "Hindi Mixed Grammar GK Practice Set 4",
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