(function () {
  "use strict";

  const hindiUnicodeKeyboardNote = "Hindi mode uses Mangal Unicode display. For serious exam practice, select the official Hindi keyboard layout in your system/IME; use phonetic only for casual practice. Always verify the latest official font and keyboard-layout instructions.";

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
      name: "SSC CHSL Typing Practice",
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
      targetAccuracy: null,
      difficulty: "medium",
      passageCategory: "ssc",
      passageExam: "chsl",
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
      targetWPM: null,
      targetAccuracy: null,
      difficulty: "medium",
      passageCategory: "ssc",
      passageExam: "cgl-dest",
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
      targetAccuracy: null,
      difficulty: "medium",
      passageCategory: "ssc",
      passageExam: "delhi-police-hc-ministerial",
    },
    {
      id: "ssc-stenographer",
      category: "ssc",
      name: "SSC Stenographer Transcription Practice",
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
    },
    {
      id: "rrb-ntpc",
      category: "railway",
      name: "RRB NTPC CBTST Practice",
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
      targetAccuracy: null,
      difficulty: "medium",
      passageCategory: "railway",
      passageExam: "rrb-ntpc",
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
      targetAccuracy: null,
      difficulty: "medium",
      passageCategory: "railway",
      passageExam: "junior-clerk",
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
      targetAccuracy: null,
      difficulty: "medium",
      passageCategory: "railway",
      passageExam: "accounts-clerk",
    },
    {
      id: "upsssc-junior-assistant",
      category: "up-government",
      name: "UPSSSC Junior Assistant Typing Practice",
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
    }
  ];

  const sscSource = "https://ssc.gov.in/api/attachment/uploads/masterData/NoticeBoards/";
  const verifiedDate = "2026-09-08";
  const ruleMetadata = {
    "ssc-chsl": {
      evaluationType: "ssc-chsl", practiceOnly: false, targetAccuracy: null,
      rulesVersion: "CHSL-2025-LDC-JSA", lastVerified: verifiedDate,
      officialSource: sscSource + "Notice_of_adv_chsl_2025.pdf",
      additionalSources: [sscSource + "FRTA_CHSLE_2025_17082026.pdf"],
      officialRuleNote: "CHSL 2025 LDC/JSA: English 35 WPM or Hindi 30 WPM, 10 minutes (15 for eligible compensatory-time candidates). The 2025 result notice permits 7% mistakes for UR and 10% for listed reserved categories. These are SSC mistake percentages, not this site's character accuracy. Speed feedback here is a practice benchmark; official qualification is not assessed. This preset does not cover DEO skill tests."
    },
    "ssc-cgl-dest": {
      evaluationType: "ssc-dest", practiceOnly: false, targetWPM: null, targetAccuracy: null,
      targetKeyDepressions: 2000, rulesVersion: "CGL-2026-13.9.10", lastVerified: verifiedDate,
      officialSource: sscSource + "Notice_of_adv_cgl_2026.pdf",
      officialRuleNote: "CGL 2026 DEST: about 2,000 key depressions in 15 minutes (20 for eligible compensatory-time candidates). Output characters, spaces and punctuation are counted here as a practice proxy, not physical key presses. Long passages stay available for practice. Volume progress is not an SSC pass result; official error evaluation and post/category standards still apply."
    },
    "delhi-police-hc-ministerial": {
      evaluationType: "delhi-hcm", practiceOnly: false, targetAccuracy: null,
      rulesVersion: "DP-HCM-2025-24", lastVerified: verifiedDate,
      officialSource: sscSource + "Notice_of_DPHCM_2025.pdf",
      officialRuleNote: "Delhi Police HCM 2025: 10 minutes, English 30 WPM or Hindi 25 WPM, up to 25 marks. Tentative speed = (strokes / 5) / 10; the official example subtracts the mistake count from tentative WPM. Supplied matter is about 400 English / 350 Hindi words. Our long passages are practice material. Automatic official mistake classification and Hindi stroke mapping are not verified; the optional self-review calculator uses your reviewed counts. Fractional gaps in published marks slabs are left unresolved."
    },
    "ssc-stenographer": {
      mode: "practice", practiceOnly: true, rulesVersion: "Steno-2026-15.1", lastVerified: verifiedDate,
      officialSource: sscSource + "Notice_of_adv_steno_2026.pdf",
      officialRuleNote: "Transcription practice only: this tool has no dictation. SSC Steno 2026 has 10-minute dictation at 100 WPM (C) / 80 WPM (D). Standard transcription times: C English 40 / Hindi 55 minutes; D English 50 / Hindi 65 minutes, with separate compensatory times. This preset's 40-minute session, 40 WPM and 95% goals are personal practice benchmarks, not qualification standards."
    },
    "ssc-selection-post": {
      mode: "practice", practiceOnly: true, rulesVersion: "Selection-Phase-XIV-2026-15.5", lastVerified: verifiedDate,
      officialSource: sscSource + "Notice_of_RHQ_2026_phase_xiv.pdf",
      officialRuleNote: "Selection Post Phase XIV/2026: typing/data-entry skills apply only where prescribed for the selected post. This is clerical typing practice; its time, speed and accuracy goals are GovJobUpdates benchmarks, not a universal SSC requirement."
    },
    "upsssc-junior-assistant": {
      mode: "practice", practiceOnly: true, rulesVersion: "unverified-practice", lastVerified: null,
      sourceStatus: "Exact applicable instructions could not be retrieved on 2026-09-08.",
      officialSource: "https://upsssc.gov.in/Default.aspx",
      officialRuleNote: "Practice only: the applicable UPSSSC recruitment's duration, accuracy, font and evaluation instructions have not been verified. The 5-minute session, Hindi 25 / English 30 WPM and 85% goals are GovJobUpdates practice benchmarks. Check your exact advertisement and typing admit-card instructions."
    },
    "up-police-computer-operator": {
      evaluationType: "up-police", practiceOnly: false, allowedHindiModes: ["mangal"],
      rulesVersion: "UP-CO-2025-notice-2023-session-instructions", lastVerified: verifiedDate,
      officialSource: "https://uppbpb.gov.in/FilesUploaded/Notice/img20251216_1838501903e63203-c8d6-4aa8-8679-ee2066f88561.pdf",
      additionalSources: ["https://uppbpb.gov.in/FilesUploaded/Notice/202512151748559905acba682-54fe-468a-8b97-b950808eb6b6.pdf"],
      keyboardNote: "Hindi requires Unicode Inscript in the retrieved UP Police instructions. Select Inscript in your system keyboard/IME. Mangal is the display mode; this website cannot set or verify your system layout. KrutiDev remains available in General Hindi practice.",
      officialRuleNote: "The 2025 Computer Operator notice requires both Hindi 25 WPM and English 30 WPM with 85% accuracy and Unicode Inscript Hindi. The 15 December 2025 instructions for the 2023 recruitment specify 15 minutes per language with a 5-minute gap, English first. This page runs one language at a time; complete both separately. Browser character feedback is only a practice estimate; the optional self-review calculator accepts reviewed word counts. Confirm session details for your recruitment cycle."
    },
    "up-clerical": {
      mode: "practice", practiceOnly: true,
      officialRuleNote: "General UP clerical practice, not a particular recruitment's skill test. All time, WPM and accuracy goals here are GovJobUpdates practice benchmarks. Check the selected post's official instructions."
    },
    "ibps-clerk-csa-practice": {
      officialSource: "https://www.ibps.in/wp-content/uploads/Notification_CRP_CSA_XVI-Final.pdf",
      lastVerified: null, rulesVersion: "CSA-XVI-indexed-only",
      sourceStatus: "Official search index checked 2026-09-08; full PDF retrieval failed.",
      officialRuleNote: "Typing & language practice only. The indexed IBPS CSA-XVI notice identifies a Local Language Proficiency Test. Full document retrieval was unavailable during this audit; no official typing-speed qualification is claimed. These goals do not assess language proficiency."
    },
    "sbi-clerk-practice": {
      officialSource: "https://sbi.bank.in/webfiles/uploads/files_2627/08/JA_2026_Detailed_Advt_Eng.pdf",
      rulesVersion: "SBI-JA-2026-27-17", lastVerified: verifiedDate,
      officialRuleNote: "Typing & language practice only. SBI Junior Associate 2026-27/17 selection includes a test of the specified opted local language where applicable, not a universal typing-speed test. All targets here are personal benchmarks and do not assess local-language proficiency."
    },
    "rbi-assistant-language-practice": {
      officialSource: "https://opportunities.rbi.org.in/scripts/bs_viewcontent.aspx?Id=4912",
      rulesVersion: "RBI-Assistant-panel-2025-indexed-only", lastVerified: null,
      sourceStatus: "Official search index checked 2026-09-08; direct page presented a challenge.",
      officialRuleNote: "Typing & language practice only. RBI's indexed Assistant notice identifies a Language Proficiency Test after preliminary and main exams. The direct notice could not be fully retrieved during this audit. These typing goals are practice benchmarks, not RBI qualification or LPT assessment."
    }
  };
  const rrbRules = {
    evaluationType: "rrb", practiceOnly: false, targetAccuracy: null,
    repeatPassage: true, editingAllowed: false, allowedHindiModes: ["mangal"],
    minimumWordsByLanguage: { english: 300, hindi: 250 },
    rulesVersion: "RRB-CEN-06-2024-CBTST-2026-02-06", lastVerified: verifiedDate,
    officialSource: "https://rrbsecunderabad.gov.in/wp-content/uploads/2026/02/Special-Instructions-to-CBTST-CEN-06-2024-6.2.2026.pdf",
    keyboardNote: "Unicode Hindi practice only. The retrieved CBTST notice does not establish the font/layout; confirm these in your own RRB instructions and select that layout in your system/IME. This website cannot enforce it. Legacy KrutiDev conversion is available under General Hindi, not certified for this preset.",
    officialRuleNote: "Based on the retrieved CEN 06/2024 NTPC Undergraduate CBTST notice (6 February 2026): 10 evaluated minutes, English 30 / Hindi 25 WPM, minimum 300 / 250 words. Full mistakes + half mistakes / 2, less a 5% word allowance; each remaining mistake costs 10 words. Editing is disabled; completed passages may be repeated. Full/half mistake classification is not detailed in that notice, so official speed is not automatically assessed. Use reviewed counts in the optional result calculator. No warm-up/break is simulated. For other CENs, verify your own notice."
  };
  ["rrb-ntpc", "railway-junior-clerk", "railway-accounts-clerk"].forEach(id => { ruleMetadata[id] = { ...rrbRules }; });
  presets.forEach(preset => {
    Object.assign(preset, {
      evaluationType: "general", practiceOnly: true, rulesVersion: "GJU-practice-1",
      lastVerified: null, checkedOn: verifiedDate, officialSource: null,
      officialRuleNote: "GovJobUpdates practice benchmarks only. This is not an official exam or a language proficiency assessment."
    }, ruleMetadata[preset.id] || {});
    preset.disclaimer = preset.officialRuleNote;
  });

  window.GJU_TYPING_CONFIG = {
    version: "2026.09.08",
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
