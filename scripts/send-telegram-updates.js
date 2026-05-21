const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = process.cwd();
const STATE_PATH = path.join(ROOT, 'data', 'telegram-posted.json');
const SITE_URL = 'https://govjobupdates.com';

const SOURCES = [
  {
    key: 'jobs',
    label: 'Latest Job',
    file: 'JS/jobs-data.js',
    windowKey: 'GovJobUpdatesJobs'
  },
  {
    key: 'admitCards',
    label: 'Admit Card',
    file: 'JS/admitcard-data.js',
    windowKey: 'GovJobUpdatesAdmitCards'
  },
  {
    key: 'answerKeys',
    label: 'Answer Key',
    file: 'JS/answerkey-data.js',
    windowKey: 'GovJobUpdatesAnswerKeys'
  },
  {
    key: 'results',
    label: 'Result',
    file: 'JS/results-data.js',
    windowKey: 'GovJobUpdatesResults'
  }
];

function readJson(filePath, fallback) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (_) {
    return fallback;
  }
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

function formatJob(item) {
  const notification = normalizeUrl(item.officialNotification);
  const details = normalizeUrl(item.detailPage) || normalizeUrl(item.applyLink) || notification;
  const lines = [
    '🚨 New Job Update',
    '',
    `📝 Vacancy: ${trimLine(item.title)}`,
    `🏢 Organization: ${trimLine(item.organization)}`,
    `📌 Total Posts: ${clean(item.totalPosts)}`,
    `🎓 Qualification: ${trimLine(item.qualification)}`,
    `📅 Form Start: ${clean(item.startDate)}`,
    `⏳ Last Date: ${clean(item.lastDate)}`,
    `📌 Status: ${clean(item.status)}`,
    ''
  ];
  if (notification) lines.push(`📄 Notification: ${notification}`);
  if (details) lines.push(`🔗 Full Details: ${details}`);
  lines.push('', '🌐 GovJobUpdates.com');
  return lines.join('\n');
}

function formatAdmitCard(item) {
  const details = normalizeUrl(item.detailPage) || normalizeUrl(item.downloadLink);
  const lines = [
    '🎫 Admit Card Update',
    '',
    `📝 Exam: ${trimLine(item.title)}`,
    `🏢 Organization: ${trimLine(item.organization)}`,
    `📅 Release Date: ${clean(item.releaseDate)}`,
    `📅 Exam Date: ${clean(item.examDate)}`,
    `📌 Status: ${clean(item.status)}`,
    ''
  ];
  if (details) lines.push(`🔗 Full Details: ${details}`);
  lines.push('', '🌐 GovJobUpdates.com');
  return lines.join('\n');
}

function formatAnswerKey(item) {
  const details = normalizeUrl(item.detailPage) || normalizeUrl(item.downloadLink);
  const lines = [
    '✅ Answer Key Update',
    '',
    `📝 Exam: ${trimLine(item.title)}`,
    `🏢 Organization: ${trimLine(item.organization)}`,
    `📅 Exam Date: ${clean(item.examDate)}`,
    `📅 Release Date: ${clean(item.releaseDate)}`,
    `⏳ Objection Last Date: ${clean(item.objectionLastDate)}`,
    `📌 Status: ${clean(item.status)}`,
    ''
  ];
  if (details) lines.push(`🔗 Full Details: ${details}`);
  lines.push('', '🌐 GovJobUpdates.com');
  return lines.join('\n');
}

function formatResult(item) {
  const details = normalizeUrl(item.detailPage) || normalizeUrl(item.resultLink);
  const lines = [
    '🏆 Result Update',
    '',
    `📝 Result: ${trimLine(item.title)}`,
    `🏢 Organization: ${trimLine(item.organization)}`,
    `📅 Result Date: ${clean(item.resultDate)}`,
    `📌 Status: ${clean(item.status)}`,
    ''
  ];
  if (details) lines.push(`🔗 Full Details: ${details}`);
  lines.push('', '🌐 GovJobUpdates.com');
  return lines.join('\n');
}

function formatMessage(source, item) {
  if (source.key === 'jobs') return formatJob(item);
  if (source.key === 'admitCards') return formatAdmitCard(item);
  if (source.key === 'answerKeys') return formatAnswerKey(item);
  if (source.key === 'results') return formatResult(item);
  return `📢 New ${source.label} Update\n\n${trimLine(item.title)}\n\n🌐 GovJobUpdates.com`;
}

async function sendTelegramMessage(text) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHANNEL_ID;

  if (!token) throw new Error('TELEGRAM_BOT_TOKEN secret is missing.');
  if (!chatId) throw new Error('TELEGRAM_CHANNEL_ID secret is missing.');

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      disable_web_page_preview: false
    })
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.ok) {
    throw new Error(data.description || response.statusText || 'Telegram API error');
  }
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
  const state = readJson(STATE_PATH, { jobs: [], admitCards: [], answerKeys: [], results: [] });
  let sentCount = 0;
  const maxMessages = Number(process.env.MAX_TELEGRAM_MESSAGES || 10);

  for (const source of SOURCES) {
    if (!Array.isArray(state[source.key])) state[source.key] = [];
    const posted = new Set(state[source.key].map(String));
    const items = sortNewestFirst(loadWindowArray(source));

    const freshItems = items.filter((item) => item && item.id && !posted.has(itemKey(source, item)) && !posted.has(String(item.id)));
    console.log(`[Telegram Updates] ${source.label}: ${freshItems.length} new item(s).`);

    for (const item of freshItems) {
      if (sentCount >= maxMessages) {
        console.log(`[Telegram Updates] Max message limit reached: ${maxMessages}`);
        break;
      }

      const key = itemKey(source, item);
      const message = formatMessage(source, item);
      console.log(`[Telegram Updates] Sending ${key}: ${item.title}`);
      await sendTelegramMessage(message);
      state[source.key].push(key);
      sentCount += 1;
      await new Promise((resolve) => setTimeout(resolve, 800));
    }
  }

  writeJson(STATE_PATH, state);
  console.log(`[Telegram Updates] Sent ${sentCount} message(s).`);
}

main().catch((error) => {
  console.error('[Telegram Updates] Failed:', error.message);
  process.exit(1);
});
