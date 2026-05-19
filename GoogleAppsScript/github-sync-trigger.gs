// Optional instant sync trigger for the Content_Updates Google Sheet.
// Add this file to the same Apps Script project that serves content-updates-Code.gs.
// It triggers the GitHub Actions workflow when you edit one of the listing sheets.

const GJU_GITHUB_SYNC_REPO = "dev-mthrpankaj/GovJovInd";
const GJU_GITHUB_SYNC_WORKFLOW = "sync-listing-data.yml";
const GJU_GITHUB_SYNC_BRANCH = "main";
const GJU_GITHUB_SYNC_TOKEN_PROPERTY = "GITHUB_SYNC_TOKEN";
const GJU_GITHUB_SYNC_DEBOUNCE_SECONDS = 90;

const GJU_CONTENT_SYNC_SHEET_NAMES = [
  "Latest Jobs",
  "Admit Cards",
  "Answer Keys",
  "Results"
];

/**
 * Run this once after adding GITHUB_SYNC_TOKEN in Script Properties.
 * It installs an on-edit trigger for the spreadsheet.
 */
function installGjuContentSyncTrigger() {
  const spreadsheet = SpreadsheetApp.openById(CONTENT_SPREADSHEET_ID);
  const triggers = ScriptApp.getProjectTriggers();

  triggers.forEach(function (trigger) {
    if (trigger.getHandlerFunction() === "onGjuContentSheetEdit") {
      ScriptApp.deleteTrigger(trigger);
    }
  });

  ScriptApp.newTrigger("onGjuContentSheetEdit")
    .forSpreadsheet(spreadsheet)
    .onEdit()
    .create();

  return "Installed GitHub sync trigger for " + spreadsheet.getName();
}

/**
 * Installable on-edit trigger handler.
 * Do not run manually; use testGjuListingSyncDispatch() for manual testing.
 */
function onGjuContentSheetEdit(e) {
  try {
    if (!e || !e.range) return;

    const sheet = e.range.getSheet();
    const sheetName = sheet.getName();
    if (GJU_CONTENT_SYNC_SHEET_NAMES.indexOf(sheetName) === -1) return;

    // Header-only edits do not need a website sync.
    if (e.range.getRow() === 1) return;

    if (!shouldDispatchGjuSync_()) return;

    dispatchGjuListingSync_("Sheet edit: " + sheetName);
  } catch (error) {
    console.error("GitHub sync trigger failed: " + error.message);
  }
}

/**
 * Manual test. Run this from Apps Script editor to confirm GitHub workflow dispatch works.
 */
function testGjuListingSyncDispatch() {
  return dispatchGjuListingSync_("Manual Apps Script test");
}

function shouldDispatchGjuSync_() {
  const cache = CacheService.getScriptCache();
  const cacheKey = "GJU_GITHUB_SYNC_DISPATCH_LOCK";
  if (cache.get(cacheKey)) return false;

  cache.put(cacheKey, "1", GJU_GITHUB_SYNC_DEBOUNCE_SECONDS);
  return true;
}

function dispatchGjuListingSync_(reason) {
  const token = PropertiesService.getScriptProperties().getProperty(GJU_GITHUB_SYNC_TOKEN_PROPERTY);
  if (!token) {
    throw new Error("Missing Script Property: " + GJU_GITHUB_SYNC_TOKEN_PROPERTY);
  }

  const url = "https://api.github.com/repos/" + GJU_GITHUB_SYNC_REPO +
    "/actions/workflows/" + encodeURIComponent(GJU_GITHUB_SYNC_WORKFLOW) + "/dispatches";

  const response = UrlFetchApp.fetch(url, {
    method: "post",
    contentType: "application/json",
    headers: {
      Authorization: "Bearer " + token,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28"
    },
    payload: JSON.stringify({
      ref: GJU_GITHUB_SYNC_BRANCH,
      inputs: {}
    }),
    muteHttpExceptions: true
  });

  const statusCode = response.getResponseCode();
  const body = response.getContentText();

  if (statusCode !== 204) {
    throw new Error("GitHub workflow dispatch failed. HTTP " + statusCode + ": " + body);
  }

  const message = "GitHub listing sync dispatched: " + (reason || "No reason provided");
  console.log(message);
  return message;
}
