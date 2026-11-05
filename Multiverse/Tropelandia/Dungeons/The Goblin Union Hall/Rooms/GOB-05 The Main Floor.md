---
id: tropelandia.room.goblin-union-hall.05-the-main-floor
kind: room
name: The Main Floor
number: 5
code: GOB-05
parent: tropelandia.dungeon.goblin-union-hall
dungeon: tropelandia.dungeon.goblin-union-hall
universe: tropelandia
light: firelit
size: 60 x 50 ft
exits:
- dir: n
  to: tropelandia.room.goblin-union-hall.02-reception
  kind: archway
  state: open
  note: ''
- dir: s
  to: tropelandia.room.goblin-union-hall.08-the-chiefs-office
  kind: door
  state: open
  note: ''
- dir: e
  to: tropelandia.room.goblin-union-hall.06-the-workshop
  kind: archway
  state: open
  note: ''
- dir: w
  to: tropelandia.room.goblin-union-hall.07-the-strike-fund
  kind: archway
  state: open
  note: ''
read_aloud: A cavernous chamber carved from the oak's heart, with tiers of rough benches, a speaker's podium and hundreds of goblins in angry attendance. At the podium stands a goblin in a bowler hat addressing the crowd with growing force. The crowd goes silent when you enter.
features:
- Rough benches
- A podium
- An angry crowd
encounters:
- name: Mass meeting
  monsters:
  - name: Goblin
    count: 12
    hp: 7
    ac: 15
    attack: scimitar +4, 1d6+2
  tactics: The crowd turns hostile if the party makes threats; a rousing speech (Persuasion DC 14) can turn them into allies.
  treasure: ''
traps: []
puzzles:
- name: The Speech
  description: The party can win over the meeting with a good speech, a vote, or a promise.
  solution: Persuasion/Performance DC 14 with a concession from the list of demands.
  hints:
  - Their demands are posted.
  - The crowd cheers certain words.
  - A promise of mushrooms works.
  reward: The crowd cheers and backs the party; the Chief becomes willing to deal.
secrets: []
loot: []
dm_notes: ''
---
# GOB-05 The Main Floor

> A cavernous chamber carved from the oak's heart, with tiers of rough benches, a speaker's podium and hundreds of goblins in angry attendance. At the podium stands a goblin in a bowler hat addressing the crowd with growing force. The crowd goes silent when you enter.

## Exits
- **north** (archway, open): [[GOB-02 Reception|reception]]
- **south** (door, open): [[GOB-08 The Chief's Office|the chiefs office]]
- **east** (archway, open): [[GOB-06 The Workshop|the workshop]]
- **west** (archway, open): [[GOB-07 The Strike Fund|the strike fund]]

## Features
- Rough benches
- A podium
- An angry crowd

## Encounters
- **Mass meeting**: 12x Goblin (HP 7, AC 15). The crowd turns hostile if the party makes threats; a rousing speech (Persuasion DC 14) can turn them into allies.

## Puzzles
- **The Speech**: The party can win over the meeting with a good speech, a vote, or a promise.
