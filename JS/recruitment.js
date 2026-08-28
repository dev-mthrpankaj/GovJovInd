(()=>{
'use strict';
const API='https://test.govjobupdates.com/live-test/api/recruitment';
const page=document.body.dataset.recruitmentPage||'';
const $=(q,c=document)=>c.querySelector(q);
const esc=s=>String(s??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
const human=s=>String(s||'').replaceAll('_',' ').replace(/\b\w/g,m=>m.toUpperCase());
const qs=n=>new URLSearchParams(location.search).get(n)||'';

async function json(url,opt={}){
  const r=await fetch(url,opt);
  let d={};
  try{d=await r.json()}catch{}
  if(!r.ok||d.success===false)throw new Error(d.message||'Request failed.');
  return d;
}

function notice(el,msg,type='error'){
  if(!el)return;
  el.textContent=msg;
  el.className='recruitment-notice '+type;
  el.hidden=false;
  el.scrollIntoView({behavior:'smooth',block:'center'});
}

function statusClass(s){
  return s==='open'?'status-open':s==='scheduled'?'status-scheduled':'status-closed';
}

function recruitmentProgress(a){
  const status=String(a.current_status||a.status||'').toLowerCase();

  const stage4Statuses=[
    'assignment_qualified',
    'screening_pending',
    'screening_scheduled',
    'screening_completed',
    'screening_qualified',
    'screening_not_qualified',
    'selected',
    'rejected'
  ];
  const stage3Statuses=[
    'test_qualified',
    'assignment_issued',
    'assignment_submitted',
    'assignment_under_review',
    'assignment_not_qualified'
  ];
  const stage2Statuses=[
    'shortlisted',
    'test_eligible',
    'test_scheduled',
    'test_started',
    'test_completed',
    'test_not_qualified'
  ];

  if(status==='selected'||status==='screening_qualified')return 5;
  if(stage4Statuses.includes(status))return 4;
  if(stage3Statuses.includes(status))return 3;
  if(stage2Statuses.includes(status))return 2;

  const apiProgress=Number(a.progress);
  return Number.isFinite(apiProgress)&&apiProgress>=1?apiProgress:1;
}

async function hub(){
  const open=$('#recruitmentOpenCount'),vac=$('#recruitmentVacancyCount'),note=$('#hubCounterNotice');
  try{
    const d=await json(API+'/jobs.php'),jobs=Array.isArray(d.jobs)?d.jobs:[];
    if(open)open.textContent=jobs.filter(j=>j.status==='open').length.toLocaleString('en-IN');
    if(vac)vac.textContent=jobs.filter(j=>j.status==='open').reduce((sum,j)=>sum+(Number(j.vacancies)||0),0).toLocaleString('en-IN');
  }catch(e){
    if(open)open.textContent='0';
    if(vac)vac.textContent='0';
    if(note){note.textContent='Live recruitment counts are temporarily unavailable.';note.hidden=false;}
  }
}

async function openings(){
  const box=$('#recruitmentJobs'),note=$('#recruitmentNotice');
  try{
    const d=await json(API+'/jobs.php'),jobs=Array.isArray(d.jobs)?d.jobs:[];
    if(!jobs.length){
      box.innerHTML='<div class="empty-recruitment"><h2>No open recruitment right now</h2><p>Please check again later for new opportunities.</p></div>';
      return;
    }
    box.innerHTML=jobs.map(j=>`<article class="recruitment-job-card"><div class="job-card-head"><div><span class="recruitment-kicker">${esc(j.job_code||'GovJobUpdates')}</span><h2>${esc(j.title)}</h2></div><span class="status-pill ${statusClass(j.status)}">${esc(human(j.status))}</span></div><div class="job-meta"><span><i class="fas fa-users"></i> ${esc(j.vacancies)} Vacancies</span><span><i class="fas fa-laptop-house"></i> ${esc(human(j.work_mode))}</span><span><i class="fas fa-clock"></i> ${esc(human(j.employment_type))}</span>${j.location?`<span><i class="fas fa-map-marker-alt"></i> ${esc(j.location)}</span>`:''}</div><p class="job-description">${esc(j.short_description||'View complete recruitment details and eligibility before applying.')}</p><div class="job-dates"><div class="job-date-box"><small>Applications Open</small><strong>${esc(j.application_open_label)}</strong></div><div class="job-date-box"><small>Applications Close</small><strong>${esc(j.application_close_label)}</strong></div></div><div class="job-card-actions"><a class="secondary-action" href="recruitment-job.html?slug=${encodeURIComponent(j.slug)}">View Details</a>${j.status==='open'?`<a class="primary-action" href="recruitment-apply.html?slug=${encodeURIComponent(j.slug)}">Apply Now</a>`:''}</div></article>`).join('');
  }catch(e){
    box.innerHTML='';
    notice(note,e.message);
  }
}

async function job(){
  const box=$('#jobDetail'),slug=qs('slug');
  if(!slug){box.innerHTML='<div class="empty-recruitment">Recruitment link is incomplete.</div>';return;}
  try{
    const {job:j}=await json(API+'/job.php?slug='+encodeURIComponent(slug));
    document.title=j.title+' | GovJobUpdates Recruitment';
    box.innerHTML=`<article class="job-detail-card"><div class="job-detail-header"><div><span class="recruitment-kicker">${esc(j.job_code||'Recruitment')}</span><h1>${esc(j.title)}</h1><div class="job-meta"><span>${esc(j.vacancies)} Vacancies</span><span>${esc(human(j.employment_type))}</span><span>${esc(human(j.work_mode))}</span>${j.location?`<span>${esc(j.location)}</span>`:''}</div></div><span class="status-pill ${statusClass(j.status)}">${esc(human(j.status))}</span></div><div class="job-dates"><div class="job-date-box"><small>Applications Open</small><strong>${esc(j.application_open_label)}</strong></div><div class="job-date-box"><small>Applications Close</small><strong>${esc(j.application_close_label)}</strong></div></div>${j.description?`<section class="job-detail-section"><h2>Job Description</h2><p>${esc(j.description)}</p></section>`:''}${j.eligibility?`<section class="job-detail-section"><h2>Eligibility</h2><p>${esc(j.eligibility)}</p></section>`:''}${j.experience_requirement?`<section class="job-detail-section"><h2>Experience Requirement</h2><p>${esc(j.experience_requirement)}</p></section>`:''}<div class="job-detail-actions"><a class="secondary-action" href="recruitment-openings.html">Back to Openings</a>${j.status==='open'?`<a class="primary-action" href="recruitment-apply.html?slug=${encodeURIComponent(j.slug)}">Apply Now</a>`:''}</div></article>`;
  }catch(e){
    box.innerHTML=`<div class="empty-recruitment"><h2>Unable to load recruitment</h2><p>${esc(e.message)}</p></div>`;
  }
}

async function apply(){
  const slug=qs('slug'),form=$('#recruitmentApplyForm'),msg=$('#applyMessage'),title=$('#applyJobTitle'),deadline=$('#applyDeadline'),success=$('#applicationSuccess');
  if(!slug){form.hidden=true;notice(msg,'Recruitment link is incomplete.');return;}
  $('#applySlug').value=slug;
  try{
    const {job:j}=await json(API+'/job.php?slug='+encodeURIComponent(slug));
    document.title='Apply for '+j.title+' | GovJobUpdates Recruitment';
    title.textContent='Apply for '+j.title;
    deadline.textContent='Applications close '+j.application_close_label+'. Please upload clear and readable documents.';
    if(j.status!=='open'){
      form.hidden=true;
      notice(msg,'Applications are '+human(j.status)+' for this recruitment.');
      return;
    }
  }catch(e){
    form.hidden=true;
    notice(msg,e.message);
    return;
  }
  form.addEventListener('submit',async ev=>{
    ev.preventDefault();
    if(!form.reportValidity())return;
    const btn=form.querySelector('button[type=submit]'),old=btn.innerHTML;
    btn.disabled=true;
    btn.innerHTML='<span class="spinner" style="width:18px;height:18px"></span> Submitting…';
    msg.hidden=true;
    try{
      const d=await json(API+'/apply.php',{method:'POST',body:new FormData(form)});
      form.hidden=true;
      success.hidden=false;
      success.innerHTML=`<div style="font-size:46px;color:#198754"><i class="fas fa-check-circle"></i></div><h2>Application Submitted Successfully</h2><p>You have successfully applied for <strong>${esc(d.job_title)}</strong>.</p><div class="application-number">${esc(d.application_no)}</div><p>Save this application number for future reference. ${d.mail_sent?'The same has been mailed to '+esc(d.email)+'.':'Your application is recorded; please save this number because email delivery could not be confirmed.'}</p><a class="primary-action" href="recruitment-status.html">Check Application Status</a>`;
      success.scrollIntoView({behavior:'smooth'});
    }catch(e){
      notice(msg,e.message);
    }finally{
      btn.disabled=false;
      btn.innerHTML=old;
    }
  });
}

async function status(){
  const form=$('#statusForm'),msg=$('#statusMessage'),out=$('#statusResult');
  form.addEventListener('submit',async ev=>{
    ev.preventDefault();
    const fd=new FormData(form);
    msg.hidden=true;
    out.hidden=true;
    try{
      const d=await json(API+'/status.php',{method:'POST',body:fd}),a=d.application;
      const photoFd=new FormData();
      photoFd.append('application_no',a.application_no);
      photoFd.append('date_of_birth',a.date_of_birth);
      let photo='';
      try{
        const r=await fetch(API+'/photo.php',{method:'POST',body:photoFd});
        if(r.ok)photo=URL.createObjectURL(await r.blob());
      }catch{}

      const labels=['Application & Shortlisting','Recruitment Test','Assignment','Screening'];
      const progress=recruitmentProgress(a);

      out.innerHTML=`<article class="status-profile"><div class="candidate-summary">${photo?`<img class="candidate-photo" src="${photo}" alt="Candidate passport photograph">`:'<div class="candidate-photo"></div>'}<div><span class="recruitment-kicker">${esc(a.application_no)}</span><h2>${esc(a.candidate_name)}</h2><p><strong>Applied For:</strong> ${esc(a.job_title)}</p><p><strong>Current Status:</strong> ${esc(a.status_label)}</p></div></div><div class="status-details"><div><small>Application Date</small><strong>${esc(new Date(a.submitted_at.replace(' ','T')).toLocaleString('en-IN',{dateStyle:'medium',timeStyle:'short'}))}</strong></div><div><small>Email</small><strong>${esc(a.email)}</strong></div><div><small>Mobile</small><strong>${esc(a.mobile)}</strong></div><div><small>Father's Name</small><strong>${esc(a.father_name)}</strong></div></div><div class="timeline">${labels.map((l,i)=>{const n=i+1,cl=n<progress?'done':n===progress?'current':'locked';return`<div class="timeline-stage ${cl}"><strong>Stage ${n}</strong><span>${esc(l)}</span></div>`}).join('')}</div>${a.history?.length?`<div class="history-list"><h3>Status History</h3>${a.history.slice().reverse().map(h=>`<div class="history-item"><time>${esc(new Date(h.created_at.replace(' ','T')).toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'}))}</time><div><strong>${esc(human(h.status))}</strong>${h.public_note?`<p>${esc(h.public_note)}</p>`:''}</div></div>`).join('')}</div>`:''}</article>`;
      out.hidden=false;
      out.scrollIntoView({behavior:'smooth',block:'start'});
    }catch(e){
      notice(msg,e.message);
    }
  });
}

if(page==='hub')hub();
else if(page==='openings')openings();
else if(page==='job')job();
else if(page==='apply')apply();
else if(page==='status')status();
})();