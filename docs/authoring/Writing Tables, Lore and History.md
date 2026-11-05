# Writing Tables, Lore and History

## Random tables (`kind: table`)
`Multiverse/<Universe>/Tables/<Name>.md`. `category` (rumour, encounter, weather, name, complication, loot, treasure, event, reaction, hook, other), `die` (`d6`, `d20`, `d100`), optional `where` (the place it applies to), and `entries` of `{roll, text, ref?, count?}`. `roll` is a number or a range (`"6-10"`); entries must cover the die with no gaps or overlaps, and the validator checks. `ref` points an entry at a monster, item or person; `count` (a number or dice) says how many, for encounters.

Good tables are specific to a place and a moment. "Fog, with opinions" is a Marsh entry; it would be wrong in the Sands.

## Events (`kind: event`)
`Multiverse/<Universe>/Events/<year>/<year>-<nnnn> <Name>.md`, id `<universe>.event.<year>-<nnnn>-<slug>` where `nnnn` is the day. Required: `when` (`{year, day}`), `type` (founding, battle, death, disaster, decree, theft, strike, arrival, contract, discovery, rift…), `severity` (0 trivial to 5 world-changing), `visibility` (public, rumoured, secret), `canon` (canon, local, proposed, rejected). Add `where`, `participants`, `era`, `deltas` (`{entity, field, from, to}`: the state the event changed), `caused_by`, `quest`.

The timeline is generated from these; keep the body short (what happened, who it mattered to). Secret events are the DM's reveals; write them.

## Eras, calendar, holidays
An era (`kind: era`) is a named span with `from`, `to` (`null` for the current one) and a `character` line. The calendar (`kind: calendar`) has months with days and seasons, weekdays, moons and a list of holidays. A holiday (`kind: holiday`, parent the calendar) has `when: {month, day}`, `observed_by`, `customs` and `hooks`: what a party walks into if they arrive that day.

## Pantheon (`kind: deity`)
`Pantheon/<Name>.md`: `title`, `domains`, `tenets`, `worshippers`, `church` (a faction), `holy_days`, `boons`, `wrath`. Gods in the Omniverse are as present as their churches make them; the tenets are what clerics argue about.

## Cultures and languages
A culture (`Lore/Cultures/`) has `values`, `customs` (things a visitor can get wrong), `dress`, `food`, `names` (lists for the DM to pull from) and `deities`. A language (`Lore/Languages/`) has `speakers`, `script`, `sound` (how to fake it at the table) and `phrases` (`{say, means}`).

## Lore (`kind: lore`)
`Lore/<Name>.md`: `category` (myth, legend, history, custom, song, prophecy, rumour, treatise), `about` (ids it concerns), `truth` (`wholly`, `mostly`, `half`, `barely`, `false`, `unknown`: for the DM), `known_by` (who tells it). The body is the text as a character would tell it. Lore is where the world explains itself to players without a stat block.
