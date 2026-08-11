(function () {
  "use strict";

  const config = window.GJU_TYPING_CONFIG || {};
  const prefix = config.storagePrefix || "GovJobUpdatesTyping.";
  const historyLimit = Number(config.historyLimit) || 20;
  const memory = {};

  function canUseLocalStorage() {
    try {
      const key = `${prefix}test`;
      localStorage.setItem(key, "1");
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      return false;
    }
  }

  const persistent = canUseLocalStorage();

  function read(key, fallback) {
    try {
      const raw = persistent ? localStorage.getItem(prefix + key) : memory[key];
      return raw ? JSON.parse(raw) : fallback;
    } catch (error) {
      return fallback;
    }
  }

  function write(key, value) {
    try {
      const raw = JSON.stringify(value);
      if (persistent) localStorage.setItem(prefix + key, raw);
      else memory[key] = raw;
      return true;
    } catch (error) {
      try {
        memory[key] = JSON.stringify(value);
      } catch (innerError) {
        return false;
      }
      return false;
    }
  }

  function getStats() {
    return read("stats", {
      totalTests: 0,
      bestWPM: 0,
      bestAccuracy: 0,
      personalBest: null,
      examStats: {},
      history: []
    });
  }

  function saveResult(result) {
    const stats = getStats();
    const examKey = result.presetId || "general";
    const previousExam = stats.examStats[examKey] || {
      totalTests: 0,
      bestWPM: 0,
      bestAccuracy: 0,
      bestResult: null
    };

    stats.totalTests += 1;
    stats.bestWPM = Math.max(Number(stats.bestWPM) || 0, result.netWPM);
    stats.bestAccuracy = Math.max(Number(stats.bestAccuracy) || 0, result.accuracy);
    if (!stats.personalBest || result.netWPM > Number(stats.personalBest.netWPM || 0)) {
      stats.personalBest = result;
    }

    previousExam.totalTests += 1;
    previousExam.bestWPM = Math.max(Number(previousExam.bestWPM) || 0, result.netWPM);
    previousExam.bestAccuracy = Math.max(Number(previousExam.bestAccuracy) || 0, result.accuracy);
    if (!previousExam.bestResult || result.netWPM > Number(previousExam.bestResult.netWPM || 0)) {
      previousExam.bestResult = result;
    }
    stats.examStats[examKey] = previousExam;

    stats.history = [result].concat(Array.isArray(stats.history) ? stats.history : []).slice(0, historyLimit);
    write("stats", stats);
    return stats;
  }

  window.GJUTypingStorage = {
    isPersistent: persistent,
    read,
    write,
    getStats,
    saveResult
  };
})();
