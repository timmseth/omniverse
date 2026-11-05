---
id: omniverse-core
kind: module
module_kind: core
name: Omniverse core
parent: omniverse
version: 0.6.0
owner: timmseth
licence: Unlicense (public domain)
provides: [schemas, validator, build tools, trope library contract, ruleset contract, instance and canon-merge rules]
reads: [every note]
writes: [_generated/, docs/reference/Schema Reference.md, Multiverse/*/_timeline.md]
summary: The core contracts every module plugs into. Modules declare the range of this version they need in `requires`.
---
# Omniverse core

Version 0.6.0. The core is the schemas in `_rules/schemas/`, the tools in `_rules/tools/`, the trope and ruleset contracts, and the instance and canon-merge rules in the README. Everything else is a module.

A module's manifest declares the core range it was written against:

```yaml
requires:
  omniverse-core: ">=0.6 <0.7"
```

The core follows semantic versioning: a minor bump adds kinds or fields; a major bump changes what an existing field means or removes one, and comes with a migration.
