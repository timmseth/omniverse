---
id: tropelandia.room.guildhall-below.04-the-fences-counter
kind: room
name: The Fence's Counter
number: 4
code: GLD-04
parent: tropelandia.dungeon.guildhall-below
dungeon: tropelandia.dungeon.guildhall-below
universe: tropelandia
light: lantern
size: 25 x 20 ft
exits:
- dir: s
  to: tropelandia.room.guildhall-below.07-the-guildmasters-parlour
  kind: door
  state: open
  note: ''
- dir: w
  to: tropelandia.room.guildhall-below.03-the-hall-of-moots
  kind: door
  state: open
  note: ''
read_aloud: A shabby counter with a wire cage and a small lantern. Behind it sits a wiry fence with an eyepiece, surrounded by shelves of other people's property. 'Everything's a bargain,' she says, 'if you don't ask where it's from.'
features:
- A wire cage counter
- Shelves of stolen goods
- A ledger of provenance
encounters:
- name: The Fence
  monsters:
  - name: Spy
    count: 1
    hp: 27
    ac: 12
    attack: dagger +4, 1d4+2
  tactics: She sells and buys. She fights only if the party tries to rob her counter.
  treasure: ''
traps: []
puzzles: []
secrets: []
loot:
- Stolen goods (sell for 100 gp)
- A forged guild membership card
dm_notes: ''
---
# GLD-04 The Fence's Counter

> A shabby counter with a wire cage and a small lantern. Behind it sits a wiry fence with an eyepiece, surrounded by shelves of other people's property. 'Everything's a bargain,' she says, 'if you don't ask where it's from.'

## Exits
- **south** (door, open): [[GLD-07 The Guildmaster's Parlour|the guildmasters parlour]]
- **west** (door, open): [[GLD-03 The Hall of Moots|the hall of moots]]

## Features
- A wire cage counter
- Shelves of stolen goods
- A ledger of provenance

## Encounters
- **The Fence**: 1x Spy (HP 27, AC 12). She sells and buys. She fights only if the party tries to rob her counter.

## Loot
- Stolen goods (sell for 100 gp)
- A forged guild membership card
