# Adding a Universe

A Universe Join adds a world to the multiverse. You become its maintainer.

## 1. Scaffold
```
python3 _rules/tools/new_universe.py "Starfall" --tone "pulp space opera" --ruleset omniverse.ruleset.six-sides --maintainer yourhandle
```
This writes `Multiverse/Starfall/` with `_universe.md` (the manifest), `Calendar.md`, an era, a first plane and planet, the standard folders, and adds a row to `Multiverse/_registry.md`. Run the validator; it passes.

## 2. The manifest
`_universe.md` is the universe's module manifest. Set `tone`, `ruleset`, `maintainers`, `status: active`, `clock` (calendar id and `epoch_omni_day`: which Omni-day is your year 1, day 1; it lets timelines across universes be compared), `version`, `licence`, `requires` (at least `omniverse-core`). If you add note kinds, list them in `adds_kinds` and define them in `Multiverse/<Name>/_schemas/<kind>.yaml` using the same format as the core schemas.

## 3. The minimum world
Enough to run one session: a planet, a region, a town with a tavern and three NPCs, a faction, a dungeon of seven rooms with a quest, a few events in `Events/`, and a trope instance or two. Each kind has a guide in this folder. The validator and `build_all` keep you honest as you go.

## 4. Rifts and joins
A universe can touch another only through events agreed by both maintainers: a Reality Rift (something leaks across), a shared NPC, a portal dungeon. Record them as events in both universes with the same `when` in each calendar, and list them in `rifts:` on the manifest.

## 5. The pull request
Open a **New universe** issue, then a PR containing the folder, a line in `CODEOWNERS` (`/Multiverse/Starfall/    @yourhandle`), the registry row and a Universe Join event in the registry. Omniverse maintainers check the manifest, the licence and that nothing outside your folder changed. After the merge you review your own folder's PRs.

## Keeping it alive
Set `status` honestly: `active`, `paused`, `dormant`, `archived`. A dormant universe stays on the shelf and still validates; its maintainer can hand it on by changing `CODEOWNERS` in a PR.
