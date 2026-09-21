const fs=require('fs');
const path=require('path');

const input=path.join(__dirname,'up-anm-2026.html');
const output=path.join(__dirname,'rendered-up-anm-2026.html');

const html=fs.readFileSync(input,'utf8');
const m=html.match(/<script\\b[^>]*\\bid=["']jobData["'][^>]*>([\\s\\S]*?)<\\/script>/i);
if(!m) throw new Error('jobData not found');
const job=JSON.parse(m[1].trim());

const esc=v=>String(v??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
const date=v=>{if(!v)return '';const d=new Date(v);return Number.isNaN(d.getTime())?String(v):new Intl.DateTimeFormat('en-IN',{day:'2-digit',month:'long',year:'numeric'}).format(d)};
function inner(src,id,value){
 const re=new RegExp('(<([a-z0-9]+)\\\\b[^>]*\\\\bid=["\\\\']'+id+'["\\\\'][^>]*>)[\\\\s\\\\S]*?(<\\\\/\\\\2>)','i');
 return re.test(src)?src.replace(re,'$1'+value+'$3'):src;
}
function text(src,id,value){return inner(src,id,esc(value));}

let out=html;
const seo=job.seo||{};
if(seo.title) out=out.replace(/<title>[\\s\\S]*?<\\/title>/i,'<title>'+esc(seo.title)+'</title>');
if(seo.description) out=out.replace(/(<meta\\s+name=["']description["']\\s+content=["'])[^"']*(["'])/i,'$1'+esc(seo.description)+'$2');

out=text(out,'jobOrganization',job.organization);
out=text(out,'jobTitle',job.title);
out=text(out,'breadcrumbCurrent',job.shortTitle||job.title);
out=text(out,'jobSummary',job.summary);
out=text(out,'latestUpdate',job.latestUpdate);
out=text(out,'updatedAt',job.updated?'Updated '+date(job.updated):'Updated recently');
out=text(out,'updatedBy','Updated by '+(job.updatedBy||'GovJobUpdates'));

out=inner(out,'jobTags',(job.tags||[]).map(x=>'<span>'+esc(x)+'</span>').join(''));

out=inner(out,'metricsGrid',(job.metrics||[]).map(x=>'<article><span class="gjd-metric-icon"><i class="fas '+esc(x.icon||'fa-circle')+'"></i></span><div><small>'+esc(x.label)+'</small><strong>'+esc(x.value)+'</strong></div></article>').join(''));

out=inner(out,'quickFacts',(job.quickFacts||[]).map(x=>'<article><span>'+esc(x.label)+'</span><strong>'+esc(x.value)+'</strong></article>').join(''));

out=inner(out,'overviewGrid',(job.overview||[]).map(x=>'<div class="gjd-info-item"><span>'+esc(x[0])+'</span><strong>'+esc(x[1])+'</strong></div>').join(''));
out=text(out,'overviewNote',job.overviewNote);

out=inner(out,'lifecycleTimeline',(job.lifecycle||[]).map(x=>'<div class="gjd-timeline-item '+(x.current?'is-primary is-current':'')+'"><div class="gjd-timeline-dot"><i class="fas fa-circle"></i></div><div><strong>'+esc(x.label||x.shortLabel)+'</strong><small>'+esc(x.status||'')+'</small>'+(x.summary?'<p class="gjd-stage-summary">'+esc(x.summary)+'</p>':'')+'</div><div class="gjd-timeline-date">'+esc(x.date?date(x.date):(x.dateText||'As per official schedule'))+'</div></div>').join(''));

out=inner(out,'updateHistory',(job.updates||[]).map(x=>'<article class="gjd-update-history-item"><time>'+esc(date(x.date))+'</time><div><strong>'+esc(x.title)+'</strong><p>'+esc(x.text)+'</p></div></article>').join(''));

out=inner(out,'vacancyTable',(job.vacancyRows||[]).map(x=>'<tr><td><strong>'+esc(x[0])+'</strong></td><td>'+esc(x[1])+'</td><td>'+esc(x[2])+'</td></tr>').join(''));
out=text(out,'vacancyTotal',job.vacancies);
out=text(out,'ageLimit',job.ageLimit);
out=text(out,'ageRelaxation',job.ageRelaxation);
out=text(out,'education',job.education);
out=text(out,'educationNote',job.educationNote);
out=text(out,'otherEligibility',job.otherEligibility);
out=inner(out,'feeGrid',(job.fees||[]).map(x=>'<div class="gjd-fee-item"><span>'+esc(x[0])+'</span><strong>'+esc(x[1])+'</strong></div>').join(''));
out=text(out,'paymentMode',job.paymentMode);
out=inner(out,'selectionFlow',(job.selection||[]).map((x,i)=>'<div class="gjd-selection-step"><b>'+String(i+1).padStart(2,'0')+'</b><span>'+esc(x)+'</span></div>').join(''));
out=inner(out,'documentsGrid',(job.documents||[]).map(x=>'<div class="gjd-check-item"><i class="fas fa-check-circle"></i><span>'+esc(x)+'</span></div>').join(''));

const current=(job.lifecycle||[]).find(x=>x.current)||{};
out=text(out,'guidanceHeading',current.guidanceTitle||'Candidate Guidance');
out=inner(out,'guidanceSteps',(current.guidance||[]).map(x=>'<li>'+esc(x)+'</li>').join(''));

out=inner(out,'importantLinks',(job.importantLinks||[]).map(x=>'<div class="gjd-link-row '+(x.highlight?'is-highlight':'')+'"><div><i class="fas '+esc(x.icon||'fa-link')+'"></i><p><strong>'+esc(x.label)+'</strong><small>'+esc(x.note||'')+'</small></p></div><a href="'+esc(x.url)+'" target="_blank" rel="noopener noreferrer">'+esc(x.buttonLabel||'Open Link')+'</a></div>').join(''));

out=inner(out,'faqList',(job.faqs||[]).map(x=>'<div class="gjd-faq-item"><button class="gjd-faq-question" type="button"><span>'+esc(x[0])+'</span><i class="fas fa-plus"></i></button><div class="gjd-faq-answer"><p>'+esc(x[1])+'</p></div></div>').join(''));

const canonical=seo.canonical||'';
const webPage={'@context':'https://schema.org','@type':'WebPage','name':seo.title||job.title,'description':seo.description||job.summary,'url':canonical,'dateModified':job.updated,publisher:{'@type':'Organization',name:'GovJobUpdates',url:'https://govjobupdates.com/'}};
const breadcrumb={'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Home',item:'https://govjobupdates.com/'},{'@type':'ListItem',position:2,name:'Jobs',item:'https://govjobupdates.com/HTML/latest-jobs.html'},{'@type':'ListItem',position:3,name:job.shortTitle||job.title,item:canonical}]};
const faq=job.faqs?.length?{'@context':'https://schema.org','@type':'FAQPage',mainEntity:job.faqs.map(x=>({'@type':'Question',name:x[0],acceptedAnswer:{'@type':'Answer',text:x[1]}}))}:null;
const js=x=>JSON.stringify(x,null,2).replace(/</g,'\\u003c');
out=inner(out,'primarySchema',js(webPage));
out=inner(out,'breadcrumbSchema',js(breadcrumb));
out=inner(out,'faqSchema',js(faq||{}));

fs.writeFileSync(output,out,'utf8');

const checks={
 title:out.includes(seo.title),
 description:out.includes(seo.description),
 organization:out.includes(job.organization),
 h1:out.includes(job.title),
 summary:out.includes(job.summary),
 metrics:out.includes('Total Seats')&&out.includes('1800'),
 lifecycle:out.includes('Notification / Admission Notice')&&out.includes('Result / Merit List'),
 vacancy:out.includes('ANMTC Halwai ki Bagichi')&&out.includes('ANMTC Cholapur'),
 eligibility:out.includes(job.ageLimit)&&out.includes(job.education),
 fees:out.includes('Rs.200')&&out.includes('Rs.100'),
 selection:out.includes('Counselling / Seat Allotment'),
 documents:out.includes('10+2 Intermediate marksheet and certificate'),
 guidance:out.includes('How to Check Result / Merit List'),
 links:out.includes('Download Result / Merit List'),
 faq:out.includes('Has the UP ANM Training Result / Merit List 2026 been released?'),
 jsonld:out.includes('"@type": "WebPage"')&&out.includes('"@type": "FAQPage"'),
 dynamicPlaceholdersRemoved:!out.includes('id="metricsGrid"></section>')&&!out.includes('id="lifecycleTimeline"></div>')
};
console.log(JSON.stringify(checks,null,2));
console.log('OUTPUT_BYTES='+Buffer.byteLength(out,'utf8'));
if(Object.values(checks).some(v=>!v)) process.exit(1);
