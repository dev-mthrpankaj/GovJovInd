# Security Action Plan

These items were intentionally left as manual actions because applying them directly in the static website repo could break live features or requires account-level changes outside GitHub.

## Immediate Manual Actions

1. Rotate Apps Script deployment URLs, then update the public frontend config files with the new `/exec` URLs.
2. Disable old Apps Script deployments that are no longer needed.
3. Secure Google Sheet sharing so only the Apps Script owner/service account and required maintainers can access it.
4. Move `GoogleAppsScript/` source to a private repo or local ignored folder and remove the tracked backend files from the public repo.
5. Purge exposed Spreadsheet IDs/admin tokens from Git history before making the repository public.
6. Set Firebase Realtime Database rules from `SECURITY-FIREBASE-RULES.md`.
7. Set Firestore rules for quiz history under `users/{uid}/quizAttempts`.
8. Migrate legacy candidate passwords away from Google Sheets to Firebase Authentication.
9. Redeploy the website after replacing exposed endpoint URLs.

## Left Unchanged To Avoid Breaking The Live Site

- Existing Apps Script `/exec` URLs remain in frontend config because removing them would break Rank Predictor, contact, visitor fallback, content updates, or UP certificate submission.
- The Rank Predictor UI, Dashboard UI, header, footer, navigation, page structure, CSS, and existing links were not changed.
- The legacy candidate auth flow was not rewritten. A rewrite should be done as a planned Firebase Auth migration.
- Firebase visitor analytics code was not changed. Applying stricter rules may require moving visitor counter writes to a trusted backend.
- Backend Apps Script files were not deleted in this working copy. `.gitignore` now blocks future untracked backend files, but already tracked files must be removed from Git separately.

## Exact Backend Locations Needing Private Review

- `GoogleAppsScript/rank-predictor-Code.gs`
- `GoogleAppsScript/rank-predictor-exams-seed.gs`
- `GoogleAppsScript/content-updates-Code.gs`
- `GoogleAppsScript/content-seed-data.gs`
- `GoogleAppsScript/firebase-dashboard-bridge-patch.gs`
