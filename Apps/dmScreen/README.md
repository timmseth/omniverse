# dmScreen

The DM screen for the Omniverse. It reads the shared dungeon index
(`_generated/dungeons.json`) and runs a dungeon room by room: read-aloud text, exits by
direction, encounters with HP trackers, traps, puzzles with hints, secrets, loot, a floor
map, dice, a party tracker and a run log. Dungeons come bundled with the app and refresh
over the air with **Sync** from this repository, so a dungeon someone submits and the
maintainer merges shows up on every DM's phone.

The app is a thin Android WebView shell around plain HTML/CSS/JS (`app/src/main/assets/`),
with no third-party dependencies. Application id `com.seth.dmscreen`, min SDK 26.

## Screens

Library (search, level chips) - Dungeon: Overview / Room / Map / Rooms / Tools - Submit - About.
Runs, the party and notes are stored on the device only.

## Build

Needs the Android SDK (platform 35) and a JDK 17+ (Android Studio's bundled JBR works).

```
build-apk.cmd              :: debug APK -> Z:\Vault_APK_Builds\dmScreen\
build-apk.cmd -NoVault     :: debug APK -> .\releases\ (to commit to the repo)
build-apk.cmd -Sync        :: refresh the bundled dungeons from ..\..\_generated first
```

Or directly: `gradlew.bat assembleDebug` (APK in `app/build/outputs/apk/debug/`).

## Updating the bundled dungeons

```
python3 ../../_rules/tools/build_dungeons.py ../..      # rebuild the index from the notes
python3 tools/sync_data.py                              # regenerate assets/dungeons.js
```

The app also syncs the live index from
`https://raw.githubusercontent.com/timmseth/omniverse/main/_generated/dungeons.json`.

## Signing and versions

Every build uses the committed `keystore/debug.keystore` (password `android`, alias
`androiddebugkey`), so versions install over each other. `version.properties` holds
`versionName` and `versionCode`; bump both for each build.

## Version log

- 1.0.0 - first version: library, room cards, exits, encounters, traps, puzzles, secrets,
  loot, floor maps, dice, party, run log, sync, submit guide.
