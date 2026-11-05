---
id: tropelandia.room.sunken-chapel.02-the-nave
kind: room
name: The Nave
number: 2
code: CHP-02
parent: tropelandia.dungeon.sunken-chapel
dungeon: tropelandia.dungeon.sunken-chapel
universe: tropelandia
light: moonlight
size: 40 x 20 ft, 2 ft of water
exits:
- dir: n
  to: tropelandia.room.sunken-chapel.01-reed-landing
  kind: door
  state: stuck
  note: DC 12 Str to force
- dir: s
  to: tropelandia.room.sunken-chapel.05-the-altar
  kind: archway
  state: open
  note: ''
- dir: e
  to: tropelandia.room.sunken-chapel.04-the-vestry
  kind: door
  state: open
  note: ''
- dir: w
  to: tropelandia.room.sunken-chapel.03-bell-tower-base
  kind: door
  state: open
  note: ''
read_aloud: The long hall of a chapel half under water. Pews float like islands, their cushions long dissolved. Moonlight falls through a broken window onto an altar draped in algae. Skeletal worshippers kneel in the pews, heads bowed, perfectly still.
features:
- Floating pews
- Kneeling skeletons (inert unless disturbed)
- A cracked stained-glass window
encounters:
- name: Congregation
  monsters:
  - name: Skeleton
    count: 6
    hp: 13
    ac: 13
    attack: shortsword +4, 1d6+2
    ref: tropelandia.monster.skeleton
  tactics: They rise if the party touches the altar or disturbs the pews; they will sing, loudly, off-key, which gives disadvantage on Wisdom (Perception).
  treasure: ''
traps: []
puzzles: []
secrets: []
loot: []
dm_notes: 'Passive hazard: moving quietly keeps the congregation asleep (DC 12 Stealth).'
---
# CHP-02 The Nave

> The long hall of a chapel half under water. Pews float like islands, their cushions long dissolved. Moonlight falls through a broken window onto an altar draped in algae. Skeletal worshippers kneel in the pews, heads bowed, perfectly still.

## Exits
- **north** (door, stuck): [[CHP-01 Reed Landing|reed landing]] — DC 12 Str to force
- **south** (archway, open): [[CHP-05 The Altar|the altar]]
- **east** (door, open): [[CHP-04 The Vestry|the vestry]]
- **west** (door, open): [[CHP-03 Bell Tower Base|bell tower base]]

## Features
- Floating pews
- Kneeling skeletons (inert unless disturbed)
- A cracked stained-glass window

## Encounters
- **Congregation**: 6x Skeleton (HP 13, AC 13). They rise if the party touches the altar or disturbs the pews; they will sing, loudly, off-key, which gives disadvantage on Wisdom (Perception).

## DM notes
Passive hazard: moving quietly keeps the congregation asleep (DC 12 Stealth).
