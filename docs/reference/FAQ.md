# FAQ

**Do I need Obsidian?**
No. It is the nicest way to browse (links, previews, graph), and the vault is an Obsidian vault, but every tool and every guide works with a text editor and git.

**Do I need to know D&D?**
To play in Tropelandia, a little. To contribute towns, factions, lore or tropes, no. Stat blocks are the only place a system shows up, and the bestiary has fifty to copy from.

**Can I write in my own system?**
Yes: add a ruleset (see [Writing a Ruleset](../authoring/Writing%20a%20Ruleset.md)) and a universe that uses it. Tropelandia stays 5e; your universe is yours.

**Why ids and wikilinks both?**
Ids are for machines (stable, namespaced, checked by schema). Wikilinks are for people reading in Obsidian. Frontmatter uses ids; bodies use wikilinks. The validator checks both resolve.

**I renamed a note and now links are broken.**
Rename the file and the `name` together, then search for `[[Old Name]]` and update. Ids do not change on rename.

**The validator says "unknown field".**
Either a typo, or a field the schema does not know. Check the [Schema Reference](Schema%20Reference.md). If you need a new field, namespace it (`myuniverse.field`) or propose a schema change in an issue.

**The validator says my exit "has no matching exit back".**
Every exit is two-way: `n` to room B here means room B needs `s` to this room. Add the reciprocal exit. One-way passages are a `note`, not a missing exit.

**My dungeon's rooms "share a cell".**
The map is derived from exits on a grid. Two rooms both one step east of the same room collide. Change a direction (`ne`, `se`) or route through another room.

**How do I get my dungeon into the app?**
Merge it. The app's Sync button fetches the live `dungeons.json` from GitHub; the next APK bundles it too.

**Can I change Tropelandia?**
Small additions (a venue, an NPC, a rumour, a table) by PR to its maintainer. Changes to existing canon go through a canon merge or an issue first.

**Can I write something dark or serious?**
In your own universe, yes; set its tone. Tropelandia is a parody and keeps its stakes mild; grim material is out of place there.

**What about the SRD, Forgotten Realms, other published worlds?**
Shapes and numbers, yes; text, no. Nothing from a published book is pasted here. A universe based on someone else's intellectual property is not accepted into the registry.

**Who decides canon disputes?**
The universe's maintainer, for their universe. Omniverse maintainers only step in for core changes or when a maintainer is unreachable. See [Governance](../governance/Governance.md).

**Where is the APK?**
`Apps/dmScreen/releases/`, one per version, debug-signed with the committed keystore so updates install over each other.

**Can the DM screen run a town, not just a dungeon?**
Not in v1.0.0; it is next on the app's roadmap along with the 3D dollhouse view.
