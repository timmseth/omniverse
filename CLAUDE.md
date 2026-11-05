# Claude Code: Omniverse repository

Read `AGENTS.md` first; it is the entry point for any LLM or agent here, and it links the docs in the order to read them.

Conventions specific to this repository:
- Validate after every batch of notes: `python3 _rules/tools/validate.py . --quiet` (needs `pip install pyyaml`).
- Regenerate before committing: `python3 _rules/tools/build_all.py .` and commit the generated files with the content.
- Content is Markdown + YAML only. Scripts belong in `_rules/tools/` and need an issue first.
- Ids never change; names must be unique; every reference must resolve.
- Skills for common jobs are in `_rules/skills/<name>/SKILL.md`.
- The Android app in `Apps/dmScreen/` is built on the maintainer's machine; do not try to run Gradle here.
