(function (root) {
  'use strict';
  const normalize = value => String(value || '').normalize('NFKC').toLowerCase().replace(/[^\p{L}\p{N}\p{M}]+/gu, ' ').replace(/\s+/g, ' ').trim();
  const aliases = {naukri:'jobs',naukari:'jobs',नौकरी:'jobs',भर्ती:'recruitment',परिणाम:'results',रिजल्ट:'results',प्रवेश:'admit',पत्र:'card',टाइपिंग:'typing',क्विज:'quiz',गणित:'mathematics',maths:'mathematics',math:'mathematics',रीजनिंग:'reasoning',हिंदी:'hindi',अंग्रेजी:'english',रेलवे:'railway',rrb:'railway',पुलिस:'police',दस्तावेज:'documents',फोटो:'photo',प्रमाण:'certificate',aay:'income',आय:'income'};
  function words(value) { return normalize(value).split(' ').filter(Boolean).map(w => aliases[w] || w); }
  function prepare(items) {
    return items.filter(x=>x && typeof x.title==='string' && typeof x.url==='string').map(item=>({...item,_title:words(item.title).join(' '),_category:words(item.category).join(' '),_text:words(`${item.title} ${item.description||''} ${item.keywords||''} ${item.category||''}`).join(' ')}));
  }
  function search(items, query, category='All') {
    const tokens=words(query).slice(0,12), phrase=tokens.join(' ');
    return items.filter(x=>category==='All'||x.category===category).map(item=>{
      if (!tokens.length) return {item,score:0};
      const contains=(text,token)=>text.split(' ').some(word=>word.startsWith(token));
      if (!tokens.every(t=>contains(item._text,t))) return null;
      const score=(item._title===phrase?150:0)+((` ${item._title} `).includes(` ${phrase} `)?60:0)+tokens.reduce((n,t)=>n+(contains(item._title,t)?12:0)+(contains(item._category,t)?4:0),0);
      return {item,score};
    }).filter(Boolean).sort((a,b)=>b.score-a.score||a.item.title.localeCompare(b.item.title)).map(x=>x.item);
  }
  function safeUrl(value, base) {
    try {const url=new URL(value,base);return /^https?:$/.test(url.protocol)&&url.origin===new URL(base).origin&&url.pathname.startsWith(new URL(base).pathname)?url.href:null;}catch{return null;}
  }
  function articleRecords(rows, base) {
    return (Array.isArray(rows)?rows:[]).flatMap(row=>{
      if(!row || typeof row.title!=='string' || !row.title.trim() || typeof row.url!=='string')return [];
      let href;try{href=new URL(row.url,new URL('HTML/',base)).href;}catch{return [];}
      const safe=safeUrl(href,base);if(!safe)return [];
      return [{title:row.title,url:safe.slice(new URL(base).href.length),category:'Articles',description:String(row.excerpt||row.description||'').slice(0,260),keywords:[row.category,...(Array.isArray(row.tags)?row.tags:[])].filter(Boolean).join(' '),live:true}];
    });
  }
  const api={normalize,prepare,search,safeUrl,articleRecords};
  if (typeof module==='object' && module.exports) {module.exports=api;return;}
  if (!root.document || root.GJUSiteSearch) return;
  root.GJUSiteSearch=api;
  const document=root.document;
  const base=new URL('../',document.currentScript.src);
  const categories=['All','Jobs','Admit Cards','Answer Keys','Results','Quizzes','Typing','Articles','Tools','Pages'];
  const quick=[
    {title:'Latest Government Jobs',url:'HTML/latest-jobs.html',category:'Jobs'},
    {title:'Free Quiz Practice',url:'HTML/quiz.html',category:'Quizzes'},
    {title:'Hindi & English Typing Tests',url:'typing-test/index.html',category:'Typing'},
    {title:'Photo, Signature & PDF Tools',url:'HTML/documents.html',category:'Tools'},
    {title:'Rank Predictor',url:'HTML/rank-predictor.html',category:'Tools'},
    {title:'Student Hub',url:'HTML/student-hub.html',category:'Articles'}
  ];
  let indexed=[], pending=null, loaded=false, failed=false, remoteState='', remoteStarted=false, listingsStarted=false, category='All', limit=30;
  let trigger,dialog,input,results,status,more,filters,retry,previousFocus,debounce;
  function node(tag,cls,text) {const n=document.createElement(tag);if(cls)n.className=cls;if(text)n.textContent=text;return n;}
  function render() {
    if (!dialog?.open) return;
    const query=input.value.trim();
    const matches=search(indexed.length?indexed:prepare(quick),query,category);
    const list=(!query && category==='All')||(failed&&!matches.length)?prepare(quick):matches;
    results.replaceChildren();
    for(const item of list.slice(0,limit)) {
      const url=safeUrl(item.url,base);if(!url)continue;
      const li=node('li'),a=node('a','gju-search-result');a.href=url;
      const text=node('span','gju-search-result-copy');text.append(node('strong','',item.title));
      if(item.description)text.append(node('span','gju-search-description',item.description));
      a.append(text,node('span','gju-search-category',item.category));li.append(a);results.append(li);
    }
    if (!list.length) results.append(node('li','gju-search-empty',loaded?'No matches. Try an exam name, subject or tool, or choose All.':failed?'The full search index could not load. Try again, or use a quick link.':'Searching the website…'));
    status.textContent=failed?'Some search results are unavailable. Try again.':!loaded?'Loading website search…':(!query&&category==='All'?'Popular destinations':`${matches.length} result${matches.length===1?'':'s'}${query?` for “${query}”`:''}`)+(remoteState?` · ${remoteState}`:'');
    results.setAttribute('aria-busy',String(!loaded&&!failed));
    more.hidden=(!query&&category==='All')||list.length<=limit;
    retry.hidden=!failed;
  }
  async function loadIndex() {
    if(loaded||pending)return pending;
    failed=false;render();
    pending=(async()=>{
      const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),10000);
      try {
        const response=await fetch(new URL('data/site-search-index.json',base),{signal:controller.signal,cache:'no-cache',credentials:'same-origin'});
        if(!response.ok)throw Error('Index unavailable');
        const data=await response.json();if(data.version!==1||!Array.isArray(data.items))throw Error('Invalid index');
        const remote=indexed.filter(x=>x.remote||x.live);
        const merged=new Map(data.items.filter(x=>safeUrl(x.url,base)).map(x=>[x.url+'|'+x.category,x]));
        remote.forEach(x=>merged.set(x.url+'|'+x.category,x));indexed=prepare([...merged.values()]);loaded=true;
      }catch{failed=true;}finally{clearTimeout(timer);pending=null;render();}
    })();return pending;
  }
  function loadPublicListings() {
    if(listingsStarted)return;
    listingsStarted=true;
    const sources=[
      ['jobs-data.js','GovJobUpdatesJobs','Jobs','HTML/latest-jobs.html'],
      ['admitcard-data.js','GovJobUpdatesAdmitCards','Admit Cards','HTML/admitcard.html'],
      ['answerkey-data.js','GovJobUpdatesAnswerKeys','Answer Keys','HTML/answer-key.html'],
      ['results-data.js','GovJobUpdatesResults','Results','HTML/results.html'],
      ['blog-data.js','GOVJOB_BLOGS','Articles','HTML/student-hub.html']
    ];
    for(const [file,globalName,group,fallback] of sources) {
      const apply=()=>{
        const rows=root[globalName];if(!Array.isArray(rows))return;
        const merged=new Map(indexed.map(x=>[x.url+'|'+x.category,x]));
        if(group==='Articles'){
          articleRecords(rows,base).forEach(item=>merged.set(item.url+'|'+item.category,item));
          indexed=prepare([...merged.values()]);render();return;
        }
        for(const row of rows) {
          if(!row || typeof row.title!=='string')continue;
          let href;
          try{href=row.detailPage?new URL(row.detailPage,new URL('HTML/',base)).href:null;}catch{href=null;}
          const safe=href && safeUrl(href,base);
          const url=safe?new URL(safe).href.slice(base.href.length):fallback+'?q='+encodeURIComponent(row.title);
          const key=url+'|'+group,old=merged.get(key);
          merged.set(key,{title:row.title,url,category:group,description:String(row.organization||row.description||old?.description||'').slice(0,260),keywords:[old?.keywords,row.department,row.category,row.qualification,...(Array.isArray(row.tags)?row.tags:[])].filter(Boolean).join(' '),live:true});
        }
        indexed=prepare([...merged.values()]);render();
      };
      if(Array.isArray(root[globalName])){apply();continue;}
      const src=new URL('JS/'+file,base).href;
      let script=[...document.scripts].find(x=>x.src.split('?')[0]===src);
      const owned=!script;
      if(!script){script=document.createElement('script');script.src=src+'?v='+Math.floor(Date.now()/300000);script.async=true;}
      script.addEventListener('load',apply,{once:true});
      // A failed live source leaves the bundled search index usable.
      if(owned)document.head.append(script);
    }
  }
  function getRemoteItems() {
    const payload=root.GJU_QUIZ_INDEX||root.GJU_ADMIN_QUIZ_INDEX||root.GJU_PUBLISHED_QUIZ_INDEX;
    return Array.isArray(payload)?payload:payload?.quizzes||payload?.items||payload?.data||null;
  }
  function addRemote(items) {
    if(!Array.isArray(items))return;
    const slug=v=>String(v||'').toLowerCase().trim().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'');
    const entries=items.filter(x=>x&&String(x.status||x.publishStatus||'published').toLowerCase()==='published').map(x=>{
      const subject=slug(x.subjectSlug||x.subject_slug||x.subject?.slug||x.subject||'practice');
      const quiz=slug(x.quizSlug||x.quiz_slug||x.slug||x.id||x.title||'quiz');
      const id=`admin-${subject}-${quiz}`.replace(/-+/g,'-');
      const family=String(x.examFamilySlug||x.exam_family_slug||x.examFamily?.slug||x.exam_family?.slug||'').toLowerCase();
      const familyQuery=['ssc','banking','police','rrb'].includes(family)?`&family=${encodeURIComponent(family)}`:'';
      return {title:String(x.title||x.quizTitle||x.quiz_title||quiz),url:`HTML/quiz-attempt.html?quiz=${encodeURIComponent(id)}${familyQuery}`,category:'Quizzes',description:String(x.description||x.summary||'Published practice quiz').slice(0,260),keywords:`${subject} ${x.subjectName||x.subject_name||''} ${x.examFamilySlug||x.exam_family_slug||x.examFamily?.slug||x.exam_family?.slug||''} ${Array.isArray(x.tags)?x.tags.join(' '):''}`,remote:true};
    });
    const merged=new Map(indexed.map(x=>[x.url+'|'+x.category,x]));entries.forEach(x=>merged.set(x.url+'|'+x.category,x));indexed=prepare([...merged.values()]);remoteState='';render();
  }
  function loadRemote() {
    if(remoteStarted)return;remoteStarted=true;
    const existing=getRemoteItems();if(existing){addRemote(existing);return;}
    remoteState='Loading latest quizzes';
    // The same public metadata endpoint used by the quiz catalogue; no questions are loaded.
    const src='https://test.govjobupdates.com/live-test/quiz-data/quiz-index.js';
    let script=[...document.scripts].find(s=>s.src.split('?')[0]===src),owned=!script,done=false;
    if(!script){script=document.createElement('script');script.src=src+'?v='+Math.floor(Date.now()/300000);script.async=true;}
    const finish=()=>{if(done)return;done=true;clearTimeout(timer);const items=getRemoteItems();if(items)addRemote(items);else{remoteState='Latest quizzes unavailable';render();}};
    const timer=setTimeout(finish,8000);script.addEventListener('load',finish,{once:true});script.addEventListener('error',finish,{once:true});
    if(owned)document.head.append(script);
  }
  function openSearch() {
    if(dialog.open){input.focus();return;}
    previousFocus=document.activeElement;
    // Close an expanded mobile menu through its own handler before opening the modal.
    const menu=document.querySelector('header .menu-toggle[aria-expanded="true"]');menu?.click();
    dialog.showModal();document.documentElement.classList.add('gju-site-search-open');trigger.setAttribute('aria-expanded','true');input.focus();render();loadIndex();loadRemote();loadPublicListings();
  }
  function init() {
    const header=document.querySelector('header .header-container');
    if(!header||typeof HTMLDialogElement==='undefined'||!HTMLDialogElement.prototype.showModal)return;
    trigger=node('button','gju-search-trigger');trigger.type='button';trigger.setAttribute('aria-label','Search GovJobUpdates');trigger.setAttribute('aria-haspopup','dialog');trigger.setAttribute('aria-expanded','false');trigger.setAttribute('aria-controls','gju-site-search');
    trigger.innerHTML='<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></svg><span>Search</span>';
    dialog=node('dialog','gju-site-search');dialog.id='gju-site-search';dialog.setAttribute('aria-labelledby','gju-search-title');
    const top=node('div','gju-search-top');const title=node('h2','','Search GovJobUpdates');title.id='gju-search-title';const close=node('button','gju-search-close','×');close.type='button';close.setAttribute('aria-label','Close search');close.addEventListener('click',()=>dialog.close());top.append(title,close);
    const form=node('form','gju-search-form');form.setAttribute('role','search');const label=node('label','gju-search-label','Search jobs, exams, quizzes, articles and tools');label.htmlFor='gju-search-input';
    input=node('input');input.id='gju-search-input';input.type='search';input.placeholder='Try “SSC CGL”, “typing” or “PDF”';input.autocomplete='off';input.maxLength=160;input.setAttribute('enterkeyhint','search');input.setAttribute('aria-controls','gju-search-results');
    const submit=node('button','gju-search-submit','Search');submit.type='submit';const field=node('div','gju-search-field');field.append(input,submit);form.append(label,field);
    filters=node('div','gju-search-filters');filters.setAttribute('role','group');filters.setAttribute('aria-label','Filter search results');
    for(const name of categories){const button=node('button','',name);button.type='button';button.setAttribute('aria-pressed',String(name==='All'));button.addEventListener('click',()=>{category=name;limit=30;[...filters.children].forEach(b=>b.setAttribute('aria-pressed',String(b===button)));render();});filters.append(button);}
    status=node('p','gju-search-status');status.setAttribute('role','status');status.setAttribute('aria-live','polite');
    results=node('ul','gju-search-results');results.id='gju-search-results';
    more=node('button','gju-search-more','Show more results');more.type='button';more.hidden=true;more.addEventListener('click',()=>{const count=results.children.length;limit+=30;render();results.children[count]?.querySelector('a')?.focus();});
    retry=node('button','gju-search-more','Retry search');retry.type='button';retry.hidden=true;retry.addEventListener('click',()=>loadIndex());
    dialog.append(top,form,filters,status,retry,results,more);document.body.append(dialog);header.insertBefore(trigger,header.querySelector('.header-auth-actions')); header.classList.add('gju-has-search');
    trigger.addEventListener('click',openSearch);
    dialog.addEventListener('close',()=>{document.documentElement.classList.remove('gju-site-search-open');trigger.setAttribute('aria-expanded','false');(previousFocus?.isConnected?previousFocus:trigger).focus();});
    dialog.addEventListener('click',event=>{if(event.target!==dialog)return;const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();});
    input.addEventListener('input',()=>{clearTimeout(debounce);debounce=setTimeout(()=>{limit=30;render();},120);});
    input.addEventListener('keydown',event=>{if(event.key==='ArrowDown'){event.preventDefault();results.querySelector('a')?.focus();}});
    results.addEventListener('keydown',event=>{if(!['ArrowDown','ArrowUp'].includes(event.key))return;const links=[...results.querySelectorAll('a')],i=links.indexOf(document.activeElement);if(i<0)return;event.preventDefault();if(event.key==='ArrowUp'&&i===0)input.focus();else links[Math.max(0,Math.min(links.length-1,i+(event.key==='ArrowDown'?1:-1)))].focus();});
    form.addEventListener('submit',event=>{event.preventDefault();clearTimeout(debounce);limit=30;render();results.querySelector('a')?.focus();});
    document.addEventListener('keydown',event=>{if((event.ctrlKey||event.metaKey)&&event.key.toLowerCase()==='k'&&!event.altKey){const target=event.target;if(!dialog.open&&target.closest('input,textarea,select,[contenteditable="true"]'))return;event.preventDefault();openSearch();}});
    // Remove the redundant hero search only after the shared replacement is usable.
    const heroSearch=document.querySelector('.home-page #homeSearchForm');if(heroSearch)(heroSearch.closest('.home-search-panel')||heroSearch).remove();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})(typeof window==='undefined'?globalThis:window);
