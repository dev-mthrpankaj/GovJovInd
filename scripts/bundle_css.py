import pathlib, re

ROOT = pathlib.Path('.').resolve()
inputs = [pathlib.Path('CSS/style.css'), pathlib.Path('Job_Details/CSS/job-details.css'), pathlib.Path('Job_Details/CSS/lekhpal-mobile-fix.css')]
output = pathlib.Path('dist/css/main.min.css')
output.parent.mkdir(parents=True, exist_ok=True)

parts = []
for p in inputs:
    if not p.exists():
        print(f'Warning: input not found: {p}')
        continue
    s = p.read_text(encoding='utf-8')
    parts.append(f'/* ---- {p.as_posix()} ---- */\n' + s + '\n')

combined = '\n'.join(parts)
# Remove /* ... */ comments
combined = re.sub(r'/\*.*?\*/', '', combined, flags=re.S)
# Remove HTML-style comments if any
combined = re.sub(r'<!--.*?-->', '', combined, flags=re.S)
# Collapse whitespace: remove newlines and leading/trailing spaces
combined = re.sub(r'\s+', ' ', combined)
# Remove space around symbols
combined = re.sub(r'\s*([{}:;,>+~])\s*', r'\1', combined)
# Remove unnecessary semicolons before }
combined = re.sub(r';}', '}', combined)
# Trim
combined = combined.strip() + '\n'

output.write_text(combined, encoding='utf-8')
print('Wrote', output)
print('Size bytes:', output.stat().st_size)
