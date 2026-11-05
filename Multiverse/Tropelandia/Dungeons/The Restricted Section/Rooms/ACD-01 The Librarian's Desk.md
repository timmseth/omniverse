---
id: tropelandia.room.restricted-section.01-the-librarians-desk
kind: room
name: The Librarian's Desk
number: 1
code: ACD-01
parent: tropelandia.dungeon.restricted-section
dungeon: tropelandia.dungeon.restricted-section
universe: tropelandia
light: lamplight
size: 30 x 20 ft
exits:
- dir: s
  to: tropelandia.room.restricted-section.02-silent-reading-room
  kind: door
  state: closed
  note: Iron doors; open on presentation of a library card
- dir: out
  to: outside
  kind: door
  state: open
  note: The Academy corridor
read_aloud: A vast oak desk stands before a pair of iron doors, behind it a very old woman with spectacles on a chain. She does not look up. 'Library card,' she says. 'Overdue fines. And the rules, which you have not read.' A small brass bell chimes by itself.
features:
- A vast oak desk
- A brass bell
- A stack of fine notices
encounters:
- name: The Librarian
  monsters:
  - name: Archmage Librarian (mage)
    count: 1
    hp: 40
    ac: 12
    attack: fire bolt +6, 2d10
  tactics: She attacks only if the rules are broken in front of her; she also enforces silence with a spell.
  treasure: ''
traps: []
puzzles:
- name: The Rules
  description: The Librarian demands that the party read the rules and sign a waiver. The waiver contains a hidden clause.
  solution: Read the waiver (Investigation DC 14) to find and strike the clause 'owes a year of service'.
  hints:
  - The waiver has an asterisk.
  - Page 3 is blank, then isn't.
  - A signature is a binding contract.
  reward: The iron doors open.
secrets: []
loot: []
dm_notes: ''
---
# ACD-01 The Librarian's Desk

> A vast oak desk stands before a pair of iron doors, behind it a very old woman with spectacles on a chain. She does not look up. 'Library card,' she says. 'Overdue fines. And the rules, which you have not read.' A small brass bell chimes by itself.

## Exits
- **south** (door, closed): [[ACD-02 Silent Reading Room|silent reading room]] — Iron doors; open on presentation of a library card
- **out** (door, open): outside — The Academy corridor

## Features
- A vast oak desk
- A brass bell
- A stack of fine notices

## Encounters
- **The Librarian**: 1x Archmage Librarian (mage) (HP 40, AC 12). She attacks only if the rules are broken in front of her; she also enforces silence with a spell.

## Puzzles
- **The Rules**: The Librarian demands that the party read the rules and sign a waiver. The waiver contains a hidden clause.
