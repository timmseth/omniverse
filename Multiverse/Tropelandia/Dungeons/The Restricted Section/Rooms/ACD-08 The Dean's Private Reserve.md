---
id: tropelandia.room.restricted-section.08-the-deans-private-reserve
kind: room
name: The Dean's Private Reserve
number: 8
code: ACD-08
parent: tropelandia.dungeon.restricted-section
dungeon: tropelandia.dungeon.restricted-section
universe: tropelandia
light: warm
size: 30 x 25 ft
exits:
- dir: e
  to: tropelandia.room.restricted-section.06-the-catwalk
  kind: door
  state: open
  note: ''
read_aloud: 'A cosy study with leather armchairs, a crystal decanter and a wall of the Dean''s favourite secrets. A man in a moth-eaten robe snores in an armchair, a book across his chest: ''How to Avoid Doing Anything.'''
features:
- The Dean (asleep)
- A decanter
- A wall of secrets
encounters:
- name: The Dean
  monsters:
  - name: Archmage-in-retirement (mage)
    count: 1
    hp: 40
    ac: 12
    attack: firebolt +6, 2d10
  tactics: He wakes if the decanter is touched. He's grumpy but fair.
  treasure: ''
traps: []
puzzles: []
secrets: []
loot:
- A potion of invisibility (the Dean's emergency exit)
- A leather-bound journal of the Academy's secrets
dm_notes: ''
---
# ACD-08 The Dean's Private Reserve

> A cosy study with leather armchairs, a crystal decanter and a wall of the Dean's favourite secrets. A man in a moth-eaten robe snores in an armchair, a book across his chest: 'How to Avoid Doing Anything.'

## Exits
- **east** (door, open): [[ACD-06 The Catwalk|the catwalk]]

## Features
- The Dean (asleep)
- A decanter
- A wall of secrets

## Encounters
- **The Dean**: 1x Archmage-in-retirement (mage) (HP 40, AC 12). He wakes if the decanter is touched. He's grumpy but fair.

## Loot
- A potion of invisibility (the Dean's emergency exit)
- A leather-bound journal of the Academy's secrets
