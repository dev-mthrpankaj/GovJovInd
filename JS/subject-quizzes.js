(function(){
"use strict";
const page=document.querySelector('[data-subject-quiz-page]');if(!page)return;
const examSlug=slugify(page.dataset.examSlug||page.dataset.subjectSlug||"");
const subjectName=String(page.dataset.subjectName||"Subject").trim();
const list=document.querySelector('[data-subject-quiz-list]');
const count=document.querySelector('[data-subject-quiz-count]');
const empty=document.querySelector('[data-subject-quiz-empty]');
const topicSelect=document.querySelector('[data-subject-topic-select]');
const topicGrid=document.querySelector('[data-subject-topic-grid]');
const search=document.querySelector("[data-subject-search]");
const countLabel=document.querySelector("[data-subject-count-label]");
const activeTopicLabel=document.querySelector('[data-active-topic-label]');
if(!examSlug||!list)return;
let activeTopic="all",allItems=[],publishedTopics=[],loaded=false;
function esc(value){return String(value==null?"":value).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\"/g,"&quot;").replace(/'/g,"&#039;")}
function slugify(value){return String(value||"").trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")}
function sourcePayload(){for(const source of[window.GJU_QUIZ_INDEX,window.GJU_ADMIN_QUIZ_INDEX,window.GJU_PUBLISHED_QUIZ_INDEX]){if(Array.isArray(source))return{quizzes:source};if(source&&typeof source==="object"){const quizzes=Array.isArray(source.quizzes)?source.quizzes:Array.isArray(source.items)?source.items:Array.isArray(source.data)?source.data:null;if(quizzes)return{quizzes}}}return null}
function getSubjectSlug(item){return slugify(item.subjectSlug||item.subject_slug||(item.subject&&item.subject.slug)||item.subject||"")}
function getFamily(item){return slugify(item.examFamilySlug||item.exam_family_slug||(item.examFamily&&item.examFamily.slug)||(item.exam_family&&item.exam_family.slug)||"")}
function getExamSlug(item){return slugify(item.examSlug||item.exam_slug||(item.exam&&item.exam.slug)||"")}
function getTopics(item){const raw=Array.isArray(item.topics)?item.topics:[],seen=new Set();return raw.map(topic=>typeof topic==="string"?{slug:slugify(topic),name:String(topic)}:{slug:slugify(topic&&topic.slug),name:String(topic&&topic.name||topic&&topic.slug||"")}).filter(topic=>topic.slug&&!seen.has(topic.slug)&&(seen.add(topic.slug),true))}
function dateValue(item,index){for(const value of[item.publishedAt,item.published_at,item.updatedAt,item.updated_at,item.createdAt,item.created_at]){if(value==null||value==="")continue;const numeric=Number(value);if(Number.isFinite(numeric)&&numeric>0)return numeric;const parsed=Date.parse(value);if(Number.isFinite(parsed))return parsed}return index}
function normalize(item,index){const subjectSlug=getSubjectSlug(item),quizSlug=slugify(item.quizSlug||item.quiz_slug||item.slug||item.id||item.title||"quiz")||"quiz";return{id:`admin-${subjectSlug}-${quizSlug}`.replace(/-+/g,"-"),title:String(item.title||item.quizTitle||item.quiz_title||quizSlug).trim(),subjectSlug,family:getFamily(item),examSlug:getExamSlug(item),topics:getTopics(item),duration:Number(item.durationMinutes||item.duration_minutes)||30,questions:Number(item.totalQuestions||item.total_questions||item.activeQuestions||item.active_questions)||0,order:dateValue(item,index)}}
function topicName(slug){const found=publishedTopics.find(topic=>topic.slug===slug);return found?found.name:"All Topics"}
function card(item){const href=`quiz-attempt.html?quiz=${encodeURIComponent(item.id)}&family=topic-wise&subject=${encodeURIComponent(examSlug)}`;const topicText=item.topics.length?item.topics.slice(0,2).map(topic=>topic.name).join(" · "):"Mixed Practice";return `<article class="subject-quiz-card"><div class="subject-quiz-card-top"><span class="subject-quiz-family">Topic Wise</span><span class="subject-quiz-exam">${esc(topicText)}</span></div><h3>${esc(item.title)}</h3><div class="subject-quiz-meta"><span><i class="far fa-circle-question"></i>${item.questions?item.questions+" Questions":"Practice Set"}</span><span><i class="far fa-clock"></i>${item.duration} Min</span><span><i class="fas fa-indian-rupee-sign"></i>Free</span></div><a class="subject-quiz-start" href="${href}" aria-label="Start quiz: ${esc(item.title)}">Start Quiz <i class="fas fa-arrow-right"></i></a></article>`}
function render(){
 const query=String(search&&search.value||"").trim().toLocaleLowerCase();
 const visible=allItems.filter(item=>(activeTopic==="all"||item.topics.some(topic=>topic.slug===activeTopic))&&(!query||[item.title,...item.topics.map(topic=>topic.name)].join(" ").toLocaleLowerCase().includes(query)));
 list.innerHTML=visible.map(card).join("");list.setAttribute("aria-busy","false");
 if(count)count.textContent=String(visible.length);
 if(countLabel)countLabel.textContent=`${visible.length===1?"quiz":"quizzes"} available${query?" matching your search":""}`;
 if(activeTopicLabel)activeTopicLabel.textContent=activeTopic==="all"?"All Topics":topicName(activeTopic);
 if(empty){empty.hidden=visible.length!==0;empty.innerHTML=allItems.length?'<h3>No matching quizzes</h3><p>Try another title or topic, or clear your filters to see every available set.</p><button type="button" data-clear-subject-filters>Clear filters</button>':`<h3>${esc(subjectName)} practice is growing</h3><p>No topic-wise sets are published here yet. Explore exam-based practice in the meantime.</p><a href="quiz.html#examQuizFamilies">Explore exam quizzes →</a>`;}
 list.hidden=visible.length===0;
 if(topicGrid)topicGrid.querySelectorAll('[data-topic]').forEach(button=>{const selected=button.dataset.topic===activeTopic;button.classList.toggle("is-active",selected);button.setAttribute("aria-pressed",String(selected))});
}
function setTopic(slug){activeTopic=slug||"all";if(topicSelect)topicSelect.value=activeTopic;render()}
function buildPublishedTopics(){const map=new Map();allItems.forEach(item=>item.topics.forEach(topic=>{const current=map.get(topic.slug)||{slug:topic.slug,name:topic.name,count:0};current.count+=1;if(!current.name&&topic.name)current.name=topic.name;map.set(topic.slug,current)}));publishedTopics=[...map.values()].sort((a,b)=>a.name.localeCompare(b.name))}
function renderTopicControls(){
 if(topicGrid){topicGrid.hidden=publishedTopics.length===0;topicGrid.innerHTML=[{slug:"all",name:"All topics",count:allItems.length},...publishedTopics].map(topic=>`<button type="button" class="subject-topic-chip" data-topic="${esc(topic.slug)}" aria-pressed="${topic.slug===activeTopic}"><span>${esc(topic.name)}</span><small>${topic.count} ${topic.count===1?"quiz":"quizzes"}</small></button>`).join("")}
 if(topicSelect){topicSelect.innerHTML=`<option value="all">All Topics (${allItems.length})</option>`+publishedTopics.map(topic=>`<option value="${esc(topic.slug)}">${esc(topic.name)} (${topic.count})</option>`).join("");topicSelect.value=activeTopic;topicSelect.disabled=publishedTopics.length===0}
}
function load(){const source=sourcePayload();if(!source)return false;allItems=source.quizzes.filter(item=>item&&typeof item==="object").map(normalize).filter(item=>item.family==="topic-wise"&&item.examSlug===examSlug).sort((a,b)=>b.order-a.order);buildPublishedTopics();if(activeTopic!=="all"&&!publishedTopics.some(topic=>topic.slug===activeTopic))activeTopic="all";renderTopicControls();render();loaded=true;return true}
topicSelect&&topicSelect.addEventListener('change',()=>setTopic(topicSelect.value));
document.addEventListener("gju:admin-quiz-index-ready",()=>load());
if(search)search.addEventListener("input",()=>{if(loaded)render()});
if(topicGrid)topicGrid.addEventListener("click",event=>{const button=event.target.closest("[data-topic]");if(button)setTopic(button.dataset.topic)});
if(empty)empty.addEventListener("click",event=>{if(event.target.closest("[data-clear-subject-filters]")){if(search)search.value="";setTopic("all");if(search)search.focus()}});
function showLoadError(){
 if(loaded)return;list.hidden=true;list.setAttribute("aria-busy","false");
 if(topicGrid)topicGrid.hidden=true;
 if(topicSelect){topicSelect.innerHTML='<option value="all">Topics unavailable</option>';topicSelect.disabled=true;}
 if(count)count.textContent="";if(countLabel)countLabel.textContent="Practice sets could not be loaded";
 if(empty){empty.hidden=false;empty.innerHTML='<h3>We could not load the quizzes</h3><p>Please refresh this page to try again. You can still read the study guide below.</p><button type="button" data-retry-subject>Try again</button>';}
}
if(empty)empty.addEventListener("click",event=>{if(event.target.closest("[data-retry-subject]"))window.location.reload()});
load();window.setTimeout(()=>{if(!loaded)load()},900);window.setTimeout(()=>{if(!loaded&&!load())showLoadError()},8000);
}());