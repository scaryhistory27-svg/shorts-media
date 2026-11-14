# PROJECT MEMORY (detailed; read on demand)
## Purpose
Grow a new YouTube Shorts channel with original animated English horror mini-series, fully automated.
## Architecture
- `pipeline/engine.js` canvas engine (characters: mom, creature, hero; props: door, clock, phone, building; captions, header, cover).
- `series/<slug>/ep<n>/scenes.js` per-episode scenes; `episode.json` script, highlights, SFX, cover, YouTube metadata.
- `pipeline/tts.py` Kokoro TTS (blend voice + mystic FX) → `timeline.py` word timing, SFX, drone, music, mastering → `render.js` Playwright frames → ffmpeg mp4; `cover` mode.
- `pipeline/jobs.py` job state machine; `series/log.json` publication log; `videos/` temp hosting for Metricool.
- Hooks: `.claude/settings.json` → scripts/hooks (SessionStart, Stop, PreCompact).
## Integrations
- Metricool MCP (brand 8091052, YouTube connected). GitHub repo scaryhistory27-svg/shorts-media (public; push via session git proxy).
- No API keys stored anywhere in the repo. Kokoro model downloaded at runtime by setup.sh.
## Problems & solutions
- File hosts blocked / releases forbidden → raw.githubusercontent.com in public repo.
- Fresh-session routines can't get Metricool connector from this session → routine fires into this persistent session.
- Black dip between segments of same scene; caption over end card → fixed in engine.js.
- Loudness: alimiter level=true → iterative mastering with level=false.
- Python hash() randomness for music seed → zlib.crc32.
## Episodes
- the-2am-knock ep1 "Never Open The Door At 2 AM 😨 #shorts" — published 2026-11-14 — https://www.youtube.com/shorts/6mF-t1ohbOQ
- the-2am-knock ep2 "It Knocked Again... Security Saw Something 😨 #shorts" — scheduled 2026-11-15 16:00 LA
