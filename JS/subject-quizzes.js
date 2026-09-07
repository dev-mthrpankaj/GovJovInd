(function(){
"use strict";

const page=document.querySelector('[data-subject-quiz-page]');
if(!page)return;

const subjectSlug=String(page.dataset.subjectSlug||"").trim().toLowerCase();
const list=document.querySelector('[data-subject-quiz-list]');
const count=document.querySelector('[data-subject-quiz-count]');
const empty=document.querySelector('[data-subject-quiz-empty]');
const filterButtons=[...document.querySelectorAll('[data-subject-family-filter]')];
if(!subjectSlug||!list)return;

const familyAliases={railway:"rrb",rrb:"rrb",ssc:"ssc",banking:"banking",police:"police"};
let activeFamily="all";
let allItems=[];
let loaded=false;

function esc(value){
 return String(value==null?"":value)
  .replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")
  .replace(/\"/g,"&quot;").replace(/'/g,"&#039;");
}
function slugify(value){
 return String(value||"").trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");
}
function sourceItems(){
 for(const source of[window.GJU_QUIZ_INDEX,window.GJU_ADMIN_QUIZ_INDEX,window.GJU_PUBLISHED_QUIZ_INDEX]){
  if(Array.isArray(source))return source;
  if(source&&Array.isArray(source.quizzes))return source.quizzes;
  if(source&&Array.isArray(source.items))return source.items;
  if(source&&Array.isArray(source.data))return source.data;
 }
 return [];
}
function getSubjectSlug(item){
 return slugify(item.subjectSlug||item.subject_slug||(item.subject&&item.subject.slug)||item.subject||"");
}
function getFamily(item){
 const raw=String(item.examFamilySlug||item.exam_family_slug||(item.examFamily&&item.examFamily.slug)||(item.exam_family&&item.exam_family.slug)||"").trim().toLowerCase();
 return familyAliases[raw]||raw;
}
function dateValue(item,index){
 for(const value of[item.publishedAt,item.published_at,item.updatedAt,item.updated_at,item.createdAt,item.created_at]){
  if(value==null||value==="")continue;
  const numeric=Number(value);
  if(Number.isFinite(numeric)&&numeric>0)return numeric;
  const parsed=Date.parse(value);
  if(Number.isFinite(parsed))return parsed;
 }
 return index;
}
function normalize(item,index){
 const ss=getSubjectSlug(item);
 const qs=slugify(item.quizSlug||item.quiz_slug||item.slug||item.id||item.title||"quiz")||"quiz";
 const family=getFamily(item);
 const examName=String(item.examName||item.exam_name||(item.exam&&item.exam.name)||"").trim();
 return{
  id:`admin-${ss}-${qs}`.replace(/-+/g,"-"),
  title:String(item.title||item.quizTitle||item.quiz_title||qs).trim(),
  subjectSlug:ss,
  family,
  examName,
  duration:Number(item.durationMinutes||item.duration_minutes)||30,
  questions:Number(item.totalQuestions||item.total_questions||item.activeQuestions||item.active_questions)||0,
  order:dateValue(item,index)
 };
}
function familyLabel(slug){
 return {ssc:"SSC",banking:"Banking",police:"Police",rrb:"RRB Railway"}[slug]||"Competitive Exam";
}
function card(item){
 const href=`quiz-attempt.html?quiz=${encodeURIComponent(item.id)}&family=${encodeURIComponent(item.family)}`;
 const exam=item.examName||familyLabel(item.family);
 return `<article class="subject-quiz-card"><div class="subject-quiz-card-top"><span class="subject-quiz-family">${esc(familyLabel(item.family))}</span><span class="subject-quiz-exam">${esc(exam)}</span></div><h3>${esc(item.title)}</h3><div class="subject-quiz-meta"><span><i class="far fa-circle-question" aria-hidden="true"></i>${item.questions?item.questions+" Questions":"Practice Set"}</span><span><i class="far fa-clock" aria-hidden="true"></i>${item.duration} Min</span><span><i class="fas fa-indian-rupee-sign" aria-hidden="true"></i>Free</span></div><a class="subject-quiz-start" href="${href}" aria-label="Start ${esc(item.title)}">Start Quiz <i class="fas fa-arrow-right" aria-hidden="true"></i></a></article>`;
}
function render(){
 const visible=allItems.filter(item=>activeFamily==="all"||item.family===activeFamily);
 list.innerHTML=visible.map(card).join("");
 if(count)count.textContent=String(visible.length);
 if(empty)empty.hidden=visible.length!==0;
 list.hidden=visible.length===0;
}
function load(){
 const raw=sourceItems();
 if(!raw.length)return false;
 allItems=raw.map(normalize).filter(item=>item.subjectSlug===subjectSlug&&["ssc","banking","police","rrb"].includes(item.family)).sort((a,b)=>b.order-a.order);
 render();
 loaded=true;
 return true;
}
filterButtons.forEach(button=>button.addEventListener("click",()=>{
 activeFamily=String(button.dataset.subjectFamilyFilter||"all").toLowerCase();
 filterButtons.forEach(btn=>btn.classList.toggle("is-active",btn===button));
 render();
}));

document.addEventListener("gju:admin-quiz-index-ready",()=>load(),{once:true});
load();
window.setTimeout(()=>{if(!loaded)load()},900);
window.setTimeout(()=>{if(!loaded)load()},2200);
}());