/* dmScreen: the DM screen for Omniverse dungeons. No dependencies. */
(function () {
  'use strict';

  var SYNC_URL = 'https://raw.githubusercontent.com/timmseth/omniverse/main/_generated/dungeons.json';
  var WORLD_URL = 'https://raw.githubusercontent.com/timmseth/omniverse/main/_generated/world.json';
  var REPO_URL = 'https://github.com/timmseth/omniverse';
  var GUIDE_URL = REPO_URL + '/blob/main/_rules/Submitting%20a%20Dungeon.md';
  var bridge = (window.Android && typeof window.Android.loadState === 'function') ? window.Android : null;
  var VERSION = '1.1.0';
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
      if (bridge) {
        if (key === 'state') return bridge.loadState();
        if (key === 'data') return bridge.loadData();
        return bridge.loadFile ? bridge.loadFile(key + '.json') : null;
      }
      return localStorage.getItem('dmscreen-' + key);
    } catch (e) { return null; }
  }
  function wr(key, val) {
    try {
      if (bridge) {
        if (key === 'state') bridge.saveState(val);
        else if (key === 'data') bridge.saveData(val);
        else if (bridge.saveFile) bridge.saveFile(key + '.json', val);
      } else localStorage.setItem('dmscreen-' + key, val);
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
  var world = { notes: [], byId: {}, byKind: {} };
  var syncInfo = { count: 0, source: 'bundled', worldCount: 0 };
  function validData(d) { return d && d.schema === 1 && Array.isArray(d.dungeons); }
  function validWorld(w) { return w && w.schema === 1 && Array.isArray(w.notes); }
  function slugOf(id) { return String(id).split('.').slice(-1)[0]; }
  function loadWorld() {
    var out = {}, order = [];
    var synced = null;
    try { synced = JSON.parse(rd('world') || 'null'); } catch (e) { synced = null; }
    [window.BUNDLED_WORLD, synced].forEach(function (src) {
      if (!validWorld(src)) return;
      src.notes.forEach(function (n) {
        if (!n || !n.id) return;
        if (n.body && !n.readAloud) { var m = /^> (.+)$/m.exec(n.body); if (m) n.readAloud = m[1]; }
        if (!out[n.id]) order.push(n.id);
        out[n.id] = n;
      });
    });
    world = { notes: order.map(function (i) { return out[i]; }), byId: out, byKind: {} };
    world.notes.forEach(function (n) { (world.byKind[n.kind] = world.byKind[n.kind] || []).push(n); });
    syncInfo.worldCount = world.notes.length;
  }
  function W(id) { return (id && world.byId[id]) || null; }
  function wname(id) { var n = W(id); return n ? n.name : (id ? slugOf(id).replace(/-/g, ' ') : ''); }
  function wlink(id, cls) {
    var n = W(id);
    if (!n) {
      var d = dungeonBy(id);
      if (d) return '<a href="#/d/' + encodeURIComponent(d.code) + '" class="' + (cls || '') + '">' + esc(d.name) + '</a>';
      return esc(wname(id));
    }
    var h = { settlement: '#/t/', venue: '#/v/', person: '#/p/', faction: '#/f/', quest: '#/q/', table: '#/tables/' }[n.kind];
    return h ? '<a href="' + h + encodeURIComponent(n.id) + '" class="' + (cls || '') + '">' + esc(n.name) + '</a>' : esc(n.name);
  }
  function loadData() {
    loadWorld();
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
  function dungeonsOf(ids) { return (ids || []).map(function (i) { return dungeonBy(i); }).filter(Boolean); }

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
    if (!p.length) return { name: 'library', section: 'dungeons' };
    if (p[0] === 'submit') return { name: 'submit' };
    if (p[0] === 'about') return { name: 'about' };
    if (p[0] === 'towns') return { name: 'library', section: 'towns' };
    if (p[0] === 'factions') return { name: 'library', section: 'factions' };
    if (p[0] === 'tables') return p[1] ? { name: 'table', id: decodeURIComponent(p[1]) } : { name: 'library', section: 'tables' };
    var kindRoute = { t: 'settlement', v: 'venue', p: 'person', f: 'faction', q: 'quest' }[p[0]];
    if (kindRoute && p[1]) {
      var n = W(decodeURIComponent(p[1]));
      if (n && n.kind === kindRoute) return { name: 'note', note: n };
      return { name: 'library' };
    }
    if (p[0] === 'd' && p[1]) {
      var d = dungeonBy(decodeURIComponent(p[1]));
      if (!d) return { name: 'library' };
      var tab = p[2] || 'overview';
      if (tab === 'room') return { name: 'room', d: d, num: p[3] ? parseInt(p[3], 10) : null };
      if (['overview', 'model', 'map', 'rooms', 'tools'].indexOf(tab) < 0) tab = 'overview';
      return { name: tab, d: d };
    }
    return { name: 'library' };
  }
  function go(h) { if (location.hash === h) render(); else location.hash = h; }

  // ------------------------------------------------------------------ views
  var filters = { q: '', band: 'all', section: 'dungeons' };
  var ui = { fl: {}, diceMode: 'n', diceMod: 0, diceLast: null, diceHist: [], sol: {}, stats: {}, reveal: {}, confirm: null, panelRoom: {}, tableLast: {} };

  function header(title, sub, back) {
    return '<div class="top">' + (back ? '<button class="back" data-act="back" aria-label="Back">&#8592;</button>' : '') +
      '<div class="grow"><div class="title">' + esc(title) + '</div>' + (sub ? '<div class="sub">' + esc(sub) + '</div>' : '') + '</div></div>';
  }
  function tabs(d, active) {
    var items = [['overview', '☰', 'Overview'], ['room', '❖', 'Room'], ['model', '⬡', 'Model'], ['map', '▦', 'Map'], ['rooms', '≡', 'Rooms'], ['tools', '⚄', 'Tools']];
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
    var sec = route.section || filters.section || 'dungeons';
    filters.section = sec;
    var html = header('dmScreen', data.dungeons.length + ' dungeons · ' + (world.byKind.settlement || []).length + ' towns · ' + (syncInfo.source === 'synced' ? 'synced' : 'bundled'), false);
    html += '<div class="chips seg">' + [['dungeons', 'Dungeons', '#/'], ['towns', 'Towns', '#/towns'], ['factions', 'Factions', '#/factions'], ['tables', 'Tables', '#/tables']].map(function (t) {
      return '<a class="chip ' + (sec === t[0] ? 'on' : '') + '" href="' + t[2] + '">' + t[1] + '</a>';
    }).join('') + '</div>';
    html += '<div class="search"><input id="q" type="search" placeholder="Search" value="' + esc(filters.q) + '"></div>';
    if (sec === 'dungeons') {
      html += '<div class="chips">' + bands.map(function (b) {
        return '<button class="chip ' + (filters.band === b ? 'on' : '') + '" data-act="band" data-b="' + b + '">' + (b === 'all' ? 'All levels' : 'Lv ' + b) + '</button>';
      }).join('') + '</div>';
    }
    html += '<div id="list">' + libraryList() + '</div>';
    html += '<div class="card"><div class="row"><button class="grow" data-act="sync">Sync from GitHub</button><button class="grow" data-act="nav" data-h="#/submit">Submit a dungeon</button></div>' +
      '<div class="small muted" style="margin-top:8px">' + (store.syncedAt ? 'Last synced ' + esc(store.syncedAt) : 'Not synced yet. Showing the dungeons bundled with this version.') +
      ' <a href="#/about" style="margin-left:6px">About</a></div></div>';
    return html;
  }
  function matches(q, parts) { return !q || parts.join(' ').toLowerCase().indexOf(q) >= 0; }
  function libraryList() {
    var q = filters.q.trim().toLowerCase();
    var sec = filters.section;
    if (sec === 'towns') {
      var towns = (world.byKind.settlement || []).filter(function (t) { return matches(q, [t.name, t.summary, (t.data.trade || []).join(' '), t.universe]); })
        .sort(function (a, b) { return (a.universe || '').localeCompare(b.universe || '') || a.name.localeCompare(b.name); });
      if (!towns.length) return '<div class="card muted">No towns match.</div>';
      return towns.map(function (t) {
        return '<div class="card link" data-act="nav" data-h="#/t/' + encodeURIComponent(t.id) + '"><div class="head"><h3>' + esc(t.name) + '</h3><span class="badge">' + esc(t.data.size_class || '') + '</span></div>' +
          '<div class="small muted">' + esc(wname(t.universe)) + ' · ' + (t.data.venues || []).length + ' venues · ' + (t.data.notable_people || []).length + ' people · ' + dungeonsOf(t.data.nearest_dungeons).map(function (d) { return d.code; }).join(' ') + '</div>' +
          '<p class="small">' + esc(t.summary) + '</p></div>';
      }).join('');
    }
    if (sec === 'factions') {
      var fs = (world.byKind.faction || []).filter(function (f) { return matches(q, [f.name, f.summary, f.data.faction_type, f.data.reputation]); }).sort(function (a, b) { return a.name.localeCompare(b.name); });
      if (!fs.length) return '<div class="card muted">No factions match.</div>';
      return fs.map(function (f) {
        return '<div class="card link" data-act="nav" data-h="#/f/' + encodeURIComponent(f.id) + '"><div class="head"><h3>' + esc(f.name) + '</h3><span class="badge">' + esc(f.data.faction_type || '') + '</span></div>' +
          '<div class="small muted">' + esc(f.data.reach || '') + ' · ' + (f.data.members || []).length + ' members · ' + dungeonsOf(f.data.dungeons).map(function (d) { return d.code; }).join(' ') + '</div>' +
          '<p class="small">' + esc(f.data.reputation || f.summary) + '</p></div>';
      }).join('');
    }
    if (sec === 'tables') {
      var ts = (world.byKind.table || []).filter(function (t) { return matches(q, [t.name, t.data.category, t.universe]); }).sort(function (a, b) { return (a.data.category || '').localeCompare(b.data.category || '') || a.name.localeCompare(b.name); });
      if (!ts.length) return '<div class="card muted">No tables match.</div>';
      return ts.map(function (t) { return tableCard(t, true); }).join('');
    }
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
    var qs = (world.byKind.quest || []).filter(function (q) { return (q.data.dungeons || []).indexOf(d.id) >= 0; });
    var fs = (world.byKind.faction || []).filter(function (f) { return (f.data.dungeons || []).indexOf(d.id) >= 0; });
    var home = (world.byKind.settlement || []).filter(function (t) { return (t.data.nearest_dungeons || []).indexOf(d.id) >= 0; });
    if (qs.length || fs.length || home.length) {
      html += '<div class="sect"><h4>In the world</h4>' + home.map(function (t) { return '<div class="li">Home town: ' + wlink(t.id) + '</div>'; }).join('') +
        fs.map(function (f) { return '<div class="li">Faction: ' + wlink(f.id) + '</div>'; }).join('') + qs.map(function (q) { return '<div class="li">Quest: ' + wlink(q.id) + ' <span class="badge lvl">Lv ' + q.data.level_range[0] + '–' + q.data.level_range[1] + '</span></div>'; }).join('') + '</div>';
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
    var html = header(rm.code + '  ' + rm.name, d.name, true);
    html += roomCard(d, rm);
    return html + tabs(d, 'room');
  }

  function roomCard(d, rm) {
    var r = runView(d);
    var isCur = r.cur === rm.id;
    var html = '';
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
      var seen = {};
      (en.monsters || []).forEach(function (mo) {
        if (!mo.stats || seen[mo.stats.id]) return; seen[mo.stats.id] = 1;
        var sk = rm.id + '|' + ei + '|' + mo.stats.id;
        html += '<button class="sm ghost" data-act="stats" data-k="' + esc(sk) + '">' + (ui.stats[sk] ? 'Hide' : 'Show') + ' stats: ' + esc(mo.stats.name) + '</button>';
        if (ui.stats[sk]) html += statBlockHtml(mo.stats);
      });
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
        var label = typeof l === 'string' ? esc(l) : ('<b>' + esc(l.name) + '</b> <span class="badge">' + esc((l.rarity || '').replace('_', ' ')) + (l.attunement ? ', attune' : '') + '</span><br><span class="small">' + esc(l.description) +
          (l.mechanics ? '<br><i>' + esc(l.mechanics) + '</i>' : '') + (l.curse ? '<br><span class="bad">Curse: ' + esc(l.curse) + '</span>' : '') + '</span>');
        return '<div class="check ' + (on ? 'done' : '') + '" data-act="tog" data-g="lt" data-k="' + esc(key) + '"><b class="bx">' + (on ? '☑' : '☐') + '</b><span>' + label + '</span></div>';
      }).join('') + '</div>';
    }
    if (rm.dmNotes) html += '<div class="sect"><h4>DM notes</h4><div class="dm">' + esc(rm.dmNotes) + '</div></div>';
    html += '<div class="sect"><h4>Your notes</h4><textarea class="rnote" data-r="' + esc(rm.id) + '" placeholder="Notes for this room">' + esc(r.notes[rm.id] || '') + '</textarea></div>';
    return html;
  }

  function kv(k, v) { return v == null || v === '' ? '' : '<span class="k">' + esc(k) + '</span> ' + esc(v) + '  '; }
  function namedList(title, arr) {
    if (!arr || !arr.length) return '';
    return '<div class="sb-sect"><b>' + esc(title) + '.</b> ' + arr.map(function (a) { return '<i>' + esc(a.name) + '.</i> ' + esc(a.text); }).join(' ') + '</div>';
  }
  function statBlockHtml(st) {
    var b = st.block || {}, rs = b.ruleset || (st.ruleset || '').split('.').pop();
    var h = '<div class="statblock"><div class="sb-head"><b>' + esc(st.name) + '</b> <span class="muted small">' + esc(st.size || '') + ' ' + esc(st.type || '') + (st.threat != null ? ' · threat ' + st.threat : '') + '</span></div>';
    if (rs === 'dnd5e') {
      h += '<div class="sb-line">' + kv('CR', b.cr) + kv('AC', b.ac) + kv('HP', b.hp + (b.hp_dice ? ' (' + b.hp_dice + ')' : '')) + kv('Speed', b.speed) + '</div>';
      if (b.abilities) h += '<table class="abil"><tr>' + ['str', 'dex', 'con', 'int', 'wis', 'cha'].map(function (k) { return '<th>' + k.toUpperCase() + '</th>'; }).join('') + '</tr><tr>' +
        ['str', 'dex', 'con', 'int', 'wis', 'cha'].map(function (k) { var v = b.abilities[k]; var m = Math.floor((v - 10) / 2); return '<td>' + v + ' (' + (m >= 0 ? '+' : '') + m + ')</td>'; }).join('') + '</tr></table>';
      h += '<div class="sb-line small">' + kv('Saves', b.saves) + kv('Skills', b.skills) + kv('Resist', b.resistances) + kv('Immune', b.immunities) + kv('Senses', b.senses) + kv('Languages', b.languages) + '</div>';
      h += namedList('Traits', b.traits) + namedList('Actions', b.actions) + namedList('Reactions', b.reactions) + namedList('Legendary', b.legendary);
    } else if (rs === 'six_sides') {
      var t = b.traits || {};
      h += '<div class="sb-line">' + kv('Body', t.body) + kv('Wits', t.wits) + kv('Nerve', t.nerve) + kv('Grace', t.grace) + kv('Harm', b.harm) + kv('Difficulty', b.difficulty) + kv('Edge', b.edge) + '</div>';
      h += namedList('Moves', b.moves);
    } else if (rs === 'core') {
      h += '<div class="sb-line">' + kv('Rank', b.rank) + kv('Descriptors', (b.descriptors || []).join(', ')) + '</div>';
    }
    if (st.tactics) h += '<div class="sb-sect"><b>Tactics.</b> ' + esc(st.tactics) + '</div>';
    if (st.lore) h += '<div class="sb-sect muted small">' + esc(st.lore) + '</div>';
    return h + '</div>';
  }
  function monsterStats(n) {
    var d = n.data || {}, rs = d.dnd5e ? 'dnd5e' : d.six_sides ? 'six_sides' : d.core ? 'core' : '';
    var blk = {};
    if (rs) { var src = d[rs]; for (var k in src) blk[k] = src[k]; blk.ruleset = rs; }
    return { id: n.id, name: n.name, size: d.size, type: d.type, threat: d.threat, ruleset: d.ruleset, block: blk, tactics: d.tactics, lore: d.lore };
  }

  function rollTable(t) {
    var sides = parseInt(String(t.data.die || 'd6').replace(/\D/g, ''), 10) || 6;
    var n = 1 + Math.floor(Math.random() * sides), hit = null;
    (t.data.entries || []).forEach(function (e) {
      var r = e.roll, ok;
      if (typeof r === 'number') ok = r === n;
      else { var m = /^(\d+)\s*-\s*(\d+)$/.exec(String(r)); ok = m ? (n >= +m[1] && n <= +m[2]) : (String(r) === String(n)); }
      if (ok) hit = e;
    });
    return { n: n, e: hit };
  }
  function tableCard(t, compact) {
    var last = ui.tableLast[t.id];
    var h = '<div class="card"><div class="head"><h3>' + esc(t.name) + '</h3><span class="badge">' + esc(t.data.category || '') + ' · ' + esc(t.data.die || '') + '</span></div>' +
      (t.data.where ? '<div class="small muted">' + wlink(t.data.where) + '</div>' : '') +
      '<div class="row" style="margin-top:6px"><button class="primary grow" data-act="roll-table" data-t="' + esc(t.id) + '">Roll ' + esc(t.data.die || '') + '</button>' +
      (compact ? '<button class="grow" data-act="nav" data-h="#/tables/' + encodeURIComponent(t.id) + '">See table</button>' : '') + '</div>';
    if (last) {
      var refN = last.e && last.e.ref ? W(last.e.ref) : null;
      h += '<div class="result tbl"><span class="n">' + last.n + '</span><span>' + (last.e ? esc(last.e.text) : 'no entry for that roll') + '</span>' +
        (last.e && last.e.ref ? '<div class="small">' + (last.e.count ? esc(last.e.count) + ' × ' : '') + wlink(last.e.ref) + (refN && refN.kind === 'monster' ? ' <button class="sm" data-act="stats" data-k="tbl|' + esc(last.e.ref) + '">stats</button>' : '') + '</div>' : '') + '</div>';
      if (refN && refN.kind === 'monster' && ui.stats['tbl|' + last.e.ref]) h += statBlockHtml(monsterStats(refN));
    }
    return h + '</div>';
  }
  function viewTable(id) {
    var t = W(id);
    if (!t) return header('Table', '', true) + '<div class="card muted">Unknown table.</div>';
    var h = header(t.name, wname(t.universe) + ' · ' + (t.data.category || ''), true) + tableCard(t, false);
    h += '<div class="card"><table class="tbl-rows">' + (t.data.entries || []).map(function (e) {
      return '<tr><td class="roll">' + esc(e.roll) + '</td><td>' + esc(e.text) + (e.ref ? '<div class="small">' + (e.count ? esc(e.count) + ' × ' : '') + wlink(e.ref) + '</div>' : '') + '</td></tr>';
    }).join('') + '</table></div>';
    return h;
  }

  function list(title, items, render) {
    if (!items || !items.length) return '';
    return '<div class="sect"><h4>' + esc(title) + '</h4>' + items.map(render).join('') + '</div>';
  }
  function bullets(title, arr) { return list(title, arr, function (x) { return '<div class="li">• ' + esc(x) + '</div>'; }); }
  function links(title, ids) { return list(title, (ids || []).filter(function (i) { return W(i) || dungeonBy(i); }), function (i) { return '<div class="li">' + wlink(i) + '</div>'; }); }
  function secretBox(id, text) {
    if (!text) return '';
    return '<div class="sect"><h4>Secret</h4>' + (ui.reveal[id] ? '<div class="solution">' + esc(text) + '</div>' : '<button class="sm" data-act="reveal" data-k="' + esc(id) + '">Reveal</button>') + '</div>';
  }

  function viewNote(n) {
    var d = n.data || {};
    var sub = n.kind === 'settlement' ? (d.size_class || '') + ' · ' + wname(n.universe) : (n.kind === 'person' ? (d.role || '') : (n.kind === 'venue' ? (d.venue_type || '') + ' in ' + wname(n.parent) : wname(n.universe)));
    var h = header(n.name, sub, true);
    if (n.readAloud) h += '<div class="readaloud ' + (store.big ? 'big' : '') + '"><div class="lbl"><span>Read aloud</span><button class="sm" data-act="copy" data-t="' + esc(n.readAloud) + '">Copy</button></div>' + esc(n.readAloud) + '</div>';
    if (n.kind === 'settlement') {
      h += '<div class="card"><p>' + esc(n.summary) + '</p><div class="small">Ruler: ' + wlink(d.ruler) + (d.population ? ' · pop. ' + d.population : '') + '</div>' +
        (d.law ? '<div class="small muted">' + esc(d.law) + '</div>' : '') + (d.trade ? '<div>' + d.trade.map(function (t) { return '<span class="badge">' + esc(t) + '</span>'; }).join('') + '</div>' : '') + '</div>';
      h += links('Venues', d.venues) + links('People', d.notable_people) + links('Factions', d.factions);
      var dl = dungeonsOf(d.nearest_dungeons);
      if (dl.length) h += '<div class="sect"><h4>Nearby dungeons</h4>' + dl.map(function (x) { return '<div class="card link" style="margin:6px 0" data-act="open" data-c="' + esc(x.code) + '"><div class="head"><h3>' + esc(x.name) + '</h3><span class="badge lvl">Lv ' + x.levelRange[0] + '–' + x.levelRange[1] + '</span></div></div>'; }).join('') + '</div>';
      h += bullets('Rumours', d.rumours) + bullets('Hooks', d.hooks);
      var tbls = (world.byKind.table || []).filter(function (t) { return t.data.where === n.id || t.data.where === n.parent; });
      if (tbls.length) h += '<div class="sect"><h4>Tables here</h4>' + tbls.map(function (t) { return tableCard(t, true); }).join('') + '</div>';
    } else if (n.kind === 'venue') {
      h += '<div class="card"><div class="small">Keeper: ' + wlink(d.keeper) + (d.faction ? ' · ' + wlink(d.faction) : '') + ' · in ' + wlink(n.parent) + '</div></div>';
      h += bullets('Services', d.services) + links('For sale', d.stock) + bullets('Rumours', d.rumours) + bullets('Hooks', d.hooks);
      if (d.dm_notes) h += '<div class="sect"><h4>DM notes</h4><div class="dm">' + esc(d.dm_notes) + '</div></div>';
    } else if (n.kind === 'person') {
      h += '<div class="card"><div class="small">' + esc(d.species || '') + (d.faction ? ' · ' + wlink(d.faction) : '') + (d.location ? ' · at ' + wlink(d.location) : '') + (n.parent && W(n.parent) ? ' · ' + wlink(n.parent) : '') + '</div>' +
        (d.voice ? '<p><b>Voice.</b> ' + esc(d.voice) + '</p>' : '') + (d.wants ? '<p><b>Wants</b> ' + esc(d.wants.join('; ')) + '.' + (d.fears ? ' <b>Fears</b> ' + esc(d.fears.join('; ')) + '.' : '') + '</p>' : '') + '</div>';
      h += secretBox(n.id, d.secret) + bullets('Goals', d.goals);
      if (d.relationships && d.relationships.length) h += list('Relationships', d.relationships, function (r) { return '<div class="li">' + esc(r.type) + ': ' + wlink(r.with) + (r.note ? ' <span class="muted">(' + esc(r.note) + ')</span>' : '') + '</div>'; });
      if (d.stat_block && W(d.stat_block)) h += '<div class="sect"><h4>Stat block</h4>' + statBlockHtml(monsterStats(W(d.stat_block))) + '</div>';
      else if (d.stats) h += '<div class="sect"><h4>Stats</h4><pre class="small">' + esc(JSON.stringify(d.stats, null, 1).replace(/[{}"]/g, '')) + '</pre></div>';
    } else if (n.kind === 'faction') {
      h += '<div class="card"><p>' + esc(d.reputation || n.summary) + '</p><div class="small">' + esc(d.faction_type || '') + ' · ' + esc(d.reach || '') + (d.base ? ' · base ' + wlink(d.base) : '') + (d.leader ? ' · led by ' + wlink(d.leader) : '') + '</div></div>';
      h += bullets('Goals', d.goals) + bullets('Methods', d.methods) + bullets('Assets', d.assets) + links('Members', d.members) + links('Allies', d.allies) + links('Rivals', d.rivals);
      var dl2 = dungeonsOf(d.dungeons);
      if (dl2.length) h += '<div class="sect"><h4>Dungeons</h4>' + dl2.map(function (x) { return '<div class="li"><a href="#/d/' + encodeURIComponent(x.code) + '">' + esc(x.name) + '</a></div>'; }).join('') + '</div>';
      h += secretBox(n.id, d.secret) + bullets('Hooks', d.hooks);
    } else if (n.kind === 'quest') {
      var lr = d.level_range || [0, 0];
      h += '<div class="card"><div class="small"><span class="badge lvl">Lv ' + lr[0] + '–' + lr[1] + '</span> ' + (d.giver ? 'from ' + wlink(d.giver) : '') + (d.start ? ' · starts at ' + wlink(d.start) : '') + '</div><p>' + esc(d.premise) + '</p></div>';
      h += bullets('Hooks', d.hooks);
      h += list('Stages', d.stages, function (st, i) {
        var dd = st.dungeon ? dungeonBy(st.dungeon) : null;
        return '<div class="card" style="margin:6px 0"><div class="head"><h3>' + (i + 1) + '. ' + esc(st.name) + '</h3>' + (dd ? '<a class="badge" href="#/d/' + encodeURIComponent(dd.code) + '">' + esc(dd.code) + '</a>' : '') + '</div><p class="small">' + esc(st.goal) + '</p>' +
          (st.where && !dd ? '<div class="small">' + wlink(st.where) + '</div>' : '') + (st.complications ? '<div class="small muted">' + esc(st.complications.join(' · ')) + '</div>' : '') + (st.clue ? '<div class="hint">Clue: ' + esc(st.clue) + '</div>' : '') + '</div>';
      });
      h += list('Rewards', d.rewards, function (x) { return '<div class="li">• ' + (typeof x === 'string' ? (W(x) ? wlink(x) : esc(x)) : esc(x.name || '')) + '</div>'; });
      h += '<div class="sect"><h4>Outcomes</h4><div class="small"><b>Success.</b> ' + esc(d.on_success) + '</div><div class="small" style="margin-top:6px"><b>Failure.</b> ' + esc(d.on_failure) + '</div></div>';
      h += links('Factions', d.factions);
    }
    return h;
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

  // ------------------------------------------------------------------ model (dollhouse)
  var m3 = null, m3Key = null;
  function modelFloor(d) {
    var r = runView(d), cur = d._byId[r.cur];
    var pick = ui.fl[d.id];
    if (pick != null && d._floors[pick]) return pick;
    return cur ? cur.floor : 0;
  }
  function viewModel(d) {
    var html = header('Model', d.name, true);
    html += '<div class="m3wrap"><canvas id="m3c"></canvas><div id="m3labels" class="m3labels"></div>' +
      '<div class="m3bar">' + modelFloorChips(d) + '<button class="sm" data-act="m3reset">Reset view</button></div>' +
      '<div id="m3nogl" class="m3nogl" style="display:none">This device cannot show the 3D model. The Map tab has the same rooms.</div></div>';
    html += '<div id="m3panel" class="m3panel">' + modelPanel(d) + '</div>';
    return html + tabs(d, 'model');
  }
  function modelFloorChips(d) {
    var floors = Object.keys(d._floors).map(Number).sort(function (a, b) { return b - a; });
    if (floors.length < 2) return '<span class="small muted">one floor</span>';
    var f = modelFloor(d);
    return floors.map(function (fl) { return '<button class="chip ' + (fl === f ? 'on' : '') + '" data-act="floor" data-f="' + fl + '">Floor ' + (fl > 0 ? '+' + fl : fl) + '</button>'; }).join('');
  }
  function modelPanel(d) {
    var r = runView(d);
    var id = ui.panelRoom[d.id] || r.cur;
    var rm = d._byId[id] || d._byId[d.entry];
    return '<div class="m3phead"><b>' + esc(rm.code) + ' ' + esc(rm.name) + '</b><span class="row tight"><button class="sm" data-act="peek" data-n="' + rm.number + '">Open in Room tab</button></span></div>' + roomCard(d, rm);
  }
  function mountModel(d) {
    var c = $('#m3c'), lab = $('#m3labels');
    if (!c) return;
    if (m3 && m3Key !== d.id) { m3.destroy(); m3 = null; }
    if (!m3) {
      m3 = window.Model3D ? window.Model3D.create(c, lab, { onPick: function (roomId) { ui.panelRoom[d.id] = roomId; renderModelParts(d); } }) : null;
      m3Key = d.id;
      if (!m3) { var ng = $('#m3nogl'); if (ng) ng.style.display = 'block'; return; }
      m3.setDungeon(d, runView(d), modelFloor(d));
    } else {
      m3.update(runView(d), modelFloor(d));
    }
  }
  function renderModelParts(d) {
    var p = $('#m3panel'); if (p) { var y = p.scrollTop; p.innerHTML = modelPanel(d); p.scrollTop = y; }
    var bar = $('.m3bar'); if (bar) bar.innerHTML = modelFloorChips(d) + '<button class="sm" data-act="m3reset">Reset view</button>';
    if (m3) m3.update(runView(d), modelFloor(d));
  }
  function unmountModel() { if (m3) { m3.destroy(); m3 = null; m3Key = null; } }

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

    var tbls = (world.byKind.table || []).filter(function (t) { return t.universe === d.universe || t.universe === 'omniverse'; }).sort(function (a, b) { return a.name.localeCompare(b.name); });
    if (tbls.length) {
      var sel = ui.toolTable || tbls[0].id, selT = W(sel) || tbls[0];
      html += '<div class="card"><h3>Tables</h3><select id="tablesel" style="margin:8px 0;width:100%">' + tbls.map(function (t) { return '<option value="' + esc(t.id) + '"' + (t.id === selT.id ? ' selected' : '') + '>' + esc(t.name) + ' (' + esc(t.data.die) + ')</option>'; }).join('') + '</select>' + tableCard(selT, true).replace('<div class="card">', '<div>') + '</div>';
    }
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
      '<div class="kv"><span>App version</span><b>' + esc(VERSION) + '</b><span>Dungeons</span><b>' + syncInfo.count + '</b><span>World notes</span><b>' + syncInfo.worldCount + '</b><span>Data</span><b>' + esc(syncInfo.source) + '</b><span>Last synced</span><b>' + esc(store.syncedAt || 'never') + '</b></div>' +
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
      case 'move':
        move(d, g('r'), 'moved');
        if (route.name === 'model') { ui.panelRoom[d.id] = g('r'); renderModelParts(d); return false; }
        go('#/d/' + encodeURIComponent(d.code || d.id) + '/room'); return false;
      case 'vis': var rr = run(d); rr.visited[g('r')] = rr.visited[g('r')] ? 0 : 1; save(); return true;
      case 'clr': var r2 = run(d); r2.cleared[g('r')] = r2.cleared[g('r')] ? 0 : 1; logit(d, (r2.cleared[g('r')] ? 'Cleared ' : 'Reopened ') + d._byId[g('r')].code); save(); return true;
      case 'big': store.big = !store.big; save(); return true;
      case 'copyra': copyText(d._byId[g('r')].readAloud); return false;
      case 'copy': copyText(g('t')); return false;
      case 'stats': ui.stats[g('k')] = !ui.stats[g('k')]; return true;
      case 'reveal': ui.reveal[g('k')] = true; return true;
      case 'roll-table':
        var tt = W(g('t')); if (!tt) return false;
        var res = rollTable(tt); ui.tableLast[tt.id] = res;
        if (d) { logit(d, 'Table ' + tt.name + ': ' + res.n + (res.e ? ' ' + res.e.text : '')); save(); }
        return true;
      case 'peek3d': ui.panelRoom[d.id] = g('r'); renderModelParts(d); return false;
      case 'm3reset': if (m3) { m3.setDungeon(d, runView(d), modelFloor(d)); } return false;
      case 'exit':
        var rm = d._byId[g('r')], dir = g('d'), ex = rm.exits.filter(function (e) { return e.dir === dir; })[0];
        var rn = run(d), st = exitState(rn, rm, ex);
        if (ex.to === 'outside') { logit(d, 'Party leaves the dungeon via ' + rm.code); save(); toast('Out of the dungeon'); return true; }
        if (st === 'locked' || st === 'barred') { toast('That exit is ' + st + '. Use Open when the party gets through.'); return false; }
        if (st === 'hidden') { toast('Hidden: use Open once the party finds it.'); return false; }
        move(d, ex.to, DIRNAME[dir] + ', ' + ex.kind);
        if (route.name === 'model') { ui.panelRoom[d.id] = ex.to; renderModelParts(d); return false; }
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
      case 'floor': ui.fl[d.id] = parseInt(g('f'), 10); if (route.name === 'model') { renderModelParts(d); return false; } return true;
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
  function applyWorld(text) {
    var j = JSON.parse(text);
    if (!validWorld(j)) throw new Error('Unexpected world file');
    // keep only what the app shows, in the slim shape sync_data.py produces
    var keep = { universe: 1, settlement: 1, venue: 1, person: 1, faction: 1, quest: 1, table: 1, item: 1, monster: 1, deity: 1, holiday: 1, region: 1 };
    var slim = { schema: 1, source: j.source, notes: [] };
    j.notes.forEach(function (n) {
      if (!keep[n.kind]) return;
      var e = { id: n.id, kind: n.kind, name: n.name, universe: n.universe, parent: n.parent, summary: n.summary || '', tags: n.tags || [], data: n.data || {}, referencedBy: n.referencedBy || [] };
      if (n.kind === 'settlement' || n.kind === 'venue' || n.kind === 'region') { var m = /^> (.+)$/m.exec(n.body || ''); e.readAloud = (n.data && n.data.read_aloud) || (m ? m[1] : ''); }
      slim.notes.push(e);
    });
    wr('world', JSON.stringify(slim));
    loadWorld();
    return slim.notes.length;
  }
  function fetchUrl(url, cb) {
    if (bridge && bridge.fetchText) {
      window.__dmFetch = function (ok, payload, u) { if (!u || u === url) cb(ok, payload); };
      bridge.fetchText(url);
    } else if (window.fetch) {
      fetch(url, { cache: 'no-store' }).then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.text();
      }).then(function (t) { cb(true, t); }).catch(function (e) { cb(false, e.message); });
    } else cb(false, 'no network API');
  }
  function doSync() {
    if (syncing) return;
    syncing = true; toast('Syncing…');
    fetchUrl(SYNC_URL, function (ok, payload) {
      if (!ok) { syncing = false; toast('Sync failed: ' + payload); return; }
      var added;
      try { added = applySync(payload); } catch (e) { syncing = false; toast('Sync failed: ' + e.message); return; }
      fetchUrl(WORLD_URL, function (ok2, payload2) {
        syncing = false;
        var msg = 'Synced ' + data.dungeons.length + ' dungeons' + (added > 0 ? ' (' + added + ' new)' : '');
        if (ok2) { try { msg += ', ' + applyWorld(payload2) + ' world notes'; } catch (e) { msg += '; world: ' + e.message; } }
        else msg += '; world: ' + payload2;
        toast(msg);
        render();
      });
    });
  }

  // ------------------------------------------------------------------ render loop
  var appEl, lastKey = '';
  function render() {
    route = parseHash();
    var key = location.hash;
    var y = window.scrollY;
    var html;
    if (route.name === 'model' && m3 && m3Key === route.d.id && key === lastKey && $('#m3c')) {
      renderModelParts(route.d);   // keep the WebGL canvas; refresh the panel and the chips only
      return;
    }
    if (route.name !== 'model') unmountModel();
    switch (route.name) {
      case 'library': html = viewLibrary(); break;
      case 'submit': html = viewSubmit(); break;
      case 'about': html = viewAbout(); break;
      case 'overview': html = viewOverview(route.d); break;
      case 'room': html = viewRoom(route.d, route.num); break;
      case 'model': html = viewModel(route.d); break;
      case 'rooms': html = viewRooms(route.d); break;
      case 'map': html = viewMap(route.d); break;
      case 'tools': html = viewTools(route.d); break;
      case 'note': html = viewNote(route.note); break;
      case 'table': html = viewTable(route.id); break;
      default: html = viewLibrary();
    }
    appEl.innerHTML = html;
    if (key !== lastKey) { window.scrollTo(0, 0); ui.confirm = null; } else { window.scrollTo(0, y); }
    lastKey = key;
    if (route.name === 'model') mountModel(route.d);
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
      else if (t.className && String(t.className).indexOf('rnote') >= 0 && route.d) { run(route.d).notes[t.getAttribute('data-r')] = t.value; save(); }
      else if (t.id === 'runnote' && route.d) { run(route.d).rnotes = t.value; save(); }
      else if (t.className && String(t.className).indexOf('pname') >= 0) { store.party[parseInt(t.getAttribute('data-i'), 10)].name = t.value; save(); }
    });
    appEl.addEventListener('change', function (ev) {
      if (ev.target.id === 'tablesel') { ui.toolTable = ev.target.value; render(); }
    });
    window.addEventListener('hashchange', render);
    window.addEventListener('resize', function () { if (m3) m3.redraw(); });
    window.addEventListener('pagehide', function () { wr('state', JSON.stringify(store)); });
    render();
  }

  window.__dm = { render: render, store: function () { return store; }, data: function () { return data; }, world: function () { return world; }, applySync: applySync, applyWorld: applyWorld, rollTable: rollTable };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
