# Style Guide

## Voice
- **Read-aloud text** is sensory and short: two to four sentences, what the party sees, hears and smells, then the one thing that matters. No numbers, no rules, no "you feel".
- **DM-facing text** (`dm_notes`, `tactics`, `secret`) is direct and practical: what is true, what to do when the party does something clever.
- **Tropelandia** is a parody played straight. The joke is in the situation (a dragon with a portfolio, a union of goblins, a lich with a backlog), never in the narration winking at the reader. Nobody in the world knows it is funny. Stakes are real; consequences are mild.
- Other universes set their own voice in their manifest's `tone` and their style notes. Match the universe you are writing in.

## Names
- Note names are proper names: `The Gilded Tankard`, `Vashti Nine-Fingers`, `Ring Once`. Titles go in `role` or `title`, not in the name, unless the character is only known by it (`The Librarian`).
- Ids are the slug of the name at creation and never change: `tropelandia.venue.the-gilded-tankard`.
- Two notes must not share a name (wikilinks become ambiguous). The validator warns. Resolve it by renaming the less-linked one or prefixing a trope with "The".
- Dungeon codes: three or four capitals, memorable (`RAT`, `LCH`), unique.

## Frontmatter
- Field order: `id`, `kind`, `name`, `parent`, `universe`, then the kind's own fields, then `tags`, `summary`, `from`, `to`.
- Lists on one line when short (`tags: [hub, settlement]`), one item per line when long or when items are sentences.
- Quote strings that contain colons, hashes or start with special characters. Prefer plain scalars otherwise.
- `summary` is one to three sentences for indexes and the app. Write it last.
- Dates are `{year, day}` in the universe's calendar, with `era` where it helps. `primordial` for things older than the calendar.

## Body
- Start with `# Name`. For places and venues, a blockquote of the read-aloud text comes first.
- Use `##` sections sparingly and consistently: Venues, People, Hooks, Rewards, Traits, Actions. Lists over paragraphs for anything a DM scans at the table.
- Link by wikilink the first time a note is mentioned: `[[Mildew Court]]`. Use `[[Name|display]]` for structural files (`[[_universe|Tropelandia]]`).
- British spelling in Tropelandia (`honour`, `licence` as the noun); a universe may choose otherwise in its style notes.
- No em dashes; use commas, colons or full stops. No exclamation marks in read-aloud text.

## Mechanics
- Tropelandia's numbers are D&D 5e: DCs 10 (easy), 13 (moderate), 15 (hard), 18 (very hard). Encounters are built for the dungeon's level range; a boss is one level band above it.
- Write rules text in your own words. Reference the shape of a published system; never copy its text.
- Prices in gp/sp/cp. A pie is 2 cp. A night's lodging is 2 to 8 sp. A healing potion is 50 gp.

## Files
- UTF-8, LF line endings, one trailing newline. No tabs in YAML.
- Keep paths short: Windows limits full paths to 260 characters and the vault already sits deep. The validator warns past 200.
