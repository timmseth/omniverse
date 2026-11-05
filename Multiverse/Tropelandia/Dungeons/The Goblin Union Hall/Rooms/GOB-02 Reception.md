---
id: tropelandia.room.goblin-union-hall.02-reception
kind: room
name: Reception
number: 2
code: GOB-02
parent: tropelandia.dungeon.goblin-union-hall
dungeon: tropelandia.dungeon.goblin-union-hall
universe: tropelandia
light: candlelight
size: 30 x 20 ft
exits:
- dir: n
  to: tropelandia.room.goblin-union-hall.01-the-picket-line
  kind: door
  state: closed
  note: Blocked by pickets
- dir: s
  to: tropelandia.room.goblin-union-hall.05-the-main-floor
  kind: archway
  state: open
  note: ''
- dir: e
  to: tropelandia.room.goblin-union-hall.03-the-break-room
  kind: door
  state: open
  note: ''
- dir: w
  to: tropelandia.room.goblin-union-hall.04-grievance-office
  kind: door
  state: open
  note: ''
read_aloud: A cramped reception carved from the heart of the tree. A goblin receptionist with a pencil behind her ear sits behind a desk labelled 'GRIEVANCES, PLEASE TAKE A NUMBER'. A wall of forms, stamped and filed, shows all the things the goblins want.
features:
- A reception desk
- A wall of forms
- A queue of waiting goblins
encounters:
- name: Receptionist
  monsters:
  - name: Goblin receptionist
    count: 1
    hp: 7
    ac: 15
    attack: pencil +4, 1d4+2
  tactics: She wants the party to fill out Form 27B. Refusing gets a stern lecture.
  treasure: ''
traps: []
puzzles: []
secrets: []
loot: []
dm_notes: 'Social encounter: be polite, be patient, bring forms.'
---
# GOB-02 Reception

> A cramped reception carved from the heart of the tree. A goblin receptionist with a pencil behind her ear sits behind a desk labelled 'GRIEVANCES, PLEASE TAKE A NUMBER'. A wall of forms, stamped and filed, shows all the things the goblins want.

## Exits
- **north** (door, closed): [[GOB-01 The Picket Line|the picket line]] — Blocked by pickets
- **south** (archway, open): [[GOB-05 The Main Floor|the main floor]]
- **east** (door, open): [[GOB-03 The Break Room|the break room]]
- **west** (door, open): [[GOB-04 Grievance Office|grievance office]]

## Features
- A reception desk
- A wall of forms
- A queue of waiting goblins

## Encounters
- **Receptionist**: 1x Goblin receptionist (HP 7, AC 15). She wants the party to fill out Form 27B. Refusing gets a stern lecture.

## DM notes
Social encounter: be polite, be patient, bring forms.
