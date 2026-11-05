---
id: tropelandia.venue.pettigrew-manor
kind: venue
name: Pettigrew Manor
parent: tropelandia.settlement.barrowdale
universe: tropelandia
venue_type: manor
keeper: tropelandia.person.mayor-bartholomew-pettigrew
faction: tropelandia.faction.mildew-court
services:
- audiences with the Mayor (Tuesdays)
- rent collection (daily)
- pie-contest entries (annually, 1 sp)
read_aloud: A fine house with a pie-shaped weathervane and a judging table on the lawn with a tower on it.
from:
  year: 112
  era: tropelandia.era.age-of-mild-peril
to: null
for_quest:
- quest: tropelandia.quest.the-rent-is-due
  when: arrival
  read_aloud: The judging table on the lawn has a tower on it. The tower has a FOR LET sign in an upper window that was not there yesterday.
  dm_notes: The tower is advertising for a new tenant. Marlowe is still inside. This is the first sign that the tower, not the Mayor, is the landlord.
  clue: 'The sign gives a contact: ''enquire within''.'
- quest: tropelandia.quest.the-rent-is-due
  when: investigation
  read_aloud: In the Mayor's study, the auditor's letters are in a drawer that does not quite close. The top one is dated next week. The second one is dated last year.
  dm_notes: The Mayor has been hiding the audit for a year. A party that knows this has leverage over him for the rest of the campaign.
  clue: The audit is next week, during the Pie Contest.
- quest: tropelandia.quest.the-rent-is-due
  when: stage
  stage: 3
  read_aloud: The Mayor has moved the judging to the far end of the lawn and is pretending the tower is a decoration.
  dm_notes: 'Stage 3: the contest. The auditor is judging. Whatever the party arranged in the tower pays off here.'
---
# Pettigrew Manor

> A fine house with a pie-shaped weathervane and a judging table on the lawn with a tower on it.

Kept by [[Mayor Bartholomew Pettigrew]] in [[Barrowdale]].
