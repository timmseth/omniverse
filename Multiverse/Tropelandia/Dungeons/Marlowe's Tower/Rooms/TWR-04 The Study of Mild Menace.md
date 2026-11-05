---
id: tropelandia.room.marlowes-tower.04-the-study-of-mild-menace
kind: room
name: The Study of Mild Menace
number: 4
code: TWR-04
parent: tropelandia.dungeon.marlowes-tower
dungeon: tropelandia.dungeon.marlowes-tower
universe: tropelandia
light: warm
size: 20 x 15 ft
exits:
- dir: s
  to: tropelandia.room.marlowes-tower.03-the-library
  kind: door
  state: closed
  note: ''
read_aloud: 'A comfortable room dominated by a desk, a stuffed owl and a cluster of trophy-case pies. A framed certificate on the wall reads: WINNER, BARROWDALE PIE CONTEST, 1489 (DISPUTED). A pie sits on the desk, steaming, with a note: DO NOT EAT. IT IS A TRAP. IT IS ALSO DELICIOUS.'
features:
- The disputed trophy cabinet
- A stuffed owl that watches
- The Pie of Mild Menace (a trap)
encounters:
- name: Stuffed owl guardian
  monsters:
  - name: Owl (animated)
    count: 1
    hp: 22
    ac: 13
    attack: talons +4, 1d6+2
    ref: tropelandia.monster.animated-owl
  tactics: Attacks if the pie is stolen or the trophy touched.
  treasure: ''
traps:
- name: The Pie
  trigger: Eating the pie
  effect: DC 14 Con save or 3d6 poison and hiccups for an hour; on a success, advantage on checks for the next hour
  detect_dc: 13
  disarm_dc: 0
puzzles: []
secrets:
- description: 'A false drawer in the desk holds a letter from Dame Rosalind: ''Your pie was good. I hate you.'''
  dc: 14
loot:
- tropelandia.item.the-disputed-pie-trophy
- Marlowe's private recipe for blackberry pie
- A signed IOU from the Mayor
dm_notes: The Pie Contest Incident is a canon event; this study can reflect it. Marlowe's grudges here are nemesis-system fodder.
for_quest:
- quest: tropelandia.quest.the-rent-is-due
  when: investigation
  read_aloud: Among the overdue notices is one that is not from the Mayor. It is addressed to the tower, from the Thaumaturgic Academy, and it is a summons.
  dm_notes: The Academy restricted the tower two centuries ago. It has been 'temporarily' on the Mayor's table for two days because the summons finally arrived and it is thinking about leaving.
  clue: The Union can contest the summons; so can the Mayor, if he wants the tower to stay.
---
# TWR-04 The Study of Mild Menace

> A comfortable room dominated by a desk, a stuffed owl and a cluster of trophy-case pies. A framed certificate on the wall reads: WINNER, BARROWDALE PIE CONTEST, 1489 (DISPUTED). A pie sits on the desk, steaming, with a note: DO NOT EAT. IT IS A TRAP. IT IS ALSO DELICIOUS.

## Exits
- **south** (door, closed): [[TWR-03 The Library|the library]]

## Features
- The disputed trophy cabinet
- A stuffed owl that watches
- The Pie of Mild Menace (a trap)

## Encounters
- **Stuffed owl guardian**: 1x Owl (animated) (HP 22, AC 13). Attacks if the pie is stolen or the trophy touched.

## Traps
- **The Pie**: Eating the pie → DC 14 Con save or 3d6 poison and hiccups for an hour; on a success, advantage on checks for the next hour (detect DC 13, disarm DC 0)

## Secrets
- A false drawer in the desk holds a letter from Dame Rosalind: 'Your pie was good. I hate you.' (DC 14)

## Loot
- The disputed pie trophy (worth 50 gp, worth a lot more to Rosalind)
- Marlowe's private recipe for blackberry pie
- A signed IOU from the Mayor

## DM notes
The Pie Contest Incident is a canon event; this study can reflect it. Marlowe's grudges here are nemesis-system fodder.
