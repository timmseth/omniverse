# Writing Monsters and Items

## Monsters (`kind: monster`)
`Multiverse/<Universe>/Bestiary/<Name>.md`, parent the universe. The core fields are system-agnostic: `ruleset`, `size`, `type`, `threat` (Omni power, 0 to 100, so creatures from different systems compare), `alignment`, `tactics`, `lore`, `loot`, `tropes`. The stat block itself sits under the ruleset's key, and that ruleset's schema extension (`Rulesets/<Ruleset>/_schemas/monster.yaml`) defines it:
- **`dnd5e:`** `cr`, `ac`, `hp`, `hp_dice`, `speed`, `abilities` (str dex con int wis cha), `actions` (`{name, text}`), plus `saves`, `skills`, `senses`, `languages`, `traits`, `reactions`, `legendary`, `resistances`, `immunities`, `xp`.
- **`six_sides:`** `traits` (body, wits, nerve, grace, 1 to 5 dice), `harm` (boxes), `difficulty` (hits to harm it), `moves`.
- **`core:`** `rank` (1 to 10) and `descriptors`.
A monster in one universe carries one block (the universe's ruleset). The build tool reads whichever is present and gives the app hp-like and defence-like numbers either way.

Two fields make a bestiary entry worth more than a stat block:
- **`tactics`**: how it fights, in a line or two. What it does first, what it does when hurt, what makes it stop.
- **`lore`**: what it is in this universe. Tropelandia's goblins are unionised; its mimics are in hospitality; its skeletons keep working because it is in the contract.

Write the rules text in your own words. Numbers are not copyrightable; prose from published books is. Do not paste.

Rooms reference monsters by id: `monsters: [{ref: tropelandia.monster.goblin, count: 4}]`. The build tool copies hp, AC and the first attack into `dungeons.json`, and attaches the full block for the app. A named variant (the Rat King, a shop steward) gets its own entry; a one-off with a twist can stay inline in the room with `name`, `count`, `hp`, `ac`, `attack`.

## Items (`kind: item`)
`Multiverse/<Universe>/Items/<Name>.md`. Required: `item_type`, `rarity`, `description` (what it looks like and does, as read to players). Add `mechanics` (rules text), `attunement`, `value_gp`, `curse`, `history` (where it came from; the best items carry a story), `owner`, `location`.

Rooms reference items by id in `loot:`; the build tool expands them for the app. Loot tables (`kind: table`, `category: loot`) can `ref` items too.

## Keeping numbers honest
The bestiary is in the universe's ruleset. A universe on a different ruleset writes its own bestiary in that shape, or maps through the ruleset's `stat_mapping` (see [Writing a Ruleset](Writing%20a%20Ruleset.md)).
