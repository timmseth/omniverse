---
id: omniverse.guide.submitting-a-dungeon
kind: guide
name: Submitting a Dungeon
parent: omniverse
---
# Submitting a Dungeon

Anyone can add a dungeon to a universe. It becomes available to every table, and to the **dmScreen** app, once it is merged. See [[README]], sections 9.4, 17.7 and 17.8 for the design.

## 1. Plan the dungeon
- Pick the universe it belongs to, and the place that contains it (a settlement, a region, even a planet). That place becomes the dungeon's `parent`.
- Pick a **code**: three or four capital letters, unique among dungeons (for example `RAT`, `TWR`). It prefixes your room file names so links stay unambiguous.
- Aim for 6 to 12 rooms. Fewer is fine for a one-shot; more is fine if the map earns it.
- Sketch the map on a grid first. The tool derives the map from your exits, so the exits must agree with a grid.

## 2. Write the notes
Copy the two templates from `_rules/templates/` ([[Dungeon Template]] and [[Room Template]]).

Folder layout:
```
Multiverse/<Universe>/Dungeons/<Dungeon Name>/
├── <Dungeon Name>.md
└── Rooms/
    ├── <CODE>-01 <Room Name>.md
    └── <CODE>-02 <Room Name>.md
```

**IDs.** Dungeon: `<universe>.dungeon.<slug>`. Room: `<universe>.room.<dungeon-slug>.<nn>-<room-slug>`, where `nn` is the room number with a leading zero.

**Read-aloud text** is what the DM reads to the table. Two or three sentences, in the present tense and the second person, using at least three senses. Put the interesting thing last. Leave out anything the characters cannot perceive.

**Exits.** One entry per exit, with a direction (`n s e w ne nw se sw u d`, or `out` for the way out of the dungeon with `to: outside`), a kind and a state. Write each connection from both rooms: if the Barrel Hall has an exit `e` to the Cold Pantry, the Cold Pantry needs an exit `w` back. Stairs and ladders use `u` and `d`.

**Encounters, traps, puzzles.** Give monsters integer `hp`, `ac` and `count` so the app can track them. Give traps integer `detect_dc` and `disarm_dc`. A puzzle needs a `solution` and two or three `hints` that get progressively clearer.

**Secrets and loot.** A secret has a `dc`. Loot is a list of short strings.

**Tone.** Match the universe. A Tropelandia dungeon plays its tropes for laughs. A serious universe will want a different register.

## 3. Check it
From the repository root:
```
pip install pyyaml
python3 _rules/tools/build_dungeons.py . --check
```
The tool reports errors (which block a merge) and warnings. Typical errors: an exit with no matching exit back, two rooms in the same grid cell, a room that cannot be reached from the entry, or a non-integer DC.

To see your dungeon in the app, run the tool without `--check`. It writes `_generated/dungeons.json`. Leave that file out of your pull request; the maintainers regenerate it on merge.

## 4. Submit
1. Fork the repository and put your dungeon on a branch.
2. Open a pull request titled `Dungeon: <name>`, one dungeon per pull request.
3. The universe's maintainer reviews it for tone and fit, and checks the licence. They may ask for changes, or suggest it for a different universe.
4. After the merge, the index is rebuilt and the dungeon appears in the app on the next **Sync**.

## Rules
- **Original writing or openly licensed material only.** Do not copy text, maps or stat blocks from published adventures. Monster stat values from the SRD are fine; give attribution if you use SRD text.
- **Data only.** Notes, no scripts or macros.
- **Credit.** Set `author` to your name or handle. It stays with the dungeon.
- **Status.** Start at `draft`. A maintainer may move it to `playtested` after a table has run it.

## Statuses
`sample` (shipped with the project), `draft`, `playtested`, `canon` (part of the universe's accepted lore).
