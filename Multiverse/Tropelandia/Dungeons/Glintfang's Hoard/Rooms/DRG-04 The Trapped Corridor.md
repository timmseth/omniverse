---
id: tropelandia.room.glintfang-hoard.04-the-trapped-corridor
kind: room
name: The Trapped Corridor
number: 4
code: DRG-04
parent: tropelandia.dungeon.glintfang-hoard
dungeon: tropelandia.dungeon.glintfang-hoard
universe: tropelandia
light: dim
size: 10 x 60 ft
exits:
- dir: e
  to: tropelandia.room.glintfang-hoard.02-sandstone-gallery
  kind: door
  state: open
  note: ''
read_aloud: A narrow side corridor of polished sandstone, lined with alcoves of perfectly sized gold statues. A faint draught smells of oil. The floor is a mosaic of dull and bright tiles.
features:
- Gold statues
- A mosaic floor
- A glint of wire
encounters: []
traps:
- name: Statue crossfire
  trigger: Stepping on a bright tile
  effect: 'Statues fire darts: 3 x 2d6 piercing, DC 15 Dex halves'
  detect_dc: 16
  disarm_dc: 15
- name: Oil flood
  trigger: Stepping on a dull tile
  effect: 'Oil floods the corridor then ignites: 4d6 fire'
  detect_dc: 15
  disarm_dc: 14
puzzles: []
secrets:
- description: A secret door at the end opens into a small store of gold
  dc: 17
loot:
- Gold dust (worth 80 gp)
dm_notes: ''
---
# DRG-04 The Trapped Corridor

> A narrow side corridor of polished sandstone, lined with alcoves of perfectly sized gold statues. A faint draught smells of oil. The floor is a mosaic of dull and bright tiles.

## Exits
- **east** (door, open): [[DRG-02 Sandstone Gallery|sandstone gallery]]

## Features
- Gold statues
- A mosaic floor
- A glint of wire

## Traps
- **Statue crossfire**: Stepping on a bright tile → Statues fire darts: 3 x 2d6 piercing, DC 15 Dex halves (detect DC 16, disarm DC 15)
- **Oil flood**: Stepping on a dull tile → Oil floods the corridor then ignites: 4d6 fire (detect DC 15, disarm DC 14)

## Secrets
- A secret door at the end opens into a small store of gold (DC 17)

## Loot
- Gold dust (worth 80 gp)
