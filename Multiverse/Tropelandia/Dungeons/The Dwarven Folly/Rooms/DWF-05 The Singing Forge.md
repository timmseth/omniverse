---
id: tropelandia.room.dwarven-folly.05-the-singing-forge
kind: room
name: The Singing Forge
number: 5
code: DWF-05
parent: tropelandia.dungeon.dwarven-folly
dungeon: tropelandia.dungeon.dwarven-folly
universe: tropelandia
light: forge glow
size: 60 x 40 ft
exits:
- dir: n
  to: tropelandia.room.dwarven-folly.02-the-great-hall
  kind: archway
  state: open
  note: ''
- dir: d
  to: tropelandia.room.dwarven-folly.06-the-mine-shaft
  kind: stairs
  state: open
  note: A wide ramp into the mine shaft
read_aloud: 'A vast forge chamber ringing with the sound of a distant hammer. The anvil, a block of black iron the size of a wagon, glows faintly red. The sound is not a hammer after all, but a voice: low, patient, singing in a tongue that makes your teeth ache.'
features:
- The Anvil of Opinions
- A crucible of cold molten metal
- A bellows that breathes by itself
encounters:
- name: Fire spirits
  monsters:
  - name: Fire elemental (minor)
    count: 2
    hp: 20
    ac: 13
    attack: touch +4, 2d6 fire
  tactics: They erupt from the crucible if the song is interrupted.
  treasure: ''
traps: []
puzzles:
- name: The Anvil's Song
  description: The anvil sings three notes; the party must answer with the same three on the nearby chimes.
  solution: 'Strike the chimes in order: low, high, middle.'
  hints:
  - The song repeats.
  - The chimes are labelled.
  - The notes spell a dwarven name.
  reward: The forge goes silent for an hour; the shaft is safe to descend.
secrets: []
loot:
- Anvil of Opinions (artifact; talks, offers advice)
dm_notes: ''
---
# DWF-05 The Singing Forge

> A vast forge chamber ringing with the sound of a distant hammer. The anvil, a block of black iron the size of a wagon, glows faintly red. The sound is not a hammer after all, but a voice: low, patient, singing in a tongue that makes your teeth ache.

## Exits
- **north** (archway, open): [[DWF-02 The Great Hall|the great hall]]
- **down** (stairs, open): [[DWF-06 The Mine Shaft|the mine shaft]] — A wide ramp into the mine shaft

## Features
- The Anvil of Opinions
- A crucible of cold molten metal
- A bellows that breathes by itself

## Encounters
- **Fire spirits**: 2x Fire elemental (minor) (HP 20, AC 13). They erupt from the crucible if the song is interrupted.

## Puzzles
- **The Anvil's Song**: The anvil sings three notes; the party must answer with the same three on the nearby chimes.

## Loot
- Anvil of Opinions (artifact; talks, offers advice)
