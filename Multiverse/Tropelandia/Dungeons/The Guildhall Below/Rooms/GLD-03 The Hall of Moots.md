---
id: tropelandia.room.guildhall-below.03-the-hall-of-moots
kind: room
name: The Hall of Moots
number: 3
code: GLD-03
parent: tropelandia.dungeon.guildhall-below
dungeon: tropelandia.dungeon.guildhall-below
universe: tropelandia
light: lamplight
size: 60 x 50 ft
exits:
- dir: n
  to: tropelandia.room.guildhall-below.02-the-smelly-cellar
  kind: door
  state: open
  note: ''
- dir: s
  to: tropelandia.room.guildhall-below.06-vault-corridor
  kind: archway
  state: open
  note: ''
- dir: e
  to: tropelandia.room.guildhall-below.04-the-fences-counter
  kind: door
  state: open
  note: ''
- dir: w
  to: tropelandia.room.guildhall-below.05-the-trap-gym
  kind: door
  state: open
  note: ''
read_aloud: 'A great vaulted chamber that was once a smuggler''s cavern, now a guild meeting hall. Benches, a raised dais, and a mural of the guild''s history: a long row of thieves taking things from other thieves. A bell hangs over the dais for calling members to order.'
features:
- A dais and bell
- A mural
- A noticeboard of jobs
encounters:
- name: Guild members at leisure
  monsters:
  - name: Bandit
    count: 6
    hp: 11
    ac: 12
    attack: scimitar +3, 1d6+1
    ref: tropelandia.monster.bandit
  - name: Spy
    count: 2
    hp: 27
    ac: 12
    attack: shortsword +4, 1d6+2
    ref: tropelandia.monster.spy
  tactics: They are not hostile unless the party is caught stealing.
  treasure: ''
traps: []
puzzles:
- name: The Moot
  description: The guild may hold a moot to decide whether the party is trusted. A party member must give a short speech.
  solution: Persuasion/Deception DC 14; bring a reference from Rosa.
  hints:
  - The guild loves a good heist story.
  - Name-drop someone useful.
  - Brag politely.
  reward: Guild membership and access to the vault corridor.
secrets: []
loot: []
dm_notes: ''
---
# GLD-03 The Hall of Moots

> A great vaulted chamber that was once a smuggler's cavern, now a guild meeting hall. Benches, a raised dais, and a mural of the guild's history: a long row of thieves taking things from other thieves. A bell hangs over the dais for calling members to order.

## Exits
- **north** (door, open): [[GLD-02 The Smelly Cellar|the smelly cellar]]
- **south** (archway, open): [[GLD-06 Vault Corridor|vault corridor]]
- **east** (door, open): [[GLD-04 The Fence's Counter|the fences counter]]
- **west** (door, open): [[GLD-05 The Trap Gym|the trap gym]]

## Features
- A dais and bell
- A mural
- A noticeboard of jobs

## Encounters
- **Guild members at leisure**: 6x Bandit (HP 11, AC 12), 2x Spy (HP 27, AC 12). They are not hostile unless the party is caught stealing.

## Puzzles
- **The Moot**: The guild may hold a moot to decide whether the party is trusted. A party member must give a short speech.
