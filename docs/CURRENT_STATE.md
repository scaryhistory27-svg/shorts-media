# CURRENT STATE (keep short — loaded at every session start)
_Updated: 2026-11-14 (setup of memory/recovery system)_

- **Channel:** original 2D animated horror YouTube Shorts in English. Owner talks Russian (reply in Russian).
- **Scheduler:** ONE claude.ai scheduled task "Horror Shorts autopilot" (trig_019AGWEVNZ2pSkvrmwq8VS2V), daily 10:41 America/Los_Angeles,
  fires into the persistent session session_01CUQD3p3bF34ksnGtNr1S1d. Do not create another schedule.
- **Publishing:** Metricool (blogId 8091052) → YouTube, `autoPublish`. Video is hosted temporarily in `videos/` of this public repo.
- **Cadence:** slot schedule in series/log.json: Nov 16–18 10:00+16:00 LA, Nov 19–24 16:00 daily, from Nov 26 every 2 days 16:00. `jobs.py next-slots` gives what to make.
- **Series in progress:** The 2 AM Knock — Part 1 published (https://www.youtube.com/shorts/6mF-t1ohbOQ),
  Part 2 published 2026-11-14 16:39 LA (https://www.youtube.com/shorts/ippN5Ox5E4A; custom thumbnail rejected — channel not verified), **Part 3 (finale) scheduled 2026-11-15 10:15 LA** (Metricool 429113298). Series complete → next = NEW series Part 1 at 2026-11-15T16:00.
- **Voice (from 2026-11-15):** "storyteller" — Kokoro am_michael 0.45 + am_onyx 0.55, speed 0.80, dry close-mic FX, 0.5 s pauses. **Music:** quiet procedural mystical bed, ducked.
- **Production state machine:** `python3 pipeline/jobs.py status|resume` (series/jobs.json). Always use it — it blocks duplicate scheduling.
- **Next actionable step:** autopilot (10:41 LA) makes NEW series Part 1 → 2026-11-15T16:00 and Part 2 → 2026-11-16T10:00.
