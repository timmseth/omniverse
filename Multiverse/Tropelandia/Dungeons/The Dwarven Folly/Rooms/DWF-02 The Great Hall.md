---
id: tropelandia.room.dwarven-folly.02-the-great-hall
kind: room
name: The Great Hall
number: 2
code: DWF-02
parent: tropelandia.dungeon.dwarven-folly
dungeon: tropelandia.dungeon.dwarven-folly
universe: tropelandia
light: dim, from high windows
size: 80 x 50 ft
exits:
- dir: n
  to: tropelandia.room.dwarven-folly.01-the-gatehouse
  kind: archway
  state: open
  note: ''
- dir: s
  to: tropelandia.room.dwarven-folly.05-the-singing-forge
  kind: archway
  state: open
  note: ''
- dir: e
  to: tropelandia.room.dwarven-folly.03-the-brewery
  kind: door
  state: open
  note: ''
- dir: w
  to: tropelandia.room.dwarven-folly.04-the-barracks
  kind: door
  state: open
  note: ''
read_aloud: A hall of vast pillars, each carved with a dwarven king, supports a ceiling that vanishes in dark. Long tables, thick with dust, stretch to a dais bearing an empty throne. Hanging banners hang in tatters, and a draught from the south carries a faint, steady, sorrowful humming.
features:
- Kingly pillars
- The throne of Karak-Dum-Dum
- Mouldering banners
encounters:
- name: Dwarf specters
  monsters:
  - name: Specter
    count: 2
    hp: 22
    ac: 12
    attack: life drain +4, 3d6
  tactics: They appear if the throne is sat upon; they'll demand the party's names, then ask them to leave.
  treasure: ''
traps: []
puzzles: []
secrets:
- description: A hidden compartment in the throne holds a rolled map of the lower tunnels
  dc: 15
loot:
- The map of the lower tunnels (reduces getting lost in the shaft)
dm_notes: ''
---
# DWF-02 The Great Hall

> A hall of vast pillars, each carved with a dwarven king, supports a ceiling that vanishes in dark. Long tables, thick with dust, stretch to a dais bearing an empty throne. Hanging banners hang in tatters, and a draught from the south carries a faint, steady, sorrowful humming.

## Exits
- **north** (archway, open): [[DWF-01 The Gatehouse|the gatehouse]]
- **south** (archway, open): [[DWF-05 The Singing Forge|the singing forge]]
- **east** (door, open): [[DWF-03 The Brewery|the brewery]]
- **west** (door, open): [[DWF-04 The Barracks|the barracks]]

## Features
- Kingly pillars
- The throne of Karak-Dum-Dum
- Mouldering banners

## Encounters
- **Dwarf specters**: 2x Specter (HP 22, AC 12). They appear if the throne is sat upon; they'll demand the party's names, then ask them to leave.

## Secrets
- A hidden compartment in the throne holds a rolled map of the lower tunnels (DC 15)

## Loot
- The map of the lower tunnels (reduces getting lost in the shaft)
