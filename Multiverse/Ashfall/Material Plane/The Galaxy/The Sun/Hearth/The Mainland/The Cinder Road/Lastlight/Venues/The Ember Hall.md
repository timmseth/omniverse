---
id: ashfall.venue.the-ember-hall
kind: venue
name: The Ember Hall
parent: ashfall.settlement.lastlight
universe: ashfall
venue_type: tavern
keeper: ashfall.person.kettle
services:
- hot broth (a coal)
- a place by the fire (two coals)
- salvage bought and sold
rumours:
- Kettle has a Tropelandian coin. It has a tiny signature on it. Kettle does not know what Tropelandia is.
hooks:
- Kettle will pay for an escort to the fourth milestone.
read_aloud: A long hall built against the fire-pit, warm on one side and cold on the other. People sit facing the flames and do not talk much. The currency is coal.
from:
  year: 60
  day: 1
  era: ashfall.era.the-long-dusk
to: null
for_quest:
- quest: ashfall.quest.the-count
  when: arrival
  read_aloud: Kettle is not humming. He is sitting with one boot off, looking at it.
  dm_notes: The paper is in the boot. He has decided to show someone and has not decided whom. If the party is kind to him first, it is them.
  clue: The paper has a number on it, eight digits long.
- quest: ashfall.quest.the-count
  when: investigation
  read_aloud: On the wall behind the bar, where the oil count is chalked each day, the numbers for the last nine days have been rubbed out and written again, smaller each time.
  dm_notes: Vosk has been lowering the public count. The real count is on a slate in the Keep. The gap is three weeks of oil.
  clue: The Warden's Keep has the real slate.
---
# The Ember Hall

> A long hall built against the fire-pit, warm on one side and cold on the other. People sit facing the flames and do not talk much. The currency is coal.

Kept by [[Kettle]] in [[Lastlight]].
