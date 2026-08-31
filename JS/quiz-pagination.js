/* GovJobUpdates quiz pagination + direct remote quiz launcher */
(function(){
"use strict";
const PAGE_SIZE=9;
const directId=String(new URLSearchParams(location.search).get("quiz")||"").trim();
let directOverlay=null;

function showDirectLoader(){
 if(!directId.startsWith("admin-"))return;
 const home=document.getElementById("homeView");
 if(home)home.style.display="none";
 directOverlay=document.createElement("div");
 directOverlay.id="gjuDirectQuizLoader";
 directOverlay.setAttribute("role","status");
 directOverlay.setAttribute("aria-live","polite");
 directOverlay.innerHTML='<div style="width:min(92%,420px);margin:80px auto;text-align:center;padding:32px 24px;background:#fff;border:1px solid #dbe5f3;border-radius:18px;box-shadow:0 16px 45px rgba(15,35,70,.08)"><i class="fas fa-spinner fa-spin" style="font-size:28px;color:#1557d6" aria-hidden="true"></i><h2 style="margin:16px 0 6px;font-size:22px">Starting your quiz…</h2><p style="margin:0;color:#64748b">Loading questions and preparing the test.</p></div>';
 const app=document.getElementById("quizApp");
 if(app)app.prepend(directOverlay);
}
function hideDirectLoader(){
 if(directOverlay){directOverlay.remove();directOverlay=null;}
}
function installResponsiveMediaStyles(){
 if(document.getElementById("gju-quiz-media-responsive-styles"))return;
 const s=document.createElement("style");s.id="gju-quiz-media-responsive-styles";
 s.textContent='.quiz-media-question-image .quiz-media-frame,.quiz-media-review-question-image .quiz-media-frame,.quiz-media-explanation-image .quiz-media-frame{width:min(100%,680px);max-width:680px;margin-inline:auto}.quiz-media-question-image img,.quiz-media-review-question-image img,.quiz-media-explanation-image img{width:auto;max-width:100%;height:auto;max-height:min(56vh,560px);margin-inline:auto;object-fit:contain}@media(max-width:767px){.quiz-media-question-image .quiz-media-frame,.quiz-media-review-question-image .quiz-media-frame,.quiz-media-explanation-image .quiz-media-frame{width:100%;max-width:100%;margin-inline:0;padding:5px}.quiz-media-question-image img,.quiz-media-review-question-image img,.quiz-media-explanation-image img{width:100%;max-width:100%;max-height:none}}';
 document.head.appendChild(s);
}
function installDeferredDirectQuizStart(){
 if(!directId.startsWith("admin-"))return;
 let started=false;
 function attempt(){
  if(started)return;
  const r=window.GJU_QUIZZES;if(!r||typeof r.getQuizById!=="function")return;
  const q=r.getQuizById(directId);if(!q)return;
  const select=document.getElementById("subjectSelect");
  if(select&&q.subject&&select.value!==q.subject){select.value=q.subject;select.dispatchEvent(new Event("change",{bubbles:true}));}
  setTimeout(function(){
   if(started)return;
   const safe=window.CSS&&CSS.escape?CSS.escape(directId):directId.replace(/(["\\])/g,"\\$1");
   const btn=document.querySelector('[data-start-quiz="'+safe+'"]');if(!btn||btn.disabled)return;
   started=true;btn.click();
   requestAnimationFrame(function(){hideDirectLoader();});
  },0);
 }
 document.addEventListener("gju:admin-quiz-index-ready",function(){setTimeout(attempt,0);});
 setTimeout(attempt,0);
}
function initPagination(){
 const list=document.getElementById("quizSetList");if(!list)return;
 let page=1,pager=null;
 const cards=()=>Array.from(list.children).filter(x=>x.classList.contains("quiz-set-card"));
 function remove(){if(pager){pager.remove();pager=null;}}
 function numbers(total,current){const a=[];for(let i=1;i<=total;i++){if(i===1||i===total||Math.abs(i-current)<=1)a.push(i);else if(a[a.length-1]!=="…")a.push("…");}return a;}
 function apply(all,target){const total=Math.max(1,Math.ceil(all.length/PAGE_SIZE));page=Math.min(Math.max(1,target),total);const start=(page-1)*PAGE_SIZE,end=start+PAGE_SIZE;all.forEach((c,i)=>c.classList.toggle("quiz-card-page-hidden",!(i>=start&&i<end)));render(all.length,total);}
 function render(totalCount,totalPages){
  if(totalCount<=PAGE_SIZE){remove();return;}
  if(!pager){pager=document.createElement("nav");pager.className="quiz-pager";pager.setAttribute("aria-label","Quiz set pages");list.insertAdjacentElement("afterend",pager);}
  const start=(page-1)*PAGE_SIZE+1,end=Math.min(page*PAGE_SIZE,totalCount);
  let h='<p class="quiz-pager-range">Showing <strong>'+start+'–'+end+'</strong> of <strong>'+totalCount+'</strong> quiz sets</p><div class="quiz-pager-controls">';
  h+='<button type="button" class="quiz-pager-btn quiz-pager-arrow" data-page="'+(page-1)+'"'+(page===1?' disabled':'')+' aria-label="Previous page"><i class="fas fa-chevron-left"></i></button>';
  numbers(totalPages,page).forEach(p=>{h+=p==='…'?'<span class="quiz-pager-ellipsis">…</span>':'<button type="button" class="quiz-pager-btn'+(p===page?' active':'')+'" data-page="'+p+'"'+(p===page?' aria-current="page"':'')+'>'+p+'</button>';});
  h+='<button type="button" class="quiz-pager-btn quiz-pager-arrow" data-page="'+(page+1)+'"'+(page===totalPages?' disabled':'')+' aria-label="Next page"><i class="fas fa-chevron-right"></i></button></div>';pager.innerHTML=h;
  pager.querySelectorAll("[data-page]").forEach(b=>b.addEventListener("click",function(){const t=parseInt(b.dataset.page,10);if(!t||t===page)return;apply(cards(),t);list.scrollIntoView({behavior:"smooth",block:"start"});}));
 }
 function refresh(){const all=cards();if(!all.length){remove();return;}apply(all,1);}
 new MutationObserver(refresh).observe(list,{childList:true});refresh();
}
function init(){installResponsiveMediaStyles();showDirectLoader();installDeferredDirectQuizStart();initPagination();}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
})();
