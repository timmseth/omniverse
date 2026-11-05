---
id: tropelandia.dungeon.mimic-inn
kind: dungeon
name: Ye Olde Mimic Inn
code: INN
parent: tropelandia.region.whisperwood
universe: tropelandia
ruleset: omniverse.ruleset.dnd5e
level_range:
- 4
- 6
tone: horror comedy
tags:
- mimic
- inn
- roadside
- trap
- lodging
entry: tropelandia.room.mimic-inn.01-the-common-room
author: seth
status: sample
tropes_involved:
- omniverse.trope.mimic
- omniverse.trope.the-tavern-where-it-all-starts
- omniverse.trope.dungeon-with-no-logical-layout
summary: 'The Roadside Welcome is the nicest inn in Whisperwood: clean beds, hot food, cheap rooms, and a landlord who never seems to leave the kitchen. It is also a single enormous mimic, gently digesting guests. The inn is happy to have you; it hasn''t eaten in a week.'
hooks:
- Spend the night at the inn.
- Find the missing merchants.
- Burn the inn down (not recommended).
rumours:
- Nobody's ever checked out of Room 7.
- The soup tastes of regret.
- The inn is warmer than it should be.
wandering:
  die: d6
  entries:
  - '1: The floor warms alarmingly'
  - '2: A door opens by itself'
  - '3: A guest in a nightgown walks past, glassy-eyed'
  - '4: Tentacles retract into the wall'
  - '5: The innkeeper offers a free drink'
  - '6: A distant, satisfied sigh'
home_town: tropelandia.settlement.hearthollow
factions:
- tropelandia.faction.roadside-hospitality-association
quests:
- tropelandia.quest.honest-reviews
---
# Ye Olde Mimic Inn

The Roadside Welcome is the nicest inn in Whisperwood: clean beds, hot food, cheap rooms, and a landlord who never seems to leave the kitchen. It is also a single enormous mimic, gently digesting guests. The inn is happy to have you; it hasn't eaten in a week.

## Hooks
- Spend the night at the inn.
- Find the missing merchants.
- Burn the inn down (not recommended).

## Rumours
- Nobody's ever checked out of Room 7.
- The soup tastes of regret.
- The inn is warmer than it should be.

## Wandering encounters (d6)
- 1: The floor warms alarmingly
- 2: A door opens by itself
- 3: A guest in a nightgown walks past, glassy-eyed
- 4: Tentacles retract into the wall
- 5: The innkeeper offers a free drink
- 6: A distant, satisfied sigh

## Rooms
- [[INN-01 The Common Room|The Common Room]]
- [[INN-02 The Kitchen|The Kitchen]]
- [[INN-03 Upstairs Landing|Upstairs Landing]]
- [[INN-04 The Honeymoon Suite|The Honeymoon Suite]]
- [[INN-05 Room Seven|Room Seven]]
- [[INN-06 The Linen Closet|The Linen Closet]]
- [[INN-07 The Wine Cellar|The Wine Cellar]]
- [[INN-08 The Stomach|The Stomach]]
