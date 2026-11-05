---
id: tropelandia.quest.ten-rats
kind: quest
name: Ten Rats
parent: tropelandia
universe: tropelandia
giver: tropelandia.person.barnaby-stoutwhistle
start: tropelandia.venue.the-gilded-tankard
level_range:
- 1
- 2
premise: 'The Gilded Tankard''s job notice has been up for nine years: ten rats, two silver. The rats have read it. They have a king, a sommelier, a legal position and the innkeeper''s spectacles.'
hooks:
- Barnaby offers the job to anyone who sits down.
- The Mayor wants the cellar quiet before the Duke's auditor arrives.
- The rats send a tiny notice up through the floorboards, addressed to the party.
stages:
- name: Take the job
  goal: Accept Barnaby's two silver and get the chair moved off the trapdoor.
  where: tropelandia.venue.the-gilded-tankard
  complications:
  - Barnaby will not go down. Barnaby will not say why.
  clue: The trapdoor has been locked from below.
- name: The cellar
  goal: Clear, parley with or outwit the rats and reach the Rat King's throne.
  dungeon: tropelandia.dungeon.cellar-of-rats
  complications:
  - The rats have a union card.
  - The Sommelier guards the one bottle Barnaby actually wants.
  clue: The Rat King's throne is made of nine years of unpaid bills, in the innkeeper's name.
- name: The ruling
  goal: Bring the rats' claim, or the rats, to the Mayor, who must rule on whether ten rats were ever delivered.
  where: tropelandia.venue.pettigrew-manor
  complications:
  - The Mayor has his own cellar.
  - Dame Rosalind has already licensed herself for the job.
  clue: Barnaby's spectacles are on the Rat King's head.
rewards:
- 2 sp (as advertised)
- 'Barnaby''s gratitude: free pie for life'
- the Rat King's favour, or his grudge
- 35 gp from the strongbox, if the party finds it
on_success: The rats and the Tankard reach terms (rent, or eviction, or a tenancy agreement). Barrowdale's first adventuring party is known by name, and the Licensing Board sends a form.
on_failure: The rats annex the ground floor. Barnaby opens a stall in the square. The job notice goes up on the stall.
factions:
- tropelandia.faction.mildew-court
dungeons:
- tropelandia.dungeon.cellar-of-rats
tropes_involved:
- omniverse.trope.kill-ten-rats
- omniverse.trope.the-tavern-where-it-all-starts
status: sample
author: seth
tags:
- quest
summary: 'The Gilded Tankard''s job notice has been up for nine years: ten rats, two silver.'
---
# Ten Rats

*Levels 1 to 2. Starts at the gilded tankard. Dungeon: [[The Cellar of Rats]].*

The Gilded Tankard's job notice has been up for nine years: ten rats, two silver. The rats have read it. They have a king, a sommelier, a legal position and the innkeeper's spectacles.

## Hooks
- Barnaby offers the job to anyone who sits down.
- The Mayor wants the cellar quiet before the Duke's auditor arrives.
- The rats send a tiny notice up through the floorboards, addressed to the party.

## Stages
1. **Take the job.** Accept Barnaby's two silver and get the chair moved off the trapdoor. *Clue:* The trapdoor has been locked from below.
2. **The cellar.** Clear, parley with or outwit the rats and reach the Rat King's throne. *Clue:* The Rat King's throne is made of nine years of unpaid bills, in the innkeeper's name.
3. **The ruling.** Bring the rats' claim, or the rats, to the Mayor, who must rule on whether ten rats were ever delivered. *Clue:* Barnaby's spectacles are on the Rat King's head.

## Rewards
- 2 sp (as advertised)
- Barnaby's gratitude: free pie for life
- the Rat King's favour, or his grudge
- 35 gp from the strongbox, if the party finds it

**On success.** The rats and the Tankard reach terms (rent, or eviction, or a tenancy agreement). Barrowdale's first adventuring party is known by name, and the Licensing Board sends a form.

**On failure.** The rats annex the ground floor. Barnaby opens a stall in the square. The job notice goes up on the stall.
