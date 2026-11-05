---
id: tropelandia.room.goblin-union-hall.03-the-break-room
kind: room
name: The Break Room
number: 3
code: GOB-03
parent: tropelandia.dungeon.goblin-union-hall
dungeon: tropelandia.dungeon.goblin-union-hall
universe: tropelandia
light: warm
size: 20 x 20 ft
exits:
- dir: s
  to: tropelandia.room.goblin-union-hall.06-the-workshop
  kind: door
  state: open
  note: ''
- dir: w
  to: tropelandia.room.goblin-union-hall.02-reception
  kind: door
  state: open
  note: ''
read_aloud: 'A small break room with a chipped table, a kettle that has been boiling for six weeks and a bulletin board reading: BREAK ROOM NEEDS A WINDOW. A few exhausted goblins slump around the table, nursing mugs of fungus tea.'
features:
- A chipped table
- A permanent kettle
- A bulletin board of demands
encounters:
- name: Tired workers
  monsters:
  - name: Goblin
    count: 3
    hp: 7
    ac: 15
    attack: scimitar +4, 1d6+2
    ref: tropelandia.monster.goblin
  tactics: Not hostile; they want a deal. Happy to talk.
  treasure: ''
traps: []
puzzles: []
secrets: []
loot:
- A mug of fungus tea (restores 1d4 HP)
- A list of union demands
dm_notes: ''
---
# GOB-03 The Break Room

> A small break room with a chipped table, a kettle that has been boiling for six weeks and a bulletin board reading: BREAK ROOM NEEDS A WINDOW. A few exhausted goblins slump around the table, nursing mugs of fungus tea.

## Exits
- **south** (door, open): [[GOB-06 The Workshop|the workshop]]
- **west** (door, open): [[GOB-02 Reception|reception]]

## Features
- A chipped table
- A permanent kettle
- A bulletin board of demands

## Encounters
- **Tired workers**: 3x Goblin (HP 7, AC 15). Not hostile; they want a deal. Happy to talk.

## Loot
- A mug of fungus tea (restores 1d4 HP)
- A list of union demands
