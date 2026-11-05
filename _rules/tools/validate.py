#!/usr/bin/env python3
"""Omniverse validator. Checks every note against the schemas in _rules/schemas/
(plus any module _schemas/), link integrity, parent chains, folder placement and
Windows path length.

Usage:  python3 _rules/tools/validate.py <repo root> [--strict] [--quiet]
  --strict   treat warnings as errors
  --quiet    print only the summary and problems
Exit code 1 when there are errors (or warnings with --strict).
"""
import os, re, sys

try:
    import yaml
except ImportError:
    sys.exit("PyYAML missing: pip install pyyaml")

ROOT_PREFIX = r"C:\Users\timmo\Documents\Obsidian\Omniverse"   # longest real-world prefix, for the path-length warning
SKIP_DIRS = {".git", ".github", "Apps", "node_modules", ".obsidian", ".trash", "_generated", "docs"}
PLACE_KINDS = ["plane", "galaxy", "star_system", "planet", "continent", "region", "country", "province", "settlement"]
SLUG = r"[a-z0-9]+(?:-[a-z0-9]+)*"
ID_PH = {"<universe>": SLUG, "<instance>": SLUG, "<slug>": SLUG, "<dungeon>": SLUG, "<nn>": r"\d{2}", "<nnnn>": r"\d{4}", "<year>": r"\d+"}
FOLDER_PH = {"<Universe>": r"[^/]+", "<Name>": r"[^/]+", "<Dungeon>": r"[^/]+", "<Place path>": r".+", "<year>": r"\d+", "<nnnn>": r"\d{4}"}
DICE = re.compile(r"^(?:\d+|\d*d\d+(?:[+-]\d+)?)$")

errors, warns = [], []
def err(m): errors.append(m)
def warn(m): warns.append(m)


# ---------------------------------------------------------------- loading
def load_schemas(root):
    schemas, mixins = {}, {}
    paths = []
    core = os.path.join(root, "_rules", "schemas")
    if os.path.isdir(core):
        paths += [os.path.join(core, f) for f in sorted(os.listdir(core)) if f.endswith(".yaml")]
    for dp, dn, fn in os.walk(root):
        dn[:] = [d for d in dn if d not in SKIP_DIRS]
        if os.path.basename(dp) == "_schemas":
            paths += [os.path.join(dp, f) for f in sorted(fn) if f.endswith(".yaml")]
    for p in paths:
        try:
            data = yaml.safe_load(open(p, encoding="utf-8"))
        except Exception as e:
            err("schema %s: YAML error %s" % (p, e)); continue
        if os.path.basename(p) == "_mixins.yaml":
            mixins.update(data or {}); continue
        if not isinstance(data, dict) or "kind" not in data:
            err("schema %s: no kind" % p); continue
        k = data["kind"]
        if k in schemas:                       # extension: additive merge
            base = schemas[k]
            base.setdefault("fields", {}).update(data.get("fields") or {})
            for key in ("folder", "id"):
                if key in data:
                    base[key] = as_list(base.get(key)) + as_list(data[key])
            base.setdefault("mixins", []).extend(data.get("mixins") or [])
        else:
            schemas[k] = data
    for k, s in schemas.items():
        fields = {}
        for m in s.get("mixins") or []:
            if m not in mixins:
                err("schema %s: unknown mixin %s" % (k, m)); continue
            fields.update(mixins[m])
        fields.update(s.get("fields") or {})
        s["_fields"] = fields
    return schemas


def as_list(v):
    if v is None: return []
    return v if isinstance(v, list) else [v]


def load_notes(root):
    notes, names, state_ids, dups = {}, {}, [], []
    for dp, dn, fn in os.walk(root):
        dn[:] = [d for d in dn if d not in SKIP_DIRS]
        for f in fn:
            full = os.path.join(dp, f)
            rel = os.path.relpath(full, root).replace(os.sep, "/")
            if f.endswith(".md"):
                structural = f.startswith("_") or f == "Campaign.md" or f.startswith("Session ")
                if f[:-3] in names and not rel.startswith("_rules/templates/") and not rel.startswith("_rules/skills/") and not structural:
                    dups.append((f[:-3], names[f[:-3]], rel))
                names.setdefault(f[:-3], rel)
            if not (f.endswith(".md") or f.endswith(".yaml")) or rel in ("README.md", "CONTRIBUTING.md", "AGENTS.md", "CLAUDE.md", "Welcome.md") or rel.startswith(".github/") or (rel.startswith("_rules/skills/") and f == "SKILL.md"):
                continue
            src = open(full, encoding="utf-8").read()
            if f.endswith(".md"):
                m = re.match(r"^---\r?\n(.*?)\r?\n---\r?\n", src, re.S)
                if not m:
                    if not rel.startswith("_rules/"):
                        warn("no frontmatter: " + rel)
                    continue
                try:
                    meta = yaml.safe_load(m.group(1))
                except Exception as e:
                    err("YAML error in %s: %s" % (rel, e)); continue
            else:
                if "_schemas" in rel.split("/") or rel.startswith("_rules/"):
                    continue
                try:
                    meta = yaml.safe_load(src)
                except Exception as e:
                    err("YAML error in %s: %s" % (rel, e)); continue
            if not isinstance(meta, dict):
                continue
            if "_state" in rel.split("/"):
                if "id" in meta: state_ids.append((rel, meta["id"]))
                continue
            if "id" in meta and meta["id"] is not None:
                if meta["id"] in notes:
                    err("duplicate id %s (%s, %s)" % (meta["id"], notes[meta["id"]][0], rel))
                notes[meta["id"]] = (rel, meta)
            elif meta.get("kind") not in ("generated", "template"):
                warn("%s: note has no id" % rel)
    bypath = {rel: meta for rel, meta in notes.values()}
    for name, a, b in dups:
        ka, kb = (bypath.get(a) or {}).get("kind"), (bypath.get(b) or {}).get("kind")
        if ka == kb and ka in ("index", "plane", "guide", "calendar"):
            continue   # every universe has a Factions index and a Material Plane; link to these by path
        warn("two notes share the name %s (%s, %s); wikilinks to it are ambiguous, use the path" % (name, a, b))
    return notes, names, state_ids


# ---------------------------------------------------------------- type checks
class Ctx:
    def __init__(self, notes, extra):
        self.notes, self.extra = notes, extra

    def ref_ok(self, v):
        return v in self.notes or v in self.extra or any(v.startswith(p) for p in (".population.",)) or ".population." in v

    def ref_kind(self, v):
        n = self.notes.get(v)
        return n[1].get("kind") if n else None


def norm(spec):
    if isinstance(spec, str):
        return {"type": spec}
    return spec or {"type": "any"}


def check(val, spec, path, ctx, out):
    spec = norm(spec)
    t = spec.get("type", "any")
    if val is None:
        if spec.get("nullable") or not spec.get("required"):
            return
        out.append("%s is null" % path); return
    if t == "any":
        return
    if t == "id":
        if not isinstance(val, str): out.append("%s: id must be a string" % path)
    elif t == "string":
        if not isinstance(val, str): out.append("%s: expected string, got %s" % (path, type(val).__name__)); return
        if spec.get("pattern") and not re.search(spec["pattern"], val):
            out.append("%s: %r does not match %s" % (path, val, spec["pattern"]))
    elif t == "text":
        if not isinstance(val, str): out.append("%s: expected text" % path)
    elif t == "int":
        if not isinstance(val, int) or isinstance(val, bool): out.append("%s: expected integer, got %r" % (path, val))
    elif t == "number":
        if not isinstance(val, (int, float)) or isinstance(val, bool): out.append("%s: expected number, got %r" % (path, val))
    elif t == "bool":
        if not isinstance(val, bool): out.append("%s: expected true/false" % path)
    elif t == "dice":
        if not isinstance(val, str) or not DICE.match(val): out.append("%s: expected dice like d6 or 2d8+1, got %r" % (path, val))
    elif t == "enum":
        if val not in spec.get("values", []): out.append("%s: %r is not one of %s" % (path, val, spec.get("values")))
    elif t == "const":
        if val != spec.get("value"): out.append("%s: must be %r" % (path, spec.get("value")))
    elif t == "ref":
        if not isinstance(val, str): out.append("%s: expected an id, got %r" % (path, val)); return
        if not ctx.ref_ok(val):
            out.append("%s: unknown id %s" % (path, val)); return
        kinds = spec.get("kinds")
        rk = ctx.ref_kind(val)
        if kinds and rk and rk not in kinds:
            out.append("%s: %s is a %s, expected %s" % (path, val, rk, "/".join(kinds)))
    elif t == "when":
        if val == "primordial": return
        if isinstance(val, dict):
            if not isinstance(val.get("year"), int): out.append("%s: a date needs an integer year" % path)
            for k in ("day", "omni_day"):
                if k in val and not isinstance(val[k], int): out.append("%s.%s: expected integer" % (path, k))
            if "era" in val and val["era"] is not None:
                check(val["era"], {"type": "ref", "kinds": ["era"]}, path + ".era", ctx, out)
            for k in val:
                if k not in ("year", "day", "era", "omni_day", "month"): out.append("%s: unknown date key %s" % (path, k))
        else:
            out.append("%s: expected primordial, null or {year, day, era}, got %r" % (path, val))
    elif t == "list":
        if not isinstance(val, list): out.append("%s: expected a list" % path); return
        if "length" in spec and len(val) != spec["length"]: out.append("%s: expected %d items" % (path, spec["length"]))
        if "min" in spec and len(val) < spec["min"]: out.append("%s: expected at least %d items" % (path, spec["min"]))
        for i, x in enumerate(val):
            check(x, spec.get("of", "any"), "%s[%d]" % (path, i), ctx, out)
    elif t == "map":
        if not isinstance(val, dict): out.append("%s: expected a map" % path); return
        check_fields(val, spec.get("fields") or {}, path, ctx, out, spec.get("open", False))
    else:
        out.append("%s: schema uses unknown type %s" % (path, t))


def check_table(meta, probs):
    """Entries must cover 1..N of the die with no gaps or overlaps."""
    die = str(meta.get("die") or "")
    m = re.match(r"^(\d*)d(\d+)", die)
    if not m:
        return
    n = int(m.group(2)) * (int(m.group(1) or 1))
    lo = int(m.group(1) or 1)
    covered = {}
    for i, e in enumerate(meta.get("entries") or []):
        r = e.get("roll") if isinstance(e, dict) else None
        if isinstance(r, int):
            a, b = r, r
        elif isinstance(r, str) and re.match(r"^\d+\s*-\s*\d+$", r):
            a, b = [int(x) for x in r.split("-")]
        else:
            probs.append("entries[%d].roll: expected a number or a range like 6-10, got %r" % (i, r)); continue
        for v in range(a, b + 1):
            if v in covered:
                probs.append("entries[%d]: roll %d is also covered by entry %d" % (i, v, covered[v]))
            covered[v] = i
    missing = [v for v in range(lo, n + 1) if v not in covered]
    if missing:
        probs.append("WARN table does not cover rolls %s" % ", ".join(str(v) for v in missing[:8]))


def check_fields(obj, fields, path, ctx, out, open_=False):
    for k, spec in fields.items():
        spec = norm(spec)
        if k not in obj:
            if spec.get("required"): out.append("%s: missing required field %s" % (path, k))
            continue
        check(obj[k], spec, "%s.%s" % (path, k) if path else k, ctx, out)
    if not open_:
        for k in obj:
            if k not in fields and "." not in k:
                out.append("WARN %s: unknown field %s" % (path, k))


def ph_regex(pattern, table):
    if "<any>" in pattern:
        return None
    rx = re.escape(pattern)
    rx = rx.replace(re.escape("<Place path>/"), r"(?:.+/)?")
    for k, v in table.items():
        rx = rx.replace(re.escape(k), v)
    return re.compile("^" + rx + "$")


# ---------------------------------------------------------------- main
def main(argv):
    if len(argv) < 2 or argv[1].startswith("-"):
        print(__doc__); return 2
    root, strict, quiet = argv[1], "--strict" in argv, "--quiet" in argv
    schemas = load_schemas(root)
    notes, names, state_ids = load_notes(root)

    extra = set()
    for rel, meta in notes.values():
        for ev in meta.get("events") or []:
            if isinstance(ev, dict) and "id" in ev: extra.add(ev["id"])
    for rel, sid in state_ids:
        if sid not in notes and ".population." not in sid:
            err("state file %s refers to unknown id %s" % (rel, sid))
    ctx = Ctx(notes, extra)
    instances = {i for i, (r, m) in notes.items() if m.get("kind") == "instance"}

    for i, (rel, meta) in sorted(notes.items(), key=lambda x: x[1][0]):
        kind = meta.get("kind")
        if kind is None:
            err("%s: no kind" % rel); continue
        s = schemas.get(kind)
        if not s:
            warn("%s: no schema for kind %s" % (rel, kind)); continue
        if kind == "template":
            continue
        probs = []
        check_fields(meta, s["_fields"], "", ctx, probs, s.get("open", False))
        # id pattern
        pats = [ph_regex(p, ID_PH) for p in as_list(s.get("id"))]
        pats = [p for p in pats if p]
        if pats and not any(p.match(str(i)) for p in pats):
            probs.append("id %s does not match %s" % (i, " or ".join(as_list(s.get("id")))))
        # folder pattern
        fpats = [ph_regex(p, FOLDER_PH) for p in as_list(s.get("folder"))]
        fpats = [p for p in fpats if p]
        if fpats and not any(p.match(rel) for p in fpats):
            probs.append("file is at %s, expected %s" % (rel, " or ".join(as_list(s.get("folder")))))
        # universe agrees with id
        u = meta.get("universe")
        if u and isinstance(i, str):
            head = i.split(".")[0]
            if head != u and not (head in instances and notes[head][1].get("universe") == u):
                probs.append("universe is %s but id starts with %s" % (u, head))
        # kind-specific
        if kind == "table":
            check_table(meta, probs)
        if kind == "room":
            for n, e in enumerate(meta.get("exits") or []):
                if isinstance(e, dict) and e.get("to") not in ("outside", None) and not ctx.ref_ok(e["to"]):
                    probs.append("exits[%d].to: unknown room %s" % (n, e["to"]))
            for n, en in enumerate(meta.get("encounters") or []):
                for m_, mo in enumerate((en or {}).get("monsters") or []):
                    if isinstance(mo, dict) and not mo.get("ref") and not mo.get("name"):
                        probs.append("encounters[%d].monsters[%d]: needs a ref or a name" % (n, m_))
                    if isinstance(mo, dict) and not mo.get("ref") and not isinstance(mo.get("hp"), int):
                        probs.append("encounters[%d].monsters[%d]: inline monster needs hp" % (n, m_))
        for p in probs:
            (warn if p.startswith("WARN ") else err)("%s: %s" % (rel, p.replace("WARN ", "")))

    # parent chains
    for i, (rel, meta) in notes.items():
        seen, cur = set(), i
        while cur and cur != "omniverse":
            if cur in seen: err("parent loop at " + cur); break
            seen.add(cur)
            if cur not in notes: break
            cur = notes[cur][1].get("parent")
        if meta.get("parent") is None and i != "omniverse":
            err("%s has no parent" % rel)

    # folder follows the parent chain for the space tree
    for i, (rel, meta) in notes.items():
        if meta.get("kind") in PLACE_KINDS:
            parent = notes.get(meta.get("parent"))
            if not parent: continue
            d = os.path.dirname(rel)
            pdir = os.path.dirname(parent[0])
            if os.path.dirname(d) != pdir:
                err("folder/parent mismatch: %s sits in %s but parent %s is in %s" % (rel, os.path.dirname(d), meta["parent"], pdir))
        if meta.get("kind") in ("person", "district", "household", "venue") and "/Instances/" not in rel:
            parent = notes.get(meta.get("parent"))
            if parent and parent[1].get("kind") in PLACE_KINDS + ["district", "household"] and not rel.startswith(os.path.dirname(parent[0]) + "/"):
                err("folder/parent mismatch: %s is not under %s" % (rel, os.path.dirname(parent[0])))

    # dungeon codes unique
    codes = {}
    for i, (rel, meta) in notes.items():
        if meta.get("kind") == "dungeon" and meta.get("code"):
            if meta["code"] in codes: err("dungeon code %s used by %s and %s" % (meta["code"], codes[meta["code"]], i))
            codes[meta["code"]] = i

    # wikilinks
    link = re.compile(r"\[\[([^\]|#]+)(?:#[^\]|]*)?(?:\|[^\]]*)?\]\]")
    longest = 0
    for dp, dn, fn in os.walk(root):
        dn[:] = [d for d in dn if d not in SKIP_DIRS or d == "_generated"]
        for f in fn:
            rel = os.path.relpath(os.path.join(dp, f), root).replace(os.sep, "/")
            full = ROOT_PREFIX + "\\" + rel.replace("/", "\\")
            longest = max(longest, len(full))
            if len(full) > 200: warn("long path (%d chars): %s" % (len(full), f))
            if not f.endswith(".md") or rel.startswith("Apps/"): continue
            txt = open(os.path.join(dp, f), encoding="utf-8").read()
            for t in link.findall(txt):
                t = t.strip().replace("\\", "")
                if "/" in t or "." in t.rsplit("/", 1)[-1]:
                    cand = t if os.path.splitext(t)[1] else t + ".md"
                    if not os.path.isfile(os.path.join(root, cand)) and not os.path.isfile(os.path.join(dp, cand)):
                        err("%s: broken wikilink [[%s]]" % (rel, t))
                    continue
                if t and t not in names:
                    err("%s: broken wikilink [[%s]]" % (rel, t))

    kinds = {}
    for rel, meta in notes.values():
        kinds[meta.get("kind")] = kinds.get(meta.get("kind"), 0) + 1
    print("notes: %d  kinds: %d  schemas: %d  longest Windows path: %d chars" % (len(notes), len(kinds), len(schemas), longest))
    if not quiet:
        print("  " + ", ".join("%s %d" % (k, v) for k, v in sorted(kinds.items(), key=lambda x: -x[1])))
    for w in warns: print("WARN ", w)
    for e in errors: print("ERROR", e)
    bad = len(errors) + (len(warns) if strict else 0)
    print("RESULT:", "OK" if not bad else "%d problems" % bad, "(%d errors, %d warnings)" % (len(errors), len(warns)))
    return 1 if bad else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
