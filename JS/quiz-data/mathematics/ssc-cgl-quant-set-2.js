(function () {
    "use strict";

    window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];

    const quizId = "ssc-maths-quiz-5-billingual";

    function text(hi, en) {
        return { hi, en };
    }

    function option(hi, en) {
        return { text: text(hi, en) };
    }

    const questions = [
        {
            topic: "Fractions",
            difficulty: "Moderate",
            question: "Arrange the fractions \\(\\frac{5}{9}\\), \\(\\frac{4}{7}\\), \\(\\frac{3}{5}\\), and \\(\\frac{2}{3}\\) in ascending order.",
            questionTextMap: text("भिन्नों को आरोही क्रम में व्यवस्थित करें \\(\\frac{5}{9}\\), \\(\\frac{4}{7}\\), \\(\\frac{3}{5}\\), और \\(\\frac{2}{3}\\)।", "Arrange the fractions \\(\\frac{5}{9}\\), \\(\\frac{4}{7}\\), \\(\\frac{3}{5}\\), and \\(\\frac{2}{3}\\) in ascending order."),
            options: [
                option("\\(\\frac{3}{5}, \\frac{4}{7}, \\frac{2}{3}, \\frac{5}{9}\\)", "\\(\\frac{3}{5}, \\frac{4}{7}, \\frac{2}{3}, \\frac{5}{9}\\)"),
                option("\\(\\frac{5}{9}, \\frac{4}{7}, \\frac{3}{5}, \\frac{2}{3}\\)", "\\(\\frac{5}{9}, \\frac{4}{7}, \\frac{3}{5}, \\frac{2}{3}\\)"),
                option("\\(\\frac{2}{3}, \\frac{3}{5}, \\frac{4}{7}, \\frac{5}{9}\\)", "\\(\\frac{2}{3}, \\frac{3}{5}, \\frac{4}{7}, \\frac{5}{9}\\)"),
                option("\\(\\frac{4}{7}, \\frac{5}{9}, \\frac{2}{3}, \\frac{3}{5}\\)", "\\(\\frac{4}{7}, \\frac{5}{9}, \\frac{2}{3}, \\frac{3}{5}\\)")
            ],
            correctAnswer: 1,
            explanation: "Converting to decimals: \\(\\frac{5}{9}\\approx0.556\\), \\(\\frac{4}{7}\\approx0.571\\), \\(\\frac{3}{5}=0.6\\), \\(\\frac{2}{3}\\approx0.667\\). So the ascending order is \\(\\frac{5}{9}<\\frac{4}{7}<\\frac{3}{5}<\\frac{2}{3}\\).",
            explanationTextMap: text("दशमलव में बदलने पर: \\(\\frac{5}{9}\\approx0.556\\), \\(\\frac{4}{7}\\approx0.571\\), \\(\\frac{3}{5}=0.6\\), \\(\\frac{2}{3}\\approx0.667\\)। अतः आरोही क्रम \\(\\frac{5}{9}<\\frac{4}{7}<\\frac{3}{5}<\\frac{2}{3}\\) है।", "Converting to decimals: \\(\\frac{5}{9}\\approx0.556\\), \\(\\frac{4}{7}\\approx0.571\\), \\(\\frac{3}{5}=0.6\\), \\(\\frac{2}{3}\\approx0.667\\). So the ascending order is \\(\\frac{5}{9}<\\frac{4}{7}<\\frac{3}{5}<\\frac{2}{3}\\).")
        },
        {
            topic: "Simplification",
            difficulty: "Easy",
            question: "Simplify: \\(\\left(2\\frac{1}{2}+3.6\\right)-1.9\\).",
            questionTextMap: text("सरल करें: \\(\\left(2\\frac{1}{2}+3.6\\right)-1.9\\)।", "Simplify: \\(\\left(2\\frac{1}{2}+3.6\\right)-1.9\\)."),
            options: [option("\\(4.2\\)", "\\(4.2\\)"), option("\\(5.2\\)", "\\(5.2\\)"), option("\\(6.2\\)", "\\(6.2\\)"), option("\\(7.2\\)", "\\(7.2\\)")],
            correctAnswer: 0,
            explanation: "\\(2\\frac{1}{2}+3.6=2.5+3.6=6.1\\). Then \\(6.1-1.9=4.2\\).",
            explanationTextMap: text("\\(2\\frac{1}{2}+3.6=2.5+3.6=6.1\\)। फिर \\(6.1-1.9=4.2\\)।", "\\(2\\frac{1}{2}+3.6=2.5+3.6=6.1\\). Then \\(6.1-1.9=4.2\\).")
        },
        {
            topic: "Simplification",
            difficulty: "Hard",
            question: "Evaluate: \\(7\\frac{1}{4}-\\left[\\frac{5}{6}\\div\\left\\{\\frac{1}{3}-\\left(\\frac{1}{2}\\times\\left(\\frac{3}{4}-\\frac{1}{4}\\right)\\right)\\right\\}\\right]\\).",
            questionTextMap: text("\\(7\\frac{1}{4}-\\left[\\frac{5}{6}\\div\\left\\{\\frac{1}{3}-\\left(\\frac{1}{2}\\times\\left(\\frac{3}{4}-\\frac{1}{4}\\right)\\right)\\right\\}\\right]\\) का मूल्यांकन करें।", "Evaluate: \\(7\\frac{1}{4}-\\left[\\frac{5}{6}\\div\\left\\{\\frac{1}{3}-\\left(\\frac{1}{2}\\times\\left(\\frac{3}{4}-\\frac{1}{4}\\right)\\right)\\right\\}\\right]\\)."),
            options: [option("\\(-3\\frac{1}{4}\\)", "\\(-3\\frac{1}{4}\\)"), option("\\(3\\frac{1}{4}\\)", "\\(3\\frac{1}{4}\\)"), option("\\(-2\\frac{3}{4}\\)", "\\(-2\\frac{3}{4}\\)"), option("\\(2\\frac{3}{4}\\)", "\\(2\\frac{3}{4}\\)")],
            correctAnswer: 2,
            explanation: "\\(\\frac{3}{4}-\\frac{1}{4}=\\frac{1}{2}\\), so \\(\\frac{1}{2}\\times\\frac{1}{2}=\\frac{1}{4}\\). Then \\(\\frac{1}{3}-\\frac{1}{4}=\\frac{1}{12}\\), so \\(\\frac{5}{6}\\div\\frac{1}{12}=10\\). Finally \\(7\\frac{1}{4}-10=-2\\frac{3}{4}\\).",
            explanationTextMap: text("\\(\\frac{3}{4}-\\frac{1}{4}=\\frac{1}{2}\\), अतः \\(\\frac{1}{2}\\times\\frac{1}{2}=\\frac{1}{4}\\)। फिर \\(\\frac{1}{3}-\\frac{1}{4}=\\frac{1}{12}\\), अतः \\(\\frac{5}{6}\\div\\frac{1}{12}=10\\)। अंत में \\(7\\frac{1}{4}-10=-2\\frac{3}{4}\\)।", "\\(\\frac{3}{4}-\\frac{1}{4}=\\frac{1}{2}\\), so \\(\\frac{1}{2}\\times\\frac{1}{2}=\\frac{1}{4}\\). Then \\(\\frac{1}{3}-\\frac{1}{4}=\\frac{1}{12}\\), so \\(\\frac{5}{6}\\div\\frac{1}{12}=10\\). Finally \\(7\\frac{1}{4}-10=-2\\frac{3}{4}\\).")
        },
        {
            topic: "Data Interpretation",
            difficulty: "Moderate",
            question: "From a sample of \\(200\\) software engineers: proficient in Python and Java \\(=50\\); proficient in Python only \\(=70\\); proficient in Java only \\(=60\\); proficient in neither \\(=20\\). Find the ratio of those proficient in Python to those proficient in Java.",
            questionTextMap: text("\\(200\\) सॉफ्टवेयर इंजीनियरों के नमूने में: पायथन और जावा दोनों में कुशल \\(=50\\); केवल पायथन में कुशल \\(=70\\); केवल जावा में कुशल \\(=60\\); किसी भी भाषा में कुशल नहीं \\(=20\\)। पायथन में कुशल लोगों और जावा में कुशल लोगों का अनुपात ज्ञात कीजिए।", "From a sample of \\(200\\) software engineers: proficient in Python and Java \\(=50\\); proficient in Python only \\(=70\\); proficient in Java only \\(=60\\); proficient in neither \\(=20\\). Find the ratio of those proficient in Python to those proficient in Java."),
            options: [option("\\(11:12\\)", "\\(11:12\\)"), option("\\(12:11\\)", "\\(12:11\\)"), option("\\(7:6\\)", "\\(7:6\\)"), option("\\(6:7\\)", "\\(6:7\\)")],
            correctAnswer: 1,
            explanation: "Python proficient \\(=50+70=120\\). Java proficient \\(=50+60=110\\). Ratio \\(=120:110=12:11\\).",
            explanationTextMap: text("पायथन में कुशल \\(=50+70=120\\)। जावा में कुशल \\(=50+60=110\\)। अनुपात \\(=120:110=12:11\\)।", "Python proficient \\(=50+70=120\\). Java proficient \\(=50+60=110\\). Ratio \\(=120:110=12:11\\).")
        },
        {
            topic: "Partnership",
            difficulty: "Moderate",
            question: "Arvind started a business by investing Rs. \\(80000\\). After \\(4\\) months, Bhavin joined with Rs. \\(120000\\). At the end of \\(8\\) months from the start, Chandan joined with Rs. \\(160000\\). If the total profit is Rs. \\(105000\\) at the end of the year, find the share of Chandan.",
            questionTextMap: text("अरविंद ने Rs. \\(80000\\) निवेश करके एक व्यवसाय शुरू किया। \\(4\\) महीने बाद, भाविन Rs. \\(120000\\) के साथ शामिल हुआ। शुरुआत से \\(8\\) महीने के अंत में, चंदन Rs. \\(160000\\) के साथ शामिल हुआ। यदि कुल लाभ Rs. \\(105000\\) है, तो चंदन का हिस्सा ज्ञात कीजिए।", "Arvind started a business by investing Rs. \\(80000\\). After \\(4\\) months, Bhavin joined with Rs. \\(120000\\). At the end of \\(8\\) months from the start, Chandan joined with Rs. \\(160000\\). If the total profit is Rs. \\(105000\\) at the end of the year, find the share of Chandan."),
            options: [option("Rs. \\(26500\\)", "Rs. \\(26500\\)"), option("Rs. \\(26000\\)", "Rs. \\(26000\\)"), option("Rs. \\(26200\\)", "Rs. \\(26200\\)"), option("Rs. \\(26250\\)", "Rs. \\(26250\\)")],
            correctAnswer: 3,
            explanation: "Investment\\(\\times\\)time: Arvind \\(=80000\\times12=960000\\); Bhavin \\(=120000\\times8=960000\\); Chandan \\(=160000\\times4=640000\\). Total \\(=2560000\\). Chandan's share \\(=\\frac{640000}{2560000}\\times105000=26250\\).",
            explanationTextMap: text("निवेश\\(\\times\\)समय: अरविंद \\(=80000\\times12=960000\\); भाविन \\(=120000\\times8=960000\\); चंदन \\(=160000\\times4=640000\\)। कुल \\(=2560000\\)। चंदन का हिस्सा \\(=\\frac{640000}{2560000}\\times105000=26250\\)।", "Investment\\(\\times\\)time: Arvind \\(=80000\\times12=960000\\); Bhavin \\(=120000\\times8=960000\\); Chandan \\(=160000\\times4=640000\\). Total \\(=2560000\\). Chandan's share \\(=\\frac{640000}{2560000}\\times105000=26250\\).")
        },
        {
            topic: "Partnership",
            difficulty: "Easy",
            question: "A and B start a business. A invests Rs. \\(80000\\) for \\(9\\) months, B invests Rs. \\(120000\\) for \\(6\\) months. What is B's share of a Rs. \\(45000\\) profit?",
            questionTextMap: text("A और B एक व्यवसाय शुरू करते हैं। A \\(9\\) महीने के लिए Rs. \\(80000\\) का निवेश करता है, B \\(6\\) महीने के लिए Rs. \\(120000\\) का निवेश करता है। Rs. \\(45000\\) के लाभ में B का हिस्सा क्या है?", "A and B start a business. A invests Rs. \\(80000\\) for \\(9\\) months, B invests Rs. \\(120000\\) for \\(6\\) months. What is B's share of a Rs. \\(45000\\) profit?"),
            options: [option("Rs. \\(26500\\)", "Rs. \\(26500\\)"), option("Rs. \\(28000\\)", "Rs. \\(28000\\)"), option("Rs. \\(36000\\)", "Rs. \\(36000\\)"), option("Rs. \\(22500\\)", "Rs. \\(22500\\)")],
            correctAnswer: 3,
            explanation: "A's share \\(=80000\\times9=720000\\); B's share \\(=120000\\times6=720000\\), so ratio is \\(1:1\\). B's profit share \\(=\\frac{45000}{2}=22500\\).",
            explanationTextMap: text("A का हिस्सा \\(=80000\\times9=720000\\); B का हिस्सा \\(=120000\\times6=720000\\), अतः अनुपात \\(1:1\\) है। B का लाभ हिस्सा \\(=\\frac{45000}{2}=22500\\)।", "A's share \\(=80000\\times9=720000\\); B's share \\(=120000\\times6=720000\\), so ratio is \\(1:1\\). B's profit share \\(=\\frac{45000}{2}=22500\\).")
        },
        {
            topic: "Average",
            difficulty: "Easy",
            question: "What is the average of all integers between \\(100\\) and \\(250\\) that are exactly divisible by \\(11\\)?",
            questionTextMap: text("\\(100\\) और \\(250\\) के बीच उन सभी पूर्णांकों का औसत क्या है जो \\(11\\) से पूर्णतः विभाज्य हैं?", "What is the average of all integers between \\(100\\) and \\(250\\) that are exactly divisible by \\(11\\)?"),
            options: [option("\\(176\\)", "\\(176\\)"), option("\\(186\\)", "\\(186\\)"), option("\\(196\\)", "\\(196\\)"), option("\\(146\\)", "\\(146\\)")],
            correctAnswer: 0,
            explanation: "The numbers are \\(110,121,\\ldots,242\\), a total of \\(13\\) terms. Average of an AP \\(=\\frac{110+242}{2}=176\\).",
            explanationTextMap: text("संख्याएं \\(110,121,\\ldots,242\\) हैं, कुल \\(13\\) पद। समांतर श्रेणी का औसत \\(=\\frac{110+242}{2}=176\\)।", "The numbers are \\(110,121,\\ldots,242\\), a total of \\(13\\) terms. Average of an AP \\(=\\frac{110+242}{2}=176\\).")
        },
        {
            topic: "Average",
            difficulty: "Hard",
            question: "The average of \\(15\\) numbers is \\(80\\). The average of the first \\(6\\) numbers is \\(72\\). The average of the next \\(6\\) numbers is \\(25\\%\\) more than the average of the first \\(6\\) numbers. The \\(13\\text{th}\\) number is \\(8\\) more than the \\(15\\text{th}\\) number, and the \\(14\\text{th}\\) number is \\(10\\) less than the \\(15\\text{th}\\) number. What is the average of the \\(13\\text{th}\\) and \\(14\\text{th}\\) numbers?",
            questionTextMap: text("\\(15\\) संख्याओं का औसत \\(80\\) है। पहली \\(6\\) संख्याओं का औसत \\(72\\) है। अगली \\(6\\) संख्याओं का औसत पहली \\(6\\) संख्याओं के औसत से \\(25\\%\\) अधिक है। \\(13\\)वीं संख्या \\(15\\)वीं संख्या से \\(8\\) अधिक है, और \\(14\\)वीं संख्या \\(15\\)वीं संख्या से \\(10\\) कम है। \\(13\\)वीं और \\(14\\)वीं संख्याओं का औसत क्या है?", "The average of \\(15\\) numbers is \\(80\\). The average of the first \\(6\\) numbers is \\(72\\). The average of the next \\(6\\) numbers is \\(25\\%\\) more than the average of the first \\(6\\) numbers. The \\(13\\text{th}\\) number is \\(8\\) more than the \\(15\\text{th}\\) number, and the \\(14\\text{th}\\) number is \\(10\\) less than the \\(15\\text{th}\\) number. What is the average of the \\(13\\text{th}\\) and \\(14\\text{th}\\) numbers?"),
            options: [option("\\(70.89\\)", "\\(70.89\\)"), option("\\(85\\)", "\\(85\\)"), option("\\(75.67\\)", "\\(75.67\\)"), option("\\(80.65\\)", "\\(80.65\\)")],
            correctAnswer: 2,
            explanation: "Sum of \\(15\\) numbers \\(=15\\times80=1200\\). Sum of first \\(6\\)\\(=6\\times72=432\\). Average of next \\(6\\)\\(=72\\times1.25=90\\), sum \\(=540\\). So sum of first \\(12=972\\), and sum of last \\(3=228\\). Let \\(15\\text{th}=x\\); then \\(13\\text{th}=x+8\\), \\(14\\text{th}=x-10\\), so \\(3x-2=228\\Rightarrow x=76.67\\). Average of \\(13\\text{th}\\) and \\(14\\text{th}\\)\\(=\\frac{84.67+66.67}{2}=75.67\\).",
            explanationTextMap: text("\\(15\\) संख्याओं का योग \\(=15\\times80=1200\\)। पहली \\(6\\) का योग \\(=6\\times72=432\\)। अगली \\(6\\) का औसत \\(=72\\times1.25=90\\), योग \\(=540\\)। अतः पहली \\(12\\) का योग \\(=972\\), और अंतिम \\(3\\) का योग \\(=228\\)। मान लें \\(15\\)वीं संख्या \\(=x\\); तब \\(13\\)वीं\\(=x+8\\), \\(14\\)वीं\\(=x-10\\), अतः \\(3x-2=228\\Rightarrow x=76.67\\)। \\(13\\)वीं और \\(14\\)वीं का औसत \\(=\\frac{84.67+66.67}{2}=75.67\\)।", "Sum of \\(15\\) numbers \\(=15\\times80=1200\\). Sum of first \\(6\\)\\(=6\\times72=432\\). Average of next \\(6\\)\\(=72\\times1.25=90\\), sum \\(=540\\). So sum of first \\(12=972\\), and sum of last \\(3=228\\). Let \\(15\\text{th}=x\\); then \\(13\\text{th}=x+8\\), \\(14\\text{th}=x-10\\), so \\(3x-2=228\\Rightarrow x=76.67\\). Average of \\(13\\text{th}\\) and \\(14\\text{th}\\)\\(=\\frac{84.67+66.67}{2}=75.67\\).")
        },
        {
            topic: "Percentage",
            difficulty: "Moderate",
            question: "A landlord bought a flat for Rs. \\(800000\\). He wants to earn a \\(9\\%\\) annual return on his investment after paying Rs. \\(2000\\) per month for maintenance. What should be the monthly rent he charges?",
            questionTextMap: text("एक मकान मालिक ने Rs. \\(800000\\) में एक फ्लैट खरीदा। वह रखरखाव के लिए हर महीने Rs. \\(2000\\) का भुगतान करने के बाद अपने निवेश पर \\(9\\%\\) वार्षिक रिटर्न कमाना चाहता है। उसे हर महीने कितना किराया लेना चाहिए?", "A landlord bought a flat for Rs. \\(800000\\). He wants to earn a \\(9\\%\\) annual return on his investment after paying Rs. \\(2000\\) per month for maintenance. What should be the monthly rent he charges?"),
            options: [option("Rs. \\(7000\\)", "Rs. \\(7000\\)"), option("Rs. \\(7500\\)", "Rs. \\(7500\\)"), option("Rs. \\(8000\\)", "Rs. \\(8000\\)"), option("Rs. \\(8500\\)", "Rs. \\(8500\\)")],
            correctAnswer: 2,
            explanation: "Required annual return \\(=9\\%\\text{ of }800000=72000\\). Annual maintenance \\(=2000\\times12=24000\\). Total required \\(=72000+24000=96000\\). Monthly rent \\(=\\frac{96000}{12}=8000\\).",
            explanationTextMap: text("आवश्यक वार्षिक रिटर्न \\(=9\\%\\text{ of }800000=72000\\)। वार्षिक रखरखाव \\(=2000\\times12=24000\\)। कुल आवश्यक \\(=72000+24000=96000\\)। मासिक किराया \\(=\\frac{96000}{12}=8000\\)।", "Required annual return \\(=9\\%\\text{ of }800000=72000\\). Annual maintenance \\(=2000\\times12=24000\\). Total required \\(=72000+24000=96000\\). Monthly rent \\(=\\frac{96000}{12}=8000\\).")
        },
        {
            topic: "Compound Interest",
            difficulty: "Moderate",
            question: "An amount is said to double in \\(5\\) years with compound interest. How many years will it take for the amount to grow to \\(8\\) times its original value?",
            questionTextMap: text("कहा जाता है कि एक राशि चक्रवृद्धि ब्याज के साथ \\(5\\) वर्षों में दोगुनी हो जाती है। राशि को अपने मूल मूल्य से \\(8\\) गुना बढ़ने में कितने वर्ष लगेंगे?", "An amount is said to double in \\(5\\) years with compound interest. How many years will it take for the amount to grow to \\(8\\) times its original value?"),
            options: [option("\\(15\\)", "\\(15\\)"), option("\\(16\\)", "\\(16\\)"), option("\\(17\\)", "\\(17\\)"), option("\\(18\\)", "\\(18\\)")],
            correctAnswer: 0,
            explanation: "If the amount doubles in \\(5\\) years, \\((1+r)^5=2\\). To become \\(8=2^3\\) times, it will take \\(3\\times5=15\\) years.",
            explanationTextMap: text("यदि राशि \\(5\\) वर्षों में दोगुनी होती है, तो \\((1+r)^5=2\\)। \\(8=2^3\\) गुना होने में \\(3\\times5=15\\) वर्ष लगेंगे।", "If the amount doubles in \\(5\\) years, \\((1+r)^5=2\\). To become \\(8=2^3\\) times, it will take \\(3\\times5=15\\) years.")
        },
        {
            topic: "Compound Interest",
            difficulty: "Hard",
            question: "A sum becomes Rs. \\(6600\\) in \\(2\\) years and Rs. \\(7920\\) in \\(3\\) years at compound interest. What is the original principal?",
            questionTextMap: text("चक्रवृद्धि ब्याज पर एक धनराशि \\(2\\) वर्ष में Rs. \\(6600\\) तथा \\(3\\) वर्ष में Rs. \\(7920\\) हो जाती है। मूल मूलधन क्या है?", "A sum becomes Rs. \\(6600\\) in \\(2\\) years and Rs. \\(7920\\) in \\(3\\) years at compound interest. What is the original principal?"),
            options: [option("Rs. \\(4000.33\\)", "Rs. \\(4000.33\\)"), option("Rs. \\(5583.33\\)", "Rs. \\(5583.33\\)"), option("Rs. \\(4583.33\\)", "Rs. \\(4583.33\\)"), option("Rs. \\(6583.33\\)", "Rs. \\(6583.33\\)")],
            correctAnswer: 2,
            explanation: "\\((1+r)=\\frac{7920}{6600}=1.2\\), so the rate is \\(20\\%\\). Principal \\(=\\frac{6600}{(1.2)^2}=\\frac{6600}{1.44}=4583.33\\).",
            explanationTextMap: text("\\((1+r)=\\frac{7920}{6600}=1.2\\), अतः दर \\(20\\%\\) है। मूलधन \\(=\\frac{6600}{(1.2)^2}=\\frac{6600}{1.44}=4583.33\\)।", "\\((1+r)=\\frac{7920}{6600}=1.2\\), so the rate is \\(20\\%\\). Principal \\(=\\frac{6600}{(1.2)^2}=\\frac{6600}{1.44}=4583.33\\).")
        },
        {
            topic: "Profit and Loss",
            difficulty: "Easy",
            question: "Suman purchased \\(25\\) liters of milk at Rs. \\(45\\) per liter and another \\(15\\) liters of milk at Rs. \\(50\\) per liter. She combined both quantities and then sold the entire mixture at Rs. \\(48\\) per liter. What was her total profit or loss?",
            questionTextMap: text("सुमन ने \\(25\\) लीटर दूध \\(45\\) रुपये प्रति लीटर की दर से और \\(15\\) लीटर दूध \\(50\\) रुपये प्रति लीटर की दर से खरीदा। उसने दोनों मात्राओं को मिलाया और फिर पूरे मिश्रण को \\(48\\) रुपये प्रति लीटर की दर से बेचा। उसका कुल लाभ या हानि क्या थी?", "Suman purchased \\(25\\) liters of milk at Rs. \\(45\\) per liter and another \\(15\\) liters of milk at Rs. \\(50\\) per liter. She combined both quantities and then sold the entire mixture at Rs. \\(48\\) per liter. What was her total profit or loss?"),
            options: [option("\\(45\\) रुपये की हानि", "Loss of Rs. \\(45\\)"), option("\\(45\\) रुपये का लाभ", "Profit of Rs. \\(45\\)"), option("\\(90\\) रुपये का लाभ", "Profit of Rs. \\(90\\)"), option("\\(90\\) रुपये की हानि", "Loss of Rs. \\(90\\)")],
            correctAnswer: 1,
            explanation: "Total cost \\(=25\\times45+15\\times50=1125+750=1875\\). Total quantity \\(=40\\) litres sold at Rs. \\(48\\)/litre, so revenue \\(=1920\\). Profit \\(=1920-1875=45\\).",
            explanationTextMap: text("कुल लागत \\(=25\\times45+15\\times50=1125+750=1875\\)। कुल मात्रा \\(=40\\) लीटर, \\(48\\) रुपये प्रति लीटर बिकी, अतः आय \\(=1920\\)। लाभ \\(=1920-1875=45\\)।", "Total cost \\(=25\\times45+15\\times50=1125+750=1875\\). Total quantity \\(=40\\) litres sold at Rs. \\(48\\)/litre, so revenue \\(=1920\\). Profit \\(=1920-1875=45\\).")
        },
        {
            topic: "Profit and Loss",
            difficulty: "Hard",
            question: "A toy manufacturer produced \\(1200\\) toy cars at a total cost of Rs. \\(90000\\). He donated \\(200\\) cars to a charity event. For the rest, he announced a \\(10\\%\\) discount on the market price of Rs. \\(120\\) per car. He also offered \\(2\\) toy cars free for every \\(8\\) toy cars purchased. If all \\(1200\\) toy cars were distributed, what is his overall gain or loss percentage?",
            questionTextMap: text("एक खिलौना निर्माता ने Rs. \\(90000\\) की कुल लागत से \\(1200\\) खिलौना कारें बनाईं। उसने \\(200\\) कारें एक चैरिटी कार्यक्रम में दान कर दीं। बाकी के लिए, उसने Rs. \\(120\\) प्रति कार के बाजार मूल्य पर \\(10\\%\\) की छूट की घोषणा की। उसने खरीदी गई हर \\(8\\) खिलौना कारों के लिए \\(2\\) खिलौना कारें मुफ्त देने की भी पेशकश की। यदि सभी \\(1200\\) खिलौना कारें वितरित की गईं, तो उसका कुल लाभ या हानि प्रतिशत क्या है?", "A toy manufacturer produced \\(1200\\) toy cars at a total cost of Rs. \\(90000\\). He donated \\(200\\) cars to a charity event. For the rest, he announced a \\(10\\%\\) discount on the market price of Rs. \\(120\\) per car. He also offered \\(2\\) toy cars free for every \\(8\\) toy cars purchased. If all \\(1200\\) toy cars were distributed, what is his overall gain or loss percentage?"),
            options: [option("\\(4\\%\\) हानि", "\\(4\\%\\) loss"), option("\\(4\\%\\) लाभ", "\\(4\\%\\) profit"), option("\\(5\\%\\) हानि", "\\(5\\%\\) loss"), option("\\(5\\%\\) लाभ", "\\(5\\%\\) profit")],
            correctAnswer: 0,
            explanation: "Cost per car \\(=\\frac{90000}{1200}=75\\). Selling price after \\(10\\%\\) discount on Rs. \\(120=108\\). Of the remaining \\(1000\\) cars, with \\(2\\) free per \\(8\\) bought, \\(800\\) cars are paid and \\(200\\) are free. Revenue \\(=800\\times108=86400\\). Loss \\(=90000-86400=3600\\), so loss\\% \\(=\\frac{3600}{90000}\\times100=4\\%\\).",
            explanationTextMap: text("प्रति कार लागत \\(=\\frac{90000}{1200}=75\\)। Rs. \\(120\\) पर \\(10\\%\\) छूट के बाद विक्रय मूल्य \\(=108\\)। शेष \\(1000\\) कारों में से, हर \\(8\\) खरीदी पर \\(2\\) मुफ्त के अनुसार, \\(800\\) कारें भुगतान की गईं और \\(200\\) मुफ्त थीं। आय \\(=800\\times108=86400\\)। हानि \\(=90000-86400=3600\\), अतः हानि\\% \\(=\\frac{3600}{90000}\\times100=4\\%\\)।", "Cost per car \\(=\\frac{90000}{1200}=75\\). Selling price after \\(10\\%\\) discount on Rs. \\(120=108\\). Of the remaining \\(1000\\) cars, with \\(2\\) free per \\(8\\) bought, \\(800\\) cars are paid and \\(200\\) are free. Revenue \\(=800\\times108=86400\\). Loss \\(=90000-86400=3600\\), so loss\\% \\(=\\frac{3600}{90000}\\times100=4\\%\\).")
        },
        {
            topic: "Profit and Loss",
            difficulty: "Hard",
            question: "A retailer marks an air conditioner \\(80\\%\\) above its cost price. He offers a first discount of \\(25\\%\\) on the marked price. During a festive offer, an additional discount of \\(10\\%\\) is applied on the already discounted price. If the final selling price is Rs. \\(15552\\), what is the approximate cost price of the air conditioner?",
            questionTextMap: text("एक खुदरा विक्रेता एक एयर कंडीशनर को उसके लागत मूल्य से \\(80\\%\\) अधिक मूल्य पर बेचता है। वह अंकित मूल्य पर \\(25\\%\\) की पहली छूट प्रदान करता है। एक त्यौहारी ऑफर के दौरान, पहले से छूट वाले मूल्य पर \\(10\\%\\) की अतिरिक्त छूट लागू की जाती है। यदि अंतिम विक्रय मूल्य Rs. \\(15552\\) है, तो एयर कंडीशनर का अनुमानित लागत मूल्य क्या है?", "A retailer marks an air conditioner \\(80\\%\\) above its cost price. He offers a first discount of \\(25\\%\\) on the marked price. During a festive offer, an additional discount of \\(10\\%\\) is applied on the already discounted price. If the final selling price is Rs. \\(15552\\), what is the approximate cost price of the air conditioner?"),
            options: [option("Rs. \\(9000\\)", "Rs. \\(9000\\)"), option("Rs. \\(9200\\)", "Rs. \\(9200\\)"), option("Rs. \\(12800\\)", "Rs. \\(12800\\)"), option("Rs. \\(10000\\)", "Rs. \\(10000\\)")],
            correctAnswer: 2,
            explanation: "Let cost price \\(=x\\), so marked price \\(=1.8x\\). After discounts of \\(25\\%\\) and \\(10\\%\\): SP \\(=1.8x\\times0.75\\times0.9=1.215x\\). So \\(1.215x=15552\\Rightarrow x=12800\\).",
            explanationTextMap: text("मान लें लागत मूल्य \\(=x\\), अतः अंकित मूल्य \\(=1.8x\\)। \\(25\\%\\) और \\(10\\%\\) छूट के बाद: विक्रय मूल्य \\(=1.8x\\times0.75\\times0.9=1.215x\\)। अतः \\(1.215x=15552\\Rightarrow x=12800\\)।", "Let cost price \\(=x\\), so marked price \\(=1.8x\\). After discounts of \\(25\\%\\) and \\(10\\%\\): SP \\(=1.8x\\times0.75\\times0.9=1.215x\\). So \\(1.215x=15552\\Rightarrow x=12800\\).")
        },
        {
            topic: "Mixture and Alligation",
            difficulty: "Moderate",
            question: "A \\(40\\)-liter mixture contains juice and water in the ratio \\(5:3\\). How much water (in liters) must be added to this mixture to change the ratio of juice to water to \\(2:3\\)?",
            questionTextMap: text("\\(40\\) लीटर के मिश्रण में जूस और पानी का अनुपात \\(5:3\\) है। जूस और पानी का अनुपात \\(2:3\\) करने के लिए इस मिश्रण में कितना पानी (लीटर में) मिलाया जाना चाहिए?", "A \\(40\\)-liter mixture contains juice and water in the ratio \\(5:3\\). How much water (in liters) must be added to this mixture to change the ratio of juice to water to \\(2:3\\)?"),
            options: [option("\\(15.5\\) लीटर", "\\(15.5\\) litres"), option("\\(22.5\\) लीटर", "\\(22.5\\) litres"), option("\\(25\\) लीटर", "\\(25\\) litres"), option("\\(30\\) लीटर", "\\(30\\) litres")],
            correctAnswer: 1,
            explanation: "In \\(40\\) litres, juice \\(=25\\) litres, water \\(=15\\) litres. Let \\(x\\) litres of water be added: \\(\\frac{25}{15+x}=\\frac{2}{3}\\Rightarrow75=30+2x\\Rightarrow x=22.5\\).",
            explanationTextMap: text("\\(40\\) लीटर में, जूस \\(=25\\) लीटर, पानी \\(=15\\) लीटर। मान लें \\(x\\) लीटर पानी मिलाया गया: \\(\\frac{25}{15+x}=\\frac{2}{3}\\Rightarrow75=30+2x\\Rightarrow x=22.5\\)।", "In \\(40\\) litres, juice \\(=25\\) litres, water \\(=15\\) litres. Let \\(x\\) litres of water be added: \\(\\frac{25}{15+x}=\\frac{2}{3}\\Rightarrow75=30+2x\\Rightarrow x=22.5\\).")
        },
        {
            topic: "Time and Work",
            difficulty: "Easy",
            question: "A is able to complete a task in \\(15\\) days, while B takes \\(20\\) days to finish the same task. If they collaborate and work together for \\(4\\) days, what fraction of the work will still remain?",
            questionTextMap: text("A किसी काम को \\(15\\) दिन में पूरा कर सकता है, जबकि B को उसी काम को पूरा करने में \\(20\\) दिन लगते हैं। यदि वे मिलकर \\(4\\) दिन काम करें, तो काम का कितना भाग शेष रह जाएगा?", "A is able to complete a task in \\(15\\) days, while B takes \\(20\\) days to finish the same task. If they collaborate and work together for \\(4\\) days, what fraction of the work will still remain?"),
            options: [option("\\(\\frac{1}{4}\\)", "\\(\\frac{1}{4}\\)"), option("\\(\\frac{7}{15}\\)", "\\(\\frac{7}{15}\\)"), option("\\(\\frac{8}{15}\\)", "\\(\\frac{8}{15}\\)"), option("\\(\\frac{11}{15}\\)", "\\(\\frac{11}{15}\\)")],
            correctAnswer: 2,
            explanation: "Combined rate \\(=\\frac{1}{15}+\\frac{1}{20}=\\frac{7}{60}\\). Work done in \\(4\\) days \\(=4\\times\\frac{7}{60}=\\frac{7}{15}\\). Remaining work \\(=1-\\frac{7}{15}=\\frac{8}{15}\\).",
            explanationTextMap: text("संयुक्त कार्य-दर \\(=\\frac{1}{15}+\\frac{1}{20}=\\frac{7}{60}\\)। \\(4\\) दिनों में किया गया कार्य \\(=4\\times\\frac{7}{60}=\\frac{7}{15}\\)। शेष कार्य \\(=1-\\frac{7}{15}=\\frac{8}{15}\\)।", "Combined rate \\(=\\frac{1}{15}+\\frac{1}{20}=\\frac{7}{60}\\). Work done in \\(4\\) days \\(=4\\times\\frac{7}{60}=\\frac{7}{15}\\). Remaining work \\(=1-\\frac{7}{15}=\\frac{8}{15}\\).")
        },
        {
            topic: "Mixture and Alligation",
            difficulty: "Moderate",
            question: "Two oils priced at Rs. \\(90\\) per kg and Rs. \\(150\\) per kg are blended and sold at Rs. \\(144\\) per kg, achieving a profit margin of \\(20\\%\\). What is the ratio of the two oils in the mixture?",
            questionTextMap: text("Rs. \\(90\\) प्रति किलोग्राम और Rs. \\(150\\) प्रति किलोग्राम की कीमत वाले दो तेलों को मिश्रित करके Rs. \\(144\\) प्रति किलोग्राम की दर से बेचा जाता है, जिससे \\(20\\%\\) का लाभ मार्जिन प्राप्त होता है। मिश्रण में दोनों तेलों का अनुपात क्या है?", "Two oils priced at Rs. \\(90\\) per kg and Rs. \\(150\\) per kg are blended and sold at Rs. \\(144\\) per kg, achieving a profit margin of \\(20\\%\\). What is the ratio of the two oils in the mixture?"),
            options: [option("\\(1:1\\)", "\\(1:1\\)"), option("\\(2:1\\)", "\\(2:1\\)"), option("\\(3:2\\)", "\\(3:2\\)"), option("\\(4:1\\)", "\\(4:1\\)")],
            correctAnswer: 0,
            explanation: "Mean cost price \\(=\\frac{144}{1.2}=120\\). By alligation, ratio \\(=(150-120):(120-90)=30:30=1:1\\).",
            explanationTextMap: text("औसत लागत मूल्य \\(=\\frac{144}{1.2}=120\\)। मिश्रण नियम से, अनुपात \\(=(150-120):(120-90)=30:30=1:1\\)।", "Mean cost price \\(=\\frac{144}{1.2}=120\\). By alligation, ratio \\(=(150-120):(120-90)=30:30=1:1\\).")
        },
        {
            topic: "Pipes and Cistern",
            difficulty: "Hard",
            question: "Three pipes, A, B, and C, are capable of filling a tank in \\(6\\), \\(8\\), and \\(12\\) hours, respectively. When all three pipes are opened together, they operate for \\(2\\) hours before pipe C is closed. How much additional time will it take to completely fill the tank after that?",
            questionTextMap: text("तीन पाइप, A, B और C एक टैंक को क्रमशः \\(6\\), \\(8\\) और \\(12\\) घंटे में भरने में सक्षम हैं। जब तीनों पाइप एक साथ खोले जाते हैं, तो वे पाइप C बंद होने से पहले \\(2\\) घंटे तक काम करते हैं। उसके बाद टैंक को पूरी तरह से भरने में कितना अतिरिक्त समय लगेगा?", "Three pipes, A, B, and C, are capable of filling a tank in \\(6\\), \\(8\\), and \\(12\\) hours, respectively. When all three pipes are opened together, they operate for \\(2\\) hours before pipe C is closed. How much additional time will it take to completely fill the tank after that?"),
            options: [option("\\(\\frac{6}{7}\\) घंटे", "\\(\\frac{6}{7}\\) hours"), option("\\(\\frac{2}{6}\\) घंटे", "\\(\\frac{2}{6}\\) hours"), option("\\(\\frac{3}{5}\\) घंटे", "\\(\\frac{3}{5}\\) hours"), option("\\(\\frac{9}{2}\\) घंटे", "\\(\\frac{9}{2}\\) hours")],
            correctAnswer: 0,
            explanation: "Combined rate of A, B, C \\(=\\frac{1}{6}+\\frac{1}{8}+\\frac{1}{12}=\\frac{3}{8}\\). Work done in \\(2\\) hours \\(=\\frac{3}{4}\\), remaining \\(=\\frac{1}{4}\\). After C is closed, rate of A+B \\(=\\frac{7}{24}\\). Time \\(=\\frac{1/4}{7/24}=\\frac{6}{7}\\) hours.",
            explanationTextMap: text("A, B, C की संयुक्त दर \\(=\\frac{1}{6}+\\frac{1}{8}+\\frac{1}{12}=\\frac{3}{8}\\)। \\(2\\) घंटे में किया गया कार्य \\(=\\frac{3}{4}\\), शेष \\(=\\frac{1}{4}\\)। C बंद होने के बाद, A+B की दर \\(=\\frac{7}{24}\\)। समय \\(=\\frac{1/4}{7/24}=\\frac{6}{7}\\) घंटे।", "Combined rate of A, B, C \\(=\\frac{1}{6}+\\frac{1}{8}+\\frac{1}{12}=\\frac{3}{8}\\). Work done in \\(2\\) hours \\(=\\frac{3}{4}\\), remaining \\(=\\frac{1}{4}\\). After C is closed, rate of A+B \\(=\\frac{7}{24}\\). Time \\(=\\frac{1/4}{7/24}=\\frac{6}{7}\\) hours.")
        },
        {
            topic: "Speed Time Distance",
            difficulty: "Moderate",
            question: "A bullet train covers a fixed distance in \\(30\\) minutes at an average speed of \\(240\\) km/h. Due to track maintenance, it needs to be diverted, increasing the distance by \\(20\\%\\). If the train needs to arrive at its destination on time (i.e., in \\(30\\) minutes), what should its new average speed be in km/h?",
            questionTextMap: text("एक बुलेट ट्रेन \\(240\\) किमी/घंटा की औसत गति से \\(30\\) मिनट में एक निश्चित दूरी तय करती है। ट्रैक रखरखाव के कारण, इसे डायवर्ट करने की आवश्यकता है, जिससे दूरी \\(20\\%\\) बढ़ जाती है। यदि ट्रेन को समय पर (यानी, \\(30\\) मिनट में) अपने गंतव्य पर पहुंचना है, तो इसकी नई औसत गति किमी/घंटा में क्या होनी चाहिए?", "A bullet train covers a fixed distance in \\(30\\) minutes at an average speed of \\(240\\) km/h. Due to track maintenance, it needs to be diverted, increasing the distance by \\(20\\%\\). If the train needs to arrive at its destination on time (i.e., in \\(30\\) minutes), what should its new average speed be in km/h?"),
            options: [option("\\(280\\) किमी/घंटा", "\\(280\\) km/h"), option("\\(300\\) किमी/घंटा", "\\(300\\) km/h"), option("\\(288\\) किमी/घंटा", "\\(288\\) km/h"), option("\\(320\\) किमी/घंटा", "\\(320\\) km/h")],
            correctAnswer: 2,
            explanation: "Original distance \\(=240\\times0.5=120\\) km. New distance \\(=120\\times1.2=144\\) km. New speed \\(=\\frac{144}{0.5}=288\\) km/h.",
            explanationTextMap: text("मूल दूरी \\(=240\\times0.5=120\\) किमी। नई दूरी \\(=120\\times1.2=144\\) किमी। नई गति \\(=\\frac{144}{0.5}=288\\) किमी/घंटा।", "Original distance \\(=240\\times0.5=120\\) km. New distance \\(=120\\times1.2=144\\) km. New speed \\(=\\frac{144}{0.5}=288\\) km/h.")
        },
        {
            topic: "Speed Time Distance",
            difficulty: "Moderate",
            question: "Two cars, X and Y, start from points \\(360\\) km apart and travel at constant speeds. If they move towards each other, they meet in \\(4\\) hours. If they move in the same direction, they meet in \\(12\\) hours. What is the speed of car X? (Assume X is the faster car.)",
            questionTextMap: text("दो कारें, X और Y, \\(360\\) किमी दूर स्थित बिंदुओं से चलना शुरू करती हैं और समान गति से यात्रा करती हैं। यदि वे एक-दूसरे की ओर बढ़ती हैं, तो वे \\(4\\) घंटे में मिलती हैं। यदि वे एक ही दिशा में चलती हैं, तो वे \\(12\\) घंटे में मिलती हैं। कार X की गति क्या है? (मान लें कि X तेज़ कार है)।", "Two cars, X and Y, start from points \\(360\\) km apart and travel at constant speeds. If they move towards each other, they meet in \\(4\\) hours. If they move in the same direction, they meet in \\(12\\) hours. What is the speed of car X? (Assume X is the faster car.)"),
            options: [option("\\(60\\) किमी/घंटा", "\\(60\\) km/h"), option("\\(75\\) किमी/घंटा", "\\(75\\) km/h"), option("\\(45\\) किमी/घंटा", "\\(45\\) km/h"), option("\\(90\\) किमी/घंटा", "\\(90\\) km/h")],
            correctAnswer: 0,
            explanation: "Let speeds be \\(x\\) and \\(y\\). \\(x+y=\\frac{360}{4}=90\\) and \\(x-y=\\frac{360}{12}=30\\). Solving, \\(x=60\\) km/h.",
            explanationTextMap: text("मान लें गति \\(x\\) और \\(y\\) हैं। \\(x+y=\\frac{360}{4}=90\\) और \\(x-y=\\frac{360}{12}=30\\)। हल करने पर, \\(x=60\\) किमी/घंटा।", "Let speeds be \\(x\\) and \\(y\\). \\(x+y=\\frac{360}{4}=90\\) and \\(x-y=\\frac{360}{12}=30\\). Solving, \\(x=60\\) km/h.")
        },
        {
            topic: "Mensuration",
            difficulty: "Easy",
            question: "A circular pizza has a radius of \\(21\\) cm. If \\(75\\%\\) of it is eaten, what is the area of pizza remaining?",
            questionTextMap: text("एक गोलाकार पिज़्ज़ा जिसकी त्रिज्या \\(21\\) सेमी है। यदि इसका \\(75\\%\\) भाग खा लिया जाता है, तो बचे हुए पिज़्ज़ा का क्षेत्रफल क्या है?", "A circular pizza has a radius of \\(21\\) cm. If \\(75\\%\\) of it is eaten, what is the area of pizza remaining?"),
            options: [option("\\(173.25\\text{ cm}^2\\)", "\\(173.25\\text{ cm}^2\\)"), option("\\(346.36\\text{ cm}^2\\)", "\\(346.36\\text{ cm}^2\\)"), option("\\(432.25\\text{ cm}^2\\)", "\\(432.25\\text{ cm}^2\\)"), option("\\(115.5\\text{ cm}^2\\)", "\\(115.5\\text{ cm}^2\\)")],
            correctAnswer: 1,
            explanation: "Area \\(=\\pi r^2=\\frac{22}{7}\\times21\\times21=1386\\text{ cm}^2\\). Remaining after eating \\(75\\%\\) is \\(25\\%\\) of \\(1386\\approx346.36\\text{ cm}^2\\).",
            explanationTextMap: text("क्षेत्रफल \\(=\\pi r^2=\\frac{22}{7}\\times21\\times21=1386\\text{ cm}^2\\)। \\(75\\%\\) खाने के बाद शेष \\(1386\\) का \\(25\\%\\)\\(\\approx346.36\\text{ cm}^2\\) है।", "Area \\(=\\pi r^2=\\frac{22}{7}\\times21\\times21=1386\\text{ cm}^2\\). Remaining after eating \\(75\\%\\) is \\(25\\%\\) of \\(1386\\approx346.36\\text{ cm}^2\\).")
        },
        {
            topic: "Mensuration",
            difficulty: "Moderate",
            question: "A ring-shaped disc has outer radius \\(10\\) cm and inner radius \\(7\\) cm. What is the approximate ratio of the ring's area to the whole outer circle?",
            questionTextMap: text("एक वलय के आकार की डिस्क की बाहरी त्रिज्या \\(10\\) सेमी और आंतरिक त्रिज्या \\(7\\) सेमी है। वलय के क्षेत्रफल और पूरे बाहरी वृत्त के क्षेत्रफल का लगभग अनुपात क्या है?", "A ring-shaped disc has outer radius \\(10\\) cm and inner radius \\(7\\) cm. What is the approximate ratio of the ring's area to the whole outer circle?"),
            options: [option("\\(1:2\\)", "\\(1:2\\)"), option("\\(2:3\\)", "\\(2:3\\)"), option("\\(3:4\\)", "\\(3:4\\)"), option("\\(4:5\\)", "\\(4:5\\)")],
            correctAnswer: 0,
            explanation: "Outer area \\(=\\pi(10)^2=100\\pi\\). Inner area \\(=\\pi(7)^2=49\\pi\\). Ring area \\(=51\\pi\\). Ratio of ring to outer circle \\(=51:100\\approx1:2\\).",
            explanationTextMap: text("बाहरी क्षेत्रफल \\(=\\pi(10)^2=100\\pi\\)। आंतरिक क्षेत्रफल \\(=\\pi(7)^2=49\\pi\\)। वलय का क्षेत्रफल \\(=51\\pi\\)। वलय और बाहरी वृत्त का अनुपात \\(=51:100\\approx1:2\\)।", "Outer area \\(=\\pi(10)^2=100\\pi\\). Inner area \\(=\\pi(7)^2=49\\pi\\). Ring area \\(=51\\pi\\). Ratio of ring to outer circle \\(=51:100\\approx1:2\\).")
        },
        {
            topic: "Mensuration",
            difficulty: "Easy",
            question: "A bicycle wheel has a radius of \\(35\\) cm. What percentage of its circumference is covered in a quarter turn? (Use \\(\\pi=\\frac{22}{7}\\).)",
            questionTextMap: text("एक साइकिल के पहिये की त्रिज्या \\(35\\) सेमी है। एक चौथाई चक्कर में इसकी परिधि का कितना प्रतिशत भाग तय होता है? (\\(\\pi=\\frac{22}{7}\\) का प्रयोग करें)।", "A bicycle wheel has a radius of \\(35\\) cm. What percentage of its circumference is covered in a quarter turn? (Use \\(\\pi=\\frac{22}{7}\\).)"),
            options: [option("\\(15\\%\\)", "\\(15\\%\\)"), option("\\(25\\%\\)", "\\(25\\%\\)"), option("\\(30\\%\\)", "\\(30\\%\\)"), option("\\(35\\%\\)", "\\(35\\%\\)")],
            correctAnswer: 1,
            explanation: "A quarter turn covers \\(\\frac{1}{4}\\) of the circumference, regardless of the radius, which is \\(25\\%\\).",
            explanationTextMap: text("एक चौथाई चक्कर परिधि का \\(\\frac{1}{4}\\) भाग तय करता है, त्रिज्या चाहे जो भी हो, जो \\(25\\%\\) है।", "A quarter turn covers \\(\\frac{1}{4}\\) of the circumference, regardless of the radius, which is \\(25\\%\\).")
        },
        {
            topic: "Coordinate Geometry",
            difficulty: "Easy",
            question: "The line \\(y=mx+5\\) passes through \\((1,8)\\). Find \\(m\\).",
            questionTextMap: text("रेखा \\(y=mx+5\\) बिन्दु \\((1,8)\\) से होकर जाती है। \\(m\\) ज्ञात कीजिए।", "The line \\(y=mx+5\\) passes through \\((1,8)\\). Find \\(m\\)."),
            options: [option("\\(5\\)", "\\(5\\)"), option("\\(4\\)", "\\(4\\)"), option("\\(3\\)", "\\(3\\)"), option("\\(2\\)", "\\(2\\)")],
            correctAnswer: 2,
            explanation: "Since the line passes through \\((1,8)\\): \\(8=m\\times1+5\\Rightarrow m=3\\).",
            explanationTextMap: text("चूंकि रेखा \\((1,8)\\) से होकर जाती है: \\(8=m\\times1+5\\Rightarrow m=3\\)।", "Since the line passes through \\((1,8)\\): \\(8=m\\times1+5\\Rightarrow m=3\\).")
        },
        {
            topic: "Simplification",
            difficulty: "Hard",
            question: "\\(31^3+18^3-37^3+210\\) is equal to:",
            questionTextMap: text("\\(31^3+18^3-37^3+210\\) बराबर है:", "\\(31^3+18^3-37^3+210\\) is equal to:"),
            options: [option("\\(-36810\\)", "\\(-36810\\)"), option("\\(-14820\\)", "\\(-14820\\)"), option("\\(-45670\\)", "\\(-45670\\)"), option("\\(-23450\\)", "\\(-23450\\)")],
            correctAnswer: 1,
            explanation: "\\(31^3=29791\\), \\(18^3=5832\\), \\(37^3=50653\\). So \\(29791+5832-50653+210=-14820\\).",
            explanationTextMap: text("\\(31^3=29791\\), \\(18^3=5832\\), \\(37^3=50653\\)। अतः \\(29791+5832-50653+210=-14820\\)।", "\\(31^3=29791\\), \\(18^3=5832\\), \\(37^3=50653\\). So \\(29791+5832-50653+210=-14820\\).")
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
        title: "SSC Maths Quiz 5 (Billingual)",
        description: "25 bilingual Hindi-English quantitative aptitude questions with LaTeX formatting, based on SSC CGL Tier 1 (12 Sep 2025, Shift 1) style questions.",
        durationMinutes: 20,
        totalQuestions: questions.length,
        marksPerQuestion: 1,
        negativeMarks: 0.25,
        difficulty: "Mixed",
        tags: ["SSC", "CGL", "Quantitative Aptitude", "Mathematics", "Bilingual", "LaTeX"],
        questions
    });
}());
