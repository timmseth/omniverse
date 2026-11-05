---
id: tropelandia.room.guildhall-below.07-the-guildmasters-parlour
kind: room
name: The Guildmaster's Parlour
number: 7
code: GLD-07
parent: tropelandia.dungeon.guildhall-below
dungeon: tropelandia.dungeon.guildhall-below
universe: tropelandia
light: firelit
size: 30 x 25 ft
exits:
- dir: n
  to: tropelandia.room.guildhall-below.04-the-fences-counter
  kind: door
  state: open
  note: ''
- dir: w
  to: tropelandia.room.guildhall-below.06-vault-corridor
  kind: door
  state: open
  note: ''
read_aloud: A cosy, elegant room with deep armchairs, a roaring fire and shelves of leather-bound ledgers. A graceful old woman in a velvet gown pours tea. 'Do sit down,' says the Guildmaster. 'I've been expecting you. I always expect everyone.'
features:
- Armchairs and tea
- Ledgers
- A map of the entire city's valuables
encounters:
- name: The Guildmaster
  monsters:
  - name: Assassin (retired)
    count: 1
    hp: 78
    ac: 15
    attack: poisoned dagger +6, 3d6+3
  tactics: She prefers conversation; she offers the party a job, and a trap.
  treasure: ''
traps: []
puzzles:
- name: The Offer
  description: 'The Guildmaster proposes a job: steal something from a rival. It''s a test and a trap.'
  solution: Accept and plan carefully; or ask good questions (Insight DC 15) to learn it's a trap.
  hints:
  - She offers too much money.
  - The target is her own vault.
  - The guild loves loyalty.
  reward: Guild favour and a lucrative contract.
secrets: []
loot:
- Tea (a very fine blend, 20 gp)
- A guild ring (opens guild doors)
dm_notes: ''
---
# GLD-07 The Guildmaster's Parlour

> A cosy, elegant room with deep armchairs, a roaring fire and shelves of leather-bound ledgers. A graceful old woman in a velvet gown pours tea. 'Do sit down,' says the Guildmaster. 'I've been expecting you. I always expect everyone.'

## Exits
- **north** (door, open): [[GLD-04 The Fence's Counter|the fences counter]]
- **west** (door, open): [[GLD-06 Vault Corridor|vault corridor]]

## Features
- Armchairs and tea
- Ledgers
- A map of the entire city's valuables

## Encounters
- **The Guildmaster**: 1x Assassin (retired) (HP 78, AC 15). She prefers conversation; she offers the party a job, and a trap.

## Puzzles
- **The Offer**: The Guildmaster proposes a job: steal something from a rival. It's a test and a trap.

## Loot
- Tea (a very fine blend, 20 gp)
- A guild ring (opens guild doors)
