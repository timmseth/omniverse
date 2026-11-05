---
id: tropelandia.room.lichs-filing-office.01-reception
kind: room
name: Reception
number: 1
code: LCH-01
parent: tropelandia.dungeon.lichs-filing-office
dungeon: tropelandia.dungeon.lichs-filing-office
universe: tropelandia
light: cold blue
size: 40 x 30 ft
exits:
- dir: s
  to: tropelandia.room.lichs-filing-office.02-the-waiting-hall
  kind: archway
  state: open
  note: ''
- dir: out
  to: outside
  kind: door
  state: open
  note: The cavern road
read_aloud: 'A black marble foyer with a desk the size of a coffin. A skeleton in a neat cravat looks up from a ledger. ''Welcome to the Office of Eternal Records,'' it says. ''Do you have an appointment? Do you have a death certificate? Please take a number.'' A glowing sign reads: NOW SERVING 9,114,203.'
features:
- A coffin-sized desk
- A skeleton receptionist
- A ticket dispenser
encounters:
- name: Receptionist
  monsters:
  - name: Skeleton clerk
    count: 1
    hp: 13
    ac: 13
    attack: stamp +4, 1d6+2
    ref: tropelandia.monster.skeleton-clerk
  tactics: It insists on forms. It can be bribed with a stamp.
  treasure: ''
traps: []
puzzles: []
secrets: []
loot:
- A ticket stub (number 9,114,204)
dm_notes: ''
---
# LCH-01 Reception

> A black marble foyer with a desk the size of a coffin. A skeleton in a neat cravat looks up from a ledger. 'Welcome to the Office of Eternal Records,' it says. 'Do you have an appointment? Do you have a death certificate? Please take a number.' A glowing sign reads: NOW SERVING 9,114,203.

## Exits
- **south** (archway, open): [[LCH-02 The Waiting Hall|the waiting hall]]
- **out** (door, open): outside — The cavern road

## Features
- A coffin-sized desk
- A skeleton receptionist
- A ticket dispenser

## Encounters
- **Receptionist**: 1x Skeleton clerk (HP 13, AC 13). It insists on forms. It can be bribed with a stamp.

## Loot
- A ticket stub (number 9,114,204)
