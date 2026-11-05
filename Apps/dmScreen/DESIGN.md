# dmScreen design

## Original prompt

> ok lets create 10 dungeons in various parts of the world and then lets make a companion
> app apk that reads it and models it for the DM like the room has blah blah blah exits
> are direction x y z puzzles etc the kind of evocative descriptions of rooms gamemasters
> do. so now its a dungeon runner IN the world
>
> like a dm screen for that dungeon
>
> and then this becomes a 'submit a dungeon' service and then you can use it and its all
> shared with anyone else
>
> update the docs to include this feature and the apk goes in the repo

## Assumptions made for v1.0.0

- The app consumes a generated index (`_generated/dungeons.json`, schema 1) rather than
  parsing Markdown on the phone. One source of truth: the notes in the vault.
- "Submit a dungeon" is a pull request to the repository (see `_rules/Submitting a Dungeon.md`);
  the app explains the steps, copies the templates and links to the guide. No server.
- "Shared with anyone else" means: once merged, every copy of the app gets the dungeon on
  Sync (and in the next release's bundle).
- UI is HTML/CSS/JS in a WebView so the interface can change without Kotlin work.
- Stored state is local to the device; there is no account and no telemetry.
- Rules text is system-agnostic where possible; stat blocks in the first universe are 5e.
- Debug signing only.

## Architecture

- `MainActivity.kt`: WebView, keep-screen-on, back button walks WebView history, and a small
  bridge (`loadState/saveState`, `loadData/saveData`, `openUrl`, `copyText`, `fetchText`,
  `version`). `fetchText` is https-only, 16 MB cap.
- `assets/app.js`: hash-routed single page app, state in one JSON blob.
- `assets/dungeons.js`: bundled copy of the index (generated).
- Synced data is stored beside the bundle and wins per dungeon id.

## v1.1.0: the dollhouse, and the rest of the world

Agreed after v1.0.0 ("add a 3d mode where you can look down at the map with the roof off like a model and dm from there; the rest of the content is a panel that pulls in").

- **Model tab** (per dungeon): a WebGL view of the dungeon as a tabletop model, roof off. Rooms are slabs with walls extruded from each room's grid position and parsed size; gaps in the walls where exits are; corridors between connected rooms; stair markers for up/down; an arch where the dungeon exits. Floors stack; the floor the party is on is opaque, the others ghosted. Room colour shows unvisited / visited / cleared / party here. One finger orbits, two fingers pinch and pan. Tap a room (or its label) and its card slides up in a panel: the same read-aloud, exits, HP trackers, traps, puzzles, loot and notes as the Room tab, plus "Move party here". No library: raw WebGL, ~450 lines, in `model3d.js`.
- **Stat blocks**: every encounter monster with a bestiary ref gets a "Stats" expander showing its block, whichever ruleset it is in (dnd5e: AC, HP, speed, abilities, traits, actions; six_sides: traits, harm, difficulty, moves). Loot entries that are items show name, rarity, description, mechanics and curse.
- **World data**: `tools/sync_data.py` now also bundles `world.js` (settlements, venues, people, factions, quests, tables, items from `_generated/world.json`), and Sync fetches `world.json` too.
- **Towns**: the Library gets a Towns section. A town page shows its read-aloud, venues, people, factions, rumours, hooks and nearest dungeons; venue and NPC cards (voice, wants, fears, secret behind a tap); faction pages (goals, members, allies, rivals, dungeons, secret); quest pages (stages, rewards, outcomes) linked from dungeon overviews.
- **Table roller** in Tools and on town pages: roll any table, with refs resolved to monsters and items.
- Not in 1.1: map export, editing, instance logs.
