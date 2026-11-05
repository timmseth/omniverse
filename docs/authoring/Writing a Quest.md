# Writing a Quest

A quest is a chain of stages that threads a town, a faction and a dungeon, with outcomes that can become canon. It lives at `Multiverse/<Universe>/Quests/<Name>.md`, `kind: quest`.

## Fields
- **`giver`** (a person, faction or venue) and **`start`** (where it begins). Hooks come from these.
- **`level_range`**, **`premise`** (two or three sentences: the situation, not the plot), **`hooks`** (three ways a party gets involved; make them come from different people).
- **`stages`**: three or four `{name, goal, where | dungeon, complications, clue}`. A stage says what is true and what the party is trying to do, not what they will do. The `clue` is the thread to the next stage.
- **`rewards`**: strings or item ids. Include at least one reward that is a relationship (a favour, a grudge, a membership).
- **`on_success`** and **`on_failure`**: what changes in the world. These are the sentences a canon merge will turn into events, so make them concrete.
- **`factions`**, **`dungeons`**, **`tropes_involved`**, **`status`**, **`author`**.

## Shape
Stage one is in town (a venue, a conversation, a choice). Stage two is the dungeon. Stage three is back in the world with what the party found, where a faction or a ruler has to react. A fourth stage, if any, is the consequence.

Every quest in Tropelandia is also listed on its dungeon (`quests:`) and its index page. Run `build_all` after adding one.

## Linking into a campaign
A campaign note lists the quests it uses in `quests:`. The Starter Kit's [The Arc](../../Multiverse/Tropelandia/Instances/starter-kit/The%20Arc.md) shows three quests run in sequence with threads planted between them.
