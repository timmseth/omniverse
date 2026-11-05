# Core Concepts

The ten ideas everything else rests on. The README (the design document) has the reasoning; this page has the shapes.

## 1. Notes
Everything is a Markdown note with YAML frontmatter. The frontmatter is data (checked by schema); the body is prose. A note has a `kind`, an `id`, a `name` and a `parent`. There is no database.

## 2. Ids and namespaces
Ids are `<namespace>.<kind>.<slug>`: `tropelandia.settlement.barrowdale`, `omniverse.trope.kill-ten-rats`, `pie-heist.session.01`. The namespace is the universe (or `omniverse` for shared things, or an instance id for instance-local things). Ids are permanent; names and file paths are not. References between notes use ids in frontmatter and wikilinks in prose.

## 3. The layer model
Every note has a parent, and the chain of parents reaches the Omniverse. Space is a tree: universe, plane, galaxy, star system, planet, continent, region, country, province, settlement, district, venue. People hang off the place they belong to. Dungeons hang off the place that contains them; rooms hang off their dungeon. Factions, quests, lore, tables and the bestiary hang directly off the universe. Detail increases downward.

## 4. Universes are modules
A universe is a self-contained folder with a manifest (`_universe.md`), owned by its maintainer, declaring its ruleset, calendar, tone and what it requires. Rulesets, trope packs, generators, views and apps are modules too. Modules meet at documented contracts (the schemas), never at each other's internals.

## 5. Events are the timeline
A universe's history is its `Events/` folder: dated notes with a type, a severity, a visibility, and `deltas` describing the state they changed. The timeline (`_timeline.md`) is generated from them. Nothing in a universe changes except by a new event being merged.

## 6. Instances
To play, fork: an instance (`Instances/<name>/`) pins a fork point in canon and keeps its own log of sessions and events, plus an overlay of characters that exist only there. Instances are private by default. Their events are `canon: local` until proposed.

## 7. Canon merge
When an instance's events should become true for everyone, the DM marks them `canon: proposed` and opens a canon-merge issue. The universe's maintainer reviews; merged events are copied into `Events/` with their source recorded. A conflict with events merged since the fork point is a **Reality Rift**, resolved by the maintainer.

## 8. Tropes and instances of tropes
`Tropes/` is the shared library of story patterns (beats, hooks, roles). A universe uses one by writing a `trope_instance`: the trope bound to its own people and places, with a `twist` and `stakes`. Dungeons, quests and factions list the tropes they involve, so a DM can find every "kill ten rats" in the multiverse.

## 9. Rulesets
Each universe names a ruleset: the shape of stat blocks, the power function, how off-stage conflicts resolve, how characters progress. The bestiary and the NPCs carry stats in that shape. The Omniverse itself is tied to no system; the Core ruleset is a minimal fallback, and others can be added as data.

## 10. Generated, never edited
`_generated/`, `docs/reference/Schema Reference.md`, each universe's `_timeline.md` and the app's bundled data are written by the tools from the notes. CI checks they are current. Edit the source note, run `build_all`, commit both.
