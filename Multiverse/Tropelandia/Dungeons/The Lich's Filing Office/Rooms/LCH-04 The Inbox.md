---
id: tropelandia.room.lichs-filing-office.04-the-inbox
kind: room
name: The Inbox
number: 4
code: LCH-04
parent: tropelandia.dungeon.lichs-filing-office
dungeon: tropelandia.dungeon.lichs-filing-office
universe: tropelandia
light: dim
size: 40 x 40 ft
exits:
- dir: s
  to: tropelandia.room.lichs-filing-office.07-appeals
  kind: door
  state: open
  note: ''
- dir: e
  to: tropelandia.room.lichs-filing-office.02-the-waiting-hall
  kind: door
  state: open
  note: ''
read_aloud: 'A mountain of unopened letters fills the room, drifting like snow. A pair of shades sort envelopes with ghostly hands. A sign reads: URGENT. ALSO URGENT. ALSO URGENT. In the middle, a chute marked ''To the Lich'' hums.'
features:
- A mountain of mail
- Sorting shades
- A chute to the Lich
encounters:
- name: Mail wraiths
  monsters:
  - name: Wraith
    count: 2
    hp: 67
    ac: 13
    attack: life drain +6, 4d8
  tactics: They defend the inbox from anyone searching it.
  treasure: ''
traps: []
puzzles: []
secrets: []
loot:
- A letter of credit (400 gp)
- An urgent summons addressed to the party
dm_notes: ''
---
# LCH-04 The Inbox

> A mountain of unopened letters fills the room, drifting like snow. A pair of shades sort envelopes with ghostly hands. A sign reads: URGENT. ALSO URGENT. ALSO URGENT. In the middle, a chute marked 'To the Lich' hums.

## Exits
- **south** (door, open): [[LCH-07 Appeals|appeals]]
- **east** (door, open): [[LCH-02 The Waiting Hall|the waiting hall]]

## Features
- A mountain of mail
- Sorting shades
- A chute to the Lich

## Encounters
- **Mail wraiths**: 2x Wraith (HP 67, AC 13). They defend the inbox from anyone searching it.

## Loot
- A letter of credit (400 gp)
- An urgent summons addressed to the party
