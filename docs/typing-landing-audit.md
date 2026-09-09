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

## Follow-up: guest practice correction

The intended product rule, clarified by the owner, is that ordinary practice needs no login. Login is required only for ranked attempts. The previous audit incorrectly treated the existing client-side input lock as the intended requirement. The follow-up removes that lock, corrects landing/selection copy and FAQ schema, and keeps ranked requests authenticated. Guest results remain local and a login after an attempt starts does not retroactively rank it. Four regression checks cover guest input, local results, late login and signed-in ranking (mocked API). Browser and live API verification remain pending.

## Advertising-readiness follow-up

Live desktop Chrome interaction now verified the landing's category/search/empty-state flow, English difficulty selection, Hindi RRB language/difficulty selection, show-more, guest typing, English/Hindi results, retry, return navigation and the public passage leaderboard. Pasting is intentionally blocked; typing with keyboard events starts the clock normally. The public leaderboard returned a valid empty result for the tested passage. No ranked attempt was submitted to production.

Concrete issues found and corrected:

- The full-width account banner displaced the typing workspace and pushed Finish below the initial desktop viewport. Place its sign-in and guest controls inside the ranking sidebar card instead.
- Students had no prominent ranked sign-in action at selection and no next-attempt ranking prompt on guest results. Add both with an explanation of full-duration eligibility; preserve the selected passage on the login return route.
- The cookie Privacy Policy link resolved under `/typing-test/HTML/` instead of `/HTML/`. Correct typing-directory root depth in the shared script.
- Broad substring matching incorrectly assigned the SSC logo to UPSSSC. Restrict SSC matching to a separate word.

Automated typing checks pass, including the guest-result prompt; all 19 typing HTML pages pass local-link, ID, H1 and JSON-LD checks. The separate site-search suite has a pre-existing missing RPSC APO admit-card destination in its bundled index (not modified in this change).

Limitations: this browser exposes no viewport-resize API, and local previews are blocked by browser URL policy. Mobile breakpoints have source review, not a real-device/browser visual sign-off. Signed-in production ranking and the end-to-end login return still require an authenticated session. These are remaining checks before calling the full advertising flow verified.
