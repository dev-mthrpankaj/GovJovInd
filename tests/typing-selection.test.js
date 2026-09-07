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
  assert.ok(html.includes('typing-landing.css?v=20260907'));
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
