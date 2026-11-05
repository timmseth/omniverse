---
id: tropelandia.room.lichs-filing-office.03-the-forms-desk
kind: room
name: The Forms Desk
number: 3
code: LCH-03
parent: tropelandia.dungeon.lichs-filing-office
dungeon: tropelandia.dungeon.lichs-filing-office
universe: tropelandia
light: green lamp
size: 30 x 25 ft
exits:
- dir: s
  to: tropelandia.room.lichs-filing-office.06-phylactery-storage
  kind: door
  state: open
  note: ''
- dir: w
  to: tropelandia.room.lichs-filing-office.02-the-waiting-hall
  kind: door
  state: open
  note: ''
read_aloud: A desk piled with stacks of paper, towering and teetering. A clerk with a green eyeshade stamps forms in a rhythmic, mindless blur. Behind him, a pneumatic tube sucks forms into the walls.
features:
- Stacks of forms
- A pneumatic tube
- A stamp pad
encounters:
- name: Clerk
  monsters:
  - name: Lich's clerk (specter)
    count: 1
    hp: 22
    ac: 12
    attack: stamp +4, 3d6 necrotic
  tactics: He attacks if the party is rude or unreasonable.
  treasure: ''
traps: []
puzzles:
- name: The Form
  description: To progress, the party must fill out Form 27B in triplicate. The clerk will only accept it if the answers are coherent.
  solution: Fill the form out correctly (Investigation DC 15) or forge the signature (Deception DC 16).
  hints:
  - The form has a hidden field.
  - Boxes marked 'Cause of death'.
  - The clerk loves spelling errors.
  reward: The clerk stamps the form; the door opens.
secrets: []
loot: []
dm_notes: ''
---
# LCH-03 The Forms Desk

> A desk piled with stacks of paper, towering and teetering. A clerk with a green eyeshade stamps forms in a rhythmic, mindless blur. Behind him, a pneumatic tube sucks forms into the walls.

## Exits
- **south** (door, open): [[LCH-06 Phylactery Storage|phylactery storage]]
- **west** (door, open): [[LCH-02 The Waiting Hall|the waiting hall]]

## Features
- Stacks of forms
- A pneumatic tube
- A stamp pad

## Encounters
- **Clerk**: 1x Lich's clerk (specter) (HP 22, AC 12). He attacks if the party is rude or unreasonable.

## Puzzles
- **The Form**: To progress, the party must fill out Form 27B in triplicate. The clerk will only accept it if the answers are coherent.
