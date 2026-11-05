---
id: tropelandia.room.glintfang-hoard.06-the-hoard
kind: room
name: The Hoard
number: 6
code: DRG-06
parent: tropelandia.dungeon.glintfang-hoard
dungeon: tropelandia.dungeon.glintfang-hoard
universe: tropelandia
light: gold glare
size: 120 x 100 ft
exits:
- dir: n
  to: tropelandia.room.glintfang-hoard.05-gilded-antechamber
  kind: door
  state: open
  note: ''
- dir: e
  to: tropelandia.room.glintfang-hoard.07-treasury-annex
  kind: archway
  state: open
  note: ''
- dir: w
  to: tropelandia.room.glintfang-hoard.08-vault-of-returns
  kind: archway
  state: open
  note: ''
read_aloud: A cathedral-sized cavern, floor-to-ceiling gold, glittering like a sunrise in a coin-shaped sea. A young gold dragon the size of a barn coils atop it, one eye open, ledger floating in front of her. She says, 'Everything in here is for sale. Including you.'
features:
- Coins in drifts
- A floating ledger
- 'Cleverly labelled piles: ''Swords'', ''Crowns'', ''Misc'''
encounters:
- name: Glintfang
  monsters:
  - name: Glintfang (young gold dragon)
    count: 1
    hp: 178
    ac: 18
    attack: bite +10, 2d10+6; fire breath 60 ft, 12d6
  tactics: She fights only if robbed or insulted; she'll offer a trade first. In battle she uses her wings and breath, retreating into the coins.
  treasure: ''
traps:
- name: Coin avalanche
  trigger: Taking coins from the base of a pile
  effect: 'Coins slide: 4d6 bludgeoning, DC 14 Dex halves'
  detect_dc: 14
  disarm_dc: 0
puzzles: []
secrets: []
loot:
- A portfolio of coins, gems and art (up to 20,000 gp if the party can carry it)
dm_notes: ''
---
# DRG-06 The Hoard

> A cathedral-sized cavern, floor-to-ceiling gold, glittering like a sunrise in a coin-shaped sea. A young gold dragon the size of a barn coils atop it, one eye open, ledger floating in front of her. She says, 'Everything in here is for sale. Including you.'

## Exits
- **north** (door, open): [[DRG-05 Gilded Antechamber|gilded antechamber]]
- **east** (archway, open): [[DRG-07 Treasury Annex|treasury annex]]
- **west** (archway, open): [[DRG-08 Vault of Returns|vault of returns]]

## Features
- Coins in drifts
- A floating ledger
- Cleverly labelled piles: 'Swords', 'Crowns', 'Misc'

## Encounters
- **Glintfang**: 1x Glintfang (young gold dragon) (HP 178, AC 18). She fights only if robbed or insulted; she'll offer a trade first. In battle she uses her wings and breath, retreating into the coins.

## Traps
- **Coin avalanche**: Taking coins from the base of a pile → Coins slide: 4d6 bludgeoning, DC 14 Dex halves (detect DC 14, disarm DC 0)

## Loot
- A portfolio of coins, gems and art (up to 20,000 gp if the party can carry it)
