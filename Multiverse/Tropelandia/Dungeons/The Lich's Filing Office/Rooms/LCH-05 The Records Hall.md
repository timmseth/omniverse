---
id: tropelandia.room.lichs-filing-office.05-the-records-hall
kind: room
name: The Records Hall
number: 5
code: LCH-05
parent: tropelandia.dungeon.lichs-filing-office
dungeon: tropelandia.dungeon.lichs-filing-office
universe: tropelandia
light: cold blue
size: 120 x 80 ft
exits:
- dir: n
  to: tropelandia.room.lichs-filing-office.02-the-waiting-hall
  kind: archway
  state: open
  note: ''
- dir: s
  to: tropelandia.room.lichs-filing-office.08-the-lichs-corner-office
  kind: door
  state: locked
  note: Locked by the Lich's seal
- dir: e
  to: tropelandia.room.lichs-filing-office.06-phylactery-storage
  kind: archway
  state: open
  note: ''
- dir: w
  to: tropelandia.room.lichs-filing-office.07-appeals
  kind: archway
  state: open
  note: ''
read_aloud: A vast gallery of towering filing cabinets reaching beyond sight. Each drawer is labelled with a name, a date and a number. Cold blue light drifts through the aisles. A small golem on wheels glides past with a stack of files.
features:
- Towering filing cabinets
- A golem courier
- Drawers labelled with names
encounters:
- name: Filing golem
  monsters:
  - name: Stone golem
    count: 1
    hp: 178
    ac: 17
    attack: slam +10, 3d8+6
    ref: tropelandia.monster.stone-golem
  tactics: It defends the cabinets from vandals.
  treasure: ''
traps: []
puzzles:
- name: The File
  description: The party's own file is somewhere in the cabinets, and it contains a clause that could free them.
  solution: Search by name and date (Investigation DC 14).
  hints:
  - Files are alphabetical by cause of death.
  - The golem knows the system.
  - The file is in the 'Pending' drawer.
  reward: A shortcut and leverage over the Lich.
secrets: []
loot: []
dm_notes: ''
---
# LCH-05 The Records Hall

> A vast gallery of towering filing cabinets reaching beyond sight. Each drawer is labelled with a name, a date and a number. Cold blue light drifts through the aisles. A small golem on wheels glides past with a stack of files.

## Exits
- **north** (archway, open): [[LCH-02 The Waiting Hall|the waiting hall]]
- **south** (door, locked): [[LCH-08 The Lich's Corner Office|the lichs corner office]] — Locked by the Lich's seal
- **east** (archway, open): [[LCH-06 Phylactery Storage|phylactery storage]]
- **west** (archway, open): [[LCH-07 Appeals|appeals]]

## Features
- Towering filing cabinets
- A golem courier
- Drawers labelled with names

## Encounters
- **Filing golem**: 1x Stone golem (HP 178, AC 17). It defends the cabinets from vandals.

## Puzzles
- **The File**: The party's own file is somewhere in the cabinets, and it contains a clause that could free them.
