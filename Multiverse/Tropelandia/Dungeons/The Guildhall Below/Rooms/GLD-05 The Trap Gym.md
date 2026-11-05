---
id: tropelandia.room.guildhall-below.05-the-trap-gym
kind: room
name: The Trap Gym
number: 5
code: GLD-05
parent: tropelandia.dungeon.guildhall-below
dungeon: tropelandia.dungeon.guildhall-below
universe: tropelandia
light: lanterns
size: 50 x 30 ft
exits:
- dir: s
  to: tropelandia.room.guildhall-below.08-the-counterfeit-press
  kind: door
  state: open
  note: ''
- dir: e
  to: tropelandia.room.guildhall-below.03-the-hall-of-moots
  kind: door
  state: open
  note: ''
read_aloud: 'A long training hall with an obstacle course of trapped corridors, tripwires and swinging blades. A sign on the wall reads: INITIATES ONLY. NO LIABILITY. A rack of wooden practice weapons lies untouched.'
features:
- A trap obstacle course
- Practice weapons
- A scoreboard of best times
encounters: []
traps:
- name: The Gauntlet
  trigger: Running the obstacle course
  effect: Three traps in sequence; DC 13 Dex each, 2d6 damage on failure
  detect_dc: 13
  disarm_dc: 12
puzzles: []
secrets: []
loot: []
dm_notes: The course can be used for the initiation test.
---
# GLD-05 The Trap Gym

> A long training hall with an obstacle course of trapped corridors, tripwires and swinging blades. A sign on the wall reads: INITIATES ONLY. NO LIABILITY. A rack of wooden practice weapons lies untouched.

## Exits
- **south** (door, open): [[GLD-08 The Counterfeit Press|the counterfeit press]]
- **east** (door, open): [[GLD-03 The Hall of Moots|the hall of moots]]

## Features
- A trap obstacle course
- Practice weapons
- A scoreboard of best times

## Traps
- **The Gauntlet**: Running the obstacle course → Three traps in sequence; DC 13 Dex each, 2d6 damage on failure (detect DC 13, disarm DC 12)

## DM notes
The course can be used for the initiation test.
