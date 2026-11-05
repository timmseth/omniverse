# Contributing to the Omniverse

The Omniverse is a shared, modular, system-agnostic tabletop-RPG multiverse kept as plain Markdown in this repository and browsed in Obsidian. Anyone can add to it: a dungeon, a quest, a town, a monster, a trope, a whole universe, or a tool. This page is the short version; the long version is in [`docs/`](docs/README.md).

## The one-minute version

1. **Fork** the repository and clone your fork. Open the folder in Obsidian if you like; a text editor works too.
2. **Find the kind of thing you want to add** in the [Schema Reference](docs/reference/Schema%20Reference.md). It tells you the folder, the id pattern and the fields.
3. **Copy a neighbour.** The fastest way to write a correct note is to copy one of the same kind and change it. Templates are in `_rules/templates/`.
4. **Check it:**
   ```
   pip install pyyaml
   python3 _rules/tools/validate.py . --quiet
   python3 _rules/tools/build_all.py .
   ```
   The validator reports every problem with the file and field. `build_all` regenerates the indexes (`_generated/`, the schema reference, the timelines, the app data); commit what it changes.
5. **Open a pull request.** One thing per PR (one dungeon, one quest, one town). Fill in the template. CI runs the same checks; the owner of the path you touched (see `CODEOWNERS`) reviews it.

## Prefer to describe it and let a model do the YAML?
Point Claude (or any agent that reads `AGENTS.md`) at this repository and describe what you want. It reads the schemas, writes the notes in the universe's voice, links them, validates, and opens the PR; you review. See [Contributing with an LLM](docs/authoring/Contributing%20with%20an%20LLM.md). Ready-made skills are in `_rules/skills/`.

## What you can contribute

| Kind | Where | Guide |
|---|---|---|
| Dungeon (rooms, exits, encounters) | `Multiverse/<Universe>/Dungeons/<Name>/` | [Writing a Dungeon](docs/authoring/Writing%20a%20Dungeon.md) |
| Quest chain | `Multiverse/<Universe>/Quests/` | [Writing a Quest](docs/authoring/Writing%20a%20Quest.md) |
| Town, venue, NPC, faction | the place tree, `Factions/` | [Factions, NPCs and Towns](docs/authoring/Writing%20Factions%2C%20NPCs%20and%20Towns.md) |
| Monster, item | `Bestiary/`, `Items/` | [Monsters and Items](docs/authoring/Writing%20Monsters%20and%20Items.md) |
| Random table, lore, history, holiday, deity | `Tables/`, `Lore/`, `Events/`, `Holidays/`, `Pantheon/` | [Tables, Lore and History](docs/authoring/Writing%20Tables%2C%20Lore%20and%20History.md) |
| Trope | `Tropes/` | [Writing a Trope](docs/authoring/Writing%20a%20Trope.md) |
| Ruleset | `Rulesets/<Name>/` | [Writing a Ruleset](docs/authoring/Writing%20a%20Ruleset.md) |
| A whole universe | `Multiverse/<Universe>/` | [Adding a Universe](docs/authoring/Adding%20a%20Universe.md) |
| Canon from your campaign | an instance's `log/` | [Running and Logging a Campaign](docs/authoring/Running%20and%20Logging%20a%20Campaign.md) |
| Tools, docs, the app | `_rules/tools/`, `docs/`, `Apps/` | open an issue first |
| A skill for LLM contributors | `_rules/skills/<name>/SKILL.md` | copy an existing one |

## Rules of the road

- **Data, not code.** Content is Markdown with YAML frontmatter. CI rejects scripts anywhere outside `_rules/tools/`, `Apps/` and `.github/`, and never runs contributed code.
- **Ids are namespaced** (`tropelandia.faction.mildew-court`) and never reused. Rename a note's title freely; change an id only with a PR that updates every reference.
- **Every `parent` exists** and every reference points at a real note. The validator checks.
- **One universe per PR**, and only your own universe unless its maintainer has asked for help. Core changes (schemas, tools, tropes, rulesets) go through the Omniverse maintainers.
- **Original or openly licensed material only.** This repository is released into the public domain (see [`LICENSE`](LICENSE)); anything you add must be yours to release that way, or clearly attributed under a compatible licence in the note's `source`. No copied text from published game books.
- **Tone belongs to the universe.** Tropelandia is a parody played straight. Read [the style guide](docs/reference/Style%20Guide.md) and three neighbouring notes before writing.
- **Be kind in review.** Maintainers review for fit and correctness, not taste; "this breaks the schema" is a reason to change something, "I would have done it differently" is a comment.

## Getting help

Open an issue with one of the templates (dungeon proposal, new universe, canon merge, bug), or ask in the pull request. The [FAQ](docs/reference/FAQ.md) answers the common ones.
