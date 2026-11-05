---
kind: generated
generated: schema_reference.py
---
# Schema Reference

*Generated from `_rules/schemas/`. Do not edit; change the schema and rerun `python3 _rules/tools/schema_reference.py .`*

Every note is a Markdown file with YAML frontmatter. Its `kind` picks the schema below. The validator (`_rules/tools/validate.py`) enforces these; CI runs it on every pull request.

**Types.** `string`, `text` (multi-line), `int`, `number`, `bool`, `any`, `id` (the note's own id), `ref` (another note's id), `when` (`primordial`, `null`, or `{year, day, era}`), `dice` (`d6`, `2d8+1`), `list of …`, `map`.

**Unknown fields** are warnings unless the key is namespaced (`dnd5e.initiative`), which a module's `_schemas/` may declare.

## Kinds at a glance

| Kind | What it is | Lives at | Id |
|---|---|---|---|
| [omniverse](#omniverse) | The single root note. Everything else descends from it. | `Omniverse.md` | `omniverse` |
| [multiverse](#multiverse) | The shelf of universes. Its body holds the registry table. | `Multiverse/_registry.md` | `omniverse.multiverse` |
| [universe](#universe) | A world with its own tone, calendar, canon timeline and ruleset. Its frontmatter is the universe's module manifest. | `Multiverse/<Universe>/_universe.md` | `<universe>` |
| [module](#module) | Manifest for a generator, view, importer, exporter, DM style, trope pack, schema extension or app. | `<any>/module.md` | `<any>` |
| [ruleset](#ruleset) | A game system: stat schema, power function, resolution, progression. | `Rulesets/<Name>/<Name>.md`, `Multiverse/<Universe>/Rulesets/<Name>/<Name>.md` | `omniverse.ruleset.<slug>`, `<universe>.ruleset.<slug>` |
| [plane](#plane) | A plane of existence. The top of a universe's space tree. | `Multiverse/<Universe>/<Place path>/<Name>/<Name>.md` | `<universe>.plane.<slug>` |
| [galaxy](#galaxy) | A galaxy inside a plane. | `Multiverse/<Universe>/<Place path>/<Name>/<Name>.md` | `<universe>.galaxy.<slug>` |
| [star_system](#star-system) | A star and what orbits it. | `Multiverse/<Universe>/<Place path>/<Name>/<Name>.md` | `<universe>.star_system.<slug>` |
| [planet](#planet) | A world. | `Multiverse/<Universe>/<Place path>/<Name>/<Name>.md` | `<universe>.planet.<slug>` |
| [continent](#continent) | A landmass on a planet. | `Multiverse/<Universe>/<Place path>/<Name>/<Name>.md` | `<universe>.continent.<slug>` |
| [region](#region) | A natural region: a marsh, a range, a forest, a desert. | `Multiverse/<Universe>/<Place path>/<Name>/<Name>.md` | `<universe>.region.<slug>` |
| [country](#country) | A polity: kingdom, duchy, republic, empire. | `Multiverse/<Universe>/<Place path>/<Name>/<Name>.md` | `<universe>.country.<slug>` |
| [province](#province) | A subdivision of a country. | `Multiverse/<Universe>/<Place path>/<Name>/<Name>.md` | `<universe>.province.<slug>` |
| [settlement](#settlement) | A city, town, village or outpost. The hub a party starts from. | `Multiverse/<Universe>/<Place path>/<Name>/<Name>.md` | `<universe>.settlement.<slug>` |
| [district](#district) | A quarter of a settlement. | `Multiverse/<Universe>/<Place path>/<Name>/Districts/<Name>.md` | `<universe>.district.<slug>` |
| [venue](#venue) | A tavern, shop, temple, guildhall or other place inside a settlement that a party can walk into. | `Multiverse/<Universe>/<Place path>/<Name>/Venues/<Name>.md` | `<universe>.venue.<slug>` |
| [household](#household) | A family or house, with members and goals. | `Multiverse/<Universe>/<Place path>/<Name>/Households/<Name>.md` | `<universe>.household.<slug>` |
| [person](#person) | A named character, player or non-player. NPCs live under the settlement they belong to; instance characters live under their instance. | `Multiverse/<Universe>/<Place path>/<Name>/People/<Name>.md`, `Multiverse/<Universe>/Factions/<Name>/People/<Name>.md`, `Multiverse/<Universe>/Instances/<Name>/Overlay/<Name>.md`, `Multiverse/<Universe>/Instances/<Name>/Pregens/<Name>.md`, `Multiverse/<Universe>/Dungeons/<Dungeon>/People/<Name>.md` | `<universe>.person.<slug>`, `<instance>.person.<slug>` |
| [faction](#faction) | An organisation with goals, assets and rivals: guild, cult, court, company, gang, order. | `Multiverse/<Universe>/Factions/<Name>.md` | `<universe>.faction.<slug>` |
| [deity](#deity) | A god, spirit or power that people pray to. | `Multiverse/<Universe>/Pantheon/<Name>.md` | `<universe>.deity.<slug>` |
| [culture](#culture) | A people and how they live. | `Multiverse/<Universe>/Lore/Cultures/<Name>.md` | `<universe>.culture.<slug>` |
| [language](#language) | A tongue, with who speaks it and how it sounds. | `Multiverse/<Universe>/Lore/Languages/<Name>.md` | `<universe>.language.<slug>` |
| [calendar](#calendar) | How a universe counts days. | `Multiverse/<Universe>/Calendar.md` | `<universe>.calendar.<slug>` |
| [holiday](#holiday) | A recurring day on a calendar, with customs a party can walk into. | `Multiverse/<Universe>/Holidays/<Name>.md` | `<universe>.holiday.<slug>` |
| [era](#era) | A named span of a universe's history. | `Multiverse/<Universe>/Eras/<Name>.md` | `<universe>.era.<slug>` |
| [event](#event) | Something that happened in canon, with the state changes it caused. The timeline is the ordered set of these. | `Multiverse/<Universe>/Events/<year>/<year>-<nnnn> <Name>.md` | `<universe>.event.<year>-<nnnn>-<slug>` |
| [trope](#trope) | A reusable story pattern with beats and hooks. Shared by every universe. | `Tropes/<Name>.md` | `omniverse.trope.<slug>` |
| [trope_instance](#trope-instance) | A trope made concrete in one universe, bound to people and places, with a twist. | `Multiverse/<Universe>/Trope Instances/<Name>.md` | `<universe>.instance.<slug>` |
| [quest](#quest) | A chain of stages threading towns, factions and dungeons, with outcomes that can become canon events. | `Multiverse/<Universe>/Quests/<Name>.md` | `<universe>.quest.<slug>` |
| [lore](#lore) | A myth, legend, history, custom or song. The text is the note body. | `Multiverse/<Universe>/Lore/<Name>.md` | `<universe>.lore.<slug>` |
| [table](#table) | A rollable table. Tools roll them; DMs read them. | `Multiverse/<Universe>/Tables/<Name>.md`, `Tables/<Name>.md` | `<universe>.table.<slug>`, `omniverse.table.<slug>` |
| [dungeon](#dungeon) | An adventure site made of rooms. Anyone can submit one by pull request; the build tool indexes it for the DM screen app. | `Multiverse/<Universe>/Dungeons/<Name>/<Name>.md` | `<universe>.dungeon.<slug>` |
| [room](#room) | One room of a dungeon, with read-aloud text, exits, and everything the DM needs to run it. | `Multiverse/<Universe>/Dungeons/<Dungeon>/Rooms/<Name>.md` | `<universe>.room.<dungeon>.<nn>-<slug>` |
| [monster](#monster) | A creature stat block, in the ruleset's shape, that rooms and encounters reference by id. | `Multiverse/<Universe>/Bestiary/<Name>.md` | `<universe>.monster.<slug>` |
| [item](#item) | A notable object: magic item, trinket, treasure, tool. | `Multiverse/<Universe>/Items/<Name>.md` | `<universe>.item.<slug>` |
| [instance](#instance) | A playable timeline forked from canon at a point. Sessions log into it; a merge proposes its events back. | `Multiverse/<Universe>/Instances/<Name>/_instance.md` | `<slug>` |
| [campaign](#campaign) | The party and arc inside an instance. | `Multiverse/<Universe>/Instances/<Name>/Campaign.md` | `<instance>.campaign` |
| [session](#session) | One sitting's log: what happened, as events with deltas, plus the rolls. | `Multiverse/<Universe>/Instances/<Name>/log/<Name>.md` | `<instance>.session.<nn>` |
| [index](#index) | A hand-written index note (a folder note or library front page). | `<any>` | `<any>` |
| [guide](#guide) | A how-to for contributors or players. | `<any>` | `<any>` |
| [template](#template) | A copy-and-fill template. Its fields are placeholders and are not validated. | `<any>` | `<any>` |
| [generated](#generated) | A machine-written note. Never edited by hand; regenerated by a tool. | `<any>` | `<any>` |

## Structure

### omniverse

**Omniverse.** The single root note. Everything else descends from it.

- Lives at: `Omniverse.md`
- Id: `omniverse`
- Mixins: none

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | id | yes |  |
| `kind` | `omniverse` |  |  |
| `name` | string | yes |  |
| `parent` | any |  | Always null. The only note without a parent. May be null. |
| `from` | when |  |  |
| `to` | when |  | May be null. |

### multiverse

**Multiverse registry.** The shelf of universes. Its body holds the registry table.

- Lives at: `Multiverse/_registry.md`
- Id: `omniverse.multiverse`
- Mixins: base, dated

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | id | yes | Namespaced id, unique across the repository. |
| `kind` | string | yes | The note kind. Must match this schema. |
| `name` | string | yes | Display name. Also the file name. |
| `parent` | ref to any note | yes | The note this one sits under. Every note but the Omniverse has one. |
| `aliases` | list of string |  | Other names it goes by. |
| `tags` | list of string |  |  |
| `summary` | text |  | One to three sentences for indexes and the app. |
| `author` | string |  | Who wrote it (GitHub handle). |
| `status` | one of: `sample`, `draft`, `playtested`, `canon`, `stub`, `active`, `paused`, `dormant`, `archived`, `retired` |  | Editorial status. |
| `from` | when |  | When it came to be. `primordial` for things older than the calendar. |
| `to` | when |  | When it ended. `null` while it still exists. May be null. |

### universe

**Universe (module manifest).** A world with its own tone, calendar, canon timeline and ruleset. Its frontmatter is the universe's module manifest.

- Lives at: `Multiverse/<Universe>/_universe.md`
- Id: `<universe>`
- Mixins: base, dated, manifest

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | id | yes | Namespaced id, unique across the repository. |
| `kind` | string | yes | The note kind. Must match this schema. |
| `name` | string | yes | Display name. Also the file name. |
| `parent` | ref to any note | yes | The note this one sits under. Every note but the Omniverse has one. |
| `aliases` | list of string |  | Other names it goes by. |
| `tags` | list of string |  |  |
| `summary` | text |  | One to three sentences for indexes and the app. |
| `author` | string |  | Who wrote it (GitHub handle). |
| `status` | one of: `active`, `paused`, `dormant`, `archived` | yes |  |
| `from` | when |  | When it came to be. `primordial` for things older than the calendar. |
| `to` | when |  | When it ended. `null` while it still exists. May be null. |
| `version` | string |  | Semantic version of this module. Pattern `^\d+\.\d+\.\d+$`. |
| `owner` | string |  | Maintainer (GitHub handle). Mirrored in CODEOWNERS. |
| `licence` | string |  | Licence of this module's content. |
| `requires` | map |  | Module id to version range, e.g. omniverse-core: ">=0.6 <0.7". |
| `extends` | ref to any note |  | Module this one builds on. May be null. |
| `provides` | any |  | What the module supplies (list or map). |
| `overrides` | list of string |  | Parts of the extended module this one replaces. |
| `adds_kinds` | list of string |  | Note kinds this module introduces (declared in its _schemas/). |
| `tone` | string | yes | One or two words, e.g. parody, grim, pulp. |
| `ruleset` | ref to ruleset | yes | Default ruleset for the universe. |
| `maintainers` | list of string | yes |  |
| `clock` | map | yes |  |
| `clock.calendar` | ref to calendar | yes |  |
| `clock.epoch_omni_day` | int | yes | Omni-day that corresponds to this universe's year 1, day 1. |
| `rifts` | list of ref to event/lore |  | Known Reality Rifts and Universe Joins touching this universe. |

### module

**Module (generic manifest).** Manifest for a generator, view, importer, exporter, DM style, trope pack, schema extension or app.

- Lives at: `<any>/module.md`
- Id: `<any>`
- Mixins: base, manifest

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | id | yes | Namespaced id, unique across the repository. |
| `kind` | string | yes | The note kind. Must match this schema. |
| `name` | string | yes | Display name. Also the file name. |
| `parent` | ref to any note | yes |  |
| `aliases` | list of string |  | Other names it goes by. |
| `tags` | list of string |  |  |
| `summary` | text |  | One to three sentences for indexes and the app. |
| `author` | string |  | Who wrote it (GitHub handle). |
| `status` | one of: `sample`, `draft`, `playtested`, `canon`, `stub`, `active`, `paused`, `dormant`, `archived`, `retired` |  | Editorial status. |
| `version` | string |  | Semantic version of this module. Pattern `^\d+\.\d+\.\d+$`. |
| `owner` | string |  | Maintainer (GitHub handle). Mirrored in CODEOWNERS. |
| `licence` | string |  | Licence of this module's content. |
| `requires` | map |  | Module id to version range, e.g. omniverse-core: ">=0.6 <0.7". |
| `extends` | ref to any note |  | Module this one builds on. May be null. |
| `provides` | any |  | What the module supplies (list or map). |
| `overrides` | list of string |  | Parts of the extended module this one replaces. |
| `adds_kinds` | list of string |  | Note kinds this module introduces (declared in its _schemas/). |
| `module_kind` | one of: `generator`, `view`, `importer`, `exporter`, `dm_style`, `trope_pack`, `schema_extension`, `app` | yes |  |
| `reads` | list of string |  | What it reads (paths or kinds). |
| `writes` | list of string |  | What it writes. Generators write events; views write only _generated/. |

### ruleset

**Ruleset (module manifest).** A game system: stat schema, power function, resolution, progression.

- Lives at: `Rulesets/<Name>/<Name>.md`, `Multiverse/<Universe>/Rulesets/<Name>/<Name>.md`
- Id: `omniverse.ruleset.<slug>`, `<universe>.ruleset.<slug>`
- Mixins: base, manifest

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | id | yes | Namespaced id, unique across the repository. |
| `kind` | string | yes | The note kind. Must match this schema. |
| `name` | string | yes | Display name. Also the file name. |
| `parent` | ref to omniverse/universe | yes |  |
| `aliases` | list of string |  | Other names it goes by. |
| `tags` | list of string |  |  |
| `summary` | text |  | One to three sentences for indexes and the app. |
| `author` | string |  | Who wrote it (GitHub handle). |
| `status` | one of: `stub`, `draft`, `usable`, `stable` | yes |  |
| `version` | string |  | Semantic version of this module. Pattern `^\d+\.\d+\.\d+$`. |
| `owner` | string |  | Maintainer (GitHub handle). Mirrored in CODEOWNERS. |
| `licence` | string |  | Licence of this module's content. |
| `requires` | map |  | Module id to version range, e.g. omniverse-core: ">=0.6 <0.7". |
| `extends` | ref to any note |  | Module this one builds on. May be null. |
| `provides` | map | yes |  |
| `provides.stat_schema` | any | yes |  |
| `provides.power_function` | any | yes |  |
| `provides.offstage_resolution` | any | yes |  |
| `provides.progression` | any | yes |  |
| `provides.injuries` | any |  |  |
| `overrides` | list of string |  | Parts of the extended module this one replaces. |
| `adds_kinds` | list of string |  | Note kinds this module introduces (declared in its _schemas/). |
| `source` | string |  |  |
| `edition` | string |  |  |
| `stat_mapping` | map |  | How this ruleset's stats map to Omni power and to other rulesets. |
| `dice` | string |  | Core dice mechanic in a line. |

## Places

### plane

**Plane.** A plane of existence. The top of a universe's space tree.

- Lives at: `Multiverse/<Universe>/<Place path>/<Name>/<Name>.md`
- Id: `<universe>.plane.<slug>`
- Mixins: base, in_universe, dated

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | id | yes | Namespaced id, unique across the repository. |
| `kind` | string | yes | The note kind. Must match this schema. |
| `name` | string | yes | Display name. Also the file name. |
| `parent` | ref to universe | yes |  |
| `aliases` | list of string |  | Other names it goes by. |
| `tags` | list of string |  |  |
| `summary` | text |  | One to three sentences for indexes and the app. |
| `author` | string |  | Who wrote it (GitHub handle). |
| `status` | one of: `sample`, `draft`, `playtested`, `canon`, `stub`, `active`, `paused`, `dormant`, `archived`, `retired` |  | Editorial status. |
| `universe` | ref to universe | yes | The universe this note belongs to. Must match the first segment of the id. |
| `from` | when |  | When it came to be. `primordial` for things older than the calendar. |
| `to` | when |  | When it ended. `null` while it still exists. May be null. |
| `time_rate` | number |  | Time flow relative to the universe clock (1.0 is normal). |

### galaxy

**Galaxy.** A galaxy inside a plane.

- Lives at: `Multiverse/<Universe>/<Place path>/<Name>/<Name>.md`
- Id: `<universe>.galaxy.<slug>`
- Mixins: base, in_universe, dated

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | id | yes | Namespaced id, unique across the repository. |
| `kind` | string | yes | The note kind. Must match this schema. |
| `name` | string | yes | Display name. Also the file name. |
| `parent` | ref to plane | yes |  |
| `aliases` | list of string |  | Other names it goes by. |
| `tags` | list of string |  |  |
| `summary` | text |  | One to three sentences for indexes and the app. |
| `author` | string |  | Who wrote it (GitHub handle). |
| `status` | one of: `sample`, `draft`, `playtested`, `canon`, `stub`, `active`, `paused`, `dormant`, `archived`, `retired` |  | Editorial status. |
| `universe` | ref to universe | yes | The universe this note belongs to. Must match the first segment of the id. |
| `from` | when |  | When it came to be. `primordial` for things older than the calendar. |
| `to` | when |  | When it ended. `null` while it still exists. May be null. |

### star_system

**Star system.** A star and what orbits it.

- Lives at: `Multiverse/<Universe>/<Place path>/<Name>/<Name>.md`
- Id: `<universe>.star_system.<slug>`
- Mixins: base, in_universe, dated

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | id | yes | Namespaced id, unique across the repository. |
| `kind` | string | yes | The note kind. Must match this schema. |
| `name` | string | yes | Display name. Also the file name. |
| `parent` | ref to galaxy | yes |  |
| `aliases` | list of string |  | Other names it goes by. |
| `tags` | list of string |  |  |
| `summary` | text |  | One to three sentences for indexes and the app. |
| `author` | string |  | Who wrote it (GitHub handle). |
| `status` | one of: `sample`, `draft`, `playtested`, `canon`, `stub`, `active`, `paused`, `dormant`, `archived`, `retired` |  | Editorial status. |
| `universe` | ref to universe | yes | The universe this note belongs to. Must match the first segment of the id. |
| `from` | when |  | When it came to be. `primordial` for things older than the calendar. |
| `to` | when |  | When it ended. `null` while it still exists. May be null. |
| `star` | map |  |  |
| `star.name` | string | yes |  |
| `star.type` | string |  |  |

### planet

**Planet.** A world.

- Lives at: `Multiverse/<Universe>/<Place path>/<Name>/<Name>.md`
- Id: `<universe>.planet.<slug>`
- Mixins: base, in_universe, dated

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | id | yes | Namespaced id, unique across the repository. |
| `kind` | string | yes | The note kind. Must match this schema. |
| `name` | string | yes | Display name. Also the file name. |
| `parent` | ref to star_system | yes |  |
| `aliases` | list of string |  | Other names it goes by. |
| `tags` | list of string |  |  |
| `summary` | text |  | One to three sentences for indexes and the app. |
| `author` | string |  | Who wrote it (GitHub handle). |
| `status` | one of: `sample`, `draft`, `playtested`, `canon`, `stub`, `active`, `paused`, `dormant`, `archived`, `retired` |  | Editorial status. |
| `universe` | ref to universe | yes | The universe this note belongs to. Must match the first segment of the id. |
| `from` | when |  | When it came to be. `primordial` for things older than the calendar. |
| `to` | when |  | When it ended. `null` while it still exists. May be null. |
| `climate` | string |  |  |
| `magic_level` | string |  |  |

### continent

**Continent.** A landmass on a planet.

- Lives at: `Multiverse/<Universe>/<Place path>/<Name>/<Name>.md`
- Id: `<universe>.continent.<slug>`
- Mixins: base, in_universe, dated

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | id | yes | Namespaced id, unique across the repository. |
| `kind` | string | yes | The note kind. Must match this schema. |
| `name` | string | yes | Display name. Also the file name. |
| `parent` | ref to planet | yes |  |
| `aliases` | list of string |  | Other names it goes by. |
| `tags` | list of string |  |  |
| `summary` | text |  | One to three sentences for indexes and the app. |
| `author` | string |  | Who wrote it (GitHub handle). |
| `status` | one of: `sample`, `draft`, `playtested`, `canon`, `stub`, `active`, `paused`, `dormant`, `archived`, `retired` |  | Editorial status. |
| `universe` | ref to universe | yes | The universe this note belongs to. Must match the first segment of the id. |
| `from` | when |  | When it came to be. `primordial` for things older than the calendar. |
| `to` | when |  | When it ended. `null` while it still exists. May be null. |

### region

**Region.** A natural region: a marsh, a range, a forest, a desert.

- Lives at: `Multiverse/<Universe>/<Place path>/<Name>/<Name>.md`
- Id: `<universe>.region.<slug>`
- Mixins: base, in_universe, dated

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | id | yes | Namespaced id, unique across the repository. |
| `kind` | string | yes | The note kind. Must match this schema. |
| `name` | string | yes | Display name. Also the file name. |
| `parent` | ref to continent/planet | yes |  |
| `aliases` | list of string |  | Other names it goes by. |
| `tags` | list of string |  |  |
| `summary` | text |  | One to three sentences for indexes and the app. |
| `author` | string |  | Who wrote it (GitHub handle). |
| `status` | one of: `sample`, `draft`, `playtested`, `canon`, `stub`, `active`, `paused`, `dormant`, `archived`, `retired` |  | Editorial status. |
| `universe` | ref to universe | yes | The universe this note belongs to. Must match the first segment of the id. |
| `from` | when |  | When it came to be. `primordial` for things older than the calendar. |
| `to` | when |  | When it ended. `null` while it still exists. May be null. |
| `biome` | string |  |  |
| `hazards` | list of string |  | What the land itself does to travellers. |

### country

**Country.** A polity: kingdom, duchy, republic, empire.

- Lives at: `Multiverse/<Universe>/<Place path>/<Name>/<Name>.md`
- Id: `<universe>.country.<slug>`
- Mixins: base, in_universe, dated

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | id | yes | Namespaced id, unique across the repository. |
| `kind` | string | yes | The note kind. Must match this schema. |
| `name` | string | yes | Display name. Also the file name. |
| `parent` | ref to region/continent | yes |  |
| `aliases` | list of string |  | Other names it goes by. |
| `tags` | list of string |  |  |
| `summary` | text |  | One to three sentences for indexes and the app. |
| `author` | string |  | Who wrote it (GitHub handle). |
| `status` | one of: `sample`, `draft`, `playtested`, `canon`, `stub`, `active`, `paused`, `dormant`, `archived`, `retired` |  | Editorial status. |
| `universe` | ref to universe | yes | The universe this note belongs to. Must match the first segment of the id. |
| `from` | when |  | When it came to be. `primordial` for things older than the calendar. |
| `to` | when |  | When it ended. `null` while it still exists. May be null. |
| `ruler` | ref to person/faction |  |  |
| `capital` | ref to settlement |  |  |
| `government` | string |  |  |
| `currency` | string |  |  |
| `seat` | ref to settlement |  | Where the ruler sits. |

### province

**Province.** A subdivision of a country.

- Lives at: `Multiverse/<Universe>/<Place path>/<Name>/<Name>.md`
- Id: `<universe>.province.<slug>`
- Mixins: base, in_universe, dated

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | id | yes | Namespaced id, unique across the repository. |
| `kind` | string | yes | The note kind. Must match this schema. |
| `name` | string | yes | Display name. Also the file name. |
| `parent` | ref to country | yes |  |
| `aliases` | list of string |  | Other names it goes by. |
| `tags` | list of string |  |  |
| `summary` | text |  | One to three sentences for indexes and the app. |
| `author` | string |  | Who wrote it (GitHub handle). |
| `status` | one of: `sample`, `draft`, `playtested`, `canon`, `stub`, `active`, `paused`, `dormant`, `archived`, `retired` |  | Editorial status. |
| `universe` | ref to universe | yes | The universe this note belongs to. Must match the first segment of the id. |
| `from` | when |  | When it came to be. `primordial` for things older than the calendar. |
| `to` | when |  | When it ended. `null` while it still exists. May be null. |
| `ruler` | ref to person/faction |  |  |
| `capital` | ref to settlement |  |  |
| `seat` | ref to settlement |  | Where the ruler sits. |

### settlement

**Settlement.** A city, town, village or outpost. The hub a party starts from.

- Lives at: `Multiverse/<Universe>/<Place path>/<Name>/<Name>.md`
- Id: `<universe>.settlement.<slug>`
- Mixins: base, in_universe, dated

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | id | yes | Namespaced id, unique across the repository. |
| `kind` | string | yes | The note kind. Must match this schema. |
| `name` | string | yes | Display name. Also the file name. |
| `parent` | ref to province/country/region | yes |  |
| `aliases` | list of string |  | Other names it goes by. |
| `tags` | list of string |  |  |
| `summary` | text |  | One to three sentences for indexes and the app. |
| `author` | string |  | Who wrote it (GitHub handle). |
| `status` | one of: `sample`, `draft`, `playtested`, `canon`, `stub`, `active`, `paused`, `dormant`, `archived`, `retired` |  | Editorial status. |
| `universe` | ref to universe | yes | The universe this note belongs to. Must match the first segment of the id. |
| `from` | when |  | When it came to be. `primordial` for things older than the calendar. |
| `to` | when |  | When it ended. `null` while it still exists. May be null. |
| `size_class` | one of: `outpost`, `hamlet`, `village`, `town`, `city`, `metropolis` | yes |  |
| `population` | int |  |  |
| `ruler` | ref to person/faction |  |  |
| `districts` | list of ref to district |  |  |
| `venues` | list of ref to venue |  | Taverns, shops, temples; see venue. |
| `factions` | list of ref to faction |  | Factions with a presence here. |
| `notable_people` | list of ref to person |  |  |
| `nearest_dungeons` | list of ref to dungeon |  |  |
| `tropes` | list of ref to trope_instance |  |  |
| `rumours` | list of string |  | What people here are saying. |
| `hooks` | list of string |  | Reasons for a party to get involved. |
| `trade` | list of string |  | What it makes, sells or is known for. |
| `law` | string |  | How justice works here, in a line. |

### district

**District.** A quarter of a settlement.

- Lives at: `Multiverse/<Universe>/<Place path>/<Name>/Districts/<Name>.md`
- Id: `<universe>.district.<slug>`
- Mixins: base, in_universe, dated

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | id | yes | Namespaced id, unique across the repository. |
| `kind` | string | yes | The note kind. Must match this schema. |
| `name` | string | yes | Display name. Also the file name. |
| `parent` | ref to settlement | yes |  |
| `aliases` | list of string |  | Other names it goes by. |
| `tags` | list of string |  |  |
| `summary` | text |  | One to three sentences for indexes and the app. |
| `author` | string |  | Who wrote it (GitHub handle). |
| `status` | one of: `sample`, `draft`, `playtested`, `canon`, `stub`, `active`, `paused`, `dormant`, `archived`, `retired` |  | Editorial status. |
| `universe` | ref to universe | yes | The universe this note belongs to. Must match the first segment of the id. |
| `from` | when |  | When it came to be. `primordial` for things older than the calendar. |
| `to` | when |  | When it ended. `null` while it still exists. May be null. |
| `character` | string |  | The district in a phrase. |
| `venues` | list of ref to venue |  |  |

### venue

**Venue.** A tavern, shop, temple, guildhall or other place inside a settlement that a party can walk into.

- Lives at: `Multiverse/<Universe>/<Place path>/<Name>/Venues/<Name>.md`
- Id: `<universe>.venue.<slug>`
- Mixins: base, in_universe, dated

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | id | yes | Namespaced id, unique across the repository. |
| `kind` | string | yes | The note kind. Must match this schema. |
| `name` | string | yes | Display name. Also the file name. |
| `parent` | ref to settlement/district | yes |  |
| `aliases` | list of string |  | Other names it goes by. |
| `tags` | list of string |  |  |
| `summary` | text |  | One to three sentences for indexes and the app. |
| `author` | string |  | Who wrote it (GitHub handle). |
| `status` | one of: `sample`, `draft`, `playtested`, `canon`, `stub`, `active`, `paused`, `dormant`, `archived`, `retired` |  | Editorial status. |
| `universe` | ref to universe | yes | The universe this note belongs to. Must match the first segment of the id. |
| `from` | when |  | When it came to be. `primordial` for things older than the calendar. |
| `to` | when |  | When it ended. `null` while it still exists. May be null. |
| `venue_type` | one of: `tavern`, `inn`, `shop`, `smith`, `temple`, `shrine`, `guildhall`, `market`, `library`, `jail`, `manor`, `hall`, `stable`, `dock`, `academy`, `other` | yes |  |
| `keeper` | ref to person |  | Who runs it. |
| `faction` | ref to faction |  | Who owns or controls it, if not the keeper. |
| `services` | list of string |  | What you can buy or do here, with prices if they matter. |
| `stock` | list of ref to item |  | Notable items for sale. |
| `rumours` | list of string |  |  |
| `hooks` | list of string |  |  |
| `read_aloud` | text |  | What the party sees when they walk in. |
| `dm_notes` | text |  |  |

### household

**Household.** A family or house, with members and goals.

- Lives at: `Multiverse/<Universe>/<Place path>/<Name>/Households/<Name>.md`
- Id: `<universe>.household.<slug>`
- Mixins: base, in_universe, dated

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | id | yes | Namespaced id, unique across the repository. |
| `kind` | string | yes | The note kind. Must match this schema. |
| `name` | string | yes | Display name. Also the file name. |
| `parent` | ref to settlement/district | yes |  |
| `aliases` | list of string |  | Other names it goes by. |
| `tags` | list of string |  |  |
| `summary` | text |  | One to three sentences for indexes and the app. |
| `author` | string |  | Who wrote it (GitHub handle). |
| `status` | one of: `sample`, `draft`, `playtested`, `canon`, `stub`, `active`, `paused`, `dormant`, `archived`, `retired` |  | Editorial status. |
| `universe` | ref to universe | yes | The universe this note belongs to. Must match the first segment of the id. |
| `from` | when |  | When it came to be. `primordial` for things older than the calendar. |
| `to` | when |  | When it ended. `null` while it still exists. May be null. |
| `members` | list of ref to person |  |  |
| `goals` | list of string |  |  |

## People and powers

### person

**Person.** A named character, player or non-player. NPCs live under the settlement they belong to; instance characters live under their instance.

- Lives at: `Multiverse/<Universe>/<Place path>/<Name>/People/<Name>.md`, `Multiverse/<Universe>/Factions/<Name>/People/<Name>.md`, `Multiverse/<Universe>/Instances/<Name>/Overlay/<Name>.md`, `Multiverse/<Universe>/Instances/<Name>/Pregens/<Name>.md`, `Multiverse/<Universe>/Dungeons/<Dungeon>/People/<Name>.md`
- Id: `<universe>.person.<slug>`, `<instance>.person.<slug>`
- Mixins: base, in_universe, dated

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | id | yes | Namespaced id, unique across the repository. |
| `kind` | string | yes | The note kind. Must match this schema. |
| `name` | string | yes | Display name. Also the file name. |
| `parent` | ref to settlement/district/household/faction/dungeon/region/campaign/universe | yes |  |
| `aliases` | list of string |  | Other names it goes by. |
| `tags` | list of string |  |  |
| `summary` | text |  | One to three sentences for indexes and the app. |
| `author` | string |  | Who wrote it (GitHub handle). |
| `status` | one of: `sample`, `draft`, `playtested`, `canon`, `stub`, `active`, `paused`, `dormant`, `archived`, `retired` |  | Editorial status. |
| `universe` | ref to universe | yes | The universe this note belongs to. Must match the first segment of the id. |
| `from` | when |  | When it came to be. `primordial` for things older than the calendar. |
| `to` | when |  | When it ended. `null` while it still exists. May be null. |
| `species` | string |  |  |
| `role` | string |  | Their job or place in the story, e.g. innkeeper, cult leader, rival. |
| `faction` | ref to faction |  | Primary allegiance. |
| `household` | ref to household |  |  |
| `instance` | ref to instance |  | Set for characters that exist only in one instance. |
| `sheet` | any |  | Character sheet for player characters |
| `location` | ref to any note |  | Where they usually are (venue, settlement, dungeon room). |
| `ruleset` | ref to ruleset |  |  |
| `stats` | any |  | Stat block in the ruleset's own shape. |
| `stat_block` | ref to monster |  | Use a bestiary entry instead of inline stats. |
| `appearance` | text |  |  |
| `voice` | text |  | How to play them at the table, in a line or two. |
| `wants` | list of string |  |  |
| `fears` | list of string |  |  |
| `secret` | text |  | Something the party can discover. |
| `goals` | list of string |  |  |
| `relationships` | list of map |  |  |
| `relationships.type` | string | yes | member_of, rival, debtor, patron, lover, sibling, ... |
| `relationships.with` | ref to any note | yes |  |
| `relationships.note` | string |  |  |
| `relationships.strength` | int |  |  |
| `tropes` | list of ref to trope/trope_instance |  |  |
| `instance_roles` | list of ref to trope_instance |  |  |
| `player_character` | bool |  | True for a party member. |
| `pregen` | bool |  | True for a ready-made character handed to a player. |
| `player` | string |  | Who plays them. |

### faction

**Faction.** An organisation with goals, assets and rivals: guild, cult, court, company, gang, order.

- Lives at: `Multiverse/<Universe>/Factions/<Name>.md`
- Id: `<universe>.faction.<slug>`
- Mixins: base, in_universe, dated

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | id | yes | Namespaced id, unique across the repository. |
| `kind` | string | yes | The note kind. Must match this schema. |
| `name` | string | yes | Display name. Also the file name. |
| `parent` | ref to universe | yes |  |
| `aliases` | list of string |  | Other names it goes by. |
| `tags` | list of string |  |  |
| `summary` | text |  | One to three sentences for indexes and the app. |
| `author` | string |  | Who wrote it (GitHub handle). |
| `status` | one of: `sample`, `draft`, `playtested`, `canon`, `stub`, `active`, `paused`, `dormant`, `archived`, `retired` |  | Editorial status. |
| `universe` | ref to universe | yes | The universe this note belongs to. Must match the first segment of the id. |
| `from` | when |  | When it came to be. `primordial` for things older than the calendar. |
| `to` | when |  | When it ended. `null` while it still exists. May be null. |
| `faction_type` | one of: `guild`, `cult`, `government`, `noble_house`, `company`, `gang`, `order`, `church`, `academy`, `union`, `militia`, `tribe`, `other` |  |  |
| `reach` | one of: `local`, `regional`, `national`, `planar`, `cosmic` |  |  |
| `base` | ref to settlement/district/venue/dungeon/region |  | Where it operates from. |
| `leader` | ref to person |  |  |
| `members` | list of ref to person |  |  |
| `goals` | list of string | yes |  |
| `methods` | list of string |  | How it goes about its goals. |
| `assets` | list of string |  | What it controls: places, money, secrets, armies. |
| `allies` | list of ref to faction |  |  |
| `rivals` | list of ref to faction |  |  |
| `dungeons` | list of ref to dungeon |  | Sites it built, holds, wants or fears. |
| `reputation` | string |  | What ordinary people think of it. |
| `secret` | text |  | What it does not want known. |
| `hooks` | list of string |  |  |
| `tropes` | list of ref to trope/trope_instance |  |  |

### deity

**Deity.** A god, spirit or power that people pray to.

- Lives at: `Multiverse/<Universe>/Pantheon/<Name>.md`
- Id: `<universe>.deity.<slug>`
- Mixins: base, in_universe, dated

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | id | yes | Namespaced id, unique across the repository. |
| `kind` | string | yes | The note kind. Must match this schema. |
| `name` | string | yes | Display name. Also the file name. |
| `parent` | ref to universe | yes |  |
| `aliases` | list of string |  | Other names it goes by. |
| `tags` | list of string |  |  |
| `summary` | text |  | One to three sentences for indexes and the app. |
| `author` | string |  | Who wrote it (GitHub handle). |
| `status` | one of: `sample`, `draft`, `playtested`, `canon`, `stub`, `active`, `paused`, `dormant`, `archived`, `retired` |  | Editorial status. |
| `universe` | ref to universe | yes | The universe this note belongs to. Must match the first segment of the id. |
| `from` | when |  | When it came to be. `primordial` for things older than the calendar. |
| `to` | when |  | When it ended. `null` while it still exists. May be null. |
| `title` | string |  | Epithet |
| `domains` | list of string | yes |  |
| `alignment` | string |  |  |
| `symbol` | string |  |  |
| `tenets` | list of string | yes |  |
| `worshippers` | list of string |  |  |
| `church` | ref to faction |  |  |
| `holy_days` | list of ref to holiday |  |  |
| `allies` | list of ref to deity |  |  |
| `rivals` | list of ref to deity |  |  |
| `boons` | list of string |  | What the faithful get. |
| `wrath` | list of string |  | What the faithless get. |

### culture

**Culture.** A people and how they live.

- Lives at: `Multiverse/<Universe>/Lore/Cultures/<Name>.md`
- Id: `<universe>.culture.<slug>`
- Mixins: base, in_universe, dated

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | id | yes | Namespaced id, unique across the repository. |
| `kind` | string | yes | The note kind. Must match this schema. |
| `name` | string | yes | Display name. Also the file name. |
| `parent` | ref to universe | yes |  |
| `aliases` | list of string |  | Other names it goes by. |
| `tags` | list of string |  |  |
| `summary` | text |  | One to three sentences for indexes and the app. |
| `author` | string |  | Who wrote it (GitHub handle). |
| `status` | one of: `sample`, `draft`, `playtested`, `canon`, `stub`, `active`, `paused`, `dormant`, `archived`, `retired` |  | Editorial status. |
| `universe` | ref to universe | yes | The universe this note belongs to. Must match the first segment of the id. |
| `from` | when |  | When it came to be. `primordial` for things older than the calendar. |
| `to` | when |  | When it ended. `null` while it still exists. May be null. |
| `homeland` | ref to any note |  |  |
| `peoples` | list of string |  |  |
| `languages` | list of ref to language |  |  |
| `values` | list of string | yes |  |
| `customs` | list of string | yes |  |
| `dress` | string |  |  |
| `food` | string |  |  |
| `names` | map |  | Name lists by category (given, family, place). |
| `deities` | list of ref to deity |  |  |

### language

**Language.** A tongue, with who speaks it and how it sounds.

- Lives at: `Multiverse/<Universe>/Lore/Languages/<Name>.md`
- Id: `<universe>.language.<slug>`
- Mixins: base, in_universe

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | id | yes | Namespaced id, unique across the repository. |
| `kind` | string | yes | The note kind. Must match this schema. |
| `name` | string | yes | Display name. Also the file name. |
| `parent` | ref to universe | yes |  |
| `aliases` | list of string |  | Other names it goes by. |
| `tags` | list of string |  |  |
| `summary` | text |  | One to three sentences for indexes and the app. |
| `author` | string |  | Who wrote it (GitHub handle). |
| `status` | one of: `sample`, `draft`, `playtested`, `canon`, `stub`, `active`, `paused`, `dormant`, `archived`, `retired` |  | Editorial status. |
| `universe` | ref to universe | yes | The universe this note belongs to. Must match the first segment of the id. |
| `speakers` | list of string | yes |  |
| `script` | string |  |  |
| `sound` | string |  | How to fake it at the table. |
| `phrases` | list of map |  |  |
| `phrases.say` | string | yes |  |
| `phrases.means` | string | yes |  |

## Time

### calendar

**Calendar.** How a universe counts days.

- Lives at: `Multiverse/<Universe>/Calendar.md`
- Id: `<universe>.calendar.<slug>`
- Mixins: base, in_universe

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | id | yes | Namespaced id, unique across the repository. |
| `kind` | string | yes | The note kind. Must match this schema. |
| `name` | string | yes | Display name. Also the file name. |
| `parent` | ref to universe | yes |  |
| `aliases` | list of string |  | Other names it goes by. |
| `tags` | list of string |  |  |
| `summary` | text |  | One to three sentences for indexes and the app. |
| `author` | string |  | Who wrote it (GitHub handle). |
| `status` | one of: `sample`, `draft`, `playtested`, `canon`, `stub`, `active`, `paused`, `dormant`, `archived`, `retired` |  | Editorial status. |
| `universe` | ref to universe | yes | The universe this note belongs to. Must match the first segment of the id. |
| `year_length_days` | int | yes |  |
| `months` | list of map | yes |  |
| `months.name` | string | yes |  |
| `months.days` | int | yes |  |
| `months.season` | string |  |  |
| `weekdays` | list of string |  |  |
| `year_zero` | string |  | What year 1 counts from. |
| `holidays` | list of ref to holiday |  |  |
| `moons` | list of map |  |  |
| `moons.name` | string | yes |  |
| `moons.cycle_days` | int | yes |  |

### holiday

**Holiday.** A recurring day on a calendar, with customs a party can walk into.

- Lives at: `Multiverse/<Universe>/Holidays/<Name>.md`
- Id: `<universe>.holiday.<slug>`
- Mixins: base, in_universe, dated

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | id | yes | Namespaced id, unique across the repository. |
| `kind` | string | yes | The note kind. Must match this schema. |
| `name` | string | yes | Display name. Also the file name. |
| `parent` | ref to calendar | yes |  |
| `aliases` | list of string |  | Other names it goes by. |
| `tags` | list of string |  |  |
| `summary` | text |  | One to three sentences for indexes and the app. |
| `author` | string |  | Who wrote it (GitHub handle). |
| `status` | one of: `sample`, `draft`, `playtested`, `canon`, `stub`, `active`, `paused`, `dormant`, `archived`, `retired` |  | Editorial status. |
| `universe` | ref to universe | yes | The universe this note belongs to. Must match the first segment of the id. |
| `from` | when |  | When it came to be. `primordial` for things older than the calendar. |
| `to` | when |  | When it ended. `null` while it still exists. May be null. |
| `when` | map | yes |  |
| `when.month` | int | yes |  |
| `when.day` | int | yes |  |
| `when.length_days` | int |  |  |
| `observed_by` | list of ref to settlement/country/faction/culture/deity |  |  |
| `customs` | list of string | yes |  |
| `hooks` | list of string |  |  |

### era

**Era.** A named span of a universe's history.

- Lives at: `Multiverse/<Universe>/Eras/<Name>.md`
- Id: `<universe>.era.<slug>`
- Mixins: base, in_universe, dated

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | id | yes | Namespaced id, unique across the repository. |
| `kind` | string | yes | The note kind. Must match this schema. |
| `name` | string | yes | Display name. Also the file name. |
| `parent` | ref to universe | yes |  |
| `aliases` | list of string |  | Other names it goes by. |
| `tags` | list of string |  |  |
| `summary` | text |  | One to three sentences for indexes and the app. |
| `author` | string |  | Who wrote it (GitHub handle). |
| `status` | one of: `sample`, `draft`, `playtested`, `canon`, `stub`, `active`, `paused`, `dormant`, `archived`, `retired` |  | Editorial status. |
| `universe` | ref to universe | yes | The universe this note belongs to. Must match the first segment of the id. |
| `from` | when | yes |  |
| `to` | when |  | When it ended. `null` while it still exists. May be null. |
| `character` | string |  | The era in a phrase. |

### event

**Event.** Something that happened in canon, with the state changes it caused. The timeline is the ordered set of these.

- Lives at: `Multiverse/<Universe>/Events/<year>/<year>-<nnnn> <Name>.md`
- Id: `<universe>.event.<year>-<nnnn>-<slug>`
- Mixins: base, in_universe

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | id | yes | Namespaced id, unique across the repository. |
| `kind` | string | yes | The note kind. Must match this schema. |
| `name` | string | yes | Display name. Also the file name. |
| `parent` | ref to universe | yes |  |
| `aliases` | list of string |  | Other names it goes by. |
| `tags` | list of string |  |  |
| `summary` | text |  | One to three sentences for indexes and the app. |
| `author` | string |  | Who wrote it (GitHub handle). |
| `status` | one of: `sample`, `draft`, `playtested`, `canon`, `stub`, `active`, `paused`, `dormant`, `archived`, `retired` |  | Editorial status. |
| `universe` | ref to universe | yes | The universe this note belongs to. Must match the first segment of the id. |
| `when` | when | yes |  |
| `where` | ref to any note |  | Place it happened. |
| `participants` | list of ref to any note |  |  |
| `type` | string | yes | battle, founding, death, discovery, social_conflict, disaster, decree, rift, ... |
| `severity` | int | yes | 0 trivial to 5 world-changing. |
| `visibility` | one of: `public`, `rumoured`, `secret` | yes |  |
| `canon` | one of: `canon`, `local`, `proposed`, `rejected` | yes |  |
| `source` | string |  | maintainer, generator name, or instance id. |
| `era` | ref to era |  |  |
| `deltas` | list of map |  |  |
| `deltas.entity` | ref to any note | yes |  |
| `deltas.field` | string | yes |  |
| `deltas.from` | any |  |  |
| `deltas.to` | any |  |  |
| `tropes_involved` | list of ref to trope |  |  |
| `caused_by` | list of ref to event |  |  |
| `quest` | ref to quest |  |  |

## Story

### trope

**Trope.** A reusable story pattern with beats and hooks. Shared by every universe.

- Lives at: `Tropes/<Name>.md`
- Id: `omniverse.trope.<slug>`
- Mixins: base

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | id | yes | Namespaced id, unique across the repository. |
| `kind` | string | yes | The note kind. Must match this schema. |
| `name` | string | yes | Display name. Also the file name. |
| `parent` | ref to omniverse | yes |  |
| `aliases` | list of string |  | Other names it goes by. |
| `tags` | list of string |  |  |
| `summary` | text |  | One to three sentences for indexes and the app. |
| `author` | string |  | Who wrote it (GitHub handle). |
| `status` | one of: `sample`, `draft`, `playtested`, `canon`, `stub`, `active`, `paused`, `dormant`, `archived`, `retired` |  | Editorial status. |
| `category` | one of: `character`, `place`, `plot`, `item`, `monster`, `encounter`, `structure`, `party`, `meta`, `setting` | yes |  |
| `roles` | list of string |  |  |
| `beats` | list of string | yes |  |
| `hooks` | list of string | yes |  |
| `required_in_instance` | list of string |  |  |
| `subverts` | list of ref to trope |  |  |
| `related` | list of ref to trope |  |  |
| `examples` | list of string |  |  |

### trope_instance

**Trope instance.** A trope made concrete in one universe, bound to people and places, with a twist.

- Lives at: `Multiverse/<Universe>/Trope Instances/<Name>.md`
- Id: `<universe>.instance.<slug>`
- Mixins: base, in_universe, dated

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | id | yes | Namespaced id, unique across the repository. |
| `kind` | string | yes | The note kind. Must match this schema. |
| `name` | string | yes | Display name. Also the file name. |
| `parent` | ref to universe | yes |  |
| `aliases` | list of string |  | Other names it goes by. |
| `tags` | list of string |  |  |
| `summary` | text |  | One to three sentences for indexes and the app. |
| `author` | string |  | Who wrote it (GitHub handle). |
| `status` | one of: `sample`, `draft`, `playtested`, `canon`, `stub`, `active`, `paused`, `dormant`, `archived`, `retired` |  | Editorial status. |
| `universe` | ref to universe | yes | The universe this note belongs to. Must match the first segment of the id. |
| `from` | when |  | When it came to be. `primordial` for things older than the calendar. |
| `to` | when |  | When it ended. `null` while it still exists. May be null. |
| `instance_of` | ref to trope | yes |  |
| `bound_to` | map |  | Keys are roles (person, place, item, faction); values are ids. |
| `tone` | string |  |  |
| `twist` | text | yes |  |
| `stakes` | text | yes |  |
| `hooks_offered` | list of string | yes |  |

### quest

**Quest.** A chain of stages threading towns, factions and dungeons, with outcomes that can become canon events.

- Lives at: `Multiverse/<Universe>/Quests/<Name>.md`
- Id: `<universe>.quest.<slug>`
- Mixins: base, in_universe

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | id | yes | Namespaced id, unique across the repository. |
| `kind` | string | yes | The note kind. Must match this schema. |
| `name` | string | yes | Display name. Also the file name. |
| `parent` | ref to universe | yes |  |
| `aliases` | list of string |  | Other names it goes by. |
| `tags` | list of string |  |  |
| `summary` | text |  | One to three sentences for indexes and the app. |
| `author` | string | yes |  |
| `status` | one of: `sample`, `draft`, `playtested`, `canon` | yes |  |
| `universe` | ref to universe | yes | The universe this note belongs to. Must match the first segment of the id. |
| `giver` | ref to person/faction/venue |  |  |
| `start` | ref to settlement/venue/dungeon |  | Where it begins. |
| `level_range` | list of int | yes | Exactly 2 items. |
| `premise` | text | yes |  |
| `hooks` | list of string | yes |  |
| `stages` | list of map | yes |  |
| `stages.name` | string | yes |  |
| `stages.goal` | text | yes |  |
| `stages.where` | ref to any note |  |  |
| `stages.dungeon` | ref to dungeon |  |  |
| `stages.complications` | list of string |  |  |
| `stages.clue` | string |  | What points to the next stage. |
| `rewards` | list of any |  | Strings or item ids. |
| `on_success` | text | yes | What changes in the world. |
| `on_failure` | text | yes |  |
| `factions` | list of ref to faction |  |  |
| `dungeons` | list of ref to dungeon |  |  |
| `tropes_involved` | list of ref to trope |  |  |

### lore

**Lore.** A myth, legend, history, custom or song. The text is the note body.

- Lives at: `Multiverse/<Universe>/Lore/<Name>.md`
- Id: `<universe>.lore.<slug>`
- Mixins: base, in_universe

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | id | yes | Namespaced id, unique across the repository. |
| `kind` | string | yes | The note kind. Must match this schema. |
| `name` | string | yes | Display name. Also the file name. |
| `parent` | ref to universe | yes |  |
| `aliases` | list of string |  | Other names it goes by. |
| `tags` | list of string |  |  |
| `summary` | text |  | One to three sentences for indexes and the app. |
| `author` | string |  | Who wrote it (GitHub handle). |
| `status` | one of: `sample`, `draft`, `playtested`, `canon`, `stub`, `active`, `paused`, `dormant`, `archived`, `retired` |  | Editorial status. |
| `universe` | ref to universe | yes | The universe this note belongs to. Must match the first segment of the id. |
| `category` | one of: `myth`, `legend`, `history`, `custom`, `song`, `prophecy`, `rumour`, `treatise` | yes |  |
| `about` | list of ref to any note |  | Notes this lore concerns. |
| `truth` | one of: `True`, `mostly`, `half`, `False`, `unknown` |  | How true it is, for the DM. |
| `known_by` | list of string |  | Who tells it. |

### table

**Random table.** A rollable table. Tools roll them; DMs read them.

- Lives at: `Multiverse/<Universe>/Tables/<Name>.md`, `Tables/<Name>.md`
- Id: `<universe>.table.<slug>`, `omniverse.table.<slug>`
- Mixins: base, in_universe

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | id | yes | Namespaced id, unique across the repository. |
| `kind` | string | yes | The note kind. Must match this schema. |
| `name` | string | yes | Display name. Also the file name. |
| `parent` | ref to universe/omniverse | yes |  |
| `aliases` | list of string |  | Other names it goes by. |
| `tags` | list of string |  |  |
| `summary` | text |  | One to three sentences for indexes and the app. |
| `author` | string |  | Who wrote it (GitHub handle). |
| `status` | one of: `sample`, `draft`, `playtested`, `canon`, `stub`, `active`, `paused`, `dormant`, `archived`, `retired` |  | Editorial status. |
| `universe` | ref to universe | yes | The universe this note belongs to. Must match the first segment of the id. |
| `category` | one of: `rumour`, `encounter`, `weather`, `name`, `complication`, `loot`, `treasure`, `event`, `reaction`, `hook`, `other` | yes |  |
| `die` | dice | yes | What to roll, e.g. d20 or d100. |
| `where` | ref to any note |  | Place this table applies to, if any. |
| `entries` | list of map | yes |  |
| `entries.roll` | any | yes | A number or a range "6-10". Entries must cover the die without gaps or overlap. |
| `entries.text` | string | yes |  |
| `entries.ref` | ref to any note |  | A note the result points at (monster, item, person). |
| `entries.count` | dice |  | How many, for encounters. |

## Adventure sites

### dungeon

**Dungeon.** An adventure site made of rooms. Anyone can submit one by pull request; the build tool indexes it for the DM screen app.

- Lives at: `Multiverse/<Universe>/Dungeons/<Name>/<Name>.md`
- Id: `<universe>.dungeon.<slug>`
- Mixins: base, in_universe

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | id | yes | Namespaced id, unique across the repository. |
| `kind` | string | yes | The note kind. Must match this schema. |
| `name` | string | yes | Display name. Also the file name. |
| `parent` | ref to settlement/district/region/province/country/venue/plane | yes | The place that contains it. |
| `aliases` | list of string |  | Other names it goes by. |
| `tags` | list of string |  |  |
| `summary` | text | yes |  |
| `author` | string | yes |  |
| `status` | one of: `sample`, `draft`, `playtested`, `canon` | yes |  |
| `universe` | ref to universe | yes | The universe this note belongs to. Must match the first segment of the id. |
| `code` | string | yes | Short unique code, used in room codes and app routes. Pattern `^[A-Z]{3,4}$`. |
| `ruleset` | ref to ruleset | yes |  |
| `level_range` | list of int | yes | Exactly 2 items. |
| `tone` | string | yes |  |
| `entry` | ref to room | yes | The room the party enters through. |
| `home_town` | ref to settlement |  | Where a party stages from. |
| `factions` | list of ref to faction |  | Who built it, holds it, or wants what is in it. |
| `tropes_involved` | list of ref to trope |  |  |
| `hooks` | list of string | yes |  |
| `rumours` | list of string |  |  |
| `wandering` | map |  |  |
| `wandering.die` | dice | yes |  |
| `wandering.entries` | list of string | yes |  |
| `quests` | list of ref to quest |  |  |

### room

**Room.** One room of a dungeon, with read-aloud text, exits, and everything the DM needs to run it.

- Lives at: `Multiverse/<Universe>/Dungeons/<Dungeon>/Rooms/<Name>.md`
- Id: `<universe>.room.<dungeon>.<nn>-<slug>`
- Mixins: base, in_universe

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | id | yes | Namespaced id, unique across the repository. |
| `kind` | string | yes | The note kind. Must match this schema. |
| `name` | string | yes | Display name. Also the file name. |
| `parent` | ref to dungeon | yes |  |
| `aliases` | list of string |  | Other names it goes by. |
| `tags` | list of string |  |  |
| `summary` | text |  | One to three sentences for indexes and the app. |
| `author` | string |  | Who wrote it (GitHub handle). |
| `status` | one of: `sample`, `draft`, `playtested`, `canon`, `stub`, `active`, `paused`, `dormant`, `archived`, `retired` |  | Editorial status. |
| `universe` | ref to universe | yes | The universe this note belongs to. Must match the first segment of the id. |
| `dungeon` | ref to dungeon | yes |  |
| `number` | int | yes |  |
| `code` | string | yes | Pattern `^[A-Z]{3,4}-\d{2}$`. |
| `light` | string |  |  |
| `size` | string |  | e.g. "30 x 20 ft" or "irregular |
| `exits` | list of map | yes |  |
| `exits.dir` | one of: `n`, `s`, `e`, `w`, `ne`, `nw`, `se`, `sw`, `u`, `d`, `out` | yes |  |
| `exits.to` | string | yes | Room id |
| `exits.kind` | one of: `door`, `archway`, `passage`, `stairs`, `ladder`, `secret`, `portal`, `hatch`, `window`, `chute`, `bridge` | yes |  |
| `exits.state` | one of: `open`, `closed`, `locked`, `stuck`, `barred`, `trapped`, `hidden`, `rubble` | yes |  |
| `exits.note` | string |  |  |
| `read_aloud` | text | yes |  |
| `features` | list of string |  |  |
| `encounters` | list of map |  |  |
| `encounters.name` | string | yes |  |
| `encounters.monsters` | list of map | yes |  |
| `encounters.tactics` | text |  |  |
| `encounters.treasure` | string |  | What the encounter carries or guards. |
| `traps` | list of map |  |  |
| `traps.name` | string | yes |  |
| `traps.trigger` | string | yes |  |
| `traps.effect` | string | yes |  |
| `traps.detect_dc` | int | yes |  |
| `traps.disarm_dc` | int | yes |  |
| `puzzles` | list of map |  |  |
| `puzzles.name` | string | yes |  |
| `puzzles.description` | text | yes |  |
| `puzzles.solution` | text | yes |  |
| `puzzles.hints` | list of string |  |  |
| `puzzles.reward` | string |  |  |
| `secrets` | list of map |  |  |
| `secrets.description` | string | yes |  |
| `secrets.dc` | int | yes |  |
| `loot` | list of any |  | Strings, or item ids. |
| `dm_notes` | text |  |  |

### monster

**Monster.** A creature stat block, in the ruleset's shape, that rooms and encounters reference by id.

- Lives at: `Multiverse/<Universe>/Bestiary/<Name>.md`
- Id: `<universe>.monster.<slug>`
- Mixins: base, in_universe

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | id | yes | Namespaced id, unique across the repository. |
| `kind` | string | yes | The note kind. Must match this schema. |
| `name` | string | yes | Display name. Also the file name. |
| `parent` | ref to universe | yes |  |
| `aliases` | list of string |  | Other names it goes by. |
| `tags` | list of string |  |  |
| `summary` | text |  | One to three sentences for indexes and the app. |
| `author` | string |  | Who wrote it (GitHub handle). |
| `status` | one of: `sample`, `draft`, `playtested`, `canon`, `stub`, `active`, `paused`, `dormant`, `archived`, `retired` |  | Editorial status. |
| `universe` | ref to universe | yes | The universe this note belongs to. Must match the first segment of the id. |
| `ruleset` | ref to ruleset | yes |  |
| `size` | one of: `tiny`, `small`, `medium`, `large`, `huge`, `gargantuan` | yes |  |
| `type` | string | yes | beast, humanoid, undead, construct, ... |
| `cr` | number | yes | Challenge rating or the ruleset's equivalent. |
| `alignment` | string |  |  |
| `ac` | int | yes |  |
| `hp` | int | yes |  |
| `hp_dice` | dice |  |  |
| `speed` | string | yes |  |
| `abilities` | map | yes |  |
| `abilities.str` | int | yes |  |
| `abilities.dex` | int | yes |  |
| `abilities.con` | int | yes |  |
| `abilities.int` | int | yes |  |
| `abilities.wis` | int | yes |  |
| `abilities.cha` | int | yes |  |
| `saves` | string |  |  |
| `skills` | string |  |  |
| `resistances` | string |  |  |
| `immunities` | string |  |  |
| `senses` | string |  |  |
| `languages` | string |  |  |
| `traits` | list of map |  |  |
| `traits.name` | string | yes |  |
| `traits.text` | text | yes |  |
| `actions` | list of map | yes |  |
| `actions.name` | string | yes |  |
| `actions.text` | text | yes |  |
| `reactions` | list of map |  |  |
| `reactions.name` | string | yes |  |
| `reactions.text` | text | yes |  |
| `legendary` | list of map |  |  |
| `legendary.name` | string | yes |  |
| `legendary.text` | text | yes |  |
| `tactics` | text |  | How it fights. |
| `lore` | text |  | What it is in this universe. |
| `loot` | ref to table |  | What it carries, as a table. |
| `tropes` | list of ref to trope |  |  |
| `xp` | int |  |  |

### item

**Item.** A notable object: magic item, trinket, treasure, tool.

- Lives at: `Multiverse/<Universe>/Items/<Name>.md`
- Id: `<universe>.item.<slug>`
- Mixins: base, in_universe

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | id | yes | Namespaced id, unique across the repository. |
| `kind` | string | yes | The note kind. Must match this schema. |
| `name` | string | yes | Display name. Also the file name. |
| `parent` | ref to universe | yes |  |
| `aliases` | list of string |  | Other names it goes by. |
| `tags` | list of string |  |  |
| `summary` | text |  | One to three sentences for indexes and the app. |
| `author` | string |  | Who wrote it (GitHub handle). |
| `status` | one of: `sample`, `draft`, `playtested`, `canon`, `stub`, `active`, `paused`, `dormant`, `archived`, `retired` |  | Editorial status. |
| `universe` | ref to universe | yes | The universe this note belongs to. Must match the first segment of the id. |
| `item_type` | one of: `weapon`, `armor`, `shield`, `wondrous`, `potion`, `scroll`, `ring`, `rod`, `staff`, `wand`, `tool`, `trinket`, `treasure`, `consumable`, `document`, `key`, `other` | yes |  |
| `rarity` | one of: `common`, `uncommon`, `rare`, `very_rare`, `legendary`, `artifact`, `mundane` | yes |  |
| `attunement` | bool |  |  |
| `value_gp` | number |  |  |
| `weight_lb` | number |  |  |
| `description` | text | yes | What it looks like and does, as read to players. |
| `mechanics` | text |  | Rules text. |
| `properties` | list of string |  |  |
| `curse` | text |  |  |
| `history` | text |  | Where it came from. |
| `owner` | ref to person/faction/monster |  |  |
| `location` | ref to room/venue/settlement/dungeon |  |  |
| `tropes` | list of ref to trope |  |  |

## Play

### instance

**Instance.** A playable timeline forked from canon at a point. Sessions log into it; a merge proposes its events back.

- Lives at: `Multiverse/<Universe>/Instances/<Name>/_instance.md`
- Id: `<slug>`
- Mixins: base, in_universe

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | id | yes | Namespaced id, unique across the repository. |
| `kind` | string | yes | The note kind. Must match this schema. |
| `name` | string | yes | Display name. Also the file name. |
| `parent` | ref to universe | yes |  |
| `aliases` | list of string |  | Other names it goes by. |
| `tags` | list of string |  |  |
| `summary` | text |  | One to three sentences for indexes and the app. |
| `author` | string |  | Who wrote it (GitHub handle). |
| `status` | one of: `active`, `paused`, `finished`, `merged`, `abandoned` | yes |  |
| `universe` | ref to universe | yes | The universe this note belongs to. Must match the first segment of the id. |
| `fork_point` | map | yes |  |
| `fork_point.event` | ref to event |  |  |
| `fork_point.year` | int | yes |  |
| `fork_point.day` | int | yes |  |
| `visibility` | one of: `private`, `public` | yes |  |
| `maintainers` | list of string | yes |  |
| `scenario` | string |  | The starting scenario chosen at session zero. |

### campaign

**Campaign.** The party and arc inside an instance.

- Lives at: `Multiverse/<Universe>/Instances/<Name>/Campaign.md`
- Id: `<instance>.campaign`
- Mixins: base

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | id | yes | Namespaced id, unique across the repository. |
| `kind` | string | yes | The note kind. Must match this schema. |
| `name` | string | yes | Display name. Also the file name. |
| `parent` | ref to instance | yes |  |
| `aliases` | list of string |  | Other names it goes by. |
| `tags` | list of string |  |  |
| `summary` | text |  | One to three sentences for indexes and the app. |
| `author` | string |  | Who wrote it (GitHub handle). |
| `status` | one of: `sample`, `draft`, `playtested`, `canon`, `stub`, `active`, `paused`, `dormant`, `archived`, `retired` |  | Editorial status. |
| `campaign` | ref to instance | yes |  |
| `party` | list of ref to person | yes |  |
| `ruleset` | ref to ruleset | yes |  |
| `arc` | text |  |  |
| `quests` | list of ref to quest |  |  |

### session

**Session.** One sitting's log: what happened, as events with deltas, plus the rolls.

- Lives at: `Multiverse/<Universe>/Instances/<Name>/log/<Name>.md`
- Id: `<instance>.session.<nn>`
- Mixins: none

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | id | yes |  |
| `kind` | `session` |  |  |
| `parent` | ref to campaign | yes |  |
| `campaign` | ref to instance | yes |  |
| `adventure` | string |  |  |
| `session` | int | yes |  |
| `real_date` | any | yes |  |
| `world_date` | when | yes |  |
| `party` | list of ref to person | yes |  |
| `events` | list of map | yes |  |
| `events.id` | string | yes |  |
| `events.type` | string | yes |  |
| `events.where` | ref to any note |  |  |
| `events.participants` | list of ref to any note |  |  |
| `events.severity` | int | yes |  |
| `events.visibility` | one of: `public`, `rumoured`, `secret` | yes |  |
| `events.canon` | one of: `local`, `proposed`, `canon`, `rejected` | yes |  |
| `events.deltas` | list of map |  |  |
| `events.summary` | string |  |  |
| `rolls` | list of map |  |  |
| `rolls.seed` | int |  |  |
| `rolls.what` | string | yes |  |
| `rolls.result` | string | yes |  |
| `summary` | text |  |  |

## Meta

### index

**Index.** A hand-written index note (a folder note or library front page).

- Lives at: `<any>`
- Id: `<any>`
- Mixins: none

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | id |  |  |
| `kind` | `index` |  |  |
| `name` | string |  |  |
| `parent` | ref to any note |  |  |

### guide

**Guide.** A how-to for contributors or players.

- Lives at: `<any>`
- Id: `<any>`
- Mixins: none

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | id |  |  |
| `kind` | `guide` |  |  |
| `name` | string |  |  |
| `parent` | ref to any note |  |  |

### template

**Template.** A copy-and-fill template. Its fields are placeholders and are not validated.

- Lives at: `<any>`
- Id: `<any>`
- Mixins: none

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | id |  |  |
| `kind` | `template` |  |  |
| `name` | string |  |  |
| `parent` | ref to any note |  |  |

### generated

**Generated.** A machine-written note. Never edited by hand; regenerated by a tool.

- Lives at: `<any>`
- Id: `<any>`
- Mixins: none

| Field | Type | Required | Notes |
|---|---|---|---|
| `kind` | `generated` |  |  |
| `generated` | string |  | Which tool wrote it. |
