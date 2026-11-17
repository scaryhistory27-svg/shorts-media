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
3. **brand_id is set**: publish the `ready` queue first, oldest first, one per daily slot (`jobs.py next-slots`), then
   make new ones. Same publish procedure as the horror channel (videos/ upload, can-schedule guard, ONE
   createScheduledPost with blogId = brand_id, uncertain+reconcile, slot_overrides for the next post, report).
   Posting time: getBestTimeToPostByNetwork for brand_id (once it has data; until then use the horror channel's chart),
   ≥ 3 h away from the horror post of the same day so the two channels don't compete.
   First publish after the brand appears: also check the Metricool plan limit (free plan = 20 posts/month for ALL brands).
4. Memory: update this channel's `log.json` and the root docs/CURRENT_STATE.md (one line for channel 2).

## Format (every episode)
- 50–60 s, 14–16 lines, a new visual every ≤ 5 s. Line 1 = the question or an impossible fact (≤ 12 words, spoken by 0.4 s,
  sound hit ≤ 0.6 s): "What if the Moon vanished tonight?", "What if you fell into Jupiter?", "This tiny island is in two days at once."
  `pipeline/check_hook.py` must PASS.
- Arc: hook question → first surprising effect (relatable: your street, your night, your phone) → 2–3 escalating
  consequences with on-screen labels/numbers → "the strangest part" turn (~60 %) → loop ending that throws back to
  line 1 + open question for comments ("…Isn't it?", "Would you press it?").
- **Facts must be TRUE** (mainstream science/history; round numbers honestly: "about a third"). If unsure, WebSearch
  and leave the claim out rather than guess. No conspiracies, no fake "scientists say".
- episode.json: `"style":"light","bed":"light","voice":"am_michael:0.7,am_eric:0.3","voice_fx":"explainer","speed":0.9,"gap":0.4,"music_level":0.13`,
  header title `STRANGE MINUTE · WHAT IF #n`, cyan stamp (`THE MOON · GONE`), end card `WHAT IF #n+1?` + "Follow for tomorrow's strange minute".
- Look: deep-blue "wonder" palette, gold + cyan accents, labels/counters (`label()`), diagrams that MOVE (orbits, tilts,
  counters ticking, particles), a walker character in ≥ 30 % of scenes for scale/relatability. No gore, no horror stings
  except one soft sting on the final question. Reference episode: channels/strange-minute/ep001 (scenes.js helpers:
  bigMoon, earth, skyline, turtle, label).
- YouTube: title ≤ 60 chars "What If <X>? <emoji> #shorts"; description 1 teaser line + question to comments + 6 hashtags
  (#whatif #science #facts #shorts + 2 topic); 8 tags; category EDUCATION; madeForKids false.
- Cover: `"cover":{"seg","frac","top":"STRANGE MINUTE","lines":["<WHITE>","<YELLOW>"],"sub":"WHAT IF #n"}`.

## Topic bank (rotate space / Earth / human body / history / everyday-physics; never two of the same area in a row)
What if the Moon vanished (done #1) · Earth stopped spinning for one second · you fell into Jupiter · all ice melted tonight ·
humans could photosynthesize · a day lasted 48 hours · the Sun turned off for 8 minutes · you drilled through Earth ·
oxygen doubled · Earth had rings like Saturn · bees disappeared · we never discovered fire · the Library of Alexandria
survived · Pangaea came back · you lived on Mars for a year · gravity halved for a minute · the internet went down for a week ·
you could hear every sound on Earth · a tsunami of molasses (true: Boston 1919) · the town that sleeps (true: Kalachi) ·
the island that changes country every 6 months (true: Pheasant Island).
Keep a list of used topics in log.json `episodes`.
