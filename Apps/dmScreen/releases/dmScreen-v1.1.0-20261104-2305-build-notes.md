# dmScreen v1.1.0 (versionCode 2)

Built 2026-11-04 23:05 from the Omniverse repository, `Apps/dmScreen`. Installs over v1.0.0 (same keystore, certificate SHA-256 BA:11:96:2C:...:B9:E1:A3).

## New in this version
- **Model tab**: the dungeon as a tabletop model, roof off. Rooms with walls and door gaps, corridors, stair markers, an arch at the way out; locked doors shown red, secret doors as translucent blue panels; floors stack with the others ghosted. One finger orbits, two fingers pinch and pan, "Reset view" recentres. Tap a room or its label: its full card (read-aloud, exits, HP, traps, puzzles, loot, notes) opens in the panel below, with "Move party here". Moving through an exit in the panel moves the token.
- **Stat blocks**: "Show stats" on any encounter monster from the bestiary; D&D 5e and Six Sides blocks both render. Item loot shows rarity, description, mechanics and curses.
- **Towns, Factions, Tables** sections in the Library. Town pages: read-aloud, venues, people, factions, rumours, hooks, nearby dungeons, local tables. Venue, NPC (voice, wants, fears, secret behind a tap, stat block), faction and quest pages. Dungeon overviews link their home town, faction and quest.
- **Table roller** on every table, in Tools and on town pages; results resolve to monsters (with stats) and items.
- **Sync** now fetches `world.json` as well as `dungeons.json`. 11 dungeons (92 rooms) and 222 world notes bundled (Tropelandia + Ashfall).

## Known gaps
- The 3D view was tested in a software-rendered desktop WebGL, not yet on a phone GPU. If it shows black, tell me which device.
- Labels overlap on dense dungeons until you zoom.
- No map export, no editing, no instance logs yet.

## Install
Copy the APK to the phone and open it. It replaces v1.0.0 and keeps your runs and notes.
