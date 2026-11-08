# omniverse-relay

A Cloudflare Worker that receives a Genesis Table submission and opens a pull request adding it under `Submissions/genesis/`. Live at https://omniverse-relay.mobile-markets.workers.dev (GET returns a health check).

- `worker.js` is the whole relay. It accepts POSTs to `/submit` from the Genesis Table's origin only, checks the table passcode, caps the size at 300 KB, strips secret keys, then creates a branch, two files and a pull request.
- Secrets live in Cloudflare, never in this repo: `GH_TOKEN` (fine-grained, this repository only, Contents and Pull requests read/write; renew yearly) and `TABLE_PASSCODE`.
- The maintainer's local pointer to the token files is `LOCAL-SECRETS.md` at the repo root (gitignored).

To redeploy after editing `worker.js`: upload it as the `omniverse-relay` script with the Cloudflare API (module worker, `main_module: worker.js`), or with `wrangler deploy`. Changing the passcode: set the `TABLE_PASSCODE` secret again.

Limits: Cloudflare free tier (100,000 requests a day); GitHub API limits are far above what a table needs. Spam can only produce pull requests, which a maintainer reviews.
