(function () {
    "use strict";

    window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];

    const quizId = "math-percentage-abhinay-set-1";
    const seeds = [
        {
                "question": "After an increment of 16 2/3% in the cost of a machine, it becomes Rs. 4900. Find the initial cost of the machine.",
                "answer": "Rs. 4200"
        },
        {
                "question": "A student required 36% marks to pass. He scored 24% marks and failed by 18 marks. Find the passing marks.",
                "answer": "54"
        },
        {
                "question": "A student scored 30% and failed by 45 marks. Another scored 42% and got 45 marks more than passing marks. Find the passing marks.",
                "answer": "270"
        },
        {
                "question": "A student got 20% and failed by 30 marks. Another got 32% and got 42 marks more than passing marks. Find the passing marks.",
                "answer": "150"
        },
        {
                "question": "In an election, one of two candidates got 41% of total votes and lost by 5580 votes. Find total votes.",
                "answer": "31000"
        },
        {
                "question": "In an election, one candidate got 55% of total valid votes and 20% votes were invalid. Total votes are 5500. How many valid votes did the other candidate get?",
                "answer": "1980"
        },
        {
                "question": "8% voters did not vote. The winner secured 48% of total votes and won by 1100 votes. Find total voters.",
                "answer": "27500"
        },
        {
                "question": "10% voters did not vote and 10% polled votes were invalid. Winner got 54% of valid votes and won by 1620 votes. Find enrolled voters.",
                "answer": "25000"
        },
        {
                "question": "75% voters cast votes; 2% of polled votes were invalid. A candidate got 9261 votes, which were 75% of valid votes. Find enrolled voters.",
                "answer": "16800"
        },
        {
                "question": "10% voters did not vote. 60 votes were invalid. Winner got 47% of valid votes and won by 308 votes. Find enrolled voters.",
                "answer": "6200"
        },
        {
                "question": "In an election, 10000 voters did not vote. 75% of cast votes were valid. Winner won by 2250 votes and loser got 18% of total votes. Find total votes.",
                "answer": "25000"
        },
        {
                "question": "2/5 voters promised to vote for Mulayam Singh and the rest for Mayawati. On election day 15% of Mulayam supporters and 25% of Mayawati supporters changed. Mayawati won by 1500 votes. Find total voters.",
                "answer": "75000"
        },
        {
                "question": "Income of A is 30% more than income of B. B's income is how much percent less than A's?",
                "answer": "23 1/13%"
        },
        {
                "question": "Income of A is 40% less than B's income. B's income is how much percent more than A's?",
                "answer": "66 2/3%"
        },
        {
                "question": "Income of A is 40% more than B's. B's income is 20% less than C's. Find ratio of income of A and C.",
                "answer": "28 : 25"
        },
        {
                "question": "A's income is 50% more than B's. C's income is 2/3 of A's. D's income is half of C's. D increases by 10%. B is what percent of D after increment?",
                "answer": "2000/11%"
        },
        {
                "question": "An agent gets 5% commission on sales up to Rs. 10000 and 4% on sales exceeding it. After deducting commission he gives Rs. 31100 to company. Find total sales.",
                "answer": "Rs. 32500"
        },
        {
                "question": "A company gives 9% commission up to Rs. 15000 and 7% on sales above Rs. 15000. Sales deposited after commission is Rs. 32250. Find total sale.",
                "answer": "Rs. 35000"
        },
        {
                "question": "A company gives 8.5% commission up to Rs. 20000 and 7% on sales above Rs. 20000. Sales deposited after commission is Rs. 42480. Find total sale.",
                "answer": "Rs. 46000"
        },
        {
                "question": "A salesman gets 5.5% commission up to Rs. 10000 and additional bonus of 0.5% on sales above Rs. 10000. Total earning is Rs. 1990. Find total sales.",
                "answer": "Rs. 34000"
        },
        {
                "question": "A salesman gets 12% commission up to Rs. 15000 and additional bonus of 1% on sales above Rs. 15000. Total earning is Rs. 7650. Find total sales.",
                "answer": "Rs. 60000"
        },
        {
                "question": "A salesman gets 7.5% commission up to Rs. 12000 and additional bonus of 1.5% on sales above Rs. 12000. Total earning is Rs. 4185. Find total sales.",
                "answer": "Rs. 48500"
        },
        {
                "question": "A salesman gets 9.25% commission up to Rs. 20000 and additional bonus of 0.75% on sales above Rs. 20000. Total earning is Rs. 6170. Find total sales.",
                "answer": "Rs. 63200"
        },
        {
                "question": "Company allows 7% commission on total sales. If appointed on fixed salary Rs. 3000 plus 4% commission on sales above Rs. 10000, salesman gets Rs. 800 more. Find total sales.",
                "answer": "Rs. 60000"
        },
        {
                "question": "Company allows 9% commission on total sales. If appointed on fixed salary Rs. 4000 plus 3% commission on sales above Rs. 10000, salesman gets Rs. 700 more. Find total sales.",
                "answer": "Rs. 50000"
        },
        {
                "question": "Company allows 11% commission on total sales. If appointed on fixed salary Rs. 8200 plus 5% commission on sales above Rs. 20000, salesman gets Rs. 1200 more. Find total sales.",
                "answer": "Rs. 100000"
        },
        {
                "question": "A salesman gets a% commission on first Rs. 3000 sales and b% on further sales. He earns Rs. 960 on Rs. 7000 sales and Rs. 1110 on Rs. 8000 sales. Find a and b.",
                "answer": "15%, 12%"
        },
        {
                "question": "A person usually spent Rs. 48 on groundnuts. Once he bought 1.5 kg less for Rs. 48 as price rose by 25%. Find earlier price per kg.",
                "answer": "Rs. 6.40"
        },
        {
                "question": "Rate of income tax is increased by 19%. Net income is decreased by 1%. Find original income-tax rate.",
                "answer": "5%"
        },
        {
                "question": "Rate of income tax is increased by 23%. Net income is decreased by 2%. Find original income-tax rate.",
                "answer": "20%"
        },
        {
                "question": "By what percent will rectangle area increase if length increases by 23% and breadth by 9%?",
                "answer": "34.07%"
        },
        {
                "question": "Milk price increases by 35%. By what percent must consumption be reduced so expenditure increases only by 8%?",
                "answer": "20%"
        },
        {
                "question": "In a triangle, altitude increases by 22% and base decreases by 6%. Find net effect on area.",
                "answer": "14.68% increase"
        },
        {
                "question": "Length of a cuboid increases by 12% and breadth by 25%. By what percent should height decrease so volume increases only by 4%?",
                "answer": "25.7%"
        },
        {
                "question": "A labourer works 60 hours/week and gets Rs. 2400. Hourly wages increase by 40% and working hours reduce by 16 2/3%. Find wage increase/decrease.",
                "answer": "16 2/3% increase"
        },
        {
                "question": "Wages of a labourer increase by 12 1/2% and working hours decrease by 8%. Initially he earned Rs. 1200 for 50 hours/week. Find percentage increase in weekly wages.",
                "answer": "3.5%"
        },
        {
                "question": "Cinema ticket is Rs. 250. Price is reduced and ticket sales increase by 50%, while overall collection reduces by 17.5%. Find percentage decrease in ticket price.",
                "answer": "45%"
        },
        {
                "question": "Circus ticket costs Rs. 12. After price reduction, audience increases by 80% and total income increases by 20%. Find reduced ticket price.",
                "answer": "Rs. 8"
        },
        {
                "question": "A person spends 75% of income. Income increases by 60% and expenditure increases by 70%. Find percentage change in savings.",
                "answer": "30% increase"
        },
        {
                "question": "A person spends 80% of income. Income increases by 35% and expenditure increases by 37 1/2%. Find percentage change in savings.",
                "answer": "25% increase"
        },
        {
                "question": "A person spends 87.5% of income. Income increases by 59% and expenditure increases by 67%. Find percentage change in savings.",
                "answer": "3% increase"
        },
        {
                "question": "A person saves 6% of income. After 2 years income increases by 15% but savings remain same. Find percentage increase in expenditure.",
                "answer": "15.85%"
        },
        {
                "question": "Ratio of Rama's expenditure and saving is 5:3. Income increases by 12% and expenditure by 15%. Find percentage increase in savings.",
                "answer": "7%"
        },
        {
                "question": "Ramesh earns Rs. 5000 and spends in ratio 2:5 on clothes and food. Cloth price increases 10%, food price 20%. By what percent should income increase to keep same consumption ratio?",
                "answer": "17 1/7%"
        },
        {
                "question": "Due to 20% increase in sugar price, a person buys 5 kg less for Rs. 600. Find original and increased price of sugar.",
                "answer": "Rs. 20, Rs. 24"
        },
        {
                "question": "Due to 10% decrease in wheat price, a person buys 50 g more wheat for Rs. 1. Find initial quantity for Rs. 1.",
                "answer": "450 gm"
        },
        {
                "question": "Due to 10% reduction in milk price, a person buys 6.2 litres more for Rs. 1116. Find reduced price per litre.",
                "answer": "Rs. 18/litre"
        },
        {
                "question": "Due to 50% increase in egg price, a person buys 4 eggs less for Rs. 24. Find initial cost per dozen eggs.",
                "answer": "Rs. 36"
        },
        {
                "question": "Due to 16 2/3% increase in banana price, a person buys 5 bananas less for Rs. 1. How many bananas could he buy initially for Rs. 1?",
                "answer": "35 bananas"
        },
        {
                "question": "A solution contains 15% salt. From it 30 kg water is removed and salt becomes 20% of solution. Find initial quantity of solution.",
                "answer": "120 kg"
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
        title: "Percentage Practice Set 1",
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
