const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync('JS/quizzes.js', 'utf8');
// Run production state transitions and summary rendering without account writes.
function setup(statuses = ['not-answered', ...Array(24).fill('not-visited')]) {
  function extract(name) {
    const start = source.indexOf(`    function ${name}(`);
    assert.ok(start >= 0, name);
    const end = source.indexOf('\n    function ', start + 1);
    return source.slice(start, end < 0 ? undefined : end);
  }
  const state = { statuses: [...statuses], answers: statuses.map(() => null),
    questions: statuses.map(() => ({ options: ['A', 'B', 'C', 'D'] })),
    current: 0, remainingSeconds: 342, statusCounts: null };
  const elements = { answeredCount: { textContent: '' }, paletteSummary: { innerHTML: '' },
    submitSummary: { innerHTML: '' }, submitModal: { classList: { remove() {} } } };
  const context = vm.createContext({ state, elements,
    setText(el, text) { el.textContent = text; }, formatTime() { return '05:42'; },
    closePalette() {}, syncModalState() {}, persistUnfinished() {},
    syncQuestionState() {}, renderPalette() {}, renderQuestion() {} });
  const names = ['countStatuses', 'getStatusCounts', 'setQuestionStatus', 'selectOption',
    'clearResponse', 'markForReview', 'goQuestion', 'updateAnsweredCount',
    'openSubmitModal', 'renderPaletteSummary'];
  vm.runInContext(names.map(extract).join('\n') + '\nstate.statusCounts = countStatuses(state.statuses);', context);
  return { state, elements, run(code) { return vm.runInContext(code, context); } };
}
function counts(x, expected) {
  assert.deepEqual(JSON.parse(JSON.stringify(x.state.statusCounts)), expected);
  assert.equal(Object.values(x.state.statusCounts).reduce((a, b) => a + b, 0), x.state.questions.length);
}
test('25 questions, 21 answered: submit and palette report four remaining', () => {
  const x = setup();
  x.run('for(let i=0;i<21;i++){goQuestion(i);selectOption(0);} openSubmitModal(); renderPaletteSummary();');
  counts(x, { answered: 21, notAnswered: 0, marked: 0, answeredMarked: 0, notVisited: 4 });
  assert.equal(x.elements.answeredCount.textContent, '21');
  assert.match(x.elements.submitSummary.innerHTML, /Answered<\/small>21/);
  assert.match(x.elements.submitSummary.innerHTML, /Not Visited<\/small>4/);
  assert.match(x.elements.paletteSummary.innerHTML, /Not Visited<\/span><strong>4/);
  x.run('goQuestion(21); openSubmitModal();');
  counts(x, { answered: 21, notAnswered: 1, marked: 0, answeredMarked: 0, notVisited: 3 });
});
test('marked answers remain attempted; clear, unmark and deselect update counters', () => {
  const x = setup();
  x.run('selectOption(0); markForReview(); openSubmitModal();');
  counts(x, { answered: 0, notAnswered: 0, marked: 0, answeredMarked: 1, notVisited: 24 });
  assert.equal(x.elements.answeredCount.textContent, '1');
  assert.match(x.elements.submitSummary.innerHTML, /Answered<\/small>1/);
  assert.match(x.elements.submitSummary.innerHTML, /Marked<\/small>1/);
  x.run('clearResponse();');
  counts(x, { answered: 0, notAnswered: 0, marked: 1, answeredMarked: 0, notVisited: 24 });
  assert.equal(x.state.answers[0], null);
  x.run('markForReview(); selectOption(0); selectOption(0);');
  counts(x, { answered: 0, notAnswered: 1, marked: 0, answeredMarked: 0, notVisited: 24 });
});
test('resumed mixed statuses and missing cache are updated without double counting', () => {
  const x = setup(['answered', 'answered-marked', 'marked', 'not-answered', 'not-visited']);
  x.state.answers = [0, 1, null, null, null];
  x.run('goQuestion(1); markForReview(); goQuestion(2); selectOption(0);');
  counts(x, { answered: 2, notAnswered: 1, marked: 0, answeredMarked: 1, notVisited: 1 });
  x.run('state.statusCounts=null; goQuestion(4); selectOption(0);');
  counts(x, { answered: 3, notAnswered: 1, marked: 0, answeredMarked: 1, notVisited: 0 });
});
test('all status transitions preserve mutually exclusive counts; same status is a no-op', () => {
  const statuses = ['answered', 'answered-marked', 'marked', 'not-answered', 'not-visited'];
  const keys = ['answered', 'answeredMarked', 'marked', 'notAnswered', 'notVisited'];
  for (const previous of statuses) for (let i=0; i<statuses.length; i++) {
    const x = setup([previous]);
    x.run(`setQuestionStatus(0, '${statuses[i]}'); setQuestionStatus(0, '${statuses[i]}');`);
    counts(x, Object.fromEntries(keys.map((key,j) => [key, Number(i===j)])));
  }
});
