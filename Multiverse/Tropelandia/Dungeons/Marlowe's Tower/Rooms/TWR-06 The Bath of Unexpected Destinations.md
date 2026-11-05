---
id: tropelandia.room.marlowes-tower.06-the-bath-of-unexpected-destinations
kind: room
name: The Bath of Unexpected Destinations
number: 6
code: TWR-06
parent: tropelandia.dungeon.marlowes-tower
dungeon: tropelandia.dungeon.marlowes-tower
universe: tropelandia
light: steam
size: 15 x 15 ft
exits:
- dir: w
  to: tropelandia.room.marlowes-tower.05-apprentices-quarters
  kind: door
  state: open
  note: ''
read_aloud: 'A steamy bathroom with a large copper tub and a curtain. Each tap labelled HOT, COLD and MISC. The water in the tub swirls slowly and shows the reflection of somewhere that is not this room: a beach, a market, an unfamiliar mountain.'
features:
- The portal tub
- Three taps
- Rubber duck (enchanted)
encounters: []
traps:
- name: Scalding steam
  trigger: Opening the HOT tap fully
  effect: 2d6 fire in the room, DC 13 Con save halves
  detect_dc: 12
  disarm_dc: 0
puzzles:
- name: The Taps
  description: Turning the MISC tap sends whoever steps into the tub to a random location on Tropos. HOT sends them to a hot place, COLD to a cold place.
  solution: Set HOT and COLD in sequence to open a stable portal to the Barrowdale town square.
  hints:
  - The taps change the destination.
  - Mixing two properties gives a middle place.
  - 'The duck squeaks a hint: ''town''.'
  reward: A safe return to town, or an excuse for a side adventure.
secrets: []
loot: []
dm_notes: A fun exit for a party that has had enough; also a way to bring in side quests.
---
# TWR-06 The Bath of Unexpected Destinations

> A steamy bathroom with a large copper tub and a curtain. Each tap labelled HOT, COLD and MISC. The water in the tub swirls slowly and shows the reflection of somewhere that is not this room: a beach, a market, an unfamiliar mountain.

## Exits
- **west** (door, open): [[TWR-05 Apprentice's Quarters|apprentices quarters]]

## Features
- The portal tub
- Three taps
- Rubber duck (enchanted)

## Traps
- **Scalding steam**: Opening the HOT tap fully → 2d6 fire in the room, DC 13 Con save halves (detect DC 12, disarm DC 0)

## Puzzles
- **The Taps**: Turning the MISC tap sends whoever steps into the tub to a random location on Tropos. HOT sends them to a hot place, COLD to a cold place.

## DM notes
A fun exit for a party that has had enough; also a way to bring in side quests.
