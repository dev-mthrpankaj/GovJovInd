(function () {
    "use strict";

    window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];

    const quizId = "di-tough-mixed-set-2";
    const sets = [
        {
            topic: "Pie chart with target bar chart",
            chart: {
                type: "target-bars",
                title: "Tax Revenue Pie Share With Target Achievement",
                subtitle: "Total actual revenue Rs 180000 crore. Pie share: GST 42%, Excise 18%, Stamp Duty 12%, Motor Tax 8%, Others 20%.",
                valueLabel: "Actual collection",
                percentLabel: "Actual vs target",
                items: [
                    { label: "GST", value: 75600, targetPercent: 105 },
                    { label: "Excise", value: 32400, targetPercent: 96 },
                    { label: "Stamp Duty", value: 21600, targetPercent: 90 },
                    { label: "Motor Tax", value: 14400, targetPercent: 110 },
                    { label: "Others", value: 36000, targetPercent: 88 }
                ]
            },
            context: "Pie + bar DI: Actual state tax revenue is Rs 180000 crore. Pie shares: GST 42%, Excise 18%, Stamp Duty 12%, Motor Tax 8%, Others 20%. Bar chart shows actual collection as percent of target: GST 105%, Excise 96%, Stamp Duty 90%, Motor Tax 110%, Others 88%.",
            questions: [
                {
                    q: "GST aur Others ka combined actual collection kitna hai?",
                    options: ["Rs 109600 crore", "Rs 110600 crore", "Rs 111600 crore", "Rs 112600 crore"],
                    answer: "Rs 111600 crore",
                    explanation: "GST actual = 42% of 180000 = 75600. Others = 20% of 180000 = 36000. Combined = 111600 crore."
                },
                {
                    q: "Sabhi sources ka total target collection approximately kitna tha?",
                    options: ["Rs 181750 crore", "Rs 182750 crore", "Rs 183750 crore", "Rs 184750 crore"],
                    answer: "Rs 183750 crore",
                    explanation: "Targets: GST 72000, Excise 33750, Stamp 24000, Motor 13090.91, Others 40909.09. Total = 183750 crore."
                },
                {
                    q: "Target se sabse zyada shortfall kis source me hai?",
                    options: ["Excise", "Stamp Duty", "Motor Tax", "Others"],
                    answer: "Others",
                    explanation: "Shortfalls: Excise 1350, Stamp 2400, Others 4909.09 crore. Motor and GST target se above hain. Maximum shortfall Others me hai."
                },
                {
                    q: "Motor Tax ka target collection approximately kitna tha?",
                    options: ["Rs 13090.91 crore", "Rs 13290.91 crore", "Rs 13490.91 crore", "Rs 13690.91 crore"],
                    answer: "Rs 13090.91 crore",
                    explanation: "Motor Tax actual = 8% of 180000 = 14400 crore. Actual = 110% of target, so target = 14400/1.10 = 13090.91 crore."
                },
                {
                    q: "GST collection target se kitna zyada hai?",
                    options: ["Rs 3200 crore", "Rs 3400 crore", "Rs 3600 crore", "Rs 3800 crore"],
                    answer: "Rs 3600 crore",
                    explanation: "GST target = 75600/1.05 = 72000 crore. Surplus = 75600 - 72000 = 3600 crore."
                },
                {
                    q: "Actual Stamp Duty collection, actual Excise collection ka kitna percent hai?",
                    options: ["62.67%", "64.67%", "66.67%", "68.67%"],
                    answer: "66.67%",
                    explanation: "Stamp actual = 21600, Excise actual = 32400. Required = 21600/32400 x 100 = 66.67%."
                },
                {
                    q: "Actual GST aur actual Others ka ratio kya hai?",
                    options: ["19:10", "20:9", "21:10", "22:11"],
                    answer: "21:10",
                    explanation: "GST:Others = 75600:36000 = 21:10."
                },
                {
                    q: "Agar Excise efficiency 96% se 100% ho jaye, same target par extra collection kitna hoga?",
                    options: ["Rs 1250 crore", "Rs 1350 crore", "Rs 1450 crore", "Rs 1550 crore"],
                    answer: "Rs 1350 crore",
                    explanation: "Excise target = 32400/0.96 = 33750 crore. Extra = 33750 - 32400 = 1350 crore."
                },
                {
                    q: "Under-target sources ka combined actual collection kitna hai?",
                    options: ["Rs 88000 crore", "Rs 89000 crore", "Rs 90000 crore", "Rs 91000 crore"],
                    answer: "Rs 90000 crore",
                    explanation: "Under-target sources: Excise, Stamp Duty, Others. Actual = 32400+21600+36000 = 90000 crore."
                },
                {
                    q: "Over-target sources ka actual collection total actual collection ka kitna percent hai?",
                    options: ["48%", "49%", "50%", "51%"],
                    answer: "50%",
                    explanation: "Over-target sources: GST and Motor Tax. Actual = 75600+14400 = 90000 crore. Share = 90000/180000 x 100 = 50%."
                }
            ]
        },
        {
            topic: "Double line graph",
            chart: {
                type: "line",
                title: "Rainfall and Reservoir Inflow Double Line Graph",
                subtitle: "Rainfall in mm and inflow in million cubic metre. Evaporation loss is 8% of inflow.",
                categories: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                series: [
                    { label: "Rainfall", values: [180, 240, 210, 150, 90, 60] },
                    { label: "Inflow", values: [42, 65, 58, 36, 20, 12] }
                ]
            },
            context: "Double line graph DI: Rainfall in mm and reservoir inflow in million cubic metre are Jul 180/42, Aug 240/65, Sep 210/58, Oct 150/36, Nov 90/20, Dec 60/12. Evaporation loss is 8% of inflow each month.",
            questions: [
                {
                    q: "Six months ka total rainfall kitna hai?",
                    options: ["900 mm", "920 mm", "930 mm", "950 mm"],
                    answer: "930 mm",
                    explanation: "Total rainfall = 180+240+210+150+90+60 = 930 mm."
                },
                {
                    q: "Inflow per mm rainfall sabse zyada kis month me hai?",
                    options: ["Aug", "Sep", "Oct", "Dec"],
                    answer: "Sep",
                    explanation: "Ratios: Aug 65/240 = 0.2708, Sep 58/210 = 0.2762, Oct 36/150 = 0.24, Dec 12/60 = 0.20. Maximum Sep."
                },
                {
                    q: "Aug aur Sep ka combined usable inflow kitna hai?",
                    options: ["111.16 mcm", "112.16 mcm", "113.16 mcm", "114.16 mcm"],
                    answer: "113.16 mcm",
                    explanation: "Combined inflow = 65+58 = 123 mcm. Usable = 92% of 123 = 113.16 mcm."
                },
                {
                    q: "Sep se Nov tak rainfall me percentage decrease kitna hai?",
                    options: ["55.14%", "56.14%", "57.14%", "58.14%"],
                    answer: "57.14%",
                    explanation: "Decrease = 210 - 90 = 120. Percentage decrease = 120/210 x 100 = 57.14%."
                },
                {
                    q: "Average monthly inflow approximately kitna hai?",
                    options: ["37.83 mcm", "38.33 mcm", "38.83 mcm", "39.33 mcm"],
                    answer: "38.83 mcm",
                    explanation: "Total inflow = 42+65+58+36+20+12 = 233 mcm. Average = 233/6 = 38.83 mcm."
                },
                {
                    q: "Average rainfall se kam rainfall kitne months me hua?",
                    options: ["2", "3", "4", "5"],
                    answer: "3",
                    explanation: "Average rainfall = 930/6 = 155 mm. Oct 150, Nov 90, Dec 60 average se kam hain."
                },
                {
                    q: "Agar Jan rainfall Dec se 25% zyada ho aur Dec jaisa inflow-rainfall ratio rahe, to Jan inflow kitna hoga?",
                    options: ["14 mcm", "15 mcm", "16 mcm", "17 mcm"],
                    answer: "15 mcm",
                    explanation: "Jan rainfall = 60 x 1.25 = 75 mm. Dec ratio = 12/60 = 0.2. Jan inflow = 75 x 0.2 = 15 mcm."
                },
                {
                    q: "Evaporation loss ka total volume kitna hai?",
                    options: ["17.64 mcm", "18.14 mcm", "18.64 mcm", "19.14 mcm"],
                    answer: "18.64 mcm",
                    explanation: "Total inflow = 233 mcm. Evaporation loss = 8% of 233 = 18.64 mcm."
                },
                {
                    q: "Jul-Sep rainfall aur Oct-Dec rainfall ka ratio kya hai?",
                    options: ["19:10", "20:9", "21:10", "22:9"],
                    answer: "21:10",
                    explanation: "Jul-Sep rainfall = 180+240+210 = 630. Oct-Dec = 150+90+60 = 300. Ratio = 21:10."
                },
                {
                    q: "Maximum usable inflow aur minimum usable inflow ka difference kitna hai?",
                    options: ["47.76 mcm", "48.26 mcm", "48.76 mcm", "49.26 mcm"],
                    answer: "48.76 mcm",
                    explanation: "Maximum usable = 92% of 65 = 59.80. Minimum usable = 92% of 12 = 11.04. Difference = 48.76 mcm."
                }
            ]
        },
        {
            topic: "Histogram and frequency distribution",
            chart: {
                type: "histogram",
                title: "Monthly Wage Histogram",
                subtitle: "Wage classes are in Rs thousand. Use class midpoints for average questions.",
                bins: [
                    { label: "20-30", value: 60 },
                    { label: "30-40", value: 110 },
                    { label: "40-50", value: 150 },
                    { label: "50-60", value: 90 },
                    { label: "60-70", value: 60 },
                    { label: "70-80", value: 30 }
                ]
            },
            context: "Histogram DI: Monthly wage distribution for 500 workers in Rs thousand is 20-30:60, 30-40:110, 40-50:150, 50-60:90, 60-70:60, 70-80:30. Use class midpoints for average questions.",
            questions: [
                {
                    q: "Estimated average wage kitna hai?",
                    options: ["Rs 45.8 thousand", "Rs 46.0 thousand", "Rs 46.4 thousand", "Rs 46.8 thousand"],
                    answer: "Rs 46.4 thousand",
                    explanation: "Total weighted wage = 23200 thousand. Average = 23200/500 = 46.4 thousand."
                },
                {
                    q: "Median class kaunsi hai?",
                    options: ["30-40", "40-50", "50-60", "60-70"],
                    answer: "40-50",
                    explanation: "N/2 = 250. Cumulative frequencies: 60, 170, 320. 250th observation 40-50 class me hai."
                },
                {
                    q: "Modal class kaunsi hai?",
                    options: ["30-40", "40-50", "50-60", "60-70"],
                    answer: "40-50",
                    explanation: "Highest frequency 150 hai, jo 40-50 class me hai."
                },
                {
                    q: "At least Rs 50 thousand wage kamane wale workers ka percentage kitna hai?",
                    options: ["34%", "35%", "36%", "37%"],
                    answer: "36%",
                    explanation: "At least 50 thousand workers = 90+60+30 = 180. Percentage = 180/500 x 100 = 36%."
                },
                {
                    q: "60-80 wage classes ka estimated total wage kitna hai?",
                    options: ["Rs 59.5 lakh", "Rs 60.5 lakh", "Rs 61.5 lakh", "Rs 62.5 lakh"],
                    answer: "Rs 61.5 lakh",
                    explanation: "60-70 wage = 65 x 60 = 3900 thousand. 70-80 wage = 75 x 30 = 2250 thousand. Total = 6150 thousand = Rs 61.5 lakh."
                },
                {
                    q: "Below Rs 40 thousand workers aur Rs 50-70 thousand workers ka ratio kya hai?",
                    options: ["15:17", "16:15", "17:15", "18:17"],
                    answer: "17:15",
                    explanation: "Below 40 = 60+110 = 170. 50-70 = 90+60 = 150. Ratio = 17:15."
                },
                {
                    q: "70-80 class ko midpoint par 10% bonus mile, to total bonus kitna hoga?",
                    options: ["Rs 2.05 lakh", "Rs 2.15 lakh", "Rs 2.25 lakh", "Rs 2.35 lakh"],
                    answer: "Rs 2.25 lakh",
                    explanation: "Midpoint = Rs 75 thousand. Bonus per worker = Rs 7.5 thousand. For 30 workers, total = Rs 225 thousand = Rs 2.25 lakh."
                },
                {
                    q: "Agar 20 workers 40-50 class se 50-60 class me move kar jayein, estimated mean kitna ho jayega?",
                    options: ["Rs 46.6 thousand", "Rs 46.8 thousand", "Rs 47.0 thousand", "Rs 47.2 thousand"],
                    answer: "Rs 46.8 thousand",
                    explanation: "Each moved worker raises midpoint contribution by 10 thousand. Total increase = 200 thousand. Mean increase = 200/500 = 0.4 thousand. New mean = 46.8 thousand."
                },
                {
                    q: "Q3 observation kis class me aayegi?",
                    options: ["40-50", "50-60", "60-70", "70-80"],
                    answer: "50-60",
                    explanation: "Q3 position = 3N/4 = 375. Cumulative till 40-50 is 320, till 50-60 is 410. So Q3 class = 50-60."
                },
                {
                    q: "Highest aur lowest class frequency ka difference kitna hai?",
                    options: ["110", "120", "130", "140"],
                    answer: "120",
                    explanation: "Highest frequency = 150, lowest = 30. Difference = 120."
                }
            ]
        },
        {
            topic: "Radar index chart",
            chart: {
                type: "radar",
                title: "District Development Radar Chart",
                subtitle: "Scores are out of 100. Composite = 40% Literacy + 35% Health + 25% Infra.",
                axes: ["Literacy", "Health", "Infra"],
                items: [
                    { label: "A", values: [78, 64, 72] },
                    { label: "B", values: [70, 80, 68] },
                    { label: "C", values: [82, 72, 60] },
                    { label: "D", values: [65, 75, 85] },
                    { label: "E", values: [88, 66, 70] }
                ]
            },
            context: "Radar chart DI: Five districts have Literacy/Health/Infra scores out of 100. A 78/64/72, B 70/80/68, C 82/72/60, D 65/75/85, E 88/66/70. Composite index = 40% Literacy + 35% Health + 25% Infra.",
            questions: [
                {
                    q: "Highest composite index kis district ka hai?",
                    options: ["B", "C", "D", "E"],
                    answer: "E",
                    explanation: "Composite scores: A 71.6, B 73.0, C 73.0, D 73.5, E 75.8. Highest E."
                },
                {
                    q: "Lowest composite index kis district ka hai?",
                    options: ["A", "B", "C", "D"],
                    answer: "A",
                    explanation: "A ka composite = 78x0.40 + 64x0.35 + 72x0.25 = 71.6, jo lowest hai."
                },
                {
                    q: "Kaun se do districts ka composite index same hai?",
                    options: ["A and B", "B and C", "C and D", "D and E"],
                    answer: "B and C",
                    explanation: "B = 28 + 28 + 17 = 73. C = 32.8 + 25.2 + 15 = 73."
                },
                {
                    q: "Agar D ke liye Health weight 45% aur Infra weight 15% ho jaye, Literacy 40% same rahe, to new composite kya hoga?",
                    options: ["72.0", "72.5", "73.0", "73.5"],
                    answer: "72.5",
                    explanation: "D new composite = 65x0.40 + 75x0.45 + 85x0.15 = 26 + 33.75 + 12.75 = 72.5."
                },
                {
                    q: "Average literacy score kitna hai?",
                    options: ["75.6", "76.1", "76.6", "77.1"],
                    answer: "76.6",
                    explanation: "Average literacy = (78+70+82+65+88)/5 = 383/5 = 76.6."
                },
                {
                    q: "Indicator spread sabse zyada kin districts me equal hai?",
                    options: ["A and B", "B and D", "C and E", "D and E"],
                    answer: "C and E",
                    explanation: "Spread = max-min. C spread = 82-60 = 22, E spread = 88-66 = 22. Ye highest equal spread hai."
                },
                {
                    q: "District E ka composite, District A se kitna zyada hai?",
                    options: ["3.8", "4.0", "4.2", "4.4"],
                    answer: "4.2",
                    explanation: "E composite = 75.8, A composite = 71.6. Difference = 4.2."
                },
                {
                    q: "Health component ka average weighted contribution kitna hai?",
                    options: ["24.49", "24.74", "24.99", "25.24"],
                    answer: "24.99",
                    explanation: "Average Health score = (64+80+72+75+66)/5 = 71.4. Weighted contribution = 71.4 x 0.35 = 24.99."
                },
                {
                    q: "Agar C ka Infra score 20% badh jaye, to C ka new composite index kya hoga?",
                    options: ["75.0", "75.5", "76.0", "76.5"],
                    answer: "76.0",
                    explanation: "C Infra new = 60 x 1.20 = 72. New composite = 82x0.40 + 72x0.35 + 72x0.25 = 76.0."
                },
                {
                    q: "Literacy contribution me E aur A ka ratio kya hai?",
                    options: ["39:44", "42:39", "44:39", "46:41"],
                    answer: "44:39",
                    explanation: "E literacy contribution = 88x0.40 = 35.2. A = 78x0.40 = 31.2. Ratio = 35.2:31.2 = 44:39."
                }
            ]
        },
        {
            topic: "Waterfall and funnel chart",
            chart: {
                type: "waterfall",
                title: "Wheat Stock Waterfall Chart",
                subtitle: "Milling loss is 6% before transport loss. Transport loss is 2% of post-milling stock. Buffer reserve is 7500 tonnes.",
                items: [
                    { label: "Opening", value: 12000, display: "12000" },
                    { label: "Procurement", value: 18500, display: "+18500" },
                    { label: "Imports", value: 4200, display: "+4200" },
                    { label: "Milling loss", value: -2082, type: "loss", display: "-2082" },
                    { label: "Transport loss", value: -652.36, type: "loss", display: "-652.36" },
                    { label: "Buffer", value: -7500, type: "loss", display: "-7500" },
                    { label: "Open market", value: 24465.64, display: "24465.64" }
                ]
            },
            context: "Waterfall DI: Wheat stock movement in tonnes. Opening stock 12000, procurement 18500, imports 4200. Milling loss is 6% of total available before loss. Transport loss is 2% of post-milling stock. Buffer reserve is 7500 tonnes. Remaining stock is sold in open market at Rs 24200 per tonne. Procurement cost is Rs 21400 per procured tonne.",
            questions: [
                {
                    q: "Milling loss se pehle total available stock kitna hai?",
                    options: ["34500 tonnes", "34600 tonnes", "34700 tonnes", "34800 tonnes"],
                    answer: "34700 tonnes",
                    explanation: "Available stock = 12000 + 18500 + 4200 = 34700 tonnes."
                },
                {
                    q: "Milling loss kitna hoga?",
                    options: ["2062 tonnes", "2072 tonnes", "2082 tonnes", "2092 tonnes"],
                    answer: "2082 tonnes",
                    explanation: "Milling loss = 6% of 34700 = 2082 tonnes."
                },
                {
                    q: "Transport loss ke baad stock approximately kitna bachega?",
                    options: ["31865.64 tonnes", "31965.64 tonnes", "32065.64 tonnes", "32165.64 tonnes"],
                    answer: "31965.64 tonnes",
                    explanation: "Post-milling stock = 34700 - 2082 = 32618. Transport loss = 2% of 32618 = 652.36. Remaining = 31965.64 tonnes."
                },
                {
                    q: "Buffer reserve ke baad open market sale stock kitna hai?",
                    options: ["24265.64 tonnes", "24365.64 tonnes", "24465.64 tonnes", "24565.64 tonnes"],
                    answer: "24465.64 tonnes",
                    explanation: "Open market stock = 31965.64 - 7500 = 24465.64 tonnes."
                },
                {
                    q: "Total physical loss kitna hai?",
                    options: ["2714.36 tonnes", "2724.36 tonnes", "2734.36 tonnes", "2744.36 tonnes"],
                    answer: "2734.36 tonnes",
                    explanation: "Total loss = milling loss 2082 + transport loss 652.36 = 2734.36 tonnes."
                },
                {
                    q: "Total physical loss, initial available stock ka approximately kitna percent hai?",
                    options: ["7.58%", "7.68%", "7.78%", "7.88%"],
                    answer: "7.88%",
                    explanation: "Loss percentage = 2734.36/34700 x 100 = 7.88%."
                },
                {
                    q: "Open market sale se approximate revenue kitna hoga?",
                    options: ["Rs 58.21 crore", "Rs 58.71 crore", "Rs 59.21 crore", "Rs 59.71 crore"],
                    answer: "Rs 59.21 crore",
                    explanation: "Revenue = 24465.64 x 24200 = Rs 592068488, approximately Rs 59.21 crore."
                },
                {
                    q: "Procurement cost kitni hogi?",
                    options: ["Rs 38.59 crore", "Rs 39.09 crore", "Rs 39.59 crore", "Rs 40.09 crore"],
                    answer: "Rs 39.59 crore",
                    explanation: "Procurement cost = 18500 x 21400 = Rs 395900000 = Rs 39.59 crore."
                },
                {
                    q: "Buffer reserve, post-loss stock ka approximately kitna percent hai?",
                    options: ["22.96%", "23.21%", "23.46%", "23.71%"],
                    answer: "23.46%",
                    explanation: "Buffer share = 7500/31965.64 x 100 = 23.46%."
                },
                {
                    q: "Agar transport loss 2% se 1.5% ho jaye, to extra stock saved kitna hoga?",
                    options: ["153.09 tonnes", "158.09 tonnes", "163.09 tonnes", "168.09 tonnes"],
                    answer: "163.09 tonnes",
                    explanation: "Reduction = 0.5% of post-milling stock 32618 = 163.09 tonnes."
                }
            ]
        }
    ];

    function buildQuestions() {
        return sets.flatMap(function (set, setIndex) {
            return set.questions.map(function (item, index) {
                const correctAnswer = item.options.indexOf(item.answer);
                const number = (setIndex * 10) + index + 1;
                if (correctAnswer < 0) throw new Error("Missing answer option in " + quizId + " question " + number);

                return {
                    id: quizId + "-q" + String(number).padStart(2, "0"),
                    subject: "Mathematics",
                    topic: set.topic,
                    difficulty: "hard",
                    question: item.q,
                    chart: set.chart,
                    options: item.options,
                    correctAnswer,
                    explanation: item.explanation
                };
            });
        });
    }

    window.GJU_QUIZ_BANK.push({
        id: quizId,
        subject: "Mathematics",
        title: "DI Tough Mixed Set 2",
        description: "50 advanced chart-based Data Interpretation questions covering UPSC and CPO level reasoning.",
        durationMinutes: 45,
        totalQuestions: 50,
        marksPerQuestion: 1,
        negativeMarks: 0.25,
        difficulty: "Hard",
        tags: ["SSC CPO", "UPSC", "Data Interpretation", "Histogram", "Radar Chart", "Waterfall Chart", "Line Graph"],
        questions: buildQuestions()
    });
}());
