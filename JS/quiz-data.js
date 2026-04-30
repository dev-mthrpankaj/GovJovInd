(function () {
    const examCycle = [
        ['SSC', 'Railway'],
        ['Police', 'State Exams'],
        ['Banking', 'SSC'],
        ['UPSC', 'State Exams'],
        ['Railway', 'Police'],
        ['SSC', 'Banking']
    ];

    function makeQuestion(subject, topic, difficulty, question, options, correctAnswer, explanation, index) {
        return {
            id: `${subject.replace(/\s+/g, '-').toLowerCase()}-${index}`,
            subject,
            topic,
            difficulty,
            examTags: examCycle[index % examCycle.length],
            question,
            options,
            correctAnswer,
            explanation,
            source: `Practice Set ${Math.ceil(index / 5)}`,
            year: 2024,
            marks: 1,
            negativeMarks: 0.25
        };
    }

    const data = {
        Mathematics: [
            ['Arithmetic', 'easy', 'What is 25% of 240?', ['40', '50', '60', '80'], 2, '25% is one-fourth. One-fourth of 240 is 60.'],
            ['Profit and Loss', 'medium', 'An item bought for 800 is sold for 920. What is the profit percent?', ['12%', '15%', '18%', '20%'], 1, 'Profit is 120. Profit percent = 120/800 x 100 = 15%.'],
            ['Number System', 'easy', 'LCM of 18 and 24 is', ['48', '54', '72', '96'], 2, '18 = 2 x 3 x 3 and 24 = 2 x 2 x 2 x 3. LCM is 72.'],
            ['Time and Work', 'medium', 'A can complete a work in 12 days and B in 18 days. Together they finish it in', ['6.2 days', '7.2 days', '8 days', '9 days'], 1, 'Combined work per day = 1/12 + 1/18 = 5/36, so time = 36/5 = 7.2 days.'],
            ['Percentage', 'easy', 'If 40% of a number is 160, the number is', ['320', '360', '400', '420'], 2, 'Number = 160 x 100 / 40 = 400.'],
            ['Simple Interest', 'medium', 'Simple interest on 5000 at 8% per annum for 2 years is', ['600', '700', '800', '900'], 2, 'SI = PRT/100 = 5000 x 8 x 2 / 100 = 800.'],
            ['Ratio', 'easy', 'The ratio 24:36 in simplest form is', ['2:3', '3:4', '4:5', '5:6'], 0, 'Divide both terms by 12 to get 2:3.'],
            ['Average', 'medium', 'Average of 12, 18, 20, 30 and 40 is', ['22', '24', '26', '28'], 1, 'Sum is 120 and count is 5. Average is 24.'],
            ['Geometry', 'easy', 'Sum of interior angles of a triangle is', ['90 degrees', '180 degrees', '270 degrees', '360 degrees'], 1, 'Every triangle has angle sum of 180 degrees.'],
            ['Mensuration', 'medium', 'Area of a rectangle with length 15 cm and breadth 8 cm is', ['96 sq cm', '110 sq cm', '120 sq cm', '128 sq cm'], 2, 'Area = length x breadth = 15 x 8 = 120 sq cm.'],
            ['Algebra', 'medium', 'If 3x + 7 = 28, then x is', ['5', '6', '7', '8'], 2, '3x = 21, so x = 7.'],
            ['Speed Time Distance', 'hard', 'A train covers 360 km in 4 hours. Its speed is', ['80 km/h', '85 km/h', '90 km/h', '95 km/h'], 2, 'Speed = distance/time = 360/4 = 90 km/h.'],
            ['Data Interpretation', 'hard', 'If total marks are 500 and a candidate scores 365, percentage is', ['70%', '72%', '73%', '75%'], 2, 'Percentage = 365/500 x 100 = 73%.'],
            ['Number System', 'hard', 'The smallest number divisible by 8, 12 and 15 is', ['120', '180', '240', '360'], 0, 'LCM of 8, 12 and 15 is 120.'],
            ['Mixture', 'hard', 'Milk and water are in ratio 3:2. In 25 litres mixture, milk is', ['10 L', '12 L', '15 L', '18 L'], 2, 'Milk share = 3/5 of 25 = 15 litres.']
        ],
        English: [
            ['Grammar', 'easy', 'Choose the correct sentence.', ['He go to school.', 'He goes to school.', 'He going school.', 'He gone school.'], 1, 'Singular subject he takes the verb goes.'],
            ['Vocabulary', 'easy', 'Synonym of rapid is', ['slow', 'quick', 'late', 'weak'], 1, 'Rapid means quick or fast.'],
            ['Article', 'medium', 'She is ___ honest officer.', ['a', 'an', 'the', 'no article'], 1, 'Honest starts with a vowel sound, so an is used.'],
            ['Error Spotting', 'medium', 'Find the error: Each of the players have a kit.', ['Each of', 'the players', 'have a kit', 'No error'], 2, 'Each takes a singular verb: has.'],
            ['Antonym', 'easy', 'Antonym of expand is', ['increase', 'stretch', 'contract', 'spread'], 2, 'Contract is the opposite of expand.'],
            ['Tense', 'medium', 'I ___ him yesterday.', ['meet', 'met', 'meeting', 'meets'], 1, 'Yesterday indicates past tense, so met is correct.'],
            ['Voice', 'hard', 'Passive voice of "They completed the work" is', ['The work completed them.', 'The work was completed by them.', 'They were completed by work.', 'The work is completing.'], 1, 'Simple past passive uses was/were + past participle.'],
            ['Idiom', 'medium', 'At the eleventh hour means', ['very early', 'at the last moment', 'at 11 AM', 'after lunch'], 1, 'The idiom means at the last possible moment.'],
            ['Preposition', 'easy', 'He is good ___ mathematics.', ['in', 'at', 'on', 'by'], 1, 'Good at is the correct phrase.'],
            ['One Word', 'medium', 'A person who writes poems is a', ['novelist', 'poet', 'editor', 'actor'], 1, 'A poet writes poems.'],
            ['Spelling', 'easy', 'Choose the correctly spelt word.', ['Accomodate', 'Acommodate', 'Accommodate', 'Acomodate'], 2, 'Accommodate has double c and double m.'],
            ['Cloze', 'hard', 'Select the best word: Discipline is the key to ___ in exams.', ['success', 'noise', 'delay', 'excuse'], 0, 'Success fits the sentence meaning.'],
            ['Sentence Improvement', 'hard', 'Neither Ram nor Shyam ___ present.', ['are', 'were', 'is', 'be'], 2, 'The verb agrees with the nearest singular subject Shyam.'],
            ['Vocabulary', 'hard', 'Meaning of benevolent is', ['kind', 'angry', 'careless', 'silent'], 0, 'Benevolent means kind and helpful.'],
            ['Grammar', 'medium', 'Choose the correct form: The news ___ true.', ['are', 'is', 'were', 'be'], 1, 'News is treated as singular.']
        ],
        Reasoning: [
            ['Analogy', 'easy', 'Book is to reading as food is to', ['cooking', 'eating', 'buying', 'serving'], 1, 'Food is eaten just as a book is read.'],
            ['Series', 'medium', 'Find the next number: 3, 6, 12, 24, ?', ['30', '36', '48', '60'], 2, 'Each term is doubled.'],
            ['Coding-Decoding', 'hard', 'If CAT is coded as 3120, then BAT is coded as', ['2120', '220', '221', '1202'], 0, 'B=2, A=1, T=20.'],
            ['Direction', 'medium', 'A man faces north, turns right, then turns right again. He faces', ['north', 'south', 'east', 'west'], 1, 'Two right turns from north lead to south.'],
            ['Blood Relation', 'easy', "My mother's brother is my", ['father', 'uncle', 'cousin', 'nephew'], 1, "Mother's brother is uncle."],
            ['Odd One Out', 'easy', 'Find the odd one: Circle, Square, Triangle, Bus', ['Circle', 'Square', 'Triangle', 'Bus'], 3, 'Bus is not a geometric figure.'],
            ['Syllogism', 'hard', 'All pens are tools. Some tools are blue. Conclusion: Some pens are blue.', ['definitely true', 'definitely false', 'cannot be determined', 'none'], 2, 'The statements do not prove any pen is blue.'],
            ['Ranking', 'medium', 'In a row of 25 students, A is 9th from left. Position from right is', ['15th', '16th', '17th', '18th'], 2, 'Right position = 25 - 9 + 1 = 17.'],
            ['Calendar', 'easy', 'A leap year has how many days?', ['364', '365', '366', '367'], 2, 'A leap year has 366 days.'],
            ['Clock', 'medium', 'Angle between hands at 3:00 is', ['30 degrees', '60 degrees', '90 degrees', '120 degrees'], 2, 'At 3:00 the hands are perpendicular.'],
            ['Series', 'hard', 'Find the next term: A, C, F, J, O, ?', ['S', 'T', 'U', 'V'], 2, 'Gaps are +2, +3, +4, +5, so next is +6 = U.'],
            ['Puzzles', 'hard', 'If yesterday was Monday, the day after tomorrow will be', ['Wednesday', 'Thursday', 'Friday', 'Saturday'], 1, 'If yesterday was Monday, today is Tuesday and day after tomorrow is Thursday.'],
            ['Analogy', 'medium', 'Doctor : Hospital :: Teacher : ?', ['Court', 'School', 'Bank', 'Market'], 1, 'Teacher works in a school.'],
            ['Coding-Decoding', 'medium', 'If DELHI is written as EFMKJ, how is PATNA written?', ['QBUOB', 'QZUOB', 'QBUOZ', 'OZSMZ'], 0, 'Each letter is shifted by +1.'],
            ['Venn Diagram', 'easy', 'Which relation best fits: roses, flowers, plants?', ['all separate', 'roses inside flowers inside plants', 'plants inside roses', 'flowers outside plants'], 1, 'Roses are flowers and flowers are plants.']
        ],
        'General Awareness': [
            ['Polity', 'easy', 'Constitution Day in India is observed on', ['26 January', '15 August', '26 November', '2 October'], 2, 'Constitution Day is observed on 26 November.'],
            ['History', 'medium', 'Who founded the Maurya Empire?', ['Ashoka', 'Chandragupta Maurya', 'Bindusara', 'Harsha'], 1, 'Chandragupta Maurya founded the Maurya Empire.'],
            ['Geography', 'easy', 'The capital of Rajasthan is', ['Jodhpur', 'Udaipur', 'Jaipur', 'Kota'], 2, 'Jaipur is the capital of Rajasthan.'],
            ['Economy', 'medium', 'RBI headquarters is located in', ['Delhi', 'Mumbai', 'Kolkata', 'Chennai'], 1, 'The Reserve Bank of India headquarters is in Mumbai.'],
            ['Current Affairs', 'medium', 'The G20 Summit 2023 hosted by India was held in', ['Mumbai', 'New Delhi', 'Goa', 'Jaipur'], 1, 'The main summit was held in New Delhi.'],
            ['Polity', 'hard', 'Fundamental Duties are mentioned in which part of the Constitution?', ['Part III', 'Part IV', 'Part IVA', 'Part V'], 2, 'Fundamental Duties are in Part IVA.'],
            ['History', 'medium', 'Quit India Movement was launched in', ['1930', '1942', '1945', '1919'], 1, 'The movement was launched in August 1942.'],
            ['Geography', 'easy', 'The longest river flowing in India is', ['Yamuna', 'Godavari', 'Ganga', 'Narmada'], 2, 'Ganga is generally considered the longest river in India.'],
            ['Science Tech', 'medium', 'ISRO headquarters is in', ['Bengaluru', 'Hyderabad', 'Ahmedabad', 'Pune'], 0, 'ISRO headquarters is in Bengaluru.'],
            ['Economy', 'hard', 'GST was introduced in India in', ['2015', '2016', '2017', '2018'], 2, 'GST was implemented from 1 July 2017.'],
            ['Awards', 'easy', 'Bharat Ratna is India\'s', ['highest civilian award', 'sports award', 'military award', 'film award'], 0, 'Bharat Ratna is the highest civilian award.'],
            ['Polity', 'medium', 'The Lok Sabha is also known as', ['Council of States', 'House of the People', 'Upper House', 'State Assembly'], 1, 'Lok Sabha is the House of the People.'],
            ['Geography', 'hard', 'The Tropic of Cancer passes through how many Indian states?', ['6', '7', '8', '9'], 2, 'It passes through 8 Indian states.'],
            ['History', 'hard', 'The Battle of Plassey was fought in', ['1757', '1764', '1857', '1707'], 0, 'The Battle of Plassey was fought in 1757.'],
            ['Current Affairs', 'easy', 'NITI Aayog replaced which institution?', ['RBI', 'Planning Commission', 'Finance Commission', 'Election Commission'], 1, 'NITI Aayog replaced the Planning Commission.']
        ],
        Science: [
            ['Physics', 'easy', 'SI unit of force is', ['Joule', 'Newton', 'Pascal', 'Watt'], 1, 'Force is measured in Newton.'],
            ['Chemistry', 'easy', 'Chemical formula of water is', ['H2O', 'CO2', 'O2', 'NaCl'], 0, 'Water is H2O.'],
            ['Biology', 'medium', 'Powerhouse of the cell is', ['Nucleus', 'Mitochondria', 'Ribosome', 'Golgi body'], 1, 'Mitochondria produce energy in the cell.'],
            ['Physics', 'hard', 'Speed of light in vacuum is approximately', ['3 x 10^8 m/s', '3 x 10^6 m/s', '1.5 x 10^8 m/s', '3 x 10^5 m/s'], 0, 'The speed of light is about 3 x 10^8 m/s.'],
            ['Chemistry', 'medium', 'pH of a neutral solution is', ['0', '7', '10', '14'], 1, 'Neutral solution has pH 7.'],
            ['Biology', 'easy', 'Human blood is red due to', ['chlorophyll', 'hemoglobin', 'plasma', 'calcium'], 1, 'Hemoglobin gives blood its red color.'],
            ['Physics', 'medium', 'Current is measured by', ['voltmeter', 'ammeter', 'barometer', 'thermometer'], 1, 'Ammeter measures electric current.'],
            ['Chemistry', 'medium', 'Gas used by plants in photosynthesis is', ['oxygen', 'nitrogen', 'carbon dioxide', 'hydrogen'], 2, 'Plants use carbon dioxide during photosynthesis.'],
            ['Biology', 'medium', 'Largest organ of the human body is', ['liver', 'heart', 'skin', 'lungs'], 2, 'Skin is the largest organ.'],
            ['Environment', 'hard', 'Ozone layer mainly absorbs', ['infrared rays', 'ultraviolet rays', 'visible light', 'radio waves'], 1, 'The ozone layer absorbs harmful UV radiation.'],
            ['Physics', 'easy', 'A device used to measure atmospheric pressure is', ['barometer', 'ammeter', 'speedometer', 'hygrometer'], 0, 'Barometer measures atmospheric pressure.'],
            ['Chemistry', 'hard', 'Common salt is chemically known as', ['sodium chloride', 'sodium carbonate', 'calcium chloride', 'potassium nitrate'], 0, 'Common salt is sodium chloride.'],
            ['Biology', 'hard', 'Deficiency of vitamin C causes', ['rickets', 'scurvy', 'night blindness', 'anemia'], 1, 'Vitamin C deficiency causes scurvy.'],
            ['Environment', 'medium', 'The main cause of acid rain is', ['oxygen', 'sulphur dioxide and nitrogen oxides', 'helium', 'argon'], 1, 'SO2 and NOx form acids in the atmosphere.'],
            ['Physics', 'medium', 'Unit of electric power is', ['volt', 'watt', 'ohm', 'ampere'], 1, 'Electric power is measured in watt.']
        ],
        Hindi: [
            ['Vyakaran', 'easy', '"Ram" kis prakar ki sangya hai?', ['Jativachak', 'Vyaktivachak', 'Bhavvachak', 'Samuhvachak'], 1, 'Ram kisi vishesh vyakti ka naam hai.'],
            ['Paryayvachi', 'medium', '"Jal" ka paryayvachi shabd hai', ['Agni', 'Vayu', 'Neer', 'Dhara'], 2, 'Jal ka paryayvachi neer hota hai.'],
            ['Vilom', 'easy', '"Din" ka vilom hai', ['Raat', 'Suraj', 'Samay', 'Dopahar'], 0, 'Din ka vipreet raat hai.'],
            ['Muhavare', 'hard', '"Naak katna" ka arth hai', ['Ghayal hona', 'Apmaan hona', 'Bimar hona', 'Gir jana'], 1, 'Naak katna ka arth apmaan hona hai.'],
            ['Shuddh Vartani', 'medium', 'Sahi shabd chuniye', ['Vidhyalay', 'Vidyalaya', 'Viddyalay', 'Vidhalaay'], 1, 'Sahi vartani Vidyalaya hai.'],
            ['Sandhi', 'hard', '"Devalaya" mein kaunsi sandhi hai?', ['Gun', 'Vriddhi', 'Yan', 'Dirgh'], 0, 'Dev + Alaya mein gun sandhi hoti hai.'],
            ['Samas', 'medium', '"Rajputra" ka samas hai', ['Karmadharaya', 'Tatpurush', 'Dvandva', 'Bahuvrihi'], 1, 'Raja ka putra arth mein tatpurush samas hai.'],
            ['Vyakaran', 'easy', '"Main school jata hun" mein kriya pad hai', ['Main', 'School', 'Jata hun', 'Mein'], 2, 'Jata hun kriya pad hai.'],
            ['Lokokti', 'hard', '"Oont ke muh mein jeera" ka arth hai', ['Bahut adhik', 'Bahut kam', 'Bahut teekha', 'Bahut meetha'], 1, 'Iska arth avashyakta ki tulna mein bahut kam hai.'],
            ['Alankar', 'medium', 'Ek hi varna ki punaravritti ka alankar hai', ['Anupras', 'Upma', 'Rupak', 'Yamak'], 0, 'Anupras alankar mein varna punaravritti hoti hai.'],
            ['Vilom', 'easy', '"Sukh" ka vilom hai', ['Dukh', 'Hasya', 'Prem', 'Laabh'], 0, 'Sukh ka vipreet dukh hai.'],
            ['Paryayvachi', 'medium', '"Surya" ka paryayvachi hai', ['Chandra', 'Ravi', 'Vayu', 'Prithvi'], 1, 'Surya ka paryayvachi Ravi hai.'],
            ['Vachan', 'easy', '"Ladka" ka bahuvachan hai', ['Ladki', 'Ladke', 'Ladkaon', 'Ladkana'], 1, 'Ladka ka bahuvachan ladke hai.'],
            ['Karak', 'hard', '"Ram ne khana khaya" mein "ne" ka karak hai', ['Karta', 'Karm', 'Karan', 'Sampradan'], 0, 'Ne karta karak ka chihn hai.'],
            ['Vyakaran', 'medium', 'Hindi varnamala mein swar kitne mane jate hain?', ['9', '11', '13', '15'], 1, 'Samanya roop se 11 swar mane jate hain.']
        ],
        Computer: [
            ['Basics', 'easy', 'CPU stands for', ['Central Process Unit', 'Central Processing Unit', 'Computer Primary Unit', 'Control Processing Unit'], 1, 'CPU means Central Processing Unit.'],
            ['Hardware', 'easy', 'Which of these is an input device?', ['Monitor', 'Printer', 'Keyboard', 'Speaker'], 2, 'Keyboard is used to input data.'],
            ['Software', 'medium', 'Windows is a type of', ['application software', 'operating system', 'programming language', 'database'], 1, 'Windows is an operating system.'],
            ['Internet', 'medium', 'WWW stands for', ['World Wide Web', 'World Web Wide', 'Web World Wide', 'Wide World Web'], 0, 'WWW means World Wide Web.'],
            ['MS Office', 'hard', 'Modern PowerPoint file extension is', ['.docx', '.xlsx', '.pptx', '.txt'], 2, 'PowerPoint presentations use .pptx.'],
            ['Networking', 'hard', 'LAN stands for', ['Large Area Network', 'Local Area Network', 'Live Area Network', 'Linked Area Network'], 1, 'LAN means Local Area Network.'],
            ['Security', 'medium', 'A strong password should include', ['only numbers', 'only name', 'mixed characters', 'only lowercase'], 2, 'Strong passwords use a mix of characters.'],
            ['Memory', 'easy', 'RAM is generally', ['permanent memory', 'temporary memory', 'optical memory', 'printed memory'], 1, 'RAM is volatile temporary memory.'],
            ['Internet', 'medium', 'Protocol used to receive email is', ['SMTP', 'POP3 or IMAP', 'HTTP', 'FTP'], 1, 'POP3 and IMAP are used for receiving emails.'],
            ['Basics', 'hard', 'Binary form of decimal 5 is', ['101', '110', '111', '100'], 0, 'Decimal 5 is 101 in binary.'],
            ['Hardware', 'easy', 'Which device displays output?', ['Mouse', 'Scanner', 'Monitor', 'Microphone'], 2, 'Monitor is an output device.'],
            ['Software', 'medium', 'MS Excel is mainly used for', ['spreadsheets', 'painting', 'video calling', 'web hosting'], 0, 'Excel is spreadsheet software.'],
            ['Security', 'hard', 'Malware means', ['safe software', 'malicious software', 'system update', 'keyboard shortcut'], 1, 'Malware is malicious software.'],
            ['Networking', 'medium', 'IP address is used to identify', ['a network device', 'a printer cable', 'a folder', 'a font'], 0, 'IP address identifies a device on a network.'],
            ['Internet', 'easy', 'A web browser is used to', ['browse websites', 'print currency', 'charge battery', 'scan virus only'], 0, 'Browsers are used to access websites.']
        ]
    };

    window.SARKARI_QUIZ = {
        subjects: Object.keys(data),
        categories: ['SSC', 'Railway', 'Police', 'Banking', 'UPSC', 'State Exams'],
        questions: Object.entries(data).flatMap(([subject, rows]) =>
            rows.map((row, index) => makeQuestion(subject, row[0], row[1], row[2], row[3], row[4], row[5], index + 1))
        )
    };
})();
