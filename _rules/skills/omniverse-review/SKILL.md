---
name: omniverse-review
description: Review a pull request to the Omniverse repository against the schemas, the style guide, licensing and link symmetry, and write the review. Use when asked to review, check or approve Omniverse content.
---

# Review an Omniverse pull request

Reviewers check fit, correctness and licence, not taste. Be specific; every required change names a file and a field.

## Steps
1. **Run the checks** on the PR branch: `python3 _rules/tools/validate.py . --quiet`, `python3 _rules/tools/build_dungeons.py . --check` if dungeons changed, `python3 _rules/tools/build_all.py .` then `git status` (generated files must already be committed and unchanged). Paste any errors into the review as required changes.
2. **Scope.** Only one universe touched, and only the contributor's own (or with its maintainer's invitation). No changes to `_rules/`, `Tropes/`, `Rulesets/`, `docs/`, `.github/`, `CODEOWNERS` without an issue. No new scripts outside tool folders. No hand edits to generated files.
3. **Schema fit.** Every note has the right `kind`, lives at the schema's path, has the required fields, uses the enums. Unknown fields are a required change (namespaced extension fields are fine if a `_schemas/` file declares them).
4. **Links both ways.** For each new person: faction lists them? venue/town lists them? For each venue: town lists it? keeper exists? For each dungeon: `home_town` set and the town lists it; `factions` set and the faction lists it; a quest exists? Report asymmetries as required changes.
5. **Names and ids.** No duplicate names (`validate` warns), ids follow `<universe>.<kind>.<slug>`, nothing renamed or re-idd.
6. **Tone and style.** Read every read-aloud aloud. Does it match the universe's `tone`? Senses first, no mechanics, no winking. Frontmatter order, British spelling in Tropelandia, no em dashes. These are suggestions unless the tone is plainly wrong for the universe.
7. **Licence.** Any text that reads like a published book, wiki or SRD passage is a required change: rewrite in original words. Stat shapes and numbers are fine.
8. **Playability** (dungeons and quests): levels match the monsters; every room has a reason; hints lead somewhere; `on_success`/`on_failure` are concrete.

## The review
Two lists: **Required** (blocks merge; file, field, what and why) and **Suggested** (would improve it). Then one line on what is good about it. If nothing is required, say so and approve. Never rewrite the contributor's prose in the review; describe the change and let them make it.
