(function () {
    "use strict";

    window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];

    const quizId = "computer-set-1";
    const seeds = [
        { topic: "Basics", difficulty: "easy", question: "In {label}, CPU stands for", options: ["Central Process Unit", "Central Processing Unit", "Computer Primary Unit", "Control Processing Unit"], correctAnswer: 1, explanation: "CPU means Central Processing Unit." },
        { topic: "Hardware", difficulty: "easy", question: "In {label}, which of these is an input device?", options: ["Monitor", "Printer", "Keyboard", "Speaker"], correctAnswer: 2, explanation: "Keyboard is used to input data." },
        { topic: "Software", difficulty: "medium", question: "In {label}, Windows is a type of", options: ["application software", "operating system", "programming language", "database"], correctAnswer: 1, explanation: "Windows is an operating system." },
        { topic: "Internet", difficulty: "medium", question: "In {label}, WWW stands for", options: ["World Wide Web", "World Web Wide", "Web World Wide", "Wide World Web"], correctAnswer: 0, explanation: "WWW means World Wide Web." },
        { topic: "MS Office", difficulty: "hard", question: "In {label}, modern PowerPoint file extension is", options: [".docx", ".xlsx", ".pptx", ".txt"], correctAnswer: 2, explanation: "PowerPoint presentations use .pptx." },
        { topic: "Networking", difficulty: "hard", question: "In {label}, LAN stands for", options: ["Large Area Network", "Local Area Network", "Live Area Network", "Linked Area Network"], correctAnswer: 1, explanation: "LAN means Local Area Network." },
        { topic: "Security", difficulty: "medium", question: "In {label}, a strong password should include", options: ["only numbers", "only name", "mixed characters", "only lowercase"], correctAnswer: 2, explanation: "Strong passwords use a mix of characters." },
        { topic: "Memory", difficulty: "easy", question: "In {label}, RAM is generally", options: ["permanent memory", "temporary memory", "optical memory", "printed memory"], correctAnswer: 1, explanation: "RAM is volatile temporary memory." },
        { topic: "Internet", difficulty: "medium", question: "In {label}, protocol used to receive email is", options: ["SMTP", "POP3 or IMAP", "HTTP", "FTP"], correctAnswer: 1, explanation: "POP3 and IMAP are used for receiving emails." },
        { topic: "Basics", difficulty: "hard", question: "In {label}, binary form of decimal 5 is", options: ["101", "110", "111", "100"], correctAnswer: 0, explanation: "Decimal 5 is 101 in binary." }
    ];

    function buildQuestions() {
        const questions = [];
        for (let index = 0; index < 50; index += 1) {
            const seed = seeds[index % seeds.length];
            const round = Math.floor(index / seeds.length) + 1;
            const number = index + 1;
            const label = `${quizId} Q${number} Round ${round}`;
            questions.push({
                id: `${quizId}-q${String(number).padStart(2, "0")}`,
                topic: seed.topic,
                difficulty: seed.difficulty,
                question: seed.question.replace("{label}", label),
                options: seed.options.slice(),
                correctAnswer: seed.correctAnswer,
                explanation: seed.explanation
            });
        }
        return questions;
    }

    window.GJU_QUIZ_BANK.push({
        id: quizId,
        subject: "Computer",
        title: "Computer Basics Practice Set 1",
        description: "50 computer basics, hardware, software and internet questions.",
        durationMinutes: 30,
        totalQuestions: 50,
        marksPerQuestion: 1,
        negativeMarks: 0.25,
        difficulty: "Mixed",
        tags: ["SSC", "Railway", "Banking"],
        questions: buildQuestions()
    });
}());


