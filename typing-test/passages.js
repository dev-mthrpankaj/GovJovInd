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

  const sscCglDestPassage1 = [
    "Success is rarely the result of a single great decision. In most cases, it is the result of small actions repeated consistently over a long period of time. People often wait for motivation before they begin working toward their goals, but motivation can change from day to day. Discipline, on the other hand, helps a person continue working even when the task feels difficult, boring, or uncomfortable. This is why discipline and consistency are considered two of the most important qualities for achieving meaningful progress in life.",
    "Every person has goals. A student may want to pass a competitive examination, an employee may want to improve professional skills, and a business owner may want to increase the number of customers. Having a goal gives direction, but a goal alone cannot produce results. A person must create a practical plan and follow it regularly. For example, a student who studies for two focused hours every day may achieve better results than someone who studies for ten hours only once a week. Regular practice allows the mind to understand information, identify mistakes, and improve gradually.",
    "Time management also plays an important role in building discipline. Everyone receives the same twenty-four hours in a day, but people use those hours differently. Some people plan their important activities in advance, while others spend a large amount of time on activities that provide little value. Good time management does not mean working every minute of the day. Rest, entertainment, exercise, and conversations with family and friends are also important. The real objective is to create a healthy balance between responsibilities and personal life.",
    "Technology has made modern life easier in many ways. Students can access educational material online, communicate with teachers, attempt mock tests, and learn new skills without leaving their homes. At the same time, technology can become a major source of distraction."
  ].join(" ");

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
          easy: [
            sscCglDestPassage1,
            englishGeneral.easy[1]
          ],
          medium: [
            sscCglDestPassage1,
            "A data entry passage may include numbers, names, punctuation, and official terms. Students should develop the habit of reading short groups of words and typing them without losing the line."
          ],
          hard: [
            sscCglDestPassage1,
            englishGeneral.hard[1]
          ]
        },
        "delhi-police-hc-ministerial": {
          easy: englishGeneral.easy,
          medium: [
            "Delhi Police ministerial work requires clear typing, careful spacing, correct punctuation, and steady speed. Candidates should practise English passages with accuracy before increasing their typing rhythm.",
            "Head Constable ministerial duties may include office records, letters, reports, registers, and data entry. A good typing attempt balances speed with clean and readable work."
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
        },
        "delhi-police-hc-ministerial": {
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

  function applyEditorialPassagePools(target) {
    const profiles = [
      ["english", "general", "general", "General English", "public service preparation", 1900, 0],
      ["hindi", "general", "general", "General Hindi", "सामान्य हिंदी अभ्यास", 1650, 0],
      ["english", "ssc", "chsl", "SSC CHSL", "clerical responsibility and citizen service", 1900, 6],
      ["hindi", "ssc", "chsl", "SSC CHSL", "लिपिकीय कार्य और नागरिक सेवा", 1650, 6],
      ["english", "ssc", "cgl-dest", "SSC CGL DEST", "data entry accuracy and administrative records", 2150, 12],
      ["english", "ssc", "delhi-police-hc-ministerial", "Delhi Police Head Constable Ministerial", "police office work and public trust", 1650, 18],
      ["hindi", "ssc", "delhi-police-hc-ministerial", "Delhi Police Head Constable Ministerial", "पुलिस कार्यालय और जनविश्वास", 1400, 18],
      ["english", "ssc", "stenographer", "SSC Stenographer", "transcription discipline and public communication", 8200, 24],
      ["hindi", "ssc", "stenographer", "SSC Stenographer", "आशुलिपि प्रतिलेखन और सरकारी संचार", 8200, 24],
      ["english", "ssc", "selection-post", "SSC Selection Post", "post specific skills and workplace readiness", 1900, 30],
      ["hindi", "ssc", "selection-post", "SSC Selection Post", "पद विशेष कौशल और कार्यस्थल तैयारी", 1650, 30],
      ["english", "railway", "rrb-ntpc", "RRB NTPC", "railway service, safety and passenger information", 1650, 36],
      ["hindi", "railway", "rrb-ntpc", "RRB NTPC", "रेल सेवा, सुरक्षा और यात्री सूचना", 1400, 36],
      ["english", "railway", "junior-clerk", "Railway Junior Clerk", "station records and public dealing", 1650, 42],
      ["hindi", "railway", "junior-clerk", "Railway Junior Clerk", "स्टेशन अभिलेख और जनसंपर्क", 1400, 42],
      ["english", "railway", "accounts-clerk", "Railway Accounts Clerk", "accounts discipline and public expenditure", 1650, 48],
      ["hindi", "railway", "accounts-clerk", "Railway Accounts Clerk", "लेखा अनुशासन और सार्वजनिक व्यय", 1400, 48],
      ["english", "up-government", "upsssc-junior-assistant", "UPSSSC Junior Assistant", "local administration and service delivery", 900, 54],
      ["hindi", "up-government", "upsssc-junior-assistant", "UPSSSC Junior Assistant", "स्थानीय प्रशासन और सेवा वितरण", 800, 54],
      ["english", "up-government", "up-police-computer-operator", "UP Police Computer Operator", "digital policing and computer operations", 2400, 60],
      ["hindi", "up-government", "up-police-computer-operator", "UP Police Computer Operator", "डिजिटल पुलिसिंग और कंप्यूटर संचालन", 2000, 60],
      ["english", "up-government", "up-clerical", "UP Government Clerical", "district office work and citizen records", 900, 66],
      ["hindi", "up-government", "up-clerical", "UP Government Clerical", "जिला कार्यालय और नागरिक अभिलेख", 800, 66],
      ["english", "banking", "language-practice", "Banking Language Practice", "financial inclusion and customer communication", 1650, 72],
      ["hindi", "banking", "language-practice", "Banking Language Practice", "वित्तीय समावेशन और ग्राहक संवाद", 1400, 72],
      ["english", "banking", "ibps-clerk", "IBPS Clerk CSA", "branch service and local language confidence", 1650, 78],
      ["hindi", "banking", "ibps-clerk", "IBPS Clerk CSA", "शाखा सेवा और स्थानीय भाषा", 1400, 78],
      ["english", "banking", "sbi-clerk", "SBI Clerk", "digital banking and responsible service", 1650, 84],
      ["hindi", "banking", "sbi-clerk", "SBI Clerk", "डिजिटल बैंकिंग और जिम्मेदार सेवा", 1400, 84],
      ["english", "banking", "rbi-assistant", "RBI Assistant", "central banking awareness and public confidence", 1650, 90],
      ["hindi", "banking", "rbi-assistant", "RBI Assistant", "केंद्रीय बैंकिंग जागरूकता और जनविश्वास", 1400, 90]
    ];

    profiles.forEach(([language, category, exam, label, focus, minLength, offset]) => {
      if (!target[language]?.[category]?.[exam]) return;
      target[language][category][exam] = buildEditorialLevels(language, label, focus, minLength, offset);
    });
  }

  function buildEditorialLevels(language, label, focus, minLength, offset) {
    return {
      easy: Array.from({ length: 6 }, (_, index) => buildEditorialPassage(language, label, focus, "easy", minLength, offset + index)),
      medium: Array.from({ length: 6 }, (_, index) => buildEditorialPassage(language, label, focus, "medium", minLength + 180, offset + 12 + index)),
      hard: Array.from({ length: 6 }, (_, index) => buildEditorialPassage(language, label, focus, "hard", minLength + 360, offset + 24 + index))
    };
  }

  function buildEditorialPassage(language, label, focus, difficulty, minLength, seed) {
    const topic = getEditorialTopic(language, seed);
    const bank = language === "hindi" ? hindiEditorialSentences : englishEditorialSentences;
    const opening = language === "hindi"
      ? `${label} के अभ्यास के लिए यह ${difficultyLabel(language, difficulty)} स्तर का संपादकीय अनुच्छेद ${topic} और ${focus} पर केंद्रित है।`
      : `This ${difficultyLabel(language, difficulty)} editorial passage for ${label} focuses on ${topic} and ${focus}.`;
    const sentences = [opening];
    let cursor = seed;
    while (sentences.join(" ").length < minLength) {
      const sentence = bank[cursor % bank.length];
      sentences.push(sentence
        .replaceAll("{topic}", topic)
        .replaceAll("{focus}", focus)
        .replaceAll("{exam}", label));
      cursor += difficulty === "hard" ? 5 : difficulty === "medium" ? 3 : 2;
    }
    return sentences.join(" ");
  }

  function getEditorialTopic(language, seed) {
    const topics = language === "hindi" ? hindiEditorialTopics : englishEditorialTopics;
    return topics[Math.abs(seed) % topics.length];
  }

  function difficultyLabel(language, difficulty) {
    if (language === "hindi") {
      return difficulty === "hard" ? "कठिन" : difficulty === "medium" ? "मध्यम" : "सरल";
    }
    return difficulty;
  }

  const englishEditorialTopics = [
    "water security", "green growth", "digital governance", "public health", "school education", "financial inclusion",
    "railway safety", "urban mobility", "rural livelihoods", "climate finance", "data privacy", "citizen services",
    "women's participation", "skill development", "agricultural resilience", "renewable energy", "cooperative federalism", "cyber awareness",
    "banking access", "public transport", "disaster preparedness", "local administration", "responsible artificial intelligence", "social welfare",
    "small enterprise growth", "community policing", "exam discipline", "public records", "consumer protection", "energy security",
    "urban sanitation", "digital payments", "nutrition and health", "higher education", "employment services", "transparent recruitment"
  ];

  const hindiEditorialTopics = [
    "जल सुरक्षा", "हरित विकास", "डिजिटल शासन", "लोक स्वास्थ्य", "विद्यालयी शिक्षा", "वित्तीय समावेशन",
    "रेल सुरक्षा", "शहरी यातायात", "ग्रामीण आजीविका", "जलवायु वित्त", "डाटा गोपनीयता", "नागरिक सेवाएं",
    "महिला भागीदारी", "कौशल विकास", "कृषि लचीलापन", "नवीकरणीय ऊर्जा", "सहकारी संघवाद", "साइबर जागरूकता",
    "बैंकिंग पहुंच", "सार्वजनिक परिवहन", "आपदा तैयारी", "स्थानीय प्रशासन", "जिम्मेदार कृत्रिम बुद्धिमत्ता", "सामाजिक कल्याण",
    "लघु उद्यम विकास", "सामुदायिक पुलिसिंग", "परीक्षा अनुशासन", "सरकारी अभिलेख", "उपभोक्ता संरक्षण", "ऊर्जा सुरक्षा",
    "शहरी स्वच्छता", "डिजिटल भुगतान", "पोषण और स्वास्थ्य", "उच्च शिक्षा", "रोजगार सेवाएं", "पारदर्शी भर्ती"
  ];

  const englishEditorialSentences = [
    "A useful public system is judged not only by the number of forms it processes, but also by the clarity, fairness, and speed with which ordinary people receive a service.",
    "The debate around {topic} shows that progress depends on patient institution building, reliable data, and officials who can explain decisions in simple language.",
    "For a candidate practising {exam}, such passages build familiarity with administrative vocabulary while keeping attention on spacing, punctuation, and steady rhythm.",
    "India's development story now requires coordination between technology, local capacity, and citizen participation, because a policy succeeds only when it works at the last desk.",
    "The easy promise of a new platform can hide the hard work of training staff, updating records, protecting privacy, and responding to people who are not digitally confident.",
    "Good governance is therefore less about dramatic announcements and more about everyday discipline, measurable outcomes, and respectful communication with the public.",
    "When {focus} is handled carefully, citizens save time, offices reduce confusion, and public trust grows through repeated small experiences of reliability.",
    "A balanced approach should protect the vulnerable, encourage innovation, and keep accountability visible at every stage of decision making.",
    "The quality of records matters because a wrong entry can delay a benefit, disturb a family, or create avoidable pressure on an office that is already crowded.",
    "Students should notice how an editorial paragraph connects facts, causes, consequences, and solutions without turning the writing into a list of slogans.",
    "A mature public debate accepts that resources are limited, but it also insists that priorities must be chosen transparently and reviewed honestly.",
    "The role of technology is important, yet technology cannot replace empathy, field knowledge, legal awareness, and the habit of verifying information before action.",
    "In many offices the real improvement comes from clean registers, timely updates, clear notices, and staff members who know how to guide citizens without delay.",
    "The challenge is not merely to start a scheme, but to maintain it through funding, training, monitoring, grievance redressal, and independent evaluation.",
    "A student typing this passage should maintain a calm pace, read groups of words, and avoid rushing through commas, numbers, and proper nouns.",
    "Public institutions become stronger when they learn from errors, publish useful information, and make correction procedures simple for genuine cases.",
    "The future of {topic} will depend on cooperation among departments, local bodies, private partners, and citizens who understand both rights and duties.",
    "An editorial tone asks the reader to think beyond immediate benefit and consider long-term costs, social equity, and the dignity of public service.",
    "The same principle applies to {focus}: accuracy first, speed next, and constant review after every attempt or administrative cycle.",
    "If institutions communicate clearly, even difficult reforms become easier to accept because people can see the reason, the process, and the expected result.",
    "Reliable service delivery also requires language access, because a citizen who cannot understand an instruction may lose time despite being eligible.",
    "The strongest reform is often the one that reduces unnecessary steps, prevents duplication, and allows a worker to complete the task correctly the first time.",
    "A difficult passage may include longer sentences, abstract terms, and linked arguments, so the typist must remain attentive until the final word.",
    "Policy success should be measured by lived outcomes, not only by dashboards, because numbers can guide decisions but cannot replace ground feedback.",
    "The discussion on {topic} reminds us that public interest is protected when growth, fairness, and accountability move together.",
    "For aspirants, this practice is also a lesson in patience: a clean attempt with fewer mistakes is more useful than a fast attempt filled with avoidable errors."
  ];

  const hindiEditorialSentences = [
    "एक उपयोगी सार्वजनिक व्यवस्था की पहचान केवल योजनाओं की संख्या से नहीं, बल्कि इस बात से होती है कि आम नागरिक को सेवा कितनी स्पष्टता, निष्पक्षता और समयबद्धता से मिलती है।",
    "{topic} पर चल रही बहस बताती है कि वास्तविक प्रगति के लिए भरोसेमंद आंकड़े, प्रशिक्षित कर्मचारी और सरल भाषा में समझाई गई प्रक्रिया आवश्यक है।",
    "{exam} की तैयारी करने वाले अभ्यर्थी के लिए ऐसे अनुच्छेद प्रशासनिक शब्दावली, सही विराम चिह्न और स्थिर गति का अभ्यास कराते हैं।",
    "भारत की विकास यात्रा अब तकनीक, स्थानीय क्षमता और नागरिक भागीदारी के संतुलन पर निर्भर करती है, क्योंकि नीति तभी सफल मानी जाती है जब वह अंतिम व्यक्ति तक पहुंचे।",
    "नई डिजिटल व्यवस्था का आकर्षण कभी-कभी प्रशिक्षण, अभिलेख सुधार, गोपनीयता सुरक्षा और कमजोर उपयोगकर्ताओं की सहायता जैसी कठिन जिम्मेदारियों को छिपा देता है।",
    "अच्छा शासन बड़े वादों से अधिक रोजमर्रा के अनुशासन, मापनीय परिणामों और नागरिकों के साथ सम्मानजनक संवाद पर टिका होता है।",
    "जब {focus} को सावधानी से संभाला जाता है, तब कार्यालयों में भ्रम कम होता है, नागरिकों का समय बचता है और भरोसा धीरे-धीरे मजबूत होता है।",
    "संतुलित दृष्टिकोण में नवाचार को अवसर मिलता है, कमजोर वर्गों की रक्षा होती है और निर्णय प्रक्रिया में जवाबदेही दिखाई देती है।",
    "अभिलेखों की शुद्धता बहुत महत्वपूर्ण है, क्योंकि एक गलत प्रविष्टि लाभ में देरी, अनावश्यक शिकायत और परिवार पर अतिरिक्त दबाव पैदा कर सकती है।",
    "संपादकीय शैली विद्यार्थी को यह सिखाती है कि तथ्य, कारण, परिणाम और समाधान को नारेबाजी के बिना क्रमबद्ध रूप से कैसे रखा जाता है।",
    "परिपक्व सार्वजनिक बहस यह स्वीकार करती है कि संसाधन सीमित हैं, लेकिन प्राथमिकताएं पारदर्शी और ईमानदार समीक्षा के योग्य होनी चाहिए।",
    "तकनीक महत्वपूर्ण है, पर वह सहानुभूति, क्षेत्रीय अनुभव, कानूनी समझ और सूचना की पुष्टि करने की आदत का विकल्प नहीं बन सकती।",
    "कई कार्यालयों में सुधार साफ अभिलेख, समय पर अद्यतन सूचना, स्पष्ट नोटिस और नागरिकों को सही दिशा बताने वाले कर्मचारियों से शुरू होता है।",
    "चुनौती केवल योजना शुरू करने की नहीं, बल्कि धन, प्रशिक्षण, निगरानी, शिकायत निवारण और स्वतंत्र मूल्यांकन के साथ उसे टिकाऊ बनाने की है।",
    "इस अनुच्छेद को टाइप करते समय विद्यार्थी को शांत गति रखनी चाहिए, शब्द समूहों को पढ़ना चाहिए और अल्पविराम, संख्या तथा विशेष नामों पर ध्यान देना चाहिए।",
    "सार्वजनिक संस्थाएं तब मजबूत होती हैं जब वे त्रुटियों से सीखती हैं, उपयोगी जानकारी प्रकाशित करती हैं और वास्तविक मामलों में सुधार प्रक्रिया सरल रखती हैं।",
    "{topic} का भविष्य विभागों, स्थानीय निकायों, निजी भागीदारों और अपने अधिकारों तथा कर्तव्यों को समझने वाले नागरिकों के सहयोग पर निर्भर करेगा।",
    "संपादकीय दृष्टि पाठक से तात्कालिक लाभ से आगे बढ़कर दीर्घकालिक लागत, सामाजिक न्याय और सार्वजनिक सेवा की गरिमा पर विचार करने को कहती है।",
    "{focus} में भी यही सिद्धांत लागू होता है: पहले शुद्धता, फिर गति और हर प्रयास के बाद शांत समीक्षा।",
    "यदि संस्थाएं स्पष्ट संवाद करती हैं, तो कठिन सुधार भी स्वीकार्य हो जाते हैं क्योंकि लोग कारण, प्रक्रिया और अपेक्षित परिणाम समझ पाते हैं।",
    "सेवा वितरण में भाषा की पहुंच भी जरूरी है, क्योंकि निर्देश न समझ पाने वाला नागरिक पात्र होते हुए भी समय और अवसर खो सकता है।",
    "सबसे मजबूत सुधार अक्सर वही होता है जो अनावश्यक चरण कम करे, दोहराव रोके और कर्मचारी को पहली बार में सही काम पूरा करने दे।",
    "कठिन अनुच्छेद में लंबे वाक्य, अमूर्त शब्द और जुड़े हुए तर्क हो सकते हैं, इसलिए टाइपिस्ट को अंतिम शब्द तक ध्यान बनाए रखना चाहिए।",
    "नीति की सफलता केवल डैशबोर्ड से नहीं, बल्कि वास्तविक अनुभवों से मापी जानी चाहिए, क्योंकि आंकड़े दिशा दे सकते हैं पर जमीन की प्रतिक्रिया का स्थान नहीं ले सकते।",
    "{topic} की चर्चा याद दिलाती है कि सार्वजनिक हित तभी सुरक्षित रहता है जब विकास, न्याय और जवाबदेही साथ-साथ आगे बढ़ें।",
    "अभ्यर्थियों के लिए यह अभ्यास धैर्य का पाठ भी है, क्योंकि कम गलतियों वाला साफ प्रयास तेज लेकिन अशुद्ध प्रयास से अधिक उपयोगी होता है।"
  ];

  applyEditorialPassagePools(data);
  window.GJU_TYPING_PASSAGES = data;
})();
