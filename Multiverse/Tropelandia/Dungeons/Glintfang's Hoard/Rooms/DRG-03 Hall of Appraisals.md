---
id: tropelandia.room.glintfang-hoard.03-hall-of-appraisals
kind: room
name: Hall of Appraisals
number: 3
code: DRG-03
parent: tropelandia.dungeon.glintfang-hoard
dungeon: tropelandia.dungeon.glintfang-hoard
universe: tropelandia
light: mirrored glare
size: 40 x 40 ft
exits:
- dir: s
  to: tropelandia.room.glintfang-hoard.09-servants-quarters
  kind: door
  state: open
  note: ''
- dir: w
  to: tropelandia.room.glintfang-hoard.02-sandstone-gallery
  kind: door
  state: open
  note: ''
read_aloud: 'A grand hall of mirrors, each framing a different valuation: your weapons, your armour, your companions. A brass mechanical appraiser clicks and whirs, spitting out slips of paper that read ''LOW VALUE'' on everything.'
features:
- A brass appraiser
- Mirrors that value things
- A stack of rejected slips
encounters:
- name: Mirror guardians
  monsters:
  - name: Mimic mirror
    count: 2
    hp: 40
    ac: 12
    attack: bite +5, 2d6
  tactics: Mirrors that copy the party's reflections attack on a failed appraisal.
  treasure: ''
traps: []
puzzles:
- name: The Appraiser
  description: The brass appraiser is rigged; it values common things low and strange things high.
  solution: Offer it something unique (a story, a song, a lie) to get a favourable valuation.
  hints:
  - It prefers novelty.
  - Describe an item as 'unique'.
  - The slips are in a code.
  reward: A letter of introduction to Glintfang, which grants a better trade.
secrets: []
loot: []
dm_notes: ''
---
# DRG-03 Hall of Appraisals

> A grand hall of mirrors, each framing a different valuation: your weapons, your armour, your companions. A brass mechanical appraiser clicks and whirs, spitting out slips of paper that read 'LOW VALUE' on everything.

## Exits
- **south** (door, open): [[DRG-09 Servants' Quarters|servants quarters]]
- **west** (door, open): [[DRG-02 Sandstone Gallery|sandstone gallery]]

## Features
- A brass appraiser
- Mirrors that value things
- A stack of rejected slips

## Encounters
- **Mirror guardians**: 2x Mimic mirror (HP 40, AC 12). Mirrors that copy the party's reflections attack on a failed appraisal.

## Puzzles
- **The Appraiser**: The brass appraiser is rigged; it values common things low and strange things high.
