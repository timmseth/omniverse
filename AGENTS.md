# For LLMs and agents working in this repository

You are reading the Omniverse: a collaborative tabletop-RPG multiverse kept as Markdown notes with YAML frontmatter, validated by schemas, built by pull request. Humans describe what they want; you turn it into valid notes. This file is your entry point. Read it fully before touching anything.

## What to read, in order
1. `docs/getting-started/For LLMs and Agents.md`: the workflow, the rules, and the prompts humans will give you.
2. `docs/reference/Schema Reference.md`: every note kind, its folder, its id pattern, its fields. The validator enforces this; do not guess fields.
3. `docs/reference/Style Guide.md`: voice, names, frontmatter order, mechanics conventions.
4. Three existing notes of the kind you are about to write (find them with the `Lives at` column of the Schema Reference). Copy their shape.
5. For a dungeon, also `_rules/Submitting a Dungeon.md` and `docs/authoring/Writing a Dungeon.md`.

## The loop
```
describe -> write notes -> python3 _rules/tools/validate.py . --quiet -> fix -> python3 _rules/tools/build_all.py . -> commit -> PR
```
Run the validator after every batch of files. It names the file and the field for every problem. Run `build_all` before committing: it regenerates `_generated/`, the schema reference, timelines, maps and the app data, and CI fails if those are stale.

## Hard rules
- **Data, not code.** Write only `.md` and `.yaml` content. Never add scripts outside `_rules/tools/`, `Apps/` or `.github/`; CI rejects them.
- **Ids are permanent and namespaced**: `<universe>.<kind>.<slug>`. Never reuse or rename an id. Check `_generated/world.json` (or grep) before minting one.
- **Every `parent` and every referenced id must exist.** Create the referenced note or pick an existing one; never leave a dangling reference.
- **Names must be unique across the repository** (wikilinks are by name). Check with `grep -rl "^name: <Name>$"` before creating.
- **One universe per PR, and only its own folder** unless its maintainer asked. Core files (`_rules/`, `Tropes/`, `Rulesets/`, `docs/`, `.github/`, `CODEOWNERS`) need an issue first.
- **Original text only.** Shapes and numbers from published systems are fine; their prose is not. Do not paste from books, wikis or SRDs.
- **Licences are per folder.** The framework is public domain; every universe, ruleset and `Tropes/` has its own `LICENSE.md` matching `licence:` in its manifest. Work inside a folder inherits its licence; imported material keeps its own licence in its own folder with its credit line in `attribution:`. Read `LICENSING.md` before creating a universe or importing anything.
- **Never edit generated files by hand**: `_generated/`, `docs/reference/Schema Reference.md`, `*/_timeline.md`, `Apps/dmScreen/app/src/main/assets/*.js`, `_state/`.
- **Tone belongs to the universe.** Tropelandia is a parody played straight (the situation is funny, the narration is not). Ashfall is grim and earnest. Read the universe's `_universe.md` and three notes before writing a word.
- **Do not invent canon-changing events** in an existing universe without the human asking; propose them as `canon: proposed`.

## What a good contribution looks like
A town with a tavern, three NPCs who each have a voice, a want, a fear and a secret, a faction with a rival, and a dungeon of seven to ten rooms with a quest that threads them. Everything linked both ways (town lists venues and people; people list a faction and a location; the dungeon has `home_town`, `factions` and a quest). Validator clean. One PR.

## Skills
`_rules/skills/` holds skill definitions (SKILL.md files) for Claude and compatible agents: `omniverse-contribute` (turn a description into notes), `omniverse-dungeon`, `omniverse-town`, `omniverse-review` (review a PR), `omniverse-dm` (run a campaign). Load the one that fits the request; they encode the steps above.
