/* model3d.js: the dollhouse view. Raw WebGL, no dependencies.
   Usage: var m = Model3D.create(canvas, labelLayer, { onPick: function(roomId){} });
          m.setDungeon(d, runState, floor); m.update(runState); m.destroy();
   Rooms are slabs with walls (roof off), gaps where exits are, corridors between rooms,
   stair markers for up/down, an arch at the way out. One finger orbits, two fingers pinch
   and pan. Tap a room to pick it. */
(function () {
  'use strict';

  var CELL = 9, MAXW = 7, WALL_H = 2.6, WALL_T = 0.3, FLOOR_T = 0.35, FLOOR_GAP = 6.5;
  var COLORS = {
    floor: [0.47, 0.41, 0.33], visited: [0.62, 0.54, 0.38], cleared: [0.34, 0.52, 0.36], cur: [0.89, 0.65, 0.18],
    wall: [0.66, 0.63, 0.70], secret: [0.36, 0.55, 0.78], corridor: [0.30, 0.27, 0.33], stair: [0.80, 0.72, 0.50],
    out: [0.89, 0.65, 0.18], token: [0.95, 0.30, 0.25], ghost: [0.28, 0.26, 0.33]
  };
  var DIRV = { n: [0, -1], s: [0, 1], e: [1, 0], w: [-1, 0], ne: [1, -1], nw: [-1, -1], se: [1, 1], sw: [-1, 1] };

  var VS = 'attribute vec3 p;attribute vec3 n;attribute vec4 c;uniform mat4 mvp;uniform vec3 light;varying vec4 vc;varying float vl;' +
    'void main(){gl_Position=mvp*vec4(p,1.0);vc=c;vl=0.55+0.45*max(dot(normalize(n),normalize(light)),0.0);}';
  var FS = 'precision mediump float;varying vec4 vc;varying float vl;uniform float unlit;void main(){float l=mix(vl,1.0,unlit);gl_FragColor=vec4(vc.rgb*l,vc.a);}';

  // ---------------------------------------------------------------- matrices
  function perspective(fov, aspect, near, far) {
    var f = 1 / Math.tan(fov / 2), nf = 1 / (near - far);
    return [f / aspect, 0, 0, 0, 0, f, 0, 0, 0, 0, (far + near) * nf, -1, 0, 0, 2 * far * near * nf, 0];
  }
  function lookAt(eye, at, up) {
    var z = norm3(sub3(eye, at)), x = norm3(cross3(up, z)), y = cross3(z, x);
    return [x[0], y[0], z[0], 0, x[1], y[1], z[1], 0, x[2], y[2], z[2], 0, -dot3(x, eye), -dot3(y, eye), -dot3(z, eye), 1];
  }
  function mul4(a, b) {
    var o = new Array(16);
    for (var i = 0; i < 4; i++) for (var j = 0; j < 4; j++) {
      o[j * 4 + i] = a[i] * b[j * 4] + a[4 + i] * b[j * 4 + 1] + a[8 + i] * b[j * 4 + 2] + a[12 + i] * b[j * 4 + 3];
    }
    return o;
  }
  function xform(m, v) {
    var x = v[0], y = v[1], z = v[2];
    var w = m[3] * x + m[7] * y + m[11] * z + m[15];
    return [(m[0] * x + m[4] * y + m[8] * z + m[12]) / w, (m[1] * x + m[5] * y + m[9] * z + m[13]) / w, (m[2] * x + m[6] * y + m[10] * z + m[14]) / w, w];
  }
  function sub3(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
  function dot3(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
  function cross3(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  function norm3(a) { var l = Math.sqrt(dot3(a, a)) || 1; return [a[0] / l, a[1] / l, a[2] / l]; }

  // ---------------------------------------------------------------- geometry
  function Mesh() { this.v = []; this.ids = []; }
  Mesh.prototype.box = function (cx, cy, cz, sx, sy, sz, col, alpha, id) {
    // axis-aligned box centred at (cx,cy,cz) with full sizes sx,sy,sz; y is up
    var x0 = cx - sx / 2, x1 = cx + sx / 2, y0 = cy - sy / 2, y1 = cy + sy / 2, z0 = cz - sz / 2, z1 = cz + sz / 2;
    var faces = [
      [[x0, y1, z0], [x0, y1, z1], [x1, y1, z1], [x1, y1, z0], [0, 1, 0]],      // top
      [[x0, y0, z1], [x0, y0, z0], [x1, y0, z0], [x1, y0, z1], [0, -1, 0]],     // bottom
      [[x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1], [0, 0, 1]],      // front (+z)
      [[x1, y0, z0], [x0, y0, z0], [x0, y1, z0], [x1, y1, z0], [0, 0, -1]],     // back
      [[x1, y0, z1], [x1, y0, z0], [x1, y1, z0], [x1, y1, z1], [1, 0, 0]],      // right
      [[x0, y0, z0], [x0, y0, z1], [x0, y1, z1], [x0, y1, z0], [-1, 0, 0]]      // left
    ];
    var a = alpha == null ? 1 : alpha;
    for (var f = 0; f < 6; f++) {
      var q = faces[f], nrm = q[4];
      var tri = [q[0], q[1], q[2], q[0], q[2], q[3]];
      for (var t = 0; t < 6; t++) {
        var p = tri[t];
        this.v.push(p[0], p[1], p[2], nrm[0], nrm[1], nrm[2], col[0], col[1], col[2], a);
        this.ids.push(id || 0);
      }
    }
  };

  function parseSize(s) {
    // "30 x 20 ft" -> [w, d] in grid units (5 ft = 1 unit), capped to the cell
    var m = /(\d+)\s*(?:x|by|×)\s*(\d+)/i.exec(s || '');
    var w = m ? parseInt(m[1], 10) / 5 : 4, d = m ? parseInt(m[2], 10) / 5 : 4;
    return [Math.max(2.5, Math.min(MAXW, w)), Math.max(2.5, Math.min(MAXW, d))];
  }

  function buildScene(d, run, selFloor) {
    var mesh = new Mesh(), labels = [];
    var byId = {}; d.rooms.forEach(function (r) { byId[r.id] = r; });
    var minx = 1e9, maxx = -1e9, minz = 1e9, maxz = -1e9;
    d.rooms.forEach(function (r) { minx = Math.min(minx, r.pos[0]); maxx = Math.max(maxx, r.pos[0]); minz = Math.min(minz, r.pos[1]); maxz = Math.max(maxz, r.pos[1]); });
    var ox = (minx + maxx) / 2, oz = (minz + maxz) / 2;
    var floors = {};
    d.rooms.forEach(function (r) { floors[r.floor] = 1; });
    var fl = Object.keys(floors).map(Number).sort(function (a, b) { return a - b; });
    var fy = {}; fl.forEach(function (f, i) { fy[f] = i * FLOOR_GAP; });
    var idIndex = {}, nextId = 1;
    function center(r) { return [(r.pos[0] - ox) * CELL, fy[r.floor], (r.pos[1] - oz) * CELL]; }
    var drawn = {};
    d.rooms.forEach(function (r) {
      var c = center(r), sz = parseSize(r.size), w = sz[0], dd = sz[1];
      var ghost = r.floor !== selFloor;
      var alpha = ghost ? 0.22 : 1;
      var col = COLORS.floor;
      if (run && run.cur === r.id) col = COLORS.cur; else if (run && run.cleared[r.id]) col = COLORS.cleared; else if (run && run.visited[r.id]) col = COLORS.visited;
      if (ghost) col = COLORS.ghost;
      var id = nextId++; idIndex[id] = r.id;
      mesh.box(c[0], c[1] + FLOOR_T / 2, c[2], w, FLOOR_T, dd, col, alpha, id);
      // walls with gaps: n (-z), s (+z), e (+x), w (-x)
      var gaps = { n: null, s: null, e: null, w: null, outside: [] };
      r.exits.forEach(function (e) {
        if (e.to === 'outside') { gaps.outside.push(e.dir); return; }
        if (gaps.hasOwnProperty(e.dir)) gaps[e.dir] = e;
      });
      var wcol = ghost ? COLORS.ghost : COLORS.wall, wy = c[1] + FLOOR_T + WALL_H / 2;
      function wallSeg(axis, pos, from, to) { // axis 'x': wall runs along x at z=pos; 'z': along z at x=pos
        if (to - from < 0.05) return;
        if (axis === 'x') mesh.box((from + to) / 2, wy, pos, to - from, WALL_H, WALL_T, wcol, alpha, id);
        else mesh.box(pos, wy, (from + to) / 2, WALL_T, WALL_H, to - from, wcol, alpha, id);
      }
      function wallWithGap(axis, pos, from, to, gap) {
        var mid = (from + to) / 2, gw = 1.2;
        if (!gap) { wallSeg(axis, pos, from, to); return; }
        wallSeg(axis, pos, from, mid - gw / 2); wallSeg(axis, pos, mid + gw / 2, to);
        var st = (run && run.ex && run.ex[r.id + '|' + gap.dir]) || gap.state;
        if (gap.kind === 'secret' || st === 'hidden') {
          // a secret door: a thin translucent panel in the gap
          if (axis === 'x') mesh.box(mid, wy, pos, gw, WALL_H, WALL_T * 0.6, COLORS.secret, ghost ? 0.2 : 0.45, id);
          else mesh.box(pos, wy, mid, WALL_T * 0.6, WALL_H, gw, COLORS.secret, ghost ? 0.2 : 0.45, id);
        } else if (st === 'locked' || st === 'barred' || st === 'stuck' || st === 'rubble') {
          var lc = st === 'rubble' ? [0.45, 0.42, 0.40] : [0.75, 0.30, 0.28];
          if (axis === 'x') mesh.box(mid, c[1] + FLOOR_T + 0.5, pos, gw, 1.0, WALL_T * 0.8, lc, alpha, id);
          else mesh.box(pos, c[1] + FLOOR_T + 0.5, mid, WALL_T * 0.8, 1.0, gw, lc, alpha, id);
        }
      }
      wallWithGap('x', c[2] - dd / 2, c[0] - w / 2, c[0] + w / 2, gaps.n);
      wallWithGap('x', c[2] + dd / 2, c[0] - w / 2, c[0] + w / 2, gaps.s);
      wallWithGap('z', c[0] + w / 2, c[2] - dd / 2, c[2] + dd / 2, gaps.e);
      wallWithGap('z', c[0] - w / 2, c[2] - dd / 2, c[2] + dd / 2, gaps.w);
      // corridors to neighbours on the same floor; stairs for u/d; arch for outside
      r.exits.forEach(function (e) {
        var t = byId[e.to];
        if (e.dir === 'u' || e.dir === 'd') {
          var sy = c[1] + FLOOR_T + 0.3;
          for (var s = 0; s < 4; s++) mesh.box(c[0] + w / 2 - 1.2, sy + s * 0.25, c[2] - dd / 2 + 0.6 + s * 0.35, 1.2, 0.2, 0.3, COLORS.stair, alpha, id);
          return;
        }
        if (e.to === 'outside') {
          var v = DIRV[e.dir] || [0, 1];
          mesh.box(c[0] + v[0] * (w / 2 + 0.6), c[1] + FLOOR_T + WALL_H + 0.3, c[2] + v[1] * (dd / 2 + 0.6), v[0] ? 0.4 : 1.8, 0.3, v[1] ? 0.4 : 1.8, COLORS.out, alpha, id);
          return;
        }
        if (!t || t.floor !== r.floor) return;
        var k = [r.id, t.id].sort().join('~');
        if (drawn[k]) return; drawn[k] = 1;
        var c2 = center(t);
        var dx = c2[0] - c[0], dz = c2[2] - c[2], len = Math.sqrt(dx * dx + dz * dz);
        // corridor as a chain of small slabs so diagonals work too
        var n = Math.max(2, Math.round(len / 1.0));
        for (var i = 1; i < n; i++) {
          var f = i / n;
          mesh.box(c[0] + dx * f, c[1] + FLOOR_T / 2 - 0.02, c[2] + dz * f, 1.3, FLOOR_T * 0.8, 1.3, ghost ? COLORS.ghost : COLORS.corridor, ghost ? 0.18 : 0.9, 0);
        }
      });
      // party token
      if (run && run.cur === r.id) {
        var ty = c[1] + FLOOR_T;
        mesh.box(c[0], ty + 0.35, c[2], 1.0, 0.7, 1.0, COLORS.token, 1, id);
        mesh.box(c[0], ty + 1.1, c[2], 0.5, 0.8, 0.5, COLORS.token, 1, id);
      }
      labels.push({ id: r.id, code: r.code, name: r.name, p: [c[0], c[1] + FLOOR_T + 0.05, c[2]], ghost: ghost, cur: run && run.cur === r.id });
    });
    var spanx = (maxx - minx + 1) * CELL, spanz = (maxz - minz + 1) * CELL, spany = (fl.length - 1) * FLOOR_GAP;
    var radius = Math.sqrt(spanx * spanx + spanz * spanz) / 2 + spany * 0.3;
    return { mesh: mesh, labels: labels, idIndex: idIndex, radius: Math.max(radius, 8), center: [0, fy[selFloor] != null ? fy[selFloor] : (fl.length - 1) * FLOOR_GAP / 2, 0], floors: fl };
  }

  // ---------------------------------------------------------------- renderer
  function create(canvas, labelLayer, opts) {
    opts = opts || {};
    var gl = canvas.getContext('webgl', { antialias: true, alpha: false, preserveDrawingBuffer: true }) || canvas.getContext('experimental-webgl');
    if (!gl) return null;
    var prog = gl.createProgram();
    function sh(type, src) {
      var s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error('shader: ' + gl.getShaderInfoLog(s));
      gl.attachShader(prog, s);
    }
    try {
      sh(gl.VERTEX_SHADER, VS); sh(gl.FRAGMENT_SHADER, FS); gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error('link: ' + gl.getProgramInfoLog(prog));
    } catch (e) { if (window.console) console.error('Model3D ' + e.message); return null; }
    gl.useProgram(prog);
    var aP = gl.getAttribLocation(prog, 'p'), aN = gl.getAttribLocation(prog, 'n'), aC = gl.getAttribLocation(prog, 'c');
    var uMVP = gl.getUniformLocation(prog, 'mvp'), uLight = gl.getUniformLocation(prog, 'light'), uFlat = gl.getUniformLocation(prog, 'unlit');
    var buf = gl.createBuffer(), pickBuf = gl.createBuffer();
    gl.enable(gl.DEPTH_TEST); gl.enable(gl.BLEND); gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    var state = { scene: null, d: null, run: null, floor: 0, yaw: 0.7, pitch: 0.95, dist: 40, pan: [0, 0, 0], count: 0, pickCount: 0, dirty: true, raf: 0 };
    var M = null;

    function upload() {
      var s = state.scene; if (!s) return;
      var v = new Float32Array(s.mesh.v);
      gl.bindBuffer(gl.ARRAY_BUFFER, buf); gl.bufferData(gl.ARRAY_BUFFER, v, gl.STATIC_DRAW);
      state.count = s.mesh.v.length / 10;
      // pick buffer: same positions, colour = id
      var pv = new Float32Array(state.count * 10);
      for (var i = 0; i < state.count; i++) {
        var id = s.mesh.ids[i];
        for (var k = 0; k < 6; k++) pv[i * 10 + k] = v[i * 10 + k];
        pv[i * 10 + 6] = ((id >> 16) & 255) / 255; pv[i * 10 + 7] = ((id >> 8) & 255) / 255; pv[i * 10 + 8] = (id & 255) / 255; pv[i * 10 + 9] = id ? 1 : 0;
      }
      gl.bindBuffer(gl.ARRAY_BUFFER, pickBuf); gl.bufferData(gl.ARRAY_BUFFER, pv, gl.STATIC_DRAW);
    }
    function bind(b) {
      gl.bindBuffer(gl.ARRAY_BUFFER, b);
      gl.enableVertexAttribArray(aP); gl.vertexAttribPointer(aP, 3, gl.FLOAT, false, 40, 0);
      gl.enableVertexAttribArray(aN); gl.vertexAttribPointer(aN, 3, gl.FLOAT, false, 40, 12);
      gl.enableVertexAttribArray(aC); gl.vertexAttribPointer(aC, 4, gl.FLOAT, false, 40, 24);
    }
    function camera() {
      var s = state.scene, c = s ? s.center : [0, 0, 0];
      var at = [c[0] + state.pan[0], c[1] + state.pan[1], c[2] + state.pan[2]];
      var eye = [at[0] + state.dist * Math.cos(state.pitch) * Math.sin(state.yaw), at[1] + state.dist * Math.sin(state.pitch), at[2] + state.dist * Math.cos(state.pitch) * Math.cos(state.yaw)];
      var w = canvas.width, h = canvas.height;
      return mul4(perspective(0.9, w / Math.max(1, h), 0.5, 1000), lookAt(eye, at, [0, 1, 0]));
    }
    function resize() {
      var r = canvas.getBoundingClientRect(), dpr = Math.min(2, window.devicePixelRatio || 1);
      var w = Math.max(1, Math.round(r.width * dpr)), h = Math.max(1, Math.round(r.height * dpr));
      if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; state.dirty = true; }
    }
    function draw() {
      state.raf = 0;
      if (!state.scene) return;
      resize();
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0.082, 0.075, 0.102, 1); gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      M = camera();
      gl.uniformMatrix4fv(uMVP, false, new Float32Array(M)); gl.uniform3f(uLight, 0.4, 1.0, 0.6); gl.uniform1f(uFlat, 0);
      bind(buf); gl.drawArrays(gl.TRIANGLES, 0, state.count);
      placeLabels();
      state.dirty = false;
    }
    function placeLabels() {
      if (!labelLayer || !state.scene) return;
      var r = canvas.getBoundingClientRect();
      var html = '';
      state.scene.labels.forEach(function (l) {
        var p = xform(M, l.p);
        if (p[3] <= 0) return;
        var x = (p[0] * 0.5 + 0.5) * r.width, y = (1 - (p[1] * 0.5 + 0.5)) * r.height;
        html += '<div class="m3label' + (l.ghost ? ' ghost' : '') + (l.cur ? ' cur' : '') + '" data-act="peek3d" data-r="' + l.id + '" style="left:' + x.toFixed(0) + 'px;top:' + y.toFixed(0) + 'px">' + l.code + '</div>';
      });
      labelLayer.innerHTML = html;
    }
    function request() { if (!state.raf) state.raf = requestAnimationFrame(draw); }
    function pick(px, py) {
      // render ids into the same canvas, read one pixel, then redraw normally
      if (!state.scene) return null;
      resize();
      var dpr = canvas.width / Math.max(1, canvas.getBoundingClientRect().width);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.disable(gl.BLEND);
      gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      gl.uniformMatrix4fv(uMVP, false, new Float32Array(camera())); gl.uniform1f(uFlat, 1);
      bind(pickBuf); gl.drawArrays(gl.TRIANGLES, 0, state.count);
      var out = new Uint8Array(4);
      gl.readPixels(Math.round(px * dpr), canvas.height - Math.round(py * dpr), 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, out);
      gl.enable(gl.BLEND);
      state.dirty = true; request();
      var id = (out[0] << 16) | (out[1] << 8) | out[2];
      return out[3] ? (state.scene.idIndex[id] || null) : null;
    }

    // ---- input
    var touches = {}, last = null, moved = 0, pinch0 = 0, dist0 = 0, mid0 = null, pan0 = null;
    function tp(e) { var r = canvas.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; }
    function onDown(e) {
      e.preventDefault();
      var pts = e.touches ? Array.prototype.slice.call(e.touches).map(tp) : [tp(e)];
      touches.n = pts.length; moved = 0;
      if (pts.length === 1) { last = pts[0]; }
      else if (pts.length >= 2) {
        dist0 = Math.hypot(pts[0][0] - pts[1][0], pts[0][1] - pts[1][1]); pinch0 = state.dist;
        mid0 = [(pts[0][0] + pts[1][0]) / 2, (pts[0][1] + pts[1][1]) / 2]; pan0 = state.pan.slice();
      }
    }
    function onMove(e) {
      if (!touches.n) return;
      e.preventDefault();
      var pts = e.touches ? Array.prototype.slice.call(e.touches).map(tp) : [tp(e)];
      if (pts.length === 1 && last) {
        var dx = pts[0][0] - last[0], dy = pts[0][1] - last[1];
        moved += Math.abs(dx) + Math.abs(dy);
        state.yaw -= dx * 0.008; state.pitch = Math.max(0.25, Math.min(1.5, state.pitch + dy * 0.006));
        last = pts[0];
      } else if (pts.length >= 2) {
        var dd = Math.hypot(pts[0][0] - pts[1][0], pts[0][1] - pts[1][1]);
        state.dist = Math.max(8, Math.min(200, pinch0 * (dist0 / Math.max(1, dd))));
        var mid = [(pts[0][0] + pts[1][0]) / 2, (pts[0][1] + pts[1][1]) / 2];
        var sx = Math.sin(state.yaw), cx = Math.cos(state.yaw), k = state.dist * 0.0022;
        var mx = (mid[0] - mid0[0]) * k, mz = (mid[1] - mid0[1]) * k;
        state.pan = [pan0[0] - (mx * cx - mz * sx * 0), pan0[1], pan0[2] - (mz * cx * 0 + mx * sx)];
        state.pan = [pan0[0] - mx * cx + mz * sx, pan0[1], pan0[2] + mx * sx + mz * cx];
        moved += 10;
      }
      request();
    }
    function onUp(e) {
      if (!touches.n) return;
      var wasTap = moved < 8 && last;
      var p = last;
      touches.n = (e.touches && e.touches.length) || 0;
      if (wasTap && p && opts.onPick) {
        var id = pick(p[0], p[1]);
        if (id) opts.onPick(id);
      }
      if (!touches.n) last = null;
    }
    function onWheel(e) { e.preventDefault(); state.dist = Math.max(8, Math.min(200, state.dist * (e.deltaY > 0 ? 1.1 : 0.9))); request(); }
    canvas.addEventListener('touchstart', onDown, { passive: false }); canvas.addEventListener('touchmove', onMove, { passive: false });
    canvas.addEventListener('touchend', onUp); canvas.addEventListener('touchcancel', onUp);
    canvas.addEventListener('mousedown', onDown); window.addEventListener('mousemove', onMove); window.addEventListener('mouseup', onUp);
    canvas.addEventListener('wheel', onWheel, { passive: false });

    var api = {
      setDungeon: function (d, run, floor) {
        state.d = d; state.run = run; state.floor = floor;
        state.scene = buildScene(d, run, floor); upload();
        state.dist = Math.max(12, state.scene.radius / Math.tan(0.45) * 0.85); state.pan = [0, 0, 0]; state.pitch = 0.95; state.yaw = 0.7;
        request();
      },
      update: function (run, floor) {
        state.run = run; if (floor != null) state.floor = floor;
        if (state.d) { state.scene = buildScene(state.d, run, state.floor); upload(); request(); }
      },
      setFloor: function (f) { api.update(state.run, f); },
      floors: function () { return state.scene ? state.scene.floors : []; },
      redraw: request,
      destroy: function () {
        window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp);
        if (state.raf) cancelAnimationFrame(state.raf);
        var ext = gl.getExtension('WEBGL_lose_context'); if (ext) ext.loseContext();
      }
    };
    return api;
  }

  window.Model3D = { create: create, parseSize: parseSize, buildScene: buildScene };
})();
