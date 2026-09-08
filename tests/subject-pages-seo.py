"""Static subject-page SEO and navigation regression checks (stdlib only)."""
from html.parser import HTMLParser
from pathlib import Path
import json,re
class Page(HTMLParser):
 def __init__(self,text):
  super().__init__();self.tags=[];self.feed(text)
 def handle_starttag(self,tag,attrs):self.tags.append((tag,dict(attrs)))
root=Path(__file__).resolve().parents[1]
slugs=['maths','reasoning','english','hindi','general-awareness','general-science','computer','current-affairs']
titles=set();descriptions=set()
for slug in slugs:
 p=root/'HTML'/f'{slug}-quizzes.html';text=p.read_text();page=Page(text);tags=page.tags
 ids=[a['id'] for _,a in tags if 'id' in a];assert len(ids)==len(set(ids)),p
 assert sum(t=='h1' for t,_ in tags)==1,p
 title=re.search(r'<title>(.*?)</title>',text)[1];assert title not in titles; titles.add(title)
 meta={a.get('name',a.get('property')):a.get('content') for t,a in tags if t=='meta'}
 assert meta['description'] not in descriptions;descriptions.add(meta['description'])
 assert 'noindex' not in meta['robots'];assert meta['og:title']==title
 url=f'https://govjobupdates.com/HTML/{slug}-quizzes.html'
 canonical=[a['href'] for t,a in tags if t=='link' and a.get('rel')=='canonical'];assert canonical==[url];assert meta['og:url']==url
 graph=json.loads(re.search(r'<script type="application/ld\+json">(.*?)</script>',text,re.S)[1])['@graph']
 assert graph[0]['url']==url and graph[1]['itemListElement'][-1]['item']==url
 for tag,a in tags:
  if 'aria-labelledby' in a:
   assert all(i in ids for i in a['aria-labelledby'].split()),(p,a)
  if tag=='a' and (href:=a.get('href')):
   if href.startswith('#'):assert href[1:] in ids,(p,href)
   elif not re.match(r'\w+:|//',href):assert (p.parent/href.split('#')[0].split('?')[0]).exists(),(p,href)
 for other in slugs:
  if other!=slug:assert f'href="{other}-quizzes.html"' in text,(p,other)
 assert url in (root/'sitemap-pages.xml').read_text(),p
 assert 'noscript' in text and 'data-subject-count-label' in text
 print(f'PASS {slug}: metadata, schema, headings, anchors, internal links, sitemap')
print('All eight subject pages passed.')
