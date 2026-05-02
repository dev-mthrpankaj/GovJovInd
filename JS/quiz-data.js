(function () {
    "use strict";

    const SUBJECTS = ["Mathematics", "English", "Hindi", "General Awareness", "Reasoning", "Computer"];
    const EXAM_TAGS = [
        ["SSC", "Railway"],
        ["Police", "State Exams"],
        ["Banking", "SSC"],
        ["UPSC", "State Exams"],
        ["Railway", "Police"],
        ["SSC", "Banking"]
    ];

    const questionSeeds = {
        Mathematics: [
            ["Arithmetic", "Easy", "What is 25% of 240?", ["40", "50", "60", "80"], 2, "25% is one-fourth. One-fourth of 240 is 60."],
            ["Profit and Loss", "Medium", "An item bought for 800 is sold for 920. What is the profit percent?", ["12%", "15%", "18%", "20%"], 1, "Profit is 120. Profit percent = 120/800 x 100 = 15%."],
            ["Number System", "Easy", "LCM of 18 and 24 is", ["48", "54", "72", "96"], 2, "18 = 2 x 3 x 3 and 24 = 2 x 2 x 2 x 3. LCM is 72."],
            ["Time and Work", "Medium", "A can complete a work in 12 days and B in 18 days. Together they finish it in", ["6.2 days", "7.2 days", "8 days", "9 days"], 1, "Combined work per day = 1/12 + 1/18 = 5/36, so time = 36/5 = 7.2 days."],
            ["Percentage", "Easy", "If 40% of a number is 160, the number is", ["320", "360", "400", "420"], 2, "Number = 160 x 100 / 40 = 400."],
            ["Simple Interest", "Medium", "Simple interest on 5000 at 8% per annum for 2 years is", ["600", "700", "800", "900"], 2, "SI = PRT/100 = 5000 x 8 x 2 / 100 = 800."],
            ["Ratio", "Easy", "The ratio 24:36 in simplest form is", ["2:3", "3:4", "4:5", "5:6"], 0, "Divide both terms by 12 to get 2:3."],
            ["Average", "Medium", "Average of 12, 18, 20, 30 and 40 is", ["22", "24", "26", "28"], 1, "Sum is 120 and count is 5. Average is 24."],
            ["Geometry", "Easy", "Sum of interior angles of a triangle is", ["90 degrees", "180 degrees", "270 degrees", "360 degrees"], 1, "Every triangle has angle sum of 180 degrees."],
            ["Mensuration", "Medium", "Area of a rectangle with length 15 cm and breadth 8 cm is", ["96 sq cm", "110 sq cm", "120 sq cm", "128 sq cm"], 2, "Area = length x breadth = 15 x 8 = 120 sq cm."]
        ],
        English: [
            ["Grammar", "Easy", "Choose the correct sentence.", ["He go to school.", "He goes to school.", "He going school.", "He gone school."], 1, "Singular subject he takes the verb goes."],
            ["Vocabulary", "Easy", "Synonym of rapid is", ["slow", "quick", "late", "weak"], 1, "Rapid means quick or fast."],
            ["Article", "Medium", "She is ___ honest officer.", ["a", "an", "the", "no article"], 1, "Honest starts with a vowel sound, so an is used."],
            ["Error Spotting", "Medium", "Find the error: Each of the players have a kit.", ["Each of", "the players", "have a kit", "No error"], 2, "Each takes a singular verb: has."],
            ["Antonym", "Easy", "Antonym of expand is", ["increase", "stretch", "contract", "spread"], 2, "Contract is the opposite of expand."],
            ["Tense", "Medium", "I ___ him yesterday.", ["meet", "met", "meeting", "meets"], 1, "Yesterday indicates past tense, so met is correct."],
            ["Voice", "Hard", "Passive voice of \"They completed the work\" is", ["The work completed them.", "The work was completed by them.", "They were completed by work.", "The work is completing."], 1, "Simple past passive uses was/were + past participle."],
            ["Idiom", "Medium", "At the eleventh hour means", ["very early", "at the last moment", "at 11 AM", "after lunch"], 1, "The idiom means at the last possible moment."],
            ["Preposition", "Easy", "He is good ___ mathematics.", ["in", "at", "on", "by"], 1, "Good at is the correct phrase."],
            ["Spelling", "Easy", "Choose the correctly spelt word.", ["Accomodate", "Acommodate", "Accommodate", "Acomodate"], 2, "Accommodate has double c and double m."]
        ],
        Hindi: [
            ["Vyakaran", "Easy", "\"Ram\" kis prakar ki sangya hai?", ["Jativachak", "Vyaktivachak", "Bhavvachak", "Samuhvachak"], 1, "Ram kisi vishesh vyakti ka naam hai."],
            ["Paryayvachi", "Medium", "\"Jal\" ka paryayvachi shabd hai", ["Agni", "Vayu", "Neer", "Dhara"], 2, "Jal ka paryayvachi neer hota hai."],
            ["Vilom", "Easy", "\"Din\" ka vilom hai", ["Raat", "Suraj", "Samay", "Dopahar"], 0, "Din ka vipreet raat hai."],
            ["Muhavare", "Hard", "\"Naak katna\" ka arth hai", ["Ghayal hona", "Apmaan hona", "Bimar hona", "Gir jana"], 1, "Naak katna ka arth apmaan hona hai."],
            ["Shuddh Vartani", "Medium", "Sahi shabd chuniye", ["Vidhyalay", "Vidyalaya", "Viddyalay", "Vidhalaay"], 1, "Sahi vartani Vidyalaya hai."],
            ["Sandhi", "Hard", "\"Devalaya\" mein kaunsi sandhi hai?", ["Gun", "Vriddhi", "Yan", "Dirgh"], 0, "Dev + Alaya mein gun sandhi hoti hai."],
            ["Samas", "Medium", "\"Rajputra\" ka samas hai", ["Karmadharaya", "Tatpurush", "Dvandva", "Bahuvrihi"], 1, "Raja ka putra arth mein tatpurush samas hai."],
            ["Vyakaran", "Easy", "\"Main school jata hun\" mein kriya pad hai", ["Main", "School", "Jata hun", "Mein"], 2, "Jata hun kriya pad hai."],
            ["Lokokti", "Hard", "\"Oont ke muh mein jeera\" ka arth hai", ["Bahut adhik", "Bahut kam", "Bahut teekha", "Bahut meetha"], 1, "Iska arth avashyakta ki tulna mein bahut kam hai."],
            ["Alankar", "Medium", "Ek hi varna ki punaravritti ka alankar hai", ["Anupras", "Upma", "Rupak", "Yamak"], 0, "Anupras alankar mein varna punaravritti hoti hai."]
        ],
        "General Awareness": [
            ["Polity", "Easy", "Constitution Day in India is observed on", ["26 January", "15 August", "26 November", "2 October"], 2, "Constitution Day is observed on 26 November."],
            ["History", "Medium", "Who founded the Maurya Empire?", ["Ashoka", "Chandragupta Maurya", "Bindusara", "Harsha"], 1, "Chandragupta Maurya founded the Maurya Empire."],
            ["Geography", "Easy", "The capital of Rajasthan is", ["Jodhpur", "Udaipur", "Jaipur", "Kota"], 2, "Jaipur is the capital of Rajasthan."],
            ["Economy", "Medium", "RBI headquarters is located in", ["Delhi", "Mumbai", "Kolkata", "Chennai"], 1, "The Reserve Bank of India headquarters is in Mumbai."],
            ["Current Affairs", "Medium", "The G20 Summit 2023 hosted by India was held in", ["Mumbai", "New Delhi", "Goa", "Jaipur"], 1, "The main summit was held in New Delhi."],
            ["Polity", "Hard", "Fundamental Duties are mentioned in which part of the Constitution?", ["Part III", "Part IV", "Part IVA", "Part V"], 2, "Fundamental Duties are in Part IVA."],
            ["History", "Medium", "Quit India Movement was launched in", ["1930", "1942", "1945", "1919"], 1, "The movement was launched in August 1942."],
            ["Geography", "Easy", "The longest river flowing in India is", ["Yamuna", "Godavari", "Ganga", "Narmada"], 2, "Ganga is generally considered the longest river in India."],
            ["Science Tech", "Medium", "ISRO headquarters is in", ["Bengaluru", "Hyderabad", "Ahmedabad", "Pune"], 0, "ISRO headquarters is in Bengaluru."],
            ["Economy", "Hard", "GST was introduced in India in", ["2015", "2016", "2017", "2018"], 2, "GST was implemented from 1 July 2017."]
        ],
        Reasoning: [
            ["Analogy", "Easy", "Book is to reading as food is to", ["cooking", "eating", "buying", "serving"], 1, "Food is eaten just as a book is read."],
            ["Series", "Medium", "Find the next number: 3, 6, 12, 24, ?", ["30", "36", "48", "60"], 2, "Each term is doubled."],
            ["Coding-Decoding", "Hard", "If CAT is coded as 3120, then BAT is coded as", ["2120", "220", "221", "1202"], 0, "B=2, A=1, T=20."],
            ["Direction", "Medium", "A man faces north, turns right, then turns right again. He faces", ["north", "south", "east", "west"], 1, "Two right turns from north lead to south."],
            ["Blood Relation", "Easy", "My mother's brother is my", ["father", "uncle", "cousin", "nephew"], 1, "Mother's brother is uncle."],
            ["Odd One Out", "Easy", "Find the odd one: Circle, Square, Triangle, Bus", ["Circle", "Square", "Triangle", "Bus"], 3, "Bus is not a geometric figure."],
            ["Syllogism", "Hard", "All pens are tools. Some tools are blue. Conclusion: Some pens are blue.", ["definitely true", "definitely false", "cannot be determined", "none"], 2, "The statements do not prove any pen is blue."],
            ["Ranking", "Medium", "In a row of 25 students, A is 9th from left. Position from right is", ["15th", "16th", "17th", "18th"], 2, "Right position = 25 - 9 + 1 = 17."],
            ["Calendar", "Easy", "A leap year has how many days?", ["364", "365", "366", "367"], 2, "A leap year has 366 days."],
            ["Clock", "Medium", "Angle between hands at 3:00 is", ["30 degrees", "60 degrees", "90 degrees", "120 degrees"], 2, "At 3:00 the hands are perpendicular."]
        ],
        Computer: [
            ["Basics", "Easy", "CPU stands for", ["Central Process Unit", "Central Processing Unit", "Computer Primary Unit", "Control Processing Unit"], 1, "CPU means Central Processing Unit."],
            ["Hardware", "Easy", "Which of these is an input device?", ["Monitor", "Printer", "Keyboard", "Speaker"], 2, "Keyboard is used to input data."],
            ["Software", "Medium", "Windows is a type of", ["application software", "operating system", "programming language", "database"], 1, "Windows is an operating system."],
            ["Internet", "Medium", "WWW stands for", ["World Wide Web", "World Web Wide", "Web World Wide", "Wide World Web"], 0, "WWW means World Wide Web."],
            ["MS Office", "Hard", "Modern PowerPoint file extension is", [".docx", ".xlsx", ".pptx", ".txt"], 2, "PowerPoint presentations use .pptx."],
            ["Networking", "Hard", "LAN stands for", ["Large Area Network", "Local Area Network", "Live Area Network", "Linked Area Network"], 1, "LAN means Local Area Network."],
            ["Security", "Medium", "A strong password should include", ["only numbers", "only name", "mixed characters", "only lowercase"], 2, "Strong passwords use a mix of characters."],
            ["Memory", "Easy", "RAM is generally", ["permanent memory", "temporary memory", "optical memory", "printed memory"], 1, "RAM is volatile temporary memory."],
            ["Internet", "Medium", "Protocol used to receive email is", ["SMTP", "POP3 or IMAP", "HTTP", "FTP"], 1, "POP3 and IMAP are used for receiving emails."],
            ["Basics", "Hard", "Binary form of decimal 5 is", ["101", "110", "111", "100"], 0, "Decimal 5 is 101 in binary."]
        ]
    };

    function slug(value) {
        return String(value).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    }

    function makeQuestion(subject, seed, number) {
        const cycle = Math.floor((number - 1) / questionSeeds[subject].length);
        const questionText = cycle === 0 ? seed[2] : `${subject} practice item ${number}: ${seed[2]}`;
        return {
            id: `${slug(subject)}-q${String(number).padStart(3, "0")}`,
            subject,
            topic: seed[0],
            difficulty: seed[1],
            examTags: EXAM_TAGS[(number - 1) % EXAM_TAGS.length],
            question: questionText,
            options: seed[3],
            correctAnswer: seed[4],
            explanation: seed[5],
            source: `Subject Set ${Math.ceil(number / 10)}`,
            year: 2026,
            marks: 1,
            negativeMarks: 0.25
        };
    }

    function buildSubjectQuestions(subject) {
        const seeds = questionSeeds[subject] || [];
        const questions = [];
        for (let index = 0; index < 50; index += 1) {
            questions.push(makeQuestion(subject, seeds[index % seeds.length], index + 1));
        }
        return questions;
    }

    window.SARKARI_QUIZ = {
        subjects: SUBJECTS,
        questions: SUBJECTS.flatMap(buildSubjectQuestions)
    };
}());
