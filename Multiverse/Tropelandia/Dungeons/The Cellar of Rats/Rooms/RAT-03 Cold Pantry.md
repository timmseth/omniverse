---
id: tropelandia.room.cellar-of-rats.03-cold-pantry
kind: room
name: Cold Pantry
number: 3
code: RAT-03
parent: tropelandia.dungeon.cellar-of-rats
dungeon: tropelandia.dungeon.cellar-of-rats
universe: tropelandia
light: dim
size: 15 x 15 ft
exits:
- dir: w
  to: tropelandia.room.cellar-of-rats.02-barrel-hall
  kind: door
  state: stuck
  note: Swollen with damp (DC 12 Str)
read_aloud: A cold room with iron hooks hanging from the ceiling, empty except for a single wheel of cheese on a stand, glistening faintly and smelling strongly of regret. A trail of crumbs leads to the wall behind it.
features:
- The Wheel of Cheese, bait for a trap
- Iron hooks
- A ham, long past eating
encounters: []
traps:
- name: Falling portcullis net
  trigger: Lifting the cheese from its stand
  effect: 'A weighted net drops: DC 12 Dex save or restrained; rats swarm in 1d4 rounds'
  detect_dc: 13
  disarm_dc: 12
puzzles: []
secrets:
- description: 'A loose stone behind the hooks hides the innkeeper''s lost strongbox: 35 gp and an unpaid bill of sale for a dragon'
  dc: 14
loot:
- 35 gp in the strongbox
- A very good ham
dm_notes: 'Cheese is a Cursed Item joke: it''s non-magical, but the rats believe it is.'
---
# RAT-03 Cold Pantry

> A cold room with iron hooks hanging from the ceiling, empty except for a single wheel of cheese on a stand, glistening faintly and smelling strongly of regret. A trail of crumbs leads to the wall behind it.

## Exits
- **west** (door, stuck): [[RAT-02 Barrel Hall|barrel hall]] — Swollen with damp (DC 12 Str)

## Features
- The Wheel of Cheese, bait for a trap
- Iron hooks
- A ham, long past eating

## Traps
- **Falling portcullis net**: Lifting the cheese from its stand → A weighted net drops: DC 12 Dex save or restrained; rats swarm in 1d4 rounds (detect DC 13, disarm DC 12)

## Secrets
- A loose stone behind the hooks hides the innkeeper's lost strongbox: 35 gp and an unpaid bill of sale for a dragon (DC 14)

## Loot
- 35 gp in the strongbox
- A very good ham

## DM notes
Cheese is a Cursed Item joke: it's non-magical, but the rats believe it is.
