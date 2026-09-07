(function(){
"use strict";

const page=document.querySelector('[data-subject-quiz-page]');
if(!page)return;

const examSlug=slugify(page.dataset.examSlug||page.dataset.subjectSlug||"");
const subjectName=String(page.dataset.subjectName||"Subject").trim();
const list=document.querySelector('[data-subject-quiz-list]');
const count=document.querySelector('[data-subject-quiz-count]');
const empty=document.querySelector('[data-subject-quiz-empty]');
const topicSelect=document.querySelector('[data-subject-topic-select]');
const topicGrid=document.querySelector('[data-subject-topic-grid]');
const activeTopicLabel=document.querySelector('[data-active-topic-label]');
if(!examSlug||!list)return;

let activeTopic="all";
let allItems=[];
let catalogTopics=[];
let loaded=false;

function esc(value){
 return String(value==null?"":value)
  .replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")
  .replace(/\"/g,"&quot;").replace(/'/g,"&#039;");
}
function slugify(value){
 return String(value||"").trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");
}
function sourcePayload(){
 for(const source of[window.GJU_QUIZ_INDEX,window.GJU_ADMIN_QUIZ_INDEX,window.GJU_PUBLISHED_QUIZ_INDEX]){
  if(Array.isArray(source))return{quizzes:source,topicCatalog:{}};
  if(source&&typeof source==="object"){
   const quizzes=Array.isArray(source.quizzes)?source.quizzes:Array.isArray(source.items)?source.items:Array.isArray(source.data)?source.data:null;
   if(quizzes)return{quizzes,topicCatalog:source.topicCatalog||{}};
  }
 }
 return{quizzes:[],topicCatalog:{}};
}
function getSubjectSlug(item){
 return slugify(item.subjectSlug||item.subject_slug||(item.subject&&item.subject.slug)||item.subject||"");
}
function getFamily(item){
 return slugify(item.examFamilySlug||item.exam_family_slug||(item.examFamily&&item.examFamily.slug)||(item.exam_family&&item.exam_family.slug)||"");
}
function getExamSlug(item){
 return slugify(item.examSlug||item.exam_slug||(item.exam&&item.exam.slug)||"");
}
function getTopics(item){
 const raw=Array.isArray(item.topics)?item.topics:[];
 const seen=new Set();
 return raw.map(topic=>{
  if(typeof topic==="string")return{slug:slugify(topic),name:String(topic)};
  return{slug:slugify(topic&&topic.slug),name:String(topic&&topic.name||topic&&topic.slug||"")};
 }).filter(topic=>topic.slug&&!seen.has(topic.slug)&&(seen.add(topic.slug),true));
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
 const subjectSlug=getSubjectSlug(item);
 const quizSlug=slugify(item.quizSlug||item.quiz_slug||item.slug||item.id||item.title||"quiz")||"quiz";
 return{
  id:`admin-${subjectSlug}-${quizSlug}`.replace(/-+/g,"-"),
  title:String(item.title||item.quizTitle||item.quiz_title||quizSlug).trim(),
  subjectSlug,
  family:getFamily(item),
  examSlug:getExamSlug(item),
  examName:String(item.examName||item.exam_name||(item.exam&&item.exam.name)||subjectName).trim(),
  topics:getTopics(item),
  duration:Number(item.durationMinutes||item.duration_minutes)||30,
  questions:Number(item.totalQuestions||item.total_questions||item.activeQuestions||item.active_questions)||0,
  order:dateValue(item,index)
 };
}
function topicName(slug){
 const found=catalogTopics.find(topic=>topic.slug===slug);
 return found?found.name:"All Topics";
}
function card(item){
 const href=`quiz-attempt.html?quiz=${encodeURIComponent(item.id)}&family=topic-wise&subject=${encodeURIComponent(examSlug)}`;
 const topicText=item.topics.length?item.topics.slice(0,2).map(topic=>topic.name).join(" · "):"Mixed Practice";
 return `<article class="subject-quiz-card"><div class="subject-quiz-card-top"><span class="subject-quiz-family">Topic Wise</span><span class="subject-quiz-exam">${esc(topicText)}</span></div><h3>${esc(item.title)}</h3><div class="subject-quiz-meta"><span><i class="far fa-circle-question" aria-hidden="true"></i>${item.questions?item.questions+" Questions":"Practice Set"}</span><span><i class="far fa-clock" aria-hidden="true"></i>${item.duration} Min</span><span><i class="fas fa-indian-rupee-sign" aria-hidden="true"></i>Free</span></div><a class="subject-quiz-start" href="${href}" aria-label="Start ${esc(item.title)}">Start Quiz <i class="fas fa-arrow-right" aria-hidden="true"></i></a></article>`;
}
function render(){
 const visible=activeTopic==="all"?allItems:allItems.filter(item=>item.topics.some(topic=>topic.slug===activeTopic));
 list.innerHTML=visible.map(card).join("");
 if(count)count.textContent=String(visible.length);
 if(activeTopicLabel)activeTopicLabel.textContent=activeTopic==="all"?"All Topics":topicName(activeTopic);
 if(empty){
  empty.hidden=visible.length!==0;
  empty.textContent=activeTopic==="all"
   ?`No published ${subjectName} topic-wise quizzes are available yet.`
   :`No published ${topicName(activeTopic)} quizzes are available yet. Choose another topic or view all topics.`;
 }
 list.hidden=visible.length===0;
}
function setTopic(slug){
 activeTopic=slug||"all";
 if(topicSelect)topicSelect.value=activeTopic;
 if(topicGrid){
  topicGrid.querySelectorAll('[data-topic-filter]').forEach(btn=>btn.classList.toggle('is-active',btn.dataset.topicFilter===activeTopic));
 }
 render();
}
function renderTopicControls(){
 if(topicSelect){
  topicSelect.innerHTML='<option value="all">All Topics</option>'+catalogTopics.map(topic=>`<option value="${esc(topic.slug)}">${esc(topic.name)}</option>`).join('');
  topicSelect.value=activeTopic;
 }
 if(topicGrid){
  if(!catalogTopics.length){
   topicGrid.innerHTML='<div class="subject-topic-empty">Topics will appear automatically as they are added in the Question Bank.</div>';
  }else{
   topicGrid.innerHTML=`<button type="button" class="subject-topic-chip is-active" data-topic-filter="all"><span>All Topics</span><small>View every set</small></button>`+catalogTopics.map(topic=>`<button type="button" class="subject-topic-chip" data-topic-filter="${esc(topic.slug)}"><span>${esc(topic.name)}</span><small>Practice this topic</small></button>`).join('');
  }
 }
}
function load(){
 const source=sourcePayload();
 if(!source.quizzes.length&&!Object.keys(source.topicCatalog||{}).length)return false;
 const catalog=source.topicCatalog&&source.topicCatalog[examSlug];
 catalogTopics=Array.isArray(catalog&&catalog.topics)?catalog.topics.map(topic=>({slug:slugify(topic.slug),name:String(topic.name||topic.slug||"")})).filter(topic=>topic.slug):[];
 allItems=source.quizzes.map(normalize).filter(item=>item.family==="topic-wise"&&item.examSlug===examSlug).sort((a,b)=>b.order-a.order);
 if(!catalogTopics.length){
  const unique=new Map();
  allItems.forEach(item=>item.topics.forEach(topic=>{if(!unique.has(topic.slug))unique.set(topic.slug,topic);}));
  catalogTopics=[...unique.values()].sort((a,b)=>a.name.localeCompare(b.name));
 }
 renderTopicControls();
 render();
 loaded=true;
 return true;
}

topicSelect&&topicSelect.addEventListener('change',()=>setTopic(topicSelect.value));
topicGrid&&topicGrid.addEventListener('click',event=>{
 const button=event.target.closest('[data-topic-filter]');
 if(button)setTopic(button.dataset.topicFilter||'all');
});

document.addEventListener("gju:admin-quiz-index-ready",()=>load(),{once:true});
load();
window.setTimeout(()=>{if(!loaded)load()},900);
window.setTimeout(()=>{if(!loaded)load()},2200);
}());