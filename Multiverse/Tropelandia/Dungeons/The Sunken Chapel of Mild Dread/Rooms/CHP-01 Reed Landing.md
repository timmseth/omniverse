---
id: tropelandia.room.sunken-chapel.01-reed-landing
kind: room
name: Reed Landing
number: 1
code: CHP-01
parent: tropelandia.dungeon.sunken-chapel
dungeon: tropelandia.dungeon.sunken-chapel
universe: tropelandia
light: mist and moonlight
size: 20 x 10 ft
exits:
- dir: s
  to: tropelandia.room.sunken-chapel.02-the-nave
  kind: door
  state: stuck
  note: DC 12 Str to force
read_aloud: 'A broken wooden jetty pokes out of the reeds, leading to a half-sunken chapel door. Mist coils over black water; frogs fall silent as you approach. The door, swollen with damp, bears a hand-painted sign: PLEASE WIPE YOUR FEET (AND YOUR MEMORIES).'
features:
- A rotten jetty
- Frog silence
- A mooring post with a ghostly rope
encounters:
- name: Reed-lurkers
  monsters:
  - name: Giant frog
    count: 3
    hp: 18
    ac: 11
    attack: bite +3, 1d6+1, swallow
  tactics: They ambush from the water as the party approaches the door.
  treasure: ''
traps: []
puzzles: []
secrets: []
loot:
- A pouch of lost coins in the reeds (25 gp)
dm_notes: ''
---
# CHP-01 Reed Landing

> A broken wooden jetty pokes out of the reeds, leading to a half-sunken chapel door. Mist coils over black water; frogs fall silent as you approach. The door, swollen with damp, bears a hand-painted sign: PLEASE WIPE YOUR FEET (AND YOUR MEMORIES).

## Exits
- **south** (door, stuck): [[CHP-02 The Nave|the nave]] — DC 12 Str to force

## Features
- A rotten jetty
- Frog silence
- A mooring post with a ghostly rope

## Encounters
- **Reed-lurkers**: 3x Giant frog (HP 18, AC 11). They ambush from the water as the party approaches the door.

## Loot
- A pouch of lost coins in the reeds (25 gp)
