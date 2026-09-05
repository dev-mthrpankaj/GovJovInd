const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.join(__dirname, '..', 'typing-test');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const levels = ['easy', 'medium', 'hard'];
const languages = ['english', 'hindi'];
function load(extra) {
  const ctx = vm.createContext({window: {}});
  for (const lang of languages) for (const level of levels) {
    vm.runInContext(read(`passage-data/${lang}/${level}.js`), ctx);
  }
  if (extra) vm.runInContext(read('passage-data/long-passages.js'), ctx);
  vm.runInContext(read('passages.js'), ctx);
  vm.runInContext(read('typing-config.js'), ctx);
  vm.runInContext(read('passage-data/long-passage-catalog.js'), ctx);
  return ctx.window;
}
const old = load(false);
const current = load(true);
const records = Object.values(current.GJU_TYPING_LONG_PASSAGES).flatMap(x => Object.values(x).flat());
test('36 complete passages, six per language and difficulty, with accurate catalog counts', () => {
  assert.equal(records.length, 36);
  for (const lang of languages) for (const level of levels) {
    const items = current.GJU_TYPING_LONG_PASSAGES[lang][level];
    assert.equal(items.length, 6);
    items.forEach((item, i) => {
      const words = item.text.trim().split(/\s+/).length;
      assert.ok(words >= 3900 && words <= 4250, item.id);
      assert.equal(item.words, words);
      assert.equal(current.GJU_TYPING_LONG_CATALOG[lang][level][i].words, words);
      assert.ok(!/[\u0000-\u0008\u000b\u000c\ufffd]/.test(item.text));
      assert.ok(!/Project Gutenberg|END OF THE|START OF THE/.test(item.text));
      assert.ok(lang !== 'hindi' || /[\u0900-\u097f]/.test(item.text));
    });
  }
});
test('all supported exam/language combinations get the new sets and preserve old indices', () => {
  let combinations = 0;
  for (const preset of current.GJU_TYPING_CONFIG.presets) for (const language of preset.languages) {
    combinations++;
    const pool = current.GJU_TYPING_PASSAGES[language][preset.passageCategory][preset.passageExam];
    const previous = old.GJU_TYPING_PASSAGES[language][preset.passageCategory][preset.passageExam];
    for (const level of levels) {
      assert.equal(pool[level].length, level === 'easy' ? 24 : 18, `${preset.id}/${language}/${level}`);
      assert.deepEqual(Array.from(pool[level].slice(0, previous[level].length)), Array.from(previous[level]));
      assert.deepEqual(Array.from(pool[level].slice(-6)), Array.from(current.GJU_TYPING_LONG_PASSAGES[language][level], x => x.text));
    }
  }
  assert.equal(combinations, 31);
  assert.deepEqual(Array.from(current.GJU_TYPING_CONFIG.presets.find(x => x.id === 'ssc-cgl-dest').languages), ['english']);
});
function grams(text) {
  const tokens = text.toLowerCase().replace(/[^\p{L}\p{M}\p{N}\s]/gu, ' ').split(/\s+/).filter(Boolean);
  const result = new Set();
  for (let i=0; i <= tokens.length-12; i++) result.add(tokens.slice(i,i+12).join(' '));
  return result;
}
test('new text is distinct from existing passages and from other new excerpts', () => {
  const previous = new Set();
  for (const lang of languages) for (const group of Object.values(old.GJU_TYPING_PASSAGES[lang])) {
    for (const pool of Object.values(group)) for (const level of levels) for (const text of pool[level]) previous.add(text);
  }
  const seen = new Set([...previous].flatMap(text => [...grams(text)]));
  const exact = new Set(previous);
  for (const item of records) {
    assert.ok(!exact.has(item.text), item.id);
    exact.add(item.text);
    const g = grams(item.text);
    const shared = [...g].filter(x => seen.has(x)).length / g.size;
    assert.ok(shared < 0.01, `${item.id}: ${shared} shared 12-word sequences`);
    for (const phrase of g) seen.add(phrase);
  }
});
test('every selection page loads the catalog before cards and app loads text before pools', () => {
  let count=0;
  for (const file of fs.readdirSync(root).filter(x => x.endsWith('.html'))) {
    const html=read(file);
    if (!html.includes('src="typing-exam-page.js')) continue;
    count++;
    assert.ok(html.indexOf('src="passage-data/long-passage-catalog.js') < html.indexOf('src="typing-exam-page.js'));
    assert.ok(html.includes('typing-exam-page.js?v=typing-long36-20260905'));
  }
  assert.equal(count,17);
  assert.ok(read('app.html').indexOf('src="passage-data/long-passages.js') < read('app.html').indexOf('src="passages.js'));
});
function renderer() {
  let builds=0, nodes=[];
  const panel={
    set innerHTML(html) {builds++; nodes=[...html.matchAll(/<span class="(gju-typing-char[^"]*)"/g)].map(m=>({className:m[1]}));},
    querySelectorAll(){return nodes;}
  };
  const window={GJU_TYPING_CONFIG:{},Intl,location:{search:''},requestAnimationFrame:()=>1,cancelAnimationFrame:()=>{}};
  const ctx=vm.createContext({window,Intl,URLSearchParams,document:{getElementById:()=>({dataset:{}}),readyState:'loading',addEventListener:()=>{}}});
  const code=read('typing-test.js').replace('  if (document.readyState === "loading") {','  window.testHooks={state,dom,renderPassage,splitTextUnits};\n  if (document.readyState === "loading") {');
  vm.runInContext(code,ctx);
  const hooks=window.testHooks;
  hooks.dom.passageText=panel;
  return {...hooks,get builds(){return builds;},get nodes(){return nodes;}};
}
test('renderer handles typing, errors, editing, backspace, reset and Hindi graphemes without rebuilding', () => {
  const r=renderer();
  for (const passage of ['ABC\nDEF', 'हिंदी भाषा\nक्षेत्र']) {
    r.state.passage=passage;
    const units=r.splitTextUnits(passage);
    r.state.typed='';r.renderPassage();
    const builds=r.builds;
    for(const typed of [units[0],units.slice(0,3).join(''),units[0]+'X',units[0],passage,'']) {
      r.state.typed=typed;r.renderPassage();
      const entered=r.splitTextUnits(typed);
      r.nodes.forEach((node,i)=>{
        assert.equal(node.className.includes('is-current'),i===entered.length);
        assert.equal(node.className.includes('is-correct'),i<entered.length&&entered[i]===units[i]);
        assert.equal(node.className.includes('is-incorrect'),i<entered.length&&entered[i]!==units[i]);
      });
      assert.equal(r.builds,builds);
    }
  }
});
test('real 4000-word passage builds DOM once across consecutive keystrokes',()=>{
  const r=renderer();r.state.passage=records[0].text;r.renderPassage();
  for(let n=1;n<=50;n++){r.state.typed=r.state.passage.slice(0,n);r.renderPassage();}
  assert.equal(r.builds,1);
  assert.equal(r.nodes.length,r.splitTextUnits(r.state.passage).length);
});
