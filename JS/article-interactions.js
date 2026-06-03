import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { getDatabase, ref, get, update, remove, push, onValue, off, query, orderByChild } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";

(function () {
  "use strict";

  const config = window.GJU_FIREBASE_CONFIG;
  if (!config || !config.apiKey) {
    console.warn("[ArticleInteractions] Firebase config missing.");
    return;
  }

  const app = getApps().length ? getApps()[0] : initializeApp(config);
  const auth = getAuth(app);
  const db = getDatabase(app);

  // ========== ARTICLE ID DETECTION ==========
  function getArticleId() {
    const path = window.location.pathname;
    const matches = path.match(/\/student-hub\/([^/]+)\.html$/);
    return matches ? matches[1] : null;
  }

  const articleId = getArticleId();
  if (!articleId) {
    console.warn("[ArticleInteractions] Could not detect article ID from URL.");
    return;
  }

  console.log("[ArticleInteractions] Article ID:", articleId);

  // ========== DOM ELEMENTS ==========
  const likeBtn = document.getElementById("articleLikeBtn");
  const dislikeBtn = document.getElementById("articleDislikeBtn");
  const likeCount = document.getElementById("articleLikeCount");
  const dislikeCount = document.getElementById("articleDislikeCount");
  const commentInput = document.getElementById("articleCommentInput");
  const submitCommentBtn = document.getElementById("articleSubmitCommentBtn");
  const commentsContainer = document.getElementById("articleCommentsContainer");
  const commentAuthPrompt = document.getElementById("articleCommentAuthPrompt");
  const commentInputWrapper = document.getElementById("articleCommentInputWrapper");

  if (!likeBtn || !dislikeBtn || !commentsContainer) {
    console.warn("[ArticleInteractions] Required DOM elements not found.");
    return;
  }

  // ========== STATE MANAGEMENT ==========
  const state = {
    currentUser: null,
    userVote: null, // 'like', 'dislike', or null
    likes: 0,
    dislikes: 0,
    comments: [],
    listeners: []
  };

  // ========== UTILITY FUNCTIONS ==========
  function formatTimeAgo(timestamp) {
    if (!timestamp) return "now";
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return "now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return new Intl.DateTimeFormat("en-IN", {
      day: "numeric",
      month: "short",
      year: diffDays > 365 ? "numeric" : undefined
    }).format(date);
  }

  function showError(message) {
    const errorEl = document.createElement("div");
    errorEl.className = "interactions-error";
    errorEl.textContent = message;
    commentsContainer.parentElement.insertBefore(errorEl, commentsContainer);
    setTimeout(() => errorEl.remove(), 5000);
  }

  // ========== AUTH STATE LISTENER ==========
  onAuthStateChanged(auth, (user) => {
    state.currentUser = user;
    console.log("[ArticleInteractions] Auth state changed:", user ? user.uid : "not logged in");
    updateUIState();
    if (user) {
      fetchUserVote();
    } else {
      state.userVote = null;
      updateVoteButtons();
    }
  });

  // ========== VOTE MANAGEMENT ==========
  async function fetchUserVote() {
    if (!state.currentUser) return;

    try {
      const likesRef = ref(db, `article_engagement/${articleId}/likes/${state.currentUser.uid}`);
      const dislikesRef = ref(db, `article_engagement/${articleId}/dislikes/${state.currentUser.uid}`);

      const [likesSnap, dislikesSnap] = await Promise.all([get(likesRef), get(dislikesRef)]);

      if (likesSnap.exists()) {
        state.userVote = "like";
      } else if (dislikesSnap.exists()) {
        state.userVote = "dislike";
      } else {
        state.userVote = null;
      }

      updateVoteButtons();
    } catch (error) {
      console.error("[ArticleInteractions] Error fetching user vote:", error);
    }
  }

  async function toggleVote(voteType) {
    if (!state.currentUser) {
      window.location.href = `${getLoginPath()}/login.html`;
      return;
    }

    try {
      const userId = state.currentUser.uid;
      const likesRef = ref(db, `article_engagement/${articleId}/likes/${userId}`);
      const dislikesRef = ref(db, `article_engagement/${articleId}/dislikes/${userId}`);

      // If user already voted with this type, remove the vote
      if (state.userVote === voteType) {
        if (voteType === "like") {
          await remove(likesRef);
        } else {
          await remove(dislikesRef);
        }
        state.userVote = null;
      } else {
        // Remove old vote and add new vote
        if (state.userVote === "like") {
          await remove(likesRef);
        } else if (state.userVote === "dislike") {
          await remove(dislikesRef);
        }

        // Add new vote
        const timestamp = new Date().getTime();
        if (voteType === "like") {
          await update(likesRef, { liked: true, timestamp });
        } else {
          await update(dislikesRef, { disliked: true, timestamp });
        }
        state.userVote = voteType;
      }

      updateVoteButtons();
    } catch (error) {
      console.error("[ArticleInteractions] Error toggling vote:", error);
      showError("Failed to save your vote. Please try again.");
    }
  }

  function updateVoteButtons() {
    likeBtn.classList.toggle("liked", state.userVote === "like");
    dislikeBtn.classList.toggle("disliked", state.userVote === "dislike");
  }

  // ========== REAL-TIME LISTENERS ==========
  function setupRealTimeListeners() {
    // Listen to likes
    const likesRef = ref(db, `article_engagement/${articleId}/likes`);
    const likesListener = onValue(likesRef, (snapshot) => {
      state.likes = snapshot.exists() ? Object.keys(snapshot.val()).length : 0;
      likeCount.textContent = state.likes;
    });
    state.listeners.push({ ref: likesRef, callback: likesListener });

    // Listen to dislikes
    const dislikesRef = ref(db, `article_engagement/${articleId}/dislikes`);
    const dislikesListener = onValue(dislikesRef, (snapshot) => {
      state.dislikes = snapshot.exists() ? Object.keys(snapshot.val()).length : 0;
      dislikeCount.textContent = state.dislikes;
    });
    state.listeners.push({ ref: dislikesRef, callback: dislikesListener });

    // Listen to comments
    const commentsRef = ref(db, `article_engagement/${articleId}/comments`);
    const commentsListener = onValue(commentsRef, (snapshot) => {
      state.comments = [];
      if (snapshot.exists()) {
        const data = snapshot.val();
        Object.entries(data).forEach(([commentId, comment]) => {
          state.comments.push({ id: commentId, ...comment });
        });
        // Sort by timestamp descending
        state.comments.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
      }
      renderComments();
    });
    state.listeners.push({ ref: commentsRef, callback: commentsListener });
  }

  // ========== COMMENT MANAGEMENT ==========
  async function submitComment() {
    if (!state.currentUser) {
      window.location.href = `${getLoginPath()}/login.html`;
      return;
    }

    const text = commentInput.value.trim();
    if (!text) {
      showError("Please enter a comment.");
      return;
    }

    if (text.length > 1000) {
      showError("Comment cannot exceed 1000 characters.");
      return;
    }

    submitCommentBtn.disabled = true;

    try {
      const commentsRef = ref(db, `article_engagement/${articleId}/comments`);
      const newComment = {
        userId: state.currentUser.uid,
        userName: state.currentUser.displayName || "Anonymous User",
        commentText: text,
        timestamp: new Date().getTime()
      };

      await push(commentsRef, newComment);
      commentInput.value = "";
      commentInput.focus();
    } catch (error) {
      console.error("[ArticleInteractions] Error submitting comment:", error);
      showError("Failed to post comment. Please try again.");
    } finally {
      submitCommentBtn.disabled = false;
    }
  }

  async function deleteComment(commentId) {
    if (!state.currentUser) return;

    const comment = state.comments.find((c) => c.id === commentId);
    if (!comment || comment.userId !== state.currentUser.uid) {
      showError("You can only delete your own comments.");
      return;
    }

    if (!confirm("Are you sure you want to delete this comment?")) return;

    try {
      const commentRef = ref(db, `article_engagement/${articleId}/comments/${commentId}`);
      await remove(commentRef);
    } catch (error) {
      console.error("[ArticleInteractions] Error deleting comment:", error);
      showError("Failed to delete comment. Please try again.");
    }
  }

  function renderComments() {
    const title = document.querySelector(".comments-title");
    if (title) {
      const countEl = title.querySelector(".comments-count");
      if (countEl) {
        countEl.textContent = state.comments.length;
      }
    }

    if (state.comments.length === 0) {
      commentsContainer.innerHTML = `
        <div class="comments-empty">
          <div class="comments-empty-icon">💬</div>
          <div class="comments-empty-text">No comments yet. Be the first to share your thoughts!</div>
        </div>
      `;
      return;
    }

    commentsContainer.innerHTML = state.comments.map((comment) => {
      const isOwner = state.currentUser && comment.userId === state.currentUser.uid;
      const deleteBtn = isOwner
        ? `<button class="comment-delete-btn" data-comment-id="${comment.id}">Delete</button>`
        : "";

      return `
        <div class="comment-item" data-comment-id="${comment.id}">
          <div class="comment-header">
            <div class="comment-user-info">
              <div class="comment-user-name">${escapeHtml(comment.userName)}</div>
              <div class="comment-timestamp">${formatTimeAgo(comment.timestamp)}</div>
            </div>
            <div class="comment-actions-btn">
              ${deleteBtn}
            </div>
          </div>
          <div class="comment-text">${escapeHtml(comment.commentText)}</div>
        </div>
      `;
    }).join("");

    // Bind delete buttons
    commentsContainer.querySelectorAll(".comment-delete-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        deleteComment(btn.dataset.commentId);
      });
    });
  }

  function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  // ========== UI STATE MANAGEMENT ==========
  function updateUIState() {
    const isLoggedIn = !!state.currentUser;

    likeBtn.disabled = !isLoggedIn;
    dislikeBtn.disabled = !isLoggedIn;

    if (commentInputWrapper && commentAuthPrompt) {
      if (isLoggedIn) {
        commentInputWrapper.style.display = "block";
        commentAuthPrompt.style.display = "none";
        submitCommentBtn.disabled = false;
      } else {
        commentInputWrapper.style.display = "none";
        commentAuthPrompt.style.display = "flex";
      }
    }
  }

  function getLoginPath() {
    const path = window.location.pathname.replace(/\\/g, "/");
    if (/\/HTML\/student-hub\/[^/]+\.html$/i.test(path)) {
      return "../..";
    }
    return ".";
  }

  // ========== EVENT LISTENERS ==========
  likeBtn.addEventListener("click", () => toggleVote("like"));
  dislikeBtn.addEventListener("click", () => toggleVote("dislike"));

  if (submitCommentBtn) {
    submitCommentBtn.addEventListener("click", submitComment);
  }

  if (commentInput) {
    commentInput.addEventListener("keydown", (e) => {
      if (e.ctrlKey && e.key === "Enter") {
        submitComment();
      }
    });
  }

  // ========== INITIALIZATION ==========
  setupRealTimeListeners();
  updateUIState();

  console.log("[ArticleInteractions] Initialized for article:", articleId);
})();
