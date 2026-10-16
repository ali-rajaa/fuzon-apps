"""Turn pandoc's HTML of the owner's legal .docx into a Jekyll page body.
Wording is kept exactly; only structure changes (numbered headings as in
Word, tables with header rows, blockquote indentation removed) and the
document's placeholders are swapped for confirmed values or blanks.
usage: legal_build.py <pandoc.html> <out.html> <kind: privacy|terms>"""
import re, sys, html

src, out, kind = sys.argv[1], sys.argv[2], sys.argv[3]
s = open(src, encoding='utf8').read()

# 1. Document title block (the page layout supplies the H1).
s = re.sub(r'<h1[^>]*>.*?</h1>\s*', '', s, count=1, flags=re.S)
s = re.sub(r'<p><strong>(Fuzon Apps|FUZON APPS)</strong></p>\s*', '', s, count=1)
s = re.sub(r'<h2[^>]*>.*?</h2>\s*', '', s, count=1, flags=re.S)
# 2. Empty headings left by blank Word paragraphs.
s = re.sub(r'<h[1-6][^>]*>\s*</h[1-6]>\s*', '', s)
# 3. Pandoc wraps Word's indented paragraphs in blockquotes.
s = re.sub(r'\s*</?blockquote>\s*', '\n', s)
# 4. Two paragraphs split mid-sentence by page breaks in the .docx.
s = s.replace('IN THE 12</p>\n<p>MONTHS', 'IN THE 12 MONTHS')
s = s.replace('indemnification</p>\n<p>and governing law', 'indemnification and governing law')

# 5. Headings, numbered as Word numbers them.
app_ids = {
    'Cloud Storage': 'cloud-storage', 'Smart Switch – Data Transfer': 'smart-switch',
    'GPS Voice Navigation': 'gps-navigation', 'Terms Specific to Cloud Storage': 'cloud-storage',
    'Terms Specific to Smart Switch – Data Transfer': 'smart-switch',
    'Terms Specific to GPS Voice Navigation': 'gps-navigation',
}
def slug(t):
    t = html.unescape(t).lower().replace("'", '').replace('’', '')
    t = re.sub(r'[^a-z0-9]+', '-', t).strip('-')
    return t
sections, n, sub, used = [], 0, 0, set()
def heading(m):
    global n, sub
    level, text = m.group(1), m.group(2).strip()
    plain = html.unescape(re.sub(r'<[^>]+>', '', text))
    hid = app_ids.get(plain) or slug(plain)
    while hid in used: hid += '-2'
    used.add(hid)
    if level == '3':
        n += 1; sub = 0
        sections.append((hid, f'{n}. {plain}'))
        return f'<h2 id="{hid}"><span class="legal-num">{n}.</span> {text}</h2>'
    if kind == 'terms' and plain == 'Safety notice':
        return f'<h3 id="{hid}" class="legal-callout-title">{text}</h3>'
    sub += 1
    return f'<h3 id="{hid}"><span class="legal-num">{n}.{sub}</span> {text}</h3>'
s = re.sub(r'<h([34])[^>]*>(.*?)</h\1>', heading, s, flags=re.S)
# Terms: the safety notice and its paragraph form one callout.
s = re.sub(r'(<h3 id="safety-notice"[^>]*>.*?</h3>)\s*(<p>.*?</p>)',
           r'<div class="legal-callout">\1\n\2</div>', s, flags=re.S)

# 6. Tables: header row from the bold first row, no widths, scroll box.
def table(m):
    t = m.group(0)
    t = re.sub(r'<colgroup>.*?</colgroup>\s*', '', t, flags=re.S)
    t = re.sub(r'<tr class="[^"]*">', '<tr>', t)
    first = re.search(r'<tbody>\s*(<tr>.*?</tr>)', t, flags=re.S)
    head = first.group(1)
    head2 = re.sub(r'<td><strong>(.*?)</strong></td>', r'<th scope="col">\1</th>', head)
    t = t.replace('<tbody>\n' + head, '<thead>\n' + head2 + '\n</thead>\n<tbody>', 1)
    before = s[:m.start()]
    label = re.findall(r'<h[23] id="[^"]+"[^>]*>(?:<span class="legal-num">[^<]*</span> )?(.*?)</h[23]>', before)
    name = html.unescape(re.sub(r'<[^>]+>', '', label[-1])) if label else 'Table'
    return (f'<section class="table-scroll" tabindex="0" aria-label="{html.escape(name)} (table, scrolls sideways)">\n'
            + t + '\n</section>')
s = re.sub(r'<table>.*?</table>', table, s, flags=re.S)

# 7. Placeholders and the company name (one source: _config.yml / _data/legal.yml).
mail = '<a href="mailto:{{ site.company.support_email }}">{{ site.company.support_email }}</a>'
subs = [
    ('[privacy@yourcompany.com]', mail), ('[dmca@yourcompany.com]', mail),
    ('fuzon.apps@gmail.com', mail),
    ('[Company Name]', '{{ site.company.legal_name }}'), ('[COMPANY NAME]', '{{ site.company.legal_name }}'),
    ('FUZON APS PTY LIMITED', '{{ site.company.legal_name }}'),
    ('[or by binding arbitration under (Arbitration Rules)]', '{% include legal-field.html value=site.data.legal.arbitration %}'),
    ('[Country/State]', '{% include legal-field.html value=site.data.legal.governing_law %}'),
    ('[Jurisdiction]', '{% include legal-field.html value=site.data.legal.jurisdiction %}'),
]
for a, b in subs:
    s = s.replace(a, b)
left = re.findall(r'\[[^\]]{2,60}\]', s)
if left: print('UNHANDLED PLACEHOLDERS:', left, file=sys.stderr)

s = s.replace('<br />', '<br>')
s = re.sub(r'\n{2,}', '\n', s).strip() + '\n'
open(out, 'w', encoding='utf8').write(s)
print('sections:')
for hid, label in sections:
    print(f'  - id: "{hid}"\n    label: {label!r}'.replace("'", '"') if '"' not in label else f'  - id: "{hid}"\n    label: {label!r}')
