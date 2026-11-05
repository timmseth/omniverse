---
title: Omniverse — Design Document
status: draft
version: 0.2
updated: 2026-11-04
owner: Seth
---

# Omniverse

**A persistent, git-native tabletop-RPG multiverse. It runs itself, remembers everything, works with any game system, and anyone can merge their own universe into it.**

> Status: **Draft v0.2.** This document describes the intended design. Nothing here is built yet beyond the empty vault. Each decision is tagged **[Decided]**, **[Proposed]** or **[Open]**. Section 21 collects everything still waiting on an answer.
>
> **New in v0.2:** the Omniverse is now system-agnostic. Rulesets are plug-ins (section 14), and D&D 5e is one of them, used by Tropelandia.

---

## Contents

1. Summary
2. Goals and non-goals
3. Design principles
4. Glossary
5. How the repository is organised: lore, state, generated
6. The layer model
7. Repository layout
8. Notes, IDs and schemas
9. Tropes: the shared library
10. Time
11. The simulation: ticks
12. People, population and promotion
13. Relationships and the nemesis system
14. Rulesets: bring your own system
15. The multiverse: universes, maintainers and merging
16. Joining the world as a player
17. Planned universes
18. Tooling and automation
19. Scale and performance
20. Risks
21. Decisions log
22. Roadmap
- Appendix A: Example notes
- Appendix B: Example CODEOWNERS and CI checks

---

## 1. Summary

Omniverse is a shared, living fantasy setting stored as plain Markdown files in a git repository and browsed in Obsidian.

- It is a **multiverse**: many self-contained universes sit side by side under one set of rules. Anyone can build a universe and merge it in, and they stay its maintainer.
- It is **persistent**. The world has a full roster of notable people, head counts for everyone else, a built-in event log, and a simulation that runs offline on a schedule. The world keeps changing whether or not anyone is playing, so people who join are joining an ongoing story.
- It is **built from tropes**. A shared library of fantasy and RPG tropes sits at the top level, and each universe *instantiates* those tropes in its own way. The first universe, **Tropelandia**, plays them for laughs in a Munchkin-style parody where players can do anything: become the tower wizard's apprentice, join the bad guys, or become the chosen one's accountant.
- It is **granular**. The hierarchy runs from the omniverse itself down to an individual person, and detail increases as you go down.
- It is **system-agnostic**. Each universe brings its own ruleset: a published system, a home-brew one, or the built-in minimal one. Tropelandia uses D&D 5e, but the Omniverse itself is tied to no game system.
- It has a **nemesis system** and a web of **typed relationships**, so grudges, rivalries, mentors and families persist and evolve.
- **Git is the metaphysics.** A branch is an alternate timeline, a commit is history, merging a universe is an in-world event (a *Convergence*), and a merge conflict is a *Reality Rift*.

## 2. Goals and non-goals

### Goals
- A world that is always changing and always consistent, with one continuous existence and one history.
- Tongue-in-cheek fun in Tropelandia, with room for serious and straight-faced universes elsewhere.
- As much granularity as possible, down to individual people, without making the world impossible to run.
- Easy for others to contribute: bring a universe, own it, keep it.
- Everything readable and editable as plain text, with no hidden database.
- Deterministic and auditable simulation: any tick can be replayed.

### Non-goals (for now)
- A real-time game server or a graphical client. This is a text-and-files world.
- Full combat simulation, under any ruleset, for every NPC every tick. Offstage events use cheap resolution (section 14).
- Hosting copyrighted book text. The project uses openly licensed rules content and original writing.

## 3. Design principles

1. **Omniverse is serious; universes bring the personality.** The foundation (rules, schemas, engine) is neutral and consistent. Tone, jokes and flavour belong to individual universes.
2. **Tropes are classes; universes hold the instances.** A trope describes an archetype. How it plays out (straight, parody, subverted) is decided where it is instantiated.
3. **One file per thing.** Small files, stable IDs and fewer overlapping edits mean fewer merge conflicts.
4. **Two writers, never one file.** Humans write *lore*. The simulation writes *state* and *events*. They never edit the same file. This is what lets ticks and contributors coexist in one repository.
5. **Detail follows interest.** Detail drops as you go up the hierarchy. Simulation depth is spent where something is happening and saved everywhere else.
6. **Deterministic by default.** The same inputs and the same seed always produce the same tick.
7. **Hierarchy lives in data, not just in folders.** Each note records its parent explicitly, so the structure can change without breaking.
8. **Maintainers own their universe.** Whoever merges a universe in keeps authority over it.
9. **Everything is recorded.** If it happened, it is an event. If it is an event, it has a date, a place and participants.
10. **Rules are plug-ins.** The Omniverse is tied to no game system. Each universe chooses its own ruleset, and the core simulation depends only on a small, system-neutral contract (section 14).

## 4. Glossary

| Term | Meaning |
|---|---|
| **Omniverse** | The root of everything. Owns the rules, engine and trope library. |
| **Multiverse** | The shelf on which universes sit. |
| **Universe** | A complete, self-contained world with its own calendar, tone, canon and maintainer. The unit that is merged in. |
| **Layer / kind** | A level of the hierarchy (planet, city, person…), recorded in a note's `kind` field. |
| **Lore** | Human-written notes: descriptions, histories, intentions. |
| **State** | Machine-written current facts: where someone is, how many people live somewhere, how angry someone is. |
| **Event** | An immutable record of something that happened, with an in-world date. |
| **Tick** | One step of the simulation in a universe. |
| **Census** | The head count and breakdown of "normals" in a place. |
| **Notable** | A named person with their own note. |
| **Promotion** | A normal becoming a notable because something significant happened to them. |
| **Trope** | A shared archetype in the library. |
| **Instance** | A specific thing in a universe that realises a trope. |
| **Convergence** | The event of a universe merging into the multiverse. |
| **Reality Rift** | A conflict between two canons that a maintainer must resolve. |
| **Omni tick** | The absolute, universe-independent counter used to order things across universes. |
| **Ruleset** | The mechanical system a universe uses for its people, monsters, conflicts and progression (D&D 5e, a home-brew system, or the built-in Core ruleset). |
| **Omni power** | A shared 0–100 scale that every ruleset maps its entities onto, so events can cross rulesets. |

## 5. How the repository is organised: lore, state, generated

Everything in the repository is one of three kinds of content.

| Kind | Written by | Examples | Rule |
|---|---|---|---|
| **Lore** | Humans (maintainers, players) | A planet's description, a person's backstory, a trope definition | Edited through normal pull requests. |
| **State** | The simulation | Current location of a person, a city's population breakdown, grudge intensities | Never hand-edited. Each tick rewrites only the state files it needs to. |
| **Events** | The simulation, plus humans for backfilled history | "The Siege of Barrowdale, 1489" | Append-only. One file per event. Corrections are new events. |
| **Generated** | Scripts | "Previously on…" digests, rosters, rumour boards | Safe to regenerate at any time. Do not edit. |

Because the simulation touches only state, event and generated paths, and humans touch only lore, ticks and pull requests rarely collide.

## 6. The layer model

Every note has a `kind` and, except for the root, a `parent`. The layers below are the starting set. They are data, so new layers can be added later without restructuring anything.

| # | Layer (`kind`) | What it is | What it owns | Simulated detail |
|---|---|---|---|---|
| 1 | `omniverse` | The root | Rules, engine, trope library, merge law | None. Configuration only. |
| 2 | `multiverse` | The shelf of universes | The universe registry, Convergence history | None. |
| 3 | `universe` | A complete world | Calendar, tone, canon, maintainer, tick settings | Clock and global events. |
| 4 | `plane` | A realm or plane (Material, Feywild, Shadowfell…) | Planar rules, time-flow rate | Planar events. |
| 5 | `galaxy` | A galaxy | A name and a container | Almost none. |
| 6 | `star_system` | A star and its worlds | Calendar-relevant facts, omens | Light and seasons. |
| 7 | `planet` | A world | Climate, ecology, magic level, calendar | Climate, large events. |
| 8 | `continent` | A landmass | Geography, trade routes | Migration, long wars. |
| 9 | `region` | A biome or borderland | Terrain, hazards, trope sites | Hazards, wandering threats. |
| 10 | `province` | A political subdivision | Local government | Taxes, local conflict. |
| 11 | `country` | A nation | Government, laws, currency, relations | Diplomacy, war, succession. |
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

## 7. Repository layout

**[Proposed]** Folders cover the top of the hierarchy, where there are few nodes, and `parent` links carry the rest. Deep nesting of every level is avoided because it breaks on Windows path-length limits and makes moving a note noisy in git.

```
Omniverse/                              (vault root = git repo root)
├── README.md                           this document
├── CODEOWNERS                          who owns which universe (section 15)
├── _rules/                             serious, shared, maintained by Omniverse maintainers
│   ├── schemas/                        frontmatter schemas per kind
│   ├── templates/                      note and universe templates
│   ├── engine/                         tick engine, validators, generators
│   └── conventions.md                  naming, IDs, style
├── Rulesets/                           the shared ruleset library (section 14)
│   ├── Core/                           built-in minimal ruleset
│   ├── dnd5e/                          D&D 5e ruleset (SRD data, attributed)
│   └── …
├── Tropes/                             the shared trope library
│   ├── Wizard in a Tower.md
│   ├── Dark Lord.md
│   └── …
└── Multiverse/
    ├── _registry.md                    list of universes, owners, status
    ├── _events/                        Convergences and multiverse-level events
    ├── Tropelandia/                    a universe (owner: Seth)
    │   ├── _universe.md                tone, calendar link, clock, ruleset, maintainers
    │   ├── Calendar.md
    │   ├── Eras/
    │   ├── Cosmos/                     planes, galaxies, systems, planets (few, flat)
    │   ├── Places/                     continents → settlements, flat, linked by parent
    │   ├── People/                     notables (sharded when large)
    │   ├── Factions/
    │   ├── Trope Instances/
    │   ├── Events/<in-world year>/     append-only event files
    │   ├── _state/                     machine-written (census, locations, grudges)
    │   └── _generated/                 machine-rendered digests (do not edit)
    └── Forgotten Realms/               another universe (later)
```

Notes on the layout:
- **Everything for a universe lives inside its own folder.** That is what makes ownership by path enforceable (section 15).
- **`Places/` is flat and linked by `parent`.** Obsidian's graph and Bases/Dataview can then present the tree without the folders having to.
- **`Events/` is sharded by in-world year** so no folder grows without bound.
- **`_state/` and `_generated/`** are the simulation's territory.
- **Only the vault root is the repo.** The earlier two-copy arrangement (a vault plus a separate GitHub folder) is a stopgap. The simplest long-term setup is a single git repository whose working tree is the vault. See decision P7.

## 8. Notes, IDs and schemas

### 8.1 IDs
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

### 8.2 Common frontmatter

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
- Kind-specific fields are layered on top (section 8.3).
- Each `kind` has a schema in `_rules/schemas/`. CI rejects notes that do not validate.

### 8.3 Kind-specific fields (examples)

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
  growth_per_tick: 0.0004
last_tick: 2210
```

**Person (lore):** name, species, background, personality, goals, appearance, backstory, and a `stats:` block whose fields come from the universe's ruleset (for D&D 5e: class and level, ability scores, proficiencies).

**Person (state):** current location, hit points, conditions, gear, active goals, grudges held, and "last seen" facts.

**Event:** see Appendix A.

## 9. Tropes: the shared library

### 9.1 What a trope note is
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

### 9.2 What an instance is
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

### 9.3 Why this split
- **The joke is in the instance.** The same trope can be played straight in one universe, grimdark in another, and absurd in Tropelandia.
- **Instances carry the required fields** (twist, stakes, hooks offered) so the simulation can read them reliably. The trope defines which fields are required.
- **Backlinks are the index.** A trope's backlinks list every instance across the multiverse with no extra bookkeeping.
- **Tropes generate the world.** When seeding a region, the generator can ask for "a dark lord and a farm boy" and create instances with the tone of the target universe.
- **Hooks are what players can do.** A hook is a named, reusable prompt for player action ("join the bad guys"). The trope defines the hook; the instance decides whether to offer it and how.

### 9.4 Tropelandia's approach
Tropelandia treats tropes as raw material for caricature, in the spirit of Munchkin. Everything is tongue-in-cheek, no setting takes itself seriously, and players are free to explore: the world should always have a funny, workable answer to whatever a player decides to try.

## 10. Time

Time is a cross-cutting layer. Everything in the hierarchy exists in it.

### 10.1 Per-universe clocks **[Decided]**
Each universe has its own calendar and its own tick rate. The Omniverse keeps only a shared **omni tick**, an absolute counter used to order things across universes.

```yaml
# Multiverse/Tropelandia/_universe.md
clock:
  calendar: tropelandia.calendar.standard
  epoch_omni_tick: 0           # omni tick at which this universe's year 1 began
  ticks_per_world_day: 1
  world_days_per_real_day: 1   # pacing; set by the maintainer within engine limits
```

### 10.2 Calendars
A calendar note defines month names and lengths, weekday names, year numbering, era names and the leap rules. Forgotten Realms gets its own year-reckoning, Tropelandia can invent something silly, and a sci-fi universe could use stardates.

### 10.3 Eras
Eras are named spans (`Age of Mild Peril`) with a start, an end and a short summary. Events and entities reference an era for context.

### 10.4 Lifespans
Every entity carries `from` and `to` dates. That makes questions like "who ruled Cormyr in 1358?" and "what stood here before the war?" into simple queries.

### 10.5 Events are the timeline
The timeline is the event log. Each event has an in-world date and links to its places and participants. Obsidian can show it chronologically, and the tick engine appends to it.

### 10.6 Git time versus story time
Commits record when a change was *made*. Event dates record when something *happened in the story*. Keeping them separate allows backfilling history (for example, writing events from a century ago) without falsifying the commit date. Git tags can snapshot "the world as of tick N", and a branch is an alternate timeline.

### 10.7 Time differences between places
A plane can have its own time-flow rate. A character who spends a "day" in the Feywild can emerge years later in the Material Plane. This is expressed as a rate on the plane, applied to anyone who crosses.

### 10.8 Reconciling clocks at a Convergence
When a universe merges in, the Convergence event records the mapping between its calendar and the omni tick. Cross-universe travel and events use that mapping.

## 11. The simulation: ticks

### 11.1 The idea
A tick is one turn of the world. A script advances a universe's clock, decides what happens, writes the results as events and state, and commits them. Ticks run offline on a schedule, so the world keeps moving between sessions.

### 11.2 Determinism
All randomness is seeded:

```
seed = SHA-256( universe_id + ":" + tick + ":" + stage + ":" + entity_id )
```

Entities are processed in sorted-ID order. Given the same repository state, the same tick always produces the same result. That makes ticks reproducible, reviewable and safe to re-run.

### 11.3 The tick pipeline
Each tick runs these stages in order:

1. **Load** the universe's lore and state, and validate them.
2. **Advance the clock**: day, season, era boundaries, scheduled events.
3. **Environment**: weather, seasons, omens, disasters.
4. **Settlements**: census growth, economy, shortages, festivals, rumours.
5. **Factions**: pursue goals, shift relations, recruit, declare wars, make deals.
6. **Notables**: each notable picks and resolves an action: travel, work, scheme, court, train, feud.
7. **Trope beats**: instances check whether a beat is due (the wizard sets a new riddle, the dark lord posts a recruitment notice).
8. **Conflicts**: resolve fights, duels and sieges with offstage rules (section 14).
9. **Relationships and nemeses**: update grudges, loyalties and bonds (section 13).
10. **Promotion and fading**: promote normals who did something remarkable, and let long-quiet notables fade (section 12).
11. **Write**: append events, rewrite only the state files that changed.
12. **Validate** the result against the schemas.
13. **Render** generated digests.
14. **Commit** the tick as a single commit with a structured message.

### 11.4 Where ticks run **[Proposed]**
A scheduled GitHub Action runs each universe's tick as an isolated job, so a failure in one universe never blocks another. A universe maintainer can pause their universe, and can choose their tick rate within engine limits. Ticks can also run locally from a scheduled task on a maintainer's computer for testing.

### 11.5 What a tick may and may not write
A tick writes only to the universe's `_state/`, `Events/` and `_generated/` paths. It never edits lore. This is the two-writer rule from section 3.

### 11.6 Narration is separate from simulation
An optional narrator (an LLM) reads events and writes prose: chronicles, tavern gossip, rumour boards, "previously on…" digests. It writes only to `_generated/`. It cannot change state, so the simulation stays deterministic, cheap and auditable. Narration is a feature that can be switched off entirely.

## 12. People, population and promotion

### 12.1 Two kinds of people
- **Notables** are named people with their own note and state: heroes, villains, rulers, innkeepers with a past. Everyone you can name is a notable.
- **Normals** are everyone else, tracked as counts in each place's census by stratum (farmers, merchants, guards…).

This keeps the world full without a file for every peasant.

### 12.2 Promotion
Something remarkable happens to one of the 412: they survive a dragon attack, win a duel, or become the unlikely hero of a festival. The simulation *promotes* them: it removes one from the census count, creates a new person note and state, and logs a Promotion event. From then on the world remembers them.

Promotion triggers are rules, for example:
- surviving an event above a severity threshold
- being the target of a notable's grudge
- crossing a deed or reputation threshold
- being chosen by a trope beat ("the prophecy needs a farm boy")

### 12.3 Fading
Notables who have had no events and no active relationships for a long time can *fade*: they are archived (flagged, not deleted) and may be returned to the census count. Notes are never deleted from history.

### 12.4 Rosters
Each universe's `_generated/` folder holds rosters: who is notable, where they are, and what they are doing. These are rebuilt after each tick.

## 13. Relationships and the nemesis system

### 13.1 Relationships
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

### 13.2 Grudges and the nemesis system
Grudges are records of intensity, cause and history between two parties. Intensity moves with events:

- **Increases** after defeat, humiliation, betrayal or loss.
- **Decays** slowly with time and separation.
- **Ladder:** below about 20 is annoyance, 20–50 rivalry, 50–80 vendetta, above 80 nemesis. Each rung unlocks behaviour: seeking out, sabotaging, hiring allies, posting bounties.

When a notable defeats a player character or another notable, they can be **promoted**: they gain rank, a title, better gear drawn from the fallen foe's inventory, and *memory* of what happened (a line they remember, a scar, a nickname). Next time the pair meet, the record shapes the encounter. Nemeses escape, return stronger, get rivals of their own, and can reconcile or be reconciled by events.

All of this runs in the tick pipeline, so grudges evolve while no one is playing.

## 14. Rulesets: bring your own system

### 14.1 The principle **[Decided]**
The Omniverse is not tied to any game system. Every universe declares a **ruleset**: the mechanical system that governs its people, monsters, conflicts and progression. A universe can use a published system, a home-brewed one, or the built-in minimal ruleset. Tropelandia uses D&D 5e; another universe might use something entirely different.

The core simulation (clocks, census, events, relationships, nemeses) never mentions any specific system. It talks to rulesets only through the small contract below.

### 14.2 What a ruleset provides
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

### 14.3 Rulesets are data, not code **[Proposed]**
Consistent with the safety rule in section 15.5, a ruleset is declarative: schema files, tables, and formulas written in a small, restricted expression language that the engine interprets. CI never executes code from a ruleset.

If a system cannot be expressed that way, its author can propose an **engine plugin**. Omniverse maintainers review it as part of the engine, not as universe content.

### 14.4 The Omni power scale **[Proposed]**
So events can cross rulesets (a traveller from one universe in another, or a Convergence that mixes casts), every ruleset must map its entities onto a shared **Omni power scale**, 0 to 100 and roughly logarithmic.

- Inside a universe, offstage resolution uses the universe's own ruleset formula.
- Across universes, the engine falls back to Omni power with a single seeded roll:

```
p(A wins) = 1 / (1 + 10^((P_B - P_A) / k))
```

with `k` tuned in play.

- A character who crosses into a universe with a different ruleset is converted through the destination ruleset's import mapping. Until then, they take part at their Omni power.

### 14.5 The built-in Core ruleset
For universes that do not want a game system, or have not chosen one yet, the engine ships a minimal ruleset: a few descriptive attributes, a 1 to 10 rank, and a handful of injury states. It is enough for the simulation to run, and a universe can move to a fuller ruleset later.

### 14.6 Onstage versus offstage
- **Onstage:** when a player is involved, or a scene is flagged as important (a nemesis duel, a siege), the scene is played using the universe's ruleset by its table or DM, and the result is recorded as an event.
- **Offstage:** the simulation resolves things cheaply using the ruleset's formula and one seeded roll, and writes the outcome as an event.

Either way, the result reaches the core as an ordinary event, whichever system produced it.

### 14.7 Where rulesets live
- **`Rulesets/`**: the shared library, like `Tropes/`. It holds Core and any ruleset contributed for general use. Omniverse maintainers own it, and each ruleset declares its licence.
- **`Multiverse/<Universe>/_ruleset/`**: a ruleset local to one universe, for home-brew systems. Its universe maintainer owns it.
- A universe selects its ruleset with the `ruleset:` field in `_universe.md`.

### 14.8 The D&D 5e ruleset
Tropelandia (and later the Forgotten Realms universe) use the `dnd5e` ruleset. The package contains:

- **Stat schema:** ability scores and modifiers, proficiency bonus by level, skills, saves, classes and subclasses, species, backgrounds, hit points, armour class, alignment, level versus challenge rating.
- **Monsters:** full stat blocks as templates (actions, traits, resistances, legendary actions). A monster template is the "class" and a specific goblin is the "instance", matching the trope model.
- **Spells and items:** level, school, components, range, damage and save; rarity and attunement for items.
- **Tables:** conditions, damage types, travel pace, resting, XP thresholds, encounter budgets and treasure.
- **Power function:** level or CR plus gear, mapped to Omni power.
- **Offstage resolution and progression:** a 5e-flavoured formula, with XP and level changes following the normal 5e tables.

**Source of truth.** The package is built from the official SRD, published by Wizards of the Coast under a Creative Commons licence (CC-BY 4.0 for the SRD 5.1 and the revised SRD). It is imported as data rather than typed from memory, and the required attribution lives inside the ruleset package. The exact attribution text will be verified before import. Non-SRD book content is not reproduced.

**[Open]** Whether `dnd5e` follows the **2014** or **2024** rules. They differ in classes, species, backgrounds and some stat blocks. This is a decision for the ruleset and for Tropelandia, not for the Omniverse. One edition is chosen as the base and the other can be a variant.

### 14.9 Licensing
Each ruleset declares its source and licence, and CI checks the declaration. Home-brew and original systems are welcome. A published system needs an open licence or the publisher's permission. The Omniverse core itself contains no third-party game-system content.

## 15. The multiverse: universes, maintainers and merging

### 15.1 The model **[Decided]**
Anyone can **pull-request their world into the multiverse and become the maintainer of their universe.**

| Role | Owns | Can do |
|---|---|---|
| **Omniverse maintainers** | `_rules/`, `Tropes/`, `Multiverse/_registry.md`, `Multiverse/_events/`, CI and the engine | Approve new universes, change shared rules, resolve Reality Rifts, archive or remove a universe (for example for safety or IP reasons). |
| **Universe maintainers** | Everything under `Multiverse/<their universe>/` | Set tone, canon, calendar and ruleset; accept or reject player pull requests; choose tick pace within limits; pause the universe; appoint co-maintainers. |
| **Players / contributors** | Their own contributions | Submit pull requests to a universe, create characters, play. |

A universe maintainer is effectively the DM of their universe.

### 15.2 How a universe joins
1. **Build** the universe from the template in `_rules/templates/universe/`, in a fork. It must include a `_universe.md` (declaring its ruleset), a calendar, a clock and at least one populated place.
2. **Open a pull request** titled `Convergence: <Universe>`. It may only add files under `Multiverse/<Universe>/` and one line in the registry.
3. **CI checks** (section 15.5): schema validity, unique IDs, namespacing, calendar and clock present, path scope, no executable content, attribution for third-party material.
4. **Review** by Omniverse maintainers, covering fit with the shared rules, content standards and IP.
5. **Merge.** A Convergence event is written to the multiverse event log, the universe is added to the registry, its omni-tick mapping is recorded, and the author is added to `CODEOWNERS` as its maintainer.

### 15.3 After joining
- The maintainer's later pull requests that touch **only their own universe path** pass through the CI checks and merge without Omniverse maintainer review.
- Pull requests touching anything **outside** the universe path (shared rules, tropes, other universes) need Omniverse maintainer approval.
- Players contribute to a universe by pull request to it, and the universe maintainer reviews and merges, as a DM would.

### 15.4 A note on GitHub permissions
GitHub does not support per-folder write permissions natively. The design therefore relies on three things together:
- **Fork-and-pull-request** for all contributors.
- **`CODEOWNERS`** to route review of each path to its maintainer.
- A **path-guard check** that verifies a pull request only touches paths its author owns, and lets those auto-merge once all checks pass.

**[Proposed]** Alternatively, a universe can live in its own repository and be pulled into the Omniverse as a submodule or subtree, which gives the maintainer full control of their repo at the cost of more machinery (decision P3).

### 15.5 Security and safety checks
Since contributors are trusted only within their own folder, CI must treat contributions as **data, never code**:
- Validation reads files and never executes anything from a universe.
- Pull requests may not change workflows, `_rules/engine/`, `CODEOWNERS`, or other universes without maintainer approval.
- Third-party IP (for example Forgotten Realms material) must declare its source and licence.

### 15.6 Reality Rifts
A **Reality Rift** is a conflict that a path-guard cannot resolve on its own: two universes claim the same trope slot, a shared rule change breaks a universe, or a cross-universe event contradicts canon. Rifts are logged as events and resolved by Omniverse maintainers, who can pick one canon, keep both as variants, or ask for a rewrite. **[Open]** whether this is one person's call or a vote (decision P5).

### 15.7 Ticks and universes
Each universe ticks in isolation and writes only to its own `_state/`, `Events/` and `_generated/`. Maintainers decide their own tick pace, can pause, and can opt out of narration. A universe whose maintainer has left becomes *dormant* (ticks paused, still readable) until someone adopts it.

### 15.8 Other cross-universe events
- **Schism:** a universe splitting into two, recorded as a branch event.
- **Portals / crossovers:** travel between universes uses the clock mapping recorded at Convergence, and requires both maintainers' agreement. Characters moving between universes with different rulesets are converted through the Omni power scale (section 14.4).

## 16. Joining the world as a player

1. **Pick a universe** (each has its own tone and maintainer).
2. **Create a character** from the universe's person template, using its ruleset (for D&D 5e: species, class and background), plus a hook from the trope instances on offer.
3. **Pull request** the character into the universe. The maintainer reviews it.
4. **Start where the world is.** A generated **"Previously on…"** digest summarises recent events near the character: who's feuding, what's brewing, who's looking for adventurers. The world is already in motion.
5. **Play.** Onstage scenes are played with a DM or table; the results are recorded as events. Everything else carries on through ticks.
6. **Be remembered.** The world tracks the character's deeds, grudges and reputation.

## 17. Planned universes

### 17.1 Tropelandia
- **Owner:** Seth.
- **Ruleset:** D&D 5e.
- **Tone:** Munchkin-style parody of fantasy and RPG tropes. Tongue-in-cheek, never po-faced, always open to whatever a player tries.
- **Contents:** the first trope instances, a handful of settlements, and a starter roster of notables.

### 17.2 Forgotten Realms (Toril)
- **Idea:** a canon-style universe covering Toril, Faerûn, its regions, cities, factions, deities and famous NPCs.
- **Approach:** build top-down: skeleton first (planet, continents, regions, a few dozen cities, factions), then around a hundred notables, with census figures *estimated* rather than canonical.
- **Ruleset:** D&D 5e, shared with Tropelandia.
- **Time:** the calendar is Dalereckoning. History is backfilled as logged events up to a chosen year, and the simulation starts at a chosen "now". **[Open]** which year (the 5e-era 1490s is the natural choice).
- **Sources and IP:** the lore belongs to Wizards of the Coast. Facts and structure can be modelled in original words; book text is not copied. **[Open]** whether this universe stays in a private repository, since a public repository raises IP questions. The community wiki is believed to be under a CC-BY-SA licence, which would need to be verified before it is used as a source.
- **Trope link:** Forgotten Realms instances of tropes (for example a wise wizard mentor) appear alongside Tropelandia's parodies of the same trope in the trope's backlinks.

### 17.3 Others
Open to contributors: grimdark, sci-fi fantasy, a single-city sandbox, a published campaign world. Each one is a universe with its own maintainer.

## 18. Tooling and automation

- **Obsidian** is the reader and editor. Bases or Dataview give the tree, roster and timeline views. `workspace.json` is excluded from git because it changes constantly and is per-machine.
- **Git and GitHub** hold history, pull requests, `CODEOWNERS` and Actions.
- **Engine** (Python or Node, in `_rules/engine/`): validators, tick runner, importers (ruleset data), generators (digests, rosters).
- **CI** validates schemas, IDs, path scope and licences on every pull request.
- **Scheduler**: GitHub Actions cron for ticks; optionally a local scheduled task for development.
- **Narrator** (optional): an LLM that reads events and writes prose into `_generated/`.

## 19. Scale and performance

- **Files:** with normals as counts, the file count is driven by notables, places and events. A universe with a few thousand notables and a few hundred places is comfortable for Obsidian and git.
- **Events** are the fastest-growing content. They are sharded by in-world year, and old years can be rolled into yearly summary files (with the raw events kept in history) once they stop changing.
- **Large folders:** `People/` is sharded when it passes a threshold (for example by settlement or by first letter).
- **Tick cost:** most entities do nothing most ticks. The engine only loads and rewrites what changed.
- **Windows paths:** keeping folders shallow avoids the 260-character path limit.
- **Repository size:** state files are small and text-based. If history grows too large, old events can be archived to a separate repository.

## 20. Risks

| Risk | Mitigation |
|---|---|
| Ticks and contributors conflict in git. | Two-writer rule; separate paths; each universe ticks in isolation. |
| The world becomes boring or chaotic. | Tunable event tables, trope beats as story drivers, maintainer control of pace. |
| Schema drift as the project grows. | Versioned schemas in `_rules/schemas/`, validated in CI. |
| IP problems (especially Forgotten Realms). | Original wording, openly licensed rules content (such as the SRD), a declared licence for every ruleset and source, private repository for canon-derived universes. |
| Malicious or broken contributions. | Data-only validation, path guard, protected workflows and engine code. |
| Tone clashes between universes. | Tone belongs to the universe; the Omniverse stays neutral. |
| A game system cannot be expressed as declarative data. | Engine plugins reviewed by Omniverse maintainers; the Core ruleset as a fallback. |
| Bot and automation permissions. | Least-privilege tokens; tick commits limited to universe paths. |
| Cost of narration. | Optional; limited to `_generated/`; can be disabled per universe. |
| Maintainer abandonment. | Dormant state, adoption process. |

## 21. Decisions log

### Decided
| ID | Decision |
|---|---|
| D1 | Omniverse is the serious, top-level foundation; personality lives in universes. |
| D2 | Tropes are a top-level shared library; universes hold instances of them. |
| D3 | Tropelandia is one universe in the multiverse, not the whole thing. |
| D4 | Each universe has its own clock; the Omniverse keeps a shared absolute tick. |
| D5 | The world is persistent: offline ticks, an event log, rosters of notables, census counts for normals, a nemesis system and typed relationships. |
| D6 | People pull-request their universes in and remain their maintainers. *(Mechanism in section 15 is proposed.)* |
| D7 | The Omniverse is system-agnostic: each universe brings its own ruleset. D&D 5e is one ruleset, used by Tropelandia. |

### Proposed (will proceed unless changed)
| ID | Proposal |
|---|---|
| P2 | Hybrid storage: folders for the top levels, flat notes linked by `parent` below. |
| P3 | Universes join by fork-and-PR with `CODEOWNERS` and a path-guard check (alternative: submodules). |
| P6 | Trope instances must fill required fields (twist, stakes, hooks offered). |
| P7 | The vault itself becomes the git repository, replacing the two-copy setup. |
| P11 | Rulesets are declarative data (schemas, tables, a restricted expression language), not code. |
| P12 | Every ruleset maps onto a shared Omni power scale so crossovers work. |

### Open (need an answer)
| ID | Question | Options |
|---|---|---|
| P1 | D&D 5e edition for the `dnd5e` ruleset (Tropelandia) | 2014 or 2024 |
| P4 | Default tick cadence | e.g. one world-day per real day, or faster |
| P5 | Who decides Reality Rifts | Single decision-maker or a vote |
| P8 | Are `_generated/` files committed? | Committed to the repo, on a separate branch, or built in CI only |
| P9 | Forgotten Realms: which year, and public or private repo | e.g. 1490s DR; private recommended |
| P10 | Final file name and location of this document | `README.md` at the root (current) or a different name |

## 22. Roadmap

| Milestone | Delivers | Done when |
|---|---|---|
| **M0 — Skeleton** | Folder layout, `.gitignore`, git initialised, this document | The repo exists and opens cleanly in Obsidian. |
| **M1 — Schemas and templates** | Frontmatter schemas, note templates for each kind, conventions | A new note from a template validates. |
| **M2 — Tropelandia seed** | Universe note, calendar, a few places and notables, a starter set of tropes and instances | The world can be browsed top to bottom. |
| **M3 — Tick engine MVP** | Clock, census growth, event writing, validation, determinism | A tick runs, commits cleanly and replays identically. |
| **M4 — Rulesets** | Ruleset contract, Core ruleset, `dnd5e` ruleset (SRD import, stat blocks), offstage resolution | Two notables can fight offstage under `dnd5e` and the outcome is logged, and a Core-ruleset universe also runs. |
| **M5 — Relationships and nemeses** | Edge types, grudge ladder, promotion of normals and victors | A grudge visibly escalates over several ticks. |
| **M6 — Contribution flow** | `CODEOWNERS`, path guard, CI checks, universe template, "Previously on…" digest | A test universe can be merged in by pull request and run by its maintainer. |
| **M7 — Forgotten Realms** | Skeleton universe with backfilled history | Toril browsable to settlement level with a starter cast. |

---

## Appendix A — Example notes

### A.1 Event
```yaml
---
id: tropelandia.event.1489-0034-the-pie-contest-incident
kind: event
name: The Pie Contest Incident
when: { year: 1489, day: 34, omni_tick: 2210 }
where: tropelandia.settlement.barrowdale
participants:
  - tropelandia.person.marlowe-the-mildly-menacing
  - tropelandia.person.dame-rosalind-quickblade
type: social_conflict
severity: 2            # 0 trivial … 5 world-changing
outcomes:
  - relationship: { type: rival, between: [marlowe, rosalind], strength_delta: +30 }
  - census: { settlement: barrowdale, mood: amused }
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
last_tick: 2210
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
  epoch_omni_tick: 0
  ticks_per_world_day: 1
  world_days_per_real_day: 1
---
```

## Appendix B — Example CODEOWNERS and CI checks

### B.1 CODEOWNERS
```
# Shared, owned by Omniverse maintainers
/_rules/                    @omniverse-maintainers
/Tropes/                    @omniverse-maintainers
/Rulesets/                  @omniverse-maintainers
/Multiverse/_registry.md    @omniverse-maintainers
/Multiverse/_events/        @omniverse-maintainers
/.github/                   @omniverse-maintainers
/CODEOWNERS                 @omniverse-maintainers

# Universes, owned by their maintainers
/Multiverse/Tropelandia/    @seth
```

### B.2 CI checks on every pull request
1. **Schema validation** for every changed note.
2. **ID uniqueness** and namespace match (`<universe>.…` inside `Multiverse/<Universe>/`).
3. **Path scope**: the author owns every path touched.
4. **Protected paths**: no changes to workflows, the engine, `CODEOWNERS` or other universes unless a maintainer approves.
5. **Calendar and clock** valid for any universe note change.
6. **No executable content**: nothing in a universe is ever run by CI.
7. **Attribution and licence** declared for third-party material.
8. **Link integrity**: every `parent` and relationship target exists.
9. **Determinism check** (for engine changes): replaying a reference tick gives the same output.
