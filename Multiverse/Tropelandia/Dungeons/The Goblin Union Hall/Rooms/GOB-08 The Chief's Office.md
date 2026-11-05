---
id: tropelandia.room.goblin-union-hall.08-the-chiefs-office
kind: room
name: The Chief's Office
number: 8
code: GOB-08
parent: tropelandia.dungeon.goblin-union-hall
dungeon: tropelandia.dungeon.goblin-union-hall
universe: tropelandia
light: warm lamplight
size: 25 x 20 ft
exits:
- dir: n
  to: tropelandia.room.goblin-union-hall.05-the-main-floor
  kind: door
  state: open
  note: ''
read_aloud: A small, tidy office. Behind a vast desk sits a figure in a bowler hat and a too-large coat, seemingly three goblins stacked on each other's shoulders. 'Welcome to Local 7,' says the top one. 'Please excuse the coat. We are in a transitional period.'
features:
- A huge desk
- A long coat with suspicious bulges
- A framed charter of the union
encounters:
- name: The Chief (three goblins in a coat)
  monsters:
  - name: Goblin
    count: 3
    hp: 7
    ac: 15
    attack: scimitar +4, 1d6+2
    ref: tropelandia.monster.goblin
  tactics: They'd rather negotiate. If attacked, the coat falls apart and the goblins scatter.
  treasure: ''
traps: []
puzzles:
- name: The Deal
  description: 'The strike can be settled with a deal: a window, a better wage and an end to doomed raids.'
  solution: A negotiation (Persuasion DC 13) using the demands collected during the dungeon.
  hints:
  - Collect the demands.
  - Everyone wants something different.
  - The coat's other occupant has a secret.
  reward: The strike ends, the party gets the union's gratitude and a stipend of mushrooms.
secrets: []
loot:
- A bowler hat (the Chief's)
- tropelandia.item.union-membership-card
dm_notes: 'Goblins as Fodder subverted: they are people with grievances, and the best ending is a deal.'
---
# GOB-08 The Chief's Office

> A small, tidy office. Behind a vast desk sits a figure in a bowler hat and a too-large coat, seemingly three goblins stacked on each other's shoulders. 'Welcome to Local 7,' says the top one. 'Please excuse the coat. We are in a transitional period.'

## Exits
- **north** (door, open): [[GOB-05 The Main Floor|the main floor]]

## Features
- A huge desk
- A long coat with suspicious bulges
- A framed charter of the union

## Encounters
- **The Chief (three goblins in a coat)**: 3x Goblin (HP 7, AC 15). They'd rather negotiate. If attacked, the coat falls apart and the goblins scatter.

## Puzzles
- **The Deal**: The strike can be settled with a deal: a window, a better wage and an end to doomed raids.

## Loot
- A bowler hat (the Chief's)
- Union membership card (grants favours from goblins)

## DM notes
Goblins as Fodder subverted: they are people with grievances, and the best ending is a deal.
