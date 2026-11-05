---
id: tropelandia.room.cellar-of-rats.07-the-rat-kings-pantry
kind: room
name: The Rat King's Pantry
number: 7
code: RAT-07
parent: tropelandia.dungeon.cellar-of-rats
dungeon: tropelandia.dungeon.cellar-of-rats
universe: tropelandia
light: candles
size: 20 x 20 ft
exits:
- dir: n
  to: tropelandia.room.cellar-of-rats.06-the-warren
  kind: passage
  state: open
  note: ''
read_aloud: A cosy, absurdly furnished chamber lined with stolen thimbles, buttons and one enormous gold ring. At its heart sits the Rat King, a swollen rat in a tiny crown wearing the innkeeper's lost spectacles, upon a throne made of nine years of unpaid bills. It looks up, adjusts the spectacles, and says, in a voice too large for its body, 'You're late.'
features:
- The Throne of Bills
- A hoard of thimbles, buttons and cheese
- The innkeeper's spectacles
encounters:
- name: The Rat King
  monsters:
  - name: Rat King (giant rat, Cunning)
    count: 1
    hp: 22
    ac: 12
    attack: bite +4, 1d6+2
    ref: tropelandia.monster.rat-king
  - name: Giant rat guard
    count: 4
    hp: 7
    ac: 12
    attack: bite +4, 1d4+2
    ref: tropelandia.monster.giant-rat
  tactics: He'd prefer to talk. He wants a lower rent (the inn charges him 1 cheese/day), a place on the inn's council, and the nine-year notice taken down. If attacked, his guards fight to the death; he flees through a hole in the wall.
  treasure: ''
traps: []
puzzles:
- name: The Negotiation
  description: 'The Rat King negotiates: he will leave the cellar if the party gets the innkeeper to meet three demands: a seat at the inn''s table, a cheese tax cut, and the notice removed.'
  solution: Accept his demands (Persuasion DC 12) and report back to the innkeeper (DC 14 to convince him), or defeat him in combat.
  hints:
  - He keeps mentioning 'the notice'.
  - The spectacles are not just for show; he reads the bills.
  - Speaking to him as an equal changes his attitude two steps.
  reward: The inn's gratitude, a free room for a month, and a lasting friendly rat contact.
secrets: []
loot:
- A huge gold ring (worth 60 gp), actually the innkeeper's wife's wedding band
- The spectacles
dm_notes: 'Gentle subversion of Kill Ten Rats: the ten-rat notice is a joke about bureaucracy. A sweet ending is on offer; the party can still choose violence.'
for_quest:
- quest: tropelandia.quest.ten-rats
  when: investigation
  read_aloud: Behind the throne, the bills are sorted by year. The oldest is a receipt for a pie, signed with a paw print. The newest is a formal demand addressed to the Mayor.
  dm_notes: 'The rats'' legal position: nine years of occupancy, rent paid in kind, a landlord who never inspected. The Mayor''s clerk would call it a tenancy. The demand asks for recognition as Local 7.'
  clue: The demand needs the Mayor's seal; stage 3 is at Pettigrew Manor.
---
# RAT-07 The Rat King's Pantry

> A cosy, absurdly furnished chamber lined with stolen thimbles, buttons and one enormous gold ring. At its heart sits the Rat King, a swollen rat in a tiny crown wearing the innkeeper's lost spectacles, upon a throne made of nine years of unpaid bills. It looks up, adjusts the spectacles, and says, in a voice too large for its body, 'You're late.'

## Exits
- **north** (passage, open): [[RAT-06 The Warren|the warren]]

## Features
- The Throne of Bills
- A hoard of thimbles, buttons and cheese
- The innkeeper's spectacles

## Encounters
- **The Rat King**: 1x Rat King (giant rat, Cunning) (HP 22, AC 12), 4x Giant rat guard (HP 7, AC 12). He'd prefer to talk. He wants a lower rent (the inn charges him 1 cheese/day), a place on the inn's council, and the nine-year notice taken down. If attacked, his guards fight to the death; he flees through a hole in the wall.

## Puzzles
- **The Negotiation**: The Rat King negotiates: he will leave the cellar if the party gets the innkeeper to meet three demands: a seat at the inn's table, a cheese tax cut, and the notice removed.

## Loot
- A huge gold ring (worth 60 gp), actually the innkeeper's wife's wedding band
- The spectacles

## DM notes
Gentle subversion of Kill Ten Rats: the ten-rat notice is a joke about bureaucracy. A sweet ending is on offer; the party can still choose violence.
