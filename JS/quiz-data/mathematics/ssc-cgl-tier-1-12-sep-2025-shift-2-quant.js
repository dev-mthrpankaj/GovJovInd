(function () {
    "use strict";

    window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];

    const quizId = "ssc-cgl-tier-1-12-sep-2025-shift-2-quant";

    function text(hi, en) {
        return { hi, en };
    }

    function option(hi, en) {
        return { text: text(hi, en) };
    }

    const questions = [
        {
            topic: "Surds and Indices",
            difficulty: "Easy",
            question: "Let \\(x = \\sqrt{3} + \\sqrt{5}\\) and \\(y = \\sqrt{8} + \\sqrt{2}\\). Which is greater?",
            questionTextMap: text("मान लीजिए \\(x = \\sqrt{3} + \\sqrt{5}\\) और \\(y = \\sqrt{8} + \\sqrt{2}\\)। कौन सा बड़ा है?", "Let \\(x = \\sqrt{3} + \\sqrt{5}\\) and \\(y = \\sqrt{8} + \\sqrt{2}\\). Which is greater?"),
            options: [
                option("\\(x = y\\)", "\\(x = y\\)"),
                option("\\(x > y\\)", "\\(x > y\\)"),
                option("\\(x < y\\)", "\\(x < y\\)"),
                option("Cannot be determined", "Cannot be determined")
            ],
            correctAnswer: 2,
            explanation: "Squaring both sides: \\(x^2 = (\\sqrt{3} + \\sqrt{5})^2 = 3 + 5 + 2\\sqrt{15} = 8 + 2\\sqrt{15}\\). \\(y^2 = (\\sqrt{8} + \\sqrt{2})^2 = 8 + 2 + 2\\sqrt{16} = 10 + 2(4) = 18\\). Since \\(\\sqrt{15} \\approx 3.87\\), \\(2\\sqrt{15} \\approx 7.74\\), we get \\(x^2 \\approx 15.74\\). Since \\(15.74 < 18\\), \\(x^2 < y^2\\), which means \\(x < y\\).",
            explanationTextMap: text("दोनों पक्षों का वर्ग करने पर: \\(x^2 = (\\sqrt{3} + \\sqrt{5})^2 = 3 + 5 + 2\\sqrt{15} = 8 + 2\\sqrt{15}\\)। \\(y^2 = (\\sqrt{8} + \\sqrt{2})^2 = 8 + 2 + 2\\sqrt{16} = 10 + 2(4) = 18\\)। चूँकि \\(\\sqrt{15} \\approx 3.87\\), \\(2\\sqrt{15} \\approx 7.74\\), हमें \\(x^2 \\approx 15.74\\) प्राप्त होता है। चूँकि \\(15.74 < 18\\), इसलिए \\(x^2 < y^2\\), जिसका अर्थ है \\(x < y\\)।", "Squaring both sides: \\(x^2 = (\\sqrt{3} + \\sqrt{5})^2 = 3 + 5 + 2\\sqrt{15} = 8 + 2\\sqrt{15}\\). \\(y^2 = (\\sqrt{8} + \\sqrt{2})^2 = 8 + 2 + 2\\sqrt{16} = 10 + 2(4) = 18\\). Since \\(\\sqrt{15} \\approx 3.87\\), \\(2\\sqrt{15} \\approx 7.74\\), we get \\(x^2 \\approx 15.74\\). Since \\(15.74 < 18\\), \\(x^2 < y^2\\), which means \\(x < y\\).")
        },
        {
            topic: "Ratio and Proportion",
            difficulty: "Moderate",
            question: "The number of red, blue, and green marbles in a bag is in the ratio \\(3:4:6\\). If \\(20\\) red marbles, \\(15\\) blue marbles, and an unknown number of green marbles are added to the bag, the ratio of red, blue, and green marbles becomes \\(4:5:7\\). Determine the number of green marbles added.",
            questionTextMap: text("एक बैग में लाल, नीले और हरे मार्बल की संख्या का अनुपात \\(3:4:6\\) है। यदि बैग में \\(20\\) लाल मार्बल, \\(15\\) नीले मार्बल और अज्ञात संख्या में हरे मार्बल डाले जाएं तो लाल, नीले और हरे मार्बल का अनुपात \\(4:5:7\\) हो जाता है। डाले गए हरे मार्बल की संख्या ज्ञात कीजिए।", "The number of red, blue, and green marbles in a bag is in the ratio \\(3:4:6\\). If \\(20\\) red marbles, \\(15\\) blue marbles, and an unknown number of green marbles are added to the bag, the ratio of red, blue, and green marbles becomes \\(4:5:7\\). Determine the number of green marbles added."),
            options: [
                option("\\(3\\)", "\\(3\\)"),
                option("\\(5\\)", "\\(5\\)"),
                option("\\(7\\)", "\\(7\\)"),
                option("\\(9\\)", "\\(9\\)")
            ],
            correctAnswer: 1,
            explanation: "Let the initial number of marbles be \\(3k\\), \\(4k\\), and \\(6k\\). From the new ratio of red to blue: \\(\\frac{3k + 20}{4k + 15} = \\frac{4}{5} \\Rightarrow 5(3k + 20) = 4(4k + 15) \\Rightarrow 15k + 100 = 16k + 60 \\Rightarrow k = 40\\). Initial marbles: Red \\(= 120\\), Blue \\(= 160\\), Green \\(= 240\\). New Red count \\(= 120 + 20 = 140\\), which represents \\(4\\) units in the new ratio. Thus, \\(1\\) unit \\(= 35\\). The new Green count is \\(7 \\times 35 = 245\\). Green marbles added \\(= 245 - 240 = 5\\).",
            explanationTextMap: text("माना मार्बल्स की प्रारंभिक संख्या \\(3k\\), \\(4k\\), और \\(6k\\) है। लाल और नीले के नए अनुपात से: \\(\\frac{3k + 20}{4k + 15} = \\frac{4}{5} \\Rightarrow k = 40\\)। प्रारंभिक मार्बल्स: लाल \\(= 120\\), नीला \\(= 160\\), हरा \\(= 240\\)। नया लाल काउंट \\(= 140\\) है, जो नए अनुपात में \\(4\\) इकाइयों को दर्शाता है। अतः \\(1\\) इकाई \\(= 35\\)। नया हरा काउंट \\(= 7 \\times 35 = 245\\) है। जोड़े गए हरे मार्बल्स \\(= 245 - 240 = 5\\)।", "Let the initial number of marbles be \\(3k\\), \\(4k\\), and \\(6k\\). From the new ratio of red to blue: \\(\\frac{3k + 20}{4k + 15} = \\frac{4}{5} \\Rightarrow k = 40\\). Initial marbles: Red \\(= 120\\), Blue \\(= 160\\), Green \\(= 240\\). New Red count \\(= 120 + 20 = 140\\), which represents \\(4\\) units in the new ratio. Thus, \\(1\\) unit \\(= 35\\). The new Green count is \\(7 \\times 35 = 245\\). Green marbles added \\(= 245 - 240 = 5\\).")
        },
        {
            topic: "Simplification",
            difficulty: "Moderate",
            question: "Evaluate the continued fraction: \\(x = 2 + \\frac{1}{3 + \\frac{1}{4 + \\frac{1}{2}}}\\)",
            questionTextMap: text("सतत भिन्न का मूल्यांकन करें: \\(x = 2 + \\frac{1}{3 + \\frac{1}{4 + \\frac{1}{2}}}\\)", "Evaluate the continued fraction: \\(x = 2 + \\frac{1}{3 + \\frac{1}{4 + \\frac{1}{2}}}\\)"),
            options: [
                option("\\(\\frac{47}{20}\\)", "\\(\\frac{47}{20}\\)"),
                option("\\(\\frac{41}{47}\\)", "\\(\\frac{41}{47}\\)"),
                option("\\(\\frac{67}{29}\\)", "\\(\\frac{67}{29}\\)"),
                option("\\(\\frac{455}{470}\\)", "\\(\\frac{455}{470}\\)")
            ],
            correctAnswer: 2,
            explanation: "Simplifying from the bottom up: \\(4 + \\frac{1}{2} = \\frac{9}{2}\\). Then, \\(3 + \\frac{1}{9/2} = 3 + \\frac{2}{9} = \\frac{29}{9}\\). Finally, \\(x = 2 + \\frac{1}{29/9} = 2 + \\frac{9}{29} = \\frac{58 + 9}{29} = \\frac{67}{29}\\).",
            explanationTextMap: text("नीचे से ऊपर की ओर सरल करने पर: \\(4 + \\frac{1}{2} = \\frac{9}{2}\\)। फिर, \\(3 + \\frac{1}{9/2} = 3 + \\frac{2}{9} = \\frac{29}{9}\\)। अंत में, \\(x = 2 + \\frac{1}{29/9} = 2 + \\frac{9}{29} = \\frac{58 + 9}{29} = \\frac{67}{29}\\)।", "Simplifying from the bottom up: \\(4 + \\frac{1}{2} = \\frac{9}{2}\\). Then, \\(3 + \\frac{1}{9/2} = 3 + \\frac{2}{9} = \\frac{29}{9}\\). Finally, \\(x = 2 + \\frac{1}{29/9} = 2 + \\frac{9}{29} = \\frac{58 + 9}{29} = \\frac{67}{29}\\).")
        },
        {
            topic: "Partnership",
            difficulty: "Easy",
            question: "A and B invest \\(₹40,000\\) and \\(₹60,000\\) respectively in a business. What is A's share in a profit of \\(₹50,000\\)?",
            questionTextMap: text("A और B ने एक व्यवसाय में क्रमशः \\(₹40,000\\) और \\(₹60,000\\) का निवेश किया। \\(₹50,000\\) के लाभ में A का हिस्सा क्या है?", "A and B invest \\(₹40,000\\) and \\(₹60,000\\) respectively in a business. What is A's share in a profit of \\(₹50,000\\)?"),
            options: [
                option("\\(₹15,000\\)", "\\(₹15,000\\)"),
                option("\\(₹20,000\\)", "\\(₹20,000\\)"),
                option("\\(₹25,000\\)", "\\(₹25,000\\)"),
                option("\\(₹30,000\\)", "\\(₹30,000\\)")
            ],
            correctAnswer: 1,
            explanation: "The ratio of investments of A and B is \\(40,000 : 60,000 = 2 : 3\\). A's share in the profit \\(= \\frac{2}{2+3} \\times 50,000 = \\frac{2}{5} \\times 50,000 = ₹20,000\\).",
            explanationTextMap: text("A और B के निवेश का अनुपात \\(40,000 : 60,000 = 2 : 3\\) है। लाभ में A का हिस्सा \\(= \\frac{2}{2+3} \\times 50,000 = \\frac{2}{5} \\times 50,000 = ₹20,000\\)।", "The ratio of investments of A and B is \\(40,000 : 60,000 = 2 : 3\\). A's share in the profit \\(= \\frac{2}{2+3} \\times 50,000 = \\frac{2}{5} \\times 50,000 = ₹20,000\\).")
        },
        {
            topic: "Partnership",
            difficulty: "Moderate",
            question: "A and B contribute to a business investment in the ratio \\(3:5\\). They earn a profit of \\(₹64,000\\). A is a working partner and receives \\(10\\%\\) of the profit extra. What is A's total share?",
            questionTextMap: text("A और B किसी व्यवसाय में \\(3:5\\) के अनुपात में निवेश करते हैं। वे \\(₹64,000\\) का लाभ कमाते हैं। A एक कार्यकारी साझेदार है और उसे लाभ का \\(10\\%\\) अतिरिक्त मिलता है। A का कुल हिस्सा क्या है?", "A and B contribute to a business investment in the ratio \\(3:5\\). They earn a profit of \\(₹64,000\\). A is a working partner and receives \\(10\\%\\) of the profit extra. What is A's total share?"),
            options: [
                option("\\(₹26,500\\)", "\\(₹26,500\\)"),
                option("\\(₹28,000\\)", "\\(₹28,000\\)"),
                option("\\(₹38,500\\)", "\\(₹38,500\\)"),
                option("\\(₹36,000\\)", "\\(₹36,000\\)")
            ],
            correctAnswer: 1,
            explanation: "Extra share for A \\(= 10\\% \\text{ of } 64,000 = ₹6,400\\). Remaining profit to distribute \\(= 64,000 - 6,400 = ₹57,600\\). A's investment share \\(= \\frac{3}{8} \\times 57,600 = ₹21,600\\). A's total share \\(= 21,600 + 6,400 = ₹28,000\\).",
            explanationTextMap: text("A के लिए अतिरिक्त हिस्सा \\(= 64,000 \\text{ का } 10\\% = ₹6,400\\)। वितरित करने के लिए शेष लाभ \\(= 64,000 - 6,400 = ₹57,600\\)। A का निवेश हिस्सा \\(= \\frac{3}{8} \\times 57,600 = ₹21,600\\)। A का कुल हिस्सा \\(= 21,600 + 6,400 = ₹28,000\\)।", "Extra share for A \\(= 10\\% \\text{ of } 64,000 = ₹6,400\\). Remaining profit to distribute \\(= 64,000 - 6,400 = ₹57,600\\). A's investment share \\(= \\frac{3}{8} \\times 57,600 = ₹21,600\\). A's total share \\(= 21,600 + 6,400 = ₹28,000\\).")
        },
        {
            topic: "Average",
            difficulty: "Moderate",
            question: "In a team of \\(75\\) employees, the average monthly sales per employee is \\(1.8\\) lakh. If \\(30\\) junior employees average \\(1.2\\) lakh each, what is the average monthly sales figure (in lakh) for the senior employees?",
            questionTextMap: text("75 कर्मचारियों की एक टीम में, प्रति कर्मचारी औसत मासिक बिक्री \\(1.8\\) लाख है। यदि \\(30\\) जूनियर कर्मचारियों में से प्रत्येक की औसत बिक्री \\(1.2\\) लाख है, तो वरिष्ठ कर्मचारियों की औसत मासिक बिक्री (लाख में) क्या है?", "In a team of \\(75\\) employees, the average monthly sales per employee is \\(1.8\\) lakh. If \\(30\\) junior employees average \\(1.2\\) lakh each, what is the average monthly sales figure (in lakh) for the senior employees?"),
            options: [
                option("\\(4.2\\) lakh", "\\(4.2\\) lakh"),
                option("\\(2.2\\) lakh", "\\(2.2\\) lakh"),
                option("\\(2.8\\) lakh", "\\(2.8\\) lakh"),
                option("\\(2.7\\) lakh", "\\(2.7\\) lakh")
            ],
            correctAnswer: 1,
            explanation: "Total sales \\(= 75 \\times 1.8 = 135\\) lakh. Junior employees total sales \\(= 30 \\times 1.2 = 36\\) lakh. Senior employees total sales \\(= 135 - 36 = 99\\) lakh. Number of senior employees \\(= 75 - 30 = 45\\). Senior employees average \\(= \\frac{99}{45} = 2.2\\) lakh.",
            explanationTextMap: text("कुल बिक्री \\(= 75 \\times 1.8 = 135\\) लाख। जूनियर कर्मचारियों की कुल बिक्री \\(= 30 \\times 1.2 = 36\\) लाख। वरिष्ठ कर्मचारियों की कुल बिक्री \\(= 135 - 36 = 99\\) लाख। वरिष्ठ कर्मचारियों की संख्या \\(= 75 - 30 = 45\\)। वरिष्ठ कर्मचारियों का औसत \\(= \\frac{99}{45} = 2.2\\) लाख।", "Total sales \\(= 75 \\times 1.8 = 135\\) lakh. Junior employees total sales \\(= 30 \\times 1.2 = 36\\) lakh. Senior employees total sales \\(= 135 - 36 = 99\\) lakh. Number of senior employees \\(= 75 - 30 = 45\\). Senior employees average \\(= \\frac{99}{45} = 2.2\\) lakh.")
        },
        {
            topic: "Percentage",
            difficulty: "Moderate",
            question: "The price of petrol shot up by \\(5\\%\\). Before the hike, the price was Rs. \\(82\\) per litre. A man travels \\(3045\\) km every month and his car gives a mileage of \\(15\\) km per litre. What is the increase in the monthly expenditure (to the nearest Rs.) on the man's travel due to the hike in the petrol prices?",
            questionTextMap: text("पेट्रोल की कीमत में \\(5\\%\\) की वृद्धि हुई। बढ़ोतरी से पहले, कीमत 82 रुपये प्रति लीटर थी। एक आदमी हर महीने 3045 किलोमीटर की यात्रा करता है और उसकी कार 15 किलोमीटर प्रति लीटर का माइलेज देती है। पेट्रोल की कीमतों में बढ़ोतरी के कारण आदमी की यात्रा पर मासिक खर्च (निकटतम रुपये में) में कितनी वृद्धि हुई है?", "The price of petrol shot up by \\(5\\%\\). Before the hike, the price was Rs. \\(82\\) per litre. A man travels \\(3045\\) km every month and his car gives a mileage of \\(15\\) km per litre. What is the increase in the monthly expenditure (to the nearest Rs.) on the man's travel due to the hike in the petrol prices?"),
            options: [
                option("\\(₹820\\)", "\\(₹820\\)"),
                option("\\(₹832\\)", "\\(₹832\\)"),
                option("\\(₹845\\)", "\\(₹845\\)"),
                option("\\(₹850\\)", "\\(₹850\\)")
            ],
            correctAnswer: 1,
            explanation: "Total litres consumed per month \\(= \\frac{3045}{15} = 203\\) litres. Price hike per litre \\(= 5\\% \\text{ of } 82 = Rs. 4.1\\). Increase in monthly expenditure \\(= 203 \\times 4.1 = Rs. 832.3 \\approx Rs. 832\\).",
            explanationTextMap: text("प्रति माह कुल उपभोगित लीटर \\(= \\frac{3045}{15} = 203\\) लीटर। प्रति लीटर मूल्य वृद्धि \\(= 82 \\text{ का } 5\\% = Rs. 4.1\\)। मासिक खर्च में वृद्धि \\(= 203 \\times 4.1 = Rs. 832.3 \\approx Rs. 832\\)।", "Total litres consumed per month \\(= \\frac{3045}{15} = 203\\) litres. Price hike per litre \\(= 5\\% \\text{ of } 82 = Rs. 4.1\\). Increase in monthly expenditure \\(= 203 \\times 4.1 = Rs. 832.3 \\approx Rs. 832\\).")
        },
        {
            topic: "Ratio and Proportion",
            difficulty: "Hard",
            question: "A company placed an order for \\(20\\) high-end laptops and some quantity of standard desktops. The price of a high-end laptop was \\(5\\) times that of a standard desktop. Due to a mistake, the number of laptops and desktops was interchanged in the delivery. This caused the total bill to increase by \\(80\\%\\). What was the ratio of the number of high-end laptops to standard desktops in the original order?",
            questionTextMap: text("एक कंपनी ने 20 हाई-एंड लैपटॉप और कुछ मात्रा में स्टैन्डर्ड डेस्कटॉप का ऑर्डर दिया। हाई-एंड लैपटॉप की कीमत स्टैन्डर्ड डेस्कटॉप से 5 गुना थी। एक गलती के कारण, डिलीवरी में लैपटॉप और डेस्कटॉप की संख्या आपस में बदल गई। इससे कुल बिल 80% बढ़ गया। मूल ऑर्डर में हाई-एंड लैपटॉप और स्टैन्डर्ड डेस्कटॉप की संख्या का अनुपात क्या था?", "A company placed an order for \\(20\\) high-end laptops and some quantity of standard desktops. The price of a high-end laptop was \\(5\\) times that of a standard desktop. Due to a mistake, the number of laptops and desktops was interchanged in the delivery. This caused the total bill to increase by \\(80\\%\\). What was the ratio of the number of high-end laptops to standard desktops in the original order?"),
            options: [
                option("\\(1:2\\)", "\\(1:2\\)"),
                option("\\(2:1\\)", "\\(2:1\\)"),
                option("\\(5:2\\)", "\\(5:2\\)"),
                option("\\(2:5\\)", "\\(2:5\\)")
            ],
            correctAnswer: 3,
            explanation: "Let the price of a desktop be \\(1\\) and a laptop be \\(5\\). Let the original number of desktops be \\(x\\). Original Cost \\(= 20(5) + x(1) = 100 + x\\). New Cost \\(= x(5) + 20(1) = 5x + 20\\). Given \\(5x + 20 = 1.8(100 + x) \\Rightarrow 5x + 20 = 180 + 1.8x \\Rightarrow 3.2x = 160 \\Rightarrow x = 50\\). Ratio of laptops to desktops \\(= 20:50 = 2:5\\).",
            explanationTextMap: text("माना डेस्कटॉप की कीमत \\(1\\) और लैपटॉप की \\(5\\) है। माना डेस्कटॉप की मूल संख्या \\(x\\) है। मूल लागत \\(= 20(5) + x(1) = 100 + x\\)। नई लागत \\(= x(5) + 20(1) = 5x + 20\\)। दिया है \\(5x + 20 = 1.8(100 + x) \\Rightarrow 3.2x = 160 \\Rightarrow x = 50\\)। लैपटॉप और डेस्कटॉप का अनुपात \\(= 20:50 = 2:5\\)।", "Let the price of a desktop be \\(1\\) and a laptop be \\(5\\). Let the original number of desktops be \\(x\\). Original Cost \\(= 20(5) + x(1) = 100 + x\\). New Cost \\(= x(5) + 20(1) = 5x + 20\\). Given \\(5x + 20 = 1.8(100 + x) \\Rightarrow 5x + 20 = 180 + 1.8x \\Rightarrow 3.2x = 160 \\Rightarrow x = 50\\). Ratio of laptops to desktops \\(= 20:50 = 2:5\\).")
        },
        {
            topic: "Compound Interest",
            difficulty: "Hard",
            question: "Find the compound interest on \\(₹8,000\\) at \\(12\\%\\) per annum for \\(3\\) years \\(4\\) months, compounded annually.",
            questionTextMap: text("₹8,000 पर 3 वर्ष 4 माह के लिए 12% वार्षिक दर से वार्षिक संयोजित चक्रवृद्धि ब्याज ज्ञात कीजिए।", "Find the compound interest on \\(₹8,000\\) at \\(12\\%\\) per annum for \\(3\\) years \\(4\\) months, compounded annually."),
            options: [
                option("\\(₹3,000\\)", "\\(₹3,000\\)"),
                option("\\(₹4,000\\)", "\\(₹4,000\\)"),
                option("\\(₹3,689\\)", "\\(₹3,689\\)"),
                option("\\(₹3,600\\)", "\\(₹3,600\\)")
            ],
            correctAnswer: 2,
            explanation: "Amount factor for \\(3\\) years \\(= (1.12)^3\\). For \\(4\\) months (\\(\\frac{1}{3}\\) year), rate \\(= \\frac{12}{3} = 4\\%\\), so factor is \\(1.04\\). Total Amount \\(= 8000 \\times (1.12)^3 \\times 1.04 = 8000 \\times 1.404928 \\times 1.04 \\approx 11689.37\\). Interest \\(= 11689.37 - 8000 \\approx ₹3,689\\).",
            explanationTextMap: text("\\(3\\) वर्षों के लिए मिश्रधन गुणांक \\(= (1.12)^3\\)। \\(4\\) महीनों (\\(\\frac{1}{3}\\) वर्ष) के लिए, दर \\(= 4\\%\\) है, इसलिए गुणांक \\(1.04\\) है। कुल मिश्रधन \\(= 8000 \\times (1.12)^3 \\times 1.04 \\approx 11689.37\\)। ब्याज \\(= 11689.37 - 8000 \\approx ₹3,689\\)।", "Amount factor for \\(3\\) years \\(= (1.12)^3\\). For \\(4\\) months (\\(\\frac{1}{3}\\) year), rate \\(= \\frac{12}{3} = 4\\%\\), so factor is \\(1.04\\). Total Amount \\(= 8000 \\times (1.12)^3 \\times 1.04 \\approx 11689.37\\). Interest \\(= 11689.37 - 8000 \\approx ₹3,689\\).")
        },
        {
            topic: "Profit and Loss",
            difficulty: "Hard",
            question: "A candy shop owner buys three kinds of candies: red, blue, and green. Red candies are purchased at \\(3\\) for \\(₹15\\), blue candies at \\(4\\) for \\(₹18\\), and green candies at \\(5\\) for \\(₹22\\). He mixes them in the ratio \\(1:1:2\\). He sells all the mixed candies at \\(2\\) for \\(₹10\\). What is his approximate gain or loss percentage?",
            questionTextMap: text("एक कैंडी शॉप का मालिक तीन तरह की कैंडी खरीदता है: लाल, नीली और हरी। लाल कैंडी 3 कैंडी ₹15 में, नीली कैंडी 4 कैंडी ₹18 में और हरी कैंडी 5 कैंडी ₹22 में खरीदी जाती है। वह उन्हें 1:1:2 के अनुपात में मिलाता है। वह सभी मिश्रित कैंडी 2 कैंडी ₹10 में बेचता है। उसका अनुमानित लाभ या हानि प्रतिशत क्या है?", "A candy shop owner buys three kinds of candies: red, blue, and green. Red candies are purchased at \\(3\\) for \\(₹15\\), blue candies at \\(4\\) for \\(₹18\\), and green candies at \\(5\\) for \\(₹22\\). He mixes them in the ratio \\(1:1:2\\). He sells all the mixed candies at \\(2\\) for \\(₹10\\). What is his approximate gain or loss percentage?"),
            options: [
                option("Loss of \\(9.2\\%\\)", "Loss of \\(9.2\\%\\)"),
                option("Profit of \\(9.29\\%\\)", "Profit of \\(9.29\\%\\)"),
                option("Profit of \\(10\\%\\)", "Profit of \\(10\\%\\)"),
                option("Loss of \\(10\\%\\)", "Loss of \\(10\\%\\)")
            ],
            correctAnswer: 1,
            explanation: "Let quantities be \\(60\\), \\(60\\), and \\(120\\) candies. Cost of Red \\(= \\frac{15}{3} \\times 60 = 300\\). Cost of Blue \\(= \\frac{18}{4} \\times 60 = 270\\). Cost of Green \\(= \\frac{22}{5} \\times 120 = 528\\). Total CP \\(= 300 + 270 + 528 = ₹1098\\). Total candies \\(= 240\\). SP \\(= \\frac{10}{2} \\times 240 = ₹1200\\). Profit \\(= 1200 - 1098 = 102\\). Profit \\(\\% = \\frac{102}{1098} \\times 100 \\approx 9.29\\%\\).",
            explanationTextMap: text("माना मात्राएँ 60, 60, और 120 कैंडीज हैं। लाल की लागत \\(= 300\\), नीली की \\(= 270\\), हरी की \\(= 528\\)। कुल लागत मूल्य \\(= ₹1098\\)। कुल कैंडीज \\(= 240\\)। विक्रय मूल्य \\(= ₹1200\\)। लाभ \\(= 102\\)। लाभ \\(\\% = \\frac{102}{1098} \\times 100 \\approx 9.29\\%\\)।", "Let quantities be 60, 60, and 120 candies. Cost of Red \\(= 300\\). Cost of Blue \\(= 270\\). Cost of Green \\(= 528\\). Total CP \\(= 300 + 270 + 528 = ₹1098\\). Total candies \\(= 240\\). SP \\(= \\frac{10}{2} \\times 240 = ₹1200\\). Profit \\(= 1200 - 1098 = 102\\). Profit \\(\\% = \\frac{102}{1098} \\times 100 \\approx 9.29\\%\\).")
        },
        {
            topic: "Ratio and Proportion",
            difficulty: "Easy",
            question: "The ratio of boys to girls in a school is \\(7:5\\). If \\(20\\) more girls join the school, the new ratio of boys to girls becomes \\(7:6\\). What is the total number of students in the school initially?",
            questionTextMap: text("एक स्कूल में लड़कों और लड़कियों का अनुपात 7:5 है। यदि 20 और लड़कियाँ स्कूल में शामिल हो जाती हैं, तो लड़कों और लड़कियों का नया अनुपात 7:6 हो जाता है। शुरू में स्कूल में छात्रों की कुल संख्या कितनी थी?", "The ratio of boys to girls in a school is \\(7:5\\). If \\(20\\) more girls join the school, the new ratio of boys to girls becomes \\(7:6\\). What is the total number of students in the school initially?"),
            options: [
                option("\\(200\\)", "\\(200\\)"),
                option("\\(240\\)", "\\(240\\)"),
                option("\\(300\\)", "\\(300\\)"),
                option("\\(360\\)", "\\(360\\)")
            ],
            correctAnswer: 1,
            explanation: "Initial ratio \\(= 7:5\\), new ratio \\(= 7:6\\). The boy count is unchanged. The increase in girl units is \\(1\\) unit \\(= 20\\) girls. Total initial units \\(= 7 + 5 = 12\\) units. Initial total students \\(= 12 \\times 20 = 240\\).",
            explanationTextMap: text("प्रारंभिक अनुपात \\(= 7:5\\), नया अनुपात \\(= 7:6\\)। लड़कों की संख्या अपरिवर्तित है। लड़कियों की इकाइयों में वृद्धि \\(1\\) इकाई \\(= 20\\) लड़कियां है। कुल प्रारंभिक इकाइयाँ \\(= 7 + 5 = 12\\) इकाइयाँ। प्रारंभिक कुल छात्र \\(= 12 \\times 20 = 240\\)।", "Initial ratio \\(= 7:5\\), new ratio \\(= 7:6\\). The boy count is unchanged. The increase in girl units is \\(1\\) unit \\(= 20\\) girls. Total initial units \\(= 7 + 5 = 12\\) units. Initial total students \\(= 12 \\times 20 = 240\\).")
        },
        {
            topic: "Time and Work",
            difficulty: "Moderate",
            question: "A, B, and C are capable of completing a job in \\(30\\), \\(45\\), and \\(90\\) days, respectively. A works every day, while B and C join A every fifth day. How long will it take to finish the task?",
            questionTextMap: text("A, B और C किसी काम को क्रमशः 30, 45 और 90 दिनों में पूरा कर सकते हैं। A हर दिन काम करता है, जबकि B और C हर पांचवें दिन A के साथ जुड़ते हैं। काम पूरा करने में कितना समय लगेगा?", "A, B, and C are capable of completing a job in \\(30\\), \\(45\\), and \\(90\\) days, respectively. A works every day, while B and C join A every fifth day. How long will it take to finish the task?"),
            options: [
                option("\\(25\\text{ days}\\)", "\\(25\\text{ days}\\)"),
                option("\\(18\\text{ days}\\)", "\\(18\\text{ days}\\)"),
                option("\\(16\\text{ days}\\)", "\\(16\\text{ days}\\)"),
                option("\\(12\\text{ days}\\)", "\\(12\\text{ days}\\)")
            ],
            correctAnswer: 0,
            explanation: "Let total work \\(= 90\\) units. Efficiencies: A \\(= 3\\), B \\(= 2\\), C \\(= 1\\). In a \\(5\\)-day cycle: A works \\(5\\) days \\(= 15\\) units. B and C work \\(1\\) day \\(= 3\\) units. Total work per cycle \\(= 18\\) units. Number of cycles needed \\(= \\frac{90}{18} = 5\\) cycles. Total time \\(= 5 \\times 5 = 25\\) days.",
            explanationTextMap: text("माना कुल कार्य \\(= 90\\) इकाइयाँ। कार्यक्षमता: A \\(= 3\\), B \\(= 2\\), C \\(= 1\\)। एक \\(5\\)-दिनाँक चक्र में: A \\(5\\) दिन कार्य करता है \\(= 15\\) इकाइयाँ। B और C \\(1\\) दिन कार्य करते हैं \\(= 3\\) इकाइयाँ। प्रति चक्र कुल कार्य \\(= 18\\) इकाइयाँ। आवश्यक चक्र \\(= \\frac{90}{18} = 5\\) चक्र। कुल समय \\(= 5 \\times 5 = 25\\) दिन।", "Let total work \\(= 90\\) units. Efficiencies: A \\(= 3\\), B \\(= 2\\), C \\(= 1\\). In a \\(5\\)-day cycle: A works \\(5\\) days \\(= 15\\) units. B and C work \\(1\\) day \\(= 3\\) units. Total work per cycle \\(= 18\\) units. Number of cycles needed \\(= \\frac{90}{18} = 5\\) cycles. Total time \\(= 5 \\times 5 = 25\\) days.")
        },
        {
            topic: "Mixture and Alligation",
            difficulty: "Hard",
            // CHECK: The math calculation yields 25 litres (Option 2), but Option 4 (20 litres) is marked green in the document. Flagged for review.
            question: "A \\(100\\)-litre solution contains acid and water in the ratio \\(3:2\\). Some quantity of this solution is removed and replaced with pure acid. If the final ratio of acid to water becomes \\(7:3\\), how many litres of solution were replaced?",
            questionTextMap: text("100概念 के घोल में एसिड और पानी का अनुपात 3:2 है। इस घोल की कुछ मात्रा निकाल कर शुद्ध एसिड से बदल दिया जाता है। यदि एसिड और पानी का अंतिम अनुपात 7:3 हो जाता है, तो कितने लीटर घोल को बदला गया?", "A \\(100\\)-litre solution contains acid and water in the ratio \\(3:2\\). Some quantity of this solution is removed and replaced with pure acid. If the final ratio of acid to water becomes \\(7:3\\), how many litres of solution were replaced?"),
            options: [
                option("\\(35\\text{ litres}\\)", "\\(35\\text{ litres}\\)"),
                option("\\(25\\text{ litres}\\)", "\\(25\\text{ litres}\\)"),
                option("\\(50\\text{ litres}\\)", "\\(50\\text{ litres}\\)"),
                option("\\(20\\text{ litres}\\)", "\\(20\\text{ litres}\\)")
            ],
            correctAnswer: 3,
            explanation: "Initial water \\(= 40\\) litres. Let \\(x\\) litres be replaced. Remaining water after removal \\(= 40 - 0.4x\\). Final water requirement \\(= 30\\) litres. So, \\(40 - 0.4x = 30 \\Rightarrow 0.4x = 10 \\Rightarrow x = 25\\) litres. (Note: Option 4 is color-coded green as correct in the document, which corresponds to index 3).",
            explanationTextMap: text("प्रारंभिक पानी \\(= 40\\) लीटर। माना \\(x\\) लीटर बदला गया। हटाने के बाद शेष पानी \\(= 40 - 0.4x\\)। अंतिम पानी की आवश्यकता \\(= 30\\) लीटर। अतः \\(40 - 0.4x = 30 \\Rightarrow x = 25\\) लीटर। (नोट: दस्तावेज़ में विकल्प 4 को सही चिह्नित किया गया है)।", "Initial water \\(= 40\\) litres. Let \\(x\\) litres be replaced. Remaining water after removal \\(= 40 - 0.4x\\). Final water requirement \\(= 30\\) litres. So, \\(40 - 0.4x = 30 \\Rightarrow 0.4x = 10 \\Rightarrow x = 25\\) litres. (Note: Option 4 is color-coded green as correct in the document).")
        },
        {
            topic: "Time and Work",
            difficulty: "Easy",
            question: "The ratio of the efficiencies of two workers, P and Q, is \\(5:2\\). If P can complete a project in \\(12\\) days, how many days will Q take to complete the same project alone?",
            questionTextMap: text("दो श्रमिकों, P और Q की कार्यक्षमता का अनुपात 5: 2 है। यदि P एक परियोजना को 12 दिनों में पूरा कर सकता है, तो Q को अकेले उसी परियोजना को पूरा करने में कितने दिन लगेंगे?", "The ratio of the efficiencies of two workers, P and Q, is \\(5:2\\). If P can complete a project in \\(12\\) days, how many days will Q take to complete the same project alone?"),
            options: [
                option("\\(24\\text{ days}\\)", "\\(24\\text{ days}\\)"),
                option("\\(30\\text{ days}\\)", "\\(30\\text{ days}\\)"),
                option("\\(35\\text{ days}\\)", "\\(35\\text{ days}\\)"),
                option("\\(40\\text{ days}\\)", "\\(40\\text{ days}\\)")
            ],
            correctAnswer: 1,
            explanation: "Total Work \\(= \\text{Efficiency} \\times \\text{Time} = 5 \\times 12 = 60\\) units. Time taken by Q \\(= \\frac{60}{2} = 30\\) days.",
            explanationTextMap: text("कुल कार्य \\(= 5 \\times 12 = 60\\) इकाइयाँ। Q द्वारा लिया गया समय \\(= \\frac{60}{2} = 30\\) दिन।", "Total Work \\(= \\text{Efficiency} \\times \\text{Time} = 5 \\times 12 = 60\\) units. Time taken by Q \\(= \\frac{60}{2} = 30\\) days.")
        },
        {
            topic: "Speed Time Distance",
            difficulty: "Hard",
            question: "A car starts from point P on a circular track and an SUV starts from point Q, which is \\(600\\) meters ahead of P in the direction of motion. The car's speed is \\(15\\text{ m/s}\\), and the SUV's speed is \\(10\\text{ m/s}\\). The circumference of the track is \\(1.5\\text{ km}\\). How much distance will the car have traveled when it first overtakes the SUV?",
            questionTextMap: text("एक कार एक वृत्ताकार ट्रैक पर बिंदु P से चलना शुरू करती है और एक SUV बिंदु Q से चलना शुरू करती है, जो गति की दिशा में P से 600 मीटर आगे है। कार की गति 15 मीटर/सेकंड है, और SUV की गति 10 मीटर / सेकंड है। ट्रैक की परिधि 1.5 किमी है। जब कार पहली बार SUV से आगे निकलेगी तो उसने कितनी दूरी तय की होगी?", "A car starts from point P on a circular track and an SUV starts from point Q, which is \\(600\\) meters ahead of P in the direction of motion. The car's speed is \\(15\\text{ m/s}\\), and the SUV's speed is \\(10\\text{ m/s}\\). The circumference of the track is \\(1.5\\text{ km}\\). How much distance will the car have traveled when it first overtakes the SUV?"),
            options: [
                option("\\(900\\text{ m}\\)", "\\(900\\text{ m}\\)"),
                option("\\(1200\\text{ m}\\)", "\\(1200\\text{ m}\\)"),
                option("\\(1500\\text{ m}\\)", "\\(1500\\text{ m}\\)"),
                option("\\(1800\\text{ m}\\)", "\\(1800\\text{ m}\\)")
            ],
            correctAnswer: 3,
            explanation: "Relative speed \\(= 15 - 10 = 5\\text{ m/s}\\). Distance to be covered to overtake \\(= 600\\text{ m}\\). Time taken \\(= \\frac{600}{5} = 120\\text{ seconds}\\). Distance covered by the car \\(= 15 \\times 120 = 1800\\text{ m}\\).",
            explanationTextMap: text("सापेक्ष गति \\(= 15 - 10 = 5\\text{ मीटर/सेकंड}\\)। ओवरटेक करने के लिए दूरी \\(= 600\\) मीटर। लिया गया समय \\(= \\frac{600}{5} = 120\\text{ सेकंड}\\)। कार द्वारा तय की गई दूरी \\(= 15 \\times 120 = 1800\\) मीटर।", "Relative speed \\(= 15 - 10 = 5\\text{ m/s}\\). Distance to be covered to overtake \\(= 600\\text{ m}\\). Time taken \\(= \\frac{600}{5} = 120\\text{ seconds}\\). Distance covered by the car \\(= 15 \\times 120 = 1800\\text{ m}\\).")
        },
        {
            topic: "Mensuration",
            difficulty: "Moderate",
            question: "A circular park having a radius of \\(14\\text{ m}\\). If a \\(1.5\\text{ m}\\) wide path is built around it, what is the approximate area of the path?",
            questionTextMap: text("एक वृत्ताकार पार्क की त्रिज्या 14 मीटर है। यदि इसके चारों ओर 1.5 मीटर चौड़ा पथ बनाया जाए, तो पथ का अनुमानित क्षेत्रफल क्या है?", "A circular park having a radius of \\(14\\text{ m}\\). If a \\(1.5\\text{ m}\\) wide path is built around it, what is the approximate area of the path?"),
            options: [
                option("\\(139\\text{ m}^{2}\\)", "\\(139\\text{ m}^{2}\\)"),
                option("\\(135\\text{ m}^{2}\\)", "\\(135\\text{ m}^{2}\\)"),
                option("\\(142\\text{ m}^{2}\\)", "\\(142\\text{ m}^{2}\\)"),
                option("\\(150\\text{ m}^{2}\\)", "\\(150\\text{ m}^{2}\\)")
            ],
            correctAnswer: 0,
            explanation: "Inner radius \\(r = 14\\text{ m}\\), outer radius \\(R = 14 + 1.5 = 15.5\\text{ m}\\). Area of the path \\(= \\pi(R^2 - r^2) = \\frac{22}{7} \\times (15.5^2 - 14^2) = \\frac{22}{7} \\times (240.25 - 196) = \\frac{22}{7} \\times 44.25 \\approx 139.07\\text{ m}^2\\).",
            explanationTextMap: text("आंतरिक त्रिज्या \\(r = 14\\) मीटर, बाहरी त्रिज्या \\(R = 15.5\\) मीटर। पथ का क्षेत्रफल \\(= \\pi(R^2 - r^2) = \\frac{22}{7} \\times (15.5^2 - 14^2) \\approx 139.07\\text{ मीटर}^2\\)।", "Inner radius \\(r = 14\\text{ m}\\), outer radius \\(R = 14 + 1.5 = 15.5\\text{ m}\\). Area of the path \\(= \\pi(R^2 - r^2) = \\frac{22}{7} \\times (15.5^2 - 14^2) \\approx 139.07\\text{ m}^2\\).")
        },
        {
            topic: "Trigonometry",
            difficulty: "Easy",
            question: "What is \\(\\frac{5\\pi}{4}\\) radians in degrees?",
            questionTextMap: text("\\(\\frac{5\\pi}{4}\\) रेडियन कितने डिग्री में है?", "What is \\(\\frac{5\\pi}{4}\\) radians in degrees?"),
            options: [
                option("\\(225^{\\circ}\\)", "\\(225^{\\circ}\\)"),
                option("\\(180^{\\circ}\\)", "\\(180^{\\circ}\\)"),
                option("\\(240^{\\circ}\\)", "\\(240^{\\circ}\\)"),
                option("\\(360^{\\circ}\\)", "\\(360^{\\circ}\\)")
            ],
            correctAnswer: 0,
            explanation: "To convert radians to degrees, substitute \\(\\pi = 180^{\\circ}\\): \\(\\frac{5 \\times 180^{\\circ}}{4} = 5 \\times 45^{\\circ} = 225^{\\circ}\\).",
            explanationTextMap: text("रेडियन को डिग्री में बदलने के लिए \\(\\pi = 180^{\\circ}\\) रखें: \\(\\frac{5 \\times 180^{\\circ}}{4} = 225^{\\circ}\\)।", "To convert radians to degrees, substitute \\(\\pi = 180^{\\circ}\\): \\(\\frac{5 \\times 180^{\\circ}}{4} = 225^{\\circ}\\).")
        },
        {
            topic: "Coordinate Geometry",
            difficulty: "Easy",
            question: "The line \\(y = -x + 4\\) passes through which of the following points?",
            questionTextMap: text("रेखा y = -x + 4, निम्नलिखित में से किस बिंदु से होकर गुजरती है?", "The line \\(y = -x + 4\\) passes through which of the following points?"),
            options: [
                option("\\((2, 2)\\)", "\\((2, 2)\\)"),
                option("\\((5, 4)\\)", "\\((5, 4)\\)"),
                option("\\((1, 2)\\)", "\\((1, 2)\\)"),
                option("\\((3, 6)\\)", "\\((3, 6)\\)")
            ],
            correctAnswer: 0,
            explanation: "Check option \\((2, 2)\\): substitute \\(x = 2, y = 2\\) into \\(y = -x + 4 \\Rightarrow 2 = -2 + 4 \\Rightarrow 2 = 2\\). This is true.",
            explanationTextMap: text("विकल्प \\((2, 2)\\) की जांच करें: \\(x = 2, y = 2\\) को \\(y = -x + 4\\) में रखने पर \\(2 = -2 + 4 \\Rightarrow 2 = 2\\) प्राप्त होता है, जो कि सत्य है।", "Check option \\((2, 2)\\): substitute \\(x = 2, y = 2\\) into \\(y = -x + 4 \\Rightarrow 2 = -2 + 4 \\Rightarrow 2 = 2\\). This is true.")
        },
        {
            topic: "Geometry",
            difficulty: "Easy",
            question: "What is the central angle of a sector with an arc length of \\(10\\text{ cm}\\) in a circle of radius \\(5\\text{ cm}\\)?",
            questionTextMap: text("5 सेमी त्रिज्या वाले वृत्त में 10 सेमी चाप लंबाई वाले एक त्रिज्यखंड का केंद्रीय कोण क्या है?", "What is the central angle of a sector with an arc length of \\(10\\text{ cm}\\) in a circle of radius \\(5\\text{ cm}\\)?"),
            options: [
                option("\\(6\\text{ radians}\\)", "\\(6\\text{ radians}\\)"),
                option("\\(3\\text{ radians}\\)", "\\(3\\text{ radians}\\)"),
                option("\\(2\\text{ radians}\\)", "\\(2\\text{ radians}\\)"),
                option("\\(4\\text{ radians}\\)", "\\(4\\text{ radians}\\)")
            ],
            correctAnswer: 2,
            explanation: "Angle in radians \\(\\theta = \\frac{\\text{Arc Length}}{\\text{Radius}} = \\frac{10}{5} = 2\\text{ radians}\\).",
            explanationTextMap: text("रेडियन में कोण \\(\\theta = \\frac{\\text{चाप की लंबाई}}{\\text{त्रिज्या}} = \\frac{10}{5} = 2\\text{ रेडियन}\\)।", "Angle in radians \\(\\theta = \\frac{\\text{Arc Length}}{\\text{Radius}} = \\frac{10}{5} = 2\\text{ radians}\\).")
        },
        {
            topic: "Trigonometry",
            difficulty: "Easy",
            question: "If \\(\tan(90^{\\circ} - A) = \\sqrt{3}\\), what is \\(\sin A\\)?",
            questionTextMap: text("यदि \\(\tan(90^{\\circ}-A)=\\sqrt{3}\\), तो sin A क्या है?", "If \\(\tan(90^{\\circ} - A) = \\sqrt{3}\\), what is \\(\sin A\\)?"),
            options: [
                option("\\(\\frac{1}{2}\\)", "\\(\\frac{1}{2}\\)"),
                option("\\(\\frac{\\sqrt{3}}{2}\\)", "\\(\\frac{\\sqrt{3}}{2}\\)"),
                option("\\(\\frac{\\sqrt{2}}{2}\\)", "\\(\\frac{\\sqrt{2}}{2}\\)"),
                option("\\(\\frac{3}{4}\\)", "\\(\\frac{3}{4}\\)")
            ],
            correctAnswer: 0,
            explanation: "\\(\tan(90^{\\circ} - A) = \\cot A = \\sqrt{3} \\Rightarrow A = 30^{\\circ}\\). Therefore, \\(\sin A = \\sin 30^{\\circ} = \\frac{1}{2}\\).",
            explanationTextMap: text("\\(\tan(90^{\\circ} - A) = \\cot A = \\sqrt{3} \\Rightarrow A = 30^{\\circ}\\)। इसलिए, \\(\sin A = \\sin 30^{\\circ} = \\frac{1}{2}\\)।", "\\(\tan(90^{\\circ} - A) = \\cot A = \\sqrt{3} \\Rightarrow A = 30^{\\circ}\\). Therefore, \\(\sin A = \\sin 30^{\\circ} = \\frac{1}{2}\\).")
        },
        {
            topic: "Algebra",
            difficulty: "Easy",
            question: "If \\(x = \\sqrt{7}\\), determine the value of \\(x + \\frac{1}{x}\\).",
            questionTextMap: text("यदि \\(x=\\sqrt{7},\\) तो \\(x+\\frac{1}{x}\\) का मान ज्ञात कीजिए", "If \\(x = \\sqrt{7}\\), determine the value of \\(x + \\frac{1}{x}\\)."),
            options: [
                option("\\(\\frac{8\\sqrt{7}}{7}\\)", "\\(\\frac{8\\sqrt{7}}{7}\\)"),
                option("\\(\\frac{7\\sqrt{7}}{8}\\)", "\\(\\frac{7\\sqrt{7}}{8}\\)"),
                option("\\(\\frac{7\\sqrt{7}}{9}\\)", "\\(\\frac{7\\sqrt{7}}{9}\\)"),
                option("\\(\\frac{9\\sqrt{7}}{7}\\)", "\\(\\frac{9\\sqrt{7}}{7}\\)")
            ],
            correctAnswer: 0,
            explanation: "\\(x + \\frac{1}{x} = \\sqrt{7} + \\frac{1}{\\sqrt{7}} = \\frac{7 + 1}{\\sqrt{7}} = \\frac{8}{\\sqrt{7}} = \\frac{8\\sqrt{7}}{7}\\).",
            explanationTextMap: text("\\(x + \\frac{1}{x} = \\sqrt{7} + \\frac{1}{\\sqrt{7}} = \\frac{7 + 1}{\\sqrt{7}} = \\frac{8}{\\sqrt{7}} = \\frac{8\\sqrt{7}}{7}\\)।", "\\(x + \\frac{1}{x} = \\sqrt{7} + \\frac{1}{\\sqrt{7}} = \\frac{7 + 1}{\\sqrt{7}} = \\frac{8}{\\sqrt{7}} = \\frac{8\\sqrt{7}}{7}\\).")
        },
        {
            topic: "Geometry",
            difficulty: "Easy",
            question: "Two triangles are similar with sides in the ratio \\(3:5\\). What is the ratio of their areas?",
            questionTextMap: text("दो त्रिभुज समरूप हैं जिनकी भुजाओं का अनुपात 3:5 है। उनके क्षेत्रफलों का अनुपात क्या है?", "Two triangles are similar with sides in the ratio \\(3:5\\). What is the ratio of their areas?"),
            options: [
                option("\\(3:5\\)", "\\(3:5\\)"),
                option("\\(5:3\\)", "\\(5:3\\)"),
                option("\\(9:25\\)", "\\(9:25\\)"),
                option("\\(25:9\\)", "\\(25:9\\)")
            ],
            correctAnswer: 2,
            explanation: "For similar triangles, the ratio of their areas is the square of the ratio of their corresponding sides: \\(3^2 : 5^2 = 9:25\\).",
            explanationTextMap: text("समरूप त्रिभुजों के लिए, उनके क्षेत्रफलों का अनुपात उनकी संगत भुजाओं के अनुपात का वर्ग होता है: \\(3^2 : 5^2 = 9:25\\)।", "For similar triangles, the ratio of their areas is the square of the ratio of their corresponding sides: \\(3^2 : 5^2 = 9:25\\).")
        },
        {
            topic: "Algebra",
            difficulty: "Moderate",
            question: "If \\(x = \\sqrt{\\frac{2+\\sqrt{3}}{2-\\sqrt{3}}}\\), then determine the value of \\(x^{2}+x-9\\)?",
            questionTextMap: text("यदि \\(x=\\sqrt{\\frac{2+\\sqrt{3}}{2-\\sqrt{3}}},\\) फिर का मान निर्धारित करें \\(x^{2}+x-9\\)", "If \\(x = \\sqrt{\\frac{2+\\sqrt{3}}{2-\\sqrt{3}}}\\), then determine the value of \\(x^{2}+x-9\\)?"),
            options: [
                option("\\(3\\sqrt{3}\\)", "\\(3\\sqrt{3}\\)"),
                option("\\(5\\sqrt{3}\\)", "\\(5\\sqrt{3}\\)"),
                option("\\(7\\sqrt{3}\\)", "\\(7\\sqrt{3}\\)"),
                option("\\(9\\sqrt{3}\\)", "\\(9\\sqrt{3}\\)")
            ],
            correctAnswer: 1,
            explanation: "Rationalizing the denominator: \\(x = \\sqrt{\\frac{(2+\\sqrt{3})^2}{(2-\\sqrt{3})(2+\\sqrt{3})}} = 2 + \\sqrt{3}\\). Thus, \\(x^2 = (2+\\sqrt{3})^2 = 7 + 4\\sqrt{3}\\). Substituting into the expression: \\(x^2 + x - 9 = 7 + 4\\sqrt{3} + 2 + \\sqrt{3} - 9 = 5\\sqrt{3}\\).",
            explanationTextMap: text("हर का परिमेयकरण करने पर: \\(x = 2 + \\sqrt{3}\\)। इस प्रकार, \\(x^2 = 7 + 4\\sqrt{3}\\)। व्यंजक में मान रखने पर: \\(x^2 + x - 9 = 7 + 4\\sqrt{3} + 2 + \\sqrt{3} - 9 = 5\\sqrt{3}\\)।", "Rationalizing the denominator: \\(x = \\sqrt{\\frac{(2+\\sqrt{3})^2}{(2-\\sqrt{3})(2+\\sqrt{3})}} = 2 + \\sqrt{3}\\). Thus, \\(x^2 = (2+\\sqrt{3})^2 = 7 + 4\\sqrt{3}\\). Substituting into the expression: \\(x^2 + x - 9 = 7 + 4\\sqrt{3} + 2 + \\sqrt{3} - 9 = 5\\sqrt{3}\\).")
        },
        {
            topic: "Geometry",
            difficulty: "Moderate",
            // CHECK: For a cyclic quadrilateral, the sum of all angles is 360 degrees, which gives x = 36 degrees. However, the requirement that opposite angles must sum to 180 degrees is violated by the ratio 1:2:3:4 since 1+3 != 2+4. Flagged for potential structural error in the exam source question text.
            question: "The angles of a cyclic quadrilateral are in the ratio \\(1:2:3:4\\). What is the measure of the smallest angle?",
            questionTextMap: text("एक चक्रीय चतुर्भुज के कोणों का अनुपात 1:2:3:4 है। सबसे छोटे कोण का माप क्या है?", "The angles of a cyclic quadrilateral are in the ratio \\(1:2:3:4\\). What is the measure of the smallest angle?"),
            options: [
                option("\\(36^{\\circ}\\)", "\\(36^{\\circ}\\)"),
                option("\\(72^{\\circ}\\)", "\\(72^{\\circ}\\)"),
                option("\\(108^{\\circ}\\)", "\\(108^{\\circ}\\)"),
                option("\\(144^{\\circ}\\)", "\\(144^{\\circ}\\)")
            ],
            correctAnswer: 0,
            explanation: "Sum of ratio parts \\(= 1 + 2 + 3 + 4 = 10\\). Total sum of angles in a quadrilateral \\(= 360^{\\circ}\\). Smallest angle unit value \\(= \\frac{360^{\\circ}}{10} = 36^{\\circ}\\). Smallest angle \\(= 1 \\times 36^{\\circ} = 36^{\\circ}\\).",
            explanationTextMap: text("अनुपात भागों का योग \\(= 1 + 2 + 3 + 4 = 10\\)। चतुर्भुज के कोणों का कुल योग \\(= 360^{\\circ}\\)। सबसे छोटे कोण इकाई का मान \\(= \\frac{360^{\\circ}}{10} = 36^{\\circ}\\)। सबसे छोटा कोण \\(= 1 \\times 36^{\\circ} = 36^{\\circ}\\)।", "Sum of ratio parts \\(= 1 + 2 + 3 + 4 = 10\\). Total sum of angles in a quadrilateral \\(= 360^{\\circ}\\). Smallest angle unit value \\(= \\frac{360^{\\circ}}{10} = 36^{\\circ}\\). Smallest angle \\(= 1 \\times 36^{\\circ} = 36^{\\circ}\\).")
        },
        {
            topic: "Trigonometry",
            difficulty: "Easy",
            question: "If \\(\\sec A = \\frac{13}{5}\\) and A is acute, find \\(\\sin A\\).",
            questionTextMap: text("यदि secA \\(=\\frac{13}{5}\\) और A न्यूनकोण है, तो ज्ञात कीजिए sinA.", "If \\(\\sec A = \\frac{13}{5}\\) and A is acute, find \\(\\sin A\\)."),
            options: [
                option("\\(\\frac{5}{13}\\)", "\\(\\frac{5}{13}\\)"),
                option("\\(\\frac{12}{13}\\)", "\\(\\frac{12}{13}\\)"),
                option("\\(\\frac{13}{12}\\)", "\\(\\frac{13}{12}\\)"),
                option("\\(1\\)", "\\(1\\)")
            ],
            correctAnswer: 1,
            explanation: "\\(\\sec A = \\frac{\\text{Hypotenuse}}{\\text{Base}} = \\frac{13}{5}\\). Using the Pythagorean theorem, \\(\\text{Perpendicular} = \\sqrt{13^2 - 5^2} = 12\\). Therefore, \\(\\sin A = \\frac{\\text{Perpendicular}}{\\text{Hypotenuse}} = \\frac{12}{13}\\).",
            explanationTextMap: text("\\(\\sec A = \\frac{\\text{कर्ण}}{\\text{आधार}} = \\frac{13}{5}\\)। पाइथागोरस प्रमेय से, \\text{लम्ब} \\(= \\sqrt{13^2 - 5^2} = 12\\)। इसलिए, \\(\\sin A = \\frac{\\text{लम्ब}}{\\text{कर्ण}} = \\frac{12}{13}\\)।", "\\(\\sec A = \\frac{\\text{Hypotenuse}}{\\text{Base}} = \\frac{13}{5}\\). Using the Pythagorean theorem, \\(\\text{Perpendicular} = \\sqrt{13^2 - 5^2} = 12\\). Therefore, \\(\\sin A = \\frac{\\text{Perpendicular}}{\\text{Hypotenuse}} = \\frac{12}{13}\\).")
        }
    ].map((question, index) => ({
        id: `${quizId}-q${String(index + 1).padStart(2, "0")}`,
        subject: "Quantitative Aptitude",
        marks: 1,
        negativeMarks: 0.25,
        ...question
    }));

    window.GJU_QUIZ_BANK.push({
        id: quizId,
        subject: "Quantitative Aptitude",
        title: "SSC CGL Tier 1 - 12 Sep 2025 Shift 2 (Quantitative Aptitude)",
        description: "Bilingual official exam questions with detailed explanations and full LaTeX math rendering layout.",
        durationMinutes: 20,
        totalQuestions: questions.length,
        marksPerQuestion: 1,
        negativeMarks: 0.25,
        difficulty: "Mixed",
        tags: ["SSC CGL", "Quantitative Aptitude", "Bilingual", "Previous Year Papers"],
        questions
    });
}());