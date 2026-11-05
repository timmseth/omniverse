---
id: tropelandia.room.glintfang-hoard.09-servants-quarters
kind: room
name: Servants' Quarters
number: 9
code: DRG-09
parent: tropelandia.dungeon.glintfang-hoard
dungeon: tropelandia.dungeon.glintfang-hoard
universe: tropelandia
light: lamplight
size: 40 x 30 ft
exits:
- dir: n
  to: tropelandia.room.glintfang-hoard.03-hall-of-appraisals
  kind: door
  state: open
  note: ''
- dir: w
  to: tropelandia.room.glintfang-hoard.05-gilded-antechamber
  kind: door
  state: open
  note: ''
read_aloud: A small warren of bedrooms and a mess hall where kobolds and a handful of enchanted statues play cards. A kobold shift supervisor with a clipboard looks up from a game and says, 'Are you the audit?'
features:
- A card game
- Bunk beds in rows
- A shift roster
encounters:
- name: Off-duty staff
  monsters:
  - name: Kobold
    count: 6
    hp: 5
    ac: 12
    attack: dagger +4, 1d4+2
    ref: tropelandia.monster.kobold
  tactics: Friendly unless threatened; they'll sell the party the layout of the hoard for a drink.
  treasure: ''
traps: []
puzzles: []
secrets: []
loot:
- tropelandia.item.glintfangs-staff-map
dm_notes: ''
---
# DRG-09 Servants' Quarters

> A small warren of bedrooms and a mess hall where kobolds and a handful of enchanted statues play cards. A kobold shift supervisor with a clipboard looks up from a game and says, 'Are you the audit?'

## Exits
- **north** (door, open): [[DRG-03 Hall of Appraisals|hall of appraisals]]
- **west** (door, open): [[DRG-05 Gilded Antechamber|gilded antechamber]]

## Features
- A card game
- Bunk beds in rows
- A shift roster

## Encounters
- **Off-duty staff**: 6x Kobold (HP 5, AC 12). Friendly unless threatened; they'll sell the party the layout of the hoard for a drink.

## Loot
- A staff map (reveals the hoard's layout)
