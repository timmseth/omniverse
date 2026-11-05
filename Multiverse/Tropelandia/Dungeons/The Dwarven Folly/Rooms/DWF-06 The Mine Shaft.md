---
id: tropelandia.room.dwarven-folly.06-the-mine-shaft
kind: room
name: The Mine Shaft
number: 6
code: DWF-06
parent: tropelandia.dungeon.dwarven-folly
dungeon: tropelandia.dungeon.dwarven-folly
universe: tropelandia
light: swaying lanterns
size: 40 ft diameter, 200 ft deep
exits:
- dir: s
  to: tropelandia.room.dwarven-folly.07-the-fungus-caverns
  kind: passage
  state: open
  note: ''
- dir: u
  to: tropelandia.room.dwarven-folly.05-the-singing-forge
  kind: stairs
  state: open
  note: ''
read_aloud: A vast vertical shaft plunges into darkness, a spiral ramp winding down its walls. Lanterns on chains sway in the updraft. The air smells of wet stone and ancient things. Old mine carts sit abandoned on tracks that end in thin air.
features:
- Mine carts on broken rails
- A rope bridge
- Scratched warnings in dwarven
encounters: []
traps:
- name: Rotten bridge
  trigger: Crossing the rope bridge
  effect: DC 13 Dex save or fall 30 ft (3d6)
  detect_dc: 12
  disarm_dc: 0
puzzles: []
secrets: []
loot: []
dm_notes: ''
---
# DWF-06 The Mine Shaft

> A vast vertical shaft plunges into darkness, a spiral ramp winding down its walls. Lanterns on chains sway in the updraft. The air smells of wet stone and ancient things. Old mine carts sit abandoned on tracks that end in thin air.

## Exits
- **south** (passage, open): [[DWF-07 The Fungus Caverns|the fungus caverns]]
- **up** (stairs, open): [[DWF-05 The Singing Forge|the singing forge]]

## Features
- Mine carts on broken rails
- A rope bridge
- Scratched warnings in dwarven

## Traps
- **Rotten bridge**: Crossing the rope bridge → DC 13 Dex save or fall 30 ft (3d6) (detect DC 12, disarm DC 0)
