---
id: tropelandia.room.mimic-inn.08-the-stomach
kind: room
name: The Stomach
number: 8
code: INN-08
parent: tropelandia.dungeon.mimic-inn
dungeon: tropelandia.dungeon.mimic-inn
universe: tropelandia
light: bioluminescent
size: 60 x 50 ft
exits:
- dir: w
  to: tropelandia.room.mimic-inn.07-the-wine-cellar
  kind: archway
  state: open
  note: A fleshy tunnel
read_aloud: 'A vast, glistening chamber in the heart of the inn: walls of ribbed pink flesh, a pool of acid at its centre, and the half-digested remains of a hundred guests'' possessions. At the far end, the Innkeeper''s true form looms, an enormous mimic with a thousand tiny doors for mouths.'
features:
- Ribbed walls
- A pool of acid
- A mound of digested possessions
encounters:
- name: The Inn Itself
  monsters:
  - name: Giant mimic (the Inn)
    count: 1
    hp: 180
    ac: 12
    attack: pseudopod +9, 2d10+5 plus adhesion; acid 3d8
    ref: tropelandia.monster.giant-mimic
  tactics: 'It fights hard but fears fire; it tries to swallow the party. It can be bargained with: it wants a steady supply of food (like deliveries).'
  treasure: ''
traps: []
puzzles: []
secrets: []
loot:
- A heap of guests' possessions (1,000 gp in goods)
- tropelandia.item.the-innkeepers-heart
dm_notes: 'Option: a Persuasion check (DC 16) to broker a lasting arrangement with the inn: a regular meal delivery in exchange for safe lodging.'
---
# INN-08 The Stomach

> A vast, glistening chamber in the heart of the inn: walls of ribbed pink flesh, a pool of acid at its centre, and the half-digested remains of a hundred guests' possessions. At the far end, the Innkeeper's true form looms, an enormous mimic with a thousand tiny doors for mouths.

## Exits
- **west** (archway, open): [[INN-07 The Wine Cellar|the wine cellar]] — A fleshy tunnel

## Features
- Ribbed walls
- A pool of acid
- A mound of digested possessions

## Encounters
- **The Inn Itself**: 1x Giant mimic (the Inn) (HP 180, AC 12). It fights hard but fears fire; it tries to swallow the party. It can be bargained with: it wants a steady supply of food (like deliveries).

## Loot
- A heap of guests' possessions (1,000 gp in goods)
- The Innkeeper's Heart (a mimic core, alchemical value 500 gp)

## DM notes
Option: a Persuasion check (DC 16) to broker a lasting arrangement with the inn: a regular meal delivery in exchange for safe lodging.
