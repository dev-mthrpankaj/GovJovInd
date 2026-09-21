#!/usr/bin/env node

/*
 * Hydrates SEO-critical job content from inline #jobData into the initial HTML.
 * Browser-side JS remains the interactive source of truth; this creates the
 * same content server-side/static so crawlers and no-JS clients see it directly.
 *
 * Usage:
 *   node scripts/hydrate-job-static-fallbacks.js
 *   node scripts/hydrate-job-static-fallbacks.js --write
 */

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const jobsDir = path.join(root, 'jobs');
const write = process.argv.includes('--write');

function esc(v = '') {
  return String(v ?? '').replace(/[&<>'"]/g, c => ({
    '&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'
  }[c]));
}

function jsonEsc(v) {
  return JSON.stringify(v ?? '').replace(/</g, '\\u003c').replace(/>/g, '\\u003e').replace(/&/g, '\\u0026');
}

function readJobData(html, file) {
  const match = html.match(/<script\\b[^>]*\\bid=["']jobData["'][^>]*>([\\s\\S]*?)<\\/script>/i);
  if (!match) throw new Error(file + ': #jobData was not found');
  try {
    return JSON.parse(match[1].trim());
  } catch (error) {
    throw new Error(file + ': invalid #jobData JSON (' + error.message + ')');
  }
}

function replaceInner(html, id, value) {
  const marker = 'id="' + id + '"';
  let pos = html.indexOf(marker);
  if (pos < 0) {
    pos = html.indexOf("id='" + id + "'");
    if (pos < 0) return html;
  }
  const openStart = html.lastIndexOf('<', pos);
  const openEnd = html.indexOf('>', pos);
  if (openStart < 0 || openEnd < 0) return html;
  const tagMatch = html.slice(openStart, openEnd + 1).match(/^<([a-z0-9]+)/i);
  if (!tagMatch) return html;
  const tag = tagMatch[1];
  const close = new RegExp('<\\/' + tag + '>','i');
  const tail = html.slice(openEnd + 1);
  const closeMatch = close.exec(tail);
  if (!closeMatch) return html;
  const closeStart = openEnd + 1 + closeMatch.index;
  return html.slice(0, openEnd + 1) + String(value ?? '') + html.slice(closeStart);
}

function setText(html, id, value) {
  if (value === undefined || value === null) return html;
  return replaceInner(html, id, esc(value));
}

function setRaw(html, id, value) {
  return replaceInner(html, id, value || '');
}

function setAttr(html, selectorId, attr, value) {
  if (value === undefined || value === null || value === '') return html;
  const re = new RegExp('(\\bid=["\\']' + selectorId + '["\\'][^>]*\\b' + attr + '=["\\'])[^"\\']*(["\\'])','i');
  if (re.test(html)) return html.replace(re, '$1' + esc(value) + '$2');
  const re2 = new RegExp('(\\bid=["\\']' + selectorId + '["\\'][^>]*)(>)','i');
  return html.replace(re2, '$1 ' + attr + '="' + esc(value) + '"$2');
}

function fmtDate(value, long = false) {
  if (!value) return '';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return String(value);
  return new Intl.DateTimeFormat('en-IN', {
    timeZone:'Asia/Kolkata',
    day:'numeric',
    month: long ? 'long' : 'short',
    ...(long ? {year:'numeric'} : {year:'numeric'})
  }).format(d);
}

function num(v) {
  return typeof v === 'number' ? new Intl.NumberFormat('en-IN').format(v) : v;
}

function isUrl(url) {
  return Boolean(url && url !== '#');
}

function toneFor(status) {
  const s = String(status || '').toLowerCase();
  if (/final|selected|declared|released|qualified|completed|active|open|live/.test(s)) return 'success';
  if (/soon|scheduled|upcoming|await|pending|tba|to be/.test(s)) return 'info';
  if (/objection|closing|deadline|attention/.test(s)) return 'warning';
  if (/cancel|postpon|rejected|closed|expired/.test(s)) return 'danger';
  return 'neutral';
}

function iconForType(type) {
  return ({
    notification:'fa-bell', application:'fa-paper-plane', correction:'fa-edit',
    exam_date:'fa-calendar-alt', city_intimation:'fa-city', admit_card:'fa-id-card',
    exam:'fa-pen', answer_key:'fa-key', objection:'fa-exclamation-circle',
    revised_answer_key:'fa-key', result:'fa-poll', scorecard:'fa-chart-bar',
    cut_off:'fa-chart-line', physical:'fa-running', pet:'fa-running',
    pst:'fa-ruler-combined', skill_test:'fa-keyboard', typing_test:'fa-keyboard',
    dv:'fa-folder-open', document_verification:'fa-folder-open', medical:'fa-heartbeat',
    interview:'fa-user-tie', final_result:'fa-trophy', joining:'fa-briefcase',
    notice:'fa-bullhorn'
  }[type] || 'fa-circle');
}

function schemaLocation(location) {
  const parts = String(location || '').split(/\\s*(?:&|,|\\/|\\band\\b)\\s*/i).map(x=>x.trim()).filter(Boolean);
  const places = (parts.length ? parts : ['India']).map(name => ({
    '@type':'Place',
    address:{'@type':'PostalAddress', ...(name && !/^india$/i.test(name) ? {addressRegion:name} : {}), addressCountry:'IN'}
  }));
  return places.length === 1 ? places[0] : places;
}

function baseSalary(salary) {
  const text = String(salary || '');
  const matches = [...text.matchAll(/\\d[\\d,]*/g)].map(m=>Number(m[0].replace(/,/g,''))).filter(Number.isFinite);
  if (!matches.length) return undefined;
  const value = {'@type':'QuantitativeValue', unitText:/year|annual|annum|p\\.a\\./i.test(text) ? 'YEAR' : 'MONTH'};
  if (matches.length >= 2) { value.minValue=Math.min(...matches.slice(0,2)); value.maxValue=Math.max(...matches.slice(0,2)); }
  else value.value=matches[0];
  return {'@type':'MonetaryAmount',currency:'INR',value};
}

function renderJob(html, job, file) {
  const lifecycle = Array.isArray(job.lifecycle) ? job.lifecycle : [];
  const currentStage = (job.currentStage && lifecycle.find(x=>x.id===job.currentStage))
    || [...lifecycle].reverse().find(x=>x.current || /current|latest|released|declared|open|live/i.test(x.status || ''))
    || lifecycle[lifecycle.length-1] || null;

  html = setAttr(html, 'pageTitle', 'content', job.seo?.title);
  html = setAttr(html, 'metaDescription', 'content', job.seo?.description);
  html = setAttr(html, 'canonicalUrl', 'href', job.seo?.canonical);
  html = setAttr(html, 'robotsMeta', 'content', job.seo?.robots);
  html = setAttr(html, 'ogTitle', 'content', job.seo?.title);
  html = setAttr(html, 'ogDescription', 'content', job.seo?.description);
  html = setAttr(html, 'ogUrl', 'content', job.seo?.canonical);
  html = setAttr(html, 'twitterTitle', 'content', job.seo?.title);
  html = setAttr(html, 'twitterDescription', 'content', job.seo?.description);
  if (job.seo?.title) html = html.replace(/<title>[\\s\\S]*?<\\/title>/i, '<title>'+esc(job.seo.title)+'</title>');

  html = setText(html,'jobOrganization',job.organization);
  html = setText(html,'jobTitle',job.title);
  html = setText(html,'breadcrumbCurrent',job.shortTitle || job.title);
  html = setText(html,'jobSummary',job.summary);
  html = setRaw(html,'jobTags',(job.tags||[]).map(x=>'<span>'+esc(x)+'</span>').join(''));
  html = setText(html,'latestUpdate',job.latestUpdate || currentStage?.summary || 'Recruitment page updated.');
  html = setText(html,'updatedAt',job.updated ? 'Updated '+fmtDate(job.updated) : 'Updated recently');
  html = setText(html,'updatedBy','Updated by '+(job.updatedBy || 'GovJobUpdates'));

  const primary = isUrl(currentStage?.primaryAction?.url) ? currentStage.primaryAction
    : isUrl(job.primaryAction?.url) ? job.primaryAction
    : isUrl(currentStage?.secondaryAction?.url) ? {label:currentStage.secondaryAction.label||'View Latest Notice',url:currentStage.secondaryAction.url,icon:currentStage.secondaryAction.icon||'fa-file-alt'}
    : isUrl(job.links?.official) ? {label:'Check Latest Updates',url:job.links.official,icon:'fa-external-link-alt'}
    : isUrl(job.links?.notification) ? {label:'View Recruitment Notice',url:job.links.notification,icon:'fa-file-pdf'}
    : {label:'Check Latest Updates',url:'#important-links',icon:'fa-bell'};
  const secondary = isUrl(currentStage?.secondaryAction?.url) ? currentStage.secondaryAction
    : isUrl(job.secondaryAction?.url) ? job.secondaryAction
    : isUrl(job.links?.notification) ? {label:'Official Notification',url:job.links.notification,icon:'fa-file-pdf'}
    : isUrl(job.links?.official) ? {label:'Official Website',url:job.links.official,icon:'fa-landmark'}
    : {label:'Important Links',url:'#important-links',icon:'fa-link'};

  for (const id of ['heroPrimaryBtn','sidePrimaryBtn','mobilePrimaryBtn']) {
    html = setButton(html,id,primary.url,primary.label,primary.icon||'fa-arrow-right');
  }
  html = setButton(html,'heroSecondaryBtn',secondary.url,secondary.label,secondary.icon||'fa-file-alt');

  const status = currentStage?.status || job.status || 'Latest update available';
  html = setRaw(html,'recruitmentStatus','<span class="gjd-status-dot"></span>'+esc(status));
  html = html.replace(/(<[^>]*id=["']recruitmentStatus["'][^>]*class=["'])[^"']*/i,'$1gjd-status is-'+toneFor(status));
  html = setText(html,'mobileStatusLabel',currentStage?.shortLabel || currentStage?.label || 'Latest Stage');
  html = setText(html,'mobileStageValue',status);
  html = setText(html,'stageCardLabel','Current Recruitment Stage');
  html = setText(html,'stageHeadline',currentStage?.label || 'Recruitment Update');
  html = setText(html,'stageDate',currentStage?.date || currentStage?.deadline ? fmtDate(currentStage.date || currentStage.deadline,true) : status);
  html = setText(html,'stageStatusText',status);

  const metrics = Array.isArray(job.metrics) && job.metrics.length ? job.metrics : [
    {label:'Total Vacancies',value:num(job.vacancies),icon:'fa-users'},
    {label:'Current Stage',value:currentStage?.shortLabel || currentStage?.label || 'Recruitment',icon:iconForType(currentStage?.type)},
    {label:'Qualification',value:job.qualificationShort || 'See eligibility',icon:'fa-graduation-cap'},
    {label:'Job Location',value:job.location || 'India',icon:'fa-map-marker-alt'}
  ];
  html = setRaw(html,'metricsGrid',metrics.slice(0,4).map(m=>'<article><span class="gjd-metric-icon"><i class="fas '+esc(m.icon||'fa-circle')+'"></i></span><div><small>'+esc(m.label)+'</small><strong>'+esc(num(m.value) ?? '—')+'</strong></div></article>').join(''));
  html = setRaw(html,'quickFacts',(job.quickFacts||[]).map(f=>'<article><span>'+esc(f.label)+'</span><strong>'+esc(f.value)+'</strong></article>').join(''));
  html = setRaw(html,'overviewGrid',(job.overview||[]).map(([a,b])=>'<div class="gjd-info-item"><span>'+esc(a)+'</span><strong>'+esc(b)+'</strong></div>').join(''));
  html = setText(html,'overviewNote',job.overviewNote);

  html = setRaw(html,'lifecycleTimeline',lifecycle.length ? lifecycle.map(stage=>{
    const current=currentStage && stage.id===currentStage.id;
    const tone=stage.tone||toneFor(stage.status);
    const meta=[stage.status,stage.note].filter(Boolean).join(' • ');
    return '<div class="gjd-timeline-item '+(current?'is-primary is-current ':'')+'is-'+esc(tone)+'" data-stage-id="'+esc(stage.id||'')+'"><div class="gjd-timeline-dot"><i class="fas '+iconForType(stage.type)+'"></i></div><div><strong>'+esc(stage.label||stage.id||'Stage')+'</strong><small>'+esc(meta||'Recruitment lifecycle')+'</small>'+(stage.summary?'<p class="gjd-stage-summary">'+esc(stage.summary)+'</p>':'')+'</div><div class="gjd-timeline-date">'+esc(stage.date?fmtDate(stage.date,true):(stage.dateText||'As per schedule'))+'</div></div>';
  }).join('') : '');

  const updates=job.updates||[];
  html=setRaw(html,'updateHistory',updates.map((u,i)=>'<article class="gjd-update-history-item '+(i===0?'is-latest':'')+'"><time>'+esc(fmtDate(u.date))+'</time><div><strong>'+esc(u.title||'Recruitment Update')+'</strong><p>'+esc(u.text||'')+'</p></div></article>').join(''));
  html=removeHidden(html,'updateHistory',updates.length>0);

  html=setRaw(html,'vacancyTable',(job.vacancyRows||[]).map(r=>'<tr><td><strong>'+esc(r[0])+'</strong></td><td>'+esc(r[1])+'</td><td>'+esc(r[2])+'</td></tr>').join(''));
  html=setText(html,'vacancyTotal',num(job.vacancies));
  html=setText(html,'ageLimit',job.ageLimit);
  html=setText(html,'ageRelaxation',job.ageRelaxation || 'Age relaxation as per rules.');
  html=setText(html,'education',job.education);
  html=setText(html,'educationNote',job.educationNote || 'Refer to the official notification.');
  html=setText(html,'otherEligibility',job.otherEligibility);
  html=setRaw(html,'feeGrid',(job.fees||[]).map(([a,b])=>'<div class="gjd-fee-item"><span>'+esc(a)+'</span><strong>'+esc(b)+'</strong></div>').join(''));
  html=setText(html,'paymentMode',job.paymentMode);
  html=setRaw(html,'selectionFlow',(job.selection||[]).map((x,i)=>'<div class="gjd-selection-step"><b>'+String(i+1).padStart(2,'0')+'</b><span>'+esc(x)+'</span></div>').join(''));
  html=setRaw(html,'documentsGrid',(job.documents||[]).map(x=>'<div class="gjd-check-item"><i class="fas fa-check-circle"></i><span>'+esc(x)+'</span></div>').join(''));

  const guidance=currentStage?.guidance || job.currentGuidance || job.applySteps || [];
  html=setText(html,'guidanceHeading',currentStage?.guidanceTitle || (currentStage?.type==='application'?'How to Apply':'What Candidates Should Do Now'));
  html=setRaw(html,'guidanceSteps',guidance.map(x=>'<li>'+esc(x)+'</li>').join(''));

  const steps=job.applySteps||[];
  html=removeHidden(html,'applicationArchive',currentStage?.type!=='application' && steps.length);
  if (steps.length) html=setRaw(html,'applicationArchiveSteps',steps.map(x=>'<li>'+esc(x)+'</li>').join(''));

  const links=Array.isArray(job.importantLinks) ? job.importantLinks : [
    ...(job.links?.apply?[{label:'Apply Online',note:'Official application portal',url:job.links.apply,icon:'fa-paper-plane',type:'application'}]:[]),
    ...(job.links?.notification?[{label:'Download Notification',note:'Official PDF / notice',url:job.links.notification,icon:'fa-file-pdf',type:'notification'}]:[]),
    ...(job.links?.official?[{label:'Official Website',note:'Recruitment authority website',url:job.links.official,icon:'fa-landmark',type:'official'}]:[])
  ];
  html=setRaw(html,'importantLinks',links.map((l,i)=>{
    const disabled=!isUrl(l.url), badge=l.badge||(i===0?'Latest':'');
    return '<div class="gjd-link-row '+(l.highlight?'is-highlight':'')+'"><div><i class="fas '+esc(l.icon||iconForType(l.type))+'"></i><p><strong>'+esc(l.label)+'</strong><small>'+esc(l.note||'')+'</small>'+(badge?'<em class="gjd-link-badge">'+esc(badge)+'</em>':'')+'</p></div><a href="'+esc(l.url||'#')+'" '+(disabled?'class="is-disabled" aria-disabled="true"':'target="_blank" rel="noopener noreferrer"')+'>'+esc(l.buttonLabel||(disabled?'Awaited':'Open Link'))+'</a></div>';
  }).join(''));

  html=setRaw(html,'faqList',(job.faqs||[]).map(([q,a],i)=>'<div class="gjd-faq-item"><button class="gjd-faq-question" type="button" aria-expanded="'+(i===0?'true':'false')+'"><span>'+esc(q)+'</span><i class="fas fa-plus"></i></button><div class="gjd-faq-answer"><p>'+esc(a)+'</p></div></div>').join(''));

  const canonical=job.seo?.canonical || '';
  const applicationEnd=job.dates?.applicationEnd || lifecycle.find(x=>x.type==='application'&&x.deadline)?.deadline;
  const endDate=applicationEnd ? new Date(applicationEnd) : null;
  const active=endDate && !Number.isNaN(endDate.getTime()) && endDate.getTime()>=Date.now();
  let primarySchema=active ? {
    '@context':'https://schema.org','@type':'JobPosting',title:job.title,description:job.summary,datePosted:job.dates?.notification,
    validThrough:applicationEnd,employmentType:job.employmentType||'FULL_TIME',
    hiringOrganization:{'@type':'Organization',name:job.organization,sameAs:job.links?.official||canonical},
    jobLocation:schemaLocation(job.location),applicantLocationRequirements:{'@type':'Country',name:'India'},
    baseSalary:baseSalary(job.salary),url:canonical
  } : {
    '@context':'https://schema.org','@type':'WebPage',name:job.seo?.title||job.title,
    description:job.seo?.description||job.summary,url:canonical,dateModified:job.updated,
    about:{'@type':'Thing',name:job.title},
    publisher:{'@type':'Organization',name:'GovJobUpdates',url:'https://govjobupdates.com/'}
  };
  Object.keys(primarySchema).forEach(k=>primarySchema[k]===undefined&&delete primarySchema[k]);
  const breadcrumb={'@context':'https://schema.org','@type':'BreadcrumbList','itemListElement':[
    {'@type':'ListItem',position:1,name:'Home',item:'https://govjobupdates.com/'},
    {'@type':'ListItem',position:2,name:'Jobs',item:'https://govjobupdates.com/HTML/latest-jobs.html'},
    {'@type':'ListItem',position:3,name:job.shortTitle||job.title,item:canonical}
  ]};
  const faq={'@context':'https://schema.org','@type':'FAQPage',mainEntity:(job.faqs||[]).map(([q,a])=>({'@type':'Question',name:q,acceptedAnswer:{'@type':'Answer',text:a}}))};
  html=setRaw(html,'primarySchema',jsonEsc(primarySchema));
  html=setRaw(html,'jobPostingSchema',jsonEsc(primarySchema));
  html=setRaw(html,'breadcrumbSchema',jsonEsc(breadcrumb));
  html=setRaw(html,'faqSchema',jsonEsc(faq));

  return html;
}

function setButton(html,id,url,label,icon) {
  const marker='id="'+id+'"';
  let p=html.indexOf(marker); if(p<0){p=html.indexOf("id='"+id+"'");if(p<0)return html;}
  const s=html.lastIndexOf('<',p), e=html.indexOf('>',p); if(s<0||e<0)return html;
  const open=html.slice(s,e+1);
  const close=html.indexOf('</a>',e+1); if(close<0)return html;
  let attrs=open.replace(/\\sclass=["'][^"']*["']/i,'').replace(/\\starget=["'][^"']*["']/i,'').replace(/\\srel=["'][^"']*["']/i,'').replace(/\\shref=["'][^"']*["']/i,'');
  attrs=attrs.replace(/>$/,' href="'+esc(url||'#')+'"');
  if(isUrl(url)) attrs=attrs.replace(/>$/,' target="_blank" rel="noopener noreferrer">');
  else attrs=attrs.replace(/>$/,' class="is-disabled" aria-disabled="true">');
  let inner=html.slice(e+1,close);
  const span=inner.match(/(<span[^>]*>)[\\s\\S]*?(<\\/span>)/i);
  if(span) inner=inner.replace(span[0],span[1]+esc(label||'Open Link')+span[2]);
  else inner=esc(label||'Open Link');
  return html.slice(0,s)+attrs+inner+html.slice(close+4);
}

function removeHidden(html,id,show) {
  const re=new RegExp('(<[^>]*\\bid=["\\']'+id+'["\\'][^>]*)(\\shidden(?:=["\\'][^"\\']*["\\'])?)','i');
  if(show) return html.replace(re,'$1');
  return html;
}

const files=fs.readdirSync(jobsDir).filter(f=>f.endsWith('.html')).sort();
let changed=0,skipped=0;
const errors=[];
for(const file of files){
  const filePath=path.join(jobsDir,file);
  const original=fs.readFileSync(filePath,'utf8');
  try{
    const job=readJobData(original,file);
    const html=renderJob(original,job,file);
    if(html===original){skipped++;continue;}
    changed++;
    console.log((write?'Updated':'Would update')+' jobs/'+file);
    if(write)fs.writeFileSync(filePath,html,'utf8');
  }catch(error){errors.push(error.message);}
}
console.log('\\n'+(write?'Updated':'Preview')+': '+changed+' changed, '+skipped+' already current, '+errors.length+' errors.');
if(errors.length){console.error(errors.join('\\n'));process.exitCode=1;}
