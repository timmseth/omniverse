---
id: tropelandia.room.mimic-inn.02-the-kitchen
kind: room
name: The Kitchen
number: 2
code: INN-02
parent: tropelandia.dungeon.mimic-inn
dungeon: tropelandia.dungeon.mimic-inn
universe: tropelandia
light: steam
size: 30 x 20 ft
exits:
- dir: w
  to: tropelandia.room.mimic-inn.01-the-common-room
  kind: door
  state: open
  note: ''
read_aloud: A steaming kitchen with hanging pots and a great cauldron. Something simmers within, smelling almost, but not quite, like stew. A chopping board holds half a cheese, still wriggling.
features:
- A huge cauldron
- A wriggling cheese
- A row of identical knives
encounters:
- name: Cook's apprentice
  monsters:
  - name: Mimic spawn
    count: 2
    hp: 20
    ac: 12
    attack: bite +4, 1d6+2
  tactics: Hatchlings play at being plates and cutlery; they bite if the party tries to eat.
  treasure: ''
traps: []
puzzles: []
secrets: []
loot:
- A cauldron of stew (heals 1d8, but you're sleepy)
dm_notes: ''
---
# INN-02 The Kitchen

> A steaming kitchen with hanging pots and a great cauldron. Something simmers within, smelling almost, but not quite, like stew. A chopping board holds half a cheese, still wriggling.

## Exits
- **west** (door, open): [[INN-01 The Common Room|the common room]]

## Features
- A huge cauldron
- A wriggling cheese
- A row of identical knives

## Encounters
- **Cook's apprentice**: 2x Mimic spawn (HP 20, AC 12). Hatchlings play at being plates and cutlery; they bite if the party tries to eat.

## Loot
- A cauldron of stew (heals 1d8, but you're sleepy)
