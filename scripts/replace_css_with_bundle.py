import pathlib, re, os

target_dirs = [pathlib.Path('HTML'), pathlib.Path('Job_Details/HTML')]
patterns = [
    re.compile(r"href\s*=\s*([\"'])(?:\.\./)*CSS/style\.css\1", re.I),
    re.compile(r"href\s*=\s*([\"'])(?:\.\./)*CSS/job-details\.css\1", re.I),
    re.compile(r"href\s*=\s*([\"'])(?:\.\./)*CSS/lekhpal-mobile-fix\.css\1", re.I),
]
link_tag_re = re.compile(r'<link[^>]+rel=["\']stylesheet["\'][^>]*>', re.I)

updated = []
for d in target_dirs:
    if not d.exists():
        continue
    for f in sorted(d.glob('*.html')):
        s = f.read_text(encoding='utf-8')
        head_start = s.lower().find('<head')
        if head_start == -1:
            continue
        head_end = s.lower().find('</head>', head_start)
        if head_end == -1:
            continue
        head = s[head_start:head_end]
        matches = []
        # find exact link tags in head that reference these files
        for m in link_tag_re.finditer(head):
            tag = m.group(0)
            for p in patterns:
                if p.search(tag):
                    matches.append((m.start(), m.end(), tag))
                    break
        if not matches:
            continue
        # Determine insertion point: use the first match's start
        matches.sort()
        insert_pos_in_head = matches[0][0]
        # Build new href relative path from this file's directory to dist/css/main.min.css
        target = (pathlib.Path('dist')/ 'css' / 'main.min.css').resolve()
        rel = os.path.relpath(str(target), start=str(f.parent.resolve()))
        rel = rel.replace('\\','/')
        new_link = f'<link rel="stylesheet" href="{rel}">'
        # Remove all matched tags from head (replace with empty)
        new_head = head
        # To avoid shifting indices, remove from end
        for start,end,tag in sorted(matches, key=lambda x:x[0], reverse=True):
            new_head = new_head[:start] + new_head[end:]
        # Insert new_link at insert_pos_in_head
        new_head = new_head[:insert_pos_in_head] + new_link + '\n' + new_head[insert_pos_in_head:]
        new_s = s[:head_start] + new_head + s[head_end:]
        if new_s != s:
            f.write_text(new_s, encoding='utf-8')
            updated.append(str(f))

for u in updated:
    print('Updated:', u)
print('Done. Total updated:', len(updated))
