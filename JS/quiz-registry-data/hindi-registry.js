(function () {
    "use strict";

    const helpers = window.GJU_QUIZ_REGISTRY_HELPERS;
    if (!helpers) return;

    const { createHindiSeries, registerSubjectQuizzes } = helpers;

    registerSubjectQuizzes([
        ...createHindiSeries("hindi-mixed-grammar-gk-set", 4, "मिश्रित हिंदी व्याकरण व सामान्य ज्ञान"),
        ...createHindiSeries("hindi-varnmala-practice-set", 3, "हिंदी वर्णमाला"),
        ...createHindiSeries("hindi-muhavare-upsi-pcs-set", 1, "मुहावरे"),
        ...createHindiSeries("hindi-alankar-upsi-set", 1, "अलंकार"),
        ...createHindiSeries("hindi-vyakaran-set", 1, "हिंदी व्याकरण", "Mixed"),
        ...createHindiSeries("hindi-mixed-set", 1, "मिश्रित हिंदी अभ्यास", "Mixed"),
        ...createHindiSeries("hindi-bharatiya-bhashayen-up-police-set", 2, "हिंदी और अन्य भारतीय भाषाएं"),
        ...createHindiSeries("hindi-varnmala-up-police-set", 3, "हिंदी वर्णमाला"),
        ...createHindiSeries("hindi-tadbhav-up-police-set", 3, "तद्भव शब्द"),
        ...createHindiSeries("hindi-tatsam-up-police-set", 3, "तत्सम शब्द"),
        ...createHindiSeries("hindi-paryayvachi-up-police-set", 4, "पर्यायवाची शब्द"),
        ...createHindiSeries("hindi-vilom-up-police-set", 4, "विलोम शब्द"),
        ...createHindiSeries("hindi-anekarthak-up-police-set", 2, "अनेकार्थक शब्द"),
        ...createHindiSeries("hindi-one-word-up-police-set", 3, "वाक्यांश के लिए एक शब्द"),
        ...createHindiSeries("hindi-samroopi-bhinnarthak-up-police-set", 2, "समरूपी भिन्नार्थक शब्द"),
        ...createHindiSeries("hindi-vakya-shuddhi-up-police-set", 4, "वाक्य शुद्धि"),
        ...createHindiSeries("hindi-ling-up-police-set", 2, "लिंग"),
        ...createHindiSeries("hindi-vachan-up-police-set", 2, "वचन"),
        ...createHindiSeries("hindi-karak-up-police-set", 2, "कारक"),
        ...createHindiSeries("hindi-sarvanam-up-police-set", 2, "सर्वनाम"),
        ...createHindiSeries("hindi-visheshan-up-police-set", 2, "विशेषण"),
        ...createHindiSeries("hindi-kriya-kaal-up-police-set", 3, "क्रिया काल"),
        ...createHindiSeries("hindi-vachya-up-police-set", 2, "वाच्य"),
        ...createHindiSeries("hindi-avyay-up-police-set", 2, "अव्यय"),
        ...createHindiSeries("hindi-upsarg-up-police-set", 3, "उपसर्ग"),
        ...createHindiSeries("hindi-pratyay-up-police-set", 3, "प्रत्यय"),
        ...createHindiSeries("hindi-sandhi-up-police-set", 4, "संधि"),
        ...createHindiSeries("hindi-samas-up-police-set", 4, "समास"),
        ...createHindiSeries("hindi-viram-chinh-up-police-set", 2, "विराम चिह्न"),
        ...createHindiSeries("hindi-muhavare-lokoktiyan-up-police-set", 4, "मुहावरे एवं लोकोक्तियां"),
        ...createHindiSeries("hindi-ras-up-police-set", 2, "रस"),
        ...createHindiSeries("hindi-chhand-up-police-set", 2, "छंद"),
        ...createHindiSeries("hindi-alankar-up-police-set", 3, "अलंकार"),
        ...createHindiSeries("hindi-apathit-bodh-up-police-set", 3, "अपठित बोध"),
        ...createHindiSeries("hindi-prasiddh-kavi-up-police-set", 2, "प्रसिद्ध कवि"),
        ...createHindiSeries("hindi-lekhak-rachnaye-up-police-set", 3, "लेखक एवं प्रमुख रचनाएं"),
        ...createHindiSeries("hindi-bhasha-puraskar-up-police-set", 2, "हिंदी भाषा में पुरस्कार"),
        ...createHindiSeries("hindi-vividh-up-police-set", 2, "विविध हिंदी प्रश्न")
    ]);
}());
