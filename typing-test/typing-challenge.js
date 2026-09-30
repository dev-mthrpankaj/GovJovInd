(function () {
  "use strict";

  const app = document.getElementById("typingTestApp");
  const resultPanel = document.getElementById("resultPanel");
  const storage = window.GJUTypingStorage;
  const config = window.GJU_TYPING_CONFIG;
  const passages = window.GJU_TYPING_PASSAGES || {};
  if (!app || !resultPanel || !storage || !config) return;

  const routeParams = new URLSearchParams(window.location.search);
  const challengeWpm = Number(routeParams.get("challengeWpm"));
  const challengeAccuracy = Number(routeParams.get("challengeAccuracy"));
  const hasIncomingChallenge =
    Number.isFinite(challengeWpm) && challengeWpm >= 0 &&
    Number.isFinite(challengeAccuracy) && challengeAccuracy >= 0 && challengeAccuracy <= 100;

  let latestResult = null;
  let resultObserver = null;
  let shareBusy = false;

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, (character) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    }[character]));
  }

  function hash(value) {
    return String(value).split("").reduce(
      (total, char) => ((total << 5) - total + char.charCodeAt(0)) | 0,
      0
    );
  }

  function getPassagePool(presetId, language, difficulty) {
    const preset = config.getPreset(presetId);
    const category = preset?.passageCategory || preset?.category || "general";
    const exam = preset?.passageExam || "general";
    return passages?.[language]?.[category]?.[exam]?.[difficulty]
      || passages?.[language]?.[category]?.[exam]?.medium
      || passages?.[language]?.general?.general?.[difficulty]
      || passages?.[language]?.general?.general?.medium
      || [];
  }

  function getChallengePassageIndex(result) {
    const presetId = result?.presetId || routeParams.get("preset") || config.defaultPresetId;
    const language = result?.language || routeParams.get("language") || "english";
    const difficulty = result?.difficulty || routeParams.get("difficulty") || "medium";
    const pool = getPassagePool(presetId, language, difficulty);

    if (!pool.length) return null;

    const explicit = Number(routeParams.get("passage"));
    if (Number.isInteger(explicit) && explicit >= 0) {
      return explicit % pool.length;
    }

    const seed = `${presetId}-${language}-${difficulty}`;
    return Math.abs(hash(seed)) % pool.length;
  }

  function buildChallengeUrl(result) {
    const params = new URLSearchParams();
    params.set("preset", result.presetId || config.defaultPresetId);
    params.set("language", result.language || "english");
    params.set("difficulty", result.difficulty || "medium");

    const passageIndex = getChallengePassageIndex(result);
    if (Number.isInteger(passageIndex)) params.set("passage", String(passageIndex));

    const duration = Number(result.durationMinutes);
    if (Number.isFinite(duration) && duration > 0) params.set("duration", String(duration));

    params.set("challengeWpm", Number(result.netWPM || 0).toFixed(1));
    params.set("challengeAccuracy", Number(result.accuracy || 0).toFixed(1));

    return new URL(`app.html?${params.toString()}`, window.location.href).href;
  }

  function buildShareData(result) {
    const title = result.exam || "Typing Test";
    const score = Number(result.netWPM || 0).toFixed(1);
    const accuracy = Number(result.accuracy || 0).toFixed(1);
    const url = buildChallengeUrl(result);

    return {
      title: `Challenge: ${title}`,
      text: `⚔️ I scored ${score} WPM with ${accuracy}% accuracy in ${title}. Can you beat me? Take the same typing test →`,
      url
    };
  }

  function ensureStyles() {
    if (document.getElementById("gjuTypingChallengeStyles")) return;
    const style = document.createElement("style");
    style.id = "gjuTypingChallengeStyles";
    style.textContent = `
      .gju-typing-challenge-actions {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 8px;
        margin: 10px 0 4px;
      }
      .gju-typing-challenge-button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        min-height: 44px;
        padding: 10px 16px;
        border: 1px solid #315bd6;
        border-radius: 10px;
        background: #315bd6;
        color: #fff;
        font: inherit;
        font-size: .86rem;
        font-weight: 700;
        cursor: pointer;
        transition: background .15s ease, border-color .15s ease, transform .15s ease;
      }
      .gju-typing-challenge-button:hover {
        background: #2448b8;
        border-color: #2448b8;
      }
      .gju-typing-challenge-button:active {
        transform: translateY(1px);
      }
      .gju-typing-challenge-button:disabled {
        opacity: .65;
        cursor: wait;
      }
      .gju-typing-challenge-banner {
        margin: 0 0 14px;
        padding: 13px 15px;
        border: 1px solid #c7d7fe;
        border-radius: 12px;
        background: #f5f8ff;
        color: #1e3a8a;
        font-size: .84rem;
        line-height: 1.55;
      }
      .gju-typing-challenge-banner strong {
        color: #172440;
      }
      @media (max-width: 600px) {
        .gju-typing-challenge-actions {
          display: grid;
          grid-template-columns: 1fr;
        }
        .gju-typing-challenge-button {
          width: 100%;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function renderIncomingChallenge() {
    if (!hasIncomingChallenge || document.getElementById("gjuTypingIncomingChallenge")) return;
    ensureStyles();

    const banner = document.createElement("div");
    banner.id = "gjuTypingIncomingChallenge";
    banner.className = "gju-typing-challenge-banner";
    banner.setAttribute("role", "status");

    const score = challengeWpm.toFixed(1);
    const accuracy = challengeAccuracy.toFixed(1);
    const target = resultPanel.parentNode === app ? resultPanel : app;
    target.insertBefore(banner, resultPanel);

    banner.innerHTML =
      `⚔️ <strong>Challenge accepted?</strong> Your friend scored ${escapeHtml(score)} WPM with ${escapeHtml(accuracy)}% accuracy. Take the same typing test and try to beat the score.`;
  }

  async function copyFallback(shareData) {
    const text = `${shareData.text}\n${shareData.url}`;

    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }

    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();

    let copied = false;
    try {
      copied = document.execCommand("copy");
    } finally {
      textarea.remove();
    }
    return copied;
  }

  async function shareChallenge(result, button) {
    if (!result || shareBusy) return;
    shareBusy = true;
    button.disabled = true;
    const originalLabel = button.textContent;
    const shareData = buildShareData(result);

    try {
      if (navigator.share) {
        const canShare = !navigator.canShare || navigator.canShare(shareData);
        if (canShare) {
          try {
            await navigator.share(shareData);
            button.textContent = "Challenge shared";
            return;
          } catch (error) {
            if (error?.name === "AbortError") return;
          }
        }
      }

      const copied = await copyFallback(shareData);
      button.textContent = copied ? "Challenge link copied" : "Copy failed — try again";
      if (!copied) window.prompt("Copy your challenge message:", `${shareData.text}\n${shareData.url}`);
    } catch (error) {
      console.warn("[GovJobUpdates] Typing challenge share failed:", error);
      window.prompt("Copy your challenge message:", `${shareData.text}\n${shareData.url}`);
    } finally {
      window.setTimeout(() => {
        button.textContent = originalLabel;
        button.disabled = false;
        shareBusy = false;
      }, 1800);
    }
  }

  function injectChallengeButton(result) {
    if (!result || !resultPanel || !resultPanel.hidden) {
      if (!result) return;
    }

    ensureStyles();
    const existing = document.getElementById("typingChallengeButton");
    if (existing) existing.remove();

    const actionRow = document.createElement("div");
    actionRow.className = "gju-typing-challenge-actions";

    const button = document.createElement("button");
    button.id = "typingChallengeButton";
    button.type = "button";
    button.className = "gju-typing-challenge-button";
    button.innerHTML = '<i class="fas fa-user-friends" aria-hidden="true"></i><span>Challenge Your Friend</span>';
    button.setAttribute("aria-label", "Challenge your friend with this typing result");
    button.addEventListener("click", () => shareChallenge(result, button));

    actionRow.appendChild(button);
    const nextLink = resultPanel.querySelector(".workspace-next");
    if (nextLink) nextLink.insertAdjacentElement("afterend", actionRow);
    else resultPanel.insertBefore(actionRow, resultPanel.firstChild);
  }

  function scheduleResultInjection(result) {
    latestResult = result;
    window.requestAnimationFrame(() => {
      if (!resultPanel.hidden) injectChallengeButton(result);
    });
  }

  function hookStorage() {
    if (storage.__gjuTypingChallengeHooked) return;
    const originalSave = storage.saveResult?.bind(storage);
    if (!originalSave) return;

    storage.saveResult = function (result) {
      latestResult = result;
      const stats = originalSave(result);
      scheduleResultInjection(result);
      return stats;
    };
    storage.__gjuTypingChallengeHooked = true;
  }

  function init() {
    ensureStyles();
    hookStorage();
    renderIncomingChallenge();

    resultObserver = new MutationObserver(() => {
      if (latestResult && !resultPanel.hidden && !document.getElementById("typingChallengeButton")) {
        injectChallengeButton(latestResult);
      }
    });
    resultObserver.observe(resultPanel, { attributes: true, attributeFilter: ["hidden"] });
  }

  init();
})();
