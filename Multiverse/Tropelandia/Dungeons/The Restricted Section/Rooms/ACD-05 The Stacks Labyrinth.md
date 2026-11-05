---
id: tropelandia.room.restricted-section.05-the-stacks-labyrinth
kind: room
name: The Stacks Labyrinth
number: 5
code: ACD-05
parent: tropelandia.dungeon.restricted-section
dungeon: tropelandia.dungeon.restricted-section
universe: tropelandia
light: floating lanterns
size: 100 x 100 ft
exits:
- dir: n
  to: tropelandia.room.restricted-section.02-silent-reading-room
  kind: archway
  state: open
  note: ''
- dir: s
  to: tropelandia.room.restricted-section.09-the-forbidden-index
  kind: passage
  state: open
  note: ''
- dir: u
  to: tropelandia.room.restricted-section.06-the-catwalk
  kind: ladder
  state: open
  note: ''
read_aloud: A labyrinth of towering shelves stretches in every direction, lit by floating lanterns. The aisles shift when not observed, and the signs overhead say 'A-F', 'G-M', 'Nope' and 'You Are Here'. Somewhere a student is crying.
features:
- Shifting shelves
- Floating lanterns
- Conflicting signs
encounters:
- name: Lost student ghosts
  monsters:
  - name: Specter
    count: 2
    hp: 22
    ac: 12
    attack: life drain +4, 3d6
  tactics: They are lost and want to be shown the exit; they attack if frightened.
  treasure: ''
traps: []
puzzles:
- name: The Shifting Aisles
  description: The aisles move when unobserved. The party must navigate by the Dewey code on the shelf ends.
  solution: Follow the code 'Magic, Misc., Misc., Misc.' (Survival DC 14) or use the Section map.
  hints:
  - The signs lie.
  - Shelf ends have codes.
  - The map in Reference helps.
  reward: The path to the Forbidden Index.
secrets: []
loot: []
dm_notes: ''
---
# ACD-05 The Stacks Labyrinth

> A labyrinth of towering shelves stretches in every direction, lit by floating lanterns. The aisles shift when not observed, and the signs overhead say 'A-F', 'G-M', 'Nope' and 'You Are Here'. Somewhere a student is crying.

## Exits
- **north** (archway, open): [[ACD-02 Silent Reading Room|silent reading room]]
- **south** (passage, open): [[ACD-09 The Forbidden Index|the forbidden index]]
- **up** (ladder, open): [[ACD-06 The Catwalk|the catwalk]]

## Features
- Shifting shelves
- Floating lanterns
- Conflicting signs

## Encounters
- **Lost student ghosts**: 2x Specter (HP 22, AC 12). They are lost and want to be shown the exit; they attack if frightened.

## Puzzles
- **The Shifting Aisles**: The aisles move when unobserved. The party must navigate by the Dewey code on the shelf ends.
