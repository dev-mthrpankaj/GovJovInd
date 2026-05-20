(function () {
    "use strict";

    window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];

    const quizId = "math-set-1";
    const seeds = [
            {
                    "topic": "प्रतिशत",
                    "difficulty": "easy",
                    "question": "240 का 25% कितना होगा?",
                    "options": [
                            "40",
                            "50",
                            "60",
                            "80"
                    ],
                    "correctAnswer": 2,
                    "explanation": "25% का अर्थ एक-चौथाई होता है। 240 का एक-चौथाई 60 है।"
            },
            {
                    "topic": "लाभ और हानि",
                    "difficulty": "medium",
                    "question": "एक वस्तु ₹800 में खरीदी गई और ₹920 में बेची गई। लाभ प्रतिशत ज्ञात कीजिए।",
                    "options": [
                            "12%",
                            "15%",
                            "18%",
                            "20%"
                    ],
                    "correctAnswer": 1,
                    "explanation": "लाभ = 920 - 800 = 120। लाभ प्रतिशत = 120/800 × 100 = 15%।"
            },
            {
                    "topic": "लघुत्तम समापवर्त्य",
                    "difficulty": "easy",
                    "question": "18 और 24 का लघुत्तम समापवर्त्य कितना है?",
                    "options": [
                            "48",
                            "54",
                            "72",
                            "96"
                    ],
                    "correctAnswer": 2,
                    "explanation": "18 = 2 × 3 × 3 और 24 = 2 × 2 × 2 × 3, अतः लघुत्तम समापवर्त्य 72 है।"
            },
            {
                    "topic": "काम और समय",
                    "difficulty": "medium",
                    "question": "A किसी काम को 12 दिन में और B 18 दिन में पूरा करता है। दोनों मिलकर काम कितने दिन में करेंगे?",
                    "options": [
                            "6.2 दिन",
                            "7.2 दिन",
                            "8 दिन",
                            "9 दिन"
                    ],
                    "correctAnswer": 1,
                    "explanation": "संयुक्त कार्य-दर = 1/12 + 1/18 = 5/36, इसलिए समय = 36/5 = 7.2 दिन।"
            },
            {
                    "topic": "प्रतिशत",
                    "difficulty": "easy",
                    "question": "किसी संख्या का 40% यदि 160 है, तो संख्या कितनी है?",
                    "options": [
                            "320",
                            "360",
                            "400",
                            "420"
                    ],
                    "correctAnswer": 2,
                    "explanation": "संख्या = 160 × 100 / 40 = 400।"
            },
            {
                    "topic": "साधारण ब्याज",
                    "difficulty": "medium",
                    "question": "₹5000 पर 8% वार्षिक दर से 2 वर्ष का साधारण ब्याज कितना होगा?",
                    "options": [
                            "600",
                            "700",
                            "800",
                            "900"
                    ],
                    "correctAnswer": 2,
                    "explanation": "साधारण ब्याज = PRT/100 = 5000 × 8 × 2 / 100 = 800।"
            },
            {
                    "topic": "अनुपात",
                    "difficulty": "easy",
                    "question": "24:36 का सरलतम रूप क्या है?",
                    "options": [
                            "2:3",
                            "3:4",
                            "4:5",
                            "5:6"
                    ],
                    "correctAnswer": 0,
                    "explanation": "दोनों पदों को 12 से भाग देने पर अनुपात 2:3 मिलता है।"
            },
            {
                    "topic": "औसत",
                    "difficulty": "medium",
                    "question": "12, 18, 20, 30 और 40 का औसत कितना है?",
                    "options": [
                            "22",
                            "24",
                            "26",
                            "28"
                    ],
                    "correctAnswer": 1,
                    "explanation": "योग = 120 और कुल 5 संख्याएँ हैं, इसलिए औसत = 120/5 = 24।"
            },
            {
                    "topic": "ज्यामिति",
                    "difficulty": "easy",
                    "question": "त्रिभुज के तीनों कोणों का योग कितना होता है?",
                    "options": [
                            "90 डिग्री",
                            "180 डिग्री",
                            "270 डिग्री",
                            "360 डिग्री"
                    ],
                    "correctAnswer": 1,
                    "explanation": "किसी भी त्रिभुज के तीनों कोणों का योग 180 डिग्री होता है।"
            },
            {
                    "topic": "क्षेत्रफल",
                    "difficulty": "medium",
                    "question": "15 मीटर लंबाई और 8 मीटर चौड़ाई वाले आयत का क्षेत्रफल कितना होगा?",
                    "options": [
                            "96 वर्ग मीटर",
                            "110 वर्ग मीटर",
                            "120 वर्ग मीटर",
                            "128 वर्ग मीटर"
                    ],
                    "correctAnswer": 2,
                    "explanation": "क्षेत्रफल = लंबाई × चौड़ाई = 15 × 8 = 120 वर्ग मीटर।"
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
        title: "Mathematics Practice Set 1",
        description: "50 हिंदी अंकगणित और गणित अभ्यास प्रश्न।",
        durationMinutes: 30,
        totalQuestions: 50,
        marksPerQuestion: 1,
        negativeMarks: 0.25,
        difficulty: "Mixed",
        tags: ["SSC","Railway","Police","Mathematics"],
        questions: buildQuestions()
    });
}());
