---
id: tropelandia.room.guildhall-below.08-the-counterfeit-press
kind: room
name: The Counterfeit Press
number: 8
code: GLD-08
parent: tropelandia.dungeon.guildhall-below
dungeon: tropelandia.dungeon.guildhall-below
universe: tropelandia
light: bright lamps
size: 35 x 25 ft
exits:
- dir: n
  to: tropelandia.room.guildhall-below.05-the-trap-gym
  kind: door
  state: open
  note: ''
- dir: e
  to: tropelandia.room.guildhall-below.06-vault-corridor
  kind: door
  state: open
  note: ''
read_aloud: A printing room full of presses, plates and stacks of paper. Fresh sheets of currency hang to dry like laundry. A team of forgers works silently, wearing green visors.
features:
- Printing presses
- Drying currency
- Plates of seals and signatures
encounters:
- name: Forgers
  monsters:
  - name: Commoner forger
    count: 4
    hp: 4
    ac: 10
    attack: pen +2, 1d4
  tactics: They flee and call the guards if disturbed.
  treasure: ''
traps: []
puzzles: []
secrets: []
loot:
- Forged documents (useful)
- Counterfeit currency (risky, 200 gp face value)
dm_notes: ''
---
# GLD-08 The Counterfeit Press

> A printing room full of presses, plates and stacks of paper. Fresh sheets of currency hang to dry like laundry. A team of forgers works silently, wearing green visors.

## Exits
- **north** (door, open): [[GLD-05 The Trap Gym|the trap gym]]
- **east** (door, open): [[GLD-06 Vault Corridor|vault corridor]]

## Features
- Printing presses
- Drying currency
- Plates of seals and signatures

## Encounters
- **Forgers**: 4x Commoner forger (HP 4, AC 10). They flee and call the guards if disturbed.

## Loot
- Forged documents (useful)
- Counterfeit currency (risky, 200 gp face value)
