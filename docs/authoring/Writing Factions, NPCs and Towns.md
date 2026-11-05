# Writing Factions, NPCs and Towns

These three kinds make a world feel inhabited, and they reference each other constantly. Write them together.

## Settlements (`kind: settlement`)
A folder note under its region, province or country: `<Place path>/<Name>/<Name>.md`. Required: `size_class` (`outpost hamlet village town city metropolis`). Give it `ruler`, `population`, `trade`, `law` (one line on how justice works), `rumours` (four), `hooks` (three), `venues`, `notable_people`, `factions`, `nearest_dungeons`. The body starts with a read-aloud paragraph (what a traveller sees arriving), then a paragraph of what the town is for, then lists.

A town should answer: why would a party come here, what can they buy, who do they meet, where is the nearest trouble.

## Venues (`kind: venue`)
`<Town>/Venues/<Name>.md`. A tavern, inn, shop, smith, temple, shrine, guildhall, market, library, jail, manor, hall, stable, dock or academy (`venue_type`). `keeper` is a person; `services` are what you can buy or do, with prices where they matter; `read_aloud` is what the party sees walking in. Every town needs a tavern with a job notice and at least one place to spend money.

## People (`kind: person`)
`<Town>/People/<Name>.md`, parent the town (or district, household, faction). The fields that make an NPC playable:
- **`role`**: their job and their place in the story, in a phrase.
- **`voice`**: how to play them at the table, one or two lines. A verbal tic, a manner, what they call people.
- **`wants`** and **`fears`**: one or two each. These drive every scene they are in.
- **`secret`**: one thing the party can discover that changes how they see the NPC.
- **`faction`**, **`location`** (the venue they are usually at), **`relationships`** (`{type, with, note}`), **`goals`**.
- Stats: `stat_block` (a bestiary id) for anyone who might fight, or `stats` inline.

An NPC with a voice, a want, a fear and a secret can be run cold.

## Factions (`kind: faction`)
`Multiverse/<Universe>/Factions/<Name>.md`, parent the universe. `faction_type` (guild, cult, government, noble_house, company, gang, order, church, academy, union, militia, tribe), `reach`, `base` (a venue or place), `leader`, `members`, `goals` (what it wants, in its own words), `methods`, `assets`, `allies`, `rivals`, `dungeons` (sites it built, holds, wants or fears), `reputation` (what ordinary people think), `secret`, `hooks`.

A faction needs a rival. Two factions that want the same dungeon is a campaign.

## Quest layers
Any town, venue or person can carry `for_quest` entries: what is different here while a particular quest is active, and what a deeper look (`investigation`) turns up. The app shows them only when that quest is on. See [Writing a Quest](Writing%20a%20Quest.md).

## Linking
- Towns list their venues, people and factions; factions list members and dungeons; dungeons list factions and a home town; people list a faction and a location. Keep these in step; the validator checks every id exists, and the backlinks file shows what points where.
- In the body, wikilink by name: `[[Mildew Court]]`. If two notes share a name, the validator warns; rename one.
