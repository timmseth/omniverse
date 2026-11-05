---
id: tropelandia.quest.pending
kind: quest
name: Pending
parent: tropelandia
universe: tropelandia
giver: tropelandia.person.clerk-felicity-underhill
start: tropelandia.venue.office-of-eternal-records-public-counter
level_range:
- 10
- 12
premise: A widow wants her husband's death certificate misfiled. The Office has a vacancy for a Living Liaison. Lord Vexmort has found immortality easy and paperwork hard, and the backlog is the only thing keeping the prophecy from coming true.
hooks:
- The widow pays in tears and a letter of credit.
- Felicity wants to know what happened to Liaisons one to eleven.
- The Court wants its tax rolls back from the Office.
stages:
- name: The counter
  goal: Take a number. Wait. Find another way in.
  where: tropelandia.venue.office-of-eternal-records-public-counter
  complications:
  - Mortlake is number one and afraid of being called.
  - Osric smuggles files out in coffins.
  clue: The widow's husband is in the queue, three places behind the party.
- name: The Office
  goal: Pass the clerks, the judges and the golem to the Director's floor.
  dungeon: tropelandia.dungeon.lichs-filing-office
  complications:
  - Every exit requires a form.
  - The judges hear appeals forever.
  clue: The phylactery is a filing cabinet, correctly filed.
- name: The Director
  goal: Face Vexmort with a form, a sword or the deed, and decide what the Office is for.
  dungeon: tropelandia.dungeon.lichs-filing-office
  complications:
  - Vexmort would like to retire and cannot.
  - Clearing the backlog fulfils a prophecy.
rewards:
- Vexmort's Quill
- Cloak of Undeath Resistance
- Deed to the Office of Eternal Records
- a death certificate, misfiled, with love
on_success: The backlog moves. The widow's husband comes home, or writes. The Unfiled One is coming, and the Office is ready, or is the party's problem now.
on_failure: The party are processed. Felicity stamps their files 'pending' out of kindness.
factions:
- tropelandia.faction.office-of-eternal-records
- tropelandia.faction.mildew-court
dungeons:
- tropelandia.dungeon.lichs-filing-office
tropes_involved:
- omniverse.trope.lich
- omniverse.trope.dark-lord
status: sample
author: seth
tags:
- quest
summary: A widow wants her husband's death certificate misfiled.
---
# Pending

*Levels 10 to 12. Starts at office of eternal records public counter. Dungeon: [[The Lich's Filing Office]].*

A widow wants her husband's death certificate misfiled. The Office has a vacancy for a Living Liaison. Lord Vexmort has found immortality easy and paperwork hard, and the backlog is the only thing keeping the prophecy from coming true.

## Hooks
- The widow pays in tears and a letter of credit.
- Felicity wants to know what happened to Liaisons one to eleven.
- The Court wants its tax rolls back from the Office.

## Stages
1. **The counter.** Take a number. Wait. Find another way in. *Clue:* The widow's husband is in the queue, three places behind the party.
2. **The Office.** Pass the clerks, the judges and the golem to the Director's floor. *Clue:* The phylactery is a filing cabinet, correctly filed.
3. **The Director.** Face Vexmort with a form, a sword or the deed, and decide what the Office is for.

## Rewards
- Vexmort's Quill
- Cloak of Undeath Resistance
- Deed to the Office of Eternal Records
- a death certificate, misfiled, with love

**On success.** The backlog moves. The widow's husband comes home, or writes. The Unfiled One is coming, and the Office is ready, or is the party's problem now.

**On failure.** The party are processed. Felicity stamps their files 'pending' out of kindness.
