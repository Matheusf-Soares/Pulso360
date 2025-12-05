#!/usr/bin/env python3
"""Script to fix all relative imports to absolute imports in the backend."""
import re
from pathlib import Path

# Pattern to match relative imports
PATTERNS = [
    (r"^from models\.", "from backend.models."),
    (r"^from repositories\.", "from backend.repositories."),
    (r"^from services\.", "from backend.services."),
    (r"^from schemas\.", "from backend.schemas."),
    (r"^from filters\.", "from backend.filters."),
    (r"^from api\.", "from backend.api."),
]


def fix_imports_in_file(file_path: Path) -> bool:
    """Fix imports in a single file. Returns True if changes were made."""
    try:
        content = file_path.read_text(encoding="utf-8")
        original_content = content
        lines = content.split("\n")
        modified = False

        for i, line in enumerate(lines):
            for pattern, replacement in PATTERNS:
                if re.match(pattern, line.strip()):
                    new_line = re.sub(pattern, replacement, line)
                    if new_line != line:
                        lines[i] = new_line
                        modified = True
                        print(
                            f"  {file_path.relative_to(Path.cwd())}: {line.strip()} -> {new_line.strip()}"
                        )

        if modified:
            file_path.write_text("\n".join(lines), encoding="utf-8")
            return True
        return False
    except Exception as e:
        print(f"Error processing {file_path}: {e}")
        return False


def main():
    """Main function to fix all imports."""
    backend_dir = Path(__file__).parent
    python_files = list(backend_dir.rglob("*.py"))

    # Exclude this script and __pycache__
    python_files = [
        f
        for f in python_files
        if f.name != "fix_imports.py" and "__pycache__" not in str(f)
    ]

    print(f"Processing {len(python_files)} Python files...")
    modified_count = 0

    for file_path in python_files:
        if fix_imports_in_file(file_path):
            modified_count += 1

    print(f"\nDone! Modified {modified_count} files.")


if __name__ == "__main__":
    main()
