/**
 * GovJobUpdates - certificate document upload + retention (Google Apps Script web app)
 *
 * Deploy: Extensions > Apps Script > paste this file > Deploy > New deployment > Web app
 *         Execute as: Me   |   Who has access: Anyone      (the token check below is the real gate)
 * Then:   Project Settings > Script properties > add  PURGE_KEY  = same value as CERTIFICATE_PURGE_KEY
 *         in private/payment-secrets.php, run installTriggers() once, and paste the new /exec URL
 *         into JS/up-certificate-config.js (driveUrl).
 *
 * Security model
 *  1. Every upload must carry the one-time upload token issued after a VERIFIED payment. This script never
 *     trusts it: it asks the PHP server (upload-authorize.php) before touching Drive.
 *  2. Only the document keys the server requires for that request are accepted - nothing else is written.
 *  3. File type is decided by the real file bytes (magic numbers), not by the name or MIME the browser sent.
 *  4. Folders are private to the script owner (never shared by link).
 *  5. A daily trigger trashes folders once the retention period is over (default 90 days after completion /
 *     rejection) and tells the server, so Aadhaar copies are not kept forever.
 */
const CFG = {
  API_BASE: 'https://test.govjobupdates.com/live-test/certificate-api',
  ROOT_FOLDER: 'GovJobUpdates Certificate Documents',
  MAX_FILE_BYTES: 1.5 * 1024 * 1024 + 64 * 1024,   // client compresses to <= 1.5 MB; small headroom
  MAX_FILES: 13,
  REQUEST_ID_RE: /^GJU-CERT-\d{6}-[A-Z0-9]{6}$/
};

function doGet() { return json_({ success: true, service: 'certificate-drive-upload' }); }

function doPost(e) {
  try {
    const body = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    if (body.action !== 'uploadCertificateDocuments') return fail_('Unknown action.');
    const requestId = String((body.data && body.data.requestId) || '').trim();
    const token = String((body.data && body.data.uploadToken) || '').trim();
    const files = body.files && typeof body.files === 'object' ? body.files : {};
    if (!CFG.REQUEST_ID_RE.test(requestId) || token.length < 32) return fail_('Document upload is not authorized.');

    // 1) the server decides whether this upload is allowed and which documents it needs
    const auth = callApi_('upload-authorize.php', { request_id: requestId, upload_token: token });
    if (!auth || auth.success !== true || auth.authorized !== true) return fail_('Document upload is not authorized.');
    const rules = {};
    (auth.required_documents || []).forEach(function (d) { rules[d.key] = d; });

    // 2) exactly the documents this request needs
    const keys = Object.keys(files).filter(function (k) { return files[k]; });
    if (keys.length > CFG.MAX_FILES) return fail_('Too many files.');
    for (var i = 0; i < keys.length; i++) if (!rules[keys[i]]) return fail_('Unexpected document: ' + keys[i]);
    for (var key in rules) if (rules[key].required && !files[key]) return fail_('Missing required document: ' + rules[key].label);

    // 3) decode + verify every file BEFORE writing anything
    const blobs = [];
    for (var j = 0; j < keys.length; j++) {
      const k = keys[j], rule = rules[k], f = files[k];
      const bytes = Utilities.base64Decode(String(f.data || ''));
      if (!bytes.length || bytes.length > CFG.MAX_FILE_BYTES) return fail_((rule.label || k) + ' is empty or too large.');
      const real = sniff_(bytes);
      if (!real) return fail_((rule.label || k) + ' is not a valid JPG, PNG, WEBP or PDF file.');
      if (!accepts_(String(rule.accept || ''), real.mime)) return fail_((rule.label || k) + ' has the wrong file type.');
      blobs.push(Utilities.newBlob(bytes, real.mime, k + '.' + real.ext));
    }

    // 4) private folder per request; re-upload replaces earlier files with the same key
    const lock = LockService.getScriptLock();
    lock.waitLock(30000);
    var folder;
    try {
      folder = requestFolder_(requestId);
      blobs.forEach(function (b) {
        const base = b.getName().split('.')[0];
        const old = folder.getFiles();
        while (old.hasNext()) { const o = old.next(); if (o.getName().split('.')[0] === base) o.setTrashed(true); }
        folder.createFile(b);
      });
      folder.setSharing(DriveApp.Access.PRIVATE, DriveApp.Permission.NONE);
    } finally { lock.releaseLock(); }

    // 5) tell the server the documents are in. Retrying this whole upload is safe.
    const done = callApi_('upload-complete.php', { request_id: requestId, upload_token: token, folder_url: folder.getUrl() });
    if (!done || done.success !== true) return fail_((done && done.message) || 'Could not register the uploaded documents. Please retry.');
    return json_({ success: true, request_id: requestId });
  } catch (err) {
    console.error(err && err.stack || err);
    return fail_('Document upload failed. Please retry.');
  }
}

/* ---------- helpers ---------- */
function json_(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }
function fail_(m) { return json_({ success: false, message: m }); }

function callApi_(path, payload) {
  const res = UrlFetchApp.fetch(CFG.API_BASE + '/' + path, {
    method: 'post', contentType: 'application/json', payload: JSON.stringify(payload), muteHttpExceptions: true, followRedirects: false
  });
  try { return JSON.parse(res.getContentText()); } catch (e) { return null; }
}

function sniff_(b) {   // magic numbers; bytes are signed in Apps Script
  const u = function (i) { return b[i] & 0xff; };
  if (u(0) === 0x25 && u(1) === 0x50 && u(2) === 0x44 && u(3) === 0x46) return { mime: 'application/pdf', ext: 'pdf' };
  if (u(0) === 0xff && u(1) === 0xd8 && u(2) === 0xff) return { mime: 'image/jpeg', ext: 'jpg' };
  if (u(0) === 0x89 && u(1) === 0x50 && u(2) === 0x4e && u(3) === 0x47) return { mime: 'image/png', ext: 'png' };
  if (u(0) === 0x52 && u(1) === 0x49 && u(2) === 0x46 && u(3) === 0x46 && u(8) === 0x57 && u(9) === 0x45 && u(10) === 0x42 && u(11) === 0x50) return { mime: 'image/webp', ext: 'webp' };
  return null;
}

function accepts_(accept, mime) {
  if (!accept) return true;
  const isPdf = mime === 'application/pdf';
  if (accept === 'application/pdf') return isPdf;
  if (accept === 'image/*') return !isPdf;
  return true;   // 'image/*,.pdf'
}

function requestFolder_(requestId) {
  const roots = DriveApp.getFoldersByName(CFG.ROOT_FOLDER);
  const root = roots.hasNext() ? roots.next() : DriveApp.createFolder(CFG.ROOT_FOLDER);
  const existing = root.getFoldersByName(requestId);
  return existing.hasNext() ? existing.next() : root.createFolder(requestId);
}

/* ---------- retention: run daily (see installTriggers) ---------- */
function purgeExpiredDocuments() {
  const key = PropertiesService.getScriptProperties().getProperty('PURGE_KEY');
  if (!key) throw new Error('Set the PURGE_KEY script property first.');
  const headers = { 'X-Purge-Key': key };
  const list = JSON.parse(UrlFetchApp.fetch(CFG.API_BASE + '/purge-candidates.php', { headers: headers, muteHttpExceptions: true }).getContentText());
  if (!list.success) throw new Error('purge-candidates failed: ' + (list.message || ''));
  (list.items || []).forEach(function (item) {
    const m = /folders\/([A-Za-z0-9_-]+)/.exec(String(item.drive_folder_url || ''));
    try {
      if (m) DriveApp.getFolderById(m[1]).setTrashed(true);
    } catch (e) { /* folder already gone: still confirm so the server stops listing it */ }
    UrlFetchApp.fetch(CFG.API_BASE + '/purge-confirm.php', {
      method: 'post', headers: headers, contentType: 'application/json',
      payload: JSON.stringify({ request_id: item.request_id }), muteHttpExceptions: true
    });
  });
}

function installTriggers() {
  ScriptApp.getProjectTriggers().forEach(function (t) { if (t.getHandlerFunction() === 'purgeExpiredDocuments') ScriptApp.deleteTrigger(t); });
  ScriptApp.newTrigger('purgeExpiredDocuments').timeBased().everyDays(1).atHour(3).create();
}
