# For DMs

Run a session tonight. Everything below works from Obsidian alone; the app makes the dungeon part faster.

## Fastest start: the Starter Kit
`Multiverse/Tropelandia/Instances/starter-kit/` is a complete three-session arc (levels 1 to 3) with a Session Zero page, five pregens and three dungeons. Copy the folder to `Instances/<your-name>/`, change the `id` in `_instance.md` and `Campaign.md`, and read [Session Zero](../../Multiverse/Tropelandia/Instances/starter-kit/Session%20Zero.md).

## Running a dungeon
**With the app.** Install the latest APK from `Apps/dmScreen/releases/` (full guide: [The DM Screen App](The%20DM%20Screen%20App.md)). Open the dungeon; the Room tab shows read-aloud text, exits as buttons, encounters with HP trackers, traps, puzzles with hints you reveal one at a time, secrets, loot and your notes. The Map tab is one floor at a time. Tools has dice, a party tracker and a run log. Sync pulls the latest dungeons from GitHub.

**From Obsidian.** Open the dungeon's folder note, then the rooms in order. Every room note has the same sections the app shows. The dungeon's `wandering` table is on the folder note.

Dungeons are listed with level ranges in [`_generated/Dungeon Index.md`](../../_generated/Dungeon%20Index.md). Each has a `home_town` (where the party stages from), `factions` (who cares about it) and a quest that threads it into the world.

## Running a town
Open the settlement note: it lists venues (taverns, shops, temples, with read-aloud text and services), notable people (each NPC has a `voice`, `wants`, `fears` and a `secret`), factions present, rumours, hooks and the nearest dungeons. Roll on [Tavern Rumours](../../Multiverse/Tropelandia/Tables/Tavern%20Rumours.md), [Reactions](../../Multiverse/Tropelandia/Tables/Reactions.md) or [Complications](../../Multiverse/Tropelandia/Tables/Complications.md) when you need something.

## Running a quest
Quests (`Multiverse/<Universe>/Quests/`) are chains of three or four stages, each with a goal, a place or dungeon, complications and a clue to the next stage, plus what changes on success and on failure. They are scaffolding, not rails: the stages tell you what is true in the world, and the table decides what to do about it.

## Monsters and items
Stat blocks live in `Bestiary/`; rooms reference them, and the app shows the numbers. Notable loot is in `Items/` with description, mechanics and curses. Loot tables are in `Tables/`.

## Logging the session
Write a session note in your instance's `log/` folder (the format is in [Running and Logging a Campaign](../authoring/Running%20and%20Logging%20a%20Campaign.md)). Mark events `canon: local` by default; mark the ones that should change the shared world `canon: proposed` and open a canon-merge issue.

## The DM skill
If you use Claude with this repository, the `omniverse-dm` skill creates instances, recommends starting scenarios, plays NPCs in their voice, keeps the log and drafts canon merges. See the README, section 17.5.
