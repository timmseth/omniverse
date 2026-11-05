---
id: ashfall.dungeon.the-cold-vault
kind: dungeon
name: The Cold Vault
code: CVT
parent: ashfall.region.the-cinder-road
universe: ashfall
ruleset: omniverse.ruleset.six-sides
level_range:
- 1
- 3
tone: grim, quiet, cold
tags:
- rift
- undead
- bureaucracy
- two-floors
entry: ashfall.room.the-cold-vault.01-the-door
home_town: ashfall.settlement.lastlight
factions:
- ashfall.faction.the-wardens-of-the-last-light
tropes_involved:
- omniverse.trope.ancient-evil-released-by-dumb-adventurers
- omniverse.trope.lich
summary: A vault in the hillside that the Wardens' oath says must stay shut. It opened at dawn. Inside, the dead of the Road are queueing for something, and the something has a counter, a ledger and a bell.
hooks:
- The Warden pays in oil to learn what opened the Vault.
- Kettle's paper from the dark has a number, and the number is next.
- Brother Ash heard the Flame ask for an appointment.
rumours:
- The dead do not rot in the Vault. They wait.
- There is a light down there that is not fire.
- Someone has written the living's names on stones.
wandering:
  die: d6
  entries:
  - '1: A lamp gutters; difficulty +1 until trimmed'
  - '2: An Ash Walker, standing, facing the warm door'
  - '3: A page turns, somewhere below'
  - '4: A Lamp Thief, already behind you'
  - '5: The NOW SERVING sign ticks up by one. Everyone''s paper is checked.'
  - '6: Nothing. The cold gets into the boots.'
author: seth
status: sample
quests:
- ashfall.quest.the-count
---
# The Cold Vault

A vault in the hillside that the Wardens' oath says must stay shut. It opened at dawn.

Rooms are in `Rooms/`. Entry: [[CVT-01 The Door]]. Home town: [[Lastlight]].

This dungeon is one end of a Reality Rift; the other end is [[The Lich's Filing Office]] in Tropelandia.
