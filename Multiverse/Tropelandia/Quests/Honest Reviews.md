---
id: tropelandia.quest.honest-reviews
kind: quest
name: Honest Reviews
parent: tropelandia
universe: tropelandia
giver: tropelandia.person.marigold-thorne
start: tropelandia.venue.the-laughing-stag
level_range:
- 4
- 6
premise: The Roadside Welcome has never had a bad review, because nobody who would write one has come back. Marigold's sister writes home monthly, and the handwriting is getting worse.
hooks:
- Marigold will pay for proof.
- The Association will pay for an honest review, delivered in person.
- Dr Honeywell wants to know what his sedative is really for.
stages:
- name: The road
  goal: Find the Welcome, which is never where the map says, and check in.
  where: tropelandia.settlement.hearthollow
  complications:
  - The goblins' picket warns the party, in pamphlet form.
  clue: The towels are embroidered with the names of guests.
- name: The inn
  goal: Survive the hospitality, find the guests and reach the Innkeeper's Heart.
  dungeon: tropelandia.dungeon.mimic-inn
  complications:
  - The stew is sedated.
  - The walls regenerate while guests remain.
  clue: Marigold's sister is in the honeymoon suite, and has been for a year.
- name: The review
  goal: Return to Hearthollow with the guests, the Heart or a review, and deal with the Association's second location.
  where: tropelandia.venue.the-laughing-stag
  complications:
  - The Association has bought the Laughing Stag's lease.
  - The Reeve's chair is warm.
rewards:
- 1,000 gp in guests' goods
- The Innkeeper's Heart
- Marigold's eternal tab
- Magic Towel
on_success: The Welcome closes, or is run honestly by its former guests. Hearthollow's inns are inns.
on_failure: The second location opens in Barrowdale, on the Crooked Lane, next to a tower.
factions:
- tropelandia.faction.roadside-hospitality-association
- tropelandia.faction.united-brotherhood-of-goblins-hobs-and-allied-skulkers
dungeons:
- tropelandia.dungeon.mimic-inn
tropes_involved:
- omniverse.trope.mimic
- omniverse.trope.the-tavern-where-it-all-starts
status: sample
author: seth
tags:
- quest
summary: The Roadside Welcome has never had a bad review, because nobody who would write one has come back.
---
# Honest Reviews

*Levels 4 to 6. Starts at the laughing stag. Dungeon: [[Ye Olde Mimic Inn]].*

The Roadside Welcome has never had a bad review, because nobody who would write one has come back. Marigold's sister writes home monthly, and the handwriting is getting worse.

## Hooks
- Marigold will pay for proof.
- The Association will pay for an honest review, delivered in person.
- Dr Honeywell wants to know what his sedative is really for.

## Stages
1. **The road.** Find the Welcome, which is never where the map says, and check in. *Clue:* The towels are embroidered with the names of guests.
2. **The inn.** Survive the hospitality, find the guests and reach the Innkeeper's Heart. *Clue:* Marigold's sister is in the honeymoon suite, and has been for a year.
3. **The review.** Return to Hearthollow with the guests, the Heart or a review, and deal with the Association's second location.

## Rewards
- 1,000 gp in guests' goods
- The Innkeeper's Heart
- Marigold's eternal tab
- Magic Towel

**On success.** The Welcome closes, or is run honestly by its former guests. Hearthollow's inns are inns.

**On failure.** The second location opens in Barrowdale, on the Crooked Lane, next to a tower.
