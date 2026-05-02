(function () {
    "use strict";

    window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];

    const quizId = "computer-set-2";
    const seeds = [
        { topic: "Hardware", difficulty: "easy", question: "A monitor is an ____.", options: ["input device", "output device", "storage device", "network device"], correctAnswer: 1, explanation: "A monitor displays output." },
        { topic: "Memory", difficulty: "medium", question: "ROM stands for ____.", options: ["Read Only Memory", "Random Output Memory", "Run Only Mode", "Read Open Module"], correctAnswer: 0, explanation: "ROM means Read Only Memory." },
        { topic: "Internet", difficulty: "easy", question: "A URL is used to identify a ____.", options: ["web address", "printer speed", "file size", "keyboard layout"], correctAnswer: 0, explanation: "A URL identifies a web resource address." },
        { topic: "Security", difficulty: "medium", question: "Antivirus software helps protect against ____.", options: ["malware", "rain", "dust", "power cuts"], correctAnswer: 0, explanation: "Antivirus helps detect and remove malware." },
        { topic: "MS Office", difficulty: "medium", question: "Excel is mainly used for ____.", options: ["presentations", "spreadsheets", "image editing", "email only"], correctAnswer: 1, explanation: "Excel is spreadsheet software." },
        { topic: "Networking", difficulty: "medium", question: "Wi-Fi is a ____.", options: ["wireless network technology", "printer type", "CPU brand", "file format"], correctAnswer: 0, explanation: "Wi-Fi provides wireless networking." },
        { topic: "Storage", difficulty: "easy", question: "which is a storage device?", options: ["Mouse", "Hard disk", "Monitor", "Scanner"], correctAnswer: 1, explanation: "Hard disk stores data." },
        { topic: "Basics", difficulty: "medium", question: "One byte equals ____.", options: ["4 bits", "8 bits", "16 bits", "32 bits"], correctAnswer: 1, explanation: "One byte contains 8 bits." },
        { topic: "Shortcut", difficulty: "easy", question: "Ctrl+C is commonly used for ____.", options: ["copy", "paste", "cut", "save"], correctAnswer: 0, explanation: "Ctrl+C copies selected content." },
        { topic: "Database", difficulty: "medium", question: "DBMS is used to manage ____.", options: ["databases", "monitors", "keyboards", "speakers"], correctAnswer: 0, explanation: "DBMS stands for Database Management System." }
    ];

    function formatQuestionText(question, variantIndex) {
        const text = String(question).trim();
        if (variantIndex === 0) return text;

        const variant = (variantIndex - 1) % 4;
        const instructionPatterns = [
            { pattern: /^Choose\b/i, verbs: ["Select", "Pick", "Mark", "Identify"] },
            { pattern: /^Select\b/i, verbs: ["Choose", "Pick", "Mark", "Identify"] },
            { pattern: /^Identify\b/i, verbs: ["Find", "Select", "Choose", "Mark"] },
            { pattern: /^Find\b/i, verbs: ["Determine", "Select", "Choose", "Mark"] },
            { pattern: /^Fill in the blank\b/i, verbs: ["Complete the sentence", "Choose the option that completes the sentence", "Select the option that fits the blank", "Mark the option that fits the blank"] }
        ];
        const matchedInstruction = instructionPatterns.find((item) => item.pattern.test(text));

        if (matchedInstruction) {
            return text.replace(matchedInstruction.pattern, matchedInstruction.verbs[variant]);
        }

        const prefixes = [
            "Select the correct answer: ",
            "Choose the most appropriate option: ",
            "Mark the correct response: ",
            "Answer the following: "
        ];

        return `${prefixes[variant]}${text}`;
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


