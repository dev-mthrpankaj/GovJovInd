const test = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const path = require('node:path');
function session() {
  let now = 1000;
  const app = { dataset: {}, classList: {toggle() {}}, scrollIntoView(){} };
  const window = {GJU_TYPING_CONFIG: {}, location: {search: ''}, Intl};
  const context = vm.createContext({window, Intl, URLSearchParams, performance: {now: () => now},
    document: {getElementById: () => app, readyState: 'loading', addEventListener() {}}});
  vm.runInContext(fs.readFileSync(path.join(__dirname,'../typing-test/typing-evaluators.js'),'utf8'),context);
  const code = fs.readFileSync(path.join(__dirname, '../typing-test/typing-test.js'), 'utf8')
    .replace('  if (document.readyState === "loading") {',
      '  window.hooks = {state, dom, finishTest, restartTest, handleTypingInput, tick, calculateResult, startClock, getElapsedMs};\n  if (document.readyState === "loading") {');
  vm.runInContext(code, context);
  const s=window.hooks;
  s.dom.typingInput={value:'',focus(){},setSelectionRange(){}};
  Object.assign(s.state,{status:'ready',passage:'hello world',preset:{evaluationType:'general'}});
  return {...s, window, advance: ms => {now += ms;}};
}
test('uninterrupted clock runs until full duration; restart declined preserves input', () => {
  const s=session();s.dom.typingInput.value='hello';s.handleTypingInput();s.advance(60000);
  s.window.confirm=()=>false;s.restartTest();assert.equal(s.state.typed,'hello');
  s.advance(120000);s.finishTest();assert.equal(s.state.lastResult.timeTakenSeconds,180);
});
test('deadline rejects newly arriving text and auto-finishes only once', () => {
  const s=session();s.state.durationMinutes=1;
  s.dom.typingInput.value='hello';s.handleTypingInput();s.advance(61000);
  s.dom.typingInput.value='hello world';s.handleTypingInput();
  assert.equal(s.state.lastResult.totalTypedCharacters,5);
  assert.equal(s.state.lastResult.timeTakenSeconds,60);
  const id=s.state.lastResult.id;s.tick();s.finishTest();assert.equal(s.state.lastResult.id,id);
});
test('clearing all text does not resurrect a previous response', () => {
  const s=session();s.dom.typingInput.value='hello';s.handleTypingInput();s.advance(1000);
  s.dom.typingInput.value='';s.handleTypingInput();s.finishTest();
  assert.equal(s.state.lastResult.totalTypedCharacters,0);assert.equal(s.state.lastResult.netWPM,0);
});
test('IME provisional input is ignored and deadline saves only committed text', () => {
  const s=session();s.state.language='hindi';s.state.passage='भारत महान है';
  s.state.composing=true;s.dom.typingInput.value='भ';s.handleTypingInput();assert.equal(s.state.status,'ready');
  s.state.composing=false;s.dom.typingInput.value='भारत';s.handleTypingInput();assert.equal(s.state.status,'running');
  s.advance(600000);s.state.composing=true;s.dom.typingInput.value='भारत महान';s.tick();
  assert.equal(s.state.typed,'भारत');assert.equal(s.state.lastResult.accuracy,100);
});
test('RRB repeat retains transcript and timer without duplicating visible passage', () => {
  const s=session();s.state.preset={evaluationType:'rrb',repeatPassage:true,editingAllowed:false};
  s.state.passage='hello';s.dom.typingInput.value='hello';s.handleTypingInput();
  assert.equal(s.state.status,'running');assert.equal(s.state.passage,'hello');
  assert.equal(s.state.passageRounds,1);assert.equal(s.state.typed,'');
  s.advance(60000);s.dom.typingInput.value='he';s.handleTypingInput();
  s.dom.typingInput.value='h';s.handleTypingInput();assert.equal(s.state.typed,'he');
  s.finishTest();assert.equal(s.state.lastResult.accuracy,100);assert.equal(s.state.lastResult.typedWords,2);
});
test('general scorer regression covers punctuation, spacing, omissions and Unicode', () => {
  for(const [reference,typed,chars,errors] of [['hello world','hello',5,0],['abc','axc',3,1],['abc','ac',2,1],['a b','a  b',4,2],['a\nb','a b',3,1],['हिंदी पाठ','हिंदी',2,0],['a!','a?',2,1]]){
    const s=session();Object.assign(s.state,{passage:reference,typed,status:'running',startedAt:1000});s.advance(60000);
    const r=s.calculateResult();assert.equal(r.totalTypedCharacters,chars,typed);assert.equal(r.errors,errors,typed);
    assert.equal(r.netWPM,Math.round((chars-errors)/5*10)/10,typed);
  }
});
