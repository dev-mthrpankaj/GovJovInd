(function () {
    "use strict";

    window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];

    const quizId = "rrb-groupd-math-set-1";

    function text(hi, en) {
        return { hi, en };
    }

    function option(hi, en) {
        return { text: text(hi, en) };
    }

    const questions = [
        {
            topic: "Mensuration",
            difficulty: "Easy",
            question: "The area of a square is \\(15.21\\,\\mathrm{cm}^2\\). Find the perimeter of this square (in \\(\\mathrm{cm}\\)).",
            questionTextMap: text("एक वर्ग का क्षेत्रफल \\(15.21\\,\\mathrm{cm}^2\\) है। इस वर्ग का परिमाप (\\(\\mathrm{cm}\\) में) ज्ञात कीजिए।", "The area of a square is \\(15.21\\,\\mathrm{cm}^2\\). Find the perimeter of this square (in \\(\\mathrm{cm}\\))."),
            options: [
                option("\\(13.8\\)", "\\(13.8\\)"),
                option("\\(15.6\\)", "\\(15.6\\)"),
                option("\\(12.4\\)", "\\(12.4\\)"),
                option("\\(16.5\\)", "\\(16.5\\)")
            ],
            correctAnswer: 1,
            explanation: "Side \\(=\\sqrt{15.21}=3.9\\,\\mathrm{cm}\\). Perimeter \\(=4\\times3.9=15.6\\,\\mathrm{cm}\\).",
            explanationTextMap: text("भुजा \\(=\\sqrt{15.21}=3.9\\,\\mathrm{cm}\\)। परिमाप \\(=4\\times3.9=15.6\\,\\mathrm{cm}\\)।", "Side \\(=\\sqrt{15.21}=3.9\\,\\mathrm{cm}\\). Perimeter \\(=4\\times3.9=15.6\\,\\mathrm{cm}\\).")
        },
        {
            topic: "Percentage",
            difficulty: "Moderate",
            question: "In an election, \\(70\\%\\) of the total voters voted. Of these, \\(60\\%\\) voted for candidate X, and the remaining voted for candidate Y. If candidate Y received \\(8400\\) votes, find the total number of registered voters.",
            questionTextMap: text("एक चुनाव में, कुल मतदाताओं में से \\(70\\%\\) मतदाताओं ने मतदान किया। इनमें से, \\(60\\%\\) मतदाताओं ने उम्मीदवार X को, और शेष मतदाताओं ने उम्मीदवार Y को अपना मत दिया। यदि उम्मीदवार Y को \\(8400\\) मत मिले, तो पंजीकृत मतदाताओं की कुल संख्या ज्ञात कीजिए।", "In an election, \\(70\\%\\) of the total voters voted. Of these, \\(60\\%\\) voted for candidate X, and the remaining voted for candidate Y. If candidate Y received \\(8400\\) votes, find the total number of registered voters."),
            options: [
                option("\\(25{,}000\\)", "\\(25{,}000\\)"),
                option("\\(40{,}000\\)", "\\(40{,}000\\)"),
                option("\\(30{,}000\\)", "\\(30{,}000\\)"),
                option("\\(32{,}000\\)", "\\(32{,}000\\)")
            ],
            correctAnswer: 2,
            explanation: "Let total voters \\(=T\\). Y's votes \\(=0.7T\\times0.4=0.28T=8400\\), so \\(T=\\frac{8400}{0.28}=30{,}000\\).",
            explanationTextMap: text("मान लीजिए कुल मतदाता \\(=T\\)। Y के मत \\(=0.7T\\times0.4=0.28T=8400\\), अतः \\(T=\\frac{8400}{0.28}=30{,}000\\)।", "Let total voters \\(=T\\). Y's votes \\(=0.7T\\times0.4=0.28T=8400\\), so \\(T=\\frac{8400}{0.28}=30{,}000\\).")
        },
        {
            topic: "Number System - HCF/LCM",
            difficulty: "Moderate",
            question: "Find the largest number which divides \\(1005\\), \\(244\\) and \\(1343\\) leaving remainders \\(5\\), \\(4\\) and \\(3\\) respectively.",
            questionTextMap: text("वह सबसे बड़ी संख्या ज्ञात कीजिए जिससे \\(1005\\), \\(244\\) और \\(1343\\) को विभाजित करने पर क्रमशः \\(5\\), \\(4\\) और \\(3\\) शेषफल प्राप्त होता है।", "Find the largest number which divides \\(1005\\), \\(244\\) and \\(1343\\) leaving remainders \\(5\\), \\(4\\) and \\(3\\) respectively."),
            options: [
                option("\\(25\\)", "\\(25\\)"),
                option("\\(20\\)", "\\(20\\)"),
                option("\\(30\\)", "\\(30\\)"),
                option("\\(15\\)", "\\(15\\)")
            ],
            correctAnswer: 1,
            explanation: "Subtract remainders: \\(1005-5=1000\\), \\(244-4=240\\), \\(1343-3=1340\\). Required number \\(=\\operatorname{HCF}(1000,240,1340)=20\\).",
            explanationTextMap: text("शेषफल घटाने पर: \\(1005-5=1000\\), \\(244-4=240\\), \\(1343-3=1340\\)। अभीष्ट संख्या \\(=\\operatorname{HCF}(1000,240,1340)=20\\)।", "Subtract remainders: \\(1005-5=1000\\), \\(244-4=240\\), \\(1343-3=1340\\). Required number \\(=\\operatorname{HCF}(1000,240,1340)=20\\).")
        },
        {
            topic: "Percentage - Discount",
            difficulty: "Hard",
            question: "A retailer offers discount schemes to shoppers on an item. Which of the following schemes will be least beneficial for the customer?\n\ni. A discount of \\(34\\%\\)\nii. A discount of \\(37\\%\\) followed by a further \\(8\\%\\) discount\niii. Successive discounts of \\(7\\%\\) and \\(27\\%\\)",
            questionTextMap: text("एक खुदरा विक्रेता खरीदारों को एक वस्तु पर दी गई छूट स्कीमें प्रदान करता है। निम्नलिखित में से कौन-सी स्कीम ग्राहक के लिए सबसे कम लाभदायक होगी?\n\ni. \\(34\\%\\) की छूट\nii. \\(37\\%\\) की छूट के बाद \\(8\\%\\) की छूट\niii. \\(7\\%\\) और \\(27\\%\\) की क्रमिक छूटें", "A retailer offers discount schemes to shoppers on an item. Which of the following schemes will be least beneficial for the customer?\n\ni. A discount of \\(34\\%\\)\nii. A discount of \\(37\\%\\) followed by a further \\(8\\%\\) discount\niii. Successive discounts of \\(7\\%\\) and \\(27\\%\\)"),
            options: [
                option("स्कीम ii", "Scheme ii"),
                option("स्कीम ii और स्कीम iii दोनों", "Both scheme ii and scheme iii"),
                option("स्कीम i", "Scheme i"),
                option("स्कीम iii", "Scheme iii")
            ],
            correctAnswer: 3,
            explanation: "Effective discounts: (i) \\(34\\%\\); (ii) \\(1-0.63\\times0.92=42.04\\%\\); (iii) \\(1-0.93\\times0.73=32.11\\%\\). Scheme iii gives the smallest effective discount, so it is least beneficial for the customer.",
            explanationTextMap: text("वास्तविक छूट: (i) \\(34\\%\\); (ii) \\(1-0.63\\times0.92=42.04\\%\\); (iii) \\(1-0.93\\times0.73=32.11\\%\\)। स्कीम iii में वास्तविक छूट सबसे कम है, इसलिए यह ग्राहक के लिए सबसे कम लाभदायक है।", "Effective discounts: (i) \\(34\\%\\); (ii) \\(1-0.63\\times0.92=42.04\\%\\); (iii) \\(1-0.93\\times0.73=32.11\\%\\). Scheme iii gives the smallest effective discount, so it is least beneficial for the customer.")
        },
        {
            topic: "Time and Work",
            difficulty: "Moderate",
            question: "P and Q together can fill a tank in \\(6\\) hours. If P alone can fill the same tank in \\(12\\) hours, in how many hours will Q alone fill one-fourth of the tank?",
            questionTextMap: text("P और Q मिलकर किसी टंकी को \\(6\\) घंटे में पानी से भर सकते हैं। यदि P अकेले उसी टंकी को \\(12\\) घंटे में पानी से भर सकता है, तो Q अकेले उसी टंकी के एक-चौथाई भाग को कितने घंटे में पानी से भरेगा?", "P and Q together can fill a tank in \\(6\\) hours. If P alone can fill the same tank in \\(12\\) hours, in how many hours will Q alone fill one-fourth of the tank?"),
            options: [
                option("\\(4\\)", "\\(4\\)"),
                option("\\(6\\)", "\\(6\\)"),
                option("\\(7\\)", "\\(7\\)"),
                option("\\(3\\)", "\\(3\\)")
            ],
            correctAnswer: 3,
            explanation: "Q's rate \\(=\\frac{1}{6}-\\frac{1}{12}=\\frac{1}{12}\\), so Q alone fills the tank in \\(12\\) hours. Time for \\(\\frac{1}{4}\\) tank \\(=\\frac{12}{4}=3\\) hours.",
            explanationTextMap: text("Q की दर \\(=\\frac{1}{6}-\\frac{1}{12}=\\frac{1}{12}\\), अतः Q अकेले टंकी को \\(12\\) घंटे में भरता है। \\(\\frac{1}{4}\\) टंकी भरने का समय \\(=\\frac{12}{4}=3\\) घंटे।", "Q's rate \\(=\\frac{1}{6}-\\frac{1}{12}=\\frac{1}{12}\\), so Q alone fills the tank in \\(12\\) hours. Time for \\(\\frac{1}{4}\\) tank \\(=\\frac{12}{4}=3\\) hours.")
        },
        {
            topic: "Pipes and Cistern",
            difficulty: "Hard",
            question: "A tank has three pipes: A, B and C. Pipe A fills the tank in \\(4\\) hours, pipe B fills it in \\(6\\) hours, and pipe C empties it in \\(12\\) hours. If all three pipes are opened alternately for \\(1\\) hour each (A first, then B, then C), how long will it take to fill the tank?",
            questionTextMap: text("एक टैंक में तीन पाइप हैं: A, B और C हैं। पाइप A टैंक को \\(4\\) घंटे में भरता है, पाइप B इसे \\(6\\) घंटे में भरता है और पाइप C इसे \\(12\\) घंटे में खाली करता है। यदि तीनों पाइपों को बारी-बारी से \\(1\\) घंटे के लिए खोला जाए (पहले A, फिर B, फिर C), तो टैंक को भरने में कितना समय लगेगा?", "A tank has three pipes: A, B and C. Pipe A fills the tank in \\(4\\) hours, pipe B fills it in \\(6\\) hours, and pipe C empties it in \\(12\\) hours. If all three pipes are opened alternately for \\(1\\) hour each (A first, then B, then C), how long will it take to fill the tank?"),
            options: [
                option("\\(11\\) घंटे", "\\(11\\) hours"),
                option("\\(9\\) घंटे", "\\(9\\) hours"),
                option("\\(10\\frac{2}{3}\\) घंटे", "\\(10\\frac{2}{3}\\) hours"),
                option("\\(7\\frac{1}{2}\\) घंटे", "\\(7\\frac{1}{2}\\) hours")
            ],
            correctAnswer: 3,
            explanation: "In each 3-hour cycle (A, B, C), the net fill is \\(\\frac{1}{4}+\\frac{1}{6}-\\frac{1}{12}=\\frac{1}{3}\\). After 6 hours (2 cycles), \\(\\frac{2}{3}\\) is filled. In hour 7 (A), \\(\\frac{2}{3}+\\frac{1}{4}=\\frac{11}{12}\\) is filled. In hour 8 (B), the remaining \\(\\frac{1}{12}\\) is filled in \\(\\frac{1/12}{1/6}=\\frac{1}{2}\\) hour. Total time \\(=7+\\frac{1}{2}=7\\frac{1}{2}\\) hours.",
            explanationTextMap: text("प्रत्येक 3-घंटे के चक्र (A, B, C) में निवल भराव \\(=\\frac{1}{4}+\\frac{1}{6}-\\frac{1}{12}=\\frac{1}{3}\\) होता है। 6 घंटे (2 चक्र) बाद \\(\\frac{2}{3}\\) भाग भर जाता है। 7वें घंटे (A) में \\(\\frac{2}{3}+\\frac{1}{4}=\\frac{11}{12}\\) भर जाता है। 8वें घंटे (B) में शेष \\(\\frac{1}{12}\\) भाग \\(\\frac{1/12}{1/6}=\\frac{1}{2}\\) घंटे में भर जाता है। कुल समय \\(=7+\\frac{1}{2}=7\\frac{1}{2}\\) घंटे।", "In each 3-hour cycle (A, B, C), the net fill is \\(\\frac{1}{4}+\\frac{1}{6}-\\frac{1}{12}=\\frac{1}{3}\\). After 6 hours (2 cycles), \\(\\frac{2}{3}\\) is filled. In hour 7 (A), \\(\\frac{2}{3}+\\frac{1}{4}=\\frac{11}{12}\\) is filled. In hour 8 (B), the remaining \\(\\frac{1}{12}\\) is filled in \\(\\frac{1/12}{1/6}=\\frac{1}{2}\\) hour. Total time \\(=7+\\frac{1}{2}=7\\frac{1}{2}\\) hours.")
        },
        {
            topic: "Compound Interest",
            difficulty: "Moderate",
            question: "Find the amount received on a principal of ₹\\(1{,}800\\) at \\(10\\%\\) per annum compound interest (compounded annually) for \\(2\\) years.",
            questionTextMap: text("₹\\(1{,}800\\) के मूलधन पर \\(10\\%\\) की वार्षिक चक्रवृद्धि ब्याज की दर (वार्षिक रूप से संयोजित होने पर) से \\(2\\) वर्षों में प्राप्त मिश्रधन ज्ञात कीजिए।", "Find the amount received on a principal of ₹\\(1{,}800\\) at \\(10\\%\\) per annum compound interest (compounded annually) for \\(2\\) years."),
            options: [
                option("₹2,506", "₹2,506"),
                option("₹2,178", "₹2,178"),
                option("₹2,820", "₹2,820"),
                option("₹3,118", "₹3,118")
            ],
            correctAnswer: 1,
            explanation: "Amount \\(=1800\\left(1+\\frac{10}{100}\\right)^2=1800\\times1.21=2{,}178\\). Hence, amount = ₹\\(2{,}178\\).",
            explanationTextMap: text("मिश्रधन \\(=1800\\left(1+\\frac{10}{100}\\right)^2=1800\\times1.21=2{,}178\\)। अतः मिश्रधन = ₹\\(2{,}178\\)।", "Amount \\(=1800\\left(1+\\frac{10}{100}\\right)^2=1800\\times1.21=2{,}178\\). Hence, amount = ₹\\(2{,}178\\).")
        },
        {
            topic: "Simplification",
            difficulty: "Moderate",
            question: "Simplify: \\(\\sqrt{\\sqrt{24^2-16^2+2^2}+\\sqrt{2^2\\times3^2+\\sqrt{169}}}\\)",
            questionTextMap: text("\\(\\sqrt{\\sqrt{24^2-16^2+2^2}+\\sqrt{2^2\\times3^2+\\sqrt{169}}}\\) को सरल करें।", "Simplify: \\(\\sqrt{\\sqrt{24^2-16^2+2^2}+\\sqrt{2^2\\times3^2+\\sqrt{169}}}\\)"),
            options: [
                option("\\(2\\)", "\\(2\\)"),
                option("\\(3\\)", "\\(3\\)"),
                option("\\(7\\)", "\\(7\\)"),
                option("\\(5\\)", "\\(5\\)")
            ],
            correctAnswer: 3,
            explanation: "\\(\\sqrt{24^2-16^2+2^2}=\\sqrt{576-256+4}=\\sqrt{324}=18\\). \\(\\sqrt{2^2\\times3^2+\\sqrt{169}}=\\sqrt{36+13}=\\sqrt{49}=7\\). So the expression \\(=\\sqrt{18+7}=\\sqrt{25}=5\\).",
            explanationTextMap: text("\\(\\sqrt{24^2-16^2+2^2}=\\sqrt{576-256+4}=\\sqrt{324}=18\\)। \\(\\sqrt{2^2\\times3^2+\\sqrt{169}}=\\sqrt{36+13}=\\sqrt{49}=7\\)। अतः व्यंजक \\(=\\sqrt{18+7}=\\sqrt{25}=5\\)।", "\\(\\sqrt{24^2-16^2+2^2}=\\sqrt{576-256+4}=\\sqrt{324}=18\\). \\(\\sqrt{2^2\\times3^2+\\sqrt{169}}=\\sqrt{36+13}=\\sqrt{49}=7\\). So the expression \\(=\\sqrt{18+7}=\\sqrt{25}=5\\).")
        },
        {
            topic: "Percentage - Discount",
            difficulty: "Hard",
            question: "A store is running a \"buy \\(5\\), get \\(16\\) free\" offer on household items. What is the approximate percentage of net discount being offered by the store?",
            questionTextMap: text("एक स्टोर घरेलू सामानों पर '5 खरीदें, 16 मुफ्त पाएँ' ऑफर दे रहा है। स्टोर द्वारा दी जा रही शुद्ध छूट (लगभग) का प्रतिशत कितना है?", "A store is running a \"buy \\(5\\), get \\(16\\) free\" offer on household items. What is the approximate percentage of net discount being offered by the store?"),
            options: [
                option("\\(78.42\\%\\)", "\\(78.42\\%\\)"),
                option("\\(74.52\\%\\)", "\\(74.52\\%\\)"),
                option("\\(74.24\\%\\)", "\\(74.24\\%\\)"),
                option("\\(76.19\\%\\)", "\\(76.19\\%\\)")
            ],
            correctAnswer: 3,
            explanation: "For every \\(5\\) items bought, \\(21\\) items (\\(5+16\\)) are received. Net discount \\(=\\frac{16}{21}\\times100\\approx76.19\\%\\).",
            explanationTextMap: text("हर \\(5\\) वस्तु खरीदने पर कुल \\(21\\) वस्तुएँ (\\(5+16\\)) प्राप्त होती हैं। शुद्ध छूट \\(=\\frac{16}{21}\\times100\\approx76.19\\%\\)।", "For every \\(5\\) items bought, \\(21\\) items (\\(5+16\\)) are received. Net discount \\(=\\frac{16}{21}\\times100\\approx76.19\\%\\).")
        },
        {
            topic: "Mensuration",
            difficulty: "Moderate",
            question: "If the radius of a sphere is increased by \\(25\\%\\), find the percentage increase in its surface area.",
            questionTextMap: text("यदि एक गोले की त्रिज्या में \\(25\\%\\) की वृद्धि की जाए, तो इसके पृष्ठीय क्षेत्रफल में प्रतिशत वृद्धि ज्ञात कीजिए।", "If the radius of a sphere is increased by \\(25\\%\\), find the percentage increase in its surface area."),
            options: [
                option("\\(42.36\\%\\)", "\\(42.36\\%\\)"),
                option("\\(56.25\\%\\)", "\\(56.25\\%\\)"),
                option("\\(50.48\\%\\)", "\\(50.48\\%\\)"),
                option("\\(38.15\\%\\)", "\\(38.15\\%\\)")
            ],
            correctAnswer: 1,
            explanation: "Surface area \\(\\propto r^2\\). New area ratio \\(=(1.25)^2=1.5625\\), so the increase is \\(56.25\\%\\).",
            explanationTextMap: text("पृष्ठीय क्षेत्रफल \\(\\propto r^2\\) होता है। नया क्षेत्रफल अनुपात \\(=(1.25)^2=1.5625\\), अतः वृद्धि \\(56.25\\%\\) है।", "Surface area \\(\\propto r^2\\). New area ratio \\(=(1.25)^2=1.5625\\), so the increase is \\(56.25\\%\\).")
        },
        {
            topic: "Statistics",
            difficulty: "Easy",
            question: "What is the mode of the following data?\n\n\\(55, 45, 44, 48, 42, 45, 52, 53, 42, 50, 54, 49, 52, 45, 47, 43, 45, 48\\)",
            questionTextMap: text("निम्नलिखित डेटा का बहुलक कितना है?\n\n\\(55, 45, 44, 48, 42, 45, 52, 53, 42, 50, 54, 49, 52, 45, 47, 43, 45, 48\\)", "What is the mode of the following data?\n\n\\(55, 45, 44, 48, 42, 45, 52, 53, 42, 50, 54, 49, 52, 45, 47, 43, 45, 48\\)"),
            options: [
                option("\\(45\\)", "\\(45\\)"),
                option("\\(44\\)", "\\(44\\)"),
                option("\\(48\\)", "\\(48\\)"),
                option("\\(55\\)", "\\(55\\)")
            ],
            correctAnswer: 0,
            explanation: "The value \\(45\\) occurs \\(4\\) times, which is more frequent than any other value in the data, so the mode is \\(45\\).",
            explanationTextMap: text("मान \\(45\\), डेटा में \\(4\\) बार आता है, जो किसी भी अन्य मान से अधिक बार है, इसलिए बहुलक \\(45\\) है।", "The value \\(45\\) occurs \\(4\\) times, which is more frequent than any other value in the data, so the mode is \\(45\\).")
        },
        {
            topic: "Statistics",
            difficulty: "Moderate",
            question: "If the average (mean) of \\(25, 29, 25, 32, 24\\) and \\(x\\) is \\(26\\), find the median of the data.",
            questionTextMap: text("यदि \\(25, 29, 25, 32, 24\\) और \\(x\\) का माध्य \\(26\\) है, तो डेटा की माध्यिका कितनी है?", "If the average (mean) of \\(25, 29, 25, 32, 24\\) and \\(x\\) is \\(26\\), find the median of the data."),
            options: [
                option("\\(29\\)", "\\(29\\)"),
                option("\\(25\\)", "\\(25\\)"),
                option("\\(24\\)", "\\(24\\)"),
                option("\\(27\\)", "\\(27\\)")
            ],
            correctAnswer: 1,
            explanation: "Sum of \\(6\\) values \\(=26\\times6=156\\). Known sum \\(=25+29+25+32+24=135\\), so \\(x=21\\). Arranging in order: \\(21,24,25,25,29,32\\); median \\(=\\frac{25+25}{2}=25\\).",
            explanationTextMap: text("\\(6\\) मानों का योग \\(=26\\times6=156\\)। ज्ञात योग \\(=25+29+25+32+24=135\\), अतः \\(x=21\\)। मानों को क्रम में रखने पर: \\(21,24,25,25,29,32\\); माध्यिका \\(=\\frac{25+25}{2}=25\\)।", "Sum of \\(6\\) values \\(=26\\times6=156\\). Known sum \\(=25+29+25+32+24=135\\), so \\(x=21\\). Arranging in order: \\(21,24,25,25,29,32\\); median \\(=\\frac{25+25}{2}=25\\).")
        },
        {
            topic: "Percentage",
            difficulty: "Easy",
            question: "A person saves \\(50\\%\\) of his income. If his expenditure is ₹\\(360\\), find his income (in ₹).",
            questionTextMap: text("एक व्यक्ति अपनी आय का \\(50\\%\\) बचत करता है। यदि उसका व्यय ₹\\(360\\) है, तो उसकी आय (₹ में) कितनी है?", "A person saves \\(50\\%\\) of his income. If his expenditure is ₹\\(360\\), find his income (in ₹)."),
            options: [
                option("₹800", "₹800"),
                option("₹180", "₹180"),
                option("₹760", "₹760"),
                option("₹720", "₹720")
            ],
            correctAnswer: 3,
            explanation: "Since savings and expenditure are each \\(50\\%\\) of the income, expenditure \\(=\\frac{1}{2}\\times\\) income, so income \\(=360\\times2=720\\). Hence, income = ₹\\(720\\).",
            explanationTextMap: text("चूँकि बचत और व्यय दोनों आय का \\(50\\%\\) हैं, इसलिए व्यय \\(=\\frac{1}{2}\\times\\) आय, अतः आय \\(=360\\times2=720\\)। इसलिए आय = ₹\\(720\\)।", "Since savings and expenditure are each \\(50\\%\\) of the income, expenditure \\(=\\frac{1}{2}\\times\\) income, so income \\(=360\\times2=720\\). Hence, income = ₹\\(720\\).")
        },
        {
            topic: "Speed, Time and Distance",
            difficulty: "Easy",
            question: "A person covers half of his journey's distance at \\(60\\,\\mathrm{km/h}\\) and the other half at \\(30\\,\\mathrm{km/h}\\). Find his average speed for the whole journey.",
            questionTextMap: text("एक व्यक्ति अपनी यात्रा की आधी दूरी को \\(60\\,\\mathrm{km/h}\\) की चाल से और आधी दूरी को \\(30\\,\\mathrm{km/h}\\) की चाल से तय करता है। पूरी यात्रा के दौरान उसकी औसत चाल कितनी है?", "A person covers half of his journey's distance at \\(60\\,\\mathrm{km/h}\\) and the other half at \\(30\\,\\mathrm{km/h}\\). Find his average speed for the whole journey."),
            options: [
                option("\\(45\\,\\mathrm{km/h}\\)", "\\(45\\,\\mathrm{km/h}\\)"),
                option("\\(55\\,\\mathrm{km/h}\\)", "\\(55\\,\\mathrm{km/h}\\)"),
                option("\\(50\\,\\mathrm{km/h}\\)", "\\(50\\,\\mathrm{km/h}\\)"),
                option("\\(40\\,\\mathrm{km/h}\\)", "\\(40\\,\\mathrm{km/h}\\)")
            ],
            correctAnswer: 3,
            explanation: "For equal distances at speeds \\(a\\) and \\(b\\), average speed \\(=\\frac{2ab}{a+b}=\\frac{2\\times60\\times30}{90}=40\\,\\mathrm{km/h}\\).",
            explanationTextMap: text("बराबर दूरी को चाल \\(a\\) और \\(b\\) से तय करने पर, औसत चाल \\(=\\frac{2ab}{a+b}=\\frac{2\\times60\\times30}{90}=40\\,\\mathrm{km/h}\\)।", "For equal distances at speeds \\(a\\) and \\(b\\), average speed \\(=\\frac{2ab}{a+b}=\\frac{2\\times60\\times30}{90}=40\\,\\mathrm{km/h}\\).")
        },
        {
            topic: "Speed, Time and Distance",
            difficulty: "Moderate",
            question: "A car travelling at \\(70\\,\\mathrm{km/hr}\\) for \\(1\\) hour and at \\(p\\,\\mathrm{km/hr}\\) for \\(1\\frac{1}{2}\\) hours has an average speed of \\(58\\,\\mathrm{km/hr}\\). Find the value of \\(p\\).",
            questionTextMap: text("1 घंटे तक \\(70\\,\\mathrm{km/hr}\\) और \\(1\\frac{1}{2}\\) घंटे तक \\(p\\,\\mathrm{km/hr}\\) की चाल से चलने वाली एक कार की औसत चाल \\(58\\,\\mathrm{km/hr}\\) है। \\(p\\) का मान ज्ञात कीजिए।", "A car travelling at \\(70\\,\\mathrm{km/hr}\\) for \\(1\\) hour and at \\(p\\,\\mathrm{km/hr}\\) for \\(1\\frac{1}{2}\\) hours has an average speed of \\(58\\,\\mathrm{km/hr}\\). Find the value of \\(p\\)."),
            options: [
                option("\\(67.5\\)", "\\(67.5\\)"),
                option("\\(70\\)", "\\(70\\)"),
                option("\\(50\\)", "\\(50\\)"),
                option("\\(62.5\\)", "\\(62.5\\)")
            ],
            correctAnswer: 2,
            explanation: "Total distance \\(=70+1.5p\\); total time \\(=2.5\\,hr\\). Average speed: \\(\\frac{70+1.5p}{2.5}=58\\Rightarrow70+1.5p=145\\Rightarrow p=50\\).",
            explanationTextMap: text("कुल दूरी \\(=70+1.5p\\); कुल समय \\(=2.5\\) घंटे। औसत चाल: \\(\\frac{70+1.5p}{2.5}=58\\Rightarrow70+1.5p=145\\Rightarrow p=50\\)।", "Total distance \\(=70+1.5p\\); total time \\(=2.5\\,hr\\). Average speed: \\(\\frac{70+1.5p}{2.5}=58\\Rightarrow70+1.5p=145\\Rightarrow p=50\\).")
        },
        {
            topic: "Linear Equations",
            difficulty: "Easy",
            question: "A basket has mangoes and oranges totalling \\(96\\) fruits. If mangoes are \\(48\\) more than oranges, find the total number of mangoes.",
            questionTextMap: text("एक टोकरी में आम और संतरे मिलाकर \\(96\\) फल हैं। यदि संतरों की तुलना में आम \\(48\\) अधिक हैं, तो कुल कितने आम हैं?", "A basket has mangoes and oranges totalling \\(96\\) fruits. If mangoes are \\(48\\) more than oranges, find the total number of mangoes."),
            options: [
                option("\\(72\\)", "\\(72\\)"),
                option("\\(64\\)", "\\(64\\)"),
                option("\\(88\\)", "\\(88\\)"),
                option("\\(96\\)", "\\(96\\)")
            ],
            correctAnswer: 0,
            explanation: "Let oranges \\(=x\\), mangoes \\(=x+48\\). Then \\(2x+48=96\\Rightarrow x=24\\). Mangoes \\(=24+48=72\\).",
            explanationTextMap: text("मान लीजिए संतरे \\(=x\\), आम \\(=x+48\\)। तब \\(2x+48=96\\Rightarrow x=24\\)। आम \\(=24+48=72\\)।", "Let oranges \\(=x\\), mangoes \\(=x+48\\). Then \\(2x+48=96\\Rightarrow x=24\\). Mangoes \\(=24+48=72\\).")
        },
        {
            topic: "Simplification",
            difficulty: "Moderate",
            question: "Solve: \\(\\dfrac{9.73\\times9.73\\times9.73+7.27\\times7.27\\times7.27}{9.73\\times9.73-9.73\\times7.27+7.27\\times7.27}\\)",
            questionTextMap: text("\\(\\dfrac{9.73\\times9.73\\times9.73+7.27\\times7.27\\times7.27}{9.73\\times9.73-9.73\\times7.27+7.27\\times7.27}\\) को हल करें।", "Solve: \\(\\dfrac{9.73\\times9.73\\times9.73+7.27\\times7.27\\times7.27}{9.73\\times9.73-9.73\\times7.27+7.27\\times7.27}\\)"),
            options: [
                option("\\(18\\)", "\\(18\\)"),
                option("\\(17\\)", "\\(17\\)"),
                option("\\(16\\)", "\\(16\\)"),
                option("\\(15\\)", "\\(15\\)")
            ],
            correctAnswer: 1,
            explanation: "Using \\(a^3+b^3=(a+b)(a^2-ab+b^2)\\) with \\(a=9.73,b=7.27\\), the expression simplifies to \\(a+b=9.73+7.27=17\\).",
            explanationTextMap: text("\\(a^3+b^3=(a+b)(a^2-ab+b^2)\\) सूत्र का उपयोग करते हुए, जहाँ \\(a=9.73,b=7.27\\), व्यंजक सरल होकर \\(a+b=9.73+7.27=17\\) हो जाता है।", "Using \\(a^3+b^3=(a+b)(a^2-ab+b^2)\\) with \\(a=9.73,b=7.27\\), the expression simplifies to \\(a+b=9.73+7.27=17\\).")
        },
        {
            topic: "Trigonometry",
            difficulty: "Easy",
            question: "Find the value of \\(\\sec^2 50^\\circ-\\tan^2 50^\\circ\\).",
            questionTextMap: text("\\(\\sec^2 50^\\circ-\\tan^2 50^\\circ\\) का मान ज्ञात कीजिए।", "Find the value of \\(\\sec^2 50^\\circ-\\tan^2 50^\\circ\\)."),
            options: [
                option("\\(2\\)", "\\(2\\)"),
                option("\\(0\\)", "\\(0\\)"),
                option("\\(1\\)", "\\(1\\)"),
                option("\\(0.5\\)", "\\(0.5\\)")
            ],
            correctAnswer: 2,
            explanation: "By the trigonometric identity, \\(\\sec^2\\theta-\\tan^2\\theta=1\\) for any angle \\(\\theta\\), so the value is \\(1\\).",
            explanationTextMap: text("त्रिकोणमितीय सर्वसमिका के अनुसार, किसी भी कोण \\(\\theta\\) के लिए \\(\\sec^2\\theta-\\tan^2\\theta=1\\), अतः मान \\(1\\) है।", "By the trigonometric identity, \\(\\sec^2\\theta-\\tan^2\\theta=1\\) for any angle \\(\\theta\\), so the value is \\(1\\).")
        },
        {
            topic: "Ratio",
            difficulty: "Easy",
            question: "The ratio of \\(38\\) hours to \\(2\\) days is equal to which of the following?",
            questionTextMap: text("\\(38\\) घंटे का \\(2\\) दिन से अनुपात इनमें से किसके बराबर है?", "The ratio of \\(38\\) hours to \\(2\\) days is equal to which of the following?"),
            options: [
                option("\\(12:19\\)", "\\(12:19\\)"),
                option("\\(19:24\\)", "\\(19:24\\)"),
                option("\\(22:27\\)", "\\(22:27\\)"),
                option("\\(21:27\\)", "\\(21:27\\)")
            ],
            correctAnswer: 1,
            explanation: "\\(2\\) days \\(=48\\) hours. Ratio \\(=38:48=19:24\\) (dividing both terms by \\(2\\)).",
            explanationTextMap: text("\\(2\\) दिन \\(=48\\) घंटे। अनुपात \\(=38:48=19:24\\) (दोनों पदों को \\(2\\) से विभाजित करने पर)।", "\\(2\\) days \\(=48\\) hours. Ratio \\(=38:48=19:24\\) (dividing both terms by \\(2\\)).")
        },
        {
            topic: "Number System - Divisibility",
            difficulty: "Moderate",
            question: "If the number \\(2X73Y5\\) is divisible by \\(11\\), find the value of \\((X-Y)\\).",
            questionTextMap: text("यदि संख्या 2X73Y5, संख्या 11 से विभाज्य है, तो (X−Y) का मान ज्ञात कीजिए।", "If the number \\(2X73Y5\\) is divisible by \\(11\\), find the value of \\((X-Y)\\)."),
            options: [
                option("\\(1\\)", "\\(1\\)"),
                option("\\(3\\)", "\\(3\\)"),
                option("\\(5\\)", "\\(5\\)"),
                option("\\(6\\)", "\\(6\\)")
            ],
            correctAnswer: 0,
            explanation: "For divisibility by \\(11\\), the difference of the sum of digits at odd and even places (from the right) must be a multiple of \\(11\\): \\((5+3+X)-(Y+7+2)=X-Y-1\\). Setting this to \\(0\\) gives \\(X-Y=1\\).",
            explanationTextMap: text("11 से विभाज्यता के लिए, दाईं ओर से विषम और सम स्थानों के अंकों के योग का अंतर 11 का गुणज होना चाहिए: \\((5+3+X)-(Y+7+2)=X-Y-1\\)। इसे \\(0\\) रखने पर \\(X-Y=1\\) प्राप्त होता है।", "For divisibility by \\(11\\), the difference of the sum of digits at odd and even places (from the right) must be a multiple of \\(11\\): \\((5+3+X)-(Y+7+2)=X-Y-1\\). Setting this to \\(0\\) gives \\(X-Y=1\\).")
        },
        {
            topic: "Fractions and Percentage",
            difficulty: "Moderate",
            question: "If \\(10\\%\\) of \\(20\\%\\) of \\(\\dfrac{4}{7}\\) of a number is \\(648\\), find that number.",
            questionTextMap: text("यदि किसी संख्या के \\(\\dfrac{4}{7}\\) के \\(20\\%\\) का \\(10\\%\\), \\(648\\) है। तो वह संख्या ज्ञात कीजिए।", "If \\(10\\%\\) of \\(20\\%\\) of \\(\\dfrac{4}{7}\\) of a number is \\(648\\), find that number."),
            options: [
                option("\\(57140\\)", "\\(57140\\)"),
                option("\\(60230\\)", "\\(60230\\)"),
                option("\\(56700\\)", "\\(56700\\)"),
                option("\\(57580\\)", "\\(57580\\)")
            ],
            correctAnswer: 2,
            explanation: "\\(0.10\\times0.20\\times\\frac{4}{7}\\times N=648\\Rightarrow\\frac{0.08}{7}N=648\\Rightarrow N=648\\times\\frac{7}{0.08}=56{,}700\\).",
            explanationTextMap: text("\\(0.10\\times0.20\\times\\frac{4}{7}\\times N=648\\Rightarrow\\frac{0.08}{7}N=648\\Rightarrow N=648\\times\\frac{7}{0.08}=56{,}700\\)।", "\\(0.10\\times0.20\\times\\frac{4}{7}\\times N=648\\Rightarrow\\frac{0.08}{7}N=648\\Rightarrow N=648\\times\\frac{7}{0.08}=56{,}700\\).")
        },
        {
            topic: "Ages",
            difficulty: "Moderate",
            question: "A mother is \\(25\\) years older than her daughter. After \\(15\\) years, the mother's age will be twice the daughter's age. Find the daughter's present age.",
            questionTextMap: text("एक माता अपनी पुत्री से \\(25\\) वर्ष बड़ी है। \\(15\\) वर्ष बाद, माता की उम्र पुत्री की उम्र से दोगुनी हो जाएगी। पुत्री की वर्तमान उम्र ज्ञात कीजिए।", "A mother is \\(25\\) years older than her daughter. After \\(15\\) years, the mother's age will be twice the daughter's age. Find the daughter's present age."),
            options: [
                option("\\(20\\) वर्ष", "\\(20\\) years"),
                option("\\(25\\) वर्ष", "\\(25\\) years"),
                option("\\(10\\) वर्ष", "\\(10\\) years"),
                option("\\(35\\) वर्ष", "\\(35\\) years")
            ],
            correctAnswer: 2,
            explanation: "Let daughter's age \\(=x\\), mother's age \\(=x+25\\). \\(x+25+15=2(x+15)\\Rightarrow x+40=2x+30\\Rightarrow x=10\\) years.",
            explanationTextMap: text("मान लीजिए पुत्री की आयु \\(=x\\), माता की आयु \\(=x+25\\)। \\(x+25+15=2(x+15)\\Rightarrow x+40=2x+30\\Rightarrow x=10\\) वर्ष।", "Let daughter's age \\(=x\\), mother's age \\(=x+25\\). \\(x+25+15=2(x+15)\\Rightarrow x+40=2x+30\\Rightarrow x=10\\) years.")
        },
        {
            topic: "Geometry - Triangles",
            difficulty: "Hard",
            question: "In \\(\\triangle ABC\\), \\(BD\\perp AC\\) at point D and \\(\\angle DBC=65^\\circ\\). A point E lies on BC such that \\(\\angle CAE=30^\\circ\\). Find the measure of \\(\\angle AEB\\).",
            questionTextMap: text("\\(\\triangle ABC\\) में, बिंदु D पर \\(BD\\perp AC\\) है और \\(\\angle DBC=65^\\circ\\) है। BC पर एक बिंदु E इस प्रकार है कि \\(\\angle CAE=30^\\circ\\) है। \\(\\angle AEB\\) की माप कितनी है?", "In \\(\\triangle ABC\\), \\(BD\\perp AC\\) at point D and \\(\\angle DBC=65^\\circ\\). A point E lies on BC such that \\(\\angle CAE=30^\\circ\\). Find the measure of \\(\\angle AEB\\)."),
            options: [
                option("\\(53^\\circ\\)", "\\(53^\\circ\\)"),
                option("\\(56^\\circ\\)", "\\(56^\\circ\\)"),
                option("\\(50^\\circ\\)", "\\(50^\\circ\\)"),
                option("\\(55^\\circ\\)", "\\(55^\\circ\\)")
            ],
            correctAnswer: 3,
            explanation: "In \\(\\triangle BDC\\), \\(\\angle DCB=180-90-65=25^\\circ\\), i.e. \\(\\angle ACB=25^\\circ\\). In \\(\\triangle AEC\\), \\(\\angle AEC=180-25-30=125^\\circ\\). Since B, E, C are collinear, \\(\\angle AEB=180-125=55^\\circ\\).",
            explanationTextMap: text("\\(\\triangle BDC\\) में, \\(\\angle DCB=180-90-65=25^\\circ\\), अर्थात \\(\\angle ACB=25^\\circ\\)। \\(\\triangle AEC\\) में, \\(\\angle AEC=180-25-30=125^\\circ\\)। चूँकि B, E, C एक सरल रेखा में हैं, इसलिए \\(\\angle AEB=180-125=55^\\circ\\)।", "In \\(\\triangle BDC\\), \\(\\angle DCB=180-90-65=25^\\circ\\), i.e. \\(\\angle ACB=25^\\circ\\). In \\(\\triangle AEC\\), \\(\\angle AEC=180-25-30=125^\\circ\\). Since B, E, C are collinear, \\(\\angle AEB=180-125=55^\\circ\\).")
        },
        {
            topic: "Profit and Loss",
            difficulty: "Hard",
            question: "Poonam sold a book to Mohini at a \\(5\\%\\) loss, and Mohini sold it to Roopashi at an \\(8\\%\\) profit. If Roopashi bought the book for ₹\\(1{,}539\\), find Poonam's cost price for the book (in ₹).",
            questionTextMap: text("पूनम ने मोहिनी को एक किताब \\(5\\%\\) की हानि पर बेची और मोहिनी ने उसे रूपाशी को \\(8\\%\\) के लाभ पर बेचा। यदि रूपाशी ने किताब ₹\\(1{,}539\\) में खरीदी, तो पूनम के लिए किताब का क्रय मूल्य (₹ में) कितना था?", "Poonam sold a book to Mohini at a \\(5\\%\\) loss, and Mohini sold it to Roopashi at an \\(8\\%\\) profit. If Roopashi bought the book for ₹\\(1{,}539\\), find Poonam's cost price for the book (in ₹)."),
            options: [
                option("₹1,600", "₹1,600"),
                option("₹1,650", "₹1,650"),
                option("₹1,500", "₹1,500"),
                option("₹1,550", "₹1,550")
            ],
            correctAnswer: 2,
            explanation: "Let Poonam's CP \\(=x\\). \\(x\\times0.95\\times1.08=1539\\Rightarrow1.026x=1539\\Rightarrow x=1{,}500\\). Hence, CP = ₹\\(1{,}500\\).",
            explanationTextMap: text("मान लीजिए पूनम का क्रय मूल्य \\(=x\\)। \\(x\\times0.95\\times1.08=1539\\Rightarrow1.026x=1539\\Rightarrow x=1{,}500\\)। अतः क्रय मूल्य = ₹\\(1{,}500\\)।", "Let Poonam's CP \\(=x\\). \\(x\\times0.95\\times1.08=1539\\Rightarrow1.026x=1539\\Rightarrow x=1{,}500\\). Hence, CP = ₹\\(1{,}500\\).")
        },
        {
            topic: "Ratio",
            difficulty: "Moderate",
            question: "If \\(896\\) bananas were distributed among three monkeys in the ratio \\(\\dfrac{4}{6}:\\dfrac{2}{2}:\\dfrac{2}{2}\\), how many bananas did the third monkey get?",
            questionTextMap: text("यदि 896 केले तीन बंदरों में, \\(\\dfrac{4}{6}:\\dfrac{2}{2}:\\dfrac{2}{2}\\) के अनुपात में वितरित किए गए, तो तीसरे बंदर को कितने केले मिले?", "If \\(896\\) bananas were distributed among three monkeys in the ratio \\(\\dfrac{4}{6}:\\dfrac{2}{2}:\\dfrac{2}{2}\\), how many bananas did the third monkey get?"),
            options: [
                option("\\(334\\)", "\\(334\\)"),
                option("\\(336\\)", "\\(336\\)"),
                option("\\(338\\)", "\\(338\\)"),
                option("\\(335\\)", "\\(335\\)")
            ],
            correctAnswer: 1,
            explanation: "The ratio \\(\\frac{4}{6}:\\frac{2}{2}:\\frac{2}{2}=\\frac{2}{3}:1:1\\); multiplying by \\(3\\) gives the whole-number ratio \\(2:3:3\\) (total \\(8\\) parts). Each part \\(=\\frac{896}{8}=112\\). Third monkey's share \\(=3\\times112=336\\).",
            explanationTextMap: text("अनुपात \\(\\frac{4}{6}:\\frac{2}{2}:\\frac{2}{2}=\\frac{2}{3}:1:1\\); \\(3\\) से गुणा करने पर पूर्ण संख्या अनुपात \\(2:3:3\\) (कुल \\(8\\) भाग) मिलता है। प्रत्येक भाग \\(=\\frac{896}{8}=112\\)। तीसरे बंदर का हिस्सा \\(=3\\times112=336\\)।", "The ratio \\(\\frac{4}{6}:\\frac{2}{2}:\\frac{2}{2}=\\frac{2}{3}:1:1\\); multiplying by \\(3\\) gives the whole-number ratio \\(2:3:3\\) (total \\(8\\) parts). Each part \\(=\\frac{896}{8}=112\\). Third monkey's share \\(=3\\times112=336\\).")
        }
    ].map((question, index) => ({
        id: `${quizId}-q${String(index + 1).padStart(2, "0")}`,
        subject: "Mathematics",
        marks: 1,
        negativeMarks: 0.33,
        ...question
    }));

    window.GJU_QUIZ_BANK.push({
        id: quizId,
        subject: "Mathematics",
        title: "RRB Group D Mathematics Practice Set 1 (08-01-2026, Shift 1)",
        description: "25 bilingual Hindi-English Mathematics questions from the RRB Group D CBT-1 08-01-2026 Shift 1 paper, with LaTeX formatting and step-by-step explanations.",
        durationMinutes: 25,
        totalQuestions: questions.length,
        marksPerQuestion: 1,
        negativeMarks: 0.33,
        difficulty: "Mixed",
        tags: ["RRB", "Group D", "Railway", "Mathematics", "Bilingual", "LaTeX", "PYQ"],
        questions
    });
}());
