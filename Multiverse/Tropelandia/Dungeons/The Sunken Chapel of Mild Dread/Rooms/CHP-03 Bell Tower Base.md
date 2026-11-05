---
id: tropelandia.room.sunken-chapel.03-bell-tower-base
kind: room
name: Bell Tower Base
number: 3
code: CHP-03
parent: tropelandia.dungeon.sunken-chapel
dungeon: tropelandia.dungeon.sunken-chapel
universe: tropelandia
light: dim
size: 15 x 15 ft
exits:
- dir: e
  to: tropelandia.room.sunken-chapel.02-the-nave
  kind: door
  state: open
  note: ''
- dir: u
  to: tropelandia.room.sunken-chapel.09-the-belfry
  kind: ladder
  state: open
  note: An iron ladder, rusted but sound
read_aloud: A tight stone chamber at the foot of the bell tower. A rope as thick as your wrist hangs from above, wet and dark. Somewhere high up, a bell sways with a sound like a sad cow.
features:
- The bell rope
- A hole in the floor to the water below
- 'Scratches on the wall: ''DON''T RING IT'''
encounters: []
traps:
- name: The bell rope
  trigger: Pulling the bell rope
  effect: 'The bell sounds: all undead in the chapel awaken and approach; DC 13 Con save or deafened for 1 minute'
  detect_dc: 12
  disarm_dc: 0
puzzles: []
secrets: []
loot: []
dm_notes: ''
---
# CHP-03 Bell Tower Base

> A tight stone chamber at the foot of the bell tower. A rope as thick as your wrist hangs from above, wet and dark. Somewhere high up, a bell sways with a sound like a sad cow.

## Exits
- **east** (door, open): [[CHP-02 The Nave|the nave]]
- **up** (ladder, open): [[CHP-09 The Belfry|the belfry]] — An iron ladder, rusted but sound

## Features
- The bell rope
- A hole in the floor to the water below
- Scratches on the wall: 'DON'T RING IT'

## Traps
- **The bell rope**: Pulling the bell rope → The bell sounds: all undead in the chapel awaken and approach; DC 13 Con save or deafened for 1 minute (detect DC 12, disarm DC 0)
