# Glossary

| Term | Meaning |
|---|---|
| **Omniverse** | The whole project: the core rules, the trope library, the rulesets and the multiverse. Also the root note. |
| **Multiverse** | The shelf of universes, with its registry. |
| **Universe** | A world: a module under `Multiverse/<Name>/` with its own tone, calendar, history, content and maintainer. |
| **Module** | A self-contained, owned, versioned folder with a manifest that plugs into a core contract: a universe, a ruleset, a trope pack, a generator, a view, an app. |
| **Manifest** | The frontmatter of a module's main note (`_universe.md`, `<Ruleset>.md`, `module.md`): version, owner, licence, requires, provides. |
| **Note** | One Markdown file with YAML frontmatter. The unit of everything. |
| **Kind** | A note's type (`settlement`, `person`, `dungeon`, `room`, `event`…). Each has a schema. |
| **Schema** | The YAML file in `_rules/schemas/` that says where a kind lives, what its id looks like and what fields it has. |
| **Id** | A permanent, namespaced identifier: `<universe>.<kind>.<slug>`. |
| **Parent** | The note a note sits under. Every note but the root has one. |
| **Layer model** | The tree of parents from the Omniverse down to a person or a room. |
| **Place tree** | The spatial part of the layer model: plane, galaxy, star system, planet, continent, region, country, province, settlement, district, venue. |
| **Folder note** | A note named after its folder (`Barrowdale/Barrowdale.md`) so children can sit inside. |
| **Event** | Something that happened in canon: dated, typed, with a severity, a visibility and deltas. |
| **Delta** | One state change an event caused: `{entity, field, from, to}`. |
| **Timeline** | The ordered events of a universe; generated into `_timeline.md`. |
| **Frontier** | The latest canon event in a universe. New instances fork here by default. |
| **Era** | A named span of a universe's history. |
| **Omni-day** | A universe-independent day count, so calendars can be aligned at a Universe Join. |
| **Instance** | A playable timeline forked from canon: fork point, log, overlay. Private by default. |
| **Overlay** | Characters and notes that exist only in one instance. |
| **Session** | One sitting's log note: events, deltas, rolls. |
| **Canon** | What is true for everyone in a universe. Events are `canon`, `local` (in an instance), `proposed` or `rejected`. |
| **Canon merge** | Proposing an instance's events into canon; reviewed by the universe's maintainer. |
| **Reality Rift** | A conflict between an instance's proposed events and canon merged since its fork point; also any event agreed between two universes. |
| **Universe Join** | Adding a universe to the multiverse by pull request. |
| **Trope** | A shared story pattern with beats and hooks, in `Tropes/`. |
| **Trope instance** | A trope bound to one universe's people and places, with a twist and stakes. |
| **Ruleset** | A game system as data: stat schema, power function, off-stage resolution, progression. |
| **Omni power** | A 0-to-100 scale every ruleset maps its stats onto, so things from different systems can be compared. |
| **Dungeon** | An adventure site made of rooms, with a code, an entry and a derived map. |
| **Room** | One room of a dungeon: read-aloud, exits, encounters, traps, puzzles, secrets, loot. |
| **Home town** | The settlement a party stages from for a dungeon. |
| **Venue** | A tavern, shop, temple or other place inside a settlement a party can walk into. |
| **Bestiary** | A universe's monster stat blocks, referenced by rooms. |
| **Table** | A random table with a die and entries that cover it. |
| **Quest** | A chain of stages threading a town, a faction and a dungeon, with outcomes. |
| **Starter Kit** | A template instance with Session Zero, a three-session arc and pregens. |
| **Generated** | Files written by the tools from the notes (`_generated/`, `_timeline.md`, the schema reference, the app data). Never edited by hand. |
| **World index** | `_generated/world.json`: every note with its data, body, refs and backlinks. The world API. |
| **dmScreen** | The Android DM screen app in `Apps/dmScreen/`. |
| **Maintainer** | The owner of a path in `CODEOWNERS`; reviews changes to it. Universe maintainers own their universe; Omniverse maintainers own the core. |
| **DM skill** | The `omniverse-dm` skill for Claude that runs campaigns against this repository. |
| **Gameplay Loop** | Apotheosis, Genesis, Reckoning, Relics, Incarnation, Relic Quest, the Doom, Long Game, Retirement, Convocation, repeat. A base way to play, not the right way. |
| **Genesis Session** | The first cycle of the loop: a four-hour session where the players make gods, build the universe turn by turn, spend the Entropy debt on the Doom, hide relics, then play its mortals. |
| **Apotheosis** | Making your god: Name, Domain, Sign, Voice, First Word. Costs nothing. |
| **Scribe** | The facilitator of a Genesis Session or Convocation: keeps the Ledger, the Entropy tally, the clock and the secrets. Can play Scribe only, god only, or god and avatar. |
| **Act** | One god's turn: declare, speak the Word, anchor and mark, yes-and, note, tally. Sized Grand (3 Entropy), Middling (2) or Small (1); the World is a Joint Act of everyone (5). |
| **Entropy** | The price of creation: every Act adds its weight to a public debt, and the gods must spend the debt on the Doom. Necessary and regrettable, nobody's mistake. |
| **Reckoning** | The phase where the gods spend the Entropy debt on the Doom, by Council (the whole table) or by a Doom-Keeper (one god, usually the Scribe's). |
| **Doom** | What the debt buys: a Scale (Scar, Blight, Scourge, Cataclysm, Unmaking), a Form, and Features. It has a true shape (private) and a public face (what mortals believe). |
| **Convergence** | Joining the relics on the Doom's terms. It transforms the Doom into something the world can live with; it never deletes it. |
| **Domain** | A god's field of influence (two words at most); its fingerprint, the Mark, shows on everything they make. |
| **Pact** | A deal between gods. The standard price is two Weaving Acts for one; pacts become Fates and come due at the next Convocation. |
| **Relic** | The one thing each god hides for their future avatar, free. It wakes only for its own god's avatar, does one thing alone and one more when joined. A found relic becomes an heirloom next cycle. |
| **Avatar** | A god incarnate, with no memory of it, played in the campaign. A chosen one is the same thing with different fiction. |
| **Retirement** | An avatar's end: reborn, new chosen, return, or ascend (join the pantheon as a lesser god). |
| **Convocation** | The between-cycle god round: read the Ledger, settle Pacts, arrivals, build with weights, Reckon again, the Turning, new relics. Also Canon Merge night. |
| **The Turning** | The optional time-skip at a Convocation: none, a season, a generation or an age. Free. |
| **Veil** | The wall between what the gods know (the Ledger) and what their avatars know. It cuts both ways: gods cannot touch the world between Convocations except through their avatars. |
| **Echo, Fate, Remnant, Lead** | An avatar's unexplained instinct from its god's Domain (a real power once the relic wakes); a consequence of a Pact; the one fact carried into the next life; and the first clue to the relic. |
