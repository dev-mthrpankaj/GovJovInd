const fs = require('fs');
const path = require('path');
const vm = require('vm');
const crypto = require('crypto');

const ROOT = process.cwd();
const STATE_PATH = path.join(ROOT, 'data', 'telegram-posted.json');
const SITE_URL = 'https://govjobupdates.com';

const SOURCES = [
  { key: 'jobs', label: 'Latest Job', file: 'JS/jobs-data.js', windowKey: 'GovJobUpdatesJobs' },
  { key: 'admitCards', label: 'Admit Card', file: 'JS/admitcard-data.js', windowKey: 'GovJobUpdatesAdmitCards' },
  { key: 'answerKeys', label: 'Answer Key', file: 'JS/answerkey-data.js', windowKey: 'GovJobUpdatesAnswerKeys' },
  { key: 'results', label: 'Result', file: 'JS/results-data.js', windowKey: 'GovJobUpdatesResults' }
];

const SNAPSHOT_FIELDS = {
  jobs: ['title', 'organization', 'totalPosts', 'qualification', 'startDate', 'lastDate', 'status', 'officialNotification', 'applyLink', 'detailPage', 'updatedAt'],
  admitCards: ['title', 'organization', 'examDate', 'releaseDate', 'status', 'downloadLink', 'detailPage', 'updatedAt'],
  answerKeys: ['title', 'organization', 'examDate', 'releaseDate', 'objectionLastDate', 'status', 'downloadLink', 'objectionLink', 'detailPage', 'updatedAt'],
  results: ['title', 'organization', 'resultDate', 'status', 'resultLink', 'detailPage', 'updatedAt']
};

function readJson(filePath, fallback) {
  try { return JSON.parse(fs.readFileSync(filePath, 'utf8')); } catch (_) { return fallback; }
}

function writeJson(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(value, null, 2) + '\n');
}

function loadWindowArray(source) {
  const filePath = path.join(ROOT, source.file);
  if (!fs.existsSync(filePath)) {
    console.warn(`[Telegram Updates] Missing file: ${source.file}`);
    return [];
  }
  const code = fs.readFileSync(filePath, 'utf8');
  const sandbox = { window: {}, console: { log() {}, warn() {}, error() {} } };
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox, { filename: source.file, timeout: 3000 });
  const data = sandbox.window[source.windowKey];
  return Array.isArray(data) ? data : [];
}

function clean(value, fallback = 'Not mentioned') {
  const text = String(value ?? '').trim();
  return text || fallback;
}

function requiredUpdatedAt(item) {
  return clean(item.updatedAt, '');
}

function trimLine(value, max = 180) {
  const text = clean(value, '').replace(/\s+/g, ' ').trim();
  return text.length > max ? text.slice(0, max - 1).trim() + '…' : text;
}

function normalizeUrl(value) {
  const raw = clean(value, '');
  if (!raw || raw === '#') return '';
  if (/^https?:\/\//i.test(raw)) return raw;
  let normalized = raw.replace(/^\.\//, '').replace(/^\.\.\//, '');
  if (!normalized.startsWith('/')) normalized = '/' + normalized;
  return SITE_URL + normalized;
}

function itemKey(source, item) {
  return `${source.key}:${clean(item.id, clean(item.title, 'unknown'))}`;
}

function snapshotFor(source, item) {
  const fields = SNAPSHOT_FIELDS[source.key] || ['title', 'status', 'updatedAt'];
  const snapshot = {};
  fields.forEach((field) => { snapshot[field] = clean(item[field], ''); });
  return snapshot;
}

function snapshotHash(source, item) {
  return crypto.createHash('sha256').update(JSON.stringify(snapshotFor(source, item))).digest('hex');
}

function normalizeSourceState(value) {
  if (Array.isArray(value)) {
    return value.reduce((acc, key) => {
      acc[String(key)] = { hash: '', updatedAt: '', legacy: true };
      return acc;
    }, {});
  }
  return value && typeof value === 'object' ? value : {};
}

function ensureState(state) {
  const next = state && typeof state === 'object' ? state : {};
  SOURCES.forEach((source) => { next[source.key] = normalizeSourceState(next[source.key]); });
  return next;
}

function makeStateEntry(source, item, reason) {
  return {
    hash: snapshotHash(source, item),
    updatedAt: requiredUpdatedAt(item),
    title: clean(item.title, ''),
    lastPostedAt: reason === 'seed' ? '' : new Date().toISOString(),
    stateReason: reason
  };
}

function hasImportantUpdate(previous, source, item) {
  if (!previous) return false;
  const nextUpdatedAt = requiredUpdatedAt(item);
  if (!nextUpdatedAt) return false;
  if (previous.updatedAt && previous.updatedAt !== nextUpdatedAt) return true;
  const nextHash = snapshotHash(source, item);
  if (previous.hash && previous.hash !== nextHash) return true;
  return Boolean(previous.legacy && nextUpdatedAt);
}

function formatJob(item, mode = 'new') {
  const notification = normalizeUrl(item.officialNotification);
  const details = normalizeUrl(item.detailPage) || normalizeUrl(item.applyLink) || notification;
  const lines = [
    mode === 'update' ? '🔔 Important Job Update' : '🚨 New Job Update',
    '',
    `📝 Vacancy: ${trimLine(item.title)}`,
    `🏢 Organization: ${trimLine(item.organization)}`,
    `📌 Total Posts: ${clean(item.totalPosts)}`,
    `🎓 Qualification: ${trimLine(item.qualification)}`,
    `📅 Form Start: ${clean(item.startDate)}`,
    `⏳ Last Date: ${clean(item.lastDate)}`,
    `📌 Status: ${clean(item.status)}`,
    `🕒 Updated At: ${requiredUpdatedAt(item)}`,
    ''
  ];
  if (notification) lines.push(`📄 Notification: ${notification}`);
  if (details) lines.push(`🔗 Full Details: ${details}`);
  lines.push('', '🌐 GovJobUpdates.com');
  return lines.join('\n');
}

function formatAdmitCard(item, mode = 'new') {
  const details = normalizeUrl(item.detailPage) || normalizeUrl(item.downloadLink);
  const lines = [
    mode === 'update' ? '🔔 Admit Card Update' : '🎫 New Admit Card Update',
    '',
    `📝 Exam: ${trimLine(item.title)}`,
    `🏢 Organization: ${trimLine(item.organization)}`,
    `📅 Release Date: ${clean(item.releaseDate)}`,
    `📅 Exam Date: ${clean(item.examDate)}`,
    `📌 Status: ${clean(item.status)}`,
    `🕒 Updated At: ${requiredUpdatedAt(item)}`,
    ''
  ];
  if (details) lines.push(`🔗 Full Details: ${details}`);
  lines.push('', '🌐 GovJobUpdates.com');
  return lines.join('\n');
}

function formatAnswerKey(item, mode = 'new') {
  const details = normalizeUrl(item.detailPage) || normalizeUrl(item.downloadLink);
  const lines = [
    mode === 'update' ? '🔔 Answer Key Update' : '✅ New Answer Key Update',
    '',
    `📝 Exam: ${trimLine(item.title)}`,
    `🏢 Organization: ${trimLine(item.organization)}`,
    `📅 Exam Date: ${clean(item.examDate)}`,
    `📅 Release Date: ${clean(item.releaseDate)}`,
    `⏳ Objection Last Date: ${clean(item.objectionLastDate)}`,
    `📌 Status: ${clean(item.status)}`,
    `🕒 Updated At: ${requiredUpdatedAt(item)}`,
    ''
  ];
  if (details) lines.push(`🔗 Full Details: ${details}`);
  lines.push('', '🌐 GovJobUpdates.com');
  return lines.join('\n');
}

function formatResult(item, mode = 'new') {
  const details = normalizeUrl(item.detailPage) || normalizeUrl(item.resultLink);
  const lines = [
    mode === 'update' ? '🔔 Result Update' : '🏆 New Result Update',
    '',
    `📝 Result: ${trimLine(item.title)}`,
    `🏢 Organization: ${trimLine(item.organization)}`,
    `📅 Result Date: ${clean(item.resultDate)}`,
    `📌 Status: ${clean(item.status)}`,
    `🕒 Updated At: ${requiredUpdatedAt(item)}`,
    ''
  ];
  if (details) lines.push(`🔗 Full Details: ${details}`);
  lines.push('', '🌐 GovJobUpdates.com');
  return lines.join('\n');
}

function formatMessage(source, item, mode) {
  if (source.key === 'jobs') return formatJob(item, mode);
  if (source.key === 'admitCards') return formatAdmitCard(item, mode);
  if (source.key === 'answerKeys') return formatAnswerKey(item, mode);
  if (source.key === 'results') return formatResult(item, mode);
  return `📢 ${mode === 'update' ? 'Important' : 'New'} ${source.label} Update\n\n${trimLine(item.title)}\n\n🌐 GovJobUpdates.com`;
}

async function sendTelegramMessage(text) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHANNEL_ID;
  if (!token) throw new Error('TELEGRAM_BOT_TOKEN secret is missing.');
  if (!chatId) throw new Error('TELEGRAM_CHANNEL_ID secret is missing.');

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text, disable_web_page_preview: false })
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.ok) throw new Error(data.description || response.statusText || 'Telegram API error');
  return data;
}

function sortNewestFirst(items) {
  return [...items].sort((a, b) => {
    const dateA = Date.parse(a.updatedAt || a.releaseDate || a.resultDate || a.startDate || '') || 0;
    const dateB = Date.parse(b.updatedAt || b.releaseDate || b.resultDate || b.startDate || '') || 0;
    return dateB - dateA;
  });
}

async function main() {
  const state = ensureState(readJson(STATE_PATH, {}));
  const seedOnly = String(process.env.SEED_ONLY || '').toLowerCase() === 'true';
  let sentCount = 0;
  let seededCount = 0;
  let skippedDraftCount = 0;
  const maxMessages = Number(process.env.MAX_TELEGRAM_MESSAGES || 3);

  for (const source of SOURCES) {
    const items = sortNewestFirst(loadWindowArray(source));
    const planned = [];

    for (const item of items) {
      if (!item || !item.id) continue;
      const updatedAt = requiredUpdatedAt(item);
      const key = itemKey(source, item);

      if (!updatedAt) {
        skippedDraftCount += 1;
        console.log(`[Telegram Updates] Skipped draft without updatedAt: ${key}`);
        continue;
      }

      const previous = state[source.key][key] || state[source.key][String(item.id)];

      if (seedOnly) {
        state[source.key][key] = makeStateEntry(source, item, 'seed');
        seededCount += 1;
        continue;
      }

      if (!previous) planned.push({ item, key, mode: 'new' });
      else if (hasImportantUpdate(previous, source, item)) planned.push({ item, key, mode: 'update' });
    }

    if (seedOnly) {
      console.log(`[Telegram Updates] ${source.label}: seeded current items, no Telegram messages sent.`);
      continue;
    }

    console.log(`[Telegram Updates] ${source.label}: ${planned.length} new/update item(s).`);

    for (const entry of planned) {
      if (sentCount >= maxMessages) {
        console.log(`[Telegram Updates] Max message limit reached: ${maxMessages}`);
        break;
      }
      const message = formatMessage(source, entry.item, entry.mode);
      console.log(`[Telegram Updates] Sending ${entry.mode} ${entry.key}: ${entry.item.title}`);
      await sendTelegramMessage(message);
      state[source.key][entry.key] = makeStateEntry(source, entry.item, entry.mode);
      sentCount += 1;
      await new Promise((resolve) => setTimeout(resolve, 800));
    }
  }

  writeJson(STATE_PATH, state);
  console.log(`[Telegram Updates] Seed mode: ${seedOnly ? 'ON' : 'OFF'}.`);
  console.log(`[Telegram Updates] Sent ${sentCount} message(s). Seeded ${seededCount} item(s). Skipped ${skippedDraftCount} draft item(s) without updatedAt.`);
}

main().catch((error) => {
  console.error('[Telegram Updates] Failed:', error.message);
  process.exit(1);
});
