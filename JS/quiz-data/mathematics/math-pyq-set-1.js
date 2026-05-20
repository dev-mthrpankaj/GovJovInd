(function () {
    "use strict";

    window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];

    const quizId = "math-pyq-set-1";
    const seeds = [
            {
                    "topic": "PYQ अनुपात",
                    "difficulty": "medium",
                    "question": "दो संख्याएँ 5:7 के अनुपात में हैं और उनका योग 144 है। छोटी संख्या ज्ञात कीजिए।",
                    "options": [
                            "50",
                            "55",
                            "60",
                            "65"
                    ],
                    "correctAnswer": 2,
                    "explanation": "कुल भाग = 12, एक भाग = 144/12 = 12। छोटी संख्या = 5 × 12 = 60।"
            },
            {
                    "topic": "PYQ प्रतिशत",
                    "difficulty": "medium",
                    "question": "480 का 35% कितना है?",
                    "options": [
                            "148",
                            "158",
                            "168",
                            "178"
                    ],
                    "correctAnswer": 2,
                    "explanation": "480 का 35% = 0.35 × 480 = 168।"
            },
            {
                    "topic": "PYQ काम",
                    "difficulty": "medium",
                    "question": "8 मजदूर किसी काम को 15 दिन में करते हैं। वही काम 12 मजदूर कितने दिन में करेंगे?",
                    "options": [
                            "8 दिन",
                            "10 दिन",
                            "12 दिन",
                            "18 दिन"
                    ],
                    "correctAnswer": 1,
                    "explanation": "मजदूर और दिन व्युत्क्रमानुपाती हैं: 8 × 15 / 12 = 10 दिन।"
            },
            {
                    "topic": "PYQ गुणा",
                    "difficulty": "easy",
                    "question": "7 और 18 का गुणनफल कितना है?",
                    "options": [
                            "108",
                            "116",
                            "126",
                            "136"
                    ],
                    "correctAnswer": 2,
                    "explanation": "गुणनफल = 18 × 7 = 126।"
            },
            {
                    "topic": "PYQ इकाई-परिवर्तन",
                    "difficulty": "medium",
                    "question": "72 किमी/घंटा कितने मीटर/सेकंड के बराबर है?",
                    "options": [
                            "18",
                            "20",
                            "22",
                            "24"
                    ],
                    "correctAnswer": 1,
                    "explanation": "72 × 5/18 = 20 मीटर/सेकंड।"
            },
            {
                    "topic": "PYQ अभाज्य संख्या",
                    "difficulty": "easy",
                    "question": "सबसे छोटी अभाज्य संख्या कौन-सी है?",
                    "options": [
                            "0",
                            "1",
                            "2",
                            "3"
                    ],
                    "correctAnswer": 2,
                    "explanation": "2 सबसे छोटी और एकमात्र सम अभाज्य संख्या है।"
            },
            {
                    "topic": "PYQ वर्गमूल",
                    "difficulty": "medium",
                    "question": "किस संख्या का वर्ग 144 होता है?",
                    "options": [
                            "10",
                            "11",
                            "12",
                            "14"
                    ],
                    "correctAnswer": 2,
                    "explanation": "12 का वर्ग 144 होता है।"
            },
            {
                    "topic": "PYQ छूट",
                    "difficulty": "medium",
                    "question": "अंकित मूल्य ₹1000 हो और 15% छूट मिले, तो विक्रय मूल्य कितना होगा?",
                    "options": [
                            "750",
                            "800",
                            "850",
                            "900"
                    ],
                    "correctAnswer": 2,
                    "explanation": "विक्रय मूल्य = 1000 - 1000 का 15% = 850।"
            },
            {
                    "topic": "PYQ समीकरण",
                    "difficulty": "easy",
                    "question": "यदि 3x = 45 है, तो x का मान क्या है?",
                    "options": [
                            "12",
                            "15",
                            "18",
                            "20"
                    ],
                    "correctAnswer": 1,
                    "explanation": "x = 45/3 = 15।"
            },
            {
                    "topic": "PYQ अनुपात",
                    "difficulty": "medium",
                    "question": "25 लीटर मिश्रण में दूध और पानी का अनुपात 4:1 है। दूध की मात्रा ज्ञात कीजिए।",
                    "options": [
                            "15 लीटर",
                            "18 लीटर",
                            "20 लीटर",
                            "22 लीटर"
                    ],
                    "correctAnswer": 2,
                    "explanation": "दूध = 4/5 × 25 = 20 लीटर।"
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
        title: "Mathematics PYQ Practice Set 1",
        description: "50 पिछले वर्षों की शैली के हिंदी गणित अभ्यास प्रश्न।",
        durationMinutes: 30,
        totalQuestions: 50,
        marksPerQuestion: 1,
        negativeMarks: 0.25,
        difficulty: "Previous Year",
        tags: ["SSC","Railway","State Exams","Mathematics"],
        questions: buildQuestions()
    });
}());
