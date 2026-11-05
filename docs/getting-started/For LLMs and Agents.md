# For LLMs and Agents

If you are a language model reading this because a human asked you to help with the Omniverse: welcome. The human has a vision; you have the schemas. This page tells you how to turn one into the other without breaking anything. `AGENTS.md` at the repository root is the short version.

## How contribution with an LLM works
The human describes what they want in their own words: a town, a villain, a dungeon, a whole universe. You handle everything mechanical: the folder, the id, the frontmatter, the links in both directions, the validator, the generated files, the pull request. You also handle most of the prose, in the universe's voice, from their description. The human reads the result, says what to change, and owns it.

The split is: **vision and taste from the human, mechanics and consistency from you.** When the vision is thin, ask one or two questions, then write; do not interrogate. When it conflicts with the world (a dragon in a universe that has none, a joke in Ashfall), say so once and offer the nearest fit.

## Before you write
1. Read `AGENTS.md`, this page, the [Schema Reference](../reference/Schema%20Reference.md) and the [Style Guide](../reference/Style%20Guide.md).
2. Open the target universe's `_universe.md` for tone and ruleset, and three notes of the kind you will write. Copy their shape exactly.
3. Load `_generated/world.json` (or grep the vault) to learn what already exists: names, ids, places, factions. New things should connect to old things.
4. Decide the kinds you need. A "bandit camp" is a dungeon, a faction, two or three NPCs and probably a quest. Say the list back to the human before writing.

## While you write
- One file per note, in the folder the schema gives, named exactly as `name:` plus `.md`.
- Frontmatter first: `id`, `kind`, `name`, `parent`, `universe`, then the kind's fields, then `tags`, `summary`, `from`, `to`. Quote strings with colons. Lists of sentences one per line.
- Body: `# Name`, then for places a blockquote read-aloud, then prose and sections. Wikilink other notes by name on first mention.
- Link both ways. If a person has `faction:`, the faction's `members:` includes them. If a dungeon has `home_town:`, the town's `nearest_dungeons:` includes it. The validator does not check symmetry; the world feels broken without it.
- Monsters go in the universe's `Bestiary/` with the ruleset's block (`dnd5e:` or `six_sides:`); rooms reference them by id. Notable loot goes in `Items/` and is referenced by id.
- Keep the Windows path short: folder names under 24 characters, no deeper than the place tree needs.

## After you write
```
python3 _rules/tools/validate.py . --quiet       # fix every ERROR; read every WARN
python3 _rules/tools/build_dungeons.py . --check   # if you wrote a dungeon
python3 _rules/tools/build_all.py .                # regenerate; commit the result too
```
Then a branch, a commit with a clear message, and a pull request using the template (`.github/PULL_REQUEST_TEMPLATE.md`). One thing per PR. In the PR description, say in two lines what the human asked for and what you made of it.

If you cannot run the tools (no shell), say so plainly, hand the human the exact commands, and do not claim the notes validate.

## Prompts humans will give you, and what to do
| The human says | You do |
|---|---|
| "Add a town called X in the marsh, a fishing village with a creepy priest" | A `settlement` under the marsh region with a read-aloud, two venues (one tavern), three `person` notes including the priest (voice, wants, fears, secret), rumours and hooks; link to the nearest dungeon; add the town to the region note. |
| "Make a dungeon: an abandoned mill haunted by the miller" | A pitch back in three lines, then a `dungeon` folder note with code, levels, hooks, rumours, wandering table, and seven to ten `room` notes with reciprocal exits, one ghost in the bestiary, loot, a secret, a quest that starts in the nearest town. Run `build_dungeons.py --check`. |
| "I want a villain who runs the thieves in the port" | Check `Factions/` first: the Society exists. Offer to add the villain as a `person` in Greyharbour with `faction:` set and a relationship to the guildmaster, or to make a rival faction if that is what they meant. |
| "Write up our session" | A `session` note in their instance's `log/` with events, deltas and rolls, `canon: local`; ask which events should be `proposed`. |
| "Start a new universe about X" | `python3 _rules/tools/new_universe.py`, then the minimum world (docs/authoring/Adding a Universe.md), then a New universe issue. |
| "Review this PR" | The `omniverse-review` skill: validator output, schema fit, tone fit, licence, link symmetry; a short list of required changes and a short list of suggestions. |

## What not to do
- Do not add fields the schema does not have (the validator warns; the data is lost to tools). Propose a schema change in an issue instead.
- Do not restructure folders, rename ids, or "clean up" neighbouring notes you were not asked to touch.
- Do not write rules text from published books; write it in your own words from the shape.
- Do not mark anything `canon: canon` in an existing universe. That is the maintainer's word.
- Do not generate a hundred thin notes. Ten good ones, linked, beat a hundred stubs.

## Skills
`_rules/skills/` holds SKILL.md files that encode these steps for Claude (and any agent that reads SKILL.md): `omniverse-contribute`, `omniverse-dungeon`, `omniverse-town`, `omniverse-review`, `omniverse-dm`. A human using Claude can save them as skills; an agent can read them as instructions. See [Contributing with an LLM](../authoring/Contributing%20with%20an%20LLM.md) for the human side.
