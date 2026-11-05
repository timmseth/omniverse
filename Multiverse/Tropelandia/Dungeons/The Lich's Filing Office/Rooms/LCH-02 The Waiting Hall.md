---
id: tropelandia.room.lichs-filing-office.02-the-waiting-hall
kind: room
name: The Waiting Hall
number: 2
code: LCH-02
parent: tropelandia.dungeon.lichs-filing-office
dungeon: tropelandia.dungeon.lichs-filing-office
universe: tropelandia
light: dim
size: 100 x 60 ft
exits:
- dir: n
  to: tropelandia.room.lichs-filing-office.01-reception
  kind: archway
  state: open
  note: ''
- dir: s
  to: tropelandia.room.lichs-filing-office.05-the-records-hall
  kind: archway
  state: open
  note: ''
- dir: e
  to: tropelandia.room.lichs-filing-office.03-the-forms-desk
  kind: door
  state: open
  note: ''
- dir: w
  to: tropelandia.room.lichs-filing-office.04-the-inbox
  kind: door
  state: open
  note: ''
read_aloud: 'A vast hall of benches stretches into the dark, where hundreds of ghostly petitioners wait in silence, clutching forms. A distant clock ticks, and the hands do not move. A sign says: YOUR CALL IS IMPORTANT TO US.'
features:
- Endless benches
- Ghostly petitioners
- A clock that doesn't move
encounters:
- name: Ghost queue
  monsters:
  - name: Ghost
    count: 4
    hp: 45
    ac: 11
    attack: withering touch +5, 4d6 (only if line-cutters)
  tactics: They attack anyone who skips the queue.
  treasure: ''
traps: []
puzzles: []
secrets: []
loot: []
dm_notes: Queue-cutting is the way to start a fight. Politeness is the way to avoid it.
---
# LCH-02 The Waiting Hall

> A vast hall of benches stretches into the dark, where hundreds of ghostly petitioners wait in silence, clutching forms. A distant clock ticks, and the hands do not move. A sign says: YOUR CALL IS IMPORTANT TO US.

## Exits
- **north** (archway, open): [[LCH-01 Reception|reception]]
- **south** (archway, open): [[LCH-05 The Records Hall|the records hall]]
- **east** (door, open): [[LCH-03 The Forms Desk|the forms desk]]
- **west** (door, open): [[LCH-04 The Inbox|the inbox]]

## Features
- Endless benches
- Ghostly petitioners
- A clock that doesn't move

## Encounters
- **Ghost queue**: 4x Ghost (HP 45, AC 11). They attack anyone who skips the queue.

## DM notes
Queue-cutting is the way to start a fight. Politeness is the way to avoid it.
