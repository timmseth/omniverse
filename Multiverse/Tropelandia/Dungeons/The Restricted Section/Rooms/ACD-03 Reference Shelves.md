---
id: tropelandia.room.restricted-section.03-reference-shelves
kind: room
name: Reference Shelves
number: 3
code: ACD-03
parent: tropelandia.dungeon.restricted-section
dungeon: tropelandia.dungeon.restricted-section
universe: tropelandia
light: lamps
size: 40 x 30 ft
exits:
- dir: w
  to: tropelandia.room.restricted-section.02-silent-reading-room
  kind: door
  state: open
  note: ''
read_aloud: Floor-to-ceiling shelves of reference works, atlases and encyclopaedias. A ladder on tracks slides back and forth. A particularly thick volume on a lectern blinks open as you approach and says, in a deep voice, 'Query?'
features:
- The Talking Encyclopedia
- A sliding ladder
- A map of the Restricted Section
encounters: []
traps: []
puzzles:
- name: The Encyclopedia
  description: The Encyclopedia answers one question per party member, but each question costs a secret.
  solution: Ask smart questions and answer honestly (Insight/Persuasion DC 13).
  hints:
  - It values secrets.
  - It can lie.
  - It hates repeating itself.
  reward: A key clue to the final vault.
secrets: []
loot:
- tropelandia.item.map-of-the-restricted-section
dm_notes: ''
---
# ACD-03 Reference Shelves

> Floor-to-ceiling shelves of reference works, atlases and encyclopaedias. A ladder on tracks slides back and forth. A particularly thick volume on a lectern blinks open as you approach and says, in a deep voice, 'Query?'

## Exits
- **west** (door, open): [[ACD-02 Silent Reading Room|silent reading room]]

## Features
- The Talking Encyclopedia
- A sliding ladder
- A map of the Restricted Section

## Puzzles
- **The Encyclopedia**: The Encyclopedia answers one question per party member, but each question costs a secret.

## Loot
- A map of the Section (reveals the layout of the Stacks)
