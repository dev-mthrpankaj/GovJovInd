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
    hindiInputMode: "mangal",
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
  let renderedPassage = null;
  let renderedUnits = [];
  let passageNodes = [];
  const unitCache = new Map();
  const textSegmenter = window.Intl && typeof Intl.Segmenter === "function"
    ? new Intl.Segmenter(undefined, { granularity: "grapheme" }) : null;
  const routeParams = new URLSearchParams(window.location.search);
  const routePresetId = routeParams.get("preset") || app.dataset.presetId || config.defaultPresetId;

  function trackTypingEvent(name, params = {}) {
    window.GJU_ANALYTICS?.track(name, {
      tool_type: "typing_test",
      preset_id: state.preset?.id || routePresetId || "general",
      exam_name: state.preset?.name || "Typing Test",
      language: state.language,
      difficulty: state.difficulty,
      ...params
    });
  }

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
      "hindiModeField",
      "hindiInputMode",
      "attemptInfo", "practiceHint", "speedGoal", "speedGoalText", "accuracyGoal",
      "accuracyGoalText", "coachText", "resultAdvice", "retryResult"
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
      updateHindiInputModeVisibility();
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
    dom.retryResult?.addEventListener("click", restartTest);
    dom.fontDecrease?.addEventListener("click", () => updateAttemptFontSize(-1));
    dom.fontIncrease?.addEventListener("click", () => updateAttemptFontSize(1));
    dom.fullscreenSwitch?.addEventListener("change", toggleFullscreen);
    dom.hindiInputMode?.addEventListener("change", () => {
      state.hindiInputMode = dom.hindiInputMode.value === "krutidev" ? "krutidev" : "mangal";
      try {
        window.localStorage?.setItem("gjuTypingHindiInputMode", state.hindiInputMode);
      } catch (error) {
        // Ignore private-mode storage failures; the selector still works for this session.
      }
      prepareForChangedSetting(false);
    });
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
      if (state.status !== "running" && state.status !== "paused") return;
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
    const routeHindiMode = routeParams.get("hindiMode");
    if (routeLanguage && preset.languages.includes(routeLanguage)) {
      state.language = routeLanguage;
    }
    if (routeDifficulty && config.difficulties.includes(routeDifficulty)) {
      state.difficulty = routeDifficulty;
    }
    state.hindiInputMode = getPreferredHindiInputMode(routeHindiMode);
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
    if (dom.hindiInputMode) dom.hindiInputMode.value = state.hindiInputMode;
    updateCustomDurationVisibility();
    updateHindiInputModeVisibility();
  }

  function getPreferredHindiInputMode(routeHindiMode) {
    if (routeHindiMode === "krutidev" || routeHindiMode === "mangal") return routeHindiMode;
    try {
      const saved = window.localStorage?.getItem("gjuTypingHindiInputMode");
      if (saved === "krutidev" || saved === "mangal") return saved;
    } catch (error) {
      return "mangal";
    }
    return "mangal";
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

  function updateHindiInputModeVisibility() {
    if (!dom.hindiModeField) return;
    dom.hindiModeField.hidden = state.language !== "hindi";
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
      dom.typingInput.placeholder = getTypingPlaceholder();
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
    trackTypingEvent("typing_test_started", {
      duration_minutes: state.durationMinutes,
      target_wpm: state.targetWPM,
      target_accuracy: state.targetAccuracy,
      passage_index: Number.isFinite(state.passageIndex) ? state.passageIndex : -1
    });
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
    if ((state.status === "running" || state.status === "paused")
      && !window.confirm("Restart this passage? Your current attempt will be cleared.")) return;
    prepareTest();
    setStatus("ready");
    render();
    focusTypingInput(true);
  }

  function cancelAttempt() {
    if ((state.status === "running" || state.status === "paused")
      && !window.confirm("Leave this test? Your current attempt will not be saved.")) return;
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
    if (splitTextUnits(getScoredTypedText()).length >= splitTextUnits(state.passage).length) finishTest();
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
    state.finishedAt = state.status === "paused" ? state.pausedAt : performance.now();
    state.typed = dom.typingInput?.value || state.typed;
    const result = calculateResult();
    state.lastResult = result;
    storage?.saveResult(result);
    trackTypingEvent("typing_test_completed", {
      duration_minutes: result.durationMinutes,
      time_taken_seconds: result.timeTakenSeconds,
      net_wpm: result.netWPM,
      gross_wpm: result.grossWPM,
      accuracy: result.accuracy,
      errors: result.errors,
      total_typed_characters: result.totalTypedCharacters,
      target_achieved: result.targetAchieved
    });
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
    const typed = getScoredTypedText();
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
    const scoredTyped = getScoredTypedText();
    const typedLength = splitTextUnits(scoredTyped).length;
    const typedWords = scoredTyped.trim().split(/\s+/).filter(Boolean).length;
    const passageLength = splitTextUnits(state.passage || "").length;
    const progress = passageLength ? Math.min(100, (typedLength / passageLength) * 100) : 0;
    if (dom.progressBar) dom.progressBar.style.width = `${progress}%`;
    setText(dom.progressText, `${Math.round(progress)}% complete`);
    setText(dom.liveWords, String(typedWords));
    const speedProgress = Math.min(100, preview.netWPM / state.targetWPM * 100);
    const accuracyProgress = Math.min(100, preview.accuracy / state.targetAccuracy * 100);
    if (dom.speedGoal) dom.speedGoal.value = speedProgress;
    if (dom.accuracyGoal) dom.accuracyGoal.value = accuracyProgress;
    setText(dom.speedGoalText, `${Math.round(speedProgress)}%`);
    setText(dom.accuracyGoalText, `${Math.round(accuracyProgress)}%`);
    app.classList.toggle("is-time-low", state.status === "running" && getRemainingSeconds() <= 60);
    setText(dom.coachText, !typedLength ? "Build a steady rhythm, one word at a time."
      : !preview.accuracyPass ? "Slow down slightly. Check the highlighted mismatches before building speed."
      : !preview.speedPass ? "Your accuracy is on target. Build speed with a steady rhythm."
      : "Both targets reached so far. Keep your rhythm through the rest of the test.");
  }

  function renderPassage() {
    if (!dom.passageText) return;
    const typed = splitTextUnits(getScoredTypedText());
    const reference = splitTextUnits(state.passage || "");
    if (renderedPassage !== state.passage) {
      dom.passageText.innerHTML = reference.map((char) => char.includes("\n")
        ? '<span class="gju-typing-char gju-typing-line-break"><span class="gju-typing-enter-marker">Enter</span></span><br>'
        : `<span class="gju-typing-char">${escapeHtml(char)}</span>`).join("");
      passageNodes = Array.from(dom.passageText.querySelectorAll(".gju-typing-char"));
      renderedPassage = state.passage;
      renderedUnits = [];
    }
    // Update only the edited suffix, including the previous and new cursor.
    // Long passages must not rebuild tens of thousands of nodes on every key.
    let firstChanged = 0;
    while (firstChanged < typed.length && firstChanged < renderedUnits.length
      && typed[firstChanged] === renderedUnits[firstChanged]) firstChanged += 1;
    const lastChanged = Math.min(reference.length - 1, Math.max(typed.length, renderedUnits.length));
    for (let index = firstChanged; index <= lastChanged; index += 1) {
      const char = reference[index];
      let className = "gju-typing-char";
      if (index < typed.length) className += typed[index] === char ? " is-correct" : " is-incorrect";
      else if (index === typed.length) className += " is-current";
      if (char.includes("\n")) className += " gju-typing-line-break";
      passageNodes[index].className = className;
    }
    renderedUnits = typed;
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
    if (app) app.dataset.language = state.language || "english";
    if (app) app.dataset.hindiInputMode = state.hindiInputMode || "mangal";
    updateHindiInputModeVisibility();
    if (dom.hindiInputMode) dom.hindiInputMode.value = state.hindiInputMode;
    if (dom.typingInput) dom.typingInput.placeholder = getTypingPlaceholder();
    setText(dom.modeLabel, label(preset?.mode || "practice"));
    setText(dom.examLabel, preset?.name || "Typing Test");
    setText(dom.languageLabel, state.language === "hindi" ? `Hindi (${getHindiInputModeLabel()})` : label(state.language));
    setText(dom.disclaimerText, preset?.disclaimer || "Practice settings are configurable. For exam-specific preparation, verify the latest official notification.");
    setText(dom.keyboardNote, getKeyboardNote(preset, state.language));
    setText(dom.storageText, storage?.isPersistent ? "Progress is saved on this device." : "Local storage is unavailable; progress will remain for this session only.");
    setText(dom.statusText, label(state.status));
    setText(dom.practiceHint, state.status === "paused" ? "Practice paused. Select Resume when you are ready."
      : state.status === "finished" ? "Attempt complete. Review your feedback below."
      : state.status === "running" ? "Keep a steady rhythm. The underlined character shows your position."
      : "Start typing to begin the timer. Aim for accuracy first.");
    if (dom.passageText) dom.passageText.lang = state.language === "hindi" ? "hi" : "en";
  }

  function getKeyboardNote(preset, language) {
    if (language === "hindi") {
      if (state.hindiInputMode === "krutidev") {
        return "KrutiDev 010 mode is for legacy Remington-style practice. If KrutiDev 010 is not installed, typed keys may look like English letters, but scoring is normalized to Unicode for comparison.";
      }
      if (preset?.keyboardNote) return preset.keyboardNote;
      return "Hindi mode uses Mangal Unicode display. For serious exam practice, select the official Hindi keyboard layout in your system/IME; use phonetic only for casual practice.";
    }
    if (preset?.keyboardNote) return preset.keyboardNote;
    return "English mode uses your standard keyboard layout.";
  }

  function getScoredTypedText(value = state.typed) {
    const typed = String(value || "");
    if (state.language === "hindi" && state.hindiInputMode === "krutidev") {
      return window.GJUHindiFontModes?.krutidevToUnicode?.(typed) || typed;
    }
    return typed.normalize ? typed.normalize("NFC") : typed;
  }

  function getHindiInputModeLabel() {
    return state.hindiInputMode === "krutidev" ? "KrutiDev 010" : "Mangal Unicode";
  }

  function getTypingPlaceholder() {
    if (state.language === "hindi" && state.hindiInputMode === "krutidev") return "KrutiDev keys type here";
    if (state.language === "hindi") return "यहां टाइप करें";
    return "Write here";
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
    if (dom.hindiInputMode) dom.hindiInputMode.disabled = state.status === "running" || state.status === "paused" || state.status === "finished";
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
      if (!app.requestFullscreen) {
        if (dom.fullscreenSwitch) dom.fullscreenSwitch.checked = false;
        showStatus("Fullscreen is not supported by this browser.");
        return;
      }
      const request = app.requestFullscreen();
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
    setText(dom.resultAdvice, result.targetAchieved
      ? "You met both practice targets. Try another passage to build consistency."
      : !result.accuracyPass
        ? `Focus on accuracy next: aim for ${result.targetAccuracy}%. Review the red mismatches above, then retry at a comfortable pace.`
        : `Your accuracy is on target. Build another ${Math.max(0, result.targetWPM - result.netWPM).toFixed(1)} WPM to reach your speed goal.`);
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
    if (unitCache.has(text)) {
      const cached = unitCache.get(text);
      unitCache.delete(text);
      unitCache.set(text, cached);
      return cached;
    }
    let units;
    try {
      units = textSegmenter ? Array.from(textSegmenter.segment(text), (part) => part.segment) : Array.from(text);
    } catch (error) {
      units = Array.from(text);
    }
    unitCache.set(text, units);
    if (unitCache.size > 2) unitCache.delete(unitCache.keys().next().value);
    return units;
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
