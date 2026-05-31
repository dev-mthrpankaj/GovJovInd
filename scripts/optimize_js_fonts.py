import pathlib, re

target_dirs = [pathlib.Path('.'), pathlib.Path('HTML'), pathlib.Path('Job_Details/HTML')]
fa_pattern = re.compile(r'<link[^>]+href=["\'](https?://cdnjs\.cloudflare\.com/[^"\']*font-awesome[^"\']*)["\'][^>]*>', re.I)
fonts_pattern = re.compile(r'<link[^>]+href=["\'](https?://fonts\.googleapis\.com/[^"\']*)["\'][^>]*rel=["\']?stylesheet["\']?[^>]*>', re.I)
script_pattern = re.compile(r'<script([^>]*)src=["\']([^"\']+)["\']([^>]*)>(\s*</script>)?', re.I)

updated_files = []
for d in target_dirs:
    if not d.exists():
        continue
    for f in sorted(d.glob('*.html')):
        s = f.read_text(encoding='utf-8')
        orig = s
        # Replace FA links
        def fa_repl(m):
            href = m.group(1)
            tag = m.group(0)
            if 'rel="preload"' in tag or "rel='preload'" in tag:
                return tag
            preload = f'<link rel="preload" as="style" href="{href}" onload="this.onload=null;this.rel=\'stylesheet\'">'
            noscript = f'<noscript><link rel="stylesheet" href="{href}"></noscript>'
            return preload + '\n    ' + noscript
        s = fa_pattern.sub(fa_repl, s)
        # Replace Google fonts links
        def fonts_repl(m):
            href = m.group(1)
            tag = m.group(0)
            if 'rel="preload"' in tag or "rel='preload'" in tag:
                return tag
            preload = f'<link rel="preload" as="style" href="{href}" onload="this.onload=null;this.rel=\'stylesheet\'">'
            noscript = f'<noscript><link rel="stylesheet" href="{href}"></noscript>'
            return preload + '\n    ' + noscript
        s = fonts_pattern.sub(fonts_repl, s)
        # Add defer to plain scripts (skip type=module, skip if already defer/async)
        def script_repl(m):
            before = m.group(1) or ''
            src = m.group(2)
            after = m.group(3) or ''
            closing = m.group(4) or ''
            full = m.group(0)
            low = full.lower()
            if 'type=\'module\'' in low or 'type="module"' in low or 'type=module' in low:
                return full
            if 'defer' in low or 'async' in low:
                return full
            # preserve existing attributes; insert defer before closing bracket
            attrs = (before + ' src="' + src + '"' + after).strip()
            # Clean up spaces
            new_tag = '<script ' + attrs
            if new_tag.endswith('/'):
                new_tag = new_tag[:-1]
            new_tag = new_tag + ' defer>'
            # add closing if present
            new_tag = new_tag + (closing or '</script>')
            return new_tag
        s = script_pattern.sub(script_repl, s)
        if s != orig:
            f.write_text(s, encoding='utf-8')
            updated_files.append(str(f))

for uf in updated_files:
    print('Updated:', uf)
print('Done. Total updated:', len(updated_files))
