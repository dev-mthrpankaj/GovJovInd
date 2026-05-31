import pathlib, re

target_dirs = [pathlib.Path('HTML'), pathlib.Path('Job_Details/HTML')]
fa_pattern = re.compile(r'https?://cdnjs\.cloudflare\.com/.+font-awesome.+\.css', re.I)
preconnect_tag = '<link rel="preconnect" href="https://cdnjs.cloudflare.com">'

updated_files = []
for d in target_dirs:
    if not d.exists():
        continue
    for f in sorted(d.glob('*.html')):
        s = f.read_text(encoding='utf-8')
        new_s = s
        for m in fa_pattern.finditer(s):
            start = m.start()
            # find start of the line containing the FA link
            line_start = s.rfind('\n', 0, start) + 1
            line_end = s.find('\n', start)
            if line_end == -1:
                line_end = len(s)
            fa_line = s[line_start:line_end]
            # check previous non-empty line
            prev_line_end = line_start - 1
            prev_line_start = s.rfind('\n', 0, prev_line_end) + 1
            prev_line = s[prev_line_start:prev_line_end].strip()
            # If prev_line already contains preconnect with cdnjs, ensure it's immediately above
            if prev_line == preconnect_tag:
                continue
            # Insert preconnect with same indentation as FA line
            indent = re.match(r'\s*', fa_line).group(0)
            insert = indent + preconnect_tag + '\n'
            new_s = new_s[:line_start] + insert + new_s[line_start:]
            # Update offsets for subsequent matches by adjusting s to new_s
            s = new_s
        if new_s != f.read_text(encoding='utf-8'):
            f.write_text(new_s, encoding='utf-8')
            updated_files.append(str(f))

for uf in updated_files:
    print('Updated:', uf)
print('Done. Total updated:', len(updated_files))
