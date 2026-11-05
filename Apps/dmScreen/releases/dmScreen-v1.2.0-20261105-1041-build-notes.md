# dmScreen v1.2.0 — build 20261105-1041

APK: `dmScreen-v1.2.0-20261105-1041.apk` (versionCode 3, debug-signed with the project keystore; installs over 1.0.0/1.1.0).

## What's new

**Quest layers** (from Taykaim's Discord feedback)
- Rooms, venues, towns and NPCs can carry `for_quest` entries in the repo. The app only shows them for quests you have **activated** (quest page → Activate), so other campaigns' secrets stay hidden.
- Three kinds: `arrival` shows as soon as the party is there; `stage` shows once the quest reaches that stage (stepper on the quest page); `investigation` sits behind an **Investigate** button on the card.
- Library → **Quests** lists every quest by universe with its active state.
- Seeded content: Ten Rats (Gilded Tankard, Barnaby, RAT-01, RAT-07), the Marlowe's Tower quest (Pettigrew Manor, TWR-01, TWR-04, Union Hiring Hall), the Hearthollow quest, and Ashfall's new **The Count** (Ember Hall, Warden Vosk, Cold Vault CVT-04).

**Ported from partyInterface**
- **Combat tracker**: "Start combat" on any encounter → initiative (roll all or type), round/turn pointer, HP, conditions, death saves for party members at 0 HP, End writes a log line.
- **Dice notation**: `2d6+3`-style expressions in Tools, with a Crit toggle (doubles the dice).
- **Party**: initiative bonus and max HP per member.
- **Purse + loot splitter**: cp/sp/gp/pp purse, split loot across the party, **Buy** buttons on venue services and stock.
- **Timer**: floating 30 s / 1 / 2 / 5 min timer, turns red at the end.
- **Previously on…**: recap of the last session on the dungeon Overview.
- **Session export**: the run log becomes an Omniverse session note (`<instance>.session.NN`, typed events, canon: local) plus a prose journal. Copy to clipboard or send via the Android share sheet; paste into your instance folder and run `merge_instance.py`.

## Known gaps / notes
- The 3D Model tab is still untested on a real phone GPU (please report).
- Combat seeds monsters from the encounter's stat summary; monsters without a stat block get HP 1 / AC 10 and can be edited.
- Export writes `instance` and world date from the inputs in Tools; set them once per campaign.

## Install
Copy the APK to the phone and open it (allow installs from this source if asked). It replaces the previous version in place; your runs, party, purse and quest state are kept.
