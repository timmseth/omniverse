---
id: tropelandia.room.restricted-section.02-silent-reading-room
kind: room
name: Silent Reading Room
number: 2
code: ACD-02
parent: tropelandia.dungeon.restricted-section
dungeon: tropelandia.dungeon.restricted-section
universe: tropelandia
light: green lamplight
size: 60 x 40 ft
exits:
- dir: n
  to: tropelandia.room.restricted-section.01-the-librarians-desk
  kind: door
  state: closed
  note: Iron doors; open on presentation of a library card
- dir: s
  to: tropelandia.room.restricted-section.05-the-stacks-labyrinth
  kind: archway
  state: open
  note: ''
- dir: e
  to: tropelandia.room.restricted-section.03-reference-shelves
  kind: door
  state: open
  note: ''
- dir: w
  to: tropelandia.room.restricted-section.04-banned-fiction
  kind: door
  state: open
  note: ''
read_aloud: 'A long, hushed hall of reading desks under green-shaded lamps. Students slump over books, motionless and pale. A sign: SILENCE. Even your footsteps seem to stir the pages, which rustle in warning.'
features:
- Rows of desks
- Pale students (animated by books)
- Green lamps
encounters:
- name: Bookbound students
  monsters:
  - name: Zombie student
    count: 4
    hp: 22
    ac: 8
    attack: slam +3, 1d6+1
    ref: tropelandia.monster.zombie
  tactics: They rise if the party speaks above a whisper.
  treasure: ''
traps:
- name: The Silence spell
  trigger: Speaking loudly
  effect: 'A zone of magical silence: casters are blocked for 1 minute'
  detect_dc: 14
  disarm_dc: 0
puzzles: []
secrets: []
loot: []
dm_notes: Stealth makes the encounter trivial; noise makes it deadly.
---
# ACD-02 Silent Reading Room

> A long, hushed hall of reading desks under green-shaded lamps. Students slump over books, motionless and pale. A sign: SILENCE. Even your footsteps seem to stir the pages, which rustle in warning.

## Exits
- **north** (door, closed): [[ACD-01 The Librarian's Desk|the librarians desk]] — Iron doors; open on presentation of a library card
- **south** (archway, open): [[ACD-05 The Stacks Labyrinth|the stacks labyrinth]]
- **east** (door, open): [[ACD-03 Reference Shelves|reference shelves]]
- **west** (door, open): [[ACD-04 Banned Fiction|banned fiction]]

## Features
- Rows of desks
- Pale students (animated by books)
- Green lamps

## Encounters
- **Bookbound students**: 4x Zombie student (HP 22, AC 8). They rise if the party speaks above a whisper.

## Traps
- **The Silence spell**: Speaking loudly → A zone of magical silence: casters are blocked for 1 minute (detect DC 14, disarm DC 0)

## DM notes
Stealth makes the encounter trivial; noise makes it deadly.
