# dmScreen releases

Built APKs are kept here, one per build, named `dmScreen-v<version>-<yyyyMMdd-HHmm>.apk`
with a matching `-build-notes.md`. Every build is signed with the committed debug
keystore (`../keystore/debug.keystore`), so each version installs over the previous one.
Never overwrite an earlier build.

| Version | Build | Notes |
|---|---|---|
| 1.0.0 | `dmScreen-v1.0.0-20261104-2057.apk` | first version |
| 1.1.0 | `dmScreen-v1.1.0-20261104-2305.apk` | Model (3D) tab, stat blocks, towns/NPCs/factions/quests, table roller |

To build another: run `build-apk.cmd -NoVault` from `Apps/dmScreen/` (or use the build bot), then commit the files that appear here.
