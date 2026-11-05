---
id: omniverse.ruleset.six-sides
kind: ruleset
name: Six Sides
parent: omniverse
status: usable
version: 0.1.0
owner: timmseth
licence: Unlicense (public domain); an original system
source: original
edition: '0.1'
dice: Roll a pool of d6 equal to a trait; every 5 or 6 is a hit; beat the difficulty.
provides:
  stat_schema: Four traits (Body, Wits, Nerve, Grace) rated 1 to 5 dice; Harm boxes 1 to 6; Difficulty 1 to 4 (hits needed to harm); Edge points; Moves (named things it does).
  power_function: Omni power = 4 x (sum of traits) + 6 x harm + 5 x difficulty, capped at 100. A 2/2/2/2 villager with 2 harm and difficulty 1 is 49; a 5/4/4/3 horror with 6 harm and difficulty 4 is 100.
  offstage_resolution: Each side rolls its best relevant trait once with a recorded seed; hits minus the other's difficulty is the margin; the higher margin wins, ties go to the defender. Margin 3 or more is decisive (the loser is out); less is a setback (one harm, or a loss of position).
  progression: After a session in which a character failed a roll that mattered, raise one trait by one die (max 5) or gain a Move. Harm boxes rise by one at 3 and 5 Moves.
  injuries: 'Harm fills boxes. The last box is ''out'': dying, captured or broken, the table decides. Rest clears one box a night; a healer clears two.'
stat_mapping:
  omni: see power_function
  from_dnd5e: Body = clamp(round((STRmod + CONmod)/2 + 3), 1, 5); Wits = clamp(round((INTmod + WISmod)/2 + 3), 1, 5); Nerve = clamp(round(CHAmod + 3), 1, 5); Grace = clamp(round(DEXmod + 3), 1, 5); Harm = clamp(ceil(HP / 15), 1, 6); Difficulty = clamp(round((AC - 10) / 3), 1, 4); each 5e action becomes a Move.
  to_dnd5e: HP = Harm x 15; AC = 10 + Difficulty x 3; ability modifier = trait - 3; attack bonus = Body or Grace; damage = Body d6.
tags:
- ruleset
summary: 'A light d6-pool system: four traits, hits on 5+, harm boxes. Written to prove the Omniverse is system-agnostic.'
---
# Six Sides

A light system for universes that want fast, grim, fair play. Everything is a pool of six-sided dice.

## Traits
Four traits, each 1 to 5 dice: **Body** (strength, toughness, violence), **Wits** (knowledge, perception, craft), **Nerve** (will, presence, fear), **Grace** (speed, stealth, precision). A new character has 2 in each and two points to add. Nothing goes above 5.

## Rolling
Say what you do; the table names a trait and a difficulty (1 easy, 2 hard, 3 desperate, 4 impossible). Roll dice equal to the trait. Every **5 or 6 is a hit**. Hits at or above the difficulty: you did it. Short by one: you did it at a cost. Short by more: you did not, and something happens. Sixes beyond what you needed are **extra**: more effect, more speed, a secret learned.

## Harm
Characters have **Harm boxes** (3 for a new character). Taking harm fills a box; a blow from something with more Body than your Grace fills two. The last box is **out**. Monsters have a **Difficulty**: hits needed to harm them at all. Rest clears one box a night.

## Edge
Each character has 1 Edge, regained when they play to their flaw. Spend Edge to re-roll any dice that missed, once.

## Moves
Named things a character or creature does that break a rule: "Second Wind: clear a box once per fight", "Night Eyes: no penalty in dark". A new character picks one.

## Off-stage
When two things of known traits meet off-screen, each rolls its best relevant trait once (seeded), subtract the other's difficulty, higher margin wins, ties to the defender. Margin 3 or more is decisive.

## Progression
After a session in which you failed a roll that mattered, raise a trait by one die or take a Move.

## Stat mapping
See `stat_mapping` in the frontmatter for the D&D 5e conversion both ways. It is approximate by design; a converted monster should be re-read for tone.
