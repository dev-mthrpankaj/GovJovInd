# -*- coding: utf-8 -*-
"""One-shot convert remaining typing exam detail heroes to refined pattern."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(r"D:/GovJovInd/typing-test")
CSS_V = "hero-10-all-20260918"
FOOTNOTE = "Free to practice · Sign in only if you want ranking"

# Per-file overrides: family, h1_id, category, title, lead, meta list of (strong, label),
# secondary (href, label) or None, rules_inline text (plain, may include <strong>)
PAGES = {
    "ssc-chsl-typing-test.html": {
        "family": "ssc",
        "h1_id": "sscChslTitle",
        "category": "SSC · Skill test practice",
        "title": "SSC CHSL Typing Test 2026",
        "lead": "Timed Hindi &amp; English passages for CHSL-style prep. Practice only — not an official SSC result.",
        "meta": [
            ("35", "Eng WPM"),
            ("30", "Hin WPM"),
            ("10", "min"),
            ("7% / 10%", "mistakes"),
        ],
        "secondary": ("#howSscEvaluates", "How SSC evaluates"),
        "rules_inline": (
            "CHSL LDC/JSA: <strong>English 35 WPM</strong> or <strong>Hindi 30 WPM</strong> · "
            "<strong>10 minutes</strong> (15 for eligible compensatory time) · "
            "about <strong>7% mistakes (UR)</strong> / <strong>10% (reserved)</strong> — "
            "SSC mistake percentages, not this site's character accuracy · official qualification is not assessed here."
        ),
    },
    "ssc-stenographer-practice.html": {
        "family": "ssc",
        "h1_id": "sscStenoTitle",
        "category": "SSC · Stenographer practice",
        "title": "SSC Stenographer Transcription Practice",
        "lead": "Paragraph typing for Steno transcription rhythm. Practice only — not an official SSC result.",
        "meta": [
            ("40", "min"),
            ("Typing", "practice"),
            ("WPM + Acc", ""),
            ("60", "sets"),
        ],
        "secondary": ("#howStenoPractice", "How practice works"),
        "rules_inline": (
            "Transcription practice only — no dictation · SSC Steno 2026: 10-min dictation at 100 WPM (C) / 80 WPM (D) · "
            "standard transcription: C Eng 40 / Hin 55 min; D Eng 50 / Hin 65 min · "
            "this preset's 40-min / 40 WPM / 95% goals are personal benchmarks, not qualification standards."
        ),
    },
    "ssc-selection-post-typing-test.html": {
        "family": "ssc",
        "h1_id": "sscSelectionPostTitle",
        "category": "SSC · Selection Post practice",
        "title": "SSC Selection Post Skill Practice",
        "lead": "Clerical typing for applicable Selection Post categories. Practice only — not an official SSC result.",
        "meta": [
            ("10", "min"),
            ("Typing", "practice"),
            ("WPM + Acc", ""),
            ("60", "sets"),
        ],
        "secondary": ("#howSelectionPostPractice", "How practice works"),
        "rules_inline": (
            "Phase XIV/2026: typing/data-entry applies only where prescribed for the selected post · "
            "time, speed and accuracy here are GovJobUpdates benchmarks, not a universal SSC requirement."
        ),
    },
    "delhi-police-head-constable-ministerial-typing-test.html": {
        "family": "delhi-police",
        "h1_id": "delhiPoliceHcmTitle",
        "category": "SSC · Delhi Police HCM",
        "title": "Delhi Police HC Ministerial Typing 2026",
        "lead": "Timed Hindi &amp; English for HCM-style prep. Practice only — not an official SSC result.",
        "meta": [
            ("30", "Eng WPM"),
            ("25", "Hin WPM"),
            ("10", "min"),
            ("Up to 25", "marks"),
        ],
        "secondary": ("#howHcmEvaluates", "How HCM evaluates"),
        "rules_inline": (
            "Delhi Police HCM 2025: <strong>10 minutes</strong> · <strong>English 30</strong> / <strong>Hindi 25 WPM</strong> · "
            "up to <strong>25 marks</strong> · tentative speed = (strokes / 5) / 10 · "
            "use the optional self-review calculator — official mistake classification is not verified here."
        ),
    },
    "railway-junior-clerk-typing-test.html": {
        "family": "railway",
        "h1_id": "railwayJuniorClerkTitle",
        "category": "Railway · CBTST practice",
        "title": "Railway Junior Clerk Typing",
        "lead": "Timed Hindi &amp; English for Junior Clerk cum Typist prep. Practice only — not an official RRB result.",
        "meta": [
            ("30", "Eng WPM"),
            ("25", "Hin WPM"),
            ("10", "min"),
            ("300 / 250", "min words"),
        ],
        "secondary": ("#howRailwayJuniorClerk", "How practice works"),
        "rules_inline": (
            "CEN 06/2024 NTPC UG CBTST style: 10 evaluated minutes · English 30 / Hindi 25 WPM · min ~300 / 250 words · "
            "mistakes = full + half/2, minus 5% word allowance, then −10 words each · editing off · "
            "official speed is not auto-assessed — use reviewed counts in the optional calculator."
        ),
    },
    "railway-accounts-clerk-typing-test.html": {
        "family": "railway",
        "h1_id": "railwayAccountsClerkTitle",
        "category": "Railway · CBTST practice",
        "title": "Accounts Clerk Typing",
        "lead": "Timed Hindi &amp; English for Accounts Clerk cum Typist prep. Practice only — not an official RRB result.",
        "meta": [
            ("30", "Eng WPM"),
            ("25", "Hin WPM"),
            ("10", "min"),
            ("300 / 250", "min words"),
        ],
        "secondary": ("#howRailwayAccountsClerk", "How practice works"),
        "rules_inline": (
            "CEN 06/2024 NTPC UG CBTST style: 10 evaluated minutes · English 30 / Hindi 25 WPM · min ~300 / 250 words · "
            "mistakes = full + half/2, minus 5% word allowance, then −10 words each · editing off · "
            "official speed is not auto-assessed — use reviewed counts in the optional calculator."
        ),
    },
    "upsssc-junior-assistant-typing-test.html": {
        "family": "up",
        "h1_id": "upssscJuniorAssistantTitle",
        "category": "UP Govt · Practice benchmarks",
        "title": "UPSSSC Junior Assistant Typing 2026",
        "lead": "Timed Hindi &amp; English for Junior Assistant prep. Practice benchmarks only — verify your advertisement.",
        "meta": [
            ("25", "Hin WPM"),
            ("30", "Eng WPM"),
            ("5", "min"),
            ("85%", "accuracy"),
        ],
        "secondary": ("#howUpssscPractice", "Practice guide"),
        "rules_inline": (
            "Exact UPSSSC duration, accuracy, font and evaluation are <strong>not verified</strong> for every recruitment · "
            "defaults here: <strong>5 minutes</strong> · <strong>Hindi 25 / English 30 WPM</strong> · <strong>85%</strong> practice accuracy · "
            "always check your advertisement and typing admit-card instructions."
        ),
    },
    "up-government-clerical-typing-test.html": {
        "family": "up",
        "h1_id": "upClericalTitle",
        "category": "UP Government · Clerical practice",
        "title": "UP Government Clerical Typing",
        "lead": "General UP clerical typing rhythm. Practice only — not tied to one official recruitment.",
        "meta": [
            ("5", "min"),
            ("Typing", "practice"),
            ("WPM + Acc", ""),
            ("60", "sets"),
        ],
        "secondary": ("#howUpClerical", "How practice works"),
        "rules_inline": (
            "General UP clerical practice, not a particular recruitment's skill test · "
            "time, WPM and accuracy goals are GovJobUpdates benchmarks · check the selected post's official instructions."
        ),
    },
    "up-police-computer-operator-typing-test.html": {
        "family": "up-police",
        "h1_id": "upPoliceOperatorTitle",
        "category": "UP Police · Computer Operator",
        "title": "UP Police Computer Operator",
        "lead": "Timed Hindi &amp; English for Computer Operator prep. Practice only — not an official UP Police result.",
        "meta": [
            ("15", "min"),
            ("25 / 30", "Hin / Eng"),
            ("85%", "accuracy"),
            ("Both", "languages"),
        ],
        "secondary": ("#howUpPoliceOperator", "How practice works"),
        "rules_inline": (
            "2025 notice style: Hindi 25 WPM and English 30 WPM with 85% accuracy · Unicode Inscript Hindi · "
            "15 minutes per language with a 5-minute gap (English first on 2023 cycle instructions) · "
            "this page runs one language at a time · browser feedback is practice only — confirm your recruitment cycle."
        ),
    },
    "ibps-clerk-csa-typing-language-practice.html": {
        "family": "banking",
        "h1_id": "ibpsClerkCsaTitle",
        "category": "Banking · IBPS Clerk/CSA",
        "title": "IBPS Clerk/CSA Practice",
        "lead": "Typing &amp; language confidence for IBPS Clerk/CSA prep. Practice only — not an official IBPS test.",
        "meta": [
            ("10", "min"),
            ("Language", "practice"),
            ("WPM + Acc", ""),
            ("60", "sets"),
        ],
        "secondary": ("#howIbpsClerkPractice", "How practice works"),
        "rules_inline": (
            "Typing &amp; language practice only · indexed IBPS CSA-XVI notice identifies a Local Language Proficiency Test · "
            "no official typing-speed qualification is claimed · these goals do not assess language proficiency."
        ),
    },
    "sbi-clerk-typing-language-practice.html": {
        "family": "sbi",
        "h1_id": "sbiClerkTitle",
        "category": "Banking · SBI Clerk",
        "title": "SBI Clerk Practice",
        "lead": "Typing &amp; language confidence for SBI Clerk prep. Practice only — not an official SBI language test.",
        "meta": [
            ("10", "min"),
            ("Language", "practice"),
            ("WPM + Acc", ""),
            ("60", "sets"),
        ],
        "secondary": ("#howSbiClerkPractice", "How practice works"),
        "rules_inline": (
            "Typing &amp; language practice only · SBI Junior Associate may include a specified local-language test where applicable · "
            "not a universal typing-speed test · targets here are personal benchmarks and do not assess local-language proficiency."
        ),
    },
    "banking-typing-language-practice.html": {
        "family": "banking",
        "h1_id": "bankingLanguageTitle",
        "category": "Banking · Language practice",
        "title": "Banking Language Practice",
        "lead": "Typing &amp; language confidence for banking clerical prep. Practice only — not an official bank test.",
        "meta": [
            ("10", "min"),
            ("Language", "practice"),
            ("WPM + Acc", ""),
            ("60", "sets"),
        ],
        "secondary": ("#howBankingPractice", "How practice works"),
        "rules_inline": (
            "GovJobUpdates practice benchmarks only · not an official exam or a language proficiency assessment."
        ),
    },
    "rbi-assistant-language-practice.html": {
        "family": "banking",
        "h1_id": "rbiAssistantTitle",
        "category": "Banking · RBI Assistant",
        "title": "RBI Assistant Practice",
        "lead": "Language-confidence typing for RBI Assistant prep. Practice only — not an official RBI LPT.",
        "meta": [
            ("10", "min"),
            ("Language", "practice"),
            ("WPM + Acc", ""),
            ("60", "sets"),
        ],
        "secondary": ("#howRbiAssistantPractice", "How practice works"),
        "rules_inline": (
            "Typing &amp; language practice only · RBI Assistant notices identify a Language Proficiency Test after prelims/mains · "
            "these typing goals are practice benchmarks, not RBI qualification or LPT assessment."
        ),
    },
    "english-typing-test.html": {
        "family": "ssc",
        "h1_id": "englishTypingTitle",
        "category": "General · English practice",
        "title": "English Typing Test",
        "lead": "Flexible English speed &amp; accuracy practice. Practice only — not a government exam result.",
        "meta": [
            ("10", "min"),
            ("English", "only"),
            ("WPM + Acc", ""),
            ("60", "sets"),
        ],
        "secondary": ("#howEnglishPractice", "How practice works"),
        "rules_inline": (
            "GovJobUpdates practice benchmarks only · not an official exam or a language proficiency assessment."
        ),
    },
    "hindi-typing-test.html": {
        "family": "ssc",
        "h1_id": "hindiTypingTitle",
        "category": "General · Hindi practice",
        "title": "Hindi Typing Test",
        "lead": "Hindi Unicode typing with flexible targets. Practice only — not a government exam result.",
        "meta": [
            ("10", "min"),
            ("Hindi", "Unicode"),
            ("WPM + Acc", ""),
            ("60", "sets"),
        ],
        "secondary": ("#howHindiPractice", "How practice works"),
        "rules_inline": (
            "GovJobUpdates practice benchmarks only · not an official exam or a language proficiency assessment."
        ),
    },
}


def fix_mojibake(s: str) -> str:
    # Common replacement-char and wrong encodings in touched regions
    s = s.replace("\ufffd", "—")
    s = s.replace("â€”", "—")
    s = s.replace("â€“", "–")
    s = s.replace("â€˜", "'")
    s = s.replace("â€™", "'")
    s = s.replace("â€¦", "…")
    s = s.replace("Â·", "·")
    return s


def build_meta(items: list[tuple[str, str]]) -> str:
    parts = []
    for strong, label in items:
        if label:
            parts.append(f"          <span><strong>{strong}</strong> {label}</span>")
        else:
            parts.append(f"          <span><strong>{strong}</strong></span>")
    return "\n".join(parts)


def build_hero(cfg: dict, logo_html: str) -> str:
    h1_id = cfg["h1_id"]
    secondary = cfg.get("secondary")
    actions = [
        f'          <a class="gju-typing-hero-start gju-typing-hero-start-solid" href="#typingLanguageTitle"><i class="fas fa-keyboard" aria-hidden="true"></i> Start practice</a>'
    ]
    if secondary:
        href, label = secondary
        actions.append(f'          <a class="gju-typing-hero-secondary" href="{href}">{label}</a>')
    return f'''    <section class="gju-typing-exam-detail-card gju-typing-hero-refined gju-typing-hero-{cfg["family"]}" aria-labelledby="{h1_id}">
      <div class="gju-typing-hero-plane" aria-hidden="true"></div>
      <div class="gju-typing-hero-copy">
        <p class="gju-typing-hero-brand">GovJob<span>Updates</span> Typing</p>
        <div class="gju-typing-hero-topline">
          {logo_html}
          <p class="gju-typing-exam-category">{cfg["category"]}</p>
        </div>
        <h1 id="{h1_id}">{cfg["title"]}</h1>
        <p class="gju-typing-hero-lead">{cfg["lead"]}</p>
        <p class="gju-typing-hero-meta" aria-label="Practice targets">
{build_meta(cfg["meta"])}
        </p>
        <div class="gju-typing-hero-actions">
{chr(10).join(actions)}
        </div>
        <p class="gju-typing-hero-footnote">{FOOTNOTE}</p>
      </div>
    </section>'''


def update_css_link(text: str) -> str:
    # Split jammed fontawesome onto own line + bump version
    text = re.sub(
        r'<link rel="stylesheet" href="typing-landing\.css\?v=[^"]+">\s*(<link rel="stylesheet" href="\.\./Assets/vendor/fontawesome/css/all\.min\.css">)?',
        lambda m: (
            f'<link rel="stylesheet" href="typing-landing.css?v={CSS_V}">\n'
            f'  <link rel="stylesheet" href="../Assets/vendor/fontawesome/css/all.min.css">'
            if m.group(1) or '../Assets/vendor/fontawesome/css/all.min.css' not in text[m.start() : m.start() + 200]
            else f'<link rel="stylesheet" href="typing-landing.css?v={CSS_V}">'
        ),
        text,
        count=1,
    )
    # If FA already on next line, just bump version
    text = re.sub(
        r'href="typing-landing\.css\?v=[^"]+"',
        f'href="typing-landing.css?v={CSS_V}"',
        text,
        count=1,
    )
    # Ensure FA is on its own line if still jammed somehow
    text = text.replace(
        f'href="typing-landing.css?v={CSS_V}">  <link rel="stylesheet" href="../Assets/vendor/fontawesome',
        f'href="typing-landing.css?v={CSS_V}">\n  <link rel="stylesheet" href="../Assets/vendor/fontawesome',
    )
    return text


def extract_logo(hero_chunk: str) -> str:
    m = re.search(
        r'(<div class="gju-typing-exam-logo[^"]*">\s*<i[^>]*></i>\s*</div>)',
        hero_chunk,
    )
    if not m:
        raise ValueError("logo not found")
    return m.group(1).strip()


def convert_file(name: str, cfg: dict) -> None:
    path = ROOT / name
    text = path.read_text(encoding="utf-8", errors="replace")
    text = fix_mojibake(text)
    text = update_css_link(text)

    # Capture logo from old hero
    hero_m = re.search(
        r'<section class="gju-typing-exam-detail-card">[\s\S]*?</section>\s*'
        r'(?:<section class="gju-typing-rules-box[\s\S]*?</section>\s*)?',
        text,
    )
    if not hero_m:
        raise ValueError(f"{name}: hero+rules block not found")

    logo = extract_logo(hero_m.group(0))
    new_hero = build_hero(cfg, logo)
    text = text[: hero_m.start()] + new_hero + "\n\n" + text[hero_m.end() :]

    # Fold rules into evaluate section if present
    rules = cfg.get("rules_inline")
    if rules and 'class="gju-typing-evaluate-section"' in text:
        # Shorten H2 by dropping (practice guide)
        text = re.sub(
            r'(<h2 id="[^"]*Title">)([\s\S]*?)(</h2>)',
            lambda m: m.group(1)
            + re.sub(r"\s*\(practice guide\)\s*", "", m.group(2)).strip()
            + m.group(3),
            text,
            count=1,
        )
        # Insert rules-inline after evaluate-intro if not already present
        if "gju-typing-rules-inline" not in text:
            inline = (
                '      <p class="gju-typing-rules-inline" aria-label="Practice rules summary">\n'
                f"        <strong>Practice rules:</strong>\n"
                f"        {rules}\n"
                "      </p>\n"
            )
            text2, n = re.subn(
                r'(<p class="gju-typing-evaluate-intro">[\s\S]*?</p>\s*)',
                r"\1" + inline,
                text,
                count=1,
            )
            if n == 0:
                raise ValueError(f"{name}: evaluate-intro not found for rules fold")
            text = text2

    path.write_text(text, encoding="utf-8", newline="\n")
    # Verify
    out = path.read_text(encoding="utf-8")
    assert "gju-typing-hero-refined" in out, name
    assert "gju-typing-hero-summary" not in out, name
    assert "gju-typing-rules-box" not in out, name
    print(f"OK {name}")


def bump_done_pages() -> None:
    for name in ("rrb-ntpc-typing-test.html", "ssc-cgl-dest.html"):
        path = ROOT / name
        text = path.read_text(encoding="utf-8")
        text = re.sub(
            r'href="typing-landing\.css\?v=[^"]+"',
            f'href="typing-landing.css?v={CSS_V}"',
            text,
            count=1,
        )
        path.write_text(text, encoding="utf-8", newline="\n")
        print(f"BUMP {name}")


def main() -> None:
    for name, cfg in PAGES.items():
        convert_file(name, cfg)
    bump_done_pages()
    # Final grep-style check
    remaining = []
    for p in ROOT.glob("*.html"):
        t = p.read_text(encoding="utf-8", errors="replace")
        if "gju-typing-hero-summary" in t:
            remaining.append(p.name)
    print("REMAINING_SUMMARY:", remaining or "none")


if __name__ == "__main__":
    main()
