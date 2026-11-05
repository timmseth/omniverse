---
id: ashfall.room.the-cold-vault.03-the-cold-hall
kind: room
name: The Cold Hall
number: 3
code: CVT-03
parent: ashfall.dungeon.the-cold-vault
dungeon: ashfall.dungeon.the-cold-vault
universe: ashfall
light: dark
size: 40 x 60 ft
exits:
- dir: u
  to: ashfall.room.the-cold-vault.02-the-stair
  kind: stairs
  state: open
  note: ''
- dir: e
  to: ashfall.room.the-cold-vault.04-the-shelves
  kind: archway
  state: open
  note: ''
- dir: w
  to: ashfall.room.the-cold-vault.05-the-queue
  kind: door
  state: closed
  note: a plain door, warm to the touch
read_aloud: A hall of black stone, pillars lost in the dark above. The floor is ash, undisturbed except for one path of prints, and along the walls stand the dead of Lastlight, upright, waiting, facing the warm door to the west.
features:
- Thirty Ash Walkers stand along the walls. They do not move while the lamps are lit.
- A path through the ash leads west to the warm door.
encounters:
- name: The standing dead
  monsters:
  - ref: ashfall.monster.ash-walker
    count: 6
  tactics: They do nothing while a lamp burns. If a lamp goes out, the six nearest step forward. They want the warm door, not the party.
traps: []
puzzles: []
secrets:
- description: The dead are not facing the party. They are queueing.
  dc: 1
loot: []
dm_notes: Six is what moves if a lamp fails; the rest keep queueing. Relighting a lamp stops them where they stand.
---
# CVT-03 The Cold Hall

> A hall of black stone, pillars lost in the dark above. The floor is ash, undisturbed except for one path of prints, and along the walls stand the dead of Lastlight, upright, waiting, facing the warm door to the west.

Part of [[The Cold Vault]].
