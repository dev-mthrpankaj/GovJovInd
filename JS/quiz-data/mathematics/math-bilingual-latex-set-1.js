(function () {
    "use strict";

    window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];

    const quizId = "math-bilingual-latex-set-1";

    function text(hi, en) {
        return { hi, en };
    }

    function option(hi, en) {
        return { text: text(hi, en) };
    }

    const questions = [
        {
            topic: "Percentage",
            difficulty: "Moderate",
            question: "If \\(35\\%\\) of a number is \\(140\\), what is the number?",
            questionTextMap: text("यदि किसी संख्या का \\(35\\%\\), \\(140\\) है, तो वह संख्या क्या है?", "If \\(35\\%\\) of a number is \\(140\\), what is the number?"),
            options: [option("\\(300\\)", "\\(300\\)"), option("\\(350\\)", "\\(350\\)"), option("\\(400\\)", "\\(400\\)"), option("\\(450\\)", "\\(450\\)")],
            correctAnswer: 2,
            explanation: "Number \\(=140\\times \\frac{100}{35}=400\\).",
            explanationTextMap: text("संख्या \\(=140\\times \\frac{100}{35}=400\\)।", "Number \\(=140\\times \\frac{100}{35}=400\\).")
        },
        {
            topic: "Profit and Loss",
            difficulty: "Moderate",
            question: "An article is bought for Rs. \\(750\\) and sold for Rs. \\(900\\). Find the profit percentage.",
            questionTextMap: text("एक वस्तु Rs. \\(750\\) में खरीदी गई और Rs. \\(900\\) में बेची गई। लाभ प्रतिशत ज्ञात कीजिए।", "An article is bought for Rs. \\(750\\) and sold for Rs. \\(900\\). Find the profit percentage."),
            options: [option("\\(15\\%\\)", "\\(15\\%\\)"), option("\\(18\\%\\)", "\\(18\\%\\)"), option("\\(20\\%\\)", "\\(20\\%\\)"), option("\\(25\\%\\)", "\\(25\\%\\)")],
            correctAnswer: 2,
            explanation: "Profit \\(=900-750=150\\). Profit percent \\(=\\frac{150}{750}\\times100=20\\%\\).",
            explanationTextMap: text("लाभ \\(=900-750=150\\)। लाभ प्रतिशत \\(=\\frac{150}{750}\\times100=20\\%\\)।", "Profit \\(=900-750=150\\). Profit percent \\(=\\frac{150}{750}\\times100=20\\%\\).")
        },
        {
            topic: "Simple Interest",
            difficulty: "Easy",
            question: "Find simple interest on Rs. \\(6000\\) at \\(8\\%\\) per annum for \\(2\\) years.",
            questionTextMap: text("Rs. \\(6000\\) पर \\(8\\%\\) वार्षिक दर से \\(2\\) वर्ष का साधारण ब्याज ज्ञात कीजिए।", "Find simple interest on Rs. \\(6000\\) at \\(8\\%\\) per annum for \\(2\\) years."),
            options: [option("Rs. \\(860\\)", "Rs. \\(860\\)"), option("Rs. \\(920\\)", "Rs. \\(920\\)"), option("Rs. \\(960\\)", "Rs. \\(960\\)"), option("Rs. \\(1020\\)", "Rs. \\(1020\\)")],
            correctAnswer: 2,
            explanation: "\\(SI=\\frac{PRT}{100}=\\frac{6000\\times8\\times2}{100}=960\\).",
            explanationTextMap: text("\\(SI=\\frac{PRT}{100}=\\frac{6000\\times8\\times2}{100}=960\\)।", "\\(SI=\\frac{PRT}{100}=\\frac{6000\\times8\\times2}{100}=960\\).")
        },
        {
            topic: "Compound Interest",
            difficulty: "Moderate",
            question: "Find compound interest on Rs. \\(10000\\) at \\(10\\%\\) per annum for \\(2\\) years.",
            questionTextMap: text("Rs. \\(10000\\) पर \\(10\\%\\) वार्षिक दर से \\(2\\) वर्ष का चक्रवृद्धि ब्याज ज्ञात कीजिए।", "Find compound interest on Rs. \\(10000\\) at \\(10\\%\\) per annum for \\(2\\) years."),
            options: [option("Rs. \\(2000\\)", "Rs. \\(2000\\)"), option("Rs. \\(2100\\)", "Rs. \\(2100\\)"), option("Rs. \\(2200\\)", "Rs. \\(2200\\)"), option("Rs. \\(2300\\)", "Rs. \\(2300\\)")],
            correctAnswer: 1,
            explanation: "Amount \\(=10000\\left(1+\\frac{10}{100}\\right)^2=12100\\). CI \\(=12100-10000=2100\\).",
            explanationTextMap: text("मिश्रधन \\(=10000\\left(1+\\frac{10}{100}\\right)^2=12100\\)। चक्रवृद्धि ब्याज \\(=12100-10000=2100\\)।", "Amount \\(=10000\\left(1+\\frac{10}{100}\\right)^2=12100\\). CI \\(=12100-10000=2100\\).")
        },
        {
            topic: "Ratio",
            difficulty: "Easy",
            question: "Divide Rs. \\(4800\\) in the ratio \\(5:7\\). Find the larger share.",
            questionTextMap: text("Rs. \\(4800\\) को \\(5:7\\) के अनुपात में बांटा गया। बड़ा हिस्सा ज्ञात कीजिए।", "Divide Rs. \\(4800\\) in the ratio \\(5:7\\). Find the larger share."),
            options: [option("Rs. \\(1800\\)", "Rs. \\(1800\\)"), option("Rs. \\(2000\\)", "Rs. \\(2000\\)"), option("Rs. \\(2400\\)", "Rs. \\(2400\\)"), option("Rs. \\(2800\\)", "Rs. \\(2800\\)")],
            correctAnswer: 3,
            explanation: "Total parts \\(=5+7=12\\). Larger share \\(=4800\\times\\frac{7}{12}=2800\\).",
            explanationTextMap: text("कुल भाग \\(=5+7=12\\)। बड़ा हिस्सा \\(=4800\\times\\frac{7}{12}=2800\\)।", "Total parts \\(=5+7=12\\). Larger share \\(=4800\\times\\frac{7}{12}=2800\\).")
        },
        {
            topic: "Average",
            difficulty: "Easy",
            question: "The average of \\(12,18,20,25\\) and \\(x\\) is \\(20\\). Find \\(x\\).",
            questionTextMap: text("\\(12,18,20,25\\) और \\(x\\) का औसत \\(20\\) है। \\(x\\) ज्ञात कीजिए।", "The average of \\(12,18,20,25\\) and \\(x\\) is \\(20\\). Find \\(x\\)."),
            options: [option("\\(20\\)", "\\(20\\)"), option("\\(25\\)", "\\(25\\)"), option("\\(30\\)", "\\(30\\)"), option("\\(35\\)", "\\(35\\)")],
            correctAnswer: 1,
            explanation: "Total required \\(=20\\times5=100\\). Known sum \\(=75\\), so \\(x=25\\).",
            explanationTextMap: text("कुल योग \\(=20\\times5=100\\)। ज्ञात योग \\(=75\\), अतः \\(x=25\\)।", "Total required \\(=20\\times5=100\\). Known sum \\(=75\\), so \\(x=25\\).")
        },
        {
            topic: "Time and Work",
            difficulty: "Moderate",
            question: "A can do a work in \\(15\\) days and B in \\(20\\) days. In how many days can they finish it together?",
            questionTextMap: text("A किसी काम को \\(15\\) दिन में और B \\(20\\) दिन में करता है। दोनों मिलकर काम कितने दिन में पूरा करेंगे?", "A can do a work in \\(15\\) days and B in \\(20\\) days. In how many days can they finish it together?"),
            options: [option("\\(\\frac{60}{7}\\) days", "\\(\\frac{60}{7}\\) days"), option("\\(8\\) days", "\\(8\\) days"), option("\\(9\\) days", "\\(9\\) days"), option("\\(10\\) days", "\\(10\\) days")],
            correctAnswer: 0,
            explanation: "Combined rate \\(=\\frac{1}{15}+\\frac{1}{20}=\\frac{7}{60}\\). Time \\(=\\frac{60}{7}\\) days.",
            explanationTextMap: text("संयुक्त कार्य-दर \\(=\\frac{1}{15}+\\frac{1}{20}=\\frac{7}{60}\\)। समय \\(=\\frac{60}{7}\\) दिन।", "Combined rate \\(=\\frac{1}{15}+\\frac{1}{20}=\\frac{7}{60}\\). Time \\(=\\frac{60}{7}\\) days.")
        },
        {
            topic: "Pipes and Cistern",
            difficulty: "Moderate",
            question: "A pipe fills a tank in \\(12\\) hours and another empties it in \\(18\\) hours. If both are opened, the tank will be filled in?",
            questionTextMap: text("एक पाइप टंकी को \\(12\\) घंटे में भरता है और दूसरा \\(18\\) घंटे में खाली करता है। दोनों खोलने पर टंकी कितने समय में भरेगी?", "A pipe fills a tank in \\(12\\) hours and another empties it in \\(18\\) hours. If both are opened, the tank will be filled in?"),
            options: [option("\\(24\\) hours", "\\(24\\) hours"), option("\\(30\\) hours", "\\(30\\) hours"), option("\\(36\\) hours", "\\(36\\) hours"), option("\\(40\\) hours", "\\(40\\) hours")],
            correctAnswer: 2,
            explanation: "Net rate \\(=\\frac{1}{12}-\\frac{1}{18}=\\frac{1}{36}\\). Time \\(=36\\) hours.",
            explanationTextMap: text("शुद्ध दर \\(=\\frac{1}{12}-\\frac{1}{18}=\\frac{1}{36}\\)। समय \\(=36\\) घंटे।", "Net rate \\(=\\frac{1}{12}-\\frac{1}{18}=\\frac{1}{36}\\). Time \\(=36\\) hours.")
        },
        {
            topic: "Speed Time Distance",
            difficulty: "Easy",
            question: "A car travels \\(180\\) km in \\(3\\) hours. Find its speed.",
            questionTextMap: text("एक कार \\(3\\) घंटे में \\(180\\) km चलती है। उसकी चाल ज्ञात कीजिए।", "A car travels \\(180\\) km in \\(3\\) hours. Find its speed."),
            options: [option("\\(45\\) km/h", "\\(45\\) km/h"), option("\\(50\\) km/h", "\\(50\\) km/h"), option("\\(60\\) km/h", "\\(60\\) km/h"), option("\\(72\\) km/h", "\\(72\\) km/h")],
            correctAnswer: 2,
            explanation: "Speed \\(=\\frac{180}{3}=60\\) km/h.",
            explanationTextMap: text("चाल \\(=\\frac{180}{3}=60\\) km/h।", "Speed \\(=\\frac{180}{3}=60\\) km/h.")
        },
        {
            topic: "Train",
            difficulty: "Moderate",
            question: "A train \\(150\\) m long crosses a pole in \\(10\\) seconds. Find its speed in km/h.",
            questionTextMap: text("\\(150\\) m लंबी ट्रेन एक खंभे को \\(10\\) सेकंड में पार करती है। उसकी चाल km/h में ज्ञात कीजिए।", "A train \\(150\\) m long crosses a pole in \\(10\\) seconds. Find its speed in km/h."),
            options: [option("\\(45\\) km/h", "\\(45\\) km/h"), option("\\(50\\) km/h", "\\(50\\) km/h"), option("\\(54\\) km/h", "\\(54\\) km/h"), option("\\(60\\) km/h", "\\(60\\) km/h")],
            correctAnswer: 2,
            explanation: "Speed \\(=\\frac{150}{10}=15\\) m/s. In km/h, \\(15\\times\\frac{18}{5}=54\\).",
            explanationTextMap: text("चाल \\(=\\frac{150}{10}=15\\) m/s। km/h में \\(15\\times\\frac{18}{5}=54\\)।", "Speed \\(=\\frac{150}{10}=15\\) m/s. In km/h, \\(15\\times\\frac{18}{5}=54\\).")
        },
        {
            topic: "Boat and Stream",
            difficulty: "Moderate",
            question: "Speed of a boat in still water is \\(12\\) km/h and stream speed is \\(3\\) km/h. Find downstream speed.",
            questionTextMap: text("स्थिर जल में नाव की चाल \\(12\\) km/h और धारा की चाल \\(3\\) km/h है। धारा के अनुकूल चाल ज्ञात कीजिए।", "Speed of a boat in still water is \\(12\\) km/h and stream speed is \\(3\\) km/h. Find downstream speed."),
            options: [option("\\(9\\) km/h", "\\(9\\) km/h"), option("\\(12\\) km/h", "\\(12\\) km/h"), option("\\(15\\) km/h", "\\(15\\) km/h"), option("\\(18\\) km/h", "\\(18\\) km/h")],
            correctAnswer: 2,
            explanation: "Downstream speed \\(=12+3=15\\) km/h.",
            explanationTextMap: text("धारा के अनुकूल चाल \\(=12+3=15\\) km/h।", "Downstream speed \\(=12+3=15\\) km/h.")
        },
        {
            topic: "Mixture",
            difficulty: "Moderate",
            question: "In what ratio should milk costing Rs. \\(40\\)/L be mixed with milk costing Rs. \\(60\\)/L to get a mixture of Rs. \\(48\\)/L?",
            questionTextMap: text("Rs. \\(40\\)/L वाले दूध को Rs. \\(60\\)/L वाले दूध से किस अनुपात में मिलाया जाए ताकि मिश्रण Rs. \\(48\\)/L का हो?", "In what ratio should milk costing Rs. \\(40\\)/L be mixed with milk costing Rs. \\(60\\)/L to get a mixture of Rs. \\(48\\)/L?"),
            options: [option("\\(2:3\\)", "\\(2:3\\)"), option("\\(3:2\\)", "\\(3:2\\)"), option("\\(4:3\\)", "\\(4:3\\)"), option("\\(5:4\\)", "\\(5:4\\)")],
            correctAnswer: 1,
            explanation: "By alligation, ratio \\(=(60-48):(48-40)=12:8=3:2\\).",
            explanationTextMap: text("मिश्रण नियम से अनुपात \\(=(60-48):(48-40)=12:8=3:2\\)।", "By alligation, ratio \\(=(60-48):(48-40)=12:8=3:2\\).")
        },
        {
            topic: "Number System",
            difficulty: "Easy",
            question: "Find the remainder when \\(7^{23}\\) is divided by \\(6\\).",
            questionTextMap: text("\\(7^{23}\\) को \\(6\\) से भाग देने पर शेषफल क्या होगा?", "Find the remainder when \\(7^{23}\\) is divided by \\(6\\)."),
            options: [option("\\(0\\)", "\\(0\\)"), option("\\(1\\)", "\\(1\\)"), option("\\(5\\)", "\\(5\\)"), option("\\(6\\)", "\\(6\\)")],
            correctAnswer: 1,
            explanation: "\\(7\\equiv1\\pmod 6\\), so \\(7^{23}\\equiv1^{23}=1\\pmod 6\\).",
            explanationTextMap: text("\\(7\\equiv1\\pmod 6\\), इसलिए \\(7^{23}\\equiv1^{23}=1\\pmod 6\\)।", "\\(7\\equiv1\\pmod 6\\), so \\(7^{23}\\equiv1^{23}=1\\pmod 6\\).")
        },
        {
            topic: "HCF and LCM",
            difficulty: "Moderate",
            question: "HCF of two numbers is \\(12\\) and their LCM is \\(180\\). If one number is \\(36\\), find the other.",
            questionTextMap: text("दो संख्याओं का HCF \\(12\\) और LCM \\(180\\) है। यदि एक संख्या \\(36\\) है, तो दूसरी संख्या ज्ञात कीजिए।", "HCF of two numbers is \\(12\\) and their LCM is \\(180\\). If one number is \\(36\\), find the other."),
            options: [option("\\(48\\)", "\\(48\\)"), option("\\(60\\)", "\\(60\\)"), option("\\(72\\)", "\\(72\\)"), option("\\(90\\)", "\\(90\\)")],
            correctAnswer: 1,
            explanation: "Product of numbers \\(=HCF\\times LCM=12\\times180\\). Other number \\(=\\frac{2160}{36}=60\\).",
            explanationTextMap: text("संख्याओं का गुणनफल \\(=HCF\\times LCM=12\\times180\\)। दूसरी संख्या \\(=\\frac{2160}{36}=60\\)।", "Product of numbers \\(=HCF\\times LCM=12\\times180\\). Other number \\(=\\frac{2160}{36}=60\\).")
        },
        {
            topic: "Algebra",
            difficulty: "Easy",
            question: "If \\(x+\\frac{1}{x}=5\\), then find \\(x^2+\\frac{1}{x^2}\\).",
            questionTextMap: text("यदि \\(x+\\frac{1}{x}=5\\), तो \\(x^2+\\frac{1}{x^2}\\) ज्ञात कीजिए।", "If \\(x+\\frac{1}{x}=5\\), then find \\(x^2+\\frac{1}{x^2}\\)."),
            options: [option("\\(21\\)", "\\(21\\)"), option("\\(23\\)", "\\(23\\)"), option("\\(25\\)", "\\(25\\)"), option("\\(27\\)", "\\(27\\)")],
            correctAnswer: 1,
            explanation: "Squaring, \\(x^2+\\frac{1}{x^2}+2=25\\). Hence value \\(=23\\).",
            explanationTextMap: text("वर्ग करने पर \\(x^2+\\frac{1}{x^2}+2=25\\)। अतः मान \\(=23\\)।", "Squaring, \\(x^2+\\frac{1}{x^2}+2=25\\). Hence value \\(=23\\).")
        },
        {
            topic: "Simplification",
            difficulty: "Easy",
            question: "Simplify \\(18\\div3+4\\times5-6\\).",
            questionTextMap: text("\\(18\\div3+4\\times5-6\\) को सरल कीजिए।", "Simplify \\(18\\div3+4\\times5-6\\)."),
            options: [option("\\(18\\)", "\\(18\\)"), option("\\(20\\)", "\\(20\\)"), option("\\(22\\)", "\\(22\\)"), option("\\(24\\)", "\\(24\\)")],
            correctAnswer: 1,
            explanation: "Using BODMAS, \\(18\\div3=6\\) and \\(4\\times5=20\\). So \\(6+20-6=20\\).",
            explanationTextMap: text("BODMAS के अनुसार \\(18\\div3=6\\) और \\(4\\times5=20\\)। इसलिए \\(6+20-6=20\\)।", "Using BODMAS, \\(18\\div3=6\\) and \\(4\\times5=20\\). So \\(6+20-6=20\\).")
        },
        {
            topic: "Mensuration Rectangle",
            difficulty: "Easy",
            question: "The length and breadth of a rectangle are \\(18\\) cm and \\(12\\) cm. Find its area.",
            questionTextMap: text("एक आयत की लंबाई \\(18\\) cm और चौड़ाई \\(12\\) cm है। उसका क्षेत्रफल ज्ञात कीजिए।", "The length and breadth of a rectangle are \\(18\\) cm and \\(12\\) cm. Find its area."),
            options: [option("\\(180\\text{ cm}^2\\)", "\\(180\\text{ cm}^2\\)"), option("\\(196\\text{ cm}^2\\)", "\\(196\\text{ cm}^2\\)"), option("\\(216\\text{ cm}^2\\)", "\\(216\\text{ cm}^2\\)"), option("\\(240\\text{ cm}^2\\)", "\\(240\\text{ cm}^2\\)")],
            correctAnswer: 2,
            explanation: "Area \\(=l\\times b=18\\times12=216\\text{ cm}^2\\).",
            explanationTextMap: text("क्षेत्रफल \\(=l\\times b=18\\times12=216\\text{ cm}^2\\)।", "Area \\(=l\\times b=18\\times12=216\\text{ cm}^2\\).")
        },
        {
            topic: "Circle",
            difficulty: "Moderate",
            question: "If radius of a circle is \\(7\\) cm, find its circumference. Use \\(\\pi=\\frac{22}{7}\\).",
            questionTextMap: text("यदि वृत्त की त्रिज्या \\(7\\) cm है, तो उसकी परिधि ज्ञात कीजिए। \\(\\pi=\\frac{22}{7}\\) लें।", "If radius of a circle is \\(7\\) cm, find its circumference. Use \\(\\pi=\\frac{22}{7}\\)."),
            options: [option("\\(22\\) cm", "\\(22\\) cm"), option("\\(44\\) cm", "\\(44\\) cm"), option("\\(49\\) cm", "\\(49\\) cm"), option("\\(154\\) cm", "\\(154\\) cm")],
            correctAnswer: 1,
            explanation: "Circumference \\(=2\\pi r=2\\times\\frac{22}{7}\\times7=44\\) cm.",
            explanationTextMap: text("परिधि \\(=2\\pi r=2\\times\\frac{22}{7}\\times7=44\\) cm।", "Circumference \\(=2\\pi r=2\\times\\frac{22}{7}\\times7=44\\) cm.")
        },
        {
            topic: "Triangle",
            difficulty: "Easy",
            question: "Find the area of a triangle with base \\(16\\) cm and height \\(9\\) cm.",
            questionTextMap: text("\\(16\\) cm आधार और \\(9\\) cm ऊंचाई वाले त्रिभुज का क्षेत्रफल ज्ञात कीजिए।", "Find the area of a triangle with base \\(16\\) cm and height \\(9\\) cm."),
            options: [option("\\(64\\text{ cm}^2\\)", "\\(64\\text{ cm}^2\\)"), option("\\(72\\text{ cm}^2\\)", "\\(72\\text{ cm}^2\\)"), option("\\(80\\text{ cm}^2\\)", "\\(80\\text{ cm}^2\\)"), option("\\(144\\text{ cm}^2\\)", "\\(144\\text{ cm}^2\\)")],
            correctAnswer: 1,
            explanation: "Area \\(=\\frac{1}{2}\\times16\\times9=72\\text{ cm}^2\\).",
            explanationTextMap: text("क्षेत्रफल \\(=\\frac{1}{2}\\times16\\times9=72\\text{ cm}^2\\)।", "Area \\(=\\frac{1}{2}\\times16\\times9=72\\text{ cm}^2\\).")
        },
        {
            topic: "Trigonometry",
            difficulty: "Easy",
            question: "Find the value of \\(\\sin^2 30^\\circ+\\cos^2 30^\\circ\\).",
            questionTextMap: text("\\(\\sin^2 30^\\circ+\\cos^2 30^\\circ\\) का मान ज्ञात कीजिए।", "Find the value of \\(\\sin^2 30^\\circ+\\cos^2 30^\\circ\\)."),
            options: [option("\\(0\\)", "\\(0\\)"), option("\\(\\frac{1}{2}\\)", "\\(\\frac{1}{2}\\)"), option("\\(1\\)", "\\(1\\)"), option("\\(2\\)", "\\(2\\)")],
            correctAnswer: 2,
            explanation: "For any angle \\(\\theta\\), \\(\\sin^2\\theta+\\cos^2\\theta=1\\).",
            explanationTextMap: text("किसी भी कोण \\(\\theta\\) के लिए \\(\\sin^2\\theta+\\cos^2\\theta=1\\)।", "For any angle \\(\\theta\\), \\(\\sin^2\\theta+\\cos^2\\theta=1\\).")
        },
        {
            topic: "Coordinate Geometry",
            difficulty: "Moderate",
            question: "Find the distance between points \\((2,3)\\) and \\((6,6)\\).",
            questionTextMap: text("बिंदुओं \\((2,3)\\) और \\((6,6)\\) के बीच की दूरी ज्ञात कीजिए।", "Find the distance between points \\((2,3)\\) and \\((6,6)\\)."),
            options: [option("\\(4\\)", "\\(4\\)"), option("\\(5\\)", "\\(5\\)"), option("\\(6\\)", "\\(6\\)"), option("\\(7\\)", "\\(7\\)")],
            correctAnswer: 1,
            explanation: "Distance \\(=\\sqrt{(6-2)^2+(6-3)^2}=\\sqrt{16+9}=5\\).",
            explanationTextMap: text("दूरी \\(=\\sqrt{(6-2)^2+(6-3)^2}=\\sqrt{16+9}=5\\)।", "Distance \\(=\\sqrt{(6-2)^2+(6-3)^2}=\\sqrt{16+9}=5\\).")
        },
        {
            topic: "Probability",
            difficulty: "Easy",
            question: "A die is thrown once. What is the probability of getting an even number?",
            questionTextMap: text("एक पासा एक बार फेंका गया। सम संख्या आने की प्रायिकता क्या है?", "A die is thrown once. What is the probability of getting an even number?"),
            options: [option("\\(\\frac{1}{6}\\)", "\\(\\frac{1}{6}\\)"), option("\\(\\frac{1}{3}\\)", "\\(\\frac{1}{3}\\)"), option("\\(\\frac{1}{2}\\)", "\\(\\frac{1}{2}\\)"), option("\\(\\frac{2}{3}\\)", "\\(\\frac{2}{3}\\)")],
            correctAnswer: 2,
            explanation: "Even outcomes are \\(2,4,6\\), so probability \\(=\\frac{3}{6}=\\frac{1}{2}\\).",
            explanationTextMap: text("सम परिणाम \\(2,4,6\\) हैं, अतः प्रायिकता \\(=\\frac{3}{6}=\\frac{1}{2}\\)।", "Even outcomes are \\(2,4,6\\), so probability \\(=\\frac{3}{6}=\\frac{1}{2}\\).")
        },
        {
            topic: "Permutation and Combination",
            difficulty: "Moderate",
            question: "How many ways can \\(3\\) students be selected from \\(8\\) students?",
            questionTextMap: text("\\(8\\) विद्यार्थियों में से \\(3\\) विद्यार्थियों का चयन कितने तरीकों से किया जा सकता है?", "How many ways can \\(3\\) students be selected from \\(8\\) students?"),
            options: [option("\\(24\\)", "\\(24\\)"), option("\\(48\\)", "\\(48\\)"), option("\\(56\\)", "\\(56\\)"), option("\\(336\\)", "\\(336\\)")],
            correctAnswer: 2,
            explanation: "Selections \\(=\\binom{8}{3}=\\frac{8\\times7\\times6}{3\\times2\\times1}=56\\).",
            explanationTextMap: text("चयन \\(=\\binom{8}{3}=\\frac{8\\times7\\times6}{3\\times2\\times1}=56\\)।", "Selections \\(=\\binom{8}{3}=\\frac{8\\times7\\times6}{3\\times2\\times1}=56\\).")
        },
        {
            topic: "Data Interpretation",
            difficulty: "Easy",
            question: "A class has \\(40\\) students. \\(60\\%\\) are boys. How many girls are there?",
            questionTextMap: text("एक कक्षा में \\(40\\) विद्यार्थी हैं। \\(60\\%\\) लड़के हैं। लड़कियों की संख्या कितनी है?", "A class has \\(40\\) students. \\(60\\%\\) are boys. How many girls are there?"),
            options: [option("\\(12\\)", "\\(12\\)"), option("\\(14\\)", "\\(14\\)"), option("\\(16\\)", "\\(16\\)"), option("\\(18\\)", "\\(18\\)")],
            correctAnswer: 2,
            explanation: "Girls are \\(40\\%\\) of \\(40\\), so \\(\\frac{40}{100}\\times40=16\\).",
            explanationTextMap: text("लड़कियां \\(40\\) का \\(40\\%\\) हैं, इसलिए \\(\\frac{40}{100}\\times40=16\\)।", "Girls are \\(40\\%\\) of \\(40\\), so \\(\\frac{40}{100}\\times40=16\\).")
        },
        {
            topic: "Ages",
            difficulty: "Moderate",
            question: "The present age of A is twice the age of B. After \\(5\\) years, their ages will be \\(25\\) and \\(15\\). What is A's present age?",
            questionTextMap: text("A की वर्तमान आयु B की आयु की दोगुनी है। \\(5\\) वर्ष बाद उनकी आयु \\(25\\) और \\(15\\) होगी। A की वर्तमान आयु क्या है?", "The present age of A is twice the age of B. After \\(5\\) years, their ages will be \\(25\\) and \\(15\\). What is A's present age?"),
            options: [option("\\(15\\) years", "\\(15\\) years"), option("\\(20\\) years", "\\(20\\) years"), option("\\(25\\) years", "\\(25\\) years"), option("\\(30\\) years", "\\(30\\) years")],
            correctAnswer: 1,
            explanation: "After \\(5\\) years A is \\(25\\), so present age of A \\(=25-5=20\\) years.",
            explanationTextMap: text("\\(5\\) वर्ष बाद A की आयु \\(25\\) है, इसलिए वर्तमान आयु \\(=25-5=20\\) वर्ष।", "After \\(5\\) years A is \\(25\\), so present age of A \\(=25-5=20\\) years.")
        }
    ].map((question, index) => ({
        id: `${quizId}-q${String(index + 1).padStart(2, "0")}`,
        subject: "Mathematics",
        marks: 1,
        negativeMarks: 0.25,
        ...question
    }));

    window.GJU_QUIZ_BANK.push({
        id: quizId,
        subject: "Mathematics",
        title: "Maths Bilingual LaTeX Practice Set 1",
        description: "25 bilingual Hindi-English mathematics questions with LaTeX formatting across important government exam topics.",
        durationMinutes: 20,
        totalQuestions: questions.length,
        marksPerQuestion: 1,
        negativeMarks: 0.25,
        difficulty: "Mixed",
        tags: ["SSC", "Railway", "Police", "Mathematics", "Bilingual", "LaTeX"],
        questions
    });
}());
