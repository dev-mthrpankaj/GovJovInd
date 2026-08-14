(function () {
    "use strict";

    const subject = "General Awareness";
    const quizId = "general-awareness-bilingual-latex-set-1";
    const text = (hi, en) => ({ hi, en });
    const option = (hi, en) => ({ text: text(hi, en) });
    const q = (number, topic, questionHi, questionEn, options, correctAnswer, explanationHi, explanationEn) => ({
        id: `${quizId}-q${String(number).padStart(2, "0")}`,
        subject,
        topic,
        difficulty: "Moderate",
        question: questionEn,
        questionTextMap: text(questionHi, questionEn),
        options,
        correctAnswer,
        explanation: explanationEn,
        explanationTextMap: text(explanationHi, explanationEn),
        marks: 1,
        negativeMarks: 0.25
    });

    const questions = [
        q(1, "Indian Polity", "[b]भारतीय संविधान[/b] की प्रस्तावना में \"समाजवादी\" और \"पंथनिरपेक्ष\" शब्द किस संशोधन द्वारा जोड़े गए?", "[b]Indian Constitution:[/b] The words \"Socialist\" and \"Secular\" were added to the Preamble by which amendment?", [
            option("\\(42^{वां}\\) संशोधन", "\\(42^{nd}\\) Amendment"),
            option("\\(44^{वां}\\) संशोधन", "\\(44^{th}\\) Amendment"),
            option("\\(52^{वां}\\) संशोधन", "\\(52^{nd}\\) Amendment"),
            option("\\(61^{वां}\\) संशोधन", "\\(61^{st}\\) Amendment")
        ], 0, "\"समाजवादी\" और \"पंथनिरपेक्ष\" शब्द \\(42^{वें}\\) संविधान संशोधन अधिनियम, 1976 द्वारा जोड़े गए।", "The words \"Socialist\" and \"Secular\" were added by the \\(42^{nd}\\) Constitutional Amendment Act, 1976."),
        q(2, "Indian History", "[b]भारतीय राष्ट्रीय कांग्रेस[/b] की स्थापना किस वर्ष हुई?", "[b]Indian National Congress[/b] was founded in which year?", [
            option("\\(1857\\)", "\\(1857\\)"),
            option("\\(1885\\)", "\\(1885\\)"),
            option("\\(1905\\)", "\\(1905\\)"),
            option("\\(1919\\)", "\\(1919\\)")
        ], 1, "भारतीय राष्ट्रीय कांग्रेस की स्थापना \\(1885\\) में हुई थी।", "The Indian National Congress was founded in \\(1885\\)."),
        q(3, "Geography", "[b]भारत की सबसे लंबी नदी[/b], जो पूर्ण रूप से भारत में बहती है, कौन-सी है?", "[b]Which is the longest river[/b] that flows entirely within India?", [
            option("गंगा", "Ganga"),
            option("गोदावरी", "Godavari"),
            option("नर्मदा", "Narmada"),
            option("कृष्णा", "Krishna")
        ], 1, "गोदावरी भारत में पूर्ण रूप से बहने वाली सबसे लंबी नदी है; इसे दक्षिण गंगा भी कहा जाता है।", "Godavari is the longest river flowing entirely within India; it is also called the Dakshin Ganga."),
        q(4, "Economy", "[b]मुद्रास्फीति[/b] का सामान्य अर्थ क्या है?", "What is the usual meaning of [b]inflation[/b]?", [
            option("कीमतों के सामान्य स्तर में वृद्धि", "Rise in the general price level"),
            option("कीमतों के सामान्य स्तर में कमी", "Fall in the general price level"),
            option("करों में कमी", "Decrease in taxes"),
            option("राष्ट्रीय आय का शून्य होना", "National income becoming zero")
        ], 0, "मुद्रास्फीति का अर्थ वस्तुओं और सेवाओं के सामान्य मूल्य स्तर में लगातार वृद्धि है।", "Inflation means a sustained rise in the general price level of goods and services."),
        q(5, "Indian Polity", "[b]मौलिक अधिकार[/b] भारतीय संविधान के किस भाग में दिए गए हैं?", "[b]Fundamental Rights[/b] are given in which Part of the Indian Constitution?", [
            option("भाग I", "Part I"),
            option("भाग II", "Part II"),
            option("भाग III", "Part III"),
            option("भाग IV", "Part IV")
        ], 2, "मौलिक अधिकार संविधान के भाग III में दिए गए हैं।", "Fundamental Rights are given in Part III of the Constitution."),
        q(6, "History", "[b]दांडी मार्च[/b] किस आंदोलन से संबंधित था?", "[b]Dandi March[/b] was associated with which movement?", [
            option("असहयोग आंदोलन", "Non-Cooperation Movement"),
            option("सविनय अवज्ञा आंदोलन", "Civil Disobedience Movement"),
            option("भारत छोड़ो आंदोलन", "Quit India Movement"),
            option("स्वदेशी आंदोलन", "Swadeshi Movement")
        ], 1, "दांडी मार्च \\(1930\\) में सविनय अवज्ञा आंदोलन की शुरुआत से जुड़ा था।", "The Dandi March in \\(1930\\) was associated with the start of the Civil Disobedience Movement."),
        q(7, "Geography", "[b]कर्क रेखा[/b] भारत के कितने राज्यों से होकर गुजरती है?", "[b]Tropic of Cancer[/b] passes through how many Indian states?", [
            option("\\(6\\)", "\\(6\\)"),
            option("\\(7\\)", "\\(7\\)"),
            option("\\(8\\)", "\\(8\\)"),
            option("\\(9\\)", "\\(9\\)")
        ], 2, "कर्क रेखा भारत के \\(8\\) राज्यों से होकर गुजरती है।", "The Tropic of Cancer passes through \\(8\\) Indian states."),
        q(8, "Static GK", "[b]अजंता की गुफाएँ[/b] किस राज्य में स्थित हैं?", "[b]Ajanta Caves[/b] are located in which state?", [
            option("महाराष्ट्र", "Maharashtra"),
            option("मध्य प्रदेश", "Madhya Pradesh"),
            option("राजस्थान", "Rajasthan"),
            option("गुजरात", "Gujarat")
        ], 0, "अजंता की गुफाएँ महाराष्ट्र में स्थित हैं।", "Ajanta Caves are located in Maharashtra."),
        q(9, "Indian Polity", "[b]राज्यसभा[/b] के पदेन सभापति कौन होते हैं?", "Who is the ex-officio Chairman of the [b]Rajya Sabha[/b]?", [
            option("राष्ट्रपति", "President"),
            option("उपराष्ट्रपति", "Vice-President"),
            option("प्रधानमंत्री", "Prime Minister"),
            option("लोकसभा अध्यक्ष", "Speaker of Lok Sabha")
        ], 1, "भारत के उपराष्ट्रपति राज्यसभा के पदेन सभापति होते हैं।", "The Vice-President of India is the ex-officio Chairman of the Rajya Sabha."),
        q(10, "Art and Culture", "[b]भरतनाट्यम[/b] किस राज्य की प्रमुख शास्त्रीय नृत्य शैली है?", "[b]Bharatanatyam[/b] is a major classical dance form of which state?", [
            option("तमिलनाडु", "Tamil Nadu"),
            option("केरल", "Kerala"),
            option("ओडिशा", "Odisha"),
            option("मणिपुर", "Manipur")
        ], 0, "भरतनाट्यम तमिलनाडु की प्रमुख शास्त्रीय नृत्य शैली है।", "Bharatanatyam is a major classical dance form of Tamil Nadu.")
    ];

    window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];
    window.GJU_QUIZ_BANK.push({
        id: quizId,
        subject,
        title: "General Awareness Bilingual LaTeX Set 1",
        description: "Hindi-English bilingual General Awareness quiz with rich-text and MathJax-safe formatting.",
        durationMinutes: 10,
        totalQuestions: questions.length,
        marksPerQuestion: 1,
        negativeMarks: 0.25,
        difficulty: "Moderate",
        tags: ["General Awareness", "Bilingual", "Static GK", "Police", "SSC"],
        questions
    });
}());
