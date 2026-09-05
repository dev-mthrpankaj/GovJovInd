'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {prepare,search,safeUrl,normalize}=require('../JS/site-search.js');
const base='https://govjobupdates.com/';
const index=prepare(require('../data/site-search-index.json').items);
test('finds multiple public content types using real site queries',()=>{
  for(const [query,category] of [['UPSC CGSE','Jobs'],['Hindi typing','Typing'],['PDF merge','Tools'],['फोटो','Tools'],['income certificate','Tools'],['computer','Quizzes'],['SSC CGL','Articles']]) {
    const found=search(index,query,category);assert.ok(found.length,`${query}: ${category}`);assert.ok(found.every(x=>x.category===category));
  }
});
test('matches whole words and prefixes, not SSC inside JSSC',()=>{
  const rows=prepare([{title:'JSSC CGL 2026',url:'a',category:'Jobs'},{title:'SSC CGL 2026',url:'b',category:'Jobs'},{title:'SSC CHSL 2026',url:'c',category:'Jobs'}]);
  assert.deepEqual(search(rows,'SSC CGL').map(x=>x.url),['b']);
  assert.deepEqual(search(rows,'ssc chs').map(x=>x.url),['c']);
  assert.equal(search(rows,'ssc unknown').length,0);
});
test('Hindi vowels are preserved; Hindi and English aliases resolve together',()=>{
  assert.equal(normalize('हिंदी टाइपिंग'),'हिंदी टाइपिंग');
  assert.ok(search(index,'हिंदी टाइपिंग','Typing').length);
  assert.ok(search(index,'railway').length);
  assert.deepEqual(search(index,'रेलवे').map(x=>x.url),search(index,'railway').map(x=>x.url));
});
test('index has only same-site destinations and existing local pages',()=>{
  assert.ok(index.length>600);
  const keys=new Set();
  for(const item of index){
    assert.ok(safeUrl(item.url,base),item.url);
    const file=decodeURIComponent(new URL(item.url,base).pathname).slice(1);
    assert.ok(fs.existsSync(path.join(__dirname,'..',file)),file);
    const key=item.url+'|'+item.category;assert.ok(!keys.has(key),key);keys.add(key);
    assert.ok(!/admin|checkout|reset-password/i.test(file),file);
    assert.ok(!Object.hasOwn(item,'questions'));
  }
});
test('unsafe and external URLs are rejected, nested site roots work',()=>{
  for(const value of ['javascript:alert(1)','data:text/html,x','https://evil.example/','//evil.example/a','https://govjobupdates.com.evil.example/'])assert.equal(safeUrl(value,base),null);
  assert.equal(safeUrl('HTML/quiz.html',base),base+'HTML/quiz.html');
  assert.equal(safeUrl('../outside.html',base+'project/'),null);
  assert.equal(safeUrl('HTML/quiz.html',base+'project/'),base+'project/HTML/quiz.html');
});
test('empty queries and category filters remain usable; hostile text stays data',()=>{
  assert.equal(search(index,'','Typing').length,index.filter(x=>x.category==='Typing').length);
  assert.equal(search(index,'thisdoesnotexist12345').length,0);
  const rows=prepare([{title:'<img src=x onerror=alert(1)>',url:'HTML/quiz.html',category:'Quizzes'}]);
  assert.equal(search(rows,'img')[0].title,'<img src=x onerror=alert(1)>');
});

test('fresh Student Hub articles are searchable without rebuilding the bundled index',()=>{
  const vm=require('node:vm');const context={window:{}};
  vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../JS/blog-data.js'),'utf8'),context);
  const {articleRecords}=require('../JS/site-search.js');
  const live=articleRecords(context.window.GOVJOB_BLOGS,base);
  const gdp=live.find(x=>x.title.includes('GDP Growth 7.8%'));assert.ok(gdp);
  assert.equal(gdp.url,'HTML/student-hub/india-gdp-growth-7-8-controversy-q1-fy27-explained.html');
  assert.equal(gdp.live,true);
  // Deliberately use a stale snapshot that cannot know the new article.
  const stale=index.filter(x=>!x.url.includes('india-gdp-growth'));
  assert.ok(search(prepare([...stale,gdp]),'GDP','Articles').some(x=>x.url===gdp.url));
  assert.ok(search(prepare(live),'MoSPI','All').some(x=>x.url===gdp.url));
  const future=articleRecords([{title:'Future Economy Update',url:'student-hub/future.html',excerpt:'new economic indicators'}],base);
  assert.equal(search(prepare([...stale,...future]),'economic indicators','Articles')[0].url,'HTML/student-hub/future.html');
});
test('article catalogue rejects invalid/external URLs and supports nested deployment roots',()=>{
 const {articleRecords}=require('../JS/site-search.js');
 assert.equal(articleRecords([null,{title:'x',url:'javascript:alert(1)'},{title:'x',url:'https://evil.example/a'}],base).length,0);
 const rows=articleRecords([{title:'Article',url:'student-hub/a.html'}],base+'project/');
 assert.equal(rows[0].url,'HTML/student-hub/a.html');
});
