---
id: ashfall.room.the-cold-vault.06-the-counter
kind: room
name: The Counter
number: 6
code: CVT-06
parent: ashfall.dungeon.the-cold-vault
dungeon: ashfall.dungeon.the-cold-vault
universe: ashfall
light: bright
size: 30 x 30 ft
exits:
- dir: s
  to: ashfall.room.the-cold-vault.05-the-queue
  kind: archway
  state: open
  note: ''
- dir: n
  to: ashfall.room.the-cold-vault.07-the-door-in-the-dark
  kind: portal
  state: locked
  note: a door that is also a dark
read_aloud: A counter of black stone, a bell that does not ring, a ledger the size of a door. Behind the counter sits something large and patient with too many hands, every one of them holding a pen. It looks up. It smiles. It asks whether you have an appointment.
features:
- The ledger lists every dead person in Ashfall, and the living of Lastlight in a separate column headed PENDING.
- The bell, if rung, summons the next in the queue. The next is Kettle's number.
encounters:
- name: The Counting Thing
  monsters:
  - ref: ashfall.monster.the-counting-thing
    count: 1
  tactics: Does not fight unless refused. Offers the party numbers. If attacked, Numbers the attacker first. If the ledger is touched, every hand stops writing and the lights go out in the Queue.
traps: []
puzzles:
- name: The Appointment
  description: The Thing will not let anyone through the door behind it without an appointment. Appointments are made by the ledger. The ledger is written by the Thing.
  solution: Write your own name in the PENDING column with one of its pens; it is then obliged to call you, and the door opens for whoever is called. You are now in the queue forever, holding a paper.
  hints:
  - It is a bureaucracy; it cannot refuse a correctly completed entry.
  - The pens are not guarded. The ledger is.
  - Kettle wrote nothing and took a paper anyway, which is why he is next.
  reward: Passage through the door, at a price the party will feel for the rest of the campaign.
secrets:
- description: The Thing's smile is not cruelty. It is relief. It has been alone at this counter for two hundred years.
  dc: 3
loot:
- A pen that writes in the Office's hand (the Rift's twin of Vexmort's Quill; writes any contract, which the Office enforces across both worlds)
dm_notes: The Counting Thing is a clerk of the Office of Eternal Records (Tropelandia) posted to a Rift it does not understand, filing a world it was not sent to. It would like to go home. It does not know the way. The door behind it leads to the Office's lower floor in Deepfile, Tropelandia.
---
# CVT-06 The Counter

> A counter of black stone, a bell that does not ring, a ledger the size of a door. Behind the counter sits something large and patient with too many hands, every one of them holding a pen. It looks up. It smiles. It asks whether you have an appointment.

Part of [[The Cold Vault]].
