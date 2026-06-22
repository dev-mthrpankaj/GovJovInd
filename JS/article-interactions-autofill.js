(function () {
  "use strict";

  function getLoginHref() {
    const path = window.location.pathname.replace(/\\/g, "/");
    if (/\/HTML\/student-hub\/[^/]+\.html$/i.test(path)) {
      return "../../HTML/login.html";
    }
    return "./HTML/login.html";
  }

  function hasRequiredMarkup() {
    return document.getElementById("articleLikeBtn") &&
      document.getElementById("articleDislikeBtn") &&
      document.getElementById("articleCommentsContainer");
  }

  function createInteractionsSection() {
    if (hasRequiredMarkup()) return;

    const legacyActions = document.querySelector(".article-actions");
    const article = document.querySelector("main article");
    const main = document.querySelector("main.blog-article-page") || document.querySelector("main");
    if (!main) return;

    if (legacyActions) {
      legacyActions.remove();
    }

    const section = document.createElement("section");
    section.className = "article-interactions";
    section.setAttribute("aria-label", "Article engagement");
    section.innerHTML = `
      <div class="interactions-divider"></div>

      <div class="interactions-votes">
        <span class="interactions-votes-label">Was this helpful?</span>
        <div class="vote-button-group">
          <button id="articleLikeBtn" class="vote-btn" aria-label="Like this article">
            <i class="fas fa-thumbs-up"></i>
            <span>Like</span>
          </button>
          <span id="articleLikeCount" class="vote-count">0</span>
        </div>
        <div class="vote-button-group">
          <button id="articleDislikeBtn" class="vote-btn" aria-label="Dislike this article">
            <i class="fas fa-thumbs-down"></i>
            <span>Dislike</span>
          </button>
          <span id="articleDislikeCount" class="vote-count">0</span>
        </div>
      </div>

      <div class="interactions-comments">
        <h3 class="comments-title">
          <i class="fas fa-comments"></i>
          Discussion
          <span class="comments-count">0</span>
        </h3>

        <div id="articleCommentInputWrapper" class="comment-input-wrapper" style="display: none;">
          <div class="comment-input-box">
            <textarea id="articleCommentInput" class="comment-textarea" placeholder="Share your thoughts, tips, or experience related to this article... (Ctrl+Enter to submit)" maxlength="1000" aria-label="Write a comment"></textarea>
            <div class="comment-actions">
              <button id="articleSubmitCommentBtn" class="comment-btn comment-btn-submit" type="button">
                <i class="fas fa-paper-plane"></i> Post Comment
              </button>
            </div>
          </div>
        </div>

        <div id="articleCommentAuthPrompt" class="comment-auth-prompt">
          <div class="comment-auth-prompt-icon">
            <i class="fas fa-lock"></i>
          </div>
          <h4 class="comment-auth-prompt-title">Join the Discussion</h4>
          <p class="comment-auth-prompt-text">Login to your account to share comments, tips, and engage with other aspirants.</p>
          <button class="comment-auth-prompt-btn" onclick="window.location.href='${getLoginHref()}'">
            <i class="fas fa-sign-in-alt"></i> Login Now
          </button>
        </div>

        <div id="articleCommentsContainer" class="comments-list" aria-live="polite" aria-label="Comments section">
          <div class="interactions-loading">
            <div class="loading-spinner"></div>
            <span>Loading comments...</span>
          </div>
        </div>
      </div>
    `;

    if (article && article.parentNode === main) {
      article.insertAdjacentElement("afterend", section);
    } else {
      main.appendChild(section);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", createInteractionsSection);
  } else {
    createInteractionsSection();
  }
})();
