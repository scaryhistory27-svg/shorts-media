# AUTOMATION STATUS (verified 2026-11-14, updated: same-session compaction)
| Component | Mechanism | Status |
|---|---|---|
| Daily production | claude.ai scheduled task, daily 10:41 LA, persistent session | WORKING (test fire 2026-11-14 produced Part 2) |
| Publishing | Metricool createScheduledPost, autoPublish | WORKING (Part 1 published) |
| Production state / duplicates | pipeline/jobs.py + Metricool title check | WORKING (tests/test_jobs.sh 17/17) |
| Startup memory | CLAUDE.md (auto-loaded) + SessionStart hook | CLAUDE.md WORKING; hook configured, fires at next session start |
| Checkpoints | Stop + PreCompact hooks → scripts/hooks/checkpoint.sh → commit + push | tested manually |
| Context % monitoring | `get_session` (claude-code-remote) → external_metadata.context_usage (used/max tokens) + autocompact_state | WORKING (read 2026-11-14: 358,982 / 1,000,000) |
| Context reset near 90 % (same session) | Claude Code built-in auto-compaction: enabled, enforced, threshold 901,600 of 1,000,000 tokens (≈90 %, env CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=92 of the 980k effective window) | CONFIGURED by the platform; not yet observed firing (context ~36 %) |
| Before compaction | PreCompact hook → handoff entry, owner requests saved locally, commit + push + REMOTE VERIFIED | tested in simulation |
| After compaction | SessionStart hook (source=compact) → reloads CURRENT_STATE, handoff, jobs, recent requests in the SAME session | tested in simulation |
| Session rotation | not used (owner wants the same session) | — |
| Raw transcript archive | public repo → not allowed | NOT CONFIGURED (needs private repo) |

Autopilot routine prompt summary: pull repo → posting-time check → cadence → analytics → episode → QA → publish → report (video+cover+title, push).
