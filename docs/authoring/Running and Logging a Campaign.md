# Running and Logging a Campaign

A campaign lives in an instance: a private timeline forked from canon. Everything your table does is logged there; what matters is proposed back.

## Making an instance
Copy the Starter Kit, or make the folder by hand:
```
Multiverse/<Universe>/Instances/<name>/
├── _instance.md      kind: instance; fork_point {event, year, day}, status, visibility, maintainers, scenario
├── Campaign.md       kind: campaign; party (person ids), ruleset, arc, quests
├── Overlay/          characters that exist only here (kind: person, instance: <name>)
├── Pregens/          ready-made player characters (optional)
└── log/              one session note per sitting
```
The instance id is the folder name (`pie-heist`), and instance-local ids are `<name>.person.<slug>`, `<name>.session.<nn>`, `<name>.event.<slug>`. The DM skill does all of this when you say `new`.

## The session log (`kind: session`)
`log/Session 01.md`:
```yaml
id: pie-heist.session.01
kind: session
parent: pie-heist.campaign
campaign: pie-heist
session: 1
real_date: 2026-11-04
world_date: { year: 1489, day: 36 }
party: [pie-heist.person.tess-underbough]
events:
  - id: pie-heist.event.s01-e01
    type: recruitment
    where: tropelandia.settlement.barrowdale
    participants: [pie-heist.person.tess-underbough, tropelandia.person.marlowe-the-mildly-menacing]
    severity: 1
    visibility: public
    canon: local
    deltas:
      - { entity: tropelandia.person.marlowe-the-mildly-menacing, field: apprentices, from: [], to: [pie-heist.person.tess-underbough] }
rolls:
  - { seed: 8841, what: "Stealth against Rosalind's housekeeper", result: "d20=17 vs DC 15" }
```
Log an event for anything that changed the world: a death, a debt, a door opened, a faction offended. `deltas` say exactly what changed, in the form a merge can apply. Rolls are optional but make replays honest.

## Proposing canon
When an event should be true for everyone, set `canon: proposed` and run:
```
python3 _rules/tools/merge_instance.py . pie-heist
```
It drafts one event note per proposed event into `Events/<year>/` with `canon: proposed` and `source: pie-heist`, and tells you what it would write; add `--write` to write them. Open a **Canon merge** issue, then a PR with the drafted notes. The universe's maintainer reviews: they may accept, reject, or ask for changes, and they resolve any Reality Rift with events merged since your fork point. Accepted events become `canon: canon`; the instance keeps its copy as `canon: local` with a note of the merge.

## Visibility
`visibility: secret` on an event or a note keeps it out of player-facing views. Instances are `visibility: private` by default; a public instance is readable by anyone, which some tables like.
