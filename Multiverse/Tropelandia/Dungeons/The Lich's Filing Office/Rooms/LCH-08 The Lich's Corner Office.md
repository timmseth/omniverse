---
id: tropelandia.room.lichs-filing-office.08-the-lichs-corner-office
kind: room
name: The Lich's Corner Office
number: 8
code: LCH-08
parent: tropelandia.dungeon.lichs-filing-office
dungeon: tropelandia.dungeon.lichs-filing-office
universe: tropelandia
light: starlight
size: 60 x 50 ft
exits:
- dir: n
  to: tropelandia.room.lichs-filing-office.05-the-records-hall
  kind: door
  state: locked
  note: Locked by the Lich's seal
read_aloud: A vast corner office with a wall of windows that look onto a sea of stars. An obsidian desk dominates the room, behind it a tall skeletal figure in an immaculate robe, quill in hand. He does not look up. 'I've been expecting you. You are twelve minutes late. I trust you have filed the appropriate forms.'
features:
- An obsidian desk
- A wall of windows onto stars
- A stack of forms
encounters:
- name: Lord Vexmort
  monsters:
  - name: Lich (Lord Vexmort)
    count: 1
    hp: 135
    ac: 17
    attack: 'paralysing touch +12, 3d6 cold; spells: power word kill, disintegrate, counterspell'
    ref: tropelandia.monster.lich
  tactics: 'He fights if the party attacks, or tries to take the phylactery. He first offers them a form and a deal: sign here, and live forever, in the Office.'
  treasure: ''
traps: []
puzzles:
- name: The Deal
  description: Lord Vexmort offers the party eternal jobs in the Office. The contract is a trap.
  solution: Read the fine print (Investigation DC 17), or destroy the phylactery first.
  hints:
  - He keeps pushing a pen.
  - The contract names the signatory's soul.
  - His phylactery is in the vault.
  reward: Free from the contract, and the Lich is weakened.
secrets: []
loot:
- tropelandia.item.vexmorts-quill
- tropelandia.item.cloak-of-undeath-resistance
- tropelandia.item.deed-to-the-office-of-eternal-records
dm_notes: 'Lich played as a bureaucrat: the final boss is a paperwork fight. The phylactery makes it mechanical.'
---
# LCH-08 The Lich's Corner Office

> A vast corner office with a wall of windows that look onto a sea of stars. An obsidian desk dominates the room, behind it a tall skeletal figure in an immaculate robe, quill in hand. He does not look up. 'I've been expecting you. You are twelve minutes late. I trust you have filed the appropriate forms.'

## Exits
- **north** (door, locked): [[LCH-05 The Records Hall|the records hall]] — Locked by the Lich's seal

## Features
- An obsidian desk
- A wall of windows onto stars
- A stack of forms

## Encounters
- **Lord Vexmort**: 1x Lich (Lord Vexmort) (HP 135, AC 17). He fights if the party attacks, or tries to take the phylactery. He first offers them a form and a deal: sign here, and live forever, in the Office.

## Puzzles
- **The Deal**: Lord Vexmort offers the party eternal jobs in the Office. The contract is a trap.

## Loot
- The Lich's quill (writes any contract)
- A cloak of undeath resistance
- The deed to the Office of Eternal Records

## DM notes
Lich played as a bureaucrat: the final boss is a paperwork fight. The phylactery makes it mechanical.
