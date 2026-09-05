'use strict';
// Public page metadata only. Never index script bodies, account records or quiz answers.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { execFileSync } = require('node:child_process');
const root = path.resolve(__dirname, '..');
const decode = text => String(text || '').replace(/<[^>]*>/g, ' ').replace(/&#(x[\da-f]+|\d+);/gi, (_, n) => { const v = n[0].toLowerCase() === 'x' ? parseInt(n.slice(1), 16) : Number(n); return v <= 0x10ffff ? String.fromCodePoint(v) : ''; }).replace(/&(amp|quot|apos|lt|gt|nbsp);/g, (_, n) => ({amp:'&',quot:'"',apos:"'",lt:'<',gt:'>',nbsp:' '})[n]).replace(/\s+/g, ' ').trim();
const attr = (tag, name) => (tag.match(new RegExp(`\\b${name}\\s*=\\s*(["'])(.*?)\\1`, 'i')) || [])[2] || '';
const metadata = (html, name) => { const tag = (html.match(/<meta\b[^>]*>/gi) || []).find(t => attr(t,'name').toLowerCase() === name); return tag ? decode(attr(tag,'content')) : ''; };
function category(file) {
  if (/^(Job_Details|jobs)\//i.test(file) || /latest-jobs/.test(file)) return 'Jobs';
  if (/^AdmitCard_Details\//i.test(file) || /admitcard/.test(file)) return 'Admit Cards';
  if (/^AnswerKey_Details\//i.test(file) || /answer-key/.test(file)) return 'Answer Keys';
  if (/^Result_Details\//i.test(file) || /\/results\.html$/.test(file)) return 'Results';
  if (/^HTML\/student-hub\//.test(file)) return 'Articles';
  if (/typing-test\//.test(file)) return 'Typing';
  if (/quiz|live-test-info/.test(file)) return 'Quizzes';
  if (/rank-predictor|documents|certificate/.test(file)) return 'Tools';
  return 'Pages';
}
const records = new Map();
const add = record => { if (record.title && record.url) records.set(`${record.url}|${record.category}`, record); };
const files = execFileSync('git', ['ls-files', '-z'], {cwd:root, encoding:'utf8'}).split('\0');
for (const file of files) {
  if (!/\.html$/i.test(file) || /(^|\/)(\.|node_modules|android-webview-app|reports|admin|backend)/i.test(file) || /(?:^|[\/_ .-])(backup|draft|old|copy|test-page)(?:[\/_ .-]|$)/i.test(file) || /(?:admin|checkout|order|profile|quiz-attempt|quiz-result|scorecard|404|payment|reset-password|store-product|recruitment-job|recruitment-selection|recruitment-status)/i.test(file)) continue;
  const html = fs.readFileSync(path.join(root,file), 'utf8');
  if (/noindex/i.test(metadata(html,'robots')) || /http-equiv\s*=\s*["']refresh/i.test(html)) continue;
  const title = decode((html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)||[])[1]).replace(/\s*[|–-]\s*GovJobUpdates.*$/i,'');
  if (!title) continue;
  const description = metadata(html,'description').slice(0,260);
  const headings = (html.match(/<h[12]\b[^>]*>[\s\S]*?<\/h[12]>/gi)||[]).map(decode).join(' ').slice(0,1200);
  add({title,url:file,category:category(file),description,keywords: `${metadata(html,'keywords').slice(0,650)} ${headings}`.trim()});
}
// Listing sync can publish a title before a detail page changes. Index its metadata too.
const listingSources = [
  ['jobs-data.js','GovJobUpdatesJobs','Jobs','HTML/latest-jobs.html'],
  ['admitcard-data.js','GovJobUpdatesAdmitCards','Admit Cards','HTML/admitcard.html'],
  ['answerkey-data.js','GovJobUpdatesAnswerKeys','Answer Keys','HTML/answer-key.html'],
  ['results-data.js','GovJobUpdatesResults','Results','HTML/results.html']
];
for (const [file,globalName,group,fallback] of listingSources) {
  const sandbox=vm.createContext({window:{}});
  vm.runInContext(fs.readFileSync(path.join(root,'JS',file),'utf8'),sandbox,{timeout:2000});
  for(const row of sandbox.window[globalName] || []) {
    if(!row.title) continue;
    const link=new URL(row.detailPage || fallback,'https://govjobupdates.com/HTML/');
    const relative=decodeURIComponent(link.pathname).replace(/^\//,'');
    const url=link.origin==='https://govjobupdates.com' && fs.existsSync(path.join(root,relative)) ? link.pathname.slice(1)+link.search+link.hash : `${fallback}?q=${encodeURIComponent(row.title)}`;
    add({title:decode(row.title),url,category:group,description:decode(row.organization || row.description || '').slice(0,260),keywords:decode([row.department,row.category,row.qualification,...(Array.isArray(row.tags)?row.tags:[])].filter(Boolean).join(' '))});
  }
}
add({title:'My Dashboard and Performance Analysis',url:'HTML/dashboard.html',category:'Tools',description:'Sign in to review your quiz performance and preparation progress.',keywords:'accuracy score history analytics dashboard डैशबोर्ड'});
// Add published local quiz titles without reading their question banks.
const context = vm.createContext({window:{location:{href:'https://govjobupdates.com/'}},document:{currentScript:{src:'https://govjobupdates.com/JS/quiz-registry.js'}},URL,console});
vm.runInContext(fs.readFileSync(path.join(root,'JS/quiz-registry.js'),'utf8'), context, {timeout:2000});
for (const file of fs.readdirSync(path.join(root,'JS/quiz-registry-data')).filter(n=>n.endsWith('.js')).sort()) vm.runInContext(fs.readFileSync(path.join(root,'JS/quiz-registry-data',file),'utf8'),context,{timeout:2000});
for (const q of context.window.GJU_QUIZZES.quizzes) {
  if (!fs.existsSync(path.join(root,'JS',q.path))) continue;
  add({title:q.title,url:`HTML/quiz-attempt.html?quiz=${encodeURIComponent(q.id)}`,category:'Quizzes',description:decode(q.description).slice(0,260),keywords:[q.subject,...(q.tags||[])].join(' ')});
}
// Tool names and Hindi aliases lead to the document workspace.
const documents = records.get('HTML/documents.html|Tools');
if (documents) documents.keywords += ' photo signature image resizer image to pdf converter pdf compressor merger page manager दस्तावेज फोटो';
const output = {version:1,items:[...records.values()].sort((a,b)=>a.url.localeCompare(b.url))};
fs.mkdirSync(path.join(root,'data'),{recursive:true});
fs.writeFileSync(path.join(root,'data/site-search-index.json'),JSON.stringify(output)+'\n');
console.log(`Search index: ${output.items.length} public pages, tools and local quizzes.`);
