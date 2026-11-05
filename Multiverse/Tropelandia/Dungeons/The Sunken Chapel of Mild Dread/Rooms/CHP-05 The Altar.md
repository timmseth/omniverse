---
id: tropelandia.room.sunken-chapel.05-the-altar
kind: room
name: The Altar
number: 5
code: CHP-05
parent: tropelandia.dungeon.sunken-chapel
dungeon: tropelandia.dungeon.sunken-chapel
universe: tropelandia
light: pale candles
size: 25 x 20 ft
exits:
- dir: n
  to: tropelandia.room.sunken-chapel.02-the-nave
  kind: archway
  state: open
  note: ''
- dir: d
  to: tropelandia.room.sunken-chapel.06-the-crypt
  kind: stairs
  state: open
  note: A spiral stair behind the altar
read_aloud: The altar stands on a raised platform, draped in a green-black cloth. Candles burn with a pale flame that does not flicker. On the altar rests a bronze reliquary the size of a loaf of bread, covered in tiny sigils. A staircase behind the altar leads down into the crypt.
features:
- The reliquary
- Pale candles
- A shaft of moonlight directly on the altar
encounters: []
traps:
- name: Reliquary ward
  trigger: Lifting the reliquary without the blessing
  effect: 'A pulse of necrotic energy: DC 13 Wis save or 3d6 necrotic and frightened for 1 minute'
  detect_dc: 14
  disarm_dc: 14
puzzles:
- name: The Blessing
  description: The reliquary can be taken safely if the party performs a short blessing. The right words are written on the priest's vestments.
  solution: Recite the blessing from the vestry (Religion DC 12 or ask the priest).
  hints:
  - The vestment has stitching.
  - The priest's sermon is the key.
  - Bless works as a shortcut.
  reward: Take the reliquary safely.
secrets: []
loot:
- The Reliquary of Mild Dread (worth 200 gp; sneezes when touched)
dm_notes: ''
---
# CHP-05 The Altar

> The altar stands on a raised platform, draped in a green-black cloth. Candles burn with a pale flame that does not flicker. On the altar rests a bronze reliquary the size of a loaf of bread, covered in tiny sigils. A staircase behind the altar leads down into the crypt.

## Exits
- **north** (archway, open): [[CHP-02 The Nave|the nave]]
- **down** (stairs, open): [[CHP-06 The Crypt|the crypt]] — A spiral stair behind the altar

## Features
- The reliquary
- Pale candles
- A shaft of moonlight directly on the altar

## Traps
- **Reliquary ward**: Lifting the reliquary without the blessing → A pulse of necrotic energy: DC 13 Wis save or 3d6 necrotic and frightened for 1 minute (detect DC 14, disarm DC 14)

## Puzzles
- **The Blessing**: The reliquary can be taken safely if the party performs a short blessing. The right words are written on the priest's vestments.

## Loot
- The Reliquary of Mild Dread (worth 200 gp; sneezes when touched)
