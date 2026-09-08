(function(){
"use strict";

const styleHref="../CSS/quiz-selection-ui.css?v=20260908-exclusive";
if(!document.querySelector(`link[href^="${styleHref.split("?")[0]}"]`)){
  const link=document.createElement("link");
  link.rel="stylesheet";
  link.href=styleHref;
  document.head.appendChild(link);
}

const familyLists={ssc:document.querySelector('[data-family-list="ssc"]'),banking:document.querySelector('[data-family-list="banking"]'),police:document.querySelector('[data-family-list="police"]'),rrb:document.querySelector('[data-family-list="rrb"]')};
const familyAliases={railway:"rrb",rrb:"rrb",ssc:"ssc",banking:"banking",police:"police"};
const familyConfig={
  ssc:{title:"SSC Quizzes",kicker:"Staff Selection Commission",description:"CGL, CHSL, CPO and other SSC exam practice.",image:"../Assets/quiz/ssc.webp",alt:"SSC",href:"ssc-quizzes.html"},
  banking:{title:"Banking Quizzes",kicker:"Banking Exams",description:"IBPS, SBI and other banking exam practice.",image:"../Assets/quiz/bank.webp",alt:"Banking",href:"banking-quizzes.html"},
  police:{title:"Police Quizzes",kicker:"Police Recruitment",description:"Exam-focused practice for Police recruitments.",image:"../Assets/quiz/police.webp",alt:"Police",href:"police-quizzes.html"},
  rrb:{title:"RRB Railway Quizzes",kicker:"Railway Recruitment Board",description:"Practice sets for RRB and Railway examinations.",image:"../Assets/quiz/railway.webp",alt:"RRB Railway",href:"rrb-quizzes.html"}
};
const subjectConfig={
  maths:{title:"Mathematics",description:"Arithmetic, algebra & geometry",href:"maths-quizzes.html",icon:"fas fa-calculator"},
  reasoning:{title:"Reasoning",description:"Logical, verbal & analytical",href:"reasoning-quizzes.html",icon:"fas fa-brain"},
  english:{title:"English",description:"Grammar, vocabulary & comprehension",href:"english-quizzes.html",icon:"fas fa-language"},
  hindi:{title:"Hindi",description:"Grammar, vocabulary & language",href:"hindi-quizzes.html",icon:"fas fa-book-open"},
  "general-awareness":{title:"General Awareness",description:"History, polity, geography & static GK",href:"general-awareness-quizzes.html",icon:"fas fa-earth-asia"},
  "general-science":{title:"General Science",description:"Physics, chemistry & biology",href:"general-science-quizzes.html",icon:"fas fa-flask"},
  computer:{title:"Computer",description:"Fundamentals, terminology & concepts",href:"computer-quizzes.html",icon:"fas fa-laptop-code"},
  "current-affairs":{title:"Current Affairs",description:"Current affairs practice topics",href:"current-affairs-quizzes.html",icon:"fas fa-newspaper"}
};

let loaded=false;
let allItems=[];
let currentSelection=null;
let currentMode="exam";

function esc(v){return String(v==null?"":v).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\"/g,"&quot;").replace(/'/g,"&#039;")}
function slugify(v){return String(v||"").trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")||"quiz"}
function sourceItems(){for(const p of[window.GJU_QUIZ_INDEX,window.GJU_ADMIN_QUIZ_INDEX,window.GJU_PUBLISHED_QUIZ_INDEX]){if(Array.isArray(p))return p;if(p&&Array.isArray(p.quizzes))return p.quizzes;if(p&&Array.isArray(p.items))return p.items;if(p&&Array.isArray(p.data))return p.data}return[]}
function rawFamily(item){return String(item.examFamilySlug||item.exam_family_slug||(item.examFamily&&item.examFamily.slug)||(item.exam_family&&item.exam_family.slug)||"").trim().toLowerCase()}
function family(item){return familyAliases[rawFamily(item)]||rawFamily(item)}
function dateValue(item,index){for(const value of[item.publishedAt,item.published_at,item.updatedAt,item.updated_at,item.createdAt,item.created_at]){if(value==null||value==="")continue;const numeric=Number(value);if(Number.isFinite(numeric)&&numeric>0)return numeric;const parsed=Date.parse(value);if(Number.isFinite(parsed))return parsed}return index}
function normalize(item,index){const f=family(item),ss=slugify(item.subjectSlug||item.subject_slug||(item.subject&&item.subject.slug)||item.subject||"practice"),sn=String(item.subjectName||item.subject_name||(item.subject&&item.subject.name)||item.subject||ss).trim(),qs=slugify(item.quizSlug||item.quiz_slug||item.slug||item.id||item.title||"quiz");return{id:`admin-${ss}-${qs}`.replace(/-+/g,"-"),title:String(item.title||item.quizTitle||item.quiz_title||qs).trim(),subject:sn,subjectSlug:ss,family:f,duration:Number(item.durationMinutes||item.duration_minutes)||30,questions:Number(item.totalQuestions||item.total_questions||item.activeQuestions||item.active_questions)||0,order:dateValue(item,index)}}
function row(q){const href=`quiz-attempt.html?quiz=${encodeURIComponent(q.id)}&family=${encodeURIComponent(q.family)}`;return `<article class="quiz-family-quiz-row"><div class="quiz-family-quiz-main"><span class="quiz-family-quiz-subject">${esc(q.subject)}</span><span class="quiz-family-quiz-title" title="${esc(q.title)}">${esc(q.title)}</span><div class="quiz-family-quiz-meta"><span><i class="far fa-circle-question" aria-hidden="true"></i>${q.questions?q.questions+" Questions":"Practice Set"}</span><span><i class="far fa-clock" aria-hidden="true"></i>${q.duration} Min</span></div></div><a class="quiz-family-start" href="${href}" aria-label="Start ${esc(q.title)}"><span>Start</span><i class="fas fa-arrow-right" aria-hidden="true"></i></a></article>`}

function renderLegacyFamilies(items){Object.entries(familyLists).forEach(([slug,list])=>{if(!list)return;const rows=items.filter(q=>q.family===slug).sort((a,b)=>b.order-a.order).slice(0,5);list.innerHTML=rows.length?rows.map(row).join(""):'<div class="quiz-family-no-quizzes"><span>No published quizzes available in this category yet.</span></div>'})}

function setMode(mode,focus){
  currentMode=mode==="subject"?"subject":"exam";
  const layout=document.querySelector(".quiz-discovery-layout");
  if(layout)layout.dataset.mode=currentMode;
  const heroLinks=document.querySelectorAll(".quiz-practice-paths a");
  heroLinks.forEach(link=>link.classList.remove("is-active-path"));
  const activeLink=currentMode==="subject"?heroLinks[0]:heroLinks[1];
  activeLink?.classList.add("is-active-path");
  clearSelection();
  currentSelection=null;
  showPlaceholder(currentMode);
  if(focus){
    layout?.scrollIntoView({behavior:"smooth",block:"start"});
    window.setTimeout(()=>{
      if(currentMode==="subject")document.querySelector(".quiz-discovery-subjects .quiz-subject-card")?.focus();
      else document.querySelector(".quiz-exam-selector")?.focus();
    },250);
  }
}

function showPlaceholder(mode){
  const root=document.querySelector("#selectedQuizResults .quiz-family-feed");
  if(!root)return;
  const text=mode==="subject"?"Choose a subject above to view matching quizzes.":"Choose an exam above to view matching quizzes.";
  root.innerHTML=`<div class="quiz-results-placeholder"><span><i class="fas fa-hand-pointer" aria-hidden="true"></i>${text}</span></div>`;
}

function buildFocusedUI(){
  const landing=document.getElementById("quizLandingPage");
  const subjectSection=document.getElementById("subjectQuizDirectory");
  const examSection=document.getElementById("examQuizFamilies");
  const subjectGrid=subjectSection&&subjectSection.querySelector(".quiz-subject-grid");
  if(!landing||!subjectSection||!examSection||!subjectGrid||document.querySelector(".quiz-discovery-layout"))return;

  const layout=document.createElement("section");
  layout.className="quiz-discovery-layout";
  layout.id="quizPracticeSelector";
  layout.dataset.mode="exam";
  layout.setAttribute("aria-label","Choose exam or subject practice");

  const examPanel=document.createElement("section");
  examPanel.className="quiz-selector-panel quiz-discovery-exams";
  examPanel.innerHTML='<div class="quiz-selector-panel-head"><span>Prepare for your exam</span><h2>By Exam</h2><p>Choose an exam family to see only its latest quiz sets.</p></div><div class="quiz-exam-selector-list"></div>';
  const examList=examPanel.querySelector(".quiz-exam-selector-list");
  Object.entries(familyConfig).forEach(([slug,cfg])=>{
    const button=document.createElement("button");
    button.type="button";
    button.className="quiz-exam-selector";
    button.dataset.examSelector=slug;
    button.innerHTML=`<img src="${cfg.image}" alt="${esc(cfg.alt)}" width="40" height="40"><span class="quiz-exam-selector-copy"><strong>${esc(cfg.title)}</strong><span>${esc(cfg.description)}</span></span><i class="fas fa-chevron-right" aria-hidden="true"></i>`;
    button.addEventListener("click",()=>selectExam(slug,true));
    examList.appendChild(button);
  });

  const subjectPanel=document.createElement("section");
  subjectPanel.className="quiz-selector-panel quiz-discovery-subjects";
  subjectPanel.innerHTML='<div class="quiz-selector-panel-head"><span>Strengthen a topic</span><h2>By Subject</h2><p>Choose a subject to see only quizzes from that subject.</p></div>';
  subjectPanel.appendChild(subjectGrid);
  subjectGrid.querySelectorAll(".quiz-subject-card").forEach(card=>{
    const href=card.getAttribute("href")||"";
    const slug=Object.keys(subjectConfig).find(key=>subjectConfig[key].href===href);
    if(!slug)return;
    card.dataset.subjectSelector=slug;
    card.addEventListener("click",event=>{event.preventDefault();selectSubject(slug,true)});
  });

  layout.append(examPanel,subjectPanel);
  subjectSection.before(layout);
  subjectSection.classList.add("quiz-discovery-source");
  examSection.classList.add("quiz-discovery-source");

  const results=document.createElement("section");
  results.className="quiz-dynamic-results";
  results.id="selectedQuizResults";
  results.setAttribute("aria-live","polite");
  results.innerHTML='<div class="quiz-family-feed"></div>';
  layout.after(results);

  const heroLinks=document.querySelectorAll(".quiz-practice-paths a");
  if(heroLinks[0])heroLinks[0].addEventListener("click",event=>{event.preventDefault();setMode("subject",true)});
  if(heroLinks[1])heroLinks[1].addEventListener("click",event=>{event.preventDefault();setMode("exam",true)});
  setMode("exam",false);
}

function clearSelection(){document.querySelectorAll(".quiz-exam-selector.is-selected,.quiz-subject-card.is-selected").forEach(el=>el.classList.remove("is-selected"))}

function renderFocusedResults(items,meta){
  const root=document.querySelector("#selectedQuizResults .quiz-family-feed");
  if(!root)return;
  const latest=items.slice().sort((a,b)=>b.order-a.order).slice(0,5);
  const icon=meta.image?`<span class="quiz-family-feed-icon"><img src="${meta.image}" alt="${esc(meta.alt||meta.title)}" width="48" height="48"></span>`:`<span class="quiz-family-feed-icon"><i class="${meta.icon||"fas fa-layer-group"}" aria-hidden="true"></i></span>`;
  root.innerHTML=`<div class="quiz-family-feed-head">${icon}<div><span class="quiz-family-feed-kicker">${esc(meta.kicker)}</span><h3>${esc(meta.title)}</h3><p>${esc(meta.description)}</p></div></div><div class="quiz-family-latest">${latest.length?latest.map(row).join(""):'<div class="quiz-family-no-quizzes"><span>No published quizzes available for this selection yet.</span></div>'}</div><a class="quiz-family-view-all" href="${meta.href}">View All ${esc(meta.title)} <i class="fas fa-arrow-right" aria-hidden="true"></i></a>`;
}

function selectExam(slug,scroll){
  const cfg=familyConfig[slug];
  if(!cfg)return;
  if(currentMode!=="exam")setMode("exam",false);
  clearSelection();
  document.querySelector(`[data-exam-selector="${slug}"]`)?.classList.add("is-selected");
  currentSelection={type:"exam",slug};
  renderFocusedResults(allItems.filter(q=>q.family===slug),cfg);
  if(scroll)document.getElementById("selectedQuizResults")?.scrollIntoView({behavior:"smooth",block:"start"});
}

function selectSubject(slug,scroll){
  const cfg=subjectConfig[slug];
  if(!cfg)return;
  if(currentMode!=="subject")setMode("subject",false);
  clearSelection();
  document.querySelector(`[data-subject-selector="${slug}"]`)?.classList.add("is-selected");
  currentSelection={type:"subject",slug};
  renderFocusedResults(allItems.filter(q=>q.subjectSlug===slug),{title:`${cfg.title} Quizzes`,kicker:"Topic-wise practice",description:cfg.description,href:cfg.href,icon:cfg.icon});
  if(scroll)document.getElementById("selectedQuizResults")?.scrollIntoView({behavior:"smooth",block:"start"});
}

function refreshSelection(){if(!currentSelection)return;if(currentSelection.type==="exam")selectExam(currentSelection.slug,false);else selectSubject(currentSelection.slug,false)}

function load(){
  const raw=sourceItems();
  if(!raw.length)return false;
  allItems=raw.map(normalize).filter(q=>familyLists[q.family]);
  renderLegacyFamilies(allItems);
  buildFocusedUI();
  refreshSelection();
  loaded=true;
  return true;
}

if(!Object.values(familyLists).some(Boolean))return;
buildFocusedUI();
document.addEventListener("gju:admin-quiz-index-ready",()=>load(),{once:true});
load();
window.setTimeout(()=>{if(!loaded)load()},900);
window.setTimeout(()=>{if(!loaded)load()},2200);
}());