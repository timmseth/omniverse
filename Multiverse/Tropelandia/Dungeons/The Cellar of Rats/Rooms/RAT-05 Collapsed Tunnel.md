---
id: tropelandia.room.cellar-of-rats.05-collapsed-tunnel
kind: room
name: Collapsed Tunnel
number: 5
code: RAT-05
parent: tropelandia.dungeon.cellar-of-rats
dungeon: tropelandia.dungeon.cellar-of-rats
universe: tropelandia
light: dim
size: 10 x 40 ft, 3 ft high
exits:
- dir: n
  to: tropelandia.room.cellar-of-rats.04-wine-racks
  kind: passage
  state: rubble
  note: Choked with fallen stone; crawl only
- dir: e
  to: tropelandia.room.cellar-of-rats.06-the-warren
  kind: passage
  state: rubble
  note: Crawl, no armour above light
read_aloud: 'A section of old brick tunnel, half-buried by a cave-in, runs east. The only way through is a low crawl over broken masonry. You can hear small voices ahead, arguing in a language that is mostly squeaks and one very clear word: ''rent''.'
features:
- Loose masonry
- A rat-sized bridge over a puddle
- 'Scratched graffiti: RATS LIVES MATTER'
encounters: []
traps:
- name: Rubble slide
  trigger: Moving through without care
  effect: 'Rubble slides: DC 11 Dex save or 1d6 bludgeoning and stuck for 1d4 rounds'
  detect_dc: 12
  disarm_dc: 10
puzzles: []
secrets: []
loot: []
dm_notes: Small characters crawl through; Medium characters take a round to squeeze.
---
# RAT-05 Collapsed Tunnel

> A section of old brick tunnel, half-buried by a cave-in, runs east. The only way through is a low crawl over broken masonry. You can hear small voices ahead, arguing in a language that is mostly squeaks and one very clear word: 'rent'.

## Exits
- **north** (passage, rubble): [[RAT-04 Wine Racks|wine racks]] — Choked with fallen stone; crawl only
- **east** (passage, rubble): [[RAT-06 The Warren|the warren]] — Crawl, no armour above light

## Features
- Loose masonry
- A rat-sized bridge over a puddle
- Scratched graffiti: RATS LIVES MATTER

## Traps
- **Rubble slide**: Moving through without care → Rubble slides: DC 11 Dex save or 1d6 bludgeoning and stuck for 1d4 rounds (detect DC 12, disarm DC 10)

## DM notes
Small characters crawl through; Medium characters take a round to squeeze.
