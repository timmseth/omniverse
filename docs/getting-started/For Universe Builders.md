# For Universe Builders

You want your own world on the shelf. This is the short path; [Adding a Universe](../authoring/Adding%20a%20Universe.md) is the full guide.

## What a universe is
A module under `Multiverse/<Name>/` with a manifest (`_universe.md`), a calendar, at least one era, a place tree, and whatever content you like, all using the core note kinds (or kinds you add in `_schemas/`). It names a ruleset: an existing one (`omniverse.ruleset.dnd5e`, `omniverse.ruleset.core`, `omniverse.ruleset.six-sides`) or one you bring. It has its own tone, its own history and its own maintainer: you.

## What you get for free
- The validator and the schemas, so every note is checked.
- The world index, timeline, backlinks and the DM screen app for any dungeons you write.
- The trope library (`Tropes/`): instantiate any trope with your own twist.
- A place in the registry, a row in `CODEOWNERS`, and review rights over your own folder.

## What you owe
- Keep your universe valid (CI will tell you).
- Review pull requests to your folder in reasonable time, or name a co-maintainer.
- Keep rifts (events that touch another universe) agreed with that universe's maintainer.
- Declare a licence for your folder (`licence:` in `_universe.md` plus `LICENSE.md`; default CC BY-SA 4.0) and honour the licences of anything you import. [`LICENSING.md`](../../LICENSING.md) explains the choices in plain English.

## The steps
1. Scaffold: `python3 _rules/tools/new_universe.py <Name> --tone "<tone>" --ruleset <ruleset id> --maintainer <handle>`. It writes the manifest, calendar, era, first plane and planet, and a registry row.
2. Fill in the world: places, a first town, a faction or two, a dungeon.
3. Open a **New universe** issue, then a PR with the folder, your `CODEOWNERS` line and a Universe Join event in the registry.
4. After the merge, you are the maintainer. Everything else is up to you.
