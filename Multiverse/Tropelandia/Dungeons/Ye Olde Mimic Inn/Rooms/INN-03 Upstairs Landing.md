---
id: tropelandia.room.mimic-inn.03-upstairs-landing
kind: room
name: Upstairs Landing
number: 3
code: INN-03
parent: tropelandia.dungeon.mimic-inn
dungeon: tropelandia.dungeon.mimic-inn
universe: tropelandia
light: dim
size: 40 x 10 ft
exits:
- dir: s
  to: tropelandia.room.mimic-inn.06-the-linen-closet
  kind: door
  state: open
  note: ''
- dir: e
  to: tropelandia.room.mimic-inn.04-the-honeymoon-suite
  kind: door
  state: open
  note: ''
- dir: w
  to: tropelandia.room.mimic-inn.05-room-seven
  kind: door
  state: open
  note: ''
- dir: d
  to: tropelandia.room.mimic-inn.01-the-common-room
  kind: stairs
  state: open
  note: ''
read_aloud: A long, dim landing lined with doors, each numbered in brass. The carpet squelches. A chandelier made of what might be teeth sways gently. At the end, Room 7 stands slightly open, a warm light spilling out.
features:
- A carpet that squelches
- A chandelier of teeth
- Numbered doors
encounters: []
traps:
- name: Hungry carpet
  trigger: Walking carelessly
  effect: 'The carpet grabs: DC 13 Str to pull free, 1d6 acid'
  detect_dc: 13
  disarm_dc: 0
puzzles: []
secrets: []
loot: []
dm_notes: ''
---
# INN-03 Upstairs Landing

> A long, dim landing lined with doors, each numbered in brass. The carpet squelches. A chandelier made of what might be teeth sways gently. At the end, Room 7 stands slightly open, a warm light spilling out.

## Exits
- **south** (door, open): [[INN-06 The Linen Closet|the linen closet]]
- **east** (door, open): [[INN-04 The Honeymoon Suite|the honeymoon suite]]
- **west** (door, open): [[INN-05 Room Seven|room seven]]
- **down** (stairs, open): [[INN-01 The Common Room|the common room]]

## Features
- A carpet that squelches
- A chandelier of teeth
- Numbered doors

## Traps
- **Hungry carpet**: Walking carelessly → The carpet grabs: DC 13 Str to pull free, 1d6 acid (detect DC 13, disarm DC 0)
