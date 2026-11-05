---
id: tropelandia.room.cellar-of-rats.04-wine-racks
kind: room
name: Wine Racks
number: 4
code: RAT-04
parent: tropelandia.dungeon.cellar-of-rats
dungeon: tropelandia.dungeon.cellar-of-rats
universe: tropelandia
light: dim
size: 25 x 15 ft
exits:
- dir: s
  to: tropelandia.room.cellar-of-rats.05-collapsed-tunnel
  kind: passage
  state: rubble
  note: Choked with fallen stone; crawl only
- dir: e
  to: tropelandia.room.cellar-of-rats.02-barrel-hall
  kind: archway
  state: open
  note: ''
read_aloud: Floor-to-ceiling wine racks stretch into the gloom, most of them smashed. A drift of glass and sticky stains runs toward the south wall, where the floor tilts into a gap. Something has been drinking here, and has left a very small bottle of excellent vintage on the floor.
features:
- Smashed racks
- A tiny, immaculate bottle of vintage wine
- A trail of paw prints through the glass
encounters:
- name: Wine thief
  monsters:
  - name: Giant rat
    count: 2
    hp: 7
    ac: 12
    attack: bite +4, 1d4+2
    ref: tropelandia.monster.giant-rat
  - name: Rat Sommelier
    count: 1
    hp: 9
    ac: 13
    attack: bite +4, 1d4+2 (disadvantage if the party is rude about the wine)
    ref: tropelandia.monster.rat-sommelier
  tactics: The sommelier tries to bargain; refuse and it signals the rest.
  treasure: ''
traps: []
puzzles: []
secrets: []
loot:
- A bottle of fine wine worth 25 gp
dm_notes: ''
---
# RAT-04 Wine Racks

> Floor-to-ceiling wine racks stretch into the gloom, most of them smashed. A drift of glass and sticky stains runs toward the south wall, where the floor tilts into a gap. Something has been drinking here, and has left a very small bottle of excellent vintage on the floor.

## Exits
- **south** (passage, rubble): [[RAT-05 Collapsed Tunnel|collapsed tunnel]] — Choked with fallen stone; crawl only
- **east** (archway, open): [[RAT-02 Barrel Hall|barrel hall]]

## Features
- Smashed racks
- A tiny, immaculate bottle of vintage wine
- A trail of paw prints through the glass

## Encounters
- **Wine thief**: 2x Giant rat (HP 7, AC 12), 1x Rat Sommelier (HP 9, AC 13). The sommelier tries to bargain; refuse and it signals the rest.

## Loot
- A bottle of fine wine worth 25 gp
