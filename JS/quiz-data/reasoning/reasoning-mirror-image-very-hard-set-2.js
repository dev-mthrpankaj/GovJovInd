(function () {
    "use strict";

    window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];

    const quizId = "reasoning-mirror-image-very-hard-set-2";

    const mirrorMap = {
        A: "A", H: "H", I: "I", M: "M", O: "O", T: "T", U: "U", V: "V", W: "W", X: "X", Y: "Y", Z: "Z",
        N: "И", R: "Я", L: "⅃", S: "Ƨ", C: "Ɔ", E: "Ǝ", F: "ᖷ", D: "ᗡ", B: "ᗺ",
        0: "0", 1: "1", 2: "Ƨ", 3: "Ɛ", 5: "ϛ", 6: "9", 8: "8", 9: "6",
        "+": "+", "-": "-", ":": ":", "=": "="
    };

    const sourceStrings = [
        "I2I9I", "N8R-26", "SCO9E1", "BLADE5", "FIR6-20", "CROWN9", "RUSH-31", "MANO2", "DICE+80", "STAR-65",
        "NOVA13", "RIVER8", "CLOUD5", "BASIC0", "FENCE9", "MORAL2", "SILENT6", "RATIO8", "BLOCK3", "DREAM1",
        "SWORD5", "CABLE9", "RIDER0", "MUSIC2", "DANCE6", "ROBOT8", "NIHT3", "SOLID5", "FROZEN9", "BROWN2",
        "CRANE6", "FABLE8", "MATRIX1", "LINE-30", "SCORE5", "BRAIN9", "CROSS2", "NERVE8", "STONE3", "RANE6",
        "FLOUR5", "BRAVE0", "SCOPE9", "DRIVE2", "FORCE8", "TRAIL6", "CIVIC3", "BLEND5", "RACER9", "DUSTY2"
    ];

    function mirrorText(text) {
        return text.split("").reverse().map((char) => mirrorMap[char]).join("");
    }

    function rotateOptions(options, correctText, index) {
        const correctPosition = (index + 1) % 4;
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
        title: "Reasoning Mirror Image Very Hard Practice Set 2",
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
