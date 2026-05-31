import pathlib

preconnect = '<link rel="preconnect" href="https://cdnjs.cloudflare.com">'
errors = []
for d in [pathlib.Path('HTML'), pathlib.Path('Job_Details/HTML')]:
    if not d.exists():
        continue
    for f in sorted(d.glob('*.html')):
        lines = f.read_text(encoding='utf-8').splitlines()
        for i, line in enumerate(lines):
            if 'cdnjs.cloudflare.com' in line and 'font-awesome' in line:
                # find previous non-empty line index
                j = i-1
                while j>=0 and lines[j].strip()=='' : j-=1
                prev = lines[j].strip() if j>=0 else ''
                if prev != preconnect:
                    errors.append((str(f), i+1, prev, line.strip()))

if not errors:
    print('All Font Awesome links have preconnect immediately above.')
else:
    for ef in errors:
        print('MISSING PRECONNECT:', ef[0], 'line', ef[1])
        print('  previous line:', repr(ef[2]))
        print('  fa line     :', repr(ef[3]))
    print('Total problematic files:', len(errors))
