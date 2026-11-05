---
id: tropelandia.monster.dwarven-revenant
kind: monster
name: Dwarven Revenant
parent: tropelandia
universe: tropelandia
ruleset: omniverse.ruleset.dnd5e
size: medium
type: undead
threat: 33
alignment: neutral
tactics: Will not fight anyone who can prove descent from Karak-Dum-Dum. Will fight everyone else twice.
lore: A miner who did not dig too deep, and wants that known.
tags:
- undead
- dwarf
summary: A miner who did not dig too deep, and wants that known..
dnd5e:
  cr: 5
  ac: 16
  hp: 60
  hp_dice: 8d8+24
  speed: 30 ft
  abilities:
    str: 18
    dex: 14
    con: 18
    int: 13
    wis: 16
    cha: 18
  senses: darkvision 60 ft, passive Perception 13
  languages: Dwarvish, Common
  traits:
  - name: Regeneration
    text: Regains 10 hit points at the start of its turn; if it takes fire or radiant damage this does not function at the start of its next turn.
  - name: Rejuvenation
    text: Returns in 24 hours unless its grudge is settled.
  - name: Grudge
    text: Knows the direction and distance to the object of its grudge.
  actions:
  - name: Multiattack
    text: Two greataxe attacks.
  - name: Greataxe
    text: 'Melee, +6 to hit, reach 5 ft. Hit: 10 (1d12+4) slashing.'
  - name: Vengeful Glare
    text: One creature within 30 ft that the revenant can see must succeed on a DC 15 Wisdom save or be paralysed until the revenant deals damage to it or the end of its next turn.
  xp: 1800
---
# Dwarven Revenant

*Medium undead, neutral.* CR 5. **AC** 16, **HP** 60 (8d8+24), **Speed** 30 ft.

| STR | DEX | CON | INT | WIS | CHA |
|---|---|---|---|---|---|
| 18 (+4) | 14 (+2) | 18 (+4) | 13 (+1) | 16 (+3) | 18 (+4) |

A miner who did not dig too deep, and wants that known.

## Traits
- **Regeneration.** Regains 10 hit points at the start of its turn; if it takes fire or radiant damage this does not function at the start of its next turn.
- **Rejuvenation.** Returns in 24 hours unless its grudge is settled.
- **Grudge.** Knows the direction and distance to the object of its grudge.

## Actions
- **Multiattack.** Two greataxe attacks.
- **Greataxe.** Melee, +6 to hit, reach 5 ft. Hit: 10 (1d12+4) slashing.
- **Vengeful Glare.** One creature within 30 ft that the revenant can see must succeed on a DC 15 Wisdom save or be paralysed until the revenant deals damage to it or the end of its next turn.

**Tactics.** Will not fight anyone who can prove descent from Karak-Dum-Dum. Will fight everyone else twice.
