(function (root) {
  "use strict";

  // Arithmetic and presentation are separate from text/IME handling. In particular,
  // a character mismatch is NEVER silently treated as an official full/half mistake.
  function nonNegative(value, name) {
    if (!Number.isFinite(value) || value < 0) throw new RangeError(`${name} must be non-negative`);
    return value;
  }
  function duration(value) {
    if (!Number.isFinite(value) || value <= 0) throw new RangeError("Time must be positive");
    return value;
  }
  function rrb({ words, fullMistakes, halfMistakes, minutes = 10, language = "english" }) {
    [words, fullMistakes, halfMistakes].forEach(value => nonNegative(value, "Count"));
    const mistakes = fullMistakes + halfMistakes / 2;
    const allowance = words * 0.05;
    const ignoredMistakes = Math.min(mistakes, allowance);
    const finalMistakes = Math.max(0, mistakes - allowance);
    const speed = Math.max(0, (words - finalMistakes * 10) / duration(minutes));
    const requiredSpeed = language === "hindi" ? 25 : 30;
    const minimumWords = requiredSpeed * 10;
    return { words, fullMistakes, halfMistakes, mistakes, allowance, ignoredMistakes,
      finalMistakes, speed, requiredSpeed, minimumWords,
      minimumContentMet: words >= minimumWords,
      meetsBenchmark: minutes === 10 && words >= minimumWords && speed >= requiredSpeed };
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
    // The notice gives whole-WPM ranges; it does not specify rounding in their gaps.
    return null;
  }
  function delhi({ strokes, mistakes, minutes = 10, language = "english" }) {
    nonNegative(strokes, "Strokes"); nonNegative(mistakes, "Mistakes");
    const words = strokes / 5;
    const tentativeSpeed = words / duration(minutes);
    const speed = Math.max(0, tentativeSpeed - mistakes);
    const requiredSpeed = language === "hindi" ? 25 : 30;
    return { strokes, words, mistakes, tentativeSpeed, speed, requiredSpeed,
      marks: minutes === 10 ? delhiMarks(speed, language) : null,
      meetsBenchmark: minutes === 10 && speed >= requiredSpeed };
  }
  function upPolice({ words, correctWords, minutes = 15, language = "english" }) {
    nonNegative(words, "Words"); nonNegative(correctWords, "Correct words");
    if (correctWords > words) throw new RangeError("Correct words cannot exceed total words");
    const speed = words / duration(minutes);
    const accuracy = words ? correctWords / words * 100 : 0;
    const requiredSpeed = language === "hindi" ? 25 : 30;
    return { words, correctWords, speed, accuracy, requiredSpeed, requiredAccuracy: 85,
      meetsBenchmark: minutes === 15 && speed >= requiredSpeed && accuracy >= 85 };
  }
  function chslSpeed(keyDepressions, minutes, language) {
    return { speed: nonNegative(keyDepressions, "Key depressions") / 5 / duration(minutes),
      requiredSpeed: language === "hindi" ? 30 : 35 };
  }
  function destProgress(text, target = 2000) {
    // Final output includes spaces/punctuation; editing keys are not output.
    const keyDepressions = Array.from(String(text).normalize("NFC").replace(/\r\n?/g, "\n")).length;
    return { keyDepressions, targetKeyDepressions: target,
      progress: Math.min(100, keyDepressions / target * 100), volumeMet: keyDepressions >= target };
  }
  function assess(result, { preset = {}, typed = "", complete = false } = {}) {
    const type = preset.evaluationType || "general";
    const common = { evaluationType: type, rulesVersion: preset.rulesVersion || "GJU-practice-1",
      officialSource: preset.officialSource || null, rulesLastVerified: preset.lastVerified || null,
      officialQualification: null, fullDurationCompleted: complete,
      assessmentNote: preset.officialRuleNote || "Practice benchmarks only." };
    if (type === "general") return { ...result, ...common,
      assessmentLabel: result.targetAchieved ? "PRACTICE TARGET ACHIEVED" : "PRACTICE TARGET NOT ACHIEVED" };
    if (type === "ssc-dest") {
      const progress = destProgress(typed, preset.targetKeyDepressions);
      return { ...result, ...common, ...progress, targetAchieved: complete && progress.volumeMet,
        assessmentLabel: !complete ? "EARLY FINISH — VOLUME FEEDBACK" : progress.volumeMet ? "PRACTICE VOLUME REACHED" : "PRACTICE VOLUME NOT REACHED" };
    }
    if (type === "ssc-chsl") return { ...result, ...common,
      targetAchieved: complete && result.speedPass,
      assessmentLabel: !complete ? "EARLY FINISH — SPEED FEEDBACK" : result.speedPass ? "PRACTICE SPEED BENCHMARK MET" : "PRACTICE SPEED BELOW BENCHMARK" };
    if (type === "rrb") {
      const words = String(typed).trim().split(/\s+/u).filter(Boolean).length;
      return { ...result, ...common, typedWords: words, minimumWords: preset.minimumWordsByLanguage?.[result.language] || 300,
        minimumContentMet: words >= (preset.minimumWordsByLanguage?.[result.language] || 300),
        targetAchieved: false, assessmentLabel: "MISTAKE REVIEW NEEDED — SPEED NOT ASSESSED" };
    }
    return { ...result, ...common, targetAchieved: false,
      assessmentLabel: "PRACTICE FEEDBACK — OFFICIAL RESULT NOT ASSESSED" };
  }
  root.GJUTypingEvaluators = { assess, rrb, delhi, delhiMarks, upPolice, chslSpeed, destProgress };
  if (typeof module === "object" && module.exports) module.exports = root.GJUTypingEvaluators;
})(typeof window === "object" ? window : globalThis);
