# Typing landing and selection audit — 9 September 2026

Scope: `/typing-test/` and its 17 linked exam/language selection pages. The attempt and result workspace was inspected for navigation, indexing and account requirements; its scoring and authentication behavior remains unchanged.

## Findings and changes

- Both page controllers loaded their implementation from historical `raw.githubusercontent.com` commits. Replaced the wrappers with the corresponding local implementation and explicit deferred enhancement scripts. Selection no longer needs a raw GitHub response.
- The exam controller replaced all static main content on initialization. It now binds to the existing page, preserving descriptions, rules, FAQs and related links. The fallback renderer remains available for legacy markup.
- A dynamically appended `typing-ui-polish.css` overrode the mobile wrapping, quick-start sizing, reduced-motion and card-footer rules from `typing-landing.css`, including several `!important` declarations. Removed that loader path. Landing and selection layouts now use a predictable base → landing stylesheet order. The legacy polish file is unused by these pages; unrelated workspace and leaderboard styles remain separate.
- The landing claimed no login was needed despite the attempt's authentication gate. Landing benefits, selection guidance and FAQs now disclose the free account requirement before students choose a passage.
- Added an exam-directory jump link, visible initial option count, initial filter pressed states, keyboard skip links, wrapped mobile filters, larger controls and clearer supporting text. Directory card headings now sit below the directory heading.
- Preserved self-canonical URLs and the workspace's `noindex, follow`. Reconciled FAQ JSON-LD with visible answers, added preparation guidance and contextual links between practice pages.

## Verification

- 24 automated checks across typing selection, directory search/reset, content preservation, long passages, scoring and session behavior pass.
- All 18 pages: one H1 and canonical each, unique element IDs, parseable JSON-LD, and 1,431 existing local main-content links/assets checked.
- JavaScript syntax checks and `git diff --check` pass.
- Responsive rules reviewed at 760px and 480px breakpoints. Browser screenshot/computed-layout verification could not run: no browser binary was installed, and Playwright's Chromium download repeatedly timed out. Visual approval remains pending.
- Authenticated ranking API calls and production deployment were not tested. Search Console indexing and search performance cannot be confirmed by source checks.

Google guidance consulted: https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics
