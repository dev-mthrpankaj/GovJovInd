(function () {
    "use strict";

    window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];

    const quizId = "math-percentage-abhinay-set-2";
    const seeds = [
        {
                "question": "Fresh fruit contains 68% water and dry fruit contains 20% water. How much dry fruit can be obtained from 55 kg fresh fruit?",
                "answer": "22 kg"
        },
        {
                "question": "A person's income increases by Rs. 4800. Tax rate decreases from 12% to 10%. Payable tax is same; in both cases 20% income is tax-free. Find current income.",
                "answer": "Rs. 28800"
        },
        {
                "question": "Income of a man increases by Rs. 1800 and payable tax rate decreases from 18% to 15%. In both cases 29.95% income is tax-free. Find initial income.",
                "answer": "Rs. 9000"
        },
        {
                "question": "Income decreases by Rs. 3000 and income-tax rate increases from 15% to 18%. Ratio of paid tax is 3:2 and 26.5% income is tax-free. Find initial income.",
                "answer": "Rs. 6750"
        },
        {
                "question": "My income is Rs. 20000 and I spend 80%. When income increases by 20%, I spend Rs. 5000 more. Find increase in savings.",
                "answer": "25%"
        },
        {
                "question": "A father gives 1% of monthly income to his two sons. He gives 80% of that amount to elder son, who spends 80% and saves Rs. 20. Find father's income.",
                "answer": "Rs. 12500"
        },
        {
                "question": "A person gives 20% income to elder son, 30% of remaining to younger son and 10% of balance to a trust. He is left with Rs. 10080. Find income.",
                "answer": "Rs. 20000"
        },
        {
                "question": "In a school, ratio of boys to girls is 4:1. 75% boys and 70% girls got scholarship. Find percentage of students who did not get scholarship.",
                "answer": "26%"
        },
        {
                "question": "In an institute, 60% students are boys. 15% boys and 7.5% girls get fee waiver. Total getting fee waiver is 90. If 50% of those not getting waiver get half concession, find number getting 50% concession.",
                "answer": "330"
        },
        {
                "question": "Total income of A, B and C is Rs. 72000. They spend 80%, 85% and 75% respectively. Savings ratio is 8:9:20. Find income of A.",
                "answer": "Rs. 16000"
        },
        {
                "question": "A number is divided into two parts such that 80% of first exceeds 60% of second by 3, and 80% of second exceeds 90% of first by 6. Find the number.",
                "answer": "135"
        },
        {
                "question": "In a city, 45% men and 25% women are married. Nobody is married more than once. What percent of population is married?",
                "answer": "32 1/7%"
        },
        {
                "question": "In a village, 2/3 are men and rest women. 80% men and 70% women are literate. 40% literate men and 30% literate women are graduates. 20% graduate men and 25% graduate women have government jobs. Working population is what percent of total?",
                "answer": "6.01%"
        },
        {
                "question": "In a climate conference, there are 700 men, 500 women and 800 children. 20% men, 40% women and 10% children are Indians. Find percent of people not Indian.",
                "answer": "79%"
        },
        {
                "question": "If numerator of a fraction increases by 20% and denominator decreases by 5%, fraction becomes 5/2. Find original fraction.",
                "answer": "95/48"
        },
        {
                "question": "If numerator of a fraction increases by 15% and denominator decreases by 8%, value becomes 15/16. Find original fraction.",
                "answer": "3/4"
        },
        {
                "question": "A family consumes rice, daal and wheat in expenditure ratio 12:17:3. Prices increase by 20%, 30% and 50% respectively. By how much does total expenditure increase?",
                "answer": "28 1/8%"
        },
        {
                "question": "In an examination, A secured 25% more than B. B secured 10% less than C. C secured 25% more than D. D secured 320 out of 500. Find A's marks.",
                "answer": "450"
        },
        {
                "question": "There is 15% rebate if electric bills are paid in time. A man got rebate of Rs. 54 by paying in time. Find his electric bill.",
                "answer": "Rs. 360"
        },
        {
                "question": "To pass an examination, a candidate needs 40% marks. All questions carry equal marks. A candidate just passed with 10 correct answers out of 15 attempted. Find total questions.",
                "answer": "25"
        },
        {
                "question": "In a test of 80 questions, a student answered 75% of first 60 correctly. What percentage of remaining questions must be correct to score 80% overall?",
                "answer": "95%"
        },
        {
                "question": "An exam has 80 questions of 1 mark each. Arpita answered 65% of first 40 questions correctly. What percent of remaining questions must be right to score 75% overall?",
                "answer": "85%"
        },
        {
                "question": "A businessman earned 20% profit on investment in 1995. In 1996, investment was Rs. 5000 less but income was same; profit percent increased by 26%. Find investment in 1995.",
                "answer": "Rs. 105000"
        },
        {
                "question": "Difference of two numbers is 1660. If 6 1/2% of one equals 8 1/2% of other, find smaller number.",
                "answer": "5395"
        },
        {
                "question": "In a class, 70% pass English, 65% pass Maths, 27% fail both and 248 pass both. Find total students.",
                "answer": "400"
        },
        {
                "question": "In a class, 80% pass Maths, 70% pass English, 10% fail both and 144 pass both. Find total students.",
                "answer": "240"
        },
        {
                "question": "In a village, 60% families have one cow, 30% have one buffalo and 15% have both. There are 96 families. Find families having neither cow nor buffalo.",
                "answer": "24"
        },
        {
                "question": "In a company, 55% workers drink tea, 45% coffee and 40% milk. 20% drink tea and milk, 20% coffee and milk, 25% tea and coffee, and 15% all three. Find percentage who like none.",
                "answer": "10%"
        },
        {
                "question": "Population of a village is 5000. Male population increases by 10% and female by 15%, making population 5600. Find number of males initially.",
                "answer": "3000"
        },
        {
                "question": "Population of a village is 8000. Male population increases by 10% and female by 8%, overall increase is 9%. Find number of males.",
                "answer": "4000"
        },
        {
                "question": "A person pays 10% tax, then spends 20% of remaining on education and 25% of remaining on food. He is left with Rs. 2700. Find income.",
                "answer": "Rs. 5000"
        },
        {
                "question": "Sameer spends 24% monthly income on food, 15% on children's education, 25% of remaining on entertainment and 20% on travelling. He is left with Rs. 10736. Find income.",
                "answer": "Rs. 32000"
        },
        {
                "question": "From an officer's salary, 10% is house rent, 15% of rest is children's education and 10% of balance is clothes. He is left with Rs. 1377. Find salary.",
                "answer": "Rs. 2000"
        },
        {
                "question": "Santosh's expenditure and saving ratio is 8:5. He spends 20% of expenditure on food and 40% on clothes. He deposits 60% of savings in bank. Clothes spending is what percent of bank deposit?",
                "answer": "106 2/3%"
        },
        {
                "question": "A person has some money. 25% is stolen, 10% is lost from remaining, 50% of remainder is spent on food, then he buys a Rs. 26 book and has nothing left. Find initial amount.",
                "answer": "Rs. 80"
        },
        {
                "question": "A man spent 25% of money on an article and 10% of remaining on clothes. Then he donated Rs. 531.25 and was left with Rs. 8000. Find amount spent on clothes.",
                "answer": "Rs. 947.916"
        },
        {
                "question": "A family's savings to expenditure ratio last month was 2:13. Savings this month fell to 50% of last month's saving. Last month's salary was Rs. 10000 and this month salary rose by 15%. Find this month's expenditure.",
                "answer": "Rs. 10833"
        },
        {
                "question": "Packing cost of mangoes is 40% of fresh mango cost. Mango price increases by 30% but packing cost decreases by 50%. Find percentage change in packed mango cost.",
                "answer": "15/7%"
        },
        {
                "question": "Sugar price increase is 2% more than inflation. On Jan 1, 2004 sugar is Rs. 20/kg. Inflation in 2004 and 2005 is 8% each. Find assumed price on Jan 1, 2006.",
                "answer": "Rs. 24.2"
        },
        {
                "question": "A report has 20 pages, each 55 lines, each line 65 characters. It is reduced to pages of 65 lines with 70 characters each. Find percentage reduction in pages.",
                "answer": "20%"
        },
        {
                "question": "Sugar price increase is 2% more than inflation. Price on Jan 1, 1994 is Rs. 20/kg. Inflation for 1994 and 1995 is 8% each. Expected price on Jan 1, 1996 is?",
                "answer": "Rs. 24.20"
        },
        {
                "question": "Every month a man consumes 25 kg rice and 9 kg wheat. Rice price is 20% of wheat price and total expense is Rs. 350. If wheat price increases by 20%, find percentage reduction in rice consumption to keep expense same.",
                "answer": "36%"
        },
        {
                "question": "Raw material price rises 15%, and labour cost rises from 25% to 30% of raw material cost. By what percent should raw material usage reduce to keep cost same?",
                "answer": "17%"
        },
        {
                "question": "Three machines M1, M2, M3 produce 25%, 35%, 40% of products. Their defective rates are 2%, 4%, 5%. Find percentage of non-defective products.",
                "answer": "96.1%"
        },
        {
                "question": "Connie has gold coins of different weights. She gives 24 lightest coins weighing 45% total to Brennan, 13 heaviest weighing 26% total to Maya, and rest to Blair. How many coins did Blair get?",
                "answer": "15"
        },
        {
                "question": "A jeweller raises price by x% and lowers by x%; after one cycle price reduces by Rs. 100. After second same cycle, price is Rs. 2304. Find original price.",
                "answer": "Rs. 2500"
        },
        {
                "question": "A person gives 30% income to elder daughter and 40% of remaining to younger daughter. Rest is equally distributed among 3 sons; each son gets Rs. 672. Find total amount given to elder and younger daughters.",
                "answer": "Rs. 1344"
        },
        {
                "question": "40% marks are required to pass. A got 10% less than passing marks. B got 11 1/9% less than A. C got 41 3/17% less than A+B. Find C's marks percentage.",
                "answer": "40%"
        },
        {
                "question": "Five questions were asked. 5% examinees answered all 5 and 5% none. Of the rest, 25% answered only 1, 20% answered 4, and 24 1/2% of total answered only 2. If 200 answered 3, find total examinees.",
                "answer": "800"
        },
        {
                "question": "A number N is divided into three parts so that sum of first two parts is K% of the third part. Find the third part.",
                "answer": "100N/(K+100)"
        }
];

    function buildOptions(index) {
        const correct = seeds[index].answer;
        const answerPool = seeds.map((item) => item.answer);
        const distractors = [];
        let step = 1;
        while (distractors.length < 3 && step < answerPool.length + 10) {
            const candidate = answerPool[(index + step * 7) % answerPool.length];
            if (candidate !== correct && !distractors.includes(candidate)) {
                distractors.push(candidate);
            }
            step += 1;
        }
        const options = distractors.slice(0, 3);
        const correctIndex = index % 4;
        options.splice(correctIndex, 0, correct);
        return { options, correctIndex };
    }

    function buildQuestions() {
        return seeds.map((seed, index) => {
            const optionData = buildOptions(index);
            const number = index + 1;
            return {
                id: `${quizId}-q${String(number).padStart(2, "0")}`,
                topic: "Percentage",
                difficulty: "hard",
                question: seed.question,
                options: optionData.options,
                correctAnswer: optionData.correctIndex,
                explanation: `Correct answer: ${seed.answer}. Use percentage base-value method, successive percentage change, or equation formation as applicable.`
            };
        });
    }

    window.GJU_QUIZ_BANK.push({
        id: quizId,
        subject: "Mathematics",
        title: "Percentage Practice Set 2",
        description: "50 hard percentage questions prepared from Abhinay Maths Classes Percentage PDF.",
        durationMinutes: 45,
        totalQuestions: 50,
        marksPerQuestion: 1,
        negativeMarks: 0.25,
        difficulty: "Hard",
        tags: ["SSC", "CGL", "CPO", "CHSL", "Percentage", "Abhinay Maths"],
        questions: buildQuestions()
    });
}());
