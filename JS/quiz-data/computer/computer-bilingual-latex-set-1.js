(function () {
    "use strict";

    const subject = "Computer";
    const quizId = "computer-bilingual-latex-set-1";
    const text = (hi, en) => ({ hi, en });
    const option = (hi, en) => ({ text: text(hi, en) });
    const q = (number, topic, questionHi, questionEn, options, correctAnswer, explanationHi, explanationEn) => ({
        id: `${quizId}-q${String(number).padStart(2, "0")}`,
        subject,
        topic,
        difficulty: "Moderate",
        question: questionEn,
        questionTextMap: text(questionHi, questionEn),
        options,
        correctAnswer,
        explanation: explanationEn,
        explanationTextMap: text(explanationHi, explanationEn),
        marks: 1,
        negativeMarks: 0.25
    });

    const questions = [
        q(1, "Computer Fundamentals", "[b]CPU[/b] का पूर्ण रूप क्या है?", "What is the full form of [b]CPU[/b]?", [
            option("Central Processing Unit", "Central Processing Unit"),
            option("Central Program Unit", "Central Program Unit"),
            option("Control Processing Utility", "Control Processing Utility"),
            option("Computer Personal Unit", "Computer Personal Unit")
        ], 0, "CPU का पूर्ण रूप Central Processing Unit है।", "CPU stands for Central Processing Unit."),
        q(2, "Memory", "[b]RAM[/b] किस प्रकार की मेमोरी है?", "[b]RAM[/b] is which type of memory?", [
            option("स्थायी मेमोरी", "Permanent memory"),
            option("अस्थायी/वोलाटाइल मेमोरी", "Temporary/volatile memory"),
            option("केवल पढ़ने वाली मेमोरी", "Read-only memory"),
            option("ऑप्टिकल मेमोरी", "Optical memory")
        ], 1, "RAM volatile memory है; बिजली बंद होने पर इसका डेटा सामान्यतः मिट जाता है।", "RAM is volatile memory; its data is generally lost when power is turned off."),
        q(3, "Data Units", "[b]एक byte[/b] में कितने bits होते हैं?", "How many bits are there in [b]one byte[/b]?", [
            option("\\(4\\)", "\\(4\\)"),
            option("\\(8\\)", "\\(8\\)"),
            option("\\(16\\)", "\\(16\\)"),
            option("\\(32\\)", "\\(32\\)")
        ], 1, "एक byte में \\(8\\) bits होते हैं।", "One byte contains \\(8\\) bits."),
        q(4, "Networking", "[b]HTTP[/b] का उपयोग मुख्यतः किसके लिए होता है?", "What is [b]HTTP[/b] mainly used for?", [
            option("वेब पेजों के संचार के लिए", "Communication of web pages"),
            option("चित्र संपादन के लिए", "Image editing"),
            option("फाइलों को संपीड़ित करने के लिए", "Compressing files"),
            option("प्रिंटर की गति बढ़ाने के लिए", "Increasing printer speed")
        ], 0, "HTTP वेब पर client और server के बीच hypertext data transfer के लिए protocol है।", "HTTP is a protocol for hypertext data transfer between client and server on the web."),
        q(5, "Software", "[b]Operating System[/b] का मुख्य कार्य क्या है?", "What is the main function of an [b]Operating System[/b]?", [
            option("हार्डवेयर और सॉफ्टवेयर संसाधनों का प्रबंधन", "Managing hardware and software resources"),
            option("केवल चित्र बनाना", "Only drawing images"),
            option("केवल वायरस बनाना", "Only creating viruses"),
            option("मॉनिटर को बिजली देना", "Supplying power to monitor")
        ], 0, "Operating System hardware, software, files, memory और processes का प्रबंधन करता है।", "An Operating System manages hardware, software, files, memory, and processes."),
        q(6, "Internet", "[b]URL[/b] का पूर्ण रूप क्या है?", "What is the full form of [b]URL[/b]?", [
            option("Uniform Resource Locator", "Uniform Resource Locator"),
            option("Universal Record Link", "Universal Record Link"),
            option("Uniform Read Line", "Uniform Read Line"),
            option("User Resource Login", "User Resource Login")
        ], 0, "URL का पूर्ण रूप Uniform Resource Locator है।", "URL stands for Uniform Resource Locator."),
        q(7, "Binary", "[b]बाइनरी संख्या प्रणाली[/b] में कौन-कौन से अंक होते हैं?", "Which digits are used in the [b]binary number system[/b]?", [
            option("\\(0\\) और \\(1\\)", "\\(0\\) and \\(1\\)"),
            option("\\(1\\) और \\(2\\)", "\\(1\\) and \\(2\\)"),
            option("\\(0\\) से \\(9\\)", "\\(0\\) to \\(9\\)"),
            option("\\(A\\) से \\(F\\)", "\\(A\\) to \\(F\\)")
        ], 0, "Binary system base \\(2\\) पर आधारित है और इसमें केवल \\(0\\) तथा \\(1\\) का प्रयोग होता है।", "The binary system has base \\(2\\) and uses only \\(0\\) and \\(1\\)."),
        q(8, "Cyber Security", "[b]Malware[/b] क्या है?", "What is [b]Malware[/b]?", [
            option("हानिकारक सॉफ्टवेयर", "Malicious software"),
            option("कानूनी दस्तावेज", "Legal document"),
            option("इनपुट डिवाइस", "Input device"),
            option("प्रिंटर का भाग", "Part of a printer")
        ], 0, "Malware ऐसा software होता है जिसे system को नुकसान पहुँचाने, data चुराने या unauthorized access के लिए बनाया जाता है।", "Malware is software designed to damage a system, steal data, or gain unauthorized access."),
        q(9, "Hardware", "[b]Keyboard[/b] किस प्रकार का device है?", "What type of device is a [b]keyboard[/b]?", [
            option("Input device", "Input device"),
            option("Output device", "Output device"),
            option("Storage device", "Storage device"),
            option("Processing device", "Processing device")
        ], 0, "Keyboard computer में data और commands देने के लिए input device है।", "A keyboard is an input device used to enter data and commands into a computer."),
        q(10, "Storage", "[b]SSD[/b] का पूर्ण रूप क्या है?", "What is the full form of [b]SSD[/b]?", [
            option("Solid State Drive", "Solid State Drive"),
            option("System Storage Disk", "System Storage Disk"),
            option("Software Service Device", "Software Service Device"),
            option("Secure System Data", "Secure System Data")
        ], 0, "SSD का पूर्ण रूप Solid State Drive है।", "SSD stands for Solid State Drive.")
    ];

    window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];
    window.GJU_QUIZ_BANK.push({
        id: quizId,
        subject,
        title: "Computer Bilingual LaTeX Set 1",
        description: "Hindi-English bilingual Computer fundamentals quiz with rich-text and MathJax-safe formatting.",
        durationMinutes: 10,
        totalQuestions: questions.length,
        marksPerQuestion: 1,
        negativeMarks: 0.25,
        difficulty: "Moderate",
        tags: ["Computer", "Bilingual", "Fundamentals", "Internet", "Cyber Security"],
        questions
    });
}());
