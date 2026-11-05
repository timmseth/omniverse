---
name: omniverse-town
description: Write an Omniverse settlement with venues, NPCs and faction presence from a human's description, linked into the region, nearby dungeons and factions. Use when someone asks for a town, village, city, port, outpost or the people in one.
---

# Write an Omniverse town

A town is a `settlement` folder note under its region (or province/country), with `Venues/` and `People/` inside. Read `docs/authoring/Writing Factions, NPCs and Towns.md` and two existing towns in the same universe first.

## Steps
1. **Place it.** Which universe, which region (its id is the `parent`), what size (`outpost hamlet village town city metropolis`), what it is for (trade, law, the one thing it is known for). Confirm the name is unused (`grep -rl "^name: <Name>$"`).
2. **The settlement note**: a read-aloud blockquote (arriving traveller's view), a paragraph of what the town is, `ruler`, `population`, `trade`, `law`, `rumours` (four), `hooks` (three), and lists for `venues`, `notable_people`, `factions`, `nearest_dungeons`. Body sections: Venues, People, Nearby dungeons, Factions present. Add the town to the region note's Settlements list.
3. **Venues** (two to four): a tavern with a job notice, somewhere to spend money, one more (temple, hall, smith, market). Each: `venue_type`, `keeper` (a person id), `services` with prices, `read_aloud`, a rumour, a hook.
4. **People** (three to five): each with `role`, `voice` (how to play them, one or two lines), `wants`, `fears`, `secret`, `faction` if any, `location` (their venue), `relationships`. Keepers of venues are people. A ruler is a person.
5. **Factions.** Reuse existing ones (`Factions/`) and add the town to their presence; add the person to their `members`. Create a new faction only if the town needs one that does not exist, and give it a rival.
6. **Dungeons and tables.** Link any dungeon nearby in `nearest_dungeons` and set its `home_town` if it has none. If the town has a flavour nobody else has, write one `Tables/` note (rumours or encounters) with `where:` set to the town or its region.
7. **Validate, build, PR.** `validate.py --quiet`, `build_all.py`, one PR titled `Town: <name>`.

## Voice
The read-aloud is three sentences a traveller would notice. NPC voices are playable cold: a tic, a manner, what they call people. Secrets change how the party sees the NPC, not the whole plot.
