---
id: tropelandia.room.glintfang-hoard.05-gilded-antechamber
kind: room
name: Gilded Antechamber
number: 5
code: DRG-05
parent: tropelandia.dungeon.glintfang-hoard
dungeon: tropelandia.dungeon.glintfang-hoard
universe: tropelandia
light: golden
size: 40 x 40 ft
exits:
- dir: n
  to: tropelandia.room.glintfang-hoard.02-sandstone-gallery
  kind: archway
  state: open
  note: ''
- dir: s
  to: tropelandia.room.glintfang-hoard.06-the-hoard
  kind: door
  state: open
  note: ''
- dir: e
  to: tropelandia.room.glintfang-hoard.09-servants-quarters
  kind: door
  state: open
  note: ''
read_aloud: A grand antechamber with a ceiling of beaten gold. A great desk stands at the end, where a woman in a tailored robe signs papers with a quill. She looks up, smiles with too many teeth and says, 'You must be the 4,821st. Do take a seat.'
features:
- A golden desk
- Chairs of beaten gold
- A woman in a tailored robe
encounters:
- name: Glintfang in disguise
  monsters:
  - name: Glintfang (humanoid form, mage)
    count: 1
    hp: 40
    ac: 12
    attack: dagger +4, 1d4+2; casts charm, suggestion
    ref: tropelandia.monster.mage
  tactics: She is courteous. She wants a contract, not a fight. If the party attacks, she reveals her true form.
  treasure: ''
traps: []
puzzles:
- name: The Contract
  description: 'Glintfang offers a trade: whatever the party wants, for a fee. The contract has fine print.'
  solution: Read the fine print (Investigation DC 15) to avoid agreeing to indentured service.
  hints:
  - She encourages signing quickly.
  - The clause on page 7 mentions 'exit fees'.
  - A magical reading reveals a hidden clause.
  reward: A favourable trade.
secrets: []
loot: []
dm_notes: 'Dragon''s Hoard played as a negotiation: the dragon is a businesswoman.'
---
# DRG-05 Gilded Antechamber

> A grand antechamber with a ceiling of beaten gold. A great desk stands at the end, where a woman in a tailored robe signs papers with a quill. She looks up, smiles with too many teeth and says, 'You must be the 4,821st. Do take a seat.'

## Exits
- **north** (archway, open): [[DRG-02 Sandstone Gallery|sandstone gallery]]
- **south** (door, open): [[DRG-06 The Hoard|the hoard]]
- **east** (door, open): [[DRG-09 Servants' Quarters|servants quarters]]

## Features
- A golden desk
- Chairs of beaten gold
- A woman in a tailored robe

## Encounters
- **Glintfang in disguise**: 1x Glintfang (humanoid form, mage) (HP 40, AC 12). She is courteous. She wants a contract, not a fight. If the party attacks, she reveals her true form.

## Puzzles
- **The Contract**: Glintfang offers a trade: whatever the party wants, for a fee. The contract has fine print.

## DM notes
Dragon's Hoard played as a negotiation: the dragon is a businesswoman.
