---
id: tropelandia.room.sunken-chapel.04-the-vestry
kind: room
name: The Vestry
number: 4
code: CHP-04
parent: tropelandia.dungeon.sunken-chapel
dungeon: tropelandia.dungeon.sunken-chapel
universe: tropelandia
light: dim
size: 15 x 15 ft
exits:
- dir: w
  to: tropelandia.room.sunken-chapel.02-the-nave
  kind: door
  state: open
  note: ''
read_aloud: A small side room with a locked cabinet, a moth-eaten vestment on a hook and a table laid for a meal nobody finished. A priest in a mouldering cassock sits at the table with a fork in his hand, staring at an empty plate with infinite patience.
features:
- A locked cabinet (DC 14)
- A table set for dinner
- The Priest (a ghost)
encounters:
- name: The Priest
  monsters:
  - name: Ghost of Father Mildred
    count: 1
    hp: 45
    ac: 11
    attack: withering touch +5, 4d6 (only if provoked)
  tactics: He wants someone to finish his sermon. If the party listens, he gives them his blessing and the cabinet key.
  treasure: ''
traps: []
puzzles: []
secrets: []
loot:
- A silver holy symbol worth 25 gp
- The vestry key
- A prayer scroll (bless x1)
dm_notes: A good place for a roleplay break; the priest can offer clues about the altar.
---
# CHP-04 The Vestry

> A small side room with a locked cabinet, a moth-eaten vestment on a hook and a table laid for a meal nobody finished. A priest in a mouldering cassock sits at the table with a fork in his hand, staring at an empty plate with infinite patience.

## Exits
- **west** (door, open): [[CHP-02 The Nave|the nave]]

## Features
- A locked cabinet (DC 14)
- A table set for dinner
- The Priest (a ghost)

## Encounters
- **The Priest**: 1x Ghost of Father Mildred (HP 45, AC 11). He wants someone to finish his sermon. If the party listens, he gives them his blessing and the cabinet key.

## Loot
- A silver holy symbol worth 25 gp
- The vestry key
- A prayer scroll (bless x1)

## DM notes
A good place for a roleplay break; the priest can offer clues about the altar.
