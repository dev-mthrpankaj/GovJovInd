const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const root = path.join(__dirname, '../typing-test');
const context = vm.createContext({window: {}, document: {readyState: 'loading', addEventListener() {}}});
vm.runInContext(fs.readFileSync(path.join(root, 'passage-data/long-passage-catalog.js'), 'utf8'), context);
vm.runInContext(fs.readFileSync(path.join(root, 'typing-exam-page.js'), 'utf8').replace('    buildPage,', '    buildPage, bindLanguage,'), context);
const api = context.window.GJUTypingExamPage;
function node(dataset = {}) {
  return {dataset, hidden: false, attrs: {}, handlers: {}, classList: {toggle() {}},
    setAttribute(k,v) {this.attrs[k]=v;}, addEventListener(k,fn) {this.handlers[k]=fn;}, click() {this.handlers.click();}};
}
function selection(id, exam) {
  let sections=[];
  const levels=['easy','medium','hard'].map(level=>node({levelFilter:level}));
  const languages=exam.languages.map(language=>node({language}));
  const summary=node(), quick=node(), more=node();
  function append(html) {
    const difficulty=html.match(/data-difficulty="([^"]+)"/)[1];
    const cards=Array.from(html.matchAll(/class="gju-typing-passage-card"/g),()=>node());
    const section=node({difficulty});section.cards=cards;
    section.querySelectorAll=()=>cards;
    section.remove=()=>{sections=sections.filter(x=>x!==section);};
    sections.push(section);
  }
  const html=api.buildPage(id,exam);
  const sectionHtml=[...html.matchAll(/<section class="gju-typing-passage-level"[\s\S]*?<\/section>/g)].map(x=>x[0]);
  sectionHtml.forEach(append);
  const panel=node({presetId:id,language:exam.languages[0]});
  panel.querySelectorAll=()=>[...sections];panel.insertAdjacentHTML=(_,html)=>append(html);
  more.insertAdjacentHTML=(where,html)=>{assert.equal(where,'beforebegin');append(html);};
  const main={querySelectorAll(selector){return selector.includes('language-btn')?languages:selector.includes('data-level-filter')?levels:[];},
    querySelector(selector){return ({'.gju-typing-passage-panel':panel,'#typingShowMore':more,'#typingSelectionSummary':summary,'#typingQuickStart':quick})[selector] || null;}};
  api.bindLanguage(main);
  return {levels,languages,more,quick,summary,get sections(){return sections;}};
}
test('all 17 static pages contain the new controls and preserve valid practice routes',()=>{
 let pages=0,links=0;
 for(const file of fs.readdirSync(root).filter(x=>x.endsWith('.html'))){
  const html=fs.readFileSync(path.join(root,file),'utf8');const id=html.match(/data-typing-preset="([^"]+)"/)?.[1];if(!id)continue;
  pages++;const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(x=>x[1]);assert.equal(new Set(ids).size,ids.length,file);
  assert.match(html, /href="typing-landing\.css\?v=[^"]+"/);
  assert.equal([...html.matchAll(/data-level-filter=/g)].length,3);
  assert.equal([...html.matchAll(/class="gju-typing-passage-card"/g)].length,60);
  for(const link of html.matchAll(/href="(app.html\?[^" ]+)"/g)){
   const q=new URL(link[1].replaceAll('&amp;','&'),'https://example.test').searchParams;
   assert.equal(q.get('preset'),id);assert.ok(api.exams[id].languages.includes(q.get('language')));
   assert.ok(['easy','medium','hard'].includes(q.get('difficulty')));assert.ok(Number(q.get('passage'))>=0);links++;
  }
 }
 assert.equal(pages,17);assert.equal(links,1037);
});
test('difficulty, show-more and language changes preserve the selected route across every exam',()=>{
 for(const [id,exam] of Object.entries(api.exams)){
  const s=selection(id,exam);
  function visible(){return s.sections.filter(x=>!x.hidden);}
  assert.equal(visible().length,1);assert.equal(visible()[0].cards.filter(x=>!x.hidden).length,6);
  s.more.click();assert.equal(visible()[0].cards.filter(x=>!x.hidden).length,12);
  for(const language of s.languages){
   language.click();
   for(const level of s.levels){
    level.click();assert.equal(visible().length,1);
    assert.equal(visible()[0].dataset.difficulty,level.dataset.levelFilter);
    assert.equal(visible()[0].cards.filter(x=>!x.hidden).length,6);
    const q=new URL(s.quick.href,'https://example.test').searchParams;
    assert.equal(q.get('language'),language.dataset.language);assert.equal(q.get('difficulty'),level.dataset.levelFilter);
    for(let n=0;n<4;n++)if(!s.more.hidden)s.more.click();
    assert.equal(s.more.hidden,true);assert.ok(visible()[0].cards.every(x=>!x.hidden));
   }
  }
 }
});

test('page initialization preserves existing SEO content and binds controls without replacing main', () => {
  for (const [id, exam] of Object.entries(api.exams)) {
    const panel={dataset:{presetId:id,language:exam.languages[0]},querySelectorAll:()=>[]};
    const main={dataset:{typingPreset:id},classList:{add(){}},
      querySelector:selector=>selector==='.gju-typing-passage-panel'?panel:null,
      querySelectorAll:()=>[],
      set innerHTML(value){assert.fail('Existing page content must not be replaced');}};
    const sandbox=vm.createContext({window:{location:{href:'https://example.test/typing-test/'}},document:{readyState:'complete',querySelector:()=>main}});
    vm.runInContext(fs.readFileSync(path.join(root,'typing-exam-page.js'),'utf8'),sandbox);
  }
});

test('directory search, combined filters, empty state and reset work without remote scripts', () => {
  const input=node(),empty=node(),count=node(),reset=node();input.value='';input.focus=()=>{input.focused=true;};
  const cards=[['ssc','SSC CHSL'],['railway','RRB NTPC'],['general','Hindi Typing']].map(([category,title])=>{
    const card=node({typingCategory:category,typingName:title,typingEnhanced:'true'});card.textContent=title;return card;
  });
  const filters=['all','ssc','railway','general'].map(value=>{
    const button=node({typingFilter:value});button.classList.contains=()=>value==='all';return button;
  });
  const sandbox=vm.createContext({document:{getElementById:id=>({typingExamSearch:input,typingExamEmpty:empty,typingExamCount:count,typingResetFilters:reset})[id],querySelector:()=>null,
    querySelectorAll:selector=>selector==='.gju-typing-exam-card'?cards:filters}});
  vm.runInContext(fs.readFileSync(path.join(root,'typing-index.js'),'utf8'),sandbox);
  assert.equal(cards.filter(card=>!card.hidden).length,3);
  filters[1].click();assert.equal(cards.filter(card=>!card.hidden).length,1);
  input.value='ntpc';input.handlers.input();assert.equal(empty.hidden,false);assert.equal(reset.hidden,false);
  reset.click();assert.equal(cards.filter(card=>!card.hidden).length,3);assert.equal(input.focused,true);
  input.value=' HINDI ';input.handlers.input();assert.equal(cards.filter(card=>!card.hidden)[0],cards[2]);
});
