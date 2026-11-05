---
id: ashfall.room.the-cold-vault.04-the-shelves
kind: room
name: The Shelves
number: 4
code: CVT-04
parent: ashfall.dungeon.the-cold-vault
dungeon: ashfall.dungeon.the-cold-vault
universe: ashfall
light: dark
size: 30 x 30 ft
exits:
- dir: w
  to: ashfall.room.the-cold-vault.03-the-cold-hall
  kind: archway
  state: open
  note: ''
read_aloud: Shelves of grey slate rise into the dark, each slot holding a flat stone with a name cut into it. Thousands. A few at the bottom are warm, and the names on them are people in Lastlight who are still alive.
features:
- The stones are the dead of the Road, filed.
- The warm stones name the living, with a date beside each name.
encounters: []
traps: []
puzzles:
- name: The Dates
  description: Each warm stone bears a name and a date in the Ashfall calendar. The dates are all within the next winter.
  solution: 'They are not death dates. They are appointment dates: when the named will be called to the queue. Warden Vosk''s is first.'
  hints:
  - The dates are all in the same winter.
  - 'Brother Ash''s stone has a note: ''spoke to; has no appointment''.'
  - The Counting Thing hands out numbers. These are the numbers.
  reward: Knowing the Warden's date lets the party warn her, which is worth a Warden's writ and a year of oil.
secrets: []
loot:
- A warm stone with a party member's name on it, and a date
dm_notes: The shelves are the Office of Eternal Records' overflow. It has been filing Ashfall's dead through the Rift for two centuries.
for_quest:
- quest: ashfall.quest.the-count
  when: arrival
  read_aloud: One of the warm stones near the bottom has been turned to face the wall.
  dm_notes: Kettle turned it. It is his. The date on it is tomorrow.
  clue: Kettle's number is next in the queue.
---
# CVT-04 The Shelves

> Shelves of grey slate rise into the dark, each slot holding a flat stone with a name cut into it. Thousands. A few at the bottom are warm, and the names on them are people in Lastlight who are still alive.

Part of [[The Cold Vault]].
