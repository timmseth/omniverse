---
id: tropelandia.room.dwarven-folly.09-the-breach
kind: room
name: The Breach
number: 9
code: DWF-09
parent: tropelandia.dungeon.dwarven-folly
dungeon: tropelandia.dungeon.dwarven-folly
universe: tropelandia
light: unnatural
size: 20 x 30 ft
exits:
- dir: n
  to: tropelandia.room.dwarven-folly.07-the-fungus-caverns
  kind: passage
  state: closed
  note: A fresh-dug tunnel
- dir: s
  to: tropelandia.room.dwarven-folly.10-the-thing-they-dug-into
  kind: portal
  state: open
  note: A hole in the rock
read_aloud: 'A rough-hewn tunnel, newer than the rest, ends in a ragged hole in the rock. Beyond it lies a chamber of impossible geometry: stone that is not stone, angles that hurt to look at. A voice speaks from the hole: ''Hello? Are you the plumber?'''
features:
- The knocking hole
- Strange stone
- Duergar corpses with serene smiles
encounters: []
traps:
- name: Mind-bending geometry
  trigger: Staring into the hole
  effect: DC 14 Wis save or stunned for 1 round
  detect_dc: 13
  disarm_dc: 0
puzzles: []
secrets: []
loot: []
dm_notes: ''
---
# DWF-09 The Breach

> A rough-hewn tunnel, newer than the rest, ends in a ragged hole in the rock. Beyond it lies a chamber of impossible geometry: stone that is not stone, angles that hurt to look at. A voice speaks from the hole: 'Hello? Are you the plumber?'

## Exits
- **north** (passage, closed): [[DWF-07 The Fungus Caverns|the fungus caverns]] — A fresh-dug tunnel
- **south** (portal, open): [[DWF-10 The Thing They Dug Into|the thing they dug into]] — A hole in the rock

## Features
- The knocking hole
- Strange stone
- Duergar corpses with serene smiles

## Traps
- **Mind-bending geometry**: Staring into the hole → DC 14 Wis save or stunned for 1 round (detect DC 13, disarm DC 0)
