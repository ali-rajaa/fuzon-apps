"""Check a built legal page against the owner's .docx, paragraph by
paragraph. Allowed differences: the placeholder swaps below, and the two
page-break splits joined. usage: legal_verify.py <document.xml> <built.html>"""
import re, sys, html
docxml, built = sys.argv[1], sys.argv[2]
x = open(docxml, encoding='utf8').read()
paras = [html.unescape(''.join(re.findall(r'<w:t(?: [^>]*)?>([^<]*)</w:t>', p)))
         for p in re.findall(r'<w:p\b.*?</w:p>', x, flags=re.S)]
paras = [p for p in paras if p.strip()]
page = open(built, encoding='utf8').read()
main = re.search(r'<div class="prose legal-body">(.*?)<aside class="legal-company"', page, flags=re.S).group(1)
inline = r'</?(?:strong|em|a|span|time|br)\b[^>]*>'
main = re.sub(r'<span class="legal-blank">.*?</span></span>', 'to be confirmed', main, flags=re.S)
main = re.sub(inline, '', main)
text = html.unescape(re.sub(r'<[^>]+>', ' ', main))
norm = lambda t: re.sub(r'\s+', ' ', t).strip()
text = norm(text)
swap = [('[privacy@yourcompany.com]', 'console@fuzonapps.com'), ('[dmca@yourcompany.com]', 'console@fuzonapps.com'),
        ('fuzon.apps@gmail.com', 'console@fuzonapps.com'), ('[Company Name]', 'FUZON APS PTY LIMITED'),
        ('[COMPANY NAME]', 'FUZON APS PTY LIMITED'), ('[Country/State]', 'to be confirmed'),
        ('[Jurisdiction]', 'to be confirmed'), ('[or by binding arbitration under (Arbitration Rules)]', 'to be confirmed')]
skip = {'Privacy Policy', 'Terms of Service', 'Fuzon Apps', 'FUZON APPS'}
missing, checked = [], 0
joined = []
for p in paras:  # rejoin the two page-break splits
    if joined and (p.startswith('MONTHS BEFORE') or p.startswith('and governing law')):
        joined[-1] += ' ' + p
    else:
        joined.append(p)
for p in joined:
    q = norm(p)
    if q in skip: continue
    for a, b in swap: q = q.replace(a, b)
    checked += 1
    if q not in text: missing.append(q[:120])
print(f'{built.split("/")[-1]}: {checked} paragraphs checked, {len(missing)} missing')
for m in missing: print('  MISSING:', m)
sys.exit(1 if missing else 0)
