---
id: tropelandia.room.goblin-union-hall.01-the-picket-line
kind: room
name: The Picket Line
number: 1
code: GOB-01
parent: tropelandia.dungeon.goblin-union-hall
dungeon: tropelandia.dungeon.goblin-union-hall
universe: tropelandia
light: dappled sun
size: 40 x 40 ft
exits:
- dir: s
  to: tropelandia.room.goblin-union-hall.02-reception
  kind: door
  state: closed
  note: Blocked by pickets
- dir: out
  to: outside
  kind: passage
  state: open
  note: The forest road
read_aloud: 'A hollow oak, three storeys tall, rises out of the forest floor. A ring of goblins marches in circles outside it, carrying signs: UNFAIR TO GOBLINS, MORE MUSHROOMS, NO MORE DOOMED RAIDS. They look at the party with the weary dignity of the underpaid.'
features:
- Picketing goblins
- Hand-lettered signs
- A brazier of mushroom soup
encounters:
- name: Picketers
  monsters:
  - name: Goblin
    count: 6
    hp: 7
    ac: 15
    attack: scimitar +4, 1d6+2
    ref: tropelandia.monster.goblin
  tactics: They fight if the party crosses the line without talking; they'll let a mediator pass.
  treasure: ''
traps: []
puzzles: []
secrets: []
loot: []
dm_notes: Wins by talking. Violence is the long way round.
---
# GOB-01 The Picket Line

> A hollow oak, three storeys tall, rises out of the forest floor. A ring of goblins marches in circles outside it, carrying signs: UNFAIR TO GOBLINS, MORE MUSHROOMS, NO MORE DOOMED RAIDS. They look at the party with the weary dignity of the underpaid.

## Exits
- **south** (door, closed): [[GOB-02 Reception|reception]] — Blocked by pickets
- **out** (passage, open): outside — The forest road

## Features
- Picketing goblins
- Hand-lettered signs
- A brazier of mushroom soup

## Encounters
- **Picketers**: 6x Goblin (HP 7, AC 15). They fight if the party crosses the line without talking; they'll let a mediator pass.

## DM notes
Wins by talking. Violence is the long way round.
