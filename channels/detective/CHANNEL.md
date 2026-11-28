# Channel 4 — FORMAT v2 (owner 2026-11-28: "analyse what takes off in YouTube recommendations now and switch the 3rd channel to it")
**3D-style "WHAT HAPPENS IF…" / "HOW TO SURVIVE…" / "WHAT HAPPENS INSIDE YOUR BODY WHEN…" Shorts** (Metricool 8396167, YouTube UC9QAuI2j7SqxkXktw2v9hRw, @CaseClosedIn60 until the owner renames it).
Why (research 2026-11-28, sources in docs/RESEARCH_NOTES.md): 3D-animated faceless explainers are the fastest-growing faceless Shorts format of 2026
(Zack D Films-type channels ≈ 630K avg views/Short, animated "investigations" ≈ 4.8M); science/body topics lead faceless Shorts; our own best Short is a BODY what-if
(Strange Minute "11 days without sleep" 1418 views, 80 % viewed). The format is the trend — the look, character and scripts are ours (never copy another channel's character/style).
- **Split with Strange Minute (no overlap):** SM keeps SPACE / Earth / planets / big-world what-ifs (flat 2D light style). Channel 4 = the HUMAN BODY, everyday dangers, survival
  scenarios and "how it works inside" — always shown in the pseudo-3D toolkit (channels/detective/lib.js: toon characters, room3/street sets, shaded sph/cap3/body3, godRays, dolly parallax).
- **Recurring host = "Benny"** (original toon: orange hoodie, big curious eyes, messy brown hair) who goes through every scenario; signature visual = a clean "X-RAY CUTAWAY" view
  (semi-transparent body, stylised organs/bones in soft 3D, NO gore, no blood, no realistic injuries) + a "BENNY STATUS" meter (e.g. HYDRATION 32 %).
- **Script (12–15 lines, 40–55 s, lively voice from log.json):** line 1 = the scenario as a hook ("This is what happens if you swallow gum.", "Here's how to survive a falling elevator.",
  "You've never seen what a sneeze does inside you."), then a step-by-step countdown/timeline ("After 10 seconds… After 1 hour… After 3 days…"), one surprising fact or myth-bust,
  a payoff, and a last line that loops or asks ("So… would you try it?"). Every number verified with WebSearch + content-research-and-sourcing (sources list in episode.json).
- **Safety (YouTube-safe, YPP-safe):** no gore, no self-harm, no dangerous challenges presented as fun, no medical advice — health topics add "Not medical advice. For curiosity only."
  to the description; survival topics give the SAFE correct action. Kids-safe tone but madeForKids:false.
- **Topic bank (rotate body / survival / everyday-science; never repeat a topic of ANY channel):** swallowing gum · cracking knuckles · holding in a sneeze · brain freeze ·
  hiccups · eating a ghost pepper · drinking only coffee · not blinking for a minute · skipping breakfast · lightning strike survival · falling elevator · lost at sea ·
  stuck in quicksand · car into water · avalanche · hypothermia · a bee sting · what your stomach does with a pizza · why you yawn · goosebumps · stomach growling ·
  "what if you never cut your hair" · what happens when you sleep 4 h · cold shower every day · pressing on a bruise · getting brain-freeze vs real freeze.
- **Titles:** hook-first + emoji + #shorts ("What Happens If You Swallow Gum? 😳 #shorts", "How To Survive A Falling Elevator 🛗 #shorts"). Description: 1 hook line + 4–5 hashtags
  (#whathappensif #humanbody #science #survival #shorts) + safety line when relevant. First comment = a pick-one question ("Would YOU try it? 👇").
- **Sound:** episode.json `"bed": "light"`, music_level 0.08, sfx_level 0.24; punchy pop/whoosh/ding SFX on reveals; no horror drone, no noir jazz any more.
- **End card:** own "BENNY SURVIVED?" / "+ SUBSCRIBE FOR MORE WHAT-IFS" (no Watcher/Tick: signature:false, sig_voice:false).
- Old detective episodes (ep001–ep003) stay published; from ep004 every video is format v2.

## Cadence + growth (unchanged rules, new format)
- 2 Shorts EVERY day, evening LA, ≥ 2.5 h apart, never the same minute as another channel.
- LEARN FROM DATA every run (Windsor/Metricool, first 24 h): retention drop point → fix the hook/pace; views by hour → move slots; title formula A/B ("What Happens If…" vs
  "How To Survive…" vs "Inside Your Body When…"); subs per 1k views by topic type → make more of the winners. Write a dated entry in docs/RESEARCH_NOTES.md and report it.

---
# (archive) Detective format v1, 2026-11-27 — kept for reference
# Channel 4 (pilot 2026-11-27) — detective Shorts "Case Closed in 60" (@CaseClosedIn60)
Owner 2026-11-27: "a third channel about detectives — totally different design, totally different scripts". Format chosen: SHORT FICTIONAL INVESTIGATIONS.
- Every Short = one complete fictional case: crime (no gore, no real people/events) → 3 suspects → detective finds the clue → reveal → "Case closed."
- REWATCH: the deciding clue is visible in the first 2 s (viewers who catch it solve the case before the detective). Last line asks "Did you catch it?".
- Look: NOIR — grayscale sets, ONE accent colour (yellow = evidence), rain, desk lamps, case-file paper, corkboard with red string, typewriter stamps.
- Voice (owner 2026-11-27 picked sample B, American, faster): am_onyx:0.5,am_eric:0.5, lang en-us, voice_fx smoky, speed 1.08, gap 0.28 — longer plots (14–16 lines, ~55 s) told fast. No horror signature (signature:false, sig_voice:false); own end = "CASE CLOSED" stamp.
- Hooks rotate (variety gate applies): "At 9:14, …" / "The safe was locked from the inside." / "Three people had a key." / "Nobody heard the shot." …
- Detective: Inspector Hale (trench coat, hat) — recurring character = channel identity.

## Cadence + growth (owner 2026-11-27: "2 videos a day like the other channels; change the script in every video; learn yourself when to post, which titles, what to add/remove so videos take off")
- 2 Shorts EVERY day, evening LA (slot IDs 17:30 / 20:30 in log.json; the autopilot picks the exact hours, >= 2.5 h apart, rotates hours like hour_test on the other channels).
- EVERY case is new: case type, setting (gallery, train, hotel, museum, bakery, casino, ship, lighthouse, ski lodge…), time of day, suspects (new characters, new looks), clue kind (weather, time, reflection, shadow, sound, handwriting, a detail on clothes, a broken pattern), structure (classic 3-suspect, "spot the lie", countdown "you have 10 seconds", interrogation, flashback) — check_variety.py must PASS.
- LEARN FROM DATA every run (Windsor/vidIQ/Metricool analytics, from the first 24 h of each video) and write a dated "Case Closed in 60" entry in docs/RESEARCH_NOTES.md:
  · retention curve / avg % viewed → if viewers drop in the first 3 s, make the hook harder (shorter, a stronger image in frame 1); if they drop mid-video, cut a line or speed up;
  · views by publish hour → move slots to the winning hours;
  · titles: A/B in rotation ("Can You Solve It?", "Only 1% Spot The Clue", "Who Stole …?", "The Lie Was In The First Second") — keep the winning formula, drop losers;
  · comments → if people guess wrong a lot, keep the difficulty; if everyone guesses right instantly, make the clue subtler;
  · subs per 1k views → which case types convert best; make more of them.
- Report the decisions (what changed and why) in the daily report's "🕵️ Case Closed in 60" block.

## Sound (owner 2026-11-27: "change the SFX and background music on this channel")
episode.json `"bed": "noir"` (mandatory): rain-on-window ambience instead of the horror drone, procedural NOIR JAZZ trio (walking upright bass, brushed snare + swing ride,
electric-piano comping, tempo/key seeded per case), music_level 0.10, sfx_level 0.24. Detective SFX types: typewriter, shutter, paper, steps, clue (bright "found it" chord on the clue),
reveal (dramatic low piano chord on the twist), stamp (CASE CLOSED — added automatically). Max 6 per video, never on lines 1–2, only where the picture shows it.
