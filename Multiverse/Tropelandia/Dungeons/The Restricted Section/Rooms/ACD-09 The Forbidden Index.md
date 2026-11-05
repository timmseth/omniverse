---
id: tropelandia.room.restricted-section.09-the-forbidden-index
kind: room
name: The Forbidden Index
number: 9
code: ACD-09
parent: tropelandia.dungeon.restricted-section
dungeon: tropelandia.dungeon.restricted-section
universe: tropelandia
light: faint glow
size: 40 ft diameter
exits:
- dir: n
  to: tropelandia.room.restricted-section.05-the-stacks-labyrinth
  kind: passage
  state: open
  note: ''
read_aloud: 'At the heart of the Stacks lies a circular chamber with a single pedestal. Upon it rests a large book chained shut, its cover shifting between a dozen languages. A voice comes from the book: ''Hello. Would you like to read me?'''
features:
- A chained book
- A single pedestal
- 'An inscription: ''ASK, AND BE ANSWERED'''
encounters:
- name: The Forbidden Index
  monsters:
  - name: Living book (aberration)
    count: 1
    hp: 90
    ac: 15
    attack: psychic lash +7, 3d8
    ref: tropelandia.monster.living-book
  tactics: 'It wants a reader; it attacks if refused. It can be bargained with: one answer for one favour.'
  treasure: ''
traps: []
puzzles:
- name: The Reading
  description: The book will answer one question, truthfully, in exchange for a secret of the reader's.
  solution: Offer a true secret (Persuasion DC 15) and ask a precise question.
  hints:
  - It likes true secrets.
  - It hates evasion.
  - Be specific.
  reward: An answer that changes the campaign.
secrets: []
loot:
- Knowledge (the DM's choice of plot reveal)
dm_notes: ''
---
# ACD-09 The Forbidden Index

> At the heart of the Stacks lies a circular chamber with a single pedestal. Upon it rests a large book chained shut, its cover shifting between a dozen languages. A voice comes from the book: 'Hello. Would you like to read me?'

## Exits
- **north** (passage, open): [[ACD-05 The Stacks Labyrinth|the stacks labyrinth]]

## Features
- A chained book
- A single pedestal
- An inscription: 'ASK, AND BE ANSWERED'

## Encounters
- **The Forbidden Index**: 1x Living book (aberration) (HP 90, AC 15). It wants a reader; it attacks if refused. It can be bargained with: one answer for one favour.

## Puzzles
- **The Reading**: The book will answer one question, truthfully, in exchange for a secret of the reader's.

## Loot
- Knowledge (the DM's choice of plot reveal)
