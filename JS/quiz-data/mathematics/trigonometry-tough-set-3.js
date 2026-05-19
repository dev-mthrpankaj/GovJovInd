// Trigonometry Tough Set 3 - 50 Questions
// Split from original trigonometry quiz pack

const trigonometryToughSet3 = [
  {
    "question": "एक tower की ऊँचाई 60 m है। उसकी चोटी का angle of elevation √3 slope यानी 60° है। observer tower से कितनी दूरी पर है?",
    "options": [
      "20√3 m",
      "30√3 m",
      "60√3 m",
      "40√3 m"
    ],
    "answer": "20√3 m",
    "explanation": "tan60°=height/distance=60/d. d=60/√3=20√3 m।"
  },
  {
    "question": "एक tower की ऊँचाई 50√3 m है। जमीन से angle of elevation 30° है। दूरी क्या होगी?",
    "options": [
      "150 m",
      "50 m",
      "100 m",
      "50√3 m"
    ],
    "answer": "150 m",
    "explanation": "tan30°=h/d=50√3/d ⇒ d=50√3×√3=150 m।"
  },
  {
    "question": "एक pole की छाया 20 m है और सूर्य का elevation 45° है। pole की ऊँचाई कितनी है?",
    "options": [
      "20 m",
      "10 m",
      "20√3 m",
      "40 m"
    ],
    "answer": "20 m",
    "explanation": "tan45°=height/shadow=1 ⇒ height=shadow=20 m।"
  },
  {
    "question": "30 m ऊँचे tower की छाया 10√3 m है। सूर्य का elevation angle क्या है?",
    "options": [
      "60°",
      "30°",
      "45°",
      "75°"
    ],
    "answer": "60°",
    "explanation": "tanθ=30/(10√3)=√3 ⇒ θ=60°।"
  },
  {
    "question": "एक व्यक्ति tower से 30 m दूर है और elevation 45° है। tower की ऊँचाई कितनी है?",
    "options": [
      "30 m",
      "30√3 m",
      "15 m",
      "60 m"
    ],
    "answer": "30 m",
    "explanation": "tan45°=h/30=1 ⇒ h=30 m।"
  },
  {
    "question": "एक building की ऊँचाई 75 m है। angle of elevation 30° है। observer की दूरी कितनी होगी?",
    "options": [
      "75√3 m",
      "25√3 m",
      "150 m",
      "75 m"
    ],
    "answer": "75√3 m",
    "explanation": "tan30°=75/d ⇒ d=75√3 m।"
  },
  {
    "question": "एक tower के base से 40 m दूर point पर elevation 60° है। tower की ऊँचाई क्या होगी?",
    "options": [
      "40√3 m",
      "40 m",
      "80 m",
      "20√3 m"
    ],
    "answer": "40√3 m",
    "explanation": "h=40tan60°=40√3 m।"
  },
  {
    "question": "एक 10 m लंबी ladder दीवार से 30° angle बनाती है। दीवार पर पहुँची ऊँचाई कितनी है?",
    "options": [
      "5 m",
      "5√3 m",
      "10√3 m",
      "20 m"
    ],
    "answer": "5 m",
    "explanation": "height = 10sin30° = 5 m।"
  },
  {
    "question": "एक 20 m ladder जमीन से 60° angle पर है। wall से base की दूरी कितनी होगी?",
    "options": [
      "10 m",
      "10√3 m",
      "20√3 m",
      "5 m"
    ],
    "answer": "10 m",
    "explanation": "distance = 20cos60° = 10 m।"
  },
  {
    "question": "एक 24 m लंबी ladder जमीन से 30° angle पर है। दीवार पर पहुँची ऊँचाई कितनी है?",
    "options": [
      "12 m",
      "12√3 m",
      "24√3 m",
      "8√3 m"
    ],
    "answer": "12 m",
    "explanation": "height = 24sin30° = 12 m।"
  },
  {
    "question": "एक tower की top से 40 m दूर point का angle of depression 45° है। tower की ऊँचाई क्या है?",
    "options": [
      "40 m",
      "40√3 m",
      "20 m",
      "80 m"
    ],
    "answer": "40 m",
    "explanation": "Angle of depression = angle of elevation. tan45°=h/40 ⇒ h=40 m।"
  },
  {
    "question": "एक cliff की ऊँचाई 100 m है। जहाज का angle of depression 30° है। जहाज cliff से क्षैतिज दूरी पर कितना दूर है?",
    "options": [
      "100√3 m",
      "100/√3 m",
      "50√3 m",
      "200 m"
    ],
    "answer": "100√3 m",
    "explanation": "tan30°=100/d ⇒ d=100√3 m।"
  },
  {
    "question": "दो points A और B tower के same side पर हैं। A से elevation 30°, B से 60° है और A,B के बीच दूरी 40 m है। tower की ऊँचाई क्या है?",
    "options": [
      "20√3 m",
      "30√3 m",
      "40√3 m",
      "60 m"
    ],
    "answer": "20√3 m",
    "explanation": "यदि nearer distance=x, तो h=x√3 और farther distance=x+40, h=(x+40)/√3. Solve: 3x=x+40 ⇒ x=20, h=20√3।"
  },
  {
    "question": "दो points same line पर tower से far और near हैं। angles 30° और 45° हैं, points की दूरी 50 m है। tower height क्या है?",
    "options": [
      "25(√3+1) m",
      "25(√3-1) m",
      "50√3 m",
      "50 m"
    ],
    "answer": "25(√3+1) m",
    "explanation": "h/tan30 - h/tan45 = 50 ⇒ h√3-h=50 ⇒ h=50/(√3-1)=25(√3+1)।"
  },
  {
    "question": "एक pole की height h है। उसकी shadow 20 m है जब elevation 60° है। h क्या है?",
    "options": [
      "20√3 m",
      "20 m",
      "10√3 m",
      "40 m"
    ],
    "answer": "20√3 m",
    "explanation": "h=shadow×tan60°=20√3 m।"
  },
  {
    "question": "एक tower की height 30√3 m है। उसके top का elevation 60° है। दूरी क्या है?",
    "options": [
      "30 m",
      "30√3 m",
      "90 m",
      "15√3 m"
    ],
    "answer": "30 m",
    "explanation": "tan60°=30√3/d ⇒ d=30 m।"
  },
  {
    "question": "एक balloon जमीन से 100√3 m ऊँचा है। observer को elevation 60° दिखता है। horizontal distance क्या है?",
    "options": [
      "100 m",
      "100√3 m",
      "300 m",
      "50√3 m"
    ],
    "answer": "100 m",
    "explanation": "tan60°=100√3/d ⇒ d=100 m।"
  },
  {
    "question": "एक tower के top से car का depression 30° है। tower 60 m ऊँचा है। car की दूरी base से क्या है?",
    "options": [
      "60√3 m",
      "20√3 m",
      "120 m",
      "30√3 m"
    ],
    "answer": "60√3 m",
    "explanation": "tan30°=60/d ⇒ d=60√3 m।"
  },
  {
    "question": "एक 15 m pole की shadow 15√3 m है। सूर्य का elevation क्या है?",
    "options": [
      "30°",
      "45°",
      "60°",
      "75°"
    ],
    "answer": "30°",
    "explanation": "tanθ=15/(15√3)=1/√3 ⇒ θ=30°।"
  },
  {
    "question": "एक 25 m ladder wall से 7 m दूर रखी है। wall पर पहुँची height क्या है?",
    "options": [
      "24 m",
      "18 m",
      "20 m",
      "22 m"
    ],
    "answer": "24 m",
    "explanation": "Right triangle: height=√(25²-7²)=√576=24 m।"
  },
  {
    "question": "एक kite की string 100 m है और elevation 30° है। kite की height कितनी है?",
    "options": [
      "50 m",
      "50√3 m",
      "100√3 m",
      "25 m"
    ],
    "answer": "50 m",
    "explanation": "height=100sin30°=50 m।"
  },
  {
    "question": "एक ramp 20 m लंबा है और vertical rise 10 m है। ground से ramp का angle क्या है?",
    "options": [
      "30°",
      "45°",
      "60°",
      "15°"
    ],
    "answer": "30°",
    "explanation": "sinθ=10/20=1/2 ⇒ θ=30°।"
  },
  {
    "question": "एक observer building से 40√3 m दूर है और elevation 30° है। building height क्या है?",
    "options": [
      "40 m",
      "40√3 m",
      "120 m",
      "20√3 m"
    ],
    "answer": "40 m",
    "explanation": "h=d tan30°=40√3 × 1/√3 = 40 m।"
  },
  {
    "question": "एक tower की height 80 m है। elevation 45° हो तो distance क्या है?",
    "options": [
      "80 m",
      "40 m",
      "80√3 m",
      "160 m"
    ],
    "answer": "80 m",
    "explanation": "tan45°=80/d ⇒ d=80 m।"
  },
  {
    "question": "एक tree की height 10√3 m है और shadow 10 m है। elevation क्या है?",
    "options": [
      "60°",
      "30°",
      "45°",
      "75°"
    ],
    "answer": "60°",
    "explanation": "tanθ=10√3/10=√3 ⇒ θ=60°।"
  },
  {
    "question": "एक building से 60 m दूर point पर elevation 30° है। building height क्या है?",
    "options": [
      "20√3 m",
      "30√3 m",
      "60√3 m",
      "20 m"
    ],
    "answer": "20√3 m",
    "explanation": "h=60tan30°=60/√3=20√3 m।"
  },
  {
    "question": "एक tower के top से दो cars opposite directions में हैं। depression angles 30° और 60° हैं, tower height 30√3 m है। cars के बीच दूरी क्या है?",
    "options": [
      "120 m",
      "90 m",
      "60 m",
      "150 m"
    ],
    "answer": "120 m",
    "explanation": "Distances: d1=h/tan30=90 m, d2=h/tan60=30 m. Opposite sides total=120 m।"
  },
  {
    "question": "एक tower के same side दो points पर elevation 30° और 60° हैं। tower height 30√3 m है। दोनों points की दूरी क्या है?",
    "options": [
      "60 m",
      "30 m",
      "90 m",
      "120 m"
    ],
    "answer": "60 m",
    "explanation": "Distances from base: 90 m और 30 m. Difference=60 m।"
  },
  {
    "question": "एक lighthouse 45 m ऊँचा है। जहाज का depression 45° है। जहाज base से कितनी दूरी पर है?",
    "options": [
      "45 m",
      "45√3 m",
      "90 m",
      "30 m"
    ],
    "answer": "45 m",
    "explanation": "tan45°=45/d ⇒ d=45 m।"
  },
  {
    "question": "एक airplane 500√3 m ऊँचाई पर है और observer को 60° elevation से दिखता है। horizontal distance क्या है?",
    "options": [
      "500 m",
      "1500 m",
      "500√3 m",
      "250√3 m"
    ],
    "answer": "500 m",
    "explanation": "tan60°=500√3/d ⇒ d=500 m।"
  },
  {
    "question": "एक tower के top से नीचे point का depression 60° है और horizontal distance 20 m है। tower height क्या है?",
    "options": [
      "20√3 m",
      "20 m",
      "40 m",
      "10√3 m"
    ],
    "answer": "20√3 m",
    "explanation": "h=20tan60°=20√3 m।"
  },
  {
    "question": "एक man 1.8 m tall है और उसके shadow की length 1.8√3 m है। Sun elevation क्या है?",
    "options": [
      "30°",
      "45°",
      "60°",
      "15°"
    ],
    "answer": "30°",
    "explanation": "tanθ=1.8/(1.8√3)=1/√3 ⇒ θ=30°।"
  },
  {
    "question": "एक tower की height 100 m है। elevation angle 60° है। observer distance क्या होगी?",
    "options": [
      "100/√3 m",
      "100√3 m",
      "50 m",
      "200 m"
    ],
    "answer": "100/√3 m",
    "explanation": "tan60°=100/d ⇒ d=100/√3 m।"
  },
  {
    "question": "एक 30 m ladder wall से 15 m दूर है। ladder का ground से angle क्या है?",
    "options": [
      "60°",
      "30°",
      "45°",
      "75°"
    ],
    "answer": "60°",
    "explanation": "cosθ=base/hypotenuse=15/30=1/2 ⇒ θ=60°।"
  },
  {
    "question": "एक rope 26 m लंबी है और vertical pole से top पर tied है। ground point pole से 10 m दूर है। pole height क्या है?",
    "options": [
      "24 m",
      "20 m",
      "22 m",
      "16 m"
    ],
    "answer": "24 m",
    "explanation": "height=√(26²-10²)=√576=24 m।"
  },
  {
    "question": "एक hill की ऊँचाई 200 m है। observer से elevation 45° है। horizontal distance क्या है?",
    "options": [
      "200 m",
      "100 m",
      "200√3 m",
      "400 m"
    ],
    "answer": "200 m",
    "explanation": "tan45°=200/d ⇒ d=200 m।"
  },
  {
    "question": "एक tower से 100 m दूर observer को top elevation 30° और flag का top 45° दिखता है। flag की height क्या है?",
    "options": [
      "100-100/√3 m",
      "100√3-100 m",
      "100+100/√3 m",
      "100/√3 m"
    ],
    "answer": "100-100/√3 m",
    "explanation": "Tower height=100tan30=100/√3. Tower+flag=100tan45=100. Flag=100-100/√3।"
  },
  {
    "question": "एक 50 m ऊँचे tower पर लगे flag के top का elevation 60° और tower top का elevation 45° है। observer से distance क्या है?",
    "options": [
      "50 m",
      "50√3 m",
      "25√3 m",
      "100 m"
    ],
    "answer": "50 m",
    "explanation": "Tower top: tan45=50/d ⇒ d=50 m।"
  },
  {
    "question": "पिछले प्रश्न में flag की height क्या होगी?",
    "options": [
      "50(√3-1) m",
      "50(√3+1) m",
      "50√3 m",
      "25√3 m"
    ],
    "answer": "50(√3-1) m",
    "explanation": "Total height=d tan60=50√3. Flag=50√3-50=50(√3-1)।"
  },
  {
    "question": "एक tower की ऊँचाई 40 m है। एक point से elevation 45° है। उस point से 40-40/√3 m tower की ओर चलने पर elevation क्या होगा?",
    "options": [
      "60°",
      "45°",
      "30°",
      "75°"
    ],
    "answer": "60°",
    "explanation": "पहली distance=40 m. नई distance=40/√3 m. tanθ=40/(40/√3)=√3 ⇒ θ=60°।"
  },
  {
    "question": "एक tower की height 90 m है। elevation angle 30° से 60° करने के लिए observer को कितनी दूरी tower की ओर चलनी होगी?",
    "options": [
      "60√3 m",
      "30√3 m",
      "90√3 m",
      "120 m"
    ],
    "answer": "60√3 m",
    "explanation": "Distances: at 30° = 90√3, at 60° = 90/√3=30√3. Difference=60√3 m।"
  },
  {
    "question": "एक observer एक tower से दूर जा रहा है। 30 m चलने के बाद elevation 60° से 30° हो जाता है। tower की height क्या है?",
    "options": [
      "15√3 m",
      "30√3 m",
      "45 m",
      "60 m"
    ],
    "answer": "15√3 m",
    "explanation": "Near distance=h/√3, far distance=h√3. Difference=30 ⇒ h(√3-1/√3)=30 ⇒ h×2/√3=30 ⇒ h=15√3।"
  },
  {
    "question": "एक bridge से river में boat का depression 45° है। bridge height 25 m है। boat की horizontal distance क्या है?",
    "options": [
      "25 m",
      "25√3 m",
      "50 m",
      "12.5 m"
    ],
    "answer": "25 m",
    "explanation": "tan45°=25/d ⇒ d=25 m।"
  },
  {
    "question": "एक tower के top से दो points same side पर depression 45° और 30° हैं। tower height 60 m है। points के बीच distance क्या है?",
    "options": [
      "60(√3-1) m",
      "60√3 m",
      "60 m",
      "30(√3-1) m"
    ],
    "answer": "60(√3-1) m",
    "explanation": "Distances: 60/tan45=60, 60/tan30=60√3. Difference=60(√3-1)।"
  },
  {
    "question": "एक tower के opposite sides पर दो points के depression angles 45° और 30° हैं। height 60 m है। points की दूरी क्या है?",
    "options": [
      "60(√3+1) m",
      "60(√3-1) m",
      "120 m",
      "60√3 m"
    ],
    "answer": "60(√3+1) m",
    "explanation": "Opposite sides total distance = 60 + 60√3 = 60(√3+1)।"
  },
  {
    "question": "एक 13 m ladder दीवार पर 12 m ऊँचाई तक पहुँचती है। base wall से कितनी दूर है?",
    "options": [
      "5 m",
      "6 m",
      "7 m",
      "8 m"
    ],
    "answer": "5 m",
    "explanation": "base=√(13²-12²)=√25=5 m।"
  },
  {
    "question": "एक kite 80 m string से 30° elevation पर है। जमीन से height क्या है?",
    "options": [
      "40 m",
      "40√3 m",
      "80 m",
      "20√3 m"
    ],
    "answer": "40 m",
    "explanation": "height=80sin30°=40 m।"
  },
  {
    "question": "एक tower की छाया उसकी height के बराबर है। सूर्य का elevation क्या है?",
    "options": [
      "45°",
      "30°",
      "60°",
      "90°"
    ],
    "answer": "45°",
    "explanation": "tanθ=height/shadow=1 ⇒ θ=45°।"
  },
  {
    "question": "एक tree की छाया उसकी height से √3 गुना है। सूर्य का elevation क्या है?",
    "options": [
      "30°",
      "45°",
      "60°",
      "75°"
    ],
    "answer": "30°",
    "explanation": "tanθ=h/(√3h)=1/√3 ⇒ θ=30°।"
  },
  {
    "question": "एक pole की छाया उसकी height/√3 के बराबर है। सूर्य का elevation क्या है?",
    "options": [
      "60°",
      "30°",
      "45°",
      "75°"
    ],
    "answer": "60°",
    "explanation": "tanθ=h/(h/√3)=√3 ⇒ θ=60°।"
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
  id: "trigonometry-tough-set-3",
  subject: "Mathematics",
  title: "Trigonometry Tough Set 3",
  description: "50 tough trigonometry questions for government exam practice.",
  durationMinutes: 45,
  totalQuestions: 50,
  marksPerQuestion: 1,
  negativeMarks: 0.25,
  difficulty: "Hard",
  tags: ["SSC", "CGL", "CPO", "CHSL", "Trigonometry"],
  questions: buildTrigonometryQuestions(trigonometryToughSet3, "trigonometry-tough-set-3")
});
