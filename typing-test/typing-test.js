(function () {
  "use strict";

  const config = window.GJU_TYPING_CONFIG;
  const passages = window.GJU_TYPING_PASSAGES || {};
  const storage = window.GJUTypingStorage;
  if (!config) return;

  const app = document.getElementById("typingTestApp");
  if (!app) return;

  const state = {
    status: "idle",
    preset: null,
    language: "english",
    difficulty: "medium",
    durationMinutes: 10,
    targetWPM: 35,
    targetAccuracy: 95,
    passage: "",
    passageIndex: null,
    startedAt: 0,
    pausedAt: 0,
    pausedMs: 0,
    finishedAt: 0,
    typed: "",
    composing: false,
    lastResult: null
  };

  const dom = {};
  let attemptFontSize = 22;
  let passageScrollFrame = 0;
  let lastPassageLineTop = 0;
  const routeParams = new URLSearchParams(window.location.search);
  const routePresetId = routeParams.get("preset") || app.dataset.presetId || config.defaultPresetId;

  function init() {
    cacheDom();
    buildPresetOptions();
    bindEvents();
    selectPreset(routePresetId);
    renderStats();
    setStatus("ready");
    render();
    syncAttemptFontSize();
    focusTypingInput(false);
  }

  function cacheDom() {
    [
      "presetSelect",
      "languageSelect",
      "difficultySelect",
      "durationSelect",
      "customDurationField",
      "customDuration",
      "targetWPM",
      "targetAccuracy",
      "modeLabel",
      "examLabel",
      "languageLabel",
      "timerText",
      "liveWPM",
      "liveAccuracy",
      "targetWPMText",
      "targetAccuracyText",
      "passageText",
      "typingInput",
      "progressBar",
      "progressText",
      "startButton",
      "submitButton",
      "cancelButton",
      "pauseButton",
      "restartButton",
      "resultPanel",
      "resultGrid",
      "resultStatus",
      "disclaimerText",
      "storageText",
      "historyList",
      "totalTests",
      "bestWPM",
      "bestAccuracy",
      "keyboardNote",
      "statusText",
      "liveWords",
      "fontDecrease",
      "fontIncrease",
      "fontSizeValue",
      "fullscreenSwitch",
      "attemptInfo"
    ].forEach((id) => {
      dom[id] = document.getElementById(id);
    });
  }

  function bindEvents() {
    dom.presetSelect?.addEventListener("change", () => selectPreset(dom.presetSelect.value));
    dom.languageSelect?.addEventListener("change", () => {
      state.language = dom.languageSelect.value;
      state.targetWPM = getTargetWPMForLanguage(state.preset, state.language);
      if (dom.targetWPM) dom.targetWPM.value = state.targetWPM;
      prepareTest();
      render();
    });
    dom.difficultySelect?.addEventListener("change", () => {
      state.difficulty = dom.difficultySelect.value;
      prepareTest();
      render();
    });
    dom.durationSelect?.addEventListener("change", syncDurationFromControls);
    dom.customDuration?.addEventListener("input", syncDurationFromControls);
    dom.targetWPM?.addEventListener("input", syncTargetsFromControls);
    dom.targetAccuracy?.addEventListener("input", syncTargetsFromControls);
    dom.startButton?.addEventListener("click", startTest);
    dom.submitButton?.addEventListener("click", submitAttempt);
    dom.cancelButton?.addEventListener("click", cancelAttempt);
    dom.pauseButton?.addEventListener("click", togglePause);
    dom.restartButton?.addEventListener("click", restartTest);
    dom.fontDecrease?.addEventListener("click", () => updateAttemptFontSize(-1));
    dom.fontIncrease?.addEventListener("click", () => updateAttemptFontSize(1));
    dom.fullscreenSwitch?.addEventListener("change", toggleFullscreen);
    dom.typingInput?.addEventListener("paste", (event) => {
      event.preventDefault();
      showStatus("Pasting is disabled for clean typing metrics.");
    });
    dom.typingInput?.addEventListener("drop", (event) => event.preventDefault());
    dom.typingInput?.addEventListener("copy", (event) => event.preventDefault());
    dom.typingInput?.addEventListener("compositionstart", () => {
      state.composing = true;
    });
    dom.typingInput?.addEventListener("compositionend", () => {
      state.composing = false;
      handleTypingInput();
    });
    dom.typingInput?.addEventListener("input", handleTypingInput);
    dom.typingInput?.addEventListener("keydown", (event) => {
      if (event.key === "Tab") return;
      if (state.status === "ready" && !state.composing && event.key.length === 1) {
        startClock();
      }
    });

    window.addEventListener("beforeunload", (event) => {
      if (state.status !== "running") return;
      event.preventDefault();
      event.returnValue = "";
    });
    document.addEventListener("fullscreenchange", () => {
      if (dom.fullscreenSwitch) dom.fullscreenSwitch.checked = Boolean(document.fullscreenElement);
    });

    window.setInterval(tick, 180);
  }

  function buildPresetOptions() {
    if (!dom.presetSelect) return;
    dom.presetSelect.innerHTML = config.presets.map((preset) => {
      return `<option value="${escapeHtml(preset.id)}">${escapeHtml(preset.name)}</option>`;
    }).join("");
  }

  function selectPreset(presetId) {
    const preset = config.getPreset(presetId);
    state.preset = preset;
    state.language = preset.defaultLanguage || preset.languages[0] || "english";
    state.difficulty = preset.difficulty || "medium";
    const routeLanguage = routeParams.get("language");
    const routeDifficulty = routeParams.get("difficulty");
    const routePassage = Number(routeParams.get("passage"));
    if (routeLanguage && preset.languages.includes(routeLanguage)) {
      state.language = routeLanguage;
    }
    if (routeDifficulty && config.difficulties.includes(routeDifficulty)) {
      state.difficulty = routeDifficulty;
    }
    state.passageIndex = Number.isFinite(routePassage) ? routePassage : null;
    state.durationMinutes = Number(preset.duration) || 10;
    state.targetWPM = getTargetWPMForLanguage(preset, state.language);
    state.targetAccuracy = Number(preset.targetAccuracy) || 95;
    state.typed = "";
    state.lastResult = null;

    if (dom.presetSelect) dom.presetSelect.value = preset.id;
    renderControlsForPreset();
    prepareTest();
    setStatus("ready");
    render();
  }

  function renderControlsForPreset() {
    const preset = state.preset;
    if (!preset) return;

    if (dom.languageSelect) {
      dom.languageSelect.innerHTML = preset.languages.map((language) => {
        return `<option value="${escapeHtml(language)}">${label(language)}</option>`;
      }).join("");
      dom.languageSelect.value = state.language;
    }

    if (dom.difficultySelect) {
      dom.difficultySelect.innerHTML = config.difficulties.map((difficulty) => {
        return `<option value="${escapeHtml(difficulty)}">${label(difficulty)}</option>`;
      }).join("");
      dom.difficultySelect.value = state.difficulty;
    }

    if (dom.durationSelect) {
      const options = config.durations.map((duration) => {
        return `<option value="${duration}">${duration} minute${duration === 1 ? "" : "s"}</option>`;
      }).join("");
      dom.durationSelect.innerHTML = `${options}<option value="custom">Custom</option>`;
      dom.durationSelect.value = config.durations.includes(state.durationMinutes) ? String(state.durationMinutes) : "custom";
    }

    if (dom.customDuration) dom.customDuration.value = state.durationMinutes;
    if (dom.targetWPM) dom.targetWPM.value = state.targetWPM;
    if (dom.targetAccuracy) dom.targetAccuracy.value = state.targetAccuracy;
    updateCustomDurationVisibility();
  }

  function getTargetWPMForLanguage(preset, language) {
    const languageTarget = preset?.targetWPMByLanguage?.[language];
    return Number(languageTarget || preset?.targetWPM) || 30;
  }

  function syncDurationFromControls() {
    const selected = dom.durationSelect?.value || String(state.durationMinutes);
    if (selected === "custom") {
      state.durationMinutes = clamp(Number(dom.customDuration?.value) || 1, 1, 180);
    } else {
      state.durationMinutes = Number(selected) || 10;
      if (dom.customDuration) dom.customDuration.value = state.durationMinutes;
    }
    updateCustomDurationVisibility();
    prepareForChangedSetting();
  }

  function syncTargetsFromControls() {
    state.targetWPM = clamp(Number(dom.targetWPM?.value) || 1, 1, 300);
    state.targetAccuracy = clamp(Number(dom.targetAccuracy?.value) || 1, 1, 100);
    prepareForChangedSetting(false);
  }

  function updateCustomDurationVisibility() {
    if (!dom.customDurationField || !dom.durationSelect) return;
    dom.customDurationField.hidden = dom.durationSelect.value !== "custom";
  }

  function prepareForChangedSetting(renewPassage = true) {
    if (state.status === "running" || state.status === "paused") return;
    if (renewPassage) prepareTest();
    setStatus("ready");
    render();
  }

  function prepareTest() {
    state.passage = choosePassage(state.preset, state.language, state.difficulty);
    state.typed = "";
    state.startedAt = 0;
    state.pausedAt = 0;
    state.pausedMs = 0;
    state.finishedAt = 0;
    state.lastResult = null;
    lastPassageLineTop = 0;
    if (dom.typingInput) {
      dom.typingInput.value = "";
      dom.typingInput.disabled = false;
    }
  }

  function choosePassage(preset, language, difficulty) {
    const category = preset?.passageCategory || preset?.category || "general";
    const exam = preset?.passageExam || "general";
    const pool = passages?.[language]?.[category]?.[exam]?.[difficulty]
      || passages?.[language]?.[category]?.[exam]?.medium
      || passages?.[language]?.general?.general?.[difficulty]
      || passages?.[language]?.general?.general?.medium
      || [];
    if (!pool.length) return "Practice typing with care. No passage is configured for this selection yet.";
    if (Number.isFinite(state.passageIndex)) {
      return pool[Math.abs(state.passageIndex) % pool.length];
    }
    const seed = `${preset?.id || "general"}-${language}-${difficulty}`;
    const index = Math.abs(hash(seed)) % pool.length;
    return pool[index];
  }

  function startTest() {
    if (state.status === "finished") restartTest();
    if (state.status === "idle") setStatus("ready");
    if (state.status === "paused") {
      resumeTest();
      return;
    }
    startClock();
    focusTypingInput(true);
  }

  function startClock() {
    if (state.status === "running") return;
    if (state.status !== "ready") return;
    state.startedAt = performance.now();
    state.pausedMs = 0;
    state.finishedAt = 0;
    setStatus("running");
    render();
  }

  function togglePause() {
    if (state.status === "running") {
      state.pausedAt = performance.now();
      setStatus("paused");
      if (dom.typingInput) dom.typingInput.disabled = true;
      render();
      return;
    }
    if (state.status === "paused") resumeTest();
  }

  function resumeTest() {
    state.pausedMs += performance.now() - state.pausedAt;
    state.pausedAt = 0;
    if (dom.typingInput) dom.typingInput.disabled = false;
    setStatus("running");
    render();
    focusTypingInput(true);
  }

  function restartTest() {
    prepareTest();
    setStatus("ready");
    render();
    focusTypingInput(true);
  }

  function cancelAttempt() {
    if (state.status === "running" && !window.confirm("Current typing attempt cancel karna hai?")) return;
    if (window.history.length > 1) {
      window.history.back();
      return;
    }
    window.location.href = "index.html";
  }

  function submitAttempt() {
    const typedValue = dom.typingInput?.value || state.typed || "";
    if (!typedValue.trim()) {
      showStatus("Type at least one character before submitting.");
      focusTypingInput(true);
      return;
    }
    finishTest();
  }

  function handleTypingInput() {
    if (state.composing) return;
    if (state.status === "finished" || state.status === "paused") return;
    if (state.status === "ready" && dom.typingInput?.value) startClock();
    state.typed = dom.typingInput?.value || "";
    if (splitTextUnits(state.typed).length >= splitTextUnits(state.passage).length) finishTest();
    render();
  }

  function tick() {
    if (state.status !== "running") return;
    if (getRemainingSeconds() <= 0) {
      finishTest();
      return;
    }
    renderLiveMetrics();
  }

  function finishTest() {
    if (state.status === "finished") return;
    state.finishedAt = performance.now();
    state.typed = dom.typingInput?.value || state.typed;
    const result = calculateResult();
    state.lastResult = result;
    storage?.saveResult(result);
    if (dom.typingInput) dom.typingInput.disabled = true;
    setStatus("finished");
    render();
    renderStats();
    dom.resultPanel?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function setStatus(nextStatus) {
    state.status = nextStatus;
    app.dataset.state = nextStatus;
  }

  function getElapsedMs() {
    if (!state.startedAt) return 0;
    const end = state.finishedAt || (state.status === "paused" ? state.pausedAt : performance.now());
    return Math.max(0, end - state.startedAt - state.pausedMs);
  }

  function getElapsedMinutes() {
    return Math.max(getElapsedMs() / 60000, 1 / 60000);
  }

  function getRemainingSeconds() {
    const total = state.durationMinutes * 60;
    return Math.max(0, total - getElapsedMs() / 1000);
  }

  function calculateResult() {
    const typed = state.typed || "";
    const reference = state.passage || "";
    const typedUnits = splitTextUnits(typed);
    const referenceUnits = splitTextUnits(reference);
    const elapsedMinutes = Math.min(state.durationMinutes, Math.max(getElapsedMinutes(), typed ? 1 / 60 : 1 / 60000));
    const typedChars = typedUnits.length;
    let correctChars = 0;
    let incorrectChars = 0;

    for (let index = 0; index < typedUnits.length; index += 1) {
      if (typedUnits[index] === referenceUnits[index]) correctChars += 1;
      else incorrectChars += 1;
    }

    const targetWords = reference.trim().split(/\s+/).filter(Boolean);
    const typedWords = typed.trim().split(/\s+/).filter(Boolean);
    let correctWords = 0;
    let incorrectWords = 0;
    typedWords.forEach((word, index) => {
      if (word === targetWords[index]) correctWords += 1;
      else incorrectWords += 1;
    });

    const grossWPM = typedChars / 5 / elapsedMinutes;
    const errors = incorrectChars;
    const netWPM = Math.max(0, (typedChars / 5 - errors / 5) / elapsedMinutes);
    const accuracy = typedChars ? correctChars / typedChars * 100 : 0;
    const speedPass = netWPM >= state.targetWPM;
    const accuracyPass = accuracy >= state.targetAccuracy;

    return {
      id: `${Date.now()}-${Math.round(netWPM * 10)}`,
      presetId: state.preset?.id || "general",
      exam: state.preset?.name || "Typing Test",
      mode: state.preset?.mode || "practice",
      language: state.language,
      difficulty: state.difficulty,
      durationMinutes: state.durationMinutes,
      timeTakenSeconds: typedChars ? Math.max(1, Math.round(elapsedMinutes * 60)) : 0,
      grossWPM: round(grossWPM),
      netWPM: round(netWPM),
      accuracy: round(accuracy),
      correctCharacters: correctChars,
      incorrectCharacters: incorrectChars,
      totalTypedCharacters: typedChars,
      correctWords,
      incorrectWords,
      errors,
      targetWPM: state.targetWPM,
      targetAccuracy: state.targetAccuracy,
      speedPass,
      accuracyPass,
      targetAchieved: speedPass && accuracyPass,
      completedAt: new Date().toISOString()
    };
  }

  function render() {
    renderLiveMetrics();
    renderPassage();
    renderMeta();
    renderResult();
    renderButtonState();
  }

  function renderLiveMetrics() {
    const preview = calculateResult();
    setText(dom.timerText, formatClock(getRemainingSeconds()));
    setText(dom.liveWPM, preview.netWPM.toFixed(1));
    setText(dom.liveAccuracy, `${preview.accuracy.toFixed(1)}%`);
    setText(dom.targetWPMText, String(state.targetWPM));
    setText(dom.targetAccuracyText, `${state.targetAccuracy}%`);
    const typedLength = splitTextUnits(state.typed || "").length;
    const typedWords = state.typed.trim().split(/\s+/).filter(Boolean).length;
    const passageLength = splitTextUnits(state.passage || "").length;
    const progress = passageLength ? Math.min(100, (typedLength / passageLength) * 100) : 0;
    if (dom.progressBar) dom.progressBar.style.width = `${progress}%`;
    setText(dom.progressText, `${Math.round(progress)}% complete`);
    setText(dom.liveWords, String(typedWords));
  }

  function renderPassage() {
    if (!dom.passageText) return;
    const typed = splitTextUnits(state.typed || "");
    const reference = splitTextUnits(state.passage || "");
    let html = "";
    for (let index = 0; index < reference.length; index += 1) {
      const char = reference[index];
      let className = "gju-typing-char";
      if (index < typed.length) className += typed[index] === char ? " is-correct" : " is-incorrect";
      else if (index === typed.length) className += " is-current";
      if (char.includes("\n")) {
        html += `<span class="${className} gju-typing-line-break"><span class="gju-typing-enter-marker">Enter</span></span><br>`;
        continue;
      }
      html += `<span class="${className}">${escapeHtml(char)}</span>`;
    }
    dom.passageText.innerHTML = html;
    keepCurrentPassageLineVisible();
  }

  function keepCurrentPassageLineVisible() {
    if (!dom.passageText || state.status === "finished") return;
    if (passageScrollFrame) window.cancelAnimationFrame(passageScrollFrame);
    passageScrollFrame = window.requestAnimationFrame(() => {
      passageScrollFrame = 0;
      const current = dom.passageText.querySelector(".gju-typing-char.is-current");
      if (!current) return;

      const panel = dom.passageText;
      const currentTop = current.offsetTop;
      const currentBottom = currentTop + current.offsetHeight;
      const visibleTop = panel.scrollTop;
      const visibleBottom = visibleTop + panel.clientHeight;
      const lineHeight = parseFloat(window.getComputedStyle(panel).lineHeight) || current.offsetHeight || 28;
      const hasChangedLine = currentTop > lastPassageLineTop + lineHeight * 0.45;
      const nearBottom = currentBottom > visibleBottom - lineHeight * 1.2;

      if (!lastPassageLineTop) {
        lastPassageLineTop = currentTop;
      }

      if (hasChangedLine) {
        lastPassageLineTop = currentTop;
      }

      if (hasChangedLine && nearBottom) {
        panel.scrollTo({
          top: Math.min(panel.scrollHeight - panel.clientHeight, visibleTop + lineHeight),
          behavior: "auto"
        });
        return;
      }

      if (currentTop < visibleTop + lineHeight && visibleTop > 0) {
        panel.scrollTo({
          top: Math.max(0, currentTop - lineHeight * 1.5),
          behavior: "auto"
        });
      }
    });
  }

  function renderMeta() {
    const preset = state.preset;
    setText(dom.modeLabel, label(preset?.mode || "practice"));
    setText(dom.examLabel, preset?.name || "Typing Test");
    setText(dom.languageLabel, label(state.language));
    setText(dom.disclaimerText, preset?.disclaimer || "Practice settings are configurable. For exam-specific preparation, verify the latest official notification.");
    setText(dom.keyboardNote, preset?.keyboardNote || "Future keyboard layout support can be added for Remington/GAIL and InScript without changing the core engine.");
    setText(dom.storageText, storage?.isPersistent ? "Progress is saved on this device." : "Local storage is unavailable; progress will remain for this session only.");
    setText(dom.statusText, label(state.status));
  }

  function renderButtonState() {
    if (dom.startButton) {
      dom.startButton.disabled = state.status === "running";
      dom.startButton.textContent = state.status === "paused" ? "Resume" : "Start";
    }
    if (dom.pauseButton) {
      dom.pauseButton.disabled = !(state.status === "running" || state.status === "paused");
      dom.pauseButton.textContent = state.status === "paused" ? "Resume" : "Pause";
    }
    if (dom.restartButton) dom.restartButton.disabled = state.status === "idle";
    if (dom.submitButton) dom.submitButton.disabled = state.status === "finished" || !Boolean((dom.typingInput?.value || state.typed || "").trim());
  }

  function updateAttemptFontSize(delta) {
    attemptFontSize = clamp(attemptFontSize + delta, 16, 34);
    syncAttemptFontSize();
  }

  function syncAttemptFontSize() {
    app.style.setProperty("--gju-attempt-font-size", `${attemptFontSize}px`);
    setText(dom.fontSizeValue, String(attemptFontSize));
  }

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      const request = app.requestFullscreen?.();
      if (request && typeof request.catch === "function") {
        request.catch(() => {
          if (dom.fullscreenSwitch) dom.fullscreenSwitch.checked = false;
        });
      }
      if (dom.fullscreenSwitch) dom.fullscreenSwitch.checked = true;
      return;
    }
    const exit = document.exitFullscreen?.();
    if (exit && typeof exit.catch === "function") {
      exit.catch(() => {
        if (dom.fullscreenSwitch) dom.fullscreenSwitch.checked = Boolean(document.fullscreenElement);
      });
    }
    if (dom.fullscreenSwitch) dom.fullscreenSwitch.checked = false;
  }

  function focusTypingInput(force) {
    if (!dom.typingInput) return;
    const coarsePointer = window.matchMedia?.("(pointer: coarse)")?.matches;
    if (!force && coarsePointer) return;
    dom.typingInput.focus({ preventScroll: true });
  }

  function renderResult() {
    if (!dom.resultPanel || !dom.resultGrid || !dom.resultStatus) return;
    const result = state.lastResult;
    dom.resultPanel.hidden = !result;
    if (!result) return;

    dom.resultStatus.className = `gju-typing-result-status ${result.targetAchieved ? "is-pass" : "is-fail"}`;
    dom.resultStatus.textContent = result.targetAchieved ? "TARGET ACHIEVED" : "TARGET NOT ACHIEVED";
    dom.resultGrid.innerHTML = [
      metric("Speed", `${result.netWPM.toFixed(1)} WPM`),
      metric("Gross Speed", `${result.grossWPM.toFixed(1)} WPM`),
      metric("Accuracy", `${result.accuracy.toFixed(1)}%`),
      metric("Correct Characters", result.correctCharacters.toLocaleString("en-IN")),
      metric("Incorrect Characters", result.incorrectCharacters.toLocaleString("en-IN")),
      metric("Total Typed", result.totalTypedCharacters.toLocaleString("en-IN")),
      metric("Correct Words", result.correctWords.toLocaleString("en-IN")),
      metric("Incorrect Words", result.incorrectWords.toLocaleString("en-IN")),
      metric("Errors", result.errors.toLocaleString("en-IN")),
      metric("Time", formatDuration(result.timeTakenSeconds)),
      metric("Target WPM", String(result.targetWPM), result.speedPass ? "Pass" : "Needs work"),
      metric("Target Accuracy", `${result.targetAccuracy}%`, result.accuracyPass ? "Pass" : "Needs work")
    ].join("");
  }

  function renderStats() {
    const stats = storage?.getStats?.() || { totalTests: 0, bestWPM: 0, bestAccuracy: 0, history: [] };
    setText(dom.totalTests, String(stats.totalTests || 0));
    setText(dom.bestWPM, `${round(stats.bestWPM || 0).toFixed(1)} WPM`);
    setText(dom.bestAccuracy, `${round(stats.bestAccuracy || 0).toFixed(1)}%`);
    if (!dom.historyList) return;
    const history = Array.isArray(stats.history) ? stats.history.slice(0, 5) : [];
    dom.historyList.innerHTML = history.length ? history.map((item) => {
      return `<li><strong>${escapeHtml(item.exam)}</strong><span>${item.netWPM.toFixed(1)} WPM · ${item.accuracy.toFixed(1)}% · ${label(item.language)}</span></li>`;
    }).join("") : "<li><strong>No attempts yet</strong><span>Your recent results will appear here.</span></li>";
  }

  function metric(labelText, value, tag) {
    return `<article class="gju-typing-result-metric"><span>${escapeHtml(labelText)}</span><strong>${escapeHtml(value)}</strong>${tag ? `<em>${escapeHtml(tag)}</em>` : ""}</article>`;
  }

  function showStatus(message) {
    setText(dom.statusText, message);
  }

  function setText(node, value) {
    if (node) node.textContent = value;
  }

  function label(value) {
    return String(value || "").replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
  }

  function round(value) {
    return Math.round((Number(value) || 0) * 10) / 10;
  }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function hash(value) {
    return String(value).split("").reduce((total, char) => ((total << 5) - total + char.charCodeAt(0)) | 0, 0);
  }

  function formatClock(seconds) {
    const safe = Math.max(0, Math.ceil(seconds));
    const minutes = Math.floor(safe / 60);
    const remaining = safe % 60;
    return `${String(minutes).padStart(2, "0")} mins : ${String(remaining).padStart(2, "0")} sec`;
  }

  function formatDuration(seconds) {
    const safe = Math.max(0, Number(seconds) || 0);
    const minutes = Math.floor(safe / 60);
    const remaining = safe % 60;
    return `${minutes}:${String(remaining).padStart(2, "0")}`;
  }

  function splitTextUnits(value) {
    const text = String(value || "");
    if (window.Intl && typeof Intl.Segmenter === "function") {
      try {
        const segmenter = new Intl.Segmenter(undefined, { granularity: "grapheme" });
        return Array.from(segmenter.segment(text), (part) => part.segment);
      } catch (error) {
        return Array.from(text);
      }
    }
    return Array.from(text);
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    }[char]));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
