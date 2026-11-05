---
id: tropelandia.room.guildhall-below.01-the-fishmongers-stall
kind: room
name: The Fishmonger's Stall
number: 1
code: GLD-01
parent: tropelandia.dungeon.guildhall-below
dungeon: tropelandia.dungeon.guildhall-below
universe: tropelandia
light: harbour daylight
size: 15 x 10 ft
exits:
- dir: d
  to: tropelandia.room.guildhall-below.02-the-smelly-cellar
  kind: hatch
  state: closed
  note: 'A false-bottomed barrel; the fishmonger''s password: ''perch'''
- dir: out
  to: outside
  kind: door
  state: open
  note: The market
read_aloud: 'A reeking stall in the Port Pilferage fish market, its counter laden with slick silver fish. A fishmonger in a bloody apron eyes you with practised suspicion and taps a barrel that sounds oddly hollow. A handwritten sign says: FRESH FISH. FRESHER PRICES. NO QUESTIONS.'
features:
- A stall of fish
- A false barrel
- A lookout fishmonger
encounters:
- name: Fishmonger
  monsters:
  - name: Thug
    count: 1
    hp: 32
    ac: 11
    attack: mace +4, 1d6+2
    ref: tropelandia.monster.thug
  tactics: He asks for the password; the wrong one earns a fish to the face.
  treasure: ''
traps: []
puzzles: []
secrets: []
loot:
- A very large fish
dm_notes: The password is learnable from Rosa the street kid or by bribing the fishmonger.
---
# GLD-01 The Fishmonger's Stall

> A reeking stall in the Port Pilferage fish market, its counter laden with slick silver fish. A fishmonger in a bloody apron eyes you with practised suspicion and taps a barrel that sounds oddly hollow. A handwritten sign says: FRESH FISH. FRESHER PRICES. NO QUESTIONS.

## Exits
- **down** (hatch, closed): [[GLD-02 The Smelly Cellar|the smelly cellar]] — A false-bottomed barrel; the fishmonger's password: 'perch'
- **out** (door, open): outside — The market

## Features
- A stall of fish
- A false barrel
- A lookout fishmonger

## Encounters
- **Fishmonger**: 1x Thug (HP 32, AC 11). He asks for the password; the wrong one earns a fish to the face.

## Loot
- A very large fish

## DM notes
The password is learnable from Rosa the street kid or by bribing the fishmonger.
