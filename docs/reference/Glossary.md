# Glossary

| Term | Meaning |
|---|---|
| **Omniverse** | The whole project: the core rules, the trope library, the rulesets and the multiverse. Also the root note. |
| **Multiverse** | The shelf of universes, with its registry. |
| **Universe** | A world: a module under `Multiverse/<Name>/` with its own tone, calendar, history, content and maintainer. |
| **Module** | A self-contained, owned, versioned folder with a manifest that plugs into a core contract: a universe, a ruleset, a trope pack, a generator, a view, an app. |
| **Manifest** | The frontmatter of a module's main note (`_universe.md`, `<Ruleset>.md`, `module.md`): version, owner, licence, requires, provides. |
| **Note** | One Markdown file with YAML frontmatter. The unit of everything. |
| **Kind** | A note's type (`settlement`, `person`, `dungeon`, `room`, `event`…). Each has a schema. |
| **Schema** | The YAML file in `_rules/schemas/` that says where a kind lives, what its id looks like and what fields it has. |
| **Id** | A permanent, namespaced identifier: `<universe>.<kind>.<slug>`. |
| **Parent** | The note a note sits under. Every note but the root has one. |
| **Layer model** | The tree of parents from the Omniverse down to a person or a room. |
| **Place tree** | The spatial part of the layer model: plane, galaxy, star system, planet, continent, region, country, province, settlement, district, venue. |
| **Folder note** | A note named after its folder (`Barrowdale/Barrowdale.md`) so children can sit inside. |
| **Event** | Something that happened in canon: dated, typed, with a severity, a visibility and deltas. |
| **Delta** | One state change an event caused: `{entity, field, from, to}`. |
| **Timeline** | The ordered events of a universe; generated into `_timeline.md`. |
| **Frontier** | The latest canon event in a universe. New instances fork here by default. |
| **Era** | A named span of a universe's history. |
| **Omni-day** | A universe-independent day count, so calendars can be aligned at a Universe Join. |
| **Instance** | A playable timeline forked from canon: fork point, log, overlay. Private by default. |
| **Overlay** | Characters and notes that exist only in one instance. |
| **Session** | One sitting's log note: events, deltas, rolls. |
| **Canon** | What is true for everyone in a universe. Events are `canon`, `local` (in an instance), `proposed` or `rejected`. |
| **Canon merge** | Proposing an instance's events into canon; reviewed by the universe's maintainer. |
| **Reality Rift** | A conflict between an instance's proposed events and canon merged since its fork point; also any event agreed between two universes. |
| **Universe Join** | Adding a universe to the multiverse by pull request. |
| **Trope** | A shared story pattern with beats and hooks, in `Tropes/`. |
| **Trope instance** | A trope bound to one universe's people and places, with a twist and stakes. |
| **Ruleset** | A game system as data: stat schema, power function, off-stage resolution, progression. |
| **Omni power** | A 0-to-100 scale every ruleset maps its stats onto, so things from different systems can be compared. |
| **Dungeon** | An adventure site made of rooms, with a code, an entry and a derived map. |
| **Room** | One room of a dungeon: read-aloud, exits, encounters, traps, puzzles, secrets, loot. |
| **Home town** | The settlement a party stages from for a dungeon. |
| **Venue** | A tavern, shop, temple or other place inside a settlement a party can walk into. |
| **Bestiary** | A universe's monster stat blocks, referenced by rooms. |
| **Table** | A random table with a die and entries that cover it. |
| **Quest** | A chain of stages threading a town, a faction and a dungeon, with outcomes. |
| **Starter Kit** | A template instance with Session Zero, a three-session arc and pregens. |
| **Generated** | Files written by the tools from the notes (`_generated/`, `_timeline.md`, the schema reference, the app data). Never edited by hand. |
| **World index** | `_generated/world.json`: every note with its data, body, refs and backlinks. The world API. |
| **dmScreen** | The Android DM screen app in `Apps/dmScreen/`. |
| **Maintainer** | The owner of a path in `CODEOWNERS`; reviews changes to it. Universe maintainers own their universe; Omniverse maintainers own the core. |
| **DM skill** | The `omniverse-dm` skill for Claude that runs campaigns against this repository. |
