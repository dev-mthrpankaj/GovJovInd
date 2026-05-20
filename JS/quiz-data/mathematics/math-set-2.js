(function () {
    "use strict";

    window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];

    const quizId = "math-set-2";
    const seeds = [
            {
                    "topic": "महत्तम समापवर्तक",
                    "difficulty": "easy",
                    "question": "36 और 60 का महत्तम समापवर्तक कितना है?",
                    "options": [
                            "6",
                            "9",
                            "12",
                            "18"
                    ],
                    "correctAnswer": 2,
                    "explanation": "36 और 60 का सबसे बड़ा समान गुणनखंड 12 है।"
            },
            {
                    "topic": "प्रतिशत",
                    "difficulty": "medium",
                    "question": "एक मान 500 से बढ़कर 650 हो गया। प्रतिशत वृद्धि कितनी है?",
                    "options": [
                            "20%",
                            "25%",
                            "30%",
                            "35%"
                    ],
                    "correctAnswer": 2,
                    "explanation": "वृद्धि = 150। प्रतिशत वृद्धि = 150/500 × 100 = 30%।"
            },
            {
                    "topic": "औसत",
                    "difficulty": "easy",
                    "question": "पहली पाँच सम संख्याओं का औसत कितना है?",
                    "options": [
                            "4",
                            "5",
                            "6",
                            "8"
                    ],
                    "correctAnswer": 2,
                    "explanation": "2 + 4 + 6 + 8 + 10 = 30 और 30/5 = 6।"
            },
            {
                    "topic": "चाल और दूरी",
                    "difficulty": "medium",
                    "question": "एक वाहन 3 घंटे में 180 किमी चलता है। उसकी चाल ज्ञात कीजिए।",
                    "options": [
                            "45 किमी/घंटा",
                            "50 किमी/घंटा",
                            "60 किमी/घंटा",
                            "75 किमी/घंटा"
                    ],
                    "correctAnswer": 2,
                    "explanation": "चाल = दूरी/समय = 180/3 = 60 किमी/घंटा।"
            },
            {
                    "topic": "सरलीकरण",
                    "difficulty": "easy",
                    "question": "18 + 6 × 4 - 8 का मान कितना है?",
                    "options": [
                            "26",
                            "34",
                            "40",
                            "88"
                    ],
                    "correctAnswer": 1,
                    "explanation": "BODMAS के अनुसार 6 × 4 = 24, अतः 18 + 24 - 8 = 34।"
            },
            {
                    "topic": "अनुपात",
                    "difficulty": "medium",
                    "question": "यदि A:B = 3:5 और कुल योग 64 है, तो A का मान कितना है?",
                    "options": [
                            "20",
                            "24",
                            "30",
                            "40"
                    ],
                    "correctAnswer": 1,
                    "explanation": "A का मान = 3/(3+5) × 64 = 24।"
            },
            {
                    "topic": "परिमाप",
                    "difficulty": "medium",
                    "question": "9 सेमी भुजा वाले वर्ग का परिमाप कितना है?",
                    "options": [
                            "18 सेमी",
                            "27 सेमी",
                            "36 सेमी",
                            "81 सेमी"
                    ],
                    "correctAnswer": 2,
                    "explanation": "वर्ग का परिमाप = 4 × भुजा = 36 सेमी।"
            },
            {
                    "topic": "साधारण ब्याज",
                    "difficulty": "medium",
                    "question": "₹4000 मूलधन पर 3 वर्ष में ₹600 साधारण ब्याज मिलता है। दर ज्ञात कीजिए।",
                    "options": [
                            "4%",
                            "5%",
                            "6%",
                            "8%"
                    ],
                    "correctAnswer": 1,
                    "explanation": "दर = SI × 100 / (P × T) = 600 × 100 / (4000 × 3) = 5%।"
            },
            {
                    "topic": "समीकरण",
                    "difficulty": "easy",
                    "question": "यदि x + 7 = 19 है, तो x का मान क्या है?",
                    "options": [
                            "10",
                            "11",
                            "12",
                            "13"
                    ],
                    "correctAnswer": 2,
                    "explanation": "दोनों पक्षों से 7 घटाने पर x = 12 मिलता है।"
            },
            {
                    "topic": "छूट और मूल्य",
                    "difficulty": "medium",
                    "question": "विक्रय मूल्य ₹720 है और छूट 10% है। अंकित मूल्य ज्ञात कीजिए।",
                    "options": [
                            "780",
                            "800",
                            "820",
                            "900"
                    ],
                    "correctAnswer": 1,
                    "explanation": "विक्रय मूल्य अंकित मूल्य का 90% है, इसलिए अंकित मूल्य = 720/0.9 = 800।"
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
        subject: "Mathematics",
        title: "Mathematics Practice Set 2",
        description: "50 हिंदी गणित अभ्यास प्रश्न, गणना और अनुप्रयोग के लिए।",
        durationMinutes: 30,
        totalQuestions: 50,
        marksPerQuestion: 1,
        negativeMarks: 0.25,
        difficulty: "Moderate",
        tags: ["SSC","Railway","Banking","Mathematics"],
        questions: buildQuestions()
    });
}());
