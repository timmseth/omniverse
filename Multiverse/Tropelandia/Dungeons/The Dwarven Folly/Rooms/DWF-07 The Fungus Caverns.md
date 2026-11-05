---
id: tropelandia.room.dwarven-folly.07-the-fungus-caverns
kind: room
name: The Fungus Caverns
number: 7
code: DWF-07
parent: tropelandia.dungeon.dwarven-folly
dungeon: tropelandia.dungeon.dwarven-folly
universe: tropelandia
light: bioluminescent
size: 60 x 50 ft
exits:
- dir: n
  to: tropelandia.room.dwarven-folly.06-the-mine-shaft
  kind: passage
  state: open
  note: ''
- dir: s
  to: tropelandia.room.dwarven-folly.09-the-breach
  kind: passage
  state: closed
  note: A fresh-dug tunnel
- dir: e
  to: tropelandia.room.dwarven-folly.08-the-underground-lake
  kind: passage
  state: open
  note: ''
read_aloud: A cavern of luminous mushrooms, some tall as trees, bathes the stone in sickly blue and green. Spores drift through the air like snow. Between the stalks, a lumbering shape sways, humming along with the faraway song.
features:
- Giant mushrooms
- A glowing spore cloud
- A duergar camp, abandoned
encounters:
- name: Shriekers and myconids
  monsters:
  - name: Shrieker
    count: 2
    hp: 13
    ac: 5
    attack: shriek
  - name: Myconid sovereign
    count: 1
    hp: 60
    ac: 10
    attack: fist +4, 1d6+2
  tactics: Shriekers alert duergar nearby; the myconid is friendly if offered rare minerals.
  treasure: ''
traps: []
puzzles: []
secrets: []
loot:
- Rare mushrooms (potions)
- Duergar supplies
dm_notes: ''
---
# DWF-07 The Fungus Caverns

> A cavern of luminous mushrooms, some tall as trees, bathes the stone in sickly blue and green. Spores drift through the air like snow. Between the stalks, a lumbering shape sways, humming along with the faraway song.

## Exits
- **north** (passage, open): [[DWF-06 The Mine Shaft|the mine shaft]]
- **south** (passage, closed): [[DWF-09 The Breach|the breach]] — A fresh-dug tunnel
- **east** (passage, open): [[DWF-08 The Underground Lake|the underground lake]]

## Features
- Giant mushrooms
- A glowing spore cloud
- A duergar camp, abandoned

## Encounters
- **Shriekers and myconids**: 2x Shrieker (HP 13, AC 5), 1x Myconid sovereign (HP 60, AC 10). Shriekers alert duergar nearby; the myconid is friendly if offered rare minerals.

## Loot
- Rare mushrooms (potions)
- Duergar supplies
