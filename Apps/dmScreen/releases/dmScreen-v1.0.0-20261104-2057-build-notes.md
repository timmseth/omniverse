# dmScreen v1.0.0 (versionCode 1)

Built 2026-11-04 20:57 from the Omniverse repository, `Apps/dmScreen` (omniverse commit f804882).
Application id `com.seth.dmscreen`, min SDK 26, debug-signed (certificate SHA-256 BA:11:96:2C:...:B9:E1:A3, the committed project keystore).

## What's in it
- Library of 10 bundled dungeons (85 rooms) with search and level filters.
- Per dungeon: Overview (hooks, rumours, wandering-encounter roller), Room card, floor Map, Rooms list, Tools.
- Room card: large read-aloud text, exits as move buttons with state (locked, hidden, stuck), features, encounters with per-monster HP, traps, puzzles with hints/solution, secrets, loot, DM notes, your notes.
- Dice (with modifier, advantage/disadvantage), party HP tracker, run notes, run log.
- Sync from GitHub (raw `_generated/dungeons.json`); Submit-a-dungeon guide and templates; About.
- Runs, party and notes are stored on the device only.

## Assumptions
- Dungeons come from the generated index; "submit" is a pull request to the repository.
- Debug signing only. The screen stays on while the app is open.

## Known gaps
- No in-app dungeon authoring; no whole-instance logging; no networked play.
- Not yet tested on a phone.

## Install
Copy the APK to the phone and open it (allow installs from this source). Later versions install over this one.
