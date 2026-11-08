# Genesis Table

`genesis-table.html` is a single self-contained page for running a Genesis Session on one shared screen. Published at https://timmseth.github.io/omniverse/genesis.html. See [The Genesis Table](../../docs/getting-started/The%20Genesis%20Table.md).

It saves to the browser's local storage on every change, exports a public ledger (no secrets) and a Scribe backup (everything), imports either, and submits the public ledger to the repository through the relay in `Apps/relay/`, or as a GitHub issue.

The ledger format is `omniverse-genesis-ledger`, version 1: `setup`, `gods` (with `relic` and `avatar`), `acts`, `pacts`, `reckoning`, `gathering`, `common`, `log`. Secret keys (`relic`, `truth`, `convergence`, `scribeNotes`) are removed from every public export and again by the relay.
