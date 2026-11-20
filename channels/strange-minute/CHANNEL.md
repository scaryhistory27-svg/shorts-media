# Channel 2 — Strange Minute (@StrangeMinute)

English animated "What if…?" / hidden history / science-mystery Shorts for a US audience. Separate YouTube channel on the
owner's Google account; separate Metricool brand (`log.json` → `brand_id`, null until the owner connects it).
Everything else (engine, render, QA, report) is shared with the horror channel — see the root CLAUDE.md.

## Autopilot (runs inside the daily horror autopilot run, AFTER the horror slots are done)
Env for every jobs.py call of this channel:
`export JOBS_FILE=channels/strange-minute/jobs.json LOG_FILE=channels/strange-minute/log.json`
1. **Recovery**: `python3 pipeline/jobs.py resume` (with the env above) — finish/reconcile like the horror channel.
2. **brand_id is null** (not in Metricool yet): if `len(ready) < max_ready`, make ONE new episode (next ep number),
   QA it fully, append `{"ep": n, "dir": "channels/strange-minute/ep00n", "title": ...}` to `ready`, and send the owner
   the video + cover with a short Russian note "готово для Strange Minute, ждёт подключения в Metricool". Never publish.
3. **brand_id is set**: for every empty slot from `jobs.py next-slots` (max 2 per run) publish one video: the oldest from the
   `ready` queue, otherwise make a new one. After that, if the queue has < 1 video, make one spare so tomorrow never misses. Same publish procedure as the horror channel (videos/ upload, can-schedule guard, ONE
   createScheduledPost with blogId = brand_id, uncertain+reconcile, slot_overrides for the next post, report).
   Posting time: getBestTimeToPostByNetwork for brand_id (once it has data; until then use the horror channel's chart),
   ≥ 3 h away from the horror post of the same day so the two channels don't compete.
   First publish after the brand appears: also check the Metricool plan limit (free plan = 20 posts/month for ALL brands).
4. Memory: update this channel's `log.json` and the root docs/CURRENT_STATE.md (one line for channel 2).

## SAME STANDARD AS CHANNEL 1 (owner 2026-11-17: "set up channel 2 exactly like channel 1")
Everything the root CLAUDE.md demands for horror videos applies 1:1 here — only the genre/look/voice differ:
- **Production per video:** episode.json + scenes.js → tts → timeline → preview sheet (Read it, fix) → full render → cover.
- **QA — mandatory, fix and re-render until ALL pass, never publish a failed video** (root CLAUDE.md "QA"):
  1-fps contact sheet of final.mp4 read frame by frame (no black/blank frames, captions fully on screen and never over a key
  object/label, nothing cut by edges or hidden under the header, end card clean); **keywords check** — every `hl` word and
  every `sfx` word exists as an exact token, highlighted words are the right ones, `say` pronunciations correct, proper English;
  audio −14 LUFS ±0.5, peak ≤ −0.5 dB, voice on every line (silencedetect); sync spot-check at 3 sfx times;
  `check_hook.py` PASS; **fact check** of every number/claim; cover.jpg + the exact cover frame (videoCoverMilliseconds) clean.
  Write what was checked and fixed into the report.
- **REAL ANIMATION, NOT A SLIDESHOW** (same rule as channel 1): every scene has something moving besides the camera zoom —
  planets spin/orbit, counters tick, water waves, particles drift, labels pop in, characters walk/turn/reach/point;
  ≥ 50 % of scenes contain a character or creature in motion (walker, crawler, turtle, bird, astronaut…); background parallax;
  camera punch on hits (engine). In consecutive 1-fps QA frames most scenes must visibly change. Idle = fail → fix.
- **Intensity / cadence = the same launch pattern as channel 1**, counted from the day the brand is connected (day 1):
  days 1–2: 2 videos/day (≥ 5 h apart); days 3–7: 1/day; from day 8: mixed 1 video/day or every 2 days
  (`mixed_days` [1,2], deterministic per date). On the connection day write this as `schedule` into log.json (dates in LA),
  like series/log.json. The ready queue (max 3) lets the first days start immediately.
- **Posting time:** decided per video exactly like channel 1 (getBestTimeToPostByNetwork for brand_id → own results once ≥ 5
  videos → one WebSearch), any hour 07:00–22:00 LA, ≥ 3 h away from the horror post that day; `slot_overrides` for the next post.
- **Publishing "with everything":** title, description + hashtags, tags, category EDUCATION, madeForKids false, thumbnail per
  `log.json` thumbnail mode (frame = videoCoverMilliseconds of a clean frame; custom probe every 3rd video), job state machine
  (can-schedule OK → scheduling → ONE createScheduledPost → scheduled / uncertain+reconcile), duplicate-title guard.
- **Report** to the owner after every video: same template as channel 1 (title, description, time LA/Yerevan + why, topic +
  why, hook, rewatch trick, analytics used, QA, cover method, next post), video + cover via SendUserFile. Learn from this
  channel's own analytics before each video (getAnalyticsDataByMetrics for brand_id) and adapt (hook, length, topic area).

## Own identity — must NOT sound/look like the horror channel (owner 2026-11-17: viewers must not guess both are his)
- Voice (owner chose 2026-11-17, sample "A"): US male `am_fenrir`, lang en-us, speed 0.9 (hook line 0.95), voice_fx explainer — never the horror blend/storyteller FX.
- Opening (owner 2026-11-17): the voice asks the question FIRST, with NO sound under it; right after it ONE small soft
  `ding` (`{"at":"end","type":"ding"}` on line 1); then the story starts. check_hook enforces this for style light.
- Sounds: ONLY `ding`, `chime` (final question), `pop`, `rise`, `whoosh`, never under a spoken key word if it masks it. Never
  `hit`/`sting`/`knock`/`heart`/`creak` (no boom, no red glitch).
- Characters (owner 2026-11-17: must differ from channel 1): NEVER `walker()`/`crawler()`/horror characters. Use the channel's own
  cartoon kit in engine.js: `smGuy(x,y,s,t,{speed,dir,look,point,wow,wave,hood,pants,hair,skin})` — host "Max" (big round head,
  round glasses, thick navy outline, orange hoodie, teal pants) and other people as smGuy with different hood/hair colours;
  **Owner's pick 2026-11-17: style A + D** — `smGuy` (Max) is the host for Earth / history / human-body / everyday topics;
  `smAstro(x,y,s,t)` (little astronaut-explorer, floating bob, waving arm, blinking backpack light) is the host for SPACE topics
  (both may appear together, e.g. Max on Earth + astronaut in orbit).
  `smTick(x,y,s,t,{hop,wow,look})` — the living-stopwatch mascot (hops, reacts) in ≥ 1 scene per video. Max appears in
  ≥ 50 % of scenes and reacts to the facts (points at labels, looks up, "wow" face, waves at the end). Style test: tests/sm_kit.
- Captions: light style (blue pill, gold/cyan highlights — automatic with "style":"light"). Header/cover in gold+cyan, no red.

## Music (owner 2026-11-18: "the background music isn't gripping — use what popular what-if Shorts use")
- Default `music_style: "pulse"` (timeline.py music_pulse): driving ~104–112 BPM curiosity bed — light kick, off-beat hats, 8th-note bass,
  16th-note plucked arpeggio with echo, build (clap + riser) at ~55 % = "the strangest part", drop to pad in the last 2 s.
  Level `music_level` 0.11 (ducked under the voice). Old calm pad = `music_style: "ambient"` only if the owner asks.

## Format (every episode)
- 50–60 s (owner: if short, add a TRUE fact line — never just slow the voice below 0.9), 16–18 lines, a new visual every ≤ 5 s. Line 1 = the question or an impossible fact (≤ 12 words, spoken by 0.4 s,
  clean voice, then a small ding after it — no sound under the question): "What if the Moon vanished tonight?", "What if you fell into Jupiter?", "This tiny island is in two days at once."
  `pipeline/check_hook.py` must PASS.
- Arc: hook question → first surprising effect (relatable: your street, your night, your phone) → 2–3 escalating
  consequences with on-screen labels/numbers → "the strangest part" turn (~60 %) → loop ending that throws back to
  line 1 + open question for comments ("…Isn't it?", "Would you press it?").
- **Facts must be TRUE** (mainstream science/history; round numbers honestly: "about a third"). If unsure, WebSearch
  and leave the claim out rather than guess. No conspiracies, no fake "scientists say".
- episode.json: `"style":"light","bed":"light","voice":"am_fenrir","lang":"en-us","voice_fx":"explainer","speed":0.9,"gap":0.4,"music_level":0.13`,
  header title `STRANGE MINUTE · WHAT IF #n`, cyan stamp (`THE MOON · GONE`), end card `WHAT IF #n+1?` + "Follow for tomorrow's strange minute".
- Look: deep-blue "wonder" palette, gold + cyan accents, labels/counters (`label()`), diagrams that MOVE (orbits, tilts,
  counters ticking, particles), a walker character in ≥ 30 % of scenes for scale/relatability. No gore, no horror stings
  except one soft sting on the final question. Reference episode: channels/strange-minute/ep001 (scenes.js helpers:
  bigMoon, earth, skyline, turtle, label).
- YouTube: title ≤ 60 chars "What If <X>? <emoji> #shorts"; description 1 teaser line + question to comments + 6 hashtags
  (#whatif #science #facts #shorts + 2 topic); 8 tags; category EDUCATION; madeForKids false.
- First comment on every video (`youtube.first_comment` → firstCommentText): a pick-one question or "what should we make vanish/happen next?" 🌕👇
- Cover: `"cover":{"seg","frac","top":"STRANGE MINUTE","lines":["<WHITE>","<YELLOW>"],"sub":"WHAT IF #n"}`.

## Topic bank (rotate space / Earth / human body / history / everyday-physics; never two of the same area in a row)
What if the Moon vanished (done #1) · Earth stopped spinning for one second · you fell into Jupiter · all ice melted tonight ·
humans could photosynthesize · a day lasted 48 hours · the Sun turned off for 8 minutes · you drilled through Earth ·
oxygen doubled · Earth had rings like Saturn · bees disappeared · we never discovered fire · the Library of Alexandria
survived · Pangaea came back · you lived on Mars for a year · gravity halved for a minute · the internet went down for a week ·
you could hear every sound on Earth · a tsunami of molasses (true: Boston 1919) · the town that sleeps (true: Kalachi) ·
the island that changes country every 6 months (true: Pheasant Island).
Keep a list of used topics in log.json `episodes`.

## Subscribe CTA (owner approved 2026-11-18) — every video
episode.json `"cta": {"text": "...", "hl": "..."}` (see CLAUDE.md). Rotate: "ONE STRANGE MINUTE. EVERY DAY." (hl "STRANGE MINUTE") /
"STAY CURIOUS. NEW 'WHAT IF' TOMORROW." (hl "CURIOUS") / "YOUR DAILY DOSE OF WEIRD." (hl "WEIRD").
With the CTA, `endSub` must NOT repeat it (no "Follow for tomorrow…") — use a short teaser of the next topic instead or leave it empty.

## Pacing template (owner 2026-11-18: "same settings as channel 1" — adapted from the best horror video's beat map)
Every Strange Minute video follows this beat map:
1. 0–2 s: the "What if…?" question + the subject ALREADY on screen in its most striking state (giant Sun with "OFF?", Moon, wave) — the mystery is clear instantly; ding after the question.
2. 2–5 s: the first immediate consequence in ≤ 8 words — no intro, no "today we…", no backstory.
3. by ~5 s: the first surprising fact with a number (8 minutes, 35 mph, 1,000 mph).
4. ~8–15 s: something FAMILIAR changes (your street, your sky, your coffee, your city).
5. middle: hard evidence / a real-world proof (eclipse data, a true event, a scientist's measurement).
6. escalation: a new, bigger effect every 4–5 s (scene, label or character action changes each beat).
7. "But here's the strange part" twist in the last third, which recontextualizes the opening.
8. last line: loops back to the opening question in the present tense ("So is the Sun still there right now? You won't know for 8 minutes.").
Plus the channel's Subscribe CTA design (ribbon + gold button + Tick) on the end card.
Once Windsor has ≥ 3 Strange Minute videos with data, compare them the same way and update this template from the best one.

## GTA 6 trend series (owner 2026-11-19 — overrides the topic rotation while GTA 6 is trending)
GTA 6 launched 2026-11-19. Owner: "everyone is searching for it — I want to show up in search too". LIMIT (owner 2026-11-19, later): 3–4 GTA 6 videos IN TOTAL are enough → #5 launch, #6 inside, #7 secrets are done;
make exactly ONE more: 'GTA 6 Secrets #2' (new finds, what-happens-if) in slot 2026-11-21T10:00 (#7's end card promises it 'tomorrow'),
then STOP the GTA series and go back to the normal topic rotation. Slot 2026-11-20T18:30 = 'What if you fell into Jupiter?' (teased earlier).
- Topics: launch-week secrets & easter eggs, "what happens if you do / don't do X in GTA 6", story setup (no late-game spoilers in titles),
  characters, map/regions, hidden details, records. Research EVERY video with WebSearch (extended) on the newest player finds
  (TechRadar/Kotaku/IGN/GameSpot live blogs, reviews); phrase unconfirmed finds as "players say / players found". Never invent secrets.
- REAL GAME FRAMES are mandatory: only OFFICIAL Rockstar screenshots from rockstargames.com/VI/downloads/screenshots
  (Rockstar offers them to "download and share"; host allowed in the `shorts-media` environment). Download at imwidth=1280 into
  `<ep>/build/img/` (git-ignored — never commit Rockstar images to this public repo); render.js passes them to the page as data URLs.
  Show them as a rounded card with Ken Burns + blurred backdrop + "IMAGE: ROCKSTAR GAMES" credit; our characters/props animate around
  the card (real animation rule still applies). Never use trailer/gameplay VIDEO clips (Content ID) and never the logo.
  Template: channels/strange-minute/ep007/scenes.js (`still()` helper).
- Metadata for search: title starts with "GTA 6" + keyword ("GTA 6 Secrets:", "GTA 6:", "What Happens If You … In GTA 6"),
  tags gta 6 / gta 6 secrets / gta 6 easter eggs / gta 6 tips / gta vi / vice city; category GAMING; description credits
  "Screenshots: Rockstar Games (official press images)"; hashtags #gta6 #gta6secrets #gta6eastereggs #gaming #shorts.
- End card teases the next GTA secret (endTitle "SECRET #n?"), CTA "DON'T MISS THE NEXT SECRET." etc.

## GROWTH MODE (owner 2026-11-19: "work for views and subscribers")
vidIQ 2026-11-19: Earth stops spinning 1,210 views · Sun switched off 1,145 (44 views/h) · GTA 6 launch 560 in 9 h (51/h) ·
Moon 132 · Molasses flood 169. → Big-stakes SPACE / EARTH-PHYSICS catastrophes ("What if <something everyone knows> suddenly stopped/vanished/doubled?")
and HOT TRENDS clearly beat history and soft topics.
Topic mix from now: ~70 % space/Earth/physics catastrophes (sun, moon, gravity, oxygen, rotation, asteroid, black hole, ocean, ice),
~30 % live trends (GTA 6 week, big launches/events — check WebSearch daily); history only when it has a catastrophe angle.
Title = "What If <X> <dramatic verb>? <emoji>😳 #shorts". Keep the pacing template, loop ending and the Tick CTA.
