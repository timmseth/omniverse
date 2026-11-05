---
id: tropelandia.room.marlowes-tower.01-entrance-hall
kind: room
name: Entrance Hall
number: 1
code: TWR-01
parent: tropelandia.dungeon.marlowes-tower
dungeon: tropelandia.dungeon.marlowes-tower
universe: tropelandia
light: floating candles
size: 25 ft diameter
exits:
- dir: e
  to: tropelandia.room.marlowes-tower.02-wizards-kitchen
  kind: door
  state: open
  note: ''
- dir: u
  to: tropelandia.room.marlowes-tower.03-the-library
  kind: stairs
  state: open
  note: The spiral stair; it rearranges itself behind you
- dir: d
  to: tropelandia.room.marlowes-tower.08-the-basement-laboratory
  kind: hatch
  state: locked
  note: Iron trapdoor; DC 15 lock; or the key in the kitchen
- dir: out
  to: outside
  kind: door
  state: open
  note: The tower door onto Barrowdale's judging table
read_aloud: 'A round hall with a floor of black and white tiles, lit by candles that float at head height. A staircase spirals upward; a smaller door leads east and a trapdoor in the floor leads down. A sign on the wall reads: PLEASE REMOVE BOOTS. DO NOT TOUCH THE BANISTER. DO NOT ASK ABOUT THE FLOOR. The banister hums.'
features:
- Floating candles
- A boot rack with exactly one pair of very large shoes
- A banister that gives a mild shock
encounters:
- name: Welcome broom
  monsters:
  - name: Animated broom (flying sword stats)
    count: 1
    hp: 17
    ac: 17
    attack: slam +3, 1d6+1
    ref: tropelandia.monster.flying-sword
  tactics: It tries to remove the party's boots, and fights if refused; it can be bribed with a nice polish.
  treasure: ''
traps:
- name: Banister shock
  trigger: Touching the banister
  effect: DC 12 Con save or 2d6 lightning and a hairstyle
  detect_dc: 11
  disarm_dc: 12
puzzles: []
secrets: []
loot: []
dm_notes: 'Establishes tone. Wizard in a Tower beat: the tower tests visitors with a staircase and a rule.'
---
# TWR-01 Entrance Hall

> A round hall with a floor of black and white tiles, lit by candles that float at head height. A staircase spirals upward; a smaller door leads east and a trapdoor in the floor leads down. A sign on the wall reads: PLEASE REMOVE BOOTS. DO NOT TOUCH THE BANISTER. DO NOT ASK ABOUT THE FLOOR. The banister hums.

## Exits
- **east** (door, open): [[TWR-02 Wizard's Kitchen|wizards kitchen]]
- **up** (stairs, open): [[TWR-03 The Library|the library]] — The spiral stair; it rearranges itself behind you
- **down** (hatch, locked): [[TWR-08 The Basement Laboratory|the basement laboratory]] — Iron trapdoor; DC 15 lock; or the key in the kitchen
- **out** (door, open): outside — The tower door onto Barrowdale's judging table

## Features
- Floating candles
- A boot rack with exactly one pair of very large shoes
- A banister that gives a mild shock

## Encounters
- **Welcome broom**: 1x Animated broom (flying sword stats) (HP 17, AC 17). It tries to remove the party's boots, and fights if refused; it can be bribed with a nice polish.

## Traps
- **Banister shock**: Touching the banister → DC 12 Con save or 2d6 lightning and a hairstyle (detect DC 11, disarm DC 12)

## DM notes
Establishes tone. Wizard in a Tower beat: the tower tests visitors with a staircase and a rule.
