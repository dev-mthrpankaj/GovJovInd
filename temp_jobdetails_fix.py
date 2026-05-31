import pathlib, re
folder = pathlib.Path('Job_Details/HTML')
files = sorted(folder.glob('*.html'))
logo_re = re.compile(r'(<img\b[^>]*class=["\']logo-img["\'][^>]*)(>)', re.I)
# alternate: favicon images without class
favicon_re = re.compile(r'(<img\b[^>]*src=["\'][^"\']*favicon-96x96\.png["\'][^>]*)(>)', re.I)
fa_link_re = re.compile(r'(<link\b[^>]*https://cdnjs.cloudflare.com/ajax/libs/font-awesome[^>]*>)', re.I)
preconnect_tag = '<link rel="preconnect" href="https://cdnjs.cloudflare.com">'
script_re = re.compile(r'(<script\b([^>]*?)src=["\']([^"\']+)["\']([^>]*)>)(</script>)', re.I)
skip_ldjson = re.compile(r'type=["\']application/ld\+json["\']', re.I)
module_re = re.compile(r'type=["\']module["\']', re.I)

updated = []
for f in files:
    text = f.read_text(encoding='utf-8')
    orig = text
    changes = []
    # Add width/height to logo-img
    def fix_logo(m):
        tag = m.group(1)
        if 'width=' in tag.lower() or 'height=' in tag.lower():
            return m.group(0)
        changes.append('logo-img-size')
        return tag + ' width="96" height="96"' + m.group(2)
    text = logo_re.sub(fix_logo, text)
    # Also catch favicon img without class
    def fix_fav(m):
        tag = m.group(1)
        if 'width=' in tag.lower() or 'height=' in tag.lower():
            return m.group(0)
        changes.append('favicon-size')
        return tag + ' width="96" height="96"' + m.group(2)
    text = favicon_re.sub(fix_fav, text)
    # Add preconnect above Font Awesome link if missing
    def add_preconnect(t):
        # if fa link not present, return
        m = fa_link_re.search(t)
        if not m:
            return t
        # check if preconnect exists right before
        start = m.start()
        pre = t[:start]
        if 'rel="preconnect" href="https://cdnjs.cloudflare.com"' in pre:
            return t
        # insert preconnect tag before the link (preserve newline)
        changes.append('fa-preconnect')
        return t[:start] + preconnect_tag + '\n' + t[start:]
    text = add_preconnect(text)
    # Add defer to plain script tags with src
    def fix_script(m):
        full = m.group(1)
        before_attrs = m.group(2) or ''
        src = m.group(3)
        after_attrs = m.group(4) or ''
        # skip ld+json and module
        attrs = (before_attrs + ' ' + after_attrs)
        if skip_ldjson.search(attrs):
            return m.group(0)
        if module_re.search(attrs):
            return m.group(0)
        if re.search(r'\bdefer\b', attrs, re.I):
            return m.group(0)
        changes.append('defer-scripts')
        # construct new opening tag with defer
        open_tag = full
        # insert defer before closing > of open_tag
        if open_tag.endswith('>'):
            open_tag = open_tag[:-1] + ' defer>'
        return open_tag + m.group(5)
    text = script_re.sub(fix_script, text)
    if text != orig:
        f.write_text(text, encoding='utf-8')
        updated.append((str(f), sorted(set(changes))))

for u,c in updated:
    print(u + ': ' + ', '.join(c))
print('Done. Updated {} files'.format(len(updated)))
