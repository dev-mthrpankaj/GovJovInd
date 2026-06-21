(function () {
    "use strict";

    window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];

    const quizId = "reasoning-mirror-image-very-hard-set-1";

    const mirrorMap = {
        A: "A", H: "H", I: "I", M: "M", O: "O", T: "T", U: "U", V: "V", W: "W", X: "X", Y: "Y", Z: "Z",
        N: "И", R: "Я", L: "⅃", S: "Ƨ", C: "Ɔ", E: "Ǝ", F: "ᖷ", D: "ᗡ", B: "ᗺ",
        0: "0", 1: "1", 2: "Ƨ", 3: "Ɛ", 5: "ϛ", 6: "9", 8: "8", 9: "6",
        "+": "+", "-": "-", ":": ":", "=": "="
    };

    const sourceStrings = [
        "R2N8Y9", "B8A1", "U6Y0R", "H2LU6", "XU889", "0A2F", "O2O-16", "Z9Z+02", "X8X:11", "AW3-C2",
        "6XL+5Z", "M3R-18", "C0DE-19", "B5N=08", "SIR-360", "LION-28", "FAME+61", "DUST-90", "BRONZ8", "NEXUS1",
        "RACE-06", "MATH+39", "BOX-51", "CROWN2", "FROST8", "SAND-69", "BOND+30", "MIND-15", "RUSH=29", "CLUB-08",
        "STONE6", "RIN-52", "BRAIN8", "SMILE3", "FIND+90", "NORTH1", "RIDER6", "CABLE5", "LUNAR3", "SCORE9",
        "BRIS2", "DREAM8", "FENCE0", "SOLAR5", "CROSS6", "NERVE1", "RATIO3", "BASIC9", "FRAME2", "DRONE8"
    ];

    function mirrorText(text) {
        return text.split("").reverse().map((char) => mirrorMap[char]).join("");
    }

    function rotateOptions(options, correctText, index) {
        const correctPosition = index % 4;
        const uniqueOptions = [];
        options.forEach((option) => {
            if (!uniqueOptions.includes(option)) uniqueOptions.push(option);
        });
        while (uniqueOptions.length < 4) {
            uniqueOptions.push(`${correctText}${uniqueOptions.length}`);
        }
        const wrongOptions = uniqueOptions.filter((option) => option !== correctText).slice(0, 3);
        const finalOptions = wrongOptions.slice();
        finalOptions.splice(correctPosition, 0, correctText);
        return { options: finalOptions, correctAnswer: correctPosition };
    }

    function createQuestion(text, index) {
        const correctText = mirrorText(text);
        const reversedOnly = text.split("").reverse().join("");
        const mirroredOnly = text.split("").map((char) => mirrorMap[char]).join("");
        const firstWrong = mirrorText(text.slice(1) + text[0]);
        const secondWrong = mirrorText(text.split("").reverse().join(""));
        const { options, correctAnswer } = rotateOptions([correctText, reversedOnly, mirroredOnly, firstWrong, secondWrong], correctText, index);
        const questionNo = String(index + 1).padStart(2, "0");

        return {
            id: `${quizId}-q${questionNo}`,
            topic: "Mirror Image",
            difficulty: "very-hard",
            question: `दर्पण को बाईं ओर मानते हुए '${text}' का सही mirror image चुनिए।`,
            options,
            correctAnswer,
            explanation: `बाईं ओर दर्पण होने पर series का order reverse होता है और हर character अपने vertical mirror रूप में बदलता है। '${text}' को reverse करके और mirror conversion लगाने पर सही mirror image '${correctText}' प्राप्त होता है।`
        };
    }

    const questions = sourceStrings.map(createQuestion);

    window.GJU_QUIZ_BANK.push({
        id: quizId,
        subject: "Reasoning",
        title: "Reasoning Mirror Image Very Hard Practice Set 1",
        description: "50 verified very hard Mirror Image reasoning MCQs for SSC, Police, UPSI, Railway and other competitive exams with close options and professional explanations.",
        durationMinutes: 40,
        totalQuestions: questions.length,
        marksPerQuestion: 1,
        negativeMarks: 0.25,
        difficulty: "Very Hard",
        tags: ["SSC", "UPSI", "Police", "Railway", "Reasoning", "Mirror Image"],
        questions
    });
}());
