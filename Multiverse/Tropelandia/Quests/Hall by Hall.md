---
id: tropelandia.quest.hall-by-hall
kind: quest
name: Hall by Hall
parent: tropelandia
universe: tropelandia
giver: tropelandia.person.thane-brunhild-ironbudget
start: tropelandia.venue.ironbudget-hall
level_range:
- 5
- 7
premise: The Trust pays a bounty for every hall of Karak-Dum-Dum reclaimed. The Trust is bankrupt, in debt to a dragon, and three hundred years from asking the only question that matters.
hooks:
- The Thane pays by the hall, in promises.
- Hilde will trade her grandfather's journal for his hammer.
- Oona has a key to the lower doors and is waiting for someone worth it.
stages:
- name: The upper halls
  goal: Reclaim the entrance halls and the brewery; find the journal's hammer.
  dungeon: tropelandia.dungeon.dwarven-folly
  complications:
  - The armour is still on duty.
  - The Last Batch is still fermenting.
  clue: The journal says the miners were invited.
- name: The deep
  goal: Descend past the myconids to the drowned shaft and the Anvil Hall.
  dungeon: tropelandia.dungeon.dwarven-folly
  complications:
  - The sovereign offers tea.
  - The octopus likes the ale.
  clue: The Anvil is cold because nobody asked the question.
- name: The question
  goal: Meet what the miners met, and ask it; or do not, and light the Anvil anyway.
  dungeon: tropelandia.dungeon.dwarven-folly
  complications:
  - The Elder Thing has waited a thousand years for a question.
  - Pennywhistle's loan comes due; a kobold is auditing the mountain.
rewards:
- the Trust's bounty (in promissory notes, redeemable at Glintfang Holdings)
- a weapon forged on the Anvil
- Barrel of the Last Batch
- Hilde's grandfather's hammer, returned
on_success: The Anvil is lit. The Trust's debt is settled or sold. Grudge Night that year is short.
on_failure: The mountain is foreclosed. Glintfang Holdings opens a mine. The kobolds are very polite about it.
factions:
- tropelandia.faction.karak-dum-dum-reclamation-trust
- tropelandia.faction.glintfang-holdings
dungeons:
- tropelandia.dungeon.dwarven-folly
tropes_involved:
- omniverse.trope.ancient-evil-released-by-dumb-adventurers
- omniverse.trope.dwarven-mine
status: sample
author: seth
tags:
- quest
summary: The Trust pays a bounty for every hall of Karak-Dum-Dum reclaimed.
---
# Hall by Hall

*Levels 5 to 7. Starts at ironbudget hall. Dungeon: [[The Dwarven Folly]].*

The Trust pays a bounty for every hall of Karak-Dum-Dum reclaimed. The Trust is bankrupt, in debt to a dragon, and three hundred years from asking the only question that matters.

## Hooks
- The Thane pays by the hall, in promises.
- Hilde will trade her grandfather's journal for his hammer.
- Oona has a key to the lower doors and is waiting for someone worth it.

## Stages
1. **The upper halls.** Reclaim the entrance halls and the brewery; find the journal's hammer. *Clue:* The journal says the miners were invited.
2. **The deep.** Descend past the myconids to the drowned shaft and the Anvil Hall. *Clue:* The Anvil is cold because nobody asked the question.
3. **The question.** Meet what the miners met, and ask it; or do not, and light the Anvil anyway.

## Rewards
- the Trust's bounty (in promissory notes, redeemable at Glintfang Holdings)
- a weapon forged on the Anvil
- Barrel of the Last Batch
- Hilde's grandfather's hammer, returned

**On success.** The Anvil is lit. The Trust's debt is settled or sold. Grudge Night that year is short.

**On failure.** The mountain is foreclosed. Glintfang Holdings opens a mine. The kobolds are very polite about it.
