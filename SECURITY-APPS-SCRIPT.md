# Google Apps Script Security Notes

Apps Script web app URLs in public frontend files are not secret once shipped to a browser. If any URL has been public or shared, rotate the deployment URL and keep the old deployment disabled.

Current public endpoint references:

- `JS/rank-predictor-config.js`
- `JS/contact-widget.js`
- `JS/script.js`
- `JS/google-sheet-updates-config.js`
- `JS/up-certificate-services.js`

Backend source currently exists in `GoogleAppsScript/` and includes private operational details such as Spreadsheet IDs and an admin token. Move this source to a private repository or local ignored folder, then remove it from Git history before publishing a public repo.

## Required Backend Protections

- Store Spreadsheet IDs, admin tokens, and deployment settings in Apps Script `PropertiesService`, not in committed source.
- Rotate the Apps Script deployment URLs after removing backend source from public Git.
- Validate all inputs on the backend, even when the frontend already validates them.
- Add rate limiting with `CacheService` or `PropertiesService` plus `LockService` for rank submission, dashboard/history, content admin, and contact routes.
- Validate allowed origins or require a signed nonce for browser calls. Treat origin checks as helpful but not sufficient, because Apps Script requests can be made outside browsers.
- Verify Firebase ID tokens for dashboard/history APIs. Do not trust `firebaseUid`, email, or mobile values sent in a JSON body until the ID token signature, issuer, audience, expiry, and `sub` are verified.
- Do not store plain passwords in Google Sheets. Migrate candidate login to Firebase Authentication. If a temporary password column remains, store only salted, slow hashes and remove legacy plain-password fallback checks.
- Do not return debug fields, stack traces, spreadsheet metadata, row samples, or raw exception messages to users in production.

## Contact Form Protections

- Keep the frontend honeypot, but also validate a honeypot or CAPTCHA token on the Apps Script backend.
- Add per-contact and per-session rate limits before calling `MailApp.sendEmail`.
- Add mail quota protection so repeated submissions fail closed before daily quota is exhausted.
- Reject oversized fields and strip HTML server-side.
- Log only minimal metadata needed to diagnose abuse.
