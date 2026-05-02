(function () {
    "use strict";

    window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];

    const quizId = "hindi-vyakaran-set-1";
    const seeds = [
        { topic: "Vyakaran", difficulty: "easy", question: "In {label}, \"Ram\" kis prakar ki sangya hai?", options: ["Jativachak", "Vyaktivachak", "Bhavvachak", "Samuhvachak"], correctAnswer: 1, explanation: "Ram kisi vishesh vyakti ka naam hai." },
        { topic: "Vyakaran", difficulty: "easy", question: "In {label}, \"Main school jata hun\" mein kriya pad hai", options: ["Main", "School", "Jata hun", "Mein"], correctAnswer: 2, explanation: "Jata hun kriya pad hai." },
        { topic: "Sandhi", difficulty: "hard", question: "In {label}, \"Devalaya\" mein kaunsi sandhi hai?", options: ["Gun", "Vriddhi", "Yan", "Dirgh"], correctAnswer: 0, explanation: "Dev + Alaya mein gun sandhi hoti hai." },
        { topic: "Samas", difficulty: "medium", question: "In {label}, \"Rajputra\" ka samas hai", options: ["Karmadharaya", "Tatpurush", "Dvandva", "Bahuvrihi"], correctAnswer: 1, explanation: "Raja ka putra arth mein tatpurush samas hai." },
        { topic: "Alankar", difficulty: "medium", question: "In {label}, ek hi varna ki punaravritti ka alankar hai", options: ["Anupras", "Upma", "Rupak", "Yamak"], correctAnswer: 0, explanation: "Anupras alankar mein varna punaravritti hoti hai." },
        { topic: "Shuddh Vartani", difficulty: "medium", question: "In {label}, sahi shabd chuniye", options: ["Vidhyalay", "Vidyalaya", "Viddyalay", "Vidhalaay"], correctAnswer: 1, explanation: "Sahi vartani Vidyalaya hai." },
        { topic: "Karak", difficulty: "medium", question: "In {label}, \"Ram ne phal khaya\" mein \"ne\" ka karak hai", options: ["Karta", "Karm", "Karan", "Sampradan"], correctAnswer: 0, explanation: "Ne karta karak ka chinh hai." },
        { topic: "Ling", difficulty: "easy", question: "In {label}, \"Ladka\" ka striling roop hai", options: ["Ladki", "Ladke", "Ladkon", "Ladakpan"], correctAnswer: 0, explanation: "Ladka ka striling ladki hai." },
        { topic: "Vachan", difficulty: "easy", question: "In {label}, \"Pustak\" ka bahuvachan hai", options: ["Pustaka", "Pustaken", "Pustakon", "Pustaki"], correctAnswer: 1, explanation: "Pustak ka bahuvachan pustaken hai." },
        { topic: "Visheshan", difficulty: "medium", question: "In {label}, \"Sundar phool\" mein visheshan hai", options: ["Sundar", "Phool", "Mein", "Dono"], correctAnswer: 0, explanation: "Sundar shabd phool ki visheshta batata hai." }
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
        subject: "Hindi",
        title: "Hindi Vyakaran Practice Set 1",
        description: "50 Hindi grammar questions for government exams.",
        durationMinutes: 30,
        totalQuestions: 50,
        marksPerQuestion: 1,
        negativeMarks: 0.25,
        difficulty: "Mixed",
        tags: ["SSC", "Railway", "Police"],
        questions: buildQuestions()
    });
}());


