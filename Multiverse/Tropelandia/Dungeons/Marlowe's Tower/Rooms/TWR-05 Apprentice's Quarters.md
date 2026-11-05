---
id: tropelandia.room.marlowes-tower.05-apprentices-quarters
kind: room
name: Apprentice's Quarters
number: 5
code: TWR-05
parent: tropelandia.dungeon.marlowes-tower
dungeon: tropelandia.dungeon.marlowes-tower
universe: tropelandia
light: grey daylight
size: 20 x 15 ft
exits:
- dir: e
  to: tropelandia.room.marlowes-tower.06-the-bath-of-unexpected-destinations
  kind: door
  state: open
  note: ''
- dir: u
  to: tropelandia.room.marlowes-tower.07-the-observatory
  kind: stairs
  state: open
  note: ''
- dir: d
  to: tropelandia.room.marlowes-tower.03-the-library
  kind: stairs
  state: open
  note: ''
read_aloud: A cramped bedroom on the third floor with a single bed, a desk and a bucket labelled MINE. A series of increasingly desperate letters is pinned to the walls, each one signed with a different name and each one resigning. A single spare apprentice robe hangs on a hook, two sizes too small.
features:
- The resignation letters
- An unusually well-kept bed
- 'A sign: BE QUIET, MASTER IS SULKING'
encounters:
- name: Overworked apprentice
  monsters:
  - name: Apprentice (acolyte stats)
    count: 1
    hp: 9
    ac: 10
    attack: staff +2, 1d6
  tactics: Not hostile; wants a change. Might join the party if the party offers a better salary.
  treasure: ''
traps: []
puzzles: []
secrets: []
loot:
- A robe of useful items (as Robe of Useful Items, with only rent receipts in the patches)
dm_notes: 'Wizard in a Tower hook: the party can be recruited as the next apprentice.'
---
# TWR-05 Apprentice's Quarters

> A cramped bedroom on the third floor with a single bed, a desk and a bucket labelled MINE. A series of increasingly desperate letters is pinned to the walls, each one signed with a different name and each one resigning. A single spare apprentice robe hangs on a hook, two sizes too small.

## Exits
- **east** (door, open): [[TWR-06 The Bath of Unexpected Destinations|the bath of unexpected destinations]]
- **up** (stairs, open): [[TWR-07 The Observatory|the observatory]]
- **down** (stairs, open): [[TWR-03 The Library|the library]]

## Features
- The resignation letters
- An unusually well-kept bed
- A sign: BE QUIET, MASTER IS SULKING

## Encounters
- **Overworked apprentice**: 1x Apprentice (acolyte stats) (HP 9, AC 10). Not hostile; wants a change. Might join the party if the party offers a better salary.

## Loot
- A robe of useful items (as Robe of Useful Items, with only rent receipts in the patches)

## DM notes
Wizard in a Tower hook: the party can be recruited as the next apprentice.
