(() => {
  'use strict';

  const $ = id => document.getElementById(id);
  const dataNode = $('jobData');
  if (!dataNode) return;

  let job;
  try {
    job = JSON.parse(dataNode.textContent);
  } catch (err) {
    console.error('Invalid jobData JSON', err);
    return;
  }

  const esc = (v = '') => String(v).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  const isUrl = url => Boolean(url && url !== '#');
  const parseDate = value => {
    if (!value) return null;
    const d = new Date(value);
    return Number.isNaN(d.getTime()) ? null : d;
  };
  const fmtDate = (value, withYear = true) => {
    const d = parseDate(value);
    if (!d) return value || 'As per official schedule';
    return new Intl.DateTimeFormat('en-IN', {day:'2-digit', month:'short', ...(withYear ? {year:'numeric'} : {})}).format(d);
  };
  const fmtDateLong = value => {
    const d = parseDate(value);
    if (!d) return value || 'As per official schedule';
    return new Intl.DateTimeFormat('en-IN', {day:'numeric', month:'long', year:'numeric'}).format(d);
  };
  const num = value => typeof value === 'number' ? new Intl.NumberFormat('en-IN').format(value) : value;
  const setText = (id, value, fallback = '—') => { const el = $(id); if (el) el.textContent = value ?? fallback; };
  const setHTML = (id, html = '') => { const el = $(id); if (el) el.innerHTML = html; };
  const setLink = (id, url, label, icon) => {
    const el = $(id);
    if (!el) return;
    const span = el.querySelector('span');
    if (span && label) span.textContent = label;
    if (icon) {
      const i = el.querySelector('i');
      if (i) i.className = `fas ${icon}`;
    }
    const targetUrl = isUrl(url) ? url : '#important-links';
    el.classList.remove('is-disabled');
    el.setAttribute('aria-disabled', 'false');
    el.href = targetUrl;

    if (/^https?:\/\//i.test(targetUrl)) {
      el.target = '_blank';
      el.rel = 'noopener noreferrer';
    } else {
      el.removeAttribute('target');
      el.removeAttribute('rel');
    }
  };

  const toneFor = status => {
    const s = String(status || '').toLowerCase();
    if (/final|selected|declared|released|qualified|completed|active|open|live/.test(s)) return 'success';
    if (/soon|scheduled|upcoming|await|pending|tba|to be/.test(s)) return 'info';
    if (/objection|closing|deadline|attention/.test(s)) return 'warning';
    if (/cancel|postpon|rejected|closed|expired/.test(s)) return 'danger';
    return 'neutral';
  };

  const iconForType = type => ({
    notification:'fa-bell', application:'fa-paper-plane', correction:'fa-edit', exam_date:'fa-calendar-alt', city_intimation:'fa-city',
    admit_card:'fa-id-card', exam:'fa-pen', answer_key:'fa-key', objection:'fa-exclamation-circle', revised_answer_key:'fa-key',
    result:'fa-poll', scorecard:'fa-chart-bar', cut_off:'fa-chart-line', physical:'fa-running', pet:'fa-running', pst:'fa-ruler-combined',
    skill_test:'fa-keyboard', typing_test:'fa-keyboard', dv:'fa-folder-open', document_verification:'fa-folder-open', medical:'fa-heartbeat',
    interview:'fa-user-tie', final_result:'fa-trophy', joining:'fa-briefcase', notice:'fa-bullhorn'
  }[type] || 'fa-circle');

  const lifecycle = Array.isArray(job.lifecycle) ? job.lifecycle : [];
  const currentStage = (() => {
    if (!lifecycle.length) return null;
    if (job.currentStage) {
      const exact = lifecycle.find(x => x.id === job.currentStage);
      if (exact) return exact;
    }
    return [...lifecycle].reverse().find(x => x.current || /current|latest|released|declared|open|live/i.test(x.status || '')) || lifecycle[lifecycle.length - 1];
  })();

  function buildSchemaJobLocation(location) {
    const raw = String(location || '').trim();
    const parts = raw ? raw.split(/\s*(?:&|,|\/|\band\b)\s*/i).map(x => x.trim()).filter(Boolean) : ['India'];
    const places = parts.map(name => {
      const address = {'@type':'PostalAddress','addressCountry':'IN'};
      if (name && !/^india$/i.test(name)) address.addressRegion = name;
      return {'@type':'Place', address};
    });
    return places.length === 1 ? places[0] : places;
  }

  function buildSchemaBaseSalary(salary) {
    const text = String(salary || '');
    const matches = [...text.matchAll(/\d[\d,]*/g)].map(m => Number(m[0].replace(/,/g,''))).filter(Number.isFinite);
    if (!matches.length) return undefined;
    const value = {'@type':'QuantitativeValue','unitText':/year|annual|annum|p\.a\./i.test(text) ? 'YEAR' : 'MONTH'};
    if (matches.length >= 2) { value.minValue = Math.min(matches[0], matches[1]); value.maxValue = Math.max(matches[0], matches[1]); }
    else value.value = matches[0];
    return {'@type':'MonetaryAmount','currency':'INR', value};
  }

  function renderSEO() {
    if (job.seo?.title) {
      document.title = job.seo.title;
      document.querySelector('meta[property="og:title"]')?.setAttribute('content', job.seo.title);
      document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', job.seo.title);
    }
    if (job.seo?.description) {
      document.querySelector('meta[name="description"]')?.setAttribute('content', job.seo.description);
      document.querySelector('meta[property="og:description"]')?.setAttribute('content', job.seo.description);
      document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', job.seo.description);
    }
    if (job.seo?.canonical) {
      document.querySelector('link[rel="canonical"]')?.setAttribute('href', job.seo.canonical);
      document.querySelector('meta[property="og:url"]')?.setAttribute('content', job.seo.canonical);
    }
    if (job.seo?.robots) document.querySelector('meta[name="robots"]')?.setAttribute('content', job.seo.robots);
  }

  function getPrimaryAction() {
    if (isUrl(currentStage?.primaryAction?.url)) return currentStage.primaryAction;
    if (isUrl(job.primaryAction?.url)) return job.primaryAction;

    if (isUrl(currentStage?.secondaryAction?.url)) {
      return {
        label: currentStage.secondaryAction.label || 'View Latest Notice',
        url: currentStage.secondaryAction.url,
        icon: currentStage.secondaryAction.icon || 'fa-file-alt'
      };
    }

    if (isUrl(job.links?.official)) {
      return {label:'Check Latest Updates', url:job.links.official, icon:'fa-external-link-alt'};
    }

    if (isUrl(job.links?.notification)) {
      return {label:'View Recruitment Notice', url:job.links.notification, icon:'fa-file-pdf'};
    }

    return {label:'Check Latest Updates', url:'#important-links', icon:'fa-bell'};
  }

  function getSecondaryAction() {
    if (isUrl(currentStage?.secondaryAction?.url)) return currentStage.secondaryAction;
    if (isUrl(job.secondaryAction?.url)) return job.secondaryAction;
    if (isUrl(job.links?.notification)) return {label:'Official Notification', url:job.links.notification, icon:'fa-file-pdf'};
    if (isUrl(job.links?.official)) return {label:'Official Website', url:job.links.official, icon:'fa-landmark'};
    return {label:'Important Links', url:'#important-links', icon:'fa-link'};
  }

  function renderHero() {
    setText('jobOrganization', job.organization);
    setText('jobTitle', job.title);
    setText('breadcrumbCurrent', job.shortTitle || job.title);
    setText('jobSummary', job.summary);
    setHTML('jobTags', (job.tags || []).map(x => `<span>${esc(x)}</span>`).join(''));
    setText('latestUpdate', job.latestUpdate || currentStage?.summary || 'Recruitment page updated.');
    setText('updatedAt', job.updated ? `Updated ${fmtDate(job.updated)}` : 'Updated recently');
    setText('updatedBy', `Updated by ${job.updatedBy || 'GovJobUpdates'}`);

    const primary = getPrimaryAction();
    const secondary = getSecondaryAction();
    setLink('heroPrimaryBtn', primary.url, primary.label, primary.icon || 'fa-arrow-right');
    setLink('sidePrimaryBtn', primary.url, primary.label, primary.icon || 'fa-arrow-right');
    setLink('mobilePrimaryBtn', primary.url, primary.label, primary.icon || 'fa-arrow-right');
    setLink('heroSecondaryBtn', secondary.url, secondary.label, secondary.icon || 'fa-file-alt');
  }

  function renderStatus() {
    const statusEl = $('recruitmentStatus');
    const label = currentStage?.status || job.status || 'Latest update available';
    const tone = currentStage?.tone || toneFor(label);
    if (statusEl) {
      statusEl.className = `gjd-status is-${tone}`;
      statusEl.innerHTML = `<span class="gjd-status-dot"></span>${esc(label)}`;
    }
    setText('mobileStatusLabel', currentStage?.shortLabel || currentStage?.label || 'Latest Stage');
    setText('mobileStageValue', label);
  }

  function renderCurrentStageCard() {
    const label = currentStage?.label || 'Recruitment Update';
    const date = currentStage?.date || currentStage?.deadline || null;
    const status = currentStage?.status || job.status || 'Updated';
    setText('stageCardLabel', 'Current Recruitment Stage');
    setText('stageHeadline', label);
    setText('stageDate', date ? fmtDateLong(date) : status);
    setText('stageStatusText', status);

    const countdown = $('stageCountdown');
    const deadline = parseDate(currentStage?.deadline);
    if (countdown && deadline && deadline.getTime() > Date.now()) {
      countdown.hidden = false;
      updateStageCountdown();
    } else if (countdown) {
      countdown.hidden = true;
    }
  }

  function updateStageCountdown() {
    const deadline = parseDate(currentStage?.deadline);
    if (!deadline) return;
    let diff = Math.max(0, deadline.getTime() - Date.now());
    const days = Math.floor(diff / 86400000); diff %= 86400000;
    const hours = Math.floor(diff / 3600000); diff %= 3600000;
    const mins = Math.floor(diff / 60000);
    setText('countDays', String(days).padStart(2,'0'));
    setText('countHours', String(hours).padStart(2,'0'));
    setText('countMinutes', String(mins).padStart(2,'0'));
  }

  function renderMetrics() {
    const metrics = Array.isArray(job.metrics) && job.metrics.length ? job.metrics : [
      {label:'Total Vacancies', value:num(job.vacancies), icon:'fa-users'},
      {label:'Current Stage', value:currentStage?.shortLabel || currentStage?.label || 'Recruitment', icon:iconForType(currentStage?.type)},
      {label:'Qualification', value:job.qualificationShort || 'See eligibility', icon:'fa-graduation-cap'},
      {label:'Job Location', value:job.location || 'India', icon:'fa-map-marker-alt'}
    ];
    setHTML('metricsGrid', metrics.slice(0,4).map(m => `<article><span class="gjd-metric-icon"><i class="fas ${esc(m.icon || 'fa-circle')}"></i></span><div><small>${esc(m.label)}</small><strong>${esc(num(m.value) ?? '—')}</strong></div></article>`).join(''));
  }

  function renderQuickFacts() {
    const facts = Array.isArray(job.quickFacts) ? job.quickFacts : [];
    const el = $('quickFacts');
    if (!el) return;
    if (!facts.length) { el.hidden = true; return; }
    el.hidden = false;
    el.innerHTML = facts.map(f => `<article><span>${esc(f.label)}</span><strong>${esc(f.value)}</strong></article>`).join('');
  }

  function renderOverview() {
    setHTML('overviewGrid', (job.overview || []).map(([a,b]) => `<div class="gjd-info-item"><span>${esc(a)}</span><strong>${esc(b)}</strong></div>`).join(''));
    if (job.overviewNote) setText('overviewNote', job.overviewNote);
  }

  function renderLifecycle() {
    const el = $('lifecycleTimeline');
    if (!el) return;
    if (!lifecycle.length) {
      const legacy = job.dates || {};
      const defs = [
        ['Notification Released','notification','notification'], ['Application Start','applicationStart','application'], ['Last Date to Apply','applicationEnd','application'],
        ['Fee Payment Last Date','feeEnd','application'], ['Correction Window','correction','correction'], ['Exam Date','exam','exam_date']
      ];
      el.innerHTML = defs.filter(([,key]) => legacy[key]).map(([label,key,type]) => `<div class="gjd-timeline-item"><div class="gjd-timeline-dot"><i class="fas ${iconForType(type)}"></i></div><div><strong>${esc(label)}</strong><small>Recruitment schedule</small></div><div class="gjd-timeline-date">${esc(fmtDateLong(legacy[key]))}</div></div>`).join('');
      return;
    }
    el.innerHTML = lifecycle.map(stage => {
      const isCurrent = currentStage && stage.id === currentStage.id;
      const tone = stage.tone || toneFor(stage.status);
      const meta = [stage.status, stage.note].filter(Boolean).join(' • ');
      return `<div class="gjd-timeline-item ${isCurrent ? 'is-primary is-current' : ''} is-${esc(tone)}" data-stage-id="${esc(stage.id || '')}"><div class="gjd-timeline-dot"><i class="fas ${iconForType(stage.type)}"></i></div><div><strong>${esc(stage.label || stage.id || 'Stage')}</strong><small>${esc(meta || 'Recruitment lifecycle')}</small>${stage.summary ? `<p class="gjd-stage-summary">${esc(stage.summary)}</p>` : ''}</div><div class="gjd-timeline-date">${esc(stage.date ? fmtDateLong(stage.date) : (stage.dateText || 'As per schedule'))}</div></div>`;
    }).join('');
  }

  function renderUpdateHistory() {
    const el = $('updateHistory');
    if (!el) return;
    const updates = Array.isArray(job.updates) ? job.updates : [];
    if (!updates.length) { el.hidden = true; return; }
    el.hidden = false;
    el.innerHTML = updates.map((u, i) => `<article class="gjd-update-history-item ${i===0?'is-latest':''}"><time>${esc(fmtDate(u.date))}</time><div><strong>${esc(u.title || 'Recruitment Update')}</strong><p>${esc(u.text || '')}</p></div></article>`).join('');
  }

  function renderVacancy() {
    setHTML('vacancyTable', (job.vacancyRows || []).map(r => `<tr><td><strong>${esc(r[0])}</strong></td><td>${esc(r[1])}</td><td>${esc(r[2])}</td></tr>`).join(''));
    setText('vacancyTotal', num(job.vacancies));
  }

  function renderEligibility() {
    setText('ageLimit', job.ageLimit);
    setText('ageRelaxation', job.ageRelaxation, 'Age relaxation as per rules.');
    setText('education', job.education);
    setText('educationNote', job.educationNote, 'Refer to the official notification.');
    setText('otherEligibility', job.otherEligibility);
  }

  function renderFees() {
    setHTML('feeGrid', (job.fees || []).map(([a,b]) => `<div class="gjd-fee-item"><span>${esc(a)}</span><strong>${esc(b)}</strong></div>`).join(''));
    setText('paymentMode', job.paymentMode);
  }

  function renderSelection() {
    setHTML('selectionFlow', (job.selection || []).map((x,i) => `<div class="gjd-selection-step"><b>${String(i+1).padStart(2,'0')}</b><span>${esc(x)}</span></div>`).join(''));
  }

  function renderDocs() {
    setHTML('documentsGrid', (job.documents || []).map(x => `<div class="gjd-check-item"><i class="fas fa-check-circle"></i><span>${esc(x)}</span></div>`).join(''));
  }

  function renderGuidance() {
    const guidance = currentStage?.guidance || job.currentGuidance || job.applySteps || [];
    const heading = currentStage?.guidanceTitle || (currentStage?.type === 'application' ? 'How to Apply' : 'What Candidates Should Do Now');
    setText('guidanceHeading', heading);
    setHTML('guidanceSteps', guidance.map(x => `<li>${esc(x)}</li>`).join(''));
    const applicationArchive = $('applicationArchive');
    if (applicationArchive) {
      const steps = job.applySteps || [];
      const shouldShow = currentStage?.type !== 'application' && steps.length;
      applicationArchive.hidden = !shouldShow;
      if (shouldShow) setHTML('applicationArchiveSteps', steps.map(x => `<li>${esc(x)}</li>`).join(''));
    }
  }

  function normalizeLinks() {
    if (Array.isArray(job.importantLinks)) return job.importantLinks;
    const legacy = [];
    if (job.links?.apply) legacy.push({label:'Apply Online', note:'Official application portal', url:job.links.apply, icon:'fa-paper-plane', type:'application'});
    if (job.links?.notification) legacy.push({label:'Download Notification', note:'Official PDF / notice', url:job.links.notification, icon:'fa-file-pdf', type:'notification'});
    if (job.links?.official) legacy.push({label:'Official Website', note:'Recruitment authority website', url:job.links.official, icon:'fa-landmark', type:'official'});
    return legacy;
  }

  function renderLinks() {
    const links = normalizeLinks();
    setHTML('importantLinks', links.map((l, i) => {
      const disabled = !isUrl(l.url);
      const badge = l.badge || (i === 0 ? 'Latest' : '');
      return `<div class="gjd-link-row ${l.highlight ? 'is-highlight' : ''}"><div><i class="fas ${esc(l.icon || iconForType(l.type))}"></i><p><strong>${esc(l.label)}</strong><small>${esc(l.note || '')}</small>${badge ? `<em class="gjd-link-badge">${esc(badge)}</em>` : ''}</p></div><a href="${esc(l.url || '#')}" ${disabled ? 'class="is-disabled" aria-disabled="true"' : 'target="_blank" rel="noopener noreferrer"'}>${esc(l.buttonLabel || (disabled ? 'Awaited' : 'Open Link'))}</a></div>`;
    }).join(''));
  }

  function renderFaq() {
    setHTML('faqList', (job.faqs || []).map(([q,a],i) => `<div class="gjd-faq-item"><button class="gjd-faq-question" type="button" aria-expanded="${i===0?'true':'false'}"><span>${esc(q)}</span><i class="fas fa-plus"></i></button><div class="gjd-faq-answer"><p>${esc(a)}</p></div></div>`).join(''));
    document.querySelectorAll('.gjd-faq-question').forEach(btn => btn.addEventListener('click', () => btn.setAttribute('aria-expanded', btn.getAttribute('aria-expanded') !== 'true')));
  }

  function renderSchemas() {
    const canonical = job.seo?.canonical || location.href;
    const applicationEnd = job.dates?.applicationEnd || lifecycle.find(x => x.type === 'application' && x.deadline)?.deadline;
    const applicationEndDate = parseDate(applicationEnd);
    const notificationDate = job.dates?.notification || lifecycle.find(x => x.type === 'notification')?.date;
    const jobPostingActive = applicationEndDate && applicationEndDate.getTime() >= Date.now();

    const primary = jobPostingActive ? {
      '@context':'https://schema.org', '@type':'JobPosting', title:job.title, description:job.summary,
      datePosted:notificationDate, validThrough:applicationEnd, employmentType:job.employmentType || 'FULL_TIME',
      hiringOrganization:{'@type':'Organization', name:job.organization, sameAs:job.links?.official || canonical},
      jobLocation:buildSchemaJobLocation(job.location), applicantLocationRequirements:{'@type':'Country','name':'India'},
      baseSalary:buildSchemaBaseSalary(job.salary), url:canonical
    } : {
      '@context':'https://schema.org', '@type':'WebPage', name:job.seo?.title || job.title, description:job.seo?.description || job.summary,
      url:canonical, dateModified:job.updated, about:{'@type':'Thing','name':job.title}, publisher:{'@type':'Organization','name':'GovJobUpdates','url':'https://govjobupdates.com/'}
    };
    Object.keys(primary).forEach(k => primary[k] === undefined && delete primary[k]);
    if ($('primarySchema')) $('primarySchema').textContent = JSON.stringify(primary);
    if ($('jobPostingSchema')) $('jobPostingSchema').textContent = JSON.stringify(primary);

    $('breadcrumbSchema') && ($('breadcrumbSchema').textContent = JSON.stringify({'@context':'https://schema.org','@type':'BreadcrumbList','itemListElement':[
      {'@type':'ListItem','position':1,'name':'Home','item':'https://govjobupdates.com/'},
      {'@type':'ListItem','position':2,'name':'Jobs','item':'https://govjobupdates.com/HTML/latest-jobs.html'},
      {'@type':'ListItem','position':3,'name':job.shortTitle || job.title,'item':canonical}
    ]}));
    $('faqSchema') && ($('faqSchema').textContent = JSON.stringify({'@context':'https://schema.org','@type':'FAQPage','mainEntity':(job.faqs || []).map(([q,a]) => ({'@type':'Question','name':q,'acceptedAnswer':{'@type':'Answer','text':a}}))}));
  }

  function toast(msg) {
    let t = document.querySelector('.gjd-toast');
    if (!t) { t = document.createElement('div'); t.className = 'gjd-toast'; document.body.appendChild(t); }
    t.textContent = msg; t.classList.add('is-show'); setTimeout(() => t.classList.remove('is-show'), 2200);
  }

  function syncStickyNavigation() {
    const header = document.querySelector('body > header');
    const sticky = document.querySelector('.gjd-sticky-card');
    if (!header || !sticky) return;
    const style = getComputedStyle(header);
    const isOverlay = ['fixed','sticky'].includes(style.position);
    const headerHeight = Math.ceil(header.getBoundingClientRect().height);
    document.documentElement.style.setProperty('--gjd-sticky-top', `${isOverlay ? headerHeight + 12 : 12}px`);
  }

  function syncMobileActionWithFooter() {
    const bar = $('mobileActionBar');
    const footer = document.querySelector('body > footer');
    if (!bar || !footer) return;
    let footerVisible = false;
    const setState = () => {
      const topVisible = Boolean(document.querySelector('.go-top-btn.is-visible'));
      const hide = footerVisible || topVisible;
      bar.classList.toggle('is-footer-visible', hide);
      bar.setAttribute('aria-hidden', hide ? 'true' : 'false');
    };
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(entries => { footerVisible = entries.some(e => e.isIntersecting); setState(); }, {threshold:0}).observe(footer);
    }
    window.addEventListener('scroll', setState, {passive:true});
    window.addEventListener('resize', setState, {passive:true});
    setState();
  }

  function initInteractions() {
    $('printBtn')?.addEventListener('click', () => window.print());
    $('shareBtn')?.addEventListener('click', async () => {
      const payload = {title:job.title, text:job.summary, url:job.seo?.canonical || location.href};
      try {
        if (navigator.share) await navigator.share(payload);
        else { await navigator.clipboard.writeText(payload.url); toast('Link copied to clipboard'); }
      } catch (e) { if (e.name !== 'AbortError') toast('Unable to share right now'); }
    });
    const links = [...document.querySelectorAll('.gjd-toc a')];
    const sections = links.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
    if ('IntersectionObserver' in window) {
      const obs = new IntersectionObserver(entries => entries.forEach(entry => {
        if (entry.isIntersecting) links.forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === `#${entry.target.id}`));
      }), {rootMargin:'-20% 0px -65% 0px'});
      sections.forEach(s => obs.observe(s));
    }
  }

  renderSEO();
  renderHero();
  renderStatus();
  renderCurrentStageCard();
  renderMetrics();
  renderQuickFacts();
  renderOverview();
  renderLifecycle();
  renderUpdateHistory();
  renderVacancy();
  renderEligibility();
  renderFees();
  renderSelection();
  renderDocs();
  renderGuidance();
  renderLinks();
  renderFaq();
  renderSchemas();
  syncStickyNavigation();
  syncMobileActionWithFooter();
  initInteractions();
  window.addEventListener('resize', syncStickyNavigation, {passive:true});
  setInterval(updateStageCountdown, 60000);
})();
