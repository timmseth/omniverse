---
id: tropelandia.room.lichs-filing-office.07-appeals
kind: room
name: Appeals
number: 7
code: LCH-07
parent: tropelandia.dungeon.lichs-filing-office
dungeon: tropelandia.dungeon.lichs-filing-office
universe: tropelandia
light: solemn
size: 50 x 40 ft
exits:
- dir: n
  to: tropelandia.room.lichs-filing-office.04-the-inbox
  kind: door
  state: open
  note: ''
- dir: e
  to: tropelandia.room.lichs-filing-office.05-the-records-hall
  kind: archway
  state: open
  note: ''
read_aloud: A courtroom-like chamber where a row of ghostly judges sits behind a long bench. A gavel bangs. A petitioner at the stand pleads, 'But I was alive when I filed.' 'Denied,' say the judges. 'Next!'
features:
- Ghostly judges
- A witness stand
- A scales of justice, slightly off
encounters:
- name: Appeals panel
  monsters:
  - name: Ghost judge
    count: 3
    hp: 45
    ac: 11
    attack: withering touch +5, 4d6
    ref: tropelandia.monster.ghost-judge
  tactics: They rule on the party's case; they can be persuaded by good arguments (Persuasion DC 16).
  treasure: ''
traps: []
puzzles:
- name: The Appeal
  description: The party can appeal the Lich's rule. Winning grants a stay of execution.
  solution: Make a case (Persuasion DC 16) citing a procedural error found in the Records Hall.
  hints:
  - Procedural errors are the key.
  - The judges love precedent.
  - The Lich hates being overruled.
  reward: The judges grant a one-time reprieve from the Lich's wrath.
secrets: []
loot: []
dm_notes: ''
---
# LCH-07 Appeals

> A courtroom-like chamber where a row of ghostly judges sits behind a long bench. A gavel bangs. A petitioner at the stand pleads, 'But I was alive when I filed.' 'Denied,' say the judges. 'Next!'

## Exits
- **north** (door, open): [[LCH-04 The Inbox|the inbox]]
- **east** (archway, open): [[LCH-05 The Records Hall|the records hall]]

## Features
- Ghostly judges
- A witness stand
- A scales of justice, slightly off

## Encounters
- **Appeals panel**: 3x Ghost judge (HP 45, AC 11). They rule on the party's case; they can be persuaded by good arguments (Persuasion DC 16).

## Puzzles
- **The Appeal**: The party can appeal the Lich's rule. Winning grants a stay of execution.
