---
id: omniverse.template.room
kind: template
name: Room Template
parent: omniverse
---
# Room Template

Copy the block below into a new note at `Multiverse/<Universe>/Dungeons/<Name>/Rooms/<CODE>-<nn> <Room Name>.md`. Every exit must have a matching exit back from the other room. See [[Submitting a Dungeon]].

```yaml
---
id: <universe>.room.<dungeon-slug>.<nn>-<room-slug>
kind: room
name: <Room Name>
number: <n>
code: <CODE>-<nn>
parent: <universe>.dungeon.<dungeon-slug>
dungeon: <universe>.dungeon.<dungeon-slug>
universe: <universe>
light: dim
size: 20 x 20 ft
exits:
  - { dir: s, to: <id of the room to the south>, kind: door, state: open, note: "" }
read_aloud: >-
  Two or three sentences the DM reads aloud, present tense, second person.
features:
  - <something the party can examine>
encounters:
  - name: <Encounter name>
    monsters:
      - { name: <Monster>, count: 2, hp: 7, ac: 12, attack: "bite +4, 1d4+2" }
    tactics: <how they fight, when they flee, how to talk to them>
traps:
  - { name: <Trap>, trigger: <what sets it off>, effect: <what happens>, detect_dc: 13, disarm_dc: 12 }
puzzles:
  - name: <Puzzle>
    description: <what the party sees>
    solution: <the answer>
    hints: ["<vague>", "<clearer>"]
    reward: <what solving gets them>
secrets:
  - { description: <what is hidden>, dc: 14 }
loot:
  - <short description of treasure>
dm_notes: <anything the DM should know>
---
```

Leave out any list you do not need (use `[]` or delete the line). `kind` must be one of `door archway passage stairs ladder secret portal hatch` and `state` one of `open closed locked stuck barred trapped hidden rubble`.
