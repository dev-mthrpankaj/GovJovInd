(function () {
    "use strict";

    const subject = "General Science";
    const quizId = "general-science-bilingual-latex-set-1";
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
        q(1, "Physics", "[b]बल[/b] का SI मात्रक क्या है?", "What is the SI unit of [b]force[/b]?", [
            option("जूल", "Joule"),
            option("न्यूटन", "Newton"),
            option("वाट", "Watt"),
            option("पास्कल", "Pascal")
        ], 1, "बल का SI मात्रक न्यूटन है। सूत्र: \\(F=ma\\)।", "The SI unit of force is Newton. Formula: \\(F=ma\\)."),
        q(2, "Physics", "[b]कार्य[/b] का सूत्र क्या है?", "What is the formula of [b]work[/b]?", [
            option("\\(W=F\\times s\\)", "\\(W=F\\times s\\)"),
            option("\\(P=VI\\)", "\\(P=VI\\)"),
            option("\\(v=u+at\\)", "\\(v=u+at\\)"),
            option("\\(p=mv\\)", "\\(p=mv\\)")
        ], 0, "यदि बल और विस्थापन एक ही दिशा में हों, तो कार्य \\(W=F\\times s\\) होता है।", "When force and displacement are in the same direction, work is \\(W=F\\times s\\)."),
        q(3, "Chemistry", "[b]जल[/b] का रासायनिक सूत्र क्या है?", "What is the chemical formula of [b]water[/b]?", [
            option("\\(CO_2\\)", "\\(CO_2\\)"),
            option("\\(H_2O\\)", "\\(H_2O\\)"),
            option("\\(O_2\\)", "\\(O_2\\)"),
            option("\\(NaCl\\)", "\\(NaCl\\)")
        ], 1, "जल का रासायनिक सूत्र \\(H_2O\\) है।", "The chemical formula of water is \\(H_2O\\)."),
        q(4, "Biology", "[b]मानव रक्त[/b] में ऑक्सीजन का परिवहन मुख्यतः किसके द्वारा होता है?", "In [b]human blood[/b], oxygen is mainly transported by which substance?", [
            option("प्लाज्मा", "Plasma"),
            option("हीमोग्लोबिन", "Haemoglobin"),
            option("प्लेटलेट्स", "Platelets"),
            option("लसीका", "Lymph")
        ], 1, "हीमोग्लोबिन लाल रक्त कणिकाओं में पाया जाता है और ऑक्सीजन का परिवहन करता है।", "Haemoglobin is present in red blood cells and transports oxygen."),
        q(5, "Chemistry", "[b]सामान्य नमक[/b] का रासायनिक नाम क्या है?", "What is the chemical name of [b]common salt[/b]?", [
            option("सोडियम कार्बोनेट", "Sodium carbonate"),
            option("सोडियम क्लोराइड", "Sodium chloride"),
            option("कैल्शियम कार्बोनेट", "Calcium carbonate"),
            option("पोटैशियम नाइट्रेट", "Potassium nitrate")
        ], 1, "सामान्य नमक का रासायनिक नाम सोडियम क्लोराइड है और सूत्र \\(NaCl\\) है।", "Common salt is sodium chloride with formula \\(NaCl\\)."),
        q(6, "Biology", "[b]प्रकाश संश्लेषण[/b] में पौधे कौन-सी गैस ग्रहण करते हैं?", "Which gas do plants take in during [b]photosynthesis[/b]?", [
            option("ऑक्सीजन", "Oxygen"),
            option("नाइट्रोजन", "Nitrogen"),
            option("कार्बन डाइऑक्साइड", "Carbon dioxide"),
            option("हाइड्रोजन", "Hydrogen")
        ], 2, "प्रकाश संश्लेषण में पौधे \\(CO_2\\) ग्रहण करते हैं और ऑक्सीजन छोड़ते हैं।", "During photosynthesis, plants take in \\(CO_2\\) and release oxygen."),
        q(7, "Physics", "[b]विद्युत धारा[/b] का SI मात्रक क्या है?", "What is the SI unit of [b]electric current[/b]?", [
            option("वोल्ट", "Volt"),
            option("एम्पियर", "Ampere"),
            option("ओम", "Ohm"),
            option("कूलॉम", "Coulomb")
        ], 1, "विद्युत धारा का SI मात्रक एम्पियर है।", "The SI unit of electric current is Ampere."),
        q(8, "Chemistry", "[b]अम्ल[/b] नीले लिटमस पेपर को किस रंग में बदलते हैं?", "[b]Acids[/b] turn blue litmus paper into which colour?", [
            option("नीला", "Blue"),
            option("लाल", "Red"),
            option("हरा", "Green"),
            option("पीला", "Yellow")
        ], 1, "अम्ल नीले लिटमस को लाल कर देते हैं।", "Acids turn blue litmus red."),
        q(9, "Biology", "[b]मानव शरीर[/b] की सबसे बड़ी ग्रंथि कौन-सी है?", "Which is the largest gland in the [b]human body[/b]?", [
            option("यकृत", "Liver"),
            option("अग्न्याशय", "Pancreas"),
            option("पीयूष ग्रंथि", "Pituitary gland"),
            option("थायरॉयड", "Thyroid")
        ], 0, "यकृत मानव शरीर की सबसे बड़ी ग्रंथि है।", "The liver is the largest gland in the human body."),
        q(10, "Physics", "[b]ओम का नियम[/b] किस रूप में लिखा जाता है?", "How is [b]Ohm's law[/b] written?", [
            option("\\(V=IR\\)", "\\(V=IR\\)"),
            option("\\(F=ma\\)", "\\(F=ma\\)"),
            option("\\(P=\\frac{W}{t}\\)", "\\(P=\\frac{W}{t}\\)"),
            option("\\(E=mc^2\\)", "\\(E=mc^2\\)")
        ], 0, "ओम के नियम के अनुसार विभवांतर \\(V\\), धारा \\(I\\) और प्रतिरोध \\(R\\) का संबंध \\(V=IR\\) है।", "According to Ohm's law, the relation between voltage \\(V\\), current \\(I\\), and resistance \\(R\\) is \\(V=IR\\).")
    ];

    window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];
    window.GJU_QUIZ_BANK.push({
        id: quizId,
        subject,
        title: "General Science Bilingual LaTeX Set 1",
        description: "Hindi-English bilingual General Science quiz with Physics, Chemistry and Biology questions in MathJax-safe format.",
        durationMinutes: 10,
        totalQuestions: questions.length,
        marksPerQuestion: 1,
        negativeMarks: 0.25,
        difficulty: "Moderate",
        tags: ["General Science", "Bilingual", "Physics", "Chemistry", "Biology"],
        questions
    });
}());
