---
id: tropelandia.room.glintfang-hoard.07-treasury-annex
kind: room
name: Treasury Annex
number: 7
code: DRG-07
parent: tropelandia.dungeon.glintfang-hoard
dungeon: tropelandia.dungeon.glintfang-hoard
universe: tropelandia
light: steady
size: 40 x 30 ft
exits:
- dir: w
  to: tropelandia.room.glintfang-hoard.06-the-hoard
  kind: archway
  state: open
  note: ''
read_aloud: 'A tidy room of shelves and numbered boxes, each filled with a single type of treasure: rings in one, crowns in another. A tiny dragon-sized stool sits before a ledger. A brass bell on the desk is labelled RING FOR SERVICE.'
features:
- Labelled boxes
- A ledger
- A service bell
encounters:
- name: Intern
  monsters:
  - name: Kobold accountant
    count: 2
    hp: 5
    ac: 12
    attack: pen +3, 1d4
    ref: tropelandia.monster.kobold-accountant
  tactics: They sound the alarm if anyone takes an item without a receipt.
  treasure: ''
traps: []
puzzles: []
secrets: []
loot:
- A box of assorted gems (200 gp)
- A box of rings (3 magic rings, DM's choice)
dm_notes: ''
---
# DRG-07 Treasury Annex

> A tidy room of shelves and numbered boxes, each filled with a single type of treasure: rings in one, crowns in another. A tiny dragon-sized stool sits before a ledger. A brass bell on the desk is labelled RING FOR SERVICE.

## Exits
- **west** (archway, open): [[DRG-06 The Hoard|the hoard]]

## Features
- Labelled boxes
- A ledger
- A service bell

## Encounters
- **Intern**: 2x Kobold accountant (HP 5, AC 12). They sound the alarm if anyone takes an item without a receipt.

## Loot
- A box of assorted gems (200 gp)
- A box of rings (3 magic rings, DM's choice)
