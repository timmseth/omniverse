# Repository Map

```
omniverse/
├── README.md                 the design document (what and why)
├── CONTRIBUTING.md           how to contribute (short)
├── CODEOWNERS                who reviews which path
├── LICENSE                   public domain (Unlicense)
├── Omniverse.md              the root note; everything descends from it
├── .github/                  CI workflow, PR and issue templates
├── docs/                     these guides; docs/reference/Schema Reference.md is generated
├── _rules/
│   ├── schemas/              one YAML per note kind; the validator reads them
│   ├── templates/            copy-and-fill notes
│   ├── tools/                validate.py, build_*.py, schema_reference.py, new_universe.py
│   └── Submitting a Dungeon.md
├── _generated/               world.json, dungeons.json, World Index.md, Dungeon Index.md, Backlinks.md
├── Tropes/                   the shared trope library (50 tropes) and its index
├── Rulesets/
│   ├── Core/                 the minimal built-in ruleset
│   ├── dnd5e/                D&D 5e (SRD shape)
│   └── Six Sides/            a light d6 pool system, with stat mapping
├── Apps/
│   └── dmScreen/             the Android DM screen: source, build scripts, releases/
└── Multiverse/
    ├── _registry.md          the shelf of universes
    ├── Tropelandia/          the first universe (parody, D&D 5e)
    │   ├── _universe.md      manifest: tone, ruleset, maintainers, clock
    │   ├── _timeline.md      generated: eras, events, instances
    │   ├── Calendar.md       months, weekdays, moons, holidays
    │   ├── Eras/             named spans of history
    │   ├── Events/<year>/    dated canon events with deltas
    │   ├── Holidays/
    │   ├── Material Plane/   the place tree, down to towns, venues and people
    │   ├── Factions/
    │   ├── Pantheon/
    │   ├── Lore/             myths, legends, customs; Lore/Cultures, Lore/Languages
    │   ├── Bestiary/         monster stat blocks
    │   ├── Items/
    │   ├── Tables/           random tables
    │   ├── Quests/
    │   ├── Dungeons/<Name>/  folder note + Rooms/
    │   ├── Trope Instances/
    │   ├── Instances/        playable timelines: pie-heist, starter-kit (template)
    │   └── _state/           machine-written cached state (do not edit)
    └── <Other universes>/    same shape, their own maintainers
```

**Where a new thing goes:** look up its kind in the [Schema Reference](../reference/Schema%20Reference.md); the `Lives at` column is the rule. The place tree is the only part with nesting; everything else is one folder per kind under the universe.

**What not to touch by hand:** `_generated/`, `_state/`, `_timeline.md`, `docs/reference/Schema Reference.md`, `Apps/dmScreen/app/src/main/assets/dungeons.js`. They are rebuilt by `python3 _rules/tools/build_all.py .`.
