---
id: tropelandia.room.goblin-union-hall.06-the-workshop
kind: room
name: The Workshop
number: 6
code: GOB-06
parent: tropelandia.dungeon.goblin-union-hall
dungeon: tropelandia.dungeon.goblin-union-hall
universe: tropelandia
light: lamplight
size: 35 x 25 ft
exits:
- dir: n
  to: tropelandia.room.goblin-union-hall.03-the-break-room
  kind: door
  state: open
  note: ''
- dir: w
  to: tropelandia.room.goblin-union-hall.05-the-main-floor
  kind: archway
  state: open
  note: ''
read_aloud: 'A noisy workshop of benches and half-built contraptions: crude traps, rope ladders, a trebuchet made from a wheelbarrow. The goblins have put down tools but left everything in place. A foreman''s whistle hangs from a hook.'
features:
- Half-built traps
- A wheelbarrow trebuchet
- A foreman's whistle
encounters: []
traps:
- name: Tripwire
  trigger: Walking through without looking
  effect: 'A bundle of spikes drops: 2d6 piercing, DC 12 Dex halves'
  detect_dc: 12
  disarm_dc: 11
puzzles: []
secrets: []
loot:
- Goblin trap parts (worth 25 gp)
- A foreman's whistle (calls goblins to order)
dm_notes: ''
---
# GOB-06 The Workshop

> A noisy workshop of benches and half-built contraptions: crude traps, rope ladders, a trebuchet made from a wheelbarrow. The goblins have put down tools but left everything in place. A foreman's whistle hangs from a hook.

## Exits
- **north** (door, open): [[GOB-03 The Break Room|the break room]]
- **west** (archway, open): [[GOB-05 The Main Floor|the main floor]]

## Features
- Half-built traps
- A wheelbarrow trebuchet
- A foreman's whistle

## Traps
- **Tripwire**: Walking through without looking → A bundle of spikes drops: 2d6 piercing, DC 12 Dex halves (detect DC 12, disarm DC 11)

## Loot
- Goblin trap parts (worth 25 gp)
- A foreman's whistle (calls goblins to order)
