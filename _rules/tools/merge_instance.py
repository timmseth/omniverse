#!/usr/bin/env python3
"""Draft a canon merge: turn an instance's `canon: proposed` session events into event notes
in the universe's Events/ folder, ready for a pull request.

Usage:  python3 _rules/tools/merge_instance.py <repo root> <instance id> [--write] [--all]
  --write   write the event notes (default is a dry run that prints what it would write)
  --all     take every event, not only those marked canon: proposed

Each drafted note has canon: proposed and source: <instance id>; the universe's maintainer
flips canon to canon (or rejected) in review. Events already drafted (same id) are skipped.
Reality Rifts (canon events merged since the fork point that touch the same entities) are listed.
"""
import os, re, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import validate as V
import yaml


def slug(s):
    return re.sub(r"[^a-z0-9]+", "-", str(s).lower().replace("'", "")).strip("-")


def main(argv):
    if len(argv) < 3:
        print(__doc__); return 2
    root, iid = argv[1], argv[2]
    write, take_all = "--write" in argv, "--all" in argv
    notes, names, _ = V.load_notes(root)
    if iid not in notes or notes[iid][1].get("kind") != "instance":
        sys.exit("no instance with id %s" % iid)
    irel, inst = notes[iid]
    uid = inst.get("universe")
    urel = notes[uid][0]
    udir = os.path.join(root, os.path.dirname(urel))
    fork = inst.get("fork_point") or {}
    sessions = sorted(((rel, m) for rel, m in notes.values() if m.get("kind") == "session" and m.get("campaign") == iid), key=lambda x: x[1].get("session", 0))
    existing = {i for i, (r, m) in notes.items() if m.get("kind") == "event" and m.get("universe") == uid}
    by_source = {m.get("source"): True for r, m in notes.values() if m.get("kind") == "event"}
    drafted, skipped = [], []
    touched = set()
    for srel, sm in sessions:
        wd = sm.get("world_date") or {}
        for ev in sm.get("events") or []:
            if not take_all and ev.get("canon") != "proposed":
                continue
            year, day = wd.get("year", fork.get("year", 0)), wd.get("day", fork.get("day", 0))
            name = ev.get("summary") or ev.get("type", "event").replace("_", " ").title()
            eid = "%s.event.%d-%04d-%s" % (uid, year, day, slug(ev["id"].split(".")[-1] + "-" + name)[:60])
            if eid in existing:
                skipped.append(eid); continue
            meta = {"id": eid, "kind": "event", "name": name[:80], "parent": uid, "universe": uid, "when": {"year": year, "day": day},
                    "where": ev.get("where"), "participants": ev.get("participants") or [], "type": ev.get("type", "event"), "severity": ev.get("severity", 1),
                    "visibility": ev.get("visibility", "public"), "canon": "proposed", "source": iid,
                    "deltas": ev.get("deltas") or [], "tags": ["event", "merge", iid], "summary": "Proposed from %s, session %s." % (iid, sm.get("session"))}
            for d in meta["deltas"]:
                if isinstance(d, dict) and d.get("entity"): touched.add(d["entity"])
            for p in meta["participants"]: touched.add(p)
            body = "# %s\n\n*Year %d, day %d. Proposed from instance `%s`, session %s (`%s`).*\n\n%s\n\n## Deltas\n%s\n" % (
                meta["name"], year, day, iid, sm.get("session"), ev["id"], ev.get("summary") or "",
                "\n".join("- `%s` . `%s`: %r -> %r" % (d.get("entity"), d.get("field"), d.get("from"), d.get("to")) for d in meta["deltas"] if isinstance(d, dict)) or "- none")
            rel = os.path.join("Events", str(year), "%d-%04d %s.md" % (year, day, re.sub(r'[\\/:*?"<>|]', "", meta["name"][:60])))
            drafted.append((rel, meta, body))
    # rifts: canon events after the fork point touching the same entities
    rifts = []
    for r, m in notes.values():
        if m.get("kind") != "event" or m.get("universe") != uid or m.get("canon") != "canon": continue
        w = m.get("when") or {}
        if (w.get("year", 0), w.get("day", 0)) <= (fork.get("year", 0), fork.get("day", 0)): continue
        ents = set(m.get("participants") or []) | {d.get("entity") for d in (m.get("deltas") or []) if isinstance(d, dict)}
        if ents & touched: rifts.append((r, sorted(ents & touched)))
    print("instance %s (fork %s day %s) in %s: %d session(s), %d event(s) to draft, %d already drafted" % (iid, fork.get("year"), fork.get("day"), uid, len(sessions), len(drafted), len(skipped)))
    for rel, meta, body in drafted:
        print("  %s  -> %s" % (meta["id"], rel))
    if rifts:
        print("REALITY RIFTS: canon events since the fork point touch the same entities; the maintainer must order them:")
        for r, ents in rifts: print("  %s  (%s)" % (r, ", ".join(ents)))
    if write:
        for rel, meta, body in drafted:
            p = os.path.join(udir, rel)
            os.makedirs(os.path.dirname(p), exist_ok=True)
            open(p, "w", encoding="utf-8", newline="\n").write("---\n%s\n---\n%s" % (yaml.safe_dump(meta, sort_keys=False, allow_unicode=True, width=1000).rstrip(), body))
        print("wrote %d event note(s). Now: validate, build_all, open a Canon merge PR." % len(drafted))
    elif drafted:
        print("dry run; add --write to write them")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
