(function () {
    "use strict";

    window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];

    const quizId = "reasoning-calendar-very-hard-set-1";

    const questions = [
        {
            id: `${quizId}-q01`,
            topic: "Calendar",
            difficulty: "very-hard",
            question: "15-08-1947 को कौन-सा दिन था/होगा?",
            options: ["Saturday", "Sunday", "Thursday", "Friday"],
            correctAnswer: 3,
            explanation: "Calendar method में complete years, leap years और महीने/दिन के odd days जोड़े जाते हैं। वास्तविक गणना के अनुसार 15-08-1947 का दिन Friday (शुक्रवार) है।"
        },
        {
            id: `${quizId}-q02`,
            topic: "Calendar",
            difficulty: "very-hard",
            question: "26-01-1950 को कौन-सा दिन था/होगा?",
            options: ["Thursday", "Saturday", "Wednesday", "Friday"],
            correctAnswer: 0,
            explanation: "Calendar method में complete years, leap years और महीने/दिन के odd days जोड़े जाते हैं। वास्तविक गणना के अनुसार 26-01-1950 का दिन Thursday (गुरुवार) है।"
        },
        {
            id: `${quizId}-q03`,
            topic: "Calendar",
            difficulty: "very-hard",
            question: "06-09-1965 को कौन-सा दिन था/होगा?",
            options: ["Tuesday", "Wednesday", "Monday", "Sunday"],
            correctAnswer: 2,
            explanation: "Calendar method में complete years, leap years और महीने/दिन के odd days जोड़े जाते हैं। वास्तविक गणना के अनुसार 06-09-1965 का दिन Monday (सोमवार) है।"
        },
        {
            id: `${quizId}-q04`,
            topic: "Calendar",
            difficulty: "very-hard",
            question: "16-12-1971 को कौन-सा दिन था/होगा?",
            options: ["Saturday", "Thursday", "Friday", "Wednesday"],
            correctAnswer: 1,
            explanation: "Calendar method में complete years, leap years और महीने/दिन के odd days जोड़े जाते हैं। वास्तविक गणना के अनुसार 16-12-1971 का दिन Thursday (गुरुवार) है।"
        },
        {
            id: `${quizId}-q05`,
            topic: "Calendar",
            difficulty: "very-hard",
            question: "31-10-1984 को कौन-सा दिन था/होगा?",
            options: ["Tuesday", "Friday", "Wednesday", "Thursday"],
            correctAnswer: 2,
            explanation: "Calendar method में complete years, leap years और महीने/दिन के odd days जोड़े जाते हैं। वास्तविक गणना के अनुसार 31-10-1984 का दिन Wednesday (बुधवार) है।"
        },
        {
            id: `${quizId}-q06`,
            topic: "Calendar",
            difficulty: "very-hard",
            question: "24-07-1991 को कौन-सा दिन था/होगा?",
            options: ["Thursday", "Tuesday", "Wednesday", "Friday"],
            correctAnswer: 2,
            explanation: "Calendar method में complete years, leap years और महीने/दिन के odd days जोड़े जाते हैं। वास्तविक गणना के अनुसार 24-07-1991 का दिन Wednesday (बुधवार) है।"
        },
        {
            id: `${quizId}-q07`,
            topic: "Calendar",
            difficulty: "very-hard",
            question: "26-07-1999 को कौन-सा दिन था/होगा?",
            options: ["Sunday", "Tuesday", "Wednesday", "Monday"],
            correctAnswer: 3,
            explanation: "Calendar method में complete years, leap years और महीने/दिन के odd days जोड़े जाते हैं। वास्तविक गणना के अनुसार 26-07-1999 का दिन Monday (सोमवार) है।"
        },
        {
            id: `${quizId}-q08`,
            topic: "Calendar",
            difficulty: "very-hard",
            question: "01-01-2001 को कौन-सा दिन था/होगा?",
            options: ["Wednesday", "Sunday", "Tuesday", "Monday"],
            correctAnswer: 3,
            explanation: "Calendar method में complete years, leap years और महीने/दिन के odd days जोड़े जाते हैं। वास्तविक गणना के अनुसार 01-01-2001 का दिन Monday (सोमवार) है।"
        },
        {
            id: `${quizId}-q09`,
            topic: "Calendar",
            difficulty: "very-hard",
            question: "29-02-2004 को कौन-सा दिन था/होगा?",
            options: ["Tuesday", "Saturday", "Monday", "Sunday"],
            correctAnswer: 3,
            explanation: "Calendar method में complete years, leap years और महीने/दिन के odd days जोड़े जाते हैं। वास्तविक गणना के अनुसार 29-02-2004 का दिन Sunday (रविवार) है।"
        },
        {
            id: `${quizId}-q10`,
            topic: "Calendar",
            difficulty: "very-hard",
            question: "15-08-2008 को कौन-सा दिन था/होगा?",
            options: ["Sunday", "Friday", "Thursday", "Saturday"],
            correctAnswer: 1,
            explanation: "Calendar method में complete years, leap years और महीने/दिन के odd days जोड़े जाते हैं। वास्तविक गणना के अनुसार 15-08-2008 का दिन Friday (शुक्रवार) है।"
        },
        {
            id: `${quizId}-q11`,
            topic: "Calendar",
            difficulty: "very-hard",
            question: "26-01-2010 को कौन-सा दिन था/होगा?",
            options: ["Wednesday", "Tuesday", "Monday", "Thursday"],
            correctAnswer: 1,
            explanation: "Calendar method में complete years, leap years और महीने/दिन के odd days जोड़े जाते हैं। वास्तविक गणना के अनुसार 26-01-2010 का दिन Tuesday (मंगलवार) है।"
        },
        {
            id: `${quizId}-q12`,
            topic: "Calendar",
            difficulty: "very-hard",
            question: "12-12-2012 को कौन-सा दिन था/होगा?",
            options: ["Thursday", "Wednesday", "Tuesday", "Friday"],
            correctAnswer: 1,
            explanation: "Calendar method में complete years, leap years और महीने/दिन के odd days जोड़े जाते हैं। वास्तविक गणना के अनुसार 12-12-2012 का दिन Wednesday (बुधवार) है।"
        },
        {
            id: `${quizId}-q13`,
            topic: "Calendar",
            difficulty: "very-hard",
            question: "26-05-2014 को कौन-सा दिन था/होगा?",
            options: ["Sunday", "Tuesday", "Monday", "Wednesday"],
            correctAnswer: 2,
            explanation: "Calendar method में complete years, leap years और महीने/दिन के odd days जोड़े जाते हैं। वास्तविक गणना के अनुसार 26-05-2014 का दिन Monday (सोमवार) है।"
        },
        {
            id: `${quizId}-q14`,
            topic: "Calendar",
            difficulty: "very-hard",
            question: "29-02-2016 को कौन-सा दिन था/होगा?",
            options: ["Tuesday", "Sunday", "Wednesday", "Monday"],
            correctAnswer: 3,
            explanation: "Calendar method में complete years, leap years और महीने/दिन के odd days जोड़े जाते हैं। वास्तविक गणना के अनुसार 29-02-2016 का दिन Monday (सोमवार) है।"
        },
        {
            id: `${quizId}-q15`,
            topic: "Calendar",
            difficulty: "very-hard",
            question: "05-08-2019 को कौन-सा दिन था/होगा?",
            options: ["Tuesday", "Sunday", "Monday", "Wednesday"],
            correctAnswer: 2,
            explanation: "Calendar method में complete years, leap years और महीने/दिन के odd days जोड़े जाते हैं। वास्तविक गणना के अनुसार 05-08-2019 का दिन Monday (सोमवार) है।"
        },
        {
            id: `${quizId}-q16`,
            topic: "Calendar",
            difficulty: "very-hard",
            question: "22-03-2020 को कौन-सा दिन था/होगा?",
            options: ["Tuesday", "Monday", "Saturday", "Sunday"],
            correctAnswer: 3,
            explanation: "Calendar method में complete years, leap years और महीने/दिन के odd days जोड़े जाते हैं। वास्तविक गणना के अनुसार 22-03-2020 का दिन Sunday (रविवार) है।"
        },
        {
            id: `${quizId}-q17`,
            topic: "Calendar",
            difficulty: "very-hard",
            question: "01-01-2021 को कौन-सा दिन था/होगा?",
            options: ["Saturday", "Friday", "Thursday", "Sunday"],
            correctAnswer: 1,
            explanation: "Calendar method में complete years, leap years और महीने/दिन के odd days जोड़े जाते हैं। वास्तविक गणना के अनुसार 01-01-2021 का दिन Friday (शुक्रवार) है।"
        },
        {
            id: `${quizId}-q18`,
            topic: "Calendar",
            difficulty: "very-hard",
            question: "15-08-2022 को कौन-सा दिन था/होगा?",
            options: ["Wednesday", "Sunday", "Tuesday", "Monday"],
            correctAnswer: 3,
            explanation: "Calendar method में complete years, leap years और महीने/दिन के odd days जोड़े जाते हैं। वास्तविक गणना के अनुसार 15-08-2022 का दिन Monday (सोमवार) है।"
        },
        {
            id: `${quizId}-q19`,
            topic: "Calendar",
            difficulty: "very-hard",
            question: "17-09-2023 को कौन-सा दिन था/होगा?",
            options: ["Tuesday", "Monday", "Saturday", "Sunday"],
            correctAnswer: 3,
            explanation: "Calendar method में complete years, leap years और महीने/दिन के odd days जोड़े जाते हैं। वास्तविक गणना के अनुसार 17-09-2023 का दिन Sunday (रविवार) है।"
        },
        {
            id: `${quizId}-q20`,
            topic: "Calendar",
            difficulty: "very-hard",
            question: "29-02-2024 को कौन-सा दिन था/होगा?",
            options: ["Saturday", "Thursday", "Wednesday", "Friday"],
            correctAnswer: 1,
            explanation: "Calendar method में complete years, leap years और महीने/दिन के odd days जोड़े जाते हैं। वास्तविक गणना के अनुसार 29-02-2024 का दिन Thursday (गुरुवार) है।"
        },
        {
            id: `${quizId}-q21`,
            topic: "Calendar",
            difficulty: "very-hard",
            question: "26-01-2025 को कौन-सा दिन था/होगा?",
            options: ["Saturday", "Tuesday", "Sunday", "Monday"],
            correctAnswer: 2,
            explanation: "Calendar method में complete years, leap years और महीने/दिन के odd days जोड़े जाते हैं। वास्तविक गणना के अनुसार 26-01-2025 का दिन Sunday (रविवार) है।"
        },
        {
            id: `${quizId}-q22`,
            topic: "Calendar",
            difficulty: "very-hard",
            question: "15-05-2026 को कौन-सा दिन था/होगा?",
            options: ["Saturday", "Sunday", "Thursday", "Friday"],
            correctAnswer: 3,
            explanation: "Calendar method में complete years, leap years और महीने/दिन के odd days जोड़े जाते हैं। वास्तविक गणना के अनुसार 15-05-2026 का दिन Friday (शुक्रवार) है।"
        },
        {
            id: `${quizId}-q23`,
            topic: "Calendar",
            difficulty: "very-hard",
            question: "31-12-2027 को कौन-सा दिन था/होगा?",
            options: ["Friday", "Sunday", "Thursday", "Saturday"],
            correctAnswer: 0,
            explanation: "Calendar method में complete years, leap years और महीने/दिन के odd days जोड़े जाते हैं। वास्तविक गणना के अनुसार 31-12-2027 का दिन Friday (शुक्रवार) है।"
        },
        {
            id: `${quizId}-q24`,
            topic: "Calendar",
            difficulty: "very-hard",
            question: "29-02-2028 को कौन-सा दिन था/होगा?",
            options: ["Thursday", "Monday", "Wednesday", "Tuesday"],
            correctAnswer: 3,
            explanation: "Calendar method में complete years, leap years और महीने/दिन के odd days जोड़े जाते हैं। वास्तविक गणना के अनुसार 29-02-2028 का दिन Tuesday (मंगलवार) है।"
        },
        {
            id: `${quizId}-q25`,
            topic: "Calendar",
            difficulty: "very-hard",
            question: "15-08-2030 को कौन-सा दिन था/होगा?",
            options: ["Wednesday", "Saturday", "Friday", "Thursday"],
            correctAnswer: 3,
            explanation: "Calendar method में complete years, leap years और महीने/दिन के odd days जोड़े जाते हैं। वास्तविक गणना के अनुसार 15-08-2030 का दिन Thursday (गुरुवार) है।"
        }
    ];

    window.GJU_QUIZ_BANK.push({
        id: quizId,
        subject: "Reasoning",
        title: "Reasoning Calendar Very Hard Practice Set 1",
        description: "25 verified very hard Calendar reasoning MCQs for SSC, Police, UPSI, Railway and other competitive exams with close options and professional explanations.",
        durationMinutes: 15,
        totalQuestions: questions.length,
        marksPerQuestion: 1,
        negativeMarks: 0.25,
        difficulty: "Very Hard",
        tags: ["SSC", "UPSI", "Police", "Railway", "Reasoning", "Calendar"],
        questions
    });
}());
