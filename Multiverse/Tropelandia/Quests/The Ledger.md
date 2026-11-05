---
id: tropelandia.quest.the-ledger
kind: quest
name: The Ledger
parent: tropelandia
universe: tropelandia
giver: tropelandia.person.vashti-nine-fingers
start: tropelandia.venue.nine-fingers-pawn-and-loan
level_range:
- 3
- 5
premise: The Society's membership ledger has been stolen by a member. Half the Harbourmaster's watch is in it. Three buyers want it, and the Society would like it back before any of them read page one.
hooks:
- Vashti hires the party, deniably.
- The Harbourmaster hires the party, deniably.
- Granny Scale offers to sell the party the ledger, and then sells them to the Society.
stages:
- name: The market
  goal: Find the Guildhall's front door among the fish stalls and get a token to pass it.
  where: tropelandia.venue.port-pilferage-fish-market
  complications:
  - Cob knows the way and both sides.
  - The entrance exam is a theft.
  clue: The ledger left the Guildhall in a crate of ice.
- name: The Guildhall Below
  goal: Pass the Society's tests, reach the vault and find who has the ledger now.
  dungeon: tropelandia.dungeon.guildhall-below
  complications:
  - The retired assassin would prefer tea.
  - The safes are a joke; the real vault is the pension fund.
  clue: Granny Scale's cleaver has ledger-dust on it.
- name: The sale
  goal: 'Decide who gets the ledger: the Society, the Court, or the sea.'
  where: tropelandia.venue.harbourmasters-office
  complications:
  - Ignatia is in the ledger, on page one.
  - The Court's auditor would pay the most.
rewards:
- Society Ring
- 600 gp and 3 gems from the real vault
- a pension, if the party joins
- the Harbourmaster's debt
on_success: The ledger goes somewhere quiet. Greyharbour's understanding survives.
on_failure: The Court reads the ledger. The Society goes to war with the watch. Fish prices triple.
factions:
- tropelandia.faction.honourable-society-of-independent-acquisitionists
- tropelandia.faction.mildew-court
dungeons:
- tropelandia.dungeon.guildhall-below
tropes_involved:
- omniverse.trope.thieves-guild
- omniverse.trope.the-heist
status: sample
author: seth
tags:
- quest
summary: The Society's membership ledger has been stolen by a member.
---
# The Ledger

*Levels 3 to 5. Starts at nine fingers pawn and loan. Dungeon: [[The Guildhall Below]].*

The Society's membership ledger has been stolen by a member. Half the Harbourmaster's watch is in it. Three buyers want it, and the Society would like it back before any of them read page one.

## Hooks
- Vashti hires the party, deniably.
- The Harbourmaster hires the party, deniably.
- Granny Scale offers to sell the party the ledger, and then sells them to the Society.

## Stages
1. **The market.** Find the Guildhall's front door among the fish stalls and get a token to pass it. *Clue:* The ledger left the Guildhall in a crate of ice.
2. **The Guildhall Below.** Pass the Society's tests, reach the vault and find who has the ledger now. *Clue:* Granny Scale's cleaver has ledger-dust on it.
3. **The sale.** Decide who gets the ledger: the Society, the Court, or the sea.

## Rewards
- Society Ring
- 600 gp and 3 gems from the real vault
- a pension, if the party joins
- the Harbourmaster's debt

**On success.** The ledger goes somewhere quiet. Greyharbour's understanding survives.

**On failure.** The Court reads the ledger. The Society goes to war with the watch. Fish prices triple.
