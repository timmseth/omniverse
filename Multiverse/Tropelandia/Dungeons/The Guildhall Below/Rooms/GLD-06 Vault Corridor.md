---
id: tropelandia.room.guildhall-below.06-vault-corridor
kind: room
name: Vault Corridor
number: 6
code: GLD-06
parent: tropelandia.dungeon.guildhall-below
dungeon: tropelandia.dungeon.guildhall-below
universe: tropelandia
light: bright
size: 50 x 15 ft
exits:
- dir: n
  to: tropelandia.room.guildhall-below.03-the-hall-of-moots
  kind: archway
  state: open
  note: ''
- dir: s
  to: tropelandia.room.guildhall-below.09-the-guild-vault
  kind: door
  state: locked
  note: Vault door (see Guild Vault)
- dir: e
  to: tropelandia.room.guildhall-below.07-the-guildmasters-parlour
  kind: door
  state: open
  note: ''
- dir: w
  to: tropelandia.room.guildhall-below.08-the-counterfeit-press
  kind: door
  state: open
  note: ''
read_aloud: 'A broad corridor leads away from the moot hall, its walls inlaid with copper threads and its floor a chessboard of black and white tiles. At the end, a great vault door glints. A sign reads: GUILD PROPERTY. PLEASE DO NOT STEAL.'
features:
- Copper-threaded walls
- A chessboard floor
- A vault door
encounters: []
traps:
- name: Chessboard floor
  trigger: Stepping on the wrong colour
  effect: 'Walls shoot darts: 2d6 piercing, DC 14 Dex halves'
  detect_dc: 15
  disarm_dc: 14
puzzles: []
secrets: []
loot: []
dm_notes: 'Safe path: follow the knight''s move pattern (clue in the Moot mural).'
---
# GLD-06 Vault Corridor

> A broad corridor leads away from the moot hall, its walls inlaid with copper threads and its floor a chessboard of black and white tiles. At the end, a great vault door glints. A sign reads: GUILD PROPERTY. PLEASE DO NOT STEAL.

## Exits
- **north** (archway, open): [[GLD-03 The Hall of Moots|the hall of moots]]
- **south** (door, locked): [[GLD-09 The Guild Vault|the guild vault]] — Vault door (see Guild Vault)
- **east** (door, open): [[GLD-07 The Guildmaster's Parlour|the guildmasters parlour]]
- **west** (door, open): [[GLD-08 The Counterfeit Press|the counterfeit press]]

## Features
- Copper-threaded walls
- A chessboard floor
- A vault door

## Traps
- **Chessboard floor**: Stepping on the wrong colour → Walls shoot darts: 2d6 piercing, DC 14 Dex halves (detect DC 15, disarm DC 14)

## DM notes
Safe path: follow the knight's move pattern (clue in the Moot mural).
