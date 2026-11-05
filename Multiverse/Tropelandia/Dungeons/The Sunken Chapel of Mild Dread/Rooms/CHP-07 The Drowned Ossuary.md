---
id: tropelandia.room.sunken-chapel.07-the-drowned-ossuary
kind: room
name: The Drowned Ossuary
number: 7
code: CHP-07
parent: tropelandia.dungeon.sunken-chapel
dungeon: tropelandia.dungeon.sunken-chapel
universe: tropelandia
light: dark
size: 30 ft diameter, 2 ft of water
exits:
- dir: w
  to: tropelandia.room.sunken-chapel.06-the-crypt
  kind: archway
  state: open
  note: ''
read_aloud: A circular chamber stacked to the ceiling with bones in neat, almost artistic arrangements. Water laps at the floor. In the centre stands a pillar made entirely of skulls, whose empty sockets seem to turn to follow you.
features:
- Bone patterns
- The skull pillar
- A shallow pool at the centre
encounters:
- name: Bone swarm
  monsters:
  - name: Swarm of bones (skeletons)
    count: 1
    hp: 30
    ac: 11
    attack: rattle +4, 2d6
  tactics: Triggers if the pillar is smashed rather than solved.
  treasure: ''
traps: []
puzzles:
- name: The Skull Pillar
  description: Eight skulls on the pillar can be rotated. One of them is slightly different.
  solution: Rotate the skulls to face the door in order of the saints' calendar (Religion DC 13) to open a hidden niche.
  hints:
  - The skulls have tiny carved numbers.
  - The saints' calendar is in the priest's vestry.
  - Rotating the odd one out reveals a catch.
  reward: A hidden niche holding the Bone Key and 100 gp.
secrets: []
loot:
- The Bone Key (opens the reliquary vault)
- 100 gp in ancient coins
dm_notes: ''
---
# CHP-07 The Drowned Ossuary

> A circular chamber stacked to the ceiling with bones in neat, almost artistic arrangements. Water laps at the floor. In the centre stands a pillar made entirely of skulls, whose empty sockets seem to turn to follow you.

## Exits
- **west** (archway, open): [[CHP-06 The Crypt|the crypt]]

## Features
- Bone patterns
- The skull pillar
- A shallow pool at the centre

## Encounters
- **Bone swarm**: 1x Swarm of bones (skeletons) (HP 30, AC 11). Triggers if the pillar is smashed rather than solved.

## Puzzles
- **The Skull Pillar**: Eight skulls on the pillar can be rotated. One of them is slightly different.

## Loot
- The Bone Key (opens the reliquary vault)
- 100 gp in ancient coins
