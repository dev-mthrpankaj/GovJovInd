const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync('JS/quiz-landing.js', 'utf8');
// Exercise the real feed and rendering functions without network or account writes.
function setup(payload) {
  const result = { innerHTML: '' };
  const selected = { classList: { add() {}, remove() {} }, setAttribute() {} };
  const document = {
    querySelector(s) {
      if (s === '#selectedQuizResults .quiz-family-feed') return result;
      if (s.startsWith('[data-subject-selector=') || s.startsWith('[data-exam-selector=')) return selected;
      return null;
    },
    querySelectorAll() { return []; },
    getElementById() { return null; }
  };
  const window = { GJU_QUIZ_INDEX: payload };
  const exposed = source.replace('if(!Object.values(familyLists).some(Boolean))return;',
    'window.inspect={load,selectSubject,selectExam,sourceItems,normalize,row,fail(){failed=true;refreshSelection()}};return;');
  vm.runInNewContext(exposed, { window, document, console });
  return { api: window.inspect, window, result };
}
const item = (quizSlug, extra = {}) => ({ quizSlug, title: quizSlug, subjectSlug: 'english',
  examFamilySlug: 'topic-wise', examSlug: 'english', durationMinutes: 15, totalQuestions: 25, ...extra });
test('topic-wise feed survives loading and uses examSlug for subject matching', () => {
  const x = setup([item('topic'), item('exam', { examFamilySlug: 'ssc' }),
    item('wrong-subject', { examSlug: 'maths' }), null]);
  x.api.load(); x.api.selectSubject('english', false);
  assert.match(x.result.innerHTML, /quiz=admin-english-topic/);
  assert.doesNotMatch(x.result.innerHTML, /quiz=admin-english-(exam|wrong-subject)/);
  assert.match(x.result.innerHTML, /href="english-quizzes.html"/);
  x.api.selectExam('ssc', false);
  assert.match(x.result.innerHTML, /quiz=admin-english-exam/);
  assert.doesNotMatch(x.result.innerHTML, /quiz=admin-english-topic/);
});
test('maths subject uses the topic-wise exam slug rather than mathematics subject slug', () => {
  const x = setup([item('arithmetic', { subjectSlug: 'mathematics', examSlug: 'maths' })]);
  x.api.load(); x.api.selectSubject('maths', false);
  assert.match(x.result.innerHTML, /quiz=admin-mathematics-arithmetic/);
});
test('empty successful feed is different from unavailable feed; late feed recovers', () => {
  const x = setup(undefined);
  assert.equal(x.api.load(), false); x.api.selectExam('ssc', false);
  assert.match(x.result.innerHTML, /Loading latest/);
  x.api.fail(); assert.match(x.result.innerHTML, /could not be loaded/);
  x.window.GJU_QUIZ_INDEX = [];
  assert.equal(x.api.load(), true);
  assert.match(x.result.innerHTML, /No published quizzes/);
  x.window.GJU_QUIZ_INDEX = [item('recovered', { examFamilySlug: 'ssc' })];
  x.api.load(); assert.match(x.result.innerHTML, /admin-english-recovered/);
});
test('latest five selection, railway alias and safe title rendering', () => {
  const x = setup(Array.from({length:7}, (_, i) => item('set-'+i, {
    examFamilySlug: 'railway', publishedAt: i+1,
    title: i===6 ? '<img src=x onerror="alert(1)">' : 'Set '+i
  })));
  x.api.load(); x.api.selectExam('rrb', false);
  assert.equal((x.result.innerHTML.match(/class="quiz-family-quiz-row"/g)||[]).length, 5);
  assert.match(x.result.innerHTML, /&lt;img/);
  assert.doesNotMatch(x.result.innerHTML, /<img src=x|quiz=admin-english-set-0|quiz=admin-english-set-1/);
});
