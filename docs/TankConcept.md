# Tank roguelite: concept + first 5 levels

Status: plan finalized for the prototype (2026-11-20). Numbers are still first guesses. Playable mock: `tank-mock.html`.

## One line

You drive a toy-like tank across a mid-sized open map and complete a few missions. It fires on its own, and you win by **driving well**: facing threats with your front armor, using cover, crushing things, and choosing what to fight and what to skip. Before each level you **read the intel and pick the right tank for it**; during the level you build that tank up from parts; after the level the parts are gone and only small meta progress stays.

## Final plan: the core loop

```
Briefing (intel) -> Prepare (tank + starting part + perks) -> Level (missions + in-level picks) -> Debrief (gold, blueprints) -> Garage -> next Briefing
```

### 1. Briefing: the level tells you what it is
Every level shows an **intel card** before you start. It is honest, so preparing is a real decision, not a guess.
- **Threat mix** as bars: Infantry / Armor / Artillery / Air / Mines.
- **Terrain tags:** open, urban (lots to crush), mud, river, narrow.
- **Missions** (1 main + 1-2 side) and the par time.
- **No suggested tank.** Reading the intel and choosing is the player's job.

### 2. Prepare: the meta pays off here
- **Pick a tank class** (the biggest choice):
  - **Scout:** fast, thin, quick turret. Best when it is mostly infantry and you need to cover ground.
  - **Brawler:** balanced default.
  - **Heavy:** slow, thick front, big gun, crushes huts and cars. Best when there are many enemy tanks.
- **Pick 1 starting part** from unlocked blueprints (e.g. Coax MG for infantry levels, AP shells for armor levels).
- **Equip commander perks** (2, later 3).
- A wrong choice should make a level **harder, not impossible**. In-level picks can partly fix a bad prep.

### 3. Level: a mid-sized open map with a few missions
- **Size grows with the campaign.** Early levels: about 3x3 phone screens (cross in ~40 s). Later levels: bigger maps with more objectives. Not a corridor, not an open world.
- **Everything is open; difficulty does the gating.** The map has three areas at growing distance from the start: light (objective 1), medium (objective 2) and a stronghold (main goal: overlapping AT guns, tanks, mortars, few entrances). Nothing is locked. Rushing the stronghold with a plain tank should almost always fail, but a skilled player can try it. (Playtest: locking objectives felt artificial; free order with even defenses let you skip everything.)
- **Objectives 1 and 2 are support sites for the stronghold.** While a site stands, it makes the main goal harder; destroying it cuts that support and pays an upgrade. Site types: barracks (sends infantry), tank factory (sends tanks), motor pool (sends technicals), artillery battery (shells you inside the stronghold), airfield (strafing runs near the stronghold), supply depot (repairs stronghold defenders), radar (stronghold spots you earlier and fires faster). The briefing says what each site does. (Playtest: rushing the main goal with no upgrades still worked at 60% HP; supports make skipping them costly.)
- **Objectives pay in upgrades.** Objectives 1 and 2 each give a pick (some rare). Those picks are what make the next area survivable.
- **Show the danger.** The stronghold has a red border on the ground and red on the minimap; the medium area is amber. Defenders stay near their post (leash) so the areas keep their shape.
- **Map size:** early maps about 3600 x 2800 m at the 460 m default zoom (~8 x 3 phone screens). Later maps grow.
- **Run upgrades:** objective picks + slow scrap level-ups. Target picks per level: ~5 on small early maps (2 objectives + ~3 scrap), ~8-10 on big late maps. They exist only for this level.
- **Picks don't interrupt.** A pick goes into an "Upgrade" button; the player opens it when there's a quiet moment (playtest: auto-popups every few seconds broke the flow).
- **Alert** keeps the pressure on, so slow play costs you.
- Level ends when the main objective is done, or when you die.

### 4. Debrief and garage
- All run parts are lost. You keep: **gold**, **blueprints** found, **stars**.
- Garage: spend gold on small, capped per-tank upgrades (+HP, +engine, +1 starting part choice) and on unlocking tanks.
- The meta mostly gives **more options for preparation**, a little power second.

### Design rule: levels are built to reward prep
Each level leans on one or two threat types, so the intel matters:
- Infantry-swarm levels: Scout + Coax MG clears fast; Heavy is slow but safe.
- Armor levels: Heavy ricochets most shots; Scout must flank and dies to aim lines.
- Mixed levels: Brawler.
A level should be finishable with any tank; the right tank makes it faster and earns the 3rd star.

## What sets it apart from Archero

| | Archero | Us |
|---|---|---|
| Space | Closed rooms, one after another | One open map, a goal, optional targets |
| Pace | Fixed | Yours: push fast or clear the side targets (**Alert** rises over time) |
| Defence | Dodge everything | Armor facing (ricochets), cover, dodge only artillery / planes / mines |
| Body | Weightless | Heavy: crush infantry, fences, huts, cars |
| Build | Abstract skills | Visible parts in slots on the tank, with weight |

## Controls

- **Default:** one joystick. The tank **always drives forward** toward where the stick points, turning at its class's turn speed. There is no reverse (playtest: reversing made it hard to tell front from back). Keeping your front toward a threat means driving at it or angling past it, so turn speed matters per class.
- **HUD:** an XP strip across the top (next upgrade), Alert and timer top-left, a minimap top-right. Health bar sits above the tank.
- **Missions on screen:** no mission list. Each mission is a colored star (gold = main, cyan and pink = side). The star marks the target in the world (a ring and star over the enemy, or a capture circle), on the minimap, and as an arrow at the screen edge when it's off screen.
- **Optional "Pro" mode:** two track sliders, one per track.
- **Main gun:** auto-fires at the nearest target in its arc. The turret has a turn speed, so targets in front die faster.
- **Ability button:** one or two active parts (smoke, rocket salvo) once you have them. Charge-based, with an auto toggle.

## Feel: sound, haptics, motion

- **Sound** is synthesized in the browser (no audio files): cannon thump, enemy shots and MGs that fade with distance, explosions, ricochet ping, crush crunch, rising scrap blips, engine hum that follows speed, lock-on beep before a tank fires, bomber siren and fly-by, rocket whistle, bomb-truck and mine beeps, heartbeat at low HP, and jingles for upgrades, objectives, win and loss.
- **Haptics** are short taps: taking a shell (stronger on side and rear hits), ricochet, crush, mine, bomber warning, upgrade ready, objective done, level end. Rate-limited so they never buzz constantly.
- **Motion:** camera kicks back on each shot, enemies squash when hit and pop in when they spawn, wrecks throw debris and smoke, dust trails behind a fast tank, the health bar shows a pale "damage taken" chunk that drains, the screen edge flashes red on hits, a short slow-motion beat on objective complete, star burst at the objective, debrief stars pop in one by one and the gold counts up.
- Sound and vibration can be turned off in the briefing room and the pause menu. Reduced-motion settings turn off the UI animations and camera kick.

## Combat rules

- **Armor:** front 100%, sides 50%, rear 25%.
  - Shells that hit the front at an angle can **ricochet**: no damage, a "RICOCHET!" popup, a spark.
  - Small arms do nothing to the front and chip the sides and rear.
- **Every threat warns before it hits:**
  - Tanks and AT guns: a red aim line about 1 s before firing.
  - AT infantry: a rocket flash, about 0.6 s.
  - Mortars and artillery: impact circles that fill up.
  - Planes: a strafe line on the ground.
- **Crushing:** driving into infantry, fences, huts, crates or light cars destroys them. Heavier tanks crush more.
- **Cover:** rocks, ridges, ruins and wrecks block line of sight. Ruins and wooden walls can be shot or driven through.
- **Alert (the pressure meter):** rises with time, and faster when you shoot buildings or kill alarm posts.
  - At thresholds: a reinforcement wave, then artillery barrages, then planes.
  - It resets a little when you reach a checkpoint.
  - This creates the core greed choice: rush the goal, or take the side targets that give picks.

## In-level progression (the run)

A level is one run, 5 to 8 minutes. Your tank starts plain each level: the base hull and main gun.

- **Scrap = XP.** Kills and crushed things drop scrap. You pick it up by driving over it, with a small magnet range.
- **Level up: pick 1 of 3.** Each level-up offers a part, a part upgrade or a gun mod. Scrap level-ups are slow (about 3 on a small map); most picks come from objectives. Scrap needed per pick grows each time.
- **Supply depots** (often an objective): capture one by parking on it for 3 s. Gives a **rare pick** (2 levels at once).
- **Chests** from mini-bosses: one guaranteed rare.

### Slots on the tank

Parts are visible on the model and take one slot. Picking the same part again upgrades it, up to level 3. Each part adds weight, and the speed penalty starts above a weight limit.

| Slot | Part examples |
|---|---|
| **Main gun** (mods, any number) | AP shells (pierce) · HE shells (splash) · Fast loader · Double barrel · Incendiary (burning ground) · Ricochet shells (bounce to 2nd target) · Coax MG (shreds infantry) |
| **Front** | Dozer blade (crushes bigger things, +front armor) · Mine roller · Ram spikes (ram damage) · Extra plate |
| **Sides** (×2) | Side skirts (side armor) · Sponson MG (side arc) · Smoke dischargers (active) |
| **Rear** | Rear MG (covers your back) · Mine dropper · Exhaust smoke (smoke trail behind you) |
| **Roof** | AA MG · Mortar (auto-lobs at bunkers and groups, ignores cover) · Recon drone (reveals the map, marks AT teams) · Rocket pod (active salvo) |

**Stat picks** (no slot): turret speed, reload, max HP, engine power, repair over time, scrap magnet.

**Example combos:**
- Dozer blade + Ram spikes + heavy hull = a bulldozer build.
- Recon drone + Mortar = hit them before they see you.
- Exhaust smoke + Rear MG = a hit-and-run build: break contact, the rear MG covers you.
- HE shells + Incendiary = area denial.

## Meta progression

The meta widens your choices first and adds power second, so it isn't a grind for bigger numbers.

| System | What it does | Earned by |
|---|---|---|
| **Tanks** | New class = a different playstyle | Scout is free; Brawler (150 gold) and Heavy (320 gold) are bought in the garage. Later classes the same way. |
| **Blueprints** | Add parts to the pick pool. You start with about 12 parts and unlock about 30. | Level rewards, chests, first-time stars |
| **Garage** | Small permanent upgrades per tank (+HP, +engine, starting part choice). Capped and cheap. | Gold |
| **Commander** | Perks you equip, 2 slots then 3 later (e.g. "start with 1 reroll", "depots also give +10% HP", "first ricochet each level heals") | Medals |
| **Stars per level** | ★ complete · ★★ under par time · ★★★ under 75% of par, no revive | Gold + medals |
| **Harder tiers** (later) | Replay a level with modifiers (night, more Alert, elite enemies) | Unlocked after 3 stars |

**Currencies:** gold (meta upgrades), medals (unlocks). Run scrap never leaves the level.
**Ads:** revive once per level, reroll a pick, double the level-end gold.

### Tanks (starting classes)

| Tank | Speed | Armor | Gun | Trait |
|---|---|---|---|---|
| **Brawler** (150 gold) | medium | medium | 75 mm | balanced, crushes infantry and fences |
| **Scout** (start) | fast | thin | turret MG (fast fire, low dmg) | 2 level-up picks shown as 4 options. Crushes infantry only. |
| **Heavy** (320 gold) | slow | thick front | 105 mm, slow turret | crushes huts and cars, ricochets more often |
| *Later:* Flame tank, SPG (artillery: fires over cover, can't fire at close range), Tank destroyer (no turret) | | | | |

## Mock campaign (10 levels, in the prototype)

Levels unlock in order. Each has 3 objectives: 1 (light defenses), 2 (medium), main (stronghold).

| # | Level | Biome | Leans on | 1 | 2 | Main |
|---|---|---|---|---|---|---|
| 1 | Farm Sweep | farm | infantry | capture depot (rare) | 2 MG nests | 3 barracks |
| 2 | Iron Ridge | ridge | armor, AT | AT gun | hold radio hill (rare) | tank platoon + leader |
| 3 | Mud Road | farm, deep mud | fast cars, AT | 3 scout cars | hold crossroads (rare) | supply convoy |
| 4 | Pine Woods | forest | infantry, AT ambush, short sightlines | 2 mortar teams | lumber camp (rare) | forest camp |
| 5 | Rail Yard | town | AT teams, heavy tanks | 3 station MGs | signal box (rare) | 2 heavy tanks |
| 6 | Dry Wadi | desert | technicals, mortars | 4 technicals | oasis (rare) | fuel dump |
| 7 | Frozen Ford | snow | armor | 2 AT guns | hold the ford (rare) | armored column |
| 8 | Old Town | town | infantry swarm, AT | market square (rare) | 3 barricade MGs | town HQ |
| 9 | Hill 312 | ridge | artillery, AT guns | 3 mortars | forward trench (rare) | gun line (3 AT guns) |
| 10 | Iron Citadel | snow | everything | outer battery | gatehouse (rare) | 2 commanders + HQ |

## Enemy roster

Difficulty comes from mixing threats that ask for different answers at the same time: dodging a bomber lane drives you toward a flame tank, and running from a bomb truck pulls you into a minefield.

| Enemy | Threat | Answer | First level |
|---|---|---|---|
| Rifle squad | Chip damage, crowds the screen | Crush or shoot | 1 |
| MG nest | Constant chip in its arc | Front armor straight in, crush it | 1 |
| Mortar team | Impact circles | Dodge, rush them (they're fragile) | 1 |
| Technical | Fast, circles you with an MG | Ram it, or keep it in front | 1 |
| AT team | Rocket after a 0.6 s flash, big damage | Crush, never show your side | 1 |
| Tank | Aim line, then a big shell | Angle your front, step off the line | 1 |
| **Bomb truck** | Races at you and explodes (85 m blast). Crushing it sets it off, and the blast also hurts nearby enemies | Shoot it early, or sidestep: it turns slower than you | 1 |
| **Bombers** | A red lane across your path, carpet-bombed 2.6 s later. Every level once Alert reaches 45, sooner on air levels | Turn out of the lane | 1 (via Alert) |
| **Minefield** | Hidden until about 240 m. A blinking red dot when close. Groups around strongholds | Watch the ground. HE, roof mortar and enemy shells clear them | 1 |
| **Flame tank** | Closes in, then burns in a cone for 1.7 s. Ignores armor | Keep distance. It's slower than you | 2 |
| **Rocket truck** | A 10-rocket salvo over a wide dashed circle, from up to 780 m. Backs away from you | Leave the circle, then hunt it | 2 |
| AT gun | Long aim line, shielded front | Flank it | 2 |
| **Repair truck** | Heals nearby armor 14 HP/s, flees from you | Kill it first | 3 |
| Strafing plane | A narrow, fast lane (from an airfield) | Dodge, or destroy the airfield | 6 |

## The first 5 levels

### Level 1: Breakthrough (tutorial, ~4 min)
- **Goal:** break out of the trenches and reach the bridge.
- **Map:** small and mostly linear: trenches, then a farm, then a road to the bridge. Fences and huts everywhere to crush.
- **Enemies:** rifle squads, 2 MG nests, 1 light car at the end.
- **Teaches:**
  1. Move; the gun fires on its own.
  2. MGs bounce off your front ("FRONT ARMOR" tip), so drive into the nest.
  3. Crush things.
  4. Scrap pickup and the first level-up pick.
  5. Turn to face threats.
- **Optional target:** a supply dump on a side path (first rare pick).
- **No Alert meter yet.**
- **Unlocks:** Garage, the first 3 blueprints.

### Level 2: Farmland (~5 min)
- **Goal:** take the village crossroads.
- **Map:** two routes.
  - Road: fast, open, mortars have a clear view.
  - Fields: mud slows you, but hedges and haystacks give cover.
  - Both meet at the village.
- **New:** mortar teams (impact circles), technicals. **The Alert meter appears**: at 3 min a reinforcement wave comes from behind.
- **Optional targets:** 1 supply depot, 1 alarm post.
- **Mini-boss:** an armored car with a twin MG at the crossroads. It drops a chest.

### Level 3: The Ridge (~6 min)
- **Goal:** take the radio post on the ridge top.
- **Map:** valley, slope, ridge. The valley has rocks and wrecks for cover. The slope is covered by an AT gun at the top. A gully on the left leads around to its flank.
- **New:**
  - **Enemy tanks:** aim line and ricochet lesson ("angle your front!").
  - **AT gun:** the flanking lesson.
- **Alert:** artillery barrages (circles) start at 4 min.
- **Optional targets:** 2 depots, a downed scout plane (gives a recon drone blueprint).
- **Boss:** a medium tank platoon leader (aim line every 2.5 s, calls one escort tank at 50% HP).
- **Unlocks:** nothing extra (tanks are bought with gold).

### Level 4: River Crossing (~6 min)
- **Goal:** clear the far bank, then **hold the bridgehead for 60 s** while the engineers build a pontoon bridge. This is the first non-"reach X" goal.
- **Map:** wide river with two fords (one shallow, one mined). Reeds hide AT teams. Ruins on the far bank give cover for the hold.
- **New:**
  - **AT teams** in the reeds.
  - **Mines:** a slight bump in the ground, visible up close.
  - **Planes:** strafe lines during the hold.
- **Alert:** a plane raid at the start of the hold, whatever the Alert level.
- **Optional targets:** a spotter tower (removes artillery for the rest of the level), 1 depot.
- **Unlocks:** Commander perks (2 slots).

### Level 5: The Rail Yard (boss level, ~7 min)
- **Goal:** cross the town to the rail yard and destroy the **enemy armored train**.
- **Map:** town streets (tight, lots to crush, AT teams in windows), then the open yard with several tracks, switches, wagons for cover and a water tower.
- **Boss: armored train.** This reuses the existing train models.
  - It runs back and forth on the yard tracks.
  - Its cars: an MG car, a mortar car, the main gun car, and the loco.
  - Each car is its own target. Destroying one removes its weapon.
  - The main gun car shows a long aim line along its side, so you dodge by **crossing the tracks** to its other side.
  - Shooting the switch levers (optional) traps it on a short dead-end track.
- **Alert:** constant. Reinforcement APCs come in every 60 s from the town.
- **Rewards:** a big chest, medals, the "Rail" blueprint set.

### Curve over levels 1-5

| Level | Length | Picks | Distinct enemies | New idea |
|---|---|---|---|---|
| 1 | 4 min | ~5 | 3 | Armor facing, crushing |
| 2 | 5 min | ~7 | 5 | Route choice, Alert |
| 3 | 6 min | ~8 | 7 | Ricochet, flanking, boss |
| 4 | 6 min | ~9 | 9 | Hold goal, AT ambush, planes |
| 5 | 7 min | ~10 | 10 | Boss mechanics with terrain |

Levels 6+ alternate goal types (reach, hold, escort a convoy, destroy target X, rescue) across new biomes (forest, desert, snow, city). A boss every 5 levels.

## Questions to answer in the prototype

1. Do armor facing and ricochets feel good with the joystick?
2. Does crushing feel heavy and satisfying?
3. Does Alert actually create the "push or loot" choice, or does everyone rush?
4. Is the map readable on a phone at the camera distance we need to see threats?
5. Does the intel card make the tank choice a real decision? (Scout on Farm Sweep vs Heavy on Iron Ridge should feel clearly better, not just slightly.)
6. Do 2-3 missions per map, in any order, make the map feel open without feeling empty?
