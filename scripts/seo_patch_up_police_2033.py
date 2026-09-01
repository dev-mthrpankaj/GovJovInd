from pathlib import Path

p = Path('Job_Details/HTML/2033-UP-Police_Constable-2026.html')
s = p.read_text(encoding='utf-8-sig')

repls = {
'<meta name="description" content="UP Police Constable, PAC and Jail Warder Recruitment 2025-26 update for 32,679 posts. Check exam schedule, admit card guidance, selection stages, eligibility and official UPPRPB links.">': '<meta name="description" content="UP Police Constable Recruitment 2025-26 update for 32,679 posts. Written result and final answer key released 31 July 2026; check DV/PST admit card, eligibility and official UPPRPB links.">',
'<meta property="article:modified_time" content="2026-08-27">': '<meta property="article:modified_time" content="2026-09-01">',
'<strong>Written Exam Completed</strong>\n        <p>The last date for online application and fee payment was <b>30-01-2026</b>. The written exam was scheduled on <b>08, 09 and 10 June 2026</b>; candidates should now follow UPPRPB notices for answer key, result and PET/PST instructions.</p>': '<strong>DV / PST Stage - Admit Card Released</strong>\n        <p>UPPRPB published the final answer key and the list/result of candidates qualified for <b>DV/PST on 31-07-2026</b>. DV/PST admit-card and process notices were published on <b>10-08-2026</b>. Qualified candidates should follow the official board portal for their schedule and instructions.</p>',
'<article><span>Written Exam</span><strong>08-10 June 2026</strong></article>': '<article><span>DV / PST Admit Card</span><strong>10-08-2026</strong></article>',
'<strong>Updated 27 August 2026:</strong> This page now serves as the main recruitment record after the written exam window. Track UP Police Constable answer key, result, physical test and document verification updates from official UPPRPB notices.': '<strong>Updated 1 September 2026:</strong> The written result/final answer key stage is complete. Candidates shortlisted by UPPRPB have moved to Document Verification and Physical Standard Test (DV/PST); admit-card and process notices were published on 10 August 2026.',
'<h4><i class="fas fa-link" aria-hidden="true"></i> Important Links & Notices</h4>': '<h4><i class="fas fa-link" aria-hidden="true"></i> Important Links & Notices</h4>\n            <a href="../../Result_Details/HTML/UP-Police-Constable-Result-2026.html"><i class="fas fa-square-poll-vertical" aria-hidden="true"></i> UP Police Constable Result 2026 Details</a>',
'<tr><td>City Intimation Slip</td><td>01-06-2026</td></tr>': '<tr><td>City Intimation Slip</td><td>01-06-2026</td></tr>\n                <tr><td>Final Answer Key / DV-PST Qualified List</td><td>31-07-2026</td></tr>\n                <tr><td>DV / PST Admit Card & Process Notice</td><td>10-08-2026</td></tr>'
}

for old, new in repls.items():
    if old not in s:
        raise SystemExit('Expected text not found: ' + old[:100])
    s = s.replace(old, new, 1)

p.write_text(s, encoding='utf-8')
print('Patched', p)
