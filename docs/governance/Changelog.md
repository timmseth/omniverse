# Changelog

Dated in the real calendar. Versions are the README's design-document versions.

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
