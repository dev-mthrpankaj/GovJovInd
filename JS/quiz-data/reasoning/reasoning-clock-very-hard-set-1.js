(function () {
    "use strict";

    window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];

    const quizId = "reasoning-clock-very-hard-set-1";

    const questions = [
        {
            id: `${quizId}-q01`,
            topic: "Clock",
            difficulty: "very-hard",
            question: "घड़ी में 1:47 बजे घंटे और मिनट की सुइयों के बीच छोटा कोण कितना होगा?",
            options: ["126°", "131.5°", "137°", "142.5°"],
            correctAnswer: 1,
            explanation: "घंटे की सुई का कोण 30×1 + 0.5×47 = 53.5° और मिनट की सुई का कोण 6×47 = 282° होता है। दोनों का छोटा अंतर 131.5° है।"
        },
        {
            id: `${quizId}-q02`,
            topic: "Clock",
            difficulty: "very-hard",
            question: "घड़ी में 2:38 बजे घंटे और मिनट की सुइयों के बीच छोटा कोण कितना होगा?",
            options: ["143.5°", "149°", "154.5°", "160°"],
            correctAnswer: 1,
            explanation: "घंटे की सुई का कोण 30×2 + 0.5×38 = 79.0° और मिनट की सुई का कोण 6×38 = 228° होता है। दोनों का छोटा अंतर 149° है।"
        },
        {
            id: `${quizId}-q03`,
            topic: "Clock",
            difficulty: "very-hard",
            question: "घड़ी में 3:52 बजे घंटे और मिनट की सुइयों के बीच छोटा कोण कितना होगा?",
            options: ["169.5°", "158.5°", "164°", "175°"],
            correctAnswer: 2,
            explanation: "घंटे की सुई का कोण 30×3 + 0.5×52 = 116.0° और मिनट की सुई का कोण 6×52 = 312° होता है। दोनों का छोटा अंतर 164° है।"
        },
        {
            id: `${quizId}-q04`,
            topic: "Clock",
            difficulty: "very-hard",
            question: "घड़ी में 4:41 बजे घंटे और मिनट की सुइयों के बीच छोटा कोण कितना होगा?",
            options: ["100°", "111°", "105.5°", "116.5°"],
            correctAnswer: 2,
            explanation: "घंटे की सुई का कोण 30×4 + 0.5×41 = 140.5° और मिनट की सुई का कोण 6×41 = 246° होता है। दोनों का छोटा अंतर 105.5° है।"
        },
        {
            id: `${quizId}-q05`,
            topic: "Clock",
            difficulty: "very-hard",
            question: "घड़ी में 5:17 बजे घंटे और मिनट की सुइयों के बीच छोटा कोण कितना होगा?",
            options: ["62°", "56.5°", "51°", "67.5°"],
            correctAnswer: 1,
            explanation: "घंटे की सुई का कोण 30×5 + 0.5×17 = 158.5° और मिनट की सुई का कोण 6×17 = 102° होता है। दोनों का छोटा अंतर 56.5° है।"
        },
        {
            id: `${quizId}-q06`,
            topic: "Clock",
            difficulty: "very-hard",
            question: "घड़ी में 6:44 बजे घंटे और मिनट की सुइयों के बीच छोटा कोण कितना होगा?",
            options: ["73°", "62°", "56.5°", "67.5°"],
            correctAnswer: 1,
            explanation: "घंटे की सुई का कोण 30×6 + 0.5×44 = 202.0° और मिनट की सुई का कोण 6×44 = 264° होता है। दोनों का छोटा अंतर 62° है।"
        },
        {
            id: `${quizId}-q07`,
            topic: "Clock",
            difficulty: "very-hard",
            question: "घड़ी में 7:29 बजे घंटे और मिनट की सुइयों के बीच छोटा कोण कितना होगा?",
            options: ["61.5°", "45°", "50.5°", "56°"],
            correctAnswer: 2,
            explanation: "घंटे की सुई का कोण 30×7 + 0.5×29 = 224.5° और मिनट की सुई का कोण 6×29 = 174° होता है। दोनों का छोटा अंतर 50.5° है।"
        },
        {
            id: `${quizId}-q08`,
            topic: "Clock",
            difficulty: "very-hard",
            question: "घड़ी में 8:53 बजे घंटे और मिनट की सुइयों के बीच छोटा कोण कितना होगा?",
            options: ["46°", "62.5°", "51.5°", "57°"],
            correctAnswer: 2,
            explanation: "घंटे की सुई का कोण 30×8 + 0.5×53 = 266.5° और मिनट की सुई का कोण 6×53 = 318° होता है। दोनों का छोटा अंतर 51.5° है।"
        },
        {
            id: `${quizId}-q09`,
            topic: "Clock",
            difficulty: "very-hard",
            question: "घड़ी में 9:16 बजे घंटे और मिनट की सुइयों के बीच छोटा कोण कितना होगा?",
            options: ["2°", "178°", "167°", "172.5°"],
            correctAnswer: 1,
            explanation: "घंटे की सुई का कोण 30×9 + 0.5×16 = 278.0° और मिनट की सुई का कोण 6×16 = 96° होता है। दोनों का छोटा अंतर 178° है।"
        },
        {
            id: `${quizId}-q10`,
            topic: "Clock",
            difficulty: "very-hard",
            question: "घड़ी में 10:49 बजे घंटे और मिनट की सुइयों के बीच छोटा कोण कितना होगा?",
            options: ["36°", "25°", "41.5°", "30.5°"],
            correctAnswer: 3,
            explanation: "घंटे की सुई का कोण 30×10 + 0.5×49 = 324.5° और मिनट की सुई का कोण 6×49 = 294° होता है। दोनों का छोटा अंतर 30.5° है।"
        },
        {
            id: `${quizId}-q11`,
            topic: "Clock",
            difficulty: "very-hard",
            question: "घड़ी में 11:23 बजे घंटे और मिनट की सुइयों के बीच छोटा कोण कितना होगा?",
            options: ["151°", "156.5°", "162°", "167.5°"],
            correctAnswer: 1,
            explanation: "घंटे की सुई का कोण 30×11 + 0.5×23 = 341.5° और मिनट की सुई का कोण 6×23 = 138° होता है। दोनों का छोटा अंतर 156.5° है।"
        },
        {
            id: `${quizId}-q12`,
            topic: "Clock",
            difficulty: "very-hard",
            question: "घड़ी में 12:37 बजे घंटे और मिनट की सुइयों के बीच छोटा कोण कितना होगा?",
            options: ["162°", "167.5°", "156.5°", "151°"],
            correctAnswer: 2,
            explanation: "घंटे की सुई का कोण 30×0 + 0.5×37 = 18.5° और मिनट की सुई का कोण 6×37 = 222° होता है। दोनों का छोटा अंतर 156.5° है।"
        },
        {
            id: `${quizId}-q13`,
            topic: "Clock",
            difficulty: "very-hard",
            question: "घड़ी में 1:58 बजे घंटे और मिनट की सुइयों के बीच छोटा कोण कितना होगा?",
            options: ["71°", "76.5°", "82°", "65.5°"],
            correctAnswer: 0,
            explanation: "घंटे की सुई का कोण 30×1 + 0.5×58 = 59.0° और मिनट की सुई का कोण 6×58 = 348° होता है। दोनों का छोटा अंतर 71° है।"
        },
        {
            id: `${quizId}-q14`,
            topic: "Clock",
            difficulty: "very-hard",
            question: "घड़ी में 2:11 बजे घंटे और मिनट की सुइयों के बीच छोटा कोण कितना होगा?",
            options: ["11.5°", "5°", "0.5°", "6°"],
            correctAnswer: 2,
            explanation: "घंटे की सुई का कोण 30×2 + 0.5×11 = 65.5° और मिनट की सुई का कोण 6×11 = 66° होता है। दोनों का छोटा अंतर 0.5° है।"
        },
        {
            id: `${quizId}-q15`,
            topic: "Clock",
            difficulty: "very-hard",
            question: "घड़ी में 3:26 बजे घंटे और मिनट की सुइयों के बीच छोटा कोण कितना होगा?",
            options: ["47.5°", "53°", "64°", "58.5°"],
            correctAnswer: 1,
            explanation: "घंटे की सुई का कोण 30×3 + 0.5×26 = 103.0° और मिनट की सुई का कोण 6×26 = 156° होता है। दोनों का छोटा अंतर 53° है।"
        },
        {
            id: `${quizId}-q16`,
            topic: "Clock",
            difficulty: "very-hard",
            question: "घड़ी में 4:57 बजे घंटे और मिनट की सुइयों के बीच छोटा कोण कितना होगा?",
            options: ["166.5°", "177.5°", "161°", "172°"],
            correctAnswer: 0,
            explanation: "घंटे की सुई का कोण 30×4 + 0.5×57 = 148.5° और मिनट की सुई का कोण 6×57 = 342° होता है। दोनों का छोटा अंतर 166.5° है।"
        },
        {
            id: `${quizId}-q17`,
            topic: "Clock",
            difficulty: "very-hard",
            question: "घड़ी में 5:34 बजे घंटे और मिनट की सुइयों के बीच छोटा कोण कितना होगा?",
            options: ["42.5°", "31.5°", "48°", "37°"],
            correctAnswer: 3,
            explanation: "घंटे की सुई का कोण 30×5 + 0.5×34 = 167.0° और मिनट की सुई का कोण 6×34 = 204° होता है। दोनों का छोटा अंतर 37° है।"
        },
        {
            id: `${quizId}-q18`,
            topic: "Clock",
            difficulty: "very-hard",
            question: "घड़ी में 6:19 बजे घंटे और मिनट की सुइयों के बीच छोटा कोण कितना होगा?",
            options: ["86.5°", "81°", "75.5°", "70°"],
            correctAnswer: 2,
            explanation: "घंटे की सुई का कोण 30×6 + 0.5×19 = 189.5° और मिनट की सुई का कोण 6×19 = 114° होता है। दोनों का छोटा अंतर 75.5° है।"
        },
        {
            id: `${quizId}-q19`,
            topic: "Clock",
            difficulty: "very-hard",
            question: "घड़ी में 7:46 बजे घंटे और मिनट की सुइयों के बीच छोटा कोण कितना होगा?",
            options: ["54°", "48.5°", "43°", "37.5°"],
            correctAnswer: 2,
            explanation: "घंटे की सुई का कोण 30×7 + 0.5×46 = 233.0° और मिनट की सुई का कोण 6×46 = 276° होता है। दोनों का छोटा अंतर 43° है।"
        },
        {
            id: `${quizId}-q20`,
            topic: "Clock",
            difficulty: "very-hard",
            question: "घड़ी में 8:31 बजे घंटे और मिनट की सुइयों के बीच छोटा कोण कितना होगा?",
            options: ["64°", "69.5°", "80.5°", "75°"],
            correctAnswer: 1,
            explanation: "घंटे की सुई का कोण 30×8 + 0.5×31 = 255.5° और मिनट की सुई का कोण 6×31 = 186° होता है। दोनों का छोटा अंतर 69.5° है।"
        },
        {
            id: `${quizId}-q21`,
            topic: "Clock",
            difficulty: "very-hard",
            question: "घड़ी में 9:54 बजे घंटे और मिनट की सुइयों के बीच छोटा कोण कितना होगा?",
            options: ["32.5°", "21.5°", "38°", "27°"],
            correctAnswer: 3,
            explanation: "घंटे की सुई का कोण 30×9 + 0.5×54 = 297.0° और मिनट की सुई का कोण 6×54 = 324° होता है। दोनों का छोटा अंतर 27° है।"
        },
        {
            id: `${quizId}-q22`,
            topic: "Clock",
            difficulty: "very-hard",
            question: "घड़ी में 10:28 बजे घंटे और मिनट की सुइयों के बीच छोटा कोण कितना होगा?",
            options: ["157°", "151.5°", "146°", "140.5°"],
            correctAnswer: 2,
            explanation: "घंटे की सुई का कोण 30×10 + 0.5×28 = 314.0° और मिनट की सुई का कोण 6×28 = 168° होता है। दोनों का छोटा अंतर 146° है।"
        },
        {
            id: `${quizId}-q23`,
            topic: "Clock",
            difficulty: "very-hard",
            question: "घड़ी में 11:42 बजे घंटे और मिनट की सुइयों के बीच छोटा कोण कितना होगा?",
            options: ["110°", "104.5°", "99°", "93.5°"],
            correctAnswer: 2,
            explanation: "घंटे की सुई का कोण 30×11 + 0.5×42 = 351.0° और मिनट की सुई का कोण 6×42 = 252° होता है। दोनों का छोटा अंतर 99° है।"
        },
        {
            id: `${quizId}-q24`,
            topic: "Clock",
            difficulty: "very-hard",
            question: "घड़ी में 12:13 बजे घंटे और मिनट की सुइयों के बीच छोटा कोण कितना होगा?",
            options: ["66°", "77°", "71.5°", "82.5°"],
            correctAnswer: 2,
            explanation: "घंटे की सुई का कोण 30×0 + 0.5×13 = 6.5° और मिनट की सुई का कोण 6×13 = 78° होता है। दोनों का छोटा अंतर 71.5° है।"
        },
        {
            id: `${quizId}-q25`,
            topic: "Clock",
            difficulty: "very-hard",
            question: "घड़ी में 1:36 बजे घंटे और मिनट की सुइयों के बीच छोटा कोण कितना होगा?",
            options: ["168°", "162.5°", "173.5°", "179°"],
            correctAnswer: 0,
            explanation: "घंटे की सुई का कोण 30×1 + 0.5×36 = 48.0° और मिनट की सुई का कोण 6×36 = 216° होता है। दोनों का छोटा अंतर 168° है।"
        },
        {
            id: `${quizId}-q26`,
            topic: "Clock",
            difficulty: "very-hard",
            question: "घड़ी में 2:59 बजे घंटे और मिनट की सुइयों के बीच छोटा कोण कितना होगा?",
            options: ["95.5°", "101°", "90°", "106.5°"],
            correctAnswer: 0,
            explanation: "घंटे की सुई का कोण 30×2 + 0.5×59 = 89.5° और मिनट की सुई का कोण 6×59 = 354° होता है। दोनों का छोटा अंतर 95.5° है।"
        },
        {
            id: `${quizId}-q27`,
            topic: "Clock",
            difficulty: "very-hard",
            question: "घड़ी में 3:14 बजे घंटे और मिनट की सुइयों के बीच छोटा कोण कितना होगा?",
            options: ["18.5°", "24°", "7.5°", "13°"],
            correctAnswer: 3,
            explanation: "घंटे की सुई का कोण 30×3 + 0.5×14 = 97.0° और मिनट की सुई का कोण 6×14 = 84° होता है। दोनों का छोटा अंतर 13° है।"
        },
        {
            id: `${quizId}-q28`,
            topic: "Clock",
            difficulty: "very-hard",
            question: "घड़ी में 4:23 बजे घंटे और मिनट की सुइयों के बीच छोटा कोण कितना होगा?",
            options: ["1°", "17.5°", "6.5°", "12°"],
            correctAnswer: 2,
            explanation: "घंटे की सुई का कोण 30×4 + 0.5×23 = 131.5° और मिनट की सुई का कोण 6×23 = 138° होता है। दोनों का छोटा अंतर 6.5° है।"
        },
        {
            id: `${quizId}-q29`,
            topic: "Clock",
            difficulty: "very-hard",
            question: "घड़ी में 5:48 बजे घंटे और मिनट की सुइयों के बीच छोटा कोण कितना होगा?",
            options: ["125°", "114°", "108.5°", "119.5°"],
            correctAnswer: 1,
            explanation: "घंटे की सुई का कोण 30×5 + 0.5×48 = 174.0° और मिनट की सुई का कोण 6×48 = 288° होता है। दोनों का छोटा अंतर 114° है।"
        },
        {
            id: `${quizId}-q30`,
            topic: "Clock",
            difficulty: "very-hard",
            question: "घड़ी में 6:32 बजे घंटे और मिनट की सुइयों के बीच छोटा कोण कितना होगा?",
            options: ["15°", "4°", "9.5°", "1.5°"],
            correctAnswer: 1,
            explanation: "घंटे की सुई का कोण 30×6 + 0.5×32 = 196.0° और मिनट की सुई का कोण 6×32 = 192° होता है। दोनों का छोटा अंतर 4° है।"
        },
        {
            id: `${quizId}-q31`,
            topic: "Clock",
            difficulty: "very-hard",
            question: "यदि घड़ी में वास्तविक समय 1:25 है, तो plane mirror में दिखाई देने वाला समय क्या होगा?",
            options: ["10:40", "10:45", "10:35", "10:30"],
            correctAnswer: 2,
            explanation: "Plane mirror में analog clock का mirror time 11:60 में वास्तविक समय घटाकर निकाला जाता है। इसलिए 1:25 का mirror time 10:35 होगा।"
        },
        {
            id: `${quizId}-q32`,
            topic: "Clock",
            difficulty: "very-hard",
            question: "यदि घड़ी में वास्तविक समय 2:43 है, तो plane mirror में दिखाई देने वाला समय क्या होगा?",
            options: ["9:17", "9:12", "9:27", "9:22"],
            correctAnswer: 0,
            explanation: "Plane mirror में analog clock का mirror time 11:60 में वास्तविक समय घटाकर निकाला जाता है। इसलिए 2:43 का mirror time 9:17 होगा।"
        },
        {
            id: `${quizId}-q33`,
            topic: "Clock",
            difficulty: "very-hard",
            question: "यदि घड़ी में वास्तविक समय 3:17 है, तो plane mirror में दिखाई देने वाला समय क्या होगा?",
            options: ["8:48", "8:43", "8:53", "8:38"],
            correctAnswer: 1,
            explanation: "Plane mirror में analog clock का mirror time 11:60 में वास्तविक समय घटाकर निकाला जाता है। इसलिए 3:17 का mirror time 8:43 होगा।"
        },
        {
            id: `${quizId}-q34`,
            topic: "Clock",
            difficulty: "very-hard",
            question: "यदि घड़ी में वास्तविक समय 4:56 है, तो plane mirror में दिखाई देने वाला समय क्या होगा?",
            options: ["7:14", "7:09", "7:04", "6:59"],
            correctAnswer: 2,
            explanation: "Plane mirror में analog clock का mirror time 11:60 में वास्तविक समय घटाकर निकाला जाता है। इसलिए 4:56 का mirror time 7:04 होगा।"
        },
        {
            id: `${quizId}-q35`,
            topic: "Clock",
            difficulty: "very-hard",
            question: "यदि घड़ी में वास्तविक समय 5:38 है, तो plane mirror में दिखाई देने वाला समय क्या होगा?",
            options: ["6:27", "6:17", "6:32", "6:22"],
            correctAnswer: 3,
            explanation: "Plane mirror में analog clock का mirror time 11:60 में वास्तविक समय घटाकर निकाला जाता है। इसलिए 5:38 का mirror time 6:22 होगा।"
        },
        {
            id: `${quizId}-q36`,
            topic: "Clock",
            difficulty: "very-hard",
            question: "यदि घड़ी में वास्तविक समय 6:22 है, तो plane mirror में दिखाई देने वाला समय क्या होगा?",
            options: ["5:48", "5:33", "5:43", "5:38"],
            correctAnswer: 3,
            explanation: "Plane mirror में analog clock का mirror time 11:60 में वास्तविक समय घटाकर निकाला जाता है। इसलिए 6:22 का mirror time 5:38 होगा।"
        },
        {
            id: `${quizId}-q37`,
            topic: "Clock",
            difficulty: "very-hard",
            question: "यदि घड़ी में वास्तविक समय 7:49 है, तो plane mirror में दिखाई देने वाला समय क्या होगा?",
            options: ["4:21", "4:06", "4:11", "4:16"],
            correctAnswer: 2,
            explanation: "Plane mirror में analog clock का mirror time 11:60 में वास्तविक समय घटाकर निकाला जाता है। इसलिए 7:49 का mirror time 4:11 होगा।"
        },
        {
            id: `${quizId}-q38`,
            topic: "Clock",
            difficulty: "very-hard",
            question: "यदि घड़ी में वास्तविक समय 8:13 है, तो plane mirror में दिखाई देने वाला समय क्या होगा?",
            options: ["3:57", "3:52", "3:47", "3:42"],
            correctAnswer: 2,
            explanation: "Plane mirror में analog clock का mirror time 11:60 में वास्तविक समय घटाकर निकाला जाता है। इसलिए 8:13 का mirror time 3:47 होगा।"
        },
        {
            id: `${quizId}-q39`,
            topic: "Clock",
            difficulty: "very-hard",
            question: "यदि घड़ी में वास्तविक समय 9:41 है, तो plane mirror में दिखाई देने वाला समय क्या होगा?",
            options: ["2:24", "2:19", "2:14", "2:29"],
            correctAnswer: 1,
            explanation: "Plane mirror में analog clock का mirror time 11:60 में वास्तविक समय घटाकर निकाला जाता है। इसलिए 9:41 का mirror time 2:19 होगा।"
        },
        {
            id: `${quizId}-q40`,
            topic: "Clock",
            difficulty: "very-hard",
            question: "यदि घड़ी में वास्तविक समय 10:27 है, तो plane mirror में दिखाई देने वाला समय क्या होगा?",
            options: ["1:38", "1:43", "1:28", "1:33"],
            correctAnswer: 3,
            explanation: "Plane mirror में analog clock का mirror time 11:60 में वास्तविक समय घटाकर निकाला जाता है। इसलिए 10:27 का mirror time 1:33 होगा।"
        },
        {
            id: `${quizId}-q41`,
            topic: "Clock",
            difficulty: "very-hard",
            question: "यदि घड़ी में वास्तविक समय 11:52 है, तो plane mirror में दिखाई देने वाला समय क्या होगा?",
            options: ["12:03", "12:13", "12:08", "12:18"],
            correctAnswer: 2,
            explanation: "Plane mirror में analog clock का mirror time 11:60 में वास्तविक समय घटाकर निकाला जाता है। इसलिए 11:52 का mirror time 12:08 होगा।"
        },
        {
            id: `${quizId}-q42`,
            topic: "Clock",
            difficulty: "very-hard",
            question: "यदि घड़ी में वास्तविक समय 12:34 है, तो plane mirror में दिखाई देने वाला समय क्या होगा?",
            options: ["11:31", "11:26", "11:21", "11:36"],
            correctAnswer: 1,
            explanation: "Plane mirror में analog clock का mirror time 11:60 में वास्तविक समय घटाकर निकाला जाता है। इसलिए 12:34 का mirror time 11:26 होगा।"
        },
        {
            id: `${quizId}-q43`,
            topic: "Clock",
            difficulty: "very-hard",
            question: "यदि घड़ी में वास्तविक समय 1:09 है, तो plane mirror में दिखाई देने वाला समय क्या होगा?",
            options: ["10:51", "10:56", "10:46", "11:01"],
            correctAnswer: 0,
            explanation: "Plane mirror में analog clock का mirror time 11:60 में वास्तविक समय घटाकर निकाला जाता है। इसलिए 1:09 का mirror time 10:51 होगा।"
        },
        {
            id: `${quizId}-q44`,
            topic: "Clock",
            difficulty: "very-hard",
            question: "यदि घड़ी में वास्तविक समय 2:58 है, तो plane mirror में दिखाई देने वाला समय क्या होगा?",
            options: ["8:57", "9:12", "9:02", "9:07"],
            correctAnswer: 2,
            explanation: "Plane mirror में analog clock का mirror time 11:60 में वास्तविक समय घटाकर निकाला जाता है। इसलिए 2:58 का mirror time 9:02 होगा।"
        },
        {
            id: `${quizId}-q45`,
            topic: "Clock",
            difficulty: "very-hard",
            question: "यदि घड़ी में वास्तविक समय 7:07 है, तो plane mirror में दिखाई देने वाला समय क्या होगा?",
            options: ["4:58", "4:48", "5:03", "4:53"],
            correctAnswer: 3,
            explanation: "Plane mirror में analog clock का mirror time 11:60 में वास्तविक समय घटाकर निकाला जाता है। इसलिए 7:07 का mirror time 4:53 होगा।"
        },
        {
            id: `${quizId}-q46`,
            topic: "Clock",
            difficulty: "very-hard",
            question: "प्रश्न 1: 1 और 2 बजे के बीच घंटे और मिनट की सुइयाँ किस समय एक-दूसरे के ऊपर मिलेंगी?",
            options: ["1 बजकर 5 मिनट 300/11 सेकंड", "1 बजकर 10 मिनट 600/11 सेकंड", "1 बजकर 5 मिनट 0 सेकंड", "1 बजकर 5 मिनट 600/11 सेकंड"],
            correctAnswer: 0,
            explanation: "सुइयों के मिलने के लिए m = 60H/11 होता है। H=1 रखने पर m = 5 मिनट 300/11 सेकंड आता है, इसलिए समय 1 बजकर 5 मिनट 300/11 सेकंड है।"
        },
        {
            id: `${quizId}-q47`,
            topic: "Clock",
            difficulty: "very-hard",
            question: "प्रश्न 2: 2 और 3 बजे के बीच घंटे और मिनट की सुइयाँ किस समय एक-दूसरे के ऊपर मिलेंगी?",
            options: ["2 बजकर 10 मिनट 600/11 सेकंड", "2 बजकर 16 मिनट 240/11 सेकंड", "2 बजकर 10 मिनट 300/11 सेकंड", "2 बजकर 11 मिनट 240/11 सेकंड"],
            correctAnswer: 0,
            explanation: "सुइयों के मिलने के लिए m = 60H/11 होता है। H=2 रखने पर m = 10 मिनट 600/11 सेकंड आता है, इसलिए समय 2 बजकर 10 मिनट 600/11 सेकंड है।"
        },
        {
            id: `${quizId}-q48`,
            topic: "Clock",
            difficulty: "very-hard",
            question: "प्रश्न 3: 3 और 4 बजे के बीच घंटे और मिनट की सुइयाँ किस समय एक-दूसरे के ऊपर मिलेंगी?",
            options: ["3 बजकर 21 मिनट 540/11 सेकंड", "3 बजकर 16 मिनट 540/11 सेकंड", "3 बजकर 16 मिनट 240/11 सेकंड", "3 बजकर 15 मिनट 600/11 सेकंड"],
            correctAnswer: 2,
            explanation: "सुइयों के मिलने के लिए m = 60H/11 होता है। H=3 रखने पर m = 16 मिनट 240/11 सेकंड आता है, इसलिए समय 3 बजकर 16 मिनट 240/11 सेकंड है।"
        },
        {
            id: `${quizId}-q49`,
            topic: "Clock",
            difficulty: "very-hard",
            question: "प्रश्न 4: 4 और 5 बजे के बीच घंटे और मिनट की सुइयाँ किस समय एक-दूसरे के ऊपर मिलेंगी?",
            options: ["4 बजकर 27 मिनट 180/11 सेकंड", "4 बजकर 21 मिनट 540/11 सेकंड", "4 बजकर 22 मिनट 180/11 सेकंड", "4 बजकर 21 मिनट 240/11 सेकंड"],
            correctAnswer: 1,
            explanation: "सुइयों के मिलने के लिए m = 60H/11 होता है। H=4 रखने पर m = 21 मिनट 540/11 सेकंड आता है, इसलिए समय 4 बजकर 21 मिनट 540/11 सेकंड है।"
        },
        {
            id: `${quizId}-q50`,
            topic: "Clock",
            difficulty: "very-hard",
            question: "प्रश्न 5: 5 और 6 बजे के बीच घंटे और मिनट की सुइयाँ किस समय एक-दूसरे के ऊपर मिलेंगी?",
            options: ["5 बजकर 27 मिनट 180/11 सेकंड", "5 बजकर 32 मिनट 480/11 सेकंड", "5 बजकर 27 मिनट 480/11 सेकंड", "5 बजकर 26 मिनट 540/11 सेकंड"],
            correctAnswer: 0,
            explanation: "सुइयों के मिलने के लिए m = 60H/11 होता है। H=5 रखने पर m = 27 मिनट 180/11 सेकंड आता है, इसलिए समय 5 बजकर 27 मिनट 180/11 सेकंड है।"
        }
    ];

    window.GJU_QUIZ_BANK.push({
        id: quizId,
        subject: "Reasoning",
        title: "Reasoning Clock Very Hard Practice Set 1",
        description: "50 very hard Clock reasoning MCQs for SSC, Police, UPSI, Railway and other competitive exams with close options and professional explanations.",
        durationMinutes: 40,
        totalQuestions: questions.length,
        marksPerQuestion: 1,
        negativeMarks: 0.25
        difficulty: "Very Hard",
        tags: ["SSC", "UPSI", "Police", "Railway", "Reasoning", "Clock"],
        questions
    });
}());