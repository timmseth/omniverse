---
id: tropelandia.room.mimic-inn.06-the-linen-closet
kind: room
name: The Linen Closet
number: 6
code: INN-06
parent: tropelandia.dungeon.mimic-inn
dungeon: tropelandia.dungeon.mimic-inn
universe: tropelandia
light: dark
size: 10 x 10 ft
exits:
- dir: n
  to: tropelandia.room.mimic-inn.03-upstairs-landing
  kind: door
  state: open
  note: ''
read_aloud: 'A narrow closet of folded sheets and towels, smelling of lavender. A ladder disappears into a hatch in the ceiling. A tag on the top shelf reads: DO NOT UNFOLD.'
features:
- Folded sheets
- A ceiling hatch
- A sealed linen bag
encounters: []
traps:
- name: Folded sheet
  trigger: Unfolding the top sheet
  effect: 'The sheet is a mimic: 3d6 bludgeoning, DC 14 Str to escape'
  detect_dc: 15
  disarm_dc: 0
puzzles: []
secrets: []
loot:
- A magic towel (grants advantage on one saving throw vs. fire)
dm_notes: ''
---
# INN-06 The Linen Closet

> A narrow closet of folded sheets and towels, smelling of lavender. A ladder disappears into a hatch in the ceiling. A tag on the top shelf reads: DO NOT UNFOLD.

## Exits
- **north** (door, open): [[INN-03 Upstairs Landing|upstairs landing]]

## Features
- Folded sheets
- A ceiling hatch
- A sealed linen bag

## Traps
- **Folded sheet**: Unfolding the top sheet → The sheet is a mimic: 3d6 bludgeoning, DC 14 Str to escape (detect DC 15, disarm DC 0)

## Loot
- A magic towel (grants advantage on one saving throw vs. fire)
