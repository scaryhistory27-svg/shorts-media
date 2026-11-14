## 2026-11-14 — same-session context management

- Owner: keep THIS session, no rotation; compact near 90 %. Platform auto-compaction already at 901,600/1M tokens (enabled, enforced).
- PreCompact: handoff + local owner-requests extract + verified push. SessionStart(compact): reload. Tests 22/22 + 17/17.
- Context at setup: 358,982 / 1,000,000.

## 2026-11-14 — memory / backup / recovery system installed (manual entry)

- Done today: Part 1 published; Part 2 rendered (new voice + music, QA passed) and scheduled for 2026-11-15 16:00 LA;
  autopilot (daily task) configured; QA checklist, best-time logic, covers, per-episode analytics added to CLAUDE.md;
  jobs.py state machine + SessionStart/PreCompact/Stop hooks + docs/ memory added.
- Open: Part 3 of The 2 AM Knock (next run). Owner question pending: target length 40–55 s (current) vs 90–120 s.
- Do NOT: publish on session start, create a second scheduler, re-schedule a job that jobs.py marks scheduled.
