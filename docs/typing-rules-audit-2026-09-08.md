# Typing rules audit and implementation — 8 September 2026

Scope: all 17 existing typing presets. Branch: `fix/typing-exam-rules-audit`. Base: `0a890adf741a75dc1e78049806dab62ac49f566d`. The pre-implementation audit, proposed files, plan and uncertainties were presented before implementation. No passage text, passage indices, routing identifiers, sitemap, student-hub, job or quiz files were changed.

This is an exam-oriented **practice** implementation, not a complete official scoring simulator. Verified arithmetic is separated from text comparison. The browser does not invent official full/half mistakes, physical Hindi keystrokes, category cutoffs or rounding rules.

## Every preset: configuration and evidence

The targets below are the implemented session defaults. A numeric target does not by itself establish an official qualification requirement. E = English; H = Hindi. Language-specific targets and verified requirements appear in the following table. Null accuracy means no arbitrary character-accuracy pass condition.

| Preset | Languages | Minutes | WPM benchmark | Character accuracy goal | Evaluator | Verification date |
|---|---|---:|---|---|---|---|
| General English Typing Test (`general-english`) | english | 10 | 35 | 95% practice | general — practice only | Not fully verified / practice |
| General Hindi Typing Test (`general-hindi`) | hindi | 10 | 30 | 95% practice | general — practice only | Not fully verified / practice |
| SSC CHSL Typing Practice (`ssc-chsl`) | english, hindi | 10 | english: 35; hindi: 30 | None | ssc-chsl | 2026-09-08 |
| SSC CGL DEST Practice (`ssc-cgl-dest`) | english | 15 | Volume only | None | ssc-dest | 2026-09-08 |
| Delhi Police Head Constable Ministerial Typing Test (`delhi-police-hc-ministerial`) | english, hindi | 10 | english: 30; hindi: 25 | None | delhi-hcm | 2026-09-08 |
| SSC Stenographer Transcription Practice (`ssc-stenographer`) | english, hindi | 40 | 40 | 95% practice | general — practice only | 2026-09-08 |
| SSC Selection Post Skill Practice (`ssc-selection-post`) | english, hindi | 10 | english: 35; hindi: 30 | 95% practice | general — practice only | 2026-09-08 |
| RRB NTPC CBTST Practice (`rrb-ntpc`) | english, hindi | 10 | english: 30; hindi: 25 | None | rrb | 2026-09-08 |
| Railway Junior Clerk cum Typist Practice (`railway-junior-clerk`) | english, hindi | 10 | english: 30; hindi: 25 | None | rrb | 2026-09-08 |
| Railway Accounts Clerk cum Typist Practice (`railway-accounts-clerk`) | english, hindi | 10 | english: 30; hindi: 25 | None | rrb | 2026-09-08 |
| UPSSSC Junior Assistant Typing Practice (`upsssc-junior-assistant`) | hindi, english | 5 | hindi: 25; english: 30 | 85% practice | general — practice only | Not fully verified / practice |
| UP Police Computer Operator Typing Practice (`up-police-computer-operator`) | hindi, english | 15 | hindi: 25; english: 30 | 85% word accuracy; not character pass | up-police | 2026-09-08 |
| UP Government Clerical Typing Practice (`up-clerical`) | hindi, english | 5 | hindi: 25; english: 30 | 85% practice | general — practice only | Not fully verified / practice |
| Banking Typing & Language Practice (`banking-language-practice`) | english, hindi | 10 | english: 30; hindi: 25 | 95% practice | general — practice only | Not fully verified / practice |
| IBPS Clerk/CSA Typing & Language Practice (`ibps-clerk-csa-practice`) | english, hindi | 10 | english: 30; hindi: 25 | 95% practice | general — practice only | Not fully verified / practice |
| SBI Clerk Typing & Language Practice (`sbi-clerk-practice`) | english, hindi | 10 | english: 30; hindi: 25 | 95% practice | general — practice only | 2026-09-08 |
| RBI Assistant Language Practice (`rbi-assistant-language-practice`) | english, hindi | 10 | english: 30; hindi: 25 | 95% practice | general — practice only | Not fully verified / practice |

| Preset | Verified rule, minimum content, behavior and required correction | Official source / retrieval status |
|---|---|---|
| general-english | GovJobUpdates practice benchmarks only. This is not an official exam or a language proficiency assessment. Keyboard layout is not enforced by this browser. | No exam-specific claim.  |
| general-hindi | GovJobUpdates practice benchmarks only. This is not an official exam or a language proficiency assessment. Hindi mode uses Mangal Unicode display. For serious exam practice, select the official Hindi keyboard layout in your system/IME; use phonetic only for casual practice. Always verify the latest official font and keyboard-layout instructions. | No exam-specific claim.  |
| ssc-chsl | CHSL 2025 LDC/JSA: English 35 WPM or Hindi 30 WPM, 10 minutes (15 for eligible compensatory-time candidates). The 2025 result notice permits 7% mistakes for UR and 10% for listed reserved categories. These are SSC mistake percentages, not this site's character accuracy. Speed feedback here is a practice benchmark; official qualification is not assessed. This preset does not cover DEO skill tests. Keyboard layout is not enforced by this browser. | [Source 1](https://ssc.gov.in/api/attachment/uploads/masterData/NoticeBoards/Notice_of_adv_chsl_2025.pdf); [Source 2](https://ssc.gov.in/api/attachment/uploads/masterData/NoticeBoards/FRTA_CHSLE_2025_17082026.pdf)  |
| ssc-cgl-dest | CGL 2026 DEST: about 2,000 key depressions in 15 minutes (20 for eligible compensatory-time candidates). Output characters, spaces and punctuation are counted here as a practice proxy, not physical key presses. Long passages stay available for practice. Volume progress is not an SSC pass result; official error evaluation and post/category standards still apply. Keyboard layout is not enforced by this browser. | [Source 1](https://ssc.gov.in/api/attachment/uploads/masterData/NoticeBoards/Notice_of_adv_cgl_2026.pdf)  |
| delhi-police-hc-ministerial | Delhi Police HCM 2025: 10 minutes, English 30 WPM or Hindi 25 WPM, up to 25 marks. Tentative speed = (strokes / 5) / 10; the official example subtracts the mistake count from tentative WPM. Supplied matter is about 400 English / 350 Hindi words. Our long passages are practice material. Automatic official mistake classification and Hindi stroke mapping are not verified; the optional self-review calculator uses your reviewed counts. Fractional gaps in published marks slabs are left unresolved. Keyboard layout is not enforced by this browser. | [Source 1](https://ssc.gov.in/api/attachment/uploads/masterData/NoticeBoards/Notice_of_DPHCM_2025.pdf)  |
| ssc-stenographer | Transcription practice only: this tool has no dictation. SSC Steno 2026 has 10-minute dictation at 100 WPM (C) / 80 WPM (D). Standard transcription times: C English 40 / Hindi 55 minutes; D English 50 / Hindi 65 minutes, with separate compensatory times. This preset's 40-minute session, 40 WPM and 95% goals are personal practice benchmarks, not qualification standards. Keyboard layout is not enforced by this browser. | [Source 1](https://ssc.gov.in/api/attachment/uploads/masterData/NoticeBoards/Notice_of_adv_steno_2026.pdf)  |
| ssc-selection-post | Selection Post Phase XIV/2026: typing/data-entry skills apply only where prescribed for the selected post. This is clerical typing practice; its time, speed and accuracy goals are GovJobUpdates benchmarks, not a universal SSC requirement. Keyboard layout is not enforced by this browser. | [Source 1](https://ssc.gov.in/api/attachment/uploads/masterData/NoticeBoards/Notice_of_RHQ_2026_phase_xiv.pdf)  |
| rrb-ntpc | Based on the retrieved CEN 06/2024 NTPC Undergraduate CBTST notice (6 February 2026): 10 evaluated minutes, English 30 / Hindi 25 WPM, minimum 300 / 250 words. Full mistakes + half mistakes / 2, less a 5% word allowance; each remaining mistake costs 10 words. Editing is disabled; completed passages may be repeated. Full/half mistake classification is not detailed in that notice, so official speed is not automatically assessed. Use reviewed counts in the optional result calculator. No warm-up/break is simulated. For other CENs, verify your own notice. Unicode Hindi practice only. The retrieved CBTST notice does not establish the font/layout; confirm these in your own RRB instructions and select that layout in your system/IME. This website cannot enforce it. Legacy KrutiDev conversion is available under General Hindi, not certified for this preset. | [Source 1](https://rrbsecunderabad.gov.in/wp-content/uploads/2026/02/Special-Instructions-to-CBTST-CEN-06-2024-6.2.2026.pdf)  |
| railway-junior-clerk | Based on the retrieved CEN 06/2024 NTPC Undergraduate CBTST notice (6 February 2026): 10 evaluated minutes, English 30 / Hindi 25 WPM, minimum 300 / 250 words. Full mistakes + half mistakes / 2, less a 5% word allowance; each remaining mistake costs 10 words. Editing is disabled; completed passages may be repeated. Full/half mistake classification is not detailed in that notice, so official speed is not automatically assessed. Use reviewed counts in the optional result calculator. No warm-up/break is simulated. For other CENs, verify your own notice. Unicode Hindi practice only. The retrieved CBTST notice does not establish the font/layout; confirm these in your own RRB instructions and select that layout in your system/IME. This website cannot enforce it. Legacy KrutiDev conversion is available under General Hindi, not certified for this preset. | [Source 1](https://rrbsecunderabad.gov.in/wp-content/uploads/2026/02/Special-Instructions-to-CBTST-CEN-06-2024-6.2.2026.pdf)  |
| railway-accounts-clerk | Based on the retrieved CEN 06/2024 NTPC Undergraduate CBTST notice (6 February 2026): 10 evaluated minutes, English 30 / Hindi 25 WPM, minimum 300 / 250 words. Full mistakes + half mistakes / 2, less a 5% word allowance; each remaining mistake costs 10 words. Editing is disabled; completed passages may be repeated. Full/half mistake classification is not detailed in that notice, so official speed is not automatically assessed. Use reviewed counts in the optional result calculator. No warm-up/break is simulated. For other CENs, verify your own notice. Unicode Hindi practice only. The retrieved CBTST notice does not establish the font/layout; confirm these in your own RRB instructions and select that layout in your system/IME. This website cannot enforce it. Legacy KrutiDev conversion is available under General Hindi, not certified for this preset. | [Source 1](https://rrbsecunderabad.gov.in/wp-content/uploads/2026/02/Special-Instructions-to-CBTST-CEN-06-2024-6.2.2026.pdf)  |
| upsssc-junior-assistant | Practice only: the applicable UPSSSC recruitment's duration, accuracy, font and evaluation instructions have not been verified. The 5-minute session, Hindi 25 / English 30 WPM and 85% goals are GovJobUpdates practice benchmarks. Check your exact advertisement and typing admit-card instructions. Keyboard layout is not enforced by this browser. | [Source 1](https://upsssc.gov.in/Default.aspx) Exact applicable instructions could not be retrieved on 2026-09-08. |
| up-police-computer-operator | The 2025 Computer Operator notice requires both Hindi 25 WPM and English 30 WPM with 85% accuracy and Unicode Inscript Hindi. The 15 December 2025 instructions for the 2023 recruitment specify 15 minutes per language with a 5-minute gap, English first. This page runs one language at a time; complete both separately. Browser character feedback is only a practice estimate; the optional self-review calculator accepts reviewed word counts. Confirm session details for your recruitment cycle. Hindi requires Unicode Inscript in the retrieved UP Police instructions. Select Inscript in your system keyboard/IME. Mangal is the display mode; this website cannot set or verify your system layout. KrutiDev remains available in General Hindi practice. | [Source 1](https://uppbpb.gov.in/FilesUploaded/Notice/img20251216_1838501903e63203-c8d6-4aa8-8679-ee2066f88561.pdf); [Source 2](https://uppbpb.gov.in/FilesUploaded/Notice/202512151748559905acba682-54fe-468a-8b97-b950808eb6b6.pdf)  |
| up-clerical | General UP clerical practice, not a particular recruitment's skill test. All time, WPM and accuracy goals here are GovJobUpdates practice benchmarks. Check the selected post's official instructions. Keyboard layout is not enforced by this browser. | No exam-specific claim.  |
| banking-language-practice | GovJobUpdates practice benchmarks only. This is not an official exam or a language proficiency assessment. Keyboard layout is not enforced by this browser. | No exam-specific claim.  |
| ibps-clerk-csa-practice | Typing & language practice only. The indexed IBPS CSA-XVI notice identifies a Local Language Proficiency Test. Full document retrieval was unavailable during this audit; no official typing-speed qualification is claimed. These goals do not assess language proficiency. Keyboard layout is not enforced by this browser. | [Source 1](https://www.ibps.in/wp-content/uploads/Notification_CRP_CSA_XVI-Final.pdf) Official search index checked 2026-09-08; full PDF retrieval failed. |
| sbi-clerk-practice | Typing & language practice only. SBI Junior Associate 2026-27/17 selection includes a test of the specified opted local language where applicable, not a universal typing-speed test. All targets here are personal benchmarks and do not assess local-language proficiency. Keyboard layout is not enforced by this browser. | [Source 1](https://sbi.bank.in/webfiles/uploads/files_2627/08/JA_2026_Detailed_Advt_Eng.pdf)  |
| rbi-assistant-language-practice | Typing & language practice only. RBI's indexed Assistant notice identifies a Language Proficiency Test after preliminary and main exams. The direct notice could not be fully retrieved during this audit. These typing goals are practice benchmarks, not RBI qualification or LPT assessment. Keyboard layout is not enforced by this browser. | [Source 1](https://opportunities.rbi.org.in/scripts/bs_viewcontent.aspx?Id=4912) Official search index checked 2026-09-08; direct page presented a challenge. |

## Problems found before implementation

1. Every preset used the same positional character mismatch evaluator and generic 95%-style accuracy target. This cannot reproduce RRB's full/half mistakes and allowance, Delhi's notified arithmetic, SSC mistake percentages, or UP Police word accuracy.
2. DEST was presented with an ordinary WPM threshold rather than its approximately 2,000-key output volume.
3. Pause stopped exam time. Shortcut keydowns could start time before committed text existed. IME and deadline boundaries needed explicit regression coverage.
4. Finishing a passage always ended the attempt; RRB requires repeat capability within the evaluated session and disables editing.
5. The exam disclaimer was visually hidden. Presets lacked structured rule versions, source links, retrieval status and verification dates.
6. Stenography was liable to be confused with a typing qualification, while this tool has no dictation. Selection Post and generic UP clerical standards depend on a specific post. Banking language proficiency is not assessed by typing speed.
7. A general Hindi font selector could be mistaken for an official keyboard guarantee. The browser cannot set or verify the operating-system input layout.
8. Generic results could imply exam qualification. Automatic official assessment now remains null, with explicit practice, volume or review-needed status.

## Formulas and interpretation

### General feedback, retained for practice and history compatibility

Text is NFC-normalized and compared positionally by grapheme units. Gross WPM = typed units / 5 / elapsed minutes. Practice net WPM = max(0, (typed units − mismatched units) / 5 / elapsed minutes). Character accuracy = matching units / typed units × 100 (zero for empty input). Words are whitespace-delimited and compared positionally. Untyped trailing material is not charged as typed errors. Insertions/omissions can shift subsequent comparisons: this is deliberately labeled character feedback, not an official mistake classifier. Synthetic separators between repeated rounds do not earn typed or correct units. An excess committed unit at a round boundary is charged without shifting the next round.

The elapsed-time denominator has a one-second minimum when there is text and is capped at session duration. A monotonic clock runs continuously after the first committed nonempty input. No pause time is deducted. Post-deadline input and provisional IME text cannot enter the saved result. A completed passage or user Finish before expiry is an early finish; it cannot establish a full-duration exam benchmark.

### RRB CBTST — reviewed arithmetic

With reviewed words W, full mistakes F and half mistakes H:

- Total mistakes M = F + H / 2.
- Allowance A = 0.05 × W; ignored mistakes = min(M, A).
- Final mistakes E = max(0, M − A).
- Corrected speed = max(0, (W − 10 × E) / 10).
- Full 10-minute session, minimum 300 English / 250 Hindi words and speed 30 / 25 WPM are required for the self-reviewed practice benchmark.

The official example is 400 words and 10 final mistakes: (400 − 100) / 10 = 30 WPM. Fractional allowances are retained; no unspecified rounding is invented. The retrieved UG notice does not define a complete automatic full/half classifier. User-reviewed counts are required; live character errors never become official mistakes. This notice is CEN 06/2024, not a blanket verification of every NTPC cycle.

### Delhi Police HCM — reviewed arithmetic and marks

Tentative WPM = (reviewed strokes / 5) / 10. Final speed = max(0, tentative WPM − reviewed mistakes), following the notification's worked example: 2,000 strokes and 10 mistakes give 40 − 10 = 30 WPM. This unusual subtraction is not replaced by RRB's formula.

| English WPM | Hindi WPM | Marks / 25 |
|---|---|---:|
| Below 30 | Below 25 | 0 |
| Exactly 30 | Exactly 25 | 10 |
| 31–35 | 26–30 | 12 |
| 36–40 | 31–35 | 15 |
| 41–45 | 36–40 | 18 |
| 46–50 | 41–45 | 21 |
| Above 50 | Above 45 | 25 |

Unspecified fractional gaps, such as English 30.5, return no marks assessment. Early-finish UI suppresses marks assessment. Published mistake examples include punctuation, case, word gaps, excessive gaps and paragraphs; complete automatic classification and Hindi physical stroke mapping remain unverified. Review uses entered counts, not inferred physical keys.

### SSC CHSL and CGL DEST

CHSL's speed convention is key depressions / 5 / minutes, with English 35 / Hindi 30 WPM. The shared character-based net speed remains explicitly a practice benchmark. The CHSL 2025 result's 7% UR / 10% listed reserved-category mistake thresholds are not converted into character accuracy or an automatic pass. The source cycle and LDC/JSA scope are visible.

CGL DEST output volume is NFC Unicode code points (including spaces and punctuation; normalized newlines) divided by 2,000 for progress, capped at 100%. This is a final-output proxy, not a physical keyboard event counter. Reaching volume after the full session reports only practice volume reached; official qualification is null. Error evaluation and post/category-specific requirements are not fabricated.

### UP Police Computer Operator

Reviewed total words / 15 gives a **practice word-speed estimate**. Reviewed correct words / reviewed total words × 100 gives word accuracy (zero if empty). The self-review compares English 30 / Hindi 25 WPM and 85% only after the full duration. The exact official net-speed penalty convention was not established, so this calculator is not an official scoring reproduction. Both language tests are required by the retrieved notice; this app runs each separately. The 15-minute order/gap source concerns the 2023 recruitment and must not be silently generalized to the 2025 cycle.

## Interaction and architecture

- `typing-config.js` owns rule metadata and preset behavior; the pure `typing-evaluators.js` module owns reviewed arithmetic and assessment labels. The existing engine still owns input, timing, grapheme rendering and transitions.
- Pause UI, handlers, state and paused-time arithmetic are removed. Ready → running begins on committed input. Start only focuses input. Finish and expiry save once. Restart during a running attempt asks before discarding it. Exit retains confirmation. Paste/drop remain disabled.
- RRB disallows deletion, replacement and selection edits, with a committed-text fallback for noncancelable input. Completing a passage starts another rendering of the same passage without restarting time. Long passage source data and indices remain untouched.
- General Hindi retains Mangal and KrutiDev conversion. RRB uses Unicode practice with a font/layout caveat; UP Police uses Unicode with system Inscript guidance. Neither claims to enforce an OS layout. Real operating-system IMEs still need device-level validation.
- Existing passage/input geometry, follow-cursor, font controls and fullscreen remain. Source notes use compact disclosure; optional review fields appear only after applicable results.
- History adds rule metadata and optional self-review without migrating existing entries or changing generic personal-best metrics. Updating a review changes the existing attempt, not the attempt count. This app does not retain the full transcript in history; review is intended in the current result session.

## Validation

- `node --test tests/typing-evaluators.test.js tests/typing-session.test.js tests/typing-selection.test.js tests/typing-long-passages.test.js`: 22 passing tests. Includes exact official arithmetic examples, both-language thresholds, fractional/zero/invalid boundaries, no false automatic qualification, continuous clock, deadline/once-only submission, provisional IME, cleared input, repeat behavior, generic Unicode/punctuation/spacing regression, renderer stability, preserved long passages and 1,037 static routes.
- `tests/typing-workspace.browser.cjs` with Playwright Chromium: all 17 presets / 31 language routes; eight viewports (1920×1080, 1366×768, 1280×600, 1024×768, 768×1024, 390×844, 360×740, 390×460). Checks panel readability/overlap, no horizontal overflow, visible Finish, visible cursor, continuous timer, early Finish, Retry, large font controls, Hindi, keyboard shortcuts, RRB editing, persisted review, and UP Police mode restriction. Fullscreen is also exercised.
- Browser page-error collection must remain empty. Tests use local static assets; external analytics are blocked.
- `git diff --check`; full changed-file review; no edits to passage-data, passages.js, sitemap, student-hub, job pages, quiz or unrelated components.

## Unresolved limitations and honest scope

No automatic official full/half mistake classifier is claimed for RRB, Delhi or SSC. SSC category/post error qualification, Hindi physical strokes, Delhi fractional-slab rounding and UP Police exact speed penalties need additional authoritative specifications. UPSSSC's applicable detailed notice was unavailable; it remains practice-only. IBPS and RBI were indexed-source checks, with no falsely stamped full verification. The browser does not simulate stenography dictation, paired UP Police language sessions, RRB warm-up/break or eligible compensatory-time accommodation flows. Default sessions are standard-duration practice. Operating-system keyboard enforcement, real IME devices and mobile browser engines beyond Chromium are not verified by these automated tests.

Final upstream check: `origin/main` advanced to `314408d` during the task. Its intervening changes concern authentication, quiz selection and listing data; none overlaps the changed typing files or tests. They were not merged into or modified by this commit.

No push, merge or deployment is included in this task.

## Exact changed files and purpose

| File | Change |
|---|---|
| `typing-test/typing-config.js` | Verified rule metadata, source status, targets, evaluator types and keyboard/repeat/edit restrictions for all 17 presets. |
| `typing-test/typing-evaluators.js` | New pure arithmetic and explicit practice/review assessment module. |
| `typing-test/typing-test.js` | Continuous timer, committed input/deadline handling, RRB repeats/restrictions, source display, exam-aware results and optional review. |
| `typing-test/typing-storage.js` | Enrich a saved attempt with reviewed arithmetic without counting it twice. |
| `typing-test/app.html` | Remove Pause; add rules disclosure and result review fields; load/cache-version changed modules. |
| `typing-test/typing-workspace.css` | Compact result-review inputs and wrapping source links. |
| `typing-test/typing-exam-page.js` | Render preset-specific rule notes; clarify transcription label. |
| `tests/typing-evaluators.test.js` | New arithmetic and assessment boundaries. |
| `tests/typing-session.test.js` | Timing, committed input, deadline, repeat and generic regression coverage. |
| `tests/typing-workspace.browser.cjs` | Browser verification updated for uninterrupted timing, presets, review, keyboard modes and fullscreen. |
| `docs/typing-rules-audit-2026-09-08.md` | Complete preset audit, sources, formulas, changes, verification and limitations. |

Each following static page receives its corresponding visible rule note, config dependency and renderer cache version. Stenographer also receives the transcription title. Existing passage cards and URLs are preserved:

- `typing-test/banking-typing-language-practice.html`
- `typing-test/delhi-police-head-constable-ministerial-typing-test.html`
- `typing-test/english-typing-test.html`
- `typing-test/hindi-typing-test.html`
- `typing-test/ibps-clerk-csa-typing-language-practice.html`
- `typing-test/railway-accounts-clerk-typing-test.html`
- `typing-test/railway-junior-clerk-typing-test.html`
- `typing-test/rbi-assistant-language-practice.html`
- `typing-test/rrb-ntpc-typing-test.html`
- `typing-test/sbi-clerk-typing-language-practice.html`
- `typing-test/ssc-cgl-dest.html`
- `typing-test/ssc-chsl-typing-test.html`
- `typing-test/ssc-selection-post-typing-test.html`
- `typing-test/ssc-stenographer-practice.html`
- `typing-test/up-government-clerical-typing-test.html`
- `typing-test/up-police-computer-operator-typing-test.html`
- `typing-test/upsssc-junior-assistant-typing-test.html`
