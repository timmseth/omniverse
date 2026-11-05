---
id: tropelandia.room.cellar-of-rats.06-the-warren
kind: room
name: The Warren
number: 6
code: RAT-06
parent: tropelandia.dungeon.cellar-of-rats
dungeon: tropelandia.dungeon.cellar-of-rats
universe: tropelandia
light: dim
size: 40 x 30 ft
exits:
- dir: n
  to: tropelandia.room.cellar-of-rats.02-barrel-hall
  kind: passage
  state: open
  note: ''
- dir: s
  to: tropelandia.room.cellar-of-rats.07-the-rat-kings-pantry
  kind: passage
  state: open
  note: ''
- dir: w
  to: tropelandia.room.cellar-of-rats.05-collapsed-tunnel
  kind: passage
  state: rubble
  note: Crawl, no armour above light
read_aloud: A cavernous space under the inn's old foundations, carved by generations of rats into a tangled warren. Nests of shredded paper, cheese rind and bottle caps fill every nook. A hundred glittering eyes follow your every step.
features:
- Nests of paper and cloth
- A pile of bottle caps (currency)
- 'A tiny wooden notice board with a listing: ONE (1) RAT NEEDED, WILL TRAIN'
encounters:
- name: Rat horde
  monsters:
  - name: Giant rat
    count: 8
    hp: 7
    ac: 12
    attack: bite +4, 1d4+2
    ref: tropelandia.monster.giant-rat
  - name: Swarm of rats
    count: 1
    hp: 24
    ac: 10
    attack: bites +2, 2d6 (half when below half HP)
    ref: tropelandia.monster.swarm-of-rats
  tactics: The horde fights to protect the throne; they hold if the party parleys with a bribe (cheese or coin), and will not attack anyone carrying the Cheese Wheel.
  treasure: ''
traps: []
puzzles: []
secrets: []
loot:
- 120 sp scattered through the nests
- A tiny silver crown, too small for a human head
dm_notes: 'Parley is a real option: if the party speaks or acts reasonably, rats will bring them to the Rat King.'
---
# RAT-06 The Warren

> A cavernous space under the inn's old foundations, carved by generations of rats into a tangled warren. Nests of shredded paper, cheese rind and bottle caps fill every nook. A hundred glittering eyes follow your every step.

## Exits
- **north** (passage, open): [[RAT-02 Barrel Hall|barrel hall]]
- **south** (passage, open): [[RAT-07 The Rat King's Pantry|the rat kings pantry]]
- **west** (passage, rubble): [[RAT-05 Collapsed Tunnel|collapsed tunnel]] — Crawl, no armour above light

## Features
- Nests of paper and cloth
- A pile of bottle caps (currency)
- A tiny wooden notice board with a listing: ONE (1) RAT NEEDED, WILL TRAIN

## Encounters
- **Rat horde**: 8x Giant rat (HP 7, AC 12), 1x Swarm of rats (HP 24, AC 10). The horde fights to protect the throne; they hold if the party parleys with a bribe (cheese or coin), and will not attack anyone carrying the Cheese Wheel.

## Loot
- 120 sp scattered through the nests
- A tiny silver crown, too small for a human head

## DM notes
Parley is a real option: if the party speaks or acts reasonably, rats will bring them to the Rat King.
