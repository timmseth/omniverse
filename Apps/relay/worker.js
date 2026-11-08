// omniverse-relay: a Cloudflare Worker that turns a Genesis Table submission into a pull request.
// Secrets (set in Cloudflare, never in this file): GH_TOKEN (fine-grained, timmseth/omniverse only,
// Contents + Pull requests read/write) and TABLE_PASSCODE (shared with the table).
// Deployed by Apps/relay/deploy.sh. See Apps/relay/README.md.

const REPO = 'timmseth/omniverse';
const BASE = 'main';
const MAX_BYTES = 300 * 1024;
const ALLOWED_ORIGINS = ['https://timmseth.github.io', 'http://localhost:8000', 'http://127.0.0.1:8000', 'null'];
const SECRET_KEYS = ['relic', 'truth', 'convergence', 'scribeNotes'];

function cors(origin) {
  const ok = ALLOWED_ORIGINS.includes(origin);
  return {
    'Access-Control-Allow-Origin': ok ? origin : ALLOWED_ORIGINS[0],
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Vary': 'Origin'
  };
}
function json(body, status, origin) {
  return new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json', ...cors(origin) } });
}
function slugify(s) {
  return String(s || '').normalize('NFKD').replace(/[̀-ͯ]/g, '').toLowerCase()
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 40) || 'session';
}
function b64(str) {
  const bytes = new TextEncoder().encode(str);
  let bin = '';
  for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
  return btoa(bin);
}
// Remove anything secret, wherever it sits, in case a client sends it.
function strip(v) {
  if (Array.isArray(v)) return v.map(strip);
  if (v && typeof v === 'object') {
    const o = {};
    for (const [k, x] of Object.entries(v)) if (!SECRET_KEYS.includes(k)) o[k] = strip(x);
    return o;
  }
  return v;
}
async function gh(env, method, path, body) {
  const r = await fetch('https://api.github.com/repos/' + REPO + path, {
    method,
    headers: {
      'Authorization': 'Bearer ' + env.GH_TOKEN,
      'Accept': 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'User-Agent': 'omniverse-relay',
      'Content-Type': 'application/json'
    },
    body: body ? JSON.stringify(body) : undefined
  });
  const data = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error('GitHub ' + method + ' ' + path + ': ' + r.status + ' ' + (data.message || ''));
  return data;
}

export default {
  async fetch(req, env) {
    const origin = req.headers.get('Origin') || 'null';
    const url = new URL(req.url);
    if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors(origin) });
    if (req.method === 'GET') return json({ ok: true, service: 'omniverse-relay', passcode: !!env.TABLE_PASSCODE }, 200, origin);
    if (req.method !== 'POST' || url.pathname !== '/submit') return json({ ok: false, error: 'Not found' }, 404, origin);
    if (!ALLOWED_ORIGINS.includes(origin)) return json({ ok: false, error: 'Submissions are only accepted from the Genesis Table page.' }, 403, origin);

    const raw = await req.text();
    if (raw.length > MAX_BYTES) return json({ ok: false, error: 'Submission too large (limit 300 KB).' }, 413, origin);
    let sub;
    try { sub = JSON.parse(raw); } catch (e) { return json({ ok: false, error: 'Not JSON.' }, 400, origin); }
    if (env.TABLE_PASSCODE && sub.passcode !== env.TABLE_PASSCODE) return json({ ok: false, error: 'Wrong table passcode.' }, 401, origin);
    const ledger = sub.ledger;
    if (!ledger || ledger.format !== 'omniverse-genesis-ledger') return json({ ok: false, error: 'Not a Genesis ledger.' }, 400, origin);
    const author = String(sub.author || '').trim().slice(0, 80);
    if (!author) return json({ ok: false, error: 'Please give your name.' }, 400, origin);

    const clean = strip(ledger);
    const title = String((clean.setup && clean.setup.universe) || sub.title || 'Untitled universe').slice(0, 80);
    const day = new Date().toISOString().slice(0, 10);
    const stamp = Date.now().toString(36);
    const folder = 'Submissions/genesis/' + day + '-' + slugify(title) + '-' + stamp;
    const branch = 'genesis/' + day + '-' + slugify(title) + '-' + stamp;
    const md = String(sub.markdown || '').slice(0, MAX_BYTES);

    try {
      const ref = await gh(env, 'GET', '/git/ref/heads/' + BASE);
      await gh(env, 'POST', '/git/refs', { ref: 'refs/heads/' + branch, sha: ref.object.sha });
      await gh(env, 'PUT', '/contents/' + encodeURI(folder + '/ledger.json'), {
        message: 'Genesis submission: ' + title, branch, content: b64(JSON.stringify(clean, null, 2) + '\n')
      });
      await gh(env, 'PUT', '/contents/' + encodeURI(folder + '/README.md'), {
        message: 'Genesis submission: ' + title + ' (readable ledger)', branch, content: b64(md + '\n')
      });
      const pr = await gh(env, 'POST', '/pulls', {
        title: 'Genesis submission: ' + title,
        head: branch, base: BASE,
        body: 'Submitted from the Genesis Table by **' + author.replace(/[<>@]/g, '') + '**.\n\n'
          + 'Public ledger only; relics and the true Doom stay with the Scribe.\n\n'
          + '- `' + folder + '/ledger.json` (machine-readable)\n- `' + folder + '/README.md` (readable)\n\n'
          + 'Turn it into universe notes with Claude or the Note Wizard, then remove the submission folder.'
      });
      return json({ ok: true, pr: pr.html_url, number: pr.number }, 200, origin);
    } catch (e) {
      return json({ ok: false, error: 'Could not open the pull request. ' + e.message }, 502, origin);
    }
  }
};
