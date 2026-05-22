const fs = require('fs');
const path = require('path');
const vm = require('vm');
const crypto = require('crypto');

const root = process.cwd();
const statePath = path.join(root, 'data', 'telegram-posted.json');
const siteUrl = 'https://govjobupdates.com';
const sources = [
  ['jobs', 'Latest Job', 'JS/jobs-data.js', 'GovJobUpdatesJobs'],
  ['admitCards', 'Admit Card', 'JS/admitcard-data.js', 'GovJobUpdatesAdmitCards'],
  ['answerKeys', 'Answer Key', 'JS/answerkey-data.js', 'GovJobUpdatesAnswerKeys'],
  ['results', 'Result', 'JS/results-data.js', 'GovJobUpdatesResults']
];

const text = (v, f = '') => {
  const s = String(v ?? '').trim();
  return s || f;
};
const low = (v) => text(v).toLowerCase();

function readJson(file, fallback) {
  try { return JSON.parse(fs.readFileSync(file, 'utf8')); } catch { return fallback; }
}
function writeJson(file, value) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(value, null, 2) + '\n');
}
function loadData(file, windowKey) {
  const code = fs.readFileSync(path.join(root, file), 'utf8');
  const sandbox = { window: {}, console: { log() {}, warn() {}, error() {} } };
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox, { timeout: 3000 });
  return Array.isArray(sandbox.window[windowKey]) ? sandbox.window[windowKey] : [];
}
function normalizeUrl(value) {
  const raw = text(value);
  if (!raw || raw === '#') return '';
  if (/^https?:\/\//i.test(raw)) return raw;
  let url = raw.replace(/^\.\//, '').replace(/^\.\.\//, '');
  if (!url.startsWith('/')) url = '/' + url;
  return siteUrl + url;
}
function keyFor(type, item) {
  return `${type}:${text(item.id, text(item.title, 'unknown'))}`;
}
function hashItem(item) {
  return crypto.createHash('sha256').update(JSON.stringify(item)).digest('hex');
}
function newer(next, previous) {
  const n = text(next);
  const p = text(previous);
  if (!n || !p) return false;
  const nt = Date.parse(n);
  const pt = Date.parse(p);
  if (Number.isFinite(nt) && Number.isFinite(pt)) return nt > pt;
  return n > p;
}
function ensureState(state) {
  const out = state && typeof state === 'object' ? state : {};
  for (const [type] of sources) {
    if (Array.isArray(out[type])) out[type] = Object.fromEntries(out[type].map((id) => [String(id), { updatedAt: '', hash: '' }]));
    else if (!out[type] || typeof out[type] !== 'object') out[type] = {};
  }
  return out;
}
function entry(item, reason) {
  return { updatedAt: text(item.updatedAt), hash: hashItem(item), title: text(item.title), lastPostedAt: reason === 'seed' ? '' : new Date().toISOString(), stateReason: reason };
}
function readyFlags(item) {
  return low(item.telegramStatus) === 'ready' && ['yes', 'true', '1', 'ready'].includes(low(item.telegramReady));
}
function valid(type, item) {
  if (!(text(item.id) && text(item.title) && text(item.organization) && text(item.status) && text(item.updatedAt) && readyFlags(item))) return false;
  if (type === 'jobs') return Boolean(text(item.totalPosts) && text(item.startDate) && text(item.lastDate) && text(item.officialNotification) && text(item.detailPage));
  if (type === 'admitCards') return Boolean(text(item.releaseDate) && text(item.examDate) && (text(item.downloadLink) || text(item.detailPage)));
  if (type === 'answerKeys') return Boolean(text(item.releaseDate) && text(item.examDate) && (text(item.downloadLink) || text(item.detailPage)));
  if (type === 'results') return Boolean(text(item.resultDate) && (text(item.resultLink) || text(item.detailPage)));
  return false;
}
function message(type, label, item, mode) {
  const details = normalizeUrl(item.detailPage) || normalizeUrl(item.applyLink) || normalizeUrl(item.downloadLink) || normalizeUrl(item.resultLink);
  const notification = normalizeUrl(item.officialNotification);
  const lines = [mode === 'new' ? `New ${label} Update` : `Important ${label} Update`, '', `Title: ${text(item.title)}`, `Organization: ${text(item.organization)}`];
  if (type === 'jobs') lines.push(`Total Posts: ${text(item.totalPosts)}`, `Form Start: ${text(item.startDate)}`, `Last Date: ${text(item.lastDate)}`);
  if (type === 'admitCards') lines.push(`Release Date: ${text(item.releaseDate)}`, `Exam Date: ${text(item.examDate)}`);
  if (type === 'answerKeys') lines.push(`Release Date: ${text(item.releaseDate)}`, `Exam Date: ${text(item.examDate)}`);
  if (type === 'results') lines.push(`Result Date: ${text(item.resultDate)}`);
  lines.push(`Status: ${text(item.status)}`, `Updated At: ${text(item.updatedAt)}`, '');
  if (notification) lines.push(`Notification: ${notification}`);
  if (details) lines.push(`Full Details: ${details}`);
  lines.push('', 'GovJobUpdates.com');
  return lines.join('\n');
}
async function sendTelegram(body) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chat = process.env.TELEGRAM_CHANNEL_ID;
  if (!token || !chat) throw new Error('Telegram configuration is missing.');
  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ chat_id: chat, text: body, disable_web_page_preview: false }) });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.ok) throw new Error(data.description || response.statusText);
}
async function main() {
  const seedOnly = low(process.env.SEED_ONLY) === 'true';
  const max = Number(process.env.MAX_TELEGRAM_MESSAGES || 3);
  const state = ensureState(readJson(statePath, {}));
  let sent = 0, seeded = 0, skippedNotReady = 0, skippedOlder = 0;
  for (const [type, label, file, win] of sources) {
    const items = loadData(file, win).sort((a, b) => Date.parse(b.updatedAt || '') - Date.parse(a.updatedAt || ''));
    for (const item of items) {
      if (!item || !item.id) continue;
      const key = keyFor(type, item);
      if (!valid(type, item)) { skippedNotReady++; continue; }
      const prev = state[type][key] || state[type][String(item.id)];
      if (seedOnly) { state[type][key] = entry(item, 'seed'); seeded++; continue; }
      if (!prev) {
        if (sent >= max) continue;
        await sendTelegram(message(type, label, item, 'new'));
        state[type][key] = entry(item, 'new');
        sent++;
      } else if (newer(item.updatedAt, prev.updatedAt)) {
        if (sent >= max) continue;
        await sendTelegram(message(type, label, item, 'update'));
        state[type][key] = entry(item, 'update');
        sent++;
      } else if (text(item.updatedAt) !== text(prev.updatedAt)) skippedOlder++;
    }
  }
  writeJson(statePath, state);
  console.log(`Telegram v3: sent=${sent}, seeded=${seeded}, skippedNotReady=${skippedNotReady}, skippedOlder=${skippedOlder}, seedOnly=${seedOnly}`);
}
main().catch((e) => { console.error(e.message); process.exit(1); });
