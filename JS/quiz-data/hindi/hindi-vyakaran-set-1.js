(function () {
    "use strict";

    window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];

    const quizId = "hindi-vyakaran-set-1";
    const seeds = [
            {
                    "topic": "संज्ञा",
                    "difficulty": "easy",
                    "question": "\"राम\" किस प्रकार की संज्ञा है?",
                    "options": [
                            "जातिवाचक संज्ञा",
                            "व्यक्तिवाचक संज्ञा",
                            "भाववाचक संज्ञा",
                            "द्रव्यवाचक संज्ञा"
                    ],
                    "correctAnswer": 1,
                    "explanation": "राम किसी विशेष व्यक्ति का नाम है, इसलिए यह व्यक्तिवाचक संज्ञा है।"
            },
            {
                    "topic": "क्रिया",
                    "difficulty": "easy",
                    "question": "\"मैं विद्यालय जाता हूँ\" वाक्य में क्रिया पद कौन-सा है?",
                    "options": [
                            "मैं",
                            "विद्यालय",
                            "जाता हूँ",
                            "हूँ"
                    ],
                    "correctAnswer": 2,
                    "explanation": "\"जाता हूँ\" कार्य होने का बोध कराता है, इसलिए यह क्रिया पद है।"
            },
            {
                    "topic": "संधि",
                    "difficulty": "hard",
                    "question": "\"महेश\" शब्द में कौन-सी संधि है?",
                    "options": [
                            "गुण संधि",
                            "वृद्धि संधि",
                            "यण संधि",
                            "अयादि संधि"
                    ],
                    "correctAnswer": 0,
                    "explanation": "महा + ईश के मेल से महेश बनता है; अ/आ और इ/ई के मेल से ए होने पर गुण संधि होती है।"
            },
            {
                    "topic": "समास",
                    "difficulty": "medium",
                    "question": "\"राजपुत्र\" में कौन-सा समास है?",
                    "options": [
                            "द्वंद्व",
                            "तत्पुरुष",
                            "बहुव्रीहि",
                            "अव्ययीभाव"
                    ],
                    "correctAnswer": 1,
                    "explanation": "राजा का पुत्र अर्थ में पहला पद दूसरे पद पर निर्भर है, इसलिए यह तत्पुरुष समास है।"
            },
            {
                    "topic": "कारक",
                    "difficulty": "medium",
                    "question": "जो शब्द संज्ञा या सर्वनाम का संबंध वाक्य के अन्य शब्दों से बताता है, उसे क्या कहते हैं?",
                    "options": [
                            "विभक्ति",
                            "कर्ता",
                            "कर्म",
                            "करण"
                    ],
                    "correctAnswer": 0,
                    "explanation": "विभक्ति चिह्न संज्ञा या सर्वनाम का संबंध वाक्य के अन्य शब्दों से बताते हैं।"
            },
            {
                    "topic": "वचन",
                    "difficulty": "medium",
                    "question": "बहुवचन वाला शब्द चुनिए।",
                    "options": [
                            "पुस्तक",
                            "बालकगण",
                            "लड़का",
                            "घर"
                    ],
                    "correctAnswer": 1,
                    "explanation": "\"बालकगण\" एक से अधिक बालकों का बोध कराता है, इसलिए यह बहुवचन है।"
            },
            {
                    "topic": "लिंग",
                    "difficulty": "easy",
                    "question": "\"लड़का\" का स्त्रीलिंग रूप क्या है?",
                    "options": [
                            "लड़की",
                            "लड़के",
                            "लड़कपन",
                            "लड़कियाँ"
                    ],
                    "correctAnswer": 0,
                    "explanation": "\"लड़का\" का स्त्रीलिंग रूप \"लड़की\" है।"
            },
            {
                    "topic": "उपसर्ग",
                    "difficulty": "easy",
                    "question": "\"प्रहार\" में उपसर्ग क्या है?",
                    "options": [
                            "प्र",
                            "हार",
                            "आ",
                            "र"
                    ],
                    "correctAnswer": 0,
                    "explanation": "प्रहार में \"प्र\" उपसर्ग के रूप में प्रयुक्त है।"
            },
            {
                    "topic": "रस",
                    "difficulty": "easy",
                    "question": "करुण रस का स्थायी भाव क्या है?",
                    "options": [
                            "हास",
                            "शोक",
                            "क्रोध",
                            "भय"
                    ],
                    "correctAnswer": 1,
                    "explanation": "करुण रस का स्थायी भाव शोक होता है।"
            },
            {
                    "topic": "प्रत्यय",
                    "difficulty": "medium",
                    "question": "\"मिलनसार\" शब्द में प्रत्यय कौन-सा है?",
                    "options": [
                            "सार",
                            "मिल",
                            "न",
                            "मिलन"
                    ],
                    "correctAnswer": 0,
                    "explanation": "मिलन शब्द में \"सार\" प्रत्यय जुड़कर मिलनसार शब्द बनता है।"
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
        title: "Hindi Vyakaran Practice Set 1",
        description: "50 हिंदी व्याकरण प्रश्न, सरकारी परीक्षा तैयारी के लिए।",
        durationMinutes: 30,
        totalQuestions: 50,
        marksPerQuestion: 1,
        negativeMarks: 0.25,
        difficulty: "Mixed",
        tags: ["SSC","Railway","Police","Hindi","Vyakaran"],
        questions: buildQuestions()
    });
}());
