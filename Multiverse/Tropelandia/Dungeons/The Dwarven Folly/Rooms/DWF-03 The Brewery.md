---
id: tropelandia.room.dwarven-folly.03-the-brewery
kind: room
name: The Brewery
number: 3
code: DWF-03
parent: tropelandia.dungeon.dwarven-folly
dungeon: tropelandia.dungeon.dwarven-folly
universe: tropelandia
light: dim
size: 40 x 30 ft
exits:
- dir: w
  to: tropelandia.room.dwarven-folly.02-the-great-hall
  kind: door
  state: open
  note: ''
read_aloud: 'Copper vats the size of cottages loom out of the gloom, their sides green with age. The air is sweet and heavy, and a faint bubbling suggests that some of them are still fermenting. A hand-painted sign says: THE LAST BATCH. DO NOT.'
features:
- Copper vats
- A tap marked 'dwarven spirit'
- A stained notebook of recipes
encounters: []
traps:
- name: Fermentation burst
  trigger: Opening the wrong vat
  effect: 'Foul gas: DC 14 Con save or poisoned for 1 hour'
  detect_dc: 13
  disarm_dc: 12
puzzles: []
secrets: []
loot:
- tropelandia.item.barrel-of-the-last-batch
- The brewmaster's recipe (valuable)
dm_notes: 'The Last Batch is a Cursed Item: whoever drinks it gains Darkvision and Strong Opinions for a day.'
---
# DWF-03 The Brewery

> Copper vats the size of cottages loom out of the gloom, their sides green with age. The air is sweet and heavy, and a faint bubbling suggests that some of them are still fermenting. A hand-painted sign says: THE LAST BATCH. DO NOT.

## Exits
- **west** (door, open): [[DWF-02 The Great Hall|the great hall]]

## Features
- Copper vats
- A tap marked 'dwarven spirit'
- A stained notebook of recipes

## Traps
- **Fermentation burst**: Opening the wrong vat → Foul gas: DC 14 Con save or poisoned for 1 hour (detect DC 13, disarm DC 12)

## Loot
- Barrel of The Last Batch (a mind-bending ale, worth 100 gp to the right dwarf)
- The brewmaster's recipe (valuable)

## DM notes
The Last Batch is a Cursed Item: whoever drinks it gains Darkvision and Strong Opinions for a day.
