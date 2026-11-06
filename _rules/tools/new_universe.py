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
    ap.add_argument("--licence", default="CC-BY-SA-4.0", choices=["CC-BY-SA-4.0", "CC-BY-4.0", "CC0-1.0", "Unlicense", "CC-BY-NC-4.0", "CC-BY-NC-SA-4.0", "CC-BY-3.0", "OGL-1.0a", "ORC-1.0", "other"], help="content licence for the universe (see LICENSING.md)")
    ap.add_argument("--licence-url", default="", help="link to the licence text; required with --licence other")
    a = ap.parse_args(argv[1:])
    name, u, root = a.name, slug(a.name), os.path.abspath(a.root)
    U = "Multiverse/" + name
    LIC = {
        "CC-BY-SA-4.0": ("Creative Commons Attribution-ShareAlike 4.0 International", "https://creativecommons.org/licenses/by-sa/4.0/", "You may copy, remix and build on this, even commercially, as long as you credit the source and release what you make from it under this same licence."),
        "CC-BY-4.0": ("Creative Commons Attribution 4.0 International", "https://creativecommons.org/licenses/by/4.0/", "You may copy, remix and build on this, even commercially, as long as you credit the source."),
        "CC-BY-3.0": ("Creative Commons Attribution 3.0 Unported", "https://creativecommons.org/licenses/by/3.0/", "You may copy, remix and build on this, even commercially, as long as you credit the source."),
        "CC-BY-NC-4.0": ("Creative Commons Attribution-NonCommercial 4.0 International", "https://creativecommons.org/licenses/by-nc/4.0/", "You may copy and remix this for non-commercial purposes if you credit the source."),
        "CC-BY-NC-SA-4.0": ("Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International", "https://creativecommons.org/licenses/by-nc-sa/4.0/", "You may copy and remix this for non-commercial purposes if you credit the source and keep the same licence."),
        "CC0-1.0": ("Creative Commons Zero 1.0 (public domain dedication)", "https://creativecommons.org/publicdomain/zero/1.0/", "No rights reserved. Do whatever you like with it; no credit required."),
        "Unlicense": ("The Unlicense (public domain)", "https://unlicense.org/", "No rights reserved. Do whatever you like with it; no credit required."),
        "OGL-1.0a": ("Open Game License v1.0a", "https://opengamingfoundation.org/ogl.html", "Open Game Content under the OGL; the Section 15 copyright notice must be reproduced."),
        "ORC-1.0": ("Open RPG Creative License 1.0", "https://paizo.com/orclicense", "Licensed Material under the ORC licence; the attribution notice must be reproduced."),
        "other": ("see licence_url", a.licence_url or "(no url given)", "Read the linked licence before reusing this content."),
    }
    if a.licence == "other" and not a.licence_url:
        print("--licence other needs --licence-url"); return 2
    lic_name, lic_url, lic_plain = LIC[a.licence]
    credit = "" if a.licence in ("Unlicense", "CC0-1.0") else "%s from the Omniverse (https://github.com/timmseth/omniverse), %s" % (name, a.licence.replace("-", " ", 2).replace("-", " "))
    lic_extra = ""
    if a.licence == "other": lic_extra += "licence_url: %s\n" % a.licence_url
    if credit: lic_extra += 'attribution: "%s"\n' % credit
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
licence: {a.licence}
{lic_extra}requires:
  omniverse-core: ">=0.6 <0.8"
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
    # stub timeline so the manifest's link resolves before the first build (build_timeline.py overwrites it)
    write(root, U + "/_timeline.md", "---\nkind: generated\ngenerated: build_timeline.py\nabout: %s\nas_of: { year: 1, day: 0 }\n---\n# %s timeline\n\nRun `python3 _rules/tools/build_all.py .` to fill this in.\n" % (u, name))
    # licence file (must agree with the manifest; the validator checks)
    lic_md = "# Licence: the %s universe\n\n**%s** \u2014 %s\n%s\n\n%s\n\n" % (name, a.licence, lic_name, lic_url, lic_plain)
    if credit: lic_md += "**Credit line to reproduce:** %s\n\n" % credit
    lic_md += ("Everything under this folder is covered: places, people, factions, monsters, items, tables, lore, dungeons, quests, and the campaign logs in `Instances/`. "
               "Contributions merged into this universe are released under this licence too.\n\n"
               "This folder is *content*, not the framework. The Omniverse framework (schemas, tools, docs, app) is separately released under the Unlicense; see `LICENSING.md` at the repository root for the map.\n")
    write(root, U + "/LICENSE.md", lic_md)
    # registry row
    reg = os.path.join(root, "Multiverse", "_registry.md")
    if os.path.exists(reg):
        s = open(reg, encoding="utf-8").read()
        row = "| [[%s/_universe\\|%s]] | %s | %s | %s | %s | active |" % (U, name, a.maintainer, a.tone, a.ruleset.split(".")[-1], a.licence)
        if row not in s:
            s = s.rstrip("\n") + "\n" + row + "\n"
            open(reg, "w", encoding="utf-8", newline="\n").write(s)
    print("created %s" % U)
    print("add to CODEOWNERS:  /%s/    @%s" % (U, a.maintainer))
    print("then: python3 _rules/tools/validate.py . --quiet")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
