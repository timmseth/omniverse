# Writing a Dungeon

A dungeon is a folder note plus one note per room. The build tool turns them into a map and the DM screen app runs them room by room. The complete rules are in [`_rules/Submitting a Dungeon.md`](../../_rules/Submitting%20a%20Dungeon.md); this page is the walk-through.

## Before you write
- Pick a **place** it hangs off (a town, a region, a venue) and the **level range**.
- Pick a **code**: three or four capital letters, unique in the repository (`RAT`, `TWR`, `LCH`). Rooms are `CODE-01`, `CODE-02`…
- Decide the **home town** the party stages from, and the **faction** that built it, holds it or wants what is inside. Both are frontmatter fields; the world is more interesting when dungeons belong to someone.
- Read two existing dungeons of a similar level, and the [Style Guide](../reference/Style%20Guide.md).

## The folder note
`Multiverse/<Universe>/Dungeons/<Name>/<Name>.md`, `kind: dungeon`. Required: `id`, `code`, `parent`, `ruleset`, `level_range`, `tone`, `entry` (the first room's id), `summary`, `hooks`, `author`, `status: draft`. Add `rumours`, a `wandering` table (`die` plus `entries` like `"3: A rat pauses, reads the party's boots, and leaves"`), `tropes_involved`, `home_town`, `factions`. Copy `_rules/templates/Dungeon Template.md`.

## Room notes
`Rooms/<CODE-nn> <Name>.md`, `kind: room`, id `<universe>.room.<dungeon-slug>.<nn>-<room-slug>`. Each room has:
- **`read_aloud`**: two to four sentences the DM reads when the party enters. Senses first (what they see, hear, smell), then the one thing that matters. No mechanics in it.
- **`exits`**: a list of `{dir, to, kind, state, note}`. Directions `n s e w ne nw se sw u d`, plus `out` (`to: outside`). Every exit has a matching exit back in the other room (`n` here, `s` there); the build tool refuses otherwise. `u` and `d` change floor. Kinds: `door archway passage stairs ladder secret portal hatch window chute bridge`. States: `open closed locked stuck barred trapped hidden rubble`.
- **`features`**: things in the room a party can interact with, one line each.
- **`encounters`**: `{name, monsters: [{ref, count}], tactics}`. `ref` is a bestiary id; the build tool fills in hp, AC and attacks from it. For a creature not in the bestiary, give `name`, `count`, `hp`, `ac`, `attack` inline, or better, add it to the bestiary.
- **`traps`**: `{name, trigger, effect, detect_dc, disarm_dc}`.
- **`puzzles`**: `{name, description, solution, hints: [...], reward}`. Hints reveal one at a time in the app; write two or three, each closer than the last.
- **`secrets`**: `{description, dc}`.
- **`loot`**: strings, or item ids for anything notable (`tropelandia.item.the-bone-key`).
- **`dm_notes`**: what is really going on, how the room connects to the quest, what to do if the party does something clever.

## Layout rules
The map is derived, not drawn: the tool walks exits from the entry room and places rooms on a grid. Two rooms cannot land on the same cell; a room reachable by two routes must land in the same place by both. Keep layouts simple (a corridor, a ring, a tree) and let the prose supply the strangeness. Check with:
```
python3 _rules/tools/build_dungeons.py . --check
```

## Size
Seven to ten rooms is a session. One encounter, one trap or puzzle and one secret per three rooms is a good rhythm. A boss, a bargain and a way out that the party did not come in by.

## Submitting
One dungeon per pull request, `status: draft`. The maintainer runs it (or reads it) and bumps it to `playtested`, then `canon` once it has been part of a merged event. Every DM gets it on their next Sync.
