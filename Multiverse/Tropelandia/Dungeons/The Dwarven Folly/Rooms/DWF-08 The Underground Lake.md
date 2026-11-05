---
id: tropelandia.room.dwarven-folly.08-the-underground-lake
kind: room
name: The Underground Lake
number: 8
code: DWF-08
parent: tropelandia.dungeon.dwarven-folly
dungeon: tropelandia.dungeon.dwarven-folly
universe: tropelandia
light: dark
size: 80 x 60 ft
exits:
- dir: w
  to: tropelandia.room.dwarven-folly.07-the-fungus-caverns
  kind: passage
  state: open
  note: ''
read_aloud: A still black lake fills a vaulted cavern, its surface dotted with the roofs of drowned dwarven buildings. A narrow stone causeway crosses the water. Something very large moves slowly beneath the surface.
features:
- The causeway
- Drowned buildings
- A boat tied to a post
encounters:
- name: Lake guardian
  monsters:
  - name: Giant octopus
    count: 1
    hp: 52
    ac: 11
    attack: tentacles +5, 2d6+3
  tactics: It attacks anyone on the causeway who splashes; it can be bargained with using fish.
  treasure: ''
traps: []
puzzles: []
secrets: []
loot:
- A drowned dwarven vault (50 gp and a gem)
dm_notes: ''
---
# DWF-08 The Underground Lake

> A still black lake fills a vaulted cavern, its surface dotted with the roofs of drowned dwarven buildings. A narrow stone causeway crosses the water. Something very large moves slowly beneath the surface.

## Exits
- **west** (passage, open): [[DWF-07 The Fungus Caverns|the fungus caverns]]

## Features
- The causeway
- Drowned buildings
- A boat tied to a post

## Encounters
- **Lake guardian**: 1x Giant octopus (HP 52, AC 11). It attacks anyone on the causeway who splashes; it can be bargained with using fish.

## Loot
- A drowned dwarven vault (50 gp and a gem)
