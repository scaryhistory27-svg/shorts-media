# CURRENT STATE (keep short — loaded at every session start)
_Updated: 2026-11-14 (setup of memory/recovery system)_

- **Channel:** original 2D animated horror YouTube Shorts in English. Owner talks Russian (reply in Russian).
- **Scheduler:** ONE claude.ai scheduled task "Horror Shorts autopilot" (trig_019AGWEVNZ2pSkvrmwq8VS2V), daily 10:41 America/Los_Angeles,
  fires into the persistent session session_01CUQD3p3bF34ksnGtNr1S1d. Do not create another schedule.
- **Publishing:** Metricool (blogId 8091052) → YouTube, `autoPublish`. Video is hosted temporarily in `videos/` of this public repo.
- **Cadence:** slot schedule in series/log.json: Nov 16–18 10:00+16:00 LA, Nov 19–24 16:00 daily, from Nov 26 every 2 days 16:00. `jobs.py next-slots` gives what to make.
- **Series in progress:** The 2 AM Knock — Part 1 published (https://www.youtube.com/shorts/6mF-t1ohbOQ),
  Part 2 published 2026-11-14 16:39 LA (https://www.youtube.com/shorts/ippN5Ox5E4A; custom thumbnail rejected — channel not verified), **Part 3 = next job** (slot 2026-11-15T16:00), then a new series from 2026-11-16T10:00.
- **Voice:** Kokoro blend am_michael 0.6 + am_onyx 0.4, speed 0.88, mystic FX. **Music:** quiet procedural mystical bed, ducked.
- **Production state machine:** `python3 pipeline/jobs.py status|resume` (series/jobs.json). Always use it — it blocks duplicate scheduling.
- **Next actionable step:** the next autopilot run makes Part 3 (job 2026-11-16-the-2am-knock-ep3).
