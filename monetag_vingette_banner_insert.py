import os

# ===== CONFIG =====
TARGET_FOLDERS = [
    r"D:\GovJovInd\AdmitCard_Details\HTML",
    r"D:\GovJovInd\AnswerKey_Details\HTML",
    r"D:\GovJovInd\HTML\student-hub",
    r"D:\GovJovInd\Job_Details\HTML",
    r"D:\GovJovInd\Result_Details\HTML",
]
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
    total_count = 0
    for target_folder in TARGET_FOLDERS:
        if not os.path.isdir(target_folder):
            print(f"[FOLDER NOT FOUND - skipped] {target_folder}")
            continue

        print(f"\n--- Scanning: {target_folder} ---")
        folder_count = 0
        for root, dirs, files in os.walk(target_folder):
            for file in files:
                if file.lower().endswith(".html") or file.lower().endswith(".htm"):
                    filepath = os.path.join(root, file)
                    process_file(filepath)
                    folder_count += 1

        print(f"Files scanned in this folder: {folder_count}")
        total_count += folder_count

    print(f"\nTotal HTML files scanned across all folders: {total_count}")


if __name__ == "__main__":
    main()