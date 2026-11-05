#!/usr/bin/env python3
"""Run every generator in order: dungeons, world index, timeline, schema reference, app data.
Usage: python3 _rules/tools/build_all.py <repo root>
"""
import os, subprocess, sys

root = os.path.abspath(sys.argv[1] if len(sys.argv) > 1 else ".")
tools = os.path.join(root, "_rules", "tools")
steps = [
    ["build_dungeons.py", root],
    ["build_world.py", root],
    ["build_timeline.py", root],
    ["build_maps.py", root],
    ["schema_reference.py", root],
]
for s in steps:
    r = subprocess.run([sys.executable, os.path.join(tools, s[0])] + s[1:], cwd=root)
    if r.returncode:
        sys.exit("%s failed" % s[0])
sync = os.path.join(root, "Apps", "dmScreen", "tools", "sync_data.py")
if os.path.exists(sync):
    r = subprocess.run([sys.executable, sync, os.path.join(root, "_generated", "dungeons.json")], cwd=root)
    if r.returncode:
        sys.exit("sync_data.py failed")
print("build_all: done")
