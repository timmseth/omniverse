#!/usr/bin/env python3
"""Build the Note Wizard: one self-contained HTML page generated from the schemas.

The wizard lets anyone pick a kind of note, fill in its fields, and export a valid
Markdown + YAML file (copy, download, save into a repo folder, or zip several).
Its forms come from `_rules/schemas/`, so a schema change reaches the wizard on the
next build.

Usage: python3 _rules/tools/build_wizard.py <repo root>
Reads:  _rules/schemas/*.yaml, Apps/wizard/wizard.template.html
Writes: Apps/wizard/omniverse-wizard.html   (generated; do not edit by hand)
"""
import ast, glob, json, os, sys

import yaml

HIDDEN = {"generated", "guide", "index", "template", "omniverse", "multiverse", "module"}


def licences(root):
    """Read the LIC table from new_universe.py so the wizard writes the same LICENSE.md text."""
    src = open(os.path.join(root, "_rules", "tools", "new_universe.py"), encoding="utf-8").read()
    out = {}
    for node in ast.walk(ast.parse(src)):
        if isinstance(node, ast.Assign) and any(getattr(t, "id", "") == "LIC" for t in node.targets) and isinstance(node.value, ast.Dict):
            for k, v in zip(node.value.keys, node.value.values):
                if isinstance(k, ast.Constant) and isinstance(v, ast.Tuple) and all(isinstance(e, ast.Constant) for e in v.elts):
                    out[k.value] = [e.value for e in v.elts]
    return out


def main(argv):
    root = os.path.abspath(argv[1] if len(argv) > 1 else ".")
    sdir = os.path.join(root, "_rules", "schemas")
    tpl_path = os.path.join(root, "Apps", "wizard", "wizard.template.html")
    out_path = os.path.join(root, "Apps", "wizard", "omniverse-wizard.html")
    mixins = yaml.safe_load(open(os.path.join(sdir, "_mixins.yaml"), encoding="utf-8")) or {}
    kinds = {}
    for f in sorted(glob.glob(os.path.join(sdir, "*.yaml"))):
        if os.path.basename(f).startswith("_"):
            continue
        d = yaml.safe_load(open(f, encoding="utf-8"))
        if not isinstance(d, dict) or "kind" not in d or d["kind"] in HIDDEN:
            continue
        kinds[d["kind"]] = {
            "title": d.get("title", d["kind"]),
            "summary": d.get("summary", ""),
            "folder": d.get("folder"),
            "id": d.get("id"),
            "mixins": d.get("mixins") or [],
            "fields": d.get("fields") or {},
        }
    blob = json.dumps({"mixins": mixins, "kinds": kinds, "licences": licences(root)}, ensure_ascii=False, sort_keys=False)
    blob = blob.replace("</", "<\\/")  # keep the script block intact
    tpl = open(tpl_path, encoding="utf-8").read()
    if "__SCHEMA_JSON__" not in tpl:
        sys.exit("build_wizard: placeholder __SCHEMA_JSON__ missing from the template")
    html = tpl.replace("__SCHEMA_JSON__", blob)
    old = open(out_path, encoding="utf-8").read() if os.path.exists(out_path) else None
    if old != html:
        with open(out_path, "w", encoding="utf-8", newline="\n") as fh:
            fh.write(html)
    print("wrote Apps/wizard/omniverse-wizard.html (%d kinds, %d KB)" % (len(kinds), len(html) // 1024))


if __name__ == "__main__":
    main(sys.argv)
