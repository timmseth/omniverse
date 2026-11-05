---
id: tropelandia.room.mimic-inn.05-room-seven
kind: room
name: Room Seven
number: 5
code: INN-05
parent: tropelandia.dungeon.mimic-inn
dungeon: tropelandia.dungeon.mimic-inn
universe: tropelandia
light: moonlit
size: 20 x 15 ft
exits:
- dir: e
  to: tropelandia.room.mimic-inn.03-upstairs-landing
  kind: door
  state: open
  note: ''
read_aloud: A comfortable room with a bed, a washstand and a window onto a night sky that doesn't match the actual sky. A pile of luggage sits in the corner, some of it moving. A guest book on the nightstand lists names, none of them crossed out.
features:
- A bed that wants to be slept in
- A false window
- A guest book
encounters:
- name: Luggage
  monsters:
  - name: Mimic spawn
    count: 3
    hp: 20
    ac: 12
    attack: bite +4, 1d6+2
  tactics: Suitcases spring to life if the bed is touched.
  treasure: ''
traps: []
puzzles: []
secrets: []
loot:
- The missing merchants' coin purses (300 gp)
- 'A guest book with a final entry: ''help'''
dm_notes: ''
---
# INN-05 Room Seven

> A comfortable room with a bed, a washstand and a window onto a night sky that doesn't match the actual sky. A pile of luggage sits in the corner, some of it moving. A guest book on the nightstand lists names, none of them crossed out.

## Exits
- **east** (door, open): [[INN-03 Upstairs Landing|upstairs landing]]

## Features
- A bed that wants to be slept in
- A false window
- A guest book

## Encounters
- **Luggage**: 3x Mimic spawn (HP 20, AC 12). Suitcases spring to life if the bed is touched.

## Loot
- The missing merchants' coin purses (300 gp)
- A guest book with a final entry: 'help'
