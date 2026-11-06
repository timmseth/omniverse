#!/usr/bin/env python3
"""Build a static web site from the vault: one page per note, wikilinks resolved, frontmatter
shown as a table, indexes from world.json. Output goes to _site/ (gitignored); CI publishes it.

Usage: python3 _rules/tools/build_site.py <repo root> [--out _site] [--base /omniverse]
Requires: pip install markdown pyyaml
"""
import html, json, os, re, shutil, sys
from urllib.parse import quote
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import validate as V

try:
    import markdown
except ImportError:
    sys.exit("pip install markdown")

CSS = """
:root{--bg:#15131a;--panel:#201c28;--ink:#e8e2f0;--muted:#9a93a8;--accent:#e3a72f;--line:#35303f}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--ink);font:16px/1.55 Georgia,serif}
a{color:var(--accent);text-decoration:none}a:hover{text-decoration:underline}
header{position:sticky;top:0;background:var(--panel);border-bottom:1px solid var(--line);padding:10px 20px;display:flex;gap:18px;align-items:center;flex-wrap:wrap}
header b{color:var(--accent)}main{max-width:980px;margin:0 auto;padding:24px 20px 80px}
.crumbs{color:var(--muted);font-size:14px;margin-bottom:8px}.crumbs a{color:var(--muted)}
h1{margin:.2em 0 .4em;font-weight:normal}h2{border-bottom:1px solid var(--line);padding-bottom:4px;font-weight:normal;margin-top:1.6em}
blockquote{border-left:3px solid var(--accent);margin:1em 0;padding:.6em 1em;background:var(--panel);font-size:17px}
table{border-collapse:collapse;width:100%;font-size:15px;margin:.6em 0}td,th{border:1px solid var(--line);padding:5px 8px;vertical-align:top;text-align:left}th{background:var(--panel)}
code{background:var(--panel);padding:1px 5px;border-radius:4px;font-size:14px}pre{background:var(--panel);padding:12px;overflow:auto;border-radius:8px}
.meta{background:var(--panel);border:1px solid var(--line);border-radius:10px;padding:10px 14px;margin:0 0 20px;font-size:14px}
.meta summary{cursor:pointer;color:var(--muted)}.badge{display:inline-block;background:var(--panel);border:1px solid var(--line);border-radius:999px;padding:1px 10px;font-size:13px;margin:2px 4px 2px 0;color:var(--muted)}
.cols{columns:2;column-gap:30px}.cols li{break-inside:avoid}ul.plain{list-style:none;padding:0}
.refs{font-size:14px;color:var(--muted)}img,svg{max-width:100%}
"""


def page_path(rel):
    return re.sub(r"\.md$", ".html", rel)


def main(argv):
    root = os.path.abspath(argv[1] if len(argv) > 1 else ".")
    out = os.path.abspath(argv[argv.index("--out") + 1]) if "--out" in argv else os.path.join(root, "_site")
    base = argv[argv.index("--base") + 1].rstrip("/") if "--base" in argv else ""
    notes, names, _ = V.load_notes(root)
    world = json.load(open(os.path.join(root, "_generated", "world.json"), encoding="utf-8"))
    entries = {e["id"]: e for e in world["notes"]}
    byrel = {rel: (i, m) for i, (rel, m) in notes.items()}
    gen_md = [os.path.join("_generated", f) for f in os.listdir(os.path.join(root, "_generated")) if f.endswith(".md")]
    shutil.rmtree(out, ignore_errors=True)
    os.makedirs(out, exist_ok=True)
    open(os.path.join(out, "site.css"), "w", encoding="utf-8").write(CSS)
    wiz = os.path.join(root, "Apps", "wizard", "omniverse-wizard.html")
    if os.path.exists(wiz):  # the Note Wizard, with the world index beside it so references autocomplete
        shutil.copy(wiz, os.path.join(out, "wizard.html"))
        shutil.copy(os.path.join(root, "_generated", "world.json"), os.path.join(out, "world.json"))
    if os.path.isdir(os.path.join(root, "_generated", "Maps")):
        shutil.copytree(os.path.join(root, "_generated", "Maps"), os.path.join(out, "_generated", "Maps"), dirs_exist_ok=True)
    link = re.compile(r"!?\[\[([^\]|#]+)(?:#[^\]|]*)?(?:\|([^\]]*))?\]\]")

    def href(rel):
        return base + "/" + "/".join(quote(p) for p in page_path(rel).split("/"))

    def resolve(m):
        target, alias = m.group(1).strip().replace("\\", ""), m.group(2)
        embed = m.group(0).startswith("!")
        if embed and target.lower().endswith(".svg"):
            return '<img src="%s/_generated/%s" alt="%s">' % (base, quote(target), html.escape(target))
        rel = (target + ".md") if "/" in target else names.get(target)
        if rel and os.path.exists(os.path.join(root, rel)):
            return '<a href="%s">%s</a>' % (href(rel), html.escape(alias or os.path.basename(rel)[:-3]))
        return html.escape(alias or target)

    def crumbs(i):
        chain, cur, seen = [], i, set()
        while cur in notes and cur not in seen:
            seen.add(cur); rel, m = notes[cur]
            chain.append('<a href="%s">%s</a>' % (href(rel), html.escape(m.get("name") or cur)))
            cur = m.get("parent")
        return " &rsaquo; ".join(reversed(chain[1:]))

    def render(rel, meta, body, i=None):
        body = link.sub(resolve, body)
        content = markdown.markdown(body, extensions=["tables", "fenced_code"])
        title = (meta or {}).get("name") or os.path.basename(rel)[:-3]
        head = '<div class="crumbs">%s</div>' % crumbs(i) if i else ""
        metatbl = ""
        if meta:
            rows = []
            for k, v in meta.items():
                if k in ("id", "kind", "name", "parent"): continue
                if isinstance(v, (dict, list)):
                    v = html.escape(json.dumps(v, ensure_ascii=False, default=str))
                else:
                    v = html.escape(str(v))
                    if v in notes: v = '<a href="%s">%s</a>' % (href(notes[v][0]), html.escape(notes[v][1].get("name") or v))
                rows.append("<tr><th>%s</th><td>%s</td></tr>" % (html.escape(k), v))
            metatbl = '<details class="meta"><summary>%s · <code>%s</code></summary><table>%s</table></details>' % (html.escape(meta.get("kind", "")), html.escape(str(meta.get("id", ""))), "".join(rows))
        refs = ""
        e = entries.get(i) if i else None
        if e and e.get("referencedBy"):
            refs = '<h2>Referenced by</h2><ul class="plain refs">%s</ul>' % "".join('<li><a href="%s">%s</a> <span class="badge">%s</span></li>' % (href(entries[r]["path"]), html.escape(entries[r]["name"] or r), entries[r]["kind"]) for r in e["referencedBy"] if r in entries)
        return '<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>%s · Omniverse</title><link rel="stylesheet" href="%s/site.css"></head><body><header><b><a href="%s/">Omniverse</a></b><a href="%s/index.html#universes">Universes</a><a href="%s/_generated/Dungeon%%20Index.html">Dungeons</a><a href="%s/_generated/World%%20Index.html">Everything</a><a href="%s/README.html">Design</a><a href="%s/wizard.html">Wizard</a><a href="https://github.com/timmseth/omniverse">GitHub</a></header><main>%s<h1>%s</h1>%s%s%s</main></body></html>' % (
            html.escape(title), base, base, base, base, base, base, base, head, html.escape(title), metatbl, content, refs)

    count = 0
    for i, (rel, meta) in notes.items():
        src = open(os.path.join(root, rel), encoding="utf-8").read()
        m = re.match(r"^---\r?\n(.*?)\r?\n---\r?\n", src, re.S)
        body = src[m.end():] if m else src
        p = os.path.join(out, page_path(rel)); os.makedirs(os.path.dirname(p), exist_ok=True)
        open(p, "w", encoding="utf-8").write(render(rel, meta, body, i)); count += 1
    for rel in gen_md + ["README.md", "CONTRIBUTING.md", "LICENSING.md"] + [os.path.join(dp, f).replace(root + os.sep, "").replace(os.sep, "/") for dp, dn, fn in os.walk(os.path.join(root, "docs")) for f in fn if f.endswith(".md")]:
        if not os.path.exists(os.path.join(root, rel)): continue
        src = open(os.path.join(root, rel), encoding="utf-8").read()
        m = re.match(r"^---\r?\n(.*?)\r?\n---\r?\n", src, re.S)
        body = src[m.end():] if m else src
        body = re.sub(r"\]\(([^)]+)\.md\)", lambda mm: "](" + mm.group(1) + ".html)", body)
        p = os.path.join(out, page_path(rel)); os.makedirs(os.path.dirname(p), exist_ok=True)
        open(p, "w", encoding="utf-8").write(render(rel, None, body)); count += 1
    # index
    unis = [e for e in world["notes"] if e["kind"] == "universe"]
    kinds = sorted(world["counts"].items(), key=lambda kv: -kv[1])
    idx = ["# The Omniverse", "", "A collaborative, modular, system-agnostic tabletop-RPG multiverse, kept as plain text and built by pull request. "
           "[How to contribute](CONTRIBUTING.html) · [Design document](README.html) · [Docs](docs/README.html) · [Licensing](LICENSING.html)", "", "## Universes {#universes}", ""]
    for u in unis:
        idx.append("- **[%s](%s)**: %s *(%s; ruleset %s; licence %s)*" % (u["name"], quote(page_path(u["path"])), u["summary"] or "", u["data"].get("tone", ""), (u["data"].get("ruleset") or "").split(".")[-1], u["data"].get("licence", "undeclared")))
    idx += ["", "## By kind", ""]
    for k, n in kinds:
        if k in ("room",): continue
        es = sorted((e for e in world["notes"] if e["kind"] == k), key=lambda e: e["name"] or "")
        idx.append("- **%s** (%d): %s" % (k, n, ", ".join("[%s](%s)" % (html.escape(e["name"] or e["id"]), quote(page_path(e["path"]))) for e in es[:40]) + (", …" if len(es) > 40 else "")))
    idx += ["", "Generated from the repository at build time. Maps: [Maps](_generated/Maps.html). Timeline: " + ", ".join("[%s](%s)" % (u["name"], quote(page_path(os.path.dirname(u["path"]) + "/_timeline.md"))) for u in unis) + "."]
    open(os.path.join(out, "index.html"), "w", encoding="utf-8").write(render("index.md", None, "\n".join(idx)))
    print("site: %d pages in %s" % (count + 1, out))


if __name__ == "__main__":
    main(sys.argv)
