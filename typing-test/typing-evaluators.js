(function (root) {
  "use strict";

  // Character mismatches are never silently treated as official full/half mistakes.
  // SSC full/half classification is a PRACTICE APPROXIMATION only.

  function nonNegative(value, name) {
    if (!Number.isFinite(value) || value < 0) {
      throw new RangeError(`${name} must be non-negative`);
    }
    return value;
  }

  function duration(value) {
    if (!Number.isFinite(value) || value <= 0) {
      throw new RangeError("Time must be positive");
    }
    return value;
  }

  function round2(value) {
    return Math.round((Number(value) || 0) * 100) / 100;
  }

  function tokenizeWords(text) {
    return String(text || "")
      .replace(/\r\n?/g, "\n")
      .trim()
      .split(/\s+/u)
      .filter(Boolean);
  }

  function stripPunctuation(word) {
    return String(word || "").replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, "");
  }

  function isPunctuationOnly(word) {
    return Boolean(word) && !/[\p{L}\p{N}]/u.test(word);
  }

  function sameIgnoreCase(a, b) {
    return String(a).toLocaleLowerCase() === String(b).toLocaleLowerCase();
  }

  function keyDepressionsFromText(text) {
    return Array.from(String(text || "").normalize("NFC").replace(/\r\n?/g, "\n")).length;
  }

  /**
   * Practice approximation of SSC full / half mistakes.
   * Not identical to official evaluator.
   */
  function classifySscMistakes(referenceText, typedText, language) {
    const refWords = tokenizeWords(referenceText);
    const typedWords = tokenizeWords(typedText);
    const isHindi = language === "hindi";

    let fullMistakes = 0;
    let halfMistakes = 0;
    let ri = 0;
    let ti = 0;

    while (ri < refWords.length || ti < typedWords.length) {
      const ref = refWords[ri];
      const typed = typedWords[ti];

      if (ref == null) {
        fullMistakes += 1;
        ti += 1;
        continue;
      }
      if (typed == null) {
        fullMistakes += 1;
        ri += 1;
        continue;
      }

      if (ref === typed) {
        ri += 1;
        ti += 1;
        continue;
      }

      // Transposition of two consecutive words → half mistake
      if (
        ri + 1 < refWords.length &&
        ti + 1 < typedWords.length &&
        refWords[ri] === typedWords[ti + 1] &&
        refWords[ri + 1] === typedWords[ti]
      ) {
        halfMistakes += 1;
        ri += 2;
        ti += 2;
        continue;
      }

      const refCore = stripPunctuation(ref);
      const typedCore = stripPunctuation(typed);

      if (isPunctuationOnly(ref) || isPunctuationOnly(typed)) {
        if (ref !== typed) halfMistakes += 1;
        ri += 1;
        ti += 1;
        continue;
      }

      if (refCore && typedCore && refCore === typedCore && ref !== typed) {
        halfMistakes += 1;
        ri += 1;
        ti += 1;
        continue;
      }

      // Capitalisation (English only)
      if (!isHindi && refCore && typedCore && sameIgnoreCase(refCore, typedCore)) {
        halfMistakes += 1;
        ri += 1;
        ti += 1;
        continue;
      }

      fullMistakes += 1;
      ri += 1;
      ti += 1;
    }

    const totalMistakeUnits = fullMistakes + halfMistakes * 0.5;
    const referenceWordCount = refWords.length;
    const mistakePercent = referenceWordCount
      ? (totalMistakeUnits / referenceWordCount) * 100
      : 0;

    return {
      referenceWordCount,
      typedWordCount: typedWords.length,
      fullMistakes,
      halfMistakes,
      totalMistakeUnits: round2(totalMistakeUnits),
      mistakePercent: round2(mistakePercent),
      classificationNote:
        "Practice approximation of SSC full/half mistakes. Official scripts may be evaluated differently."
    };
  }

  function chsl({
    typedText = "",
    referenceText = "",
    minutes = 10,
    language = "english",
    fullMistakes,
    halfMistakes,
    keyDepressions: keyOverride
  }) {
    const minutesSafe = duration(minutes);
    const keys =
      keyOverride != null
        ? nonNegative(keyOverride, "Key depressions")
        : keyDepressionsFromText(typedText);
    const grossWords = keys / 5;

    let classified = null;
    if (fullMistakes == null || halfMistakes == null) {
      classified = classifySscMistakes(referenceText, typedText, language);
      fullMistakes = classified.fullMistakes;
      halfMistakes = classified.halfMistakes;
    } else {
      fullMistakes = nonNegative(fullMistakes, "Full mistakes");
      halfMistakes = nonNegative(halfMistakes, "Half mistakes");
    }

    const deductions = fullMistakes + halfMistakes * 0.5;
    const netWords = Math.max(0, grossWords - deductions);
    const netWPM = netWords / minutesSafe;
    const grossWPM = grossWords / minutesSafe;
    const requiredSpeed = language === "hindi" ? 30 : 35;

    const referenceWordCount =
      classified?.referenceWordCount ?? tokenizeWords(referenceText).length;
    const totalMistakeUnits = fullMistakes + halfMistakes * 0.5;
    const mistakePercent = referenceWordCount
      ? (totalMistakeUnits / referenceWordCount) * 100
      : 0;

    const withinUrLimit = mistakePercent <= 7;
    const withinReservedLimit = mistakePercent <= 10;
    const speedMet = netWPM >= requiredSpeed;

    return {
      keyDepressions: keys,
      grossWords: round2(grossWords),
      grossWPM: round2(grossWPM),
      fullMistakes,
      halfMistakes,
      deductions: round2(deductions),
      netWords: round2(netWords),
      netWPM: round2(netWPM),
      requiredSpeed,
      referenceWordCount,
      totalMistakeUnits: round2(totalMistakeUnits),
      mistakePercent: round2(mistakePercent),
      urMistakeLimitPercent: 7,
      reservedMistakeLimitPercent: 10,
      withinUrMistakeLimit: withinUrLimit,
      withinReservedMistakeLimit: withinReservedLimit,
      speedMet,
      meetsUrPracticeBenchmark: speedMet && withinUrLimit,
      meetsReservedPracticeBenchmark: speedMet && withinReservedLimit,
      classificationNote:
        classified?.classificationNote ||
        "Self-reviewed counts. Practice estimate only; not an official SSC result."
    };
  }

  function rrb({ words, fullMistakes, halfMistakes, minutes = 10, language = "english" }) {
    [words, fullMistakes, halfMistakes].forEach((value) => nonNegative(value, "Count"));
    const mistakes = fullMistakes + halfMistakes / 2;
    const allowance = words * 0.05;
    const ignoredMistakes = Math.min(mistakes, allowance);
    const finalMistakes = Math.max(0, mistakes - allowance);
    const speed = Math.max(0, (words - finalMistakes * 10) / duration(minutes));
    const requiredSpeed = language === "hindi" ? 25 : 30;
    const minimumWords = requiredSpeed * 10;
    return {
      words,
      fullMistakes,
      halfMistakes,
      mistakes,
      allowance,
      ignoredMistakes,
      finalMistakes,
      speed,
      requiredSpeed,
      minimumWords,
      minimumContentMet: words >= minimumWords,
      meetsBenchmark: minutes === 10 && words >= minimumWords && speed >= requiredSpeed
    };
  }

  function delhiMarks(speed, language = "english") {
    nonNegative(speed, "Speed");
    const minimum = language === "hindi" ? 25 : 30;
    const relative = speed - minimum;
    if (relative < 0) return 0;
    if (relative === 0) return 10;
    if (relative >= 1 && relative <= 5) return 12;
    if (relative >= 6 && relative <= 10) return 15;
    if (relative >= 11 && relative <= 15) return 18;
    if (relative >= 16 && relative <= 20) return 21;
    if (relative > 20) return 25;
    return null;
  }

  function delhi({ strokes, mistakes, minutes = 10, language = "english" }) {
    nonNegative(strokes, "Strokes");
    nonNegative(mistakes, "Mistakes");
    const words = strokes / 5;
    const tentativeSpeed = words / duration(minutes);
    const speed = Math.max(0, tentativeSpeed - mistakes);
    const requiredSpeed = language === "hindi" ? 25 : 30;
    return {
      strokes,
      words,
      mistakes,
      tentativeSpeed,
      speed,
      requiredSpeed,
      marks: minutes === 10 ? delhiMarks(speed, language) : null,
      meetsBenchmark: minutes === 10 && speed >= requiredSpeed
    };
  }

  function upPolice({ words, correctWords, minutes = 15, language = "english" }) {
    nonNegative(words, "Words");
    nonNegative(correctWords, "Correct words");
    if (correctWords > words) {
      throw new RangeError("Correct words cannot exceed total words");
    }
    const speed = words / duration(minutes);
    const accuracy = words ? (correctWords / words) * 100 : 0;
    const requiredSpeed = language === "hindi" ? 25 : 30;
    return {
      words,
      correctWords,
      speed,
      accuracy,
      requiredSpeed,
      requiredAccuracy: 85,
      meetsBenchmark: minutes === 15 && speed >= requiredSpeed && accuracy >= 85
    };
  }

  function chslSpeed(keyDepressions, minutes, language) {
    return {
      speed: nonNegative(keyDepressions, "Key depressions") / 5 / duration(minutes),
      requiredSpeed: language === "hindi" ? 30 : 35
    };
  }

  function destProgress(text, target = 2000) {
    const keyDepressions = keyDepressionsFromText(text);
    return {
      keyDepressions,
      targetKeyDepressions: target,
      progress: Math.min(100, (keyDepressions / target) * 100),
      volumeMet: keyDepressions >= target
    };
  }

  function assess(result, {
    preset = {},
    typed = "",
    reference = "",
    complete = false,
    final = false
  } = {}) {
    const type = preset.evaluationType || "general";
    const common = {
      evaluationType: type,
      rulesVersion: preset.rulesVersion || "GJU-practice-1",
      officialSource: preset.officialSource || null,
      rulesLastVerified: preset.lastVerified || null,
      officialQualification: null,
      fullDurationCompleted: complete,
      assessmentNote: preset.officialRuleNote || "Practice benchmarks only."
    };

    if (type === "general") {
      return {
        ...result,
        ...common,
        assessmentLabel: result.targetAchieved
          ? "PRACTICE TARGET ACHIEVED"
          : "PRACTICE TARGET NOT ACHIEVED"
      };
    }

    if (type === "ssc-dest") {
      const progress = destProgress(typed, preset.targetKeyDepressions);
      return {
        ...result,
        ...common,
        ...progress,
        targetAchieved: complete && progress.volumeMet,
        assessmentLabel: !complete
          ? "EARLY FINISH — VOLUME FEEDBACK"
          : progress.volumeMet
            ? "PRACTICE VOLUME REACHED"
            : "PRACTICE VOLUME NOT REACHED"
      };
    }

    if (type === "ssc-chsl") {
      // Skip heavy classification during live metric ticks
      if (!final) {
        return {
          ...result,
          ...common,
          targetAchieved: false,
          assessmentLabel: "IN PROGRESS"
        };
      }

      const minutes = Number(result.durationMinutes) || 10;
      const language = result.language || "english";
      const ssc = chsl({
        typedText: typed,
        referenceText: reference || "",
        minutes,
        language
      });

      const practiceSpeedMet = ssc.speedMet;
      let label;
      if (!complete) {
        label = "EARLY FINISH — SSC PRACTICE FEEDBACK";
      } else if (practiceSpeedMet && ssc.withinUrMistakeLimit) {
        label = "PRACTICE BENCHMARK MET (UR 7% BAND)";
      } else if (practiceSpeedMet && ssc.withinReservedMistakeLimit) {
        label = "PRACTICE SPEED MET · CHECK MISTAKE % (RESERVED 10%)";
      } else if (practiceSpeedMet) {
        label = "PRACTICE SPEED MET · MISTAKE % ABOVE LIMITS";
      } else {
        label = "PRACTICE SPEED / MISTAKES BELOW BENCHMARK";
      }

      return {
        ...result,
        ...common,
        sscPractice: ssc,
        targetAchieved: complete && practiceSpeedMet,
        assessmentLabel: label,
        assessmentNote:
          (preset.officialRuleNote || common.assessmentNote) +
          " Auto full/half counts are a practice approximation only; they are not an official SSC qualification."
      };
    }

    if (type === "rrb") {
      const words = String(typed).trim().split(/\s+/u).filter(Boolean).length;
      return {
        ...result,
        ...common,
        typedWords: words,
        minimumWords: preset.minimumWordsByLanguage?.[result.language] || 300,
        minimumContentMet:
          words >= (preset.minimumWordsByLanguage?.[result.language] || 300),
        targetAchieved: false,
        assessmentLabel: "MISTAKE REVIEW NEEDED — SPEED NOT ASSESSED"
      };
    }

    return {
      ...result,
      ...common,
      targetAchieved: false,
      assessmentLabel: "PRACTICE FEEDBACK — OFFICIAL RESULT NOT ASSESSED"
    };
  }

  root.GJUTypingEvaluators = {
    assess,
    classifySscMistakes,
    chsl,
    rrb,
    delhi,
    delhiMarks,
    upPolice,
    chslSpeed,
    destProgress
  };

  if (typeof module === "object" && module.exports) {
    module.exports = root.GJUTypingEvaluators;
  }
})(typeof window === "object" ? window : globalThis);
