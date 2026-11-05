---
id: tropelandia.room.lichs-filing-office.06-phylactery-storage
kind: room
name: Phylactery Storage
number: 6
code: LCH-06
parent: tropelandia.dungeon.lichs-filing-office
dungeon: tropelandia.dungeon.lichs-filing-office
universe: tropelandia
light: glowing
size: 60 x 40 ft
exits:
- dir: n
  to: tropelandia.room.lichs-filing-office.03-the-forms-desk
  kind: door
  state: open
  note: ''
- dir: w
  to: tropelandia.room.lichs-filing-office.05-the-records-hall
  kind: archway
  state: open
  note: ''
read_aloud: 'A cold vault of glass shelves, each holding a small jar or amulet that glows with a faint inner light. Row upon row of phylacteries, each labelled with a name. A single, particularly ornate one sits in a pedestal case at the end, marked: PROPERTY OF L. VEXMORT. DO NOT TOUCH.'
features:
- Shelves of phylacteries
- A pedestal case
- A cold draught
encounters: []
traps:
- name: Phylactery ward
  trigger: Touching the pedestal
  effect: DC 17 Con save or 8d6 necrotic
  detect_dc: 18
  disarm_dc: 17
puzzles: []
secrets: []
loot:
- The Lich's phylactery (breaking it ends Vexmort for good)
- Dozens of other souls' phylacteries (free them for story rewards)
dm_notes: The key objective. The Lich will fight to defend it.
---
# LCH-06 Phylactery Storage

> A cold vault of glass shelves, each holding a small jar or amulet that glows with a faint inner light. Row upon row of phylacteries, each labelled with a name. A single, particularly ornate one sits in a pedestal case at the end, marked: PROPERTY OF L. VEXMORT. DO NOT TOUCH.

## Exits
- **north** (door, open): [[LCH-03 The Forms Desk|the forms desk]]
- **west** (archway, open): [[LCH-05 The Records Hall|the records hall]]

## Features
- Shelves of phylacteries
- A pedestal case
- A cold draught

## Traps
- **Phylactery ward**: Touching the pedestal → DC 17 Con save or 8d6 necrotic (detect DC 18, disarm DC 17)

## Loot
- The Lich's phylactery (breaking it ends Vexmort for good)
- Dozens of other souls' phylacteries (free them for story rewards)

## DM notes
The key objective. The Lich will fight to defend it.
