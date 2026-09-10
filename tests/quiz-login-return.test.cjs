const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const quiz = fs.readFileSync('JS/quizzes.js', 'utf8');
const auth = fs.readFileSync('JS/firebase-auth.js', 'utf8');
const controller = fs.readFileSync('JS/quiz-attempt-controller.js', 'utf8');
function extract(source, name) {
  const match = new RegExp('    (?:async )?function '+name+'\\(').exec(source);
  assert.ok(match, name);
  const end = source.indexOf('\n    function ', match.index + 1);
  return source.slice(match.index, end < 0 ? undefined : end);
}
function authFunction(name) { return auth.split('\n').find(line => line.includes('function '+name+'(')); }
function loginUrl(search, id) {
  const window = { location: { search }, alert() {} };
  vm.runInNewContext(extract(quiz, 'redirectToLogin') + '\nredirectToLogin(id);', { window, URLSearchParams, id });
  return window.location.href;
}
test('selected quiz and family/subject survive login URL encoding, without unrelated parameters', () => {
  const id = 'admin-english-set & 2';
  const url = loginUrl('?family=topic-wise&subject=english&quiz=old&redirect=https://evil.test', id);
  const target = new URLSearchParams(url.split('?')[1]).get('redirect');
  const params = new URLSearchParams(target.split('?')[1]);
  assert.ok(target.startsWith('quiz-attempt.html?'));
  assert.equal(params.get('quiz'), id);
  assert.equal(params.get('family'), 'topic-wise');
  assert.equal(params.get('subject'), 'english');
  assert.equal(params.get('ready'), '1');
  assert.equal(params.has('redirect'), false);
});
test('verified login completion returns to quiz; normal login keeps dashboard; unsafe targets rejected', async () => {
  for (const target of ['quiz-attempt.html?quiz=admin-gk-set-1&family=ssc&ready=1', '', 'https://evil.test', '//evil.test', '../evil.html', 'javascript:alert(1)']) {
    let destination;
    const window = { location: { search: target ? '?redirect='+encodeURIComponent(target) : '' } };
    const context = vm.createContext({ window, URLSearchParams, isVerifiedUser: u => u.emailVerified,
      rememberSession() {}, syncHeader() {}, markAuthReady() {}, async syncMySqlAccount() {},
      go(path) { destination=path; } });
    vm.runInContext(authFunction('redirectTarget')+'\n'+authFunction('completeVerifiedLogin'), context);
    await vm.runInContext('completeVerifiedLogin({emailVerified:true})', context);
    assert.equal(destination, target.startsWith('quiz-attempt.html') ? target : 'dashboard.html');
    destination = undefined;
    await assert.rejects(vm.runInContext('completeVerifiedLogin({emailVerified:false})', context), /verification/);
    assert.equal(destination, undefined);
  }
});
test('signup OTP and Google login share the verified-login return path', () => {
  assert.match(auth, /await completeVerifiedLogin\(auth.currentUser,extra,true\)/);
  assert.match(authFunction('completeGoogleLogin'), /completeVerifiedLogin\(user,/);
  assert.doesNotMatch(auth, /Email verified successfully\. Opening your dashboard/);
});
function controllerSetup(search) {
  const nodes = Object.fromEntries(['[data-loading-title]', '[data-loading-message]', '[data-attempt-start]', '[data-attempt-exit]', '[data-attempt-retry]', '.attempt-loading-spinner'].map(key => [key, { hidden: true }]));
  const view = { classList: { remove() {}, toggle() {} }, querySelector: key => nodes[key] };
  let starts=0, cleared=0;
  const clicks=[];
  const document = { readyState: 'loading', addEventListener(name, callback) { if(name==='click')clicks.push(callback); },
    getElementById(id) { return id==='loadingView' ? view : null; },
    createElement() { return { dataset: {}, setAttribute() {}, click() { starts++; }, remove() {} }; },
    body: { appendChild() {} } };
  const window = { location: { search }, clearTimeout() { cleared++; }, setTimeout() { return 1; }, GJU_QUIZZES: { getQuizById() { return {title: 'Selected Quiz'}; } } };
  vm.runInNewContext(controller.replace('    if (document.readyState === "loading")', '    window.inspect = {resolveAndStart};\n    if (document.readyState === "loading")'), { window, document, URLSearchParams });
  return { nodes, window, starts: () => starts, cleared: () => cleared,
    clickStart() { const target={hasAttribute: key=>key==='data-attempt-start', matches:()=>false}; clicks[0]({ target: {closest:()=>target}, preventDefault() {} }); } };
}
test('authentication return waits for explicit start, survives repeat feed events and prevents double starts', () => {
  const x=controllerSetup('?quiz=selected&ready=1&family=ssc');
  x.window.inspect.resolveAndStart();
  x.window.inspect.resolveAndStart();
  assert.equal(x.starts(),0);
  assert.equal(x.nodes['[data-attempt-start]'].hidden,false);
  assert.equal(x.nodes['.attempt-loading-spinner'].hidden,true);
  assert.equal(x.nodes['[data-loading-title]'].textContent,'Selected Quiz');
  assert.ok(x.cleared()>0);
  x.clickStart(); x.clickStart(); x.window.inspect.resolveAndStart();
  assert.equal(x.starts(),1);
  assert.equal(x.nodes['[data-attempt-start]'].hidden,true);
});
test('existing direct attempt entry still starts normally', () => {
  const x=controllerSetup('?quiz=selected');
  x.window.inspect.resolveAndStart(); x.window.inspect.resolveAndStart();
  assert.equal(x.starts(),1);
});
test('legacy initial route cannot bypass the post-login ready screen', () => {
  for(const ready of ['', '&ready=1']) {
    let starts=0;
    const context = { window:{location:{search:'?quiz=selected'+ready}}, URLSearchParams,
      registry:{getQuizById:()=>({subject:'English'})}, setSubject(){}, getSubjects:()=>[],
      ensureSubjectSelected(){}, renderHome(){}, showView(){}, startQuiz(){starts++;} };
    vm.runInNewContext(extract(quiz,'openInitialRoute')+'\nopenInitialRoute();',context);
    assert.equal(starts,ready?0:1);
  }
});
