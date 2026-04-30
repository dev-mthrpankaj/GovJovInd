const sections = {
  home: document.getElementById('subjects-section'),
  config: document.getElementById('config-section'),
  quiz: document.getElementById('quiz-section'),
  result: document.getElementById('results-section'),
  review: document.getElementById('review-section')
};

const state = {
  subject: '', config: {}, questions: [], index: 0, answers: [], marked: [], timer: null,
  totalSeconds: 0, elapsedSeconds: 0, startedAt: null, completedAt: null
};

const SUBJECTS = ['Mathematics','English','Reasoning','General Awareness','Science','Hindi','Computer'];

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  document.querySelectorAll('.subject-card').forEach(card => card.addEventListener('click', () => openConfig(card.dataset.subject)));
  document.getElementById('question-count').addEventListener('input', e => document.getElementById('count-value').textContent = e.target.value);
  document.getElementById('back-to-subjects').addEventListener('click', () => showOnly('home'));
  document.getElementById('start-quiz-btn').addEventListener('click', startQuiz);
  document.getElementById('prev-btn').addEventListener('click', () => move(-1));
  document.getElementById('next-btn').addEventListener('click', () => move(1));
  document.getElementById('skip-btn').addEventListener('click', () => move(1));
  document.getElementById('mark-review').addEventListener('click', toggleMark);
  document.getElementById('submit-quiz').addEventListener('click', () => confirm('Submit quiz now?') && finishQuiz());
  document.getElementById('new-quiz').addEventListener('click', resetFlow);
  document.getElementById('review-answers').addEventListener('click', showReview);
  document.getElementById('restart-quiz').addEventListener('click', startQuiz);
  document.getElementById('back-to-results').addEventListener('click', () => showOnly('result'));
  document.querySelectorAll('.review-filter').forEach(btn => btn.addEventListener('click', () => renderReview(btn.dataset.filter)));
  renderRecentAttempts();
});

function initNav() {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('nav ul');
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('show');
    toggle.setAttribute('aria-expanded', String(open));
  });
}

function openConfig(subject) {
  state.subject = subject;
  document.getElementById('config-subject').textContent = subject;
  const questions = window.quizQuestionBank.filter(q => q.subject === subject);
  const topics = [...new Set(questions.map(q => q.topic))];
  const t = document.getElementById('topics-container');
  t.innerHTML = topics.map((topic, i) => `<label class="topic-pill"><input type="checkbox" value="${topic}" ${i < 4 ? 'checked' : ''}> ${topic}</label>`).join('');
  showOnly('config');
}

function startQuiz() {
    const topics = [...document.querySelectorAll('#topics-container input:checked')].map(x => x.value);
  if (!topics.length) return alert('Select at least one topic.');
  state.config = {
    difficulty: document.getElementById('difficulty').value,
    count: Number(document.getElementById('question-count').value),
    tpp: Number(document.getElementById('time-per-question').value), topics
  };
  let pool = window.quizQuestionBank.filter(q => q.subject === state.subject && topics.includes(q.topic));
  if (state.config.difficulty !== 'mixed') pool = pool.filter(q => q.difficulty === state.config.difficulty);
  if (!pool.length) return alert('No questions found for selected filters.');
  state.questions = shuffle([...new Map(pool.map(q => [q.id, q])).values()]).slice(0, Math.min(state.config.count, pool.length));
  state.index = 0;
  state.answers = new Array(state.questions.length).fill(null);
  state.marked = new Array(state.questions.length).fill(false);
  state.elapsedSeconds = 0;
  state.totalSeconds = state.config.tpp * state.questions.length;
  state.startedAt = Date.now();
  document.getElementById('quiz-subject').textContent = state.subject;
  document.getElementById('quiz-difficulty').textContent = state.config.difficulty;
  renderPalette();
  showOnly('quiz');
  renderQuestion();
  startTimer();
}

function renderQuestion() {
  const q = state.questions[state.index];
  document.getElementById('question-text').textContent = q.question;
  document.getElementById('current-question').textContent = state.index + 1;
  document.getElementById('total-questions').textContent = state.questions.length;
  document.getElementById('progress-bar').style.width = `${((state.index + 1) / state.questions.length) * 100}%`;
  const box = document.querySelector('.options');
  box.innerHTML = q.options.map((opt, i) => `<button class="option ${state.answers[state.index]===i?'selected':''}" data-i="${i}">${opt}</button>`).join('');
  box.querySelectorAll('.option').forEach(btn => btn.addEventListener('click', () => { state.answers[state.index] = Number(btn.dataset.i); renderQuestion(); renderPalette(); }));
  document.getElementById('prev-btn').disabled = state.index === 0;
  document.getElementById('mark-review').classList.toggle('marked', state.marked[state.index]);
}

function move(step) { state.index = Math.max(0, Math.min(state.questions.length - 1, state.index + step)); renderQuestion(); }
function toggleMark() { state.marked[state.index] = !state.marked[state.index]; renderQuestion(); renderPalette(); }

function renderPalette() {
  const p = document.getElementById('question-palette');
  p.innerHTML = state.questions.map((_, i) => {
    const cls = i===state.index?'current': state.marked[i]?'marked': state.answers[i]!==null?'attempted':'unattempted';
    return `<button class="palette-btn ${cls}" data-i="${i}">${i+1}</button>`;
  }).join('');
  p.querySelectorAll('button').forEach(btn => btn.onclick = () => { state.index = Number(btn.dataset.i); renderQuestion(); });
}

function startTimer() {
    clearInterval(state.timer);
  const el = document.getElementById('timer');
  if (!state.totalSeconds) { el.textContent = 'No limit'; return; }
  state.timer = setInterval(() => {
    state.elapsedSeconds++;
    const left = state.totalSeconds - state.elapsedSeconds;
    if (left <= 0) return finishQuiz();
    el.textContent = fmt(left);
  }, 1000);
}

function finishQuiz() {
     clearInterval(state.timer);
  state.completedAt = Date.now();
  const total = state.questions.length;
  let correct = 0, attempted = 0;
  state.questions.forEach((q, i) => { if (state.answers[i] !== null) { attempted++; if (state.answers[i] === q.correctAnswer) correct++; }});
  const incorrect = attempted - correct;
  const unattempted = total - attempted;
  const accuracy = attempted ? Math.round(correct / attempted * 100) : 0;
  const score = Math.round(correct / total * 100);
  document.getElementById('score-percent').textContent = `${score}%`;
  document.getElementById('score-fraction').textContent = `${correct}/${total}`;
  document.getElementById('result-total').textContent = total;
  document.getElementById('result-attempted').textContent = attempted;
  document.getElementById('result-unattempted').textContent = unattempted;
  document.getElementById('result-correct').textContent = correct;
  document.getElementById('result-incorrect').textContent = incorrect;
  document.getElementById('result-accuracy').textContent = `${accuracy}%`;
  document.getElementById('result-subject').textContent = state.subject;
  document.getElementById('result-difficulty').textContent = state.config.difficulty;
  const timeTaken = Math.floor((state.completedAt - state.startedAt)/1000);
  document.getElementById('result-time').textContent = fmt(timeTaken);
  document.getElementById('score-message').textContent = score >= 80 ? 'Excellent performance!' : score >= 55 ? 'Good effort, keep practicing.' : 'Practice more to improve speed and accuracy.';
  saveAttempt({ dateTime:new Date().toISOString(), subject:state.subject, score, totalQuestions:total, accuracy, timeTaken:fmt(timeTaken) });
  renderRecentAttempts();
  showOnly('result');
}

function showReview(){ showOnly('review'); renderReview('all'); }
function renderReview(filter){
  const wrap = document.getElementById('review-list');
  wrap.innerHTML='';
  state.questions.forEach((q,i)=>{
    const ans = state.answers[i];
    const status = ans===null?'unattempted': ans===q.correctAnswer?'correct':'wrong';
    if(filter!=='all' && filter!=='marked' && status!==filter) return;
    if(filter==='marked' && !state.marked[i]) return;
    wrap.insertAdjacentHTML('beforeend', `<article class="review-card"><h4>Q${i+1}. ${q.question}</h4><p>Status: <strong>${status}</strong></p><p>Your answer: ${ans===null?'Not Attempted':q.options[ans]}</p><p>Correct answer: ${q.options[q.correctAnswer]}</p><p>${q.explanation}</p></article>`);
  });
}

function saveAttempt(entry){
  const arr = JSON.parse(localStorage.getItem('quizHistory')||'[]');
  arr.unshift(entry);
  localStorage.setItem('quizHistory', JSON.stringify(arr.slice(0,10)));
}
function renderRecentAttempts(){
  const el = document.getElementById('recent-attempts');
  const arr = JSON.parse(localStorage.getItem('quizHistory')||'[]');
  el.innerHTML = arr.length ? arr.map(a=>`<li><strong>${a.subject}</strong> - ${a.score}% (${a.totalQuestions}Q) · Acc ${a.accuracy}% · ${new Date(a.dateTime).toLocaleString()}</li>`).join('') : '<li>No attempts yet. Start your first quiz now.</li>';
}

function resetFlow(){ clearInterval(state.timer); showOnly('home'); }
function showOnly(key){ Object.entries(sections).forEach(([k,v]) => v.classList.toggle('hidden', k!==key)); window.scrollTo({top:0, behavior:'smooth'}); }
function shuffle(a){ for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]];} return a; }
function fmt(sec){ const m=String(Math.floor(sec/60)).padStart(2,'0'); const s=String(sec%60).padStart(2,'0'); return `${m}:${s}`; }