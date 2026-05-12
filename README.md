# GovJobUpdates

GovJobUpdates is a static GitHub Pages website for Indian government job updates, admit cards, results, answer keys, quizzes, rank prediction and browser-based document tools.

Live website: https://govjobupdates.com

## Main features

- Latest government jobs
- Admit cards, results and answer keys
- Quiz practice system
- Rank Predictor powered by Google Apps Script / Google Sheets
- Firebase Realtime Database visitor counter
- Browser-based document tools
- Privacy, terms, contact and disclaimer pages

## Folder structure

```text
Assets/                  Images and icons
CSS/                     Shared and page-specific styles
HTML/                    Main public pages
JS/                      Shared scripts, quiz scripts, Firebase visitor scripts
Job_Details/HTML/        Job detail pages
GoogleAppsScript/        Apps Script backend code
```

## Firebase visitor system

Files:

```text
JS/firebase-config.js
JS/firebase-visitors.js
CSS/style.css
```

Firebase Realtime Database nodes:

```text
siteStats
dailyStats
presence
visitorIndex
```

The visitor counter shows live visitors, total visitors and total visits in the footer.

## How to add a new public page

1. Create the page inside `HTML/`.
2. Use `../CSS/style.css` and correct relative paths.
3. Add Firebase scripts before `</body>`:

```html
<script src="../JS/script.js"></script>
<script src="../JS/firebase-config.js"></script>
<script type="module" src="../JS/firebase-visitors.js"></script>
```

4. Add the page to `sitemap.xml`.
5. Link it from footer/header if needed.

## How to add a job

1. Add the job object in `JS/jobs-data.js`.
2. Make sure `detailPage` points to a real file.
3. Add official apply link and notification link when available.
4. Add a job detail page in `Job_Details/HTML/`.
5. Update `sitemap.xml` for important detail pages.

## SEO checklist

- `robots.txt` must point to `sitemap.xml`.
- `sitemap.xml` should include all public pages.
- Main pages should have title, description, canonical, Open Graph and Twitter card tags.
- Important pages should not be empty or duplicate.
- Broken internal links should be fixed before publishing.

## Trust and compliance checklist

- Privacy Policy must mention Firebase visitor analytics and Rank Predictor data.
- Terms of Use must mention unofficial information and official source verification.
- Disclaimer must clearly say the site is not a government website.
- Contact page must provide correction request instructions.

## Deployment

This repo is designed for GitHub Pages with custom domain:

```text
govjobupdates.com
```

Keep the `CNAME` file unchanged unless the domain changes.

## Contact

Email: dmagstudio2023@outlook.com
