# Telegram-safe changes for `content-updates-Code.gs`

Apply these changes in Google Apps Script before deploying.

## 1. Add these fields to every `CONTENT_SHEETS[type].fields` array

Add after `["Updated At", "updatedAt", "date"]` in `jobs`, `admitCards`, `results`, and `answerKeys`:

```js
["Updated At", "updatedAt", "date"],
["Telegram Status", "telegramStatus"],
["Telegram Ready", "telegramReady"]
```

## 2. Stop auto-filling `updatedAt`

Find this line in `buildContentItem()`:

```js
if (!item.updatedAt) item.updatedAt = formatContentDate(new Date());
```

Replace it with:

```js
// Keep Updated At blank until the row is final-ready for Telegram.
if (!item.updatedAt) item.updatedAt = "";
```

## 3. Recommended row workflow

While editing a row:

```text
Published = yes
Telegram Status = draft
Telegram Ready = no
Updated At = blank
```

When final-ready:

```text
Published = yes
Telegram Status = ready
Telegram Ready = yes
Updated At = yyyy-mm-dd
```

## 4. Telegram sender rule already added

The GitHub Telegram sender now requires:

```text
telegramStatus = ready
telegramReady = yes
updatedAt is not blank
required row fields are filled
same ID update only when updatedAt becomes newer
```

Files added/updated:

```text
scripts/send-telegram-updates-v3.js
scripts/send-telegram-updates.js
```
