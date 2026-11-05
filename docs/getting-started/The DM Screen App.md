# The DM Screen App (dmScreen)

dmScreen is the Android companion app: it reads the shared dungeon index and the world index and runs a dungeon at the table, room by room, with a 3D model of the site and the towns, NPCs and tables around it. Source is in `Apps/dmScreen/`; builds are in `Apps/dmScreen/releases/`.

## Install
1. Download the latest `dmScreen-v<version>-<date>.apk` from `Apps/dmScreen/releases/` to the phone (Android 8 or newer).
2. Open it. Android asks to allow installs from this source the first time; allow it for the file manager or browser you used.
3. Later versions install over earlier ones and keep your runs and notes (every build is signed with the same project key). No account, no permissions beyond network for Sync.

## The Library
The first screen. Four sections across the top:
- **Dungeons**: every dungeon with place, level range, room count and tags. Search, filter by level. A bar under a card shows a run in progress.
- **Towns**: hub settlements by universe, with venue and people counts and the dungeon codes nearby.
- **Factions**: who wants what, with reach and member counts.
- **Tables**: every random table; roll from the list or open one to read it.
At the bottom: **Sync from GitHub** and **Submit a dungeon**.

## Running a dungeon
Open a dungeon. Six tabs along the bottom:
- **Overview**: summary, hooks, rumours, a wandering-encounter roller, tropes, and "In the world": home town, factions and quests, each a link. **Start run** pins the party at the entry; **Resume** continues; **Reset run** (tap twice) wipes it.
- **Room**: the party's current room, or any room you looked at from Rooms or the Map. The read-aloud text is first and large (**Larger** makes it larger; **Copy** copies it). Then:
  - **Exits** as buttons with direction, destination, kind and state. Tap one to move the party through it. Locked, barred, stuck or hidden exits do not move you; tap **Open** beside them once the party gets through, and the other side updates too.
  - **Features**, then **encounters** with a row per monster: AC and attack, a hit-point bar, −5 / −1 / +1 buttons, **Reset HP**, and **Show stats** for the full block from the bestiary (5e or Six Sides).
  - **Traps** with trigger, effect, DCs and found / disarmed / triggered toggles. **Puzzles** with hints revealed one at a time and the solution behind a tap. **Secrets** and **loot** as checklists; notable items show rarity, description, mechanics and curses. **DM notes**. **Your notes** for the room, saved as you type.
  - **Move party here**, **Mark visited**, **Mark cleared**.
- **Model**: the dungeon as a tabletop model, roof off. One finger orbits, two fingers pinch to zoom and drag to pan, **Reset view** recentres. Rooms are slabs with walls and door gaps; corridors join them; stair blocks mark up and down; an arch marks the way out; red bars are locked or stuck doors, translucent blue panels are secret doors. The floor the party is on is solid, other floors are ghosted (switch with the floor chips). The gold slab with the red token is where the party is; tan is visited, green is cleared. **Tap a room or its label** and its full card opens in the panel below, the same card as the Room tab, so you can run the whole dungeon from here.
- **Map**: a flat schematic per floor with the same colours and door marks. Tap a room to look at it.
- **Rooms**: the list, with badges for encounters, traps, puzzles, secrets and loot.
- **Tools**: dice (d4 to d100, a modifier, d20 with advantage or disadvantage), the **party** tracker (add members, name them, track HP), a **table** roller for the universe's tables, **run notes**, and the **run log** (moves, rolls, results; **Copy** to paste into a session note).

Everything about a run (position, visited and cleared rooms, doors opened, HP, trap and puzzle state, loot taken, notes, log) is saved on the phone per dungeon and survives closing the app.

## Quests and quest layers
Open a quest (from a dungeon's Overview, a town, or the Library's Quests section) and tap **Activate**. While a quest is active, every room, venue, town and NPC that carries detail for it shows a **Quest** box: what the party notices on arrival, and a **Investigate** button for what a deeper look turns up. A stage stepper on the quest page unlocks the entries that only apply later. Nothing appears for quests that are not active, so you never read ahead of the table.

## Running a fight
From any encounter, **Start combat**: the monsters join the initiative with their DEX, party members roll or type theirs, and a combat bar pins to the top of the Room and Model tabs with the turn order and round counter. **Next** advances; conditions can be toggled on anyone; a party member at 0 HP gets death-save pips (nat 20 revives, nat 1 counts double). **End combat** clears it and logs the result.

## Dice, purse, timer
The Tools tab takes dice notation (`2d6+3`, `d20`, `3d8-1`) with a crit toggle that doubles the dice and never the modifier. The **purse** holds the party's gp/sp/cp; **Split loot** does the change math across the members. **Timer** pins a countdown over every screen (red under ten seconds).

## Session export
Tools, **Export session**: the run log becomes an Omniverse session note (YAML frontmatter, events with deltas, rolls, `canon: local`) ready to drop into an instance's `log/` folder, or a plain journal in Markdown. Both go to the clipboard and the Android share sheet. When you resume a run, **Previously on…** recaps the last session's notable moments from the same log.

## Towns, people, factions, quests
From the Library or from a dungeon's Overview, open a town: its read-aloud, ruler, trade and law, venues, people, factions, rumours, hooks, nearby dungeons and local tables. Venue pages show the keeper, services and prices, rumours and hooks. NPC pages show species, role, where they are, **Voice** (how to play them), **Wants** and **Fears**, a **Secret** behind a Reveal button, relationships and a stat block if they have one. Faction pages show goals, methods, assets, members, allies, rivals, dungeons, hooks and the secret. Quest pages show the premise, hooks, stages with clues, rewards and the outcomes of success and failure.

## Sync
**Sync from GitHub** (Library or About) downloads the latest `dungeons.json` and `world.json` from the repository's `main` branch and uses them from then on. A dungeon or town merged into the repository today is on your phone after one tap; you do not need a new APK. The bundled data is used until the first sync and whenever the phone is offline.

## Submit a dungeon
The **Submit** page explains the pull-request route and copies the dungeon and room templates to the clipboard. See [Writing a Dungeon](../authoring/Writing%20a%20Dungeon.md), or hand the job to an LLM ([Contributing with an LLM](../authoring/Contributing%20with%20an%20LLM.md)).

## About and your data
**About** shows the app version, how many dungeons and world notes are loaded, where they came from and when you last synced. **Erase all runs and notes** (tap twice) clears everything the app has saved. Nothing leaves the phone except the Sync requests to GitHub.

## Troubleshooting
- **The Model tab is black or empty**: the phone's browser engine has no WebGL. The Map tab shows the same rooms. Tell the maintainer the phone model.
- **Sync failed**: the phone is offline, or GitHub is unreachable. The app keeps the last good data.
- **A dungeon is missing after Sync**: it is not merged yet, or its `status` makes the build skip it. Check `_generated/Dungeon Index.md` in the repository.
- **Install blocked**: allow installs from the app you opened the file with (Files, Chrome). If a very old build is installed from a different key, uninstall it first; every build since 1.0.0 shares one key.

## Versions
See `Apps/dmScreen/releases/README.md` and the build notes beside each APK. The source, build scripts and design notes are in `Apps/dmScreen/` (README.md, DESIGN.md).
