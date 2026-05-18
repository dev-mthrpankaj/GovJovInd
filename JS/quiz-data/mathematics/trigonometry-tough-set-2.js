// Trigonometry Tough Set 2 - 50 Questions
// Split from original trigonometry quiz pack

const trigonometryToughSet2 = [
  {
    "question": "0° ≤ x ≤ 360° में sinx = 1/2 के कितने solutions हैं?",
    "options": [
      "1",
      "2",
      "3",
      "4"
    ],
    "answer": "2",
    "explanation": "sinx=1/2 के solutions 30° और 150° हैं।"
  },
  {
    "question": "0° ≤ x ≤ 360° में cosx = -1/2 के कितने solutions हैं?",
    "options": [
      "1",
      "2",
      "3",
      "4"
    ],
    "answer": "2",
    "explanation": "cosx=-1/2 के solutions 120° और 240° हैं।"
  },
  {
    "question": "0° ≤ x ≤ 360° में tanx = 1 के कितने solutions हैं?",
    "options": [
      "1",
      "2",
      "3",
      "4"
    ],
    "answer": "2",
    "explanation": "tanx=1 के solutions 45° और 225° हैं।"
  },
  {
    "question": "0° ≤ x < 360° में 2sinx - 1 = 0 के solutions का योग क्या है?",
    "options": [
      "180°",
      "210°",
      "240°",
      "360°"
    ],
    "answer": "180°",
    "explanation": "sinx=1/2 ⇒ x=30°,150°. योग=180°।"
  },
  {
    "question": "0° ≤ x < 360° में 2cosx + 1 = 0 के solutions का योग क्या है?",
    "options": [
      "360°",
      "180°",
      "240°",
      "120°"
    ],
    "answer": "360°",
    "explanation": "cosx=-1/2 ⇒ x=120°,240°. योग=360°।"
  },
  {
    "question": "0° ≤ x < 360° में tanx = √3 के solutions का अंतर क्या है?",
    "options": [
      "180°",
      "120°",
      "60°",
      "90°"
    ],
    "answer": "180°",
    "explanation": "tanx=√3 ⇒ x=60°,240°. अंतर=180°।"
  },
  {
    "question": "यदि sin²x = 1/4 और 0°≤x<180°, तो x के possible values क्या हैं?",
    "options": [
      "30°,150°",
      "60°,120°",
      "45°,135°",
      "0°,180°"
    ],
    "answer": "30°,150°",
    "explanation": "sin²x=1/4 ⇒ sinx=1/2 in this interval ⇒ 30°,150°।"
  },
  {
    "question": "यदि cos²x = 3/4 और 0°≤x<180°, तो x के possible values क्या हैं?",
    "options": [
      "30°,150°",
      "60°,120°",
      "45°,135°",
      "0°,90°"
    ],
    "answer": "30°,150°",
    "explanation": "cos²x=3/4 ⇒ |cosx|=√3/2 ⇒ x=30°,150°।"
  },
  {
    "question": "यदि tan²x = 3 और 0°≤x<180°, तो x के possible values क्या हैं?",
    "options": [
      "60°,120°",
      "30°,150°",
      "45°,135°",
      "0°,90°"
    ],
    "answer": "60°,120°",
    "explanation": "tan²x=3 ⇒ tanx=±√3 ⇒ x=60°,120°।"
  },
  {
    "question": "यदि sinx + cosx = 1, तो sin2x का मान क्या होगा?",
    "options": [
      "0",
      "1",
      "-1",
      "1/2"
    ],
    "answer": "0",
    "explanation": "Square करने पर 1+sin2x=1 ⇒ sin2x=0।"
  },
  {
    "question": "यदि sinx + cosx = √3, तो sin2x का मान क्या होगा?",
    "options": [
      "2",
      "1",
      "1/2",
      "Not possible"
    ],
    "answer": "Not possible",
    "explanation": "sinx+cosx का maximum √2 होता है। √3 > √2, इसलिए real x possible नहीं।"
  },
  {
    "question": "यदि sinx - cosx = √2, तो x का principal value क्या होगा?",
    "options": [
      "135°",
      "45°",
      "225°",
      "315°"
    ],
    "answer": "135°",
    "explanation": "sinx-cosx=√2 sin(x-45°). यह √2 तब होगा जब sin(x-45°)=1 ⇒ x=135°।"
  },
  {
    "question": "यदि sinx + cosx = -√2, तो x का principal value क्या होगा?",
    "options": [
      "225°",
      "135°",
      "315°",
      "45°"
    ],
    "answer": "225°",
    "explanation": "sinx+cosx=√2 sin(x+45°). =-√2 तब जब sin(x+45°)=-1 ⇒ x=225°।"
  },
  {
    "question": "यदि 2sin²x - 3sinx + 1 = 0, तो sinx के values क्या होंगे?",
    "options": [
      "1, 1/2",
      "1, -1/2",
      "-1, 1/2",
      "0, 1"
    ],
    "answer": "1, 1/2",
    "explanation": "Factor: (2sinx-1)(sinx-1)=0 ⇒ sinx=1/2 या 1।"
  },
  {
    "question": "यदि 2cos²x - cosx - 1 = 0, तो cosx के values क्या होंगे?",
    "options": [
      "1, -1/2",
      "-1, 1/2",
      "1, 1/2",
      "-1, -1/2"
    ],
    "answer": "1, -1/2",
    "explanation": "Factor: (2cosx+1)(cosx-1)=0 ⇒ cosx=1 या -1/2।"
  },
  {
    "question": "यदि tan²x - 4tanx + 3 = 0, तो tanx के values क्या होंगे?",
    "options": [
      "1,3",
      "-1,-3",
      "1,-3",
      "-1,3"
    ],
    "answer": "1,3",
    "explanation": "Factor: (tanx-1)(tanx-3)=0।"
  },
  {
    "question": "यदि sec²x = 4 और x acute है, तो tanx का मान क्या होगा?",
    "options": [
      "√3",
      "1/√3",
      "2",
      "3"
    ],
    "answer": "√3",
    "explanation": "secx=2 ⇒ cosx=1/2 ⇒ x=60°, tanx=√3।"
  },
  {
    "question": "यदि cosec²x = 4 और x acute है, तो cotx का मान क्या होगा?",
    "options": [
      "√3",
      "1/√3",
      "2",
      "3"
    ],
    "answer": "√3",
    "explanation": "cosecx=2 ⇒ sinx=1/2 ⇒ x=30°, cotx=√3।"
  },
  {
    "question": "यदि sin3x = cos2x और x acute है, तो x का मान क्या होगा?",
    "options": [
      "18°",
      "36°",
      "30°",
      "45°"
    ],
    "answer": "18°",
    "explanation": "cos2x=sin(90°-2x). इसलिए 3x=90°-2x ⇒ x=18°।"
  },
  {
    "question": "यदि cos4x = sinx और x acute है, तो x का मान क्या होगा?",
    "options": [
      "18°",
      "30°",
      "36°",
      "45°"
    ],
    "answer": "18°",
    "explanation": "sinx=cos(90°-x). अतः 4x=90°-x ⇒ 5x=90° ⇒ x=18°।"
  },
  {
    "question": "यदि tan5x = cot4x और x acute है, तो x का मान क्या होगा?",
    "options": [
      "10°",
      "18°",
      "20°",
      "30°"
    ],
    "answer": "10°",
    "explanation": "cot4x=tan(90°-4x). अतः 5x=90°-4x ⇒ 9x=90° ⇒ x=10°।"
  },
  {
    "question": "यदि sin(x+20°)=cos(2x+10°), तो x का मान क्या होगा?",
    "options": [
      "20°",
      "30°",
      "40°",
      "50°"
    ],
    "answer": "20°",
    "explanation": "cos(2x+10)=sin(80°-2x). अतः x+20=80-2x ⇒ 3x=60 ⇒ x=20°।"
  },
  {
    "question": "यदि cos(x+30°)=sin(2x), तो x का मान क्या होगा?",
    "options": [
      "20°",
      "30°",
      "40°",
      "60°"
    ],
    "answer": "20°",
    "explanation": "sin2x=cos(90°-2x). अतः x+30=90-2x ⇒ x=20°।"
  },
  {
    "question": "यदि tan(3x)=1 और 0°<x<60°, तो x का मान क्या होगा?",
    "options": [
      "15°",
      "30°",
      "45°",
      "10°"
    ],
    "answer": "15°",
    "explanation": "tan3x=1 ⇒ 3x=45° ⇒ x=15°।"
  },
  {
    "question": "यदि cot(2x)=√3 और x acute है, तो x का मान क्या होगा?",
    "options": [
      "15°",
      "30°",
      "45°",
      "60°"
    ],
    "answer": "15°",
    "explanation": "cot2x=√3 ⇒ 2x=30° ⇒ x=15°।"
  },
  {
    "question": "यदि sec(3x)=2 और x acute है, तो x का मान क्या होगा?",
    "options": [
      "20°",
      "30°",
      "10°",
      "15°"
    ],
    "answer": "20°",
    "explanation": "sec3x=2 ⇒ cos3x=1/2 ⇒ 3x=60° ⇒ x=20°।"
  },
  {
    "question": "यदि cosec(4x)=2 और x acute है, तो x का छोटा मान क्या होगा?",
    "options": [
      "7.5°",
      "15°",
      "30°",
      "45°"
    ],
    "answer": "7.5°",
    "explanation": "cosec4x=2 ⇒ sin4x=1/2 ⇒ 4x=30° छोटा मान ⇒ x=7.5°।"
  },
  {
    "question": "यदि 1 + tan²x = 4 और x acute है, तो x का मान क्या होगा?",
    "options": [
      "60°",
      "30°",
      "45°",
      "15°"
    ],
    "answer": "60°",
    "explanation": "1+tan²x=sec²x=4 ⇒ secx=2 ⇒ x=60°।"
  },
  {
    "question": "यदि 1 + cot²x = 4 और x acute है, तो x का मान क्या होगा?",
    "options": [
      "30°",
      "60°",
      "45°",
      "75°"
    ],
    "answer": "30°",
    "explanation": "1+cot²x=cosec²x=4 ⇒ cosecx=2 ⇒ x=30°।"
  },
  {
    "question": "यदि sin²x + 2sinx + 1 = 0, तो sinx का मान क्या होगा?",
    "options": [
      "-1",
      "0",
      "1",
      "1/2"
    ],
    "answer": "-1",
    "explanation": "यह (sinx+1)²=0 है। इसलिए sinx=-1।"
  },
  {
    "question": "यदि cos²x - 2cosx + 1 = 0, तो x का principal value क्या होगा?",
    "options": [
      "0°",
      "90°",
      "180°",
      "270°"
    ],
    "answer": "0°",
    "explanation": "(cosx-1)²=0 ⇒ cosx=1 ⇒ principal value 0°।"
  },
  {
    "question": "यदि tan²x - 1 = 0 और 0°≤x<180°, तो x के values क्या हैं?",
    "options": [
      "45°,135°",
      "30°,150°",
      "60°,120°",
      "0°,90°"
    ],
    "answer": "45°,135°",
    "explanation": "tan²x=1 ⇒ tanx=±1 ⇒ 45°,135°।"
  },
  {
    "question": "यदि sinx cosx = 1/4, तो sin2x का मान क्या होगा?",
    "options": [
      "1/2",
      "1/4",
      "1",
      "0"
    ],
    "answer": "1/2",
    "explanation": "sin2x=2sinxcosx=2×1/4=1/2।"
  },
  {
    "question": "यदि sinx cosx = √3/4, तो sin2x का मान क्या होगा?",
    "options": [
      "√3/2",
      "1/2",
      "1",
      "√3/4"
    ],
    "answer": "√3/2",
    "explanation": "sin2x=2sinxcosx=√3/2।"
  },
  {
    "question": "यदि sin2x = √3/2 और x acute है, तो x का छोटा मान क्या होगा?",
    "options": [
      "30°",
      "15°",
      "45°",
      "60°"
    ],
    "answer": "30°",
    "explanation": "2x=60° छोटा solution ⇒ x=30°।"
  },
  {
    "question": "यदि cos2x = 1/2 और x acute है, तो x का छोटा मान क्या होगा?",
    "options": [
      "30°",
      "45°",
      "60°",
      "15°"
    ],
    "answer": "30°",
    "explanation": "cos2x=1/2 ⇒ 2x=60° ⇒ x=30°।"
  },
  {
    "question": "यदि tan2x = √3 और x acute है, तो x का छोटा मान क्या होगा?",
    "options": [
      "30°",
      "15°",
      "45°",
      "60°"
    ],
    "answer": "30°",
    "explanation": "tan2x=√3 ⇒ 2x=60° ⇒ x=30°।"
  },
  {
    "question": "यदि tanx + cotx = 2, तो x का acute value क्या होगा?",
    "options": [
      "45°",
      "30°",
      "60°",
      "15°"
    ],
    "answer": "45°",
    "explanation": "tanx+cotx का minimum 2 है और यह tanx=1 यानी x=45° पर आता है।"
  },
  {
    "question": "यदि secx + cosecx का minimum मान चाहिए, तो x acute में कौन सा होगा?",
    "options": [
      "2√2",
      "2",
      "√2",
      "4"
    ],
    "answer": "2√2",
    "explanation": "secx+cosecx = 1/cosx + 1/sinx का minimum x=45° पर 2√2 है।"
  },
  {
    "question": "यदि sinx + cosx का maximum मान क्या है?",
    "options": [
      "√2",
      "1",
      "2",
      "1/√2"
    ],
    "answer": "√2",
    "explanation": "sinx+cosx = √2 sin(x+45°), maximum √2।"
  },
  {
    "question": "यदि sinx - cosx का minimum मान क्या है?",
    "options": [
      "-√2",
      "√2",
      "-1",
      "0"
    ],
    "answer": "-√2",
    "explanation": "sinx-cosx = √2 sin(x-45°), minimum -√2।"
  },
  {
    "question": "यदि 3sinx + 4cosx का maximum मान क्या है?",
    "options": [
      "5",
      "7",
      "1",
      "25"
    ],
    "answer": "5",
    "explanation": "a sinx + b cosx का maximum √(a²+b²)=√(9+16)=5।"
  },
  {
    "question": "यदि 5sinx - 12cosx का maximum मान क्या है?",
    "options": [
      "13",
      "17",
      "7",
      "12"
    ],
    "answer": "13",
    "explanation": "Maximum = √(5²+12²)=13।"
  },
  {
    "question": "यदि 8cosx + 15sinx का minimum मान क्या है?",
    "options": [
      "-17",
      "17",
      "-23",
      "0"
    ],
    "answer": "-17",
    "explanation": "Expression का range [-√(8²+15²), √(...)] = [-17,17]।"
  },
  {
    "question": "यदि sinx + cosx = 1/2 हो, तो sin2x का मान क्या होगा?",
    "options": [
      "-3/4",
      "3/4",
      "1/4",
      "-1/4"
    ],
    "answer": "-3/4",
    "explanation": "Square: 1+sin2x = 1/4 ⇒ sin2x=-3/4।"
  },
  {
    "question": "यदि sinx - cosx = 1/2 हो, तो sin2x का मान क्या होगा?",
    "options": [
      "3/4",
      "-3/4",
      "1/4",
      "-1/4"
    ],
    "answer": "3/4",
    "explanation": "Square: 1-sin2x=1/4 ⇒ sin2x=3/4।"
  },
  {
    "question": "यदि tanx = 2tan30°, तो tanx का मान क्या है?",
    "options": [
      "2/√3",
      "√3/2",
      "1/√3",
      "√3"
    ],
    "answer": "2/√3",
    "explanation": "tan30°=1/√3, अतः tanx=2/√3।"
  },
  {
    "question": "यदि sinx = cos2x और x acute है, तो x का मान क्या होगा?",
    "options": [
      "30°",
      "45°",
      "60°",
      "15°"
    ],
    "answer": "30°",
    "explanation": "cos2x=sin(90°-2x). अतः x=90°-2x ⇒ x=30°।"
  },
  {
    "question": "यदि cosx = sin3x और x acute है, तो x का मान क्या होगा?",
    "options": [
      "22.5°",
      "30°",
      "45°",
      "60°"
    ],
    "answer": "22.5°",
    "explanation": "cosx=sin(90°-x). अतः 3x=90°-x ⇒ 4x=90° ⇒ x=22.5°।"
  },
  {
    "question": "यदि tanx = cot2x और x acute है, तो x का मान क्या होगा?",
    "options": [
      "30°",
      "45°",
      "60°",
      "15°"
    ],
    "answer": "30°",
    "explanation": "cot2x=tan(90°-2x). अतः x=90°-2x ⇒ x=30°।"
  }
];

// Registry Code
quizMeta("trigonometry-tough-set-2", "Maths", "Trigonometry Tough Set 2", "Trigonometry", trigonometryToughSet2);
