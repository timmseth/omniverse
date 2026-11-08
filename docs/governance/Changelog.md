# Changelog

Dated in the real calendar. Versions are the README's design-document versions.

## 0.7.0 (2026-11-05)
- Licensing split: the framework stays Unlicense; content is licensed per folder. `licence:` is a checked enum on universe and ruleset manifests, with `attribution:`/`licence_url:`; every universe, ruleset and `Tropes/` carries a `LICENSE.md`; the validator enforces agreement. Tropelandia, Ashfall, Tropes and Six Sides are CC BY-SA 4.0; dnd5e is CC BY 4.0 with the SRD credit line. `LICENSING.md` is the plain-English map; `new_universe.py --licence` writes the file.
- Quest layers (`for_quest` on rooms, venues, towns and NPCs) and dmScreen v1.2.0 (quests, combat tracker, dice notation, purse, timer, session export).
- Note Wizard: one self-contained page (`Apps/wizard/`, published at `/wizard.html`) that builds its forms from the schemas. Pick a kind, fill in the fields, then copy, download, save straight into a repo folder, or collect a basket and zip it. Checks ids, paths, names, references and licences like the validator; writes `LICENSE.md` for universes and rulesets. New tool `build_wizard.py`, run by `build_all.py` and checked by CI.
- The Gameplay Loop (`docs/concepts/The Gameplay Loop.md`): the cycle of play. Apotheosis, Genesis with an Entropy economy (the World 5, Grand 3, Middling 2, Small 1), the Reckoning (spend the debt on a Doom from a menu of Scale, Form and Features), Relics, Incarnation, the Relic Quest, the Convergence (transforms, never deletes), Retirement (reborn, new chosen, return, ascend) and the Convocation (`docs/authoring/Running a Convocation.md`: pacts due, arrivals, building, the Turning, canon merge). Base way plus options throughout. The Genesis guide and handouts are reworked to match (Reckoning Sheet, Relic Slip, Loop card, Retirement Sheet, Convocation run sheet); the Note Wizard chips show Entropy weights.
- Scribe tools for the loop: the Scribe's Script, the Gathering, the Common Knowledge card and a Playtest Log in the handouts; the Genesis guide adds the Gathering and Common Knowledge to Incarnation. The docs index gains a Play section in reading order, and the design doc a section on the Gameplay Loop (17.10).
- Genesis Session: a guide and printable handouts for a four-hour, 2-to-8-player session in which the players are gods who build a universe by turns, then play its mortal incarnations (`docs/authoring/`).

## 0.6.0 (2026-11-04)
- Schemas for every note kind in `_rules/schemas/`, a schema-driven validator, and a generated Schema Reference.
- World index (`_generated/world.json`, World Index, Backlinks) and generated per-universe timelines.
- Tropelandia: 11 factions, 8 hub towns, 27 venues, 30 NPCs, a 45-entry bestiary, 31 items, 15 random tables, 6 holidays, 2 eras, 26 dated events, 6 deities, 4 cultures, 4 languages, 7 lore notes, 10 quest chains (one per dungeon), and the Starter Kit (Session Zero, a three-session arc, five pregens).
- Rooms reference the bestiary and items by id; the build tool copies stat blocks into `dungeons.json`.
- A second ruleset (Six Sides) and a second universe with a Rift to Tropelandia; `new_universe.py` scaffolder; `merge_instance.py` canon-merge drafter.
- GitHub Actions CI, PR and issue templates, CODEOWNERS; `CONTRIBUTING.md` and the `docs/` set.
- dmScreen v1.0.0 APK in `Apps/dmScreen/releases/`.

## 0.5.0 (2026-11-04)
- Dungeon and room schemas, the dungeon build tool, ten sample dungeons (85 rooms), the submission guide and the dmScreen app source.

## 0.4.0 (2026-11-04)
- Design rewrite around collaborative modular extensibility: modules and manifests, no ticks, instances and canon merges, Universe Join, the DM skill with scenario prompts. Trope library of 50.

## 0.3.0 and earlier
- The layer model, the Tropelandia sample world, the first notes and the vault/repo/GitHub sync.
