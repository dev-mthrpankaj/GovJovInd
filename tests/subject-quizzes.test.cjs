const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const code=fs.readFileSync('JS/subject-quizzes.js','utf8');
// Minimal DOM adapter: exercise feed and filter behavior without external services.
function setup(payload){
 const handlers={},timers=[],nodes={};
 function node(){return {innerHTML:'',textContent:'',value:'',hidden:false,disabled:false,dataset:{},attrs:{},listeners:{},setAttribute(k,v){this.attrs[k]=v},addEventListener(k,v){this.listeners[k]=v},querySelectorAll(){return []},focus(){}}}
 for(const name of ['page','list','count','empty','select','grid','label','search','countLabel'])nodes[name]=node();
 nodes.page.dataset={examSlug:'english',subjectName:'English'};
 const selectors={'[data-subject-quiz-page]':'page','[data-subject-quiz-list]':'list','[data-subject-quiz-count]':'count','[data-subject-quiz-empty]':'empty','[data-subject-topic-select]':'select','[data-subject-topic-grid]':'grid','[data-active-topic-label]':'label','[data-subject-search]':'search','[data-subject-count-label]':'countLabel'};
 const window={GJU_QUIZ_INDEX:payload,setTimeout(fn){timers.push(fn)},location:{reload(){}}};
 const document={querySelector(s){return nodes[selectors[s]]||null},addEventListener(k,fn){handlers[k]=fn}};
 vm.runInNewContext(code,{window,document,console});return {nodes,window,handlers,timers};
}
const item=(slug,title,topic='grammar',extra={})=>({quizSlug:slug,title,subjectSlug:'english',examFamilySlug:'topic-wise',examSlug:'english',totalQuestions:10,durationMinutes:5,topics:[{slug:topic,name:topic}],...extra});
test('only matching subject/topic-wise records render; attempt IDs remain compatible',()=>{
 const {nodes:n}=setup([item('one','Grammar one'),item('two','Maths','arithmetic',{examSlug:'maths'}),item('three','SSC English','grammar',{examFamilySlug:'ssc'}),null]);
 assert.equal(n.count.textContent,'1');assert.match(n.list.innerHTML,/quiz=admin-english-one/);assert.doesNotMatch(n.list.innerHTML,/SSC English|Maths/);assert.equal(n.list.attrs['aria-busy'],'false');
});
test('topic filter and title search combine and reset',()=>{
 const {nodes:n}=setup([item('one','Sentence improvement'),item('two','Word meanings','vocabulary')]);
 n.select.value='vocabulary';n.select.listeners.change();assert.equal(n.count.textContent,'1');assert.match(n.list.innerHTML,/Word meanings/);
 n.search.value='sentence';n.search.listeners.input();assert.equal(n.count.textContent,'0');assert.match(n.empty.innerHTML,/Clear filters/);
 n.search.value='';n.select.value='all';n.select.listeners.change();assert.equal(n.count.textContent,'2');
});
test('empty feed finishes loading with helpful next step',()=>{const {nodes:n}=setup([]);assert.equal(n.count.textContent,'0');assert.equal(n.grid.hidden,true);assert.equal(n.empty.hidden,false);assert.match(n.empty.innerHTML,/quiz.html#examQuizFamilies/)});
test('missing feed times out, then late feed event recovers',()=>{const x=setup(undefined);x.timers.forEach(f=>f());assert.match(x.nodes.empty.innerHTML,/could not load/);x.window.GJU_QUIZ_INDEX=[item('one','Grammar')];x.handlers['gju:admin-quiz-index-ready']();assert.equal(x.nodes.count.textContent,'1');assert.equal(x.nodes.empty.hidden,true)});
test('feed strings are escaped in text and attribute contexts',()=>{const {nodes:n}=setup([item('one','<img src=x onerror="alert(1)">')]);assert.doesNotMatch(n.list.innerHTML,/<img/);assert.match(n.list.innerHTML,/&lt;img/);assert.match(n.list.innerHTML,/&quot;/)});
test('topic buttons expose pressed state and real counts',()=>{const {nodes:n}=setup([item('one','First'),item('two','Second')]);assert.match(n.grid.innerHTML,/aria-pressed="true"/);assert.match(n.grid.innerHTML,/2 quizzes/);assert.equal(n.grid.hidden,false)});
