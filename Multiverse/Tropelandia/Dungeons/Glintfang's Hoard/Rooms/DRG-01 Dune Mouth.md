---
id: tropelandia.room.glintfang-hoard.01-dune-mouth
kind: room
name: Dune Mouth
number: 1
code: DRG-01
parent: tropelandia.dungeon.glintfang-hoard
dungeon: tropelandia.dungeon.glintfang-hoard
universe: tropelandia
light: desert sun
size: 30 x 15 ft
exits:
- dir: s
  to: tropelandia.room.glintfang-hoard.02-sandstone-gallery
  kind: archway
  state: open
  note: ''
- dir: out
  to: outside
  kind: passage
  state: open
  note: The dunes
read_aloud: 'A cleft in a towering dune opens into carved sandstone, its walls inscribed with a brass plaque: GLINTFANG & ASSOCIATES, EST. 612. PLEASE TAKE A NUMBER. A kobold in a waistcoat hands you a ticket stub that reads ''You are number 4,821''.'
features:
- The brass plaque
- A kobold greeter
- A wall of coins glittering in the sand
encounters:
- name: Kobold greeters
  monsters:
  - name: Kobold
    count: 3
    hp: 5
    ac: 12
    attack: dagger +4, 1d4+2
  tactics: They refuse entry until the party takes a ticket; combat only if shoved.
  treasure: ''
traps: []
puzzles: []
secrets: []
loot:
- A ticket stub (the party's place in the queue)
dm_notes: ''
---
# DRG-01 Dune Mouth

> A cleft in a towering dune opens into carved sandstone, its walls inscribed with a brass plaque: GLINTFANG & ASSOCIATES, EST. 612. PLEASE TAKE A NUMBER. A kobold in a waistcoat hands you a ticket stub that reads 'You are number 4,821'.

## Exits
- **south** (archway, open): [[DRG-02 Sandstone Gallery|sandstone gallery]]
- **out** (passage, open): outside — The dunes

## Features
- The brass plaque
- A kobold greeter
- A wall of coins glittering in the sand

## Encounters
- **Kobold greeters**: 3x Kobold (HP 5, AC 12). They refuse entry until the party takes a ticket; combat only if shoved.

## Loot
- A ticket stub (the party's place in the queue)
