// Trigonometry Tough Set 1 - 50 Questions
// Split from original trigonometry quiz pack

const trigonometryToughSet1 = [
  {
    "question": "यदि tanθ + cotθ = 5 हो, तो tan²θ + cot²θ का मान क्या होगा?",
    "options": [
      "21",
      "23",
      "25",
      "27"
    ],
    "answer": "23",
    "explanation": "(tanθ+cotθ)² = tan²θ+cot²θ+2. इसलिए 25 = required + 2 ⇒ required = 23।"
  },
  {
    "question": "यदि secθ + tanθ = 4 हो, तो secθ - tanθ का मान क्या होगा?",
    "options": [
      "1/4",
      "4",
      "1/2",
      "2"
    ],
    "answer": "1/4",
    "explanation": "(secθ+tanθ)(secθ-tanθ)=1. अतः secθ-tanθ = 1/4।"
  },
  {
    "question": "यदि cosecθ - cotθ = 1/7 हो, तो cosecθ + cotθ का मान क्या होगा?",
    "options": [
      "7",
      "1/7",
      "49",
      "6"
    ],
    "answer": "7",
    "explanation": "(cosecθ-cotθ)(cosecθ+cotθ)=1. इसलिए दूसरा factor = 7।"
  },
  {
    "question": "यदि sinθ + cosθ = √2 हो और θ acute है, तो tanθ का मान क्या होगा?",
    "options": [
      "1",
      "0",
      "√3",
      "1/√3"
    ],
    "answer": "1",
    "explanation": "sinθ+cosθ का maximum √2 θ=45° पर होता है। अतः tan45°=1।"
  },
  {
    "question": "यदि sinθ = 3/5 और θ acute है, तो secθ + tanθ का मान क्या होगा?",
    "options": [
      "2",
      "3",
      "4",
      "5"
    ],
    "answer": "2",
    "explanation": "cosθ=4/5, secθ=5/4 और tanθ=3/4. योग = 2।"
  },
  {
    "question": "यदि cosθ = 5/13 और θ acute है, तो cosecθ - cotθ का मान क्या होगा?",
    "options": [
      "2/3",
      "3/2",
      "1/3",
      "1/2"
    ],
    "answer": "2/3",
    "explanation": "sinθ=12/13. cosecθ=13/12, cotθ=5/12. अंतर = 8/12 = 2/3।"
  },
  {
    "question": "यदि tanθ = 7/24 हो, तो sinθ + cosθ का मान क्या होगा?",
    "options": [
      "31/25",
      "24/25",
      "7/25",
      "1"
    ],
    "answer": "31/25",
    "explanation": "त्रिभुज sides 7,24,25 होंगे। sinθ=7/25, cosθ=24/25. योग=31/25।"
  },
  {
    "question": "यदि sinθ - cosθ = 1/5 हो, तो sin2θ का मान क्या होगा?",
    "options": [
      "24/25",
      "12/25",
      "23/25",
      "1/25"
    ],
    "answer": "24/25",
    "explanation": "(sinθ-cosθ)²=1-sin2θ. 1/25=1-sin2θ ⇒ sin2θ=24/25।"
  },
  {
    "question": "यदि sinθ + cosθ = 7/5 हो, तो sin2θ का मान क्या होगा?",
    "options": [
      "24/25",
      "12/25",
      "49/25",
      "1/25"
    ],
    "answer": "24/25",
    "explanation": "(sinθ+cosθ)²=1+sin2θ. 49/25=1+sin2θ ⇒ sin2θ=24/25।"
  },
  {
    "question": "यदि secθ + tanθ = 5 हो, तो tanθ का मान क्या होगा?",
    "options": [
      "12/5",
      "5/12",
      "13/5",
      "24/5"
    ],
    "answer": "12/5",
    "explanation": "secθ-tanθ=1/5. घटाने पर 2tanθ=5-1/5=24/5 ⇒ tanθ=12/5।"
  },
  {
    "question": "यदि cosecθ + cotθ = 9 हो, तो cotθ का मान क्या होगा?",
    "options": [
      "40/9",
      "41/9",
      "20/9",
      "80/9"
    ],
    "answer": "40/9",
    "explanation": "cosecθ-cotθ=1/9. घटाने पर 2cotθ=9-1/9=80/9 ⇒ cotθ=40/9।"
  },
  {
    "question": "sin²15° + sin²75° का मान क्या है?",
    "options": [
      "1",
      "1/2",
      "3/2",
      "√3/2"
    ],
    "answer": "1",
    "explanation": "sin75°=cos15°. अतः sin²15°+cos²15°=1।"
  },
  {
    "question": "tan15° × tan75° का मान क्या है?",
    "options": [
      "1",
      "2",
      "√3",
      "0"
    ],
    "answer": "1",
    "explanation": "tan75°=cot15°. इसलिए product = 1।"
  },
  {
    "question": "sin75°cos15° - cos75°sin15° का मान क्या है?",
    "options": [
      "√3/2",
      "1/2",
      "1",
      "0"
    ],
    "answer": "√3/2",
    "explanation": "यह sin(75°-15°)=sin60°=√3/2 है।"
  },
  {
    "question": "cos75°cos15° - sin75°sin15° का मान क्या है?",
    "options": [
      "0",
      "1/2",
      "√3/2",
      "-1/2"
    ],
    "answer": "0",
    "explanation": "यह cos(75°+15°)=cos90°=0 है।"
  },
  {
    "question": "यदि tanA = 3/4 और tanB = 1/7 हो, तो tan(A+B) का मान क्या होगा?",
    "options": [
      "1",
      "2",
      "3/5",
      "5/3"
    ],
    "answer": "1",
    "explanation": "tan(A+B)=(3/4+1/7)/(1-3/28)=(25/28)/(25/28)=1।"
  },
  {
    "question": "यदि tanA = 5/12 और tanB = 3/4 हो, तो tan(A-B) का मान क्या होगा?",
    "options": [
      "-16/63",
      "16/63",
      "-63/16",
      "1/7"
    ],
    "answer": "-16/63",
    "explanation": "tan(A-B)=(5/12-3/4)/(1+(5/12)(3/4))=(-1/3)/(21/16)=-16/63।"
  },
  {
    "question": "यदि sinA = 8/17 और A acute है, तो tanA + cotA का मान क्या होगा?",
    "options": [
      "289/120",
      "120/289",
      "17/15",
      "15/8"
    ],
    "answer": "289/120",
    "explanation": "cosA=15/17, tanA=8/15, cotA=15/8. योग=(64+225)/120=289/120।"
  },
  {
    "question": "यदि cosA = 12/13 हो, तो 1 - tan²A का मान क्या होगा?",
    "options": [
      "119/144",
      "144/119",
      "1/144",
      "25/144"
    ],
    "answer": "119/144",
    "explanation": "sinA=5/13, tanA=5/12. 1-tan²A=1-25/144=119/144।"
  },
  {
    "question": "यदि cotA = 15/8 हो, तो sinA cosA का मान क्या होगा?",
    "options": [
      "120/289",
      "15/17",
      "8/17",
      "64/289"
    ],
    "answer": "120/289",
    "explanation": "cotA=15/8 ⇒ sides 8,15,17. sinA cosA=(8/17)(15/17)=120/289।"
  },
  {
    "question": "मान निकालिए: 2sin30°cos30°",
    "options": [
      "√3/2",
      "1/2",
      "1",
      "√3"
    ],
    "answer": "√3/2",
    "explanation": "2sinAcosA=sin2A. इसलिए 2sin30°cos30°=sin60°=√3/2।"
  },
  {
    "question": "मान निकालिए: cos²30° - sin²30°",
    "options": [
      "1/2",
      "√3/2",
      "1",
      "0"
    ],
    "answer": "1/2",
    "explanation": "cos²A-sin²A=cos2A. अतः cos60°=1/2।"
  },
  {
    "question": "मान निकालिए: tan30° + cot30°",
    "options": [
      "4/√3",
      "2/√3",
      "√3",
      "1"
    ],
    "answer": "4/√3",
    "explanation": "tan30°=1/√3 और cot30°=√3. योग=(1+3)/√3=4/√3।"
  },
  {
    "question": "मान निकालिए: sec²60° - tan²60°",
    "options": [
      "1",
      "2",
      "3",
      "4"
    ],
    "answer": "1",
    "explanation": "Identity: sec²θ - tan²θ = 1।"
  },
  {
    "question": "मान निकालिए: cosec²30° - cot²30°",
    "options": [
      "1",
      "2",
      "3",
      "4"
    ],
    "answer": "1",
    "explanation": "Identity: cosec²θ - cot²θ = 1।"
  },
  {
    "question": "यदि tanθ = 2 हो, तो (1-tan²θ)/(1+tan²θ) का मान क्या होगा?",
    "options": [
      "-3/5",
      "3/5",
      "-4/5",
      "4/5"
    ],
    "answer": "-3/5",
    "explanation": "यह cos2θ के बराबर है। tanθ=2 ⇒ (1-4)/(1+4)=-3/5।"
  },
  {
    "question": "यदि tanθ = 3/4 हो, तो sin2θ का मान क्या होगा?",
    "options": [
      "24/25",
      "7/25",
      "12/25",
      "1"
    ],
    "answer": "24/25",
    "explanation": "sin2θ = 2tanθ/(1+tan²θ)=2×3/4/(1+9/16)=24/25।"
  },
  {
    "question": "यदि tanθ = 5/12 हो, तो cos2θ का मान क्या होगा?",
    "options": [
      "119/169",
      "120/169",
      "169/119",
      "-119/169"
    ],
    "answer": "119/169",
    "explanation": "cos2θ=(1-tan²θ)/(1+tan²θ)=(1-25/144)/(1+25/144)=119/169।"
  },
  {
    "question": "यदि sin2A = 1 और A acute है, तो A का मान क्या होगा?",
    "options": [
      "45°",
      "30°",
      "60°",
      "90°"
    ],
    "answer": "45°",
    "explanation": "sin2A=1 ⇒ 2A=90° ⇒ A=45°।"
  },
  {
    "question": "यदि cos2A = 0 और A acute है, तो tanA का मान क्या होगा?",
    "options": [
      "1",
      "0",
      "√3",
      "1/√3"
    ],
    "answer": "1",
    "explanation": "cos2A=0 ⇒ 2A=90° ⇒ A=45°. tan45°=1।"
  },
  {
    "question": "यदि tan(A+B)=∞ और A=35° हो, तो B का मान क्या होगा?",
    "options": [
      "55°",
      "45°",
      "65°",
      "35°"
    ],
    "answer": "55°",
    "explanation": "tan(A+B) undefined/∞ तब होता है जब A+B=90°. इसलिए B=55°।"
  },
  {
    "question": "यदि sin(A+B)=1 और A=42° हो, तो B का मान क्या होगा?",
    "options": [
      "48°",
      "42°",
      "58°",
      "38°"
    ],
    "answer": "48°",
    "explanation": "sin(A+B)=1 ⇒ A+B=90°. इसलिए B=48°।"
  },
  {
    "question": "यदि cos(A-B)=1 और A=73° हो, तो B का मान क्या होगा?",
    "options": [
      "73°",
      "17°",
      "90°",
      "0°"
    ],
    "answer": "73°",
    "explanation": "cos(A-B)=1 ⇒ A-B=0° ⇒ B=A=73°।"
  },
  {
    "question": "यदि tanA tanB = 1 और A+B=90°, तो A और B के बारे में सही कथन क्या है?",
    "options": [
      "दोनों complementary हैं",
      "दोनों equal ही होंगे",
      "A-B=90°",
      "A+B=180°"
    ],
    "answer": "दोनों complementary हैं",
    "explanation": "यदि A+B=90°, तो tanB=cotA और tanA tanB=1।"
  },
  {
    "question": "मान निकालिए: sin20°cos70° + cos20°sin70°",
    "options": [
      "1",
      "0",
      "1/2",
      "√3/2"
    ],
    "answer": "1",
    "explanation": "यह sin(20°+70°)=sin90°=1 है।"
  },
  {
    "question": "मान निकालिए: cos20°cos70° - sin20°sin70°",
    "options": [
      "0",
      "1",
      "1/2",
      "-1"
    ],
    "answer": "0",
    "explanation": "यह cos(20°+70°)=cos90°=0 है।"
  },
  {
    "question": "मान निकालिए: tan20° + tan25° + tan20°tan25°tan45° यदि 20°+25°+45°=90°",
    "options": [
      "1",
      "0",
      "2",
      "√3"
    ],
    "answer": "1",
    "explanation": "जब A+B+C=90°, तो tanA+tanB+tanC = tanA tanB tanC. यहाँ tan45°=1, इसलिए दिए रूप का मान tan20+tan25+tan20tan25 = 1।"
  },
  {
    "question": "यदि A+B=45° और tanA=1/3, tanB=1/2, तो tan(A+B) की जाँच में कौन सा मान मिलेगा?",
    "options": [
      "1",
      "5/7",
      "7/5",
      "1/6"
    ],
    "answer": "1",
    "explanation": "tan(A+B)=(1/3+1/2)/(1-1/6)=(5/6)/(5/6)=1।"
  },
  {
    "question": "यदि secθ - tanθ = 2/5 हो, तो secθ + tanθ का मान क्या होगा?",
    "options": [
      "5/2",
      "2/5",
      "10/4",
      "25/4"
    ],
    "answer": "5/2",
    "explanation": "(secθ-tanθ)(secθ+tanθ)=1. अतः secθ+tanθ=5/2।"
  },
  {
    "question": "यदि cosecθ + cotθ = 3/2 हो, तो cosecθ - cotθ का मान क्या होगा?",
    "options": [
      "2/3",
      "3/2",
      "1/3",
      "4/3"
    ],
    "answer": "2/3",
    "explanation": "(cosecθ+cotθ)(cosecθ-cotθ)=1. इसलिए दूसरा factor = 2/3।"
  },
  {
    "question": "यदि sinθ = cosθ हो, तो sin⁴θ + cos⁴θ का मान क्या होगा?",
    "options": [
      "1/2",
      "1",
      "1/4",
      "3/4"
    ],
    "answer": "1/2",
    "explanation": "θ=45°. sin²θ=cos²θ=1/2. अतः sin⁴+cos⁴=1/4+1/4=1/2।"
  },
  {
    "question": "यदि tanθ = 1 हो, तो sin⁶θ + cos⁶θ का मान क्या होगा?",
    "options": [
      "1/4",
      "1/2",
      "3/4",
      "1"
    ],
    "answer": "1/4",
    "explanation": "θ=45°. sin²=cos²=1/2. sin⁶+cos⁶=(1/2)^3+(1/2)^3=1/4।"
  },
  {
    "question": "यदि sinθ + cosθ = 1 हो, तो sin2θ का मान क्या होगा?",
    "options": [
      "0",
      "1",
      "-1",
      "1/2"
    ],
    "answer": "0",
    "explanation": "(sinθ+cosθ)²=1+sin2θ. Left=1, इसलिए sin2θ=0।"
  },
  {
    "question": "यदि sinθ - cosθ = -1 हो, तो sin2θ का मान क्या होगा?",
    "options": [
      "0",
      "1",
      "-1",
      "1/2"
    ],
    "answer": "0",
    "explanation": "(sinθ-cosθ)²=1-sin2θ. Left=1, इसलिए sin2θ=0।"
  },
  {
    "question": "यदि tanθ = 1/√3 हो और θ acute है, तो θ का मान क्या होगा?",
    "options": [
      "30°",
      "45°",
      "60°",
      "75°"
    ],
    "answer": "30°",
    "explanation": "tan30°=1/√3।"
  },
  {
    "question": "यदि cotθ = 1/√3 हो और θ acute है, तो θ का मान क्या होगा?",
    "options": [
      "60°",
      "30°",
      "45°",
      "15°"
    ],
    "answer": "60°",
    "explanation": "cotθ=1/√3 ⇒ tanθ=√3 ⇒ θ=60°।"
  },
  {
    "question": "यदि sinθ = cos(θ+30°) हो और θ acute है, तो θ का मान क्या होगा?",
    "options": [
      "30°",
      "45°",
      "60°",
      "15°"
    ],
    "answer": "30°",
    "explanation": "sinθ=cos(90°-θ). इसलिए 90°-θ = θ+30° ⇒ θ=30°।"
  },
  {
    "question": "यदि cosθ = sin(θ+20°) हो, तो θ का मान क्या होगा?",
    "options": [
      "35°",
      "45°",
      "55°",
      "70°"
    ],
    "answer": "35°",
    "explanation": "cosθ=sin(90°-θ). अतः 90°-θ=θ+20° ⇒ 2θ=70° ⇒ θ=35°।"
  },
  {
    "question": "यदि sin(3A)=cos(2A) और A acute है, तो A का मान क्या होगा?",
    "options": [
      "18°",
      "30°",
      "36°",
      "45°"
    ],
    "answer": "18°",
    "explanation": "cos2A=sin(90°-2A). अतः 3A=90°-2A ⇒ 5A=90° ⇒ A=18°।"
  },
  {
    "question": "यदि tan(2A)=cot(3A) और A acute है, तो A का मान क्या होगा?",
    "options": [
      "18°",
      "15°",
      "30°",
      "36°"
    ],
    "answer": "18°",
    "explanation": "cot3A=tan(90°-3A). अतः 2A=90°-3A ⇒ 5A=90° ⇒ A=18°।"
  }
];

window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];

function buildTrigonometryQuestions(rawQuestions, quizId) {
  return rawQuestions.map(function (item, index) {
    const correctAnswer = item.options.indexOf(item.answer);
    const number = index + 1;
    if (correctAnswer < 0) throw new Error("Missing answer option in " + quizId + " question " + number);

    return {
      id: quizId + "-q" + String(number).padStart(2, "0"),
      subject: "Mathematics",
      topic: "Trigonometry",
      difficulty: "hard",
      question: item.question,
      options: item.options.slice(),
      correctAnswer,
      explanation: item.explanation
    };
  });
}

window.GJU_QUIZ_BANK.push({
  id: "trigonometry-tough-set-1",
  subject: "Mathematics",
  title: "Trigonometry Tough Set 1",
  description: "50 tough trigonometry questions for government exam practice.",
  durationMinutes: 45,
  totalQuestions: 50,
  marksPerQuestion: 1,
  negativeMarks: 0.25,
  difficulty: "Hard",
  tags: ["SSC", "CGL", "CPO", "CHSL", "Trigonometry"],
  questions: buildTrigonometryQuestions(trigonometryToughSet1, "trigonometry-tough-set-1")
});
