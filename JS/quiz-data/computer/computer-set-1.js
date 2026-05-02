(function () {
    "use strict";

    window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];

    const quizId = "computer-set-1";
    const seeds = [
        { topic: "Basics", difficulty: "easy", question: "CPU stands for ____.", options: ["Central Process Unit", "Central Processing Unit", "Computer Primary Unit", "Control Processing Unit"], correctAnswer: 1, explanation: "CPU means Central Processing Unit." },
        { topic: "Hardware", difficulty: "easy", question: "which of these is an input device?", options: ["Monitor", "Printer", "Keyboard", "Speaker"], correctAnswer: 2, explanation: "Keyboard is used to input data." },
        { topic: "Software", difficulty: "medium", question: "Windows is a type of ____.", options: ["application software", "operating system", "programming language", "database"], correctAnswer: 1, explanation: "Windows is an operating system." },
        { topic: "Internet", difficulty: "medium", question: "WWW stands for ____.", options: ["World Wide Web", "World Web Wide", "Web World Wide", "Wide World Web"], correctAnswer: 0, explanation: "WWW means World Wide Web." },
        { topic: "MS Office", difficulty: "hard", question: "What is the modern PowerPoint file extension?", options: [".docx", ".xlsx", ".pptx", ".txt"], correctAnswer: 2, explanation: "PowerPoint presentations use .pptx." },
        { topic: "Networking", difficulty: "hard", question: "LAN stands for ____.", options: ["Large Area Network", "Local Area Network", "Live Area Network", "Linked Area Network"], correctAnswer: 1, explanation: "LAN means Local Area Network." },
        { topic: "Security", difficulty: "medium", question: "A strong password should include ____.", options: ["only numbers", "only name", "mixed characters", "only lowercase"], correctAnswer: 2, explanation: "Strong passwords use a mix of characters." },
        { topic: "Memory", difficulty: "easy", question: "RAM is generally ____.", options: ["permanent memory", "temporary memory", "optical memory", "printed memory"], correctAnswer: 1, explanation: "RAM is volatile temporary memory." },
        { topic: "Internet", difficulty: "medium", question: "Which protocol is used to receive email?", options: ["SMTP", "POP3 or IMAP", "HTTP", "FTP"], correctAnswer: 1, explanation: "POP3 and IMAP are used for receiving emails." },
        { topic: "Basics", difficulty: "hard", question: "What is the binary form of decimal 5?", options: ["101", "110", "111", "100"], correctAnswer: 0, explanation: "Decimal 5 is 101 in binary." }
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


