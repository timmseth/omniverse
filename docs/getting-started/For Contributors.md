# For Contributors

The whole workflow, in order. [CONTRIBUTING.md](../../CONTRIBUTING.md) has the summary.

## 1. Set up
```
git clone https://github.com/<you>/omniverse     # your fork
cd omniverse
pip install pyyaml
python3 _rules/tools/validate.py . --quiet       # should print RESULT: OK
```
Open the folder as a vault in Obsidian if you want links and previews. Nothing requires it.

## 2. Pick a kind
Every note has a `kind`, and every kind has a schema in `_rules/schemas/` that says where the note lives, what its id looks like and which fields it has. The [Schema Reference](../reference/Schema%20Reference.md) is the readable version. The table in CONTRIBUTING points each kind at its authoring guide.

## 3. Write the note
Copy the nearest existing note of the same kind, or a template from `_rules/templates/`. Then:
- **Id:** `<universe>.<kind>.<slug>`; slug is lower-case words joined by hyphens. Never reuse an id.
- **Parent:** the id of the note this one sits under. Towns sit under regions, venues and NPCs under their town, dungeons under the place that contains them, rooms under their dungeon, everything else directly under the universe.
- **Folder:** where the schema says. Place notes are folder notes (`<Name>/<Name>.md`) so children can sit inside.
- **References:** other notes by id in the frontmatter (`faction: tropelandia.faction.mildew-court`), and by wikilink in the body (`[[Mildew Court]]`). Both are checked.
- **Body:** the prose. A heading with the name, the read-aloud or description first, then sections. Keep the voice of the universe (see the [Style Guide](../reference/Style%20Guide.md)).

## 4. Check it
```
python3 _rules/tools/validate.py . --quiet
```
Errors name the file and the field. Warnings (unknown fields, long paths, duplicate names) are worth fixing but do not block. Then:
```
python3 _rules/tools/build_dungeons.py . --check   # if you touched a dungeon
python3 _rules/tools/build_all.py .                # regenerate indexes; commit the changes
```

## 5. Open the pull request
One thing per PR. Use the template; tick the checklist honestly. CI runs the validator, the dungeon check, and confirms the generated files are up to date. The owner of the path (see `CODEOWNERS`) reviews. Expect questions about fit (does it belong in this universe?) and correctness (do the links resolve? is the level range right?), not about taste.

## 6. After the merge
Your note is in the next Sync for every DM screen, in `_generated/world.json` for every tool, and in the universe's indexes. Your handle is in `author:` and in the git history. Thank you.

## Things that will get a PR sent back
- A new `.py`, `.js` or other script outside `_rules/tools/`, `Apps/` or `.github/`.
- Text copied from a published book or site.
- A change to another universe, the schemas, the tools or `CODEOWNERS` without an issue first.
- Generated files edited by hand (`_generated/`, `docs/reference/Schema Reference.md`, `_timeline.md`).
