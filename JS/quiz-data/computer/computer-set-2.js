(function () {
    "use strict";

    window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];

    const quizId = "computer-set-2";
    const seeds = [
        { topic: "Hardware", difficulty: "easy", question: "In {label}, monitor is an", options: ["input device", "output device", "storage device", "network device"], correctAnswer: 1, explanation: "A monitor displays output." },
        { topic: "Memory", difficulty: "medium", question: "In {label}, ROM stands for", options: ["Read Only Memory", "Random Output Memory", "Run Only Mode", "Read Open Module"], correctAnswer: 0, explanation: "ROM means Read Only Memory." },
        { topic: "Internet", difficulty: "easy", question: "In {label}, URL is used to identify", options: ["web address", "printer speed", "file size", "keyboard layout"], correctAnswer: 0, explanation: "A URL identifies a web resource address." },
        { topic: "Security", difficulty: "medium", question: "In {label}, antivirus software helps protect against", options: ["malware", "rain", "dust", "power cuts"], correctAnswer: 0, explanation: "Antivirus helps detect and remove malware." },
        { topic: "MS Office", difficulty: "medium", question: "In {label}, Excel is mainly used for", options: ["presentations", "spreadsheets", "image editing", "email only"], correctAnswer: 1, explanation: "Excel is spreadsheet software." },
        { topic: "Networking", difficulty: "medium", question: "In {label}, Wi-Fi is a", options: ["wireless network technology", "printer type", "CPU brand", "file format"], correctAnswer: 0, explanation: "Wi-Fi provides wireless networking." },
        { topic: "Storage", difficulty: "easy", question: "In {label}, which is a storage device?", options: ["Mouse", "Hard disk", "Monitor", "Scanner"], correctAnswer: 1, explanation: "Hard disk stores data." },
        { topic: "Basics", difficulty: "medium", question: "In {label}, one byte equals", options: ["4 bits", "8 bits", "16 bits", "32 bits"], correctAnswer: 1, explanation: "One byte contains 8 bits." },
        { topic: "Shortcut", difficulty: "easy", question: "In {label}, Ctrl+C is commonly used for", options: ["copy", "paste", "cut", "save"], correctAnswer: 0, explanation: "Ctrl+C copies selected content." },
        { topic: "Database", difficulty: "medium", question: "In {label}, DBMS is used to manage", options: ["databases", "monitors", "keyboards", "speakers"], correctAnswer: 0, explanation: "DBMS stands for Database Management System." }
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
        title: "Computer Awareness Practice Set 2",
        description: "50 networking, security, office tools and memory questions.",
        durationMinutes: 30,
        totalQuestions: 50,
        marksPerQuestion: 1,
        negativeMarks: 0.25,
        difficulty: "Moderate",
        tags: ["SSC", "Railway", "Police"],
        questions: buildQuestions()
    });
}());


