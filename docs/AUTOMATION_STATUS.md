# AUTOMATION STATUS (verified 2026-11-14)
| Component | Mechanism | Status |
|---|---|---|
| Daily production | claude.ai scheduled task, daily 10:41 LA, persistent session | WORKING (test fire 2026-11-14 produced Part 2) |
| Publishing | Metricool createScheduledPost, autoPublish | WORKING (Part 1 published) |
| Production state / duplicates | pipeline/jobs.py + Metricool title check | WORKING (tests/test_jobs.sh 17/17) |
| Startup memory | CLAUDE.md (auto-loaded) + SessionStart hook | CLAUDE.md WORKING; hook configured, fires at next session start |
| Checkpoints | Stop + PreCompact hooks → scripts/hooks/checkpoint.sh → commit + push | tested manually |
| Context % monitoring | not exposed by a supported API in this environment | NOT AVAILABLE — fallback: auto-compaction + PreCompact checkpoint |
| Session rotation at 80 % | needs fresh-session routine WITH Metricool connector (only creatable in claude.ai UI) | NOT CONFIGURED (owner action) |
| Raw transcript archive | public repo → not allowed | NOT CONFIGURED (needs private repo) |

Autopilot routine prompt summary: pull repo → posting-time check → cadence → analytics → episode → QA → publish → report (video+cover+title, push).
