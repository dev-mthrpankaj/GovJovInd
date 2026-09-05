# Long typing passages added September 2026

These are 36 distinct literary excerpts, not newly authored news articles or official examination papers. Each contains approximately 4,000 whitespace-delimited words. An excerpt ends at a paragraph boundary; it is not necessarily a complete chapter or story.

## Original works

| Work | Author | Original publication | Text source |
| --- | --- | --- | --- |
| The Wonderful Wizard of Oz | L. Frank Baum (1856–1919) | 1900 | [Text](https://github.com/GITenberg/The-Wonderful-Wizard-of-Oz_55/blob/master/55.txt) |
| The Secret Garden | Frances Hodgson Burnett (1849–1924) | 1911 | [Text](https://github.com/GITenberg/The-Secret-Garden_113/blob/master/113.txt) |
| Pride and Prejudice | Jane Austen (1775–1817) | 1813 | [Text](https://github.com/GITenberg/Pride-and-Prejudice_1342/blob/master/1342.txt) |
| निर्मला | प्रेमचंद (1880–1936) | 1927 | [Text](https://github.com/gayatrivenugopal/Hindi-Aesthetics-Corpus/blob/master/Corpus/निर्मला) |
| अधखिला फूल | अयोध्या सिंह उपाध्याय हरिऔध (1865–1947) | 1907 | [Text](https://github.com/gayatrivenugopal/Hindi-Aesthetics-Corpus/blob/master/Corpus/अधखिला-फूल) |

The original works are in the public domain in India and the United States as of 2026. No modern translations, annotations or editorial introductions are included. Source repository availability alone was not treated as permission to reuse modern works in those repositories.

## Preparation and difficulty

English excerpts omit ebook packaging, tables of contents and chapter headings. Whitespace is normalized and plain-text italic markers are removed. English Easy uses the shorter narrative style of Oz; Medium uses the more varied prose and dialogue of The Secret Garden; Hard uses Austen's complex sentences and punctuation.

The Hindi corpus separates sentences with newlines and removes punctuation. Danda marks have been restored at those boundaries, very short fragments joined, and sentences grouped into paragraphs. Historical vocabulary and spelling remain; these are normalized practice editions, not diplomatic transcriptions. Twelve disjoint excerpts come from निर्मला and six from अधखिला फूल. Six excerpts per level are assigned using sentence length and conjunct density as a relative typing-difficulty guide, not an official exam classification.

Each source is split into consecutive non-overlapping excerpts. `long-passage-catalog.js` records title, author, excerpt number and actual word count. Existing passage indices remain unchanged. The new passages appear at Easy 19–24, Medium 13–18 and Hard 13–18 in both languages.

Run `node --test tests/typing-long-passages.test.js` to verify coverage, counts, duplicate text, legacy preservation and renderer behavior.
