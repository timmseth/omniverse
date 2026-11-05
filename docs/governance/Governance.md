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
This repository is released into the public domain under the Unlicense (`LICENSE`). By contributing you agree your contribution is released the same way. Material you do not own must be under a licence that allows this (CC0, public domain) or be referenced by shape only, never pasted. Published game systems appear only as the shape of their stat blocks and the numbers in them, written in our own words.

## Conduct
Be kind, be specific, assume good faith. Review the work, not the person. Content that demeans real people or groups is out of scope in any universe. Maintainers may close PRs and issues that break this.
