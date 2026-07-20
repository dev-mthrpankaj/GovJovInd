import os

# ===== CONFIG (same as insert script) =====
TARGET_FOLDERS = [
    r"D:\GovJovInd\AdmitCard_Details\HTML",
    r"D:\GovJovInd\AnswerKey_Details\HTML",
    r"D:\GovJovInd\HTML\student-hub",
    r"D:\GovJovInd\Job_Details\HTML",
    r"D:\GovJovInd\Result_Details\HTML",
]
SCRIPT_TAG = '<script>(function(s){s.dataset.zone=\'11274653\',s.src=\'https://n6wxm.com/vignette.min.js\'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement(\'script\')))</script>'
# ============================================


def process_file(filepath):
    with open(filepath, "r", encoding="utf-8", errors="ignore") as f:
        content = f.read()

    if SCRIPT_TAG not in content:
        print(f"[SKIP - tag not found] {filepath}")
        return

    # Remove the tag, and any single trailing newline right after it (jo insert script ne add kiya tha)
    new_content = content.replace(SCRIPT_TAG + "\n", "")
    if SCRIPT_TAG in new_content:
        # agar newline ke bina bhi bacha ho (edge case)
        new_content = new_content.replace(SCRIPT_TAG, "")

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(new_content)

    print(f"[REMOVED] {filepath}")


def main():
    total_count = 0
    removed_count = 0
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
                    before = None
                    with open(filepath, "r", encoding="utf-8", errors="ignore") as f:
                        before = f.read()
                    process_file(filepath)
                    with open(filepath, "r", encoding="utf-8", errors="ignore") as f:
                        after = f.read()
                    if before != after:
                        removed_count += 1
                    folder_count += 1

        print(f"Files scanned in this folder: {folder_count}")
        total_count += folder_count

    print(f"\nTotal HTML files scanned across all folders: {total_count}")
    print(f"Total files where tag was removed: {removed_count}")


if __name__ == "__main__":
    main()
