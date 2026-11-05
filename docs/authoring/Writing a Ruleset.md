# Writing a Ruleset

A ruleset is a module that says what a stat block looks like, how powerful something is, how a conflict resolves when nobody is rolling at the table, and how characters grow. It is data, not code: formulas are written in prose or a simple expression, and nothing in it is executed.

## The manifest (`kind: ruleset`)
`Rulesets/<Name>/<Name>.md` (or inside a universe for a private one), id `omniverse.ruleset.<slug>`, parent `omniverse`. Fields:
- **`version`**, **`owner`**, **`licence`**, **`requires`**, **`extends`** (another ruleset this one builds on), **`overrides`** (which of its parts you replace).
- **`status`**: `stub`, `draft`, `usable`, `stable`.
- **`provides`**: a map with at least `stat_schema` (what a stat block holds), `power_function` (how to turn a block into a number on the Omni power scale, 0 to 100), `offstage_resolution` (how two things of known power settle a conflict off-screen, with one seeded roll), `progression` (how characters advance), and optionally `injuries`.
- **`stat_mapping`**: how this system's stats convert to and from the Omni scale and, where sensible, other rulesets, so a bestiary written in one system can be approximated in another.
- **`dice`**: the core mechanic in a line.

The body explains each part for a human. Keep it short enough to read before a session.

## What a universe does with it
The universe manifest names the ruleset in `ruleset:`. Its bestiary, NPC `stats` and pregens' `sheet` are written in that ruleset's `stat_schema`. Dungeons name the ruleset too, so a dungeon written for one system is not silently run under another.

## Licensing
A ruleset that borrows a published system's shapes must stay within what that system's licence allows (the D&D 5e module uses the SRD's shapes and writes its own text). An original system is released like everything else here, into the public domain. Say which in `licence`.

## Existing rulesets
- **Core**: a 1-to-10 rank and a handful of descriptors. The fallback.
- **D&D 5e**: ability scores, AC, hit points, challenge rating; the shape of Tropelandia's bestiary.
- **Six Sides**: a light d6 dice pool with four traits, written as the test that the Omniverse is system-agnostic. Its `stat_mapping` converts 5e blocks.
