---
id: tropelandia.room.guildhall-below.02-the-smelly-cellar
kind: room
name: The Smelly Cellar
number: 2
code: GLD-02
parent: tropelandia.dungeon.guildhall-below
dungeon: tropelandia.dungeon.guildhall-below
universe: tropelandia
light: lantern glow
size: 30 x 20 ft
exits:
- dir: s
  to: tropelandia.room.guildhall-below.03-the-hall-of-moots
  kind: door
  state: open
  note: ''
- dir: u
  to: tropelandia.room.guildhall-below.01-the-fishmongers-stall
  kind: hatch
  state: closed
  note: 'A false-bottomed barrel; the fishmonger''s password: ''perch'''
read_aloud: A flooded cellar of old fish barrels and sagging crates. A ladder drops into water; a line of hooks hangs from the ceiling, each with a lantern. Beyond a rotted door, voices and the clink of coin carry through the stink.
features:
- Old barrels
- Lanterns on hooks
- A trail of footprints
encounters:
- name: Lookouts
  monsters:
  - name: Bandit
    count: 2
    hp: 11
    ac: 12
    attack: scimitar +3, 1d6+1
    ref: tropelandia.monster.bandit
  tactics: They ask for the sign (a particular whistle) and attack if not given.
  treasure: ''
traps:
- name: Slippery floor
  trigger: Running across the wet floor
  effect: DC 12 Dex save or fall prone, 1d4 damage
  detect_dc: 12
  disarm_dc: 0
puzzles: []
secrets: []
loot: []
dm_notes: ''
---
# GLD-02 The Smelly Cellar

> A flooded cellar of old fish barrels and sagging crates. A ladder drops into water; a line of hooks hangs from the ceiling, each with a lantern. Beyond a rotted door, voices and the clink of coin carry through the stink.

## Exits
- **south** (door, open): [[GLD-03 The Hall of Moots|the hall of moots]]
- **up** (hatch, closed): [[GLD-01 The Fishmonger's Stall|the fishmongers stall]] — A false-bottomed barrel; the fishmonger's password: 'perch'

## Features
- Old barrels
- Lanterns on hooks
- A trail of footprints

## Encounters
- **Lookouts**: 2x Bandit (HP 11, AC 12). They ask for the sign (a particular whistle) and attack if not given.

## Traps
- **Slippery floor**: Running across the wet floor → DC 12 Dex save or fall prone, 1d4 damage (detect DC 12, disarm DC 0)
