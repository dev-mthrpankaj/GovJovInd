const test = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const path = require('node:path');
function session() {
  let now = 61000;
  const app = { dataset: {}, classList: {toggle() {}} };
  const window = {GJU_TYPING_CONFIG: {}, location: {search: ''}, Intl};
  const context = vm.createContext({window, Intl, URLSearchParams, performance: {now: () => now},
    document: {getElementById: () => app, readyState: 'loading', addEventListener() {}}});
  const code = fs.readFileSync(path.join(__dirname, '../typing-test/typing-test.js'), 'utf8')
    .replace('  if (document.readyState === "loading") {',
      '  window.hooks = {state, dom, finishTest, togglePause, restartTest};\n  if (document.readyState === "loading") {');
  vm.runInContext(code, context);
  return {...window.hooks, window, advance: ms => {now += ms;}};
}
test('submitting while paused excludes all time spent paused', () => {
  const s = session();
  Object.assign(s.state, {status: 'running', startedAt: 1000, typed: 'hello', passage: 'hello world'});
  s.togglePause();
  s.advance(120000);
  s.finishTest();
  assert.equal(s.state.lastResult.timeTakenSeconds, 60);
  assert.equal(s.state.lastResult.netWPM, 1);
  assert.equal(s.state.lastResult.accuracy, 100);
});
test('restart protects an active or paused attempt when confirmation is declined', () => {
  for (const status of ['running', 'paused']) {
    const s = session();
    s.window.confirm = () => false;
    Object.assign(s.state, {status, typed: 'keep my work', passage: 'keep my work here'});
    s.restartTest();
    assert.equal(s.state.typed, 'keep my work');
    assert.equal(s.state.status, status);
  }
});
