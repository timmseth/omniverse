# Writing a Trope

The trope library (`Tropes/`) is shared by every universe. A trope is a story pattern, not a thing: *the tavern where it all starts*, *rival adventurers*, *kill ten rats*. A universe uses one by writing a trope instance bound to its own people and places.

## The trope note (`kind: trope`)
`Tropes/<Name>.md`, parent `omniverse`, id `omniverse.trope.<slug>`. Required: `category` (character, place, plot, item, monster, encounter, structure, party, meta, setting), `beats` (three to five: the shape the pattern always takes), `hooks` (three to five: the reasons a party gets pulled in, as short slugs or phrases). Add `roles`, `aliases`, `subverts`, `related`, `examples`. The body: a paragraph on the pattern, a list of variations, a list of related tropes, and an Instances section that stays "none yet" until a universe links back.

Write the pattern, not an example of it. "The wizard is secluded, powerful and eccentric" is a beat; "Marlowe lives in a rented tower" is an instance.

## The instance (`kind: trope_instance`)
`Multiverse/<Universe>/Trope Instances/<Name>.md`, `instance_of` the trope, `bound_to` (a map of role to id: person, place, item, faction), `twist` (what this universe does with it), `stakes`, `hooks_offered` (which of the trope's hooks are live here). The twist is the whole point: the same trope in a parody and in a grim universe should read nothing alike.

## Adding to the library
The library is core, owned by the Omniverse maintainers. New tropes go in by pull request with a short justification: what pattern it names that the existing fifty do not. Keep names short and canonical (`Rival Adventurers`, not `The Rival Adventuring Party Who Always Shows Up`); put the alternatives in `aliases`. If a trope's name would clash with another note's (a monster called Mimic and a trope called Mimic), prefix the trope with "The".
