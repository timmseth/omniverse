---
title: Omniverse — Design Document
status: draft
version: 0.7
updated: 2026-11-05
owner: Seth
---

# Omniverse

**A collaborative, modular tabletop-RPG multiverse in git. Bring a universe, a ruleset, a trope pack or a campaign: plug it in, own it, extend it. Worlds stay still until someone plays them, and what matters gets merged back into canon.**

> Status: **Draft v0.7.** This document describes the design; the practical guides are in [`docs/`](docs/README.md) and [`CONTRIBUTING.md`](CONTRIBUTING.md). Two universes exist: Tropelandia (parody, D&D 5e, about 450 notes) and Ashfall (grim, Six Sides, a first town and a Rift). Each decision is tagged **[Decided]**, **[Proposed]** or **[Open]**. Section 22 collects everything still waiting on an answer.
>
> **New in v0.4:** the design is organised around collaborative, modular extensibility (section 5). The tick system is gone: worlds are event-sourced and static until events are merged. Playable timelines are *instances*, merged into canon with a *canon merge*. Adding a universe is a *Universe Join* (formerly Convergence). Section 17 covers campaigns and the DM skill.
>
> **New in v0.5:** dungeons are a shared content kind. A dungeon is a set of room notes (exits, read-aloud text, encounters, traps, puzzles, loot). A build tool validates them into one `dungeons.json`, and the **dmScreen** Android app reads that file and runs a dungeon like a DM screen (sections 9.4, 17.7 and 17.8). Anyone can submit a dungeon by pull request, and the app can sync everyone's dungeons from GitHub. Ten sample dungeons are in Tropelandia.
>
> **New in v0.7:** licensing is settled and enforced. The framework (schemas, tools, docs, app) is public domain; content is licensed per folder, with a `LICENSE.md` beside every universe, ruleset and the trope library and a checked `licence:` field in each manifest (`LICENSING.md` is the plain-English map; Seth's worlds are CC BY-SA 4.0). Quest layers let a room, venue, town or NPC carry details that only surface for an active quest, and dmScreen v1.2.0 runs them, plus a combat tracker, dice notation, a purse, a timer and session export in the repository's own session-note format.
>
> **New in v0.6:** the schemas are real: one YAML file per note kind in `_rules/schemas/`, a validator that reads them, and a generated Schema Reference. The world is machine-readable (`_generated/world.json`). Tropelandia has factions, hub towns, venues, NPCs, a bestiary, items, random tables, holidays, a dated history, a pantheon, cultures, languages, lore, a quest chain per dungeon and a Starter Kit. A second ruleset (Six Sides) and a second universe (Ashfall) with a Reality Rift to Tropelandia prove the system-agnostic, modular claims. CI validates every pull request; `CONTRIBUTING.md` and `docs/` explain how to join in. The first dmScreen APK is in the repository.

---

## Contents

1. Summary
2. Goals and non-goals
3. Design principles
4. Glossary
5. Modules and extension points
6. How the repository is organised: lore, events, state, generated
7. The layer model
8. Repository layout
9. Notes, IDs and schemas
10. Tropes: the shared library
11. Time
12. Timelines, instances and canon merges
13. People, population and promotion
14. Relationships and the nemesis system
15. Rulesets: bring your own system
16. The multiverse: universes, maintainers and joining
17. Playing: instances, campaigns and the DM skill
18. Planned universes
19. Tooling and automation
20. Scale and performance
21. Risks
22. Decisions log
23. Roadmap
- Appendix A: Example notes
- Appendix B: Example CODEOWNERS and CI checks

---

## 1. Summary

Omniverse is a shared fantasy setting stored as plain Markdown in a git repository and browsed in Obsidian. It is designed to be built by many people at once.

- **Collaborative.** Everyone owns something: a universe, a ruleset, a trope pack, a campaign. Contributions arrive as pull requests, and ownership is enforced by path, so people can work in parallel without stepping on each other.
- **Modular.** A small core defines schemas, module contracts and merge rules. Everything else is a *module* that plugs into published extension points: universes, rulesets, trope packs, generators, DM styles, views and importers (section 5).
- **Event-sourced and static by default.** The world is a log of events. State is whatever the log adds up to, and nothing changes until new events are merged. There is no background simulation. A universe that wants one can bring it as an optional module.
- **Played in instances.** To play, you make an *instance*: a divergent timeline that forks from a universe's canon and keeps its own log. What happens there stays there (apocrypha) unless it matters, and then you *canon merge* the chosen events into the universe.
- **A multiverse.** Many universes sit side by side under one set of rules. Anyone can build a universe and add it (a *Universe Join*), and they stay its maintainer.
- **Built from tropes.** A shared library of fantasy and RPG tropes sits at the top level, and each universe *instantiates* those tropes in its own way. The first universe, **Tropelandia**, plays them for laughs in a Munchkin-style parody where players can do anything: become the tower wizard's apprentice, join the bad guys, or become the chosen one's accountant.
- **Granular.** The hierarchy runs from the omniverse itself down to an individual person, and detail increases as you go down.
- **System-agnostic.** Each universe brings its own ruleset: a published system, a home-brew one, or the built-in minimal one. Tropelandia uses D&D 5e, but the Omniverse itself is tied to no game system.
- **A nemesis system and typed relationships.** Grudges, rivalries, mentors and families persist, and they change through events.
- **Git is the metaphysics.** An instance is an alternate timeline, a commit is history, a Universe Join adds a universe to the multiverse, a canon merge writes an instance into canon, and a conflict between them is a *Reality Rift*.

How the pieces fit:

```
Omniverse                core: schemas, module contracts, merge rules
├── Modules              rulesets · trope packs · generators · DM styles · views
└── Multiverse
    └── Universe         a module: lore + canon timeline (static until merged)
        └── Instance     a playable timeline: fork point + log + overlay
```

## 2. Goals and non-goals

### Goals
- **Anyone can extend the world** without asking the core's permission: write a module, publish it, own it, and let others build on it.
- **Anyone can play and contribute back:** run a campaign in an instance, then merge what matters into canon.
- **Modules compose.** A universe can mix a ruleset, a trope pack and a calendar from different authors, because they all meet at documented contracts.
- **One consistent canon.** Each universe has one history, and state can always be rebuilt by replaying its log.
- Tongue-in-cheek fun in Tropelandia, with room for serious and straight-faced universes elsewhere.
- As much granularity as possible, down to individual people, without making the world impossible to run.
- Everything readable and editable as plain text, with no hidden database.

### Non-goals (for now)
- A real-time game server or a graphical client. This is a text-and-files world.
- A background simulation on a schedule. Universes may bring one as an optional module; the core has none.
- Full combat simulation, under any ruleset, for every NPC. Offstage events use cheap resolution (section 15).
- A plugin runtime that executes contributed code. Modules are data (section 5).
- Hosting copyrighted book text. The project uses openly licensed rules content and original writing.

## 3. Design principles

1. **Small core, many modules.** The core defines contracts. Everything interesting is a module someone else can write.
2. **Collaboration by ownership.** Every module, universe and instance has an owner. Contributions are pull requests, and ownership is enforced by path.
3. **Extend, don't edit.** Modules add kinds, fields, events and hooks. They never change what a core field means. Where behaviour must differ, a module extends another and says what it overrides.
4. **Data, not code.** Modules are declarative. CI validates them and never executes them.
5. **Omniverse is serious; universes bring the personality.** The foundation is neutral and consistent. Tone, jokes and flavour belong to individual universes.
6. **Tropes are classes; universes hold the instances.** A trope describes an archetype. How it plays out (straight, parody, subverted) is decided where it is instantiated.
7. **The log is the truth.** Events are append-only. State is derived from them, and a universe is static until events are merged.
8. **Branch to play, merge to matter.** Play happens in instances. Anything unmerged is apocrypha, and canon only changes through a reviewed canon merge.
9. **One file per thing, with stable IDs.** Small files and namespaced IDs mean fewer overlapping edits and fewer merge conflicts.
10. **Hierarchy lives in data.** Each note records its parent, so the structure can change without breaking. Folders follow it for people's convenience.

## 4. Glossary

| Term | Meaning |
|---|---|
| **Omniverse** | The root of everything. Owns the core: schemas, module contracts and merge rules. |
| **Multiverse** | The shelf on which universes sit. |
| **Module** | A self-contained, versioned, owned folder with a manifest that plugs into a core extension point (section 5). |
| **Universe** | A complete, self-contained world with its own calendar, tone, ruleset, canon timeline and maintainer. A module, and the unit that is added to the multiverse. |
| **Universe Join** | A universe being added to the multiverse by pull request. |
| **Canon timeline** | A universe's accepted event log. Its latest date is the **frontier**. |
| **Instance** | A playable, divergent timeline of a universe: a fork point plus its own log and overlay. Not to be confused with a *trope instance*. |
| **Dungeon** | A self-contained adventure site made of rooms (a cellar, a tower, a lich's office). A note of `kind: dungeon` whose `parent` is the place that contains it. |
| **Room** | One keyed location in a dungeon: read-aloud text, exits, features, encounters, traps, puzzles, secrets and loot. A note of `kind: room`. |
| **DM screen** | The **dmScreen** companion app, which reads the dungeon index and presents a dungeon to the DM room by room. |
| **Dungeon submission** | A pull request that adds a dungeon to a universe, validated by the dungeon build tool. |
| **Fork point** | The place in canon's timeline where an instance diverges. |
| **Overlay** | The lore an instance adds or changes (characters, invented NPCs) without touching canon. |
| **Campaign** | The play record inside an instance: party, adventures, sessions. Usually one per instance. |
| **Adventure / session / scene** | An arc with a goal; one sitting; one continuous stretch of play. |
| **Canon / apocrypha** | Merged events are canon. Anything unmerged is apocrypha. |
| **Canon merge** | Merging an instance's chosen events into a universe's canon, as a pull request. |
| **Reality Rift** | A conflict that needs a maintainer's ruling, such as a canon merge whose "before" values no longer match canon. |
| **Layer / kind** | A level of the hierarchy (planet, city, person…), recorded in a note's `kind` field. |
| **Lore** | Human-written notes: descriptions, histories, intentions. |
| **Event** | An immutable record of something that happened, with an in-world date and the state changes it caused. |
| **State** | Current facts derived by replaying events. A cache that can be rebuilt. |
| **Generator** | An optional module that writes background events on demand. |
| **Census** | The head count and breakdown of "normals" in a place. |
| **Notable** | A named person with their own note. |
| **Promotion** | A normal becoming a notable because something significant happened to them. |
| **Trope** | A shared archetype in the library. |
| **Trope instance** | A specific thing in a universe that realises a trope. |
| **Ruleset** | The mechanical system a universe uses for its people, monsters, conflicts and progression. |
| **Omni power** | A shared 0–100 scale that every ruleset maps its entities onto, so events can cross rulesets. |
| **Omni day** | The absolute, universe-independent day counter used to order things across universes. |

## 5. Modules and extension points

### 5.1 The idea **[Decided]**
Omniverse is a small core plus modules. The core defines only the note and event schemas, the module manifest, the extension-point contracts and the merge rules. Everything that makes a world interesting or a game playable is a module that someone else can write, own, publish and combine with others.

Collaboration happens at module boundaries. Each module has an owner, contributions to it are pull requests, and ownership is by path.

### 5.2 Module kinds

| Module kind | What it adds | Lives in | Contract |
|---|---|---|---|
| **Universe** | A world: lore, calendar, canon timeline, tone | `Multiverse/<Universe>/` | Note schemas, calendar, clock, ruleset reference (section 16) |
| **Ruleset** | A game system | `Rulesets/<name>/` or inside a universe | Stat schema, power function, resolution, progression (section 15) |
| **Trope pack** | Archetypes with beats and hooks | `Tropes/` | Trope schema (section 10) |
| **Generator** | Optional background events, run on demand | `Generators/<name>/` or inside a universe | Reads state at a date; writes ordinary events with seeds recorded (section 12.8) |
| **DM style** | How the DM skill runs a universe: tone, pacing, house rules | `<universe>/_dm/` | A style file the DM skill reads (section 17.5) |
| **Schema extension** | Extra kinds or fields for a universe or ruleset | `<module>/_schemas/` | Namespaced fields; the core ignores what it does not know |
| **View** | Read-only queries and digests: rosters, timelines, rumour boards | `_rules/views/` or any module | Reads data, writes only `_generated/` |
| **Importer / exporter** | Brings data in or out (the SRD, other tools) | `_rules/importers/` or any module | Produces ordinary notes |
| **Instance** | A playable timeline of a universe | `<universe>/Instances/<name>/` | Log format and overlay rules (sections 12 and 17) |
| **Dungeon** | An adventure site made of rooms, submitted by anyone | `<universe>/Dungeons/<name>/` | Dungeon and room schemas, checked by the build tool (section 9.4) |
| **Companion app** | A client that reads published data and presents it at the table | `Apps/<name>/` | Reads generated indexes such as `_generated/dungeons.json`; never writes canon (section 17.7) |

### 5.3 Manifests
Every module carries a manifest in its frontmatter (`module.md`, or `_universe.md` for a universe):

```yaml
---
id: omniverse.ruleset.dnd5e
kind: ruleset
name: D&D 5e
version: 0.1.0
owner: seth
licence: CC-BY-4.0 (SRD content)
requires:
  omniverse-core: ">=0.4 <0.5"
extends: null
provides: [stat_schema, power_function, offstage_resolution, progression]
---
```

A module can build on another. This variant keeps everything from `dnd5e` and replaces only its offstage resolution:

```yaml
---
id: tropelandia.ruleset.dnd5e-silly
kind: ruleset
version: 0.1.0
owner: seth
extends: omniverse.ruleset.dnd5e
overrides: [offstage_resolution]
---
```

A new universe declares what it brings and what it needs:

```yaml
# Multiverse/Starfall/_universe.md (excerpt)
id: starfall
kind: universe
requires:
  omniverse-core: ">=0.4 <0.5"
  omniverse.ruleset.core: "*"
  starfall.tropes.space-opera: "^1.0"
adds_kinds: [starship, sector]
```

### 5.4 Composition rules
- **The core never depends on a specific module.**
- **A module depends only on core contracts** and on the modules it lists in `requires`.
- **Extension is additive.** Modules add kinds, fields, events, hooks and tables. They never change what a core field means.
- **Namespaces.** Fields and IDs a module adds carry its namespace (`dnd5e.*`, `starfall.*`), so independent modules cannot collide.
- **Versioned contracts.** The core and every module use semantic versions, and CI checks `requires` ranges.
- **Data, not code.** Modules are schemas, tables, formulas in a restricted expression language, prompts and style files. CI never runs contributed code. A module that truly needs code is proposed as an engine plugin and reviewed by Omniverse maintainers as part of the core.

### 5.5 How people collaborate
- **Ownership:** each module's owner is listed in its manifest and in `CODEOWNERS`.
- **Four ways to contribute:**
  - *Publish:* add a new module by pull request.
  - *Improve:* send a pull request to a module you do not own; its owner reviews it.
  - *Fork and extend:* make your own variant with `extends`, without needing anyone's permission.
  - *Compose:* a universe lists the modules it wants in `requires`.
- **Review:** the owner reviews changes to their module. Omniverse maintainers review only core and cross-module changes.
- **Discovery:** each module kind has a generated index listing modules, owners, versions, licences and status.
- **Licences:** every module declares one (`licence:` + `LICENSE.md` in its folder), and CI checks the declaration (`LICENSING.md`).

### 5.6 Extension points
These are the places a module can plug in:
- new **layer kinds**, with parent rules (a `starship` layer, a `sector` layer)
- new **relationship types** and **event types**, each with a schema and its effect on state
- **rulesets**, **calendars** and **trope packs**
- new **hook types** that trope instances can offer
- **generators** for optional background events
- **DM styles** and house rules for the DM skill
- **views** and **digests** that read the log
- **importers** and **exporters**
- extra **CI checks**, written as declarative rules

### 5.7 What this buys
Someone who wants a sci-fi universe does not touch Tropelandia, the core or anyone else's modules. They add a universe, a `starship` layer, a ruleset (or the Core one) and a trope pack, and declare what they need. A different contributor who likes their ruleset can extend it. Nobody had to ask permission, and nothing breaks if one module is removed.

## 6. How the repository is organised: lore, events, state, generated

Everything in the repository is one of four kinds of content.

| Kind | Written by | Examples | Rule |
|---|---|---|---|
| **Lore** | Humans (maintainers, players) | A planet's description, a person's backstory, a trope definition | Edited through pull requests. |
| **Events** | Humans, the DM skill (in instances), optional generators | "The Pie Contest Incident, 1489" | Append-only. One file per event. Corrections are new events. **This is the truth.** |
| **State** | Derived by replaying events | Where someone is, a settlement's head count, grudge intensities | A cache. Never hand-edited, and safe to delete and rebuild from the events. |
| **Generated** | Scripts and the narrator | "Previously on…" digests, rosters, timelines | Regenerated whenever the log changes. Do not edit. |

Because state and generated files are derived, there are only two things to write, review and argue about: lore and events.

## 7. The layer model

Every note has a `kind` and, except for the root, a `parent`. The layers below are the starting set. They are data, so new layers can be added later without restructuring anything.

| # | Layer (`kind`) | What it is | What it owns | Level of detail |
|---|---|---|---|---|
| 1 | `omniverse` | The root | Rules, engine, trope library, merge law | None. Configuration only. |
| 2 | `multiverse` | The shelf of universes | The universe registry, Universe Join history | None. |
| 3 | `universe` | A complete world | Calendar, tone, ruleset, canon timeline, maintainer | Clock and global events. |
| 4 | `plane` | A realm or plane (Material, Feywild, Shadowfell…) | Planar rules, time-flow rate | Planar events. |
| 5 | `galaxy` | A galaxy | A name and a container | Almost none. |
| 6 | `star_system` | A star and its worlds | Calendar-relevant facts, omens | Light and seasons. |
| 7 | `planet` | A world | Climate, ecology, magic level, calendar | Climate, large events. |
| 8 | `continent` | A landmass | Geography, trade routes | Migration, long wars. |
| 9 | `region` | A biome or borderland | Terrain, hazards, trope sites | Hazards, wandering threats. |
| 10 | `country` | A nation | Government, laws, currency, relations | Diplomacy, war, succession. |
| 11 | `province` | A political subdivision of a country | Local government | Taxes, local conflict. |
| 12 | `settlement` | A city, town or village | Districts, institutions, census | Economy, rumours, local events. |
| 13 | `district` | A neighbourhood *(optional)* | Local character | Local events. |
| 14 | `population` | The census of normals in a place | Head counts by stratum, mood | Growth, migration, promotion. |
| 15 | `household` | A family, guild, party or gang | Membership, shared goals | Group decisions. |
| 16 | `person` | An individual | Full detail: traits, goals, history, gear, relationships | Full: actions, aging, grudges. |

**Cross-cutting layers** do not sit in the tree but connect to it:
- **Tropes** (top-level library; instances in any layer).
- **Factions** (guilds, cults, empires, orders): span many places.
- **Events**: the log that touches everything.
- **Relationships**: links between people and factions.
- **Items and artefacts**: owned by people or located in places.

Two principles about the table:
- The levels are guidance, not a straitjacket. A person may belong directly to a region, and a settlement may sit directly under a planet.
- The "etc" levels you can see here (`plane`, `province`, `district`, `household`) are proposals. If they prove unnecessary they can be dropped without touching anything else.

## 8. Repository layout

**[Proposed]** The folder tree follows **containment**. A universe's folder contains its planes, which contain galaxies, then star systems, planets, continents, regions, and so on down to settlements, and each settlement's folder contains its people. Browsing the vault is the same as zooming in on the world.

```
Omniverse/                              (git repo root)
├── README.md                           this document
├── CONTRIBUTING.md                     how to contribute (short); docs/ has the long version
├── AGENTS.md · CLAUDE.md               entry points for LLMs and agents asked to contribute
├── LICENSE                             the framework is public domain (Unlicense)
├── LICENSING.md                        the map: framework vs content, one LICENSE.md per universe/ruleset/Tropes
├── CODEOWNERS                          who reviews which path (section 16)
├── .github/                            CI (validate, site), PR and issue templates
├── docs/                               guides: getting started, concepts, authoring, reference, governance
│   └── reference/Schema Reference.md   generated from _rules/schemas/
├── _rules/                             the core, maintained by Omniverse maintainers
│   ├── schemas/                        one YAML per note kind + _mixins.yaml; the validator reads these
│   ├── templates/                      copy-and-fill notes
│   ├── skills/                         SKILL.md files for LLM contributors (contribute, dungeon, town, review, dm)
│   ├── tools/                          validate, build_dungeons, build_world, build_timeline, build_maps,
│   │                                   schema_reference, build_site, build_all, new_universe, merge_instance
│   └── Submitting a Dungeon.md         the contributor guide for dungeons (section 17.8)
├── Rulesets/                           the shared ruleset library (section 15)
│   ├── Core/                           built-in minimal ruleset
│   ├── dnd5e/                          D&D 5e (SRD shapes, own text); _schemas/ defines the dnd5e stat block
│   └── Six Sides/                      a light d6 pool system; _schemas/ defines the six_sides stat block
├── Apps/                               companion apps (source and releases)
│   └── dmScreen/                       the DM screen Android app
│       └── releases/                   built APKs, one per version
├── _generated/                         root-level generated files (do not edit)
│   ├── world.json                      every note: data, body, refs, backlinks (the world API)
│   ├── dungeons.json                   every dungeon in one file, read by the app
│   ├── World Index.md, Backlinks.md, Dungeon Index.md, Maps.md, Maps/<Universe>.svg
├── Tropes/                             the shared trope library (50) and its index
└── Multiverse/
    ├── _registry.md                    list of universes, owners, status
    ├── Tropelandia/                    a universe (owner: timmseth)
    │   ├── _universe.md                manifest: tone, calendar, clock, ruleset, maintainers, version, requires, rifts
    │   ├── _timeline.md                generated: eras, events, instances
    │   ├── Calendar.md · Eras/ · Holidays/
    │   ├── Events/<in-world year>/     dated canon events with deltas
    │   ├── Factions/ · Pantheon/ · Lore/ (Cultures/, Languages/)
    │   ├── Bestiary/ · Items/ · Tables/ · Quests/
    │   ├── Dungeons/<Name>/            folder note + Rooms/
    │   ├── Trope Instances/
    │   ├── Instances/                  playable timelines; starter-kit is a template (section 12)
    │   ├── _state/                     derived cache of current state, rebuildable from Events/
    │   └── Material Plane/                         plane
    │       ├── Material Plane.md                   folder note (the plane itself)
    │       └── Gleamhaven/                         galaxy
    │           └── Mildew Sun/                     star system
    │               └── Tropos/                     planet
    │                   ├── Tropos.md
    │                   └── Mainland/               continent
    │                       └── Gently Haunted Marsh/   region
    │                           └── Duchy of Mildew/    country
    │                               └── Dampshire/      province (optional)
    │                                   └── Barrowdale/     settlement
    │                                       ├── Barrowdale.md
    │                                       ├── Districts/  (optional)
    │                                       ├── Households/
    │                                       ├── Venues/     taverns, shops, temples
    │                                       └── People/
    │                                           └── Marlowe the Mildly Menacing.md
    └── Ashfall/                        the second universe (grim, Six Sides), same shape
```

The conventions that make this work:

- **The space hierarchy is nested folders.** Universe → plane → galaxy → star system → planet → continent → region → country → province → settlement → district → people. Households and groups are not places, so each settlement has a `Households/` folder for them.
- **Levels can be skipped.** A universe with no planes, or a country with no provinces, just leaves that folder out. The `kind` and `parent` fields say what each thing is, so nothing depends on every level being present.
- **Every place has a folder note.** A place's folder holds a note with the same name (`Barrowdale/Barrowdale.md`) that describes the place itself.
- **People live in their home settlement's folder.** "Home" means where they were born or settled when created. Where someone is right now is state, and travel never moves a file. If someone permanently relocates, a maintainer may move their note, which git records as a rename.
- **`parent` stays authoritative.** The folder tree and each note's `parent` chain must agree, and CI checks it. Tools read `parent`, and the folders are for people.
- **Cross-cutting content sits outside the space tree.** Factions, trope instances, events, eras, state and generated files are not places, so they live beside it.
- **State is a cache.** Files in `_state/` are keyed by ID rather than nested, and they are derived from the event log, so they can be deleted and rebuilt at any time.
- **Mind the Windows path limit.** A full path to a person can get long. Keep folder names under about 24 characters, enable `core.longpaths` in git, and let CI warn when a path passes about 200 characters. Skipping optional levels also helps.
- **Everything for a universe lives inside its own folder.** That is what makes ownership by path enforceable (section 16).
- **`Events/` is sharded by in-world year** so no folder grows without bound.
- **The GitHub folder is currently the git repository,** and the Obsidian vault is mirrored into it. Decision P7 covers making the vault itself the repository.

## 9. Notes, IDs and schemas

### 9.1 IDs
Every note has a stable, unique `id`:

```
<universe>.<kind>.<slug>
omniverse.trope.wizard-in-a-tower
tropelandia.settlement.barrowdale
tropelandia.person.marlowe-the-mildly-menacing
```

- IDs never change after creation. Titles and filenames may.
- `parent` and every relationship refer to IDs. Obsidian wiki-links are used for human navigation alongside them.
- Everything a universe owns is namespaced by its universe slug, so two contributors can never collide on an ID.

### 9.2 Common frontmatter

```yaml
---
id: tropelandia.settlement.barrowdale
kind: settlement
name: Barrowdale
parent: tropelandia.region.the-gently-haunted-marsh
universe: tropelandia
from: { year: 112, era: tropelandia.era.age-of-mild-peril }   # when it came to exist
to: null                                                       # when it ceased to exist
tropes: [tropelandia.instance.tavern-quest-giver]
tags: []
---
```

- `from` and `to` are in-world dates in the universe's calendar. `to: null` means still existing.
- Kind-specific fields are layered on top (section 9.3).
- Each `kind` has a schema in `_rules/schemas/` **[Decided, done in v0.6]**: a YAML file naming the folder pattern, the id pattern, the mixins (`base`, `in_universe`, `dated`, `manifest`) and the fields with their types (`string`, `text`, `int`, `number`, `bool`, `any`, `id`, `ref` with allowed kinds, `enum`, `const`, `list of`, `map`, `when`, `dice`). `_rules/tools/validate.py` reads them, and `docs/reference/Schema Reference.md` is generated from them, so the schema, the check and the documentation cannot drift apart. A module adds kinds or fields with the same file shape in its own `_schemas/` folder; fields added to a core kind are namespaced (the `dnd5e` and `six_sides` stat blocks on a monster are the first examples). CI rejects notes that do not validate.

### 9.3 Kind-specific fields (examples)

**Settlement (lore):**
```yaml
kind: settlement
size_class: town            # hamlet | village | town | city | metropolis
ruler: tropelandia.person.mayor-bartholomew-pettigrew
districts: [tropelandia.district.the-crooked-lane]
```

**Settlement (state, `_state/settlements/tropelandia.settlement.barrowdale.yaml`):**
```yaml
census:
  total: 412
  strata: { farmers: 210, craftsfolk: 70, merchants: 38, guards: 20, clergy: 9, other: 65 }
  mood: weary
as_of: { year: 1489, day: 34 }
```

**Person (lore):** name, species, background, personality, goals, appearance, backstory, and a `stats:` block whose fields come from the universe's ruleset (for D&D 5e: class and level, ability scores, proficiencies).

**Person (state):** current location, hit points, conditions, gear, active goals, grudges held, and "last seen" facts.

**Event:** see Appendix A.

### 9.3a The world content kinds **[Decided, v0.6]**
Beyond places and people, a universe is made of these kinds, each with a schema and an authoring guide in `docs/authoring/`:

| Kind | What it is | Lives in |
|---|---|---|
| `venue` | A tavern, shop, temple, hall a party can walk into: keeper, services, read-aloud | `<Settlement>/Venues/` |
| `faction` | Guild, cult, court, company, union: goals, methods, assets, allies, rivals, dungeons, secret | `Factions/` |
| `monster` | A stat block, system-agnostic core (`threat` on the Omni scale) plus the ruleset's block (`dnd5e:`, `six_sides:`) | `Bestiary/` |
| `item` | A notable object: type, rarity, description, mechanics, curse, history | `Items/` |
| `table` | A rollable table whose entries cover its die (the validator checks); entries can `ref` monsters and items | `Tables/` |
| `quest` | A chain of stages threading a town, a faction and a dungeon, with `on_success` and `on_failure` | `Quests/` |
| `holiday` | A day on the calendar with customs and hooks | `Holidays/` |
| `deity`, `culture`, `language`, `lore` | The pantheon, peoples, tongues, and myths/legends/history/songs with a `truth` rating for the DM | `Pantheon/`, `Lore/` |

Rooms reference monsters and items by id; the build tool copies the numbers into `dungeons.json` so the app shows them. Every dungeon has a `home_town`, `factions` and a quest, so nothing floats.

### 9.3b The world index **[Decided, v0.6]**
`_rules/tools/build_world.py` writes `_generated/world.json`: every note with its frontmatter, body, outgoing references and incoming references, plus `World Index.md` and `Backlinks.md`. It is the world API: apps, skills and views read it instead of parsing Markdown. `dungeons.json` remains the app's dungeon feed.

### 9.4 Dungeons and rooms **[Decided, v0.6]**
A dungeon is a folder of notes, kept beside the space tree because it belongs to the universe rather than to one place. Its `parent` names the place that contains it, so it can be found from the map, while the folder stays short (this matters on Windows, see section 20).

```
Multiverse/Tropelandia/Dungeons/The Cellar of Rats/
├── The Cellar of Rats.md        kind: dungeon  (summary, hooks, rumours, wandering table, entry)
└── Rooms/
    ├── RAT-01 Cellar Stairs.md  kind: room
    ├── RAT-02 Barrel Hall.md
    └── …
```

**Dungeon note:**
```yaml
id: tropelandia.dungeon.cellar-of-rats
kind: dungeon
name: The Cellar of Rats
code: RAT                          # short unique prefix for room file names
parent: tropelandia.settlement.barrowdale   # the place that contains it
universe: tropelandia
ruleset: omniverse.ruleset.dnd5e
level_range: [1, 2]
tone: gentle parody
tags: [tutorial, urban, rats]
entry: tropelandia.room.cellar-of-rats.01-cellar-stairs
tropes_involved: [omniverse.trope.kill-ten-rats]
summary: …                          # two or three evocative sentences
hooks: […]                          # reasons a party goes in
rumours: […]                        # what the tavern says
wandering: { die: d6, entries: ["1: …", "2: …"] }
author: seth
status: sample                      # sample | draft | playtested | canon
```

**Room note:**
```yaml
id: tropelandia.room.cellar-of-rats.02-barrel-hall
kind: room
name: Barrel Hall
number: 2
code: RAT-02
parent: tropelandia.dungeon.cellar-of-rats
dungeon: tropelandia.dungeon.cellar-of-rats
light: dim
size: 30 x 20 ft
exits:
  - { dir: n, to: tropelandia.room.cellar-of-rats.01-cellar-stairs, kind: archway, state: open, note: "" }
  - { dir: e, to: tropelandia.room.cellar-of-rats.03-cold-pantry, kind: door, state: stuck, note: "Swollen with damp (DC 12 Str)" }
read_aloud: "A long, low hall lined with barrels on their sides…"   # what the DM reads to the table
features: ["Barrels, some empty, some not"]
encounters:
  - name: Rat patrol
    monsters: [{ name: Giant rat, count: 4, hp: 7, ac: 12, attack: "bite +4, 1d4+2" }]
    tactics: "…"
traps:    [{ name: Falling net, trigger: "Lifting the cheese", effect: "…", detect_dc: 13, disarm_dc: 12 }]
puzzles:  [{ name: The Negotiation, description: "…", solution: "…", hints: ["…"], reward: "…" }]
secrets:  [{ description: "…", dc: 14 }]
loot:     ["35 gp in the strongbox"]
dm_notes: "…"
```

The rules:
- **Exits.** Directions are `n s e w ne nw se sw u d`, plus `out` for a way out of the dungeon (`to: outside`). Every exit between two rooms must have a matching exit coming back (`n` pairs with `s`, `u` with `d`). Kinds: `door archway passage stairs ladder secret portal hatch`. States: `open closed locked stuck barred trapped hidden rubble`.
- **Layout.** The map is derived, not authored. The build tool places the entry room at the origin and follows the exits, so the exits must describe a consistent grid (`u` and `d` change floor). Two rooms in one cell, or a room reached by two inconsistent paths, is an error.
- **Reachability.** Every room must be reachable from the entry.
- **Numbers.** DCs, hit points and counts are integers, so the app can track them. Stat values follow the dungeon's ruleset and are sample values until the ruleset is imported.
- **Body text.** The note body is optional and free-form; the frontmatter is authoritative. The sample dungeons have a generated readable body so they browse well in Obsidian.
- **Tropes.** `tropes_involved` links to trope notes, so a trope's backlinks list the dungeons that use it.

**The build tool** (`_rules/tools/build_dungeons.py`) reads every dungeon and room note, checks the rules above, and writes `_generated/dungeons.json` (the file the app reads) and `_generated/Dungeon Index.md`. With `--check` it validates only, which is what CI runs on pull requests. It reads data and executes nothing found in a note.

## 10. Tropes: the shared library

### 10.1 What a trope note is
A trope lives in the top-level `Tropes/` folder. It defines an archetype in neutral terms, with no jokes and no setting.

```yaml
---
id: omniverse.trope.wizard-in-a-tower
kind: trope
name: Wizard in a Tower
aliases: [Reclusive Archmage]
roles: [mentor, quest_giver, antagonist, hermit]
beats:
  - The wizard is secluded, powerful and eccentric.
  - Visitors must cross a trial, a riddle or a staircase to be received.
  - The tower holds secrets, dangerous experiments and a library.
hooks:
  - apprentice_to_wizard
  - burgle_the_tower
  - deliver_a_package_to_the_tower
  - become_the_wizard_nemesis
required_in_instance: [twist, stakes, hooks_offered]
---
```

The body of a trope note can list common variations, related tropes, and typical story functions.

### 10.2 What an instance is
An instance lives in a universe and says: *here is the trope, in this place, played this way.*

```yaml
---
id: tropelandia.instance.marlowe-tower
kind: trope_instance
instance_of: omniverse.trope.wizard-in-a-tower
bound_to:
  person: tropelandia.person.marlowe-the-mildly-menacing
  place: tropelandia.landmark.marlowes-rented-tower
tone: parody
twist: >
  The tower is a rented studio flat with a spiral staircase that violates
  several fire codes. The wizard is perpetually behind on rent.
stakes: Eviction, followed by the tower's unpredictable return to the astral plane.
hooks_offered: [apprentice_to_wizard, deliver_a_package_to_the_tower, help_marlowe_with_his_landlord]
---
```

### 10.3 Why this split
- **The joke is in the instance.** The same trope can be played straight in one universe, grimdark in another, and absurd in Tropelandia.
- **Instances carry the required fields** (twist, stakes, hooks offered) so tools and generators can read them reliably. The trope defines which fields are required.
- **Backlinks are the index.** A trope's backlinks list every instance across the multiverse with no extra bookkeeping.
- **Tropes generate the world.** When seeding a region, the generator can ask for "a dark lord and a farm boy" and create instances with the tone of the target universe.
- **Hooks are what players can do.** A hook is a named, reusable prompt for player action ("join the bad guys"). The trope defines the hook; the instance decides whether to offer it and how.

### 10.4 Tropelandia's approach
Tropelandia treats tropes as raw material for caricature, in the spirit of Munchkin. Everything is tongue-in-cheek, no setting takes itself seriously, and players are free to explore: the world should always have a funny, workable answer to whatever a player decides to try.

## 11. Time

Time is a cross-cutting layer. Everything in the hierarchy exists in it.

### 11.1 Per-universe clocks **[Decided]**
Each universe has its own calendar. The Omniverse keeps only a shared **omni day**, an absolute day counter used to order things across universes.

```yaml
# Multiverse/Tropelandia/_universe.md
clock:
  calendar: tropelandia.calendar.standard
  epoch_omni_day: 0            # omni day on which this universe's year 1 began
```

### 11.2 Calendars
A calendar note defines month names and lengths, weekday names, year numbering, era names and the leap rules. Forgotten Realms gets its own year-reckoning, Tropelandia can invent something silly, and a sci-fi universe could use stardates.

### 11.3 Eras
Eras are named spans (`Age of Mild Peril`) with a start, an end and a short summary. Events and entities reference an era for context.

### 11.4 Lifespans
Every entity carries `from` and `to` dates. That makes questions like "who ruled Cormyr in 1358?" and "what stood here before the war?" into simple queries.

### 11.5 Events are the timeline
The timeline is the event log. Each event has an in-world date and links to its places and participants. Obsidian can show it chronologically. It grows only through merged events (section 12).

### 11.6 Git time versus story time
Commits record when a change was *made*. Event dates record when something *happened in the story*. Keeping them separate allows backfilling history (for example, writing events from a century ago) without falsifying the commit date. Git tags can snapshot "the world as of this event", and an instance is an alternate timeline (section 12).

### 11.7 Time differences between places
A plane can have its own time-flow rate. A character who spends a "day" in the Feywild can emerge years later in the Material Plane. This is expressed as a rate on the plane, applied to anyone who crosses.

### 11.8 Reconciling clocks at a Universe Join
When a universe joins, the Universe Join event records the mapping between its calendar and the omni day. Cross-universe travel and events use that mapping.

## 12. Timelines, instances and canon merges

### 12.1 Static by default **[Decided]**
A universe does not change on its own. There is no scheduled simulation. Its canon only moves when events are merged into it, whether they come from its maintainer, from contributors, or from an instance's canon merge. Between merges the world is exactly as its log says.

### 12.2 The event log is the truth
State is derived. The state of anything at any date is the result of replaying the log up to that date. The cached state files in `_state/` are an optimisation and can be rebuilt at any time.

An event carries:
- an `id`, an in-world date (`when`), a place (`where`) and `participants`
- a `type` and a `severity`, from 0 (trivial) to 5 (world-changing)
- `deltas`: the state changes it causes, each with the value before and the value after
- `visibility`: `public` or `private`
- `canon`: `local`, `proposed` or `canon`
- `source` and credit: who or what wrote it (`maintainer`, `instance:<name>`, `generator:<name>`)

```yaml
deltas:
  - entity: tropelandia.person.dame-rosalind-quickblade
    field: relationships.pie-heist.person.tess-underbough
    from: null
    to: { type: grudge, strength: 40 }
```

The "before" value is what makes merging safe. An event applies only if the world is still the way the event assumed it was.

### 12.3 The canon timeline and the frontier
A universe's canon timeline is the ordered log in its `Events/` folder. The date of its latest event is the **frontier**. A new universe is simply backfilled history up to a chosen frontier.

### 12.4 Instances **[Proposed]**
An **instance** is a divergent timeline of a universe: a fork point in canon, plus a log and an overlay of its own. It is where a campaign is played. An instance does not copy the world, it stores only its differences. Reading the world inside an instance means canon up to the fork point, then the instance's events, then its overlay on top.

An instance is not a *trope instance*, which is the realisation of a trope in a universe (section 10).

```
Multiverse/Tropelandia/
├── Events/<year>/                 the canon timeline
├── _timeline.md                   generated: frontier, fork points, merged instances
└── Instances/
    └── pie-heist/
        ├── _instance.md           fork point, status, players, maintainer
        ├── Campaign.md            the campaign: adventures index
        ├── log/                   sessions and events in the standard format (section 17)
        ├── Overlay/               new or changed lore: your characters, invented NPCs
        └── _state/                derived cache, rebuildable
```

The rules for an instance:
- **It writes only inside its own folder.** Canon is never touched.
- **Its IDs are namespaced with its slug** (`pie-heist.person.tess-underbough`), so they never collide with canon or with other instances.
- **One campaign per instance by default.** A maintainer may let one instance host several parties, such as a community table.
- **It can live in a personal fork** (private or public), or upstream under the universe's `Instances/` folder as a public instance that others can join.

```yaml
---
id: pie-heist
kind: instance
name: The Pie Heist
parent: tropelandia
universe: tropelandia
fork_point: { event: tropelandia.event.1489-0034-the-pie-contest-incident, year: 1489, day: 34 }
status: active
visibility: private        # private | public
maintainers: [seth]
---
```

### 12.5 Fork anywhere **[Proposed]**
Because state is the replay of a log, an instance can fork at any past date, not only at the frontier. A campaign set in 1450 simply replays canon up to 1450. The cost shows up at canon merge: the older the fork, the more later canon the new events must stay compatible with.

### 12.6 Canon merge **[Decided]**
A **canon merge** takes events from an instance and merges them into the universe's canon. It is a pull request titled `Canon merge: <adventure>`.

1. **Choose.** The usual unit is an adventure, and events can be cherry-picked. Only `public` events travel. The DM skill suggests what to merge.
2. **Build.** The skill copies the chosen events into the universe's `Events/<year>/` with `source: instance:<name>` and credit. It also brings the lore they need: new NPCs, new places, and any characters being retired into the world. It rewrites their IDs from the instance namespace into the universe's.
3. **Replay in CI.** Events are inserted in world-date order, and every "before" value must match the state at that point in canon. A mismatch is a Reality Rift (section 16.6).
4. **Review.** The universe maintainer, acting as that universe's DM, approves, edits or rejects.
5. **Merge.** Canon's frontier moves forward, and the adventure appears on the timeline with its party credited.
6. **Rebase.** Other instances can replay their logs on the new canon. Events that no longer apply are flagged.

An event is a candidate for canon merge when it has any of these: severity 3 or higher; a named notable killed, created or changed sides; a ruler or owner changed; a place founded or destroyed; a faction relation flipped; a nemesis created or promoted; a trope instance's beat resolved; or the party crossed universes. The skill suggests, and the player decides.

### 12.7 Timeline view
`_timeline.md` is generated from the logs. It shows canon as the trunk, each instance as a branch from its fork point, and merged adventures marked. Instances that never merge remain alternate timelines.

### 12.8 Optional generators
Some universes will want background activity: seasons, politics, a rival's schemes. That is a module, not part of the core.
- A **generator** is a declarative module (event tables, rules, or a prompt for the DM skill's `turn` command) that is run on demand.
- It reads state at a date and writes ordinary events with `source: generator:<name>` and its seed recorded.
- It runs inside an instance, for example to cover a time skip. Its output is reviewed like any other event.
- A universe that wants something scheduled can bring that as a module too. The core has no schedule.

### 12.9 Narration
An optional narrator reads the log and writes prose into `_generated/`: chronicles, tavern gossip, rumour boards and "previously on…" digests. It cannot change the log.

## 13. People, population and promotion

### 13.1 Two kinds of people
- **Notables** are named people with their own note and state: heroes, villains, rulers, innkeepers with a past. Everyone you can name is a notable.
- **Normals** are everyone else, tracked as counts in each place's census by stratum (farmers, merchants, guards…).

This keeps the world full without a file for every peasant.

### 13.2 Promotion
Something remarkable happens to one of the 412: they survive a dragon attack, win a duel, or become the unlikely hero of a festival. A promotion removes one from the census count, creates a new person note, and logs a Promotion event. It is written by the DM skill, a generator or a human. From then on the world remembers them.

Promotion triggers are rules, for example:
- surviving an event above a severity threshold
- being the target of a notable's grudge
- crossing a deed or reputation threshold
- being chosen by a trope beat ("the prophecy needs a farm boy")

### 13.3 Fading
Notables who have had no events and no active relationships for a long time can *fade*: they are archived (flagged, not deleted) and may be returned to the census count. Notes are never deleted from history.

### 13.4 Rosters
Each universe's `_generated/` folder holds rosters: who is notable, where they are, and what they are doing. These are rebuilt from the log whenever it changes.

## 14. Relationships and the nemesis system

### 14.1 Relationships
Relationships are typed, directional edges between people and factions.

| Family | Types |
|---|---|
| Kin | parent, child, sibling, spouse, ancestor |
| Social | friend, rival, mentor, apprentice, companion |
| Economic | employer, employee, debtor, creditor |
| Allegiance | member_of, leader_of, sworn_to, enemy_of |
| Romantic | partner, ex, admirer |
| Hostile | grudge, vendetta, nemesis |

```yaml
- type: rival
  with: tropelandia.person.dame-rosalind-quickblade
  since: { year: 1489, day: 34 }
  strength: 62          # 0–100
  cause_event: tropelandia.event.1489-0034-the-pie-contest-incident
```

Stable relationships (family) live in lore. Changing ones live in state. The tooling keeps both ends of an edge consistent.

### 14.2 Grudges and the nemesis system
Grudges are records of intensity, cause and history between two parties. Intensity moves with events:

- **Increases** after defeat, humiliation, betrayal or loss.
- **Decays** slowly with time and separation.
- **Ladder:** below about 20 is annoyance, 20–50 rivalry, 50–80 vendetta, above 80 nemesis. Each rung unlocks behaviour: seeking out, sabotaging, hiring allies, posting bounties.

When a notable defeats a player character or another notable, they can be **promoted**: they gain rank, a title, better gear drawn from the fallen foe's inventory, and *memory* of what happened (a line they remember, a scar, a nickname). Next time the pair meet, the record shapes the encounter. Nemeses escape, return stronger, get rivals of their own, and can reconcile or be reconciled by events.

Grudges change through events: a defeat, an insult, a betrayal, a rescue. Nothing changes while no one is playing, unless a universe adds an optional generator for long time skips (section 12).

## 15. Rulesets: bring your own system

### 15.1 The principle **[Decided]**
The Omniverse is not tied to any game system. Every universe declares a **ruleset**: the mechanical system that governs its people, monsters, conflicts and progression. A universe can use a published system, a home-brewed one, or the built-in minimal ruleset. Tropelandia uses D&D 5e; another universe might use something entirely different.

The core (clocks, census, events, relationships, nemeses) never mentions any specific system. It talks to rulesets only through the small contract below.

### 15.2 What a ruleset provides
A ruleset answers a fixed set of questions for the engine:

| Question | What the ruleset supplies |
|---|---|
| What does a person or creature look like? | A **stat schema**: the fields in the `stats:` block of a `person` note, validated by CI. |
| How strong is something? | A **power function** that maps an entity's stats to the Omni power scale (14.4). |
| Who wins offstage? | **Offstage resolution**: a formula or table that, given the parties and a context, produces an outcome (win, lose, flee, injured, killed, scarred). |
| How do people progress? | **Progression** rules: how events grant experience, levels, ranks, injuries or aging. |
| What can happen to a body? | A **conditions and injuries vocabulary** used by events and the nemesis system (for example, scars). |
| What are things called? | A **terminology map** (for example, "level" versus "rank", "hit points" versus "stress"). |
| How do characters cross over? | An **import mapping** to and from the Omni power scale and, where possible, other rulesets. |

### 15.3 Rulesets are data, not code **[Proposed]**
Consistent with the safety rule in section 16.5, a ruleset is declarative: schema files, tables, and formulas written in a small, restricted expression language that the engine interprets. CI never executes code from a ruleset.

If a system cannot be expressed that way, its author can propose an **engine plugin**. Omniverse maintainers review it as part of the engine, not as universe content.

### 15.4 The Omni power scale **[Proposed]**
So events can cross rulesets (a traveller from one universe in another, or a Universe Join that mixes casts), every ruleset must map its entities onto a shared **Omni power scale**, 0 to 100 and roughly logarithmic.

- Inside a universe, offstage resolution uses the universe's own ruleset formula.
- Across universes, the engine falls back to Omni power with a single seeded roll:

```
p(A wins) = 1 / (1 + 10^((P_B - P_A) / k))
```

with `k` tuned in play.

- A character who crosses into a universe with a different ruleset is converted through the destination ruleset's import mapping. Until then, they take part at their Omni power.

### 15.5 The built-in Core ruleset
For universes that do not want a game system, or have not chosen one yet, the engine ships a minimal ruleset: a few descriptive attributes, a 1 to 10 rank, and a handful of injury states. It is enough for the core to run, and a universe can move to a fuller ruleset later.

### 15.6 Onstage versus offstage
- **Onstage:** when a player is involved, or a scene is flagged as important (a nemesis duel, a siege), the scene is played using the universe's ruleset by its table or DM, and the result is recorded as an event.
- **Offstage:** when something happens away from the table (a generator covering a time skip, or a DM resolving a distant event), it is resolved cheaply using the ruleset's formula and one seeded roll, and the outcome is written as an event.

Either way, the result reaches the core as an ordinary event, whichever system produced it.

### 15.7 Where rulesets live
- **`Rulesets/`**: the shared library, like `Tropes/`. It holds Core and any ruleset contributed for general use. Omniverse maintainers own it, and each ruleset declares its licence.
- **`Multiverse/<Universe>/_ruleset/`**: a ruleset local to one universe, for home-brew systems. Its universe maintainer owns it.
- A universe selects its ruleset with the `ruleset:` field in `_universe.md`.

### 15.8 The D&D 5e ruleset
Tropelandia (and later the Forgotten Realms universe) use the `dnd5e` ruleset. The package contains:

- **Stat schema:** ability scores and modifiers, proficiency bonus by level, skills, saves, classes and subclasses, species, backgrounds, hit points, armour class, alignment, level versus challenge rating.
- **Monsters:** full stat blocks as templates (actions, traits, resistances, legendary actions). A monster template is the "class" and a specific goblin is the "instance", matching the trope model.
- **Spells and items:** level, school, components, range, damage and save; rarity and attunement for items.
- **Tables:** conditions, damage types, travel pace, resting, XP thresholds, encounter budgets and treasure.
- **Power function:** level or CR plus gear, mapped to Omni power.
- **Offstage resolution and progression:** a 5e-flavoured formula, with XP and level changes following the normal 5e tables.

**Source of truth.** The package is built from the official SRD, published by Wizards of the Coast under a Creative Commons licence (CC-BY 4.0 for the SRD 5.1 and the revised SRD). It is imported as data rather than typed from memory, and the required attribution lives inside the ruleset package. The exact attribution text will be verified before import. Non-SRD book content is not reproduced.

**[Open]** Whether `dnd5e` follows the **2014** or **2024** rules. They differ in classes, species, backgrounds and some stat blocks. This is a decision for the ruleset and for Tropelandia, not for the Omniverse. One edition is chosen as the base and the other can be a variant.

### 15.8a The Six Sides ruleset **[Decided, v0.6]**
`Rulesets/Six Sides/` is an original light system (four traits rated in d6, hits on 5 or 6, harm boxes, Edge, Moves), written to prove the system-agnostic claim in data rather than prose. It declares its `stat_mapping` to and from `dnd5e` and onto the Omni scale, and its `_schemas/monster.yaml` defines the `six_sides` block that a monster note carries. Ashfall uses it; its bestiary and NPCs are written in that shape, and the dungeon build tool reads either block to give the app hp-like and defence-like numbers.

### 15.9 Licensing **[Decided, v0.7]**
Each ruleset declares `licence:` (an SPDX-style id from the list in `LICENSING.md`) and, when the licence asks for credit, `attribution:`, and carries a `LICENSE.md` beside its manifest; the validator checks all three agree. Home-brew and original systems are welcome (Six Sides is CC BY-SA 4.0). A published system needs an open licence (the SRD is CC BY 4.0, with its credit line reproduced in `Rulesets/dnd5e/LICENSE.md`) or the publisher's permission, recorded as `other` plus `licence_url`. The Omniverse core itself contains no third-party game-system content.

## 16. The multiverse: universes, maintainers and joining

### 16.1 The model **[Decided]**
Anyone can **pull-request their world into the multiverse and become the maintainer of their universe.**

| Role | Owns | Can do |
|---|---|---|
| **Omniverse maintainers** | `_rules/`, `Tropes/`, `Multiverse/_registry.md`, `Multiverse/_events/`, CI and the engine | Approve new universes, change shared rules, resolve Reality Rifts, archive or remove a universe (for example for safety or IP reasons). |
| **Universe maintainers** | Everything under `Multiverse/<their universe>/` | Set tone, canon, calendar and ruleset; review canon merges from instances; accept or reject player pull requests; pause or archive the universe; appoint co-maintainers. |
| **Players / contributors** | Their own contributions | Submit pull requests to a universe, create characters, play. |

A universe maintainer is effectively the DM of their universe.

### 16.2 How a universe joins
1. **Build** the universe from the template in `_rules/templates/universe/`, in a fork. It must include a `_universe.md` (declaring its ruleset), a calendar, a clock and at least one populated place.
2. **Open a pull request** titled `Universe join: <Universe>`. It may only add files under `Multiverse/<Universe>/` and one line in the registry.
3. **CI checks** (section 16.5): schema validity, unique IDs, namespacing, calendar and clock present, path scope, no executable content, attribution for third-party material.
4. **Review** by Omniverse maintainers, covering fit with the shared rules, content standards and IP.
5. **Merge.** A Universe Join event is written to the multiverse event log, the universe is added to the registry, its omni-day mapping is recorded, and the author is added to `CODEOWNERS` as its maintainer.

### 16.3 After joining
- The maintainer's later pull requests that touch **only their own universe path** pass through the CI checks and merge without Omniverse maintainer review.
- Pull requests touching anything **outside** the universe path (shared rules, tropes, other universes) need Omniverse maintainer approval.
- Players contribute to a universe by pull request to it, and the universe maintainer reviews and merges, as a DM would.

### 16.4 A note on GitHub permissions
GitHub does not support per-folder write permissions natively. The design therefore relies on three things together:
- **Fork-and-pull-request** for all contributors.
- **`CODEOWNERS`** to route review of each path to its maintainer.
- A **path-guard check** that verifies a pull request only touches paths its author owns, and lets those auto-merge once all checks pass.

**[Proposed]** Alternatively, a universe can live in its own repository and be pulled into the Omniverse as a submodule or subtree, which gives the maintainer full control of their repo at the cost of more machinery (decision P3).

### 16.5 Security and safety checks
Since contributors are trusted only within their own folder, CI must treat contributions as **data, never code**:
- Validation reads files and never executes anything from a universe.
- Pull requests may not change workflows, `_rules/engine/`, `CODEOWNERS`, or other universes without maintainer approval.
- Third-party IP (for example Forgotten Realms material) must declare its source and licence.

### 16.6 Reality Rifts
A **Reality Rift** is a conflict that a path-guard cannot resolve on its own: a canon merge whose "before" values no longer match canon, two universes claiming the same trope slot, a shared rule change that breaks a universe, or a cross-universe event that contradicts canon. The owner of the affected module rules on it. For a canon merge that is the universe maintainer, and for shared modules it is the Omniverse maintainers. They can pick one version, keep both as variants, or ask for a rewrite. **[Open]** whether this is one person's call or a vote (decision P5).

### 16.7 Universes between merges
A universe is static between merges. Its maintainer decides what gets merged and can pause or archive it. A universe whose maintainer has left becomes *dormant*: it accepts no merges, but it stays readable and can still be played in instances, until someone adopts it.

### 16.8 Other cross-universe events
- **Schism:** a universe splitting into two, recorded as a branch event.
- **Portals / crossovers:** travel between universes uses the clock mapping recorded at the Universe Join, and requires both maintainers' agreement. Characters moving between universes with different rulesets are converted through the Omni power scale (section 15.4).

## 17. Playing: instances, campaigns and the DM skill

### 17.1 How a player joins **[Proposed]**
1. **Pick a universe.** Each has its own tone, ruleset and maintainer.
2. **Create an instance.** Choose a fork point (the frontier by default). The DM skill reads what is going on near it, offers a few recommended starting scenarios to choose from (or takes your own idea), makes the folder, pins the fork point, and writes a "Previously on…" digest.
3. **Create characters** in the instance's overlay, using the universe's ruleset, plus a hook from the trope instances on offer.
4. **Play.** Sessions run with Claude as DM, or with a human DM and Claude as scribe. Everything is written to the log.
5. **Canon merge what matters.** When an adventure affects the world, merge it upstream (section 12.6).
6. **Be remembered.** A merged adventure is credited on the timeline, a retired character can join the world as a notable, and nemeses you created keep their grudges for the next party.

### 17.2 Structure
**Campaign → adventure → session → scene → event.**
- An **adventure** is an arc with a goal and an ending. It is the usual unit of canon merge.
- A **session** is one sitting, and each session is one log file.
- A **scene** is a continuous stretch of play in one place.
- An **event** is the atom. It uses the same schema as a world event (section 12.2), so merging it into canon is a copy, not a rewrite.

### 17.3 The log format
A session log is Markdown with structured frontmatter and a narrated body. A validator checks the frontmatter, and every ID must resolve.

```yaml
---
id: pie-heist.session.01
kind: session
parent: pie-heist.campaign
campaign: pie-heist
adventure: steal-the-trophy
session: 1
real_date: 2026-11-04
world_date: { year: 1489, day: 36 }
party: [pie-heist.person.tess-underbough]
events:
  - id: pie-heist.event.s01-e01
    type: recruitment
    where: tropelandia.settlement.barrowdale
    participants: [pie-heist.person.tess-underbough, tropelandia.person.marlowe-the-mildly-menacing]
    severity: 1
    visibility: public
    canon: local
    deltas:
      - { entity: tropelandia.person.marlowe-the-mildly-menacing, field: apprentices, from: [], to: [pie-heist.person.tess-underbough] }
rolls:
  - { seed: 8841, what: Persuasion against the Mayor's suspicion, result: "d20=17 vs DC 15" }
---
```

Below the frontmatter come the narration, the hooks left open, and loot and XP.

### 17.4 Visibility and secrets
Every event is `public` or `private`. DM secrets and knowledge only some players have stay `private`, and private events can never be merged upstream. A campaign can stay entirely private.

### 17.5 The DM skill
A Claude skill kept in the repo (`_rules/skills/omniverse-dm/SKILL.md`), so every contributor runs the same one. Universes can add a **DM style** (a module) so Tropelandia plays as parody.

| Command | What it does |
|---|---|
| `new` | Create an instance: pick a universe and fork point, then **prompt for a starting scenario with recommendations** (3 to 4 options drawn from open trope hooks, live grudges, unresolved canon events and troubled factions, plus "surprise me" and "my own idea"), build characters under the universe's ruleset, write the first digest. |
| `play` | Run the table. Load context by zooming through the hierarchy (the scene, then its settlement, notables and relationships) so the whole world is never loaded. Adjudicate with the ruleset, roll with logged seeds, and write each consequential fact as it happens. |
| `recap` | Summarise the story so far from the log. |
| `turn` | Run a generator across a time skip, if the universe has one. |
| `wrap` | Write the session log, validate it, update the cache, and score the world impact. |
| `propose` | Build a canon merge pull request from an adventure's public events. |

It works in two modes: **DM mode**, where Claude runs the game, and **scribe mode**, where a human DM runs the table and Claude keeps the log.

The skill follows these rules:
- State comes from the files, never from memory.
- Anything that matters is written down immediately, including every invented NPC, which gets a proper note and ID.
- Dice are seeded, and the seed is logged.
- It never touches canon. Only a canon merge does.

Its extension points are DM styles, house rules and ruleset adapters, all modules.

### 17.6 Legacy and credit
A canonized adventure appears on the universe's timeline with its party credited. Retired characters can be added to the world as notables that other parties meet. Nemeses created in an instance keep their grudges, rank and memories once merged, and can show up in other campaigns.

### 17.7 Running a dungeon: the DM screen app **[Proposed]**
**dmScreen** is an Android app that reads `_generated/dungeons.json` and presents a dungeon the way a game master actually uses one at the table. It is a companion app in the sense of section 5: a client that reads published data and never writes canon.

**What it shows**
- **Library.** Every dungeon, with its place, level range, tone, tags and room count, searchable and filterable.
- **Dungeon overview.** Summary, hooks, rumours and a wandering-encounter roller.
- **Map.** A schematic map derived from the exits, one floor at a time, with the party's position, visited and cleared rooms marked.
- **Room card.** The room as a DM wants it: read-aloud text first and large; then exits (tap one to move the party through it, with its state: locked, stuck, hidden); features; encounters; traps; puzzles; secrets; loot; DM notes.
- **Running tools.** Hit-point trackers for each monster in an encounter, checklists for traps, puzzles, secrets and loot, puzzle hints that reveal one at a time with the solution hidden behind a tap, a dice roller, and per-room notes.
- **Session memory.** The run (position, visited rooms, cleared encounters, doors unlocked, loot taken, HP, notes) is stored on the device and can be reset per dungeon.

**Data.** The app ships with the dungeons that existed when it was built, so it works offline. A **Sync** action downloads the latest `dungeons.json` from the repository on GitHub and uses it from then on, so a dungeon merged yesterday appears without a new app version. The app never writes to the repository.

**Where it lives.** Source is in `Apps/dmScreen/` (Gradle project, WebView shell, plain HTML/CSS/JS interface, no third-party dependencies) and each built APK is kept in `Apps/dmScreen/releases/`, named by version and build time. APKs are debug-signed with a committed keystore, so each version installs over the last. `Apps/dmScreen/build-apk.cmd` builds one on any machine with the Android SDK and a JDK. Nothing in the world depends on the app: the dungeon notes are readable and playable from Obsidian alone.

**Status.** The app source is complete and in the repository. The first APK is committed to `releases/` once it has been built on a machine with the Android SDK; until then `releases/` holds only a note saying so.

**Scope of v1.** Read, navigate and run; sync from GitHub; submission guidance. Not in v1: authoring dungeons inside the app, running a whole instance's log, or networked play.

### 17.8 Submitting a dungeon **[Decided, v0.6]**
Dungeons are shared by pull request, using the same ownership model as everything else (sections 5 and 16).

1. **Write** the dungeon in a fork, from the templates in `_rules/templates/` (a dungeon note and one note per room). Pick a short unique `code`. Place it under `Multiverse/<Universe>/Dungeons/<Name>/` and point `parent` at the place that contains it. The full guide is `_rules/Submitting a Dungeon.md`.
2. **Check** it locally with `python3 _rules/tools/build_dungeons.py . --check`. Fix errors in exits, layout and numbers.
3. **Open a pull request.** The universe's maintainer reviews it like any lore: tone, fit, and licence. CI runs the same check.
4. **Merge.** The build tool regenerates `_generated/dungeons.json`, and every dmScreen installation can sync it.
5. **Credit.** The dungeon's `author` field stays with it. Status moves from `draft` to `playtested` as tables use it.

Rules for submissions: original writing or openly licensed material only (no copied module text, maps or stat blocks beyond the SRD, with attribution), data only (no scripts), and one dungeon per pull request. A universe's maintainer may decline a dungeon that does not fit its tone; it can then live in a fork or be offered to another universe. **[Open]** whether the app should also offer a form-based submission (decision P16).

### 17.9 Quests and the Starter Kit **[Decided, v0.6]**
A **quest** is a chain of three or four stages threading a town, a faction and a dungeon, with `on_success` and `on_failure` written as the sentences a canon merge will turn into events. Tropelandia has one per dungeon, so a campaign can run from level 1 to 12 on quests alone. The **Starter Kit** (`Instances/starter-kit/`, a template instance) holds Session Zero, a three-session arc on three of those quests, five pregens and an empty log: copy the folder, rename the id, play. The DM skill offers it as a starting scenario.

## 18. Planned universes

### 18.1 Tropelandia
- **Owner:** timmseth.
- **Ruleset:** D&D 5e.
- **Tone:** Munchkin-style parody of fantasy and RPG tropes, played with a straight face. Stakes are real; consequences are mild.
- **Contents (v0.6):** 8 regions over two continents; 8 hub towns with 27 venues and 34 NPCs; 11 factions; 10 dungeons (85 rooms) each with a home town, a faction and a quest chain; a 45-entry bestiary and 31 items; 15 random tables; a calendar with 6 holidays, 2 eras and 26 dated events; 6 deities, 4 cultures, 4 languages, 7 lore notes; one sample instance and the Starter Kit (Session Zero, a three-session arc, five pregens). About 450 notes.

### 18.2 Ashfall **[Decided, v0.6]**
- **Owner:** timmseth.
- **Ruleset:** Six Sides.
- **Tone:** grim low fantasy under a dimming sun; earnest, quiet, cold. Nobody is joking.
- **Contents:** a first town (Lastlight) with two venues, three NPCs and the Wardens; one deity; a four-entry bestiary in Six Sides shape; one dungeon, The Cold Vault (seven rooms, two floors); four events. It exists to exercise the architecture: a second ruleset, the scaffolder (`new_universe.py`), a second entry in the registry and `CODEOWNERS`, and a **Reality Rift**: the Cold Vault's lowest room opens into the Office of Eternal Records in Tropelandia, recorded as a rift event in both universes and listed in both manifests' `rifts`.

### 18.3 Forgotten Realms (Toril)
- **Idea:** a canon-style universe covering Toril, Faerûn, its regions, cities, factions, deities and famous NPCs.
- **Approach:** build top-down: skeleton first (planet, continents, regions, a few dozen cities, factions), then around a hundred notables, with census figures *estimated* rather than canonical.
- **Ruleset:** D&D 5e, shared with Tropelandia.
- **Time:** the calendar is Dalereckoning. History is backfilled as logged events up to a chosen year, which becomes the canon frontier. **[Open]** which year (the 5e-era 1490s is the natural choice).
- **Sources and IP:** the lore belongs to Wizards of the Coast. Facts and structure can be modelled in original words; book text is not copied. **[Open]** whether this universe stays in a private repository, since a public repository raises IP questions. The community wiki is believed to be under a CC-BY-SA licence, which would need to be verified before it is used as a source.
- **Trope link:** Forgotten Realms instances of tropes (for example a wise wizard mentor) appear alongside Tropelandia's parodies of the same trope in the trope's backlinks.

### 18.4 Others
Open to contributors: grimdark, sci-fi fantasy, a single-city sandbox, a published campaign world. Each one is a universe with its own maintainer.

## 19. Tooling and automation

- **Obsidian** is the reader and editor. Bases or Dataview give the tree, roster and timeline views. `workspace.json` is excluded from git because it changes constantly and is per-machine.
- **Git and GitHub** hold history, pull requests, `CODEOWNERS` and Actions.
- **Tools** (Python, in `_rules/tools/`, documented in `docs/concepts/Tools.md`): `validate.py` (schema-driven), `build_dungeons.py`, `build_world.py` (the world index), `build_timeline.py`, `build_maps.py`, `schema_reference.py`, `build_site.py`, `build_all.py`, `new_universe.py` (Universe Join scaffold), `merge_instance.py` (canon-merge drafter with rift detection). Event replay (`replay.py`) is still to come.
- **CI** (`.github/workflows/validate.yml`) validates every note, checks the dungeons, rebuilds the generated files and fails if they differ from what is committed, and rejects scripts outside the tool folders. `site.yml` publishes the static site to GitHub Pages.
- **DM skill** (`omniverse-dm`, a Claude skill): runs a campaign in an instance and keeps the log (section 17).
- **LLM contribution** **[Decided, v0.6]**: `AGENTS.md` at the root is the entry point for any language model asked to help; `docs/getting-started/For LLMs and Agents.md` gives the workflow and the prompts humans use; `_rules/skills/` holds SKILL.md files (`omniverse-contribute`, `-dungeon`, `-town`, `-review`, `-dm`) that encode the jobs. The human describes the vision; the model does the folders, ids, frontmatter, links, validator and pull request, and the human reviews.
- **dmScreen app** (`Apps/dmScreen/`): the Android DM screen that reads the dungeon index (section 17.7).
- **Narrator** (optional): an LLM that reads events and writes prose into `_generated/`.

## 20. Scale and performance

- **Files:** with normals as counts, the file count is driven by notables, places and events. A universe with a few thousand notables and a few hundred places is comfortable for Obsidian and git.
- **Events** are the fastest-growing content. They are sharded by in-world year, and old years can be rolled into yearly summary files (with the raw events kept in history) once they stop changing.
- **Large folders:** people are already spread across their home settlements' folders. A very large settlement's `People/` folder can be split by district or by first letter once it holds a few hundred notes.
- **Replay cost:** state is cached, and replay starts from the last snapshot rather than from the start of the log.
- **Windows paths:** keeping folders shallow avoids the 260-character path limit.
- **Repository size:** state files are small and text-based. If history grows too large, old events can be archived to a separate repository.

## 21. Risks

| Risk | Mitigation |
|---|---|
| Canon merges conflict with canon that has moved on. | Events carry before/after values; CI replays them; conflicts become Rifts for the maintainer; instances can rebase. |
| A universe feels empty because it is static. | Public instances, optional generators, "Previously on…" digests, and trope hooks that invite play. |
| Schema drift as the project grows. | Versioned schemas in `_rules/schemas/`, validated in CI. |
| IP problems (especially Forgotten Realms). | Original wording, openly licensed rules content (such as the SRD), a declared licence for every ruleset and source, private repository for canon-derived universes. |
| Malicious or broken contributions. | Data-only validation, path guard, protected workflows and engine code. |
| Submitted dungeons copy published modules. | Declared authorship and licence, maintainer review, original-writing rule in the submission guide. |
| The app and the data drift apart. | The app reads a versioned schema (`schema` in `dungeons.json`); the build tool is the only writer; CI rejects invalid dungeons. |
| Tone clashes between universes. | Tone belongs to the universe; the Omniverse stays neutral. |
| The DM skill contradicts canon or invents things it never records. | State is read from files; every consequential fact is written immediately; validators check IDs and before/after values. |
| Module sprawl and incompatible modules. | Manifests with versioned contracts, declared dependencies, namespaced fields, and compatibility checks in CI. |
| Secrets leak from private campaigns. | Per-event `visibility`; only `public` events can be merged upstream. |
| A game system cannot be expressed as declarative data. | Engine plugins reviewed by Omniverse maintainers; the Core ruleset as a fallback. |
| Automation permissions. | Least-privilege tokens; automation limited to validating and replaying data. |
| Cost of narration. | Optional; limited to `_generated/`; can be disabled per universe. |
| Maintainer abandonment. | Dormant state, adoption process. |

## 22. Decisions log

### Decided
| ID | Decision |
|---|---|
| D1 | Omniverse is the serious, top-level foundation; personality lives in universes. |
| D2 | Tropes are a top-level shared library; universes hold instances of them. |
| D3 | Tropelandia is one universe in the multiverse, not the whole thing. |
| D4 | Each universe has its own clock; the Omniverse keeps a shared absolute day counter (omni day). |
| D5 | The world is event-sourced: the log is the truth, state is derived, and a universe is static until events are merged. There is no tick system; background activity comes only from optional generators. Rosters, census counts, the nemesis system and typed relationships all work through events. |
| D6 | People pull-request their universes in and remain their maintainers. *(Mechanism in section 16 is proposed.)* |
| D7 | The Omniverse is system-agnostic: each universe brings its own ruleset. D&D 5e is one ruleset, used by Tropelandia. |
| D8 | Playable timelines are *instances* that fork from a universe's canon. A *canon merge* brings chosen instance events into canon. |
| D9 | Naming: *Universe Join* (a universe is added to the multiverse) and *Canon Merge* (instance events enter canon). Convergence is retired. |
| D10 | Collaborative, modular extensibility is the organising principle: a small core plus owned, versioned modules (section 5). |
| D11 | Dungeons are shared content: notes in the universe, checked by a build tool, indexed into one `dungeons.json`, and submitted by pull request. |
| D12 | Companion apps live in `Apps/<name>/` in this repository with their built APKs in `releases/`. They read generated data and never write canon. |
| D13 | Schemas are the contract: one YAML per kind in `_rules/schemas/`, read by the validator and rendered into the Schema Reference. Modules extend kinds through `_schemas/` with namespaced fields. |
| D14 | `_generated/world.json` is the world API. Apps and skills read generated files, never the Markdown. Generated files are committed and CI checks they are current (closes P8). |
| D15 | CI is the gate: a pull request merges only if the validator, the dungeon check and the generated-files check pass. Contributed content is never executed. |
| D16 | *(revised v0.7)* The **framework** (schemas, tools, docs, app, CI, Core glue) is public domain (Unlicense). **Content** is licensed per folder: every universe, ruleset and the trope library carries a `LICENSE.md` and declares it in its manifest; Seth's universes and `Tropes/` are CC BY-SA 4.0; a joining universe picks its own; imported material keeps its own licence in its own folder. Contributions are released under the licence of the folder they land in. Published systems outside an open licence appear only as shapes and numbers in original text. (closes P18) |
| D17 | Monster stat blocks are system-agnostic at the core (`threat` on the Omni scale) and carry the ruleset's block under its own key, so a universe on any ruleset can have a bestiary and the app can run it. |

### Proposed (will proceed unless changed)
| ID | Proposal |
|---|---|
| P2 | Containment folders: the space hierarchy is nested folders from universe down to settlement, people live in their home settlement's folder, and `parent` stays authoritative (CI checks the two agree). |
| P3 | Universes join by fork-and-PR with `CODEOWNERS` and a path-guard check (alternative: submodules). |
| P6 | Trope instances must fill required fields (twist, stakes, hooks offered). |
| P7 | The vault itself becomes the git repository, replacing the two-copy setup. |
| P11 | Rulesets are declarative data (schemas, tables, a restricted expression language), not code. |
| P12 | Every ruleset maps onto a shared Omni power scale so crossovers work. |
| P13 | One campaign per instance by default; instances are overlay folders; an instance can fork at any past date; public instances may live upstream or in forks. |
| P14 | Modules carry manifests with versioned contracts, declared dependencies and namespaced fields. |

### Open (need an answer)
| ID | Question | Options |
|---|---|---|
| P1 | D&D 5e edition for the `dnd5e` ruleset (Tropelandia) | 2014 or 2024 |
| P5 | Who decides Reality Rifts | Single decision-maker or a vote |
| P9 | Forgotten Realms: which year, and public or private repo | e.g. 1490s DR; private recommended |
| P10 | Final file name and location of this document | `README.md` at the root (current) or a different name |
| P15 | Naming clash: *instance* (a playable timeline) versus *trope instance* | Keep both with the prefix, or rename trope instances (for example to "bindings" or "realisations") |
| P16 | How dungeons are submitted | Pull request plus the dungeon-proposal issue template (current), or an in-app editor later |
| P17 | Where built APKs are stored | In the repository under `Apps/dmScreen/releases/` (current), or as GitHub Release assets only, if the repository grows too large |
| P18 | ~~Licence for content~~ | Decided: framework Unlicense, content per folder, default CC BY-SA 4.0 (D16, `LICENSING.md`) |
| P19 | Where the static site is published | GitHub Pages from CI (current, needs Pages enabled once in repository settings) |

## 23. Roadmap

| Milestone | Delivers | Done when |
|---|---|---|
| **M0 — Skeleton** | Folder layout, `.gitignore`, git initialised, this document | The repo exists and opens cleanly in Obsidian. |
| **M1 — Core contracts and module manifests** | Frontmatter schemas, note templates, the module manifest format, conventions | A new note and a new module manifest both validate. |
| **M2 — Tropelandia seed** | Universe note, calendar, a few places and notables, a starter set of tropes and instances | The world can be browsed top to bottom. |
| **M3 — Event log and replay** | Event schema with before/after values, validator, state replay | State rebuilt from the log matches the cached state. |
| **M4 — Rulesets** | Ruleset contract, Core ruleset, `dnd5e` ruleset (SRD import, stat blocks), offstage resolution | Two notables can fight offstage under `dnd5e` and the outcome is logged, and a Core-ruleset universe also runs. |
| **M5 — Relationships and nemeses** | Edge types, grudge ladder, promotion of normals and victors | A grudge visibly escalates over several logged events. |
| **M6 — Collaboration flow** | `CODEOWNERS`, path guard, CI checks, universe template, Universe Join and Canon Merge | A test universe joins by pull request, and an instance's events canon-merge into it. |
| **M7 — DM skill** | Session log format, instance templates, the `new`, `play`, `wrap` and `propose` commands, scribe mode | A short campaign is played in an instance and its log passes validation. |
| **M7a — Dungeons and the DM screen** | Dungeon and room schemas, build tool, ten sample dungeons, the dmScreen app, the submission guide | A dungeon is written, validated, indexed and run from the app on a phone. *(Done: v1.0.0 APK in releases/.)* |
| **M8 — A living Tropelandia** | Factions, towns, venues, NPCs, bestiary, items, tables, history, pantheon, lore, quests, Starter Kit | A new DM can run three sessions from the Starter Kit without writing anything. *(Done in v0.6.)* |
| **M9 — Schemas, index and CI** | `_rules/schemas/`, schema-driven validator, world index, timelines, maps, CI gate, docs and CONTRIBUTING | Every note validates against a schema; a PR cannot merge with a broken note. *(Done in v0.6.)* |
| **M10 — The second universe** | Six Sides ruleset, Ashfall, `new_universe.py`, a Reality Rift to Tropelandia | Two universes on two rulesets validate side by side and share a rift. *(Done in v0.6.)* |
| **M11 — dmScreen v1.1** | 3D dollhouse view, stat blocks, table roller, town and NPC screens | A dungeon is run from the model view on a phone. |
| **M12 — Replay and views** | `replay.py` rebuilding `_state/` from events; roster and rumour-board views | Replayed state matches the cache. |
| **M13 — Forgotten Realms** | Skeleton universe with backfilled history | Toril browsable to settlement level with a starter cast. |

---

## Appendix A — Example notes

### A.1 Event
```yaml
---
id: tropelandia.event.1489-0034-the-pie-contest-incident
kind: event
name: The Pie Contest Incident
when: { year: 1489, day: 34, omni_day: 2210 }
where: tropelandia.settlement.barrowdale
participants:
  - tropelandia.person.marlowe-the-mildly-menacing
  - tropelandia.person.dame-rosalind-quickblade
type: social_conflict
severity: 2            # 0 trivial … 5 world-changing
visibility: public
canon: canon
source: maintainer
deltas:
  - entity: tropelandia.person.marlowe-the-mildly-menacing
    field: relationships.tropelandia.person.dame-rosalind-quickblade
    from: null
    to: { type: rival, strength: 62 }
  - entity: tropelandia.population.barrowdale
    field: census.mood
    from: weary
    to: amused
tropes_involved: [omniverse.trope.rival-adventurers]
---
Marlowe's entry, "Pie of Mild Menace", beat Dame Rosalind's three-time-champion
blackberry. Accusations of sabotage followed. Nobody is sure how a tower ended up
in the middle of the judges' table.
```

### A.2 Person (lore)
```yaml
---
id: tropelandia.person.marlowe-the-mildly-menacing
kind: person
name: Marlowe the Mildly Menacing
parent: tropelandia.settlement.barrowdale
species: human
ruleset: dnd5e
stats:
  class: { name: wizard, level: 9, subclass: evoker }
instance_roles: [tropelandia.instance.marlowe-tower]
goals: [pay_the_rent, win_the_pie_contest, avoid_the_landlord]
---
A reclusive archmage who is reclusive mainly because he cannot afford visitors.
```

### A.3 Person (state)
```yaml
id: tropelandia.person.marlowe-the-mildly-menacing
location: tropelandia.settlement.barrowdale
hp: { current: 52, max: 52 }
conditions: []
grudges:
  - { target: tropelandia.person.dame-rosalind-quickblade, intensity: 62, kind: rivalry }
active_goals: [win_the_pie_contest]
as_of: { year: 1489, day: 34 }
```

### A.4 Universe note
```yaml
---
id: tropelandia
kind: universe
name: Tropelandia
parent: omniverse.multiverse
tone: parody
ruleset: dnd5e
maintainers: [seth]
status: active            # active | paused | dormant | archived
clock:
  calendar: tropelandia.calendar.standard
  epoch_omni_day: 0
---
```

## Appendix B — Example CODEOWNERS and CI checks

### B.1 CODEOWNERS
The real file is at the repository root. Its shape:
```
# Core, owned by Omniverse maintainers
/_rules/                    @timmseth
/Tropes/                    @timmseth
/Rulesets/                  @timmseth
/Apps/                      @timmseth
/docs/                      @timmseth
/Multiverse/_registry.md    @timmseth
/.github/                   @timmseth
/CODEOWNERS                 @timmseth

# Universes, owned by their maintainers
/Multiverse/Tropelandia/    @timmseth
/Multiverse/Ashfall/        @timmseth
```

### B.2 CI checks on every pull request
Implemented in `.github/workflows/validate.yml` (items 1, 2, 6, 8 and 10 run today; 3, 4 and 7 are by `CODEOWNERS` review; 5 and 9 are planned with `replay.py`):
1. **Schema validation** for every changed note.
2. **ID uniqueness** and namespace match (`<universe>.…` inside `Multiverse/<Universe>/`).
3. **Path scope**: the author owns every path touched.
4. **Protected paths**: no changes to workflows, the engine, `CODEOWNERS` or other universes unless a maintainer approves.
5. **Calendar and clock** valid for any universe note change.
6. **No executable content**: nothing in a universe is ever run by CI.
7. **Attribution and licence** declared for third-party material.
8. **Link integrity**: every `parent` and relationship target exists.
9. **Replay check**: replaying the event log reproduces the cached state.
10. **Module manifests** are valid and their declared dependencies are satisfied.
