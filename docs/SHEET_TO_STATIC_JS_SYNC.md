# Sheet to Static JS Sync

This setup keeps the public website fast while still allowing listing data to be managed from Google Sheet.

## What it does

The workflow reads the existing Apps Script JSON API and generates these static files:

- `JS/jobs-data.js`
- `JS/admitcard-data.js`
- `JS/answerkey-data.js`
- `JS/results-data.js`

The public listing pages can keep using these static JS files for instant loading.

## Workflow

File:

```text
.github/workflows/sync-listing-data.yml
```

It runs:

- every 10 minutes
- manually through GitHub Actions → Sync listing data from Google Sheet → Run workflow

## Sync script

File:

```text
scripts/sync-apps-script-to-js.js
```

It reads configuration from:

```text
scripts/sync-apps-script-config.json
```

The script can get the Apps Script API URL from one of these places:

1. `GJU_SHEET_API_URL` environment variable or GitHub secret
2. `apiUrl` in `scripts/sync-apps-script-config.json`
3. existing `apiUrl` inside `JS/google-sheet-updates-config.js`

The current setup reuses the existing public API URL from `JS/google-sheet-updates-config.js`, so no secret is required immediately.

## Safety rules

The script will not overwrite a static JS file if a source returns no valid records.

A valid record must have:

- `id`
- `title`

If one source fails, the script logs the error clearly. Existing data files remain safe.

## Data format

### Latest Jobs

Expected fields:

```text
id, title, organization, department, category, year, qualification, totalPosts, startDate, lastDate, status, tags, applyLink, officialNotification, detailPage, updatedAt
```

Generated variable:

```js
window.GovJobUpdatesJobs
```

### Admit Cards

Expected fields:

```text
id, title, organization, department, category, year, examDate, releaseDate, status, tags, downloadLink, detailPage, updatedAt
```

Generated variable:

```js
window.GovJobUpdatesAdmitCards
```

### Answer Keys

Expected fields:

```text
id, title, organization, department, category, year, examDate, releaseDate, objectionLastDate, status, tags, downloadLink, objectionLink, detailPage, updatedAt
```

Generated variable:

```js
window.GovJobUpdatesAnswerKeys
```

### Results

Expected fields:

```text
id, title, organization, department, category, year, resultDate, status, tags, resultLink, detailPage, updatedAt
```

Generated variable:

```js
window.GovJobUpdatesResults
```

## Local test

Run:

```bash
node scripts/sync-apps-script-to-js.js
```

Then check:

```bash
git diff JS/jobs-data.js JS/admitcard-data.js JS/answerkey-data.js JS/results-data.js
```

## Recommended final speed step

After the workflow successfully updates the static JS data files, public listing pages can remove live Google Sheet script loading:

```html
<script src="../JS/google-sheet-updates-config.js"></script>
<script src="../JS/google-sheet-updates.js"></script>
```

Keep them only if live fallback is still needed.
