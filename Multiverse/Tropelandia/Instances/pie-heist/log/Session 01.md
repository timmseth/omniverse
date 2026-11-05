---
id: pie-heist.session.01
kind: session
parent: pie-heist.campaign
campaign: pie-heist
adventure: steal-the-trophy
session: 1
real_date: 2026-11-04
world_date: { year: 1489, day: 36 }
party: [pie-heist.person.tess-underbough]
events:
  - id: pie-heist.event.s01-e01
    type: recruitment
    where: tropelandia.settlement.barrowdale
    participants: [pie-heist.person.tess-underbough, tropelandia.person.marlowe-the-mildly-menacing]
    severity: 1
    visibility: public
    canon: local
    deltas:
      - { entity: tropelandia.person.marlowe-the-mildly-menacing, field: apprentices, from: [], to: [pie-heist.person.tess-underbough] }
  - id: pie-heist.event.s01-e02
    type: social_conflict
    where: tropelandia.settlement.barrowdale
    participants: [pie-heist.person.tess-underbough, tropelandia.person.dame-rosalind-quickblade]
    severity: 1
    visibility: public
    canon: local
    deltas:
      - { entity: tropelandia.person.dame-rosalind-quickblade, field: "relationships.pie-heist.person.tess-underbough", from: null, to: { type: grudge, strength: 40 } }
rolls:
  - { seed: 8841, what: "Stealth against Rosalind's housekeeper", result: "d20=17 vs DC 15" }
---
# Session 01: The Apprentice Clause

*(Sample log. In play this is narrated by the DM skill.)*

Tess answered the notice nailed to Marlowe's tower ("Apprentice wanted, rent negotiable") and learned that "negotiable" meant "hers". She spent the evening casing Dame Rosalind's house and was spotted by the housekeeper, which Rosalind took personally.

**Hooks left open:** the trophy is still on the mantel, and the Mayor has asked who is paying Marlowe's rent.
