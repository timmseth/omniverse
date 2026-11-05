---
id: tropelandia.room.restricted-section.07-rare-manuscripts
kind: room
name: Rare Manuscripts
number: 7
code: ACD-07
parent: tropelandia.dungeon.restricted-section
dungeon: tropelandia.dungeon.restricted-section
universe: tropelandia
light: dim, filtered
size: 40 x 30 ft
exits:
- dir: w
  to: tropelandia.room.restricted-section.06-the-catwalk
  kind: door
  state: open
  note: ''
read_aloud: A hushed chamber of glass cases, each holding a book bound in something that was once alive. Dust motes hang in the stillness. A single illuminated manuscript lies open on a lectern, its illustrations moving slowly.
features:
- Glass cases
- An illuminated manuscript
- A lectern
encounters: []
traps:
- name: Glass case ward
  trigger: Opening a case without a key
  effect: DC 14 Dex save or 4d6 force
  detect_dc: 15
  disarm_dc: 14
puzzles: []
secrets: []
loot:
- A spellbook with 3 random wizard spells (up to level 3)
- tropelandia.item.bookmark-of-feather-fall
dm_notes: ''
---
# ACD-07 Rare Manuscripts

> A hushed chamber of glass cases, each holding a book bound in something that was once alive. Dust motes hang in the stillness. A single illuminated manuscript lies open on a lectern, its illustrations moving slowly.

## Exits
- **west** (door, open): [[ACD-06 The Catwalk|the catwalk]]

## Features
- Glass cases
- An illuminated manuscript
- A lectern

## Traps
- **Glass case ward**: Opening a case without a key → DC 14 Dex save or 4d6 force (detect DC 15, disarm DC 14)

## Loot
- A spellbook with 3 random wizard spells (up to level 3)
- A bookmark of Feather Fall
