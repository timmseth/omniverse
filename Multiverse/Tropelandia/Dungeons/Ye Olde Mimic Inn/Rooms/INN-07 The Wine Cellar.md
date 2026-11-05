---
id: tropelandia.room.mimic-inn.07-the-wine-cellar
kind: room
name: The Wine Cellar
number: 7
code: INN-07
parent: tropelandia.dungeon.mimic-inn
dungeon: tropelandia.dungeon.mimic-inn
universe: tropelandia
light: dim
size: 40 x 40 ft
exits:
- dir: e
  to: tropelandia.room.mimic-inn.08-the-stomach
  kind: archway
  state: open
  note: A fleshy tunnel
- dir: u
  to: tropelandia.room.mimic-inn.01-the-common-room
  kind: hatch
  state: open
  note: ''
read_aloud: A vast cellar of racked bottles, each labelled with the name of a missing guest. Below the floor, something pulses slowly, like a heartbeat. The air is thick and warm.
features:
- Racks of bottles
- A pulsing floor
- A guest register
encounters: []
traps:
- name: Digestive fumes
  trigger: Staying more than 5 minutes
  effect: DC 13 Con save or poisoned
  detect_dc: 14
  disarm_dc: 0
puzzles: []
secrets: []
loot:
- The best wine in Whisperwood (150 gp)
dm_notes: ''
---
# INN-07 The Wine Cellar

> A vast cellar of racked bottles, each labelled with the name of a missing guest. Below the floor, something pulses slowly, like a heartbeat. The air is thick and warm.

## Exits
- **east** (archway, open): [[INN-08 The Stomach|the stomach]] — A fleshy tunnel
- **up** (hatch, open): [[INN-01 The Common Room|the common room]]

## Features
- Racks of bottles
- A pulsing floor
- A guest register

## Traps
- **Digestive fumes**: Staying more than 5 minutes → DC 13 Con save or poisoned (detect DC 14, disarm DC 0)

## Loot
- The best wine in Whisperwood (150 gp)
