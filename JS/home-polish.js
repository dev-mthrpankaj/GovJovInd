(function(){
"use strict";
const page=decodeURIComponent(location.pathname.split('/').pop()||'index.html').toLowerCase();
if(page!==''&&page!=='index.html')return;
const css=document.createElement('link');css.rel='stylesheet';css.href='CSS/home-v2.css?v=20260824-v2';document.head.appendChild(css);
function card(icon,title,text,href){return `<a class="gju-v2-card" href="${href}"><span class="gju-v2-icon"><i class="fas ${icon}" aria-hidden="true"></i></span><h3>${title}</h3><p>${text}</p></a>`;}
function build(){
 const main=document.querySelector('main#main-content');if(!main)return;
 main.className='gju-v2';
 main.innerHTML=`
 <section class="gju-v2-hero" aria-labelledby="v2HeroTitle">
  <div><span class="gju-v2-eyebrow"><i class="fas fa-bolt"></i> Built for aspirants</span><h1 id="v2HeroTitle">Everything you need to <span>prepare & progress.</span></h1><p>Government job updates, results, exam tools, typing practice, rank prediction, student services and more — in one fast, focused platform.</p>
   <form class="gju-v2-search" role="search" action="HTML/latest-jobs.html"><i class="fas fa-search" aria-hidden="true"></i><input name="q" type="search" placeholder="Search jobs, results, exams..." aria-label="Search jobs and exams"><button type="submit">Search</button></form>
   <div class="gju-v2-actions"><a class="gju-v2-btn primary" href="HTML/latest-jobs.html"><i class="fas fa-briefcase"></i> Explore Jobs</a><a class="gju-v2-btn secondary" href="HTML/quiz.html"><i class="fas fa-circle-question"></i> Start Practice</a></div>
  </div>
  <div class="gju-v2-visual"><div class="gju-v2-visual-card"><i class="fas fa-graduation-cap"></i><strong>Your aspirant dashboard starts here.</strong><p>Updates, preparation, performance and useful student services without the clutter.</p></div><div class="gju-v2-mini-grid"><a class="gju-v2-mini" href="HTML/rank-predictor.html"><i class="fas fa-chart-line"></i><strong>Rank Predictor</strong></a><a class="gju-v2-mini" href="typing-test/index.html"><i class="fas fa-keyboard"></i><strong>Typing Test</strong></a><a class="gju-v2-mini" href="HTML/live-test-info.html"><i class="fas fa-bolt"></i><strong>Live Test</strong></a><a class="gju-v2-mini" href="HTML/dashboard.html"><i class="fas fa-chart-pie"></i><strong>Performance</strong></a></div></div>
 </section>
 <section class="gju-v2-section"><div class="gju-v2-head"><div><h2>Quick access</h2><p>Go straight to what matters right now.</p></div></div><div class="gju-v2-grid">
 ${card('fa-briefcase','Latest Jobs','New recruitment and application updates.','HTML/latest-jobs.html')}
 ${card('fa-id-card','Admit Cards','Exam city and admit card updates.','HTML/admitcard.html')}
 ${card('fa-key','Answer Keys','Response sheets and answer keys.','HTML/answer-key.html')}
 ${card('fa-square-poll-vertical','Results','Latest results and merit updates.','HTML/results.html')}
 ${card('fa-circle-question','Quiz Practice','Timed practice for major exams.','HTML/quiz.html')}
 ${card('fa-chart-line','Rank Predictor','Estimate rank from candidate data.','HTML/rank-predictor.html')}
 ${card('fa-keyboard','Typing Test','Hindi and English exam typing.','typing-test/index.html')}
 ${card('fa-file-lines','Document Tools','Useful PDF and document utilities.','HTML/documents.html')}
 </div></section>
 <section class="gju-v2-section"><div class="gju-v2-head"><div><h2>More for aspirants</h2><p>GovJobUpdates is growing beyond job notifications.</p></div></div><div class="gju-v2-featured">
  <a class="gju-v2-feature store" href="HTML/store.html"><span class="gju-v2-icon"><i class="fas fa-bag-shopping"></i></span><span><h3>Aspirant Store</h3><p>Books, running gear, study essentials and products selected for students.</p></span><i class="fas fa-arrow-right arrow"></i></a>
  <div class="gju-v2-feature academy" role="group" aria-label="Physical Academy coming soon"><span class="gju-v2-icon"><i class="fas fa-person-running"></i></span><span><h3>Physical Academy</h3><p>Physical preparation, running guidance and aspirant-focused training resources.</p><span class="gju-v2-coming">COMING SOON</span></span><i class="fas fa-arrow-right arrow"></i></div>
 </div></section>
 <section class="gju-v2-section"><div class="gju-v2-head"><div><h2>Student services</h2><p>Useful tools beyond exam preparation.</p></div></div><div class="gju-v2-grid">
 ${card('fa-certificate','UP Services','Certificate assistance and status tools.','HTML/up-certificate-services.html')}
 ${card('fa-graduation-cap','Student Hub','Guides, articles and student resources.','HTML/student-hub.html')}
 ${card('fa-bolt','Sunday Live Test','Join scheduled free live mock tests.','HTML/live-test-info.html')}
 ${card('fa-chart-pie','Performance','Review quiz history and weak areas.','HTML/dashboard.html')}
 </div></section>
 <section class="gju-v2-section"><div class="gju-v2-strip"><div class="gju-v2-stat"><strong>Fast Updates</strong><span>Jobs & exams</span></div><div class="gju-v2-stat"><strong>Free Practice</strong><span>Quiz & typing</span></div><div class="gju-v2-stat"><strong>Smart Tools</strong><span>Rank & performance</span></div><div class="gju-v2-stat"><strong>Student First</strong><span>Mobile focused</span></div></div></section>`;
 document.body.classList.add('home-v2-ready');
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',build);else build();
}());