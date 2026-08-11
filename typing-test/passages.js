(function () {
  "use strict";

  const englishGeneral = {
    easy: [
      "Public service preparation needs steady focus and a calm routine. A student can improve speed by reading the passage once, typing with care, and reviewing mistakes after every attempt.",
      "Every form, admit card, result, and answer key should be checked from the official website. Good typing practice helps students complete online work with confidence and fewer mistakes."
    ],
    medium: [
      "A competitive exam aspirant must balance speed with accuracy. Typing too quickly without control creates errors, while typing too slowly can reduce the final score. A practical target is built through regular timed practice.",
      "Government recruitment work often includes application forms, document uploads, response sheets, and official notices. Clear language skills and accurate computer typing can support many clerical and assistant-level roles."
    ],
    hard: [
      "Reliable exam preparation depends on disciplined revision, verified information, and consistent practice. Candidates should compare their performance across multiple attempts instead of judging progress from one unusually good or bad session.",
      "Typing performance improves when the student maintains posture, reads in meaningful groups, avoids repeated backtracking, and corrects patterns of mistakes after the test rather than interrupting flow during every sentence."
    ]
  };

  const hindiGeneral = {
    easy: [
      "सरकारी नौकरी की तैयारी में नियमित अभ्यास बहुत जरूरी है। विद्यार्थी को शांत मन से पाठ पढ़ना चाहिए और फिर सही अक्षरों के साथ टाइप करना चाहिए।",
      "हिंदी टाइपिंग में गति के साथ शुद्धता भी आवश्यक है। रोज थोड़ा अभ्यास करने से हाथों की गति और भाषा की समझ दोनों बेहतर होती हैं।"
    ],
    medium: [
      "प्रतियोगी परीक्षा की तैयारी करने वाले अभ्यर्थी को समय प्रबंधन, सही जानकारी और नियमित अभ्यास पर ध्यान देना चाहिए। टाइपिंग अभ्यास से आत्मविश्वास बढ़ता है और गलतियां कम होती हैं।",
      "किसी भी भर्ती प्रक्रिया में आवेदन करने से पहले आधिकारिक सूचना अवश्य पढ़नी चाहिए। योग्यता, तिथि, शुल्क और चयन प्रक्रिया की पुष्टि केवल आधिकारिक वेबसाइट से करें।"
    ],
    hard: [
      "हिंदी यूनिकोड टाइपिंग में मात्राओं, संयुक्त अक्षरों और विराम चिह्नों की शुद्धता पर विशेष ध्यान देना चाहिए। अभ्यास के दौरान जल्दबाजी से बचना और प्रत्येक गलती का कारण समझना उपयोगी होता है।",
      "सफल अभ्यर्थी केवल अधिक घंटे पढ़ाई नहीं करता, बल्कि अपनी कमजोरियों को पहचानकर योजनाबद्ध सुधार करता है। टाइपिंग में भी गति, शुद्धता और निरंतरता तीनों का संतुलन जरूरी है।"
    ]
  };

  const data = {
    english: {
      general: {
        general: englishGeneral
      },
      ssc: {
        chsl: {
          easy: englishGeneral.easy,
          medium: [
            "The Staff Selection Commission conducts recruitment for several clerical and data entry posts. Candidates should practice clean typing, careful spacing, punctuation, and steady speed before appearing for a skill test.",
            "In a qualifying typing test, accuracy is as important as speed. Students should avoid random corrections and focus on entering the passage exactly as displayed on the screen."
          ],
          hard: englishGeneral.hard
        },
        "cgl-dest": {
          easy: englishGeneral.easy,
          medium: [
            "Data entry practice requires concentration, consistent rhythm, and careful checking of characters. Aspirants preparing for DEST should work on accuracy first and then gradually increase speed.",
            "A data entry passage may include numbers, names, punctuation, and official terms. Students should develop the habit of reading short groups of words and typing them without losing the line."
          ],
          hard: englishGeneral.hard
        },
        stenographer: {
          easy: englishGeneral.easy,
          medium: englishGeneral.medium,
          hard: [
            "This practice passage is intended for transcription rhythm and typing accuracy. Candidates preparing for stenography-related work should separately follow official dictation and transcription standards.",
            "Good transcription depends on listening discipline, language awareness, and clean keyboard habits. The final practice result should be treated as guidance, not as an official skill-test score."
          ]
        },
        "selection-post": {
          easy: englishGeneral.easy,
          medium: englishGeneral.medium,
          hard: englishGeneral.hard
        }
      },
      railway: {
        "rrb-ntpc": {
          easy: englishGeneral.easy,
          medium: [
            "Railway recruitment candidates should practice typing in a calm and consistent manner. A useful attempt measures speed, accuracy, total errors, and the ability to complete the passage within time.",
            "Computer based typing practice helps candidates become familiar with timed passages. Official standards may differ by post, category, and recruitment notice."
          ],
          hard: englishGeneral.hard
        },
        "junior-clerk": {
          easy: englishGeneral.easy,
          medium: englishGeneral.medium,
          hard: englishGeneral.hard
        },
        "accounts-clerk": {
          easy: englishGeneral.easy,
          medium: [
            "Accounts clerical work may require careful data entry, attention to figures, and accurate text handling. Timed typing practice can improve both speed and control.",
            "Candidates should type every character as shown and avoid inserting extra spaces. Accuracy is the foundation of dependable clerical work."
          ],
          hard: englishGeneral.hard
        }
      },
      "up-government": {
        "upsssc-junior-assistant": {
          easy: englishGeneral.easy,
          medium: englishGeneral.medium,
          hard: englishGeneral.hard
        },
        "up-police-computer-operator": {
          easy: englishGeneral.easy,
          medium: [
            "Computer operator practice should include speed, careful reading, and correct data entry. Candidates should verify the latest official notification for exact standards before relying on any preset.",
            "The best practice attempt is balanced and steady. It records the actual time taken and evaluates both speed and accuracy without depending on guesswork."
          ],
          hard: englishGeneral.hard
        },
        "up-clerical": {
          easy: englishGeneral.easy,
          medium: englishGeneral.medium,
          hard: englishGeneral.hard
        }
      },
      banking: {
        "language-practice": {
          easy: englishGeneral.easy,
          medium: [
            "Banking clerical roles require clear communication, reading ability, and careful work with customer information. This typing and language practice is meant to support preparation, not replace official instructions.",
            "Candidates should read the latest bank notification to understand whether the process includes a language proficiency test, document verification, or any other qualifying stage."
          ],
          hard: englishGeneral.hard
        },
        "ibps-clerk": { easy: englishGeneral.easy, medium: englishGeneral.medium, hard: englishGeneral.hard },
        "sbi-clerk": { easy: englishGeneral.easy, medium: englishGeneral.medium, hard: englishGeneral.hard },
        "rbi-assistant": { easy: englishGeneral.easy, medium: englishGeneral.medium, hard: englishGeneral.hard }
      }
    },
    hindi: {
      general: {
        general: hindiGeneral
      },
      ssc: {
        chsl: {
          easy: hindiGeneral.easy,
          medium: [
            "कर्मचारी चयन आयोग की परीक्षाओं में कौशल परीक्षा के नियम पद और सूचना के अनुसार बदल सकते हैं। अभ्यर्थी को अभ्यास के साथ आधिकारिक सूचना की पुष्टि भी करनी चाहिए।",
            "टाइपिंग परीक्षा में सही शब्द, सही मात्रा और सही विराम चिह्न महत्वपूर्ण होते हैं। केवल गति बढ़ाने से लाभ नहीं होगा यदि शुद्धता कम हो जाए।"
          ],
          hard: hindiGeneral.hard
        },
        stenographer: {
          easy: hindiGeneral.easy,
          medium: hindiGeneral.medium,
          hard: hindiGeneral.hard
        },
        "selection-post": {
          easy: hindiGeneral.easy,
          medium: hindiGeneral.medium,
          hard: hindiGeneral.hard
        }
      },
      railway: {
        "rrb-ntpc": {
          easy: hindiGeneral.easy,
          medium: [
            "रेलवे भर्ती में टाइपिंग कौशल से जुड़े नियम संबंधित अधिसूचना के अनुसार लागू होते हैं। अभ्यास करते समय समय, गति और शुद्धता तीनों पर ध्यान दें।",
            "कंप्यूटर आधारित टाइपिंग अभ्यास में अभ्यर्थी को पंक्ति न छोड़ने, अतिरिक्त स्पेस न देने और वाक्य को ठीक उसी रूप में लिखने की आदत बनानी चाहिए।"
          ],
          hard: hindiGeneral.hard
        },
        "junior-clerk": {
          easy: hindiGeneral.easy,
          medium: hindiGeneral.medium,
          hard: hindiGeneral.hard
        },
        "accounts-clerk": {
          easy: hindiGeneral.easy,
          medium: hindiGeneral.medium,
          hard: hindiGeneral.hard
        }
      },
      "up-government": {
        "upsssc-junior-assistant": {
          easy: hindiGeneral.easy,
          medium: [
            "उत्तर प्रदेश की लिपिकीय भर्तियों में टाइपिंग योग्यता की शर्तें विज्ञापन के अनुसार तय होती हैं। अभ्यर्थी को हिंदी यूनिकोड अभ्यास नियमित रूप से करना चाहिए।",
            "सही टाइपिंग के लिए अक्षर, मात्रा, स्पेस और विराम चिह्नों पर बराबर ध्यान देना चाहिए। अभ्यास के बाद परिणाम देखकर अपनी कमजोरियों को सुधारें।"
          ],
          hard: hindiGeneral.hard
        },
        "up-police-computer-operator": {
          easy: hindiGeneral.easy,
          medium: hindiGeneral.medium,
          hard: hindiGeneral.hard
        },
        "up-clerical": {
          easy: hindiGeneral.easy,
          medium: hindiGeneral.medium,
          hard: hindiGeneral.hard
        }
      },
      banking: {
        "language-practice": {
          easy: hindiGeneral.easy,
          medium: [
            "बैंकिंग परीक्षाओं में भाषा प्रवीणता की शर्तें संस्था और भर्ती सूचना के अनुसार हो सकती हैं। यह अभ्यास भाषा और टाइपिंग सुधार के लिए है।",
            "अभ्यर्थी को स्थानीय भाषा पढ़ने, लिखने और समझने की क्षमता पर ध्यान देना चाहिए। आधिकारिक चयन प्रक्रिया हमेशा नवीनतम विज्ञापन से ही जांचें।"
          ],
          hard: hindiGeneral.hard
        },
        "ibps-clerk": { easy: hindiGeneral.easy, medium: hindiGeneral.medium, hard: hindiGeneral.hard },
        "sbi-clerk": { easy: hindiGeneral.easy, medium: hindiGeneral.medium, hard: hindiGeneral.hard },
        "rbi-assistant": { easy: hindiGeneral.easy, medium: hindiGeneral.medium, hard: hindiGeneral.hard }
      }
    }
  };

  window.GJU_TYPING_PASSAGES = data;
})();
