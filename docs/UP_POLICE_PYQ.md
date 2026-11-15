# UP Police Previous Year Papers Collection

One hub page plus one page per exam family, all generated from a single data file.

| Page | File |
| --- | --- |
| Hub (all exams) | `HTML/student-hub/up-police-previous-year-question-papers.html` |
| Constable (incl. Jail Warder) | `HTML/student-hub/up-police-constable-previous-year-question-papers.html` |
| SI | `HTML/student-hub/up-police-si-previous-year-question-papers.html` |
| ASI / SI Confidential / Computer Operator | `HTML/student-hub/up-police-asi-previous-year-question-papers.html` |
| Home Guard | `HTML/student-hub/up-police-home-guard-previous-year-question-papers.html` |
| Fireman and other UPPRPB exams | `HTML/student-hub/up-police-other-exams-previous-year-question-papers.html` |

Do not edit these HTML files by hand. Edit `data/up-police-pyq.json` and regenerate.

## Add a paper

1. Upload the PDF to the file host (`https://files.govjobupdates.com/PYQPs/uppolice/`).
2. Add one object to `papers` in `data/up-police-pyq.json`:

```json
{
  "exam": "constable",
  "date": "2024-08-23",
  "shift": "Shift-1",
  "file": "uppoliceconstable23082024a.pdf",
  "details": "Question paper, 150 MCQs, Answer Key",
  "added": "2026-11-20"
}
```

| Field | Required | Meaning |
| --- | --- | --- |
| `exam` | yes | `constable`, `si`, `asi`, `home-guard` or `other` |
| `date` | yes | Exam date, `YYYY-MM-DD`. Decides the year group. |
| `file` | one of file/url | File name inside `settings.pdfBase` |
| `url` | one of file/url | Full `https://` link, used instead of `file` |
| `shift` | no | e.g. `Shift-1`. Added to the row name. |
| `title` | no | Replaces the automatic row name, e.g. `UP Police Fireman Exam` |
| `details` | no | Text of the "Paper / Details" column |
| `added` | no | Date you added the paper. Updates the page's "Updated" date and `dateModified`. |

3. Run:

```bash
npm run generate:up-police-pyq
```

4. Commit the changed files. The script prints which pages are indexable.

## Indexing rule (`noindexUntilPapers`)

While `settings.noindexUntilPapers` is `true`, a page with zero papers is generated with `noindex, follow`, so a page with an empty table does not hurt the site in search. It becomes indexable by itself as soon as it has one paper. Set the flag to `false` to index every page regardless.

## After the first papers go live

1. `npm run generate:sitemap` so the pages enter `sitemap-student-hub.xml`.
2. `npm run generate:search-index` (it reads tracked files, so commit the pages first).
3. Add the hub to `llms.txt` under "Student Resources".
4. Optionally `npm run submit:indexnow`.

## Add a new exam family

Add an object to `exams` in the JSON with `slug`, `file`, `short`, `name`, `tableLabel`, `keywords`, `metaDescription`, `dek`, `about`, `stages`, `patterns` and `faq`, and add a Hindi label for the slug in the `HINDI` map in `scripts/generate-up-police-pyq.js`. The hub, related-exam links and schema update automatically.

## Accuracy rule

UP Police pattern and marking scheme differ between cycles. Add a row to an exam's `patterns` only for a cycle you have checked in the official notification or a reliable report, and name the cycle in `cycle`. Do not state one fixed pattern for all years.
