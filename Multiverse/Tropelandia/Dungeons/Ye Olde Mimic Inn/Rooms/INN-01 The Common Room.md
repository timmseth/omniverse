---
id: tropelandia.room.mimic-inn.01-the-common-room
kind: room
name: The Common Room
number: 1
code: INN-01
parent: tropelandia.dungeon.mimic-inn
dungeon: tropelandia.dungeon.mimic-inn
universe: tropelandia
light: firelit
size: 40 x 30 ft
exits:
- dir: e
  to: tropelandia.room.mimic-inn.02-the-kitchen
  kind: door
  state: open
  note: ''
- dir: u
  to: tropelandia.room.mimic-inn.03-upstairs-landing
  kind: stairs
  state: open
  note: ''
- dir: d
  to: tropelandia.room.mimic-inn.07-the-wine-cellar
  kind: hatch
  state: open
  note: ''
- dir: out
  to: outside
  kind: door
  state: open
  note: The road
read_aloud: A warm, welcoming common room with a roaring fire, long tables and a bar of polished oak. A cheerful innkeeper wipes a glass. The beams are slightly too fleshy, and the fire gives off no smoke. There is a faint, patient, wet sound, like breathing.
features:
- A roaring fire
- A smiling innkeeper
- Tables of stew
encounters:
- name: The Innkeeper
  monsters:
  - name: Innkeeper (mimic extension)
    count: 1
    hp: 58
    ac: 12
    attack: pseudopod +5, 1d8+3 plus adhesion
    ref: tropelandia.monster.mimic
  tactics: He tries to keep guests comfortable; if the party tries to leave he blocks doors with the building itself.
  treasure: ''
traps:
- name: Sticky floor
  trigger: Standing still too long
  effect: 'The floor adheres: DC 13 Str to pull free'
  detect_dc: 14
  disarm_dc: 0
puzzles: []
secrets: []
loot: []
dm_notes: 'Hint: all exits seem to close behind the party. Wisdom (Perception) DC 15 notices there is no draught.'
---
# INN-01 The Common Room

> A warm, welcoming common room with a roaring fire, long tables and a bar of polished oak. A cheerful innkeeper wipes a glass. The beams are slightly too fleshy, and the fire gives off no smoke. There is a faint, patient, wet sound, like breathing.

## Exits
- **east** (door, open): [[INN-02 The Kitchen|the kitchen]]
- **up** (stairs, open): [[INN-03 Upstairs Landing|upstairs landing]]
- **down** (hatch, open): [[INN-07 The Wine Cellar|the wine cellar]]
- **out** (door, open): outside — The road

## Features
- A roaring fire
- A smiling innkeeper
- Tables of stew

## Encounters
- **The Innkeeper**: 1x Innkeeper (mimic extension) (HP 58, AC 12). He tries to keep guests comfortable; if the party tries to leave he blocks doors with the building itself.

## Traps
- **Sticky floor**: Standing still too long → The floor adheres: DC 13 Str to pull free (detect DC 14, disarm DC 0)

## DM notes
Hint: all exits seem to close behind the party. Wisdom (Perception) DC 15 notices there is no draught.
