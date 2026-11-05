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
