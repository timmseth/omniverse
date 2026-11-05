## What this is

<!-- One of: dungeon · quest · faction/NPC/town · bestiary/items · tables/lore · trope · ruleset · universe join · canon merge · tool/docs fix -->

**Type:**
**Universe:** <!-- e.g. Tropelandia, or "core" -->

## Summary

<!-- Two or three sentences. What does a DM or player get from this? -->

## Checklist

- [ ] `python3 _rules/tools/validate.py . --quiet` passes
- [ ] `python3 _rules/tools/build_all.py .` was run and the generated files are committed
- [ ] New notes follow the schema for their kind (see `docs/reference/Schema Reference.md`)
- [ ] Ids are namespaced (`<universe>.<kind>.<slug>`) and every `parent` exists
- [ ] Original writing or openly licensed material only; sources credited in the note
- [ ] For a dungeon: one dungeon per PR, `status: draft`, exits reciprocal, every room reachable
- [ ] For a canon merge: events listed with `canon: proposed`, deltas included, the instance linked

## Notes for the reviewer

<!-- Anything the maintainer should look at first, or decisions you want checked. -->
