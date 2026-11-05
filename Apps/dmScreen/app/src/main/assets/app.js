/* dmScreen: the DM screen for Omniverse dungeons. No dependencies. */
(function () {
  'use strict';

  var SYNC_URL = 'https://raw.githubusercontent.com/timmseth/omniverse/main/_generated/dungeons.json';
  var REPO_URL = 'https://github.com/timmseth/omniverse';
  var GUIDE_URL = REPO_URL + '/blob/main/_rules/Submitting%20a%20Dungeon.md';
  var bridge = (window.Android && typeof window.Android.loadState === 'function') ? window.Android : null;
  var VERSION = '1.0.0';
  try { if (bridge && bridge.version) VERSION = bridge.version(); } catch (e) { /* keep default */ }

  var DIRNAME = { n: 'North', s: 'South', e: 'East', w: 'West', ne: 'NE', nw: 'NW', se: 'SE', sw: 'SW', u: 'Up', d: 'Down', out: 'Out' };
  var DIRSHORT = { n: 'N', s: 'S', e: 'E', w: 'W', ne: 'NE', nw: 'NW', se: 'SE', sw: 'SW', u: 'UP', d: 'DN', out: 'OUT' };

  // ------------------------------------------------------------------ helpers
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function $(sel, root) { return (root || document).querySelector(sel); }
  function toast(msg) {
    var t = $('#toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toast._t);
    toast._t = setTimeout(function () { t.classList.remove('show'); }, 2200);
  }
  function now() {
    var d = new Date();
    return ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2);
  }
  function copyText(text) {
    try {
      if (bridge && bridge.copyText) { bridge.copyText(text); toast('Copied'); return; }
    } catch (e) { /* fall through */ }
    var ta = document.createElement('textarea');
    ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    var ok = false;
    try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
    document.body.removeChild(ta);
    toast(ok ? 'Copied' : 'Could not copy');
  }
  function openUrl(url) {
    try { if (bridge && bridge.openUrl) { bridge.openUrl(url); return; } } catch (e) { /* ignore */ }
    window.open(url, '_blank');
  }

  // ------------------------------------------------------------------ storage
  function rd(key) {
    try {
      if (bridge) return key === 'state' ? bridge.loadState() : bridge.loadData();
      return localStorage.getItem('dmscreen-' + key);
    } catch (e) { return null; }
  }
  function wr(key, val) {
    try {
      if (bridge) { if (key === 'state') bridge.saveState(val); else bridge.saveData(val); }
      else localStorage.setItem('dmscreen-' + key, val);
    } catch (e) { /* storage full or unavailable */ }
  }
  var store = (function () {
    try { var s = JSON.parse(rd('state') || 'null'); if (s && s.v === 1) return s; } catch (e) { /* ignore */ }
    return { v: 1, runs: {}, party: [], syncedAt: null, big: false };
  })();
  var saveT = null;
  function save() { clearTimeout(saveT); saveT = setTimeout(function () { wr('state', JSON.stringify(store)); }, 150); }

  // ------------------------------------------------------------------ data
  var data = { dungeons: [] };
  var syncInfo = { count: 0, source: 'bundled' };
  function validData(d) { return d && d.schema === 1 && Array.isArray(d.dungeons); }
  function loadData() {
    var out = {}, order = [];
    var bundled = window.BUNDLED_DUNGEONS;
    var synced = null;
    try { synced = JSON.parse(rd('data') || 'null'); } catch (e) { synced = null; }
    [bundled, synced].forEach(function (src, i) {
      if (!validData(src)) return;
      src.dungeons.forEach(function (d) {
        if (!out[d.id]) order.push(d.id);
        out[d.id] = d;
      });
      if (i === 1) syncInfo.source = 'synced';
    });
    data.dungeons = order.map(function (id) { return out[id]; });
    data.dungeons.forEach(index);
    syncInfo.count = data.dungeons.length;
  }
  function index(d) {
    d._byId = {}; d._byNum = {}; d._floors = {};
    d.rooms.forEach(function (r) {
      d._byId[r.id] = r; d._byNum[r.number] = r;
      (d._floors[r.floor] = d._floors[r.floor] || []).push(r);
    });
  }
  function dungeonBy(code) {
    for (var i = 0; i < data.dungeons.length; i++) {
      var d = data.dungeons[i];
      if (d.code === code || d.id === code) return d;
    }
    return null;
  }

  // ------------------------------------------------------------------ run state
  function newRun(d) {
    var r = { cur: d.entry, visited: {}, cleared: {}, ex: {}, hp: {}, tr: {}, pz: {}, sc: {}, lt: {}, notes: {}, log: [], rnotes: '', fl: d._byId[d.entry] ? d._byId[d.entry].floor : 0 };
    r.visited[d.entry] = 1;
    return r;
  }
  // run(d) creates and stores a run (use when changing something);
  // runView(d) only reads, so browsing a dungeon never starts a run.
  function run(d) { return store.runs[d.id] || (store.runs[d.id] = newRun(d)); }
  function runView(d) { return store.runs[d.id] || newRun(d); }
  function logit(d, msg) {
    var r = store.runs[d.id];
    if (!r) return;
    r.log.unshift(now() + '  ' + msg);
    if (r.log.length > 200) r.log.length = 200;
  }
  function exitState(r, room, e) {
    var o = r.ex[room.id + '|' + e.dir];
    return o || e.state || 'open';
  }
  function progress(d) {
    var r = store.runs[d.id];
    if (!r) return 0;
    var n = 0; for (var k in r.visited) if (r.visited[k]) n++;
    return Math.round(100 * n / d.rooms.length);
  }

  // ------------------------------------------------------------------ routing
  var route = { name: 'library' };
  function parseHash() {
    var h = (location.hash || '#/').replace(/^#\/?/, '');
    var p = h.split('/').filter(Boolean);
    if (!p.length) return { name: 'library' };
    if (p[0] === 'submit') return { name: 'submit' };
    if (p[0] === 'about') return { name: 'about' };
    if (p[0] === 'd' && p[1]) {
      var d = dungeonBy(decodeURIComponent(p[1]));
      if (!d) return { name: 'library' };
      var tab = p[2] || 'overview';
      if (tab === 'room') return { name: 'room', d: d, num: p[3] ? parseInt(p[3], 10) : null };
      return { name: tab, d: d };
    }
    return { name: 'library' };
  }
  function go(h) { if (location.hash === h) render(); else location.hash = h; }

  // ------------------------------------------------------------------ views
  var filters = { q: '', band: 'all' };
  var ui = { fl: {}, diceMode: 'n', diceMod: 0, diceLast: null, diceHist: [], sol: {}, confirm: null };

  function header(title, sub, back) {
    return '<div class="top">' + (back ? '<button class="back" data-act="back" aria-label="Back">&#8592;</button>' : '') +
      '<div class="grow"><div class="title">' + esc(title) + '</div>' + (sub ? '<div class="sub">' + esc(sub) + '</div>' : '') + '</div></div>';
  }
  function tabs(d, active) {
    var items = [['overview', '☰', 'Overview'], ['room', '❖', 'Room'], ['map', '▦', 'Map'], ['rooms', '≡', 'Rooms'], ['tools', '⚄', 'Tools']];
    return '<div class="tabs">' + items.map(function (t) {
      return '<button class="' + (t[0] === active ? 'on' : '') + '" data-act="tab" data-t="' + t[0] + '"><span class="ico">' + t[1] + '</span>' + t[2] + '</button>';
    }).join('') + '</div>';
  }
  function bandOf(d) {
    var lo = d.levelRange[0];
    return lo <= 3 ? '1-3' : lo <= 6 ? '4-6' : lo <= 9 ? '7-9' : '10+';
  }

  function viewLibrary() {
    var bands = ['all', '1-3', '4-6', '7-9', '10+'];
    var html = header('dmScreen', data.dungeons.length + ' dungeons · ' + (syncInfo.source === 'synced' ? 'synced' : 'bundled'), false);
    html += '<div class="search"><input id="q" type="search" placeholder="Search dungeons, places, tags" value="' + esc(filters.q) + '"></div>';
    html += '<div class="chips">' + bands.map(function (b) {
      return '<button class="chip ' + (filters.band === b ? 'on' : '') + '" data-act="band" data-b="' + b + '">' + (b === 'all' ? 'All levels' : 'Lv ' + b) + '</button>';
    }).join('') + '</div>';
    html += '<div id="list">' + libraryList() + '</div>';
    html += '<div class="card"><div class="row"><button class="grow" data-act="sync">Sync from GitHub</button><button class="grow" data-act="nav" data-h="#/submit">Submit a dungeon</button></div>' +
      '<div class="small muted" style="margin-top:8px">' + (store.syncedAt ? 'Last synced ' + esc(store.syncedAt) : 'Not synced yet. Showing the dungeons bundled with this version.') +
      ' <a href="#/about" style="margin-left:6px">About</a></div></div>';
    return html;
  }
  function libraryList() {
    var q = filters.q.trim().toLowerCase();
    var list = data.dungeons.filter(function (d) {
      if (filters.band !== 'all' && bandOf(d) !== filters.band) return false;
      if (!q) return true;
      var hay = [d.name, d.tone, d.place.path.join(' '), (d.tags || []).join(' '), d.summary].join(' ').toLowerCase();
      return hay.indexOf(q) >= 0;
    }).sort(function (a, b) { return a.levelRange[0] - b.levelRange[0] || a.name.localeCompare(b.name); });
    if (!list.length) return '<div class="card muted">No dungeons match.</div>';
    return list.map(function (d) {
      var pr = progress(d);
      return '<div class="card link" data-act="open" data-c="' + esc(d.code || d.id) + '">' +
        '<div class="head"><h3>' + esc(d.name) + '</h3><span class="badge lvl">Lv ' + d.levelRange[0] + '–' + d.levelRange[1] + '</span></div>' +
        '<div class="small muted">' + esc(d.place.path.slice(-3).join(' › ')) + ' · ' + d.rooms.length + ' rooms</div>' +
        '<p class="small">' + esc(d.summary) + '</p>' +
        '<div>' + (d.tags || []).slice(0, 5).map(function (t) { return '<span class="badge">' + esc(t) + '</span>'; }).join('') + '</div>' +
        (pr ? '<div class="progress"><i style="width:' + pr + '%"></i></div>' : '') + '</div>';
    }).join('');
  }

  function viewOverview(d) {
    var r = store.runs[d.id];
    var html = header(d.name, d.place.path.slice(-3).join(' › ') + ' · Lv ' + d.levelRange[0] + '–' + d.levelRange[1], true);
    html += '<div class="card"><div>' + (d.tags || []).map(function (t) { return '<span class="badge">' + esc(t) + '</span>'; }).join('') +
      '<span class="badge info">' + esc(d.tone) + '</span><span class="badge">' + esc(d.status || '') + '</span></div>' +
      '<p>' + esc(d.summary) + '</p>' +
      '<div class="small muted">By ' + esc(d.author || 'unknown') + ' · ' + esc(d.universe || '') + ' · ' + d.rooms.length + ' rooms</div></div>';
    html += '<div class="card"><div class="row">' +
      (r ? '<button class="primary grow" data-act="tab" data-t="room">Resume at ' + esc(d._byId[r.cur] ? d._byId[r.cur].code : '') + '</button>' : '<button class="primary grow" data-act="start">Start run</button>') +
      (r ? (ui.confirm === 'reset' ? '<button class="danger" data-act="reset">Tap again to reset</button>' : '<button class="ghost" data-act="reset">Reset run</button>') : '') +
      '</div></div>';
    html += '<div class="sect"><h4>Hooks</h4><ul>' + (d.hooks || []).map(function (h) { return '<li>' + esc(h) + '</li>'; }).join('') + '</ul></div>';
    html += '<div class="sect"><h4>Rumours</h4><ul>' + (d.rumours || []).map(function (h) { return '<li>' + esc(h) + '</li>'; }).join('') + '</ul></div>';
    var w = d.wandering || {};
    if (w.entries && w.entries.length) {
      html += '<div class="sect"><h4>Wandering encounters (' + esc(w.die || 'd6') + ')</h4><ul>' +
        w.entries.map(function (e) { return '<li>' + esc(e) + '</li>'; }).join('') + '</ul>' +
        '<button class="sm" data-act="wander">Roll wandering encounter</button></div>';
    }
    if ((d.tropes || []).length) {
      html += '<div class="sect"><h4>Tropes</h4>' + d.tropes.map(function (t) { return '<span class="badge info">' + esc(t) + '</span>'; }).join('') + '</div>';
    }
    return html + tabs(d, 'overview');
  }

  function roomBadges(d, rm) {
    var r = store.runs[d.id];
    var b = '';
    if (!r) return b;
    if (r.cur === rm.id) b += '<span class="badge lvl">party here</span>';
    if (r.visited[rm.id]) b += '<span class="badge">visited</span>';
    if (r.cleared[rm.id]) b += '<span class="badge ok">cleared</span>';
    return b;
  }

  function viewRoom(d, num) {
    var r = runView(d);
    var rm = num != null ? d._byNum[num] : d._byId[r.cur];
    if (!rm) rm = d._byId[d.entry];
    var isCur = r.cur === rm.id;
    var html = header(rm.code + '  ' + rm.name, d.name, true);
    html += '<div class="card" style="margin-bottom:0"><div class="row tight">' +
      '<span class="badge">' + esc(rm.light || 'light ?') + '</span><span class="badge">' + esc(rm.size || '') + '</span><span class="badge">floor ' + rm.floor + '</span>' + roomBadges(d, rm) + '</div>' +
      '<div class="row" style="margin-top:8px">' +
      (isCur ? '' : '<button class="primary grow" data-act="move" data-r="' + esc(rm.id) + '">Move party here</button>') +
      '<button class="grow" data-act="vis" data-r="' + esc(rm.id) + '">' + (r.visited[rm.id] ? 'Unmark visited' : 'Mark visited') + '</button>' +
      '<button class="grow" data-act="clr" data-r="' + esc(rm.id) + '">' + (r.cleared[rm.id] ? 'Uncleared' : 'Mark cleared') + '</button></div></div>';

    html += '<div class="readaloud ' + (store.big ? 'big' : '') + '"><div class="lbl"><span>Read aloud</span><span class="row tight"><button class="sm" data-act="big">' + (store.big ? 'Smaller' : 'Larger') + '</button><button class="sm" data-act="copyra" data-r="' + esc(rm.id) + '">Copy</button></span></div>' + esc(rm.readAloud) + '</div>';

    // exits
    html += '<div class="sect"><h4>Exits</h4>';
    rm.exits.forEach(function (e) {
      var st = exitState(r, rm, e);
      var target = e.to === 'outside' ? null : d._byId[e.to];
      var blocked = (st === 'locked' || st === 'barred' || st === 'hidden' || st === 'stuck' || st === 'rubble');
      var cls = 'exit' + (st === 'locked' || st === 'barred' ? ' locked' : '') + (st === 'hidden' ? ' hidden' : '') + (e.to === 'outside' ? ' out' : '');
      html += '<div class="row tight" style="margin:6px 0"><button class="' + cls + ' grow" style="margin:0" data-act="exit" data-r="' + esc(rm.id) + '" data-d="' + e.dir + '">' +
        '<span class="dir">' + (DIRNAME[e.dir] || e.dir) + '</span><span class="what"><b>' + (target ? esc(target.code + ' ' + target.name) : 'Out of the dungeon') + '</b>' +
        '<span>' + esc(e.kind) + ' · ' + esc(st) + (e.note ? ' · ' + esc(e.note) : '') + '</span></span></button>' +
        (blocked || r.ex[rm.id + '|' + e.dir] ? '<button class="sm" data-act="unlock" data-r="' + esc(rm.id) + '" data-d="' + e.dir + '">' + (st === 'open' ? 'Relock' : 'Open') + '</button>' : '') +
        '</div>';
    });
    html += '</div>';

    if (rm.features.length) html += '<div class="sect"><h4>Features</h4><ul>' + rm.features.map(function (f) { return '<li>' + esc(f) + '</li>'; }).join('') + '</ul></div>';

    // encounters
    rm.encounters.forEach(function (en, ei) {
      html += '<div class="card" style="margin:12px 14px 0"><div class="head"><h3>⚔ ' + esc(en.name) + '</h3><button class="sm" data-act="enc-reset" data-r="' + esc(rm.id) + '" data-e="' + ei + '">Reset HP</button></div>';
      (en.monsters || []).forEach(function (mo, mi) {
        for (var i = 0; i < (mo.count || 1); i++) {
          var key = rm.id + '|' + ei + '.' + mi + '.' + i;
          var max = mo.hp || 1;
          var cur = r.hp[key] == null ? max : r.hp[key];
          var pct = Math.max(0, Math.min(100, Math.round(100 * cur / max)));
          html += '<div class="mon ' + (cur <= 0 ? 'dead' : '') + '"><div class="nm">' + esc(mo.name) + (mo.count > 1 ? ' #' + (i + 1) : '') +
            '<div class="hpbar"><i style="width:' + pct + '%;background:' + (pct < 35 ? 'var(--bad)' : pct < 70 ? 'var(--warn)' : 'var(--ok)') + '"></i></div>' +
            '<div class="small muted">AC ' + esc(mo.ac) + (mo.attack ? ' · ' + esc(mo.attack) : '') + '</div></div>' +
            '<button class="sm" data-act="hp" data-k="' + esc(key) + '" data-m="' + max + '" data-n="-5">−5</button>' +
            '<button class="sm" data-act="hp" data-k="' + esc(key) + '" data-m="' + max + '" data-n="-1">−1</button>' +
            '<div class="hp">' + cur + '/' + max + '</div>' +
            '<button class="sm" data-act="hp" data-k="' + esc(key) + '" data-m="' + max + '" data-n="1">+1</button></div>';
        }
      });
      if (en.tactics) html += '<div class="small" style="margin-top:6px">' + esc(en.tactics) + '</div>';
      html += '</div>';
    });

    // traps
    if (rm.traps.length) {
      html += '<div class="sect"><h4>Traps</h4>';
      rm.traps.forEach(function (t, ti) {
        var key = rm.id + '|' + ti, st = r.tr[key] || '';
        html += '<div class="card" style="margin:6px 0"><div class="head"><h3>' + esc(t.name) + '</h3><span class="badge ' + (st === 'disarmed' ? 'ok' : st === 'triggered' ? 'bad' : st === 'found' ? 'warn' : '') + '">' + (st || 'unknown') + '</span></div>' +
          '<div class="small"><b>Trigger:</b> ' + esc(t.trigger) + '<br><b>Effect:</b> ' + esc(t.effect) + '<br><b>Detect DC</b> ' + esc(t.detect_dc) + ' · <b>Disarm DC</b> ' + esc(t.disarm_dc) + '</div>' +
          '<div class="row tight" style="margin-top:6px">' + ['found', 'disarmed', 'triggered'].map(function (v) {
            return '<button class="sm ' + (st === v ? 'primary' : '') + '" data-act="trap" data-k="' + esc(key) + '" data-v="' + v + '">' + v + '</button>';
          }).join('') + '</div></div>';
      });
      html += '</div>';
    }

    // puzzles
    if (rm.puzzles.length) {
      html += '<div class="sect"><h4>Puzzles</h4>';
      rm.puzzles.forEach(function (p, pi) {
        var key = rm.id + '|' + pi, st = r.pz[key] || { h: 0, solved: false };
        var showSol = ui.sol[key];
        html += '<div class="card" style="margin:6px 0"><div class="head"><h3>' + esc(p.name) + '</h3>' + (st.solved ? '<span class="badge ok">solved</span>' : '') + '</div>' +
          '<p class="small">' + esc(p.description) + '</p>';
        for (var h = 0; h < st.h && h < (p.hints || []).length; h++) html += '<div class="hint">Hint ' + (h + 1) + ': ' + esc(p.hints[h]) + '</div>';
        if (showSol) html += '<div class="solution"><b>Solution:</b> ' + esc(p.solution) + (p.reward ? '<br><b>Reward:</b> ' + esc(p.reward) : '') + '</div>';
        html += '<div class="row tight">' +
          ((p.hints || []).length > st.h ? '<button class="sm" data-act="hint" data-k="' + esc(key) + '">Reveal hint ' + (st.h + 1) + '</button>' : '') +
          '<button class="sm" data-act="sol" data-k="' + esc(key) + '">' + (showSol ? 'Hide solution' : 'Show solution') + '</button>' +
          '<button class="sm ' + (st.solved ? 'primary' : '') + '" data-act="solved" data-k="' + esc(key) + '">' + (st.solved ? 'Solved' : 'Mark solved') + '</button></div></div>';
      });
      html += '</div>';
    }

    // secrets and loot
    if (rm.secrets.length) {
      html += '<div class="sect"><h4>Secrets</h4>' + rm.secrets.map(function (s, si) {
        var key = rm.id + '|' + si, on = r.sc[key];
        return '<div class="check ' + (on ? 'done' : '') + '" data-act="tog" data-g="sc" data-k="' + esc(key) + '"><b class="bx">' + (on ? '☑' : '☐') + '</b><span>' + esc(s.description) + ' <span class="badge">DC ' + esc(s.dc) + '</span></span></div>';
      }).join('') + '</div>';
    }
    if (rm.loot.length) {
      html += '<div class="sect"><h4>Loot</h4>' + rm.loot.map(function (l, li) {
        var key = rm.id + '|' + li, on = r.lt[key];
        return '<div class="check ' + (on ? 'done' : '') + '" data-act="tog" data-g="lt" data-k="' + esc(key) + '"><b class="bx">' + (on ? '☑' : '☐') + '</b><span>' + esc(l) + '</span></div>';
      }).join('') + '</div>';
    }
    if (rm.dmNotes) html += '<div class="sect"><h4>DM notes</h4><div class="dm">' + esc(rm.dmNotes) + '</div></div>';
    html += '<div class="sect"><h4>Your notes</h4><textarea id="rnote" data-r="' + esc(rm.id) + '" placeholder="Notes for this room">' + esc(r.notes[rm.id] || '') + '</textarea></div>';
    return html + tabs(d, 'room');
  }

  function viewRooms(d) {
    var r = runView(d);
    var html = header('Rooms', d.name, true);
    var floors = Object.keys(d._floors).map(Number).sort(function (a, b) { return b - a; });
    floors.forEach(function (f) {
      html += '<div class="sect"><h4>Floor ' + (f > 0 ? '+' + f : f) + '</h4></div>';
      d._floors[f].slice().sort(function (a, b) { return a.number - b.number; }).forEach(function (rm) {
        var flags = '';
        if (rm.encounters.length) flags += '<span class="badge bad">⚔ ' + rm.encounters.length + '</span>';
        if (rm.traps.length) flags += '<span class="badge warn">trap ' + rm.traps.length + '</span>';
        if (rm.puzzles.length) flags += '<span class="badge info">puzzle ' + rm.puzzles.length + '</span>';
        if (rm.secrets.length) flags += '<span class="badge">secret ' + rm.secrets.length + '</span>';
        if (rm.loot.length) flags += '<span class="badge ok">loot</span>';
        html += '<div class="card link" style="margin:6px 14px" data-act="peek" data-n="' + rm.number + '"><div class="head"><h3>' + esc(rm.code) + '  ' + esc(rm.name) + '</h3><span>' + roomBadges(d, rm) + '</span></div><div>' + flags + '</div></div>';
      });
    });
    return html + tabs(d, 'rooms');
  }

  // ------------------------------------------------------------------ map
  var MARK = { locked: ['L', '#d9534f'], barred: ['B', '#d9534f'], stuck: ['S', '#e08a3c'], trapped: ['T', '#e08a3c'], hidden: ['H', '#5b9bd5'], rubble: ['R', '#e08a3c'], closed: ['c', '#a59fb0'] };
  function viewMap(d) {
    var r = runView(d);
    var floors = Object.keys(d._floors).map(Number).sort(function (a, b) { return b - a; });
    var cur = d._byId[r.cur];
    var pick = ui.fl[d.id];
    var f = (pick != null && d._floors[pick]) ? pick : ((r.fl != null && d._floors[r.fl]) ? r.fl : (cur ? cur.floor : 0));
    if (!d._floors[f]) f = floors[0];
    var rs = d._floors[f];
    var minx = 99, miny = 99, maxx = -99, maxy = -99;
    rs.forEach(function (rm) { minx = Math.min(minx, rm.pos[0]); maxx = Math.max(maxx, rm.pos[0]); miny = Math.min(miny, rm.pos[1]); maxy = Math.max(maxy, rm.pos[1]); });
    var CW = 128, CH = 92, NW = 100, NH = 58, M = 24;
    var W = (maxx - minx + 1) * CW + M * 2 - (CW - NW), H = (maxy - miny + 1) * CH + M * 2 - (CH - NH);
    function cx(rm) { return M + (rm.pos[0] - minx) * CW + NW / 2; }
    function cy(rm) { return M + (rm.pos[1] - miny) * CH + NH / 2; }
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + W + '" height="' + H + '" viewBox="0 0 ' + W + ' ' + H + '">';
    var drawn = {};
    rs.forEach(function (rm) {
      rm.exits.forEach(function (e) {
        if (e.to === 'outside') return;
        var t = d._byId[e.to];
        if (!t || t.floor !== rm.floor) return;
        var k = [rm.id, t.id].sort().join('~');
        if (drawn[k]) return; drawn[k] = 1;
        var st = exitState(r, rm, e);
        svg += '<line class="edge ' + (e.kind === 'secret' || st === 'hidden' ? 'secret' : '') + '" x1="' + cx(rm) + '" y1="' + cy(rm) + '" x2="' + cx(t) + '" y2="' + cy(t) + '"/>';
        if (MARK[st]) {
          var mx = (cx(rm) + cx(t)) / 2, my = (cy(rm) + cy(t)) / 2;
          svg += '<g class="mark"><circle cx="' + mx + '" cy="' + my + '" r="10" stroke="' + MARK[st][1] + '"/><text x="' + mx + '" y="' + (my + 4) + '" text-anchor="middle" font-size="12" font-weight="700" style="fill:' + MARK[st][1] + '">' + MARK[st][0] + '</text></g>';
        }
      });
    });
    rs.forEach(function (rm) {
      var cls = 'node' + (r.visited[rm.id] ? ' visited' : '') + (r.cleared[rm.id] ? ' cleared' : '') + (r.cur === rm.id ? ' cur' : '');
      var x = cx(rm) - NW / 2, y = cy(rm) - NH / 2;
      var nm = rm.name.length > 15 ? rm.name.slice(0, 14) + '…' : rm.name;
      var ups = rm.exits.filter(function (e) { return e.dir === 'u'; }).length, downs = rm.exits.filter(function (e) { return e.dir === 'd'; }).length, outs = rm.exits.filter(function (e) { return e.to === 'outside'; }).length;
      svg += '<g class="' + cls + '" data-act="peek" data-n="' + rm.number + '" style="cursor:pointer"><rect x="' + x + '" y="' + y + '" width="' + NW + '" height="' + NH + '" rx="10"/>' +
        '<text class="code" x="' + (x + 8) + '" y="' + (y + 18) + '"' + (r.cur === rm.id ? ' style="fill:#1b1405"' : '') + '>' + esc(rm.code) + '</text>' +
        '<text class="nm" x="' + (x + 8) + '" y="' + (y + 38) + '">' + esc(nm) + '</text>' +
        (ups ? '<text class="vert" x="' + (x + NW - 8) + '" y="' + (y + 16) + '" text-anchor="end">▲</text>' : '') +
        (downs ? '<text class="vert" x="' + (x + NW - 8) + '" y="' + (y + NH - 8) + '" text-anchor="end">▼</text>' : '') +
        (outs ? '<text class="vert" x="' + (x + 8) + '" y="' + (y + NH - 6) + '">EXIT</text>' : '') + '</g>';
    });
    svg += '</svg>';
    var html = header('Map', d.name, true);
    html += '<div class="chips">' + floors.map(function (fl) {
      return '<button class="chip ' + (fl === f ? 'on' : '') + '" data-act="floor" data-f="' + fl + '">Floor ' + (fl > 0 ? '+' + fl : fl) + '</button>';
    }).join('') + '</div>';
    html += '<div class="mapwrap">' + svg + '</div>';
    html += '<div class="legend"><span><span style="color:var(--accent)">■</span> party</span><span><span style="color:var(--ok)">■</span> cleared</span><span>▲▼ stairs</span><span>L locked</span><span>S stuck</span><span>H hidden</span><span>T trapped</span></div>';
    html += '<p class="small muted pad">Tap a room to look at it. Dashed lines are secret or hidden connections.</p>';
    return html + tabs(d, 'map');
  }

  // ------------------------------------------------------------------ tools
  function viewTools(d) {
    var r = runView(d);
    var html = header('Tools', d.name, true);
    html += '<div class="card"><h3>Dice</h3><div class="dice" style="margin-top:8px">' +
      [4, 6, 8, 10, 12, 20, 100].map(function (n) { return '<button data-act="roll" data-s="' + n + '">d' + n + '</button>'; }).join('') +
      '<button data-act="roll" data-s="20" data-adv="1">d20 adv</button></div>' +
      '<div class="row" style="margin-top:8px"><div class="stepper"><button class="sm" data-act="mod" data-n="-1">−</button><b>' + (ui.diceMod >= 0 ? '+' : '') + ui.diceMod + '</b><button class="sm" data-act="mod" data-n="1">+</button></div>' +
      '<button class="sm" data-act="roll" data-s="20" data-dis="1">d20 dis</button></div>' +
      (ui.diceLast ? '<div class="result">' + ui.diceLast.total + '<span class="nat muted">' + esc(ui.diceLast.text) + '</span></div>' : '<p class="muted small">Tap a die. The modifier applies to every roll.</p>') + '</div>';

    html += '<div class="card"><div class="head"><h3>Party</h3><button class="sm" data-act="padd">Add member</button></div>';
    if (!store.party.length) html += '<p class="muted small">Add your characters to track their HP at the table.</p>';
    store.party.forEach(function (p, i) {
      html += '<div class="mon ' + (p.hp <= 0 ? 'dead' : '') + '"><div class="nm"><input type="text" class="pname" data-i="' + i + '" value="' + esc(p.name) + '" style="min-height:36px;padding:6px 8px"></div>' +
        '<button class="sm" data-act="php" data-i="' + i + '" data-n="-5">−5</button><button class="sm" data-act="php" data-i="' + i + '" data-n="-1">−1</button>' +
        '<div class="hp">' + p.hp + '/' + p.max + '</div><button class="sm" data-act="php" data-i="' + i + '" data-n="1">+1</button><button class="sm" data-act="php" data-i="' + i + '" data-n="5">+5</button>' +
        '<button class="sm danger" data-act="pdel" data-i="' + i + '">✕</button></div>';
    });
    html += '</div>';

    html += '<div class="card"><h3>Run notes</h3><textarea id="runnote" placeholder="Notes for this run">' + esc(r.rnotes || '') + '</textarea></div>';
    html += '<div class="card"><div class="head"><h3>Run log</h3><button class="sm" data-act="copylog">Copy</button></div><div class="log">' +
      (r.log.length ? r.log.map(function (l) { return '<div>' + esc(l) + '</div>'; }).join('') : '<span class="muted">Nothing yet. Moves, rolls and results appear here.</span>') + '</div></div>';
    return html + tabs(d, 'tools');
  }

  function viewSubmit() {
    var html = header('Submit a dungeon', 'Share yours with every table', true);
    html += '<div class="card"><p>Dungeons live in the Omniverse repository and are added by pull request. Once merged, everyone gets them on their next Sync.</p><ol>' +
      '<li>Copy the templates below and write your rooms in a fork of the repository.</li>' +
      '<li>Check them: <code>python3 _rules/tools/build_dungeons.py . --check</code></li>' +
      '<li>Open a pull request titled <code>Dungeon: your name</code>. One dungeon per pull request.</li>' +
      '<li>The universe\'s maintainer reviews it. After the merge, tap Sync in the app.</li></ol>' +
      '<p class="small muted">Original writing or openly licensed material only. Data only: no scripts.</p>' +
      '<div class="row"><button class="primary grow" data-act="url" data-u="' + esc(GUIDE_URL) + '">Open the guide</button><button class="grow" data-act="url" data-u="' + esc(REPO_URL) + '">Open the repository</button></div></div>';
    html += '<div class="card"><h3>Templates</h3><p class="small muted">Paste these into new notes.</p><div class="row"><button class="grow" data-act="tpl" data-t="dungeon">Copy dungeon template</button><button class="grow" data-act="tpl" data-t="room">Copy room template</button></div></div>';
    return html;
  }

  function viewAbout() {
    var html = header('About', 'dmScreen v' + VERSION, true);
    html += '<div class="card"><p>dmScreen is the DM screen for the Omniverse: it reads the shared dungeon index and runs a dungeon room by room.</p>' +
      '<div class="kv"><span>App version</span><b>' + esc(VERSION) + '</b><span>Dungeons</span><b>' + syncInfo.count + '</b><span>Data</span><b>' + esc(syncInfo.source) + '</b><span>Last synced</span><b>' + esc(store.syncedAt || 'never') + '</b></div>' +
      '<p class="small muted">Source: ' + esc(SYNC_URL) + '</p>' +
      '<div class="row"><button class="grow" data-act="sync">Sync now</button><button class="grow" data-act="url" data-u="' + esc(REPO_URL) + '">Repository</button></div></div>';
    html += '<div class="card"><h3>Your data</h3><p class="small muted">Runs, party and notes are stored on this device only.</p>' +
      (ui.confirm === 'wipe' ? '<button class="danger" data-act="wipe">Tap again to erase all runs</button>' : '<button class="ghost danger" data-act="wipe">Erase all runs and notes</button>') + '</div>';
    return html;
  }

  var TPL = {
    dungeon: '---\nid: <universe>.dungeon.<slug>\nkind: dungeon\nname: <Dungeon Name>\ncode: <ABC>\nparent: <id of the place that contains it>\nuniverse: <universe>\nruleset: omniverse.ruleset.dnd5e\nlevel_range: [1, 3]\ntone: <short phrase>\ntags: [<tag>]\nentry: <universe>.room.<slug>.01-<room-slug>\ntropes_involved: [omniverse.trope.<slug>]\nauthor: <you>\nstatus: draft\nsummary: >-\n  Two or three evocative sentences.\nhooks:\n  - <a reason a party goes in>\nrumours:\n  - <what the tavern says>\nwandering:\n  die: d6\n  entries:\n    - "1: <what happens>"\n---\n',
    room: '---\nid: <universe>.room.<dungeon-slug>.<nn>-<room-slug>\nkind: room\nname: <Room Name>\nnumber: <n>\ncode: <CODE>-<nn>\nparent: <universe>.dungeon.<dungeon-slug>\ndungeon: <universe>.dungeon.<dungeon-slug>\nuniverse: <universe>\nlight: dim\nsize: 20 x 20 ft\nexits:\n  - { dir: s, to: <id of the room to the south>, kind: door, state: open, note: "" }\nread_aloud: >-\n  Two or three sentences the DM reads aloud.\nfeatures: []\nencounters: []\ntraps: []\npuzzles: []\nsecrets: []\nloot: []\ndm_notes: ""\n---\n'
  };

  // ------------------------------------------------------------------ actions
  function move(d, roomId, via) {
    var r = run(d);
    r.cur = roomId; r.visited[roomId] = 1;
    var rm = d._byId[roomId];
    r.fl = rm.floor; delete ui.fl[d.id];
    logit(d, 'Party enters ' + rm.code + ' ' + rm.name + (via ? ' (' + via + ')' : ''));
    save();
  }
  function rollDie(sides) { return 1 + Math.floor(Math.random() * sides); }
  function doRoll(sides, adv, dis) {
    var a = rollDie(sides), text, base;
    if (sides === 20 && (adv || dis)) {
      var b = rollDie(sides);
      base = adv ? Math.max(a, b) : Math.min(a, b);
      text = 'd20 ' + (adv ? 'adv' : 'dis') + ' [' + a + ', ' + b + ']';
    } else { base = a; text = 'd' + sides + ' [' + a + ']'; }
    if (ui.diceMod) text += (ui.diceMod > 0 ? ' +' : ' ') + ui.diceMod;
    var total = base + ui.diceMod;
    if (sides === 20 && base === 20) text += '  NAT 20';
    if (sides === 20 && base === 1) text += '  NAT 1';
    ui.diceLast = { total: total, text: text };
    return ui.diceLast;
  }
  function wander(d) {
    var w = d.wandering || {};
    var sides = parseInt(String(w.die || 'd6').replace(/\D/g, ''), 10) || 6;
    var n = rollDie(sides), line = null;
    (w.entries || []).forEach(function (e) { if (e.indexOf(n + ':') === 0) line = e; });
    var msg = 'Wandering roll ' + n + (line ? ': ' + line.replace(/^\d+:\s*/, '') : '');
    logit(d, msg); save(); toast(msg);
  }

  function onAct(el) {
    var a = el.getAttribute('data-act');
    var d = route.d;
    var g = function (k) { return el.getAttribute('data-' + k); };
    switch (a) {
      case 'back':
        if (history.length > 1) history.back(); else go(route.d ? '#/' : '#/');
        return false;
      case 'nav': go(g('h')); return false;
      case 'open': go('#/d/' + encodeURIComponent(g('c'))); return false;
      case 'tab': go('#/d/' + encodeURIComponent(d.code || d.id) + '/' + g('t')); return false;
      case 'band': filters.band = g('b'); return true;
      case 'start': run(d); logit(d, 'Run started'); save(); go('#/d/' + encodeURIComponent(d.code || d.id) + '/room'); return false;
      case 'reset':
        if (ui.confirm === 'reset') { delete store.runs[d.id]; ui.confirm = null; save(); toast('Run reset'); } else { ui.confirm = 'reset'; }
        return true;
      case 'wipe':
        if (ui.confirm === 'wipe') { store.runs = {}; store.party = []; ui.confirm = null; save(); toast('All runs erased'); } else { ui.confirm = 'wipe'; }
        return true;
      case 'wander': wander(d); return true;
      case 'peek': go('#/d/' + encodeURIComponent(d.code || d.id) + '/room/' + g('n')); return false;
      case 'move': move(d, g('r'), 'moved'); go('#/d/' + encodeURIComponent(d.code || d.id) + '/room'); return false;
      case 'vis': var rr = run(d); rr.visited[g('r')] = rr.visited[g('r')] ? 0 : 1; save(); return true;
      case 'clr': var r2 = run(d); r2.cleared[g('r')] = r2.cleared[g('r')] ? 0 : 1; logit(d, (r2.cleared[g('r')] ? 'Cleared ' : 'Reopened ') + d._byId[g('r')].code); save(); return true;
      case 'big': store.big = !store.big; save(); return true;
      case 'copyra': copyText(d._byId[g('r')].readAloud); return false;
      case 'exit':
        var rm = d._byId[g('r')], dir = g('d'), ex = rm.exits.filter(function (e) { return e.dir === dir; })[0];
        var rn = run(d), st = exitState(rn, rm, ex);
        if (ex.to === 'outside') { logit(d, 'Party leaves the dungeon via ' + rm.code); save(); toast('Out of the dungeon'); return true; }
        if (st === 'locked' || st === 'barred') { toast('That exit is ' + st + '. Use Open when the party gets through.'); return false; }
        if (st === 'hidden') { toast('Hidden: use Open once the party finds it.'); return false; }
        move(d, ex.to, DIRNAME[dir] + ', ' + ex.kind);
        go('#/d/' + encodeURIComponent(d.code || d.id) + '/room');
        return false;
      case 'unlock':
        var rm2 = d._byId[g('r')], dir2 = g('d'), ex2 = rm2.exits.filter(function (e) { return e.dir === dir2; })[0];
        var r3 = run(d), key = rm2.id + '|' + dir2, cur = exitState(r3, rm2, ex2);
        if (cur === 'open') r3.ex[key] = ex2.state === 'open' ? 'locked' : ex2.state; else r3.ex[key] = 'open';
        if (r3.ex[key] === ex2.state) delete r3.ex[key];
        logit(d, DIRNAME[dir2] + ' exit of ' + rm2.code + ' is now ' + exitState(r3, rm2, ex2));
        // keep the reciprocal exit in step
        if (ex2.to !== 'outside') {
          var other = d._byId[ex2.to];
          var back = other.exits.filter(function (e) { return e.to === rm2.id; })[0];
          if (back) { var k2 = other.id + '|' + back.dir; if (r3.ex[key] === undefined) delete r3.ex[k2]; else r3.ex[k2] = r3.ex[key]; }
        }
        save(); return true;
      case 'hp':
        var rh = run(d), k = g('k'), mx = parseInt(g('m'), 10), v = rh.hp[k] == null ? mx : rh.hp[k];
        v = Math.max(0, Math.min(mx, v + parseInt(g('n'), 10)));
        rh.hp[k] = v;
        if (v === 0) logit(d, k.split('|')[0].split('.').slice(-1)[0].split('-')[0] + ' monster down');
        save(); return true;
      case 'enc-reset':
        var re = run(d), pre = g('r') + '|' + g('e') + '.';
        Object.keys(re.hp).forEach(function (kk) { if (kk.indexOf(pre) === 0) delete re.hp[kk]; });
        save(); return true;
      case 'trap': var rt = run(d), kt = g('k'); rt.tr[kt] = rt.tr[kt] === g('v') ? '' : g('v'); save(); return true;
      case 'hint':
        var rp = run(d), kp = g('k'), cp = rp.pz[kp] || { h: 0, solved: false };
        cp.h++; rp.pz[kp] = cp; save(); return true;
      case 'sol': ui.sol[g('k')] = !ui.sol[g('k')]; return true;
      case 'solved':
        var rs = run(d), ks = g('k'), cs = rs.pz[ks] || { h: 0, solved: false };
        cs.solved = !cs.solved; rs.pz[ks] = cs; if (cs.solved) logit(d, 'Puzzle solved in ' + ks.split('|')[0].split('.').slice(-1)[0]); save(); return true;
      case 'tog': var rg = run(d); rg[g('g')][g('k')] = rg[g('g')][g('k')] ? 0 : 1; save(); return true;
      case 'floor': ui.fl[d.id] = parseInt(g('f'), 10); return true;
      case 'roll':
        var res = doRoll(parseInt(g('s'), 10), g('adv'), g('dis'));
        if (d) { logit(d, 'Roll ' + res.text + ' = ' + res.total); save(); }
        return true;
      case 'mod': ui.diceMod = Math.max(-20, Math.min(20, ui.diceMod + parseInt(g('n'), 10))); return true;
      case 'padd': store.party.push({ name: 'Hero ' + (store.party.length + 1), hp: 10, max: 10 }); save(); return true;
      case 'pdel': store.party.splice(parseInt(g('i'), 10), 1); save(); return true;
      case 'php': var p = store.party[parseInt(g('i'), 10)]; p.hp = Math.max(0, Math.min(p.max, p.hp + parseInt(g('n'), 10))); save(); return true;
      case 'copylog': copyText(runView(d).log.slice().reverse().join('\n')); return false;
      case 'sync': doSync(); return false;
      case 'url': openUrl(g('u')); return false;
      case 'tpl': copyText(TPL[g('t')]); return false;
    }
    return false;
  }

  // ------------------------------------------------------------------ sync
  var syncing = false;
  function applySync(text) {
    var j = JSON.parse(text);
    if (!validData(j)) throw new Error('Unexpected dungeon file');
    var before = data.dungeons.length;
    wr('data', text);
    store.syncedAt = new Date().toISOString().slice(0, 16).replace('T', ' ');
    save();
    loadData();
    return data.dungeons.length - before;
  }
  function doSync() {
    if (syncing) return;
    syncing = true; toast('Syncing…');
    function done(ok, payload) {
      syncing = false;
      if (!ok) { toast('Sync failed: ' + payload); return; }
      try {
        var added = applySync(payload);
        toast('Synced ' + data.dungeons.length + ' dungeons' + (added > 0 ? ' (' + added + ' new)' : ''));
        render();
      } catch (e) { toast('Sync failed: ' + e.message); }
    }
    if (bridge && bridge.fetchText) {
      window.__dmFetch = function (ok, payload) { done(ok, payload); };
      bridge.fetchText(SYNC_URL);
    } else if (window.fetch) {
      fetch(SYNC_URL, { cache: 'no-store' }).then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.text();
      }).then(function (t) { done(true, t); }).catch(function (e) { done(false, e.message); });
    } else done(false, 'no network API');
  }

  // ------------------------------------------------------------------ render loop
  var appEl, lastKey = '';
  function render() {
    route = parseHash();
    var key = location.hash;
    var y = window.scrollY;
    var html;
    switch (route.name) {
      case 'library': html = viewLibrary(); break;
      case 'submit': html = viewSubmit(); break;
      case 'about': html = viewAbout(); break;
      case 'overview': html = viewOverview(route.d); break;
      case 'room': html = viewRoom(route.d, route.num); break;
      case 'rooms': html = viewRooms(route.d); break;
      case 'map': html = viewMap(route.d); break;
      case 'tools': html = viewTools(route.d); break;
      default: html = viewLibrary();
    }
    appEl.innerHTML = html;
    if (key !== lastKey) { window.scrollTo(0, 0); ui.confirm = null; } else { window.scrollTo(0, y); }
    lastKey = key;
  }

  function init() {
    appEl = $('#app');
    loadData();
    appEl.addEventListener('click', function (ev) {
      var el = ev.target.closest ? ev.target.closest('[data-act]') : null;
      if (!el || !appEl.contains(el)) return;
      var again = onAct(el);
      if (again) render();
    });
    appEl.addEventListener('input', function (ev) {
      var t = ev.target;
      if (t.id === 'q') { filters.q = t.value; $('#list').innerHTML = libraryList(); }
      else if (t.id === 'rnote' && route.d) { run(route.d).notes[t.getAttribute('data-r')] = t.value; save(); }
      else if (t.id === 'runnote' && route.d) { run(route.d).rnotes = t.value; save(); }
      else if (t.className && String(t.className).indexOf('pname') >= 0) { store.party[parseInt(t.getAttribute('data-i'), 10)].name = t.value; save(); }
    });
    window.addEventListener('hashchange', render);
    window.addEventListener('pagehide', function () { wr('state', JSON.stringify(store)); });
    render();
  }

  window.__dm = { render: render, store: function () { return store; }, data: function () { return data; }, applySync: applySync };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
