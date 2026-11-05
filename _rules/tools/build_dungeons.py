#!/usr/bin/env python3
"""Validate Omniverse dungeon notes and build the shared dungeon index.

Usage:
    python3 _rules/tools/build_dungeons.py <vault-root> [--check] [--out DIR]

Reads every note with `kind: dungeon` or `kind: room`, checks them, and writes
    <out>/dungeons.json        the file the dmScreen app reads
    <out>/Dungeon Index.md     a browsable index for Obsidian
`--check` validates only (for CI and pull requests). Exit code 1 if there are errors.

This tool only reads data. It never executes anything found in a note.
"""
import json
import os
import re
import sys
from collections import deque

try:
    import yaml
except ImportError:
    sys.exit("PyYAML is required: pip install pyyaml")

SCHEMA_VERSION = 1
VEC = {"n": (0, -1), "s": (0, 1), "e": (1, 0), "w": (-1, 0), "ne": (1, -1), "nw": (-1, -1), "se": (1, 1), "sw": (-1, 1)}
OPP = {"n": "s", "s": "n", "e": "w", "w": "e", "ne": "sw", "sw": "ne", "nw": "se", "se": "nw", "u": "d", "d": "u"}
KINDS = {"door", "archway", "passage", "stairs", "ladder", "secret", "portal", "hatch", "window", "chute", "bridge"}
STATES = {"open", "closed", "locked", "stuck", "barred", "trapped", "hidden", "rubble"}


def read_notes(root):
    notes = {}
    for dp, dn, fn in os.walk(root):
        dn[:] = [d for d in dn if not d.startswith(".")]
        for f in fn:
            if not f.endswith(".md"):
                continue
            p = os.path.join(dp, f)
            src = open(p, encoding="utf-8").read()
            m = re.match(r"^---\n(.*?)\n---\n", src, re.S)
            if not m:
                continue
            try:
                meta = yaml.safe_load(m.group(1))
            except Exception:
                continue
            if isinstance(meta, dict) and "id" in meta:
                notes.setdefault(meta["id"], (os.path.relpath(p, root), meta))
    return notes


def resolve_encounter(en, notes, errors, rel):
    """Fill monster numbers from the bestiary when a monster has a ref; attach a compact stat block."""
    out = dict(en)
    mons = []
    for mo in en.get("monsters") or []:
        m = dict(mo)
        ref = m.get("ref")
        if ref:
            b = notes.get(ref)
            if not b or b[1].get("kind") != "monster":
                errors.append("%s: monster ref %s is not a bestiary entry" % (rel, ref))
            else:
                bm = b[1]
                m.setdefault("name", bm.get("name"))
                hp, ac, attack, block = stat_summary(bm)
                if "hp" not in m: m["hp"] = hp
                if "ac" not in m: m["ac"] = ac
                if "attack" not in m: m["attack"] = attack
                m["stats"] = {"id": ref, "name": bm.get("name"), "size": bm.get("size"), "type": bm.get("type"), "threat": bm.get("threat"),
                              "ruleset": bm.get("ruleset"), "block": block, "tactics": bm.get("tactics") or "", "lore": bm.get("lore") or ""}
        mons.append(m)
    out["monsters"] = mons
    return out


def stat_summary(bm):
    """(hp, ac, first attack, the ruleset's block) for a bestiary note, whichever ruleset it is written in."""
    if bm.get("dnd5e"):
        d = bm["dnd5e"]
        acts = [a for a in (d.get("actions") or []) if a.get("name") != "Multiattack"]
        return d.get("hp"), d.get("ac"), (acts[0]["text"] if acts else ""), dict(d, ruleset="dnd5e")
    if bm.get("six_sides"):
        d = bm["six_sides"]
        mv = d.get("moves") or []
        return d.get("harm"), d.get("difficulty"), (mv[0]["text"] if mv else ""), dict(d, ruleset="six_sides")
    if bm.get("core"):
        d = bm["core"]
        return d.get("rank"), d.get("rank"), ", ".join(d.get("descriptors") or []), dict(d, ruleset="core")
    return None, None, "", {}


def resolve_loot(l, notes):
    """Loot entries are strings or item ids; ids become objects with the item's details."""
    if isinstance(l, str) and l in notes and notes[l][1].get("kind") == "item":
        it = notes[l][1]
        return {"ref": l, "name": it.get("name"), "type": it.get("item_type"), "rarity": it.get("rarity"), "attunement": bool(it.get("attunement")),
                "description": it.get("description") or "", "mechanics": it.get("mechanics") or "", "curse": it.get("curse") or ""}
    return l


def place_path(notes, pid):
    out, seen = [], set()
    while pid and pid in notes and pid not in seen:
        seen.add(pid)
        meta = notes[pid][1]
        if meta.get("kind") in ("omniverse", "multiverse"):
            break
        out.append({"id": pid, "kind": meta.get("kind"), "name": meta.get("name")})
        pid = meta.get("parent")
    return list(reversed(out))


def build(root):
    notes = read_notes(root)
    errors, warns = [], []
    dungeons = {i: v for i, v in notes.items() if v[1].get("kind") == "dungeon"}
    rooms = {i: v for i, v in notes.items() if v[1].get("kind") == "room"}
    by_dungeon = {}
    for rid, (rel, m) in rooms.items():
        by_dungeon.setdefault(m.get("dungeon"), []).append(rid)

    for rid, (rel, m) in rooms.items():
        if m.get("dungeon") not in dungeons:
            errors.append("%s: room refers to unknown dungeon %s" % (rel, m.get("dungeon")))

    result = []
    for did, (drel, dm) in sorted(dungeons.items(), key=lambda kv: kv[1][1].get("name", "")):
        ctx = drel
        for field in ("name", "parent", "level_range", "entry", "summary"):
            if field not in dm:
                errors.append("%s: missing field %s" % (ctx, field))
        if dm.get("parent") not in notes:
            errors.append("%s: parent place %s does not exist" % (ctx, dm.get("parent")))
        lr = dm.get("level_range")
        if not (isinstance(lr, list) and len(lr) == 2 and all(isinstance(x, int) for x in lr) and lr[0] <= lr[1]):
            errors.append("%s: level_range must be [min, max] integers" % ctx)
        rids = by_dungeon.get(did, [])
        if not rids:
            errors.append("%s: dungeon has no rooms" % ctx)
            continue
        if dm.get("entry") not in rids:
            errors.append("%s: entry %s is not one of the dungeon's rooms" % (ctx, dm.get("entry")))
        for t in dm.get("tropes_involved", []) or []:
            if t not in notes:
                errors.append("%s: unknown trope %s" % (ctx, t))
        # per-room checks
        for rid in rids:
            rel, rm = rooms[rid]
            if not rm.get("read_aloud"):
                warns.append("%s: no read_aloud text" % rel)
            for e in rm.get("exits") or []:
                d, to = e.get("dir"), e.get("to")
                if d not in VEC and d not in ("u", "d", "out"):
                    errors.append("%s: bad exit direction %r" % (rel, d))
                if e.get("kind") not in KINDS:
                    warns.append("%s: unknown exit kind %r" % (rel, e.get("kind")))
                if e.get("state") not in STATES:
                    warns.append("%s: unknown exit state %r" % (rel, e.get("state")))
                if to == "outside":
                    continue
                if to not in rids:
                    errors.append("%s: exit %s leads to %s, which is not in this dungeon" % (rel, d, to))
                    continue
                back = [x for x in (rooms[to][1].get("exits") or []) if x.get("to") == rid]
                if not any(x.get("dir") == OPP.get(d) for x in back):
                    errors.append("%s: exit %s to %s has no matching %s exit back" % (rel, d, to, OPP.get(d)))
            for tr in rm.get("traps") or []:
                for k in ("detect_dc", "disarm_dc"):
                    if not isinstance(tr.get(k), int):
                        errors.append("%s: trap %r needs integer %s" % (rel, tr.get("name"), k))
            for en in rm.get("encounters") or []:
                for mo in en.get("monsters") or []:
                    if not isinstance(mo.get("count"), int) or (not mo.get("ref") and not isinstance(mo.get("hp"), int)):
                        errors.append("%s: monster %r needs integer hp and count" % (rel, mo.get("name")))
        # layout: BFS from the entry room
        pos, floors = {}, {}
        if dm.get("entry") in rids:
            start = dm["entry"]
            pos[start] = (0, 0)
            floors[start] = 0
            q = deque([start])
            used = {(0, 0, 0): start}
            while q:
                cur = q.popleft()
                x, y = pos[cur]
                f = floors[cur]
                for e in rooms[cur][1].get("exits") or []:
                    to, d = e.get("to"), e.get("dir")
                    if to == "outside" or to not in rids:
                        continue
                    if d in VEC:
                        nx, ny, nf = x + VEC[d][0], y + VEC[d][1], f
                    elif d == "u":
                        nx, ny, nf = x, y, f + 1
                    elif d == "d":
                        nx, ny, nf = x, y, f - 1
                    else:
                        continue
                    if to in pos:
                        if (pos[to], floors[to]) != ((nx, ny), nf):
                            errors.append("%s: layout conflict, %s is placed inconsistently (via %s from %s)" % (ctx, to, d, cur))
                        continue
                    if (nx, ny, nf) in used:
                        errors.append("%s: layout conflict, %s and %s share a cell" % (ctx, to, used[(nx, ny, nf)]))
                        continue
                    pos[to], floors[to] = (nx, ny), nf
                    used[(nx, ny, nf)] = to
                    q.append(to)
            for rid in rids:
                if rid not in pos:
                    errors.append("%s: room %s is not reachable from the entry" % (ctx, rid))
        rl = []
        for rid in sorted(rids, key=lambda r: rooms[r][1].get("number", 0)):
            rel, rm = rooms[rid]
            x, y = pos.get(rid, (0, 0))
            rl.append({
                "id": rid, "number": rm.get("number"), "code": rm.get("code"), "name": rm.get("name"),
                "floor": floors.get(rid, 0), "pos": [x, y], "light": rm.get("light"), "size": rm.get("size"),
                "exits": [{"dir": e.get("dir"), "to": e.get("to"), "kind": e.get("kind"), "state": e.get("state"), "note": e.get("note") or ""} for e in rm.get("exits") or []],
                "readAloud": rm.get("read_aloud") or "",
                "features": rm.get("features") or [],
                "encounters": [resolve_encounter(en, notes, errors, rel) for en in (rm.get("encounters") or [])],
                "traps": rm.get("traps") or [],
                "puzzles": rm.get("puzzles") or [],
                "secrets": rm.get("secrets") or [],
                "loot": [resolve_loot(l, notes) for l in (rm.get("loot") or [])],
                "dmNotes": rm.get("dm_notes") or "",
            })
        pp = place_path(notes, dm.get("parent"))
        result.append({
            "id": did, "code": dm.get("code"), "name": dm.get("name"), "universe": dm.get("universe"),
            "place": {"id": dm.get("parent"), "name": pp[-1]["name"] if pp else None, "path": [p["name"] for p in pp]},
            "levelRange": dm.get("level_range"), "tone": dm.get("tone"), "tags": dm.get("tags") or [],
            "summary": dm.get("summary"), "hooks": dm.get("hooks") or [], "rumours": dm.get("rumours") or [],
            "wandering": dm.get("wandering") or {}, "tropes": [notes[t][1].get("name") for t in dm.get("tropes_involved") or [] if t in notes],
            "author": dm.get("author"), "status": dm.get("status"), "entry": dm.get("entry"), "rooms": rl,
        })
    seen = {}
    for d in result:
        c = d.get("code")
        if not c:
            errors.append("%s: dungeon has no code" % d["id"])
        elif c in seen:
            errors.append("dungeon code %s is used by both %s and %s; codes must be unique (the app routes by code)" % (c, seen[c], d["id"]))
        else:
            seen[c] = d["id"]
    return result, errors, warns


def write_outputs(result, out):
    os.makedirs(out, exist_ok=True)
    data = {"schema": SCHEMA_VERSION, "source": "https://github.com/timmseth/omniverse", "dungeons": result}
    with open(os.path.join(out, "dungeons.json"), "w", encoding="utf-8", newline="\n") as f:
        json.dump(data, f, ensure_ascii=False, indent=1, sort_keys=False)
        f.write("\n")
    lines = ["---", "kind: generated", "generated: build_dungeons.py", "---", "# Dungeon Index", "",
             "*(Do not edit. Regenerated by `_rules/tools/build_dungeons.py`.)*", "",
             "| Dungeon | Level | Where | Rooms | Tone |", "|---|---|---|---|---|"]
    for d in result:
        lr = d["levelRange"]
        where = " > ".join(d["place"]["path"][-3:])
        lines.append("| [[%s]] | %s-%s | %s | %d | %s |" % (d["name"], lr[0], lr[1], where, len(d["rooms"]), d["tone"]))
    with open(os.path.join(out, "Dungeon Index.md"), "w", encoding="utf-8", newline="\n") as f:
        f.write("\n".join(lines) + "\n")


def main(argv):
    if len(argv) < 2:
        print(__doc__)
        return 2
    root = argv[1]
    check = "--check" in argv
    out = os.path.join(root, "_generated")
    if "--out" in argv:
        out = argv[argv.index("--out") + 1]
    result, errors, warns = build(root)
    for w in warns:
        print("WARN ", w)
    for e in errors:
        print("ERROR", e)
    print("dungeons: %d, rooms: %d" % (len(result), sum(len(d["rooms"]) for d in result)))
    if errors:
        print("RESULT: %d errors" % len(errors))
        return 1
    if not check:
        write_outputs(result, out)
        print("wrote", os.path.join(out, "dungeons.json"))
    print("RESULT: OK")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
