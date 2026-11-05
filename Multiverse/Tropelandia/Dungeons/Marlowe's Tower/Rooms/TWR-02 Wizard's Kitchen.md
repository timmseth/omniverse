---
id: tropelandia.room.marlowes-tower.02-wizards-kitchen
kind: room
name: Wizard's Kitchen
number: 2
code: TWR-02
parent: tropelandia.dungeon.marlowes-tower
dungeon: tropelandia.dungeon.marlowes-tower
universe: tropelandia
light: firelit
size: 20 x 15 ft
exits:
- dir: w
  to: tropelandia.room.marlowes-tower.01-entrance-hall
  kind: door
  state: open
  note: ''
read_aloud: 'A cluttered kitchen with a cauldron that is clearly the main appliance. Pots stir themselves; a skeleton in an apron is making what might be soup. A rack of keys hangs by the door, labelled: PANTRY, CELLAR, ROOF, ''NOT THE CELLAR'', and ''DEFINITELY NOT THE ROOF''.'
features:
- A self-stirring cauldron of soup
- A skeleton in an apron (Gerald)
- The key rack
encounters:
- name: Gerald the cook
  monsters:
  - name: Skeleton cook
    count: 1
    hp: 13
    ac: 13
    attack: ladle +4, 1d6+2
  tactics: Gerald will serve the party soup and ask them to leave; he fights only if the soup is insulted.
  treasure: ''
traps: []
puzzles: []
secrets: []
loot:
- The cellar key
- A pot of healing soup (restores 1d8 HP)
- Marlowe's overdue rent notices (11)
dm_notes: The soup is genuinely nourishing; the skeleton is a good-natured cook who wants a day off.
---
# TWR-02 Wizard's Kitchen

> A cluttered kitchen with a cauldron that is clearly the main appliance. Pots stir themselves; a skeleton in an apron is making what might be soup. A rack of keys hangs by the door, labelled: PANTRY, CELLAR, ROOF, 'NOT THE CELLAR', and 'DEFINITELY NOT THE ROOF'.

## Exits
- **west** (door, open): [[TWR-01 Entrance Hall|entrance hall]]

## Features
- A self-stirring cauldron of soup
- A skeleton in an apron (Gerald)
- The key rack

## Encounters
- **Gerald the cook**: 1x Skeleton cook (HP 13, AC 13). Gerald will serve the party soup and ask them to leave; he fights only if the soup is insulted.

## Loot
- The cellar key
- A pot of healing soup (restores 1d8 HP)
- Marlowe's overdue rent notices (11)

## DM notes
The soup is genuinely nourishing; the skeleton is a good-natured cook who wants a day off.
