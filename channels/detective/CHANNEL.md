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
