---
name: omniverse-dungeon
description: Write a complete Omniverse dungeon from a pitch: folder note, seven to ten room notes with reciprocal exits, bestiary entries, items, a quest, then run the dungeon build check. Use when someone asks for a dungeon, lair, ruin, tower, cave or other adventure site.
---

# Write an Omniverse dungeon

Dungeons are shared content: a folder note plus room notes, indexed by `_rules/tools/build_dungeons.py` into `dungeons.json` and run from the dmScreen app. Read `_rules/Submitting a Dungeon.md`, `docs/authoring/Writing a Dungeon.md` and two existing dungeons of a similar level before you start.

## Steps
1. **Pitch back** in three lines: what it is, who built or holds it, why a party goes in. Pick the universe, the place it hangs off (`parent`), the `home_town`, the faction(s), the level range, a 3-4 letter `code` (unique: grep `^code:`), the tone. Confirm with the human.
2. **Map on paper first.** Seven to ten rooms on a grid; every exit two-way (`n` here means `s` there); no two rooms on one cell; every room reachable from the entry; `u`/`d` for floors. A corridor, a ring or a tree; let the prose supply the strangeness.
3. **Monsters.** Reuse the universe's `Bestiary/` by id. For a new creature, add a bestiary note (core fields + the ruleset's block: `dnd5e:` or `six_sides:`), with `tactics` and `lore`. Named variants get their own entry.
4. **Rooms.** `Rooms/<CODE-nn> <Name>.md`: `read_aloud` (two to four sentences, senses first, no mechanics), `exits`, `features`, `encounters` (`{ref, count}`), `traps` (DCs), `puzzles` (two or three hints, each closer), `secrets`, `loot` (strings or item ids; make notable loot an `Items/` note), `dm_notes` (what is really going on). Rhythm: one encounter, one trap or puzzle and one secret per three rooms; a boss; a bargain; a way out the party did not come in by.
5. **Folder note**: `summary`, `hooks` (three), `rumours` (three), `wandering` (`die` + numbered `entries`), `tropes_involved` (ids from `Tropes/`), `author`, `status: draft`, `home_town`, `factions`.
6. **Quest.** A `Quests/` note threading the home town, the faction and the dungeon: three stages, hooks, rewards, `on_success`, `on_failure`. Add it to the dungeon's `quests:` and link the town.
7. **Check.** `python3 _rules/tools/build_dungeons.py . --check` then `python3 _rules/tools/validate.py . --quiet`. Fix layout conflicts by changing a direction or routing through another room.
8. **Build and PR.** `python3 _rules/tools/build_all.py .`, commit, PR titled `Dungeon: <name>`, one dungeon per PR.

## Voice
Read-aloud is what the party sees, hears and smells, then the one thing that matters. DM notes are blunt. In Tropelandia the situation is funny and the narration is not; in Ashfall nothing is funny.
