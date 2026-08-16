(function () {
    "use strict";

    window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];

    const quizId = "ssc-cgl-quant-pyq-2025-set-3";

    function text(hi, en) {
        return { hi, en };
    }

    function option(hi, en) {
        return { text: text(hi, en) };
    }

    const questions = [
        {
            topic: "Profit and Loss",
            difficulty: "Moderate",
            question: "A shopkeeper sells rice at a discount of \\(6\\%\\) on the marked price but uses a weight that is \\(25\\%\\) less than the actual weight. Find his overall profit percentage.",
            questionTextMap: text("एक दुकानदार चावल को अंकित मूल्य पर \\(6\\%\\) की छूट देकर बेचता है, लेकिन वास्तविक वजन से \\(25\\%\\) कम वजन देता है। उसका कुल लाभ प्रतिशत ज्ञात कीजिए।", "A shopkeeper sells rice at a discount of \\(6\\%\\) on the marked price but uses a weight that is \\(25\\%\\) less than the actual weight. Find his overall profit percentage."),
            options: [
                option("\\(20.5\\%\\)", "\\(20.5\\%\\)"),
                option("\\(22.5\\%\\)", "\\(22.5\\%\\)"),
                option("\\(25.3\\%\\)", "\\(25.3\\%\\)"),
                option("\\(26.5\\%\\)", "\\(26.5\\%\\)")
            ],
            correctAnswer: 2,
            explanation: "Take the marked price and cost price of \\(1\\text{ kg}\\) as \\(100\\). After a \\(6\\%\\) discount, the customer pays \\(94\\), but receives only \\(75\\%\\) of the actual weight. Cost of the supplied quantity \\(=75\\). Profit percentage \\(=\\frac{94-75}{75}\\times100\\approx25.3\\%\\).",
            explanationTextMap: text("मान लें \\(1\\text{ kg}\\) चावल का अंकित मूल्य और लागत मूल्य \\(100\\) है। \\(6\\%\\) छूट के बाद ग्राहक \\(94\\) देता है, लेकिन उसे केवल \\(75\\%\\) वास्तविक वजन मिलता है। दी गई मात्रा की लागत \\(=75\\)। लाभ प्रतिशत \\(=\\frac{94-75}{75}\\times100\\approx25.3\\%\\)।", "Take the marked price and cost price of \\(1\\text{ kg}\\) as \\(100\\). After a \\(6\\%\\) discount, the customer pays \\(94\\), but receives only \\(75\\%\\) of the actual weight. Cost of the supplied quantity \\(=75\\). Profit percentage \\(=\\frac{94-75}{75}\\times100\\approx25.3\\%\\).")
        },
        {
            topic: "Profit and Loss",
            difficulty: "Easy",
            question: "The profit made on an article sold for \\(\\text{Rs. }2400\\) is equal to the loss incurred when it is sold for \\(\\text{Rs. }2000\\). What will be the profit or loss percentage if the article is sold for \\(\\text{Rs. }2200\\)?",
            questionTextMap: text("किसी वस्तु को \\(\\text{Rs. }2400\\) में बेचने पर होने वाला लाभ, उसे \\(\\text{Rs. }2000\\) में बेचने पर होने वाली हानि के बराबर है। यदि वस्तु को \\(\\text{Rs. }2200\\) में बेचा जाए तो लाभ या हानि प्रतिशत क्या होगा?", "The profit made on an article sold for \\(\\text{Rs. }2400\\) is equal to the loss incurred when it is sold for \\(\\text{Rs. }2000\\). What will be the profit or loss percentage if the article is sold for \\(\\text{Rs. }2200\\)?"),
            options: [
                option("\\(2.5\\%\\) लाभ", "Profit of \\(2.5\\%\\)"),
                option("\\(3.125\\%\\) लाभ", "Profit of \\(3.125\\%\\)"),
                option("\\(3.125\\%\\) हानि", "Loss of \\(3.125\\%\\)"),
                option("न लाभ, न हानि", "No loss, no profit")
            ],
            correctAnswer: 3,
            explanation: "Equal profit and loss imply the cost price is the average of the two selling prices: \\(\\frac{2400+2000}{2}=2200\\). Therefore, selling at \\(\\text{Rs. }2200\\) gives neither profit nor loss.",
            explanationTextMap: text("समान लाभ और हानि होने पर लागत मूल्य दोनों विक्रय मूल्यों का औसत होगा: \\(\\frac{2400+2000}{2}=2200\\)। अतः \\(\\text{Rs. }2200\\) में बेचने पर न लाभ होगा, न हानि।", "Equal profit and loss imply the cost price is the average of the two selling prices: \\(\\frac{2400+2000}{2}=2200\\). Therefore, selling at \\(\\text{Rs. }2200\\) gives neither profit nor loss.")
        },
        {
            topic: "Mensuration",
            difficulty: "Easy",
            question: "A right circular cone has a radius of \\(9\\text{ cm}\\) and a height of \\(40\\text{ cm}\\). What is its slant height?",
            questionTextMap: text("एक समवृत्त शंकु की त्रिज्या \\(9\\text{ cm}\\) और ऊंचाई \\(40\\text{ cm}\\) है। इसकी तिर्यक ऊंचाई क्या है?", "A right circular cone has a radius of \\(9\\text{ cm}\\) and a height of \\(40\\text{ cm}\\). What is its slant height?"),
            options: [
                option("\\(41\\text{ cm}\\)", "\\(41\\text{ cm}\\)"),
                option("\\(42\\text{ cm}\\)", "\\(42\\text{ cm}\\)"),
                option("\\(43\\text{ cm}\\)", "\\(43\\text{ cm}\\)"),
                option("\\(45\\text{ cm}\\)", "\\(45\\text{ cm}\\)")
            ],
            correctAnswer: 0,
            explanation: "For a right circular cone, slant height \\(l=\\sqrt{r^2+h^2}\\). Thus \\(l=\\sqrt{9^2+40^2}=\\sqrt{1681}=41\\text{ cm}\\).",
            explanationTextMap: text("समवृत्त शंकु के लिए तिर्यक ऊंचाई \\(l=\\sqrt{r^2+h^2}\\)। अतः \\(l=\\sqrt{9^2+40^2}=\\sqrt{1681}=41\\text{ cm}\\)।", "For a right circular cone, slant height \\(l=\\sqrt{r^2+h^2}\\). Thus \\(l=\\sqrt{9^2+40^2}=\\sqrt{1681}=41\\text{ cm}\\).")
        },
        {
            topic: "Ratio and Proportion",
            difficulty: "Moderate",
            question: "If \\(40\\%\\) of \\(P=0.5\\) of \\(Q=\\frac{1}{8}\\) of \\(R\\), find \\(P:Q:R\\).",
            questionTextMap: text("यदि \\(P\\) का \\(40\\% = Q\\) का \\(0.5 = R\\) का \\(\\frac{1}{8}\\) है, तो \\(P:Q:R\\) ज्ञात कीजिए।", "If \\(40\\%\\) of \\(P=0.5\\) of \\(Q=\\frac{1}{8}\\) of \\(R\\), find \\(P:Q:R\\)."),
            options: [
                option("\\(5:4:16\\)", "\\(5:4:16\\)"),
                option("\\(4:5:16\\)", "\\(4:5:16\\)"),
                option("\\(2:5:8\\)", "\\(2:5:8\\)"),
                option("\\(4:5:8\\)", "\\(4:5:8\\)")
            ],
            correctAnswer: 0,
            explanation: "Let the common value be \\(k\\). Then \\(0.4P=k\\Rightarrow P=\\frac{5k}{2}\\), \\(0.5Q=k\\Rightarrow Q=2k\\), and \\(\\frac{R}{8}=k\\Rightarrow R=8k\\). Hence \\(P:Q:R=\\frac{5}{2}:2:8=5:4:16\\).",
            explanationTextMap: text("समान मान \\(k\\) मान लें। तब \\(0.4P=k\\Rightarrow P=\\frac{5k}{2}\\), \\(0.5Q=k\\Rightarrow Q=2k\\), और \\(\\frac{R}{8}=k\\Rightarrow R=8k\\)। अतः \\(P:Q:R=\\frac{5}{2}:2:8=5:4:16\\)।", "Let the common value be \\(k\\). Then \\(0.4P=k\\Rightarrow P=\\frac{5k}{2}\\), \\(0.5Q=k\\Rightarrow Q=2k\\), and \\(\\frac{R}{8}=k\\Rightarrow R=8k\\). Hence \\(P:Q:R=\\frac{5}{2}:2:8=5:4:16\\).")
        },
        {
            topic: "Percentage",
            difficulty: "Moderate",
            question: "Evaluate: \\(15\\frac{1}{3}\\%\\text{ of }480\\text{ km}+58\\frac{1}{3}\\%\\text{ of }300\\text{ km}\\).",
            questionTextMap: text("मान ज्ञात कीजिए: \\(480\\text{ km}\\) का \\(15\\frac{1}{3}\\% + 300\\text{ km}\\) का \\(58\\frac{1}{3}\\%\\)।", "Evaluate: \\(15\\frac{1}{3}\\%\\text{ of }480\\text{ km}+58\\frac{1}{3}\\%\\text{ of }300\\text{ km}\\)."),
            options: [
                option("\\(266.6\\text{ km}\\)", "\\(266.6\\text{ km}\\)"),
                option("\\(285.5\\text{ km}\\)", "\\(285.5\\text{ km}\\)"),
                option("\\(248.6\\text{ km}\\)", "\\(248.6\\text{ km}\\)"),
                option("\\(320\\text{ km}\\)", "\\(320\\text{ km}\\)")
            ],
            correctAnswer: 2,
            explanation: "\\(15\\frac{1}{3}\\%=\\frac{23}{150}\\), so \\(480\\times\\frac{23}{150}=73.6\\text{ km}\\). Also, \\(58\\frac{1}{3}\\%=\\frac{7}{12}\\), so \\(300\\times\\frac{7}{12}=175\\text{ km}\\). Total \\(=73.6+175=248.6\\text{ km}\\).",
            explanationTextMap: text("\\(15\\frac{1}{3}\\%=\\frac{23}{150}\\), अतः \\(480\\times\\frac{23}{150}=73.6\\text{ km}\\)। साथ ही, \\(58\\frac{1}{3}\\%=\\frac{7}{12}\\), अतः \\(300\\times\\frac{7}{12}=175\\text{ km}\\)। कुल \\(=73.6+175=248.6\\text{ km}\\)।", "\\(15\\frac{1}{3}\\%=\\frac{23}{150}\\), so \\(480\\times\\frac{23}{150}=73.6\\text{ km}\\). Also, \\(58\\frac{1}{3}\\%=\\frac{7}{12}\\), so \\(300\\times\\frac{7}{12}=175\\text{ km}\\). Total \\(=73.6+175=248.6\\text{ km}\\).")
        },
        {
            topic: "Percentage",
            difficulty: "Easy",
            question: "A sales agent earns \\(3\\%\\) commission on laptops priced at \\(\\text{Rs. }40000\\) each and \\(8\\%\\) commission on printers priced at \\(\\text{Rs. }8000\\) each. If in a week he sells \\(4\\) laptops and \\(10\\) printers, what is his total commission for \\(5\\) such weeks?",
            questionTextMap: text("एक बिक्री एजेंट को प्रत्येक \\(\\text{Rs. }40000\\) कीमत वाले लैपटॉप पर \\(3\\%\\) और प्रत्येक \\(\\text{Rs. }8000\\) कीमत वाले प्रिंटर पर \\(8\\%\\) कमीशन मिलता है। यदि वह एक सप्ताह में \\(4\\) लैपटॉप और \\(10\\) प्रिंटर बेचता है, तो ऐसे \\(5\\) सप्ताह का उसका कुल कमीशन कितना होगा?", "A sales agent earns \\(3\\%\\) commission on laptops priced at \\(\\text{Rs. }40000\\) each and \\(8\\%\\) commission on printers priced at \\(\\text{Rs. }8000\\) each. If in a week he sells \\(4\\) laptops and \\(10\\) printers, what is his total commission for \\(5\\) such weeks?"),
            options: [
                option("\\(\\text{Rs. }52000\\)", "\\(\\text{Rs. }52000\\)"),
                option("\\(\\text{Rs. }50400\\)", "\\(\\text{Rs. }50400\\)"),
                option("\\(\\text{Rs. }56000\\)", "\\(\\text{Rs. }56000\\)"),
                option("\\(\\text{Rs. }51200\\)", "\\(\\text{Rs. }51200\\)")
            ],
            correctAnswer: 2,
            explanation: "Weekly laptop commission \\(=4\\times40000\\times3\\%=4800\\). Weekly printer commission \\(=10\\times8000\\times8\\%=6400\\). Weekly total \\(=11200\\), so for \\(5\\) weeks: \\(11200\\times5=56000\\).",
            explanationTextMap: text("साप्ताहिक लैपटॉप कमीशन \\(=4\\times40000\\times3\\%=4800\\)। साप्ताहिक प्रिंटर कमीशन \\(=10\\times8000\\times8\\%=6400\\)। साप्ताहिक कुल \\(=11200\\), इसलिए \\(5\\) सप्ताह के लिए \\(11200\\times5=56000\\)।", "Weekly laptop commission \\(=4\\times40000\\times3\\%=4800\\). Weekly printer commission \\(=10\\times8000\\times8\\%=6400\\). Weekly total \\(=11200\\), so for \\(5\\) weeks: \\(11200\\times5=56000\\).")
        },
                {
            topic: "Percentage",
            difficulty: "Easy",
            question: "The radius of a circular plate is increased by \\(8\\%\\). What will be the approximate percentage increase in its area?",
            questionTextMap: text("एक वृत्ताकार प्लेट की त्रिज्या \\(8\\%\\) बढ़ा दी जाती है। उसके क्षेत्रफल में लगभग कितने प्रतिशत की वृद्धि होगी?", "The radius of a circular plate is increased by \\(8\\%\\). What will be the approximate percentage increase in its area?"),
            options: [option("\\(8\\%\\)", "\\(8\\%\\)"), option("\\(15\\%\\)", "\\(15\\%\\)"), option("\\(16.64\\%\\)", "\\(16.64\\%\\)"), option("\\(17.28\\%\\)", "\\(17.28\\%\\)")],
            correctAnswer: 2,
            explanation: "Area is proportional to \\(r^2\\). New area factor \\(=(1.08)^2=1.1664\\). Hence the increase is \\(16.64\\%\\).",
            explanationTextMap: text("क्षेत्रफल \\(r^2\\) के समानुपाती है। नया क्षेत्रफल गुणक \\(=(1.08)^2=1.1664\\)। अतः वृद्धि \\(16.64\\%\\) है।", "Area is proportional to \\(r^2\\). New area factor \\(=(1.08)^2=1.1664\\). Hence the increase is \\(16.64\\%\\).")
        },
        {
            topic: "Mensuration",
            difficulty: "Easy",
            question: "A rectangular prism has a base area of \\(36\\text{ cm}^2\\). If its height is increased by \\(25\\%\\) from the original height of \\(12\\text{ cm}\\), what is the new volume?",
            questionTextMap: text("एक आयताकार प्रिज्म का आधार क्षेत्रफल \\(36\\text{ cm}^2\\) है। यदि इसकी \\(12\\text{ cm}\\) की मूल ऊंचाई में \\(25\\%\\) की वृद्धि की जाए, तो नया आयतन क्या होगा?", "A rectangular prism has a base area of \\(36\\text{ cm}^2\\). If its height is increased by \\(25\\%\\) from the original height of \\(12\\text{ cm}\\), what is the new volume?"),
            options: [option("\\(432\\text{ cm}^3\\)", "\\(432\\text{ cm}^3\\)"), option("\\(486\\text{ cm}^3\\)", "\\(486\\text{ cm}^3\\)"), option("\\(504\\text{ cm}^3\\)", "\\(504\\text{ cm}^3\\)"), option("\\(540\\text{ cm}^3\\)", "\\(540\\text{ cm}^3\\)")],
            correctAnswer: 3,
            explanation: "New height \\(=12\\times1.25=15\\text{ cm}\\). Volume \\(=\\text{base area}\\times\\text{height}=36\\times15=540\\text{ cm}^3\\).",
            explanationTextMap: text("नई ऊंचाई \\(=12\\times1.25=15\\text{ cm}\\)। आयतन \\(=\\text{आधार क्षेत्रफल}\\times\\text{ऊंचाई}=36\\times15=540\\text{ cm}^3\\)।", "New height \\(=12\\times1.25=15\\text{ cm}\\). Volume \\(=\\text{base area}\\times\\text{height}=36\\times15=540\\text{ cm}^3\\).")
        },
        {
            topic: "Mensuration",
            difficulty: "Moderate",
            question: "A solid metal sphere of radius \\(6\\text{ cm}\\) is completely immersed in a vertical cylindrical vessel containing water, causing the water level to rise by \\(4\\text{ cm}\\). What is the radius of the cylinder?",
            questionTextMap: text("\\(6\\text{ cm}\\) त्रिज्या वाला एक ठोस धातु का गोला पानी से भरे एक ऊर्ध्वाधर बेलनाकार पात्र में पूरी तरह डुबोया जाता है, जिससे जल स्तर \\(4\\text{ cm}\\) बढ़ जाता है। बेलन की त्रिज्या क्या है?", "A solid metal sphere of radius \\(6\\text{ cm}\\) is completely immersed in a vertical cylindrical vessel containing water, causing the water level to rise by \\(4\\text{ cm}\\). What is the radius of the cylinder?"),
            options: [option("\\(4\\sqrt{2}\\text{ cm}\\)", "\\(4\\sqrt{2}\\text{ cm}\\)"), option("\\(5\\sqrt{2}\\text{ cm}\\)", "\\(5\\sqrt{2}\\text{ cm}\\)"), option("\\(6\\sqrt{2}\\text{ cm}\\)", "\\(6\\sqrt{2}\\text{ cm}\\)"), option("\\(8\\sqrt{2}\\text{ cm}\\)", "\\(8\\sqrt{2}\\text{ cm}\\)")],
            correctAnswer: 2,
            explanation: "Displaced water volume equals the sphere's volume: \\(\\pi R^2\\times4=\\frac{4}{3}\\pi\\times6^3\\). Thus \\(4R^2=288\\Rightarrow R^2=72\\Rightarrow R=6\\sqrt{2}\\text{ cm}\\).",
            explanationTextMap: text("विस्थापित जल का आयतन गोले के आयतन के बराबर होगा: \\(\\pi R^2\\times4=\\frac{4}{3}\\pi\\times6^3\\)। अतः \\(4R^2=288\\Rightarrow R^2=72\\Rightarrow R=6\\sqrt{2}\\text{ cm}\\)।", "Displaced water volume equals the sphere's volume: \\(\\pi R^2\\times4=\\frac{4}{3}\\pi\\times6^3\\). Thus \\(4R^2=288\\Rightarrow R^2=72\\Rightarrow R=6\\sqrt{2}\\text{ cm}\\).")
        },
        {
            topic: "Speed Time Distance",
            difficulty: "Easy",
            question: "A train covers \\(1.2\\text{ km}\\) in \\(1\\text{ minute}\\). How far will it travel in \\(2\\text{ hours }15\\text{ minutes}\\)?",
            questionTextMap: text("एक ट्रेन \\(1\\text{ minute}\\) में \\(1.2\\text{ km}\\) चलती है। वह \\(2\\text{ hours }15\\text{ minutes}\\) में कितनी दूरी तय करेगी?", "A train covers \\(1.2\\text{ km}\\) in \\(1\\text{ minute}\\). How far will it travel in \\(2\\text{ hours }15\\text{ minutes}\\)?"),
            options: [option("\\(162\\text{ km}\\)", "\\(162\\text{ km}\\)"), option("\\(156\\text{ km}\\)", "\\(156\\text{ km}\\)"), option("\\(171\\text{ km}\\)", "\\(171\\text{ km}\\)"), option("\\(168\\text{ km}\\)", "\\(168\\text{ km}\\)")],
            correctAnswer: 0,
            explanation: "\\(2\\text{ hours }15\\text{ minutes}=135\\text{ minutes}\\). Distance \\(=1.2\\times135=162\\text{ km}\\).",
            explanationTextMap: text("\\(2\\text{ hours }15\\text{ minutes}=135\\text{ minutes}\\)। दूरी \\(=1.2\\times135=162\\text{ km}\\)।", "\\(2\\text{ hours }15\\text{ minutes}=135\\text{ minutes}\\). Distance \\(=1.2\\times135=162\\text{ km}\\).")
        },
        {
            topic: "Ratio and Proportion",
            difficulty: "Hard",
            question: "Two farmers, X and Y, hire a field. X keeps \\(18\\) oxen there for \\(5\\) months and \\(20\\) goats for \\(3\\) months. Y keeps \\(24\\) goats for \\(7\\) months and \\(30\\) sheep for \\(6\\) months. If \\(2\\) oxen eat as much as \\(5\\) goats, and \\(3\\) goats eat as much as \\(4\\) sheep, what fraction of the total rent should X pay?",
            questionTextMap: text("दो किसान X और Y एक खेत किराये पर लेते हैं। X वहां \\(18\\) बैल \\(5\\) महीने और \\(20\\) बकरियां \\(3\\) महीने रखता है। Y \\(24\\) बकरियां \\(7\\) महीने और \\(30\\) भेड़ें \\(6\\) महीने रखता है। यदि \\(2\\) बैल उतना खाते हैं जितना \\(5\\) बकरियां, और \\(3\\) बकरियां उतना खाती हैं जितना \\(4\\) भेड़ें, तो कुल किराये का कितना भाग X को देना चाहिए?", "Two farmers, X and Y, hire a field. X keeps \\(18\\) oxen there for \\(5\\) months and \\(20\\) goats for \\(3\\) months. Y keeps \\(24\\) goats for \\(7\\) months and \\(30\\) sheep for \\(6\\) months. If \\(2\\) oxen eat as much as \\(5\\) goats, and \\(3\\) goats eat as much as \\(4\\) sheep, what fraction of the total rent should X pay?"),
            options: [option("\\(\\frac{90}{196}\\)", "\\(\\frac{90}{196}\\)"), option("\\(\\frac{95}{196}\\)", "\\(\\frac{95}{196}\\)"), option("\\(\\frac{10}{196}\\)", "\\(\\frac{10}{196}\\)"), option("\\(\\frac{111}{196}\\)", "\\(\\frac{111}{196}\\)")],
            correctAnswer: 1,
            explanation: "In goat-equivalents, \\(1\\) ox \\(=\\frac{5}{2}\\) goats and \\(1\\) sheep \\(=\\frac{3}{4}\\) goat. X's usage \\(=18\\times5\\times\\frac{5}{2}+20\\times3=285\\). Y's usage \\(=24\\times7+30\\times6\\times\\frac{3}{4}=303\\). X's fraction \\(=\\frac{285}{285+303}=\\frac{285}{588}=\\frac{95}{196}\\).",
            explanationTextMap: text("बकरी-समतुल्य में, \\(1\\) बैल \\(=\\frac{5}{2}\\) बकरियां और \\(1\\) भेड़ \\(=\\frac{3}{4}\\) बकरी। X का उपयोग \\(=18\\times5\\times\\frac{5}{2}+20\\times3=285\\)। Y का उपयोग \\(=24\\times7+30\\times6\\times\\frac{3}{4}=303\\)। X का भाग \\(=\\frac{285}{285+303}=\\frac{285}{588}=\\frac{95}{196}\\)।", "In goat-equivalents, \\(1\\) ox \\(=\\frac{5}{2}\\) goats and \\(1\\) sheep \\(=\\frac{3}{4}\\) goat. X's usage \\(=18\\times5\\times\\frac{5}{2}+20\\times3=285\\). Y's usage \\(=24\\times7+30\\times6\\times\\frac{3}{4}=303\\). X's fraction \\(=\\frac{285}{285+303}=\\frac{285}{588}=\\frac{95}{196}\\).")
        },
        {
            topic: "Average",
            difficulty: "Easy",
            question: "Three batches of students have average ages \\(17\\), \\(19\\), and \\(23\\) years respectively. If their numbers are in the ratio \\(3:4:6\\), what is the overall average age of all the students?",
            questionTextMap: text("छात्रों के तीन समूहों की औसत आयु क्रमशः \\(17\\), \\(19\\) और \\(23\\) वर्ष है। यदि उनकी संख्याएं \\(3:4:6\\) के अनुपात में हैं, तो सभी छात्रों की कुल औसत आयु क्या है?", "Three batches of students have average ages \\(17\\), \\(19\\), and \\(23\\) years respectively. If their numbers are in the ratio \\(3:4:6\\), what is the overall average age of all the students?"),
            options: [option("\\(19.41\\)", "\\(19.41\\)"), option("\\(20.38\\)", "\\(20.38\\)"), option("\\(21.20\\)", "\\(21.20\\)"), option("\\(18.9\\)", "\\(18.9\\)")],
            correctAnswer: 1,
            explanation: "Weighted average \\(=\\frac{17\\times3+19\\times4+23\\times6}{3+4+6}=\\frac{265}{13}\\approx20.38\\).",
            explanationTextMap: text("भारित औसत \\(=\\frac{17\\times3+19\\times4+23\\times6}{3+4+6}=\\frac{265}{13}\\approx20.38\\)।", "Weighted average \\(=\\frac{17\\times3+19\\times4+23\\times6}{3+4+6}=\\frac{265}{13}\\approx20.38\\).")
        },
        {
            topic: "Average",
            difficulty: "Moderate",
            question: "The average of \\(13\\) numbers is \\(75\\). If the average of the first \\(6\\) numbers is \\(69\\) and the average of the last \\(6\\) numbers is \\(80\\), what is the \\(7\\text{th}\\) number?",
            questionTextMap: text("\\(13\\) संख्याओं का औसत \\(75\\) है। यदि पहली \\(6\\) संख्याओं का औसत \\(69\\) और अंतिम \\(6\\) संख्याओं का औसत \\(80\\) है, तो \\(7\\text{th}\\) संख्या क्या है?", "The average of \\(13\\) numbers is \\(75\\). If the average of the first \\(6\\) numbers is \\(69\\) and the average of the last \\(6\\) numbers is \\(80\\), what is the \\(7\\text{th}\\) number?"),
            options: [option("\\(81\\)", "\\(81\\)"), option("\\(82\\)", "\\(82\\)"), option("\\(83\\)", "\\(83\\)"), option("\\(84\\)", "\\(84\\)")],
            correctAnswer: 0,
            explanation: "Total sum \\(=13\\times75=975\\). Sum of first \\(6\\) numbers \\(=6\\times69=414\\), and sum of last \\(6\\) numbers \\(=6\\times80=480\\). Therefore the \\(7\\text{th}\\) number \\(=975-414-480=81\\).",
            explanationTextMap: text("कुल योग \\(=13\\times75=975\\)। पहली \\(6\\) संख्याओं का योग \\(=6\\times69=414\\), और अंतिम \\(6\\) संख्याओं का योग \\(=6\\times80=480\\)। अतः \\(7\\text{th}\\) संख्या \\(=975-414-480=81\\)।", "Total sum \\(=13\\times75=975\\). Sum of first \\(6\\) numbers \\(=6\\times69=414\\), and sum of last \\(6\\) numbers \\(=6\\times80=480\\). Therefore the \\(7\\text{th}\\) number \\(=975-414-480=81\\).")
        },
        {
            topic: "Average",
            difficulty: "Easy",
            question: "What is the average of all integers between \\(200\\) and \\(350\\) that are exactly divisible by \\(11\\)?",
            questionTextMap: text("\\(200\\) और \\(350\\) के बीच उन सभी पूर्णांकों का औसत क्या है जो \\(11\\) से पूर्णतः विभाज्य हैं?", "What is the average of all integers between \\(200\\) and \\(350\\) that are exactly divisible by \\(11\\)?"),
            options: [option("\\(275\\)", "\\(275\\)"), option("\\(272\\)", "\\(272\\)"), option("\\(286\\)", "\\(286\\)"), option("\\(292\\)", "\\(292\\)")],
            correctAnswer: 0,
            explanation: "The first and last multiples of \\(11\\) in the range are \\(209\\) and \\(341\\). Their arithmetic progression has average \\(\\frac{209+341}{2}=275\\).",
            explanationTextMap: text("इस सीमा में \\(11\\) के पहले और अंतिम गुणज \\(209\\) और \\(341\\) हैं। इस समांतर श्रेणी का औसत \\(\\frac{209+341}{2}=275\\) है।", "The first and last multiples of \\(11\\) in the range are \\(209\\) and \\(341\\). Their arithmetic progression has average \\(\\frac{209+341}{2}=275\\).")
        },
        {
            topic: "Mixture and Alligation",
            difficulty: "Moderate",
            question: "How many kilograms of wheat costing \\(\\text{Rs. }52\\) per \\(\\text{kg}\\) must be mixed with \\(30\\text{ kg}\\) of wheat costing \\(\\text{Rs. }40\\) per \\(\\text{kg}\\) so that a \\(20\\%\\) gain may be obtained by selling the mixture at \\(\\text{Rs. }54\\) per \\(\\text{kg}\\)?",
            questionTextMap: text("\\(\\text{Rs. }52\\) प्रति \\(\\text{kg}\\) की दर वाले कितने किलोग्राम गेहूं को \\(30\\text{ kg}\\) \\(\\text{Rs. }40\\) प्रति \\(\\text{kg}\\) वाले गेहूं में मिलाया जाए, ताकि मिश्रण को \\(\\text{Rs. }54\\) प्रति \\(\\text{kg}\\) बेचने पर \\(20\\%\\) लाभ हो?", "How many kilograms of wheat costing \\(\\text{Rs. }52\\) per \\(\\text{kg}\\) must be mixed with \\(30\\text{ kg}\\) of wheat costing \\(\\text{Rs. }40\\) per \\(\\text{kg}\\) so that a \\(20\\%\\) gain may be obtained by selling the mixture at \\(\\text{Rs. }54\\) per \\(\\text{kg}\\)?"),
            options: [option("\\(18.2\\text{ kg}\\)", "\\(18.2\\text{ kg}\\)"), option("\\(21.4\\text{ kg}\\)", "\\(21.4\\text{ kg}\\)"), option("\\(24\\text{ kg}\\)", "\\(24\\text{ kg}\\)"), option("\\(28.5\\text{ kg}\\)", "\\(28.5\\text{ kg}\\)")],
            correctAnswer: 1,
            explanation: "For a \\(20\\%\\) gain at selling price \\(\\text{Rs. }54\\), the mixture's cost price must be \\(\\frac{54}{1.2}=45\\). By alligation, quantity ratio of \\(\\text{Rs. }52\\) wheat to \\(\\text{Rs. }40\\) wheat is \\((45-40):(52-45)=5:7\\). Hence required quantity \\(=30\\times\\frac{5}{7}\\approx21.4\\text{ kg}\\).",
            explanationTextMap: text("\\(\\text{Rs. }54\\) विक्रय मूल्य पर \\(20\\%\\) लाभ के लिए मिश्रण का लागत मूल्य \\(\\frac{54}{1.2}=45\\) होना चाहिए। मिश्रण नियम से \\(\\text{Rs. }52\\) वाले गेहूं और \\(\\text{Rs. }40\\) वाले गेहूं का अनुपात \\((45-40):(52-45)=5:7\\) है। अतः आवश्यक मात्रा \\(=30\\times\\frac{5}{7}\\approx21.4\\text{ kg}\\)।", "For a \\(20\\%\\) gain at selling price \\(\\text{Rs. }54\\), the mixture's cost price must be \\(\\frac{54}{1.2}=45\\). By alligation, quantity ratio of \\(\\text{Rs. }52\\) wheat to \\(\\text{Rs. }40\\) wheat is \\((45-40):(52-45)=5:7\\). Hence required quantity \\(=30\\times\\frac{5}{7}\\approx21.4\\text{ kg}\\).")
        },
        {
            topic: "Mensuration",
            difficulty: "Moderate",
            question: "A gardener has \\(80\\text{ m}\\) of fencing wire. He can use this wire to enclose either a circular lawn or a square lawn. If he uses the entire wire in each case, what is the approximate ratio of the area of the circular lawn to the area of the square lawn?",
            questionTextMap: text("एक माली के पास \\(80\\text{ m}\\) लंबा बाड़ लगाने का तार है। वह इस पूरे तार से या तो एक वृत्ताकार लॉन या एक वर्गाकार लॉन घेर सकता है। दोनों मामलों में पूरा तार उपयोग करने पर वृत्ताकार लॉन के क्षेत्रफल और वर्गाकार लॉन के क्षेत्रफल का लगभग अनुपात क्या होगा?", "A gardener has \\(80\\text{ m}\\) of fencing wire. He can use this wire to enclose either a circular lawn or a square lawn. If he uses the entire wire in each case, what is the approximate ratio of the area of the circular lawn to the area of the square lawn?"),
            options: [option("\\(1:1\\)", "\\(1:1\\)"), option("\\(1.21:1\\)", "\\(1.21:1\\)"), option("\\(1.27:1\\)", "\\(1.27:1\\)"), option("\\(1.57:1\\)", "\\(1.57:1\\)")],
            correctAnswer: 2,
            explanation: "For the circle, \\(2\\pi r=80\\Rightarrow r=\\frac{40}{\\pi}\\), so area \\(=\\frac{1600}{\\pi}\\). For the square, side \\(=20\\text{ m}\\), so area \\(=400\\text{ m}^2\\). Ratio \\(=\\frac{1600/\\pi}{400}=\\frac{4}{\\pi}\\approx1.27:1\\).",
            explanationTextMap: text("वृत्त के लिए \\(2\\pi r=80\\Rightarrow r=\\frac{40}{\\pi}\\), इसलिए क्षेत्रफल \\(=\\frac{1600}{\\pi}\\)। वर्ग की भुजा \\(=20\\text{ m}\\), अतः क्षेत्रफल \\(=400\\text{ m}^2\\)। अनुपात \\(=\\frac{1600/\\pi}{400}=\\frac{4}{\\pi}\\approx1.27:1\\)।", "For the circle, \\(2\\pi r=80\\Rightarrow r=\\frac{40}{\\pi}\\), so area \\(=\\frac{1600}{\\pi}\\). For the square, side \\(=20\\text{ m}\\), so area \\(=400\\text{ m}^2\\). Ratio \\(=\\frac{1600/\\pi}{400}=\\frac{4}{\\pi}\\approx1.27:1\\).")
        },
                {
            topic: "Simplification",
            difficulty: "Moderate",
            question: "Simplify: \\(\\left(\\frac{1}{5+\\sqrt{3}}\\right)+\\left(\\frac{1}{5-\\sqrt{3}}\\right)-\\left(\\frac{10}{25-3}\\right)\\).",
            questionTextMap: text("सरल कीजिए: \\(\\left(\\frac{1}{5+\\sqrt{3}}\\right)+\\left(\\frac{1}{5-\\sqrt{3}}\\right)-\\left(\\frac{10}{25-3}\\right)\\)।", "Simplify: \\(\\left(\\frac{1}{5+\\sqrt{3}}\\right)+\\left(\\frac{1}{5-\\sqrt{3}}\\right)-\\left(\\frac{10}{25-3}\\right)\\)."),
            options: [
                option("\\(0\\)", "\\(0\\)"),
                option("\\(1\\)", "\\(1\\)"),
                option("\\(2\\)", "\\(2\\)"),
                option("\\(\\sqrt{3}\\)", "\\(\\sqrt{3}\\)")
            ],
            correctAnswer: 0,
            explanation: "The first two terms sum to \\(\\frac{(5-\\sqrt3)+(5+\\sqrt3)}{25-3}=\\frac{10}{22}\\). The third term is also \\(\\frac{10}{22}\\). Hence the result is \\(0\\).",
            explanationTextMap: text("पहले दो पदों का योग \\(\\frac{(5-\\sqrt3)+(5+\\sqrt3)}{25-3}=\\frac{10}{22}\\) है। तीसरा पद भी \\(\\frac{10}{22}\\) है। अतः परिणाम \\(0\\) है।", "The first two terms sum to \\(\\frac{(5-\\sqrt3)+(5+\\sqrt3)}{25-3}=\\frac{10}{22}\\). The third term is also \\(\\frac{10}{22}\\). Hence the result is \\(0\\).")
        },
        {
            topic: "Percentage",
            difficulty: "Moderate",
            question: "A family spends on groceries, rent, and other expenses in the ratio \\(3:5:2\\). Next year, groceries are expected to rise by \\(8\\%\\), rent by \\(4\\%\\), and other expenses to fall by \\(10\\%\\). What will be the overall percentage change in total expenditure?",
            questionTextMap: text("एक परिवार किराना, किराया और अन्य खर्चों पर \\(3:5:2\\) के अनुपात में खर्च करता है। अगले वर्ष किराना खर्च \\(8\\%\\), किराया \\(4\\%\\) बढ़ने और अन्य खर्च \\(10\\%\\) घटने की उम्मीद है। कुल व्यय में कुल प्रतिशत परिवर्तन क्या होगा?", "A family spends on groceries, rent, and other expenses in the ratio \\(3:5:2\\). Next year, groceries are expected to rise by \\(8\\%\\), rent by \\(4\\%\\), and other expenses to fall by \\(10\\%\\). What will be the overall percentage change in total expenditure?"),
            options: [
                option("\\(1\\%\\) कमी", "\\(1\\%\\) decrease"),
                option("\\(2.4\\%\\) वृद्धि", "\\(2.4\\%\\) increase"),
                option("\\(1.2\\%\\) वृद्धि", "\\(1.2\\%\\) increase"),
                option("\\(0.8\\%\\) कमी", "\\(0.8\\%\\) decrease")
            ],
            correctAnswer: 1,
            explanation: "Weighted percentage change \\(=\\frac{3\\times8+5\\times4-2\\times10}{3+5+2}=\\frac{24}{10}=2.4\\%\\). So total expenditure increases by \\(2.4\\%\\).",
            explanationTextMap: text("भारित प्रतिशत परिवर्तन \\(=\\frac{3\\times8+5\\times4-2\\times10}{3+5+2}=\\frac{24}{10}=2.4\\%\\) है। अतः कुल व्यय \\(2.4\\%\\) बढ़ेगा।", "Weighted percentage change \\(=\\frac{3\\times8+5\\times4-2\\times10}{3+5+2}=\\frac{24}{10}=2.4\\%\\). So total expenditure increases by \\(2.4\\%\\).")
        },
        {
            topic: "Partnership",
            difficulty: "Moderate",
            question: "C and D invested \\(\\text{Rs. }140000\\) and \\(\\text{Rs. }180000\\), respectively. C remained for \\(9\\) months and D for \\(8\\) months. If C's share in the profit is \\(\\text{Rs. }18900\\), what is the total profit?",
            questionTextMap: text("C और D ने क्रमशः \\(\\text{Rs. }140000\\) और \\(\\text{Rs. }180000\\) निवेश किए। C ने \\(9\\) महीने और D ने \\(8\\) महीने निवेश बनाए रखा। यदि लाभ में C का हिस्सा \\(\\text{Rs. }18900\\) है, तो कुल लाभ कितना है?", "C and D invested \\(\\text{Rs. }140000\\) and \\(\\text{Rs. }180000\\), respectively. C remained for \\(9\\) months and D for \\(8\\) months. If C's share in the profit is \\(\\text{Rs. }18900\\), what is the total profit?"),
            options: [
                option("\\(\\text{Rs. }40500\\)", "\\(\\text{Rs. }40500\\)"),
                option("\\(\\text{Rs. }36000\\)", "\\(\\text{Rs. }36000\\)"),
                option("\\(\\text{Rs. }34200\\)", "\\(\\text{Rs. }34200\\)"),
                option("\\(\\text{Rs. }38400\\)", "\\(\\text{Rs. }38400\\)")
            ],
            correctAnswer: 0,
            explanation: "Profit-sharing ratio \\(=140000\\times9:180000\\times8=126:144=7:8\\). C gets \\(\\frac{7}{15}\\) of total profit. Hence total profit \\(=18900\\times\\frac{15}{7}=40500\\).",
            explanationTextMap: text("लाभ-विभाजन अनुपात \\(=140000\\times9:180000\\times8=126:144=7:8\\)। C को कुल लाभ का \\(\\frac{7}{15}\\) मिलता है। अतः कुल लाभ \\(=18900\\times\\frac{15}{7}=40500\\)।", "Profit-sharing ratio \\(=140000\\times9:180000\\times8=126:144=7:8\\). C gets \\(\\frac{7}{15}\\) of total profit. Hence total profit \\(=18900\\times\\frac{15}{7}=40500\\).")
        },
        {
            topic: "Profit and Loss",
            difficulty: "Moderate",
            question: "A television set is sold for \\(\\text{Rs. }Q\\) and the shopkeeper earns a profit of \\(25\\%\\). During a clearance sale, he marks the same set at \\(1.4Q\\) and allows a discount of \\(15\\%\\) on the marked price. What is his profit percentage during the sale?",
            questionTextMap: text("एक टेलीविजन सेट \\(\\text{Rs. }Q\\) में बेचा जाता है और दुकानदार को \\(25\\%\\) लाभ होता है। क्लियरेंस सेल के दौरान वह उसी सेट का अंकित मूल्य \\(1.4Q\\) रखता है और उस पर \\(15\\%\\) की छूट देता है। सेल के दौरान उसका लाभ प्रतिशत कितना है?", "A television set is sold for \\(\\text{Rs. }Q\\) and the shopkeeper earns a profit of \\(25\\%\\). During a clearance sale, he marks the same set at \\(1.4Q\\) and allows a discount of \\(15\\%\\) on the marked price. What is his profit percentage during the sale?"),
            options: [
                option("\\(45.75\\%\\)", "\\(45.75\\%\\)"),
                option("\\(40\\%\\)", "\\(40\\%\\)"),
                option("\\(48.75\\%\\)", "\\(48.75\\%\\)"),
                option("\\(50\\%\\)", "\\(50\\%\\)")
            ],
            correctAnswer: 2,
            explanation: "Original selling price \\(Q=1.25\\,CP\\), so \\(CP=0.8Q\\). Sale selling price \\(=1.4Q\\times0.85=1.19Q\\). Profit percentage \\(=\\frac{1.19Q-0.8Q}{0.8Q}\\times100=48.75\\%\\).",
            explanationTextMap: text("मूल विक्रय मूल्य \\(Q=1.25\\,CP\\), इसलिए \\(CP=0.8Q\\)। सेल का विक्रय मूल्य \\(=1.4Q\\times0.85=1.19Q\\)। लाभ प्रतिशत \\(=\\frac{1.19Q-0.8Q}{0.8Q}\\times100=48.75\\%\\)।", "Original selling price \\(Q=1.25\\,CP\\), so \\(CP=0.8Q\\). Sale selling price \\(=1.4Q\\times0.85=1.19Q\\). Profit percentage \\(=\\frac{1.19Q-0.8Q}{0.8Q}\\times100=48.75\\%\\).")
        },
        {
            topic: "Profit and Loss",
            difficulty: "Easy",
            question: "A trader marks his goods \\(30\\%\\) above the cost price and then allows a discount of \\(12\\%\\). What is his profit percentage?",
            questionTextMap: text("एक व्यापारी अपने माल का अंकित मूल्य लागत मूल्य से \\(30\\%\\) अधिक रखता है और फिर \\(12\\%\\) की छूट देता है। उसका लाभ प्रतिशत कितना है?", "A trader marks his goods \\(30\\%\\) above the cost price and then allows a discount of \\(12\\%\\). What is his profit percentage?"),
            options: [
                option("\\(14.4\\%\\)", "\\(14.4\\%\\)"),
                option("\\(15.6\\%\\)", "\\(15.6\\%\\)"),
                option("\\(16.5\\%\\)", "\\(16.5\\%\\)"),
                option("\\(18.0\\%\\)", "\\(18.0\\%\\)")
            ],
            correctAnswer: 0,
            explanation: "Let cost price be \\(100\\). Marked price \\(=130\\). After \\(12\\%\\) discount, selling price \\(=130\\times0.88=114.4\\). Profit \\(=14.4\\), so profit percentage is \\(14.4\\%\\).",
            explanationTextMap: text("लागत मूल्य \\(100\\) मान लें। अंकित मूल्य \\(=130\\)। \\(12\\%\\) छूट के बाद विक्रय मूल्य \\(=130\\times0.88=114.4\\)। लाभ \\(=14.4\\), अतः लाभ प्रतिशत \\(14.4\\%\\) है।", "Let cost price be \\(100\\). Marked price \\(=130\\). After \\(12\\%\\) discount, selling price \\(=130\\times0.88=114.4\\). Profit \\(=14.4\\), so profit percentage is \\(14.4\\%\\).")
        },
        {
            topic: "Profit and Loss",
            difficulty: "Moderate",
            question: "A shopkeeper marks his products \\(50\\%\\) above the cost price and allows a discount of \\(20\\%\\) on the marked price. He also gives an additional cash discount of \\(\\text{Rs. }120\\) and still makes a profit of \\(16\\%\\) on cost. What is the cost price of the product?",
            questionTextMap: text("एक दुकानदार अपने उत्पादों का अंकित मूल्य लागत मूल्य से \\(50\\%\\) अधिक रखता है और अंकित मूल्य पर \\(20\\%\\) की छूट देता है। वह अतिरिक्त \\(\\text{Rs. }120\\) नकद छूट भी देता है और फिर भी लागत पर \\(16\\%\\) लाभ कमाता है। उत्पाद का लागत मूल्य क्या है?", "A shopkeeper marks his products \\(50\\%\\) above the cost price and allows a discount of \\(20\\%\\) on the marked price. He also gives an additional cash discount of \\(\\text{Rs. }120\\) and still makes a profit of \\(16\\%\\) on cost. What is the cost price of the product?"),
            options: [
                option("\\(\\text{Rs. }1800\\)", "\\(\\text{Rs. }1800\\)"),
                option("\\(\\text{Rs. }3000\\)", "\\(\\text{Rs. }3000\\)"),
                option("\\(\\text{Rs. }2200\\)", "\\(\\text{Rs. }2200\\)"),
                option("\\(\\text{Rs. }2400\\)", "\\(\\text{Rs. }2400\\)")
            ],
            correctAnswer: 1,
            explanation: "Let cost price be \\(x\\). Marked price \\(=1.5x\\). After \\(20\\%\\) discount, price \\(=1.2x\\). After the cash discount, selling price \\(=1.2x-120\\). Since profit is \\(16\\%\\), \\(1.2x-120=1.16x\\Rightarrow0.04x=120\\Rightarrow x=3000\\).",
            explanationTextMap: text("लागत मूल्य \\(x\\) मान लें। अंकित मूल्य \\(=1.5x\\)। \\(20\\%\\) छूट के बाद मूल्य \\(=1.2x\\)। नकद छूट के बाद विक्रय मूल्य \\(=1.2x-120\\)। \\(16\\%\\) लाभ के कारण \\(1.2x-120=1.16x\\Rightarrow0.04x=120\\Rightarrow x=3000\\)।", "Let cost price be \\(x\\). Marked price \\(=1.5x\\). After \\(20\\%\\) discount, price \\(=1.2x\\). After the cash discount, selling price \\(=1.2x-120\\). Since profit is \\(16\\%\\), \\(1.2x-120=1.16x\\Rightarrow0.04x=120\\Rightarrow x=3000\\).")
        },
        {
            topic: "Simple Interest",
            difficulty: "Moderate",
            question: "X lent \\(\\text{Rs. }6000\\) to Y for \\(3\\) years and \\(\\text{Rs. }4000\\) to Z for \\(2\\) years, both at the same simple interest rate. In total, he received \\(\\text{Rs. }2000\\) as interest from both. What is the rate of interest per annum (nearest integer)?",
            questionTextMap: text("X ने Y को \\(\\text{Rs. }6000\\) \\(3\\) वर्षों के लिए और Z को \\(\\text{Rs. }4000\\) \\(2\\) वर्षों के लिए समान साधारण ब्याज दर पर उधार दिए। दोनों से कुल \\(\\text{Rs. }2000\\) ब्याज मिला। वार्षिक ब्याज दर (निकटतम पूर्णांक) क्या है?", "X lent \\(\\text{Rs. }6000\\) to Y for \\(3\\) years and \\(\\text{Rs. }4000\\) to Z for \\(2\\) years, both at the same simple interest rate. In total, he received \\(\\text{Rs. }2000\\) as interest from both. What is the rate of interest per annum (nearest integer)?"),
            options: [
                option("\\(8\\%\\)", "\\(8\\%\\)"),
                option("\\(10\\%\\)", "\\(10\\%\\)"),
                option("\\(12\\%\\)", "\\(12\\%\\)"),
                option("\\(15\\%\\)", "\\(15\\%\\)")
            ],
            correctAnswer: 0,
            explanation: "Total simple interest \\(=\\frac{6000\\times3\\times r}{100}+\\frac{4000\\times2\\times r}{100}=180r+80r=260r\\). Thus \\(260r=2000\\Rightarrow r\\approx7.69\\%\\), which rounds to \\(8\\%\\).",
            explanationTextMap: text("कुल साधारण ब्याज \\(=\\frac{6000\\times3\\times r}{100}+\\frac{4000\\times2\\times r}{100}=180r+80r=260r\\)। अतः \\(260r=2000\\Rightarrow r\\approx7.69\\%\\), जो निकटतम पूर्णांक में \\(8\\%\\) है।", "Total simple interest \\(=\\frac{6000\\times3\\times r}{100}+\\frac{4000\\times2\\times r}{100}=180r+80r=260r\\). Thus \\(260r=2000\\Rightarrow r\\approx7.69\\%\\), which rounds to \\(8\\%\\).")
        },
        {
            topic: "Mensuration",
            difficulty: "Easy",
            question: "A sector of a circle has a central angle of \\(150^\\circ\\) and radius \\(10\\text{ cm}\\). Another sector of the same circle has a central angle of \\(\\frac{5\\pi}{6}\\) radians. What is the ratio of the area of the first sector to that of the second?",
            questionTextMap: text("एक वृत्त के एक सेक्टर का केंद्रीय कोण \\(150^\\circ\\) और त्रिज्या \\(10\\text{ cm}\\) है। उसी वृत्त के दूसरे सेक्टर का केंद्रीय कोण \\(\\frac{5\\pi}{6}\\) रेडियन है। पहले सेक्टर के क्षेत्रफल का दूसरे सेक्टर के क्षेत्रफल से अनुपात क्या है?", "A sector of a circle has a central angle of \\(150^\\circ\\) and radius \\(10\\text{ cm}\\). Another sector of the same circle has a central angle of \\(\\frac{5\\pi}{6}\\) radians. What is the ratio of the area of the first sector to that of the second?"),
            options: [
                option("\\(3:4\\)", "\\(3:4\\)"),
                option("\\(1:1\\)", "\\(1:1\\)"),
                option("\\(4:5\\)", "\\(4:5\\)"),
                option("\\(5:6\\)", "\\(5:6\\)")
            ],
            correctAnswer: 1,
            explanation: "\\(150^\\circ=150\\times\\frac{\\pi}{180}=\\frac{5\\pi}{6}\\) radians. Both sectors therefore have the same central angle and the same radius, so their areas are equal. Ratio \\(=1:1\\).",
            explanationTextMap: text("\\(150^\\circ=150\\times\\frac{\\pi}{180}=\\frac{5\\pi}{6}\\) रेडियन। दोनों सेक्टरों का केंद्रीय कोण और त्रिज्या समान है, इसलिए उनके क्षेत्रफल बराबर हैं। अनुपात \\(=1:1\\)।", "\\(150^\\circ=150\\times\\frac{\\pi}{180}=\\frac{5\\pi}{6}\\) radians. Both sectors therefore have the same central angle and the same radius, so their areas are equal. Ratio \\(=1:1\\).")
        },
        {
            topic: "Ratio and Proportion",
            difficulty: "Hard",
            question: "Two men, M and N, rent a pasture. M uses \\(12\\) cows for \\(4\\) months and \\(18\\) goats for \\(5\\) months, while N uses \\(26\\) goats for \\(7\\) months. If \\(3\\) cows are equivalent to \\(7\\) goats, what is M's share of the rent?",
            questionTextMap: text("दो व्यक्ति M और N एक चरागाह किराये पर लेते हैं। M \\(12\\) गायें \\(4\\) महीने और \\(18\\) बकरियां \\(5\\) महीने रखता है, जबकि N \\(26\\) बकरियां \\(7\\) महीने रखता है। यदि \\(3\\) गायें \\(7\\) बकरियों के बराबर हैं, तो किराये में M का हिस्सा क्या है?", "Two men, M and N, rent a pasture. M uses \\(12\\) cows for \\(4\\) months and \\(18\\) goats for \\(5\\) months, while N uses \\(26\\) goats for \\(7\\) months. If \\(3\\) cows are equivalent to \\(7\\) goats, what is M's share of the rent?"),
            options: [
                option("\\(\\frac{101}{192}\\)", "\\(\\frac{101}{192}\\)"),
                option("\\(\\frac{110}{192}\\)", "\\(\\frac{110}{192}\\)"),
                option("\\(\\frac{105}{192}\\)", "\\(\\frac{105}{192}\\)"),
                option("\\(\\frac{60}{192}\\)", "\\(\\frac{60}{192}\\)")
            ],
            correctAnswer: 0,
            explanation: "Since \\(3\\) cows \\(=7\\) goats, \\(1\\) cow \\(=\\frac{7}{3}\\) goats. M's usage \\(=12\\times4\\times\\frac{7}{3}+18\\times5=112+90=202\\) goat-months. N's usage \\(=26\\times7=182\\). M's share \\(=\\frac{202}{202+182}=\\frac{202}{384}=\\frac{101}{192}\\).",
            explanationTextMap: text("क्योंकि \\(3\\) गायें \\(=7\\) बकरियां, इसलिए \\(1\\) गाय \\(=\\frac{7}{3}\\) बकरियां। M का उपयोग \\(=12\\times4\\times\\frac{7}{3}+18\\times5=112+90=202\\) बकरी-महीने। N का उपयोग \\(=26\\times7=182\\)। M का हिस्सा \\(=\\frac{202}{202+182}=\\frac{202}{384}=\\frac{101}{192}\\)।", "Since \\(3\\) cows \\(=7\\) goats, \\(1\\) cow \\(=\\frac{7}{3}\\) goats. M's usage \\(=12\\times4\\times\\frac{7}{3}+18\\times5=112+90=202\\) goat-months. N's usage \\(=26\\times7=182\\). M's share \\(=\\frac{202}{202+182}=\\frac{202}{384}=\\frac{101}{192}\\).")
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
        title: "SSC CGL Tier 1 - Quantitative Aptitude Practice Set 3 (Bilingual)",
        description: "25 bilingual Hindi-English quantitative aptitude questions extracted from questions 51 to 75 of the provided PDF, with MathJax-compatible LaTeX formatting.",
        durationMinutes: 20,
        totalQuestions: questions.length,
        marksPerQuestion: 1,
        negativeMarks: 0.25,
        difficulty: "Mixed",
        tags: [
            "SSC",
            "CGL",
            "Quantitative Aptitude",
            "Mathematics",
            "Bilingual",
            "LaTeX"
        ],
        questions
    });
}());
