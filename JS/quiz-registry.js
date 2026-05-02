(function () {
    "use strict";

    const REQUIRED_QUESTION_COUNT = 50;
    const bank = Array.isArray(window.GJU_QUIZ_BANK) ? window.GJU_QUIZ_BANK : [];
    const subjectOrder = ["Mathematics", "English", "Hindi", "General Awareness", "Reasoning", "Computer"];
    const seenQuizIds = new Set();
    const subjectQuestionText = new Map();

    function normalizeText(value) {
        return String(value || "").trim().replace(/\s+/g, " ").toLowerCase();
    }

    function hasQuestionShape(question) {
        return Boolean(
            question &&
            question.id &&
            question.topic &&
            question.difficulty &&
            question.question &&
            Array.isArray(question.options) &&
            question.options.length === 4 &&
            question.options.every((option) => option !== undefined && option !== null && String(option).trim()) &&
            Number.isInteger(question.correctAnswer) &&
            question.correctAnswer >= 0 &&
            question.correctAnswer <= 3 &&
            question.explanation
        );
    }

    function validateQuiz(rawQuiz) {
        const quiz = {
            id: rawQuiz.id,
            subject: rawQuiz.subject,
            title: rawQuiz.title,
            description: rawQuiz.description || "",
            durationMinutes: Number(rawQuiz.durationMinutes) || 30,
            totalQuestions: Number(rawQuiz.totalQuestions) || REQUIRED_QUESTION_COUNT,
            marksPerQuestion: Number(rawQuiz.marksPerQuestion) || 1,
            negativeMarks: Number(rawQuiz.negativeMarks) || 0,
            difficulty: rawQuiz.difficulty || "Mixed",
            tags: Array.isArray(rawQuiz.tags) ? rawQuiz.tags : [],
            questions: Array.isArray(rawQuiz.questions) ? rawQuiz.questions : [],
            validation: {
                isComplete: true,
                errors: [],
                duplicateQuestionIds: [],
                duplicateQuestionTexts: [],
                duplicateSubjectQuestionTexts: []
            }
        };

        if (!quiz.id || seenQuizIds.has(quiz.id)) {
            quiz.validation.errors.push("Quiz id is missing or duplicated.");
        }
        seenQuizIds.add(quiz.id);

        if (!quiz.subject || !quiz.title) {
            quiz.validation.errors.push("Quiz subject and title are required.");
        }

        quiz.questions = quiz.questions.map((question) => ({
            ...question,
            subject: question.subject || quiz.subject,
            marks: Number(question.marks) || quiz.marksPerQuestion,
            negativeMarks: Number(question.negativeMarks) || quiz.negativeMarks
        }));

        if (quiz.questions.length !== REQUIRED_QUESTION_COUNT) {
            quiz.validation.errors.push(`Quiz must contain exactly ${REQUIRED_QUESTION_COUNT} questions.`);
        }

        const ids = new Set();
        const localTexts = new Set();
        const subjectTexts = subjectQuestionText.get(quiz.subject) || new Set();

        quiz.questions.forEach((question, index) => {
            if (!hasQuestionShape(question)) {
                quiz.validation.errors.push(`Question ${index + 1} is missing required fields.`);
                return;
            }

            if (ids.has(question.id)) {
                quiz.validation.duplicateQuestionIds.push(question.id);
            }
            ids.add(question.id);

            const normalized = normalizeText(question.question);
            if (localTexts.has(normalized)) {
                quiz.validation.duplicateQuestionTexts.push(question.id);
            }
            localTexts.add(normalized);

            if (subjectTexts.has(normalized)) {
                quiz.validation.duplicateSubjectQuestionTexts.push(question.id);
            }
            subjectTexts.add(normalized);
        });

        subjectQuestionText.set(quiz.subject, subjectTexts);

        if (quiz.validation.duplicateQuestionIds.length || quiz.validation.duplicateQuestionTexts.length) {
            quiz.validation.errors.push("Quiz contains duplicate question ids or question text.");
        }

        quiz.validation.isComplete = quiz.validation.errors.length === 0;

        if (!quiz.validation.isComplete) {
            console.warn("[GJU Quiz Registry] Incomplete quiz:", quiz.id, quiz.validation);
        } else if (quiz.validation.duplicateSubjectQuestionTexts.length) {
            console.warn("[GJU Quiz Registry] Repeated question text across subject quizzes:", quiz.id, quiz.validation.duplicateSubjectQuestionTexts);
        }

        return quiz;
    }

    const quizzes = bank.map(validateQuiz);
    const subjects = subjectOrder.filter((subject) => quizzes.some((quiz) => quiz.subject === subject));

    window.GJU_QUIZZES = {
        subjects,
        quizzes,
        getQuizzesBySubject(subject) {
            return quizzes.filter((quiz) => quiz.subject === subject);
        },
        getQuizById(id) {
            return quizzes.find((quiz) => quiz.id === id) || null;
        }
    };
}());
