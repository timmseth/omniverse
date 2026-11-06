# Governance

## Roles
- **Omniverse maintainers** own the core: `_rules/` (schemas, tools), `Tropes/`, `Rulesets/`, `Apps/`, `docs/`, `.github/`, `CODEOWNERS`, the registry. They review core changes and Universe Joins, and step in for a universe only when its maintainer is unreachable. Currently: @timmseth.
- **Universe maintainers** own `Multiverse/<Universe>/`. They review every change to it, decide canon merges for it, and set its tone and style. A universe may have several; they are listed in its manifest and in `CODEOWNERS`.
- **Contributors** are anyone who opens a pull request. Ownership of what you add stays with you in the git history and the `author` field; the content is released into the public domain like everything else.

## How decisions are made
- **Content in a universe**: the universe's maintainer decides. "Does it fit?" is theirs to answer.
- **Canon merges**: the universe's maintainer accepts, rejects or amends proposed events. A rejection says why in the PR. A Reality Rift (conflict with events merged since the instance's fork point) is resolved by the maintainer, usually by dating the proposed events after the conflicting ones or marking them `rejected`.
- **Core changes** (schemas, tools, trope library, rulesets, CI): an issue first, then a PR reviewed by an Omniverse maintainer. Schema changes that would invalidate existing notes come with the migration.
- **Universe Joins**: an Omniverse maintainer checks the manifest, the licence and that nothing outside the new folder changed; they do not judge the world's quality.
- **Disputes** between a contributor and a universe maintainer: the maintainer's call stands for their universe. The contributor can fork the universe (copy it under a new name as a new Universe Join) if they want to go their own way; that is what the model is for.

## Review standards
Reviewers check fit (tone, placement, level), correctness (validator clean, links resolve, exits reciprocal), and licence (original or compatible). They do not rewrite for taste. Turnaround target: a week. A PR with no response after two weeks may be pinged to Omniverse maintainers.

## Changing a maintainer
A maintainer hands on by a PR changing `CODEOWNERS` and the manifest's `maintainers`. If a universe maintainer has been unreachable for 90 days, an Omniverse maintainer may mark the universe `dormant` and accept a new maintainer by PR.

## Licensing
Two layers. The **framework** (schemas, tools, docs, app, CI, Core glue) is public domain under the Unlicense (`LICENSE`). **Content** is licensed per folder: every universe, every ruleset and `Tropes/` carries a `LICENSE.md` and declares the same licence in its manifest (`licence:`, plus `attribution:` for any licence that asks for credit). The validator fails a PR if they are missing or disagree. Seth's universes and the trope library are CC BY-SA 4.0; a joining universe picks its own licence (default CC BY-SA 4.0). Contributing to a folder means releasing the contribution under that folder's licence; canon merges never cross folders, so they never change licence. Imported material keeps its own terms in its own folder, with the credit line reproduced exactly. Published game systems outside an open licence appear only as the shape of their stat blocks, written in our own words. Plain-English map and the list of allowed ids: [`LICENSING.md`](../../LICENSING.md).

## Conduct
Be kind, be specific, assume good faith. Review the work, not the person. Content that demeans real people or groups is out of scope in any universe. Maintainers may close PRs and issues that break this.
