# Tools

All tools are Python 3 scripts in `_rules/tools/`, need only PyYAML, and take the repository root as their first argument. CI runs them on every pull request. Contributed content never runs code; these are the only scripts that run.

| Tool | Reads | Writes | Use |
|---|---|---|---|
| `validate.py <root> [--strict] [--quiet]` | every note, `_rules/schemas/`, module `_schemas/` | nothing | Checks each note against its kind's schema (required fields, types, enums, refs, id and folder patterns), parent chains, folder placement, dungeon codes, wikilinks, table coverage, Windows path length. Exit 1 on errors. |
| `build_dungeons.py <root> [--check]` | dungeon and room notes, bestiary, items | `_generated/dungeons.json`, `_generated/Dungeon Index.md` | Checks exits are reciprocal and every room reachable; lays rooms out on a grid by walking exits from the entry; copies monster and item details in. `--check` validates only. |
| `build_world.py <root> [--check]` | every note | `_generated/world.json`, `World Index.md`, `Backlinks.md` | The world API: every note with frontmatter, body, outgoing refs and incoming refs. Apps and skills read this instead of parsing Markdown. |
| `build_timeline.py <root>` | eras, events, instances, sessions | `Multiverse/<U>/_timeline.md` | One table of history per universe. |
| `schema_reference.py <root>` | `_rules/schemas/` | `docs/reference/Schema Reference.md` | The readable schema reference. |
| `build_all.py <root>` | | | Runs dungeons, world, timeline, maps and the schema reference, then `Apps/dmScreen/tools/sync_data.py` to refresh the app's bundled data. Run this before committing. |
| `new_universe.py <Name> --tone --ruleset --maintainer` | the registry | `Multiverse/<Name>/` scaffold, registry row | Starts a universe. |
| `merge_instance.py <root> <instance id> [--write] [--all]` | an instance's sessions, canon events | draft event notes in `Events/` | Drafts canon events from a session log's `canon: proposed` events for a canon-merge PR, and lists Reality Rifts (canon events since the fork point that touch the same entities). |
| `build_maps.py <root>` | the place tree, dungeons | `_generated/Maps/<Universe>.svg`, `Maps.md` | A schematic map of each universe: planet to settlement, with dungeon codes. |
| `build_site.py <root> [--out] [--base]` | every note, `world.json` | `_site/` | The static web site (one page per note, wikilinks resolved, backlinks). CI publishes it to GitHub Pages. |

## The app's data
`Apps/dmScreen/tools/sync_data.py` turns `_generated/dungeons.json` into `assets/dungeons.js`, the dungeons bundled with the APK. The running app also fetches the live `dungeons.json` from GitHub when you tap Sync, so a merged dungeon reaches every phone without a new build.

## Schemas
`_rules/schemas/<kind>.yaml` defines each kind: folder pattern, id pattern, mixins and fields with types (`string`, `text`, `int`, `number`, `bool`, `any`, `id`, `ref` with allowed `kinds`, `enum`, `const`, `list of`, `map`, `when`, `dice`). `_mixins.yaml` holds the shared field sets (`base`, `in_universe`, `dated`, `manifest`). A module can add kinds or fields by putting the same shape of file in its own `_schemas/` folder; fields it adds to a core kind should be namespaced (`mymodule.field`). `_rules/schemas/_README.md` has the format.

## CI
`.github/workflows/validate.yml` runs on every push and pull request: validate, dungeon check, `build_all`, then fails if the generated files differ from what is committed, and fails if a script appears outside the tool folders.

`.github/workflows/site.yml` builds the static site on every push to `main` and publishes it with GitHub Pages (one-time setup: repository Settings, Pages, Source: GitHub Actions). The site is at `https://timmseth.github.io/omniverse/` once enabled.
