---
name: testing-article-engagement
description: Test the article engagement feature (like/dislike counters, comment cards with letter-avatars, and reply threads) end-to-end. Use when verifying changes to JS/article-interactions.js, CSS/article-interactions.css, or the related Firebase rules.
---

# Testing Article Engagement (likes / comments / replies)

The engagement widget lives at the bottom of every student-hub article
(`HTML/student-hub/*.html`). Logic is in `JS/article-interactions.js`; styles in
`CSS/article-interactions.css`. Backend is Firebase Realtime Database.

## Data model
- `article_engagement/${articleId}/likes/${uid}` and `.../dislikes/${uid}` — one child per user; the counter listeners read the **whole** `likes` / `dislikes` collection.
- `article_engagement/${articleId}/comments/${commentId}`
- `article_replies/${commentId}/${replyId}` — replies live in a **separate root node**, not nested in the comment.

## Local setup
1. Serve the repo root statically: `python3 -m http.server 8000` (run from the repo root).
2. Open an article, e.g. `http://localhost:8000/HTML/student-hub/up-police-constable-last-10-days-exam-strategy.html`.
3. The static site talks to the **production** Firebase DB, so writes are real — always clean up test data via the in-UI Delete buttons when done.

## Auth
- Voting, commenting, and replying require login. Logged-out visitors can only **read** counts/comments (buttons are disabled, with a "Login to join the discussion" prompt).
- Use the dedicated test account (see Devin Secrets Needed). Log in via `HTML/login.html` (email/password tab). Logout is on `HTML/dashboard.html`.

## Golden-path test flow
1. **Like** — click Like: count increments by 1 and button gets the Royal Blue active gradient (white text). Dislike mirrors this with a crimson gradient.
2. **Comment** — type + Post Comment: a card appears with a circular colored letter-avatar (first char of userName), name, timestamp, and text in a flex row. Discussion count increments.
3. **Reply** — click Reply under a comment: a textarea toggles open; submit renders the reply as an indented thread with a smaller avatar.
4. **Persistence** — reload the page: like state, comment, and reply should all remain (proves Firebase-backed, not just DOM).
5. **Delete** — owner-only Delete buttons (with a confirm dialog) remove the reply, then the comment; Discussion returns to 0.
6. **Logged-out check (Task 1 core)** — log out and reload: counts must still display. If they show blank/stuck, it is almost always a **Firebase rules** problem, not a code bug.

## Key gotcha — counters depend on Firebase read rules
The counter listeners read the entire `likes`/`dislikes` collection, so `.read` must be granted at the `likes` and `dislikes` node level (NOT only at the `$userId` child) — Realtime DB rules do not cascade upward. If counts don't display for anonymous visitors, check the published rules first.

- A transient `permission_denied` on the likes/dislikes listener can appear in the console during the brief auth-restoration window on a logged-in page load; the listener re-reads successfully once auth settles. A genuinely broken rule shows a **persistent** denial and blank counts on a fresh logged-out load — distinguish the two by checking the console on a clean logged-out load.
- Bulk reply-cleanup on comment deletion is best-effort: per-reply owner rules mean a comment owner cannot delete replies authored by other users, which logs a non-fatal `permission_denied` warning. This is expected.

## Recording
This is a GUI feature — record the browser flow and annotate each step (Like, Comment, Reply, Persist-after-reload, Delete, Logged-out counts).

## Devin Secrets Needed
- `GOVJOB_TEST_EMAIL` / `GOVJOB_TEST_PASSWORD` (or equivalently named) — the dedicated site test account used to exercise authenticated vote/comment/reply flows. If not present, ask the user to provision a test login.
