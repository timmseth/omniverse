---
id: tropelandia.room.restricted-section.06-the-catwalk
kind: room
name: The Catwalk
number: 6
code: ACD-06
parent: tropelandia.dungeon.restricted-section
dungeon: tropelandia.dungeon.restricted-section
universe: tropelandia
light: starlit
size: 80 x 10 ft
exits:
- dir: e
  to: tropelandia.room.restricted-section.07-rare-manuscripts
  kind: door
  state: open
  note: ''
- dir: w
  to: tropelandia.room.restricted-section.08-the-deans-private-reserve
  kind: door
  state: open
  note: ''
- dir: d
  to: tropelandia.room.restricted-section.05-the-stacks-labyrinth
  kind: ladder
  state: open
  note: ''
read_aloud: A web of iron catwalks high above the stacks. Wind whistles through the shelves; below, the lanterns look like stars. Along the catwalk, doors lead to the Dean's private reserve and the Rare Manuscripts.
features:
- Iron catwalks
- A view down the Stacks
- Brass signposts
encounters:
- name: Gargoyle librarians
  monsters:
  - name: Gargoyle
    count: 2
    hp: 52
    ac: 15
    attack: claws +4, 2d6+2
  tactics: They perch above the catwalk and drop on anyone shouting.
  treasure: ''
traps:
- name: Rotten walkway
  trigger: Running on the catwalk
  effect: DC 13 Dex save or fall 30 ft
  detect_dc: 14
  disarm_dc: 0
puzzles: []
secrets: []
loot: []
dm_notes: ''
---
# ACD-06 The Catwalk

> A web of iron catwalks high above the stacks. Wind whistles through the shelves; below, the lanterns look like stars. Along the catwalk, doors lead to the Dean's private reserve and the Rare Manuscripts.

## Exits
- **east** (door, open): [[ACD-07 Rare Manuscripts|rare manuscripts]]
- **west** (door, open): [[ACD-08 The Dean's Private Reserve|the deans private reserve]]
- **down** (ladder, open): [[ACD-05 The Stacks Labyrinth|the stacks labyrinth]]

## Features
- Iron catwalks
- A view down the Stacks
- Brass signposts

## Encounters
- **Gargoyle librarians**: 2x Gargoyle (HP 52, AC 15). They perch above the catwalk and drop on anyone shouting.

## Traps
- **Rotten walkway**: Running on the catwalk → DC 13 Dex save or fall 30 ft (detect DC 14, disarm DC 0)
