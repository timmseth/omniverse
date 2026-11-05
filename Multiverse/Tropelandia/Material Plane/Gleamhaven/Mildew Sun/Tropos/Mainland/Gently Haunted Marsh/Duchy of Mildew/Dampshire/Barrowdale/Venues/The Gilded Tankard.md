---
id: tropelandia.venue.the-gilded-tankard
kind: venue
name: The Gilded Tankard
parent: tropelandia.settlement.barrowdale
universe: tropelandia
venue_type: inn
keeper: tropelandia.person.barnaby-stoutwhistle
services:
- pie (2 cp)
- ale (1 cp)
- a room (4 sp)
- 'a job: ten rats, two silver (permanent)'
rumours:
- Barnaby has not been in the cellar for nine years. He says it is damp. The rats say otherwise.
hooks:
- Ten rats. Two silver pieces. The job that starts every career in Barrowdale.
read_aloud: A warm, low-beamed inn with a fire, a pie counter, and a job notice so old it has become a decoration. A trapdoor behind the bar has a chair on it.
from:
  year: 112
  era: tropelandia.era.age-of-mild-peril
to: null
for_quest:
- quest: tropelandia.quest.ten-rats
  when: arrival
  read_aloud: The job notice is where it has always been, but tonight someone has pinned a second, much smaller notice beneath it, in a hand no bigger than a grain of rice.
  dm_notes: 'The rats'' counter-notice: TERMS AVAILABLE ON REQUEST. Barnaby has not noticed. If a player reads it, the Rat King knows their name by the time they reach the cellar.'
  clue: The trapdoor behind the bar has a chair on it.
- quest: tropelandia.quest.ten-rats
  when: investigation
  read_aloud: Under the bar, the floorboards are worn into a path that leads from the trapdoor to the pie counter and back. The path is a hand's width across.
  dm_notes: Nine years of rat traffic. The rats have been eating the pies and leaving the money; Barnaby's accounts balance, which is why he has never looked.
  clue: Barnaby's spectacles went down there with the first pie.
- quest: tropelandia.quest.ten-rats
  when: stage
  stage: 3
  read_aloud: Barnaby is polishing the same tankard he was polishing an hour ago. He does not ask how it went. He asks whether anyone saw a pair of spectacles.
  dm_notes: 'Stage 3: the party has the rats'' claim. Barnaby will concede anything to get his spectacles back, including a tenancy agreement he cannot read.'
---
# The Gilded Tankard

> A warm, low-beamed inn with a fire, a pie counter, and a job notice so old it has become a decoration. A trapdoor behind the bar has a chair on it.

Kept by [[Barnaby Stoutwhistle]] in [[Barrowdale]].
