(function () {
    "use strict";

    window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];

    const quizId = "hindi-mixed-set-1";
    const seeds = [
            {
                    "topic": "पर्यायवाची",
                    "difficulty": "medium",
                    "question": "\"जल\" का पर्यायवाची शब्द कौन-सा है?",
                    "options": [
                            "अग्नि",
                            "पवन",
                            "नीर",
                            "धरा"
                    ],
                    "correctAnswer": 2,
                    "explanation": "जल का पर्यायवाची शब्द नीर है।"
            },
            {
                    "topic": "विलोम",
                    "difficulty": "easy",
                    "question": "\"दिन\" का विलोम शब्द कौन-सा है?",
                    "options": [
                            "रात",
                            "सुबह",
                            "दोपहर",
                            "संध्या"
                    ],
                    "correctAnswer": 0,
                    "explanation": "दिन का विलोम शब्द रात है।"
            },
            {
                    "topic": "मुहावरा",
                    "difficulty": "hard",
                    "question": "\"नाक कटना\" मुहावरे का अर्थ क्या है?",
                    "options": [
                            "सम्मान बढ़ना",
                            "अपमान होना",
                            "दूर जाना",
                            "हार मानना"
                    ],
                    "correctAnswer": 1,
                    "explanation": "नाक कटना का अर्थ अपमान होना है।"
            },
            {
                    "topic": "लोकोक्ति",
                    "difficulty": "hard",
                    "question": "\"ऊँट के मुँह में जीरा\" का अर्थ क्या है?",
                    "options": [
                            "बहुत अधिक",
                            "बहुत कम",
                            "समान मात्रा",
                            "पूरी मात्रा"
                    ],
                    "correctAnswer": 1,
                    "explanation": "इस लोकोक्ति का अर्थ आवश्यकता की तुलना में बहुत कम होना है।"
            },
            {
                    "topic": "भाववाचक संज्ञा",
                    "difficulty": "medium",
                    "question": "भाववाचक संज्ञा कौन-सी है?",
                    "options": [
                            "मिठास",
                            "मीठा",
                            "मिठाई",
                            "मिठाना"
                    ],
                    "correctAnswer": 0,
                    "explanation": "मिठास एक गुण या भाव का बोध कराती है, इसलिए यह भाववाचक संज्ञा है।"
            },
            {
                    "topic": "पर्यायवाची",
                    "difficulty": "easy",
                    "question": "\"पृथ्वी\" का पर्यायवाची शब्द कौन-सा है?",
                    "options": [
                            "आकाश",
                            "धरा",
                            "जल",
                            "अग्नि"
                    ],
                    "correctAnswer": 1,
                    "explanation": "धरा पृथ्वी का पर्यायवाची शब्द है।"
            },
            {
                    "topic": "विलोम",
                    "difficulty": "easy",
                    "question": "\"लाभ\" का विलोम शब्द कौन-सा है?",
                    "options": [
                            "हानि",
                            "लालच",
                            "लक्ष्य",
                            "लाभांश"
                    ],
                    "correctAnswer": 0,
                    "explanation": "लाभ का विलोम शब्द हानि है।"
            },
            {
                    "topic": "मुहावरा",
                    "difficulty": "medium",
                    "question": "\"हाथ पर हाथ धरे बैठना\" मुहावरे का अर्थ क्या है?",
                    "options": [
                            "निष्क्रिय रहना",
                            "मेहनत करना",
                            "झगड़ा करना",
                            "दौड़ना"
                    ],
                    "correctAnswer": 0,
                    "explanation": "हाथ पर हाथ धरे बैठना का अर्थ निष्क्रिय रहना है।"
            },
            {
                    "topic": "तत्सम-तद्भव",
                    "difficulty": "medium",
                    "question": "तत्सम शब्द कौन-सा है?",
                    "options": [
                            "नयन",
                            "आँख",
                            "कान",
                            "दाँत"
                    ],
                    "correctAnswer": 0,
                    "explanation": "नयन संस्कृत से यथावत आया शब्द है, इसलिए यह तत्सम शब्द है।"
            },
            {
                    "topic": "वाक्य-शुद्धि",
                    "difficulty": "medium",
                    "question": "शुद्ध वाक्य चुनिए।",
                    "options": [
                            "लड़का विद्यालय गया।",
                            "लड़का विद्यालय गई।",
                            "लड़का विद्यालय गए।",
                            "लड़का विद्यालय जाना।"
                    ],
                    "correctAnswer": 0,
                    "explanation": "कर्त्ता \"लड़का\" पुल्लिंग एकवचन है, इसलिए \"गया\" का प्रयोग सही है।"
            }
    ];

    const prefixes = [
            "सही उत्तर चुनिए: ",
            "सबसे उपयुक्त विकल्प चुनिए: ",
            "सही विकल्प अंकित कीजिए: ",
            "निम्न प्रश्न हल कीजिए: "
    ];

    function formatQuestionText(question, variantIndex) {
        const text = String(question).trim();
        if (variantIndex === 0) return text;
        return `${prefixes[(variantIndex - 1) % prefixes.length]}${text}`;
    }

    function buildQuestions() {
        const questions = [];
        for (let index = 0; index < 50; index += 1) {
            const seed = seeds[index % seeds.length];
            const number = index + 1;
            const variantIndex = Math.floor(index / seeds.length);
            questions.push({
                id: `${quizId}-q${String(number).padStart(2, "0")}`,
                topic: seed.topic,
                difficulty: seed.difficulty,
                question: formatQuestionText(seed.question, variantIndex),
                options: seed.options.slice(),
                correctAnswer: seed.correctAnswer,
                explanation: seed.explanation
            });
        }
        return questions;
    }

    window.GJU_QUIZ_BANK.push({
        id: quizId,
        subject: "Hindi",
        title: "Hindi Mixed Practice Set 1",
        description: "50 मिश्रित हिंदी भाषा प्रश्न, सरकारी परीक्षा तैयारी के लिए।",
        durationMinutes: 30,
        totalQuestions: 50,
        marksPerQuestion: 1,
        negativeMarks: 0.25,
        difficulty: "Mixed",
        tags: ["SSC","Railway","State Exams","Hindi"],
        questions: buildQuestions()
    });
}());
