---
id: ashfall.room.the-cold-vault.02-the-stair
kind: room
name: The Stair
number: 2
code: CVT-02
parent: ashfall.dungeon.the-cold-vault
dungeon: ashfall.dungeon.the-cold-vault
universe: ashfall
light: dark
size: 10 ft wide, 60 ft long
exits:
- dir: n
  to: ashfall.room.the-cold-vault.01-the-door
  kind: stairs
  state: open
  note: ''
- dir: d
  to: ashfall.room.the-cold-vault.03-the-cold-hall
  kind: stairs
  state: open
  note: ''
read_aloud: The stair goes down in the dark, each step rimed with frost. Your lamps burn blue. Somewhere below, a sound like a page turning.
features:
- Frost thickens with every step.
- Lamps burn blue and give half their light (difficulty +1 to see).
encounters: []
traps:
- name: The Blue Step
  trigger: Stepping on the thirtieth step
  effect: The step is ice over nothing; fall 20 ft to the Cold Hall, one harm
  detect_dc: 2
  disarm_dc: 2
puzzles: []
secrets: []
loot: []
dm_notes: The sound is the Counting Thing, below, turning the ledger.
---
# CVT-02 The Stair

> The stair goes down in the dark, each step rimed with frost. Your lamps burn blue. Somewhere below, a sound like a page turning.

Part of [[The Cold Vault]].
