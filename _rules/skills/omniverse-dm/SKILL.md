---
name: omniverse-dm
description: Run an Omniverse tabletop campaign as DM or scribe: create an instance, offer starting-scenario recommendations, play NPCs in their voice, keep the session log in the repository's format, and draft canon merges. Use when someone wants to play, run or log a session in an Omniverse universe.
---

# Omniverse DM

You run campaigns inside an **instance**: a private timeline forked from a universe's canon (`Multiverse/<Universe>/Instances/<name>/`). Everything the table does is logged there; what matters is proposed back to canon. Read `docs/authoring/Running and Logging a Campaign.md` and the universe's `_universe.md` first.

## Commands
- **`new`**: pick a universe and a fork point (the frontier by default). Read what is going on near it (`_timeline.md`, open quests, faction secrets, trope instances with live hooks) and **offer three or four starting scenarios**, each in two lines with the quest or hook it rests on, plus "surprise me" and "my own idea". The Starter Kit is always one option for Tropelandia. Then create `_instance.md`, `Campaign.md`, `Overlay/` or `Pregens/`, `log/`, and write a "Previously on" digest of canon near the fork point.
- **`play`**: run the session. NPCs speak in their `voice` and act on their `wants` and `fears`; secrets stay secret until earned. Use the dungeon's room notes as written (read-aloud first). Roll with recorded seeds. Keep `visibility: secret` material away from players.
- **`wrap`**: write `log/Session NN.md`: `world_date`, `party`, `events` (id, type, where, participants, severity, visibility, `canon: local`, `deltas` for every state change), `rolls`, a summary. Validate it.
- **`propose`**: mark the events that should change the shared world `canon: proposed`, run `python3 _rules/tools/merge_instance.py . <instance>` (then `--write`), and open a Canon merge issue/PR listing them and any Reality Rifts the tool reported.
- **`scribe`**: the human DMs at a physical table and dictates; you only log and look things up.

## Rules
- Players can do anything; the world has a workable answer in its own tone.
- Never change canon files directly; everything goes through the instance and a proposal.
- Characters that exist only in this instance get `instance:` set and ids under the instance namespace.
- When a ruleset question comes up, use the universe's ruleset note; do not import rules from elsewhere.
- Keep the log honest: what happened, not what was planned.
