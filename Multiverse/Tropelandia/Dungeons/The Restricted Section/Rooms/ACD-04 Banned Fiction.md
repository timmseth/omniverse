---
id: tropelandia.room.restricted-section.04-banned-fiction
kind: room
name: Banned Fiction
number: 4
code: ACD-04
parent: tropelandia.dungeon.restricted-section
dungeon: tropelandia.dungeon.restricted-section
universe: tropelandia
light: rose-coloured
size: 30 x 30 ft
exits:
- dir: e
  to: tropelandia.room.restricted-section.02-silent-reading-room
  kind: door
  state: open
  note: ''
read_aloud: 'Shelves of lurid paperbacks and scandalous romances line the walls, their covers shifting and sighing. A reading chair bears a heart-shaped indent. A tiny tag on one shelf: ''READ AT YOUR OWN RISK. SERIOUSLY.'''
features:
- Sighing paperbacks
- A reading chair
- A shelf of dubious classics
encounters:
- name: Lovestruck tomes
  monsters:
  - name: Flying books
    count: 6
    hp: 5
    ac: 14
    attack: paper cut +4, 1d4+1
  tactics: 'They try to charm: DC 13 Wis save or the target is charmed for 1 minute.'
  treasure: ''
traps: []
puzzles: []
secrets: []
loot:
- A romance novel that grants advantage on Persuasion for a day
dm_notes: ''
---
# ACD-04 Banned Fiction

> Shelves of lurid paperbacks and scandalous romances line the walls, their covers shifting and sighing. A reading chair bears a heart-shaped indent. A tiny tag on one shelf: 'READ AT YOUR OWN RISK. SERIOUSLY.'

## Exits
- **east** (door, open): [[ACD-02 Silent Reading Room|silent reading room]]

## Features
- Sighing paperbacks
- A reading chair
- A shelf of dubious classics

## Encounters
- **Lovestruck tomes**: 6x Flying books (HP 5, AC 14). They try to charm: DC 13 Wis save or the target is charmed for 1 minute.

## Loot
- A romance novel that grants advantage on Persuasion for a day
