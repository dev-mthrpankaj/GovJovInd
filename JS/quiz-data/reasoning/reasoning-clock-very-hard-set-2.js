(function () {
    "use strict";

    window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];

    const quizId = "reasoning-clock-very-hard-set-2";

    const verifiedTimes = [
        [1, 12], [2, 27], [3, 39], [4, 6], [5, 43], [6, 18], [7, 56], [8, 9], [9, 52], [10, 34],
        [11, 15], [12, 48], [1, 24], [2, 51], [3, 7], [4, 36], [5, 2], [6, 57], [7, 13], [8, 45],
        [9, 28], [10, 3], [11, 41], [12, 19], [1, 55], [2, 16], [3, 58], [4, 22], [5, 37], [6, 5],
        [7, 49], [8, 31], [9, 10], [10, 46], [11, 27], [12, 54], [1, 7], [2, 44], [3, 21], [4, 53],
        [5, 14], [6, 39], [7, 26], [8, 58], [9, 33], [10, 12], [11, 50], [12, 35], [3, 30], [9, 0]
    ];

    function formatDegree(value) {
        return Number.isInteger(value) ? `${value}°` : `${value.toFixed(1)}°`;
    }

    function clockAngles(hour, minute) {
        const hourForFormula = hour % 12;
        const hourAngle = (30 * hourForFormula) + (0.5 * minute);
        const minuteAngle = 6 * minute;
        const rawDifference = Math.abs(hourAngle - minuteAngle);
        const smallerAngle = rawDifference > 180 ? 360 - rawDifference : rawDifference;
        return { hourForFormula, hourAngle, minuteAngle, rawDifference, smallerAngle };
    }

    function makeOptions(answer, index) {
        const rawValues = [
            answer,
            Math.abs(answer - 5.5),
            Math.min(180, answer + 5.5),
            Math.abs(answer - 11),
            Math.min(180, answer + 11),
            Math.abs(180 - answer),
            (answer + 30) % 180,
            Math.abs(answer - 22)
        ];
        const values = [];
        rawValues.forEach((value) => {
            const label = formatDegree(value);
            if (!values.some((item) => formatDegree(item) === label)) {
                values.push(value);
            }
        });
        const options = values.slice(1, 4).map(formatDegree);
        const correctAnswer = index % 4;
        options.splice(correctAnswer, 0, formatDegree(answer));
        return { options, correctAnswer };
    }

    const questions = verifiedTimes.map(([hour, minute], index) => {
        const questionNo = String(index + 1).padStart(2, "0");
        const displayMinute = String(minute).padStart(2, "0");
        const { hourForFormula, hourAngle, minuteAngle, rawDifference, smallerAngle } = clockAngles(hour, minute);
        const { options, correctAnswer } = makeOptions(smallerAngle, index);
        const explanation = rawDifference > 180
            ? `घंटे की सुई का कोण 30×${hourForFormula} + 0.5×${minute} = ${formatDegree(hourAngle)} और मिनट की सुई का कोण 6×${minute} = ${formatDegree(minuteAngle)} होता है। बड़ा अंतर ${formatDegree(rawDifference)} है, इसलिए छोटा कोण 360° − ${formatDegree(rawDifference)} = ${formatDegree(smallerAngle)} होगा।`
            : `घंटे की सुई का कोण 30×${hourForFormula} + 0.5×${minute} = ${formatDegree(hourAngle)} और मिनट की सुई का कोण 6×${minute} = ${formatDegree(minuteAngle)} होता है। दोनों का छोटा अंतर ${formatDegree(smallerAngle)} है।`;

        return {
            id: `${quizId}-q${questionNo}`,
            topic: "Clock",
            difficulty: "very-hard",
            question: `घड़ी में ${hour}:${displayMinute} बजे घंटे और मिनट की सुइयों के बीच छोटा कोण कितना होगा?`,
            options,
            correctAnswer,
            explanation
        };
    });

    window.GJU_QUIZ_BANK.push({
        id: quizId,
        subject: "Reasoning",
        title: "Reasoning Clock Very Hard Practice Set 2",
        description: "50 verified very hard Clock angle reasoning MCQs for SSC, Police, UPSI, Railway and other competitive exams with close options and professional explanations.",
        durationMinutes: 40,
        totalQuestions: questions.length,
        marksPerQuestion: 1,
        negativeMarks: 0.25,
        difficulty: "Very Hard",
        tags: ["SSC", "UPSI", "Police", "Railway", "Reasoning", "Clock"],
        questions
    });
}());
