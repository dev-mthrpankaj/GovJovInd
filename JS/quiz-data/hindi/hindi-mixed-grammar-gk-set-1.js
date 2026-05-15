(function () {
    "use strict";

    window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];

    const quizId = "hindi-mixed-grammar-gk-set-1";

    const questions = [
        {
            id: `${quizId}-q01`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "हिंदी वर्णमाला में परंपरागत रूप से कितने स्वर माने जाते हैं?",
            options: ["13", "10", "11", "12"],
            correctAnswer: 2,
            explanation: "हिंदी में अ, आ, इ, ई, उ, ऊ, ऋ, ए, ऐ, ओ, औ—ये 11 स्वर माने जाते हैं।"
        },
        {
            id: `${quizId}-q02`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "हिंदी में मूल व्यंजनों की संख्या कितनी मानी जाती है?",
            options: ["33", "32", "35", "36"],
            correctAnswer: 0,
            explanation: "हिंदी में मूलतः 33 व्यंजन माने जाते हैं; क्ष, त्र, ज्ञ आदि संयुक्ताक्षर हैं।"
        },
        {
            id: `${quizId}-q03`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "क-वर्ग का पंचम वर्ण कौन-सा है?",
            options: ["ङ", "ञ", "न", "ण"],
            correctAnswer: 0,
            explanation: "क-वर्ग का क्रम क, ख, ग, घ, ङ है; इसलिए पंचम वर्ण ङ है।"
        },
        {
            id: `${quizId}-q04`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "च-वर्ग का अंतिम वर्ण कौन-सा है?",
            options: ["ङ", "ञ", "ण", "न"],
            correctAnswer: 1,
            explanation: "च-वर्ग का क्रम च, छ, ज, झ, ञ है।"
        },
        {
            id: `${quizId}-q05`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "ट-वर्ग का पंचम वर्ण कौन-सा है?",
            options: ["न", "ण", "ङ", "ञ"],
            correctAnswer: 1,
            explanation: "ट-वर्ग का क्रम ट, ठ, ड, ढ, ण है।"
        },
        {
            id: `${quizId}-q06`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "त-वर्ग का अंतिम वर्ण कौन-सा है?",
            options: ["म", "ण", "ञ", "न"],
            correctAnswer: 3,
            explanation: "त-वर्ग में त, थ, द, ध, न आते हैं।"
        },
        {
            id: `${quizId}-q07`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "प-वर्ग का पंचम वर्ण कौन-सा है?",
            options: ["न", "म", "व", "भ"],
            correctAnswer: 1,
            explanation: "प-वर्ग का क्रम प, फ, ब, भ, म है।"
        },
        {
            id: `${quizId}-q08`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "हिंदी के अन्तःस्थ व्यंजन कौन-से हैं?",
            options: ["य, र, ल, व", "श, ष, स, ह", "त, थ, द, ध", "क, ख, ग, घ"],
            correctAnswer: 0,
            explanation: "य, र, ल, व को अन्तःस्थ व्यंजन कहा जाता है।"
        },
        {
            id: `${quizId}-q09`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "हिंदी के ऊष्म व्यंजन कौन-से हैं?",
            options: ["क, ख, ग, घ", "ट, ठ, ड, ढ", "श, ष, स, ह", "य, र, ल, व"],
            correctAnswer: 2,
            explanation: "श, ष, स, ह उच्चारण में घर्षण/ऊष्मा के कारण ऊष्म व्यंजन कहलाते हैं।"
        },
        {
            id: `${quizId}-q10`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "‘क्ष’ का सही वर्ण-विच्छेद क्या है?",
            options: ["त् + र", "ज् + ञ", "क् + ष", "श् + र"],
            correctAnswer: 2,
            explanation: "क्ष संयुक्त व्यंजन है जिसका निर्माण क् + ष से माना जाता है।"
        },
        {
            id: `${quizId}-q11`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "‘त्र’ का सही वर्ण-विच्छेद क्या है?",
            options: ["त् + र", "क् + ष", "द् + र", "ज् + ञ"],
            correctAnswer: 0,
            explanation: "त्र संयुक्त व्यंजन त् + र से बनता है।"
        },
        {
            id: `${quizId}-q12`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "‘ज्ञ’ का मानक वर्ण-विच्छेद क्या है?",
            options: ["ग् + य", "ज् + ञ", "त् + र", "क् + ष"],
            correctAnswer: 1,
            explanation: "ज्ञ को परंपरागत रूप से ज् + ञ का संयुक्त रूप माना जाता है।"
        },
        {
            id: `${quizId}-q13`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "अनुस्वार का चिह्न कौन-सा है?",
            options: ["्", "ं", "ः", "ँ"],
            correctAnswer: 1,
            explanation: "अनुस्वार बिंदु ‘ं’ द्वारा व्यक्त किया जाता है।"
        },
        {
            id: `${quizId}-q14`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "अनुनासिक का चिह्न कौन-सा है?",
            options: ["ः", "ँ", "्", "ं"],
            correctAnswer: 1,
            explanation: "अनुनासिक ध्वनि के लिए चंद्रबिंदु ‘ँ’ का प्रयोग होता है।"
        },
        {
            id: `${quizId}-q15`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "विसर्ग का चिह्न कौन-सा है?",
            options: ["ः", "ं", "्", "ँ"],
            correctAnswer: 0,
            explanation: "विसर्ग ‘ः’ चिह्न से दर्शाया जाता है।"
        },
        {
            id: `${quizId}-q16`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "हलन्त/विराम चिह्न कौन-सा है?",
            options: ["ः", "ँ", "्", "ं"],
            correctAnswer: 2,
            explanation: "हलन्त ‘्’ व्यंजन के अंतर्निहित अ-स्वर को समाप्त करता है।"
        },
        {
            id: `${quizId}-q17`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "‘ऋ’ को किस प्रकार का स्वर माना जाता है?",
            options: ["अयोगवाह", "दीर्घ स्वर", "ह्रस्व स्वर", "प्लुत स्वर"],
            correctAnswer: 2,
            explanation: "ऋ को परंपरागत वर्ण-विभाजन में ह्रस्व स्वर माना जाता है।"
        },
        {
            id: `${quizId}-q18`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "‘ए’ किस प्रकार का स्वर है?",
            options: ["अयोगवाह", "प्लुत स्वर", "ह्रस्व स्वर", "दीर्घ स्वर"],
            correctAnswer: 3,
            explanation: "ए, ऐ, ओ, औ दीर्घ स्वर माने जाते हैं।"
        },
        {
            id: `${quizId}-q19`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "‘अ’ की मात्रा कौन-सी है?",
            options: ["ृ", "ा", "कोई मात्रा नहीं", "ि"],
            correctAnswer: 2,
            explanation: "अ स्वर की कोई अलग मात्रा नहीं होती।"
        },
        {
            id: `${quizId}-q20`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "‘औ’ की मात्रा कौन-सी है?",
            options: ["ो", "ौ", "े", "ै"],
            correctAnswer: 1,
            explanation: "औ स्वर की मात्रा ‘ौ’ है।"
        },
        {
            id: `${quizId}-q21`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "हिंदी में अयोगवाह कौन-से हैं?",
            options: ["अं और अः", "ए और ऐ", "अ और आ", "य और व"],
            correctAnswer: 0,
            explanation: "अनुस्वार और विसर्ग को अयोगवाह कहा जाता है।"
        },
        {
            id: `${quizId}-q22`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "स्पर्श व्यंजन कितने वर्गों में विभाजित होते हैं?",
            options: ["4", "5", "7", "6"],
            correctAnswer: 1,
            explanation: "स्पर्श व्यंजन क, च, ट, त और प—इन पाँच वर्गों में बाँटे जाते हैं।"
        },
        {
            id: `${quizId}-q23`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "‘घ’ किस वर्ग का व्यंजन है?",
            options: ["च-वर्ग", "त-वर्ग", "ट-वर्ग", "क-वर्ग"],
            correctAnswer: 3,
            explanation: "घ क-वर्ग का चौथा व्यंजन है।"
        },
        {
            id: `${quizId}-q24`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "‘झ’ किस वर्ग का व्यंजन है?",
            options: ["च-वर्ग", "ट-वर्ग", "क-वर्ग", "प-वर्ग"],
            correctAnswer: 0,
            explanation: "झ च-वर्ग का चौथा व्यंजन है।"
        },
        {
            id: `${quizId}-q25`,
            topic: "वर्णमाला",
            difficulty: "hard",
            question: "‘ध’ किस वर्ग का व्यंजन है?",
            options: ["प-वर्ग", "त-वर्ग", "च-वर्ग", "ट-वर्ग"],
            correctAnswer: 1,
            explanation: "ध त-वर्ग का चौथा व्यंजन है।"
        },
        {
            id: `${quizId}-q26`,
            topic: "संधि",
            difficulty: "hard",
            question: "देव + आलय का सही संधि रूप क्या है?",
            options: ["देवालय्य", "देवालय", "देवालाय", "दैवालय"],
            correctAnswer: 1,
            explanation: "अ + आ के मेल से आ होता है; इसलिए देव + आलय = देवालय।"
        },
        {
            id: `${quizId}-q27`,
            topic: "संधि",
            difficulty: "hard",
            question: "विद्या + आलय का सही संधि रूप है—",
            options: ["विद्योलय", "विद्यैलय", "विद्यालाय", "विद्यालय"],
            correctAnswer: 3,
            explanation: "आ + आ के मेल से आ रहता है; विद्या + आलय = विद्यालय।"
        },
        {
            id: `${quizId}-q28`,
            topic: "संधि",
            difficulty: "hard",
            question: "महा + ईश्वर का संधि रूप है—",
            options: ["महैश्वर", "महेश्वर", "महीश्वर", "महाश्वर"],
            correctAnswer: 1,
            explanation: "आ + ई के मेल से ए बनता है; महा + ईश्वर = महेश्वर।"
        },
        {
            id: `${quizId}-q29`,
            topic: "संधि",
            difficulty: "hard",
            question: "नर + ईश का संधि रूप है—",
            options: ["नरेश", "नरिश", "नरैश", "नारीश"],
            correctAnswer: 0,
            explanation: "अ + ई के मेल से ए बनता है; नर + ईश = नरेश।"
        },
        {
            id: `${quizId}-q30`,
            topic: "संधि",
            difficulty: "hard",
            question: "लोक + उपकार का संधि रूप क्या है?",
            options: ["लोकूपकार", "लोकापकार", "लोकोपकार", "लौकुपकार"],
            correctAnswer: 2,
            explanation: "अ + उ के मेल से ओ बनता है; लोक + उपकार = लोकोपकार।"
        },
        {
            id: `${quizId}-q31`,
            topic: "संधि",
            difficulty: "hard",
            question: "राजा + इंद्र का संधि रूप है—",
            options: ["राजेंद्र", "राजैंद्र", "राजेंद्रिय", "राजेइंद्र"],
            correctAnswer: 0,
            explanation: "आ + इ के मेल से ए बनता है; राजा + इंद्र = राजेंद्र।"
        },
        {
            id: `${quizId}-q32`,
            topic: "संधि",
            difficulty: "hard",
            question: "रवि + इंद्र का संधि रूप है—",
            options: ["रविन्द्र", "रवैंद्र", "रवींद्र", "रवेंद्र"],
            correctAnswer: 2,
            explanation: "इ + इ के मेल से ई बनता है; रवि + इंद्र = रवींद्र।"
        },
        {
            id: `${quizId}-q33`,
            topic: "संधि",
            difficulty: "hard",
            question: "सु + आगत का संधि रूप क्या है?",
            options: ["सावगत", "सौगत", "स्वागत", "सुआगत"],
            correctAnswer: 2,
            explanation: "उ + आ के मेल पर यण परिवर्तन से व् आता है; सु + आगत = स्वागत।"
        },
        {
            id: `${quizId}-q34`,
            topic: "संधि",
            difficulty: "hard",
            question: "गुरु + आदेश का संधि रूप है—",
            options: ["गुर्वादेश", "गुर्वेदेश", "गुरुवादेश", "गुरादेश"],
            correctAnswer: 0,
            explanation: "उ के बाद असमान स्वर आने पर यण संधि से व् आता है; गुरु + आदेश = गुर्वादेश।"
        },
        {
            id: `${quizId}-q35`,
            topic: "संधि",
            difficulty: "hard",
            question: "अति + उत्तम का सही संधि रूप है—",
            options: ["अतोत्तम", "अतिउत्तम", "अत्युत्तम", "अत्त्युतम"],
            correctAnswer: 2,
            explanation: "इ + उ के मेल पर यण संधि से य् आता है; अति + उत्तम = अत्युत्तम।"
        },
        {
            id: `${quizId}-q36`,
            topic: "संधि",
            difficulty: "hard",
            question: "प्रति + उत्तर का संधि रूप है—",
            options: ["प्रतिउत्तर", "प्रतोत्तर", "प्रत्युत्तर", "प्रत्यूत्तर"],
            correctAnswer: 2,
            explanation: "इ के बाद असमान स्वर आने पर यण संधि होती है; प्रति + उत्तर = प्रत्युत्तर।"
        },
        {
            id: `${quizId}-q37`,
            topic: "संधि",
            difficulty: "hard",
            question: "उत् + चारण का सही संधि रूप क्या है?",
            options: ["उद्चारण", "उत्चारण", "उच्चारण", "उचारण"],
            correctAnswer: 2,
            explanation: "त् + च के मेल से च्च बनता है; उत् + चारण = उच्चारण।"
        },
        {
            id: `${quizId}-q38`,
            topic: "संधि",
            difficulty: "hard",
            question: "सत् + जन का संधि रूप है—",
            options: ["सद्जन", "सजजन", "सतजन", "सज्जन"],
            correctAnswer: 3,
            explanation: "त् + ज के मेल से ज्ज रूप बनता है; सत् + जन = सज्जन।"
        },
        {
            id: `${quizId}-q39`,
            topic: "संधि",
            difficulty: "hard",
            question: "जगत् + नाथ का संधि रूप है—",
            options: ["जगद्नाथ", "जगनाथ", "जगन्नाथ", "जगतनाथ"],
            correctAnswer: 2,
            explanation: "त् + न के मेल से न्न बनता है; जगत् + नाथ = जगन्नाथ।"
        },
        {
            id: `${quizId}-q40`,
            topic: "संधि",
            difficulty: "hard",
            question: "निस् + चय का सही संधि रूप है—",
            options: ["निश्चय", "निचय", "निशय", "निस्चय"],
            correctAnswer: 0,
            explanation: "स् + च के मेल से श्च ध्वनि बनती है; निस् + चय = निश्चय।"
        },
        {
            id: `${quizId}-q41`,
            topic: "संधि",
            difficulty: "hard",
            question: "मनस् + ताप का सही रूप है—",
            options: ["मनसताप", "मनोताप", "मनःताप", "मनस्ताप"],
            correctAnswer: 3,
            explanation: "मनस् + ताप का मानक रूप मनस्ताप है।"
        },
        {
            id: `${quizId}-q42`,
            topic: "संधि",
            difficulty: "hard",
            question: "हरि + ओम का संधि रूप क्या है?",
            options: ["हरोम", "हरियम", "हर्योम", "हरिओम"],
            correctAnswer: 2,
            explanation: "इ के बाद असमान स्वर आने पर यण संधि से य् आता है; हरि + ओम = हर्योम।"
        },
        {
            id: `${quizId}-q43`,
            topic: "संधि",
            difficulty: "hard",
            question: "स्वर संधि किसके मेल से होती है?",
            options: ["दो व्यंजनों के मेल से", "समास पदों के मेल से", "स्वर और विसर्ग के मेल से", "दो स्वरों के मेल से"],
            correctAnswer: 3,
            explanation: "दो स्वरों के मिलने पर जो ध्वनि-परिवर्तन होता है, उसे स्वर संधि कहते हैं।"
        },
        {
            id: `${quizId}-q44`,
            topic: "संधि",
            difficulty: "hard",
            question: "व्यंजन संधि में परिवर्तन मुख्यतः किसमें होता है?",
            options: ["विराम चिह्न में", "वचन में", "स्वर में", "व्यंजन में"],
            correctAnswer: 3,
            explanation: "व्यंजन संधि में व्यंजनों के मेल से रूप/ध्वनि में परिवर्तन होता है।"
        },
        {
            id: `${quizId}-q45`,
            topic: "संधि",
            difficulty: "hard",
            question: "विसर्ग संधि का संबंध किस चिह्न से है?",
            options: ["ँ", "ं", "्", "ः"],
            correctAnswer: 3,
            explanation: "विसर्ग संधि में ‘ः’ के बाद आने वाले वर्ण के अनुसार परिवर्तन होता है।"
        },
        {
            id: `${quizId}-q46`,
            topic: "संधि",
            difficulty: "hard",
            question: "वृद्धि संधि में अ/आ + इ/ई का परिणाम क्या होता है?",
            options: ["औ", "ए", "ओ", "ऐ"],
            correctAnswer: 3,
            explanation: "वृद्धि संधि में अ/आ + इ/ई = ऐ होता है।"
        },
        {
            id: `${quizId}-q47`,
            topic: "संधि",
            difficulty: "hard",
            question: "वृद्धि संधि में अ/आ + उ/ऊ का परिणाम क्या होता है?",
            options: ["ऐ", "औ", "ए", "ओ"],
            correctAnswer: 1,
            explanation: "वृद्धि संधि में अ/आ + उ/ऊ = औ होता है।"
        },
        {
            id: `${quizId}-q48`,
            topic: "संधि",
            difficulty: "hard",
            question: "हिम + आलय का संधि रूप क्या है?",
            options: ["हिमालाय", "हिमालय", "हिमोलय", "हिमेलय"],
            correctAnswer: 1,
            explanation: "अ + आ के मेल से आ होता है; हिम + आलय = हिमालय।"
        },
        {
            id: `${quizId}-q49`,
            topic: "संधि",
            difficulty: "hard",
            question: "सूर्य + उदय का सही संधि रूप है—",
            options: ["सूर्यौदय", "सूर्योदय", "सूर्युदय", "सूर्यादय"],
            correctAnswer: 1,
            explanation: "सूर्य + उदय का प्रचलित और मानक संधि रूप सूर्योदय है।"
        },
        {
            id: `${quizId}-q50`,
            topic: "संधि",
            difficulty: "hard",
            question: "दुः + ख का सही रूप क्या है?",
            options: ["दुख्ख", "दूख", "दुखः", "दुःख"],
            correctAnswer: 3,
            explanation: "दुः + ख का मानक रूप दुःख है।"
        }
    ];

    window.GJU_QUIZ_BANK.push({
        id: quizId,
        subject: "Hindi",
        title: "Hindi Mixed Grammar GK Practice Set 1",
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