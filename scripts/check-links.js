const fs = require('fs');
const path = require('path');

const root = process.cwd();
const htmlFiles = [];
const missing = [];
const skipPrefixes = ['http:', 'https:', '//', 'file:', 'mailto:', 'tel:', 'sms:', 'intent:', 'javascript:', 'data:', '#'];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === '.git' || entry.name === 'node_modules' || entry.name === 'build') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    if (entry.isFile() && entry.name.toLowerCase().endsWith('.html')) htmlFiles.push(full);
  }
}

function shouldSkip(value) {
  const v = String(value || '').trim().toLowerCase();
  return !v || skipPrefixes.some((prefix) => v.startsWith(prefix));
}

function stripQuery(value) {
  return String(value || '').split('#')[0].split('?')[0].trim();
}

function targetExists(fromFile, rawTarget) {
  const clean = stripQuery(rawTarget);
  if (shouldSkip(clean)) return true;
  let target = clean;
  try { target = decodeURIComponent(clean); } catch (_) {}
  const abs = target.startsWith('/')
    ? path.join(root, target.slice(1))
    : path.resolve(path.dirname(fromFile), target);
  return fs.existsSync(abs) || fs.existsSync(abs + '.html') || fs.existsSync(path.join(abs, 'index.html'));
}

function extractLinks(html) {
  const values = [];
  const attrs = ['href="', "href='", 'src="', "src='"];
  for (const marker of attrs) {
    let index = 0;
    while ((index = html.indexOf(marker, index)) !== -1) {
      const start = index + marker.length;
      const quote = marker.endsWith('"') ? '"' : "'";
      const end = html.indexOf(quote, start);
      if (end === -1) break;
      values.push(html.slice(start, end));
      index = end + 1;
    }
  }
  return values;
}

walk(root);

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8');
  const rel = path.relative(root, file).replaceAll(path.sep, '/');
  for (const link of extractLinks(html)) {
    if (!targetExists(file, link)) missing.push(`${rel} -> ${link}`);
  }
}

if (missing.length) {
  console.error('Missing internal links/assets found:');
  missing.forEach((item) => console.error('- ' + item));
  process.exit(1);
}

console.log(`OK: checked ${htmlFiles.length} HTML files. No missing internal links/assets found.`);
