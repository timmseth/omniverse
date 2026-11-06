# Licensing, in plain English

The Omniverse is two things with two different licences.

## 1. The framework is public domain (Unlicense)

The machinery: schemas in `_rules/schemas/`, tools in `_rules/tools/`, skills, the docs, the CI, the generated indexes, the DM Screen app in `Apps/`, and the Core ruleset glue. Anyone may copy it, change it, sell it or build a competing project on it, with no credit required. The full text is in [`LICENSE`](LICENSE).

Why: the point of the framework is to be reused. A fork that keeps the same shapes can still exchange universes with this one.

## 2. Content is licensed per folder

Every universe, every ruleset and the trope library carries its **own** `LICENSE.md`, and its manifest (`_universe.md`, `<Ruleset>.md`) declares the same licence in a `licence:` field. The validator fails a pull request if the file is missing, the two disagree, or a credit line is needed and absent.

| Folder | Licence | What it means |
|---|---|---|
| `Multiverse/Tropelandia/` | CC BY-SA 4.0 | Use, remix, even sell — but credit the Omniverse and keep your version under the same licence. |
| `Multiverse/Ashfall/` | CC BY-SA 4.0 | Same. |
| `Tropes/` | CC BY-SA 4.0 | Same. (The tropes themselves are common property; the write-ups are ours.) |
| `Rulesets/Six Sides/` | CC BY-SA 4.0 | Same. An original system. |
| `Rulesets/dnd5e/` | CC BY 4.0 | SRD 5.1 material from Wizards of the Coast; credit line required, nothing outside the SRD allowed in. |
| `Rulesets/Core/` | Unlicense | Framework glue. |
| `Multiverse/<yours>/` | your choice | Declared when you join; see below. |

A universe's licence covers everything inside its folder, including campaign logs under `Instances/`. **Contributing to a universe means releasing your contribution under that universe's licence** (the usual "inbound = outbound" rule). Canon merges from an instance into its universe never change licence because they never leave the folder.

## Choosing a licence for your universe

Pick one of these for `licence:` in `_universe.md` and say the same thing in your `LICENSE.md` (`_rules/tools/new_universe.py --licence` writes both):

| Id | Plain English | Use it when |
|---|---|---|
| `CC-BY-SA-4.0` | Credit me, and keep remixes open under the same licence. | **Default.** You want your world reused but never locked up. |
| `CC-BY-4.0` | Credit me; remixes may be closed. | You want maximum reach and don't mind closed remixes. |
| `CC0-1.0` / `Unlicense` | No strings, no credit. | You want it to be public domain like the framework. |
| `CC-BY-NC-4.0`, `CC-BY-NC-SA-4.0` | Credit me; no commercial use (NC), and/or keep it open (SA). | You are importing material that came with these terms (e.g. Eclipse Phase, the Ironlands). Nobody downstream may sell it. |
| `CC-BY-3.0` | Older CC-BY. | Importing Fate Worlds of Adventure or other CC-BY 3.0 material. |
| `OGL-1.0a`, `ORC-1.0` | Open gaming licences. | Importing rules content published under them. |
| `other` | Anything else; put the link in `licence_url`. | A publisher's community-use policy, a bespoke permission, a fan-content policy. Expect reviewers to read it. |

Rules of thumb:

- **Imported material keeps its own licence.** You cannot make CC-BY-SA content public domain, or CC-BY-NC content commercial, by putting it here. Give it its own universe (or ruleset) folder so its terms stay contained; never mix it into a folder with a looser licence.
- **Credit lines are mandatory** for every licence except Unlicense and CC0. Put the exact wording the source asks for in `attribution:`; the validator checks it is there, and the app and site reproduce it.
- **Never paste book text.** Openly licensed rules (the SRD) are fine with their credit line; everything else is modelled in original words. Trademarks (a character name, a product name) are a separate problem from copyright: public-domain stories can still have trademarked names, so rename when in doubt.
- **Doubt means "other" plus a link, and a note in the PR.** Reviewers would rather read a licence than guess.

## What this is not

This page is a map, not legal advice. The licences themselves are at the links in each `LICENSE.md`.
