(function () {
    "use strict";

    window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];

    const quizId = "di-tough-mixed-set-1";
    const sets = [
        {
            topic: "Pie chart and utilisation table",
            chart: {
                type: "pie",
                title: "Budget Allocation Pie Chart",
                subtitle: "Total allocation Rs 240 crore. Utilisation: Health 92%, Education 88%, Roads 96%, Irrigation 84%, Housing 90%.",
                data: [
                    { label: "Health", value: 22.5, display: "22.5%" },
                    { label: "Education", value: 27.5, display: "27.5%" },
                    { label: "Roads", value: 18.75, display: "18.75%" },
                    { label: "Irrigation", value: 16.25, display: "16.25%" },
                    { label: "Housing", value: 15, display: "15%" }
                ]
            },
            context: "Pie chart DI: Total allocation is Rs 240 crore. Health 22.5%, Education 27.5%, Roads 18.75%, Irrigation 16.25%, Housing 15%. Utilisation table: Health 92%, Education 88%, Roads 96%, Irrigation 84%, Housing 90%.",
            questions: [
                {
                    q: "Education scheme me actual utilised amount kitna hai?",
                    options: ["Rs 56.08 crore", "Rs 58.08 crore", "Rs 59.40 crore", "Rs 60.12 crore"],
                    answer: "Rs 58.08 crore",
                    explanation: "Education allocation = 27.5% of 240 = 66 crore. Utilised = 88% of 66 = 58.08 crore."
                },
                {
                    q: "Sabhi schemes ka total unutilised amount kitna hai?",
                    options: ["Rs 21.88 crore", "Rs 22.68 crore", "Rs 23.88 crore", "Rs 24.48 crore"],
                    answer: "Rs 23.88 crore",
                    explanation: "Total utilised = 49.68 + 58.08 + 43.20 + 32.76 + 32.40 = 216.12 crore. Unutilised = 240 - 216.12 = 23.88 crore."
                },
                {
                    q: "Roads ka utilised amount, Health ke allocation ka kitna percent hai?",
                    options: ["78%", "80%", "82%", "84%"],
                    answer: "80%",
                    explanation: "Roads utilised = 18.75% of 240 x 96% = 43.20 crore. Health allocation = 54 crore. Required = 43.20/54 x 100 = 80%."
                },
                {
                    q: "Health aur Education ka combined unutilised amount, Irrigation aur Housing ke combined unutilised amount se kitna adhik hai?",
                    options: ["Rs 1.80 crore", "Rs 2.10 crore", "Rs 2.40 crore", "Rs 2.70 crore"],
                    answer: "Rs 2.40 crore",
                    explanation: "Health+Education unutilised = 4.32 + 7.92 = 12.24 crore. Irrigation+Housing = 6.24 + 3.60 = 9.84 crore. Difference = 2.40 crore."
                },
                {
                    q: "Agar Irrigation utilisation 84% se 92% ho jaye, to extra utilised amount kitna hoga?",
                    options: ["Rs 2.84 crore", "Rs 3.12 crore", "Rs 3.36 crore", "Rs 3.60 crore"],
                    answer: "Rs 3.12 crore",
                    explanation: "Irrigation allocation = 16.25% of 240 = 39 crore. Extra utilisation = 8% of 39 = 3.12 crore."
                },
                {
                    q: "Health aur Education ke actual utilised amount ka ratio kya hai?",
                    options: ["207:242", "242:207", "69:82", "23:28"],
                    answer: "207:242",
                    explanation: "Health utilised = 49.68, Education utilised = 58.08. Ratio 49.68:58.08 = 4968:5808 = 207:242."
                },
                {
                    q: "Kis scheme me unutilised amount sabse zyada hai?",
                    options: ["Health", "Education", "Irrigation", "Housing"],
                    answer: "Education",
                    explanation: "Unutilised amounts: Health 4.32, Education 7.92, Roads 1.80, Irrigation 6.24, Housing 3.60. Maximum Education me hai."
                },
                {
                    q: "Overall weighted utilisation rate approximately kitna hai?",
                    options: ["89.55%", "90.05%", "90.55%", "91.05%"],
                    answer: "90.05%",
                    explanation: "Overall utilisation = 216.12/240 x 100 = 90.05%."
                },
                {
                    q: "Roads ka unused amount Housing me shift karke fully use kar diya jaye, to Housing utilisation percentage kya ho jayega?",
                    options: ["92.5%", "94%", "95%", "96.5%"],
                    answer: "95%",
                    explanation: "Housing used = 32.40 crore. Roads unused = 1.80 crore. New Housing used = 34.20 crore. Housing allocation = 36 crore. Required = 95%."
                },
                {
                    q: "Pie chart me Irrigation sector ka central angle kitna hoga?",
                    options: ["56.5 degree", "58.5 degree", "60.5 degree", "62.5 degree"],
                    answer: "58.5 degree",
                    explanation: "Central angle = 16.25% of 360 = 58.5 degree."
                }
            ]
        },
        {
            topic: "Stacked bar chart",
            chart: {
                type: "stacked-bar",
                title: "Metro Riders Stacked Bar Chart",
                subtitle: "Values are in thousands by rider category.",
                categories: [
                    { label: "Line A", segments: [{ label: "Adult", value: 180 }, { label: "Student", value: 42 }, { label: "Senior", value: 18 }] },
                    { label: "Line B", segments: [{ label: "Adult", value: 220 }, { label: "Student", value: 55 }, { label: "Senior", value: 25 }] },
                    { label: "Line C", segments: [{ label: "Adult", value: 160 }, { label: "Student", value: 40 }, { label: "Senior", value: 20 }] },
                    { label: "Line D", segments: [{ label: "Adult", value: 240 }, { label: "Student", value: 36 }, { label: "Senior", value: 24 }] },
                    { label: "Line E", segments: [{ label: "Adult", value: 200 }, { label: "Student", value: 60 }, { label: "Senior", value: 40 }] }
                ]
            },
            context: "Stacked bar DI: Metro lines A-E riders in thousands by category are A Adult 180, Student 42, Senior 18; B 220, 55, 25; C 160, 40, 20; D 240, 36, 24; E 200, 60, 40.",
            questions: [
                {
                    q: "Sabhi lines ke total riders kitne hain?",
                    options: ["1320 thousand", "1340 thousand", "1360 thousand", "1380 thousand"],
                    answer: "1360 thousand",
                    explanation: "Line totals: A 240, B 300, C 220, D 300, E 300. Grand total = 1360 thousand."
                },
                {
                    q: "Senior riders ka share sabse zyada kis line me hai?",
                    options: ["Line B", "Line C", "Line D", "Line E"],
                    answer: "Line E",
                    explanation: "Senior share: A 7.5%, B 8.33%, C 9.09%, D 8%, E 13.33%. Maximum Line E."
                },
                {
                    q: "Line B aur Line D ke adult riders, total adult riders ka kitna percent hain?",
                    options: ["44%", "45%", "46%", "48%"],
                    answer: "46%",
                    explanation: "Total adult riders = 1000 thousand. B+D adult = 220+240 = 460 thousand. Required = 46%."
                },
                {
                    q: "Total student riders aur total senior riders ka ratio kya hai?",
                    options: ["233:127", "127:233", "31:17", "17:31"],
                    answer: "233:127",
                    explanation: "Students = 42+55+40+36+60 = 233. Seniors = 18+25+20+24+40 = 127."
                },
                {
                    q: "Average riders per metro line kitne hain?",
                    options: ["268 thousand", "270 thousand", "272 thousand", "274 thousand"],
                    answer: "272 thousand",
                    explanation: "Grand total = 1360 thousand. Average = 1360/5 = 272 thousand."
                },
                {
                    q: "Highest aur lowest line total ka difference kitna hai?",
                    options: ["60 thousand", "70 thousand", "80 thousand", "90 thousand"],
                    answer: "80 thousand",
                    explanation: "Highest total = 300 thousand. Lowest total = 220 thousand. Difference = 80 thousand."
                },
                {
                    q: "Agar Line C ke student riders 25% badh jayein, to Line C ka new total kitna hoga?",
                    options: ["225 thousand", "230 thousand", "235 thousand", "240 thousand"],
                    answer: "230 thousand",
                    explanation: "Line C students = 40 thousand. 25% increase = 10 thousand. New total = 220 + 10 = 230 thousand."
                },
                {
                    q: "Lines B, D aur E milkar grand total ka approximately kitna percent hain?",
                    options: ["64.71%", "65.44%", "66.18%", "67.06%"],
                    answer: "66.18%",
                    explanation: "B+D+E = 300+300+300 = 900 thousand. Required = 900/1360 x 100 = 66.18%."
                },
                {
                    q: "Line E me non-adult riders, adult riders ka kitna percent hain?",
                    options: ["40%", "45%", "50%", "55%"],
                    answer: "50%",
                    explanation: "Line E non-adult = 60+40 = 100 thousand. Adult = 200 thousand. Required = 50%."
                },
                {
                    q: "Agar adult fare Rs 40 hai aur senior concession Rs 10 per rider hai, to total senior concession value kitni hogi?",
                    options: ["Rs 11.7 lakh", "Rs 12.2 lakh", "Rs 12.7 lakh", "Rs 13.2 lakh"],
                    answer: "Rs 12.7 lakh",
                    explanation: "Senior riders = 127 thousand. Concession = 127000 x 10 = Rs 12.7 lakh."
                }
            ]
        },
        {
            topic: "Line graph",
            chart: {
                type: "line",
                title: "Export and Import Line Graph",
                subtitle: "Values are in Rs crore.",
                categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                series: [
                    { label: "Export", values: [180, 210, 195, 240, 270, 255] },
                    { label: "Import", values: [150, 165, 180, 200, 225, 240] }
                ]
            },
            context: "Line graph DI: Export/Import values in Rs crore are Jan 180/150, Feb 210/165, Mar 195/180, Apr 240/200, May 270/225, Jun 255/240.",
            questions: [
                {
                    q: "Six months ka total trade surplus kitna hai?",
                    options: ["Rs 175 crore", "Rs 180 crore", "Rs 190 crore", "Rs 200 crore"],
                    answer: "Rs 190 crore",
                    explanation: "Monthly surplus = 30, 45, 15, 40, 45, 15. Total = 190 crore."
                },
                {
                    q: "Export-import ratio sabse zyada kis month me hai?",
                    options: ["Jan", "Feb", "Apr", "May"],
                    answer: "Feb",
                    explanation: "Feb ratio = 210/165 = 1.2727, jo baaki months se zyada hai."
                },
                {
                    q: "Apr-Jun period ka average export kitna hai?",
                    options: ["Rs 250 crore", "Rs 252.5 crore", "Rs 255 crore", "Rs 257.5 crore"],
                    answer: "Rs 255 crore",
                    explanation: "Average export = (240+270+255)/3 = 255 crore."
                },
                {
                    q: "Jan se Jun tak import me percentage increase kitna hai?",
                    options: ["55%", "57.5%", "60%", "62.5%"],
                    answer: "60%",
                    explanation: "Increase = 240 - 150 = 90. Percentage increase = 90/150 x 100 = 60%."
                },
                {
                    q: "Feb se May tak export me percentage increase approximately kitna hai?",
                    options: ["26.57%", "27.57%", "28.57%", "29.57%"],
                    answer: "28.57%",
                    explanation: "Increase = 270 - 210 = 60. Required = 60/210 x 100 = 28.57%."
                },
                {
                    q: "Agar July export Jun se 12% zyada aur import Jun se 10% kam ho, to July surplus kitna hoga?",
                    options: ["Rs 67.6 crore", "Rs 68.6 crore", "Rs 69.6 crore", "Rs 70.6 crore"],
                    answer: "Rs 69.6 crore",
                    explanation: "July export = 255 x 1.12 = 285.6. July import = 240 x 0.90 = 216. Surplus = 69.6 crore."
                },
                {
                    q: "Average monthly surplus se kam surplus kitne months me hai?",
                    options: ["2", "3", "4", "5"],
                    answer: "3",
                    explanation: "Average surplus = 190/6 = 31.67 crore. Jan 30, Mar 15, Jun 15 isse kam hain."
                },
                {
                    q: "Jan-Mar exports aur Apr-Jun exports ka ratio kya hai?",
                    options: ["13:17", "17:13", "39:52", "52:39"],
                    answer: "13:17",
                    explanation: "Jan-Mar exports = 585. Apr-Jun exports = 765. Ratio = 585:765 = 13:17."
                },
                {
                    q: "Agar total exports ka 5% quality rejection me chala jaye, accepted export value kitni hogi?",
                    options: ["Rs 1272.5 crore", "Rs 1282.5 crore", "Rs 1292.5 crore", "Rs 1302.5 crore"],
                    answer: "Rs 1282.5 crore",
                    explanation: "Total exports = 1350 crore. Accepted = 95% of 1350 = 1282.5 crore."
                },
                {
                    q: "May import, total imports ka approximately kitna percent hai?",
                    options: ["18.40%", "18.90%", "19.40%", "19.90%"],
                    answer: "19.40%",
                    explanation: "Total imports = 1160 crore. May import share = 225/1160 x 100 = 19.40%."
                }
            ]
        },
        {
            topic: "Exam data table",
            chart: {
                type: "table",
                title: "District Exam Data Table",
                subtitle: "Applicants, appeared, qualified and female qualified candidates.",
                columns: ["District", "Applicants", "Appeared", "Qualified", "Female Qualified"],
                rows: [
                    ["A", "12000", "10200", "1530", "612"],
                    ["B", "15000", "12600", "1890", "756"],
                    ["C", "10000", "8400", "1176", "588"],
                    ["D", "18000", "14400", "2160", "864"],
                    ["E", "14000", "11900", "1785", "714"]
                ]
            },
            context: "Table DI: District data shows Applicants/Appeared/Qualified/Female qualified. A 12000/10200/1530/612; B 15000/12600/1890/756; C 10000/8400/1176/588; D 18000/14400/2160/864; E 14000/11900/1785/714.",
            questions: [
                {
                    q: "Sabhi districts me total absent candidates kitne hain?",
                    options: ["11200", "11500", "11800", "12100"],
                    answer: "11500",
                    explanation: "Absent = applicants - appeared. A 1800, B 2400, C 1600, D 3600, E 2100. Total = 11500."
                },
                {
                    q: "District C ka qualification percentage appeared candidates par kitna hai?",
                    options: ["13%", "14%", "15%", "16%"],
                    answer: "14%",
                    explanation: "C qualification rate = 1176/8400 x 100 = 14%."
                },
                {
                    q: "Sabhi districts me total male qualified candidates kitne hain?",
                    options: ["4957", "5007", "5057", "5107"],
                    answer: "5007",
                    explanation: "Male qualified = total qualified - female qualified. Sum = 918+1134+588+1296+1071 = 5007."
                },
                {
                    q: "District C ki female qualified candidates, total female qualified ka approximately kitna percent hain?",
                    options: ["15.64%", "16.14%", "16.64%", "17.14%"],
                    answer: "16.64%",
                    explanation: "Total female qualified = 3534. C female qualified = 588. Share = 588/3534 x 100 = 16.64%."
                },
                {
                    q: "Agar District D me appeared candidates 10% badh jayein aur same qualification rate rahe, to extra qualified kitne honge?",
                    options: ["196", "206", "216", "226"],
                    answer: "216",
                    explanation: "D qualification rate = 2160/14400 = 15%. Extra appeared = 1440. Extra qualified = 15% of 1440 = 216."
                },
                {
                    q: "Overall selection rate appeared candidates par approximately kitna hai?",
                    options: ["14.35%", "14.65%", "14.85%", "15.05%"],
                    answer: "14.85%",
                    explanation: "Total appeared = 57500, total qualified = 8541. Rate = 8541/57500 x 100 = 14.85%."
                },
                {
                    q: "Absent rate sabse zyada kis district me hai?",
                    options: ["B", "C", "D", "E"],
                    answer: "D",
                    explanation: "Absent rate: A 15%, B 16%, C 16%, D 20%, E 15%. Maximum District D."
                },
                {
                    q: "District B aur District D ke applicants ka ratio kya hai?",
                    options: ["4:5", "5:6", "6:7", "7:8"],
                    answer: "5:6",
                    explanation: "B:D applicants = 15000:18000 = 5:6."
                },
                {
                    q: "District B ke male qualified aur District A ke female qualified ka difference kitna hai?",
                    options: ["502", "512", "522", "532"],
                    answer: "522",
                    explanation: "B male qualified = 1890 - 756 = 1134. A female qualified = 612. Difference = 522."
                },
                {
                    q: "Agar District C ke absent candidates bhi appear karte aur same 14% qualify karte, to C ka new total qualified kitna hota?",
                    options: ["1380", "1400", "1420", "1440"],
                    answer: "1400",
                    explanation: "C absent = 1600. Extra qualified = 14% of 1600 = 224. New qualified = 1176 + 224 = 1400."
                }
            ]
        },
        {
            topic: "Bar chart with percentage line",
            chart: {
                type: "bar-line",
                title: "Production Bar Chart With Defect Percentage Line",
                subtitle: "Export share: P 40%, Q 35%, R 45%, S 30%, T 50%.",
                valueLabel: "Production units",
                percentLabel: "Defect %",
                items: [
                    { label: "P", value: 6400, percent: 6.25 },
                    { label: "Q", value: 7200, percent: 5 },
                    { label: "R", value: 5600, percent: 7.5 },
                    { label: "S", value: 8000, percent: 4 },
                    { label: "T", value: 6800, percent: 6 }
                ]
            },
            context: "Mixed chart DI: Production units and defect percentage for firms are P 6400 at 6.25%, Q 7200 at 5%, R 5600 at 7.5%, S 8000 at 4%, T 6800 at 6%. Export share: P 40%, Q 35%, R 45%, S 30%, T 50%.",
            questions: [
                {
                    q: "Total defective units kitne hain?",
                    options: ["1888", "1898", "1908", "1918"],
                    answer: "1908",
                    explanation: "Defective units = 400 + 360 + 420 + 320 + 408 = 1908."
                },
                {
                    q: "Good units sabse zyada kis firm me hain?",
                    options: ["Q", "R", "S", "T"],
                    answer: "S",
                    explanation: "Good units: P 6000, Q 6840, R 5180, S 7680, T 6392. Maximum S."
                },
                {
                    q: "Firm T ke export units kitne hain?",
                    options: ["3200", "3300", "3400", "3500"],
                    answer: "3400",
                    explanation: "T export units = 50% of 6800 = 3400."
                },
                {
                    q: "Firm P ke export units aur domestic units ka ratio kya hai?",
                    options: ["2:3", "3:2", "4:5", "5:4"],
                    answer: "2:3",
                    explanation: "P export = 40% of 6400 = 2560. Domestic = 3840. Ratio = 2560:3840 = 2:3."
                },
                {
                    q: "Overall weighted defect rate approximately kitna hai?",
                    options: ["5.41%", "5.51%", "5.61%", "5.71%"],
                    answer: "5.61%",
                    explanation: "Total production = 34000, defective = 1908. Rate = 1908/34000 x 100 = 5.61%."
                },
                {
                    q: "Agar Firm R ka defect rate 7.5% se 5% ho jaye, to additional good units kitne honge?",
                    options: ["120", "130", "140", "150"],
                    answer: "140",
                    explanation: "Defect reduction = 2.5% of 5600 = 140 units."
                },
                {
                    q: "Firm S ka production total production ka approximately kitna percent hai?",
                    options: ["22.53%", "23.03%", "23.53%", "24.03%"],
                    answer: "23.53%",
                    explanation: "S share = 8000/34000 x 100 = 23.53%."
                },
                {
                    q: "Firm Q ke good units, Firm P ke good units se kitne adhik hain?",
                    options: ["820", "840", "860", "880"],
                    answer: "840",
                    explanation: "Q good = 7200 - 360 = 6840. P good = 6000. Difference = 840."
                },
                {
                    q: "Firm P aur T ke defective units ka ratio kya hai?",
                    options: ["49:51", "50:51", "51:50", "51:52"],
                    answer: "50:51",
                    explanation: "P defective = 400, T defective = 408. Ratio = 400:408 = 50:51."
                },
                {
                    q: "Agar exported units par Rs 900 per unit revenue mile, to total export revenue kitna hoga?",
                    options: ["Rs 118.6 lakh", "Rs 119.6 lakh", "Rs 120.6 lakh", "Rs 121.6 lakh"],
                    answer: "Rs 120.6 lakh",
                    explanation: "Total export units = 2560+2520+2520+2400+3400 = 13400. Revenue = 13400 x 900 = Rs 120.6 lakh."
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
        title: "DI Tough Mixed Set 1",
        description: "50 tough chart-based Data Interpretation questions for CPO and UPSC level practice.",
        durationMinutes: 45,
        totalQuestions: 50,
        marksPerQuestion: 1,
        negativeMarks: 0.25,
        difficulty: "Hard",
        tags: ["SSC CPO", "UPSC", "Data Interpretation", "Pie Chart", "Bar Chart", "Line Graph", "Table DI"],
        questions: buildQuestions()
    });
}());
