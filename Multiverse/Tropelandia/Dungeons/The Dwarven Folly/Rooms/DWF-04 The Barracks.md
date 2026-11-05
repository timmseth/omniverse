---
id: tropelandia.room.dwarven-folly.04-the-barracks
kind: room
name: The Barracks
number: 4
code: DWF-04
parent: tropelandia.dungeon.dwarven-folly
dungeon: tropelandia.dungeon.dwarven-folly
universe: tropelandia
light: dim
size: 50 x 30 ft
exits:
- dir: e
  to: tropelandia.room.dwarven-folly.02-the-great-hall
  kind: door
  state: open
  note: ''
read_aloud: Rows of bunks stretch into the dark, each topped with a neatly folded blanket and a tin cup. A rack of axes gleams in the dust. In the far corner a lone dwarf in full armour sits upright on a bunk, motionless, a half-eaten loaf of stone-bread in one hand.
features:
- Neat bunks
- An axe rack
- A seated dwarf, unmoving
encounters:
- name: The Last Sentry
  monsters:
  - name: Dwarven revenant
    count: 1
    hp: 60
    ac: 16
    attack: greataxe +6, 1d12+4
  tactics: He rises if anyone sits on his bunk; he can be calmed by returning the Banner from the gatehouse.
  treasure: ''
traps: []
puzzles: []
secrets: []
loot:
- Dwarven axes (3, worth 15 gp each)
- A tin cup engraved with a name
dm_notes: ''
---
# DWF-04 The Barracks

> Rows of bunks stretch into the dark, each topped with a neatly folded blanket and a tin cup. A rack of axes gleams in the dust. In the far corner a lone dwarf in full armour sits upright on a bunk, motionless, a half-eaten loaf of stone-bread in one hand.

## Exits
- **east** (door, open): [[DWF-02 The Great Hall|the great hall]]

## Features
- Neat bunks
- An axe rack
- A seated dwarf, unmoving

## Encounters
- **The Last Sentry**: 1x Dwarven revenant (HP 60, AC 16). He rises if anyone sits on his bunk; he can be calmed by returning the Banner from the gatehouse.

## Loot
- Dwarven axes (3, worth 15 gp each)
- A tin cup engraved with a name
