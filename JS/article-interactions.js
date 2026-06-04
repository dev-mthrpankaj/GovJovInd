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
    replies: {}, // commentId -> array of replies
    listeners: [],
    replyListeners: {} // commentId -> { ref, callback }
  };

  // ========== AVATAR HELPERS ==========
  const AVATAR_GRADIENTS = [
    ["#6366f1", "#8b5cf6"],
    ["#0ea5e9", "#2563eb"],
    ["#10b981", "#059669"],
    ["#f59e0b", "#ef4444"],
    ["#ec4899", "#db2777"],
    ["#14b8a6", "#0891b2"],
    ["#f43f5e", "#e11d48"],
    ["#8b5cf6", "#6d28d9"]
  ];

  function avatarLetter(name) {
    const trimmed = (name || "").trim();
    return trimmed ? trimmed.charAt(0).toUpperCase() : "?";
  }

  function avatarGradient(name) {
    const trimmed = (name || "?").trim() || "?";
    let sum = 0;
    for (let i = 0; i < trimmed.length; i++) {
      sum += trimmed.charCodeAt(i);
    }
    const [from, to] = AVATAR_GRADIENTS[sum % AVATAR_GRADIENTS.length];
    return `linear-gradient(135deg, ${from} 0%, ${to} 100%)`;
  }

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
    renderComments();
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
    const likesListener = onValue(
      likesRef,
      (snapshot) => {
        state.likes = snapshot.exists() ? Object.keys(snapshot.val()).length : 0;
        if (likeCount) likeCount.textContent = state.likes;
      },
      (error) => console.error("[ArticleInteractions] Likes listener error:", error)
    );
    state.listeners.push({ ref: likesRef, callback: likesListener });

    // Listen to dislikes
    const dislikesRef = ref(db, `article_engagement/${articleId}/dislikes`);
    const dislikesListener = onValue(
      dislikesRef,
      (snapshot) => {
        state.dislikes = snapshot.exists() ? Object.keys(snapshot.val()).length : 0;
        if (dislikeCount) dislikeCount.textContent = state.dislikes;
      },
      (error) => console.error("[ArticleInteractions] Dislikes listener error:", error)
    );
    state.listeners.push({ ref: dislikesRef, callback: dislikesListener });

    // Listen to comments
    const commentsRef = ref(db, `article_engagement/${articleId}/comments`);
    const commentsListener = onValue(
      commentsRef,
      (snapshot) => {
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
      },
      (error) => console.error("[ArticleInteractions] Comments listener error:", error)
    );
    state.listeners.push({ ref: commentsRef, callback: commentsListener });
  }

  // ========== REPLY LISTENERS ==========
  // Replies live under a separate root node: article_replies/${commentId}
  function syncReplyListeners() {
    const currentIds = new Set(state.comments.map((c) => c.id));

    // Detach listeners for comments that no longer exist
    Object.keys(state.replyListeners).forEach((commentId) => {
      if (!currentIds.has(commentId)) {
        off(state.replyListeners[commentId].ref);
        delete state.replyListeners[commentId];
        delete state.replies[commentId];
      }
    });

    // Attach listeners for newly rendered comments
    state.comments.forEach((comment) => {
      if (state.replyListeners[comment.id]) return;

      const repliesRef = ref(db, `article_replies/${comment.id}`);
      const callback = onValue(
        repliesRef,
        (snapshot) => {
          const replies = [];
          if (snapshot.exists()) {
            const data = snapshot.val();
            Object.entries(data).forEach(([replyId, reply]) => {
              replies.push({ id: replyId, ...reply });
            });
            replies.sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0));
          }
          state.replies[comment.id] = replies;
          renderReplies(comment.id);
        },
        (error) => console.error("[ArticleInteractions] Replies listener error:", error)
      );
      state.replyListeners[comment.id] = { ref: repliesRef, callback };
    });
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
      // Clean up the comment's replies stored under the separate root node
      await remove(ref(db, `article_replies/${commentId}`));
    } catch (error) {
      console.error("[ArticleInteractions] Error deleting comment:", error);
      showError("Failed to delete comment. Please try again.");
    }
  }

  // ========== REPLY MANAGEMENT ==========
  async function submitReply(commentId, text, submitBtn) {
    if (!state.currentUser) {
      window.location.href = `${getLoginPath()}/login.html`;
      return;
    }

    const trimmed = (text || "").trim();
    if (!trimmed) {
      showError("Please enter a reply.");
      return;
    }

    if (trimmed.length > 1000) {
      showError("Reply cannot exceed 1000 characters.");
      return;
    }

    if (submitBtn) submitBtn.disabled = true;

    try {
      const repliesRef = ref(db, `article_replies/${commentId}`);
      const newReply = {
        userId: state.currentUser.uid,
        userName: state.currentUser.displayName || "Anonymous User",
        replyText: trimmed,
        timestamp: new Date().getTime()
      };

      await push(repliesRef, newReply);
      closeReplyForm(commentId);
    } catch (error) {
      console.error("[ArticleInteractions] Error submitting reply:", error);
      showError("Failed to post reply. Please try again.");
    } finally {
      if (submitBtn) submitBtn.disabled = false;
    }
  }

  async function deleteReply(commentId, replyId) {
    if (!state.currentUser) return;

    const reply = (state.replies[commentId] || []).find((r) => r.id === replyId);
    if (!reply || reply.userId !== state.currentUser.uid) {
      showError("You can only delete your own replies.");
      return;
    }

    if (!confirm("Are you sure you want to delete this reply?")) return;

    try {
      await remove(ref(db, `article_replies/${commentId}/${replyId}`));
    } catch (error) {
      console.error("[ArticleInteractions] Error deleting reply:", error);
      showError("Failed to delete reply. Please try again.");
    }
  }

  function closeReplyForm(commentId) {
    const form = commentsContainer.querySelector(
      `.reply-form[data-comment-id="${commentId}"]`
    );
    if (!form) return;
    form.style.display = "none";
    const textarea = form.querySelector(".reply-textarea");
    if (textarea) textarea.value = "";
  }

  function renderComments() {
    const title = document.querySelector(".comments-title");
    if (title) {
      const countEl = title.querySelector(".comments-count");
      if (countEl) {
        countEl.textContent = state.comments.length;
      }
    }

    // Keep reply listeners in sync with the currently rendered comments
    syncReplyListeners();

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

      const replyToggle = state.currentUser
        ? `<button class="comment-reply-btn" data-comment-id="${comment.id}">
             <i class="fas fa-reply"></i> Reply
           </button>`
        : "";

      const replyForm = state.currentUser
        ? `<div class="reply-form" data-comment-id="${comment.id}" style="display: none;">
             <textarea class="reply-textarea" data-comment-id="${comment.id}"
               placeholder="Write a reply..." maxlength="1000" aria-label="Write a reply"></textarea>
             <div class="reply-form-actions">
               <button class="reply-btn reply-btn-cancel" data-comment-id="${comment.id}" type="button">Cancel</button>
               <button class="reply-btn reply-btn-submit" data-comment-id="${comment.id}" type="button">
                 <i class="fas fa-paper-plane"></i> Reply
               </button>
             </div>
           </div>`
        : "";

      return `
        <div class="comment-item" data-comment-id="${comment.id}">
          <div class="comment-avatar" style="background: ${avatarGradient(comment.userName)};" aria-hidden="true">${escapeHtml(avatarLetter(comment.userName))}</div>
          <div class="comment-body">
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
            <div class="comment-footer">
              ${replyToggle}
            </div>
            ${replyForm}
            <div class="comment-replies" data-comment-id="${comment.id}"></div>
          </div>
        </div>
      `;
    }).join("");

    // Bind delete buttons
    commentsContainer.querySelectorAll(".comment-delete-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        deleteComment(btn.dataset.commentId);
      });
    });

    // Bind reply toggle buttons
    commentsContainer.querySelectorAll(".comment-reply-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const commentId = btn.dataset.commentId;
        const form = commentsContainer.querySelector(
          `.reply-form[data-comment-id="${commentId}"]`
        );
        if (!form) return;
        const isHidden = form.style.display === "none" || form.style.display === "";
        form.style.display = isHidden ? "block" : "none";
        if (isHidden) {
          const textarea = form.querySelector(".reply-textarea");
          if (textarea) textarea.focus();
        }
      });
    });

    // Bind reply cancel buttons
    commentsContainer.querySelectorAll(".reply-btn-cancel").forEach((btn) => {
      btn.addEventListener("click", () => closeReplyForm(btn.dataset.commentId));
    });

    // Bind reply submit buttons
    commentsContainer.querySelectorAll(".reply-btn-submit").forEach((btn) => {
      btn.addEventListener("click", () => {
        const commentId = btn.dataset.commentId;
        const form = commentsContainer.querySelector(
          `.reply-form[data-comment-id="${commentId}"]`
        );
        const textarea = form ? form.querySelector(".reply-textarea") : null;
        submitReply(commentId, textarea ? textarea.value : "", btn);
      });
    });

    // Populate replies for every rendered comment from current state
    state.comments.forEach((comment) => renderReplies(comment.id));
  }

  function renderReplies(commentId) {
    const container = commentsContainer.querySelector(
      `.comment-replies[data-comment-id="${commentId}"]`
    );
    if (!container) return;

    const replies = state.replies[commentId] || [];
    if (replies.length === 0) {
      container.innerHTML = "";
      return;
    }

    container.innerHTML = replies.map((reply) => {
      const isOwner = state.currentUser && reply.userId === state.currentUser.uid;
      const deleteBtn = isOwner
        ? `<button class="reply-delete-btn" data-reply-id="${reply.id}">Delete</button>`
        : "";

      return `
        <div class="reply-item" data-reply-id="${reply.id}">
          <div class="reply-avatar" style="background: ${avatarGradient(reply.userName)};" aria-hidden="true">${escapeHtml(avatarLetter(reply.userName))}</div>
          <div class="reply-body">
            <div class="reply-header">
              <span class="reply-user-name">${escapeHtml(reply.userName)}</span>
              <span class="reply-timestamp">${formatTimeAgo(reply.timestamp)}</span>
              ${deleteBtn}
            </div>
            <div class="reply-text">${escapeHtml(reply.replyText)}</div>
          </div>
        </div>
      `;
    }).join("");

    // Bind reply delete buttons
    container.querySelectorAll(".reply-delete-btn").forEach((btn) => {
      btn.addEventListener("click", () => deleteReply(commentId, btn.dataset.replyId));
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
