(function () {
    "use strict";

    window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];

    const quizId = "reasoning-water-image-very-hard-set-1";

    const waterMap = {
        A: "∀", B: "𐐒", C: "Ɔ", D: "ᗡ", E: "Ǝ", F: "Ⅎ", G: "⅁", H: "H", I: "I", J: "ſ", K: "⋊", L: "⅂", M: "W",
        N: "N", O: "O", P: "Ԁ", Q: "Ό", R: "ᴚ", S: "S", T: "⊥", U: "∩", V: "Λ", W: "M", X: "X", Y: "⅄", Z: "Z",
        0: "0", 1: "1", 2: "Ƨ", 3: "Ɛ", 4: "ᔭ", 5: "ϛ", 6: "9", 7: "ㄥ", 8: "8", 9: "6",
        "+": "+", "-": "-", ":": ":", "=": "="
    };

    const sourceStrings = [
        "U6T9W0", "GA06V9", "MATH-29", "POLICE8", "CROWN6", "STAGE9", "RIVER2", "NORTH5", "BOX-40", "FAME13",
        "DUSTY6", "BRAVE9", "SCORE2", "RATIO8", "CLIMB5", "TRACK6", "FIELD9", "RUN-08", "JUMP12", "FORCE5",
        "CADET6", "TRAIN9", "POWER2", "MEDAL8", "SHIFT5", "UNITY6", "VITAL9", "LOGIC2", "SMART8", "GUARD5",
        "CIVIL6", "POINT9", "FINAL2", "BRAIN8", "SKILL5", "QUEST6", "WORLD9", "PRIDE2", "ROUTE8", "LEVEL5",
        "CRACK6", "VALUE9", "SPEED2", "MATCH8", "ORDER5", "DREAM6", "STATE9", "EXAM2", "RANK8", "LEARN5"
    ];

    function waterText(text) {
        return text.split("").map((char) => waterMap[char] || char).join("");
    }

    function rotateOptions(options, correctText, index) {
        const correctPosition = (index + 2) % 4;
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
        const correctText = waterText(text);
        const sameText = text;
        const reversedOnly = text.split("").reverse().join("");
        const mirrorStyle = text.split("").reverse().map((char) => waterMap[char] || char).join("");
        const shiftedWrong = waterText(text.slice(1) + text[0]);
        const { options, correctAnswer } = rotateOptions([correctText, sameText, reversedOnly, mirrorStyle, shiftedWrong], correctText, index);
        const questionNo = String(index + 1).padStart(2, "0");

        return {
            id: `${quizId}-q${questionNo}`,
            topic: "Water Image",
            difficulty: "very-hard",
            question: `जल-प्रतिबिंब को नीचे की ओर मानते हुए '${text}' का सही water image चुनिए।`,
            options,
            correctAnswer,
            explanation: `Water image में series का left-to-right order वही रहता है, केवल हर character ऊपर-नीचे उल्टा दिखाई देता है। '${text}' पर vertical flip लगाने से सही water image '${correctText}' प्राप्त होता है।`
        };
    }

    const questions = sourceStrings.map(createQuestion);

    window.GJU_QUIZ_BANK.push({
        id: quizId,
        subject: "Reasoning",
        title: "Reasoning Water Image Very Hard Practice Set 1",
        description: "50 verified very hard Water Image reasoning MCQs for SSC, Police, UPSI, Railway and other competitive exams with close options and professional explanations.",
        durationMinutes: 40,
        totalQuestions: questions.length,
        marksPerQuestion: 1,
        negativeMarks: 0.25,
        difficulty: "Very Hard",
        tags: ["SSC", "UPSI", "Police", "Railway", "Reasoning", "Water Image"],
        questions
    });
}());
