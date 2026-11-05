---
id: ashfall.quest.the-count
kind: quest
name: The Count
parent: ashfall
universe: ashfall
giver: ashfall.person.warden-maren-vosk
start: ashfall.venue.the-wardens-keep
level_range:
- 1
- 3
premise: The Cold Vault opened at dawn. Kettle came out with a coin and a paper and will not say which pocket it is in. The Warden's oil count has been wrong for nine days, and the dead of the Road have started facing the hill.
hooks:
- The Warden pays in oil to learn what opened the Vault.
- Kettle wants an escort and will not say where.
- Brother Ash heard the Flame ask for an appointment.
stages:
- name: The count is wrong
  goal: Learn why the chalked oil count keeps shrinking, and what Kettle brought out of the dark.
  where: ashfall.settlement.lastlight
  complications:
  - Vosk will not lie, but she will not volunteer.
  - Kettle wants to be asked kindly.
  clue: The paper has a queue number; the dead in the Vault hold the same papers.
- name: The Vault
  goal: Go down, past the standing dead, to the shelves and the counter.
  dungeon: ashfall.dungeon.the-cold-vault
  complications:
  - A lamp out means six step forward.
  - The Counting Thing is polite and cannot be refused.
  clue: The warm stones name the living, with dates. Vosk's is first.
- name: The appointment
  goal: Decide what to do with the Warden's date, the Counting Thing, and the door behind it.
  dungeon: ashfall.dungeon.the-cold-vault
  complications:
  - Writing your name in the ledger opens the door and puts you in the queue forever.
  - The Flame has an opinion.
  clue: ''
rewards:
- a year of oil for Lastlight
- The Queue Paper (someone must hold it)
- the Warden's trust
on_success: The dates on the stones are moved, or the counter is closed, or the town knows what is coming and rations honestly. The dead stop facing the hill.
on_failure: Vosk is called. The Keep's slate goes blank. The town learns the real count the hard way.
factions:
- ashfall.faction.the-wardens-of-the-last-light
dungeons:
- ashfall.dungeon.the-cold-vault
tropes_involved:
- omniverse.trope.lich
- omniverse.trope.ancient-evil-released-by-dumb-adventurers
status: sample
author: seth
tags:
- quest
summary: The Cold Vault opened at dawn; the oil count is wrong; the dead are facing the hill.
---
# The Count

*Levels 1 to 3. Starts at the Warden's Keep. Dungeon: [[The Cold Vault]].*

The Cold Vault opened at dawn. Kettle came out with a coin and a paper. The Warden's oil count has been wrong for nine days.

## Stages
1. **The count is wrong.** Learn why the chalked count keeps shrinking, and what Kettle brought out.
2. **The Vault.** Down past the standing dead to the shelves and the counter.
3. **The appointment.** The Warden's date, the Counting Thing, the door.
