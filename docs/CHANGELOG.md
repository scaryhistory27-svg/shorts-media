# CHANGELOG
- 2026-11-14 Part 1 rendered & published. Pipeline moved into repo (engine.js, tts.py, timeline.py, render.js).
- 2026-11-14 Part 2 (+ v2 QA fixes, v3 new voice, v4 music). Covers. Analytics-driven timing, QA checklist, daily cadence.
- 2026-11-14 pipeline/jobs.py state machine, tests/test_jobs.sh, scripts/hooks/*, docs/*, .claude/settings.json hooks.
- 2026-11-14 Same-session compaction support: PreCompact transcript extract (local), verified push, SessionStart source=compact reload; tests 22/22.
- 2026-11-14 Slot schedule (2/day Nov 16–18) + jobs.py next-slots; simulated Nov 15–28: 14 videos, 0 duplicates.
- 2026-11-15 New default voice 'storyteller' (tts.py) + 0.5 s default gap (timeline.py). Tested on Part 2 script: 49.5 s, −14.2 LUFS.
- 2026-11-15 engine.js: walker() walk cycle, crawler(), moveAlong(), life helpers; tests/anim_demo.
