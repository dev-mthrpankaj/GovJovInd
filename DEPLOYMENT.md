# Private-Source Deployment Guide

This site is a static frontend. HTML, CSS, JavaScript, images, and public API endpoints that load in the browser can be inspected by visitors. A private repository protects the source on GitHub, but it does not hide browser-delivered frontend code.

## Goal

Move GovJobUpdates from public-source GitHub Pages toward private-source deployment without changing the public user flow or breaking existing routes.

## Recommended Hosts

- Cloudflare Pages
- Vercel
- Netlify

All three can deploy static sites from a GitHub repository. Use the provider dashboard to connect the repository and domain; do not change DNS or GitHub Pages settings until a preview deployment is verified.

## Migration Steps

1. Connect the private GitHub repository to Cloudflare Pages, Vercel, or Netlify.
2. Set the production branch, usually `main`.
3. Configure the project as a static site with no build command unless a build workflow is intentionally added later.
4. Test the provider preview deployment and manually check the critical pages:
   - `/`
   - `/HTML/latest-jobs.html`
   - `/HTML/admitcard.html`
   - `/HTML/answer-key.html`
   - `/HTML/results.html`
   - `/HTML/quiz.html`
   - `/HTML/rank-predictor.html`
   - `/HTML/dashboard.html`
   - `/HTML/documents.html`
   - `/HTML/about-us.html`
   - `/HTML/up-certificate-services.html`
5. Point the custom domain to the new provider after the preview works.
6. Confirm production loads from the new provider.
7. Only then make the old GitHub Pages deployment inactive if needed.
8. Make the GitHub repository private after confirming the new deployment is stable.

## Apps Script Properties

Backend Apps Script source should keep private IDs and admin tokens in Script Properties, not in source code.

For the Rank Predictor / contact / dashboard Apps Script project, set:

```text
RANK_PREDICTOR_SPREADSHEET_ID=<rank predictor Google Sheet ID>
```

For the content updates Apps Script project, set:

```text
CONTENT_SPREADSHEET_ID=<content Google Sheet ID>
CONTENT_ADMIN_TOKEN=<long random admin token>
```

After changing Apps Script source or properties, deploy a new web app version and keep the public `/exec` URLs in the frontend config files unchanged unless the deployment URL changes.

If the contact route uses `MailApp.sendEmail`, run a private authorization helper in the Apps Script editor or submit a controlled internal request so Google prompts the owner to allow mail sending, then deploy a new version.

## Public URLs Kept Intentionally

These frontend URLs are public by design because browser code must call them:

- Rank Predictor / contact / visitor endpoint in `JS/rank-predictor-config.js`, `JS/contact-widget.js`, and `JS/script.js`
- Content update endpoint in `JS/google-sheet-updates-config.js`
- UP Certificate Services endpoint in `JS/up-certificate-services.js`
- Firebase browser config in `JS/firebase-config.js`

Protect these services with server-side validation, Firebase rules, Apps Script validation, rate limits, and restricted sharing.

## Assets

Keep original graphics in `Assets/`. Brand original graphics where appropriate with GovJobUpdates naming or visible branding. Do not watermark the QR payment code because it must remain scannable and payment-safe.

## Build Output

The current repository serves source files directly. Do not minify or obfuscate in place unless a separate production output is introduced and source files remain maintainable.
