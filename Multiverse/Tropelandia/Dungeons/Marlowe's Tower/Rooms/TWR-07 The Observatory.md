---
id: tropelandia.room.marlowes-tower.07-the-observatory
kind: room
name: The Observatory
number: 7
code: TWR-07
parent: tropelandia.dungeon.marlowes-tower
dungeon: tropelandia.dungeon.marlowes-tower
universe: tropelandia
light: starlight and lanterns
size: 30 ft diameter
exits:
- dir: d
  to: tropelandia.room.marlowes-tower.05-apprentices-quarters
  kind: stairs
  state: open
  note: ''
read_aloud: The top of the tower opens into a round glass-domed room full of brass telescopes and star charts. A grand desk occupies the centre, where Marlowe the Mildly Menacing sits wearing a pointed hat and an expression of tragic dignity. He looks up, sighs, and says, 'It's about the rent, isn't it.'
features:
- A brass orrery that predicts rent due dates
- The Wizard's Desk
- An unpaid rent notice nailed to the telescope
encounters:
- name: Marlowe
  monsters:
  - name: Marlowe the Mildly Menacing (mage)
    count: 1
    hp: 40
    ac: 12
    attack: 'firebolt +6, 2d10; spells: fireball, counterspell, misty step'
    ref: tropelandia.monster.mage
  tactics: He fights only if the party attempts to take the tower's key artefact, or insults his pie. Prefers a bribe, a reasonable rent plan, or a good apprentice.
  treasure: ''
traps: []
puzzles:
- name: The Rent Problem
  description: Marlowe will help the party if they solve his rent problem. He owes 3 months to the Mayor.
  solution: Find 90 gp (via the strongbox in the cellar, the trophy, or by negotiating with the Mayor).
  hints:
  - He keeps looking at the orrery.
  - The Mayor wants a favour more than money.
  - The trophy might fetch a price from Rosalind.
  reward: A powerful ally, a scroll of choice, and a nemesis grudge softened.
secrets: []
loot:
- tropelandia.item.wand-of-mild-magic-missiles
- tropelandia.item.marlowes-pointed-hat
dm_notes: 'Marlowe is a Wizard in a Tower, played straight: sympathetic, trapped by money. His grudge with Rosalind is nemesis-system material.'
---
# TWR-07 The Observatory

> The top of the tower opens into a round glass-domed room full of brass telescopes and star charts. A grand desk occupies the centre, where Marlowe the Mildly Menacing sits wearing a pointed hat and an expression of tragic dignity. He looks up, sighs, and says, 'It's about the rent, isn't it.'

## Exits
- **down** (stairs, open): [[TWR-05 Apprentice's Quarters|apprentices quarters]]

## Features
- A brass orrery that predicts rent due dates
- The Wizard's Desk
- An unpaid rent notice nailed to the telescope

## Encounters
- **Marlowe**: 1x Marlowe the Mildly Menacing (mage) (HP 40, AC 12). He fights only if the party attempts to take the tower's key artefact, or insults his pie. Prefers a bribe, a reasonable rent plan, or a good apprentice.

## Puzzles
- **The Rent Problem**: Marlowe will help the party if they solve his rent problem. He owes 3 months to the Mayor.

## Loot
- A wand of mild magic missiles
- Marlowe's pointed hat (cursed: you cannot take it off, and people think you're funnier)

## DM notes
Marlowe is a Wizard in a Tower, played straight: sympathetic, trapped by money. His grudge with Rosalind is nemesis-system material.
