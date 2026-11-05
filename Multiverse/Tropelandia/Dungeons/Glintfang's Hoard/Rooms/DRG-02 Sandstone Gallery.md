---
id: tropelandia.room.glintfang-hoard.02-sandstone-gallery
kind: room
name: Sandstone Gallery
number: 2
code: DRG-02
parent: tropelandia.dungeon.glintfang-hoard
dungeon: tropelandia.dungeon.glintfang-hoard
universe: tropelandia
light: lamplight
size: 60 x 25 ft
exits:
- dir: n
  to: tropelandia.room.glintfang-hoard.01-dune-mouth
  kind: archway
  state: open
  note: ''
- dir: s
  to: tropelandia.room.glintfang-hoard.05-gilded-antechamber
  kind: archway
  state: open
  note: ''
- dir: e
  to: tropelandia.room.glintfang-hoard.03-hall-of-appraisals
  kind: door
  state: open
  note: ''
- dir: w
  to: tropelandia.room.glintfang-hoard.04-the-trapped-corridor
  kind: door
  state: open
  note: ''
read_aloud: A long hall of columns, each carved with the profile of a successful visitor who lost a portfolio. A runner of red carpet leads south. The floor tiles seem too clean. Somewhere a quill scratches.
features:
- Columns of former visitors
- A clean carpet
- A quill scratching somewhere
encounters: []
traps:
- name: Pressure tile
  trigger: Stepping off the carpet
  effect: 'Sandstone slabs: 4d6 bludgeoning, DC 14 Dex halves'
  detect_dc: 15
  disarm_dc: 14
puzzles: []
secrets: []
loot: []
dm_notes: The carpet is safe; the tiles aren't.
---
# DRG-02 Sandstone Gallery

> A long hall of columns, each carved with the profile of a successful visitor who lost a portfolio. A runner of red carpet leads south. The floor tiles seem too clean. Somewhere a quill scratches.

## Exits
- **north** (archway, open): [[DRG-01 Dune Mouth|dune mouth]]
- **south** (archway, open): [[DRG-05 Gilded Antechamber|gilded antechamber]]
- **east** (door, open): [[DRG-03 Hall of Appraisals|hall of appraisals]]
- **west** (door, open): [[DRG-04 The Trapped Corridor|the trapped corridor]]

## Features
- Columns of former visitors
- A clean carpet
- A quill scratching somewhere

## Traps
- **Pressure tile**: Stepping off the carpet → Sandstone slabs: 4d6 bludgeoning, DC 14 Dex halves (detect DC 15, disarm DC 14)

## DM notes
The carpet is safe; the tiles aren't.
