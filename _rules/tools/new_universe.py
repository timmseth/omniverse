#!/usr/bin/env python3
"""Scaffold a new universe (a Universe Join).

Usage:
  python3 _rules/tools/new_universe.py <Name> --tone "<tone>" --ruleset <ruleset id> --maintainer <handle>
         [--root <repo root>] [--planet <name>] [--year-days 360]

Writes Multiverse/<Name>/ with the manifest, calendar, first era, a minimal place tree
(plane, galaxy, star system, planet, continent) and index notes for every content folder,
and adds a row to Multiverse/_registry.md. Prints the CODEOWNERS line to add.
"""
import argparse, os, re, sys

MONTHS = ["First", "Second", "Third", "Fourth", "Fifth", "Sixth", "Seventh", "Eighth", "Ninth", "Tenth", "Eleventh", "Twelfth"]


def slug(s):
    return re.sub(r"[^a-z0-9]+", "-", s.lower().replace("'", "")).strip("-")


def write(root, rel, text):
    p = os.path.join(root, rel)
    os.makedirs(os.path.dirname(p), exist_ok=True)
    with open(p, "w", encoding="utf-8", newline="\n") as f:
        f.write(text if text.endswith("\n") else text + "\n")


def main(argv):
    ap = argparse.ArgumentParser()
    ap.add_argument("name")
    ap.add_argument("--tone", required=True)
    ap.add_argument("--ruleset", required=True)
    ap.add_argument("--maintainer", required=True)
    ap.add_argument("--root", default=".")
    ap.add_argument("--planet", default=None)
    ap.add_argument("--year-days", type=int, default=360)
    ap.add_argument("--summary", default="")
    a = ap.parse_args(argv[1:])
    name, u, root = a.name, slug(a.name), os.path.abspath(a.root)
    U = "Multiverse/" + name
    if os.path.exists(os.path.join(root, U)):
        sys.exit("%s already exists" % U)
    planet = a.planet or name
    era = "The First Age"
    cal = "%s.calendar.standard" % u
    summary = a.summary or "A new universe. Replace this line with what it is."

    write(root, U + "/_universe.md", f"""---
id: {u}
kind: universe
name: {name}
parent: omniverse.multiverse
tone: {a.tone}
ruleset: {a.ruleset}
maintainers: [{a.maintainer}]
status: active
clock:
  calendar: {cal}
  epoch_omni_day: 0
version: 0.1.0
owner: {a.maintainer}
licence: Unlicense (public domain)
requires:
  omniverse-core: ">=0.6 <0.7"
rifts: []
summary: {summary}
from: primordial
to: null
---
# {name}

{summary}

- Ruleset: `{a.ruleset}`
- Calendar: [[{U}/Calendar|Calendar]]
- Current era: [[{era}]]
- Timeline: [[{U}/_timeline|Timeline]]

## Contains
- [[{U}/Material Plane/Material Plane|Material Plane]]
- {" · ".join("[[%s/%s/%s|%s]]" % (U, f, f, f) for f in ("Factions", "Bestiary", "Items", "Tables", "Quests", "Pantheon", "Lore"))}
""")
    write(root, U + "/Calendar.md", "---\nid: %s\nkind: calendar\nname: %s Calendar\nparent: %s\nuniverse: %s\nyear_length_days: %d\nmonths:\n%s\nweekdays: [Firstday, Secondday, Thirdday, Fourthday, Fifthday, Sixthday]\nyear_zero: The founding\nholidays: []\n---\n# %s Calendar\n\n%d days in %d months. Rename the months.\n" % (
        cal, name, u, u, a.year_days, "\n".join("  - { name: %s, days: %d }" % (m, a.year_days // 12) for m in MONTHS), name, a.year_days, 12))
    write(root, U + "/Eras/%s.md" % era, f"---\nid: {u}.era.{slug(era)}\nkind: era\nname: {era}\nparent: {u}\nuniverse: {u}\ncharacter: The present age.\nfrom: {{ year: 1 }}\nto: null\n---\n# {era}\n\nThe current era of {name}.\n")
    # place tree
    tree = [("plane", "Material Plane", u), ("galaxy", "The Galaxy", "%s.plane.material-plane" % u), ("star_system", "The Sun", "%s.galaxy.the-galaxy" % u),
            ("planet", planet, "%s.star_system.the-sun" % u), ("continent", "The Mainland", "%s.planet.%s" % (u, slug(planet)))]
    path = U
    for kind, nm, parent in tree:
        path = path + "/" + nm
        write(root, "%s/%s.md" % (path, nm), f"---\nid: {u}.{kind}.{slug(nm)}\nkind: {kind}\nname: {nm}\nparent: {parent}\nuniverse: {u}\nfrom: primordial\nto: null\n---\n# {nm}\n\nDescribe it.\n")
    for folder in ["Factions", "Bestiary", "Items", "Tables", "Quests", "Pantheon", "Lore", "Dungeons", "Holidays", "Trope Instances", "Instances", "Events"]:
        if folder in ("Dungeons", "Holidays", "Trope Instances", "Instances", "Events"):
            write(root, U + "/%s/.gitkeep" % folder, "")
        else:
            write(root, U + "/%s/%s.md" % (folder, folder), f"---\nid: {u}.{slug(folder)}-index\nkind: index\nname: {folder}\nparent: {u}\n---\n# {folder} of {name}\n\nNone yet.\n")
    # registry row
    reg = os.path.join(root, "Multiverse", "_registry.md")
    if os.path.exists(reg):
        s = open(reg, encoding="utf-8").read()
        row = "| [[%s/_universe\\|%s]] | %s | %s | %s | active |" % (U, name, a.maintainer, a.tone, a.ruleset.split(".")[-1])
        if row not in s:
            s = s.rstrip("\n") + "\n" + row + "\n"
            open(reg, "w", encoding="utf-8", newline="\n").write(s)
    print("created %s" % U)
    print("add to CODEOWNERS:  /%s/    @%s" % (U, a.maintainer))
    print("then: python3 _rules/tools/validate.py . --quiet")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
