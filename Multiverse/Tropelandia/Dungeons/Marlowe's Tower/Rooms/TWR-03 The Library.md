---
id: tropelandia.room.marlowes-tower.03-the-library
kind: room
name: The Library
number: 3
code: TWR-03
parent: tropelandia.dungeon.marlowes-tower
dungeon: tropelandia.dungeon.marlowes-tower
universe: tropelandia
light: dim
size: 35 ft diameter
exits:
- dir: n
  to: tropelandia.room.marlowes-tower.04-the-study-of-mild-menace
  kind: door
  state: closed
  note: ''
- dir: u
  to: tropelandia.room.marlowes-tower.05-apprentices-quarters
  kind: stairs
  state: open
  note: ''
- dir: d
  to: tropelandia.room.marlowes-tower.01-entrance-hall
  kind: stairs
  state: open
  note: The spiral stair; it rearranges itself behind you
read_aloud: 'Shelves climb the walls to a vaulted ceiling lost in shadow, every one packed with books, scrolls and what appears to be a large collection of takeaway menus. A ladder on wheels glides along a rail on its own, trailing a trail of dust. A small plaque reads: SILENCE, PLEASE. THE BOOKS ARE LISTENING.'
features:
- A wheeled ladder with a mind of its own
- Takeaway menus from six planes
- A reading chair that tilts toward interesting books
encounters: []
traps:
- name: Paper cuts
  trigger: Shouting or loud noise
  effect: 'Pages cut: 2d6 slashing in a 15 ft cone, DC 13 Dex halves'
  detect_dc: 12
  disarm_dc: 13
puzzles:
- name: The Shushing Shelves
  description: A bookshelf in the north wall hides the study door. The books whisper hints about the door's password if the party speaks quietly. Speak too loudly and the books attack with paper cuts.
  solution: 'Whisper the password ''overdue'' (clue: ''a library''s greatest sin'') to the books; the shelf swings open.'
  hints:
  - Books whisper when you whisper.
  - The word is something every library fears.
  - 'The menus have a clue: a late fee.'
  reward: The shelf opens to the study.
secrets: []
loot:
- tropelandia.item.scroll-of-feather-fall
- A first-edition Guide to Reasonable Rent
dm_notes: Light puzzle, quick to solve; the library is the trope's first obstacle.
---
# TWR-03 The Library

> Shelves climb the walls to a vaulted ceiling lost in shadow, every one packed with books, scrolls and what appears to be a large collection of takeaway menus. A ladder on wheels glides along a rail on its own, trailing a trail of dust. A small plaque reads: SILENCE, PLEASE. THE BOOKS ARE LISTENING.

## Exits
- **north** (door, closed): [[TWR-04 The Study of Mild Menace|the study of mild menace]]
- **up** (stairs, open): [[TWR-05 Apprentice's Quarters|apprentices quarters]]
- **down** (stairs, open): [[TWR-01 Entrance Hall|entrance hall]] — The spiral stair; it rearranges itself behind you

## Features
- A wheeled ladder with a mind of its own
- Takeaway menus from six planes
- A reading chair that tilts toward interesting books

## Traps
- **Paper cuts**: Shouting or loud noise → Pages cut: 2d6 slashing in a 15 ft cone, DC 13 Dex halves (detect DC 12, disarm DC 13)

## Puzzles
- **The Shushing Shelves**: A bookshelf in the north wall hides the study door. The books whisper hints about the door's password if the party speaks quietly. Speak too loudly and the books attack with paper cuts.

## Loot
- A scroll of Feather Fall tucked in a menu
- A first-edition Guide to Reasonable Rent

## DM notes
Light puzzle, quick to solve; the library is the trope's first obstacle.
