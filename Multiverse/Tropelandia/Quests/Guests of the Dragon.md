---
id: tropelandia.quest.guests-of-the-dragon
kind: quest
name: Guests of the Dragon
parent: tropelandia
universe: tropelandia
giver: tropelandia.person.caravan-mistress-zafira-dunewright
start: tropelandia.venue.dunewright-exchange
level_range:
- 8
- 10
premise: Glintfang keeps a hoard she calls a portfolio and a hundred guests who used to be heroes. A merchant's daughter accepted her hospitality a year ago. The Caravan-Mistress wants the hoard inventoried for tax. Everyone wants a receipt.
hooks:
- Zafira pays for an inventory, by someone expendable.
- A merchant pays for his daughter's return, or her signature.
- The Board's Dragon Liaison post is vacant again.
stages:
- name: Last Receipt
  goal: Get a licence, a permit, a map and a reason, and walk into the dunes.
  where: tropelandia.settlement.last-receipt
  complications:
  - Bashir's map is wrong on purpose.
  - Pip Ledgerclaw audits the party's intentions.
  clue: Glintfang's guests are listed as assets.
- name: The hoard
  goal: Pass the appraisals, the corridor and the antechamber, and be received by the dragon.
  dungeon: tropelandia.dungeon.glintfang-hoard
  complications:
  - The mirrors bite.
  - The kobolds are unionising.
  clue: The hoard is mostly promissory notes; the gold bought a mountain.
- name: The negotiation
  goal: Negotiate for the daughter, the guests, the inventory or the party's own freedom; or fight a dragon with a head for business.
  dungeon: tropelandia.dungeon.glintfang-hoard
  complications:
  - Glintfang has a counter-offer for everything.
  - The Trust's loan is in the portfolio.
rewards:
- up to 20,000 gp, if the party can carry it and explain it
- Bag of Holding (Slightly Used)
- a share certificate
- the daughter, and a signature
on_success: The guests go home, or stay on better terms. Glintfang Holdings restructures. Water prices fall by a copper.
on_failure: The party are guests. The Board issues their licences posthumously. Bashir pours a drink nobody finishes.
factions:
- tropelandia.faction.glintfang-holdings
- tropelandia.faction.adventurers-licensing-board
dungeons:
- tropelandia.dungeon.glintfang-hoard
tropes_involved:
- omniverse.trope.dragons-hoard
- omniverse.trope.cursed-item
status: sample
author: seth
tags:
- quest
summary: Glintfang keeps a hoard she calls a portfolio and a hundred guests who used to be heroes.
---
# Guests of the Dragon

*Levels 8 to 10. Starts at dunewright exchange. Dungeon: [[Glintfang's Hoard]].*

Glintfang keeps a hoard she calls a portfolio and a hundred guests who used to be heroes. A merchant's daughter accepted her hospitality a year ago. The Caravan-Mistress wants the hoard inventoried for tax. Everyone wants a receipt.

## Hooks
- Zafira pays for an inventory, by someone expendable.
- A merchant pays for his daughter's return, or her signature.
- The Board's Dragon Liaison post is vacant again.

## Stages
1. **Last Receipt.** Get a licence, a permit, a map and a reason, and walk into the dunes. *Clue:* Glintfang's guests are listed as assets.
2. **The hoard.** Pass the appraisals, the corridor and the antechamber, and be received by the dragon. *Clue:* The hoard is mostly promissory notes; the gold bought a mountain.
3. **The negotiation.** Negotiate for the daughter, the guests, the inventory or the party's own freedom; or fight a dragon with a head for business.

## Rewards
- up to 20,000 gp, if the party can carry it and explain it
- Bag of Holding (Slightly Used)
- a share certificate
- the daughter, and a signature

**On success.** The guests go home, or stay on better terms. Glintfang Holdings restructures. Water prices fall by a copper.

**On failure.** The party are guests. The Board issues their licences posthumously. Bashir pours a drink nobody finishes.
