---
id: tropelandia.room.dwarven-folly.10-the-thing-they-dug-into
kind: room
name: The Thing They Dug Into
number: 10
code: DWF-10
parent: tropelandia.dungeon.dwarven-folly
dungeon: tropelandia.dungeon.dwarven-folly
universe: tropelandia
light: unnatural
size: 100 x 100 ft
exits:
- dir: n
  to: tropelandia.room.dwarven-folly.09-the-breach
  kind: portal
  state: open
  note: A hole in the rock
read_aloud: A vast, shifting chamber of black glass and pulsing veins. A being the size of a house floats at its centre, many-eyed and patient, wearing a tiny name tag that reads 'HELLO, MY NAME IS ...' The tag is smudged. The being smiles with something that is not a mouth.
features:
- A being wearing a name tag
- A floor of black glass
- Pulsing veins in the walls
encounters:
- name: The Plumber
  monsters:
  - name: Elder Thing (aberration)
    count: 1
    hp: 135
    ac: 15
    attack: tentacles +8, 3d6 psychic
    ref: tropelandia.monster.elder-thing
  tactics: Not hostile at first; it wants someone to fix the leak it came in through. If refused it attacks.
  treasure: ''
traps: []
puzzles:
- name: The Repair Job
  description: The being has a leak in the wall between worlds and needs a skilled crafter to patch it.
  solution: A DC 15 Smith's Tools check, or the Anvil of Opinions' advice, patches the leak.
  hints:
  - The being keeps looking at a hole.
  - It offers a tool.
  - The anvil sings a repair song.
  reward: The being rewards the party with a boon and goes home.
secrets: []
loot:
- A gift from beyond (a wish-adjacent boon, DM's choice)
dm_notes: 'Ancient Evil Released by Dumb Adventurers, inverted: the evil isn''t evil, just stranded. Keep it weird and polite.'
---
# DWF-10 The Thing They Dug Into

> A vast, shifting chamber of black glass and pulsing veins. A being the size of a house floats at its centre, many-eyed and patient, wearing a tiny name tag that reads 'HELLO, MY NAME IS ...' The tag is smudged. The being smiles with something that is not a mouth.

## Exits
- **north** (portal, open): [[DWF-09 The Breach|the breach]] — A hole in the rock

## Features
- A being wearing a name tag
- A floor of black glass
- Pulsing veins in the walls

## Encounters
- **The Plumber**: 1x Elder Thing (aberration) (HP 135, AC 15). Not hostile at first; it wants someone to fix the leak it came in through. If refused it attacks.

## Puzzles
- **The Repair Job**: The being has a leak in the wall between worlds and needs a skilled crafter to patch it.

## Loot
- A gift from beyond (a wish-adjacent boon, DM's choice)

## DM notes
Ancient Evil Released by Dumb Adventurers, inverted: the evil isn't evil, just stranded. Keep it weird and polite.
