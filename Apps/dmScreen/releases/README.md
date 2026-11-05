# dmScreen releases

Built APKs are kept here, one per build, named `dmScreen-v<version>-<yyyyMMdd-HHmm>.apk`
with a matching `-build-notes.md`. Every build is signed with the committed debug
keystore (`../keystore/debug.keystore`), so each version installs over the previous one.

No APK has been committed yet. To produce one, run `build-apk.cmd -NoVault` from
`Apps/dmScreen/` on a machine with the Android SDK and a JDK, then commit the files
that appear in this folder. (Never overwrite an earlier build.)
