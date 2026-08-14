(function () {
  "use strict";

  const disclaimer = "Exam typing/skill-test requirements may vary according to the latest official recruitment notification. Always verify the latest official notification before relying on these settings.";
  const sscTypingDisclaimer = "SSC clerical typing standards commonly use 35 WPM in English or 30 WPM in Hindi for a 10-minute qualifying typing test. Always verify the latest SSC notification, admit card, and regional instructions for the exact post.";
  const railwayTypingDisclaimer = "Railway CBTST/TST standards for typist posts commonly use 30 WPM in English or 25 WPM in Hindi. The typing test is qualifying in nature; verify the latest RRB CEN and CBTST instructions for the exact post.";
  const upssscTypingDisclaimer = "UPSSSC Junior Assistant typing practice is based on 30 WPM in English and 25 WPM in Hindi with short qualifying sessions. Verify the latest UPSSSC notification, admit card, font, keyboard, and correction rules.";
  const upPoliceTypingDisclaimer = "UP Police Computer Operator typing practice is based on 30 WPM in English and 25 WPM in Hindi with 85% accuracy in 15-minute sessions. Verify the latest UPPRPB notification and test instructions.";
  const bankingPracticeDisclaimer = "Banking clerk and assistant recruitments usually include a local language proficiency test rather than a fixed official typing-speed test. Treat this as typing and language practice, and verify the latest official bank/IBPS/RBI notification.";
  const hindiUnicodeKeyboardNote = "Hindi mode uses Mangal Unicode display. Type with your system Hindi keyboard/IME (InScript or Phonetic). For the real exam, always verify the latest official font and keyboard-layout instructions.";

  const difficulties = ["easy", "medium", "hard"];
  const durations = [1, 2, 5, 10, 15, 30];

  const presets = [
    {
      id: "general-english",
      category: "general",
      name: "General English Typing Test",
      shortName: "English Typing",
      mode: "practice",
      languages: ["english"],
      defaultLanguage: "english",
      duration: 10,
      targetWPM: 35,
      targetAccuracy: 95,
      difficulty: "medium",
      passageCategory: "general",
      passageExam: "general",
      description: "Flexible English typing practice with custom duration, speed target, accuracy target, and difficulty."
    },
    {
      id: "general-hindi",
      category: "general",
      name: "General Hindi Typing Test",
      shortName: "Hindi Typing",
      mode: "practice",
      languages: ["hindi"],
      defaultLanguage: "hindi",
      duration: 10,
      targetWPM: 30,
      targetAccuracy: 95,
      difficulty: "medium",
      passageCategory: "general",
      passageExam: "general",
      description: "Hindi Unicode typing practice with custom duration, speed target, accuracy target, and difficulty.",
      keyboardNote: hindiUnicodeKeyboardNote
    },
    {
      id: "ssc-chsl",
      category: "ssc",
      name: "SSC CHSL Typing Test",
      shortName: "SSC CHSL",
      mode: "exam",
      languages: ["english", "hindi"],
      defaultLanguage: "english",
      duration: 10,
      targetWPM: 35,
      targetWPMByLanguage: {
        english: 35,
        hindi: 30
      },
      targetAccuracy: 95,
      difficulty: "medium",
      passageCategory: "ssc",
      passageExam: "chsl",
      disclaimer: sscTypingDisclaimer
    },
    {
      id: "ssc-cgl-dest",
      category: "ssc",
      name: "SSC CGL DEST Practice",
      shortName: "SSC CGL DEST",
      mode: "exam",
      languages: ["english"],
      defaultLanguage: "english",
      duration: 15,
      targetWPM: 27,
      targetAccuracy: 95,
      difficulty: "medium",
      passageCategory: "ssc",
      passageExam: "cgl-dest",
      disclaimer: "SSC CGL DEST practice is based on the official format of about 2000 key depressions in 15 minutes. DEST is qualifying in nature; final evaluation standards and instructions should be verified from the latest SSC notice, admit card, and regional office instructions."
    },
    {
      id: "delhi-police-hc-ministerial",
      category: "ssc",
      name: "Delhi Police Head Constable Ministerial Typing Test",
      shortName: "Delhi Police HC Ministerial",
      mode: "exam",
      languages: ["english", "hindi"],
      defaultLanguage: "english",
      duration: 10,
      targetWPM: 30,
      targetWPMByLanguage: {
        english: 30,
        hindi: 25
      },
      targetAccuracy: 95,
      difficulty: "medium",
      passageCategory: "ssc",
      passageExam: "delhi-police-hc-ministerial",
      disclaimer: "Delhi Police Head Constable (Ministerial) typing practice is based on the notified speed standard of 30 WPM in English or 25 WPM in Hindi. Verify the latest SSC/Delhi Police notification, admit card, and skill-test instructions before relying on these settings."
    },
    {
      id: "ssc-stenographer",
      category: "ssc",
      name: "SSC Stenographer Practice",
      shortName: "SSC Steno",
      mode: "exam",
      languages: ["english", "hindi"],
      defaultLanguage: "english",
      duration: 40,
      targetWPM: 40,
      targetAccuracy: 95,
      difficulty: "hard",
      passageCategory: "ssc",
      passageExam: "stenographer",
      disclaimer: "SSC Stenographer is a stenography dictation and transcription skill test, not a normal WPM typing test. Grade C uses 100 WPM dictation and Grade D uses 80 WPM dictation for 10 minutes, with transcription time depending on grade and language. This preset is only transcription typing practice; verify the latest SSC notification for exact skill-test rules."
    },
    {
      id: "ssc-selection-post",
      category: "ssc",
      name: "SSC Selection Post Skill Practice",
      shortName: "SSC Selection Post",
      mode: "exam",
      languages: ["english", "hindi"],
      defaultLanguage: "english",
      duration: 10,
      targetWPM: 35,
      targetWPMByLanguage: {
        english: 35,
        hindi: 30
      },
      targetAccuracy: 95,
      difficulty: "medium",
      passageCategory: "ssc",
      passageExam: "selection-post",
      disclaimer: "SSC Selection Post skill tests are post-specific and qualifying wherever prescribed. For clerical typing practice this preset uses 35 WPM in English or 30 WPM in Hindi for 10 minutes; verify the selected post's latest SSC notice and user-department requirement."
    },
    {
      id: "rrb-ntpc",
      category: "railway",
      name: "RRB NTPC Typing Test",
      shortName: "RRB NTPC",
      mode: "exam",
      languages: ["english", "hindi"],
      defaultLanguage: "english",
      duration: 10,
      targetWPM: 30,
      targetWPMByLanguage: {
        english: 30,
        hindi: 25
      },
      targetAccuracy: 95,
      difficulty: "medium",
      passageCategory: "railway",
      passageExam: "rrb-ntpc",
      disclaimer: railwayTypingDisclaimer
    },
    {
      id: "railway-junior-clerk",
      category: "railway",
      name: "Railway Junior Clerk cum Typist Practice",
      shortName: "Railway Junior Clerk",
      mode: "exam",
      languages: ["english", "hindi"],
      defaultLanguage: "english",
      duration: 10,
      targetWPM: 30,
      targetWPMByLanguage: {
        english: 30,
        hindi: 25
      },
      targetAccuracy: 95,
      difficulty: "medium",
      passageCategory: "railway",
      passageExam: "junior-clerk",
      disclaimer: railwayTypingDisclaimer
    },
    {
      id: "railway-accounts-clerk",
      category: "railway",
      name: "Railway Accounts Clerk cum Typist Practice",
      shortName: "Accounts Clerk",
      mode: "exam",
      languages: ["english", "hindi"],
      defaultLanguage: "english",
      duration: 10,
      targetWPM: 30,
      targetWPMByLanguage: {
        english: 30,
        hindi: 25
      },
      targetAccuracy: 95,
      difficulty: "medium",
      passageCategory: "railway",
      passageExam: "accounts-clerk",
      disclaimer: railwayTypingDisclaimer
    },
    {
      id: "upsssc-junior-assistant",
      category: "up-government",
      name: "UPSSSC Junior Assistant Typing Test",
      shortName: "UPSSSC Junior Assistant",
      mode: "exam",
      languages: ["hindi", "english"],
      defaultLanguage: "hindi",
      duration: 5,
      targetWPM: 25,
      targetWPMByLanguage: {
        hindi: 25,
        english: 30
      },
      targetAccuracy: 85,
      difficulty: "medium",
      passageCategory: "up-government",
      passageExam: "upsssc-junior-assistant",
      disclaimer: upssscTypingDisclaimer
    },
    {
      id: "up-police-computer-operator",
      category: "up-government",
      name: "UP Police Computer Operator Typing Practice",
      shortName: "UP Police Computer Operator",
      mode: "exam",
      languages: ["hindi", "english"],
      defaultLanguage: "hindi",
      duration: 15,
      targetWPM: 25,
      targetWPMByLanguage: {
        hindi: 25,
        english: 30
      },
      targetAccuracy: 85,
      difficulty: "medium",
      passageCategory: "up-government",
      passageExam: "up-police-computer-operator",
      disclaimer: upPoliceTypingDisclaimer
    },
    {
      id: "up-clerical",
      category: "up-government",
      name: "UP Government Clerical Typing Practice",
      shortName: "UP Clerical",
      mode: "exam",
      languages: ["hindi", "english"],
      defaultLanguage: "hindi",
      duration: 5,
      targetWPM: 25,
      targetWPMByLanguage: {
        hindi: 25,
        english: 30
      },
      targetAccuracy: 85,
      difficulty: "medium",
      passageCategory: "up-government",
      passageExam: "up-clerical",
      disclaimer: "UP government clerical typing rules vary by recruiting body and post. This preset follows a common clerical practice standard of 30 WPM English or 25 WPM Hindi with 85% accuracy; verify the latest notification for the exact exam."
    },
    {
      id: "banking-language-practice",
      category: "banking",
      name: "Banking Typing & Language Practice",
      shortName: "Banking Practice",
      mode: "practice",
      languages: ["english", "hindi"],
      defaultLanguage: "english",
      duration: 10,
      targetWPM: 30,
      targetWPMByLanguage: {
        english: 30,
        hindi: 25
      },
      targetAccuracy: 95,
      difficulty: "medium",
      passageCategory: "banking",
      passageExam: "language-practice",
      disclaimer: bankingPracticeDisclaimer
    },
    {
      id: "ibps-clerk-csa-practice",
      category: "banking",
      name: "IBPS Clerk/CSA Typing & Language Practice",
      shortName: "IBPS Clerk/CSA Practice",
      mode: "practice",
      languages: ["english", "hindi"],
      defaultLanguage: "english",
      duration: 10,
      targetWPM: 30,
      targetWPMByLanguage: {
        english: 30,
        hindi: 25
      },
      targetAccuracy: 95,
      difficulty: "medium",
      passageCategory: "banking",
      passageExam: "ibps-clerk",
      disclaimer: "IBPS Clerk/CSA has a local language proficiency stage, not a fixed official typing-speed test in the current pattern. Use this page for typing and language practice, and verify the latest IBPS CRP notice."
    },
    {
      id: "sbi-clerk-practice",
      category: "banking",
      name: "SBI Clerk Typing & Language Practice",
      shortName: "SBI Clerk Practice",
      mode: "practice",
      languages: ["english", "hindi"],
      defaultLanguage: "english",
      duration: 10,
      targetWPM: 30,
      targetWPMByLanguage: {
        english: 30,
        hindi: 25
      },
      targetAccuracy: 95,
      difficulty: "medium",
      passageCategory: "banking",
      passageExam: "sbi-clerk",
      disclaimer: "SBI Junior Associate selection includes a local language test where applicable, not a fixed official typing-speed test. Use this page for typing and local-language practice, and verify the latest SBI careers notification."
    },
    {
      id: "rbi-assistant-language-practice",
      category: "banking",
      name: "RBI Assistant Language Practice",
      shortName: "RBI Assistant Practice",
      mode: "practice",
      languages: ["english", "hindi"],
      defaultLanguage: "english",
      duration: 10,
      targetWPM: 30,
      targetWPMByLanguage: {
        english: 30,
        hindi: 25
      },
      targetAccuracy: 95,
      difficulty: "medium",
      passageCategory: "banking",
      passageExam: "rbi-assistant",
      disclaimer: "RBI Assistant selection has a Language Proficiency Test in the local/official language, not a fixed typing-speed test. This page is practice support, not an official typing-test simulator."
    }
  ];

  window.GJU_TYPING_CONFIG = {
    version: "2026.08.11",
    difficulties,
    durations,
    defaultPresetId: "general-english",
    storagePrefix: "GovJobUpdatesTyping.",
    historyLimit: 20,
    presets,
    getPreset(id) {
      return presets.find((preset) => preset.id === id) || presets[0];
    },
    getPresetsByCategory(category) {
      return presets.filter((preset) => preset.category === category);
    }
  };
})();
