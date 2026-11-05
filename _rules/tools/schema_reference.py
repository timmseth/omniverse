#!/usr/bin/env python3
"""Generate docs/reference/Schema Reference.md from _rules/schemas/ (and module _schemas/).
Usage: python3 _rules/tools/schema_reference.py <repo root>
"""
import os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import validate as V

GROUPS = [
    ("Structure", ["omniverse", "multiverse", "universe", "module", "ruleset"]),
    ("Places", ["plane", "galaxy", "star_system", "planet", "continent", "region", "country", "province", "settlement", "district", "venue", "household"]),
    ("People and powers", ["person", "faction", "deity", "culture", "language"]),
    ("Time", ["calendar", "holiday", "era", "event"]),
    ("Story", ["trope", "trope_instance", "quest", "lore", "table"]),
    ("Adventure sites", ["dungeon", "room", "monster", "item"]),
    ("Play", ["instance", "campaign", "session"]),
    ("Meta", ["index", "guide", "template", "generated"]),
]


def typestr(spec):
    spec = V.norm(spec)
    t = spec.get("type", "any")
    if t == "list":
        return "list of " + typestr(spec.get("of", "any"))
    if t == "ref":
        k = spec.get("kinds")
        return "ref to " + ("/".join(k) if k else "any note")
    if t == "enum":
        return "one of: " + ", ".join("`%s`" % v for v in spec.get("values", []))
    if t == "const":
        return "`%s`" % spec.get("value")
    if t == "map":
        return "map"
    return t


def fields_table(fields, indent=""):
    lines = ["| Field | Type | Required | Notes |", "|---|---|---|---|"]
    for k, spec in fields.items():
        spec = V.norm(spec)
        req = "yes" if spec.get("required") else ""
        notes = spec.get("doc", "") or ""
        if spec.get("pattern"): notes += (" " if notes else "") + "Pattern `%s`." % spec["pattern"]
        if spec.get("nullable"): notes += (" " if notes else "") + "May be null."
        if spec.get("length"): notes += (" " if notes else "") + "Exactly %d items." % spec["length"]
        lines.append("| `%s%s` | %s | %s | %s |" % (indent, k, typestr(spec), req, notes.replace("|", "\\|")))
        sub = spec.get("fields") if spec.get("type") == "map" else (V.norm(spec.get("of")).get("fields") if spec.get("type") == "list" and V.norm(spec.get("of")).get("type") == "map" else None)
        if sub:
            for k2, s2 in sub.items():
                s2 = V.norm(s2)
                n2 = s2.get("doc", "") or ""
                lines.append("| `%s%s.%s` | %s | %s | %s |" % (indent, k, k2, typestr(s2), "yes" if s2.get("required") else "", n2.replace("|", "\\|")))
    return "\n".join(lines)


def main(root):
    schemas = V.load_schemas(root)
    out = ["---", "kind: generated", "generated: schema_reference.py", "---", "# Schema Reference", "",
           "*Generated from `_rules/schemas/`. Do not edit; change the schema and rerun `python3 _rules/tools/schema_reference.py .`*", "",
           "Every note is a Markdown file with YAML frontmatter. Its `kind` picks the schema below. "
           "The validator (`_rules/tools/validate.py`) enforces these; CI runs it on every pull request.", "",
           "**Types.** `string`, `text` (multi-line), `int`, `number`, `bool`, `any`, `id` (the note's own id), "
           "`ref` (another note's id), `when` (`primordial`, `null`, or `{year, day, era}`), `dice` (`d6`, `2d8+1`), `list of …`, `map`.", "",
           "**Unknown fields** are warnings unless the key is namespaced (`dnd5e.initiative`), which a module's `_schemas/` may declare.", "",
           "## Kinds at a glance", "", "| Kind | What it is | Lives at | Id |", "|---|---|---|---|"]
    seen = set()
    for g, ks in GROUPS:
        for k in ks:
            if k in schemas:
                s = schemas[k]; seen.add(k)
                out.append("| [%s](#%s) | %s | `%s` | `%s` |" % (k, k.replace("_", "-"), (s.get("summary") or "").replace("|", "\\|"),
                           "`, `".join(V.as_list(s.get("folder"))), "`, `".join(str(x) for x in V.as_list(s.get("id")))))
    for k in sorted(schemas):
        if k not in seen:
            s = schemas[k]
            out.append("| [%s](#%s) | %s | `%s` | `%s` |" % (k, k.replace("_", "-"), (s.get("summary") or "").replace("|", "\\|"),
                       "`, `".join(V.as_list(s.get("folder"))), "`, `".join(str(x) for x in V.as_list(s.get("id")))))
    for g, ks in GROUPS + [("Other", sorted(k for k in schemas if k not in seen))]:
        ks = [k for k in ks if k in schemas]
        if not ks: continue
        out += ["", "## " + g]
        for k in ks:
            s = schemas[k]
            out += ["", "### " + k, "", "**%s.** %s" % (s.get("title", k), s.get("summary", "")), "",
                    "- Lives at: " + ", ".join("`%s`" % f for f in V.as_list(s.get("folder"))),
                    "- Id: " + ", ".join("`%s`" % i for i in V.as_list(s.get("id"))),
                    "- Mixins: " + (", ".join(s.get("mixins") or []) or "none"), "",
                    fields_table(s["_fields"])]
    os.makedirs(os.path.join(root, "docs", "reference"), exist_ok=True)
    p = os.path.join(root, "docs", "reference", "Schema Reference.md")
    open(p, "w", encoding="utf-8", newline="\n").write("\n".join(out) + "\n")
    print("wrote", os.path.relpath(p, root), "(%d kinds)" % len(schemas))


if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else ".")
