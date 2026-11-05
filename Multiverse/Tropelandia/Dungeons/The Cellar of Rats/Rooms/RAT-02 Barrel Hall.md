---
id: tropelandia.room.cellar-of-rats.02-barrel-hall
kind: room
name: Barrel Hall
number: 2
code: RAT-02
parent: tropelandia.dungeon.cellar-of-rats
dungeon: tropelandia.dungeon.cellar-of-rats
universe: tropelandia
light: dim
size: 30 x 20 ft
exits:
- dir: n
  to: tropelandia.room.cellar-of-rats.01-cellar-stairs
  kind: archway
  state: open
  note: ''
- dir: s
  to: tropelandia.room.cellar-of-rats.06-the-warren
  kind: passage
  state: open
  note: ''
- dir: e
  to: tropelandia.room.cellar-of-rats.03-cold-pantry
  kind: door
  state: stuck
  note: Swollen with damp (DC 12 Str)
- dir: w
  to: tropelandia.room.cellar-of-rats.04-wine-racks
  kind: archway
  state: open
  note: ''
read_aloud: A long, low hall lined with barrels on their sides, each stamped with the inn's gilded tankard. Water drips in a slow rhythm from the vaulted ceiling. Between the barrels, small shapes dart from shadow to shadow.
features:
- Barrels, some empty, some not
- A hand cart with a broken wheel
- Rat droppings in neat rows
encounters:
- name: Rat patrol
  monsters:
  - name: Giant rat
    count: 4
    hp: 7
    ac: 12
    attack: bite +4, 1d4+2
  tactics: Rats dart out from behind the barrels and try to split the party; they flee when two are killed, and tell the Rat King.
  treasure: ''
traps: []
puzzles: []
secrets: []
loot:
- A single silver piece, wedged under a barrel
dm_notes: If the party leaves a rat alive, it reports to the Rat King; the throne room encounter begins with a lookout.
---
# RAT-02 Barrel Hall

> A long, low hall lined with barrels on their sides, each stamped with the inn's gilded tankard. Water drips in a slow rhythm from the vaulted ceiling. Between the barrels, small shapes dart from shadow to shadow.

## Exits
- **north** (archway, open): [[RAT-01 Cellar Stairs|cellar stairs]]
- **south** (passage, open): [[RAT-06 The Warren|the warren]]
- **east** (door, stuck): [[RAT-03 Cold Pantry|cold pantry]] — Swollen with damp (DC 12 Str)
- **west** (archway, open): [[RAT-04 Wine Racks|wine racks]]

## Features
- Barrels, some empty, some not
- A hand cart with a broken wheel
- Rat droppings in neat rows

## Encounters
- **Rat patrol**: 4x Giant rat (HP 7, AC 12). Rats dart out from behind the barrels and try to split the party; they flee when two are killed, and tell the Rat King.

## Loot
- A single silver piece, wedged under a barrel

## DM notes
If the party leaves a rat alive, it reports to the Rat King; the throne room encounter begins with a lookout.
