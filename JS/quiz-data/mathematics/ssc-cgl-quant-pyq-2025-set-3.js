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