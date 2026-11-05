# Contributing with an LLM

You do not need to learn YAML to add to the Omniverse. Describe what you want to a language model that can read this repository (Claude Code, Claude with the repo connected, or any agent that follows `AGENTS.md`), and let it do the mechanical part: folders, ids, frontmatter, cross-links, the validator, the pull request. You supply the vision and you judge the result.

## What to tell it
Point it at the repository and say what you want, with as much flavour as you have. A good brief has:
- **Where**: the universe and the place ("Tropelandia, on the Sullen Coast, near Greyharbour").
- **What**: the kind of thing ("a smugglers' cove with a dungeon under it", "a rival wizard for Marlowe", "a festival the whole duchy celebrates").
- **Why it matters**: the hook ("the Society uses it; the Harbourmaster wants it closed").
- **Tone cues**: anything you want kept or avoided ("funny but not silly", "no undead").
- **Level**: for a dungeon or quest, who it is for ("levels 3 to 5").

Then: "Follow AGENTS.md. Show me the list of notes you plan before writing. Validate, build, and open a PR."

## What it will do
Read the entry docs and three neighbouring notes, propose the set of notes (a cove is a venue or region, a dungeon with rooms, a faction presence, two NPCs, a quest), write them in the universe's voice, link them both ways, run `validate.py` and `build_all.py`, and open a PR with the template filled in. You review the PR like any other: does it fit, does it read well, is it yours.

## Example brief
> In Tropelandia, add a small fishing village on the Sullen Coast called Netherwick, two hours from Greyharbour. The villagers are all terribly polite because the sea takes anyone who is rude. There is a lighthouse whose keeper has not been seen in a year but whose lamp is still lit. Make the lighthouse a dungeon for levels 2 to 4, with something sad at the top, and a quest from the village. Follow AGENTS.md, propose the notes first, then write and validate.

## Ready-made skills
`_rules/skills/` has SKILL.md files you can give Claude (save them as skills in claude.ai, or let Claude Code pick them up from the repo):
- **omniverse-contribute**: the general "turn my description into valid notes" workflow.
- **omniverse-dungeon**: pitch, rooms, exits, bestiary, loot, quest, build check.
- **omniverse-town**: settlement, venues, NPCs, factions, links.
- **omniverse-review**: review a PR against schema, style, licence and link symmetry.
- **omniverse-dm**: run a campaign in an instance, recommend starting scenarios, keep the log, draft canon merges.

## Where the human still matters
The model will not know that your table loves a running joke, that your player's character is the mayor's cousin, or that a dungeon should feel like the mine from your childhood. Say those things. Read the read-aloud text out loud before you merge; if it does not sound like the universe, say so, and the model will redo it. You own what goes in under your name.
