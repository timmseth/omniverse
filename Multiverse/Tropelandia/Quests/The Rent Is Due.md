---
id: tropelandia.quest.the-rent-is-due
kind: quest
name: The Rent Is Due
parent: tropelandia
universe: tropelandia
giver: tropelandia.person.grand-steward-ophelia-grimsbane
start: tropelandia.venue.pettigrew-manor
level_range:
- 2
- 4
premise: Marlowe's tower has sat on the Mayor's judging table since the Pie Contest Incident. The rent is three months late, the Union says eviction is illegal, the Mayor says the tower is illegal, and the tower has started packing.
hooks:
- The Union hires the party to stop the eviction.
- The Mayor hires the party to remove the tower.
- Dame Rosalind hires the party to get the trophy back from inside it.
stages:
- name: The landlord and the tenant
  goal: Hear both sides, from the Mayor at the Manor and from Marlowe, who is inside and cannot find the door.
  where: tropelandia.venue.pettigrew-manor
  complications:
  - Rosalind is already on the lawn with a licence.
  clue: The tower's door opens for anyone carrying a rent receipt.
- name: Up the tower
  goal: Climb the tower, deal with the household and reach the study.
  dungeon: tropelandia.dungeon.marlowes-tower
  complications:
  - The broom is unionised.
  - The slime vat is behind on its feed.
  clue: Marlowe's receipts are made out to the tower, not from it.
- name: The pie contest
  goal: Settle the matter at the pie contest, where the Duke's auditor is judging.
  where: tropelandia.venue.pettigrew-manor
  complications:
  - The trophy is disputed three ways.
  - The tower is sentient and would like a say.
rewards:
- Marlowe's gratitude, which is a spell
- a Union favour
- the disputed pie trophy
- Robe of Rent Receipts, if Marlowe loses
on_success: The tower is rehoused, or the Mayor is, or the tower is declared a tenant and starts paying. The Pie Contest is held and somebody wins.
on_failure: The tower leaves, with Marlowe inside, and the judging table with it. The contest is cancelled. Rosalind has not forgiven anyone.
factions:
- tropelandia.faction.wizards-union-local-7
- tropelandia.faction.mildew-court
dungeons:
- tropelandia.dungeon.marlowes-tower
tropes_involved:
- omniverse.trope.wizard-in-a-tower
- omniverse.trope.rival-adventurers
status: sample
author: seth
tags:
- quest
summary: Marlowe's tower has sat on the Mayor's judging table since the Pie Contest Incident.
---
# The Rent Is Due

*Levels 2 to 4. Starts at pettigrew manor. Dungeon: [[Marlowe's Tower]].*

Marlowe's tower has sat on the Mayor's judging table since the Pie Contest Incident. The rent is three months late, the Union says eviction is illegal, the Mayor says the tower is illegal, and the tower has started packing.

## Hooks
- The Union hires the party to stop the eviction.
- The Mayor hires the party to remove the tower.
- Dame Rosalind hires the party to get the trophy back from inside it.

## Stages
1. **The landlord and the tenant.** Hear both sides, from the Mayor at the Manor and from Marlowe, who is inside and cannot find the door. *Clue:* The tower's door opens for anyone carrying a rent receipt.
2. **Up the tower.** Climb the tower, deal with the household and reach the study. *Clue:* Marlowe's receipts are made out to the tower, not from it.
3. **The pie contest.** Settle the matter at the pie contest, where the Duke's auditor is judging.

## Rewards
- Marlowe's gratitude, which is a spell
- a Union favour
- the disputed pie trophy
- Robe of Rent Receipts, if Marlowe loses

**On success.** The tower is rehoused, or the Mayor is, or the tower is declared a tenant and starts paying. The Pie Contest is held and somebody wins.

**On failure.** The tower leaves, with Marlowe inside, and the judging table with it. The contest is cancelled. Rosalind has not forgiven anyone.
