import os

# ===== CONFIG =====
TARGET_FOLDER = r"D:\GovJovInd\Result_Details\HTML"
SCRIPT_TAG = '<script>(function(s){s.dataset.zone=\'11274653\',s.src=\'https://n6wxm.com/vignette.min.js\'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement(\'script\')))</script>'
# ===================

def process_file(filepath):
    with open(filepath, "r", encoding="utf-8", errors="ignore") as f:
        content = f.read()

    # Agar pehle se script laga hai to skip karo (duplicate se bachne ke liye)
    if SCRIPT_TAG in content:
        print(f"[SKIP - already present] {filepath}")
        return

    if "</head>" in content:
        new_content = content.replace("</head>", SCRIPT_TAG + "\n</head>", 1)
    elif "</HEAD>" in content:
        new_content = content.replace("</HEAD>", SCRIPT_TAG + "\n</HEAD>", 1)
    else:
        print(f"[NO </head> FOUND - skipped] {filepath}")
        return

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(new_content)

    print(f"[UPDATED] {filepath}")


def main():
    count = 0
    for root, dirs, files in os.walk(TARGET_FOLDER):
        for file in files:
            if file.lower().endswith(".html") or file.lower().endswith(".htm"):
                filepath = os.path.join(root, file)
                process_file(filepath)
                count += 1

    print(f"\nTotal HTML files scanned: {count}")


if __name__ == "__main__":
    main()