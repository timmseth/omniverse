---
id: tropelandia.room.dwarven-folly.01-the-gatehouse
kind: room
name: The Gatehouse
number: 1
code: DWF-01
parent: tropelandia.dungeon.dwarven-folly
dungeon: tropelandia.dungeon.dwarven-folly
universe: tropelandia
light: daylight fading
size: 40 x 20 ft
exits:
- dir: s
  to: tropelandia.room.dwarven-folly.02-the-great-hall
  kind: archway
  state: open
  note: ''
- dir: out
  to: outside
  kind: door
  state: open
  note: The mountain path
read_aloud: 'Twin stone doors, three storeys tall, stand ajar in the mountainside, carved with rank upon rank of stern dwarven kings. A guardhouse flanks them, its door off its hinges. A banner reads KARAK-DUM-DUM: OPEN 9 TO 5 (CLOSED INDEFINITELY).'
features:
- Carved dwarf kings
- A broken guardhouse
- A mounted skeleton of a dwarf with a pike
encounters:
- name: Rusty watch
  monsters:
  - name: Animated armor
    count: 2
    hp: 33
    ac: 18
    attack: slam +4, 2d6+2
  tactics: The gate's armour wakes when anyone crosses without announcing themselves.
  treasure: ''
traps: []
puzzles: []
secrets: []
loot:
- A dwarven battle standard worth 30 gp
dm_notes: ''
---
# DWF-01 The Gatehouse

> Twin stone doors, three storeys tall, stand ajar in the mountainside, carved with rank upon rank of stern dwarven kings. A guardhouse flanks them, its door off its hinges. A banner reads KARAK-DUM-DUM: OPEN 9 TO 5 (CLOSED INDEFINITELY).

## Exits
- **south** (archway, open): [[DWF-02 The Great Hall|the great hall]]
- **out** (door, open): outside — The mountain path

## Features
- Carved dwarf kings
- A broken guardhouse
- A mounted skeleton of a dwarf with a pike

## Encounters
- **Rusty watch**: 2x Animated armor (HP 33, AC 18). The gate's armour wakes when anyone crosses without announcing themselves.

## Loot
- A dwarven battle standard worth 30 gp
