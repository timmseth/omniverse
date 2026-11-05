---
name: omniverse-contribute
description: Turn a human's description of a place, person, faction, item, table or lore into valid Omniverse notes (Markdown + YAML frontmatter), validate them, regenerate indexes and open a pull request. Use whenever someone wants to add or change content in the Omniverse repository.
---

# Contribute to the Omniverse

You are working in the Omniverse repository (https://github.com/timmseth/omniverse): a tabletop-RPG multiverse as notes with YAML frontmatter, checked by schemas. The human describes; you make it valid, linked and in voice.

## Steps
1. **Orient.** Read `AGENTS.md`, `docs/getting-started/For LLMs and Agents.md`, `docs/reference/Schema Reference.md` and `docs/reference/Style Guide.md`. Open the target universe's `_universe.md` (tone, ruleset) and three existing notes of each kind you will write.
2. **Plan.** List the notes you will create or change, with kind, id and folder, in a short table. A rich request usually fans out: a town needs venues and people; a villain needs a faction; a site needs a quest. Show the plan to the human and wait for a nod unless they said to just do it.
3. **Check for collisions.** `grep -rl "^name: <Name>$" Multiverse Tropes` for every new name; grep `_generated/world.json` for every new id. Rename on a clash.
4. **Write.** One file per note at the schema's path, frontmatter in the Style Guide's order, body with `# Name`, a read-aloud blockquote for places, prose in the universe's voice. Link both ways (faction members and person faction; town venues/people and venue/person parent; dungeon home_town and town nearest_dungeons).
5. **Validate.** `python3 _rules/tools/validate.py . --quiet`. Fix every ERROR. Read every WARN and fix the ones about your files.
6. **Build.** `python3 _rules/tools/build_all.py .`. Commit the generated changes with your content.
7. **PR.** A branch named for the thing (`town-netherwick`), one commit per logical change, the PR template filled in: type, universe, summary, checklist ticked honestly. One thing per PR.
8. **Report.** Tell the human what you made, in a few lines, and anything you decided for them.

## Rules you must not break
- Content only (`.md`, `.yaml`); no scripts; never touch `_generated/`, `_timeline.md`, the schema reference or `_state/` by hand.
- Ids are permanent, namespaced and unique; every `parent` and reference resolves.
- Only the universe the human named; core folders need an issue first.
- Original words. Published systems contribute shapes and numbers, never prose.
- Nothing becomes `canon: canon` by your hand in an existing universe.

## If you cannot run commands
Say so. Give the human the three commands (validate, build_all, git) and do not claim the notes pass.
