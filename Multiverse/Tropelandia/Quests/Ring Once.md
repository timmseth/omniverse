---
id: tropelandia.quest.ring-once
kind: quest
name: Ring Once
parent: tropelandia
universe: tropelandia
giver: tropelandia.person.abbess-prudence-dimly
start: tropelandia.venue.shrine-of-the-damp-lady
level_range:
- 2
- 4
premise: The Sunken Chapel's bell rang twice. Once is a vigil; twice is an emergency; and Father Mildred has been dead for nine hundred years and has a great deal to say about the mortgage.
hooks:
- The Abbess will pay in silver and blessings to have the bell explained.
- Wendeline wants her hymnals back.
- A pilgrim came back without his shadow.
stages:
- name: Into the marsh
  goal: Find the chapel through the fog; the bells of Soggy Bottom are the map.
  where: tropelandia.settlement.soggy-bottom
  complications:
  - Fog, with opinions.
  - The giant frog has been fed.
  clue: The chapel's bell answers the village's at midnight.
- name: The chapel
  goal: Descend through the sunken nave to the reliquary and Father Mildred.
  dungeon: tropelandia.dungeon.sunken-chapel
  complications:
  - The dead are polite until the vestry is touched.
  - The Bone Key is Mildred's own finger.
  clue: 'Mildred''s second ring was for the Abbess: the mortgage is due.'
- name: The mortgage
  goal: Take the Chapel's deed, or its debt, to the Court, or settle it with the Damp Lady.
  where: tropelandia.venue.pettigrew-manor
  complications:
  - The Court wants the Chapel's land.
  - The Office of Eternal Records has a competing claim on the dead.
rewards:
- The Saint's Silver Bell
- the Abbess's blessing (a permanent bless once per day)
- 100 gp in ancient coin
- the frog's friendship
on_success: The bell rings once again. The Chapel stops sinking, or sinks the rest of the way with everyone's consent.
on_failure: The bell rings three times. The marsh takes the village's boardwalks for the mortgage.
factions:
- tropelandia.faction.church-of-the-reasonably-benevolent
- tropelandia.faction.mildew-court
dungeons:
- tropelandia.dungeon.sunken-chapel
tropes_involved:
- omniverse.trope.resurrection-at-the-temple
- omniverse.trope.ancient-prophecy
status: sample
author: seth
tags:
- quest
summary: The Sunken Chapel's bell rang twice.
---
# Ring Once

*Levels 2 to 4. Starts at shrine of the damp lady. Dungeon: [[The Sunken Chapel of Mild Dread]].*

The Sunken Chapel's bell rang twice. Once is a vigil; twice is an emergency; and Father Mildred has been dead for nine hundred years and has a great deal to say about the mortgage.

## Hooks
- The Abbess will pay in silver and blessings to have the bell explained.
- Wendeline wants her hymnals back.
- A pilgrim came back without his shadow.

## Stages
1. **Into the marsh.** Find the chapel through the fog; the bells of Soggy Bottom are the map. *Clue:* The chapel's bell answers the village's at midnight.
2. **The chapel.** Descend through the sunken nave to the reliquary and Father Mildred. *Clue:* Mildred's second ring was for the Abbess: the mortgage is due.
3. **The mortgage.** Take the Chapel's deed, or its debt, to the Court, or settle it with the Damp Lady.

## Rewards
- The Saint's Silver Bell
- the Abbess's blessing (a permanent bless once per day)
- 100 gp in ancient coin
- the frog's friendship

**On success.** The bell rings once again. The Chapel stops sinking, or sinks the rest of the way with everyone's consent.

**On failure.** The bell rings three times. The marsh takes the village's boardwalks for the mortgage.
