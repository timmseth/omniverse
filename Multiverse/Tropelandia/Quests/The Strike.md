---
id: tropelandia.quest.the-strike
kind: quest
name: The Strike
parent: tropelandia
universe: tropelandia
giver: tropelandia.person.reeve-tobias-ashgrove
start: tropelandia.venue.reeves-table
level_range:
- 1
- 3
premise: Local 7 of the Brotherhood has walked out over hazard pay and the word 'fodder'. The forest is untidy, the timber is rotting, and the Reeve signed the contract that caused it.
hooks:
- The Reeve will pay to end the strike, either way.
- Grizzle will pay to win it.
- Two shop stewards are informing to the Court, and one of them wants out.
stages:
- name: The picket
  goal: Cross, join or negotiate the picket line at the Hiring Hall.
  where: tropelandia.venue.union-hiring-hall-closed
  complications:
  - The picket has pamphlets and a goat.
  clue: Grizzle sends the party to the Union Hall in the forest to see the demands in writing.
- name: The Union Hall
  goal: Reach the Chief in the hollow oak with an offer, a threat or a membership form.
  dungeon: tropelandia.dungeon.goblin-union-hall
  complications:
  - The strike fund has been spent on mushrooms.
  - The receptionist requires an appointment.
  clue: The Chief's bowler hat has the Court's seal sewn into the lining.
- name: The settlement
  goal: Broker terms between the Reeve, the Brotherhood and whatever the Court's informants are doing.
  where: tropelandia.venue.reeves-table
  complications:
  - The Court's auditor is in town.
  - The Roadside Welcome offers to host the talks.
rewards:
- Union membership card
- the Reeve's gratitude and a logging permit
- a seat at Strike Day
- 450 gp strike fund, if the party is dishonest and quick
on_success: Terms are signed. Goblins reappear on the encounter tables as 'professionals'. The Court loses two informants.
on_failure: The strike spreads to the wizards. Nobody in the Duchy can get a cantrip for a month.
factions:
- tropelandia.faction.united-brotherhood-of-goblins-hobs-and-allied-skulkers
- tropelandia.faction.mildew-court
dungeons:
- tropelandia.dungeon.goblin-union-hall
tropes_involved:
- omniverse.trope.goblins-as-fodder
- omniverse.trope.village-menaced-by-goblins
status: sample
author: seth
tags:
- quest
summary: Local 7 of the Brotherhood has walked out over hazard pay and the word 'fodder'.
---
# The Strike

*Levels 1 to 3. Starts at reeves table. Dungeon: [[The Goblin Union Hall]].*

Local 7 of the Brotherhood has walked out over hazard pay and the word 'fodder'. The forest is untidy, the timber is rotting, and the Reeve signed the contract that caused it.

## Hooks
- The Reeve will pay to end the strike, either way.
- Grizzle will pay to win it.
- Two shop stewards are informing to the Court, and one of them wants out.

## Stages
1. **The picket.** Cross, join or negotiate the picket line at the Hiring Hall. *Clue:* Grizzle sends the party to the Union Hall in the forest to see the demands in writing.
2. **The Union Hall.** Reach the Chief in the hollow oak with an offer, a threat or a membership form. *Clue:* The Chief's bowler hat has the Court's seal sewn into the lining.
3. **The settlement.** Broker terms between the Reeve, the Brotherhood and whatever the Court's informants are doing.

## Rewards
- Union membership card
- the Reeve's gratitude and a logging permit
- a seat at Strike Day
- 450 gp strike fund, if the party is dishonest and quick

**On success.** Terms are signed. Goblins reappear on the encounter tables as 'professionals'. The Court loses two informants.

**On failure.** The strike spreads to the wizards. Nobody in the Duchy can get a cantrip for a month.
