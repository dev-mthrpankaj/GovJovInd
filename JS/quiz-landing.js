(function(){
"use strict";
const familyLists={ssc:document.querySelector('[data-family-list="ssc"]'),banking:document.querySelector('[data-family-list="banking"]'),police:document.querySelector('[data-family-list="police"]'),rrb:document.querySelector('[data-family-list="rrb"]')};
if(!Object.values(familyLists).some(Boolean))return;
const familyAliases={railway:"rrb",rrb:"rrb",ssc:"ssc",banking:"banking",police:"police"};
let loaded=false;
function esc(v){return String(v==null?"":v).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\"/g,"&quot;").replace(/'/g,"&#039;")}
function slugify(v){return String(v||"").trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")||"quiz"}
function sourceItems(){for(const p of[window.GJU_QUIZ_INDEX,window.GJU_ADMIN_QUIZ_INDEX,window.GJU_PUBLISHED_QUIZ_INDEX]){if(Array.isArray(p))return p;if(p&&Array.isArray(p.quizzes))return p.quizzes;if(p&&Array.isArray(p.items))return p.items;if(p&&Array.isArray(p.data))return p.data}return[]}
function rawFamily(item){return String(item.examFamilySlug||item.exam_family_slug||(item.examFamily&&item.examFamily.slug)||(item.exam_family&&item.exam_family.slug)||"").trim().toLowerCase()}
function family(item){return familyAliases[rawFamily(item)]||rawFamily(item)}
function dateValue(item,index){for(const value of[item.publishedAt,item.published_at,item.updatedAt,item.updated_at,item.createdAt,item.created_at]){if(value==null||value==="")continue;const numeric=Number(value);if(Number.isFinite(numeric)&&numeric>0)return numeric;const parsed=Date.parse(value);if(Number.isFinite(parsed))return parsed}return index}
function normalize(item,index){const f=family(item),ss=slugify(item.subjectSlug||item.subject_slug||(item.subject&&item.subject.slug)||item.subject||"practice"),sn=String(item.subjectName||item.subject_name||(item.subject&&item.subject.name)||item.subject||ss).trim(),qs=slugify(item.quizSlug||item.quiz_slug||item.slug||item.id||item.title||"quiz");return{id:`admin-${ss}-${qs}`.replace(/-+/g,"-"),title:String(item.title||item.quizTitle||item.quiz_title||qs).trim(),subject:sn,family:f,duration:Number(item.durationMinutes||item.duration_minutes)||30,questions:Number(item.totalQuestions||item.total_questions||item.activeQuestions||item.active_questions)||0,order:dateValue(item,index)}}
function row(q){const href=`quiz-attempt.html?quiz=${encodeURIComponent(q.id)}&family=${encodeURIComponent(q.family)}`;return `<article class="quiz-family-quiz-row"><div class="quiz-family-quiz-main"><span class="quiz-family-quiz-subject">${esc(q.subject)}</span><span class="quiz-family-quiz-title" title="${esc(q.title)}">${esc(q.title)}</span><div class="quiz-family-quiz-meta"><span><i class="far fa-circle-question" aria-hidden="true"></i>${q.questions?q.questions+" Questions":"Practice Set"}</span><span><i class="far fa-clock" aria-hidden="true"></i>${q.duration} Min</span></div></div><a class="quiz-family-start" href="${href}" aria-label="Start ${esc(q.title)}"><span>Start</span><i class="fas fa-arrow-right" aria-hidden="true"></i></a></article>`}
function render(items){Object.entries(familyLists).forEach(([slug,list])=>{if(!list)return;const rows=items.filter(q=>q.family===slug).sort((a,b)=>b.order-a.order).slice(0,5);list.innerHTML=rows.length?rows.map(row).join(""):'<div class="quiz-family-no-quizzes"><span>No published quizzes available in this category yet.</span></div>'})}
function load(){const raw=sourceItems();if(!raw.length)return false;const items=raw.map(normalize).filter(q=>familyLists[q.family]);render(items);loaded=true;return true}
document.addEventListener("gju:admin-quiz-index-ready",()=>load(),{once:true});
load();
window.setTimeout(()=>{if(!loaded)load()},900);
window.setTimeout(()=>{if(!loaded)load()},2200);
}());