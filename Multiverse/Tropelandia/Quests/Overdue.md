---
id: tropelandia.quest.overdue
kind: quest
name: Overdue
parent: tropelandia
universe: tropelandia
giver: tropelandia.person.petronella-vask
start: tropelandia.venue.the-scorched-owl
level_range:
- 6
- 8
premise: The Chancellor has not been seen for a year; an illusion attends dinner. Petronella's thesis is in the Restricted Section, defending itself. The Librarian wants silence. The Board wants a permit nobody has.
hooks:
- Petronella pays in scrolls to have her thesis stolen back.
- The Librarian pays in spells for any book returned.
- The Board offers a permit, if the party can find who at the Academy can sign one.
stages:
- name: The gate
  goal: Get past the gargoyles, who read intentions aloud, and into the Academy with or without a permit.
  where: tropelandia.venue.thaumaturgic-academy-gate
  complications:
  - The Union is picketing the quad.
  - The illusion of the Chancellor invites the party to dinner.
  clue: The dinner illusion flickers when the word 'overdue' is said.
- name: The Stacks
  goal: Find the thesis, the Dean and the Librarian in the Restricted Section.
  dungeon: tropelandia.dungeon.restricted-section
  complications:
  - The books fly.
  - The thesis is about Petronella, and it is winning.
  clue: The Librarian is the Chancellor's sister.
- name: The Chancellor
  goal: Find the real Chancellor in the Forbidden Index and decide whether to bring him out.
  dungeon: tropelandia.dungeon.restricted-section
  complications:
  - He does not want to come out.
  - He has found what he was looking for, and it is about the Board's charter.
rewards:
- a spellbook of 3 wizard spells
- Potion of Invisibility
- 'the Academy''s gratitude: identify for life'
- a ratified Licensing Board permit, the only one
on_success: The Chancellor returns, or is formally replaced by his illusion, which everyone prefers. The thesis is graded.
on_failure: The Restricted Section restricts the Academy. Thaumaton's towers close. The Board licenses the books.
factions:
- tropelandia.faction.thaumaturgic-academy
- tropelandia.faction.adventurers-licensing-board
dungeons:
- tropelandia.dungeon.restricted-section
tropes_involved:
- omniverse.trope.wizard-academy
- omniverse.trope.lich
status: sample
author: seth
tags:
- quest
summary: The Chancellor has not been seen for a year; an illusion attends dinner.
---
# Overdue

*Levels 6 to 8. Starts at the scorched owl. Dungeon: [[The Restricted Section]].*

The Chancellor has not been seen for a year; an illusion attends dinner. Petronella's thesis is in the Restricted Section, defending itself. The Librarian wants silence. The Board wants a permit nobody has.

## Hooks
- Petronella pays in scrolls to have her thesis stolen back.
- The Librarian pays in spells for any book returned.
- The Board offers a permit, if the party can find who at the Academy can sign one.

## Stages
1. **The gate.** Get past the gargoyles, who read intentions aloud, and into the Academy with or without a permit. *Clue:* The dinner illusion flickers when the word 'overdue' is said.
2. **The Stacks.** Find the thesis, the Dean and the Librarian in the Restricted Section. *Clue:* The Librarian is the Chancellor's sister.
3. **The Chancellor.** Find the real Chancellor in the Forbidden Index and decide whether to bring him out.

## Rewards
- a spellbook of 3 wizard spells
- Potion of Invisibility
- the Academy's gratitude: identify for life
- a ratified Licensing Board permit, the only one

**On success.** The Chancellor returns, or is formally replaced by his illusion, which everyone prefers. The thesis is graded.

**On failure.** The Restricted Section restricts the Academy. Thaumaton's towers close. The Board licenses the books.
