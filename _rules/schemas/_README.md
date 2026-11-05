---
id: omniverse.schemas
kind: index
name: Schemas
parent: omniverse
---
# Schemas

One file per note kind. The validator (`_rules/tools/validate.py`) reads these, so a note
is valid when it matches its kind's file here, and the Schema Reference in `docs/` is
generated from them. Change a schema and both follow.

A schema says: which folder the kind lives in, what its id looks like, and its fields.

```yaml
kind: faction                      # the value of `kind:` in the note
title: Faction
summary: One line on what this kind is for.
module: core                       # core | universe | ruleset
folder: Multiverse/<Universe>/Factions/<Name>.md
id: <universe>.faction.<slug>
mixins: [base, dated]              # field sets shared by many kinds (see _mixins.yaml)
fields:
  base: { type: ref, kinds: [settlement, district], doc: Where it operates from. }
  goals: { type: list, of: string, doc: What it wants, in its own words. }
```

Field types: `string`, `text` (multi-line), `int`, `number`, `bool`, `any`, `id` (the note's
own id), `ref` (an id of another note; `kinds:` restricts which), `enum` (`values:`),
`const` (`value:`), `list` (`of:` another type), `map` (`fields:` nested), `when` (a date:
`primordial`, `null`, or `{year, day, era}`), `dice` (`d6`, `2d8+1`).

Every field may carry `required: true`, `nullable: true`, `pattern:` (regex for strings) and
`doc:`. Unknown fields are warnings, unless the key is namespaced (`dnd5e.initiative`),
which a schema extension in a module's `_schemas/` folder may declare.

Placeholders in `folder` and `id`: `<Universe>` and `<universe>` (folder name and slug),
`<Name>`, `<slug>`, `<dungeon>`, `<nn>` (two digits), `<year>`, `<nnnn>`, `<Place path>`.
