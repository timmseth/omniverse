# The Genesis Table

A web page for running a [Genesis Session](../authoring/Running%20a%20Genesis%20Session.md) on one shared screen: https://timmseth.github.io/omniverse/genesis.html. Put a laptop or TV in the middle of the table and go round entering things together.

## What it does
- Walks the night in order: Setup, Gods, World, Turns, Deals, Relics, Reckoning, Mortals, Ledger, Save & submit.
- Keeps score: whose turn it is (snake order), how many rounds for your table size, and the Entropy owed, always in the header.
- Runs the Reckoning: pick a Scale, a Form and Features, and it shows what is spent and what carries forward.
- Hides secrets: relics are blurred until their god chooses to look, and with a Doom-Keeper the Doom menu is blurred for the table.
- Saves in the browser on every keystroke, so a reload or crash loses nothing. It stays on that device and that browser only.

## Saving and sending
| Button | Contains secrets? | Use it to |
|---|---|---|
| Download public ledger (.json) | no | give it to Claude to build the universe, or add it to the repo yourself |
| Download readable ledger (.md) | no | read, print or share |
| Download Scribe backup | yes | keep everything; move the session to another computer with Import |
| Submit | no | open a pull request on the Omniverse repository, no GitHub account needed; needs your name and the table passcode from your Scribe |
| Or open a GitHub issue | no | the same, through your own GitHub account |

Submissions land in `Submissions/genesis/` as a pull request for the maintainer to review. Secrets are stripped by the page and again by the relay ([Apps/relay](../../Apps/relay/README.md)).

## Limits
- One screen. Phones joining live would need a sync service; not built yet.
- Local storage belongs to one browser. Clearing site data or switching browsers starts empty: take a Scribe backup now and then.
- The Note Wizard, not this page, writes finished universe notes. The ledger is the raw record of the night.
