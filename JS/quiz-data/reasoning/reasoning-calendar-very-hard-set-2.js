(function () {
    "use strict";

    window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];

    const quizId = "reasoning-calendar-very-hard-set-2";

    const questions = [
        {
            id: `${quizId}-q01`,
            topic: "Calendar",
            difficulty: "very-hard",
            question: "वर्ष 1900 का calendar किस वर्ष के calendar के समान होगा?",
            options: ["1905", "1906", "1907", "1912"],
            correctAnswer: 1,
            explanation: "दो वर्षों का calendar समान होने के लिए 1 जनवरी का दिन समान होना चाहिए और दोनों वर्षों की leap/common स्थिति भी समान होनी चाहिए। इस आधार पर 1900 का calendar 1906 के समान होगा।"
        },
        {
            id: `${quizId}-q02`,
            topic: "Calendar",
            difficulty: "very-hard",
            question: "वर्ष 2100 का calendar किस वर्ष के calendar के समान होगा?",
            options: ["2105", "2107", "2112", "2106"],
            correctAnswer: 3,
            explanation: "दो वर्षों का calendar समान होने के लिए 1 जनवरी का दिन समान होना चाहिए और दोनों वर्षों की leap/common स्थिति भी समान होनी चाहिए। इस आधार पर 2100 का calendar 2106 के समान होगा।"
        },
        {
            id: `${quizId}-q03`,
            topic: "Calendar",
            difficulty: "very-hard",
            question: "वर्ष 2096 का calendar किस वर्ष के calendar के समान होगा?",
            options: ["2123", "2124", "2130", "2125"],
            correctAnswer: 1,
            explanation: "दो वर्षों का calendar समान होने के लिए 1 जनवरी का दिन समान होना चाहिए और दोनों वर्षों की leap/common स्थिति भी समान होनी चाहिए। इस आधार पर 2096 का calendar 2124 के समान होगा।"
        },
        {
            id: `${quizId}-q04`,
            topic: "Calendar",
            difficulty: "very-hard",
            question: "वर्ष 1997 का calendar किस वर्ष के calendar के समान होगा?",
            options: ["2009", "2003", "2002", "2004"],
            correctAnswer: 1,
            explanation: "दो वर्षों का calendar समान होने के लिए 1 जनवरी का दिन समान होना चाहिए और दोनों वर्षों की leap/common स्थिति भी समान होनी चाहिए। इस आधार पर 1997 का calendar 2003 के समान होगा।"
        },
        {
            id: `${quizId}-q05`,
            topic: "Calendar",
            difficulty: "very-hard",
            question: "वर्ष 2004 का calendar किस वर्ष के calendar के समान होगा?",
            options: ["2032", "2033", "2031", "2038"],
            correctAnswer: 0,
            explanation: "दो वर्षों का calendar समान होने के लिए 1 जनवरी का दिन समान होना चाहिए और दोनों वर्षों की leap/common स्थिति भी समान होनी चाहिए। इस आधार पर 2004 का calendar 2032 के समान होगा।"
        },
        {
            id: `${quizId}-q06`,
            topic: "Calendar",
            difficulty: "very-hard",
            question: "वर्ष 1600 किस प्रकार का वर्ष है?",
            options: ["Century leap year", "Common year", "Cannot be determined", "Leap year"],
            correctAnswer: 3,
            explanation: "Leap year rule: वर्ष 4 से विभाज्य हो, पर century year होने पर 400 से भी विभाज्य होना चाहिए। इसलिए 1600 leap year है।"
        },
        {
            id: `${quizId}-q07`,
            topic: "Calendar",
            difficulty: "very-hard",
            question: "वर्ष 1700 किस प्रकार का वर्ष है?",
            options: ["Common year", "Leap year", "Cannot be determined", "Ordinary leap year"],
            correctAnswer: 0,
            explanation: "Leap year rule: वर्ष 4 से विभाज्य हो, पर century year होने पर 400 से भी विभाज्य होना चाहिए। इसलिए 1700 common year है।"
        },
        {
            id: `${quizId}-q08`,
            topic: "Calendar",
            difficulty: "very-hard",
            question: "वर्ष 1800 किस प्रकार का वर्ष है?",
            options: ["Cannot be determined", "Ordinary leap year", "Common year", "Leap year"],
            correctAnswer: 2,
            explanation: "Leap year rule: वर्ष 4 से विभाज्य हो, पर century year होने पर 400 से भी विभाज्य होना चाहिए। इसलिए 1800 common year है।"
        },
        {
            id: `${quizId}-q09`,
            topic: "Calendar",
            difficulty: "very-hard",
            question: "वर्ष 1900 किस प्रकार का वर्ष है?",
            options: ["Ordinary leap year", "Cannot be determined", "Common year", "Leap year"],
            correctAnswer: 2,
            explanation: "Leap year rule: वर्ष 4 से विभाज्य हो, पर century year होने पर 400 से भी विभाज्य होना चाहिए। इसलिए 1900 common year है।"
        },
        {
            id: `${quizId}-q10`,
            topic: "Calendar",
            difficulty: "very-hard",
            question: "वर्ष 2000 किस प्रकार का वर्ष है?",
            options: ["Century leap year", "Common year", "Cannot be determined", "Leap year"],
            correctAnswer: 3,
            explanation: "Leap year rule: वर्ष 4 से विभाज्य हो, पर century year होने पर 400 से भी विभाज्य होना चाहिए। इसलिए 2000 leap year है।"
        },
        {
            id: `${quizId}-q11`,
            topic: "Calendar",
            difficulty: "very-hard",
            question: "वर्ष 2100 किस प्रकार का वर्ष है?",
            options: ["Cannot be determined", "Common year", "Ordinary leap year", "Leap year"],
            correctAnswer: 1,
            explanation: "Leap year rule: वर्ष 4 से विभाज्य हो, पर century year होने पर 400 से भी विभाज्य होना चाहिए। इसलिए 2100 common year है।"
        },
        {
            id: `${quizId}-q12`,
            topic: "Calendar",
            difficulty: "very-hard",
            question: "वर्ष 2200 किस प्रकार का वर्ष है?",
            options: ["Ordinary leap year", "Cannot be determined", "Common year", "Leap year"],
            correctAnswer: 2,
            explanation: "Leap year rule: वर्ष 4 से विभाज्य हो, पर century year होने पर 400 से भी विभाज्य होना चाहिए। इसलिए 2200 common year है।"
        },
        {
            id: `${quizId}-q13`,
            topic: "Calendar",
            difficulty: "very-hard",
            question: "वर्ष 2300 किस प्रकार का वर्ष है?",
            options: ["Cannot be determined", "Common year", "Leap year", "Ordinary leap year"],
            correctAnswer: 1,
            explanation: "Leap year rule: वर्ष 4 से विभाज्य हो, पर century year होने पर 400 से भी विभाज्य होना चाहिए। इसलिए 2300 common year है।"
        },
        {
            id: `${quizId}-q14`,
            topic: "Calendar",
            difficulty: "very-hard",
            question: "वर्ष 2400 किस प्रकार का वर्ष है?",
            options: ["Leap year", "Cannot be determined", "Common year", "Century leap year"],
            correctAnswer: 0,
            explanation: "Leap year rule: वर्ष 4 से विभाज्य हो, पर century year होने पर 400 से भी विभाज्य होना चाहिए। इसलिए 2400 leap year है।"
        },
        {
            id: `${quizId}-q15`,
            topic: "Calendar",
            difficulty: "very-hard",
            question: "वर्ष 2024 किस प्रकार का वर्ष है?",
            options: ["Leap year", "Cannot be determined", "Ordinary leap year", "Common year"],
            correctAnswer: 0,
            explanation: "Leap year rule: वर्ष 4 से विभाज्य हो, पर century year होने पर 400 से भी विभाज्य होना चाहिए। इसलिए 2024 leap year है।"
        },
        {
            id: `${quizId}-q16`,
            topic: "Calendar",
            difficulty: "very-hard",
            question: "वर्ष 2026 किस प्रकार का वर्ष है?",
            options: ["Ordinary leap year", "Common year", "Cannot be determined", "Leap year"],
            correctAnswer: 1,
            explanation: "Leap year rule: वर्ष 4 से विभाज्य हो, पर century year होने पर 400 से भी विभाज्य होना चाहिए। इसलिए 2026 common year है।"
        },
        {
            id: `${quizId}-q17`,
            topic: "Calendar",
            difficulty: "very-hard",
            question: "वर्ष 2032 किस प्रकार का वर्ष है?",
            options: ["Leap year", "Common year", "Cannot be determined", "Ordinary leap year"],
            correctAnswer: 0,
            explanation: "Leap year rule: वर्ष 4 से विभाज्य हो, पर century year होने पर 400 से भी विभाज्य होना चाहिए। इसलिए 2032 leap year है।"
        },
        {
            id: `${quizId}-q18`,
            topic: "Calendar",
            difficulty: "very-hard",
            question: "वर्ष 2096 किस प्रकार का वर्ष है?",
            options: ["Ordinary leap year", "Cannot be determined", "Leap year", "Common year"],
            correctAnswer: 2,
            explanation: "Leap year rule: वर्ष 4 से विभाज्य हो, पर century year होने पर 400 से भी विभाज्य होना चाहिए। इसलिए 2096 leap year है।"
        },
        {
            id: `${quizId}-q19`,
            topic: "Calendar",
            difficulty: "very-hard",
            question: "वर्ष 2099 किस प्रकार का वर्ष है?",
            options: ["Common year", "Cannot be determined", "Leap year", "Ordinary leap year"],
            correctAnswer: 0,
            explanation: "Leap year rule: वर्ष 4 से विभाज्य हो, पर century year होने पर 400 से भी विभाज्य होना चाहिए। इसलिए 2099 common year है।"
        },
        {
            id: `${quizId}-q20`,
            topic: "Calendar",
            difficulty: "very-hard",
            question: "वर्ष 1200 किस प्रकार का वर्ष है?",
            options: ["Leap year", "Century leap year", "Cannot be determined", "Common year"],
            correctAnswer: 0,
            explanation: "Leap year rule: वर्ष 4 से विभाज्य हो, पर century year होने पर 400 से भी विभाज्य होना चाहिए। इसलिए 1200 leap year है।"
        },
        {
            id: `${quizId}-q21`,
            topic: "Calendar",
            difficulty: "very-hard",
            question: "100 वर्षों में कुल odd days कितने होंगे?",
            options: ["6", "4", "5", "3"],
            correctAnswer: 2,
            explanation: "100 वर्षों में 5 odd days, 200 में 3, 300 में 1 और 400 वर्षों में 0 odd days होते हैं। इसी cycle के अनुसार 100 वर्षों में 5 odd days होंगे।"
        },
        {
            id: `${quizId}-q22`,
            topic: "Calendar",
            difficulty: "very-hard",
            question: "200 वर्षों में कुल odd days कितने होंगे?",
            options: ["3", "5", "2", "4"],
            correctAnswer: 0,
            explanation: "100 वर्षों में 5 odd days, 200 में 3, 300 में 1 और 400 वर्षों में 0 odd days होते हैं। इसी cycle के अनुसार 200 वर्षों में 3 odd days होंगे।"
        },
        {
            id: `${quizId}-q23`,
            topic: "Calendar",
            difficulty: "very-hard",
            question: "300 वर्षों में कुल odd days कितने होंगे?",
            options: ["3", "2", "0", "1"],
            correctAnswer: 3,
            explanation: "100 वर्षों में 5 odd days, 200 में 3, 300 में 1 और 400 वर्षों में 0 odd days होते हैं। इसी cycle के अनुसार 300 वर्षों में 1 odd days होंगे।"
        },
        {
            id: `${quizId}-q24`,
            topic: "Calendar",
            difficulty: "very-hard",
            question: "400 वर्षों में कुल odd days कितने होंगे?",
            options: ["0", "2", "3", "1"],
            correctAnswer: 0,
            explanation: "100 वर्षों में 5 odd days, 200 में 3, 300 में 1 और 400 वर्षों में 0 odd days होते हैं। इसी cycle के अनुसार 400 वर्षों में 0 odd days होंगे।"
        },
        {
            id: `${quizId}-q25`,
            topic: "Calendar",
            difficulty: "very-hard",
            question: "500 वर्षों में कुल odd days कितने होंगे?",
            options: ["5", "4", "6", "3"],
            correctAnswer: 0,
            explanation: "100 वर्षों में 5 odd days, 200 में 3, 300 में 1 और 400 वर्षों में 0 odd days होते हैं। इसी cycle के अनुसार 500 वर्षों में 5 odd days होंगे।"
        },
        {
            id: `${quizId}-q26`,
            topic: "Calendar",
            difficulty: "very-hard",
            question: "600 वर्षों में कुल odd days कितने होंगे?",
            options: ["2", "3", "4", "5"],
            correctAnswer: 1,
            explanation: "100 वर्षों में 5 odd days, 200 में 3, 300 में 1 और 400 वर्षों में 0 odd days होते हैं। इसी cycle के अनुसार 600 वर्षों में 3 odd days होंगे।"
        },
        {
            id: `${quizId}-q27`,
            topic: "Calendar",
            difficulty: "very-hard",
            question: "700 वर्षों में कुल odd days कितने होंगे?",
            options: ["3", "2", "0", "1"],
            correctAnswer: 3,
            explanation: "100 वर्षों में 5 odd days, 200 में 3, 300 में 1 और 400 वर्षों में 0 odd days होते हैं। इसी cycle के अनुसार 700 वर्षों में 1 odd days होंगे।"
        },
        {
            id: `${quizId}-q28`,
            topic: "Calendar",
            difficulty: "very-hard",
            question: "800 वर्षों में कुल odd days कितने होंगे?",
            options: ["3", "1", "2", "0"],
            correctAnswer: 3,
            explanation: "100 वर्षों में 5 odd days, 200 में 3, 300 में 1 और 400 वर्षों में 0 odd days होते हैं। इसी cycle के अनुसार 800 वर्षों में 0 odd days होंगे।"
        },
        {
            id: `${quizId}-q29`,
            topic: "Calendar",
            difficulty: "very-hard",
            question: "1600 वर्षों में कुल odd days कितने होंगे?",
            options: ["0", "2", "1", "3"],
            correctAnswer: 0,
            explanation: "100 वर्षों में 5 odd days, 200 में 3, 300 में 1 और 400 वर्षों में 0 odd days होते हैं। इसी cycle के अनुसार 1600 वर्षों में 0 odd days होंगे।"
        },
        {
            id: `${quizId}-q30`,
            topic: "Calendar",
            difficulty: "very-hard",
            question: "1700 वर्षों में कुल odd days कितने होंगे?",
            options: ["3", "6", "5", "4"],
            correctAnswer: 2,
            explanation: "100 वर्षों में 5 odd days, 200 में 3, 300 में 1 और 400 वर्षों में 0 odd days होते हैं। इसी cycle के अनुसार 1700 वर्षों में 5 odd days होंगे।"
        },
        {
            id: `${quizId}-q31`,
            topic: "Calendar",
            difficulty: "very-hard",
            question: "1900 वर्षों में कुल odd days कितने होंगे?",
            options: ["0", "2", "1", "3"],
            correctAnswer: 2,
            explanation: "100 वर्षों में 5 odd days, 200 में 3, 300 में 1 और 400 वर्षों में 0 odd days होते हैं। इसी cycle के अनुसार 1900 वर्षों में 1 odd days होंगे।"
        },
        {
            id: `${quizId}-q32`,
            topic: "Calendar",
            difficulty: "very-hard",
            question: "2000 वर्षों में कुल odd days कितने होंगे?",
            options: ["3", "0", "2", "1"],
            correctAnswer: 1,
            explanation: "100 वर्षों में 5 odd days, 200 में 3, 300 में 1 और 400 वर्षों में 0 odd days होते हैं। इसी cycle के अनुसार 2000 वर्षों में 0 odd days होंगे।"
        },
        {
            id: `${quizId}-q33`,
            topic: "Calendar",
            difficulty: "very-hard",
            question: "यदि 01-01-2024 को Monday था, तो 100 दिन बाद कौन-सा दिन होगा?",
            options: ["Friday", "Tuesday", "Wednesday", "Thursday"],
            correctAnswer: 2,
            explanation: "100 दिनों को 7 से भाग देने पर शेष 2 आता है। आगे उतने दिन गिनने पर दिन Wednesday (बुधवार) होगा।"
        },
        {
            id: `${quizId}-q34`,
            topic: "Calendar",
            difficulty: "very-hard",
            question: "यदि 15-05-2025 को Thursday था, तो 73 दिन बाद कौन-सा दिन होगा?",
            options: ["Tuesday", "Saturday", "Monday", "Sunday"],
            correctAnswer: 3,
            explanation: "73 दिनों को 7 से भाग देने पर शेष 3 आता है। आगे उतने दिन गिनने पर दिन Sunday (रविवार) होगा।"
        },
        {
            id: `${quizId}-q35`,
            topic: "Calendar",
            difficulty: "very-hard",
            question: "यदि 26-01-2026 को Monday था, तो 250 दिन बाद कौन-सा दिन होगा?",
            options: ["Sunday", "Friday", "Monday", "Saturday"],
            correctAnswer: 3,
            explanation: "250 दिनों को 7 से भाग देने पर शेष 5 आता है। आगे उतने दिन गिनने पर दिन Saturday (शनिवार) होगा।"
        },
        {
            id: `${quizId}-q36`,
            topic: "Calendar",
            difficulty: "very-hard",
            question: "यदि 15-08-2027 को Sunday था, तो 123 दिन बाद कौन-सा दिन होगा?",
            options: ["Friday", "Wednesday", "Saturday", "Thursday"],
            correctAnswer: 3,
            explanation: "123 दिनों को 7 से भाग देने पर शेष 4 आता है। आगे उतने दिन गिनने पर दिन Thursday (गुरुवार) होगा।"
        },
        {
            id: `${quizId}-q37`,
            topic: "Calendar",
            difficulty: "very-hard",
            question: "यदि 29-02-2028 को Tuesday था, तो 366 दिन बाद कौन-सा दिन होगा?",
            options: ["Thursday", "Wednesday", "Saturday", "Friday"],
            correctAnswer: 0,
            explanation: "366 दिनों को 7 से भाग देने पर शेष 2 आता है। आगे उतने दिन गिनने पर दिन Thursday (गुरुवार) होगा।"
        },
        {
            id: `${quizId}-q38`,
            topic: "Calendar",
            difficulty: "very-hard",
            question: "यदि 31-12-2029 को Monday था, तो 45 दिन बाद कौन-सा दिन होगा?",
            options: ["Friday", "Saturday", "Wednesday", "Thursday"],
            correctAnswer: 3,
            explanation: "45 दिनों को 7 से भाग देने पर शेष 3 आता है। आगे उतने दिन गिनने पर दिन Thursday (गुरुवार) होगा।"
        },
        {
            id: `${quizId}-q39`,
            topic: "Calendar",
            difficulty: "very-hard",
            question: "यदि 02-10-2030 को Wednesday था, तो 75 दिन पहले कौन-सा दिन होगा?",
            options: ["Friday", "Sunday", "Thursday", "Saturday"],
            correctAnswer: 0,
            explanation: "75 दिनों को 7 से भाग देने पर शेष 5 आता है। पीछे उतने दिन गिनने पर दिन Friday (शुक्रवार) होगा।"
        },
        {
            id: `${quizId}-q40`,
            topic: "Calendar",
            difficulty: "very-hard",
            question: "यदि 01-03-2032 को Monday था, तो 366 दिन पहले कौन-सा दिन होगा?",
            options: ["Friday", "Sunday", "Monday", "Saturday"],
            correctAnswer: 3,
            explanation: "366 दिनों को 7 से भाग देने पर शेष 2 आता है। पीछे उतने दिन गिनने पर दिन Saturday (शनिवार) होगा।"
        },
        {
            id: `${quizId}-q41`,
            topic: "Calendar",
            difficulty: "very-hard",
            question: "यदि 29-02-2040 को Wednesday था, तो 500 दिन बाद कौन-सा दिन होगा?",
            options: ["Monday", "Friday", "Sunday", "Saturday"],
            correctAnswer: 3,
            explanation: "500 दिनों को 7 से भाग देने पर शेष 3 आता है। आगे उतने दिन गिनने पर दिन Saturday (शनिवार) होगा।"
        },
        {
            id: `${quizId}-q42`,
            topic: "Calendar",
            difficulty: "very-hard",
            question: "यदि 26-01-2050 को Wednesday था, तो 250 दिन पहले कौन-सा दिन होगा?",
            options: ["Thursday", "Saturday", "Friday", "Sunday"],
            correctAnswer: 2,
            explanation: "250 दिनों को 7 से भाग देने पर शेष 5 आता है। पीछे उतने दिन गिनने पर दिन Friday (शुक्रवार) होगा।"
        },
        {
            id: `${quizId}-q43`,
            topic: "Calendar",
            difficulty: "very-hard",
            question: "वर्ष 2024 के February महीने में कितने दिन होंगे?",
            options: ["29", "30", "31", "28"],
            correctAnswer: 0,
            explanation: "February में दिनों की संख्या leap year rule और महीने के अनुसार तय होती है। वर्ष 2024 में February के 29 दिन होंगे।"
        },
        {
            id: `${quizId}-q44`,
            topic: "Calendar",
            difficulty: "very-hard",
            question: "वर्ष 2026 के February महीने में कितने दिन होंगे?",
            options: ["29", "30", "28", "31"],
            correctAnswer: 2,
            explanation: "February में दिनों की संख्या leap year rule और महीने के अनुसार तय होती है। वर्ष 2026 में February के 28 दिन होंगे।"
        },
        {
            id: `${quizId}-q45`,
            topic: "Calendar",
            difficulty: "very-hard",
            question: "वर्ष 2100 के February महीने में कितने दिन होंगे?",
            options: ["28", "29", "30", "31"],
            correctAnswer: 0,
            explanation: "February में दिनों की संख्या leap year rule और महीने के अनुसार तय होती है। वर्ष 2100 में February के 28 दिन होंगे।"
        },
        {
            id: `${quizId}-q46`,
            topic: "Calendar",
            difficulty: "very-hard",
            question: "वर्ष 2000 के February महीने में कितने दिन होंगे?",
            options: ["30", "28", "31", "29"],
            correctAnswer: 3,
            explanation: "February में दिनों की संख्या leap year rule और महीने के अनुसार तय होती है। वर्ष 2000 में February के 29 दिन होंगे।"
        },
        {
            id: `${quizId}-q47`,
            topic: "Calendar",
            difficulty: "very-hard",
            question: "वर्ष 2025 के April महीने में कितने दिन होंगे?",
            options: ["31", "28", "29", "30"],
            correctAnswer: 3,
            explanation: "April में दिनों की संख्या leap year rule और महीने के अनुसार तय होती है। वर्ष 2025 में April के 30 दिन होंगे।"
        },
        {
            id: `${quizId}-q48`,
            topic: "Calendar",
            difficulty: "very-hard",
            question: "वर्ष 2025 के December महीने में कितने दिन होंगे?",
            options: ["29", "31", "28", "30"],
            correctAnswer: 1,
            explanation: "December में दिनों की संख्या leap year rule और महीने के अनुसार तय होती है। वर्ष 2025 में December के 31 दिन होंगे।"
        },
        {
            id: `${quizId}-q49`,
            topic: "Calendar",
            difficulty: "very-hard",
            question: "वर्ष 2028 के February महीने में कितने दिन होंगे?",
            options: ["28", "29", "30", "31"],
            correctAnswer: 1,
            explanation: "February में दिनों की संख्या leap year rule और महीने के अनुसार तय होती है। वर्ष 2028 में February के 29 दिन होंगे।"
        },
        {
            id: `${quizId}-q50`,
            topic: "Calendar",
            difficulty: "very-hard",
            question: "वर्ष 2031 के June महीने में कितने दिन होंगे?",
            options: ["29", "30", "31", "28"],
            correctAnswer: 1,
            explanation: "June में दिनों की संख्या leap year rule और महीने के अनुसार तय होती है। वर्ष 2031 में June के 30 दिन होंगे।"
        }
    ];

    window.GJU_QUIZ_BANK.push({
        id: quizId,
        subject: "Reasoning",
        title: "Reasoning Calendar Very Hard Practice Set 2",
        description: "50 very hard Calendar reasoning MCQs for SSC, Police, UPSI, Railway and other competitive exams with close options and professional explanations.",
        durationMinutes: 40,
        totalQuestions: questions.length,
        marksPerQuestion: 1,
        negativeMarks: 0.25,
        difficulty: "Very Hard",
        tags: ["SSC", "UPSI", "Police", "Railway", "Reasoning", "Calendar"],
        questions
    });
}());