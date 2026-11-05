---
id: tropelandia.monster.skeleton-clerk
kind: monster
name: Skeleton Clerk
parent: tropelandia
universe: tropelandia
ruleset: omniverse.ruleset.dnd5e
size: medium
type: undead
threat: 14
alignment: lawful neutral
tactics: Processes the party in order of arrival.
lore: 'A skeleton with sleeve-garters. Rank: Filing Clerk, Third Class, for the last four centuries.'
tags:
- undead
- office
summary: A skeleton with sleeve-garters.
dnd5e:
  cr: 0.25
  ac: 13
  hp: 13
  hp_dice: 2d8+4
  speed: 30 ft
  abilities:
    str: 10
    dex: 14
    con: 15
    int: 10
    wis: 10
    cha: 5
  senses: darkvision 60 ft, passive Perception 10
  languages: Common
  traits:
  - name: Undead Nature
    text: Vulnerable to bludgeoning. Immune to poison; cannot be exhausted or poisoned.
  - name: Chain of Command
    text: Will not attack anyone holding a correctly completed form.
  actions:
  - name: Stamp
    text: 'Melee, +4 to hit, reach 5 ft. Hit: 5 (1d6+2) bludgeoning and the target is marked PENDING until the end of its next turn (disadvantage on Charisma checks).'
  - name: File
    text: Pulls a document from the stack; one creature within 10 ft must succeed on a DC 11 Wisdom save or be frightened of paperwork until the end of its next turn.
  xp: 50
---
# Skeleton Clerk

*Medium undead, lawful neutral.* CR 0.25. **AC** 13, **HP** 13 (2d8+4), **Speed** 30 ft.

| STR | DEX | CON | INT | WIS | CHA |
|---|---|---|---|---|---|
| 10 (+0) | 14 (+2) | 15 (+2) | 10 (+0) | 10 (+0) | 5 (-3) |

A skeleton with sleeve-garters. Rank: Filing Clerk, Third Class, for the last four centuries.

## Traits
- **Undead Nature.** Vulnerable to bludgeoning. Immune to poison; cannot be exhausted or poisoned.
- **Chain of Command.** Will not attack anyone holding a correctly completed form.

## Actions
- **Stamp.** Melee, +4 to hit, reach 5 ft. Hit: 5 (1d6+2) bludgeoning and the target is marked PENDING until the end of its next turn (disadvantage on Charisma checks).
- **File.** Pulls a document from the stack; one creature within 10 ft must succeed on a DC 11 Wisdom save or be frightened of paperwork until the end of its next turn.

**Tactics.** Processes the party in order of arrival.
