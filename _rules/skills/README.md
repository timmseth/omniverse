---
id: omniverse.skills-index
kind: index
name: Skills
parent: omniverse
---
# Skills for LLMs and agents

Each folder holds a `SKILL.md`: instructions a language model follows for one kind of job in this repository. Claude users can save them as skills; Claude Code and other agents can read them as instructions. `AGENTS.md` at the root points here.

| Skill | Job |
|---|---|
| [[omniverse-contribute/SKILL\|omniverse-contribute]] | Turn a description into valid, linked notes and a pull request |
| [[omniverse-dungeon/SKILL\|omniverse-dungeon]] | Write a dungeon: rooms, exits, bestiary, loot, quest, build check |
| [[omniverse-town/SKILL\|omniverse-town]] | Write a town: settlement, venues, NPCs, factions, links |
| [[omniverse-review/SKILL\|omniverse-review]] | Review a pull request against schema, style, licence and links |
| [[omniverse-dm/SKILL\|omniverse-dm]] | Run a campaign in an instance, recommend scenarios, log, propose canon |

Format: YAML frontmatter with `name` and `description` (the description decides when the skill is used), then the instructions. Keep each one short enough to read before the job and specific enough to do it.
