(function () {
    "use strict";

    window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];

    const quizId = "reasoning-water-image-very-hard-set-2";

    const waterMap = {
        A: "∀", B: "𐐒", C: "Ɔ", D: "ᗡ", E: "Ǝ", F: "Ⅎ", G: "⅁", H: "H", I: "I", J: "ſ", K: "⋊", L: "⅂", M: "W",
        N: "N", O: "O", P: "Ԁ", Q: "Ό", R: "ᴚ", S: "S", T: "⊥", U: "∩", V: "Λ", W: "M", X: "X", Y: "⅄", Z: "Z",
        0: "0", 1: "1", 2: "Ƨ", 3: "Ɛ", 4: "ᔭ", 5: "ϛ", 6: "9", 7: "ㄥ", 8: "8", 9: "6",
        "+": "+", "-": "-", ":": ":", "=": "="
    };

    const sourceStrings = [
        "95GL3M", "U2V-15", "TARGET6", "POLITY9", "NUMBER2", "REASON5", "MARKS06", "ANSWER9", "SELECT2", "OPTION5",
        "PENCIL6", "SCHOOL9", "GROUND2", "HEALTH5", "ACTIVE6", "POLICE9", "HEIGHT2", "CHEST5", "RACE06", "TRACK9",
        "SPRINT2", "JUMPS5", "MEDAL6", "RESULT9", "ONLINE2", "ADMIT5", "NOTICE6", "VACANCY9", "FORM02", "FEES5",
        "MERIT6", "CUTOF9", "SHEET2", "FINAL5", "STUDY6", "CLASS9", "COURSE2", "GKGS05", "MATHS6", "HINDI9",
        "LOGIC2", "VERBAL5", "NONVB6", "SERIES9", "CODING2", "PUZZLE5", "FIGURE6", "RANK09", "EXAMS2", "WINNER5"
    ];

    function waterText(text) {
        return text.split("").map((char) => waterMap[char] || char).join("");
    }

    function rotateOptions(options, correctText, index) {
        const correctPosition = (index + 3) % 4;
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
        title: "Reasoning Water Image Very Hard Practice Set 2",
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
