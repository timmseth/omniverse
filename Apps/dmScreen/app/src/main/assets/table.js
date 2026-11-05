/* table.js: table-side helpers ported from partyInterface (dice notation, coins, initiative,
   death saves, session export). Pure functions; no DOM. Exposed as window.DMX. */
(function () {
  'use strict';

  // ---------------------------------------------------------------- dice notation
  var TERM = /(\d*)d(\d+)|(\d+)/g;
  function parseDice(text) {
    var s = String(text || '').trim().toLowerCase().replace(/\s+/g, '').replace(/−/g, '-');
    if (!s || !/^[+-]?(\d*d\d+|\d+)([+-](\d*d\d+|\d+))*$/.test(s)) return null;
    var terms = [], mod = 0, sign = 1, i = 0;
    while (i < s.length) {
      var c = s[i];
      if (c === '+') { sign = 1; i++; continue; }
      if (c === '-') { sign = -1; i++; continue; }
      TERM.lastIndex = i;
      var m = TERM.exec(s);
      if (!m || m.index !== i) return null;
      if (m[2]) {
        var n = m[1] ? parseInt(m[1], 10) : 1, sides = parseInt(m[2], 10);
        if (n < 1 || n > 40 || sides < 2 || sides > 1000 || terms.length >= 8) return null;
        terms.push({ n: n, sides: sides, sign: sign });
      } else {
        var k = parseInt(m[3], 10); if (k > 999) return null;
        mod += sign * k;
      }
      i = TERM.lastIndex; sign = 1;
    }
    if (!terms.length && mod === 0) return null;
    return { terms: terms, mod: mod, text: canonical(terms, mod) };
  }
  function canonical(terms, mod) {
    var out = '';
    terms.forEach(function (t, i) { out += (i > 0 || t.sign < 0) ? (t.sign < 0 ? '-' : '+') : ''; out += t.n + 'd' + t.sides; });
    if (mod) out += (mod > 0 ? '+' : '') + mod;
    return out || '0';
  }
  function rollDice(expr, crit) {
    if (typeof expr === 'string') expr = parseDice(expr);
    if (!expr || !expr.terms) return null;
    var groups = expr.terms.map(function (t) {
      var n = crit ? t.n * 2 : t.n, rolls = [];
      for (var i = 0; i < n; i++) rolls.push(1 + Math.floor(Math.random() * t.sides));
      return { sides: t.sides, sign: t.sign, rolls: rolls };
    });
    var total = expr.mod;
    groups.forEach(function (g) { total += g.sign * g.rolls.reduce(function (a, b) { return a + b; }, 0); });
    var text = groups.map(function (g) { return (g.sign < 0 ? '-' : '') + 'd' + g.sides + '[' + g.rolls.join(',') + ']'; }).join(' ') + (expr.mod ? (expr.mod > 0 ? ' +' : ' ') + expr.mod : '') + (crit ? '  CRIT' : '');
    return { total: total, text: text, groups: groups };
  }

  // ---------------------------------------------------------------- coins
  function toCp(p) { return (p.gp || 0) * 100 + (p.sp || 0) * 10 + (p.cp || 0); }
  function fromCp(cp) { cp = Math.max(0, Math.round(cp)); return { gp: Math.floor(cp / 100), sp: Math.floor((cp % 100) / 10), cp: cp % 10 }; }
  function fmtCoins(p) {
    var parts = [];
    if (p.gp) parts.push(p.gp + ' gp'); if (p.sp) parts.push(p.sp + ' sp'); if (p.cp || !parts.length) parts.push((p.cp || 0) + ' cp');
    return parts.join(' ');
  }
  function parseCoins(text) {
    var out = { gp: 0, sp: 0, cp: 0 }, any = false, re = /(\d+)\s*(gp|sp|cp|g|s|c)\b/gi, m;
    while ((m = re.exec(String(text || '')))) { any = true; out[m[2][0].toLowerCase() + 'p'] += parseInt(m[1], 10); }
    if (!any) { var n = parseInt(text, 10); if (!isNaN(n)) { out.gp = n; any = true; } }
    return any ? out : null;
  }
  function splitLoot(coins, n) {
    var total = toCp(coins), share = Math.floor(total / Math.max(1, n)), rem = total - share * n;
    return { share: fromCp(share), remainder: fromCp(rem), n: n };
  }
  function priceIn(text) {
    // "(2 cp)", "(50 gp)", "8 sp" inside a service line
    var m = /\(([^()]*?\d+\s*(?:gp|sp|cp)[^()]*)\)/i.exec(text || '') || /(\d+\s*(?:gp|sp|cp))/i.exec(text || '');
    return m ? parseCoins(m[1]) : null;
  }

  // ---------------------------------------------------------------- initiative and conditions
  var CONDITIONS = ['blinded', 'charmed', 'deafened', 'frightened', 'grappled', 'incapacitated', 'invisible', 'paralysed', 'petrified', 'poisoned', 'prone', 'restrained', 'stunned', 'unconscious', 'concentrating'];
  function dexMod(stats) {
    var b = stats && stats.block;
    if (b && b.abilities && typeof b.abilities.dex === 'number') return Math.floor((b.abilities.dex - 10) / 2);
    if (b && b.traits && typeof b.traits.grace === 'number') return b.traits.grace - 3;
    return 0;
  }
  function d20() { return 1 + Math.floor(Math.random() * 20); }
  function sortOrder(order) {
    return order.slice().sort(function (a, b) { return (b.init - a.init) || (b.bonus - a.bonus) || (a.kind === 'party' ? -1 : 1); });
  }
  function deathSave(ds, roll) {
    // returns a new ds {s, f, status} after a d20 death save
    var o = { s: ds.s || 0, f: ds.f || 0, status: '' };
    if (roll === 20) { o.status = 'revived'; o.s = 0; o.f = 0; return o; }
    if (roll === 1) o.f += 2; else if (roll >= 10) o.s += 1; else o.f += 1;
    if (o.s >= 3) { o.status = 'stable'; } else if (o.f >= 3) { o.status = 'dead'; }
    return o;
  }

  // ---------------------------------------------------------------- session export
  var EVTYPE = { enter: 'movement', clear: 'encounter', solved: 'puzzle', trap: 'trap', loot: 'loot', combat: 'battle', leave: 'movement', table: 'event', wander: 'encounter', secret: 'discovery', quest: 'quest' };
  function yq(s) { return JSON.stringify(String(s == null ? '' : s)); }
  function sessionNote(opts) {
    // opts: instance, session, dungeon {id,name,universe}, party [names], log [{t,text,type,data}], realDate, worldDate {year,day}, notes
    var iid = (opts.instance || 'my-campaign').toLowerCase().replace(/[^a-z0-9-]+/g, '-');
    var nn = ('0' + (opts.session || 1)).slice(-2), k = 0;
    var entries = (opts.log || []).slice().reverse().filter(function (l) { return typeof l === 'object'; });
    var events = [], rolls = [];
    entries.forEach(function (l) {
      if (l.type === 'roll' || l.type === 'table') { rolls.push({ what: l.text, result: String(l.data && l.data.result != null ? l.data.result : '') }); if (l.type === 'roll') return; }
      if (!EVTYPE[l.type]) return;
      k++;
      var ev = { id: iid + '.event.s' + nn + '-e' + ('0' + k).slice(-2), type: EVTYPE[l.type], where: (l.data && l.data.where) || opts.dungeon.id, severity: l.type === 'combat' ? 2 : 1, visibility: 'public', canon: 'local', summary: l.text, deltas: [] };
      if (l.type === 'clear') ev.deltas.push({ entity: l.data.where, field: 'cleared', from: false, to: true });
      if (l.type === 'solved') ev.deltas.push({ entity: l.data.where, field: 'puzzle.' + (l.data.name || 'solved'), from: 'unsolved', to: 'solved' });
      if (l.type === 'loot') ev.deltas.push({ entity: l.data.where, field: 'loot', from: l.data.item || 'present', to: 'taken' });
      if (l.type === 'quest') ev.deltas.push({ entity: l.data.quest, field: 'stage', from: l.data.from, to: l.data.to });
      events.push(ev);
    });
    var y = ['---', 'id: ' + iid + '.session.' + nn, 'kind: session', 'parent: ' + iid + '.campaign', 'campaign: ' + iid, 'adventure: ' + yq(opts.dungeon.name), 'session: ' + (opts.session || 1),
             'real_date: ' + (opts.realDate || new Date().toISOString().slice(0, 10)), 'world_date: { year: ' + (opts.worldDate.year || 0) + ', day: ' + (opts.worldDate.day || 0) + ' }',
             'party: [' + (opts.partyIds || []).join(', ') + ']', 'events:'];
    if (!events.length) y[y.length - 1] = 'events: []';
    events.forEach(function (ev) {
      y.push('  - id: ' + ev.id, '    type: ' + ev.type, '    where: ' + ev.where, '    severity: ' + ev.severity, '    visibility: ' + ev.visibility, '    canon: ' + ev.canon, '    summary: ' + yq(ev.summary));
      if (ev.deltas.length) { y.push('    deltas:'); ev.deltas.forEach(function (d) { y.push('      - { entity: ' + d.entity + ', field: ' + yq(d.field) + ', from: ' + yq(d.from) + ', to: ' + yq(d.to) + ' }'); }); }
      else y.push('    deltas: []');
    });
    y.push(rolls.length ? 'rolls:' : 'rolls: []');
    rolls.forEach(function (r) { y.push('  - { what: ' + yq(r.what) + ', result: ' + yq(r.result) + ' }'); });
    y.push('summary: ' + yq(opts.summary || ('Session ' + (opts.session || 1) + ' in ' + opts.dungeon.name + '.')), '---', '# Session ' + (opts.session || 1) + ': ' + opts.dungeon.name, '');
    y.push('*' + (opts.realDate || new Date().toISOString().slice(0, 10)) + '. Party: ' + (opts.party || []).join(', ') + '.*', '');
    if (opts.notes) y.push(opts.notes, '');
    y.push('## Log', '');
    entries.forEach(function (l) { y.push('- ' + l.t + '  ' + l.text); });
    y.push('', '*Exported from dmScreen. Mark events `canon: proposed` to put them forward for a canon merge; see docs/authoring/Running and Logging a Campaign.md.*');
    return { text: y.join('\n') + '\n', file: 'Session ' + nn + '.md', events: events.length, rolls: rolls.length };
  }
  function journal(opts) {
    var entries = (opts.log || []).slice().reverse();
    var out = ['# ' + opts.dungeon.name + ': session ' + (opts.session || 1), '', '*' + (opts.realDate || new Date().toISOString().slice(0, 10)) + '. ' + (opts.party || []).join(', ') + '.*', ''];
    if (opts.notes) out.push(opts.notes, '');
    var cur = null;
    entries.forEach(function (l) {
      var o = typeof l === 'string' ? { t: l.slice(0, 5), text: l.slice(7), type: '' } : l;
      if (o.type === 'enter' && o.data && o.data.room) { cur = o.data.room; out.push('', '## ' + o.data.room, ''); }
      out.push('- ' + o.t + ' ' + o.text);
    });
    return out.join('\n') + '\n';
  }
  function recap(log, max) {
    var notable = { enter: 1, clear: 1, solved: 1, loot: 1, combat: 1, trap: 1, secret: 1, quest: 1, leave: 1 };
    return (log || []).filter(function (l) { return typeof l === 'object' && notable[l.type]; }).slice(0, max || 6).reverse().map(function (l) { return l.text; });
  }

  window.DMX = { parseDice: parseDice, rollDice: rollDice, toCp: toCp, fromCp: fromCp, fmtCoins: fmtCoins, parseCoins: parseCoins, splitLoot: splitLoot, priceIn: priceIn,
                 CONDITIONS: CONDITIONS, dexMod: dexMod, d20: d20, sortOrder: sortOrder, deathSave: deathSave, sessionNote: sessionNote, journal: journal, recap: recap };
})();
