---
id: tropelandia.room.goblin-union-hall.04-grievance-office
kind: room
name: Grievance Office
number: 4
code: GOB-04
parent: tropelandia.dungeon.goblin-union-hall
dungeon: tropelandia.dungeon.goblin-union-hall
universe: tropelandia
light: lamplight
size: 25 x 20 ft
exits:
- dir: s
  to: tropelandia.room.goblin-union-hall.07-the-strike-fund
  kind: door
  state: locked
  note: Union lock; key held by Grimble
- dir: e
  to: tropelandia.room.goblin-union-hall.02-reception
  kind: door
  state: open
  note: ''
read_aloud: 'A tidy office with filing cabinets and a desk piled with complaints. A hobgoblin in a sash sorts through them, muttering. The nameplate reads: SHOP STEWARD GRIMBLE. A poster behind him reads ''SOLIDARITY (OR ELSE)''.'
features:
- Filing cabinets
- A pile of grievances
- Grimble's sash of office
encounters:
- name: Shop Steward Grimble
  monsters:
  - name: Hobgoblin shop steward
    count: 1
    hp: 11
    ac: 18
    attack: longsword +3, 1d8+1
    ref: tropelandia.monster.hobgoblin-shop-steward
  tactics: Grimble listens if the party addresses him correctly and hands him a petition; he fights if insulted.
  treasure: ''
traps: []
puzzles:
- name: The Petition
  description: Grimble demands three concessions on paper before he'll open the strike fund vault.
  solution: Draft a petition promising a window in the break room, a fair wage, and safer raids (Persuasion DC 12).
  hints:
  - He keeps looking at the break room.
  - He mentions 'doomed raids'.
  - Pay is the third demand.
  reward: Grimble grants the vault key.
secrets: []
loot:
- The strike fund key
dm_notes: ''
---
# GOB-04 Grievance Office

> A tidy office with filing cabinets and a desk piled with complaints. A hobgoblin in a sash sorts through them, muttering. The nameplate reads: SHOP STEWARD GRIMBLE. A poster behind him reads 'SOLIDARITY (OR ELSE)'.

## Exits
- **south** (door, locked): [[GOB-07 The Strike Fund|the strike fund]] — Union lock; key held by Grimble
- **east** (door, open): [[GOB-02 Reception|reception]]

## Features
- Filing cabinets
- A pile of grievances
- Grimble's sash of office

## Encounters
- **Shop Steward Grimble**: 1x Hobgoblin shop steward (HP 11, AC 18). Grimble listens if the party addresses him correctly and hands him a petition; he fights if insulted.

## Puzzles
- **The Petition**: Grimble demands three concessions on paper before he'll open the strike fund vault.

## Loot
- The strike fund key
