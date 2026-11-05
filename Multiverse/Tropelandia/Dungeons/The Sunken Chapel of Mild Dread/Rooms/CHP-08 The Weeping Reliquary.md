---
id: tropelandia.room.sunken-chapel.08-the-weeping-reliquary
kind: room
name: The Weeping Reliquary
number: 8
code: CHP-08
parent: tropelandia.dungeon.sunken-chapel
dungeon: tropelandia.dungeon.sunken-chapel
universe: tropelandia
light: dark
size: 20 x 20 ft
exits:
- dir: e
  to: tropelandia.room.sunken-chapel.06-the-crypt
  kind: archway
  state: open
  note: ''
read_aloud: A small chamber sealed by an iron gate. Inside, a stone sarcophagus weeps a continuous stream of cold water. Above it hangs a faded fresco of a saint holding a bell, gazing sadly at a very large puddle.
features:
- The weeping sarcophagus
- A fresco of the saint
- An iron gate (DC 15 or the Bone Key)
encounters:
- name: The Weeping Saint
  monsters:
  - name: Specter
    count: 1
    hp: 22
    ac: 12
    attack: life drain +4, 3d6
  tactics: The specter attacks anyone who disturbs the sarcophagus.
  treasure: ''
traps: []
puzzles: []
secrets:
- description: 'A hidden compartment in the fresco holds the Chapel''s true relic: a small silver bell'
  dc: 15
loot:
- The Saint's Silver Bell (works as a ring of protection when rung, once per day)
dm_notes: ''
---
# CHP-08 The Weeping Reliquary

> A small chamber sealed by an iron gate. Inside, a stone sarcophagus weeps a continuous stream of cold water. Above it hangs a faded fresco of a saint holding a bell, gazing sadly at a very large puddle.

## Exits
- **east** (archway, open): [[CHP-06 The Crypt|the crypt]]

## Features
- The weeping sarcophagus
- A fresco of the saint
- An iron gate (DC 15 or the Bone Key)

## Encounters
- **The Weeping Saint**: 1x Specter (HP 22, AC 12). The specter attacks anyone who disturbs the sarcophagus.

## Secrets
- A hidden compartment in the fresco holds the Chapel's true relic: a small silver bell (DC 15)

## Loot
- The Saint's Silver Bell (works as a ring of protection when rung, once per day)
