---
id: tropelandia.room.guildhall-below.09-the-guild-vault
kind: room
name: The Guild Vault
number: 9
code: GLD-09
parent: tropelandia.dungeon.guildhall-below
dungeon: tropelandia.dungeon.guildhall-below
universe: tropelandia
light: dim
size: 40 x 30 ft
exits:
- dir: n
  to: tropelandia.room.guildhall-below.06-vault-corridor
  kind: door
  state: locked
  note: Vault door (see Guild Vault)
read_aloud: 'A hushed vault of shelves and safes, lined with steel. In the centre stands a single pedestal holding a plain wooden box. A brass plaque: THE GUILD''S MOST VALUABLE POSSESSION. A smaller sign: IT''S EMPTY. WE KNOW YOU WERE LOOKING.'
features:
- A pedestal and box
- Rows of safes
- A mocking plaque
encounters: []
traps:
- name: Pedestal alarm
  trigger: Lifting the box
  effect: A siren sounds and the doors lock; DC 15 Dex to slip out before the guards arrive
  detect_dc: 16
  disarm_dc: 15
puzzles:
- name: The Vault Door
  description: 'The vault door has no lock; it''s a riddle on a plaque: ''The more you take, the more you leave behind.'''
  solution: Say 'footsteps' aloud.
  hints:
  - It's a riddle.
  - You're taking something with you.
  - Walking.
  reward: The door opens.
secrets: []
loot:
- 'The real treasure is in the safes: 600 gp and 3 gems'
- 'The box is empty, apart from a note: ''Better luck next time'''
dm_notes: 'Quest Giver Betrays the Party: the Guildmaster wanted the party to try, to test the vault''s defences.'
---
# GLD-09 The Guild Vault

> A hushed vault of shelves and safes, lined with steel. In the centre stands a single pedestal holding a plain wooden box. A brass plaque: THE GUILD'S MOST VALUABLE POSSESSION. A smaller sign: IT'S EMPTY. WE KNOW YOU WERE LOOKING.

## Exits
- **north** (door, locked): [[GLD-06 Vault Corridor|vault corridor]] — Vault door (see Guild Vault)

## Features
- A pedestal and box
- Rows of safes
- A mocking plaque

## Traps
- **Pedestal alarm**: Lifting the box → A siren sounds and the doors lock; DC 15 Dex to slip out before the guards arrive (detect DC 16, disarm DC 15)

## Puzzles
- **The Vault Door**: The vault door has no lock; it's a riddle on a plaque: 'The more you take, the more you leave behind.'

## Loot
- The real treasure is in the safes: 600 gp and 3 gems
- The box is empty, apart from a note: 'Better luck next time'

## DM notes
Quest Giver Betrays the Party: the Guildmaster wanted the party to try, to test the vault's defences.
