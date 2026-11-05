---
id: tropelandia.room.marlowes-tower.08-the-basement-laboratory
kind: room
name: The Basement Laboratory
number: 8
code: TWR-08
parent: tropelandia.dungeon.marlowes-tower
dungeon: tropelandia.dungeon.marlowes-tower
universe: tropelandia
light: green glow
size: 35 x 25 ft
exits:
- dir: u
  to: tropelandia.room.marlowes-tower.01-entrance-hall
  kind: hatch
  state: locked
  note: Iron trapdoor; DC 15 lock; or the key in the kitchen
read_aloud: 'A cold, dank cellar converted into a laboratory, lined with bubbling beakers, jars of preserved things and a large iron vat that glows green. A faint chanting comes from the vat. A hand-written sign says: WHAT ARE YOU DOING DOWN HERE? THIS IS AN EXPERIMENT.'
features:
- The glowing vat
- Jars of preserved things
- A cage of confused magical rabbits
encounters:
- name: Experiment gone wrong
  monsters:
  - name: Ooze (green slime vat)
    count: 1
    hp: 45
    ac: 8
    attack: pseudopod +5, 2d6 acid
    ref: tropelandia.monster.green-slime-vat
  tactics: The ooze attacks anyone who stirs the vat; it can be calmed with flour (Marlowe's kitchen).
  treasure: ''
traps:
- name: Volatile vial
  trigger: Handling the beakers carelessly
  effect: 'A vial explodes: DC 13 Dex save or 3d6 fire in 10 ft'
  detect_dc: 14
  disarm_dc: 13
puzzles: []
secrets: []
loot:
- tropelandia.item.potion-of-growth
- tropelandia.item.potion-of-hair-restoration
- 'Marlowe''s secret: a copy of the unpaid dragon bill from the pantry'
dm_notes: Where Marlowe hides his experiments. The ooze is a small boss for a low-level party.
---
# TWR-08 The Basement Laboratory

> A cold, dank cellar converted into a laboratory, lined with bubbling beakers, jars of preserved things and a large iron vat that glows green. A faint chanting comes from the vat. A hand-written sign says: WHAT ARE YOU DOING DOWN HERE? THIS IS AN EXPERIMENT.

## Exits
- **up** (hatch, locked): [[TWR-01 Entrance Hall|entrance hall]] — Iron trapdoor; DC 15 lock; or the key in the kitchen

## Features
- The glowing vat
- Jars of preserved things
- A cage of confused magical rabbits

## Encounters
- **Experiment gone wrong**: 1x Ooze (green slime vat) (HP 45, AC 8). The ooze attacks anyone who stirs the vat; it can be calmed with flour (Marlowe's kitchen).

## Traps
- **Volatile vial**: Handling the beakers carelessly → A vial explodes: DC 13 Dex save or 3d6 fire in 10 ft (detect DC 14, disarm DC 13)

## Loot
- A potion of growth
- A potion of hair restoration
- Marlowe's secret: a copy of the unpaid dragon bill from the pantry

## DM notes
Where Marlowe hides his experiments. The ooze is a small boss for a low-level party.
