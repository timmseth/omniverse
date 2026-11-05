---
id: tropelandia.room.sunken-chapel.09-the-belfry
kind: room
name: The Belfry
number: 9
code: CHP-09
parent: tropelandia.dungeon.sunken-chapel
dungeon: tropelandia.dungeon.sunken-chapel
universe: tropelandia
light: windy, moonlit
size: 20 ft diameter
exits:
- dir: d
  to: tropelandia.room.sunken-chapel.03-bell-tower-base
  kind: ladder
  state: open
  note: ''
read_aloud: At the top of the tower the bell hangs, huge and green with age, its clapper tied with a mouldering ribbon. Wind shrieks through the open arches. A pair of gargoyles perch on the rim, perfectly still, and one of them blinks.
features:
- The huge bell
- Two gargoyles
- A view over the entire marsh
encounters:
- name: Gargoyle sentries
  monsters:
  - name: Gargoyle
    count: 2
    hp: 52
    ac: 15
    attack: claws +4, 2d6+2
    ref: tropelandia.monster.gargoyle
  tactics: They attack if the bell is tampered with; they'll let the party ring it if asked politely.
  treasure: ''
traps: []
puzzles: []
secrets: []
loot:
- The Bell itself (worth 500 gp to a church, and more to a cult)
dm_notes: The bell is the quest item; ringing it correctly (three notes) puts the chapel's dead to rest.
---
# CHP-09 The Belfry

> At the top of the tower the bell hangs, huge and green with age, its clapper tied with a mouldering ribbon. Wind shrieks through the open arches. A pair of gargoyles perch on the rim, perfectly still, and one of them blinks.

## Exits
- **down** (ladder, open): [[CHP-03 Bell Tower Base|bell tower base]]

## Features
- The huge bell
- Two gargoyles
- A view over the entire marsh

## Encounters
- **Gargoyle sentries**: 2x Gargoyle (HP 52, AC 15). They attack if the bell is tampered with; they'll let the party ring it if asked politely.

## Loot
- The Bell itself (worth 500 gp to a church, and more to a cult)

## DM notes
The bell is the quest item; ringing it correctly (three notes) puts the chapel's dead to rest.
