# The Note Wizard

One web page that writes Omniverse notes for you. Pick what you are making (a god, a town, a person, a faction, an event, a whole universe), fill in the fields, and export a valid Markdown note with the frontmatter already correct. No YAML by hand.

## Open it
- **On the web:** `https://timmseth.github.io/omniverse/wizard.html` once the site is published. The world index loads automatically, so every reference field autocompletes from the real notes.
- **From a clone:** open `Apps/wizard/omniverse-wizard.html` in a browser. It is one self-contained file, works offline, and needs no install. Use **Open repo folder** (below) to load the world index, or **Load world.json** from `_generated/`.

## Use it
1. **Choose** a kind. The chip on each card says how big a creation it usually is in a [Genesis Session](../authoring/Running%20a%20Genesis%20Session.md) and what it costs in Entropy (the World 5, Grand 3, Middling 2, Small 1).
2. **Fill in** the form. Universe and name come first; the id and file path are worked out for you and shown on the right. Required fields are listed first; everything else is under **More fields**. If the path needs a place, parent folder or event number, the wizard fills those in from the parent note and the world index.
3. **Export** from the panel on the right:
   - **Save into repo folder** (Chrome or Edge on a computer): pick your repo root once; the wizard writes the note at its correct path, creating folders as needed, and asks before replacing a file.
   - **Copy** the text, or **Download .md** and drop it at the path shown.
   - **Add to basket** to collect several notes (or **Add and make another**), then **Save all** into the repo or **Download all (zip)** and unzip at the repo root. The basket survives a page reload.

A universe or ruleset also gets its `LICENSE.md` beside the manifest, because the validator requires one.

## What it checks
The wizard applies the same rules as the validator while you type: required fields, types, enums, dice and patterns, the id and folder patterns for the kind, ids that already exist, names that are already taken, and (once the world index is loaded) references that do not resolve. Problems appear above the preview. You can still export a note with problems; the wizard asks first. Always run `python3 _rules/tools/validate.py . --quiet` before committing.

## Limits
- It writes one note at a time. A new universe also needs a calendar, an era and a place tree: use `new_universe.py` for the scaffold (see [Adding a Universe](../authoring/Adding%20a%20Universe.md)), then edit the manifest here or by hand.
- Ruleset stat blocks (the `dnd5e`, `six_sides` and `core` keys on a monster) are entered as key and value rows; numbers and JSON such as `{"str": 12}` are understood. Copying an existing monster is often quicker.
- Fields of type `any` take JSON or plain text.
- Saving straight into a folder needs the browser's File System Access feature (Chrome and Edge on a computer). Everywhere else, use Download or the zip.
- It does not run the build. After adding notes, run `python3 _rules/tools/build_all.py .` and commit the generated files.

## How it stays in sync
`_rules/tools/build_wizard.py` reads every schema in `_rules/schemas/` and bakes the forms into `Apps/wizard/omniverse-wizard.html`. `build_all.py` runs it, and CI fails if the committed page is stale. Change a schema, run `build_all`, and the wizard follows. The page itself is written in `Apps/wizard/wizard.template.html`; never edit the generated file by hand.

## For a Genesis Session or a Convocation
At the end of a Genesis Session or a Convocation, the Scribe (or each god) can use the wizard to turn the Ledger into notes: each god as a `deity`, each Grand and Middling creation as a place, faction, people or event, each Small creation as a person, item or lore note, the Doom's public face as `lore`, relics as `item` notes kept in a private instance until found. Use **Add and make another** to work through the Ledger quickly, then save the whole basket into the universe's folder. The where-everything-lands table is in [the Gameplay Loop](../concepts/The%20Gameplay%20Loop.md#where-each-phase-lands-in-the-repository).
