(() => {
  'use strict';
  const $ = (id) => document.getElementById(id);
  const dataNode = $('jobData');
  if (!dataNode) return;
  let job;
  try { job = JSON.parse(dataNode.textContent); } catch (err) { console.error('Invalid jobData JSON', err); return; }

  const esc = (v='') => String(v).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  const fmtDate = (value, withYear=true) => {
    if (!value) return 'To be announced';
    const d = new Date(value); if (Number.isNaN(d.getTime())) return value;
    return new Intl.DateTimeFormat('en-IN',{day:'2-digit',month:'short',...(withYear?{year:'numeric'}:{})}).format(d);
  };
  const fmtDateLong = value => value ? new Intl.DateTimeFormat('en-IN',{day:'numeric',month:'long',year:'numeric'}).format(new Date(value)) : 'To be announced';
  const num = value => typeof value === 'number' ? new Intl.NumberFormat('en-IN').format(value) : value;
  const setText = (id,value) => { const el=$(id); if(el) el.textContent=value ?? '—'; };
  const setLink = (id,url) => { const el=$(id); if(!el) return; if(url && url !== '#'){el.href=url; el.target='_blank'; el.rel='noopener noreferrer';} else {el.href='#important-links';} };
  function buildSchemaJobLocation(location){
    const raw=String(location||'').trim();
    const parts=raw ? raw.split(/\s*(?:&|,|\/|\band\b)\s*/i).map(x=>x.trim()).filter(Boolean) : ['India'];
    const toPlace=(name)=>{
      const address={"@type":"PostalAddress","addressCountry":"IN"};
      if(!name || /^india$/i.test(name)) return {"@type":"Place","address":address};
      if(/delhi|chandigarh|prayagraj|mathura|patna|lucknow|shillong|tirupati|trichy|madurai|bhubaneswar|udaipur/i.test(name)) address.addressLocality=name;
      else address.addressRegion=name;
      return {"@type":"Place","address":address};
    };
    const places=parts.map(toPlace);
    return places.length===1 ? places[0] : places;
  }
  function buildSchemaBaseSalary(salary){
    const text=String(salary||'');
    const matches=[...text.matchAll(/\d[\d,]*/g)].map(m=>Number(m[0].replace(/,/g,''))).filter(Number.isFinite);
    if(!matches.length) return undefined;
    const value={"@type":"QuantitativeValue","unitText":/year|annual|annum|p\.a\./i.test(text)?"YEAR":"MONTH"};
    if(matches.length>=2){ value.minValue=Math.min(matches[0],matches[1]); value.maxValue=Math.max(matches[0],matches[1]); }
    else value.value=matches[0];
    return {"@type":"MonetaryAmount","currency":"INR","value":value};
  }

  function renderSEO(){
    if(job.seo?.title){document.title=job.seo.title; document.querySelector('meta[property="og:title"]')?.setAttribute('content',job.seo.title);}
    if(job.seo?.description){document.querySelector('meta[name="description"]')?.setAttribute('content',job.seo.description); document.querySelector('meta[property="og:description"]')?.setAttribute('content',job.seo.description);}
    if(job.seo?.canonical){document.querySelector('link[rel="canonical"]')?.setAttribute('href',job.seo.canonical); document.querySelector('meta[property="og:url"]')?.setAttribute('content',job.seo.canonical);}
    if(job.seo?.robots) document.querySelector('meta[name="robots"]')?.setAttribute('content',job.seo.robots);
  }
  function renderHero(){
    setText('jobOrganization',job.organization); setText('jobTitle',job.title); setText('breadcrumbCurrent',job.title); setText('jobSummary',job.summary);
    $('jobTags').innerHTML=(job.tags||[]).map(x=>`<span>${esc(x)}</span>`).join('');
    setText('metricVacancies',num(job.vacancies)); setText('metricLastDate',fmtDate(job.dates?.applicationEnd)); setText('metricQualification',job.qualificationShort); setText('metricLocation',job.location);
    setText('latestUpdate',job.latestUpdate); setText('updatedAt',job.updated ? `Updated ${fmtDate(job.updated)}` : 'Updated recently');
    setLink('heroApplyBtn',job.links?.apply); setLink('sideApplyBtn',job.links?.apply); setLink('mobileApplyBtn',job.links?.apply); setLink('heroNotificationBtn',job.links?.notification);
  }
  function renderOverview(){ $('overviewGrid').innerHTML=(job.overview||[]).map(([a,b])=>`<div class="gjd-info-item"><span>${esc(a)}</span><strong>${esc(b)}</strong></div>`).join(''); }
  function renderDates(){
    const defs=[['Notification Released','notification','fa-bell'],['Application Start','applicationStart','fa-play'],['Last Date to Apply','applicationEnd','fa-hourglass-end'],['Fee Payment Last Date','feeEnd','fa-credit-card'],['Correction Window','correction','fa-edit'],['Exam Date','exam','fa-calendar-alt']];
    $('datesTimeline').innerHTML=defs.filter(([,k])=>job.dates?.[k]).map(([label,key,icon])=>`<div class="gjd-timeline-item ${key==='applicationEnd'?'is-primary':''}"><div class="gjd-timeline-dot"><i class="fas ${icon}"></i></div><div><strong>${esc(label)}</strong><small>${key==='applicationEnd'?'Important deadline':'Recruitment schedule'}</small></div><div class="gjd-timeline-date">${fmtDateLong(job.dates[key])}</div></div>`).join('');
  }
  function renderVacancy(){ $('vacancyTable').innerHTML=(job.vacancyRows||[]).map(r=>`<tr><td><strong>${esc(r[0])}</strong></td><td>${esc(r[1])}</td><td>${esc(r[2])}</td></tr>`).join(''); setText('vacancyTotal',num(job.vacancies)); }
  function renderEligibility(){ setText('ageLimit',job.ageLimit);setText('ageRelaxation',job.ageRelaxation);setText('education',job.education);setText('educationNote',job.educationNote);setText('otherEligibility',job.otherEligibility); }
  function renderFees(){ $('feeGrid').innerHTML=(job.fees||[]).map(([a,b])=>`<div class="gjd-fee-item"><span>${esc(a)}</span><strong>${esc(b)}</strong></div>`).join(''); setText('paymentMode',job.paymentMode); }
  function renderSelection(){ $('selectionFlow').innerHTML=(job.selection||[]).map((x,i)=>`<div class="gjd-selection-step"><b>${String(i+1).padStart(2,'0')}</b><span>${esc(x)}</span></div>`).join(''); }
  function renderDocs(){ $('documentsGrid').innerHTML=(job.documents||[]).map(x=>`<div class="gjd-check-item"><i class="fas fa-check-circle"></i><span>${esc(x)}</span></div>`).join(''); }
  function renderSteps(){ $('applySteps').innerHTML=(job.applySteps||[]).map(x=>`<li>${esc(x)}</li>`).join(''); }
  function renderLinks(){
    const links=[['Apply Online','Official application portal','fa-paper-plane',job.links?.apply],['Download Notification','Official PDF / notice','fa-file-pdf',job.links?.notification],['Official Website','Recruitment authority website','fa-landmark',job.links?.official]];
    $('importantLinks').innerHTML=links.map(([a,b,icon,url])=>`<div class="gjd-link-row"><div><i class="fas ${icon}"></i><p><strong>${esc(a)}</strong><small>${esc(b)}</small></p></div><a href="${esc(url||'#')}" ${url&&url!=='#'?'target="_blank" rel="noopener noreferrer"':'class="is-disabled" aria-disabled="true"'}>${url&&url!=='#'?'Open Link':'Add Link'}</a></div>`).join('');
  }
  function renderFaq(){
    $('faqList').innerHTML=(job.faqs||[]).map(([q,a],i)=>`<div class="gjd-faq-item"><button class="gjd-faq-question" type="button" aria-expanded="${i===0?'true':'false'}"><span>${esc(q)}</span><i class="fas fa-plus"></i></button><div class="gjd-faq-answer"><p>${esc(a)}</p></div></div>`).join('');
    document.querySelectorAll('.gjd-faq-question').forEach(btn=>btn.addEventListener('click',()=>btn.setAttribute('aria-expanded',btn.getAttribute('aria-expanded')!=='true')));
  }
  function updateApplicationState(){
    const now=Date.now(), start=new Date(job.dates?.applicationStart).getTime(), end=new Date(job.dates?.applicationEnd).getTime();
    const status=$('applicationStatus'), mobileLabel=$('mobileStatusLabel'); let label='Application status', headline='Schedule unavailable', cls='';
    if(!Number.isFinite(end)){ label='Schedule TBA'; headline='Dates to be announced'; }
    else if(now < start){ label='Opening Soon'; headline=`Opens ${fmtDate(job.dates.applicationStart)}`; }
    else if(now > end){ label='Application Closed'; headline='Application window closed'; cls='is-closed'; }
    else { const left=end-now, days=Math.ceil(left/86400000); label=days<=3?'Closing Soon':'Applications Open'; headline=days<=3?'Deadline approaching':'Application window is live'; cls=days<=3?'is-closing':''; }
    status.className=`gjd-status ${cls}`.trim(); status.innerHTML=`<span class="gjd-status-dot"></span>${esc(label)}`; setText('deadlineHeadline',headline); setText('deadlineDate',`Last date: ${fmtDateLong(job.dates?.applicationEnd)}`); setText('mobileStatusLabel',label); setText('mobileDeadline',fmtDate(job.dates?.applicationEnd));
    const d=$('heroApplyBtn'), s=$('sideApplyBtn'), m=$('mobileApplyBtn'); if(cls==='is-closed'){[d,s,m].forEach(el=>{if(el){el.classList.add('is-disabled');el.setAttribute('aria-disabled','true');}})}
  }
  function updateCountdown(){
    const end=new Date(job.dates?.applicationEnd).getTime(), start=new Date(job.dates?.applicationStart).getTime(), now=Date.now(); if(!Number.isFinite(end)) return;
    let diff=Math.max(0,end-now); const days=Math.floor(diff/86400000); diff%=86400000; const hours=Math.floor(diff/3600000); diff%=3600000; const mins=Math.floor(diff/60000);
    setText('countDays',String(days).padStart(2,'0'));setText('countHours',String(hours).padStart(2,'0'));setText('countMinutes',String(mins).padStart(2,'0'));
    if(Number.isFinite(start) && end>start){ const pct=Math.max(0,Math.min(100,((now-start)/(end-start))*100)); $('windowProgress').style.width=`${pct}%`; setText('progressText',now<start?'Application has not started yet':now>end?'Application window completed':`${Math.round(pct)}% of application window elapsed`); }
  }
  function renderSchemas(){
    const canonical=job.seo?.canonical||location.href; const end=job.dates?.applicationEnd;
    const posting={"@context":"https://schema.org","@type":"JobPosting","title":job.title,"description":job.summary,"datePosted":job.dates?.notification,"validThrough":end,"employmentType":"FULL_TIME","hiringOrganization":{"@type":"Organization","name":job.organization,"sameAs":job.links?.official||canonical},"jobLocation":buildSchemaJobLocation(job.location),"applicantLocationRequirements":{"@type":"Country","name":"India"},"baseSalary":buildSchemaBaseSalary(job.salary),"url":canonical}; Object.keys(posting).forEach(k=>posting[k]===undefined&&delete posting[k]); $('jobPostingSchema').textContent=JSON.stringify(posting);
    $('breadcrumbSchema').textContent=JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://govjobupdates.com/"},{"@type":"ListItem","position":2,"name":"Latest Jobs","item":"https://govjobupdates.com/HTML/latest-jobs.html"},{"@type":"ListItem","position":3,"name":job.title,"item":canonical}]});
    $('faqSchema').textContent=JSON.stringify({"@context":"https://schema.org","@type":"FAQPage","mainEntity":(job.faqs||[]).map(([q,a])=>({"@type":"Question","name":q,"acceptedAnswer":{"@type":"Answer","text":a}}))});
  }
  function toast(msg){ let t=document.querySelector('.gjd-toast'); if(!t){t=document.createElement('div');t.className='gjd-toast';document.body.appendChild(t);} t.textContent=msg;t.classList.add('is-show');setTimeout(()=>t.classList.remove('is-show'),2200); }
  function syncStickyNavigation(){
    const header=document.querySelector('body > header');
    const sticky=document.querySelector('.gjd-sticky-card');
    if(!header || !sticky) return;
    const style=getComputedStyle(header);
    const isOverlay=['fixed','sticky'].includes(style.position);
    const headerHeight=Math.ceil(header.getBoundingClientRect().height);
    const safeGap=12;
    document.documentElement.style.setProperty('--gjd-sticky-top',`${isOverlay ? headerHeight + safeGap : safeGap}px`);
  }
  function syncMobileApplyWithFooter(){
    const bar=$('mobileApplyBar');
    const footer=document.querySelector('body > footer');
    if(!bar || !footer) return;

    const setState=(visible)=>{
      bar.classList.toggle('is-footer-visible',visible);
      bar.setAttribute('aria-hidden',visible ? 'true' : 'false');
    };

    if('IntersectionObserver' in window){
      const footerObserver=new IntersectionObserver(entries=>{
        entries.forEach(entry=>setState(entry.isIntersecting));
      },{threshold:0,rootMargin:'0px 0px 0px 0px'});
      footerObserver.observe(footer);
    }else{
      const check=()=>{
        const r=footer.getBoundingClientRect();
        setState(r.top < window.innerHeight && r.bottom > 0);
      };
      check();
      window.addEventListener('scroll',check,{passive:true});
      window.addEventListener('resize',check,{passive:true});
    }
  }
  function initInteractions(){
    $('printBtn')?.addEventListener('click',()=>window.print());
    $('shareBtn')?.addEventListener('click',async()=>{const payload={title:job.title,text:job.summary,url:job.seo?.canonical||location.href};try{if(navigator.share) await navigator.share(payload);else{await navigator.clipboard.writeText(payload.url);toast('Link copied to clipboard');}}catch(e){if(e.name!=='AbortError') toast('Unable to share right now');}});
    const links=[...document.querySelectorAll('.gjd-toc a')], sections=links.map(a=>document.querySelector(a.getAttribute('href'))).filter(Boolean); if('IntersectionObserver'in window){const obs=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){links.forEach(a=>a.classList.toggle('is-active',a.getAttribute('href')===`#${entry.target.id}`));}}),{rootMargin:'-20% 0px -65% 0px'});sections.forEach(s=>obs.observe(s));}
  }
  renderSEO();renderHero();renderOverview();renderDates();renderVacancy();renderEligibility();renderFees();renderSelection();renderDocs();renderSteps();renderLinks();renderFaq();renderSchemas();updateApplicationState();updateCountdown();syncStickyNavigation();syncMobileApplyWithFooter();initInteractions();window.addEventListener('resize',syncStickyNavigation,{passive:true});setInterval(updateCountdown,60000);
})();
