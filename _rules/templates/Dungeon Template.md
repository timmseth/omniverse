---
id: omniverse.template.dungeon
kind: template
name: Dungeon Template
parent: omniverse
---
# Dungeon Template

Copy the block below into a new note at `Multiverse/<Universe>/Dungeons/<Name>/<Name>.md`, replace everything in angle brackets, and delete the comments. See [[Submitting a Dungeon]].

```yaml
---
id: <universe>.dungeon.<slug>
kind: dungeon
name: <Dungeon Name>
code: <ABC>                       # 3-4 capitals, unique among dungeons
parent: <id of the place that contains it>
universe: <universe>
ruleset: omniverse.ruleset.dnd5e  # the universe's ruleset
level_range: [1, 3]
tone: <short phrase>
tags: [<tag>, <tag>]
entry: <universe>.room.<slug>.01-<room-slug>
tropes_involved: [omniverse.trope.<slug>]
author: <you>
status: draft
summary: >-
  Two or three evocative sentences: what it is, who lives there, why anyone goes in.
hooks:
  - <a reason a party goes in>
rumours:
  - <what the tavern says>
wandering:
  die: d6
  entries:
    - "1: <what happens>"
    - "2: <what happens>"
---
```

Below the frontmatter, the body is optional free text for Obsidian readers.
