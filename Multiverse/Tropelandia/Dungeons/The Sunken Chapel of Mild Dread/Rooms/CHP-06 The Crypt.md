---
id: tropelandia.room.sunken-chapel.06-the-crypt
kind: room
name: The Crypt
number: 6
code: CHP-06
parent: tropelandia.dungeon.sunken-chapel
dungeon: tropelandia.dungeon.sunken-chapel
universe: tropelandia
light: dark
size: 35 x 25 ft, 1 ft of water
exits:
- dir: e
  to: tropelandia.room.sunken-chapel.07-the-drowned-ossuary
  kind: archway
  state: open
  note: ''
- dir: w
  to: tropelandia.room.sunken-chapel.08-the-weeping-reliquary
  kind: archway
  state: open
  note: ''
- dir: u
  to: tropelandia.room.sunken-chapel.05-the-altar
  kind: stairs
  state: open
  note: ''
read_aloud: A vaulted crypt lined with stone niches, each holding a skeleton in rotted finery. The water is knee-deep and ice-cold; the air tastes of tombs. A rusted chain of keys hangs from a skeleton's belt near the north wall.
features:
- Stone niches
- A skeleton with keys
- Cold, still water
encounters:
- name: Crypt guardians
  monsters:
  - name: Zombie
    count: 3
    hp: 22
    ac: 8
    attack: slam +3, 1d6+1
    ref: tropelandia.monster.zombie
  - name: Ghoul
    count: 1
    hp: 22
    ac: 12
    attack: claws +4, 2d4+2 (paralysis)
    ref: tropelandia.monster.ghoul
  tactics: The ghoul lurks until the party is distracted by the zombies, then strikes.
  treasure: ''
traps: []
puzzles: []
secrets: []
loot:
- A ring of keys (opens the vestry cabinet and the reliquary vault)
dm_notes: ''
---
# CHP-06 The Crypt

> A vaulted crypt lined with stone niches, each holding a skeleton in rotted finery. The water is knee-deep and ice-cold; the air tastes of tombs. A rusted chain of keys hangs from a skeleton's belt near the north wall.

## Exits
- **east** (archway, open): [[CHP-07 The Drowned Ossuary|the drowned ossuary]]
- **west** (archway, open): [[CHP-08 The Weeping Reliquary|the weeping reliquary]]
- **up** (stairs, open): [[CHP-05 The Altar|the altar]]

## Features
- Stone niches
- A skeleton with keys
- Cold, still water

## Encounters
- **Crypt guardians**: 3x Zombie (HP 22, AC 8), 1x Ghoul (HP 22, AC 12). The ghoul lurks until the party is distracted by the zombies, then strikes.

## Loot
- A ring of keys (opens the vestry cabinet and the reliquary vault)
