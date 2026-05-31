import pathlib, re

target_dirs = [pathlib.Path('.'), pathlib.Path('HTML'), pathlib.Path('Job_Details/HTML')]
script_issue = []
font_issue = []
for d in target_dirs:
    if not d.exists():
        continue
    for f in sorted(d.glob('*.html')):
        s = f.read_text(encoding='utf-8')
        # find external scripts without defer/async and not module
        for m in re.finditer(r'<script[^>]*src=["\']([^"\']+)["\'][^>]*>', s, re.I):
            tag = m.group(0)
            low = tag.lower()
            if 'type="module"' in low or "type='module'" in low or 'type=module' in low:
                continue
            if 'defer' in low or 'async' in low:
                continue
            script_issue.append((str(f), tag.strip()))
        # find font links still stylesheet
        for m in re.finditer(r'<link[^>]+href=["\']([^"\']+)["\'][^>]*>', s, re.I):
            href = m.group(1)
            tag = m.group(0)
            if 'fonts.googleapis.com' in href or 'cdnjs.cloudflare.com' in href:
                # check if rel=preload
                if 'rel="preload"' in tag or "rel='preload'" in tag:
                    continue
                # if inside noscript, ignore
                start = m.start()
                # crude check for surrounding noscript
                before = s[:start][-20:]
                if '<noscript>' in before:
                    continue
                if 'rel=' in tag and 'stylesheet' in tag.lower():
                    font_issue.append((str(f), href, tag.strip()))

print('Script issues (should be 0):', len(script_issue))
for it in script_issue[:20]:
    print(' -', it[0], it[1])
print('Font stylesheet issues (should be 0):', len(font_issue))
for it in font_issue[:20]:
    print(' -', it[0], it[1])
