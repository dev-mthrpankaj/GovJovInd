const fs = require('fs');
const path = require('path');
const vm = require('vm');
const crypto = require('crypto');

const ROOT = process.cwd();
const STATE_PATH = path.join(ROOT, 'data', 'telegram-posted.json');
const SITE_URL = 'https://govjobupdates.com';
const SOURCES = [
  ['jobs', 'Latest Job', 'JS/jobs-data.js', 'GovJobUpdatesJobs'],
  ['admitCards', 'Admit Card', 'JS/admitcard-data.js', 'GovJobUpdatesAdmitCards'],
  ['answerKeys', 'Answer Key', 'JS/answerkey-data.js', 'GovJobUpdatesAnswerKeys'],
  ['results', 'Result', 'JS/results-data.js', 'GovJobUpdatesResults']
];

function clean(value, fallback = '') {
  const text = String(value ?? '').trim();
  return text || fallback;
}

function readJson(file, fallback) {
  try { return JSON.parse(fs.readFileSync(file, 'utf8')); } catch { return fallback; }
}

function writeJson(file, value) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(value, null, 2) + '\n');
}

function loadData(file, windowKey) {
  const code = fs.readFileSync(path.join(ROOT, file), 'utf8');
  const sandbox = { window: {}, console: { log() {}, warn() {}, error() {} } };
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox, { timeout: 3000 });
  return Array.isArray(sandbox.window[windowKey]) ? sandbox.window[windowKey] : [];
}

function normalizeUrl(value) {
  const raw = clean(value);
  if (!raw || raw === '#') return '';
  if (/^https?:\/\//i.test(raw)) return raw;
  let url = raw.replace(/^\.\//, '').replace(/^\.\.\//, '');
  if (!url.startsWith('/')) url = '/' + url;
  return SITE_URL + url;
}

function itemKey(sourceKey, item) {
  return `${sourceKey}:${clean(item.id, clean(item.title, 'unknown'))}`;
}

function hashItem(item) {
  return crypto.createHash('sha256').update(JSON.stringify(item)).digest('hex');
}

function newerDate(next, previous) {
  const n = clean(next);
  const p = clean(previous);
  if (!n || !p) return false;
  const nt = Date.parse(n);
  const pt = Date.parse(p);
  if (Number.isFinite(nt) && Number.isFinite(pt)) return nt > pt;
  return n > p;
}

function ensureState(state) {
  const out = state && typeof state === 'object' ? state : {};
  for (const [key] of SOURCES) {
    if (Array.isArray(out[key])) {
      out[key] = Object.fromEntries(out[key].map((id) => [String(id), { updatedAt: '', hash: '' }]));
    } else if (!out[key] || typeof out[key] !== 'object') {
      out[key] = {};
    }
  }
  return out;
}

function stateEntry(item, reason) {
  return {
    updatedAt: clean(item.updatedAt),
    hash: hashItem(item),
    title: clean(item.title),
    lastPostedAt: reason === 'seed' ? '' : new Date().toISOString(),
    stateReason: reason
  };
}

function msg(sourceKey, label, item, mode) {
  const title = clean(item.title, 'Untitled');
  const org = clean(item.organization, 'Not mentioned');
  const status = clean(item.status, 'Not mentioned');
  const updatedAt = clean(item.updatedAt);
  const details = normalizeUrl(item.detailPage) || normalizeUrl(item.applyLink) || normalizeUrl(item.downloadLink) || normalizeUrl(item.resultLink);
  const notification = normalizeUrl(item.officialNotification);
  const heading = mode === 'new' ? `New ${label} Update` : `Important ${label} Update`;
  const lines = [heading, '', `Title: ${title}`, `Organization: ${org}`, `Status: ${status}`, `Updated At: ${updatedAt}`];
  if (sourceKey === 'jobs') lines.splice(4, 0, `Total Posts: ${clean(item.totalPosts, 'Not mentioned')}`, `Form Start: ${clean(item.startDate, 'Not mentioned')}`, `Last Date: ${clean(item.lastDate, 'Not mentioned')}`);
  if (sourceKey === 'admitCards') lines.splice(4, 0, `Release Date: ${clean(item.releaseDate, 'Not mentioned')}`, `Exam Date: ${clean(item.examDate, 'Not mentioned')}`);
  if (sourceKey === 'answerKeys') lines.splice(4, 0, `Release Date: ${clean(item.releaseDate, 'Not mentioned')}`, `Exam Date: ${clean(item.examDate, 'Not mentioned')}`);
  if (sourceKey === 'results') lines.splice(4, 0, `Result Date: ${clean(item.resultDate, 'Not mentioned')}`);
  lines.push('');
  if (notification) lines.push(`Notification: ${notification}`);
  if (details) lines.push(`Full Details: ${details}`);
  lines.push('', 'GovJobUpdates.com');
  return lines.join('\n');
}

async function send(text) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHANNEL_ID;
  if (!token || !chatId) throw new Error('Telegram secrets are missing.');
  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text, disable_web_page_preview: false })
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.ok) throw new Error(data.description || response.statusText);
}

async function main() {
  const seedOnly = String(process.env.SEED_ONLY || '').toLowerCase() === 'true';
  const max = Number(process.env.MAX_TELEGRAM_MESSAGES || 3);
  const state = ensureState(readJson(STATE_PATH, {}));
  let sent = 0;
  let seeded = 0;
  let skippedDraft = 0;
  let skippedOlder = 0;

  for (const [sourceKey, label, file, windowKey] of SOURCES) {
    const items = loadData(file, windowKey).sort((a, b) => Date.parse(b.updatedAt || '') - Date.parse(a.updatedAt || ''));
    for (const item of items) {
      if (!item || !item.id) continue;
      const updatedAt = clean(item.updatedAt);
      const key = itemKey(sourceKey, item);
      if (!updatedAt) { skippedDraft++; continue; }
      const prev = state[sourceKey][key] || state[sourceKey][String(item.id)];
      if (seedOnly) { state[sourceKey][key] = stateEntry(item, 'seed'); seeded++; continue; }
      if (!prev) {
        if (sent >= max) continue;
        await send(msg(sourceKey, label, item, 'new'));
        state[sourceKey][key] = stateEntry(item, 'new');
        sent++;
      } else if (newerDate(updatedAt, prev.updatedAt)) {
        if (sent >= max) continue;
        await send(msg(sourceKey, label, item, 'update'));
        state[sourceKey][key] = stateEntry(item, 'update');
        sent++;
      } else if (updatedAt !== clean(prev.updatedAt)) {
        skippedOlder++;
      }
    }
  }

  writeJson(STATE_PATH, state);
  console.log(`Telegram v2: sent=${sent}, seeded=${seeded}, skippedDraft=${skippedDraft}, skippedOlder=${skippedOlder}, seedOnly=${seedOnly}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
